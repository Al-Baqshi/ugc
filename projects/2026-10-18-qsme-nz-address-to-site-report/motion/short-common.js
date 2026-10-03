/* Shared helpers for the 9:16 chapter cut-downs (motion kit pages, 1080x1920).
 * Screen frame: x 65..1015, y 462..1100 (950x638). Captions sit BELOW the frame, one box, bottom edge at y 1250
 * (the bottom of the Reels safe box), so they never cover the rows they explain. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var VIEW = { '#cam': [1500, 760, 950, 638], '#ncam': [528, 1600, 950, 638], '#dcam': [1080, 1920, 1080, 1920] };
  var S = {
    $: $,
    cam: function (sel, keys) {   // keys: [t, cx, cy, scale, ease]; clamped so the view stays on the page when it can
      var B = VIEW[sel];
      keys = keys.map(function (k) { var hw = B[2] / 2 / k[3], hh = B[3] / 2 / k[3], x = k[1], y = k[2];
        if (B[0] * k[3] >= B[2]) x = Math.min(Math.max(x, hw), B[0] - hw);
        if (B[1] * k[3] >= B[3]) y = Math.min(Math.max(y, hh), B[1] - hh);
        return [k[0], x, y, k[3], k[4]]; });
      Kit.add(sel, 'var:--cx', keys.map(function (k) { return [k[0], k[1], k[4]]; }));
      Kit.add(sel, 'var:--cy', keys.map(function (k) { return [k[0], k[2], k[4]]; }));
      Kit.add(sel, 'var:--cs', keys.map(function (k) { return [k[0], k[3], k[4]]; }));
    },
    cap: function (t0, t1, html) {
      var d = document.createElement('div'); d.className = 'caption box'; d.innerHTML = '<span>' + html + '</span>'; $('root').appendChild(d);
      if (t0 <= 0) Kit.add(d, 'opacity', [[0, 1]]); else Kit.pop(d, t0, { dy: 14 });
      Kit.out(d, t1 - 0.14, 0.14);
    },
    head: function (id, t0, t1, slam) { Kit.scene('#' + id, t0, t1); if (t0 > 0) { if (slam) Kit.slam('#' + id, t0, { from: 1.1 }); else Kit.pop('#' + id, t0, { dy: 20 }); } },
    ranges: function (id, rs) { Kit.each(function (t) { $(id).style.display = rs.some(function (r) { return t >= r[0] && t < r[1]; }) ? '' : 'none'; }); },
    hide: function (sel) { Kit.add(sel, 'opacity', [[0, 0]]); },
    /* Scroll a flowing column to anchors measured from the real layout (fonts are loaded before the first render).
     * keys: [t, anchor, ease] where anchor is a number (px) or [selector, px gap above it in the view]. */
    scroll: function (colSel, keys) {
      var col = document.querySelector(colSel), cache = null;
      function px(a) {
        if (typeof a === 'number') return a;
        var y = 0; for (var n = document.querySelector(a[0]); n && n !== col; n = n.offsetParent) y += n.offsetTop;
        return Math.max(0, y - (a[1] || 0));
      }
      Kit.each(function (t) {
        if (!cache) cache = keys.map(function (k) { return { t: k[0], v: px(k[1]), e: k[2] }; });
        var v = cache[0].v;
        for (var i = 1; i < cache.length; i++) {
          var a = cache[i - 1], b = cache[i];
          if (t >= b.t) { v = b.v; continue; }
          if (t > a.t) { var p = (t - a.t) / (b.t - a.t), f = b.e && b.e !== 'hold' ? Kit.ease[b.e] : null; v = b.e === 'hold' ? a.v : a.v + (b.v - a.v) * (f ? f(p) : p); }
          break;
        }
        col.style.transform = 'translateY(' + (-v).toFixed(2) + 'px)';
      });
    },
    marker: function (el, id, color) {
      el.insertAdjacentHTML('beforeend', '<svg class="mk" viewBox="0 0 700 14" preserveAspectRatio="none"><path id="' + id + '" d="M2 8 C 160 2, 420 13, 698 5" fill="none" stroke="' + (color || '#E0302A') + '" stroke-width="6" stroke-linecap="round"/></svg>');
      return $(id);
    },
    hl: function (camEl, id, box, cls) { camEl.insertAdjacentHTML('beforeend', '<div id="' + id + '" class="hl ' + (cls || '') + '" style="left:' + (box[0] - 8) + 'px;top:' + (box[1] - 8) + 'px;width:' + (box[2] - box[0] + 16) + 'px;height:' + (box[3] - box[1] + 16) + 'px;opacity:0"></div>'); return $(id); },
    cursor: function (camEl) {
      var cx = [[0, 1300]], cy = [[0, 640]], co = [[0, 0]], n = 0;
      camEl.insertAdjacentHTML('beforeend', '<div id="cur" class="cur">' + window.SiteUI.I.cursor + '</div>');
      return {
        to: function (t0, t1, x, y) { cx.push([t0, cx[cx.length - 1][1]], [t1, x, 'inOut']); cy.push([t0, cy[cy.length - 1][1]], [t1, y, 'inOut']); },
        show: function (t0, t1) { co.push([t0, 0], [t0 + 0.15, 1], [t1, 1], [t1 + 0.15, 0]); },
        click: function (t, x, y) {
          var id = 'ring' + (n++);
          camEl.insertAdjacentHTML('beforeend', '<div class="ring" id="' + id + '" style="left:' + (x - 22) + 'px;top:' + (y - 22) + 'px;opacity:0"></div>');
          Kit.add('#' + id, 'opacity', [[t, 0], [t + 0.02, 1], [t + 0.42, 0, 'out']]); Kit.add('#' + id, 'scale', [[t, 0.4], [t + 0.42, 1.5, 'out']]);
        },
        done: function () { Kit.add('#cur', 'x', cx); Kit.add('#cur', 'y', cy); Kit.add('#cur', 'opacity', co); }
      };
    }
  };
  window.Short = S;
})();
