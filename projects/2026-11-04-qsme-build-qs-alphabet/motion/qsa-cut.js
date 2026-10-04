/* The QS Alphabet: the nine-letter block shared by the 4:5 and 9:16 cutdowns.
 * One UI moment per letter (QSA.M), giant letter + eyebrow + a descriptor line, VO captions word for word.
 * A is 7th here as in the hero (same shuffle). I is not voiced in the cutdowns: its tile lights with O so the strip stays in order.
 * split: [t, html] shows a shorter caption until local time t, so the caption never reads a punchline before it lands
 *   (X: 'close enough' with its scrawl; A: 'finally' with the stamp). note: an annotation OUTSIDE the app window (B's tax basis).
 */
(function () {
  'use strict';
  var mk = QSA.mk;
  QSA.CUT = [
    { L: 'D', eb: 'Drawings', desc: 'The whole set, split into sections.', cap: '<b>D,</b> drawings.' },
    { L: 'R', eb: 'Estimating &amp; quantities', desc: 'Your rates, one schedule. AI drafts. You check.', cap: '<b>R,</b> rates.' },
    { L: 'X', eb: 'Excel in, Excel out', desc: 'In, and back out.', cap: '<b>X,</b> Excel. Close enough.', aside: '(close enough)', split: [0.5, '<b>X,</b> Excel.'] },
    { L: 'G', eb: 'Planning', desc: 'Your priced jobs, no retyping.', cap: '<b>G,</b> Gantt.' },
    { L: 'T', eb: 'Tendering', desc: 'Same lines, every bidder. Your rates stay home.', cap: '<b>T,</b> tender.' },
    { L: 'B', eb: 'Tendering', desc: 'One table, even the emailed one. You choose.', cap: '<b>B,</b> bids.', note: 'All totals excl. tax' },
    { L: 'A', eb: 'Award &amp; contract', desc: 'And it’s a contract.', cap: '<b>A…</b> finally. Award.', stamp: 'Finally.', split: [0.5, '<b>A…</b>'] },
    { L: 'O', eb: 'Work on site', desc: 'One QR poster. One daily log.', cap: '<b>O,</b> on site.' },
    { L: 'P', eb: 'Deliverables &amp; payments', desc: 'Your usual way, confirmed by whoever got paid.', cap: '<b>P,</b> paid.' }
  ];
  QSA.CUTDUR = [1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.6, 1.3, 1.3];
  var ORDN = { D: '1st', R: '2nd', X: '3rd', G: '4th', T: '5th', B: '6th', A: '7th', I: '8th', O: '9th', P: '10th' };

  /* cfg: { root, L0, dock:{x,y,s}, eye:{x,y,fs}, giant:{x,y,fs}, desc:{x,y,w,fs}, mom:{x,y,s}, note:{right,y,fs}, cap(t0,t1,html,o), zAt } */
  QSA.cutLetters = function (cfg) {
    var root = cfg.root, starts = [], t = cfg.L0;
    QSA.CUTDUR.forEach(function (d) { starts.push(t); t += d; });
    var lightAt = {}; QSA.CUT.forEach(function (c, k) { lightAt[c.L] = starts[k]; }); lightAt.I = lightAt.O;
    // docked strip, single row
    var dockHost = mk(root, '<div class="fill"></div>');
    Kit.scene(dockHost, cfg.L0 - 0.4, cfg.zAt + 1.0);
    var B = QSA.strip(dockHost, { bigNums: true }); var sb = B.el;
    sb.style.transformOrigin = '0 0'; sb.style.left = cfg.dock.x + 'px'; sb.style.top = cfg.dock.y + 'px';
    Kit.add(sb, 'scale', [[0, cfg.dock.s]]);
    Kit.add(sb, 'opacity', [[cfg.L0 - 0.4, 0], [cfg.L0 - 0.1, 1], [cfg.zAt + 0.8, 1], [cfg.zAt + 1.0, 0]]);
    Kit.add(sb, 'y', [[cfg.L0 - 0.4, -20], [cfg.L0 - 0.05, 0, 'out']]);
    QSA.LETTERS.forEach(function (L, i) {
      var tl = B.tiles[L], k = QSA.ORDER.indexOf(L);
      if (k >= 0) {
        var tv = lightAt[L];
        Kit.add(tl, 'background', [[0, '#10240F'], [tv, '#3DC023', 'hold']]);
        Kit.add(tl, 'borderColor', [[0, '#2C5B22'], [tv, '#3DC023', 'hold']]);
        Kit.add(tl, 'color', [[0, '#4C8A3E'], [tv, '#06130A', 'hold']]);
        Kit.add(tl, 'scaleY', [[tv, 1], [tv + 0.06, 0.15, 'in'], [tv + 0.14, 1, 'out']]);
        Kit.add(B.nums[L], 'color', [[0, '#4C8A3E'], [tv, '#4BCD32', 'hold']]);
      } else if (L === 'Q' || L === 'S') {
        Kit.add(tl, 'color', [[0, '#4BCD32']]); Kit.add(tl, 'borderColor', [[0, '#3DC023']]); Kit.add(tl, 'background', [[0, '#0C1310']]);
      } else {
        Kit.add(tl, 'color', [[0, '#33433A'], [cfg.zAt, '#06130A', 'hold']]); Kit.add(tl, 'background', [[0, '#121C17'], [cfg.zAt, '#3DC023', 'hold']]); Kit.add(tl, 'borderColor', [[0, '#18241D'], [cfg.zAt, '#3DC023', 'hold']]);
        Kit.add(tl, 'scaleY', [[cfg.zAt + i * 0.01, 1], [cfg.zAt + 0.06 + i * 0.01, 0.15, 'in'], [cfg.zAt + 0.14 + i * 0.01, 1, 'out']]);
      }
    });
    // "you are here"
    var here = mk(dockHost, '<div class="here"></div>');
    Kit.each(function (tt) {
      var k = -1; for (var j = 0; j < starts.length; j++) if (tt >= starts[j]) k = j;
      if (k < 0 || tt >= cfg.zAt) { here.style.opacity = 0; return; }
      var L = QSA.CUT[k].L;
      here.style.opacity = 1; here.style.left = (cfg.dock.x + QSA.LETTERS.indexOf(L) * 64 * cfg.dock.s) + 'px';
      here.style.width = (56 * cfg.dock.s) + 'px'; here.style.top = (cfg.dock.y + 130 * cfg.dock.s + 4) + 'px';   // under the (bigger) order number
    });
    // scenes
    QSA.CUT.forEach(function (c, k) {
      var T0 = starts[k], D = QSA.CUTDUR[k], T1 = T0 + D;
      var sc = mk(root, '<div class="fill"></div>'); Kit.scene(sc, T0, T1);
      var eb = mk(sc, '<div class="kick" style="position:absolute;left:' + cfg.eye.x + 'px;top:' + cfg.eye.y + 'px;font-size:' + cfg.eye.fs + 'px"><b>' + ORDN[c.L] + '</b> · ' + c.eb + '</div>');
      var gl = mk(sc, '<div class="giant" style="left:' + cfg.giant.x + 'px;top:' + cfg.giant.y + 'px;font-size:' + cfg.giant.fs + 'px">' + c.L + '</div>');
      var ds = mk(sc, '<div class="disp" style="position:absolute;left:' + cfg.desc.x + 'px;top:' + cfg.desc.y + 'px;width:' + cfg.desc.w + 'px;font-size:' + cfg.desc.fs + 'px;line-height:1.08;text-wrap:balance">' + c.desc + '</div>');
      // split-flap: the outgoing letter folds shut on the cut, the incoming one opens; no blank frame between letters
      Kit.add(gl, 'scaleY', [[T0, 0.3], [T0 + 0.1, 1, 'out'], [T1 - 0.08, 1], [T1, 0.3, 'in']]);
      Kit.add(eb, 'opacity', [[T0, 0.4], [T0 + 0.08, 1]]);
      Kit.add(ds, 'opacity', [[T0 + 0.03, 0], [T0 + 0.15, 1]]); Kit.add(ds, 'y', [[T0 + 0.03, 16], [T0 + 0.24, 0, 'out']]);
      if (c.aside) { var as = mk(sc, '<div class="aside" style="left:' + cfg.aside.x + 'px;top:' + cfg.aside.y + 'px;font-size:' + cfg.aside.fs + 'px;transform-origin:0 50%">' + c.aside + '</div>'); Kit.add(as, 'opacity', [[T0 + 0.5, 0], [T0 + 0.58, 1]]); Kit.add(as, 'rotate', [[T0 + 0.5, -14], [T0 + 0.7, -7, 'out']]); Kit.add(as, 'scale', [[T0 + 0.5, 0.7], [T0 + 0.7, 1, 'outBack']]); }
      if (c.stamp) {
        var seven = mk(sc, '<div class="disp" style="position:absolute;left:' + cfg.seven.x + 'px;top:' + cfg.seven.y + 'px;font-size:' + cfg.seven.fs + 'px;color:var(--ink);white-space:nowrap">7<span style="font-size:' + Math.round(cfg.seven.fs * 0.5) + 'px;vertical-align:top;line-height:1.4">th</span></div>');
        Kit.add(seven, 'opacity', [[T0 + 0.1, 0], [T0 + 0.18, 1]]); Kit.add(seven, 'scale', [[T0 + 0.1, 0.4], [T0 + 0.35, 1, 'outBack']]);
        var st = mk(sc, '<div class="stamp" style="left:' + cfg.stamp.x + 'px;top:' + cfg.stamp.y + 'px;font-size:' + cfg.stamp.fs + 'px">' + c.stamp + '</div>');
        Kit.slam(st, T0 + 0.5, { from: 1.6, dur: 0.12 }); Kit.add(st, 'rotate', [[T0 + 0.5, -12], [T0 + 0.62, -6, 'slam']]);
        Kit.add(ds, 'opacity', [[T0 + 0.9, 0], [T0 + 1.05, 1]]);
      }
      if (c.note) { var nt = mk(sc, '<div class="chipk amb" style="position:absolute;right:' + cfg.note.right + 'px;top:' + cfg.note.y + 'px;font-size:' + cfg.note.fs + 'px">' + c.note + '</div>'); Kit.add(nt, 'opacity', [[T0 + 0.15, 0], [T0 + 0.3, 1]]); }
      var host = mk(sc, '<div class="abs" style="left:' + cfg.mom.x + 'px;top:' + cfg.mom.y + 'px;width:780px;height:480px;transform-origin:0 0"></div>');
      QSA.M[c.L](host, T0, D);
      Kit.add(host, 'opacity', [[T0, 0.35], [T0 + 0.08, 1]]);
      Kit.add(host, 'x', [[T0, 60], [T0 + 0.22, 0, 'out'], [T1 - 0.1, 0], [T1, -24, 'in']]);
      Kit.add(host, 'scale', [[T0, cfg.mom.s * 0.985], [T1, cfg.mom.s * 1.01]]);
      if (c.split) { cfg.cap(T0 + 0.03, T0 + c.split[0], c.split[1], { hardOut: true }); cfg.cap(T0 + c.split[0], T1 - 0.04, c.cap, { hardIn: true }); }
      else cfg.cap(T0 + 0.03, T1 - 0.04, c.cap);
    });
    return { starts: starts, end: t, strip: B };
  };
})();
