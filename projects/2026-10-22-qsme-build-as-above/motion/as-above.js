/* "Wednesday: As above." — QSME Global · one timeline, markup built here.
 * 2026-10-06 AUDIO-FIRST REMAKE (the N01 "Which Dave?" standard: no gaps, no breath cuts, a real hook, continuous speech):
 * the Cam S eleven_v3 take (outputs/vo-take-cam-v3/take.mp3, 43.92 s, ONE unbroken /with-timestamps request, laid at 0.0)
 * is the clock. Every time below is a word in alignment.json; the page runs 45.4 s (take + ~1.5 s tail). The old authored
 * clock + edit list (PRE / EDL / warp) is gone: one output clock. Design unchanged (2026-10-04 review build).
 *   0.00–3.95  S1 hook: "Confession. Friday, four fifty-two. Writing Monday's site diary." — "For Monday." slams on "Monday's"
 *              (2.77); the pen writes Monday's four lines under the hook (0–3.4)
 *   4.00–13.9  S1 the week shrinks on the words: "Monday gets a paragraph." (caption 4.0), "Tuesday got rained off" (rain 6.6,
 *              caption 6.0), the pen writes "Works progressed." on the words (8.2–9.3), "Wednesday 'As above'" (caption 9.55,
 *              pen 10.36), "Thursday too" (11.32), "Friday, ditto." (pen 12.66, underline on "ditto." 13.2), pull-back 13.3–13.72
 *  13.90–18.8  S2 "Nine months later." (slam on "Nine" 13.92) over the b-roll → the email arrives on "head office" (15.1);
 *              the yellow marker on "thirteenth" (17.3)
 *  18.80–21.9  S3 hard cut back to Tuesday: the red ring on "It was." (18.9), "?" + "Probably." on the word (20.25)
 *  21.60–27.45 S4 swipe lands on "Or." (21.84): Schedule; Rain day click on "log" (24.6), caption "Log the rain day once." (24.5),
 *              tick Tue 13 on "once" (25.54), Push on "programme" (26.35), the chain slides 26.5–26.9
 *  27.45–29.6  S4 hard cut to the Daily log on "the rain day writes itself" (27.45): marker, Rain day (27.95) + Schedule change
 *              (28.25) write themselves in; caption "It writes itself into the diary." on "writes" (27.95)
 *  29.60–33.95 S5 hard cut to Messages on "Tag" (29.6): click the photo on "photo" (30.62), "Mark as proof of work" on the
 *              words (31.3), hard cut to the Daily log on "photos land" (31.9), the entry lands 31.95–32.2, caption "Photos land
 *              on the day / you post them." (32.05)
 *  33.95–36.8  S5b phone swipes in on "even from your phone" (33.95): Add photo (34.45), Take a photo (34.87), shutter (35.05),
 *              "Site photo" lands 35.11–35.37, "Not on Friday." slams on "Not" (35.25)
 *  36.50–40.75 S6 close on "It doesn't write the whole diary." (36.72): paper Tuesday vs the QSME Tuesday card; "It writes the
 *              bits / you'd forget by Friday." on "It writes" (38.56)
 *  40.45–45.4  S7 end card fades in on "Book" (40.7): logo, pill "Book a 30-minute demo" (40.72), qsme.build on "Queue Ess Mee
 *              dot build" (42.3); page ends 45.4
 */
(function () {
  'use strict';
  var DUR = 45.4;   // take ends 43.92 + ~1.5 s tail (one output clock; no edit list)
  var PRE = 0;      // kept for the rain streak field (tt = t + PRE)
  var root = document.getElementById('root');
  var I = {
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M7.5 18.5h9.5a4 4 0 0 0 .6-7.95 5.5 5.5 0 0 0-10.7 1.2A3.4 3.4 0 0 0 7.5 18.5z"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    lib: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-5 4 4 3-3 4 4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    proof: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M8.5 12l2.5 2.5 4.5-4.5"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h13l-3.5-3.5M19 16H6l3.5 3.5"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M6 3.5h8l4 4V20.5H6z"/><path d="M9 12h6M9 16h5"/></svg>',
    cursor: '<svg viewBox="0 0 34 46" width="34" height="46"><path d="M3 3 L3 37 L11.5 29 L17 42 L22.5 39.8 L17 27 L28.5 27 Z" fill="#fff" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/></svg>'
  };
  // Audience-facing label on every recreated product frame. Swap the shot for the owner's Session B recording when it exists.
  var LABEL = 'Recreated screen · demo data';
  function lab(kind, text, icon) { return '<span class="lab ' + kind + '">' + (icon ? I[icon] : '') + text + '</span>'; }
  // crop a region of a 1080x608 still into a w x h box
  function crop(img, sx, sy, sw, sh, w, h) {
    var s = Math.max(w / sw, h / sh);
    return 'background-image:url(img/' + img + ');background-size:' + (1080 * s).toFixed(1) + 'px ' + (608 * s).toFixed(1) + 'px;background-position:' + (-sx * s).toFixed(1) + 'px ' + (-sy * s).toFixed(1) + 'px;';
  }
  var POUR = function (w, h) { return crop('pour.jpg', 420, 430, 262, 178, w, h); };        // Mia's photo: formwork + mesh, no people
  var WET = function (w, h) { return crop('wet-slab.jpg', 560, 372, 400, 165, w, h); };     // Sam's 11:51 photo: standing water, no people

  /* ------------------------------------------------------------------ markup */
  var days = [
    { id: 'mo', dn: 'MON', dd: '12/10', wv: 'Fine' },
    { id: 'tu', dn: 'TUE', dd: '13/10', wv: '<span class="hw" id="tq" style="left:44px;top:6px;font:700 58px/1 Kalam, cursive;color:#D9342B">?</span>' },
    { id: 'we', dn: 'WED', dd: '14/10', wv: '<span class="hw" id="wdw" style="left:22px;top:2px;font-size:38px">"</span>' },
    { id: 'th', dn: 'THU', dd: '15/10', wv: '<span class="hw" id="thw" style="left:30px;top:2px;font-size:40px">"</span>' },
    { id: 'fr', dn: 'FRI', dd: '16/10', wv: '<span class="hw" id="frw" style="left:26px;top:0px;font-size:44px">"</span>' }
  ];
  var works = {
    mo: '<span class="hw" id="m1" style="top:21px">Set-out checked. Grids A–F OK.</span>' +
        '<span class="hw" id="m2" style="top:77px">Formwork east bay started.</span>' +
        '<span class="hw" id="m3" style="top:134px">Scaffold west side tagged.</span>' +
        '<span class="hw" id="m4" style="top:190px">Toolbox: working at heights.</span>',
    tu: '<span class="hw" id="t1" style="top:20px;font-size:42px;transform:rotate(-1deg)">Works progressed.</span>',
    we: '<span class="hw" id="w1" style="top:18px;font-size:46px;transform:rotate(-1.5deg)">As above.</span>',
    th: '<span class="hw" id="h1" style="top:16px;font-size:50px;transform:rotate(-2.5deg)">As above.</span>',
    fr: '<span class="hw" id="f1" style="top:8px;font-size:60px;font-weight:700;transform:rotate(-4deg)">Ditto.</span>' +
        '<svg class="abs" style="left:14px;top:62px" width="200" height="30" viewBox="0 0 200 30"><path id="fu" d="M4 18 C 40 8, 70 26, 110 14 S 170 6, 194 16" fill="none" stroke="#1F3A8A" stroke-width="4" stroke-linecap="round"/></svg>'
  };
  var dayHtml = days.map(function (d, i) {
    return '<div class="day" id="d_' + d.id + '" style="top:' + (170 + i * 245) + 'px">' +
      '<div class="dn">' + d.dn + '</div><div class="dd">' + d.dd + '</div><div class="wl">WEATHER</div>' +
      '<div class="wv">' + d.wv + '</div><div class="works">' + works[d.id] + '</div></div>';
  }).join('');
  var penSvg = '<svg width="300" height="320" viewBox="0 0 300 320"><g transform="translate(6,312) rotate(-49)">' +
    '<polygon points="0,0 24,-6.5 24,6.5" fill="#C9CED6"/><polygon points="0,0 6,-1.6 6,1.6" fill="#1F3A8A"/>' +
    '<rect x="24" y="-10" width="62" height="20" rx="4" fill="#2A3140"/>' +
    '<rect x="86" y="-12" width="236" height="24" rx="6" fill="#1D2A57"/><rect x="92" y="-9" width="224" height="5" rx="2.5" fill="rgba(255,255,255,.25)"/>' +
    '<rect x="150" y="-17" width="150" height="7" rx="3" fill="#BFC6CF"/><rect x="316" y="-12" width="14" height="24" rx="5" fill="#C7CDD5"/></g></svg>';

  var schedRows = [
    { n: 'Formwork &amp; mesh', who: 'Formwork crew · east bay', rain: true, bar: '<div class="bar on" id="bF" style="left:4px;width:98px"></div>' },
    { n: 'Edge beam steel', who: 'Steel fixer', bar: '<div class="bar bk" id="bS" style="left:110px;width:98px"></div><div class="bar wait" id="bSw" style="left:163px;width:98px"></div>' },
    { n: 'Pre-pour inspection', who: 'Engineer', bar: '<div class="bar pl" id="bI" style="left:216px;width:45px"></div>' },
    { n: 'Slab pour — east bay', who: 'Concrete crew', rain: true, bar: '<div class="bar bk" id="bP" style="left:375px;width:45px"></div><div class="bar wait" id="bPw" style="left:428px;width:45px"></div>' },
    { n: 'Scaffold — west side', who: 'Scaffolder', bar: '<div class="bar on" id="bC" style="left:4px;width:257px"></div>' }
  ];
  var dl = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F'], dn = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  var cols = function (cls) { return dl.map(function (_, i) { return '<div class="' + cls + (i === 5 || i === 6 ? ' we' : '') + '"></div>'; }).join(''); };
  var gHead = dl.map(function (l, i) { return '<div class="gd' + (i === 5 || i === 6 ? ' we' : '') + '"' + (i === 1 ? ' id="gdTue"' : '') + '>' + l + '<b>' + dn[i] + '</b></div>'; }).join('');
  var gRows = schedRows.map(function (r) {
    return '<div class="grow"><div class="gname"><div class="rn">' + (r.rain ? I.cloud : '') + r.n + '</div><em>' + r.who + '</em></div>' +
      '<div class="gcols">' + cols('c') + r.bar + '</div></div>';
  }).join('');

  root.innerHTML =
  /* ---------------- S1 desk ---------------- */
  '<div id="desk" class="fill" data-qa-ignore>' +
    '<div id="deskbg" class="fill"></div>' +
    '<div id="cam" class="abs">' +
      '<div id="vest" class="abs"><div class="strip a"></div><div class="strip b"></div><div class="seam"></div></div>' +
      '<div id="mug" class="abs"></div>' +
      '<div id="page" class="abs">' +
        '<div class="head"><div class="t">SITE DIARY</div><div class="f a">Project</div><div class="hw" style="left:110px">Block B — east bay</div>' +
        '<div class="f b">Week ending</div><div class="hw" style="left:640px">Fri 16/10</div></div>' +
        dayHtml +
        '<svg id="ring" width="890" height="1400"><path id="ringp" d="" fill="none" stroke="#D9342B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/></svg>' +
        '<div id="pen">' + penSvg + '</div>' +
      '</div>' +
    '</div>' +
    '<svg id="rain" class="fill" width="1080" height="1350"></svg>' +
    '<div id="deskvig" class="fill"></div>' +
  '</div>' +
  '<div id="topscrim" class="abs"></div>' +
  '<div id="hookscrim" class="abs"></div>' +
  '<div id="hook" class="abs"><div class="conf"><i></i>CONFESSION</div>' +
    '<div class="l1">Site diary.</div><div class="l2">Written Friday, 4:52pm.</div><div class="l3" id="formon">For Monday.</div></div>' +
  '<div id="clock" class="mchip" style="left:60px;top:66px"><span class="dot"></span><span>FRI 16 OCT · 4:<span id="cm">52</span> PM</span></div>' +
  '<div id="capMon" class="cap scrim" style="top:1130px;font-size:64px">Monday gets a paragraph.</div>' +
  '<div id="capTue" class="cap scrim" style="top:1130px;font-size:64px">Tuesday: <span class="amb">rained off.</span></div>' +
  '<div id="capWed" class="cap scrim" style="top:1130px;font-size:64px">Wednesday gets “As above.”</div>' +
  '<div id="wasScrim" class="abs" style="left:0;right:0;top:760px;bottom:0;background:linear-gradient(180deg,rgba(8,12,10,0),rgba(8,12,10,.86) 34%,rgba(8,12,10,.94))"></div>' +
  '<div id="capWas" class="cap" style="top:940px;font-size:104px;line-height:1.05">' +
    '<div id="was" style="text-shadow:0 6px 30px rgba(0,0,0,.6)">It was.</div><div id="prob" class="amb" style="text-shadow:0 6px 30px rgba(0,0,0,.6)">Probably.</div></div>' +

  /* ---------------- S2 nine months later ---------------- */
  '<div id="s2" class="fill">' +
    '<img id="done" alt="">' +
    '<div id="s2shade" class="fill"></div>' +
    '<div id="nine" class="abs">Nine months later.</div>' +
    '<div class="mail" id="mail"><div class="top"><div class="av">HO</div><div><div class="who">Head office</div><div class="to">to Sam</div></div>' +
      '<div class="when">13 Jul 2027<br>9:14 am</div></div>' +
      '<div class="body">Hi Sam,<div class="q">Was <mark>Tue 13 Oct</mark> a rain day?</div></div></div>' +
  '</div>' +

  /* ---------------- S4/S5 product (recreations, demo data) ---------------- */
  '<div id="prod" class="fill" style="background:var(--bg)">' +
    '<img class="toplogo" src="qsme-logo-nor.svg" alt="QSME">' +
    '<div id="tchip" class="mchip g" style="right:60px;top:74px"><span class="dot"></span><span>TUE 13 OCT · <span id="tc">11:06</span> AM</span></div>' +
    '<div class="illustrative" style="right:60px;top:142px">' + LABEL + '</div>' +
    '<div class="app" id="app">' +
      '<div class="chrome"><i></i><i></i><i></i><div class="url">' + I.lock + 'app.qsme.build</div></div>' +
      /* schedule */
      '<div class="pg" id="pgS">' +
        '<div class="ph"><h3>Schedule</h3><div class="btns"><div class="btn rain" id="bRD">' + I.cloud + 'Rain day</div></div></div>' +
        '<div class="tbar"><div class="chips"><span class="sch"><b>2</b> On site now</span><span class="sch" id="chW"><b id="wN">0</b> Waiting for OK</span><span class="sch blue">' + '<b>1</b> Rain risk</span></div></div>' +
        '<div class="gantt"><div class="gh"><div class="gname">' + I.cal.replace('<svg', '<svg width="24" height="24"') + 'October</div><div class="gdays">' + gHead +
          '</div></div>' +
          '<div style="position:relative">' + gRows +
            '<div id="rainband" style="left:349px;top:0;height:420px"></div>' +
          '</div></div>' +
        '<div class="dim" id="dimS" style="top:0"></div>' +
        '<div class="dlg" id="dlg" style="top:62px"><h4>' + I.cloud + 'Rain day</h4>' +
          '<div class="help">Tick every day that was rained off — you can pick more than one if you already know the week is gone. Each task that rain can stop gets one more day for every rained-off day it was on; what follows moves to fit.</div>' +
          '<div class="days5">' + ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'].map(function (d, i) { return '<div class="dchip" id="dc' + i + '"><span class="bx">' + (i === 1 ? '<span id="tick" style="display:flex">' + I.check + '</span>' : '') + '</span>' + d + '</div>'; }).join('') + '</div>' +
          '<div class="wm"><h5>What moves</h5><div class="sum" id="wmSum">4 tasks move — 2 now, 2 once the provider says OK</div>' +
            '<div class="r" id="wr0"><div class="n"><i style="background:#16A34A"></i>Formwork &amp; mesh — east bay</div><div class="d">Mon 12 – Tue 13 Oct → <b>Mon 12 – Wed 14 Oct</b></div></div>' +
            '<div class="r" id="wr1"><div class="n"><i style="background:#E39A0C"></i>Edge beam steel</div><div class="d">Wed 14 – Thu 15 Oct → <b>Thu 15 – Fri 16 Oct</b></div></div>' +
            '<div class="r" id="wr2"><div class="n"><i style="background:#94A3B8"></i>Pre-pour inspection</div><div class="d">Fri 16 Oct → <b>Mon 19 Oct</b></div></div>' +
            '<div class="r" id="wr3" style="border-bottom:0"><div class="n"><i style="background:#E39A0C"></i>Slab pour — east bay</div><div class="d">Mon 19 Oct → <b>Tue 20 Oct</b></div></div>' +
          '</div>' +
          '<div class="dfoot"><div class="btn primary" id="bPush">Push these tasks</div></div></div>' +
      '</div>' +
      /* daily log (shown twice: after the rain day, and after the proof-of-work tag) */
      '<div class="pg" id="pgL">' +
        '<div class="ph" style="display:block"><h3>Daily log</h3><p>What happened on site, day by day. Rain days, schedule changes, checklist steps and documents write themselves in — add a note for anything they miss.</p></div>' +
        '<div class="compose"><div class="in">Add a note for today…</div><div class="btn">' + I.cam + 'Add photo</div></div>' +
        '<div class="dayh"><mark class="dmk" id="dmk">Tue 13 Oct</mark></div>' +
        '<div id="ePW" style="height:0;overflow:hidden"><div class="ent" id="eP" style="grid-template-columns:auto auto 1fr auto">' + lab('proof', 'Proof of work', 'proof') +
          '<div class="ph2" style="width:84px;height:58px;grid-column:auto;' + POUR(84, 58) + '"></div><span class="by">Mia T.</span><span class="tm">11:42</span></div></div>' +
        '<div class="ent" id="eR">' + lab('rain', 'Rain day', 'cloud') + '<span class="by">Sam K.</span><span class="tm">11:06</span></div>' +
        '<div class="ent" id="eS">' + lab('sched', 'Schedule change', 'cal') + '<span class="by">Sam K.</span><span class="tm">11:06</span></div>' +
        '<div class="dayh" style="opacity:.6">Mon 12 Oct</div>' +
        '<div class="ent" style="opacity:.6">' + lab('doc', 'Document filed', 'doc') + '<span class="by">Sam K.</span><span class="tm">08:12</span></div>' +
      '</div>' +
      /* messages */
      '<div class="pg" id="pgM">' +
        '<div class="mlist"><h3>Messages</h3>' +
          '<div class="mi on"><div class="av2" style="background:#15803D">B</div><div>Project chat<small>Block B — east bay</small></div></div>' +
          '<div class="mi"><div class="av2" style="background:#7C5CC4">CC</div><div>Concrete crew<small>Group</small></div></div>' +
          '<div class="mi"><div class="av2" style="background:#0F766E">MT</div><div>Mia T.<small>Formwork</small></div></div></div>' +
        '<div class="thread"><div class="thh"><b>Project chat</b><p>Project chat — everyone working on the project.</p></div>' +
          '<div class="msg" style="top:112px"><div class="av2" style="background:#0F766E">MT</div><div class="bub"><div class="nm">Mia T.<span>Formwork · 11:41</span></div>Rained off. Packing up.</div></div>' +
          '<div class="msg" style="top:212px"><div class="av2" style="background:#0F766E">MT</div><div class="bub" id="pbub"><div class="nm">Mia T.<span>Formwork · 11:42</span></div>' +
            '<div class="pic" id="ppic" style="' + POUR(330, 224) + '"></div>Where we got to before the rain.' +
            '<div class="menu" id="pmenu" style="left:118px;top:58px"><div class="it" id="miProof">' + I.proof.replace('<svg', '<svg style="color:#15803D"') + 'Mark as proof of work</div>' +
              '<div class="it">' + I.swap.replace('<svg', '<svg style="color:#6D28D9"') + 'Flag as change request</div><div class="it">' + I.warn.replace('<svg', '<svg style="color:#B45309"') + 'Flag a problem</div></div>' +
          '</div></div>' +
          '<div class="mcomp">Message</div>' +
        '</div>' +
      '</div>' +
      '<div class="cursor" id="cur">' + I.cursor + '</div><div class="clickfx" id="cfx"></div>' +
    '</div>' +
  '</div>' +

  /* phone (browser) */
  '<div id="ph" class="fill" style="background:var(--bg)">' +
    '<img class="toplogo" src="qsme-logo-nor.svg" alt="QSME">' +
    '<div class="mchip g" style="right:60px;top:74px"><span class="dot"></span><span>TUE 13 OCT · <span id="tc2">11:51</span> AM</span></div>' +
    '<div class="illustrative" style="right:60px;top:142px">' + LABEL + '</div>' +
    '<div class="phone" id="phone" style="top:192px"><div class="scr" id="pscr"><div class="sb"><span>11:51</span><div class="notch"></div><span>●●● ▮</span></div>' +
      '<div class="ub"><div>' + I.lock + 'app.qsme.build</div></div>' +
      '<div class="pt">Daily log</div><div class="ps">Block B — east bay</div>' +
      '<div class="pc"><div class="ta"><span class="phd">Add a note for today…</span></div><div class="pbtn" id="pAdd">' + I.cam + 'Add photo</div></div>' +
      '<div class="pd">Tue 13 Oct</div>' +
      '<div id="pNewW" style="height:0;overflow:hidden"><div class="pe" id="pNew" style="border:2px solid #16A34A"><div class="row">' + lab('photo', 'Site photo', 'cam') + '<span class="tm" style="font:500 16px/1 var(--mono);color:#7A8794">Sam K. · 11:51</span></div>' +
        '<div class="ph3 wet" style="' + WET(414, 170) + '"></div></div></div>' +
      '<div class="pe"><div class="row">' + lab('proof', 'Proof of work', 'proof') + '<span style="font:500 16px/1 var(--mono);color:#7A8794">Mia T. · 11:42</span></div></div>' +
      '<div class="pe"><div class="row">' + lab('sched', 'Schedule change', 'cal') + '<span style="font:500 16px/1 var(--mono);color:#7A8794">11:06</span></div></div>' +
      '<div class="pe"><div class="row">' + lab('rain', 'Rain day', 'cloud') + '<span style="font:500 16px/1 var(--mono);color:#7A8794">11:06</span></div></div>' +
      '<div class="dim" id="pdim" style="top:0;background:rgba(15,23,42,.35)"></div>' +
      '<div class="sheet" id="psheet"><div class="gr"></div><div class="so" id="pTake">' + I.cam + 'Take a photo</div><div class="so">' + I.lib + 'Choose from library</div></div>' +
      '<div class="flash" id="pflash"></div>' +
      '<div class="tap" id="tap1"></div><div class="tap" id="tap2"></div>' +
    '</div></div>' +
  '</div>' +

  /* ---------------- S6 close + S7 end ---------------- */
  '<div id="close" class="fill">' +
    '<div class="scrap" id="scrap"><div class="dn">TUE</div><div class="dd">13/10</div><div class="wl">WEATHER</div><div class="wv"></div>' +
      '<div class="works"><span class="hw">Works progressed.</span></div><div class="tagx">PAPER · WRITTEN FRI 4:53 PM</div></div>' +
    '<div class="qcard" id="qcard"><div class="qh">Daily log<mark class="dmk" id="qmk">Tue 13 Oct</mark></div>' +
      '<div class="qe" id="q1">' + lab('rain', 'Rain day', 'cloud') + '<span class="tm">11:06</span></div>' +
      '<div class="qe" id="q2">' + lab('sched', 'Schedule change', 'cal') + '<span class="tm">11:06</span></div>' +
      '<div class="qe" id="q3">' + lab('proof', 'Proof of work', 'proof') + '<div class="th" style="' + POUR(84, 60) + '"></div><span class="tm">11:42</span></div>' +
      '<div class="qe" id="q4">' + lab('photo', 'Site photo', 'cam') + '<div class="th wet" style="' + WET(84, 60) + '"></div><span class="tm">11:51</span></div></div>' +
    '<div class="illustrative" id="qlab" style="right:60px;top:850px">' + LABEL + '</div>' +
    '<div id="line1">It doesn’t write the whole diary.</div>' +
  '</div>' +
  '<div id="end" class="fill"><img id="logoEnd" src="qsme-logo-nor.svg" alt="QSME"><div id="cta"><span class="pill">Book a 30-minute demo</span></div><div id="url">qsme.build</div></div>' +
  '<div id="line2" style="top:1064px">It writes the bits<br>you’d forget <span class="amb">by Friday.</span></div>';

  /* ------------------------------------------------------------------ timeline (take clock) */
  var K = Kit;
  var $ = function (s) { return document.querySelector(s); };

  // scene visibility
  K.add('#desk', 'opacity', [[0, 1], [13.9, 0, 'hold'], [18.8, 1, 'hold'], [21.9, 0, 'hold']]);
  K.scene('#s2', 13.9, 18.8).scene('#prod', 21.55, 34.3).scene('#ph', 33.9, 36.9).scene('#close', 36.45, 40.9).scene('#end', 40.4, DUR + 1);

  /* S1 — hook + the week shrinking, on the words */
  K.add('#hook', 'opacity', [[0, 1], [3.85, 1], [4.0, 0, 'in']]);
  K.add('#hookscrim', 'opacity', [[0, 1], [3.85, 1], [4.1, 0, 'in']]);
  K.slam('#formon', 2.77, { from: 1.25, dur: 0.16 });                      // "Monday's"
  K.add('#clock', 'opacity', [[0, 0], [3.95, 0], [4.1, 1, 'out'], [13.8, 1], [13.9, 0, 'hold']]);
  K.add('#topscrim', 'opacity', [[0, 0], [3.95, 0], [4.1, 1, 'out'], [13.8, 1], [13.9, 0, 'hold']]);
  K.count('#cm', [[0, 52], [8.2, 53, 'hold'], [10.36, 55, 'hold'], [11.32, 56, 'hold'], [12.1, 57, 'hold'], [12.66, 58, 'hold']], function (v) { return String(Math.round(v)); });
  K.add('#clock', 'scale', [[12.64, 1], [12.76, 1.12, 'out'], [13.0, 1, 'inOut']]);
  K.pop('#capMon', 4.0, { dy: 24 }).out('#capMon', 5.9, 0.12);             // "Monday gets a paragraph." 4.00–5.92
  K.pop('#capTue', 6.0, { dy: 24 }).out('#capTue', 8.1, 0.12);             // "Tuesday got rained off" 5.99–7.28; out before the pen writes
  K.pop('#capWed', 9.55, { dy: 24 }).out('#capWed', 11.3, 0.12);           // "Wednesday 'As above'" 9.52–11.20

  // camera over the page (desk coordinates = page coordinates; origin top-left)
  K.add('#cam', 'x', [[0, 95], [13.3, 95], [13.72, 193, 'inOut'], [13.9, 197], [18.8, -2, 'hold'], [21.9, -12]]);
  K.add('#cam', 'y', [[0, 470], [3.8, 452], [4.4, 250, 'inOut'], [5.85, 236], [6.3, 60, 'inOut'], [9.3, 50], [9.7, -300, 'inOut'], [13.3, -308], [13.72, 124, 'inOut'], [13.9, 120], [18.8, -214, 'hold'], [21.9, -232]]);
  K.add('#cam', 'scale', [[0, 1], [3.8, 1.01], [4.4, 1, 'inOut'], [13.3, 1], [13.72, 0.78, 'inOut'], [13.9, 0.775], [18.8, 1.4, 'hold'], [21.9, 1.43]]);
  K.add('#desk', 'x', [[21.6, 0], [21.9, -1080, 'swipe']]);

  // handwriting: clip reveal + pen follows (each line on its word)
  var W = [
    { id: 'm1', t0: 0.0, t1: 0.72, p0: 0.16 }, { id: 'm2', t0: 0.85, t1: 1.6 }, { id: 'm3', t0: 1.75, t1: 2.5 }, { id: 'm4', t0: 2.65, t1: 3.4 },
    { id: 't1', t0: 8.2, t1: 9.3 },                                          // "Works progressed" 8.20–9.44
    { id: 'wdw', t0: 10.28, t1: 10.33 }, { id: 'w1', t0: 10.36, t1: 11.15 },  // "As above" 10.36–11.20
    { id: 'thw', t0: 11.25, t1: 11.3 }, { id: 'h1', t0: 11.32, t1: 12.0 },    // "Thursday too" 11.28–12.56
    { id: 'frw', t0: 12.1, t1: 12.15 }, { id: 'f1', t0: 12.66, t1: 13.1 }     // "Friday," 12.63–13.12; underline on "ditto." 13.2
  ];
  W.forEach(function (w) { K.add('#' + w.id, 'clipX', [[w.t0, w.p0 || 0], [w.t1, 1, [0.3, 0.1, 0.7, 0.9]]]); });
  K.add('#fu', 'trim', [[13.2, 0], [13.36, 1, 'out']]);
  var page = $('#page'), pen = $('#pen');
  function pagePos(el) { var x = 0, y = 0; while (el && el !== page) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x: x, y: y }; }
  function linePt(w, p) { var el = document.getElementById(w.id), o = pagePos(el); return { x: o.x + el.offsetWidth * p, y: o.y + el.offsetHeight * 0.74 }; }
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
  K.each(function (t) {
    if (t > 13.9) { pen.style.visibility = 'hidden'; return; }
    pen.style.visibility = 'visible';
    var x, y, lift = 0, i;
    if (t <= W[0].t0) { var a0 = linePt(W[0], W[0].p0); x = a0.x; y = a0.y; }
    else {
      for (i = 0; i < W.length; i++) {
        var w = W[i];
        if (t >= w.t0 && t <= w.t1) { var p = (t - w.t0) / (w.t1 - w.t0), q = linePt(w, (w.p0 || 0) + (1 - (w.p0 || 0)) * p); x = q.x; y = q.y + Math.sin(t * 61) * 3; break; }
        var nx = W[i + 1];
        if (nx && t > w.t1 && t < nx.t0) { var a = linePt(w, 1), b = linePt(nx, nx.p0 || 0), e = ease((t - w.t1) / (nx.t0 - w.t1)); x = a.x + (b.x - a.x) * e; y = a.y + (b.y - a.y) * e; lift = Math.sin(Math.PI * e) * 26; break; }
        if (!nx && t > w.t1) { var c = linePt(w, 1), k = Math.min(1, (t - w.t1) / 0.5); x = c.x + 140 * ease(k); y = c.y + 60 * ease(k); lift = 30 * Math.min(1, k * 2); }
      }
    }
    pen.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (y - lift).toFixed(1) + 'px)';
  });

  // rain over Tuesday (deterministic streaks) — "rained off" 6.68
  var rain = $('#rain'), NS = 'http://www.w3.org/2000/svg', streaks = [];
  function hash(n) { var s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
  for (var r = 0; r < 120; r++) { var ln = document.createElementNS(NS, 'line'); ln.setAttribute('stroke', 'rgba(215,232,255,' + (0.45 + hash(r + 7) * 0.4).toFixed(2) + ')'); ln.setAttribute('stroke-width', (2.2 + hash(r + 3) * 2.4).toFixed(1)); ln.setAttribute('stroke-linecap', 'round'); rain.appendChild(ln); streaks.push(ln); }
  var tint = document.createElementNS(NS, 'rect'); tint.setAttribute('width', 1080); tint.setAttribute('height', 1350); tint.setAttribute('fill', 'rgba(30,70,135,.26)'); rain.insertBefore(tint, rain.firstChild);
  K.add('#rain', 'opacity', [[0, 0], [6.55, 0], [6.8, 1, 'out'], [9.3, 1], [9.55, 0, 'in']]);
  K.each(function (t) {
    if (t < 6.5 || t > 9.6) return;
    var tt = t + PRE;
    for (var i = 0; i < streaks.length; i++) {
      var v = 1500 + hash(i + 1) * 900, L = 50 + hash(i + 2) * 90, y = ((hash(i + 5) * 1500 + v * tt) % 1560) - 120, x = hash(i + 9) * 1300 - 60 - y * 0.22;
      streaks[i].setAttribute('x1', x.toFixed(1)); streaks[i].setAttribute('y1', y.toFixed(1)); streaks[i].setAttribute('x2', (x - L * 0.22).toFixed(1)); streaks[i].setAttribute('y2', (y + L).toFixed(1));
    }
  });

  /* S2 — nine months later (b-roll scaled from its right edge so the lit left window, with a figure in it, stays out of frame).
     The 99-frame clip is played at 0.67× so it covers the 4.9 s scene (it is blurred under the email from 15.4 anyway). */
  K.clip('#done', { dir: 'clips/done', t0: 13.9, t1: 18.8, fps: 30, frames: 99, ext: '.jpg', speed: 0.67 });
  K.add('#done', 'scale', [[13.9, 1.16], [18.8, 1.23, 'linear']]);
  K.add('#done', 'blur', [[15.05, 0], [15.4, 6, 'out']]);
  K.add('#s2shade', 'opacity', [[13.9, 0.8], [15.05, 0.8], [15.4, 1, 'out']]);
  K.add('#nine', 'opacity', [[13.9, 0], [13.96, 1]]).add('#nine', 'scale', [[13.9, 1.12], [14.1, 1, 'slam'], [15.05, 0.985], [15.35, 0.62, 'inOut']]);   // "Nine" 13.92
  K.add('#nine', 'y', [[15.05, 0], [15.35, -392, 'inOut']]);                                                                                  // "head office" 15.15
  K.add('#mail', 'opacity', [[15.1, 0], [15.28, 1, 'out']]).add('#mail', 'y', [[15.1, 140], [15.45, 0, 'out']]);
  K.add('#mail mark', 'background', [[17.3, '#FFFFFF'], [17.6, '#FDE68A', 'out']]);                                                            // "thirteenth" 17.31

  /* S3 — "It was. Probably." (hard cut back to Tuesday at 18.8; "It" 18.91, "Probably." 20.23) */
  var ringDone = false;
  K.each(function (t) {
    if (ringDone) return;
    var el = $('#t1'); if (!el.offsetWidth) return;
    var o = pagePos(el), w = el.offsetWidth, h = el.offsetHeight, cx = o.x + w / 2, cy = o.y + h * 0.55, rx = w / 2 + 34, ry = h / 2 + 22;
    var d = 'M ' + (cx + rx * 0.92).toFixed(1) + ' ' + (cy - ry * 0.55).toFixed(1);
    for (var k = 1; k <= 40; k++) { var a = -0.55 + k / 40 * (Math.PI * 2 + 0.5), rr = 1 + Math.sin(k * 0.9) * 0.025; d += ' L ' + (cx + Math.cos(a) * rx * rr).toFixed(1) + ' ' + (cy - Math.sin(a) * ry * rr * 1.0 + k * 0.35).toFixed(1); }
    $('#ringp').setAttribute('d', d); ringDone = true;
  });
  K.add('#ringp', 'trim', [[0, 0], [18.9, 0], [19.3, 1, 'out']]);
  K.add('#tq', 'opacity', [[0, 0], [20.2, 0], [20.22, 1, 'hold']]).add('#tq', 'clipY', [[20.2, 0], [20.4, 1, 'out']]);
  K.add('#capWas', 'opacity', [[0, 0], [18.8, 0], [18.82, 1, 'hold'], [21.9, 1], [21.92, 0, 'hold']]);
  K.slam('#was', 19.0, { from: 1.2 }).slam('#prob', 20.3, { from: 1.25 });
  K.add('#capWas', 'x', [[21.6, 0], [21.9, -1080, 'swipe']]);
  K.add('#wasScrim', 'opacity', [[0, 0], [18.8, 0], [18.82, 1, 'hold'], [21.9, 1], [21.92, 0, 'hold']]).add('#wasScrim', 'x', [[21.6, 0], [21.9, -1080, 'swipe']]);

  /* S4 — product: the swipe lands on "Or." (21.84); Rain day → push → (hard cut) Daily log */
  K.add('#prod', 'x', [[21.6, 1080], [21.9, 0, 'swipe'], [33.95, 0], [34.25, -1080, 'swipe']]);
  K.count('#tc', [[0, 0], [29.6, 1, 'hold']], function (v) { return ['11:06', '11:42'][Math.round(v)]; });
  // pages: hard cuts (a dissolve of two dense screens reads as mush). The Daily log comes back after the proof-of-work tag.
  K.add('#pgS', 'opacity', [[27.45, 1], [27.46, 0, 'hold']]);
  K.add('#pgL', 'opacity', [[0, 0], [27.46, 1, 'hold'], [29.6, 0, 'hold'], [31.9, 1, 'hold']]).add('#pgL', 'y', [[27.46, 26], [27.66, 0, 'out'], [31.9, 26, 'hold'], [32.1, 0, 'out']]);
  K.add('#pgM', 'opacity', [[0, 0], [29.6, 1, 'hold'], [31.9, 0, 'hold']]).add('#pgM', 'y', [[29.6, 26], [29.8, 0, 'out']]);
  // dialog: Rain day click on "log" (24.56), tick on "once" (25.55), Push on "programme" (26.38)
  K.add('#dimS', 'opacity', [[0, 0], [24.63, 0], [24.77, 1, 'out'], [26.42, 1], [26.56, 0, 'in']]);
  K.add('#dlg', 'opacity', [[0, 0], [24.63, 0], [24.75, 1, 'out'], [26.42, 1], [26.54, 0, 'in']]).add('#dlg', 'scale', [[24.63, 0.95], [24.83, 1, 'out'], [26.42, 1], [26.54, 0.97]]);
  K.add('#dc1', 'background', [[25.54, '#FFFFFF'], [25.58, '#EEF6FF', 'hold']]).add('#dc1', 'borderColor', [[25.54, '#DDE3E0'], [25.58, '#2B7BC8', 'hold']]);
  K.add('#dc1 .bx', 'background', [[25.54, '#FFFFFF'], [25.58, '#2B7BC8', 'hold']]).add('#dc1 .bx', 'borderColor', [[25.54, '#A8B3AD'], [25.58, '#2B7BC8', 'hold']]);
  K.add('#tick', 'opacity', [[0, 0], [25.56, 0], [25.6, 1]]);
  K.add('#wmSum', 'opacity', [[0, 0], [25.64, 0], [25.76, 1]]);
  ['#wr0', '#wr1', '#wr2', '#wr3'].forEach(function (s, i) { K.pop(s, 25.7 + i * 0.08, { dy: 12, fade: 0.12 }); });
  K.add('#bPush', 'scale', [[26.33, 1], [26.39, 0.94], [26.49, 1]]);
  K.add('#bRD', 'scale', [[24.58, 1], [24.64, 0.94], [24.73, 1]]);
  // the programme moves (26.5–26.9), then holds until the cut to the Daily log at 27.45
  K.add('#bF', 'width', [[26.5, 98], [26.9, 151, 'inOut']]);
  K.add('#bI', 'x', [[26.5, 0], [26.9, 159, 'inOut']]);
  K.add('#bS', 'opacity', [[26.5, 1], [26.73, 0.32]]).add('#bP', 'opacity', [[26.5, 1], [26.73, 0.32]]);
  K.add('#bSw', 'opacity', [[0, 0], [26.58, 0], [26.73, 1]]).add('#bSw', 'x', [[26.58, -53], [26.9, 0, 'inOut']]);
  K.add('#bPw', 'opacity', [[0, 0], [26.58, 0], [26.73, 1]]).add('#bPw', 'x', [[26.58, -53], [26.9, 0, 'inOut']]);
  K.add('#gdTue', 'background', [[26.53, '#F5F7F6'], [26.68, '#2B7BC8', 'out']]).add('#gdTue', 'color', [[26.53, '#7A8794'], [26.68, '#FFFFFF', 'out']]);
  K.add('#gdTue b', 'color', [[26.53, '#1E293B'], [26.68, '#FFFFFF', 'out']]);
  K.count('#wN', [[0, 0], [26.88, 2, 'hold']], function (v) { return String(Math.round(v)); });
  K.add('#chW', 'background', [[26.86, '#FFFFFF'], [26.9, '#FFF8E6', 'hold']]).add('#chW', 'borderColor', [[26.86, '#E1E7E3'], [26.9, '#F7D58B', 'hold']]).add('#chW', 'color', [[26.86, '#334155'], [26.9, '#92400E', 'hold']]);
  // daily log entries write themselves in on "writes itself" (27.95 / 28.22); the day header gets the email's yellow marker
  K.add('#dmk', 'background', [[27.6, '#F5F7F6'], [27.9, '#FDE68A', 'out']]);
  K.pop('#eR', 27.95, { dy: 18 }).pop('#eS', 28.25, { dy: 18 });
  K.add('#eR', 'borderColor', [[27.95, '#16A34A'], [28.8, '#E1E7E3', 'inOut']]).add('#eS', 'borderColor', [[28.25, '#16A34A'], [29.1, '#E1E7E3', 'inOut']]);

  /* S5 — "Tag a chat photo as proof of work" (29.62): click the photo on "photo" (30.61), the menu item on "proof of work" (31.01–31.84),
     hard cut to the Daily log on "and photos land" (31.9), where the entry lands under Tue 13 Oct */
  K.add('#pmenu', 'opacity', [[0, 0], [30.66, 0], [30.76, 1, 'out'], [31.38, 1], [31.46, 0, 'in']]).add('#pmenu', 'scale', [[30.66, 0.94], [30.8, 1, 'out']]);
  K.add('#miProof', 'background', [[31.2, '#FFFFFF'], [31.3, '#ECF7EF', 'out']]);
  var ePH = $('#eP').offsetHeight + 10;
  K.add('#ePW', 'height', [[31.96, 0], [32.18, ePH, 'out']]);
  K.add('#eP', 'opacity', [[0, 0], [31.98, 0], [32.14, 1, 'out']]).add('#eP', 'borderColor', [[31.98, '#16A34A'], [32.8, '#E1E7E3', 'inOut']]);

  // cursor path (targets resolved from the layout)
  var app = $('#app'), cur = $('#cur'), cfx = $('#cfx');
  function centerOf(sel, dx, dy) { var A = app.getBoundingClientRect(), B = $(sel).getBoundingClientRect(); return { x: B.left - A.left + B.width / 2 + (dx || 0), y: B.top - A.top + B.height / 2 + (dy || 0) }; }
  var CP = [
    [21.95, [640, 520]], [24.3, '#bRD', 6, 4], [24.6, '#bRD', 6, 4], [25.3, '#dc1', 10, 6], [25.6, '#dc1', 14, 10], [26.1, '#bPush', 8, 6],
    [26.5, '#bPush', 14, 30], [27.0, [640, 660]], [27.45, [640, 660]],
    [29.65, [520, 560]], [30.4, '#ppic', 40, 20], [30.62, '#ppic', 40, 20], [30.95, '#miProof', -60, 2], [31.3, '#miProof', -60, 2], [31.9, '#miProof', -60, 2]
  ];
  var CLICKS = [24.6, 25.54, 26.35, 30.62, 31.3];
  K.each(function (t) {
    if (t < 21.6 || t > 31.9 || (t > 27.45 && t < 29.6)) { cur.style.visibility = 'hidden'; cfx.style.visibility = 'hidden'; return; }
    var i, pt;
    var res = function (k) { var c = CP[k]; return typeof c[1] === 'string' ? centerOf(c[1], c[2], c[3]) : { x: c[1][0], y: c[1][1] }; };
    if (t <= CP[0][0]) pt = res(0);
    else if (t >= CP[CP.length - 1][0]) pt = res(CP.length - 1);
    else for (i = 0; i < CP.length - 1; i++) if (t >= CP[i][0] && t < CP[i + 1][0]) { var a = res(i), b = res(i + 1), e = ease((t - CP[i][0]) / (CP[i + 1][0] - CP[i][0])); pt = { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e }; break; }
    cur.style.visibility = 'visible'; cur.style.transform = 'translate(' + (pt.x - 3).toFixed(1) + 'px,' + (pt.y - 3).toFixed(1) + 'px)';
    var fx = null; for (i = 0; i < CLICKS.length; i++) if (t >= CLICKS[i] && t < CLICKS[i] + 0.32) fx = (t - CLICKS[i]) / 0.32;
    if (fx == null) { cfx.style.visibility = 'hidden'; return; }
    cfx.style.visibility = 'visible'; cfx.style.left = pt.x + 'px'; cfx.style.top = pt.y + 'px'; cfx.style.opacity = (1 - fx).toFixed(2); cfx.style.transform = 'scale(' + (0.5 + fx * 0.9).toFixed(2) + ')';
  });

  /* phone — "even from your phone" (33.97–35.04): Add photo lands on today; "Not on Friday." on the word (35.24) */
  K.add('#ph', 'x', [[33.95, 1080], [34.25, 0, 'swipe'], [36.5, 0], [36.8, -1080, 'swipe']]);
  K.add('#tap1', 'opacity', [[0, 0], [34.43, 0], [34.45, 1], [34.7, 0]]).add('#tap1', 'scale', [[34.43, 0.5], [34.7, 1.2, 'out']]);
  K.add('#tap2', 'opacity', [[0, 0], [34.85, 0], [34.87, 1], [35.11, 0]]).add('#tap2', 'scale', [[34.85, 0.5], [35.11, 1.2, 'out']]);
  K.add('#pAdd', 'background', [[34.45, '#FFFFFF'], [34.51, '#ECF7EF'], [34.75, '#FFFFFF']]);
  K.add('#pdim', 'opacity', [[0, 0], [34.5, 0], [34.63, 1, 'out'], [34.91, 1], [35.01, 0, 'in']]);
  K.add('#psheet', 'y', [[0, 260], [34.5, 260], [34.67, 0, 'out'], [34.91, 0], [35.03, 260, 'in']]);
  K.add('#pflash', 'opacity', [[0, 0], [35.01, 0], [35.05, 0.9], [35.23, 0, 'out']]);
  K.add('#pNewW', 'height', [[35.11, 0], [35.37, 252, 'out']]);
  K.add('#pNew', 'opacity', [[0, 0], [35.15, 0], [35.33, 1, 'out']]);
  K.each(function (t) {
    if (t < 33.9 || t > 36.9) return;
    var S = $('#pscr').getBoundingClientRect();
    [['#tap1', '#pAdd'], ['#tap2', '#pTake']].forEach(function (p) {
      var B = $(p[1]).getBoundingClientRect(), el = $(p[0]);
      el.style.left = (B.left - S.left + 16 + B.width * 0.5) + 'px'; el.style.top = (B.top - S.top + 16 + B.height * 0.5) + 'px';
    });
  });

  /* captions for the product (phrases lifted from the narration, on their words) */
  var capA = document.createElement('div'); capA.className = 'cap'; capA.id = 'capA'; capA.style.cssText = 'top:1066px;font-size:66px'; capA.innerHTML = 'Log the rain day <span class="grn">once.</span>'; root.appendChild(capA);
  var capB = document.createElement('div'); capB.className = 'cap'; capB.id = 'capB'; capB.style.cssText = 'top:1136px;font-size:62px'; capB.innerHTML = 'It writes itself into <span class="grn">the diary.</span>'; root.appendChild(capB);
  var capC = document.createElement('div'); capC.className = 'cap'; capC.id = 'capC'; capC.style.cssText = 'top:1068px;font-size:58px;line-height:1.08'; capC.innerHTML = '<div>Photos land on the day</div><div>you post them.</div><div id="nof" class="amb">Not on Friday.</div>'; root.appendChild(capC);
  K.pop('#capA', 24.5, { dy: 20 });                                                                                                     // "log the rain day once" 24.56–26.12
  K.add('#capA', 'y', [[27.42, 0], [27.62, -22, 'out']]).add('#capA', 'scale', [[27.42, 1], [27.62, 0.86, 'out']]).add('#capA', 'opacity', [[27.42, 1], [27.62, 0.62, 'out'], [29.5, 0.62], [29.62, 0, 'in']]);
  K.pop('#capB', 27.95, { dy: 20 }).out('#capB', 29.5, 0.12);                                                                          // "writes itself into the diary" 27.95–29.44
  K.pop('#capC', 32.05, { dy: 20 }).out('#capC', 36.55, 0.12);                                                                         // "photos land on the day you post them" 32.06–33.92
  K.add('#nof', 'opacity', [[0, 0], [35.22, 0], [35.3, 1]]).add('#nof', 'scale', [[35.22, 1.2], [35.38, 1, 'slam']]);                   // "Not" 35.24

  /* S6 close ("It doesn't write the whole diary." 36.72) + S7 end card ("Book" 40.70) */
  K.add('#close', 'x', [[36.5, 1080], [36.8, 0, 'swipe']]);
  K.pop('#line1', 36.72, { dy: 24 });
  K.add('#scrap', 'opacity', [[36.78, 0], [36.79, 1, 'hold']]).add('#scrap', 'rotate', [[36.8, -9], [37.15, -4, 'out']]).add('#scrap', 'y', [[36.8, 60], [37.15, 0, 'out']]);
  K.add('#qcard', 'opacity', [[36.86, 0], [36.87, 1, 'hold']]).add('#qcard', 'y', [[36.86, 70], [37.16, 0, 'out']]).add('#qcard', 'scale', [[36.86, 0.94], [37.16, 1, 'out']]);   // solid cards (a fading white card reads grey)
  ['#q1', '#q2', '#q3', '#q4'].forEach(function (s, i) { K.pop(s, 36.98 + i * 0.1, { dy: 10, fade: 0.1 }); });
  K.add('#qmk', 'background', [[37.4, '#FFFFFF'], [37.7, '#FDE68A', 'out']]);                                                            // "whole diary" 37.79
  K.fade('#qlab', 37.2, 37.4);
  K.add('#line2', 'opacity', [[0, 0], [38.5, 0], [38.66, 1, 'out']]).add('#line2', 'y', [[38.5, 24], [38.74, 0, 'out'], [40.5, 0], [40.9, -444, 'inOut']]);   // "It writes the bits" 38.56
  // the end card fades in UNDER the close (no near-empty frame): logo from 40.5, the payoff line rises into it, pill on "Book" (40.70)
  K.add('#close', 'opacity', [[40.5, 1], [40.75, 0, 'in']]);
  K.add('#end', 'opacity', [[40.45, 0], [40.7, 1, 'out']]);
  K.add('#logoEnd', 'opacity', [[0, 0], [40.5, 0], [40.8, 1, 'out']]).add('#logoEnd', 'y', [[40.5, 24], [40.85, 0, 'out']]);
  K.pop('#cta', 40.72, { dy: 20 });
  K.pop('#url', 42.3, { dy: 16 });   // "Queue Ess Mee dot build" 42.44–43.92; qsme.build holds 3.1 s

  /* Thumbnail B (as-above-thumb.html sets window.AS_ABOVE_THUMB): the hook over the pulled-back shrinking week (render at 13.6) */
  if (window.AS_ABOVE_THUMB) K.each(function () {
    ['#hook', '#hookscrim'].forEach(function (s) { var e = $(s); e.style.opacity = 1; e.style.visibility = 'visible'; });
    ['#formon', '#clock', '#topscrim', '#capWed'].forEach(function (s) { $(s).style.visibility = 'hidden'; });
    $('#hookscrim').style.height = '430px';
    $('#cam').style.transform = 'translate(246px,430px) scale(0.66)';   // the whole week, below the hook
  });

  K.ready({ duration: DUR, fonts: ['400 40px Kalam', '700 60px Kalam', '700 64px "Space Grotesk"', '600 20px Inter', '600 28px "JetBrains Mono"'] });
})();
