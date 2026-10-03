/* A programme a lender can read: the demo programme behind every screen and the printout.
   Fictional demo data ("Riverside Terraces — Stage 3", Demo Developments, Demo Framing Co., Demo Linings Ltd).
   Pure date maths, no DOM: the page reads window.PROG, and `node programme.js` prints every phase for post.md.

   Rules it follows (truth sheet 7.2, 7.6, 7.8, 7.11 and the product's own schedule code, read 2026-10-04):
   - Import from the SOQ lays the jobs end to end in SOQ order, each taking its own Days (A).
   - Links are "starts after" with a gap in working days; a task waiting on several starts after the latest (B).
   - A hand move carries everything linked after it by the same working days, keeping the gaps (C).
   - A task stretched by a day pushes what waits for it only as far as it must (E).
   - A rain day gives each task rain can stop one more day; what follows is pushed only as far as it must (D).
   - Days off: planned work standing on them moves later (never earlier), keeping its working days; followers are pushed (F).
   - Work week Mon–Fri; no public-holiday calendar (a non-NZ project reads "No public holidays"). */
(function (root) {
  'use strict';
  const DAY = 864e5;
  const D = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / DAY);          // day number
  const dt = n => new Date(n * DAY);
  const dow = n => dt(n).getUTCDay();
  const MON = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  const MONTH = 'January February March April May June July August September October November December'.split(' ');
  const WD = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');

  function cal(off) {
    const shut = new Set(off || []);
    const work = n => { const w = dow(n); return w !== 0 && w !== 6 && !shut.has(n); };
    const next = n => { while (!work(n)) n++; return n; };
    const end = (s, dur) => { let n = next(s), k = 1; while (k < dur) { n++; if (work(n)) k++; } return n; };
    const add = (n, k) => { n = next(n); while (k > 0) { n++; if (work(n)) k--; } return n; };   // k working days later
    const after = (e, lag) => add(e, 1 + (lag || 0));                                             // first day after e (+lag)
    return { work, next, end, add, after };
  }

  const START = D(2026, 7, 6);            // Mon 6 Jul 2026: on site from
  const TODAY = D(2026, 10, 14);          // Wed 14 Oct 2026: "today" on every in-build screen (the owner shifts the demo so this is the recording day)
  const RAIN = D(2026, 10, 13);           // Tue 13 Oct 2026: the day rain stopped work
  const SHUT = { name: 'Year-end shutdown', from: D(2026, 12, 21), to: D(2027, 1, 8) };
  const shutDays = []; for (let n = SHUT.from; n <= SHUT.to; n++) shutDays.push(n);

  /* the SOQ jobs, in SOQ order (pocket → job). trade = the product's 14 trade colours (Knowledge Hub "Reading the schedule"). */
  const POCKETS = ['Site & groundworks', 'Frame & envelope', 'Services', 'Linings', 'Fit-out', 'Externals', 'Completion'];
  const TASKS = [
    { id: 'site', name: 'Site set-out & earthworks', pocket: 0, trade: 'Site & civils', days: 8, rain: 1 },
    { id: 'drain', name: 'Drainage & services in ground', pocket: 0, trade: 'Site & civils', days: 10, rain: 1 },
    { id: 'slab', name: 'Foundations & slab', pocket: 0, trade: 'Foundations', days: 12, rain: 1 },
    { id: 'frg', name: 'Frame — ground floor', pocket: 1, trade: 'Framing', days: 10, rain: 1 },
    { id: 'ff1', name: 'Frame — first floor', pocket: 1, trade: 'Framing', days: 10, rain: 1 },
    { id: 'rfs', name: 'Roof structure', pocket: 1, trade: 'Roofing', days: 6, rain: 1 },
    { id: 'rfg', name: 'Roofing', pocket: 1, trade: 'Roofing', days: 6, rain: 1 },
    { id: 'win', name: 'Windows & external doors', pocket: 1, trade: 'Windows & doors', days: 8 },
    { id: 'clad', name: 'Wall wrap & cladding', pocket: 1, trade: 'Cladding', days: 18, rain: 1 },
    { id: 'pri', name: 'Plumbing rough-in', pocket: 2, trade: 'Plumbing & gas', days: 7 },
    { id: 'eri', name: 'Electrical rough-in', pocket: 2, trade: 'Electrical', days: 8 },
    { id: 'ins', name: 'Insulation', pocket: 3, trade: 'Insulation & linings', days: 5 },
    { id: 'pb', name: 'Plasterboard', pocket: 3, trade: 'Insulation & linings', days: 18 },
    { id: 'stop', name: 'Stopping & finishing', pocket: 3, trade: 'Insulation & linings', days: 12 },
    { id: 'kit', name: 'Kitchens & joinery', pocket: 4, trade: 'Fit-out & joinery', days: 15 },
    { id: 'tile', name: 'Tiling & waterproofing', pocket: 4, trade: 'Fit-out & joinery', days: 13 },
    { id: 'paint', name: 'Painting', pocket: 4, trade: 'Painting', days: 9 },
    { id: 'floor', name: 'Floor coverings', pocket: 4, trade: 'Other', days: 6 },
    { id: 'pfo', name: 'Plumbing fit-off', pocket: 4, trade: 'Plumbing & gas', days: 6 },
    { id: 'efo', name: 'Electrical fit-off', pocket: 4, trade: 'Electrical', days: 6 },
    { id: 'ext', name: 'Driveways & landscaping', pocket: 5, trade: 'Landscaping', days: 15, rain: 1 },
    { id: 'clean', name: 'Final clean', pocket: 6, trade: 'Other', days: 4 },
    { id: 'ho', name: 'Handover', pocket: 6, trade: 'Other', days: 1, ms: 1 },
  ];
  const T = {}; TASKS.forEach((k, i) => { T[k.id] = k; k.i = i; });

  /* links added by hand after the import: [from, to, gap in working days] */
  const LINKS = [
    ['site', 'drain'], ['drain', 'slab'], ['slab', 'frg', 5], ['frg', 'ff1'], ['ff1', 'rfs'], ['rfs', 'rfg'], ['rfs', 'win'],
    ['win', 'clad'], ['rfg', 'pri'], ['rfg', 'eri'], ['pri', 'ins'], ['eri', 'ins'], ['win', 'ins'], ['ins', 'pb'], ['pb', 'stop'],
    ['stop', 'kit'], ['stop', 'tile'], ['stop', 'paint'], ['kit', 'efo'], ['tile', 'pfo'], ['paint', 'floor'],
    ['clad', 'ext'], ['efo', 'clean'], ['pfo', 'clean'], ['floor', 'clean'], ['ext', 'clean'], ['clean', 'ho'],
  ].map(([a, b, g]) => ({ a, b, gap: g || 0 }));
  const SUCC = {}, PRED = {};
  LINKS.forEach(l => { (SUCC[l.a] = SUCC[l.a] || []).push(l); (PRED[l.b] = PRED[l.b] || []).push(l); });
  const ORDER = TASKS.map(k => k.id);       // already topological (SOQ order follows the build)

  /* people and money (demo). Booked on QSME = asked, not told. Contracts: figures show once, on the first task they cover. */
  const WHO = { site: 'Demo Civil', drain: 'Demo Civil', slab: 'Demo Civil', frg: 'Demo Framing Co.', ff1: 'Demo Framing Co.', rfs: 'Demo Framing Co.', rfg: 'Demo Framing Co.', win: 'Demo Framing Co.', clad: 'Demo Framing Co.', pb: 'Demo Linings Ltd', stop: 'Demo Linings Ltd' };
  const BOOKED = { pb: 1, stop: 1 };       // on QSME: moves to these are proposals until they say yes
  const CONTRACTS = [
    { id: 'gw', name: 'Groundworks', who: 'Demo Civil', price: 286000, paid: 286000, tasks: ['site', 'drain', 'slab'] },
    { id: 'fe', name: 'Frame & envelope', who: 'Demo Framing Co.', price: 450000, paid: 315000, tasks: ['frg', 'ff1', 'rfs', 'rfg', 'win', 'clad'] },
    { id: 'li', name: 'Linings', who: 'Demo Linings Ltd', price: 168000, paid: 0, tasks: ['pb', 'stop'] },
  ];
  const ESTIMATE = { pri: 38500, eri: 41200, ins: 22800, kit: 186000, tile: 64500, paint: 48000, floor: 39600, pfo: 16800, efo: 18400, ext: 92000, clean: 6500 };

  /* ---------------- the phases ---------------- */
  const C0 = cal([]), C1 = cal(shutDays);
  function clone(S) { const o = {}; for (const k in S) o[k] = { s: S[k].s, e: S[k].e, d: S[k].d }; return o; }
  // A: imported end to end, SOQ order
  const A = {}; { let n = C0.next(START); TASKS.forEach(k => { const e = C0.end(n, k.days); A[k.id] = { s: n, e, d: k.days }; n = C0.after(e); }); }
  // B: linked network (forward pass from the start)
  function forward(S, c, fixed) {
    ORDER.forEach(id => {
      if (fixed && fixed[id]) return;
      const ps = PRED[id] || [];
      if (!ps.length) return;
      let s = -1; ps.forEach(l => { const v = c.after(S[l.a].e, l.gap); if (v > s) s = v; });
      if (s > S[id].s) { S[id].s = s; S[id].e = c.end(s, S[id].d); }
    });
    return S;
  }
  const B = (() => { const S = {}; TASKS.forEach(k => S[k.id] = { s: C0.next(START), e: C0.end(C0.next(START), k.days), d: k.days }); return forward(S, C0); })();
  // hand move: the task and everything downstream move by k working days, keeping their gaps
  function downstream(id) { const out = new Set(), st = [id]; while (st.length) { const x = st.pop(); (SUCC[x] || []).forEach(l => { if (!out.has(l.b)) { out.add(l.b); st.push(l.b); } }); } return out; }
  function handMove(S0, id, k, c) {
    const S = clone(S0), set = downstream(id); set.add(id);
    set.forEach(x => { S[x].s = c.add(S[x].s, k); S[x].e = c.end(S[x].s, S[x].d); });
    return forward(S, c);
  }
  const C = handMove(B, 'ins', 3, C0);                                          // insulation delivery late: 3 working days
  const D_ = (() => { const S = clone(C); S.clad.d += 1; S.clad.e = C0.end(S.clad.s, S.clad.d); return forward(S, C0); })();   // rain day on cladding
  const E = (() => { const S = clone(D_); S.kit.d += 1; S.kit.e = C0.end(S.kit.s, S.kit.d); return forward(S, C0); })();   // joinery takes a day longer (a purple task stretched by a day)
  const F = (() => {                                                            // the year-end shutdown added as days off
    const S = clone(E);
    ORDER.forEach(id => { if (status(id) !== 'planned') return; const s = C1.next(S[id].s); S[id].s = s; S[id].e = C1.end(s, S[id].d); });
    return forward(S, C1);
  })();

  function status(id) { const k = B[id]; if (k.e < TODAY) return 'done'; if (k.s <= TODAY) return 'onsite'; return 'planned'; }

  /* what drives the finish date: backward pass on the linked tasks still to finish */
  function chain(S, c) {
    const last = TASKS.reduce((m, k) => (S[k.id].e > S[m].e ? k.id : m), TASKS[0].id);
    const on = new Set([last]), st = [last];
    while (st.length) {
      const x = st.pop();
      (PRED[x] || []).forEach(l => { if (status(l.a) === 'done') return; if (c.after(S[l.a].e, l.gap) === S[x].s && !on.has(l.a)) { on.add(l.a); st.push(l.a); } });
    }
    return ORDER.filter(id => on.has(id));
  }

  /* words, the way the product writes them */
  const day = n => `${WD[dow(n)]} ${dt(n).getUTCDate()} ${MON[dt(n).getUTCMonth()]}`;
  const short = n => `${dt(n).getUTCDate()} ${MON[dt(n).getUTCMonth()]}`;
  const yr = n => dt(n).getUTCFullYear();
  /* bar words (bar-detail.ts humanSpan, multiYear): "2-13 Aug 2027", "20 Dec 2027 - 14 Jan 2028" */
  function span(s, e) {
    const a = dt(s), b = dt(e);
    if (s === e) return `${short(s)} ${yr(s)}`;
    if (yr(s) !== yr(e)) return `${short(s)} ${yr(s)} - ${short(e)} ${yr(e)}`;
    if (a.getUTCMonth() === b.getUTCMonth()) return `${a.getUTCDate()}-${short(e)} ${yr(e)}`;
    return `${short(s)} - ${short(e)} ${yr(e)}`;
  }
  const range = (s, e) => (s === e ? day(s) : `${day(s)} → ${day(e)}`);     // dates.ts humanRange
  const long = n => `${dt(n).getUTCDate()} ${MONTH[dt(n).getUTCMonth()]} ${yr(n)}`;
  const pdfDay = n => `${dt(n).getUTCDate()} ${MON[dt(n).getUTCMonth()]} ${yr(n)}`;
  function howLong(s, e) {                                                      // schedule_programme_export.go progHowLong
    const days = e - s + 1;
    if (days <= 14) return days + ' days';
    if (days < 70) return Math.ceil(days / 7) + ' weeks';
    const m = Math.round(days / 30.44);
    return m < 24 ? m + ' months' : `${Math.floor(m / 12)} years ${m % 12} months`;
  }
  const money = v => Math.round(v).toLocaleString('en-AU');

  function moved(S0, S1) { return ORDER.filter(id => S0[id].s !== S1[id].s || S0[id].e !== S1[id].e); }

  const PROG = {
    ymd: D, DAY, dt, dow, WD, MON, MONTH, cal, C0, C1, START, TODAY, RAIN, SHUT, shutDays, POCKETS, TASKS, T, LINKS, SUCC, PRED, ORDER,
    WHO, BOOKED, CONTRACTS, ESTIMATE, A, B, C, D: D_, E, F, status, chain, day, short, span, range, long, pdfDay, howLong, money, moved, downstream,
  };
  if (typeof module !== 'undefined') module.exports = PROG; else root.PROG = PROG;

  /* node programme.js → every phase, for post.md and the captions */
  if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
    const ph = { A, B, C, D: D_, E, F };
    const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
    TASKS.forEach(k => console.log(pad(k.name, 30), Object.keys(ph).map(p => pad(span(ph[p][k.id].s, ph[p][k.id].e), 26)).join(''), status(k.id)));
    for (const p of ['B', 'C', 'D', 'E', 'F']) {
      const S = ph[p], c = p === 'F' ? C1 : C0, ch = chain(S, c), fin = S.ho.s;
      console.log(p, 'finish', day(fin), yr(fin), '| chain', ch.length, ch.join(' '), '| howLong', howLong(START, fin));
    }
    const mv = (a, b) => moved(ph[a], ph[b]);
    console.log('C moved', mv('B', 'C').length, mv('B', 'C').join(' '));
    console.log('D moved', mv('C', 'D').length, mv('C', 'D').join(' '));
    console.log('E moved', mv('D', 'E').length, mv('D', 'E').join(' '));
    console.log('F moved', mv('E', 'F').length, mv('E', 'F').join(' '));
    console.log('A end', day(A.ho.s), yr(A.ho.s));
    ORDER.forEach(id => { const S = F; if (BOOKED[id]) console.log('booked', id, range(B[id].s, B[id].e), '| C', range(C[id].s, C[id].e), '| F', range(S[id].s, S[id].e)); });
  }
})(typeof window !== 'undefined' ? window : globalThis);
