// UGC Studio: a password-protected, read-only dashboard over the CreativeUGC folder.
// No framework: node:http, server-rendered HTML, a little vanilla JS.

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { createContent, LISTABLE, mediaUrl } from './lib/content.mjs';
import { createS3, bucketConfigFromEnv, attachmentDisposition } from './lib/s3.mjs';
import { createBucketMedia } from './lib/storage.mjs';
import { createThrottle } from './lib/throttle.mjs';
import { configureMarkdown, renderMarkdown } from './lib/markdown.mjs';
import { videoCards, voScript, scriptText } from './lib/videos.mjs';
import * as views from './lib/views.mjs';

const STUDIO_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.env.STUDIO_CONTENT_ROOT || path.join(STUDIO_DIR, '..'));
const PORT = Number(process.env.PORT) || 3000;

// Railway injects RAILWAY_* variables into every deploy. The CLI's own auth
// tokens can sit in a local shell, so they don't count.
const ON_RAILWAY = Object.keys(process.env).some((k) => k.startsWith('RAILWAY_') && !/^RAILWAY_(API_)?TOKEN$/.test(k));
const DEV_REQUESTED = process.env.STUDIO_DEV === '1';
const DEV = DEV_REQUESTED && !ON_RAILWAY; // dev mode can never switch on in a deploy
const PASSWORD = process.env.STUDIO_PASSWORD || '';
// The Videos page (and the media it plays) can be shared without a login: anyone with the link
// can watch and download. Everything else (ideas, research, ventures, API) stays behind the password.
const PUBLIC_VIDEOS = (process.env.STUDIO_PUBLIC_VIDEOS ?? '1') !== '0';
const isPublicPath = (p) => PUBLIC_VIDEOS && (p === '/videos' || p.startsWith('/media/') || p.startsWith('/assets/') || p === '/favicon.ico');
const API_TOKEN = process.env.STUDIO_API_TOKEN || '';
const HOST = process.env.HOST || (DEV ? '127.0.0.1' : '0.0.0.0'); // dev mode stays on this machine
const LOOPBACK = new Set(['127.0.0.1', '::1', 'localhost']);
const EXPOSED = !LOOPBACK.has(HOST);
const MIN_SECRET = 16;

function refuse(msg) {
  console.error(`[studio] ${msg}`);
  process.exit(1);
}
if (DEV_REQUESTED && ON_RAILWAY) console.warn('[studio] STUDIO_DEV=1 ignored: this is a Railway deploy, so a password is always required.');
if (DEV && !PASSWORD && EXPOSED) refuse(`Dev mode without STUDIO_PASSWORD only listens on 127.0.0.1, not ${HOST}. Unset HOST, or set STUDIO_PASSWORD.`);
if (PASSWORD && PASSWORD.length < MIN_SECRET && (!DEV || EXPOSED)) refuse(`STUDIO_PASSWORD must be at least ${MIN_SECRET} characters.`);
if (API_TOKEN && API_TOKEN.length < MIN_SECRET && (!DEV || EXPOSED)) refuse(`STUDIO_API_TOKEN must be at least ${MIN_SECRET} characters.`);

const STARTED = new Date();

// `npm run publish` writes studio/synced.txt just before uploading, so the
// deployed footer can say when the content was sent (process restarts don't move it).
// It sits next to the content (ROOT/studio/ is STUDIO_DIR unless STUDIO_CONTENT_ROOT is set).
function readSynced() {
  try {
    const d = new Date(fs.readFileSync(path.join(ROOT, 'studio', 'synced.txt'), 'utf8').trim());
    return isNaN(d) ? null : d;
  } catch {
    return null;
  }
}
const ctx = { started: STARTED, synced: DEV ? null : readSynced(), dev: DEV, assetVersion: STARTED.getTime().toString(36) };
const ctxFor = (snap) => (snap ? { ...ctx, updated: snap.updated || null } : ctx);

// Media lives in a private storage bucket (Railway: BUCKET_* variables). The
// studio never carries the bytes: /media/... redirects to a presigned GET.
// Without BUCKET_* (local dev) media is served from projects/*/outputs/.
let bucket = null;
let bucketDisabled = false;
try {
  const cfg = bucketConfigFromEnv(process.env);
  if (cfg) bucket = createBucketMedia(createS3(cfg), { warn: (m) => console.warn(`[studio] ${m}`) });
} catch (e) {
  // A broken bucket setting must not take the dashboard down: pages still work.
  bucketDisabled = true;
  console.error(`[studio] media bucket disabled: ${e.message}`);
}

configureMarkdown({ root: ROOT });
const content = createContent(ROOT, { bucket, renderCaption: (md, docRel) => renderMarkdown(md, { docRel }) });

// Static assets: a fixed whitelist, nothing else under studio/ is reachable.
const ASSETS = {
  'styles.css': 'text/css; charset=utf-8',
  'app.js': 'text/javascript; charset=utf-8',
  'videos.js': 'text/javascript; charset=utf-8',
  'theme.js': 'text/javascript; charset=utf-8',
  'favicon.svg': 'image/svg+xml',
};

// Media and images may come from the bucket (presigned redirects), nothing else.
const MEDIA_ORIGIN = bucket ? ` ${bucket.origin}` : '';
const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  'font-src https://fonts.gstatic.com',
  `img-src 'self' data:${MEDIA_ORIGIN}`,
  `media-src 'self'${MEDIA_ORIGIN}`,
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// ------------------------------------------------------------------ auth

const sha256 = (s) => crypto.createHash('sha256').update(String(s), 'utf8').digest();
function safeEqual(a, b) {
  // Hash both sides so the buffers are always equal length, then compare in constant time.
  return crypto.timingSafeEqual(sha256(a), sha256(b));
}

// Repeated wrong passwords: 429 after 30 from one IP in 15 minutes; under a
// wide attack (300+ failures from all IPs) every failure is also slowed by 1s.
const throttle = createThrottle();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * The client's IP for throttling. X-Forwarded-For is never trusted: the client
 * controls it. On Railway the edge proxy sets X-Real-IP; anywhere else the
 * socket address is the client.
 */
function clientIp(req) {
  if (ON_RAILWAY) {
    const real = String(req.headers['x-real-ip'] || '').trim();
    if (real) return real.slice(0, 64);
  }
  return req.socket.remoteAddress || 'unknown';
}

/**
 * Which credential the request carries, if it is valid. Everything is read-only.
 *   basic   the password (pages, API, media)
 *   bearer  STUDIO_API_TOKEN, on /api/* only
 * @returns {'basic'|'bearer'|'missing'|'bad'}
 */
function authorize(req, isApi) {
  const header = String(req.headers.authorization || '');
  const sp = header.indexOf(' ');
  const scheme = sp === -1 ? header : header.slice(0, sp);
  const cred = sp === -1 ? '' : header.slice(sp + 1).trim();
  if (!header) return 'missing';
  if (/^basic$/i.test(scheme)) {
    if (!PASSWORD) return 'bad';
    const decoded = Buffer.from(cred, 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) return 'bad';
    return safeEqual(decoded.slice(idx + 1), PASSWORD) ? 'basic' : 'bad';
  }
  if (/^bearer$/i.test(scheme)) {
    if (!cred) return 'bad';
    if (isApi && API_TOKEN && safeEqual(cred, API_TOKEN)) return 'bearer';
    return 'bad';
  }
  return 'bad';
}

// ------------------------------------------------------------- responses

function securityHeaders(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', CSP);
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  if (String(req.headers['x-forwarded-proto'] || '').startsWith('https')) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  }
}

// Pages and JSON are gzipped when they are big (/videos is ~650 KB of HTML),
// but only for requests nobody else can make on the viewer's behalf. Another
// site can make the browser load a page here (the cached password is sent),
// and a compressed page that reflects a query value next to private content
// leaks that content through its size (BREACH). So: same-origin requests and
// typed or bookmarked navigations (Sec-Fetch-Site: same-origin / none), and
// Bearer clients (a browser never attaches that header by itself). Anything
// else, including browsers that don't send Sec-Fetch-Site, gets it uncompressed.
const GZIP_MIN = 8 * 1024;
function acceptsGzip(req) {
  for (const part of String(req.headers['accept-encoding'] || '').toLowerCase().split(',')) {
    const [name, ...params] = part.trim().split(';').map((x) => x.trim());
    if (name !== 'gzip' && name !== 'x-gzip') continue;
    const q = params.find((p) => p.startsWith('q='));
    return !q || Number(q.slice(2)) > 0;
  }
  return false;
}
function mayCompress(req) {
  if (!acceptsGzip(req)) return false;
  const site = String(req.headers['sec-fetch-site'] || '').toLowerCase();
  if (site === 'same-origin' || site === 'none') return true;
  return /^bearer\s/i.test(String(req.headers.authorization || ''));
}

function send(req, res, status, body, headers = {}, { compress = false } = {}) {
  let buf = Buffer.isBuffer(body) ? body : Buffer.from(String(body ?? ''), 'utf8');
  const extra = {};
  if (compress) {
    extra.Vary = 'Accept-Encoding, Sec-Fetch-Site, Authorization';
    if (buf.length >= GZIP_MIN && mayCompress(req)) {
      buf = zlib.gzipSync(buf, { level: 6 });
      extra['Content-Encoding'] = 'gzip';
    }
  }
  res.writeHead(status, { 'Content-Length': buf.length, ...headers, ...extra });
  res.end(req.method === 'HEAD' ? undefined : buf);
}

const text = (req, res, status, body, extra = {}) =>
  send(req, res, status, body, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', ...extra });

const page = (req, res, status, body) =>
  send(req, res, status, String(body), { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-cache' }, { compress: true });

const json = (req, res, status, data, extra = {}) =>
  send(req, res, status, JSON.stringify(data, null, 2) + '\n', { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra }, { compress: true });

function unauthorized(req, res, isApi, scheme = 'Basic') {
  const headers = { 'WWW-Authenticate': `${scheme} realm="UGC Studio", charset="UTF-8"`, 'Cache-Control': 'no-store' };
  if (isApi) return send(req, res, 401, JSON.stringify({ error: 'unauthorized' }) + '\n', { ...headers, 'Content-Type': 'application/json; charset=utf-8' });
  return send(req, res, 401, 'Authentication required.\n', { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
}

async function serveAsset(req, res, name) {
  if (!Object.hasOwn(ASSETS, name)) return false;
  const type = ASSETS[name];
  const buf = await fsp.readFile(path.join(STUDIO_DIR, 'public', name));
  send(req, res, 200, buf, { 'Content-Type': type, 'Cache-Control': DEV ? 'no-cache' : 'private, max-age=86400' });
  return true;
}

/** Serve a file from this disk, with Range support. `download` asks the browser to save it. */
async function serveMedia(req, res, file, { download = false } = {}) {
  const total = file.size;
  const base = {
    'Content-Type': file.type,
    'Accept-Ranges': 'bytes',
    'Last-Modified': file.mtime.toUTCString(),
    'Cache-Control': 'private, max-age=3600',
    'Content-Disposition': download ? attachmentDisposition(file.name) : 'inline',
  };
  let start = 0;
  let end = total - 1;
  let status = 200;
  const range = req.headers.range;
  if (range && !range.includes(',')) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!m || (m[1] === '' && m[2] === '')) {
      return send(req, res, 416, '', { ...base, 'Content-Range': `bytes */${total}` });
    }
    if (m[1] === '') {
      const suffix = Number(m[2]);
      start = Math.max(0, total - suffix);
    } else {
      start = Number(m[1]);
      if (m[2] !== '') end = Math.min(Number(m[2]), total - 1);
    }
    if (start > end || start >= total || (m[1] === '' && Number(m[2]) === 0)) {
      return send(req, res, 416, '', { ...base, 'Content-Range': `bytes */${total}` });
    }
    status = 206;
    base['Content-Range'] = `bytes ${start}-${end}/${total}`;
  }
  const length = total === 0 ? 0 : end - start + 1;
  res.writeHead(status, { ...base, 'Content-Length': length });
  if (req.method === 'HEAD' || length === 0) return res.end();
  const stream = fs.createReadStream(file.abs, { start, end });
  stream.on('error', () => res.destroy());
  res.on('close', () => stream.destroy());
  stream.pipe(res);
}

/**
 * /media/<project>/<file...>: from this disk when the file is here (local dev),
 * else a 302 to a presigned GET on the bucket (Railway). The key is only ever
 * projects/<project>/outputs/<file>, for a project in the content and a plain
 * file name with a media extension (lib/storage.mjs checks it again).
 */
async function media(req, res, segs, query) {
  const [, folder, ...parts] = segs;
  const download = query.get('download') === '1';
  const file = await content.mediaFile(folder, parts.join('/'));
  if (file) return serveMedia(req, res, file, { download });
  if (bucket && parts.length === 1 && (await content.hasProject(folder))) {
    const url = bucket.presign(folder, parts[0], { download });
    // The URL stays the same for a few minutes (see storage.mjs), so the
    // redirect may be cached briefly; it is valid for at least 55 minutes.
    if (url) return send(req, res, 302, '', { Location: url, 'Cache-Control': 'private, max-age=300' });
  }
  return text(req, res, 404, 'Not found\n');
}

// -------------------------------------------------------------- media API

/**
 * GET /api/media/<project>: what the bucket holds for that project (read-only;
 * Basic or Bearer). [] without a bucket. Cached like the gallery (~60 s).
 * /media itself takes the password only, so each file also carries presigned
 * bucket links a Bearer client can fetch directly: signedUrl (inline),
 * signedDownloadUrl (attachment), both good until signedUntil (about an hour).
 */
async function mediaApi(req, res, segs) {
  if (segs.length !== 3) return json(req, res, 404, { error: 'not found' });
  const project = segs[2];
  if (!LISTABLE(project) || !(await content.hasProject(project))) return json(req, res, 404, { error: 'unknown project' });
  const files = bucket ? (await bucket.list()).get(project) || [] : [];
  const until = bucket ? bucket.signedUntil() : null;
  const out = files.map((f) => ({
    name: f.name,
    size: f.size,
    etag: f.etag || null,
    mtime: f.mtime || null,
    url: mediaUrl(project, f.name),
    signedUrl: bucket.presign(project, f.name),
    signedDownloadUrl: bucket.presign(project, f.name, { download: true }),
    signedUntil: until,
  }));
  return json(req, res, 200, out, { 'X-Media-Storage': bucket ? 'bucket' : 'none' });
}

// ---------------------------------------------------------------- routing

function ideaJson(i) {
  // Frontmatter as written, plus defaults for anything missing. `venture` is the folder name.
  const out = { ...i.fm, slug: i.slug, venture: i.venture };
  if (out.id === undefined || out.id === null || out.id === '') out.id = i.id;
  if (out.title === undefined || out.title === null || out.title === '') out.title = i.title;
  if (out.status === undefined || out.status === null || out.status === '') out.status = i.status;
  if ((out.hook === undefined || out.hook === null || out.hook === '') && i.hook) out.hook = i.hook; // from the "Hook:" beat
  out.stage = i.status; // normalised status, e.g. "in production"
  out.path = i.doc.rel;
  out.url = i.url;
  if (i.warning) out.warning = i.warning;
  out.body = i.doc.body;
  return out;
}

function projectJson(p) {
  return {
    folder: p.folder,
    title: p.title,
    date: p.date || null,
    venture: p.venture || null,
    status: p.status || null,
    idea: p.idea || null,
    figma: p.figma || null,
    meta: p.meta,
    url: p.url,
    files: p.docs.map((d) => ({ name: `${d.name}.md`, path: d.rel, body: d.body })),
    // url: the file itself. play: what the page plays (the small preview when
    // there is one). download: the full-quality file as an attachment.
    media: p.media.map((m) => ({ path: m.rel, url: m.url, play: m.playUrl, download: m.downloadUrl, kind: m.kind, type: m.type, size: m.size, preview: !!m.preview })),
  };
}

/** voice-script.txt for one project: every line to say, one per line. */
function voiceScriptTxt(req, res, p) {
  const script = p.vo ? voScript(p.vo) : null;
  if (!script) return text(req, res, 404, 'No voice script for this project.\n');
  return send(req, res, 200, scriptText(script), {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': attachmentDisposition(`${p.folder}-voice-script.txt`),
    'Cache-Control': 'private, no-cache',
  });
}

async function route(req, res, segs, query) {
  const [a, b, c] = segs;
  const n = segs.length;

  if (n === 0) {
    const snap = await content.snapshot();
    return page(req, res, 200, views.homePage(ctxFor(snap), snap));
  }

  if (a === 'assets' && n === 2) {
    if (await serveAsset(req, res, b)) return;
    return text(req, res, 404, 'Not found\n');
  }

  if (a === 'search.json' && n === 1) {
    const snap = await content.snapshot();
    const pb = await content.playbook();
    return send(
      req,
      res,
      200,
      JSON.stringify(views.searchIndex(snap, pb)),
      { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'private, no-cache' },
      { compress: true },
    );
  }

  if (a === 'media' && n >= 3) return media(req, res, segs, query);

  if (a === 'api' && b === 'media') return mediaApi(req, res, segs);

  if (a === 'api') {
    const snap = await content.snapshot();
    if (b === 'ideas' && n === 2) return json(req, res, 200, snap.ideas.map(ideaJson));
    if (b === 'ideas' && n === 4) {
      const idea = snap.ideas.find((i) => i.venture === c && i.slug === segs[3]);
      return idea ? json(req, res, 200, ideaJson(idea)) : json(req, res, 404, { error: 'not found' });
    }
    if (b === 'ventures' && n === 2) {
      return json(
        req,
        res,
        200,
        snap.ventures.map((v) => ({
          name: v.name,
          title: v.title,
          label: v.label,
          domain: v.domain || null,
          openQuestions: v.openQuestions,
          ideas: snap.ideas.filter((i) => i.venture === v.name).length,
          hasProfile: !v.missing,
          path: v.doc ? v.doc.rel : null,
          url: v.url,
          body: v.doc ? v.doc.body : null,
        })),
      );
    }
    if (b === 'projects' && n === 2) return json(req, res, 200, snap.projects.map(projectJson));
    return json(req, res, 404, { error: 'not found' });
  }

  const snap = await content.snapshot();
  const vctx = ctxFor(snap);

  if (a === 'ideas') {
    if (n === 1) return page(req, res, 200, views.ideasPage(vctx, snap, query));
    if (n === 3) {
      const idea = snap.ideas.find((i) => i.venture === b && i.slug === c);
      if (idea) return page(req, res, 200, views.ideaPage(vctx, snap, idea));
    }
    return page(req, res, 404, views.notFoundPage(vctx, 'idea'));
  }

  if (a === 'ventures') {
    if (n === 1) return page(req, res, 200, views.venturesPage(vctx, snap));
    if (n === 2) {
      const v = snap.ventures.find((x) => x.name === b);
      if (v) return page(req, res, 200, views.venturePage(vctx, snap, v));
    }
    return page(req, res, 404, views.notFoundPage(vctx, 'venture'));
  }

  if (a === 'videos') {
    if (n === 1) return page(req, res, 200, views.videosPage(vctx, snap, videoCards(snap.projects), query));
    if (n === 3 && c === 'voice-script.txt') {
      const p = snap.projects.find((x) => x.folder === b);
      if (p) return voiceScriptTxt(req, res, p);
    }
    return page(req, res, 404, views.notFoundPage(vctx, 'video'));
  }

  if (a === 'projects') {
    if (n === 1) return page(req, res, 200, views.projectsPage(vctx, snap));
    if (n === 2) {
      const p = snap.projects.find((x) => x.folder === b);
      if (p) return page(req, res, 200, views.projectPage(vctx, snap, p, query.get('tab') || ''));
    }
    return page(req, res, 404, views.notFoundPage(vctx, 'project'));
  }

  if (a === 'research') {
    if (n === 1) return page(req, res, 200, views.researchPage(vctx, snap));
    if (n === 2) {
      const slug = b.replace(/\.md$/i, '');
      const r = snap.research.find((x) => x.slug === slug);
      if (r) return page(req, res, 200, views.researchDocPage(vctx, snap, r));
    }
    return page(req, res, 404, views.notFoundPage(vctx, 'research note'));
  }

  if (a === 'log' && n === 1) return page(req, res, 200, views.logPage(vctx, snap));
  if (a === 'learnings' && n === 1) return page(req, res, 200, views.learningsPage(vctx, snap));

  if (a === 'playbook') {
    const pb = await content.playbook();
    if (n === 1) return page(req, res, 200, views.playbookPage(vctx, pb, null));
    if (n === 2) {
      const slug = b.replace(/\.md$/i, '');
      const ref = pb.refs.find((r) => r.slug === slug);
      if (ref) return page(req, res, 200, views.playbookPage(vctx, pb, ref));
    }
    return page(req, res, 404, views.notFoundPage(vctx, 'playbook page'));
  }

  return page(req, res, 404, views.notFoundPage(vctx));
}

async function handle(req, res) {
  securityHeaders(req, res);

  // Work on the raw path: never let URL normalisation resolve "..".
  const rawUrl = req.url || '/';
  const q = rawUrl.indexOf('?');
  const rawPath = q === -1 ? rawUrl : rawUrl.slice(0, q);
  const query = new URLSearchParams(q === -1 ? '' : rawUrl.slice(q + 1));

  // Read-only: nothing here writes (media goes straight to the bucket).
  if (req.method !== 'GET' && req.method !== 'HEAD') return text(req, res, 405, 'Method not allowed\n', { Allow: 'GET, HEAD' });

  // Unhealthy without a password, so Railway keeps the previous deploy instead of
  // swapping in a studio that answers 503 everywhere.
  if (rawPath === '/healthz') return PASSWORD || DEV ? text(req, res, 200, 'ok') : text(req, res, 503, 'STUDIO_PASSWORD not set\n');
  if (rawPath === '/robots.txt') return text(req, res, 200, 'User-agent: *\nDisallow: /\n');

  // Fail closed: no password, no studio (unless explicitly in dev mode).
  if (!PASSWORD && !DEV) return text(req, res, 503, 'STUDIO_PASSWORD not set\n');

  const isApi = rawPath === '/api' || rawPath.startsWith('/api/');
  if (PASSWORD && !isPublicPath(rawPath)) {
    const ip = clientIp(req);
    if (throttle.isLockedOut(ip)) return text(req, res, 429, 'Too many attempts. Try again later.\n', { 'Retry-After': '900' });
    const result = authorize(req, isApi);
    if (result === 'missing' || result === 'bad') {
      if (result === 'bad') {
        throttle.noteFailure(ip);
        if (throttle.slow()) await sleep(1000);
      }
      return unauthorized(req, res, isApi);
    }
  }

  if (rawPath === '/favicon.ico') return send(req, res, 204, '');

  // Decode once, then reject anything that could climb out of a directory.
  let decoded;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {
    return text(req, res, 400, 'Bad request\n');
  }
  if (!decoded.startsWith('/') || rawPath.includes('..') || decoded.includes('..') || decoded.includes('\0') || decoded.includes('\\')) {
    return text(req, res, 400, 'Bad request\n');
  }
  // Project and file names are single path segments: an encoded separator is never part of one.
  if (/^\/(api\/)?media\//.test(rawPath) && /%(2f|5c|00)/i.test(rawPath)) return text(req, res, 400, 'Bad request\n');
  const segs = decoded.split('/').filter(Boolean);
  if (segs.some((s) => s.startsWith('.'))) return text(req, res, 404, 'Not found\n');

  return route(req, res, segs, query);
}

/**
 * A response can go out before the request body has been read (a refused PUT
 * or POST). Drain what is left so the client can read the answer, but never
 * for more than a few seconds.
 */
function lingerOnUnreadBody(req, res) {
  res.on('finish', () => {
    if (req.complete || req.destroyed) return;
    const t = setTimeout(() => req.socket?.destroy(), 5_000);
    t.unref();
    req.once('end', () => clearTimeout(t));
    req.once('close', () => clearTimeout(t));
    req.resume();
  });
}

function onRequest(req, res) {
  lingerOnUnreadBody(req, res);
  handle(req, res).catch((err) => {
    console.error(`[studio] ${req.method} ${req.url} failed:`, err);
    if (res.headersSent) return res.destroy();
    try {
      page(req, res, 500, views.errorPage(ctx));
    } catch {
      res.destroy();
    }
  });
}

const server = http.createServer(onRequest);
// Requests carry no bodies worth waiting for: headers within 20s, the whole
// request within 30s (responses, like a long local video, are not limited).
server.headersTimeout = 20_000;
server.requestTimeout = 30_000;

server.listen(PORT, HOST, () => {
  const mode = PASSWORD ? 'password required' : DEV ? 'DEV MODE, no password' : 'locked: STUDIO_PASSWORD not set';
  const addr = server.address();
  const shown = addr.family === 'IPv6' ? `[${addr.address}]` : addr.address;
  console.log(`[studio] UGC Studio on http://${shown}:${addr.port} (${mode})`);
  console.log(`[studio] content root: ${ROOT}`);
  const where = bucket
    ? `bucket ${bucket.bucket} (${bucket.origin}), presigned links; local outputs/ first when present`
    : `local outputs/ only (${bucketDisabled ? 'bucket disabled, see above' : 'no BUCKET_* set'})`;
  console.log(`[studio] media: ${where}`);
});

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 2000).unref();
  });
}
