/* "Wednesday: As above." — QSME Global · one timeline, markup built here.
 * Scenes. OUTPUT seconds on the MP4 first; [authored seconds] after (the edit list at the bottom maps output -> authored):
 *   0.00–8.50  S1  desk: the week's diary written at Friday 4:52pm (owner films this; Kalam fallback here)     [-1.20–7.30, see S1()]
 *   8.50–11.80 S2  "Nine months later." over QSME b-roll (finished townhouses, reframed) → plain email        [7.30–10.60]
 *  11.80–13.30 S3  back to the diary's Tuesday: "It was. Probably." + red ring + "?" in the blank weather box  [10.60–12.40]
 *  13.30–18.55 S4  QSME (recreated): Rain day → Push these tasks → hard cut to the Daily log                   [12.40–18.15]
 *  18.55–20.85 S5  QSME (recreated): chat photo → Mark as proof of work → hard cut to the Daily log            [18.15–20.45]
 *  20.85–22.90 S5b phone browser at app.qsme.build: Add photo → a wet-site photo lands on Tue 13 Oct           [20.45–22.30]
 *  22.90–25.50 S6  close: paper Tuesday vs QSME Tuesday                                                         [22.30–25.20]
 *  25.50–29.25 S7  end card (fades in under the close)                                                          [25.20–28.95]
 */
(function () {
  'use strict';
  var DUR = 28.95;  // authored timeline end; the EDL at the bottom makes the MP4 29.25 s
  var PRE = 1.2;    // S1 is written in OUTPUT seconds through S1(): it starts 1.2 s before authored 0, so S2+ keep their authored clock
  function S1(t) { return +(t - PRE).toFixed(3); }
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

  /* ------------------------------------------------------------------ timeline */
  var K = Kit;
  var $ = function (s) { return document.querySelector(s); };

  // scene visibility
  K.add('#desk', 'opacity', [[S1(0), 1], [7.3, 0, 'hold'], [10.6, 1, 'hold'], [12.7, 0, 'hold']]);
  K.scene('#s2', 7.3, 10.6).scene('#prod', 12.35, 20.75).scene('#ph', 20.4, 22.6).scene('#close', 22.25, 25.65).scene('#end', 25.2, DUR + 1);

  /* S1 — hook + the week shrinking. Every S1 time is OUTPUT seconds, wrapped in S1(). Captions hold >= 1.6 s (Tuesday 1.7 s). */
  K.add('#hook', 'opacity', [[S1(0), 1], [S1(2.45), 1], [S1(2.6), 0, 'in']]);
  K.add('#hookscrim', 'opacity', [[S1(0), 1], [S1(2.45), 1], [S1(2.7), 0, 'in']]);
  K.slam('#formon', S1(0.55), { from: 1.25, dur: 0.16 });
  K.add('#clock', 'opacity', [[S1(0), 0], [S1(2.55), 0], [S1(2.7), 1, 'out'], [S1(8.4), 1], [S1(8.5), 0, 'hold']]);
  K.add('#topscrim', 'opacity', [[S1(0), 0], [S1(2.55), 0], [S1(2.7), 1, 'out'], [S1(8.4), 1], [S1(8.5), 0, 'hold']]);
  K.count('#cm', [[S1(0), 52], [S1(4.4), 53, 'hold'], [S1(6.15), 55, 'hold'], [S1(6.7), 56, 'hold'], [S1(7.1), 57, 'hold'], [S1(7.7), 58, 'hold']], function (v) { return String(Math.round(v)); });
  K.add('#clock', 'scale', [[S1(7.68), 1], [S1(7.8), 1.12, 'out'], [S1(8.05), 1, 'inOut']]);
  K.pop('#capMon', S1(2.65), { dy: 24 }).out('#capMon', S1(4.25), 0.12);
  K.pop('#capTue', S1(4.28), { dy: 24 }).out('#capTue', S1(5.98), 0.12);
  K.pop('#capWed', S1(6.0), { dy: 24 }).out('#capWed', S1(7.6), 0.12);

  // camera over the page (desk coordinates = page coordinates; origin top-left)
  K.add('#cam', 'x', [[S1(0), 95], [S1(7.8), 95], [S1(8.22), 193, 'inOut'], [S1(8.49), 197], [10.6, -2, 'hold'], [12.4, -12]]);
  K.add('#cam', 'y', [[S1(0), 470], [S1(2.5), 452], [S1(3.0), 250, 'inOut'], [S1(4.05), 236], [S1(4.3), 60, 'inOut'], [S1(5.75), 50], [S1(6.0), -300, 'inOut'], [S1(7.8), -308], [S1(8.22), 124, 'inOut'], [S1(8.49), 120], [10.6, -214, 'hold'], [12.4, -232]]);
  K.add('#cam', 'scale', [[S1(0), 1], [S1(2.5), 1.01], [S1(3.0), 1, 'inOut'], [S1(7.8), 1], [S1(8.22), 0.78, 'inOut'], [S1(8.49), 0.775], [10.6, 1.4, 'hold'], [12.4, 1.43]]);
  K.add('#desk', 'x', [[12.4, 0], [12.7, -1080, 'swipe']]);

  // handwriting: clip reveal + pen follows
  var W = [
    { id: 'm1', t0: S1(0.0), t1: S1(0.5), p0: 0.16 }, { id: 'm2', t0: S1(0.58), t1: S1(1.12) }, { id: 'm3', t0: S1(1.2), t1: S1(1.74) }, { id: 'm4', t0: S1(1.82), t1: S1(2.36) },
    { id: 't1', t0: S1(4.4), t1: S1(5.0) },
    { id: 'wdw', t0: S1(6.05), t1: S1(6.1) }, { id: 'w1', t0: S1(6.15), t1: S1(6.5) },
    { id: 'thw', t0: S1(6.6), t1: S1(6.65) }, { id: 'h1', t0: S1(6.7), t1: S1(7.0) },
    { id: 'frw', t0: S1(7.1), t1: S1(7.15) }, { id: 'f1', t0: S1(7.7), t1: S1(7.95) }   // "Ditto." only after the Wednesday caption has gone
  ];
  W.forEach(function (w) { K.add('#' + w.id, 'clipX', [[w.t0, w.p0 || 0], [w.t1, 1, [0.3, 0.1, 0.7, 0.9]]]); });
  K.add('#fu', 'trim', [[S1(7.95), 0], [S1(8.08), 1, 'out']]);
  var page = $('#page'), pen = $('#pen');
  function pagePos(el) { var x = 0, y = 0; while (el && el !== page) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x: x, y: y }; }
  function linePt(w, p) { var el = document.getElementById(w.id), o = pagePos(el); return { x: o.x + el.offsetWidth * p, y: o.y + el.offsetHeight * 0.74 }; }
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
  K.each(function (t) {
    if (t > 7.3) { pen.style.visibility = 'hidden'; return; }
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

  // rain over Tuesday (deterministic streaks)
  var rain = $('#rain'), NS = 'http://www.w3.org/2000/svg', streaks = [];
  function hash(n) { var s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
  for (var r = 0; r < 120; r++) { var ln = document.createElementNS(NS, 'line'); ln.setAttribute('stroke', 'rgba(215,232,255,' + (0.45 + hash(r + 7) * 0.4).toFixed(2) + ')'); ln.setAttribute('stroke-width', (2.2 + hash(r + 3) * 2.4).toFixed(1)); ln.setAttribute('stroke-linecap', 'round'); rain.appendChild(ln); streaks.push(ln); }
  var tint = document.createElementNS(NS, 'rect'); tint.setAttribute('width', 1080); tint.setAttribute('height', 1350); tint.setAttribute('fill', 'rgba(30,70,135,.26)'); rain.insertBefore(tint, rain.firstChild);
  K.add('#rain', 'opacity', [[S1(0), 0], [S1(4.15), 0], [S1(4.35), 1, 'out'], [S1(5.75), 1], [S1(5.95), 0, 'in']]);
  K.each(function (t) {
    if (t < S1(4.1) || t > S1(6.0)) return;
    var tt = t + PRE;   // output clock keeps the streak field identical to the first build
    for (var i = 0; i < streaks.length; i++) {
      var v = 1500 + hash(i + 1) * 900, L = 50 + hash(i + 2) * 90, y = ((hash(i + 5) * 1500 + v * tt) % 1560) - 120, x = hash(i + 9) * 1300 - 60 - y * 0.22;
      streaks[i].setAttribute('x1', x.toFixed(1)); streaks[i].setAttribute('y1', y.toFixed(1)); streaks[i].setAttribute('x2', (x - L * 0.22).toFixed(1)); streaks[i].setAttribute('y2', (y + L).toFixed(1));
    }
  });

  /* S2 — nine months later (b-roll scaled from its right edge so the lit left window, with a figure in it, stays out of frame) */
  K.clip('#done', { dir: 'clips/done', t0: 7.3, t1: 10.6, fps: 30, frames: 99, ext: '.jpg' });
  K.add('#done', 'scale', [[7.3, 1.16], [10.6, 1.23, 'linear']]);
  K.add('#done', 'blur', [[7.85, 0], [8.2, 6, 'out']]);
  K.add('#s2shade', 'opacity', [[7.3, 0.8], [7.85, 0.8], [8.2, 1, 'out']]);
  K.add('#nine', 'opacity', [[7.3, 0], [7.36, 1]]).add('#nine', 'scale', [[7.3, 1.12], [7.5, 1, 'slam'], [7.85, 0.985], [8.15, 0.62, 'inOut']]);
  K.add('#nine', 'y', [[7.85, 0], [8.15, -392, 'inOut']]);
  K.add('#mail', 'opacity', [[7.9, 0], [8.08, 1, 'out']]).add('#mail', 'y', [[7.9, 140], [8.25, 0, 'out']]);
  K.add('#mail mark', 'background', [[8.3, '#FFFFFF'], [8.6, '#FDE68A', 'out']]);

  /* S3 — "It was. Probably." */
  var ringDone = false;
  K.each(function (t) {
    if (ringDone) return;
    var el = $('#t1'); if (!el.offsetWidth) return;
    var o = pagePos(el), w = el.offsetWidth, h = el.offsetHeight, cx = o.x + w / 2, cy = o.y + h * 0.55, rx = w / 2 + 34, ry = h / 2 + 22;
    var d = 'M ' + (cx + rx * 0.92).toFixed(1) + ' ' + (cy - ry * 0.55).toFixed(1);
    for (var k = 1; k <= 40; k++) { var a = -0.55 + k / 40 * (Math.PI * 2 + 0.5), rr = 1 + Math.sin(k * 0.9) * 0.025; d += ' L ' + (cx + Math.cos(a) * rx * rr).toFixed(1) + ' ' + (cy - Math.sin(a) * ry * rr * 1.0 + k * 0.35).toFixed(1); }
    $('#ringp').setAttribute('d', d); ringDone = true;
  });
  K.add('#ringp', 'trim', [[S1(0), 0], [10.72, 0], [11.12, 1, 'out']]);
  K.add('#tq', 'opacity', [[S1(0), 0], [11.1, 0], [11.12, 1, 'hold']]).add('#tq', 'clipY', [[11.1, 0], [11.3, 1, 'out']]);
  K.add('#capWas', 'opacity', [[S1(0), 0], [10.6, 0], [10.62, 1, 'hold'], [12.7, 1], [12.72, 0, 'hold']]);
  K.slam('#was', 10.85, { from: 1.2 }).slam('#prob', 11.35, { from: 1.25 });
  K.add('#capWas', 'x', [[12.4, 0], [12.7, -1080, 'swipe']]);
  K.add('#wasScrim', 'opacity', [[S1(0), 0], [10.6, 0], [10.62, 1, 'hold'], [12.7, 1], [12.72, 0, 'hold']]).add('#wasScrim', 'x', [[12.4, 0], [12.7, -1080, 'swipe']]);

  /* S4 — product: rain day → push → (hard cut) daily log */
  K.add('#prod', 'x', [[12.4, 1080], [12.7, 0, 'swipe'], [20.45, 0], [20.75, -1080, 'swipe']]);
  K.count('#tc', [[0, 0], [18.15, 1, 'hold']], function (v) { return ['11:06', '11:42'][Math.round(v)]; });
  // pages: hard cuts (a dissolve of two dense screens reads as mush). The Daily log comes back after the proof-of-work tag.
  K.add('#pgS', 'opacity', [[16.45, 1], [16.46, 0, 'hold']]);
  K.add('#pgL', 'opacity', [[0, 0], [16.46, 1, 'hold'], [18.15, 0, 'hold'], [19.45, 1, 'hold']]).add('#pgL', 'y', [[16.46, 26], [16.66, 0, 'out'], [19.45, 26, 'hold'], [19.65, 0, 'out']]);
  K.add('#pgM', 'opacity', [[0, 0], [18.15, 1, 'hold'], [19.45, 0, 'hold']]).add('#pgM', 'y', [[18.15, 26], [18.35, 0, 'out']]);
  // dialog
  K.add('#dimS', 'opacity', [[0, 0], [12.98, 0], [13.12, 1, 'out'], [14.42, 1], [14.56, 0, 'in']]);
  K.add('#dlg', 'opacity', [[0, 0], [12.98, 0], [13.1, 1, 'out'], [14.42, 1], [14.54, 0, 'in']]).add('#dlg', 'scale', [[12.98, 0.95], [13.18, 1, 'out'], [14.42, 1], [14.54, 0.97]]);
  K.add('#dc1', 'background', [[13.46, '#FFFFFF'], [13.5, '#EEF6FF', 'hold']]).add('#dc1', 'borderColor', [[13.46, '#DDE3E0'], [13.5, '#2B7BC8', 'hold']]);
  K.add('#dc1 .bx', 'background', [[13.46, '#FFFFFF'], [13.5, '#2B7BC8', 'hold']]).add('#dc1 .bx', 'borderColor', [[13.46, '#A8B3AD'], [13.5, '#2B7BC8', 'hold']]);
  K.add('#tick', 'opacity', [[0, 0], [13.48, 0], [13.52, 1]]);
  K.add('#wmSum', 'opacity', [[0, 0], [13.56, 0], [13.68, 1]]);
  ['#wr0', '#wr1', '#wr2', '#wr3'].forEach(function (s, i) { K.pop(s, 13.62 + i * 0.08, { dy: 12, fade: 0.12 }); });
  K.add('#bPush', 'scale', [[14.3, 1], [14.36, 0.94], [14.46, 1]]);
  K.add('#bRD', 'scale', [[12.93, 1], [12.99, 0.94], [13.08, 1]]);
  // the programme moves
  K.add('#bF', 'width', [[14.52, 98], [14.92, 151, 'inOut']]);
  K.add('#bI', 'x', [[14.52, 0], [14.92, 159, 'inOut']]);
  K.add('#bS', 'opacity', [[14.52, 1], [14.75, 0.32]]).add('#bP', 'opacity', [[14.52, 1], [14.75, 0.32]]);
  K.add('#bSw', 'opacity', [[0, 0], [14.6, 0], [14.75, 1]]).add('#bSw', 'x', [[14.6, -53], [14.92, 0, 'inOut']]);
  K.add('#bPw', 'opacity', [[0, 0], [14.6, 0], [14.75, 1]]).add('#bPw', 'x', [[14.6, -53], [14.92, 0, 'inOut']]);
  K.add('#gdTue', 'background', [[14.55, '#F5F7F6'], [14.7, '#2B7BC8', 'out']]).add('#gdTue', 'color', [[14.55, '#7A8794'], [14.7, '#FFFFFF', 'out']]);
  K.add('#gdTue b', 'color', [[14.55, '#1E293B'], [14.7, '#FFFFFF', 'out']]);
  K.count('#wN', [[0, 0], [14.9, 2, 'hold']], function (v) { return String(Math.round(v)); });
  K.add('#chW', 'background', [[14.88, '#FFFFFF'], [14.92, '#FFF8E6', 'hold']]).add('#chW', 'borderColor', [[14.88, '#E1E7E3'], [14.92, '#F7D58B', 'hold']]).add('#chW', 'color', [[14.88, '#334155'], [14.92, '#92400E', 'hold']]);
  // (15.4–16.4 authored is the old "What happened" beat: cut by the EDL; the schedule is still there)
  // daily log entries write themselves in; the day header gets the email's yellow marker (question → answer)
  K.add('#dmk', 'background', [[16.6, '#F5F7F6'], [16.9, '#FDE68A', 'out']]);
  K.pop('#eR', 16.78, { dy: 18 }).pop('#eS', 17.0, { dy: 18 });
  K.add('#eR', 'borderColor', [[16.78, '#16A34A'], [17.6, '#E1E7E3', 'inOut']]).add('#eS', 'borderColor', [[17.0, '#16A34A'], [17.8, '#E1E7E3', 'inOut']]);

  /* S5 — chat photo → Mark as proof of work → hard cut to the Daily log, where it lands under Tue 13 Oct */
  K.add('#pmenu', 'opacity', [[0, 0], [18.86, 0], [18.96, 1, 'out'], [19.34, 1], [19.42, 0, 'in']]).add('#pmenu', 'scale', [[18.86, 0.94], [19.0, 1, 'out']]);
  K.add('#miProof', 'background', [[19.1, '#FFFFFF'], [19.2, '#ECF7EF', 'out']]);
  var ePH = $('#eP').offsetHeight + 10;
  K.add('#ePW', 'height', [[19.58, 0], [19.8, ePH, 'out']]);
  K.add('#eP', 'opacity', [[0, 0], [19.6, 0], [19.76, 1, 'out']]).add('#eP', 'borderColor', [[19.6, '#16A34A'], [20.4, '#E1E7E3', 'inOut']]);

  // cursor path (targets resolved from the layout)
  var app = $('#app'), cur = $('#cur'), cfx = $('#cfx');
  function centerOf(sel, dx, dy) { var A = app.getBoundingClientRect(), B = $(sel).getBoundingClientRect(); return { x: B.left - A.left + B.width / 2 + (dx || 0), y: B.top - A.top + B.height / 2 + (dy || 0) }; }
  var CP = [
    [12.55, [640, 520]], [12.95, '#bRD', 6, 4], [13.2, '#bRD', 6, 4], [13.46, '#dc1', 10, 6], [13.9, '#dc1', 14, 10], [14.32, '#bPush', 8, 6],
    [14.6, '#bPush', 14, 30], [15.2, [640, 660]], [16.4, [640, 660]],
    [18.2, [520, 560]], [18.62, '#ppic', 40, 20], [18.84, '#ppic', 40, 20], [19.06, '#miProof', -60, 2], [19.28, '#miProof', -60, 2], [19.45, '#miProof', -60, 2]
  ];
  var CLICKS = [12.95, 13.46, 14.32, 18.84, 19.28];
  K.each(function (t) {
    if (t < 12.4 || t > 19.45 || (t > 16.45 && t < 18.15)) { cur.style.visibility = 'hidden'; cfx.style.visibility = 'hidden'; return; }
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

  /* phone — Add photo lands on today */
  K.add('#ph', 'x', [[20.45, 1080], [20.75, 0, 'swipe'], [22.3, 0], [22.6, -1080, 'swipe']]);
  K.add('#tap1', 'opacity', [[0, 0], [21.18, 0], [21.2, 1], [21.45, 0]]).add('#tap1', 'scale', [[21.18, 0.5], [21.45, 1.2, 'out']]);
  K.add('#tap2', 'opacity', [[0, 0], [21.6, 0], [21.62, 1], [21.86, 0]]).add('#tap2', 'scale', [[21.6, 0.5], [21.86, 1.2, 'out']]);
  K.add('#pAdd', 'background', [[21.2, '#FFFFFF'], [21.26, '#ECF7EF'], [21.5, '#FFFFFF']]);
  K.add('#pdim', 'opacity', [[0, 0], [21.25, 0], [21.38, 1, 'out'], [21.66, 1], [21.76, 0, 'in']]);
  K.add('#psheet', 'y', [[0, 260], [21.25, 260], [21.42, 0, 'out'], [21.66, 0], [21.78, 260, 'in']]);
  K.add('#pflash', 'opacity', [[0, 0], [21.76, 0], [21.8, 0.9], [21.98, 0, 'out']]);
  K.add('#pNewW', 'height', [[21.86, 0], [22.12, 252, 'out']]);
  K.add('#pNew', 'opacity', [[0, 0], [21.9, 0], [22.08, 1, 'out']]);
  K.each(function (t) {
    if (t < 20.4 || t > 22.6) return;
    var S = $('#pscr').getBoundingClientRect();
    [['#tap1', '#pAdd'], ['#tap2', '#pTake']].forEach(function (p) {
      var B = $(p[1]).getBoundingClientRect(), el = $(p[0]);
      el.style.left = (B.left - S.left + 16 + B.width * 0.5) + 'px'; el.style.top = (B.top - S.top + 16 + B.height * 0.5) + 'px';
    });
  });

  /* captions for the product */
  var capA = document.createElement('div'); capA.className = 'cap'; capA.id = 'capA'; capA.style.cssText = 'top:1066px;font-size:66px'; capA.innerHTML = 'Log the rain day <span class="grn">once.</span>'; root.appendChild(capA);
  var capB = document.createElement('div'); capB.className = 'cap'; capB.id = 'capB'; capB.style.cssText = 'top:1136px;font-size:62px'; capB.innerHTML = 'It writes itself into <span class="grn">the diary.</span>'; root.appendChild(capB);
  var capC = document.createElement('div'); capC.className = 'cap'; capC.id = 'capC'; capC.style.cssText = 'top:1068px;font-size:58px;line-height:1.08'; capC.innerHTML = '<div>Photos land on the day</div><div>you post them.</div><div id="nof" class="amb">Not on Friday.</div>'; root.appendChild(capC);
  K.pop('#capA', 12.62, { dy: 20 });
  K.add('#capA', 'y', [[16.42, 0], [16.62, -22, 'out']]).add('#capA', 'scale', [[16.42, 1], [16.62, 0.86, 'out']]).add('#capA', 'opacity', [[16.42, 1], [16.62, 0.62, 'out'], [18.06, 0.62], [18.18, 0, 'in']]);
  K.pop('#capB', 16.46, { dy: 20 }).out('#capB', 18.06, 0.12);   // pops on the cut to the Daily log: 2.1 s on screen
  K.pop('#capC', 18.2, { dy: 20 }).out('#capC', 22.3, 0.12);
  K.add('#nof', 'opacity', [[0, 0], [21.92, 0], [22.0, 1]]).add('#nof', 'scale', [[21.92, 1.2], [22.08, 1, 'slam']]);

  /* S6 close + S7 end */
  K.add('#close', 'x', [[22.3, 1080], [22.6, 0, 'swipe']]);
  K.pop('#line1', 22.42, { dy: 24 });
  K.add('#scrap', 'opacity', [[22.48, 0], [22.49, 1, 'hold']]).add('#scrap', 'rotate', [[22.5, -9], [22.85, -4, 'out']]).add('#scrap', 'y', [[22.5, 60], [22.85, 0, 'out']]);
  K.add('#qcard', 'opacity', [[22.56, 0], [22.57, 1, 'hold']]).add('#qcard', 'y', [[22.56, 70], [22.86, 0, 'out']]).add('#qcard', 'scale', [[22.56, 0.94], [22.86, 1, 'out']]);   // solid cards (a fading white card reads grey)
  ['#q1', '#q2', '#q3', '#q4'].forEach(function (s, i) { K.pop(s, 22.68 + i * 0.1, { dy: 10, fade: 0.1 }); });
  K.add('#qmk', 'background', [[22.9, '#FFFFFF'], [23.2, '#FDE68A', 'out']]);
  K.fade('#qlab', 22.9, 23.1);
  K.add('#line2', 'opacity', [[0, 0], [23.0, 0], [23.16, 1, 'out']]).add('#line2', 'y', [[23.0, 24], [23.24, 0, 'out'], [25.22, 0], [25.62, -444, 'inOut']]);
  // the end card fades in UNDER the close (no near-empty frame): logo from 25.25, the payoff line rises into it
  K.add('#close', 'opacity', [[25.25, 1], [25.5, 0, 'in']]);
  K.add('#end', 'opacity', [[25.2, 0], [25.45, 1, 'out']]);
  K.add('#logoEnd', 'opacity', [[0, 0], [25.25, 0], [25.55, 1, 'out']]).add('#logoEnd', 'y', [[25.25, 24], [25.6, 0, 'out']]);
  K.pop('#cta', 25.55, { dy: 20 });
  K.pop('#url', 25.65, { dy: 16 });   // qsme.build holds 3.3 s

  /* Thumbnail B (as-above-thumb.html sets window.AS_ABOVE_THUMB): the hook over the pulled-back shrinking week */
  if (window.AS_ABOVE_THUMB) K.each(function () {
    ['#hook', '#hookscrim'].forEach(function (s) { var e = $(s); e.style.opacity = 1; e.style.visibility = 'visible'; });
    ['#formon', '#clock', '#topscrim', '#capWed'].forEach(function (s) { $(s).style.visibility = 'hidden'; });
    $('#hookscrim').style.height = '430px';
    $('#cam').style.transform = 'translate(246px,430px) scale(0.66)';   // the whole week, below the hook
  });

  /* ---- Edit decision list. Everything above is authored on one clock (S1 on its own, offset by PRE); these cuts and holds
   * are applied at render time (output t -> authored t). Cuts only sit in still holds; holds only freeze still frames.
   *   cut 0.30 s at 11.95 ("It was. Probably." hold)
   *   cut 1.00 s at 15.40 (the schedule after the push: the old "What happened" beat, removed)
   *   hold 0.50 s at 17.85 (Daily log, so the stacked caption reads: 2.1 s) · cut 0.20 s at 20.80 (idle phone before the tap)
   *   hold 0.40 s at 22.16 (the photo has landed on Tue 13 Oct) · cut 0.30 s at 24.40 (close hold, so the VO payoff + CTA fit)
   * Output = authored + 1.2 for t < 11.95; +0.9 (12.25–15.4); -0.1 (16.4–17.85); +0.4 (17.85–20.8); +0.2 (21.0–22.16);
   * +0.6 (22.16–24.4); +0.3 after 24.7. So the MP4 is DUR + 0.3 s long. Times in post.md / vo-script are OUTPUT times. */
  var EDL = [{ at: 11.95, cut: 0.3 }, { at: 15.4, cut: 1.0 }, { at: 17.85, hold: 0.5 }, { at: 20.8, cut: 0.2 }, { at: 22.16, hold: 0.4 }, { at: 24.4, cut: 0.3 }];
  var SEG = [], o = 0, g = -PRE;
  EDL.forEach(function (e) { SEG.push({ o: o, g: g, r: 1 }); o += e.at - g; g = e.at; if (e.cut) g += e.cut; if (e.hold) { SEG.push({ o: o, g: g, r: 0 }); o += e.hold; } });
  SEG.push({ o: o, g: g, r: 1 });
  var OUT_DUR = +(DUR + o - g).toFixed(3);
  function warp(t) { var sg = SEG[0]; for (var i = 0; i < SEG.length; i++) if (SEG[i].o <= t + 1e-9) sg = SEG[i]; return sg.g + (t - sg.o) * sg.r; }
  var RAW = K.render; K.render = function (t) { return RAW(warp(t)); };
  window.__warp = warp;

  K.ready({ duration: OUT_DUR, fonts: ['400 40px Kalam', '700 60px Kalam', '700 64px "Space Grotesk"', '600 20px Inter', '600 28px "JetBrains Mono"'] });
})();
