# UGC Studio

A private, read-only web dashboard for this CreativeUGC folder. It renders the
markdown you already keep here (ideas, ventures, projects, research, log,
learnings and the UGC playbook) so you can see every idea from any device.

The folder stays the source of truth. The studio never writes to it. The only
thing it stores is media uploaded to its volume (see [Media](#media)).

## What it shows

| Page | Source |
|---|---|
| `/` home: totals by status and venture, next up, recent ideas, latest log | everything below |
| `/ideas` board (kanban by status) or list (sortable table), venture filter | `ideas/<venture>/*.md` |
| `/ideas/<venture>/<slug>` card with score breakdown, links to project and Figma | one idea card |
| `/ventures`, `/ventures/<name>` profiles, open questions (the ❓ count) | `ventures/*.md` (skips `_template.md`) |
| `/projects`, `/projects/<folder>` file tabs + media gallery | `projects/<folder>/` (skips `_template`) |
| `/research`, `/research/<file>` | `research/*.md`, newest first |
| `/log` | `log/*.md`, newest first |
| `/learnings` | `learnings.md` |
| `/playbook`, `/playbook/<file>` | `.claude/skills/ugc/SKILL.md` + `references/*.md` |

Search: press `/` (or Cmd/Ctrl+K) anywhere.

Idea cards are markdown with YAML frontmatter. Fields the studio understands:
`id, venture, title, score, score_breakdown, status, job, platform, format,
created, updated, hook, figma, project`. Anything else is shown as-is. Without
a `hook` field, the hook is read from the `1. Hook: ...` beat (or the first
beat under `## Beats`) and shown on the board, lists and the card. A card with
broken YAML still shows, with a warning; a file that can't be read at all is
skipped with a line in the server log, and never takes other pages down. A new
folder under `ideas/` becomes a new venture automatically.

File names can be anything except names starting with `.` or `_` (hidden and
templates) or containing `/`, `\` or `..`. Cards inside a subfolder of a
venture folder are not read; `/ideas` says which subfolders were skipped.

Statuses map to board columns: `raw, scored, agreed, in production, posted,
killed`. Any other status gets its own column.

Projects: every `.md` in the folder is a tab (post, brief, script, shots,
prompts first). Frontmatter in `post.md` or `brief.md` can set `title,
venture, idea, status, figma`. Media (png jpg jpeg webp gif mp4 webm mov mp3
wav m4a) shows in the gallery, from `outputs/` and/or the media volume (below).

## Media

Videos are hundreds of MB and Railway refuses code uploads over ~100 MB, so
media never goes up with the code. On Railway it lives on a persistent volume
mounted at `/data`, with `MEDIA_DIR=/data/media`:

```
MEDIA_DIR/<project>/<file>            one flat folder per project
MEDIA_DIR/<project>/.<file>.sha256    sidecar ("<sha256>  <file>"), written on upload
MEDIA_DIR/.tmp/                       uploads in progress
```

- **Where a file comes from.** `/media/<project>/<file>` and the gallery use
  `projects/<project>/outputs/<file>` when it exists (local dev), otherwise
  `MEDIA_DIR/<project>/<file>`. The gallery is the union of both, deduped by
  name, local first. Range requests work for both.
- **Previews.** Only `<name>.preview.mp4` copies of videos are uploaded
  (`tools/motion/previews.mjs` makes them). When the master `<name>.mp4` isn't
  there but the preview is (on Railway), the player shows the preview, captioned
  with the master's name and a "preview" tag. When the master is there
  (locally), the gallery shows the master and hides its preview.
  `/api/projects` marks those items `"preview": true`.
- **Uploading.** `tools/motion/sync-media.mjs` (run by `npm run publish`) sends
  new or changed files through the media API below. Nothing else writes there.
- **Without `MEDIA_DIR`** the studio reads `outputs/` only, uploads answer 503
  and listings are empty.

## Environment

| Variable | Required | What it does |
|---|---|---|
| `STUDIO_PASSWORD` | yes in production | HTTP Basic auth password (any username), at least 16 characters or the server refuses to start. If unset, every route returns 503, `/healthz` included, so Railway keeps the previous deploy. |
| `STUDIO_API_TOKEN` | no | Lets `/api/*` accept `Authorization: Bearer <token>` (for n8n and scripts). At least 16 characters. Never accepted on HTML pages. |
| `STUDIO_DEV` | no | `1` allows running with no password. Dev mode listens on 127.0.0.1 only (this machine), and is ignored on Railway. |
| `PORT` | no | Defaults to 3000. |
| `HOST` | no | Defaults to 0.0.0.0, or 127.0.0.1 in dev mode. Dev mode without a password refuses any other address. |
| `STUDIO_CONTENT_ROOT` | no | Read content from another folder (used by the checks). Defaults to the folder above `studio/`. |
| `MEDIA_DIR` | on Railway | Folder for uploaded media (Railway: `/data/media` on the volume). Created at startup (`mkdir -p`); temp uploads older than 15 minutes are cleared then. Unset: no uploads, media from `outputs/` only. |
| `MEDIA_MAX_BYTES` | no | Largest upload in bytes. Default 419430400 (400 MB). Bigger uploads get 413. |

## Run locally

```sh
npm install
npm run dev                      # http://127.0.0.1:3000, this machine only, no password, live from disk
STUDIO_PASSWORD=<16+ chars> npm start   # same as production
npm run check                    # spawns the server and runs every check
```

Edits to the markdown show up on the next page load (files are cached by
modification time), no restart needed.

## Publish to Railway

```sh
railway variables --set STUDIO_PASSWORD=<something long>   # once
railway variables --set STUDIO_API_TOKEN=<random>          # once; also in .env (sync-media uploads with it)
railway variables --set MEDIA_DIR=/data/media              # once, with a volume mounted at /data
npm run publish
```

`npm run publish` runs, in order:

1. `node tools/motion/previews.mjs`: makes/refreshes `<name>.preview.mp4` next to every master MP4.
2. stamps `studio/synced.txt`.
3. `railway up --detach`: uploads the code and markdown (a few MB, no media).
4. `node tools/motion/sync-media.mjs`: uploads new or changed previews, images
   and audio to the volume. If the new deploy isn't live yet (the list route
   answers 404, or the service is restarting), it retries for up to 6 minutes.
   `npm run sync-media` runs this step alone; add `-- --prune` to also delete
   Studio files that are gone locally, `-- --dry-run` to only see what would change.

`railway up` uploads only what `.railwayignore` lets through. It is an
allowlist: `package.json`, `package-lock.json`, `railway.json`,
`learnings.md`, `studio/`, `ideas/`, `ventures/`, `projects/`, `research/`,
`log/` and `.claude/skills/`. Everything else in the folder stays local, and
`.env`, `.env.*`, keys (`*.pem`, `*.key`, `id_rsa*`), `.npmrc`, `.netrc`,
`credentials*.json`, `.DS_Store` and `node_modules` are excluded even inside
those folders. Media is excluded too: all of `projects/*/outputs/`, and any
mp4 mov webm png jpg jpeg webp gif mp3 m4a wav file anywhere (any case).

The deployed studio shows the content as it was at upload time, so run
`npm run publish` again after a session to refresh it. The footer says when
that copy was sent ("Content synced ...", from `studio/synced.txt`, so
restarts don't move it). Locally it says when the newest file changed
("Content updated ...").

`railway.json` sets the start command (`npm start`), the health check
(`/healthz`, the only public route besides `/robots.txt`; it answers 503 while
`STUDIO_PASSWORD` is missing) and restart on failure. Railway detects Node
from `package.json`.

## JSON API

All responses are pretty-printed JSON with `Cache-Control: no-store`.
Authenticate with Basic auth, or `Authorization: Bearer $STUDIO_API_TOKEN`.

| Endpoint | Returns |
|---|---|
| `GET /api/ideas` | array of idea cards: every frontmatter field as written, plus `slug`, `venture` (folder name), `stage` (normalised status), `path`, `url`, `body` (markdown without frontmatter), and `warning` if the YAML was broken |
| `GET /api/ideas/<venture>/<slug>` | one idea card, same shape |
| `GET /api/ventures` | `name, title, label, domain, openQuestions, ideas, hasProfile, path, url, body` |
| `GET /api/projects` | `folder, title, date, venture, status, idea, figma, meta, url, files[{name, path, body}], media[{path, url, kind, type, size, preview}]` |
| `GET /api/media/<project>` | files on the media volume for that project: `[{name, size, sha256, mtime}]` (`sha256` is `null` if its sidecar is missing or older than the file). Headers `X-Media-Max-Bytes`, `X-Media-Storage: volume\|none`. `[]` without `MEDIA_DIR`; 404 if the project isn't in the deployed content. |
| `PUT /api/media/<project>/<file>` | **Bearer only.** Streams the body to `MEDIA_DIR/.tmp/`, hashing as it goes, then fsync + atomic rename to `MEDIA_DIR/<project>/<file>` and writes the sidecar. Returns `{name, size, sha256}`. Optional `X-Content-SHA256: <hex>`: refused (400) if the body doesn't match. `Expect: 100-continue` is answered only once the upload is allowed. |
| `DELETE /api/media/<project>/<file>` | **Bearer only.** Removes the file and its sidecar. `{deleted}` or 404. |

Media API rules: `<project>` must be a folder under `projects/` in the deployed
content (so uploads can't create arbitrary folders) and follow the usual name
rules (no leading `.` or `_`). `<file>` must match `^[A-Za-z0-9][A-Za-z0-9._-]*$`,
contain no `..`, and end in mp4 webm mov png jpg jpeg webp gif mp3 m4a wav.
Encoded separators (`%2f`, `%5c`, `%00`) are refused (400), as are symlinks
inside `MEDIA_DIR` (never followed, listed or served). Statuses: 401 no/wrong
credentials, 403 password instead of token on a write, 400 bad name, 404
unknown project, 413 over `MEDIA_MAX_BYTES` (temp file removed), 503 no
`MEDIA_DIR`.

```sh
curl -T clip.preview.mp4 -H "Authorization: Bearer $STUDIO_API_TOKEN" \
  https://<your-app>.up.railway.app/api/media/<project>/clip.preview.mp4
```

```sh
curl -H "Authorization: Bearer $STUDIO_API_TOKEN" https://<your-app>.up.railway.app/api/ideas
curl -u studio:$STUDIO_PASSWORD https://<your-app>.up.railway.app/api/ideas/qsme-nz/facebook-group
```

Media URLs in `/api/projects` (`/media/<folder>/<file>`) need Basic auth.
The only routes that write are `PUT`/`DELETE /api/media/...`, and they take the
Bearer token only, never the password (403), even in dev mode.

## Security notes

- Basic auth on every route except `GET /healthz` and `GET /robots.txt`.
  Passwords and tokens are compared in constant time and must be 16+
  characters. Repeated wrong passwords from one IP are throttled (429 after 30
  in 15 minutes, in memory). The IP is the socket address, or on Railway the
  edge's `X-Real-IP`; `X-Forwarded-For` is never trusted, so it can't be used
  to dodge the limit or to lock the owner out. A flood of new IPs can't wipe
  existing lockouts, and past 300 failures in a window every failed login is
  slowed by a second.
- Dev mode (no password) listens on 127.0.0.1 only and can't switch on in a
  Railway deploy.
- Writes (media uploads/deletes) need `STUDIO_API_TOKEN` as a Bearer token; the
  password is never enough. Uploads stream to disk (never buffered), are
  capped by `MEDIA_MAX_BYTES` while streaming, and are dropped after 2 minutes
  without data. Headers must arrive within 20s; a body the server didn't read
  (a refused upload, a POST) gets 5s to finish, then the connection is closed.
- Only explicit routes exist. Paths are decoded once; anything containing
  `..`, a NUL byte or a backslash is rejected; hidden files are never served;
  media comes only from `projects/*/outputs/` or `MEDIA_DIR/<project>/` with
  whitelisted extensions. A symlinked `outputs/` is ignored, and every file is
  checked again after resolving symlinks; in `MEDIA_DIR` symlinks are never
  followed at all. Studio source, `.env`, package files and the rest of
  `.claude` are not reachable.
- Frontmatter is HTML-escaped and reduced to plain data (a self-referencing
  YAML alias falls back to a simple read). Rendered markdown has scripts,
  frames, comments, inline styles, event handlers and `javascript:` URLs
  stripped; attribute values are re-escaped and any `<` that doesn't start a
  clean tag is escaped, so nothing can hide markup inside an attribute. The
  CSP blocks inline scripts anyway. `npm run check` throws a list of known
  bypass payloads at it.
- Headers: `Content-Security-Policy` (self + Google Fonts), `X-Frame-Options:
  DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`,
  `X-Robots-Tag: noindex`. Pages carry `<meta name="robots" content="noindex">`.

## Files

```
studio/server.mjs        HTTP server, auth, routing, media (Range support)
studio/lib/content.mjs   reads the folder, mtime cache, cross-links ideas and projects, merges the gallery
studio/lib/media.mjs     media volume: list, serve, streamed atomic uploads, deletes
studio/lib/markdown.mjs  frontmatter, markdown rendering, link rewriting, sanitizer
studio/lib/views.mjs     server-rendered pages
studio/lib/util.mjs      escaping html`` template, formatting helpers
studio/lib/throttle.mjs  failed-login throttle
studio/public/           styles.css, app.js (search, tabs, theme), theme.js, favicon.svg
studio/check.mjs         end-to-end checks (npm run check)
tools/motion/sync-media.mjs  uploads changed media to the volume (npm run publish / sync-media)
```
