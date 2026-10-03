// Renders reel-body.html frame by frame in headless Chrome (CDP, no dependencies) to PNGs.
// usage: node render.mjs <outDir> [fps=30] [from=0] [to=27.5] [scale=1]   or   node render.mjs <outDir> --times 0.3,1.2,...
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2];
let times = [];
let scale = 1;
if (process.argv[3] === '--times') {
  times = process.argv[4].split(',').map(Number);
  scale = Number(process.argv[5] || 0.5);
} else {
  const fps = Number(process.argv[3] || 30), from = Number(process.argv[4] || 0), to = Number(process.argv[5] || 27.5);
  scale = Number(process.argv[6] || 1);
  const n = Math.round((to - from) * fps);
  for (let i = 0; i < n; i++) times.push(+(from + i / fps).toFixed(5));
}
fs.mkdirSync(outDir, { recursive: true });
const port = 9333 + Math.floor(Math.random() * 500);
const prof = path.join(outDir, '..', '.chrome-prof-' + port);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars',
  '--force-device-scale-factor=1', '--window-size=1080,1920', '--allow-file-access-from-files',
  '--no-first-run', '--no-default-browser-check', '--font-render-hinting=none', 'about:blank'
], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let target;
for (let i = 0; i < 100; i++) {
  try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); target = l.find(t => t.type === 'page'); if (target) break; } catch {}
  await sleep(150);
}
if (!target) { chrome.kill(); throw new Error('chrome did not start'); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let id = 0; const pending = new Map(); const events = [];
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.j(new Error(JSON.stringify(d.error))) : p.r(d.result); } else if (d.method) events.push(d); };
const send = (method, params = {}) => new Promise((r, j) => { const i = ++id; pending.set(i, { r, j }); ws.send(JSON.stringify({ id: i, method, params })); });
try {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: pathToFileURL(path.join(here, 'reel-body.html')).href });
  for (let i = 0; i < 200 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  const ready = await send('Runtime.evaluate', { expression: 'window.__ready', awaitPromise: true, returnByValue: true });
  if (ready.exceptionDetails) throw new Error(JSON.stringify(ready.exceptionDetails));
  fs.writeFileSync(path.join(outDir, 'layout.json'), JSON.stringify(ready.result.value, null, 1));
  console.log('ready', JSON.stringify(ready.result.value).slice(0, 1500));
  const t0 = Date.now();
  for (let i = 0; i < times.length; i++) {
    const t = times[i];
    const ev = await send('Runtime.evaluate', { expression: `new Promise(r=>{render(${t});requestAnimationFrame(()=>requestAnimationFrame(()=>r(1)))})`, awaitPromise: true });
    if (ev.exceptionDetails) throw new Error(JSON.stringify(ev.exceptionDetails));
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1080, height: 1920, scale } });
    const name = process.argv[3] === '--times' ? `t_${t.toFixed(2).padStart(6, '0')}.png` : `f_${String(i).padStart(5, '0')}.png`;
    fs.writeFileSync(path.join(outDir, name), Buffer.from(shot.data, 'base64'));
    if (i % 100 === 0) console.log('frame', i, '/', times.length, ((Date.now() - t0) / 1000).toFixed(1) + 's');
  }
  console.log('done', times.length, 'frames in', ((Date.now() - t0) / 1000).toFixed(1) + 's');
} finally {
  ws.close(); chrome.kill();
  await sleep(300);
  fs.rmSync(prof, { recursive: true, force: true });
}
