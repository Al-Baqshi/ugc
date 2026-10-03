#!/usr/bin/env node
// Hi-res companion stills for the live captures (same PUBLIC homepage, same steps, never logged in).
// capture.mjs screencasts are capped at the CSS viewport size (1920x1080 on desktop), which goes soft
// when the edit pushes in 2-3x on the result card. This takes ONE full-resolution screenshot of the
// finished result (desktop at 3x, mobile at 4.155x) plus the page coordinates of each card field,
// so the edit can cross-fade from the live clip to a sharp still and draw highlight boxes on real text.
//
//   node projects/2026-10-10-qsme-nz-auckland-first/motion/stills.mjs <capture-steps.json> <out-prefix> [--dpr 3] [--clipH 1080]
// Writes <out-prefix>.png and <out-prefix>.json ({ dpr, sy_click, sy_end, rects: {name: [x0,y0,x1,y1] in CSS px, PAGE coords} }).
import { spawn } from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';

const args = process.argv.slice(2);
const flag = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [stepsFile, outPrefix] = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'));
const spec = JSON.parse(fs.readFileSync(stepsFile, 'utf8'));
const cssW = Math.round(spec.width / (spec.scale || 1)), cssH = Math.round(spec.height / (spec.scale || 1));
const dpr = Number(flag('--dpr', spec.mobile ? 4.155 : 3));
const clipH = Number(flag('--clipH', cssH));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'akl-still-'));
const port = 10800 + Math.floor(Math.random() * 1000);
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
  await sleep((spec.settle || 2.5) * 1000);
  let syClick = null;
  for (const st of spec.steps) {
    if (st.click) {
      const c = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(st.click)}); if (!e) return null; e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; })()`);
      if (!c) throw new Error('not found: ' + st.click);
      for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 });
      syClick = await evaluate('scrollY');
    }
    if (st.type) for (const ch of st.type) { await send('Input.insertText', { text: ch }); await sleep(1000 / (st.cps || 9)); }
    if (st.press) for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: st.press, code: st.press, windowsVirtualKeyCode: st.press === 'Enter' ? 13 : st.press === 'ArrowDown' ? 40 : 0 });
    if (st.scroll) { const n = Math.max(1, Math.round((st.dur || 1) * (spec.fps || 20))); for (let i = 0; i < n; i++) { await evaluate(`window.scrollBy(0, ${st.scroll / n})`); await sleep(1000 / (spec.fps || 20)); } }
    if (st.wait) await sleep(st.wait * 1000);
  }
  await sleep(5000);   // let the map tiles and every chip settle
  const info = await evaluate(`(() => {
    const leaf = re => [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && re.test(e.textContent.trim()));
    const box = e => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.left, b.top + scrollY, b.right, b.bottom + scrollY].map(v => Math.round(v * 10) / 10); };
    const r = {};
    r.input = box(document.querySelector(${JSON.stringify("input[placeholder^='e.g. 12 Queen']")}));
    r.title = box(leaf(/^(135 Albert|50 The Octagon|53 Hereford|260 Anglesea).*,.*,/)[0]);
    r.area = box(leaf(/^[0-9,]+ m²$/)[0]);
    r.legal = box(leaf(/(^|\\s)(Lot|DP|DPS|Pt|Part|Sec)\\s/).filter(e => !/Street|Place|Octagon/.test(e.textContent))[0]);
    r.council = box(leaf(/^(Auckland|Dunedin City|Christchurch City|Hamilton City)$/).filter(e => e.closest('div') && !e.closest('header,nav'))[0]);
    r.zone = box(leaf(/Zone/).filter(e => e.textContent.length < 80)[0]);
    r.unavail = box(leaf(/^Services & hazard data/)[0]);
    r.services = box(leaf(/^Services$/i)[0]);
    r.hazards = box(leaf(/^Hazards$/i)[0]);
    r.footer = box(leaf(/^Indicative only, from LINZ/)[0]);
    const cp = [...document.querySelectorAll('a,button')].find(e => e.textContent.trim() === 'Create project here'); r.create = box(cp);
    const m = document.querySelector('.gm-style'); r.map = box(m && m.parentElement);
    let card = cp; for (let i = 0; i < 6 && card; i++) { card = card.parentElement; if (card && card.getBoundingClientRect().width > 300 && /m²/.test(card.textContent) && card.getBoundingClientRect().height > 120) break; }
    r.card = box(card);
    return { sy_end: scrollY, rects: r };
  })()`);
  await send('Emulation.setDeviceMetricsOverride', { width: cssW, height: cssH, deviceScaleFactor: dpr, mobile: !!spec.mobile });
  const y0 = flag('--clipY') != null ? Number(flag('--clipY')) : info.sy_end;
  const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: y0, width: cssW, height: clipH, scale: 1 } });
  fs.writeFileSync(outPrefix + '.png', Buffer.from(s.data, 'base64'));
  const meta = { url: spec.url, address_steps: stepsFile, css_viewport: [cssW, cssH], dpr, clip_y: y0, clip_h: clipH, sy_click: syClick, sy_end: info.sy_end, rects: info.rects };
  fs.writeFileSync(outPrefix + '.json', JSON.stringify(meta, null, 1));
  console.log('still', outPrefix, JSON.stringify({ sy_click: syClick, sy_end: info.sy_end, clip_y: meta.clip_y }));
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
