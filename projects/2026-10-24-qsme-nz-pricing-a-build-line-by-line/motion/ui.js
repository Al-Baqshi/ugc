/* Builders for the illustrative QSME screens and the bench stand-in. Shared by the 16:9 master and the 9:16 cuts.
   Legible UI wording is verbatim from the truth sheet ([V] in comments). Pocket names, lines, quantities, rates,
   section names, page numbers and contacts are DEMO DATA. Unknown UI wording renders as skeleton bars. */
(function () {
  'use strict';
  var I = {
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="#7C3AED"><path d="M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8z"/><path d="M19 15l.9 2.4 2.1.6-2.1.7L19 21l-.9-2.3-2.1-.7 2.1-.6z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    cols: '<svg viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></svg>',
    tmpl: '<svg viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>'
  };
  var cursorSVG = '<svg viewBox="0 0 34 44"><path d="M3 2 L3 34 L11 27 L17 41 L23 38 L17 25 L28 25 Z" fill="#0F172A" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>';

  // a house elevation in thin drafting lines (generic, no title block)
  var houseArt = '<svg viewBox="0 0 470 300" fill="none" stroke="#64748B" stroke-width="1.6">' +
    '<path d="M10 270 H460"/><path d="M40 270 V150 L190 60 L340 150 V270"/><path d="M340 170 H440 V270"/><path d="M330 166 L445 166"/>' +
    '<rect x="70" y="180" width="60" height="50"/><path d="M100 180 V230"/><rect x="160" y="190" width="44" height="80"/><rect x="240" y="180" width="70" height="50"/><path d="M275 180 V230"/>' +
    '<rect x="365" y="190" width="50" height="40"/><path d="M190 60 V20 M184 26 L190 20 L196 26" stroke-width="1"/><path d="M10 288 H460" stroke-dasharray="4 5" stroke-width="1"/>' +
    '<path d="M40 280 V296 M340 280 V296 M440 280 V296" stroke-width="1"/><text x="160" y="299" fill="#94A3B8" stroke="none" font-family="JetBrains Mono" font-size="13">NORTH ELEVATION 1:100</text></svg>';

  var pipeArt = '<svg viewBox="0 0 680 340" fill="none" stroke-width="2.2">' +
    '<rect x="150" y="40" width="380" height="230" stroke="#94A3B8" stroke-width="1.6"/><path d="M150 140 H530 M340 40 V270" stroke="#CBD5E1" stroke-width="1"/>' +
    '<path d="M40 310 H600" stroke="#94A3B8" stroke-dasharray="10 6"/>' +
    '<path d="M190 270 V300 H600" stroke="#16A34A" stroke-dasharray="14 7"/><path d="M470 270 V292 H600" stroke="#2563EB" stroke-dasharray="14 7"/>' +
    '<path d="M150 90 H110 V300" stroke="#16A34A" stroke-dasharray="14 7"/><circle cx="110" cy="90" r="9" stroke="#16A34A"/><circle cx="190" cy="300" r="9" stroke="#16A34A"/><circle cx="470" cy="292" r="9" stroke="#2563EB"/>' +
    '<text x="560" y="330" fill="#94A3B8" stroke="none" font-family="JetBrains Mono" font-size="14">TO COUNCIL MAIN</text></svg>';

  var UI = {
    I: I,
    cursor: function (id) { return '<div id="' + id + '" class="cur">' + cursorSVG + '</div>'; },
    ripple: function (id) { return '<div id="' + id + '" class="ripple"></div>'; },
    marker: function (id, color) { return '<svg viewBox="0 0 100 16" preserveAspectRatio="none"><path id="' + id + '" d="M2 10 C 30 4, 64 14, 98 7" fill="none" stroke="' + (color || '#E0302A') + '" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'; },

    pack: function (id, x, y, rot) {
      return '<div id="' + id + '" class="pack" style="left:' + x + 'px;top:' + y + 'px;transform:rotate(' + rot + 'deg)"><div class="cv">' +
        '<div class="dp">DEMO PACK</div><div class="s1">Consent drawings &amp; specification</div><div class="s2">Sheets 1–48 · 3-bedroom house · Christchurch</div>' +
        '<div class="art">' + houseArt + '</div><div class="stamp">SAMPLE · NOT FOR CONSTRUCTION</div></div>' +
        '<div class="clip" style="left:365px;top:-14px"></div></div>';
    },
    xls: function (id, x, y, rot, circleId) {
      var rows = [['Foundations', 'Digger and operator', 'hr', '16', '145'], ['Foundations', 'Hardfill AP40, delivered', 'm3', '22', '78'], ['Foundations', '25 MPa concrete, pumped', 'm3', '24', '298'],
        ['Foundations', '665 mesh and chairs', 'm2', '142', '14.5'], ['Foundations', 'Place and finish', 'hr', '32', '68'], ['Framing', '90×45 SG8 H1.2 framing', 'm', '1280', '6.9'],
        ['Framing', 'Carpenters, frame and stand', 'hr', '190', '72'], ['Framing', 'Trusses at 900 crs', 'm2', '176', '52'], ['Framing', 'Stand and brace trusses', 'hr', '48', '72'],
        ['Roofing', 'Long-run corrugate 0.40', 'm2', '176', '46'], ['Roofing', 'Roofers, lay and flash', 'hr', '60', '78']];
      var h = '<div id="' + id + '" class="xls" style="left:' + x + 'px;top:' + y + 'px;transform:rotate(' + rot + 'deg)">' +
        '<div class="h">Build costs — <span style="position:relative;display:inline-block">2024' +
        '<svg style="position:absolute;left:-22px;top:-16px;width:118px;height:70px;overflow:visible" viewBox="0 0 118 70"><path id="' + circleId + '" d="M60 6 C 20 4, 2 22, 8 40 C 14 60, 70 66, 100 52 C 122 40, 112 12, 78 6 C 66 4, 56 6, 50 9" fill="none" stroke="#C81E1E" stroke-width="5" stroke-linecap="round"/></svg></span></div>' +
        '<div class="fn">build-costs-2024.xlsx · Sheet1</div><table><tr><th>Pocket</th><th>Item</th><th>Unit</th><th>Qty</th><th>Rate</th></tr>';
      rows.forEach(function (r) { h += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td class="n">' + r[3] + '</td><td class="n">' + r[4] + '</td></tr>'; });
      return h + '</table></div>';
    },
    dsheet: function (id, x, y, rot, n) {
      return '<div id="' + id + '" class="dsheet" style="left:' + x + 'px;top:' + y + 'px;transform:rotate(' + rot + 'deg)"><div class="dp">DRAINAGE</div>' +
        '<div class="s2">Sheet D' + n + ' of D3 · demo · from the designer</div>' + pipeArt + '</div>';
    },
    // the plans-read notification [V]: "Your plans have been read — N sections ready to explore. Heads up: no bracing, drainage found in this pack."
    note: function (id, mkId, cls) {
      return '<div id="' + id + '" class="note ' + (cls || '') + '"><div class="ti">' + I.bell + '</div><div>' +
        '<div class="tx">Your plans have been read — 11 sections ready to explore.<span class="big">Heads up: <span class="mkw">no drainage' + UI.marker(mkId) + '</span> found in this pack.</span></div></div></div>';
    },

    // ---- SOQ sheet. cols: array of keys among ref, desc, unit, qty, rate, tot, x (Waste %), y (Qty + waste)
    soqHeader: function (p, opts) {
      opts = opts || {};
      return '<div class="bar"><h1>SOQ</h1><div class="seg"><span class="on">Sheet</span><span>Classic</span></div><div class="sp"></div>' +
        '<div id="' + p + 'add" class="btn g" style="width:218px;justify-content:center">' + I.plus + 'Add a pocket</div></div>' +
        '<div class="tools"><div class="seg"><span>Draft</span><span>Active</span></div><div class="sp" style="flex:1"></div>' +
        '<div id="' + p + 'ai" class="btn" style="width:104px;justify-content:center">' + '<span style="width:20px;height:20px;display:inline-block">' + I.spark + '</span>AI ▾</div>' +
        '<div id="' + p + 'imp" class="btn" style="width:132px;justify-content:center">' + I.up + 'Import</div>' +
        '<div id="' + p + 'tpl" class="btn" style="width:162px;justify-content:center">' + I.tmpl + 'Templates</div>' +
        '<div id="' + p + 'col" class="btn" style="width:140px;justify-content:center">' + I.cols + 'Columns</div>' +
        '<div id="' + p + 'act" class="btn gl" style="width:214px;justify-content:center">Activate all drafts</div></div>';
    },
    soqRows: function (p, cols, rows) {
      var lab = { ref: 'Ref', desc: 'Description', unit: 'Unit', qty: 'Qty', rate: 'Rate', tot: 'Total', x: 'Waste %', y: 'Qty + waste' };
      var h = '<div class="row hd">' + cols.map(function (c) { return '<div class="c-' + c + '">' + lab[c] + '</div>'; }).join('') + '</div>';
      rows.forEach(function (r) {
        var id = r.id ? ' id="' + p + r.id + '"' : '';
        if (r.t === 'pk') {
          var bd = r.badge === 'ac' ? '<span class="badge ac">Active</span>' : r.badge === 'ai' ? '<span class="badge ai">AI draft</span>' : '<span class="badge dr">Draft</span>';
          var extra = (r.keep ? '<span id="' + p + r.id + 'keep" class="keep" style="position:absolute;left:560px;top:11px">Keep</span><span id="' + p + r.id + 'bin" class="bin" style="position:absolute;left:650px;top:11px">' + I.trash + '</span>' : '');
          h += '<div' + id + ' class="row pk' + (r.badge === 'ac' ? ' act' : r.badge === 'ai' ? ' ai' : '') + '">' +
            '<div class="c-desc" style="flex:1;padding-left:18px">' + r.name.toUpperCase() + '<span' + (r.id ? ' id="' + p + r.id + 'bd"' : '') + '>' + bd + '</span>' + extra +
            (r.meta ? '<span class="meta">' + r.meta + '</span>' : '') + '</div>' +
            cols.slice(cols.indexOf('tot')).map(function (c) { return c === 'tot' ? '<div class="c-tot"' + (r.id ? ' id="' + p + r.id + 'tot"' : '') + '>' + (r.tot || '') + '</div>' : '<div class="c-' + c + '"></div>'; }).join('') + '</div>';
        } else if (r.t === 'jb') {
          h += '<div' + id + ' class="row jb"><div class="c-desc" style="flex:1">' + r.name + (r.meta ? '<span class="meta" style="font:500 16px/1 Inter;color:#94A3B8;margin-left:12px">' + r.meta + '</span>' : '') + '</div>' +
            cols.slice(cols.indexOf('tot')).map(function (c) { return c === 'tot' ? '<div class="c-tot"' + (r.id ? ' id="' + p + r.id + 'tot"' : '') + '>' + (r.tot || '') + '</div>' : '<div class="c-' + c + '"></div>'; }).join('') + '</div>';
        } else {
          h += '<div' + id + ' class="row ln">' + cols.map(function (c) {
            var v = r[c] == null ? '' : r[c];
            var cid = r.id ? ' id="' + p + r.id + c + '"' : '';
            return '<div class="c-' + c + '"' + cid + '>' + v + '</div>';
          }).join('') + '</div>';
        }
      });
      return h;
    },
    money: function (v, dp) { var s = (Math.round(v * (dp ? 100 : 1)) / (dp ? 100 : 1)).toLocaleString('en-NZ', { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 }); return '$' + s; }
  };
  window.UI = UI;
})();
