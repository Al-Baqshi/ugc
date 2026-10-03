// Which Dave? — 30 s reel, rebuilt 2026-10-02, review fixes 2026-10-03 (no filmed shot, no owner recording).
//   0.0–2.5   hook: "212 comments. Still no builder." as kinetic text over the full-frame thread, count 197 → 205 → 212
//   2.5–14.3  the thread. Mel's post card now holds to 4.1 (underline on "Keen for a few quotes" 3.05–3.4), so every thread
//             keyframe from reel 3.3 on sits 0.8 s later than the 2026-10-02 cut: the Daves, the slam on "Dave here. Which Dave
//             do you mean?" (9.8), "...can anyone actually come and quote?" (12.1) / "Dave can." (12.7), swipe to QSME 13.9–14.3
//   14.3–17.0 "Or just put the actual job on QSME." over the REAL iPhone app still (04-project, demo data): the "Project" nav bar
//             and the tile grid (the "42 Rimu Street townhouses" header and stats row between them are cropped out), in a
//             phone-style frame; red marker on "Ask for quotes" (15.15) and "Invite" (15.7), marker note "Dave K." → Invite (16.0)
//   17.0–22.9 tenders recreation, Step 2 "Scope from SOQ" only, at 1.6x: heading + the pocket rows. Cropped out: the
//             "Pulled from your SOQ · <project>" strip, the lines/$ column, the NZD total, the walkthrough caption and the mouse
//             pointer (rows are cut from a pointer-free frame, unticked/ticked). "Send one job to the trades you choose." (17.05)
//             with the marker under "Pick the line items to put out to tender" and three pockets ticking; then
//             "They all quote on the same lines." (20.0) with a marker bracket on the ticked rows
//   22.9–25.9 callback, big and centred: "Dave count: 1" (23.0) + green tick (23.3) / "— the one you invited." (23.6) /
//             "Know which Dave." (24.15)
//   25.85–30  end card: Free to join. / No listing fee on tenders. / Inviting your own tradie is always free. /
//             pill "Create a project, free · qsme.co.nz"; the tally shrinks into the upper-left corner (25.9–26.3)
// Walkthrough crops are from motion/clips/tender-soq (muted JPEG frames of assets/qsme/walkthroughs/client-tenders.mp4),
// labelled "Recreation of the app · mock data". No contacts, comparison, publish-to-market or "Quick Jobs" frames are used.
(function () {
  'use strict';
  const R45 = document.body.classList.contains('r4x5');
  const SB = R45 ? 1530 : 1250;        // safe-box bottom in stage coords (4:5: frame 1290 + 240)
  const q = R45 ? 1 : 0;
  const BODY = 2.5;                    // the thread section's own clock starts at reel 2.5 s
  const HOLD = 0.8;                    // extra hold on Mel's post card: thread keys at body >= 0.8 move by +0.8
  const $ = id => document.getElementById(id);
  const LOGO = 'qsme-logo.svg';

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
  // a horizontal band of a source image (source px x0.., y0..y1) scaled by k, stacked at `top` inside its panel
  const bandImg = (src, x0, y0, k, natW, id, extra) => `<img ${id ? `id="${id}" ` : ''}src="${src}" alt="" style="position:absolute;display:block;max-width:none;width:${(natW * k).toFixed(2)}px;left:${(-x0 * k).toFixed(2)}px;top:${(-y0 * k).toFixed(2)}px;${extra || ''}">`;
  const band = (top, w, h, inner, id) => `<div ${id ? `id="${id}" ` : ''}class="abs" style="left:0;top:${top.toFixed(2)}px;width:${w}px;height:${h.toFixed(2)}px;overflow:hidden">${inner}</div>`;
  const chip = (id, text) => `<div class="chipw" style="display:flex;justify-content:center;margin-top:-21px;position:relative"><span id="${id}" class="rchip">${text}</span></div>`;
  const REC = 'Recreation of the app · mock data';

  // A — the real iPhone still (1440x2560): "Project" nav bar (y 56–240) + tile grid (y 920–1330), x 150–1290
  const PHONE = '../../../assets/qsme/phone/04-project.png';
  const PH = { x0: 150, x1: 1290, nav: [56, 240], grid: [920, 1330] };
  const kP = 950 / (PH.x1 - PH.x0);
  PH.navH = (PH.nav[1] - PH.nav[0]) * kP; PH.gridH = (PH.grid[1] - PH.grid[0]) * kP; PH.h = PH.navH + PH.gridH;
  const phX = x => (x - PH.x0) * kP, phY = y => PH.navH + (y - PH.grid[0]) * kP;   // grid source px → panel px
  const capA = 330 + q * 150, phTop = capA + 236;

  // B/C — tenders recreation, Step 2 (1920x1080 frames): heading y 240–392 + pocket rows, x 664.. at 1.6x
  const SOQ0 = 'clips/tender-soq/f_00000.jpg', SOQ1 = 'clips/tender-soq/f_00091.jpg';   // 0 ticked / 3 ticked, both pointer-free
  const SQ = { x0: 664, k: 1.6, head: [240, 392], rows: [[453, 517], [517, 580], [580, 643], [643, 707]] };
  const sqHeadH = (SQ.head[1] - SQ.head[0]) * SQ.k;
  const sqRowTop = i => sqHeadH + (SQ.rows[i][0] - SQ.rows[0][0]) * SQ.k;
  const sqY = y => sqHeadH + (y - SQ.rows[0][0]) * SQ.k;        // row-area source y → panel y
  const sqH = sqRowTop(3) + (SQ.rows[3][1] - SQ.rows[3][0]) * SQ.k;
  const capBC = 330 + q * 130, sqTop = capBC + 220;
  const sqRows = SQ.rows.map(([y0, y1], i) => band(sqRowTop(i), 950, (y1 - y0) * SQ.k,
    bandImg(SOQ0, SQ.x0, y0, SQ.k, 1920) + (i < 3 ? bandImg(SOQ1, SQ.x0, y0, SQ.k, 1920, 'tk' + i, 'opacity:0') : ''))).join('');
  const taps = [0, 1, 2].map(i => `<div id="tap${i}" class="tap abs" style="left:${((709 - SQ.x0) * SQ.k - 40).toFixed(1)}px;top:${(sqY((SQ.rows[i][0] + SQ.rows[i][1]) / 2) - 40).toFixed(1)}px"></div>`).join('');

  // D — callback block (9:16 top; 4:5 adds 140)
  const dTop = 560 + q * 140;

  $('stage').innerHTML = `
  <div id="app">
    <div id="viewport" class="abs" data-qa-ignore style="height:${SB - 510}px"><div id="list"></div></div>
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
        <div id="tv1" class="mk">1</div><div id="tv3" class="mk">3</div><div id="tv6" class="mk">6 (ish)</div><div id="tvq" class="mk">?</div>
        <svg id="x1" class="abs"></svg><svg id="x3" class="abs"></svg><svg id="x6" class="abs"></svg>
      </div>
    </div>
  </div>

  <div id="qsme" class="abs">
    <!-- A: the real iPhone app still -->
    <div class="capwrap abs" style="top:${capA}px"><div id="capA" class="cap">Or just put the actual<br>job on <span class="g">QSME</span>.</div></div>
    <div id="gPhone" class="grp abs" style="left:65px;width:950px;top:${phTop}px">
      <div class="panel dark phone" style="position:relative;height:${PH.h.toFixed(2)}px">
        <div id="phZoom" class="abs" style="left:0;top:0;width:950px;height:${PH.h.toFixed(2)}px;transform-origin:830px 327px">
          ${band(0, 950, PH.navH, bandImg(PHONE, PH.x0, PH.nav[0], kP, 1440))}
          ${band(PH.navH, 950, PH.gridH, bandImg(PHONE, PH.x0, PH.grid[0], kP, 1440))}
          <svg id="mkAsk" class="abs"></svg><svg id="mkInv" class="abs"></svg>
        </div>
      </div>
      ${chip('chA', 'QSME iPhone app · demo data')}
      <svg id="arrA" class="abs"></svg>
      <div id="daveA" class="mk abs" style="left:610px;top:${(PH.h + 52).toFixed(1)}px;font-size:60px;line-height:72px;color:#F0473C;transform-origin:0 50%">Dave K.</div>
    </div>

    <!-- B + C: one recreation (Step 2, scope from SOQ), two captions -->
    <div class="capwrap abs" style="top:${capBC}px"><div id="capB" class="cap s">Send one job to the<br>trades you choose.</div></div>
    <div class="capwrap abs" style="top:${capBC}px"><div id="capC" class="cap s">They all quote on<br>the same lines.</div></div>
    <div id="gSoq" class="grp abs" style="left:65px;width:950px;top:${sqTop}px">
      <div class="panel" style="position:relative;height:${sqH.toFixed(2)}px">
        <div id="sqZoom" class="abs" style="left:0;top:0;width:950px;height:${sqH.toFixed(2)}px;transform-origin:285px 260px">
          ${band(0, 950, sqHeadH, bandImg(SOQ0, SQ.x0, SQ.head[0], SQ.k, 1920))}
          ${sqRows}
          ${taps}
          <svg id="mkPick" class="abs"></svg><svg id="mkBr" class="abs"></svg>
        </div>
      </div>
      ${chip('chC', REC)}
    </div>

    <!-- D: the callback -->
    <div id="know" class="abs" style="top:${dTop + 300}px"><div id="knowC" class="cap">Know which Dave.</div></div>

    <!-- end card -->
    <div id="end" class="abs">
      <div id="logo" class="abs" style="top:${596 + q * 140}px"><img src="${LOGO}" alt="" style="width:708.5px;left:-90.1px;top:-77px"></div>
      <div id="cta" class="abs" style="top:${836 + q * 140}px">
        <div id="ctaA">Free to join.</div>
        <div id="ctaB" class="ctaL"><span>No listing fee on tenders.</span></div>
        <div id="ctaB2" class="ctaL"><span>Inviting your own tradie is <b>always free</b>.</span></div>
        <div id="ctaCw"><span id="ctaC">Create a project, free · qsme.co.nz</span></div>
      </div>
    </div>

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
      <div id="hk2" class="hl"><span class="box">Still no builder.</span></div>
    </div>
  </div>`;
  // chip + small helpers (kept here so the label reads the same on every recreation)
  const st = document.createElement('style');
  st.textContent = `.rchip{font:500 22px/1 'JetBrains Mono',monospace;color:#CBD5E1;background:#0B1226;border:2px solid rgba(248,250,252,.28);border-radius:999px;padding:10px 20px 11px;white-space:nowrap;letter-spacing:.01em}
    .tap{width:80px;height:80px;border-radius:50%;background:rgba(15,23,42,.22);opacity:0;visibility:hidden}`;
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
    const T = [];
    // every key at body >= 0.8 (the card collapse and everything after it) moves HOLD later; `fixed` keys don't move
    const sh = t => (t >= 0.8 - 1e-9 ? t + HOLD : t);
    const add = (id, f, k, fixed) => T.push({ id, f, k: k.map(a => ({ t: fixed ? a[0] : sh(a[0]), v: a[1], fn: EZ[a[2] || 'L'] })) });
    const pop = (id, t) => { add(id, 'OPACITY', [[t, 0], [t + 0.16, 1, 'O']]); add(id, 'TY', [[t, 36], [t + 0.24, 0, 'O']]); };
    const showAt = (id, t) => add(id, 'OPACITY', [[0, 0], [t, 1, 'H']]);
    const top = M.itemTop, S = (i, y) => Math.round(y - M.listY0 - top[i]);
    const S1 = S(2, 840), S2 = S(3, 820), S3 = S(12, 640), S4 = S(17, 640);
    // 0.00–1.6 Mel's post card fills the screen; the underline draws once the post has been read (reel 3.05–3.4) and sits
    // for 0.7 s; the card collapses into the pinned strip at body 0.8 + HOLD (reel 4.1)
    add('u1', 'OPACITY', [[0.54, 0], [0.55, 1, 'H']], true); add('u1', 'TRIM', [[0.55, 0], [0.9, 1, 'O']], true);
    add('card', 'OPACITY', [[0.82, 1], [0.94, 0]]);
    add('card', 'TY', [[0.8, 0], [1.02, Math.round(350 - (M.cardTop + M.cardH / 2)), 'IO']]);
    add('card', 'SCALE', [[0.8, 1], [1.02, 0.55, 'IO']]);
    add('morph', 'TY', [[0.8, 0], [1.02, 300 - M.cardTop, 'IO']]);
    add('morph', 'HEIGHT', [[0.8, M.cardH], [1.02, 100, 'IO']]);
    add('morph', 'RADIUS', [[0.8, 20], [1.02, 12, 'IO']]);
    add('morph', 'FILL', [[0.8, '#FFFFFF'], [1.02, '#F1F0EC', 'IO']]);
    add('pinned', 'OPACITY', [[0.96, 0], [1.08, 1, 'O']]); add('pinned', 'TY', [[0.96, 12], [1.08, 0, 'O']]);
    // comments
    pop('c0', 1.0); pop('c1', 1.9); pop('c2', 3.05); pop('c3', 4.4);
    for (let i = 4; i <= 12; i++) showAt('c' + i, 5.9);
    for (let j = 13; j <= 16; j++) showAt('c' + j, 8.5);
    pop('c17', 8.8);   // Mel R. ...can anyone actually come and quote?
    pop('c18', 9.4);   // Kerry P. Dave can.
    // scroll, stop, scroll, fling + slam on Dave, then the last two comments
    add('list', 'TY', [[3.0, 0], [3.15, S1, 'SCROLL'], [4.35, S1], [4.5, S2, 'SCROLL'], [5.9, S2], [6.5, S3 - 18, 'SLAM'], [6.62, S3, 'O'], [8.5, S3], [8.8, S4, 'IO']]);
    add('list', 'BLUR', [[5.9, 0], [6.1, 7, 'I'], [6.42, 7], [6.5, 0], [8.5, 0], [8.6, 4, 'I'], [8.72, 4], [8.8, 0]]);
    add('circle', 'OPACITY', [[6.64, 0], [6.65, 1, 'H']]); add('circle', 'TRIM', [[6.65, 0], [7.0, 1, 'O']]);
    // red-marker tally 1 → 3 → 6 (ish) → ?
    add('tlabel', 'OPACITY', [[1.15, 0], [1.25, 1, 'O']]); add('tlabel', 'SCALE', [[1.15, 1.18], [1.35, 1, 'O']]);
    add('tv1', 'OPACITY', [[1.15, 0], [1.25, 1, 'O'], [2.17, 1], [2.25, 0]]); add('tv1', 'SCALE', [[1.15, 1.4], [1.35, 1, 'O']]);
    add('x1', 'OPACITY', [[2.04, 0], [2.05, 1, 'H'], [2.17, 1], [2.25, 0]]); add('x1', 'TRIM', [[2.05, 0], [2.17, 1, 'O']]);
    add('tv3', 'OPACITY', [[2.2, 0], [2.28, 1, 'O'], [6.17, 1], [6.25, 0]]); add('tv3', 'SCALE', [[2.2, 1.4], [2.4, 1, 'O']]);
    add('x3', 'OPACITY', [[6.0, 0], [6.01, 1, 'H'], [6.17, 1], [6.25, 0]]); add('x3', 'TRIM', [[6.01, 0], [6.13, 1, 'O']]);
    add('tv6', 'OPACITY', [[6.2, 0], [6.28, 1, 'O'], [7.07, 1], [7.15, 0]]); add('tv6', 'SCALE', [[6.2, 1.4], [6.4, 1, 'O']]);
    add('x6', 'OPACITY', [[6.94, 0], [6.95, 1, 'H'], [7.07, 1], [7.15, 0]]); add('x6', 'TRIM', [[6.95, 0], [7.07, 1, 'O']]);
    add('tvq', 'OPACITY', [[7.1, 0], [7.18, 1, 'O']]); add('tvq', 'SCALE', [[7.1, 1.5], [7.32, 1, 'O']]);
    add('tinner', 'ROT', [[5.95, 0], [6.02, 5], [6.09, -4], [6.16, 4], [6.23, -3], [6.3, 0, 'O']]);
    add('tinner', 'TX', [[5.95, 0], [6.02, -6], [6.09, 6], [6.16, -5], [6.23, 4], [6.3, 0, 'O']]);
    // body 11.4–11.8 (reel 13.9–14.3) the group app swipes away to QSME
    add('app', 'TX', [[10.6, 0], [11.0, -1080, 'SWIPE']]);
    add('qsme', 'TX', [[10.6, 0], [11.0, -1080, 'SWIPE']]);
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
  Kit.each(t => { if (EL) renderTL(t - BODY); });

  // ---------------------------------------------------------------- hook 0–2.5
  Kit.scene('#hook', 0, BODY);
  Kit.add('#hlist', 'y', [[0, 0], [0.42, -430, 'scroll'], [0.5, -430], [0.97, -880, 'scroll'], [1.05, -880], [1.6, -1360, 'scroll'], [2.5, -1470, 'out']]);
  Kit.add('#hlist', 'blur', [[0, 4], [0.12, 6], [0.42, 1.6, 'out'], [0.5, 1.6], [0.6, 6], [0.97, 1.6, 'out'], [1.05, 1.6], [1.15, 6], [1.6, 1.6, 'out']]);
  Kit.add('#hk1', 'scale', [[0, 1.06], [0.22, 1, 'out']]);
  Kit.count('#hkNum', [[0, 197], [0.5, 205, 'hold'], [1.05, 212, 'hold']], v => String(Math.round(v)));
  Kit.add('#hkNum', 'scale', [[0, 1], [0.5, 1], [0.5, 1.38, 'hold'], [0.72, 1, 'out'], [1.05, 1], [1.05, 1.38, 'hold'], [1.27, 1, 'out']]);
  Kit.slam('#hk2', 1.3, { from: 1.35, dur: 0.16 });
  Kit.add('#hk2', 'rotate', [[1.3, -3], [1.46, -1.5, 'slam']]);

  // ---------------------------------------------------------------- QSME product beat (reel time)
  // A 14.3–17.0: the real iPhone app still
  Kit.pop('#capA', 14.3, { dy: 30 }); Kit.add('#capA', 'opacity', [[16.85, 1], [17.0, 0, 'in']]); Kit.add('#capA', 'y', [[16.85, 0], [17.0, -24, 'in']]);
  Kit.pop('#gPhone', 14.35, { dy: 44, dur: 0.32, fade: 0.2 });
  Kit.add('#phZoom', 'scale', [[14.5, 1], [16.95, 1.02, 'inOut']]);
  Kit.add('#daveA', 'opacity', [[16.1, 0], [16.2, 1, 'out']]); Kit.add('#daveA', 'scale', [[16.1, 1.25], [16.3, 1, 'out']]); Kit.add('#daveA', 'rotate', [[0, -3]]);
  Kit.add('#gPhone', 'x', [[16.9, 0], [17.22, -1100, 'swipe']]);
  // B 17.0–20.0 and C 20.0–22.9: one recreation, two captions
  Kit.add('#gSoq', 'x', [[16.9, 1100], [17.22, 0, 'swipe']]);
  Kit.add('#sqZoom', 'scale', [[17.25, 1], [22.8, 1.025, 'inOut']]);
  Kit.pop('#capB', 17.05, { dy: 30 }); Kit.add('#capB', 'opacity', [[19.8, 1], [19.95, 0, 'in']]); Kit.add('#capB', 'y', [[19.8, 0], [19.95, -24, 'in']]);
  [18.3, 18.8, 19.3].forEach((t, i) => {
    Kit.add('#tk' + i, 'opacity', [[t, 0], [t + 0.1, 1, 'out']]);
    Kit.add('#tap' + i, 'opacity', [[t - 0.08, 0], [t - 0.02, 1], [t + 0.22, 0, 'out']]);
    Kit.add('#tap' + i, 'scale', [[t - 0.08, 0.45], [t + 0.22, 1.25, 'out']]);
  });
  Kit.pop('#capC', 20.0, { dy: 30 }); Kit.add('#capC', 'opacity', [[22.75, 1], [22.9, 0, 'in']]); Kit.add('#capC', 'y', [[22.75, 0], [22.9, -24, 'in']]);
  Kit.add('#gSoq', 'opacity', [[22.8, 1], [23.05, 0, 'in']]);
  Kit.add('#gSoq', 'scale', [[22.8, 1], [23.05, 0.94, 'out']]);
  // D 22.9–25.9: the callback, big and centred (no sound needed: the tick pops)
  Kit.add('#t2label', 'opacity', [[23.0, 0], [23.1, 1, 'out']]); Kit.add('#t2label', 'scale', [[23.0, 1.18], [23.2, 1, 'out']]);
  Kit.add('#t2v', 'opacity', [[23.0, 0], [23.1, 1, 'out']]); Kit.add('#t2v', 'scale', [[23.0, 1.4], [23.2, 1, 'out']]);
  Kit.add('#tick', 'scale', [[23.46, 1], [23.6, 1.22, 'out'], [23.8, 1, 'out']]);
  Kit.pop('#t2sub', 23.6, { dy: 18 }); Kit.out('#t2sub', 25.7, 0.15);
  Kit.add('#knowC', 'opacity', [[24.15, 0], [24.35, 1, 'out'], [25.7, 1], [25.85, 0]]);
  Kit.add('#knowC', 'scale', [[24.15, 0.9], [24.45, 1, 'outBack']]);
  // end card 25.85–30
  Kit.fade('#end', 25.85, 26.15);
  Kit.fade('#logo', 26.0, 26.3); Kit.add('#logo', 'scale', [[26.0, 0.94], [26.4, 1, 'out']]);
  Kit.pop('#ctaA', 26.25, { dy: 28 }); Kit.pop('#ctaB', 26.45, { dy: 28 }); Kit.pop('#ctaB2', 26.65, { dy: 28 }); Kit.pop('#ctaC', 26.85, { dy: 28 });

  // ---------------------------------------------------------------- layout that needs measuring
  const setup = (async () => {
    await Promise.all(['400 50px Inter', '500 30px Inter', '600 30px Inter', '800 104px Inter', '800 60px Manrope', '66px "Permanent Marker"', '500 22px "JetBrains Mono"'].map(f => document.fonts.load(f)));
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
    ['tv1', 'tv3', 'tv6', 'tvq'].forEach(id => $(id).style.left = vx + 'px');
    [['x1', 'tv1'], ['x3', 'tv3'], ['x6', 'tv6']].forEach(([x, v]) => { const w = $(v).offsetWidth; markerAt($(x), strikePts(w, 80).map(([a, b]) => [a + vx, b]), 6, '#E0302A'); });
    $('tinner').style.width = (vx + $('tv6').offsetWidth) + 'px';
    // callback tally (120px marker) + big green tick, centred; at 25.9–26.3 it shrinks into the upper-left corner
    const lw2 = $('t2label').offsetWidth; $('t2v').style.left = (lw2 + 30) + 'px';
    const tx0 = lw2 + 30 + $('t2v').offsetWidth + 34, sz = 108;
    markerAt($('tick'), [[tx0, 45 + sz * 0.5], [tx0 + sz * 0.38, 45 + sz * 0.9], [tx0 + sz * 1.05, 45 - 7]], 13, '#3DC023');
    const tk = $('tick'); tk.style.transformOrigin = `${(tx0 + sz * 0.5 - parseFloat(tk.style.left)).toFixed(1)}px ${(45 + sz * 0.45 - parseFloat(tk.style.top)).toFixed(1)}px`;
    const W2 = Math.round(tx0 + sz * 1.1);
    $('tally2').style.width = W2 + 'px'; $('t2wrap').style.width = W2 + 'px';
    const L0 = Math.round((1080 - W2) / 2);
    $('t2pos').style.left = L0 + 'px';
    const sEnd = 41 / 120;   // ends at the old corner size (66px marker × 0.62)
    Kit.add('#t2pos', 'x', [[25.9, 0], [26.3, 80 - L0, 'inOut']]);
    Kit.add('#t2pos', 'y', [[25.9, 0], [26.3, 330 - dTop, 'inOut']]);
    Kit.add('#t2pos', 'scale', [[25.9, 1], [26.3, sEnd, 'inOut']]);
    Kit.add('#tick path', 'trim', [[23.3, 0], [23.5, 1, 'out']]);
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
    Kit.add('#hkCirc path', 'trim', [[1.1, 0], [1.4, 1, 'out']]);

    // iPhone still: red marker hugging the "Ask for quotes" and "Invite" tiles (tile boxes measured on the 1440x2560 capture);
    // the Invite ring stays inside stage x 1000 even at the end of the push-in
    const tile = (x0, x1, y0, y1, f, pad) => ({ cx: phX((x0 + x1) / 2), cy: phY((y0 + y1) / 2), rx: (x1 - x0) / 2 * kP * f + pad, ry: (y1 - y0) / 2 * kP + 10 });
    const ask = tile(731, 992, 943, 1116, 1, 6), inv = tile(1015, 1276, 943, 1116, 0.82, 0);   // Ask clears its label; Invite stays inside x 1000
    markerAt($('mkAsk'), ellipsePts(ask.cx, ask.cy, ask.rx, ask.ry), 7, '#F0473C');
    markerAt($('mkInv'), ellipsePts(inv.cx, inv.cy, inv.rx, inv.ry, -0.2), 7, '#F0473C');
    Kit.add('#mkAsk path', 'trim', [[15.15, 0], [15.5, 1, 'out']]);
    Kit.add('#mkInv path', 'trim', [[15.7, 0], [16.05, 1, 'out']]);
    // marker note: "Dave K." under the panel, arrow up through the gutter between "Daily log" and "AI SOQ" into the Invite ring
    const gx = phX(1003.5), dv = $('daveA'), dvTop = PH.h + 52;
    const a0 = [gx - 4, dvTop - 6], a1 = [gx, phY(1290)], a2 = [gx + 2, phY(1170)], a3 = [gx + 8, phY(1128)], tip = [gx + 34, phY(1112)];
    const ang = Math.atan2(tip[1] - a3[1], tip[0] - a3[0]), hl = 26;
    const head = [[tip[0] - hl * Math.cos(ang - 0.5), tip[1] - hl * Math.sin(ang - 0.5)], tip, [tip[0] - hl * Math.cos(ang + 0.5), tip[1] - hl * Math.sin(ang + 0.5)]];
    markerMulti($('arrA'), [[a0, a1, a2, a3, tip], head], 6, '#F0473C');
    const ap = $('arrA').querySelectorAll('path');   // shaft, then the head (each path gets its own draw-on)
    Kit.add(ap[0], 'trim', [[16.0, 0], [16.22, 1, 'out']]); Kit.add(ap[1], 'trim', [[16.2, 0], [16.3, 1, 'out']]);
    dv.style.left = Math.round(gx - 60) + 'px';
    // SOQ step: marker under "Pick the line items to put out to tender" (source x 680–983, baseline y 374)
    markerAt($('mkPick'), underlinePts((983 - 680) * SQ.k + 10).map(([x, y]) => [x + (680 - SQ.x0) * SQ.k - 5, y + (374 - SQ.head[0]) * SQ.k + 4]), 7, '#E0302A');
    Kit.add('#mkPick path', 'trim', [[17.55, 0], [17.95, 1, 'out']]);
    // bracket on the three ticked rows (Civils & Earthworks → Structural Frame), drawn on the empty right side of the rows
    const yA = sqY(459) + 4, yB = sqY(638) - 4, ym = (yA + yB) / 2, bx = 878;
    markerAt($('mkBr'), [[bx - 30, yA], [bx - 6, yA + 6], [bx + 2, yA + 34], [bx + 3, ym - 26], [bx + 10, ym - 6], [bx + 30, ym], [bx + 10, ym + 6], [bx + 3, ym + 26], [bx + 2, yB - 34], [bx - 6, yB - 6], [bx - 30, yB]], 7, '#E0302A');
    Kit.add('#mkBr path', 'trim', [[20.35, 0], [20.8, 1, 'out']]);

    // end card: keep each line on one line inside the safe width
    document.querySelectorAll('.ctaL > span').forEach(s => { let f = 46; while (s.offsetWidth > 940 && f > 34) { f--; s.parentElement.style.fontSize = f + 'px'; } });
    const pill = $('ctaC'); let pf = 46; while (pill.offsetWidth > 940 && pf > 32) { pf--; pill.style.fontSize = pf + 'px'; pill.style.lineHeight = Math.round(pf * 1.22) + 'px'; }
    return { cardH, cardTop, pinnedFont: fs, hookFont: hs, hkTop, SB, tallyW: W2, pillFont: pf };
  })();

  Kit.ready({ duration: 30 });
  const kitReady = window.__ready;
  window.__ready = (async () => { const layout = await setup; const info = await kitReady; Kit.render(0); return Object.assign({}, info, { layout }); })();
})();
