#!/usr/bin/env node
// Project-local: ONE sharp screenshot of the finished PUBLIC homepage check (same steps as capture-home.json,
// never logged in, public/commercial address only), at device scale 2 (3840x2160), plus CSS-px boxes of the
// result card fields, so the edit can push in on real, legible text after the live clip.
//   node motion/still-home.mjs motion/capture-home.json motion/clips/home-still
import { spawn } from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [stepsFile, outPrefix] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(stepsFile, 'utf8'));
const cssW = 1920, cssH = 1080, dpr = 2;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'home-still-'));
const port = 11800 + Math.floor(Math.random() * 1000);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', `--window-size=${cssW},${cssH}`, 'about:blank'], { stdio: 'ignore' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: cssW, height: cssH, deviceScaleFactor: dpr, mobile: false });
  await send('Page.navigate', { url: spec.url });
  for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  await sleep((spec.settle || 2.5) * 1000);
  for (const st of spec.steps) {
    if (st.click) {
      const c = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(st.click)}); if (!e) return null; e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; })()`);
      if (!c) throw new Error('not found: ' + st.click);
      for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 });
    }
    if (st.type) for (const ch of st.type) { await send('Input.insertText', { text: ch }); await sleep(1000 / (st.cps || 9)); }
    if (st.press) for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: st.press, code: st.press, windowsVirtualKeyCode: st.press === 'Enter' ? 13 : st.press === 'ArrowDown' ? 40 : 0 });
    if (st.wait) await sleep(st.wait * 1000);
  }
  await sleep(4000);
  const info = await evaluate(`(() => {
    const leaf = re => [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && re.test(e.textContent.trim()));
    const box = e => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom].map(v => Math.round(v * 10) / 10); };
    return { scrollY, rects: {
      title: box(leaf(/^135 Albert Street, Auckland Central, Auckland$/).find(e => e.tagName !== 'INPUT' && e.closest('ul') == null)),
      area: box(leaf(/^[0-9,]+ m²$/)[0]), legal: box(leaf(/^Lot 1 DP/)[0]), zone: box(leaf(/Zone$/)[0]),
      services: box(leaf(/^Services$/i)[0]), hazards: box(leaf(/^Hazards$/i)[0]),
      footer: box(leaf(/^Indicative only, from LINZ/)[0]), create: box(leaf(/^Create project here$/)[0]) } };
  })()`);
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 92, captureBeyondViewport: false });
  fs.writeFileSync(outPrefix + '.jpg', Buffer.from(s.data, 'base64'));
  fs.writeFileSync(outPrefix + '.json', JSON.stringify({ css_viewport: [cssW, cssH], dpr, ...info }, null, 1));
  console.log('wrote', outPrefix + '.jpg', JSON.stringify(info));
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
