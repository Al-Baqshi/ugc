# Motion kit

Makes MP4s from plain HTML pages. No paid tools: headless Chrome draws every frame, macOS encodes H.264.

```bash
# while designing (fast: QA + contact sheet only)
node tools/motion/make.mjs projects/<folder>/motion/<name>.html projects/<folder>/outputs/<name>.mp4 --safe 65,300,1015,1250 --check
# final render
node tools/motion/make.mjs projects/<folder>/motion/<name>.html projects/<folder>/outputs/<name>.mp4 --safe 65,300,1015,1250
# a static post / carousel slide / thumbnail: PNG at t=2.5s (no video)
node tools/motion/make.mjs projects/<folder>/motion/static.html projects/<folder>/outputs/static.mp4 --still 2.5 --still-only
# add voice / music clips at exact times
tools/mux projects/<folder>/outputs/<name>.mp4 out-with-vo.mp4 line1.mp3@3.2 music.mp3@13.5@0.4
```

- **Page contract:** copy `template.html`, link `kit.css` + `kit.js` (relative path from the page: `../../../tools/motion/`), set `<body class="nz|build r9x16|r4x5|r1x1|r16x9">`, put everything in `#root`, end the script with `Kit.ready({ duration })`. API is documented at the top of `kit.js`.
- **Deterministic only:** no CSS animations/transitions, timers, `<video>` or random numbers. Everything is a function of `t`.
- **Preview:** open the page in a browser with `#play` (real time) or `#t=3.2` (one frame).
- **QA:** `make.mjs` fails (exit 2) if text sits outside the safe box for two samples in a row, or the page throws. Always read the `-frames.png` contact sheet before calling a video done.
- **Safe boxes:** Reels/TikTok 9:16 → `65,300,1015,1250` (clear of app UI and the 4:5 crop). LinkedIn 4:5 → `60,60,1020,1290`. YouTube 16:9 → `96,54,1824,1026`.
- **Brand:** `body.nz` = QSME NZ (navy, Manrope 800, Inter). `body.build` = QSME Global (near-black green, Space Grotesk 700, Inter, mono figures). Logo: `qsme-logo.svg` (green wordmark for dark backgrounds).
- **Honesty:** product screens are either real screenshots/recordings or clearly marked: `.replace` (dashed "REPLACE:" box) or `.illustrative` (corner label). Never invent product UI and pass it off as real.
- **Fonts** are bundled in `fonts/` (Inter, Manrope, Space Grotesk, JetBrains Mono, Permanent Marker, Kalam, Caveat), so renders work offline.

## Footage inside a video
```bash
# a clip from an existing video (b-roll, walkthrough) → JPEG frames
tools/motion/extract assets/qsme/broll/stage-1-site.v1.mp4 projects/<folder>/motion/clips/site 30 0 4.5 1080
# live public page, scripted (typing, clicks, scrolls) → JPEG frames + timestamps
node tools/motion/capture.mjs projects/<folder>/motion/capture-search.json projects/<folder>/motion/clips/search
```
In the page: `<img id="screen" class="abs">` then
`Kit.clip('#screen', { dir: 'clips/site', t0: 1.0, fps: 30, ext: '.jpg' })` (extracted) or
`Kit.clip('#screen', { dir: 'clips/search', t0: 3.0, stamps: <frames.json stamps>, ext: '.jpg' })` (captured; holds the last frame while the page is still).
Use `speed` to play faster (e.g. typing at 1.5×). Frame caches live in `projects/*/motion/` and are never uploaded.

Capture rules: public pages only, never log in, never type personal data. On qsme.co.nz use a public or commercial address (e.g. `135 Albert Street, Auckland` = Auckland Council) — services and hazards chips are Auckland-only.
Speed: a 30 s 9:16 render takes about 2.5 min. Up to ~6 renders can run at once on this Mac.

## Publishing to the Studio
`npm run publish` (from the repo root) does four things in order:
1. `node tools/motion/previews.mjs` makes/refreshes a small `<name>.preview.mp4` next to every master `<name>.mp4` in `projects/*/outputs/`.
2. Stamps `studio/synced.txt`.
3. `railway up --detach` sends the code and markdown only (a few MB). `.railwayignore` leaves out all of `projects/*/outputs/` and every video, image and audio file, because Railway refuses uploads over ~100 MB.
4. `node tools/motion/sync-media.mjs` uploads media to the Studio's volume (`MEDIA_DIR` on Railway) through `PUT /api/media/<project>/<file>`: top-level `*.preview.mp4`, `*.png`, `*.jpg`, `*.jpeg`, `*.webp`, `*.gif`, `*.mp3`, `*.m4a`, `*.wav` in each `outputs/`. Masters (`*.mp4` without `.preview`) and subfolders never go up. Each file's sha256 is compared with the Studio's list, so only new or changed files are sent (streamed, never loaded into memory). If the new deploy isn't live yet it retries for up to 6 minutes, then prints a one-line summary.

Reads `STUDIO_API_TOKEN` (and `STUDIO_URL`, default the live Studio) from `.env`, or the environment; never prints them. File names must be letters, digits, `.`, `_`, `-` (others are skipped and listed). On the Studio a video plays as its preview, tagged "preview"; locally the gallery shows the master.

```bash
npm run sync-media                    # just the upload step
npm run sync-media -- --dry-run       # what would be uploaded/deleted
npm run sync-media -- --prune         # also delete Studio files that are gone locally
```
