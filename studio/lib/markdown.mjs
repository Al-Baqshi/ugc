// Markdown + frontmatter handling: parse, render, rewrite links into studio
// routes, and strip anything executable from the resulting HTML.

import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';
import YAML from 'yaml';
import { smartQuotes } from './util.mjs';

let contentRoot = process.cwd();
export function configureMarkdown({ root }) {
  contentRoot = root;
}

// ---------------------------------------------------------------------------
// Frontmatter

const FM_RE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

/** Fallback for malformed YAML: read simple `key: value` lines. */
function looseParse(src) {
  const out = {};
  for (const line of src.split(/\r?\n/)) {
    const m = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (v !== '' && !Number.isNaN(Number(v)) && /^-?\d+(\.\d+)?$/.test(v)) v = Number(v);
    if (!(m[1] in out)) out[m[1]] = v;
  }
  return out;
}

export function splitFrontmatter(text) {
  text = String(text ?? '').replace(/^﻿/, '');
  const m = FM_RE.exec(text);
  if (!m) return { data: {}, body: text, warning: null };
  let data = {};
  let warning = null;
  try {
    const parsed = YAML.parse(m[1], { prettyErrors: false });
    if (parsed === null || parsed === undefined) data = {};
    else if (typeof parsed !== 'object' || Array.isArray(parsed)) {
      warning = 'Frontmatter is not a list of key: value pairs. Showing what could be read.';
      data = looseParse(m[1]);
    } else {
      // Plain JSON data only: a self-referencing alias (`status: &a [*a]`) parses
      // into a circular object that would break every page and the JSON API.
      try {
        data = JSON.parse(JSON.stringify(parsed));
      } catch {
        warning = 'Frontmatter uses a self-referencing alias. Showing what could be read.';
        data = looseParse(m[1]);
      }
    }
  } catch (e) {
    const reason = String(e?.message || 'invalid YAML').split('\n')[0].slice(0, 160);
    warning = `Frontmatter could not be parsed (${reason}). Showing what could be read.`;
    data = looseParse(m[1]);
  }
  return { data, body: text.slice(m[0].length), warning };
}

/** First H1 of a markdown body (ignores fenced code). */
export function firstH1(body) {
  let inFence = false;
  for (const line of String(body).split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^#\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) return m[1].replace(/[*_`]/g, '').trim();
  }
  return '';
}

/** Remove a leading H1 (the page renders its own title). */
export function stripLeadingH1(body) {
  const lines = String(body).split(/\r?\n/);
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  if (i < lines.length && /^#\s+/.test(lines[i])) {
    lines.splice(0, i + 1);
    return lines.join('\n');
  }
  return body;
}

// ---------------------------------------------------------------------------
// Content path -> studio route

const enc = (s) => encodeURIComponent(s);

export function routeForContentPath(p) {
  p = String(p || '').replace(/^\.\//, '');
  let m;
  if (p === 'ideas' || p === 'ideas/' || p === 'ideas/INBOX.md') return '/ideas';
  if ((m = /^ideas\/([^/]+)\/([^/]+)\.md$/.exec(p))) return `/ideas/${enc(m[1])}/${enc(m[2])}`;
  if (p === 'ventures' || p === 'ventures/') return '/ventures';
  if ((m = /^ventures\/([^/_.][^/]*)\.md$/.exec(p))) return `/ventures/${enc(m[1])}`;
  if (p === 'research' || p === 'research/') return '/research';
  if ((m = /^research\/([^/]+)\.md$/.exec(p))) return `/research/${enc(m[1])}`;
  if (p === 'log' || p === 'log/') return '/log';
  if ((m = /^log\/([^/]+)\.md$/.exec(p))) return `/log#${enc(m[1])}`;
  if (p === 'learnings.md') return '/learnings';
  if (p === 'projects' || p === 'projects/') return '/projects';
  if ((m = /^projects\/([^/_.][^/]*)\/outputs\/(.+)$/.exec(p)))
    return `/media/${enc(m[1])}/${m[2].split('/').map(enc).join('/')}`;
  if ((m = /^projects\/([^/_.][^/]*)\/([^/]+)\.md$/.exec(p))) return `/projects/${enc(m[1])}?tab=${enc(m[2])}`;
  if ((m = /^projects\/([^/_.][^/]*)\/?$/.exec(p))) return `/projects/${enc(m[1])}`;
  if (p === '.claude/skills/ugc/SKILL.md') return '/playbook';
  if ((m = /^\.claude\/skills\/ugc\/references\/([^/]+)\.md$/.exec(p))) return `/playbook/${enc(m[1])}`;
  return null;
}

function rewriteHref(href, docRel) {
  if (!href) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('#') || href.startsWith('//')) return href;
  const hashIdx = href.search(/[?#]/);
  const pathPart = hashIdx === -1 ? href : href.slice(0, hashIdx);
  const suffix = hashIdx === -1 ? '' : href.slice(hashIdx);
  let decoded;
  try {
    decoded = decodeURIComponent(pathPart);
  } catch {
    return href;
  }
  const target = decoded.startsWith('/')
    ? path.posix.normalize(decoded.slice(1))
    : path.posix.normalize(path.posix.join(path.posix.dirname(docRel || ''), decoded));
  if (target.startsWith('..')) return href;
  const route = routeForContentPath(target);
  if (!route) return href;
  return route.includes('#') || !suffix.startsWith('#') ? route : route + suffix;
}

// ---------------------------------------------------------------------------
// Rendering

let currentDoc = '';
const marked = new Marked({ gfm: true, breaks: false });
marked.use({
  walkTokens(token) {
    if ((token.type === 'link' || token.type === 'image') && token.href) {
      token.href = rewriteHref(token.href, currentDoc);
    }
  },
});

const DANGEROUS_TAGS = 'script|iframe|object|embed|style|frame|frameset|base|meta|link|form|noscript|template|svg|math|applet|portal';
const PAIRED_RE = new RegExp(`<(${DANGEROUS_TAGS})\\b[\\s\\S]*?<\\/\\1\\s*>`, 'gi');
const SINGLE_RE = new RegExp(`<\\/?(${DANGEROUS_TAGS})\\b[^>]*>`, 'gi');
const URL_ATTR_NAMES = new Set(['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background', 'srcset', 'data', 'cite', 'longdesc']);
const DROP_ATTRS = /^(on.*|style|srcdoc|formaction)$/i;
const ATTR_SRC = String.raw`[^\s"'<>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>\x60]+))?`;
const TAG_RE = new RegExp(String.raw`<([a-zA-Z][\w:-]*)((?:\s+${ATTR_SRC})*)\s*(\/?)>|<(?!\/[a-zA-Z][\w:-]*\s*>)`, 'g');
const ATTR_RE = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);?/gi, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);?/g, (_, d) => safeCodePoint(Number(d)))
    .replace(/&colon;/gi, ':')
    .replace(/&tab;|&newline;/gi, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function safeCodePoint(n) {
  try {
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ' ';
  } catch {
    return ' ';
  }
}

function unsafeUrl(value) {
  const v = decodeEntities(value).replace(/[\u0000-\u0020\u007f-\u009f]+/g, '').toLowerCase();
  return /^(javascript|vbscript|data|file):/.test(v);
}

const DANGEROUS_NAME = new RegExp(`^(${DANGEROUS_TAGS})$`, 'i');
const COMMENT_RE = /<!--[\s\S]*?(?:--!?>|$)/g;
const DECL_RE = /<[!?][^>]*>?/g; // <!doctype>, <![CDATA[, <?xml ?>, bogus comments

const escAttr = (v) => v.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Sanitizer for the owner's own markdown: removes scripts, frames, comments,
 * event handlers, inline styles and script URLs. Removal repeats until nothing
 * changes (so removing one thing can't splice a new tag together). Then every
 * start tag is re-serialised from its parsed attributes with `<` `>` `"`
 * escaped inside values, and any other `<` that isn't a clean end tag is
 * escaped. Afterwards every `<` in the output begins a real tag, so later text
 * decoration can never reach into an attribute value.
 */
export function sanitizeHtml(input) {
  let out = String(input);
  let prev;
  do {
    prev = out;
    out = out.replace(COMMENT_RE, '').replace(DECL_RE, '').replace(PAIRED_RE, '').replace(SINGLE_RE, '');
  } while (out !== prev);
  return out.replace(TAG_RE, (whole, name, attrs, selfClose) => {
    if (!name) return '&lt;';
    if (DANGEROUS_NAME.test(name)) return '';
    let rebuilt = '';
    for (const m of (attrs || '').matchAll(ATTR_RE)) {
      const attr = m[1].toLowerCase();
      if (DROP_ATTRS.test(attr)) continue;
      const value = m[2] ?? m[3] ?? m[4];
      if (value === undefined) {
        rebuilt += ` ${attr}`;
        continue;
      }
      if (URL_ATTR_NAMES.has(attr) && unsafeUrl(value)) {
        rebuilt += ` ${attr}="#"`;
        continue;
      }
      rebuilt += ` ${attr}="${escAttr(value)}"`;
    }
    return `<${name}${rebuilt}${selfClose ? ' /' : ''}>`;
  });
}

function autolinkCode(htmlStr) {
  return htmlStr.replace(/<code>([A-Za-z0-9_.\-/]+)<\/code>/g, (m, p) => {
    const clean = p.replace(/^\.\//, '');
    if (clean.includes('..') || !/\.md$|\/$/.test(clean)) return m;
    const route = routeForContentPath(clean);
    if (!route) return m;
    const abs = path.resolve(contentRoot, clean);
    if (!abs.startsWith(contentRoot + path.sep) || !fs.existsSync(abs)) return m;
    return `<a class="pathlink" href="${route}"><code>${p}</code></a>`;
  });
}

const OPENQ = '<span class="openq" title="Needs an answer">?</span>';

const PATH_RE = /(^|[\s(“‘"'])((?:ideas|ventures|research|log|projects)\/[A-Za-z0-9_.\-/]*[A-Za-z0-9_\-/])(?=$|[\s),.;:!?”’"'])/g;

/** Link bare content paths in text ("research/2026-09-28-x.md") when the file exists. */
function linkPaths(text) {
  return text.replace(PATH_RE, (m, pre, p) => {
    if (p.includes('..') || !/\.md$|\/$/.test(p)) return m;
    const route = routeForContentPath(p);
    if (!route) return m;
    const abs = path.resolve(contentRoot, p);
    if (!abs.startsWith(contentRoot + path.sep) || !fs.existsSync(abs)) return m;
    return `${pre}<a class="pathlink pathlink--text" href="${route}">${p}</a>`;
  });
}

/** Walk text nodes only (never attribute values), skipping links and code. */
function decorateText(htmlStr) {
  let inA = 0;
  let inCode = 0;
  return htmlStr.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, text) => {
    if (tag) {
      const t = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/.exec(tag);
      if (t) {
        const name = t[2].toLowerCase();
        const step = t[1] === '/' ? -1 : 1;
        if (name === 'a') inA = Math.max(0, inA + step);
        if (name === 'code' || name === 'pre') inCode = Math.max(0, inCode + step);
      }
      return tag;
    }
    if (inCode) return text;
    // Quotes first: linkPaths adds markup whose attribute quotes must stay straight.
    const quoted = smartQuoteHtml(text);
    const out = inA ? quoted : linkPaths(quoted);
    return out.replace(/❓️?/g, OPENQ);
  });
}

/** Curly quotes in an HTML text node (marked writes ' and " as entities). */
function smartQuoteHtml(text) {
  if (!/&#39;|&quot;|['"]/.test(text)) return text;
  return smartQuotes(text.replace(/&#39;/g, "'").replace(/&quot;/g, '"'));
}

function swatches(htmlStr) {
  return htmlStr.replace(
    /<code>(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8}))<\/code>/g,
    (_, hex) =>
      `<code class="hex"><svg class="swatch" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><rect width="10" height="10" rx="2.5" fill="${hex}"/></svg>${hex}</code>`,
  );
}

function decorate(htmlStr) {
  return swatches(decorateText(htmlStr))
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(
      /<p><strong>(Truth|Twist|The truth|The twist|Payoff|The payoff|Target|The target|Job|The job):?<\/strong>:?\s*/g,
      (_, label) => `<p class="callout"><span class="callout-label">${label.replace(/^The /, '')}</span> `,
    )
    .replace(/<li><input (checked="" )?disabled="" type="checkbox">/g, (_, c) => `<li class="task${c ? ' done' : ''}"><input ${c || ''}disabled="" type="checkbox">`);
}

/**
 * Escape a `*` that ends a path glob ("ideas/qsme-nz/*, ideas/qsme-build/*")
 * so two globs on one line don't turn the text between them into italics.
 * Leaves fenced code, indented code and inline code spans alone.
 */
export function escapeGlobStars(md) {
  let fence = null;
  return String(md ?? '')
    .split('\n')
    .map((line) => {
      const f = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
      if (f) {
        if (!fence) fence = f[1][0];
        else if (f[1][0] === fence) fence = null;
        return line;
      }
      if (fence || /^( {4}|\t)/.test(line) || !line.includes('/*')) return line;
      return line
        .split(/(`+[^`]*`+)/)
        .map((part, i) => (i % 2 ? part : part.replace(/([\w.-]\/)\*(?=$|[\s,.;:!?)\]])/g, '$1\\*')))
        .join('');
    })
    .join('\n');
}

export function renderMarkdown(md, { docRel = '' } = {}) {
  currentDoc = docRel;
  try {
    const out = marked.parse(escapeGlobStars(md), { async: false });
    return decorate(autolinkCode(sanitizeHtml(out)));
  } finally {
    currentDoc = '';
  }
}

export function htmlToText(h) {
  return decodeEntities(
    String(h ?? '')
      .replace(/<(br|\/p|\/li|\/h\d|\/tr|\/td|\/th)\b[^>]*>/gi, ' ')
      .replace(/<span class="openq"[^>]*>\?<\/span>/g, '?')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

/** Plain text of the first paragraph of a markdown body. */
export function firstParagraphText(body) {
  const tokens = marked.lexer(String(body ?? ''));
  for (const t of tokens) {
    if (t.type === 'paragraph' || t.type === 'blockquote') {
      const text = htmlToText(sanitizeHtml(marked.parser([t])));
      if (text) return text;
    }
  }
  return '';
}

/** Plain text of the first paragraph under a heading whose text matches `re`. */
export function sectionText(body, re) {
  const tokens = marked.lexer(String(body ?? ''));
  let inSection = false;
  for (const t of tokens) {
    if (t.type === 'heading') {
      if (inSection) break;
      inSection = re.test(t.text);
      continue;
    }
    if (inSection && (t.type === 'paragraph' || t.type === 'list' || t.type === 'blockquote')) {
      const text = htmlToText(sanitizeHtml(marked.parser([t])));
      if (text) return text;
    }
  }
  return '';
}
