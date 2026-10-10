/* Day 23 of one signature: QSME Global. One timeline, two cuts.
   day-23.html       → body.build.r4x5  (LinkedIn 4:5, safe box 60,60,1020,1290)
   day-23-9x16.html  → body.build.r9x16 (YouTube Shorts 9:16, safe box 65,300,1015,1250)
   Timings are identical in both, so vo-script.json fits both MP4s.
   2026-10-06 AUDIO-FIRST REMAKE (owner-approved N01 standard: a spoken hook in the first 2 s, continuous speech, no gap over
   1 s, ONE unbroken eleven_v3 take, picture follows audio): the Cam S take outputs/vo-take-cam-v3/take.mp3 (39.9 s, one
   with-timestamps request laid at 0.0) is the clock. Every beat below sits on its word in alignment.json; the page runs
   41.4 s (take + ~1.5 s tail). Design unchanged; captions are phrases lifted from the narration.
     0.00–3.0   hook "Day twenty-three of chasing one signature." over the giant DAY 23 (pill pulses on "signature."); the counter
                rewinds 23 → 01 under "Sent it day one" (2.16–3.18) and shrinks into the header
     2.85–11.8  the thread: Day 1 attachment on "one." (3.18), then each reply pops as the narrator reads it: "Will sign tonight"
                4.56 → DAY 4, "Went to junk" 5.82 → DAY 9, "Out of toner" 7.43 → DAY 15, "Signed and scanned" 8.47 → DAY 22,
                "Day twenty-three," 10.35 → the Scan_0001.pdf attachment; it opens on "the scan" (11.42)
     11.4–17.75 the scan: the viewer lands under "lands sideways" (11.75), "11 pages" pulses on "Eleven pages" (13.05), caption
                "Scanner skipped page 7." (14.43), red ring on the 6 | 8 seam under "skipped page" (14.95), "7?" on "seven"
                (15.5), caption "Retention." (16.43)
     17.65–20.6 the 23-day grid fills under "Crew's been" (17.85), caption "On site since Day 2." on "site" (18.6)
     20.55–25.65 S5a: QSME logo on "Or." (20.7); caption "Your own subcontract PDF." on "your own" (21.95); the cursor ticks
                "Sign it as it is" on "as it is" (24.37) with "Sent as it is." (24.37); "Send for signing" clicked on "is." (24.95);
                the list row "Out for signing" (25.24)
     25.55–28.15 S5b: the phone lands on "link" (25.73); "One link." (25.62) / "On their phone." (26.23) / "Nothing to install."
                (26.85); tick 25.95, name types 26.15–26.65, signature 26.72–27.28, Sign 27.4, "Signed." 27.55
     28.05–32.35 S5c: the row flips to "Everyone has signed" on "signed" (28.61); certificate slides in on "copy has" (29.1);
                "Every page you sent." (29.49); the strip lays out 29.8–30.1; green ring + "Page 7 included." on "Page seven" (30.98)
     32.3–36.0  close: "Still can't fix junk folders." (32.45) / "No printer needed, though." (34.59)
     35.9–41.4  end card: logo 35.93, "Book a 30-minute demo" pops on "Book" (36.08), qsme.build on screen 36.0–41.4 (5.4 s) */
(function () {
const R9 = document.body.classList.contains('r9x16');
/* layout numbers the script needs (everything else is CSS in day-23.css) */
const L = R9 ? {
  ctrTop: 575, hdrY: 372, threadMax: 700, gx0: 65, gw: 950, cellA: 616, cellB: 766, dayNum: 872, pageK: 0.62,
  curStart: [860, 1060], pstripTop: 900,
} : {
  ctrTop: 522, hdrY: 128, threadMax: 950, gx0: 60, gw: 960, cellA: 458, cellB: 640, dayNum: 788, pageK: 0.95,
  curStart: [840, 1040], pstripTop: 884,
};
const LABEL = 'Recreated screen · demo data';
const LOCK = '<svg width="14" height="17" viewBox="0 0 20 24"><rect x="2" y="10" width="16" height="12" rx="3" fill="none" stroke="#94A3A0" stroke-width="2.6"/><path d="M6 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#94A3A0" stroke-width="2.6"/></svg>';
const SIGPATH = 'M24 92 C 40 30, 74 26, 62 66 C 52 104, 18 104, 40 74 C 60 48, 100 48, 108 78 C 112 92, 102 100, 120 86 C 136 70, 140 58, 150 78 C 158 96, 170 66, 180 60 C 190 54, 186 94, 202 88 C 222 78, 230 44, 250 54 C 266 62, 254 96, 276 84 C 298 72, 310 64, 350 66';

document.getElementById('root').innerHTML = `
  <svg width="0" height="0" style="position:absolute"><filter id="vb" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur id="vbg" stdDeviation="0 0"/></filter></svg>

  <!-- S1 HOOK + persistent header (counter lives outside scenes) -->
  <div id="chip" class="abs chip top-chip">Plasterboard &amp; ceilings · subcontract</div>
  <div id="s1" class="fill">
    <div id="k1" class="abs display">Subcontract signature:</div>
    <div id="pill1" class="abs amberpill"><i></i>Not signed</div>
    <div id="rw" class="abs">◀◀</div>
  </div>
  <div id="hdr" class="fill">
    <div id="hk" class="abs display">Subcontract signature</div>
    <div id="hp" class="abs amberpill"><i></i>Not signed</div>
  </div>

  <!-- S2 THE THREAD: five innocent replies, each date-stamped -->
  <div id="s2" class="fill">
    <div id="thread" class="abs ui">
      <div class="hd"><div class="avatar">SW</div><div><b>Sam W.</b><small>Ceilings subcontractor</small></div></div>
      <div id="msgs"></div>
    </div>
  </div>

  <!-- S3 THE SCAN: Day 23, fed in sideways, the scanner skipped page 7 -->
  <div id="s3" class="fill">
    <div id="viewer" class="abs">
      <div class="tb"><div class="fn"><i></i>Scan_0001.pdf</div><div class="pg"><span id="pgc">11 pages</span><svg width="34" height="34" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" fill="none" stroke="#B4B4BA" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
      <div class="main">
        <div id="page"><div class="shadow"></div>
          <h4>SUBCONTRACT AGREEMENT</h4><h5>Plasterboard &amp; ceilings</h5>
          <div class="ln" style="width:92%;margin-top:34px"></div><div class="ln" style="width:84%"></div><div class="ln" style="width:88%"></div><div class="ln" style="width:60%"></div>
          <div class="ln" style="width:90%;margin-top:30px"></div><div class="ln" style="width:86%"></div><div class="ln" style="width:72%"></div>
          <div class="ln" style="width:88%;margin-top:30px"></div><div class="ln" style="width:80%"></div><div class="ln" style="width:52%"></div>
          <div class="ft">Page 1 of 12</div>
        </div>
      </div>
      <div class="strip2" id="strip2"></div>
    </div>
    <svg id="ring7" class="abs" width="200" height="110" viewBox="0 0 200 110"><path id="ring7p" d="M150 14 C 92 2, 14 18, 12 56 C 10 96, 130 104, 178 82 C 204 68, 196 30, 150 16 C 136 12, 118 10, 100 12" fill="none" stroke="#E0302A" stroke-width="7" stroke-linecap="round"/></svg>
    <div id="p7q" class="abs">7?</div>
    <div id="c-p7a" class="cap m">Scanner skipped page 7.</div>
    <div id="c-p7" class="cap"><span class="r">Retention.</span></div>
  </div>

  <!-- S4 ON SITE SINCE DAY 2 -->
  <div id="s4" class="fill">
    <div class="rowlbl" id="lblA">ON SITE · CEILINGS CREW</div>
    <div class="rowlbl" id="lblB">SUBCONTRACT · SIGNED</div>
    <div id="cellsA"></div><div id="cellsB"></div><div id="daynums"></div>
    <div id="c-site" class="cap">On site since<br><span style="color:var(--amber-ink)">Day 2.</span></div>
  </div>

  <!-- S5a PRODUCT: our own subcontract PDF → Sign it as it is → Send for signing (recreated) -->
  <div id="s5a" class="fill">
    <div id="w-app1" class="wrap">
      <div id="app1" class="app" style="height:760px">
        <div class="chrome"><i></i><i></i><i></i><div class="url">${LOCK}<span></span></div></div>
        <div class="ph"><div><h3>Agreements</h3><p>Write it, send it, get it signed</p></div><div class="avatar">DC</div></div>
        <div id="row-a" class="row" style="top:292px"><div class="ic"></div><div class="tx"><b>Subcontract — Plasterboard &amp; ceilings</b><small>Sam Whitfield</small></div>
          <div class="st"><div class="amb" id="a-amb"><i></i>Out for signing</div></div></div>
        <div id="row-a-sub" class="abs" style="left:36px;right:36px;top:222px;font:400 24px/1.3 Inter,sans-serif;color:#64748B;padding-left:4px"><b style="font-weight:700;color:#92400E">Out for signing</b> — Sent, and waiting on somebody else.</div>
        <div id="shade1" class="shade"></div>
        <div id="dlg" class="dlg" style="top:200px">
          <div class="file"><div class="ic"></div><div><b>Subcontract_Ceilings.pdf</b><small>12 pages · PDF</small></div></div>
          <div class="opts">
            <div class="opt"><span>Keep every word</span></div>
            <div class="opt"><span>Write it up as a proper agreement</span></div>
            <div class="opt" id="opt-sign"><div class="sel" id="opt-sel"></div><span>Sign it as it is</span><div class="tick" id="opt-tick"><svg width="34" height="34" viewBox="0 0 34 34"><path d="M10 17.5l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
            <div class="opt"><span>Let AI read it</span></div>
          </div>
          <div class="foot"><div class="signer"><div class="avatar">SW</div>Sam Whitfield<small>signer</small></div>
            <div class="btn" id="btn-send"><div class="off" id="btn-off"></div><span>Send for signing</span></div></div>
        </div>
      </div>
    </div>
    <div class="ill2 ill-tr">${LABEL}</div>
    <div id="c-own" class="cap">Your own subcontract PDF.<br><span class="g" id="c-own2">Sent as it is.</span></div>
  </div>

  <!-- S5b PRODUCT: signing on a phone, in the phone's browser (recreated) -->
  <div id="s5b" class="fill">
    <img id="bg-site" class="abs" src="clips/site/f_00000.jpg" alt="">
    <div id="bg-dim" class="fill"></div>
    <div id="phone" class="abs">
      <div id="scr">
        <div class="sb"><span>7:42</span><span>●●● ▮</span></div>
        <div class="bar"><svg width="13" height="16" viewBox="0 0 20 24"><rect x="2" y="10" width="16" height="12" rx="3" fill="none" stroke="#7B8783" stroke-width="2.6"/><path d="M6 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#7B8783" stroke-width="2.6"/></svg><span></span></div>
        <div class="bd">
          <h6>Subcontract — Plasterboard &amp; ceilings</h6>
          <div class="meta">12 pages · PDF</div>
          <div class="pgs"><i></i><i></i><i></i><i></i><i></i><i></i><em>+6</em></div>
          <div class="consent"><div class="box"><div class="on" id="box-on"><svg width="34" height="34" viewBox="0 0 34 34" style="position:absolute;left:-1px;top:-1px"><path d="M9 17.5l5 5 10-11" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div><div>I have read this agreement and I agree to sign it electronically.</div></div>
          <div class="lab">Your full name</div>
          <div class="inp"><span id="nm">Sam Whitfield</span></div>
          <div class="lab">Your signature</div>
          <div class="pad"><div class="base"></div><svg id="sigsvg" width="370" height="140" viewBox="0 0 370 140" style="position:absolute;left:8px;top:12px"><path id="sigp" d="${SIGPATH}" fill="none" stroke="#0F172A" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div class="sbtn" id="sbtn">Sign</div>
        </div>
        <div id="done">
          <div class="ok"><svg width="64" height="64" viewBox="0 0 34 34"><path d="M8 17.5l6 6 12-13" fill="none" stroke="#16A34A" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <h5>Signed.</h5>
          <p>Download a copy below<br>and keep it.</p>
          <div class="dl"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="#0F172A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Signed copy (PDF)</div>
        </div>
        <div id="tap1" class="tap"></div><div id="tap2" class="tap"></div><div id="tap3" class="tap"></div>
      </div>
    </div>
    <div id="k-l1" class="stk">One link.</div>
    <div id="k-l2" class="stk">On their phone.</div>
    <div id="k-l3" class="stk g">Nothing to install.</div>
    <div class="ill2" id="ill-b">${LABEL}</div>
  </div>

  <!-- S5c PRODUCT: Out for signing → Everyone has signed, certificate page, every page you sent (recreated) -->
  <div id="s5c" class="fill">
    <div id="w-app2" class="wrap">
      <div id="app2" class="app" style="height:470px">
        <div class="chrome"><i></i><i></i><i></i><div class="url">${LOCK}<span></span></div></div>
        <div class="ph"><div><h3>Agreements</h3><p>Write it, send it, get it signed</p></div><div class="avatar">DC</div></div>
        <div class="row" style="top:230px"><div class="flash" id="r2-flash"></div><div class="ic"></div><div class="tx"><b>Subcontract — Plasterboard &amp; ceilings</b><small>Sam Whitfield</small></div>
          <div class="st"><div class="amb" id="b-amb"><i></i>Out for signing</div><div class="grn" id="b-grn"><i></i>Everyone has signed</div></div></div>
      </div>
    </div>
    <div id="w-cert" class="wrap">
      <div id="cert">
        <div class="k">CERTIFICATE PAGE</div>
        <h5>Subcontract — Plasterboard &amp; ceilings</h5>
        <div class="tbl">
          <div class="tr"><b>Signer</b><span>Sam Whitfield</span></div>
          <div class="tr"><b>Typed name</b><span>Sam Whitfield</span></div>
          <div class="tr"><b>Consent</b><span>✓ “I have read this agreement and I agree to sign it electronically.”</span></div>
          <div class="tr"><b>Signed</b><span>15 Oct 2026, 7:42 am</span></div>
          <div class="tr"><b>Email</b><span class="red" style="width:250px"></span></div>
          <div class="tr"><b>Network address</b><span class="red" style="width:190px"></span></div>
          <div class="tr"><b>Device</b><span class="red" style="width:220px"></span></div>
          <div class="tr"><b>Fingerprint</b><code>SHA-256 · 3f9a…c41e</code></div>
        </div>
      </div>
    </div>
    <div id="pstrip" class="abs" style="left:0;top:${L.pstripTop}px;width:1080px;height:130px"></div>
    <svg id="ring7g" class="abs" width="132" height="176" viewBox="0 0 132 176"><path id="ring7gp" d="M98 12 C 48 -2, 8 40, 10 96 C 12 156, 114 182, 124 112 C 132 60, 114 22, 74 12" fill="none" stroke="#4BCD32" stroke-width="6" stroke-linecap="round"/></svg>
    <div class="ill2 ill-tr">${LABEL}</div>
    <div id="c-pdf" class="cap">Every page you sent.<br><span class="g" id="c-pdf2">Page 7 included.</span></div>
  </div>

  <!-- S6 CLOSE: a callback to Day 9 and Day 15, the joke on us -->
  <div id="s6" class="fill">
    <div id="c-l1" class="cap">Still can’t fix<br>junk folders.</div>
    <div id="c-l2" class="cap"><span class="g">No printer needed,<br>though.</span></div>
  </div>

  <!-- END CARD (wordmark without ®: registration unconfirmed outside NZ) -->
  <div id="end" class="fill">
    <img id="e-logo" src="qsme-logo-nor.svg" alt="QSME">
    <div id="e-line" class="display">Your subcontract,<br>signed from a link.</div>
    <div id="e-cta" class="pill">Book a 30-minute demo</div>
    <div id="e-url" class="display">qsme.build</div>
  </div>

  <!-- persistent: product logo (S5), the day counter (S1–S4), cursor -->
  <img id="p-logo" class="abs" src="qsme-logo-nor.svg" alt="QSME">
  <div id="ctr" class="abs"><span class="lbl">DAY</span><div class="dig" id="dig" data-qa-ignore><div class="col"><div class="strip" id="st10"></div></div><div class="col"><div class="strip" id="st1"></div></div></div></div>
  <svg id="cur" class="cursor" viewBox="0 0 44 56"><path d="M4 3 L4 44 L14 34 L21 51 L29 47.5 L22 31 L36 31 Z" fill="#FFFFFF" stroke="#111" stroke-width="3" stroke-linejoin="round"/></svg>
`;
const $ = s => document.querySelector(s);
const rootRect = $('#root').getBoundingClientRect();
const rect = s => { const r = $(s).getBoundingClientRect(); return { l: r.left - rootRect.left, t: r.top - rootRect.top, r: r.right - rootRect.left, b: r.bottom - rootRect.top, w: r.width, h: r.height }; };

/* ===================== timeline map (seconds) — AUDIO-FIRST: every beat sits on its word in outputs/vo-take-cam-v3/alignment.json ===================== */
const T = { s1: [0, 3.0], hdr: [2.75, 20.6], s2: [2.85, 11.8], s3: [11.4, 17.75], s4: [17.65, 20.6], s5a: [20.55, 25.65], s5b: [25.55, 28.15], s5c: [28.05, 32.35], s6: [32.3, 36.0], end: [35.9, 41.41] };
const DURATION = 41.4;                                   // take ends 39.92 + ~1.5 s tail
Object.entries(T).forEach(([id, [a, b]]) => Kit.scene('#' + id, a, b));
Kit.scene('#ctr', 0, 20.6);

/* ===================== the day counter: an odometer driven by one value track ===================== */
['#st10', '#st1'].forEach((s, k) => { $(s).innerHTML = Array.from({ length: k ? 11 : 10 }, (_, i) => `<div>${i % 10}</div>`).join(''); });
// day value: 23 on frame 1, rewind to 01 under "Sent it day one" (2.16–3.18), then roll to each reply's day as its words are said
const MSG_T = [3.18, 4.56, 5.82, 7.43, 8.47, 10.35];     // "one." · "Will sign tonight" · "Went to junk" · "Out of toner" · "Signed and scanned" · "Day twenty-three,"
const DAYS = [1, 4, 9, 15, 22, 23];
const CK = [[0, 23], [2.15, 23], [2.95, 1, 'inOut']];
for (let i = 1; i < DAYS.length; i++) CK.push([MSG_T[i] - 0.3, DAYS[i - 1]], [MSG_T[i], DAYS[i], 'out']);
const ck = CK.map(k => ({ t: k[0], v: k[1], e: k[2] ? Kit.ease[k[2]] : (x => x) }));
function dayAt(t) { if (t <= ck[0].t) return ck[0].v; for (let i = 1; i < ck.length; i++) { const a = ck[i - 1], b = ck[i]; if (t < b.t) return a.v + (b.v - a.v) * b.e((t - a.t) / (b.t - a.t)); } return ck[ck.length - 1].v; }
const st1 = $('#st1'), st10 = $('#st10'), vbg = $('#vbg'), dig = $('#dig');
Kit.each(t => {
  const v = dayAt(t), ones = ((v % 10) + 10) % 10, tens = Math.floor(v / 10 + 1e-9) + Math.max(0, ones - 9);
  st1.style.transform = `translateY(${-ones}em)`; st10.style.transform = `translateY(${-tens}em)`;
  const speed = Math.abs(dayAt(t + 1 / 60) - dayAt(t - 1 / 60)) * 30;          // days per second
  const b = Math.min(18, speed * 0.55);
  vbg.setAttribute('stdDeviation', '0 ' + b.toFixed(2));
  dig.style.filter = b > 0.3 ? 'url(#vb)' : 'none';
});
// big (hook) → header (thread); origin top-left. 440 px digits → ~168 px.
const HS = 0.382;
Kit.add('#ctr', 'scale', [[0, 1], [2.2, 1], [2.8, HS, 'inOut']]);
Kit.add('#ctr', 'y', [[0, 0], [2.2, 0], [2.8, L.hdrY - L.ctrTop, 'inOut']]);
Kit.add('#ctr', 'opacity', [[0, 1], [20.45, 1], [20.6, 0]]);

/* ===================== S1 HOOK (0–3.0): complete on frame 0, pill included; "Day twenty-three of chasing one signature." 0.00–1.96 ===================== */
Kit.add('#k1', 'opacity', [[0, 1], [2.15, 1], [2.35, 0]]);
Kit.add('#pill1', 'opacity', [[0, 1], [2.15, 1], [2.3, 0]]);
Kit.add('#pill1', 'scale', [[0, 1], [1.3, 1], [1.42, 1.08, 'out'], [1.62, 1, 'inOut']]);      // pulses on "signature."
Kit.add('#rw', 'opacity', [[0, 0], [2.17, 0], [2.2, 1, 'hold'], [2.36, 0.35, 'hold'], [2.46, 1, 'hold'], [2.66, 0, 'hold']]);
Kit.add('#rw', 'x', [[2.17, 0], [2.66, -40]]);
Kit.add('#chip', 'opacity', [[0, 1], [20.45, 1], [20.6, 0]]);
Kit.fade('#hk', 2.7, 2.9); Kit.fade('#hp', 2.77, 2.95);

/* ===================== S2 THE THREAD (2.85–11.8): each reply pops as the narrator reads it ===================== */
const M = [
  { side: 'out', y: 116, h: 150, html: `<div class="att"><div class="ic"><i style="top:14px"></i><i style="top:24px"></i><i style="top:34px"></i></div><div><b>Subcontract_Ceilings.pdf</b><small>12 pages · please sign</small></div></div>`, stamp: 'DAY 1' },
  { side: 'in', y: 324, h: 92, html: `<div class="bub">Will sign tonight 👍</div>`, stamp: 'DAY 4' },
  { side: 'in', y: 440, h: 92, html: `<div class="bub">Can you resend? Went to junk</div>`, stamp: 'DAY 9' },
  { side: 'in', y: 556, h: 92, html: `<div class="bub">Printer’s out of toner</div>`, stamp: 'DAY 15' },
  { side: 'in', y: 672, h: 92, html: `<div class="bub">Signed and scanned!</div>`, stamp: 'DAY 22' },
  { side: 'in', y: 788, h: 132, html: `<div class="att"><div class="ic" style="transform:rotate(-90deg) scale(.82)"><i style="top:14px"></i><i style="top:24px"></i><i style="top:34px"></i></div><div><b>Scan_0001.pdf</b><small>11 pages</small></div></div>`, stamp: 'DAY 23' },
];
const msgs = $('#msgs');
M.forEach((m, i) => {
  const pos = m.side === 'out' ? `right:28px;top:${m.y}px` : `left:28px;top:${m.y}px`;
  msgs.insertAdjacentHTML('beforeend', `<div class="msg ${m.side}" id="m${i}" style="${pos}">${m.html}</div>`);
  const sx = m.side === 'out' ? 'left:44px' : 'right:44px';
  msgs.insertAdjacentHTML('beforeend', `<div class="stamp ${m.side === 'out' ? 'sL' : 'sR'}" id="sp${i}" style="${sx};top:${m.y + m.h / 2 - 30}px">${m.stamp}</div>`);
});
msgs.insertAdjacentHTML('beforeend', `<div class="sent" id="sent0" style="right:34px;top:${116 + 150 + 8}px">Sent</div>`);
Kit.add('#thread', 'opacity', [[2.85, 0], [3.0, 1, 'out']]);
Kit.add('#thread', 'y', [[2.85, 60], [3.1, 0, 'out']]);
// the card grows with the conversation; once it reaches its max height (9:16), the messages scroll up like a real chat
const HK = [[2.85, 116 + 150 + 62]], SK = [[0, 0]];
let prevScroll = 0;
M.forEach((m, i) => {
  if (!i) return;
  const t = MSG_T[i], need = m.y + m.h + 30, prevNeed = M[i - 1].y + M[i - 1].h + (i === 1 ? 62 : 30);
  HK.push([t - 0.04, Math.min(L.threadMax, prevNeed)], [t + 0.2, Math.min(L.threadMax, need), 'out']);
  const sc = Math.max(0, need - L.threadMax);
  if (sc !== prevScroll) { SK.push([t - 0.04, -prevScroll], [t + 0.2, -sc, 'out']); prevScroll = sc; }
});
Kit.add('#thread', 'height', HK);
Kit.add('#msgs', 'y', SK);
M.forEach((m, i) => {
  const t = MSG_T[i];
  Kit.pop('#m' + i, t, { dy: 26, dur: 0.22 });
  Kit.add('#m' + i, 'scale', [[t, 0.94], [t + 0.22, 1, 'outBack']]);
  Kit.add('#sp' + i, 'opacity', [[t + 0.16, 0], [t + 0.19, 1]]);
  Kit.add('#sp' + i, 'scale', [[t + 0.16, 1.3], [t + 0.3, 1, 'slam']]);   // anchored to the card's inner edge: never spills past it
  Kit.add('#sp' + i, 'rotate', [[0, i % 2 ? -6 : 5]]);
});
Kit.fade('#sent0', 3.5, 3.65);                                             // "Twelve pages." 3.51
// open the Day 23 attachment on "the scan" (11.42)
Kit.add('#m5', 'scale', [[11.35, 1], [11.4, 0.96], [11.48, 1]]);
Kit.add('#thread', 'opacity', [[11.45, 1], [11.65, 0.25]]);

/* ===================== S3 THE SCAN (11.4–17.75): "lands sideways" 11.75 · "Eleven pages" 13.05 · "Scanner skipped page seven" 14.43 · "Retention" 16.43 ===================== */
const strip2 = $('#strip2');
const PAGES = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
const X0 = (960 - PAGES.length * 80) / 2 + 8;
PAGES.forEach((p, i) => {
  const x = X0 + i * 80;
  strip2.insertAdjacentHTML('beforeend', `<div class="th" id="th${p}" style="left:${x}px"><i style="left:12px"></i><i style="left:22px"></i><i style="left:32px"></i></div><div class="thn" id="pn${p}" style="left:${x}px">${p}</div>`);
});
{ // ring the 6 | 8 seam, wherever the viewer sits in this cut
  const a = rect('#th6'), b = rect('#th8'), s = rect('#strip2');
  const seamX = (a.r + b.l) / 2, seamY = s.t + 108;
  Object.assign($('#ring7').style, { left: (seamX - 100) + 'px', top: (seamY - 55) + 'px' });
  Object.assign($('#p7q').style, { left: (seamX + 70) + 'px', top: (seamY - 190) + 'px' });
}
Kit.add('#viewer', 'opacity', [[11.42, 0], [11.54, 1, 'out']]);
Kit.add('#viewer', 'scale', [[11.42, 0.82], [11.75, 1, 'out']]);
Kit.add('#page', 'rotate', [[0, -90.8]]);
Kit.add('#page', 'scale', [[0, L.pageK]]);
Kit.add('#pgc', 'scale', [[13.05, 1], [13.17, 1.14, 'out'], [13.4, 1, 'inOut']]);           // "Eleven pages"
Kit.add('#ring7p', 'trim', [[14.95, 0], [15.4, 1, 'out']]);                               // ring the seam on "skipped page"
Kit.pop('#p7q', 15.5, { dy: 0, fade: 0.06 });                                              // "seven"
Kit.add('#p7q', 'scale', [[15.5, 1.25], [15.65, 1, 'out']]);
Kit.pop('#c-p7a', 14.43, { dy: 18 });                                                      // "Scanner skipped page 7."
Kit.pop('#c-p7', 16.43, { dy: 22 });                                                       // "Retention."
Kit.add('#s3', 'opacity', [[17.6, 1], [17.75, 0]]);

/* ===================== S4 ON SITE SINCE DAY 2 (17.65–20.6): "Crew's been on site since day two." 17.84–19.84 ===================== */
const cellsA = $('#cellsA'), cellsB = $('#cellsB'), dn = $('#daynums');
const CW = 36, GAP = (L.gw - 23 * CW) / 22;
for (let d = 1; d <= 23; d++) {
  const x = L.gx0 + (d - 1) * (CW + GAP);
  cellsA.insertAdjacentHTML('beforeend', `<div class="cell cellA" style="left:${x}px;top:${L.cellA}px">${d >= 2 ? `<div class="fillA" id="fa${d}"></div>` : ''}</div>`);
  cellsB.insertAdjacentHTML('beforeend', `<div class="cell cellB" style="left:${x}px;top:${L.cellB}px"></div>`);
  if (d === 1 || d === 2) dn.insertAdjacentHTML('beforeend', `<div class="daynum" style="top:${L.dayNum}px;left:${x + CW / 2 - 40}px;${d === 2 ? 'color:var(--amber-ink)' : ''}">${d}</div>`);
  if (d === 23) dn.insertAdjacentHTML('beforeend', `<div class="daynum" style="top:${L.dayNum}px;left:${L.gx0 + L.gw - 80}px;text-align:right">23</div>`);
}
Kit.add('#s4', 'opacity', [[17.65, 0], [17.8, 1, 'out']]);
for (let d = 2; d <= 23; d++) { const t = 17.85 + (d - 2) * 0.028; Kit.add('#fa' + d, 'opacity', [[t, 0], [t + 0.08, 1]]); }   // the bar fills under "Crew's been"
Kit.pop('#c-site', 18.6, { dy: 24 });                                                      // "on site since day two" (site 18.70)
Kit.add('#s4', 'opacity', [[20.45, 1], [20.6, 0]]);
Kit.add('#hdr', 'opacity', [[20.45, 1], [20.6, 0]]);

/* ===================== S5a OUR OWN PDF → Sign it as it is → Send for signing (20.55–25.65): "Or." 20.71 · "your own subcontract PDF" 21.95 · "as it is" 24.37 ===================== */
Kit.add('#p-logo', 'opacity', [[0, 0], [20.57, 0], [20.8, 1, 'out'], [32.16, 1], [32.31, 0]]);
Kit.add('#app1', 'opacity', [[20.55, 0], [20.7, 1, 'out']]);
Kit.add('#app1', 'y', [[20.55, 50], [20.8, 0, 'out']]);
Kit.add('#opt-sel', 'opacity', [[0, 0], [24.33, 0], [24.37, 1]]);
Kit.add('#opt-tick', 'opacity', [[0, 0], [24.35, 0], [24.41, 1]]);
Kit.add('#opt-tick', 'scale', [[24.35, 0.4], [24.53, 1, 'outBack']]);
Kit.add('#btn-off', 'opacity', [[0, 1], [24.41, 1], [24.53, 0]]);
Kit.add('#btn-send', 'scale', [[24.92, 1], [24.96, 0.95], [25.04, 1]]);
Kit.add('#dlg', 'opacity', [[25.1, 1], [25.23, 0]]);
Kit.add('#dlg', 'scale', [[25.1, 1], [25.23, 0.97]]);
Kit.add('#shade1', 'opacity', [[0, 1], [25.1, 1], [25.26, 0]]);
Kit.add('#row-a', 'opacity', [[0, 0], [25.24, 0], [25.38, 1, 'out']]);
Kit.add('#row-a', 'y', [[25.24, 20], [25.42, 0, 'out']]);
Kit.add('#row-a-sub', 'opacity', [[0, 0], [25.26, 0], [25.4, 1]]);
Kit.pop('#c-own', 21.95, { dy: 22 });                                                      // "your own subcontract PDF"
Kit.add('#c-own2', 'opacity', [[0, 0], [24.37, 0], [24.49, 1, 'out']]);                   // "as it is"
{ // cursor targets measured from the dialog as laid out in this cut (cursor tip = element's x/y)
  const o = rect('#opt-sign'), bt = rect('#btn-send');
  const optSign = { x: o.l + o.w * 0.5, y: o.t + o.h * 0.58 }, btnSend = { x: bt.l + bt.w * 0.55, y: bt.t + bt.h * 0.6 };
  // start inside the dialog (gap under the options, right column), never on the caption below it (2026-10-10 review: L.curStart sat on "PDF.")
  const cx0 = bt.l + bt.w * 0.5, cy0 = (o.t + o.h + bt.t) / 2;
  Kit.add('#cur', 'opacity', [[0, 0], [23.15, 0], [23.3, 1], [25.0, 1], [25.15, 0]]);   // hidden until it moves (was 20.75: sat on "PDF.")
  Kit.add('#cur', 'x', [[23.3, cx0], [23.95, optSign.x, 'inOut'], [24.5, optSign.x], [24.85, btnSend.x, 'inOut'], [25.15, btnSend.x]]);
  Kit.add('#cur', 'y', [[23.3, cy0], [23.95, optSign.y, 'inOut'], [24.5, optSign.y], [24.85, btnSend.y, 'inOut'], [25.15, btnSend.y]]);
  Kit.add('#cur', 'scale', [[24.3, 1], [24.33, 0.86], [24.4, 1], [24.92, 1], [24.95, 0.86], [25.02, 1]]);
}
Kit.add('#s5a', 'opacity', [[25.5, 1], [25.64, 0]]);

/* ===================== S5b THE PHONE (25.55–28.15): "One link" 25.20 · "on their phone" 26.23 · "nothing to install" 26.85 ===================== */
Kit.clip('#bg-site', { dir: 'clips/site', t0: 25.55, t1: 28.4, fps: 30, frames: 96, ext: '.jpg' });
Kit.add('#phone', 'opacity', [[25.55, 0], [25.7, 1, 'out']]);
Kit.add('#phone', 'y', [[25.55, 70], [25.85, 0, 'out']]);
Kit.add('#phone', 'rotate', [[25.55, -2.5], [25.9, -1.2, 'out'], [28.1, -0.6]]);
Kit.add('#bg-site', 'scale', [[25.55, 1.04], [28.15, 1.0]]);
Kit.add('#box-on', 'opacity', [[0, 0], [25.95, 0], [26.01, 1]]);
Kit.add('#box-on', 'scale', [[25.95, 0.6], [26.11, 1, 'outBack']]);
Kit.type('#nm', 26.15, 26.65);
Kit.add('#sigp', 'trim', [[0, 0], [26.72, 0], [27.28, 1, 'inOut']]);
Kit.add('#sbtn', 'scale', [[27.4, 1], [27.44, 0.96], [27.52, 1]]);
Kit.add('#done', 'opacity', [[0, 0], [27.55, 0], [27.69, 1, 'out']]);
Kit.add('#done', 'y', [[27.55, 30], [27.76, 0, 'out']]);
// taps: placed on the real element centres once fonts have loaded (screen-local coordinates)
const TAPS = [['#tap1', '#scr .box', 25.93], ['#tap2', '#scr .inp', 26.11], ['#tap3', '#sbtn', 27.38]];
let tapsPlaced = false;
Kit.each(() => {
  if (tapsPlaced) return;
  const scr = $('#scr'); if (!scr.offsetWidth) return;
  TAPS.forEach(([id, sel]) => { const e = $(sel); Object.assign($(id).style, { left: (e.offsetLeft + e.offsetWidth / 2) + 'px', top: (e.offsetTop + e.offsetHeight / 2) + 'px' }); });
  tapsPlaced = true;
});
TAPS.forEach(([id, , t]) => {
  Kit.add(id, 'opacity', [[0, 0], [t, 0], [t + 0.03, 1], [t + 0.32, 0, 'out']]);
  Kit.add(id, 'scale', [[t, 0.5], [t + 0.32, 1.25, 'out']]);
});
Kit.pop('#k-l1', 25.62, { dy: 26 });                                                       // "One link" (the scene lands on "link" 25.73)
Kit.pop('#k-l2', 26.23, { dy: 26 });                                                       // "on their phone"
Kit.pop('#k-l3', 26.85, { dy: 26 });                                                       // "nothing to install"
Kit.add('#s5b', 'opacity', [[28.0, 1], [28.14, 0]]);

/* ===================== S5c EVERYONE HAS SIGNED + CERTIFICATE + PAGE 7 (28.05–32.35): "The signed copy" 28.08 · "every page you sent" 29.49 · "Page seven included" 30.98 ===================== */
Kit.add('#app2', 'opacity', [[28.05, 0], [28.2, 1, 'out']]);
Kit.add('#app2', 'y', [[28.05, 40], [28.3, 0, 'out']]);
Kit.add('#b-amb', 'opacity', [[0, 1], [28.58, 1], [28.64, 0]]);
Kit.add('#b-grn', 'opacity', [[0, 0], [28.61, 0], [28.68, 1]]);                           // "signed" 28.61
Kit.add('#b-grn', 'scale', [[28.61, 0.8], [28.81, 1, 'outBack']]);
Kit.add('#r2-flash', 'opacity', [[0, 0], [28.62, 0], [28.66, 1], [29.2, 0, 'out']]);
Kit.add('#app2', 'opacity', [[29.05, 1], [29.25, 0.35]]);
Kit.add('#cert', 'opacity', [[0, 0], [29.1, 0], [29.22, 1, 'out']]);                      // "copy has" → the certificate slides in
Kit.add('#cert', 'y', [[29.1, 160], [29.4, 0, 'out']]);
Kit.add('#cert', 'rotate', [[29.1, 2.5], [29.4, -1, 'out']]);
const ps = $('#pstrip');
const PSW = 56, PSG = 14, PSN = 13, PSX0 = (1080 - (PSN * PSW + (PSN - 1) * PSG)) / 2;
for (let p = 1; p <= 13; p++) {
  const x = PSX0 + (p - 1) * (PSW + PSG);
  ps.insertAdjacentHTML('beforeend', `<div class="ps ${p === 13 ? 'cert' : ''}" id="ps${p}" style="left:${x}px">${p === 13 ? '<svg width="56" height="76" viewBox="0 0 56 76"><path d="M17 39l7 7 14-15" fill="none" stroke="#16A34A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '<i style="top:12px"></i><i style="top:20px"></i><i style="top:28px"></i><i style="top:36px;right:22px"></i>'}</div>`);
  ps.insertAdjacentHTML('beforeend', `<div class="psn" id="psn${p}" style="left:${x}px;${p === 7 ? 'color:var(--accent)' : ''}">${p === 13 ? '✓' : p}</div>`);
  const t = 29.8 + (p - 1) * 0.025;                                                        // the strip lays out under "page you sent"
  Kit.add('#ps' + p, 'opacity', [[0, 0], [t, 0], [t + 0.08, 1]]);
  Kit.add('#ps' + p, 'y', [[t, 18], [t + 0.16, 0, 'out']]);
  Kit.add('#psn' + p, 'opacity', [[0, 0], [t + 0.04, 0], [t + 0.12, 1]]);
}
const p7x = PSX0 + 6 * (PSW + PSG) + PSW / 2;
Object.assign($('#ring7g').style, { left: (p7x - 66) + 'px', top: (L.pstripTop - 22) + 'px' });
Kit.add('#ring7gp', 'trim', [[0, 0], [31.0, 0], [31.35, 1, 'out']]);                     // "Page seven"
Kit.add('#ps7', 'y', [[30.95, 0], [31.1, -10, 'out'], [31.35, 0, 'out']]);
Kit.pop('#c-pdf', 29.49, { dy: 22 });                                                      // "every page you sent"
Kit.add('#c-pdf2', 'opacity', [[0, 0], [30.98, 0], [31.13, 1, 'out']]);                   // "Page seven included"
Kit.add('#s5c', 'opacity', [[32.2, 1], [32.34, 0]]);

/* ===================== S6 CLOSE (32.3–36.0): "Still can't fix junk folders." 32.45 · "No printer needed, though." 34.59 ===================== */
Kit.pop('#c-l1', 32.45, { dy: 24 });
Kit.pop('#c-l2', 34.59, { dy: 24 });
Kit.add('#s6', 'opacity', [[35.85, 1], [35.99, 0]]);

/* ===================== END CARD (35.9–41.4): "Book a thirty-minute demo at Queue Ess Mee dot build." 36.06–39.92; qsme.build on screen 5.4 s ===================== */
Kit.fade('#e-logo', 35.93, 36.2).add('#e-logo', 'scale', [[35.93, 0.94], [36.35, 1, 'out']]);
Kit.pop('#e-line', 36.0);
Kit.pop('#e-cta', 36.08);                                                                  // pops on "Book"
Kit.pop('#e-url', 36.0);

Kit.ready({ duration: DURATION, fonts: ['700 60px "Space Grotesk"', '500 30px Inter', '600 30px Inter', '700 30px Inter', '800 30px Inter', '700 60px "JetBrains Mono"', '600 30px "JetBrains Mono"', '500 22px "JetBrains Mono"', '400 60px "Permanent Marker"'] });
})();
