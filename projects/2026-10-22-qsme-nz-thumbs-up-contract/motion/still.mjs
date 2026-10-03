#!/usr/bin/env node
// Hi-res still of a PUBLIC page at a given scroll state, plus the boxes of chosen elements/text (for crops and
// highlight overlays). Companion to tools/motion/capture.mjs, whose screencast frames come out at CSS size (540 px).
//
//   node still.mjs <spec.json> <out.png>
// spec: { url, cssWidth: 540, cssHeight: 675, dpr: 2, mobile: true, settle: 3, evals: ["..."],
//         boxes: { name: "js expression returning an Element or Range" } }
// Writes out.png and out.json ({ dpr, boxes: { name: [x, y, w, h] in output pixels, or [[...], ...] for line rects } }).
// Rules: public pages only, never log in, never type personal data.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [specFile, out] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
const cw = spec.cssWidth || 540, ch = spec.cssHeight || 675, dpr = spec.dpr || 2;
const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium'].find(p => fs.existsSync(p));
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-still-'));
const port = 9300 + Math.floor(Math.random() * 1000);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', `--window-size=${cw},${ch}`, 'about:blank'], { stdio: 'ignore' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: cw, height: ch, deviceScaleFactor: dpr, mobile: !!spec.mobile });
  if (spec.mobile) await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  await send('Page.navigate', { url: spec.url });
  for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  await sleep((spec.settle || 3) * 1000);
  for (const e of spec.evals || []) await evaluate(e);
  await sleep(800);
  // fullPage: boxes are document-relative and the PNG is the whole page (fixed headers render at the top)
  const full = !!spec.fullPage;
  const boxes = await evaluate(`(() => { const out = {}; const specs = ${JSON.stringify(spec.boxes || {})}; const oy = ${full} ? scrollY : 0;
    for (const k in specs) { const o = eval(specs[k]); if (!o) { out[k] = null; continue; }
      if (o instanceof Range) out[k] = [...o.getClientRects()].map(b => [b.left, b.top + oy, b.width, b.height].map(v => Math.round(v * ${dpr})));
      else { const b = o.getBoundingClientRect(); out[k] = [b.left, b.top + oy, b.width, b.height].map(v => Math.round(v * ${dpr})); } }
    out.docHeight = Math.round(document.documentElement.scrollHeight * ${dpr}); return out; })()`);
  let s;
  if (full) {
    await evaluate('scrollTo(0,0)'); await sleep(500);
    const h = await evaluate('document.documentElement.scrollHeight');
    s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cw, height: Math.min(h, spec.maxCssHeight || h), scale: 1 } });
  } else s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(out, Buffer.from(s.data, 'base64'));
  fs.writeFileSync(out.replace(/\.png$/, '.json'), JSON.stringify({ url: spec.url, dpr, cssWidth: cw, cssHeight: ch, boxes }, null, 1));
  console.log('wrote', out, JSON.stringify(boxes));
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
