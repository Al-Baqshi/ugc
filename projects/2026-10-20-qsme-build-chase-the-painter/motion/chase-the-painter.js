/* Action: chase painter (week 6) — QSME Global. One timeline for both cuts.
   chase-the-painter.html       → body.build.r4x5  (LinkedIn 4:5, safe box 60,60,1020,1290)
   chase-the-painter-9x16.html  → body.build.r9x16 (YouTube Shorts 9:16, safe box 65,300,1015,1250)
   Everything is a pure function of t. The schedule and the printout are recreations (demo data) until
   the owner's Session B recordings replace them; see post.md → "Owner recordings to swap in". */
(function () {
'use strict';
const R9 = document.body.classList.contains('r9x16');
/* Corner label on the recreated screens. Review cuts keep the production note; any cut that might go public
   (e.g. if Session B slips, post.md open question 2) must set PUBLIC_LABEL = true and re-render both cuts. */
const PUBLIC_LABEL = false;
const LABEL = PUBLIC_LABEL ? 'Recreated screen · demo data' : 'Illustrative — swap for real QSME screen (demo data)';
const E = Kit.ease;
const clamp = v => Math.max(0, Math.min(1, v));
const ez = (t, t0, t1, e) => (E[e || 'inOut'])(clamp((t - t0) / (t1 - t0)));
const $ = s => document.querySelector(s);

/* layout numbers that differ between the cuts (everything else is CSS) */
const L = R9 ? {
  capA: 346, capB: 428, cap1: 388, zx: 40, zy: 634, labelY: 300, plabelY: 528, c8a: 318, c8b: 448, c9: 336,
  paperX: 90, paperY: 600, pdfF: [540, 1066]
} : {
  capA: 96, capB: 180, cap1: 140, zx: 40, zy: 318, labelY: 1196, plabelY: 1238, c8a: 72, c8b: 204, c9: 92,
  paperX: 90, paperY: 382, pdfF: [540, 806]
};

/* ------------------------------------------------------------------ the minutes (generic, unbranded) */
const WEEKS = [
  { d: 'Mon 28 Sep 2026', a: ['3.1', 'Inductions for the fit-out crews', 'Site', 'Closed'], b: ['4.3', 'Window reveal detail to confirm', 'Arch', 'Open'], c: ['4.6', 'Hardware schedule to the client', 'PM', 'Open'], e: ['5.1', 'Next meeting Mon 5 Oct, site office', 'All', '—'] },
  { d: 'Mon 5 Oct 2026', a: ['3.2', 'Skip swap moved to Thursday', 'Site', 'Closed'], b: ['4.3', 'Window reveal detail to confirm', 'Arch', 'Closed'], c: ['4.6', 'Hardware schedule to the client', 'PM', 'Closed'], e: ['5.1', 'Next meeting Mon 12 Oct, site office', 'All', '—'] },
  { d: 'Mon 12 Oct 2026', a: ['3.3', 'Gate code changed, tell everyone', 'Site', 'Closed'], b: ['4.4', 'Tile selection from the client', 'Client', 'Open'], c: ['4.7', 'Fire stopping inspection booked', 'Site', 'Open'], e: ['5.1', 'Next meeting Mon 19 Oct, site office', 'All', '—'] },
  { d: 'Mon 19 Oct 2026', a: ['3.4', 'Scaffold down, east elevation', 'Site', 'Closed'], b: ['4.4', 'Tile selection from the client', 'Client', 'Closed'], c: ['4.7', 'Fire stopping inspection booked', 'Site', 'Closed'], e: ['5.1', 'Next meeting Mon 26 Oct, site office', 'All', '—'] },
  { d: 'Mon 26 Oct 2026', a: ['3.5', 'Hoarding panel replaced', 'Site', 'Closed'], b: ['4.5', 'Benchtop template booked', 'PM', 'Open'], c: ['4.8', 'Joinery hardware on site', 'Site', 'Open'], e: ['5.1', 'Next meeting Mon 2 Nov, site office', 'All', '—'] },
  { d: 'Mon 2 Nov 2026', a: ['3.6', 'Drainage as-builts to engineer', 'Site', 'Closed'], b: ['4.5', 'Benchtop template booked', 'PM', 'Closed'], c: ['4.8', 'Joinery hardware on site', 'Site', 'Closed'], e: ['5.1', 'Next meeting Mon 9 Nov, site office', 'All', '—'] },
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
const PITCH = 740;
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
    <div class="ttl"><b>Week ${k + 8}</b><span>${w.d}</span></div>
    <div class="rule"></div>
    <div class="tr th"><i>Item</i><i>Action</i><i>By</i><i>Status</i></div>
    <div class="tr fd"><i>${w.a[0]}</i><i>${w.a[1]}</i><i>${w.a[2]}</i><i>${w.a[3]}</i></div>
    <div class="tr key"><i>4.2</i><i><span class="hl">Chase painter (starting 1 week late)</span></i><i>PM</i><i class="st">Open</i>
      <svg class="ul" viewBox="0 0 500 70" preserveAspectRatio="none">${lines}${live}</svg>${bang}</div>
    ${[w.b, w.c, w.e].map(r => `<div class="tr fd"><i>${r[0]}</i><i>${r[1]}</i><i>${r[2]}</i><i>${r[3]}</i></div>`).join('')}
  </div>`;
}

/* ------------------------------------------------------------------ the programme (demo data) */
const DW = 658 / 32, RH = 76, BH = 32;
const D0 = Date.UTC(2026, 9, 29);                       // Thu 29 Oct 2026 = day 0 of the visible window
const day = (m, d) => Math.round((Date.UTC(2026, m - 1, d) - D0) / 864e5);
const dow = i => (4 + i) % 7;                           // 0 Sun … 6 Sat
const xs = i => i * DW;
const yc = r => (r - 0.5) * RH;
const TASKS = [
  { id: 'pb', name: 'Plasterboard', sub: '10 days', s: day(10, 19), e: day(10, 30), st: 'done' },
  { id: 'jo', name: 'Joinery install', sub: '5 days', s: day(10, 28), e: day(11, 3), st: 'onsite' },
  { id: 'sw', name: 'Switchboard delivery', sub: '10 days', s: day(11, 2), e: day(11, 13), chain: 1, label: '2-13 Nov · 10 days' },
  { id: 'pa', name: 'Painting', sub: '5 days', s: day(11, 2), e: day(11, 6), label: '2-6 Nov' },
  { id: 'ef', name: 'Electrical fit-off', sub: '5 days', s: day(11, 16), e: day(11, 20), chain: 1, label: '16-20 Nov' },
  { id: 'co', name: 'Commissioning', sub: '2 days', s: day(11, 23), e: day(11, 24), chain: 1 },
  { id: 'fc', name: 'Final clean', sub: '1 day', s: day(11, 25), e: day(11, 25), chain: 1 },
  { id: 'ho', name: 'Handover', sub: 'Milestone', s: day(11, 26), e: day(11, 26), chain: 1, ms: 1 },
];
const ROW = {}; TASKS.forEach((k, i) => ROW[k.id] = i + 1);
/* Painting is deliberately NOT linked to anything after it. Truth sheet 7.6 says a dragged task takes what is
   linked after it along "keeping the gaps", so a Painting → Final clean link could drag the finish with it.
   Unlinked, Painting is simply un-ringed and has room (7.9). Session B test 0 decides whether the link can come back. */
const LINKS = [
  { a: 'sw', b: 'ef', chain: 1, on: 11.97 }, { a: 'ef', b: 'co', chain: 1, on: 12.15 },
  { a: 'co', b: 'fc', chain: 1, on: 12.31 }, { a: 'fc', b: 'ho', chain: 1, on: 12.45 },
];
const RING_ON = { sw: 11.85, ef: 12.03, co: 12.21, fc: 12.37, ho: 12.51 };
const COL = { planned: '#64748B', onsite: '#16A34A', done: '#065F46' };
const TICK = '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* the whole programme at time t: the two drags are the only things that change it */
function stateAt(t) {
  const S = {};
  TASKS.forEach(k => { S[k.id] = { s: k.s, e: k.e }; });
  const pd = 7 * ez(t, 15.8, 16.55, 'inOut');                         // Painting: starts a week later (2-6 → 9-13 Nov)
  S.pa.s += pd; S.pa.e += pd;
  const fd = ez(t, 19.55, 19.87, 'inOut');                            // Electrical fit-off: one day later
  S.ef.s += fd; S.ef.e += fd + 2 * ez(t, 19.91, 20.05, 'out');        // 17-23 Nov: it now spans the weekend
  [['co', 19.97], ['fc', 20.05], ['ho', 20.13]].forEach(([id, t0]) => { const k = ez(t, t0, t0 + 0.16, 'out'); S[id].s += k; S[id].e += k; });
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
/* rows are numbered from 3: Foundations (1) and Framing, roof & cladding (2) are finished, scrolled above */
const names = TASKS.map((k, i) => `<div class="nm" style="top:${i * RH}px"><div class="n">${i + 3}</div><div><b>${k.name}</b><small>${k.sub}</small></div></div>`).join('');
const rowLines = TASKS.map((k, i) => `<div class="rowline" style="top:${(i + 1) * RH}px"></div>`).join('');
const bars = TASKS.map(k => k.ms
  ? `<div class="dring" id="rg-${k.id}"></div><div class="dia" id="b-${k.id}"></div>`
  : `${k.chain ? `<div class="ring" id="rg-${k.id}"></div>` : ''}<div class="bar" id="b-${k.id}" style="background:${COL[k.st || 'planned']}">${k.st === 'done' ? TICK : ''}${k.label ? `<span id="bl-${k.id}">${k.label}</span>` : ''}</div>`).join('');
const arrowEls = LINKS.map((lk, i) => `<path id="ag${i}" stroke="#9CA3AF" stroke-width="2"/><path id="agh${i}" fill="#9CA3AF" stroke="none"/>` +
  (lk.chain ? `<path id="ap${i}" stroke="#A855F7" stroke-width="5"/><path id="aph${i}" fill="#A855F7" stroke="none"/>` : '')).join('');

/* the A4 printout (recreated): one page of "Construction programme" with demo data.
   It is exported AFTER both drags (no Undo), so every date matches the screen we just showed: Painting 9-13 Nov,
   fit-off 17-23 Nov, Handover (the finish) Fri 27 Nov. The job has been on site since Mon 3 Aug (minutes weeks 9-14). */
const SF = stateAt(99);
const MON = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const MONTH = 'January February March April May June July August September October November December'.split(' ');
const dt = i => new Date(D0 + i * 864e5);
const dShort = i => `${dt(i).getUTCDate()} ${MON[dt(i).getUTCMonth()]}`;
const dRange = (s, e) => s === e ? dShort(s) : dt(s).getUTCMonth() === dt(e).getUTCMonth() ? `${dt(s).getUTCDate()}-${dShort(e)}` : `${dShort(s)}-${dShort(e)}`;
const FINISH = SF.ho.s;
const P_ONSITE = day(8, 3), P_TASKS = 10;
const P_WEEKS = Math.round((FINISH - P_ONSITE + 1) / 7);
const PG = { x0: 286, w: 546, d0: P_ONSITE, n: 126 };          // printed chart: Mon 3 Aug → 6 Dec
const pxs = i => PG.x0 + (i - PG.d0) * PG.w / PG.n;
const PROWS = [
  ['g', 'Structure & envelope'], ['x', 'Foundations', day(8, 3), day(8, 21), 'done'], ['x', 'Framing, roof & cladding', day(8, 24), day(10, 16), 'done'],
  ['g', 'Insulation & linings'], ['t', 'pb'],
  ['g', 'Fit-out & joinery'], ['t', 'jo'],
  ['g', 'Electrical'], ['t', 'sw'], ['t', 'ef'], ['t', 'co'],
  ['g', 'Painting'], ['t', 'pa'],
  ['g', 'Other'], ['t', 'fc'], ['t', 'ho'],
];
let gantt = [[8, 3, 'August'], [9, 1, 'September'], [10, 1, 'October'], [11, 1, 'November']].map(([m, d, n]) => `<div class="gm" style="left:${pxs(day(m, d)).toFixed(1)}px">${n}</div>`).join('');
for (let i = PG.d0; i < PG.d0 + PG.n; i += 7) gantt += `<div class="gw" style="left:${pxs(i).toFixed(1)}px"></div>`;
gantt += `<div class="gw" style="left:${pxs(day(11, 2)).toFixed(1)}px;width:2px;background:#16A34A"></div>`;
PROWS.forEach((r, i) => {
  const y = 26 + i * 19.5;
  if (r[0] === 'g') { gantt += `<div class="gl gh" style="top:${y + 5}px">${r[1]}</div>`; return; }
  const k = r[0] === 'x' ? { name: r[1], s: r[2], e: r[3], st: r[4] } : Object.assign({}, TASKS.find(x => x.id === r[1]), SF[r[1]]);
  const when = dRange(k.s, k.e);
  gantt += `<div class="gl" style="top:${y + 4}px">${k.name}<span>${when}</span></div>`;
  if (k.ms) {
    const cx = (pxs(k.s) + pxs(k.s + 1)) / 2;
    gantt += `<div class="gr" style="left:${cx - 8}px;top:${y + 1}px;width:16px;height:16px;transform:rotate(45deg)"></div><div class="gb" style="left:${cx - 4.5}px;top:${y + 4.5}px;width:9px;height:9px;background:#64748B;transform:rotate(45deg);border-radius:2px"></div><div class="gd" style="left:${cx + 13}px;top:${y + 5}px">${when}</div>`;
  } else {
    const x = pxs(k.s) + 0.5, w = Math.max(3, pxs(k.e + 1) - pxs(k.s) - 1);
    if (k.chain) gantt += `<div class="gr" style="left:${x - 4}px;top:${y + 2}px;width:${w + 8}px;height:16px"></div>`;
    gantt += `<div class="gb" style="left:${x}px;top:${y + 5.5}px;width:${w}px;background:${COL[k.st || 'planned']}"></div><div class="gd" style="left:${x + w + 8}px;top:${y + 6}px">${when}</div>`;
  }
});

/* a takeaway coffee in 3/4 view (reads as coffee at a glance), with a faint steam wisp; PAINTER in marker on the sleeve */
const CUP = `<svg width="250" height="340" viewBox="0 0 250 340" style="overflow:visible">
  <defs>
    <linearGradient id="cupbody" x1="0" x2="1"><stop offset="0" stop-color="#E9E5DC"/><stop offset=".35" stop-color="#FBF9F4"/><stop offset=".7" stop-color="#EEEAE1"/><stop offset="1" stop-color="#CFC9BC"/></linearGradient>
    <linearGradient id="cupsleeve" x1="0" x2="1"><stop offset="0" stop-color="#B78B5C"/><stop offset=".38" stop-color="#D2A673"/><stop offset="1" stop-color="#A57A4D"/></linearGradient>
    <linearGradient id="cuplid" x1="0" x2="1"><stop offset="0" stop-color="#2A2624"/><stop offset=".4" stop-color="#4A4441"/><stop offset="1" stop-color="#211E1C"/></linearGradient>
    <filter id="cupsh" x="-40%" y="-200%" width="180%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="steamb" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>
  </defs>
  <ellipse cx="140" cy="318" rx="104" ry="17" fill="#000" opacity=".55" filter="url(#cupsh)"/>
  <path d="M28 82 L54 304 Q125 322 196 304 L222 82 Z" fill="url(#cupbody)"/>
  <path d="M36 148 Q125 160 214 148 L203 240 Q125 252 47 240 Z" fill="url(#cupsleeve)"/>
  <text x="125" y="208" text-anchor="middle" font-family="Permanent Marker" font-size="33" textLength="148" lengthAdjust="spacingAndGlyphs" fill="#1C1C1E" transform="rotate(-4 125 200)">PAINTER</text>
  <path d="M60 222 C 100 217, 150 218, 188 212" fill="none" stroke="#1C1C1E" stroke-width="3.5" stroke-linecap="round" transform="rotate(-4 125 200)"/>
  <path d="M18 80 Q125 102 232 80 L229 66 Q125 86 21 66 Z" fill="url(#cuplid)"/>
  <ellipse cx="125" cy="66" rx="104" ry="17" fill="#3B3633"/>
  <ellipse cx="125" cy="60" rx="86" ry="12" fill="#4A4441"/>
  <ellipse cx="160" cy="58" rx="15" ry="4.5" fill="#161413"/>
  <g id="steam" filter="url(#steamb)" fill="none" stroke="#FFFFFF" stroke-linecap="round">
    <path id="st1" d="M158 50 C 148 30, 172 14, 160 -8 C 150 -28, 170 -44, 162 -64" stroke-width="7"/>
    <path id="st2" d="M170 46 C 184 28, 166 10, 180 -12 C 190 -30, 176 -44, 186 -60" stroke-width="5"/>
  </g></svg>`;

document.getElementById('root').innerHTML = `
<svg width="0" height="0" style="position:absolute"><defs><filter id="grainf"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .9 0"/></filter></defs></svg>

<!-- S1 HOOK: six weeks of the same minutes -->
<div id="s1" class="fill">
  <div id="docv" class="abs" data-qa-ignore><div id="doc">${[1, 2, 3, 4, 5, 6].map(page).join('')}</div></div>
  <div id="docfade" class="abs"></div>
  <div id="h-week" class="abs">Six weeks of minutes.</div>
  <div id="h-act" class="abs display">Action: chase painter.</div>
  <div id="h-again" class="abs">(Again.)</div>
</div>

<!-- S2 THE LEDGER: what six weeks of minutes recorded -->
<div id="s2" class="fill">
  <div id="ledger" class="abs">
    <div class="lt">Minutes · actions carried forward</div>
    <div class="lr h"><i style="padding-left:10px">Week</i><i>Action</i><i>Practical completion</i></div>
    ${[1, 2, 3, 4, 5, 6].map(k => `<div class="lr" id="lr${k}"><i class="wk">${k + 8}</i><i class="ac"><span class="hl">Chase painter (starting 1 week late)</span></i><i class="pc"><b class="tint" id="tn${k}" style="background:${k < 5 ? '#DDF3DE' : '#FDE1DF'}"></b><span id="pc${k}">Fri 13 Nov</span></i></div>`).join('')}
  </div>
  <div id="plus9" class="abs">+9 working days</div>
  <div id="c2a" class="cap" style="top:${L.capA}px">Painter: starting a week late.</div>
  <div id="c2b" class="cap" style="top:${L.capB}px">Finish date: <span class="g">didn’t move.</span></div>
  <div id="c3a" class="cap" style="top:${L.capA}px">Something else moved it.</div>
  <div id="c3b" class="cap" style="top:${L.capB}px"><span class="r">Nobody minuted that.</span></div>
</div>

<!-- S3 PRODUCT: the schedule, recreated with demo data until Session B -->
<div id="s3" class="fill">
  <img id="logo1" class="abs" src="qsme-logo-nor.svg" alt="QSME">
  <div id="how" class="abs"><span>In the schedule, tick <b>“What drives the finish date”</b></span></div>
  <div id="zwrap" class="abs" style="left:0;top:0">
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
          <div id="note"><span id="n1">nobody</span><span id="n2">minuted this</span></div>
          <svg id="notearr" width="120" height="70" viewBox="0 0 120 70"><path id="notearr-p" d="M60 4 C 42 8, 22 20, 12 38 M12 38 L 27 32 M12 38 L 13 22"/></svg>
          <div class="tag wk" id="tg-wk"><span class="stk">Painter:<br>1 week late</span></div>
          <div class="tag bad" id="tg-dl"><span class="stk">Fit-off: 1 day late</span></div>
          <div class="fin" id="fin"><span class="stk"><small>Finish:</small><span class="fv"><span id="fin-a">Thu 26 Nov</span><span id="fin-b">Fri 27 Nov</span></span></span></div>
          <div class="tag ok" id="tg-ok"><span class="stk">didn’t move ✓</span></div>
          <div class="tag bad" id="tg-p1"><span class="stk">+1 day</span></div>
        </div>
      </div>
      <div id="key">
        <div class="kl"><span><i class="sw" style="background:#64748B"></i>Grey — Planned</span><span><i class="sw" style="background:#16A34A"></i>Green — On site</span><span><i class="sw" style="background:#065F46"></i>Dark green — Finished</span></div>
        <div class="kl" id="key2"><span><i class="rg"></i>Purple — This task drives the finish date.</span></div>
      </div>
      <div id="menu">
        <h6>Colour the bars by</h6><div class="mseg"><i>Trade</i><i class="on">Status</i></div>
        <div class="ck" id="ck-chain" style="position:relative;z-index:0"><div id="ck-chain-hl"></div><div class="bx" id="bx-chain"><div id="bx-chain-on">${CK}</div></div>What drives the finish date</div>
      </div>
      ${CURSOR}
    </div>
   </div>
   <div class="toast" id="toast1">1 moved<b>Undo</b></div>
   <div class="toast" id="toast2">1 moved — 3 that follow it came too<b>Undo</b></div>
  </div>
  </div>
  <div class="ill" id="ill1" style="left:60px;top:${L.labelY}px">${LABEL}</div>
  <div id="c4" class="cap" style="top:${L.cap1}px"><span class="pu">Purple</span> decides your finish date.</div>
  <div id="c5" class="cap" style="top:${L.cap1}px">Our painter? <span class="gy">Grey.</span></div>
  <div id="c6" class="cap" style="top:${L.cap1}px"><span class="gy">Grey</span> has room to move.</div>
  <div id="c7a" class="cap" style="top:${L.capA}px"><span class="pu">Purple</span> slips a day,</div>
  <div id="c7b" class="cap" style="top:${L.capB}px">the finish slips a day.</div>
</div>

<!-- S4 THE PRINTOUT on a desk, then the coffee -->
<div id="s4" class="fill">
  <div id="desk" class="fill"><svg id="grain" width="100%" height="100%"><rect width="100%" height="100%" filter="url(#grainf)"/></svg></div>
  <svg id="deskpen" class="abs" width="420" height="90" viewBox="-10 -45 420 90"><g transform="rotate(-38)">${PEN(1.45)}</g></svg>
  <div id="paperwrap" class="abs" style="left:${L.paperX}px;top:${L.paperY}px" data-qa-ignore>
    <div id="paper">
      <div class="pt">Construction programme</div>
      <div class="pm">Riverside Terraces — Stage 2 · ${P_TASKS} tasks · as at 2 November 2026</div>
      <div class="lh"><div class="mk">DB</div><div><b>Demo Building Co.</b><small>Demo letterhead · fictional</small></div></div>
      <div class="boxes">
        <div class="bxx"><small>ON SITE FROM</small><b>${dShort(P_ONSITE)} 2026</b></div>
        <div class="bxx"><small>FINISHES</small><b>${dShort(FINISH)} 2026</b></div>
        <div class="bxx"><small>HOW LONG</small><b>${P_WEEKS} weeks</b></div>
        <div class="bxx"><small>TASKS</small><b>${P_TASKS}</b></div>
        <div class="bxx"><small>NEXT MILESTONE</small><b class="nw">Handover, ${dShort(FINISH)}</b></div>
      </div>
      <div class="sent">
        <p><i class="ri"></i><b>What drives the finish date:</b> 5 linked tasks, ringed in purple, ending with Handover on ${dt(FINISH).getUTCDate()} ${MONTH[dt(FINISH).getUTCMonth()]} 2026.</p>
        <p><span id="hlsent"><span id="hlbar"></span>Any one of them running late moves the whole finish.</span><br>Anything not ringed has room to move without changing it.</p>
      </div>
      <div class="lg"><span><i style="width:9px;height:9px;background:#64748B;transform:rotate(45deg);border-radius:1px"></i>Milestone</span><span><i style="width:18px;height:10px;border:2px solid #A855F7;border-radius:4px"></i>Purple ring: drives the finish date</span><span><i style="width:18px;height:10px;border:1.5px solid #1C1C1E;border-radius:3px"></i>Outline: the dates already agreed</span></div>
      <div id="gantt">${gantt}</div>
    </div>
  </div>
  <div id="cup" class="abs" data-qa-ignore>${CUP}</div>
  <div class="ill" id="ill2" style="left:60px;top:${L.plabelY}px">${LABEL}</div>
  <div id="c8a" class="cap md" style="top:${L.c8a}px">QSME calls it<br><span class="pu">“What drives the finish date”</span>.</div>
  <div id="c8b" class="cap md" style="top:${L.c8b}px">You can call it the critical path.</div>
  <div id="c9" class="cap big" style="top:${L.c9}px">We owe the painter a coffee.</div>
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

/* ------------------------------------------------------------------ timeline (33.8 s; retimed 2026-10-04 after review) */
const DUR = 33.8;
Kit.scene('#s1', 0, 3.24).scene('#s2', 2.92, 9.9).scene('#s3', 9.45, 22.3).scene('#s4', 22.0, 31.0).scene('#s5', 30.75, DUR + 1);

/* S1 hook (0–2.92): frame 0 already carries the whole text hook */
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
// minutes → ledger: the same horizontal swipe as the ledger → schedule cut (no crossfade of two cream documents)
Kit.add('#s1', 'x', [[2.92, 0], [3.22, -1100, 'swipe']]);

/* S2 ledger (2.92–9.8) */
Kit.add('#ledger', 'x', [[2.92, 1100], [3.22, 0, 'swipe'], [9.45, 0], [9.8, -1100, 'swipe']]).add('#plus9', 'x', [[9.45, 0], [9.8, -1100, 'swipe']]);
Kit.pop('#c2a', 3.25).pop('#c2b', 4.35).out('#c2a', 6.45).out('#c2b', 6.45);
[1, 2, 3, 4].forEach(k => Kit.add('#tn' + k, 'opacity', [[0, 0], [4.35 + k * 0.06, 0], [4.55 + k * 0.06, 1, 'out'], [6.45, 1], [6.7, 0.35]]));
[5, 6].forEach(k => Kit.add('#tn' + k, 'opacity', [[0, 0], [6.6, 0], [6.8, 1, 'out']]));
const WD = ['Fri 13 Nov', 'Mon 16 Nov', 'Tue 17 Nov', 'Wed 18 Nov', 'Thu 19 Nov', 'Fri 20 Nov', 'Mon 23 Nov', 'Tue 24 Nov', 'Wed 25 Nov', 'Thu 26 Nov'];
const fmtD = v => WD[Math.max(0, Math.min(9, Math.round(v)))];
Kit.count('#pc5', [[6.6, 0], [7.45, 9, 'out']], fmtD).count('#pc6', [[6.7, 0], [7.55, 9, 'out']], fmtD);
// weeks 13-14 stay greyed (not yet) until they tick out in red, so "didn't move" visibly covers only weeks 9-12
Kit.add('#pc5', 'color', [[0, '#BDBAB2'], [6.6, '#BDBAB2'], [6.8, '#B42318']]).add('#pc6', 'color', [[0, '#BDBAB2'], [6.7, '#BDBAB2'], [6.9, '#B42318']]);
Kit.fade('#plus9', 7.6, 7.68).add('#plus9', 'scale', [[7.6, 1.5], [7.74, 1, 'slam']]).add('#plus9', 'rotate', [[7.6, -12], [7.74, -4, 'out']]);
Kit.pop('#c3a', 6.75).pop('#c3b', 7.95).out('#c3a', 9.35).out('#c3b', 9.35);

/* S3 product (9.45–22.25) */
Kit.add('#zclip', 'x', [[9.45, 1100], [9.8, 0, 'swipe']]);
Kit.add('#ill1', 'x', [[9.45, 1100], [9.8, 0, 'swipe']]);
// the one product action: pill up 2.2 s, menu open 1.7 s, cursor rests on the checkbox ~0.8 s before the tick
Kit.pop('#logo1', 9.6, { dy: 16 }).pop('#how', 9.7, { dy: 16 }).out('#logo1', 11.88).out('#how', 11.88);
Kit.add('#menu', 'opacity', [[0, 0], [10.26, 0], [10.36, 1, 'out'], [11.8, 1], [11.94, 0]]).add('#menu', 'scale', [[10.26, 0.96], [10.4, 1, 'out']]);
Kit.add('#ck-chain-hl', 'opacity', [[0, 0], [10.5, 0], [10.58, 1]]);
Kit.add('#bx-chain-on', 'opacity', [[0, 0], [11.4, 0], [11.44, 1]]).add('#bx-chain-on', 'scale', [[11.4, 0.6], [11.52, 1, 'outBack']]);
Kit.add('#viewdot', 'opacity', [[0, 0], [11.44, 0], [11.54, 1]]);
Kit.add('#key2', 'opacity', [[0, 0], [11.85, 0], [12.05, 1, 'out']]);
Kit.add('#rg-ho', 'rotate', [[0, 45]]);
Object.entries(RING_ON).forEach(([id, t0]) => { Kit.add('#rg-' + id, 'opacity', [[0, 0], [t0, 0], [t0 + 0.1, 1]]).add('#rg-' + id, 'scale', [[t0, 1.3], [t0 + 0.22, 1, 'out']]); });
LINKS.forEach((lk, i) => { if (lk.chain) { Kit.add('#ap' + i, 'trim', [[lk.on, 0], [lk.on + 0.16, 1, 'out']]); Kit.add('#aph' + i, 'opacity', [[0, 0], [lk.on + 0.14, 0], [lk.on + 0.17, 1]]); } });
Kit.pop('#c4', 12.0).out('#c4', 13.55);
Kit.add('#fin', 'opacity', [[0, 0], [12.7, 0], [12.85, 1, 'out']]).add('#fin', 'scale', [[12.7, 0.85], [12.9, 1, 'outBack']]);
Kit.show('#fin-a', 0, 20.25).show('#fin-b', 20.25);
Kit.add('#n1', 'clipX', [[12.9, 0], [13.15, 1, 'inOut']]).add('#n2', 'clipX', [[13.17, 0], [13.5, 1, 'inOut']]).add('#note', 'opacity', [[0, 0], [12.9, 0], [12.93, 1]]).out('#note', 15.2, 0.2);
Kit.add('#notearr-p', 'trim', [[13.47, 0], [13.73, 1, 'out']]).out('#notearr', 15.2, 0.2);
Kit.pop('#c5', 13.65).out('#c5', 15.17);
Kit.add('#biro-p', 'trim', [[13.71, 0], [14.13, 1, 'inOut']]).out('#biro', 15.2, 0.2);
// grey drag: Painting starts a week later; the finish does not move
Kit.pop('#c6', 15.3).out('#c6', 18.53);
Kit.add('#dr', 'opacity', [[0, 0], [15.73, 0], [15.77, 1], [16.59, 1], [16.63, 0], [19.39, 0], [19.43, 1], [19.89, 1], [19.93, 0]]);
Kit.add('#tg-wk', 'opacity', [[0, 0], [16.63, 0], [16.75, 1, 'out'], [18.47, 1], [18.61, 0]]).add('#tg-wk', 'scale', [[16.63, 0.8], [16.79, 1, 'outBack']]);
Kit.add('#tg-ok', 'opacity', [[0, 0], [16.85, 0], [16.97, 1, 'out'], [18.47, 1], [18.61, 0]]).add('#tg-ok', 'scale', [[16.85, 0.8], [17.01, 1, 'outBack']]);
Kit.add('#toast1', 'opacity', [[0, 0], [16.69, 0], [16.83, 1, 'out'], [18.37, 1], [18.53, 0]]).add('#toast1', 'y', [[16.69, 30], [16.85, 0, 'out']]);
// camera: purple push onto the chart (screen x 310 → frame left, screen y 230 → frame top) in both cuts;
// the 9:16 also gets a gentle grey push (screen x 231, y 150) so the Shorts cut can read Painting and FINISH
const ZP = { s: 1.46, x: -310 * 1.46, y: -230 * 1.46 }, ZG = { s: 1.3, x: -231 * 1.3, y: -150 * 1.3 };
if (R9) {
  Kit.add('#zoom', 'scale', [[15.22, 1], [15.72, ZG.s, 'inOut'], [18.67, ZG.s], [19.15, ZP.s, 'inOut']])
     .add('#zoom', 'x', [[15.22, 0], [15.72, ZG.x, 'inOut'], [18.67, ZG.x], [19.15, ZP.x, 'inOut']])
     .add('#zoom', 'y', [[15.22, 0], [15.72, ZG.y, 'inOut'], [18.67, ZG.y], [19.15, ZP.y, 'inOut']]);
} else {
  Kit.add('#zoom', 'scale', [[18.67, 1], [19.15, ZP.s, 'inOut']]).add('#zoom', 'x', [[18.67, 0], [19.15, ZP.x, 'inOut']]).add('#zoom', 'y', [[18.67, 0], [19.15, ZP.y, 'inOut']]);
}
const PUSH = R9 ? 15.22 : 18.67;    // names column, date header and legend leave before the push, so no half-cut names slide past
Kit.add('#key', 'opacity', [[0, 1], [PUSH, 1], [PUSH + 0.18, 0]]);
['#names', '#lhead', '#days'].forEach(s => Kit.add(s, 'opacity', [[0, 1], [PUSH, 1], [PUSH + 0.13, 0]]));
// purple drag: Electrical fit-off one day later; the finish moves a day
Kit.pop('#c7a', 18.75).pop('#c7b', 19.5).out('#c7a', 21.9).out('#c7b', 21.9);
Kit.add('#tg-dl', 'opacity', [[0, 0], [19.95, 0], [20.07, 1, 'out']]).add('#tg-dl', 'scale', [[19.95, 0.8], [20.11, 1, 'outBack']]);
Kit.add('#fin', 'scale', [[20.25, 1], [20.33, 1.14, 'out'], [20.49, 1, 'out']]);
Kit.add('#tg-p1', 'opacity', [[0, 0], [20.31, 0], [20.43, 1, 'out']]).add('#tg-p1', 'scale', [[20.31, 0.8], [20.47, 1, 'outBack']]);
Kit.add('#toast2', 'opacity', [[0, 0], [20.05, 0], [20.19, 1, 'out']]).add('#toast2', 'y', [[20.05, 30], [20.21, 0, 'out']]);
Kit.add('#zclip', 'opacity', [[22.0, 1], [22.25, 0]]).add('#zclip', 'scale', [[22.0, 1], [22.25, 0.92, 'in']]).out('#ill1', 22.0, 0.15);
Kit.add('#cur', 'opacity', [[0, 0], [9.8, 0], [9.9, 1]]);
Kit.add('#cur', 'scale', [[10.2, 1], [10.23, 0.82], [10.3, 1], [11.37, 1], [11.4, 0.82], [11.47, 1], [15.67, 1], [15.71, 0.86], [16.59, 0.86], [16.65, 1], [19.33, 1], [19.37, 0.86], [19.89, 0.86], [19.95, 1]]);

/* S4 the printout (22.0–27.95), then the coffee (27.9–30.75) */
Kit.fade('#desk', 22.0, 22.25).fade('#deskpen', 22.1, 22.35);
const pz = 2.1, P = [254, 221];      // P = centre of the sentence block on the paper
const PF = L.pdfF, ZX = PF[0] - L.paperX - pz * P[0], ZY = PF[1] - L.paperY - pz * P[1];
Kit.add('#paperwrap', 'x', [[22.1, 1150], [22.6, 0, 'out'], [22.72, 0], [23.3, ZX, 'inOut'], [27.95, ZX], [28.45, 0, 'inOut']]);
Kit.add('#paperwrap', 'y', [[22.1, 60], [22.6, 0, 'out'], [22.72, 0], [23.3, ZY, 'inOut'], [27.95, ZY], [28.45, 0, 'inOut']]);
Kit.add('#paperwrap', 'rotate', [[22.1, 9], [22.6, -1.5, 'out'], [22.72, -1.5], [23.3, 0, 'inOut'], [27.95, 0], [28.45, -1.5, 'inOut']]);
Kit.add('#paperwrap', 'scale', [[22.72, 1], [23.3, pz, 'inOut'], [27.95, pz], [28.45, 1, 'inOut']]);
// reading order once the zoom has landed: c8a (23.3) → highlighter (23.45–23.9) → c8b (25.8); 24 words over 4.6 s
Kit.add('#hlbar', 'clipX', [[23.45, 0], [23.9, 1, 'inOut']]);
Kit.pop('#c8a', 23.3).pop('#c8b', 25.8).out('#c8a', 27.9).out('#c8b', 27.9);
Kit.fade('#ill2', 22.15, 22.35);
// the punchline gets 2.65 s; the cup lands as the caption finishes popping
Kit.pop('#c9', 28.1);
Kit.add('#cup', 'x', [[27.9, 420], [28.3, 0, 'out']]).add('#cup', 'y', [[27.9, -50], [28.22, 7, 'out'], [28.32, 0, 'out']]).add('#cup', 'rotate', [[27.9, 14], [28.3, 0, 'out']]).fade('#cup', 27.9, 27.98);
Kit.add('#steam', 'opacity', [[0, 0], [28.3, 0], [28.8, 0.5, 'out']]);
Kit.add('#s4', 'opacity', [[30.75, 1], [31.0, 0]]);

/* S5 end card (30.75–33.8) */
Kit.clip('#bgdone', { dir: 'clips/done', t0: 30.75, fps: 30, frames: 102, ext: '.jpg' });
Kit.fade('#s5', 30.75, 31.0);
Kit.add('#bgdone', 'scale', [[30.75, 1.06], [DUR, 1]]);
Kit.fade('#logo2', 30.9, 31.15).add('#logo2', 'scale', [[30.9, 0.94], [31.25, 1, 'out']]);
Kit.pop('#endline', 31.07).pop('#endpill', 31.35).pop('#endurl', 31.49);

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
  M.dl = $('#tg-dl').offsetWidth;
  M.fin = $('#fin').offsetWidth; M.ok = $('#tg-ok').offsetWidth; M.p1 = $('#tg-p1').offsetWidth; M.wk = $('#tg-wk').offsetWidth; M.wkh = $('#tg-wk').offsetHeight;
  return M;
}
/* cursor path in #screen coords; a point may be a function of the programme state (to follow a dragged bar) */
const onBar = id => S => { const b = barBox(S, id); return [SCR.x + b.cx + 6, SCR.y + b.cy + 4]; };
function curKeys(m) {
  return [
    [9.8, [560, 470]], [10.2, [m.view[0] + 4, m.view[1] + 6], 'inOut'], [10.3, [m.view[0] + 4, m.view[1] + 6]],
    [10.6, [m.box[0] + 6, m.box[1] + 6], 'inOut'], [11.5, [m.box[0] + 6, m.box[1] + 6]], [12.05, [470, 640], 'inOut'],
    [15.3, [470, 640]], [15.71, onBar('pa'), 'inOut'], [16.65, onBar('pa')], [17.25, [560, 660], 'inOut'],
    [18.95, [560, 660]], [19.37, onBar('ef'), 'inOut'], [19.95, onBar('ef')], [20.5, [760, 540], 'inOut'],
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
const ul6 = $('#ul6'), pen = $('#pen'), biro = $('#biro'), biroP = $('#biro-p'), blPa = $('#bl-pa'), blEf = $('#bl-ef'), note = $('#note'), notearr = $('#notearr');
let ul6len = 0;

Kit.each(function (t) {
  /* hook: the pen tip rides the sixth underline */
  if (t > 1.8 && t < 3.0) {
    if (!ul6len) ul6len = ul6.getTotalLength();
    const p = ez(t, 2.12, 2.6, 'inOut'), q = ul6.getPointAtLength(p * ul6len);
    const inn = 1 - ez(t, 1.86, 2.1, 'out'), outt = ez(t, 2.64, 2.92, 'in');
    pen.setAttribute('transform', `translate(${(q.x + 160 * inn + 120 * outt).toFixed(1)} ${(q.y + 150 * inn - 90 * outt).toFixed(1)})`);
  }
  /* the coffee: a faint steam wisp drifting up (pure function of t) */
  if (t > 28 && t < 31.1) {
    const u = t - 28;
    $('#st1').setAttribute('transform', `translate(${(3 * Math.sin(u * 2.1)).toFixed(2)} ${(-((u * 14) % 22)).toFixed(2)})`);
    $('#st2').setAttribute('transform', `translate(${(3 * Math.sin(u * 1.7 + 1)).toFixed(2)} ${(-((u * 11 + 9) % 22)).toFixed(2)})`);
    $('#st1').style.opacity = (0.55 + 0.25 * Math.sin(u * 2.6)).toFixed(3); $('#st2').style.opacity = (0.4 + 0.25 * Math.sin(u * 2.2 + 2)).toFixed(3);
  }
  if (t < 9.4 || t > 22.4) return;
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
  /* our annotations (yellow sticky notes in biro, so they never read as QSME UI): finish note + tags follow the bars */
  const hb = barBox(S, 'ho'), fx = hb.cx - 30 - m.fin, fy = hb.cy - 31;
  const fin = $('#fin'); fin.style.left = fx.toFixed(1) + 'px'; fin.style.top = fy + 'px';
  $('#tg-ok').style.left = (fx - 14 - m.ok).toFixed(1) + 'px'; $('#tg-ok').style.top = (hb.cy - 28) + 'px';
  $('#tg-p1').style.left = (fx - 14 - m.p1).toFixed(1) + 'px'; $('#tg-p1').style.top = (hb.cy - 28) + 'px';
  const pab = barBox(S, 'pa'); $('#tg-wk').style.left = (pab.x - 16 - m.wk).toFixed(1) + 'px'; $('#tg-wk').style.top = (pab.cy - M.wkh / 2 + 4).toFixed(1) + 'px';
  const efb = barBox(S, 'ef'); $('#tg-dl').style.left = (Math.min(650, efb.x + efb.w + 100) - m.dl).toFixed(1) + 'px'; $('#tg-dl').style.top = (efb.y - 64) + 'px';
  /* in-bar date labels change when the bar is dropped */
  blPa.textContent = t < 16.55 ? '2-6 Nov' : '9-13 Nov';
  blEf.textContent = t < 19.87 ? '16-20 Nov' : '17-23 Nov';
  /* the biro note sits right of the switchboard bar, its arrow pointing back at the bar's end */
  const swb = barBox(S, 'sw'); note.style.left = (swb.x + swb.w + 66) + 'px'; note.style.top = (swb.y - 66) + 'px';
  notearr.style.left = (swb.x + swb.w - 4) + 'px'; notearr.style.top = (swb.y - 34) + 'px';
  /* cursor */
  const c = at(curKeys(m), t, S), cur = $('#cur');
  cur.style.left = (c[0] - 6).toFixed(1) + 'px'; cur.style.top = (c[1] - 4).toFixed(1) + 'px';
});

Kit.ready({ duration: DUR, fonts: ['700 80px "Space Grotesk"', '700 100px Caveat', '400 40px "Permanent Marker"', '800 50px Inter', '600 30px "JetBrains Mono"'] });
})();
