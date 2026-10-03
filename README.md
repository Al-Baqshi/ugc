# ugc — CreativeUGC studio

The working folder for QSME's UGC video programme (QSME NZ · qsme.co.nz and QSME Global · qsme.build), built and run with Claude Code. Everything that matters lives here as plain files, so a new computer or a new Claude session can pick up exactly where we left off.

**Start here:** `CLAUDE.md` (how we work, standing rules), then `context/memory/` (what Claude has learned about you and the project), then `log/` (what happened, day by day).

## What's where

| Path | What |
|---|---|
| `CLAUDE.md` | House rules: idea first, save everything, push sign-ups (never "free"), voice-ready, publish |
| `context/memory/` | Snapshot of Claude's memory for this project (copy into `~/.claude/projects/<this-folder>/memory/` on a new machine) |
| `context/workflows/` | The multi-agent workflow scripts that researched, wrote, produced and reviewed the videos |
| `ventures/` | QSME NZ and QSME Global profiles: audience, voice, brand, CTA rule, fact-check limits |
| `research/` | Product truth sheet (what's live, on-screen wording, red list), pricing notes, 4-week content calendar |
| `ideas/` | Every idea as a card (`INBOX.md` is the index) |
| `projects/<date>-<venture>-<slug>/` | One video each: `post.md` (script, captions, status), `vo-script.json/.md` (timed Kiwi voice lines), `motion/` (the HTML pages the video is rendered from), `outputs/` (stills, contact sheets; videos are in the Release) |
| `videos.html` | Every video with its own script beside it and download buttons (`python3 tools/videos_page.py`) |
| `tools/motion/` | Motion kit: HTML page → MP4 (`make.mjs`), live public-page capture, frame tools, previews |
| `tools/el.py`, `tools/make_vo.py` | ElevenLabs helper and "voice every video" (`--all`) once the plan is paid |
| `studio/` | The private Studio web app (Railway project `ugc-studio`) |
| `assets/qsme/` | Reusable QSME stills/icons (b-roll and walkthrough videos are copied from the product repo, see its README) |
| `.claude/skills/ugc/` | The UGC skill: workflow, humour, formats, direct-response, tools |

## Videos

Git keeps everything except big binaries. Rendered videos are attached to GitHub Releases named `videos-YYYY-MM` as `<project>__<file>.mp4`:

```bash
gh release download videos-2026-10 --repo Al-Baqshi/ugc --dir /tmp/videos
```

Frame caches (`projects/*/motion/clips/`) aren't in git either; re-make them from the capture steps in each `motion/` folder (`node tools/motion/capture.mjs …`) or `tools/motion/extract`.

## Back up

```bash
tools/backup.sh            # commit + push everything, upload new/changed videos to this month's Release
```

## New machine

```bash
git clone https://github.com/Al-Baqshi/ugc.git CreativeUGC && cd CreativeUGC
npm install                                   # Studio deps
for t in tools/mux tools/motion/encode tools/motion/extract tools/motion/frames tools/motion/sheet tools/motion/preview; do swiftc -O $t.swift -o $t; done
cp .env.example .env                          # then fill in the keys yourself (never commit .env)
mkdir -p ~/.claude/projects/$(pwd | sed 's#/#-#g')/memory && cp context/memory/*.md "$_"
railway link                                  # project ugc-studio, service studio (to publish the Studio)
```

Needs macOS (Swift/AVFoundation for video), Node 20+, Google Chrome (headless renders and captures), `gh` and the Railway CLI. Product repos (read-only, for fresh facts): `Al-Baqshi/baqshi-full-custom-go` (NZ platform) and `Al-Baqshi/qsme.build` (global site).
