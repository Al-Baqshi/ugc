/* Shared builders for "How a programme survives Christmas" (16:9 master + 9:16 cut).
   Story.sheet  — the generic spreadsheet programme (cold open). No brand UI: neutral greys, generic menus.
   Story.app    — illustrative QSME schedule shell around a Sched.G gantt, with the Days off dialog, Templates,
                  View / Export menus, the amber notice, a task card, a toast and a cursor. Verbatim wording only.
   Story.phone  — a tradie's phone (mobile web), "New dates — can you make them?".
   Story.pdf    — the printed A4 'Construction programme' on a DEMO letterhead.
   Story.desk   — timber desk stand-in for the owner's hands-only filmed shot (no longer used: the master ends on the PDF; kept for reference).
   Story.live   — a frame for the real public Knowledge Hub captures. */
(function () {
  'use strict';
  var S = window.Sched, day = S.day, T = S.T, by = S.byId;
  var Story = {};

  /* extra rows for the October (Labour Day) view */
  T.push({ id: 'g12', name: 'Gib fixing — Units 1–2', dur: 10, fixed: day(2026, 10, 19), lead: 'Demo Linings Ltd', st: 'onsite', oct: true });
  T.push({ id: 'scaf', name: 'Scaffold down — Units 1–2', dur: 1, fixed: day(2026, 10, 29), lead: 'Scaffolder · nobody yet', st: 'planned', oct: true });
  T.push({ id: 'drive', name: 'Driveway — concrete pour', dur: 1, fixed: day(2026, 10, 27), lead: 'Concreter · nobody yet', st: 'planned', oct: true });
  T.forEach(function (t) { by[t.id] = t; });

  /* ---------------- icons ---------------- */
  var ICON = {
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.5 20h19L12 3z"/><path d="M12 10v4.5M12 17.4v.1"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10.5 12 15.5l5-5M4.5 19.5h15"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    cursor: '<svg viewBox="0 0 24 24"><path d="M4 2.5 4 19.2 8.6 15 11.4 21.4 14.3 20.1 11.5 13.8 17.6 13.6Z" fill="#0F172A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    tick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px"><path d="M5 12.5 10 17.5 19 7"/></svg>'
  };
  Story.ICON = ICON;

  /* ---------------- the generic spreadsheet ---------------- */
  var SD = [ // task, start, finish, days, filled date keys
    ['Gib fixing — Units 1–2', '19 Oct', '30 Oct', 10, ['oct26']],
    ['Gib stopping', '7 Dec', '22 Dec', 12, [day(2026, 12, 21), day(2026, 12, 22)]],
    ['Painting: first coats', '23 Dec', '28 Dec', 4, [day(2026, 12, 23), day(2026, 12, 24), day(2026, 12, 25), day(2026, 12, 28)]],
    ['Kitchens & joinery', '29 Dec', '4 Jan', 5, [day(2026, 12, 29), day(2026, 12, 30), day(2026, 12, 31), day(2027, 1, 1), day(2027, 1, 4)]],
    ['Tiling: bathrooms', '29 Dec', '1 Jan', 4, [day(2026, 12, 29), day(2026, 12, 30), day(2026, 12, 31), day(2027, 1, 1)]],
    ['Landscaping & fences', '21 Dec', '28 Dec', 6, [day(2026, 12, 21), day(2026, 12, 22), day(2026, 12, 23), day(2026, 12, 24), day(2026, 12, 25), day(2026, 12, 28)]],
    ['Painting: final coats', '5 Jan', '7 Jan', 3, [day(2027, 1, 5), day(2027, 1, 6), day(2027, 1, 7)]],
    ['Plumbing fit-off', '8 Jan', '11 Jan', 2, [day(2027, 1, 8), day(2027, 1, 11)]],
    ['Electrical fit-off', '8 Jan', '8 Jan', 1, [day(2027, 1, 8)]],
    ['Floor coverings', '12 Jan', '13 Jan', 2, [day(2027, 1, 12), day(2027, 1, 13)]],
    ['Final inspection', '14 Jan', '14 Jan', 1, [day(2027, 1, 14)]],
    ['HANDOVER', '15 Jan', '', '', ['ho']]
  ];
  var DCOLS = []; (function () { for (var i = day(2026, 12, 21); i <= day(2027, 1, 15); i++) { var w = ((i % 7) + 7) % 7; if (w < 5) DCOLS.push(i); } })();
  Story.sheetGeo = function (o) {
    o = o || {};
    var g = { rn: o.compact ? 40 : 46, cA: o.cA || 300, cB: o.compact ? 0 : 104, cC: o.compact ? 0 : 104, cD: o.compact ? 0 : 66, cE: o.compact ? 84 : 92, cH: o.compact ? 10 : 12, cd: o.cd || 66, top: 128, lh: 28, hh: 60, rh: o.rh || 46, compact: !!o.compact };
    g.colX = function (k) { // k: 'A','B','C','D','E','H', or a date index into DCOLS
      var x = g.rn; if (k === 'A') return x; x += g.cA; if (k === 'B') return x; x += g.cB; if (k === 'C') return x; x += g.cC; if (k === 'D') return x; x += g.cD;
      if (k === 'E') return x; x += g.cE; if (k === 'H') return x; x += g.cH; return x + DCOLS.indexOf(k) * g.cd;
    };
    g.w = g.colX(DCOLS[DCOLS.length - 1]) + g.cd;
    g.rowY = function (r) { return g.top + g.lh + g.hh + (r - 1) * g.rh; };   // r = 1..12 data rows
    g.h = g.rowY(SD.length + 1) + 40 + 38;
    g.cell = function (r, k) { var x = g.colX(k), w = k === 'A' ? g.cA : k === 'E' ? g.cE : g.cd; return { x: x, y: g.rowY(r), w: w, h: g.rh, cx: x + w / 2, cy: g.rowY(r) + g.rh / 2 }; };
    return g;
  };
  Story.sheet = function (id, o) {
    var g = Story.sheetGeo(o), h = '', MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function c(x, y, w, hh, cls, txt, st) { if (w <= 0) return; h += '<div class="c ' + (cls || '') + '" style="left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + hh + 'px;' + (st || '') + '">' + (txt == null ? '' : txt) + '</div>'; }
    h += '<div id="' + id + '" class="sheet" style="width:' + g.w + 'px;height:' + g.h + 'px">';
    h += '<div class="tbar"><i></i><i></i><i></i><b>Townhouses x4 — programme FINAL v7 (2)</b><s>· edited by you, just now</s></div>';
    h += '<div class="menu"><span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Data</span><span class="sp"></span><span class="ic"></span><span class="ic"></span><span class="ic"></span></div>';
    h += '<div class="fx"><div class="nm">C4</div><div class="f">fx</div>=WORKDAY(B4,3)</div>';
    // column letters
    var y0 = g.top, L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', li = 0;
    c(0, y0, g.rn, g.lh, 'hd', '');
    [['A', g.cA], ['B', g.cB], ['C', g.cC], ['D', g.cD], ['E', g.cE]].forEach(function (k) { var ch = L[li++]; c(g.colX(k[0]), y0, k[1], g.lh, 'hd', ch); });
    c(g.colX('H'), y0, g.cH, g.lh, 'hidecol', '');
    li = 19; DCOLS.forEach(function (i, n) { var ll = li + n; c(g.colX(i), y0, g.cd, g.lh, 'hd', (ll >= 26 ? 'A' + L[ll - 26] : L[ll])); });
    // header row
    var y1 = y0 + g.lh, DN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    c(0, y1, g.rn, g.hh, 'rn', '1');
    c(g.colX('A'), y1, g.cA, g.hh, 'th', 'Task'); c(g.colX('B'), y1, g.cB, g.hh, 'th', 'Start'); c(g.colX('C'), y1, g.cC, g.hh, 'th', 'Finish'); c(g.colX('D'), y1, g.cD, g.hh, 'th', 'Days');
    c(g.colX('E'), y1, g.cE, g.hh, 'dh', 'Mon<b>26 Oct</b>');
    c(g.colX('H'), y1, g.cH, g.hh, 'hidecol', '');
    // compact (9:16) columns are too narrow for '21 Dec': two-line day-only headers ('Fri' / '25')
    DCOLS.forEach(function (i) { var d = new Date(Date.UTC(2026, 9, 5) + i * 864e5); c(g.colX(i), y1, g.cd, g.hh, 'dh', DN[((i % 7) + 7) % 7] + '<b>' + d.getUTCDate() + (g.compact ? '' : ' ' + MN[d.getUTCMonth()]) + '</b>'); });
    // data rows
    SD.forEach(function (r, k) {
      var y = g.rowY(k + 1), ho = r[0] === 'HANDOVER';
      c(0, y, g.rn, g.rh, 'rn', k + 2);
      c(g.colX('A'), y, g.cA, g.rh, ho ? 'ho2' : '', r[0]); c(g.colX('B'), y, g.cB, g.rh, 'n', r[1]);
      c(g.colX('C'), y, g.cC, g.rh, 'n' + (k === 2 ? ' sel' : ''), r[2]); c(g.colX('D'), y, g.cD, g.rh, 'n', r[3]);
      c(g.colX('E'), y, g.cE, g.rh, r[4].indexOf('oct26') >= 0 ? 'on' : '', '');
      c(g.colX('H'), y, g.cH, g.rh, 'hidecol', '');
      DCOLS.forEach(function (i) {
        var on = r[4].indexOf(i) >= 0, hoc = ho && i === S.day(2027, 1, 15);
        c(g.colX(i), y, g.cd, g.rh, on ? 'on' + (k % 2 ? ' alt' : '') : (hoc ? 'ho2' : ''), hoc ? 'Handover' : '', hoc ? 'justify-content:center;font-size:13.5px;font-weight:800;padding:0' : '');
      });
    });
    // one empty row + tabs
    var ye = g.rowY(SD.length + 1);
    c(0, ye, g.rn, 40, 'rn', SD.length + 2);
    h += '<div class="tabs"><span class="on">Programme</span><span>Budget</span><span>Buyer dates</span></div>';
    h += '<div id="' + id + 'ann" class="abs" style="left:0;top:0;width:' + g.w + 'px;height:' + g.h + 'px"></div>';
    h += '</div>';
    return h;
  };
  Story.SD = SD; Story.DCOLS = DCOLS;

  /* the marker Santa hat (drawn, not clip-art) */
  Story.hat = function (id, x, y, s, rot) {
    return '<svg id="' + id + '" class="hat" style="left:' + x + 'px;top:' + y + 'px;width:' + (120 * s) + 'px;height:' + (120 * s) + 'px;transform-origin:30% 90%;transform:rotate(' + (rot || -14) + 'deg)" viewBox="0 0 120 120">' +
      '<path d="M18 92 C 30 60, 52 26, 86 16 C 96 13, 106 22, 100 36 C 96 46, 92 50, 94 62 L 102 90 Z" fill="#E0302A" stroke="#7F1210" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="M84 22 C 92 22, 98 30, 94 40" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M10 92 C 40 82, 80 82, 110 92 L 108 108 C 78 98, 40 98, 12 108 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3" stroke-linejoin="round"/>' +
      '<circle cx="101" cy="32" r="12" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/></svg>';
  };

  /* ---------------- the app shell ---------------- */
  Story.app = function (id, o) {
    var h = '', W = o.w, H = o.h, gp = o.gantt, gx = o.gx, gy = o.gy, port = !!o.port;
    h += '<div id="' + id + '" class="app" style="width:' + W + 'px;height:' + H + 'px">';
    // top bar
    if (!port) {
      h += '<div class="tb"><div class="ttl"><b>Schedule</b><i>Which jobs are on, which are next, and who is doing them</i></div><span class="proj">Townhouses x4 (demo)</span><span class="sp"></span>' +
        '<span class="seg"><span class="on">Timeline</span><span>List</span><span>All projects</span></span>' +
        '<span id="' + id + 'bDays" class="btn">' + ICON.cal + 'Days off</span><span id="' + id + 'bView" class="btn">' + ICON.eye + 'View</span><span id="' + id + 'bExp" class="btn">' + ICON.dl + 'Export</span><span class="btn g">' + ICON.plus + 'Add job</span></div>';
      h += '<div class="strip"><span class="ch"><b id="' + id + 'cOn">' + (o.onsite || 1) + '</b>On site now</span><span class="ch"><b id="' + id + 'cSt">' + (o.starting || 0) + '</b>Starting this week</span><span id="' + id + 'cW" class="ch"><b id="' + id + 'cWn">0</b>Waiting for OK</span>' +
        '<span class="ch"><b>0</b>Can\'t make it</span><span class="ch"><b>0</b>Behind</span><span class="ch"><b>0</b>Rain risk</span><span class="sp"></span>' +
        '<span class="seg">' + ['Day', 'Week', 'Month', 'Year'].map(function (z) { return '<span' + (z === (o.zoom || 'Week') ? ' class="on"' : '') + '>' + z + '</span>'; }).join('') + '</span>' +
        '<div id="' + id + 'fin" class="fin"><i>FINISHES</i><b id="' + id + 'finD">' + (o.fin || '') + '</b></div></div>';
    } else {
      // portrait shell (9:16 cut): built small and scaled up ~1.4x by the page, so every word reads on a phone
      h += '<div class="tb" style="height:72px;padding:0 14px;gap:12px"><div class="ttl"><b style="font-size:25px">Schedule</b><i style="font-size:13.5px;margin-top:4px">Townhouses x4 (demo)</i></div><span class="sp"></span>' +
        '<span id="' + id + 'bDays" class="btn" style="height:40px;font-size:15.5px;padding:0 12px">' + ICON.cal + 'Days off</span>' +
        '<div id="' + id + 'fin" class="fin" style="height:56px;min-width:196px;padding:0 13px"><i style="font-size:11px">FINISHES</i><b id="' + id + 'finD" style="font-size:22px">' + (o.fin || '') + '</b></div></div>';
    }
    h += '<div class="gcard" style="left:' + gx + 'px;top:' + gy + 'px;width:' + (o.gw || (W - 2 * gx)) + 'px;height:' + (o.gh || (H - gy - 16)) + 'px">' + S.G.build(id + 'g', gp) + '</div>';
    // amber notice (top-right of the chart card)
    h += '<div id="' + id + 'ntc" class="notice" style="' + (o.ntcPos || 'right:30px;top:' + (gy + 10) + 'px') + '">' + ICON.warn + '<span id="' + id + 'ntcT">' + (o.ntc || '') + '</span><span id="' + id + 'ntcB" class="btn">Move them off the days off</span></div>';
    // toast
    h += '<div id="' + id + 'tst" class="toast" style="' + (o.tstPos || 'left:50%;bottom:26px;transform:translateX(-50%)') + '"><span id="' + id + 'tstT"></span><u id="' + id + 'tstU" style="display:none">Undo</u></div>';
    h += '<div id="' + id + 'scr" class="scrim"></div>';
    h += o.extra || '';
    h += '<div id="' + id + 'cur" class="cur"><div id="' + id + 'clk" class="clk"></div>' + ICON.cursor + '</div>';
    h += '</div>';
    return h;
  };
  Story.app.geo = function (o) { return S.G.geo(o.gantt); };

  /* the Days off dialog */
  Story.daysOff = function (id, o) {
    o = o || {}; var fs = o.fs || 1, w = o.w || 760;
    return '<div id="' + id + '" class="dlg" style="left:' + o.x + 'px;top:' + o.y + 'px;width:' + w + 'px;zoom:' + fs + '">' +
      '<h3>Days off</h3><div class="sub">The days nobody is on site. Jobs standing on them are moved out — always later, never earlier — and anyone booked in is asked to confirm their new dates.</div>' +
      (o.noHol ? '' : '<div class="sec"><div class="row"><div class="tx"><b>Public holidays</b><i>Tasks skip these days the way they skip weekends, unless a task says it works public holidays.</i></div><span class="btn">New Zealand</span></div></div>') +
      '<div class="sec"><div class="row"><div class="tx"><b>Christmas shutdown</b><div style="position:relative;height:48px"><i id="' + id + 'off" style="position:absolute;left:0;top:0">This site works straight through Christmas and the New Year.</i><i id="' + id + 'on" style="position:absolute;left:0;top:0">Shut 23 December to 11 January, every year. Nobody is on site and nothing is planned.</i></div></div>' +
      '<div id="' + id + 'tg" class="tog"><i id="' + id + 'tgk"></i></div></div>' +
      '<div id="' + id + 'pre" class="pre"><span class="on">The usual 23 Dec – 11 Jan</span><span>Shorter 24 Dec – 5 Jan</span><span>Longer 20 Dec – 18 Jan</span><span>Choose the dates</span></div></div>' +
      (o.own ? '<div class="sec"><div class="row"><div class="tx"><b>Your own days off</b></div><span id="' + id + 'add" class="btn">' + ICON.plus + 'Add a day off</span></div>' +
        '<div id="' + id + 'form"><div class="lbl2">What is it?</div><div class="fld" id="' + id + 'f1w"><span id="' + id + 'f1ph" style="color:#94A3B8;position:absolute">Site closed, crew away, wet weather…</span><span id="' + id + 'f1">Auckland Anniversary</span></div>' +
        '<div class="fld" id="' + id + 'f2">Mon 1 Feb 2027</div></div>' +
        '<div id="' + id + 'li" class="row" style="margin-top:12px;padding:12px 14px;border-radius:10px;background:#F8FAFC;border:1.5px solid #E2E8F0"><div class="tx"><b style="font-size:16.5px">Auckland Anniversary</b><i style="font-size:14.5px">Mon 1 Feb 2027 · 1 day</i></div></div></div>' : '') +
      '</div>';
  };
  Story.templates = function (id, o) {
    return '<div id="' + id + '" class="dlg" style="left:' + o.x + 'px;top:' + o.y + 'px;width:' + (o.w || 760) + 'px">' +
      '<h3>Templates — put one on Townhouses x4 (demo)</h3><div class="sub">A whole programme in one go, laid out from the start date you pick — tasks, days, who each is for, and what waits for what.</div>' +
      '<div class="tabs2"><span class="on">QSME templates</span><span>Your templates</span><span>Shared by others</span></div>' +
      '<div class="tpl"><div id="' + id + 'th" class=""><i></i>Townhouses</div><div><i></i>Townhouses — with demolition</div><div><i></i>Standard NZ build — simple flow</div><div><i></i>Full development — land to titles</div></div>' +
      '<div class="sub" style="font-size:14.5px;margin-top:14px">The ‘Allowance’ tasks are spare days for weather and re-inspections: shorten them as you pass them rather than deleting them up front.</div></div>';
  };
  Story.viewMenu = function (id, o) {
    return '<div id="' + id + '" class="menu" style="left:' + o.x + 'px;top:' + o.y + 'px;width:380px">' +
      '<div class="mh">Colour the bars by</div><div class="mi"><span class="cb"></span>Trade</div><div class="mi"><span class="cb on"></span>Status</div>' +
      '<div class="mh">Show</div><div class="mi"><span class="cb on"></span>Weekends</div><div class="mi"><span class="cb on"></span>Public holidays</div><div class="mi"><span class="cb"></span>Arrows between linked tasks</div>' +
      '<div id="' + id + 'wd" class="mi"><span id="' + id + 'wdc" class="cb"></span>What drives the finish date</div></div>';
  };
  Story.exportMenu = function (id, o) {
    return '<div id="' + id + 'm" class="menu" style="left:' + o.x + 'px;top:' + o.y + 'px;width:440px">' +
      '<div id="' + id + 'pdf" class="mi">As a PDF — the chart and the task list</div><div class="mi">As a spreadsheet (CSV)</div><div class="mi">As a template file (JSON)</div></div>';
  };
  Story.taskCard = function (id, o) {
    return '<div id="' + id + '" class="tcard" style="left:' + o.x + 'px;top:' + o.y + 'px"><h4>Driveway — concrete pour</h4><div id="' + id + 'meta" class="meta">Tue 27 Oct · 1 day · Concreter · nobody yet</div>' +
      '<div class="sec" style="margin-top:16px;padding-top:14px;border-top:1.5px solid #EEF2F6"><div class="row" style="display:flex;align-items:center;gap:14px"><div class="tx" style="flex:1"><b style="display:block;font:750 17px/1.2 Inter">Works weekends</b></div><div class="tog"><i></i></div></div>' +
      '<div class="row" style="display:flex;align-items:center;gap:14px;margin-top:14px"><div class="tx" style="flex:1"><b style="display:block;font:750 17px/1.2 Inter">Works public holidays</b><i id="' + id + 'off" style="display:block;font:500 14.5px/1.4 Inter;font-style:normal;color:#64748B;margin-top:4px">Off: this task stops for public holidays, like the rest of the country.</i></div><div id="' + id + 'tg" class="tog"><i id="' + id + 'tgk"></i></div></div></div></div>';
  };

  /* ---------------- the tradie's phone (mobile web: a browser address bar reading qsme.co.nz, never a native app) ---------------- */
  Story.phone = function (id, o) {
    return '<div id="' + id + '" class="phone" style="left:' + o.x + 'px;top:' + o.y + 'px"><div class="scr">' +
      '<div class="sb"><span>7:12</span><span style="display:flex;gap:6px;align-items:center"><i style="width:18px;height:10px;border-radius:2px;background:#0F172A;display:inline-block"></i></span></div>' +
      '<div class="url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>qsme.co.nz</div>' +
      '<div class="nav"><img src="qsme-logo.svg" alt="QSME"></div>' +
      '<div id="' + id + 'n" class="ntf"><b>New dates to confirm</b><i>Tiling: bathrooms · Townhouses x4 (demo)</i></div>' +
      '<div id="' + id + 'a" class="acard"><h5>New dates — can you make them?</h5><div class="tk">Tiling: bathrooms</div><div class="pj">Townhouses x4 (demo) · Demo Tiling Co.</div>' +
      '<div class="why">The site is shut then: Wed 23 Dec – Mon 11 Jan</div>' +
      '<div class="dt"><s>Thu 31 Dec – Thu 7 Jan</s><br><b>Mon 18 Jan – Thu 21 Jan</b></div>' +
      '<div class="bb"><span id="' + id + 'ok" class="ok">Confirm dates</span><span class="no">Can\'t make it</span></div></div>' +
      '<div id="' + id + 'd" class="done">' + ICON.tick + 'Dates confirmed</div>' +
      '</div></div>';
  };

  /* ---------------- the printed programme ---------------- */
  Story.pdf = function (id, o) {
    o = o || {}; var r = S.P.S2, CH = S.CH;
    var groups = [['Insulation & linings', ['g34', 'gib']], ['Painting', ['p1', 'p2']], ['Fit-out & joinery', ['kit', 'tile', 'floor']], ['Plumbing & gas', ['plb']], ['Electrical', ['ele']], ['Landscaping', ['land']], ['Inspections & consents', ['insp', 'hand']]];
    var x0 = day(2026, 10, 26), x1 = day(2027, 2, 14), nameW = 214, tw = 700, dw = tw / (x1 - x0 + 1), rh = 20.5;
    var h = '<div id="' + id + '" class="pdf"' + (o.style ? ' style="' + o.style + '"' : '') + '>' +
      '<div class="lh"><div class="mark">DD</div><div class="co"><b>Demo Developments Ltd</b><i>Demo letterhead</i></div><div class="demo">DEMO DATA</div></div>' +
      '<h1>Construction programme</h1><div class="meta">Townhouses x4 (demo) · 136 tasks · as at 26 October 2026</div>' +
      '<div class="boxes"><div><i>ON SITE FROM</i><b>2 Mar 2026</b></div><div id="' + id + 'fb" class="f"><i>FINISHES</i><b>4 Feb 2027</b><s>set by 9 ringed tasks</s></div><div><i>HOW LONG</i><b>11 months</b></div><div><i>TASKS</i><b>136</b></div><div><i>NEXT MILESTONE</i><b>2 Nov 2026</b><s>Pre-line inspection, Units 3–4</s></div></div>' +
      '<div class="lg"><span><i class="d"></i>Milestone</span><span><i class="pr"></i>Purple ring: drives the finish date</span><span><i class="ou"></i>Outline: the dates already agreed</span></div>' +
      '<div id="' + id + 'ch" class="chain"><b>What drives the finish date:</b> 9 linked tasks, ringed in purple, ending with Handover on 4 February 2027. <b id="' + id + 'any">Any one of them running late moves the whole finish.</b> Anything not ringed has room to move without changing it.</div>' +
      '<div class="pg">';
    var MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = x0; i <= x1; i++) { var d = new Date(Date.UTC(2026, 9, 5) + i * 864e5); if (d.getUTCDate() === 1) { var xx = nameW + (i - x0) * dw; h += '<div class="gl" style="left:' + xx + 'px"></div><div class="mo" style="left:' + (xx + 4) + 'px">' + MN[d.getUTCMonth()] + (d.getUTCMonth() < 2 ? ' 2027' : ' 2026') + '</div>'; } }
    h += '<div class="mo" style="left:' + nameW + 'px;color:#16A34A">26 Oct</div><div class="tdl" style="left:' + (nameW + dw / 2) + 'px"></div>';
    var y = 22;
    groups.forEach(function (gr) {
      h += '<div class="grp" style="top:' + (y + 5) + 'px">' + gr[0] + '</div>'; y += rh * 0.9;
      gr[1].forEach(function (tid) {
        var t = by[tid], q = r[tid], bx = nameW + (Math.max(q.s, x0) - x0) * dw, bw = (q.e - Math.max(q.s, x0) + 1) * dw;
        h += '<div class="tn" style="top:' + (y + 3) + 'px">' + t.name + '</div>';
        if (t.ms) h += '<div class="msd" style="left:' + (bx - 5) + 'px;top:' + (y + 4) + 'px"></div><div class="pd" style="left:' + (bx + 12) + 'px;top:' + (y + 3) + 'px">' + S.fRange(q.s, q.e) + '</div>';
        else h += '<div class="pb' + (t.st === 'planned' ? ' pl' : '') + (CH[tid] ? ' pu' : '') + '" style="left:' + bx + 'px;width:' + Math.max(4, bw - 1) + 'px;top:' + (y + 3) + 'px"></div><div class="pd" style="left:' + (bx + bw + 7) + 'px;top:' + (y + 3) + 'px">' + S.fRange(q.s, q.e) + '</div>';
        y += rh;
      });
    });
    h += '</div><div class="ft"><span>Construction programme · Townhouses x4 (demo) · Demo Developments Ltd</span><span>Page 1</span></div></div>';
    return h;
  };

  /* ---------------- desk + live page frames ---------------- */
  Story.desk = function (id, inner) {
    return '<div id="' + id + '" class="desk"><div id="' + id + 'cam" class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:960px 540px"><div class="wood"></div>' +
      '<div class="mug" style="left:1480px;top:120px"></div><div class="pen" style="left:1240px;top:820px;transform:rotate(-24deg)"></div>' + inner + '<div class="light"></div></div></div>';
  };
  Story.live = function (id, o) {
    return '<div id="' + id + '" class="live" data-qa-ignore style="left:' + o.x + 'px;top:' + o.y + 'px;width:' + o.w + 'px;height:' + o.h + 'px"><div class="lbar"><i></i><i></i><i></i><span>' + o.url + '</span></div>' +
      '<div class="vp"><div id="' + id + 'cam" class="cam" style="width:1600px;height:900px"><img id="' + id + 'img" alt="" style="width:1600px;height:900px">' + (o.marks || '') + '</div></div></div>';
  };

  /* ---------------- motion helpers ---------------- */
  /* cursor path: keys [[t, x, y, click?], …] (window coords) */
  Story.cursor = function (sel, keys) {
    var xs = [], ys = [];
    keys.forEach(function (k, i) { xs.push([k[0], k[1], i ? 'inOut' : undefined]); ys.push([k[0], k[2], i ? 'inOut' : undefined]); });
    Kit.add(sel, 'x', xs).add(sel, 'y', ys);
    keys.forEach(function (k) { if (k[3]) { var c = sel + ' .clk'; Kit.add(c, 'opacity', [[k[0] - 0.01, 0], [k[0], 1], [k[0] + 0.28, 0, 'out']]).add(c, 'scale', [[k[0], 0.4], [k[0] + 0.28, 1.5, 'out']]); } });
  };
  /* marker underline / circle as SVG paths drawn with 'trim' */
  Story.uline = function (id, x, y, w, color, sw) {
    return '<svg class="mksvg" style="left:' + x + 'px;top:' + (y - 10) + 'px;width:' + w + 'px;height:20px" viewBox="0 0 ' + w + ' 20"><path id="' + id + '" d="M3 12 C ' + (w * 0.3) + ' 6, ' + (w * 0.66) + ' 15, ' + (w - 3) + ' 8" fill="none" stroke="' + (color || '#E0302A') + '" stroke-width="' + (sw || 6) + '" stroke-linecap="round"/></svg>';
  };
  Story.ring = function (id, cx, cy, rx, ry, color, sw) {
    var w = rx * 2 + 40, hh = ry * 2 + 40;
    return '<svg class="mksvg" style="left:' + (cx - rx - 20) + 'px;top:' + (cy - ry - 20) + 'px;width:' + w + 'px;height:' + hh + 'px" viewBox="0 0 ' + w + ' ' + hh + '"><path id="' + id + '" d="M ' + (w / 2 + rx * 0.2) + ' ' + (20 + 2) + ' C ' + (w - 10) + ' ' + 14 + ', ' + (w - 4) + ' ' + (hh - 18) + ', ' + (w / 2) + ' ' + (hh - 18) + ' C ' + 12 + ' ' + (hh - 14) + ', ' + 8 + ' ' + 24 + ', ' + (w / 2 - rx * 0.1) + ' ' + 18 + ' L ' + (w / 2 + rx * 0.35) + ' ' + 26 + '" fill="none" stroke="' + (color || '#E0302A') + '" stroke-width="' + (sw || 6) + '" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };
  /* text that changes at given times: keys [[t, text], …] */
  Story.textAt = function (el, keys) {
    var node = typeof el === 'string' ? document.querySelector(el) : el;
    Kit.each(function (t) { var v = keys[0][1]; for (var i = 0; i < keys.length; i++) if (t >= keys[i][0]) v = keys[i][1]; if (node.textContent !== v) node.textContent = v; });
  };

  window.Story = Story;
})();
