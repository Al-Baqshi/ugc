/* Action: chase painter (week 6) — QSME Global. One timeline for both cuts.
   chase-the-painter.html       → body.build.r4x5  (LinkedIn 4:5, safe box 60,60,1020,1290)
   chase-the-painter-9x16.html  → body.build.r9x16 (YouTube Shorts 9:16, safe box 65,300,1015,1250)
   Everything is a pure function of t. The schedule and the printout are recreations (demo data) until
   the owner's Session B recordings replace them; see post.md → "Owner recordings to swap in". */
(function () {
'use strict';
const R9 = document.body.classList.contains('r9x16');
const LABEL = 'Illustrative — swap for real QSME screen (demo data)';
const E = Kit.ease;
const clamp = v => Math.max(0, Math.min(1, v));
const ez = (t, t0, t1, e) => (E[e || 'inOut'])(clamp((t - t0) / (t1 - t0)));
const $ = s => document.querySelector(s);

/* layout numbers that differ between the cuts (everything else is CSS) */
const L = R9 ? {
  capA: 330, capB: 414, capC: 498, zx: 40, zy: 580, labelY: 1468, plabelY: 1478,
  docTop: 600, paperX: 90, paperY: 600, zoomF: [900, 1180], pdfF: [540, 1060], pdfFin: [540, 1010]
} : {
  capA: 96, capB: 180, capC: 264, zx: 40, zy: 318, labelY: 1196, plabelY: 1238,
  docTop: 360, paperX: 90, paperY: 382, zoomF: [900, 932], pdfF: [540, 820], pdfFin: [540, 770]
};

/* ------------------------------------------------------------------ the minutes (generic, unbranded) */
const WEEKS = [
  { d: 'Mon 28 Sep 2026', a: ['3.1', 'Inductions for the fit-out crews', 'Site', 'Closed'], b: ['4.3', 'Window reveal detail to confirm', 'Arch', 'Open'] },
  { d: 'Mon 5 Oct 2026', a: ['3.2', 'Skip swap moved to Thursday', 'Site', 'Closed'], b: ['4.3', 'Window reveal detail to confirm', 'Arch', 'Closed'] },
  { d: 'Mon 12 Oct 2026', a: ['3.3', 'Gate code changed, tell everyone', 'Site', 'Closed'], b: ['4.4', 'Tile selection from the client', 'Client', 'Open'] },
  { d: 'Mon 19 Oct 2026', a: ['3.4', 'Scaffold down, east elevation', 'Site', 'Closed'], b: ['4.4', 'Tile selection from the client', 'Client', 'Closed'] },
  { d: 'Mon 26 Oct 2026', a: ['3.5', 'Hoarding panel replaced', 'Site', 'Closed'], b: ['4.5', 'Benchtop template booked', 'PM', 'Open'] },
  { d: 'Mon 2 Nov 2026', a: ['3.6', 'Drainage as-builts to engineer', 'Site', 'Closed'], b: ['4.5', 'Benchtop template booked', 'PM', 'Closed'] },
];
/* six biro underlines, a little messier each week; the sixth is drawn live by the pen */
const UL = [
  ['M -4 4 C 120 1, 300 7, 468 3', 3.2],
  ['M 2 13 C 140 10, 320 16, 462 10', 3.4],
  ['M -6 21 C 90 18, 260 25, 470 19 C 474 19, 476 20, 471 22', 3.6],
  ['M 4 29 C 160 26, 300 33, 466 27', 3.8],
  ['M -2 38 C 110 34, 280 42, 474 35', 4.0],
  ['M -4 47 C 150 43, 330 51, 476 44', 4.4],
];
const PITCH = 560;
const PEN = (s) => `<g transform="scale(${s})"><g transform="rotate(34)">
  <path d="M0 0 L16 -6.5 L16 6.5 Z" fill="#8E8E8E"/><path d="M0 0 L5 -2 L5 2 Z" fill="#2747A0"/>
  <rect x="15" y="-9.5" width="50" height="19" rx="5" fill="#2747A0" opacity=".9"/>
  <rect x="62" y="-9" width="196" height="18" rx="6" fill="#F4F3EF" stroke="#CFCDC6" stroke-width="1.5"/>
  <rect x="68" y="-2" width="182" height="4" rx="2" fill="#2747A0" opacity=".45"/>
  <rect x="246" y="-10.5" width="24" height="21" rx="6" fill="#2747A0"/>
  <rect x="160" y="-15" width="76" height="7" rx="3.5" fill="#1F3C86"/></g></g>`;

function page(k) {
  const w = WEEKS[k - 1], n = k === 6 ? 5 : k - 1;
  const lines = UL.slice(0, n).map(u => `<path d="${u[0]}" stroke-width="${u[1]}"/>`).join('');
  const live = k === 6 ? `<path id="ul6" d="${UL[5][0]}" stroke-width="${UL[5][1]}"/><g id="pen">${PEN(1)}</g>` : '';
  const bang = k === 4 ? '<div class="bang">!</div>' : k === 5 ? '<div class="bang">!!</div>' : k === 6 ? '<div class="bang">!!!</div>' : '';
  return `<div class="pg" style="top:${(k - 1) * PITCH}px">
    <div class="top"><span>Progress meeting · minutes</span><span>Riverside Terraces — Stage 2</span></div>
    <div class="ttl"><b>Week ${k}</b><span>${w.d}</span></div>
    <div class="rule"></div>
    <div class="tr th"><i>Item</i><i>Action</i><i>By</i><i>Status</i></div>
    <div class="tr fd"><i>${w.a[0]}</i><i>${w.a[1]}</i><i>${w.a[2]}</i><i>${w.a[3]}</i></div>
    <div class="tr key"><i>4.2</i><i><span class="hl">Chase painter (1 week late)</span></i><i>PM</i><i class="st">Open</i>
      <svg class="ul" viewBox="0 0 500 70">${lines}${live}</svg>${bang}</div>
    <div class="tr fd"><i>${w.b[0]}</i><i>${w.b[1]}</i><i>${w.b[2]}</i><i>${w.b[3]}</i></div>
  </div>`;
}

/* ------------------------------------------------------------------ the programme (demo data) */
const DW = 658 / 32, RH = 76, BH = 30;
const D0 = Date.UTC(2026, 9, 29);                       // Thu 29 Oct 2026 = day 0 of the visible window
const day = (m, d) => Math.round((Date.UTC(2026, m - 1, d) - D0) / 864e5);
const dow = i => (4 + i) % 7;                           // 0 Sun … 6 Sat
const xs = i => i * DW;
const yc = r => (r - 0.5) * RH;
const TASKS = [
  { id: 'pb', name: 'Plasterboard', sub: '10 days', s: day(10, 19), e: day(10, 30), st: 'done' },
  { id: 'jo', name: 'Joinery install', sub: '5 days', s: day(10, 28), e: day(11, 3), st: 'onsite' },
  { id: 'sw', name: 'Switchboard delivery', sub: '10 days', s: day(11, 2), e: day(11, 13), chain: 1, label: '2-13 Nov · 10 days' },
  { id: 'pa', name: 'Painting', sub: '5 days', s: day(11, 2), e: day(11, 6) },
  { id: 'ef', name: 'Electrical fit-off', sub: '5 days', s: day(11, 16), e: day(11, 20), chain: 1 },
  { id: 'co', name: 'Commissioning', sub: '2 days', s: day(11, 23), e: day(11, 24), chain: 1 },
  { id: 'fc', name: 'Final clean', sub: '1 day', s: day(11, 25), e: day(11, 25), chain: 1 },
  { id: 'ho', name: 'Handover', sub: 'Milestone', s: day(11, 26), e: day(11, 26), chain: 1, ms: 1 },
];
const ROW = {}; TASKS.forEach((k, i) => ROW[k.id] = i + 1);
const LINKS = [
  { a: 'sw', b: 'ef', chain: 1, on: 11.62 }, { a: 'ef', b: 'co', chain: 1, on: 11.8 },
  { a: 'co', b: 'fc', chain: 1, on: 11.96 }, { a: 'fc', b: 'ho', chain: 1, on: 12.1 },
  { a: 'pa', b: 'fc', src: 1 },
];
const RING_ON = { sw: 11.5, ef: 11.68, co: 11.86, fc: 12.02, ho: 12.16 };
const COL = { planned: '#64748B', onsite: '#16A34A', done: '#065F46' };
const TICK = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* the whole programme at time t: the two drags are the only things that change it */
function stateAt(t) {
  const S = {};
  TASKS.forEach(k => { S[k.id] = { s: k.s, e: k.e }; });
  const pd = 7 * ez(t, 15.45, 16.2, 'inOut');                         // Painting: a week later (2-6 → 9-13 Nov)
  S.pa.s += pd; S.pa.e += pd;
  const fd = ez(t, 19.8, 20.12, 'inOut');                             // Electrical fit-off: one day later
  S.ef.s += fd; S.ef.e += fd + 2 * ez(t, 20.16, 20.3, 'out');         // 17-23 Nov: it now spans the weekend
  [['co', 20.22], ['fc', 20.3], ['ho', 20.38]].forEach(([id, t0]) => { const k = ez(t, t0, t0 + 0.16, 'out'); S[id].s += k; S[id].e += k; });
  return S;
}
function barBox(S, id) {
  const k = S[id], r = ROW[id];
  if (TASKS[r - 1].ms) { const cx = xs(k.s) + DW / 2; return { x: cx - 12, y: yc(r) - 12, w: 24, h: 24, cx, cy: yc(r) }; }
  const x = xs(k.s) + 1, w = (k.e - k.s + 1) * DW - 2;
  return { x, y: yc(r) - BH / 2, w, h: BH, cx: x + w / 2, cy: yc(r) };
}
function poly(P, r) {
  r = r == null ? 7 : r;
  const f = v => v.toFixed(1);
  let d = `M${f(P[0][0])} ${f(P[0][1])}`;
  for (let i = 1; i < P.length - 1; i++) {
    const [ax, ay] = P[i - 1], [bx, by] = P[i], [cx, cy] = P[i + 1];
    const l1 = Math.hypot(bx - ax, by - ay) || 1, l2 = Math.hypot(cx - bx, cy - by) || 1, rr = Math.min(r, l1 / 2, l2 / 2);
    d += ` L${f(bx - (bx - ax) / l1 * rr)} ${f(by - (by - ay) / l1 * rr)} Q${f(bx)} ${f(by)} ${f(bx + (cx - bx) / l2 * rr)} ${f(by + (cy - by) / l2 * rr)}`;
  }
  const Z = P[P.length - 1]; return d + ` L${f(Z[0])} ${f(Z[1])}`;
}
function head(P, size) {   // arrowhead at the last point, pointing along the last segment
  const [ax, ay] = P[P.length - 2], [bx, by] = P[P.length - 1], l = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / l, uy = (by - ay) / l;
  const w = size * 0.62, p = [bx - ux * size, by - uy * size];
  return `M${(bx).toFixed(1)} ${(by).toFixed(1)} L${(p[0] - uy * w).toFixed(1)} ${(p[1] + ux * w).toFixed(1)} L${(p[0] + uy * w).toFixed(1)} ${(p[1] - ux * w).toFixed(1)} Z`;
}
function route(S, lk) {
  const A = barBox(S, lk.a), B = barBox(S, lk.b), x0 = A.x + A.w + 1, y0 = A.cy;
  if (lk.src) { const xm = x0 + 12; return [[x0, y0], [xm, y0], [xm, B.cy], [B.x - 2, B.cy]]; }
  const ms = TASKS[ROW[lk.b] - 1].ms;
  if (ms) return [[x0, y0], [B.cx, y0], [B.cx, B.cy - 19]];
  if (B.x - x0 < 24) { const xm = Math.min(x0 + 9, B.x + B.w / 2); return [[x0, y0], [xm, y0], [xm, B.y - 3]]; }
  const xm = B.x - 13; return [[x0, y0], [xm, y0], [xm, B.cy], [B.x - 2, B.cy]];
}

/* ------------------------------------------------------------------ markup */
const CURSOR = '<svg class="cursor" id="cur" viewBox="0 0 34 48"><path d="M4 3 L4 37 L12.5 29 L18 42.5 L24 40 L18.5 27 L29.5 27 Z" fill="#111" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>';
const VIEWIC = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/><circle cx="16" cy="7" r="2.4" fill="none" stroke="#0F172A" stroke-width="2.2"/><circle cx="10" cy="17" r="2.4" fill="none" stroke="#0F172A" stroke-width="2.2"/></svg>';
const CAL = '<svg width="22" height="22" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="#16A34A" stroke-width="2.2"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round"/></svg>';
const CK = '<svg width="26" height="26" viewBox="0 0 26 26" style="position:absolute;left:-2px;top:-2px"><path d="M7 13.5l4 4 8-9" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const L3 = 'MON TUE WED THU FRI SAT SUN'.split(' ');

let dayHead = '', weCols = '';
for (let i = 0; i < 32; i++) {
  const w = dow(i), we = w === 0 || w === 6, dd = new Date(D0 + i * 864e5).getUTCDate(), today = i === day(11, 2);
  dayHead += `<div class="dh${we ? ' we' : ''}${today ? ' today' : ''}" style="left:${xs(i).toFixed(1)}px;width:${DW.toFixed(1)}px"><small>${'SMTWTFS'[w]}</small><b>${dd}</b></div>`;
  if (we) weCols += `<div class="we-col" style="left:${xs(i).toFixed(1)}px;width:${DW.toFixed(1)}px"></div>`;
}
const names = TASKS.map((k, i) => `<div class="nm" style="top:${i * RH}px"><div class="n">${i + 1}</div><div><b>${k.name}</b><small>${k.sub}</small></div></div>`).join('');
const rowLines = TASKS.map((k, i) => `<div class="rowline" style="top:${(i + 1) * RH}px"></div>`).join('');
const bars = TASKS.map(k => k.ms
  ? `<div class="dring" id="rg-${k.id}"></div><div class="dia" id="b-${k.id}"></div>`
  : `${k.chain ? `<div class="ring" id="rg-${k.id}"></div>` : ''}<div class="bar" id="b-${k.id}" style="background:${COL[k.st || 'planned']}">${k.st === 'done' ? TICK : ''}${k.label ? `<span>${k.label}</span>` : ''}</div>`).join('');
const arrowEls = LINKS.map((lk, i) => `<path id="ag${i}" stroke="#9CA3AF" stroke-width="2"/><path id="agh${i}" fill="#9CA3AF" stroke="none"/>` +
  (lk.chain ? `<path id="ap${i}" stroke="#A855F7" stroke-width="5"/><path id="aph${i}" fill="#A855F7" stroke="none"/>` : '')).join('');

/* the A4 printout (recreated): one page of "Construction programme" with demo data */
const PG = { x0: 286, w: 546, d0: day(10, 19), n: 42 };        // printed chart: 19 Oct → 29 Nov
const pxs = i => PG.x0 + (i - PG.d0) * PG.w / PG.n;
const PROWS = [
  ['g', 'Insulation & linings'], ['t', 'pb', 'Plasterboard', '19-30 Oct'],
  ['g', 'Fit-out & joinery'], ['t', 'jo', 'Joinery install', '28 Oct-3 Nov'],
  ['g', 'Electrical'], ['t', 'sw', 'Switchboard delivery', '2-13 Nov'], ['t', 'ef', 'Electrical fit-off', '16-20 Nov'], ['t', 'co', 'Commissioning', '23-24 Nov'],
  ['g', 'Painting'], ['t', 'pa', 'Painting', '2-6 Nov'],
  ['g', 'Other'], ['t', 'fc', 'Final clean', '25 Nov'], ['t', 'ho', 'Handover', '26 Nov'],
];
let gantt = `<div class="gm" style="left:${pxs(day(10, 19))}px">October</div><div class="gm" style="left:${pxs(day(11, 2))}px">November</div>`;
for (let i = PG.d0; i < PG.d0 + PG.n; i += 7) gantt += `<div class="gw" style="left:${pxs(i).toFixed(1)}px"></div>`;
gantt += `<div class="gw" style="left:${pxs(day(11, 2)).toFixed(1)}px;width:2px;background:#16A34A"></div>`;
PROWS.forEach((r, i) => {
  const y = 26 + i * 24;
  if (r[0] === 'g') { gantt += `<div class="gl gh" style="top:${y + 6}px">${r[1]}</div>`; return; }
  const k = TASKS.find(x => x.id === r[1]);
  gantt += `<div class="gl" style="top:${y + 5}px">${r[2]}<span>${r[3]}</span></div>`;
  if (k.ms) {
    const cx = (pxs(k.s) + pxs(k.s + 1)) / 2;
    gantt += `<div class="gr" style="left:${cx - 9}px;top:${y + 1}px;width:18px;height:18px;transform:rotate(45deg)"></div><div class="gb" style="left:${cx - 5}px;top:${y + 5}px;width:10px;height:10px;background:#64748B;transform:rotate(45deg);border-radius:2px"></div><div class="gd" style="left:${cx + 14}px;top:${y + 6}px">${r[3]}</div>`;
  } else {
    const x = pxs(k.s) + 0.5, w = pxs(k.e + 1) - pxs(k.s) - 1;
    if (k.chain) gantt += `<div class="gr" style="left:${x - 4}px;top:${y + 3}px;width:${w + 8}px;height:18px"></div>`;
    gantt += `<div class="gb" style="left:${x}px;top:${y + 7}px;width:${w}px;background:${COL[k.st || 'planned']}"></div><div class="gd" style="left:${x + w + 8}px;top:${y + 7}px">${r[3]}</div>`;
  }
});

const CUP = `<svg width="290" height="290" viewBox="0 0 290 290">
  <defs><radialGradient id="lidg" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4E2DB"/></radialGradient>
  <filter id="cupsh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>
  <circle cx="160" cy="166" r="122" fill="#000" opacity=".55" filter="url(#cupsh)"/>
  <circle cx="145" cy="145" r="124" fill="#C9A47A"/>
  <circle cx="145" cy="145" r="118" fill="url(#lidg)" stroke="#CFCCC4" stroke-width="2"/>
  <circle cx="145" cy="145" r="100" fill="none" stroke="#D9D6CE" stroke-width="5"/>
  <circle cx="145" cy="145" r="72" fill="none" stroke="#E2DFD8" stroke-width="3"/>
  <rect x="112" y="44" width="66" height="17" rx="8.5" fill="#3A3330"/>
  <text x="145" y="168" text-anchor="middle" font-family="Permanent Marker" font-size="46" fill="#1C1C1E" transform="rotate(-10 145 150)">PAINTER</text>
  <path d="M86 190 C 120 182, 170 184, 206 176" fill="none" stroke="#1C1C1E" stroke-width="4" stroke-linecap="round" transform="rotate(-10 145 150)"/></svg>`;

document.getElementById('root').innerHTML = `
<svg width="0" height="0" style="position:absolute"><defs><filter id="grainf"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .9 0"/></filter></defs></svg>

<!-- S1 HOOK: six weeks of the same minutes -->
<div id="s1" class="fill">
  <div id="docv" class="abs"><div id="doc">${[1, 2, 3, 4, 5, 6].map(page).join('')}</div></div>
  <div id="docfade" class="abs"></div>
  <div id="h-week" class="abs">Week 6 minutes.</div>
  <div id="h-act" class="abs display">Action: chase painter.</div>
  <div id="h-again" class="abs">(Again.)</div>
</div>

<!-- S2 THE LEDGER: what six weeks of minutes recorded -->
<div id="s2" class="fill">
  <div id="ledger" class="abs">
    <div class="lt">Minutes · actions carried forward</div>
    <div class="lr h"><i style="padding-left:10px">Week</i><i>Action</i><i>Practical completion</i></div>
    ${[1, 2, 3, 4, 5, 6].map(k => `<div class="lr" id="lr${k}"><i class="wk">${k}</i><i class="ac"><span class="hl">Chase painter (1 week late)</span></i><i class="pc"><b class="tint" id="tn${k}" style="background:${k < 5 ? '#DDF3DE' : '#FDE1DF'}"></b><span id="pc${k}">Fri 13 Nov</span></i></div>`).join('')}
  </div>
  <div id="plus9" class="abs">+9 working days</div>
  <div id="c2a" class="cap" style="top:${L.capA}px">Painter: 1 week late.</div>
  <div id="c2b" class="cap" style="top:${L.capB}px">Finish date: <span class="g">didn’t move.</span></div>
  <div id="c3a" class="cap" style="top:${L.capA}px">Something else moved it.</div>
  <div id="c3b" class="cap" style="top:${L.capB}px"><span class="r">Nobody minuted that.</span></div>
</div>

<!-- S3 PRODUCT: the schedule, recreated with demo data until Session B -->
<div id="s3" class="fill">
  <img id="logo1" class="abs" src="qsme-logo-nor.svg" alt="QSME">
  <div id="how" class="abs"><span>View → Show → <b>What drives the finish date</b></span></div>
  <div id="zclip" class="abs" style="left:${L.zx}px;top:${L.zy}px;width:1000px;height:862px;overflow:hidden;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.55)">
   <div id="zoom" class="abs">
    <div id="screen" class="abs" style="left:0;top:0" data-qa-ignore>
      <div class="seg" style="left:16px"><i class="on">Timeline</i><i>List</i><i>All projects</i></div>
      <div class="seg" style="left:378px"><i class="on">Day</i><i>Week</i><i>Month</i><i>Year</i></div>
      <div id="viewbtn">${VIEWIC}View<div id="viewdot"></div></div>
      <div id="card">
        <div id="lhead">${CAL}October → November</div>
        <div id="days">${dayHead}</div>
        <div id="names">${names}</div>
        <div id="body">
          ${weCols}${rowLines}<div id="todayln" style="left:${(xs(day(11, 2)) + DW / 2 - 1).toFixed(1)}px"></div>
          <svg id="arrows" width="658" height="608">${arrowEls}</svg>
          ${bars}
          <div class="dragring" id="dr"></div>
          <svg id="biro" width="10" height="10"><path id="biro-p" d=""/></svg>
          <div class="tag wk" id="tg-wk">1 week late</div>
          <div class="tag bad" id="tg-dl">1 day late</div>
          <div class="fin" id="fin"><small>Finish</small><span id="fin-a">Thu 26 Nov</span><span id="fin-b">Fri 27 Nov</span></div>
          <div class="tag ok" id="tg-ok">didn’t move ✓</div>
          <div class="tag bad" id="tg-p1">+1 day</div>
        </div>
      </div>
      <div id="key">
        <div class="kl"><span><i class="sw" style="background:#64748B"></i>Grey — Planned</span><span><i class="sw" style="background:#16A34A"></i>Green — On site</span><span><i class="sw" style="background:#065F46"></i>Dark green — Finished</span></div>
        <div class="kl" id="key2"><span><i class="rg"></i>Purple — This task drives the finish date.</span></div>
      </div>
      <div id="menu">
        <h6>Colour the bars by</h6><div class="mseg"><i>Trade</i><i class="on">Status</i></div>
        <h6>Show</h6>
        <div class="ck"><div class="bx on">${CK}</div>Arrows between linked tasks</div>
        <div class="ck" id="ck-chain" style="position:relative;z-index:0"><div id="ck-chain-hl"></div><div class="bx" id="bx-chain"><div id="bx-chain-on">${CK}</div></div>What drives the finish date</div>
      </div>
      <div class="toast" id="toast1">1 moved<b>Undo</b></div>
      <div class="toast" id="toast2">1 moved — 3 that follow it came too<b>Undo</b></div>
      ${CURSOR}
    </div>
   </div>
  </div>
  <div class="ill" id="ill1" style="left:60px;top:${L.labelY}px">${LABEL}</div>
  <div id="c4" class="cap" style="top:${L.capA}px"><span class="pu">Purple</span> decides your finish date.</div>
  <div id="c5" class="cap" style="top:${L.capA}px">Our painter? <span class="gy">Grey.</span></div>
  <div id="c6" class="cap" style="top:${L.capA}px"><span class="gy">Grey</span> has room to move.</div>
  <div id="c7a" class="cap" style="top:${L.capA}px"><span class="pu">Purple</span> slips a day,</div>
  <div id="c7b" class="cap" style="top:${L.capB}px">the finish slips a day.</div>
</div>

<!-- S4 THE PRINTOUT on a desk, then the coffee -->
<div id="s4" class="fill">
  <div id="desk" class="fill"><svg id="grain" width="100%" height="100%"><rect width="100%" height="100%" filter="url(#grainf)"/></svg></div>
  <svg id="deskpen" class="abs" width="420" height="160" viewBox="-10 -40 420 160">${PEN(1.45)}</svg>
  <div id="paperwrap" class="abs" style="left:${L.paperX}px;top:${L.paperY}px" data-qa-ignore>
    <div id="paper">
      <div class="pt">Construction programme</div>
      <div class="pm">Riverside Terraces — Stage 2 · 8 tasks · as at 2 November 2026</div>
      <div class="lh"><div class="mk">DB</div><div><b>Demo Building Co.</b><small>Reg. no. 12 345 678 901</small></div></div>
      <div class="boxes">
        <div class="bxx"><small>ON SITE FROM</small><b>19 Oct 2026</b></div>
        <div class="bxx"><small>FINISHES</small><b>26 Nov 2026</b></div>
        <div class="bxx"><small>HOW LONG</small><b>6 weeks</b></div>
        <div class="bxx"><small>TASKS</small><b>8</b></div>
        <div class="bxx"><small>NEXT MILESTONE</small><b>Handover · 26 Nov</b></div>
      </div>
      <div class="sent">
        <p><i class="ri"></i><b>What drives the finish date:</b> 5 linked tasks, ringed in purple, ending with Handover on 26 November 2026.</p>
        <p><span id="hlsent"><span id="hlbar"></span>Any one of them running late moves the whole finish.</span> Anything not ringed has room to move without changing it.</p>
      </div>
      <div class="lg"><span><i style="width:9px;height:9px;background:#64748B;transform:rotate(45deg);border-radius:1px"></i>Milestone</span><span><i style="width:18px;height:10px;border:2px solid #A855F7;border-radius:4px"></i>Purple ring: drives the finish date</span><span><i style="width:18px;height:10px;border:1.5px solid #1C1C1E;border-radius:3px"></i>Outline: the dates already agreed</span></div>
      <div id="gantt">${gantt}</div>
    </div>
  </div>
  <div id="cup" class="abs">${CUP}</div>
  <div class="ill" id="ill2" style="left:60px;top:${L.plabelY}px">${LABEL}</div>
  <div id="c8a" class="cap sm" style="top:${L.capA - 14}px">QSME calls it “What drives the finish date”.</div>
  <div id="c8b" class="cap" style="top:${L.capB + 18}px">You can call it the critical path.</div>
  <div id="c9" class="cap big" style="top:${L.capA + 20}px">We owe the painter a coffee.</div>
</div>

<!-- S5 END CARD -->
<div id="s5" class="fill">
  <img id="bgdone" class="abs" alt="">
  <div id="enddim" class="fill"></div>
  <img id="logo2" class="abs" src="qsme-logo-nor.svg" alt="QSME">
  <div id="endline" class="abs display">Chase the<br>right delay.</div>
  <div id="endpill" class="abs"><span class="pill">Book a 30-minute demo</span></div>
  <div id="endurl" class="abs">qsme.build</div>
</div>`;

/* ------------------------------------------------------------------ timeline */
const DUR = 32.6;
Kit.scene('#s1', 0, 3.12).scene('#s2', 2.95, 10.4).scene('#s3', 9.95, 23.25).scene('#s4', 22.85, 29.9).scene('#s5', 29.6, DUR + 1);

/* S1 hook (0–3.0): frame 0 already carries the whole text hook */
const scrollKeys = [[0, 20]];
[0.3, 0.62, 0.94, 1.26, 1.58].forEach((t0, i) => { scrollKeys.push([t0, 20 - i * PITCH]); scrollKeys.push([t0 + 0.2, 20 - (i + 1) * PITCH, 'swipe']); });
Kit.add('#doc', 'y', scrollKeys);
const blurKeys = [[0, 0]];
[0.3, 0.62, 0.94, 1.26, 1.58].forEach(t0 => { blurKeys.push([t0, 0]); blurKeys.push([t0 + 0.08, 5]); blurKeys.push([t0 + 0.2, 0]); });
Kit.add('#doc', 'blur', blurKeys);
Kit.add('#h-again', 'rotate', [[0, -5], [2.66, -5], [2.74, -9, 'out'], [2.86, -5, 'out']]);   // a little jolt as the sixth line lands
Kit.add('#h-again', 'scale', [[2.66, 1], [2.74, 1.1, 'out'], [2.9, 1, 'out']]);
Kit.add('#ul6', 'trim', [[2.12, 0], [2.6, 1, 'inOut']]);
Kit.add('#pen', 'opacity', [[1.86, 0], [1.96, 1], [2.78, 1], [2.92, 0]]);
['#h-week', '#h-act', '#h-again'].forEach((s, i) => Kit.add(s, 'y', [[2.9 + i * 0.03, 0], [3.1 + i * 0.03, -70, 'in']]).out(s, 2.92 + i * 0.03, 0.14));
Kit.add('#docv', 'y', [[2.9, 0], [3.12, -120, 'in']]).out('#docv', 2.92, 0.18);

/* S2 ledger (3.0–10.0) */
Kit.add('#ledger', 'y', [[2.95, 90], [3.25, 0, 'out']]).fade('#ledger', 2.95, 3.1);
[1, 2, 3, 4, 5, 6].forEach(k => Kit.pop('#lr' + k, 3.02 + k * 0.07, { dy: 24, dur: 0.2 }));
Kit.pop('#c2a', 3.15).pop('#c2b', 4.45).out('#c2a', 6.85).out('#c2b', 6.85);
[1, 2, 3, 4].forEach(k => Kit.add('#tn' + k, 'opacity', [[4.45 + k * 0.06, 0], [4.65 + k * 0.06, 1, 'out']]));
[1, 2, 3, 4, 5, 6].forEach(k => Kit.add('#tn' + k, 'opacity', k > 4 ? [[0, 0], [7.0, 0], [7.2, 1, 'out']] : [[6.85, 1], [7.1, 0.35]]));
const WD = ['Fri 13 Nov', 'Mon 16 Nov', 'Tue 17 Nov', 'Wed 18 Nov', 'Thu 19 Nov', 'Fri 20 Nov', 'Mon 23 Nov', 'Tue 24 Nov', 'Wed 25 Nov', 'Thu 26 Nov'];
const fmtD = v => WD[Math.max(0, Math.min(9, Math.round(v)))];
Kit.count('#pc5', [[7.0, 0], [7.85, 9, 'out']], fmtD).count('#pc6', [[7.1, 0], [7.95, 9, 'out']], fmtD);
Kit.add('#pc5', 'color', [[7.0, '#1C1C1E'], [7.2, '#B42318']]).add('#pc6', 'color', [[7.1, '#1C1C1E'], [7.3, '#B42318']]);
Kit.fade('#plus9', 7.98, 8.06).add('#plus9', 'scale', [[7.98, 1.5], [8.12, 1, 'slam']]).add('#plus9', 'rotate', [[7.98, -12], [8.12, -4, 'out']]);
Kit.pop('#c3a', 7.3).pop('#c3b', 8.35).out('#c3a', 9.85).out('#c3b', 9.85);
Kit.add('#ledger', 'x', [[9.95, 0], [10.3, -1100, 'swipe']]).add('#plus9', 'x', [[9.95, 0], [10.3, -1100, 'swipe']]);

/* S3 product (10.0–22.9) */
Kit.add('#zclip', 'x', [[9.95, 1100], [10.3, 0, 'swipe']]);
Kit.add('#ill1', 'x', [[9.95, 1100], [10.3, 0, 'swipe']]);
Kit.pop('#logo1', 10.15, { dy: 16 }).pop('#how', 10.28, { dy: 16 }).out('#logo1', 11.42).out('#how', 11.42);
Kit.add('#menu', 'opacity', [[0, 0], [10.76, 0], [10.86, 1, 'out'], [11.36, 1], [11.5, 0]]).add('#menu', 'scale', [[10.76, 0.96], [10.9, 1, 'out']]);
Kit.add('#ck-chain-hl', 'opacity', [[0, 0], [10.98, 0], [11.06, 1]]);
Kit.add('#bx-chain-on', 'opacity', [[0, 0], [11.16, 0], [11.2, 1]]).add('#bx-chain-on', 'scale', [[11.16, 0.6], [11.28, 1, 'outBack']]);
Kit.add('#viewdot', 'opacity', [[0, 0], [11.2, 0], [11.3, 1]]);
Kit.add('#key2', 'opacity', [[0, 0], [11.5, 0], [11.7, 1, 'out']]);
Kit.add('#rg-ho', 'rotate', [[0, 45]]);
Object.entries(RING_ON).forEach(([id, t0]) => { Kit.add('#rg-' + id, 'opacity', [[0, 0], [t0, 0], [t0 + 0.1, 1]]).add('#rg-' + id, 'scale', [[t0, 1.3], [t0 + 0.22, 1, 'out']]); });
LINKS.forEach((lk, i) => { if (lk.chain) { Kit.add('#ap' + i, 'trim', [[lk.on, 0], [lk.on + 0.16, 1, 'out']]); Kit.add('#aph' + i, 'opacity', [[0, 0], [lk.on + 0.14, 0], [lk.on + 0.17, 1]]); } });
Kit.pop('#c4', 11.55).out('#c4', 13.2);
Kit.add('#fin', 'opacity', [[0, 0], [12.35, 0], [12.5, 1, 'out']]).add('#fin', 'scale', [[12.35, 0.85], [12.55, 1, 'outBack']]);
Kit.show('#fin-a', 0, 20.5).show('#fin-b', 20.5);
Kit.pop('#c5', 13.3).out('#c5', 14.82);
Kit.add('#biro-p', 'trim', [[13.36, 0], [13.78, 1, 'inOut']]).out('#biro', 14.85, 0.2);
// grey drag: Painting a week later; the finish does not move
Kit.pop('#c6', 14.95).out('#c6', 18.78);
Kit.add('#dr', 'opacity', [[0, 0], [15.38, 0], [15.42, 1], [16.24, 1], [16.28, 0], [19.64, 0], [19.68, 1], [20.14, 1], [20.18, 0]]);
Kit.add('#tg-wk', 'opacity', [[0, 0], [16.28, 0], [16.4, 1, 'out'], [18.72, 1], [18.86, 0]]).add('#tg-wk', 'scale', [[16.28, 0.8], [16.44, 1, 'outBack']]);
Kit.add('#tg-ok', 'opacity', [[0, 0], [16.5, 0], [16.62, 1, 'out'], [18.72, 1], [18.86, 0]]).add('#tg-ok', 'scale', [[16.5, 0.8], [16.66, 1, 'outBack']]);
Kit.add('#toast1', 'opacity', [[0, 0], [16.34, 0], [16.48, 1, 'out'], [18.62, 1], [18.78, 0]]).add('#toast1', 'y', [[16.34, 30], [16.5, 0, 'out']]);
// purple drag: Electrical fit-off one day later; the finish moves a day
const ZF = L.zoomF, zs = 1.32;
const zpx = ZF[0] - L.zx, zpy = ZF[1] - L.zy;
Kit.add('#zoom', 'scale', [[18.92, 1], [19.38, zs, 'inOut']]).add('#zoom', 'x', [[18.92, 0], [19.38, zpx * (1 - zs), 'inOut']]).add('#zoom', 'y', [[18.92, 0], [19.38, zpy * (1 - zs), 'inOut']]);
Kit.pop('#c7a', 19.0).pop('#c7b', 19.75).out('#c7a', 22.75).out('#c7b', 22.75);
Kit.add('#tg-dl', 'opacity', [[0, 0], [20.2, 0], [20.32, 1, 'out']]).add('#tg-dl', 'scale', [[20.2, 0.8], [20.36, 1, 'outBack']]);
Kit.add('#fin', 'scale', [[20.5, 1], [20.58, 1.14, 'out'], [20.74, 1, 'out']]);
Kit.add('#tg-p1', 'opacity', [[0, 0], [20.56, 0], [20.68, 1, 'out']]).add('#tg-p1', 'scale', [[20.56, 0.8], [20.72, 1, 'outBack']]);
Kit.add('#toast2', 'opacity', [[0, 0], [20.3, 0], [20.44, 1, 'out']]).add('#toast2', 'y', [[20.3, 30], [20.46, 0, 'out']]);
Kit.add('#zclip', 'opacity', [[22.85, 1], [23.1, 0]]).add('#zclip', 'scale', [[22.85, 1], [23.1, 0.92, 'in']]).out('#ill1', 22.85, 0.15);
Kit.add('#cur', 'opacity', [[0, 0], [10.3, 0], [10.4, 1]]);
Kit.add('#cur', 'scale', [[10.7, 1], [10.73, 0.82], [10.8, 1], [11.12, 1], [11.15, 0.82], [11.22, 1], [15.36, 1], [15.4, 0.86], [16.24, 0.86], [16.3, 1], [19.62, 1], [19.66, 0.86], [20.14, 0.86], [20.2, 1]]);

/* S4 the printout (22.9–27.6), then the coffee (27.6–29.6) */
Kit.fade('#desk', 22.85, 23.1).fade('#deskpen', 22.95, 23.2);
const pz = 2.2, P = [240, 214];
const PF = L.pdfF;
Kit.add('#paperwrap', 'x', [[22.98, 1150], [23.55, 0, 'out'], [23.78, 0], [24.4, PF[0] - L.paperX - pz * P[0], 'inOut'], [27.45, PF[0] - L.paperX - pz * P[0]], [27.95, 0, 'inOut']]);
Kit.add('#paperwrap', 'y', [[22.98, 60], [23.55, 0, 'out'], [23.78, 0], [24.4, PF[1] - L.paperY - pz * P[1], 'inOut'], [27.45, PF[1] - L.paperY - pz * P[1]], [27.95, 0, 'inOut']]);
Kit.add('#paperwrap', 'rotate', [[22.98, 9], [23.55, -1.5, 'out'], [23.78, -1.5], [24.4, 0, 'inOut'], [27.45, 0], [27.95, -1.5, 'inOut']]);
Kit.add('#paperwrap', 'scale', [[23.78, 1], [24.4, pz, 'inOut'], [27.45, pz], [27.95, 1, 'inOut']]);
Kit.add('#hlbar', 'clipX', [[24.5, 0], [24.95, 1, 'inOut']]);
Kit.pop('#c8a', 23.6).pop('#c8b', 25.35).out('#c8a', 27.42).out('#c8b', 27.42);
Kit.fade('#ill2', 23.5, 23.7);
Kit.pop('#c9', 27.72);
Kit.add('#cup', 'x', [[27.86, 460], [28.3, 0, 'out']]).add('#cup', 'y', [[27.86, 240], [28.3, 0, 'out']]).add('#cup', 'rotate', [[27.86, 50], [28.3, -6, 'out']]).fade('#cup', 27.86, 27.95);
Kit.add('#s4', 'opacity', [[29.6, 1], [29.86, 0]]);

/* S5 end card (29.6–32.6) */
Kit.clip('#bgdone', { dir: 'clips/done', t0: 29.6, fps: 30, frames: 102, ext: '.jpg' });
Kit.fade('#s5', 29.6, 29.86);
Kit.add('#bgdone', 'scale', [[29.6, 1.06], [DUR, 1]]);
Kit.fade('#logo2', 29.75, 30.0).add('#logo2', 'scale', [[29.75, 0.94], [30.1, 1, 'out']]);
Kit.pop('#endline', 29.92).pop('#endpill', 30.2).pop('#endurl', 30.34);

/* ------------------------------------------------------------------ per-frame geometry */
const els = {}; TASKS.forEach(k => { els[k.id] = $('#b-' + k.id); els['rg' + k.id] = $('#rg-' + k.id); });
const ag = LINKS.map((lk, i) => [$('#ag' + i), $('#agh' + i), $('#ap' + i), $('#aph' + i)]);
const SCR = { x: 16 + 300, y: 82 + 76 };      // #body origin inside #screen
function centreIn(el, stop) { let x = el.offsetWidth / 2, y = el.offsetHeight / 2; for (let n = el; n && n !== stop; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return [x, y]; }
let M = null;
function measure() {
  if (M) return M;
  const scr = $('#screen'); if (!$('#viewbtn').offsetWidth) return null;
  M = { view: centreIn($('#viewbtn'), scr), box: centreIn($('#bx-chain'), scr) };
  ['#toast1', '#toast2'].forEach(s => { const e = $(s); e.style.left = Math.round((1000 - e.offsetWidth) / 2) + 'px'; });
  M.fin = $('#fin').offsetWidth; M.ok = $('#tg-ok').offsetWidth; M.p1 = $('#tg-p1').offsetWidth; M.wk = $('#tg-wk').offsetWidth;
  return M;
}
/* cursor path in #screen coords; a point may be a function of the programme state (to follow a dragged bar) */
const onBar = id => S => { const b = barBox(S, id); return [SCR.x + b.cx + 6, SCR.y + b.cy + 4]; };
function curKeys(m) {
  return [
    [10.3, [560, 470]], [10.7, [m.view[0] + 4, m.view[1] + 6], 'inOut'], [10.8, [m.view[0] + 4, m.view[1] + 6]],
    [11.1, [m.box[0] + 6, m.box[1] + 6], 'inOut'], [11.4, [m.box[0] + 6, m.box[1] + 6]], [11.95, [470, 640], 'inOut'],
    [14.95, [470, 640]], [15.36, onBar('pa'), 'inOut'], [16.3, onBar('pa')], [16.9, [560, 660], 'inOut'],
    [19.2, [560, 660]], [19.62, onBar('ef'), 'inOut'], [20.2, onBar('ef')], [20.75, [760, 540], 'inOut'],
  ];
}
function at(keys, t, S) {
  const v = p => (typeof p === 'function' ? p(S) : p);
  if (t <= keys[0][0]) return v(keys[0][1]);
  for (let i = 1; i < keys.length; i++) {
    if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i], k = (E[b[2] || 'linear'])((t - a[0]) / (b[0] - a[0])), A = v(a[1]), B = v(b[1]); return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k]; }
  }
  return v(keys[keys.length - 1][1]);
}
const ul6 = $('#ul6'), pen = $('#pen'), biro = $('#biro'), biroP = $('#biro-p');
let ul6len = 0;

Kit.each(function (t) {
  /* hook: the pen tip rides the sixth underline */
  if (t > 1.8 && t < 3.0) {
    if (!ul6len) ul6len = ul6.getTotalLength();
    const p = ez(t, 2.12, 2.6, 'inOut'), q = ul6.getPointAtLength(p * ul6len);
    const inn = 1 - ez(t, 1.86, 2.1, 'out'), outt = ez(t, 2.64, 2.92, 'in');
    pen.setAttribute('transform', `translate(${(q.x + 160 * inn + 120 * outt).toFixed(1)} ${(q.y + 150 * inn - 90 * outt).toFixed(1)})`);
  }
  if (t < 9.9 || t > 23.3) return;
  const m = measure(); if (!m) return;
  /* product: the programme */
  const S = stateAt(t);
  TASKS.forEach(k => {
    const b = barBox(S, k.id), el = els[k.id];
    el.style.left = b.x.toFixed(1) + 'px'; el.style.top = b.y.toFixed(1) + 'px';
    if (!k.ms) el.style.width = b.w.toFixed(1) + 'px';
    const rg = els['rg' + k.id];
    if (rg) { const o = k.ms ? 7 : 6; rg.style.left = (b.x - o).toFixed(1) + 'px'; rg.style.top = (b.y - o).toFixed(1) + 'px'; if (!k.ms) { rg.style.width = (b.w + 2 * o).toFixed(1) + 'px'; rg.style.height = (b.h + 2 * o) + 'px'; } }
  });
  LINKS.forEach((lk, i) => {
    const P2 = route(S, lk), d = poly(P2), h = head(P2, lk.chain ? 12 : 9);
    ag[i][0].setAttribute('d', d); ag[i][1].setAttribute('d', h);
    if (ag[i][2]) { ag[i][2].setAttribute('d', d); ag[i][3].setAttribute('d', head(P2, 14)); }
  });
  /* the dark "dragging" ring */
  const dr = $('#dr'), dragId = t < 18 ? 'pa' : 'ef', db = barBox(S, dragId), o = dragId === 'ef' ? 11 : 5;
  dr.style.left = (db.x - o).toFixed(1) + 'px'; dr.style.top = (db.y - o) + 'px'; dr.style.width = (db.w + 2 * o).toFixed(1) + 'px'; dr.style.height = (db.h + 2 * o) + 'px';
  /* biro circle round the painter (13.3) */
  const pb = barBox(stateAt(13), 'pa');
  biro.style.left = (pb.x - 34) + 'px'; biro.style.top = (pb.y - 30) + 'px'; biro.setAttribute('width', pb.w + 68); biro.setAttribute('height', 90);
  if (!biroP.getAttribute('d')) { const w = pb.w + 68; biroP.setAttribute('d', `M ${w * 0.62} 8 C ${w * 0.2} 2, 6 18, 8 46 C 10 78, ${w * 0.7} 88, ${w - 8} 62 C ${w + 6} 40, ${w * 0.86} 6, ${w * 0.42} 12`); }
  /* our annotations (brand style): finish pill + tags follow the bars */
  const hb = barBox(S, 'ho'), fx = hb.cx - 30 - m.fin, fy = hb.cy - 22;
  const fin = $('#fin'); fin.style.left = fx.toFixed(1) + 'px'; fin.style.top = fy + 'px';
  $('#tg-ok').style.left = (fx - 12 - m.ok).toFixed(1) + 'px'; $('#tg-ok').style.top = (hb.cy - 20) + 'px';
  $('#tg-p1').style.left = (fx - 12 - m.p1).toFixed(1) + 'px'; $('#tg-p1').style.top = (hb.cy - 20) + 'px';
  const pab = barBox(S, 'pa'); $('#tg-wk').style.left = (pab.x - 16 - m.wk).toFixed(1) + 'px'; $('#tg-wk').style.top = (pab.cy - 20) + 'px';
  const efb = barBox(S, 'ef'); $('#tg-dl').style.left = (efb.x + 6).toFixed(1) + 'px'; $('#tg-dl').style.top = (efb.y - 50) + 'px';
  /* cursor */
  const c = at(curKeys(m), t, S), cur = $('#cur');
  cur.style.left = (c[0] - 6).toFixed(1) + 'px'; cur.style.top = (c[1] - 4).toFixed(1) + 'px';
});

Kit.ready({ duration: DUR, fonts: ['700 80px "Space Grotesk"', '700 100px Caveat', '400 40px "Permanent Marker"', '800 50px Inter', '600 30px "JetBrains Mono"'] });
})();
