// UGC Studio checks. No test framework: spawns the real server and asserts over HTTP.
//   npm run check
//
// 0. Units: markdown sanitizer against bypass payloads, login throttle, dark-mode tokens,
//    the SigV4 signer against AWS's published examples, streamed uploads that fail or
//    are refused early (the file is released), bucket key rules, the Videos page
//    helpers (two-voice scripts, per-platform captions), and .railwayignore (git
//    check-ignore in a throwaway repo).
// 1. Real content, a 16+ character password (+ API token): auth, pages, API, traversal,
//    headers, gzip (never for requests another site could trigger: BREACH).
// 2. No STUDIO_PASSWORD: fails closed (503), /healthz too.
// 3. Startup rules: dev mode binds 127.0.0.1, never switches on in a Railway deploy;
//    short passwords and tokens are refused.
// 4. Login throttle over HTTP: X-Forwarded-For is ignored; on Railway X-Real-IP is used.
// 5. A temporary fixture copy of the content with a project, media, malformed and
//    hostile cards, a circular-YAML card, odd file names, a symlinked outputs/
//    and decoy secrets: media, ranges, downloads, /videos, sanitising, isolation,
//    traversal.
// 6. Storage bucket, against a fake S3 on 127.0.0.1 (fake credentials, no network):
//    /media redirects to presigned GETs (and they verify), downloads, traversal,
//    the gallery and /videos from the bucket listing (cached), the read-only media
//    API and its presigned links for Bearer clients, a bucket that is down, and
//    tools/motion/sync-media.mjs end to end.

import { spawn, spawnSync } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { renderMarkdown, configureMarkdown } from './lib/markdown.mjs';
import { createThrottle } from './lib/throttle.mjs';
import { createS3, sigv4, sha256Hex, uriEncode, encodeKey, canonicalQuery, attachmentDisposition, bucketConfigFromEnv } from './lib/s3.mjs';
import { mediaKey, parseMediaKey } from './lib/storage.mjs';
import { shortHow, sayText, captionMarkdown, captionParts, plainFromMarkdown, voScript, scriptText } from './lib/videos.mjs';

const STUDIO = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(STUDIO, '..');
const SERVER = path.join(STUDIO, 'server.mjs');
const SYNC = path.join(ROOT, 'tools', 'motion', 'sync-media.mjs');
const PASSWORD = `test-${crypto.randomBytes(8).toString('hex')}`;
const TOKEN = `check-${crypto.randomBytes(12).toString('hex')}`;
const BASIC = `Basic ${Buffer.from(`studio:${PASSWORD}`).toString('base64')}`;
const WRONG = `Basic ${Buffer.from('studio:nope').toString('base64')}`;
const AUTH = { Authorization: BASIC };

let passed = 0;
let failed = 0;
const children = new Set();
const tmpDirs = new Set(); // removed at the end even if a phase throws

function check(name, cond, detail = '') {
  if (cond) {
    passed++;
    console.log(`  ok    ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name}${detail ? `  -> ${detail}` : ''}`);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.unref();
    s.on('error', reject);
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

/** Raw HTTP request: the path is sent exactly as given (no URL normalisation). */
function request(port, rawPath, { headers = {}, method = 'GET', timeout = 60_000 } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path: rawPath, method, headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks);
        resolve({ status: res.statusCode, headers: res.headers, body: raw.toString('utf8'), raw });
      });
      res.on('error', reject);
    });
    req.setTimeout(timeout, () => req.destroy(new Error(`timeout: ${rawPath}`)));
    req.on('error', reject);
    req.end();
  });
}

/**
 * Raw request with a body (Content-Length set). Never rejects: a refused request
 * may be answered and closed before its body is read, so an error after the
 * answer is ignored and an error before one resolves { status: 0 }.
 */
function rawRequest(port, rawPath, { method, headers = {}, body = Buffer.alloc(0) }) {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port, path: rawPath, method, headers: { ...headers, 'Content-Length': String(body.length) }, agent: false });
    req.on('response', (res) => {
      const chunks = [];
      const done = () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') });
      res.on('data', (c) => chunks.push(c));
      res.on('end', done);
      res.on('error', done);
    });
    req.on('error', (e) => resolve({ status: 0, error: e.message, body: '' }));
    req.setTimeout(30_000, () => req.destroy(new Error(`timeout: ${rawPath}`)));
    req.end(body);
  });
}

function childEnv(port, env, { host = '127.0.0.1' } = {}) {
  const e = { ...process.env, PORT: String(port) };
  // STUDIO_MEDIA_TOKEN, MEDIA_DIR and MEDIA_MAX_BYTES belong to the removed
  // upload API. They stay in this list on purpose: a stale setting in the shell
  // must never reach the server under test.
  for (const k of ['HOST', 'STUDIO_PASSWORD', 'STUDIO_API_TOKEN', 'STUDIO_DEV', 'STUDIO_CONTENT_ROOT', 'STUDIO_MEDIA_TOKEN', 'MEDIA_DIR', 'MEDIA_MAX_BYTES']) delete e[k];
  e.STUDIO_PUBLIC_VIDEOS = '0'; // the existing suite checks the locked-down behaviour; public mode has its own test
  for (const k of Object.keys(e)) if (k.startsWith('RAILWAY_') || k.startsWith('BUCKET_')) delete e[k];
  if (host) e.HOST = host;
  return Object.assign(e, env);
}

/** Start the server and wait until /healthz answers with one of `up` (200, or 503 when locked). */
async function startServer(label, env, { host = '127.0.0.1', up = [200] } = {}) {
  const port = await freePort();
  const child = spawn(process.execPath, [SERVER], { env: childEnv(port, env, { host }), stdio: ['ignore', 'pipe', 'pipe'] });
  children.add(child);
  let log = '';
  child.stdout.on('data', (d) => (log += d));
  child.stderr.on('data', (d) => (log += d));
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`${label}: server exited early\n${log}`);
    try {
      const r = await request(port, '/healthz', { timeout: 5_000 });
      if (up.includes(r.status)) return { port, child, log: () => log };
    } catch {}
    await sleep(300);
  }
  throw new Error(`${label}: server did not become healthy\n${log}`);
}

/** Start the server expecting it to refuse to start. Resolves { code, log }. */
async function runToExit(env, { host = '127.0.0.1', timeout = 60_000 } = {}) {
  const port = await freePort();
  const child = spawn(process.execPath, [SERVER], { env: childEnv(port, env, { host }), stdio: ['ignore', 'pipe', 'pipe'] });
  children.add(child);
  let log = '';
  child.stdout.on('data', (d) => (log += d));
  child.stderr.on('data', (d) => (log += d));
  const code = await new Promise((resolve) => {
    const t = setTimeout(() => {
      child.kill('SIGKILL');
      resolve('timeout');
    }, timeout);
    child.on('exit', (c) => {
      clearTimeout(t);
      resolve(c);
    });
  });
  children.delete(child);
  return { code, log };
}

/**
 * Tokenise HTML roughly the way a browser does (comments, then tags with quoted
 * attribute values) and return every live tag with its attributes. Used to prove
 * that no event handler or script URL survives, however the input was shaped.
 */
function liveTags(src) {
  const tags = [];
  let i = 0;
  while ((i = src.indexOf('<', i)) !== -1) {
    if (src.startsWith('<!--', i)) {
      const e = src.indexOf('-->', i + 4);
      i = e === -1 ? src.length : e + 3;
      continue;
    }
    const m = /^<([a-zA-Z][^\s/>]*)/.exec(src.slice(i, i + 64));
    if (!m) {
      i++;
      continue;
    }
    let j = i + m[0].length;
    const attrs = [];
    while (j < src.length) {
      while (j < src.length && /[\s/]/.test(src[j])) j++;
      if (j >= src.length || src[j] === '>') {
        j++;
        break;
      }
      let name = src[j++]; // first char may be anything, even "="
      while (j < src.length && !/[\s/>=]/.test(src[j])) name += src[j++];
      while (j < src.length && /\s/.test(src[j])) j++;
      let value = '';
      if (src[j] === '=') {
        j++;
        while (j < src.length && /\s/.test(src[j])) j++;
        const q = src[j];
        if (q === '"' || q === "'") {
          const e = src.indexOf(q, j + 1);
          value = src.slice(j + 1, e === -1 ? src.length : e);
          j = e === -1 ? src.length : e + 1;
        } else {
          while (j < src.length && !/[\s>]/.test(src[j])) value += src[j++];
        }
      }
      attrs.push([name.toLowerCase(), value]);
    }
    tags.push({ name: m[1].toLowerCase(), attrs });
    i = j;
  }
  return tags;
}

const decodeAttr = (v) =>
  v
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&colon;/gi, ':')
    .replace(/[\u0000-\u0020]+/g, '')
    .toLowerCase();

/** Problems a browser would execute, or null. Own <script src="/assets/..."> tags are allowed. */
function liveDanger(src) {
  for (const t of liveTags(src)) {
    if (t.name === 'script' && !t.attrs.some(([k, v]) => k === 'src' && v.startsWith('/assets/'))) return `<script> tag`;
    if (['iframe', 'object', 'embed', 'base', 'form', 'frame', 'meta'].includes(t.name) && !(t.name === 'meta' && !t.attrs.some(([k]) => k === 'http-equiv'))) return `<${t.name}> tag`;
    for (const [k, v] of t.attrs) {
      if (k.startsWith('on')) return `<${t.name} ${k}=...>`;
      if (['href', 'src', 'action', 'formaction', 'xlink:href'].includes(k) && /^(javascript|vbscript|data):/.test(decodeAttr(v))) return `<${t.name} ${k}="${v}">`;
    }
  }
  return null;
}

const XSS_PAYLOADS = [
  '<!--<img alt="--><img src=x onerror=alert(1)>">',
  'hi <img alt="x> ❓ <img src=x onerror=alert(1)>"> there',
  'hi <img alt="x> research/2026-09-28-qsme-site-review.md <a href=javascript:alert(1)>y</a>"> there',
  '<scr<!-- -->ipt>alert(1)</script>',
  '<!--><img src=x onerror=alert(1)>',
  '<!---><img src=x onerror=alert(1)>-->',
  '<![CDATA[><img src=x onerror=alert(1)>]]>',
  '<?xml ?><img src=x onerror=alert(1)>',
  '<a href="jav&#x09;ascript:alert(1)">x</a>',
  '<a href=" javascript:alert(1)">x</a>',
  '<img src=x onerror = alert(1)>',
  '<img/src=x/onerror=alert(1)>',
  '<svg><script>alert(1)</script></svg>',
  '<sc<script></script>ript>alert(1)</script>',
  '<div title="a\'b" onclick="alert(1)">x</div>',
  "<div title='\" onmouseover=alert(1) x='>y</div>",
  '</p foo="<img src=x onerror=alert(1)>">',
  '[x](javascript:alert(1)) ![y](javascript:alert(2))',
  '<a href="data:text/html,<script>alert(1)</script>">d</a>',
];

// ----------------------------------------------------------------- phase 0

async function phaseUnits() {
  console.log('\n0. Units: sanitizer, throttle, theme tokens');
  configureMarkdown({ root: ROOT });
  for (const p of XSS_PAYLOADS) {
    const out = renderMarkdown(p, { docRel: 'research/x.md' });
    const danger = liveDanger(out);
    check(`sanitizer: ${JSON.stringify(p).slice(0, 70)}`, !danger && !/<img src=x onerror|<a href=javascript/i.test(out), danger || out);
  }
  // Text decoration (❓, path links, quotes) must never reach inside an attribute value.
  const deco = renderMarkdown('<img alt="a ❓ b \'c\' research/2026-09-28-qsme-site-review.md">', { docRel: 'research/x.md' });
  check('sanitizer: decoration stays out of attribute values', liveTags(deco).every((t) => t.name !== 'span' && t.name !== 'a'), deco);

  let t0 = 0;
  const th = createThrottle({ now: () => t0 });
  for (let k = 0; k < 30; k++) th.noteFailure('attacker');
  check('throttle: 30 failures lock a key out', th.isLockedOut('attacker'));
  check('throttle: other keys are unaffected', !th.isLockedOut('owner'));
  for (let k = 0; k < 6000; k++) th.noteFailure(`flood-${k}`);
  check('throttle: a flood of 6000 new keys does not wipe a lockout', th.isLockedOut('attacker'));
  check('throttle: memory stays bounded', th.size() <= 5000, String(th.size()));
  check('throttle: a wide attack switches on the global slow-down', th.slow());
  t0 += 15 * 60 * 1000 + 1;
  check('throttle: lockout ends after the window', !th.isLockedOut('attacker'));
  check('throttle: slow-down ends after the window', !th.slow());

  const css = fs.readFileSync(path.join(STUDIO, 'public', 'styles.css'), 'utf8');
  const block = (re) => {
    const m = re.exec(css);
    return m ? [...m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((x) => `${x[1]}:${x[2].trim()}`).sort().join('\n') : '';
  };
  const a = block(/:root:not\(\[data-theme="light"\]\)\s*\{([^}]*)\}/);
  const b = block(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/);
  check('styles: the two dark-mode token blocks are identical', a && a === b, 'they drifted apart');
  const light = new Set([...(/:root\s*\{([^}]*)\}/.exec(css)?.[1] || '').matchAll(/(--[\w-]+)\s*:/g)].map((x) => x[1]));
  const missing = [...a.matchAll(/^(--[\w-]+):/gm)].map((x) => x[1]).filter((k) => !light.has(k));
  check('styles: every dark token also has a light value', missing.length === 0, missing.join(', '));

  unitsS3();
  await unitsS3Streams();
  unitsVideos();
  railwayIgnoreCheck();
}

/** A slow upload body: `total` bytes in 64 KB chunks, a few ms apart. */
function slowBody(total) {
  let sent = 0;
  const r = new Readable({
    read() {
      if (sent >= total) return this.push(null);
      setTimeout(() => {
        const n = Math.min(64 * 1024, total - sent);
        sent += n;
        this.push(Buffer.alloc(n));
      }, 2);
    },
  });
  r.sent = () => sent;
  return r;
}

/**
 * Streamed uploads release their file when the bucket answers early or the
 * connection fails (a bare pipe() left the read stream, and its descriptor, open).
 */
async function unitsS3Streams() {
  const total = 64 * 1024 * 1024;
  const serve = (handler) =>
    new Promise((resolve) => {
      const srv = http.createServer(handler);
      srv.listen(0, '127.0.0.1', () => resolve(srv));
    });
  const client = (srv) => createS3({ bucket: 'unit-bucket', endpoint: `http://localhost:${srv.address().port}`, accessKeyId: 'AKIDUNIT', secretAccessKey: 'SECRET-UNIT-STREAMS', timeoutMs: 10_000 });

  // 1. The bucket refuses at once (403) and keeps reading what is sent.
  const early = await serve((req, res) => {
    res.writeHead(403, { 'content-type': 'application/xml' });
    res.end('<?xml version="1.0"?><Error><Code>AccessDenied</Code><Message>no (unit)</Message></Error>');
  });
  let s3 = client(early);
  let body = slowBody(total);
  let err = null;
  try {
    await s3.putObject('projects/p/outputs/x.mp4', body, { contentLength: total, contentType: 'video/mp4' });
  } catch (e) {
    err = e;
  }
  await sleep(50);
  check('s3: an early 403 is reported as the bucket said it (not a broken pipe)', err?.status === 403 && err.code === 'AccessDenied' && !String(err.message).includes('SECRET'), err?.message);
  check('s3: ...and the upload stream is closed then, not read to the end', body.destroyed && body.sent() < total, `destroyed=${body.destroyed} sent=${body.sent()}/${total}`);
  s3.close();
  early.close();

  // 2. The connection drops mid-upload.
  const reset = await serve((req) => req.socket.destroy());
  s3 = client(reset);
  body = slowBody(total);
  err = null;
  try {
    await s3.putObject('projects/p/outputs/x.mp4', body, { contentLength: total, contentType: 'video/mp4' });
  } catch (e) {
    err = e;
  }
  await sleep(50);
  check('s3: a dropped connection fails the upload with an S3Error', err?.name === 'S3Error' && /PUT failed/.test(err.message), err?.message);
  check('s3: ...and destroys the upload stream (no leaked file descriptor)', body.destroyed && body.sent() < total, `destroyed=${body.destroyed} sent=${body.sent()}/${total}`);
  s3.close();
  reset.close();

  // 3. A real file that succeeds is closed afterwards; one that can't be read fails cleanly.
  const ok = await serve((req, res) => {
    let n = 0;
    req.on('data', (c) => (n += c.length));
    req.on('end', () => {
      res.writeHead(n === 300_000 ? 200 : 400, { etag: '"x"' });
      res.end();
    });
  });
  s3 = client(ok);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-studio-s3-'));
  tmpDirs.add(tmp);
  const file = path.join(tmp, 'clip.mp4');
  fs.writeFileSync(file, crypto.randomBytes(300_000));
  const rs = fs.createReadStream(file);
  let put = null;
  try {
    put = await s3.putObject('projects/p/outputs/clip.mp4', rs, { contentType: 'video/mp4' });
  } catch (e) {
    err = e;
  }
  await sleep(20);
  check('s3: a streamed file upload succeeds and the file is closed', put?.size === 300_000 && rs.destroyed && rs.closed !== false, `${put?.size} destroyed=${rs.destroyed}`);
  err = null;
  try {
    await s3.putObject('projects/p/outputs/gone.mp4', fs.createReadStream(path.join(tmp, 'missing.mp4')), { contentLength: 10, contentType: 'video/mp4' });
  } catch (e) {
    err = e;
  }
  check('s3: an unreadable file fails with "reading the upload failed"', err?.name === 'S3Error' && /reading the upload failed: ENOENT/.test(err.message), err?.message);
  s3.close();
  ok.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}

// AWS's published SigV4 examples for S3 ("Signature Calculations for the
// Authorization Header: Transferring Payload in a Single Chunk" and
// "Authenticating Requests: Using Query Parameters"), same keys and date.
const AWS_EXAMPLE = { bucket: 'examplebucket', endpoint: 'https://s3.amazonaws.com', region: 'us-east-1', accessKeyId: 'AKIAIOSFODNN7EXAMPLE', secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY' };

function unitsS3() {
  const ex = createS3(AWS_EXAMPLE);
  const date = new Date('2013-05-24T00:00:00Z');
  try {
    const url = ex.presignGet('test.txt', { expires: 86400, date });
    check(
      'sigv4: AWS presigned GET example (examplebucket/test.txt) matches the published URL',
      url ===
        'https://examplebucket.s3.amazonaws.com/test.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20130524%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20130524T000000Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404',
      url,
    );
    let sg = ex.sign('GET', 'test.txt', { headers: { range: 'bytes=0-9' }, date });
    check('sigv4: AWS GET Object example (Range) canonical request hash', sha256Hex(sg.canonicalRequest) === '7344ae5b7ee6c3e7e6b0fe0640412a37625d1fbfff95c48bbb2dc43964946972', sg.canonicalRequest);
    check('sigv4: AWS GET Object example signature', sg.signature === 'f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41', sg.signature);
    sg = ex.sign('PUT', 'test$file.text', { headers: { date: 'Fri, 24 May 2013 00:00:00 GMT', 'x-amz-storage-class': 'REDUCED_REDUNDANCY' }, payloadHash: sha256Hex('Welcome to Amazon S3.'), date });
    check('sigv4: AWS PUT Object example ("$" in the key) signature', sg.path === '/test%24file.text' && sg.signature === '98ad721746da40c64f1a55b78f14c238d841ea1380cd77a1b5971af0ece108bd', `${sg.path} ${sg.signature}`);
    sg = ex.sign('GET', '', { query: [['max-keys', '2'], ['prefix', 'J']], date });
    check('sigv4: AWS GET Bucket (list) example signature', sg.signature === '34b48302e7b5fa45bde8084f4b7868a86f0a534bc59db6670ed5711ef69dc6f7', sg.signature);
  } finally {
    ex.close();
  }

  check('s3: keys encode per segment (space, unicode, reserved), "/" kept', encodeKey("projects/a b/outputs/café +(1)*!'~.png") === 'projects/a%20b/outputs/caf%C3%A9%20%2B%281%29%2A%21%27~.png', encodeKey("projects/a b/outputs/café +(1)*!'~.png"));
  check('s3: a query value encodes "/" and sorts by key', canonicalQuery([['prefix', 'projects/a b'], ['list-type', '2']]) === 'list-type=2&prefix=projects%2Fa%20b' && uriEncode('a/b') === 'a%2Fb');
  check('s3: attachment disposition, plain name', attachmentDisposition('reel-9x16.mp4') === 'attachment; filename="reel-9x16.mp4"');
  const disp = attachmentDisposition('café "x".mp4');
  check('s3: attachment disposition, unicode and quotes get filename*', disp === `attachment; filename="caf_ _x_.mp4"; filename*=UTF-8''caf%C3%A9%20%22x%22.mp4`, disp);

  const fake = createS3({ bucket: 'check-bucket', endpoint: 'https://t3.storageapi.test', region: 'auto', accessKeyId: 'AKIDUNITCHECK', secretAccessKey: 'SECRET-UNIT-CHECK-0123456789' });
  try {
    const t = new Date('2026-10-04T10:00:00Z');
    let url = fake.presignGet('projects/p/outputs/café clip.mp4', { date: t });
    const u = new URL(url);
    check('s3: presigned URL is virtual-hosted on the bucket host', u.host === 'check-bucket.t3.storageapi.test' && u.pathname === '/projects/p/outputs/caf%C3%A9%20clip.mp4', url);
    check('s3: presigned URL defaults to 1 hour, never carries the secret', u.searchParams.get('X-Amz-Expires') === '3600' && /^[0-9a-f]{64}$/.test(u.searchParams.get('X-Amz-Signature') || '') && !url.includes('SECRET-UNIT-CHECK'), url);
    const q = [...u.searchParams].filter(([k]) => k !== 'X-Amz-Signature');
    const again = sigv4({ method: 'GET', path: u.pathname, query: q, headers: { host: u.host }, payloadHash: 'UNSIGNED-PAYLOAD', amzDate: u.searchParams.get('X-Amz-Date'), region: 'auto', accessKeyId: 'AKIDUNITCHECK', secretAccessKey: 'SECRET-UNIT-CHECK-0123456789' });
    check('s3: presigned signature re-derives from the URL alone', again.signature === u.searchParams.get('X-Amz-Signature'));
    url = fake.presignGet('projects/p/outputs/x.mp4', { date: t, download: 'x.mp4' });
    check('s3: download adds response-content-disposition=attachment', new URL(url).searchParams.get('response-content-disposition') === 'attachment; filename="x.mp4"', url);
  } finally {
    fake.close();
  }
  let threw = '';
  try {
    createS3({ bucket: 'b', endpoint: 'http://storage.example.com', accessKeyId: 'a', secretAccessKey: 'b' });
  } catch (e) {
    threw = e.message;
  }
  check('s3: plain http is refused except on loopback', /must be https/.test(threw), threw);
  threw = '';
  try {
    createS3({ bucket: 'b', endpoint: 'http://127.0.0.1:9000', accessKeyId: 'a', secretAccessKey: 'b' });
  } catch (e) {
    threw = e.message;
  }
  check('s3: an IP-address endpoint is refused (no virtual host)', /must be a host name/.test(threw), threw);
  check('s3: no BUCKET_* -> no bucket', bucketConfigFromEnv({}) === null);
  threw = '';
  try {
    bucketConfigFromEnv({ BUCKET_NAME: 'b', BUCKET_SECRET_ACCESS_KEY: 'never-shown' });
  } catch (e) {
    threw = e.message;
  }
  check('s3: partial BUCKET_* names what is missing, never a value', /BUCKET_ENDPOINT, BUCKET_ACCESS_KEY_ID/.test(threw) && !threw.includes('never-shown'), threw);
  check('s3: BUCKET_REGION defaults to auto', bucketConfigFromEnv({ BUCKET_NAME: 'b', BUCKET_ENDPOINT: 'https://e.test', BUCKET_ACCESS_KEY_ID: 'a', BUCKET_SECRET_ACCESS_KEY: 's' })?.region === 'auto');

  check('keys: projects/<p>/outputs/<file>', mediaKey('2026-10-02-p', 'reel 9x16.mp4') === 'projects/2026-10-02-p/outputs/reel 9x16.mp4');
  const bad = [['p', '../x.mp4'], ['p', 'a/b.mp4'], ['p', '.env.mp4'], ['p', '_x.mp4'], ['p', 'x.txt'], ['p', 'x\n.mp4'], ['p', 'a\\b.png'], ['p', '..'], ['p', ''], ['..', 'x.mp4'], ['a/b', 'x.mp4'], ['_template', 'x.mp4'], ['.git', 'x.mp4'], ['', 'x.mp4'], ['p\u0000', 'x.mp4']];
  const leaked = bad.filter(([f, n]) => mediaKey(f, n) !== null);
  check('keys: nothing that could leave projects/<p>/outputs/ gets a key', leaked.length === 0, JSON.stringify(leaked));
  check('keys: the listing ignores anything but top-level outputs files', parseMediaKey('projects/p/outputs/x.png')?.name === 'x.png' && ![
    'projects/p/outputs/sub/x.png', 'projects/p/x.png', 'other/p/outputs/x.png', 'projects/_template/outputs/x.png', 'projects/p/outputs/x.txt', 'projects/../outputs/x.png',
  ].some((k) => parseMediaKey(k)));
}

function unitsVideos() {
  check('videos: "how" is the first sentence', shortHow('Dry, tired Kiwi deadpan. Falls at the end. Out by 2.9.') === 'Dry, tired Kiwi deadpan.', shortHow('Dry, tired Kiwi deadpan. Falls at the end. Out by 2.9.'));
  check('videos: "how" drops production timings', shortHow('Brisk (about 1.2 s) and warm, out by 4.4. Then more.') === 'Brisk and warm, out by 4.4.' && shortHow('Warm and certain. Out by 4.4, before the cut.') === 'Warm and certain.', shortHow('Brisk (about 1.2 s) and warm, out by 4.4. Then more.'));
  check('videos: QSME is shown as QSME', sayText('Sign up at Q-S-me dot co dot en zed.') === 'Sign up at QSME dot co dot en zed.');
  const md = '# T\n\n## Captions, hashtags and CTA\n\nIntro.\n\n### Instagram\n\n> **Big** news `here` [site](https://qsme.co.nz)\n>\n> #Tag #Two\n\n## Music\n\nNo music.\n';
  const cap = captionMarkdown(md);
  check('videos: caption section keeps its subsections, stops at the next ##', cap.includes('### Instagram') && cap.includes('#Tag #Two') && !cap.includes('Music'), cap);
  const plain = plainFromMarkdown(cap);
  check('videos: caption copy is plain text', plain === 'Intro.\n\nInstagram\n\nBig news here site (https://qsme.co.nz)\n\n#Tag #Two', JSON.stringify(plain));
  const vo = voScript({ video: 'outputs/a-9x16.mp4', lines: [{ id: 'vo00', start_s: 1.5, max_s: 2, text_v2: 'Hi Q-S-me.' }, { id: 'x', text_v2: '' }, null, { start_s: 'abc', text: 'Fallback text' }] });
  check('videos: voice script lines parsed (empty and broken lines skipped, defaults applied)', vo?.video === 'a-9x16.mp4' && vo.lines.length === 2 && vo.lines[0].end === 3.5 && vo.lines[0].say === 'Hi QSME.' && vo.lines[1].start === 0 && vo.lines[1].id === 'line-04', JSON.stringify(vo));
  check('videos: one voice: no speakers, Copy all is the bare lines', vo.speakers.length === 0 && scriptText(vo) === 'Hi QSME.\nFallback text\n', JSON.stringify(scriptText(vo)));

  // Two-voice scripts: the speaker tag at the start of the direction is not the "how".
  const mel = voScript({ lines: [{ speaker: 'Mel', delivery: 'MEL. Bone-dry. Out by 2.1.', text_v2: 'Trick question.' }] });
  check('videos: the speaker tag is stripped from "how", speaker kept', mel?.lines[0].how === 'Bone-dry.' && mel.lines[0].speaker === 'Mel' && mel.lines[0].delivery === 'MEL. Bone-dry. Out by 2.1.', JSON.stringify(mel));
  const duo = voScript({
    lines: [
      { speaker: 'Him', delivery: "HIM. A genuine, slightly tired question. Light lean on 'cheapest'.", text_v2: "So which one's cheapest?" },
      { speaker: 'Mel', delivery: 'MEL: Bone-dry, almost under her breath, a small beat before it. Out by 2.8.', text_v2: 'Trick question.' },
      { speaker: 'Mel', delivery: 'Melodic and warm. Lands soft.', text_v2: 'Sign up at Q-S-me.' },
      { speaker: 'Him', text_v2: 'Right.' },
    ],
  });
  check('videos: two voices: each "how" is the real direction', duo?.lines.map((l) => l.how).join('|') === 'A genuine, slightly tired question.|Bone-dry, almost under her breath, a small beat before it.|Melodic and warm.|', JSON.stringify(duo?.lines.map((l) => l.how)));
  check('videos: two voices: Copy all / .txt say who reads each line', JSON.stringify(duo.speakers) === '["Him","Mel"]' && scriptText(duo) === "Him: So which one's cheapest?\nMel: Trick question.\nMel: Sign up at QSME.\nHim: Right.\n", JSON.stringify(scriptText(duo)));

  // Per-platform caption copies.
  const capMd = captionMarkdown(
    '# Post\n\n## Captions\n\n**Link (all platforms):** `https://x.test`\n\n### Instagram Reels (Tue 20 Oct, 19:30 NZDT) — 9:16\n\n> 3 quotes. **Same** bathroom.\n>\n> Sign up at qsme.co.nz.\n\n**Hashtags (2):** #Reno #NZ · **Cover:** `outputs/c.png`\n\n### TikTok\n\n> Short one. #reno #nz\n\n**Hashtags:** #reno #nz\n\n### LinkedIn: founder\'s profile (Thu 8 Oct)\n\n> Founder post.\n\n**First comment:** link\n\n- **Hashtags (max 3):** #QS #Tendering\n\n### YouTube Shorts\n\n- **Title:** T\n- **Description:** D\n\n## Music\n\nNone.\n',
  );
  const parts = captionParts(capMd);
  check('captions: one part per platform subsection', parts.map((p) => p.label).join('|') === "Instagram Reels|TikTok|LinkedIn: founder's profile|YouTube Shorts", JSON.stringify(parts.map((p) => p.label)));
  check('captions: a quoted post copies the post text and its hashtags, not the notes', parts[0].text === '3 quotes. Same bathroom.\n\nSign up at qsme.co.nz.\n\n#Reno #NZ' && parts[0].quoted, JSON.stringify(parts[0]));
  check('captions: hashtags already in the post are not added twice', parts[1].text === 'Short one. #reno #nz', JSON.stringify(parts[1].text));
  check('captions: a listed hashtags line counts, a first comment does not', parts[2].text === 'Founder post.\n\n#QS #Tendering', JSON.stringify(parts[2].text));
  check('captions: a part without a quote copies the whole part', parts[3].text === '- Title: T\n- Description: D' && !parts[3].quoted, JSON.stringify(parts[3]));
  check('captions: no subsections, no parts', captionParts('Just text. #Tag').length === 0 && captionParts('').length === 0);
}

/**
 * .railwayignore keeps every media file out of `railway up`, and lets the code
 * and markdown through. Checked with git check-ignore (same gitignore syntax) in
 * a throwaway repo. Placeholders are made first and the ignore file is copied in
 * last (and compared at the end), so no placeholder can overwrite it.
 */
function railwayIgnoreCheck() {
  if (spawnSync('git', ['--version']).status !== 0) return check('.railwayignore check (git not installed, skipped)', true);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-railwayignore-'));
  try {
    spawnSync('git', ['init', '-q', dir]);
    const kept = ['package.json', 'package-lock.json', 'railway.json', 'learnings.md', 'studio/server.mjs', 'studio/lib/s3.mjs', 'studio/public/videos.js', 'studio/public/favicon.svg', 'studio/synced.txt', 'ideas/qsme-nz/x.md', 'ventures/qsme-nz.md', 'projects/p/post.md', 'projects/p/vo-script.json', 'research/r.md', 'log/2026-10-04.md', '.claude/skills/ugc/SKILL.md'];
    const media = [
      'projects/p/outputs/a.mp4', 'projects/p/outputs/a.preview.mp4', 'projects/p/outputs/cover.png', 'projects/p/outputs/vo/line.m4a', 'projects/p/outputs/notes.txt',
      'projects/p/CLIP.MP4', 'projects/p/raw.MoV', 'projects/p/x.webm', 'projects/p/x.m4v', 'projects/p/still.JPG', 'projects/p/still.jpeg', 'projects/p/x.webp', 'projects/p/x.gif', 'projects/p/x.mp3', 'projects/p/x.wav', 'projects/p/x.aac',
      'ideas/qsme-nz/pic.png', 'studio/public/demo.mp4', 'research/shot.png', 'projects/p/motion/clips/f.jpg',
    ];
    const secret = ['.env', '.env.local', 'studio/.env', 'key.pem', 'projects/p/credentials.json', '.claude/settings.local.json', 'node_modules/x/index.js', 'videos.html', 'tools/motion/sync-media.mjs', 'assets/qsme/x.png'];
    const all = [...kept, ...media, ...secret];
    if (all.includes('.gitignore')) throw new Error('a placeholder would overwrite .gitignore');
    for (const f of all) {
      fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
      fs.writeFileSync(path.join(dir, f), 'x\n');
    }
    const rules = fs.readFileSync(path.join(ROOT, '.railwayignore'));
    fs.writeFileSync(path.join(dir, '.gitignore'), rules);
    const ignored = (f) => spawnSync('git', ['check-ignore', '-q', '--no-index', f], { cwd: dir }).status === 0;
    const up = [...media, ...secret].filter((f) => !ignored(f));
    check('.railwayignore: every media file (any case, any folder) and secret stays out of `railway up`', up.length === 0, up.join(', '));
    const out = kept.filter(ignored);
    check('.railwayignore: code, markdown, vo-script.json and synced.txt still go up', out.length === 0, out.join(', '));
    check('.railwayignore: the throwaway repo kept its copy intact', fs.readFileSync(path.join(dir, '.gitignore')).equals(rules));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}


function stop(server) {
  if (!server) return;
  server.child.kill('SIGTERM');
  children.delete(server.child);
}

const TRAVERSAL = [
  '/media/../../.env',
  '/media/..%2f..%2f.env',
  '/research/..%2f.env',
  '/playbook/..%2f..%2fsettings.local.json',
  '/projects/..%2f.env',
  '/media/%2e%2e/%2e%2e/.env',
  '/%2e%2e/.env',
  '/ideas/..%2f..%2f.env',
  '/assets/..%2fserver.mjs',
  '/assets/server.mjs',
  '/research/..%5c.env',
  '/research/%00.env',
  '/playbook/..%252f..%252fsettings.local.json',
  '/.env',
  '/.env.example',
  '/package.json',
  '/studio/server.mjs',
  '/.claude/settings.local.json',
  '/api/ideas/..%2f..%2f/.env',
];

async function traversalChecks(port, label, extra = []) {
  for (const p of [...TRAVERSAL, ...extra]) {
    for (const headers of [AUTH, {}]) {
      let r;
      try {
        r = await request(port, p, { headers });
      } catch (e) {
        check(`${label} traversal ${p} handled`, false, e.message);
        continue;
      }
      check(
        `${label} ${headers.Authorization ? 'auth' : 'anon'} ${p} -> ${r.status}, no secrets`,
        r.status !== 200 && !r.body.includes('API_KEY'),
        `status ${r.status}`,
      );
    }
  }
}

function noJunk(html) {
  return !/\bundefined\b|\[object Object\]|\bNaN\b/.test(html);
}

// ----------------------------------------------------------------- phase 1

async function phaseMain() {
  console.log('\n1. Real content, password set');
  const s = await startServer('main', { STUDIO_PASSWORD: PASSWORD, STUDIO_API_TOKEN: TOKEN });
  try {
    const { port } = s;
    let r = await request(port, '/healthz');
    check('/healthz 200 without auth', r.status === 200 && r.body.trim() === 'ok', `${r.status} ${r.body}`);

    r = await request(port, '/');
    check('/ 401 without auth', r.status === 401, String(r.status));
    check('/ 401 has WWW-Authenticate: Basic', /^Basic /.test(r.headers['www-authenticate'] || ''), r.headers['www-authenticate']);

    r = await request(port, '/', { headers: { Authorization: WRONG } });
    check('/ 401 with wrong password', r.status === 401, String(r.status));

    r = await request(port, '/', { headers: AUTH });
    check('/ 200 with auth', r.status === 200, String(r.status));
    check('/ has noindex meta', r.body.includes('<meta name="robots" content="noindex'), '');
    check('/ footer shows when content changed', /Content (updated|synced) <time/.test(r.body), '');
    check('/ shows the hook of an idea', r.body.includes('class="row-hook"'), '');
    check('/ sets nosniff', r.headers['x-content-type-options'] === 'nosniff');
    check('/ sets Referrer-Policy no-referrer', r.headers['referrer-policy'] === 'no-referrer');
    check('/ sets X-Frame-Options DENY', r.headers['x-frame-options'] === 'DENY');
    check('/ sets a CSP with self + Google Fonts', /default-src 'none'/.test(r.headers['content-security-policy'] || '') && /fonts\.googleapis\.com/.test(r.headers['content-security-policy'] || ''));

    r = await request(port, '/robots.txt');
    check('/robots.txt disallows everything', r.status === 200 && /Disallow: \//.test(r.body), String(r.status));

    r = await request(port, '/ideas', { headers: AUTH });
    check('/ideas 200 and contains "The Facebook group"', r.status === 200 && r.body.includes('The Facebook group'), String(r.status));
    check('/ideas board cards show hooks', (r.body.match(/class="card-hook"/g) || []).length >= 8, String((r.body.match(/class="card-hook"/g) || []).length));
    check('/ideas hooks use typographer\'s quotes', r.body.includes('It actually read my schedule of quantities') && !/card-hook">“[^”]*&#39;/.test(r.body));
    check('/ideas page has no live danger', !liveDanger(r.body), liveDanger(r.body));

    r = await request(port, '/api/ideas', { headers: AUTH });
    let ideas = [];
    try {
      ideas = JSON.parse(r.body);
    } catch {}
    check('/api/ideas returns a JSON array', r.status === 200 && Array.isArray(ideas), String(r.status));
    check('/api/ideas has >= 10 ideas', ideas.length >= 10, String(ideas.length));
    check('/api/ideas includes qsme-nz-facebook-group', ideas.some((i) => i.id === 'qsme-nz-facebook-group'));
    check('/api/ideas items carry slug, venture, body', ideas.every((i) => i.slug && i.venture && typeof i.body === 'string'));
    check('/api/ideas items carry a hook', ideas.filter((i) => i.hook).length >= 8, String(ideas.filter((i) => i.hook).length));
    check('/api/ideas is Cache-Control no-store', r.headers['cache-control'] === 'no-store', r.headers['cache-control']);

    for (const i of ideas) {
      const url = `/ideas/${encodeURIComponent(i.venture)}/${encodeURIComponent(i.slug)}`;
      const d = await request(port, url, { headers: AUTH });
      check(`${url} 200`, d.status === 200 && noJunk(d.body), String(d.status));
      const a = await request(port, `/api${url}`, { headers: AUTH });
      check(`/api${url} 200`, a.status === 200 && JSON.parse(a.body).slug === i.slug, String(a.status));
    }

    r = await request(port, '/ventures/qsme-nz', { headers: AUTH });
    check('/ventures/qsme-nz 200', r.status === 200 && noJunk(r.body), String(r.status));

    const pages = ['/', '/ideas', '/ideas?view=list', '/ideas?view=list&sort=title&dir=desc', '/ideas?venture=qsme-nz&sort=created', '/ventures', '/projects', '/videos', '/videos?venture=qsme-nz', '/videos?venture=%3Cscript%3E', '/research', '/log', '/learnings', '/playbook'];
    const research = await request(port, '/research', { headers: AUTH });
    for (const m of research.body.matchAll(/href="(\/research\/[^"#?]+)"/g)) pages.push(m[1]);
    const playbook = await request(port, '/playbook', { headers: AUTH });
    for (const m of playbook.body.matchAll(/href="(\/playbook\/[^"#?]+)"/g)) pages.push(m[1]);
    const ventures = await request(port, '/ventures', { headers: AUTH });
    for (const m of ventures.body.matchAll(/href="(\/ventures\/[^"#?]+)"/g)) pages.push(m[1]);
    for (const p of [...new Set(pages)]) {
      const d = await request(port, p, { headers: AUTH });
      check(`${p} 200, no undefined/[object Object], nothing live`, d.status === 200 && noJunk(d.body) && !liveDanger(d.body), `${d.status} ${liveDanger(d.body) || ''}`);
    }
    for (const p of ['/api/ventures', '/api/projects', '/search.json']) {
      const d = await request(port, p, { headers: AUTH });
      let ok = false;
      try {
        ok = Array.isArray(JSON.parse(d.body));
      } catch {}
      check(`${p} 200 JSON array`, d.status === 200 && ok, String(d.status));
    }
    r = await request(port, '/nope', { headers: AUTH });
    check('/nope 404', r.status === 404, String(r.status));
    for (const p of ['/ideas?sort=constructor&view=list', '/ideas?sort=__proto__&dir=sideways', '/ideas?venture=%3Cscript%3E']) {
      const d = await request(port, p, { headers: AUTH });
      check(`${p} 200 (odd query handled)`, d.status === 200 && noJunk(d.body) && !d.body.includes('<script>'), String(d.status));
    }
    r = await request(port, '/assets/constructor', { headers: AUTH });
    check('/assets/constructor 404', r.status === 404, String(r.status));
    r = await request(port, '/ideas/qsme-nz/nope', { headers: AUTH });
    check('/ideas/qsme-nz/nope 404', r.status === 404, String(r.status));
    r = await request(port, '/', { headers: AUTH, method: 'POST' });
    check('POST / 405', r.status === 405, String(r.status));
    r = await request(port, '/', { headers: AUTH, method: 'HEAD' });
    check('HEAD / 200', r.status === 200 && r.body === '', String(r.status));

    // Bearer token: API only.
    r = await request(port, '/api/ideas', { headers: { Authorization: `Bearer ${TOKEN}` } });
    check('Bearer token works on /api/ideas', r.status === 200, String(r.status));
    r = await request(port, '/api/ideas', { headers: { Authorization: 'Bearer wrong-token' } });
    check('wrong Bearer token rejected on /api/ideas', r.status === 401, String(r.status));
    r = await request(port, '/', { headers: { Authorization: `Bearer ${TOKEN}` } });
    check('Bearer token rejected on / (HTML)', r.status === 401, String(r.status));
    r = await request(port, '/ideas', { headers: { Authorization: `Bearer ${TOKEN}` } });
    check('Bearer token rejected on /ideas (HTML)', r.status === 401, String(r.status));
    r = await request(port, '/search.json', { headers: { Authorization: `Bearer ${TOKEN}` } });
    check('Bearer token rejected on /search.json', r.status === 401, String(r.status));

    // No BUCKET_*: media comes from outputs/ only, the media API lists nothing, and nothing writes.
    const someProject = JSON.parse((await request(port, '/api/projects', { headers: AUTH })).body)[0]?.folder;
    if (someProject) {
      const bearer = { Authorization: `Bearer ${TOKEN}` };
      r = await request(port, `/api/media/${someProject}`, { headers: bearer });
      check('no bucket: GET /api/media/<project> -> [] (X-Media-Storage: none)', r.status === 200 && JSON.parse(r.body).length === 0 && r.headers['x-media-storage'] === 'none', `${r.status} ${r.body}`);
      for (const method of ['PUT', 'DELETE', 'POST']) {
        r = await rawRequest(port, `/api/media/${someProject}/check.png`, { method, headers: bearer, body: method === 'DELETE' ? Buffer.alloc(0) : PNG });
        check(`${method} /api/media/<project>/<file> -> 405 (the upload API is gone)`, r.status === 405, `${r.status} ${r.body}`);
      }
    } else check('media API checks (no project in the real content, skipped)', true);
    r = await request(port, '/videos', { headers: AUTH });
    check('/videos 200 with a card per project with videos', r.status === 200 && (r.body.match(/<section class="vcard/g) || []).length >= 1 && r.body.includes('<script src="/assets/videos.js?v='), String(r.status));
    check('nav links Videos', /<a href="\/videos" aria-current="page">Videos<\/a>/.test(r.body));
    r = await request(port, '/videos', { headers: { Authorization: `Bearer ${TOKEN}` } });
    check('Bearer token rejected on /videos (HTML)', r.status === 401, String(r.status));
    r = await request(port, '/assets/videos.js', { headers: AUTH });
    check('/assets/videos.js served as JavaScript', r.status === 200 && /javascript/.test(r.headers['content-type'] || ''), `${r.status} ${r.headers['content-type']}`);

    // Compression: big pages and JSON are gzipped, but never for a request
    // another site could have triggered (BREACH: a compressed page that reflects
    // a query value leaks private content through its size).
    const GZ = { 'Accept-Encoding': 'gzip, deflate, br' };
    const vids = await request(port, '/videos', { headers: AUTH });
    const vcards = (b) => (b.match(/<section class="vcard/g) || []).length;
    const gunzip = (raw) => {
      try {
        return zlib.gunzipSync(raw).toString('utf8');
      } catch {
        return null;
      }
    };
    let gz = await request(port, '/videos', { headers: { ...AUTH, ...GZ, 'Sec-Fetch-Site': 'same-origin' } });
    let unz = gunzip(gz.raw);
    check(
      'gzip: /videos is gzipped for a same-origin request and unzips to the page',
      gz.status === 200 && gz.headers['content-encoding'] === 'gzip' && Number(gz.headers['content-length']) === gz.raw.length && gz.raw.length * 3 < vids.raw.length && unz !== null && vcards(unz) === vcards(vids.body) && vcards(unz) > 0 && Math.abs(unz.length - vids.body.length) < 200,
      `${gz.status} ${gz.headers['content-encoding']} ${gz.raw.length} bytes vs ${vids.raw.length}`,
    );
    check('gzip: the answer varies by Accept-Encoding and Sec-Fetch-Site', /Accept-Encoding/.test(gz.headers.vary || '') && /Sec-Fetch-Site/.test(gz.headers.vary || '') && /Accept-Encoding/.test(vids.headers.vary || ''), `${gz.headers.vary} / ${vids.headers.vary}`);
    gz = await request(port, '/videos', { headers: { ...AUTH, ...GZ, 'Sec-Fetch-Site': 'none' } });
    check('gzip: a typed or bookmarked navigation (Sec-Fetch-Site: none) is gzipped', gz.headers['content-encoding'] === 'gzip', gz.headers['content-encoding']);
    for (const [label, extra] of [['cross-site', { 'Sec-Fetch-Site': 'cross-site' }], ['same-site', { 'Sec-Fetch-Site': 'same-site' }], ['no Sec-Fetch-Site', {}]]) {
      for (const p of ['/videos', '/videos?venture=qsme-nz', '/api/projects']) {
        gz = await request(port, p, { headers: { ...AUTH, ...GZ, ...extra } });
        check(`gzip: never for ${label} (password) requests: ${p} (BREACH)`, gz.status === 200 && !gz.headers['content-encoding'] && gz.body.length > 8192, `${gz.status} ${gz.headers['content-encoding']}`);
      }
    }
    gz = await request(port, '/videos', { headers: { ...AUTH, 'Accept-Encoding': 'br, gzip;q=0', 'Sec-Fetch-Site': 'same-origin' } });
    check('gzip: not when the client says gzip;q=0', !gz.headers['content-encoding'], gz.headers['content-encoding']);
    gz = await request(port, '/api/ideas', { headers: { Authorization: `Bearer ${TOKEN}`, ...GZ } });
    unz = gunzip(gz.raw);
    let gzIdeas = null;
    try {
      gzIdeas = JSON.parse(unz);
    } catch {}
    check('gzip: a Bearer API client gets JSON gzipped', gz.status === 200 && gz.headers['content-encoding'] === 'gzip' && Array.isArray(gzIdeas) && gzIdeas.length >= 10, `${gz.status} ${gz.headers['content-encoding']}`);
    gz = await request(port, '/videos', { method: 'HEAD', headers: { ...AUTH, ...GZ, 'Sec-Fetch-Site': 'same-origin' } });
    check('gzip: HEAD gives the gzipped length, no body', gz.status === 200 && gz.headers['content-encoding'] === 'gzip' && Number(gz.headers['content-length']) > 0 && Number(gz.headers['content-length']) * 3 < vids.raw.length && gz.raw.length === 0, `${gz.headers['content-length']}`);
    gz = await request(port, '/robots.txt', { headers: { ...GZ, 'Sec-Fetch-Site': 'same-origin' } });
    check('gzip: small and plain-text answers are sent as they are', !gz.headers['content-encoding'] && gz.body.includes('Disallow'), gz.headers['content-encoding']);
    gz = await request(port, '/videos', { headers: { Authorization: WRONG, ...GZ, 'Sec-Fetch-Site': 'same-origin' } });
    check('gzip: a 401 is never compressed', gz.status === 401 && !gz.headers['content-encoding'], `${gz.status} ${gz.headers['content-encoding']}`);

    await traversalChecks(port, 'main');

    const log = s.log();
    check('server log has no errors', !/failed:|Error/.test(log), log.split('\n').find((l) => /failed:|Error/.test(l)));
  } finally {
    stop(s);
  }
}

// ----------------------------------------------------------------- phase 2

async function phaseLocked() {
  console.log('\n2. No STUDIO_PASSWORD (fail closed)');
  const s = await startServer('locked', {}, { up: [503] });
  try {
    let r = await request(s.port, '/');
    check('/ 503 without STUDIO_PASSWORD', r.status === 503 && r.body.includes('STUDIO_PASSWORD not set'), `${r.status} ${r.body}`);
    r = await request(s.port, '/api/ideas');
    check('/api/ideas 503 without STUDIO_PASSWORD', r.status === 503, String(r.status));
    r = await request(s.port, '/ideas', { headers: AUTH });
    check('/ideas 503 even with credentials', r.status === 503, String(r.status));
    r = await request(s.port, '/healthz');
    check('/healthz 503 without STUDIO_PASSWORD (Railway keeps the previous deploy)', r.status === 503, String(r.status));
  } finally {
    stop(s);
  }
}

// ----------------------------------------------------------------- phase 3

function lanAddress() {
  for (const list of Object.values(os.networkInterfaces())) {
    for (const a of list || []) if (a.family === 'IPv4' && !a.internal) return a.address;
  }
  return null;
}

function canConnect(host, port) {
  return new Promise((resolve) => {
    const sock = net.connect({ host, port });
    const done = (ok) => {
      sock.destroy();
      resolve(ok);
    };
    sock.setTimeout(3000, () => done(false));
    sock.on('connect', () => done(true));
    sock.on('error', () => done(false));
  });
}

async function phaseStartup() {
  console.log('\n3. Startup rules (dev mode, Railway, secret length)');
  // Dev mode with no HOST set: only this machine can reach it.
  const dev = await startServer('dev', { STUDIO_DEV: '1' }, { host: null });
  try {
    for (let k = 0; k < 20 && !dev.log().includes('UGC Studio on'); k++) await sleep(100);
    check('dev mode (no HOST) listens on 127.0.0.1', dev.log().includes(`http://127.0.0.1:${dev.port} (DEV MODE`), dev.log().split('\n')[0]);
    const r = await request(dev.port, '/ideas');
    check('dev mode serves pages without a password locally', r.status === 200, String(r.status));
    const lan = lanAddress();
    if (lan) check(`dev mode is not reachable on the LAN address ${lan}`, !(await canConnect(lan, dev.port)));
    else check('dev mode LAN check (no LAN interface on this machine, skipped)', true);
  } finally {
    stop(dev);
  }

  let x = await runToExit({ STUDIO_DEV: '1' }, { host: '0.0.0.0' });
  check('dev mode without a password refuses HOST=0.0.0.0', x.code === 1 && /only listens on 127\.0\.0\.1/.test(x.log), `${x.code} ${x.log.trim()}`);

  // STUDIO_DEV=1 set on a Railway deploy: still locked.
  const rail = await startServer('dev-on-railway', { STUDIO_DEV: '1', RAILWAY_ENVIRONMENT_ID: 'check' }, { up: [503] });
  try {
    let r = await request(rail.port, '/ideas');
    check('STUDIO_DEV=1 on Railway does not open the studio (503)', r.status === 503, String(r.status));
    r = await request(rail.port, '/healthz');
    check('STUDIO_DEV=1 on Railway: /healthz 503', r.status === 503, String(r.status));
    check('STUDIO_DEV=1 on Railway logs a warning', /STUDIO_DEV=1 ignored/.test(rail.log()), rail.log());
  } finally {
    stop(rail);
  }

  x = await runToExit({ STUDIO_PASSWORD: 'test' });
  check('a short STUDIO_PASSWORD is refused at startup', x.code === 1 && /at least 16 characters/.test(x.log), `${x.code} ${x.log.trim()}`);
  x = await runToExit({ STUDIO_PASSWORD: PASSWORD, STUDIO_API_TOKEN: 'short' });
  check('a short STUDIO_API_TOKEN is refused at startup', x.code === 1 && /STUDIO_API_TOKEN must be at least 16/.test(x.log), `${x.code} ${x.log.trim()}`);
}

// ----------------------------------------------------------------- phase 4

async function phaseThrottle() {
  console.log('\n4. Login throttle (forwarded headers)');
  const bad = (extra) => ({ Authorization: WRONG, ...extra });

  // Off Railway the socket address is the client: rotating headers changes nothing.
  // Public videos: /videos, /media and /assets open without a login; everything else still locked.
  {
    const pub = await startServer('public-videos', { STUDIO_PASSWORD: PASSWORD, STUDIO_PUBLIC_VIDEOS: '1' });
    let r = await request(pub.port, '/videos');
    check('public mode: /videos 200 without auth', r.status === 200 && r.body.includes('<section class="vcard'), String(r.status));
    r = await request(pub.port, '/assets/videos.js');
    check('public mode: assets served without auth', r.status === 200, String(r.status));
    for (const p of ['/', '/ideas', '/research', '/api/ideas', '/ventures']) {
      r = await request(pub.port, p);
      check(`public mode: ${p} still needs a login`, r.status === 401, String(r.status));
    }
    r = await request(pub.port, '/media/..%2f.env');
    check('public mode: traversal on /media still refused', r.status === 400 || r.status === 404, String(r.status));
    await stop(pub);
  }
  let s = await startServer('throttle', { STUDIO_PASSWORD: PASSWORD });
  try {
    const statuses = [];
    for (let k = 0; k < 31; k++) {
      const r = await request(s.port, '/', { headers: bad({ 'X-Forwarded-For': `10.0.${k}.1`, 'X-Real-IP': `10.1.${k}.1` }) });
      statuses.push(r.status);
    }
    check('rotating X-Forwarded-For / X-Real-IP does not bypass the throttle', statuses.slice(0, 30).every((c) => c === 401) && statuses[30] === 429, statuses.join(','));
  } finally {
    stop(s);
  }

  // On Railway the edge's X-Real-IP is the client; X-Forwarded-For is still ignored.
  s = await startServer('throttle-railway', { STUDIO_PASSWORD: PASSWORD, RAILWAY_ENVIRONMENT_ID: 'check' });
  try {
    const statuses = [];
    for (let k = 0; k < 31; k++) {
      const r = await request(s.port, '/', { headers: bad({ 'X-Real-IP': '203.0.113.7', 'X-Forwarded-For': `198.51.100.${k}` }) });
      statuses.push(r.status);
    }
    check('Railway: rotating X-Forwarded-For does not bypass the throttle', statuses[30] === 429, statuses.join(','));
    let r = await request(s.port, '/', { headers: { ...AUTH, 'X-Real-IP': '192.0.2.10', 'X-Forwarded-For': '203.0.113.7' } });
    check('Railway: an attacker cannot lock the owner out by spoofing X-Forwarded-For', r.status === 200, String(r.status));
    r = await request(s.port, '/', { headers: { ...AUTH, 'X-Real-IP': '203.0.113.7' } });
    check('Railway: the locked-out IP stays locked even with the right password', r.status === 429, String(r.status));
  } finally {
    stop(s);
  }
}

// ----------------------------------------------------------------- phase 5

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
const FIXTURE_PROJECT = '2026-10-01-qsme-nz-check-fixture';
const SYM_PROJECT = '2026-10-02-qsme-nz-sym';
const BAD_VENTURE_PROJECT = '2026-10-02-qsme-nz-bad-venture';
const TWO_PROJECT = '2026-10-03-qsme-build-fixture-two';
const HOSTILE_LINE = `<img src=x onerror=alert(1)> "quoted" & it's`;
const FIXTURE_VO = {
  video: 'outputs/fixture-9x16.mp4',
  character: 'Mel: everyday Kiwi woman, dry.',
  lines: [
    { id: 'vo00-hook', start_s: 0, max_s: 2.9, on_screen: 'Hook: 212 comments.', text_v2: 'Asked Q-S-me for a builder.', delivery: 'Dry, tired Kiwi deadpan. Falls at the end. Out by 2.9.' },
    { id: 'vo01-xss', start_s: 3.2, max_s: 1.5, text_v2: HOSTILE_LINE, delivery: 'Brisk (about 1.2 s) and warm.' },
    { id: 'vo02-empty', start_s: 5, max_s: 1, text_v2: '' },
  ],
};

function buildFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-studio-check-'));
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-studio-outside-'));
  for (const p of ['ideas', 'ventures', 'research', 'log', 'learnings.md', '.claude/skills']) {
    const src = path.join(ROOT, p);
    if (fs.existsSync(src)) fs.cpSync(src, path.join(dir, p), { recursive: true });
  }
  const w = (rel, data) => {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), data);
  };
  // Decoy secrets that must never be served.
  w('.env', 'FAKE_API_KEY=never-serve-this\n');
  w('.env.example', 'FAKE_API_KEY=\n');
  w('.claude/settings.local.json', '{"FAKE_API_KEY": "never"}\n');
  w('package.json', '{"name":"decoy","FAKE_API_KEY":"never"}\n');
  w(`projects/${FIXTURE_PROJECT}/outputs/secret.txt`, 'FAKE_API_KEY=never\n');
  w(`projects/${FIXTURE_PROJECT}/outputs/.hidden.png`, PNG);
  // A project with every tab type and some media.
  w(
    `projects/${FIXTURE_PROJECT}/post.md`,
    '---\ntitle: Fixture post\nventure: qsme-nz\nidea: qsme-nz-facebook-group\nstatus: in production\npublish_date: 2026-10-05\nfigma: https://www.figma.com/file/abc/fixture\n---\n# Post\n\nCaption goes here.\n\n## Captions, hashtags and CTA\n\n**Instagram**\n> Sign up at qsme.co.nz. <b>bold</b> #FixtureTag\n\n## Music\n\nNo music in this one.\n',
  );
  w(`projects/${FIXTURE_PROJECT}/vo-script.json`, JSON.stringify(FIXTURE_VO));
  w(`projects/${FIXTURE_PROJECT}/outputs/fixture-9x16.mp4`, crypto.randomBytes(1200));
  w(`projects/${FIXTURE_PROJECT}/outputs/fixture-9x16.preview.mp4`, crypto.randomBytes(300));
  w(`projects/${FIXTURE_PROJECT}/outputs/fixture-4x5.mp4`, crypto.randomBytes(800));
  w(`projects/${FIXTURE_PROJECT}/outputs/fixture-9x16-frames.png`, PNG);
  // A second venture's project: one landscape video, no voice script, broken JSON.
  w(`projects/${TWO_PROJECT}/post.md`, '---\ntitle: Fixture two\nventure: qsme-build\n---\n# Two\n');
  w(`projects/${TWO_PROJECT}/vo-script.json`, '{ not json');
  w(`projects/${TWO_PROJECT}/outputs/two-16x9.mp4`, crypto.randomBytes(500));
  w(`projects/${FIXTURE_PROJECT}/brief.md`, '# Brief\n\n- Venture: qsme-nz\n');
  w(`projects/${FIXTURE_PROJECT}/script.md`, '# Script\n\n| Time | Beat |\n|---|---|\n| 0:00 | hook |\n');
  w(`projects/${FIXTURE_PROJECT}/zz-notes.md`, '# Notes\n\nSee ![frame](outputs/frame.png).\n');
  w(`projects/${FIXTURE_PROJECT}/outputs/frame.png`, PNG);
  w(`projects/${FIXTURE_PROJECT}/outputs/cuts/clip.mp4`, crypto.randomBytes(1000));
  w(`projects/${FIXTURE_PROJECT}/outputs/vo.mp3`, crypto.randomBytes(200));
  // New venture folder, malformed YAML, unknown status, hostile content.
  w('ideas/new-venture/broken.md', '---\ntitle: "Broken card\nstatus: on hold\nscore: [12\n---\n# Broken card\n\nStill readable.\n');
  w(
    'ideas/new-venture/hostile.md',
    '---\ntitle: "<script>alert(1)</script> Hostile"\nstatus: raw\nscore: 9\nfigma: "javascript:alert(1)"\nextra: {nested: {deep: true}}\n---\n# Hostile\n\n<img src=x onerror="alert(1)"> <a href="javascript:alert(2)">x</a> [y](javascript:alert(3))\n\n<script>alert(4)</script><iframe src="https://example.com"></iframe>\n',
  );
  w('ideas/new-venture/no-frontmatter.md', '# Just a heading\n\nNo frontmatter at all.\n');
  w('ideas/new-venture/proto.md', '---\ntitle: Proto keys\nstatus: constructor\nscore_breakdown: constructor5 toString3\n---\nBody.\n');
  // One card with a self-referencing YAML alias must not take the studio down.
  w('ideas/new-venture/circ.md', '---\ntitle: Circular\nstatus: &a [*a]\n---\n# Circular\n\nStill here.\n');
  // Sanitizer bypass attempts, in a card and in a research note.
  w('ideas/new-venture/xss.md', `---\ntitle: XSS bypasses\nstatus: raw\n---\n# XSS bypasses\n\n${XSS_PAYLOADS.join('\n\n')}\n`);
  w('research/2026-10-02-pasted.md', `# Pasted competitor copy\n\n${XSS_PAYLOADS.join('\n\n')}\n`);
  // Ordinary but non-slug file names, and a card in a subfolder.
  w('ideas/new-venture/café.md', '---\ntitle: Café card\nstatus: raw\n---\nAccents in the name.\n');
  w("ideas/new-venture/what's-a-qs.md", "---\ntitle: What's a QS\nstatus: raw\n---\nAn apostrophe in the name.\n");
  w('ideas/new-venture/sub/nested.md', '---\ntitle: Nested card\n---\nIn a subfolder.\n');
  w('research/2026-10-02-café.md', '# Café research\n\nAccents.\n');
  // A note that links a file which doesn't exist yet (stale-cache check).
  w('research/2026-10-02-links.md', '# Links\n\nSee research/2026-10-03-later.md for more.\n');
  // outputs/ symlinked to a folder outside the content root.
  w(`projects/${SYM_PROJECT}/brief.md`, '# Sym\n');
  fs.writeFileSync(path.join(outside, 'secret.png'), PNG);
  fs.symlinkSync(outside, path.join(dir, 'projects', SYM_PROJECT, 'outputs'));
  // A project whose venture frontmatter is not a folder name.
  w(`projects/${BAD_VENTURE_PROJECT}/post.md`, '---\ntitle: Bad venture\nventure: ../evil\n---\n# Post\n');
  return { dir, outside };
}

async function phaseFixture() {
  console.log('\n5. Fixture content (media, malformed and hostile cards, odd names, symlinks, decoy secrets)');
  const { dir, outside } = buildFixture();
  let s;
  try {
    s = await startServer('fixture', { STUDIO_PASSWORD: PASSWORD, STUDIO_CONTENT_ROOT: dir });
    const { port } = s;
    const get = (p, headers = {}) => request(port, p, { headers: { ...AUTH, ...headers } });

    let r = await get('/ideas');
    check('fixture /ideas 200', r.status === 200 && noJunk(r.body), String(r.status));
    check('unknown status gets its own column', r.body.includes('id="col-on-hold"'));
    check('new venture folder appears as a filter', r.body.includes('venture=new-venture'));
    check('script in a title is escaped', !r.body.includes('<script>alert(1)') && r.body.includes('&lt;script&gt;alert(1)'));

    check('status "constructor" handled as its own column', r.body.includes('id="col-constructor"'));
    r = await get('/');
    check('fixture home 200 with odd statuses', r.status === 200 && noJunk(r.body) && !r.body.includes('function'), String(r.status));
    r = await get('/ideas/new-venture/proto');
    check('prototype-named fields render cleanly', r.status === 200 && noJunk(r.body) && !r.body.includes('[native code]'), String(r.status));

    r = await get('/ideas/new-venture/broken');
    check('malformed YAML card renders with a warning', r.status === 200 && r.body.includes('could not be parsed') && r.body.includes('Still readable'), String(r.status));
    r = await get('/ideas/new-venture/no-frontmatter');
    check('card without frontmatter renders', r.status === 200 && r.body.includes('Just a heading'), String(r.status));

    r = await get('/ideas/new-venture/hostile');
    const body = r.body;
    check('hostile card renders', r.status === 200, String(r.status));
    check('hostile: no <script> from content', !/<script>alert/.test(body));
    check('hostile: no inline event handlers', !/onerror=/i.test(body));
    check('hostile: no javascript: URLs', !/href="javascript:/i.test(body));
    check('hostile: no iframe', !/<iframe/i.test(body));
    check('hostile: nested frontmatter shown as text', noJunk(body));

    r = await get('/ventures/new-venture');
    check('venture without profile still has a page', r.status === 200 && r.body.includes('No profile yet'), String(r.status));

    // Isolation: the circular-alias card must not break anything.
    for (const p of ['/', '/ideas', '/ideas?view=list', '/ideas/new-venture/circ', '/ventures', '/research', '/projects', '/log']) {
      const d = await get(p);
      check(`circular YAML card: ${p} 200`, d.status === 200 && noJunk(d.body), String(d.status));
    }
    for (const p of ['/api/ideas', '/api/projects', '/search.json']) {
      const d = await get(p);
      let ok = false;
      try {
        ok = Array.isArray(JSON.parse(d.body));
      } catch {}
      check(`circular YAML card: ${p} 200 valid JSON`, d.status === 200 && ok, String(d.status));
    }
    r = await get('/ideas/new-venture/circ');
    check('circular YAML card shows a warning and its body', r.body.includes('self-referencing alias') && r.body.includes('Still here'));

    // Sanitizer bypasses, rendered by the real server.
    for (const p of ['/ideas/new-venture/xss', '/research/2026-10-02-pasted']) {
      const d = await get(p);
      const danger = liveDanger(d.body);
      check(`${p}: no live handler, script or script URL`, d.status === 200 && !danger && !/<img src=x onerror|<a href=javascript/i.test(d.body), danger || String(d.status));
    }

    // File names: accents and apostrophes show; subfolders are reported.
    r = await get('/ideas');
    check('card named café.md is listed', r.body.includes('Café card'));
    check("card named what's-a-qs.md is listed", r.body.includes('What’s a QS') || r.body.includes('What&#39;s a QS'));
    check('cards in a subfolder are reported on /ideas', r.body.includes('ideas/new-venture/sub/'));
    r = await get(`/ideas/new-venture/${encodeURIComponent('café')}`);
    check('café card page 200', r.status === 200 && r.body.includes('Accents in the name'), String(r.status));
    r = await get(`/ideas/new-venture/${encodeURIComponent("what's-a-qs")}`);
    check("what's-a-qs card page 200", r.status === 200, String(r.status));
    r = await get(`/research/${encodeURIComponent('2026-10-02-café')}`);
    check('research note named café 200', r.status === 200 && r.body.includes('Accents'), String(r.status));

    // Bad venture frontmatter: no phantom venture, a warning instead.
    r = await get('/ventures');
    check('venture "../evil" does not become a venture', !r.body.includes('evil'));
    r = await get(`/projects/${BAD_VENTURE_PROJECT}`);
    check('bad venture frontmatter shows a warning', r.status === 200 && r.body.includes('is not a valid folder name'), String(r.status));

    // Links to files that appear or disappear later are not stale.
    const later = path.join(dir, 'research', '2026-10-03-later.md');
    const linked = (b) => b.includes('href="/research/2026-10-03-later"');
    r = await get('/research/2026-10-02-links');
    check('path to a missing file is not linked', r.status === 200 && !linked(r.body), String(r.status));
    fs.writeFileSync(later, '# Later\n');
    r = await get('/research/2026-10-02-links');
    check('path is linked once the file exists (no stale cache)', linked(r.body));
    fs.rmSync(later);
    r = await get('/research/2026-10-02-links');
    check('link goes away once the file is deleted (no stale cache)', !linked(r.body));

    // Symlinked outputs/: nothing outside the content root is listed or served.
    r = await get(`/projects/${SYM_PROJECT}`);
    check('symlinked outputs/ is not listed in the gallery', r.status === 200 && !r.body.includes('secret.png'), String(r.status));
    r = await get(`/media/${SYM_PROJECT}/secret.png`);
    check('symlinked outputs/ is not served (404)', r.status === 404, String(r.status));

    r = await get('/projects');
    check('/projects lists the fixture project', r.status === 200 && r.body.includes('Fixture post'), String(r.status));
    r = await get(`/projects/${FIXTURE_PROJECT}`);
    check('project page 200 with tabs and gallery', r.status === 200 && /data-tab="post"/.test(r.body) && /data-tab="zz-notes"/.test(r.body) && r.body.includes('frame.png') && noJunk(r.body), String(r.status));
    const tabOrder = [...r.body.matchAll(/data-tab="([^"]+)"/g)].map((m) => m[1]).join(',');
    check('project tabs ordered post, brief, script, then others', tabOrder === 'post,brief,script,zz-notes', tabOrder);
    check('project links its idea', r.body.includes('/ideas/qsme-nz/facebook-group'));
    check('project links Figma', r.body.includes('https://www.figma.com/file/abc/fixture'));
    check('markdown image rewritten to media route', r.body.includes(`/media/${FIXTURE_PROJECT}/frame.png`));
    check('secret.txt not in gallery', !r.body.includes('secret.txt'));
    r = await get(`/projects/${FIXTURE_PROJECT}?tab=script`);
    check('project ?tab=script 200', r.status === 200 && /aria-selected="true"[^>]*>Script|data-tab="script"[^>]*aria-selected="true"/.test(r.body), String(r.status));

    r = await get(`/media/${FIXTURE_PROJECT}/frame.png`);
    check('media png 200 image/png', r.status === 200 && r.headers['content-type'] === 'image/png', `${r.status} ${r.headers['content-type']}`);
    r = await get(`/media/${FIXTURE_PROJECT}/cuts/clip.mp4`, { Range: 'bytes=0-9' });
    check('media mp4 Range 206', r.status === 206 && r.headers['content-range'] === 'bytes 0-9/1000' && r.headers['content-length'] === '10', `${r.status} ${r.headers['content-range']}`);
    r = await get(`/media/${FIXTURE_PROJECT}/cuts/clip.mp4`, { Range: 'bytes=-100' });
    check('media suffix Range 206', r.status === 206 && r.headers['content-range'] === 'bytes 900-999/1000', `${r.status} ${r.headers['content-range']}`);
    r = await get(`/media/${FIXTURE_PROJECT}/cuts/clip.mp4`, { Range: 'bytes=5000-' });
    check('media unsatisfiable Range 416', r.status === 416, String(r.status));
    r = await get(`/media/${FIXTURE_PROJECT}/vo.mp3`);
    check('media mp3 200 audio/mpeg', r.status === 200 && r.headers['content-type'] === 'audio/mpeg', `${r.status}`);
    r = await get(`/media/${FIXTURE_PROJECT}/secret.txt`);
    check('non-media extension 404', r.status === 404, String(r.status));
    r = await get(`/media/${FIXTURE_PROJECT}/.hidden.png`);
    check('hidden media file not served', r.status !== 200, String(r.status));
    r = await get(`/media/${FIXTURE_PROJECT}/post.md`);
    check('project markdown not served as media', r.status === 404, String(r.status));
    r = await request(port, `/media/${FIXTURE_PROJECT}/frame.png`);
    check('media requires auth', r.status === 401, String(r.status));

    r = await get('/api/projects');
    let projects = [];
    try {
      projects = JSON.parse(r.body);
    } catch {}
    const fp = projects.find((p) => p.folder === FIXTURE_PROJECT);
    check(
      '/api/projects includes fixture with media (a master and its preview are one item)',
      !!fp && fp.media.map((m) => m.path).join(',') === 'cuts/clip.mp4,fixture-4x5.mp4,fixture-9x16-frames.png,fixture-9x16.mp4,frame.png,vo.mp3' && fp.status === 'in production',
      JSON.stringify(fp?.media?.map((m) => m.path)),
    );
    const fm = fp?.media.find((m) => m.path === 'fixture-9x16.mp4');
    check('/api/projects: play = preview, download = master', fm?.play === `/media/${FIXTURE_PROJECT}/fixture-9x16.preview.mp4` && fm?.download === `/media/${FIXTURE_PROJECT}/fixture-9x16.mp4?download=1`, JSON.stringify(fm));

    // Downloads from disk: attachment, same bytes; inline otherwise.
    r = await get(`/media/${FIXTURE_PROJECT}/fixture-9x16.mp4?download=1`);
    check('?download=1 (local) -> 200 attachment with the file name', r.status === 200 && r.headers['content-disposition'] === 'attachment; filename="fixture-9x16.mp4"' && r.raw.length === 1200, `${r.status} ${r.headers['content-disposition']}`);
    r = await get(`/media/${FIXTURE_PROJECT}/fixture-9x16.mp4`);
    check('without ?download the file is inline', r.status === 200 && r.headers['content-disposition'] === 'inline', r.headers['content-disposition']);
    r = await get(`/projects/${FIXTURE_PROJECT}`);
    check('gallery plays the preview and downloads the master', r.body.includes(`<video controls playsinline preload="metadata" src="/media/${FIXTURE_PROJECT}/fixture-9x16.preview.mp4">`) && r.body.includes(`href="/media/${FIXTURE_PROJECT}/fixture-9x16.mp4?download=1"`) && !r.body.includes('fixture-9x16.preview.mp4?download'));

    // The Videos page.
    r = await get('/videos');
    const vbody = r.body;
    const cardOf = (b, folder) => b.split('<section class="vcard').find((c) => c.includes(`id="video-${folder}"`)) || '';
    const card = cardOf(vbody, FIXTURE_PROJECT);
    check('/videos 200, nothing live, no junk', r.status === 200 && noJunk(vbody) && !liveDanger(vbody), liveDanger(vbody) || String(r.status));
    check('/videos: one card per project with videos', (vbody.match(/<section class="vcard/g) || []).length === 2 && !vbody.includes(`video-${SYM_PROJECT}`) && !vbody.includes(`video-${BAD_VENTURE_PROJECT}`));
    check('/videos: sorted by publish date', vbody.indexOf(`video-${TWO_PROJECT}`) < vbody.indexOf(`video-${FIXTURE_PROJECT}`));
    check('/videos: the player plays the preview of the script\'s video', /<video id="vp-\d+" controls playsinline preload="metadata" src="\/media\/2026-10-01-qsme-nz-check-fixture\/fixture-9x16\.preview\.mp4#t=0\.1" data-lines="vl-\d+">/.test(card), card.slice(0, 600));
    check('/videos: every version listed with play + full-quality download', card.includes(`data-src="/media/${FIXTURE_PROJECT}/fixture-4x5.mp4"`) && card.includes(`href="/media/${FIXTURE_PROJECT}/fixture-4x5.mp4?download=1"`) && card.includes(`href="/media/${FIXTURE_PROJECT}/fixture-9x16.mp4?download=1"`) && card.includes('script timing'));
    check('/videos: contact sheets are not listed as images', !card.includes('fixture-9x16-frames.png') && card.includes('frame.png'));
    check('/videos: one "say this" row and Copy button per line', (card.match(/<li class="vline"/g) || []).length === 2 && card.includes('aria-label="Copy line 1"') && card.includes('aria-label="Copy line 2"') && !card.includes('Copy line 3'));
    check('/videos: QSME shown as QSME', card.includes('<p class="say">Asked QSME for a builder.</p>') && !card.includes('Q-S-me'));
    check('/videos: "how" = first sentence, timings stripped', card.includes('<p class="how">Dry, tired Kiwi deadpan.</p>') && card.includes('<p class="how">Brisk and warm.</p>'));
    check('/videos: details carry on-screen text, direction, file name and max length', card.includes('Hook: 212 comments.') && card.includes('Falls at the end. Out by 2.9.') && card.includes('<code>vo00-hook.m4a</code> · must fit in 2.9s'));
    check('/videos: each time seeks its own player', /data-seek="vp-(\d+)" data-start="3.2"/.test(card) && card.includes(`id="vp-${/data-seek="vp-(\d+)"/.exec(card)?.[1]}"`));
    check('/videos: a hostile line is escaped, in text and in data-copy', !card.includes('<img src=x') && card.includes('data-copy="&lt;img src=x onerror=alert(1)&gt; &quot;quoted&quot; &amp; it&#39;s"'));
    check('/videos: Copy all and .txt', card.includes('aria-label="Copy all lines"') && card.includes(`href="/videos/${FIXTURE_PROJECT}/voice-script.txt"`));
    check('/videos: caption block with Copy (plain text, from post.md)', card.includes('Post caption &amp; hashtags') && card.includes('data-copy="Instagram\nSign up at qsme.co.nz. &lt;b&gt;bold&lt;/b&gt; #FixtureTag"') && !card.includes('No music in this one'), card.slice(card.indexOf('vcaption')));
    const two = cardOf(vbody, TWO_PROJECT);
    check('/videos: a project without a (valid) voice script still gets a card', two.includes('No voice script yet') && two.includes('vcard--land') && two.includes('two-16x9.mp4'));
    r = await get('/videos?venture=qsme-build');
    check('/videos?venture= filters (NZ / Global)', (r.body.match(/<section class="vcard/g) || []).length === 1 && r.body.includes(`video-${TWO_PROJECT}`) && r.body.includes('href="/videos?venture=qsme-build" aria-current="true"'), String(r.status));
    r = await request(port, '/videos');
    check('/videos needs auth', r.status === 401, String(r.status));
    r = await get(`/videos/${FIXTURE_PROJECT}/voice-script.txt`);
    check('voice-script.txt: plain text, one line each, as an attachment', r.status === 200 && /^text\/plain/.test(r.headers['content-type']) && /^attachment; filename="2026-10-01-qsme-nz-check-fixture-voice-script.txt"$/.test(r.headers['content-disposition']) && r.body === `Asked QSME for a builder.\n${HOSTILE_LINE}\n`, JSON.stringify(r.body));
    r = await get(`/videos/${TWO_PROJECT}/voice-script.txt`);
    check('voice-script.txt without a script -> 404', r.status === 404, String(r.status));
    r = await get('/videos/nope/voice-script.txt');
    check('voice-script.txt for an unknown project -> 404', r.status === 404, String(r.status));

    await traversalChecks(port, 'fixture', [
      `/media/${FIXTURE_PROJECT}/..%2f..%2f..%2f.env`,
      `/media/${FIXTURE_PROJECT}/%2e%2e/%2e%2e/%2e%2e/.env`,
      `/media/${FIXTURE_PROJECT}/../../../.env`,
      `/media/${FIXTURE_PROJECT}/outputs/../post.md`,
      '/media/..%2f.claude/settings.local.json',
      `/projects/${FIXTURE_PROJECT}/..%2f..%2f.env`,
      `/videos/..%2f..%2f.env/voice-script.txt`,
      `/videos/${FIXTURE_PROJECT}/..%2fpost.md`,
      `/media/${FIXTURE_PROJECT}/vo-script.json`,
      `/media/${FIXTURE_PROJECT}/fixture-9x16.mp4%2f..%2f..%2fpost.md`,
    ]);
  } finally {
    stop(s);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(outside, { recursive: true, force: true });
  }
}

// ----------------------------------------------------------------- phase 6

const BUCKET = 'check-bucket';
const AKID = `AKIDCHECK${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
const SECRET = `check-secret-${crypto.randomBytes(16).toString('hex')}`;
const md5Hex = (b) => crypto.createHash('md5').update(b).digest('hex');
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');

/**
 * A fake S3 bucket on 127.0.0.1. Every request must carry a valid SigV4
 * signature for AKID/SECRET (header-signed, or presigned in the query string),
 * recomputed here from the request as received, and the virtual host
 * <bucket>.localhost:<port> (endpoint http://localhost:<port>). Speaks just enough ListObjectsV2 (pageSize keys per
 * page, so continuation tokens get used), PUT, HEAD, GET and DELETE.
 *   etagMode 'md5' (S3's single-part ETag) or 'opaque' (forces sha256 metadata checks)
 */
async function startFakeS3({ pageSize = 2 } = {}) {
  const objects = new Map(); // key -> { body, type, meta, mtime }
  const log = [];
  const state = { etagMode: 'md5', port: 0 };
  const etagOf = (o) => (state.etagMode === 'md5' ? md5Hex(o.body) : `${md5Hex(Buffer.concat([o.body, Buffer.from('x')]))}-1`);
  const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      const qi = req.url.indexOf('?');
      const rawPath = qi === -1 ? req.url : req.url.slice(0, qi);
      const rawQuery = qi === -1 ? '' : req.url.slice(qi + 1);
      const pairs = rawQuery ? rawQuery.split('&').map((kv) => { const i = kv.indexOf('='); return i === -1 ? [decodeURIComponent(kv), ''] : [decodeURIComponent(kv.slice(0, i)), decodeURIComponent(kv.slice(i + 1))]; }) : [];
      const q = Object.fromEntries(pairs);
      let key = '';
      try {
        key = decodeURIComponent(rawPath.slice(1));
      } catch {}
      const entry = { method: req.method, key, query: q, headers: req.headers, size: body.length, sigOk: false, presigned: !!q['X-Amz-Signature'] };
      log.push(entry);
      const error = (status, code) => {
        res.writeHead(status, { 'content-type': 'application/xml' });
        res.end(req.method === 'HEAD' ? undefined : `<?xml version="1.0" encoding="UTF-8"?><Error><Code>${code}</Code><Message>${code} (fake)</Message></Error>`);
      };
      if (req.headers.host !== `${BUCKET}.localhost:${state.port}`) return error(400, 'InvalidHost');
      if (entry.presigned) {
        const amzDate = q['X-Amz-Date'] || '';
        const expect = sigv4({ method: req.method, path: rawPath, query: pairs.filter(([k]) => k !== 'X-Amz-Signature'), headers: { host: req.headers.host }, payloadHash: 'UNSIGNED-PAYLOAD', amzDate, region: 'auto', accessKeyId: AKID, secretAccessKey: SECRET });
        const t = Date.parse(amzDate.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z'));
        const fresh = t <= Date.now() + 60_000 && Date.now() <= t + Number(q['X-Amz-Expires']) * 1000;
        if (q['X-Amz-Credential'] !== `${AKID}/${amzDate.slice(0, 8)}/auto/s3/aws4_request` || q['X-Amz-SignedHeaders'] !== 'host' || expect.signature !== q['X-Amz-Signature']) return error(403, 'SignatureDoesNotMatch');
        if (!fresh) return error(403, 'AccessDenied');
      } else {
        const m = /^AWS4-HMAC-SHA256 Credential=([^/]+)\/(\d{8})\/([^/]+)\/s3\/aws4_request, SignedHeaders=([a-z0-9;-]+), Signature=([0-9a-f]{64})$/.exec(String(req.headers.authorization || ''));
        if (!m || m[1] !== AKID || m[3] !== 'auto') return error(403, 'InvalidAccessKeyId');
        const signed = m[4].split(';');
        if (!['host', 'x-amz-date', 'x-amz-content-sha256'].every((h) => signed.includes(h))) return error(403, 'AccessDenied');
        const payloadHash = String(req.headers['x-amz-content-sha256'] || '');
        if (payloadHash !== 'UNSIGNED-PAYLOAD' && payloadHash !== sha256(body)) return error(400, 'XAmzContentSHA256Mismatch');
        const headers = Object.fromEntries(signed.map((h) => [h, req.headers[h] ?? '']));
        const expect = sigv4({ method: req.method, path: rawPath, query: pairs, headers, payloadHash, amzDate: String(req.headers['x-amz-date']), region: 'auto', accessKeyId: AKID, secretAccessKey: SECRET });
        if (expect.signature !== m[5]) return error(403, 'SignatureDoesNotMatch');
      }
      entry.sigOk = true;
      if (req.method === 'GET' && rawPath === '/' && q['list-type'] === '2') {
        const prefix = q.prefix || '';
        const keys = [...objects.keys()].filter((k) => k.startsWith(prefix)).sort();
        const from = Number(q['continuation-token'] || 0);
        const page = keys.slice(from, from + pageSize);
        const more = from + pageSize < keys.length;
        const items = page.map((k) => { const o = objects.get(k); return `<Contents><Key>${xml(k)}</Key><LastModified>${o.mtime.toISOString()}</LastModified><ETag>&quot;${etagOf(o)}&quot;</ETag><Size>${o.body.length}</Size><StorageClass>STANDARD</StorageClass></Contents>`; });
        res.writeHead(200, { 'content-type': 'application/xml' });
        return res.end(`<?xml version="1.0" encoding="UTF-8"?><ListBucketResult><Name>${BUCKET}</Name><Prefix>${xml(prefix)}</Prefix><KeyCount>${page.length}</KeyCount><MaxKeys>1000</MaxKeys><IsTruncated>${more}</IsTruncated>${items.join('')}${more ? `<NextContinuationToken>${from + pageSize}</NextContinuationToken>` : ''}</ListBucketResult>`);
      }
      if (!key) return error(400, 'InvalidRequest');
      if (req.method === 'PUT') {
        if (req.headers['transfer-encoding'] || req.headers['content-length'] === undefined || Number(req.headers['content-length']) !== body.length) return error(411, 'MissingContentLength');
        const meta = {};
        for (const [k, v] of Object.entries(req.headers)) if (k.startsWith('x-amz-meta-')) meta[k.slice(11)] = v;
        const o = { body, type: req.headers['content-type'] || '', meta, mtime: new Date() };
        objects.set(key, o);
        res.writeHead(200, { etag: `"${etagOf(o)}"` });
        return res.end();
      }
      const o = objects.get(key);
      if (req.method === 'DELETE') {
        objects.delete(key);
        res.writeHead(204);
        return res.end();
      }
      if (!o) return error(404, 'NoSuchKey');
      const headers = { 'content-type': o.type, 'content-length': o.body.length, etag: `"${etagOf(o)}"`, 'last-modified': o.mtime.toUTCString() };
      for (const [k, v] of Object.entries(o.meta)) headers[`x-amz-meta-${k}`] = v;
      if (q['response-content-disposition']) headers['content-disposition'] = q['response-content-disposition'];
      res.writeHead(200, headers);
      res.end(req.method === 'HEAD' ? undefined : o.body);
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  state.port = server.address().port;
  const put = (k, body, type = 'application/octet-stream', meta = {}) => objects.set(k, { body: Buffer.from(body), type, meta, mtime: new Date() });
  return {
    port: state.port,
    endpoint: `http://localhost:${state.port}`, // virtual host: check-bucket.localhost:<port>
    host: `${BUCKET}.localhost:${state.port}`,
    objects,
    log,
    put,
    setEtagMode: (m) => (state.etagMode = m),
    close: () => new Promise((r) => server.close(r)),
  };
}

/** GET a presigned (bucket) URL through the fake: dial 127.0.0.1, keep the virtual Host. */
function getPresigned(fake, url) {
  const u = new URL(url);
  return request(fake.port, u.pathname + u.search, { headers: { Host: u.host } });
}

/** Run tools/motion/sync-media.mjs. Resolves { code, out }. STUDIO_* and BUCKET_* come only from `env`. */
function runSync(args, env) {
  return new Promise((resolve) => {
    const e = { ...process.env };
    for (const k of Object.keys(e)) if (k.startsWith('STUDIO_') || k.startsWith('BUCKET_')) delete e[k];
    const child = spawn(process.execPath, [SYNC, ...args], { env: { ...e, ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
    children.add(child);
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    const t = setTimeout(() => child.kill('SIGKILL'), 120_000);
    child.on('exit', (code) => {
      clearTimeout(t);
      children.delete(child);
      resolve({ code, out });
    });
  });
}

const BUCKET_PROJECT = '2026-10-04-qsme-nz-bucket';
const LOCAL_PROJECT = '2026-10-04-qsme-build-local';

async function phaseBucket() {
  console.log('\n6. Storage bucket (fake S3 on 127.0.0.1): presigned /media, gallery and /videos from the listing, sync-media');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-studio-bucket-'));
  tmpDirs.add(tmp);
  const dir = path.join(tmp, 'content');
  const w = (rel, data) => {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), data);
  };
  w('learnings.md', '# Learnings\n');
  w(
    `projects/${BUCKET_PROJECT}/post.md`,
    '---\ntitle: Bucket project\nventure: qsme-nz\npublish_date: 2026-10-09\n---\n# Post\n\n## Caption\n\nFrom the bucket. #Bucket\n\n### Instagram Reels (Fri 9 Oct, 19:30 NZDT)\n\n> Reel post. "Quoted" & <b>bold</b>\n\n**Hashtags (2):** #Reel #Bucket · **Cover:** `outputs/cover.png`\n\n### YouTube Shorts\n\n- **Title:** Bucket short\n',
  );
  w(
    `projects/${BUCKET_PROJECT}/vo-script.json`,
    JSON.stringify({
      video: 'outputs/reel-9x16.mp4',
      lines: [
        { id: 'vo00', speaker: 'Mel', start_s: 0, max_s: 2, text_v2: 'Straight from the bucket.', delivery: 'MEL. Bone-dry. Out by 1.9.' },
        { id: 'vo01', speaker: 'Him', start_s: 2, max_s: 1, text_v2: 'Right.', delivery: 'HIM. Flat.' },
      ],
    }),
  );
  w(`projects/${LOCAL_PROJECT}/post.md`, '---\ntitle: Local project\nventure: qsme-build\n---\n# Post\n');
  w(`projects/${LOCAL_PROJECT}/outputs/local.png`, PNG);
  w(`projects/${LOCAL_PROJECT}/outputs/reel-16x9.mp4`, crypto.randomBytes(300));
  w('projects/_template/post.md', '# Template\n');
  w('projects/secret.txt', 'FAKE_API_KEY=never\n');

  const fake = await startFakeS3();
  const reel = crypto.randomBytes(2400);
  const reelPreview = crypto.randomBytes(600);
  const cafe = 'café & co.png';
  fake.put(`projects/${BUCKET_PROJECT}/outputs/reel-9x16.mp4`, reel, 'video/mp4');
  fake.put(`projects/${BUCKET_PROJECT}/outputs/reel-9x16.preview.mp4`, reelPreview, 'video/mp4');
  fake.put(`projects/${BUCKET_PROJECT}/outputs/cover.png`, PNG, 'image/png');
  fake.put(`projects/${BUCKET_PROJECT}/outputs/${cafe}`, PNG, 'image/png');
  // Decoys the studio must never list or link.
  fake.put(`projects/${BUCKET_PROJECT}/outputs/sub/deep.png`, PNG, 'image/png');
  fake.put(`projects/${BUCKET_PROJECT}/outputs/notes.txt`, 'FAKE_API_KEY=never', 'text/plain');
  fake.put(`projects/${BUCKET_PROJECT}/secret.png`, PNG, 'image/png');
  fake.put('projects/_template/outputs/t.png', PNG, 'image/png');
  fake.put('other/x.png', PNG, 'image/png');
  fake.put(`projects/${LOCAL_PROJECT}/outputs/remote-only.png`, PNG, 'image/png');

  const bucketEnv = { BUCKET_NAME: BUCKET, BUCKET_ENDPOINT: fake.endpoint, BUCKET_REGION: 'auto', BUCKET_ACCESS_KEY_ID: AKID, BUCKET_SECRET_ACCESS_KEY: SECRET };
  const env = { STUDIO_PASSWORD: PASSWORD, STUDIO_API_TOKEN: TOKEN, STUDIO_CONTENT_ROOT: dir, ...bucketEnv };
  const BEARER = { Authorization: `Bearer ${TOKEN}` };
  const lists = () => fake.log.filter((e) => e.method === 'GET' && e.query['list-type'] === '2' && !e.query['continuation-token']).length;
  let s;
  try {
    s = await startServer('bucket', env);
    const { port } = s;
    const get = (p, headers = {}) => request(port, p, { headers: { ...AUTH, ...headers } });
    check('startup log names the bucket, never a credential', s.log().includes(`media: bucket ${BUCKET}`) && !s.log().includes(SECRET) && !s.log().includes(AKID), s.log());

    // /media -> 302 to a presigned GET on the bucket host.
    let r = await get(`/media/${BUCKET_PROJECT}/reel-9x16.mp4`);
    const loc = r.headers.location || '';
    let u = loc ? new URL(loc) : null;
    check('/media (bucket) -> 302 to the bucket host', r.status === 302 && u?.host === fake.host && u?.pathname === `/projects/${BUCKET_PROJECT}/outputs/reel-9x16.mp4`, `${r.status} ${loc}`);
    check('presigned: X-Amz-Signature, 1 hour, our access key id, no secret, inline', /^[0-9a-f]{64}$/.test(u?.searchParams.get('X-Amz-Signature') || '') && u?.searchParams.get('X-Amz-Expires') === '3600' && (u?.searchParams.get('X-Amz-Credential') || '').startsWith(`${AKID}/`) && !loc.includes(SECRET) && !u?.searchParams.has('response-content-disposition'), loc);
    check('the redirect is private', /private/.test(r.headers['cache-control'] || ''), r.headers['cache-control']);
    let g = await getPresigned(fake, loc);
    check('the presigned URL verifies on the (fake) bucket and returns the master', g.status === 200 && sha256(g.raw) === sha256(reel), `${g.status} ${g.body.slice(0, 120)}`);
    r = await get(`/media/${BUCKET_PROJECT}/reel-9x16.mp4`);
    check('the same URL for repeated requests (browser cache can hit)', r.headers.location === loc);
    r = await get(`/media/${BUCKET_PROJECT}/reel-9x16.mp4?download=1`);
    u = new URL(r.headers.location || 'http://x/');
    check('?download=1 (bucket) -> presigned with attachment disposition', r.status === 302 && u.searchParams.get('response-content-disposition') === 'attachment; filename="reel-9x16.mp4"', r.headers.location);
    g = await getPresigned(fake, r.headers.location);
    check('the download URL verifies and the bucket answers Content-Disposition: attachment', g.status === 200 && g.headers['content-disposition'] === 'attachment; filename="reel-9x16.mp4"', `${g.status} ${g.headers['content-disposition']}`);
    r = await get(`/media/${BUCKET_PROJECT}/${encodeURIComponent(cafe)}`);
    u = new URL(r.headers.location || 'http://x/');
    check('a unicode name with "&" and spaces is encoded in the key', r.status === 302 && u.pathname === `/projects/${BUCKET_PROJECT}/outputs/caf%C3%A9%20%26%20co.png`, r.headers.location);
    g = await getPresigned(fake, r.headers.location);
    check('... and its presigned URL verifies', g.status === 200 && g.raw.equals(PNG), String(g.status));
    r = await get(`/media/${BUCKET_PROJECT}/reel-9x16.mp4?download=1&key=../../secret.png&X-Amz-Expires=999999`);
    u = new URL(r.headers.location || 'http://x/');
    check('the query string cannot change the key or the expiry', u.pathname === `/projects/${BUCKET_PROJECT}/outputs/reel-9x16.mp4` && u.searchParams.get('X-Amz-Expires') === '3600' && !u.searchParams.has('key'), r.headers.location);

    r = await request(port, `/media/${BUCKET_PROJECT}/reel-9x16.mp4`);
    check('/media (bucket) needs auth: 401, no Location', r.status === 401 && !r.headers.location, String(r.status));
    r = await request(port, `/media/${BUCKET_PROJECT}/reel-9x16.mp4`, { headers: BEARER });
    check('/media refuses the Bearer token (Basic only)', r.status === 401 && !r.headers.location, String(r.status));
    r = await get(`/media/${LOCAL_PROJECT}/local.png`);
    check('a file on this disk is still served from disk (200), not redirected', r.status === 200 && r.raw.equals(PNG) && !r.headers.location, String(r.status));
    r = await get(`/media/${LOCAL_PROJECT}/remote-only.png`);
    check('a file not on this disk redirects to the bucket', r.status === 302 && new URL(r.headers.location).pathname === `/projects/${LOCAL_PROJECT}/outputs/remote-only.png`, String(r.status));

    // Traversal and odd names never produce a presigned URL outside projects/<p>/outputs/<file>.
    const attacks = [
      `/media/${BUCKET_PROJECT}/..%2f..%2f.env`, `/media/${BUCKET_PROJECT}/..%2fsecret.png`, `/media/${BUCKET_PROJECT}/%2e%2e/secret.png`, `/media/${BUCKET_PROJECT}/%2e%2e%2fsecret.png`,
      `/media/..%2f${BUCKET_PROJECT}/x.mp4`, `/media/%2e%2e/${BUCKET_PROJECT}/x.mp4`, `/media/${BUCKET_PROJECT}%2f..%2fother/x.png`, `/media/${BUCKET_PROJECT}/a%2fb.mp4`,
      `/media/${BUCKET_PROJECT}/a%5cb.mp4`, `/media/${BUCKET_PROJECT}/x.mp4%00.png`, `/media/${BUCKET_PROJECT}/sub/deep.png`, `/media/${BUCKET_PROJECT}/.env.mp4`,
      `/media/${BUCKET_PROJECT}/_x.mp4`, `/media/${BUCKET_PROJECT}/notes.txt`, `/media/${BUCKET_PROJECT}/x`, `/media/${BUCKET_PROJECT}/..`, `/media/${BUCKET_PROJECT}/%2e%2e`,
      `/media/${BUCKET_PROJECT}/x%0a.mp4`, `/media/${BUCKET_PROJECT}/x%7f.mp4`, `/media/${BUCKET_PROJECT}/x.mp4/..%2f..%2fsecret.png`, `/media/${BUCKET_PROJECT}/outputs/../secret.png`,
      '/media/_template/t.png', '/media/2026-01-01-nope/x.mp4', '/media/secret.txt/x.png', `/media/${BUCKET_PROJECT}`, '/media/other/x.png', `/media/${BUCKET_PROJECT}/..%252fsecret.png`,
    ];
    for (const a of attacks) {
      for (const headers of [AUTH, {}]) {
        const x = await request(port, a, { headers });
        check(`bucket ${headers.Authorization ? 'auth' : 'anon'} ${a} -> ${x.status}, no presigned URL`, x.status !== 302 && x.status !== 200 && !x.headers.location, `${x.status} ${x.headers.location || ''}`);
      }
    }
    await traversalChecks(port, 'bucket');

    // The gallery and /videos come from the bucket listing.
    const listsBefore = lists();
    r = await get(`/projects/${BUCKET_PROJECT}`);
    check(
      'gallery (bucket): plays the preview, downloads the master, shows the stills',
      r.status === 200 &&
        r.body.includes(`<video controls playsinline preload="metadata" src="/media/${BUCKET_PROJECT}/reel-9x16.preview.mp4">`) &&
        r.body.includes(`href="/media/${BUCKET_PROJECT}/reel-9x16.mp4?download=1"`) &&
        r.body.includes(`/media/${BUCKET_PROJECT}/cover.png`) &&
        r.body.includes(`/media/${BUCKET_PROJECT}/${encodeURIComponent(cafe)}`),
      String(r.status),
    );
    check('gallery (bucket): no subfolder, non-media, or out-of-outputs objects', !/deep\.png|notes\.txt|secret\.png|t\.png/.test(r.body));
    r = await get(`/projects/${LOCAL_PROJECT}`);
    check('gallery: a project with local outputs shows those (local wins)', r.body.includes(`/media/${LOCAL_PROJECT}/local.png`) && !r.body.includes('remote-only.png'));
    r = await get('/videos');
    const card = r.body.split('<section class="vcard').find((c) => c.includes(`id="video-${BUCKET_PROJECT}"`)) || '';
    check('/videos (bucket): card with the preview player, versions and the script', card.includes(`src="/media/${BUCKET_PROJECT}/reel-9x16.preview.mp4#t=0.1"`) && card.includes(`href="/media/${BUCKET_PROJECT}/reel-9x16.mp4?download=1"`) && card.includes('Straight from the bucket.') && card.includes('#Bucket'), card.slice(0, 400));
    check('/videos (bucket): nothing live', !liveDanger(r.body), liveDanger(r.body));
    check('/videos: two voices: each row names its speaker, "how" without the tag', card.includes('<p class="vspeaker">Mel</p>') && card.includes('<p class="vspeaker">Him</p>') && card.includes('<p class="how">Bone-dry.</p>') && card.includes('<p class="how">Flat.</p>') && card.includes('2 voices: Mel, Him'), card.slice(card.indexOf('vscript'), card.indexOf('vscript') + 900));
    check('/videos: two voices: Copy all says who reads each line, per-line Copy is the bare text', card.includes('data-copy="Mel: Straight from the bucket.\nHim: Right." aria-label="Copy all lines, with who reads each"') && card.includes('data-copy="Right." aria-label="Copy line 2"'), card.slice(card.indexOf('vscript-actions'), card.indexOf('vscript-actions') + 300));
    check('/videos: one Copy per platform: the post text and its hashtags (escaped)', card.includes('data-copy="Reel post. &quot;Quoted&quot; &amp; &lt;b&gt;bold&lt;/b&gt;\n\n#Reel #Bucket" aria-label="Copy the Instagram Reels (Fri 9 Oct, 19:30 NZDT) post text and hashtags"') && card.includes('>Copy Instagram Reels</button>') && card.includes('data-copy="- Title: Bucket short"') && card.includes('>Copy YouTube Shorts</button>'), card.slice(card.indexOf('vcaption-actions'), card.indexOf('vcaption-actions') + 900));
    check('/videos: the player sits in its sticky stage', /<div class="vstage"><div class="vplayer ar-9x16"><video id="vp-\d+"/.test(card), card.slice(0, 600));
    r = await get(`/videos/${BUCKET_PROJECT}/voice-script.txt`);
    check('voice-script.txt (two voices): "Mel: ..." per line', r.status === 200 && r.body === 'Mel: Straight from the bucket.\nHim: Right.\n', JSON.stringify(r.body));
    r = await get('/videos');
    await get('/projects');
    check('the bucket listing is cached (one listing for several pages, continuation tokens followed)', lists() - listsBefore <= 1 && fake.log.some((e) => e.query['continuation-token']), `${lists() - listsBefore} listings`);
    check('the studio only ever lists the bucket (no writes, every request signed)', fake.log.filter((e) => !e.presigned).every((e) => e.method === 'GET' && e.query['list-type'] === '2' && e.sigOk), JSON.stringify(fake.log.filter((e) => !e.presigned).map((e) => [e.method, e.key, e.sigOk])));

    // CSP lets the bucket's presigned media and images through, nothing else.
    const csp = r.headers['content-security-policy'] || '';
    check('CSP allows the bucket origin for media and images only', csp.includes(`media-src 'self' http://${fake.host}`) && csp.includes(`img-src 'self' data: http://${fake.host}`) && !/script-src[^;]*storage|script-src[^;]*127/.test(csp), csp);

    // The read-only media API.
    for (const [label, headers] of [['Basic', AUTH], ['Bearer', BEARER]]) {
      r = await request(port, `/api/media/${BUCKET_PROJECT}`, { headers });
      let files = [];
      try {
        files = JSON.parse(r.body);
      } catch {}
      const names = files.map((f) => f.name).sort();
      check(`GET /api/media/<project> (${label}) lists the bucket for that project`, r.status === 200 && r.headers['x-media-storage'] === 'bucket' && JSON.stringify(names) === JSON.stringify([cafe, 'cover.png', 'reel-9x16.mp4', 'reel-9x16.preview.mp4'].sort()) && files.every((f) => f.size > 0 && f.url.startsWith(`/media/${BUCKET_PROJECT}/`)), `${r.status} ${r.body}`);
    }
    // A Bearer client can't use /media (password only), so the API hands it
    // presigned links, each for its own key, fetchable with no other auth.
    r = await request(port, `/api/media/${BUCKET_PROJECT}`, { headers: BEARER });
    let items = [];
    try {
      items = JSON.parse(r.body);
    } catch {}
    check(
      'GET /api/media: every file carries presigned links for its own key on the bucket host',
      items.length === 4 &&
        items.every((f) => {
          const a = new URL(f.signedUrl);
          const b = new URL(f.signedDownloadUrl);
          const keyPath = `/projects/${BUCKET_PROJECT}/outputs/${encodeKey(f.name)}`;
          return a.host === fake.host && a.pathname === keyPath && b.host === fake.host && b.pathname === keyPath && !a.searchParams.has('response-content-disposition') && /^attachment; /.test(b.searchParams.get('response-content-disposition') || '');
        }) &&
        !r.body.includes(SECRET),
      r.body.slice(0, 600),
    );
    const reelItem = items.find((f) => f.name === 'reel-9x16.mp4');
    g = await getPresigned(fake, reelItem?.signedUrl || 'http://x/');
    check('GET /api/media: a Bearer client fetches the file through signedUrl (no password)', g.status === 200 && sha256(g.raw) === sha256(reel), String(g.status));
    g = await getPresigned(fake, reelItem?.signedDownloadUrl || 'http://x/');
    check('GET /api/media: signedDownloadUrl comes back as an attachment', g.status === 200 && g.headers['content-disposition'] === 'attachment; filename="reel-9x16.mp4"', `${g.status} ${g.headers['content-disposition']}`);
    const left = Date.parse(reelItem?.signedUntil || '') - Date.now();
    check('GET /api/media: signedUntil says how long the links last (55 to 60 minutes)', left > 54.9 * 60_000 && left <= 60 * 60_000, reelItem?.signedUntil);
    r = await request(port, `/media/${BUCKET_PROJECT}/reel-9x16.mp4`, { headers: BEARER });
    check('/media still refuses the Bearer token (the API hands out links instead)', r.status === 401 && !r.headers.location, String(r.status));

    r = await request(port, `/api/media/${BUCKET_PROJECT}`);
    check('GET /api/media/<project> needs auth', r.status === 401, String(r.status));
    r = await get('/api/media/2026-01-01-nope');
    check('GET /api/media/<unknown project> -> 404', r.status === 404, String(r.status));
    for (const method of ['PUT', 'DELETE']) {
      r = await rawRequest(port, `/api/media/${BUCKET_PROJECT}/x.png`, { method, headers: BEARER, body: PNG });
      check(`${method} /api/media/... -> 405, nothing reaches the bucket`, r.status === 405 && !fake.log.some((e) => e.method === method), `${r.status} ${r.body}`);
    }
    r = await get('/api/projects');
    const bp = JSON.parse(r.body).find((p) => p.folder === BUCKET_PROJECT);
    check('/api/projects (bucket): play/download URLs', bp?.media.some((m) => m.path === 'reel-9x16.mp4' && m.play === `/media/${BUCKET_PROJECT}/reel-9x16.preview.mp4` && m.download === `/media/${BUCKET_PROJECT}/reel-9x16.mp4?download=1`), JSON.stringify(bp?.media));
    const log = s.log();
    check('bucket server log has no errors and no credentials', !/failed:|Error/.test(log) && !log.includes(SECRET), log.split('\n').find((x) => /failed:|Error/.test(x)));
  } finally {
    stop(s);
  }

  try {
    // A bucket that is down never takes a page down; presigning needs no network.
    const closed = await freePort();
    s = await startServer('bucket-down', { ...env, BUCKET_ENDPOINT: `http://localhost:${closed}` });
    let r = await request(s.port, `/projects/${BUCKET_PROJECT}`, { headers: AUTH });
    check('bucket down: project page 200 (no gallery)', r.status === 200 && r.body.includes('Nothing rendered yet'), String(r.status));
    r = await request(s.port, '/videos', { headers: AUTH });
    check('bucket down: /videos 200 (local cards only)', r.status === 200 && r.body.includes(`video-${LOCAL_PROJECT}`) && !r.body.includes(`video-${BUCKET_PROJECT}`), String(r.status));
    r = await request(s.port, `/media/${BUCKET_PROJECT}/reel-9x16.mp4`, { headers: AUTH });
    check('bucket down: /media still redirects (presigning is local)', r.status === 302, String(r.status));
    check('bucket down: one warning, no crash, no credentials in the log', /bucket listing failed/.test(s.log()) && !s.log().includes(SECRET), s.log());
  } finally {
    stop(s);
  }

  try {
    // Half-configured bucket: a clear message, and the studio runs without it.
    s = await startServer('bucket-partial', { STUDIO_PASSWORD: PASSWORD, STUDIO_CONTENT_ROOT: dir, BUCKET_NAME: BUCKET, BUCKET_SECRET_ACCESS_KEY: SECRET });
    const r = await request(s.port, `/media/${BUCKET_PROJECT}/reel-9x16.mp4`, { headers: AUTH });
    check('partial BUCKET_*: studio starts, says which are missing, media is local only', /media bucket disabled: bucket settings incomplete: BUCKET_ENDPOINT, BUCKET_ACCESS_KEY_ID/.test(s.log()) && /media: local outputs\/ only \(bucket disabled/.test(s.log()) && !s.log().includes(SECRET) && r.status === 404, `${r.status} ${s.log()}`);
  } finally {
    stop(s);
  }

  // ------------------------------------------------- tools/motion/sync-media.mjs
  const sf = await startFakeS3({ pageSize: 3 });
  const root = path.join(tmp, 'sync-root');
  const sw = (rel, data) => {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), data);
  };
  const P1 = '2026-10-05-qsme-nz-sync';
  const files = {
    'a-9x16.mp4': crypto.randomBytes(5000),
    'a-9x16.preview.mp4': crypto.randomBytes(900),
    'cover.png': PNG,
    'voice.m4a': crypto.randomBytes(300),
    'still.JPG': crypto.randomBytes(200),
    'café clip.mp4': crypto.randomBytes(400),
    'master.MOV': crypto.randomBytes(700),
    'loop.webm': crypto.randomBytes(350),
  };
  for (const [n, b] of Object.entries(files)) sw(`projects/${P1}/outputs/${n}`, b);
  sw(`projects/${P1}/outputs/notes.txt`, 'not media');
  sw(`projects/${P1}/outputs/sub/deep.png`, PNG);
  sw(`projects/${P1}/outputs/.hidden.png`, PNG);
  sw(`projects/${P1}/outputs/_draft.png`, PNG);
  sw(`projects/${P1}/post.md`, '# Post\n');
  sw('projects/_template/outputs/t.png', PNG);
  fs.mkdirSync(path.join(root, 'projects', '2026-10-05-sym'), { recursive: true });
  fs.symlinkSync(path.join(root, 'projects', P1, 'outputs'), path.join(root, 'projects', '2026-10-05-sym', 'outputs'));
  const syncEnv = { BUCKET_NAME: BUCKET, BUCKET_ENDPOINT: sf.endpoint, BUCKET_REGION: 'auto', BUCKET_ACCESS_KEY_ID: AKID, BUCKET_SECRET_ACCESS_KEY: SECRET };
  const key = (n) => `projects/${P1}/outputs/${n}`;
  const noCreds = (out) => !out.includes(SECRET) && !out.includes(AKID);
  const puts = () => sf.log.filter((e) => e.method === 'PUT').length;
  try {
    let x = await runSync(['--root', root], syncEnv);
    check('sync-media: uploads masters, previews, stills and audio, prints a summary', x.code === 0 && /sync-media: 2 projects, 8 files, 8 uploaded \(0\.0 MB\), 0 unchanged \(skipped\), 0 deleted, 0 failed/.test(x.out), x.out);
    check('sync-media: keys are projects/<p>/outputs/<file> (unicode and spaces too)', Object.keys(files).every((n) => sf.objects.get(key(n))?.body.equals(files[n])), [...sf.objects.keys()].join(', '));
    check('sync-media: subfolders, other types, dot-files, symlinked outputs/ and _template stay local', [...sf.objects.keys()].every((k) => k.startsWith(`projects/${P1}/outputs/`) && !/deep|notes|hidden|_draft|t\.png/.test(k)), [...sf.objects.keys()].join(', '));
    check('sync-media: reports names the Studio cannot serve', /skipped 1 .*_draft\.png/.test(x.out), x.out);
    check('sync-media: right Content-Type per file', sf.objects.get(key('a-9x16.mp4'))?.type === 'video/mp4' && sf.objects.get(key('a-9x16.preview.mp4'))?.type === 'video/mp4' && sf.objects.get(key('cover.png'))?.type === 'image/png' && sf.objects.get(key('voice.m4a'))?.type === 'audio/mp4' && sf.objects.get(key('still.JPG'))?.type === 'image/jpeg');
    check('sync-media: every type the Studio shows goes up (.mov and .webm too)', sf.objects.get(key('master.MOV'))?.type === 'video/quicktime' && sf.objects.get(key('loop.webm'))?.type === 'video/webm', `${sf.objects.get(key('master.MOV'))?.type} ${sf.objects.get(key('loop.webm'))?.type}`);
    check('sync-media: stores x-amz-meta-sha256', Object.keys(files).every((n) => sf.objects.get(key(n))?.meta.sha256 === sha256(files[n])));
    const putLog = sf.log.filter((e) => e.method === 'PUT');
    check('sync-media: PUTs are signed, UNSIGNED-PAYLOAD, with Content-Length (never chunked)', putLog.length === 8 && putLog.every((e) => e.sigOk && e.headers['x-amz-content-sha256'] === 'UNSIGNED-PAYLOAD' && e.headers['content-length'] && !e.headers['transfer-encoding']), JSON.stringify(putLog.map((e) => [e.key, e.sigOk])));
    check('sync-media: never prints the credentials', noCreds(x.out));

    let before = puts();
    x = await runSync(['--root', root], syncEnv);
    check('sync-media: a second run uploads nothing (size + ETag)', x.code === 0 && / 0 uploaded/.test(x.out) && /8 unchanged/.test(x.out) && puts() === before, x.out);
    sf.setEtagMode('opaque');
    const heads = sf.log.filter((e) => e.method === 'HEAD').length;
    x = await runSync(['--root', root], syncEnv);
    check('sync-media: with non-MD5 ETags it compares x-amz-meta-sha256 (HEAD) and still uploads nothing', x.code === 0 && /8 unchanged/.test(x.out) && puts() === before && sf.log.filter((e) => e.method === 'HEAD').length - heads === 8, x.out);
    sf.setEtagMode('md5');
    const changed = crypto.randomBytes(5000);
    fs.writeFileSync(path.join(root, 'projects', P1, 'outputs', 'a-9x16.mp4'), changed); // same size, new bytes
    x = await runSync(['--root', root], syncEnv);
    check('sync-media: a changed file (same size) is uploaded again', x.code === 0 && / 1 uploaded/.test(x.out) && sf.objects.get(key('a-9x16.mp4'))?.body.equals(changed), x.out);

    sw(`projects/${P1}/outputs/new.png`, PNG);
    before = puts();
    x = await runSync(['--root', root, '--dry-run'], syncEnv);
    check('sync-media --dry-run: lists and compares, sends nothing', x.code === 0 && /would upload {2}projects\/2026-10-05-qsme-nz-sync\/outputs\/new\.png/.test(x.out) && /1 to upload/.test(x.out) && puts() === before && !sf.objects.has(key('new.png')), x.out);

    sf.put(key('old.png'), PNG, 'image/png');
    sf.put(`projects/${P1}/outputs/sub/kept.png`, PNG, 'image/png');
    sf.put('other/kept.png', PNG, 'image/png');
    x = await runSync(['--root', root], syncEnv);
    check('sync-media: objects with no local file are kept without --prune', x.code === 0 && sf.objects.has(key('old.png')) && /1 only in the bucket \(kept; --prune deletes\)/.test(x.out), x.out);
    x = await runSync(['--root', root, '--prune', '--dry-run'], syncEnv);
    check('sync-media --prune --dry-run deletes nothing', x.code === 0 && /would delete {2}projects\/2026-10-05-qsme-nz-sync\/outputs\/old\.png/.test(x.out) && sf.objects.has(key('old.png')), x.out);
    x = await runSync(['--root', root, '--prune'], syncEnv);
    check('sync-media --prune deletes only our objects with no local file', x.code === 0 && !sf.objects.has(key('old.png')) && sf.objects.has(`projects/${P1}/outputs/sub/kept.png`) && sf.objects.has('other/kept.png') && sf.objects.has(key('cover.png')) && /1 deleted/.test(x.out), x.out);
    const empty = path.join(tmp, 'empty-root');
    fs.mkdirSync(path.join(empty, 'projects'), { recursive: true });
    x = await runSync(['--root', empty, '--prune'], syncEnv);
    check('sync-media --prune with no local media refuses to empty the bucket', x.code === 1 && /nothing was deleted/.test(x.out) && sf.objects.has(key('cover.png')), x.out);

    // Credentials from `railway variables --service studio --kv` (a fake railway on PATH).
    const bin = path.join(tmp, 'bin');
    fs.mkdirSync(bin);
    const pwdFile = path.join(tmp, 'railway-pwd');
    const fakeRailway = (body) => {
      fs.writeFileSync(path.join(bin, 'railway'), `#!/bin/sh\n[ "$*" = "variables --service studio --kv" ] || { echo "unexpected: $*" >&2; exit 3; }\npwd -P > "${pwdFile}"\n${body}\n`);
      fs.chmodSync(path.join(bin, 'railway'), 0o755);
    };
    fakeRailway(`cat <<'EOF'\nSTUDIO_PASSWORD=not-for-sync-0123456789\nBUCKET_NAME=${BUCKET}\nBUCKET_ENDPOINT=${sf.endpoint}\nBUCKET_REGION=auto\nBUCKET_ACCESS_KEY_ID=${AKID}\nBUCKET_SECRET_ACCESS_KEY=${SECRET}\nEOF`);
    const pathEnv = { PATH: `${bin}${path.delimiter}${process.env.PATH}` };
    x = await runSync(['--root', root, '--dry-run'], pathEnv);
    check('sync-media: reads BUCKET_* from `railway variables --service studio --kv` in the repo root', x.code === 0 && /credentials from Railway/.test(x.out) && fs.existsSync(pwdFile) && fs.readFileSync(pwdFile, 'utf8').trim() === fs.realpathSync(ROOT), `${x.out} pwd=${fs.existsSync(pwdFile) ? fs.readFileSync(pwdFile, 'utf8').trim() : '-'}`);
    check('sync-media: never prints what railway returned', noCreds(x.out) && !x.out.includes('not-for-sync'), x.out);
    fakeRailway(`echo "Unauthorized. Please login with \\\`railway login\\\`" >&2\necho "BUCKET_SECRET_ACCESS_KEY=${SECRET}" >&2\nexit 1`);
    x = await runSync(['--root', root], pathEnv);
    check('sync-media: a railway failure stops with a clear message (and no secrets)', x.code === 1 && /could not read the bucket credentials/.test(x.out) && /Unauthorized/.test(x.out) && noCreds(x.out), x.out);
    x = await runSync(['--root', root], { BUCKET_NAME: BUCKET });
    check('sync-media: half-set BUCKET_* in the environment is refused', x.code === 1 && /incomplete: BUCKET_ENDPOINT/.test(x.out), x.out);
    x = await runSync(['--root', root], { ...syncEnv, BUCKET_SECRET_ACCESS_KEY: 'wrong-secret-0123456789' });
    check('sync-media: a wrong key fails cleanly (403 from the bucket), without echoing it', x.code === 1 && /403/.test(x.out) && !x.out.includes('wrong-secret'), x.out);
  } finally {
    await sf.close();
    await fake.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// ------------------------------------------------------------------- run

async function main() {
  const t = Date.now();
  try {
    await phaseUnits();
    await phaseMain();
    await phaseLocked();
    await phaseStartup();
    await phaseThrottle();
    await phaseFixture();
    await phaseBucket();
  } catch (e) {
    failed++;
    console.error(`\n  FAIL  ${e.stack || e}`);
  } finally {
    for (const c of children) c.kill('SIGKILL');
    for (const d of tmpDirs) fs.rmSync(d, { recursive: true, force: true });
  }
  console.log(`\n${passed} passed, ${failed} failed (${((Date.now() - t) / 1000).toFixed(1)}s)`);
  process.exit(failed ? 1 : 0);
}

main();
