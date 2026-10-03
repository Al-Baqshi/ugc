// UGC Studio client: local times, theme toggle, project tabs, media link refresh, and search.
(function () {
  'use strict';
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  // ------------------------------------------------------------ local times
  // Day-first, like the server-rendered dates; in the viewer's own time zone.
  try {
    var dt = new Intl.DateTimeFormat('en-NZ', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    $$('time[data-local]').forEach(function (t) {
      var d = new Date(t.getAttribute('datetime'));
      if (!isNaN(d)) { t.textContent = dt.format(d); t.title = d.toString(); }
    });
    var dd = new Intl.DateTimeFormat('en-NZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $$('time[data-local-date]').forEach(function (t) { t.textContent = dd.format(new Date()); });
  } catch (e) {}

  // ------------------------------------------------------------------ theme
  var root = document.documentElement;
  var themeLabel = $('[data-theme-label]');
  function theme() { return root.getAttribute('data-theme') || 'system'; }
  function paintLabel() { if (themeLabel) themeLabel.textContent = 'Theme: ' + theme(); }
  function paintBar() {
    // The browser bar follows a forced theme, not just the system one.
    var t = theme();
    $$('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', t === 'dark' ? '#14120f' : t === 'light' ? '#f4f0e6' : m.getAttribute('data-default') || m.getAttribute('content'));
    });
  }
  paintLabel();
  var toggle = $('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var order = ['system', 'light', 'dark'];
      var next = order[(order.indexOf(theme()) + 1) % order.length];
      if (next === 'system') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', next);
      try {
        if (next === 'system') localStorage.removeItem('studio-theme');
        else localStorage.setItem('studio-theme', next);
      } catch (e) {}
      paintLabel();
      paintBar();
    });
  }

  // ------------------------------------------------------------------ board
  // When the board scrolls sideways (phones, tablets), open it on the lane named
  // in the URL (#col-agreed) or else on the first lane that has cards.
  var board = $('.board');
  function showLane(fromHash) {
    if (!board || board.scrollWidth <= board.clientWidth + 1) return;
    var lane = fromHash && location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (!lane || !board.contains(lane)) {
      if (fromHash) return;
      lane = $('.col:not(.is-empty)', board);
      if (!lane || lane.getBoundingClientRect().right <= board.getBoundingClientRect().right) return;
    }
    var pad = parseFloat(getComputedStyle(board).paddingLeft) || 0;
    board.scrollLeft += lane.getBoundingClientRect().left - board.getBoundingClientRect().left - pad;
  }
  if (board) {
    showLane(!!location.hash);
    window.addEventListener('hashchange', function () { showLane(true); });
  }

  // ------------------------------------------------------------------- tabs
  var tablist = $('[role="tablist"]');
  if (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      try {
        var u = new URL(location.href);
        u.searchParams.set('tab', tab.getAttribute('data-tab'));
        history.replaceState(null, '', u.pathname + u.search + '#files');
      } catch (e) {}
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        select(t, false);
      });
      t.addEventListener('keydown', function (e) {
        var j = null;
        if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  }

  // ------------------------------------------------------------------ media
  // On the deploy, media comes from signed bucket links that last about an
  // hour, and a player keeps re-using the link it was redirected to. On a page
  // left open longer, the next seek into unbuffered video fails (403). Ask
  // /media again (a fresh link) and carry on from the same moment. At most one
  // retry a minute per player, so a file that is really gone stays failed.
  $$('video, audio').forEach(function (m) {
    var last = 0;
    var playing = false;
    m.addEventListener('playing', function () { playing = true; });
    m.addEventListener('pause', function () { playing = false; });
    m.addEventListener('error', function () {
      if (!m.error || m.error.code === 1 || !m.getAttribute('src')) return; // 1: aborted by the page
      if (Date.now() - last < 60000) return;
      last = Date.now();
      var at = m.currentTime || 0;
      var resume = playing;
      m.addEventListener('loadedmetadata', function once() {
        m.removeEventListener('loadedmetadata', once);
        if (at > 0) { try { m.currentTime = at; } catch (e) {} }
        if (resume) { var p = m.play(); if (p && typeof p.catch === 'function') p.catch(function () {}); }
      });
      m.load();
    });
  });

  // ----------------------------------------------------------------- search
  var dialog = $('#search');
  var input = $('#search-input');
  var list = $('#search-results');
  if (!dialog || !input || !list) return;

  var index = null;
  var loading = null;
  var results = [];
  var active = -1;
  var QUICK = [
    { k: 'Page', t: 'Ideas board', u: '/ideas', v: '' },
    { k: 'Page', t: 'Ventures', u: '/ventures', v: '' },
    { k: 'Page', t: 'Projects', u: '/projects', v: '' },
    { k: 'Page', t: 'Videos', u: '/videos', v: '' },
    { k: 'Page', t: 'Research', u: '/research', v: '' },
    { k: 'Page', t: 'Log', u: '/log', v: '' },
    { k: 'Page', t: 'Learnings', u: '/learnings', v: '' },
    { k: 'Page', t: 'Playbook', u: '/playbook', v: '' }
  ];

  function load() {
    if (index) return Promise.resolve(index);
    if (!loading) {
      loading = fetch('/search.json', { credentials: 'same-origin', headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (data) {
          index = data.map(function (d) {
            d.tl = plainQuotes(d.t || '').toLowerCase();
            d.vl = plainQuotes(d.v || '').toLowerCase();
            d.xl = plainQuotes(d.x || '').toLowerCase();
            return d;
          });
          return index;
        })
        .catch(function (e) { loading = null; throw e; });
    }
    return loading;
  }

  // Typographer's quotes in the content should still match a typed ' or ".
  function plainQuotes(s) { return s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"'); }
  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['\u2018\u2019]").replace(/"/g, '["\u201c\u201d]');
  }

  function highlight(el, text, terms) {
    if (!terms.length) { el.textContent = text; return; }
    var re = new RegExp('(' + terms.map(escapeRe).join('|') + ')', 'ig');
    var last = 0;
    text.replace(re, function (m, _g, off) {
      if (off > last) el.appendChild(document.createTextNode(text.slice(last, off)));
      var mark = document.createElement('mark');
      mark.textContent = m;
      el.appendChild(mark);
      last = off + m.length;
      return m;
    });
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  function snippet(d, terms) {
    if (!d.x) return '';
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = d.xl.indexOf(terms[i]);
      if (p !== -1 && (pos === -1 || p < pos)) pos = p;
    }
    if (pos === -1) return d.x.slice(0, 140) + (d.x.length > 140 ? '…' : '');
    var start = Math.max(0, pos - 50);
    var end = Math.min(d.x.length, pos + 110);
    return (start ? '…' : '') + d.x.slice(start, end).trim() + (end < d.x.length ? '…' : '');
  }

  function query(q) {
    var terms = plainQuotes(q).toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !index) return { terms: [], items: QUICK };
    var scored = [];
    index.forEach(function (d) {
      var s = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (d.tl.indexOf(t) === 0) s += 8;
        else if (d.tl.indexOf(t) !== -1) s += 5;
        else if (d.vl.indexOf(t) !== -1) s += 2;
        else if (d.xl.indexOf(t) !== -1) s += 1;
        else return;
      }
      if (d.k === 'Idea') s += 0.5;
      scored.push({ d: d, s: s });
    });
    scored.sort(function (a, b) { return b.s - a.s || a.d.t.localeCompare(b.d.t); });
    return { terms: terms, items: scored.slice(0, 20).map(function (x) { return x.d; }) };
  }

  function setActive(i) {
    var opts = $$('[role="option"]', list);
    if (!opts.length) { active = -1; input.removeAttribute('aria-activedescendant'); return; }
    active = (i + opts.length) % opts.length;
    opts.forEach(function (o, k) { o.setAttribute('aria-selected', k === active ? 'true' : 'false'); });
    input.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  }

  function render(q) {
    var r = query(q);
    results = r.items;
    list.textContent = '';
    if (q.trim() && !index) {
      var li0 = document.createElement('li');
      li0.className = 'search-empty';
      li0.textContent = loading ? 'Loading…' : 'Search is unavailable right now.';
      list.appendChild(li0);
      return;
    }
    if (!results.length) {
      var li = document.createElement('li');
      li.className = 'search-empty';
      li.textContent = 'Nothing matches “' + q.trim() + '”.';
      list.appendChild(li);
      active = -1;
      return;
    }
    results.forEach(function (d, i) {
      var li = document.createElement('li');
      li.id = 'sr-' + i;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      var a = document.createElement('a');
      a.href = d.u;
      a.tabIndex = -1;
      var top = document.createElement('span');
      top.className = 'sr-top';
      var kind = document.createElement('span');
      kind.className = 'sr-kind';
      kind.textContent = d.k;
      var title = document.createElement('span');
      title.className = 'sr-title';
      highlight(title, d.t, r.terms);
      top.appendChild(title);
      top.appendChild(kind);
      a.appendChild(top);
      if (d.v) {
        var v = document.createElement('span');
        v.className = 'sr-sub';
        v.textContent = d.v;
        a.appendChild(v);
      }
      if (r.terms.length) {
        var sn = document.createElement('span');
        sn.className = 'sr-snip';
        highlight(sn, snippet(d, r.terms), r.terms);
        a.appendChild(sn);
      }
      li.appendChild(a);
      li.addEventListener('mousemove', function () { if (active !== i) setActive(i); });
      list.appendChild(li);
    });
    setActive(0);
  }

  function open() {
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    input.value = '';
    render('');
    input.focus();
    load().then(function () { render(input.value); }).catch(function () { render(input.value); });
  }

  function close() {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  }

  $$('[data-search-open]').forEach(function (b) { b.addEventListener('click', open); });
  $$('[data-search-close]').forEach(function (b) { b.addEventListener('click', close); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
  input.addEventListener('input', function () { render(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter') {
      var opts = $$('[role="option"] a', list);
      var target = opts[active] || opts[0];
      if (target) { e.preventDefault(); location.href = target.getAttribute('href'); }
    }
  });

  document.addEventListener('keydown', function (e) {
    var el = document.activeElement;
    var typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); open(); }
    else if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); dialog.open ? close() : open(); }
  });
})();
