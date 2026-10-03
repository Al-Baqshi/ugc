/* "Which one's cheapest?" — QSME NZ (week 3, Tue 20 Oct 2026, 19:30 NZT). One timeline, two cuts.
   apples-oranges-pineapple.html      → body.nz.r9x16 (Reels/TikTok/Shorts, safe box 65,300,1015,1250)
   apples-oranges-pineapple-4x5.html  → body.nz.r4x5  (Facebook feed, safe box 60,60,1020,1290)
   Timings are identical in both, so vo-script.json fits both MP4s.

   The product screens are an ILLUSTRATIVE recreation of signed-in screens (Compare bids, Add a bid you received,
   Detailed price breakdown) built from the exact on-screen wording in research/2026-10-02-qsme-platform-truth.md
   (features add-received-bid and compare-bids) and the app's GST arithmetic (15%, GST inside an incl. figure = 3/23).
   Fictional bidders, labelled "Demo bids" + "Illustrative — swap for real QSME screen (demo data)".
   The end card uses a REAL still of the public sign-up page (clips/signup.png, captured with still.mjs, no login).

   Review pass 2026-10-04 (v3, 31.6 s): no "they don't need a QSME account" line (owner CTA rule); the shell-game tags
   no longer give the answer away; the add-a-bid detour is 3.6 s with readable text; Duration/Status are left out of the
   table so no column is sliced; the flip is a punch-in on Bidder + Excl. GST with the toggle in frame and the "Lowest"
   tag HOPPING (rows stay put: only the tag move is confirmed live); Him's punchline is a 2 s cut back to the phone on
   the bench ("= $8,510"); the breakdown frames Item + Line total and ends on the Total; the end card builds in 1.2 s. */
(function () {
'use strict';
const R9 = document.body.classList.contains('r9x16');
const H = R9 ? 1920 : 1350, SY = R9 ? 300 : 200;
const DUR = 31.6;

/* ---------- GST maths + money format (15%, as the app does it) ---------- */
const cents = v => Math.round(v * 100) / 100;
function gstView(a, basis, rate) {
  const r = (rate == null ? 15 : rate) / 100;
  if (basis === 'exclusive') { const ex = cents(a), inc = cents(a * (1 + r)); return { ex, gst: cents(inc - ex), inc }; }
  if (basis === 'inclusive') { const inc = cents(a), ex = cents(a / (1 + r)); return { ex, gst: cents(inc - ex), inc }; }
  return { ex: cents(a), gst: 0, inc: cents(a) };                       // not GST registered
}
function money(v) {
  const whole = Math.round(v * 100) % 100 === 0;
  return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }).format(v);
}

/* ---------- demo data (fictional businesses; checked against the NZ Companies Register on 2026-10-03: no matches) ---------- */
const BIDS = {
  st: { name: 'Steamline Bathrooms Ltd', basis: 'inclusive', amount: 8298, days: 5 },
  pu: { name: 'Puddlestone Plumbing', basis: 'exclusive', amount: 7400, days: 7 },
  tr: { name: 'Trev (tiler)', basis: 'no_gst', amount: 7900, days: 6 },
};
const ST_LINES = [   // Steamline's PDF: line prices include GST and add up to the total
  ['Strip-out &amp; disposal', 'Labour', 1, 690], ['Waterproofing', 'Labour', 1, 1380], ['Wall &amp; floor tiling', 'Labour', 17, 115],
  ['Tiles, adhesive &amp; grout', 'Materials', 1, 1438], ['Fit-off: vanity, WC &amp; shower', 'Labour', 1, 2835]];
const V = {}; for (const k in BIDS) V[k] = gstView(BIDS[k].amount, BIDS[k].basis);
const orderOn = side => Object.keys(BIDS).sort((a, b) => V[a][side] - V[b][side]);
const ORDER_EX = orderOn('ex'), ORDER_IN = orderOn('inc');
if (ORDER_EX.join() !== 'st,pu,tr' || ORDER_IN.join() !== 'tr,st,pu') throw new Error('demo figures no longer tell the story: ' + ORDER_EX + ' / ' + ORDER_IN);
if (ST_LINES.reduce((s, l) => s + l[2] * l[3], 0) !== BIDS.st.amount) throw new Error('Steamline lines do not add up');
if (V.pu.inc !== 8510 || V.st.ex !== 7215.65) throw new Error('GST maths changed');
const ROWS = ORDER_EX;            // the table keeps one row order through the flip (only the "Lowest" tag is confirmed to move)
const RH = 70;                    // row height (px, app)

/* ---------- icons (lucide shapes) ---------- */
const ic = (d, cls, extra) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}>${d}</svg>`;
const MAIL = ic('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', '', 'style="width:12px;height:12px"');
const CHECKC = ic('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', '', 'style="color:var(--primary)"');
const BACK = ic('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>');
const UPLOAD = ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>', '', 'style="width:24px;height:24px;color:var(--primary)"');
const ALERT = ic('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>', '', 'style="color:var(--primary);margin-top:2px"');
const FILE = ic('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>', '', 'style="color:var(--muted-foreground)"');
const EXT = ic('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', '', 'style="width:14px;height:14px"');
const CHECK = ic('<path d="M20 6 9 17l-5-5"/>');
const CHECKW = ic('<path d="M20 6 9 17l-5-5"/>', '', 'style="width:13px;height:13px;color:#fff" stroke-width="3"');
const XX = ic('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const CHEV = ic('<path d="m6 9 6 6 6-6"/>', '', 'style="color:var(--muted-foreground)"');
const PANEL = ic('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>', '', 'style="width:18px;height:18px;color:var(--muted-foreground)"');
const PLUS = ic('<path d="M5 12h14"/><path d="M12 5v14"/>', '', 'style="width:14px;height:14px"');
const SPIN = `<svg class="spin" id="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color:var(--primary)"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
const PTR = `<svg viewBox="0 0 24 34"><path d="M2 2 L2 27 L8.3 21.2 L12.8 31 L17 29.2 L12.6 19.6 L21 19.6 Z" fill="#111" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;

/* ---------- the three quote props (fictional, built in HTML; no real platform's look) ---------- */
function pdfHTML() {
  return `<div class="hd"><div class="brand">Steamline Bathrooms Ltd<small>Bathroom renovations · Waikato</small></div><div class="q">QUOTE<small>No. 1182 · 9 Oct 2026</small></div></div>
    <div class="for">Main bathroom: retile &amp; fit-off<small>Prepared for: Mel</small></div>
    <ul>${ST_LINES.map(l => `<li style="display:flex;justify-content:space-between"><span>${l[0]}${l[2] > 1 ? ` (${l[2]} m²)` : ''}</span><span>${money(l[2] * l[3])}.00</span></li>`).join('')}</ul>
    <div class="tot"><span>Total incl. GST</span><b>$8,298.00</b></div>
    <div class="ft">All prices include GST. Price valid 30 days.</div>`;
}
function phoneHTML(bubbleId) {
  return `<div class="scr"><div class="bar"><div class="avatar">M</div><b>Mitch (Puddlestone)</b></div>
    <div class="msgs"><div class="when">Sun 7:41 pm</div><div class="out">Hey Mitch, how'd you get on with the bathroom price?</div>
    <div class="in" ${bubbleId ? `id="${bubbleId}"` : ''}>7400 + gst mate</div><div class="in2">can start in 3 wks</div></div></div>`;
}
function noteHTML() {
  return `<div class="l1">Bathroom: retile + fit off</div><div class="l2">$7,900 all up</div><div class="l3">(not GST reg.) &nbsp;— Trev</div>`;
}
/* a hand-drawn marker loop around a w x h box (overshoots its start, like a real pen) */
function loopPath(w, h, pad, seed) {
  const cx = w / 2 + pad, cy = h / 2 + pad, rx = w / 2 + pad * 0.7, ry = h / 2 + pad * 0.75, pts = [];
  for (let i = 0; i <= 64; i++) {
    const a = -1.95 + (i / 64) * (Math.PI * 2 + 0.75);
    const j = 1 + 0.035 * Math.sin(3 * a + seed) + 0.025 * Math.sin(5 * a + seed * 2), k = 1 + i / 64 * 0.06;
    pts.push([cx + Math.cos(a) * rx * j * k, cy + Math.sin(a) * ry * j * (2 - k)]);
  }
  return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
}
function ringSVG(id, w, h, pad, color, sw, seed, style) {
  return `<svg class="ring" id="${id}" width="${w + pad * 2}" height="${h + pad * 2}" viewBox="0 0 ${w + pad * 2} ${h + pad * 2}" ${style ? `style="${style}"` : ''}><path id="${id}-p" d="${loopPath(w, h, pad, seed)}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/* ---------- the app (illustrative): tender page → Compare bids, Add a bid you received, a bid's own lines ---------- */
function fig(val, quoted, side) {
  return `<span class="fig ${quoted ? 'q' : 'c'} f-${side}"><span class="v">${money(val)}</span>${quoted ? '' : '<span class="calc">calc.</span>'}</span>`;
}
function rowHTML(k, i) {
  const b = BIDS[k], v = V[k];
  const qEx = b.basis === 'exclusive' || b.basis === 'no_gst', qIn = b.basis === 'inclusive' || b.basis === 'no_gst';
  return `<div class="row tr" id="row-${k}" style="top:${i * RH}px">
    <div><div class="nm"><span class="selic" id="sel-${k}">${CHECKC}</span><span class="nmt" id="nm-${k}">${b.name}</span></div>
      <div class="tags" id="tags-${k}"><span class="badge outline">${MAIL}Received by you</span><span class="badge low" id="low-${k}">Lowest</span></div></div>
    <div class="r" id="ex-${k}">${fig(v.ex, qEx, 'ex')}</div>
    <div class="r gst">${v.gst ? money(v.gst) : '<span class="nog">No GST</span>'}</div>
    <div class="r" id="in-${k}">${fig(v.inc, qIn, 'in')}</div>
    ${k === 'st' ? '<div id="flash" style="position:absolute;inset:0;padding:0;background:color-mix(in oklab, var(--primary) 16%, transparent)"></div>' : ''}
  </div>`;
}
/* the breakdown's columns (px): Item, Type, Qty, Rate, Line total. Type/Qty/Rate fold away for the close-up (edit crop). */
const BDC = [236, 84, 46, 80, 104];
function detailHTML(k) {
  const b = BIDS[k], v = V[k], incl = b.basis === 'inclusive';
  const basisText = incl ? 'including GST' : b.basis === 'no_gst' ? 'No GST' : 'plus GST';
  return `<div class="card det" id="det-${k}">
    <div class="det-hd"><div><h3>${b.name}</h3><p class="muted" style="font-size:13px">${money(b.amount)} ${basisText} · ${b.days} days</p><div style="margin-top:6px"><span class="badge outline" style="font-size:12px">${MAIL}Received by you</span></div></div>
      <dl class="gbox"><dt>Excl. GST</dt><dd class="${incl ? 'sm' : 'big'}">${money(v.ex)}</dd><dt>Incl. GST</dt><dd class="${incl ? 'big' : 'sm'}">${money(v.inc)}</dd></dl></div>
    <div class="det-body">
      <div class="bd" id="bd-${k}"><div class="lbl">Detailed price breakdown</div><div class="tt green">Total: ${money(b.amount)}</div>
        <div class="bdt" id="bdt-${k}"><div class="h"><div>Item</div><div class="mid">Type</div><div class="rt mid">Qty</div><div class="rt mid">Rate</div><div class="rt">Line total</div></div>
        ${ST_LINES.map(l => `<div class="l"><div class="it">${l[0]}</div><div class="mid">${l[1]}</div><div class="rt tnum mid">${l[2]}</div><div class="rt tnum mid">${money(l[3])}</div><div class="rt tnum lt">${money(l[2] * l[3])}</div></div>`).join('')}
        <div class="l tot" id="bdtot-${k}"><div class="it">Total</div><div class="mid"></div><div class="mid"></div><div class="mid"></div><div class="rt green" style="font-weight:700">${money(b.amount)}</div></div></div></div>
    </div></div>`;
}
const fld = (label, val, extra) => `<div class="fld"><label>${label}</label><div class="inp ${val ? '' : 'empty'}" ${extra || ''}>${val || ''}</div></div>`;
function lineForm(l) {
  return `<div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-top:8px">
    <div class="inp">${l[0]}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
      <div class="inp">${l[1]}${CHEV}</div><div class="inp">${l[2]}</div>
      <div class="inp ${l[2] > 1 ? '' : 'empty'}">${l[2] > 1 ? 'm²' : 'Unit'}</div><div class="inp">${l[3]}</div>
      <div class="inp" style="grid-column:span 2;font-weight:600">${l[2] * l[3]}</div></div></div>`;
}
function dialogHTML() {
  const v = V.st;
  return `<div class="scrim" id="scrim"></div>
  <div class="dlg" id="dlg">
    <div class="dlg-hd"><h2>Add a bid you received</h2><p><span id="dsc1">Main bathroom</span><span id="dsc2" style="position:absolute;left:20px">Check every figure against the original, then confirm.</span></p><span class="x">${XX}</span></div>
    <div class="step" id="st-drop"><div class="drop-wrap" id="dropwrap">
      <p>Got a quote by email for “Main bathroom”? Drop it here and it goes in with the other bids.</p>
      <div class="zone" id="zone"><span class="ci">${UPLOAD}</span><b>Drop the email or quote here</b><span>PDF, saved email (.eml), photo or text file — up to 20 MB</span></div>
      <ol class="how"><li>1. It's filed in this project's documents and read for you.</li><li>2. You check what was read against the original, side by side.</li><li>3. You confirm, and it sits with the other bids.</li></ol></div></div>
    <div class="step" id="st-work"><div class="working">${SPIN}<b>Reading the quote…</b><span>Nothing is saved until you have checked it.</span></div></div>
    <div class="step" id="st-rev"><div class="rv">
      <div class="orig"><div class="ob"><span style="display:flex;align-items:center;gap:8px">${FILE}The original · Steamline-quote.pdf</span><span class="btn outline">${EXT}Open</span></div>
        <div class="pv"><div class="pdf" style="position:absolute;left:50%;top:14px;transform:translateX(-50%) scale(0.98);transform-origin:50% 0;box-shadow:0 4px 18px rgba(0,0,0,.18)">${pdfHTML()}</div></div></div>
      <div class="form" id="form"><div class="fin" id="fin">
        <div class="notice" id="notice">${ALERT}<span>This was read automatically and can be wrong. Nothing is saved until you have checked it.</span></div>
        <section><h4>The bid · who it is from</h4>${fld('Name *', 'Steamline Bathrooms')}${fld('Business', 'Steamline Bathrooms Ltd')}${fld('Email', '')}</section>
        <section id="price"><h4>What they quoted</h4>${fld('Total price (NZD) *', '8298')}${fld('That price is *', '<span id="basis-t">Including GST</span>' + CHEV)}
          <dl class="ro"><div><dt>Excl. GST</dt><dd class="c">${money(v.ex)}</dd><dd class="n">calc.</dd></div><div><dt>GST (15%)</dt><dd class="c">${money(v.gst)}</dd><dd class="n">&nbsp;</dd></div><div><dt>Incl. GST</dt><dd class="q">${money(v.inc)}</dd><dd class="n">&nbsp;</dd></div></dl>
          ${fld('How long (days)', '5')}</section>
        <section><div style="display:flex;justify-content:space-between;align-items:center"><h4>Price breakdown</h4><span class="btn outline" style="height:32px;font-size:13px;border-width:1px">${PLUS}Add a line</span></div>
          ${ST_LINES.map(lineForm).join('')}
          <div style="border:2px solid var(--border);border-radius:12px;padding:10px 12px;margin-top:8px;font-size:13.5px">
            <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-weight:600">Line prices are</b><span class="inp" style="height:32px;min-width:150px">Including GST${CHEV}</span></div>
            <div style="display:flex;justify-content:space-between;margin-top:8px"><b style="font-weight:600">Lines add up to</b><b class="tnum">${money(8298)}</b></div></div></section>
        <div class="confirm" id="confirm">
          <div class="chk"><span class="box16" id="chk1"><span class="on" id="chk1on">${CHECKW}</span></span><span style="font-weight:600">I have checked this against the original and it is right.</span></div></div>
        <div class="acts" id="acts"><span class="btn outline">Cancel</span><span class="btn solid" id="save">${CHECK}Add to the bids</span></div>
        <p class="kept">The original stays in this project's documents, in a folder for this bidder.</p>
      </div></div></div></div>
  </div>`;
}
function appHTML() {
  return `<div class="app" id="app">
    <div class="topbar">${PANEL}<div class="avatar">M</div></div>
    <div class="page">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div class="back">${BACK}Back</div><h1>Main bathroom</h1><p class="muted">Tender · Hamilton bathroom reno · demo project</p></div>
        <div style="padding-top:48px"><span class="badge info">open</span></div></div>
      <div class="card" id="cmpcard" style="margin-top:16px">
        <div class="cmp-hd"><div><h3>Compare bids</h3></div><span class="btn outline">${MAIL.replace('width:12px;height:12px', 'width:16px;height:16px')}Add a bid you received</span></div>
        <div class="cmp-body">
          <div class="on" id="onrow"><span class="muted" style="font-weight:500">Compare on</span><div class="rg" id="rg"><div id="rg-ex">Excl. GST</div><div id="rg-in">Incl. GST</div></div></div>
          <div class="tbl" id="tbl">
            <div class="tr th"><div>Bidder</div><div class="r" id="h-ex">Excl. GST</div><div class="r">GST</div><div class="r" id="h-in">Incl. GST</div></div>
            <div class="rows" id="rows" style="height:${RH * 3}px">${ROWS.map(rowHTML).join('')}
              <div style="position:absolute;left:0;right:0;top:${RH - 1}px;height:2px;background:var(--border);z-index:3"></div>
              <div style="position:absolute;left:0;right:0;top:${RH * 2 - 1}px;height:2px;background:var(--border);z-index:3"></div></div>
          </div>
          <p class="foot" id="foot">Figures marked “calc.” are worked out at 15% GST so bids can be compared. The bidder's own figure is the one in bold.</p>
        </div></div>
      <div style="position:relative;height:900px" id="detwrap">
        <div style="position:absolute;left:0;right:0;top:0" id="dw-st">${detailHTML('st')}</div>
      </div>
    </div>
    <div class="maskr" id="maskr"></div>
    <span class="badge low fly ghost" id="lowg3">Lowest</span><span class="badge low fly ghost" id="lowg2">Lowest</span><span class="badge low fly ghost" id="lowg1">Lowest</span>
    <span class="badge low fly" id="lowfly">Lowest</span>
    ${dialogHTML()}
    <div class="sped" id="sped">Sped up</div>
    <div class="file" id="file">${FILE}Steamline-quote.pdf</div>
    <div class="zone-hot" id="zonehot" style="z-index:12"></div>
    ${ringSVG('rg-bold', 10, 10, 14, '#15803D', 3.4, 1)}
    ${ringSVG('rg-calc', 10, 10, 14, '#D97706', 3.4, 2)}
    ${ringSVG('rg-lows', 10, 10, 12, '#15803D', 3.2, 3)}
    ${ringSVG('rg-lowt', 10, 10, 12, '#15803D', 3.2, 4)}
    ${ringSVG('rg-pu', 10, 10, 14, '#E0302A', 3.4, 5)}
    ${ringSVG('rg-tot', 10, 10, 14, '#15803D', 3, 6)}
    <div class="ptr" id="ptr">${PTR}</div>
    <div id="click" style="position:absolute;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;border:3px solid rgba(21,128,61,.85);z-index:21"></div>
  </div>`;
}

/* ---------- end card: a real still of the public sign-up page (qsme.co.nz/sign-up, 430 css px @3x) ---------- */
const SU = { x: 40, y: 165, w: 1210, h: 940, img: 1290 };          // crop of clips/signup.png (px): the whole "I hire" card
const PW = 600, PK = PW / SU.w, PH = Math.round(SU.h * PK);           // panel size on the stage
const HIRE = [267, 616, 111, 54];                                       // "I hire" glyph box in the PNG (signup.json box, trimmed to the letters)
const hire = { x: (HIRE[0] - SU.x) * PK, y: (HIRE[1] - SU.y) * PK, w: HIRE[2] * PK, h: HIRE[3] * PK };
const PANEL_TOP = 304, PANEL_LEFT = (950 - PW) / 2;

/* ---------- markup ---------- */
const CUP_SVG = `<svg viewBox="0 0 230 262"><defs><linearGradient id="cg" x1="0" x2="1"><stop offset="0" stop-color="#8E1C18"/><stop offset=".33" stop-color="#E24A40"/><stop offset=".62" stop-color="#C9302C"/><stop offset="1" stop-color="#7A1613"/></linearGradient></defs>
  <path d="M44 8 Q115 0 186 8 L218 228 L12 228 Z" fill="url(#cg)"/><path d="M8 226 L222 226 L227 250 Q115 262 3 250 Z" fill="#A52320"/>
  <path d="M47 28 Q115 21 183 28" stroke="rgba(255,255,255,.2)" stroke-width="3" fill="none"/><path d="M50 48 Q115 41 180 48" stroke="rgba(0,0,0,.2)" stroke-width="3" fill="none"/>
  <path d="M66 22 L46 212" stroke="rgba(255,255,255,.22)" stroke-width="11" stroke-linecap="round"/></svg>`;
const cup = (id, amt, sub) => `<div class="cupw abs" id="cw-${id}"><div class="cup" id="cup-${id}">${CUP_SVG}<div class="lab"><b>${amt}</b><i>${sub}</i></div></div></div>`;
const grain = id => `<svg class="grain" preserveAspectRatio="none" viewBox="0 0 1080 ${H}"><filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.0032 0.12" numOctaves="3" seed="11"/><feColorMatrix type="matrix" values="0 0 0 0 0.20  0 0 0 0 0.10  0 0 0 0 0.03  1.25 0 0 0 -0.42"/></filter><rect width="1080" height="${H}" filter="url(#${id})"/></svg>`;

document.getElementById('root').innerHTML = `
  <!-- S1 HOOK: Sunday night, the kitchen bench, three quotes in three formats -->
  <div id="s1" class="fill"><div id="s1z" class="fill" style="transform-origin:540px ${SY + 475}px">
    <div class="bench">${grain('gr')}<div class="vig"></div></div>
    <div class="stage">
      <div class="prop pdf abs" id="p-pdf" style="left:10px;top:300px">${pdfHTML()}</div>
      <div class="prop phone abs" id="p-phone" style="left:572px;top:286px">${phoneHTML('bubble')}
        <svg class="mark" id="mk7400" width="10" height="10"><path id="mk7400p" d="" fill="none" stroke="#E0302A" stroke-width="7" stroke-linecap="round"/></svg></div>
      <div class="prop note abs" id="p-note" style="left:356px;top:640px">${noteHTML()}</div>
      <div class="qmark" id="qm" style="left:836px;top:428px">?</div>
      <div class="abs" style="left:0;right:0;top:12px;display:flex;justify-content:center"><div class="chip" id="h-chip">Sunday night · Hamilton · demo quotes</div></div>
      <div class="abs display" id="h-l1" style="left:0;right:0;top:62px;text-align:center;font-size:66px;color:#F8FAFC;text-shadow:0 4px 18px rgba(0,0,0,.6)">3 quotes. Same bathroom.</div>
      <div class="cap" id="h-trick" style="top:70px;font-size:54px"><span>…Trick question.</span></div>
      <div class="cap him" id="h-l2" style="top:148px;font-size:82px"><span>Which one's cheapest?</span></div>
    </div></div></div>

  <!-- S2 THE SHUFFLE: the "cheapest" ball turns up under a different cup every time -->
  <div id="s2" class="fill"><div id="s2z" class="fill">
    <div class="wall" style="height:${SY + 600}px"></div>
    <div class="top" style="top:${SY + 600}px;height:230px"></div>
    <div class="edge" style="top:${SY + 830}px"></div>
    <div class="face" style="top:${SY + 844}px"></div>
    <div class="stage">
      <div class="shadow" style="left:405px;top:790px;width:140px"></div>
      <div class="ball" id="ball" style="left:419px;top:690px">$</div>
      ${cup('a', '$8,298', 'incl. GST')}${cup('b', '$7,400', '+ GST')}${cup('c', '$7,900', 'no GST')}
      <div class="tag" id="tag1" style="top:868px">looks cheapest…</div>
      <div class="tag" id="tag2" style="top:868px">…or this one?</div>
      <div class="tag" id="tag3" style="top:868px">…or this?!</div>
      <div class="cap" id="sh-cap" style="top:40px"><span>Depends how you read them.</span></div>
    </div></div></div>

  <!-- S3 THE APP (illustrative recreation of signed-in screens; demo bids) -->
  <div id="s3" class="fill">
    <div class="fill" style="background:radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255, 200, 140, .16), rgba(2,6,23,0) 70%), #020617"></div>
    <div class="appbench" style="top:${SY + 930}px"><div class="bench">${grain('gr2')}<div class="vig"></div></div>
      <div data-qa-ignore style="position:absolute;inset:0">
        <div class="bp abs" id="bp-pdf" style="left:40px;top:70px;transform:rotate(-8deg) scale(.82);transform-origin:0 0"><div class="prop pdf" style="position:relative">${pdfHTML()}</div></div>
        <div class="bp abs" id="bp-phone" style="left:700px;top:40px;transform:rotate(7deg) scale(.82);transform-origin:0 0"><div class="prop phone" style="position:relative">${phoneHTML()}</div></div>
        <div class="bp abs" id="bp-note" style="left:330px;top:250px;transform:rotate(-3deg) scale(.82);transform-origin:0 0"><div class="prop note" style="position:relative">${noteHTML()}</div></div></div></div>
    <div class="stage">
      <div class="win" id="win"><div class="chrome"><div class="dots"><i></i><i></i><i></i></div><span class="demo">Demo bids</span><span class="illustrative">Illustrative — swap for real QSME screen (demo data)</span></div>
        <div class="vp" id="vp" data-qa-ignore><div id="cam">${appHTML()}</div><div class="efade l" id="ef-l"></div><div class="efade r" id="ef-r"></div></div></div>
      <div class="cap" id="c1" style="top:22px"><span>The emailed one goes in too.</span></div>
      <div class="cap" id="c2" style="top:22px"><span>After I've checked it.</span></div>
      <div class="cap" id="c3a" style="top:22px"><span><b style="font-weight:800">Bold</b> = what they wrote.</span></div>
      <div class="cap" id="c3b" style="top:104px"><span><span class="a">“calc.”</span> = worked out at 15%.</span></div>
      <div class="cap" id="c4" style="top:22px"><span>Excl. GST: Steamline's lowest.</span></div>
      <div class="bub tr" id="b1" style="top:30px"><small>Him</small>Hang on. It moved.</div>
      <div class="cap" id="c5a" style="top:22px"><span>Incl. GST: Trev's lowest.</span></div>
      <div class="cap" id="c5b" style="top:104px"><span>We pay incl. GST.</span></div>
      <div class="cap" id="c6a" style="top:22px"><span>$7,400 + GST = $8,510.</span></div>
      <div class="cap" id="c6b" style="top:104px"><span><span class="r">Never the cheapest.</span></span></div>
      <div class="cap" id="c7" style="top:22px"><span>Open one: see what it covers.</span></div>
    </div>
  </div>

  <!-- S5 CALLBACK: back to the bench, the phone with the hook's red loop, "= $8,510" under it -->
  <div id="s5" class="fill"><div id="s5z" class="fill" style="transform-origin:540px ${SY + 470}px">
    <div class="bench">${grain('gr3')}<div class="vig"></div></div>
    <div class="stage">
      <div class="prop pdf abs" data-qa-ignore style="left:-330px;top:520px;transform:rotate(-9deg);filter:brightness(.55)">${pdfHTML()}</div>
      <div class="prop note abs" data-qa-ignore style="left:600px;top:720px;transform:rotate(5deg);filter:brightness(.55)">${noteHTML()}</div>
      <div class="prop phone abs" id="cb-phone" style="left:96px;top:214px;transform:rotate(-4deg) scale(1.08);transform-origin:50% 0">${phoneHTML('cb-bubble')}
        <svg class="mark" id="cbmk" width="10" height="10"><path id="cbmk-p" d="" fill="none" stroke="#E0302A" stroke-width="7" stroke-linecap="round"/></svg></div>
      <div class="scrib abs" id="cb-scrib" style="left:508px;top:548px">= $8,510</div>
      <svg class="abs" id="cb-arrow" style="left:398px;top:506px;overflow:visible" width="120" height="100" viewBox="0 0 120 100"><path id="cb-arrow-p" d="M12 22 C 50 20, 86 40, 100 78 M103 58 L100 78 L85 65" fill="none" stroke="#E0302A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="bub tr" id="b2" style="top:30px"><small>Him</small>I'd have picked that one.</div>
    </div></div></div>

  <!-- S4 END CARD: the line, the real sign-up page, the CTA -->
  <div id="s4" class="fill">
    <div class="endbg"></div>
    <div class="stage">
      <div class="tagline" id="tl1" style="top:8px;font-size:60px;line-height:1.08;color:var(--ink-70)">QSME doesn't pick the&nbsp;winner.</div>
      <div class="tagline" id="tl2" style="top:90px;font-size:86px;line-height:1.04">It stops <span class="accent">GST</span><br>picking it for&nbsp;you.</div>
      <div class="live" id="live" style="left:${PANEL_LEFT}px;top:${PANEL_TOP}px;width:${PW}px;height:${PH}px">
        <img src="clips/signup.png" alt="" style="width:${(SU.img * PK).toFixed(1)}px;left:${(-SU.x * PK).toFixed(1)}px;top:${(-SU.y * PK).toFixed(1)}px">
        ${ringSVG('rg-hire', Math.round(hire.w), Math.round(hire.h), 10, '#3DC023', 4, 8, `left:${(hire.x - 10).toFixed(1)}px;top:${(hire.y - 10).toFixed(1)}px`)}</div>
      <div class="abs" id="livechip" style="left:0;right:0;top:${PANEL_TOP + PH + 16}px;display:flex;justify-content:center"><div class="chip" style="font-size:22px">qsme.co.nz/sign-up · live site</div></div>
      <div class="abs" id="endrow" style="left:0;right:0;top:${PANEL_TOP + PH + 78}px;display:flex;align-items:center;justify-content:center;gap:30px">
        <div class="logo" style="position:relative;width:203px;height:66px"><img src="qsme-logo.svg" alt="QSME" style="width:${(1509 * 66 / 387).toFixed(1)}px;left:${(-192 * 66 / 387).toFixed(1)}px;top:${(-164 * 66 / 387).toFixed(1)}px"></div>
        <div class="pill cta" id="pill">Sign up at qsme.co.nz</div>
      </div>
    </div>
  </div>
`;

/* =====================================================================================================
   TIMELINE (seconds). Hook 0–2.95 · shuffle 2.95–6.55 · add a bid 6.55–10.2 · bold/calc 10.2–13.3 ·
   Excl → Incl flip 13.3–19.6 · never the cheapest 19.6–22.4 · callback 22.4–24.55 · own lines 24.55–26.75 ·
   end card 26.75–31.6
   ===================================================================================================== */
const K = Kit;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---- S1 hook ---- */
K.scene('#s1', 0, 2.99);
K.add('#s1z', 'scale', [[0, 1.0], [2.95, 1.03, 'out']]);
K.add('#p-pdf', 'rotate', [[0, -6]]).add('#p-pdf', 'scale', [[0, 0.95], [0.12, 0.9, 'slam']]);
K.add('#p-phone', 'opacity', [[0.18, 0], [0.22, 1]]).add('#p-phone', 'rotate', [[0.18, 13], [0.32, 6, 'slam']]).add('#p-phone', 'scale', [[0.18, 1.1], [0.32, 0.9, 'slam']]);
K.add('#p-note', 'opacity', [[0.38, 0], [0.42, 1]]).add('#p-note', 'rotate', [[0.38, -10], [0.52, -3, 'slam']]).add('#p-note', 'scale', [[0.38, 1.15], [0.52, 0.95, 'slam']]);
K.add('#h-l2', 'scale', [[0, 1.06], [0.14, 1, 'slam']]);   // on screen from frame 1 (autoplay + thumbnail)
K.add('#mk7400p', 'trim', [[0.95, 0], [1.3, 1, 'out']]);
K.add('#qm', 'opacity', [[1.32, 0], [1.36, 1]]).add('#qm', 'scale', [[1.32, 1.6], [1.46, 1, 'slam']]).add('#qm', 'rotate', [[1.32, -18], [1.46, 10, 'out']]);
K.out('#h-l1', 1.84, 0.1);                       // "3 quotes. Same bathroom." makes way …
K.pop('#h-trick', 1.9, { dy: 18 });              // … for "…Trick question." in the same spot (Trev's note stays clear)
K.add('#s1', 'x', [[2.83, 0], [2.97, -460, 'in']]).add('#s1', 'blur', [[2.83, 0], [2.97, 22, 'in']]);

/* ---- S2 the shuffle ---- */
const S2_OUT = 6.5;
K.scene('#s2', 2.93, S2_OUT + 0.17);
K.add('#s2', 'x', [[2.93, 420], [3.08, 0, 'out']]).add('#s2', 'blur', [[2.93, 22], [3.08, 0, 'out']]);
K.add('#s2z', 'scale', [[2.93, 1.0], [S2_OUT, 1.03, 'linear']]);
const SLOT = [55, 360, 665];             // cup left edges (stage px) for slots 0,1,2 (the ball sits under slot 1)
const CUPTOP = 546;
['a', 'b', 'c'].forEach((id, i) => { const n = document.getElementById('cw-' + id); n.style.left = SLOT[i] + 'px'; n.style.top = CUPTOP + 'px'; });
[['a', 3.0], ['b', 3.05], ['c', 3.1]].forEach(([id, t]) => {
  K.add('#cup-' + id, 'y', [[t, -560], [t + 0.16, 0, 'slam']]);
  K.add('#cup-' + id, 'scaleY', [[t + 0.16, 0.9], [t + 0.26, 1, 'out']]);
});
// lifts over the middle slot: b ($7,400 + GST) at 3.32, a ($8,298 incl.) at 4.52, c ($7,900 no GST) at 5.66.
// The cup tips back as it comes up, so the ball reads as just uncovered under its rim.
const LIFT = -168, TILT = -12;
const lift = (id, up, down) => {
  K.add('#cup-' + id, 'y', [[up, 0], [up + 0.18, LIFT, 'out']].concat(down ? [[down, LIFT], [down + 0.14, 0, 'in']] : []));
  K.add('#cup-' + id, 'rotate', [[up, 0], [up + 0.18, TILT, 'out']].concat(down ? [[down, TILT], [down + 0.14, 0, 'in']] : []));
};
lift('b', 3.32, 3.84); lift('a', 4.52, 5.02); lift('c', 5.66, null);
const D = SLOT[1] - SLOT[0];
K.add('#cw-a', 'x', [[4.02, 0], [4.40, D, 'inOut'], [5.18, D], [5.56, 2 * D, 'inOut']]);
K.add('#cw-a', 'y', [[4.02, 0], [4.21, -70, 'out'], [4.40, 0, 'in'], [5.18, 0], [5.37, 18, 'out'], [5.56, 0, 'in']]);
K.add('#cw-a', 'scale', [[4.02, 1], [4.21, 1.07, 'out'], [4.40, 1, 'in'], [5.18, 1], [5.37, 0.94, 'out'], [5.56, 1, 'in']]);
K.add('#cw-b', 'x', [[4.02, 0], [4.40, -D, 'inOut']]);
K.add('#cw-b', 'y', [[4.02, 0], [4.21, 18, 'out'], [4.40, 0, 'in']]);
K.add('#cw-b', 'scale', [[4.02, 1], [4.21, 0.94, 'out'], [4.40, 1, 'in']]);
K.add('#cw-c', 'x', [[5.18, 0], [5.56, -D, 'inOut']]);
K.add('#cw-c', 'y', [[5.18, 0], [5.37, -70, 'out'], [5.56, 0, 'in']]);
K.add('#cw-c', 'scale', [[5.18, 1], [5.37, 1.07, 'out'], [5.56, 1, 'in']]);
K.each(t => {   // who is in front during a swap
  const z = { a: 2, b: 1, c: 1 };
  if (t >= 5.1) { z.a = 1; z.c = 3; }
  for (const id in z) document.getElementById('cw-' + id).style.zIndex = z[id];
});
// the tags only ask: the answer is saved for the app
K.pop('#tag1', 3.42, { dy: 16 }).out('#tag1', 3.84, 0.12);
K.pop('#tag2', 4.62, { dy: 16 }).out('#tag2', 5.0, 0.12);
K.pop('#tag3', 5.76, { dy: 16 });
K.pop('#sh-cap', 3.36, { dy: 24 });
K.add('#s2', 'opacity', [[S2_OUT, 1], [S2_OUT + 0.15, 0, 'in']]);
K.add('#s2z', 'x', [[S2_OUT, 0], [S2_OUT + 0.15, -360, 'in']]);

/* ---- S3 the app ---- */
const S3_IN = 6.54, S3_OUT = 26.72;
K.add('#s3', 'opacity', [[S3_IN, 0], [S3_IN + 0.02, 1], [S3_OUT + 0.02, 1], [S3_OUT + 0.14, 0, 'in']]);
K.add('#win', 'x', [[S3_IN, 420], [S3_IN + 0.18, 0, 'out'], [S3_OUT - 0.04, 0], [S3_OUT + 0.12, -460, 'in']]);
K.add('#win', 'blur', [[S3_IN, 18], [S3_IN + 0.18, 0, 'out'], [S3_OUT - 0.04, 0], [S3_OUT + 0.12, 18, 'in']]);

// captions (Mel = white, him = green bubbles)
const capIn = (id, t0, t1) => { K.pop(id, t0, { dy: 22 }); K.out(id, t1, 0.12); };
const bubIn = (id, t0, t1) => { K.add(id, 'opacity', [[t0, 0], [t0 + 0.06, 1], [t1, 1], [t1 + 0.12, 0]]).add(id, 'scale', [[t0, 0.6], [t0 + 0.18, 1, 'outBack']]); };
capIn('#c1', 6.62, 8.36); capIn('#c2', 8.46, 9.98);
capIn('#c3a', 10.22, 13.1); capIn('#c3b', 11.4, 13.1);
capIn('#c4', 13.32, 14.8);                         // gone before the toggle click (15.0)
bubIn('#b1', 15.32, 16.72);
capIn('#c5a', 16.82, 19.48); capIn('#c5b', 17.95, 19.48);
capIn('#c6a', 19.66, 22.4); capIn('#c6b', 20.7, 22.4);
capIn('#c7', 24.62, 26.6);

// dialog steps: drop (0.8 s) → reading, sped up (0.5 s) → the draft beside the original → tick → added
K.add('#st-drop', 'opacity', [[7.28, 1], [7.34, 0]]);
K.add('#st-work', 'opacity', [[0, 0], [7.32, 0], [7.38, 1], [7.82, 1], [7.88, 0]]);
K.add('#st-rev', 'opacity', [[0, 0], [7.84, 0], [7.95, 1, 'out']]);
K.add('#dsc1', 'opacity', [[7.84, 1], [7.85, 0]]); K.add('#dsc2', 'opacity', [[0, 0], [7.84, 0], [7.85, 1]]);
K.add('#spin', 'rotate', [[7.32, 0], [7.88, 420]]);
K.add('#sped', 'opacity', [[0, 0], [7.32, 0], [7.38, 1], [7.82, 1], [7.88, 0]]);
K.add('#zonehot', 'opacity', [[0, 0], [6.98, 0], [7.06, 1], [7.26, 1], [7.34, 0]]);
K.add('#file', 'opacity', [[0, 0], [6.64, 0], [6.7, 1], [7.2, 1], [7.32, 0]]).add('#file', 'scale', [[7.18, 1], [7.32, 0.8, 'in']]);
const TICK = 9.58, SAVE = 9.8;
K.add('#chk1on', 'opacity', [[0, 0], [TICK + 0.03, 0], [TICK + 0.07, 1]]);
K.add('#save', 'scale', [[SAVE - 0.02, 1], [SAVE + 0.04, 0.95], [SAVE + 0.14, 1, 'out']]);
K.add('#dlg', 'opacity', [[9.86, 1], [9.98, 0, 'in']]).add('#dlg', 'scale', [[9.86, 1], [9.98, 0.97, 'in']]);
K.add('#scrim', 'opacity', [[9.86, 1], [10.02, 0, 'in']]);
K.add('#flash', 'opacity', [[0, 0], [9.98, 0], [10.12, 1, 'out'], [11.0, 0, 'in']]);
// the flip: toggle, header, and the "Lowest" tag hops from Steamline to Trev (rows stay put)
const FLIP = 15.0, HOP = 15.05, HOPD = 0.25;
K.add('#maskr', 'opacity', [[0, 0], [12.98, 0], [13.3, 1, 'out'], [16.72, 1], [17.0, 0, 'in']]);
// rings (marker loops)
const ring = (id, t0, t1, tOut) => { K.add('#' + id + '-p', 'trim', [[t0, 0], [t1, 1, 'out']]); K.add('#' + id, 'opacity', [[0, 1], [tOut, 1], [tOut + 0.16, 0]]); };
ring('rg-bold', 10.75, 11.02, 12.92); ring('rg-calc', 11.5, 11.78, 12.92);
ring('rg-lows', 13.62, 13.88, 14.7); ring('rg-lowt', 17.12, 17.38, 19.4);
ring('rg-pu', 20.05, 20.36, 22.5); ring('rg-tot', 26.12, 26.38, 26.8);
// the bench props under the window light up when their bid is on screen (PDF = Steamline, note = Trev, phone = Puddlestone)
K.add('#bp-pdf', 'var:--b', [[0, 0.5], [6.6, 0.5], [6.75, 0.95], [7.3, 0.95], [7.5, 0.5], [9.95, 0.5], [10.1, 1], [10.9, 1], [11.3, 0.5]]);
K.add('#bp-note', 'var:--b', [[0, 0.5], [15.25, 0.5], [15.4, 1], [17.0, 1], [17.4, 0.5]]);
K.add('#bp-phone', 'var:--b', [[0, 0.5], [19.8, 0.5], [19.95, 1], [22.5, 1]]);

/* ---- S5 the callback (Him's punchline over the phone on the bench) ---- */
const CB0 = 22.4, CB1 = 24.55;
K.scene('#s5', CB0, CB1);
K.add('#s5', 'blur', [[CB0, 14], [CB0 + 0.1, 0, 'out']]);
K.add('#s5z', 'scale', [[CB0, 1.0], [CB1, 1.05, 'linear']]);
K.add('#cbmk-p', 'trim', [[CB0, 0.35], [CB0 + 0.22, 1, 'out']]);
K.add('#cb-arrow-p', 'trim', [[22.6, 0], [22.8, 1, 'out']]);
K.add('#cb-scrib', 'clipX', [[22.72, 0], [23.12, 1, 'out']]);
bubIn('#b2', 22.46, 24.46);

/* ---- measured geometry: every box is in #cam coordinates (offsets summed up to #cam). Read once, after fonts load. ---- */
const VPW = 950, VPH = 708, FORM_S = 2.3, NUM_S = 2.4, DET_S = 1.42, DLG_S = 0.965;
let M = null;
function rel(el) { let x = 0, y = 0, n = el; const cam = document.getElementById('cam'); while (n && n !== cam) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 }; }
function relSpan(el) { // text-only box of an inline element (for rings around a number), cam at identity
  const camR = document.getElementById('cam').getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - camR.left, y: r.top - camR.top, w: r.width, h: r.height };
}
let bdRows = null, bdMid = null;
function setBd(cp) {   // 0 = all five breakdown columns, 1 = Item + Line total only
  if (!bdRows) { bdRows = [...document.querySelectorAll('#bdt-st .h, #bdt-st .l')]; bdMid = [...document.querySelectorAll('#bdt-st .mid')]; }
  const tpl = BDC.map((c, i) => ((i >= 1 && i <= 3 ? c * (1 - cp) : c).toFixed(2) + 'px')).join(' ');
  for (const n of bdRows) n.style.gridTemplateColumns = tpl;
  const o = clamp(1 - cp * 2.2, 0, 1).toFixed(3);
  for (const n of bdMid) n.style.opacity = o;
}
function measure() {
  const g = id => rel(document.getElementById(id));
  const m = {};
  for (const id of ['dlg', 'dropwrap', 'zone', 'form', 'fin', 'notice', 'price', 'confirm', 'chk1', 'save', 'tbl', 'rows', 'onrow', 'rg', 'rg-in', 'cmpcard', 'foot', 'bd-st', 'bdt-st', 'det-st']) m[id] = g(id);
  for (const k of ['st', 'pu', 'tr']) { m['ex-' + k] = g('ex-' + k); m['in-' + k] = g('in-' + k); m['row-' + k] = g('row-' + k); }
  m.exL = m['ex-st'].x; m.exR = m['ex-st'].x + m['ex-st'].w; m.inR = m['in-st'].x + m['in-st'].w;
  m.tblB = m.tbl.y + m.tbl.h;
  m.scB = m.confirm.y - m.form.y - 70;         // form pane scrolled to the tick and "Add to the bids"
  // camera scales that depend on the layout
  m.sc = {
    tbl: VPW / (m.tbl.w + 24),                                                           // the whole Compare bids table
    num: Math.min(NUM_S, VPW / (m.inR - m.exL + 14), VPH / (m.tbl.h + 22)),               // Excl. · GST · Incl. columns, all rows
    flip: Math.min(VPW / (m.exR - m.tbl.x + 28), VPH / (m.tblB - m.onrow.y + 12)),       // toggle + Bidder + Excl. GST
  };
  m.sc.num2 = m.sc.num * 1.018;
  // span boxes need the camera at identity; the breakdown is measured folded (Item + Line total)
  const cam = document.getElementById('cam'), keep = cam.style.transform; cam.style.transform = 'none';
  const lows = ['st', 'pu', 'tr'].map(k => document.getElementById('low-' + k));
  m.sp = {};
  for (const k of ['st', 'pu', 'tr']) {
    m.sp['exv-' + k] = relSpan(document.querySelector('#ex-' + k + ' .fig'));
    m.sp['inv-' + k] = relSpan(document.querySelector('#in-' + k + ' .fig'));
    m.sp['low-' + k] = relSpan(lows[['st', 'pu', 'tr'].indexOf(k)]);
  }
  setBd(1);
  m.bdtC = rel(document.getElementById('bdt-st'));
  m.sp.bdtot = relSpan(document.querySelector('#bdtot-st .rt.green'));
  setBd(0);
  cam.style.transform = keep;
  // the marker loops round the "7400 + gst mate" bubble (phone-local px): the hook and the callback
  // (the callback scene is hidden at t = 0, so its identical phone reuses the hook's measurement)
  const b = document.getElementById('bubble'), pad = 20;
  const bx = b.offsetLeft + 13, by = b.offsetTop + 13, bw = b.offsetWidth, bh = b.offsetHeight;
  for (const mkid of ['mk7400', 'cbmk']) {
    const mk = document.getElementById(mkid);
    mk.setAttribute('width', bw + pad * 2); mk.setAttribute('height', bh + pad * 2); mk.style.left = (bx - pad) + 'px'; mk.style.top = (by - pad) + 'px';
    document.getElementById(mkid + (mkid === 'mk7400' ? 'p' : '-p')).setAttribute('d', loopPath(bw, bh, pad, 7));
  }
  return m;
}

/* camera keys: [t, framing, scale, ease]. A framing returns the cam point put at the viewport centre; a string scale is read from M.sc. */
const F = {
  dlg: m => [m.dlg.cx, m.dlg.y + VPH / DLG_S / 2],                                                       // the whole dialog: drop zone, reading, the draft beside the original
  form: m => [m.form.cx, m.form.y - 6 + VPH / FORM_S / 2],                               // the draft: notice + who it's from, all ≥ 26 px
  tbl: m => [m.tbl.cx, (m.onrow.y - 70 + m.foot.y + m.foot.h + 8) / 2],                  // card header → footnote
  num: m => [(m.exL + m.inR) / 2, m.tbl.y - 10 + VPH / m.sc.num / 2],                     // table top just under the toggle, footnote out of frame
  flip: m => [(m.tbl.x - 14 + m.exR + 14) / 2, (m.onrow.y - 6 + m.tblB + 6) / 2],
  det: m => [m['det-st'].x - 8 + VPW / DET_S / 2, m['det-st'].y - 8 + VPH / DET_S / 2],   // the whole card: name, totals, all five columns, the Total
  detTot: m => [m.bdtC.cx + 20, m.bdtC.y - 6 + VPH / 2.3 / 2],                            // Item + Line total, ending on the Total
};
const CAM = [
  [S3_IN, 'dlg', DLG_S], [8.05, 'dlg', DLG_S], [8.4, 'form', FORM_S, 'inOut'],   // the draft beside the original, then the notice
  [9.84, 'form', FORM_S], [10.2, 'tbl', 'tbl', 'inOut'], [10.42, 'tbl', 'tbl'], [10.72, 'num', 'num', 'inOut'],
  [12.95, 'num', 'num'], [13.32, 'flip', 'flip', 'inOut'], [16.72, 'flip', 'flip'], [17.08, 'tbl', 'tbl', 'inOut'],
  [19.5, 'tbl', 'tbl'], [19.84, 'num', 'num', 'inOut'], [CB0, 'num', 'num2', 'linear'],
  [CB0 + 0.05, 'tbl', 'tbl'], [24.88, 'tbl', 'tbl'], [25.2, 'det', DET_S, 'swipe'], [25.38, 'det', DET_S], [26.15, 'detTot', 2.3, 'inOut'], [S3_OUT + 0.1, 'detTot', 2.33],
];
const FOLD0 = 25.42, FOLD1 = 25.78;   // Type / Qty / Rate fold away as the camera pushes in
/* form pane scroll (inside the dialog): the notice → the tick */
const SCROLL = [[8.95, 0], [9.28, 'B', 'scroll']];
/* pointer keys (cam coords) */
const P = {
  fileStart: m => [m.dlg.cx + 250, m.dlg.y + 470],
  zone: m => [m.zone.cx + 30, m.zone.cy + 10],
  chkA: m => [m.chk1.x + 160, m.chk1.y - m.scB + 70],
  chk: m => [m.chk1.x + 9, m.chk1.y - m.scB + 9],
  save: m => [m.save.cx - 10, m.save.cy - m.scB],
  rgA: m => [m.tbl.x + 300, m.rows.y + 150],
  rgIn: m => [m['rg-in'].cx, m['rg-in'].cy],
  stRowA: m => [m.tbl.x + 520, m.rows.y + 180],
  stRow: m => [m.tbl.x + 330, m.rows.y + 36],
};
const SEL = 24.86;
const PKEYS = [
  [6.66, 'fileStart'], [7.2, 'zone', 'inOut'], [7.32, 'zone'],
  [9.3, 'chkA'], [TICK - 0.02, 'chk', 'inOut'], [TICK + 0.08, 'chk'], [SAVE - 0.02, 'save', 'inOut'], [9.9, 'save'],
  [14.3, 'rgA'], [FLIP - 0.06, 'rgIn', 'inOut'], [15.3, 'rgIn'],
  [24.55, 'stRowA'], [SEL - 0.03, 'stRow', 'inOut'], [25.3, 'stRow'],
];
const PTR_ON = [[6.66, 7.34], [9.3, 9.92], [14.3, 15.5], [24.55, 25.25]];
const CLICKS = [[TICK, 'chk'], [SAVE, 'save'], [FLIP, 'rgIn'], [SEL, 'stRow']];

const EZ = Kit.ease, ez = e => (typeof e === 'string' ? EZ[e] : e) || EZ.linear;
function keyAt(keys, t, res) {   // keys: [t, name, ...]; returns [prevKey, nextKey, p]
  if (t <= keys[0][0]) return [keys[0], keys[0], 0];
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i]; return [a, b, ez(b[res])((t - a[0]) / (b[0] - a[0]))]; }
  const l = keys[keys.length - 1]; return [l, l, 0];
}
const SEED = { 'rg-bold': 1, 'rg-calc': 2, 'rg-lows': 3, 'rg-lowt': 4, 'rg-pu': 5, 'rg-tot': 6 };
function place(id, box, pad, dy) {   // size the marker loop to the measured text and put it there (cam coords)
  const n = document.getElementById(id), w = Math.round(box.w), h = Math.round(box.h);
  n.setAttribute('width', w + pad * 2); n.setAttribute('height', h + pad * 2); n.setAttribute('viewBox', `0 0 ${w + pad * 2} ${h + pad * 2}`);
  document.getElementById(id + '-p').setAttribute('d', loopPath(w, h, pad, SEED[id]));
  n.style.left = (box.x - pad) + 'px'; n.style.top = (box.y + (dy || 0) - pad) + 'px';
}
const scaleOf = v => (typeof v === 'string' ? M.sc[v] : v);
/* the hopping "Lowest" tag: position at time t (cam coords), with a little arc, a lift and a squash on landing */
function hopAt(t) {
  const A = M.sp['low-st'], B = M.sp['low-tr'];
  const p = clamp((t - HOP) / HOPD, 0, 1), e = EZ.out(p), arc = Math.sin(Math.PI * p);
  const land = clamp((t - HOP - HOPD) / 0.12, 0, 1);
  const sq = t >= HOP + HOPD ? 1 - Math.sin(Math.PI * land) : 1;
  return { x: A.x + (B.x - A.x) * e + 34 * arc, y: A.y + (B.y - A.y) * e, s: 1 + 0.28 * arc, sx: t >= HOP + HOPD ? 1 + 0.12 * (1 - sq) : 1, sy: t >= HOP + HOPD ? 1 - 0.16 * (1 - sq) : 1 };
}

K.each(t => {
  if (!M) {
    if (document.fonts.status !== 'loaded') return;
    M = measure();
    const z = document.getElementById('zonehot'); z.style.left = M.zone.x + 'px'; z.style.top = M.zone.y + 'px'; z.style.width = M.zone.w + 'px'; z.style.height = M.zone.h + 'px';
    const sped = document.getElementById('sped'); sped.style.left = (M.dlg.cx - 40) + 'px'; sped.style.top = (M.dlg.y + M.dlg.h - 150) + 'px';
    place('rg-bold', M.sp['inv-st'], 14); place('rg-calc', M.sp['exv-st'], 14); place('rg-lows', M.sp['low-st'], 12);
    place('rg-lowt', M.sp['low-tr'], 12); place('rg-pu', M.sp['inv-pu'], 14); place('rg-tot', M.sp.bdtot, 14);
    // white mask right of the Excl. GST column for the flip close-up (a clean column edge, no sliced GST figures)
    const mk = document.getElementById('maskr'); mk.style.left = (M.exR - 12) + 'px'; mk.style.top = (M.onrow.y - 30) + 'px'; mk.style.width = '300px'; mk.style.height = (M.tblB + 60 - M.onrow.y) + 'px';
  }
  // camera
  const [a, b, p] = keyAt(CAM, t, 3);
  const fa = F[a[1]](M), fb = F[b[1]](M), sa = scaleOf(a[2]), sb = scaleOf(b[2]);
  const s = Math.exp(Math.log(sa) + (Math.log(sb) - Math.log(sa)) * p);
  const fx = fa[0] + (fb[0] - fa[0]) * p, fy = fa[1] + (fb[1] - fa[1]) * p;
  document.getElementById('cam').style.transform = `translate(${(VPW / 2 - fx * s).toFixed(2)}px,${(VPH / 2 - fy * s).toFixed(2)}px) scale(${s.toFixed(4)})`;
  // soft white edges on the table close-ups
  const ef = t > 10.3 && t < S3_OUT + 0.2 ? clamp((s - 1.8) / 0.3, 0, 1) : 0;
  document.getElementById('ef-l').style.opacity = ef.toFixed(3); document.getElementById('ef-r').style.opacity = ef.toFixed(3);
  // form pane scroll
  const sv = v => (v === 'B' ? M.scB : v);
  const [ka, kb, kp] = keyAt(SCROLL, t, 2);
  document.getElementById('fin').style.transform = `translateY(${(-(sv(ka[1]) + (sv(kb[1]) - sv(ka[1])) * kp)).toFixed(1)}px)`;
  // pointer + dragged file
  const [pa, pb, pp] = keyAt(PKEYS, t, 2), A = P[pa[1]](M), B = P[pb[1]](M);
  const px = A[0] + (B[0] - A[0]) * pp, py = A[1] + (B[1] - A[1]) * pp;
  const on = PTR_ON.some(r => t >= r[0] && t < r[1]);
  const ptr = document.getElementById('ptr'); ptr.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`; ptr.style.visibility = on ? 'visible' : 'hidden';
  const file = document.getElementById('file'); file.style.left = (px + 16) + 'px'; file.style.top = (py + 22) + 'px';
  // click pulse
  let c = null; for (const k of CLICKS) if (t >= k[0]) c = k;
  const ck = document.getElementById('click');
  if (c && t - c[0] < 0.36) { const age = t - c[0], pt = P[c[1]](M); ck.style.left = pt[0] + 'px'; ck.style.top = pt[1] + 'px'; ck.style.opacity = (0.9 * (1 - age / 0.36)).toFixed(2); ck.style.transform = `scale(${(0.5 + age * 3.2).toFixed(2)})`; ck.style.visibility = 'visible'; }
  else ck.style.visibility = 'hidden';
  // table state
  const flipped = t >= FLIP;
  document.getElementById('rg-ex').classList.toggle('sel', !flipped); document.getElementById('rg-in').classList.toggle('sel', flipped);
  document.getElementById('h-ex').classList.toggle('on-col', !flipped); document.getElementById('h-in').classList.toggle('on-col', flipped);
  // the one visible "Lowest" tag (+ a short motion trail while it hops)
  const h = hopAt(t), fly = document.getElementById('lowfly');
  fly.style.left = h.x.toFixed(1) + 'px'; fly.style.top = h.y.toFixed(1) + 'px'; fly.style.transform = `scale(${(h.s * h.sx).toFixed(3)},${(h.s * h.sy).toFixed(3)})`;
  [['lowg1', 0.03, 0.42], ['lowg2', 0.06, 0.26], ['lowg3', 0.09, 0.13]].forEach(([id, lag, op]) => {
    const n = document.getElementById(id), g = hopAt(t - lag), moving = t > HOP && t - lag < HOP + HOPD;
    n.style.left = g.x.toFixed(1) + 'px'; n.style.top = g.y.toFixed(1) + 'px'; n.style.transform = `scale(${g.s.toFixed(3)})`; n.style.opacity = moving ? op : 0;
  });
  // Steamline's row opens to its own lines
  const sel = t >= SEL ? 'st' : null;
  for (const k of ['st', 'pu', 'tr']) { document.getElementById('row-' + k).classList.toggle('sel', k === sel); document.getElementById('sel-' + k).style.display = k === sel ? '' : 'none'; }
  document.getElementById('dw-st').style.visibility = sel === 'st' ? 'visible' : 'hidden';
  setBd(EZ.inOut(clamp((t - FOLD0) / (FOLD1 - FOLD0), 0, 1)));
});

/* ---- S4 end card: both lines at the cut, the sign-up page +0.6 s, the CTA +1.2 s ---- */
const E0 = 26.72;
K.scene('#s4', E0, DUR + 1);
K.add('#s4', 'opacity', [[E0, 0], [E0 + 0.14, 1, 'out']]);
K.pop('#tl1', E0 + 0.1, { dy: 26 });
K.pop('#tl2', E0 + 0.2, { dy: 30 });
K.add('#live', 'opacity', [[0, 0], [E0 + 0.68, 0], [E0 + 0.88, 1, 'out']]).add('#live', 'y', [[E0 + 0.68, 60], [E0 + 1.02, 0, 'out']]);
K.add('#live', 'scale', [[E0 + 1.02, 1], [DUR, 1.025, 'linear']]);
K.pop('#livechip', E0 + 0.98, { dy: 10 });
K.add('#rg-hire-p', 'trim', [[E0 + 1.1, 0], [E0 + 1.42, 1, 'out']]);
K.pop('#endrow', E0 + 1.32, { dy: 24 });
K.add('#pill', 'scale', [[E0 + 1.62, 1], [E0 + 1.74, 1.08, 'out'], [E0 + 1.92, 1, 'in'], [30.1, 1], [30.22, 1.07, 'out'], [30.42, 1, 'in']]);

K.ready({ duration: DUR, fonts: ['800 60px Manrope', '700 20px Manrope', '600 20px Manrope', '500 20px Manrope', '400 40px Kalam', '700 40px Kalam', '400 40px "Permanent Marker"', '400 20px Inter', '500 20px Inter', '600 20px Inter', '700 20px Inter', '500 20px "JetBrains Mono"', '700 20px "JetBrains Mono"'] });
})();
