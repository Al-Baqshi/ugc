#!/usr/bin/env node
// Back-corner: one tall, full-resolution still of the qsme.co.nz homepage address search (phone layout,
// 432x768 CSS px at device scale 2.5 = 1080 px wide), plus the on-screen rectangles of the parts the edit
// points at (chips, footer line, card fields). The edit scrolls and punches into this still, so the motion is
// smooth and every pixel is the real page. Capture rules: never log in, never type personal data, public/commercial demo address only.
//
//   node projects/2026-10-06-qsme-nz-back-corner/motion/still-plate.mjs <outDir> ["address query"]
// writes <outDir>/plate.png (1080 x ((Y1-Y0)*2.5)) and <outDir>/rects.json
import { spawn } from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [outDir, query = '474 Great North Road, Grey Lynn'] = process.argv.slice(2);
const W = 432, H = 768, DSF = 2.5, Y0 = 180, Y1 = 1760;   // CSS px: page slice from just above the search box to below "Create project here"
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'ugc-plate-'));
const port = 9800 + Math.floor(Math.random() * 1000);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', `--force-device-scale-factor=${DSF}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DSF, mobile: true });
  await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  await send('Page.navigate', { url: 'https://www.qsme.co.nz/' });
  for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
  await sleep(3000);
  const click = async sel => { const c = await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; e.scrollIntoView({block:'center'}); const b=e.getBoundingClientRect(); return {x:b.left+b.width/2,y:b.top+b.height/2};})()`); if (!c) throw new Error('not found ' + sel); for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 }); };
  await click("input[placeholder^='e.g. 12 Queen']");
  for (const ch of query) { await send('Input.insertText', { text: ch }); await sleep(90); }
  await sleep(2000);
  await click('li[role=option] button');
  await sleep(7000);
  // scroll to top for the tall slice (the fixed nav bar is not in it: the page overlays a crop of a screencast frame instead)
  await evaluate('window.scrollTo(0, 0); 1'); await sleep(1500);
  const rects = await evaluate(`(() => {
    const R = b => [b.left, b.top + scrollY - ${Y0}, b.right, b.bottom + scrollY - ${Y0}].map(v => Math.round(v * ${DSF}));
    const leaf = t => [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === t);
    const card = e => { let c = e; for (let i = 0; i < 6 && c; i++) { const cs = getComputedStyle(c); if (parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderRadius) > 0) return c; c = c.parentElement; } return e; };
    const out = { y0css: ${Y0}, dsf: ${DSF}, chips: {}, text: {} };
    for (const L of ['Water supply','Wastewater','Stormwater','Piped gas','Electricity','Flood plain','Flood-prone area','Overland flow path','Coastal inundation']) { const e = leaf(L); if (e) { const c = card(e); out.chips[L] = { card: R(c.getBoundingClientRect()), status: R([...c.querySelectorAll('*')].find(x => x.children.length === 0 && /Available|coverage|Clear|Present|Nearby|Not found/.test(x.textContent))?.getBoundingClientRect() || c.getBoundingClientRect()), lines: [...c.querySelectorAll('*')].filter(x => x.children.length === 0).map(x => x.textContent.trim()) }; } }
    const rangeRect = (re) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const m = n.textContent.match(re); if (m) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); return [...r.getClientRects()].map(R); } } return null; };
    out.text.notLim = rangeRect(/Not a substitute for a LIM, PIM or engineering advice\\.?/);
    out.text.indicativeBlock = (() => { const e = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /^Indicative only/.test(e.textContent)); return e ? R(e.getBoundingClientRect()) : null; })();
    out.text.indicativeFull = (() => { const e = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /^Indicative only/.test(e.textContent)); return e ? e.textContent.trim() : null; })();
    out.text.address = rangeRect(/474 Great North Road, Grey Lynn, Auckland/g) ;
    out.text.area = rangeRect(/6,552 m/);
    out.text.legal = (() => { const e = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /^Allot 41/.test(e.textContent)); return e ? R(e.getBoundingClientRect()) : null; })();
    out.text.zone = rangeRect(/Open Space - Community Zone/);
    out.text.council = (() => { const z = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /Open Space - Community Zone/.test(e.textContent)); const p = z && z.parentElement; const c = p && [...p.childNodes].find(n => n.nodeType === 3 ? /Auckland/.test(n.textContent) : n !== z && /^Auckland$/.test(n.textContent.trim())); if (!c) return null; const r = document.createRange(); r.selectNodeContents(c); return R(r.getBoundingClientRect()); })();
    out.text.services = rangeRect(/^Services$/i); out.text.hazards = rangeRect(/^Hazards$/i);
    out.text.input = R(document.querySelector("input[placeholder^='e.g. 12 Queen']").getBoundingClientRect());
    const cb = [...document.querySelectorAll('a,button')].find(e => /Create project here/.test(e.textContent)); out.text.create = cb ? R(cb.getBoundingClientRect()) : null;
    const map = [...document.querySelectorAll('div')].find(d => (d.className || '').toString().includes('gm-style')); out.map = map ? R(map.getBoundingClientRect()) : null;
    return out;
  })()`);
  fs.writeFileSync(path.join(outDir, 'rects.json'), JSON.stringify(rects, null, 1));
  const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: Y0, width: W, height: Y1 - Y0, scale: 1 } });
  fs.writeFileSync(path.join(outDir, 'plate.png'), Buffer.from(s.data, 'base64'));
  console.log('plate + rects →', outDir);
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
