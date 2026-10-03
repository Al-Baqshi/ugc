// Media in the Railway storage bucket, as the studio sees it.
//
//   projects/<project>/outputs/<file>     one object per file (flat: no subfolders)
//
// The bucket is private. The studio never proxies bytes: /media/... answers a
// 302 to a presigned GET. Listings are cached (~60 s) and shared by every page.

import path from 'node:path';
import { LISTABLE, MEDIA_TYPES } from './content.mjs';

export const PREFIX = 'projects/';
const CONTROL = /[\u0000-\u001f\u007f]/;
const KEY_RE = /^projects\/([^/]+)\/outputs\/([^/]+)$/;

const extOf = (name) => path.extname(name).slice(1).toLowerCase();

/** A file name the bucket may hold for a project: one plain segment with a media extension. */
export function isObjectName(name) {
  name = String(name ?? '');
  return name.length > 0 && name.length <= 255 && LISTABLE(name) && !CONTROL.test(name) && !!MEDIA_TYPES[extOf(name)];
}

/** projects/<folder>/outputs/<name>, or null if either part could step outside that. */
export function mediaKey(folder, name) {
  folder = String(folder ?? '');
  if (!folder || folder.length > 255 || !LISTABLE(folder) || CONTROL.test(folder) || !isObjectName(name)) return null;
  const key = `${PREFIX}${folder}/outputs/${name}`;
  const m = KEY_RE.exec(key);
  return m && m[1] === folder && m[2] === name ? key : null;
}

/** The inverse of mediaKey: { folder, name } for keys the studio shows, else null. */
export function parseMediaKey(key) {
  const m = KEY_RE.exec(String(key ?? ''));
  if (!m) return null;
  return mediaKey(m[1], m[2]) === key ? { folder: m[1], name: m[2] } : null;
}

/**
 * @param {ReturnType<import('./s3.mjs').createS3>} s3
 * @param {{ ttlMs?: number, retryMs?: number, expires?: number, windowMs?: number,
 *           warn?: (msg: string) => void, now?: () => number }} [opts]
 *   expires: presigned URL lifetime (s). windowMs: signing time is rounded down
 *   to this window, so repeated requests get the same URL (and browser cache hits).
 */
export function createBucketMedia(s3, { ttlMs = 60_000, retryMs = 15_000, expires = 3600, windowMs = 5 * 60_000, warn = () => {}, now = Date.now } = {}) {
  let cache = null; // { at, byFolder: Map<folder, item[]> }
  let inflight = null;
  let failedAt = 0;
  let lists = 0;

  async function refresh() {
    lists++;
    try {
      const objects = await s3.listObjects(PREFIX);
      const byFolder = new Map();
      for (const o of objects) {
        const k = parseMediaKey(o.key);
        if (!k) continue;
        const ext = extOf(k.name);
        const [kind, type] = MEDIA_TYPES[ext];
        if (!byFolder.has(k.folder)) byFolder.set(k.folder, []);
        byFolder.get(k.folder).push({ rel: k.name, name: k.name, ext, kind, type, size: o.size, etag: o.etag, mtime: o.lastModified, source: 'bucket' });
      }
      for (const items of byFolder.values()) items.sort((a, b) => a.rel.localeCompare(b.rel));
      cache = { at: now(), byFolder };
      failedAt = 0;
    } catch (e) {
      // Never take a page down: keep the last good listing (or none) and retry later.
      failedAt = now();
      warn(`bucket listing failed (${e.message}); ${cache ? 'showing the last good listing' : 'showing no bucket media'} for now`);
    }
  }

  /** Map<folder, [{ rel, name, ext, kind, type, size, etag, mtime }]>, at most ttlMs old. */
  async function list() {
    const t = now();
    if (cache && t - cache.at < ttlMs) return cache.byFolder;
    if (failedAt && t - failedAt < retryMs) return cache?.byFolder || new Map();
    if (!inflight) inflight = refresh().finally(() => (inflight = null));
    await inflight;
    return cache?.byFolder || new Map();
  }

  const signingDate = () => new Date(Math.floor(now() / windowMs) * windowMs);

  /** Presigned GET for projects/<folder>/outputs/<name>, or null for a name that isn't one. */
  function presign(folder, name, { download = false } = {}) {
    const key = mediaKey(folder, name);
    if (!key) return null;
    return s3.presignGet(key, { expires, download: download ? name : null, date: signingDate() });
  }

  /** When links presigned now stop working (ISO time): at least expires - windowMs from now. */
  function signedUntil() {
    return new Date(signingDate().getTime() + expires * 1000).toISOString();
  }

  return {
    list,
    presign,
    signedUntil,
    origin: s3.origin,
    bucket: s3.bucket,
    stats: () => ({ lists }),
    invalidate: () => {
      cache = null;
      failedAt = 0;
    },
  };
}
