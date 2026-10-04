/* The QS Alphabet: shared builders for all three cuts.
 * Everything is a pure function of t (Kit tracks / Kit.each hooks). No timers, no randomness (seeded hash only).
 *
 * Panels are designed stand-ins for signed-in QSME Global screens, built ONLY from the exact strings in
 * research/2026-10-02-qsme-platform-truth.md (features 3.1, 3.2, 3.3, 3.6, 4.1, 4.3, 5.1, 5.2, 5.3, 6.2, 6.4,
 * 7.1, 7.2, 7.9, 7.12, 7.16, 8.1, 8.4, 9.1, 10.1). Each window bar carries "Illustrative screen · demo data".
 * Demo data: the 'Plasterboard & ceilings' package and the Six bids figures (A 74,850 · B 76,200 · C 72,000 ·
 * D 73,480 · E 71,940 · F 71,300). People and firms are invented. No currency symbols, no 'GST', no '%' except
 * the recorded Retention value, no drawing viewer / mark-up / takeoff, no per-line bid grid, no holidays.
 */
(function () {
  'use strict';
  var QSA = {};
  QSA.LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  QSA.ORDER = ['D', 'R', 'X', 'G', 'T', 'B', 'A', 'I', 'O', 'P'];          // the order a job really happens in
  QSA.REST = ['C', 'K', 'U', 'V', 'W'];                                       // "alphabetical, for once"
  QSA.ILL = 'Illustrative screen · demo data';

  function mk(parent, html) { var d = document.createElement('div'); d.innerHTML = html.trim(); var n = d.firstElementChild; while (d.firstChild) parent.appendChild(d.firstChild); return n; }
  function q(root, sel) { var n = root.querySelector(sel); if (!n) throw new Error('QSA: no ' + sel); return n; }
  QSA.mk = mk; QSA.q = q;
  QSA.hash = function (a, b) { var h = (a * 374761393 + b * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
  QSA.fmt = function (v) { return Math.round(v).toLocaleString('en-NZ'); };
  QSA.fmt2 = function (v) { return v.toLocaleString('en-NZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };

  var CHECK = '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M3.5 9.5l3.6 3.4L14.5 5" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CURSOR = '<svg class="cursor" viewBox="0 0 34 42"><path d="M3 2 L3 33 L11 25.5 L16.5 38 L22 35.6 L16.6 23.4 L27.5 23.4 Z" fill="#0F172A" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>';
  var MAIL = '<svg width="24" height="18" viewBox="0 0 24 18"><rect x="1.5" y="1.5" width="21" height="15" rx="2.5" fill="none" stroke="#64748B" stroke-width="2.2"/><path d="M2.5 3l9.5 7 9.5-7" fill="none" stroke="#64748B" stroke-width="2.2" stroke-linejoin="round"/></svg>';
  var PDF = '<svg width="34" height="40" viewBox="0 0 34 40"><path d="M3 2h20l9 9v27H3z" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><path d="M23 2v9h9" fill="none" stroke="#CBD5E1" stroke-width="2"/><rect x="0" y="22" width="24" height="12" rx="3" fill="#DC2626"/><text x="12" y="31.5" text-anchor="middle" font-family="Inter" font-weight="800" font-size="9" fill="#fff">PDF</text></svg>';
  var XLS = '<svg width="34" height="40" viewBox="0 0 34 40"><path d="M3 2h20l9 9v27H3z" fill="#fff" stroke="#CBD5E1" stroke-width="2"/><path d="M23 2v9h9" fill="none" stroke="#CBD5E1" stroke-width="2"/><rect x="0" y="22" width="24" height="12" rx="3" fill="#15803D"/><text x="12" y="31.5" text-anchor="middle" font-family="Inter" font-weight="800" font-size="8.5" fill="#fff">XLSX</text></svg>';
  QSA.CHECK = CHECK; QSA.MAIL = MAIL;

  /* ---------------- small motion helpers ---------------- */
  QSA.pop = function (el, t, dy) { Kit.pop(el, t, { dy: dy == null ? 18 : dy, dur: 0.22, fade: 0.14 }); };
  QSA.tick = function (tk, t) { Kit.add(tk, 'opacity', [[t, 0], [t + 0.08, 1]]); Kit.add(tk, 'scale', [[t, 0.4], [t + 0.16, 1, 'outBack']]); };
  QSA.press = function (el, t) { Kit.add(el, 'scale', [[t - 0.06, 1], [t, 0.94, 'out'], [t + 0.14, 1, 'out']]); };
  QSA.cursor = function (parent, keys, clicks) {     // keys: [[t, x, y, ease?]]
    var c = mk(parent, CURSOR); var r = mk(parent, '<div class="ring"></div>');
    Kit.add(c, 'x', keys.map(function (k) { return [k[0], k[1], k[3] || 'inOut']; }));
    Kit.add(c, 'y', keys.map(function (k) { return [k[0], k[2], k[3] || 'inOut']; }));
    Kit.add(c, 'opacity', [[keys[0][0] - 0.01, 0], [keys[0][0], 1, 'hold']]);
    (clicks || []).forEach(function (t) {
      var at = keys.filter(function (k) { return k[0] <= t; }).pop() || keys[0];
      r.style.left = (at[1] + 4) + 'px'; r.style.top = (at[2] + 4) + 'px';
    });
    var rk = [[0, 0]], sk = [[0, 0.4]];
    (clicks || []).forEach(function (t) { rk.push([t, 0, 'hold'], [t + 0.02, 0.9], [t + 0.34, 0, 'out']); sk.push([t, 0.4, 'hold'], [t + 0.34, 1.25, 'out']); });
    Kit.add(r, 'opacity', rk); Kit.add(r, 'scale', sk);
    return c;
  };
  /* click ring at an explicit point (independent of the cursor) */
  QSA.ringAt = function (parent, x, y, t) { var r = mk(parent, '<div class="ring" style="left:' + x + 'px;top:' + y + 'px"></div>'); Kit.add(r, 'opacity', [[0, 0], [t, 0, 'hold'], [t + 0.02, 0.9], [t + 0.34, 0, 'out']]); Kit.add(r, 'scale', [[t, 0.4], [t + 0.34, 1.25, 'out']]); return r; };

  /* ---------------- window chrome ---------------- */
  QSA.win = function (parent, o) {
    var w = mk(parent, '<div class="win" style="left:' + (o.x || 0) + 'px;top:' + (o.y || 0) + 'px;width:' + o.w + 'px;height:' + o.h + 'px">' +
      '<div class="bar"><i></i><i></i><i></i><span class="url">' + (o.url || 'app.qsme.build') + '</span><span class="ill">' + QSA.ILL + '</span></div><div class="body app"></div></div>');
    return { el: w, body: q(w, '.body') };
  };

  /* ---------------- the alphabet strip ---------------- */
  // 26 tiles, 56 wide, 64 apart. Returns { el, tiles{}, nums{}, x(letter) centre, arcs svg }. o: { cols, rowGap, bigNums (36 px order numbers) }
  QSA.strip = function (parent, o) {
    o = o || {}; var cols = o.cols || 26, rg = o.rowGap || 150;
    var s = mk(parent, '<div class="strip' + (o.bigNums ? ' bignum' : '') + '" style="width:' + (cols * 64 - 8) + 'px;height:' + (Math.ceil(26 / cols) * rg) + 'px"></div>');
    var r = { el: s, tiles: {}, nums: {}, inner: {}, pos: {} };
    r.x = function (L) { return (QSA.LETTERS.indexOf(L) % cols) * 64 + 28; };
    QSA.LETTERS.forEach(function (L, i) {
      var x = (i % cols) * 64, y = Math.floor(i / cols) * rg; r.pos[L] = [x, y];
      var t = mk(s, '<div class="tile" style="left:' + x + 'px;top:' + y + 'px"><span style="display:inline-block">' + L + '</span></div>');
      r.tiles[L] = t; r.inner[L] = t.firstElementChild;
      var n = QSA.ORDER.indexOf(L);
      if (n >= 0) r.nums[L] = mk(s, '<div class="tnum" style="left:' + x + 'px;top:' + (y + 88) + 'px">' + (n + 1) + '</div>');
    });
    return r;
  };
  // split-flap flicker: each tile shows seeded random letters inside its window, then its own letter again
  QSA.flicker = function (strip, letters, t0, span, stagger, seed) {
    var spans = letters.map(function (L, k) { var a = t0 + k * stagger + QSA.hash(k, seed || 7) * 0.08; return { L: L, a: a, b: a + span }; });
    Kit.each(function (t) {
      spans.forEach(function (s, k) {
        var el = strip.inner[s.L];
        if (t >= s.a && t < s.b) { var f = Math.floor(t * 30); el.textContent = QSA.LETTERS[Math.floor(QSA.hash(f + k * 31, seed || 7) * 26)]; el.style.transform = 'scaleY(' + (0.55 + 0.45 * Math.abs(Math.cos(t * 30 * Math.PI))) + ')'; }
        else { el.textContent = s.L; el.style.transform = ''; }
      });
    });
    return spans;
  };

  /* ---------------- wordmark from the real logo, cut into letters ---------------- */
  // logo viewBox (qsme-logo-nor.svg): 1400 x 688 (origin x 82.5). Letter boxes in that space (px of the 1400-wide render).
  var WM = { Q: [100, 150, 436, 562], S: [436, 150, 684, 492], M: [690, 150, 1036, 492], E: [1050, 150, 1312, 492], U: [436, 494, 1312, 562] };
  QSA.WMBOX = WM;
  QSA.wordmark = function (parent, o) {   // o: { x, y, w (rendered width of the full 1400 box), src }
    var sc = o.w / 1400, H = 688 * sc;
    var root = mk(parent, '<div class="wm" style="left:' + o.x + 'px;top:' + o.y + 'px;width:' + o.w + 'px;height:' + H + 'px"></div>');
    var r = { el: root, sc: sc };
    ['Q', 'S', 'M', 'E', 'U'].forEach(function (k) {
      var b = WM[k];
      var host = root;
      if (k === 'U') { host = mk(root, '<div style="position:absolute;left:0;top:0;height:' + H + 'px;width:' + o.w + 'px;overflow:hidden"></div>'); r.Uw = host; }
      var piece = mk(host, '<div style="position:absolute;left:0;top:0;width:' + o.w + 'px;height:' + H + 'px;clip-path:inset(' + (b[1] * sc) + 'px ' + ((1400 - b[2]) * sc) + 'px ' + ((688 - b[3]) * sc) + 'px ' + (b[0] * sc) + 'px)"><img src="' + (o.src || 'qsme-logo-nor.svg') + '" style="width:' + o.w + 'px;height:' + H + 'px"></div>');
      piece.style.transformOrigin = ((b[0] + b[2]) / 2 * sc) + 'px ' + ((b[1] + b[3]) / 2 * sc) + 'px';
      r[k] = piece;
      r[k + 'c'] = [(b[0] + b[2]) / 2 * sc + o.x, (b[1] + b[3]) / 2 * sc + o.y];   // centre in parent coords
    });
    r.UwFrom = WM.U[0] * sc; r.UwTo = o.w;   // animate r.Uw 'width' from UwFrom to UwTo to draw the underline left to right
    return r;
  };

  /* =====================================================================================
   * PANELS. Each builds a window at native size W x H (default 1080 x 670) inside `parent`,
   * with local time 0 at absolute time T. Returns { el, key } (key = local time of the hero moment).
   * ===================================================================================== */
  var P = QSA.P = {};
  function W0(o) { return { w: o.w || 1080, h: o.h || 670 }; }

  /* D · Read my plans / Plan index (3.3). Reads what the drawings say; never measures. */
  P.D = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    b.style.background = '#F4F6F5';
    mk(b, '<div class="h1a" style="position:absolute;left:40px;top:30px">Plan index</div>');
    mk(b, '<div class="pl pg" style="position:absolute;left:226px;top:37px">Read my plans</div>');
    var btn = mk(b, '<div class="btn" style="position:absolute;right:40px;top:26px">Read a document</div>');
    var card = mk(b, '<div class="bx" style="position:absolute;left:40px;top:108px;width:' + (d.w - 80) + 'px;height:' + (d.h - 48 - 140) + 'px"></div>');
    var file = mk(card, '<div class="row" style="position:absolute;left:30px;top:26px">' + PDF + '<div><div class="h2a" style="font-size:24px">Drawing set — Riverside Terraces (demo).pdf</div><div class="sm" style="margin-top:4px">64 pages</div></div></div>');
    var st1 = mk(card, '<div class="row" style="position:absolute;left:30px;top:112px;font:600 24px/1 Inter"><span style="width:16px;height:16px;border-radius:50%;background:#F59E0B;display:inline-block"></span>Finding the sections…</div>');
    var st2 = mk(card, '<div class="row" style="position:absolute;left:30px;top:112px;font:700 24px/1 Inter;color:#166534"><span class="cb" style="border:none;background:#16A34A;display:flex;align-items:center;justify-content:center">' + CHECK + '</span>4 of 11 sections ready</div>');
    var track = mk(card, '<div style="position:absolute;left:30px;right:30px;top:160px;height:10px;border-radius:5px;background:#E2E8F0"></div>');
    var fill = mk(track, '<div style="position:absolute;left:0;top:0;height:10px;border-radius:5px;background:#16A34A;width:0"></div>');
    var chips = [['Site plan', 'p.2'], ['Floor plans', 'p.4–7'], ['Elevations', 'p.8–11'], ['Drainage layout', 'p.22–24']];
    var sk = [];
    var cw = [178, 224, 224, 296];
    for (var i = 0; i < 11; i++) {
      var col = i % 4, rowi = Math.floor(i / 4);
      var x = 30 + [0, 184, 414, 644][col], y = 206 + rowi * 66, ww = cw[col];
      var s = mk(card, '<div style="position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + ww + 'px;height:48px;border-radius:10px;border:2px dashed #CBD5E1;background:#F8FAFC"></div>');
      sk.push(s);
      Kit.add(s, 'opacity', [[T + 0.62 + i * 0.03, 0], [T + 0.77 + i * 0.03, 1]]);
      if (i < 4) {
        var c = mk(card, '<div class="chipa" style="position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + ww + 'px;height:48px;justify-content:space-between;border-color:#86EFAC;background:#F0FDF4">' + chips[i][0] + '<span class="pp">' + chips[i][1] + '</span></div>');
        var tc = T + 1.0 + i * 0.36;
        Kit.add(c, 'opacity', [[tc, 0], [tc + 0.1, 1]]); Kit.add(c, 'scale', [[tc, 0.86], [tc + 0.22, 1, 'outBack']]);
      }
    }
    // cursor → Read a document
    var cur = QSA.cursor(b, [[T + 0.02, 640, 380], [T + 0.3, d.w - 150, 50]], [T + 0.35]);
    Kit.add(cur, 'opacity', [[T + 0.7, 1], [T + 0.9, 0]]);
    QSA.press(btn, T + 0.35);
    Kit.add(file, 'opacity', [[T + 0.42, 0], [T + 0.55, 1]]);
    Kit.add(st1, 'opacity', [[T + 0.55, 0], [T + 0.65, 1], [T + 2.5, 1, 'hold'], [T + 2.52, 0]]);
    Kit.add(st2, 'opacity', [[T + 2.52, 0], [T + 2.6, 1]]); Kit.add(st2, 'scale', [[T + 2.52, 0.9], [T + 2.72, 1, 'outBack']]);
    Kit.add(fill, 'width', [[T + 0.6, 0], [T + 1.1, 70], [T + 1.4, 170], [T + 1.75, 250], [T + 2.1, 300], [T + 2.45, 340], [T + 2.6, (d.w - 140) * 4 / 11, 'out']]);
    return { el: w.el, key: 2.6, focus: [40, 150, 1000, 420] };
  };

  /* R · SOQ (3.1) + Draft SOQ with AI (3.6). We never claim QSME supplies rates or measures. */
  P.R = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    mk(b, '<div class="h1a" style="position:absolute;left:36px;top:26px">SOQ</div>');
    mk(b, '<div style="position:absolute;left:126px;top:28px;display:flex;border:2px solid #E2E8F0;border-radius:10px;overflow:hidden;font:600 19px/1 Inter"><span style="padding:9px 16px;background:#0F172A;color:#fff">Sheet</span><span style="padding:9px 16px;background:#fff;color:#475569">Classic</span></div>');
    var gt = mk(b, '<div style="position:absolute;right:36px;top:18px;text-align:right"><div class="sm" style="font-size:17px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Grand total</div><div class="gtv" style="font:700 34px/1.1 var(--mono);color:#0F172A;margin-top:4px">1,262,130</div></div>');
    var card = mk(b, '<div class="bx" style="position:absolute;left:36px;top:92px;width:' + (d.w - 72) + 'px;height:338px"></div>');
    mk(card, '<div class="row" style="position:absolute;left:24px;top:18px"><span class="h2a">Plasterboard &amp; ceilings</span><span class="pl pg">Active</span></div>');
    var pt = mk(card, '<div style="position:absolute;right:24px;top:18px;font:700 26px/1 var(--mono);color:#0F172A">49,952</div>');
    var rows = [['Boards supply &amp; fix', 'Material', '1,240', 'm²', '22.50', '27,900'], ['Boards supply &amp; fix', 'Labour', '1,240', 'm²', '15.50', '19,220'], ['Ceilings', 'Labour', '380', 'm²', '', ''], ['Jointing &amp; finishing', 'Labour', '1,240', 'm²', '1.80', '2,232'], ['Access', 'Labour', '1', 'item', '600.00', '600']];
    var html = '<table class="tb tight" style="position:absolute;left:12px;top:62px;width:' + (d.w - 96) + 'px"><tr><th>Item</th><th>Type</th><th class="n">Qty</th><th>Unit</th><th class="n">Rate</th><th class="n">Total</th></tr>';
    rows.forEach(function (r, i) { html += '<tr' + (i === 2 ? ' class="hot"' : '') + '><td class="b">' + r[0] + '</td><td>' + r[1] + '</td><td class="n">' + r[2] + '</td><td>' + r[3] + '</td><td class="n rt">' + r[4] + '</td><td class="n tt">' + r[5] + '</td></tr>'; });
    mk(card, html + '</table>');
    var hot = q(card, 'tr.hot'); var rt = q(hot, '.rt'); var tt = q(hot, '.tt');
    rt.innerHTML = '<span class="fld on" style="display:inline-flex;height:38px;padding:0 10px;font:500 22px/1 var(--mono);min-width:104px;justify-content:flex-end"><span class="ty">64.00</span><span class="caret"></span></span>';
    var ty = q(rt, '.ty'); var caret = q(rt, '.caret');
    Kit.type(ty, T + 0.55, T + 1.0);
    Kit.add(caret, 'opacity', [[T + 1.05, 1], [T + 1.1, 0]]);
    Kit.add(hot, 'background', [[T + 0.4, '#FFFFFF'], [T + 0.5, '#F0FDF4'], [T + 2.0, '#F0FDF4'], [T + 2.4, '#FFFFFF']]);
    Kit.count(tt, [[T + 1.05, 0], [T + 1.5, 24320, 'out']], function (v) { return v < 1 ? '' : QSA.fmt(v); });
    Kit.count(pt, [[T + 1.1, 49952], [T + 1.55, 74272, 'out']], QSA.fmt);
    Kit.count(q(gt, '.gtv'), [[T + 1.15, 1262130], [T + 1.6, 1286450, 'out']], QSA.fmt);
    // AI draft pocket
    var ai = mk(b, '<div class="bx" style="position:absolute;left:36px;top:440px;width:' + (d.w - 72) + 'px;height:104px;border-color:#C4B5FD;background:#FAF8FF"></div>');
    mk(ai, '<div class="row" style="position:absolute;left:24px;top:14px"><span class="h2a">Insulation</span><span class="pl pv">AI draft</span></div>');
    mk(ai, '<div class="sm" style="position:absolute;left:24px;top:58px;font-size:20px">Ceiling insulation · 380 m² &nbsp;·&nbsp; Wall insulation · 640 m²</div>');
    var keep = mk(ai, '<div class="btn" style="position:absolute;right:150px;top:27px;padding:12px 26px">Keep</div>');
    var disc = mk(ai, '<div class="btn ghost" style="position:absolute;right:24px;top:27px">Discard</div>');
    var kept = mk(ai, '<div class="pl pg" style="position:absolute;left:198px;top:18px">Kept</div>');
    Kit.add(ai, 'opacity', [[T + 1.75, 0], [T + 1.9, 1]]); Kit.add(ai, 'y', [[T + 1.75, 30], [T + 2.0, 0, 'out']]);
    var cur = QSA.cursor(b, [[T + 1.9, 700, 600], [T + 2.35, d.w - 200, 486]], [T + 2.45]);
    QSA.press(keep, T + 2.45);
    Kit.add(keep, 'opacity', [[T + 2.58, 1], [T + 2.66, 0]]); Kit.add(disc, 'opacity', [[T + 2.58, 1], [T + 2.66, 0]]);   // once kept, the choice is gone
    Kit.add(ai, 'borderColor', [[T + 2.45, '#C4B5FD'], [T + 2.6, '#86EFAC']]);
    Kit.add(ai, 'background', [[T + 2.45, '#FAF8FF'], [T + 2.6, '#F7FEF9']]);
    Kit.add(q(ai, '.pv'), 'opacity', [[T + 2.5, 1], [T + 2.56, 0]]);
    Kit.add(kept, 'opacity', [[T + 2.56, 0], [T + 2.62, 1]]);
    var toast = mk(b, '<div class="toast" style="left:50%;bottom:8px;margin-left:-280px;width:560px;padding:12px 22px"><span class="ok">' + CHECK + '</span>Pocket kept — it\'s now part of your SOQ</div>');   // docked below the pocket card
    Kit.add(toast, 'opacity', [[T + 2.6, 0], [T + 2.75, 1]]); Kit.add(toast, 'y', [[T + 2.6, 30], [T + 2.85, 0, 'out']]);
    Kit.add(cur, 'opacity', [[T + 2.9, 1], [T + 3.1, 0]]);
    return { el: w.el, key: 2.5, focus: [36, 300, 1008, 340] };
  };

  /* X · Excel in, Excel out (3.2). Toast counts are the real counts from assets/qsme/samples/qsme-example-soq.xlsx (3 pockets, 11 lines). */
  P.X = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    mk(b, '<div class="h1a" style="position:absolute;left:36px;top:26px">SOQ</div>');
    var exp = mk(b, '<div class="btn ghost" style="position:absolute;right:36px;top:22px">Export ▾</div>');
    // draft pockets that land after the import
    var list = mk(b, '<div style="position:absolute;left:36px;top:96px;width:' + (d.w - 72) + 'px"></div>');
    var pk = [['Foundations', '5 lines'], ['Framing', '4 lines'], ['Roofing', '2 lines']];
    var pr = pk.map(function (p, i) { var r = mk(list, '<div class="bx row" style="height:74px;padding:0 24px;margin-bottom:14px;justify-content:space-between"><span class="row"><span class="h2a">' + p[0] + '</span><span class="pl pb">Draft</span></span><span class="sm" style="font-size:21px">' + p[1] + '</span></div>'); Kit.add(r, 'opacity', [[T + 1.6 + i * 0.1, 0], [T + 1.75 + i * 0.1, 1]]); return r; });
    // dialog
    var dim = mk(b, '<div style="position:absolute;inset:0;background:rgba(15,23,42,.38)"></div>');
    var dlg = mk(b, '<div class="bx" style="position:absolute;left:150px;top:44px;width:' + (d.w - 300) + 'px;height:520px;box-shadow:0 30px 70px rgba(15,23,42,.3)"></div>');
    mk(dlg, '<div class="h2a" style="position:absolute;left:30px;top:26px;font-size:28px">Import a schedule from Excel or CSV</div>');
    var zone = mk(dlg, '<div style="position:absolute;left:30px;right:30px;top:86px;height:150px;border:3px dashed #CBD5E1;border-radius:14px;background:#F8FAFC"></div>');
    var chip = mk(dlg, '<div class="chipa" style="position:absolute;left:220px;top:132px;padding:14px 20px;font-size:23px;box-shadow:0 12px 26px rgba(15,23,42,.18)">' + XLS + 'qsme-example-soq.xlsx</div>');
    mk(dlg, '<div class="h2a" style="position:absolute;left:30px;top:262px;font-size:23px">We also found these columns</div>');
    var c1 = mk(dlg, '<div class="row" style="position:absolute;left:30px;top:310px;font:600 22px/1 Inter"><span class="cb"><span class="tk">' + CHECK + '</span></span>Supplier</div>');
    var c2 = mk(dlg, '<div class="row" style="position:absolute;left:250px;top:310px;font:600 22px/1 Inter"><span class="cb"><span class="tk">' + CHECK + '</span></span>Waste %</div>');
    var go = mk(dlg, '<div class="btn" style="position:absolute;right:30px;bottom:26px">Import</div>');
    mk(dlg, '<div class="btn ghost" style="position:absolute;right:150px;bottom:26px">Cancel</div>');
    Kit.add(chip, 'y', [[T + 0.15, -170], [T + 0.62, 0, 'out']]); Kit.add(chip, 'rotate', [[T + 0.15, -8], [T + 0.62, 0, 'out']]);
    Kit.add(chip, 'opacity', [[T + 0.15, 0], [T + 0.25, 1]]);
    Kit.add(zone, 'borderColor', [[T + 0.5, '#CBD5E1'], [T + 0.62, '#16A34A']]); Kit.add(zone, 'background', [[T + 0.5, '#F8FAFC'], [T + 0.62, '#F0FDF4']]);
    QSA.tick(q(c1, '.tk'), T + 0.95); QSA.tick(q(c2, '.tk'), T + 1.15);
    var cur = QSA.cursor(b, [[T + 0.7, 520, 560], [T + 1.35, d.w - 220, 530]], [T + 1.5]);
    QSA.press(go, T + 1.5);
    Kit.add(dlg, 'opacity', [[T + 1.6, 1], [T + 1.75, 0]]); Kit.add(dlg, 'scale', [[T + 1.6, 1], [T + 1.75, 0.96]]);
    Kit.add(dim, 'opacity', [[T + 1.6, 1], [T + 1.75, 0]]);
    var toast = mk(b, '<div class="toast" style="left:50%;bottom:30px;margin-left:-300px;width:600px"><span class="ok">' + CHECK + '</span>Imported 3 pockets and 11 lines as drafts</div>');
    Kit.add(toast, 'opacity', [[T + 1.85, 0], [T + 2.0, 1], [T + 2.75, 1], [T + 2.9, 0]]); Kit.add(toast, 'y', [[T + 1.85, 30], [T + 2.1, 0, 'out']]);
    // export menu
    var menu = mk(b, '<div class="bx" style="position:absolute;right:36px;top:84px;width:560px;padding:10px 0;box-shadow:0 24px 50px rgba(15,23,42,.25)"></div>');
    [['Excel (.xlsx)', 'Clean workbook, incl. custom columns'], ['CSV', 'Plain rows — imports straight back'], ['PDF', 'Printable — widens to fit your columns']].forEach(function (m, i) {
      var r = mk(menu, '<div style="padding:13px 24px"><div style="font:700 23px/1.1 Inter">' + m[0] + '</div><div class="sm" style="margin-top:5px">' + m[1] + '</div></div>');
      if (i === 0) r.style.background = '#F0FDF4';
    });
    Kit.add(cur, 'x', [[T + 2.5, d.w - 220], [T + 2.85, d.w - 54]]); Kit.add(cur, 'y', [[T + 2.5, 530], [T + 2.85, 62]]);   // lower-right edge of 'Export', clear of the label
    QSA.press(exp, T + 2.95);
    Kit.add(menu, 'opacity', [[T + 3.0, 0], [T + 3.12, 1]]); Kit.add(menu, 'y', [[T + 3.0, -14], [T + 3.2, 0, 'out']]);
    Kit.add(cur, 'opacity', [[T + 3.3, 1], [T + 3.5, 0]]);
    return { el: w.el, key: 2.0, focus: [36, 90, 1008, 560] };
  };

  /* G · Import jobs from SOQ (7.2) → Gantt with dates in words (7.1) → What drives the finish date (7.9) → printed programme (7.12).
     Dates are a Global demo programme (Mon–Fri, no holidays shown). */
  QSA.GTASKS = [
    ['Site set-out', 0, 2, '1–2 Mar', 1], ['Foundations', 2, 8, '3–12 Mar', 1], ['Drainage', 2, 5, '3–9 Mar', 0], ['Framing', 10, 10, '15–26 Mar', 1],
    ['Roofing', 20, 5, '29 Mar – 2 Apr', 1], ['Windows &amp; doors', 20, 4, '29 Mar – 1 Apr', 0], ['Plasterboard &amp; ceilings', 25, 10, '5–16 Apr', 1], ['Jointing &amp; finishing', 35, 5, '19–23 Apr', 1]];
  P.G = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    // --- gantt (underneath)
    var g = mk(b, '<div style="position:absolute;inset:0"></div>');
    mk(g, '<div class="h1a" style="position:absolute;left:30px;top:22px;font-size:30px">Schedule</div>');
    mk(g, '<div style="position:absolute;left:190px;top:24px;display:flex;border:2px solid #E2E8F0;border-radius:10px;overflow:hidden;font:600 18px/1 Inter"><span style="padding:8px 14px;background:#0F172A;color:#fff">Timeline</span><span style="padding:8px 14px;background:#fff;color:#475569">List</span></div>');
    var tog = mk(g, '<div class="row" style="position:absolute;right:30px;top:24px;padding:8px 14px;border:2px solid #E2E8F0;border-radius:10px;background:#fff;font:600 19px/1 Inter;gap:10px"><span class="cb" style="width:24px;height:24px"><span class="tk" style="width:24px;height:24px;background:#7C3AED">' + CHECK + '</span></span>What drives the finish date</div>');
    var L = 30, TL = 330, TW = d.w - TL - 40, top = 116, RH = 54, DAYW = TW / 46;
    mk(g, '<div style="position:absolute;left:' + TL + 'px;top:80px;width:' + TW + 'px;height:28px;font:700 17px/28px Inter;color:#64748B;letter-spacing:.06em"><span style="position:absolute;left:0">MARCH 2027</span><span style="position:absolute;left:' + (22 * DAYW) + 'px">APRIL 2027</span></div>');
    mk(g, '<div style="position:absolute;left:' + (TL + 22 * DAYW - 6) + 'px;top:80px;width:2px;height:' + (RH * 8 + 40) + 'px;background:#E2E8F0"></div>');
    var bars = [], svgp = '';
    QSA.GTASKS.forEach(function (tk, i) {
      var y = top + i * RH;
      var rowEl = mk(g, '<div class="row" style="position:absolute;left:' + L + 'px;top:' + y + 'px;height:' + (RH - 8) + 'px;width:' + (TL - L - 20) + 'px;font:600 20px/1 Inter;white-space:nowrap"><span style="width:28px;color:#94A3B8;font:600 17px/1 var(--mono)">' + (i + 1) + '</span>' + tk[0] + '</div>');
      var x0 = TL + tk[1] * DAYW, bw = tk[2] * DAYW;
      var bar = mk(g, '<div style="position:absolute;left:' + x0 + 'px;top:' + (y + 9) + 'px;width:' + bw + 'px;height:28px;border-radius:7px;background:' + (tk[4] ? '#2563EB' : '#94A3B8') + ';transform-origin:0 50%"></div>');
      var ring = mk(g, '<div style="position:absolute;left:' + (x0 - 5) + 'px;top:' + (y + 4) + 'px;width:' + (bw + 10) + 'px;height:38px;border-radius:10px;border:4px solid #7C3AED"></div>');
      var lab = mk(g, '<div style="position:absolute;left:' + (x0 + bw + 10) + 'px;top:' + (y + 13) + 'px;font:600 17px/1 Inter;color:#334155;white-space:nowrap">' + tk[3] + '</div>');
      rowEl.style.opacity = 1;
      var tb = T + 1.2 + i * 0.1;
      Kit.add(bar, 'scaleX', [[tb, 0], [tb + 0.22, 1, 'out']]); Kit.add(bar, 'opacity', [[tb, 0], [tb + 0.02, 1]]);
      Kit.add(lab, 'opacity', [[tb + 0.15, 0], [tb + 0.3, 1]]);
      Kit.add(rowEl, 'opacity', [[tb - 0.05, 0], [tb + 0.1, 1]]);
      if (tk[4]) { Kit.add(ring, 'opacity', [[T + 2.5 + i * 0.04, 0], [T + 2.62 + i * 0.04, 1]]); Kit.add(ring, 'scale', [[T + 2.5 + i * 0.04, 1.15], [T + 2.7 + i * 0.04, 1, 'out']]); }
      else ring.style.display = 'none';
      bars.push({ x0: x0, x1: x0 + bw, y: y + 23, on: tk[4] });
    });
    // thick arrows between the ringed (linked) tasks
    var on = bars.filter(function (bb) { return bb.on; });
    var svg = '<svg style="position:absolute;left:0;top:0;width:' + d.w + 'px;height:' + d.h + 'px;overflow:visible">';
    for (var k = 0; k + 1 < on.length; k++) { var a = on[k], c = on[k + 1]; svg += '<path class="ar" d="M' + (a.x1 + 2) + ' ' + a.y + ' H' + (a.x1 + 9) + ' V' + (c.y - 14) + ' H' + (c.x0 + 4) + '" fill="none" stroke="#7C3AED" stroke-width="5" stroke-linejoin="round"/>'; }
    var arrows = mk(g, svg + '</svg>');
    Kit.add(arrows, 'opacity', [[T + 2.55, 0], [T + 2.75, 1]]);
    QSA.tick(q(tog, '.tk'), T + 2.42);
    // --- import dialog on top (0 – 1.1)
    var dim = mk(b, '<div style="position:absolute;inset:0;background:rgba(15,23,42,.38)"></div>');
    var dlg = mk(b, '<div class="bx" style="position:absolute;left:120px;top:30px;width:' + (d.w - 240) + 'px;height:560px;box-shadow:0 30px 70px rgba(15,23,42,.3)"></div>');
    mk(dlg, '<div class="h2a" style="position:absolute;left:30px;top:24px;font-size:27px">Import tasks onto Riverside Terraces (demo)</div>');
    mk(dlg, '<div style="position:absolute;left:30px;top:74px;right:30px;padding:16px 18px;border:2px solid #16A34A;border-radius:12px;background:#F0FDF4"><div style="font:700 22px/1.2 Inter">Import jobs from SOQ</div><div class="sm" style="margin-top:4px">The jobs you\'ve priced on this project</div></div>');
    [['Foundations', '8 days'], ['Framing', '10 days'], ['Roofing', '5 days'], ['Plasterboard &amp; ceilings', '10 days'], ['Jointing &amp; finishing', '5 days']].forEach(function (j, i) {
      var r = mk(dlg, '<div class="row" style="position:absolute;left:30px;right:30px;top:' + (186 + i * 54) + 'px;font:600 21px/1 Inter;justify-content:space-between"><span class="row"><span class="cb"><span class="tk">' + CHECK + '</span></span>' + j[0] + '</span><span class="sm" style="font-size:19px">' + j[1] + '</span></div>');
      r.querySelector('.tk').style.opacity = 1;
    });
    var imp = mk(dlg, '<div class="btn" style="position:absolute;right:30px;bottom:24px">Import 23 tasks</div>');
    var cur = QSA.cursor(b, [[T + 0.15, 400, 560], [T + 0.75, d.w - 260, 545]], [T + 0.85]);
    QSA.press(imp, T + 0.85);
    Kit.add(dlg, 'opacity', [[T + 0.95, 1], [T + 1.1, 0]]); Kit.add(dlg, 'scale', [[T + 0.95, 1], [T + 1.1, 0.96]]);
    Kit.add(dim, 'opacity', [[T + 0.95, 1], [T + 1.1, 0]]);
    Kit.add(cur, 'x', [[T + 1.6, d.w - 260], [T + 2.3, d.w - 300]]); Kit.add(cur, 'y', [[T + 1.6, 545], [T + 2.3, 40]]);
    QSA.ringAt(b, d.w - 296, 44, T + 2.4);
    Kit.add(cur, 'opacity', [[T + 2.6, 1], [T + 2.8, 0]]);
    // --- printed programme slides into the corner
    var pdf = mk(b, '<div style="position:absolute;left:' + (d.w - 470) + 'px;top:' + (d.h - 48 - 300) + 'px;width:440px;height:310px;background:#FFFFFF;border-radius:6px;box-shadow:0 26px 60px rgba(15,23,42,.38);transform-origin:100% 100%;padding:20px 22px;font-family:Inter"></div>');
    mk(pdf, '<div style="font:800 22px/1 Inter;color:#0F172A">Construction programme</div>');
    mk(pdf, '<div style="font:500 13px/1.3 Inter;color:#64748B;margin-top:6px">Riverside Terraces (demo) · 23 tasks</div>');
    var boxes = '<div style="display:flex;gap:6px;margin-top:12px">';
    ['ON SITE FROM', 'FINISHES', 'HOW LONG', 'TASKS', 'NEXT MILESTONE'].forEach(function (k) { boxes += '<div style="flex:1;border:1.5px solid #E2E8F0;border-radius:5px;padding:6px 6px 8px"><div style="font:700 7.5px/1.1 Inter;color:#64748B;letter-spacing:.04em">' + k + '</div><div style="height:7px;width:70%;background:#CBD5E1;border-radius:3px;margin-top:6px"></div></div>'; });
    mk(pdf, boxes + '</div>');
    var mini = '<div style="position:relative;margin-top:14px;height:170px">';
    QSA.GTASKS.forEach(function (tk, i) { mini += '<div style="position:absolute;left:0;top:' + (i * 20) + 'px;width:110px;height:8px;margin-top:6px;border-radius:3px;background:#E2E8F0"></div><div style="position:absolute;left:' + (125 + tk[1] * 5.6) + 'px;top:' + (i * 20 + 4) + 'px;width:' + (tk[2] * 5.6) + 'px;height:11px;border-radius:3px;background:#2563EB;' + (tk[4] ? 'box-shadow:0 0 0 2px #7C3AED' : 'background:#94A3B8') + '"></div>'; });
    mk(pdf, mini + '</div>');
    Kit.add(pdf, 'opacity', [[T + 3.05, 0], [T + 3.15, 1]]); Kit.add(pdf, 'x', [[T + 3.05, 300], [T + 3.4, 0, 'out']]); Kit.add(pdf, 'y', [[T + 3.05, 120], [T + 3.4, 0, 'out']]); Kit.add(pdf, 'rotate', [[T + 3.05, 9], [T + 3.4, -3, 'out']]);
    return { el: w.el, key: 2.6, focus: [10, 60, 1060, 470] };
  };

  /* T · Tender cut from an SOQ pocket (4.1) + what a bidder sees (4.3): same lines, rate never shown. */
  P.T = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    mk(b, '<div class="h2a" style="position:absolute;left:30px;top:22px;font-size:27px">Create New Tender <span class="ma" style="font-weight:600">· Plasterboard &amp; ceilings</span></div>');
    var sel = mk(b, '<div class="row" style="position:absolute;left:30px;top:72px;padding:10px 16px;border:2px solid #E2E8F0;border-radius:10px;background:#fff;font:600 21px/1 Inter"><span class="cb"><span class="tk">' + CHECK + '</span></span>Select whole pocket<span class="pl pg" style="margin-left:6px">4 of 4 selected</span></div>');
    QSA.tick(q(sel, '.tk'), T + 0.45);
    Kit.add(q(sel, '.pl'), 'opacity', [[T + 0.5, 0], [T + 0.6, 1]]);
    var half = (d.w - 90) / 2;
    var lines = [['Boards supply &amp; fix', 'Material', '1,240 m²', '22.50'], ['Boards supply &amp; fix', 'Labour', '1,240 m²', '15.50'], ['Ceilings', 'Labour', '380 m²', '64.00'], ['Jointing &amp; finishing', 'Labour', '1,240 m²', '1.80'], ['Access', 'Labour', '1 item', '600.00']];
    function side(x, own) {
      var c = mk(b, '<div class="bx" style="position:absolute;left:' + x + 'px;top:140px;width:' + half + 'px;height:330px;overflow:hidden"></div>');
      var h = '<table class="tb" style="position:absolute;left:4px;top:6px;width:' + (half - 8) + 'px">';
      // the line's type sits under its name (Material / Labour), so the two 'Boards supply & fix' lines never read as a duplicate
      lines.forEach(function (l) { h += '<tr><td class="b" style="font-size:20px;padding:8px 12px">' + l[0] + '<span class="ty2">' + l[1] + '</span></td><td class="n" style="font-size:19px;padding:8px 12px">' + l[2] + '</td><td class="n rt" style="font-size:19px;width:96px;padding:8px 12px">' + (own ? l[3] : '') + '</td></tr>'; });
      mk(c, h + '</table>');
      return c;
    }
    var left = side(30, true), right = side(60 + half, false);
    var aL = mk(b, '<div class="chipk" style="position:absolute;left:' + (30 + half - 168) + 'px;top:122px;font-size:15px;padding:6px 12px">YOUR LINES</div>');
    var aR = mk(b, '<div class="chipk amb" style="position:absolute;left:' + (60 + 2 * half - 214) + 'px;top:122px;font-size:15px;padding:6px 12px">WHAT BIDDERS SEE</div>');
    Kit.add(aL, 'opacity', [[T + 0.85, 0], [T + 1.0, 1]]); Kit.add(aR, 'opacity', [[T + 1.1, 0], [T + 1.25, 1]]);
    left.querySelectorAll('.rt').forEach(function (n) { n.style.background = '#F0FDF4'; n.style.color = '#166534'; n.style.fontWeight = '700'; });
    var empt = []; right.querySelectorAll('.rt').forEach(function (n) { n.innerHTML = '<span style="display:inline-block;width:80px;height:30px;border:2px dashed #CBD5E1;border-radius:7px;vertical-align:middle"></span>'; empt.push(n.firstElementChild); });
    Kit.add(left, 'opacity', [[T + 0.75, 0], [T + 0.9, 1]]); Kit.add(left, 'x', [[T + 0.75, -20], [T + 0.95, 0, 'out']]);
    Kit.add(right, 'opacity', [[T + 1.0, 0], [T + 1.15, 1]]); Kit.add(right, 'x', [[T + 1.0, 20], [T + 1.2, 0, 'out']]);
    empt.forEach(function (e, i) { Kit.add(e, 'borderColor', [[T + 1.6 + i * 0.05, '#CBD5E1'], [T + 1.75 + i * 0.05, '#F59E0B']]); });
    // invitations
    var inv = mk(b, '<div class="row" style="position:absolute;left:30px;top:492px;width:' + (d.w - 60) + 'px;height:96px;padding:0 20px;border:2px solid #E2E8F0;border-radius:14px;background:#fff;gap:14px"></div>');
    var cl = mk(inv, '<div class="btn ghost" style="padding:11px 18px">Copy link</div>');
    var people = [['Demo Interiors', 'DI', '#0EA5E9'], ['Northside Linings', 'NL', '#8B5CF6'], ['Plaster Co. (demo)', 'PC', '#F97316']];
    people.forEach(function (p, i) {
      var c = mk(inv, '<div class="row" style="gap:10px;margin-left:' + (i ? 14 : 20) + 'px;font:600 19px/1 Inter;white-space:nowrap">' + p[0] + '<span class="pl pn st1" style="font-size:16px">Invited</span><span class="pl pg st2" style="font-size:16px;display:none">Viewed</span></div>');
      Kit.add(c, 'opacity', [[T + 2.75 + i * 0.1, 0], [T + 2.9 + i * 0.1, 1]]);
      if (i < 2) { var s1 = q(c, '.st1'), s2 = q(c, '.st2'); Kit.each(function (t) { var v = t >= T + 3.35 + i * 0.25; s1.style.display = v ? 'none' : ''; s2.style.display = v ? '' : 'none'; }); }
    });
    Kit.add(inv, 'opacity', [[T + 2.5, 0], [T + 2.65, 1]]);
    QSA.ringAt(b, 120, 540, T + 2.7);
    return { el: w.el, key: 1.8, focus: [20, 130, 1040, 350], rateX: 60 + half + half - 70, rateY: 140 + 8 + 30 };
  };

  /* B · Compare bids (5.2): one row per bidder, one bold total, 'Lowest' tag; each bid opens to its own lines.
     NOT a line-by-line matrix. Header row masked (live Global labels still say GST). D was 'Add a bid you received' (5.1). */
  QSA.BIDS = [['A', 'Bidder A', '74,850'], ['B', 'Bidder B', '76,200'], ['C', 'Bidder C', '72,000'], ['D', 'Bidder D', '73,480', 'mail'], ['E', 'Bidder E', '71,940'], ['F', 'Bidder F', '71,300', 'low']];
  P.B = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    mk(b, '<div class="h1a" style="position:absolute;left:34px;top:24px">Compare bids</div>');
    mk(b, '<div class="sm" style="position:absolute;left:300px;top:36px;font-size:22px">Plasterboard &amp; ceilings</div>');
    var LW = 500;
    var tbl = mk(b, '<div class="bx" style="position:absolute;left:34px;top:92px;width:' + LW + 'px;height:470px;overflow:hidden"></div>');
    var rows = [];
    QSA.BIDS.forEach(function (r, i) {
      var y = 14 + i * 74;
      var row = mk(tbl, '<div class="row" style="position:absolute;left:10px;right:10px;top:' + y + 'px;height:64px;padding:0 14px;border-radius:10px;font:600 22px/1 Inter;white-space:nowrap;gap:12px"><span class="avatar" style="width:34px;height:34px;font-size:15px;background:#475569">' + r[0] + '</span>' + r[1] + (r[3] === 'mail' ? '<span class="row" style="gap:6px;margin-left:2px">' + MAIL + '<span class="pl pn" style="font-size:15px;padding:5px 10px">Received by you</span></span>' : '') + (r[3] === 'low' ? '<span class="pl pg" style="margin-left:4px">Lowest</span>' : '') + '<span style="margin-left:auto;font:700 25px/1 var(--mono)">' + r[2] + '</span></div>');
      Kit.add(row, 'opacity', [[T + 0.12 + i * 0.07, 0], [T + 0.26 + i * 0.07, 1]]); Kit.add(row, 'x', [[T + 0.12 + i * 0.07, 24], [T + 0.32 + i * 0.07, 0, 'out']]);
      rows.push(row);
    });
    Kit.add(rows[3], 'background', [[T + 0.95, '#FFFFFF'], [T + 1.1, '#F1F5F9'], [T + 1.7, '#F1F5F9'], [T + 1.9, '#FFFFFF']]);
    Kit.add(rows[5], 'background', [[T + 1.9, '#FFFFFF'], [T + 2.05, '#DCFCE7']]);
    // breakdown drawer for Bidder F
    var dr = mk(b, '<div class="bx" style="position:absolute;left:' + (34 + LW + 20) + 'px;top:92px;width:' + (d.w - LW - 88) + 'px;height:470px;padding:22px 20px"></div>');
    mk(dr, '<div style="font:700 25px/1.2 Inter">Detailed price breakdown</div><div class="sm" style="margin-top:6px">Bidder F · 71,300</div>');
    var h = '<table class="tb" style="margin-top:16px"><tr><th style="padding:0 6px 12px;font-size:14px">Item</th><th style="padding:0 6px 12px;font-size:14px">Type</th><th class="n" style="padding:0 6px 12px;font-size:14px">Qty</th><th class="n" style="padding:0 6px 12px;font-size:14px">Rate</th><th class="n" style="padding:0 6px 12px;font-size:14px">Line total</th></tr>';
    [['Boards supply &amp; fix', 'Material', '1,240 m²', '21.40', '26,536'], ['Boards supply &amp; fix', 'Labour', '1,240 m²', '15.20', '18,848'], ['Ceilings', 'Labour', '380 m²', '61.00', '23,180'], ['Jointing &amp; finishing', 'Labour', '1,240 m²', '1.70', '2,108'], ['Access', 'Labour', '1 item', '628.00', '628']].forEach(function (l) {
      h += '<tr><td style="font-size:16px;font-weight:600;padding:12px 6px">' + l[0] + '</td><td style="font-size:16px;padding:12px 6px">' + l[1] + '</td><td class="n" style="font-size:15px;padding:12px 6px">' + l[2] + '</td><td class="n" style="font-size:15px;padding:12px 6px">' + l[3] + '</td><td class="n" style="font-size:15px;padding:12px 6px">' + l[4] + '</td></tr>';
    });
    mk(dr, h + '</table>');
    Kit.add(dr, 'opacity', [[T + 2.1, 0], [T + 2.25, 1]]); Kit.add(dr, 'x', [[T + 2.1, 40], [T + 2.4, 0, 'out']]);
    var cur = QSA.cursor(b, [[T + 1.3, 700, 640], [T + 1.95, 260, 92 + 14 + 5 * 74 + 26]], [T + 2.0]);
    Kit.add(cur, 'opacity', [[T + 2.6, 1], [T + 2.8, 0]]);
    return { el: w.el, key: 0.9, focus: [34, 92, 560, 470] };
  };

  /* A · Award this bid? (5.3) → Active Work: the award creates the payment contract. Nothing is signed at award. */
  P.A = function (parent, T, o) {
    o = o || {}; var d = W0(o); var w = QSA.win(parent, { x: o.x || 0, y: o.y || 0, w: d.w, h: d.h }); var b = w.body;
    // behind: Active Work page (revealed after award)
    var aw = mk(b, '<div style="position:absolute;inset:0;padding:26px 34px"></div>');
    mk(aw, '<div class="h1a">Active Work</div><div class="sm" style="margin-top:6px;font-size:21px">Everything you\'ve awarded, with what to do next.</div>');
    var card = mk(aw, '<div class="bx" style="position:absolute;left:34px;right:34px;top:116px;height:400px;padding:26px 28px;border-color:#86EFAC"></div>');
    mk(card, '<div class="row" style="justify-content:space-between"><div><div class="h2a" style="font-size:28px">Plasterboard &amp; ceilings</div><div class="sm" style="margin-top:6px;font-size:21px">Bidder F · Riverside Terraces (demo)</div></div><span class="pl pg" style="font-size:20px">Active</span></div>');
    var stats = mk(card, '<div style="display:flex;gap:16px;margin-top:26px"></div>');
    [['Contract value', '71,300'], ['Paid to date', '0'], ['Retention', '5%'], ['Milestones', '0 / 3 confirmed']].forEach(function (s, i) {
      var c = mk(stats, '<div style="flex:1;padding:18px 18px;border:2px solid #E2E8F0;border-radius:12px;background:#F8FAFC"><div class="sm" style="font-size:18px;font-weight:600">' + s[0] + '</div><div style="font:700 30px/1.1 var(--mono);margin-top:10px;white-space:nowrap">' + s[1] + '</div></div>');
      Kit.add(c, 'opacity', [[T + 2.45 + i * 0.1, 0], [T + 2.6 + i * 0.1, 1]]); Kit.add(c, 'y', [[T + 2.45 + i * 0.1, 16], [T + 2.65 + i * 0.1, 0, 'out']]);
    });
    var stg = mk(card, '<div class="row" style="margin-top:26px;padding:18px 20px;border-radius:12px;background:#F0FDF4;border:2px solid #BBF7D0;font:700 23px/1 Inter;color:#166534"><span style="width:14px;height:14px;border-radius:50%;background:#16A34A"></span>Stage 1 of 3 — Mobilisation</div>');
    Kit.add(stg, 'opacity', [[T + 2.95, 0], [T + 3.1, 1]]);
    Kit.add(aw, 'opacity', [[T + 2.2, 0], [T + 2.35, 1]]);
    // before: the compare table, dimmed, under the dialog
    var bt = mk(b, '<div style="position:absolute;inset:0;padding:24px 34px"></div>');
    mk(bt, '<div class="h1a">Compare bids</div>');
    QSA.BIDS.forEach(function (r, i) { mk(bt, '<div class="row" style="position:absolute;left:34px;width:560px;top:' + (100 + i * 70) + 'px;height:58px;padding:0 16px;border-radius:10px;background:' + (i === 5 ? '#DCFCE7' : '#fff') + ';font:600 22px/1 Inter;border:2px solid #E2E8F0">' + r[1] + (i === 5 ? '<span class="pl pg">Lowest</span>' : '') + '<span style="margin-left:auto;font:700 23px/1 var(--mono)">' + r[2] + '</span></div>'); });
    var dim = mk(bt, '<div style="position:absolute;inset:0;background:rgba(15,23,42,.42)"></div>');
    var dlg = mk(bt, '<div class="bx" style="position:absolute;left:170px;top:120px;width:' + (d.w - 340) + 'px;height:330px;padding:30px 34px;box-shadow:0 30px 80px rgba(15,23,42,.35)"></div>');
    mk(dlg, '<div class="h2a" style="font-size:30px">Award this bid?</div><div style="font:500 23px/1.45 Inter;color:#334155;margin-top:14px;white-space:normal">This awards the work to <b>Bidder F</b> for <b class="mono">71,300</b>, creates the payment contract, and notifies all bidders. It can\'t be undone from here.</div>');
    var ab = mk(dlg, '<div class="btn" style="position:absolute;right:34px;bottom:28px;padding:14px 28px;font-size:24px">Award bid</div>');
    mk(dlg, '<div class="btn ghost" style="position:absolute;right:220px;bottom:28px;padding:14px 22px;font-size:24px">Cancel</div>');
    Kit.add(dlg, 'opacity', [[T + 0.25, 0], [T + 0.4, 1]]); Kit.add(dlg, 'scale', [[T + 0.25, 0.94], [T + 0.45, 1, 'out']]);
    Kit.add(dim, 'opacity', [[T + 0.2, 0], [T + 0.4, 1]]);
    var cur = QSA.cursor(b, [[T + 0.5, 300, 560], [T + 1.15, d.w - 290, 120 + 330 - 46]], [T + 2.0]);
    QSA.press(ab, T + 2.0);
    Kit.add(bt, 'opacity', [[T + 2.12, 1], [T + 2.3, 0]]);
    Kit.add(cur, 'opacity', [[T + 2.2, 1], [T + 2.35, 0]]);
    return { el: w.el, key: 2.6, focus: [34, 100, 1012, 430], dialogFocus: [170, 120, 740, 330] };
  };

  /* I · Agreements signed from a link (6.2), 'Sign it as it is' with your own PDF (6.4). A phone BROWSER, never the app. */
  P.I = function (parent, T, o) {
    o = o || {}; var d = W0(o);
    var root = mk(parent, '<div style="position:absolute;left:' + (o.x || 0) + 'px;top:' + (o.y || 0) + 'px;width:' + d.w + 'px;height:' + d.h + 'px"></div>');
    // sender's Agreements list (desktop)
    var w = QSA.win(root, { x: 0, y: 70, w: 600, h: 430 }); var b = w.body;
    mk(b, '<div style="position:absolute;left:28px;top:22px"><div class="h1a" style="font-size:30px">Agreements</div><div class="sm" style="margin-top:4px">Write it, send it, get it signed</div></div>');
    var item = mk(b, '<div class="bx" style="position:absolute;left:28px;right:28px;top:120px;padding:20px 22px"></div>');
    mk(item, '<div class="row">' + PDF + '<div><div style="font:700 22px/1.2 Inter">Subcontract — Plasterboard &amp; ceilings (demo)</div><div class="sm" style="font-size:18px;margin-top:4px">12 pages · PDF · <b style="color:#0F172A">Sign it as it is</b></div></div></div>');
    var sOut = mk(item, '<div class="pl pa" style="margin-top:16px;font-size:19px">Out for signing</div>');
    var sAll = mk(item, '<div class="pl pg" style="margin-top:16px;font-size:19px;position:absolute;left:22px;bottom:20px">Everyone has signed</div>');
    mk(b, '<div class="row" style="position:absolute;left:28px;top:290px;gap:12px;font:600 20px/1 Inter"><span class="avatar" style="width:40px;height:40px;font-size:15px;background:#8B5CF6">SR</span>Sam Rivera <span class="ma" style="font-weight:500">· signer</span></div>');
    Kit.add(sOut, 'opacity', [[T + 3.05, 1], [T + 3.1, 0]]);
    Kit.add(sAll, 'opacity', [[T + 3.1, 0], [T + 3.2, 1]]); Kit.add(sAll, 'scale', [[T + 3.1, 0.8], [T + 3.32, 1, 'outBack']]);
    // phone in its browser
    var ph = mk(root, '<div class="phone" style="left:' + (d.w - 400 * 0.8 - 30) + 'px;top:-10px;transform-origin:0 0;transform:scale(.8)"><div class="scr"><div class="sb"><span>7:42</span><span>●●●</span></div><div class="pg-in"></div><div class="urlb"><svg width="14" height="16" viewBox="0 0 14 16"><rect x="1" y="7" width="12" height="8" rx="2" fill="#64748B"/><path d="M4 7V5a3 3 0 016 0v2" fill="none" stroke="#64748B" stroke-width="2"/></svg><i></i></div></div></div>');
    var pg = q(ph, '.pg-in');
    var form = mk(pg, '<div></div>');
    mk(form, '<div style="font:800 22px/1.2 Inter">Subcontract — Plasterboard &amp; ceilings (demo)</div><div class="sm" style="font-size:16px;margin-top:4px">12 pages · PDF</div>');
    var th = '<div style="display:flex;gap:6px;margin-top:12px">'; for (var i = 0; i < 6; i++) th += '<div style="width:44px;height:58px;border:1.5px solid #CBD5E1;border-radius:4px;background:#fff;padding:7px 6px"><div style="height:3px;background:#CBD5E1;margin-bottom:4px"></div><div style="height:3px;width:70%;background:#E2E8F0;margin-bottom:4px"></div><div style="height:3px;background:#E2E8F0"></div></div>'; form.insertAdjacentHTML('beforeend', th + '</div>');
    var agree = mk(form, '<div class="row" style="margin-top:16px;align-items:flex-start;gap:10px;font:600 16px/1.3 Inter"><span class="cb" style="width:26px;height:26px"><span class="tk" style="width:26px;height:26px">' + CHECK + '</span></span><span>I have read this agreement and I agree to sign it electronically.</span></div>');
    mk(form, '<div class="lbl" style="margin-top:16px;font-size:16px">Your full name</div>');
    var nm = mk(form, '<div class="fld" style="height:44px;font-size:19px"><span class="nmt">Sam Rivera</span></div>');
    mk(form, '<div class="lbl" style="margin-top:14px;font-size:16px">Your signature</div>');
    var pad = mk(form, '<div style="height:110px;border:2px solid #CBD5E1;border-radius:10px;background:#fff;position:relative"><svg width="300" height="100" viewBox="0 0 300 100" style="position:absolute;left:20px;top:6px"><path class="sig" d="M10 70 C 26 30, 40 22, 44 46 C 47 64, 30 80, 36 62 C 44 40, 62 34, 66 56 C 68 70, 74 72, 82 54 C 90 36, 96 40, 98 58 C 100 72, 108 70, 118 50 C 126 36, 134 44, 136 60 C 138 72, 150 66, 162 48 L 172 40 M 150 74 C 190 64, 230 60, 280 56" fill="none" stroke="#1E3A8A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>');
    var sb = mk(form, '<div class="btn" style="margin-top:16px;width:100%;justify-content:center;font-size:21px">Sign</div>');
    var done = mk(pg, '<div style="position:absolute;inset:0;padding:30px 22px;background:#F8FAFC"><div style="width:64px;height:64px;border-radius:50%;background:#16A34A;display:flex;align-items:center;justify-content:center;transform:scale(1.5);transform-origin:0 0">' + CHECK + '</div><div style="font:800 27px/1.25 Inter;margin-top:56px;white-space:normal">Signed. Download a copy below and keep it.</div><div class="btn ghost" style="margin-top:22px;font-size:19px">Download</div></div>');
    QSA.tick(q(agree, '.tk'), T + 0.6);
    var nmt = q(nm, '.nmt'); Kit.type(nmt, T + 0.85, T + 1.35);
    Kit.add(nm, 'borderColor', [[T + 0.8, '#CBD5E1'], [T + 0.85, '#16A34A'], [T + 1.45, '#16A34A'], [T + 1.5, '#CBD5E1']]);
    Kit.add(q(pad, '.sig'), 'trim', [[T + 1.5, 0], [T + 2.35, 1, 'inOut']]);
    QSA.press(sb, T + 2.55);
    Kit.add(done, 'opacity', [[T + 2.7, 0], [T + 2.82, 1]]); Kit.add(done, 'y', [[T + 2.7, 30], [T + 2.9, 0, 'out']]);
    // finger
    var fg = mk(ph, '<div style="position:absolute;left:0;top:0;width:46px;height:46px;border-radius:50%;background:rgba(15,23,42,.18);border:3px solid rgba(15,23,42,.35)"></div>');
    Kit.add(fg, 'opacity', [[T + 0.45, 0], [T + 0.55, 1], [T + 0.7, 0], [T + 1.5, 0, 'hold'], [T + 1.52, 1], [T + 2.35, 1], [T + 2.4, 0], [T + 2.5, 0, 'hold'], [T + 2.52, 1], [T + 2.65, 0]]);
    Kit.add(fg, 'x', [[T + 0.45, 18], [T + 1.5, 50, 'hold'], [T + 1.52, 50], [T + 2.35, 300], [T + 2.5, 170, 'hold']]);
    Kit.add(fg, 'y', [[T + 0.45, 268], [T + 1.5, 470, 'hold'], [T + 2.35, 450], [T + 2.5, 600, 'hold']]);
    return { el: root, key: 2.8 };
  };

  /* O · QR site sign-in poster + register (8.1), daily log (8.4). Phone browser; NZ footer never shown. */
  function qrSvg(n, seed) {
    var cells = '', s = 25, c = n / s;
    for (var y = 0; y < s; y++) for (var x = 0; x < s; x++) {
      var fin = (x < 7 && y < 7) || (x >= s - 7 && y < 7) || (x < 7 && y >= s - 7);
      if (fin) continue;
      if (QSA.hash(x * 31 + y, seed) > 0.52) cells += '<rect x="' + (x * c) + '" y="' + (y * c) + '" width="' + c + '" height="' + c + '"/>';
    }
    function finder(x, y) { return '<rect x="' + (x * c) + '" y="' + (y * c) + '" width="' + (7 * c) + '" height="' + (7 * c) + '"/><rect x="' + ((x + 1) * c) + '" y="' + ((y + 1) * c) + '" width="' + (5 * c) + '" height="' + (5 * c) + '" fill="#fff"/><rect x="' + ((x + 2) * c) + '" y="' + ((y + 2) * c) + '" width="' + (3 * c) + '" height="' + (3 * c) + '"/>'; }
    return '<svg width="' + n + '" height="' + n + '" viewBox="0 0 ' + n + ' ' + n + '" fill="#0F172A">' + cells + finder(0, 0) + finder(s - 7, 0) + finder(0, s - 7) + '</svg>';
  }
  QSA.qr = qrSvg;
  P.O = function (parent, T, o) {
    o = o || {}; var d = W0(o);
    var root = mk(parent, '<div style="position:absolute;left:' + (o.x || 0) + 'px;top:' + (o.y || 0) + 'px;width:' + d.w + 'px;height:' + d.h + 'px"></div>');
    // fence + poster (illustrative stand-in for the owner's hands-only take)
    var fence = mk(root, '<div style="position:absolute;left:0;top:20px;width:520px;height:600px;border-radius:18px;overflow:hidden;background:repeating-linear-gradient(90deg,#3B3326 0 86px,#2C261C 86px 92px);box-shadow:0 30px 80px rgba(0,0,0,.5)"></div>');
    var poster = mk(fence, '<div style="position:absolute;left:80px;top:46px;width:360px;height:500px;background:#FFFFFF;border-radius:10px;box-shadow:0 0 0 7px rgba(255,255,255,.35),0 18px 40px rgba(0,0,0,.45);padding:28px 28px;text-align:center;font-family:Inter;transform:rotate(-1.5deg)"></div>');
    mk(poster, '<div style="font:800 40px/1 Inter;color:#0F172A">Site sign-in</div><div style="font:600 17px/1.3 Inter;color:#64748B;margin-top:8px">Riverside Terraces (demo)</div><div style="margin:22px auto 0;width:250px;height:250px">' + qrSvg(250, 11) + '</div><div style="font:700 22px/1 var(--mono);letter-spacing:.08em;margin-top:20px;color:#0F172A">KQ7MD-4XRTP</div>');
    ['top:60px', 'top:470px'].forEach(function (tp) { mk(fence, '<div style="position:absolute;left:60px;' + tp + ';width:400px;height:9px;background:#111;border-radius:4px;opacity:.85"></div>'); });
    mk(fence, '<div class="ftag" style="left:16px;bottom:14px;font-size:15px">Illustrative poster · demo</div>');
    // phone browser
    var ph = mk(root, '<div class="phone" style="left:560px;top:-24px;transform-origin:0 0;transform:scale(.8)"><div class="scr"><div class="sb"><span>7:02</span><span>●●●</span></div><div class="pg-in"></div><div class="urlb"><svg width="14" height="16" viewBox="0 0 14 16"><rect x="1" y="7" width="12" height="8" rx="2" fill="#64748B"/><path d="M4 7V5a3 3 0 016 0v2" fill="none" stroke="#64748B" stroke-width="2"/></svg><i></i></div></div></div>');
    var pg = q(ph, '.pg-in');
    var f = mk(pg, '<div></div>');
    mk(f, '<div style="font:800 26px/1.1 Inter">Site sign-in</div><div class="sm" style="font-size:16px;margin-top:4px">Riverside Terraces (demo)</div>');
    mk(f, '<div class="lbl" style="margin-top:20px;font-size:17px">Who are you with?</div>');
    var co = mk(f, '<div class="fld" style="height:46px;font-size:19px"><span class="cot">Northside Linings</span></div>');
    mk(f, '<div style="font:700 18px/1.2 Inter;margin-top:20px">Tick every line to sign in.</div>');
    var ticks = [];
    ['Hard hat', 'Hi-vis', 'Safety boots', 'This week: open stairwell, level 1'].forEach(function (l, i) {
      var r = mk(f, '<div class="row" style="margin-top:10px;padding:12px 12px;border:2px solid #E2E8F0;border-radius:10px;background:#fff;font:600 17px/1.2 Inter;gap:10px;white-space:normal"><span class="cb" style="width:26px;height:26px"><span class="tk" style="width:26px;height:26px">' + CHECK + '</span></span>' + l + '</div>');
      ticks.push(q(r, '.tk'));
    });
    var sib = mk(f, '<div class="btn" style="margin-top:16px;width:100%;justify-content:center;font-size:21px">Sign in for today</div>');
    var ok = mk(pg, '<div style="position:absolute;inset:0;padding:40px 24px;background:#F0FDF4"><div style="width:64px;height:64px;border-radius:50%;background:#16A34A;display:flex;align-items:center;justify-content:center;transform:scale(1.5);transform-origin:0 0">' + CHECK + '</div><div style="font:800 30px/1.2 Inter;margin-top:60px;white-space:normal">You\'re signed in, Sam</div><div style="font:500 18px/1.4 Inter;color:#166534;margin-top:12px;white-space:normal">One sign-in covers this site for the day. It\'s on the record for the builder.</div></div>');
    Kit.type(q(co, '.cot'), T + 0.35, T + 0.8);
    ticks.forEach(function (tk, i) { QSA.tick(tk, T + 0.95 + i * 0.17); });
    QSA.press(sib, T + 1.75);
    Kit.add(ok, 'opacity', [[T + 1.85, 0], [T + 1.97, 1]]); Kit.add(ok, 'y', [[T + 1.85, 30], [T + 2.05, 0, 'out']]);
    // daily log card slides over the fence
    var log = mk(root, '<div class="bx" style="position:absolute;left:30px;top:250px;width:520px;padding:22px 24px;box-shadow:0 30px 70px rgba(0,0,0,.45)"></div>');
    mk(log, '<div class="row" style="justify-content:space-between"><div class="h2a" style="font-size:27px">Daily log</div><span class="sm" style="font-size:18px">Today</span></div>');
    var e1 = mk(log, '<div class="row" style="margin-top:16px;gap:14px;align-items:flex-start"><img src="' + (o.photo || 'clips/th5/f_00120.jpg') + '" style="width:120px;height:80px;object-fit:cover;border-radius:8px"><div><span class="pl pb" style="font-size:16px">Site photo</span><div style="font:600 18px/1.3 Inter;margin-top:8px;white-space:normal">Level 1 boards up, east side</div></div></div>');
    var e2 = mk(log, '<div class="row" style="margin-top:14px;gap:14px;align-items:flex-start"><img src="' + (o.photo2 || 'clips/th6/f_00030.jpg') + '" style="width:120px;height:80px;object-fit:cover;border-radius:8px"><div><span class="pl pg" style="font-size:16px">Proof of work</span><div style="font:600 18px/1.3 Inter;margin-top:8px;white-space:normal">From the project chat</div></div></div>');
    Kit.add(log, 'opacity', [[T + 2.55, 0], [T + 2.7, 1]]); Kit.add(log, 'y', [[T + 2.55, 60], [T + 2.85, 0, 'out']]);
    Kit.add(e2, 'opacity', [[T + 3.05, 0], [T + 3.2, 1]]);
    return { el: root, key: 2.0 };
  };

  /* P · Milestones (10.1): proof of work, 'paid outside QSME', confirmed by whoever got paid. A record, never a payment. */
  P.Pp = function (parent, T, o) {
    o = o || {}; var d = W0(o);
    var root = mk(parent, '<div style="position:absolute;left:' + (o.x || 0) + 'px;top:' + (o.y || 0) + 'px;width:' + d.w + 'px;height:' + d.h + 'px"></div>');
    var hw = (d.w - 30) / 2, hh = d.h - 64;
    var lw = mk(root, '<div style="position:absolute;inset:0"></div>'), rw = mk(root, '<div style="position:absolute;inset:0"></div>');
    var L = QSA.win(lw, { x: 0, y: 64, w: hw, h: hh }), R = QSA.win(rw, { x: hw + 30, y: 64, w: hw, h: hh });
    mk(lw, '<div class="chipk acc" style="position:absolute;left:0;top:6px">WHOEVER PAID</div>');
    mk(rw, '<div class="chipk acc" style="position:absolute;left:' + (hw + 30) + 'px;top:6px">WHOEVER GOT PAID</div>');
    if (o.push !== false) {
      rw.style.transformOrigin = d.w + 'px ' + Math.round(64 + hh * 0.2) + 'px';
      Kit.add(rw, 'scale', [[T + 1.8, 1], [T + 2.35, o.push || 1.25, 'inOut']]);
      Kit.add(R.el, 'height', [[T + 1.8, hh], [T + 2.35, 480, 'inOut']]);   // trims the empty lower half so the pushed-in window clears the caption
      Kit.add(lw, 'opacity', [[T + 1.8, 1], [T + 2.3, 0.4, 'inOut']]);
    }
    L.el.querySelector('.ill').textContent = 'Illustrative · demo data'; R.el.querySelector('.ill').textContent = 'Illustrative · demo data';
    function head(bb) { mk(bb, '<div style="position:absolute;left:24px;top:20px;right:24px"><div class="sm" style="font-size:16px;font-weight:700;letter-spacing:.06em">MILESTONE TIMELINE · PLASTERBOARD &amp; CEILINGS</div><div class="row" style="margin-top:10px;justify-content:space-between"><span class="h2a" style="font-size:25px">M1 · Mobilisation</span></div></div>'); }
    function status(bb, x) {   // Work submitted → Awaiting confirmation → Settled (truth sheet 10.1 status words)
      var a = mk(bb, '<span class="pl pb" style="position:absolute;right:24px;top:52px;font-size:17px">Work submitted</span>');
      var w2 = mk(bb, '<span class="pl pa" style="position:absolute;right:24px;top:52px;font-size:17px">Awaiting confirmation</span>');
      var s3 = mk(bb, '<span class="pl pg" style="position:absolute;right:24px;top:52px;font-size:17px">Settled</span>');
      Kit.add(a, 'opacity', [[T + 1.3, 1], [T + 1.35, 0]]); Kit.add(w2, 'opacity', [[T + 1.3, 0], [T + 1.35, 1], [T + 2.7, 1, 'hold'], [T + 2.75, 0]]); Kit.add(s3, 'opacity', [[T + 2.7, 0], [T + 2.75, 1]]);
    }
    // ---- payer
    var lb = L.body; head(lb); status(lb);
    mk(lb, '<div class="row" style="position:absolute;left:24px;top:104px;gap:10px"><span class="pl pg" style="font-size:16px">Proof of work</span><span class="sm" style="font-size:16px">photo + invoice from Bidder F</span></div>');
    var opt = mk(lb, '<div style="position:absolute;left:24px;right:24px;top:148px;padding:13px 16px;border:2px solid #16A34A;border-radius:12px;background:#F0FDF4"><div style="font:700 20px/1.2 Inter">I paid outside QSME</div><div class="sm" style="font-size:16px;margin-top:4px;white-space:normal">Only mark this as paid if you have actually sent the money.</div></div>');
    mk(lb, '<div class="lbl" style="position:absolute;left:24px;top:262px;font-size:17px">Payment reference</div>');
    var ref = mk(lb, '<div class="fld" style="position:absolute;left:24px;right:24px;top:290px;height:46px;font:500 20px/1 var(--mono)"><span class="rft">STG1-0417</span></div>');
    var sent = mk(lb, '<div class="row" style="position:absolute;left:24px;top:356px;font:600 18px/1 Inter;gap:10px"><span class="cb" style="width:26px;height:26px"><span class="tk" style="width:26px;height:26px">' + CHECK + '</span></span>I have sent the money.</div>');
    var mp = mk(lb, '<div class="btn" style="position:absolute;left:24px;right:24px;top:400px;justify-content:center;font-size:20px">Mark as paid</div>');
    var wait = mk(lb, '<div style="position:absolute;left:24px;right:24px;top:360px;font:500 17px/1.4 Inter;color:#475569;white-space:normal">Recorded as paid outside QSME. Waiting for Bidder F to confirm the money arrived.</div>');
    Kit.type(q(ref, '.rft'), T + 0.25, T + 0.65);
    QSA.tick(q(sent, '.tk'), T + 0.8);
    QSA.press(mp, T + 1.15); QSA.ringAt(lb, hw / 2, 424, T + 1.15);
    Kit.add(sent, 'opacity', [[T + 1.3, 1], [T + 1.4, 0]]); Kit.add(mp, 'opacity', [[T + 1.3, 1], [T + 1.4, 0]]);
    Kit.add(wait, 'opacity', [[T + 1.4, 0], [T + 1.55, 1], [T + 2.7, 1, 'hold'], [T + 2.75, 0]]);
    // ---- receiver
    var rb = R.body; head(rb); status(rb);
    var pre = mk(rb, '<div class="row" style="position:absolute;left:24px;top:104px;gap:10px"><span class="pl pg" style="font-size:16px">Proof of work</span><span class="pl pn" style="font-size:16px">Submit progress ✓</span><span class="pl pn" style="font-size:16px">Upload invoice ✓</span></div>');
    var conf = mk(rb, '<div style="position:absolute;left:0;right:0;top:96px;bottom:0"></div>');
    mk(conf, '<div class="h2a" style="position:absolute;left:24px;top:8px;font-size:22px">Confirm you received this payment</div>');
    mk(conf, '<div class="warnb" style="position:absolute;left:24px;right:24px;top:50px;padding:12px 16px;font:600 17px/1.35 Inter;white-space:normal">Only confirm if the money has arrived in your account.</div>');
    mk(conf, '<div class="sm" style="position:absolute;left:24px;top:122px;font-size:17px">Reference given: <b class="mono" style="color:#0F172A">STG1-0417</b></div>');
    var clr = mk(conf, '<div class="row" style="position:absolute;left:24px;top:166px;font:600 18px/1 Inter;gap:10px"><span class="cb" style="width:26px;height:26px"><span class="tk" style="width:26px;height:26px">' + CHECK + '</span></span>The money has cleared in my account.</div>');
    var cp = mk(conf, '<div class="btn" style="position:absolute;left:24px;right:24px;top:212px;justify-content:center;font-size:20px">Confirm payment received</div>');
    Kit.add(pre, 'opacity', [[T + 1.35, 1], [T + 1.45, 0]]);
    Kit.add(conf, 'opacity', [[T + 1.45, 0], [T + 1.6, 1], [T + 2.7, 1, 'hold'], [T + 2.8, 0]]); Kit.add(conf, 'y', [[T + 1.45, 20], [T + 1.65, 0, 'out']]);
    QSA.tick(q(clr, '.tk'), T + 1.9);
    QSA.press(cp, T + 2.3); QSA.ringAt(conf, hw / 2, 234, T + 2.3);
    [lb, rb].forEach(function (bb, i) {
      var st = mk(bb, '<div class="okb row" style="position:absolute;left:24px;right:24px;top:' + (i ? 110 : 360) + 'px;padding:14px 16px;font:700 19px/1.3 Inter;gap:12px;white-space:normal"><span class="cb" style="border:none;background:#16A34A;display:flex;align-items:center;justify-content:center;flex:none">' + CHECK + '</span>Settled outside QSME and confirmed by both sides.</div>');
      Kit.add(st, 'opacity', [[T + 2.78 + i * 0.06, 0], [T + 2.92 + i * 0.06, 1]]); Kit.add(st, 'y', [[T + 2.78 + i * 0.06, 16], [T + 2.98 + i * 0.06, 0, 'out']]);
    });
    return { el: root, key: 2.4 };
  };


  /* =====================================================================================
   * MOMENTS for the 4:5 and 9:16 cutdowns: ONE legible UI moment per letter, native 780 x 480,
   * same strings and demo data as the hero panels. (parent, T scene start, D scene length)
   * ===================================================================================== */
  var M = QSA.M = {};
  function mwin(parent, o) { var w = QSA.win(parent, { x: 0, y: 0, w: 780, h: 480 }); w.el.querySelector('.ill').textContent = QSA.ILL; return w; }
  M.D = function (parent, T, D) {
    var w = mwin(parent), b = w.body; b.style.padding = '0';
    mk(b, '<div class="h1a" style="position:absolute;left:30px;top:24px;font-size:32px">Plan index</div><div class="pl pg" style="position:absolute;left:222px;top:30px;font-size:20px">Read my plans</div>');
    var s1 = mk(b, '<div class="row" style="position:absolute;left:30px;top:92px;font:600 28px/1 Inter"><span style="width:16px;height:16px;border-radius:50%;background:#F59E0B;display:inline-block"></span>Finding the sections…</div>');
    var s2 = mk(b, '<div class="row" style="position:absolute;left:30px;top:84px;font:800 38px/1 Inter;color:#166534"><span class="cb" style="width:40px;height:40px;border:none;background:#16A34A;display:flex;align-items:center;justify-content:center">' + CHECK + '</span>4 of 11 sections ready</div>');
    var ch = [['Site plan', 'p.2'], ['Floor plans', 'p.4–7'], ['Elevations', 'p.8–11'], ['Drainage layout', 'p.22–24']];
    ch.forEach(function (c, i) {
      var x = 30 + (i % 2) * 366, y = 150 + Math.floor(i / 2) * 76;
      var e = mk(b, '<div class="chipa" style="position:absolute;left:' + x + 'px;top:' + y + 'px;width:350px;height:62px;justify-content:space-between;font-size:26px;border-color:#86EFAC;background:#F0FDF4">' + c[0] + '<span class="pp" style="font-size:23px">' + c[1] + '</span></div>');
      var tc = T + 0.05 + i * 0.12 * D / 1.4;
      Kit.add(e, 'opacity', [[tc, 0], [tc + 0.08, 1]]); Kit.add(e, 'scale', [[tc, 0.85], [tc + 0.2, 1, 'outBack']]);
    });
    for (var i = 0; i < 7; i++) mk(b, '<div style="position:absolute;left:' + (30 + i * 104) + 'px;top:310px;width:92px;height:46px;border-radius:9px;border:2px dashed #CBD5E1;background:#F8FAFC"></div>');
    var tr = mk(b, '<div style="position:absolute;left:30px;right:30px;top:382px;height:12px;border-radius:6px;background:#E2E8F0"><div style="position:absolute;left:0;top:0;height:12px;border-radius:6px;background:#16A34A;width:' + (720 * 4 / 11) + 'px"></div></div>');
    var tk = T + 0.55 * D;
    Kit.add(s1, 'opacity', [[tk - 0.02, 1], [tk, 0]]); Kit.add(s2, 'opacity', [[tk, 0], [tk + 0.06, 1]]); Kit.add(s2, 'scale', [[tk, 0.9], [tk + 0.2, 1, 'outBack']]);
    return w.el;
  };
  M.R = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    mk(b, '<div class="h1a" style="position:absolute;left:30px;top:22px;font-size:30px">SOQ <span class="ma" style="font-weight:600;font-size:24px">· Plasterboard &amp; ceilings</span></div>');
    var row = mk(b, '<div class="bx row" style="position:absolute;left:30px;right:30px;top:80px;height:76px;padding:0 22px;gap:18px;font:600 24px/1 Inter"><b style="flex:1">Ceilings</b><span class="ma" style="font-weight:500">380 m²</span><span class="fld on" style="height:46px;font:600 24px/1 var(--mono);padding:0 12px"><span class="ty">64.00</span></span><span class="tt" style="font:700 24px/1 var(--mono);width:96px;text-align:right">24,320</span></div>');
    Kit.type(q(row, '.ty'), T + 0.0, T + 0.25 * D);
    var ai = mk(b, '<div class="bx" style="position:absolute;left:30px;right:30px;top:180px;height:150px;border-color:#C4B5FD;background:#FAF8FF"></div>');
    mk(ai, '<div class="row" style="position:absolute;left:24px;top:22px"><span class="h2a" style="font-size:28px">Insulation</span><span class="pl pv" style="font-size:20px">AI draft</span></div>');
    mk(ai, '<div class="sm" style="position:absolute;left:24px;top:80px;font-size:21px">Ceiling insulation · 380 m²<br>Wall insulation · 640 m²</div>');
    var keep = mk(ai, '<div class="btn" style="position:absolute;right:24px;top:24px;font-size:24px;padding:14px 26px">Keep</div>');
    mk(ai, '<div class="btn ghost" style="position:absolute;right:24px;top:84px;font-size:20px;padding:9px 16px">Discard</div>');
    var tk = T + 0.5 * D;
    QSA.ringAt(ai, 680, 52, tk); QSA.press(keep, tk);
    Kit.add(ai, 'borderColor', [[tk, '#C4B5FD'], [tk + 0.1, '#86EFAC']]); Kit.add(ai, 'background', [[tk, '#FAF8FF'], [tk + 0.1, '#F7FEF9']]);
    var toast = mk(b, '<div class="toast" style="left:30px;right:30px;top:352px;font-size:23px;white-space:nowrap"><span class="ok">' + CHECK + '</span>Pocket kept — it\'s now part of your SOQ</div>');
    Kit.add(toast, 'opacity', [[tk + 0.08, 0], [tk + 0.2, 1]]); Kit.add(toast, 'y', [[tk + 0.08, 20], [tk + 0.3, 0, 'out']]);
    return w.el;
  };
  M.X = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    mk(b, '<div class="h2a" style="position:absolute;left:30px;top:22px;font-size:26px">Import a schedule from Excel or CSV</div>');
    var zone = mk(b, '<div style="position:absolute;left:30px;right:30px;top:76px;height:120px;border:3px dashed #16A34A;border-radius:14px;background:#F0FDF4"></div>');
    var chip = mk(b, '<div class="chipa" style="position:absolute;left:190px;top:106px;padding:14px 20px;font-size:25px;box-shadow:0 12px 26px rgba(15,23,42,.18)">' + XLS + 'qsme-example-soq.xlsx</div>');
    Kit.add(chip, 'y', [[T, -120], [T + 0.3 * D, 0, 'out']]); Kit.add(chip, 'rotate', [[T, -7], [T + 0.3 * D, 0, 'out']]);
    ['Foundations', 'Framing', 'Roofing'].forEach(function (n, i) { var r = mk(b, '<div class="bx row" style="position:absolute;left:30px;width:' + (i === 0 ? 236 : 220) + 'px;top:222px;height:62px;padding:0 16px;gap:10px;margin-left:' + (i * 244) + 'px;font:700 22px/1 Inter"><span>' + n + '</span><span class="pl pb" style="font-size:16px">Draft</span></div>'); Kit.add(r, 'opacity', [[T + 0.4 * D + i * 0.06, 0], [T + 0.48 * D + i * 0.06, 1]]); });
    var toast = mk(b, '<div class="toast" style="left:30px;right:30px;top:320px;font-size:24px"><span class="ok">' + CHECK + '</span>Imported 3 pockets and 11 lines as drafts</div>');
    Kit.add(toast, 'opacity', [[T + 0.42 * D, 0], [T + 0.5 * D, 1]]); Kit.add(toast, 'y', [[T + 0.42 * D, 20], [T + 0.6 * D, 0, 'out']]);
    return w.el;
  };
  M.G = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    mk(b, '<div class="h1a" style="position:absolute;left:28px;top:20px;font-size:28px">Schedule</div>');
    var tog = mk(b, '<div class="row" style="position:absolute;right:24px;top:18px;padding:9px 14px;border:2px solid #E2E8F0;border-radius:10px;background:#fff;font:600 21px/1 Inter;gap:10px"><span class="cb" style="width:26px;height:26px"><span class="tk" style="width:26px;height:26px;background:#7C3AED">' + CHECK + '</span></span>What drives the finish date</div>');
    var rows = [['Foundations', 0, 8, '3–12 Mar', 1], ['Drainage', 0, 5, '3–9 Mar', 0], ['Framing', 8, 10, '15–26 Mar', 1], ['Roofing', 18, 5, '29 Mar – 2 Apr', 1], ['Plasterboard &amp; ceilings', 23, 10, '5–16 Apr', 1]];
    var X0 = 300, DW = 9.5, on = [];
    rows.forEach(function (r, i) {
      var y = 84 + i * 66;
      mk(b, '<div style="position:absolute;left:28px;top:' + (y + 10) + 'px;font:600 21px/1 Inter;white-space:nowrap">' + r[0] + '</div>');
      var x0 = X0 + r[1] * DW, bw = r[2] * DW;
      mk(b, '<div style="position:absolute;left:' + x0 + 'px;top:' + (y + 4) + 'px;width:' + bw + 'px;height:32px;border-radius:7px;background:' + (r[4] ? '#2563EB' : '#94A3B8') + '"></div>');
      mk(b, '<div style="position:absolute;left:' + (x0 + bw + 10) + 'px;top:' + (y + 11) + 'px;font:600 18px/1 Inter;color:#334155;white-space:nowrap">' + r[3] + '</div>');
      if (r[4]) { var ring = mk(b, '<div style="position:absolute;left:' + (x0 - 5) + 'px;top:' + (y - 1) + 'px;width:' + (bw + 10) + 'px;height:42px;border-radius:10px;border:4px solid #7C3AED"></div>'); Kit.add(ring, 'opacity', [[T + 0.42 * D + i * 0.03, 0], [T + 0.5 * D + i * 0.03, 1]]); on.push([x0, x0 + bw, y + 20]); }
    });
    var svg = '<svg style="position:absolute;left:0;top:0;width:780px;height:440px;overflow:visible">';
    for (var k = 0; k + 1 < on.length; k++) svg += '<path d="M' + (on[k][1] + 2) + ' ' + on[k][2] + ' H' + (on[k][1] + 8) + ' V' + (on[k + 1][2] - 14) + ' H' + (on[k + 1][0] + 4) + '" fill="none" stroke="#7C3AED" stroke-width="5" stroke-linejoin="round"/>';
    var ar = mk(b, svg + '</svg>'); Kit.add(ar, 'opacity', [[T + 0.45 * D, 0], [T + 0.6 * D, 1]]);
    QSA.tick(q(tog, '.tk'), T + 0.32 * D); QSA.ringAt(b, 506, 38, T + 0.32 * D);
    return w.el;
  };
  M.T = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    mk(b, '<div class="h2a" style="position:absolute;left:28px;top:20px;font-size:25px">Create New Tender <span class="ma" style="font-weight:600">· Plasterboard &amp; ceilings</span></div>');
    var L = [['Boards supply &amp; fix', '22.50'], ['Ceilings', '64.00'], ['Jointing &amp; finishing', '1.80']];
    function col(x, own, tag, cls) {
      var c = mk(b, '<div class="bx" style="position:absolute;left:' + x + 'px;top:96px;width:350px;height:250px"></div>');
      mk(b, '<div class="chipk ' + cls + '" style="position:absolute;left:' + (x + 12) + 'px;top:74px;font-size:15px;padding:6px 12px">' + tag + '</div>');
      L.forEach(function (l, i) {
        var y = 30 + i * 70;
        mk(c, '<div style="position:absolute;left:18px;top:' + (y + 12) + 'px;font:700 21px/1 Inter;white-space:nowrap">' + l[0] + '</div>');
        if (own) mk(c, '<div style="position:absolute;right:14px;top:' + (y + 2) + 'px;width:96px;height:42px;border-radius:8px;background:#F0FDF4;color:#166534;font:700 22px/42px var(--mono);text-align:right;padding-right:10px">' + l[1] + '</div>');
        else { var e = mk(c, '<div style="position:absolute;right:14px;top:' + (y + 2) + 'px;width:96px;height:42px;border-radius:8px;border:3px dashed #CBD5E1"></div>'); Kit.add(e, 'borderColor', [[T + 0.35 * D + i * 0.05, '#CBD5E1'], [T + 0.45 * D + i * 0.05, '#F59E0B']]); }
        if (i < 2) mk(c, '<div style="position:absolute;left:12px;right:12px;top:' + (y + 56) + 'px;height:1px;background:#E2E8F0"></div>');
      });
    }
    col(28, true, 'YOUR LINES', ''); col(402, false, 'WHAT BIDDERS SEE', 'amb');
    var n = mk(b, '<div class="note" style="left:470px;top:360px;color:#B45309;font-size:32px;transform-origin:0 50%">rate: never shown</div>');
    Kit.add(n, 'opacity', [[T + 0.45 * D, 0], [T + 0.55 * D, 1]]); Kit.add(n, 'rotate', [[T + 0.45 * D, -8], [T + 0.65 * D, -3, 'out']]);
    return w.el;
  };
  M.B = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    mk(b, '<div class="h1a" style="position:absolute;left:28px;top:18px;font-size:28px">Compare bids</div>');
    QSA.BIDS.forEach(function (r, i) {
      var y = 70 + i * 60;
      var row = mk(b, '<div class="row" style="position:absolute;left:24px;right:24px;top:' + y + 'px;height:52px;padding:0 16px;border-radius:10px;background:#fff;border:2px solid #E2E8F0;font:600 23px/1 Inter;gap:12px;white-space:nowrap">' + r[1] + (r[3] === 'mail' ? '<span class="row" style="gap:6px">' + MAIL + '<span class="pl pn" style="font-size:16px;padding:4px 10px">Received by you</span></span>' : '') + (r[3] === 'low' ? '<span class="pl pg lowtag" style="font-size:28px;padding:5px 14px">Lowest</span>' : '') + '<span style="margin-left:auto;font:700 25px/1 var(--mono)">' + r[2] + '</span></div>');
      if (r[3] === 'low') { Kit.add(row, 'background', [[T + 0.35 * D, '#FFFFFF'], [T + 0.45 * D, '#DCFCE7']]); Kit.add(row, 'borderColor', [[T + 0.35 * D, '#E2E8F0'], [T + 0.45 * D, '#86EFAC']]); var lt = q(row, '.lowtag'); Kit.add(lt, 'opacity', [[T + 0.38 * D, 0], [T + 0.45 * D, 1]]); Kit.add(lt, 'scale', [[T + 0.38 * D, 0.6], [T + 0.55 * D, 1, 'outBack']]); }
    });
    return w.el;
  };
  M.A = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    var dl = mk(b, '<div style="position:absolute;inset:0;padding:28px 32px"></div>');
    mk(dl, '<div class="h2a" style="font-size:32px">Award this bid?</div><div style="font:500 25px/1.42 Inter;color:#334155;margin-top:14px;white-space:normal">This awards the work to <b>Bidder F</b> for <b class="mono">71,300</b>, creates the payment contract, and notifies all bidders. It can\'t be undone from here.</div>');
    var ab = mk(dl, '<div class="btn" style="position:absolute;right:32px;bottom:26px;font-size:34px;padding:16px 30px">Award bid</div>');
    mk(dl, '<div class="btn ghost" style="position:absolute;right:304px;bottom:30px;font-size:24px;padding:15px 22px">Cancel</div>');
    var tk = T + 0.62 * D;
    QSA.press(ab, tk); QSA.ringAt(dl, 628, 372, tk);
    var aw = mk(b, '<div style="position:absolute;inset:0;padding:26px 32px;background:#F4F6F5"></div>');
    mk(aw, '<div class="row" style="justify-content:space-between"><div class="h1a" style="font-size:30px">Active Work</div><span class="pl pg" style="font-size:20px">Active</span></div><div class="sm" style="font-size:22px;margin-top:8px">Plasterboard &amp; ceilings · Bidder F</div>');
    mk(aw, '<div style="display:flex;gap:14px;margin-top:22px"><div class="bx" style="flex:1;padding:16px"><div class="sm" style="font-size:18px">Contract value</div><div style="font:700 30px/1.1 var(--mono);margin-top:8px">71,300</div></div><div class="bx" style="flex:1;padding:16px"><div class="sm" style="font-size:18px">Milestones</div><div style="font:700 30px/1.1 var(--mono);margin-top:8px;white-space:nowrap">0 / 3 confirmed</div></div></div>');
    mk(aw, '<div class="row" style="margin-top:20px;padding:16px 18px;border-radius:12px;background:#F0FDF4;border:2px solid #BBF7D0;font:700 24px/1 Inter;color:#166534"><span style="width:14px;height:14px;border-radius:50%;background:#16A34A"></span>Stage 1 of 3 — Mobilisation</div>');
    Kit.add(aw, 'opacity', [[tk + 0.12, 0], [tk + 0.24, 1]]); Kit.add(aw, 'y', [[tk + 0.12, 24], [tk + 0.32, 0, 'out']]);
    return w.el;
  };
  M.O = function (parent, T, D) {
    var w = mwin(parent), b = w.body; b.style.background = 'repeating-linear-gradient(90deg,#3B3326 0 70px,#2C261C 70px 76px)';
    mk(b, '<div style="position:absolute;left:34px;top:26px;width:290px;height:384px;background:#fff;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.3),0 14px 30px rgba(0,0,0,.45);text-align:center;padding:22px 18px;transform:rotate(-1.5deg)"><div style="font:800 32px/1 Inter;color:#0F172A">Site sign-in</div><div style="font:600 15px/1.3 Inter;color:#64748B;margin-top:6px">Riverside Terraces (demo)</div><div style="margin:16px auto 0;width:200px;height:200px">' + QSA.qr(200, 11) + '</div><div style="font:700 19px/1 var(--mono);margin-top:16px;color:#0F172A">KQ7MD-4XRTP</div></div>');
    var ph = mk(b, '<div style="position:absolute;left:356px;top:14px;width:396px;height:408px;border-radius:34px;background:#0A0F0D;padding:9px;box-shadow:0 20px 50px rgba(0,0,0,.5)"><div class="scr2" style="position:relative;width:100%;height:100%;border-radius:26px;overflow:hidden;background:#F8FAFC;color:#0F172A"></div></div>');
    var sc = q(ph, '.scr2');
    mk(sc, '<div style="position:absolute;left:14px;right:14px;bottom:10px;height:30px;border-radius:10px;background:#E2E8F0;display:flex;align-items:center;justify-content:center"><i style="display:block;width:120px;height:8px;border-radius:4px;background:#94A3B8"></i></div>');
    var f = mk(sc, '<div style="position:absolute;left:20px;right:20px;top:18px"><div style="font:700 22px/1.25 Inter">Tick every line to sign in.</div></div>');
    ['Hard hat', 'Hi-vis', 'Safety boots'].forEach(function (l) { var r = mk(f, '<div class="row" style="margin-top:10px;padding:11px 12px;border:2px solid #E2E8F0;border-radius:12px;background:#fff;font:600 21px/1 Inter;gap:12px"><span class="cb" style="width:28px;height:28px"><span class="tk" style="width:28px;height:28px">' + CHECK + '</span></span>' + l + '</div>'); q(r, '.tk').style.opacity = 1; });
    var sib = mk(f, '<div class="btn" style="margin-top:16px;width:100%;justify-content:center;font-size:24px;padding:16px">Sign in for today</div>');
    var ok = mk(sc, '<div style="position:absolute;inset:0;padding:42px 26px;background:#F0FDF4"><div style="width:60px;height:60px;border-radius:50%;background:#16A34A;display:flex;align-items:center;justify-content:center;transform:scale(1.5);transform-origin:0 0">' + CHECK + '</div><div style="font:800 40px/1.12 Inter;margin-top:62px;white-space:normal;color:#0F172A">You\'re signed in, Sam</div></div>');
    var tk = T + 0.38 * D; QSA.press(sib, tk); QSA.ringAt(sc, 178, 300, tk);
    Kit.add(ok, 'opacity', [[tk + 0.1, 0], [tk + 0.18, 1]]); Kit.add(ok, 'y', [[tk + 0.1, 24], [tk + 0.28, 0, 'out']]);
    return w.el;
  };
  M.P = function (parent, T, D) {
    var w = mwin(parent), b = w.body;
    mk(b, '<div class="chipk acc" style="position:absolute;left:28px;top:18px;font-size:16px;padding:6px 12px">WHOEVER GOT PAID</div>');
    mk(b, '<div class="h2a" style="position:absolute;left:28px;top:62px;font-size:28px">Confirm you received this payment</div>');
    mk(b, '<div class="warnb" style="position:absolute;left:28px;right:28px;top:110px;padding:14px 18px;font:600 21px/1.35 Inter">Only confirm if the money has arrived in your account.</div>');
    var clr = mk(b, '<div class="row" style="position:absolute;left:28px;top:186px;font:600 23px/1 Inter;gap:12px"><span class="cb" style="width:30px;height:30px"><span class="tk" style="width:30px;height:30px">' + CHECK + '</span></span>The money has cleared in my account.</div>');
    var cp = mk(b, '<div class="btn" style="position:absolute;left:28px;right:28px;top:234px;justify-content:center;font-size:33px;padding:14px">Confirm payment received</div>');
    var st = mk(b, '<div class="okb row" style="position:absolute;left:28px;right:28px;top:318px;padding:16px 18px;font:700 23px/1.3 Inter;gap:12px;white-space:normal"><span class="cb" style="width:30px;height:30px;border:none;background:#16A34A;display:flex;align-items:center;justify-content:center;flex:none">' + CHECK + '</span>Settled outside QSME and confirmed by both sides.</div>');
    QSA.tick(q(clr, '.tk'), T + 0.15 * D);
    var tk = T + 0.42 * D; QSA.press(cp, tk); QSA.ringAt(b, 390, 268, tk);
    Kit.add(st, 'opacity', [[tk + 0.12, 0], [tk + 0.24, 1]]); Kit.add(st, 'y', [[tk + 0.12, 18], [tk + 0.32, 0, 'out']]);
    return w.el;
  };

  window.QSA = QSA;
})();
