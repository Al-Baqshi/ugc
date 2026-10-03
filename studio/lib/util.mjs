// Small helpers shared by the server and the views.
// `html` is an auto-escaping tagged template: every interpolated value is
// HTML-escaped unless it was produced by `html` itself or wrapped in `raw()`.

export class Raw {
  constructor(s) {
    this.s = String(s);
  }
  toString() {
    return this.s;
  }
}

export const raw = (s) => new Raw(s ?? '');

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };
export function esc(s) {
  return String(s ?? '').replace(/[&<>"'`]/g, (c) => ESC[c]);
}

function renderValue(v) {
  if (v === null || v === undefined || v === false) return '';
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(renderValue).join('');
  if (typeof v === 'object') return esc(fmt(v));
  return esc(String(v));
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += renderValue(values[i]) + strings[i + 1];
  return new Raw(out);
}

/** Turn any frontmatter value into a readable string (never "undefined" or "[object Object]"). */
export function fmt(v, depth = 0) {
  if (v === null || v === undefined) return '';
  if (depth > 20) return '…'; // never recurse forever, even on a circular value
  if (v instanceof Date) return isNaN(v) ? '' : v.toISOString().slice(0, 10);
  if (Array.isArray(v)) return v.map((x) => fmt(x, depth + 1)).filter(Boolean).join(', ');
  if (typeof v === 'object') {
    return Object.entries(v)
      .map(([k, val]) => `${k}: ${fmt(val, depth + 1)}`)
      .join('; ');
  }
  return String(v);
}

/**
 * Typographer's quotes for plain text: 'x' -> ‘x’, "x" -> “x”, it's -> it’s.
 * Output contains no straight quotes, so it is safe in HTML text nodes.
 */
export function smartQuotes(s) {
  return String(s ?? '')
    .replace(/(^|[\s(\[{\u201c\u2014\u2013-])'/g, '$1\u2018')
    .replace(/'/g, '\u2019')
    .replace(/(^|[\s(\[{\u2018\u2014\u2013-])"/g, '$1\u201c')
    .replace(/"/g, '\u201d');
}

export function slugify(s) {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/** FNV-1a 32-bit hash, used for deterministic venture colours. */
export function hash(s) {
  let h = 0x811c9dc5;
  for (const ch of String(s)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export const HUES = 24;
export function hueClass(name) {
  return `hue-${hash(String(name || '').toLowerCase()) % HUES}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Extract a YYYY-MM-DD date from a value or string prefix. */
export function isoDate(v) {
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  const m = /(\d{4})-(\d{2})-(\d{2})/.exec(String(v ?? ''));
  return m ? `${m[1]}-${m[2]}-${m[3]}` : '';
}

export function prettyDate(v) {
  const d = isoDate(v);
  if (!d) return fmt(v);
  const [y, m, day] = d.split('-').map(Number);
  if (!MONTHS[m - 1]) return d;
  return `${day} ${MONTHS[m - 1]} ${y}`;
}

export function prettyDateTimeUTC(date) {
  const d = new Date(date);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${hh}:${mm} UTC`;
}

export function weekdayDate(date) {
  const d = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function numberWord(n) {
  const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
  return words[n] ?? String(n);
}

export function plural(n, one, many = one + 's') {
  return `${n} ${n === 1 ? one : many}`;
}

export function truncate(s, n) {
  s = String(s ?? '');
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const sp = cut.lastIndexOf(' ');
  return (sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,.;:–—-]+$/, '') + '…';
}

export function isHttpUrl(s) {
  try {
    const u = new URL(String(s));
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/** "Six quotes, six formats" style humanizer for folder slugs. */
export function humanize(slug) {
  const s = String(slug || '').replace(/[-_]+/g, ' ').trim();
  return s ? s[0].toUpperCase() + s.slice(1) : '';
}
