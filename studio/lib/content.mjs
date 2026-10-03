// Reads the CreativeUGC folder from disk on every request, with a small
// mtime-based cache so unchanged files are not re-parsed.

import fsp from 'node:fs/promises';
import path from 'node:path';
import {
  splitFrontmatter,
  firstH1,
  stripLeadingH1,
  renderMarkdown,
  htmlToText,
  firstParagraphText,
  sectionText,
} from './markdown.mjs';
import { fmt, isoDate, humanize, isHttpUrl, esc } from './util.mjs';

export const STATUS_ORDER = ['raw', 'scored', 'agreed', 'in production', 'posted', 'killed'];

export const MEDIA_TYPES = Object.assign(Object.create(null), {
  png: ['image', 'image/png'],
  jpg: ['image', 'image/jpeg'],
  jpeg: ['image', 'image/jpeg'],
  webp: ['image', 'image/webp'],
  gif: ['image', 'image/gif'],
  mp4: ['video', 'video/mp4'],
  webm: ['video', 'video/webm'],
  mov: ['video', 'video/quicktime'],
  mp3: ['audio', 'audio/mpeg'],
  wav: ['audio', 'audio/wav'],
  m4a: ['audio', 'audio/mp4'],
});

const PROJECT_TAB_ORDER = ['post', 'brief', 'script', 'shots', 'prompts'];
const SCORE_LABELS = Object.assign(Object.create(null), { r: 'Recognizable', s: 'Specific', o: 'Ownable', sh: 'Shareable' });

/**
 * Names the studio lists. Only path-breaking names are refused: every route
 * looks names up in this enumerated list, never builds a filesystem path from
 * the URL. Leading "." and "_" mean hidden or template (.DS_Store, _template.md).
 */
export const LISTABLE = (n) => !/^[._]/.test(n) && !/[\\/\0]/.test(n) && !n.includes('..');
const INTENTIONAL_SKIP = (n) => /^[._]/.test(n);

export function normStatus(v) {
  const s = fmt(v).trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  if (!s) return 'raw';
  if (/^in ?production$|^producing$/.test(s)) return 'in production';
  return s;
}

export function parseScore(v) {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  const m = /-?\d+(\.\d+)?/.exec(fmt(v));
  return m ? Number(m[0]) : null;
}

export function parseBreakdown(v) {
  const out = [];
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    for (const [k, val] of Object.entries(v)) {
      const n = parseScore(val);
      if (n !== null) out.push({ key: k, label: SCORE_LABELS[k.toLowerCase()] || humanize(k), value: n });
    }
    return out;
  }
  for (const m of fmt(v).matchAll(/([A-Za-z]+)\s*[:=]?\s*(\d+(?:\.\d+)?)/g)) {
    out.push({ key: m[1], label: SCORE_LABELS[m[1].toLowerCase()] || m[1], value: Number(m[2]) });
  }
  return out;
}

export function scoreBand(score) {
  if (score === null || score === undefined) return 'none';
  if (score >= 17) return 'strong';
  if (score >= 14) return 'ok';
  return 'weak';
}

/** Is `target` strictly inside `base`? Both must be absolute. */
export function isInside(base, target) {
  const rel = path.relative(base, target);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

const HOOK_BEAT_RE = /^\s*\d+[.)]\s*\**Hook\**\s*[:\u2013\u2014-]\s*(.+?)\s*$/im;
const QUOTE_PAIRS = [["'", "'"], ['"', '"'], ['\u201c', '\u201d'], ['\u2018', '\u2019']];

/** Strip one pair of quotes around the whole hook (the views add their own). */
function unquote(s) {
  for (const [a, b] of QUOTE_PAIRS) {
    if (s.length <= 2 || !s.startsWith(a) || !s.endsWith(b)) continue;
    // Apostrophes inside words ("that's") don't count as a closing quote.
    const inner = s.slice(1, -1).replace(/(\w)['’](\w)/g, '$1$2');
    if (!inner.includes(b)) return s.slice(1, -1);
  }
  return s;
}

/** The hook line of a card: frontmatter `hook`, else the "1. Hook: ..." beat, else the first beat. */
export function extractHook(fm, body) {
  const fromFm = fmt(fm?.hook).trim();
  if (fromFm) return fromFm;
  const text = String(body ?? '');
  const beat = HOOK_BEAT_RE.exec(text);
  if (beat) return unquote(beat[1].replace(/[*_`]/g, '').trim());
  const beats = /^##+\s*Beats\s*$([\s\S]*?)(?=^#|(?![\s\S]))/im.exec(text);
  const first = beats && /^\s*\d+[.)]\s+(.+?)\s*$/m.exec(beats[1]);
  return first ? unquote(first[1].replace(/[*_`]/g, '').trim()) : '';
}

/** "x.preview.mp4" -> "x.mp4" (same folder), else null. */
export function masterOf(rel) {
  const m = /^(.*)\.preview\.mp4$/i.exec(rel);
  return m && m[1] ? `${m[1]}.mp4` : null;
}

/**
 * Gallery list: local outputs/ first, then files on the media volume that are
 * not also local (deduped by path). A "<name>.preview.mp4" is hidden when its
 * master "<name>.mp4" is listed (locally: show the master); without the master
 * (on Railway only previews exist) it stays, marked as a preview.
 */
export function mergeMedia(local, stored) {
  const seen = new Set(local.map((m) => m.rel));
  const all = [...local, ...stored.filter((m) => !seen.has(m.rel))];
  const rels = new Set(all.map((m) => m.rel));
  const out = [];
  for (const m of all) {
    const master = masterOf(m.rel);
    if (master && rels.has(master)) continue;
    out.push(master ? { ...m, preview: true, master } : m);
  }
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

/**
 * @param {string} root content folder
 * @param {{ media?: ReturnType<import('./media.mjs').createMediaStore> | null }} [opts]
 *   media: the MEDIA_DIR store (Railway volume). Local outputs/ win over it.
 */
export function createContent(root, { media = null } = {}) {
  root = path.resolve(root);
  const cache = new Map();
  const warned = new Set();
  let treeStamp = -1;

  function warnOnce(key, msg) {
    if (warned.has(key)) return;
    warned.add(key);
    console.warn(`[studio] ${msg}`);
  }

  /**
   * Rendered HTML depends on which OTHER files exist (path auto-links), so the
   * cache is dropped whenever a content directory gains or loses an entry
   * (a directory's mtime changes then). Cheap: a dozen stats per request.
   */
  async function refreshTree() {
    const dirs = ['.', 'ideas', 'ventures', 'research', 'log', 'projects', '.claude/skills/ugc', '.claude/skills/ugc/references'];
    for (const parent of ['ideas', 'projects']) {
      try {
        for (const e of await fsp.readdir(path.join(root, parent), { withFileTypes: true })) if (e.isDirectory()) dirs.push(`${parent}/${e.name}`);
      } catch {}
    }
    const stamps = await Promise.all(dirs.map((d) => fsp.stat(path.join(root, d)).then((st) => st.mtimeMs, () => 0)));
    const stamp = Math.max(0, ...stamps);
    if (stamp !== treeStamp) {
      treeStamp = stamp;
      cache.clear(); // also forgets deleted files
    }
  }

  async function stat(abs) {
    try {
      return await fsp.stat(abs);
    } catch {
      return null;
    }
  }

  async function cached(abs, kind, build) {
    const st = await stat(abs);
    if (!st || !st.isFile()) return null;
    const key = `${kind}\u0000${abs}`;
    const hit = cache.get(key);
    if (hit && hit.mtimeMs === st.mtimeMs && hit.size === st.size) return hit.value;
    let text;
    try {
      text = await fsp.readFile(abs, 'utf8');
    } catch (e) {
      console.warn(`[studio] could not read ${abs}: ${e.message}`);
      return null;
    }
    let value;
    try {
      value = build(text, st);
    } catch (e) {
      // One bad file must never take the studio down: skip it and say so once.
      console.warn(`[studio] skipped ${path.relative(root, abs)}: ${e?.message || e}`);
      value = null;
    }
    cache.set(key, { mtimeMs: st.mtimeMs, size: st.size, value });
    return value;
  }

  async function list(relDir, { dirs = false, ext = '.md' } = {}) {
    let entries;
    try {
      entries = await fsp.readdir(path.join(root, relDir), { withFileTypes: true });
    } catch {
      return [];
    }
    return entries
      .filter((e) => (dirs ? e.isDirectory() : e.isFile() && (!ext || e.name.toLowerCase().endsWith(ext))))
      .filter((e) => {
        if (LISTABLE(e.name)) return true;
        if (!INTENTIONAL_SKIP(e.name)) warnOnce(`${relDir}/${e.name}`, `skipped ${relDir}/${e.name}: name can't be shown safely`);
        return false;
      })
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b));
  }

  /** Load any markdown file as a document. */
  function loadDoc(rel) {
    const abs = path.join(root, rel);
    return cached(abs, 'doc', (text, st) => {
      const base = path.basename(rel, path.extname(rel));
      let data, body, warning, h1, html;
      try {
        ({ data, body, warning } = splitFrontmatter(text));
        h1 = firstH1(body);
        html = renderMarkdown(stripLeadingH1(body), { docRel: rel });
      } catch (e) {
        // Show the file as plain text rather than losing it.
        console.warn(`[studio] could not render ${rel}: ${e?.message || e}`);
        data = {};
        body = String(text);
        h1 = '';
        warning = 'This file could not be rendered, so it is shown as plain text.';
        html = `<pre><code>${esc(text)}</code></pre>`;
      }
      return {
        rel,
        name: base,
        fm: data || {},
        warning,
        raw: text,
        body,
        h1,
        title: fmt(data?.title) || h1 || humanize(base),
        html,
        text: htmlToText(html),
        mtime: st.mtime,
      };
    });
  }

  // ---------------------------------------------------------------- ventures

  async function ventureProfiles() {
    const files = await list('ventures');
    const out = [];
    for (const f of files) {
      try {
        const doc = await loadDoc(`ventures/${f}`);
        if (!doc) continue;
        const name = f.replace(/\.md$/i, '');
        const title = doc.h1 || fmt(doc.fm.title) || name;
        const domain = (/\(([^)]+)\)\s*$/.exec(title) || [])[1] || '';
        const label = title.replace(/\s*\([^)]*\)\s*$/, '').trim() || name;
        out.push({
          name,
          title,
          label,
          domain,
          doc,
          url: `/ventures/${encodeURIComponent(name)}`,
          openQuestions: (doc.raw.match(/❓/g) || []).length,
          oneLiner: sectionText(doc.body, /one[- ]liner/i) || firstParagraphText(stripLeadingH1(doc.body)),
          missing: false,
        });
      } catch (e) {
        console.warn(`[studio] skipped ventures/${f}: ${e?.message || e}`);
      }
    }
    return out;
  }

  // ------------------------------------------------------------------- ideas

  async function loadIdeas(skipped) {
    const ventureDirs = await list('ideas', { dirs: true });
    const ideas = [];
    for (const v of ventureDirs) {
      for (const sub of await list(`ideas/${v}`, { dirs: true })) skipped.push(`ideas/${v}/${sub}/`);
      for (const f of await list(`ideas/${v}`)) {
        try {
          const doc = await loadDoc(`ideas/${v}/${f}`);
          if (!doc) continue;
          const fm = doc.fm;
          const slug = f.replace(/\.md$/i, '');
          const score = parseScore(fm.score);
          ideas.push({
            kind: 'idea',
            venture: v,
            slug,
            id: fmt(fm.id) || `${v}-${slug}`,
            title: doc.title,
            score,
            band: scoreBand(score),
            breakdown: parseBreakdown(fm.score_breakdown),
            status: normStatus(fm.status),
            job: fmt(fm.job),
            platform: fmt(fm.platform),
            format: fmt(fm.format),
            created: isoDate(fm.created) || fmt(fm.created),
            updated: isoDate(fm.updated) || fmt(fm.updated),
            hook: extractHook(fm, doc.body),
            figma: isHttpUrl(fm.figma) ? String(fm.figma) : '',
            figmaRaw: fmt(fm.figma),
            project: fmt(fm.project),
            fm,
            doc,
            warning: doc.warning,
            url: `/ideas/${encodeURIComponent(v)}/${encodeURIComponent(slug)}`,
          });
        } catch (e) {
          console.warn(`[studio] skipped ideas/${v}/${f}: ${e?.message || e}`);
        }
      }
    }
    return ideas;
  }

  // ---------------------------------------------------------------- projects

  async function walkMedia(relDir, depth = 0, prefix = '') {
    if (depth > 3) return [];
    let entries;
    try {
      entries = await fsp.readdir(path.join(root, relDir), { withFileTypes: true });
    } catch {
      return [];
    }
    const out = [];
    for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (!LISTABLE(e.name)) continue;
      const rel = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.isDirectory()) out.push(...(await walkMedia(`${relDir}/${e.name}`, depth + 1, rel)));
      else if (e.isFile()) {
        const ext = path.extname(e.name).slice(1).toLowerCase();
        if (!MEDIA_TYPES[ext]) continue;
        const st = await stat(path.join(root, relDir, e.name));
        out.push({ rel, name: e.name, ext, kind: MEDIA_TYPES[ext][0], type: MEDIA_TYPES[ext][1], size: st?.size ?? 0 });
      }
    }
    return out;
  }

  function tabOrder(a, b) {
    const ia = PROJECT_TAB_ORDER.indexOf(a);
    const ib = PROJECT_TAB_ORDER.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    return a.localeCompare(b);
  }

  async function loadProjects(ventureNames) {
    const folders = await list('projects', { dirs: true });
    const out = [];
    for (const folder of folders) {
      try {
        out.push(await loadProject(folder, ventureNames));
      } catch (e) {
        console.warn(`[studio] skipped projects/${folder}: ${e?.message || e}`);
      }
    }
    return out.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.folder.localeCompare(b.folder));
  }

  async function outputsDir(folder) {
    // A symlinked outputs/ could point anywhere on the machine: never follow it.
    try {
      const st = await fsp.lstat(path.join(root, 'projects', folder, 'outputs'));
      return st.isDirectory() && !st.isSymbolicLink();
    } catch {
      return false;
    }
  }

  async function loadProject(folder, ventureNames) {
    const files = (await list(`projects/${folder}`)).map((f) => f.replace(/\.md$/i, '')).sort(tabOrder);
    const docs = [];
    for (const name of files) {
      const doc = await loadDoc(`projects/${folder}/${name}.md`);
      if (doc) docs.push(doc);
    }
    const brief = docs.find((d) => d.name === 'brief');
    const post = docs.find((d) => d.name === 'post');
    const meta = { ...(brief?.fm || {}), ...(post?.fm || {}) };
    const date = isoDate(folder.slice(0, 10));
    const rest = date ? folder.slice(11) : folder;
    const warnings = docs.filter((d) => d.warning).map((d) => `${d.name}.md: ${d.warning}`);
    let venture = fmt(meta.venture).trim();
    if (venture && !LISTABLE(venture)) {
      warnings.push(`${post?.fm?.venture !== undefined ? 'post.md' : 'brief.md'}: venture "${venture}" is not a valid folder name, so it was worked out from the folder name instead.`);
      venture = '';
    }
    if (!venture) {
      venture =
        [...ventureNames]
          .sort((a, b) => b.length - a.length)
          .find((v) => rest === v || rest.startsWith(`${v}-`)) || '';
    }
    const slugPart = venture && rest.startsWith(`${venture}-`) ? rest.slice(venture.length + 1) : rest;
    const local = (await outputsDir(folder)) ? await walkMedia(`projects/${folder}/outputs`) : [];
    const stored = media
      ? (await media.list(folder, { hashes: false })).map((f) => {
          const ext = path.extname(f.name).slice(1).toLowerCase();
          return { rel: f.name, name: f.name, ext, kind: MEDIA_TYPES[ext][0], type: MEDIA_TYPES[ext][1], size: f.size };
        })
      : [];
    const gallery = mergeMedia(local, stored).map((m) => ({
      ...m,
      url: `/media/${encodeURIComponent(folder)}/${m.rel.split('/').map(encodeURIComponent).join('/')}`,
    }));
    return {
      kind: 'project',
      folder,
      date,
      venture,
      title: fmt(meta.title) || humanize(slugPart) || folder,
      status: meta.status !== undefined ? normStatus(meta.status) : '',
      idea: fmt(meta.idea),
      figma: isHttpUrl(meta.figma) ? String(meta.figma) : '',
      meta,
      docs,
      media: gallery,
      warnings,
      url: `/projects/${encodeURIComponent(folder)}`,
    };
  }

  // ------------------------------------------------- research / log / other

  async function datedDocs(dir) {
    const files = await list(dir);
    const docs = [];
    for (const f of files) {
      try {
        const doc = await loadDoc(`${dir}/${f}`);
        if (!doc) continue;
        docs.push({
          ...doc,
          slug: f.replace(/\.md$/i, ''),
          date: isoDate(f.slice(0, 10)),
          excerpt: firstParagraphText(stripLeadingH1(doc.body)),
        });
      } catch (e) {
        console.warn(`[studio] skipped ${dir}/${f}: ${e?.message || e}`);
      }
    }
    return docs.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.slug.localeCompare(a.slug));
  }

  async function playbook() {
    await refreshTree();
    const skill = await loadDoc('.claude/skills/ugc/SKILL.md');
    const refs = [];
    for (const f of await list('.claude/skills/ugc/references')) {
      const doc = await loadDoc(`.claude/skills/ugc/references/${f}`);
      if (doc) refs.push({ ...doc, slug: f.replace(/\.md$/i, ''), url: `/playbook/${encodeURIComponent(f.replace(/\.md$/i, ''))}` });
    }
    return { skill, refs };
  }

  // ---------------------------------------------------------------- snapshot

  async function snapshot() {
    await refreshTree();
    const skipped = [];
    const profiles = await ventureProfiles();
    const ideas = await loadIdeas(skipped);
    const names = new Set([...profiles.map((v) => v.name), ...ideas.map((i) => i.venture)]);
    const projects = await loadProjects(names);
    for (const p of projects) if (p.venture) names.add(p.venture);

    const ventures = [...profiles];
    for (const n of names) {
      if (!ventures.some((v) => v.name === n)) {
        ventures.push({ name: n, title: n, label: n, domain: '', doc: null, url: `/ventures/${encodeURIComponent(n)}`, openQuestions: 0, oneLiner: '', missing: true });
      }
    }
    ventures.sort((a, b) => a.name.localeCompare(b.name));
    const ventureMap = new Map(ventures.map((v) => [v.name, v]));

    // Cross-links between ideas and projects.
    for (const idea of ideas) {
      idea.projectRef = idea.project ? projects.find((p) => p.folder === idea.project) || null : null;
      idea.relatedProjects = projects.filter(
        (p) => p.idea && (p.idea === idea.id || p.idea === `${idea.venture}/${idea.slug}` || p.idea === idea.slug),
      );
    }
    for (const p of projects) {
      p.ideaRef = p.idea
        ? ideas.find((i) => i.id === p.idea || `${i.venture}/${i.slug}` === p.idea || i.slug === p.idea) || null
        : ideas.find((i) => i.project === p.folder) || null;
    }

    const research = (await datedDocs('research')).map((d) => ({ ...d, url: `/research/${encodeURIComponent(d.slug)}` }));
    const logs = (await datedDocs('log')).map((d) => ({ ...d, url: `/log#${encodeURIComponent(d.slug)}` }));
    const learnings = await loadDoc('learnings.md');

    // Newest content change, for the footer ("Content updated ...").
    const docs = [...profiles.map((v) => v.doc), ...ideas.map((i) => i.doc), ...projects.flatMap((p) => p.docs), ...research, ...logs, learnings];
    let updated = null;
    for (const d of docs) if (d?.mtime && (!updated || d.mtime > updated)) updated = d.mtime;

    return { root, ventures, ventureMap, ideas, projects, research, logs, learnings, skipped, updated };
  }

  /** Is `folder` a project in the content (a real directory under projects/, listable)? */
  async function hasProject(folder) {
    if (!LISTABLE(folder)) return false;
    return (await list('projects', { dirs: true })).includes(folder);
  }

  /**
   * Resolve a media file for a project, or null. Local projects/<folder>/outputs/
   * first (dev), else MEDIA_DIR/<folder>/<file> (Railway). Whitelisted extensions only.
   */
  async function mediaFile(folder, relPath) {
    if (!LISTABLE(folder)) return null;
    const parts = relPath.split('/');
    if (!parts.length || parts.some((p) => !p || !LISTABLE(p))) return null;
    const ext = path.extname(relPath).slice(1).toLowerCase();
    if (!MEDIA_TYPES[ext]) return null;
    if (!(await hasProject(folder))) return null;
    const type = MEDIA_TYPES[ext][1];
    const local = await localMediaFile(folder, parts);
    if (local) return { ...local, type };
    if (parts.length !== 1) return null;
    const stored = media ? await media.file(folder, parts[0]) : null;
    if (stored) return { ...stored, type };
    // A master <name>.mp4 that only exists as <name>.preview.mp4 (Railway keeps
    // previews only): serve the preview, so links to the master still play.
    if (ext === 'mp4' && !/\.preview\.mp4$/i.test(parts[0])) {
      const pv = parts[0].replace(/\.mp4$/i, '.preview.mp4');
      const preview = (await localMediaFile(folder, [pv])) || (media ? await media.file(folder, pv) : null);
      if (preview) return { ...preview, type: 'video/mp4' };
    }
    return null;
  }

  async function localMediaFile(folder, parts) {
    const base = path.join(root, 'projects', folder, 'outputs');
    const abs = path.resolve(base, ...parts);
    if (!isInside(base, abs)) return null;
    try {
      // outputs/ must really be <root>/projects/<folder>/outputs: a symlinked
      // outputs/ (or project or projects/) would let anything it points at through.
      const [realRoot, realBase, realFile] = await Promise.all([fsp.realpath(root), fsp.realpath(base), fsp.realpath(abs)]);
      if (realBase !== path.join(realRoot, 'projects', folder, 'outputs') || !isInside(realBase, realFile)) return null;
      const st = await fsp.stat(realFile);
      if (!st.isFile()) return null;
      return { abs: realFile, size: st.size, mtime: st.mtime };
    } catch {
      return null;
    }
  }

  return { root, snapshot, playbook, mediaFile, hasProject };
}
