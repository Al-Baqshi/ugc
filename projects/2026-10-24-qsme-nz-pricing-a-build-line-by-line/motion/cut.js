/* cut.js: the 9:16 chapter cut-downs of "Price it once" (YouTube Shorts / Reels / TikTok).
   The page sets window.CUT = 'a' | 'b' | 'c' before loading this file. Screens come from story.js (same builders,
   same verbatim wording, same demo data as the 16:9 master); framing uses portrait camera keys.
   AUDIO-FIRST RE-TIMING (2026-10-08, the N01 standard): each cut has its own Cam S eleven_v3 take
   (outputs/vo-take-cam-v3-a|b|c/take.mp3, ONE unbroken request laid at 0.0). The cut is still authored on its 2026-10-04 clock
   and mapped through Warp (warp.js) with AN = [[authored_s, output_s], …], each output time pinned to its word in that take's
   alignment.json; captions (phrases lifted from the narration) and a few word-locked callouts are placed in OUTPUT time
   after Warp.restore(). Page = take + 1.5 s tail. */
(function () {
  'use strict';
  var R = document.getElementById('root'), H = '', caps = [], after = [], post = [], AN, DOUT;
  function now(fn) { post.push(fn); }   // runs after Warp.restore(): times are OUTPUT seconds on the take
  function add(h) { H += h; }
  function cap(t0, t1, html) { caps.push([t0, t1, html]); }
  function later(fn) { after.push(fn); }
  // portrait window: keep the camera inside the 1600 × 750 app
  Story.fit = function (cx, cy, cs) {
    var hw = 510 / cs, hh = 300 / cs;
    cx = hw * 2 >= 1600 ? 800 : Math.max(hw, Math.min(1600 - hw, cx));
    cy = hh * 2 >= 750 ? 375 : Math.max(hh, Math.min(750 - hh, cy));
    return [cx, cy, cs];
  };
  var ILL = 'Illustrative screen · demo data';   // drop per chapter as the owner's recordings are swapped in
  var nK = 0;
  function kicker(t0, t1, text) { var id = 'k' + (nK++); add('<div id="' + id + '" class="kick">' + text + '</div>'); later(function () { Kit.scene('#' + id, t0, t1); Kit.add('#' + id, 'x', [[t0, -14], [t0 + 0.25, 0, 'out']]); Kit.add('#' + id, 'opacity', [[t0, 0], [t0 + 0.15, 1]]); }); }
  var nL = 0;
  function label(t0, t1, text, cls, top) { var id = 'l' + (nL++); add('<div id="' + id + '" class="lbl9 ' + (cls || '') + '"' + (top ? ' style="top:' + top + 'px"' : '') + '>' + text + '</div>'); later(function () { Kit.scene('#' + id, t0, t1); }); }
  var nF = 0;
  function ftag(t0, t1, html, top) { var id = 'f' + (nF++); add('<div id="' + id + '" class="ft9"' + (top ? ' style="top:' + top + 'px"' : '') + '>' + html + '</div>'); later(function () { Kit.scene('#' + id, t0, t1); }); }
  function eyebrow(t0, t1) { add('<div id="eyb" class="eyb">QSME · Price it once</div>'); later(function () { Kit.scene('#eyb', t0, t1); }); }

  // a chapter sub-range [a, b] of chapter ch, placed at page time t0
  function chapter(id, ch, a, b, t0, cam, opt) {
    add('<div id="w_' + id + '" class="win916">' + ch.html(id, opt) + '</div>');
    var T = t0 - a, t1 = t0 + (b - a);
    later(function () { Kit.scene('#w_' + id, t0, t1); ch.anim(id, T, { cam: cam }); });
    return T;
  }

  // the end card
  function endCard(t0, D, l1, l2) {
    add('<div id="end" class="fill"><div id="ebg" class="bg" style="background-image:url(clips/dusk/f_00000.jpg)"></div><div class="ov"></div>' +
      '<div id="elogo" class="logo"><img src="qsme-logo.svg" alt="QSME" style="position:absolute;left:-35px;top:0;width:300px"></div>' +
      '<div id="e1" class="e1">' + (l1 || 'Price it once.') + '</div><div id="e2" class="e2">' + (l2 || 'Tender the same lines.') + '</div>' +
      '<div id="ebtn" class="btnx">Sign up at qsme.co.nz</div><div id="efn" class="fn">Dramatised · illustrative screens · demo data</div></div>');
    later(function () {
      Kit.scene('#end', t0, D + 1); Kit.add('#end', 'opacity', [[t0, 0], [t0 + 0.3, 1]]); Kit.add('#ebg', 'scale', [[t0, 1.0], [D, 1.06, 'linear']]);
      Kit.pop('#elogo', t0 + 0.2, { dy: 20 }).pop('#e1', t0 + 0.45, { dy: 30 }).pop('#e2', t0 + 0.8, { dy: 30 }).pop('#ebtn', t0 + 1.25, { dy: 24 }).fade('#efn', t0 + 1.5, t0 + 1.9);
      Kit.add('#ebtn', 'scale', [[t0 + 2.4, 1], [t0 + 2.6, 1.04, 'out'], [t0 + 2.9, 1, 'inOut']]);
    });
  }

  // stacked split for portrait: her SOQ (top) vs the drainlayer's bid form (bottom); rates never travel
  var L9 = [['100 mm stormwater pipe', '42', 'm', '38.00', '1,596'], ['100 mm sewer drain', '36', 'm', '44.00', '1,584'], ['Inspection chamber', '2', 'ea', '640.00', '1,280'], ['25 mm water main', '18', 'm', '22.00', '396']];
  function split9(id, t0, t1, T) {
    var h = '<div id="' + id + '" class="s9">';
    h += '<div class="lab" style="top:0;color:#BBF7D0"><i style="background:#3DC023"></i>Her SOQ · Plumbing &amp; drainage</div>';
    h += '<div id="' + id + 'A" class="card9" style="top:34px;height:252px"><div class="r9 h" style="top:0"><div class="d">Description</div><div class="q">Qty</div><div class="rt">Rate</div><div class="tt">Total</div></div>' +
      L9.map(function (r, i) { return '<div id="' + id + 'a' + i + '" class="r9" style="top:' + (44 + i * 52) + 'px"><div class="d">' + r[0] + '</div><div class="q">' + r[1] + ' ' + r[2] + '</div><div class="rt g">' + r[3] + '</div><div class="tt">' + r[4] + '</div></div>'; }).join('') + '</div>';
    h += '<div class="lab" style="top:306px;color:#FDE68A"><i style="background:#F59E0B"></i>What the drainlayer sees</div>';
    h += '<div id="' + id + 'B" class="card9" style="top:340px;height:260px"><div class="r9" style="top:0;height:56px;border-bottom:1.5px solid #E2E8F0"><div class="d" style="font:700 19px/1.2 Inter;color:#334155">How do you want to price this bid?</div>' +
      '<div style="padding-right:12px;position:relative"><span class="seg9"><span id="' + id + 'sT" style="background:#fff;color:#0F172A">Total price</span><span id="' + id + 'sI">Itemize</span></span></div></div>' +
      '<div id="' + id + 'bh" class="r9 h" style="top:56px"><div class="d">Description</div><div class="q">Est Qty</div><div class="bq">Bid Qty</div><div class="rt">Rate ($)</div><div class="tt">Total Cost ($)</div></div>' +
      L9.map(function (r, i) { return '<div id="' + id + 'b' + i + '" class="r9" style="top:' + (100 + i * 40) + 'px;height:40px;font-size:21px"><div class="d">' + r[0] + '</div><div class="q">' + r[1] + ' ' + r[2] + '</div><div class="bq"><span class="box s"></span></div><div class="rt"><span class="box"></span></div><div class="tt"><span class="box"></span></div></div>'; }).join('') + '</div>';
    h += '<div id="' + id + 'hA" class="hl9" style="left:672px;top:34px;width:154px;height:252px;border:3px solid #16A34A"></div>';
    h += '<div id="' + id + 'hB" class="hl9" style="left:672px;top:396px;width:154px;height:204px;border:3px dashed #F59E0B"></div>';
    L9.forEach(function (r, i) { h += '<div id="' + id + 'g' + i + '" class="gh"><span>' + r[0] + '</span><span style="color:#64748B">' + r[1] + ' ' + r[2] + '</span><span id="' + id + 'g' + i + 'r" style="color:#15803D;font-weight:800">' + r[3] + ' · ' + r[4] + '</span></div>'; });
    h += UI.cursor(id + 'cur') + UI.ripple(id + 'rp') + '</div>';
    add(h);
    later(function () {
      var P = '#' + id, A = function (k) { return k.map(function (x) { return [T + x[0], x[1], x[2]]; }); };
      Kit.scene(P, t0, t1);
      Kit.add(P + 'A', 'opacity', A([[0, 0], [0.3, 1]])).add(P + 'A', 'y', A([[0, -40], [0.45, 0, 'out']]));
      Kit.add(P + 'B', 'opacity', A([[0.1, 0], [0.4, 1]])).add(P + 'B', 'y', A([[0.1, 40], [0.55, 0, 'out']]));
      Story.path(id + 'cur', T, [[0.5, 700, 560], [1.0, 906, 368], [1.25, 906, 368], [1.9, 960, 600]]);
      Story.tap(id + 'rp', T, 1.05, 906, 368);
      Kit.add(P + 'sI', 'background', A([[1.05, '#EEF2F6'], [1.1, '#16A34A']])).add(P + 'sI', 'color', A([[1.05, '#64748B'], [1.1, '#FFFFFF']]));
      Kit.add(P + 'sT', 'background', A([[1.05, '#FFFFFF'], [1.1, '#EEF2F6']])).add(P + 'sT', 'color', A([[1.05, '#0F172A'], [1.1, '#64748B']]));
      Kit.add(P + 'bh', 'opacity', A([[1.15, 0], [1.3, 1]]));
      L9.forEach(function (r, i) {
        var a0 = 1.35 + i * 0.2, a1 = a0 + 0.75;
        Kit.add(P + 'g' + i, 'x', A([[a0, 4], [a1, 4, 'inOut']])).add(P + 'g' + i, 'y', A([[a0, 34 + 44 + i * 52 + 3], [a1, 340 + 100 + i * 40 - 3, 'inOut']]));
        Kit.add(P + 'g' + i, 'opacity', A([[a0 - 0.01, 0], [a0, 1], [a1, 1], [a1 + 0.12, 0]]));
        Kit.add(P + 'g' + i + 'r', 'opacity', A([[a0 + 0.22, 1], [a0 + 0.4, 0]])).add(P + 'g' + i + 'r', 'blur', A([[a0 + 0.18, 0], [a0 + 0.4, 6]]));
        Kit.add(P + 'b' + i, 'opacity', A([[a1 - 0.05, 0], [a1 + 0.08, 1]]));
        Kit.add(P + 'a' + i, 'background', A([[a0 - 0.05, '#FFFFFF'], [a0, '#F0FDF4'], [a1 + 0.4, '#FFFFFF']]));
      });
      Kit.add(P + 'hA', 'opacity', A([[2.9, 0], [3.1, 1]])).add(P + 'hB', 'opacity', A([[3.2, 0], [3.4, 1]]));
    });
  }

  // the bench (portrait)
  function bench(id, t0, t1, o) { o.W = 1080; o.H = 1920; add(Story.bench(id, o).replace('class="bench"', 'class="bench" data-qa-ignore')); later(function () { Kit.scene('#' + id, t0, t1); }); }

  var cut = window.CUT, D;
  add('<div id="bd" class="fill"><div id="bdi" class="bdi" style="background-image:url(clips/dusk/f_00000.jpg)"></div><div class="bdo"></div></div>');
  later(function () { Kit.add('#bdi', 'scale', [[0, 1.0], [D, 1.08, 'linear']]); });
  if (cut === 'a') {
    /* ===== A · "Found before the tender." (drainage gap → read in → tender points at the pages) ===== */
    D = 31.5; DOUT = 35.1;   // take A 33.60 s + 1.5 s tail
    AN = [[0, 0], [0.3, 0.3],
      [0.9, 3.34], [1.35, 3.79],      // red underline on "drainage." (not one of them is drainage)
      [1.5, 5.78],                    // "Not on site." pops on "Not on site"
      [3.4, 7.10], [3.7, 7.45],       // the app; Read on "Queue Ess Mee reads the pack"
      [5.3, 9.17], [7.58, 10.95],     // chips pop through "its real sections, page numbers and all"
      [8.5, 11.25],                   // the window-schedule drawer on "Tables come out as tables"
      [11.7, 13.30], [12.0, 13.47],   // the notice on "And it says what it didn't find"
      [15.15, 16.21],                 // red underline on "no drainage"
      [17.0, 19.20], [17.15, 19.40],  // bench: the drainage sheets on "Days later"
      [18.3, 21.05],                  // green tick on "turn up"
      [19.8, 22.50], [22.0, 24.45],   // "Read in." ... chips on "Drainage, found."
      [24.0, 25.45],                  // the tender pane on "So the tender points the drainlayer"
      [24.72, 27.60], [25.22, 28.70], // ticks on "drainage pages" / "The ones that exist now"
      [27.7, 29.85], [28.95, 30.30],  // end card; the button pops on "Sign up"
      [D, DOUT]];
    bench('b1', 0, 3.4, { px: 90, py: 800, rot: -3 });
    add('<div id="n1o" class="abs" style="left:70px;top:1050px;z-index:30"><div style="transform:scale(1.38);transform-origin:0 0">' + UI.note('n1in', 'n1mk') + '</div></div>');
    add('<div id="h1" class="hk">Found before<br>the tender.<br><span id="h1b" class="a">Not on site.</span></div>');
    add('<div id="lbD1" class="lbl9 drm" style="top:700px">Dramatised · demo pack · illustrative screens</div>');
    later(function () {
      Kit.scene('#n1o', 0, 3.4).scene('#h1', 0, 3.4).scene('#lbD1', 0, 3.4);
      // frame 0 = the pack already down + the headline (Shorts autoplay starts here); the notice is in by 0.3 s
      Kit.add('#b1cam', 'x', [[0, -6], [0.06, 5], [0.13, -3], [0.2, 2], [0.28, 0]]).add('#b1cam', 'y', [[0, 5], [0.07, -4], [0.15, 2], [0.26, 0]]);
      Kit.add('#b1cam', 'scale', [[0.3, 1], [3.4, 1.05, 'inOut']]);
      Kit.add('#n1o', 'y', [[0, 90], [0.3, 0, 'out']]).add('#n1o', 'opacity', [[0, 0], [0.14, 1]]);
      Kit.add('#n1mk', 'trim', [[0.9, 0], [1.35, 1, 'out']]);
      Kit.pop('#h1b', 1.5, { dy: 20 });
    });
    eyebrow(3.4, 27.7);
    chapter('c1', Story.ch1, 0.8, 14.4, 3.4, [[0, 1090, 310, 1.0], [1.6, 1090, 310, 1.0], [2.2, 560, 420, 0.92], [5.6, 560, 420, 0.92], [6.1, 1250, 330, 1.0], [8.8, 1250, 330, 1.0], [9.3, 1220, 470, 1.15], [14.4, 1220, 470, 1.2, 'linear']]);
    kicker(3.4, 17.0, 'Read the pack'); label(3.4, 17.0, ILL); ftag(3.6, 17.0, '<b>Paid plans</b> · uses AI credits');
    bench('b3', 17.0, 19.8, { px: 90, py: 960, rot: -3, sticky: [520, 470, 'ask designer:<br>drainage sheets!', -4], drain: [150, 680],
      extra: '<svg class="abs" style="left:850px;top:470px;width:120px;height:110px" viewBox="0 0 120 110"><path id="b3tkp" d="M10 60 L 44 92 L 110 12" fill="none" stroke="#15803D" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>' });
    label(17.0, 19.8, 'Dramatised', 'drm');
    later(function () {
      Kit.add('#b3dw', 'y', [[17.15, 900], [17.7, 0, 'out']]).add('#b3dw', 'opacity', [[17.15, 0], [17.25, 1]]).add('#b3dw', 'rotate', [[17.15, 6], [17.7, 0, 'out']]);
      Kit.add('#b3tkp', 'trim', [[18.3, 0], [18.7, 1, 'out']]); Kit.add('#b3cam', 'scale', [[17.0, 1], [19.8, 1.04, 'inOut']]);
    });
    chapter('c5a', Story.ch5a, 0, 4.2, 19.8, [[0, 1090, 310, 1.0], [1.1, 1090, 310, 1.0], [1.7, 600, 400, 0.88], [4.2, 600, 400, 0.9, 'linear']]);
    kicker(19.8, 24.0, 'Read the drainage PDF'); label(19.8, 27.7, ILL); ftag(20.0, 24.0, '<b>Paid plans</b> · uses AI credits');
    chapter('c5b', Story.ch5b, 8.3, 12.0, 24.0, [[8.3, 790, 400, 0.98], [12.0, 790, 400, 1.0, 'linear']]);   // pane 3 · Point them at the right sheets
    kicker(24.0, 27.7, 'Tender it');
    endCard(27.7, D);
    [[7.31, 11.20, 'QSME reads the pack into its real sections, page numbers and all.'],   // "Queue Ess Mee reads"
     [11.34, 13.35, 'Tables come out as tables.'],                                         // "Tables"
     [13.47, 15.50, 'And it says what it didn\'t find.'],                                  // "And it says"
     [15.64, 19.26, 'Heads up: no drainage. Found before anyone priced it.'],               // "Heads up"
     [19.41, 22.55, 'Days later, the drainage sheets turn up as their own PDF.'],           // "Days later"
     [22.69, 25.42, 'Read in. Drainage: found.'],                                          // "Read in"
     [25.57, 28.58, 'So the tender points the drainlayer at the drainage pages.'],          // "So the tender"
     [28.71, 29.85, 'The ones that exist now.']                                            // "The ones"
    ].forEach(function (c) { cap(c[0], c[1], c[2]); });
  } else if (cut === 'b') {
    /* ===== B · "Same lines for every bidder." (price it → the pocket becomes the tender → what the bidder sees) ===== */
    D = 26.9; DOUT = 37.4;   // take B 35.84 s + 1.5 s tail
    AN = [[0, 0],
      [3.0, 5.25], [3.15, 5.50],      // hook held through "...sees her rates. Here's how."; the pocket on "A pocket per trade"
      [3.65, 6.20], [3.85, 10.00],    // cursor waits on the badge; Draft → Active on "she makes it Active"
      [4.85, 11.30], [5.65, 12.10],   // qty typed on "A quantity", rate on "a rate"
      [6.35, 12.75],                  // line, job, pocket and Grand total tick on "the line, the job, the pocket..."
      [9.4, 16.75],                   // the tender pane on "Then the pocket becomes the tender"
      [10.2, 19.70], [10.22, 19.75],  // Select whole pocket on "Select the whole pocket"
      [10.76, 22.40],                 // the job ticks step through "its jobs and lines are the scope" to "Three of three"
      [13.6, 23.20], [14.15, 24.00],  // split on "What the drainlayer sees"
      [14.2, 25.95], [14.65, 26.68],  // Itemize clicked on "itemise"
      [14.95, 28.55], [16.5, 30.65],  // rows travel, rates blur on "Her rates and her budget are stripped"
      [17.0, 31.20],                  // boxes on "before they see it"
      [23.1, 31.45], [24.35, 31.90],  // end card; the button pops on "Sign up"
      [D, DOUT]];
    split9('h9', 0, 3.0, -4.0);
    add('<div id="hb" class="hk sm">Same lines for<br><span class="a">every bidder.</span></div>');
    later(function () { Kit.scene('#hb', 0, 3.0); Kit.add('#hb', 'scale', [[0, 1.04], [0.3, 1, 'out']]); });
    label(0, 3.0, ILL, '', 1166); add('<style>#h9 { top: 516px; }</style>');
    eyebrow(3.0, 23.1);
    chapter('c2', Story.ch2, 2.6, 9.0, 3.0, [[2.6, 430, 250, 1.3], [4.0, 430, 250, 1.3], [4.4, 1150, 470, 1.15], [9.0, 1150, 470, 1.15]]);
    kicker(3.0, 9.4, 'Price it once'); label(3.0, 13.6, ILL);
    // editor callouts: in portrait the row names are off-frame, so name the four totals that tick together
    // (output time) each callout pops on its own word: "the line" 12.80, "the job" 13.54, "the pocket" 14.14, "the Grand total" 14.95
    [['pocket', 150, 482, 14.14], ['job', 150, 541, 13.54], ['line', 150, 596, 12.80], ['Grand total', 252, 1002, 14.95]].forEach(function (k, i) {
      add('<div id="tk' + i + '" class="tk9" style="right:' + k[1] + 'px;top:' + k[2] + 'px">' + k[0] + ' →</div>');
      now(function () { Kit.scene('#tk' + i, k[3], 16.7); Kit.pop('#tk' + i, k[3], { dy: 8 }); });
    });
    chapter('c5b', Story.ch5b, 3.9, 8.1, 9.4, [[3.9, 790, 400, 0.98], [8.1, 790, 400, 1.0, 'linear']]);   // pane 2 · Select whole pocket
    kicker(9.4, 13.6, 'The pocket is the tender');
    split9('sp9', 13.6, 23.1, 13.6);
    label(13.6, 23.1, ILL); kicker(13.6, 23.1, 'What the drainlayer sees');
    endCard(23.1, D);
    [[5.44, 10.90, 'A pocket per trade. Draft first; she makes it Active.'],              // "A pocket"
     [11.04, 16.70, 'Line, job, pocket and Grand total tick up together.'],              // "A quantity"
     [16.86, 18.85, 'Then the pocket becomes the tender.'],                              // "Then the pocket"
     [18.98, 23.15, 'Select the whole pocket: its jobs and lines are the scope.'],       // "Select"
     [23.30, 26.08, 'What the drainlayer sees: the same lines.'],                        // "What the drainlayer"
     [26.22, 28.46, 'They can itemise, or quote one total.'],                            // "They can"
     [28.60, 31.45, 'Her rates and budget are stripped before they see it.']             // "Her rates"
    ].forEach(function (c) { cap(c[0], c[1], c[2]); });
  } else {
    /* ===== C · "AI drafts. You check." (Draft SOQ with AI → keep / bin → Estimate with AI → ✦ until checked) ===== */
    D = 27.6; DOUT = 32.7;   // take C 31.20 s + 1.5 s tail
    AN = [[0, 0],
      [0.9, 1.60], [2.1, 2.60],       // she edits the rate on "The AI priced three lines"; its ✦ goes on "She's fixed one"
      [2.8, 4.70],                    // hold on the two ✦ lines through "The other two still say so."
      [2.9, 5.00], [5.15, 8.00],      // AI menu on "Draft with AI"; the draft pockets on "as AI drafts"
      [6.7, 9.20], [7.8, 10.05],      // "Keep one." / "Bin the other."
      [9.5, 11.75], [13.0, 13.65],    // "Estimate with AI" / the ✦ rates fill on "the empty lines"
      [14.1, 16.40],                  // the ✦ banner on "Every AI number stays marked"
      [16.5, 19.70], [16.8, 20.60], [17.7, 22.10],   // "She swaps" / types on "supplier's figure" / ✦ goes on "its mark goes"
      [20.4, 22.98],                  // "The other two stay marked."
      [23.8, 25.80], [24.25, 26.10], [24.6, 27.20], [25.05, 27.85],   // end card: "AI drafts." / "You check." / button on "Sign up"
      [D, DOUT]];
    chapter('h3', Story.ch3, 13.6, 16.4, 0, [[0, 610, 386, 0.88]]);
    add('<div id="hc" class="hk">AI priced three.<br><span class="a">She\'s fixed one.</span></div>');
    later(function () { Kit.scene('#hc', 0, 2.8); Kit.add('#hc', 'scale', [[0, 1.04], [0.3, 1, 'out']]); });
    add('<style>#w_h3 { top: 560px; }</style>'); label(0, 2.8, ILL, '', 1192);
    eyebrow(2.8, 23.8);
    chapter('c3', Story.ch3, 0.8, 21.8, 2.8, [[0.8, 900, 330, 1.0], [1.5, 900, 330, 1.0], [1.9, 800, 370, 1.0], [2.9, 800, 370, 1.0], [3.4, 560, 420, 1.0], [6.6, 560, 420, 1.0], [7.1, 900, 330, 1.0],
      [8.0, 900, 330, 1.0], [8.3, 800, 375, 1.0], [10.6, 800, 375, 1.0], [11.0, 1010, 430, 1.2], [12.0, 1010, 430, 1.2], [12.5, 610, 386, 0.88], [14.2, 610, 386, 0.88], [14.6, 1010, 440, 1.2],
      [16.2, 1010, 440, 1.2], [16.7, 610, 386, 0.88], [21.8, 610, 386, 0.9, 'linear']]);
    kicker(2.8, 23.8, 'Fill the gaps with AI'); label(2.8, 23.8, ILL);
    ftag(3.5, 9.4, '<b>Paid plans</b> · uses AI credits'); ftag(9.4, 23.8, 'AI rates are indicative, not quotes.');
    endCard(23.8, D, 'AI drafts.', 'You check.');
    [[5.04, 9.08, 'Draft with AI adds the pockets she hasn\'t got, as AI drafts.'],      // "Draft with AI"
     [9.22, 10.98, 'Keep one. Bin the other.'],                                         // "Keep one"
     [11.12, 14.55, 'Estimate with AI prices only the empty lines.'],                   // "Then Estimate"
     [14.70, 16.33, 'Indicative, not quotes.'],                                         // "Indicative"
     [16.47, 19.42, 'Every AI number stays marked&nbsp;✦ until a person edits it.'],    // "Every AI number"
     [19.56, 22.84, 'She swaps one for her supplier\'s figure. Its mark goes.'],         // "She swaps"
     [22.98, 25.80, 'The other two stay marked. She still has to check them.']          // "The other two"
    ].forEach(function (c) { cap(c[0], c[1], c[2]); });
  }

  caps.forEach(function (c, i) { add('<div id="cap' + i + '" class="caption box"><span>' + c[2] + '</span></div>'); });
  R.innerHTML = H;
  Warp.install(AN);
  after.forEach(function (fn) { fn(); });
  Warp.restore();
  post.forEach(function (fn) { fn(); });
  caps.forEach(function (c, i) { Kit.pop('#cap' + i, c[0], { dy: 16 }); Kit.out('#cap' + i, c[1] - 0.12, 0.12); });
  Kit.ready({ duration: DOUT, fonts: ['800 60px Manrope', '500 20px Inter', '600 20px Inter', '700 20px Inter', '800 20px Inter', '400 40px Kalam', '400 40px "Permanent Marker"', '500 20px "JetBrains Mono"', '700 20px "JetBrains Mono"'] });
})();
