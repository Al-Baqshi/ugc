// Minimal strict mock of the Figma Plugin API surface used by scripts 01–03.
// Throws on: unknown property writes, width/height writes, bad paints/effects, unloaded fonts on text mutation,
// invalid layoutSizing values for the structural context, bad enums, tiny resize.
let idc = 100;
const FONT_LIST = (opts = {}) => {
  const fam = {
    'Manrope': ['ExtraBold', 'Bold', 'SemiBold', 'Medium', 'Regular', 'Light'],
    'Space Grotesk': ['Bold', 'Medium', 'Regular', 'Light'],
    'Inter': ['Thin', 'Light', 'Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold', 'Black'],
    'JetBrains Mono': opts.noMedium ? ['Regular', 'Bold'] : ['Regular', 'Medium', 'Bold'],
    'IBM Plex Mono': opts.noMedium ? ['Regular', 'Bold'] : ['Regular', 'Medium', 'Bold'],
    'Permanent Marker': ['Regular'],
    'Caveat': opts.noCaveatBold ? ['Regular'] : ['Regular', 'Medium', 'SemiBold', 'Bold'],
    'Kalam': ['Regular', 'Bold'],
    'Patrick Hand': ['Regular'],
  };
  const out = [];
  for (const [f, ss] of Object.entries(fam)) for (const s of ss) out.push({ fontName: { family: f, style: s } });
  return out;
};
const fk = f => f.family + '|' + f.style;
const charW = f => {
  const fam = f.family;
  if (/Mono/.test(fam)) return 0.6;
  if (fam === 'Space Grotesk') return 0.52;
  if (fam === 'Caveat') return 0.42;
  if (fam === 'Permanent Marker') return 0.6;
  if (fam === 'Manrope') return 0.58;
  return /Bold|Semi/.test(f.style) ? 0.57 : 0.54;
};
function checkPaints(ps, what) {
  if (!Array.isArray(ps)) throw new Error(what + ' must be an array');
  for (const p of ps) {
    if (p.type !== 'SOLID') throw new Error(what + ': only SOLID in mock, got ' + p.type);
    const c = p.color; if (!c) throw new Error(what + ': missing color');
    for (const k of Object.keys(c)) if (!['r', 'g', 'b'].includes(k)) throw new Error(what + ': paint color has extra key ' + k);
    for (const k of ['r', 'g', 'b']) if (typeof c[k] !== 'number' || isNaN(c[k]) || c[k] < 0 || c[k] > 1) throw new Error(what + ': color.' + k + ' out of range: ' + c[k]);
    if (p.opacity !== undefined && (p.opacity < 0 || p.opacity > 1)) throw new Error(what + ': opacity out of range');
  }
}
function checkEffects(es) {
  if (!Array.isArray(es)) throw new Error('effects must be an array');
  for (const e of es) {
    if (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') {
      for (const k of ['color', 'offset', 'radius', 'visible', 'blendMode']) if (e[k] === undefined) throw new Error('shadow missing ' + k);
      for (const k of ['r', 'g', 'b', 'a']) if (typeof e.color[k] !== 'number' || e.color[k] < 0 || e.color[k] > 1) throw new Error('shadow color.' + k + ' bad');
    } else if (e.type === 'LAYER_BLUR' || e.type === 'BACKGROUND_BLUR') {
      if (typeof e.radius !== 'number' || e.visible === undefined) throw new Error('blur needs radius+visible');
    } else throw new Error('unknown effect ' + e.type);
  }
}
const COMMON = ['name', 'x', 'y', 'rotation', 'opacity', 'visible', 'effects', 'locked', 'constraints', 'layoutPositioning', 'layoutSizingHorizontal', 'layoutSizingVertical', 'layoutGrow', 'layoutAlign', 'blendMode'];
const GEOM = ['fills', 'strokes', 'strokeWeight', 'strokeAlign', 'dashPattern', 'strokeCap', 'strokeJoin'];
const CORNER = ['cornerRadius', 'topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];
const FRAMEP = ['clipsContent', 'layoutMode', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing', 'primaryAxisSizingMode', 'counterAxisSizingMode', 'primaryAxisAlignItems', 'counterAxisAlignItems', 'layoutWrap', 'counterAxisSpacing', 'placeholder'];
const TEXTP = ['characters', 'fontName', 'fontSize', 'lineHeight', 'letterSpacing', 'textAlignHorizontal', 'textAlignVertical', 'textAutoResize', 'paragraphSpacing'];
const ALLOWED = {
  FRAME: [...COMMON, ...GEOM, ...CORNER, ...FRAMEP], INSTANCE: [...COMMON, ...GEOM, ...CORNER, ...FRAMEP], COMPONENT: [...COMMON, ...GEOM, ...CORNER, ...FRAMEP, 'description'],
  RECTANGLE: [...COMMON, ...GEOM, ...CORNER], ELLIPSE: [...COMMON, ...GEOM], VECTOR: [...COMMON, ...GEOM, ...CORNER],
  TEXT: [...COMMON, ...GEOM, ...TEXTP], SECTION: ['name', 'x', 'y', 'fills', 'visible', 'locked'], PAGE: ['name'],
};
export function makeFigma(opts = {}) {
  const AV = FONT_LIST(opts);
  const AVS = new Set(AV.map(a => fk(a.fontName)));
  const loaded = new Set();
  const registry = new Map();
  const stats = { alWhiteDefault: [] };
  function mk(type, init = {}) {
    const n = {
      _id: `${idc++}:${Math.floor(Math.random() * 900 + 100)}`, _type: type, _name: init.name || type, _parent: null, _children: [],
      _x: 0, _y: 0, _w: init.w ?? 100, _h: init.h ?? 100, _rot: 0, _p: {},
    };
    n._p.fills = init.fills ?? (type === 'FRAME' || type === 'COMPONENT' ? [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }] : []);
    n._p.strokes = []; n._p.strokeWeight = 1; n._p.effects = []; n._p.opacity = 1; n._p.cornerRadius = 0;
    n._p.layoutMode = 'NONE'; n._p.primaryAxisSizingMode = 'FIXED'; n._p.counterAxisSizingMode = 'FIXED';
    n._p.paddingTop = n._p.paddingRight = n._p.paddingBottom = n._p.paddingLeft = 0; n._p.itemSpacing = 0;
    n._p.layoutSizingHorizontal = 'FIXED'; n._p.layoutSizingVertical = 'FIXED'; n._p.layoutPositioning = 'AUTO';
    if (type === 'TEXT') { n._p.fontName = { family: 'Inter', style: 'Regular' }; n._p.fontSize = 12; n._p.characters = ''; n._p.textAutoResize = 'WIDTH_AND_HEIGHT'; n._p.lineHeight = { unit: 'AUTO' }; n._p.letterSpacing = { unit: 'PERCENT', value: 0 }; n._ranges = []; }
    const px = new Proxy(n, handler);
    n._self = px; registry.set(n._id, px); return px;
  }
  const isAL = n => n && ['FRAME', 'INSTANCE', 'COMPONENT'].includes(n._type) && n._p.layoutMode !== 'NONE';
  const fontOk = (n, f) => { const ff = f || n._p.fontName; if (!loaded.has(fk(ff))) throw new Error(`Cannot write to node with unloaded font "${ff.family} ${ff.style}"`); };
  const textFontsOk = n => { fontOk(n); for (const r of n._ranges) fontOk(n, r.fontName); };
  const subtreeFontsOk = n => { if (n._type === 'TEXT') textFontsOk(n); for (const c of n._children) subtreeFontsOk(c); };
  function lh(n) { const l = n._p.lineHeight; return l.unit === 'PIXELS' ? l.value : n._p.fontSize * (n._p.fontName.family === 'Permanent Marker' ? 1.45 : 1.21); }
  function lineW(n, s) { return s.length * n._p.fontSize * charW(n._p.fontName) + (s.length * (n._p.letterSpacing.value || 0) / 100 * n._p.fontSize); }
  function wrapLines(n, w) { let count = 0; for (const para of n._p.characters.split('\n')) { const words = para.split(' '); let cur = ''; let c = 1; for (const wd of words) { const t = cur ? cur + ' ' + wd : wd; if (lineW(n, t) > w && cur) { c++; cur = wd; } else cur = t; } count += c; } return count; }
  function innerW(p) { return W(p) - p._p.paddingLeft - p._p.paddingRight; }
  function W(n) {
    const par = n._parent;
    if (par && isAL(par) && n._p.layoutSizingHorizontal === 'FILL' && n._p.layoutPositioning !== 'ABSOLUTE') {
      if (par._p.layoutMode === 'VERTICAL') return innerW(par);
      const others = par._children.filter(c => c !== n && c._p.layoutPositioning !== 'ABSOLUTE').reduce((s, c) => s + W(c), 0);
      const gaps = par._p.itemSpacing * (par._children.length - 1);
      return Math.max(0, innerW(par) - others - gaps);
    }
    if (n._type === 'TEXT') { if (n._p.textAutoResize === 'WIDTH_AND_HEIGHT') return Math.max(...n._p.characters.split('\n').map(s => lineW(n, s))); return n._w; }
    if (isAL(n)) {
      const kids = n._children.filter(c => c._p.layoutPositioning !== 'ABSOLUTE');
      const horiz = n._p.layoutMode === 'HORIZONTAL';
      const hug = horiz ? n._p.primaryAxisSizingMode === 'AUTO' : n._p.counterAxisSizingMode === 'AUTO';
      if (hug) {
        if (horiz) return n._p.paddingLeft + n._p.paddingRight + kids.reduce((s, c) => s + W(c), 0) + Math.max(0, kids.length - 1) * n._p.itemSpacing;
        return n._p.paddingLeft + n._p.paddingRight + Math.max(0, ...kids.map(c => c._p.layoutSizingHorizontal === 'FILL' ? 0 : W(c)));
      }
    }
    return n._w;
  }
  function Hh(n) {
    if (n._type === 'TEXT') { if (n._p.textAutoResize === 'NONE') return n._h; const w = W(n); const lines = n._p.textAutoResize === 'WIDTH_AND_HEIGHT' ? n._p.characters.split('\n').length : wrapLines(n, w); return lines * lh(n); }
    if (isAL(n)) {
      const kids = n._children.filter(c => c._p.layoutPositioning !== 'ABSOLUTE');
      const vert = n._p.layoutMode === 'VERTICAL';
      const hug = vert ? n._p.primaryAxisSizingMode === 'AUTO' : n._p.counterAxisSizingMode === 'AUTO';
      if (hug) {
        if (vert) return n._p.paddingTop + n._p.paddingBottom + kids.reduce((s, c) => s + Hh(c), 0) + Math.max(0, kids.length - 1) * n._p.itemSpacing;
        return n._p.paddingTop + n._p.paddingBottom + Math.max(0, ...kids.map(c => Hh(c)));
      }
    }
    return n._h;
  }
  function absXY(n) { let x = n._x, y = n._y, p = n._parent; while (p && p._type !== 'PAGE') { x += p._x; y += p._y; p = p._parent; } return [x, y]; }
  function setSizing(n, axis, v) {
    if (!['FIXED', 'HUG', 'FILL'].includes(v)) throw new Error(`in set_layoutSizing${axis}: Invalid enum value ${v}`);
    const par = n._parent;
    if (v === 'HUG') { if (!(isAL(n) || (n._type === 'TEXT' && isAL(par)))) throw new Error('HUG can only be set on auto-layout frames or text children of auto-layout frames'); }
    if (v === 'FILL') { if (!isAL(par)) throw new Error(`in set_layoutSizing${axis}: FILL can only be set on children of auto-layout frames`); if (n._p.layoutPositioning === 'ABSOLUTE') throw new Error('FILL cannot be set on absolute positioned auto-layout children'); }
    if (n._type === 'TEXT' && v === 'FILL' && axis === 'Horizontal' && n._p.textAutoResize === 'WIDTH_AND_HEIGHT') stats.textFillIgnored = (stats.textFillIgnored || 0) + 1;
    n._p['layoutSizing' + axis] = v;
    if (isAL(n)) { const horiz = n._p.layoutMode === 'HORIZONTAL'; const isPrimary = (axis === 'Horizontal') === horiz; const mode = v === 'HUG' ? 'AUTO' : 'FIXED'; if (v !== 'FILL') n._p[isPrimary ? 'primaryAxisSizingMode' : 'counterAxisSizingMode'] = mode; }
    if (n._type === 'TEXT' && v === 'HUG' && axis === 'Horizontal') n._p.textAutoResize = 'WIDTH_AND_HEIGHT';
  }
  function detach(c) { if (c._parent) { c._parent._children = c._parent._children.filter(k => k !== c); c._parent = null; } }
  function doClone(n) {
    const c = mk(n._type, { name: n._name }); const ci = registry.get(c.id) ? c : c; const raw = c._raw;
    raw._x = n._x; raw._y = n._y; raw._w = n._w; raw._h = n._h; raw._rot = n._rot; raw._p = JSON.parse(JSON.stringify(n._p)); raw._ranges = n._ranges ? JSON.parse(JSON.stringify(n._ranges)) : undefined;
    for (const k of n._children) { const kc = doClone(k); kc._raw._parent = raw; raw._children.push(kc._raw); }
    return c;
  }
  function doRescale(n, s) {
    n._x *= s; n._y *= s; n._w *= s; n._h *= s; n._p.strokeWeight *= s; n._p.cornerRadius *= s;
    for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) n._p[k] *= s;
    if (n._type === 'TEXT') { textFontsOk(n); n._p.fontSize *= s; if (n._p.lineHeight.unit === 'PIXELS') n._p.lineHeight.value *= s; }
    for (const e of n._p.effects) { if (e.radius) e.radius *= s; if (e.offset) { e.offset.x *= s; e.offset.y *= s; } }
    for (const c of n._children) doRescale(c, s);
  }
  function findAll(n, pred, out = []) { for (const c of n._children) { if (pred(c._self)) out.push(c._self); findAll(c, pred, out); } return out; }
  const handler = {
    get(n, k) {
      if (k === '_raw') return n;
      if (k === 'id') return n._id; if (k === 'type') return n._type; if (k === 'name') return n._name;
      if (k === 'parent') return n._parent ? n._parent._self : null;
      if (k === 'children') return n._children.map(c => c._self);
      if (k === 'x') return n._x; if (k === 'y') return n._y; if (k === 'rotation') return n._rot;
      if (k === 'width') return W(n); if (k === 'height') return Hh(n);
      if (k === 'absoluteTransform') { const [x, y] = absXY(n); return [[1, 0, x], [0, 1, y]]; }
      if (k === 'absoluteBoundingBox') { const [x, y] = absXY(n); const w = W(n), h = Hh(n), t = n._rot * Math.PI / 180; const pts = [[0, 0], [w, 0], [0, h], [w, h]].map(([px, py]) => [px * Math.cos(t) + py * Math.sin(t), -px * Math.sin(t) + py * Math.cos(t)]); const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); return { x: x + Math.min(...xs), y: y + Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) }; }
      if (k === 'resize') return (w, h) => { if (!(w >= 0.01 && h >= 0.01)) throw new Error('resize: width and height must be >= 0.01, got ' + w + ',' + h); if (n._type === 'SECTION') throw new Error('use resizeWithoutConstraints on sections (mock strictness)'); if (n._type === 'TEXT') { textFontsOk(n); if (n._p.textAutoResize === 'WIDTH_AND_HEIGHT') n._p.textAutoResize = 'HEIGHT'; } n._w = w; n._h = h; if (isAL(n)) { n._p.primaryAxisSizingMode = 'FIXED'; n._p.counterAxisSizingMode = 'FIXED'; n._p.layoutSizingHorizontal = 'FIXED'; n._p.layoutSizingVertical = 'FIXED'; } };
      if (k === 'resizeWithoutConstraints') return (w, h) => { if (!(w >= 0.01 && h >= 0.01)) throw new Error('resize too small'); n._w = w; n._h = h; };
      if (k === 'rescale') return s => { if (!(s >= 0.01)) throw new Error('rescale must be >= 0.01'); const x = n._x, y = n._y; doRescale(n, s); n._x = x; n._y = y; };
      if (k === 'appendChild' || k === 'insertChild') return (...a) => { const c = (k === 'appendChild' ? a[0] : a[1])._raw; if (!['FRAME', 'SECTION', 'PAGE', 'INSTANCE', 'COMPONENT'].includes(n._type)) throw new Error(`no such property '${k}' on ${n._type} node`); subtreeFontsOk(c); detach(c); c._parent = n; if (k === 'appendChild') n._children.push(c); else n._children.splice(a[0], 0, c); };
      if (k === 'remove') return () => { detach(n); registry.delete(n._id); };
      if (k === 'clone') return () => { const c = doClone(n); const pg = figma.currentPage._raw; c._raw._parent = pg; pg._children.push(c._raw); return c; };
      if (k === 'findChild') return pred => (n._children.find(c => pred(c._self)) || {})._self || null;
      if (k === 'findChildren') return pred => n._children.filter(c => pred(c._self)).map(c => c._self);
      if (k === 'findOne') return pred => findAll(n, pred)[0] || null;
      if (k === 'findAll') return pred => findAll(n, pred || (() => true));
      if (k === 'findAllWithCriteria') return crit => findAll(n, c => !crit.types || crit.types.includes(c.type));
      if (k === 'createInstance') return () => { if (n._type !== 'COMPONENT') throw new Error('createInstance only on COMPONENT'); const c = doClone(n); c._raw._type = 'INSTANCE'; const pg = figma.currentPage._raw; c._raw._parent = pg; pg._children.push(c._raw); return c; };
      if (n._type === 'TEXT') {
        if (k === 'setRangeFontName') return (s, e, f) => { fontOk(n, f); n._ranges.push({ s, e, fontName: f }); };
        if (k === 'setRangeFills') return (s, e, p) => { textFontsOk(n); checkPaints(p, 'setRangeFills'); };
        if (k === 'getStyledTextSegments') return () => [{ start: 0, end: n._p.characters.length, fontName: n._p.fontName }, ...n._ranges.map(r => ({ start: r.s, end: r.e, fontName: r.fontName }))];
      }
      if (k === 'then') return undefined;
      if (typeof k === 'symbol') return undefined;
      if (k in n._p) return n._p[k];
      if ((ALLOWED[n._type] || []).includes(k)) return undefined;
      throw new Error(`no such property '${String(k)}' on ${n._type} node`);
    },
    set(n, k, v) {
      if (k === 'width' || k === 'height') throw new TypeError('no setter for property ' + k);
      if (!(ALLOWED[n._type] || []).includes(k)) throw new Error(`Cannot add property ${k}, object is not extensible (${n._type})`);
      if (k === 'name') { n._name = String(v); return true; }
      if (k === 'x') { if (typeof v !== 'number' || isNaN(v)) throw new Error('x must be a number, got ' + v); n._x = v; return true; }
      if (k === 'y') { if (typeof v !== 'number' || isNaN(v)) throw new Error('y must be a number, got ' + v); n._y = v; return true; }
      if (k === 'rotation') { n._rot = v; return true; }
      if (k === 'fills' || k === 'strokes') { checkPaints(v, k); if (n._type === 'TEXT') textFontsOk(n); n._p[k] = JSON.parse(JSON.stringify(v)); if (k === 'fills') n._fillsSet = true; return true; }
      if (k === 'effects') { checkEffects(v); n._p.effects = JSON.parse(JSON.stringify(v)); return true; }
      if (k === 'dashPattern') { if (!Array.isArray(v) || v.some(x => typeof x !== 'number')) throw new Error('dashPattern must be number[]'); n._p[k] = v; return true; }
      if (k === 'layoutSizingHorizontal') { setSizing(n, 'Horizontal', v); return true; }
      if (k === 'layoutSizingVertical') { setSizing(n, 'Vertical', v); return true; }
      if (k === 'counterAxisAlignItems' && !['MIN', 'MAX', 'CENTER', 'BASELINE'].includes(v)) throw new Error('Invalid enum value for counterAxisAlignItems: ' + v);
      if (k === 'primaryAxisAlignItems' && !['MIN', 'MAX', 'CENTER', 'SPACE_BETWEEN'].includes(v)) throw new Error('Invalid enum value for primaryAxisAlignItems: ' + v);
      if ((k === 'primaryAxisSizingMode' || k === 'counterAxisSizingMode') && !['FIXED', 'AUTO'].includes(v)) throw new Error(`Expected 'FIXED' | 'AUTO', received '${v}'`);
      if (k === 'layoutMode' && !['NONE', 'HORIZONTAL', 'VERTICAL', 'GRID'].includes(v)) throw new Error('bad layoutMode');
      if (k === 'strokeAlign' && !['INSIDE', 'OUTSIDE', 'CENTER'].includes(v)) throw new Error('bad strokeAlign');
      if (k === 'opacity' && (v < 0 || v > 1)) throw new Error('opacity out of range');
      if (n._type === 'TEXT') {
        if (k === 'fontName') { fontOk(n, v); n._p.fontName = { ...v }; return true; }
        if (TEXTP.includes(k)) textFontsOk(n);
        if ((k === 'lineHeight' || k === 'letterSpacing') && (typeof v !== 'object' || !v.unit)) throw new Error(k + ' must be {unit,value}');
        if (k === 'textAutoResize' && !['NONE', 'WIDTH_AND_HEIGHT', 'HEIGHT', 'TRUNCATE'].includes(v)) throw new Error('bad textAutoResize');
        if (k === 'textAlignHorizontal' && !['LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'].includes(v)) throw new Error('bad textAlignHorizontal');
        if (k === 'characters' && typeof v !== 'string') throw new Error('characters must be string');
        if (k === 'textAutoResize' && v === 'HEIGHT') n._w = W(n);
      }
      n._p[k] = v; return true;
    },
    has(n, k) { return k in n._p || ['children', 'id', 'type', 'name', 'parent', 'x', 'y', 'width', 'height', 'characters'].includes(k) && (k !== 'children' || ['FRAME', 'SECTION', 'PAGE', 'INSTANCE', 'COMPONENT'].includes(n._type)) && (k !== 'characters' || n._type === 'TEXT'); },
  };
  const page = mk('PAGE', { name: '02 · qsme.build — Six quotes, six formats' }); page._raw._id = '2:5'; registry.set('2:5', page);
  const page0 = mk('PAGE', { name: 'Page 0' }); page0._raw._id = '0:1'; registry.set('0:1', page0);
  const comp = mk('COMPONENT', { name: 'QSME logo', w: 1509, h: 688, fills: [] }); comp._raw._id = '2:27'; registry.set('2:27', comp);
  const vec = mk('VECTOR', { name: 'wordmark', w: 1285, h: 416 }); vec._raw._x = 192; vec._raw._y = 133; vec._raw._parent = comp._raw; comp._raw._children.push(vec._raw); comp._raw._parent = page0._raw; page0._raw._children.push(comp._raw);
  const figma = {
    currentPage: page0,
    async getNodeByIdAsync(id) { return registry.get(id) || null; },
    async setCurrentPageAsync(p) { if (!p || p.type !== 'PAGE') throw new Error('setCurrentPageAsync needs a page'); figma.currentPage = p; },
    async listAvailableFontsAsync() { return AV; },
    async loadFontAsync(f) { if (!f || !AVS.has(fk(f))) throw new Error(`The font "${f && f.family} ${f && f.style}" could not be loaded`); loaded.add(fk(f)); },
    createFrame() { const n = mk('FRAME'); const pg = figma.currentPage._raw; n._raw._parent = pg; pg._children.push(n._raw); return n; },
    createAutoLayout(dir = 'HORIZONTAL', props) { if (typeof dir === 'object') { props = dir; dir = 'HORIZONTAL'; } const n = figma.createFrame(); n._raw._p.layoutMode = dir; n._raw._p.primaryAxisSizingMode = 'AUTO'; n._raw._p.counterAxisSizingMode = 'AUTO'; n._raw._p.layoutSizingHorizontal = 'HUG'; n._raw._p.layoutSizingVertical = 'HUG'; n._raw._isAL = true; if (props) Object.assign(n, props); return n; },
    createRectangle() { const n = mk('RECTANGLE'); const pg = figma.currentPage._raw; n._raw._parent = pg; pg._children.push(n._raw); return n; },
    createEllipse() { const n = mk('ELLIPSE'); const pg = figma.currentPage._raw; n._raw._parent = pg; pg._children.push(n._raw); return n; },
    createText() { const n = mk('TEXT'); const pg = figma.currentPage._raw; n._raw._parent = pg; pg._children.push(n._raw); return n; },
    createSection() { const n = mk('SECTION', { fills: [] }); const pg = figma.currentPage._raw; n._raw._parent = pg; pg._children.push(n._raw); return n; },
    createNodeFromSvg(svg) {
      const m = svg.match(/<svg[^>]*\swidth="([\d.]+)"[^>]*\sheight="([\d.]+)"/); if (!m) throw new Error('svg needs width/height: ' + svg.slice(0, 80));
      if (!/viewBox="/.test(svg)) throw new Error('svg needs viewBox');
      const opens = (svg.match(/<(?!\/)[a-zA-Z]+[^>]*[^/]>/g) || []).filter(t => !t.startsWith('<?')).length, closes = (svg.match(/<\/[a-zA-Z]+>/g) || []).length;
      if (opens !== closes) throw new Error('svg tags unbalanced (' + opens + ' open vs ' + closes + ' close): ' + svg.slice(0, 120));
      if (/NaN|undefined/.test(svg)) throw new Error('svg contains NaN/undefined');
      const n = mk('FRAME', { w: +m[1], h: +m[2] }); const pg = figma.currentPage._raw; n._raw._parent = pg; pg._children.push(n._raw); return n;
    },
  };
  return { figma, page, stats, registry };
}
