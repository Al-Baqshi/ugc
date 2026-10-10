/* Remittance attached. (It wasn't.) — QSME Global. One timeline for both cuts.
   remittance-attached.html       → body.build.r4x5  (LinkedIn 4:5, safe box 60,60,1020,1290)
   remittance-attached-9x16.html  → body.build.r9x16 (YouTube Shorts 9:16, safe box 65,300,1015,1400; app text kept left of x 900)
   Everything is a pure function of t. The QSME screens are recreations (demo data) built from the exact
   strings on origin/main (settlement.json, contracts.json, projects.json, payments.json) until the owner's
   Session C recordings replace them; see post.md → "Owner recordings to swap in".
   v2 (2026-10-04, review pass): hook turns by 1.2 s, "0 attachments" target, header clipped under the toolbar,
   push-ins + quote captions on both dialog warnings, payer attaches October's remittance, role colours
   (payer blue / receiver amber → green), flip on each change of screen, longer split, new end-card crop.
   v3 (2026-10-06, AUDIO-FIRST REMAKE to the owner's N01 standard): first Cam S take; superseded by v4.
   v4 (2026-10-10, review fix): the v3 take's with-timestamps alignment ran ~0.8 s ahead of the real audio (up to 1.6 s at
   pauses) and the take had five ~1-1.46 s silences at the blank-line paragraph breaks, read low-energy at 2.39 words/s.
   New take: outputs/vo-take-cam-v3/take.mp3 (attempt 6), Cam S, eleven_v3, ONE unbroken with-timestamps request, the
   script sent as one paragraph with [confident]; 39.97 s, 116 words, 2.92 words/s, longest gap 0.90 s. The clock below is
   the FORCED ALIGNMENT of that take (outputs/vo-take-cam-v3/forced-alignment.json -> words.json), not the with-timestamps
   alignment (which drifts up to ~0.5 s on this take too). Page = 41.5 s (take + ~1.5 s tail). Word anchors (word start):
     0.10 "Paid" · 1.22 "remittance" · 1.60 "attached," · 2.66 "it" · 2.80 "wasn't." · 4.04 "Nothing" · 5.40 "Reattached."
     6.38 "That's the March one." · 7.50 "Which" · 8.46 "Can" (call? ends 9.32) · 10.06 "Both" · 10.32 "correct," · 10.74 "according"
     11.18 "themselves." (ends 11.68) · 12.30 "So on" · 12.70 "Queue Ess Mee" · 13.86 "subcontractor" · 14.90 "proof" · 15.26 "invoice"
     16.84 "not in an inbox." · 18.44 "Only" · 18.86 "payer" · 19.34 "mark" · 21.08 "honest" · 22.16 "this goes on your word," (ends 23.30)
     23.78 "remittance?" · 24.68 "Actually" · 25.04 "attached." · 26.08 "Only" · 26.42 "receiver" · 27.10 "confirm" · 28.04 "once"
     29.54 "Don't" · 30.38 "promise," · 31.44 "Queue Ess Mee never" · 32.66 "money." (ends 32.90) · 33.34 "It" · 34.08 "record"
     34.50 "both" · 34.78 "ticked." (ends 35.06) · 35.64 "Book" · 35.96 "thirty-minute" · 37.04 "Queue Ess Mee dot build"
     38.54 "the one call" · 39.88 end of speech · 39.97 end of the take.
   A 0–3.85 hook ("(It wasn't.)" slams on "wasn't" 2.80) · B 3.93–9.62 thread (replies pop on their words) · C 9.62–11.85 sheets
   ("Both correct." 10.06, PAID 10.32 / OUTSTANDING 10.55, "According to themselves." 10.74, lean 11.18) · D 11.85–18.25 subcontractor
   (note types 12.2, photo 13.1, flies 13.9, Submit on "proof" 14.9, Upload invoice on "invoice" 15.45, "Not in an inbox." 16.84)
   · E 18.25–26.05 payer (caption on "Only" 18.44, click on "payer" 18.9, reference on "mark" 19.34, push-in on "honest" 21.0,
   "so this goes on your word." 22.16, file on "remittance?" 23.85, "(Actually attached.)" 24.7, tick 24.95, Mark as paid 25.25,
   pill 25.52) · F 26.05–33.05 receiver (caption 26.1, click on "confirm" 27.12, push-in on "once" 28.0, "don't confirm on a promise."
   29.54, pull back on "promise" 30.4, Confirm 31.0, settled 31.35, "QSME never touches the money." 31.44) · G 33.05–35.15 split
   ("It keeps the one record…" 33.34, SETTLED on "record" 34.08 / "both" 34.5) · H 35.15–41.5 end card (starts after "ticked."
   ends 35.06; pill on "Book" 35.64, qsme.build 37.04, "(the one call worth jumping on)" 38.54, pulse 39.9). */
(function () {
'use strict';
const R9 = document.body.classList.contains('r9x16');
/* Corner label on the recreated screens. true = the public wording; false = the internal production note
   (review renders only). Since the 2026-10-04 review this cut ships with the public label until Session C. */
const PUBLIC_LABEL = true;
const LABEL = PUBLIC_LABEL ? 'Recreated screen · demo data' : 'Illustrative — swap for real QSME screen (demo data)';
const E = Kit.ease;
const clamp = v => Math.max(0, Math.min(1, v));
const ez = (t, t0, t1, e) => (E[e || 'inOut'])(clamp((t - t0) / (t1 - t0)));
const $ = s => document.querySelector(s);

/* ------------------------------------------------------------------ the clock */
const T = {
  /* A hook */ scroll0: 0.15, scroll1: 0.70, circ0: 1.25, circ1: 2.00, q: 2.25, wasnt: 2.80, A1: 3.85,
  /* B thread */ B: 3.93, r: [4.04, 5.40, 6.38, 7.50, 8.46], B1: 9.62,
  /* C sheets */ C: 9.62, c1: 10.06, callL: 10.32, callR: 10.55, c2: 10.74, lean: 11.18, C1: 11.85,
  /* P product */ D: 11.85, E: 18.25, F: 26.05, G: 33.05,
  /* H end */ H: 35.15, END: 41.50
};
const D = T.D, Ep = T.E, F = T.F, G = T.G, H = T.H;
/* word-anchored beats inside the product scenes (absolute seconds on the take) */
const DB = { type0: 12.20, type1: 12.80, photo: 13.10, fly0: 13.90, fly1: 14.28, submit: 14.90, t1: 15.02, t1out: 15.40, inv: 15.45, chip: 15.67, t2: 15.70, cap1: 14.90, cap2: 16.84 };
const EB = { click: 18.90, dlg: 18.98, type0: 19.34, type1: 19.84, push0: 21.00, push1: 21.24, hl0: 22.16, hl1: 22.76, pull0: 23.32, pull1: 23.52,
  file: 23.85, note: 24.70, tick: 24.95, go: 25.25, close: 25.40, pill: 25.52, cap1: 18.44, cap2: 22.16 };
const FB = { click: 27.12, dlg: 27.22, push0: 28.00, push1: 28.24, hl0: 29.54, hl1: 30.14, pull0: 30.40, pull1: 30.64, tick: 30.75, go: 31.00, close: 31.15,
  settle: 31.35, cap1: 26.10, cap2: 29.54, capG1: 31.44 };
const GB = { cap2: 33.34, callL: 34.08, callR: 34.50 };
const HB = { pill: 35.64, url: 37.04, note: 38.54, pulse: 39.90 };

/* layout numbers that differ between the cuts (everything else is CSS) */
const L = R9 ? {
  appY: 566, appS: 0.9, appVisX: 45, capA: 426, capB: 494, label: [65, 304], splitY: 690, callDY: 452, photoY: 680, splitX: [46, 522], ptyX: [70, 546]
} : {
  appY: 312, appS: 1, appVisX: 40, capA: 140, capB: 210, label: [60, 1246], splitY: 452, callDY: 522, photoY: 420, splitX: [56, 548], ptyX: [64, 566]
};
const ZOOM = 1.4;   // camera push on the two dialog warnings

/* ------------------------------------------------------------------ icons (lucide shapes, drawn here) */
const ic = (d, s, extra) => `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 24 24" ${extra || ''}>${d}</svg>`;
const I = {
  check: s => ic('<path d="M20 6 9 17l-5-5"/>', s, 'stroke-width="3"'),
  clip: s => ic('<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>', s),
  warn: s => ic('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', s),
  okc: s => ic('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', s),
  up: s => ic('<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.24"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>', s),
  rcpt: s => ic('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>', s),
  back: s => ic('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', s),
  archive: s => ic('<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>', s),
  trash: s => ic('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>', s),
  reply: s => ic('<path d="M9 17 4 12l5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>', s),
  more: s => ic('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>', s),
};
const CURSOR = id => `<svg class="cursor" id="${id}" viewBox="0 0 34 48"><path d="M4 3 L4 37 L12.5 29 L18 42.5 L24 40 L18.5 27 L29.5 27 Z" fill="#111" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>`;

/* ------------------------------------------------------------------ demo data (fictional) */
const PAYER = 'Demo Builders';          // main contractor = the payer (project owner in QSME)
const PAYEE = 'Demo Framing Co.';       // subcontractor = the receiver
const REF = 'STG2-1410';
const NOTE = 'Frame and roof trusses complete.';

/* ------------------------------------------------------------------ A · the email (generic, unbranded) */
const mail = `
<div class="win" id="mail">
  <div class="bar">${I.back(30)}${I.archive(28)}${I.trash(28)}<span class="sp"></span>${I.reply(30)}${I.more(30)}</div>
  <div id="mail-clip"><div id="mail-scroll">
    <div id="mail-subj">RE: Stage 2 payment — not received</div>
    <div class="who" style="top:100px"><div class="av mc">MC</div><div><b>Accounts · Main contractor</b><small>to Accounts · Subcontractor</small></div></div>
    <div id="mail-time">Wed 21 Oct, 09:12</div>
    <div id="mail-body"><p>Hi team,</p><p></p><p>Paid on the 14th.</p><p>Remittance attached.</p><p></p><p>Kind regards,</p><p>Accounts</p></div>
    <div id="mail-att">${I.clip(28)}0 attachments</div>
  </div></div>
  <svg id="hunt" width="1000" height="1040" viewBox="0 0 1000 1040"><path id="huntc" d="M 391 405 C 466 420, 479 474, 391 501 C 304 527, 120 525, 63 492 C 12 462, 37 414, 135 399 C 217 386, 330 387, 407 408"/></svg>
  <div id="hunt-q" style="left:492px;top:352px">?</div>
  ${CURSOR('mcur')}
</div>`;

/* ------------------------------------------------------------------ B · the thread */
const CARDS = [
  { who: 'mc', nm: 'Accounts', side: 'Main contractor', tm: 'Wed 09:12', msg: 'Paid on the 14th. Remittance attached.' },
  { who: 'sc', nm: 'Accounts', side: 'Subcontractor', tm: 'Wed 09:47', msg: 'Nothing attached?' },
  { who: 'mc', nm: 'Accounts', side: 'Main contractor', tm: 'Wed 11:03', msg: 'Reattached.', file: 'Remittance_14-03.pdf' },
  { who: 'sc', nm: 'Accounts', side: 'Subcontractor', tm: 'Wed 13:20', msg: 'That’s the March one.' },
  { who: 'mc', nm: 'Accounts', side: 'Main contractor', tm: 'Wed 15:41', msg: 'Which account?' },
  { who: 'sc', nm: 'Accounts', side: 'Subcontractor', tm: 'Thu 08:58', msg: 'Can we jump on a call?' },
];
let cy = 72;
const thread = `
<div class="win" id="thread">
  <div class="bar">${I.back(30)}${I.archive(28)}${I.trash(28)}<span class="sp"></span>${I.reply(30)}${I.more(30)}</div>
  ${CARDS.map((c, i) => { const h = c.file ? 186 : 128; const top = cy; cy += h; return `
  <div class="tcard" id="cd${i}" style="top:${top}px;height:${h}px">
    ${i ? '<div class="tint"></div>' : ''}
    <div class="av ${c.who}">${c.who.toUpperCase()}</div>
    <div class="nm">${c.nm} <span>· ${c.side}</span></div><div class="tm">${c.tm}</div>
    <div class="msg">${c.msg}</div>
    ${c.file ? `<div class="chipf"><span class="pdf">PDF</span>${I.clip(24)}${c.file}</div>` : ''}
  </div>`; }).join('')}
</div>`;

/* ------------------------------------------------------------------ C · two spreadsheets (generic) */
function sheet(id, title, s2, cls2, x, rot) {
  const rows = [['Stage', 'Amount', 'Status', 'hd'], ['Stage 1', '22,000.00', 'PAID', '', 'ok'], ['Stage 2', '49,500.00', s2, '', cls2], ['Stage 3', '38,500.00', '', ''], ['', '', '', ''], ['', '', '', '']];
  return `<div class="sheet" id="${id}" style="left:${x}px;transform:rotate(${rot}deg)">
    <div class="tb"><i></i><i></i><i></i><span>${title}</span></div>
    <div class="fx"><em>fx</em><b>C3</b>${s2}</div>
    <div class="grid">
      <div class="gr letters"><span></span><span>A</span><span>B</span><span>C</span></div>
      ${rows.map((r, i) => `<div class="gr ${r[3]}"><span class="rn">${i + 1}</span><span>${r[0]}</span><span class="${i ? 'num' : ''}">${r[1]}</span><span class="${r[4] || ''}">${r[2]}</span></div>`).join('')}
      <div class="sel" style="left:${38 + 116 + 140 - 2}px;top:${34 + 54 * 2 - 2}px;width:${166 + 3}px;height:${54 + 3}px"></div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ P · QSME app recreation */
const ub = '<div class="ub"><i></i><i></i><i></i><span><img class="ubq" src="qsme-mark.svg" alt="">app.qsme.build</span></div>';
const header = `<div class="ph"><h1>Work area</h1><p>Track progress, submit work and settle each milestone of this contract.</p><div class="ct">Framing package · Wharf Street Apartments (demo)</div></div>`;
function proof(chips) {
  return `<div class="proof"><div class="ph2">${I.up(26)}Proof submitted by ${PAYEE}</div><div class="nt">${NOTE}</div>
    <div class="chips"><span class="achip">${I.clip(20)}View attachment</span>${chips > 1 ? `<span class="achip" id="${chips === 3 ? 'invchip' : ''}">${I.clip(20)}View contractor invoice</span>` : ''}</div></div>`;
}
/* one milestone timeline per state; ms2 holds the action panel */
function timeline(st) {
  const P = {
    draft: { h: 366, node: 'open', html: `<div class="ta" id="ta"><span class="ph0" id="taph">Describe the work completed…</span><span id="tatxt">${NOTE}</span></div>
      <div class="fin" id="fin"><b>Choose file</b><span class="nofile" id="fin0">No file chosen</span><span id="fin1" class="fsel">frame-trusses.jpg</span></div>
      <div class="btn" id="btnSubmit">${I.up(26)}Submit progress</div>` },
    sent: { h: 306, node: 'warn', html: `${proof(3)}<div class="links"><span class="ed">Edit submission</span><span class="up" id="lnkInv">${I.clip(21)}Upload invoice</span></div>` },
    review: { h: 403, node: 'warn', html: `${proof(2)}<div class="btn" id="btnPaid">${I.rcpt(26)}I paid outside QSME</div>
      <div class="help">Pay however you like — bank transfer, cash, cheque — then record it here so both sides have the same record.</div>` },
    waitP: { h: 356, node: 'warn', pill: 1, html: `<div class="lead">Recorded as paid outside QSME. Waiting for ${PAYEE} to confirm the money arrived.</div>${proof(2)}<div class="ref">Ref <b>${REF}</b></div>` },
    waitR: { h: 436, node: 'warn', pill: 1, html: `<div class="lead">The payer recorded this as paid outside QSME. Confirm once the money has arrived in your account.</div>${proof(2)}<div class="ref">Ref <b>${REF}</b></div>
      <div class="btn" id="btnConfirm">${I.okc(26)}Confirm payment received</div>` },
    done: { h: 412, node: 'done', html: `<div class="lead">Settled outside QSME and confirmed by both sides.</div>${proof(2)}<div class="ref">Ref <b>${REF}</b></div>
      <div class="setl" id="setl">${I.okc(28)}Payment settled <span class="srcb">${I.rcpt(16)}Outside QSME</span></div>` },
  }[st];
  const y1 = 100, y2 = 188, y3 = y2 + P.h + 12;
  const node2 = P.node === 'done' ? `<div class="node done" id="n2${st}">${I.check(24)}</div>` : `<div class="node ${P.node}">M2</div>`;
  return `<div class="mt"><h2>Milestone timeline</h2><p>Upload work, submit progress, and settle each milestone.</p>
    <div class="rail ok" style="left:55px;top:${y1 + 64}px;height:${y2 - y1 - 50}px"></div>
    <div class="rail${P.node === 'done' ? ' ok' : ''}" style="left:55px;top:${y2 + P.h - 6}px;height:${y3 - y2 - P.h + 22}px"></div>
    <div class="ms" style="top:${y1}px;height:80px"><div class="node done">${I.check(24)}</div><div class="lbl">Mobilisation</div><div class="meta">20% of contract</div></div>
    <div class="ms" id="ms2" style="top:${y2}px;height:${P.h}px">${node2}
      <div class="lbl">Frame &amp; trusses ${P.pill ? `<span class="apill warn" id="pill${st}">Awaiting confirmation<i class="aring" id="ring${st}"></i></span>` : ''}</div><div class="meta">45% of contract</div>
      <div class="panel">${P.html}</div></div>
    <div class="ms" style="top:${y3}px;height:80px"><div class="node open">M3</div><div class="lbl">Close-in &amp; handover</div><div class="meta">35% of contract</div></div>
  </div>`;
}
function view(id, st, scroll) {
  return `<div class="pgv" id="${id}"><div class="pgs" style="position:absolute;left:0;right:0;top:${-(scroll || 0)}px;height:1200px">${header}${timeline(st)}</div></div>`;
}
const dlgPaid = `
<div class="scrim" id="scrim1"></div>
<div class="dlg" id="dlg1" style="top:96px">
  <h3>Record this as paid outside QSME</h3><p>M2 · Frame &amp; trusses</p>
  <div class="warnb" id="warn1">${I.warn(28)}<div><b>Only mark this as paid if you have actually sent the money.</b>
    <p>QSME has no bank record of a payment made outside it, <span class="hlw" id="hl1">so this goes on your word.</span> Marking it paid records the payment and notifies ${PAYEE}, who then has to confirm the money arrived.</p></div></div>
  <div class="fl">Payment reference</div>
  <div class="inp" id="inp1"><span class="ph0" id="inp1ph">e.g. your bank transfer reference</span><span id="inp1txt">${REF}</span></div>
  <div class="hint">Use whatever the other party will see on their statement — it’s how you both find this payment later.</div>
  <div class="fl">Attach the invoice or receipt (optional)</div>
  <div class="fin" id="fin2" style="margin-top:10px"><b>Choose file</b><span class="nofile" id="fin2a">No file chosen</span><span class="fsel" id="fin2b"><span class="pdfs">PDF</span>Remittance_14-10.pdf</span>
    <span class="attnote"><span id="attnote">(Actually attached.)</span></span></div>
  <div class="ackb" id="ack1"><div class="cbx" id="cbx1"><div class="on" id="cbx1on">${I.check(20)}</div></div>I have sent the money.</div>
  <div class="foot"><div class="cx">Cancel</div><div class="go" id="go1">Mark as paid<div class="dis" id="go1dis"></div></div></div>
</div>`;
const dlgConfirm = `
<div class="scrim" id="scrim2"></div>
<div class="dlg" id="dlg2" style="top:150px">
  <h3>Confirm you received this payment</h3><p>M2 · Frame &amp; trusses</p>
  <div class="warnb" id="warn2">${I.warn(28)}<div><b>Only confirm if the money has arrived in your account.</b>
    <p>${PAYER} recorded this as paid outside QSME, so there is no bank record to check it against. Confirming settles this payment for good — check your account first, <span class="hlw" id="hl2">don’t confirm on a promise.</span></p></div></div>
  <div class="refg">Reference given: <b>${REF}</b></div>
  <div class="ackb" id="ack2"><div class="cbx" id="cbx2"><div class="on" id="cbx2on">${I.check(20)}</div></div>The money has cleared in my account.</div>
  <div class="foot"><div class="cx">Cancel</div><div class="go" id="go2">Confirm payment received<div class="dis" id="go2dis"></div></div></div>
</div>`;
/* G · both screens, same record (the answer to the two spreadsheets). Both roles see the same settled lead. */
const mini = (id, x, who) => `<div class="mini ${who}" id="${id}" style="left:${x}px;top:${L.splitY}px">
  <div class="mub"><i></i><i></i><i></i><span><img class="ubq" src="qsme-mark.svg" alt="">app.qsme.build</span></div>
  <div class="mcard"><div class="mrow1"><div class="node done">${I.check(22)}</div><div><b>Frame &amp; trusses</b><small>45% of contract</small></div></div>
    <div class="lead">Settled outside QSME and confirmed by both sides.</div>
    <div class="ref">Ref <b>${REF}</b></div>
    <div class="setl">${I.okc(26)}Payment settled <span class="srcb">${I.rcpt(15)}Outside QSME</span></div></div>
</div>`;
const toast = (id, txt) => `<div class="toast" id="${id}">${I.okc(26)}${txt}</div>`;

/* ------------------------------------------------------------------ the page */
$('#root').innerHTML = `
<div id="sA" class="fill">
  ${mail}${thread}
  <div id="a-kick" class="abs">Paid on the 14th.</div>
  <div id="a-head" class="abs display">Remittance attached.</div>
  <div id="a-wasnt" class="abs">(It wasn’t.)</div>
  <div id="b-re" class="abs">${[0, 1, 2, 3, 4, 5].map(i => `<i id="re${i}">RE:</i>`).join('')}</div>
  <div id="b-subj" class="abs">Stage 2 payment — not received</div>
</div>
<div id="sC" class="fill">
  <div class="cap" id="capC1" style="top:${R9 ? 330 : 104}px;font-size:64px">Both correct.</div>
  <div class="cap" id="capC2" style="top:${R9 ? 404 : 180}px;font-size:64px">According to themselves.</div>
  <div class="party" id="ptyL" style="left:${R9 ? 70 : 64}px;top:${R9 ? 498 : 338}px"><i style="background:var(--mc)"></i>MAIN CONTRACTOR</div>
  <div class="party" id="ptyR" style="left:${R9 ? 572 : 566}px;top:${R9 ? 498 : 338}px"><i style="background:var(--sc)"></i>SUBCONTRACTOR</div>
  ${sheet('shL', 'Payments run — October', 'PAID 14/10', 'ok', 56, -1.5)}
  ${sheet('shR', 'Claims register', 'OUTSTANDING', 'no', 548, 1.5)}
  <div class="call" id="callL" style="left:56px"><small>STAGE 2</small><b>PAID</b></div>
  <div class="call" id="callR" style="left:548px"><small>STAGE 2</small><b>OUTSTANDING</b></div>
</div>
<div id="sP" class="fill">
  <img id="logoP" class="abs" src="qsme-logo-nor.svg" alt="QSME">
  <div class="role" id="role-sc"><i></i>SUBCONTRACTOR’S SCREEN</div>
  <div class="role" id="role-mc"><i></i>MAIN CONTRACTOR’S SCREEN</div>
  <div class="cap" id="capD1" style="top:${L.capA}px;font-size:52px">Proof and invoice, on the stage.</div>
  <div class="cap g" id="capD2" style="top:${L.capB}px;font-size:52px"><span class="g">Not in an inbox.</span></div>
  <div class="cap" id="capE" style="top:${L.capA}px;font-size:52px">Only the <span class="mcw">payer</span> can mark it paid.</div>
  <div class="cap" id="capF" style="top:${L.capA}px;font-size:52px">Only the <span class="scw">receiver</span> can confirm it.</div>
  <div class="qcap" id="capE2" style="top:${L.capB + 4}px"><span>“…so this goes on your word.”</span></div>
  <div class="qcap" id="capF2" style="top:${L.capB + 4}px"><span>“…don’t confirm on a promise.”</span></div>
  <div id="app" style="top:${L.appY}px">
    ${ub}
    <div id="cam">
      ${view('v1', 'draft')}${view('v2', 'sent')}${view('v3', 'review')}${view('v4', 'waitP')}${view('v5', 'waitR', 156)}${view('v6', 'done', 156)}
      ${dlgPaid}${dlgConfirm}
      ${toast('t1', 'Progress submitted')}${toast('t2', 'Invoice attached to this milestone')}${toast('t3', 'Recorded as paid outside QSME')}${toast('t4', 'Payment confirmed as received')}
      ${CURSOR('acur')}
      <div class="ripple" id="rp1"></div><div class="ripple" id="rp2"></div><div class="ripple" id="rp3"></div><div class="ripple" id="rp4"></div><div class="ripple" id="rp5"></div><div class="ripple" id="rp6"></div><div class="ripple" id="rp7"></div><div class="ripple" id="rp8"></div><div class="ripple" id="rp9"></div>
    </div>
  </div>
  <div id="photo" style="top:${L.photoY}px"><img id="photoimg" src="clips/frame/f_00000.jpg" alt=""><div id="photo-tag">demo photo</div></div>
</div>
<div id="sS" class="fill">
  <div class="party" id="ptyL2" style="left:${L.ptyX[0]}px;top:${L.splitY - 62}px"><i style="background:var(--mc)"></i>MAIN CONTRACTOR</div>
  <div class="party" id="ptyR2" style="left:${L.ptyX[1]}px;top:${L.splitY - 62}px"><i style="background:var(--sc)"></i>SUBCONTRACTOR</div>
  ${mini('miniL', L.splitX[0], 'mc')}${mini('miniR', L.splitX[1], 'sc')}
  <div class="call" id="callL2" style="left:${L.splitX[0]}px;top:${L.splitY + L.callDY}px"><small>STAGE 2</small><b>SETTLED</b></div>
  <div class="call" id="callR2" style="left:${L.splitX[1]}px;top:${L.splitY + L.callDY}px"><small>STAGE 2</small><b>SETTLED</b></div>
</div>
<div class="cap" id="capG1" style="top:${L.capA}px;font-size:52px">QSME never touches the money.</div>
<div class="cap" id="capG2" style="top:${L.capB}px;font-size:52px">It keeps the one record<br><span class="g">you both ticked.</span></div>
<div class="ill" id="lab" style="left:${L.label[0]}px;top:${L.label[1]}px">${LABEL}</div>
<div id="sH" class="fill">
  <div id="endglow" class="fill"></div>
  <img id="logoE" class="abs" src="qsme-logo-nor.svg" alt="QSME">
  <div id="webcard"><div class="wb"><i></i><i></i><i></i><span>qsme.build/contact</span></div>
    <div id="webview"><img id="webimg" src="clips/stills/contact-demo-line.png" alt="qsme.build contact page"><div id="webhl"></div></div></div>
  <div id="endpill" class="abs"><span class="pill">Book a 30-minute demo</span></div>
  <div id="endurl" class="abs">qsme.build</div>
  <div id="endnote" class="abs">(the one call worth jumping on)</div>
</div>`;

/* ================================================================== A · hook */
Kit.scene('#sA', 0, T.B1 + 0.4);
Kit.add('#mail-scroll', 'y', [[T.scroll0, 0], [T.scroll1, -250, 'scroll']]);
Kit.add('#huntc', 'trim', [[T.circ0, 0], [T.circ1, 1, 'out']]);
Kit.add('#huntc', 'opacity', [[T.A1, 1], [T.A1 + 0.15, 0]]);
Kit.pop('#hunt-q', T.q, { dy: 0 }).add('#hunt-q', 'scale', [[T.q, 1.5], [T.q + 0.14, 1, 'slam']]).add('#hunt-q', 'rotate', [[T.q, 0], [T.q + 0.14, 8, 'out']]);
Kit.out('#hunt-q', T.A1, 0.15);
Kit.slam('#a-wasnt', T.wasnt, { from: 1.45, dur: 0.16 }).add('#a-wasnt', 'rotate', [[T.wasnt, -10], [T.wasnt + 0.16, -5, 'out']]);
['#a-kick', '#a-head', '#a-wasnt'].forEach((s, i) => { Kit.add(s, 'opacity', [[T.A1 + i * 0.03, 1], [T.A1 + 0.2 + i * 0.03, 0, 'in']]); Kit.add(s, 'y', [[T.A1 + i * 0.03, 0], [T.A1 + 0.24 + i * 0.03, -30, 'in']]); });
/* the hook cursor hunts round the empty attachment strip (mail-window coords) */
const MCUR = [[0.1, 760, 760], [0.7, 300, 512], [1.0, 430, 516], [1.3, 210, 510], [1.6, 380, 518], [1.9, 320, 512]];
Kit.add('#mcur', 'opacity', [[0, 1], [T.A1, 1], [T.A1 + 0.12, 0]]);
/* mail → thread */
Kit.add('#mail', 'opacity', [[T.A1 + 0.02, 1], [T.B + 0.16, 0]]);
Kit.add('#thread', 'opacity', [[T.A1, 0], [T.B + 0.12, 1, 'out']]);
Kit.add('#b-subj', 'opacity', [[T.B, 0], [T.B + 0.2, 1, 'out']]).add('#b-subj', 'y', [[T.B, 26], [T.B + 0.26, 0, 'out']]);
Kit.add('#re0', 'opacity', [[T.B, 0], [T.B + 0.2, 1, 'out']]).add('#re0', 'y', [[T.B, 26], [T.B + 0.26, 0, 'out']]);
T.r.forEach((t, i) => {
  Kit.pop('#cd' + (i + 1), t, { dy: 40, dur: 0.22 });
  Kit.add('#cd' + (i + 1) + ' .tint', 'opacity', [[t, 1], [t + 0.25, 1], [t + 1.0, 0, 'inOut']]);
  Kit.slam('#re' + (i + 1), t + 0.03, { from: 1.35, dur: 0.15 });
});
/* swipe B → C */
Kit.add('#sA', 'x', [[T.B1, 0], [T.B1 + 0.32, -1080, 'swipe']]);

/* ================================================================== C · spreadsheets */
Kit.scene('#sC', T.C, T.C1 + 0.4);
Kit.add('#sC', 'x', [[T.C, 1080], [T.C + 0.32, 0, 'swipe'], [T.C1, 0], [T.C1 + 0.32, -1080, 'swipe']]);
Kit.pop('#capC1', T.c1).pop('#capC2', T.c2);
Kit.slam('#callL', T.callL, { from: 1.35 }).slam('#callR', T.callR, { from: 1.35 });
/* the standoff: both sheets lean in a touch, then settle */
Kit.add('#shL', 'x', [[T.lean, 0], [T.lean + 0.25, 14, 'out'], [T.lean + 0.65, 0, 'inOut']]);
Kit.add('#shR', 'x', [[T.lean, 0], [T.lean + 0.25, -14, 'out'], [T.lean + 0.65, 0, 'inOut']]);

/* ================================================================== P · QSME (recreation) */
Kit.scene('#sP', T.D, G + 0.4);
Kit.add('#sP', 'x', [[T.D, 1080], [T.D + 0.32, 0, 'swipe'], [G, 0], [G + 0.32, -1080, 'swipe']]);
Kit.scene('#sS', G, T.H + 0.4);
Kit.add('#sS', 'x', [[G, 1080], [G + 0.32, 0, 'swipe'], [T.H, 0], [T.H + 0.32, -1080, 'swipe']]);
Kit.slam('#callL2', GB.callL, { from: 1.35 }).slam('#callR2', GB.callR, { from: 1.35 });
/* overlays that stay put across the swipe to the split */
Kit.add('#lab', 'opacity', [[0, 0], [D, 0], [D + 0.2, 1], [T.H, 1], [T.H + 0.15, 0]]);
/* who is looking: the role chip swaps at the edge-on moment of each flip */
Kit.add('#role-sc', 'opacity', [[0, 1], [Ep - 0.06, 1], [Ep + 0.02, 0], [F - 0.02, 0], [F + 0.06, 1]]);
Kit.add('#role-mc', 'opacity', [[0, 0], [Ep - 0.02, 0], [Ep + 0.08, 1], [F - 0.06, 1], [F + 0.02, 0]]);
['#role-sc', '#role-mc'].forEach(s => Kit.add(s, 'scale', [[Ep - 0.06, 1], [Ep + 0.02, 0.88], [Ep + 0.22, 1, 'outBack'], [F - 0.06, 1], [F + 0.02, 0.88], [F + 0.22, 1, 'outBack']]));
/* captions */
Kit.pop('#capD1', DB.cap1).out('#capD1', Ep - 0.12);
Kit.pop('#capD2', DB.cap2).out('#capD2', Ep - 0.12);
Kit.pop('#capE', EB.cap1).out('#capE', F - 0.1);
Kit.pop('#capE2', EB.cap2, { dy: 16 }).out('#capE2', F - 0.1);
Kit.pop('#capF', FB.cap1).out('#capF', FB.close);
Kit.pop('#capF2', FB.cap2, { dy: 16 }).out('#capF2', FB.close);
Kit.pop('#capG1', FB.capG1).out('#capG1', T.H, 0.15);
Kit.pop('#capG2', GB.cap2).out('#capG2', T.H, 0.15);
/* views: hard cuts inside one account; when the account changes the whole window flips (see Kit.each) */
const VIEWS = [['#v1', D, DB.submit + 0.1], ['#v2', DB.submit + 0.1, Ep], ['#v3', Ep, EB.close], ['#v4', EB.close, F], ['#v5', F, FB.close], ['#v6', FB.close, G + 0.5]];
VIEWS.forEach(([s, a, b]) => Kit.show(s, a, b));
/* D · the subcontractor submits proof + invoice */
Kit.type('#tatxt', DB.type0, DB.type1);
Kit.add('#taph', 'opacity', [[DB.type0 - 0.01, 1], [DB.type0, 0]]);
Kit.add('#fin0', 'opacity', [[DB.fly1, 1], [DB.fly1 + 0.01, 0]]);
Kit.add('#fin1', 'opacity', [[DB.fly1, 0], [DB.fly1 + 0.01, 1]]);
Kit.clip('#photoimg', { dir: 'clips/frame', t0: DB.photo, fps: 30, frames: 53, t1: Ep, ext: '.jpg' });
Kit.add('#photo', 'opacity', [[DB.photo, 0], [DB.photo + 0.16, 1, 'out'], [DB.fly1 - 0.08, 1], [DB.fly1 + 0.04, 0]]);
Kit.add('#photo', 'scale', [[DB.photo, 0.92], [DB.photo + 0.3, 1, 'out']]);
Kit.pop('#t1', DB.t1, { dy: 24 }).out('#t1', DB.t1out);
Kit.pop('#t2', DB.t2, { dy: 24 }).out('#t2', Ep - 0.15, 0.12);
Kit.pop('#invchip', DB.chip, { dy: 10 });
/* E · the payer marks it paid outside QSME: reference → the warning (push-in) → attaches October's remittance → tick → Mark as paid */
Kit.add('#scrim1', 'opacity', [[0, 0], [EB.dlg, 0], [EB.dlg + 0.16, 1], [EB.close, 1], [EB.close + 0.12, 0]]);
Kit.add('#dlg1', 'opacity', [[0, 0], [EB.dlg, 0], [EB.dlg + 0.16, 1, 'out'], [EB.close, 1], [EB.close + 0.08, 0]]);
Kit.add('#dlg1', 'scale', [[EB.dlg, 0.95], [EB.dlg + 0.24, 1, 'out'], [EB.close, 1], [EB.close + 0.08, 0.96]]);
Kit.add('#inp1ph', 'opacity', [[EB.type0 - 0.01, 1], [EB.type0, 0]]);
Kit.add('#inp1', 'borderColor', [[EB.type0 - 0.07, '#CBD5E1'], [EB.type0 - 0.05, '#16A34A', 'hold'], [EB.type1 + 0.1, '#16A34A'], [EB.type1 + 0.12, '#CBD5E1', 'hold']]);
Kit.type('#inp1txt', EB.type0, EB.type1);
Kit.add('#hl1', 'var:--hl-p', [[EB.hl0, 0], [EB.hl1, 1, 'inOut']]);
Kit.add('#fin2a', 'opacity', [[EB.file, 1], [EB.file + 0.01, 0]]);
Kit.add('#fin2b', 'opacity', [[EB.file, 0], [EB.file + 0.01, 1]]);
Kit.add('#attnote', 'opacity', [[EB.note, 0], [EB.note + 0.04, 1]]).add('#attnote', 'scale', [[EB.note, 1.4], [EB.note + 0.16, 1, 'slam']]).add('#attnote', 'rotate', [[EB.note, -8], [EB.note + 0.16, -3, 'out']]);
Kit.add('#cbx1on', 'opacity', [[EB.tick, 0], [EB.tick + 0.01, 1]]).add('#cbx1on', 'scale', [[EB.tick, 0.5], [EB.tick + 0.15, 1, 'outBack']]);
Kit.add('#go1dis', 'opacity', [[EB.tick + 0.02, 1], [EB.tick + 0.1, 0]]);
Kit.add('#pillwaitP', 'opacity', [[EB.pill, 0], [EB.pill + 0.04, 1]]).add('#pillwaitP', 'scale', [[EB.pill, 0.8], [EB.pill + 0.14, 1.2, 'out'], [EB.pill + 0.36, 1, 'inOut']]);
Kit.add('#ringwaitP', 'opacity', [[EB.pill + 0.04, 0], [EB.pill + 0.08, 0.9], [EB.pill + 0.69, 0, 'out']]).add('#ringwaitP', 'scaleX', [[EB.pill + 0.04, 1], [EB.pill + 0.69, 1.22, 'out']]).add('#ringwaitP', 'scaleY', [[EB.pill + 0.04, 1], [EB.pill + 0.69, 1.9, 'out']]);
Kit.pop('#t3', EB.pill + 0.04, { dy: 24 }).out('#t3', F - 0.15, 0.12);
/* F · the receiver confirms */
Kit.add('#scrim2', 'opacity', [[0, 0], [FB.dlg, 0], [FB.dlg + 0.16, 1], [FB.close, 1], [FB.close + 0.12, 0]]);
Kit.add('#dlg2', 'opacity', [[0, 0], [FB.dlg, 0], [FB.dlg + 0.16, 1, 'out'], [FB.close, 1], [FB.close + 0.08, 0]]);
Kit.add('#dlg2', 'scale', [[FB.dlg, 0.95], [FB.dlg + 0.24, 1, 'out'], [FB.close, 1], [FB.close + 0.08, 0.96]]);
Kit.add('#hl2', 'var:--hl-p', [[FB.hl0, 0], [FB.hl1, 1, 'inOut']]);
Kit.add('#cbx2on', 'opacity', [[FB.tick, 0], [FB.tick + 0.01, 1]]).add('#cbx2on', 'scale', [[FB.tick, 0.5], [FB.tick + 0.15, 1, 'outBack']]);
Kit.add('#go2dis', 'opacity', [[FB.tick + 0.02, 1], [FB.tick + 0.1, 0]]);
Kit.add('#n2done', 'scale', [[FB.settle, 0.6], [FB.settle + 0.22, 1, 'outBack']]);
Kit.pop('#setl', FB.settle + 0.08, { dy: 18 });
Kit.pop('#t4', FB.settle + 0.1, { dy: 24 }).out('#t4', G, 0.12);
/* the photo flying into the file input + the app cursor + click ripples: positions measured from the layout */
const CLICKS = [['#rp1', DB.submit, 'btnSubmit'], ['#rp2', DB.inv, 'lnkInv'], ['#rp3', EB.click, 'btnPaid'], ['#rp9', EB.file - 0.08, 'fin2'], ['#rp4', EB.tick, 'cbx1'], ['#rp5', EB.go, 'go1'],
  ['#rp6', FB.click, 'btnConfirm'], ['#rp7', FB.tick, 'cbx2'], ['#rp8', FB.go, 'go2']];
CLICKS.forEach(([s, t]) => { Kit.add(s, 'opacity', [[0, 0], [t, 0], [t + 0.02, 1], [t + 0.4, 0, 'out']]); Kit.add(s, 'scale', [[t, 0.3], [t + 0.4, 1.3, 'out']]); });
const ACUR = [ // [time, target id or [x, y] in #cam coords]
  [DB.fly1 + 0.1, [720, 760]], [DB.submit - 0.3, 'btnSubmit'], [DB.submit + 0.2, 'btnSubmit'], [DB.inv - 0.05, 'lnkInv'],
  [Ep + 0.3, 'lnkInv'], [EB.click - 0.1, 'btnPaid'], [EB.click + 0.05, 'btnPaid'], [EB.type0 - 0.05, 'inp1R'], [EB.pull1 + 0.1, 'inp1R'], [EB.file - 0.2, 'fin2'], [EB.file, 'fin2'], [EB.tick - 0.3, 'cbx1'], [EB.tick + 0.07, 'cbx1'], [EB.go - 0.2, 'go1'], [EB.go + 0.1, 'go1'], [EB.pill + 0.3, [960, 690]],
  [F + 0.25, [960, 690]], [FB.click - 0.1, 'btnConfirm'], [FB.click + 0.05, 'btnConfirm'], [FB.dlg + 0.3, 'cbx2R'], [FB.pull0, 'cbx2R'], [FB.tick - 0.2, 'cbx2'], [FB.tick + 0.07, 'cbx2'], [FB.go - 0.15, 'go2'], [FB.go + 0.15, 'go2'], [FB.settle + 0.5, [900, 830]]
];
Kit.add('#acur', 'opacity', [[0, 0], [DB.fly1 + 0.1, 0], [DB.fly1 + 0.2, 1], [EB.pill + 0.1, 1], [EB.pill + 0.4, 0], [F + 0.15, 0], [F + 0.3, 1], [FB.settle + 0.2, 1], [FB.settle + 0.45, 0]]);

/* ================================================================== H · end card */
Kit.scene('#sH', T.H, T.END + 0.1);
Kit.add('#sH', 'x', [[T.H, 1080], [T.H + 0.32, 0, 'swipe']]);
Kit.pop('#logoE', H + 0.25, { dy: 0 }).add('#logoE', 'scale', [[H + 0.25, 0.92], [H + 0.55, 1, 'out']]);
Kit.add('#webcard', 'opacity', [[H + 0.25, 0], [H + 0.45, 1, 'out']]).add('#webcard', 'y', [[H + 0.25, 40], [H + 0.6, 0, 'out']]);
Kit.add('#webhl', 'clipX', [[H + 1.0, 0], [H + 1.5, 1, 'inOut']]);
Kit.slam('#endpill', HB.pill, { from: 1.2, dur: 0.18 });
Kit.pop('#endurl', HB.url);
Kit.pop('#endnote', HB.note, { dy: 0 }).add('#endnote', 'scale', [[HB.note, 1.35], [HB.note + 0.16, 1, 'slam']]).add('#endnote', 'rotate', [[HB.note, -6], [HB.note + 0.16, -2.5, 'out']]);
Kit.add('#endpill', 'scale', [[HB.pulse, 1], [HB.pulse + 0.15, 1.05, 'out'], [HB.pulse + 0.35, 1, 'inOut']]);

/* ------------------------------------------------------------------ measured layout + per-frame hooks */
let M = null;
function rel(el, root) { let x = 0, y = 0, n = el; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x, y, w: el.offsetWidth, h: el.offsetHeight }; }
function measure() {
  const sP = $('#sP'), prev = sP.style.display; sP.style.display = '';
  const app = $('#app'), m = {};
  /* every view and dialog has to be laid out to be measured */
  const hidden = [...document.querySelectorAll('#cam .pgv, #cam .dlg')].map(e => [e, e.style.display]);
  hidden.forEach(([e]) => { e.style.display = 'block'; });
  const ctr = (id, dx, dy) => { const r = rel(document.getElementById(id), app); return [r.x + (dx == null ? r.w / 2 : dx), r.y + (dy == null ? r.h / 2 : dy)]; };
  m.btnSubmit = ctr('btnSubmit', 330); m.lnkInv = ctr('lnkInv', 60); m.btnPaid = ctr('btnPaid', 300);
  m.inp1R = ctr('inp1', 520); m.fin2 = ctr('fin2', 62); m.cbx1 = ctr('cbx1'); m.go1 = ctr('go1');
  m.btnConfirm = ctr('btnConfirm', 330); m.cbx2 = ctr('cbx2'); m.cbx2R = [m.cbx2[0] + 140, m.cbx2[1] + 50]; m.go2 = ctr('go2');
  /* the view scroll (v5, v6) is a style top on .pgs, which offsetTop already includes */
  const fin = rel($('#fin'), app), S = L.appS;   // #app is drawn at L.appVisX, L.appY, scaled S
  m.fin = { x: L.appVisX + (fin.x + 150) * S, y: L.appY + fin.y * S, h: fin.h * S };
  /* camera push targets (cam coords): the dialog's top edge just under the URL bar, its warning box's left edge in view,
     and the highlighted phrase fully inside the frame */
  const W = 1000 / ZOOM, Hh = 920 / ZOOM, bar = 52 / ZOOM;
  const push = (hl, wb, dl) => {
    const p = rel($(hl), app), b = rel($(wb), app), d = rel($(dl), app);
    let x = Math.min(b.x - 24, p.x - 60); x = Math.max(x, p.x + p.w + 60 - W); x = Math.max(0, Math.min(1000 - W, x));
    let y = d.y - bar + 1; y = Math.max(y, p.y + p.h + 16 - Hh); y = Math.max(0, Math.min(920 - Hh, y));
    return { x, y, w: W, h: Hh };
  };
  m.z1 = push('#hl1', '#warn1', '#dlg1'); m.z2 = push('#hl2', '#warn2', '#dlg2');
  CLICKS.forEach(([s, , k]) => { const el = $(s); el.style.left = m[k][0] + 'px'; el.style.top = m[k][1] + 'px'; });
  hidden.forEach(([e, d]) => { e.style.display = d; });
  sP.style.display = prev;
  return m;
}
function cursorAt(t, keys, pos) {
  if (t <= keys[0][0]) return pos(keys[0][1]);
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i];
    if (t < b[0]) { if (b[2] === 'hold') return pos(a[1]); const p = E.inOut((t - a[0]) / (b[0] - a[0])); const A = pos(a[1]), B = pos(b[1]); return [A[0] + (B[0] - A[0]) * p, A[1] + (B[1] - A[1]) * p]; }
  }
  return pos(keys[keys.length - 1][1]);
}
/* the window flips when the screen changes hands: 0 → 90° (edge-on at the cut) → -90° → 0 */
function flipAt(t) {
  for (const t0 of [Ep, F]) {
    if (t >= t0 - 0.15 && t < t0) return 90 * E.in((t - (t0 - 0.15)) / 0.15);
    if (t >= t0 && t < t0 + 0.2) return -90 * (1 - E.out((t - t0) / 0.2));
  }
  return 0;
}
const appEl = $('#app'), camEl = $('#cam');
Kit.each(t => {
  if (!M) M = measure();
  /* hook cursor */
  const mc = cursorAt(t, MCUR.map(k => [k[0], [k[1], k[2]]]), v => v);
  $('#mcur').style.transform = `translate(${mc[0]}px,${mc[1]}px)`;
  /* whose screen: blue = main contractor (payer), amber = subcontractor (receiver) */
  const mcView = t >= Ep && t < F;
  appEl.classList.toggle('r-mc', mcView); appEl.classList.toggle('r-sc', !mcView);
  const a = flipAt(t);
  const sc = L.appS !== 1 ? `scale(${L.appS})` : '';
  appEl.style.transform = Math.abs(a) > 0.001 ? `${sc} perspective(2600px) rotateY(${a.toFixed(3)}deg)` : (sc || 'none');
  /* camera push inside the window (the URL bar stays put) */
  const p1 = ez(t, EB.push0, EB.push1) - ez(t, EB.pull0, EB.pull1), p2 = ez(t, FB.push0, FB.push1) - ez(t, FB.pull0, FB.pull1);
  const p = Math.max(p1, p2), Z = p1 >= p2 ? M.z1 : M.z2;
  /* while pushed in, the zoomed layer's text runs past the window and is clipped by #app (overflow:hidden). Kit's QA can't see
     clipping, so the layer is skipped by QA only during the push; those frames are checked by eye (post.md → QA). */
  camEl.toggleAttribute('data-qa-ignore', p > 0.0005);
  if (p > 0.0005) {
    const x = Z.x * p, y = Z.y * p, w = 1000 + (Z.w - 1000) * p, z = 1000 / w;
    camEl.style.transform = `translate(${(-x * z).toFixed(2)}px,${(-y * z).toFixed(2)}px) scale(${z.toFixed(4)})`;
  } else camEl.style.transform = 'none';
  /* app cursor (+ a small press on each click) */
  const ac = cursorAt(t, ACUR, v => typeof v === 'string' ? M[v] : v);
  let press = 1; CLICKS.forEach(([, tc]) => { if (t >= tc - 0.06 && t < tc + 0.12) press = 0.86; });
  $('#acur').style.transform = `translate(${ac[0] - 6}px,${ac[1] - 4}px) scale(${press})`;
  /* the proof photo: big card → flies into the file input */
  const ph = $('#photo'), f = ez(t, DB.fly0, DB.fly1, 'swipe');
  if (f > 0) {
    const s1 = (M.fin.h - 6 * L.appS) / 506, x1 = M.fin.x, y1 = M.fin.y + 3 * L.appS, Y0 = L.photoY;
    const s = 1 + (s1 - 1) * f, x = 90 + (x1 - 90) * f, y = Y0 + (y1 - Y0) * f;
    ph.style.transform = `translate(${x - 90}px,${y - Y0}px) scale(${s})`;
  }
});

Kit.ready({ duration: T.END, fonts: ['700 80px "Space Grotesk"', '600 40px "Space Grotesk"', '700 100px Caveat', '600 30px Inter', '400 30px Inter', '700 30px Inter', '500 22px "JetBrains Mono"', '600 22px "JetBrains Mono"'] });
})();
