/* The pen on a string — QSME NZ 9:16 (48.7 s). Every visual state is a pure function of t.
 * Scenes: A hook (the MISSING poster + the empty string) · B the soggy sign-in book · C cut it down, cable-tie the QSME poster
 * · D scan + sign in (phone) · E next morning · F the builder's On site page + the register PDF · G end card.
 * Product screens are illustrative recreations of the live public sign-in page (site/$code) and the On site page,
 * built from their live wording and layout, with demo data.
 *
 * 2026-10-06 AUDIO-FIRST REMAKE (owner standard from N01: continuous speech, a real hook in the first 2 s, no gaps, one voice).
 * 2026-10-10 RE-TAKE for the CTA pronunciation rule (owner 2026-10-08: "dot koh dot en zed", never C-O): the whole take was
 * regenerated (ONE unbroken Cam S eleven_v3 request, 47.23 s, laid at 0.0 s) and every anchor below re-derived from it.
 * Every beat sits on its word in outputs/vo-take-cam-v3/alignment.json (words.json = [word, start, end]);
 * the page runs 48.7 s (take + ~1.5 s tail). Design unchanged (the 2026-10-04 cut, 29.6 s, is outputs/archive/*-v1.mp4).
 *   0.00–6.81  A  "Missing: one site pen. Last seen Tuesday. Reward, one sausage roll." over the MISSING poster; "his string" 1.05
 *   6.81–13.30 B  whip to the book on "Which matters" (6.99); "Who was on site Thursday?" on "who" (8.76); zoom to the Thu row on
 *                 "Thursday" (9.50); the drop falls on "the book says..." (11.14), smear; 'The book says: "D—"' on "Dee." (12.30)
 *   13.30–19.36 C  whip back on "Queue Ess Mee" (13.42), the MISSING poster drops; "QSME's own instructions:" 13.45;
 *                 the QSME poster rises on "Print it" (15.86), gloss on "laminate" (16.63), four zips on "cable-tie" (17.52)
 *   19.36–29.51 D  phone up on "Walk on" (19.28); brackets + "Scan the poster." on "scan" (20.39); pill on "poster", tap on "phone"
 *                 (21.46); name types on "Name," (22.39), company on "who you're with" (23.55); PPE rows tick on "tick what you're
 *                 wearing" (24.07 / 24.47 / 25.02) under "Tick what you're wearing."; Sign in for today on "today" (26.00);
 *                 the signed-in card + "Signed in. On the record." on "Signed" (26.58)
 *   29.51–33.27 E  dark on "Next morning" (29.65), Welcome back ringed through "remembers you"; quick ticks 31.10–31.58, Sign in 31.70,
 *                 signed in 31.86; "Still no pen." on "Still" (31.97)
 *   33.27–39.98 F  whip to On site on "Back at the desk" (33.36); zoom to the table 33.57–33.97; Dave Kettle ringed + '"D—" now has
 *                 a surname.' on "Dee's" (34.52); pan to Due today on "You can see" (35.91); "Who's still due." on "see who's" (36.38);
 *                 the register PDF slides up on "register" (38.15); "The register, on your own letterhead." on "prints" (38.69)
 *   39.98–48.7  G  end card on "One poster on the gate." (40.16); button pops on "Sign up" (41.81), pulses on "zed" (44.60) and 47.08;
 *                 the PEN: STILL MISSING tag swings in on "Pen's still missing, mind." (45.97) */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var EZ = Kit.ease;
  function kv(keys, t) {
    if (t <= keys[0][0]) return keys[0][1];
    for (var i = 1; i < keys.length; i++) {
      var a = keys[i - 1], b = keys[i];
      if (t < b[0]) { if (b[2] === 'hold') return a[1]; var e = b[2] ? (Array.isArray(b[2]) ? null : EZ[b[2]]) : EZ.linear; return a[1] + (b[1] - a[1]) * e((t - a[0]) / (b[0] - a[0])); }
    }
    return keys[keys.length - 1][1];
  }

  // ---------------- clock ----------------
  // Word anchors from outputs/vo-take-cam-v3/words.json (start of the word, s). Picture follows audio.
  var W = { which: 6.99, who: 8.76, thursday: 9.50, says: 11.14, dee: 12.30, queue: 13.42, print: 15.86, laminate: 16.63, cable: 17.52,
    walk: 19.28, scan: 20.39, poster: 20.78, phone: 21.43, name: 22.39, with: 23.68, tick: 24.03, wearing: 24.95, sign: 25.28, today: 26.00,
    signed: 26.63, next: 29.65, remembers: 30.45, you: 30.92, still: 31.97, back: 33.36, dees: 34.52, now: 35.50, youCan: 35.88, see: 36.38,
    due: 37.06, register: 38.22, prints: 38.69, one: 40.16, signUp: 41.81, zed: 44.60, pens: 45.97, end: 47.20 };
  var T = { B: W.which - 0.18, C: W.queue - 0.12, D: W.walk + 0.08, E: W.next - 0.14, F: W.back - 0.09, G: W.one - 0.18, END: 48.7 };
  // phone, day 1 (D, Wed 28 Oct) and day 2 (E, Thu 29 Oct). Day 1 holds the page top (logo, site, date) until "Name," then fills on the words.
  var P = { up: T.D - 0.05, brk: W.scan + 0.05, pill: W.poster, tapPill: W.phone + 0.03, page: W.phone + 0.16,
    sc0a: W.name - 0.18, sc0b: W.name - 0.02, type0: W.name, type1: W.name + 0.52, phone: W.name + 0.72, co: W.with - 0.13, sc1a: W.tick - 0.26, sc1b: W.tick - 0.06,
    t0: W.tick + 0.04, t1: W.tick + 0.44, t2: W.wearing + 0.07, sc2a: W.sign - 0.14, sc2b: W.sign + 0.01, agree: W.sign + 0.11, btn: W.today, ok: W.signed - 0.05 };
  var Q = { dark: T.E, page: T.E + 0.2, sc0: T.E + 0.24, ring: W.next + 0.31, sc1a: W.you - 0.02, sc1b: W.you + 0.12, t0: W.you + 0.18, t1: W.you + 0.30, t2: W.you + 0.42,
    sc2a: W.you + 0.48, sc2b: W.you + 0.60, agree: W.you + 0.66, btn: W.you + 0.78 };
  Q.ok = Math.max(W.still - 0.19, Q.btn + 0.16);   // the card never lands on the same frame as the tap

  // ---------------- icons (lucide-style) ----------------
  var IC = {
    hat: '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    login: '<path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
    ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    chl: '<path d="m15 18-6-6 6-6"/>', chr: '<path d="m9 18 6-6-6-6"/>',
    print: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 13h4"/><path d="M10 17h4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    walk: '<circle cx="13" cy="4" r="2"/><path d="m9 20 3-6 3 3v4"/><path d="m6 12 3-4 4 1 3 3 3 1"/>',
    qr: '<rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M16 12h1"/><path d="M12 21v-1"/>'
  };
  function ic(k, s, c, w) { return '<svg class="ico" width="' + (s || 16) + '" height="' + (s || 16) + '" viewBox="0 0 24 24" fill="none" stroke="' + (c || 'currentColor') + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round">' + IC[k] + '</svg>'; }
  var LOGO_SM = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M6 10v9h12v-9"/></svg>';

  // ---------------- WORLD: mesh, pen photo, QR, string ----------------
  (function mesh() {
    var d = '', x, y, R = rng(11), drops = '';
    for (x = 905 - 74 * 30; x <= 2300; x += 74) d += 'M' + x + ' -1200V3200';
    for (y = 300 - 150 * 10; y <= 3200; y += 150) d += 'M-1200 ' + y + 'H2300';
    for (var i = 0; i < 120; i++) {
      var kx = Math.floor(R() * 26) - 18, ky = Math.floor(R() * 13) - 1, r = 3.5 + R() * 4;
      var cx = 905 + 74 * kx + R() * 70, cy = 300 + 150 * ky + 4 + r * 0.7;
      drops += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="url(#wd)"/>';
    }
    $('#mesh').innerHTML = '<defs><radialGradient id="wd" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".3" stop-color="#dfe9f2" stop-opacity=".55"/><stop offset="1" stop-color="#6d8299" stop-opacity=".45"/></radialGradient>' +
      '<filter id="mb"><feGaussianBlur stdDeviation="0.7"/></filter></defs>' +
      '<g filter="url(#mb)" fill="none"><path d="' + d + '" stroke="#11161c" stroke-width="8" opacity=".5" transform="translate(4,7)"/>' +
      '<path d="' + d + '" stroke="#7f8890" stroke-width="5.5"/><path d="' + d + '" stroke="#d7dee4" stroke-width="1.7" opacity=".75" transform="translate(-1.3,-1.3)"/></g>' + drops;
  })();

  (function penPhoto() {
    var g = '', R = rng(5), i;
    for (i = 0; i < 16; i++) { var yy = 10 + i * 19 + R() * 8; g += '<path d="M0 ' + yy.toFixed(0) + ' C 150 ' + (yy + R() * 14 - 7).toFixed(0) + ', 380 ' + (yy + R() * 14 - 7).toFixed(0) + ', 610 ' + (yy + R() * 10 - 5).toFixed(0) + '" stroke="' + (R() < .5 ? 'rgba(110,70,30,.22)' : 'rgba(255,240,210,.18)') + '" stroke-width="' + (2 + R() * 4).toFixed(1) + '" fill="none"/>'; }
    $('#penPhoto').innerHTML = '<defs><linearGradient id="bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F8FD"/><stop offset=".45" stop-color="#D5E2EE"/><stop offset="1" stop-color="#9DB1C6"/></linearGradient>' +
      '<radialGradient id="flash" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>' +
      '<filter id="ps"><feGaussianBlur stdDeviation="6"/></filter></defs>' +
      '<rect width="610" height="296" fill="#C49A62"/>' + g +
      '<g transform="rotate(-13 305 148)">' +
      '<rect x="92" y="150" width="400" height="38" rx="10" fill="rgba(0,0,0,.35)" filter="url(#ps)"/>' +
      '<path d="M120 126 L84 140 L84 148 L120 162 Z" fill="#E7EAEE" stroke="rgba(0,0,0,.25)"/><path d="M84 139 L66 144 L84 149 Z" fill="#8f979f"/><circle cx="65" cy="144" r="2.6" fill="#555"/>' +
      '<rect x="118" y="124" width="330" height="40" rx="6" fill="url(#bar)" stroke="rgba(40,60,90,.45)" stroke-width="1.5"/>' +
      '<rect x="132" y="139" width="300" height="9" rx="4" fill="#2A4DB0" opacity=".85"/>' +
      '<path d="M120 131 H446" stroke="rgba(255,255,255,.75)" stroke-width="2"/><path d="M120 156 H446" stroke="rgba(60,80,110,.25)" stroke-width="2"/>' +
      '<path d="M420 118 H520 L527 124 L519 130 L528 136 L518 142 L529 148 L518 154 L528 160 L520 166 L526 172 H420 Z" fill="#1F45B5"/>' +
      '<rect x="430" y="110" width="80" height="9" rx="3" fill="#183a9c"/><path d="M424 124 H512" stroke="rgba(255,255,255,.35)" stroke-width="4"/>' +
      '<ellipse cx="402" cy="144" rx="9" ry="27" fill="none" stroke="#3a3326" stroke-width="9"/><ellipse cx="402" cy="144" rx="9" ry="27" fill="none" stroke="#EFE6CC" stroke-width="5"/>' +
      '</g>' +
      '<path d="M398 186 C 420 240, 520 214, 620 286" fill="none" stroke="#3a3326" stroke-width="9"/><path d="M398 186 C 420 240, 520 214, 620 286" fill="none" stroke="#EFE6CC" stroke-width="5"/>' +
      '<rect width="610" height="296" fill="url(#flash)"/>';
  })();

  (function qr() {
    var n = 29, q = 2, R = rng(42), m = [], x, y;
    for (y = 0; y < n; y++) { m.push([]); for (x = 0; x < n; x++) m[y].push(R() < 0.5 ? 1 : 0); }
    function finder(ox, oy) { for (var yy = -1; yy <= 7; yy++) for (var xx = -1; xx <= 7; xx++) { var X = ox + xx, Y = oy + yy; if (X < 0 || Y < 0 || X >= n || Y >= n) continue; var inside = xx >= 0 && xx <= 6 && yy >= 0 && yy <= 6; m[Y][X] = inside && (xx === 0 || xx === 6 || yy === 0 || yy === 6 || (xx >= 2 && xx <= 4 && yy >= 2 && yy <= 4)) ? 1 : 0; } }
    finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
    for (var i = 8; i < n - 8; i++) { m[6][i] = i % 2 === 0 ? 1 : 0; m[i][6] = i % 2 === 0 ? 1 : 0; }
    for (y = -2; y <= 2; y++) for (x = -2; x <= 2; x++) m[22 + y][22 + x] = Math.max(Math.abs(x), Math.abs(y)) !== 1 ? 1 : 0;
    var d = ''; for (y = 0; y < n; y++) for (x = 0; x < n; x++) if (m[y][x]) d += 'M' + (x + q) + ' ' + (y + q) + 'h1v1h-1z';
    $('#qr').innerHTML = '<rect width="33" height="33" fill="#fff"/><path d="' + d + '" fill="#0F172A"/>';
  })();

  // the empty, frayed string (redrawn every frame)
  var SNS = 'http://www.w3.org/2000/svg';
  var strG = $('#string');
  strG.innerHTML = '<path id="sO" fill="none" stroke="#2e2a22" stroke-width="13" stroke-linecap="round"/><path id="sI" fill="none" stroke="#DCD0B2" stroke-width="8" stroke-linecap="round"/>' +
    '<g id="fray" stroke="#CFC2A2" stroke-width="4" stroke-linecap="round" fill="none"><path/><path/><path/><path/><path/></g>' +
    '<rect x="890" y="284" width="30" height="40" rx="7" fill="#121212"/><path d="M905 300 l26 34" stroke="#1a1a1a" stroke-width="9" stroke-linecap="round"/>';
  var AX = 905, AY = 300, L = 470;
  function stringAt(t) {
    var dmp = t >= T.G ? 0.4 : 1; // on the end card the tag weighs the string down: smaller sway, so the tag stays clear of the right rail
    var th = dmp * (0.12 * Math.sin(2 * Math.PI * t / 2.3) + 0.045 * Math.sin(2 * Math.PI * t / 0.83 + 1.1)) + 0.03;
    var ex = AX + L * Math.sin(th), ey = AY + L * Math.cos(th);
    var mx = AX + 0.5 * L * Math.sin(th * 0.55) - 6 * Math.sin(2 * Math.PI * t / 0.9), my = AY + 0.5 * L;
    return { th: th, ex: ex, ey: ey, mx: mx, my: my };
  }
  function drawString(t) {
    var s = stringAt(t), d = 'M' + AX + ' ' + (AY + 20) + ' Q' + s.mx.toFixed(1) + ' ' + s.my.toFixed(1) + ' ' + s.ex.toFixed(1) + ' ' + s.ey.toFixed(1);
    $('#sO').setAttribute('d', d); $('#sI').setAttribute('d', d);
    var fr = $('#fray').children, sp = [-0.55, -0.22, 0.05, 0.3, 0.62], ln = [30, 42, 36, 44, 28];
    for (var i = 0; i < 5; i++) {
      var a = s.th + sp[i] + 0.12 * Math.sin(2 * Math.PI * t / 0.7 + i), l = ln[i];
      var x2 = s.ex + l * Math.sin(a), y2 = s.ey + l * Math.cos(a), cx = s.ex + l * 0.5 * Math.sin(a + 0.4), cy = s.ey + l * 0.5 * Math.cos(a + 0.4);
      fr[i].setAttribute('d', 'M' + s.ex.toFixed(1) + ' ' + s.ey.toFixed(1) + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1));
    }
    return s;
  }

  // ---------------- BOOK ----------------
  (function book() {
    var cols = [[26, 'DAY'], [140, 'NAME'], [424, 'COMPANY / TRADE'], [672, 'TIME IN'], [800, 'SIGN']];
    var h = '<div class="hd">SITE SIGN-IN</div><div class="hd2">Gate 1 · everyone, every day, before you start</div>';
    h += '<div class="th">' + cols.map(function (c) { return '<span style="position:absolute;left:' + c[0] + 'px">' + c[1] + '</span>'; }).join('') + '</div>';
    [124, 410, 660, 790].forEach(function (x) { h += '<div class="vl" style="left:' + x + 'px"></div>'; });
    var rows = [
      ['Mon', 'Mike', 'framing', '7:02', 'M~'], ['Mon', 'Hemi', 'plumber', '7:45', 'H~'], ['Tue', 'Sione', 'framing', '6:58', 'S~', 'wet'],
      ['Tue', '', '', '', '', 'wash'], ['Wed', '', '', '', '', 'pencil'], ['Thu', '', '', '', '', 'thu'], ['Fri', '', '', '', '', 'empty'], ['', '', '', '', '', 'empty'], ['', '', '', '', '', 'empty']];
    rows.forEach(function (r, i) {
      var top = 202 + i * 120, kind = r[5] || '', st = kind === 'wet' ? 'filter:blur(1.3px);text-shadow:0 0 8px rgba(29,58,154,.45)' : '';
      h += '<div class="row" style="top:' + top + 'px"' + (kind === 'thu' ? ' id="rowThu"' : '') + '>';
      h += '<div class="c ink" style="left:30px;font-size:46px;color:#2b3f8f;' + st + '">' + r[0] + '</div>';
      if (kind === '' || kind === 'wet') {
        h += '<div class="c ink" style="left:150px;' + st + '">' + r[1] + '</div><div class="c ink" style="left:432px;' + st + '">' + r[2] + '</div><div class="c ink" style="left:680px;' + st + '">' + r[3] + '</div>';
        h += '<svg class="c" style="left:808px;' + st + '" width="130" height="120" viewBox="0 0 130 120"><path d="M8 78 C 20 30, 34 30, 30 70 S 52 40, 60 66 S 90 30, 122 58" fill="none" stroke="#1d3a9a" stroke-width="4" stroke-linecap="round"/></svg>';
      }
      if (kind === 'wet') h += '<div style="position:absolute;left:420px;top:10px;width:120px;height:90px;border-radius:50%;background:radial-gradient(ellipse, rgba(60,90,170,.25), transparent 70%);filter:blur(6px)"></div>';
      if (kind === 'wash') h += '<div style="position:absolute;left:140px;top:6px;width:640px;height:110px;filter:blur(10px);background:radial-gradient(ellipse 38% 50% at 30% 50%, rgba(40,70,160,.45), transparent 70%),radial-gradient(ellipse 30% 40% at 62% 46%, rgba(40,70,160,.35), transparent 70%),radial-gradient(ellipse 20% 30% at 88% 55%, rgba(40,70,160,.3), transparent 70%)"></div><div class="c ink" style="left:160px;filter:blur(4px);opacity:.55">Ja</div><div class="c ink" style="left:450px;filter:blur(5px);opacity:.45">roof</div>';
      if (kind === 'pencil') h += '<div class="c pencil" style="left:150px;transform:rotate(-2deg)">WHO HAS THE PEN??</div>';
      if (kind === 'thu') h += '<div id="smear" style="left:120px;top:-6px;width:640px;height:130px"><div style="position:absolute;inset:0;filter:blur(12px);background:radial-gradient(ellipse 34% 46% at 30% 52%, rgba(62,70,88,.8), transparent 72%),radial-gradient(ellipse 30% 36% at 58% 48%, rgba(62,70,88,.66), transparent 72%),radial-gradient(ellipse 22% 30% at 82% 56%, rgba(70,78,96,.4), transparent 72%)"></div><div style="position:absolute;left:60px;top:44px;width:520px;height:16px;background:linear-gradient(90deg, rgba(60,66,80,.55), rgba(60,66,80,0));filter:blur(5px);transform:rotate(-3deg)"></div><div style="position:absolute;left:90px;top:74px;width:420px;height:12px;background:linear-gradient(90deg, rgba(60,66,80,.45), rgba(60,66,80,0));filter:blur(5px);transform:rotate(2deg)"></div></div><div class="c pencil" id="dee" style="left:150px;font-size:72px;color:#3a404c;opacity:.95">D—</div>';
      h += '</div>';
    });
    $('#page').innerHTML = h;
    var page = $('#page'); page.appendChild($('#fall')); page.appendChild($('#splash'));
    $('#fall').style.cssText += ';left:404px;top:-40px'; $('#splash').style.cssText += ';left:330px;top:780px';
    var R = rng(23), s = '';
    for (var i = 0; i < 34; i++) { var r = 8 + R() * 22; s += '<div class="drop" style="left:' + (R() * 960).toFixed(0) + 'px;top:' + (R() * 1140).toFixed(0) + 'px;width:' + r.toFixed(0) + 'px;height:' + (r * (0.85 + R() * 0.4)).toFixed(0) + 'px"></div>'; }
    $('#sleeve').innerHTML = s;
  })();

  // ---------------- PHONE pages ----------------
  function head() {
    return '<header style="display:flex;align-items:center;gap:12px"><div style="width:48px;height:48px;border-radius:12px;border:1px solid var(--a-border);background:#fff;display:flex;align-items:center;justify-content:center;flex:none"><div style="width:38px;height:38px;border-radius:9px;background:#0E7490;display:flex;align-items:center;justify-content:center">' + LOGO_SM + '</div></div>' +
      '<div><p class="xs up muted">Site sign-in</p><h1 class="lg semi" style="line-height:1.25">Demo Build Co.</h1></div></header>';
  }
  function siteCard(date) { return '<section class="card" style="padding:16px"><p class="base semi">Two townhouses (demo)</p><p class="sm muted" style="display:flex;gap:4px;align-items:center;margin-top:2px">' + ic('pin', 14) + ' Christchurch</p><p class="sm muted" style="margin-top:4px">' + date + '</p></section>'; }
  function chk(id, text) { return '<div class="chk" id="' + id + '"><span class="bx">' + ic('check', 14, '#fff', 3) + '</span><span>' + text + '</span></div>'; }
  function formPage(day) {
    var d2 = day === 2;
    return '<div style="padding:24px 16px;display:flex;flex-direction:column;gap:20px">' + head() + siteCard(d2 ? 'Thursday, 29 October' : 'Wednesday, 28 October') +
      '<section id="who' + day + '" style="display:flex;flex-direction:column;gap:12px"><h2 class="h2">' + ic('user', 14) + ' Who you are</h2>' +
      (d2 ? '<div class="wb" id="wb"><span style="flex:1">Welcome back, <span class="semi">Tama Hollis</span><span class="muted"> · Demo Framing Ltd</span></span><span class="lnk">Not you?</span></div>' : '') +
      '<div><div class="lbl">Your name</div><div class="inp">' + (d2 ? 'Tama Hollis' : '<span id="nm1">Tama Hollis</span><span id="ph1" class="ph">First and last name</span>') + '</div></div>' +
      // the phone goes straight from an empty field to the blurred value: no readable number ever sits under a name
      '<div><div class="lbl">Phone</div><div class="inp">' + (d2 ? '<span class="redact">021 482 9907</span>' : '<span id="pn1" class="redact">021 482 9907</span>') + '</div></div>' +
      '<div><div class="lbl">Email <span class="muted" style="font-weight:500">(if you\'d rather)</span></div><div class="inp"></div></div>' +
      '<div><div class="lbl">Who are you with?</div><div class="inp" style="justify-content:space-between"><span id="co' + day + '">Demo Framing Ltd</span>' + ic('down', 16, 'oklch(44% .0144 250)') + '</div></div></section>' +
      '<section id="ppe' + day + '" style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">' + ic('hat', 14) + ' What I\'m wearing</h2>' +
      chk('c' + day + '0', 'Hi-vis vest or shirt') + chk('c' + day + '1', 'Safety boots') + chk('c' + day + '2', 'Hard hat in the work zone') + '</section>' +
      '<section id="haz' + day + '" style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">' + ic('warn', 14) + ' On site this week</h2>' +
      '<div class="amber"><span class="semi" style="display:block">Scaffold going up, east side</span><span class="muted" style="display:block">Stay outside the taped zone until it\'s tagged.</span></div>' +
      chk('c' + day + '3', 'I have read the above, I understand the controls, and I will follow the site safety rules.') + '</section>' +
      '<div class="btn dis" id="btn' + day + '">' + ic('login', 20, '#fff') + ' Sign in for today</div>' +
      '<p class="xs muted" style="text-align:center;margin-top:-8px" id="hint' + day + '">Tick every line to sign in.</p>' +
      '<p class="xs muted" style="text-align:center;padding:8px 0 40px">Site sign-in by QSME — the platform New Zealand builders run their projects on.</p></div>';
  }
  function okPage(day) {
    var time = day === 1 ? '7:12 am' : '6:58 am';
    // "Today on this site" lists only the person's own tasks and their company's (site_sign_in.go signInTasks), so Tama sees his one task
    function li(a, b, tag) { return '<li style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-top:1px solid var(--a-border)"><span style="flex:1"><span class="sm semi" style="display:block">' + a + '</span><span class="xs muted" style="display:block">' + b + '</span></span><span class="tag">' + tag + '</span></li>'; }
    return '<div style="padding:24px 16px;display:flex;flex-direction:column;gap:20px">' + head() +
      '<div style="display:flex;flex-direction:column;gap:16px"><section class="ok" id="okc' + day + '">' + ic('ok', 24, '#059669') + '<span><span class="lg semi" style="display:block">You\'re signed in, Tama Hollis</span>' +
      '<span class="sm muted" style="display:block">Two townhouses (demo) · with Demo Framing Ltd · ' + time + '</span>' +
      '<span class="sm muted" style="display:block;margin-top:4px">One sign-in covers this site for the day. It\'s on the record for the builder.</span></span></section>' +
      '<section style="display:flex;flex-direction:column;gap:8px"><h2 class="h2">Today on this site</h2><ul class="card" style="list-style:none;overflow:hidden" id="today' + day + '">' +
      li('Wall framing · Unit 2', 'under way', 'You').replace('border-top:1px solid var(--a-border)', 'border-top:0') + '</ul></section>' +
      '<p class="xs muted" style="text-align:center">Not Tama Hollis? <span class="lnk">Sign in as someone else</span></p></div></div>';
  }
  $('#pv1').innerHTML = formPage(1); $('#pv2').innerHTML = okPage(1); $('#pv3').innerHTML = formPage(2); $('#pv4').innerHTML = okPage(2);
  var PS = 860 / 392;
  ['#pv1', '#pv2', '#pv3', '#pv4'].forEach(function (s) { $(s).style.transform = 'scale(' + PS + ')'; });
  // the signed-in screens sit scrolled a little, so "Today on this site" clears the bottom caption
  ['#pv2', '#pv4'].forEach(function (s) { $(s).style.transform = 'scale(' + PS + ') translateY(-72px)'; });
  // camera feed: a copy of the poster
  (function () { var c = $('#sign').cloneNode(true); c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(function (e) { e.removeAttribute('id'); }); c.style.transform = 'none'; c.style.boxShadow = 'none'; $('#camfeed').appendChild(c); })();

  // ---------------- DESK page + register PDF ----------------
  // Thu 29 Oct, a frame/roof-stage day: Unit 1 is getting its roof underlay, pre-wire, plumbing rough-in and windows; Unit 2 is still in wall framing.
  // The On site table sorts by company, then time. Task titles carry the unit (set up that way for the owner's recordings, see post.md).
  var people = [
    ['Mere Walker', 'Demo Electrical Ltd', '7:31 am', 'Pre-wire · Unit 1', 0],
    ['Tama Hollis', 'Demo Framing Ltd', '6:58 am', 'Wall framing · Unit 2', 0],
    ['Dave Kettle', 'Demo Framing Ltd', '7:14 am', 'Wall framing · Unit 2', 0, 'rowDave'],
    ['Sione Latu', 'Demo Roofing Ltd', '7:40 am', 'Roof underlay · Unit 1', 0],
    ['Priya Nair', 'Demo Scaffolding Ltd', '7:05 am', 'Scaffold · east side', 0],
    ['Ben Ormsby', 'Demo Timber Supplies', '8:05 am', '—', 1]];
  // the register PDF lists the day's sign-ins oldest first (site_sign_in_register.go: ORDER BY check_date, created_at)
  var byTime = people.slice().sort(function (a, b) { var f = function (s) { var m = s.match(/(\d+):(\d+)/); return +m[1] * 60 + +m[2]; }; return f(a[2]) - f(b[2]); });
  (function desk() {
    var rows = people.map(function (p, i) {
      return '<tr' + (p[5] ? ' id="' + p[5] + '"' : '') + '><td style="text-align:right" class="muted">' + (i + 1) + '</td><td class="semi">' + p[0] + (p[4] ? '<span class="walk">walked in</span>' : '') + '</td><td>' + p[1] + '</td><td><span class="redact">02' + (i + 1) + ' 4' + i + '8 99' + (7 - i) + '1</span></td><td>' + p[2] + '</td><td class="muted"><span style="display:inline-flex;align-items:center;gap:4px">' + ic('qr', 14) + 'Poster</span></td><td' + (p[3] === '—' ? ' class="muted"' : '') + '>' + p[3] + '</td><td class="xs muted">PPE ✓ · briefing ✓</td></tr>';
    }).join('');
    $('#dpg').innerHTML = '<div style="display:flex;flex-direction:column;gap:16px">' +
      '<div><span class="sm semi" style="display:inline-flex;gap:6px;align-items:center;padding:4px 8px">' + ic('left', 16) + ' Project</span></div>' +
      '<header style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px"><div><p class="xs up muted">On site</p><h1 style="font-size:24px;line-height:32px;font-weight:600">Two townhouses (demo)</h1><p class="sm muted">Christchurch</p></div>' +
      '<div style="display:flex;gap:8px"><span class="obtn">' + ic('file', 16) + ' Site briefing</span><span class="pbtn">' + ic('print', 16, '#fff') + ' Print the site poster</span></div></header>' +
      '<div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px"><div style="display:flex;align-items:center;gap:8px">' +
      '<span style="padding:6px;display:flex">' + ic('chl', 16) + '</span><span class="sm semi" style="min-width:150px;text-align:center">Today · Thu, 29 Oct</span><span style="padding:6px;display:flex;opacity:.4">' + ic('chr', 16) + '</span>' +
      '<div style="margin-left:auto;display:flex;gap:8px"><span class="stat">' + ic('ok', 14, '#059669') + '<span class="xs muted">Signed in</span><b>6</b></span><span class="stat">' + ic('clock', 14, '#D97706') + '<span class="xs muted">Not yet</span><b>2</b></span><span class="stat">' + ic('walk', 14, '#0284C7') + '<span class="xs muted">Walked in</span><b>1</b></span></div></div>' +
      '<div><span class="dpill on">Thu, 29 Oct · 6</span><span class="dpill">Wed, 28 Oct · 5</span></div></div>' +
      '<div class="card" style="overflow:hidden" id="signedCard"><div style="display:flex;align-items:center;padding:10px 16px;border-bottom:1px solid var(--a-border)"><h2 style="flex:1;font-weight:600;font-size:16px">Signed in <span class="sm muted" style="font-weight:500">· today</span></h2><span class="obtn" id="printBtn">' + ic('print', 16) + ' Print ' + ic('down', 14) + '</span></div>' +
      '<table class="tbl" id="tbl"><thead><tr><th style="text-align:right;width:34px">#</th><th>Name</th><th>Company</th><th>Phone</th><th>Signed in</th><th>Via</th><th>Task</th><th>Agreed</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="card" id="dueCard" style="overflow:hidden"><div style="padding:10px 16px;border-bottom:1px solid var(--a-border)"><h2 style="font-weight:600;font-size:16px" id="dueH">Due today, not signed in yet <span class="sm muted" style="font-weight:500">· 2</span></h2></div>' +
      '<ul style="list-style:none"><li style="display:flex;align-items:center;gap:12px;padding:9px 16px;border-bottom:1px solid var(--a-border)">' + ic('clock', 16, '#D97706') + '<span style="flex:1" class="sm"><span class="semi">Hemi Tawhiri</span><span class="muted"> · Demo Plumbing Ltd</span><span class="xs muted" style="display:block">Plumbing rough-in · Unit 1</span></span><span class="xs muted">not yet</span></li>' +
      '<li style="display:flex;align-items:center;gap:12px;padding:9px 16px">' + ic('clock', 16, '#D97706') + '<span style="flex:1" class="sm"><span class="semi">Jono Price</span><span class="muted"> · Demo Joinery Ltd</span><span class="xs muted" style="display:block">Windows · Unit 1</span></span><span class="xs muted">not on QSME — can sign in from the poster</span></li></ul></div>' +
      '<div style="height:600px"></div></div>';
    // The register PDF, laid out like buildSignInRegisterPDF (site_sign_in_register.go): landscape A4, 12 mm margins, the owner's
    // letterhead, "Site sign-in register", a grey subtitle, one table (# · Time · Name · Company · Phone · Via · Task · Agreed),
    // the countersign line and the report footer. 1 mm = 7 px; the page runs off the right edge (zoomed on its left side).
    var M = 7.0, x0 = 12 * M, cols = [['#', 9, 'r'], ['Time', 17], ['Name', 61], ['Company', 52], ['Phone', 30], ['Via', 16], ['Task', 58], ['Agreed', 30]];
    function rowHTML(cells, y, head) {
      var x = x0, h = '';
      cols.forEach(function (c, j) { var w = c[1] * M; h += '<div class="c' + (head ? ' h' : '') + (c[2] ? ' r' : '') + '" style="left:' + x.toFixed(1) + 'px;top:' + y.toFixed(1) + 'px;width:' + w.toFixed(1) + 'px">' + cells[j] + '</div>'; x += w; });
      return h;
    }
    var ph = '<div class="logo" style="left:' + x0 + 'px;top:' + x0 + 'px;width:' + (16 * M) + 'px;height:' + (16 * M) + 'px">' + LOGO_SM.replace('width="24" height="24"', 'width="64" height="64"') + '</div>' +
      '<div class="co" style="left:' + x0 + 'px;top:' + (30 * M) + 'px;line-height:' + (5.5 * M) + 'px">Demo Build Co.</div>' +
      '<div class="det" style="left:' + x0 + 'px;top:' + (35.5 * M) + 'px;line-height:' + (4 * M) + 'px">Christchurch</div>' +
      '<div class="ti" style="left:' + x0 + 'px;top:' + (43.5 * M) + 'px;line-height:' + (8 * M) + 'px">Site sign-in register</div>' +
      '<div class="sub" style="left:' + x0 + 'px;top:' + (51.5 * M) + 'px;line-height:' + (5 * M) + 'px">Two townhouses (demo) · Christchurch · Thursday 29 October 2026 · 6 sign-ins</div>' +
      rowHTML(cols.map(function (c) { return c[0].toUpperCase(); }), 59.5 * M, true);
    byTime.forEach(function (p, i) {
      ph += rowHTML([String(i + 1), p[2], p[0], p[1], '<span class="redact">02' + (i + 2) + ' 5' + i + '1 88' + (6 - i) + '0</span>', 'Poster', p[3] === '—' ? '' : p[3], 'PPE, briefing'], (66 + 6.5 * i) * M, false);
    });
    var yC = (66 + 6.5 * byTime.length + 8) * M;
    ph += '<div class="det cs" style="left:' + x0 + 'px;top:' + yC + 'px">Checked by (site manager): ______________________________</div>' +
      '<div class="det cs" style="left:' + (x0 + 136.5 * M) + 'px;top:' + yC + 'px">Date: ____________________</div>' +
      '<div class="ftl" style="left:' + x0 + 'px;right:' + x0 + 'px;top:' + (193 * M) + 'px"></div>' +
      '<div class="ft" style="left:' + x0 + 'px;top:' + (195 * M) + 'px">Demo Build Co.&nbsp; · &nbsp;Two townhouses (demo)&nbsp; · &nbsp;29 Oct 2026</div>' +
      '<div class="ft" style="right:' + x0 + 'px;top:' + (195 * M) + 'px;text-align:right">Page 1 of 1</div>' +
      '<div class="ft" style="right:' + x0 + 'px;top:' + (202 * M) + 'px;text-align:right">Powered by <b>QSME</b></div>';
    $('#pdf').innerHTML = ph;
  })();

  // ---------------- helpers ----------------
  var root = $('#root');
  function cap(id, html, t0, t1, where) {
    var d = document.createElement('div'); d.id = id; d.className = 'cap ' + where; d.innerHTML = '<span>' + html + '</span>'; root.appendChild(d);
    Kit.pop('#' + id, t0, { dy: 22 }); Kit.out('#' + id, t1 - 0.12, 0.12);
  }
  // a caption whose lines arrive one by one: lines = [[html, t, cls]], each line its own box, laid out from the start so nothing jumps
  function capStack(id, lines, t1, where) {
    var d = document.createElement('div'); d.id = id; d.className = 'cap stack ' + where;
    d.innerHTML = lines.map(function (l, i) { return '<div class="ln" id="' + id + String.fromCharCode(97 + i) + '"><span' + (l[2] ? ' class="' + l[2] + '"' : '') + '>' + l[0] + '</span></div>'; }).join('');
    root.appendChild(d);
    lines.forEach(function (l, i) { Kit.pop('#' + id + String.fromCharCode(97 + i), l[1], { dy: 18 }); });
    Kit.out('#' + id, t1 - 0.12, 0.12);
  }
  function whipOut(sel, t) { Kit.add(sel, 'x', [[t - 0.14, 0], [t + 0.12, -300, 'in']]); Kit.add(sel, 'blur', [[t - 0.14, 0], [t + 0.12, 26, 'in']]); Kit.add(sel, 'opacity', [[t + 0.02, 1], [t + 0.12, 0]]); }
  function whipIn(sel, t) { Kit.add(sel, 'x', [[t - 0.12, 340], [t + 0.2, 0, 'out']]); Kit.add(sel, 'blur', [[t - 0.12, 26], [t + 0.2, 0, 'out']]); Kit.add(sel, 'opacity', [[t - 0.12, 0], [t - 0.04, 1]]); }
  var vis = [
    ['#world', [[0, T.B + 0.2], [T.C - 0.2, T.F + 0.2], [T.G - 0.2, 99]]],
    ['#bookScene', [[T.B - 0.2, T.C + 0.2]]],
    ['#phoneScene', [[T.D - 0.1, T.F + 0.2]]],
    ['#deskScene', [[T.F - 0.2, T.G + 0.2]]],
    ['#endScene', [[T.G - 0.1, 99]]], ['#tagW', [[T.G, 99]]],
    ['#lostW', [[0, T.C + 1.22]]], ['#signW', [[W.print - 0.1, 99]]], ['#cutters', [[T.C - 0.06, T.C + 0.75]]], ['#note', [[0, T.B + 0.2]]],
    ['#cambox', [[0, P.page + 0.3]]], ['#pv1', [[P.page, P.ok]]], ['#pv2', [[P.ok, Q.dark + 0.2]]], ['#pv3', [[Q.page, Q.ok]]], ['#pv4', [[Q.ok, 99]]],
    ['#pdf', [[W.register - 0.12, 99]]]];

  // ---------------- A: hook ----------------
  Kit.add('#noteArrow', 'trim', [[0.95, 0], [1.3, 1, 'out']]);
  Kit.add('#noteHead', 'trim', [[1.25, 0], [1.4, 1, 'out']]);
  Kit.pop('#note .t', 1.05, { dy: 14 }); Kit.add('#note .t', 'rotate', [[0, -5]]);
  document.querySelectorAll('#lost .drip').forEach(function (d, i) { var h0 = parseFloat(d.style.height); Kit.add(d, 'height', [[0, h0], [T.C, h0 + 26 + i * 10, 'out']]); });
  Kit.add('#chipD', 'opacity', [[0, 1], [T.C + 0.7, 1], [T.C + 0.85, 0]]);

  // world camera (custom so the end-card tag can follow the string). In C the poster sits a touch smaller and higher,
  // so its three steps stay clear of the stacked caption; on the end card the scene sits 30 px further left (tag off the right rail).
  var camK = {
    s: [[0, 1.02], [T.B, 1.08, 'inOut'], [T.C - 0.15, 0.9, 'hold'], [T.D, 0.93, 'inOut'], [T.G - 0.15, 0.5, 'hold'], [T.END, 0.512, 'linear']],
    x: [[0, 30], [T.B, 12, 'inOut'], [T.C - 0.15, 72, 'hold'], [T.D, 74, 'inOut'], [T.G - 0.15, -52, 'hold'], [T.END, -52]],
    y: [[0, 40], [T.B, 14, 'inOut'], [T.C - 0.15, -53, 'hold'], [T.D, -60, 'inOut'], [T.G - 0.15, -20, 'hold'], [T.END, -24, 'linear']]
  };
  whipOut('#world', T.B); whipIn('#world', T.C); whipOut('#world', T.F); whipIn('#world', T.G);

  // ---------------- B: the book ----------------
  whipIn('#bookScene', T.B); whipOut('#bookScene', T.C);
  var ZA = W.thursday + 0.04, ZB = W.thursday + 0.44, DR = W.says;   // zoom onto the Thu row on "Thursday"; the drop falls on "says..."
  var bookK = {
    s: [[T.B, 1.0], [ZA, 1.0], [ZB, 1.62, 'inOut'], [T.C, 1.68, 'linear']],
    x: [[T.B, 0], [ZA, 0], [ZB, 250, 'inOut'], [T.C, 256, 'linear']],
    y: [[T.B, 40], [ZA, -36, 'inOut'], [ZB, -690, 'inOut'], [T.C, -700, 'linear']]
  };
  Kit.add('#fall', 'y', [[DR, -260], [DR + 0.24, 820, 'in']]);
  Kit.add('#fall', 'opacity', [[DR, 0], [DR + 0.04, 1], [DR + 0.22, 1], [DR + 0.26, 0]]);
  Kit.add('#splash', 'scale', [[DR + 0.24, 0.2], [DR + 0.68, 1.7, 'out']]);
  Kit.add('#splash', 'opacity', [[DR + 0.24, 0], [DR + 0.26, 0.9], [DR + 0.68, 0, 'in']]);
  Kit.add('#smear', 'scale', [[DR + 0.24, 0.86], [DR + 1.08, 1.14, 'out']]);
  Kit.add('#smear', 'opacity', [[DR + 0.24, 0.75], [DR + 0.58, 1, 'out']]);
  Kit.add('#dee', 'blur', [[DR + 0.24, 0.6], [DR + 0.98, 2.2, 'out']]);
  cap('k1', 'Who was on site <span class="q">Thursday?</span>', W.who - 0.04, T.C - 0.02, 'top');
  cap('k2', 'The book says: <span class="q">“D—”</span>', W.dee - 0.07, T.C - 0.02, 'bot');

  // ---------------- C: cut it down, cable-tie the poster ----------------
  // the snip comes 0.25 s in; the caption's three lines arrive with the cutters, the rising poster and the first zip
  var C = T.C;
  Kit.add('#cutters', 'x', [[C - 0.06, 1150], [C + 0.2, 723, 'out'], [C + 0.36, 723], [C + 0.72, 1250, 'in']]);
  Kit.add('#cutters', 'y', [[C - 0.06, -140], [C + 0.2, 170, 'out'], [C + 0.36, 170], [C + 0.72, -60, 'in']]);
  Kit.add('#cutters', 'rotate', [[C - 0.06, -40], [C + 0.2, -30, 'out'], [C + 0.36, -30], [C + 0.72, -16, 'in']]);
  Kit.add('#cutters', 'scale', [[0, 1.3]]);
  Kit.add('#cutJawTop', 'rotate', [[C - 0.06, -9], [C + 0.19, -9], [C + 0.25, 0, 'in'], [C + 0.4, -9, 'out']]);
  Kit.add('#cutJawBot', 'rotate', [[C - 0.06, 9], [C + 0.19, 9], [C + 0.25, 0, 'in'], [C + 0.4, 9, 'out']]);
  Kit.add('#tieLR', 'opacity', [[0, 1], [C + 0.25, 0, 'hold']]);
  Kit.add('#tailLR', 'y', [[C + 0.25, 0], [C + 0.72, 220, 'in']]); Kit.add('#tailLR', 'rotate', [[C + 0.25, -24], [C + 0.72, 70]]); Kit.add('#tailLR', 'x', [[C + 0.25, 0], [C + 0.72, 40]]);
  Kit.add('#tailLR', 'opacity', [[C + 0.25, 1], [C + 0.72, 0]]);
  Kit.add('#lostW', 'rotate', [[C + 0.25, 0], [C + 0.57, 26, 'outBack'], [C + 0.67, 24], [C + 1.17, 44, 'in']]);
  Kit.add('#lostW', 'y', [[C + 0.67, 0], [C + 1.17, 1500, 'in']]);
  var PR = W.print - 0.08;   // the QSME poster rises on "Print it"
  Kit.add('#signW', 'y', [[PR, 1450], [PR + 0.45, 0, 'out']]);
  Kit.add('#signW', 'rotate', [[PR, -7], [PR + 0.45, 0, 'out']]);
  ['#st1', '#st2', '#st3', '#st4'].forEach(function (s, i) { Kit.add(s, 'scaleY', [[W.cable + i * 0.09, 2.6], [W.cable + 0.12 + i * 0.09, 1, 'out']]); });
  Kit.add('#gloss', 'x', [[W.laminate - 0.02, -820], [W.laminate + 0.63, 820, 'inOut']]);
  capStack('k3', [['QSME’s own instructions:', W.queue + 0.03, 'kq'], ['Print it, laminate it,', W.print - 0.02], ['<span class="g">cable-tie it to the fence.</span>', W.cable - 0.02]], T.D - 0.02, 'bot');
  Kit.add('#lblPoster', 'opacity', [[0, 0], [PR + 0.2, 0], [PR + 0.35, 1], [T.D - 0.1, 1], [T.D + 0.05, 0]]);

  // ---------------- D: scan + sign in ----------------
  Kit.add('#phone', 'y', [[P.up, 1500], [P.up + 0.45, 0, 'out']]);
  Kit.add('#cam', 'blur', [[T.D, 0], [T.D + 0.4, 7, 'out'], [T.G - 0.2, 7], [T.G - 0.19, 0, 'hold']]);
  Kit.add('#dim', 'opacity', [[0, 0], [T.D, 0], [T.D + 0.4, 0.42, 'out'], [T.G - 0.2, 0.42], [T.G - 0.19, 0, 'hold']]);
  Kit.add('#lblPhone', 'opacity', [[0, 0], [T.D + 0.05, 0], [T.D + 0.2, 1], [T.F - 0.1, 1], [T.F + 0.05, 0]]);
  Kit.add('#brk', 'scale', [[P.brk, 1.3], [P.brk + 0.18, 1, 'out']]);
  Kit.add('#brk', 'opacity', [[0, 0], [P.brk, 0], [P.brk + 0.08, 1]]);
  Kit.pop('#qrpill', P.pill, { dy: 26 });
  Kit.add('#qrpill', 'scale', [[P.tapPill - 0.02, 1], [P.tapPill + 0.06, 0.95], [P.tapPill + 0.16, 1]]);
  Kit.add('#cambox', 'opacity', [[P.page, 1], [P.page + 0.14, 0]]);
  Kit.type('#nm1', P.type0, P.type1);
  Kit.add('#ph1', 'opacity', [[0, 1], [P.type0, 0, 'hold']]);
  Kit.add('#pn1', 'opacity', [[0, 0], [P.phone, 1, 'hold']]);
  Kit.add('#btn1', 'scale', [[P.btn - 0.01, 1], [P.btn + 0.06, 0.96], [P.btn + 0.18, 1]]);
  Kit.add('#okc1', 'scale', [[P.ok, 0.94], [P.ok + 0.22, 1, 'outBack']]);
  Kit.add('#okc1', 'opacity', [[P.ok, 0], [P.ok + 0.1, 1]]);
  cap('k4', 'Scan the poster.', W.scan - 0.04, P.tapPill + 0.04, 'bot');
  cap('k5', 'Tick what you’re wearing.', P.sc1b - 0.04, P.ok - 0.04, 'bot');
  cap('k6', 'Signed in. <span class="g">On the record.</span>', P.ok, T.E - 0.02, 'bot');

  // ---------------- E: next morning ----------------
  Kit.add('#nightfx', 'opacity', [[0, 0], [Q.dark - 0.02, 0], [Q.dark + 0.08, 1], [Q.page, 1], [Q.page + 0.16, 0]]);
  Kit.add('#ring1', 'opacity', [[0, 0], [Q.ring, 0], [Q.ring + 0.1, 1], [Q.sc1a + 0.05, 1], [Q.sc1a + 0.18, 0]]);
  Kit.add('#ring1', 'scale', [[Q.ring, 1.12], [Q.ring + 0.2, 1, 'out']]);
  Kit.add('#btn2', 'scale', [[Q.btn - 0.01, 1], [Q.btn + 0.06, 0.96], [Q.btn + 0.18, 1]]);
  Kit.add('#okc2', 'scale', [[Q.ok, 0.94], [Q.ok + 0.22, 1, 'outBack']]);
  Kit.add('#okc2', 'opacity', [[Q.ok, 0], [Q.ok + 0.1, 1]]);
  Kit.add('#sped', 'opacity', [[0, 0], [P.sc0a - 0.1, 0], [P.sc0a, 1], [P.ok, 1], [P.ok + 0.12, 0], [Q.sc1a - 0.1, 0], [Q.sc1a, 1], [Q.ok, 1], [Q.ok + 0.12, 0]]);
  cap('k7', 'Next morning, it <span class="g">remembers you.</span>', W.next - 0.04, Q.ok - 0.08, 'bot');
  cap('k8', 'Still no pen.', W.still - 0.06, T.F - 0.02, 'bot');

  // ---------------- F: the builder's side ----------------
  var F = T.F;
  whipIn('#deskScene', F); whipOut('#phoneScene', F); whipOut('#deskScene', T.G);
  Kit.add('#lblDesk', 'opacity', [[0, 0], [F + 0.05, 0], [F + 0.2, 1], [T.G - 0.1, 1], [T.G + 0.02, 0]]);
  // three beats on the words: Dave Kettle ringed on "Dee's got a surname now", the pan to Due today on "You can see", the register on "register"
  var RD = W.dees - 0.07, PAN = W.youCan + 0.03, RG = W.register - 0.07;
  Kit.add('#ring2', 'opacity', [[0, 0], [RD, 0], [RD + 0.1, 1], [PAN - 0.1, 1], [PAN, 0], [PAN + 0.3, 0], [PAN + 0.4, 1], [RG - 0.12, 1], [RG, 0]]);
  Kit.add('#ring2', 'scale', [[RD, 1.1], [RD + 0.2, 1, 'out'], [PAN + 0.3, 1.1], [PAN + 0.5, 1, 'out']]);
  Kit.add('#pdf', 'y', [[RG, 1300], [RG + 0.36, 0, 'out']]);
  Kit.add('#pdf', 'rotate', [[RG, 7], [RG + 0.36, 0.6, 'out']]);
  Kit.add('#pdf', 'scale', [[RG + 0.36, 1], [T.G, 1.015, 'linear']]);
  // top slot: answers the book scene's top-slot question and leaves the table and "Due today" uncovered
  cap('k9', '<span class="q">“D—”</span> now has a surname.', W.dees - 0.05, PAN - 0.05, 'top');
  cap('k10', 'Who’s still due.', W.see - 0.04, RG - 0.05, 'bot');
  cap('k11', 'The register, <span class="g">on your own letterhead.</span>', W.prints - 0.05, T.G - 0.02, 'bot');
  var deskK = {
    z: [[F, 1.25], [F + 0.3, 1.25], [F + 0.7, 1.45, 'inOut'], [PAN, 1.45], [PAN + 0.35, 1.42, 'inOut']],
    px: [[F, 0], [F + 0.3, 0], [F + 0.7, 4, 'inOut']],
    py: [[F, 8], [F + 0.3, 8], [F + 0.7, 'tbl', 'inOut'], [PAN, 'tbl'], [PAN + 0.35, 'due', 'inOut']]
  };

  // ---------------- G: end card ----------------
  var G = T.G;
  Kit.add('#endShade', 'opacity', [[G - 0.1, 0], [G + 0.3, 1, 'out']]);
  var BT = W.signUp - 0.05, TG = W.pens - 0.07, PL2 = W.end - 0.12;   // button on "Sign up", the tag on "Pen's", pulses on "zed" and at the end
  Kit.pop('#endLogo', G + 0.12, { dy: 20 });
  Kit.pop('#endHead', W.one - 0.06, { dy: 34 });
  Kit.add('#endBtnIn', 'opacity', [[BT, 0], [BT + 0.08, 1]]);
  Kit.add('#endBtnIn', 'scale', [[BT, 0.7], [BT + 0.28, 1, 'outBack'], [W.zed - 0.15, 1], [W.zed, 1.05, 'out'], [W.zed + 0.2, 1, 'inOut'], [PL2 - 0.15, 1], [PL2, 1.05, 'out'], [PL2 + 0.2, 1, 'inOut']]);
  Kit.add('#tagW', 'opacity', [[TG, 0], [TG + 0.08, 1]]);
  Kit.add('#tagW', 'rotate', [[TG, -32], [TG + 0.43, 9, 'out'], [TG + 0.78, -3, 'inOut'], [TG + 1.13, 1, 'inOut']]);
  Kit.add('#lblEnd', 'opacity', [[0, 0], [G + 0.5, 0], [G + 0.7, 1]]);

  // ---------------- taps + ticks ----------------
  var tapEl = document.createElement('div'); tapEl.className = 'tap'; root.appendChild(tapEl);
  var taps = [[P.tapPill, '#qrpill'], [P.t0, '#c10'], [P.t1, '#c11'], [P.t2, '#c12'], [P.agree, '#c13'], [P.btn, '#btn1'],
    [Q.t0, '#c20'], [Q.t1, '#c21'], [Q.t2, '#c22'], [Q.agree, '#c23'], [Q.btn, '#btn2']];
  var ticks = [['#c10', P.t0], ['#c11', P.t1], ['#c12', P.t2], ['#c13', P.agree], ['#c20', Q.t0], ['#c21', Q.t1], ['#c22', Q.t2], ['#c23', Q.agree]];
  var rings = [['#ring1', '#wb', 10, 0, 99], ['#ring2', '#rowDave', 6, 0, PAN + 0.3], ['#ring2', '#dueH', 8, PAN + 0.3, 99]];
  function rel(el) { var a = el.getBoundingClientRect(), b = root.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; }
  function offTop(el, anc) { var y = 0; while (el && el !== anc) { y += el.offsetTop; el = el.offsetParent; } return y; }
  function scrollFor(sel, pg, pad) { return -(offTop($(sel), $(pg)) - (pad == null ? 10 : pad)); }

  // rain
  var rc = $('#rain').getContext('2d'), RR = rng(7), drops = [];
  for (var i = 0; i < 170; i++) drops.push({ x: RR() * 1400 - 260, y: RR() * 2300, v: 2000 + RR() * 1200, l: 46 + RR() * 100, a: 0.09 + RR() * 0.22, w: 1.3 + RR() * 1.9 });
  function rain(t, k) {
    rc.clearRect(0, 0, 1080, 1920); if (k <= 0) return; rc.lineCap = 'round';
    for (var j = 0; j < drops.length; j++) {
      var d = drops[j], y = ((d.y + d.v * t) % 2300) - 200, x = d.x + y * 0.13;
      rc.strokeStyle = 'rgba(214,228,242,' + (d.a * k).toFixed(3) + ')'; rc.lineWidth = d.w;
      rc.beginPath(); rc.moveTo(x, y); rc.lineTo(x - d.l * 0.13, y - d.l); rc.stroke();
    }
  }

  Kit.clip('#bg', { dir: 'clips/th4', t0: 0, fps: 4.3, ext: '.jpg', frames: 120 });

  Kit.each(function (t) {
    var i, k;
    for (i = 0; i < vis.length; i++) { var on = false; for (k = 0; k < vis[i][1].length; k++) if (t >= vis[i][1][k][0] && t < vis[i][1][k][1]) on = true; $(vis[i][0]).style.display = on ? '' : 'none'; }
    // world camera + string + rain
    var cs = kv(camK.s, t), cx = kv(camK.x, t), cy = kv(camK.y, t);
    $('#cam').style.transform = 'translate(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px) scale(' + cs.toFixed(4) + ')';
    var st = drawString(t);
    var rk = t < T.D ? 1 : t < T.G ? 0.55 : 0.4;
    if ($('#world').style.display !== 'none') rain(t, rk);
    // end-card tag hangs off the string end
    if (t >= G) { var sx = 540 + (st.ex - 540) * cs + cx, sy = 960 + (st.ey - 960) * cs + cy; $('#tagW').style.left = (sx - 6).toFixed(1) + 'px'; $('#tagW').style.top = (sy + 4).toFixed(1) + 'px'; }
    // book camera
    if (t >= T.B - 0.2 && t < T.C + 0.2) $('#bookCam').style.transform = 'translate(' + kv(bookK.x, t).toFixed(2) + 'px,' + kv(bookK.y, t).toFixed(2) + 'px) scale(' + kv(bookK.s, t).toFixed(4) + ')';
    // phone: camera feed shake, page scroll, form state
    if (t >= T.D - 0.1 && t < T.F + 0.2) {
      var sh = Math.sin(t * 9.1) * 5 + Math.sin(t * 15.7) * 3, sv = Math.cos(t * 7.3) * 5 + Math.sin(t * 13.1) * 2;
      $('#camfeed').style.transform = 'translate(' + (-98 + sh).toFixed(1) + 'px,' + (-310 + sv).toFixed(1) + 'px) rotate(' + (Math.sin(t * 5.3) * 0.5 - 1.5).toFixed(2) + 'deg) scale(1.3)';
      var y1 = kv([[P.page, 0], [P.sc0a, 0], [P.sc0b, scrollFor('#who1', '#pv1'), 'inOut'], [P.sc1a, scrollFor('#who1', '#pv1')], [P.sc1b, scrollFor('#ppe1', '#pv1'), 'inOut'], [P.sc2a, scrollFor('#ppe1', '#pv1')], [P.sc2b, scrollFor('#haz1', '#pv1'), 'inOut']], t);
      var enter = kv([[P.page, 120], [P.page + 0.2, 0, 'out']], t);
      $('#pv1').style.transform = 'scale(' + PS + ') translateY(' + (y1 + enter).toFixed(2) + 'px)';
      var y3 = kv([[Q.page, 0], [Q.sc0 + 0.18, scrollFor('#who2', '#pv3'), 'inOut'], [Q.sc1a, scrollFor('#who2', '#pv3')], [Q.sc1b, scrollFor('#ppe2', '#pv3'), 'inOut'], [Q.sc2a, scrollFor('#ppe2', '#pv3')], [Q.sc2b, scrollFor('#haz2', '#pv3'), 'inOut']], t);
      $('#pv3').style.transform = 'scale(' + PS + ') translateY(' + y3.toFixed(2) + 'px)';
      $('#co1').textContent = t < P.co ? 'On my own' : 'Demo Framing Ltd';
      $('#hint1').textContent = t < P.type1 ? 'Put your name down to sign in.' : t < P.phone ? 'Add a phone number or an email so the site can reach you.' : 'Tick every line to sign in.';
      $('#hint1').style.visibility = t < P.agree ? 'visible' : 'hidden'; $('#btn1').classList.toggle('dis', t < P.agree);
      $('#hint2').style.visibility = t < Q.agree ? 'visible' : 'hidden'; $('#btn2').classList.toggle('dis', t < Q.agree);
      $('#clock').textContent = t < Q.dark + 0.1 ? '7:12' : '6:58';
      for (i = 0; i < ticks.length; i++) $(ticks[i][0]).classList.toggle('on', t >= ticks[i][1]);
    }
    // desk camera
    if (t >= F - 0.2 && t < G + 0.2) {
      // 'tbl' keeps the day pills ("Thu, 29 Oct · 6") in view above the table and pushes "Due today" under the caption until its own beat
      var anchors = { tbl: offTop($('#signedCard'), $('#dpg')) - 76, due: offTop($('#dueCard'), $('#dpg')) - 150 };
      var pyK = deskK.py.map(function (kk) { return [kk[0], typeof kk[1] === 'string' ? anchors[kk[1]] : kk[1], kk[2]]; });
      var z = kv(deskK.z, t), S = 1.29 * z, px = kv(deskK.px, t), py = kv(pyK, t);
      $('#dpg').style.transform = 'translate(' + (-px * S).toFixed(2) + 'px,' + (-py * S).toFixed(2) + 'px) scale(' + S.toFixed(4) + ')';
    }
    // rings follow their targets
    for (i = 0; i < rings.length; i++) {
      var rg = rings[i]; if (t < rg[3] || t >= rg[4]) continue;
      var tg = $(rg[1]); if (!tg || !tg.offsetParent) continue;
      var b = rel(tg), p = rg[2], R2 = $(rg[0]);
      var rx0 = Math.max(b.x - p, 36), rx1 = Math.min(b.x + b.w + p, 1044); R2.style.left = rx0 + 'px'; R2.style.top = (b.y - p) + 'px'; R2.style.width = (rx1 - rx0) + 'px'; R2.style.height = (b.h + 2 * p) + 'px';
    }
    // tap ripple
    var tp = null; for (i = 0; i < taps.length; i++) if (t >= taps[i][0] && t < taps[i][0] + 0.28) tp = taps[i];
    if (tp && $(tp[1]).offsetParent) {
      var bb = rel($(tp[1])), pr = (t - tp[0]) / 0.28, tx = tp[1].indexOf('#c') === 0 ? bb.x + 64 : bb.x + bb.w / 2;
      tapEl.style.display = 'block'; tapEl.style.left = tx + 'px'; tapEl.style.top = (bb.y + bb.h / 2) + 'px';
      tapEl.style.opacity = (1 - pr * pr).toFixed(3); tapEl.style.transform = 'scale(' + (0.65 + 0.5 * EZ.out(pr)).toFixed(3) + ')';
    } else tapEl.style.display = 'none';
  });

  Kit.ready({ duration: T.END, fonts: ['800 60px Manrope', '600 20px Manrope', '500 20px Manrope', '700 20px Manrope', '400 40px Kalam', '700 40px Kalam', '400 40px "Permanent Marker"', '500 20px "JetBrains Mono"', '500 20px Inter', '800 20px Inter'] });
})();
