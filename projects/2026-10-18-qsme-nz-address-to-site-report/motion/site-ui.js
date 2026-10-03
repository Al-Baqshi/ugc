/* Illustrative recreations of signed-in QSME Site research screens, for the motion kit.
 * DEMO DATA, FICTIONAL SITES. Every on-screen string marked [V] is verbatim from
 * research/2026-10-02-qsme-platform-truth.md; [D] = demo filler written for this stand-in.
 * Site 1's verdict line, chips and overlays mirror the truth sheet's verified live test shape
 * (~209 m² Mixed Use site: Strong, 2–5 homes, road-widening designation, Mount Eden viewshaft,
 * 21 m Height Variation Control, pipes within 3 m). No address is ever legible: addresses are blurred.
 * Deterministic: a seeded PRNG draws the maps (no Math.random).
 */
(function () {
  'use strict';
  function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // zone swatches: illustrative, but every zone gets a clearly different swatch (Single House is pale cream, MHS golden)
  var ZC = { mu: '#C7A3E3', thab: '#E07B39', mhu: '#F2A65A', mhs: '#F6D35E', sh: '#FFF7D6', os: '#A7D69C' };
  var ZN = { mu: 'Business - Mixed Use', thab: 'Terrace Housing & Apartment Buildings', mhu: 'Mixed Housing Urban', mhs: 'Mixed Housing Suburban', sh: 'Single House', os: 'Open Space' };

  /* Review 2026-10-02: no invented UI wording may be legible. Site 2 and 3's summary lines and chips are not known
   * until the owner's Session A recording, so they render as skeleton bars (skel: true), never as made-up text.
   * Legible strings on every card are [V] only (verdict level wording, the special-character line, the calm overlays line). */
  var SITES = {
    s1: { n: 1, nick: 'main road', zone: 'Business - Mixed Use Zone', zk: 'mu', area: '209 m²',
      verdict: 'strong', vword: 'STRONG', vhead: 'Strong development potential',                                  // [V]
      sum: ['Business - Mixed Use Zone — ', 'indicatively', ' 2–5 homes here; 2 things to design around.'],      // [V] live test line
      chips: [['plus', '+ High-density zone'], ['minus', '− Small site (209 m²)'], ['minus', '− Designation']],  // [V]
      fake: '18 Kxxxxx Road, Mxxxx Exxx' },
    s2: { n: 2, nick: 'quiet street', zone: 'Mixed Housing Suburban zone', zk: 'mhs', area: '612 m²',
      verdict: 'good', vword: 'GOOD', vhead: 'Good development potential',                                      // [V] level
      skel: true, skelChips: [150, 128, 168],                                                                    // summary + chips: skeleton until Session A
      quote: 'No overlays, precincts or designations touch this parcel.',                                        // [V] (overlays card, calm state)
      fake: '7 Pxxxx Crescent, Hxxxxxxx' },
    s3: { n: 3, nick: 'the villa', zone: 'Single House zone', zk: 'sh', area: '845 m²',
      verdict: 'limited', vword: 'LIMITED', vhead: 'Limited development potential',                            // [V]
      skel: true, skelChips: [118, 176],                                                                         // summary + chips: skeleton until Session A
      note: 'Special character rules usually mean keeping the existing house, which lowers the realistic yield.', // [V]
      fake: '42 Txxx Avenue, Gxxx Lxxx' }
  };

  /* ---------------- maps ---------------- */
  var WORLD = {
    s1: { k: 1.32, seed: 11, angle: -8, vx: [-760, -170, 420, 1010], hy: [-600, -170, 60, 470], w: 24, wide: { h2: 64 }, lot: [30, 44], subject: [-40, 0], park: [0, 0] },
    s2: { seed: 23, angle: 17, vx: [-900, -300, 340, 980], hy: [-560, -180, 160, 500], w: 22, wide: {}, lot: [54, 66], subject: [30, 100], park: [0, 1], k: 1.05 },
    s3: { seed: 37, angle: -23, vx: [-960, -300, 420, 1100], hy: [-620, -170, 250, 680], w: 22, wide: {}, lot: [78, 98], subject: [60, 160], park: [0, 2], k: 0.92 }
  };
  function buildWorld(key) {
    var W = WORLD[key], r = rng(W.seed), roads = [], lots = [], blocks = [];
    var hw = function (i, kind) { return (W.wide[kind + i] || W.w) / 2; };
    W.hy.forEach(function (y, i) { roads.push({ x1: -1400, y1: y, x2: 1600, y2: y, w: W.wide['h' + i] || W.w, main: !!W.wide['h' + i] }); });
    W.vx.forEach(function (x, i) { roads.push({ x1: x, y1: -1400, x2: x, y2: 1600, w: W.wide['v' + i] || W.w, main: !!W.wide['v' + i] }); });
    for (var bi = 0; bi < W.vx.length - 1; bi++) for (var bj = 0; bj < W.hy.length - 1; bj++) {
      var bx0 = W.vx[bi] + hw(bi, 'v') + 4, bx1 = W.vx[bi + 1] - hw(bi + 1, 'v') - 4;
      var by0 = W.hy[bj] + hw(bj, 'h') + 4, by1 = W.hy[bj + 1] - hw(bj + 1, 'h') - 4, mid = (by0 + by1) / 2;
      var park = (W.park[0] === bi && W.park[1] === bj);
      blocks.push({ bi: bi, bj: bj, x0: bx0, y0: by0, x1: bx1, y1: by1, park: park });
      if (park) continue;
      ['top', 'bottom'].forEach(function (row) {
        var x = bx0;
        while (x < bx1 - 1) {
          var w = W.lot[0] + (W.lot[1] - W.lot[0]) * r();
          if (bx1 - (x + w) < W.lot[0]) w = bx1 - x;
          lots.push({ x0: x, x1: x + w, y0: row === 'top' ? by0 : mid, y1: row === 'top' ? mid : by1, row: row, bi: bi, bj: bj, r: r(), r2: r(), r3: r() });
          x += w;
        }
      });
    }
    var sx = W.subject[0], sy = W.subject[1];
    var subject = lots.filter(function (l) { return sx >= l.x0 && sx < l.x1 && sy >= l.y0 && sy < l.y1; })[0];
    lots.forEach(function (l) { l.zone = zoneOf(key, l, W); });
    return { W: W, roads: roads, lots: lots, blocks: blocks, subject: subject };
  }
  function zoneOf(key, l, W) {
    var cy = (l.y0 + l.y1) / 2;
    if (key === 's1') {
      var d = Math.abs(cy - W.hy[2]);
      if (d < 110) return 'mu';
      if (d < 230) return 'thab';
      if (d < 420) return 'mhu';
      return 'mhs';
    }
    if (key === 's2') { if (l.bj === 2) return l.row === 'top' ? 'mhu' : 'thab'; if (l.bj === 0) return 'sh'; if (l.bi === 2) return 'mhu'; return 'mhs'; }
    if (key === 's3') { if (l.bj === 0) return 'mhs'; return 'sh'; }
    return 'mhs';
  }
  function rectPath(x0, y0, x1, y1) { return 'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + 'H' + x1.toFixed(1) + 'V' + y1.toFixed(1) + 'H' + x0.toFixed(1) + 'Z'; }
  function footprint(l, key) {
    var dw = l.x1 - l.x0, dh = l.y1 - l.y0, front = l.row === 'top' ? 'y0' : 'y1';
    var shop = (key === 's1' && l.zone === 'mu');
    var sf = shop ? 0.04 : 0.2 + 0.12 * l.r, sr = shop ? 0.22 : 0.25 + 0.15 * l.r2, ss = shop ? 0.05 : 0.14 + 0.08 * l.r3;
    var x0 = l.x0 + dw * ss, x1 = l.x1 - dw * ss;
    var y0, y1;
    if (front === 'y0') { y0 = l.y0 + dh * sf; y1 = l.y1 - dh * sr; } else { y0 = l.y0 + dh * sr; y1 = l.y1 - dh * sf; }
    return [x0, y0, x1, y1];
  }
  /* mode: 'road' (simple view) or 'aerial' (Pro view / one pager). opts: { w, h, k, cx, cy, p (id prefix), zoneOpacity } */
  function mapSVG(key, mode, o) {
    var Wd = buildWorld(key), W = Wd.W, s = Wd.subject, p = o.p, k = o.k, A = W.angle;
    var scx = (s.x0 + s.x1) / 2, scy = (s.y0 + s.y1) / 2;
    var T = 'translate(' + o.cx + ' ' + o.cy + ') rotate(' + A + ') scale(' + k + ') translate(' + (-scx) + ' ' + (-scy) + ')';
    var rad = A * Math.PI / 180, cs = Math.cos(rad), sn = Math.sin(rad);
    function P(x, y) { var dx = (x - scx) * k, dy = (y - scy) * k; return [o.cx + dx * cs - dy * sn, o.cy + dx * sn + dy * cs]; }
    var r = rng(W.seed + 101), out = [], aerial = mode === 'aerial';
    out.push('<svg width="' + o.w + '" height="' + o.h + '" viewBox="0 0 ' + o.w + ' ' + o.h + '"><defs><filter id="' + p + '-lb" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter></defs>');
    out.push('<rect width="' + o.w + '" height="' + o.h + '" fill="' + (aerial ? '#3D4836' : '#ECEEE8') + '"/>');
    out.push('<g transform="' + T + '">');
    // blocks / parks
    Wd.blocks.forEach(function (b) {
      if (b.park) out.push('<path d="' + rectPath(b.x0, b.y0, b.x1, b.y1) + '" fill="' + (aerial ? '#4F6A3A' : '#CFE7C6') + '"/>');
    });
    // lots
    var grass = ['#4A5A3D', '#536340', '#465437', '#5A6A45'];
    Wd.lots.forEach(function (l) {
      out.push('<path d="' + rectPath(l.x0, l.y0, l.x1, l.y1) + '" fill="' + (aerial ? grass[Math.floor(l.r * 4)] : '#F7F8F4') + '" stroke="' + (aerial ? 'rgba(255,255,255,.10)' : '#D7DBD3') + '" stroke-width="1" vector-effect="non-scaling-stroke"/>');
    });
    if (aerial) {
      // driveways, trees, roofs
      Wd.lots.forEach(function (l) {
        var f = footprint(l, key), cx = (f[0] + f[2]) / 2, dvw = Math.min(8, (l.x1 - l.x0) * 0.18);
        var dx = l.r3 > 0.5 ? f[2] - dvw - 1 : f[0] + 1;
        if (l.row === 'top') out.push('<path d="' + rectPath(dx, l.y0, dx + dvw, f[1]) + '" fill="#8E9192"/>');
        else out.push('<path d="' + rectPath(dx, f[3], dx + dvw, l.y1) + '" fill="#8E9192"/>');
        var nt = Math.floor(l.r2 * 3);
        for (var i = 0; i < nt; i++) {
          var tx = l.x0 + (l.x1 - l.x0) * (0.2 + 0.6 * r()), ty = l.row === 'top' ? l.y1 - (l.y1 - l.y0) * (0.08 + 0.18 * r()) : l.y0 + (l.y1 - l.y0) * (0.08 + 0.18 * r());
          var tr = 5 + 6 * r();
          out.push('<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="' + tr.toFixed(1) + '" fill="#2E3B25"/><circle cx="' + (tx - tr * 0.25).toFixed(1) + '" cy="' + (ty - tr * 0.25).toFixed(1) + '" r="' + (tr * 0.55).toFixed(1) + '" fill="#3C4C2E"/>');
        }
        var roofs = ['#8C9196', '#A54E3C', '#3E4248', '#C5C8CC', '#707479', '#B7B1A6'];
        out.push('<path d="' + rectPath(f[0], f[1], f[2], f[3]) + '" fill="' + roofs[Math.floor(l.r3 * roofs.length)] + '" stroke="rgba(0,0,0,.25)" stroke-width="1" vector-effect="non-scaling-stroke"/>');
        out.push('<path d="M' + f[0].toFixed(1) + ' ' + ((f[1] + f[3]) / 2).toFixed(1) + 'H' + f[2].toFixed(1) + '" stroke="rgba(255,255,255,.18)" stroke-width="1" vector-effect="non-scaling-stroke"/>');
      });
      Wd.blocks.forEach(function (b) { if (!b.park) return; for (var i = 0; i < 26; i++) { var tx = b.x0 + (b.x1 - b.x0) * r(), ty = b.y0 + (b.y1 - b.y0) * r(), tr = 7 + 9 * r(); out.push('<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="' + tr.toFixed(1) + '" fill="#2B3A22"/>'); } });
    }
    // roads
    Wd.roads.forEach(function (rd) {
      var d = 'M' + rd.x1 + ' ' + rd.y1 + 'L' + rd.x2 + ' ' + rd.y2;
      if (aerial) {
        out.push('<path d="' + d + '" stroke="#5C6164" stroke-width="' + rd.w + '" fill="none"/>');
        if (rd.main) out.push('<path d="' + d + '" stroke="rgba(255,255,255,.7)" stroke-width="1.5" stroke-dasharray="14 12" fill="none" vector-effect="non-scaling-stroke"/>');
      } else {
        out.push('<path d="' + d + '" stroke="' + (rd.main ? '#E9CF8E' : '#DADFD7') + '" stroke-width="' + (rd.w + 3) + '" fill="none"/>');
        out.push('<path d="' + d + '" stroke="' + (rd.main ? '#FBE7B3' : '#FFFFFF') + '" stroke-width="' + rd.w + '" fill="none"/>');
      }
    });
    // zoning wash
    out.push('<g id="' + p + '-zone" style="opacity:0">');
    Wd.lots.forEach(function (l) { out.push('<path d="' + rectPath(l.x0, l.y0, l.x1, l.y1) + '" fill="' + ZC[l.zone] + '" fill-opacity="' + (o.zoneOpacity || 0.82) + '" stroke="#fff" stroke-opacity=".7" stroke-width="1" vector-effect="non-scaling-stroke"/>'); });
    Wd.blocks.forEach(function (b) { if (b.park) out.push('<path d="' + rectPath(b.x0, b.y0, b.x1, b.y1) + '" fill="' + ZC.os + '" fill-opacity="' + (o.zoneOpacity || 0.82) + '"/>'); });
    out.push('</g>');
    // building outlines (layer)
    out.push('<g id="' + p + '-bld" style="opacity:0">');
    Wd.lots.forEach(function (l) { var f = footprint(l, key); out.push('<path d="' + rectPath(f[0], f[1], f[2], f[3]) + '" fill="rgba(56,189,248,.12)" stroke="#38BDF8" stroke-width="1.6" vector-effect="non-scaling-stroke"/>'); });
    out.push('</g>');
    // flood (away from the subject)
    // flood / overland-flow extent: drawn in the rear yards up the street, deliberately NOT touching the subject (its chips read 'Clear')
    var fx = (s.x0 + s.x1) / 2 + 150, fy = (s.row === 'top' ? s.y0 - 150 : s.y0 - 120), fw = 70, fh = 26;
    out.push('<g id="' + p + '-flood" style="opacity:0"><path d="M' + (fx - fw) + ' ' + fy + ' C ' + (fx - fw) + ' ' + (fy - fh) + ', ' + (fx - fw * 0.2) + ' ' + (fy - fh * 1.3) + ', ' + (fx + fw * 0.4) + ' ' + (fy - fh * 0.8) + ' S ' + (fx + fw * 1.2) + ' ' + (fy + fh * 0.2) + ', ' + (fx + fw * 0.5) + ' ' + (fy + fh) + ' S ' + (fx - fw) + ' ' + (fy + fh * 0.9) + ', ' + (fx - fw) + ' ' + fy + 'Z" fill="rgba(59,130,246,.38)" stroke="#60A5FA" stroke-width="1.5" vector-effect="non-scaling-stroke"/></g>');
    // services: water (blue) + stormwater (green) along the front road, wastewater (red) behind the rear boundary
    // distances match the chips: stormwater "≈ 1 m from the boundary" sits right at the front boundary, water "~3 m" in the berm,
    // wastewater "~3 m" just behind the rear boundary (1 map unit ≈ 0.2 m at this scale)
    var frontY = s.row === 'top' ? s.y0 : s.y1, dir = s.row === 'top' ? -1 : 1;
    var yWater = frontY + dir * 15, yStorm = frontY + dir * 5, rearY = s.row === 'top' ? s.y1 : s.y0, yWaste = rearY - dir * 15;
    out.push('<g id="' + p + '-svc" style="opacity:0">');
    var pwW = (3.4 / k).toFixed(2);
    out.push('<path id="' + p + '-pw" d="M-1400 ' + yWater + 'H1600" stroke="#2563EB" stroke-width="' + pwW + '" fill="none"/>');
    out.push('<path id="' + p + '-pss" d="M-1400 ' + yStorm + 'H1600" stroke="#16A34A" stroke-width="' + pwW + '" fill="none"/>');
    out.push('<path id="' + p + '-pww" d="M-1400 ' + yWaste + 'H1600" stroke="#DC2626" stroke-width="' + pwW + '" fill="none"/>');
    out.push('</g>');
    // subject parcel (cadastre yellow)
    out.push('<path id="' + p + '-parcel" d="' + rectPath(s.x0, s.y0, s.x1, s.y1) + '" fill="rgba(242,194,0,.28)" stroke="#F2C200" stroke-width="' + (3.8 / k).toFixed(2) + '" stroke-linejoin="round"/>');
    out.push('<path id="' + p + '-dist" style="opacity:0" d="M' + scx + ' ' + rearY + 'V' + yWaste + '" stroke="' + (aerial ? '#fff' : '#0F172A') + '" stroke-width="2.4" stroke-dasharray="4 3" vector-effect="non-scaling-stroke"/>');
    out.push('</g>');
    // blurred map labels (street names are always blurred)
    out.push('<g filter="url(#' + p + '-lb)" opacity="' + (aerial ? 0.75 : 0.55) + '">');
    W.hy.forEach(function (y, i) { var a = P(-120 + i * 90, y), b = 70 + 30 * ((i * 7) % 3); out.push('<rect x="' + (a[0] - b / 2).toFixed(1) + '" y="' + (a[1] - 6).toFixed(1) + '" width="' + b + '" height="12" rx="5" fill="' + (aerial ? '#fff' : '#6B7280') + '" transform="rotate(' + A + ' ' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ')"/>'); });
    out.push('</g>');
    out.push('</svg>');
    var dm = P(scx, (rearY + yWaste) / 2), pc = P(scx, scy);
    return { svg: out.join(''), dist: dm, parcel: pc, subject: s, k: k };
  }

  /* ---------------- icons ---------------- */
  var I = {
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    pro: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    save: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    lock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    print: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    cursor: '<svg width="30" height="30" viewBox="0 0 30 30"><path d="M4 2 L4 24 L10 18.5 L14.2 27.5 L18 25.8 L13.8 17 L22 17 Z" fill="#fff" stroke="#0F172A" stroke-width="1.8" stroke-linejoin="round"/></svg>'
  };

  /* ---------------- builders ---------------- */
  function verdictCard(key, id, extra) {
    var S = SITES[key];
    var sum = S.skel
      ? '<div class="vsum" id="' + id + '-sum"><div class="sr-skel" style="width:94%;margin-top:6px"></div><div class="sr-skel" style="width:62%;margin-top:9px"></div></div>'
      : '<div class="vsum" id="' + id + '-sum">' + S.sum[0] + '<span class="ind" id="' + id + '-ind">' + S.sum[1] + '</span>' + S.sum[2] + '</div>';
    var chips = S.skel
      ? S.skelChips.map(function (w, i) { return '<span class="vchip skel" id="' + id + '-c' + i + '" style="width:' + w + 'px"></span>'; }).join('')
      : S.chips.map(function (c, i) { return '<span class="vchip ' + c[0] + '" id="' + id + '-c' + i + '">' + c[1] + '</span>'; }).join('');
    return '<div class="sr-card" id="' + id + '" style="' + (extra || '') + '">' +
      '<div class="v-top"><h3>Development potential</h3><span class="vpill ' + S.verdict + '" id="' + id + '-pill">' + S.vword + '</span></div>' +
      '<div class="vhead">' + S.vhead + '</div>' + sum +
      '<div class="vchips">' + chips + '</div>' +
      (S.note ? '<div class="vnote" id="' + id + '-note">' + S.note + '</div>' : '') + '</div>';
  }
  function zoneCardS2(id, top) {
    return '<div class="sr-card" id="' + id + '" style="top:' + top + 'px;height:548px">' +
      '<h3>What could go here</h3>' +                                                                            // [V]
      '<div class="zbadge" style="background:' + ZC.mhs + '"><span style="width:10px;height:10px;border-radius:2px;background:#C9A227;display:inline-block"></span>Mixed Housing Suburban</div>' +
      '<div class="zdesc" id="' + id + '-desc">Mixed Housing Suburban zone — provides for suburban intensification: standalone homes, duplexes, terraces and low-rise apartments, generally two storeys.</div>' + // [V]
      '<div class="zguide">general guide for this zone type</div>' +                                              // [V]
      '<div class="zcols"><div class="zcol" id="' + id + '-wo"><div class="h"><i style="background:#16A34A"></i>Without resource consent</div><ul><li>Up to three dwellings per site that meet the zone standards — standalone, duplex or terraced</li></ul></div>' + // [V]
      '<div class="zcol" id="' + id + '-wi"><div class="h"><i style="background:#2563EB"></i>With a resource consent</div><div class="sr-skel" style="width:86%;margin-top:14px"></div><div class="sr-skel" style="width:70%"></div><div class="sr-skel" style="width:78%"></div></div></div>' + // header [V]; items unknown until Session A → skeleton
      '<div class="zgrid" id="' + id + '-grid"><div class="zstd"><div class="k">Height</div><div class="v">8 m + 1 m roof (about 2 storeys)</div></div>' +   // [V]
      '<div class="zstd"><div class="k">Building coverage</div><div class="v">40% of the site</div></div>' +              // [V]
      '<div class="zstd"><div class="k">Yards</div><div class="v">Front 3 m · side & rear 1 m</div></div></div>' +        // [V]
      '<div class="zfoot">Indicative only — overlays and site standards change what\'s possible. Confirm with the council or a planner before you rely on it.</div></div>'; // [V]
  }
  function zoneCardSkel(key, id, top) {
    var S = SITES[key];
    return '<div class="sr-card" id="' + id + '" style="top:' + top + 'px;height:200px"><h3>What could go here</h3>' +
      '<div class="zbadge" style="background:' + ZC[S.zk] + '">' + ZN[S.zk] + '</div>' +
      '<div class="sr-skel" style="width:92%"></div><div class="sr-skel" style="width:78%"></div><div class="sr-skel" style="width:60%"></div></div>';
  }
  function overlaysCard(key, id, top) {
    var h = '<div class="sr-card" id="' + id + '" style="top:' + top + 'px;height:' + (key === 's1' ? 492 : 190) + 'px"><h3>Planning overlays &amp; controls</h3>'; // [V]
    if (key === 's1') {
      h += '<div class="og" id="' + id + '-g0"><div class="gh" style="color:#B91C1C"><i style="background:#DC2626"></i>Constraints</div><div class="orow red" id="' + id + '-r0"><div class="t">Designation · Road Widening (Auckland Transport)</div></div></div>' + // [V]
        '<div class="og" id="' + id + '-g1"><div class="gh" style="color:#92400E"><i style="background:#D97706"></i>Design around</div><div class="orow amber" id="' + id + '-r1"><div class="t">Volcanic viewshaft · Mount Eden</div><div class="d">Building height is capped to protect views of the maunga — it can be lower than the zone allows; a height check is essential.</div></div></div>' + // [V]
        '<div class="og" id="' + id + '-g2"><div class="gh" style="color:#15803D"><i style="background:#16A34A"></i>Opportunities</div><div class="orow green" id="' + id + '-r2"><div class="t">Height Variation Control · 21m</div></div></div>' + // [V]
        '<div class="og" id="' + id + '-g3"><div class="gh" style="color:#64748B"><i style="background:#94A3B8"></i>Good to know</div><div class="orow grey" id="' + id + '-r3"><div class="t">Walkable catchment</div></div></div>'; // [V] (live test)
    } else if (key === 's2') {
      h += '<div class="ocalm">No overlays, precincts or designations touch this parcel.</div>'; // [V]
    } else {
      h += '<div class="og"><div class="gh" style="color:#B91C1C"><i style="background:#DC2626"></i>Constraints</div><div class="orow red"><div class="t">Special Character Area</div><div class="d">Removing or demolishing pre-1944 buildings, and new buildings, need resource consent; special-character standards replace some zone standards.</div></div></div>'; // [V]
    }
    return h + '</div>';
  }
  function servicesCard(id, top) {
    var sv = function (n, c, s, x) { return '<div class="svc"><div class="n"><i style="background:' + c + '"></i>' + n + '</div><div class="s">' + s + '</div>' + (x ? '<div class="x">' + x + '</div>' : '') + '</div>'; };
    return '<div class="sr-card" id="' + id + '" style="top:' + top + 'px;height:488px"><h3>Site services &amp; hazards</h3>' + // [V]
      '<div class="svh">Services</div><div class="svgrid" id="' + id + '-sv">' +
      sv('Water supply', '#2563EB', 'Available · ~3 m') + sv('Wastewater', '#DC2626', 'Available · ~3 m') + sv('Stormwater', '#16A34A', 'Available · ~1 m', 'Nearest 150 mm VC pipe ≈ 1 m from the boundary') + // labels [V], values [D]
      sv('Piped gas', '#94A3B8', 'In coverage area') + sv('Electricity', '#94A3B8', 'In coverage area', 'Network covers this area — connection subject to the distributor') + '</div>' + // [V]
      '<div class="svh">Hazards</div><div class="svgrid h4" id="' + id + '-hz">' + sv('Flood plain', '#60A5FA', 'Clear') + sv('Flood-prone area', '#60A5FA', 'Clear') + sv('Overland flow path', '#60A5FA', 'Clear') + sv('Coastal inundation', '#60A5FA', 'Clear') + '</div>' + // [V]
      '<div class="svfoot" id="' + id + '-foot">Mapped pipe positions are approximate — always lodge a beforeUdig request before any excavation.</div></div>'; // [V]
  }
  function pointerCards(id, top) {
    return '<div class="sr-card" id="' + id + '-req" style="top:' + top + 'px;height:126px"><h3>What this site would require</h3><div class="ptabs"><span class="ptab on">All</span><span class="ptab">Required</span><span class="ptab">Likely</span></div></div>' + // [V]
      '<div class="sr-card" id="' + id + '-fea" style="top:' + (top + 142) + 'px;height:96px"><h3>Rough feasibility</h3><div class="sub">Your numbers, our arithmetic.</div></div>' + // [V]
      '<div id="' + id + '-disc" class="disc" style="position:absolute;left:4px;width:740px;top:' + (top + 256) + 'px">Indicative only — a planning heuristic from public council data, not advice. Overlays, precincts, plan changes and site conditions change what\'s possible. Confirm with a planner or the council.</div>'; // [V]
  }
  // Column layout per site (tops in px inside the scrolling column)
  var COL = {
    s1: { verdict: 0, zone: 220, overlays: 436, services: 944, pointer: 1448 },
    s2: { verdict: 0, zone: 220, overlays: 784, services: 990, pointer: 1494 },
    s3: { verdict: 0, zone: 278, overlays: 494, services: 750, pointer: 1254 }
  };
  function simplePage(key, id) {
    var S = SITES[key], C = COL[key], m = mapSVG(key, 'road', { w: 690, h: 600, k: WORLD[key].k, cx: 345, cy: 300, p: id + '-m' });
    var pills = ['s1', 's2', 's3'].map(function (k2, i) { var on = k2 === key; return '<div class="sr-pill' + (on ? ' on' : '') + '" id="' + id + '-pill' + (i + 1) + '" style="left:' + (150 + i * 222) + 'px"><span class="tag">Site ' + (i + 1) + '</span><span class="addr">' + SITES[k2].fake + '</span></div>'; }).join('');
    var col = verdictCard(key, id + '-v', 'top:' + C.verdict + 'px;height:' + (key === 's3' ? 262 : 204) + 'px') +
      (key === 's2' ? zoneCardS2(id + '-z', C.zone) : zoneCardSkel(key, id + '-z', C.zone)) +
      overlaysCard(key, id + '-o', C.overlays) + servicesCard(id + '-s', C.services) + pointerCards(id + '-p', C.pointer);
    var html = '<div class="sr" id="' + id + '">' +
      '<div class="sr-head"><div class="sr-title">Site research</div>' +
      '<div class="sr-search">' + I.pin + '<span class="addr blurred" id="' + id + '-q">' + S.fake + '</span></div>' +
      '<div class="sr-actions"><span class="sr-btn" id="' + id + '-bpro">' + I.pro + 'Open Pro view</span><span class="sr-btn" id="' + id + '-bsave">' + I.save + 'Save this research</span><span class="sr-btn green">' + I.plus + 'Create project here</span></div></div>' + // [V]
      '<div class="sr-saved"><span class="lbl">Saved sites</span>' + pills + '<span class="sr-recent">Recent searches</span></div>' + // [V]
      '<div class="sr-prog"><div class="bar" id="' + id + '-bar"></div></div>' +
      '<div class="sr-map" id="' + id + '-map">' + m.svg +
      '<div class="sr-layers" id="' + id + '-layers"><span class="sr-lchip" id="' + id + '-lz"><span class="dot"></span>Zoning</span><span class="sr-lchip" id="' + id + '-ls"><span class="dot"></span>Services</span></div>' +
      '<div class="sr-legend" id="' + id + '-legend" style="opacity:0">' + legendFor(key) + '</div>' +
      '<div id="' + id + '-dlbl" style="position:absolute;left:' + (m.dist[0] + 16).toFixed(0) + 'px;top:' + (m.dist[1] - 15).toFixed(0) + 'px;opacity:0;background:#0F172A;color:#fff;border-radius:7px;padding:5px 9px;font:700 12.5px/1.2 Inter;white-space:nowrap">Distance to boundary · ~3 m</div>' + // label [V], value [D]
      '</div>' +
      '<div class="sr-colwrap"><div class="sr-col" id="' + id + '-col">' + col + '</div></div>' +
      '<div class="sr-loading" id="' + id + '-load"><span class="spin"></span><span>Researching the site — boundary, zoning, overlays, services, hazards &amp; history…</span></div>' + // [V]
      '</div>';
    return { html: html, map: m };
  }
  /* 9:16 re-lay: the same cards stacked at panel width (528 px, shown at 1.8x in a 950 px frame), so the summary line,
   * chips and overlay rows wrap and read in full instead of being a cropped desktop page. Cards flow (no fixed tops). */
  function narrowPage(key, id) {
    var S = SITES[key];
    var col = verdictCard(key, id + '-v', '') + zoneCardSkel(key, id + '-z', 0) + overlaysCard(key, id + '-o', 0) + servicesCard(id + '-s', 0);
    return '<div class="sr nar" id="' + id + '">' +
      '<div class="nar-head"><span class="nar-title">Site research</span><span class="nar-q">' + I.pin + '<span class="blurred">' + S.fake + '</span></span></div>' +
      '<div class="nar-col" id="' + id + '-col">' + col + '</div></div>';
  }
  function legendFor(key) {
    var ks = key === 's1' ? ['mu', 'thab', 'mhu', 'mhs', 'os'] : key === 's2' ? ['mhs', 'mhu', 'thab', 'sh', 'os'] : ['sh', 'mhs', 'os'];
    return ks.map(function (z) { return '<span><i style="background:' + ZC[z] + '"></i>' + ZN[z] + '</span>'; }).join('');
  }
  function proPage(key, id) {
    var S = SITES[key], m = mapSVG(key, 'aerial', { w: 840, h: 682, k: WORLD[key].k * 1.3, cx: 420, cy: 330, p: id + '-m', zoneOpacity: 0.58 });
    var tabs = ['Summary', 'Title', 'Zoning', 'Overlays', 'Characteristics', 'CV & sales', 'Feasibility']; // [V]
    var html = '<div class="sr" id="' + id + '">' +
      '<div class="pro-head"><div class="pro-title">Site research — Pro</div><div class="pro-subt">A full-height map and the full planning picture, side by side.</div>' + // [V]
      '<div class="pro-search">' + I.pin + '<span class="blurred">' + S.fake + '</span></div>' +
      '<div class="pro-actions"><span class="sr-btn">' + I.back + 'Simple view</span><span class="sr-btn green" id="' + id + '-b1p">' + I.print + 'One pager</span></div></div>' + // [V]
      '<div class="pro-map" id="' + id + '-map">' + m.svg +
      '<div class="sr-layers" style="left:16px;top:16px"><span class="sr-lchip" id="' + id + '-lz"><span class="dot"></span>Zoning</span><span class="sr-lchip" id="' + id + '-lb"><span class="dot"></span>Buildings</span><span class="sr-lchip" id="' + id + '-ls"><span class="dot"></span>Services</span><span class="sr-lchip" id="' + id + '-lf"><span class="dot"></span>Flood &amp; hazards</span></div>' + // [V]
      '<div class="sr-legend" id="' + id + '-legend" style="opacity:0">' + legendFor(key) + '</div></div>' +
      '<div class="pro-panel"><div class="pro-tabs">' + tabs.map(function (t, i) { return '<span class="pro-tab' + (i === 0 ? ' on' : '') + '" id="' + id + '-t' + i + '">' + (t === 'CV & sales' ? I.lock : '') + t.replace('&', '&amp;') + '</span>'; }).join('') + '</div>' +
      // Summary pane
      '<div class="pro-pane" id="' + id + '-sum">' + verdictCard(key, id + '-pv', 'position:relative;width:580px;height:auto') +
      '<div class="tf" style="margin-top:16px"><span class="k">Land area</span><span class="v">' + S.area + '</span><span class="k">Council</span><span class="v">Auckland</span><span class="k">Zone</span><span class="v">' + S.zone + '</span></div></div>' +
      // Title pane
      '<div class="pro-pane" id="' + id + '-title" style="opacity:0"><h3 class="man" style="font-size:21px">Title</h3>' +
      '<div class="tf" id="' + id + '-tf"><span class="k">Title number</span><span class="v blurred-strong">NA123X/45</span><span class="k">Type</span><span class="v blurred-strong">Xxxxxxxx</span><span class="k">Estate</span><span class="v blurred-strong">Xxxx xxxxxx</span><span class="k">Status</span><span class="v blurred-strong">Xxxx</span><span class="k">Issue date</span><span class="v blurred-strong">0 Xxx 0000</span><span class="k">Guarantee</span><span class="v blurred-strong">Xxxxxxxxx</span><span class="k">Land district</span><span class="v blurred-strong">Xxxxx Xxxxxxxx</span><span class="k">Legal description</span><span class="v blurred-strong">Lot 00 DP 000000</span></div>' + // labels per truth sheet [1.8]; every value blurred (no invented title facts legible)
      '<div class="own" id="' + id + '-own"><div class="cnt">1 owner on the title</div>' +                         // [V] format; count = demo
      '<div class="row">Owner names <span class="lic" id="' + id + '-lic">' + I.lock + 'Available with a data licence</span></div>' + // [V]
      '<div class="note">Owner names come from a LINZ data licence.</div></div>' +                                  // [V]
      '<div class="fee" id="' + id + '-fee">Reads as a freehold (fee simple) lot — the simplest title to develop.</div></div>' + // [V]
      '<div class="pro-foot">Indicative only — a planning heuristic from public council &amp; LINZ data, not advice. Overlays, plan changes and site conditions change what\'s possible. Owner, CV and sales are licensed data. Confirm with a planner, the council or LINZ.</div>' + // [V]
      '</div></div>';
    return { html: html, map: m };
  }
  function onePager(key, id, dateStr) {
    var S = SITES[key], m = mapSVG(key, 'aerial', { w: 548, h: 300, k: WORLD[key].k * 0.9, cx: 274, cy: 150, p: id + '-m', zoneOpacity: 0.5 });
    return '<div class="op" id="' + id + '">' +
      '<div class="op-h"><img src="qsme-logo.svg" alt="QSME"><span class="rep">Site report</span><span class="dt">' + dateStr + '</span></div>' + // "QSME · Site report" [V]
      '<div class="op-rule"></div><div class="op-addr">' + S.fake + '</div>' +
      '<div class="op-map">' + m.svg.replace('id="' + id + '-m-svc" style="opacity:0"', 'id="' + id + '-m-svc" style="opacity:1"').replace('id="' + id + '-m-zone" style="opacity:0"', 'id="' + id + '-m-zone" style="opacity:1"') + '</div>' +
      '<div class="op-grid">' +
      '<div class="op-sec"><h4>Key facts</h4><p>Land area <b>' + S.area + '</b><br>Council <b>Auckland</b><br>Zone <b>' + S.zone + '</b></p></div>' + // headings [V]
      '<div class="op-sec"><h4>Title &amp; ownership</h4><p style="filter:blur(4.5px)">Title <b>NA123X/45</b> · Freehold<br>Fee simple · Live · 2 May 2011<br>Lot 00 DP 000000 · 1 owner</p></div>' +
      '<div class="op-sec"><h4>Zoning &amp; potential</h4><p><b>Strong development potential</b><br>Indicatively 2–5 homes here; 2 things to design around.</p></div>' +
      '<div class="op-sec"><h4>Overlays &amp; controls</h4><p>Designation · Road Widening (Auckland Transport)<br>Volcanic viewshaft · Mount Eden<br>Height Variation Control · 21m</p></div>' +
      '<div class="op-sec"><h4>Services</h4><p>Water supply <b>Available · ~3 m</b><br>Wastewater <b>Available · ~3 m</b><br>Stormwater <b>Available · ~1 m</b></p></div>' +
      '<div class="op-sec"><h4>Flood &amp; hazards</h4><p>Flood plain <b>Clear</b> · Flood-prone area <b>Clear</b><br>Overland flow path <b>Clear</b> · Coastal inundation <b>Clear</b></p></div>' +
      '</div><div class="op-disc">Indicative only — a planning heuristic from public council &amp; LINZ data, not advice. Overlays, plan changes and site conditions change what\'s possible. Owner, CV and sales are licensed data. Confirm with a planner, the council or LINZ.</div></div>'; // [V]
  }
  function printDialog(id) {
    return '<div class="pd" id="' + id + '"><div class="t">Print</div><div class="s">1 sheet of paper</div>' +
      '<div class="r">Destination<span class="sel">Save as PDF<span>▾</span></span></div>' +
      '<div class="r">Pages<span class="sel">All<span>▾</span></span></div>' +
      '<div class="r">Layout<span class="sel">Portrait<span>▾</span></span></div>' +
      '<div class="btns"><span class="b">Cancel</span><span class="b p" id="' + id + '-save">Save</span></div></div>';
  }
  window.SiteUI = { SITES: SITES, ZC: ZC, ZN: ZN, COL: COL, I: I, mapSVG: mapSVG, simplePage: simplePage, narrowPage: narrowPage, proPage: proPage, verdictCard: verdictCard, onePager: onePager, printDialog: printDialog, rng: rng };
})();
