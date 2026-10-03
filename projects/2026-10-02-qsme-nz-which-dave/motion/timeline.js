// Which Dave — reel body motion timeline (shared by reel-body.html and the Figma use_figma script).
// Times are seconds from the start of the reel BODY (= post.json reel time minus 2.5s).
// Fields use Figma motion names: OPACITY, TRANSLATION_X, TRANSLATION_Y, SCALE_XY, ROTATION (deg, + = counter-clockwise),
// HEIGHT, CORNER_RADIUS, TRIM (PATH_TRIM_END on the vector), BLUR (effects[0].RADIUS), FILL (fills[0] colour, hex).
// M = measured layout: {cardTop, cardH, itemTop:[...19] (list coords), listY0 (screen y of list top at rest), t2W, t2H}
function makeTimeline(M) {
  var E = {
    L: { type: 'LINEAR' }, I: { type: 'EASE_IN' }, O: { type: 'EASE_OUT' }, IO: { type: 'EASE_IN_AND_OUT' },
    H: { type: 'HOLD' }, OB: { type: 'EASE_OUT_BACK' },
    SCROLL: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.2, y1: 0.7, x2: 0.3, y2: 1 } },
    SLAM: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.5, y1: 0, x2: 0.9, y2: 0.55 } },
    SWIPE: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.7, y1: 0, x2: 0.25, y2: 1 } }
  };
  var T = [];
  function add(id, f, k) { T.push({ id: id, f: f, k: k.map(function (a) { return { t: a[0], v: a[1], e: a[2] || E.L }; }) }); }
  function pop(id, t) { add(id, 'OPACITY', [[t, 0], [t + 0.16, 1, E.O]]); add(id, 'TRANSLATION_Y', [[t, 36], [t + 0.24, 0, E.O]]); }
  function showAt(id, t) { add(id, 'OPACITY', [[0, 0], [t, 1, E.H]]); }
  var top = M.itemTop;
  // scroll offsets: list TRANSLATION_Y so a given item top lands at a screen y (list top at rest = M.listY0)
  var S = function (i, screenY) { return Math.round(screenY - M.listY0 - top[i]); };
  var S1 = S(2, 840), S2 = S(3, 820), S3 = S(12, 640), S4 = S(17, 640);

  // ---- 0.00–1.05  Mel's post card fills the screen, underline draws, card collapses into the pinned strip
  add('u1', 'OPACITY', [[0.14, 0], [0.15, 1, E.H]]);
  add('u1', 'TRIM', [[0.15, 0], [0.5, 1, E.O]]);
  // the card content shrinks toward the strip's centre (y 350) while fading; its background morphs into the strip
  add('card', 'OPACITY', [[0.82, 1], [0.94, 0]]);
  add('card', 'TRANSLATION_Y', [[0.8, 0], [1.02, Math.round(350 - (M.cardTop + M.cardH / 2)), E.IO]]);
  add('card', 'SCALE_XY', [[0.8, 1], [1.02, 0.55, E.IO]]);
  add('morph', 'TRANSLATION_Y', [[0.8, 0], [1.02, 300 - M.cardTop, E.IO]]);
  add('morph', 'HEIGHT', [[0.8, M.cardH], [1.02, 100, E.IO]]);
  add('morph', 'CORNER_RADIUS', [[0.8, 20], [1.02, 12, E.IO]]);
  add('morph', 'FILL', [[0.8, '#FFFFFF'], [1.02, '#F1F0EC', E.IO]]);
  add('pinned', 'OPACITY', [[0.96, 0], [1.08, 1, E.O]]);
  add('pinned', 'TRANSLATION_Y', [[0.96, 12], [1.08, 0, E.O]]);

  // ---- comments pop in (thread text 50px)
  pop('c0', 1.0);    // Kerry P. — holds 0.9s
  pop('c1', 1.9);    // Sam T. — holds 1.1s
  pop('c2', 3.05);   // Aroha W. — stop 1.2s
  pop('c3', 4.4);    // Jase M. — stop 1.4s
  for (var i = 4; i <= 12; i++) showAt('c' + i, 5.9);   // Following x3, filler comments, Dave K. (enter from below during the fling)
  for (var j = 13; j <= 16; j++) showAt('c' + j, 8.5);  // filler comments 142–210
  pop('c17', 8.8);   // Mel R. ...is anyone here licensed?
  pop('c18', 9.4);   // Kerry P. Dave is.  (0.6s later)

  // ---- thread scroll: scroll, stop, scroll, fling + SLAM on Dave, then scroll to the last two comments
  add('list', 'TRANSLATION_Y', [
    [3.0, 0], [3.15, S1, E.SCROLL], [4.35, S1], [4.5, S2, E.SCROLL],
    [5.9, S2], [6.5, S3 - 18, E.SLAM], [6.62, S3, E.O],
    [8.5, S3], [8.8, S4, E.IO]
  ]);
  add('list', 'BLUR', [[5.9, 0], [6.1, 7, E.I], [6.42, 7], [6.5, 0], [8.5, 0], [8.6, 4, E.I], [8.72, 4], [8.8, 0]]);
  add('circle', 'OPACITY', [[6.64, 0], [6.65, 1, E.H]]);
  add('circle', 'TRIM', [[6.65, 0], [7.0, 1, E.O]]);

  // ---- red-marker tally: 1 -> 3 -> 6 (ish) -> ?   (separate text nodes, cross-faded)
  add('tlabel', 'OPACITY', [[1.15, 0], [1.25, 1, E.O]]);
  add('tlabel', 'SCALE_XY', [[1.15, 1.18], [1.35, 1, E.O]]);
  add('tv1', 'OPACITY', [[1.15, 0], [1.25, 1, E.O], [2.17, 1], [2.25, 0]]);
  add('tv1', 'SCALE_XY', [[1.15, 1.4], [1.35, 1, E.O]]);
  add('x1', 'OPACITY', [[2.04, 0], [2.05, 1, E.H], [2.17, 1], [2.25, 0]]);
  add('x1', 'TRIM', [[2.05, 0], [2.17, 1, E.O]]);
  add('tv3', 'OPACITY', [[2.2, 0], [2.28, 1, E.O], [6.17, 1], [6.25, 0]]);
  add('tv3', 'SCALE_XY', [[2.2, 1.4], [2.4, 1, E.O]]);
  add('x3', 'OPACITY', [[6.0, 0], [6.01, 1, E.H], [6.17, 1], [6.25, 0]]);
  add('x3', 'TRIM', [[6.01, 0], [6.13, 1, E.O]]);
  add('tv6', 'OPACITY', [[6.2, 0], [6.28, 1, E.O], [7.07, 1], [7.15, 0]]);
  add('tv6', 'SCALE_XY', [[6.2, 1.4], [6.4, 1, E.O]]);
  add('x6', 'OPACITY', [[6.94, 0], [6.95, 1, E.H], [7.07, 1], [7.15, 0]]);
  add('x6', 'TRIM', [[6.95, 0], [7.07, 1, E.O]]);
  add('tvq', 'OPACITY', [[7.1, 0], [7.18, 1, E.O]]);
  add('tvq', 'SCALE_XY', [[7.1, 1.5], [7.32, 1, E.O]]);
  add('tinner', 'ROTATION', [[5.95, 0], [6.02, 5], [6.09, -4], [6.16, 4], [6.23, -3], [6.3, 0, E.O]]);
  add('tinner', 'TRANSLATION_X', [[5.95, 0], [6.02, -6], [6.09, 6], [6.16, -5], [6.23, 4], [6.3, 0, E.O]]);

  // ---- 10.6–11.0 the app swipes away to the QSME screen
  add('app', 'TRANSLATION_X', [[10.6, 0], [11.0, -1080, E.SWIPE]]);
  add('qsme', 'TRANSLATION_X', [[10.6, 0], [11.0, -1080, E.SWIPE]]);

  // ---- placeholder "moment" chips (editor cues for which real recording goes where)
  add('m1', 'OPACITY', [[12.95, 1], [13.05, 0]]);
  add('m2', 'OPACITY', [[12.95, 0], [13.05, 1], [15.45, 1], [15.55, 0]]);
  add('m3', 'OPACITY', [[15.45, 0], [15.55, 1], [18.45, 1], [18.55, 0]]);
  add('m4', 'OPACITY', [[18.45, 0], [18.55, 1]]);

  // ---- on-screen text (captions over the QSME recording)
  add('cap1', 'OPACITY', [[11.05, 0], [11.25, 1, E.O], [12.85, 1], [13.0, 0]]);
  add('cap1', 'TRANSLATION_Y', [[11.05, 30], [11.3, 0, E.O], [12.85, 0], [13.0, -24, E.I]]);
  add('cap2', 'OPACITY', [[13.05, 0], [13.25, 1, E.O], [18.3, 1], [18.45, 0]]);
  add('cap2', 'TRANSLATION_Y', [[13.05, 30], [13.3, 0, E.O], [18.3, 0], [18.45, -24, E.I]]);
  add('cap3', 'OPACITY', [[15.5, 0], [15.7, 1, E.O], [18.3, 1], [18.45, 0]]);
  add('cap3', 'TRANSLATION_Y', [[15.5, 30], [15.75, 0, E.O], [18.3, 0], [18.45, -24, E.I]]);

  // ---- 18.5 payoff: tally redrawn "Dave count: 1" + tick (the ding), "Know which Dave."
  add('t2label', 'OPACITY', [[18.55, 0], [18.65, 1, E.O]]);
  add('t2label', 'SCALE_XY', [[18.55, 1.18], [18.75, 1, E.O]]);
  add('t2v', 'OPACITY', [[18.55, 0], [18.65, 1, E.O]]);
  add('t2v', 'SCALE_XY', [[18.55, 1.4], [18.75, 1, E.O]]);
  add('tick', 'OPACITY', [[18.79, 0], [18.8, 1, E.H]]);
  add('tick', 'TRIM', [[18.8, 0], [19.0, 1, E.O]]);
  add('cap4', 'OPACITY', [[18.65, 0], [18.85, 1, E.O], [22.8, 1], [22.95, 0]]);
  add('cap4', 'SCALE_XY', [[18.65, 0.9], [18.95, 1, E.OB]]);

  // ---- 23.0 end card
  add('end', 'OPACITY', [[22.95, 0], [23.25, 1, E.O]]);
  add('logo', 'OPACITY', [[23.1, 0], [23.4, 1, E.O]]);
  add('logo', 'SCALE_XY', [[23.1, 0.94], [23.5, 1, E.O]]);
  add('ctaA', 'OPACITY', [[23.35, 0], [23.55, 1, E.O]]);
  add('ctaA', 'TRANSLATION_Y', [[23.35, 28], [23.6, 0, E.O]]);
  add('ctaB', 'OPACITY', [[23.5, 0], [23.7, 1, E.O]]);
  add('ctaB', 'TRANSLATION_Y', [[23.5, 28], [23.75, 0, E.O]]);
  add('ctaC', 'OPACITY', [[23.65, 0], [23.85, 1, E.O]]);
  add('ctaC', 'TRANSLATION_Y', [[23.65, 28], [23.9, 0, E.O]]);
  // tally tick carries over small in the upper-left corner (x 80, y 330)
  var k = 0.6, dx = Math.round(-(1 - k) / 2 * M.t2W), dy = Math.round(330 - 420 - (1 - k) / 2 * M.t2H);
  add('tally2', 'SCALE_XY', [[23.0, 1], [23.4, k, E.IO]]);
  add('tally2', 'TRANSLATION_X', [[23.0, 0], [23.4, dx, E.IO]]);
  add('tally2', 'TRANSLATION_Y', [[23.0, 0], [23.4, dy, E.IO]]);

  return { duration: 27.5, tracks: T, scroll: { S1: S1, S2: S2, S3: S3, S4: S4 } };
}
if (typeof module !== 'undefined') module.exports = { makeTimeline: makeTimeline };
