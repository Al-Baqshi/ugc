/* "Is QSME ISO 27001 certified? No." — shared timeline for the 4:5 and 9:16 pages.
 * Each page sets window.CFG (window geometry + where the camera sits on the page per beat) and loads boxes.js.
 * Every page shot is a real still/screencast of the PUBLIC page qsme.build/security (grabbed 4 Oct 2026 with
 * motion/still.mjs and tools/motion/capture.mjs). Camera moves, underlines, tints, dims and the masked SOC 2 answers
 * are editorial; no product UI is invented.
 *
 * Rev 2 (review fixes, 4 Oct): hook card with big Y/N boxes and an N tick; the flying "No." lands on the page's own
 * "No." (baseline + cap height from the 4x still) and crossfades into it; the backups and roles cards never sit under
 * a caption (the whip leaves before them, then a hard cut from the TLS card to the bidder rule); "Here's what is in
 * place." is gone before the scroll to PROGRAMME starts; the page's CTA band is dropped; the end card is a bookend.
 *
 * 2026-10-06 AUDIO-FIRST REMAKE (owner standard from N01: continuous speech, a real hook, no gaps, one voice): the Cam S
 * eleven_v3 take (outputs/vo-take-cam-v3/take.mp3, 46.32 s, ONE unbroken request laid at 0.0) is the clock. Every beat
 * below sits on its word in outputs/vo-take-cam-v3/alignment.json; the page runs 47.8 s (take + ~1.5 s tail). Design unchanged.
 *   0.00–3.41  hook card while "ISO twenty-seven-oh-oh-one certified?" is asked (0.00–3.28); N ticks at 3.2, hard cut on "No." (3.41)
 *   3.41–8.20  the giant "No." holds under "Row one of every security questionnaire, answered in one word," (4.06–7.92);
 *              "qsme.build/security" fades in under it on "answered" (6.76); it flies onto the page's own "No." on
 *              "security page" (8.20–8.58), crossfade 8.53–8.63
 *   9.20       "Same answer. All 15 languages." pops on "Same"; the flick lands de before "Nein." (12.11; heard 12.46), fr on
 *              "Non." (13.50; heard 13.52), ru on "Nyet." (14.70–15.22; heard 14.74–15.18), then ar / ja / hi at 0.2 s, English 15.82
 *   15.82–16.1 scroll to the SOC 2 row under "Sock two report?" (heard 16.06); the answer wipes open 17.45, "Also no." slams on
 *              "Also" (17.66; heard 17.70), "We do not claim one." (18.48–19.92); the whip runs in the gap after "one." (20.0–20.3)
 *   2026-10-10 review fix: the flick and "Also no." are now timed on the audio onsets (the alignment runs early over
 *              silences); the end card adds the payoff caption "Estimating and tendering software for construction organisations."
 *   20.35      "Here's what is in place." on "Here's" (20.30) over the heading + TLS card; hard cut to the bidder rule on
 *              "Your" (21.76); underline "stripped out server-side…" on "stripped" (23.48); caption out 26.2
 *   26.45–27.65 scroll to PROGRAMME on "And the status:" (26.44); underline the sentence on "being built now" (27.71–28.72);
 *              "In progress." (28.75) "Not certified." (29.70) "Said plainly." (31.01) land on their words and tint them
 *   32.3–33.09 badges setup (scroll + underline), hard cut to the quote on "We" (33.09); lines land with "badges, logos or"
 *              (33.90), "ratings" (35.00), "not earned." (35.72); underline 36.0, source 36.4
 *   37.0       end card (payoff caption beside the logo pops on "estimating", 37.8) on "Queue Ess Mee is estimating and tendering software for construction organisations." (37.07);
 *              Evidence types on "in writing" (41.95); the demo pill pops on "Book" (43.54), pulses on "build." (45.8); page ends 47.8 */
(function () {
  var G = window.CFG, B = window.BOX, F = B.full, L = B.lang, T = G.T;
  var K = G.WW / 390;                              // CSS px of the 390-wide mobile page -> window px
  var WX = G.WX, WY = G.WY;
  var SEG = { faq: 2930, inp: 510 };               // document y (CSS px) where each still segment starts
  var $ = function (id) { return document.getElementById(id); };
  var lay = { faq: $('layFaq'), inp: $('layIn') };
  function ly(top, seg) { return -(top - SEG[seg]) * K; }      // layer y for a window whose top sits at document y `top`
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  // ---------- master clock (seconds on the take; see the header) ----------
  var CUT = 3.41, TICK = 3.2;                      // hook card → hard cut to "No." on the word
  var FLY = 8.2, FLYD = 0.38, XF = 8.53;           // the flight into the page's "No." ("security page") and the crossfade
  var SOC0 = 15.82, SOC1 = 16.10;                  // scroll to the SOC 2 row; "Sock" is heard at 16.06 (audio, not alignment)
  var WHIP = 20.0;                                 // the whip runs in the gap before "Here's what is in place." (20.30)
  var BID = 21.76;                                 // hard cut to the bidder rule on "Your rates and budget"
  var PROG0 = 26.45, PROG1 = 27.65;                // scroll to PROGRAMME on "And the status:"
  var BADGE0 = 32.3, BADGE1 = 32.65;               // badges setup scroll after "Said plainly."
  var QUOTE = 33.09, END = 37.0, DUR = 47.8;       // "We do not display…" / "Queue Ess Mee is…" / take 46.32 + tail

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
  // the questionnaire row is the hook (0–3.41) and comes back as the end card (37.0–47.8): a bookend
  Kit.each(function (t) { $('sQ').style.display = (t < CUT || t >= END) ? '' : 'none'; });
  Kit.scene('#bigNo', CUT, XF + 0.12).scene('#bigSrc', CUT, FLY + 0.15);
  Kit.scene('#url', FLY, QUOTE).scene('#asof', FLY, QUOTE);
  Kit.scene('#sF', QUOTE, END);
  Kit.scene('#end', END, DUR + 0.01);
  // the page fades in around the flying word: 30% at most until the word has cleared the question line
  Kit.add('#win', 'opacity', [[FLY + 0.1, 0], [FLY + 0.25, 0.3, 'out'], [XF, 0.3], [XF + 0.1, 1, 'out']]);
  Kit.each(function (t) { win.style.display = (t >= FLY && t < QUOTE) ? '' : 'none'; });
  Kit.scene('#layFaq', FLY, WHIP + 0.1).scene('#layIn', WHIP + 0.15, QUOTE);

  // ---------- A · 0–3.41 the questionnaire row (frame 1 = the hook and the thumbnail: nothing ticked yet) ----------
  Kit.add('#qText', 'y', [[0, 0], [CUT, -10], [END, -10, 'hold'], [DUR, -16]]);
  Kit.add('#qKick', 'y', [[0, 0], [CUT, -6], [END, -6, 'hold'], [DUR, -10]]);
  // N gets ticked in brand green in 4 frames right before the hard cut, so the giant "No." reads as the answer to the form
  Kit.add('#qTickP', 'trim', [[TICK, 0], [TICK + 0.12, 1, 'out']]);
  Kit.add('#qN', 'borderColor', [[TICK, '#5B7666'], [TICK + 0.08, '#3DC023', 'out']]);
  Kit.add('#qNfill', 'opacity', [[TICK, 0], [TICK + 0.08, 1, 'out']]);
  Kit.add('#qYlab', 'color', [[TICK, '#EEF4EF'], [TICK + 0.12, '#86958B', 'out']]);

  // ---------- B · 3.41–8.2 "No." held under "Row one of every security questionnaire…", then it flies onto the page's own "No." ----------
  var bigNo = $('bigNo'), M = null;
  var hook = T.hook;   // window top (document y) for the FAQ framing; the language stills were grabbed at 2920
  // the page's "No." measured on the 4x still (clips/seg-faq.png): N ink from x 17.0, cap top 3135.25, baseline 3147.0 (CSS px)
  var tgt = { x: WX + 17.0 * K, y: WY + (3147.0 - hook) * K, cap: 11.75 * K };
  Kit.fade('#bigSrc', 6.76, 7.0); Kit.out('#bigSrc', FLY, 0.15);   // "answered in one word, on our security page"
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

  // ---------- C · 8.2–20.0 the FAQ on the real page ----------
  var TF = [[FLY, hook], [SOC0, hook], [SOC1, T.soc, 'inOut'], [WHIP + 0.1, T.soc]];
  Kit.add('#layFaq', 'y', TF.map(function (k) { return [k[0], ly(k[1], 'faq'), k[2]]; }));
  // the page's own "No." stays hidden under the flight (no double word), then the two swap in a 3-frame crossfade
  var noMask = mk(lay.faq, 'dimr', F.isoNo[0][0] * K - 4, (F.isoNo[0][1] - SEG.faq) * K - 2, F.isoNo[0][2] * K + 8, F.isoNo[0][3] * K + 4);
  Kit.add(noMask, 'opacity', [[XF, 1], [XF + 0.1, 0]]);
  tint(lay.faq, 'faq', F.isoNo, XF, SOC0, 6);
  underline(lay.faq, 'faq', F.isoNo, XF + 0.05, XF + 0.25, SOC0);
  // the SOC 2 answer waits for its own beat: masked while the question is read, then wiped open just before "Also no."
  var ALSO = 17.66, SOCX = 17.45;                  // "Also" is heard at 17.70 (alignment says 17.22, but 17.06–17.68 is silence)
  var socDd = F.faqDds[1];
  var mask = mk(lay.faq, 'dimr', socDd[0] * K - 6, (socDd[1] - SEG.faq) * K - 4, socDd[2] * K + 12, socDd[3] * K + 10);
  mask.style.transformOrigin = '100% 50%';
  Kit.add(mask, 'scaleX', [[SOCX, 1], [SOCX + 0.20, 0, 'out']]);
  dim(lay.faq, 'faq', F.faqItems[1], FLY, SOC0 - 0.05, 0.55);          // SOC 2 row quiet during the hook
  underline(lay.faq, 'faq', F.socNo, ALSO + 0.02, ALSO + 0.32, 20.1);
  tint(lay.faq, 'faq', F.socNo, ALSO + 0.02, 20.1, 6);
  dim(lay.faq, 'faq', F.socRest, ALSO + 0.02, null, 0.6);
  dim(lay.faq, 'faq', F.isoRest, SOC0 + 0.15, null, 0.5);

  // the same FAQ row on six of the fifteen language versions of the page (real stills, same framing), each on its word:
  // timed on the AUDIO onsets (the alignment runs early over silences): de "Nein." heard 12.46, fr "Non." 13.52,
  // ru "Nyet." 14.74–15.18 (Russian page held 14.70–15.22), then ar / ja / hi at 0.2 s in the pause before "Sock"
  var flick = [['de', 12.11], ['fr', 13.50], ['ru', 14.70], ['ar', 15.22], ['ja', 15.42], ['hi', 15.62]], FL0 = flick[0][1], FL1 = 15.82;
  var langs = $('langs'), off = (hook - 2920) * K;
  flick.forEach(function (f, i) {
    var l = f[0], t0 = f[1], t1 = i + 1 < flick.length ? flick[i + 1][1] : FL1;
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
    Kit.show(w, t0, t1);
  });
  Kit.show('#hdr', 0, FL0); Kit.add('#hdr', 'opacity', [[FL1, 1, 'hold']]);
  var urls = [[0, 'qsme.build/security']].concat(flick.map(function (f) { return [f[1], 'qsme.build/' + f[0] + '/security']; })).concat([[FL1, 'qsme.build/security']]);
  var urlEl = $('url');
  Kit.each(function (t) { var s = urls[0][1]; for (var i = 0; i < urls.length; i++) if (t >= urls[i][0]) s = urls[i][1]; if (urlEl.textContent !== s) urlEl.textContent = s; });
  Kit.pop('#url', FLY + 0.3, { dy: 0 }); Kit.pop('#asof', FLY + 0.4, { dy: 0 });

  Kit.pop('#c1', 9.25, { dy: 16 }).out('#c1', FL1 + 0.15);              // "Same answer in all fifteen languages." (9.20)
  Kit.slam('#c2', ALSO, { from: 1.12, dur: 0.12 }).out('#c2', 20.1);    // "Also no." (heard 17.70), holds through "We do not claim one."

  // ---------- D · 20.0–20.25 whip: the real screencast of the page scrolling up, left while it is still fast ----------
  // The screencast is cut (under a 12 px blur) while it is still passing the bidder / signed-records cards, so the
  // decelerating end of the scroll (roles and backups cards) is never on screen; the landing is a crossfade.
  Kit.clip('#whip', { dir: G.whipDir, t0: WHIP, t1: WHIP + 0.3, stamps: B[G.whipKey], from: G.whipFrom, speed: 1.8, ext: '.jpg' });
  Kit.add('#whip', 'opacity', [[WHIP - 0.02, 0], [WHIP + 0.05, 1, 'out'], [WHIP + 0.17, 1], [WHIP + 0.24, 0, 'in']]);
  Kit.add('#whip', 'blur', [[WHIP, 0], [WHIP + 0.1, 12, 'in'], [WHIP + 0.24, 12]]);
  Kit.add('#layFaq', 'opacity', [[WHIP, 1], [WHIP + 0.08, 0]]);

  // ---------- E · 20.15–33.09 what is in place, then the programme status ----------
  // lands on "What is in place today?" + the TLS card, then a hard cut to the bidder rule (the backups and roles
  // cards are skipped) on "Your rates and budget"; the caption is gone before the scroll to PROGRAMME starts
  var IN0 = WHIP + 0.15;
  var TI = [[IN0, T.inp], [BID, T.inp], [BID, T.bidder, 'hold'], [PROG0, T.bidder2], [PROG1, T.prog, 'inOut'], [BADGE0, T.prog2], [BADGE1, T.badges, 'inOut'], [QUOTE, T.badges2]];
  Kit.add('#layIn', 'y', TI.map(function (k) { return [k[0], ly(k[1], 'inp'), k[2]]; }));
  Kit.add('#layIn', 'blur', [[IN0, 12], [IN0 + 0.1, 12], [IN0 + 0.35, 0, 'out'], [PROG0 + 0.25, 0], [PROG0 + 0.45, 3, 'in'], [PROG0 + 0.8, 3], [PROG0 + 1.05, 0, 'out']]);
  Kit.pop('#c3', 20.35, { dy: 16 }).out('#c3', 26.2);                   // "Here's what is in place." (20.30); out during "interface."
  // a callback to week 1 (Column H): the bidder rule, highlighted on "stripped out server-side, not hidden in the interface."
  underline(lay.inp, 'inp', F.strippedPhrase, 23.48, 23.93, 26.2);
  tint(lay.inp, 'inp', F.strippedPhrase, 23.48, 26.2);
  // programme: the sentence verbatim under "being built now", then the caption's phrases land on their own words
  var INP = 28.75, NOTC = 29.70, SAID = 31.01, C4OUT = BADGE0 - 0.05;
  underline(lay.inp, 'inp', F.ismsSentence, 27.71, 28.6, C4OUT);
  tint(lay.inp, 'inp', F.inProgress, INP, C4OUT);
  tint(lay.inp, 'inp', F.notCert, NOTC, C4OUT);
  Kit.show('#c4', INP, C4OUT);
  [['#c4a', INP], ['#c4b', NOTC], ['#c4c', SAID]].forEach(function (c) { Kit.add(c[0], 'opacity', [[c[1], 0], [c[1] + 0.1, 1, 'out']]); Kit.add(c[0], 'y', [[c[1], 14], [c[1] + 0.2, 0, 'out']]); });
  // the badges line: a short scroll, the underline, then straight into the quote card on "We do not display"
  underline(lay.inp, 'inp', F.badgesSentence, BADGE1 - 0.02, BADGE1 + 0.28, null);
  tint(lay.inp, 'inp', F.badgesSentence, BADGE1 - 0.02, null);
  dim(lay.inp, 'inp', [F.progP1], BADGE0, null, 0.45, '#101A15');
  var bz = F.badgesSentence[1];   // the rest of that paragraph, quietly dimmed so the line stands alone
  dim(lay.inp, 'inp', [[bz[0] + bz[2] + 4, bz[1], 374 - bz[0] - bz[2] - 4, bz[3]], [16, bz[1] + 25.5, 358, 50]], BADGE0, null, 0.35, '#101A15');

  // ---------- F · 33.09–37.0 the badges line, quoted, each line on its words (on screen from the cut: no empty frame) ----------
  Kit.add('#fl1', 'y', [[QUOTE, 18], [QUOTE + 0.2, 0, 'out']]); Kit.add('#fl2', 'y', [[QUOTE, 26], [QUOTE + 0.25, 0, 'out']]);
  Kit.add('#fQuote', 'y', [[QUOTE, 10], [QUOTE + 0.2, 0, 'out']]);
  Kit.pop('#fl3', 35.0, { dy: 24 }).pop('#fl4', 35.72, { dy: 24 });       // "ratings we have" (35.00) / "not earned." (35.72)
  Kit.fade('#fSrc', 36.4, 36.65);
  Kit.each(function () { var e = $('fEarn'), u = $('fUl'); if (!u.__set && e.offsetWidth) { var r = e.getBoundingClientRect(), R = $('root').getBoundingClientRect(); u.style.left = (r.left - R.left) + 'px'; u.style.width = r.width + 'px'; u.style.top = (r.bottom - R.top - 4) + 'px'; u.__set = 1; } });
  Kit.add('#fUl', 'scaleX', [[36.0, 0], [36.35, 1, 'out']]);              // under "earned." (35.89–36.88)
  Kit.add('#fUl', 'opacity', [[35.99, 0], [36.0, 1, 'hold']]);

  // ---------- H · 37.0–47.8 end card: the same questionnaire row, now answered, with the evidence ----------
  // "Queue Ess Mee is estimating and tendering software for construction organisations." plays over the logo + answered row;
  // the Evidence field types on "in writing" (41.95); the demo pill pops on "Book" (43.54) and pulses on "build." (45.8)
  Kit.fade('#eLogo', END + 0.05, END + 0.35).add('#eLogo', 'scale', [[END + 0.05, 0.94], [END + 0.45, 1, 'out']]);
  // the product payoff as a caption beside the logo for sound-off viewers, popped on "estimating" (heard ~37.80)
  Kit.pop('#eTag', 37.8, { dy: 12 });
  Kit.type('#qEvV', 41.95, 42.5);
  Kit.add('#qEvV', 'borderColor', [[41.95, '#5B7666'], [42.1, '#3DC023', 'out']]);
  var CTA = 43.54, PULSE = 45.8;
  Kit.pop('#eCta', CTA, { dy: 20 }).add('#eCta', 'scale', [[CTA, 0.92], [CTA + 0.25, 1, 'outBack'], [PULSE, 1], [PULSE + 0.2, 1.035, 'out'], [PULSE + 0.45, 1, 'inOut']]);

  Kit.ready({ duration: DUR, fonts: ['700 136px "Space Grotesk"', '500 26px "JetBrains Mono"', '500 64px "JetBrains Mono"', '700 26px Inter', '500 38px Inter'] });
})();
