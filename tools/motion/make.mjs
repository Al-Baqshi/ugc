#!/usr/bin/env node
// Render a motion-kit page to MP4 (headless Chrome → PNG frames → H.264 via AVFoundation), with QA.
//
//   node tools/motion/make.mjs <page.html> <out.mp4> [--fps 30] [--safe x0,y0,x1,y1] [--sheet 12] [--check] [--still 2.5[,4,6]] [--still-only]
//
// The page must use tools/motion/kit.js and end with Kit.ready({ duration }).
// --check  : no video; only the layout/overflow QA and a contact sheet (fast: use while designing).
// --safe   : safe box for text in px (default: whole frame). Reels: 65,300,1015,1250 keeps clear of app UI.
// Outputs  : <out.mp4>, <out>-frames.png (contact sheet), and a QA report on stdout. Exit code 2 if QA fails.
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const has = k => args.includes(k);
const [page, out] = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').match(/^--(fps|safe|sheet|still)$/));
if (!page || !out) { console.error('usage: make.mjs <page.html> <out.mp4> [--fps 30] [--safe x0,y0,x1,y1] [--sheet 12] [--check]'); process.exit(1); }
const fps = Number(flag('--fps', 30)), sheetN = Number(flag('--sheet', 12));
const safe = flag('--safe') ? (([x0, y0, x1, y1]) => ({ x0, y0, x1, y1 }))(flag('--safe').split(',').map(Number)) : null;

const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'].find(p => fs.existsSync(p));
if (!CHROME) { console.error('No Chrome/Chromium found'); process.exit(1); }
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-motion-'));
const framesDir = path.join(work, 'frames'), sheetDir = path.join(work, 'sheet');
fs.mkdirSync(framesDir); fs.mkdirSync(sheetDir);
const port = 9400 + Math.floor(Math.random() * 2000);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(work, 'prof')}`, '--hide-scrollbars',
  '--force-device-scale-factor=1', '--window-size=1920,1920', '--allow-file-access-from-files', '--no-first-run', '--no-default-browser-check',
  '--font-render-hinting=none', '--disable-lcd-text', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
function swiftTool(name) {
  const bin = path.join(here, name), src = bin + '.swift';
  if (!fs.existsSync(bin) || fs.statSync(bin).mtimeMs < fs.statSync(src).mtimeMs) execFileSync('swiftc', ['-O', src, '-o', bin], { stdio: ['ignore', 'ignore', 'ignore'] });
  return bin;
}
let code = 0;
try {
  let target;
  for (let i = 0; i < 150; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); if (target) break; } catch {} await sleep(150); }
  if (!target) throw new Error('Chrome did not start');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pending = new Map(); const events = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.j(new Error(JSON.stringify(d.error))) : p.r(d.result); } else if (d.method) events.push(d); };
  const send = (method, params = {}) => new Promise((r, j) => { const i = ++id; pending.set(i, { r, j }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error('page error: ' + (r.exceptionDetails.exception?.description || JSON.stringify(r.exceptionDetails))); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1920, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: pathToFileURL(path.resolve(page)).href });
  for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  const info = await evaluate('window.__ready');
  if (!info || !info.duration) throw new Error('page did not call Kit.ready({ duration })');
  const { width: W, height: H, duration } = info;
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  console.log(`page ${path.basename(page)}: ${W}x${H}, ${duration}s, ${info.tracks} tracks, ${info.scenes} scenes`);
  const errs = events.filter(e => (e.method === 'Runtime.exceptionThrown') || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'));
  if (errs.length) { console.log('PAGE ERRORS:', errs.map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text).join(' | ')); code = 2; }
  const shot = async (t, file, scale) => {
    await evaluate(`(async()=>{render(${t}); await Kit.settle(); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); return 1})()`);
    const jpg = file.endsWith('.jpg');
    const s = await send('Page.captureScreenshot', { format: jpg ? 'jpeg' : 'png', ...(jpg ? { quality: 94 } : {}), optimizeForSpeed: true, clip: { x: 0, y: 0, width: W, height: H, scale } });
    fs.writeFileSync(file, Buffer.from(s.data, 'base64'));
  };

  // ---- QA: text outside the frame / safe box, sampled 4x per second
  // (a box only counts if it sits still for two samples in a row: text passing through during a transition is fine)
  const bad = new Map(); let prev = new Set();
  for (let t = 0; t <= duration; t += 0.2) {
    const cur = new Set();
    for (const b of await evaluate(`Kit.overflow(${t.toFixed(2)}, ${JSON.stringify(safe)})`)) { const k = b.text + '|' + b.box.join(','); cur.add(k); if (prev.has(k) && !bad.has(k)) bad.set(k, { ...b, t: +t.toFixed(2) }); }
    prev = cur;
  }
  if (bad.size) { code = 2; console.log(`QA FAIL: ${bad.size} text box(es) outside ${safe ? 'the safe box ' + JSON.stringify(safe) : 'the frame'}:`); for (const b of [...bad.values()].slice(0, 25)) console.log(`  t=${b.t}s  "${b.text}"  box ${b.box}  ${b.size}`); }
  else console.log('QA ok: all visible text inside ' + (safe ? 'the safe box' : 'the frame'));

  // ---- contact sheet (even samples; avoids exact cut frames)
  const sheetScale = Math.min(1, 400 / W);
  for (let i = 0; i < sheetN; i++) { const t = duration * (i + 0.6) / sheetN; await shot(t, path.join(sheetDir, `s_${String(i).padStart(3, '0')}.png`), sheetScale); }
  const sheetOut = out.replace(/\.mp4$/, '') + '-frames.png';
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  execFileSync(swiftTool('sheet'), [sheetOut, String(Math.min(sheetN, W > H ? 4 : 6)), ...fs.readdirSync(sheetDir).sort().map(f => path.join(sheetDir, f))]);
  console.log('contact sheet:', sheetOut);

  // --still <t>[,<t2>…] : also save full-size PNG stills (static posts, carousel slides, thumbnails)
  if (flag('--still')) {
    for (const t of flag('--still').split(',').map(Number)) {
      const f = out.replace(/\.mp4$/, '') + (flag('--still').includes(',') ? `-still-${t}` : '') + '.png';
      await shot(t, f, 1); console.log('still:', f);
    }
  }
  if (!has('--check') && !has('--still-only')) {
    const n = Math.round(duration * fps), t0 = Date.now();
    for (let i = 0; i < n; i++) { await shot(+(i / fps).toFixed(5), path.join(framesDir, `f_${String(i).padStart(5, '0')}.jpg`), 1); if (i % 150 === 0) console.log(`frame ${i}/${n} (${((Date.now() - t0) / 1000).toFixed(0)}s)`); }
    console.log(execFileSync(swiftTool('encode'), [framesDir, path.resolve(out), String(fps), W * H > 1500000 ? '10' : '8']).toString().trim());
    console.log(`wrote ${out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB, ${n} frames)`);
  }
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(work, { recursive: true, force: true }); }
process.exit(code);
