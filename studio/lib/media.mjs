// Media storage on a persistent volume (MEDIA_DIR), separate from the deployed code.
//
//   MEDIA_DIR/<project>/<file>            the media file (flat: no subfolders)
//   MEDIA_DIR/<project>/.<file>.sha256    sidecar, sha256sum format: "<hex>  <file>"
//   MEDIA_DIR/.tmp/<32 hex>               uploads in progress (renamed into place when complete)
//
// Uploads stream to .tmp while hashing, are fsynced, then atomically renamed into
// place. Nothing here ever follows a symlink inside MEDIA_DIR: .tmp, project
// folders and files must be plain (a symlinked .tmp turns uploads off with 503
// and is never swept).

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

/** Upload names: plain, no dot-files, no separators, a whitelisted extension (checked separately). */
export const UPLOAD_NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
export const UPLOAD_EXTS = new Set(['mp4', 'webm', 'mov', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'mp3', 'm4a', 'wav']);
export const DEFAULT_MAX_BYTES = 400 * 1024 * 1024;
/** Free space an upload must leave on the volume, on top of its own size. */
export const DEFAULT_MIN_FREE_BYTES = 32 * 1024 * 1024;
/** Temp upload names: what put() creates, and the only names the sweep deletes. */
const TMP_NAME_RE = /^[0-9a-f]{32}$/;

export function isUploadName(name) {
  name = String(name ?? '');
  if (name.length > 200 || !UPLOAD_NAME_RE.test(name) || name.includes('..')) return false;
  const ext = path.extname(name).slice(1).toLowerCase();
  return UPLOAD_EXTS.has(ext);
}

export class MediaError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/** Parse MEDIA_MAX_BYTES: a positive integer, else the default (with a warning). */
export function parseMaxBytes(v, warn = () => {}) {
  return parseBytes('MEDIA_MAX_BYTES', v, DEFAULT_MAX_BYTES, { min: 1, warn });
}

/** Parse a byte count from the environment: a whole number >= min, else the default (with a warning). */
export function parseBytes(name, v, fallback, { min = 0, warn = () => {} } = {}) {
  if (v === undefined || v === null || String(v).trim() === '') return fallback;
  const n = Number(String(v).trim());
  if (Number.isSafeInteger(n) && n >= min) return n;
  warn(`${name}="${v}" is not a whole number of bytes (>= ${min}); using ${fallback}.`);
  return fallback;
}

/** ENOSPC/EDQUOT become a clean 507; anything else passes through. */
function diskFull(e) {
  return e && (e.code === 'ENOSPC' || e.code === 'EDQUOT') ? new MediaError(507, 'media volume is full') : e;
}

/**
 * @param {{ dir: string, maxBytes?: number, idleMs?: number, minFreeBytes?: number }} opts
 *   dir: absolute MEDIA_DIR. Callers validate the project (must exist in the deployed content).
 */
export function createMediaStore({ dir, maxBytes = DEFAULT_MAX_BYTES, idleMs = 120_000, minFreeBytes = DEFAULT_MIN_FREE_BYTES }) {
  const base = path.resolve(dir);
  const tmpDir = path.join(base, '.tmp');
  const locks = new Map();
  let sweepTimer = null;

  /** MEDIA_DIR/.tmp must be a real directory: a symlink would send uploads (and the sweep) elsewhere. */
  function assertTmpDir() {
    const st = fs.lstatSync(tmpDir);
    if (!st.isDirectory() || st.isSymbolicLink()) throw new Error(`${tmpDir} is not a plain directory`);
  }

  /**
   * Delete uploads abandoned by a crash: only our own temp names, only plain
   * files, never recursive, and never through a symlinked .tmp.
   */
  function sweep(staleMs) {
    assertTmpDir();
    const now = Date.now();
    for (const e of fs.readdirSync(tmpDir, { withFileTypes: true })) {
      if (!TMP_NAME_RE.test(e.name)) continue;
      const abs = path.join(tmpDir, e.name);
      try {
        const st = fs.lstatSync(abs);
        if (st.isFile() && now - st.mtimeMs > staleMs) fs.unlinkSync(abs);
      } catch {}
    }
  }

  /**
   * Create MEDIA_DIR and MEDIA_DIR/.tmp, clear uploads abandoned by a crash, and
   * keep clearing them every `sweepEveryMs` (an in-progress upload keeps its mtime fresh).
   */
  function init({ staleMs = 15 * 60 * 1000, sweepEveryMs = staleMs } = {}) {
    fs.mkdirSync(tmpDir, { recursive: true });
    if (!sweepTimer && sweepEveryMs > 0) {
      sweepTimer = setInterval(() => {
        try {
          sweep(staleMs);
        } catch {}
      }, sweepEveryMs);
      sweepTimer.unref();
    }
    sweep(staleMs); // throws if .tmp is not a plain directory (the caller logs it)
  }

  function close() {
    if (sweepTimer) clearInterval(sweepTimer);
    sweepTimer = null;
  }

  /** put(): .tmp exists and is a plain directory, else 503. */
  async function readyTmpDir() {
    try {
      await fsp.mkdir(tmpDir, { recursive: true });
      const st = await fsp.lstat(tmpDir);
      if (st.isDirectory() && !st.isSymbolicLink()) return;
    } catch (e) {
      if (diskFull(e) !== e) throw diskFull(e);
    }
    throw new MediaError(503, 'media temp folder is not a plain directory');
  }

  /** Refuse (507) an upload that would leave less than minFreeBytes on the volume. */
  async function checkFreeSpace(declared) {
    let sf;
    try {
      sf = await fsp.statfs(base);
    } catch {
      return; // can't tell: the write itself will report ENOSPC (507)
    }
    if (!(sf.blocks > 0)) return; // some filesystems report nothing useful
    const free = Number(sf.bavail) * Number(sf.bsize);
    if (free < declared + minFreeBytes) throw new MediaError(507, 'media volume is full');
  }

  /** Serialise the commit/delete step per file so file and sidecar never disagree. */
  async function withLock(key, fn) {
    const prev = locks.get(key) || Promise.resolve();
    let release;
    const mine = new Promise((r) => (release = r));
    const tail = prev.then(() => mine);
    locks.set(key, tail);
    await prev;
    try {
      return await fn();
    } finally {
      release();
      if (locks.get(key) === tail) locks.delete(key);
    }
  }

  /**
   * MEDIA_DIR/<project> as a real directory (never a symlink), or null.
   * With create, the directory is made if missing.
   */
  async function projectDir(project, { create = false } = {}) {
    const realBase = await fsp.realpath(base);
    const abs = path.join(realBase, project);
    if (path.dirname(abs) !== realBase) return null;
    let st;
    try {
      st = await fsp.lstat(abs);
    } catch (e) {
      if (e.code !== 'ENOENT' || !create) return null;
      try {
        await fsp.mkdir(abs);
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
      }
      st = await fsp.lstat(abs);
    }
    if (!st.isDirectory() || st.isSymbolicLink()) return null;
    return abs;
  }

  async function lstatOrNull(abs) {
    try {
      return await fsp.lstat(abs);
    } catch {
      return null;
    }
  }

  async function readSidecar(pdir, name, fileSt) {
    const side = path.join(pdir, `.${name}.sha256`);
    const st = await lstatOrNull(side);
    if (!st || !st.isFile() || st.size > 1024 || st.mtimeMs < fileSt.mtimeMs) return null; // stale if the file is newer
    try {
      const m = /^([0-9a-f]{64})\b/.exec(await fsp.readFile(side, 'utf8'));
      return m ? m[1] : null;
    } catch {
      return null;
    }
  }

  /** Files stored for a project: [{ name, size, mtime, sha256? }], sorted by name. */
  async function list(project, { hashes = true } = {}) {
    let pdir;
    try {
      pdir = await projectDir(project);
    } catch {
      return [];
    }
    if (!pdir) return [];
    let entries;
    try {
      entries = await fsp.readdir(pdir, { withFileTypes: true });
    } catch {
      return [];
    }
    const out = [];
    for (const e of entries) {
      if (!e.isFile() || !isUploadName(e.name)) continue; // skips symlinks, dirs, sidecars, odd names
      const st = await lstatOrNull(path.join(pdir, e.name));
      if (!st || !st.isFile()) continue;
      const item = { name: e.name, size: st.size, mtime: st.mtime };
      if (hashes) item.sha256 = await readSidecar(pdir, e.name, st);
      out.push(item);
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }

  /** A stored file to serve, or null. Same shape as content.mediaFile (minus type). */
  async function file(project, name) {
    if (!isUploadName(name)) return null;
    try {
      const pdir = await projectDir(project);
      if (!pdir) return null;
      const abs = path.join(pdir, name);
      const st = await fsp.lstat(abs);
      if (!st.isFile()) return null; // a symlink is never served
      return { abs, size: st.size, mtime: st.mtime };
    } catch {
      return null;
    }
  }

  async function writeAll(fh, buf) {
    for (let off = 0; off < buf.length; ) {
      const { bytesWritten } = await fh.write(buf, off, buf.length - off);
      if (!bytesWritten) throw new Error('short write');
      off += bytesWritten;
    }
  }

  /** Stream `req` into fh, hashing as it goes. Never buffers more than one chunk. */
  function receive(req, fh) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      let size = 0;
      let pending = Promise.resolve();
      let settled = false;
      const settle = (err, value) => {
        if (settled) return;
        settled = true;
        req.off('data', onData);
        req.off('end', onEnd);
        req.off('error', onError);
        req.off('close', onClose);
        req.socket?.off('timeout', onIdle);
        req.socket?.setTimeout(0);
        if (err) reject(err);
        else resolve(value);
      };
      const onData = (chunk) => {
        size += chunk.length;
        if (size > maxBytes) {
          req.pause();
          return settle(new MediaError(413, `file is larger than ${maxBytes} bytes`));
        }
        hash.update(chunk);
        req.pause();
        pending = pending.then(() => writeAll(fh, chunk)).then(() => {
          if (!settled) req.resume();
        });
        pending.catch((e) => settle(e));
      };
      const onEnd = () => pending.then(() => settle(null, { size, sha256: hash.digest('hex') }), (e) => settle(e));
      // A request only errors when the connection breaks (or stalls, above).
      const onError = (e) => settle(e instanceof MediaError ? e : new MediaError(400, 'upload aborted'));
      const onClose = () => {
        if (!req.complete) settle(new MediaError(400, 'upload aborted'));
      };
      const onIdle = () => req.destroy(new MediaError(408, 'upload stalled'));
      req.socket?.setTimeout(idleMs);
      req.socket?.on('timeout', onIdle);
      req.on('data', onData);
      req.on('end', onEnd);
      req.on('error', onError);
      req.on('close', onClose);
    });
  }

  async function fsyncDir(abs) {
    let fh;
    try {
      fh = await fsp.open(abs, 'r');
      await fh.sync();
    } catch {
      // Not every platform can fsync a directory; the rename is still atomic.
    } finally {
      await fh?.close().catch(() => {});
    }
  }

  async function writeAtomic(dest, data) {
    const tmp = path.join(tmpDir, crypto.randomBytes(16).toString('hex'));
    const fh = await fsp.open(tmp, 'wx', 0o644);
    try {
      await fh.writeFile(data);
      await fh.sync();
    } finally {
      await fh.close();
    }
    try {
      await fsp.rename(tmp, dest);
    } catch (e) {
      await fsp.rm(tmp, { force: true });
      throw e;
    }
  }

  /**
   * Store the request body as MEDIA_DIR/<project>/<name>. The caller has checked
   * auth and that the project exists. Throws MediaError for client errors.
   * @param {{ expectedSha256?: string, onAccepted?: () => void }} opts
   */
  async function put(project, name, req, { expectedSha256 = '', onAccepted } = {}) {
    if (!isUploadName(name)) throw new MediaError(400, 'bad file name');
    const declared = req.headers['content-length'];
    if (declared !== undefined && Number(declared) > maxBytes) throw new MediaError(413, `file is larger than ${maxBytes} bytes`);
    if (expectedSha256 && !/^[0-9a-f]{64}$/i.test(expectedSha256)) throw new MediaError(400, 'bad X-Content-SHA256');

    await readyTmpDir();
    await checkFreeSpace(Number(declared) || 0); // chunked: the write reports ENOSPC as 507
    let pdir;
    try {
      pdir = await projectDir(project, { create: true });
    } catch (e) {
      throw diskFull(e);
    }
    if (!pdir) throw new MediaError(400, 'project media folder is not a plain directory');
    const dest = path.join(pdir, name);
    const existing = await lstatOrNull(dest);
    if (existing && !existing.isFile()) throw new MediaError(400, 'target exists and is not a regular file');

    const tmp = path.join(tmpDir, crypto.randomBytes(16).toString('hex'));
    let fh;
    try {
      fh = await fsp.open(tmp, 'wx', 0o644);
    } catch (e) {
      throw diskFull(e);
    }
    let result;
    try {
      onAccepted?.(); // e.g. send "100 Continue" now that the upload is allowed
      result = await receive(req, fh);
      await fh.sync();
      await fh.close();
    } catch (e) {
      await fh.close().catch(() => {});
      await fsp.rm(tmp, { force: true });
      throw diskFull(e);
    }
    if (expectedSha256 && expectedSha256.toLowerCase() !== result.sha256) {
      await fsp.rm(tmp, { force: true });
      throw new MediaError(400, 'sha256 mismatch: the upload was corrupted in transit');
    }

    try {
      await withLock(`${project}/${name}`, async () => {
        const now = await lstatOrNull(dest);
        if (now && !now.isFile()) throw new MediaError(400, 'target exists and is not a regular file');
        const side = path.join(pdir, `.${name}.sha256`);
        await fsp.rm(side, { force: true }); // a crash from here on leaves no sidecar, never a wrong one
        await fsp.rename(tmp, dest);
        await writeAtomic(side, `${result.sha256}  ${name}\n`);
        await fsyncDir(pdir);
      });
    } catch (e) {
      throw diskFull(e);
    } finally {
      await fsp.rm(tmp, { force: true });
    }
    return { name, size: result.size, sha256: result.sha256 };
  }

  /** Delete a stored file and its sidecar. Returns false if it was not there. */
  async function remove(project, name) {
    if (!isUploadName(name)) throw new MediaError(400, 'bad file name');
    const pdir = await projectDir(project);
    if (!pdir) return false;
    return withLock(`${project}/${name}`, async () => {
      const abs = path.join(pdir, name);
      const st = await lstatOrNull(abs);
      if (!st) return false;
      if (!st.isFile()) throw new MediaError(400, 'target is not a regular file');
      await fsp.rm(path.join(pdir, `.${name}.sha256`), { force: true });
      await fsp.unlink(abs);
      await fsyncDir(pdir);
      return true;
    });
  }

  return { dir: base, maxBytes, init, close, sweep, list, file, put, remove };
}
