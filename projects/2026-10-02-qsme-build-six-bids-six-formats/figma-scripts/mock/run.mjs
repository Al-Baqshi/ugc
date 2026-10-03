import { readFileSync } from 'node:fs';
import { makeFigma } from './figma-mock.mjs';
const dir = new URL('..', import.meta.url).pathname;
const opts = { noMedium: process.argv.includes('--no-medium'), noCaveatBold: process.argv.includes('--no-caveat-bold') };
const { figma, page, registry } = makeFigma(opts);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const scripts = ['01-section1-static-and-props.js', '02-section1b-extra-props.js', '03-section2-carousel.js'];
const only = process.argv.find(a => /^0\d/.test(a));
for (const s of scripts) {
  if (only && !s.startsWith(only.slice(0, 2)) && s > only) break;
  const code = readFileSync(dir + s, 'utf8');
  if (code.length > 50000) console.log('!! ' + s + ' is ' + code.length + ' chars (> 50000 limit)');
  try {
    const res = await new AsyncFunction('figma', code)(figma);
    const { createdIds, ...rest } = res || {};
    console.log('== ' + s + ' OK (' + code.length + ' chars). created=' + (createdIds || []).length);
    console.log(JSON.stringify(rest, (k, v) => (typeof v === 'number' ? Math.round(v * 10) / 10 : v)).slice(0, 2500));
  } catch (e) { console.log('== ' + s + ' FAILED: ' + e.message); console.log(e.stack.split('\n').slice(0, 4).join('\n')); process.exit(1); }
}
// Post-checks
const raw = n => n._raw;
const walk = (n, f) => { f(n); for (const c of n.children || []) walk(c, f); };
const abs = n => n.absoluteBoundingBox;
const overlap = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
let whiteAL = [];
walk(page, n => { const r = raw(n); if (r._isAL && !r._fillsSet) whiteAL.push(n.name); });
console.log('\nAuto-layout frames left with default white fill:', whiteAL.length ? whiteAL : 'none');
const st = page.findOne(n => n.name === 'Static post — 1080×1350 (4:5)');
if (st) {
  const slot = st.findOne(n => n.name.startsWith('REPLACE: real overhead'));
  const tabs = slot.children.filter(n => n.name.startsWith('Label tab'));
  const note = slot.children.find(n => n.name.startsWith('Sticky note'));
  const items = slot.children.filter(n => n.name.startsWith('Stand-in'));
  console.log('Slot', Math.round(slot.y), Math.round(slot.height), '| band', Math.round(st.children[0].height));
  for (const t of tabs) console.log('  tab', t.name.replace('Label tab — ', ''), [t.x, t.y, t.width, t.height].map(Math.round).join(','), 'inSlot', t.x >= 0 && t.x + t.width <= 1080 && t.y + t.height <= slot.height);
  for (const it of items) console.log('  item', it.name.slice(0, 40), [it.x, it.y, it.width, it.height].map(Math.round).join(','));
  console.log('  note', [note.x, note.y, note.width, note.height].map(Math.round).join(','));
  const nb = abs(note);
  for (const t of tabs) if (overlap(abs(t), nb)) console.log('  !! note overlaps', t.name);
  for (let i = 0; i < tabs.length; i++) for (let j = i + 1; j < tabs.length; j++) if (overlap(abs(tabs[i]), abs(tabs[j]))) console.log('  !! tabs overlap', tabs[i].name, tabs[j].name);
  const foot = st.findOne(n => n.name === 'Footer');
  console.log('  footer', foot.width, foot.height, 'children', foot.children.map(c => c.name + ':' + Math.round(c.width)).join(' | '));
}
// Carousel: header vs counter, text bottoms
const car = page.findOne(n => n.name === 'Carousel — 8 × 1080×1350');
if (car) for (const f of car.children.filter(n => n.type === 'FRAME')) {
  const hdr = f.children.find(n => n.name === 'Header');
  const ctr = f.children.find(n => n.name.startsWith('Counter'));
  const kids = f.children.map(c => `${c.name.slice(0, 28)}[${[c.x, c.y, c.width, c.height].map(Math.round).join(',')}]`);
  const bottomMax = Math.max(...f.children.map(c => c.y + c.height));
  console.log(f.name, 'hdrH', Math.round(hdr.height), ctr ? 'ctr ' + Math.round(ctr.x) + ' vs hdr right ' + Math.round(hdr.x + hdr.width) : '', 'maxBottom', Math.round(bottomMax));
  if (process.argv.includes('-v')) console.log('   ', kids.join('\n    '));
}
const secs = page.children.filter(n => n.type === 'SECTION').map(s => `${s.name}: ${[s.x, s.y, s.width, s.height].map(Math.round)}`);
console.log('\nSections:\n ' + secs.join('\n '));
// anything at x>=4000,y<3000 on the page?
console.log('Page nodes intruding x>=4000 near y=0:', page.children.filter(n => n.x + n.width > 4000 && n.y < 3000).map(n => n.name));
console.log('Page-level strays:', page.children.filter(n => n.type !== 'SECTION').map(n => n.type + ' ' + n.name));
