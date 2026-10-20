/* Baqshi motion parts: a world map with routes from New Zealand, deterministic (driven by Kit tracks only). */
var BQ = (function () {
  var NS = 'http://www.w3.org/2000/svg';
  var PLACES = {
    nz: [174.8, -36.8, 'New Zealand'], es: [-3.7, 40.4, 'Spain'], it: [12.5, 41.9, 'Italy'], ch: [8.5, 47.4, 'Switzerland'],
    lb: [35.5, 33.9, 'Lebanon'], ae: [55.3, 25.2, 'UAE'], uk: [-0.1, 51.5, 'UK'], us: [-74, 40.7, 'USA'],
    au: [151.2, -33.9, 'Australia'], sg: [103.8, 1.35, 'Singapore'], jp: [139.7, 35.7, 'Japan'], za: [18.4, -33.9, 'South Africa'],
    ca: [-79.4, 43.7, 'Canada'], br: [-46.6, -23.5, 'Brazil'], tr: [29, 41, 'Türkiye'], pt: [-9.1, 38.7, 'Portugal'],
  };

  /* box: the map window element (its CSS size is the visible area). o: { w: full map width px, lon: centre longitude, lat: centre latitude } */
  function map(box, o) {
    var winW = box.clientWidth, winH = box.clientHeight, W = o.w, H = W / 2;
    function xy(lon, lat) {
      var d = ((lon - o.lon + 540) % 360) - 180;
      return [winW / 2 + d / 360 * W, winH / 2 + (o.lat - lat) / 180 * H];
    }
    var x0 = xy(-180, 90);
    [x0[0], x0[0] - W].forEach(function (x) {
      var img = document.createElement('img');
      img.className = 'land'; img.src = 'assets/land-2048.png';
      img.style.left = x + 'px'; img.style.top = x0[1] + 'px'; img.style.width = W + 'px'; img.style.height = H + 'px';
      box.appendChild(img);
    });
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', winW); svg.setAttribute('height', winH); svg.setAttribute('viewBox', '0 0 ' + winW + ' ' + winH);
    svg.innerHTML = '<defs></defs>';
    box.appendChild(svg);
    var api = { xy: xy, svg: svg, box: box, n: 0 };

    /* a pin with a label; returns the pin element (id = prefix-key) */
    api.pin = function (key, id, base, below) {
      var p = PLACES[key], q = xy(p[0], p[1]);
      var el = document.createElement('div');
      el.className = 'pin'; el.id = id; el.style.left = q[0] + 'px'; el.style.top = q[1] + 'px';
      el.innerHTML = '<div class="pi"><div class="dot' + (base ? ' base' : '') + '"></div><div class="pl' + (base ? ' base' : '') + (below ? ' below' : '') + '">' + p[2] + '</div></div>';
      box.appendChild(el);
      return el.firstChild;   // animate the inner part; the outer .pin keeps its centring transform
    };

    /* a route arc from one place to another, blue at the origin, violet at the destination; id for Kit 'trim' */
    api.arc = function (from, to, id, lift) {
      var a = PLACES[from], b = PLACES[to], p = xy(a[0], a[1]), q = xy(b[0], b[1]);
      var dx = q[0] - p[0], dy = q[1] - p[1], len = Math.sqrt(dx * dx + dy * dy);
      var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 - len * (lift || 0.32);
      var g = document.createElementNS(NS, 'linearGradient');
      g.id = id + '-g'; g.setAttribute('gradientUnits', 'userSpaceOnUse');
      g.setAttribute('x1', p[0]); g.setAttribute('y1', p[1]); g.setAttribute('x2', q[0]); g.setAttribute('y2', q[1]);
      g.innerHTML = '<stop offset="0" stop-color="#4fb8ff"/><stop offset="1" stop-color="#a98bff"/>';
      svg.querySelector('defs').appendChild(g);
      var path = document.createElementNS(NS, 'path');
      path.id = id; path.setAttribute('d', 'M' + p[0] + ' ' + p[1] + ' Q' + mx + ' ' + my + ' ' + q[0] + ' ' + q[1]);
      path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'url(#' + id + '-g)'); path.setAttribute('stroke-width', '3.5'); path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
      return path;
    };
    return api;
  }
  return { map: map, PLACES: PLACES };
})();
