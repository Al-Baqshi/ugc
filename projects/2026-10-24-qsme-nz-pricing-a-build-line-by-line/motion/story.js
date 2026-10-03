/* story.js: the chapters of "Price it once", shared by the 16:9 master and the 9:16 cut-downs.
   Each chapter = { dur, html(p), anim(p, T) }. html() returns one .wcam (own camera) holding one .app screen;
   anim() registers every track relative to T (the time the screen appears). Pages decide where a chapter sits and
   which part of it shows (Kit.scene on #p).
   Honesty: every legible UI string is verbatim from research/2026-10-02-qsme-platform-truth.md (marked [V]).
   Pocket names, lines, quantities, rates, page numbers, files and contacts are DEMO DATA. Where the real wording
   is unknown the UI shows skeleton bars or a neutral label. No AI answer and no page citation is mocked. */
(function () {
  'use strict';
  var I = UI.I;
  var S = { fit: null };
  function A(T, keys) { return keys.map(function (k) { return [T + k[0], k[1], k[2]]; }); }
  function add(sel, prop, T, keys) { Kit.add(sel, prop, A(T, keys)); return S; }
  function money(v, dp) { return UI.money(v, dp); }
  function num(v) { return Math.round(v).toLocaleString('en-NZ'); }
  S.add = add;

  /* ---------- helpers ---------- */
  // camera: keys [[r, cx, cy, cs, ease]] on a chapter's .wcam; the page may remap with S.fit(cx, cy, cs)
  S.cam = function (sel, T, keys) {
    var fit = S.fit || function (cx, cy, cs) { return [cx, cy, cs]; };
    var X = [], Y = [], Z = [];
    keys.forEach(function (k, i) { var f = fit(k[1], k[2], k[3]); var e = i === 0 ? null : (k[4] || 'inOut');
      X.push([T + k[0], f[0], e]); Y.push([T + k[0], f[1], e]); Z.push([T + k[0], f[2], e]); });
    Kit.add(sel, 'var:--cx', X).add(sel, 'var:--cy', Y).add(sel, 'var:--cs', Z);
  };
  // cursor: pts [[r, x, y, ease]] are TIP positions in app px
  S.path = function (id, T, pts) {
    Kit.add('#' + id, 'x', pts.map(function (p) { return [T + p[0], p[1] - 3, p[3] || 'inOut']; }));
    Kit.add('#' + id, 'y', pts.map(function (p) { return [T + p[0], p[2] - 2, p[3] || 'inOut']; }));
    var a = pts[0][0], b = pts[pts.length - 1][0];
    Kit.add('#' + id, 'opacity', [[T + a, 0], [T + a + 0.12, 1], [T + b, 1], [T + b + 0.2, 0]]);
  };
  S.tap = function (id, T, r, x, y) {
    var e = document.getElementById(id); e.style.left = x + 'px'; e.style.top = y + 'px';
    add('#' + id, 'opacity', T, [[r, 0], [r + 0.03, 0.9], [r + 0.4, 0]]);
    add('#' + id, 'scale', T, [[r, 0.3], [r + 0.4, 1.4, 'out']]);
  };
  S.press = function (sel, T, r) { add(sel, 'scale', T, [[r - 0.02, 1], [r + 0.05, 0.94], [r + 0.18, 1]]); };
  S.dlg = function (scrim, dlg, T, r0, r1) {
    if (scrim) add(scrim, 'opacity', T, [[r0, 0], [r0 + 0.15, 1], [r1, 1], [r1 + 0.15, 0]]);
    add(dlg, 'opacity', T, [[r0, 0], [r0 + 0.12, 1], [r1, 1], [r1 + 0.12, 0]]);
    add(dlg, 'scale', T, [[r0, 0.96], [r0 + 0.22, 1, 'out'], [r1, 1], [r1 + 0.12, 0.97]]);
  };
  S.on = function (sel, T, r0, r1) { Kit.show(sel, T + r0, r1 == null ? null : T + r1); };
  S.pop = function (sel, T, r, dy) { Kit.pop(sel, T + r, { dy: dy == null ? 14 : dy }); };
  function ripples(p, n) { var h = ''; for (var i = 0; i < n; i++) h += UI.ripple(p + 'rp' + i); return h; }
  function tick(id, on) { return '<span' + (id ? ' id="' + id + '"' : '') + ' class="tick' + (on ? ' on' : '') + '"></span>'; }
  // a tick box that turns on at r: two stacked boxes
  function tick2(id) { return '<span style="position:relative;display:inline-block;width:26px;height:26px;flex:none">' + tick(null, false).replace('class="tick"', 'class="tick" style="position:absolute;left:0;top:0"') +
    '<span id="' + id + '" class="tick on" style="position:absolute;left:0;top:0"></span></span>'; }
  S.tickOn = function (id, T, r) { add('#' + id, 'opacity', T, [[r, 0], [r + 0.08, 1]]); add('#' + id, 'scale', T, [[r, 0.6], [r + 0.16, 1, 'outBack']]); };
  var okIcon = I.check;

  /* ---------- the Plan index screen (Documents) ---------- */
  var CHIPS = [['General notes', 'p.1'], ['Site plan', 'p.2–3'], ['Floor plans', 'p.4–7'], ['Elevations', 'p.8–11'], ['Wall sections', 'p.12–14'], ['Bracing', 'p.15–17'],
    ['Foundations', 'p.18–20'], ['Roof framing', 'p.21–23'], ['Window schedule', 'p.24'], ['Door schedule', 'p.25'], ['Specification', 'p.26–48']];
  function planScreen(p, o) {
    o = o || {};
    var h = '<div class="app"><div class="bar"><h1>Documents</h1><div class="sp"></div><span class="sk" style="width:180px"></span><span class="sk" style="width:120px"></span></div>' +
      '<div class="card" style="left:34px;top:116px;width:1532px;height:604px">' +
      '<h2 class="abs" style="left:30px;top:30px">Plan index</h2>' +
      // [V] Read a document helper
      '<div class="sub abs" style="left:30px;top:76px;width:1080px">Pick a PDF and QSME reads it into sections — floor plans, bracing, drainage, schedules — ready for pricing and questions. Uses AI credits: 1 per 10 pages.</div>' +
      '<div id="' + p + 'read" class="btn g abs" style="left:1262px;top:28px">' + I.doc.replace('#15803D', '#fff') + 'Read a document</div>' +
      '<div id="' + p + 'doc" class="doc abs" style="left:30px;top:160px;width:1470px"><div class="ic">PDF</div>Demo pack.pdf<span class="m">48 pages</span></div>';
    if (o.live) {
      // the read is sped up on screen; the real one can take a few minutes (truth 3.3; red list: never 'instant')
      h += '<div id="' + p + 'spd" class="spd abs" style="left:272px;top:183px"><span class="ff" style="position:static">▸▸ sped up</span><span class="fft">Can take a few minutes</span></div>';
      h += '<div id="' + p + 'find" class="status abs" style="left:30px;top:252px"><span class="dot"></span>Finding the sections…</div>' +   // [V]
        '<div id="' + p + 'count" class="status abs" style="left:30px;top:252px"><span class="dot"></span><span id="' + p + 'countN">4 of 11 sections ready</span></div>' + // [V] pattern
        '<div id="' + p + 'pg" class="prog abs" style="left:420px;top:262px;width:700px"><i id="' + p + 'bar"></i></div>';
    } else {
      h += '<div class="status abs" style="left:30px;top:252px"><span class="dot"></span>11 of 11 sections ready</div>';
    }
    // compact (with the drainage PDF below): chips at 0.86 so the 11 sections sit in two rows, clear of the second document
    h += '<div class="chips abs" style="left:30px;top:' + (o.compact ? 300 : 310) + 'px;width:' + (o.compact ? 1709 : 1200) + 'px' + (o.compact ? ';transform:scale(.86);transform-origin:0 0' : '') + '">' + CHIPS.map(function (c, i) {
      return '<div id="' + p + 'c' + i + '" class="schip"><i></i>' + c[0] + ' <em>' + c[1] + '</em></div>'; }).join('') + '</div>';
    if (o.drain) {
      h += '<div id="' + p + 'doc2" class="doc abs" style="left:30px;top:446px;width:1470px"><div class="ic">PDF</div>Drainage — demo.pdf<span class="m">3 pages</span></div>' +
        '<div id="' + p + 'spd2" class="spd abs" style="left:338px;top:469px"><span class="ff" style="position:static">▸▸ sped up</span><span class="fft">Can take a few minutes</span></div>' +
        '<div id="' + p + 'find2" class="status abs" style="left:30px;top:532px"><span class="dot"></span>Finding the sections…</div>' +
        '<div id="' + p + 'count2" class="status abs" style="left:30px;top:532px"><span class="dot"></span>2 of 2 sections ready</div>' +
        '<div class="prog abs" style="left:330px;top:542px;width:260px"><i id="' + p + 'bar2"></i></div>' +
        '<div class="chips abs" style="left:640px;top:524px;width:860px">' +
        '<div id="' + p + 'd0" class="schip hot"><i></i>Drainage layout <em>p.1–2</em></div><div id="' + p + 'd1" class="schip hot"><i></i>Drainage details <em>p.3</em></div></div>';
    }
    h += '</div>';
    return h;
  }

  /* =========================================================================================
     CH1 · Read the pack (18.5 s): Read a document → Finding the sections… → chips → a chip opens to its table
     → the plans-read notice "Heads up: no drainage found in this pack." */
  S.ch1 = {
    dur: 18.5,
    caps: [[1.0, 5.6, 'It splits the pack into its real sections.'], [6.3, 8.7, 'Tables come out as tables.'], [9.4, 12.35, 'And it says what it didn\'t find.'],
      [12.6, 15.8, 'No drainage. Found before anyone priced it.'], [15.95, 18.45, 'She asks the designer for the drainage sheets.']],
    html: function (p) {
      var h = '<div id="' + p + '" class="wcam" data-qa-ignore>' + planScreen(p, { live: true });
      h += '<div id="' + p + 'menu" class="menu" style="left:1060px;top:206px;width:500px"><div class="mi on"><div class="doc" style="border:0;padding:0;background:none"><div class="ic">PDF</div>Demo pack.pdf</div><span style="margin-left:auto;font:500 17px Inter;color:#64748B">48 pages</span></div>' +
        '<div class="mi"><span class="sk" style="width:240px"></span></div><div class="mi"><span class="sk" style="width:190px"></span></div></div>';
      h += '<div id="' + p + 'drw" class="drawer"><div class="eyebrow">Demo pack · p.24</div><h2 style="font:800 30px/1.2 Inter;margin-top:10px">Window schedule</h2>' +
        '<div style="display:flex;gap:10px;margin-top:16px"><span class="btn" style="height:40px;font-size:17px">Copy</span><span class="btn" style="height:40px;font-size:17px">Save these pages as a file</span></div>' +
        '<table class="t" style="margin-top:22px"><tr><th>Ref</th><th>Location</th><th class="n">W × H</th><th>Type</th><th>Glazing</th></tr>' +
        [['W01', 'Bedroom 1', '1200 × 1500', 'Awning', 'Double'], ['W02', 'Bedroom 2', '1200 × 1500', 'Awning', 'Double'], ['W03', 'Living', '2400 × 2100', 'Slider', 'Double, low-E'],
          ['W04', 'Kitchen', '1800 × 1000', 'Awning', 'Double'], ['W05', 'Bathroom', '600 × 1000', 'Fixed', 'Obscure'], ['W06', 'Laundry', '600 × 1000', 'Awning', 'Obscure']].map(function (r) {
          return '<tr><td><b>' + r[0] + '</b></td><td>' + r[1] + '</td><td class="n">' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td></tr>'; }).join('') + '</table></div>';
      h += '<div id="' + p + 'note" class="abs" style="left:880px;top:548px">' + UI.note(p + 'noteIn', p + 'mk') + '</div>';
      h += UI.cursor(p + 'cur') + ripples(p, 3) + '</div></div>';
      return h;
    },
    anim: function (p, T, o) {
      var P = '#' + p;
      S.path(p + 'cur', T, [[0.2, 763, 562], [1.0, 1398, 170], [1.35, 1398, 170], [1.65, 1265, 242], [5.3, 1265, 242], [5.75, 865, 550], [8.6, 865, 550], [9.3, 643, 642]]);
      S.tap(p + 'rp0', T, 1.1, 1398, 172); S.tap(p + 'rp1', T, 1.7, 1266, 244); S.tap(p + 'rp2', T, 5.8, 866, 552);
      S.press(P + 'read', T, 1.1);
      S.on(P + 'menu', T, 1.2, 1.75); add(P + 'menu', 'y', T, [[1.2, -10], [1.35, 0, 'out']]);
      S.pop(P + 'doc', T, 1.8);
      S.on(P + 'find', T, 1.95, 3.55); S.on(P + 'count', T, 3.55);
      S.pop(P + 'spd', T, 1.95, 8); add(P + 'spd', 'opacity', T, [[5.45, 1], [5.6, 0]]);   // '▸▸ sped up · Can take a few minutes' while it reads
      add(P + 'bar', 'scaleX', T, [[1.95, 0], [3.55, 0.36, 'out'], [5.1, 1, 'inOut']]); add(P + 'bar', 'opacity', T, [[1.9, 0], [1.95, 1]]); add(P + 'pg', 'opacity', T, [[1.85, 0], [1.95, 1]]);
      [2.7, 2.98, 3.26, 3.54, 3.9, 4.08, 4.26, 4.44, 4.62, 4.8, 4.98].forEach(function (t, i) { S.pop(P + 'c' + i, T, t, 16); });
      Kit.count(P + 'countN', A(T, [[3.54, 4], [3.9, 5, 'hold'], [4.08, 6, 'hold'], [4.26, 7, 'hold'], [4.44, 8, 'hold'], [4.62, 9, 'hold'], [4.8, 10, 'hold'], [4.98, 11, 'hold']]), function (v) { return Math.round(v) + ' of 11 sections ready'; });
      add(P + 'c8', 'background', T, [[5.7, '#F0FDF4'], [5.8, '#DCFCE7']]); add(P + 'c8', 'borderColor', T, [[5.7, '#D1FAE5'], [5.8, '#16A34A']]);
      add(P + 'drw', 'x', T, [[5.9, 720], [6.3, 0, 'out'], [8.65, 0], [8.95, 720, 'in']]);
      add(P + 'note', 'y', T, [[9.1, 240], [9.5, 0, 'out']]); add(P + 'note', 'opacity', T, [[9.1, 0], [9.25, 1]]);
      add(P + 'mk', 'trim', T, [[12.55, 0], [13.05, 1, 'out']]);
      S.cam(P, T, (o && o.cam) || [[0, 800, 375, 1], [2.5, 800, 375, 1], [3.7, 660, 470, 1.3], [5.6, 660, 470, 1.3], [6.3, 1180, 335, 1.22], [8.7, 1180, 335, 1.22], [9.1, 800, 375, 1], [9.7, 800, 375, 1],
        [10.7, 1220, 620, 1.62], [15.7, 1220, 620, 1.62], [16.4, 800, 375, 1]]);
    }
  };

  /* ---------- SOQ sheet rows ---------- */
  var COLS = ['ref', 'desc', 'unit', 'qty', 'rate', 'tot', 'x', 'y'];
  var HD = { ref: 'Ref', desc: 'Description', unit: 'Unit', qty: 'Qty', rate: 'Rate', tot: 'Total', x: 'Waste %', y: 'Qty + waste' };
  function hdRow() { return '<div class="row hd">' + COLS.map(function (c) { return '<div class="c-' + c + '">' + (c === 'x' || c === 'y' ? '<span>' + HD[c] + '</span>' : HD[c]) + '</div>'; }).join('') + '</div>'; }
  // pocket row. o: { id, name, kind: 'dr'|'ac'|'ai', flip (badge that fades in), tot, totId, meta, keep, kebab, bx (badge x) }
  function pkRow(p, o) {
    var bx = o.bx || 300, id = p + o.id;
    var cls = o.kind === 'ac' ? ' act' : o.kind === 'ai' ? ' ai' : '';
    var lab = { dr: 'Draft', ac: 'Active', ai: 'AI draft' };
    var h = '<div id="' + id + '" class="row pk cl' + cls + '"><i id="' + id + 'lb" class="lb"></i>' +
      '<div class="c-desc" style="flex:1;padding-left:22px">' + o.name.toUpperCase() + '</div>' +
      '<span class="bdw" style="left:' + bx + 'px"><span id="' + id + 'b0" class="badge ' + o.kind + '">' + lab[o.kind] + '</span>' +
      (o.flip ? '<span id="' + id + 'b1" class="badge ' + o.flip + '" style="opacity:0">' + lab[o.flip] + '</span>' : '') + '</span>';
    if (o.meta) h += '<span class="pmeta" style="left:' + (bx + (o.kind === 'ai' ? 118 : 96)) + 'px">' + o.meta + '</span>';
    if (o.keep) h += '<span id="' + id + 'keep" class="keep" style="position:absolute;left:' + (bx + 124) + 'px;top:11px;margin:0">Keep</span>' +   // [V] "AI draft · Keep"
      '<span id="' + id + 'bin" class="bin" style="position:absolute;left:' + (bx + 212) + 'px;top:11px;margin:0">' + I.trash + '</span>';
    if (o.kebab) h += '<span id="' + id + 'keb" class="bin" style="position:absolute;left:' + o.kebab + 'px;top:11px;margin:0;font:800 20px/1 Inter;color:#475569">⋯</span>';
    h += '<div class="c-unit"></div><div class="c-qty"></div><div class="c-rate"></div><div id="' + id + 't" class="c-tot">' + (o.tot || '') + '</div><div class="c-x"></div><div class="c-y"></div>';
    return h + '<i id="' + id + 'fl" class="flashr"></i></div>';
  }
  function jbRow(p, o) {
    return '<div id="' + p + o.id + '" class="row jb cl"><div class="c-ref"></div><div class="c-desc" style="padding-left:16px">' + o.name + '</div><div class="c-unit"></div><div class="c-qty"></div><div class="c-rate"></div>' +
      '<div id="' + p + o.id + 't" class="c-tot">' + (o.tot || '') + '</div><div class="c-x"></div><div class="c-y"></div><i id="' + p + o.id + 'fl" class="flashr"></i></div>';
  }
  // line row: o.qty/rate/tot/x/y strings; cells get ids p+id+'q' etc.
  function lnRow(p, o) {
    var id = p + o.id;
    function cell(c, v, extra) { return '<div class="c-' + c + '" id="' + id + c[0] + '">' + (extra || '') + (c === 'x' || c === 'y' ? '<span id="' + id + c + 'v">' + (v || '') + '</span>' : (v || '')) + '</div>'; }
    return '<div id="' + id + '" class="row ln cl' + (o.ai ? ' aiv' : '') + '"><div class="c-ref">' + (o.ref || '') + '</div><div class="c-desc">' + o.desc + '</div><div class="c-unit">' + o.unit + '</div>' +
      '<div class="c-qty" id="' + id + 'q"><i id="' + id + 'qe" class="ed"></i><span id="' + id + 'qv">' + (o.qty || '') + '</span></div>' +
      '<div class="c-rate" id="' + id + 'r"><i id="' + id + 're" class="ed"></i>' + (o.rateHTML || '<span id="' + id + 'rv">' + (o.rate || '') + '</span>') + '</div>' +
      '<div class="c-tot"><span id="' + id + 'tv">' + (o.tot || '') + '</span></div>' +
      '<div class="c-x"><span id="' + id + 'xv">' + (o.x || '') + '</span></div><div class="c-y"><span id="' + id + 'yv">' + (o.y || '') + '</span></div>' +
      '<i id="' + id + 'fl" class="flashr"></i></div>';
  }
  function soqTop(p) {   // bar + tools ([V] SOQ, Sheet / Classic, Add a pocket, Draft / Active, Activate all drafts)
    return '<div class="bar"><h1>SOQ</h1><div class="seg"><span class="on">Sheet</span><span>Classic</span></div><div class="sp"></div>' +
      '<div id="' + p + 'add" class="btn g" style="width:218px;justify-content:center">' + I.plus + 'Add a pocket</div></div>' +
      '<div class="tools"><div class="seg"><span>Draft</span><span>Active</span><span class="on">All</span></div><div style="flex:1"></div>' +
      '<div id="' + p + 'ai" class="btn" style="width:104px;justify-content:center"><span style="width:20px;height:20px;display:inline-block">' + I.spark + '</span>AI ▾</div>' +
      '<div id="' + p + 'imp" class="btn" style="width:132px;justify-content:center">' + I.up + 'Import</div>' +
      '<div id="' + p + 'tpl" class="btn" style="width:162px;justify-content:center">' + I.tmpl + 'Templates</div>' +
      '<div id="' + p + 'col" class="btn" style="width:140px;justify-content:center">' + I.cols + 'Columns</div>' +
      '<div class="btn gl" style="width:214px;justify-content:center">Activate all drafts</div></div>';
  }
  // the P&D pocket as she leaves it at the end of chapter 2 (demo data)
  var PD = [
    { t: 'jb', id: 'j1', name: 'Stormwater', tot: '1,596' },
    { t: 'ln', id: 'l1', ref: '1.1', desc: '100 mm uPVC stormwater pipe, laid', unit: 'm', qty: '42', rate: '38.00', tot: '1,596', x: '10', y: '46.2' },
    { t: 'jb', id: 'j2', name: 'Wastewater', tot: '2,864' },
    { t: 'ln', id: 'l2', ref: '2.1', desc: '100 mm uPVC sewer drain, laid', unit: 'm', qty: '36', rate: '44.00', tot: '1,584', x: '5', y: '37.8' },
    { t: 'ln', id: 'l3', ref: '2.2', desc: 'Inspection chamber', unit: 'ea', qty: '2', rate: '640.00', tot: '1,280', x: '', y: '2' },
    { t: 'jb', id: 'j3', name: 'Water supply', tot: '396' },
    { t: 'ln', id: 'l4', ref: '3.1', desc: '25 mm MDPE water main, laid', unit: 'm', qty: '18', rate: '22.00', tot: '396', x: '10', y: '19.8' }];
  function rowsFrom(p, list, blank) {
    return list.map(function (r) {
      if (r.t === 'jb') return jbRow(p, { id: r.id, name: r.name, tot: blank ? '' : r.tot });
      return lnRow(p, r);
    }).join('');
  }

  /* =========================================================================================
     CH2 · Price it (21.2 s): Add a pocket → Draft to Active → type a quantity and a rate (line, job, pocket and
     Grand total tick up) → Waste % column + a formula column → Import the old spreadsheet as drafts */
  S.ch2 = {
    dur: 21.2,
    caps: [[0.2, 2.7, 'A pocket per trade.'], [2.85, 5.45, 'It starts as a Draft. She makes it Active.'], [5.6, 8.9, 'Line, job, pocket and Grand total tick up together.'],
      [9.1, 13.9, 'Her own columns: Waste %, then a formula.'], [14.1, 16.4, 'And the brother-in-law\'s spreadsheet?'], [16.6, 21.0, 'In it comes, as drafts. 2024 rates: worth a second look.']],
    html: function (p) {
      var h = '<div id="' + p + '" class="wcam" data-qa-ignore><div class="app">' + soqTop(p);
      h += '<div id="' + p + 'sh" class="sheet" style="height:474px;--wx:0;--wy:0">' + hdRow() + '<div class="sbody"><div id="' + p + 'sin" class="sin">' +
        pkRow(p, { id: 'pk', name: 'Plumbing & drainage', kind: 'dr', flip: 'ac', tot: '', bx: 300 }) + rowsFrom(p, PD, true) +
        pkRow(p, { id: 'i1', name: 'Foundations', kind: 'dr', tot: '15,423', meta: '5 lines · build-costs-2024.xlsx', bx: 200 }) +
        pkRow(p, { id: 'i2', name: 'Framing', kind: 'dr', tot: '35,120', meta: '4 lines · build-costs-2024.xlsx', bx: 200 }) +
        pkRow(p, { id: 'i3', name: 'Roofing', kind: 'dr', tot: '12,776', meta: '2 lines · build-costs-2024.xlsx', bx: 200 }) +
        '</div><div id="' + p + 'empty" class="empty"><b>Nothing here yet</b>Add the first pocket to start pricing this project.</div></div></div>';   // [V]
      h += '<div id="' + p + 'gt" class="gt"><span class="l">Grand total</span><span id="' + p + 'gtv" class="v">$0</span><i id="' + p + 'gtfl" class="flashr" style="border-radius:14px"></i></div>';   // [V] Grand total
      h += '<div id="' + p + 'ff" class="ff" style="left:34px;top:672px">▸▸ sped up</div>';
      // Add a pocket dialog
      h += '<div id="' + p + 'scr" class="scrim"></div><div id="' + p + 'd1" class="dlg" style="left:480px;top:130px;width:640px;height:440px;padding:0">' +
        '<h3 class="abs" style="left:34px;top:30px">Add a pocket</h3><div class="abs" style="left:34px;top:92px;font:700 17px/1 Inter;color:#334155">Pocket name</div>' +
        '<div class="inp f abs" style="left:34px;top:122px;width:572px"><span id="' + p + 'pn">Plumbing &amp; drainage</span><span id="' + p + 'pnc" class="caret"></span></div>' +
        // [V] pocket helper
        '<div class="abs" style="left:34px;top:198px;width:572px;font:500 19px/1.45 Inter;color:#475569">A pocket is a trade category — it becomes a tender package. It starts as a Draft; activate it when it\'s part of the real bill.</div>' +
        '<div class="btn abs" style="left:318px;top:360px;width:120px;justify-content:center">Cancel</div><div id="' + p + 'd1b" class="btn g abs" style="left:450px;top:360px;width:156px;justify-content:center">Add a pocket</div></div>';
      // column popovers
      function colPop(id, name, typeOn, formula) {
        var types = ['Text', 'Number', 'Money', 'Percent', 'Date', 'Pick from a list', 'Tick box', 'Formula'];   // [V] column types
        var x = 0, y = 0, chips = '';
        types.forEach(function (t, i) { var w = 16 + t.length * 10.2 + 16; if (x + w > 560) { x = 0; y += 50; } chips += '<span id="' + p + id + 't' + i + '" class="tchip" style="position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + Math.round(w) + 'px;justify-content:center">' + t + '</span>'; x += w + 10; });
        return '<div id="' + p + id + '" class="menu" style="left:900px;top:164px;width:620px;height:' + (formula ? 412 : 330) + 'px;padding:0">' +
          '<div class="abs" style="left:26px;top:24px;font:800 24px/1 Inter;color:#0F172A">Add a column</div>' +
          '<div class="abs" style="left:26px;top:66px;font:700 16px/1 Inter;color:#334155">Column name</div>' +
          '<div class="inp f abs" style="left:26px;top:90px;width:568px;height:50px"><span id="' + p + id + 'n">' + name + '</span><span id="' + p + id + 'c" class="caret"></span></div>' +
          '<div class="abs" style="left:26px;top:160px;width:568px;height:100px">' + chips + '</div>' +
          (formula ? '<div id="' + p + id + 'fr" class="abs" style="left:26px;top:270px;width:568px"><div style="font:700 16px/1 Inter;color:#334155;margin-bottom:10px">Formula</div>' +
            '<div class="inp f" style="height:50px"><span class="code" style="color:#15803D;margin-right:8px">=</span><span id="' + p + id + 'fx" class="code">' + formula + '</span><span id="' + p + id + 'fc" class="caret"></span></div></div>' : '') +
          '<div id="' + p + id + 'b" class="btn g abs" style="right:26px;bottom:22px;width:170px;justify-content:center">Add column</div></div>';
      }
      h += colPop('cp1', 'Waste %', 3) + colPop('cp2', 'Qty + waste', 7, 'Qty * (1 + Waste %)');
      // import dialog [V] "Import a schedule from Excel or CSV", "We also found these columns"
      h += '<div id="' + p + 'scr2" class="scrim"></div><div id="' + p + 'd2" class="dlg" style="left:420px;top:70px;width:760px;height:610px;padding:0">' +
        '<h3 class="abs" style="left:34px;top:30px">Import a schedule from Excel or CSV</h3>' +
        '<div class="drop" style="left:34px;top:90px;width:692px;height:150px">' + I.up + '<span class="sk" style="width:260px"></span></div>' +
        '<div id="' + p + 'file" class="doc abs" style="left:34px;top:262px;width:692px"><div class="xlsx">XLSX</div>build-costs-2024.xlsx<span class="m">11 rows</span></div>' +
        '<div id="' + p + 'fnd" class="abs" style="left:34px;top:354px;width:692px"><div style="font:800 21px/1.2 Inter;color:#0F172A">We also found these columns</div>' +
          '<div class="chk" style="margin-top:18px">' + tick2(p + 'tk1') + 'Days</div><div class="chk" style="margin-top:14px">' + tick(null, false) + 'Weather?</div><div class="chk" style="margin-top:14px">' + tick(null, false) + 'Supplier</div></div>' +
        '<div class="btn abs" style="left:442px;top:540px;width:120px;justify-content:center">Cancel</div><div id="' + p + 'd2b" class="btn g abs" style="left:574px;top:540px;width:152px;justify-content:center">Import</div></div>';
      h += '<div id="' + p + 'toast" class="ok" style="left:540px;top:664px">' + okIcon + 'Imported 3 pockets and 11 lines as drafts</div>';   // [V] pattern
      h += UI.cursor(p + 'cur') + ripples(p, 20) + '</div></div>';
      return h;
    },
    anim: function (p, T, o) {
      var P = '#' + p, c = p + 'cur', r = 0;
      function tp(t, x, y) { S.tap(p + 'rp' + (r++), T, t, x, y); }
      S.path(c, T, [[0.2, 760, 560], [0.85, 1457, 48], [1.3, 1457, 48], [2.4, 1008, 513], [2.6, 1008, 513], [3.25, 370, 239], [3.6, 370, 239], [4.35, 1236, 337], [4.9, 1236, 337], [5.2, 1358, 337],
        [8.0, 1358, 337], [8.45, 1270, 129], [8.6, 1270, 129], [9.3, 1256, 344], [9.6, 1256, 344], [9.8, 1409, 449], [10.5, 1409, 449], [10.95, 1270, 129], [11.15, 1270, 129], [11.75, 1306, 394],
        [12.85, 1306, 394], [12.95, 1409, 531], [13.5, 1409, 531], [14.1, 948, 129], [14.4, 948, 129], [15.7, 467, 480], [16.0, 467, 480], [16.25, 1070, 633], [17.2, 1300, 700]]);
      tp(0.9, 1457, 48); S.press(P + 'add', T, 0.9);
      S.dlg(P + 'scr', P + 'd1', T, 1.0, 2.62);
      Kit.type(P + 'pn', T + 1.3, T + 2.15); S.on(P + 'pnc', T, 1.1, 2.62);
      tp(2.5, 1008, 513); S.press(P + 'd1b', T, 2.5);
      S.on(P + 'empty', T, -4, 2.7);   // also during a page's lead-in before T
      S.pop(P + 'pk', T, 2.75);
      // Draft (blue) → Active (green)
      tp(3.45, 370, 239);
      add(P + 'pkb0', 'opacity', T, [[3.5, 1], [3.62, 0]]); add(P + 'pkb1', 'opacity', T, [[3.5, 0], [3.62, 1]]); add(P + 'pkb1', 'scale', T, [[3.5, 0.7], [3.7, 1, 'outBack']]);
      add(P + 'pklb', 'background', T, [[3.5, '#2563EB'], [3.7, '#16A34A']]); add(P + 'pk', 'background', T, [[3.5, '#EAF0FD'], [3.7, '#EAF7EE']]);
      S.pop(P + 'j1', T, 3.9); S.pop(P + 'l1', T, 4.0);
      // type the quantity and the rate
      tp(4.45, 1236, 337); add(P + 'l1qe', 'opacity', T, [[4.45, 0], [4.5, 1], [5.15, 1], [5.2, 0]]);
      Kit.type(P + 'l1qv', T + 4.55, T + 4.85);
      tp(5.25, 1358, 337); add(P + 'l1re', 'opacity', T, [[5.25, 0], [5.3, 1], [5.9, 1], [5.95, 0]]);
      Kit.type(P + 'l1rv', T + 5.35, T + 5.8);
      var fm = function (v) { return v < 0.5 ? '' : num(v); };
      Kit.count(P + 'l1tv', A(T, [[5.95, 0], [6.3, 1596, 'out']]), fm);
      Kit.count(P + 'j1t', A(T, [[5.95, 0], [6.35, 1596, 'out']]), fm);
      Kit.count(P + 'pkt', A(T, [[5.95, 0], [6.4, 1596, 'out'], [7.1, 1596], [7.8, 4856, 'out']]), fm);
      Kit.count(P + 'gtv', A(T, [[5.95, 0], [6.4, 1596, 'out'], [7.1, 1596], [7.8, 4856, 'out']]), function (v) { return '$' + num(v); });
      ['l1', 'j1', 'pk'].forEach(function (k) { add(P + k + 'fl', 'opacity', T, [[5.95, 0], [6.05, 1], [6.7, 0]]); });
      add(P + 'gtfl', 'opacity', T, [[5.95, 0], [6.05, 1], [6.7, 0]]);
      // the rest, sped up
      S.on(P + 'ff', T, 6.9, 8.0);
      S.pop(P + 'j2', T, 6.95); S.pop(P + 'l2', T, 7.1); S.pop(P + 'l3', T, 7.25); S.pop(P + 'j3', T, 7.4); S.pop(P + 'l4', T, 7.55);
      Kit.count(P + 'j2t', A(T, [[7.1, 0], [7.4, 2864, 'out']]), fm); Kit.count(P + 'j3t', A(T, [[7.55, 0], [7.7, 396, 'out']]), fm);
      [['l2', 7.1, 1584], ['l3', 7.25, 1280], ['l4', 7.55, 396]].forEach(function (k) { Kit.count(P + k[0] + 'tv', A(T, [[k[1], 0], [k[1] + 0.2, k[2], 'out']]), fm); });
      // Waste % column
      tp(8.5, 1270, 129); S.press(P + 'col', T, 8.5);
      S.on(P + 'cp1', T, 8.6, 9.95); add(P + 'cp1', 'y', T, [[8.6, -10], [8.75, 0, 'out']]);
      Kit.type(P + 'cp1n', T + 8.75, T + 9.15); S.on(P + 'cp1c', T, 8.6, 9.3);
      tp(9.45, 1256, 344); add(P + 'cp1t3', 'background', T, [[9.45, '#FFFFFF'], [9.5, '#F0FDF4']]); add(P + 'cp1t3', 'borderColor', T, [[9.45, '#E2E8F0'], [9.5, '#16A34A']]);
      tp(9.85, 1409, 449); S.press(P + 'cp1b', T, 9.85);
      add(P + 'sh', 'var:--wx', T, [[9.95, 0], [10.35, 120, 'out']]);
      [['l1', 10.45], ['l2', 10.6], ['l4', 10.75]].forEach(function (k) { S.pop(P + k[0] + 'xv', T, k[1], 8); });
      // formula column
      tp(11.05, 1270, 129); S.press(P + 'col', T, 11.05);
      S.on(P + 'cp2', T, 11.15, 13.05); add(P + 'cp2', 'y', T, [[11.15, -10], [11.3, 0, 'out']]);
      Kit.type(P + 'cp2n', T + 11.3, T + 11.7); S.on(P + 'cp2c', T, 11.15, 11.8);
      tp(11.85, 1306, 394); add(P + 'cp2t7', 'background', T, [[11.85, '#FFFFFF'], [11.9, '#F0FDF4']]); add(P + 'cp2t7', 'borderColor', T, [[11.85, '#E2E8F0'], [11.9, '#16A34A']]);
      S.pop(P + 'cp2fr', T, 12.0, 8); Kit.type(P + 'cp2fx', T + 12.1, T + 12.8); S.on(P + 'cp2fc', T, 12.0, 13.0);
      tp(13.0, 1409, 531); S.press(P + 'cp2b', T, 13.0);
      add(P + 'sh', 'var:--wy', T, [[13.05, 0], [13.45, 150, 'out']]);
      [['l1', 13.5], ['l2', 13.6], ['l3', 13.7], ['l4', 13.8]].forEach(function (k) { S.pop(P + k[0] + 'yv', T, k[1], 8); });
      // import the old spreadsheet
      tp(14.2, 948, 129); S.press(P + 'imp', T, 14.2);
      add(P + 'gt', 'opacity', T, [[14.25, 1], [14.45, 0]]);
      S.dlg(P + 'scr2', P + 'd2', T, 14.3, 16.35);
      add(P + 'file', 'opacity', T, [[14.75, 0], [14.9, 1]]); add(P + 'file', 'y', T, [[14.75, -40], [15.0, 0, 'outBack']]);
      S.pop(P + 'fnd', T, 15.25, 10);
      tp(15.8, 467, 480); S.tickOn(p + 'tk1', T, 15.82);
      tp(16.25, 1070, 633); S.press(P + 'd2b', T, 16.25);
      add(P + 'toast', 'opacity', T, [[16.5, 0], [16.65, 1], [19.6, 1], [19.8, 0]]); add(P + 'toast', 'y', T, [[16.5, 30], [16.75, 0, 'out']]);
      add(P + 'sh', 'height', T, [[16.4, 474], [16.8, 564, 'out']]);
      add(P + 'sin', 'y', T, [[16.6, 0], [17.2, -132, 'inOut']]);
      S.pop(P + 'i1', T, 16.95); S.pop(P + 'i2', T, 17.1); S.pop(P + 'i3', T, 17.25);
      // camera
      S.cam(P, T, (o && o.cam) || [[0, 800, 375, 1], [2.75, 800, 375, 1], [3.15, 560, 300, 1.3], [3.75, 560, 300, 1.3], [4.25, 792, 378, 1.04], [6.7, 792, 378, 1.04], [7.1, 800, 375, 1],
        [8.3, 800, 375, 1], [8.7, 1010, 330, 1.12], [10.0, 1010, 330, 1.12], [10.4, 800, 375, 1], [11.0, 800, 375, 1], [11.3, 1010, 360, 1.12], [13.1, 1010, 360, 1.12], [13.5, 800, 375, 1],
        [17.3, 800, 375, 1], [18.2, 705, 470, 1.18], [21.2, 705, 462, 1.2, 'linear']]);
    }
  };

  /* =========================================================================================
     CH3 · Fill the gaps (22 s): Draft SOQ with AI → 'AI draft' pockets, Keep one, bin one →
     Estimate with AI prices only the unpriced lines (✦) → edit one rate: its ✦ goes, banner 3 → 2 */
  S.ch3 = {
    dur: 22,
    caps: [[0.1, 1.55, 'Step 3: fill the gaps.'], [1.65, 4.45, 'AI drafts. She checks.'], [4.6, 7.2, 'Keep one. Bin the other.'], [7.4, 10.6, 'Estimate with AI prices only the empty lines.'],
      [10.8, 14.2, 'Every AI number stays marked&nbsp;✦ until a person edits it.'], [14.4, 18.2, 'She swaps one for her supplier\'s figure. Its mark goes.'], [18.4, 21.8, 'The other two stay marked. She still has to check them.']],
    html: function (p) {
      var sp = '<span class="spark">✦</span>';
      var h = '<div id="' + p + '" class="wcam" data-qa-ignore><div class="app">' + soqTop(p);
      h += '<div id="' + p + 'sh" class="sheet" style="height:564px;--wx:120;--wy:150">' + hdRow() + '<div class="sbody"><div id="' + p + 'sin" class="sin">' +
        pkRow(p, { id: 'pk', name: 'Plumbing & drainage', kind: 'ac', tot: '4,856', meta: '3 jobs · 4 lines', bx: 300 }) +
        pkRow(p, { id: 'i1', name: 'Foundations', kind: 'dr', tot: '15,423', meta: '5 lines · build-costs-2024.xlsx', bx: 200 }) +
        pkRow(p, { id: 'i2', name: 'Framing', kind: 'dr', tot: '35,120', meta: '4 lines · build-costs-2024.xlsx', bx: 200 }) +
        pkRow(p, { id: 'i3', name: 'Roofing', kind: 'dr', tot: '12,776', meta: '2 lines · build-costs-2024.xlsx', bx: 200 }) +
        pkRow(p, { id: 'w', name: 'Windows & joinery', kind: 'ai', flip: 'dr', tot: '', keep: true, bx: 300 }) +
        jbRow(p, { id: 'wj', name: 'Windows and doors' }) +
        lnRow(p, { id: 'w1', ref: '1.1', desc: 'Awning windows, 1200 × 1500', unit: 'ea', qty: '2', y: '2', rateHTML: '<span id="' + p + 'w1rv" class="aim"><span id="' + p + 'w1sp">' + sp + '</span>1,150.00</span>' }) +
        lnRow(p, { id: 'w2', ref: '1.2', desc: 'Sliding door, 2400 × 2100, low-E', unit: 'ea', qty: '1', y: '1', rateHTML: '<span id="' + p + 'w2rv" class="aim"><span id="' + p + 'w2sp">' + sp + '</span>3,900.00</span><span id="' + p + 'w2nv" style="position:absolute;right:12px">4,300.00</span>' }) +
        lnRow(p, { id: 'w3', ref: '1.3', desc: 'Awning and fixed windows, small', unit: 'ea', qty: '3', y: '3', rateHTML: '<span id="' + p + 'w3rv" class="aim"><span id="' + p + 'w3sp">' + sp + '</span>780.00</span>' }) +
        pkRow(p, { id: 'g', name: 'Landscaping', kind: 'ai', tot: '', keep: true, bx: 300 }) +
        lnRow(p, { id: 'g1', ref: '1.1', desc: 'Topsoil and instant lawn', unit: 'm²', qty: '120', y: '120' }) +
        lnRow(p, { id: 'g2', ref: '1.2', desc: 'Planting allowance', unit: 'item', qty: '1', y: '1' }) +
        '</div></div></div>';
      // the unreviewed banner [V]
      h += '<div id="' + p + 'ban" class="banner" style="top:536px;right:auto;width:1060px"><span style="width:26px;height:26px;flex:none">' + I.spark + '</span><span><b id="' + p + 'banN">3</b> lines priced by AI and not yet reviewed — double-check the figures (marked with ✦ in the sheet) before relying on them.</span></div>';
      // AI menu
      h += '<div id="' + p + 'menu" class="menu" style="left:766px;top:160px;width:330px"><div id="' + p + 'm0" class="mi">Draft SOQ with AI</div><div id="' + p + 'm1" class="mi">Estimate with AI</div><div class="mi">Extract with AI</div></div>';  // [V]
      // Draft SOQ with AI [V]
      h += '<div id="' + p + 'scr" class="scrim"></div><div id="' + p + 'dA" class="dlg" style="left:400px;top:110px;width:800px;height:520px;padding:0">' +
        '<h3 class="abs" style="left:34px;top:30px">Draft SOQ with AI</h3>' +
        '<div class="abs" style="left:34px;top:80px;width:732px;font:500 20px/1.45 Inter;color:#475569">The assistant drafts a measured Schedule of Quantities straight onto the sheet as AI-draft pockets — keep, edit or discard them.</div>' +
        '<div class="doc abs" style="left:34px;top:180px;width:732px">' + tick(null, true) + '<div class="ic">PDF</div>Demo pack.pdf<span class="chipread" style="margin-left:auto">' + 'Plans read</span></div>' +
        '<div class="abs lvl" style="left:34px;top:270px"><span class="pill on">New build</span><span class="pill"><span class="sk" style="width:90px"></span></span><span class="pill"><span class="sk" style="width:120px"></span></span></div>' +
        '<div class="btn abs" style="left:476px;top:440px;width:130px;justify-content:center">Cancel</div><div id="' + p + 'dAb" class="btn g abs" style="left:620px;top:440px;width:146px;justify-content:center">Draft</div></div>';
      // Estimate with AI [V]
      h += '<div id="' + p + 'scr2" class="scrim"></div><div id="' + p + 'dE" class="dlg" style="left:400px;top:70px;width:800px;height:610px;padding:0">' +
        '<h3 class="abs" style="left:34px;top:28px">Estimate with AI</h3>' +
        '<div class="abs" style="left:34px;top:92px;font:700 18px/1 Inter;color:#334155">What level of finish?</div>' +
        '<div class="abs lvl" style="left:34px;top:122px"><span class="pill">Basic / budget</span><span id="' + p + 'lvS" class="pill">Standard</span><span class="pill">High-end</span></div>' +
        '<div class="abs" style="left:34px;top:198px;font:700 18px/1 Inter;color:#334155">Where is the project?</div>' +
        '<div id="' + p + 'loc" class="inp abs" style="left:34px;top:228px;width:732px"><span id="' + p + 'locph" class="ph" style="position:absolute;left:16px">e.g. Auckland, New Zealand</span><span id="' + p + 'locv">Christchurch, New Zealand</span><span id="' + p + 'locc" class="caret"></span></div>' +
        '<div class="abs" style="left:34px;top:314px;width:732px;padding:16px 20px;border-radius:12px;background:#F5F0FF;border:1.5px solid #DDD6FE;font:500 19px/1.45 Inter;color:#4C1D95">The AI prices only the unpriced lines, grounded in your project documents. Every figure is marked as AI-estimated for you to review. This uses AI credits.</div>' +
        '<div class="btn abs" style="left:476px;top:530px;width:130px;justify-content:center">Cancel</div><div id="' + p + 'dEb" class="btn g abs" style="left:620px;top:530px;width:146px;justify-content:center">Estimate</div></div>';
      h += '<div id="' + p + 'toast" class="ok" style="left:520px;top:664px">' + okIcon + 'Pocket kept — it\'s now part of your SOQ</div>';   // [V]
      h += UI.cursor(p + 'cur') + ripples(p, 20) + '</div></div>';
      return h;
    },
    anim: function (p, T, o) {
      var P = '#' + p, r = 0;
      function tp(t, x, y) { S.tap(p + 'rp' + (r++), T, t, x, y); }
      S.path(p + 'cur', T, [[0.2, 700, 560], [0.85, 818, 129], [1.0, 818, 129], [1.3, 900, 191], [1.6, 900, 191], [2.65, 1093, 573], [3.0, 1093, 573], [4.55, 494, 294], [4.9, 494, 294], [5.65, 563, 546],
        [6.1, 563, 546], [7.35, 818, 129], [7.6, 818, 129], [7.9, 900, 241], [8.2, 900, 241], [8.55, 687, 214], [8.8, 687, 214], [9.0, 760, 325], [10.2, 760, 325], [10.45, 1093, 623], [10.8, 1093, 623],
        [14.4, 1078, 443], [15.6, 1078, 443], [16.3, 1220, 640]]);
      tp(0.9, 818, 129); S.press(P + 'ai', T, 0.9);
      S.on(P + 'menu', T, 1.0, 1.45); add(P + 'menu', 'y', T, [[1.0, -10], [1.15, 0, 'out']]);
      tp(1.35, 900, 191); add(P + 'm0', 'background', T, [[1.3, '#FFFFFF'], [1.35, '#F0FDF4']]);
      S.dlg(P + 'scr', P + 'dA', T, 1.5, 2.88);
      tp(2.75, 1093, 573); S.press(P + 'dAb', T, 2.75);
      add(P + 'sin', 'y', T, [[3.0, 0], [3.6, -168, 'inOut']]);
      ['w', 'wj', 'w1', 'w2', 'w3', 'g', 'g1', 'g2'].forEach(function (k, i) { S.pop(P + k, T, 3.15 + i * 0.1, 12); });
      // the AI rates are not there yet
      ['w1', 'w2', 'w3'].forEach(function (k, i) { var t = 11.0 + i * 0.3; add(P + k + 'rv', 'opacity', T, [[t, 0], [t + 0.12, 1]]); add(P + k + 'rv', 'scale', T, [[t, 0.6], [t + 0.25, 1, 'outBack']]);
        add(P + k, 'background', T, k === 'w2' ? [[t, '#FFFFFF'], [t + 0.2, '#F5F0FF'], [15.7, '#F5F0FF'], [15.9, '#FFFFFF']] : [[t, '#FFFFFF'], [t + 0.2, '#F5F0FF']]); });
      // Keep one
      tp(4.7, 494, 294); S.press(P + 'wkeep', T, 4.7);
      add(P + 'wb0', 'opacity', T, [[4.75, 1], [4.85, 0]]); add(P + 'wb1', 'opacity', T, [[4.75, 0], [4.9, 1]]);
      add(P + 'wkeep', 'opacity', T, [[4.78, 1], [4.9, 0]]); add(P + 'wbin', 'opacity', T, [[4.78, 1], [4.9, 0]]);
      add(P + 'wlb', 'background', T, [[4.75, '#7C3AED'], [4.95, '#2563EB']]); add(P + 'w', 'background', T, [[4.75, '#F5F0FF'], [4.95, '#EAF0FD']]);
      add(P + 'toast', 'opacity', T, [[4.85, 0], [5.0, 1], [7.1, 1], [7.3, 0]]); add(P + 'toast', 'y', T, [[4.85, 30], [5.1, 0, 'out']]);
      // bin the other
      tp(5.8, 563, 546); S.press(P + 'gbin', T, 5.8);
      [['g', 56], ['g1', 50], ['g2', 50]].forEach(function (k) { add(P + k[0], 'height', T, [[5.9, k[1]], [6.3, 0, 'inOut']]); add(P + k[0], 'opacity', T, [[5.9, 1], [6.15, 0]]); });
      // Estimate with AI
      tp(7.5, 818, 129); S.press(P + 'ai', T, 7.5);
      S.on(P + 'menu', T, 7.6, 8.05); add(P + 'menu', 'y', T, [[7.6, -10], [7.75, 0, 'out']]);
      tp(7.95, 900, 241); add(P + 'm1', 'background', T, [[7.9, '#FFFFFF'], [7.95, '#F0FDF4']]); add(P + 'm0', 'background', T, [[7.55, '#FFFFFF']]);
      S.dlg(P + 'scr2', P + 'dE', T, 8.1, 10.58);
      tp(8.65, 687, 214); add(P + 'lvS', 'background', T, [[8.65, '#FFFFFF'], [8.7, '#16A34A']]); add(P + 'lvS', 'color', T, [[8.65, '#334155'], [8.7, '#FFFFFF']]); add(P + 'lvS', 'borderColor', T, [[8.65, '#E2E8F0'], [8.7, '#16A34A']]);
      tp(9.05, 760, 325); add(P + 'loc', 'borderColor', T, [[9.05, '#CBD5E1'], [9.1, '#16A34A']]);
      S.on(P + 'locph', T, 0, 9.12); Kit.type(P + 'locv', T + 9.15, T + 9.95); S.on(P + 'locc', T, 9.1, 10.5);
      tp(10.5, 1093, 623); S.press(P + 'dEb', T, 10.5);
      // the three unpriced lines fill (✦), the pocket total ticks up
      var fm = function (v) { return v < 0.5 ? '' : num(v); };
      [['w1', 11.0, 2300], ['w2', 11.3, 3900], ['w3', 11.6, 2340]].forEach(function (k) { Kit.count(P + k[0] + 'tv', A(T, [[k[1], 0], [k[1] + 0.25, k[2], 'out']]), fm); });
      Kit.count(P + 'wt', A(T, [[11.0, 0], [11.9, 8540, 'out'], [15.7, 8540], [16.0, 8940, 'out']]), fm);
      add(P + 'ban', 'opacity', T, [[12.1, 0], [12.25, 1]]); add(P + 'ban', 'y', T, [[12.1, 20], [12.35, 0, 'out']]);
      // she edits one rate: its ✦ goes, the count drops
      tp(14.5, 1078, 443); add(P + 'w2re', 'opacity', T, [[14.5, 0], [14.55, 1], [15.65, 1], [15.7, 0]]);
      add(P + 'w2rv', 'opacity', T, [[14.62, 1], [14.7, 0]]);
      add(P + 'w2nv', 'opacity', T, [[14.75, 0], [14.76, 1]]); Kit.type(P + 'w2nv', T + 14.8, T + 15.5);
      Kit.count(P + 'w2tv', A(T, [[11.3, 0], [11.55, 3900, 'out'], [15.7, 3900], [16.0, 4300, 'out']]), fm);
      add(P + 'w2fl', 'opacity', T, [[15.7, 0], [15.8, 1], [16.4, 0]]);
      Kit.count(P + 'banN', A(T, [[15.8, 3], [15.85, 2, 'hold']]), function (v) { return String(Math.round(v)); });
      add(P + 'banN', 'scale', T, [[15.82, 1.6], [16.1, 1, 'out']]);
      S.cam(P, T, (o && o.cam) || [[0, 800, 375, 1], [3.5, 800, 375, 1], [4.1, 640, 420, 1.2], [6.6, 640, 420, 1.2], [7.2, 800, 375, 1], [10.8, 800, 375, 1], [11.3, 725, 420, 1.15], [17.2, 725, 420, 1.15],
        [18.0, 760, 430, 1.1], [22, 760, 430, 1.12, 'linear']]);
    }
  };
  // the WIN pocket total cell id is p+'wt' (from pkRow)

  /* =========================================================================================
     CH4 · Ask the plans (12 s): Chat with AI, BETA, the 'It can get things wrong' line, a question.
     No answer is shown and no page citation is mocked: the three label types appear as an editor's legend. */
  S.ch4 = {
    dur: 12,
    caps: [[0.2, 3.6, 'Step 4: ask the plans. It\'s Beta, and says so.'], [3.8, 7.6, 'Each figure is meant to say where it came from.'], [7.8, 11.8, 'It can get things wrong. Check before you price.']],
    html: function (p) {
      var h = '<div id="' + p + '" class="wcam" data-qa-ignore>' + planScreen(p, {});
      h += '<div id="' + p + 'chat" class="chat" style="left:auto"><div class="ch">Chat with AI<span class="beta">Beta</span></div>' +   // [V]
        '<div class="warn">We\'re still working on this one. It can get things wrong, so check anything you\'re going to price or sign off.</div>' +   // [V]
        '<div id="' + p + 'q" class="msg me" style="top:262px">What cladding is specified?</div>' +
        '<div id="' + p + 'dots" class="abs" style="left:28px;top:352px"><span class="dot3"><i id="' + p + 'o0"></i><i id="' + p + 'o1"></i><i id="' + p + 'o2"></i></span></div>' +
        '<div class="ask"><div id="' + p + 'in" class="inp" style="padding-right:70px"><span id="' + p + 'inv">What cladding is specified?</span><span id="' + p + 'inc" class="caret"></span></div>' +
        '<div id="' + p + 'send" class="btn g" style="position:absolute;right:6px;top:5px;width:44px;height:44px;padding:0;justify-content:center">' + I.send + '</div></div></div>';
      h += '<div id="' + p + 'leg" class="legend" style="left:64px;top:236px;width:730px"><div class="lt">Each figure is meant to carry a label:</div>' +
        '<div id="' + p + 'g0" class="lr"><span class="lc"><i style="background:#16A34A"></i>From your documents</span>the plans it has read</div>' +   // [V] labels
        '<div id="' + p + 'g1" class="lr"><span class="lc"><i style="background:#2563EB"></i>From your project</span>your SOQ and project data</div>' +
        '<div id="' + p + 'g2" class="lr"><span class="lc"><i style="background:#D97706"></i>My estimate</span>its own guess: check it</div></div>';
      h += UI.cursor(p + 'cur') + ripples(p, 3) + '</div></div>';
      return h;
    },
    anim: function (p, T, o) {
      var P = '#' + p, r = 0;
      function tp(t, x, y) { S.tap(p + 'rp' + (r++), T, t, x, y); }
      add(P + 'chat', 'x', T, [[0.2, 780], [0.65, 0, 'out']]);
      S.path(p + 'cur', T, [[0.6, 1000, 560], [1.4, 1180, 699], [2.7, 1180, 699], [2.95, 1544, 699], [3.6, 1450, 600]]);
      tp(1.45, 1180, 699); S.on(P + 'inc', T, 1.45, 2.95);
      Kit.type(P + 'inv', T + 1.55, T + 2.6); add(P + 'inv', 'opacity', T, [[3.0, 1], [3.05, 0]]);
      tp(3.0, 1544, 699); S.press(P + 'send', T, 3.0);
      S.pop(P + 'q', T, 3.05, 16); S.pop(P + 'dots', T, 3.45, 10);
      Kit.each(function (t) { for (var i = 0; i < 3; i++) { var e = document.getElementById(p + 'o' + i); if (!e) return; var ph = ((t - T) * 2.2 - i * 0.22) % 1; e.style.opacity = (0.35 + 0.65 * Math.max(0, Math.sin(ph * Math.PI))).toFixed(3); } });
      S.pop(P + 'leg', T, 4.0, 24); S.pop(P + 'g0', T, 4.45, 10); S.pop(P + 'g1', T, 4.85, 10); S.pop(P + 'g2', T, 5.25, 10);
      S.cam(P, T, (o && o.cam) || [[0, 800, 375, 1], [0.7, 800, 375, 1], [1.3, 1180, 268, 1.4], [3.2, 1180, 268, 1.4], [3.9, 800, 375, 1], [12, 800, 375, 1.03, 'linear']]);
    }
  };

  /* =========================================================================================
     CH5a · The drainage PDF read in (4.2 s) */
  S.ch5a = {
    dur: 4.2,
    caps: [[0.2, 4.1, 'Read in. Drainage: found.']],
    html: function (p) {
      var h = '<div id="' + p + '" class="wcam" data-qa-ignore>' + planScreen(p, { drain: true, compact: true });
      h += '<div id="' + p + 'menu" class="menu" style="left:1060px;top:206px;width:500px"><div class="mi on"><div class="doc" style="border:0;padding:0;background:none"><div class="ic">PDF</div>Drainage — demo.pdf</div><span style="margin-left:auto;font:500 17px Inter;color:#64748B">3 pages</span></div>' +
        '<div class="mi"><span class="sk" style="width:240px"></span></div></div>';
      h += UI.cursor(p + 'cur') + ripples(p, 2) + '</div></div>';
      return h;
    },
    anim: function (p, T, o) {
      var P = '#' + p;
      S.path(p + 'cur', T, [[0.1, 760, 640], [0.6, 1398, 170], [0.8, 1398, 170], [1.0, 1265, 242], [1.4, 1265, 242], [1.9, 900, 640]]);
      S.tap(p + 'rp0', T, 0.65, 1398, 172); S.press(P + 'read', T, 0.65);
      S.on(P + 'menu', T, 0.75, 1.15); add(P + 'menu', 'y', T, [[0.75, -10], [0.9, 0, 'out']]);
      S.tap(p + 'rp1', T, 1.05, 1266, 244);
      S.pop(P + 'doc2', T, 1.15);
      S.on(P + 'find2', T, 1.25, 2.5); S.on(P + 'count2', T, 2.5);
      add(P + 'bar2', 'scaleX', T, [[1.25, 0], [2.5, 1, 'inOut']]); add(P + 'bar2', 'opacity', T, [[1.2, 0], [1.25, 1]]);
      S.pop(P + 'd0', T, 2.2, 16); S.pop(P + 'd1', T, 2.45, 16);
      S.pop(P + 'spd2', T, 1.25, 8);   // '▸▸ sped up · Can take a few minutes' (held to the end of the chapter)
      S.cam(P, T, (o && o.cam) || [[0, 800, 375, 1], [1.1, 800, 375, 1], [1.8, 660, 470, 1.3], [4.2, 660, 470, 1.34, 'linear']]);
    }
  };

  /* =========================================================================================
     CH5b · Create New Tender from the pocket (20.8 s): Who can find it (Private) → SOQ jobs to include
     (Select whole pocket, 3 of 3) → Point them at the right sheets → Suggested payment setup 30-30-40 + 5% retention,
     GST question → Send Tender Invitations to demo contacts */
  S.ch5b = {
    // review 2026-10-04: panes 2, 3 and 4 each hold 1 s longer (captions were running at about 3 words/s over a dense dialog)
    dur: 20.8,
    caps: [[0.2, 3.8, 'Make it a tender. Private: only who she invites.'], [3.9, 8.2, 'Select the whole pocket: its jobs and lines are the scope.'],
      [8.3, 13.0, 'Point them at the drainage pages. The ones that exist now.'], [13.1, 17.5, '30-30-40 with 5% retention. Bidders can agree or counter.'], [17.6, 20.7, 'Then invite the trades she picks.']],
    html: function (p) {
      var h = '<div id="' + p + '" class="wcam" data-qa-ignore><div class="app">' + soqTop(p);
      h += '<div class="sheet" style="height:564px;--wx:120;--wy:150">' + hdRow() + '<div class="sbody"><div class="sin">' +
        pkRow(p, { id: 'pk', name: 'Plumbing & drainage', kind: 'ac', tot: '4,856', bx: 300, kebab: 760 }) + rowsFrom(p, PD, false) +
        pkRow(p, { id: 'i1', name: 'Foundations', kind: 'dr', tot: '15,423', meta: '5 lines · build-costs-2024.xlsx', bx: 200 }) +
        pkRow(p, { id: 'i2', name: 'Framing', kind: 'dr', tot: '35,120', meta: '4 lines · build-costs-2024.xlsx', bx: 200 }) + '</div></div></div>';
      h += '<div id="' + p + 'menu" class="menu" style="left:790px;top:262px;width:320px"><div id="' + p + 'm0" class="mi">Create New Tender</div><div class="mi"><span class="sk" style="width:180px"></span></div><div class="mi"><span class="sk" style="width:150px"></span></div></div>';
      // wizard
      h += '<div id="' + p + 'scr" class="scrim"></div><div id="' + p + 'wz" class="wiz"><div class="steps">' + [0, 1, 2, 3].map(function (i) { return '<i><b id="' + p + 's' + i + '"></b></i>'; }).join('') + '</div>' +
        '<div class="wt">Create New Tender</div>';   // [V]
      // pane 1: Who can find it [V]
      h += '<div id="' + p + 'p1" class="pane"><div class="sec">Who can find it</div>' +
        '<div id="' + p + 'oPub" class="popt" style="left:0;top:48px;width:948px;height:96px"><span class="rad"></span><span><b>Public</b>Published on QSME. Choose the trades it\'s for, or leave it open to anyone.</span></div>' +
        '<div id="' + p + 'oPri" class="popt" style="left:0;top:158px;width:948px;height:96px"><span class="rad"></span><span><b>Private</b>Only the people you invite can see it. No trades to choose — you pick the people.</span></div>' +
        '<div id="' + p + 'oPri2" class="popt on" style="left:0;top:158px;width:948px;height:96px;opacity:0"><span class="rad" style="border-color:#16A34A"><i style="position:absolute;inset:4px;border-radius:50%;background:#16A34A"></i></span><span><b>Private</b>Only the people you invite can see it. No trades to choose — you pick the people.</span></div>' +
        '<div id="' + p + 'oPub2" class="popt" style="left:0;top:48px;width:948px;height:96px;opacity:0"><span class="rad"></span><span><b>Public</b>Published on QSME. Choose the trades it\'s for, or leave it open to anyone.</span></div></div>';
      // pane 2: SOQ jobs to include [V]
      h += '<div id="' + p + 'p2" class="pane"><div class="sec">SOQ jobs to include (optional)</div>' +
        '<div class="secp" style="width:900px">Bidders will see these and add their own values. Only active SOQ pockets are listed — draft pockets stay hidden until you activate them.</div>' +
        '<div class="pbox" style="left:0;top:104px;width:948px"><div class="prow hdr">PLUMBING &amp; DRAINAGE<span class="m" style="display:flex;align-items:center;gap:12px;font:700 17px/1 Inter;color:#15803D">' + tick2(p + 'tw') + 'Select whole pocket</span></div>' +
        [['Stormwater', '1 line'], ['Wastewater', '2 lines'], ['Water supply', '1 line']].map(function (j, i) { return '<div class="prow">' + tick2(p + 'tj' + i) + j[0] + '<span class="m">' + j[1] + '</span></div>'; }).join('') + '</div>' +
        '<div id="' + p + 'cnt0" class="abs" style="left:0;top:330px;font:600 19px/1 Inter;color:#475569"><span id="' + p + 'cntN">0 of 3 selected</span></div><div id="' + p + 'cnt1" class="abs" style="left:0;top:330px;font:700 19px/1 Inter;color:#15803D;opacity:0">3 of 3 selected</div></div>';
      // pane 3: Point them at the right sheets [V] (the line about jumping to pages is deliberately left out)
      h += '<div id="' + p + 'p3" class="pane"><div class="sec">Point them at the right sheets</div><div class="secp">From your indexed plans — tick the sections this work is about.</div>' +
        '<div class="pbox" style="left:0;top:90px;width:948px">' + [['Drainage layout — p.1–2', 'Drainage — demo.pdf'], ['Drainage details — p.3', 'Drainage — demo.pdf'], ['Site plan — p.2–3', 'Demo pack.pdf'], ['Foundations — p.18–20', 'Demo pack.pdf']].map(function (s, i) {
          return '<div class="prow">' + (i < 2 ? tick2(p + 'tr' + i) : tick(null, false)) + s[0] + '<span class="m">' + s[1] + '</span></div>'; }).join('') + '</div></div>';
      // pane 4: payment + GST [V]
      h += '<div id="' + p + 'p4" class="pane"><div class="sec">Suggested payment setup</div><div class="secp">This becomes the default tender payment proposal. Bidders can agree to it or counter it in their bid.</div>' +
        '<div class="abs lvl" style="left:0;top:76px"><span id="' + p + 'pp0" class="pill on">50-50</span><span id="' + p + 'pp1" class="pill">30-30-40</span><span class="pill"><span class="sk" style="width:70px"></span></span></div>' +
        '<div id="' + p + 'st0" class="stage" style="left:0;top:136px;width:466px"><span id="' + p + 'st0v">50%</span></div><div id="' + p + 'st1" class="stage" style="left:482px;top:136px;width:466px"><span id="' + p + 'st1v">50%</span></div>' +
        '<div id="' + p + 'st2" class="stage" style="left:948px;top:136px;width:0"><span id="' + p + 'st2v">40%</span></div>' +
        '<div class="abs" style="left:0;top:210px;font:700 18px/1 Inter;color:#334155">Retention</div><div id="' + p + 'ret" class="inp abs" style="left:120px;top:196px;width:110px;height:46px"><span id="' + p + 'retv">5</span>%<span id="' + p + 'retc" class="caret"></span></div>' +
        '<div class="sec abs" style="left:0;top:268px">Do your prices include GST?</div><div class="secp abs" style="left:0;top:300px;width:900px">Bidders price against this and it is fixed onto their bid, so say it before anyone quotes.</div>' +
        '<div class="abs lvl" style="left:0;top:360px"><span id="' + p + 'gx" class="pill">Excluding GST</span><span class="pill">Including GST</span></div></div>';
      // pane 5: invitations [V] Send Tender Invitations / QSME member line; contacts are demo
      h += '<div id="' + p + 'p5" class="pane"><div class="sec">Send Tender Invitations</div>' +
        '<div class="pbox" style="left:0;top:50px;width:948px">' + [['DD', '#0F766E', 'Demo Drainage Co.', 'Drainlayer · demo contact'], ['DP', '#1D4ED8', 'Demo Plumbing Ltd', 'QSME member — they\'ll be told in the app'], ['DC', '#9333EA', 'Demo Civil Ltd', 'Drainlayer · demo contact']].map(function (c, i) {
          return '<div class="prow" style="height:72px"><span class="av" style="background:' + c[1] + '">' + c[0] + '</span><span><span style="display:block">' + c[2] + '</span><span class="sub2"' + (i === 1 ? '' : ' style="color:#64748B"') + '>' + c[3] + '</span></span><span class="m">' + tick2(p + 'ti' + i) + '</span></div>'; }).join('') + '</div></div>';
      h += '<div class="foot"><div class="btn" style="position:absolute;left:0;top:0;width:110px;justify-content:center">Back</div>' +
        '<div id="' + p + 'nx" class="btn g" style="position:absolute;right:0;top:0;width:120px;justify-content:center">Next</div>' +
        '<div id="' + p + 'send" class="btn g" style="position:absolute;right:0;top:0;width:290px;justify-content:center;opacity:0">Send Tender Invitations</div></div></div>';
      h += UI.cursor(p + 'cur') + ripples(p, 20) + '</div></div>';
      return h;
    },
    anim: function (p, T, o) {
      var P = '#' + p, r = 0;
      // W(): the original 17.8 s timing, with +1 s inserted before each Next press on panes 2, 3 and 4
      function W(t) { return t + (t >= 6.0 ? 1 : 0) + (t >= 9.5 ? 1 : 0) + (t >= 13.6 ? 1 : 0); }
      function wk(keys) { return keys.map(function (k) { var c = k.slice(); c[0] = W(k[0]); return c; }); }
      function ad(sel, prop, keys) { add(sel, prop, T, wk(keys)); }
      function tp(t, x, y) { S.tap(p + 'rp' + (r++), T, W(t), x, y); }
      function on(sel, a, b) { S.on(sel, T, W(a), b == null ? null : W(b)); }
      function press(sel, t) { S.press(sel, T, W(t)); }
      function tick(id, t) { S.tickOn(id, T, W(t)); }
      var NX = [1214, 668];
      S.path(p + 'cur', T, wk([[0.1, 700, 500], [0.6, 812, 240], [0.75, 812, 240], [1.0, 930, 294], [1.3, 930, 294], [1.95, 640, 376], [2.3, 640, 376], [3.5, NX[0], NX[1]], [3.8, NX[0], NX[1]],
        [4.6, 1061, 296], [5.0, 1061, 296], [6.0, 1061, 296], [6.8, NX[0], NX[1]], [7.1, NX[0], NX[1]], [7.9, 357, 282], [8.1, 357, 282], [8.4, 357, 334], [8.7, 357, 334], [9.5, 357, 334], [10.6, NX[0], NX[1]], [10.9, NX[0], NX[1]],
        [11.5, 484, 264], [11.8, 484, 264], [12.25, 501, 385], [12.7, 501, 385], [13.3, 412, 548], [13.6, 412, 548], [14.1, NX[0], NX[1]], [14.4, NX[0], NX[1]], [15.0, 1243, 252], [15.15, 1243, 252],
        [15.35, 1243, 324], [15.45, 1243, 324], [15.65, 1243, 396], [15.8, 1243, 396], [16.8, 1129, 668], [17.5, 1129, 668]]));
      tp(0.65, 812, 240); press(P + 'pkkeb', 0.65);
      on(P + 'menu', 0.75, 1.15); ad(P + 'menu', 'y', [[0.75, -10], [0.9, 0, 'out']]);
      tp(1.05, 930, 294); ad(P + 'm0', 'background', [[1.0, '#FFFFFF'], [1.05, '#F0FDF4']]);
      S.dlg(P + 'scr', P + 'wz', T, 1.15, 30);
      [1.2, 3.9, 7.3, 11.1].forEach(function (t, i) { ad(P + 's' + i, 'scaleX', [[t, 0], [t + 0.35, 1, 'out']]); });
      function pane(i, a, b) { a = W(a); b = W(b); add(P + 'p' + i, 'opacity', T, [[a, 0], [a + 0.18, 1], [b - 0.18, 1], [b, 0]]); add(P + 'p' + i, 'x', T, [[a, 40], [a + 0.25, 0, 'out'], [b - 0.18, 0], [b, -40, 'in']]); }
      pane(1, 1.2, 3.9); pane(2, 3.9, 7.3); pane(3, 7.3, 11.1); pane(4, 11.1, 14.6); pane(5, 14.6, 27);
      // 1 · Private (nothing is pre-selected before her click)
      tp(2.1, 640, 376); ad(P + 'oPri2', 'opacity', [[2.12, 0], [2.2, 1]]); ad(P + 'oPub2', 'opacity', [[2.12, 0], [2.2, 1]]);
      tp(3.6, NX[0], NX[1]); press(P + 'nx', 3.6);
      // 2 · Select whole pocket → the counter steps 1, 2, 3 with each job's tick
      tp(4.7, 1061, 296); tick(p + 'tw', 4.72); tick(p + 'tj0', 4.9); tick(p + 'tj1', 5.08); tick(p + 'tj2', 5.26);
      Kit.count(P + 'cntN', A(T, [[4.9, 0], [4.92, 1, 'hold'], [5.1, 2, 'hold']]), function (v) { return Math.round(v) + ' of 3 selected'; });
      ad(P + 'cnt0', 'opacity', [[5.26, 1], [5.3, 0]]); ad(P + 'cnt1', 'opacity', [[5.26, 0], [5.3, 1]]); ad(P + 'cnt1', 'scale', [[5.26, 1.15], [5.5, 1, 'out']]);
      tp(6.9, NX[0], NX[1]); press(P + 'nx', 6.9);
      // 3 · the drainage pages
      tp(8.0, 357, 282); tick(p + 'tr0', 8.02); tp(8.5, 357, 334); tick(p + 'tr1', 8.52);
      tp(10.7, NX[0], NX[1]); press(P + 'nx', 10.7);
      // 4 · 30-30-40, 5% retention, GST basis
      tp(11.6, 484, 264);
      ad(P + 'pp1', 'background', [[11.6, '#FFFFFF'], [11.65, '#16A34A']]); ad(P + 'pp1', 'color', [[11.6, '#334155'], [11.65, '#FFFFFF']]); ad(P + 'pp1', 'borderColor', [[11.6, '#E2E8F0'], [11.65, '#16A34A']]);
      ad(P + 'pp0', 'background', [[11.6, '#16A34A'], [11.65, '#FFFFFF']]); ad(P + 'pp0', 'color', [[11.6, '#FFFFFF'], [11.65, '#334155']]); ad(P + 'pp0', 'borderColor', [[11.6, '#16A34A'], [11.65, '#E2E8F0']]);
      ad(P + 'st0', 'width', [[11.65, 466], [12.05, 274, 'inOut']]);
      ad(P + 'st1', 'x', [[11.65, 0], [12.05, -192, 'inOut']]); ad(P + 'st1', 'width', [[11.65, 466], [12.05, 274, 'inOut']]);
      ad(P + 'st2', 'x', [[11.65, 0], [12.05, -368, 'inOut']]); ad(P + 'st2', 'width', [[11.65, 0], [12.05, 368, 'inOut']]);
      Kit.count(P + 'st0v', A(T, wk([[11.65, 50], [12.05, 30, 'inOut']])), function (v) { return Math.round(v) + '%'; });
      Kit.count(P + 'st1v', A(T, wk([[11.65, 50], [12.05, 30, 'inOut']])), function (v) { return Math.round(v) + '%'; });
      tp(12.3, 501, 385); ad(P + 'ret', 'borderColor', [[12.3, '#CBD5E1'], [12.35, '#16A34A']]); on(P + 'retc', 12.3, 13.0); ad(P + 'retv', 'opacity', [[12.45, 0], [12.47, 1]]);
      tp(13.4, 412, 548); ad(P + 'gx', 'background', [[13.4, '#FFFFFF'], [13.45, '#16A34A']]); ad(P + 'gx', 'color', [[13.4, '#334155'], [13.45, '#FFFFFF']]); ad(P + 'gx', 'borderColor', [[13.4, '#E2E8F0'], [13.45, '#16A34A']]);
      tp(14.2, NX[0], NX[1]); press(P + 'nx', 14.2);
      // 5 · invitations
      ad(P + 'nx', 'opacity', [[14.55, 1], [14.6, 0]]); ad(P + 'send', 'opacity', [[14.55, 0], [14.7, 1]]);
      tp(15.1, 1243, 252); tick(p + 'ti0', 15.12); tp(15.4, 1243, 324); tick(p + 'ti1', 15.42); tp(15.7, 1243, 396); tick(p + 'ti2', 15.72);
      tp(16.9, 1129, 668); press(P + 'send', 16.9);
      // camera (chapter time, already warped): the whole dialog stays in frame, top edge included (wizard = app y 34–716)
      S.cam(P, T, (o && o.cam) || [[0, 800, 375, 1], [1.2, 800, 375, 1], [1.7, 800, 375, 1.07], [20.8, 800, 375, 1.09, 'linear']]);
    }
  };

  /* =========================================================================================
     CH6 · What a bidder sees (split screen). Builder takes the geometry so 16:9 (side by side) and 9:16 (stacked)
     share it. Left = her SOQ with rates; right = the drainlayer's bid form: same lines, rate column empty. */
  var BL = [['jb', 'Stormwater'], ['ln', '100 mm uPVC stormwater pipe', '42', 'm', '38.00', '1,596'], ['jb', 'Wastewater'], ['ln', '100 mm uPVC sewer drain', '36', 'm', '44.00', '1,584'],
    ['ln', 'Inspection chamber', '2', 'ea', '640.00', '1,280'], ['jb', 'Water supply'], ['ln', '25 mm MDPE water main', '18', 'm', '22.00', '396']];
  S.split = {
    dur: 15,
    // g: { L: [x, y], R: [x, y], s: scale } panes are designed at 780 × 700
    html: function (p, g) {
      var s = g.s || 1;
      function pane(id, xy, inner) { return '<div id="' + p + id + '" class="abs" style="left:' + xy[0] + 'px;top:' + xy[1] + 'px" data-qa-ignore><div class="pane2 app" style="left:0;top:0;width:780px;height:700px;transform-origin:0 0;transform:scale(' + s + ')">' + inner + '</div></div>'; }
      var left = '<div class="bar" style="height:76px;padding:0 26px"><h1 style="font-size:28px">SOQ</h1><div class="sp"></div><span class="badge ac" style="margin:0">Active</span></div>' +
        '<div class="abs" style="left:20px;right:20px;top:96px;background:#fff;border:1.5px solid #E5E9EE;border-radius:12px;overflow:hidden"><table class="bt"><tr><th style="width:330px">Description</th><th class="n">Qty</th><th>Unit</th><th id="' + p + 'lrh" class="n">Rate</th><th class="n">Total</th></tr>' +
        '<tr><td class="pk" colspan="4">PLUMBING &amp; DRAINAGE</td><td class="pk n">4,856</td></tr>' +
        BL.map(function (b, i) { return b[0] === 'jb' ? '<tr><td class="jb" colspan="5">' + b[1] + '</td></tr>' :
          '<tr id="' + p + 'L' + i + '"><td>' + b[1] + '</td><td class="n">' + b[2] + '</td><td>' + b[3] + '</td><td class="n" style="font-weight:700;color:#15803D">' + b[4] + '</td><td class="n" style="font-weight:700">' + b[5] + '</td></tr>'; }).join('') +
        '</table></div><div class="gt" style="left:20px;right:20px;bottom:20px"><span class="l">Grand total</span><span class="v">$4,856</span></div><div id="' + p + 'lhl" class="abs" style="left:478px;top:96px;width:120px;height:452px;border:3px solid #16A34A;border-radius:10px"></div>';
      var right = '<div class="bar" style="height:76px;padding:0 26px"><h1 style="font-size:26px">Plumbing &amp; drainage</h1><div class="sp"></div><span class="tag" style="background:#F1F5F9;color:#475569">PRIVATE · DEMO</span></div>' +
        '<div class="abs" style="left:20px;top:92px;font:800 20px/1 Inter;color:#0F172A">How do you want to price this bid?</div>' +   // [V]
        '<div id="' + p + 'oT" class="popt on" style="left:20px;top:126px;width:362px;height:96px"><span class="rad"></span><span><b>Total price</b>Quote one all-in price for the whole job. Fast and simple.</span></div>' +   // [V]
        '<div id="' + p + 'oI" class="popt" style="left:398px;top:126px;width:362px;height:96px"><span class="rad"></span><span><b>Itemize</b>Break the work into materials and labour lines.</span></div>' +   // [V]
        '<div id="' + p + 'oT2" class="popt" style="left:20px;top:126px;width:362px;height:96px;opacity:0"><span class="rad"></span><span><b>Total price</b>Quote one all-in price for the whole job. Fast and simple.</span></div>' +
        '<div id="' + p + 'oI2" class="popt on" style="left:398px;top:126px;width:362px;height:96px;opacity:0"><span class="rad" style="border-color:#16A34A"><i style="position:absolute;inset:4px;border-radius:50%;background:#16A34A"></i></span><span><b>Itemize</b>Break the work into materials and labour lines.</span></div>' +
        '<div id="' + p + 'tot" class="abs" style="left:20px;top:240px;width:740px"><div style="font:700 17px/1 Inter;color:#334155;margin-bottom:10px"><span class="sk" style="width:120px"></span></div><div class="inp" style="width:300px"><span class="ph">$</span></div></div>' +
        '<div id="' + p + 'tbl" class="abs" style="left:20px;right:20px;top:238px;background:#fff;border:1.5px solid #E5E9EE;border-radius:12px;overflow:hidden"><table class="bt" style="font-size:17px"><tr><th style="width:250px">Description</th><th class="n">Est Qty</th><th class="n">Bid Qty</th><th id="' + p + 'rrh" class="n">Rate ($)</th><th class="n">Total Cost ($)</th></tr>' +   // [V] columns
        BL.map(function (b, i) { return b[0] === 'jb' ? '<tr id="' + p + 'R' + i + '"><td class="jb" colspan="5">' + b[1] + '</td></tr>' :
          '<tr id="' + p + 'R' + i + '"><td>' + b[1] + '</td><td class="n">' + b[2] + ' ' + b[3] + '</td><td class="n"><span class="in" style="width:70px"></span></td><td class="n"><span class="in"></span></td><td class="n"><span class="in w"></span></td></tr>'; }).join('') +
        '</table></div><div id="' + p + 'rhl" class="abs" style="left:498px;top:238px;width:118px;height:400px;border:3px dashed #D97706;border-radius:10px"></div>' +
        '<div id="' + p + 'refs" class="abs" style="left:20px;top:648px;right:20px;display:flex;align-items:center;gap:10px;font:700 15px/1 Inter;color:#334155">Referenced drawing pages' +   // [V]
        '<span class="ref" style="padding:6px 10px;font-size:14px">Drainage layout<em style="margin-left:8px">p.1–2</em></span><span class="ref" style="padding:6px 10px;font-size:14px">Drainage details<em style="margin-left:8px">p.3</em></span></div>' +
        UI.cursor(p + 'cur') + UI.ripple(p + 'rp0');
      var h = pane('Lp', g.L, left) + pane('Rp', g.R, right);
      // ghosts: rows travelling from her SOQ to the bid form; the rate and total drop away on the way
      h += '<div id="' + p + 'gh" class="abs" style="left:0;top:0;width:0;height:0" data-qa-ignore>';
      BL.forEach(function (b, i) { if (b[0] !== 'ln') return;
        h += '<div id="' + p + 'G' + i + '" class="abs" style="left:0;top:0;transform-origin:0 0;display:flex;align-items:center;height:' + (44 * s) + 'px;padding:0 ' + (10 * s) + 'px;border-radius:' + (8 * s) + 'px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.35);font:600 ' + (17 * s) + 'px/1 Inter;color:#1E293B;white-space:nowrap;gap:' + (14 * s) + 'px">' +
          '<span>' + b[1] + '</span><span style="color:#64748B">' + b[2] + ' ' + b[3] + '</span><span id="' + p + 'G' + i + 'r" style="color:#15803D;font-weight:800">' + b[4] + '  ·  ' + b[5] + '</span></div>'; });
      h += '</div>';
      return h;
    },
    anim: function (p, T, g) {
      var P = '#' + p, s = g.s || 1;
      add(P + 'Lp', 'x', T, [[0, -120], [0.5, 0, 'out']]); add(P + 'Lp', 'opacity', T, [[0, 0], [0.3, 1]]);
      add(P + 'Rp', 'x', T, [[0.1, 120], [0.6, 0, 'out']]); add(P + 'Rp', 'opacity', T, [[0.1, 0], [0.4, 1]]);
      // bidder picks Itemize
      S.path(p + 'cur', T, [[0.7, 300, 560], [1.4, 600, 175], [1.75, 600, 175], [2.6, 680, 620]]);
      S.tap(p + 'rp0', T, 1.5, 600, 175);
      add(P + 'oT2', 'opacity', T, [[1.52, 0], [1.6, 1]]); add(P + 'oI2', 'opacity', T, [[1.52, 0], [1.6, 1]]);
      add(P + 'tot', 'opacity', T, [[1.55, 1], [1.65, 0]]);
      add(P + 'tbl', 'opacity', T, [[1.65, 0], [1.8, 1]]);
      // rows travel
      var rowY = { 1: 0, 3: 2, 4: 3, 6: 5 };   // index in BL → row slot after the pocket row
      BL.forEach(function (b, i) {
        if (b[0] === 'jb') { add(P + 'R' + i, 'opacity', T, [[1.8 + i * 0.12, 0], [1.95 + i * 0.12, 1]]); return; }
        var k = rowY[i], t0 = 1.9 + k * 0.16, t1 = t0 + 0.75;
        // her row (left table: header 40 + pocket row 50) → their row (right table: header 40)
        var lx = g.L[0] + 22 * s, ly = g.L[1] + (96 + 40 + 50 + i * 50 + 3) * s, rx = g.R[0] + 22 * s, ry = g.R[1] + (238 + 40 + i * 50 + 3) * s;
        add(P + 'G' + i, 'x', T, [[t0, lx], [t1, rx, 'inOut']]); add(P + 'G' + i, 'y', T, [[t0, ly], [t1, ry, 'inOut']]);
        add(P + 'G' + i, 'opacity', T, [[t0 - 0.01, 0], [t0, 1], [t1, 1], [t1 + 0.12, 0]]);
        add(P + 'G' + i + 'r', 'opacity', T, [[t0 + 0.25, 1], [t0 + 0.42, 0]]); add(P + 'G' + i + 'r', 'blur', T, [[t0 + 0.2, 0], [t0 + 0.42, 6]]);
        add(P + 'R' + i, 'opacity', T, [[t1 - 0.05, 0], [t1 + 0.08, 1]]);
        add(P + 'L' + i, 'background', T, [[t0 - 0.05, '#FFFFFF'], [t0, '#F0FDF4'], [t1 + 0.4, '#FFFFFF']]);
      });
      Kit.each(function () { [['lrh', 'lhl'], ['rrh', 'rhl']].forEach(function (k) { var th = document.getElementById(p + k[0]), hl = document.getElementById(p + k[1]); if (!th || !hl) return;
        var tb = th.offsetParent, box = tb && tb.offsetParent; if (!box) return; hl.style.left = (box.offsetLeft + th.offsetLeft - 2) + 'px'; hl.style.width = (th.offsetWidth + 4) + 'px';
        hl.style.top = (box.offsetTop - 2) + 'px'; hl.style.height = (tb.offsetHeight + 4) + 'px'; }); });
      add(P + 'lhl', 'opacity', T, [[3.6, 0], [3.8, 1]]); add(P + 'rhl', 'opacity', T, [[3.9, 0], [4.1, 1]]);
      add(P + 'refs', 'opacity', T, [[4.6, 0], [4.8, 1]]);
    }
  };

  /* ---------- the bench (stand-in for the owner's hands-only filmed shot) ---------- */
  S.bench = function (id, o) {
    var W = o.W || 1920, H = o.H || 1080;
    var h = '<div id="' + id + '" class="bench" style="width:' + W + 'px;height:' + H + 'px"><div id="' + id + 'cam" class="cam" style="width:' + W + 'px;height:' + H + 'px;transform-origin:' + (W / 2) + 'px ' + (H / 2) + 'px">' +
      '<div class="wood" style="width:' + (W + 400) + 'px;height:' + (H + 400) + 'px"></div>' +
      '<div id="' + id + 'pw" class="abs" style="left:0;top:0;width:' + W + 'px;height:' + H + 'px;transform-origin:' + (o.px + 450) + 'px ' + (o.py + 318) + 'px">' + UI.pack(id + 'pack', o.px, o.py, o.rot || -3) + '</div>';
    if (o.sticky) h += '<div id="' + id + 'stk" class="stk" style="left:' + o.sticky[0] + 'px;top:' + o.sticky[1] + 'px;transform:rotate(' + (o.sticky[3] || 5) + 'deg)">' + o.sticky[2] + '</div>';
    if (o.xls) h += '<div id="' + id + 'xw" class="abs" style="left:0;top:0;width:' + W + 'px;height:' + H + 'px">' + UI.xls(id + 'xls', o.xls[0], o.xls[1], 6, id + 'c24') + '</div>';
    if (o.drain) h += '<div id="' + id + 'dw" class="abs" style="left:0;top:0;width:' + W + 'px;height:' + H + 'px">' +
      UI.dsheet(id + 'd3', o.drain[0] + 16, o.drain[1] + 10, 2.5, 3) + UI.dsheet(id + 'd2', o.drain[0] + 8, o.drain[1] + 5, 1, 2) + UI.dsheet(id + 'd1', o.drain[0], o.drain[1], -1.5, 1) + '</div>';
    if (o.extra) h += o.extra;
    h += '</div><div class="light"></div>' + (o.top ? '<div class="topfade"></div>' : '') + '</div>';
    return h;
  };

  window.Story = S;
})();
