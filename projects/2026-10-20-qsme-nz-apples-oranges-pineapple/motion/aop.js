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
   the bench ("= $8,510"); the breakdown frames Item + Line total and ends on the Total; the end card builds in 1.2 s.

   AUDIO-FIRST REMAKE 2026-10-06 (owner feedback on N01: no gaps, no breath cuts, a real hook, continuous speech): ONE voice
   (Cam S, eleven_v3) tells it as the partner who asked, playing both the explainer and the self-own. The take
   (outputs/vo-take-cam-v3/take.mp3, one unbroken request laid at 0.0) is the clock; every beat below sits on its
   word in alignment.json and the captions are phrases lifted from the narration. Design unchanged: the bench, the cups,
   the illustrative app, the callback, the real sign-up still.
   CTA PRONUNCIATION FIX 2026-10-10 (owner rule 2026-10-08: "dot koh dot en zed", co said like KO, never spelled C-O): the
   whole take was regenerated (38.00 s, attempt 4 overall; attempt 3 kept as *-attempt3) and EVERY timing below was
   re-derived from the new alignment.json (old word time → new word time, piecewise). The page runs 39.4 s (take + 1.4 s). */
(function () {
'use strict';
const R9 = document.body.classList.contains('r9x16');
const H = R9 ? 1920 : 1350, SY = R9 ? 300 : 200;
const DUR = 39.4;                 // take ends 38.00 + 1.4 s tail

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
      <div class="tag" id="tag1" style="top:868px">Looks like this one…</div>
      <div class="tag" id="tag2" style="top:868px">…or this one,</div>
      <div class="tag" id="tag3" style="top:868px">…or this.</div>
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
      <div class="cap" id="c2" style="top:22px"><span>Once I've checked it.</span></div>
      <div class="cap" id="c0" style="top:22px"><span>One table.</span></div>
      <div class="cap" id="c3a" style="top:22px"><span><b style="font-weight:800">Bold's</b> what they wrote.</span></div>
      <div class="cap" id="c3b" style="top:104px"><span><span class="a">Grey's</span> the maths.</span></div>
      <div class="cap" id="c4" style="top:22px"><span>Excl. GST: Steamline's lowest.</span></div>
      <div class="bub tr" id="b1" style="top:30px"><small>Him</small>Hang on, it moved.</div>
      <div class="cap" id="c5a" style="top:22px"><span>Incl. GST: Trev's lowest.</span></div>
      <div class="cap" id="c5b" style="top:104px"><span>That's what we pay.</span></div>
      <div class="cap" id="c6a" style="top:22px"><span>$7,400 + GST = $8,510.</span></div>
      <div class="cap" id="c6b" style="top:104px"><span><span class="r">Never the cheapest.</span></span></div>
      <div class="cap" id="c7" style="top:22px"><span>Open one, see what it covers.</span></div>
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
   TIMELINE (seconds). AUDIO-FIRST, re-timed 2026-10-10 to the Cam S eleven_v3 take (outputs/vo-take-cam-v3/take.mp3,
   38.00 s, ONE unbroken request laid at 0.0; CTA "dot koh dot en zed") — every beat sits on its word in alignment.json.
   Hook 0–2.5 ("Which one's cheapest?" 0.0, "Trick question." 1.46) · shuffle 2.53–7.54 (lifts on "seventy-four
   hundred" 3.32, "or this one" 4.59, "or this" 5.63; "Depends how you read them." 6.24) · add a bid 7.54–10.7
   ("The emailed one goes in too," 7.74, "once I've checked it." 9.50: tick 10.24, Add to the bids 10.50) ·
   "One table:" 10.74 · bold/grey 12.19 / 13.33 · "Excluding GST, Steamline's lowest." 14.77 · "Flip it" 17.70 click,
   tag hops 17.75 · "hang on, it moved." 18.37 · "Trev." 19.58 · "That's what we pay." 20.37 · "Seventy-four hundred
   plus GST is eighty-five ten." 21.86 · "Never the cheapest." 25.47 · callback 26.65–28.35 ("I'd have picked that one."
   26.95) · "Open one, see what it covers." 28.38 · end card 30.15 ("QSME doesn't pick the winner." 30.20, "It stops GST
   picking it for you." 32.21, "Sign up at…" 34.51; pill pulses on "koh" 36.32 and "zed" 37.52) · page ends 39.4
   (take 38.00 + 1.4 s tail)
   ===================================================================================================== */
const K = Kit;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---- S1 hook: "Which one's cheapest?" (0.0–1.36) · "Trick question." (1.43–2.48) ---- */
const S1_OUT = 2.47;                               // hard cut under "Looks like" (2.57)
K.scene('#s1', 0, S1_OUT + 0.16);
K.add('#s1z', 'scale', [[0, 1.0], [S1_OUT, 1.03, 'out']]);
K.add('#p-pdf', 'rotate', [[0, -6]]).add('#p-pdf', 'scale', [[0, 0.95], [0.12, 0.9, 'slam']]);
K.add('#p-phone', 'opacity', [[0.18, 0], [0.22, 1]]).add('#p-phone', 'rotate', [[0.18, 13], [0.32, 6, 'slam']]).add('#p-phone', 'scale', [[0.18, 1.1], [0.32, 0.9, 'slam']]);
K.add('#p-note', 'opacity', [[0.38, 0], [0.42, 1]]).add('#p-note', 'rotate', [[0.38, -10], [0.53, -3, 'slam']]).add('#p-note', 'scale', [[0.38, 1.15], [0.53, 0.95, 'slam']]);
K.add('#h-l2', 'scale', [[0, 1.06], [0.14, 1, 'slam']]);   // "Which one's cheapest?" on screen from frame 1, said at 0.0
K.add('#mk7400p', 'trim', [[0.87, 0], [1.23, 1, 'out']]);   // the loop lands under "cheapest?" (0.46–1.40)
K.add('#qm', 'opacity', [[1.28, 0], [1.32, 1]]).add('#qm', 'scale', [[1.28, 1.6], [1.42, 1, 'slam']]).add('#qm', 'rotate', [[1.28, -18], [1.42, 10, 'out']]);
K.out('#h-l1', 1.40, 0.1);                       // "3 quotes. Same bathroom." makes way …
K.pop('#h-trick', 1.46, { dy: 18 });             // … for "…Trick question." on the word (1.46)
K.add('#s1', 'x', [[S1_OUT, 0], [S1_OUT + 0.14, -460, 'in']]).add('#s1', 'blur', [[S1_OUT, 0], [S1_OUT + 0.14, 22, 'in']]);

/* ---- S2 the shuffle: "Looks like the seventy-four hundred, or this one, or this. Depends how you read them." ---- */
const S2_IN = 2.53, S2_OUT = 7.47;                 // "them." ends 7.44; "The emailed one" starts 7.74
K.scene('#s2', S2_IN, S2_OUT + 0.17);
K.add('#s2', 'x', [[S2_IN, 420], [S2_IN + 0.15, 0, 'out']]).add('#s2', 'blur', [[S2_IN, 22], [S2_IN + 0.15, 0, 'out']]);
K.add('#s2z', 'scale', [[S2_IN, 1.0], [S2_OUT, 1.03, 'linear']]);
const SLOT = [55, 360, 665];             // cup left edges (stage px) for slots 0,1,2 (the ball sits under slot 1)
const CUPTOP = 546;
['a', 'b', 'c'].forEach((id, i) => { const n = document.getElementById('cw-' + id); n.style.left = SLOT[i] + 'px'; n.style.top = CUPTOP + 'px'; });
[['a', 2.59], ['b', 2.63], ['c', 2.67]].forEach(([id, t]) => {
  K.add('#cup-' + id, 'y', [[t, -560], [t + 0.16, 0, 'slam']]);
  K.add('#cup-' + id, 'scaleY', [[t + 0.16, 0.9], [t + 0.26, 1, 'out']]);
});
// lifts over the middle slot, on the words: b ($7,400 + GST) on "seventy-four" (3.32), a ($8,298 incl.) on "or this one"
// (4.59), c ($7,900 no GST) on "or this" (5.63). The cup tips back as it comes up, so the ball reads as just uncovered.
const LIFT = -168, TILT = -12;
const lift = (id, up, down) => {
  K.add('#cup-' + id, 'y', [[up, 0], [up + 0.18, LIFT, 'out']].concat(down ? [[down, LIFT], [down + 0.14, 0, 'in']] : []));
  K.add('#cup-' + id, 'rotate', [[up, 0], [up + 0.18, TILT, 'out']].concat(down ? [[down, TILT], [down + 0.14, 0, 'in']] : []));
};
lift('b', 3.27, 4.02); lift('a', 4.58, 5.07); lift('c', 5.64, null);
const D = SLOT[1] - SLOT[0];
const SW1 = 4.18, SW2 = 5.28;            // the two swaps (a↔b after the first lift, a↔c after the second)
K.add('#cw-a', 'x', [[SW1, 0], [SW1 + 0.38, D, 'inOut'], [SW2, D], [SW2 + 0.26, 2 * D, 'inOut']]);
K.add('#cw-a', 'y', [[SW1, 0], [SW1 + 0.19, -70, 'out'], [SW1 + 0.38, 0, 'in'], [SW2, 0], [SW2 + 0.13, 18, 'out'], [SW2 + 0.26, 0, 'in']]);
K.add('#cw-a', 'scale', [[SW1, 1], [SW1 + 0.19, 1.07, 'out'], [SW1 + 0.38, 1, 'in'], [SW2, 1], [SW2 + 0.13, 0.94, 'out'], [SW2 + 0.26, 1, 'in']]);
K.add('#cw-b', 'x', [[SW1, 0], [SW1 + 0.38, -D, 'inOut']]);
K.add('#cw-b', 'y', [[SW1, 0], [SW1 + 0.19, 18, 'out'], [SW1 + 0.38, 0, 'in']]);
K.add('#cw-b', 'scale', [[SW1, 1], [SW1 + 0.19, 0.94, 'out'], [SW1 + 0.38, 1, 'in']]);
K.add('#cw-c', 'x', [[SW2, 0], [SW2 + 0.26, -D, 'inOut']]);
K.add('#cw-c', 'y', [[SW2, 0], [SW2 + 0.13, -70, 'out'], [SW2 + 0.26, 0, 'in']]);
K.add('#cw-c', 'scale', [[SW2, 1], [SW2 + 0.13, 1.07, 'out'], [SW2 + 0.26, 1, 'in']]);
K.each(t => {   // who is in front during a swap
  const z = { a: 2, b: 1, c: 1 };
  if (t >= SW2 - 0.08) { z.a = 1; z.c = 3; }
  for (const id in z) document.getElementById('cw-' + id).style.zIndex = z[id];
});
// the tags are the narration: "Looks like this one…" / "…or this one," / "…or this." (the answer is saved for the app)
K.pop('#tag1', 3.32, { dy: 16 }).out('#tag1', 4.04, 0.12);
K.pop('#tag2', 4.61, { dy: 16 }).out('#tag2', 5.10, 0.12);
K.pop('#tag3', 5.66, { dy: 16 });
K.pop('#sh-cap', 6.24, { dy: 24 });              // "Depends how you read them." on the words (6.24–7.44)
K.add('#s2', 'opacity', [[S2_OUT, 1], [S2_OUT + 0.15, 0, 'in']]);
K.add('#s2z', 'x', [[S2_OUT, 0], [S2_OUT + 0.15, -360, 'in']]);

/* ---- S3 the app ---- */
const S3_IN = 7.54, S3_OUT = 30.15;                 // "The emailed one" 7.74 … "covers." ends 30.08; "Queue Ess Mee" 30.20
K.add('#s3', 'opacity', [[S3_IN, 0], [S3_IN + 0.02, 1], [S3_OUT + 0.02, 1], [S3_OUT + 0.14, 0, 'in']]);
K.add('#win', 'x', [[S3_IN, 420], [S3_IN + 0.18, 0, 'out'], [S3_OUT - 0.04, 0], [S3_OUT + 0.12, -460, 'in']]);
K.add('#win', 'blur', [[S3_IN, 18], [S3_IN + 0.18, 0, 'out'], [S3_OUT - 0.04, 0], [S3_OUT + 0.12, 18, 'in']]);

// captions = phrases from the narration, each on its first word (white) / the self-own as green bubbles
const capIn = (id, t0, t1) => { K.pop(id, t0, { dy: 22 }); K.out(id, t1, 0.12); };
const bubIn = (id, t0, t1) => { K.add(id, 'opacity', [[t0, 0], [t0 + 0.06, 1], [t1, 1], [t1 + 0.12, 0]]).add(id, 'scale', [[t0, 0.6], [t0 + 0.18, 1, 'outBack']]); };
capIn('#c1', 7.74, 9.40);                          // "The emailed one goes in too," 7.74–9.44
capIn('#c2', 9.50, 10.64);                         // "once I've checked it." 9.50–10.56
capIn('#c0', 10.74, 12.08);                        // "One table:" 10.74–12.16
capIn('#c3a', 12.19, 14.61); capIn('#c3b', 13.32, 14.61);   // "bold's what they wrote," 12.19 · "grey's the maths." 13.32
capIn('#c4', 14.78, 17.25);                        // "Excluding GST, Steamline's lowest." 14.78–17.20; gone before the click (17.70)
bubIn('#b1', 18.36, 19.47);                        // "hang on, it moved." 18.36–19.44
capIn('#c5a', 19.59, 21.76); capIn('#c5b', 20.37, 21.76);   // "Trev." 19.59 · "That's what we pay." 20.37–21.52
capIn('#c6a', 21.87, 26.58); capIn('#c6b', 25.47, 26.58);   // "Seventy-four hundred plus GST is eighty-five ten." 21.87 · "Never the cheapest." 25.47
capIn('#c7', 28.38, 30.05);                        // "Open one, see what it covers." 28.38–30.08

// dialog steps: drop (0.5 s) → reading, sped up (0.45 s) → the draft beside the original → tick on "checked" → added on "it."
K.add('#st-drop', 'opacity', [[8.36, 1], [8.42, 0]]);
K.add('#st-work', 'opacity', [[0, 0], [8.40, 0], [8.46, 1], [8.81, 1], [8.90, 0]]);
K.add('#st-rev', 'opacity', [[0, 0], [8.84, 0], [8.98, 1, 'out']]);
K.add('#dsc1', 'opacity', [[8.84, 1], [8.86, 0]]); K.add('#dsc2', 'opacity', [[0, 0], [8.84, 0], [8.86, 1]]);
K.add('#spin', 'rotate', [[8.40, 0], [8.90, 420]]);
K.add('#sped', 'opacity', [[0, 0], [8.40, 0], [8.46, 1], [8.81, 1], [8.90, 0]]);
K.add('#zonehot', 'opacity', [[0, 0], [8.02, 0], [8.13, 1], [8.34, 1], [8.42, 0]]);
K.add('#file', 'opacity', [[0, 0], [7.61, 0], [7.71, 1], [8.28, 1], [8.40, 0]]).add('#file', 'scale', [[8.26, 1], [8.40, 0.8, 'in']]);
const TICK = 10.24, SAVE = 10.50;                  // "checked" 9.96–10.24 · "it." 10.29–10.56
K.add('#chk1on', 'opacity', [[0, 0], [TICK + 0.03, 0], [TICK + 0.07, 1]]);
K.add('#save', 'scale', [[SAVE - 0.02, 1], [SAVE + 0.04, 0.95], [SAVE + 0.14, 1, 'out']]);
K.add('#dlg', 'opacity', [[10.56, 1], [10.68, 0, 'in']]).add('#dlg', 'scale', [[10.56, 1], [10.68, 0.97, 'in']]);
K.add('#scrim', 'opacity', [[10.56, 1], [10.72, 0, 'in']]);
K.add('#flash', 'opacity', [[0, 0], [10.68, 0], [10.82, 1, 'out'], [11.72, 0, 'in']]);
// the flip: click on "it" (17.70); the "Lowest" tag hops from Steamline to Trev (rows stay put) under "and, hang on"
const FLIP = 17.70, HOP = 17.75, HOPD = 0.25;
K.add('#maskr', 'opacity', [[0, 0], [14.34, 0], [14.74, 1, 'out'], [19.47, 1], [19.90, 0, 'in']]);
// rings (marker loops), each on its word
const ring = (id, t0, t1, tOut) => { K.add('#' + id + '-p', 'trim', [[t0, 0], [t1, 1, 'out']]); K.add('#' + id, 'opacity', [[0, 1], [tOut, 1], [tOut + 0.16, 0]]); };
ring('rg-bold', 12.38, 12.73, 14.39);              // "wrote" (12.77)
ring('rg-calc', 13.49, 13.75, 14.39);              // "maths" (13.76)
ring('rg-lows', 16.17, 16.47, 17.19);              // "Steamline's lowest" (16.14–17.20)
ring('rg-lowt', 19.98, 20.37, 21.74);              // "Trev." (19.59–20.24), as the camera pulls back
ring('rg-pu', 24.23, 24.54, 26.68);                // "eighty-five ten" (24.19–25.44)
ring('rg-tot', 29.63, 29.94, 30.22);               // "covers" (29.58–30.08)
// the bench props under the window light up when their bid is on screen (PDF = Steamline, note = Trev, phone = Puddlestone)
K.add('#bp-pdf', 'var:--b', [[0, 0.5], [7.61, 0.5], [7.84, 0.95], [8.48, 0.95], [8.64, 0.5], [10.63, 0.5], [10.78, 1], [11.61, 1], [12.05, 0.5]]);
K.add('#bp-note', 'var:--b', [[0, 0.5], [17.95, 0.5], [18.10, 1], [21.56, 1], [21.83, 0.5]]);
K.add('#bp-phone', 'var:--b', [[0, 0.5], [21.83, 0.5], [21.95, 1], [26.68, 1]]);

/* ---- S5 the callback: the phone on the bench while "I'd have picked that one." (26.76–27.60) ---- */
const CB0 = 26.65, CB1 = 28.35;                    // "cheapest." ends 26.48 → [amused] beat → "Open" 28.38
K.scene('#s5', CB0, CB1);
K.add('#s5', 'blur', [[CB0, 14], [CB0 + 0.1, 0, 'out']]);
K.add('#s5z', 'scale', [[CB0, 1.0], [CB1, 1.05, 'linear']]);
K.add('#cbmk-p', 'trim', [[CB0, 0.35], [CB0 + 0.22, 1, 'out']]);
K.add('#cb-arrow-p', 'trim', [[26.76, 0], [26.92, 1, 'out']]);
K.add('#cb-scrib', 'clipX', [[26.86, 0], [27.18, 1, 'out']]);
bubIn('#b2', 26.95, 28.24);

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
  [S3_IN, 'dlg', DLG_S], [9.00, 'dlg', DLG_S], [9.25, 'form', FORM_S, 'inOut'],   // the draft beside the original, then the notice ("once I've checked it." 9.50)
  [10.54, 'form', FORM_S], [10.80, 'tbl', 'tbl', 'inOut'], [11.61, 'tbl', 'tbl'], [12.07, 'num', 'num', 'inOut'],   // "One table:" 10.74 → bold/grey 12.19
  [14.30, 'num', 'num'], [14.76, 'flip', 'flip', 'inOut'], [19.47, 'flip', 'flip'], [19.93, 'tbl', 'tbl', 'inOut'],   // "Excluding GST" 14.78 … pull back on "Trev." 19.59
  [21.56, 'tbl', 'tbl'], [21.87, 'num', 'num', 'inOut'], [CB0, 'num', 'num2', 'linear'],                              // "Seventy-four hundred plus GST" 21.87
  [CB0 + 0.05, 'tbl', 'tbl'], [28.66, 'tbl', 'tbl'], [28.97, 'det', DET_S, 'swipe'], [29.15, 'det', DET_S], [29.57, 'detTot', 2.3, 'inOut'], [S3_OUT + 0.1, 'detTot', 2.33],   // "Open one" 28.38 → "covers" 29.58
];
const FOLD0 = 29.19, FOLD1 = 29.54;   // Type / Qty / Rate fold away as the camera pushes in
/* form pane scroll (inside the dialog): the notice → the tick */
const SCROLL = [[9.74, 0], [10.09, 'B', 'scroll']];
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
const SEL = 28.69;                   // click Steamline's row on "one," (28.86)
const PKEYS = [
  [7.64, 'fileStart'], [8.28, 'zone', 'inOut'], [8.38, 'zone'],
  [9.90, 'chkA'], [TICK - 0.02, 'chk', 'inOut'], [TICK + 0.08, 'chk'], [SAVE - 0.02, 'save', 'inOut'], [10.60, 'save'],
  [17.00, 'rgA'], [FLIP - 0.06, 'rgIn', 'inOut'], [18.00, 'rgIn'],
  [28.35, 'stRowA'], [SEL - 0.03, 'stRow', 'inOut'], [29.08, 'stRow'],
];
const PTR_ON = [[7.64, 8.42], [9.90, 10.62], [17.00, 18.20], [28.35, 29.03]];
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
  const ef = t > 10.83 && t < S3_OUT + 0.2 ? clamp((s - 1.8) / 0.3, 0, 1) : 0;
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

/* ---- S4 end card on the words: "QSME doesn't pick the winner." 30.20 · the sign-up page rises 31.0 · "It stops GST
   picking it for you." 32.21 · logo + "Sign up at qsme.co.nz" pops on "Sign" (34.51), pulses on "koh" (36.32, said
   "dot koh", never C-O) and "zed" (37.52) ---- */
const E0 = 30.15;
K.scene('#s4', E0, DUR + 1);
K.add('#s4', 'opacity', [[E0, 0], [E0 + 0.14, 1, 'out']]);
K.pop('#tl1', 30.20, { dy: 26 });
K.pop('#tl2', 32.21, { dy: 30 });
K.add('#live', 'opacity', [[0, 0], [30.98, 0], [31.12, 1, 'out']]).add('#live', 'y', [[30.98, 60], [31.24, 0, 'out']]);
K.add('#live', 'scale', [[31.24, 1], [DUR, 1.025, 'linear']]);
K.pop('#livechip', 31.20, { dy: 10 });
K.add('#rg-hire-p', 'trim', [[31.32, 0], [31.64, 1, 'out']]);
K.pop('#endrow', 34.51, { dy: 24 });
K.add('#pill', 'scale', [[34.60, 1], [34.72, 1.08, 'out'], [34.90, 1, 'in'], [36.32, 1], [36.44, 1.07, 'out'], [36.64, 1, 'in'], [37.52, 1], [37.64, 1.07, 'out'], [37.84, 1, 'in']]);

K.ready({ duration: DUR, fonts: ['800 60px Manrope', '700 20px Manrope', '600 20px Manrope', '500 20px Manrope', '400 40px Kalam', '700 40px Kalam', '400 40px "Permanent Marker"', '400 20px Inter', '500 20px Inter', '600 20px Inter', '700 20px Inter', '500 20px "JetBrains Mono"', '700 20px "JetBrains Mono"'] });
})();
