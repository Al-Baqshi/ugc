#!/usr/bin/env node
// Screen-record a PUBLIC web page with scripted actions, as a timestamped PNG frame sequence for Kit.clip().
//
//   node tools/motion/capture.mjs <steps.json> <outDir> [--width 1080 --height 1920 --scale 1 --fps 20]
//
// steps.json: { "url": "https://www.qsme.co.nz/", "mobile": true, "steps": [
//    { "wait": 2.0 },                                   // record for 2 s
//    { "click": "input[type=search]" },                 // CSS selector (or { "clickText": "Search your address" })
//    { "type": "Queen Street, Auckland", "cps": 9 },    // types char by char, recording as it goes
//    { "press": "Enter" }, { "scroll": 600, "dur": 1.2 }, { "hide": ".cookie-banner" }, { "eval": "..." }
// ]}
// Writes outDir/f_00000.jpg … and outDir/frames.json ({ stamps: [seconds…], ext }) for Kit.clip({ stamps, ext: '.jpg' }).
// Rules: public pages only, never log in, never type personal data; prefer public/commercial addresses.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [stepsFile, outDir] = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'));
if (!stepsFile || !outDir) { console.error('usage: capture.mjs <steps.json> <outDir> [--width 1080 --height 1920 --scale 1 --fps 20]'); process.exit(1); }
const spec = JSON.parse(fs.readFileSync(stepsFile, 'utf8'));
const W = Number(flag('--width', spec.width || 1080)), H = Number(flag('--height', spec.height || 1920));
const scale = Number(flag('--scale', spec.scale || 1)), fps = Number(flag('--fps', spec.fps || 20));
const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium'].find(p => fs.existsSync(p));
fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-cap-'));
const port = 9600 + Math.floor(Math.random() * 2000);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--force-device-scale-factor=1', `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let code = 0;
try {
  let target;
  for (let i = 0; i < 150; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); if (target) break; } catch {} await sleep(150); }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pending = new Map(); const events = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.j(new Error(JSON.stringify(d.error))) : p.r(d.result); } else if (d.method) events.push(d); };
  const send = (method, params = {}) => new Promise((r, j) => { const i = ++id; pending.set(i, { r, j }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval failed'); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: Math.round(W / scale), height: Math.round(H / scale), deviceScaleFactor: scale, mobile: !!spec.mobile });
  if (spec.mobile) await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  if (spec.mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  await send('Page.navigate', { url: spec.url });
  for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  await sleep((spec.settle || 2.5) * 1000);
  // Screencast: Chrome pushes a JPEG every time the page paints (smooth, ~25-60 fps). We keep each frame with its
  // wall-clock timestamp; while the page is still, Chrome sends nothing, so Kit.clip({ stamps }) holds the last frame.
  const stamps = []; let n = 0; let t0 = null; let recording = false;
  ws.addEventListener('message', m => {
    const d = JSON.parse(m.data);
    if (d.method !== 'Page.screencastFrame') return;
    send('Page.screencastFrameAck', { sessionId: d.params.sessionId }).catch(() => {});
    if (!recording) return;
    const ts = d.params.metadata.timestamp; if (t0 == null) t0 = ts;
    fs.writeFileSync(path.join(outDir, `f_${String(n++).padStart(5, '0')}.jpg`), Buffer.from(d.params.data, 'base64'));
    stamps.push(+(ts - t0).toFixed(3));
  });
  await send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  recording = true;
  // force a first frame even if nothing moves
  await evaluate('document.body.style.outline = "0.01px solid transparent"');
  const record = async secs => { await sleep(secs * 1000); };
  const center = async sel => evaluate(`(() => { const e = ${JSON.stringify(sel)}.startsWith('text=') ? [...document.querySelectorAll('a,button,[role=button],input,label,span,div')].find(x => x.textContent.trim() === ${JSON.stringify(sel)}.slice(5)) : document.querySelector(${JSON.stringify(sel)}); if (!e) return null; e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; })()`);
  for (const st of spec.steps) {
    if (st.hide) await evaluate(`document.querySelectorAll(${JSON.stringify(st.hide)}).forEach(e => e.style.setProperty('display','none','important'))`);
    if (st.eval) await evaluate(st.eval);
    if (st.click || st.clickText) {
      const c = await center(st.click || 'text=' + st.clickText);
      if (!c) throw new Error('not found: ' + (st.click || st.clickText));
      for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 });
    }
    if (st.type) { const cps = st.cps || 9; for (const ch of st.type) { await send('Input.insertText', { text: ch }); await record(1 / cps); } }
    if (st.press) { for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: st.press, code: st.press, windowsVirtualKeyCode: st.press === 'Enter' ? 13 : st.press === 'ArrowDown' ? 40 : 0 }); }
    if (st.scroll) { const steps = Math.max(1, Math.round((st.dur || 1) * fps)); for (let i = 0; i < steps; i++) { await evaluate(`window.scrollBy(0, ${st.scroll / steps})`); await record(1 / fps); } }
    if (st.wait) await record(st.wait);
  }
  await record(0.3); recording = false; await send('Page.stopScreencast');
  fs.writeFileSync(path.join(outDir, 'frames.json'), JSON.stringify({ url: spec.url, width: W, height: H, ext: '.jpg', stamps }, null, 0));
  console.log(`captured ${n} frames over ${stamps.at(-1)}s (${(n / stamps.at(-1)).toFixed(1)} fps) → ${outDir}`);
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
