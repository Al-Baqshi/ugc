/* CreativeUGC motion kit: a tiny, deterministic timeline engine for video pages.
 *
 * A video page is plain HTML/CSS at the final pixel size (e.g. 1080x1920). Every
 * moving thing gets tracks; render(t) puts the page in the exact state for time t
 * (seconds). tools/motion/make.mjs calls render(t) for every frame in headless
 * Chrome and encodes an MP4. No CSS animations/transitions, no setTimeout, no
 * <video>: everything must be a pure function of t.
 *
 *   Kit.add('#title', 'opacity', [[0.2, 0], [0.5, 1, 'out']]);     // [time, value, ease-into-this-key]
 *   Kit.add('#title', 'y', [[0.2, 40], [0.6, 0, 'out']]);
 *   Kit.pop('#chip', 1.2);  Kit.out('#chip', 3.0);                 // same element + prop: keys join into one track
 *   Kit.scene('#s2', 4.0, 9.5);                                     // display:none outside the range
 *   Kit.type('#query', 5.0, 6.4);                                   // typewriter reveal of the element's text
 *   Kit.count('#price', [[2, 0], [3.2, 48500, 'out']], v => '$' + Math.round(v).toLocaleString('en-NZ'));
 *   Kit.clip('#screen', { dir: 'clips/search', t0: 2, fps: 30 });   // footage as a frame sequence in an <img>
 *   Kit.ready({ duration: 30 });                                    // last line of the page script
 *
 * Props: opacity, x, y, scale, scaleX, scaleY, rotate (deg), blur (px), width, height (px),
 *        trim (0..1 draw-on for SVG paths), clipX / clipY (0..1 reveal from left / top),
 *        color, background, borderColor, fill, stroke (hex colours), radius (px), var:--name (number).
 * Eases: linear, in, out, inOut, outBack, slam, swipe, scroll, hold (jump at the key), or [x1,y1,x2,y2].
 * Preview in a browser: open the page with #play (real-time) or #t=3.2 (still frame).
 */
(function () {
  'use strict';
  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    function sx(t) { return ((ax * t + bx) * t + cx) * t; }
    function sy(t) { return ((ay * t + by) * t + cy) * t; }
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var t = x, i, d;
      for (i = 0; i < 8; i++) { d = sx(t) - x; if (Math.abs(d) < 1e-5) return sy(t); var dd = (3 * ax * t + 2 * bx) * t + cx; if (Math.abs(dd) < 1e-6) break; t -= d / dd; }
      var lo = 0, hi = 1; t = x;
      for (i = 0; i < 30; i++) { d = sx(t); if (Math.abs(d - x) < 1e-5) break; if (x > d) lo = t; else hi = t; t = (lo + hi) / 2; }
      return sy(t);
    };
  }
  var EASE = {
    linear: function (t) { return t; },
    in: bezier(0.42, 0, 1, 1), out: bezier(0, 0, 0.58, 1), inOut: bezier(0.42, 0, 0.58, 1),
    outBack: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    slam: bezier(0.5, 0, 0.9, 0.55), swipe: bezier(0.7, 0, 0.25, 1), scroll: bezier(0.2, 0.7, 0.3, 1), hold: 'hold'
  };
  function ease(e) { if (!e) return EASE.linear; if (Array.isArray(e)) return bezier(e[0], e[1], e[2], e[3]); if (!EASE[e]) throw new Error('Kit: unknown ease ' + e); return EASE[e]; }

  var tracks = [], scenes = [], typers = [], counters = [], hooks = [], clips = [], els = new Map();
  function el(target) {
    var node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) throw new Error('Kit: no element for ' + target);
    if (!els.has(node)) els.set(node, {});
    return node;
  }
  function hex(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join(''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function mix(a, b, p) { if (typeof a === 'number') return a + (b - a) * p; var x = hex(a), y = hex(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(x[i] + (y[i] - x[i]) * p); }).join(',') + ')'; }
  function valueAt(keys, t) {
    if (t <= keys[0].t) return keys[0].v;
    for (var i = 1; i < keys.length; i++) {
      var a = keys[i - 1], b = keys[i];
      if (t < b.t) { if (b.e === 'hold') return a.v; return mix(a.v, b.v, b.e((t - a.t) / (b.t - a.t))); }
    }
    return keys[keys.length - 1].v;
  }

  var Kit = {
    ease: EASE,
    /** Add a keyframe track. keys: [[t, value, easeIntoThisKey?], ...] sorted by time. */
    add: function (target, prop, keys) {
      var node = el(target);
      var ks = keys.map(function (k) { return { t: k[0], v: k[1], e: k[2] === 'hold' ? 'hold' : ease(k[2]) }; });
      for (var i = 1; i < ks.length; i++) if (ks[i].t < ks[i - 1].t) throw new Error('Kit: keys out of order for ' + target + ' ' + prop);
      // several calls for the same element + prop (e.g. pop() then out()) join into one track
      var same = tracks.filter(function (tr) { return tr.node === node && tr.prop === prop; })[0];
      if (same) { same.keys = same.keys.concat(ks).sort(function (a, b) { return a.t - b.t; }); }
      else tracks.push({ node: node, prop: prop, keys: ks });
      return Kit;
    },
    /** Appear with a small rise. opts: { dy=36, dur=0.24, fade=0.16, ease='out' } */
    pop: function (target, t, o) { o = o || {}; var dy = o.dy == null ? 36 : o.dy; Kit.add(target, 'opacity', [[t, 0], [t + (o.fade || 0.16), 1, 'out']]); if (dy) Kit.add(target, 'y', [[t, dy], [t + (o.dur || 0.24), 0, o.ease || 'out']]); return Kit; },
    /** Scale-slam in with a hard stop. opts: { from=1.3, dur=0.14 } */
    slam: function (target, t, o) { o = o || {}; Kit.add(target, 'opacity', [[t, 0], [t + 0.04, 1]]); Kit.add(target, 'scale', [[t, o.from || 1.3], [t + (o.dur || 0.14), 1, 'slam']]); return Kit; },
    /** Fade in over [t0,t1]. */
    fade: function (target, t0, t1) { return Kit.add(target, 'opacity', [[t0, 0], [t1, 1, 'out']]); },
    /** Fade out starting at t. */
    out: function (target, t, dur) { return Kit.add(target, 'opacity', [[t, 1], [t + (dur || 0.15), 0, 'in']]); },
    /** Visible only from t0 (to t1 if given), no fade. */
    show: function (target, t0, t1) { var k = [[0, 0], [t0, 1, 'hold']]; if (t1 != null) k.push([t1, 0, 'hold']); if (t0 <= 0) k.shift(); return Kit.add(target, 'opacity', k); },
    /** A scene container exists (display) only in [t0, t1). */
    scene: function (target, t0, t1) { scenes.push({ node: el(target), t0: t0, t1: t1 }); return Kit; },
    /** Typewriter: reveal the element's text between t0 and t1 (caret optional via CSS). */
    type: function (target, t0, t1) { var node = el(target); typers.push({ node: node, text: node.textContent, t0: t0, t1: t1 }); return Kit; },
    /** Animated number/text: keys of numbers, fmt(value) -> string. */
    count: function (target, keys, fmt) { var node = el(target); counters.push({ node: node, keys: keys.map(function (k) { return { t: k[0], v: k[1], e: k[2] === 'hold' ? 'hold' : ease(k[2]) }; }), fmt: fmt || function (v) { return String(Math.round(v)); } }); return Kit; },
    /** Footage: show a frame sequence in an <img>. o: { dir, t0, t1?, fps=30, from=0, speed=1, frames? (count) , stamps? (array of seconds, from capture.mjs frames.json) }
     *  Frame files are dir/f_00000.png … (make them with tools/motion/frames or tools/motion/capture.mjs). */
    clip: function (target, o) {
      var node = el(target), n = o.frames || (o.stamps ? o.stamps.length : 1e9), fps = o.fps || 30, sp = o.speed || 1;
      clips.push({ node: node, o: o, frameAt: function (t) {
        var local = Math.max(0, (t - o.t0) * sp);
        var i;
        if (o.stamps) { var target2 = local + (o.stamps[o.from || 0] || 0); i = o.from || 0; while (i + 1 < o.stamps.length && o.stamps[i + 1] <= target2) i++; }
        else i = Math.min(n - 1, (o.from || 0) + Math.floor(local * fps + 1e-6));
        return o.dir + '/f_' + String(i).padStart(5, '0') + (o.ext || '.png');
      } });
      return Kit;
    },
    /** Resolves when every <img> on the page has finished loading (make.mjs awaits it before each frame). */
    settle: function () {
      return Promise.all(Array.prototype.map.call(document.images, function (im) {
        if (im.complete && im.naturalWidth) return null;
        return new Promise(function (r) { im.onload = r; im.onerror = r; });
      }));
    },
    /** Custom per-frame hook: fn(t). Must be a pure function of t. */
    each: function (fn) { hooks.push(fn); return Kit; },

    render: function (t) {
      var i, state = new Map();
      for (i = 0; i < scenes.length; i++) { var s = scenes[i]; s.node.style.display = (t >= s.t0 && t < s.t1) ? '' : 'none'; }
      for (i = 0; i < tracks.length; i++) { var tr = tracks[i]; if (!state.has(tr.node)) state.set(tr.node, {}); state.get(tr.node)[tr.prop] = valueAt(tr.keys, t); }
      state.forEach(function (p, node) {
        var st = node.style, tf = '';
        if (p.x != null || p.y != null) tf += 'translate(' + (p.x || 0) + 'px,' + (p.y || 0) + 'px) ';
        if (p.rotate != null) tf += 'rotate(' + p.rotate + 'deg) ';
        if (p.scale != null) tf += 'scale(' + p.scale + ') ';
        if (p.scaleX != null || p.scaleY != null) tf += 'scale(' + (p.scaleX == null ? 1 : p.scaleX) + ',' + (p.scaleY == null ? 1 : p.scaleY) + ') ';
        if (tf) st.transform = tf;
        if (p.opacity != null) { st.opacity = p.opacity; st.visibility = p.opacity <= 0.001 ? 'hidden' : 'visible'; }
        if (p.blur != null) st.filter = p.blur > 0.05 ? 'blur(' + p.blur + 'px)' : 'none';
        if (p.width != null) st.width = p.width + 'px';
        if (p.height != null) st.height = p.height + 'px';
        if (p.radius != null) st.borderRadius = p.radius + 'px';
        if (p.trim != null) { node.setAttribute('pathLength', '1'); st.strokeDasharray = '1 1'; st.strokeDashoffset = String(1 - p.trim); st.visibility = p.trim <= 0.0001 ? 'hidden' : (p.opacity != null && p.opacity <= 0.001 ? 'hidden' : 'visible'); }
        if (p.clipX != null) st.clipPath = 'inset(0 ' + (100 - p.clipX * 100) + '% 0 0)';
        if (p.clipY != null) st.clipPath = 'inset(0 0 ' + (100 - p.clipY * 100) + '% 0)';
        if (p.color != null) st.color = p.color;
        if (p.background != null) st.background = p.background;
        if (p.borderColor != null) st.borderColor = p.borderColor;
        if (p.fill != null) st.fill = p.fill;
        if (p.stroke != null) st.stroke = p.stroke;
        for (var k in p) if (k.indexOf('var:') === 0) st.setProperty(k.slice(4), p[k]);
      });
      for (i = 0; i < typers.length; i++) { var ty = typers[i], pr = Math.max(0, Math.min(1, (t - ty.t0) / (ty.t1 - ty.t0))); ty.node.textContent = ty.text.slice(0, Math.round(ty.text.length * pr)); }
      for (i = 0; i < counters.length; i++) { var c = counters[i]; c.node.textContent = c.fmt(valueAt(c.keys, t)); }
      for (i = 0; i < clips.length; i++) { var cl = clips[i], src = cl.frameAt(t); if (t >= cl.o.t0 && (cl.o.t1 == null || t < cl.o.t1) && cl.node.getAttribute('src') !== src) cl.node.setAttribute('src', src); }
      for (i = 0; i < hooks.length; i++) hooks[i](t);
    },

    /** Call last. opts: { duration (s, required), fonts?: ['800 60px Manrope', ...] } */
    ready: function (opts) {
      if (!opts || !opts.duration) throw new Error('Kit.ready needs { duration }');
      window.render = Kit.render;
      window.__ready = (async function () {
        if (opts.fonts) await Promise.all(opts.fonts.map(function (f) { return document.fonts.load(f); }));
        await document.fonts.ready;
        Kit.render(0);   // sets clip frames before the image check
        await Promise.all(Array.prototype.map.call(document.images, function (im) {
          if (!im.getAttribute('src')) return null;
          return im.complete ? (im.naturalWidth ? null : Promise.reject(new Error('image failed: ' + im.src))) : new Promise(function (r, j) { im.onload = r; im.onerror = function () { j(new Error('image failed: ' + im.src)); }; });
        }));
        var root = document.getElementById('root') || document.body;
        var W = root.offsetWidth, H = root.offsetHeight;
        return { duration: opts.duration, width: W, height: H, tracks: tracks.length, scenes: scenes.length };
      })();
      var m = location.hash.match(/t=([\d.]+)/);
      if (m) window.__ready.then(function () { Kit.render(parseFloat(m[1])); });
      if (location.hash.indexOf('play') >= 0) window.__ready.then(function () {
        var t0 = performance.now();
        (function loop() { var t = ((performance.now() - t0) / 1000) % (opts.duration + 0.5); Kit.render(Math.min(t, opts.duration)); requestAnimationFrame(loop); })();
      });
    },

    /** QA helper used by make.mjs: visible text boxes outside the safe box at time t. */
    overflow: function (t, safe) {
      Kit.render(t);
      var root = document.getElementById('root') || document.body, R = root.getBoundingClientRect(), bad = [];
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) {
        if (!n.textContent.trim()) continue;
        var p = n.parentElement, cs = getComputedStyle(p);
        if (p.closest('[data-qa-ignore]')) continue;
        var hidden = false;
        for (var a = p; a && a !== root.parentElement; a = a.parentElement) { var c = getComputedStyle(a); if (c.display === 'none' || c.visibility === 'hidden' || parseFloat(c.opacity) < 0.05) { hidden = true; break; } }
        if (hidden) continue;
        var rg = document.createRange(); rg.selectNodeContents(n); var b = rg.getBoundingClientRect();
        if (!b.width || !b.height) continue;
        var x0 = b.left - R.left, y0 = b.top - R.top, x1 = b.right - R.left, y1 = b.bottom - R.top;
        if (x1 < 0 || y1 < 0 || x0 > R.width || y0 > R.height) continue;   // fully off-canvas (mid-transition)
        var s = safe || { x0: 0, y0: 0, x1: R.width, y1: R.height };
        if (x0 < s.x0 - 1 || y0 < s.y0 - 1 || x1 > s.x1 + 1 || y1 > s.y1 + 1) bad.push({ text: n.textContent.trim().slice(0, 50), box: [Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1)], size: cs.fontSize });
      }
      return bad;
    }
  };
  window.Kit = Kit;
})();
