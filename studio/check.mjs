// UGC Studio checks. No test framework: spawns the real server and asserts over HTTP.
//   npm run check
//
// 0. Units: markdown sanitizer against bypass payloads, login throttle, dark-mode tokens.
// 1. Real content, a 16+ character password (+ API token): auth, pages, API, traversal, headers.
// 2. No STUDIO_PASSWORD: fails closed (503), /healthz too.
// 3. Startup rules: dev mode binds 127.0.0.1, never switches on in a Railway deploy;
//    short passwords and tokens are refused.
// 4. Login throttle over HTTP: X-Forwarded-For is ignored; on Railway X-Real-IP is used.
// 5. A temporary fixture copy of the content with a project, media, malformed and
//    hostile cards, a circular-YAML card, odd file names, a symlinked outputs/
//    and decoy secrets: media, ranges, sanitising, isolation, traversal.
// 6. Media volume (MEDIA_DIR, tiny MEDIA_MAX_BYTES): upload API auth (Bearer only
//    for writes), bad names, size limit, aborted uploads, symlinks, gallery merge,
//    preview fallback, restart persistence, dev mode.

import { spawn } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { renderMarkdown, configureMarkdown } from './lib/markdown.mjs';
import { createThrottle } from './lib/throttle.mjs';

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
 * Raw request with a body. Never rejects: a refused upload may be answered (and
 * the connection closed) before the body is sent, so errors after a response are
 * ignored and errors before one resolve { status: 0 }.
 *   chunked: no Content-Length, body sent in 1000-byte chunks
 *   expectContinue: send "Expect: 100-continue" and the body only after "100 Continue"
 *   abortAfter: send this many bytes, then drop the connection
 */
function upload(port, rawPath, { method = 'PUT', headers = {}, body = Buffer.alloc(0), chunked = false, expectContinue = false, abortAfter = null } = {}) {
  return new Promise((resolve) => {
    const h = { ...headers };
    if (!chunked) h['Content-Length'] = String(body.length);
    if (expectContinue) h.Expect = '100-continue';
    const req = http.request({ host: '127.0.0.1', port, path: rawPath, method, headers: h, agent: false });
    let done = false;
    const finish = (v) => {
      if (done) return;
      done = true;
      setImmediate(() => req.destroy());
      resolve(v);
    };
    req.on('response', (res) => {
      const chunks = [];
      const out = () => finish({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') });
      res.on('data', (c) => chunks.push(c));
      res.on('end', out);
      res.on('error', out);
    });
    req.on('error', (e) => finish({ status: 0, error: e.message, body: '' }));
    req.setTimeout(30_000, () => req.destroy(new Error(`timeout: ${rawPath}`)));
    const sendBody = () => {
      if (abortAfter !== null) {
        req.write(body.subarray(0, abortAfter));
        setTimeout(() => {
          req.destroy();
          finish({ status: 0, aborted: true, body: '' });
        }, 200);
      } else if (chunked) {
        for (let i = 0; i < body.length; i += 1000) req.write(body.subarray(i, i + 1000));
        req.end();
      } else req.end(body);
    };
    if (expectContinue) {
      req.on('continue', sendBody);
      req.flushHeaders();
    } else sendBody();
  });
}

function childEnv(port, env, { host = '127.0.0.1' } = {}) {
  const e = { ...process.env, PORT: String(port) };
  for (const k of ['HOST', 'STUDIO_PASSWORD', 'STUDIO_API_TOKEN', 'STUDIO_DEV', 'STUDIO_CONTENT_ROOT', 'MEDIA_DIR', 'MEDIA_MAX_BYTES']) delete e[k];
  for (const k of Object.keys(e)) if (k.startsWith('RAILWAY_')) delete e[k];
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

    const pages = ['/', '/ideas', '/ideas?view=list', '/ideas?view=list&sort=title&dir=desc', '/ideas?venture=qsme-nz&sort=created', '/ventures', '/projects', '/research', '/log', '/learnings', '/playbook'];
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

    // No MEDIA_DIR: listing is empty, writes are refused (nothing is ever written).
    const someProject = JSON.parse((await request(port, '/api/projects', { headers: AUTH })).body)[0]?.folder;
    if (someProject) {
      const bearer = { Authorization: `Bearer ${TOKEN}` };
      r = await request(port, `/api/media/${someProject}`, { headers: bearer });
      check('MEDIA_DIR unset: GET /api/media/<project> -> []', r.status === 200 && JSON.parse(r.body).length === 0, `${r.status} ${r.body}`);
      r = await upload(port, `/api/media/${someProject}/check.png`, { headers: bearer, body: PNG });
      check('MEDIA_DIR unset: PUT -> 503', r.status === 503, `${r.status} ${r.body}`);
      r = await upload(port, `/api/media/${someProject}/check.png`, { method: 'DELETE', headers: bearer });
      check('MEDIA_DIR unset: DELETE -> 503', r.status === 503, `${r.status} ${r.body}`);
    } else check('MEDIA_DIR unset checks (no project in the real content, skipped)', true);

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
    '---\ntitle: Fixture post\nventure: qsme-nz\nidea: qsme-nz-facebook-group\nstatus: in production\nfigma: https://www.figma.com/file/abc/fixture\n---\n# Post\n\nCaption goes here.\n',
  );
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
    check('/api/projects includes fixture with media', !!fp && fp.media.length === 3 && fp.status === 'in production', JSON.stringify(fp?.media?.map((m) => m.path)));

    await traversalChecks(port, 'fixture', [
      `/media/${FIXTURE_PROJECT}/..%2f..%2f..%2f.env`,
      `/media/${FIXTURE_PROJECT}/%2e%2e/%2e%2e/%2e%2e/.env`,
      `/media/${FIXTURE_PROJECT}/../../../.env`,
      `/media/${FIXTURE_PROJECT}/outputs/../post.md`,
      '/media/..%2f.claude/settings.local.json',
      `/projects/${FIXTURE_PROJECT}/..%2f..%2f.env`,
    ]);
  } finally {
    stop(s);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(outside, { recursive: true, force: true });
  }
}

// ----------------------------------------------------------------- phase 6

/** Run tools/motion/sync-media.mjs. Resolves { code, out }. STUDIO_* come only from `env`. */
function runSync(args, env) {
  return new Promise((resolve) => {
    const e = { ...process.env };
    for (const k of Object.keys(e)) if (k.startsWith('STUDIO_')) delete e[k];
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

const MEDIA_PROJECT = '2026-10-03-qsme-nz-volume';
const LOCAL_PROJECT = '2026-10-03-qsme-nz-local';
const SYMDIR_PROJECT = '2026-10-03-qsme-nz-symdir';
const MAX_BYTES = 4096;

/** Every file under `dir` (relative paths), symlinks included, sorted. */
function walkFiles(dir, prefix = '') {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) out = out.concat(walkFiles(path.join(dir, e.name), rel));
    else out.push(rel);
  }
  return out.sort();
}

async function phaseMediaVolume() {
  console.log('\n6. Media volume (MEDIA_DIR): upload API, gallery, previews');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-studio-media-'));
  const dir = path.join(tmp, 'content');
  const outside = path.join(tmp, 'outside');
  const mediaDir = path.join(tmp, 'volume', 'data', 'media'); // does not exist yet: the server makes it
  const w = (rel, data) => {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), data);
  };
  w('learnings.md', '# Learnings\n');
  w(`projects/${MEDIA_PROJECT}/post.md`, '---\ntitle: Volume project\nventure: qsme-nz\n---\n# Post\n');
  w(`projects/${LOCAL_PROJECT}/post.md`, '---\ntitle: Local project\nventure: qsme-nz\n---\n# Post\n');
  w(`projects/${LOCAL_PROJECT}/outputs/local.png`, PNG);
  w(`projects/${LOCAL_PROJECT}/outputs/reel.mp4`, crypto.randomBytes(300)); // master
  w(`projects/${LOCAL_PROJECT}/outputs/reel.preview.mp4`, crypto.randomBytes(100));
  w(`projects/${SYMDIR_PROJECT}/post.md`, '# Post\n');
  w('projects/_template/post.md', '# Template\n');
  fs.mkdirSync(outside, { recursive: true });
  fs.writeFileSync(path.join(outside, 'secret.png'), 'FAKE_API_KEY=never\n');
  const contentBefore = walkFiles(dir);

  const env = { STUDIO_PASSWORD: PASSWORD, STUDIO_API_TOKEN: TOKEN, STUDIO_CONTENT_ROOT: dir, MEDIA_DIR: mediaDir, MEDIA_MAX_BYTES: String(MAX_BYTES) };
  const BEARER = { Authorization: `Bearer ${TOKEN}` };
  const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
  const tmpLeft = () => (fs.existsSync(path.join(mediaDir, '.tmp')) ? fs.readdirSync(path.join(mediaDir, '.tmp')) : []);
  const stored = (name, project = MEDIA_PROJECT) => fs.existsSync(path.join(mediaDir, project, name));
  let s;
  try {
    s = await startServer('media', env);
    const { port } = s;
    const api = (name, project = MEDIA_PROJECT) => `/api/media/${project}/${name}`;
    const list = async (project = MEDIA_PROJECT, headers = BEARER) => {
      const r = await request(port, `/api/media/${project}`, { headers });
      try {
        return { status: r.status, files: JSON.parse(r.body), headers: r.headers };
      } catch {
        return { status: r.status, files: null, headers: r.headers };
      }
    };

    check('MEDIA_DIR is created on startup (mkdir -p)', fs.existsSync(mediaDir) && fs.statSync(mediaDir).isDirectory());
    check('startup log names the media folder', s.log().includes(`media: ${mediaDir}`), s.log());

    // Upload with the token.
    const clip = crypto.randomBytes(1500);
    let r = await upload(port, api('clip.png'), { headers: BEARER, body: clip });
    let out = {};
    try {
      out = JSON.parse(r.body);
    } catch {}
    check('PUT with Bearer -> 200 {name, size, sha256}', r.status === 200 && out.name === 'clip.png' && out.size === 1500 && out.sha256 === sha(clip), `${r.status} ${r.body}`);
    check('PUT stored the file under MEDIA_DIR/<project>/', stored('clip.png') && sha(fs.readFileSync(path.join(mediaDir, MEDIA_PROJECT, 'clip.png'))) === sha(clip));
    const side = path.join(mediaDir, MEDIA_PROJECT, '.clip.png.sha256');
    check('PUT wrote the sha256 sidecar', fs.existsSync(side) && fs.readFileSync(side, 'utf8').startsWith(`${sha(clip)}  clip.png`), fs.existsSync(side) ? fs.readFileSync(side, 'utf8') : 'missing');
    check('PUT leaves no temp file', tmpLeft().length === 0, tmpLeft().join(','));

    let l = await list();
    const item = l.files?.find((f) => f.name === 'clip.png');
    check('GET /api/media/<project> (Bearer) lists it with size, sha256, mtime', l.status === 200 && item && item.size === 1500 && item.sha256 === sha(clip) && !isNaN(Date.parse(item.mtime)), JSON.stringify(l.files));
    check('list does not show the sidecar or .tmp', l.files?.every((f) => !f.name.startsWith('.')), JSON.stringify(l.files));
    check('list says the upload limit (X-Media-Max-Bytes)', l.headers['x-media-max-bytes'] === String(MAX_BYTES), l.headers['x-media-max-bytes']);
    l = await list(MEDIA_PROJECT, AUTH);
    check('GET /api/media/<project> works with Basic too', l.status === 200 && l.files?.some((f) => f.name === 'clip.png'), String(l.status));
    l = await list(MEDIA_PROJECT, {});
    check('GET /api/media/<project> needs auth', l.status === 401, String(l.status));
    l = await list('2026-01-01-nope');
    check('GET /api/media/<unknown project> -> 404', l.status === 404, String(l.status));

    r = await request(port, `/media/${MEDIA_PROJECT}/clip.png`, { headers: AUTH });
    check('uploaded file is served at /media/<project>/<file>', r.status === 200 && r.headers['content-type'] === 'image/png' && sha(r.raw) === sha(clip), `${r.status} ${r.headers['content-type']}`);
    r = await request(port, `/media/${MEDIA_PROJECT}/clip.png`, { headers: BEARER });
    check('/media still refuses the Bearer token (Basic only)', r.status === 401, String(r.status));
    r = await request(port, `/projects/${MEDIA_PROJECT}`, { headers: AUTH });
    check('uploaded file shows in the project gallery', r.status === 200 && r.body.includes(`/media/${MEDIA_PROJECT}/clip.png`) && noJunk(r.body), String(r.status));

    // Replacing a file updates it and its sidecar.
    const clip2 = crypto.randomBytes(900);
    r = await upload(port, api('clip.png'), { headers: BEARER, body: clip2, chunked: true });
    l = await list();
    check('PUT (chunked) replaces the file and its sha256', r.status === 200 && l.files?.find((f) => f.name === 'clip.png')?.sha256 === sha(clip2), `${r.status} ${r.body}`);

    // Expect: 100-continue is answered once the upload is allowed.
    r = await upload(port, api('continue.png'), { headers: BEARER, body: PNG, expectContinue: true });
    check('PUT with Expect: 100-continue -> 200', r.status === 200 && stored('continue.png'), `${r.status} ${r.body}`);
    r = await upload(port, api('continue2.png'), { headers: AUTH, body: PNG, expectContinue: true });
    check('Expect: 100-continue with Basic -> 403, body never asked for', r.status === 403 && !stored('continue2.png'), `${r.status} ${r.body}`);

    // Who may write.
    r = await upload(port, api('basic.png'), { headers: AUTH, body: PNG });
    check('PUT with Basic only -> 403 (the password cannot write)', r.status === 403 && !stored('basic.png'), `${r.status} ${r.body}`);
    r = await upload(port, api('wrong.png'), { headers: { Authorization: 'Bearer wrong-token-0123456789' }, body: PNG });
    check('PUT with a wrong token -> 401', r.status === 401 && !stored('wrong.png'), String(r.status));
    r = await upload(port, api('anon.png'), { body: PNG });
    check('PUT without auth -> 401', r.status === 401 && !stored('anon.png'), String(r.status));
    r = await upload(port, api('x.png', '2026-01-01-nope'), { headers: BEARER, body: PNG });
    check('PUT to an unknown project -> 404 (no folder made)', r.status === 404 && !fs.existsSync(path.join(mediaDir, '2026-01-01-nope')), String(r.status));
    r = await upload(port, api('x.png', '_template'), { headers: BEARER, body: PNG });
    check('PUT to _template -> 400/404', [400, 404].includes(r.status) && !fs.existsSync(path.join(mediaDir, '_template')), String(r.status));
    r = await upload(port, `/api/media/${MEDIA_PROJECT}/x.png`, { method: 'POST', headers: BEARER, body: PNG });
    check('POST /api/media/... -> 405', r.status === 405, String(r.status));
    r = await upload(port, '/ideas', { headers: BEARER, body: PNG });
    check('PUT outside /api/media -> 405', r.status === 405, String(r.status));

    // Bad names: nothing is written anywhere.
    const badPaths = [
      api('../x.mp4'),
      api('.env'),
      api('.x.png'),
      api('a/b.mp4'),
      api('x.exe'),
      api('x'),
      api('x.mp4.sha256'),
      api('%2e%2e%2fx.mp4'),
      api('a%2fb.mp4'),
      api('a%5cb.mp4'),
      api('x.png%00.mp4'),
      api('-x.png'),
      api('x%20y.png'),
      api('caf%C3%A9.png'),
      api('..png'),
      `/api/media/..%2f${MEDIA_PROJECT}/x.png`,
      `/api/media/%2e%2e/x.png`,
      `/api/media/${MEDIA_PROJECT}%2f..%2f..%2f..%2foutside/x.png`,
    ];
    for (const p of badPaths) {
      r = await upload(port, p, { headers: BEARER, body: PNG });
      check(`PUT ${p} -> 400/404`, [400, 404].includes(r.status), `${r.status} ${r.body}`);
    }
    r = await upload(port, `/api/media/${MEDIA_PROJECT}/`, { headers: BEARER, body: PNG });
    check('PUT to the project itself (no file name) -> 405', r.status === 405, `${r.status} ${r.body}`);
    const contentAfter = walkFiles(dir);
    check('bad names: the content folder is untouched', JSON.stringify(contentAfter) === JSON.stringify(contentBefore), contentAfter.filter((f) => !contentBefore.includes(f)).join(', '));
    check('bad names: nothing written outside MEDIA_DIR', JSON.stringify(walkFiles(outside)) === JSON.stringify(['secret.png']), walkFiles(outside).join(','));
    const vol = walkFiles(mediaDir);
    check('bad names: MEDIA_DIR holds only the expected files', vol.every((f) => /^2026-10-03-qsme-nz-volume\/\.?(clip|continue)\.png(\.sha256)?$/.test(f)), vol.join(', '));

    // Size limit: 413, no temp file, nothing stored.
    const big = crypto.randomBytes(MAX_BYTES + 1000);
    r = await upload(port, api('big.png'), { headers: BEARER, body: big });
    check('oversize (Content-Length) -> 413', r.status === 413, `${r.status} ${r.error || r.body}`);
    check('oversize (Content-Length): nothing stored, no temp left', !stored('big.png') && tmpLeft().length === 0, tmpLeft().join(','));
    r = await upload(port, api('big.png'), { headers: BEARER, body: big, chunked: true });
    check('oversize (chunked, counted while streaming) -> 413', r.status === 413, `${r.status} ${r.error || r.body}`);
    check('oversize (chunked): nothing stored, no temp left', !stored('big.png') && tmpLeft().length === 0, tmpLeft().join(','));
    r = await upload(port, api('edge.png'), { headers: BEARER, body: crypto.randomBytes(MAX_BYTES) });
    check('exactly MEDIA_MAX_BYTES is allowed', r.status === 200 && stored('edge.png'), `${r.status} ${r.body}`);

    // An upload that is cut off leaves nothing behind.
    r = await upload(port, api('cut.png'), { headers: BEARER, body: crypto.randomBytes(3000), abortAfter: 1000 });
    for (let k = 0; k < 20 && tmpLeft().length; k++) await sleep(100);
    check('aborted upload: no temp file, nothing stored', r.aborted && tmpLeft().length === 0 && !stored('cut.png'), tmpLeft().join(','));

    // A body that does not match its declared sha256 is refused.
    r = await upload(port, api('corrupt.png'), { headers: { ...BEARER, 'X-Content-SHA256': sha(Buffer.from('something else')) }, body: PNG });
    check('X-Content-SHA256 mismatch -> 400, nothing stored', r.status === 400 && !stored('corrupt.png') && tmpLeft().length === 0, `${r.status} ${r.body}`);
    r = await upload(port, api('verified.png'), { headers: { ...BEARER, 'X-Content-SHA256': sha(PNG) }, body: PNG });
    check('X-Content-SHA256 match -> 200', r.status === 200 && stored('verified.png'), `${r.status} ${r.body}`);

    // Symlinks inside MEDIA_DIR are never followed.
    fs.symlinkSync(path.join(outside, 'secret.png'), path.join(mediaDir, MEDIA_PROJECT, 'link.png'));
    r = await request(port, `/media/${MEDIA_PROJECT}/link.png`, { headers: AUTH });
    check('symlinked file in MEDIA_DIR is not served', r.status === 404 && !r.body.includes('FAKE_API_KEY'), String(r.status));
    l = await list();
    check('symlinked file in MEDIA_DIR is not listed', l.files?.every((f) => f.name !== 'link.png'), JSON.stringify(l.files));
    r = await upload(port, api('link.png'), { headers: BEARER, body: PNG });
    check('PUT over a symlink -> 400, its target untouched', r.status === 400 && fs.readFileSync(path.join(outside, 'secret.png'), 'utf8').startsWith('FAKE_API_KEY'), `${r.status} ${r.body}`);
    fs.symlinkSync(outside, path.join(mediaDir, SYMDIR_PROJECT));
    l = await list(SYMDIR_PROJECT);
    check('symlinked project folder in MEDIA_DIR lists nothing', l.status === 200 && l.files?.length === 0, JSON.stringify(l.files));
    r = await request(port, `/media/${SYMDIR_PROJECT}/secret.png`, { headers: AUTH });
    check('symlinked project folder in MEDIA_DIR is not served', r.status === 404, String(r.status));
    r = await upload(port, api('new.png', SYMDIR_PROJECT), { headers: BEARER, body: PNG });
    check('PUT into a symlinked project folder -> 400, nothing written outside', r.status === 400 && !fs.existsSync(path.join(outside, 'new.png')), `${r.status} ${r.body}`);
    r = await request(port, `/projects/${SYMDIR_PROJECT}`, { headers: AUTH });
    check('symlinked project folder: gallery shows nothing from outside', r.status === 200 && !r.body.includes('secret.png'), String(r.status));

    // Preview fallback: only <name>.preview.mp4 on the volume -> it plays, labelled "preview".
    const prev = crypto.randomBytes(2000);
    r = await upload(port, api('reel-9x16.preview.mp4'), { headers: BEARER, body: prev });
    check('PUT a .preview.mp4 -> 200', r.status === 200, `${r.status} ${r.body}`);
    r = await request(port, `/projects/${MEDIA_PROJECT}`, { headers: AUTH });
    check(
      'gallery plays the preview when the master is missing',
      r.status === 200 && r.body.includes(`<video controls playsinline preload="metadata" src="/media/${MEDIA_PROJECT}/reel-9x16.preview.mp4">`),
      String(r.status),
    );
    check('the preview is labelled "preview" and named after the master', /reel-9x16\.mp4<\/a> <span class="media-tag"[^>]*>preview<\/span>/.test(r.body));
    r = await request(port, `/media/${MEDIA_PROJECT}/reel-9x16.preview.mp4`, { headers: { ...AUTH, Range: 'bytes=0-9' } });
    check('preview from the volume supports Range (206)', r.status === 206 && r.headers['content-range'] === 'bytes 0-9/2000' && r.headers['content-type'] === 'video/mp4', `${r.status} ${r.headers['content-range']}`);
    r = await request(port, `/media/${MEDIA_PROJECT}/reel-9x16.preview.mp4`, { headers: { ...AUTH, Range: 'bytes=5000-' } });
    check('preview from the volume: unsatisfiable Range 416', r.status === 416, String(r.status));
    r = await request(port, '/api/projects', { headers: AUTH });
    const vp = JSON.parse(r.body).find((p) => p.folder === MEDIA_PROJECT);
    check('/api/projects marks the volume preview', vp?.media.some((m) => m.path === 'reel-9x16.preview.mp4' && m.preview === true), JSON.stringify(vp?.media));

    // Locally the master wins; local and volume files are merged by name, local first.
    const localPng = fs.readFileSync(path.join(dir, 'projects', LOCAL_PROJECT, 'outputs', 'local.png'));
    r = await upload(port, api('local.png', LOCAL_PROJECT), { headers: BEARER, body: crypto.randomBytes(500) });
    r = await upload(port, api('remote.png', LOCAL_PROJECT), { headers: BEARER, body: PNG });
    r = await upload(port, api('reel.preview.mp4', LOCAL_PROJECT), { headers: BEARER, body: crypto.randomBytes(100) });
    r = await request(port, `/projects/${LOCAL_PROJECT}`, { headers: AUTH });
    const body = r.body;
    const count = (needle) => body.split(needle).length - 1;
    check('local master shown, its preview hidden', body.includes(`src="/media/${LOCAL_PROJECT}/reel.mp4"`) && !body.includes('reel.preview.mp4') && !body.includes('class="media-tag"'), String(r.status));
    check('gallery = local + volume, deduped by name', count(`<img src="/media/${LOCAL_PROJECT}/local.png"`) === 1 && count(`<img src="/media/${LOCAL_PROJECT}/remote.png"`) === 1);
    r = await request(port, `/media/${LOCAL_PROJECT}/local.png`, { headers: AUTH });
    check('/media prefers the local file over the volume copy', r.status === 200 && sha(r.raw) === sha(localPng), String(r.status));
    r = await request(port, `/media/${LOCAL_PROJECT}/remote.png`, { headers: AUTH });
    check('/media falls back to the volume', r.status === 200 && sha(r.raw) === sha(PNG), String(r.status));

    // Delete: Bearer only.
    r = await upload(port, api('verified.png'), { method: 'DELETE', headers: AUTH });
    check('DELETE with Basic only -> 403', r.status === 403 && stored('verified.png'), String(r.status));
    r = await upload(port, api('verified.png'), { method: 'DELETE' });
    check('DELETE without auth -> 401', r.status === 401 && stored('verified.png'), String(r.status));
    r = await upload(port, api('verified.png'), { method: 'DELETE', headers: BEARER });
    check('DELETE with Bearer -> 200, file and sidecar gone', r.status === 200 && !stored('verified.png') && !stored('.verified.png.sha256'), `${r.status} ${r.body}`);
    r = await request(port, `/media/${MEDIA_PROJECT}/verified.png`, { headers: AUTH });
    check('deleted file is no longer served', r.status === 404, String(r.status));
    r = await upload(port, api('verified.png'), { method: 'DELETE', headers: BEARER });
    check('DELETE of a missing file -> 404', r.status === 404, String(r.status));
    r = await upload(port, api('../clip.png'), { method: 'DELETE', headers: BEARER });
    check('DELETE with a bad name -> 400', r.status === 400 && stored('clip.png'), String(r.status));

    const log = s.log();
    check('media server log has no errors', !/failed:|Error/.test(log), log.split('\n').find((x) => /failed:|Error/.test(x)));
  } finally {
    stop(s);
  }

  try {
    // The volume outlives deploys: a restart still serves what was uploaded, and
    // clears uploads a crash left in .tmp.
    await sleep(300);
    const stale = path.join(mediaDir, '.tmp', 'stale-upload');
    fs.writeFileSync(stale, 'half an upload');
    const old = new Date(Date.now() - 60 * 60 * 1000);
    fs.utimesSync(stale, old, old);
    s = await startServer('media-restart', env);
    const r = await request(s.port, `/api/media/${MEDIA_PROJECT}`, { headers: AUTH });
    check('after a restart the volume files are still listed', r.status === 200 && JSON.parse(r.body).some((f) => f.name === 'reel-9x16.preview.mp4'), r.body);
    check('startup clears stale temp uploads', !fs.existsSync(stale));

    // tools/motion/sync-media.mjs against this server.
    const url = `http://127.0.0.1:${s.port}`;
    const env2 = { STUDIO_URL: url, STUDIO_API_TOKEN: TOKEN };
    const listOf = async (project) => JSON.parse((await request(s.port, `/api/media/${project}`, { headers: AUTH })).body);
    const localPreview = fs.readFileSync(path.join(dir, 'projects', LOCAL_PROJECT, 'outputs', 'reel.preview.mp4'));
    const localPng = fs.readFileSync(path.join(dir, 'projects', LOCAL_PROJECT, 'outputs', 'local.png'));
    let x = await runSync(['--root', dir, '--wait', '0'], env2);
    let files = await listOf(LOCAL_PROJECT);
    const byName = (n) => files.find((f) => f.name === n);
    check('sync-media: exits 0 and prints a summary', x.code === 0 && /sync-media: \d+ projects, 2 uploaded/.test(x.out), x.out);
    check('sync-media: changed file re-uploaded (local.png now matches)', byName('local.png')?.sha256 === sha(localPng), JSON.stringify(files));
    check('sync-media: .preview.mp4 uploaded', byName('reel.preview.mp4')?.sha256 === sha(localPreview), JSON.stringify(files));
    check('sync-media: master .mp4 never uploaded', !byName('reel.mp4'), JSON.stringify(files));
    check('sync-media: remote-only files kept without --prune', !!byName('remote.png') && /only on the Studio/.test(x.out), x.out);
    check('sync-media: never prints the token', !x.out.includes(TOKEN));
    x = await runSync(['--root', dir, '--wait', '0'], env2);
    check('sync-media: second run uploads nothing', x.code === 0 && / 0 uploaded/.test(x.out) && /[1-9]\d* unchanged/.test(x.out), x.out);
    x = await runSync(['--root', dir, '--wait', '0', '--prune', '--dry-run'], env2);
    check('sync-media: --prune --dry-run deletes nothing', x.code === 0 && /would delete {2}2026-10-03-qsme-nz-local\/remote\.png/.test(x.out) && !!(await listOf(LOCAL_PROJECT)).find((f) => f.name === 'remote.png'), x.out);
    x = await runSync(['--root', dir, '--wait', '0', '--prune'], env2);
    files = await listOf(LOCAL_PROJECT);
    check('sync-media: --prune deletes files gone locally', x.code === 0 && !byName('remote.png') && !!byName('local.png'), x.out);

    // Token and URL from .env; a project the deploy doesn't have yet is waited for, then reported.
    const syncRoot = path.join(tmp, 'sync-root');
    fs.mkdirSync(path.join(syncRoot, 'projects', '2026-10-04-not-deployed', 'outputs'), { recursive: true });
    fs.writeFileSync(path.join(syncRoot, 'projects', '2026-10-04-not-deployed', 'outputs', 'a.png'), PNG);
    fs.writeFileSync(path.join(syncRoot, '.env'), `# comment\nOTHER_KEY=x\nSTUDIO_API_TOKEN="${TOKEN}"\nSTUDIO_URL=${url}\n`);
    const t0 = Date.now();
    x = await runSync(['--root', syncRoot, '--wait', '2'], {});
    check('sync-media: reads the token from .env, retries a 404 for --wait, then fails', x.code === 1 && /retrying/.test(x.out) && /didn't list it in time/.test(x.out) && Date.now() - t0 >= 2000, x.out);
    check('sync-media: never prints the token from .env', !x.out.includes(TOKEN));
    fs.writeFileSync(path.join(syncRoot, '.env'), `STUDIO_API_TOKEN=wrong-token-0123456789\nSTUDIO_URL=${url}\n`);
    x = await runSync(['--root', syncRoot, '--wait', '0'], {});
    check('sync-media: a wrong token stops with a clear message', x.code === 1 && /rejected STUDIO_API_TOKEN/.test(x.out) && !x.out.includes('wrong-token'), x.out);
    x = await runSync(['--root', syncRoot], { STUDIO_URL: 'http://example.com', STUDIO_API_TOKEN: TOKEN });
    check('sync-media: refuses to send the token over plain http to a remote host', x.code === 1 && /must be https/.test(x.out), x.out);
  } finally {
    stop(s);
  }

  try {
    // Dev mode (no password) still needs the token to write.
    s = await startServer('media-dev', { STUDIO_DEV: '1', STUDIO_API_TOKEN: TOKEN, STUDIO_CONTENT_ROOT: dir, MEDIA_DIR: mediaDir, MEDIA_MAX_BYTES: String(MAX_BYTES) }, { host: null });
    let r = await upload(s.port, `/api/media/${MEDIA_PROJECT}/dev.png`, { body: PNG });
    check('dev mode: PUT without the token -> 401', r.status === 401 && !stored('dev.png'), String(r.status));
    r = await upload(s.port, `/api/media/${MEDIA_PROJECT}/dev.png`, { headers: { Authorization: `Basic ${Buffer.from('a:').toString('base64')}` }, body: PNG });
    check('dev mode: PUT with Basic -> 401/403', [401, 403].includes(r.status) && !stored('dev.png'), String(r.status));
    r = await upload(s.port, `/api/media/${MEDIA_PROJECT}/dev.png`, { headers: { Authorization: `Bearer ${TOKEN}` }, body: PNG });
    check('dev mode: PUT with the token -> 200', r.status === 200 && stored('dev.png'), String(r.status));
  } finally {
    stop(s);
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
    await phaseMediaVolume();
  } catch (e) {
    failed++;
    console.error(`\n  FAIL  ${e.stack || e}`);
  } finally {
    for (const c of children) c.kill('SIGKILL');
  }
  console.log(`\n${passed} passed, ${failed} failed (${((Date.now() - t) / 1000).toFixed(1)}s)`);
  process.exit(failed ? 1 : 0);
}

main();
