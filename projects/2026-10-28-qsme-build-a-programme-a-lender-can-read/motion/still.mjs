#!/usr/bin/env node
// Hi-res element crops of PUBLIC qsme.build pages (no login, nothing typed), plus line boxes of a highlight phrase.
// Adapted from projects/2026-10-08-qsme-build-column-h/motion/still.mjs (same rules, element clips instead of the viewport).
// Copied 2026-10-04 from the why-bids project and extended with `upto`: the crop ends at the end of that phrase and
// any words after it inside the element are hidden before the screenshot (the same thing as cropping a sentence off).
//
//   node still.mjs <stills.json> <outDir>
// stills.json: { cssWidth, cssHeight, dpr, shots: [ { name, url, el: "js returning Element", pad: [t,r,b,l],
//                hl: "exact phrase to box", hl2?: "second phrase" } ] }
// Writes outDir/<name>.png and outDir/<name>.json ({ w, h, dpr, hl: [[x,y,w,h]…] in output pixels, relative to the crop }).
// The crop is the element only (plus padding), so nothing else on the page (nav menus, hero, mock-ups) is ever in frame.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [specFile, outDir] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
const cw = spec.cssWidth || 1440, ch = spec.cssHeight || 900, dpr = spec.dpr || 2;
fs.mkdirSync(outDir, { recursive: true });
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
  await send('Emulation.setDeviceMetricsOverride', { width: cw, height: ch, deviceScaleFactor: dpr, mobile: false });
  let cur = null;
  for (const s of spec.shots) {
    if (s.url !== cur) {
      events.length = 0;
      await send('Page.navigate', { url: s.url });
      for (let i = 0; i < 300 && !events.find(e => e.method === 'Page.loadEventFired'); i++) await sleep(100);
      await sleep(3000); cur = s.url;
      await evaluate("document.querySelectorAll('[class*=cookie],[id*=cookie],[class*=consent]').forEach(e=>e.style.setProperty('display','none','important'))");
    }
    const pad = s.pad || [24, 24, 24, 24];
    if (s.upto) {
      const ok = await evaluate(`(() => { const el = (${s.el}); if (!el) return 'no el'; const p = ${JSON.stringify(s.upto)};
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const nodes = []; let n; while ((n = tw.nextNode())) nodes.push(n);
        let hit = -1; for (let i = 0; i < nodes.length; i++) { const k = nodes[i].textContent.indexOf(p); if (k >= 0) { hit = i; const rest = nodes[i].splitText(k + p.length); nodes.splice(i + 1, 0, rest); break; } }
        if (hit < 0) return 'NOT FOUND';
        for (let i = hit + 1; i < nodes.length; i++) { const sp = document.createElement('span'); sp.style.visibility = 'hidden'; nodes[i].parentNode.insertBefore(sp, nodes[i]); sp.appendChild(nodes[i]); }
        return 'ok'; })()`);
      if (ok !== 'ok') throw new Error('upto ' + ok + ' for ' + s.name);
    }
    const r = await evaluate(`(() => { const el = (${s.el}); if (!el) return null; el.scrollIntoView({ block: 'center' });
      const b = el.getBoundingClientRect(); const x = b.left + scrollX - ${pad[3]}, y = b.top + scrollY - ${pad[0]}, w = b.width + ${pad[1] + pad[3]};
      let h = b.height + ${pad[0] + pad[2]};
      const upto = ${JSON.stringify(s.upto || '')};
      if (upto) { const tw2 = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let m; while ((m = tw2.nextNode())) { const i = m.textContent.indexOf(upto); if (i >= 0) { const rg = document.createRange(); rg.setStart(m, i); rg.setEnd(m, i + upto.length); const rs = [...rg.getClientRects()]; const last = rs[rs.length - 1]; h = last.bottom + scrollY - y + ${pad[2]}; break; } } }
      const boxes = p => { if (!p) return []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) { const i = n.textContent.indexOf(p); if (i >= 0) { const rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + p.length);
        return [...rg.getClientRects()].map(q => [q.left + scrollX - x, q.top + scrollY - y, q.width, q.height].map(v => Math.round(v * ${dpr}))); } } return 'NOT FOUND'; };
      return { x, y, w, h, hl: boxes(${JSON.stringify(s.hl || '')}), hl2: boxes(${JSON.stringify(s.hl2 || '')}), text: el.innerText.slice(0, 400) }; })()`);
    if (!r) throw new Error('element not found for ' + s.name);
    await sleep(700);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 } });
    fs.writeFileSync(path.join(outDir, s.name + '.png'), Buffer.from(shot.data, 'base64'));
    const meta = { url: s.url, captured: new Date().toISOString(), dpr, w: Math.round(r.w * dpr), h: Math.round(r.h * dpr), hl: r.hl, hl2: r.hl2, text: r.text };
    fs.writeFileSync(path.join(outDir, s.name + '.json'), JSON.stringify(meta, null, 1));
    console.log(s.name, meta.w + 'x' + meta.h, 'hl', JSON.stringify(r.hl), JSON.stringify(r.hl2));
    console.log('   text:', r.text.replace(/\n/g, ' | ').slice(0, 300));
  }
  ws.close();
} catch (e) { console.error('FAILED:', e.message); code = 1; }
finally { chrome.kill(); await sleep(300); fs.rmSync(prof, { recursive: true, force: true }); }
process.exit(code);
