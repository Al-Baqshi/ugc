/* "Which one's cheapest?" — QSME NZ (week 3, Tue 20 Oct 2026). One timeline, two cuts.
   apples-oranges-pineapple.html      → body.nz.r9x16 (Reels/TikTok/Shorts, safe box 65,300,1015,1250)
   apples-oranges-pineapple-4x5.html  → body.nz.r4x5  (Facebook feed, safe box 60,60,1020,1290)
   Timings are identical in both, so vo-script.json fits both MP4s.

   The product screens are an ILLUSTRATIVE recreation of signed-in screens (Bid review → Compare bids, Add a bid
   you received, Detailed price breakdown), built from the wording, layout, theme tokens and GST arithmetic on
   origin/main (bid-compare-table.tsx, received-bid-dialog.tsx, bid-detail-content.tsx, gst-basis.ts,
   locales/en/tenders.json). Fictional bidders; labelled "Demo bids" + "Illustrative — swap for real QSME screen". */
(function () {
'use strict';
const R9 = document.body.classList.contains('r9x16');
const H = R9 ? 1920 : 1350, SY = R9 ? 300 : 200;
const DUR = 35.2;

/* ---------- GST maths + money format, ported from the app ---------- */
const cents = v => Math.round(v * 100) / 100;
function gstView(a, basis, rate) {
  const r = (rate == null ? 15 : rate) / 100;
  if (basis === 'exclusive') { const ex = cents(a), inc = cents(a * (1 + r)); return { ex, gst: cents(inc - ex), inc }; }
  if (basis === 'inclusive') { const inc = cents(a), ex = cents(a / (1 + r)); return { ex, gst: cents(inc - ex), inc }; }
  return { ex: cents(a), gst: 0, inc: cents(a) };                       // no_gst
}
function money(v) {
  const whole = Math.round(v * 100) % 100 === 0;
  return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }).format(v);
}

/* ---------- demo data (fictional; names checked against the NZ Companies Register 2026-10-03: no matches) ---------- */
const BIDS = {
  st: { name: 'Steamline Bathrooms Ltd', person: 'Steamline Bathrooms', basis: 'inclusive', amount: 8298, days: 5 },
  pu: { name: 'Puddlestone Plumbing', person: 'Mitch', basis: 'exclusive', amount: 7400, days: 7 },
  tr: { name: 'Trev (tiler)', person: 'Trev (tiler)', basis: 'no_gst', amount: 7900, days: 6 },
};
const ST_LINES = [   // Steamline's PDF: line prices include GST, they add up to the total
  ['Strip-out &amp; disposal', 'labor', 1, 690], ['Waterproofing', 'labor', 1, 1380], ['Wall &amp; floor tiling', 'labor', 17, 115],
  ['Tiles, adhesive &amp; grout', 'material', 1, 1438], ['Fit-off: vanity, WC &amp; shower', 'labor', 1, 2835]];
const V = {}; for (const k in BIDS) V[k] = gstView(BIDS[k].amount, BIDS[k].basis);
const orderOn = side => Object.keys(BIDS).sort((a, b) => V[a][side] - V[b][side]);
const ORDER_EX = orderOn('ex'), ORDER_IN = orderOn('inc');
if (ORDER_EX.join() !== 'st,pu,tr' || ORDER_IN.join() !== 'tr,st,pu') throw new Error('demo figures no longer tell the story: ' + ORDER_EX + ' / ' + ORDER_IN);
if (ST_LINES.reduce((s, l) => s + l[2] * l[3], 0) !== BIDS.st.amount) throw new Error('Steamline lines do not add up');

/* ---------- icons (lucide shapes, as the app uses) ---------- */
const ic = (d, cls, extra) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}>${d}</svg>`;
const MAIL = ic('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', '', 'style="width:12px;height:12px"');
const CHECKC = ic('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', '', 'style="color:var(--primary)"');
const BACK = ic('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>');
const UPLOAD = ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>', '', 'style="width:24px;height:24px;color:var(--primary)"');
const ALERT = ic('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>', '', 'style="color:var(--primary);margin-top:2px"');
const FILE = ic('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>', '', 'style="color:var(--muted-foreground)"');
const EXT = ic('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', '', 'style="width:14px;height:14px"');
const UPLUS = ic('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>', '', 'style="color:var(--muted-foreground);margin-top:1px"');
const CHECK = ic('<path d="M20 6 9 17l-5-5"/>');
const CHECKW = ic('<path d="M20 6 9 17l-5-5"/>', '', 'style="width:13px;height:13px;color:#fff" stroke-width="3"');
const XX = ic('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const CHEV = ic('<path d="m6 9 6 6 6-6"/>', '', 'style="color:var(--muted-foreground)"');
const PANEL = ic('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>', '', 'style="width:18px;height:18px;color:var(--muted-foreground)"');
const PLUS = ic('<path d="M5 12h14"/><path d="M12 5v14"/>', '', 'style="width:14px;height:14px"');
const SPIN = `<svg class="spin" id="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color:var(--primary)"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
const PTR = `<svg viewBox="0 0 24 34"><path d="M2 2 L2 27 L8.3 21.2 L12.8 31 L17 29.2 L12.6 19.6 L21 19.6 Z" fill="#111" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;

/* ---------- props ---------- */
function pdfHTML() {
  return `<div class="hd"><div class="brand">Steamline Bathrooms Ltd<small>Bathroom renovations · Waikato</small></div><div class="q">QUOTE<small>No. 1182 · 9 Oct 2026</small></div></div>
    <div class="for">Main bathroom: retile &amp; fit-off<small>Prepared for: Mel</small></div>
    <ul>${ST_LINES.map(l => `<li style="display:flex;justify-content:space-between"><span>${l[0]}${l[2] > 1 ? ` (${l[2]} m²)` : ''}</span><span>${money(l[2] * l[3])}.00</span></li>`).join('')}</ul>
    <div class="tot"><span>Total incl. GST</span><b>$8,298.00</b></div>
    <div class="ft">All prices include GST. Price valid 30 days.</div>`;
}
function phoneHTML(withMark) {
  return `<div class="scr"><div class="bar"><div class="avatar">M</div><b>Mitch (Puddlestone)</b></div>
    <div class="msgs"><div class="when">Sun 7:41 pm</div><div class="out">Hey Mitch, how'd you get on with the bathroom price?</div>
    <div class="in" ${withMark ? 'id="bubble"' : ''}>7400 + gst mate</div><div class="in2">can start in 3 wks</div></div></div>`;
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
function ringSVG(id, w, h, pad, color, sw, seed) {
  return `<svg class="ring" id="${id}" width="${w + pad * 2}" height="${h + pad * 2}" viewBox="0 0 ${w + pad * 2} ${h + pad * 2}"><path id="${id}-p" d="${loopPath(w, h, pad, seed)}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/* ---------- the app: Bid review page + compare table + detail + dialog ---------- */
function fig(val, quoted, side) {
  return `<span class="fig ${quoted ? 'q' : 'c'} f-${side}"><span class="v">${money(val)}</span>${quoted ? '' : '<span class="calc">calc.</span>'}</span>`;
}
function rowHTML(k, i) {
  const b = BIDS[k], v = V[k];
  const qEx = b.basis === 'exclusive' || b.basis === 'no_gst', qIn = b.basis === 'inclusive' || b.basis === 'no_gst';
  return `<div class="row tr" id="row-${k}" style="top:${i * 70}px">
    <div><div class="nm"><span class="selic" id="sel-${k}">${CHECKC}</span><span class="nmt" id="nm-${k}">${b.name}</span></div>
      <div class="tags" id="tags-${k}"><span class="badge low" id="low-${k}">Lowest</span><span class="badge outline">${MAIL}Received by you</span>${b.basis === 'no_gst' ? '<span class="badge outline">No GST</span>' : ''}</div></div>
    <div class="r" id="ex-${k}">${fig(v.ex, qEx, 'ex')}</div>
    <div class="r gst">${v.gst ? money(v.gst) : '—'}</div>
    <div class="r" id="in-${k}">${fig(v.inc, qIn, 'in')}</div>
    <div>${b.days} days</div>
    <div><span class="badge info">submitted</span></div>
    ${k === 'st' ? '<div id="flash" style="position:absolute;inset:0;padding:0;background:color-mix(in oklab, var(--primary) 16%, transparent)"></div>' : ''}
  </div>`;
}
function detailHTML(k) {
  const b = BIDS[k], v = V[k], incl = b.basis === 'inclusive';
  const basisText = incl ? 'including GST' : b.basis === 'no_gst' ? 'no GST — not registered' : 'plus GST';
  const other = v.gst ? `<p style="margin-top:4px;font-size:12px;line-height:16px" class="muted tnum">${incl ? 'Excl. GST' : 'Incl. GST'}: ${money(incl ? v.ex : v.inc)} · GST ${money(v.gst)}<span style="margin-left:4px">(calculated)</span></p>` : '';
  const lines = k === 'st' ? `<div class="bd" id="bd-${k}"><div class="lbl">Detailed price breakdown</div><div class="tt green">Total: ${money(b.amount)}</div>
      <div class="bdt" id="bdt-${k}"><div class="h"><div>Item</div><div>Type</div><div class="rt">Qty</div><div class="rt">Rate</div><div class="rt">Total</div></div>
      ${ST_LINES.map(l => `<div class="l"><div class="it">${l[0]}</div><div>${l[1]}</div><div class="rt tnum">${l[2]}</div><div class="rt tnum">${money(l[3])}</div><div class="rt green">${money(l[2] * l[3])}</div></div>`).join('')}
      <div class="l tot" id="bdtot-${k}"><div></div><div></div><div></div><div class="rt" style="font-weight:600">Total</div><div class="rt green" style="font-weight:700">${money(b.amount)}</div></div></div></div>` : '';
  return `<div class="card det" id="det-${k}">
    <div class="det-hd"><div><h3>${b.person}</h3><p class="muted" style="font-size:14px">Tender owner review console with award / reject actions.</p></div>
      <dl class="gbox"><dt>Excl. GST</dt><dd class="${incl ? 'sm' : 'big'}">${money(v.ex)}</dd><dt>Incl. GST</dt><dd class="${incl ? 'big' : 'sm'}">${money(v.inc)}</dd></dl></div>
    <div class="det-body">
      <div class="grid2">
        <div class="box"><div class="lbl">Bidder</div><p style="margin-top:4px">${b.person}</p><div style="margin-top:8px"><span class="badge outline" style="font-size:12px">${MAIL}Quote you received · not on QSME</span></div></div>
        <div class="box"><div class="lbl">Bid amount</div><p class="green" style="margin-top:4px;font-size:18px;line-height:28px">${money(b.amount)}</p><p class="muted" style="font-size:12px;line-height:16px">${basisText}</p>${other}</div>
        <div class="box"><div class="lbl">Status</div><div style="margin-top:6px"><span class="badge info">submitted</span></div></div>
        <div class="box"><div class="lbl">Submitted</div><p style="margin-top:4px">11/10/2026, 8:0${b.days}:00 pm</p></div>
        <div class="box"><div class="lbl">Proposed timeline</div><p style="margin-top:4px">${b.days} days</p></div>
        <div class="box"><div class="lbl">Proposed dates</div><p style="margin-top:4px">—</p></div>
      </div>${lines}
    </div></div>`;
}
const fld = (label, val, extra) => `<div class="fld"><label>${label}</label><div class="inp ${val ? '' : 'empty'}" ${extra || ''}>${val || ''}</div></div>`;
function lineForm(l) {
  return `<div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-top:8px">
    <div class="inp">${l[0]}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
      <div class="inp">${l[1] === 'labor' ? 'Labour' : 'Materials'}${CHEV}</div><div class="inp">${l[2]}</div>
      <div class="inp ${l[2] > 1 ? '' : 'empty'}">${l[2] > 1 ? 'm²' : 'Unit'}</div><div class="inp">${l[3]}</div>
      <div class="inp" style="grid-column:span 2;font-weight:600">${l[2] * l[3]}</div></div></div>`;
}
function dialogHTML() {
  const v = V.st;
  return `<div class="scrim" id="scrim"></div>
  <div class="dlg" id="dlg">
    <div class="dlg-hd"><h2>Add a bid you received</h2><p><span id="dsc1">Main bathroom</span><span id="dsc2" style="position:absolute;left:20px">Check every figure against the original, fix anything that is wrong, then confirm.</span></p><span class="x">${XX}</span></div>
    <div class="step" id="st-drop"><div class="drop-wrap" id="dropwrap">
      <p>Got a quote by email for “Main bathroom”? Drop it here and it goes in with the other bids.</p>
      <div class="zone" id="zone"><span class="ci">${UPLOAD}</span><b>Drop the email or quote here, or tap to choose</b><span>PDF, saved email (.eml), photo or text file — up to 20 MB</span></div>
      <ol class="how"><li>1. We file it in this project's documents and read it for you.</li><li>2. You check what we read against the original, side by side.</li><li>3. You confirm, and it sits with the other bids to compare and award.</li></ol>
      <div class="typeit">No file? Type the bid in instead</div></div></div>
    <div class="step" id="st-work"><div class="working">${SPIN}<b>Reading the quote…</b><span>This can take a minute for a scanned PDF. Keep this window open.</span></div></div>
    <div class="step" id="st-rev"><div class="rv">
      <div class="orig"><div class="ob"><span style="display:flex;align-items:center;gap:8px">${FILE}Steamline-quote.pdf</span><span class="btn outline">${EXT}Open</span></div>
        <div class="pv"><div class="pdf" style="position:absolute;left:50%;top:14px;transform:translateX(-50%) scale(0.98);transform-origin:50% 0;box-shadow:0 4px 18px rgba(0,0,0,.18)">${pdfHTML()}</div></div></div>
      <div class="form" id="form"><div class="fin" id="fin">
        <div class="notice" id="notice">${ALERT}<span>This was read automatically and can be wrong. Nothing is saved until you have checked it.</span></div>
        <section><h4>Who it is from</h4>${fld('Name *', 'Steamline Bathrooms')}${fld('Business', 'Steamline Bathrooms Ltd')}${fld('Email', '')}${fld('Phone', '')}
          <div class="newto">${UPLUS}<span>New to you. They will be saved to your contacts when you save — they don't need a QSME account.</span></div></section>
        <section id="price"><h4>What they quoted</h4>${fld('Total price (NZD) *', '8298')}${fld('That price is *', 'Including GST' + CHEV)}
          <dl class="ro"><div><dt>Excl. GST</dt><dd class="c">${money(v.ex)}</dd><dd class="n">calculated</dd></div><div><dt>GST (15%)</dt><dd class="c">${money(v.gst)}</dd></div><div><dt>Incl. GST</dt><dd class="q">${money(v.inc)}</dd><dd class="n">as quoted</dd></div></dl>
          ${fld('How long (days)', '5')}${fld('Their quote number', '1182')}</section>
        <section><div style="display:flex;justify-content:space-between;align-items:center"><h4>Price breakdown</h4><span class="btn outline" style="height:32px;font-size:13px;border-width:1px">${PLUS}Add a line</span></div>
          ${ST_LINES.map(lineForm).join('')}
          <div style="border:2px solid var(--border);border-radius:12px;padding:10px 12px;margin-top:8px;font-size:13.5px">
            <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-weight:600">Line prices are</b><span class="inp" style="height:32px;min-width:150px">Including GST${CHEV}</span></div>
            <div style="display:flex;justify-content:space-between;margin-top:8px"><b style="font-weight:600">Lines add up to</b><b class="tnum">${money(8298)}</b></div></div></section>
        <div><div class="fld"><label>Conditions and exclusions</label><div class="ta">Price valid 30 days.</div></div></div>
        <div class="confirm" id="confirm">
          <div class="chk"><span class="box16" id="chk1"><span class="on" id="chk1on">${CHECKW}</span></span><span style="font-weight:600">I have checked this against the original and it is right.</span></div>
          <div class="chk off"><span class="box16"></span><span><span style="display:flex;align-items:center;gap:6px;font-weight:600">${MAIL}Email them that their quote is recorded</span><span class="muted" style="font-size:12px">Add their email address to send this.</span></span></div></div>
        <div class="acts"><span class="btn outline">Cancel</span><span class="btn solid" id="save">${CHECK}Add to the bids</span></div>
        <p class="kept">The original stays in this project's documents, in a folder for this bidder.</p>
      </div></div></div></div>
  </div>`;
}
function appHTML() {
  return `<div class="app" id="app">
    <div class="topbar">${PANEL}<div class="avatar">M</div></div>
    <div class="page">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div><div class="back">${BACK}Back to the tender</div><h1>Bid review</h1><p class="muted">Main bathroom · Hamilton bathroom reno</p></div>
        <div style="padding-top:48px"><span class="badge info">submitted</span></div></div>
      <div class="card" id="cmpcard" style="margin-top:16px">
        <div class="cmp-hd"><div><h3>Compare bids</h3><p class="muted" style="margin-top:4px">Tap a bid to open it below.</p></div><span class="btn outline">${MAIL.replace('width:12px;height:12px', 'width:16px;height:16px')}Add a bid you received</span></div>
        <div class="cmp-body">
          <div class="on"><span class="muted" style="font-weight:500">Compare on</span><div class="rg" id="rg"><div id="rg-ex">Excl. GST</div><div id="rg-in">Incl. GST</div></div></div>
          <div class="tbl" id="tbl">
            <div class="tr th"><div>Bidder</div><div class="r" id="h-ex">Excl. GST</div><div class="r">GST</div><div class="r" id="h-in">Incl. GST</div><div>Duration</div><div>Status</div></div>
            <div class="rows" id="rows">${ORDER_EX.map(rowHTML).join('')}
              <div style="position:absolute;left:0;right:0;top:69px;height:2px;background:var(--border);z-index:3"></div>
              <div style="position:absolute;left:0;right:0;top:139px;height:2px;background:var(--border);z-index:3"></div></div>
          </div>
          <p class="foot">Figures marked “calc.” are worked out at 15% GST so bids can be compared. The bidder's own figure is the one in bold.</p>
        </div></div>
      <div style="position:relative;height:900px" id="detwrap">
        <div style="position:absolute;left:0;right:0;top:0" id="dw-pu">${detailHTML('pu')}</div>
        <div style="position:absolute;left:0;right:0;top:0" id="dw-st">${detailHTML('st')}</div>
      </div>
    </div>
    ${dialogHTML()}
    <div class="sped" id="sped">Sped up</div>
    <div class="file" id="file">${FILE}Steamline-quote.pdf</div>
    <div class="zone-hot" id="zonehot"></div>
    ${ringSVG('rg-bold', 70, 22, 16, '#15803D', 3.4, 1)}
    ${ringSVG('rg-calc', 112, 22, 14, '#E0302A', 3.4, 2)}
    ${ringSVG('rg-lows', 54, 22, 13, '#15803D', 3.2, 3)}
    ${ringSVG('rg-lowt', 54, 22, 13, '#15803D', 3.2, 4)}
    ${ringSVG('rg-pu', 112, 22, 14, '#E0302A', 3.4, 5)}
    ${ringSVG('rg-tot', 96, 24, 14, '#15803D', 3, 6)}
    <div class="ptr" id="ptr">${PTR}</div>
    <div id="click" style="position:absolute;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;border:3px solid rgba(21,128,61,.85);z-index:21"></div>
  </div>`;
}

/* ---------- markup ---------- */
const CUP_SVG = `<svg viewBox="0 0 230 262"><defs><linearGradient id="cg" x1="0" x2="1"><stop offset="0" stop-color="#8E1C18"/><stop offset=".33" stop-color="#E24A40"/><stop offset=".62" stop-color="#C9302C"/><stop offset="1" stop-color="#7A1613"/></linearGradient></defs>
  <path d="M44 8 Q115 0 186 8 L218 228 L12 228 Z" fill="url(#cg)"/><path d="M8 226 L222 226 L227 250 Q115 262 3 250 Z" fill="#A52320"/>
  <path d="M47 28 Q115 21 183 28" stroke="rgba(255,255,255,.2)" stroke-width="3" fill="none"/><path d="M50 48 Q115 41 180 48" stroke="rgba(0,0,0,.2)" stroke-width="3" fill="none"/>
  <path d="M66 22 L46 212" stroke="rgba(255,255,255,.22)" stroke-width="11" stroke-linecap="round"/></svg>`;
const cup = (id, amt, sub) => `<div class="cupw abs" id="cw-${id}"><div class="cup" id="cup-${id}">${CUP_SVG}<div class="lab"><b>${amt}</b><i>${sub}</i></div></div></div>`;
const GRAIN = `<svg class="grain" preserveAspectRatio="none" viewBox="0 0 1080 ${H}"><filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.0032 0.12" numOctaves="3" seed="11"/><feColorMatrix type="matrix" values="0 0 0 0 0.20  0 0 0 0 0.10  0 0 0 0 0.03  1.25 0 0 0 -0.42"/></filter><rect width="1080" height="${H}" filter="url(#gr)"/></svg>`;

document.getElementById('root').innerHTML = `
  <!-- S1 HOOK: Sunday night, the kitchen bench, three quotes in three formats -->
  <div id="s1" class="fill"><div id="s1z" class="fill">
    <div class="bench">${GRAIN}<div class="vig"></div></div>
    <div class="stage">
      <div class="prop pdf abs" id="p-pdf" style="left:-6px;top:318px">${pdfHTML()}</div>
      <div class="prop phone abs" id="p-phone" style="left:596px;top:300px">${phoneHTML(true)}
        <svg class="mark" id="mk7400" style="left:6px;top:316px" width="290" height="96" viewBox="0 0 290 96"><path id="mk7400p" d="${loopPath(250, 60, 18, 7)}" fill="none" stroke="#E0302A" stroke-width="7" stroke-linecap="round"/></svg></div>
      <div class="prop note abs" id="p-note" style="left:262px;top:672px">${noteHTML()}</div>
      <div class="qmark" id="qm" style="left:878px;top:470px">?</div>
      <div class="chip abs" id="h-chip" style="left:0;top:0">Sunday night · Hamilton · demo quotes</div>
      <div class="abs display" id="h-l1" style="left:0;right:0;top:54px;text-align:center;font-size:66px;color:#F8FAFC;text-shadow:0 4px 18px rgba(0,0,0,.6)">3 quotes. Same bathroom.</div>
      <div class="cap him" id="h-l2" style="top:142px;font-size:82px"><span>Which one's cheapest?</span></div>
      <div class="cap" id="h-trick" style="top:868px;font-size:60px"><span>…Trick question.</span></div>
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
      <div class="tag" id="tag2" style="top:868px">cheapest Excl. GST</div>
      <div class="tag" id="tag3" style="top:868px">cheapest Incl. GST</div>
      <div class="cap" id="sh-cap" style="top:40px"><span>Depends how you read them.</span></div>
    </div></div></div>

  <!-- S3 THE APP (illustrative recreation of signed-in screens; demo bids) -->
  <div id="s3" class="fill">
    <div class="fill" style="background:radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255, 200, 140, .16), rgba(2,6,23,0) 70%), #020617"></div>
    <div class="appbench" style="top:${SY + 930}px"><div class="bench">${GRAIN.replace('id="gr"', 'id="gr2"').replace('url(#gr)', 'url(#gr2)')}<div class="vig"></div></div>
      <div data-qa-ignore style="position:absolute;inset:0;filter:brightness(.5) saturate(.85)">
        <div class="prop pdf abs" style="left:40px;top:70px;transform:rotate(-8deg) scale(.82);transform-origin:0 0">${pdfHTML()}</div>
        <div class="prop phone abs" style="left:700px;top:40px;transform:rotate(7deg) scale(.82);transform-origin:0 0">${phoneHTML(false)}</div>
        <div class="prop note abs" style="left:330px;top:250px;transform:rotate(-3deg) scale(.82);transform-origin:0 0">${noteHTML()}</div></div></div>
    <div class="stage">
      <div class="win" id="win"><div class="chrome"><div class="dots"><i></i><i></i><i></i></div><span class="demo">Demo bids</span><span class="illustrative">Illustrative — swap for real QSME screen (demo data)</span></div>
        <div class="vp" id="vp" data-qa-ignore><div id="cam">${appHTML()}</div></div></div>
      <div class="cap" id="c1" style="top:22px"><span>The emailed one goes in too.</span></div>
      <div class="cap" id="c2" style="top:22px"><span>After I've checked it.</span></div>
      <div class="cap" id="c3a" style="top:22px"><span><b style="font-weight:800">Bold</b> = what they wrote.</span></div>
      <div class="cap" id="c3b" style="top:104px"><span><span class="g">“calc.”</span> = worked out at 15%.</span></div>
      <div class="cap" id="c4" style="top:22px"><span>Excl. GST: Steamline's lowest.</span></div>
      <div class="bub tr" id="b1" style="left:50%;top:30px;transform-origin:80% 100%"><small>Him</small>Hang on. It moved.</div>
      <div class="cap" id="c5a" style="top:22px"><span>Incl. GST: Trev's lowest.</span></div>
      <div class="cap" id="c5b" style="top:104px"><span>We pay incl. GST.</span></div>
      <div class="cap" id="c6a" style="top:22px"><span>$7,400 + GST = $8,510.</span></div>
      <div class="cap" id="c6b" style="top:104px"><span><span class="r">Never the cheapest.</span></span></div>
      <div class="bub tr" id="b2" style="left:50%;top:30px;transform-origin:80% 100%"><small>Him</small>I'd have picked that one.</div>
      <div class="cap" id="c7" style="top:22px"><span>Each one opens to its own lines.</span></div>
    </div>
  </div>

  <!-- S4 END CARD -->
  <div id="s4" class="fill">
    <div class="endbg"></div>
    <div class="stage">
      <div class="tagline" id="tl1" style="top:0;font-size:72px;line-height:1.06">QSME doesn't pick the&nbsp;winner.</div>
      <div class="tagline" id="tl2" style="top:166px;font-size:72px;line-height:1.06">It stops <span class="accent">GST</span> picking it for&nbsp;you.</div>
      <div class="live" id="live" style="left:155px;top:352px;width:640px;height:425px"><img src="clips/pricing-owners.png" alt="" style="width:${1290 * 640 / 1194}px;left:${-48 * 640 / 1194}px;top:${-768 * 640 / 1194}px">
        ${ringSVG('rg-free', 568, 34, 12, '#3DC023', 4, 8).replace('class="ring"', 'class="ring" style="left:' + (123 * 640 / 1194 - 14).toFixed(1) + 'px;top:' + ((1242 - 768) * 640 / 1194 - 12).toFixed(1) + 'px"')}</div>
      <div class="chip abs" id="livechip" style="left:155px;top:792px">qsme.co.nz/pricing · live site</div>
      <div class="abs" id="endrow" style="left:0;right:0;top:850px;display:flex;align-items:center;justify-content:center;gap:28px">
        <div class="logo" style="position:relative;width:203px;height:66px"><img src="qsme-logo.svg" alt="QSME" style="width:${(1509 * 66 / 387).toFixed(1)}px;left:${(-192 * 66 / 387).toFixed(1)}px;top:${(-164 * 66 / 387).toFixed(1)}px"></div>
        <div style="font:800 44px/1 var(--display);letter-spacing:-0.02em;color:var(--ink);white-space:nowrap">Free to join.</div>
        <div class="pill" id="pill">qsme.co.nz</div>
      </div>
    </div>
  </div>
`;

/* =====================================================================================================
   TIMELINE (seconds). Hook 0–2.95 · shuffle 2.95–6.85 · add a bid 6.85–11.6 · bold/calc 11.6–15.4 ·
   flip 15.4–22.4 · never the cheapest 22.4–26.6 · breakdown 26.6–28.9 · end card 28.9–35.2
   ===================================================================================================== */
const K = Kit;

/* ---- S1 hook ---- */
K.scene('#s1', 0, 2.99);
K.add('#s1z', 'scale', [[0, 1.0], [2.95, 1.035, 'out']]);
K.add('#p-pdf', 'rotate', [[0, -6]]).add('#p-pdf', 'scale', [[0, 1.05], [0.12, 1, 'slam']]);
K.add('#p-phone', 'opacity', [[0.18, 0], [0.22, 1]]).add('#p-phone', 'rotate', [[0.18, 13], [0.32, 6, 'slam']]).add('#p-phone', 'scale', [[0.18, 1.2], [0.32, 1, 'slam']]);
K.add('#p-note', 'opacity', [[0.38, 0], [0.42, 1]]).add('#p-note', 'rotate', [[0.38, -10], [0.52, -3, 'slam']]).add('#p-note', 'scale', [[0.38, 1.2], [0.52, 1, 'slam']]);
K.slam('#h-l2', 0.08, { from: 1.25 });
K.add('#mk7400p', 'trim', [[0.95, 0], [1.3, 1, 'out']]);
K.add('#qm', 'opacity', [[1.32, 0], [1.36, 1]]).add('#qm', 'scale', [[1.32, 1.6], [1.46, 1, 'slam']]).add('#qm', 'rotate', [[1.32, -18], [1.46, 10, 'out']]);
K.pop('#h-trick', 1.9, { dy: 24 });
K.add('#s1', 'x', [[2.83, 0], [2.97, -460, 'in']]).add('#s1', 'blur', [[2.83, 0], [2.97, 22, 'in']]);

/* ---- S2 the shuffle ---- */
K.scene('#s2', 2.93, 6.97);
K.add('#s2', 'x', [[2.93, 420], [3.08, 0, 'out']]).add('#s2', 'blur', [[2.93, 22], [3.08, 0, 'out']]);
K.add('#s2z', 'scale', [[2.93, 1.0], [6.85, 1.03, 'linear']]);
const SLOT = [55, 360, 665];             // cup left edges (stage px) for slots 0,1,2 (ball sits under slot 1)
const CUPTOP = 546;
['a', 'b', 'c'].forEach((id, i) => { const n = document.getElementById('cw-' + id); n.style.left = SLOT[i] + 'px'; n.style.top = CUPTOP + 'px'; });
// drop in
[['a', 3.0], ['b', 3.05], ['c', 3.1]].forEach(([id, t]) => {
  K.add('#cup-' + id, 'y', [[t, -560], [t + 0.16, 0, 'slam']]);
  K.add('#cup-' + id, 'scaleY', [[t + 0.16, 0.9], [t + 0.26, 1, 'out']]);
});
// lifts (inner cup y): b at 3.32, a at 4.52, c at 5.66 — all over the middle slot
const lift = (id, up, down) => { K.add('#cup-' + id, 'y', [[up, 0], [up + 0.18, -200, 'out']].concat(down ? [[down, -200], [down + 0.14, 0, 'in']] : [])); };
lift('b', 3.32, 3.84); lift('a', 4.52, 5.02); lift('c', 5.66, null);
// shuffles (outer x, with an arc): a<->b 4.02–4.40, a<->c 5.18–5.56
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
K.pop('#tag1', 3.42, { dy: 16 }).out('#tag1', 3.84, 0.12);
K.pop('#tag2', 4.62, { dy: 16 }).out('#tag2', 5.0, 0.12);
K.pop('#tag3', 5.76, { dy: 16 });
K.pop('#sh-cap', 3.36, { dy: 24 });
K.add('#s2', 'opacity', [[6.8, 1], [6.95, 0, 'in']]);
K.add('#s2z', 'x', [[6.8, 0], [6.95, -360, 'in']]);

/* ---- S3 the app ---- */
K.add('#s3', 'opacity', [[6.84, 0], [6.86, 1], [28.86, 1], [28.98, 0, 'in']]);
K.add('#win', 'x', [[6.84, 420], [7.02, 0, 'out'], [28.82, 0], [28.98, -460, 'in']]);
K.add('#win', 'blur', [[6.84, 18], [7.02, 0, 'out'], [28.82, 0], [28.98, 18, 'in']]);

// captions (Mel = white, him = green bubbles)
const capIn = (id, t0, t1) => { K.pop(id, t0, { dy: 22 }); K.out(id, t1, 0.14); };
capIn('#c1', 7.06, 9.34); capIn('#c2', 9.5, 11.42);
capIn('#c3a', 12.1, 15.3); capIn('#c3b', 13.62, 15.3);
capIn('#c4', 15.5, 17.7);
K.add('#b1', 'opacity', [[18.12, 0], [18.18, 1], [19.58, 1], [19.7, 0]]).add('#b1', 'scale', [[18.12, 0.6], [18.3, 1, 'outBack']]).add('#b1', 'x', [[0, -300]]);
capIn('#c5a', 19.72, 22.36); capIn('#c5b', 20.92, 22.36);
capIn('#c6a', 22.56, 25.22); capIn('#c6b', 23.62, 25.22);
K.add('#b2', 'opacity', [[25.3, 0], [25.36, 1], [26.5, 1], [26.62, 0]]).add('#b2', 'scale', [[25.3, 0.6], [25.48, 1, 'outBack']]).add('#b2', 'x', [[0, -360]]);
capIn('#c7', 26.7, 28.78);

// dialog steps
K.add('#st-drop', 'opacity', [[7.92, 1], [8.0, 0]]);
K.add('#st-work', 'opacity', [[0, 0], [7.98, 0], [8.04, 1], [8.52, 1], [8.6, 0]]);
K.add('#st-rev', 'opacity', [[0, 0], [8.55, 0], [8.66, 1, 'out']]);
K.add('#dsc1', 'opacity', [[8.55, 1], [8.56, 0]]); K.add('#dsc2', 'opacity', [[0, 0], [8.55, 0], [8.56, 1]]);
K.add('#spin', 'rotate', [[7.98, 0], [8.6, 400]]);
K.add('#sped', 'opacity', [[0, 0], [7.98, 0], [8.04, 1], [8.52, 1], [8.6, 0]]);
K.add('#zonehot', 'opacity', [[0, 0], [7.55, 0], [7.65, 1], [7.92, 1], [8.0, 0]]);
K.add('#file', 'opacity', [[0, 0], [7.08, 0], [7.14, 1], [7.82, 1], [7.94, 0]]).add('#file', 'scale', [[7.8, 1], [7.94, 0.8, 'in']]);
K.add('#chk1on', 'opacity', [[0, 0], [10.64, 0], [10.68, 1]]);
K.add('#save', 'scale', [[10.96, 1], [11.0, 0.95], [11.1, 1, 'out']]);
K.add('#dlg', 'opacity', [[11.08, 1], [11.22, 0, 'in']]).add('#dlg', 'scale', [[11.08, 1], [11.22, 0.97, 'in']]);
K.add('#scrim', 'opacity', [[11.08, 1], [11.26, 0, 'in']]);
K.add('#flash', 'opacity', [[0, 0], [11.22, 0], [11.36, 1, 'out'], [12.3, 0, 'in']]);
// table state switches at the flip (17.45): toggle, header, green column, rows re-sort, "Lowest" moves
const FLIP = 17.45;
K.add('#row-st', 'y', [[17.55, 0], [18.05, 70, 'inOut']]);
K.add('#row-pu', 'y', [[17.55, 0], [18.05, 70, 'inOut']]);
K.add('#row-tr', 'y', [[17.55, 0], [18.05, -140, 'inOut']]);
K.add('#low-tr', 'scale', [[18.05, 0.4], [18.25, 1, 'outBack']]);
// rings (marker loops)
const ring = (id, t0, t1, tOut) => { K.add('#' + id + '-p', 'trim', [[t0, 0], [t1, 1, 'out']]); K.add('#' + id, 'opacity', [[0, 1], [tOut, 1], [tOut + 0.16, 0]]); };
ring('rg-bold', 12.38, 12.66, 14.86); ring('rg-calc', 13.74, 14.02, 14.86);
ring('rg-lows', 15.7, 15.96, 17.36); ring('rg-lowt', 19.8, 20.06, 22.3);
ring('rg-pu', 22.96, 23.3, 26.1); ring('rg-tot', 28.1, 28.36, 30);

/* ---- measured geometry (cam coords) for the camera, pointer and rings: read once, after fonts load ---- */
const VPW = 950, VPH = 708;
let M = null;
function rel(el) { let x = 0, y = 0, n = el; const cam = document.getElementById('cam'); while (n && n !== cam) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 }; }
function relSpan(el) { // text-only box of an inline element (for rings around a number)
  const camR = document.getElementById('cam').getBoundingClientRect(), r = el.getBoundingClientRect(), s = camR.width / 1020;
  return { x: (r.left - camR.left) / s, y: (r.top - camR.top) / s, w: r.width / s, h: r.height / s };
}
function measure() {
  const g = id => rel(document.getElementById(id));
  const q = sel => document.querySelector(sel);
  const m = {};
  m.dlg = g('dlg'); m.drop = g('dropwrap'); m.zone = g('zone'); m.form = g('form'); m.notice = g('notice'); m.confirm = g('confirm');
  m.chk1 = g('chk1'); m.save = g('save'); m.tbl = g('tbl'); m.rg = g('rg'); m.rgIn = g('rg-in'); m.cmp = g('cmpcard');
  m.rowTop = g('rows').y; m.rowX = g('rows').x;
  // the form pane scrolls inside the dialog: offsets of .fin children are relative to the pane
  m.fin = g('fin');
  m.scroll = (m.confirm.y - m.notice.y) - 30;
  for (const k of ['st', 'pu', 'tr']) {
    m['ex-' + k] = g('ex-' + k); m['in-' + k] = g('in-' + k); m['tags-' + k] = g('tags-' + k); m['nm-' + k] = g('nm-' + k);
  }
  m.bd = g('bd-st'); m.bdt = g('bdt-st'); m.bdtot = g('bdtot-st');
  m.det = g('detwrap');
  // span boxes need the cam at identity: measured with the camera transform temporarily removed
  const cam = document.getElementById('cam'), keep = cam.style.transform; cam.style.transform = 'none';
  const rowsN = ['st', 'pu', 'tr'].map(k => document.getElementById('row-' + k)); const keepR = rowsN.map(n => n.style.transform); rowsN.forEach(n => { n.style.transform = 'none'; });
  m.sp = {};
  for (const k of ['st', 'pu', 'tr']) {
    m.sp['exv-' + k] = relSpan(document.querySelector('#ex-' + k + ' .fig'));
    m.sp['inv-' + k] = relSpan(document.querySelector('#in-' + k + ' .fig'));
    m.sp['low-' + k] = relSpan(document.getElementById('low-' + k));
  }
  m.sp.bdtot = relSpan(document.querySelector('#bdtot-st .rt.green'));
  cam.style.transform = keep; rowsN.forEach((n, i) => { n.style.transform = keepR[i]; });
  return m;
}
// row index after the flip: st 0→1, pu 1→2, tr 2→0  (offsets in px)
const AFTER = { st: 70, pu: 70, tr: -140 };

/* camera keys: [t, focus(M) -> [x, y], scale, ease] — focus is the cam point put at the viewport centre */
const F = {
  drop: m => [m.drop.cx, m.drop.cy - 10],
  dlg: m => [m.dlg.cx, m.dlg.cy],
  formTop: m => [m.form.x + m.form.w / 2 + m.dlg.x, m.dlg.y + 70 + m.notice.y + 150],
  tableAll: m => [m.cmp.cx, m.rg.y + 150],
  stMoney: m => [(m['ex-st'].x + m['in-st'].x + m['in-st'].w) / 2 + m.rowX, m.rowTop + 35 - 20],
  money: m => [m.rowX + (m['in-st'].x + m['in-st'].w) / 2 + 8, m.rowTop + 70],
  moneyFlip: m => [m.rowX + (m['in-st'].x + m['in-st'].w) / 2 + 8, m.rowTop + 76],
  puAfter: m => [(m['ex-pu'].x + m['in-pu'].x + m['in-pu'].w) / 2 + m.rowX, m.rowTop + 140 + 35 - 40],
  bdLeft: m => [m.det.x + m.bd.x + 24 + 300, m.det.y + m.bd.y + 150],
  bdRight: m => [m.det.x + m.bd.x + 24 + m.bdt.w - 300, m.det.y + m.bd.y + 150],
};
const CAM = [
  [6.84, 'drop', 1.32], [8.52, 'drop', 1.32], [8.98, 'dlg', 0.95, 'inOut'], [9.32, 'dlg', 0.95], [9.82, 'formTop', 2.05, 'inOut'],
  [11.08, 'formTop', 2.05], [11.62, 'tableAll', 1.0, 'inOut'], [12.08, 'tableAll', 1.0], [12.58, 'stMoney', 2.15, 'inOut'],
  [14.88, 'stMoney', 2.15], [15.38, 'money', 1.36, 'inOut'], [17.4, 'money', 1.36], [19.6, 'moneyFlip', 1.46, 'inOut'],
  [22.38, 'moneyFlip', 1.46], [22.88, 'puAfter', 2.15, 'inOut'], [26.52, 'puAfter', 2.15], [27.12, 'bdLeft', 1.55, 'swipe'],
  [27.5, 'bdLeft', 1.55], [28.3, 'bdRight', 1.55, 'inOut'], [29.0, 'bdRight', 1.55],
];
/* pointer keys (cam coords) */
const P = {
  fileStart: m => [m.dlg.x + m.dlg.w - 40, m.dlg.y + m.dlg.h - 30],
  zone: m => [m.zone.cx + 30, m.zone.cy + 10],
  chkA: m => [m.dlg.x + m.form.x + m.chk1.x + 140, m.dlg.y + 70 + m.chk1.y - m.scroll + 90],
  chk: m => [m.dlg.x + m.form.x + m.chk1.x + 9, m.dlg.y + 70 + m.chk1.y - m.scroll + 9],
  save: m => [m.dlg.x + m.form.x + m.save.cx - 10, m.dlg.y + 70 + m.save.cy - m.scroll],
  rgA: m => [m.rowX + 520, m.rowTop + 120],
  rgIn: m => [m.rgIn.cx, m.rgIn.cy],
  stRowA: m => [m.rowX + m['in-pu'].cx + 30, m.rowTop + 140 + 40],
  stRow: m => [m.rowX + m['ex-st'].cx, m.rowTop + 70 + 35],
};
const PK = [
  [7.08, 'fileStart'], [7.78, 'zone', 'inOut'], [8.0, 'zone'],
  [10.2, 'chkA'], [10.6, 'chk', 'inOut'], [10.72, 'chk'], [10.96, 'save', 'inOut'], [11.2, 'save'],
  [16.7, 'rgA'], [17.38, 'rgIn', 'inOut'], [17.7, 'rgIn'],
  [26.05, 'stRowA'], [26.46, 'stRow', 'inOut'], [26.7, 'stRow'],
];
const PTR_ON = [[7.08, 8.0], [10.2, 11.12], [16.7, 18.2], [26.05, 27.0]];
const CLICKS = [[7.8, 'zone'], [10.62, 'chk'], [10.98, 'save'], [FLIP, 'rgIn'], [26.48, 'stRow']];

const EZ = Kit.ease, ez = e => (typeof e === 'string' ? EZ[e] : e) || EZ.linear;
function keyAt(keys, t, res) {   // keys: [t, name, ...]; returns [prevKey, nextKey, p]
  if (t <= keys[0][0]) return [keys[0], keys[0], 0];
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i]; return [a, b, ez(b[res])((t - a[0]) / (b[0] - a[0]))]; }
  const l = keys[keys.length - 1]; return [l, l, 0];
}
const placed = {};
function place(id, box, pad) { if (placed[id]) return; const n = document.getElementById(id); n.style.left = (box.x - pad) + 'px'; n.style.top = (box.y - pad) + 'px'; placed[id] = 1; }

K.each(t => {
  if (!M) {
    if (document.fonts.status !== 'loaded') return;
    M = measure();
  }
  // camera
  const [a, b, p] = keyAt(CAM, t, 3);
  const fa = F[a[1]](M), fb = F[b[1]](M);
  const s = Math.exp(Math.log(a[2]) + (Math.log(b[2]) - Math.log(a[2])) * p);
  const fx = fa[0] + (fb[0] - fa[0]) * p, fy = fa[1] + (fb[1] - fa[1]) * p;
  document.getElementById('cam').style.transform = `translate(${(VPW / 2 - fx * s).toFixed(2)}px,${(VPH / 2 - fy * s).toFixed(2)}px) scale(${s.toFixed(4)})`;
  // the form pane scrolls to the confirmation (10.05–10.45)
  const sp = Math.max(0, Math.min(1, (t - 10.02) / 0.42)), se = EZ.scroll(sp);
  document.getElementById('fin').style.transform = `translateY(${(-M.scroll * se).toFixed(1)}px)`;
  // pointer + dragged file
  const [pa, pb, pp] = keyAt(PK, t, 2), A = P[pa[1]](M), B = P[pb[1]](M);
  const px = A[0] + (B[0] - A[0]) * pp, py = A[1] + (B[1] - A[1]) * pp;
  const on = PTR_ON.some(r => t >= r[0] && t < r[1]);
  const ptr = document.getElementById('ptr'); ptr.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`; ptr.style.visibility = on ? 'visible' : 'hidden';
  const file = document.getElementById('file'); file.style.left = (px + 16) + 'px'; file.style.top = (py + 22) + 'px';
  // click pulse
  let c = null; for (const k of CLICKS) if (t >= k[0]) c = k;
  const ck = document.getElementById('click');
  if (c && t - c[0] < 0.36) { const age = t - c[0], pt = P[c[1]](M); ck.style.left = pt[0] + 'px'; ck.style.top = pt[1] + 'px'; ck.style.opacity = (0.9 * (1 - age / 0.36)).toFixed(2); ck.style.transform = `scale(${(0.5 + age * 3.2).toFixed(2)})`; ck.style.visibility = 'visible'; }
  else ck.style.visibility = 'hidden';
  // drop-zone highlight sits on the zone
  if (!placed.zh) { const z = document.getElementById('zonehot'); z.style.left = M.zone.x + 'px'; z.style.top = M.zone.y + 'px'; z.style.width = M.zone.w + 'px'; z.style.height = M.zone.h + 'px'; placed.zh = 1; }
  const sped = document.getElementById('sped'); sped.style.left = (M.dlg.x + M.dlg.w / 2 - 40) + 'px'; sped.style.top = (M.dlg.y + M.dlg.h - 150) + 'px';
  // table state
  const flipped = t >= FLIP;
  document.getElementById('rg-ex').classList.toggle('sel', !flipped); document.getElementById('rg-in').classList.toggle('sel', flipped);
  document.getElementById('h-ex').classList.toggle('on-col', !flipped); document.getElementById('h-in').classList.toggle('on-col', flipped);
  document.querySelectorAll('.app .f-ex').forEach(n => n.classList.toggle('on', !flipped));
  document.querySelectorAll('.app .f-in').forEach(n => n.classList.toggle('on', flipped));
  document.getElementById('low-st').style.display = flipped ? 'none' : '';
  document.getElementById('low-pu').style.display = 'none';
  document.getElementById('low-tr').style.display = t >= 18.05 ? '' : 'none';
  const sel = t >= 26.48 ? 'st' : 'pu';
  for (const k of ['st', 'pu', 'tr']) { document.getElementById('row-' + k).classList.toggle('sel', k === sel); document.getElementById('sel-' + k).style.display = k === sel ? '' : 'none'; }
  document.getElementById('row-tr').style.zIndex = 2;
  document.getElementById('dw-st').style.visibility = sel === 'st' ? 'visible' : 'hidden';
  document.getElementById('dw-pu').style.visibility = sel === 'pu' ? 'visible' : 'hidden';
  // rings sit on their targets (rows move: add the post-flip offset where needed)
  const sp2 = M.sp;
  place('rg-bold', sp2['inv-st'], 16); place('rg-calc', sp2['exv-st'], 14); place('rg-lows', sp2['low-st'], 13);
  if (!placed['rg-lowt']) { const bx = Object.assign({}, sp2['low-st']); bx.y += AFTER.tr + 140; place('rg-lowt', bx, 13); }
  if (!placed['rg-pu']) { const bx = Object.assign({}, sp2['inv-pu']); bx.y += AFTER.pu; place('rg-pu', bx, 14); }
  place('rg-tot', sp2.bdtot, 14);
});

/* ---- S4 end card ---- */
K.scene('#s4', 28.88, DUR + 1);
K.add('#s4', 'opacity', [[28.88, 0], [29.02, 1, 'out']]);
K.pop('#tl1', 29.06, { dy: 30 });
K.pop('#tl2', 30.86, { dy: 30 });
K.add('#live', 'opacity', [[0, 0], [31.5, 0], [31.7, 1, 'out']]).add('#live', 'y', [[31.5, 60], [31.8, 0, 'out']]);
K.pop('#livechip', 31.85, { dy: 12 });
K.add('#rg-free-p', 'trim', [[32.3, 0], [32.7, 1, 'out']]);
K.pop('#endrow', 32.1, { dy: 24 });
K.add('#pill', 'scale', [[32.5, 1], [32.62, 1.08, 'out'], [32.8, 1, 'in']]);

K.ready({ duration: DUR, fonts: ['800 60px Manrope', '700 20px Manrope', '600 20px Manrope', '500 20px Manrope', '400 40px Kalam', '700 40px Kalam', '400 40px "Permanent Marker"', '400 20px Inter', '500 20px Inter', '600 20px Inter', '700 20px Inter', '500 20px "JetBrains Mono"', '700 20px "JetBrains Mono"'] });
})();
