/* A programme a lender can read — QSME Global, 16:9 long-form. One timeline, pure function of t.
   Product screens are recreations built from the truth sheet's exact wording and the product's own UI strings
   (read 2026-10-04), with fictional demo data from programme.js. See post.md → "Owner recordings to swap in".
   Every Kit key below is on the AUTHORED clock; the edit list at the bottom (EDL: holds and skips) maps the real file
   time onto it. window.__toReal(authored) gives the real time of any key. */
(function () {
'use strict';
/* The label on every recreated screen: a quiet tag in the app window's title bar (and over the printout).
   PUBLIC_LABEL = true since the 2026-10-04 review; false brings back the internal production wording. */
const PUBLIC_LABEL = true;
const LABEL = PUBLIC_LABEL ? 'Recreated screen · demo data' : 'Illustrative — swap for real QSME screen';
const PLABEL = PUBLIC_LABEL ? 'Recreated printout · demo data' : 'Illustrative — swap for the real PDF';
const P = window.PROG, E = Kit.ease;
const clamp = v => Math.max(0, Math.min(1, v));
const ez = (t, a, b, e) => (E[e || 'inOut'])(clamp((t - a) / (b - a)));
const lerp = (a, b, p) => a + (b - a) * p;
const $ = s => document.querySelector(s);
const root = document.getElementById('root');

/* ============================================================ timeline (authored clock) */
const DUR = 132.5;
const C1 = 17.0, C2 = 34.4, C3 = 55.4, C4 = 69.8, C5 = 85.4, C6 = 102.6, CTA = 125.45, ENDC = 125.5;
const CARDS = [C1, C2, C3, C4, C5, C6];
const IN = c => c + 1.8;                     // content of a chapter slides in here
const TITLE = 12.0;
/* The edit list. Skips cut authored time where nothing moves (the title's hold, the middle of every chapter card,
   two long holds in chapter 5); holds freeze a still frame where a caption needs longer (chapter 3). */
const SKIPS = [[15.0, 16.0]].concat(CARDS.map(c => [c + 0.75, c + 1.35]), [[96.3, 97.0], [100.6, 102.1]]);
const HOLDS = [[60.75, 0.6], [62.35, 1.0], [64.45, 0.8]];

/* ============================================================ shared bits */
const CURSOR = '<svg class="cursor" id="cur" viewBox="0 0 34 48"><path d="M4 3 L4 37 L12.5 29 L18 42.5 L24 40 L18.5 27 L29.5 27 Z" fill="#111" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>';
const TICK = (c, s) => `<svg width="${s || 14}" height="${s || 14}" viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="${c || '#fff'}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CLOUD = (c, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24"><path d="M7 17.5h10.2a4.3 4.3 0 0 0 .6-8.55A6 6 0 0 0 6.3 10.2 3.7 3.7 0 0 0 7 17.5z" fill="none" stroke="${c || '#fff'}" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 20.5l-.8 1.6M13 20.5l-.8 1.6M17 20.5l-.8 1.6" stroke="${c || '#fff'}" stroke-width="2" stroke-linecap="round"/></svg>`;
const TRADE = {
  'Site & civils': '#B45309', Foundations: '#78716C', Framing: '#EA580C', Roofing: '#DC2626', 'Windows & doors': '#0284C7', Cladding: '#7C3AED',
  'Plumbing & gas': '#2563EB', Electrical: '#EAB308', 'Insulation & linings': '#0D9488', Painting: '#DB2777', 'Fit-out & joinery': '#C026D3',
  Landscaping: '#16A34A', 'Inspections & consents': '#64748B', Other: '#9CA3AF',
};
const ST = { planned: '#64748B', wait: '#F59E0B', booked: '#0EA5E9', onsite: '#16A34A', done: '#065F46' };
function poly(Pts, r) {
  r = r == null ? 6 : r; const f = v => v.toFixed(1);
  let d = `M${f(Pts[0][0])} ${f(Pts[0][1])}`;
  for (let i = 1; i < Pts.length - 1; i++) {
    const [ax, ay] = Pts[i - 1], [bx, by] = Pts[i], [cx, cy] = Pts[i + 1];
    const l1 = Math.hypot(bx - ax, by - ay) || 1, l2 = Math.hypot(cx - bx, cy - by) || 1, rr = Math.min(r, l1 / 2, l2 / 2);
    d += ` L${f(bx - (bx - ax) / l1 * rr)} ${f(by - (by - ay) / l1 * rr)} Q${f(bx)} ${f(by)} ${f(bx + (cx - bx) / l2 * rr)} ${f(by + (cy - by) / l2 * rr)}`;
  }
  const Z = Pts[Pts.length - 1]; return d + ` L${f(Z[0])} ${f(Z[1])}`;
}
function head(Pts, size) {
  const [ax, ay] = Pts[Pts.length - 2], [bx, by] = Pts[Pts.length - 1], l = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / l, uy = (by - ay) / l;
  const w = size * 0.62, p = [bx - ux * size, by - uy * size];
  return `M${bx.toFixed(1)} ${by.toFixed(1)} L${(p[0] - uy * w).toFixed(1)} ${(p[1] + ux * w).toFixed(1)} L${(p[0] + uy * w).toFixed(1)} ${(p[1] - ux * w).toFixed(1)} Z`;
}
function lerpS(a, b, p) { return { s: lerp(a.s, b.s, p), e: lerp(a.e, b.e, p) }; }
/* a hand-drawn marker loop with an overshoot */
function loopPath(cx, cy, rx, ry) {
  const f = v => v.toFixed(1);
  return `M${f(cx - rx * 0.15)} ${f(cy - ry)} C ${f(cx + rx * 0.75)} ${f(cy - ry * 1.12)}, ${f(cx + rx * 1.08)} ${f(cy - ry * 0.1)}, ${f(cx + rx * 0.92)} ${f(cy + ry * 0.45)}`
    + ` C ${f(cx + rx * 0.7)} ${f(cy + ry * 1.08)}, ${f(cx - rx * 0.55)} ${f(cy + ry * 1.1)}, ${f(cx - rx * 0.95)} ${f(cy + ry * 0.35)}`
    + ` C ${f(cx - rx * 1.12)} ${f(cy - ry * 0.3)}, ${f(cx - rx * 0.6)} ${f(cy - ry * 1.05)}, ${f(cx + rx * 0.25)} ${f(cy - ry * 1.02)}`;
}

/* ============================================================ the gantt (recreated QSME timeline) */
function Gantt(host, o) {
  const g = document.createElement('div'); g.className = 'gx'; g.id = o.id; host.appendChild(g);
  const days = o.d1 - o.d0 + 1, tw = o.w - o.nameW, pxd = tw / days;
  const X = d => (d - o.d0) * pxd;
  const by = o.headH + (o.noteH || 0), rowH = o.rowH, bh = o.barH || Math.round(rowH * 0.5);
  const rowsH = o.rows.length * rowH;
  const R = {}; o.rows.forEach((id, i) => R[id] = i);
  const RR = Object.assign({}, R);           // the row each task sits on now (rows re-sort when the dates change)
  const fs = o.fs || 16;
  let h = `<div class="nhead" style="width:${o.nameW}px;height:${o.headH}px;font-size:${fs}px">${o.title}${(o.cols || []).map(c => `<div class="colh" style="left:${c.x}px;width:${c.w}px;justify-content:${c.align === 'r' ? 'flex-end' : 'flex-start'}">${c.label}</div>`).join('')}</div>`;
  if (o.noteH) h += `<div class="hidden-note" style="top:${o.headH + 6}px;font-size:${fs - 2}px">${o.note}</div>`;
  h += `<div class="names" style="top:${by}px;width:${o.nameW}px;height:${rowsH}px">` + o.rows.map((id, i) => {
    const k = P.T[id];
    const cells = (o.cols || []).map(c => { const v = o.cell(id, c.key); return `<div class="cell${c.align === 'r' ? ' rt' : ''}${v && v[0] === '~' ? ' est' : ''}" style="left:${c.x}px;width:${c.w}px;font-size:${fs - 1}px">${v || ''}</div>`; }).join('');
    return `<div class="nm" id="${o.id}-nm-${id}" style="top:${i * rowH}px;height:${rowH}px;width:${o.nameW}px;font-size:${fs}px"><span class="n" id="${o.id}-n-${id}" style="width:${o.numW || 40}px">${o.nums[id]}</span><b>${k.name}</b>${cells}</div>`;
  }).join('') + '</div>';
  h += `<div class="head" style="left:${o.nameW}px;width:${tw}px;height:${o.headH}px">`;
  const months = [];
  for (let d = o.d0; d <= o.d1; d++) { const dt = P.dt(d); if (dt.getUTCDate() === 1 || d === o.d0) months.push(d); }
  months.forEach((d, i) => {
    const dt = P.dt(d), m = dt.getUTCMonth(), y = dt.getUTCFullYear();
    const name = (o.zoom === 'month' ? P.MON[m] : P.MONTH[m]) + ((m === 0 || i === 0) ? ' ' + y : '');
    if (P.dt(d).getUTCDate() === 1 || i === 0) h += `<div class="mh" style="left:${(X(d) + 6).toFixed(1)}px;font-size:${o.zoom === 'month' ? 13 : 15}px">${P.dt(d).getUTCDate() === 1 || o.zoom !== 'month' ? name : ''}</div>`;
  });
  if (o.zoom !== 'month') for (let d = o.d0; d <= o.d1; d++) if (P.dow(d) === 1) h += `<div class="wh" style="left:${(X(d) + 2).toFixed(1)}px">${P.dt(d).getUTCDate()}</div>`;
  h += '</div>';
  h += `<div class="body" style="left:${o.nameW}px;top:${by}px;width:${tw}px;height:${rowsH}px">`;
  months.forEach(d => { if (P.dt(d).getUTCDate() === 1) h += `<div class="ml" style="left:${X(d).toFixed(1)}px"></div>`; });
  if (pxd >= 6) for (let d = o.d0; d <= o.d1; d++) if (P.dow(d) === 6) h += `<div class="we" style="left:${X(d).toFixed(1)}px;width:${(2 * pxd).toFixed(1)}px"></div>`;
  if (o.band) h += `<div class="band" id="${o.id}-band" style="left:${X(o.band.from).toFixed(1)}px;width:${(X(o.band.to + 1) - X(o.band.from)).toFixed(1)}px"><span>${o.band.name}</span></div>`;
  o.rows.forEach((id, i) => { h += `<div class="rl" style="top:${(i + 1) * rowH - 1}px"></div>`; });
  if (o.today) h += `<div class="today" style="left:${(X(P.TODAY) + pxd / 2 - 1).toFixed(1)}px"></div>`;
  h += `<svg class="ar" width="${tw}" height="${rowsH}" id="${o.id}-ar"></svg>`;
  o.rows.forEach(id => {
    const k = P.T[id];
    h += `<div class="ring" id="${o.id}-rp-${id}"></div><div class="ring" id="${o.id}-ra-${id}"></div><div class="prop" id="${o.id}-pp-${id}"></div>`;
    h += k.ms ? `<div class="dia" id="${o.id}-b-${id}"></div>` : `<div class="bar" id="${o.id}-b-${id}"></div>`;
    h += `<div class="lab" id="${o.id}-l-${id}" style="font-size:${o.labFs || 14}px"></div>`;
  });
  h += '</div>';
  g.innerHTML = h;
  const el = {}; o.rows.forEach(id => { el[id] = { b: g.querySelector(`#${o.id}-b-${id}`), l: g.querySelector(`#${o.id}-l-${id}`), pp: g.querySelector(`#${o.id}-pp-${id}`), rp: g.querySelector(`#${o.id}-rp-${id}`), ra: g.querySelector(`#${o.id}-ra-${id}`), nm: g.querySelector(`#${o.id}-nm-${id}`), n: g.querySelector(`#${o.id}-n-${id}`), lastLab: null, lastBar: '', lastN: String(o.nums[id]) }; });
  const svg = g.querySelector(`#${o.id}-ar`);
  const links = P.LINKS.filter(l => R[l.a] != null && R[l.b] != null);
  svg.innerHTML = links.map((l, i) => `<path id="${o.id}-a${i}" stroke="#9CA3AF" stroke-width="1.8"/><path id="${o.id}-ah${i}" fill="#9CA3AF" stroke="none"/>`).join('');
  const ap = links.map((l, i) => [svg.querySelector(`#${o.id}-a${i}`), svg.querySelector(`#${o.id}-ah${i}`)]);
  const yc = id => RR[id] * rowH + rowH / 2;
  function box(id, s) {
    const k = P.T[id];
    if (k.ms) { const cx = X(s.s) + pxd / 2, sz = Math.min(bh, 16); return { x: cx - sz / 2, y: yc(id) - sz / 2, w: sz, h: sz, x1: cx + sz / 2, cx }; }
    const x = X(s.s) + 1, w = Math.max(3, (s.e - s.s + 1) * pxd - 2);
    return { x, y: yc(id) - bh / 2, w, h: bh, x1: x + w, cx: x + w / 2 };
  }
  function update(S, look, t) {
    if (o.rowAt) o.rows.forEach(id => {
      const r = o.rowAt(id, t), e = el[id];
      if (r !== RR[id]) { RR[id] = r; e.nm.style.top = (r * rowH).toFixed(1) + 'px'; }
      const n = String(o.numAt(id, t)); if (n !== e.lastN) { e.n.textContent = n; e.lastN = n; }
    });
    o.rows.forEach(id => {
      const L = look(id, t), k = P.T[id], e = el[id];
      const s = L.at || S[id], b = box(id, s);
      const st = e.b.style;
      st.left = b.x.toFixed(1) + 'px'; st.top = b.y.toFixed(1) + 'px'; st.width = b.w.toFixed(1) + 'px'; st.height = b.h.toFixed(1) + 'px';
      st.background = L.col; st.opacity = L.alpha == null ? 1 : L.alpha;
      if (L.clip != null) st.clipPath = `inset(0 ${(100 - L.clip * 100).toFixed(1)}% 0 0)`; else st.clipPath = '';
      const inner = (!k.ms && L.icon) ? L.icon : '';
      if (inner !== e.lastBar) { e.b.innerHTML = inner; e.lastBar = inner; }
      // proposal: the dashed bar at the asked-for dates
      if (L.prop) { const pb = box(id, L.prop); Object.assign(e.pp.style, { display: 'block', left: pb.x.toFixed(1) + 'px', top: (pb.y - 1).toFixed(1) + 'px', width: pb.w.toFixed(1) + 'px', height: (pb.h + 2) + 'px', opacity: L.propA == null ? 1 : L.propA }); } else e.pp.style.display = 'none';
      const rb = L.prop ? box(id, L.prop) : b;
      const ringAt = (r, pad, col, w, a) => { if (!a) { r.style.display = 'none'; return; } const rot = k.ms ? 'rotate(45deg)' : ''; Object.assign(r.style, { display: 'block', left: (rb.x - pad).toFixed(1) + 'px', top: (rb.y - pad).toFixed(1) + 'px', width: (rb.w + 2 * pad).toFixed(1) + 'px', height: (rb.h + 2 * pad).toFixed(1) + 'px', border: `${w}px solid ${col}`, opacity: a, transform: rot + (L.ringS ? ` scale(${L.ringS})` : ''), borderRadius: k.ms ? '5px' : '9px' }); };
      ringAt(e.ra, 4, '#F59E0B', 3, L.amber || 0);
      ringAt(e.rp, L.amber ? 8 : 5, '#A855F7', 3, L.purple || 0);
      const lab = L.label || '';
      if (lab !== e.lastLab) { e.l.innerHTML = lab; e.lastLab = lab; }
      const lx = Math.max(b.x1, L.prop ? rb.x1 : 0) + (k.ms ? 10 : 12) + (L.purple ? 5 : 0);
      Object.assign(e.l.style, { left: lx.toFixed(1) + 'px', top: (yc(id) - (o.labFs || 14) / 2 - 1).toFixed(1) + 'px', opacity: L.labA == null ? (L.alpha == null ? 1 : L.alpha) : L.labA });
    });
    links.forEach((l, i) => {
      const A = look(l.a, t), B = look(l.b, t);
      const a = (o.arrow ? o.arrow(l, t) : 0);
      if (a <= 0.001) { ap[i][0].style.opacity = 0; ap[i][1].style.opacity = 0; return; }
      const sa = A.prop || A.at || S[l.a], sb = B.prop || B.at || S[l.b];
      const ba = box(l.a, sa), bb = box(l.b, sb);
      const x0 = ba.x1 + 1, y0 = yc(l.a), y1 = yc(l.b);
      // down first, then along the waiting task's own row: never through a bar's date words
      let pts; const xm = x0 + 7;
      if (bb.x - xm < 8) pts = [[x0, y0], [xm, y0], [xm, bb.y - 3]];
      else pts = [[x0, y0], [xm, y0], [xm, y1], [bb.x - 2, y1]];
      if (Math.abs(pts[1][1] - pts[2][1]) < 0.5 && pts.length === 4) pts = [[x0, y0], [bb.x - 2, y1]];
      const pu = o.chainLink ? o.chainLink(l, t) : 0;
      const col = pu > 0.5 ? '#A855F7' : '#9CA3AF';
      ap[i][0].setAttribute('d', poly(pts, 5)); ap[i][1].setAttribute('d', head(pts, pu > 0.5 ? 10 : 7));
      ap[i][0].setAttribute('stroke', col); ap[i][0].setAttribute('stroke-width', pu > 0.5 ? 4 : 1.8); ap[i][1].setAttribute('fill', col);
      if (o.arrowTrim) { const tr = o.arrowTrim(l, t); ap[i][0].setAttribute('pathLength', '1'); ap[i][0].style.strokeDasharray = '1 1'; ap[i][0].style.strokeDashoffset = String(1 - tr); ap[i][1].style.opacity = tr > 0.95 ? a : 0; ap[i][0].style.opacity = tr > 0 ? a : 0; }
      else { ap[i][0].style.opacity = a; ap[i][1].style.opacity = a; }
    });
  }
  return { g, X, pxd, R, rowH, by, box, yc, update, w: o.w, h: by + rowsH, nameW: o.nameW };
}

/* ============================================================ data for the screens */
// rows in date order on the in-build screens (numbers follow the dates, as the product numbers them)
const DATE_ORDER = P.ORDER.slice().sort((a, b) => (P.B[a].s - P.B[b].s) || (P.T[a].i - P.T[b].i));
const NUM_B = {}; DATE_ORDER.forEach((id, i) => NUM_B[id] = i + 1);
const IDX_B = {}; DATE_ORDER.forEach((id, i) => IDX_B[id] = i);
const NUM_A = {}; P.ORDER.forEach((id, i) => NUM_A[id] = i + 1);
const OPEN_ROWS = DATE_ORDER.filter(id => P.status(id) !== 'done');          // 15 rows: finished ones hidden
const MONEY_ROWS = DATE_ORDER.slice(0, 16);
const CHAIN = P.chain(P.F, P.C1);                                             // ins pb stop kit efo clean ho

/* ============================================================ markup */
const SHOT = (() => {   // the PM's Gantt screenshot: generic, unbranded spreadsheet look
  const rows = [
    ['h', '#', 'Task', 'Cost'],
    ['g', '', 'Groundworks', '286,000'],
    ['r', '1', 'Site set-out & earthworks', '96,000', 0, 2, '#B98A5B'], ['r', '2', 'Drainage & services', '84,000', 2, 2, '#B98A5B'], ['r', '3', 'Foundations & slab', '106,000', 4, 3, '#9A938C'],
    ['g', '', 'Frame & envelope', '2,700,000', 'x'],
    ['r', '4', 'Frame — ground floor', '450,000', 7, 2, '#E9935A', 'x'], ['r', '5', 'Frame — first floor', '450,000', 9, 2, '#E9935A', 'x'], ['r', '6', 'Roof structure', '450,000', 11, 2, '#D96B6B', 'x'],
    ['r', '7', 'Roofing', '450,000', 12, 2, '#D96B6B', 'x'], ['r', '8', 'Windows & external doors', '450,000', 12, 2, '#5DA2C9', 'x'], ['r', '9', 'Wall wrap & cladding', '450,000', 14, 4, '#9C7CD6', 'x'],
    ['g', '', 'Services', '79,700'],
    ['r', '10', 'Plumbing rough-in', '38,500', 13, 2, '#6F93DA'], ['r', '11', 'Electrical rough-in', '41,200', 13, 2, '#DDBE57'],
    ['g', '', 'Linings', '190,800'],
    ['r', '12', 'Insulation', '22,800', 15, 1, '#5BB0A6'], ['r', '13', 'Plasterboard & stopping', '168,000', 16, 7, '#5BB0A6'],
    ['g', '', 'Fit-out', '373,300'],
    ['r', '14', 'Kitchens & joinery', '186,000', 23, 4, '#C77CCF'], ['r', '15', 'Tiling & waterproofing', '64,500', 23, 4, '#C77CCF'], ['r', '16', 'Painting', '48,000', 23, 3, '#DD7AA8'],
    ['r', '17', 'Floor coverings', '39,600', 26, 2, '#B4B8BE'], ['r', '18', 'Fit-off', '35,200', 28, 2, '#6F93DA'],
    ['g', '', 'Externals', '92,000'], ['r', '19', 'Driveways & landscaping', '92,000', 18, 4, '#69B57A'],
  ];
  const WK = 64, GX = 760;
  let h = '<div class="sh-top">Programme_Rev4_FINAL.xlsx — Gantt</div>';
  for (let w = 0; w < 26; w++) h += `<div class="gcol" style="left:${GX + w * WK}px"></div><div class="gwk" style="left:${GX + w * WK + 18}px">W${w + 1}</div>`;
  rows.forEach((r, i) => {
    const y = 104 + i * 40;
    if (r[0] === 'h') { h += `<div class="sr h" style="top:${y}px;width:${GX}px"><i style="width:70px">${r[1]}</i><i style="width:500px">${r[2]}</i><i style="width:180px;text-align:right;padding-right:16px">${r[3]}</i></div>`; return; }
    const cls = r[0] === 'g' ? 'sr g' : 'sr';
    const hot = r[4] === 'x' || r[7] === 'x';
    h += `<div class="${cls}" style="top:${y}px;width:${GX}px"><i style="width:70px;color:#9CA3AF">${r[1]}</i><i style="width:500px">${r[0] === 'g' ? r[2].toUpperCase() : r[2]}</i><i class="cell450" id="${hot ? (r[0] === 'g' ? 'shTot' : 'sh450-' + r[1]) : ''}" style="width:180px;text-align:right;padding-right:16px">${r[3]}</i></div>`;
    if (r[0] === 'r') h += `<div class="sb" style="left:${GX + r[4] * WK + 6}px;top:${y + 9}px;width:${r[5] * WK - 10}px;background:${r[6]}"></div>`;
  });
  return h;
})();

const POCKET_JOBS = P.POCKETS.map((name, pi) => ({ name, jobs: P.TASKS.filter(k => k.pocket === pi) }));
const LISTH = 322;                                           // the job list's height in the import dialog
const IMPORT_LIST = (() => {
  let y = 0, h = '';
  const tops = [];
  POCKET_JOBS.forEach((pk, pi) => {
    tops.push(y);
    h += `<div class="gh" style="position:absolute;left:0;right:0;top:${y}px"><div class="cb" id="ipk${pi}"><div class="on" id="ipkc${pi}">${TICK('#fff', 16)}</div></div>${pk.name}<span>${pk.jobs.length} ${pk.jobs.length === 1 ? 'task' : 'tasks'}</span></div>`;
    y += 36;
    pk.jobs.forEach(k => {
      h += `<div class="jr" style="position:absolute;left:0;right:0;top:${y}px"><div class="cb"><div class="on" id="ijc-${k.id}">${TICK('#fff', 16)}</div></div><span class="dot" style="background:${TRADE[k.trade]}"></span><span class="nmj">${k.name}</span>${k.rain ? CLOUD('#0284C7', 17) : ''}<span class="dy">${k.days} ${k.days === 1 ? 'day' : 'days'}</span></div>`;
      y += 34;
    });
  });
  return { h, tops, total: y };
})();

const W = { x: 150, y: 124, w: 1620, h: 782 };              // the app window on the frame
const FRAME = { x: W.x, y: W.y + 44 };                      // window inner origin on the frame
const CARD_IN = { x: 22, y: 112, w: 1576, h: W.h - 44 - 112 - 12 };   // chart card inside the window (with the today strip)
const CARD_IN1 = { x: 22, y: 76, w: 1576, h: W.h - 44 - 76 - 12 };    // chapter 1 (no strip yet)

function winChrome(url, who) { return `<div class="chrome"><i></i><i></i><i></i><span class="url">${url}</span>${who ? `<span class="who">${who}</span>` : ''}<span class="rec">${LABEL}</span></div>`; }
const APPHEAD = (title, extra) => `<div class="apphead"><div class="t">Schedule</div><div class="p">Riverside Terraces — Stage 3</div>
  <div class="seg" style="left:330px"><i class="on">Timeline</i><i>List</i><i>All projects</i></div>
  ${extra || ''}</div>`;

/* the hook's printout: paper coordinates (1040 × 735; the spreadsheet is drawn at 0.5) */
const HK = { dates: [752, 250, 150, 62], tot: [376, 199, 46, 11] };

root.innerHTML = `
<svg width="0" height="0" style="position:absolute"><defs><filter id="grainf"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .9 0"/></filter></defs></svg>
<div id="grid" class="fill"></div><div id="glow" class="fill"></div>

<!-- ================= HOOK (0–12): the printout is already on the desk at frame 1 ================= -->
<div id="sH" class="fill">
  <div id="hDesk" class="fill"><div id="desk" class="fill"></div><svg id="grain" width="100%" height="100%"><rect width="100%" height="100%" filter="url(#grainf)"/></svg></div>
  <div id="hPaper" class="a4" style="left:790px;top:150px;width:1040px;height:735px" data-qa-ignore>
    <div style="position:absolute;left:36px;top:36px;width:2400px;height:1160px;transform:scale(.5);transform-origin:0 0"><div id="shot" class="shot">${SHOT}</div></div>
    <div style="position:absolute;left:36px;bottom:24px;font:400 14px/1 Inter;color:#9A9AA0">Printed Wed 14/10/2026 · page 1 of 3</div>
    <svg class="mkp" style="left:0;top:0" width="1040" height="735"><path id="mk1p" d="${loopPath(...HK.dates)}"/></svg>
    <div class="mk" id="mkt1" style="left:790px;top:110px;transform:rotate(-6deg)">dates?</div>
    <svg class="mkp" style="left:0;top:0" width="1040" height="735"><path id="mk2p" d="M850 512 L 1022 512 M 996 490 L 1024 512 L 996 534"/></svg>
    <div class="mk" id="mkt2" style="left:690px;top:540px;transform:rotate(-4deg)">ends where?</div>
    <svg class="mkp" style="left:0;top:0" width="1040" height="735"><path id="mk3p" d="${loopPath(...HK.tot)}"/></svg>
    <svg class="mkp" style="left:0;top:0" width="1040" height="735"><path id="mk4p" style="stroke-width:6" d="M411 214 L 425 214 L 425 322 Q 426 342 446 350"/></svg>
    <div class="mk" id="mkt3" style="left:452px;top:334px;transform:rotate(-2deg);font-size:32px">one 450k contract × 6?</div>
  </div>
  <div id="exf" class="exf" style="left:806px;top:92px">Example figures</div>
  <div id="hT1" class="abs disp" style="left:112px;top:236px;width:650px"><div style="font-size:104px;line-height:1">Your<br>programme.</div><div style="margin-top:38px;font-size:72px;line-height:1.06;color:var(--ink-70)">As the lender<br>sees it.</div></div>
  <div id="hT3" class="hook-t disp" style="top:200px;font-size:80px;line-height:1.06">So what’s<br>actually<br>holding this<br>build <span class="g">up?</span></div>
</div>

<!-- ================= TITLE (12–17 authored, 4 s real) ================= -->
<div id="sT" class="fill">
  <img id="bgFrame" class="abs" src="clips/frame/f_00000.jpg" style="left:640px;top:0;width:1280px;height:1080px;object-fit:cover" alt="">
  <div class="fill" style="background:linear-gradient(90deg, #0C1310 0%, #0C1310 36%, rgba(12,19,16,.55) 62%, rgba(12,19,16,.25) 100%)"></div>
  <div id="tT" class="abs disp" style="left:116px;top:196px;font-size:104px;width:980px">A programme a lender can read.</div>
  <div id="tS" class="abs" style="left:122px;top:446px;font:600 44px/1.2 var(--display);color:var(--accent)">Six fixes. One printout.</div>
  <div id="tL" class="abs" style="left:122px;top:534px;width:900px;font:600 32px/1 var(--body);color:var(--ink)">
    ${['From the estimate', 'Slips and rain', 'What drives the finish', 'Your days off', 'Money, once', 'Print it'].map((s, i) => `<div id="tl${i}" style="display:flex;align-items:center;height:58px"><span class="mono g" style="width:56px">${i + 1}</span>${s}</div>`).join('')}
  </div>
</div>

<!-- ================= CHAPTER 1 window ================= -->
<div id="w1" class="win" style="left:${W.x}px;top:${W.y}px;width:${W.w}px;height:${W.h}px" data-qa-ignore>
  ${winChrome('app.qsme.build · Schedule')}
  <div class="inner"><div class="cam" id="cam1" style="width:${W.w}px;height:${W.h - 44}px">
    ${APPHEAD('', `<div class="seg" style="left:700px"><i>Day</i><i>Week</i><i class="on">Month</i><i>Year</i></div><div class="btn" style="right:0" id="w1imp">Import tasks</div>`)}
    <div class="card" id="w1card" style="left:${CARD_IN1.x}px;top:${CARD_IN1.y}px;width:${CARD_IN1.w}px;height:${CARD_IN1.h}px"></div>
    <div class="card" id="w1empty" style="left:${CARD_IN1.x}px;top:${CARD_IN1.y}px;width:${CARD_IN1.w}px;height:${CARD_IN1.h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">
      <div style="font:700 26px/1 Inter">Nothing scheduled yet</div>
      <div class="b2 grn" id="w1empBtn" style="margin-top:10px">Import tasks</div>
    </div>
    <div class="scrim" id="w1scrim"></div>
    <div class="dlg" id="dImp" style="left:370px;top:22px;width:880px;height:700px">
      <h4>Import tasks onto Riverside Terraces — Stage 3</h4>
      <div class="desc" style="width:800px">This is the only way an SOQ job reaches the schedule — tick what you want. They go on after whatever is already scheduled, each one taking its own Days. Move them around afterwards.</div>
      <div class="srcb on" style="left:28px;top:150px;width:404px;height:68px"><b>Import jobs from SOQ</b><small>The jobs you’ve priced on this project</small></div>
      <div class="srcb" style="left:448px;top:150px;width:404px;height:68px"><b>Template</b><small>QSME’s, yours, or a file</small></div>
      <div class="lst" id="iList" style="left:28px;top:236px;width:824px;height:${LISTH}px"><div id="iScroll" style="position:absolute;left:0;top:0;width:824px;height:${IMPORT_LIST.total}px">${IMPORT_LIST.h}</div></div>
      <div id="iLink" style="position:absolute;left:28px;top:574px;width:470px;display:flex;gap:10px;align-items:flex-start">
        <div class="cb" id="iLinkCb" style="margin-top:1px"><div class="on" id="iLinkOn">${TICK('#fff', 16)}</div></div>
        <div><div style="font:500 15px/1.25 Inter">Link them one after the other</div><div style="margin-top:3px;font:400 13px/1.35 Inter;color:#64748B">Moving one then pushes the ones after it. Turn this off when the tasks don’t follow each other — a trade that waits on someone else.</div></div>
      </div>
      <div class="foot"><span class="b2">Cancel</span><span class="b2 pri" id="iBtn">Import <span id="iCount">0</span>&nbsp;<span id="iWord">tasks</span></span></div>
    </div>
    <div class="toast" id="t1link" style="left:30px;bottom:22px">Linked: Insulation starts after Electrical rough-in<b class="u">Undo</b></div>
  </div></div>
</div>
<div id="stk1" class="stk" style="left:1290px;top:182px;transform:rotate(-3deg)">No retyping.</div>

<!-- ================= the main window (chapters 2–6), under one camera ================= -->
<div id="camW" class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0">
<div id="w2wrap" class="abs" style="left:0;top:0;width:1920px;height:1080px">
<div id="w2" class="win" style="left:${W.x}px;top:${W.y}px;width:${W.w}px;height:${W.h}px" data-qa-ignore>
  ${winChrome('app.qsme.build · Schedule')}
  <div class="inner"><div class="cam" id="cam2" style="width:${W.w}px;height:${W.h - 44}px">
    ${APPHEAD('', `<div class="seg" style="left:700px"><i>Day</i><i class="on" id="zWk">Week</i><i id="zMo">Month</i><i>Year</i></div>
      <div class="btn" style="right:300px" id="bRain">${CLOUD('#0F172A', 20)}Rain day</div>
      <div class="btn" style="right:180px" id="bDays">Days off</div>
      <div class="btn" style="right:76px" id="bView"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/><circle cx="16" cy="7" r="2.4" fill="none" stroke="#0F172A" stroke-width="2.2"/><circle cx="10" cy="17" r="2.4" fill="none" stroke="#0F172A" stroke-width="2.2"/></svg>View</div>
      <div class="btn" style="right:0;width:62px;justify-content:center" id="bExp"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" fill="none" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`)}
    <div class="strip" id="strip">
      <span class="chipa"><b>3</b>On site now</span><span class="chipa"><b>0</b>Starting this week</span><span style="position:relative;display:inline-flex"><span class="chipa" id="chW0"><b>0</b>Waiting for OK</span><span class="chipa amb" id="chW2" style="position:absolute;left:0;top:0;background:#FFFBEB"><b>2</b>Waiting for OK</span><span class="chipa amb" id="chW1" style="position:absolute;left:0;top:0;background:#FFFBEB"><b>1</b>Waiting for OK</span></span><span class="chipa"><b>0</b>Behind</span>
      <span class="chipa amb" id="chOwed"><b>303,000</b>Owed</span>
      <span class="sum" id="legStatus"><span class="legend" style="position:static;display:inline-flex"><span><i class="sw" style="background:#64748B"></i>Planned</span><span><i class="sw" style="background:#0EA5E9"></i>Booked</span><span><i class="sw" style="background:#16A34A"></i>On site</span><span><i class="rg" style="border-color:#F59E0B"></i>Waiting for OK</span></span></span>
      <span class="sum" id="legPurple" style="position:absolute;right:0"><span class="legend" style="position:static;display:inline-flex;color:#0F172A;font-weight:600"><span><i class="rg"></i>Purple — This task drives the finish date.</span></span></span>
      <span class="sum" id="sumMoney" style="position:absolute;right:0">Contracted <b>904,000</b> · Paid <b>601,000</b> · Still to contract ~<b>574,300</b></span>
    </div>
    <div class="card" id="w2card" style="left:${CARD_IN.x}px;top:${CARD_IN.y}px;width:${CARD_IN.w}px;height:${CARD_IN.h}px"></div>
    <div class="menu" id="mView" style="right:76px;top:56px;width:430px">
      <h6>Colour the bars by</h6><div style="display:flex;background:#EEF1F4;border-radius:10px;padding:3px;margin:0 4px 10px"><i style="flex:1;font-style:normal;text-align:center;padding:8px 0;border-radius:8px;font:500 17px/1 Inter;color:#475569">Trade</i><i style="flex:1;font-style:normal;text-align:center;padding:8px 0;border-radius:8px;font:600 17px/1 Inter;background:#fff;box-shadow:0 1px 3px rgba(15,23,42,.14)">Status</i></div>
      <h6>Show</h6>
      <div class="mi"><div class="cb"><div class="on">${TICK('#fff', 16)}</div></div>Arrows between linked tasks</div>
      <div class="mi" id="miChain"><div class="hlbg" id="miChainHl"></div><div class="cb"><div class="on" id="cbChain">${TICK('#fff', 16)}</div></div>What drives the finish date</div>
    </div>
    <div class="menu" id="mCols" style="right:76px;top:56px;width:430px">
      <h6>Columns beside each task</h6>
      <div class="mi"><div class="cb"><div class="on">${TICK('#fff', 16)}</div></div>Who</div>
      <div class="mi"><div class="cb"></div>Start</div>
      <div class="mi"><div class="cb"></div>Days</div>
      <div class="mi" id="miCost"><div class="hlbg" id="miCostHl"></div><div class="cb"><div class="on" id="cbCost">${TICK('#fff', 16)}</div></div>Cost</div>
      <div class="mi" id="miPaid"><div class="hlbg" id="miPaidHl"></div><div class="cb"><div class="on" id="cbPaid">${TICK('#fff', 16)}</div></div>Paid</div>
      <div style="margin:8px 8px 4px;font:400 14px/1.3 Inter;color:#64748B">Money is shown to the project owner and managers.</div>
    </div>
    <div class="menu" id="mExp" style="right:0;top:56px;width:470px">
      <div class="mi" id="miPdf"><div class="hlbg" id="miPdfHl"></div>As a PDF — the chart and the task list</div>
      <div class="mi">As a spreadsheet (CSV)</div>
      <div class="mi">As a template file (JSON)</div>
    </div>
    <div class="scrim" id="w2scrim"></div>
    <div class="dlg" id="dRain" style="left:300px;top:40px;width:1020px;height:620px">
      <h4>${CLOUD('#0F172A', 26)} Rain day on Riverside Terraces — Stage 3</h4>
      <div class="desc" style="width:950px">Tick every day that was rained off — you can pick more than one if you already know the week is gone. Each task that rain can stop gets one more day for every rained-off day it was on; what follows moves to fit.</div>
      <div class="lbl" style="position:absolute;left:28px;top:150px">Rained-off day</div>
      <div id="rCal" style="position:absolute;left:28px;top:178px;width:300px;height:300px;border:1px solid #E5E7EB;border-radius:10px"></div>
      <div id="rChip" style="position:absolute;left:28px;top:492px;display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;border:1px solid #E5E7EB;border-radius:999px;background:#F6F7F8;font:500 15px/1 Inter">${P.day(P.RAIN)} <span style="color:#94A3B8">×</span></div>
      <div class="lbl" style="position:absolute;left:372px;top:150px">What moves</div>
      <div id="rEmpty" style="position:absolute;left:372px;top:182px;font:400 16px/1.4 Inter;color:#64748B">Pick the day (or days) rain stopped work.</div>
      <div id="rList" style="position:absolute;left:372px;top:182px;width:620px">
        <div style="font:400 16px/1.4 Inter;color:#64748B;margin-bottom:10px">${P.moved(P.C, P.D).length} tasks move</div>
        <div style="border:1px solid #E5E7EB;border-radius:10px;padding:10px 14px;margin-bottom:10px"><div style="font:600 17px/1.2 Inter">Wall wrap &amp; cladding</div><div style="margin-top:5px;font:400 15px/1.3 Inter;color:#64748B">${P.range(P.C.clad.s, P.C.clad.e)} → <span style="color:#0F172A">${P.range(P.D.clad.s, P.D.clad.e)}</span> · rained off a day</div></div>
        <div style="border:1px solid #E5E7EB;border-radius:10px;padding:10px 14px"><div style="font:600 17px/1.2 Inter">Driveways &amp; landscaping</div><div style="margin-top:5px;font:400 15px/1.3 Inter;color:#64748B">${P.range(P.C.ext.s, P.C.ext.e)} → <span style="color:#0F172A">${P.range(P.D.ext.s, P.D.ext.e)}</span></div></div>
      </div>
      <div class="foot"><span class="b2">Cancel</span><span class="b2 pri" id="rPush">Push these tasks</span></div>
    </div>
    <div class="dlg" id="dDays" style="left:420px;top:30px;width:780px;height:356px">
      <h4>Days off</h4>
      <div class="desc" style="width:720px">The days nobody is on site. Jobs standing on them are moved out — always later, never earlier — and anyone booked in is asked to confirm their new dates.</div>
      <div style="position:absolute;left:28px;top:150px;width:724px;height:1px;background:#EEF0F2"></div>
      <div class="lbl" style="position:absolute;left:28px;top:170px">Public holidays</div>
      <div style="position:absolute;left:28px;top:196px;font:400 15px/1.3 Inter;color:#64748B">None between now and the end of this job.</div>
      <div class="lbl" style="position:absolute;left:28px;top:248px">Your own days off</div>
      <div id="dEntry" style="position:absolute;left:28px;top:278px;width:724px;height:62px;border:1px solid #E5E7EB;border-radius:10px;padding:10px 14px"><div style="font:600 17px/1.2 Inter">Year-end shutdown</div><div style="margin-top:6px;font:400 15px/1.2 Inter;color:#64748B">${P.pdfDay(P.SHUT.from)} to ${P.pdfDay(P.SHUT.to)} · ${P.SHUT.to - P.SHUT.from + 1} days</div></div>
      <div class="b2" id="dAddBtn" style="position:absolute;left:28px;top:280px;height:40px;font-size:16px">+ Add a day off</div>
      <div id="dForm" style="position:absolute;left:28px;top:278px;width:724px;height:300px;border:1px solid #E5E7EB;border-radius:12px;padding:16px">
        <div style="font:500 14px/1 Inter;color:#64748B">What is it?</div>
        <div class="inp ph" id="dPh" style="margin-top:8px">Site closed, crew away, wet weather…</div>
        <div class="inp focus" id="dName" style="position:absolute;left:16px;top:38px;width:690px"><span id="dNameT">Year-end shutdown</span></div>
        <div style="display:flex;gap:16px;margin-top:16px"><div style="flex:1"><div style="font:500 14px/1 Inter;color:#64748B">First day off</div><div class="inp" style="margin-top:8px"><span id="dFrom">${P.day(P.SHUT.from)} ${P.dt(P.SHUT.from).getUTCFullYear()}</span></div></div><div style="flex:1"><div style="font:500 14px/1 Inter;color:#64748B">Last day off</div><div class="inp" style="margin-top:8px"><span id="dTo">${P.day(P.SHUT.to)} ${P.dt(P.SHUT.to).getUTCFullYear()}</span></div></div></div>
        <div style="margin-top:12px;font:400 14px/1 Inter;color:#64748B">Leave the last day empty if it is only the one day.</div>
        <div style="position:absolute;right:16px;bottom:16px;display:flex;gap:10px"><span class="b2" style="border:none">Cancel</span><span class="b2 pri" id="dAddIt">Add it</span></div>
      </div>
    </div>
    <div class="toast" id="tDrag" style="left:30px;bottom:22px">9 moved · 2 sent for OK — 10 that follow them came too<b class="u">Undo</b></div>
    <div class="toast" id="tRain" style="left:30px;bottom:22px">Rain day logged for ${P.day(P.RAIN)} — ${P.moved(P.C, P.D).length} moved</div>
    <div class="toast" id="tStretch" style="left:30px;bottom:22px">4 moved — 3 that follow them came too<b class="u">Undo</b></div>
    <div class="toast" id="tDays" style="left:30px;bottom:22px">Year-end shutdown added — ${P.moved(P.E, P.F).length} jobs moved</div>
  </div></div>
</div>
<div id="w3" class="win" style="left:560px;top:190px;width:1100px;height:620px" data-qa-ignore>
  ${winChrome('app.qsme.build · Schedule · My work', 'DEMO LININGS LTD')}
  <div class="inner">
    <div style="position:absolute;left:34px;top:26px;font:500 16px/1 Inter;color:#64748B">Riverside Terraces — Stage 3</div>
    <div style="position:absolute;left:34px;top:52px;display:flex;align-items:center;gap:12px;font:700 34px/1 Inter;letter-spacing:-0.01em"><span style="width:14px;height:14px;border-radius:50%;background:${TRADE['Insulation & linings']}"></span>Plasterboard</div>
    <div style="position:absolute;right:34px;top:30px;display:flex;align-items:center;gap:8px;height:36px;padding:0 14px;border-radius:999px;background:#FEF3C7;color:#92400E;font:600 16px/1 Inter">New dates to confirm</div>
    <div id="w3card" style="position:absolute;left:34px;top:116px;width:1032px;height:230px;border:1px solid #FCD34D;background:#FFFBEB;border-radius:16px;padding:22px 26px">
      <div style="font:700 26px/1.2 Inter">New dates — can you make them?</div>
      <div style="margin-top:12px;font:500 22px/1.3 Inter">${P.range(P.C.pb.s, P.C.pb.e)} · ${P.T.pb.days} days <span style="color:#64748B">(was ${P.range(P.B.pb.s, P.B.pb.e)})</span></div>
      <div style="margin-top:8px;font:400 18px/1.3 Inter;color:#64748B">Why: Moved by the client</div>
      <div style="position:absolute;left:26px;bottom:22px;display:flex;gap:12px"><span class="b2 pri" id="w3ok" style="height:48px;font-size:19px">Confirm dates</span><span class="b2" style="height:48px;font-size:19px">Can’t make it</span></div>
    </div>
    <div id="w3done" style="position:absolute;left:34px;top:116px;width:1032px;height:96px;border:1px solid #BBF7D0;background:#F0FDF4;border-radius:16px;padding:22px 26px;display:flex;align-items:center;gap:14px;font:600 22px/1.2 Inter;color:#166534"><span style="width:34px;height:34px;border-radius:50%;background:#16A34A;display:flex;align-items:center;justify-content:center">${TICK('#fff', 20)}</span>Confirmed</div>
  </div>
</div>
</div>
<!-- biro marks and row highlights ride with the camera (frame coordinates) -->
<svg class="biro" id="bz" width="1920" height="1080" style="left:0;top:0"><path id="bz1" d=""/><path id="bz2" d=""/><path id="bz3" d=""/><path id="bzBox" d="" stroke-dasharray="10 8"/></svg>
<div id="rowsHl" class="abs" style="left:0;top:0"></div>
</div>

<!-- live public page (qsme.build), element crops captured 2026-10-04 -->
<div id="site1" class="win site" style="left:290px;top:330px;width:1340px;height:310px">
  <div class="chrome"><i></i><i></i><i></i><span class="url">qsme.build/platform</span><span class="live"><b></b>LIVE PAGE</span></div>
  <img src="clips/stills/sched-from-soq.png" style="left:90px;top:84px;width:1160px;height:190px" alt="">
  <div class="hlx" id="hl1b"></div><div class="hlx" id="hl1c"></div>
</div>
<div id="site2" class="win site" style="left:290px;top:360px;width:1340px;height:250px">
  <div class="chrome"><i></i><i></i><i></i><span class="url">qsme.build/platform</span><span class="live"><b></b>LIVE PAGE</span></div>
  <img src="clips/stills/sched-asked.png" style="left:90px;top:84px;width:1160px;height:131px" alt="">
  <div class="hlx" id="hl2a"></div><div class="hlx" id="hl2b"></div>
</div>

<!-- our sticky notes over the main window (biro on yellow: never product UI). They stay full size; the camera only moves them. -->
<div id="ann" class="fill" style="pointer-events:none">
  <div class="stk" id="sTime" style="transform:rotate(-1.5deg);font-size:32px">Today: ${P.day(P.TODAY)} · 3 months in</div>
  <div class="stk" id="sFin" style="transform:rotate(1.5deg)"><span style="font-size:28px">Finish:</span> <span id="sFinA"></span></div>
  <div class="stk" id="sPlus" style="transform:rotate(-3deg);font-size:32px"></div>
  <div class="stk" id="sPaint" style="transform:rotate(-2.5deg);font-size:34px">never purple</div>
  <div class="stk" id="sRainOk" style="transform:rotate(2deg);font-size:30px;line-height:1.08">pushed by yesterday’s rain<br>finish didn’t move ✓</div>
  <div class="stk" id="sXmas" style="transform:rotate(-2deg);font-size:32px">site’s shut · planned as working days</div>
  <div class="stk" id="sMoney1" style="transform:rotate(-2deg);font-size:32px;line-height:1.08">1 contract · 6 tasks<br>counted once</div>
  <div class="stk" id="sMoney2" style="transform:rotate(2deg);font-size:30px">Paid = recorded as paid</div>
  <div id="tot27" class="abs" style="left:0;top:0;padding:8px 16px;border-radius:10px;background:#fff;border:2px solid #E5E7EB;font:700 34px/1 var(--mono);color:#0F172A;box-shadow:0 10px 30px rgba(0,0,0,.35)"><span style="position:relative">2,700,000<svg id="strike" style="position:absolute;left:-6px;top:12px" width="200" height="16" viewBox="0 0 200 16"><path id="strikeP" d="M2 9 C 60 4, 130 12, 198 6" stroke="#D92D20" stroke-width="5" fill="none" stroke-linecap="round"/></svg></span></div>
</div>

<!-- ================= CHAPTER 6: the printout on a desk (page 1 on top of page 2) ================= -->
<div id="s6" class="fill">
  <div class="fill" style="background:radial-gradient(120% 90% at 28% 18%, #2C322D 0%, #1A1F1B 48%, #0E110F 100%)"></div><svg class="abs" style="left:0;top:0;opacity:.5;mix-blend-mode:overlay" width="1920" height="1080"><rect width="100%" height="100%" filter="url(#grainf)"/></svg>
  <div id="pcam" class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0">
    <div id="pwrap" class="abs" style="left:310px;top:120px;width:1300px;height:919px;transform-origin:650px 460px" data-qa-ignore>
      <div id="paper2"></div>
      <div id="paper"></div>
      <svg id="trace" class="abs" style="left:0;top:0;overflow:visible" width="1300" height="919"><path id="traceP" d="" fill="none" stroke="#2747A0" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 7" opacity=".85"/></svg>
      <svg id="tpen" class="abs" style="left:0;top:0;overflow:visible" width="10" height="10"><g id="tpenG"></g></svg>
    </div>
  </div>
</div>

<!-- ================= END CARD ================= -->
<div id="sE" class="fill">
  <img id="bgend" src="clips/lockup/f_00000.jpg" alt="">
  <div id="enddim" class="fill"></div>
  <img id="elogo" class="abs" src="qsme-logo-nor.svg" style="left:110px;top:150px;height:120px" alt="QSME">
  <div id="eLine" class="abs disp" style="left:122px;top:316px;width:920px;font-size:66px;line-height:1.08">Bring your current programme to a <span class="g">30-minute demo.</span></div>
  <div id="ePill" class="abs" style="left:122px;top:560px"><span class="pill" style="font-size:40px;padding:20px 40px">Book a 30-minute demo</span></div>
  <div id="eUrl" class="abs" style="left:126px;top:676px;font:600 64px/1 var(--display);letter-spacing:-0.02em">qsme.build</div>
  <div id="eAsk" class="abs" style="left:126px;top:800px;width:820px;font:500 32px/1.35 var(--body);color:var(--ink-70)">What does your lender ask for first? Tell us in the comments.</div>
</div>

<!-- ================= chapter cards + wipe ================= -->
${[['1', 'From the estimate.', 'No retyping.'], ['2', 'Slips and rain.', 'Asked, not told.'], ['3', 'What drives the finish.', 'Purple and grey.'], ['4', 'Your days off.', 'Later, never earlier.'], ['5', 'Money, once.', 'Estimates vs agreed prices.'], ['6', 'Print it.', 'Never runs off the side.']].map(([n, t, s], i) =>
  `<div id="cd${i + 1}" class="fill chcard"><div class="num">${n}</div><div class="ck kick">Fix ${n} of 6</div><div class="ttl disp">${t}</div><div class="sub">${s}</div></div>`).join('')}
<div id="wipe"></div>

<!-- ================= top bar + captions ================= -->
<div id="tbBand" class="abs" style="left:0;top:0;width:1920px;height:124px;z-index:57;background:linear-gradient(#0C1310 72%, rgba(12,19,16,0))"></div>
<div id="topbar"><div id="kickA"></div><div id="ill">${PLABEL}</div><div id="pips">${[1, 2, 3, 4, 5, 6].map(i => `<div class="pip" id="pip${i}">${i}</div>`).join('')}</div></div>
<div id="caps"></div>
${CURSOR}
`;

/* ============================================================ gantts */
const RE = { a: 32.6, b: 33.05 };            // chapter 1: once linked, the rows re-sort into date order and renumber
const g1 = Gantt($('#w1card'), {
  id: 'g1', rows: P.ORDER, nums: NUM_A, w: CARD_IN1.w, nameW: 320, rowH: 26, headH: 42, barH: 14, fs: 15, labFs: 12, numW: 36,
  d0: P.ymd(2026, 6, 29), d1: P.ymd(2027, 5, 31), zoom: 'month', title: 'All tasks · 23',
  arrow: (l, t) => (t > 30.85 ? 1 : 0), arrowTrim: (l, t) => ez(t, 30.9 + linkOrder(l) * 0.055, 31.05 + linkOrder(l) * 0.055, 'out'),
  rowAt: (id, t) => lerp(P.T[id].i, IDX_B[id], ez(t, RE.a, RE.b)), numAt: (id, t) => (t < RE.a + 0.22 ? NUM_A[id] : NUM_B[id]),
});
function linkOrder(l) { return P.LINKS.indexOf(l); }
const G2O = {
  id: 'g2', rows: OPEN_ROWS, nums: NUM_B, w: CARD_IN.w, nameW: 330, rowH: 36, headH: 46, noteH: 28, barH: 18, fs: 17, labFs: 14, numW: 40,
  d0: P.ymd(2026, 10, 5), d1: P.ymd(2027, 2, 19), zoom: 'week', today: 1, title: 'Tasks', note: '8 finished tasks are hidden · <u>Show finished tasks</u>',
  band: { from: P.SHUT.from, to: P.SHUT.to, name: 'Year-end shutdown' },
  arrow: () => 1, chainLink: (l, t) => (t > CH_ON && CHAIN.includes(l.a) && CHAIN.includes(l.b) ? ez(t, CH_ON + 0.1 + CHAIN.indexOf(l.a) * 0.09, CH_ON + 0.2 + CHAIN.indexOf(l.a) * 0.09) : 0),
};
const CH_ON = 59.25;                         // "What drives the finish date" ticked
const g2 = Gantt($('#w2card'), G2O);
const MONEY = (() => {
  const m = {};
  P.CONTRACTS.forEach(c => { m[c.tasks[0]] = { cost: P.money(c.price), paid: c.paid ? 'paid ' + P.money(c.paid) : 'Not paid yet' }; });
  Object.keys(P.ESTIMATE).forEach(id => { m[id] = { cost: '~' + P.money(P.ESTIMATE[id]), paid: '' }; });
  return m;
})();
const whoOf = id => P.WHO[id] || (P.T[id].ms ? '' : '<span style="color:#94A3B8">nobody yet</span>');
const g3a = Gantt($('#w2card'), {
  id: 'g3a', rows: MONEY_ROWS, nums: NUM_B, w: CARD_IN.w, nameW: 560, rowH: 35, headH: 46, barH: 16, fs: 16, labFs: 13, numW: 34,
  d0: P.ymd(2026, 7, 1), d1: P.ymd(2027, 3, 31), zoom: 'month', today: 1, title: 'Tasks',
  cols: [{ key: 'who', label: 'Who', x: 330, w: 220 }], cell: (id) => whoOf(id), arrow: () => 0,
});
const g3b = Gantt($('#w2card'), {
  id: 'g3b', rows: MONEY_ROWS, nums: NUM_B, w: CARD_IN.w, nameW: 896, rowH: 35, headH: 46, barH: 16, fs: 16, labFs: 13, numW: 34,
  d0: P.ymd(2026, 7, 1), d1: P.ymd(2027, 3, 31), zoom: 'month', today: 1, title: 'Tasks',
  cols: [{ key: 'who', label: 'Who', x: 330, w: 210 }, { key: 'cost', label: 'Cost', x: 548, w: 140, align: 'r' }, { key: 'paid', label: 'Paid', x: 706, w: 176, align: 'r' }],
  cell: (id, k) => (k === 'who' ? whoOf(id) : (MONEY[id] ? MONEY[id][k] : '')), arrow: () => 0,
});

/* ============================================================ the programme over time (main window) */
const DRAG = { grab: 37.5, m0: 37.65, m1: 38.3, f0: 38.32, f1: 38.9 };
const CONF = 47.3;              // Demo Linings presses "Confirm dates"
const RAIN = { open: 49.75, tick: 50.55, push: 53.05, a0: 53.3, a1: 53.75 };
const STR = { grab: 65.6, s0: 65.75, s1: 66.2, f0: 66.22, f1: 66.62 };
const DAYS = { open: 75.55, add: 76.15, type0: 76.5, type1: 77.4, from: 77.75, to: 78.1, addit: 78.75, close: 79.55, a0: 79.85, a1: 80.75 };
const PHASES = [
  ['C', P.B, P.C, DRAG.f0, DRAG.f1], ['D', P.C, P.D, RAIN.a0, RAIN.a1], ['E', P.D, P.E, STR.f0, STR.f1], ['F', P.E, P.F, DAYS.a0, DAYS.a1],
];
function stateAt(t) {
  const S = {}; P.ORDER.forEach(id => S[id] = { s: P.B[id].s, e: P.B[id].e });
  PHASES.forEach(([k, A, B, t0, t1]) => {
    if (t <= t0 - 1) return;
    const mv = P.moved(A, B);
    mv.forEach((id, i) => {
      let p = ez(t, t0 + i * 0.03, t1 + i * 0.03, 'inOut');
      if (k === 'C' && id === 'ins') p = ez(t, DRAG.m0, DRAG.m1, 'inOut');
      if (k === 'E' && id === 'kit') p = ez(t, STR.s0, STR.s1, 'inOut');
      if (p > 0) S[id] = lerpS(A[id], B[id], p);
    });
  });
  return S;
}
// pb and stop are booked on QSME: the hand move is held as a proposal until they say yes (lookG2)
function lookG2(S, t) {
  return (id) => {
    const k = P.T[id], st = P.status(id), Bv = P.B[id];
    let col = st === 'onsite' ? ST.onsite : st === 'done' ? ST.done : ST.planned;
    let at = null, prop = null, amber = 0, label = '';
    if (id === 'pb' || id === 'stop') {
      col = ST.booked;
      const asked = t >= DRAG.f0, pbOk = id === 'pb' && t >= CONF + 1.0;
      if (asked && !pbOk) {
        at = { s: Bv.s, e: Bv.e }; prop = S[id]; amber = ez(t, DRAG.f0 + 0.2, DRAG.f0 + 0.4); col = 'rgba(14,165,233,.35)';
        label = `${P.span(Math.round(prop.s), Math.round(prop.e))} (proposed) · <em>waiting</em>`;
      }
    }
    if (!label) { const c = at || S[id]; label = P.span(Math.round(c.s), Math.round(c.e)); }
    const icon = st === 'done' ? TICK('#fff', 14) : (k.rain ? CLOUD('#fff', 14) : '');
    let purple = 0, ringS = 1;
    if (CHAIN.includes(id) && t > CH_ON) { const t0 = CH_ON + 0.15 + CHAIN.indexOf(id) * 0.09; purple = ez(t, t0, t0 + 0.12); ringS = lerp(1.25, 1, ez(t, t0, t0 + 0.25, 'out')); }
    return { col, at, prop, amber, label, icon, purple, ringS };
  };
}
function lookG1(t) {
  // chapter 1: imported end to end (cascade), then linked (bars snap beside what they wait for)
  return (id) => {
    const k = P.T[id], i = P.T[id].i;
    const ap = clamp((t - (23.35 + i * 0.1)) / 0.18);
    const lp = ez(t, 31.0 + i * 0.05, 31.45 + i * 0.05, 'inOut');
    const at = lerpS(P.A[id], P.B[id], lp);
    return { col: TRADE[k.trade], alpha: ap, clip: ap, at, label: P.span(Math.round(at.s), Math.round(at.e)), labA: clamp((t - (23.5 + i * 0.1)) / 0.2), icon: '' };
  };
}

/* ============================================================ the camera on the main window (chapters 2–6)
   [authored t, scale, focus x, focus y]: the focus point (frame coordinates) sits at the frame centre.
   Pushes land before each beat's action and pull back to full width only between beats. */
const FULL = [1, 960, 540];
const CAMK = [
  [IN(C2) - 0.5, ...FULL], [36.95, ...FULL], [37.45, 1.5, 820, 640],      // ch2: the drag, the proposed bars, the toast (above the captions)
  [41.6, 1.5, 820, 640], [43.4, 1.55, 1110, 472],                            // (behind the live page) on to the subcontractor's window
  [48.45, 1.55, 1110, 472], [49.1, ...FULL],
  [49.8, ...FULL], [50.3, 1.55, 960, 450],                                   // the rain dialog: the day and "What moves"
  [52.55, 1.55, 960, 450], [52.95, 1.55, 960, 580],                          // down to "Push these tasks", clear of the captions
  [53.15, 1.55, 960, 580], [53.65, ...FULL],
  [C3 + 0.31, ...FULL], [57.5, ...FULL], [58.0, 1.6, 1170, 462],            // ch3: View → Show
  [59.3, 1.6, 1170, 462], [59.9, 1.45, 1130, 632],                           // the purple chain, down to Handover
  [61.15, 1.45, 1130, 632], [61.6, 1.6, 772, 568],                           // names in frame: Driveways, the painter
  [65.0, 1.6, 772, 568], [65.5, 1.7, 1205, 672],                             // the stretch and the finish
  [68.0, 1.7, 1205, 672], [68.45, ...FULL],                                  // back out for the toast
  [C4 + 0.31, ...FULL], [71.9, ...FULL], [72.4, 1.5, 1130, 646],            // ch4: the shut fortnight
  [75.25, 1.5, 1130, 646], [75.75, 1.55, 960, 412],                          // Days off
  [76.2, 1.55, 960, 412], [76.65, 1.55, 960, 626],                           // down to the form and "Add it"
  [79.45, 1.55, 960, 626], [79.95, ...FULL],                                 // the band lands, the toast
  [82.15, ...FULL], [82.7, 1.45, 1130, 632],                                 // the band and the new finish
  [C5 + 0.29, 1.45, 1130, 632], [C5 + 0.31, ...FULL, 'hold'],
  [87.4, ...FULL], [87.85, 1.5, 1130, 484],                                  // ch5: Columns beside each task
  [89.4, 1.5, 1130, 484], [89.9, 1.7, 740, 672],                             // Cost and Paid
  [97.95, 1.7, 740, 672], [98.45, 1.7, 1205, 442],                           // the summary line
  [C6 + 0.29, 1.7, 1205, 442], [C6 + 0.31, ...FULL, 'hold'],
  [104.5, ...FULL], [104.95, 1.5, 1130, 484],                                // ch6: the download menu
];
const CAM_T0 = IN(C2) - 0.5, CAM_T1 = C6 + 7.0;
function softClamp(s, fx, fy) {     // keep the pushed view on the app window: no desk at the sides; a strip of desk may show under the top bar and behind the captions
  const top = W.y - 60, bot = W.y + W.h + 100;
  const wx = clamp((s - 1.2) / 0.2), wy = clamp((s - (1080 / (bot - top))) / 0.1);
  const cx = Math.max(W.x + 960 / s, Math.min(W.x + W.w - 960 / s, fx)), cy = Math.max(top + 540 / s, Math.min(bot - 540 / s, fy));
  return { s, fx: lerp(fx, cx, wx), fy: lerp(fy, cy, wy) };
}
function camAt(t) {
  if (t < CAM_T0 || t > CAM_T1) return { s: 1, fx: 960, fy: 540 };
  const k = CAMK;
  if (t <= k[0][0]) return { s: k[0][1], fx: k[0][2], fy: k[0][3] };
  for (let i = 1; i < k.length; i++) if (t < k[i][0]) {
    const a = k[i - 1], b = k[i], p = b[4] === 'hold' ? 0 : E.inOut((t - a[0]) / (b[0] - a[0]));
    return softClamp(lerp(a[1], b[1], p), lerp(a[2], b[2], p), lerp(a[3], b[3], p));
  }
  const z = k[k.length - 1]; return softClamp(z[1], z[2], z[3]);
}
let CAM = { s: 1, fx: 960, fy: 540 };
const toScr = (x, y) => [960 + CAM.s * (x - CAM.fx), 540 + CAM.s * (y - CAM.fy)];
const SAFE = { x0: 112, y0: 120, x1: 1808, y1: 900 };             // stickies stay clear of the top bar and the captions
function put(sel, x, y, frame) {       // place a sticky (frame coords go through the camera); returns how far it had to be pulled in
  const el = $(sel); const [sx, sy] = frame ? toScr(x, y) : [x, y];
  const w = el.offsetWidth, h = el.offsetHeight;
  const cx = Math.max(SAFE.x0, Math.min(SAFE.x1 - w, sx)), cy = Math.max(SAFE.y0, Math.min(SAFE.y1 - h, sy));
  el.style.left = cx.toFixed(1) + 'px'; el.style.top = cy.toFixed(1) + 'px';
  return Math.hypot(cx - sx, cy - sy);
}

/* ============================================================ captions (= VO, word for word) */
const CAPS = [
  [1.95, 4.3, 'No dates on the bars.'], [4.35, 6.7, 'It runs off the page.'], [6.8, 9.6, 'One contract, counted <b>six times.</b>'],
  [19.1, 23.6, 'Start from what you priced.'], [23.9, 27.5, 'Each job brings its <b>own days.</b>'], [27.75, 30.6, 'Even the rain flag comes across.'],
  [30.75, 34.3, 'Then you link what waits for what.'],
  [36.9, 41.5, 'One slip moves what’s linked.'], [41.75, 44.5, 'Anyone booked is <b>asked, not told.</b>'], [44.75, 49.2, 'Nothing changes for them until they say yes.'],
  [50.0, 54.6, 'Rained off? See what moves <b>before</b> you push.'],
  [59.7, 61.3, '<i>Purple</i> decides the finish date.'], [61.45, 62.95, '<u>Grey</u> has room.'], [63.05, 64.95, 'The painter everyone chased? <u>Never purple.</u>'],
  [65.2, 69.6, '<i>Purple</i> slips a day, the finish slips a day.'],
  [71.75, 75.3, 'This one runs straight through the site’s own shutdown.'], [75.45, 79.8, 'Your holidays and shutdowns? Add them as <b>days off.</b>'],
  [80.2, 82.4, 'Work moves later. <b>Never earlier.</b>'], [82.55, 85.2, 'Mid-January was never real.'],
  [89.2, 92.3, 'Estimates carry a squiggle. Agreed prices don’t.'], [92.6, 97.8, 'And a contract counts <b>once,</b> not six times.'], [98.1, 102.4, 'Paid is what’s been recorded as paid.'],
  [104.6, 107.25, 'The whole chart fits across the A4.'], [107.4, 109.15, 'The task list follows.'], [109.3, 111.55, 'Dates in words, on every bar.'],
  [111.75, 115.25, 'When, how long, how much. Up top.'], [115.4, 119.8, 'And the lender’s question, answered <b>in one sentence.</b>'], [123.55, 125.35, 'On your letterhead.'],
];
$('#caps').innerHTML = CAPS.map((c, i) => `<div class="cap" id="cap${i}"><span>${c[2]}</span></div>`).join('');
CAPS.forEach((c, i) => Kit.add('#cap' + i, 'opacity', [[0, 0], [c[0], 0], [c[0] + 0.14, 1, 'out'], [c[1] - 0.12, 1], [c[1], 0]]).add('#cap' + i, 'y', [[c[0], 14], [c[0] + 0.2, 0, 'out']]));

/* ============================================================ scenes */
Kit.scene('#sH', 0, TITLE + 0.3).scene('#sT', TITLE + 0.28, C1 + 0.3);
Kit.scene('#w1', IN(C1) - 0.4, C2 + 0.3).scene('#stk1', IN(C1) - 0.4, C2 + 0.3);
Kit.scene('#camW', IN(C2) - 0.4, C6 + 7.0).scene('#ann', IN(C2) - 0.4, C6 + 3.0);
Kit.scene('#s6', C6 + 3.6, ENDC + 0.4).scene('#sE', ENDC, DUR + 1);
Kit.scene('#site1', 27.5, 30.9).scene('#site2', 41.5, 44.9);
CARDS.forEach((c, i) => Kit.scene('#cd' + (i + 1), c + 0.28, IN(c) + 0.02));
Kit.scene('#w3', 44.3, 48.75);

/* wipes: chapter cards and the title */
const wk = [[0, -1940]];
[TITLE].concat(CARDS).forEach(c => { wk.push([c, -1940]); wk.push([c + 0.28, 0, 'swipe']); wk.push([c + 0.3, 0]); wk.push([c + 0.58, 1940, 'swipe']); wk.push([c + 0.59, -1940, 'hold']); });
Kit.add('#wipe', 'x', wk);
CARDS.forEach((c, i) => { Kit.add('#cd' + (i + 1), 'x', [[IN(c) - 0.35, 0], [IN(c), -1920, 'swipe']]); });
Kit.add('#w1', 'x', [[IN(C1) - 0.35, 1920], [IN(C1), 0, 'swipe']]);
Kit.add('#stk1', 'x', [[IN(C1) - 0.35, 1920], [IN(C1), 0, 'swipe']]);
const w2x = [[0, 1920]];
[C2, C3, C4, C5, C6].forEach(c => { w2x.push([c + 0.29, 0]); w2x.push([c + 0.3, 1920, 'hold']); w2x.push([IN(c) - 0.35, 1920]); w2x.push([IN(c), 0, 'swipe']); });
Kit.add('#w2wrap', 'x', w2x);

/* top bar */
const KICKS = [[IN(C1) - 0.3, '1 · From the estimate'], [IN(C2) - 0.3, '2 · Slips and rain'], [IN(C3) - 0.3, '3 · What drives the finish'], [IN(C4) - 0.3, '4 · Your days off'], [IN(C5) - 0.3, '5 · Money, once'], [IN(C6) - 0.3, '6 · Print it']];
Kit.add('#topbar', 'opacity', [[0, 0], [TITLE + 0.3, 0], [TITLE + 0.5, 1], [CTA, 1], [CTA + 0.3, 0]]);
[1, 2, 3, 4, 5, 6].forEach(i => {
  const c = CARDS[i - 1], next = CARDS[i] || CTA;
  Kit.add('#pip' + i, 'background', [[0, '#0C1310'], [c + 0.28, '#0C1310'], [c + 0.3, '#3DC023', 'hold'], [next + 0.28, '#3DC023'], [next + 0.3, '#14211A', 'hold']]);
  Kit.add('#pip' + i, 'color', [[0, '#86958B'], [c + 0.28, '#86958B'], [c + 0.3, '#06130A', 'hold'], [next + 0.28, '#06130A'], [next + 0.3, '#A9B8AE', 'hold']]);
  Kit.add('#pip' + i, 'borderColor', [[0, '#213128'], [c + 0.28, '#213128'], [c + 0.3, '#3DC023', 'hold'], [next + 0.28, '#3DC023'], [next + 0.3, '#2C5B22', 'hold']]);
});
// the quiet tag in the top bar: over the printout, and whenever the camera has pushed the window's own title-bar tag out of shot (see the per-frame hook)
Kit.each(t => {
  let k = ''; KICKS.forEach(([t0, s]) => { if (t >= t0) k = s; }); if (t >= CTA) k = '';
  const el = $('#kickA'); if (el.textContent !== k) el.textContent = k;
});

/* ============================================================ HOOK (0–12): mid-action, one marker note per caption */
Kit.add('#hPaper', 'rotate', [[0, -1.6]]).add('#hPaper', 'scale', [[0, 1], [12.0, 1.03]]);
Kit.add('#hT1', 'opacity', [[0, 1], [9.5, 1], [9.65, 0]]);
Kit.pop('#hT3', 9.7, { dy: 24 });
Kit.add('#mk1p', 'trim', [[0.25, 0], [0.7, 1, 'inOut']]).fade('#mkt1', 0.62, 0.77);
Kit.add('#mk2p', 'trim', [[4.2, 0], [4.6, 1, 'inOut']]).fade('#mkt2', 4.5, 4.65);
Kit.add('#mk3p', 'trim', [[6.7, 0], [7.1, 1, 'inOut']]);
Kit.add('#mk4p', 'trim', [[7.0, 0], [7.25, 1, 'inOut']]).fade('#mkt3', 7.15, 7.3);
Kit.add('#shTot', 'color', [[0, '#222222'], [6.85, '#222222'], [7.0, '#D92D20']]);

/* ============================================================ TITLE (12–17 authored; 15–16 is cut) */
Kit.pop('#tT', TITLE + 0.4).pop('#tS', 13.4, { dy: 14 });
[0, 1, 2, 3, 4, 5].forEach(i => Kit.pop('#tl' + i, 13.55 + i * 0.12, { dy: 12 }));
// the b-roll plays on the REAL clock, so the cut in the title's hold doesn't jump the footage
Kit.each(t => {
  if (t < TITLE || t > C1 + 0.35) return;
  const r0 = toReal(TITLE + 0.28), rt = REALT, img = $('#bgFrame');
  const i = Math.max(0, Math.min(149, Math.floor((rt - r0) * 30 + 1e-6)));
  const src = 'clips/frame/f_' + String(i).padStart(5, '0') + '.jpg'; if (img.getAttribute('src') !== src) img.setAttribute('src', src);
  img.style.transform = `scale(${lerp(1.04, 1.1, clamp((rt - toReal(TITLE)) / 4.3)).toFixed(4)})`;
});

/* ============================================================ CHAPTER 1 (17–34.4) */
Kit.add('#w1empty', 'opacity', [[0, 1], [23.2, 1], [23.3, 0]]);
Kit.add('#w1scrim', 'opacity', [[0, 0], [19.5, 0], [19.65, 1], [22.95, 1], [23.15, 0]]);
Kit.add('#dImp', 'opacity', [[0, 0], [19.55, 0], [19.7, 1, 'out'], [22.95, 1], [23.1, 0]]).add('#dImp', 'scale', [[19.55, 0.97], [19.75, 1, 'out']]);
const TICKS = POCKET_JOBS.map((pk, i) => 19.95 + i * 0.33);
const LINK_OFF = 22.45;                      // "Link them one after the other" unticked: the links are added by hand
const scrollK = [[0, 0]];
TICKS.forEach((tt, i) => { const target = -Math.max(0, Math.min(IMPORT_LIST.total - LISTH, IMPORT_LIST.tops[i] - 6)); scrollK.push([tt - 0.2, scrollK[scrollK.length - 1][1]]); scrollK.push([tt - 0.04, target, 'inOut']); });
Kit.add('#iScroll', 'y', scrollK);
POCKET_JOBS.forEach((pk, i) => {
  Kit.add('#ipkc' + i, 'opacity', [[0, 0], [TICKS[i], 0], [TICKS[i] + 0.04, 1]]);
  pk.jobs.forEach((k, j) => Kit.add('#ijc-' + k.id, 'opacity', [[0, 0], [TICKS[i] + 0.03 + j * 0.02, 0], [TICKS[i] + 0.07 + j * 0.02, 1]]));
});
Kit.add('#iLinkOn', 'opacity', [[0, 1], [LINK_OFF, 1], [LINK_OFF + 0.04, 0]]);
const cum = []; POCKET_JOBS.reduce((s, pk, i) => (cum[i] = s + pk.jobs.length), 0);
Kit.count('#iCount', [[0, 0]].concat(TICKS.map((tt, i) => [tt + 0.02, cum[i], 'hold'])), v => String(Math.round(v)));
Kit.add('#iBtn', 'opacity', [[0, 0.45], [TICKS[0], 0.45], [TICKS[0] + 0.05, 1]]);
Kit.pop('#t1link', 31.7, { dy: 20 }).out('#t1link', 34.0);
Kit.add('#stk1', 'opacity', [[0, 0], [26.0, 0], [26.12, 1, 'out'], [27.6, 1], [27.7, 0]]).add('#stk1', 'scale', [[26.0, 0.8], [26.2, 1, 'outBack']]);
// live page 1
Kit.add('#site1', 'opacity', [[27.5, 0], [27.7, 1, 'out'], [30.7, 1], [30.9, 0]]).add('#site1', 'y', [[27.5, 30], [27.75, 0, 'out']]);
Kit.add('#w1', 'opacity', [[27.45, 1], [27.65, 0.25], [30.7, 0.25], [30.9, 1]]);

// highlight boxes from clips/stills/*.json (line 2 starts at "they arrive…", measured on the 2026-10-04 crop)
const HL = { hl1b: [465, 71, 532, 40], hl1c: [60, 122, 432, 40], hl2a: [922, 20, 161, 40], hl2b: [60, 71, 363, 40] };
Object.keys(HL).forEach(k => { const [x, y, w, h] = HL[k]; Object.assign($('#' + k).style, { left: (90 + x - 4) + 'px', top: (84 + y + 2) + 'px', width: (w + 8) + 'px', height: (h - 2) + 'px' }); });
Kit.add('#hl1b', 'clipX', [[28.0, 0], [28.5, 1, 'inOut']]).add('#hl1c', 'clipX', [[28.5, 0], [28.85, 1, 'inOut']]);
Kit.add('#hl2a', 'clipX', [[42.0, 0], [42.25, 1, 'inOut']]).add('#hl2b', 'clipX', [[42.25, 0], [42.7, 1, 'inOut']]);

/* ============================================================ CHAPTER 2 (34.4–55.4) */
Kit.add('#sTime', 'opacity', [[0, 0], [36.55, 0], [36.7, 1, 'out'], [39.4, 1], [39.6, 0]]).add('#sTime', 'scale', [[36.55, 0.85], [36.75, 1, 'outBack']]);
Kit.show('#chW0', 0, DRAG.f0 + 0.3).show('#chW2', DRAG.f0 + 0.3, CONF + 1.0).show('#chW1', CONF + 1.0);
Kit.pop('#tDrag', 38.75, { dy: 20 }).out('#tDrag', 41.3);
Kit.add('#site2', 'opacity', [[41.5, 0], [41.7, 1, 'out'], [44.6, 1], [44.8, 0]]).add('#site2', 'y', [[41.5, 30], [41.75, 0, 'out']]);
Kit.add('#w3', 'opacity', [[44.3, 0], [44.55, 1, 'out'], [48.45, 1], [48.7, 0]]).add('#w3', 'x', [[44.3, 120], [44.6, 0, 'out']]);
Kit.add('#w2', 'opacity', [[41.45, 1], [41.65, 0.25], [44.6, 0.25], [44.75, 0.3], [48.45, 0.3], [48.65, 1]]);
Kit.add('#w3card', 'opacity', [[0, 1], [CONF + 0.15, 1], [CONF + 0.3, 0]]).add('#w3done', 'opacity', [[0, 0], [CONF + 0.3, 0], [CONF + 0.45, 1]]);
Kit.add('#w2scrim', 'opacity', [[0, 0], [RAIN.open - 0.05, 0], [RAIN.open + 0.1, 1], [RAIN.push + 0.05, 1], [RAIN.push + 0.2, 0],
  [DAYS.open - 0.05, 0], [DAYS.open + 0.1, 1], [DAYS.close, 1], [DAYS.close + 0.15, 0]]);
Kit.add('#dRain', 'opacity', [[0, 0], [RAIN.open, 0], [RAIN.open + 0.15, 1, 'out'], [RAIN.push + 0.05, 1], [RAIN.push + 0.2, 0]]).add('#dRain', 'scale', [[RAIN.open, 0.97], [RAIN.open + 0.2, 1, 'out']]);
Kit.add('#rChip', 'opacity', [[0, 0], [RAIN.tick + 0.05, 0], [RAIN.tick + 0.12, 1]]);
Kit.add('#rEmpty', 'opacity', [[0, 1], [RAIN.tick + 0.3, 1], [RAIN.tick + 0.32, 0]]).add('#rList', 'opacity', [[0, 0], [RAIN.tick + 0.38, 0], [RAIN.tick + 0.55, 1, 'out']]);
Kit.pop('#tRain', RAIN.a1 - 0.1, { dy: 20 }).out('#tRain', 55.1);
// rain-day calendar: October 2026
(function () {
  let h = '<div style="font:600 16px/1 Inter;text-align:center;margin:14px 0 12px">October 2026</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:0 12px;font:500 13px/1 Inter;color:#94A3B8;text-align:center">' + 'Mo Tu We Th Fr Sa Su'.split(' ').map(d => `<span>${d}</span>`).join('') + '</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:8px 12px 0;text-align:center">';
  const first = P.ymd(2026, 10, 1), lead = (P.dow(first) + 6) % 7;
  for (let i = 0; i < lead; i++) h += '<span></span>';
  for (let d = 1; d <= 31; d++) { const n = P.ymd(2026, 10, d), we = P.dow(n) === 0 || P.dow(n) === 6; h += `<span ${n === P.RAIN ? 'id="rDay"' : ''} style="height:30px;line-height:30px;border-radius:7px;font:500 15px/30px Inter;color:${we ? '#CBD5E1' : '#0F172A'}">${d}</span>`; }
  $('#rCal').innerHTML = h + '</div>';
})();
Kit.add('#rDay', 'background', [[0, '#FFFFFF'], [RAIN.tick, '#FFFFFF'], [RAIN.tick + 0.05, '#0F172A', 'hold']]).add('#rDay', 'color', [[0, '#0F172A'], [RAIN.tick, '#0F172A'], [RAIN.tick + 0.05, '#FFFFFF', 'hold']]);

/* ============================================================ CHAPTER 3 (55.4–69.8; holds at 60.75, 62.35, 64.45) */
Kit.add('#mView', 'opacity', [[0, 0], [57.95, 0], [58.08, 1, 'out'], [59.55, 1], [59.7, 0]]).add('#mView', 'scale', [[57.95, 0.96], [58.1, 1, 'out']]);
Kit.add('#miChainHl', 'opacity', [[0, 0], [58.45, 0], [58.52, 1]]);
Kit.add('#cbChain', 'opacity', [[0, 0], [CH_ON, 0], [CH_ON + 0.04, 1]]).add('#cbChain', 'scale', [[CH_ON, 0.6], [CH_ON + 0.12, 1, 'outBack']]);
Kit.show('#legStatus', 0, CH_ON + 0.3).show('#legPurple', CH_ON + 0.3, C5 + 0.3);
Kit.add('#sRainOk', 'opacity', [[0, 0], [61.6, 0], [61.72, 1, 'out'], [62.95, 1], [63.1, 0]]).add('#sRainOk', 'scale', [[61.6, 0.8], [61.76, 1, 'outBack']]);
Kit.add('#sPaint', 'opacity', [[0, 0], [63.2, 0], [63.32, 1, 'out'], [64.9, 1], [65.05, 0]]).add('#sPaint', 'scale', [[63.2, 0.8], [63.36, 1, 'outBack']]);
Kit.pop('#tStretch', 68.5, { dy: 20 }).out('#tStretch', 69.45);

/* ============================================================ CHAPTER 4 (69.8–85.4) */
Kit.add('#sXmas', 'opacity', [[0, 0], [72.6, 0], [72.72, 1, 'out'], [75.3, 1], [75.45, 0]]).add('#sXmas', 'scale', [[72.6, 0.8], [72.76, 1, 'outBack']]);
Kit.add('#dDays', 'opacity', [[0, 0], [DAYS.open, 0], [DAYS.open + 0.15, 1, 'out'], [DAYS.close, 1], [DAYS.close + 0.15, 0]]).add('#dDays', 'scale', [[DAYS.open, 0.97], [DAYS.open + 0.2, 1, 'out']]);
Kit.add('#dDays', 'height', [[0, 356], [DAYS.add, 356], [DAYS.add + 0.18, 612, 'out'], [DAYS.addit + 0.15, 612], [DAYS.addit + 0.35, 372, 'out']]);
Kit.add('#dAddBtn', 'opacity', [[0, 1], [DAYS.add + 0.05, 1], [DAYS.add + 0.1, 0]]);
Kit.add('#dForm', 'opacity', [[0, 0], [DAYS.add + 0.05, 0], [DAYS.add + 0.15, 1], [DAYS.addit + 0.1, 1], [DAYS.addit + 0.2, 0]]);
Kit.add('#dPh', 'opacity', [[0, 1], [DAYS.type0, 1], [DAYS.type0 + 0.02, 0]]).add('#dName', 'opacity', [[0, 0], [DAYS.type0, 0], [DAYS.type0 + 0.02, 1]]);
Kit.type('#dNameT', DAYS.type0, DAYS.type1);
Kit.add('#dFrom', 'opacity', [[0, 0], [DAYS.from, 0], [DAYS.from + 0.05, 1]]).add('#dTo', 'opacity', [[0, 0], [DAYS.to, 0], [DAYS.to + 0.05, 1]]);
Kit.add('#dEntry', 'opacity', [[0, 0], [DAYS.addit + 0.2, 0], [DAYS.addit + 0.35, 1, 'out']]);
Kit.add('#g2-band', 'opacity', [[0, 0], [DAYS.a0 - 0.1, 0], [DAYS.a0 + 0.2, 1, 'out']]);
Kit.pop('#tDays', DAYS.a1 - 0.2, { dy: 20 }).out('#tDays', 82.0);

/* ============================================================ CHAPTER 5 (85.4–102.6; 96.3–97.0 and 100.6–102.1 are cut) */
Kit.add('#g2', 'opacity', [[0, 1], [C5 + 0.3, 1], [C5 + 0.31, 0, 'hold'], [C6 + 0.3, 0], [C6 + 0.31, 1, 'hold']]);
Kit.show('#g3a', C5 + 0.3, 89.05).show('#g3b', 89.05, C6 + 0.3);
Kit.add('#zWk', 'background', [[0, '#FFFFFF'], [C5 + 0.3, '#FFFFFF'], [C5 + 0.31, '#E5E9EE', 'hold'], [C6 + 0.3, '#E5E9EE'], [C6 + 0.31, '#FFFFFF', 'hold']]);
Kit.add('#zMo', 'background', [[0, '#E5E9EE'], [C5 + 0.3, '#E5E9EE'], [C5 + 0.31, '#FFFFFF', 'hold'], [C6 + 0.3, '#FFFFFF'], [C6 + 0.31, '#E5E9EE', 'hold']]);
Kit.show('#chOwed', C5 + 0.3, C6 + 0.3).show('#sumMoney', 89.6, C6 + 0.3);
Kit.add('#sumMoney', 'background', [[0, '#F4F6F5'], [98.3, '#F4F6F5'], [98.6, '#FFEC80', 'out']]);
Kit.add('#mCols', 'opacity', [[0, 0], [87.85, 0], [87.98, 1, 'out'], [89.35, 1], [89.5, 0]]).add('#mCols', 'scale', [[87.85, 0.96], [88.0, 1, 'out']]);
Kit.add('#miCostHl', 'opacity', [[0, 0], [88.2, 0], [88.26, 1], [88.6, 1], [88.66, 0]]).add('#cbCost', 'opacity', [[0, 0], [88.5, 0], [88.54, 1]]);
Kit.add('#miPaidHl', 'opacity', [[0, 0], [88.66, 0], [88.72, 1]]).add('#cbPaid', 'opacity', [[0, 0], [88.95, 0], [88.99, 1]]);
Kit.add('#sMoney1', 'opacity', [[0, 0], [93.9, 0], [94.02, 1, 'out'], [97.8, 1], [97.95, 0]]).add('#sMoney1', 'scale', [[93.9, 0.8], [94.06, 1, 'outBack']]);
Kit.add('#sMoney2', 'opacity', [[0, 0], [98.6, 0], [98.72, 1, 'out'], [102.4, 1], [102.55, 0]]).add('#sMoney2', 'scale', [[98.6, 0.8], [98.76, 1, 'outBack']]);
Kit.add('#tot27', 'opacity', [[0, 0], [93.0, 0], [93.15, 1, 'out'], [97.8, 1], [97.95, 0]]);
Kit.add('#strikeP', 'trim', [[95.0, 0], [95.35, 1, 'out']]);
(function () {
  const ids = P.CONTRACTS[1].tasks, x = FRAME.x + CARD_IN.x + 1, w = 896 - 2, y0 = FRAME.y + CARD_IN.y + 46;
  $('#rowsHl').innerHTML = ids.map((id, i) => `<div id="rh${i}" style="position:absolute;left:${x}px;top:${y0 + g3b.R[id] * 35 + 2}px;width:${w}px;height:31px;background:rgba(255,225,77,.38);border-radius:4px"></div>`).join('');
  ids.forEach((id, i) => Kit.add('#rh' + i, 'opacity', [[0, 0], [92.9 + i * 0.07, 0], [93.05 + i * 0.07, 1, 'out'], [97.8, 1], [97.95, 0]]));
})();

/* ============================================================ CHAPTER 6 (102.6–125.45) */
Kit.add('#mExp', 'opacity', [[0, 0], [105.05, 0], [105.18, 1, 'out'], [106.25, 1], [106.4, 0]]).add('#mExp', 'scale', [[105.05, 0.96], [105.2, 1, 'out']]);
Kit.add('#miPdfHl', 'opacity', [[0, 0], [105.55, 0], [105.62, 1]]);
Kit.add('#w2wrap', 'opacity', [[0, 1], [106.5, 1], [106.85, 0]]);
Kit.add('#s6', 'opacity', [[0, 0], [106.45, 0], [106.75, 1]]);

/* ============================================================ the printout (recreated "Construction programme", page 1 + page 2) */
(function buildPaper() {
  const S = P.F, F = S.ho.s, rows = P.ORDER;
  const doneN = rows.filter(id => P.status(id) === 'done').length, onN = rows.filter(id => P.status(id) === 'onsite').length;
  const PG = { x0: 330, w: 874, d0: P.ymd(2026, 7, 1), d1: P.ymd(2027, 2, 28) };
  const pxd = PG.w / (PG.d1 - PG.d0 + 1), px = d => PG.x0 + (d - PG.d0) * pxd;
  const groups = []; const byTrade = {};
  rows.forEach(id => { const tr = P.POCKETS[P.T[id].pocket]; if (!byTrade[tr]) { byTrade[tr] = []; groups.push(tr); } byTrade[tr].push(id); });
  let gh = '';
  for (let d = PG.d0; d <= PG.d1; d++) { const dt = P.dt(d); if (dt.getUTCDate() === 1) { gh += `<div class="gm" style="left:${(px(d) + 3).toFixed(1)}px">${P.MON[dt.getUTCMonth()]}${dt.getUTCMonth() === 0 || d === PG.d0 ? ' ' + dt.getUTCFullYear() : ''}</div><div class="gw" style="left:${px(d).toFixed(1)}px"></div>`; } }
  gh += `<div class="gband" style="left:${px(P.SHUT.from).toFixed(1)}px;width:${(px(P.SHUT.to + 1) - px(P.SHUT.from)).toFixed(1)}px"></div>`;
  gh += `<div class="gw" style="left:${(px(P.TODAY) + pxd / 2).toFixed(1)}px;width:2px;background:#16A34A"></div>`;
  let y = 24; const LH = 13.4; const ringPts = [];
  groups.forEach(tr => {
    gh += `<div class="gl gh" style="top:${(y + 3).toFixed(1)}px;width:310px">${tr}</div>`; y += LH;
    byTrade[tr].forEach(id => {
      const k = P.T[id], s = S[id], st = P.status(id);
      const col = st === 'done' ? '#065F46' : st === 'onsite' ? '#16A34A' : (id === 'pb' || id === 'stop') ? '#0EA5E9' : '#64748B';
      const when = P.span(s.s, s.e) + (id === 'stop' ? ' (proposed)' : '');
      gh += `<div class="gl" style="top:${(y + 1).toFixed(1)}px;width:310px">${NUM_B[id]}. ${k.name}</div>`;
      const on = CHAIN.includes(id);
      if (k.ms) {
        const cx = px(s.s) + pxd / 2;
        if (on) { gh += `<div class="gr" style="left:${(cx - 8).toFixed(1)}px;top:${(y - 1.5).toFixed(1)}px;width:16px;height:16px;transform:rotate(45deg)"></div>`; ringPts.push([cx, y + 6]); }
        gh += `<div class="gb" style="left:${(cx - 4.5).toFixed(1)}px;top:${(y + 2).toFixed(1)}px;width:9px;height:9px;background:#64748B;transform:rotate(45deg);border-radius:2px"></div><div class="gd" style="left:${(cx + 13).toFixed(1)}px;top:${(y + 2).toFixed(1)}px">${when}</div>`;
      } else {
        const x = px(s.s) + 0.5, w = Math.max(3, px(s.e + 1) - px(s.s) - 1);
        if (id === 'stop') gh += `<div class="gb" style="left:${(px(P.B.stop.s) + 0.5).toFixed(1)}px;top:${(y + 2).toFixed(1)}px;width:${(px(P.B.stop.e + 1) - px(P.B.stop.s) - 1).toFixed(1)}px;background:transparent;border:1.5px solid #1C1C1E"></div>`;
        if (on) { gh += `<div class="gr" style="left:${(x - 4).toFixed(1)}px;top:${(y - 1).toFixed(1)}px;width:${(w + 8).toFixed(1)}px;height:15px"></div>`; ringPts.push([x + w / 2, y + 6.5]); }
        gh += `<div class="gb" style="left:${x.toFixed(1)}px;top:${(y + 2.5).toFixed(1)}px;width:${w.toFixed(1)}px;background:${col}"></div><div class="gd" style="left:${(x + w + 8).toFixed(1)}px;top:${(y + 2).toFixed(1)}px">${when}</div>`;
      }
      y += LH;
    });
  });
  const PGY = 430;
  window.__ringPts = ringPts.map(([x, yy]) => [x + 48, yy + PGY]);
  $('#paper').innerHTML = `
    <div class="pt">Construction programme</div>
    <div class="pm">Riverside Terraces — Stage 3 · ${rows.length} tasks · as at ${P.long(P.TODAY)}</div>
    <div class="lh"><div class="lg">DD</div><div><b>Demo Developments</b><small>Demo letterhead · fictional</small></div></div>
    <div class="boxes" style="top:124px">
      <div class="bx" id="bx1"><small>ON SITE FROM</small><b>${P.pdfDay(P.START)}</b></div>
      <div class="bx" id="bx2"><small>FINISHES</small><b>${P.pdfDay(F)}</b><i>set by ${CHAIN.length} ringed tasks</i></div>
      <div class="bx" id="bx3"><small>HOW LONG</small><b>${P.howLong(P.START, F)}</b></div>
      <div class="bx" id="bx4"><small>TASKS</small><b>${rows.length} tasks</b><i>${doneN} finished · ${onN} on site</i></div>
      <div class="bx" id="bx5"><small>NEXT MILESTONE</small><b>Handover</b><i>${P.pdfDay(F)}</i></div>
    </div>
    <div class="boxes" style="top:216px;right:auto;width:${(1300 - 96 - 24) * 3 / 5 + 24}px">
      <div class="bx"><small>CONTRACT VALUE</small><b>904,000</b><i>3 contracts</i></div>
      <div class="bx"><small>PAID TO DATE</small><b>601,000</b><i>confirmed payments</i></div>
      <div class="bx"><small>STILL TO PAY</small><b>303,000</b><i>each contract counted once</i></div>
    </div>
    <div class="sent" style="top:316px"><p><i class="ri"></i><b>What drives the finish date:</b> ${CHAIN.length} linked tasks, ringed in purple, ending with Handover on ${P.long(F)}.</p>
      <p><span id="hlsent"><span id="hlbar"></span>Any one of them running late moves the whole finish.</span> Anything not ringed has room to move without changing it.</p></div>
    <div class="lgd" style="top:322px"><span><i style="width:10px;height:10px;background:#64748B;transform:rotate(45deg);border-radius:1px"></i>Milestone</span><span><i style="width:22px;height:12px;border:2.5px solid #A855F7;border-radius:4px"></i>Purple ring: drives the finish date</span><span><i style="width:22px;height:12px;border:1.5px solid #1C1C1E;border-radius:3px"></i>Outline: the dates already agreed</span></div>
    <div id="pg" style="position:absolute;left:48px;top:${PGY}px;width:1204px;height:${y + 10}px">${gh}</div>
    <div class="foot"><span>Demo Developments · Demo letterhead · fictional</span><span>Powered by QSME</span></div>`;

  /* page 2: "Task list" (schedule_programme_export.go programmeListSection: # · Task · Who · Cost · Paid · After · Status, dates order) */
  const L = rows.slice().sort((a, b) => (S[a].s - S[b].s) || (P.T[a].i - P.T[b].i));
  const N = {}; L.forEach((id, i) => N[id] = i + 1);
  const first = {}; P.CONTRACTS.forEach(c => { first[c.tasks[0]] = c; });
  const stw = id => ({ done: 'Finished', onsite: 'On site', planned: 'Planned' })[P.status(id)];
  const after = id => (P.PRED[id] || []).map(l => [N[l.a], l.gap]).sort((a, b) => a[0] - b[0]).map(([n, g]) => n + (g ? '+' + g : '')).join(', ');
  let lh = `<div class="p2h">Task list</div><div class="p2m">Riverside Terraces — Stage 3 · as at ${P.long(P.TODAY)}</div><div class="p2t">
    <div class="p2r p2hd"><i>#</i><i>Task</i><i>Who</i><i>Cost</i><i>Paid</i><i></i><i>After</i><i>Status</i></div>`;
  L.forEach(id => {
    const k = P.T[id], c = first[id], est = P.ESTIMATE[id];
    const task = k.name + (k.ms ? '  (milestone)' : '') + (k.rain ? '  (rain can stop)' : '') + (id === 'stop' ? '  (move not agreed yet)' : '') + (CHAIN.includes(id) ? '  (drives the finish date)' : '');
    const cost = c ? P.money(c.price) : est ? '~' + P.money(est) : '';
    const paid = c ? (c.paid ? P.money(c.paid) : 'not paid yet') : '';
    lh += `<div class="p2r${P.status(id) === 'done' ? ' fin' : ''}"><i>${N[id]}</i><i>${task.replace(/  /g, '&nbsp; ')}</i><i>${P.WHO[id] || ''}</i><i>${cost}</i><i>${paid}</i><i></i><i>${after(id)}</i><i>${stw(id)}</i></div>`;
  });
  $('#paper2').innerHTML = lh + `</div><div class="p2n">A contract’s figures are shown once, against the first task that contract covers. The totals count each contract once.</div>
    <div class="foot"><span>Demo Developments · Demo letterhead · fictional</span><span>Powered by QSME</span></div>`;
})();
// camera on the paper: slide in, whole page, flick to page 2, the dated bars, the boxes, the sentence, the rings, the letterhead
const PW = { x: 310, y: 120 };
function camTo(sc, fx, fy, cx, cy) { return { s: sc, x: cx - (PW.x + fx) * sc, y: cy - (PW.y + fy) * sc }; }
const WHOLE = camTo(0.86, 650, 440, 960, 520), BARS = camTo(1.5, 700, 655, 960, 500), BOXES = camTo(1.42, 650, 175, 960, 420),
  SENT = camTo(1.9, 400, 352, 900, 470), RINGS = camTo(1.3, 650, 650, 960, 500), LETTER = camTo(1.45, 900, 80, 1160, 360);
const CAMS = [
  [107.3, WHOLE], [110.1, WHOLE],
  [110.6, BARS], [111.55, BARS],
  [112.15, BOXES], [115.2, BOXES],
  [115.8, SENT], [121.0, SENT],                    // the highlighted sentence holds about 6 s before the pen
  [121.6, RINGS], [123.4, RINGS],
  [124.0, LETTER], [125.6, LETTER],
];
['s', 'x', 'y'].forEach(k => Kit.add('#pcam', k === 's' ? 'scale' : k, CAMS.map(([t, c], i) => [t, c[k], i ? 'inOut' : undefined])));
Kit.add('#pwrap', 'x', [[106.6, 1200], [107.25, 0, 'out']]).add('#pwrap', 'rotate', [[106.6, 8], [107.25, -1.2, 'out'], [107.4, -1.2], [107.9, 0, 'inOut']]).add('#pwrap', 'y', [[106.6, 40], [107.25, 0, 'out']]);
// the flick: page 1 slides off to show the task list underneath, then back
Kit.add('#paper', 'x', [[107.55, 0], [107.85, -1250, 'in'], [108.75, -1250], [109.05, 0, 'out']])
  .add('#paper', 'y', [[107.55, 0], [107.85, -50, 'in'], [108.75, -50], [109.05, 0, 'out']])
  .add('#paper', 'rotate', [[107.55, 0], [107.85, -7, 'in'], [108.75, -7], [109.05, 0, 'out']]);
Kit.add('#hlbar', 'clipX', [[116.05, 0], [116.55, 1, 'inOut']]);
Kit.add('#pcam', 'opacity', [[0, 1], [CTA, 1], [CTA + 0.3, 0.6]]);

/* ============================================================ END CARD */
Kit.clip('#bgend', { dir: 'clips/lockup', t0: ENDC, fps: 30, frames: 240, ext: '.jpg' });
Kit.fade('#sE', ENDC, ENDC + 0.35);
Kit.add('#bgend', 'scale', [[ENDC, 1.06], [DUR, 1]]);
Kit.fade('#elogo', ENDC + 0.2, ENDC + 0.5).pop('#eLine', ENDC + 0.35).pop('#ePill', ENDC + 0.75).pop('#eUrl', ENDC + 0.9).pop('#eAsk', ENDC + 2.2, { dy: 14 });

/* ============================================================ per-frame: camera, gantts, cursor, notes */
const cur = $('#cur');
const G2org = { x: FRAME.x + CARD_IN.x + G2O.nameW, y: FRAME.y + CARD_IN.y + G2O.headH + G2O.noteH };
const g2bar = (id, S, end) => { const b = g2.box(id, S[id]); return [G2org.x + (end ? b.x1 - 3 : b.cx), G2org.y + b.y + b.h / 2]; };
const btn = (sel) => { const el = $(sel); let x = el.offsetWidth / 2, y = el.offsetHeight / 2, n = el; while (n && n !== root && n.id !== 'camW') { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return [x, y]; };
let CK = null;
function cursorKeys() {
  if (CK) return CK;
  const shown = ['#w1', '#camW', '#w2wrap', '#w3', '#dImp', '#dRain', '#dDays', '#mView', '#mCols', '#mExp', '#dForm'].map(s => { const el = $(s), d = el.style.display; el.style.display = ''; return [el, d]; });
  try { CK = buildKeys(); } finally { shown.forEach(([el, d]) => { el.style.display = d; }); }
  return CK;
}
function buildKeys() {
  const imp = btn('#w1empBtn'), ib = btn('#iBtn'), list = btn('#iList'), lnk = btn('#iLinkCb');
  const listTop = list[1] - LISTH / 2;
  const rainB = btn('#bRain'), push = btn('#rPush'), day12 = btn('#rDay'), view = btn('#bView'), chainCb = btn('#miChain');
  const daysB = btn('#bDays'), addB = btn('#dAddBtn'), addIt = btn('#dAddIt'), costM = btn('#miCost'), paidM = btn('#miPaid'), exp = btn('#bExp'), pdf = btn('#miPdf');
  const cb0x = list[0] - 412 + 25;
  return [
    [IN(C1), [1000, 820]], [19.2, [imp[0] + 6, imp[1] + 8], 'inOut'], [19.35, [imp[0] + 6, imp[1] + 8]],
    [19.85, [cb0x + 4, listTop + 22], 'inOut'], [TICKS[6] + 0.08, [cb0x + 4, listTop + 22]],
    [LINK_OFF - 0.03, [lnk[0] + 4, lnk[1] + 6], 'inOut'], [LINK_OFF + 0.12, [lnk[0] + 4, lnk[1] + 6]],
    [22.8, [ib[0] + 8, ib[1] + 6], 'inOut'], [23.0, [ib[0] + 8, ib[1] + 6]], [23.6, [1500, 860], 'inOut'],
    [30.8, [1500, 860]], [31.2, [1520, 880], 'inOut'],
    // chapter 2
    [IN(C2), [1200, 860]], [DRAG.grab - 0.05, S => g2bar('ins', S), 'inOut'], [DRAG.m1 + 0.1, S => g2bar('ins', S)], [39.4, [1250, 860], 'inOut'],
    [RAIN.open - 0.5, [1250, 860]], [RAIN.open - 0.1, [rainB[0] + 6, rainB[1] + 6], 'inOut'], [RAIN.open + 0.05, [rainB[0] + 6, rainB[1] + 6]],
    [RAIN.tick - 0.05, [day12[0] + 4, day12[1] + 6], 'inOut'], [RAIN.tick + 0.3, [day12[0] + 4, day12[1] + 6]],
    [RAIN.push - 0.1, [push[0] + 6, push[1] + 6], 'inOut'], [RAIN.push + 0.2, [push[0] + 6, push[1] + 6]], [54.4, [1300, 880], 'inOut'],
    // chapter 3
    [IN(C3), [1300, 880]], [57.85, [view[0] + 6, view[1] + 6], 'inOut'], [58.0, [view[0] + 6, view[1] + 6]],
    [58.5, [chainCb[0] - 150, chainCb[1] + 6], 'inOut'], [CH_ON + 0.2, [chainCb[0] - 150, chainCb[1] + 6]], [60.0, [1680, 420], 'inOut'],
    [STR.grab - 0.4, [1680, 420]], [STR.grab - 0.05, S => g2bar('kit', S, 1), 'inOut'], [STR.s1 + 0.1, S => g2bar('kit', S, 1)], [67.4, [1560, 720], 'inOut'],
    // chapter 4
    [IN(C4), [1320, 880]], [DAYS.open - 0.4, [daysB[0] + 6, daysB[1] + 6], 'inOut'], [DAYS.open - 0.05, [daysB[0] + 6, daysB[1] + 6]],
    [DAYS.add - 0.05, [addB[0] - 40, addB[1] + 6], 'inOut'], [DAYS.add + 0.3, [addB[0] - 40, addB[1] + 6]],
    [DAYS.addit - 0.1, [addIt[0] + 4, addIt[1] + 4], 'inOut'], [DAYS.addit + 0.2, [addIt[0] + 4, addIt[1] + 4]], [80.4, [1300, 880], 'inOut'],
    // chapter 5
    [IN(C5), [1300, 880]], [87.8, [view[0] + 6, view[1] + 6], 'inOut'], [87.95, [view[0] + 6, view[1] + 6]],
    [88.45, [costM[0] - 160, costM[1] + 6], 'inOut'], [88.6, [costM[0] - 160, costM[1] + 6]], [88.9, [paidM[0] - 160, paidM[1] + 6], 'inOut'], [89.3, [paidM[0] - 160, paidM[1] + 6]], [90.2, [1400, 880], 'inOut'],
    // chapter 6
    [IN(C6), [1400, 880]], [104.95, [exp[0] + 4, exp[1] + 6], 'inOut'], [105.1, [exp[0] + 4, exp[1] + 6]], [105.6, [pdf[0] - 120, pdf[1] + 6], 'inOut'], [106.3, [pdf[0] - 120, pdf[1] + 6]],
  ];
}
const CLICKS = [19.33, LINK_OFF, 22.98, DRAG.grab, RAIN.open, RAIN.tick, RAIN.push, CONF, 57.98, CH_ON, STR.grab, DAYS.open - 0.03, DAYS.add, DAYS.addit, 87.93, 88.5, 88.95, 105.08, 106.0].concat(TICKS);
const HOLDK = [[DRAG.grab, DRAG.m1 + 0.05], [STR.grab, STR.s1 + 0.05]];
const CUR_ON = [[IN(C1) - 0.1, 31.3], [IN(C2) - 0.1, 41.4], [44.6, 47.9], [49.3, 54.5], [IN(C3) - 0.1, 67.5], [IN(C4) - 0.1, 80.5], [IN(C5) - 0.1, 90.3], [IN(C6) - 0.1, 106.4]];
function at(keys, t, S) {
  const v = p => (typeof p === 'function' ? p(S) : p);
  if (t <= keys[0][0]) return v(keys[0][1]);
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i], k = (E[b[2] || 'linear'])((t - a[0]) / (b[0] - a[0])), A = v(a[1]), B = v(b[1]); return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k]; }
  return v(keys[keys.length - 1][1]);
}
// the confirm click happens in the second account's window, not on a key above
let W3K = null;
const W3KEYS = () => { if (W3K) return W3K; const ok = btn('#w3ok'); W3K = [[44.6, [1500, 760]], [46.9, [ok[0] + 10, ok[1] + 8], 'inOut'], [47.8, [ok[0] + 10, ok[1] + 8]]]; return W3K; };
function ellipseAround(x, y, w, h) { const rx = w / 2 + 14, ry = h / 2 + 12, cx = x + w / 2, cy = y + h / 2; return `M${cx + rx * 0.2} ${cy - ry} C ${cx + rx * 1.1} ${cy - ry}, ${cx + rx * 1.05} ${cy + ry}, ${cx} ${cy + ry} C ${cx - rx * 1.08} ${cy + ry}, ${cx - rx * 1.06} ${cy - ry * 0.95}, ${cx - rx * 0.1} ${cy - ry * 1.05}`; }

Kit.each(function (t) {
  /* the camera on the main window */
  CAM = camAt(t);
  const tf = `translate(${(960 - CAM.s * CAM.fx).toFixed(2)}px,${(540 - CAM.s * CAM.fy).toFixed(2)}px) scale(${CAM.s.toFixed(4)})`;
  const cw = $('#camW'); if (cw.style.transform !== tf) cw.style.transform = tf;
  /* the dark band behind the top bar: whenever the window is pushed in, and over the printout */
  const paperBand = t > 107.2 ? clamp((t - 107.2) / 0.3) * (1 - clamp((t - CTA) / 0.3)) : 0;
  $('#tbBand').style.opacity = Math.max(clamp((CAM.s - 1) / 0.12), paperBand).toFixed(3);
  /* the recreation tag never leaves the frame: the window carries it in its title bar; when the push crops that bar off
     (the bar's screen y < 128), or over the printout, the top bar carries it instead (w3 shows its own) */
  const chromeY = 540 + CAM.s * (W.y + 22 - CAM.fy);
  const pushed = t >= CAM_T0 && t < 106.6 && !(t > 44.3 && t < 48.75) ? clamp((128 - chromeY) / 20) * clamp((CAM.s - 1) / 0.08) : 0;
  const ill = $('#ill'), want = t >= 106.6 ? PLABEL : LABEL;
  if (ill.textContent !== want) ill.textContent = want;
  ill.style.opacity = (t >= 106.6 ? paperBand : pushed).toFixed(3);
  /* chapter 1 gantt */
  if (t > IN(C1) - 0.5 && t < C2 + 0.35) g1.update(P.A, lookG1(t), t);
  /* chapters 2–5: the main window */
  if (t > IN(C2) - 0.5 && t < C6 + 7.2) {
    const S = stateAt(t);
    const look = lookG2(S, t);
    if (t < C5 + 0.3 || t >= C6 + 0.3) g2.update(S, look, t);
    else if (t < 89.05) g3a.update(S, look, t); else g3b.update(S, look, t);
    /* notes over the chart: anchored to the work, pulled inside the frame, faded when their anchor is out of shot */
    put('#sTime', 1180, 150);
    const finEl = $('#sFin');
    const showFin = (t > 60.5 && t < C4 + 0.28) || (t > IN(C4) - 0.3 && t < 85.3);
    let finA = showFin ? clamp((t - (t < C4 ? 60.5 : IN(C4) - 0.3)) / 0.15) : 0;
    if (showFin) {
      const [hx, hy] = g2bar('ho', S);
      const off = put('#sFin', hx - 270, hy - 22, true);
      finA *= (1 - clamp((off - 250) / 150)) * (1 - ez(t, DAYS.open - 0.2, DAYS.open) + ez(t, DAYS.close, DAYS.close + 0.25));   // not over the Days off dialog
      const v = t < STR.f1 - 0.1 ? P.C.ho.s : t < DAYS.a1 - 0.2 ? P.E.ho.s : P.F.ho.s;
      const txt = P.day(v); if ($('#sFinA').textContent !== txt) $('#sFinA').textContent = txt;
    }
    finEl.style.opacity = finA.toFixed(3);
    const plus = $('#sPlus');
    const pOn = (t > STR.f1 && t < 69.6) ? '+1 day' : (t > DAYS.a1 && t < 85.2) ? '+3 weeks' : '';
    plus.style.opacity = pOn ? (clamp((t - (pOn === '+1 day' ? STR.f1 : DAYS.a1)) / 0.15) * finA).toFixed(3) : 0;
    if (pOn) { if (plus.textContent !== pOn) plus.textContent = pOn; put('#sPlus', parseFloat(finEl.style.left) - 4, parseFloat(finEl.style.top) - 52); }
    const bz1 = $('#bz1'), bz2 = $('#bz2'), bz3 = $('#bz3'), bzBox = $('#bzBox');
    let d1 = '', d2 = '', d3 = '', db = '', tr1 = 0, tr2 = 0, tr3 = 0, trb = 0;
    if (t > 61 && t < 63.2) {     // Grey has room: the rain day pushed Driveways & landscaping, and the finish stayed put
      const b = g2.box('ext', S.ext), ax = G2org.x + b.x1 + 168, ay = G2org.y + b.y - 58;
      put('#sRainOk', ax, ay, true);
      d3 = `M${(ax - 6).toFixed(1)} ${(ay + 44).toFixed(1)} Q ${(ax - 70).toFixed(1)} ${(ay + 52).toFixed(1)} ${(G2org.x + b.x1 + 8).toFixed(1)} ${(G2org.y + b.y + b.h / 2).toFixed(1)}`; tr3 = ez(t, 61.75, 62.1);
    }
    if (t > 62.9 && t < 65.1) {   // the painter: never ringed
      const b = g2.box('paint', S.paint); const x = G2org.x + b.x, y = G2org.y + b.y; d1 = ellipseAround(x, y, b.w, b.h); tr1 = ez(t, 63.0, 63.45);
      put('#sPaint', x - 200, y - 6, true);
    }
    if (t > 71.9 && t < 75.5) {
      const x0 = G2org.x + g2.X(P.SHUT.from), x1 = G2org.x + g2.X(P.SHUT.to + 1);
      db = `M${x0} ${G2org.y - 6} L${x1} ${G2org.y - 6} L${x1} ${G2org.y + 15 * 36 + 4} L${x0} ${G2org.y + 15 * 36 + 4} Z`; trb = ez(t, 72.0, 72.6);
      put('#sXmas', (x0 + x1) / 2 - 170, G2org.y + 64, true);
    }
    if (t > 90.3 && t < 92.4) { const r = g3b.R.ext; const x = FRAME.x + CARD_IN.x + 548, y = FRAME.y + CARD_IN.y + 46 + r * 35; d1 = ellipseAround(x + 22, y + 8, 116, 18); tr1 = ez(t, 90.4, 90.85); }
    if (t > 91.0 && t < 92.4) { const r = g3b.R.frg; const x = FRAME.x + CARD_IN.x + 548, y = FRAME.y + CARD_IN.y + 46 + r * 35; d2 = ellipseAround(x + 22, y + 8, 116, 18); tr2 = ez(t, 91.1, 91.55); }
    if (t > 93 && t < 98.2) { put('#tot27', 1560, 300); put('#sMoney1', 1548, 410); }
    if (t > 98 && t < 102.7) put('#sMoney2', 1330, 300, true);
    bz1.setAttribute('d', d1); bz2.setAttribute('d', d2); bz3.setAttribute('d', d3); bzBox.setAttribute('d', db);
    [[bz1, tr1], [bz2, tr2], [bz3, tr3], [bzBox, trb]].forEach(([p, tr]) => { if (p.getAttribute('d')) { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = p === bzBox ? '0.02 0.015' : '1 1'; p.style.strokeDashoffset = String(p === bzBox ? 0 : 1 - tr); p.style.opacity = p === bzBox ? trb : (tr > 0 ? 1 : 0); } else p.style.opacity = 0; });
  }
  /* cursor (through the camera on the main window) */
  let on = 0; CUR_ON.forEach(([a, b]) => { if (t >= a && t < b) on = 1; });
  cur.style.opacity = on;
  if (on) {
    const S = (t > IN(C2) - 0.5) ? stateAt(t) : P.A;
    let p = (t >= 44.6 && t < 47.9) ? at(W3KEYS(), t, S) : at(cursorKeys(), t, S);
    let sc = 1; CLICKS.forEach(c => { if (t >= c - 0.03 && t < c + 0.09) sc = 0.84; }); HOLDK.forEach(([a, b]) => { if (t >= a && t < b) sc = 0.86; });
    if (t >= CAM_T0) { p = toScr(p[0], p[1]); sc *= 1 + (CAM.s - 1) * 0.55; }
    cur.style.transform = `translate(${p[0].toFixed(1)}px,${p[1].toFixed(1)}px) scale(${sc.toFixed(3)})`;
  }
  /* ch6: the pen tracing the purple rings */
  if (t > 121.5 && t < 123.6 && window.__ringPts) {
    const pts = window.__ringPts, k = ez(t, 121.75, 123.2, 'inOut') * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(k)), f = k - i;
    const x = lerp(pts[i][0], pts[i + 1][0], f), y = lerp(pts[i][1], pts[i + 1][1], f);
    $('#tpenG').setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    $('#tpen').style.opacity = clamp((t - 121.55) / 0.2) * (1 - clamp((t - 123.4) / 0.2));
    let d = `M${pts[0][0]} ${pts[0][1]}`; for (let j = 1; j <= i; j++) d += ` L${pts[j][0]} ${pts[j][1]}`; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    $('#traceP').setAttribute('d', d); $('#trace').style.opacity = 1;
  } else { $('#tpen').style.opacity = 0; if (t < 121.5 || t > 123.7) $('#trace').style.opacity = 0; }
});
$('#tpenG').innerHTML = `<g transform="scale(.6) rotate(58)"><path d="M0 0 L16 -6.5 L16 6.5 Z" fill="#8E8E8E"/><path d="M0 0 L5 -2 L5 2 Z" fill="#2747A0"/><rect x="15" y="-9.5" width="50" height="19" rx="5" fill="#2747A0" opacity=".9"/><rect x="62" y="-9" width="196" height="18" rx="6" fill="#F4F3EF" stroke="#CFCDC6" stroke-width="1.5"/><rect x="246" y="-10.5" width="24" height="21" rx="6" fill="#2747A0"/></g>`;
$('#tpen').style.filter = 'drop-shadow(6px 10px 6px rgba(0,0,0,.3))';

/* ============================================================ the edit list: real file time → authored time */
const EV = SKIPS.map(([a0, a1]) => ({ a: a0, to: a1 })).concat(HOLDS.map(([a, d]) => ({ a, hold: d }))).sort((x, y) => x.a - y.a);
const SEG = []; let rr = 0, aa = 0;
EV.forEach(e => {
  SEG.push({ r0: rr, a0: aa, r1: rr + (e.a - aa), a1: e.a }); rr += e.a - aa; aa = e.a;
  if (e.hold) { SEG.push({ r0: rr, a0: aa, r1: rr + e.hold, a1: aa, hold: 1 }); rr += e.hold; } else aa = e.to;
});
SEG.push({ r0: rr, a0: aa, r1: rr + (DUR - aa), a1: DUR });
const REAL_DUR = +(rr + (DUR - aa)).toFixed(3);
function toAuth(t) { for (const s of SEG) if (t < s.r1) return s.hold ? s.a0 : s.a0 + Math.max(0, t - s.r0); return DUR; }
function toReal(a) { for (const s of SEG) if (!s.hold && a >= s.a0 && a <= s.a1) return s.r0 + (a - s.a0); for (const s of SEG) if (s.a0 >= a) return s.r0; return REAL_DUR; }
let REALT = 0;
Kit.ready({ duration: REAL_DUR, fonts: ['700 60px "Space Grotesk"', '500 20px Inter', '600 20px Inter', '700 20px Inter', '800 30px Inter', '500 20px "JetBrains Mono"', '700 36px Caveat', '400 40px "Permanent Marker"'] });
window.render = t => { REALT = t; Kit.render(toAuth(t)); };
// make.mjs's text QA samples real time too, so it checks exactly what the file shows
const overflow0 = Kit.overflow;
Kit.overflow = (t, safe) => { REALT = t; return overflow0(toAuth(t), safe); };
window.__toAuth = toAuth; window.__toReal = toReal; window.__SEG = SEG;
window.__TIMES = { CAPS: CAPS.map(c => [c[0], c[1], c[2].replace(/<[^>]+>/g, '')]), CARDS, TITLE, CTA, ENDC, DUR, REAL_DUR };
})();
