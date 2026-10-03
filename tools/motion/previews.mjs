#!/usr/bin/env node
// Before publishing: make/refresh a small <name>.preview.mp4 next to every master MP4 in projects/*/outputs/.
// The Studio plays the previews in the page and offers the masters as downloads; tools/motion/sync-media.mjs uploads both to the storage bucket (.railwayignore keeps all media out of the code upload).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const bin = path.join(here, 'preview');
if (!fs.existsSync(bin) || fs.statSync(bin).mtimeMs < fs.statSync(bin + '.swift').mtimeMs) execFileSync('swiftc', ['-O', bin + '.swift', '-o', bin], { stdio: 'ignore' });
let made = 0, kept = 0;
for (const p of fs.readdirSync(path.join(root, 'projects'))) {
  const out = path.join(root, 'projects', p, 'outputs');
  if (p.startsWith('_') || !fs.existsSync(out)) continue;
  for (const f of fs.readdirSync(out)) {
    if (!f.endsWith('.mp4') || f.endsWith('.preview.mp4')) continue;
    const src = path.join(out, f), dst = path.join(out, f.replace(/\.mp4$/, '.preview.mp4'));
    if (fs.existsSync(dst) && fs.statSync(dst).mtimeMs >= fs.statSync(src).mtimeMs) { kept++; continue; }
    try { execFileSync(bin, [src, dst], { stdio: 'ignore' }); made++; } catch (e) { console.error('preview failed:', src); }
  }
}
console.log(`previews: ${made} made, ${kept} up to date`);
