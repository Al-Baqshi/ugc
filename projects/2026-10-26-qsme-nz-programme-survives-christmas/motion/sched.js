/* "How a programme survives Christmas" — the demo programme, a tiny NZ working-day engine, and an illustrative
   QSME Gantt builder (light app shell, status colours from the public Knowledge Hub "Reading the schedule" page).
   Everything here is DEMO DATA: four townhouses, fictional trades ("Demo Tiling Co."), dates worked out by the rules
   the truth sheet describes (Mon–Fri, NZ public holidays on the day the country takes off, the 23 Dec – 11 Jan
   Christmas shutdown, your own days off, linked tasks). Shared by the 16:9 master and the 9:16 cut. */
(function () {
  'use strict';
  var D0 = Date.UTC(2026, 9, 5);                       // day 0 = Mon 5 Oct 2026
  function day(y, m, d) { return Math.round((Date.UTC(y, m - 1, d) - D0) / 864e5); }
  var DN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MF = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function dt(i) { return new Date(D0 + i * 864e5); }
  function wd(i) { return ((i % 7) + 7) % 7; }
  var HOL = {};                                        // NZ national public holidays in range (Mondayised)
  HOL[day(2026, 10, 26)] = 'Labour Day';
  HOL[day(2026, 12, 25)] = 'Christmas Day';
  HOL[day(2026, 12, 28)] = 'Boxing Day';               // Sat 26 Dec → Mon 28 Dec
  HOL[day(2027, 1, 1)] = "New Year's Day";
  HOL[day(2027, 1, 4)] = "Day after New Year's";       // Sat 2 Jan → Mon 4 Jan
  HOL[day(2027, 2, 8)] = 'Waitangi Day';               // Sat 6 Feb → Mon 8 Feb
  var SHUT = [day(2026, 12, 23), day(2027, 1, 11)];   // "The usual 23 Dec – 11 Jan"
  var ANNIV = day(2027, 2, 1);                         // Auckland Anniversary 2027: NOT built in, added by hand

  function works(i, cal, t) {
    if (wd(i) >= 5) return false;
    if (cal.hol && HOL[i] != null && !(t && t.wph)) return false;
    if (cal.shut && i >= SHUT[0] && i <= SHUT[1]) return false;
    if (cal.anniv && i === ANNIV) return false;
    return true;
  }
  function next(i, cal, t) { while (!works(i, cal, t)) i++; return i; }
  function addWD(s, n, cal, t) { var i = s, c = 0; for (;;) { if (works(i, cal, t)) { c++; if (c === n) return i; } i++; } }
  function straddlesShut(s, e) { return s <= SHUT[1] && e >= SHUT[0]; }

  /* The programme (the stretch on screen; the Townhouses programme runs from early 2026). */
  var T = [
    { id: 'g34', name: 'Gib fixing — Units 3–4', dur: 24, fixed: day(2026, 11, 3), lead: 'Demo Linings Ltd', st: 'booked', hidden: true },
    { id: 'gib', name: 'Gib stopping', dur: 12, after: ['g34'], lead: 'Demo Linings Ltd', st: 'booked' },
    { id: 'p1', name: 'Painting: first coats', dur: 4, after: ['gib'], lead: 'Painter · nobody yet', st: 'planned' },
    { id: 'kit', name: 'Kitchens & joinery', dur: 5, after: ['p1'], lead: 'Demo Joinery Ltd', st: 'booked' },
    { id: 'tile', name: 'Tiling: bathrooms', dur: 4, after: ['p1'], lead: 'Demo Tiling Co.', st: 'booked' },
    { id: 'land', name: 'Landscaping & fences', dur: 6, fixed: day(2026, 12, 21), lead: 'Landscaper · nobody yet', st: 'planned' },
    { id: 'p2', name: 'Painting: final coats', dur: 3, after: ['kit', 'tile'], lead: 'Painter · nobody yet', st: 'planned' },
    { id: 'plb', name: 'Plumbing fit-off', dur: 2, after: ['p2'], lead: 'Demo Plumbing Ltd', st: 'booked' },
    { id: 'ele', name: 'Electrical fit-off', dur: 1, after: ['p2'], lead: 'Demo Electrical Ltd', st: 'booked' },
    { id: 'floor', name: 'Floor coverings', dur: 2, after: ['plb', 'ele'], lead: 'Flooring · nobody yet', st: 'planned' },
    { id: 'insp', name: 'Final inspection', dur: 1, after: ['floor', 'land'], lead: 'Inspector · nobody yet', st: 'planned' },
    { id: 'hand', name: 'Handover', dur: 0, withEnd: 'insp', lead: 'Milestone', st: 'planned', ms: true }
  ];
  var byId = {}; T.forEach(function (t) { byId[t.id] = t; });

  /* Forward pass. o.shift: { id: working days pushed later (a drag) } */
  function plan(cal, o) {
    o = o || {}; var r = {};
    T.forEach(function (t) {
      if (t.withEnd) { var p = r[t.withEnd]; r[t.id] = { s: p.e, e: p.e }; return; }
      var s = t.fixed != null ? t.fixed : -1e9;
      (t.after || []).forEach(function (p) { s = Math.max(s, r[p].e + 1); });
      s = next(s, cal, t);
      var e = addWD(s, t.dur, cal, t);
      if (cal.shut && straddlesShut(s, e)) { s = next(SHUT[1] + 1, cal, t); e = addWD(s, t.dur, cal, t); }   // jobs are moved off the days off, always later
      if (o.shift && o.shift[t.id]) { s = addWD(s, o.shift[t.id] + 1, cal, t); e = addWD(s, t.dur, cal, t); }
      r[t.id] = { s: s, e: e };
    });
    return r;
  }
  /* What drives the finish date: from the task that finishes last, walk back through the links;
     a predecessor is on the chain when its follower starts the very first day it possibly could. */
  function chain(r, cal) {
    var last = T.reduce(function (a, t) { return r[t.id].e >= r[a.id].e && !t.ms ? t : a; }, T[0]), on = {};
    (function walk(t) {
      if (on[t.id]) return; on[t.id] = 1;
      (t.after || []).forEach(function (pid) { if (next(r[pid].e + 1, cal, t) === r[t.id].s) walk(byId[pid]); });
    })(last);
    T.forEach(function (t) { if (t.withEnd && on[t.withEnd]) on[t.id] = 1; });
    return on;
  }
  function finish(r) { var f = -1e9; T.forEach(function (t) { if (!t.oct && r[t.id]) f = Math.max(f, r[t.id].e); }); return f; }

  var CAL = { off: { hol: 1 }, on: { hol: 1, shut: 1 }, anniv: { hol: 1, shut: 1, anniv: 1 } };
  var P = {
    S0: plan(CAL.off),                                    // shutdown switched off
    S1: plan(CAL.on),                                     // after 'Move them off the days off'
    S2: plan(CAL.anniv),                                  // + Auckland Anniversary added by hand
    S3: plan(CAL.anniv, { shift: { land: 3 } }),          // a grey task slid 3 days later
    S4: plan(CAL.anniv, { shift: { land: 3, floor: 1 } }) // + a purple task slid 1 day later
  };
  var CH = chain(P.S2, CAL.anniv);
  function onShut(r) { return T.filter(function (t) { if (t.hidden || t.ms || t.oct || !r[t.id]) return false; for (var i = r[t.id].s; i <= r[t.id].e; i++) if (i >= SHUT[0] && i <= SHUT[1] && works(i, CAL.off, t)) return true; return false; }); }

  /* formatting */
  function fShort(i) { var d = dt(i); return DN[wd(i)] + ' ' + d.getUTCDate() + ' ' + MN[d.getUTCMonth()]; }
  function fLong(i) { var d = dt(i); return DN[wd(i)] + ' ' + d.getUTCDate() + ' ' + MN[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }
  function fFull(i) { var d = dt(i); return d.getUTCDate() + ' ' + MF[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }
  function fRange(s, e) {
    var a = dt(s), b = dt(e);
    if (s === e) return a.getUTCDate() + ' ' + MN[a.getUTCMonth()];
    if (a.getUTCMonth() === b.getUTCMonth()) return a.getUTCDate() + '-' + b.getUTCDate() + ' ' + MN[b.getUTCMonth()];
    return a.getUTCDate() + ' ' + MN[a.getUTCMonth()] + '-' + b.getUTCDate() + ' ' + MN[b.getUTCMonth()];
  }
  function fRangeW(s, e) { return s === e ? fShort(s) : fShort(s) + ' – ' + fShort(e); }

  /* ---------------- the illustrative Gantt ----------------
     G.build(id, o) → html. o: { x0 (first day), days, dayW, rowH, nameW, rows: [ids], fs (font scale), head: 'week'|'day', today }
     G.run(id, o, keys) → per-frame hook. keys: [[t, stateName, dur?], ...]; states are P.* plus decoration.
     Decoration per state: { ring: {id: 'amber'|'purple'}, ghost: {id: true}, st: {id: status}, purple: bool, base: 'S0' } */
  var COL = { planned: '#64748B', waiting: '#F59E0B', booked: '#0EA5E9', cant: '#EF4444', onsite: '#16A34A', done: '#065F46' };
  function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function mixc(a, b, p) { var x = hex(a), y = hex(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(x[i] + (y[i] - x[i]) * p); }).join(',') + ')'; }

  var G = {};
  G.geo = function (o) {
    var g = { x0: o.x0, days: o.days, dw: o.dayW, rh: o.rowH, nw: o.nameW, hh: o.headH || 52, fs: o.fs || 1, rows: o.rows, pad: o.pad || 0 };
    g.tw = g.days * g.dw; g.w = g.nw + g.tw; g.h = g.hh + g.rows.length * g.rh;
    g.row = function (id) { return g.rows.indexOf(id); };
    g.x = function (i) { return g.nw + (i - g.x0) * g.dw; };            // left edge of day i (in gantt coords)
    g.y = function (id) { return g.hh + g.row(id) * g.rh; };              // row top
    return g;
  };
  G.build = function (id, o) {
    var g = G.geo(o), fs = g.fs, h = '';
    h += '<div id="' + id + '" class="gantt" style="width:' + g.w + 'px;height:' + g.h + 'px;--fs:' + fs + '">';
    // background: weekends, holidays, today
    h += '<div class="gbg" style="left:' + g.nw + 'px;width:' + g.tw + 'px;top:0;height:' + g.h + 'px">';
    for (var i = g.x0; i < g.x0 + g.days; i++) {
      var x = (i - g.x0) * g.dw;
      if (wd(i) >= 5) h += '<div class="wk" style="left:' + x + 'px;width:' + g.dw + 'px"></div>';
      if (HOL[i] != null) h += '<div class="hol" data-day="' + i + '" style="left:' + x + 'px;width:' + g.dw + 'px"></div>';
      if (wd(i) === 0 && o.head === 'week') h += '<div class="vl" style="left:' + x + 'px"></div>';
      if (o.head === 'day') h += '<div class="vl d" style="left:' + x + 'px"></div>';
    }
    h += '</div>';
    // header
    h += '<div class="gh" style="height:' + g.hh + 'px;width:' + g.w + 'px"><div class="ghn" style="width:' + g.nw + 'px">' + (o.title || '') + '</div>';
    for (var j = g.x0; j < g.x0 + g.days; j++) {
      var d = dt(j), xx = g.x(j);
      if (o.head === 'week') {
        if (d.getUTCDate() === 1 || j === g.x0) h += '<div class="gm" style="left:' + (xx + 4) + 'px">' + MN[d.getUTCMonth()] + (d.getUTCMonth() === 0 && d.getUTCDate() <= 7 ? ' 2027' : '') + '</div>';
        if (wd(j) === 0) h += '<div class="gd" style="left:' + xx + 'px">' + d.getUTCDate() + '</div>';
      } else {
        h += '<div class="gdd' + (wd(j) >= 5 ? ' we' : '') + (HOL[j] != null ? ' ho' : '') + (j === o.today ? ' td' : '') + '" style="left:' + xx + 'px;width:' + g.dw + 'px"><i>' + 'MTWTFSS'[wd(j)] + '</i><b>' + d.getUTCDate() + '</b></div>';
      }
    }
    h += '</div>';
    if (o.today != null && o.today >= g.x0 && o.today < g.x0 + g.days) h += '<div class="today" style="left:' + (g.x(o.today) + g.dw / 2 - 1) + 'px;top:' + (g.hh - 8) + 'px;height:' + (g.h - g.hh + 8) + 'px"><span>Today</span></div>';
    // shutdown + own days off (shown by the page with opacity tracks)
    if (SHUT[1] >= g.x0 && SHUT[0] < g.x0 + g.days) {
      var sx = g.x(Math.max(SHUT[0], g.x0)), sw = (Math.min(SHUT[1], g.x0 + g.days - 1) - Math.max(SHUT[0], g.x0) + 1) * g.dw;
      h += '<div id="' + id + 'shut" class="shut" style="left:' + sx + 'px;width:' + sw + 'px;top:' + g.hh + 'px;height:' + (g.h - g.hh) + 'px"><span>Christmas shutdown</span></div>';
    }
    if (ANNIV >= g.x0 && ANNIV < g.x0 + g.days) h += '<div id="' + id + 'ann" class="doff" style="left:' + g.x(ANNIV) + 'px;width:' + g.dw + 'px;top:' + g.hh + 'px;height:' + (g.h - g.hh) + 'px"><span>Auckland Anniversary</span></div>';
    // rows
    g.rows.forEach(function (rid, k) {
      var t = byId[rid], y = g.hh + k * g.rh;
      h += '<div class="gr" style="top:' + y + 'px;height:' + g.rh + 'px;width:' + g.w + 'px"></div>';
      h += '<div id="' + id + 'n_' + rid + '" class="gn" style="top:' + y + 'px;height:' + g.rh + 'px;width:' + g.nw + 'px"><div class="nm"><b>' + t.name + '</b><i>' + t.lead + '</i></div><span class="dd">' + (t.ms ? '' : t.dur + (t.dur === 1 ? ' day' : ' days')) + '</span></div>';
    });
    h += '<svg id="' + id + 'arr" class="garr" width="' + g.w + '" height="' + g.h + '" viewBox="0 0 ' + g.w + ' ' + g.h + '"></svg>';
    g.rows.forEach(function (rid) {
      var t = byId[rid];
      h += '<div id="' + id + 'gh_' + rid + '" class="bar ghost' + (t.ms ? ' ms' : '') + '"></div>';
      h += '<div id="' + id + 'b_' + rid + '" class="bar' + (t.ms ? ' ms' : '') + '"><div id="' + id + 'd_' + rid + '" class="drag"><div class="bf"></div><div class="rg"></div><div class="rp"></div></div></div>';
      h += '<div id="' + id + 'l_' + rid + '" class="blab"></div>';
    });
    h += '</div>';
    return h;
  };
  /* states: name → { r: plan result, deco } ; keys: [[t, name, dur, ease]] */
  G.run = function (id, o, states, keys) {
    var g = G.geo(o), els = {};
    g.rows.forEach(function (rid) {
      els[rid] = { b: document.getElementById(id + 'b_' + rid), f: document.querySelector('#' + id + 'b_' + rid + ' .bf'), rg: document.querySelector('#' + id + 'b_' + rid + ' .rg'), rp: document.querySelector('#' + id + 'b_' + rid + ' .rp'),
        gh: document.getElementById(id + 'gh_' + rid), l: document.getElementById(id + 'l_' + rid), d: document.getElementById(id + 'd_' + rid) };
    });
    var arr = document.getElementById(id + 'arr'), ease = Kit.ease;
    function geom(st, rid) {
      var S = states[st], r = S.r[rid], t = byId[rid], de = S.deco || {};
      var status = (de.st && de.st[rid]) || t.st;
      var ring = (de.ring && de.ring[rid]) || null;
      if (de.purple && CH[rid] && !ring) ring = 'purple';
      var gh = de.ghost && de.ghost[rid] ? states[de.ghost[rid]].r[rid] : null;
      return { s: r.s, e: r.e, st: status, ring: ring, gh: gh, ms: t.ms };
    }
    function px(s, e, ms) { var x = g.x(Math.max(s, g.x0 - 0.6)), w = ms ? 0 : (e - Math.max(s, g.x0 - 0.6) + 1) * g.dw - 4; return { x: x + 2, w: w }; }
    return function (t) {
      var k = 0; while (k + 1 < keys.length && keys[k + 1][0] <= t) k++;
      var cur = keys[k], prev = keys[Math.max(0, k - 1)], p = 1;
      if (k > 0 && cur[2]) p = Math.max(0, Math.min(1, (t - cur[0]) / cur[2]));
      var ez = cur[3] ? ease[cur[3]] : ease.swipe; var q = ez(p);
      var A = prev[1], B = cur[1];
      var segs = [];
      g.rows.forEach(function (rid) {
        var a = geom(A, rid), b = geom(B, rid), E = els[rid];
        var s = a.s + (b.s - a.s) * q, e = a.e + (b.e - a.e) * q;
        var P1 = px(s, e, b.ms), y = g.y(rid), bh = Math.round(g.rh * 0.46);
        E.b.style.transform = 'translate(' + P1.x + 'px,' + (y + (g.rh - bh) / 2) + 'px)';
        if (!b.ms) E.b.style.width = Math.max(4, P1.w) + 'px';
        E.b.style.height = bh + 'px';
        var ca = COL[a.st], cb = COL[b.st];
        E.f.style.background = p >= 1 ? cb : mixc(ca, cb, q);
        // rings
        var ra = a.ring, rb = b.ring;
        E.rg.style.opacity = (rb === 'amber' ? q : 0) + (ra === 'amber' ? 1 - q : 0);
        E.rp.style.opacity = (rb === 'purple' ? q : 0) + (ra === 'purple' ? 1 - q : 0);
        // ghost (the dates already agreed, while new ones wait for an OK)
        var ga = a.gh ? 1 : 0, gb = b.gh ? 1 : 0, go = ga + (gb - ga) * q;
        var gsrc = b.gh || a.gh;
        if (gsrc && go > 0.01) { var P2 = px(gsrc.s, gsrc.e, b.ms); E.gh.style.display = 'block'; E.gh.style.opacity = go; E.gh.style.transform = 'translate(' + P2.x + 'px,' + (y + (g.rh - bh) / 2) + 'px)'; E.gh.style.width = Math.max(4, P2.w) + 'px'; E.gh.style.height = bh + 'px'; }
        else E.gh.style.display = 'none';
        E.b.classList.toggle('prop', !!b.gh && q > 0.5);
        // label beside the bar: dates in words
        var L = q > 0.5 ? b : a, tt = byId[rid];
        var txt = tt.ms ? fShort(L.e) : fRange(L.s, L.e) + (o.lab === 'short' ? '' : ' · ' + tt.dur + (tt.dur === 1 ? ' day' : ' days'));
        if (L.st === 'waiting') txt += ' · waiting';
        if (E.l.textContent !== txt) E.l.textContent = txt;
        var lx = P1.x + (b.ms ? 16 : P1.w) + 10, lw = txt.length * 7.1 * g.fs;
        if (lx + lw > g.w - 6) lx = P1.x - (b.ms ? 18 : 0) - lw - 10;
        E.l.style.transform = 'translate(' + lx + 'px,' + (y + g.rh / 2 - 10 * g.fs) + 'px)';
        E.l.className = 'blab' + (L.st === 'waiting' ? ' w' : '');
        segs.push({ id: rid, x0: P1.x, x1: P1.x + (b.ms ? 0 : P1.w), y: y + g.rh / 2, ms: b.ms });
      });
      // purple arrows between chain tasks (only when the chain is shown)
      var pa = states[A].deco && states[A].deco.purple ? 1 : 0, pb = states[B].deco && states[B].deco.purple ? 1 : 0, po = pa + (pb - pa) * q;
      if (po > 0.01) {
        var d = '', S = {}; segs.forEach(function (sg) { S[sg.id] = sg; });
        g.rows.forEach(function (rid) {
          var t = byId[rid]; if (!CH[rid]) return;
          (t.after || []).forEach(function (pid) {
            if (!CH[pid] || !S[pid]) return;
            var a = S[pid], b = S[rid], xa = a.x1 + 2, xb = b.x0 - 2, mx = Math.max(xa + 6, Math.min(xb - 6, xa + 10));
            d += 'M' + xa + ' ' + a.y + ' H' + mx + ' V' + b.y + ' H' + xb + ' ';
          });
        });
        arr.innerHTML = '<path d="' + d + '" fill="none" stroke="#A855F7" stroke-width="' + (3.2 * g.fs) + '" stroke-linejoin="round" stroke-linecap="round" opacity="' + po.toFixed(3) + '"/>';
      } else if (arr.innerHTML) arr.innerHTML = '';
    };
  };
  /* where a bar sits (gantt coords) in a state: centre-left, centre, right */
  G.at = function (o, states, st, rid, frac) {
    var g = G.geo(o), r = states[st].r[rid], x0 = g.x(r.s), x1 = g.x(r.e + 1);
    return { x: x0 + (x1 - x0) * (frac == null ? 0.5 : frac), y: g.y(rid) + g.rh / 2 };
  };

  window.Sched = { day: day, HOL: HOL, SHUT: SHUT, ANNIV: ANNIV, T: T, byId: byId, P: P, CH: CH, CAL: CAL, plan: plan, finish: finish, onShut: onShut,
    fShort: fShort, fLong: fLong, fFull: fFull, fRange: fRange, fRangeW: fRangeW, works: works, G: G, COL: COL };
})();
