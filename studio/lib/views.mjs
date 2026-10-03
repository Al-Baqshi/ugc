// Server-rendered pages. Every interpolation goes through the escaping `html`
// tag; only already-sanitized markdown HTML is passed through with raw().

import { html, raw, fmt, hueClass, prettyDate, prettyDateTimeUTC, numberWord, plural, truncate, humanize, smartQuotes } from './util.mjs';
import { STATUS_ORDER } from './content.mjs';

// ------------------------------------------------------------------ icons

const svg = (body, cls = 'i', size = 18, vb = 20) =>
  raw(
    `<svg class="${cls}" viewBox="0 0 ${vb} ${vb}" width="${size}" height="${size}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`,
  );

const ICON = {
  search: svg('<circle cx="8.5" cy="8.5" r="5.75"/><path d="m13 13 4.25 4.25"/>'),
  ext: svg('<path d="M6 3.5h6.5V10M12.25 3.75 4 12"/>', 'i i-ext', 13, 16),
  arrow: svg('<path d="M3 8h10M9 4l4 4-4 4"/>', 'i i-arrow', 14, 16),
  back: svg('<path d="M13 8H3M7 4 3 8l4 4"/>', 'i i-arrow', 14, 16),
  board: svg('<rect x="3" y="3.5" width="4" height="13" rx="1"/><rect x="8.5" y="3.5" width="4" height="9" rx="1"/><rect x="14" y="3.5" width="3" height="6" rx="1"/>', 'i', 16),
  list: svg('<path d="M3 5h14M3 10h14M3 15h14"/>', 'i', 16),
  theme: svg('<circle cx="10" cy="10" r="6.25"/><path d="M10 3.75v12.5" /><path d="M10 3.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" stroke="none"/>', 'i', 16),
  doc: svg('<path d="M5.5 2.75h6l3.5 3.5v11h-9.5z"/><path d="M11.25 2.75v3.75H15"/>', 'i', 16),
};

// ----------------------------------------------------------------- pieces

const NAV = [
  ['/ideas', 'Ideas', 'ideas'],
  ['/ventures', 'Ventures', 'ventures'],
  ['/projects', 'Projects', 'projects'],
  ['/research', 'Research', 'research'],
  ['/log', 'Log', 'log'],
  ['/learnings', 'Learnings', 'learnings'],
  ['/playbook', 'Playbook', 'playbook'],
];

export function statusLabel(s) {
  if (!s) return 'No status';
  if (s === 'in production') return 'In production';
  return humanize(s);
}

function statusClass(s) {
  return STATUS_ORDER.includes(s) ? `st-${s.replace(/\s+/g, '-')}` : 'st-other';
}

export function colId(s) {
  return `col-${String(s).replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
}

function pill(status) {
  return html`<span class="pill ${statusClass(status)}">${statusLabel(status)}</span>`;
}

const BAND_LABEL = { strong: 'Strong', ok: 'Okay', weak: 'Weak', none: 'Not scored' };

function fmtScore(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function scoreBadge(idea) {
  if (idea.score === null || idea.score === undefined)
    return html`<span class="score score--none" title="Not scored yet"><span class="vh">Not scored</span><span aria-hidden="true">·</span></span>`;
  return html`<span class="score score--${idea.band}" title="Idea score ${fmtScore(idea.score)}/20, ${BAND_LABEL[idea.band].toLowerCase()}"><span class="vh">Score </span>${fmtScore(idea.score)}</span>`;
}

function ventureLabel(snap, name) {
  return snap.ventureMap.get(name)?.label || name || 'No venture';
}

function vtag(snap, name, { link = false } = {}) {
  const inner = html`<i class="dot ${hueClass(name)}" aria-hidden="true"></i>${ventureLabel(snap, name)}`;
  if (link && name) return html`<a class="vtag" href="/ventures/${encodeURIComponent(name)}">${inner}</a>`;
  return html`<span class="vtag">${inner}</span>`;
}

function dateTag(d) {
  return d ? html`<time datetime="${d}">${prettyDate(d)}</time>` : '';
}

function crumbs(items) {
  return html`<nav class="crumbs" aria-label="Breadcrumb">${items.map(
    ([href, label], i) => html`${i ? html`<span class="crumb-sep" aria-hidden="true">/</span>` : ''}<a href="${href}">${label}</a>`,
  )}</nav>`;
}

function pageHead({ eyebrow, title, dek, extra }) {
  return html`<header class="page-head">
    ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1 class="display">${title}</h1>
    ${dek ? html`<p class="dek">${dek}</p>` : ''}
    ${extra || ''}
  </header>`;
}

function secTitle(title, link) {
  return html`<div class="sec-title"><h2>${title}</h2>${link ? html`<a class="sec-link" href="${link[0]}">${link[1]} ${ICON.arrow}</a>` : ''}</div>`;
}

function prose(htmlStr, cls = '') {
  return html`<div class="prose ${cls}">${raw(htmlStr || '')}</div>`;
}

function warningNote(text) {
  return text ? html`<div class="notice" role="note"><strong>Heads up.</strong> ${text}</div>` : '';
}

const hookText = (idea, n) => smartQuotes(truncate(idea.hook, n));

function ideaRow(snap, idea, { showStatus = true } = {}) {
  const meta = [idea.format, idea.platform].filter(Boolean)[0];
  return html`<li><a class="row-link" href="${idea.url}">
    ${scoreBadge(idea)}
    <span class="row-main">
      <span class="row-title">${idea.title}</span>
      ${idea.hook ? html`<span class="row-hook">“${hookText(idea, 110)}”</span>` : ''}
      <span class="row-meta">${vtag(snap, idea.venture)}${meta ? html`<span class="row-sep" aria-hidden="true"></span><span>${truncate(meta, 60)}</span>` : ''}</span>
    </span>
    ${showStatus ? pill(idea.status) : ''}
  </a></li>`;
}

function ideaCard(snap, idea) {
  return html`<li><a class="card" href="${idea.url}">
    <span class="card-top">${vtag(snap, idea.venture)}${scoreBadge(idea)}</span>
    <span class="card-title">${idea.title}</span>
    ${idea.hook ? html`<span class="card-hook">“${hookText(idea, 90)}”</span>` : ''}
    ${idea.platform ? html`<span class="card-line"><span class="card-k">On</span>${truncate(idea.platform, 70)}</span>` : ''}
    ${idea.warning ? html`<span class="card-warn">Frontmatter needs fixing</span>` : ''}
  </a></li>`;
}

function emptyState(title, body) {
  return html`<div class="empty"><p class="empty-title">${title}</p>${body ? html`<p class="empty-body">${body}</p>` : ''}</div>`;
}

function avg(nums) {
  const xs = nums.filter((n) => typeof n === 'number');
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

function bytes(n) {
  if (!n) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

const byScore = (a, b) => (b.score ?? -1) - (a.score ?? -1) || a.title.localeCompare(b.title);
const touched = (i) => i.updated || i.created || '';

// ----------------------------------------------------------------- layout

/** Footer line: when the deployed copy was published, else the newest content change. */
function freshness(ctx) {
  const stamp = (label, d) => html`${label} <time datetime="${d.toISOString()}" data-local>${prettyDateTimeUTC(d)}</time>`;
  if (ctx.synced) return stamp('Content synced', ctx.synced);
  if (ctx.updated) return stamp('Content updated', ctx.updated);
  return '';
}

export function layout(ctx, { title, active = '', body, wide = false }) {
  const v = ctx.assetVersion;
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f4f0e6" data-default="#f4f0e6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14120f" data-default="#14120f" media="(prefers-color-scheme: dark)">
<title>${title ? `${title} · UGC Studio` : 'UGC Studio'}</title>
<link rel="icon" href="/assets/favicon.svg?v=${v}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:opsz,wght@14..32,400..700&display=swap">
<link rel="stylesheet" href="/assets/styles.css?v=${v}">
<script src="/assets/theme.js?v=${v}"></script>
<script src="/assets/app.js?v=${v}" defer></script>
</head>
<body${wide ? raw(' class="is-wide"') : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <div class="masthead-inner">
    <a class="wordmark" href="/" aria-label="UGC Studio, home"><span class="rec" aria-hidden="true"></span><span class="wm-a">UGC</span><span class="wm-b">Studio</span></a>
    <nav class="nav" aria-label="Sections">
      ${NAV.map(([href, label, key]) => html`<a href="${href}"${active === key ? raw(' aria-current="page"') : ''}>${label}</a>`)}
    </nav>
    <button class="search-trigger" type="button" data-search-open aria-haspopup="dialog" aria-keyshortcuts="/" aria-label="Search">
      ${ICON.search}<span class="search-trigger-label">Search</span><kbd>/</kbd>
    </button>
  </div>
</header>
<main id="main" class="main${wide ? ' main--wide' : ''}" tabindex="-1">
${body}
</main>
<footer class="footer">
  <div class="footer-inner">
    <p>${freshness(ctx)}${ctx.dev ? html`<span class="footer-dev">${freshness(ctx) ? ' · ' : ''}Dev mode, reading live from disk</span>` : ''}</p>
    <p class="footer-actions">
      <a href="/log">Log</a>
      <a href="/learnings">Learnings</a>
      <a href="/playbook">Playbook</a>
      <a href="/api/ideas">JSON API</a>
      <button type="button" class="theme-toggle" data-theme-toggle>${ICON.theme}<span data-theme-label>Theme: system</span></button>
    </p>
  </div>
</footer>
<dialog class="search" id="search" aria-label="Search the studio">
  <div class="search-box">
    ${ICON.search}
    <input type="search" id="search-input" placeholder="Search ideas, ventures, research, logs" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="search-results" aria-autocomplete="list">
    <button type="button" class="search-close" data-search-close aria-label="Close search"><kbd>esc</kbd></button>
  </div>
  <ul id="search-results" class="search-results" role="listbox" aria-label="Results"></ul>
  <p class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>↵</kbd> to open</span></p>
</dialog>
</body>
</html>`;
}

// ------------------------------------------------------------------- home

export function homePage(ctx, snap) {
  const ideas = snap.ideas;
  const live = ideas.filter((i) => i.status !== 'killed');
  const counts = Object.assign(Object.create(null), Object.fromEntries(STATUS_ORDER.map((s) => [s, 0])));
  for (const i of ideas) counts[i.status] = (counts[i.status] || 0) + 1;
  const stages = [...STATUS_ORDER.slice(0, -1), ...Object.keys(counts).filter((s) => !STATUS_ORDER.includes(s)), 'killed'];

  const ventureNames = snap.ventures.map((v) => v.name);
  const next = ideas
    .filter((i) => i.status === 'in production' || i.status === 'agreed')
    .sort((a, b) => (a.status === b.status ? byScore(a, b) : a.status === 'in production' ? -1 : 1));
  const waiting = ideas.filter((i) => i.status === 'scored' || i.status === 'raw').sort(byScore);
  const nextUp = next.length ? next : waiting.slice(0, 3);
  const shown = new Set(nextUp.map((i) => i.url));
  const recent = ideas
    .filter((i) => !shown.has(i.url))
    .sort((a, b) => touched(b).localeCompare(touched(a)) || byScore(a, b))
    .slice(0, 5);
  const asks = snap.ventures.filter((v) => v.openQuestions > 0);
  const latestLog = snap.logs[0];
  const top = waiting[0];

  const h1 =
    ideas.length === 0
      ? 'A quiet studio.'
      : `${numberWord(ideas.length)} ${ideas.length === 1 ? 'idea' : 'ideas'}, ${numberWord(ventureNames.length).toLowerCase()} ${ventureNames.length === 1 ? 'venture' : 'ventures'}.`;

  const prodBits = [];
  if (counts['in production']) prodBits.push(`${numberWord(counts['in production'])} in production`);
  if (counts.agreed) prodBits.push(`${numberWord(counts.agreed).toLowerCase()} agreed`);
  if (counts.posted) prodBits.push(`${numberWord(counts.posted).toLowerCase()} posted`);
  const dek =
    ideas.length === 0
      ? html`Drop the first idea in <code>ideas/INBOX.md</code> and give it a card.`
      : html`${prodBits.length ? `${prodBits.join(', ')}.` : 'Nothing in production yet.'}
         ${top && top.score !== null ? html`Strongest idea waiting for a yes: <a href="${top.url}"><em>${top.title}</em></a> (${fmtScore(top.score)}/20).` : ''}`;

  const body = html`
  <section class="home-hero">
    <p class="eyebrow eyebrow--date"><time data-local-date></time></p>
    <h1 class="display display--xl">${h1}</h1>
    <p class="dek dek--lg">${dek}</p>
    ${
      asks.length
        ? html`<p class="waiting"><span class="waiting-k">Waiting on you</span>${asks.map(
            (v, k) => html`${k ? html`<span class="waiting-sep" aria-hidden="true"> · </span>` : ''}<a href="${v.url}"><span class="openq" aria-hidden="true">?</span> ${plural(v.openQuestions, 'open question')} on ${v.label}</a>`,
          )}</p>`
        : ''
    }
  </section>

  <section class="pipeline" aria-label="Ideas by status">
    ${stages.map(
      (s) => html`<a class="stage${counts[s] ? '' : ' is-zero'}" href="/ideas#${colId(s)}">
        <span class="stage-n">${counts[s] || 0}</span>
        <span class="stage-l"><i class="stage-mark ${statusClass(s)}" aria-hidden="true"></i>${statusLabel(s)}</span>
      </a>`,
    )}
  </section>

  <div class="home-grid">
    <section class="home-main">
      ${secTitle('Next up', ['/ideas', 'Open the board'])}
      ${
        next.length
          ? html`<ol class="rows">${next.map((i) => ideaRow(snap, i))}</ol>`
          : nextUp.length
            ? html`<p class="sec-note">Nothing agreed yet. Strongest ideas waiting for a yes:</p>
                 <ol class="rows">${nextUp.map((i) => ideaRow(snap, i, { showStatus: false }))}</ol>`
            : emptyState('No ideas yet.', '')
      }
      ${
        recent.length
          ? html`<div class="spacer"></div>
      ${secTitle('Recent ideas', ['/ideas?view=list&sort=created', 'All ideas'])}
      <ol class="rows">${recent.map((i) => ideaRow(snap, i))}</ol>`
          : ''
      }
    </section>

    <aside class="home-side">
      ${secTitle('Ventures', ['/ventures', 'All'])}
      <ul class="vlist">
        ${snap.ventures.map((v) => {
          const vi = live.filter((i) => i.venture === v.name);
          const a = avg(vi.map((i) => i.score));
          return html`<li><a class="vlist-link" href="${v.url}">
            <span class="vlist-head"><i class="dot dot--lg ${hueClass(v.name)}" aria-hidden="true"></i><span class="vlist-name">${v.label}</span>${v.domain ? html`<span class="vlist-domain">${v.domain}</span>` : ''}</span>
            <span class="vlist-stats">
              <span>${plural(vi.length, 'idea')}</span>
              ${a !== null ? html`<span>avg ${a.toFixed(1)}</span>` : ''}
              ${v.missing ? html`<span class="q">no profile yet</span>` : v.openQuestions ? html`<span class="q"><span class="openq" aria-hidden="true">?</span> ${plural(v.openQuestions, 'open question')}</span>` : html`<span>all answered</span>`}
            </span>
          </a></li>`;
        })}
      </ul>

      ${
        snap.projects.length
          ? html`<div class="spacer"></div>${secTitle('Projects', ['/projects', 'All'])}
            <ul class="mini">${snap.projects.slice(0, 4).map(
              (p) => html`<li><a href="${p.url}"><span class="mini-title">${p.title}</span><span class="mini-meta">${p.date ? prettyDate(p.date) : p.folder}${p.status ? ` · ${statusLabel(p.status)}` : ''}</span></a></li>`,
            )}</ul>`
          : ''
      }

      <div class="spacer"></div>
      ${secTitle('From the log', ['/log', 'Full log'])}
      ${
        latestLog
          ? html`<article class="log-peek">
              <p class="log-peek-date">${dateTag(latestLog.date) || latestLog.title}</p>
              <div class="clip" inert>${prose(latestLog.html, 'prose--small')}</div>
              <a class="more" href="${latestLog.url}">Read the entry ${ICON.arrow}</a>
            </article>`
          : html`<p class="sec-note">No log entries yet.</p>`
      }
    </aside>
  </div>`;
  return layout(ctx, { title: 'Home', active: '', body });
}

// ------------------------------------------------------------------ ideas

const SORTS = {
  score: { label: 'Score', dir: 'desc', get: (i) => i.score ?? -Infinity },
  created: { label: 'Created', dir: 'desc', get: (i) => touched(i) },
  title: { label: 'Idea', dir: 'asc', get: (i) => i.title.toLowerCase() },
  venture: { label: 'Venture', dir: 'asc', get: (i) => i.venture },
  status: { label: 'Status', dir: 'asc', get: (i) => { const k = STATUS_ORDER.indexOf(i.status); return k === -1 ? 50 : k; } },
  format: { label: 'Format', dir: 'asc', get: (i) => i.format.toLowerCase() },
  platform: { label: 'Platform', dir: 'asc', get: (i) => i.platform.toLowerCase() },
};

function sortIdeas(list, key, dir) {
  const s = Object.hasOwn(SORTS, key) ? SORTS[key] : SORTS.score;
  const mul = dir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    const x = s.get(a);
    const y = s.get(b);
    if (x < y) return -1 * mul;
    if (x > y) return 1 * mul;
    return byScore(a, b);
  });
}

function qs(params) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) p.set(k, v);
  const s = p.toString();
  return s ? `?${s}` : '';
}

export function ideasPage(ctx, snap, query) {
  const view = query.get('view') === 'list' ? 'list' : 'board';
  let sort = query.get('sort') || 'score';
  if (sort === 'new') sort = 'created';
  if (!Object.hasOwn(SORTS, sort)) sort = 'score';
  const dir = query.get('dir') === 'asc' || query.get('dir') === 'desc' ? query.get('dir') : SORTS[sort].dir;
  const venture = query.get('venture') || '';
  const state = { venture, view: view === 'list' ? 'list' : '', sort: sort === 'score' ? '' : sort, dir: dir === SORTS[sort].dir ? '' : dir };

  const all = snap.ideas;
  const filtered = venture ? all.filter((i) => i.venture === venture) : all;
  const sorted = sortIdeas(filtered, sort, dir);
  const ventureNames = [...new Set([...snap.ventures.map((v) => v.name), ...all.map((i) => i.venture)])];

  const known = STATUS_ORDER.filter((s) => s !== 'killed');
  const extra = [...new Set(all.map((i) => i.status))].filter((s) => !STATUS_ORDER.includes(s)).sort();
  const columns = [...known, ...extra, 'killed'];

  const chips = html`<nav class="chips" aria-label="Filter by venture">
    <a class="chip" href="/ideas${qs({ ...state, venture: '' })}"${!venture ? raw(' aria-current="true"') : ''}>All <span class="chip-n">${all.length}</span></a>
    ${ventureNames.map(
      (n) => html`<a class="chip" href="/ideas${qs({ ...state, venture: n })}"${venture === n ? raw(' aria-current="true"') : ''}><i class="dot ${hueClass(n)}" aria-hidden="true"></i>${ventureLabel(snap, n)} <span class="chip-n">${all.filter((i) => i.venture === n).length}</span></a>`,
    )}
  </nav>`;

  const sortSeg = html`<div class="seg" role="group" aria-label="Sort">
    ${['score', 'created', 'title'].map(
      (k) => html`<a href="/ideas${qs({ ...state, sort: k === 'score' ? '' : k, dir: '' })}"${sort === k ? raw(' aria-current="true"') : ''}>${k === 'created' ? 'Newest' : k === 'title' ? 'A–Z' : 'Score'}</a>`,
    )}
  </div>`;

  const viewSeg = html`<div class="seg" role="group" aria-label="View">
    <a href="/ideas${qs({ ...state, view: '' })}"${view === 'board' ? raw(' aria-current="true"') : ''}>${ICON.board}<span>Board</span></a>
    <a href="/ideas${qs({ ...state, view: 'list' })}"${view === 'list' ? raw(' aria-current="true"') : ''}>${ICON.list}<span>List</span></a>
  </div>`;

  let main;
  if (!filtered.length) {
    main = emptyState(venture ? `No ideas for ${ventureLabel(snap, venture)} yet.` : 'No ideas yet.', html`Ideas live in <code>ideas/&lt;venture&gt;/&lt;slug&gt;.md</code>. New venture folders show up here automatically.`);
  } else if (view === 'list') {
    const th = (key, cls = '') => {
      const isSorted = sort === key;
      const nextDir = isSorted ? (dir === 'asc' ? 'desc' : 'asc') : SORTS[key].dir;
      return html`<th scope="col" class="${cls}"${isSorted ? raw(` aria-sort="${dir === 'asc' ? 'ascending' : 'descending'}"`) : ''}><a href="/ideas${qs({ ...state, sort: key === 'score' && nextDir === 'desc' ? '' : key, dir: nextDir === SORTS[key].dir ? '' : nextDir })}">${SORTS[key].label}<span class="sort-ind" aria-hidden="true">${isSorted ? (dir === 'asc' ? '↑' : '↓') : ''}</span></a></th>`;
    };
    main = html`<div class="table-wrap table-wrap--data"><table class="data">
      <thead><tr>${th('score', 'num')}${th('title')}${th('venture')}${th('status')}${th('format')}${th('platform')}${th('created')}</tr></thead>
      <tbody>${sorted.map(
        (i) => html`<tr>
          <td class="num">${scoreBadge(i)}</td>
          <td class="t-title"><a href="${i.url}">${i.title}</a>${i.hook ? html`<span class="t-sub t-hook">“${hookText(i, 110)}”</span>` : i.job ? html`<span class="t-sub">${i.job}</span>` : ''}</td>
          <td>${vtag(snap, i.venture)}</td>
          <td>${pill(i.status)}</td>
          <td class="t-muted">${i.format}</td>
          <td class="t-muted">${i.platform}</td>
          <td class="t-muted t-nowrap">${dateTag(isoOrEmpty(touched(i)))}</td>
        </tr>`,
      )}</tbody>
    </table></div>`;
  } else {
    main = html`<div class="board" role="region" aria-label="Ideas by status">
      ${columns.map((s) => {
        const items = sorted.filter((i) => i.status === s);
        const id = colId(s);
        return html`<section class="col${items.length ? '' : ' is-empty'}" id="${id}" aria-labelledby="${id}-h">
          <header class="col-head"><h2 id="${id}-h" class="col-name"><i class="stage-mark ${statusClass(s)}" aria-hidden="true"></i><span class="col-label">${statusLabel(s)}</span></h2><span class="col-n">${items.length}</span></header>
          ${items.length ? html`<ol class="col-cards">${items.map((i) => ideaCard(snap, i))}</ol>` : html`<p class="col-empty">Nothing here yet</p>`}
        </section>`;
      })}
    </div>`;
  }

  const dekText = venture
    ? `${plural(filtered.length, 'idea')} for ${ventureLabel(snap, venture)}.`
    : `${plural(all.length, 'idea')} across ${plural(ventureNames.length, 'venture')}. Scored on Recognizable, Specific, Ownable, Shareable, out of 20.`;

  const skipped = snap.skipped || [];
  const body = html`
    ${pageHead({ eyebrow: 'Pipeline', title: 'Ideas', dek: dekText })}
    ${skipped.length ? warningNote(html`Cards inside subfolders are not read, so these are not shown: ${skipped.map((p, k) => html`${k ? ', ' : ''}<code>${p}</code>`)}. Move the cards up into the venture folder.`) : ''}
    <div class="toolbar">${chips}<div class="toolbar-right">${sortSeg}${viewSeg}</div></div>
    ${main}
    <p class="legend"><span class="score score--strong score--sm">17</span> 17+ strong <span class="score score--ok score--sm">15</span> 14–16 okay <span class="score score--weak score--sm">12</span> under 14, rework or kill</p>`;
  return layout(ctx, { title: 'Ideas', active: 'ideas', body, wide: true }); // both views wide: toggling never shifts the layout
}

function isoOrEmpty(s) {
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : '';
}

const KNOWN_FM = new Set(['id', 'venture', 'title', 'score', 'score_breakdown', 'status', 'job', 'platform', 'format', 'created', 'updated', 'figma', 'project', 'hook']);

export function ideaPage(ctx, snap, idea) {
  const extras = Object.entries(idea.fm || {}).filter(([k, v]) => !KNOWN_FM.has(k) && fmt(v) !== '');
  const more = snap.ideas.filter((i) => i.venture === idea.venture && i !== idea).sort(byScore).slice(0, 4);
  const facts = [
    ['Job', idea.job],
    ['Platform', idea.platform],
    ['Format', idea.format],
    ['Created', idea.created ? (isoOrEmpty(idea.created) ? dateTag(idea.created) : idea.created) : ''],
    ['Updated', idea.updated ? (isoOrEmpty(idea.updated) ? dateTag(idea.updated) : idea.updated) : ''],
    ...extras.map(([k, v]) => [humanize(k), fmt(v)]),
  ].filter(([, v]) => v);

  const projectLinks = [];
  if (idea.projectRef) projectLinks.push(idea.projectRef);
  for (const p of idea.relatedProjects || []) if (!projectLinks.includes(p)) projectLinks.push(p);

  const body = html`
  ${crumbs([['/ideas', 'Ideas'], [`/ideas?venture=${encodeURIComponent(idea.venture)}`, ventureLabel(snap, idea.venture)]])}
  <header class="idea-head">
    <p class="idea-head-meta">${vtag(snap, idea.venture, { link: true })}${pill(idea.status)}<span class="head-score">${scoreBadge(idea)}<span class="head-score-band">${BAND_LABEL[idea.band]}</span></span></p>
    <h1 class="display">${idea.title}</h1>
    ${idea.hook ? html`<p class="hookline"><span class="hookline-k">Hook</span>${smartQuotes(idea.hook)}</p>` : ''}
  </header>
  ${warningNote(idea.warning)}
  <div class="detail">
    <article class="detail-main">${prose(idea.doc.html, 'prose--idea')}</article>
    <aside class="meta" aria-label="Idea details">
      <section class="meta-score">
        <div class="bigscore bigscore--${idea.band}">
          <span class="bigscore-n">${idea.score !== null ? fmtScore(idea.score) : '–'}</span><span class="bigscore-of">/20</span>
          <span class="bigscore-band">${BAND_LABEL[idea.band]}</span>
        </div>
        ${
          idea.breakdown.length
            ? html`<dl class="bars">${idea.breakdown.map((b) => {
                const n = Math.max(0, Math.min(5, Math.round(b.value)));
                return html`<div class="bar-row"><dt>${b.label}</dt><dd><span class="bar" aria-hidden="true">${[1, 2, 3, 4, 5].map((k) => html`<i class="${k <= n ? 'on' : ''}"></i>`)}</span><span class="bar-n">${fmtScore(b.value)}<span class="vh"> out of 5</span></span></dd></div>`;
              })}</dl>`
            : ''
        }
      </section>
      <dl class="facts">${facts.map(([k, v]) => html`<div class="fact"><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
      ${
        projectLinks.length || idea.figma || idea.figmaRaw || idea.project
          ? html`<div class="linkset">
          ${projectLinks.map((p) => html`<a class="linkbtn" href="${p.url}">${ICON.doc}<span>Project: ${p.title}</span></a>`)}
          ${idea.project && !idea.projectRef ? html`<p class="t-muted small">Project folder <code>${idea.project}</code> not found.</p>` : ''}
          ${idea.figma ? html`<a class="linkbtn" href="${idea.figma}" target="_blank" rel="noopener noreferrer"><span>Open in Figma</span>${ICON.ext}</a>` : idea.figmaRaw ? html`<p class="t-muted small">Figma: ${idea.figmaRaw}</p>` : ''}
        </div>`
          : ''
      }
      <p class="source"><code>${idea.doc.rel}</code><br><a href="/api/ideas/${encodeURIComponent(idea.venture)}/${encodeURIComponent(idea.slug)}">View as JSON</a></p>
    </aside>
  </div>
  ${
    more.length
      ? html`<section class="more-from">${secTitle(`More from ${ventureLabel(snap, idea.venture)}`, [`/ideas?venture=${encodeURIComponent(idea.venture)}`, 'All'])}
        <ol class="rows rows--grid">${more.map((i) => ideaRow(snap, i))}</ol></section>`
      : ''
  }`;
  return layout(ctx, { title: idea.title, active: 'ideas', body });
}

// --------------------------------------------------------------- ventures

export function venturesPage(ctx, snap) {
  const body = html`
  ${pageHead({ eyebrow: 'Ventures', title: 'Who we make for', dek: html`Audience, pains, voice and humor limits for each venture. Anything marked <span class="openq">?</span> still needs an answer.` })}
  ${
    snap.ventures.length
      ? html`<ol class="venture-list">${snap.ventures.map((v) => {
          const vi = snap.ideas.filter((i) => i.venture === v.name);
          const a = avg(vi.filter((i) => i.status !== 'killed').map((i) => i.score));
          return html`<li><a class="venture-row" href="${v.url}">
            <span class="vr-dot"><i class="dot dot--xl ${hueClass(v.name)}" aria-hidden="true"></i></span>
            <span class="vr-main">
              <span class="vr-title">${v.label}${v.domain ? html` <span class="vr-domain">${v.domain}</span>` : ''}</span>
              ${v.oneLiner ? html`<span class="vr-one">${truncate(v.oneLiner, 220)}</span>` : v.missing ? html`<span class="vr-one">No profile yet. Create <code>ventures/${v.name}.md</code> from the template.</span>` : ''}
            </span>
            <span class="vr-stats">
              <span><b>${vi.length}</b> ${vi.length === 1 ? 'idea' : 'ideas'}</span>
              <span><b>${a !== null ? a.toFixed(1) : '–'}</b> avg score</span>
              <span class="${v.openQuestions ? 'q' : ''}"><b>${v.openQuestions}</b> open ${v.openQuestions === 1 ? 'question' : 'questions'}</span>
            </span>
          </a></li>`;
        })}</ol>`
      : emptyState('No ventures yet.', html`Create one in <code>ventures/</code> from <code>ventures/_template.md</code>.`)
  }`;
  return layout(ctx, { title: 'Ventures', active: 'ventures', body });
}

export function venturePage(ctx, snap, v) {
  const vi = snap.ideas.filter((i) => i.venture === v.name).sort(byScore);
  const vp = snap.projects.filter((p) => p.venture === v.name);
  const a = avg(vi.filter((i) => i.status !== 'killed').map((i) => i.score));
  const body = html`
  ${crumbs([['/ventures', 'Ventures']])}
  <header class="page-head">
    <p class="eyebrow eyebrow--venture"><i class="dot dot--lg ${hueClass(v.name)}" aria-hidden="true"></i>Venture${v.domain ? html` · ${v.domain}` : ''}</p>
    <h1 class="display">${v.label}</h1>
  </header>
  ${v.doc ? warningNote(v.doc.warning) : ''}
  <div class="detail">
    <article class="detail-main">
      ${
        v.doc
          ? prose(v.doc.html)
          : emptyState('No profile yet.', html`Create <code>ventures/${v.name}.md</code> from <code>ventures/_template.md</code>. Audience, pain, voice and humor rules go there.`)
      }
    </article>
    <aside class="meta" aria-label="Venture summary">
      <div class="statgrid">
        <div class="stat"><span class="stat-n">${vi.length}</span><span class="stat-l">${vi.length === 1 ? 'Idea' : 'Ideas'}</span></div>
        <div class="stat"><span class="stat-n">${a !== null ? a.toFixed(1) : '–'}</span><span class="stat-l">Avg score</span></div>
        <div class="stat${v.openQuestions ? ' stat--q' : ''}"><span class="stat-n">${v.openQuestions}</span><span class="stat-l">Open ${v.openQuestions === 1 ? 'question' : 'questions'}</span></div>
      </div>
      <h2 class="meta-h">Ideas</h2>
      ${
        vi.length
          ? html`<ol class="mini">${vi.map(
              (i) => html`<li><a href="${i.url}"><span class="mini-title">${i.title}</span><span class="mini-meta">${i.score !== null ? `${fmtScore(i.score)}/20 · ` : ''}${statusLabel(i.status)}</span></a></li>`,
            )}</ol>`
          : html`<p class="t-muted small">No ideas yet.</p>`
      }
      ${
        vp.length
          ? html`<h2 class="meta-h">Projects</h2><ol class="mini">${vp.map(
              (p) => html`<li><a href="${p.url}"><span class="mini-title">${p.title}</span><span class="mini-meta">${p.date ? prettyDate(p.date) : p.folder}</span></a></li>`,
            )}</ol>`
          : ''
      }
      ${v.doc ? html`<p class="source"><code>${v.doc.rel}</code></p>` : ''}
    </aside>
  </div>`;
  return layout(ctx, { title: v.label, active: 'ventures', body });
}

// --------------------------------------------------------------- projects

export function projectsPage(ctx, snap) {
  const body = html`
  ${pageHead({ eyebrow: 'Production', title: 'Projects', dek: 'One folder per video: brief, script, shots, prompts, and whatever comes out the other end.' })}
  ${
    snap.projects.length
      ? html`<ol class="rows rows--projects">${snap.projects.map(
          (p) => html`<li><a class="row-link row-link--project" href="${p.url}">
            <span class="row-date">${p.date ? prettyDate(p.date) : ''}</span>
            <span class="row-main">
              <span class="row-title">${p.title}</span>
              <span class="row-meta">${p.venture ? vtag(snap, p.venture) : html`<span>${p.folder}</span>`}<span class="row-sep" aria-hidden="true"></span><span>${plural(p.docs.length, 'file')}</span>${p.media.length ? html`<span class="row-sep" aria-hidden="true"></span><span>${plural(p.media.length, 'output')}</span>` : ''}</span>
            </span>
            ${p.status ? pill(p.status) : ''}
          </a></li>`,
        )}</ol>`
      : html`${emptyState(
          'No projects yet.',
          html`A project starts when an idea gets a yes. <a class="more" href="/ideas#col-scored">See the ideas waiting for one ${ICON.arrow}</a>`,
        )}
        <p class="source">Projects live in <code>projects/YYYY-MM-DD-&lt;venture&gt;-&lt;slug&gt;/</code>, copied from <code>projects/_template/</code>, with renders in <code>outputs/</code>.</p>`
  }`;
  return layout(ctx, { title: 'Projects', active: 'projects', body });
}

export function projectPage(ctx, snap, p, tab) {
  const current = p.docs.find((d) => d.name === tab) || p.docs[0];
  const metaBits = [
    p.date ? html`<span>${dateTag(p.date)}</span>` : '',
    p.venture ? vtag(snap, p.venture, { link: true }) : '',
    p.status ? pill(p.status) : '',
  ].filter(Boolean);

  const body = html`
  ${crumbs([['/projects', 'Projects']])}
  <header class="page-head">
    <p class="eyebrow">Project</p>
    <h1 class="display">${p.title}</h1>
    <p class="idea-head-meta">${metaBits}</p>
    <div class="linkset linkset--row">
      ${p.ideaRef ? html`<a class="linkbtn" href="${p.ideaRef.url}">${ICON.doc}<span>Idea: ${p.ideaRef.title}</span></a>` : p.idea ? html`<span class="t-muted small">Idea: ${p.idea}</span>` : ''}
      ${p.figma ? html`<a class="linkbtn" href="${p.figma}" target="_blank" rel="noopener noreferrer"><span>Open in Figma</span>${ICON.ext}</a>` : ''}
    </div>
  </header>
  ${p.warnings.map((w) => warningNote(w))}
  ${
    p.docs.length
      ? html`<section class="files" id="files">
      <div class="tabs" role="tablist" aria-label="Project files">
        ${p.docs.map(
          (d, k) => html`<a role="tab" class="tab" id="tab-${k}" href="?tab=${encodeURIComponent(d.name)}#files" data-tab="${d.name}" aria-controls="panel-${k}" aria-selected="${d === current ? 'true' : 'false'}"${d === current ? '' : raw(' tabindex="-1"')}>${humanize(d.name)}</a>`,
        )}
      </div>
      ${p.docs.map(
        (d, k) => html`<div role="tabpanel" class="tabpanel" id="panel-${k}" aria-labelledby="tab-${k}"${d === current ? '' : raw(' hidden')}>
          ${prose(d.html)}
          <p class="source"><code>${d.rel}</code></p>
        </div>`,
      )}
    </section>`
      : emptyState('No files yet.', 'Copy the template files into this folder to get started.')
  }
  <section class="gallery" aria-labelledby="outputs-h">
    ${secTitle(html`<span id="outputs-h">Outputs</span>`)}
    ${
      p.media.length
        ? html`<ul class="media-grid">${p.media.map((m) => {
            const label = m.preview
              ? html`<span class="media-name"><a href="${m.url}" target="_blank" rel="noopener">${m.master}</a> <span class="media-tag" title="Small preview copy. The full-quality master stays on the Mac.">preview</span></span>`
              : html`<a href="${m.url}" target="_blank" rel="noopener">${m.rel}</a>`;
            const cap = html`<figcaption class="media-cap">${label}<span>${bytes(m.size)}</span></figcaption>`;
            if (m.kind === 'image') return html`<li><figure class="media media--image"><a href="${m.url}" target="_blank" rel="noopener"><img src="${m.url}" alt="${m.name}" loading="lazy" decoding="async"></a>${cap}</figure></li>`;
            if (m.kind === 'video') return html`<li><figure class="media media--video"><video controls playsinline preload="metadata" src="${m.url}"></video>${cap}</figure></li>`;
            return html`<li><figure class="media media--audio"><audio controls preload="none" src="${m.url}"></audio>${cap}</figure></li>`;
          })}</ul>`
        : html`<p class="sec-note">Nothing rendered yet. Files dropped in <code>projects/${p.folder}/outputs/</code> show up here.</p>`
    }
  </section>`;
  return layout(ctx, { title: p.title, active: 'projects', body });
}

// ------------------------------------------------------- research and log

export function researchPage(ctx, snap) {
  const body = html`
  ${pageHead({ eyebrow: 'Research', title: 'What we found', dek: 'Site reviews, competitor ads and audience findings. Newest first.' })}
  ${
    snap.research.length
      ? html`<ol class="rows rows--docs">${snap.research.map(
          (r) => html`<li><a class="row-link row-link--doc" href="${r.url}">
            <span class="row-date">${r.date ? prettyDate(r.date) : ''}</span>
            <span class="row-main"><span class="row-title">${r.title}</span>${r.excerpt ? html`<span class="row-excerpt">${truncate(r.excerpt, 200)}</span>` : ''}</span>
          </a></li>`,
        )}</ol>`
      : emptyState('No research yet.', html`Notes go in <code>research/YYYY-MM-DD-&lt;topic&gt;.md</code>.`)
  }`;
  return layout(ctx, { title: 'Research', active: 'research', body });
}

export function researchDocPage(ctx, snap, r) {
  const body = html`
  ${crumbs([['/research', 'Research']])}
  ${pageHead({ eyebrow: r.date ? html`${dateTag(r.date)}` : 'Research', title: r.title })}
  ${warningNote(r.warning)}
  <article class="reading">${prose(r.html)}<p class="source"><code>${r.rel}</code></p></article>`;
  return layout(ctx, { title: r.title, active: 'research', body });
}

export function logPage(ctx, snap) {
  const body = html`
  ${pageHead({ eyebrow: 'Log', title: 'What we discussed', dek: 'Decisions, open questions and where we left things. Newest first.' })}
  ${
    snap.logs.length
      ? html`<div class="log">${snap.logs.map(
          (l) => html`<article class="log-entry" id="${l.slug}">
            <header class="log-date">${l.date ? html`<time datetime="${l.date}">${prettyDate(l.date)}</time>` : html`<span>${l.title}</span>`}</header>
            <div class="log-body">${prose(l.html)}</div>
          </article>`,
        )}</div>`
      : emptyState('No log entries yet.', html`Each session appends to <code>log/YYYY-MM-DD.md</code>.`)
  }`;
  return layout(ctx, { title: 'Log', active: 'log', body });
}

export function learningsPage(ctx, snap) {
  const doc = snap.learnings;
  const tableRows = doc ? doc.body.split('\n').filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s|:-]+\|\s*$/.test(l)).length : 0;
  const hasEntries = tableRows > 1 || (doc && !/\|/.test(doc.body) && doc.text.length > 120);
  const body = html`
  ${pageHead({ eyebrow: 'Learnings', title: doc?.title && doc.title !== 'Learnings' ? doc.title : 'What worked, what flopped', dek: 'So the next idea starts smarter.' })}
  <article class="reading">
    ${doc && hasEntries ? prose(doc.html) : ''}
    ${!hasEntries ? emptyState('Nothing logged yet.', 'Once a video is posted, its result and the reason we think it happened go here.') : ''}
    ${doc ? html`<p class="source"><code>${doc.rel}</code></p>` : ''}
  </article>`;
  return layout(ctx, { title: 'Learnings', active: 'learnings', body });
}

// ---------------------------------------------------------------- playbook

export function playbookPage(ctx, pb, current) {
  const doc = current || pb.skill;
  const desc = !current && pb.skill ? fmt(pb.skill.fm.description) : '';
  const items = [
    ...(pb.skill ? [{ url: '/playbook', title: 'The workflow', sub: 'SKILL.md', active: !current }] : []),
    ...pb.refs.map((r) => ({ url: r.url, title: r.title, sub: `${r.slug}.md`, active: current === r })),
  ];
  const body = html`
  ${current ? crumbs([['/playbook', 'Playbook']]) : ''}
  ${pageHead({ eyebrow: 'Playbook', title: doc ? (current ? doc.title : 'How we make UGC') : 'Playbook', dek: desc ? truncate(desc, 280) : current ? 'Reference' : '' })}
  ${
    doc
      ? html`<div class="detail detail--nav">
      <aside class="meta" aria-label="Playbook files">
        <nav class="subnav">${items.map(
          (it) => html`<a href="${it.url}"${it.active ? raw(' aria-current="page"') : ''}><span class="subnav-t">${it.title}</span><span class="subnav-s">${it.sub}</span></a>`,
        )}</nav>
        <p class="source">Read-only. Edit in <code>.claude/skills/ugc/</code>.</p>
      </aside>
      <article class="detail-main">${prose(doc.html)}</article>
    </div>`
      : emptyState('No playbook found.', html`Expected <code>.claude/skills/ugc/SKILL.md</code>.`)
  }`;
  return layout(ctx, { title: current ? doc.title : 'Playbook', active: 'playbook', body });
}

// ------------------------------------------------------------------ errors

export function notFoundPage(ctx, what = 'page') {
  const body = html`
  ${pageHead({ eyebrow: '404', title: 'Not here.', dek: `That ${what} doesn't exist, or it moved.` })}
  <p><a class="more" href="/">${ICON.back} Back to the studio</a></p>`;
  return layout(ctx, { title: 'Not found', body });
}

export function errorPage(ctx) {
  const body = html`
  ${pageHead({ eyebrow: '500', title: 'Something broke.', dek: 'The error was logged on the server. Try again in a moment.' })}
  <p><a class="more" href="/">${ICON.back} Back to the studio</a></p>`;
  return layout(ctx, { title: 'Error', body });
}

// ------------------------------------------------------------------ search

export function searchIndex(snap, pb) {
  const out = [];
  const add = (k, t, u, v, x) => out.push({ k, t: fmt(t), u, v: v || '', x: truncate(fmt(x), 4000) });
  for (const i of snap.ideas) add('Idea', i.title, i.url, ventureLabel(snap, i.venture), `${statusLabel(i.status)} ${i.format} ${i.platform} ${i.doc.text}`);
  for (const v of snap.ventures) add('Venture', v.label, v.url, v.domain, v.doc ? v.doc.text : '');
  for (const p of snap.projects) add('Project', p.title, p.url, p.venture ? ventureLabel(snap, p.venture) : '', p.docs.map((d) => d.text).join(' '));
  for (const r of snap.research) add('Research', r.title, r.url, r.date ? prettyDate(r.date) : '', r.text);
  for (const l of snap.logs) add('Log', l.date ? `Log, ${prettyDate(l.date)}` : l.title, l.url, '', l.text);
  if (snap.learnings) add('Learnings', 'Learnings', '/learnings', '', snap.learnings.text);
  if (pb.skill) add('Playbook', 'The workflow', '/playbook', 'SKILL.md', pb.skill.text);
  for (const r of pb.refs) add('Playbook', r.title, r.url, `${r.slug}.md`, r.text);
  return out;
}
