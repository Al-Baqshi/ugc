/* warp.js: audio-first re-timing (2026-10-06, the N01 standard). Each page is still AUTHORED on its original timeline
   (pricing-a-build.html constants, cut.js clocks, story.js chapter times) and re-timed through a piecewise-linear map
   W(): ANCHORS = [[authored_s, output_s], …], every anchor pinned to the start of the word it belongs to in
   outputs/vo-take-cam-v3[-a|-b|-c]/alignment.json (the comment on each anchor names the word). Between anchors the design
   plays as authored, slightly stretched or squeezed; a repeated output time holds the picture while the voice carries on.
   Warp.install(anchors) wraps Kit.add / scene / type / count / clip so every authored key lands on its word;
   Warp.restore() puts the originals back, after which captions are added in OUTPUT time (lifted from the narration). */
(function () {
  'use strict';
  var AN = null, orig = null;
  function W(t) {
    var n = AN.length, i;
    if (t <= AN[0][0]) return +(AN[0][1] + (t - AN[0][0])).toFixed(4);
    if (t >= AN[n - 1][0]) return +(AN[n - 1][1] + (t - AN[n - 1][0])).toFixed(4);
    for (i = 1; i < n; i++) if (t <= AN[i][0]) { var a = AN[i - 1], b = AN[i]; return +(a[1] + (b[1] - a[1]) * (t - a[0]) / (b[0] - a[0])).toFixed(4); }
    return t;
  }
  function wk(keys) { return keys.map(function (k) { var c = k.slice(); c[0] = W(k[0]); return c; }); }
  window.Warp = {
    W: W,
    install: function (an) {
      AN = an;
      for (var i = 1; i < AN.length; i++) if (!(AN[i][0] > AN[i - 1][0]) || !(AN[i][1] >= AN[i - 1][1])) throw new Error('Warp: anchors out of order at ' + AN[i]);
      orig = { add: Kit.add, scene: Kit.scene, type: Kit.type, count: Kit.count, clip: Kit.clip };
      Kit.add = function (target, prop, keys) { return orig.add.call(Kit, target, prop, wk(keys)); };
      Kit.scene = function (target, t0, t1) { return orig.scene.call(Kit, target, W(t0), W(t1)); };
      Kit.type = function (target, t0, t1) { return orig.type.call(Kit, target, W(t0), W(t1)); };
      Kit.count = function (target, keys, fmt) { return orig.count.call(Kit, target, wk(keys), fmt); };
      Kit.clip = function (target, o) { var c = {}; for (var k in o) c[k] = o[k]; c.t0 = W(o.t0); if (o.t1 != null) c.t1 = W(o.t1); return orig.clip.call(Kit, target, c); };
    },
    restore: function () { if (!orig) return; Kit.add = orig.add; Kit.scene = orig.scene; Kit.type = orig.type; Kit.count = orig.count; Kit.clip = orig.clip; orig = null; }
  };
})();
