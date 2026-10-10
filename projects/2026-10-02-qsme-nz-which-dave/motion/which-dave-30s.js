// Which Dave? — 30 s reel. Rebuilt 2026-10-02, review fixes 2026-10-03, product beat + end card rebuilt 2026-10-04 to the
// calendar concept and the owner CTA rule (no filmed shot, no owner recording, no pricing / "free" lines anywhere).
// 2026-10-04 review pass: one Dave all the way through (the contacts name types "Dave K."), Mel's job in the mock data
// ("Bathroom + deck"), the tally counts 1 → 3 → 5 → 6 (ish) → ? on the comments, bigger recreations, 28 px chips, the
// product beat gets the time the end card didn't need, "Every quote covers the same lines.", 4:5 thread sits lower.
// 2026-10-06 AUDIO-FIRST REMAKE (owner feedback: no gaps, no breath cuts, a real hook, continuous speech): the Cam S
// eleven_v3 take is the clock, ONE unbroken request laid at 0.0. Every beat is placed on its word in alignment.json.
// 2026-10-10 RETAKE (owner rule 2026-10-08: the CTA is said "dot koh dot en zed"): new whole take
// outputs/vo-take-cam-v3/take.mp3 (35.79 s, speech 0.00–35.76), same text apart from "koh". Every beat below was re-timed
// to the new words (old word → new word, measured on the audio); the page runs 37.3 s (take + 1.5 s tail). Design unchanged.
//   0.0–4.0   hook, three kinetic lines on the words: "212 comments." (count 197 → 205 → 212 on "twelve", 0.67), "Six Daves."
//             (1.58), "Still no builder." (3.0). Hard cut to the thread at 4.0.
//   4.0–22.25 the thread. Mel's post card 4.0–4.54 (underline 4.12–4.39), collapses 4.54–4.76; Kerry pops on "Cousin Dave"
//             (4.73), Sam on "Hillcrest Dave" (5.47), Aroha on "Deck Dave" (8.08), Jase on "Big Dave" (10.56); the tally counts
//             the Daves as they are said: 1 (4.97) → 3 (6.30) → 5 (9.71) → 6 (ish) (11.81) → ? (16.83, on "mean?"). Fling
//             under "Then Dave turns up." (13.78), slam on "Dave here." (14.37, circle 14.5), Mel's "...can anyone actually
//             come and quote?" (17.64), Kerry's "Dave can." (20.82), swipe to QSME 21.9–22.3 landing on "Or." (22.24)
//   22.25–24.32 A  "Or. Put the actual job on QSME." over the REAL iPhone app still (04-project, demo data) in a phone-style
//             frame; red marker on "Ask for quotes" (22.72, "actual") and "Invite" (23.18, "job"), marker note "Dave K." →
//             Invite (23.52, "on QSME")
//   24.32–26.92 B  "Post it once. Invite the trades you choose." Two muted, cropped walkthrough recreations stacked: tenders
//             Step 1 "Tender details" with the title typing "Bathroom + deck" (24.76) and contacts "Add contact" (25.54, on
//             "Invite") with the Name typing "Dave K."; marker "your Dave" (26.46, "you choose")
//   26.92–30.5 C  "Every quote covers the same lines." (the voice carries on: "so you compare them in one table") over tenders
//             Step 2 "Scope from SOQ" relabelled to Mel's job; rows tick 27.85, 28.18, 28.50 (quote / covers / same),
//             bracket 28.73 ("lines"), note 29.02
//   30.58–32.16 D  callback: "Dave count: 1" (30.58, "table." ends 30.61) + green tick (30.83) / "— the one you invited."
//             (30.89) / "Know which Dave." (31.04, on "Know")
//   32.16–37.3 end card: the tally shrinks into the upper-left corner, QSME logo (32.26), "Know which Dave." moves up,
//             green button "Sign up at qsme.co.nz" pops on "Sign up" (32.24; pulses 33.74 and 36.04). (Owner CTA rule 2026-10-03.)
// Walkthrough crops come from motion/clips (muted JPEG frames of assets/qsme/walkthroughs/client-tenders.mp4 and
// client-contacts.mp4), each labelled "Recreation of the app · mock data". Their mock text is swapped for Mel's job with
// HTML overlays in the recreation's own font, size and colour (still mock data, still labelled). No comparison,
// publish-to-market, "Quick Jobs", contact-list or "saved automatically" frames are used.
(function () {
  'use strict';
  const R45 = document.body.classList.contains('r4x5');
  const SB = R45 ? 1530 : 1250;        // safe-box bottom in stage coords (4:5: frame 1290 + 240)
  const SAFE_T = 300;                  // safe-box top in stage coords (both cuts)
  const q = R45 ? 1 : 0;
  const L45 = q * 120;                 // 4:5: the comment list sits 120 px lower so the thread fills the feed frame
  const BODY = 4.0;                    // hook 0–4.0 ("Still no builder." ends 3.90), then the thread
  const SW = 21.9;                     // the group app swipes away to QSME 21.9–22.3 ("Or." 22.24)
  const DUR = 37.3;                    // take ends 35.76 (file 35.79) + ~1.5 s tail
  const $ = id => document.getElementById(id);
  const LOGO = 'qsme-logo.svg';
  const centreTop = h => Math.round(SAFE_T + (SB - SAFE_T - h) / 2);

  // ---------------------------------------------------------------- markup
  const chrome = cls => `
    <div class="chrome abs ${cls || ''}">
      <svg class="abs" style="left:858px;top:34px" width="180" height="32" viewBox="0 0 180 32">
        <g fill="#1C1C1E"><rect x="0" y="20" width="7" height="10" rx="2"/><rect x="11" y="15" width="7" height="15" rx="2"/><rect x="22" y="9" width="7" height="21" rx="2"/><rect x="33" y="3" width="7" height="27" rx="2"/></g>
        <g fill="none" stroke="#1C1C1E" stroke-width="3.4" stroke-linecap="round"><path d="M58 13a20 20 0 0 1 28 0"/><path d="M63 19a12 12 0 0 1 18 0"/></g><circle cx="72" cy="25" r="3.2" fill="#1C1C1E"/>
        <rect x="104" y="4" width="54" height="25" rx="7" fill="none" stroke="#1C1C1E" stroke-opacity=".45" stroke-width="2.4"/><rect x="108" y="8" width="40" height="17" rx="4" fill="#1C1C1E"/><rect x="161" y="12" width="4" height="9" rx="2" fill="#1C1C1E" fill-opacity=".45"/>
      </svg>
      <svg class="abs" style="left:34px;top:142px" width="56" height="56" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="#1C1C1E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="abs" style="left:106px;top:138px;width:64px;height:64px;border-radius:14px;background:#8A8A80;display:flex;align-items:center;justify-content:center">
        <svg width="36" height="36" viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="#fff"/></svg>
      </div>
      <svg class="abs" style="left:888px;top:144px" width="52" height="52" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="#1C1C1E" stroke-width="2.2"/><path d="M15.5 15.5L21 21" stroke="#1C1C1E" stroke-width="2.4" stroke-linecap="round"/></svg>
      <svg class="abs" style="left:966px;top:144px" width="52" height="52" viewBox="0 0 24 24"><g fill="#1C1C1E"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></g></svg>
    </div>`;
  // a band of a source image (source px x0.., y0..) scaled by k, positioned inside its panel (the iPhone still)
  const bandImg = (src, x0, y0, k, natW, id, extra) => `<img ${id ? `id="${id}" ` : ''}src="${src}" alt="" style="position:absolute;display:block;max-width:none;width:${(natW * k).toFixed(2)}px;left:${(-x0 * k).toFixed(2)}px;top:${(-y0 * k).toFixed(2)}px;${extra || ''}">`;
  const band = (top, w, h, inner, id) => `<div ${id ? `id="${id}" ` : ''}class="abs" style="left:0;top:${top.toFixed(2)}px;width:${w}px;height:${h.toFixed(2)}px;overflow:hidden">${inner}</div>`;
  // a band of a 1920x1080 walkthrough frame (rows y0..y1 from x0) scaled by k. Everything inside is laid out in SOURCE px,
  // so the overlays (covers + the swapped mock text) sit exactly on the recreation's own UI and scale with it.
  const sband = (top, x0, y0, y1, k, img, inner, id, imgCls) => `<div ${id ? `id="${id}" ` : ''}class="abs" style="left:0;top:${top.toFixed(2)}px;width:950px;height:${((y1 - y0) * k).toFixed(2)}px;overflow:hidden"><div class="abs" style="left:0;top:0;width:1920px;height:1080px;transform-origin:0 0;transform:scale(${k}) translate(${-x0}px,${-y0}px)"><img ${imgCls ? `class="${imgCls}" ` : ''}src="${img}" alt="" style="position:absolute;left:0;top:0;width:1920px;height:1080px;max-width:none">${inner || ''}</div></div>`;
  const cover = (x0, y0, x1, y1, bg, id) => `<div ${id ? `id="${id}" ` : ''}class="abs" style="left:${x0}px;top:${y0}px;width:${x1 - x0}px;height:${y1 - y0}px;background:${bg}"></div>`;
  // mock text in the recreation's font (Inter, calibrated on the source frames: ink width + baseline)
  // (a 0.3 px source blur matches the softness of the upscaled 1080p recreation, so the swapped text doesn't look pasted on)
  const utext = (x, top, size, weight, col, text, id) => `<div ${id ? `id="${id}" ` : ''}class="abs" style="left:${x}px;top:${top}px;font:${weight} ${size}px/1 Inter;color:${col};white-space:nowrap;filter:blur(0.3px)">${text}</div>`;
  const typed = (x, top, size, id) => `<div class="abs" style="left:${x}px;top:${top}px;font:400 ${size}px/1 Inter;color:#0F172A;white-space:nowrap;filter:blur(0.3px)"><span id="${id}T"></span><i id="${id}Car" class="car"></i></div>`;
  const chip = (id, text, left) => `<div class="chipw" style="display:flex;justify-content:${left ? 'flex-start' : 'center'};${left ? 'padding-left:' + left + 'px;' : ''}margin-top:-21px;position:relative"><span id="${id}" class="rchip">${text}</span></div>`;
  const REC = 'Recreation of the app · mock data';
  const frame = (dir, i) => `clips/${dir}/f_${String(i).padStart(5, '0')}.jpg`;
  const INK = '#0F172A';

  // A — the real iPhone still (1440x2560): "Project" nav bar (y 56–240) + tile grid (y 920–1330), x 150–1290
  const PHONE = '../../../assets/qsme/phone/04-project.png';
  const PH = { x0: 150, x1: 1290, nav: [56, 240], grid: [920, 1330] };
  const kP = 950 / (PH.x1 - PH.x0);
  PH.navH = (PH.nav[1] - PH.nav[0]) * kP; PH.gridH = (PH.grid[1] - PH.grid[0]) * kP; PH.h = PH.navH + PH.gridH;
  const phX = x => (x - PH.x0) * kP, phY = y => PH.navH + (y - PH.grid[0]) * kP;   // grid source px → panel px

  // B1 — tenders Step 1 (tender-step1 = client-tenders 3.5–5.5 s, 1920x1080): "Tender details" heading, subline, title label
  //      and field, x 664.. at 1.95x (the field runs off the right edge; the pointer stays at x ≥ 1490), y 318–498.
  //      The field's text (placeholder, then "Civils & Earthworks Package") is covered; "Bathroom + deck" types on top.
  const S1 = { dir: 'tender-step1', n: 60, x0: 664, y0: 318, y1: 498, k: 1.95 };
  S1.h = (S1.y1 - S1.y0) * S1.k;
  // B2 — contacts "Add contact" (contacts-add = client-contacts 4.2–6.4 s): two bands at 1.95x from x 730 — heading (y 204–262,
  //      the "They'll auto-link to their QSME account by email" subline covered) and Name label + field (y 284–370).
  //      From the first typed frame the field's text is covered and "Dave K." types on top.
  const CT = { dir: 'contacts-add', x0: 730, k: 1.95, b1: [204, 262], b2: [284, 370] };
  CT.h1 = (CT.b1[1] - CT.b1[0]) * CT.k; CT.h = CT.h1 + (CT.b2[1] - CT.b2[0]) * CT.k;
  const ctX = x => (x - CT.x0) * CT.k, ctY = y => (y <= CT.b1[1] ? (y - CT.b1[0]) * CT.k : CT.h1 + (y - CT.b2[0]) * CT.k);

  // C — tenders Step 2 "Scope from SOQ" (tender-soq = client-tenders 7.85–10.95 s): heading, subline, "Pulled from your SOQ"
  //     strip and the first three pocket rows, x 664.. at 1.9x, y 296–643. Unticked rows from f_00000, ticked from f_00091
  //     (both pointer-free). The project name and the three row labels are swapped for Mel's job.
  const SOQ0 = frame('tender-soq', 0), SOQ1 = frame('tender-soq', 91);
  const SQ = { x0: 664, k: 1.9, y0: 296, y1: 643, rows: [[453, 517], [517, 580], [580, 643]], base: [491.5, 554.5, 617.5] };
  const sqY = y => (y - SQ.y0) * SQ.k, sqX = x => (x - SQ.x0) * SQ.k;
  const sqH = (SQ.y1 - SQ.y0) * SQ.k;
  const ROWS = ['Strip-out', 'Waterproofing &amp; tiling', 'Deck framing'];
  const LBL = { x: 736, size: 16.85 }, LBLtop = b => +(b - 0.8633 * LBL.size).toFixed(2);   // Inter, line-height 1: baseline at 0.8633em
  const rowText = (bg, pre) => SQ.base.map((b, i) => cover(732, Math.round(b - 17), 1110, Math.round(b + 6), bg) + utext(LBL.x, LBLtop(b), LBL.size, 600, INK, ROWS[i], pre ? pre + i : '')).join('');
  const sqTicks = SQ.rows.map(([y0, y1], i) => sband(sqY(y0), SQ.x0, y0, y1, SQ.k, SOQ1, rowText('#E1F4E8'), 'tk' + i)).join('');
  const taps = [0, 1, 2].map(i => `<div id="tap${i}" class="tap abs" style="left:${(sqX(709) - 40).toFixed(1)}px;top:${(sqY((SQ.rows[i][0] + SQ.rows[i][1]) / 2) - 40).toFixed(1)}px"></div>`).join('');

  // D — callback block (9:16 top; 4:5 adds 140); E — end card: "Know which Dave." moves up 90, logo above, button below
  const dTop = 560 + q * 140;
  const knowTop = dTop + 300, knowEnd = knowTop - 90;
  const logoTop = knowEnd - 181 - 56, pillTop = knowEnd + 154 + 52;

  $('stage').innerHTML = `
  <div id="app">
    <div id="viewport" class="abs" data-qa-ignore style="height:${SB - 510}px"><div id="list" style="top:${90 + L45}px"></div></div>
    <div class="fade abs" style="top:500px;height:100px;background:linear-gradient(#fff 75%,rgba(255,255,255,0))"></div>
    <div class="fade abs" style="top:${SB - 56}px;height:56px;background:linear-gradient(rgba(255,255,255,0),#fff)"></div>
    ${chrome()}
    <div class="abs" style="left:0;top:1748px;width:1080px;height:2px;background:#E3E2DD"></div>
    <div class="abs" style="left:40px;top:1774px;width:76px;height:76px;border-radius:50%;background:#C4613A"></div>
    <div class="abs" style="left:136px;top:1774px;width:904px;height:76px;border-radius:38px;background:#EFEFEA"></div>
    <div class="abs" style="left:390px;top:1886px;width:300px;height:10px;border-radius:5px;background:#1C1C1E;opacity:.85"></div>
    <div id="morph" class="abs"></div>
    <div id="card" class="abs">
      <div class="grow"><div class="gav">HL</div><div class="gname">Hillcrest Locals (Unofficial)</div></div>
      <div class="hr"></div>
      <div class="pbody">
        <div class="arow"><div class="av" style="background:#C4613A;width:96px;height:96px;font-size:35px">MR</div><div><div class="aname">Mel R.</div><div class="ameta">2h</div></div></div>
        <div class="ptext" id="ptext">Anyone recommend a builder? Bathroom + small deck in Hillcrest. <span id="mbl">Keen for a few quotes</span>. Ta!</div>
        <div class="pcount">212 comments</div>
      </div>
      <svg id="u1" class="abs"></svg>
    </div>
    <div id="pinned" class="abs"><div id="ptxt"><b>Mel R.</b> Anyone recommend a builder? Bathroom + small deck in Hillcrest. <span id="mbl2">Keen for a few quotes</span>. Ta!<svg id="u2" class="abs"></svg></div></div>
    <div id="tallyWrap" class="abs" style="left:80px;top:420px;transform:rotate(3deg);transform-origin:0 50%">
      <div id="tinner" style="position:relative;height:80px">
        <div id="tlabel" class="mk" style="left:0">Dave count:</div>
        <div id="tv1" class="mk">1</div><div id="tv3" class="mk">3</div><div id="tv5" class="mk">5</div><div id="tv6" class="mk">6 (ish)</div><div id="tvq" class="mk">?</div>
        <svg id="x1" class="abs"></svg><svg id="x3" class="abs"></svg><svg id="x5" class="abs"></svg><svg id="x6" class="abs"></svg>
      </div>
    </div>
  </div>

  <div id="qsme" class="abs">
    <!-- A: the real iPhone app still -->
    <div id="capAw" class="capwrap abs" style="top:330px"><div id="capA" class="cap">Or. Put the actual<br>job on <span class="g">QSME</span>.</div></div>
    <div id="gPhone" class="grp abs" style="left:65px;width:950px;top:566px">
      <div class="panel dark phone" style="position:relative;height:${PH.h.toFixed(2)}px">
        <div id="phZoom" class="abs" style="left:0;top:0;width:950px;height:${PH.h.toFixed(2)}px;transform-origin:830px 327px">
          ${band(0, 950, PH.navH, bandImg(PHONE, PH.x0, PH.nav[0], kP, 1440))}
          ${band(PH.navH, 950, PH.gridH, bandImg(PHONE, PH.x0, PH.grid[0], kP, 1440))}
          <svg id="mkAsk" class="abs"></svg><svg id="mkInv" class="abs"></svg>
        </div>
      </div>
      ${chip('chA', 'QSME iPhone app · demo data', 24)}
      <svg id="arrA" class="abs"></svg>
      <div id="daveA" class="mk abs" style="left:610px;top:${(PH.h + 52).toFixed(1)}px;font-size:60px;line-height:72px;color:#F0473C;transform-origin:0 50%">Dave K.</div>
    </div>

    <!-- B: tenders Step 1 + contacts, one caption -->
    <div id="capBw" class="capwrap abs" style="top:330px"><div id="capB" class="cap s">Post it once. Invite<br>the trades you choose.</div></div>
    <div id="gB" class="grp abs" style="left:65px;width:950px;top:550px">
      <div id="gS1" class="abs" style="left:0;top:0;width:950px">
        <div class="panel" style="position:relative;height:${S1.h.toFixed(2)}px">
          <div id="s1Zoom" class="abs" style="left:0;top:0;width:950px;height:${S1.h.toFixed(2)}px;transform-origin:200px 200px">
            ${sband(0, S1.x0, S1.y0, S1.y1, S1.k, frame(S1.dir, 0), cover(686, 450, 1400, 488, '#FFFFFF') + typed(694, 460.2, 16.8, 's1'), '', 's1img')}
          </div>
        </div>
        ${chip('chS1', REC)}
      </div>
      <div id="gCt" class="abs" style="left:0;top:0;width:950px">
        <div class="panel" style="position:relative;height:${CT.h.toFixed(2)}px">
          ${sband(0, CT.x0, CT.b1[0], CT.b1[1], CT.k, frame(CT.dir, 0), cover(797, 242, 1180, 262, '#FFFFFF'), '', 'ctimg')}
          ${sband(CT.h1, CT.x0, CT.b2[0], CT.b2[1], CT.k, frame(CT.dir, 0), `<div id="ctOv" style="opacity:0">${cover(750, 320, 1400, 358, '#FFFFFF')}${typed(760.5, 330.2, 16.6, 'ct')}</div>`, '', 'ctimg')}
          <svg id="arrCt" class="abs"></svg>
          <div id="daveCt" class="mk abs" style="font-size:54px;line-height:64px;color:#E0302A;transform-origin:0 50%">your Dave</div>
        </div>
        ${chip('chCt', REC)}
      </div>
    </div>

    <!-- C: tenders Step 2, scope from SOQ, relabelled to Mel's job -->
    <div id="capCw" class="capwrap abs" style="top:330px"><div id="capC" class="cap s">Every quote covers<br>the same lines.</div></div>
    <div id="gSoq" class="grp abs" style="left:65px;width:950px;top:550px">
      <div class="panel" style="position:relative;height:${sqH.toFixed(2)}px">
        <div id="sqZoom" class="abs" style="left:0;top:0;width:950px;height:${sqH.toFixed(2)}px;transform-origin:285px 320px">
          ${sband(0, SQ.x0, SQ.y0, SQ.y1, SQ.k, SOQ0, cover(885, 411, 1140, 432, '#E5ECFE') + utext(889, 413.45, 15, 600, '#1E3A8A', 'Bathroom + deck') + rowText('#FFFFFF', 'lb'))}
          ${sqTicks}
          ${taps}
          <svg id="mkBr" class="abs"></svg>
          <div id="noteC" class="mk abs" style="font-size:50px;line-height:60px;color:#E0302A;transform-origin:0 50%">same list<br><svg id="noteArr" width="46" height="30" viewBox="0 0 46 30" style="display:inline-block;vertical-align:middle;margin:0 10px 0 2px;overflow:visible"><path d="M3 16 C14 14 26 15.5 39 14.5" fill="none" stroke="#E0302A" stroke-width="5" stroke-linecap="round"/><path d="M29 5.5 L40.5 14.5 L30 23.5" fill="none" stroke="#E0302A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>every quote</div>
        </div>
      </div>
      ${chip('chC', REC)}
    </div>

    <!-- D: the callback; E: end card -->
    <div id="know" class="abs" style="top:${knowTop}px"><div id="knowC" class="cap">Know which Dave.</div></div>
    <div id="logo" class="abs" style="top:${logoTop}px"><img src="${LOGO}" alt="" style="width:708.5px;left:-90.1px;top:-77px"></div>
    <div id="cta" class="abs" style="top:${pillTop}px"><span id="ctaC">Sign up at qsme.co.nz</span></div>

    <div id="t2pos" class="abs" style="left:65px;top:${dTop}px;transform-origin:0 0">
      <div id="t2wrap" style="position:relative;transform:rotate(2deg);transform-origin:50% 50%">
        <div id="tally2" style="position:relative;height:140px">
          <div id="t2label" class="mk big" style="left:0;color:#F0473C">Dave count:</div>
          <div id="t2v" class="mk big" style="color:#F0473C">1</div>
          <svg id="tick" class="abs"></svg>
        </div>
        <div id="t2sub" class="mk" style="position:relative;top:auto;margin-top:6px;font-size:56px;line-height:68px;color:#F0473C;text-align:center">— the one you invited.</div>
      </div>
    </div>
  </div>

  <div id="hook" class="abs">
    <div id="hthread" class="abs" data-qa-ignore><div id="hlist"></div></div>
    ${chrome()}
    <div id="hwash" class="abs"></div>
    <div id="hk" class="abs">
      <div id="hkSub">Asked the community page for a builder.</div>
      <div id="hk1" class="hl"><span class="box"><span id="hkCountWrap"><span id="hkNum">197</span><svg id="hkCirc" class="abs"></svg></span> comments.</span></div>
      <div id="hk3" class="hl"><span class="box">Six Daves.</span></div>
      <div id="hk2" class="hl"><span class="box">Still no builder.</span></div>
    </div>
  </div>`;
  // chip + small helpers (kept here so the label reads the same on every recreation)
  const st = document.createElement('style');
  st.textContent = `.rchip{font:500 28px/1 'JetBrains Mono',monospace;color:#CBD5E1;background:#0B1226;border:2px solid rgba(248,250,252,.28);border-radius:999px;padding:10px 22px 11px;white-space:nowrap;letter-spacing:.005em}
    .tap{width:80px;height:80px;border-radius:50%;background:rgba(15,23,42,.22);opacity:0;visibility:hidden}
    .car{position:absolute;top:0;width:1.5px;height:18px;background:${INK};opacity:0}`;
  document.head.appendChild(st);

  // ---------------------------------------------------------------- seeded hand-drawn marker paths (same maths as reel-body.html / static.html)
  let SEED = 53; const rnd = () => { SEED = (SEED * 16807) % 2147483647; return (SEED - 1) / 2147483646; };
  function cr(pts) { let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2; d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; } return d; }
  function underlinePts(w) { const n = 7, pts = []; for (let i = 0; i <= n; i++) pts.push([w * i / n + (i > 0 && i < n ? (rnd() - 0.5) * 2 : 0), Math.sin(i * 1.1) * 1.2 - (i / n) * 3]); return pts; }
  function ellipsePts(cx, cy, rx, ry, st = -0.45) { const N = 36, en = st + Math.PI * 2 + 0.55, pts = []; for (let i = 0; i <= N; i++) { const a = st + (en - st) * i / N, k = 1 + 0.05 * (i / N) + (rnd() - 0.5) * 0.02; pts.push([cx + rx * k * Math.cos(a), cy + ry * k * Math.sin(a) - (i / N) * 3]); } return pts; }
  function strikePts(w, h) { return [[-6, h * 0.62], [w * 0.5, h * 0.44], [w + 6, h * 0.36], [w * 0.55, h * 0.58], [-2, h * 0.5]]; }
  function setPath(svg, d, sw, col, x, y, w, h) { svg.setAttribute('width', w); svg.setAttribute('height', h); svg.setAttribute('viewBox', `0 0 ${w} ${h}`); svg.style.left = x + 'px'; svg.style.top = y + 'px'; svg.innerHTML = (Array.isArray(d) ? d : [d]).map(p => `<path d="${p}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" opacity=".93"/>`).join(''); }
  function markerAt(svg, pts, sw, col) { markerMulti(svg, [pts], sw, col); }
  function markerMulti(svg, strokes, sw, col) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; strokes.flat().forEach(([x, y]) => { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); }); const ox = a - sw, oy = b - sw; setPath(svg, strokes.map(p => cr(p.map(([x, y]) => [x - ox, y - oy]))), sw, col, ox, oy, Math.ceil(c - a + sw * 2), Math.ceil(d - b + sw * 2)); }
  function rel(el, anc) { const a = el.getBoundingClientRect(), b = anc.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; }

  // ---------------------------------------------------------------- thread content
  const C = { MR: '#C4613A', KP: '#C9962B', ST: '#2E8B7E', AW: '#8B4F86', LH: '#6E8F57', DK: '#4F6475', JM: '#7C6A4A', PG: '#5E7D8C', TB: '#A35D78', RT: '#3F7F8F', MK: '#9A6B3F', HP: '#6A5E9B', BW: '#7D8C4A' };
  const ITEMS = [
    ['KP', 'Kerry P.', 'My cousin Dave. Top bloke.'],
    ['ST', 'Sam T.', 'Hillcrest Dave or the other Hillcrest Dave?'],
    ['AW', 'Aroha W.', 'Deck Dave or Roof Dave?'],
    ['JM', 'Jase M.', 'Big Dave did ours.\nNot Little Dave.'],
    ['LH', 'Lynn H.', 'Following'], ['PG', 'Pete G.', 'Following'], ['TB', 'Tash B.', 'Following'],
    ['F', [260, 640]], ['F', [200, 520, 380]], ['F', [300, 700]], ['F', [180, 460]], ['F', [240, 600, 300]],
    ['DK', 'Dave K.', 'Dave here.\nWhich Dave do you mean?'],
    ['F', [220, 560]], ['F', [280, 680, 420]], ['F', [190, 500]], ['F', [250, 620]],
    ['MR', 'Mel R.', '...can anyone actually\ncome and quote?', 'Author'],
    ['KP', 'Kerry P.', 'Dave can.']
  ];
  // the hook's thread: background texture only (blurred), new names so it doesn't spoil the body's lines
  const HITEMS = [
    ['F', [240, 610]], ['RT', 'Rangi T.', 'Bump'], ['F', [200, 520, 380]], ['MK', 'Mere K.', 'Following'], ['F', [300, 700]],
    ['HP', 'Hemi P.', 'Also keen to know'], ['F', [180, 460]], ['BW', 'Bex W.', 'Following'], ['F', [240, 600, 300]], ['RT', 'Rangi T.', 'Bump'],
    ['F', [220, 560]], ['MK', 'Mere K.', 'Following'], ['F', [280, 680, 420]], ['HP', 'Hemi P.', 'Bump'], ['F', [190, 500]],
    ['BW', 'Bex W.', 'Following'], ['F', [250, 620]], ['F', [300, 540]], ['RT', 'Rangi T.', 'Following'], ['F', [210, 590, 330]],
    ['MK', 'Mere K.', 'Bump'], ['F', [260, 640]], ['HP', 'Hemi P.', 'Following'], ['F', [200, 520, 380]], ['F', [300, 700]], ['BW', 'Bex W.', 'Bump']
  ];
  const FILLCOL = ['#B9B3A6', '#A9B4AE', '#B7A9B3', '#AEB0BA', '#BBB09C', '#A7B3A0', '#B4A8A0', '#A9AEB8', '#B8AFA2'];
  function buildList(L, items, pre) {
    let fi = 0;
    items.forEach((it, i) => {
      const row = document.createElement('div'); row.className = 'cm'; row.id = pre + i;
      if (it[0] === 'F') row.innerHTML = `<div class="av" style="background:${FILLCOL[fi++ % FILLCOL.length]}"></div><div class="fb">${it[1].map((w, k) => `<div class="bar${k === 0 ? ' n' : ''}" style="width:${w}px"></div>`).join('')}</div>`;
      else row.innerHTML = `<div class="av" style="background:${C[it[0]]}">${it[0]}</div><div class="bub"><div class="nm">${it[1]}${it[3] ? `<span class="tag">${it[3]}</span>` : ''}</div><div class="tx">${it[2]}</div></div>`;
      L.appendChild(row);
    });
  }
  buildList($('list'), ITEMS, 'c');
  buildList($('hlist'), HITEMS, 'h');
  const circ = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); circ.id = 'circle'; circ.setAttribute('class', 'abs'); $('list').appendChild(circ);


  // ---------------------------------------------------------------- thread timeline (Figma-motion semantics, body clock)
  function bez(x1, y1, x2, y2) { return function (x) { if (x <= 0) return 0; if (x >= 1) return 1; let lo = 0, hi = 1, t = 0.5; for (let i = 0; i < 40; i++) { const cx = 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t; if (Math.abs(cx - x) < 1e-6) break; if (cx < x) lo = t; else hi = t; t = (lo + hi) / 2; } return 3 * y1 * t * (1 - t) * (1 - t) + 3 * y2 * t * t * (1 - t) + t * t * t; }; }
  const EZ = { L: x => x, I: bez(.32, 0, .67, 0), O: bez(.33, 1, .68, 1), IO: bez(.65, 0, .35, 1), H: x => (x < 1 ? 0 : 1), SCROLL: bez(0.2, 0.7, 0.3, 1), SLAM: bez(0.5, 0, 0.9, 0.55), SWIPE: bez(0.7, 0, 0.25, 1) };
  const hx = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  function val(k, t) { if (t <= k[0].t) return k[0].v; const last = k[k.length - 1]; if (t >= last.t) return last.v; for (let i = 1; i < k.length; i++) if (t < k[i].t) { const a = k[i - 1], b = k[i], p = b.fn((t - a.t) / (b.t - a.t)); if (typeof a.v === 'string') { const A = hx(a.v), B = hx(b.v); return `rgb(${A.map((c, j) => Math.round(c + (B[j] - c) * p)).join(',')})`; } return a.v + (b.v - a.v) * p; } return last.v; }
  function makeThreadTL(M) {
    // Every key below is REEL time (= take time: the Cam S v3 take is laid at 0.0). Each beat lands on its word in
    // outputs/vo-take-cam-v3/alignment.json; the word times are quoted in the comments.
    const T = [];
    const add = (id, f, k) => T.push({ id, f, k: k.map(a => ({ t: a[0], v: a[1], fn: EZ[a[2] || 'L'] })) });
    const pop = (id, t) => { add(id, 'OPACITY', [[t, 0], [t + 0.16, 1, 'O']]); add(id, 'TY', [[t, 36], [t + 0.24, 0, 'O']]); };
    const showAt = (id, t) => add(id, 'OPACITY', [[0, 0], [t, 1, 'H']]);
    const top = M.itemTop, S = (i, y) => Math.round(y + L45 - M.listY0 - top[i]);
    const S1 = S(2, 840), S2 = S(3, 820), S3 = S(12, 640), S4 = S(17, 640);
    // 4.0–4.54 Mel's post card fills the screen (the voice has just said "Still no builder."); the underline draws
    // 4.12–4.39; the card collapses into the pinned strip 4.54–4.70, just before "Cousin Dave" (4.75)
    const CC = 4.54;   // card collapse
    add('u1', 'OPACITY', [[4.11, 0], [4.12, 1, 'H']]); add('u1', 'TRIM', [[4.12, 0], [4.39, 1, 'O']]);
    add('card', 'OPACITY', [[CC + 0.02, 1], [CC + 0.14, 0]]);
    add('card', 'TY', [[CC, 0], [CC + 0.22, Math.round(350 - (M.cardTop + M.cardH / 2)), 'IO']]);
    add('card', 'SCALE', [[CC, 1], [CC + 0.22, 0.55, 'IO']]);
    add('morph', 'TY', [[CC, 0], [CC + 0.22, 300 - M.cardTop, 'IO']]);
    add('morph', 'HEIGHT', [[CC, M.cardH], [CC + 0.22, 100, 'IO']]);
    add('morph', 'RADIUS', [[CC, 20], [CC + 0.22, 12, 'IO']]);
    add('morph', 'FILL', [[CC, '#FFFFFF'], [CC + 0.22, '#F1F0EC', 'IO']]);
    add('pinned', 'OPACITY', [[CC + 0.16, 0], [CC + 0.28, 1, 'O']]); add('pinned', 'TY', [[CC + 0.16, 12], [CC + 0.28, 0, 'O']]);
    // comments, each popping on its line in the voice:
    //   Kerry "Cousin Dave." 4.75 · Sam "Hillcrest Dave, or the other Hillcrest Dave." 5.49 · Aroha "Deck Dave. Roof Dave." 8.16
    //   Jase "Big Dave, not Little Dave." 10.60 · fling under "Then Dave turns up." 13.32–14.52, slam on "Dave here." 14.71
    //   Mel "Can anyone actually come and quote?" 17.63 · Kerry "Dave can." 20.85
    const K0 = 4.73, K1 = 5.47, K2 = 8.08, K3 = 10.56, FL = 13.78, SL = 14.37, SC2 = 17.38, K17 = 17.64, K18 = 20.82;
    pop('c0', K0); pop('c1', K1); pop('c2', K2); pop('c3', K3);
    for (let i = 4; i <= 12; i++) showAt('c' + i, FL);
    for (let j = 13; j <= 16; j++) showAt('c' + j, SC2);
    pop('c17', K17);   // Mel R. ...can anyone actually come and quote?
    pop('c18', K18);   // Kerry P. Dave can.
    // scroll, stop, scroll, fling + slam on Dave, then the last two comments
    add('list', 'TY', [[K2 - 0.07, 0], [K2 + 0.08, S1, 'SCROLL'], [K3 - 0.05, S1], [K3 + 0.1, S2, 'SCROLL'], [FL, S2], [SL, S3 - 18, 'SLAM'], [SL + 0.12, S3, 'O'], [SC2, S3], [SC2 + 0.3, S4, 'IO']]);
    add('list', 'BLUR', [[FL, 0], [FL + 0.2, 7, 'I'], [SL - 0.08, 7], [SL, 0], [SC2, 0], [SC2 + 0.1, 4, 'I'], [SC2 + 0.22, 4], [SC2 + 0.3, 0]]);
    add('circle', 'OPACITY', [[SL + 0.14, 0], [SL + 0.15, 1, 'H']]); add('circle', 'TRIM', [[SL + 0.15, 0], [SL + 0.5, 1, 'O']]);
    // red-marker tally, counting the Daves as they are said: 1 (4.97, after "Cousin Dave.") → 3 (6.30, "Hillcrest Dave,")
    // → 5 (9.71, "Roof Dave") → 6 (ish) (11.81, "Little Dave") → ? (16.83, on "mean?"). Each change: strike, rattle, new number.
    const T1 = 4.97, CH = [6.30, 9.71, 11.81, 16.83];
    add('tlabel', 'OPACITY', [[T1, 0], [T1 + 0.1, 1, 'O']]); add('tlabel', 'SCALE', [[T1, 1.18], [T1 + 0.2, 1, 'O']]);
    const change = (x, s) => {
      add(x, 'OPACITY', [[s - 0.01, 0], [s, 1, 'H'], [s + 0.12, 1], [s + 0.2, 0]]); add(x, 'TRIM', [[s, 0], [s + 0.12, 1, 'O']]);
      return [s + 0.12, s + 0.2, s + 0.15];   // old number fades 0.12–0.2 after the strike starts; new one pops at +0.15
    };
    const keysOf = (tin, tout) => { const k = [[tin, 0], [tin + 0.08, 1, 'O']]; if (tout) k.push([tout[0], 1], [tout[1], 0]); return k; };
    const c13 = change('x1', CH[0]), c35 = change('x3', CH[1]), c56 = change('x5', CH[2]), c6q = change('x6', CH[3]);
    add('tv1', 'OPACITY', keysOf(T1, c13)); add('tv1', 'SCALE', [[T1, 1.4], [T1 + 0.2, 1, 'O']]);
    add('tv3', 'OPACITY', keysOf(c13[2], c35)); add('tv3', 'SCALE', [[c13[2], 1.4], [c13[2] + 0.2, 1, 'O']]);
    add('tv5', 'OPACITY', keysOf(c35[2], c56)); add('tv5', 'SCALE', [[c35[2], 1.4], [c35[2] + 0.2, 1, 'O']]);
    add('tv6', 'OPACITY', keysOf(c56[2], c6q)); add('tv6', 'SCALE', [[c56[2], 1.4], [c56[2] + 0.2, 1, 'O']]);
    add('tvq', 'OPACITY', keysOf(c6q[2])); add('tvq', 'SCALE', [[c6q[2], 1.5], [c6q[2] + 0.22, 1, 'O']]);
    // a short rattle on every change
    const rot = [[0, 0]], tx = [[0, 0]];
    CH.forEach(s => { rot.push([s, 0], [s + 0.035, 5], [s + 0.07, -4], [s + 0.105, 3], [s + 0.17, 0, 'O']); tx.push([s, 0], [s + 0.035, -6], [s + 0.07, 6], [s + 0.105, -4], [s + 0.17, 0, 'O']); });
    add('tinner', 'ROT', rot); add('tinner', 'TX', tx);
    // 21.90–22.25 the group app swipes away to QSME, landing as "Or." is said (22.24)
    add('app', 'TX', [[SW, 0], [SW + 0.4, -1080, 'SWIPE']]);
    add('qsme', 'TX', [[SW, 0], [SW + 0.4, -1080, 'SWIPE']]);
    return T;
  }
  let EL = null;
  function renderTL(t) {
    for (const id in EL) {
      const e = EL[id], s = {};
      for (const f in e.tr) s[f] = val(e.tr[f].k, t);
      const st = e.el.style;
      if ('OPACITY' in s) { st.opacity = s.OPACITY; st.visibility = s.OPACITY <= 0.001 ? 'hidden' : 'visible'; }
      if ('TX' in s || 'TY' in s || 'SCALE' in s || 'ROT' in s) st.transform = `translate(${s.TX || 0}px,${s.TY || 0}px) rotate(${-(s.ROT || 0)}deg) scale(${s.SCALE == null ? 1 : s.SCALE})`;
      if ('HEIGHT' in s) st.height = s.HEIGHT + 'px';
      if ('RADIUS' in s) st.borderRadius = s.RADIUS + 'px';
      if ('FILL' in s) st.background = s.FILL;
      if ('BLUR' in s) st.filter = s.BLUR > 0.05 ? `blur(${s.BLUR}px)` : 'none';
      if ('TRIM' in s) e.el.querySelectorAll('path').forEach(p => { const L = p.__len || (p.__len = p.getTotalLength()); p.style.strokeDasharray = L + ' ' + (L + 10); p.style.strokeDashoffset = L * (1 - s.TRIM); });
    }
  }
  Kit.each(t => { if (EL) renderTL(t); });

  // ---------------------------------------------------------------- hook 0–4.0, on the words
  // "Two hundred and twelve comments." 0.00–1.36 (count 197 → 205 at 0.37 → 212 at 0.67, on "twelve"; circle 0.79–1.12)
  // "Six Daves." 1.58–2.72 (slam at 1.58) · "Still no builder." 2.81–3.90 (slam at 3.0) · hard cut to the thread at 4.01
  Kit.scene('#hook', 0, BODY);
  Kit.add('#hlist', 'y', [[0, 0], [0.30, -430, 'scroll'], [0.37, -430], [0.60, -880, 'scroll'], [0.67, -880], [1.50, -1360, 'scroll'], [BODY, -1550, 'out']]);
  Kit.add('#hlist', 'blur', [[0, 4], [0.10, 6], [0.30, 1.6, 'out'], [0.37, 1.6], [0.44, 6], [0.60, 1.6, 'out'], [0.67, 1.6], [0.79, 6], [1.50, 1.6, 'out']]);
  Kit.add('#hk1', 'scale', [[0, 1.06], [0.18, 1, 'out']]);
  Kit.count('#hkNum', [[0, 197], [0.37, 205, 'hold'], [0.67, 212, 'hold']], v => String(Math.round(v)));
  Kit.add('#hkNum', 'scale', [[0, 1], [0.37, 1], [0.37, 1.38, 'hold'], [0.57, 1, 'out'], [0.67, 1], [0.67, 1.38, 'hold'], [0.92, 1, 'out']]);
  Kit.slam('#hk3', 1.58, { from: 1.35, dur: 0.16 });
  Kit.add('#hk3', 'rotate', [[1.58, 2.5], [1.74, 1.2, 'slam']]);
  Kit.slam('#hk2', 3.0, { from: 1.35, dur: 0.16 });
  Kit.add('#hk2', 'rotate', [[3.0, -3], [3.16, -1.5, 'slam']]);

  // ---------------------------------------------------------------- QSME product beat (reel time = take time)
  // A 22.25–24.47: "Or. Put the actual job on QSME." (22.24–24.38) over the real iPhone app still; marker on "Ask for quotes"
  //   at "actual" (22.78), on "Invite" at "job" (23.20), the "Dave K." note at "on QSME" (23.52), holds to the swipe
  const A0 = 22.25, AB = 24.32, BC = 26.92, CD = 30.49, D0 = 30.58, E0 = 32.16;
  Kit.pop('#capA', A0, { dy: 30 }); Kit.add('#capA', 'opacity', [[AB, 1], [AB + 0.15, 0, 'in']]); Kit.add('#capA', 'y', [[AB, 0], [AB + 0.15, -24, 'in']]);
  Kit.pop('#gPhone', A0 + 0.05, { dy: 44, dur: 0.32, fade: 0.2 });
  Kit.add('#phZoom', 'scale', [[A0 + 0.2, 1], [AB + 0.1, 1.02, 'inOut']]);
  Kit.add('#daveA', 'opacity', [[23.52, 0], [23.62, 1, 'out']]); Kit.add('#daveA', 'scale', [[23.52, 1.25], [23.69, 1, 'out']]); Kit.add('#daveA', 'rotate', [[0, -3]]);
  Kit.add('#gPhone', 'x', [[AB, 0], [AB + 0.32, -1100, 'swipe']]);

  // B 24.47–27.08: "Post it once." (24.48–25.52) over tenders Step 1 (title types "Bathroom + deck"); "Invite the trades you
  //   choose." (25.53–27.06): contacts pops on "Invite", the name types "Dave K.", "your Dave" note on "you choose"
  Kit.add('#gB', 'x', [[AB, 1100], [AB + 0.32, 0, 'swipe'], [BC, 0], [BC + 0.32, -1100, 'swipe']]);
  Kit.pop('#capB', AB + 0.15, { dy: 30 }); Kit.add('#capB', 'opacity', [[BC, 1], [BC + 0.15, 0, 'in']]); Kit.add('#capB', 'y', [[BC, 0], [BC + 0.15, -24, 'in']]);
  Kit.add('#s1Zoom', 'scale', [[AB + 0.3, 1], [BC + 0.05, 1.02, 'inOut']]);
  Kit.pop('#gCt', 25.54, { dy: 40, dur: 0.3, fade: 0.2 });
  Kit.add('#daveCt', 'opacity', [[26.46, 0], [26.56, 1, 'out']]); Kit.add('#daveCt', 'scale', [[26.46, 1.25], [26.66, 1, 'out']]); Kit.add('#daveCt', 'rotate', [[0, -4]]);
  // footage: a pure function of t (frame index clamped to the clip), so any frame renders the same on its own. The typed
  // overlays follow the clip's own typing: the title over tender-step1 frames 1–17 (the field loses focus at 19), the
  // name over contacts-add frames 15–25 (the field's own placeholder shows until 14; it stays focused to the end, 31).
  const clipFrame = (t, t0, from, speed, n) => Math.max(from, Math.min(n - 1, from + Math.floor(Math.max(0, t - t0) * 30 * speed + 1e-6)));
  const S1T = 'Bathroom + deck', CTT = 'Dave K.', T_S1 = 24.76, SP_S1 = 0.9, T_CT = 25.54, SP_CT = 1.0;
  const s1img = document.querySelector('.s1img'), ctimgs = [...document.querySelectorAll('.ctimg')];
  const s1T = $('s1T'), s1Car = $('s1Car'), ctT = $('ctT'), ctCar = $('ctCar'), ctOv = $('ctOv');
  const blinkOn = (t, t0) => Math.floor(Math.max(0, t - t0) * 2.4) % 2 === 0;
  Kit.each(t => {
    const fa = clipFrame(t, T_S1, 0, SP_S1, S1.n), a = frame(S1.dir, fa);
    if (s1img.getAttribute('src') !== a) s1img.setAttribute('src', a);
    const na = Math.max(0, Math.min(S1T.length, Math.round((fa - 1) / 16 * S1T.length)));
    if (s1T.textContent !== S1T.slice(0, na)) s1T.textContent = S1T.slice(0, na);
    s1Car.style.left = (s1T.offsetWidth + 1) + 'px';
    s1Car.style.opacity = fa < 19 && ((na > 0 && na < S1T.length) || blinkOn(t, T_S1)) ? 1 : 0;
    const fb = clipFrame(t, T_CT, 8, SP_CT, 32), b = frame(CT.dir, fb);
    ctimgs.forEach(im => { if (im.getAttribute('src') !== b) im.setAttribute('src', b); });
    const nb = fb < 15 ? -1 : Math.min(CTT.length, Math.round((fb - 14) / 11 * CTT.length));
    ctOv.style.opacity = nb < 0 ? 0 : 1;
    if (ctT.textContent !== CTT.slice(0, Math.max(0, nb))) ctT.textContent = CTT.slice(0, Math.max(0, nb));
    ctCar.style.left = (ctT.offsetWidth + 1) + 'px';
    ctCar.style.opacity = nb >= 0 && ((nb < CTT.length) || blinkOn(t, T_CT)) ? 1 : 0;
  });

  // C 27.08–30.63: "Every quote covers the same lines, so you compare them in one table." (27.13–30.61) over Scope from SOQ
  //   (Mel's job): the three rows tick on "quote / covers / same" (27.85, 28.18, 28.50), bracket on "lines" (28.73), note 29.02
  Kit.add('#gSoq', 'x', [[BC, 1100], [BC + 0.32, 0, 'swipe']]);
  Kit.add('#sqZoom', 'scale', [[BC + 0.35, 1], [CD, 1.02, 'inOut']]);
  Kit.pop('#capC', BC + 0.17, { dy: 30 }); Kit.add('#capC', 'opacity', [[CD, 1], [CD + 0.15, 0, 'in']]); Kit.add('#capC', 'y', [[CD, 0], [CD + 0.15, -24, 'in']]);
  [27.85, 28.18, 28.50].forEach((t, i) => {
    Kit.add('#tk' + i, 'opacity', [[t, 0], [t + 0.1, 1, 'out']]);
    Kit.add('#tap' + i, 'opacity', [[t - 0.08, 0], [t - 0.02, 1], [t + 0.22, 0, 'out']]);
    Kit.add('#tap' + i, 'scale', [[t - 0.08, 0.45], [t + 0.22, 1.25, 'out']]);
  });
  Kit.add('#noteC', 'opacity', [[29.02, 0], [29.11, 1, 'out']]); Kit.add('#noteC', 'scale', [[29.02, 1.2], [29.20, 1, 'out']]); Kit.add('#noteC', 'rotate', [[0, -3]]);
  Kit.add('#gSoq', 'opacity', [[CD, 1], [CD + 0.25, 0, 'in']]);
  Kit.add('#gSoq', 'scale', [[CD, 1], [CD + 0.25, 0.94, 'out']]);

  // D 30.58–32.16: the callback, big and centred, as "table." lands (30.61): tally 30.58, tick 30.83, "— the one you invited." 30.89,
  //   "Know which Dave." on the words (31.01–32.12)
  Kit.add('#t2label', 'opacity', [[D0, 0], [D0 + 0.1, 1, 'out']]); Kit.add('#t2label', 'scale', [[D0, 1.18], [D0 + 0.2, 1, 'out']]);
  Kit.add('#t2v', 'opacity', [[D0, 0], [D0 + 0.1, 1, 'out']]); Kit.add('#t2v', 'scale', [[D0, 1.4], [D0 + 0.2, 1, 'out']]);
  Kit.add('#tick', 'scale', [[31.01, 1], [31.15, 1.22, 'out'], [31.35, 1, 'out']]);
  Kit.pop('#t2sub', 30.89, { dy: 18 }); Kit.out('#t2sub', E0 - 0.15, 0.15);
  Kit.add('#knowC', 'opacity', [[31.04, 0], [31.24, 1, 'out']]);
  Kit.add('#knowC', 'scale', [[31.04, 0.9], [31.34, 1, 'outBack']]);
  // E 32.16–37.3: end card. "Know which Dave." stays and moves up; logo, then the sign-up button pops on "Sign up" (32.25)
  //   and holds to the end (pulses 33.74 and 36.04)
  Kit.add('#know', 'y', [[E0, 0], [E0 + 0.4, knowEnd - knowTop, 'inOut']]);
  Kit.fade('#logo', E0 + 0.1, E0 + 0.4); Kit.add('#logo', 'scale', [[E0 + 0.1, 0.94], [E0 + 0.5, 1, 'out']]);
  Kit.pop('#ctaC', 32.24, { dy: 28 });
  Kit.add('#ctaC', 'scale', [[33.74, 1], [33.94, 1.045, 'out'], [34.19, 1, 'inOut'], [36.04, 1], [36.24, 1.045, 'out'], [36.49, 1, 'inOut']]);

  // ---------------------------------------------------------------- layout that needs measuring
  const setup = (async () => {
    await Promise.all(['400 50px Inter', '500 30px Inter', '600 30px Inter', '400 17px Inter', '600 17px Inter', '800 104px Inter', '800 60px Manrope', '66px "Permanent Marker"', '500 28px "JetBrains Mono"'].map(f => document.fonts.load(f)));
    await document.fonts.ready;
    // Mel's card: centred in the safe box
    const card = $('card'), morph = $('morph');
    const cardH = Math.round(card.offsetHeight), cardTop = Math.round(300 + (SB - 300 - cardH) / 2);
    card.style.top = cardTop + 'px'; morph.style.top = cardTop + 'px'; morph.style.height = cardH + 'px';
    const r1 = rel($('mbl'), card); markerAt($('u1'), underlinePts(r1.w + 8).map(([x, y]) => [x + r1.x - 4, y + r1.y + r1.h - 2]), 7, '#E0302A');
    // pinned strip: fit to 2 lines inside 100px
    const pt = $('ptxt'); let fs = 34; while (pt.offsetHeight > 84 && fs > 28) { fs--; pt.style.fontSize = fs + 'px'; pt.style.lineHeight = Math.round(fs * 1.235) + 'px'; }
    const r2 = rel($('mbl2'), pt); markerAt($('u2'), underlinePts(r2.w + 6).map(([x, y]) => [x + r2.x - 3, y + r2.y + r2.h - 3]), 4.5, '#E0302A');
    // tally values + strike-outs
    const lw = $('tlabel').offsetWidth, vx = lw + 20;
    ['tv1', 'tv3', 'tv5', 'tv6', 'tvq'].forEach(id => $(id).style.left = vx + 'px');
    [['x1', 'tv1'], ['x3', 'tv3'], ['x5', 'tv5'], ['x6', 'tv6']].forEach(([x, v]) => { const w = $(v).offsetWidth; markerAt($(x), strikePts(w, 80).map(([a, b]) => [a + vx, b]), 6, '#E0302A'); });
    $('tinner').style.width = (vx + $('tv6').offsetWidth) + 'px';
    // callback tally (120px marker) + big green tick, centred; at E0 (32.16–32.56) it shrinks into the upper-left corner
    const lw2 = $('t2label').offsetWidth; $('t2v').style.left = (lw2 + 30) + 'px';
    const tx0 = lw2 + 30 + $('t2v').offsetWidth + 34, sz = 108;
    markerAt($('tick'), [[tx0, 45 + sz * 0.5], [tx0 + sz * 0.38, 45 + sz * 0.9], [tx0 + sz * 1.05, 45 - 7]], 13, '#3DC023');
    const tk = $('tick'); tk.style.transformOrigin = `${(tx0 + sz * 0.5 - parseFloat(tk.style.left)).toFixed(1)}px ${(45 + sz * 0.45 - parseFloat(tk.style.top)).toFixed(1)}px`;
    const W2 = Math.round(tx0 + sz * 1.1);
    $('tally2').style.width = W2 + 'px'; $('t2wrap').style.width = W2 + 'px';
    const L0 = Math.round((1080 - W2) / 2);
    $('t2pos').style.left = L0 + 'px';
    const sEnd = 41 / 120;   // ends at the old corner size (66px marker × 0.62)
    Kit.add('#t2pos', 'x', [[E0, 0], [E0 + 0.4, 80 - L0, 'inOut']]);
    Kit.add('#t2pos', 'y', [[E0, 0], [E0 + 0.4, 330 - dTop, 'inOut']]);
    Kit.add('#t2pos', 'scale', [[E0, 1], [E0 + 0.4, sEnd, 'inOut']]);
    Kit.add('#tick path', 'trim', [[30.83, 0], [31.04, 1, 'out']]);
    // thread geometry + circle around Dave K.
    const itemTop = ITEMS.map((_, i) => $('c' + i).offsetTop);
    const db = $('c12').querySelector('.bub');
    markerAt($('circle'), ellipsePts(104 + db.offsetWidth / 2, itemTop[12] + db.offsetHeight / 2, db.offsetWidth / 2 + 34, db.offsetHeight / 2 + 30), 8, '#E0302A');
    const T = makeThreadTL({ cardTop, cardH, itemTop, listY0: 510 + $('list').offsetTop });
    const E = {};
    for (const tr of T) { const el = $(tr.id); if (!el) throw new Error('missing ' + tr.id); (E[tr.id] = E[tr.id] || { el, tr: {} }).tr[tr.f] = tr; }
    EL = E;

    // hook: fit the H1 lines to the safe width, centre the block on the safe box
    let hs = 104; const boxes = [...document.querySelectorAll('#hk .box')];
    while (Math.max(...boxes.map(b => b.offsetWidth)) > 946 && hs > 70) { hs -= 2; document.querySelectorAll('#hk .hl').forEach(h => h.style.fontSize = hs + 'px'); }
    const hk = $('hk'), hkTop = Math.round((300 + SB) / 2 - hk.offsetHeight / 2 - 10);
    hk.style.top = hkTop + 'px'; $('hwash').style.setProperty('--hy', (hkTop + hk.offsetHeight / 2) + 'px');
    const nw = $('hkNum'), nr = { w: nw.offsetWidth, h: nw.offsetHeight };
    markerAt($('hkCirc'), ellipsePts(nr.w / 2, nr.h / 2 + 4, nr.w / 2 + 14, nr.h / 2 + 10), 7, '#E0302A');
    Kit.add('#hkCirc path', 'trim', [[0.79, 0], [1.12, 1, 'out']]);

    // product beat layout: each beat (caption + panels + chips + marker notes) is centred in the safe box, so the
    // cards use the frame down to the safe bottom instead of leaving it empty
    const CAPGAP = 46, STACK = 26;
    const chipBelow = Math.round($('chS1').parentElement.getBoundingClientRect().bottom - $('chS1').parentElement.previousElementSibling.getBoundingClientRect().bottom);
    const place = (wrapId, capId, grpId, contentH, gap) => { const ch = $(capId).offsetHeight, top = centreTop(ch + gap + contentH); $(wrapId).style.top = top + 'px'; $(grpId).style.top = (top + ch + gap) + 'px'; return { top, capH: ch, grpTop: top + ch + gap, bottom: top + ch + gap + contentH }; };
    const LA = place('capAw', 'capA', 'gPhone', PH.h + 52 + 72, 50);
    const LB = place('capBw', 'capB', 'gB', S1.h + chipBelow + STACK + CT.h + chipBelow, CAPGAP);
    $('gCt').style.top = (S1.h + chipBelow + STACK).toFixed(1) + 'px';
    const LC = place('capCw', 'capC', 'gSoq', sqH + chipBelow, CAPGAP);

    // A: red marker hugging the "Ask for quotes" and "Invite" tiles (tile boxes measured on the 1440x2560 capture);
    // the Invite ring stays inside stage x 1000 even at the end of the push-in
    const tile = (x0, x1, y0, y1, f, pad) => ({ cx: phX((x0 + x1) / 2), cy: phY((y0 + y1) / 2), rx: (x1 - x0) / 2 * kP * f + pad, ry: (y1 - y0) / 2 * kP + 10 });
    const ask = tile(731, 992, 943, 1116, 1, 6), inv = tile(1015, 1276, 943, 1116, 0.82, 0);
    markerAt($('mkAsk'), ellipsePts(ask.cx, ask.cy, ask.rx, ask.ry), 7, '#F0473C');
    markerAt($('mkInv'), ellipsePts(inv.cx, inv.cy, inv.rx, inv.ry, -0.2), 7, '#F0473C');
    Kit.add('#mkAsk path', 'trim', [[22.72, 0], [23.09, 1, 'out']]);
    Kit.add('#mkInv path', 'trim', [[23.18, 0], [23.42, 1, 'out']]);
    // marker note: "Dave K." under the panel, arrow up through the gutter between "Daily log" and "AI SOQ" into the Invite ring
    // (the chip is left-aligned so the arrow clears it)
    const gx = phX(1003.5), dv = $('daveA'), dvTop = PH.h + 52;
    const a0 = [gx - 4, dvTop - 6], a1 = [gx, phY(1290)], a2 = [gx + 2, phY(1170)], a3 = [gx + 8, phY(1128)], tip = [gx + 34, phY(1112)];
    const ang = Math.atan2(tip[1] - a3[1], tip[0] - a3[0]), hl = 26;
    const head = [[tip[0] - hl * Math.cos(ang - 0.5), tip[1] - hl * Math.sin(ang - 0.5)], tip, [tip[0] - hl * Math.cos(ang + 0.5), tip[1] - hl * Math.sin(ang + 0.5)]];
    markerMulti($('arrA'), [[a0, a1, a2, a3, tip], head], 6, '#F0473C');
    const ap = $('arrA').querySelectorAll('path');   // shaft, then the head (each path gets its own draw-on)
    Kit.add(ap[0], 'trim', [[23.42, 0], [23.62, 1, 'out']]); Kit.add(ap[1], 'trim', [[23.60, 0], [23.68, 1, 'out']]);
    dv.style.left = Math.round(gx - 60) + 'px';

    // B2: "your Dave" in the empty right half of the Name field, arrow back to the typed "Dave K." (field x 745–1445,
    // y 315–363; the name ends near x 821)
    const dc = $('daveCt'), fy = ctY(339);
    const noteX = Math.round(ctX(965)), noteY = Math.round(fy - 32);
    dc.style.left = noteX + 'px'; dc.style.top = noteY + 'px';
    const b0 = [noteX - 16, fy + 4], b1 = [ctX(920), fy + 10], b2 = [ctX(870), fy + 6], btip = [ctX(836), fy - 2];
    const bang = Math.atan2(btip[1] - b2[1], btip[0] - b2[0]), bhl = 24;
    const bhead = [[btip[0] - bhl * Math.cos(bang - 0.5), btip[1] - bhl * Math.sin(bang - 0.5)], btip, [btip[0] - bhl * Math.cos(bang + 0.5), btip[1] - bhl * Math.sin(bang + 0.5)]];
    markerMulti($('arrCt'), [[b0, b1, b2, btip], bhead], 6, '#E0302A');
    const bp = $('arrCt').querySelectorAll('path');
    Kit.add(bp[0], 'trim', [[26.31, 0], [26.51, 1, 'out']]); Kit.add(bp[1], 'trim', [[26.48, 0], [26.56, 1, 'out']]);

    // C: a bracket on the three ticked rows, just right of the longest new label, and the note beside it
    const labelR = sqX(LBL.x) + Math.max(...[0, 1, 2].map(i => $('lb' + i).offsetWidth)) * SQ.k;
    const yA = sqY(SQ.rows[0][0] + 9) + 2, yB = sqY(SQ.rows[2][1] - 16), ym = (yA + yB) / 2, bx = Math.round(labelR + 34);
    markerAt($('mkBr'), [[bx - 30, yA], [bx - 6, yA + 6], [bx + 2, yA + 34], [bx + 3, ym - 26], [bx + 10, ym - 6], [bx + 30, ym], [bx + 10, ym + 6], [bx + 3, ym + 26], [bx + 2, yB - 34], [bx - 6, yB - 6], [bx - 30, yB]], 7, '#E0302A');
    Kit.add('#mkBr path', 'trim', [[28.73, 0], [29.02, 1, 'out']]);
    const nc = $('noteC'), ncX = bx + 46; let nf = 50;
    while (ncX + nc.offsetWidth > 935 && nf > 36) { nf--; nc.style.fontSize = nf + 'px'; nc.style.lineHeight = Math.round(nf * 1.2) + 'px'; const s = nf / 50; const ar = $('noteArr'); ar.setAttribute('width', (46 * s).toFixed(1)); ar.setAttribute('height', (30 * s).toFixed(1)); }
    nc.style.left = ncX + 'px'; nc.style.top = Math.round(ym - nc.offsetHeight / 2 + 4) + 'px';

    // end card: button fits the safe width
    const pill = $('ctaC'); let pf = 54; while (pill.offsetWidth > 940 && pf > 36) { pf--; pill.style.fontSize = pf + 'px'; }
    return { cardH, cardTop, pinnedFont: fs, hookFont: hs, hkTop, SB, tallyW: W2, pillFont: pf, chipBelow, A: LA, B: LB, C: LC, S1h: Math.round(S1.h), CTh: Math.round(CT.h), sqH: Math.round(sqH), noteFont: nf, noteX: ncX, noteW: nc.offsetWidth, bracketX: bx };
  })();

  Kit.ready({ duration: DUR });
  const kitReady = window.__ready;
  window.__ready = (async () => { const layout = await setup; const info = await kitReady; Kit.render(0); return Object.assign({}, info, { layout }); })();
})();
