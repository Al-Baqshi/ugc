/* Auckland first (we know). One timeline, three cuts: body.r16x9 (YouTube/Facebook master), body.r9x16 (Reels/TikTok
 * full version) and body.r9x16.short (35-45 s Reels/TikTok cut: hook, Dunedin, table, "We know.", CTA).
 * Footage: real public qsme.co.nz homepage searches recorded 2 Oct 2026 (keystrokes.mjs per-keystroke screenshots,
 * stills.mjs hi-res result stills). Test addresses are the councils' own buildings (public, no private homes).
 * Other addresses in the live autocomplete are blurred (af-redact.js); only the council's own row stays sharp.
 * Owner CTA rule (3 Oct): the homepage's own "Free to join." line is covered by a patch of the hero background beside it
 * (af-hush.js, made by hush-rows.swift). CTA copy pushes sign-ups; no pricing or no-account lines anywhere.
 * Everything here is a pure function of t (Kit contract). Data: af-data.js, af-redact.js, nz-outline.js.
 *
 * Timing: the page is AUTHORED on the original 80 s timeline and re-timed by W() below (review of 2 Oct):
 * +0.6 s for the Dunedin joke, +0.9 s for the Wellington beat, +2.5 s hold on the finished table, -0.5 s from the
 * checklist hold; the quote beat is folded under "We know." and the end card is 5.2 s. Output length: W(END_A). */
(function () {
  'use strict';
  var HZ = document.body.classList.contains('r16x9');
  var SHORT = document.body.classList.contains('short');
  var root = document.getElementById('root');
  var E = Kit.ease, D = window.AF, NZ = window.NZ, RED = window.AF_REDACT, HUSH = window.AF_HUSH || {};

  // ------------------------------------------------------------------ authoring time -> output time
  var INSERTS = [[20.9, 0.6], [35.0, 0.9], [53.0, 2.5]];   // [authoring t, seconds of hold added there]
  var CUTS = [[61.6, 62.1]];                                // [from, to]: authoring seconds removed (a static hold)
  function W(t) {
    var o = t;
    INSERTS.forEach(function (d) { if (t >= d[0]) o += d[1]; });
    CUTS.forEach(function (c) { o -= Math.max(0, Math.min(t, c[1]) - c[0]); });
    return +o.toFixed(4);
  }
  var _add = Kit.add, _scene = Kit.scene;
  Kit.add = function (target, prop, keys) { return _add.call(Kit, target, prop, keys.map(function (k) { var c = k.slice(); c[0] = W(k[0]); return c; })); };
  Kit.scene = function (target, t0, t1) { return _scene.call(Kit, target, W(t0), W(t1)); };
  var END_A = 72.85, DUR = W(END_A);

  // ------------------------------------------------------------------ helpers
  function mk(tag, cls, parent, css, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (css) for (var k in css) e.style[k] = typeof css[k] === 'number' && k !== 'opacity' && k !== 'zIndex' && k !== 'lineHeight' ? css[k] + 'px' : css[k];
    if (html != null) e.innerHTML = html;
    (parent || root).appendChild(e);
    return e;
  }
  function T(parent, x, y, cls, html, css) { css = css || {}; css.left = x; css.top = y; return mk('div', 't ' + (cls || ''), parent, css, html); }
  function popIn(el, t, dy, dur) { Kit.add(el, 'opacity', [[t, 0], [t + 0.18, 1, 'out']]); Kit.add(el, 'y', [[t, dy == null ? 26 : dy], [t + (dur || 0.32), 0, 'out']]); }
  function outAt(el, t, d) { Kit.add(el, 'opacity', [[t, 1], [t + (d || 0.18), 0, 'in']]); }
  function hide0(el) { Kit.add(el, 'opacity', [[0, 0]]); }
  function slamIn(el, t, from) { Kit.add(el, 'opacity', [[t, 0], [t + 0.05, 1]]); Kit.add(el, 'scale', [[t, from || 1.18], [t + 0.2, 1, 'out']]); }
  function frame(dir, i) { return 'clips/' + dir + '/f_' + String(i).padStart(5, '0') + '.jpg'; }
  function nearest(arr, v) { var b = 0; for (var i = 1; i < arr.length; i++) if (Math.abs(arr[i] - v) < Math.abs(arr[b] - v)) b = i; return b; }

  /** camera over a group: keys [t, cx, cy, s, ease] in page CSS px (authoring t); focal point (fx, fy) in window px. */
  function camera(camEl, fx, fy, keys) {
    var ks = keys.map(function (k) { return { t: W(k[0]), cx: k[1], cy: k[2], s: k[3], e: E[k[4] || 'inOut'] }; });
    Kit.each(function (t) {
      var a = ks[0], b = ks[0], p = 0, i;
      if (t >= ks[ks.length - 1].t) { a = b = ks[ks.length - 1]; }
      else if (t > ks[0].t) { for (i = 1; i < ks.length; i++) if (t < ks[i].t) { a = ks[i - 1]; b = ks[i]; p = b.e((t - a.t) / (b.t - a.t)); break; } }
      var s = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * p);
      var cx = a.cx + (b.cx - a.cx) * p, cy = a.cy + (b.cy - a.cy) * p;
      camEl.style.transform = 'translate(' + (fx - s * cx).toFixed(2) + 'px,' + (fy - s * cy).toFixed(2) + 'px) scale(' + s.toFixed(4) + ')';
    });
  }

  /** the patch over the homepage's "Free to join." line: its box in layer px (image rect r, image top y0) and the clone
   *  offset (16:9 copies the empty hero background just left of it; 9:16 the flat wall just below it, above the map). */
  function hushBox(r, y0) {
    var px = HZ ? 26 : 34, py = HZ ? 14 : 8, w = r[2] - r[0] + 2 * px, h = r[3] - r[1] + 2 * py;
    return { x: r[0] - px, y: r[1] + y0 - py, w: w, h: h, dx: HZ ? -w : 0, dy: HZ ? 0 : h + 1 };
  }

  /** crop of a hi-res still (page-coord rect) into a box of width w. */
  function crop(parent, still, r, x, y, w, pad, frameSrc) {
    var st = D.stills[still], p = pad || 0;
    var cssW = st.css_viewport[0], k = w / (r[2] - r[0] + 2 * p), h = (r[3] - r[1] + 2 * p) * k;
    var box = mk('div', 'crop', parent, { left: x, top: y, width: w, height: h });
    var img = mk('img', '', box, { width: cssW * k, left: -(r[0] - p) * k, top: -(r[1] - p - (frameSrc ? frameSrc.top : st.clip_y)) * k });
    img.src = frameSrc ? frameSrc.src : 'stills/' + still + '.jpg';
    return { el: box, h: h };
  }

  /** stylised NZ outline with pins; returns pin positions in root px. */
  function nzMap(parent, x, y, sc) {
    var w = NZ.w * sc, h = NZ.h * sc;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'nzmap'); svg.setAttribute('width', w); svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 ' + NZ.w + ' ' + NZ.h);
    svg.style.left = x + 'px'; svg.style.top = y + 'px';
    NZ.paths.forEach(function (d) { var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); p.setAttribute('class', 'land'); p.style.strokeWidth = (2.4 / sc).toFixed(2); svg.appendChild(p); });
    parent.appendChild(svg);
    var pins = {};
    for (var k in NZ.pins) pins[k] = [x + NZ.pins[k][0] * sc, y + NZ.pins[k][1] * sc];
    return { svg: svg, pins: pins, w: w, h: h };
  }
  function pin(parent, xy, cls) { var p = mk('div', 'pin ' + (cls || ''), parent, { left: xy[0], top: xy[1] }); mk('b', '', p); mk('i', '', p); return p; }
  function pinDrop(p, t) { Kit.add(p, 'opacity', [[t, 0], [t + 0.06, 1]]); Kit.add(p, 'y', [[t, -46], [t + 0.22, 0, 'slam']]); var ring = p.querySelector('b'); Kit.add(ring, 'opacity', [[0, 0], [t + 0.2, 0], [t + 0.24, 0.9], [t + 0.75, 0, 'out']]); Kit.add(ring, 'scale', [[t + 0.2, 0.3], [t + 0.75, 1.5, 'out']]); }
  function wire(parent, a, b, t) {
    var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy);
    var w = mk('div', 'wire', parent, { left: a[0], top: a[1] - 1, width: len, transform: 'rotate(' + Math.atan2(dy, dx) * 180 / Math.PI + 'deg)' });
    var inner = mk('div', '', w, { position: 'absolute', left: 0, top: 0, width: len, height: 2, background: 'rgba(61,192,35,.75)' });
    w.style.background = 'none';
    Kit.add(inner, 'clipX', [[0, 0], [t, 0], [t + 0.25, 1, 'out']]);
    return w;
  }

  // ------------------------------------------------------------------ layout constants
  var SM = 950 / 390;   // 9:16: the phone page at full window width
  var L = HZ ? {
    win: { x: 740, y: 54, w: 1084, h: 972, fx: 542, fy: 486, r: 22 },
    panel: { x: 96, chipY: 64, titleY: 122, titleSize: 96, footY: 322, capY: 414, capSize: 50, capW: 604 },
    tag: { x: 20, y: 20 }, topShade: 104,
  } : {
    // the capture window stops above the pills band (pills get their own navy band, never over product UI)
    win: { x: 65, y: 640, w: 950, h: 462, fx: 475, fy: 231, r: 24 },
    panel: { x: 65, chipY: 300, titleY: 348, titleSize: 86, footY: 566, capY: 452, capSize: 46, capW: 950 },
    tag: { x: 14, y: 12 }, topShade: 86,
  };

  // ------------------------------------------------------------------ scene: HOOK (0 – 5.4)
  var hook = mk('div', 'fill', root);
  Kit.scene(hook, 0, 5.45);
  (function () {
    var cardDefs = [
      { k: 'akl', name: 'Auckland', still: 'akl-d', t: 0.32 },
      { k: 'chc', name: 'Christchurch', still: 'chc-d', t: 0.62 },
      { k: 'dun', name: 'Dunedin', still: 'dun-d', t: 0.92 },
    ];
    var pinKey = { akl: 'auckland', chc: 'christchurch', dun: 'dunedin' };
    if (HZ) {
      T(hook, 96, 196, 'kicker', 'Council by council');
      T(hook, 96, 248, 'title', 'Not in<br>Auckland?', { fontSize: 132 });
      var sub = T(hook, 96, 538, 'cap dimtext', 'Here’s exactly what site search shows you.', { fontSize: 56, width: 740, color: 'var(--ink-70)' });
      popIn(sub, 0.25, 18);
      var real = T(hook, 96, 700, 'src', 'Real searches · qsme.co.nz · 2 Oct 2026');
      popIn(real, 1.6, 10);
      var m = nzMap(hook, 812, 96, 0.9);
      var cx = 1488, cw = 336, ys = { akl: 106, chc: 600, dun: 858 };
      cardDefs.forEach(function (c) {
        var r = D.stills[c.still].rects.card;
        var hc = mk('div', 'hcard', hook, { left: cx, top: ys[c.k] });
        var cr = crop(hc, c.still, r, 0, 0, cw, 0);
        T(hc, 0, -40, 'lbl', c.name.toUpperCase());
        var p = pin(hook, m.pins[pinKey[c.k]]);
        pinDrop(p, c.t - 0.2);
        wire(hook, m.pins[pinKey[c.k]], [cx - 8, ys[c.k] + Math.min(cr.h / 2, 60)], c.t - 0.02);
        popIn(hc, c.t, 0); Kit.add(hc, 'x', [[c.t, 40], [c.t + 0.35, 0, 'out']]);
      });
      Kit.add(hook, 'opacity', [[4.95, 1], [5.4, 0, 'in']]);
      Kit.add(m.svg, 'scale', [[4.6, 1], [5.4, 1.12, 'in']]);
    } else {
      T(hook, 65, 300, 'kicker', 'Council by council', { fontSize: 24, lineHeight: 1.25 });
      T(hook, 65, 380, 'title', 'Not in<br>Auckland?', { fontSize: 128 });
      var sub2 = T(hook, 65, 650, 'cap', 'Here’s exactly what site search shows you.', { fontSize: 48, width: 950, color: 'var(--ink-70)' });
      popIn(sub2, 0.25, 18);
      var m2 = nzMap(hook, 742, 300, 0.36);
      var pos2 = { akl: [65, 820], chc: [545, 820], dun: [545, 1062] }, cw2 = 470;
      cardDefs.forEach(function (c) {
        var r = D.stills[c.still].rects.card;
        var hc = mk('div', 'hcard', hook, { left: pos2[c.k][0], top: pos2[c.k][1] });
        crop(hc, c.still, r, 0, 0, cw2, 0);
        T(hc, 0, -40, 'lbl', c.name.toUpperCase(), { fontSize: 23 });
        var p = pin(hook, m2.pins[pinKey[c.k]], 'small');
        p.style.transform = 'scale(.62)';
        Kit.add(p, 'opacity', [[c.t - 0.2, 0], [c.t - 0.12, 1]]);
        popIn(hc, c.t, 40);
      });
      var real2 = T(hook, 545, 1224, 'src', 'Real searches · qsme.co.nz · 2 Oct 2026', { fontSize: 18, letterSpacing: '.02em', whiteSpace: 'nowrap' });
      popIn(real2, 1.6, 10);
      Kit.add(hook, 'opacity', [[4.95, 1], [5.4, 0, 'in']]);
    }
  })();

  // ------------------------------------------------------------------ scene: MAIN (5.4 – 63.4): panel + capture window
  var main = mk('div', 'fill', root);
  Kit.scene(main, 5.3, 63.45);
  Kit.add(main, 'opacity', [[5.3, 0], [5.55, 1, 'out']]);

  var win = mk('div', 'win', main, { left: L.win.x, top: L.win.y, width: L.win.w, height: L.win.h, borderRadius: L.win.r, boxShadow: '0 0 0 2px #1E293B, 0 30px 80px rgba(0,0,0,.55)' });
  Kit.add(win, 'x', [[5.3, HZ ? 80 : 0], [5.75, 0, 'out']]);
  if (!HZ) Kit.add(win, 'y', [[5.3, 60], [5.75, 0, 'out']]);

  /** a page group in the window: keystroke frames (typing) + the settled hi-res result still with a spotlight. */
  function group(key) {
    var mode = HZ ? 'd' : 'm';
    var g = mk('div', 'grp', win), cam = mk('div', 'cam', g);
    var still = D.stills[key + '-' + mode];
    var vw = still.css_viewport[0], vh = still.css_viewport[1];
    var kdir = key + '-' + mode + 'k', kd = D.clips[kdir];
    var k = mk('img', '', cam, { top: still.sy_click, width: vw, height: vh }); k.src = frame(kdir, 1);
    var red = mk('div', 'redact', cam, {});
    // owner CTA rule (3 Oct): the homepage's small "Free to join." line is covered by a feathered patch cloned from the
    // empty hero background right beside it (af-hush.js, made by hush-rows.swift). Nothing new is drawn.
    var hk = mk('div', 'hush', cam, {}), hki = mk('img', '', hk, { width: vw, height: vh });
    var sl = mk('div', 'sl', cam, { width: vw, height: still.clip_y + still.clip_h });
    var s = mk('img', '', sl, { top: still.clip_y, width: vw, height: still.clip_h }); s.src = 'stills/' + key + '-' + mode + '.jpg';
    var hs = HUSH[key + '-' + mode];
    if (hs) {
      var hb = hushBox(hs, still.clip_y), hsl = mk('div', 'hush', sl, { display: 'block', left: hb.x, top: hb.y, width: hb.w, height: hb.h });
      var hsi = mk('img', '', hsl, { left: -(hb.x + hb.dx), top: still.clip_y - (hb.y + hb.dy), width: vw, height: still.clip_h }); hsi.src = s.src;
    }
    var R = still.rects, pad = HZ ? 9 : 8;
    var spot = mk('div', 'spot', sl, { left: R.map[0] - pad, top: R.map[1] - pad, width: R.map[2] - R.map[0] + 2 * pad, height: R.card[3] - R.map[1] + 2 * pad });
    hide0(sl);
    return { g: g, cam: cam, k: k, red: red, hk: hk, hki: hki, kdir: kdir, kd: kd, sl: sl, spot: spot, st: still, R: R, key: key };
  }
  /** deterministic keystroke playback from authoring time t0 at speed sp until tEnd (holds the last frame),
   *  with the autocomplete redaction set per frame. Returns the authoring time of a clip time. */
  function kclip(G, t0, sp, tEnd) {
    var st = G.kd.stamps, T0 = W(t0), TE = W(tEnd), rows = RED[G.kdir], ev = G.kd.events;
    var keep = [nearest(st, ev.dropdown), nearest(st, ev.select)];   // full address typed: row 1 is the council's own
    var geo = HZ ? { x0: 416, x1: 992, top: 618, r2: 668, rh: 48 } : { x0: 16, x1: 374, top: 466.4, r2: 516.3, rh: 47.9 };
    var last = -1;
    Kit.each(function (t) {
      var tt = Math.min(Math.max(t, T0), TE - 1e-4), target = st[1] + (tt - T0) * sp, i = 1;
      while (i + 1 < st.length && st[i + 1] <= target + 1e-9) i++;
      if (i === last) return; last = i;
      G.k.setAttribute('src', frame(G.kdir, i));
      var hz = (HUSH[G.kdir] || [])[i], hy = G.hk.style;
      if (hz) {
        var hb = hushBox(hz, G.st.sy_click);
        hy.display = 'block'; hy.left = hb.x + 'px'; hy.top = hb.y + 'px'; hy.width = hb.w + 'px'; hy.height = hb.h + 'px';
        G.hki.setAttribute('src', frame(G.kdir, i)); G.hki.style.left = -(hb.x + hb.dx) + 'px'; G.hki.style.top = (G.st.sy_click - (hb.y + hb.dy)) + 'px';
      } else hy.display = 'none';
      var n = +rows[i], r = G.red.style;
      var sharpFirst = keep.indexOf(i) >= 0 || (n === 1 && G.key === 'ham');   // ham: the single row is the council's own
      if (!n || (sharpFirst && n === 1)) { r.display = 'none'; return; }
      var y0 = sharpFirst ? geo.r2 : geo.top, y1 = geo.top + geo.rh * n + 1;
      r.display = 'block'; r.left = geo.x0 + 'px'; r.width = (geo.x1 - geo.x0) + 'px'; r.top = y0 + 'px'; r.height = (y1 - y0) + 'px';
      r.borderRadius = sharpFirst ? '0 0 8px 8px' : '8px';
    });
    return function (ct) { return t0 + (ct - st[1]) / sp; };
  }
  /** cut from the selected suggestion to the settled result (no half-loaded live arrival). */
  function stillIn(G, t, d) { Kit.add(G.sl, 'opacity', [[t, 0], [t + (d || 0.18), 1, 'inOut']]); }
  /** 9:16: the spotlight dims the hero only once the camera has arrived on the map and card (the move reads as a scroll). */
  function spotOn(G, t) { if (!HZ) Kit.add(G.spot, 'opacity', [[0, 0], [t - 0.15, 0], [t + 0.3, 1, 'inOut']]); }   // 16:9 keeps it from the cut (hides the hero's worker)
  /** highlight box around a page rect (inside the camera so it tracks the footage). s = expected camera scale. */
  function hl(G, r, t, s, opt) {
    opt = opt || {}; var p = opt.pad == null ? 4 : opt.pad;
    var b = mk('div', 'hl' + (opt.amber ? ' amber' : ''), G.cam, { left: r[0] - p, top: r[1] - p, width: r[2] - r[0] + 2 * p, height: r[3] - r[1] + 2 * p, borderWidth: (3.2 / s).toFixed(2) + 'px', borderRadius: (7 / s).toFixed(2) + 'px' });
    b.style.boxShadow = '0 0 0 ' + (5 / s).toFixed(2) + 'px rgba(' + (opt.amber ? '245,181,68' : '61,192,35') + ',.16), 0 0 ' + (22 / s).toFixed(1) + 'px rgba(' + (opt.amber ? '245,181,68' : '61,192,35') + ',.45)';
    Kit.add(b, 'opacity', [[t, 0], [t + 0.12, 1, 'out']]);
    Kit.add(b, 'scale', [[t, 1.35], [t + 0.28, 1, 'out']]);
    if (opt.out) outAt(b, opt.out, 0.2);
    return b;
  }
  /** the parcel's own outline, thickened and pulsed (traced from the hi-res still), instead of a box around it. */
  function parcelGlow(G, pts, t, s, out) {
    var NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'parcel'); svg.setAttribute('width', '1'); svg.setAttribute('height', '1');
    var str = pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
    [[14 / s, 'rgba(61,192,35,.22)'], [7 / s, 'rgba(61,192,35,.45)'], [3.4 / s, '#4ADE80']].forEach(function (l) {
      var pg = document.createElementNS(NS, 'polygon'); pg.setAttribute('points', str);
      pg.style.stroke = l[1]; pg.style.strokeWidth = l[0].toFixed(2) + 'px'; svg.appendChild(pg);
    });
    G.cam.appendChild(svg);
    Kit.add(svg, 'opacity', [[t, 0], [t + 0.14, 1, 'out'], [t + 0.42, 0.45, 'inOut'], [t + 0.7, 1, 'inOut'], [t + 0.98, 0.5, 'inOut'], [t + 1.26, 1, 'inOut'], [out, 1], [out + 0.2, 0, 'in']]);
  }
  function uline(G, x0, x1, y, t, s, dur) {
    var u = mk('div', 'uline', G.cam, { left: x0, top: y, width: x1 - x0, height: +(4 / s).toFixed(2) });
    Kit.add(u, 'clipX', [[0, 0], [t, 0], [t + (dur || 0.4), 1, 'out']]);
    return u;
  }

  var GD = group('dun'), GC = group('chc'), GH = group('ham'), GA = group('akl');
  // each cut fully replaces the previous layer (no ghost letters at the window edges)
  Kit.add(GD.g, 'opacity', [[0, 1], [22.62, 1], [22.63, 0, 'hold']]);
  Kit.add(GC.g, 'opacity', [[0, 0], [22.35, 0], [22.6, 1, 'inOut'], [29.52, 1], [29.53, 0, 'hold']]);
  Kit.add(GH.g, 'opacity', [[0, 0], [29.3, 0], [29.5, 1, 'inOut'], [36.37, 1], [36.38, 0, 'hold']]);
  Kit.add(GA.g, 'opacity', [[0, 0], [36.1, 0], [36.35, 1, 'inOut']]);

  // dark band at the window top so the address tag never sits on product UI; on only while a tag shows
  var wtop = mk('div', 'wtop', win, { height: L.topShade });
  // punch-in vignette for the joke: everything but the boxed council field falls away
  var vig = mk('div', 'vig', win, { width: L.win.w, height: L.win.h });
  vig.style.background = 'radial-gradient(ellipse ' + (HZ ? '330px 150px' : '290px 120px') + ' at ' + L.win.fx + 'px ' + L.win.fy + 'px, rgba(2,6,23,0) 0%, rgba(2,6,23,0) 52%, rgba(2,6,23,.85) 100%)';
  Kit.add(vig, 'opacity', [[0, 0], [19.95, 0], [20.4, 1, 'out'], [22.4, 1], [22.6, 0]]);

  function tag(t0, t1, html) {
    var g = T(win, L.tag.x, L.tag.y, 'tag', html, HZ ? {} : { fontSize: 22 });
    popIn(g, t0, -12); outAt(g, t1, 0.15);
    return g;
  }
  var tagSpans = [];
  function tagOn(t0, t1, html) { tagSpans.push([t0, t1]); return tag(t0, t1, html); }

  // ---------- panel text
  var P = L.panel;
  function chip(t0, t1, txt) { var c = T(main, P.x, P.chipY, 'chip2', txt, HZ ? {} : { fontSize: 24 }); popIn(c, t0, -10); outAt(c, t1); return c; }
  function title(t0, t1, html) { var e = T(main, P.x, P.titleY, 'title', html, { fontSize: P.titleSize }); popIn(e, t0, 30, 0.38); outAt(e, t1, 0.2); return e; }
  function cap(t0, t1, html, extra) { var css = { fontSize: P.capSize, width: P.capW }; if (extra) for (var k in extra) css[k] = extra[k]; var y = css.top != null ? css.top : P.capY; delete css.top; var e = T(main, P.x, y, 'cap', html, css); popIn(e, t0, 22); outAt(e, t1, 0.16); return e; }

  // ---------- ladder / pills (what this address gets)
  var LAB = ['Boundary', 'Land area', 'Legal description', 'Council', 'Zone', 'Services', 'Hazards'];
  var lad = mk('div', 'lad', main, HZ ? { left: P.x, top: 648, width: 604, height: 378 } : { left: 65, top: 1116, width: 950, height: 130 });
  var rows = [];
  if (HZ) {
    T(lad, 0, -38, 'kicker', 'What this address gets', { fontSize: 22, color: 'var(--ink-50)' });
    LAB.forEach(function (lab, i) {
      var r = mk('div', 'row', lad, { top: i * 54, height: 54 });
      mk('div', '', r, { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: '#0F1B30' });
      var tl = mk('div', 'lab', r, { fontSize: 34 }, lab);
      var off = mk('div', 'st off', r, { right: 6, width: 34, height: 34 });
      var tick = mk('div', 'st tick', r, { right: 4, width: 38, height: 38, fontSize: 24 }, '✓');
      var no = mk('div', 'st no', r, { right: 0, fontSize: 22, height: 38 }, 'not yet');
      rows.push({ lab: tl, off: off, tick: tick, no: no, state: 'off' });
    });
  } else {
    var pos = [[0, 0], [214, 0], [437, 0], [763, 0], [0, 72], [252, 72], [557, 72]];
    LAB.forEach(function (lab, i) {
      var pl = mk('div', 'row', lad, { left: pos[i][0], top: pos[i][1], height: 58, right: 'auto', padding: '0 18px 0 12px', borderRadius: 12, border: '2px solid #1E293B', background: 'rgba(11,18,38,.92)', gap: '10px' });
      var off = mk('div', 'st off', pl, { position: 'relative', width: 28, height: 28 });
      var tick = mk('div', 'st tick', pl, { position: 'absolute', left: 10, width: 32, height: 32, fontSize: 21 }, '✓');
      var tl = mk('div', 'lab', pl, { fontSize: 27 }, lab);
      var no = mk('div', 'st no', pl, { position: 'relative', fontSize: 19, marginLeft: '2px' }, 'not yet');
      no.style.display = i >= 4 ? 'flex' : 'none';
      rows.push({ lab: tl, off: off, tick: tick, no: no, pill: pl, state: 'off' });
    });
  }
  rows.forEach(function (r) { hide0(r.tick); if (r.no.style.display !== 'none') hide0(r.no); });
  Kit.add(lad, 'opacity', [[5.6, 0], [6.0, 1, 'out'], [55.0, 1], [55.3, 0, 'in']]);
  function setRow(i, state, t) {
    var r = rows[i], prev = r.state; if (prev === state) return; r.state = state;
    var on = { off: [1, 0, 0], yes: [0, 1, 0], no: [0, 0, 1] };
    var a = on[prev], b = on[state];
    Kit.add(r.off, 'opacity', [[t, a[0]], [t + 0.15, b[0]]]);
    Kit.add(r.tick, 'opacity', [[t, a[1]], [t + 0.12, b[1]]]);
    if (state === 'yes') Kit.add(r.tick, 'scale', [[t, 1.6], [t + 0.26, 1, 'out']]);
    if (r.no.style.display !== 'none' || HZ) Kit.add(r.no, 'opacity', [[t, a[2]], [t + 0.15, b[2]]]);
    var col = { off: '#64748B', yes: '#F8FAFC', no: '#64748B' };
    Kit.add(r.lab, 'color', [[t, col[prev]], [t + 0.15, col[state]]]);
    if (r.pill) Kit.add(r.pill, 'borderColor', [[t, prev === 'yes' ? '#1F6B2E' : prev === 'no' ? '#6B5220' : '#1E293B'], [t + 0.15, state === 'yes' ? '#1F6B2E' : state === 'no' ? '#6B5220' : '#1E293B']]);
  }
  /** a new address: the whole ladder goes blank, then re-ticks as that address's own result lands. */
  function resetLadder(t) { for (var i = 0; i < 7; i++) setRow(i, 'off', t + i * 0.03); }
  function basics(t) { for (var i = 0; i < 4; i++) setRow(i, 'yes', t + i * 0.1); }
  if (HZ) rows.forEach(function (r) { hide0(r.no); });

  // typing framing: the search box + suggestions, below the hero headline (16:9) / under the tag (9:16)
  var TY = HZ ? { a: [700, 772, 1.62], b: [700, 762, 1.72] } : { a: [195, 486, SM], b: [195, 476, SM] };
  function typeKeys(t0, tTyped, tSel) { return [[t0].concat(TY.a), [tTyped].concat(TY.b), [tSel].concat(TY.b.slice(0, 2), [TY.b[2] * 1.01])]; }

  // ================================================================== S1 · DUNEDIN (5.4 – 22.4)
  chip(5.5, 22.2, SHORT ? 'Dunedin' : '1 / 3 · Dunedin');
  title(5.6, 22.2, HZ ? 'Anywhere<br>in NZ<sup>*</sup>' : 'Anywhere in NZ<sup>*</sup>');
  var f1 = T(main, P.x, P.footY, 'foot', '<b>*</b>Any address on the LINZ register. Some brand-new and rural lots aren’t on it yet.', { width: HZ ? 600 : 950, fontSize: HZ ? 25 : 24 });
  popIn(f1, 6.3, 10); outAt(f1, 22.2);
  cap(5.9, 9.45, 'Fair test: we typed in each <span class="g">council’s own address.</span>');
  cap(9.6, 15.55, 'Every address on the register gets <span class="g">the basics.</span>');
  cap(15.75, 19.35, 'Services and hazards? <span class="a">Not here yet.</span> It says so.');
  cap(19.55, 22.2, 'We told Dunedin City Council it’s in Dunedin City. <span class="g">They knew.</span>');
  if (HZ) tagOn(6.0, 22.2, '50 The Octagon <i>· Dunedin City Council</i>');
  else { tagOn(6.0, 9.35, '50 The Octagon <i>· Dunedin City Council</i>'); tagOn(12.3, 22.2, '50 The Octagon <i>· Dunedin City Council</i>'); }

  (function () {
    var G = GD, R = G.R, ev = G.kd.events;
    var v = kclip(G, 5.5, 1.0, 8.6);
    stillIn(G, 8.6, 0.18); spotOn(G, HZ ? 9.3 : 9.4);
    // the parcel outline traced on dun-d (page px); the phone map shows the same parcel at 0.508x about the map centre
    var PD = [[1152.0, 328.0], [1239.0, 290.0], [1314.7, 320.0], [1291.0, 382.0], [1298.3, 382.3], [1332.3, 396.0], [1272.3, 548.7], [1262.3, 545.0], [1241.7, 537.0]];
    if (HZ) {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(5.3, v(ev.typed), 8.6).concat([
        [9.3, 1242, 506, 1.5], [10.0, 1242, 506, 1.5], [10.75, 1242, 418, 1.95], [11.7, 1242, 420, 1.98],
        [12.4, 1242, 700, 2.0], [15.45, 1242, 702, 2.04], [16.1, 1242, 727, 2.14], [19.3, 1242, 727, 2.18],
        [19.95, 1219, 690.5, 3.0], [22.6, 1219, 690.5, 3.12, 'linear']]));
      parcelGlow(G, PD, 10.95, 1.95, 12.3);
      hl(G, R.area, 12.55, 2.0, { out: 15.5 }); hl(G, R.legal, 13.15, 2.0, { out: 15.5 }); hl(G, R.council, 13.75, 2.0, { out: 15.5 });
      uline(G, 1318, 1487, 726.6, 16.25, 2.15, 0.35); uline(G, 997, 1047, 742.6, 16.6, 2.15, 0.2);
      hl(G, R.council, 19.95, 3.0, { pad: 5 });
    } else {
      var mc = [195, 776.6], md = [1242, 418.5], k = 0.508;
      var PM = PD.map(function (p) { return [mc[0] + (p[0] - md[0]) * k, mc[1] + (p[1] - md[1]) * k]; });
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(5.3, v(ev.typed), 8.6).concat([
        // the whole lower map incl. the Google attribution, parcel centred
        [9.4, 195, 812, 1.9], [10.0, 195, 812, 1.9], [10.75, 195, 811, 1.93], [11.8, 195, 811, 1.94],
        [12.4, 195, 1021, SM], [15.45, 195, 1022, 2.45], [16.1, 195, 1024, 2.6], [19.3, 195, 1024, 2.62],
        [19.95, 255, 988.6, 4.0], [22.6, 255, 988.6, 4.15, 'linear']]));
      parcelGlow(G, PM, 10.95, 1.93, 12.3);
      hl(G, R.area, 12.55, SM, { out: 15.5 }); hl(G, R.legal, 13.15, SM, { out: 15.5 }); hl(G, R.council, 13.75, SM, { out: 15.5 });
      uline(G, 33, 250, 1040.5, 16.25, 2.6, 0.45);
      hl(G, R.council, 19.95, 4.0, { pad: 4 });
    }
    setRow(0, 'yes', 10.95); setRow(1, 'yes', 12.55); setRow(2, 'yes', 13.15); setRow(3, 'yes', 13.75);
    setRow(4, 'no', 16.3); setRow(5, 'no', 16.5); setRow(6, 'no', 16.7);
  })();

  // ================================================================== S2 · FOUR COUNCILS (22.4 – 36.2)
  chip(22.5, 36.0, '2 / 3 · Christchurch · Hamilton');
  title(22.6, 36.0, HZ ? 'Four<br>councils' : 'Four councils');
  var f2 = T(main, P.x, P.footY, 'foot', 'Auckland · Wellington City · Christchurch · Hamilton', { width: HZ ? 600 : 950, fontSize: HZ ? 25 : 24 });
  popIn(f2, 23.0, 10); outAt(f2, 36.0);
  cap(22.8, 26.35, 'They add the <span class="g">planning zone.</span>');
  cap(26.5, 29.3, 'Christchurch: <span class="g">Commercial Zone.</span>');
  cap(29.55, 33.45, 'Hamilton: <span class="g">Central City Zone.</span>');
  cap(33.6, 36.0, 'Wellington City: <span class="g">zone too.</span> <span class="a">Hazards: not yet.</span>');
  // 9:16: the tag leaves once the card fills the window (its own title names the address)
  tagOn(22.8, HZ ? 29.3 : 25.5, '53 Hereford St <i>· Christchurch City Council</i>');
  tagOn(29.6, HZ ? 36.0 : 31.15, '260 Anglesea St <i>· Hamilton City Council</i>');
  resetLadder(22.5);

  (function () {
    var G = GC, R = G.R, ev = G.kd.events;
    var v = kclip(G, 22.6, 1.6, 24.92);
    stillIn(G, 24.92, 0.18); spotOn(G, HZ ? 25.6 : 25.7);
    if (HZ) {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(22.4, v(ev.typed), 24.92).concat([
        [25.6, 1242, 506, 1.4], [26.1, 1242, 506, 1.4], [26.75, 1235, 700, 2.05], [29.6, 1235, 704, 2.12, 'linear']]));
      hl(G, R.zone, 26.8, 2.05, {});
    } else {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(22.4, v(ev.typed), 24.92).concat([
        [25.7, 195, 1036, SM], [26.4, 195, 1038, SM], [29.6, 195, 1040, 2.47, 'linear']]));
      hl(G, R.zone, 26.8, SM, {});
    }
    basics(25.25); setRow(4, 'yes', 26.8); setRow(5, 'no', 27.3); setRow(6, 'no', 27.45);
  })();
  resetLadder(29.5);
  (function () {
    var G = GH, R = G.R, ev = G.kd.events;
    var v = kclip(G, 29.45, 3.0, 30.62);
    stillIn(G, 30.62, 0.18); spotOn(G, HZ ? 31.25 : 31.3);
    if (HZ) {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(29.3, v(ev.typed), 30.62).concat([
        [31.25, 1242, 506, 1.42], [31.95, 1236, 690, 2.0], [33.45, 1236, 694, 2.05], [34.1, 1234, 736, 2.15], [36.4, 1234, 736, 2.22, 'linear']]));
      hl(G, R.zone, 31.95, 2.0, { out: 33.9 });
      uline(G, 1316, 1487, 735.6, 34.25, 2.15, 0.35); uline(G, 997, 1047, 751.6, 34.6, 2.15, 0.2);
    } else {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(29.3, v(ev.typed), 30.62).concat([
        [31.3, 195, 1030, SM], [31.95, 195, 1016, 2.6], [33.45, 195, 1017, 2.62], [34.1, 195, 1043, 2.6], [36.4, 195, 1043, 2.64, 'linear']]));
      hl(G, R.zone, 31.95, 2.6, { out: 33.9 });
      uline(G, 33, 250, 1058.5, 34.25, 2.6, 0.45);
    }
    basics(30.95); setRow(4, 'yes', 31.95); setRow(5, 'no', 34.3); setRow(6, 'no', 34.5);
  })();

  // ================================================================== S3 · AUCKLAND (36.2 – 46.6)
  chip(36.3, 46.4, '3 / 3 · Auckland');
  title(36.4, 46.4, 'Auckland');
  // 16:9: one-line headline, so the foot and captions close up under it
  var f3 = T(main, P.x, HZ ? 236 : P.footY, 'foot', 'Auckland Council area', { width: HZ ? 600 : 950, fontSize: HZ ? 25 : 24 });
  popIn(f3, 36.8, 10); outAt(f3, 46.4);
  var c3 = HZ ? { top: 300 } : {};
  cap(36.6, 40.05, 'Auckland gets <span class="g">the whole card.</span>', c3);
  cap(40.2, 43.3, 'The zone, then pipes, power, flood and hazard checks.', c3);
  cap(43.45, 46.4, 'Services and hazards in detail: see <span class="g">“The back corner”.</span>', c3);
  tagOn(36.6, HZ ? 43.3 : 39.05, '135 Albert St <i>· Auckland Council</i>');
  resetLadder(36.3);

  (function () {
    var G = GA, R = G.R, ev = G.kd.events;
    var v = kclip(G, 36.45, 1.6, 38.55);
    stillIn(G, 38.55, 0.18); spotOn(G, 39.3);
    if (HZ) {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(36.2, v(ev.typed), 38.55).concat([
        [39.3, 1242, 578, 1.0], [40.05, 1242, 578, 1.0], [40.7, 1242, 590, 2.0], [43.0, 1242, 596, 2.06],
        // wide shot of services + hazards: the map (and its Google attribution) stays out of frame, the tag is gone
        [43.6, 1250, 808, 1.72], [46.6, 1250, 808, 1.76, 'linear'],
        // the small print (54.8 – 63.4): back to the card footer
        [54.8, 1242, 977, 1.95], [57.9, 1242, 977, 2.14, 'linear'], [63.4, 1242, 977, 2.14]]));
      hl(G, R.zone, 40.75, 2.0, { out: 43.2 });
      hl(G, [R.services[0], R.services[1], R.services[2], R.footer[1] - 8], 43.65, 1.72, { pad: 8, out: 46.4 });
      hl(G, R.footer, 55.35, 2.0, { pad: 6 });
    } else {
      camera(G.cam, L.win.fx, L.win.fy, typeKeys(36.2, v(ev.typed), 38.55).concat([
        [39.3, 195, 1022, SM], [40.05, 195, 1022, SM], [40.7, 195, 1016, 2.6], [43.0, 195, 1017, 2.62],
        [43.6, 195, 1112, SM], [46.5, 195, 1405, SM, 'inOut'],
        [54.8, 195, 1528, SM], [57.9, 195, 1528, 2.6, 'linear'], [63.4, 195, 1528, 2.6]]));
      hl(G, R.zone, 40.75, 2.6, { out: 43.2 });
      hl(G, [29, R.services[1] - 4, 361, R.hazards[1] - 6], 43.65, SM, { pad: 0, out: 45.3 });
      hl(G, [29, R.hazards[1] - 4, 361, R.footer[1] - 6], 45.2, SM, { pad: 0, out: 46.4 });
      hl(G, R.footer, 55.35, SM, { pad: 5 });
    }
    basics(38.95); setRow(4, 'yes', 40.75); setRow(5, 'yes', 43.65); setRow(6, 'yes', 43.95);
  })();

  // the top band follows the tags
  (function () {
    var k = [[0, 0]];
    tagSpans.forEach(function (s) { k.push([s[0], 0], [s[0] + 0.2, 1, 'out'], [s[1], 1], [s[1] + 0.2, 0, 'in']); });
    Kit.add(wtop, 'opacity', k);
  })();

  // ================================================================== THE SMALL PRINT (54.8 – 63.4), main scene resumes
  chip(54.9, 63.2, 'The small print');
  title(55.0, 63.2, HZ ? 'What it’s<br>not' : 'What it’s not');
  cap(55.4, 57.95, '“Not a substitute for a LIM, PIM or engineering advice.”', HZ ? { fontSize: 50 } : {});
  var qsrc = T(main, P.x, HZ ? 610 : P.footY + 4, 'src', 'From the card itself', {});
  popIn(qsrc, 55.8, 8); outAt(qsrc, 57.95);
  Kit.add(win, 'opacity', [[57.9, 1], [58.3, 0.06, 'inOut']]);
  (function () {
    var items = ['Still order the LIM.', 'Check the title.', 'Ask the council or a planner.'];
    var lst = mk('div', 'lst', main, HZ ? { left: 96, top: 420, width: 1500, height: 560 } : { left: 65, top: 730, width: 950, height: 420 });
    var fs = HZ ? 78 : 52, gap = HZ ? 168 : 128, bx = HZ ? 70 : 54;
    items.forEach(function (txt, i) {
      var it = mk('div', 'it', lst, { top: i * gap, fontSize: fs, height: bx });
      var b = mk('div', 'bx', it, { width: bx, height: bx, fontSize: bx * 0.62 }, '');
      var tk = mk('span', '', b, {}, '✓');
      mk('span', '', it, {}, txt);
      var t = 58.25 + i * 0.95;
      popIn(it, t, 30);
      Kit.add(tk, 'opacity', [[0, 0], [t + 0.35, 0], [t + 0.42, 1]]);
      Kit.add(tk, 'scale', [[t + 0.35, 1.8], [t + 0.6, 1, 'out']]);
    });
    Kit.add(lst, 'opacity', [[0, 1], [63.05, 1], [63.35, 0, 'in']]);
  })();

  // ------------------------------------------------------------------ scene: SUMMARY TABLE (46.6 – 54.8; +2.5 s hold)
  var sum = mk('div', 'fill', root, { background: 'radial-gradient(1200px 900px at 18% 8%, #0A1A2E 0%, #020617 62%)' });
  Kit.scene(sum, 46.5, 54.85);
  Kit.add(sum, 'opacity', [[46.5, 0], [46.8, 1, 'out'], [54.55, 1], [54.85, 0, 'in']]);
  (function () {
    var cols = HZ ? { lab: 96, c: [[820, 300], [1150, 330], [1500, 324]], top: 300, rowH: 86, hdY: 200 }
                  : { lab: 65, c: [[455, 180], [640, 190], [835, 180]], top: 612, rowH: 76, hdY: 506 };
    var kk = T(sum, cols.lab, HZ ? 70 : 306, 'kicker', 'Screenshot this', HZ ? {} : { fontSize: 24 });
    var tt = T(sum, cols.lab, HZ ? 110 : 340, 'title', HZ ? 'What site search shows you' : 'What site search<br>shows you', { fontSize: HZ ? 70 : 64 });
    popIn(kk, 46.75, 10); popIn(tt, 46.8, 24);
    var tbl = mk('div', 'tbl', sum, { left: 0, top: 0, width: HZ ? 1920 : 1080, height: HZ ? 1080 : 1920 });
    var heads = HZ ? ['Everywhere<sup>*</sup><small>on the LINZ register</small>', 'Christchurch, Hamilton,<br>Wellington City', 'Auckland<small>Auckland Council area</small>']
                   : ['Every&shy;where<sup>*</sup>', '3 more<br>councils<sup>†</sup>', 'Auck&shy;land'];
    var have = [[1, 1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1]];
    var ch = mk('div', 'colhl', tbl, { left: cols.c[2][0] - 8, top: cols.hdY - 18, width: cols.c[2][1] + 16, height: cols.top - cols.hdY + 7 * cols.rowH + 30 });
    Kit.add(ch, 'opacity', [[0, 0], [51.4, 0], [51.8, 1, 'out']]);
    heads.forEach(function (h, ci) {
      var hd = T(tbl, cols.c[ci][0], cols.hdY, 'hd', h, { width: cols.c[ci][1], fontSize: HZ ? 30 : 27 });
      popIn(hd, 47.2 + ci * 0.12, 14);
    });
    LAB.forEach(function (lab, ri) {
      var y = cols.top + ri * cols.rowH;
      var ln = mk('div', 'ln', tbl, { left: cols.lab, top: y + cols.rowH - 1, width: (HZ ? 1824 : 1015) - cols.lab });
      popIn(ln, 47.35 + ri * 0.04, 0);
      var rl = T(tbl, cols.lab, y + (cols.rowH - (HZ ? 38 : 32)) / 2, 'rl', lab, { fontSize: HZ ? 38 : 32 });
      popIn(rl, 47.35 + ri * 0.05, 10);
      have.forEach(function (col, ci) {
        var t = [48.2, 49.7, 51.4][ci] + ri * 0.09;
        var cell = mk('div', 'cell', tbl, { left: cols.c[ci][0], top: y, width: cols.c[ci][1], height: cols.rowH });
        if (col[ri]) { var yb = mk('div', 'y', cell, { width: HZ ? 48 : 44, height: HZ ? 48 : 44, fontSize: HZ ? 30 : 27 }, '✓'); Kit.add(yb, 'opacity', [[0, 0], [t, 0], [t + 0.1, 1]]); Kit.add(yb, 'scale', [[t, 1.7], [t + 0.25, 1, 'out']]); }
        else { var nb = mk('div', 'n', cell, { fontSize: HZ ? 24 : 25 }, 'not yet'); Kit.add(nb, 'opacity', [[0, 0], [t, 0], [t + 0.2, 1]]); }
      });
    });
    var fn = T(sum, cols.lab, HZ ? 920 : 1160, 'foot', HZ ? '<b>*</b>Boundary, land area, legal description and council for any address on the LINZ register (some brand-new and rural lots aren’t on it yet). Zone names only in four councils. Indicative only, not a LIM.'
      : '<b>*</b>Any address on the LINZ register. <b>†</b>Christchurch, Hamilton and Wellington City. Indicative only, not a LIM.', { width: HZ ? 1500 : 950, fontSize: HZ ? 25 : 24 });
    popIn(fn, 48.0, 8);
  })();

  // ------------------------------------------------------------------ scene: SELF-OWN (63.4 – 67.7), the card's own line folded in
  var own = mk('div', 'fill', root);
  Kit.scene(own, 63.3, 67.8);
  Kit.add(own, 'opacity', [[63.3, 0], [63.6, 1, 'out'], [67.45, 1], [67.75, 0, 'in']]);
  (function () {
    var m = HZ ? nzMap(own, 880, 90, 0.9) : nzMap(own, 340, 300, 0.56);
    Kit.add(m.svg, 'opacity', [[63.3, 0.55], [64.2, 0.38, 'inOut']]);
    ['hamilton', 'wellington', 'christchurch', 'dunedin'].forEach(function (k) { var p = pin(own, m.pins[k], 'grey'); p.querySelector('b').style.display = 'none'; if (!HZ) p.style.transform = 'scale(.62)'; Kit.add(p, 'opacity', [[63.5, 0.9], [64.3, 0.45, 'inOut']]); });
    var pa = pin(own, m.pins.auckland); if (!HZ) pa.style.transform = 'scale(.8)';
    var ring = pa.querySelector('b');
    var keysO = [[0, 0]], keysS = [[0, 0.4]];
    for (var t = 63.8; t < 67.6; t += 1.3) { keysO.push([t, 0.95], [t + 1.2, 0, 'out']); keysS.push([t, 0.4], [t + 1.2, 2.2, 'out']); }
    Kit.add(ring, 'opacity', keysO); Kit.add(ring, 'scale', keysS);
    var glow = mk('div', '', own, { position: 'absolute', left: m.pins.auckland[0] - 160, top: m.pins.auckland[1] - 160, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,192,35,.35) 0%, rgba(61,192,35,0) 70%)' });
    Kit.add(glow, 'opacity', [[63.5, 0], [64.3, 1, 'out']]);
    var a1, a2, qc, qs;
    if (HZ) {
      a1 = T(own, 96, 236, 'title', 'We started<br>in Auckland.', { fontSize: 104 });
      a2 = T(own, 96, 478, 'title green', 'We know.', { fontSize: 150 });
      qc = crop(own, 'dun-d', D.stills['dun-d'].rects.unavail, 96, 690, 760, 10);
      qs = T(own, 96, 708 + qc.h, 'src', 'On the card today, outside Auckland');
    } else {
      a1 = T(own, 65, 880, 'title', 'We started in Auckland.', { fontSize: 66 });
      a2 = T(own, 65, 950, 'title green', 'We know.', { fontSize: 128 });
      qc = crop(own, 'dun-d', D.stills['dun-d'].rects.unavail, 65, 1092, 950, 10);
      qs = T(own, 65, 1106 + qc.h, 'src', 'On the card today, outside Auckland', { fontSize: 21 });
    }
    popIn(a1, 63.8, 30, 0.4);
    slamIn(a2, 65.45, 1.25);
    popIn(qc.el, 66.05, 16); popIn(qs, 66.25, 8);
  })();

  // ------------------------------------------------------------------ scene: CTA (67.6 – 72.85)
  var cta = mk('div', 'fill', root);
  Kit.scene(cta, 67.6, END_A + 0.2);
  Kit.add(cta, 'opacity', [[67.6, 0], [67.9, 1, 'out']]);
  (function () {
    // no ® until the trademark registration is confirmed (truth sheet (j) medium 7)
    var logo = mk('img', '', cta, HZ ? { position: 'absolute', left: 960 - 170, top: 118, width: 340 } : { position: 'absolute', left: 540 - 175, top: 318, width: 350 });
    logo.src = 'qsme-logo-nor.svg';
    Kit.add(logo, 'opacity', [[67.8, 0], [68.2, 1, 'out']]); Kit.add(logo, 'scale', [[67.8, 0.94], [68.4, 1, 'out']]);
    var t1 = T(cta, 0, HZ ? 300 : 500, 'title', HZ ? 'Search your address.' : 'Search your<br>address.', { width: HZ ? 1920 : 1080, textAlign: 'center', fontSize: HZ ? 112 : 104 });
    var t2 = T(cta, 0, HZ ? 432 : 722, 'cap green', 'Sign up to see yours.', { width: HZ ? 1920 : 1080, textAlign: 'center', fontSize: HZ ? 62 : 56 });
    popIn(t1, 68.0, 26, 0.36); popIn(t2, 68.6, 18);
    var sc;
    if (HZ) sc = crop(cta, 'dun-d', [404, 529, 952, 623], 960 - 450, 548, 900, 0, { src: frame('dun-dk', 1), top: D.stills['dun-d'].sy_click });
    else sc = crop(cta, 'dun-m', [8, 377, 382, 470], 90, 826, 900, 0, { src: frame('dun-mk', 1), top: D.stills['dun-m'].sy_click });
    popIn(sc.el, 68.35, 20);
    var urlw = mk('div', 't', cta, { left: 0, top: HZ ? 760 : 1074, width: HZ ? 1920 : 1080, textAlign: 'center' });
    mk('div', 'urlpill', urlw, {}, 'qsme.co.nz');
    popIn(urlw, 69.0, 20);
    var sm = T(cta, HZ ? 360 : 65, HZ ? 900 : 1170, 'small', 'Your account unlocks <b>Site research</b>: full depth in Auckland.', { width: HZ ? 1200 : 950, fontSize: HZ ? 28 : 26 });
    popIn(sm, 69.6, 10);
  })();

  // ------------------------------------------------------------------ the short 9:16 cut: four slices of the same timeline
  var duration = DUR;
  if (SHORT) {
    var SEGS = [[0, W(22.1)], [W(46.78), W(51.94) + 3.5], [W(63.6), W(67.55)], [W(67.55), DUR]];
    var _render = Kit.render;
    Kit.render = function (s) {
      var acc = 0;
      for (var i = 0; i < SEGS.length; i++) {
        var len = SEGS[i][1] - SEGS[i][0];
        if (s < acc + len || i === SEGS.length - 1) return _render.call(Kit, Math.min(SEGS[i][0] + (s - acc), SEGS[i][1]));
        acc += len;
      }
    };
    duration = +SEGS.reduce(function (a, g) { return a + g[1] - g[0]; }, 0).toFixed(3);
    window.AF_SEGS = SEGS;
  }
  window.AF_W = W;

  Kit.ready({ duration: duration, fonts: ['800 100px Manrope', '700 50px Manrope', '600 30px Inter', '500 25px Inter', '600 26px "JetBrains Mono"'] });
})();
