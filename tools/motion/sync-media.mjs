#!/usr/bin/env node
// Upload Studio media to the Railway volume (MEDIA_DIR) through the Studio's media API.
// Code deploys carry no media (.railwayignore); this sends only what changed.
//
//   node tools/motion/sync-media.mjs             upload new/changed files
//   node tools/motion/sync-media.mjs --dry-run   say what would change, send nothing
//   node tools/motion/sync-media.mjs --prune     also delete Studio files that are gone locally
//
// What goes up: top-level files in projects/*/outputs/ named *.preview.mp4, *.png, *.jpg,
// *.jpeg, *.webp, *.gif, *.mp3, *.m4a or *.wav. Full-quality masters (*.mp4 without
// .preview) stay on this Mac. A file is sent when the Studio has no copy with the
// same sha256.
//
// Reads STUDIO_API_TOKEN and STUDIO_URL (default https://studio-production-ccb0.up.railway.app)
// from the environment, else from .env at the repo root. Never prints them.
// Right after `railway up` the new deploy may not be live yet: a 404 (or 502/503/504,
// or no connection) on the list route is retried for up to 6 minutes (--wait <seconds>).
// Other flags: --root <dir> (content folder, default: the repo root).

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_URL = 'https://studio-production-ccb0.up.railway.app';
const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/; // the server's upload-name rule
const WANT_RE = /\.(preview\.mp4|png|jpe?g|webp|gif|mp3|m4a|wav)$/i;
const TYPES = { mp4: 'video/mp4', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', mp3: 'audio/mpeg', m4a: 'audio/mp4', wav: 'audio/wav' };
const RETRY_STATUS = new Set([404, 502, 503, 504]);

// ------------------------------------------------------------------ args, env

function parseArgs(argv) {
  const opts = { prune: false, dryRun: false, root: path.resolve(here, '..', '..'), waitMs: 6 * 60 * 1000 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--prune') opts.prune = true;
    else if (a === '--dry-run' || a === '-n') opts.dryRun = true;
    else if (a === '--root') opts.root = path.resolve(argv[++i] || '.');
    else if (a === '--wait') opts.waitMs = Math.max(0, Number(argv[++i]) || 0) * 1000;
    else if (a === '-h' || a === '--help') {
      console.log('usage: node tools/motion/sync-media.mjs [--dry-run] [--prune] [--wait <seconds>] [--root <dir>]');
      process.exit(0);
    } else fail(`unknown option ${a}`);
  }
  return opts;
}

function fail(msg) {
  console.error(`sync-media: ${msg}`);
  process.exit(1);
}

/** KEY=value lines from .env (quotes stripped). Values are never printed. */
function readDotEnv(file) {
  const out = {};
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    return out;
  }
  for (const line of text.split(/\r?\n/)) {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || line.trim().startsWith('#')) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    else v = v.replace(/\s+#.*$/, '');
    out[m[1]] = v;
  }
  return out;
}

function studioConfig(root) {
  const env = readDotEnv(path.join(root, '.env'));
  const token = process.env.STUDIO_API_TOKEN || env.STUDIO_API_TOKEN || '';
  const rawUrl = process.env.STUDIO_URL || env.STUDIO_URL || DEFAULT_URL;
  if (!token) fail('STUDIO_API_TOKEN is not set (add it to .env).');
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    fail('STUDIO_URL is not a valid URL.');
  }
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) fail('STUDIO_URL must be https (the token would travel in clear text).');
  url.username = '';
  url.password = '';
  return { token, base: url.origin + url.pathname.replace(/\/+$/, '') };
}

// ------------------------------------------------------------------ local files

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function sha256File(abs) {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash('sha256');
    fs.createReadStream(abs)
      .on('data', (c) => h.update(c))
      .on('error', reject)
      .on('end', () => resolve(h.digest('hex')));
  });
}

/** [{ project, files: [{ name, abs, size }] }] for every project folder; odd names reported in `skipped`. */
async function localMedia(root, skipped) {
  const projectsDir = path.join(root, 'projects');
  let entries;
  try {
    entries = await fsp.readdir(projectsDir, { withFileTypes: true });
  } catch {
    fail(`no projects/ folder in ${root}`);
  }
  const out = [];
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!e.isDirectory() || /^[._]/.test(e.name)) continue;
    if (!NAME_RE.test(e.name) || e.name.includes('..')) {
      skipped.push(`projects/${e.name}/ (folder name)`);
      continue;
    }
    const outputs = path.join(projectsDir, e.name, 'outputs');
    const files = [];
    let st = null;
    try {
      st = await fsp.lstat(outputs);
    } catch {}
    if (st && st.isDirectory() && !st.isSymbolicLink()) {
      for (const f of (await fsp.readdir(outputs, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
        if (!f.isFile() || f.name.startsWith('.') || !WANT_RE.test(f.name)) continue; // symlinks, folders, masters, other types
        if (!NAME_RE.test(f.name) || f.name.includes('..') || f.name.length > 200) {
          skipped.push(`projects/${e.name}/outputs/${f.name} (file name)`);
          continue;
        }
        const abs = path.join(outputs, f.name);
        files.push({ name: f.name, abs, size: (await fsp.stat(abs)).size });
      }
    }
    out.push({ project: e.name, files });
  }
  return out;
}

// ------------------------------------------------------------------ remote

function describe(err) {
  const code = err?.cause?.code || err?.code;
  return code ? `${err.message} (${code})` : err?.message || String(err);
}

function createRemote({ base, token }, waitMs) {
  const auth = { Authorization: `Bearer ${token}` };
  let waitUntil = null; // the 6-minute window starts at the first "not live yet"
  let waitedNoted = false;

  /** Start (or continue) the shared wait window; false once it has run out. */
  function mayWait() {
    if (waitUntil === null) waitUntil = Date.now() + waitMs;
    if (!waitedNoted && waitMs > 0) {
      waitedNoted = true;
      console.log(`sync-media: the Studio isn't answering for everything yet (new deploy rolling out?), retrying for up to ${Math.round(waitMs / 60000) || '<1'} min…`);
    }
    return Date.now() < waitUntil;
  }
  /** How long to sleep before the next try: 10s, or less if the window ends sooner. */
  const pause = () => Math.max(500, Math.min(10_000, (waitUntil ?? Date.now()) - Date.now()));

  const projectUrl = (project, name) => `${base}/api/media/${encodeURIComponent(project)}${name ? `/${encodeURIComponent(name)}` : ''}`;

  /** { status: 'ok', files, maxBytes, storage } | { status: 'retry', why } | throws on a hard error. */
  async function list(project) {
    let r;
    try {
      r = await fetch(projectUrl(project), { headers: auth });
    } catch (e) {
      return { status: 'retry', why: describe(e) };
    }
    if (r.status === 401 || r.status === 403) throw new Error(`the Studio rejected STUDIO_API_TOKEN (HTTP ${r.status})`);
    if (RETRY_STATUS.has(r.status)) {
      await r.body?.cancel().catch(() => {});
      return { status: 'retry', why: `HTTP ${r.status}` };
    }
    if (!r.ok) throw new Error(`listing ${project}: HTTP ${r.status}`);
    const files = await r.json();
    if (!Array.isArray(files)) throw new Error(`listing ${project}: unexpected answer`);
    return {
      status: 'ok',
      files,
      maxBytes: Number(r.headers.get('x-media-max-bytes')) || Infinity,
      storage: r.headers.get('x-media-storage') || '',
    };
  }

  /**
   * Upload one file. A dropped connection, 404 (deploy not live yet) or 5xx is
   * retried: 3 tries, then for as long as the shared wait window lasts (a deploy
   * with a volume restarts the service, so uploads can fail for a little while).
   */
  async function put(project, file, sha256) {
    const ext = path.extname(file.name).slice(1).toLowerCase();
    for (let attempt = 1; ; attempt++) {
      let r, body, err;
      try {
        r = await fetch(projectUrl(project, file.name), {
          method: 'PUT',
          headers: { ...auth, 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Content-Length': String(file.size), 'X-Content-SHA256': sha256 },
          body: fs.createReadStream(file.abs),
          duplex: 'half',
        });
        body = await r.text();
      } catch (e) {
        err = new Error(describe(e));
      }
      if (r?.ok) {
        const out = JSON.parse(body);
        if (out.sha256 !== sha256) throw new Error('the Studio stored a different sha256');
        return out;
      }
      if (r) {
        let msg = `HTTP ${r.status}`;
        try {
          msg += `: ${JSON.parse(body).error}`;
        } catch {}
        err = new Error(msg);
        if (!(r.status >= 500 || r.status === 404 || r.status === 408)) throw err; // other 4xx won't fix themselves
      }
      if (attempt >= 3 && !mayWait()) throw err;
      await sleep(attempt < 3 ? 3000 * attempt : pause());
    }
  }

  async function remove(project, name) {
    const r = await fetch(projectUrl(project, name), { method: 'DELETE', headers: auth });
    await r.body?.cancel().catch(() => {});
    if (!r.ok && r.status !== 404) throw new Error(`HTTP ${r.status}`);
  }

  return { list, put, remove, mayWait, pause };
}

// ------------------------------------------------------------------ main

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const cfg = studioConfig(opts.root);
  const remote = createRemote(cfg, opts.waitMs);
  const skipped = [];
  const projects = await localMedia(opts.root, skipped);

  const t0 = Date.now();
  const stats = { projects: projects.length, uploaded: 0, upBytes: 0, unchanged: 0, deleted: 0, remoteOnly: 0, failed: 0, wouldUpload: 0, wouldDelete: 0 };
  const failures = [];

  async function syncProject({ project, files }, listing) {
    if (listing.storage === 'none') throw new Error('the Studio has no MEDIA_DIR set, so it cannot store media (set MEDIA_DIR on Railway)');
    const remoteByName = new Map(listing.files.map((f) => [f.name, f]));
    const localNames = new Set(files.map((f) => f.name));
    for (const file of files) {
      const sha = await sha256File(file.abs);
      const have = remoteByName.get(file.name);
      if (have && have.sha256 === sha && have.size === file.size) {
        stats.unchanged++;
        continue;
      }
      if (file.size > listing.maxBytes) {
        stats.failed++;
        failures.push(`${project}/${file.name}: ${mb(file.size)} is over the Studio's ${mb(listing.maxBytes)} limit`);
        continue;
      }
      if (opts.dryRun) {
        stats.wouldUpload++;
        stats.upBytes += file.size;
        console.log(`  would upload  ${project}/${file.name} (${mb(file.size)})`);
        continue;
      }
      try {
        await remote.put(project, file, sha);
        stats.uploaded++;
        stats.upBytes += file.size;
        console.log(`  uploaded  ${project}/${file.name} (${mb(file.size)})`);
      } catch (e) {
        stats.failed++;
        failures.push(`${project}/${file.name}: ${describe(e)}`);
      }
    }
    for (const f of listing.files) {
      if (localNames.has(f.name)) continue;
      if (!opts.prune) {
        stats.remoteOnly++;
        continue;
      }
      if (opts.dryRun) {
        stats.wouldDelete++;
        console.log(`  would delete  ${project}/${f.name}`);
        continue;
      }
      try {
        await remote.remove(project, f.name);
        stats.deleted++;
        console.log(`  deleted   ${project}/${f.name}`);
      } catch (e) {
        stats.failed++;
        failures.push(`${project}/${f.name} (delete): ${describe(e)}`);
      }
    }
  }

  // Projects the live deploy doesn't know yet are retried until the new deploy is up.
  let pending = projects;
  let lastWhy = '';
  while (pending.length) {
    const retry = [];
    for (const p of pending) {
      const listing = await remote.list(p.project);
      if (listing.status === 'retry') {
        lastWhy = listing.why;
        retry.push(p);
        continue;
      }
      await syncProject(p, listing);
    }
    pending = retry;
    if (pending.length) {
      if (!remote.mayWait()) {
        for (const p of pending) {
          stats.failed++;
          failures.push(`${p.project}: the Studio didn't list it in time (${lastWhy}). Is the deploy live and the project in it? Run sync-media again.`);
        }
        break;
      }
      await sleep(remote.pause());
    }
  }

  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  const parts = [`${stats.projects} projects`];
  if (opts.dryRun) parts.push(`${stats.wouldUpload} to upload (${mb(stats.upBytes)})`, `${stats.wouldDelete} to delete`);
  else parts.push(`${stats.uploaded} uploaded (${mb(stats.upBytes)})`, `${stats.deleted} deleted`);
  parts.push(`${stats.unchanged} unchanged`);
  if (stats.remoteOnly) parts.push(`${stats.remoteOnly} only on the Studio (kept; --prune deletes)`);
  parts.push(`${stats.failed} failed`);
  console.log(`sync-media${opts.dryRun ? ' (dry run)' : ''}: ${parts.join(', ')} in ${secs}s`);
  if (skipped.length) console.log(`sync-media: skipped ${skipped.length} with names the Studio won't take (use letters, digits, ".", "_", "-"): ${skipped.join(', ')}`);
  for (const f of failures) console.error(`  FAILED  ${f}`);
  process.exit(stats.failed ? 1 : 0);
}

main().catch((e) => fail(describe(e)));
