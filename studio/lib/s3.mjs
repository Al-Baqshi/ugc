// A small, dependency-free S3 client (AWS Signature Version 4, node:crypto).
// Enough for a Railway storage bucket (Tigris, S3-compatible): presigned GETs,
// ListObjectsV2, PUT (streamed, UNSIGNED-PAYLOAD + Content-Length), HEAD, DELETE.
//
// Virtual-hosted URLs: https://<bucket>.<endpoint host>/<key>. Keys are
// URI-encoded per segment (RFC 3986: only A-Z a-z 0-9 - _ . ~ stay as they are),
// so spaces, unicode and reserved characters all sign and travel correctly.
//
// Credentials never appear in errors, logs or return values (only the access
// key id, inside X-Amz-Credential of a presigned URL, as SigV4 requires).

import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import { pipeline } from 'node:stream';

export const EMPTY_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
export const UNSIGNED_PAYLOAD = 'UNSIGNED-PAYLOAD';
/** S3 refuses a single PUT over 5 GiB. */
export const MAX_PUT_BYTES = 5 * 1024 * 1024 * 1024;

const ALGORITHM = 'AWS4-HMAC-SHA256';
const LOOPBACK = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);

export class S3Error extends Error {
  constructor(message, { status = 0, code = '' } = {}) {
    super(message);
    this.name = 'S3Error';
    this.status = status;
    this.code = code;
  }
}

// ----------------------------------------------------------------- encoding

/** RFC 3986 percent-encoding of one component (UTF-8; "/" is encoded too). */
export function uriEncode(s) {
  let out;
  try {
    out = encodeURIComponent(String(s));
  } catch {
    throw new S3Error('key is not valid UTF-8 (lone surrogate)');
  }
  return out.replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

/** An object key as a URL path: each segment encoded, "/" kept. */
export function encodeKey(key) {
  return String(key).split('/').map(uriEncode).join('/');
}

/** [[k, v], ...] -> canonical query string (encoded, sorted by key then value). */
export function canonicalQuery(pairs) {
  return pairs
    .map(([k, v]) => [uriEncode(k), uriEncode(v ?? '')])
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
}

const hmac = (key, data) => crypto.createHmac('sha256', key).update(data, 'utf8').digest();
export const sha256Hex = (data) => crypto.createHash('sha256').update(data).digest('hex');

/** 2013-05-24T00:00:00Z -> { amzDate: '20130524T000000Z', ymd: '20130524' } */
export function amzDates(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) throw new S3Error('bad signing date');
  const amzDate = d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return { amzDate, ymd: amzDate.slice(0, 8) };
}

/**
 * The SigV4 core, pure: no clock, no network. Exported so the checks can run
 * AWS's published test vectors through it (and a fake S3 can verify requests).
 *   path     canonical URI, already encoded ("/" or "/test%24file.text")
 *   query    [[k, v], ...] unencoded
 *   headers  { name: value } to sign (host and x-amz-date included by the caller)
 */
export function sigv4({ method, path, query = [], headers, payloadHash, amzDate, region, service = 's3', accessKeyId, secretAccessKey }) {
  const ymd = amzDate.slice(0, 8);
  const canon = Object.entries(headers)
    .map(([k, v]) => [k.toLowerCase().trim(), String(v).trim().replace(/\s+/g, ' ')])
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const signedHeaders = canon.map(([k]) => k).join(';');
  const canonicalRequest = [
    method.toUpperCase(),
    path || '/',
    canonicalQuery(query),
    canon.map(([k, v]) => `${k}:${v}\n`).join(''),
    signedHeaders,
    payloadHash,
  ].join('\n');
  const scope = `${ymd}/${region}/${service}/aws4_request`;
  const stringToSign = [ALGORITHM, amzDate, scope, sha256Hex(canonicalRequest)].join('\n');
  const kDate = hmac(`AWS4${secretAccessKey}`, ymd);
  const kSigning = hmac(hmac(hmac(kDate, region), service), 'aws4_request');
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');
  return {
    canonicalRequest,
    stringToSign,
    signature,
    signedHeaders,
    scope,
    authorization: `${ALGORITHM} Credential=${accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
}

/**
 * `attachment` Content-Disposition for a file name: a plain quoted name when it
 * is safe ASCII, plus RFC 5987 filename* for anything else.
 */
export function attachmentDisposition(filename) {
  const name = String(filename ?? '').replace(/[\u0000-\u001f\u007f]/g, '');
  const ascii = name.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
  if (!name) return 'attachment';
  if (ascii === name) return `attachment; filename="${ascii}"`;
  return `attachment; filename="${ascii}"; filename*=UTF-8''${uriEncode(name)}`;
}

// ------------------------------------------------------------------- config

const ENV_KEYS = ['BUCKET_NAME', 'BUCKET_ENDPOINT', 'BUCKET_ACCESS_KEY_ID', 'BUCKET_SECRET_ACCESS_KEY'];

/**
 * Bucket settings from an environment object (process.env, or parsed
 * `railway variables --kv`). Returns null when none are set; throws S3Error
 * naming the missing variables when only some are. BUCKET_REGION defaults to "auto".
 */
export function bucketConfigFromEnv(env) {
  const get = (k) => String(env?.[k] ?? '').trim();
  const present = ENV_KEYS.filter((k) => get(k));
  if (!present.length) return null;
  const missing = ENV_KEYS.filter((k) => !get(k));
  if (missing.length) throw new S3Error(`bucket settings incomplete: ${missing.join(', ')} not set`);
  return {
    bucket: get('BUCKET_NAME'),
    endpoint: get('BUCKET_ENDPOINT'),
    region: get('BUCKET_REGION') || 'auto',
    accessKeyId: get('BUCKET_ACCESS_KEY_ID'),
    secretAccessKey: get('BUCKET_SECRET_ACCESS_KEY'),
  };
}

// ------------------------------------------------------------------ XML

function xmlDecode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function xmlTag(xml, tag) {
  const m = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(xml);
  return m ? xmlDecode(m[1]) : '';
}

const stripQuotes = (s) => String(s ?? '').trim().replace(/^"(.*)"$/, '$1');

// ------------------------------------------------------------------ client

/**
 * @param {{ bucket: string, endpoint: string, region?: string, accessKeyId: string,
 *           secretAccessKey: string, timeoutMs?: number }} cfg
 */
export function createS3({ bucket, endpoint, region = 'auto', accessKeyId, secretAccessKey, timeoutMs = 60_000 }) {
  if (!/^[A-Za-z0-9][A-Za-z0-9.-]{0,254}$/.test(String(bucket || ''))) throw new S3Error('BUCKET_NAME is not a valid bucket name');
  if (!accessKeyId || !secretAccessKey) throw new S3Error('bucket credentials are missing');
  let ep;
  try {
    ep = new URL(String(endpoint || ''));
  } catch {
    throw new S3Error('BUCKET_ENDPOINT is not a URL');
  }
  const loopback = LOOPBACK.has(ep.hostname) || ep.hostname.endsWith('.localhost');
  if (ep.protocol !== 'https:' && !(ep.protocol === 'http:' && loopback)) throw new S3Error('BUCKET_ENDPOINT must be https');
  if (ep.username || ep.password) throw new S3Error('BUCKET_ENDPOINT must not carry credentials');
  const vhostName = `${bucket}.${ep.hostname}`;
  const host = ep.port ? `${vhostName}:${ep.port}` : vhostName; // the Host header (and what is signed)
  const origin = `${ep.protocol}//${host}`;
  try {
    if (new URL(origin).host !== host) throw new Error();
  } catch {
    // e.g. an IP address: <bucket>.127.0.0.1 is not a host name.
    throw new S3Error('BUCKET_ENDPOINT must be a host name (the bucket is addressed as <bucket>.<endpoint host>)');
  }
  const transport = ep.protocol === 'https:' ? https : http;
  const agent = new transport.Agent({ keepAlive: true, maxSockets: 8 });
  // A plain-http loopback endpoint (a local fake or MinIO in tests) is dialled
  // directly, with the virtual host only in the Host header.
  const dialHost = ep.protocol === 'http:' ? ep.hostname.replace(/^\[|\]$/g, '') : vhostName;
  const port = ep.port || (ep.protocol === 'https:' ? 443 : 80);
  const creds = { region, accessKeyId, secretAccessKey };

  /** Sign a header-authenticated request. Returns the headers to send (Host included). */
  function sign(method, key, { query = [], headers = {}, payloadHash = EMPTY_SHA256, date = new Date() } = {}) {
    const { amzDate } = amzDates(date);
    const toSign = { ...headers, host, 'x-amz-date': amzDate, 'x-amz-content-sha256': payloadHash };
    const path = `/${key ? encodeKey(key) : ''}`;
    const s = sigv4({ method, path, query, headers: toSign, payloadHash, amzDate, ...creds });
    return { headers: { ...toSign, authorization: s.authorization }, path, ...s };
  }

  /**
   * A presigned GET URL for `key`, valid `expires` seconds from `date`.
   * `download`: a file name (or true for the key's last segment) to get
   * response-content-disposition=attachment, so the browser saves it.
   */
  function presignGet(key, { expires = 3600, download = null, date = new Date() } = {}) {
    const exp = Math.floor(Number(expires));
    if (!(exp >= 1 && exp <= 604800)) throw new S3Error('expires must be 1..604800 seconds');
    const { amzDate, ymd } = amzDates(date);
    const query = [
      ['X-Amz-Algorithm', ALGORITHM],
      ['X-Amz-Credential', `${accessKeyId}/${ymd}/${region}/s3/aws4_request`],
      ['X-Amz-Date', amzDate],
      ['X-Amz-Expires', String(exp)],
      ['X-Amz-SignedHeaders', 'host'],
    ];
    if (download) {
      const name = download === true ? String(key).split('/').pop() : String(download);
      query.push(['response-content-disposition', attachmentDisposition(name)]);
    }
    const path = `/${encodeKey(key)}`;
    const s = sigv4({ method: 'GET', path, query, headers: { host }, payloadHash: UNSIGNED_PAYLOAD, amzDate, ...creds });
    return `${origin}${path}?${canonicalQuery(query)}&X-Amz-Signature=${s.signature}`;
  }

  /**
   * Send a signed request. `body`: Buffer, a readable stream (with
   * contentLength), or nothing. Resolves { status, headers, body: Buffer }.
   */
  function send(method, key, { query = [], headers = {}, body = null, contentLength = null, payloadHash, maxBody = 16 * 1024 * 1024 } = {}) {
    const isBuf = Buffer.isBuffer(body);
    const hash = payloadHash || (body ? UNSIGNED_PAYLOAD : EMPTY_SHA256);
    const signed = sign(method, key, { query, headers, payloadHash: hash });
    const out = { ...signed.headers };
    const qs = canonicalQuery(query);
    if (body !== null || method === 'PUT') out['content-length'] = String(isBuf ? body.length : contentLength ?? 0);
    return new Promise((resolve, reject) => {
      const req = transport.request(
        { host: dialHost, port, method, path: signed.path + (qs ? `?${qs}` : ''), headers: out, agent, servername: ep.protocol === 'https:' ? vhostName : undefined },
        (res) => {
          const chunks = [];
          let size = 0;
          res.on('data', (c) => {
            size += c.length;
            if (size > maxBody) return res.destroy(new S3Error(`${method} answer too large`));
            chunks.push(c);
          });
          res.on('end', () => {
            // The bucket has answered (an early 403, say, before the body was
            // sent): stop reading the upload, so its file is closed now.
            if (!isBuf && body && typeof body.destroy === 'function') body.destroy();
            resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) });
          });
          res.on('error', reject);
        },
      );
      req.setTimeout(timeoutMs, () => req.destroy(new S3Error(`${method} timed out after ${Math.round(timeoutMs / 1000)}s without data`)));
      req.on('error', (e) => reject(e instanceof S3Error ? e : new S3Error(`${method} failed: ${e.code || e.message}`, { code: e.code || '' })));
      if (body === null || isBuf) return req.end(body ?? undefined);
      // pipeline (not pipe) so a failed request also destroys the upload stream:
      // a bare pipe() only unpipes it, leaving its file descriptor open.
      body.once('error', (e) => req.destroy(new S3Error(`reading the upload failed: ${e.code || e.message}`)));
      pipeline(body, req, (e) => {
        if (e && !req.destroyed) req.destroy(e instanceof S3Error ? e : new S3Error(`reading the upload failed: ${e.code || e.message}`));
      });
    });
  }

  function fail(what, r) {
    const text = r.body.toString('utf8');
    const code = xmlTag(text, 'Code');
    const msg = xmlTag(text, 'Message');
    return new S3Error(`${what}: HTTP ${r.status}${code ? ` ${code}` : ''}${msg ? ` (${msg.slice(0, 200)})` : ''}`, { status: r.status, code });
  }

  /** Every object under `prefix`: [{ key, size, etag, lastModified }] (ListObjectsV2, all pages). */
  async function listObjects(prefix = '') {
    const out = [];
    let token = '';
    for (let page = 0; page < 10_000; page++) {
      const query = [['list-type', '2'], ['prefix', prefix], ['max-keys', '1000']];
      if (token) query.push(['continuation-token', token]);
      const r = await send('GET', '', { query });
      if (r.status !== 200) throw fail('list', r);
      const xml = r.body.toString('utf8');
      for (const m of xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)) {
        const c = m[1];
        const key = xmlTag(c, 'Key');
        if (!key) continue;
        out.push({ key, size: Number(xmlTag(c, 'Size')) || 0, etag: stripQuotes(xmlTag(c, 'ETag')), lastModified: xmlTag(c, 'LastModified') || null });
      }
      const truncated = xmlTag(xml, 'IsTruncated') === 'true';
      const next = xmlTag(xml, 'NextContinuationToken');
      if (!truncated || !next || next === token) return out;
      token = next;
    }
    throw new S3Error('list: too many pages');
  }

  /** { size, etag, contentType, lastModified, meta } or null when the object is missing. */
  async function headObject(key) {
    const r = await send('HEAD', key);
    if (r.status === 404) return null;
    if (r.status !== 200) throw fail(`head ${key}`, r);
    const meta = {};
    for (const [k, v] of Object.entries(r.headers)) if (k.startsWith('x-amz-meta-')) meta[k.slice(11)] = String(v);
    return {
      size: Number(r.headers['content-length']) || 0,
      etag: stripQuotes(r.headers.etag),
      contentType: r.headers['content-type'] || '',
      lastModified: r.headers['last-modified'] || null,
      meta,
    };
  }

  /**
   * Upload one object in a single PUT (<= 5 GiB). `body`: a Buffer, a file
   * path, or a readable stream with `contentLength`. The payload is never held
   * in memory. `sha256` (hex) is stored as x-amz-meta-sha256.
   */
  async function putObject(key, body, { contentType = 'application/octet-stream', contentLength = null, sha256 = '', metadata = {} } = {}) {
    let stream = body;
    let length = contentLength;
    if (typeof body === 'string') {
      length = (await fs.promises.stat(body)).size;
      stream = fs.createReadStream(body);
    } else if (Buffer.isBuffer(body)) length = body.length;
    else if (length === null && body?.path && typeof body.path === 'string') length = (await fs.promises.stat(body.path)).size;
    if (!Number.isSafeInteger(length) || length < 0) throw new S3Error('putObject needs the content length of a stream');
    if (length > MAX_PUT_BYTES) throw new S3Error(`${key} is over the 5 GiB single-upload limit`);
    const headers = { 'content-type': contentType };
    if (sha256) {
      if (!/^[0-9a-f]{64}$/i.test(sha256)) throw new S3Error('sha256 must be 64 hex characters');
      headers['x-amz-meta-sha256'] = sha256.toLowerCase();
    }
    for (const [k, v] of Object.entries(metadata)) {
      if (!/^[a-z0-9-]+$/i.test(k)) throw new S3Error(`bad metadata name ${k}`);
      headers[`x-amz-meta-${k.toLowerCase()}`] = String(v);
    }
    const r = await send('PUT', key, { headers, body: stream, contentLength: length, payloadHash: UNSIGNED_PAYLOAD });
    if (r.status !== 200) throw fail(`put ${key}`, r);
    return { etag: stripQuotes(r.headers.etag), size: length };
  }

  async function deleteObject(key) {
    const r = await send('DELETE', key);
    if (r.status !== 204 && r.status !== 200 && r.status !== 404) throw fail(`delete ${key}`, r);
    return true;
  }

  return { bucket, region, host, origin, sign, presignGet, listObjects, headObject, putObject, deleteObject, close: () => agent.destroy() };
}
