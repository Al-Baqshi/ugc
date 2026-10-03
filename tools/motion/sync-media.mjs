#!/usr/bin/env node
// Sync Studio media to the Railway storage bucket (private, S3-compatible).
// The Studio serves it from there with presigned links; code deploys carry no media.
//
//   node tools/motion/sync-media.mjs              upload new and changed files
//   node tools/motion/sync-media.mjs --dry-run    list and compare only, send nothing
//   node tools/motion/sync-media.mjs --prune      also delete bucket objects with no local file
//   (--root <dir>: the content folder, default the repo root)
//
// What goes up: the top-level files of every projects/<project>/outputs/ folder that the
// Studio shows (its MEDIA_TYPES, so the two never drift apart): masters *.mp4 *.mov *.webm,
// previews *.preview.mp4, stills *.png *.jpg *.jpeg *.webp *.gif, audio *.mp3 *.m4a *.wav,
// each as the object projects/<project>/outputs/<file> with its Content-Type.
// Subfolders, other file types and names the Studio can't serve stay local.
//
// A file is sent only when the bucket has no object of the same size and content:
// the listing's ETag (the MD5 of a single-part upload) is compared first, then the
// object's x-amz-meta-sha256 (written on every upload) with a HEAD. Files stream from
// disk; nothing is held in memory.
//
// Credentials: BUCKET_* from the environment when all are set, else read at run time
// from `railway variables --service studio --kv` (run in the repo root). They are
// never printed and never written to disk.

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createS3, bucketConfigFromEnv, MAX_PUT_BYTES } from '../../studio/lib/s3.mjs';
import { mediaKey, parseMediaKey, PREFIX } from '../../studio/lib/storage.mjs';
import { MEDIA_TYPES } from '../../studio/lib/content.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(here, '..', '..');
const extOf = (name) => path.extname(name).slice(1).toLowerCase();
/** Content-Type for a file the Studio serves, or null for any other file. */
const typeOf = (name) => MEDIA_TYPES[extOf(name)]?.[1] || null;

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fail(msg) {
  console.error(`sync-media: ${msg}`);
  process.exit(1);
}

function parseArgs(argv) {
  const opts = { prune: false, dryRun: false, root: REPO };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--prune') opts.prune = true;
    else if (a === '--dry-run' || a === '-n') opts.dryRun = true;
    else if (a === '--root') opts.root = path.resolve(argv[++i] || '.');
    else if (a === '-h' || a === '--help') {
      console.log('usage: node tools/motion/sync-media.mjs [--dry-run] [--prune] [--root <dir>]');
      process.exit(0);
    } else fail(`unknown option ${a}`);
  }
  return opts;
}

// ------------------------------------------------------------- credentials

/** Run a command; resolves stdout. Never echoes it. */
function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd, timeout: 60_000, maxBuffer: 4 * 1024 * 1024, env: process.env }, (err, stdout, stderr) => {
      if (err) {
        err.stderr = String(stderr || '');
        return reject(err);
      }
      resolve(String(stdout));
    });
  });
}

/** KEY=value lines -> { BUCKET_*: value } (everything else is dropped unread). */
function bucketVars(text) {
  const out = {};
  for (const line of String(text).split(/\r?\n/)) {
    const i = line.indexOf('=');
    if (i <= 0) continue;
    const k = line.slice(0, i).trim();
    if (/^BUCKET_[A-Z0-9_]+$/.test(k)) out[k] = line.slice(i + 1).trim();
  }
  return out;
}

async function loadConfig() {
  let cfg;
  try {
    cfg = bucketConfigFromEnv(process.env);
  } catch (e) {
    fail(`${e.message} in the environment (set all of them, or none to read them from Railway)`);
  }
  if (cfg) return { cfg, source: 'the environment' };
  let out;
  try {
    out = await run('railway', ['variables', '--service', 'studio', '--kv'], REPO);
  } catch (e) {
    if (e.code === 'ENOENT') fail('the railway CLI is not installed (or not on PATH), so the bucket credentials could not be read.');
    // First line of stderr only, and never a line that looks like KEY=value.
    const why = e.stderr.split('\n').map((l) => l.trim()).find((l) => l && !l.includes('=')) || `exit ${e.code ?? '?'}`;
    fail(`could not read the bucket credentials with \`railway variables --service studio --kv\` (${why.slice(0, 200)}). Is this folder linked (railway link) and are you logged in?`);
  }
  try {
    cfg = bucketConfigFromEnv(bucketVars(out));
  } catch (e) {
    fail(`${e.message} on the Railway studio service`);
  }
  if (!cfg) fail('the Railway studio service has no BUCKET_* variables. Add the bucket to the service first.');
  return { cfg, source: 'Railway' };
}

// ------------------------------------------------------------- local files

function hashFile(abs) {
  return new Promise((resolve, reject) => {
    const md5 = crypto.createHash('md5');
    const sha = crypto.createHash('sha256');
    fs.createReadStream(abs)
      .on('data', (c) => {
        md5.update(c);
        sha.update(c);
      })
      .on('error', reject)
      .on('end', () => resolve({ md5: md5.digest('hex'), sha256: sha.digest('hex') }));
  });
}

/** { projects, files: [{ project, name, key, abs, size }] }; odd names go to `skipped`. */
async function scan(root, skipped) {
  const dir = path.join(root, 'projects');
  let entries;
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch {
    fail(`no projects/ folder in ${root}`);
  }
  let projects = 0;
  const files = [];
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!e.isDirectory() || /^[._]/.test(e.name)) continue;
    projects++;
    const outputs = path.join(dir, e.name, 'outputs');
    let st = null;
    try {
      st = await fsp.lstat(outputs);
    } catch {}
    if (!st || !st.isDirectory() || st.isSymbolicLink()) continue; // never follow a symlinked outputs/
    for (const f of (await fsp.readdir(outputs, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      if (!f.isFile() || f.name.startsWith('.') || !typeOf(f.name)) continue; // folders, symlinks, other types
      const key = mediaKey(e.name, f.name);
      if (!key) {
        skipped.push(`projects/${e.name}/outputs/${f.name}`);
        continue;
      }
      const abs = path.join(outputs, f.name);
      files.push({ project: e.name, name: f.name, key, abs, size: (await fsp.stat(abs)).size });
    }
  }
  return { projects, files };
}

// ------------------------------------------------------------------- main

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const skipped = [];
  const { projects, files } = await scan(opts.root, skipped);
  const { cfg, source } = await loadConfig();
  let s3;
  try {
    s3 = createS3(cfg);
  } catch (e) {
    fail(e.message);
  }
  console.log(`sync-media: bucket ${cfg.bucket} (credentials from ${source})${opts.dryRun ? ', dry run: nothing is sent or deleted' : ''}`);

  const t0 = Date.now();
  let listing;
  try {
    listing = await s3.listObjects(PREFIX);
  } catch (e) {
    fail(`could not list the bucket: ${e.message}`);
  }
  const remote = new Map(listing.map((o) => [o.key, o]));
  const stats = { uploaded: 0, upBytes: 0, unchanged: 0, deleted: 0, remoteOnly: 0, failed: 0 };
  const failures = [];

  for (const file of files) {
    let h;
    try {
      h = await hashFile(file.abs);
      const have = remote.get(file.key);
      if (have && have.size === file.size) {
        let same = have.etag.toLowerCase() === h.md5;
        if (!same) {
          const head = await s3.headObject(file.key);
          same = !!head && head.size === file.size && head.meta.sha256 === h.sha256;
        }
        if (same) {
          stats.unchanged++;
          continue;
        }
      }
    } catch (e) {
      stats.failed++;
      failures.push(`${file.key}: ${e.message}`);
      continue;
    }
    if (file.size > MAX_PUT_BYTES) {
      stats.failed++;
      failures.push(`${file.key}: ${mb(file.size)} is over the 5 GiB single-upload limit`);
      continue;
    }
    if (opts.dryRun) {
      stats.uploaded++;
      stats.upBytes += file.size;
      console.log(`  would upload  ${file.key} (${mb(file.size)})`);
      continue;
    }
    for (let attempt = 1; ; attempt++) {
      try {
        await s3.putObject(file.key, fs.createReadStream(file.abs), { contentLength: file.size, contentType: typeOf(file.name), sha256: h.sha256 });
        stats.uploaded++;
        stats.upBytes += file.size;
        console.log(`  uploaded  ${file.key} (${mb(file.size)})`);
        break;
      } catch (e) {
        const retry = !e.status || e.status >= 500 || e.status === 408 || e.status === 429;
        if (retry && attempt < 3) {
          await sleep(2000 * attempt);
          continue;
        }
        stats.failed++;
        failures.push(`${file.key}: ${e.message}`);
        break;
      }
    }
  }

  // Objects with no local file. Only keys the Studio would serve are considered;
  // anything else in the bucket is never touched.
  const localKeys = new Set(files.map((f) => f.key));
  const gone = [];
  for (const key of remote.keys()) {
    if (localKeys.has(key)) continue;
    const k = parseMediaKey(key);
    if (!k) continue;
    let local = false;
    try {
      local = (await fsp.lstat(path.join(opts.root, 'projects', k.folder, 'outputs', k.name))).isFile();
    } catch {}
    if (!local) gone.push(key);
  }
  if (opts.prune && gone.length && !files.length) {
    stats.failed++;
    failures.push(`--prune: no local media found under ${path.join(opts.root, 'projects')}, so nothing was deleted (that would empty the bucket)`);
  } else if (opts.prune) {
    for (const key of gone) {
      if (opts.dryRun) {
        stats.deleted++;
        console.log(`  would delete  ${key}`);
        continue;
      }
      try {
        await s3.deleteObject(key);
        stats.deleted++;
        console.log(`  deleted   ${key}`);
      } catch (e) {
        stats.failed++;
        failures.push(`${key} (delete): ${e.message}`);
      }
    }
  } else stats.remoteOnly = gone.length;
  s3.close();

  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  const parts = [`${projects} projects`, `${files.length} files`];
  if (opts.dryRun) parts.push(`${stats.uploaded} to upload (${mb(stats.upBytes)})`, `${stats.unchanged} unchanged (skipped)`, `${stats.deleted} to delete`);
  else parts.push(`${stats.uploaded} uploaded (${mb(stats.upBytes)})`, `${stats.unchanged} unchanged (skipped)`, `${stats.deleted} deleted`);
  if (stats.remoteOnly) parts.push(`${stats.remoteOnly} only in the bucket (kept; --prune deletes)`);
  parts.push(`${stats.failed} failed`);
  console.log(`sync-media${opts.dryRun ? ' (dry run)' : ''}: ${parts.join(', ')} in ${secs}s`);
  if (skipped.length) console.log(`sync-media: skipped ${skipped.length} with names the Studio can't serve (leading "_", control characters): ${skipped.join(', ')}`);
  for (const f of failures) console.error(`  FAILED  ${f}`);
  process.exit(stats.failed ? 1 : 0);
}

main().catch((e) => fail(e?.message || String(e)));
