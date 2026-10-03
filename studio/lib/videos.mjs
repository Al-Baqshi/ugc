// The /videos page model: one card per project with videos, its own voice
// script (vo-script.json) and post caption (post.md) beside the player.
// Port of tools/videos_page.py. Pure functions: no I/O.

import { marked } from 'marked';
import { fmt, isoDate, truncate } from './util.mjs';

/** What the person reads aloud: QSME spelled the way it is written. */
export function sayText(s) {
  return String(s ?? '').replace(/Q-S-me/gi, 'QSME');
}

/** First plain sentence of a delivery note, without production timings ("Out by 5.55."). */
export function shortHow(d) {
  let s = String(d ?? '');
  s = s.replace(/\s*\(?(?:Out|In|Clear|Starts?|Ends?) (?:by|at) [\d.]+s?\)?\.?/g, '');
  s = s.replace(/\([^)]*\d[^)]*\)/g, '');
  s = s.replace(/\s{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').replace(/([.!?])[,;:]+(?=\s|$)/g, '$1').trim();
  const first = s ? s.split(/(?<=[.!?])\s+/)[0] : '';
  return truncate(first, 140);
}

/** "x-16x9.mp4" -> "16x9"; 9x16 unless the name says otherwise. */
export function aspectOf(name) {
  const n = String(name);
  if (n.includes('16x9')) return '16x9';
  if (n.includes('4x5')) return '4x5';
  if (n.includes('1x1')) return '1x1';
  return '9x16';
}

const num = (v, d) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : d;
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * A delivery note without its leading speaker tag, for two-voice scripts:
 * "MEL. Bone-dry, under her breath." -> "Bone-dry, under her breath."
 */
export function stripSpeaker(delivery, speaker) {
  const d = String(delivery ?? '');
  const who = String(speaker ?? '').trim();
  if (!who) return d;
  return d.replace(new RegExp(`^\\s*${escapeRe(who)}\\s*[.:\u2014\u2013-]\\s+`, 'i'), '');
}

/**
 * vo-script.json -> { character, video, speakers, lines: [{ id, speaker, start, max, end,
 * say, how, delivery, onScreen }] } or null. `speakers`: the distinct speaker
 * names in order of first line ([] when the script doesn't name them).
 */
export function voScript(vo) {
  if (!vo || typeof vo !== 'object' || !Array.isArray(vo.lines)) return null;
  const lines = [];
  vo.lines.forEach((l, i) => {
    if (!l || typeof l !== 'object') return;
    const start = num(l.start_s, 0);
    const max = num(l.max_s, 3);
    const raw = fmt(l.text_v2 ?? l.text_v3 ?? l.text ?? '').trim();
    if (!raw) return;
    const delivery = fmt(l.delivery).trim();
    const speaker = fmt(l.speaker).trim();
    lines.push({
      id: fmt(l.id).trim() || `line-${String(i + 1).padStart(2, '0')}`,
      speaker,
      start,
      max,
      end: start + max,
      say: sayText(raw),
      how: shortHow(stripSpeaker(delivery, speaker)),
      delivery,
      onScreen: fmt(l.on_screen).trim(),
    });
  });
  if (!lines.length) return null;
  const video = fmt(vo.video).trim();
  const speakers = [...new Set(lines.map((l) => l.speaker).filter(Boolean))];
  return { character: fmt(vo.character).trim(), video: video ? video.split('/').pop() : '', speakers, lines };
}

/** One line as it is copied with the others: "Mel: ..." when two or more people read the script. */
export function lineText(script, line) {
  return script && script.speakers?.length > 1 && line.speaker ? `${line.speaker}: ${line.say}` : line.say;
}

/** Plain text of every line, one per line (Copy all, voice-script.txt). */
export function scriptText(script) {
  return script ? script.lines.map((l) => lineText(script, l)).join('\n') + '\n' : '';
}

const CAPTION_RE = /caption|platform copy/i;

/**
 * The caption section of a post.md body: the first heading that mentions
 * "Caption" (or "Platform copy"), down to the next heading of the same or a
 * higher level. Returns the markdown, or ''.
 */
export function captionMarkdown(body) {
  let tokens;
  try {
    tokens = marked.lexer(String(body ?? ''));
  } catch {
    return '';
  }
  let depth = 0;
  const out = [];
  for (const t of tokens) {
    if (t.type === 'heading') {
      if (depth && t.depth <= depth) break;
      if (!depth && CAPTION_RE.test(t.text)) {
        depth = t.depth;
        continue;
      }
    }
    if (depth) out.push(t.raw);
  }
  return out.join('').trim();
}

/** Markdown -> text to paste into a post: no quote markers, emphasis, backticks or heading hashes. */
export function plainFromMarkdown(md) {
  return String(md ?? '')
    .split('\n')
    .map((line) =>
      line
        .replace(/^\s{0,3}(?:>\s?)+/, '')
        .replace(/^\s{0,3}#{1,6}\s+/, '')
        .replace(/^(\s*)[*+-]\s+/, '$1- ')
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '$1 ($2)')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, '$2')
        .replace(/(^|[\s(])\*(?=\S)([^*\n]*?\S)\*(?=[\s).,;:!?]|$)/g, '$1$2')
        .replace(/(^|[\s(])_(?=\S)([^_\n]*?\S)_(?=[\s).,;:!?]|$)/g, '$1$2')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/\s+$/, ''),
    )
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const HASHTAG = /#[\p{L}\p{N}_]+/gu;

/**
 * The hashtags of a "Hashtags (5): #A #B · Cover: ..." line (plain text), or ''.
 * Only lines labelled "Hashtags" count; the label and anything after " · " go.
 */
function hashtagLine(line) {
  const m = /^(?:-\s+)?hashtags\b[^:\n]*:\s*(.*)$/i.exec(line.trim());
  if (!m) return '';
  return (m[1].split(/\s+·\s+/)[0].match(HASHTAG) || []).join(' ');
}

/**
 * The per-platform blocks of a caption section (its subsections, split at the
 * shallowest heading inside it), each with the text to paste into that platform:
 *   - when the block quotes the post (> ...): the quoted text, then its hashtags
 *     line if the quote doesn't already carry those tags;
 *   - otherwise the whole block as plain text.
 * Scheduling notes in the headings ("(Tue 13 Oct, 10:30 NZDT)") stay out of the copy.
 * Returns [{ title, label, text, quoted }]; [] when the section has no subsections.
 */
export function captionParts(md) {
  let tokens;
  try {
    tokens = marked.lexer(String(md ?? ''));
  } catch {
    return [];
  }
  const depths = tokens.filter((t) => t.type === 'heading').map((t) => t.depth);
  if (!depths.length) return [];
  const level = Math.min(...depths);
  const parts = [];
  let cur = null;
  for (const t of tokens) {
    if (t.type === 'heading' && t.depth === level) {
      cur = { title: plainFromMarkdown(t.text).replace(/\s+/g, ' ').trim(), tokens: [] };
      parts.push(cur);
    } else if (cur) cur.tokens.push(t);
  }
  const out = [];
  for (const p of parts) {
    const all = plainFromMarkdown(p.tokens.map((t) => t.raw).join(''));
    if (!p.title || !all) continue;
    const quotes = p.tokens.filter((t) => t.type === 'blockquote');
    let text = all;
    if (quotes.length) {
      text = quotes.map((t) => plainFromMarkdown(t.raw)).filter(Boolean).join('\n\n');
      const rest = plainFromMarkdown(p.tokens.filter((t) => t.type !== 'blockquote').map((t) => t.raw).join(''));
      const tags = rest.split('\n').map(hashtagLine).find(Boolean) || '';
      const inQuote = new Set((text.match(HASHTAG) || []).map((h) => h.toLowerCase()));
      if (tags && !tags.split(' ').every((h) => inQuote.has(h.toLowerCase()))) text += `\n\n${tags}`;
    }
    // "LinkedIn: founder's profile (Tue 13 Oct, 10:30 NZDT)" -> "LinkedIn: founder's profile"
    const label = truncate(p.title.split(/\s*\(|\s+[\u2014\u2013]\s+|\s+-\s+/)[0].trim() || p.title, 30);
    out.push({ title: p.title, label, text, quoted: quotes.length > 0 });
  }
  return out;
}

const STILL_SKIP = /-frames|contact|sheet/i;
const VOICED = /-with-vo|-alt-vo/;

/**
 * Cards for every project with at least one top-level video in its gallery,
 * sorted by publish date (post.md publish_date, else the folder date).
 * @param {any[]} projects snapshot projects (gallery items in p.media)
 */
export function videoCards(projects) {
  const cards = [];
  for (const p of projects) {
    const top = p.media.filter((m) => !m.rel.includes('/'));
    const videos = top.filter((m) => m.kind === 'video');
    if (!videos.length) continue;
    const masters = videos.filter((m) => !VOICED.test(m.rel));
    const voiced = videos.filter((m) => VOICED.test(m.rel));
    const script = p.vo ? voScript(p.vo) : null;
    const byName = (n) => videos.find((m) => m.rel === n || m.master === n);
    const scriptVideo = (script?.video && byName(script.video)) || masters[0] || voiced[0];
    const stem = scriptVideo.rel.replace(/(\.preview)?\.mp4$/i, '');
    const main = voiced.find((m) => m.rel.startsWith(stem)) || scriptVideo;
    const order = [main, ...voiced.filter((m) => m !== main), ...masters.filter((m) => m !== main)];
    const versions = order.map((m) => ({
      ...m,
      aspect: aspectOf(m.rel),
      voiced: VOICED.test(m.rel),
      matchesScript: m === scriptVideo,
      label: `${VOICED.test(m.rel) ? 'With voice · ' : ''}${aspectOf(m.rel).replace('x', ':')}`,
    }));
    const stills = top.filter((m) => m.kind === 'image' && !STILL_SKIP.test(m.rel));
    const date = isoDate(p.meta?.publish_date) || p.date || '';
    cards.push({
      project: p,
      folder: p.folder,
      title: p.title,
      venture: p.venture,
      date,
      status: fmt(p.meta?.status).trim(),
      main: versions[0],
      versions,
      stills,
      script,
      scriptVideoName: scriptVideo.master || scriptVideo.rel,
      caption: p.caption || null,
    });
  }
  return cards.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999') || a.folder.localeCompare(b.folder));
}
