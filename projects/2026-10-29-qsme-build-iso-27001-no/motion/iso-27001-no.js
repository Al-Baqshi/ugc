/* "Is QSME ISO 27001 certified? No." — shared timeline for the 4:5 and 9:16 pages.
 * Each page sets window.CFG (window geometry + where the camera sits on the page per beat) and loads boxes.js.
 * Every page shot is a real still/screencast of the PUBLIC page qsme.build/security (grabbed 4 Oct 2026 with
 * motion/still.mjs and tools/motion/capture.mjs). Camera moves, underlines, tints, dims and the masked SOC 2 answers
 * are editorial; no product UI is invented. All times are seconds on the 30.0 s master.
 *
 * Rev 2 (review fixes, 4 Oct): hook card 3.0 s with big Y/N boxes and an N tick at 2.78; the flying "No." now lands
 * on the page's own "No." (baseline + cap height from the 4x still) and crossfades into it; the backups and roles
 * cards never sit under a caption (the whip leaves before them, then a hard cut from the TLS card to the bidder
 * rule); "Here's what is in place." is gone before the scroll to PROGRAMME starts; the badges setup is 0.8 s; the
 * page's CTA band (and its "Talk to sales" button) is dropped; the end card is a bookend to the questionnaire row. */
(function () {
  var G = window.CFG, B = window.BOX, F = B.full, L = B.lang, T = G.T;
  var K = G.WW / 390;                              // CSS px of the 390-wide mobile page -> window px
  var WX = G.WX, WY = G.WY;
  var SEG = { faq: 2930, inp: 510 };               // document y (CSS px) where each still segment starts
  var $ = function (id) { return document.getElementById(id); };
  var lay = { faq: $('layFaq'), inp: $('layIn') };
  function ly(top, seg) { return -(top - SEG[seg]) * K; }      // layer y for a window whose top sits at document y `top`
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  // ---------- master clock ----------
  var CUT = 3.0, TICK = 2.78;                      // hook card → hard cut to "No."
  var FLY = 4.6, FLYD = 0.38, XF = 4.93;           // the flight into the page's "No." and the crossfade
  var FL0 = 5.55, FLd = 0.25;                      // language flick
  var QUOTE = 20.03, END = 23.9;

  // window geometry
  var win = $('win');
  win.style.left = WX + 'px'; win.style.top = WY + 'px'; win.style.width = G.WW + 'px'; win.style.height = G.WH + 'px';
  Array.prototype.forEach.call(document.querySelectorAll('#win .lay, #win .lay > img.pg'), function (e) { e.style.width = G.WW + 'px'; });
  $('whip').style.width = G.WW + 'px'; $('whip').style.height = G.whipH + 'px';   // the screencast keeps its own aspect; the window clips it
  $('hdr').style.width = G.WW + 'px'; $('hdr').style.height = (65 * K) + 'px';
  $('whip').setAttribute('src', G.whipDir + '/f_' + String(G.whipFrom).padStart(5, '0') + '.jpg');

  // ---------- overlays drawn in page coordinates inside a layer ----------
  function mk(parent, cls, x, y, w, h) { var d = document.createElement('div'); d.className = cls; d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.width = w + 'px'; if (h != null) d.style.height = h + 'px'; parent.appendChild(d); return d; }
  function rects(r) { return Array.isArray(r[0]) ? r : [r]; }
  function underline(parent, seg, rs, t0, t1, tOut) {           // marker underline swept across the lines, left to right
    rs = rects(rs); var tot = rs.reduce(function (a, r) { return a + r[2]; }, 0), acc = 0, oy = seg ? SEG[seg] : 0;
    rs.forEach(function (r) {
      var u = mk(parent, 'ul', r[0] * K - 3, (r[1] + r[3] - oy) * K + 1, r[2] * K + 6);
      var a = t0 + (t1 - t0) * acc / tot; acc += r[2]; var b = t0 + (t1 - t0) * acc / tot;
      Kit.add(u, 'scaleX', [[a, 0], [b, 1, 'out']]);
      Kit.add(u, 'opacity', [[a - 0.01, 0], [a, 1, 'hold']]);
      if (tOut != null) Kit.out(u, tOut, 0.2);
    });
  }
  function tint(parent, seg, rs, t0, tOut, pad) {
    pad = pad || 4; var oy = seg ? SEG[seg] : 0;
    rects(rs).forEach(function (r) { var d = mk(parent, 'tint', r[0] * K - pad - 2, (r[1] - oy) * K - pad, r[2] * K + 2 * pad + 4, r[3] * K + 2 * pad); Kit.fade(d, t0, t0 + 0.18); if (tOut != null) Kit.out(d, tOut, 0.2); });
  }
  function dim(parent, seg, rs, t0, t1, a, color) {
    var oy = seg ? SEG[seg] : 0;
    rects(rs).forEach(function (r) { var d = mk(parent, 'dimr', r[0] * K - 4, (r[1] - oy) * K - 4, r[2] * K + 10, r[3] * K + 8); if (color) d.style.background = color;
      var k = [[t0, 0], [t0 + 0.2, a, 'out']]; if (t1 != null) k.push([t1, a], [t1 + 0.2, 0, 'in']); Kit.add(d, 'opacity', k); });
  }

  // ---------- scenes ----------
  // the questionnaire row is the hook (0–3.0) and comes back as the end card (23.9–30): a bookend
  Kit.each(function (t) { $('sQ').style.display = (t < CUT || t >= END) ? '' : 'none'; });
  Kit.scene('#bigNo', CUT, XF + 0.12).scene('#bigSrc', CUT, FLY + 0.15);
  Kit.scene('#url', FLY, QUOTE).scene('#asof', FLY, QUOTE);
  Kit.scene('#sF', QUOTE, END);
  Kit.scene('#end', END, 30.01);
  // the page fades in around the flying word: 30% at most until the word has cleared the question line
  Kit.add('#win', 'opacity', [[4.7, 0], [4.85, 0.3, 'out'], [XF, 0.3], [XF + 0.1, 1, 'out']]);
  Kit.each(function (t) { win.style.display = (t >= FLY && t < QUOTE) ? '' : 'none'; });
  Kit.scene('#layFaq', FLY, 10.1).scene('#layIn', 10.15, QUOTE);

  // ---------- A · 0–3.0 the questionnaire row (frame 1 = the hook and the thumbnail: nothing ticked yet) ----------
  Kit.add('#qText', 'y', [[0, 0], [CUT, -10], [END, -10, 'hold'], [30, -16]]);
  Kit.add('#qKick', 'y', [[0, 0], [CUT, -6], [END, -6, 'hold'], [30, -10]]);
  // N gets ticked in brand green in 4 frames right before the hard cut, so the giant "No." reads as the answer to the form
  Kit.add('#qTickP', 'trim', [[TICK, 0], [TICK + 0.12, 1, 'out']]);
  Kit.add('#qN', 'borderColor', [[TICK, '#5B7666'], [TICK + 0.08, '#3DC023', 'out']]);
  Kit.add('#qNfill', 'opacity', [[TICK, 0], [TICK + 0.08, 1, 'out']]);
  Kit.add('#qYlab', 'color', [[TICK, '#EEF4EF'], [TICK + 0.12, '#86958B', 'out']]);

  // ---------- B · 3.0–4.6 "No." held in silence, then it flies onto the page's own "No." ----------
  var bigNo = $('bigNo'), M = null;
  var hook = T.hook;   // window top (document y) for the FAQ framing; the language stills were grabbed at 2920
  // the page's "No." measured on the 4x still (clips/seg-faq.png): N ink from x 17.0, cap top 3135.25, baseline 3147.0 (CSS px)
  var tgt = { x: WX + 17.0 * K, y: WY + (3147.0 - hook) * K, cap: 11.75 * K };
  Kit.fade('#bigSrc', 3.55, 3.8); Kit.out('#bigSrc', FLY, 0.15);
  Kit.each(function (t) {
    if (t < CUT || t >= XF + 0.12) return;
    if (!M) {
      bigNo.style.transform = 'none'; bigNo.style.left = '0px'; bigNo.style.top = '0px';
      var R = $('root').getBoundingClientRect(), r = document.createRange(); r.selectNodeContents(bigNo);
      var b = r.getBoundingClientRect(), bl = $('noBl').getBoundingClientRect(), cs = getComputedStyle(bigNo);
      var cx = document.createElement('canvas').getContext('2d'); cx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      var mN = cx.measureText('N');
      M = { x: b.left - R.left, y: b.top - R.top, w: b.width, h: b.height, base: bl.top - R.top, inkL: -mN.actualBoundingBoxLeft, cap: mN.actualBoundingBoxAscent };
    }
    var hold = clamp01((t - CUT) / 1.6), s0 = 1.02 - 0.02 * hold;      // a tiny settle while it holds
    var tx0 = 540 - s0 * (M.x + M.w / 2), ty0 = G.noY - s0 * (M.y + M.h / 2);
    var ax0 = tx0 + s0 * (M.x + M.inkL), ay0 = ty0 + s0 * M.base;      // anchor = the N's ink left edge on the baseline
    var s1 = tgt.cap / M.cap;
    var p = Kit.ease.swipe(clamp01((t - FLY) / FLYD));
    var s = Math.exp(Math.log(s0) * (1 - p) + Math.log(s1) * p);
    var ax = ax0 + (tgt.x - ax0) * p, ay = ay0 + (tgt.y - ay0) * p;
    bigNo.style.transform = 'translate(' + (ax - s * (M.x + M.inkL)) + 'px,' + (ay - s * M.base) + 'px) scale(' + s + ')';
    bigNo.style.opacity = t < XF ? 1 : Math.max(0, 1 - (t - XF) / 0.1);   // 3-frame crossfade into the page's own word
  });

  // ---------- C · 4.6–10.0 the FAQ on the real page ----------
  var TF = [[FLY, hook], [7.1, hook], [7.55, T.soc, 'inOut'], [10.1, T.soc]];
  Kit.add('#layFaq', 'y', TF.map(function (k) { return [k[0], ly(k[1], 'faq'), k[2]]; }));
  // the page's own "No." stays hidden under the flight (no double word), then the two swap in a 3-frame crossfade
  var noMask = mk(lay.faq, 'dimr', F.isoNo[0][0] * K - 4, (F.isoNo[0][1] - SEG.faq) * K - 2, F.isoNo[0][2] * K + 8, F.isoNo[0][3] * K + 4);
  Kit.add(noMask, 'opacity', [[XF, 1], [XF + 0.1, 0]]);
  tint(lay.faq, 'faq', F.isoNo, XF, 7.1, 6);
  underline(lay.faq, 'faq', F.isoNo, XF + 0.05, XF + 0.25, 7.1);
  // the SOC 2 answer waits for its own beat: masked until 7.85, then wiped open left to right
  var socDd = F.faqDds[1];
  var mask = mk(lay.faq, 'dimr', socDd[0] * K - 6, (socDd[1] - SEG.faq) * K - 4, socDd[2] * K + 12, socDd[3] * K + 10);
  mask.style.transformOrigin = '100% 50%';
  Kit.add(mask, 'scaleX', [[7.85, 1], [8.07, 0, 'out']]);
  dim(lay.faq, 'faq', F.faqItems[1], FLY, 7.05, 0.55);                // SOC 2 row quiet during the hook
  underline(lay.faq, 'faq', F.socNo, 7.95, 8.25, 9.85);
  tint(lay.faq, 'faq', F.socNo, 7.95, 9.85, 6);
  dim(lay.faq, 'faq', F.socRest, 7.95, null, 0.6);
  dim(lay.faq, 'faq', F.isoRest, 7.25, null, 0.5);

  // the same FAQ row on six of the fifteen language versions of the page (real stills, same framing)
  var flick = ['de', 'fr', 'ar', 'ru', 'ja', 'hi'], FL1 = FL0 + flick.length * FLd;
  var langs = $('langs'), off = (hook - 2920) * K;
  flick.forEach(function (l, i) {
    var w = document.createElement('div'); w.className = 'full'; langs.appendChild(w);
    var src = 'clips/lang/faq-' + l + '.png';
    var im = document.createElement('img'); im.src = src; im.className = 'full'; im.style.width = im.style.height = G.WW + 'px'; w.appendChild(im);
    w.style.top = (-off) + 'px';
    var rtl = (l === 'ar' || l === 'fa');
    L[l].firstWord.map(function (r) { return rtl ? [r[0] - 3, r[1], r[2] + 5, r[3]] : r; }).forEach(function (r) {
      mk(w, 'ul' + (rtl ? ' rtl' : ''), r[0] * K - 3, (r[1] + r[3]) * K + 1, r[2] * K + 6);
      mk(w, 'tint', r[0] * K - 8, r[1] * K - 6, r[2] * K + 16, r[3] * K + 12);
    });
    // the next row (SOC 2) stays quiet like it does in English, and its answer is masked here too (no spoiler)
    var it = L[l].item2, ddTop = (it[1] + 48.25) * K - 4, visBottom = (hook - 2920) + G.WH / K;
    // if the window's bottom edge would slice that question in half, hide it instead of dimming it
    mk(w, 'dimr', it[0] * K - 6, it[1] * K - 4, it[2] * K + 12, Math.max(0, ddTop - (it[1] * K - 4))).style.opacity = (it[1] + 44 > visBottom) ? 1 : 0.55;
    mk(w, 'dimr', it[0] * K - 6, ddTop, it[2] * K + 12, 390 * K - ddTop + 4);
    if (off) {   // the still was grabbed at 2920; when this page frames a little lower, keep the still's own header whole
      var hd = document.createElement('div'); hd.className = 'full'; hd.style.top = off + 'px'; hd.style.width = G.WW + 'px'; hd.style.height = (65 * K) + 'px'; hd.style.overflow = 'hidden';
      var im2 = document.createElement('img'); im2.src = src; im2.style.width = im2.style.height = G.WW + 'px'; hd.appendChild(im2); w.appendChild(hd);
    }
    Kit.show(w, FL0 + i * FLd, FL0 + (i + 1) * FLd);
  });
  Kit.show('#hdr', 0, FL0); Kit.add('#hdr', 'opacity', [[FL1, 1, 'hold']]);
  var urls = [[0, 'qsme.build/security']].concat(flick.map(function (l, i) { return [FL0 + i * FLd, 'qsme.build/' + l + '/security']; })).concat([[FL1, 'qsme.build/security']]);
  var urlEl = $('url');
  Kit.each(function (t) { var s = urls[0][1]; for (var i = 0; i < urls.length; i++) if (t >= urls[i][0]) s = urls[i][1]; if (urlEl.textContent !== s) urlEl.textContent = s; });
  Kit.pop('#url', 4.9, { dy: 0 }); Kit.pop('#asof', 5.0, { dy: 0 });

  Kit.pop('#c1', FL0 + 0.05, { dy: 16 }).out('#c1', FL1 + 0.15);
  Kit.slam('#c2', 8.3, { from: 1.12, dur: 0.12 }).out('#c2', 9.9);

  // ---------- D · 10.0–10.25 whip: the real screencast of the page scrolling up, left while it is still fast ----------
  // The screencast is cut (under a 12 px blur) while it is still passing the bidder / signed-records cards, so the
  // decelerating end of the scroll (roles and backups cards) is never on screen; the landing is a crossfade.
  Kit.clip('#whip', { dir: G.whipDir, t0: 10.0, t1: 10.3, stamps: B[G.whipKey], from: G.whipFrom, speed: 1.8, ext: '.jpg' });
  Kit.add('#whip', 'opacity', [[9.98, 0], [10.05, 1, 'out'], [10.17, 1], [10.24, 0, 'in']]);
  Kit.add('#whip', 'blur', [[10.0, 0], [10.1, 12, 'in'], [10.24, 12]]);
  Kit.add('#layFaq', 'opacity', [[10.0, 1], [10.08, 0]]);

  // ---------- E · 10.15–20.03 what is in place, then the programme status ----------
  // lands on "What is in place today?" + the TLS card, then a hard cut to the bidder rule (the backups and roles
  // cards are skipped); the caption is gone before the scroll to PROGRAMME starts
  var TI = [[10.15, T.inp], [10.95, T.inp], [10.95, T.bidder, 'hold'], [13.0, T.bidder2], [14.2, T.prog, 'inOut'], [19.2, T.prog2], [19.55, T.badges, 'inOut'], [QUOTE, T.badges2]];
  Kit.add('#layIn', 'y', TI.map(function (k) { return [k[0], ly(k[1], 'inp'), k[2]]; }));
  Kit.add('#layIn', 'blur', [[10.15, 12], [10.25, 12], [10.5, 0, 'out'], [13.25, 0], [13.45, 3, 'in'], [13.8, 3], [14.05, 0, 'out']]);
  Kit.pop('#c3', 10.55, { dy: 16 }).out('#c3', 12.8);
  // a callback to week 1 (Column H): the bidder rule, highlighted
  underline(lay.inp, 'inp', F.strippedPhrase, 11.3, 11.75, 12.8);
  tint(lay.inp, 'inp', F.strippedPhrase, 11.3, 12.8);
  // programme: the sentence verbatim, then the caption's phrases land on their own words
  underline(lay.inp, 'inp', F.ismsSentence, 14.6, 15.45, 19.15);
  tint(lay.inp, 'inp', F.inProgress, 15.9, 19.15);
  tint(lay.inp, 'inp', F.notCert, 16.6, 19.15);
  Kit.show('#c4', 15.9, 19.15);
  [['#c4a', 15.9], ['#c4b', 16.6], ['#c4c', 17.3]].forEach(function (c) { Kit.add(c[0], 'opacity', [[c[1], 0], [c[1] + 0.1, 1, 'out']]); Kit.add(c[0], 'y', [[c[1], 14], [c[1] + 0.2, 0, 'out']]); });
  // the badges line: a short scroll, the underline, then straight into the quote card
  underline(lay.inp, 'inp', F.badgesSentence, 19.53, 19.83, null);
  tint(lay.inp, 'inp', F.badgesSentence, 19.53, null);
  dim(lay.inp, 'inp', [F.progP1], 19.2, null, 0.45, '#101A15');
  var bz = F.badgesSentence[1];   // the rest of that paragraph, quietly dimmed so the line stands alone
  dim(lay.inp, 'inp', [[bz[0] + bz[2] + 4, bz[1], 374 - bz[0] - bz[2] - 4, bz[3]], [16, bz[1] + 25.5, 358, 50]], 19.2, null, 0.35, '#101A15');

  // ---------- F · 20.03–23.9 the badges line, quoted (on screen from the cut: no empty frame) ----------
  Kit.add('#fl1', 'y', [[QUOTE, 18], [QUOTE + 0.2, 0, 'out']]); Kit.add('#fl2', 'y', [[QUOTE, 26], [QUOTE + 0.25, 0, 'out']]);
  Kit.add('#fQuote', 'y', [[QUOTE, 10], [QUOTE + 0.2, 0, 'out']]);
  Kit.pop('#fl3', QUOTE + 0.6, { dy: 24 }).pop('#fl4', QUOTE + 0.67, { dy: 24 });
  Kit.fade('#fSrc', QUOTE + 1.4, QUOTE + 1.65);
  Kit.each(function () { var e = $('fEarn'), u = $('fUl'); if (!u.__set && e.offsetWidth) { var r = e.getBoundingClientRect(), R = $('root').getBoundingClientRect(); u.style.left = (r.left - R.left) + 'px'; u.style.width = r.width + 'px'; u.style.top = (r.bottom - R.top - 4) + 'px'; u.__set = 1; } });
  Kit.add('#fUl', 'scaleX', [[QUOTE + 1.05, 0], [QUOTE + 1.4, 1, 'out']]);
  Kit.add('#fUl', 'opacity', [[QUOTE + 1.04, 0], [QUOTE + 1.05, 1, 'hold']]);

  // ---------- H · 23.9–30.0 end card: the same questionnaire row, now answered, with the evidence ----------
  Kit.fade('#eLogo', END + 0.05, END + 0.35).add('#eLogo', 'scale', [[END + 0.05, 0.94], [END + 0.45, 1, 'out']]);
  Kit.type('#qEvV', 24.45, 25.0);
  Kit.add('#qEvV', 'borderColor', [[24.45, '#5B7666'], [24.6, '#3DC023', 'out']]);
  Kit.pop('#eCta', 26.0, { dy: 20 }).add('#eCta', 'scale', [[26.0, 0.92], [26.25, 1, 'outBack'], [28.45, 1], [28.65, 1.035, 'out'], [28.9, 1, 'inOut']]);

  Kit.ready({ duration: 30, fonts: ['700 136px "Space Grotesk"', '500 26px "JetBrains Mono"', '500 64px "JetBrains Mono"', '700 26px Inter', '500 38px Inter'] });
})();
