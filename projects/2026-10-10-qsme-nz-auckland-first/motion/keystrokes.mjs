#!/usr/bin/env node
// Sharp typing footage for the PUBLIC homepage address check (never logged in, public/commercial addresses only).
// capture.mjs screencasts arrive at CSS-pixel size (1920x1080 desktop, 390x693 mobile), which is too soft once
// the edit pushes in on the search box (desktop) or fills a 1080-wide frame (mobile). This replays the same steps
// and takes one full-resolution screenshot per keystroke, then a few after Enter, as a Kit.clip frame sequence.
// Stamps are a natural typing rhythm (not the screenshot latency); everything on screen is the real page.
//
//   node projects/2026-10-10-qsme-nz-auckland-first/motion/keystrokes.mjs <capture-steps.json> <outDir> [--dpr 2] [--cps 13]
// Writes outDir/f_00000.jpg … and outDir/frames.json { stamps, ext, events: { typed, dropdown, select, enter } }.
import { spawn } from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';

const args = process.argv.slice(2);
const flag = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [stepsFile, outDir] = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'));
const spec = JSON.parse(fs.readFileSync(stepsFile, 'utf8'));
const cssW = Math.round(spec.width / (spec.scale || 1)), cssH = Math.round(spec.height / (spec.scale || 1));
const dpr = Number(flag('--dpr', spec.mobile ? 4.155 : 2));
const cps = Number(flag('--cps', 13));
const address = spec.steps.find(s => s.type).type;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'akl-keys-'));
const port = 11900 + Math.floor(Math.random() * 1000);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', `--window-size=${spec.width},${spec.height}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let code = 0;
try {
  let target; for (let i = 0; i < 150; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); if (target) break; } catch {} await sleep(150); }
  const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pending = new Map(); const events = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.j(new Error(JSON.stringify(d.error))) : p.r(d.result); } else if (d.method) events.push(d); };
  const send = (method, params = {}) => new Promise((r, j) => { const i = ++id; pending.set(i, { r, j }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval failed'); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: cssW, height: cssH, deviceScaleFactor: dpr, mobile: !!spec.mobile });
  if (spec.mobile) { await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' }); await send('Emulation.setTouchEmulationEnabled', { enabled: true }); }
  await send('Page.navigate', { url: spec.url });
  for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  await sleep((spec.settle || 2.5) * 1000 + 1000);
  const stamps = []; let n = 0;
  const shot = async t => {
    const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    fs.writeFileSync(path.join(outDir, `f_${String(n++).padStart(5, '0')}.jpg`), Buffer.from(s.data, 'base64'));
    stamps.push(+t.toFixed(3));
  };
  // before the click: the untouched hero (scroll 0)
  await shot(0);
  const c = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify("input[placeholder^='e.g. 12 Queen']")}); e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; })()`);
  for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 });
  await sleep(400);
  let t = 0.5; await shot(t);
  t += 0.35;
  for (let i = 0; i < address.length; i++) {
    await send('Input.insertText', { text: address[i] });
    await sleep(260);                                  // let the autocomplete react like it does mid-typing
    t += (address[i] === ' ' ? 1.25 : (i % 3 === 1 ? 0.85 : 1)) / cps;   // a human rhythm, deterministic
    await shot(t);
  }
  const typed = t;
  await sleep(1400); t += 0.55; await shot(t); const dropdown = t;
  for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
  await sleep(250); t += 0.4; await shot(t); const select = t;
  for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  const enter = t + 0.12; const t0 = Date.now();
  for (const dt of [0.15, 0.45, 0.9, 1.5]) { while ((Date.now() - t0) / 1000 < dt) await sleep(20); await shot(enter + (Date.now() - t0) / 1000); }
  fs.writeFileSync(path.join(outDir, 'frames.json'), JSON.stringify({ url: spec.url, address, css_viewport: [cssW, cssH], dpr, ext: '.jpg', stamps, events: { typed, dropdown, select, enter } }, null, 0));
  console.log(`keystrokes: ${n} frames, typed by ${typed.toFixed(2)}s, enter at ${enter.toFixed(2)}s → ${outDir}`);
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
