// DOM-backed shim of the Figma Plugin API + motion API subset used by 04-motion.js.
// Lets the same script render locally (WebKit) when the Figma MCP is unavailable.
(function () {
  const STYLE_W = { 'Thin': 100, 'Light': 300, 'Regular': 400, 'Medium': 500, 'Semi Bold': 600, 'SemiBold': 600, 'Bold': 700, 'Extra Bold': 800, 'ExtraBold': 800, 'Black': 900 };
  const AVAIL = [['Space Grotesk', ['Medium', 'Bold']], ['Inter', ['Regular', 'Medium', 'Semi Bold', 'Bold']], ['JetBrains Mono', ['Regular', 'Medium']], ['Manrope', ['ExtraBold']], ['Kalam', ['Regular', 'Bold']], ['Permanent Marker', ['Regular']]];
  let ID = 1; const ALL = []; let DURATION = 5;
  const rgba = (c, o = 1) => `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${o})`;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  class Node {
    constructor(type) {
      this.type = type; this.id = '9:' + (ID++); this.el = document.createElement('div');
      const s = this.el.style; s.position = 'absolute'; s.left = '0px'; s.top = '0px'; s.boxSizing = 'border-box'; s.transformOrigin = '0 0';
      Object.assign(this, { _x: 0, _y: 0, _w: 100, _h: 100, _rot: 0, _kids: [], parent: null, _name: type, _fills: [], _strokes: [], _sw: 1, _sa: 'INSIDE', _dash: null, _fx: [], _op: 1, _tracks: {}, _fillTrack: null, _clip: false, _r: 0, _lm: 'NONE', _sizH: 'FIXED', _sizV: 'FIXED', _pad: [0, 0, 0, 0], _gap: 0, _cax: 'MIN', _pax: 'MIN' });
      if (type === 'TEXT') Object.assign(this, { _chars: '', _font: { family: 'Inter', style: 'Regular' }, _fs: 12, _lh: null, _ls: 0, _align: 'LEFT', _auto: 'WIDTH_AND_HEIGHT', _ranges: [] });
      if (type === 'ELLIPSE') s.borderRadius = '50%';
      ALL.push(this); this._apply();
    }
    get name() { return this._name } set name(v) { this._name = String(v); this.el.dataset.name = this._name }
    get x() { return this._x } set x(v) { this._x = v; this._apply() }
    get y() { return this._y } set y(v) { this._y = v; this._apply() }
    get rotation() { return this._rot } set rotation(v) { this._rot = v; this._apply() }
    get opacity() { return this._op } set opacity(v) { this._op = v; this.el.style.opacity = v }
    get fills() { return this._fills } set fills(v) { this._fills = v; this._apply() }
    get strokes() { return this._strokes } set strokes(v) { this._strokes = v; this._apply() }
    get strokeWeight() { return this._sw } set strokeWeight(v) { this._sw = v; this._apply() }
    get strokeAlign() { return this._sa } set strokeAlign(v) { this._sa = v; this._apply() }
    get dashPattern() { return this._dash || [] } set dashPattern(v) { this._dash = v; this._apply() }
    get cornerRadius() { return this._r } set cornerRadius(v) { this._r = v; this._apply() }
    get effects() { return this._fx } set effects(v) { this._fx = v; this._apply() }
    get clipsContent() { return this._clip } set clipsContent(v) { this._clip = v; this._apply() }
    get layoutMode() { return this._lm } set layoutMode(v) { this._lm = v; this._apply(); this._kids.forEach(k => k._apply()) }
    set paddingTop(v) { this._pad[0] = v; this._apply() } set paddingRight(v) { this._pad[1] = v; this._apply() } set paddingBottom(v) { this._pad[2] = v; this._apply() } set paddingLeft(v) { this._pad[3] = v; this._apply() }
    get paddingTop() { return this._pad[0] } get paddingRight() { return this._pad[1] } get paddingBottom() { return this._pad[2] } get paddingLeft() { return this._pad[3] }
    get itemSpacing() { return this._gap } set itemSpacing(v) { this._gap = v; this._apply() }
    get counterAxisAlignItems() { return this._cax } set counterAxisAlignItems(v) { this._cax = v; this._apply() }
    get primaryAxisAlignItems() { return this._pax } set primaryAxisAlignItems(v) { this._pax = v; this._apply() }
    set primaryAxisSizingMode(v) { } set counterAxisSizingMode(v) { }
    get layoutSizingHorizontal() { return this._sizH } set layoutSizingHorizontal(v) { this._sizH = v; if (v === 'FIXED' && this._lm !== 'NONE') this._w = this.el.offsetWidth || this._w; this._apply() }
    get layoutSizingVertical() { return this._sizV } set layoutSizingVertical(v) { this._sizV = v; if (v === 'FIXED' && this._lm !== 'NONE') this._h = this.el.offsetHeight || this._h; this._apply() }
    get children() { return this._kids.slice() }
    get width() { return this._measured('w') } get height() { return this._measured('h') }
    _measured(a) {
      const inAL = this.parent && this.parent._lm !== 'NONE';
      const fixed = a === 'w' ? this._w : this._h;
      if (this.type === 'TEXT') { if (a === 'w' && this._auto !== 'WIDTH_AND_HEIGHT' && !(inAL && this._sizH === 'FILL')) return this._w; if (a === 'h' && this._auto === 'NONE') return this._h; return a === 'w' ? this.el.offsetWidth : this.el.offsetHeight }
      const siz = a === 'w' ? this._sizH : this._sizV;
      if (this._lm !== 'NONE' && siz !== 'FIXED') return a === 'w' ? this.el.offsetWidth : this.el.offsetHeight;
      if (inAL && siz === 'FILL') return a === 'w' ? this.el.offsetWidth : this.el.offsetHeight;
      return fixed;
    }
    resize(w, h) { this._w = w; this._h = h; if (this._lm !== 'NONE') { this._sizH = 'FIXED'; this._sizV = 'FIXED' } if (this.type === 'TEXT' && this._auto === 'WIDTH_AND_HEIGHT') this._auto = 'HEIGHT'; if (this.type === 'TEXT') this._sizH = 'FIXED'; this._apply() }
    resizeWithoutConstraints(w, h) { this.resize(w, h) }
    rescale(s) { this._w *= s; this._h *= s; this._apply() }
    appendChild(c) { if (c.parent) c.parent._kids = c.parent._kids.filter(k => k !== c); c.parent = this; this._kids.push(c); this.el.appendChild(c.el); c._apply() }
    remove() { if (this.parent) this.parent._kids = this.parent._kids.filter(k => k !== this); this.el.remove(); this.parent = null }
    get absoluteBoundingBox() { const r = this.el.getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height } }
    async screenshot() { return null }
    // text
    get characters() { return this._chars } set characters(v) { this._chars = v; this._ranges = []; this._apply() }
    get fontName() { return this._font } set fontName(v) { this._font = v; this._apply() }
    get fontSize() { return this._fs } set fontSize(v) { this._fs = v; this._apply() }
    set lineHeight(v) { this._lh = v.unit === 'PIXELS' ? v.value : null; this._apply() }
    set letterSpacing(v) { this._ls = v.value; this._apply() }
    set textAlignHorizontal(v) { this._align = v; this._apply() }
    get textAutoResize() { return this._auto } set textAutoResize(v) { if (v === 'HEIGHT' && this._auto === 'WIDTH_AND_HEIGHT') this._w = this.el.offsetWidth || this._w; this._auto = v; this._apply() }
    setRangeFills(s, e, p) { this._ranges.push([s, e, p]); this._apply() }
    // motion
    applyManualKeyframeTrack(f, tr) { this._tracks[f.name] = { keyframes: tr.keyframes } }
    get manualKeyframeTracks() { return { ...this._tracks, ...(this._fillTrack ? { fills: this._fillTrack } : {}) } }
    set manualKeyframeTracks(v) { for (const [k, t] of Object.entries(v)) { if (k === 'fills') this._fillTrack = t; else this._tracks[k] = t } }
    get timelines() { return [{ id: 'TL', duration: DURATION }] }
    setTimelineDuration(id, d) { DURATION = d }
    createInstance() { const n = new Node('INSTANCE'); n._w = 1509; n._h = 688; n.el.innerHTML = '<img src="qsme-logo-global.svg" style="width:100%;height:100%;display:block">';   /* Global outputs: wordmark without ® until the owner confirms where QSME is registered (truth sheet, open question 7) */ n._apply(); return n }
    _apply() {
      const s = this.el.style, P = this.parent, inAL = P && P._lm !== 'NONE', isAL = this._lm !== 'NONE';
      if (inAL) { s.position = 'relative'; s.left = ''; s.top = ''; const prim = P._lm === 'HORIZONTAL' ? this._sizH : this._sizV, cnt = P._lm === 'HORIZONTAL' ? this._sizV : this._sizH; s.flex = prim === 'FILL' ? '1 1 0' : '0 0 auto'; s.minWidth = '0'; s.alignSelf = cnt === 'FILL' ? 'stretch' : '' }
      else { s.position = 'absolute'; s.left = this._x + 'px'; s.top = this._y + 'px'; s.flex = '' }
      if (this.type === 'TEXT') {
        const fillH = inAL && this._sizH === 'FILL';
        s.width = this._auto === 'WIDTH_AND_HEIGHT' || fillH ? '' : this._w + 'px'; s.height = this._auto === 'NONE' ? this._h + 'px' : '';
        s.whiteSpace = this._auto === 'WIDTH_AND_HEIGHT' && !fillH ? 'pre' : 'pre-wrap';
        s.fontFamily = `"${this._font.family}"`; s.fontWeight = STYLE_W[this._font.style] || 400; s.fontSize = this._fs + 'px'; s.lineHeight = this._lh ? this._lh + 'px' : 'normal'; s.letterSpacing = this._ls ? (this._ls / 100) + 'em' : 'normal'; s.textAlign = this._align.toLowerCase();
        const f = this._fills[0]; s.color = f ? rgba(f.color, f.opacity ?? 1) : 'transparent'; s.background = 'transparent';
        const ch = this._chars; const cols = new Array(ch.length).fill(null); for (const [a, b, p] of this._ranges) for (let i = a; i < b; i++) cols[i] = p[0] ? rgba(p[0].color, p[0].opacity ?? 1) : null;
        let html = '', cur = undefined, buf = ''; const flush = () => { if (buf) html += cur ? `<span style="color:${cur}">${esc(buf)}</span>` : esc(buf); buf = '' };
        for (let i = 0; i < ch.length; i++) { if (cols[i] !== cur) { flush(); cur = cols[i] } buf += ch[i] } flush(); this.el.innerHTML = html;
      } else {
        if (isAL) {
          s.display = 'flex'; s.flexDirection = this._lm === 'HORIZONTAL' ? 'row' : 'column'; s.gap = this._gap + 'px'; s.padding = this._pad.map(v => v + 'px').join(' ');
          s.alignItems = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', BASELINE: 'baseline' }[this._cax] || 'flex-start';
          s.justifyContent = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', SPACE_BETWEEN: 'space-between' }[this._pax] || 'flex-start';
          const fw = inAL && (P._lm === 'HORIZONTAL' ? this._sizH : this._sizV) === 'FILL';
          s.width = this._sizH === 'FIXED' ? this._w + 'px' : (fw ? '' : 'max-content'); s.height = this._sizV === 'FIXED' ? this._h + 'px' : '';
        } else { s.display = 'block'; s.width = this._w + 'px'; s.height = this._h + 'px' }
        const f = this._fills[0]; s.background = f ? rgba(f.color, f.opacity ?? 1) : 'transparent';
        if (this.type !== 'ELLIPSE') s.borderRadius = this._r ? this._r + 'px' : '0';
      }
      const st = this._strokes[0];
      if (st && this.type !== 'TEXT') { const sw = this._sw; s.outline = `${sw}px ${this._dash && this._dash.length ? 'dashed' : 'solid'} ${rgba(st.color, st.opacity ?? 1)}`; s.outlineOffset = (this._sa === 'INSIDE' ? -sw : this._sa === 'CENTER' ? -sw / 2 : 0) + 'px' } else s.outline = 'none';
      const sh = this._fx.filter(e => e.type === 'DROP_SHADOW' && e.visible !== false).map(e => `${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread || 0}px rgba(${Math.round(e.color.r * 255)},${Math.round(e.color.g * 255)},${Math.round(e.color.b * 255)},${e.color.a})`);
      s.boxShadow = this.type === 'TEXT' ? '' : sh.join(','); const bl = this._fx.find(e => e.type === 'LAYER_BLUR'); s.filter = bl ? `blur(${bl.radius / 2}px)` : '';
      s.overflow = this._clip ? 'hidden' : 'visible';
      s.opacity = this._op; s.transform = this._rot ? `rotate(${-this._rot}deg)` : '';
    }
  }
  const page = new Node('PAGE'); page.id = '2:5'; page.el.style.width = '0px'; page.el.style.height = '0px'; page.el.style.overflow = 'visible';
  const comp = new Node('COMPONENT'); comp.id = '2:27';
  const reg = { '2:5': page, '2:27': comp };
  const mk = t => { const n = new Node(t); page.appendChild(n); return n };
  window.figma = {
    currentPage: page,
    async getNodeByIdAsync(id) { return reg[id] || null },
    async setCurrentPageAsync() { },
    async listAvailableFontsAsync() { const o = []; for (const [f, ss] of AVAIL) for (const s of ss) o.push({ fontName: { family: f, style: s } }); return o },
    async loadFontAsync(f) { await document.fonts.load(`${STYLE_W[f.style] || 400} 40px "${f.family}"`) },
    createFrame() { const n = mk('FRAME'); n.clipsContent = true; n.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; return n },
    createRectangle() { const n = mk('RECTANGLE'); n.fills = [{ type: 'SOLID', color: { r: .85, g: .85, b: .85 } }]; return n },
    createEllipse() { const n = mk('ELLIPSE'); n.fills = [{ type: 'SOLID', color: { r: .85, g: .85, b: .85 } }]; return n },
    createText() { const n = mk('TEXT'); n.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; return n },
    createAutoLayout(dir = 'HORIZONTAL') { const n = figma.createFrame(); n.clipsContent = false; n._lm = typeof dir === 'string' ? dir : 'HORIZONTAL'; n._sizH = 'HUG'; n._sizV = 'HUG'; n._apply(); return n },
    createNodeFromSvg(svg) { const n = mk('FRAME'); const m = svg.match(/width="([\d.]+)"[^>]*height="([\d.]+)"/); n._w = +m[1]; n._h = +m[2]; n.clipsContent = false; n.fills = []; n.el.innerHTML = svg; n.el.firstChild.style.display = 'block'; n._apply(); return n },
  };
  // ── timeline evaluation
  const cub = (u, a, b) => 3 * a * u * (1 - u) * (1 - u) + 3 * b * u * u * (1 - u) + u * u * u;
  const bez = (x1, y1, x2, y2) => t => { let lo = 0, hi = 1, u = t; for (let i = 0; i < 50; i++) { const x = cub(u, x1, x2); if (Math.abs(x - t) < 1e-6) break; if (x < t) lo = u; else hi = u; u = (lo + hi) / 2 } return cub(u, y1, y2) };
  const EASE = { EASE_IN: bez(0.32, 0, 0.67, 0), EASE_OUT: bez(0.33, 1, 0.68, 1), EASE_IN_AND_OUT: bez(0.65, 0, 0.35, 1), LINEAR: t => t };
  const ease = e => !e ? EASE.LINEAR : e.type === 'CUSTOM_CUBIC_BEZIER' ? bez(e.easingFunctionCubicBezier.x1, e.easingFunctionCubicBezier.y1, e.easingFunctionCubicBezier.x2, e.easingFunctionCubicBezier.y2) : (EASE[e.type] || EASE.LINEAR);
  const lerp = (a, b, p) => typeof a === 'number' ? a + (b - a) * p : { r: a.r + (b.r - a.r) * p, g: a.g + (b.g - a.g) * p, b: a.b + (b.b - a.b) * p, a: (a.a ?? 1) + ((b.a ?? 1) - (a.a ?? 1)) * p };
  function evalK(k, t) { if (t <= k[0].timelinePosition) return k[0].value.value; for (let i = 0; i < k.length - 1; i++) { const a = k[i], b = k[i + 1]; if (t < b.timelinePosition) { if (b.easing && b.easing.type === 'HOLD') return a.value.value; const p = (t - a.timelinePosition) / (b.timelinePosition - a.timelinePosition); return lerp(a.value.value, b.value.value, ease(b.easing)(p)) } } return k[k.length - 1].value.value }
  let animated = [];
  window.__prepare = () => { animated = ALL.filter(n => Object.keys(n._tracks).length || n._fillTrack); for (const n of animated) { n._mw = n.width; n._mh = n.height } return animated.length };
  window.renderAt = t => {
    for (const n of animated) {
      const T = n._tracks, s = n.el.style, v = (f, d) => T[f] ? evalK(T[f].keyframes, t) : d;
      if (T.OPACITY) s.opacity = v('OPACITY', 1);
      const w = T.WIDTH ? v('WIDTH', n._w) : n._mw, h = T.HEIGHT ? v('HEIGHT', n._h) : n._mh;
      if (T.WIDTH) s.width = w + 'px'; if (T.HEIGHT) s.height = h + 'px';
      if (T.TRANSLATION_X || T.TRANSLATION_Y || T.ROTATION || T.SCALE_X || T.SCALE_Y) {
        const tx = v('TRANSLATION_X', 0), ty = v('TRANSLATION_Y', 0), r = v('ROTATION', 0), sx = v('SCALE_X', 1), sy = v('SCALE_Y', 1);
        const a = -n._rot * Math.PI / 180, cx = (w / 2) * Math.cos(a) - (h / 2) * Math.sin(a), cy = (w / 2) * Math.sin(a) + (h / 2) * Math.cos(a);
        s.transform = `translate(${tx}px,${ty}px) translate(${cx}px,${cy}px) rotate(${-r}deg) scale(${sx},${sy}) translate(${-cx}px,${-cy}px)` + (n._rot ? ` rotate(${-n._rot}deg)` : '');
      }
      if (n._fillTrack && n._fillTrack[0]) { const c = evalK(n._fillTrack[0].keyframes, t); s.background = `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${c.a ?? 1})` }
    }
    return t;
  };
  window.__duration = () => DURATION;
  window.__page = page;
})();
