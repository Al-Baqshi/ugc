# UGC Studio

A private, read-only web dashboard for this CreativeUGC folder. It renders the
markdown you already keep here (ideas, ventures, projects, research, log,
learnings and the UGC playbook) so you can see every idea from any device.

The folder stays the source of truth. The studio never writes anything: it
reads the markdown, and links to rendered media in a private storage bucket
(see [Media](#media)).

## What it shows

| Page | Source |
|---|---|
| `/` home: totals by status and venture, next up, recent ideas, latest log | everything below |
| `/ideas` board (kanban by status) or list (sortable table), venture filter | `ideas/<venture>/*.md` |
| `/ideas/<venture>/<slug>` card with score breakdown, links to project and Figma | one idea card |
| `/ventures`, `/ventures/<name>` profiles, open questions (the ❓ count) | `ventures/*.md` (skips `_template.md`) |
| `/projects`, `/projects/<folder>` file tabs + media gallery | `projects/<folder>/` (skips `_template`) |
| `/videos` every project with a video: player, versions, its own voice script and post caption (see [Videos](#videos)) | `outputs/` (or the bucket), `vo-script.json`, `post.md` |
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
wav m4a) shows in the gallery, from `outputs/` or the bucket (below). A
master `<name>.mp4` and its `<name>.preview.mp4` show as one item: the page
plays the small preview, the download link gets the full-quality master.

## Videos

`/videos` (in the nav) has one card per project with at least one MP4 in its
outputs, in publishing order (`publish_date` in `post.md`, else the folder
date), filtered by venture (All / QSME NZ / QSME Global, `?venture=`). Same
layout as `tools/videos_page.py` / `videos.html`, served live:

- **Left:** the player (the preview of the video the script is timed to, or
  its `-with-vo` version), and every version under it: aspect, a play button to
  switch, and a download link for the full-quality file (`?download=1`). Covers
  and thumbnails are listed too (not the `-frames` contact sheets).
- **Right:** the project's own voice script from `vo-script.json`: one row per
  line with the big "say this" text (`text_v2`, with "Q-S-me" shown as QSME), a
  short "how" (the first sentence of `delivery`, production timings like "Out
  by 4.4" stripped), a Details toggle (on-screen text, full direction, the file
  name `<id>.m4a` and the `max_s` it must fit in) and a Copy button. Copy all,
  and `.txt` (`/videos/<project>/voice-script.txt`). In a two-voice script
  (`speaker` on each line) every row names who reads it, the speaker tag at
  the start of `delivery` ("MEL. ...") is left out of the "how", and Copy all /
  `.txt` put `Mel: ` before each line so the recording can be split.
- While the video plays, the line being spoken is highlighted; a line's time
  button seeks the video there. One video plays at a time.
- **Below:** the caption block of `post.md` (the `## Caption…` or `## Platform
  copy` section, subsections included) in a collapsible block, with Copy (plain
  text: no quote markers or emphasis) for the whole section, and one Copy per
  platform subsection (`### Instagram Reels (...)`): when it quotes the post
  (`> ...`), that copies just the post text and its `Hashtags:` tags, without
  the scheduling notes; otherwise the subsection as plain text.
- Phones: the player sticks under the header while the versions and the script
  scroll beneath it, so a tapped time plays in view. Desktop: side by side,
  with the player column sticky (and scrolling on its own when it is taller
  than the window).
- A player whose signed bucket link has expired (a page left open over an
  hour) asks `/media` again and resumes where it was (`public/app.js`, all
  pages).

All behaviour is in `public/videos.js` (event listeners only: the CSP allows no
inline scripts). A project without a usable `vo-script.json` still gets a card.

## Media

Videos are hundreds of MB and Railway refuses code uploads over ~100 MB, so
media never goes up with the code. It lives in a private **Railway storage
bucket** (S3-compatible), and the bytes never pass through the studio:

```
projects/<project>/outputs/<file>      one object per file (masters, previews, stills, audio)
```

- **Serving.** `/media/<project>/<file>` checks the password as usual, then
  answers `302` to a presigned GET on the bucket, valid for 1 hour
  (`?download=1` adds `response-content-disposition=attachment`, so the browser
  saves the file). The signing time is rounded down to 5 minutes, so repeated
  requests get the same URL (the browser can cache the video) and every URL
  stays valid for at least 55 minutes. Bucket egress is free.
- **Locally** (no `BUCKET_*`), and for any file that exists on this disk,
  `/media` serves `projects/<project>/outputs/...` exactly as before, with Range
  support (`?download=1` sets `Content-Disposition: attachment`).
- **The gallery** of a project is its local `outputs/` when that has media,
  else the bucket listing for the project. One ListObjectsV2 of `projects/`
  serves every page and is cached for 60 seconds; if the bucket can't be
  listed, pages still render (the last good listing, or none) and a warning is
  logged. Only top-level `outputs/` files with a media extension are shown.
- **Keys** are only ever `projects/<project>/outputs/<file>` for a project in
  the content and a single-segment file name (no leading `.` or `_`, no
  separators, no control characters, a media extension). Anything else gets a
  404, never a presigned URL (`lib/storage.mjs`, checked again before signing).
- **Uploading** is done from the Mac by `tools/motion/sync-media.mjs` (run by
  `npm run publish`), straight to the bucket. The studio has no upload API.
- `lib/s3.mjs` is a small dependency-free SigV4 client (presign, list, PUT,
  HEAD, DELETE), checked against AWS's published signature examples.

## Environment

| Variable | Required | What it does |
|---|---|---|
| `STUDIO_PASSWORD` | yes in production | HTTP Basic auth password (any username), at least 16 characters or the server refuses to start. If unset, every route returns 503, `/healthz` included, so Railway keeps the previous deploy. |
| `STUDIO_API_TOKEN` | no | Lets `/api/*` accept `Authorization: Bearer <token>` (for n8n and scripts). At least 16 characters. Never accepted on HTML pages. |
| `STUDIO_DEV` | no | `1` allows running with no password. Dev mode listens on 127.0.0.1 only (this machine), and is ignored on Railway. |
| `PORT` | no | Defaults to 3000. |
| `HOST` | no | Defaults to 0.0.0.0, or 127.0.0.1 in dev mode. Dev mode without a password refuses any other address. |
| `STUDIO_CONTENT_ROOT` | no | Read content from another folder (used by the checks). Defaults to the folder above `studio/`. |
| `BUCKET_NAME`, `BUCKET_ENDPOINT`, `BUCKET_ACCESS_KEY_ID`, `BUCKET_SECRET_ACCESS_KEY` | on Railway | The storage bucket (Railway sets them when the bucket is attached to the service; `BUCKET_ENDPOINT` is `https://t3.storageapi.dev`, addressed as `https://<bucket>.t3.storageapi.dev`). All or none: with only some set, the studio logs which are missing and runs without the bucket. Unset: media from `outputs/` only. Never logged. |
| `BUCKET_REGION` | no | Signing region, default `auto`. |

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
railway variables --set STUDIO_API_TOKEN=<random>          # once (for n8n and scripts)
# once: add a storage bucket in the Railway project and attach it to the studio
# service, so it gets the BUCKET_* variables
npm run publish
```

`npm run publish` runs, in order:

1. `node tools/motion/previews.mjs`: makes/refreshes `<name>.preview.mp4` next to every master MP4.
2. stamps `studio/synced.txt`.
3. `railway up --detach`: uploads the code and markdown (a few MB, no media).
4. `node tools/motion/sync-media.mjs`: uploads new or changed masters,
   previews, stills and audio straight to the bucket (credentials are read at
   run time from `railway variables --service studio --kv`, never printed or
   saved). `npm run sync-media` runs this step alone; add `-- --dry-run` to only
   list and compare, `-- --prune` to also delete bucket objects whose local
   file is gone. Details in `tools/motion/README.md`.

`railway up` uploads only what `.railwayignore` lets through. It is an
allowlist: `package.json`, `package-lock.json`, `railway.json`,
`learnings.md`, `studio/`, `ideas/`, `ventures/`, `projects/`, `research/`,
`log/` and `.claude/skills/`. Everything else in the folder stays local, and
`.env`, `.env.*`, keys (`*.pem`, `*.key`, `id_rsa*`), `.npmrc`, `.netrc`,
`credentials*.json`, `.DS_Store` and `node_modules` are excluded even inside
those folders. Media is excluded too: all of `projects/*/outputs/`, and any
mp4 mov webm m4v png jpg jpeg webp gif mp3 m4a wav aac file anywhere (any case).
`studio/synced.txt` is let back in explicitly (`railway up` also reads
`.gitignore`, which lists it). `npm run check` verifies these rules with
`git check-ignore` in a throwaway repo.

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
Send `Accept-Encoding: gzip` with a Bearer token to get large responses
gzipped (see the security notes for when pages are compressed).

| Endpoint | Returns |
|---|---|
| `GET /api/ideas` | array of idea cards: every frontmatter field as written, plus `slug`, `venture` (folder name), `stage` (normalised status), `path`, `url`, `body` (markdown without frontmatter), and `warning` if the YAML was broken |
| `GET /api/ideas/<venture>/<slug>` | one idea card, same shape |
| `GET /api/ventures` | `name, title, label, domain, openQuestions, ideas, hasProfile, path, url, body` |
| `GET /api/projects` | `folder, title, date, venture, status, idea, figma, meta, url, files[{name, path, body}], media[...]` (below) |
| `GET /api/projects` media items | `path, url, play, download, kind, type, size, preview`: `url` is the file, `play` what the page plays (the preview when there is one), `download` the full-quality file as an attachment; `preview: true` marks a preview without its master |
| `GET /api/media/<project>` | what the bucket holds for that project: `[{name, size, etag, mtime, url, signedUrl, signedDownloadUrl, signedUntil}]`, header `X-Media-Storage: bucket\|none` (`[]` without a bucket). `url` is the `/media` path (password only); `signedUrl` / `signedDownloadUrl` are presigned bucket links (inline / attachment) a Bearer client can fetch with no further auth, good until `signedUntil` (ISO time, about an hour; list again for fresh ones). Cached like the gallery (60 s). 404 if the project isn't in the deployed content. |

The studio is read-only: anything but `GET`/`HEAD` gets 405 (the old `PUT` /
`DELETE /api/media/...` upload API is gone; media goes straight to the bucket).

```sh
curl -H "Authorization: Bearer $STUDIO_API_TOKEN" https://<your-app>.up.railway.app/api/ideas
curl -u studio:$STUDIO_PASSWORD https://<your-app>.up.railway.app/api/ideas/qsme-nz/facebook-group
```

Media URLs in `/api/projects` (`/media/<folder>/<file>`) need Basic auth; on
Railway they redirect to a presigned bucket URL. A Bearer client fetches files
through the `signedUrl` / `signedDownloadUrl` of `GET /api/media/<project>`.

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
- Read-only: only `GET` and `HEAD` are accepted. Headers must arrive within
  20s and the request within 30s; a body the server didn't read (a PUT, a POST)
  gets 5s to finish, then the connection is closed.
- The bucket is private. The studio holds its keys (from Railway, never logged)
  and hands out presigned GETs only, for `projects/<project>/outputs/<file>`,
  after the password check. The CSP adds the bucket origin to `media-src` and
  `img-src` only.
- Pages and JSON over 8 KB are gzipped only for same-origin requests and
  typed/bookmarked navigations (`Sec-Fetch-Site: same-origin` or `none`) and
  for Bearer clients. A request another site triggers (the browser attaches the
  cached password) is never compressed, so a page's size can't be used to guess
  its content (BREACH). Browsers that don't send `Sec-Fetch-Site` get it
  uncompressed too.
- Only explicit routes exist. Paths are decoded once; anything containing
  `..`, a NUL byte or a backslash is rejected; hidden files are never served;
  media comes only from `projects/*/outputs/` or the bucket's
  `projects/<project>/outputs/<file>` keys, with whitelisted extensions. A
  symlinked `outputs/` is ignored, and every file is checked again after
  resolving symlinks. Studio source, `.env`, package files and the rest of
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
studio/server.mjs         HTTP server, auth, routing, media (Range support, bucket redirects)
studio/lib/content.mjs    reads the folder, mtime cache, cross-links ideas and projects, builds the gallery
studio/lib/s3.mjs         dependency-free SigV4 S3 client (presign, list, put, head, delete)
studio/lib/storage.mjs    the bucket as the studio sees it: key rules, cached listing, presigned links
studio/lib/videos.mjs     the /videos page model (versions, voice script lines, caption)
studio/lib/markdown.mjs   frontmatter, markdown rendering, link rewriting, sanitizer
studio/lib/views.mjs      server-rendered pages
studio/lib/util.mjs       escaping html`` template, formatting helpers
studio/lib/throttle.mjs   failed-login throttle
studio/public/            styles.css, app.js (search, tabs, theme), videos.js (/videos), theme.js, favicon.svg
studio/check.mjs          end-to-end checks (npm run check), including a fake S3 bucket
tools/motion/sync-media.mjs  syncs projects/*/outputs/ to the bucket (npm run publish / sync-media)
```
