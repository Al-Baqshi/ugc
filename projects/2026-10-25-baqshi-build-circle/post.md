---
vid: BQ02
title: "Build Circle: property development, backwards"
venture: baqshi
status: "delivered 2026-10-25: EN, 16:9 + 9:16, voiced + music; live on baqshi.com/#build-circle"
publish_date: 2026-10-25
length_s: 60.8
video_with_vo: outputs/bq02-en-9x16-with-vo.mp4
also: outputs/bq02-en-16x9-with-vo.mp4
languages: [en]
---

# BQ02 · Build Circle: property development, backwards

A one-minute film for Build Circle (baqshi.com/#build-circle): first-time developers, starting in New Zealand. Usually a developer picks the site, the design and the price, then looks for buyers; Build Circle starts with the people. Register where, what home and when; when enough people want the same place, Baqshi brings them together as a circle, with one brief and one site, and matches them with the right contractor, architect, engineer, project manager and estimator before anything starts. On QSME: the rules the build has to meet, and every cost line on one open book.

- **Editable master:** `motion/bq02.tpl.html` → `python3 motion/build.py` writes `motion/bq02-en.html` (16:9) and `motion/bq02-en-9x16.html` from `script/strings-en.json` + `outputs/vo-en/cues.json`. Render: `node tools/motion/make.mjs …` (see tools/motion/README.md). Mix: `zsh motion/mix.sh` (from the project folder).
- **Script:** `script/en.txt` (cue-marked). Owner 2026-10-25: a new idea in BQ01's style, Chris, the mission bed, NZ English only, the circle described generally (no decision, signing or cost-timing promises; no money lines).
- **Voice:** Chris (iP95p4xoKVk53GoZ742B), eleven_v3, one unbroken take; take 1 of 3 (57.4 s, steadiest pacing; all three STT word-perfect, "Bakshi" and "Q-S-me" correct). Levelled with tools/voicenorm.py to −16.5 dBFS speech, peaks ≤ −3 dBFS.
- **Music:** BQ01's bed G (60s spy-mission theme), fitted with tools/bedfit.py to 62.35 s; 0.32 ducked to 0.12.
- **On screen, always:** "Illustrative · not real registrations" on the NZ map; "Example" on the QSME panels; end card "Not an investment offer. No returns promised. Get independent legal and financial advice." No numbers, no people, no testimonials.

- **QA (2026-10-25, workflow: picture 16:9, audio/sync, claims):** fixed: 12 cues landing 0.3–0.9 s early (ElevenLabs puts post-pause words inside the pause → new tools/onsets.py), hook flip readable, chain reversal below the caption and the old order faded out, connector lines clear of Architect/Estimator, open-book caption on time, Example tags, bigger disclaimer on from "Wherever…" with the overseas-buyer line. Left for the owner: "the architect" (protected title in NZ) and the Build Circle section's money/sample-count lines.
- **On the site:** "Watch: what is Build Circle?" pill under the Build Circle heading (baqshi.com commit 4f0d13a); files on R2 at media.qsme.build/videos/baqshi/bq02-en-{16x9,9x16}.mp4; posters public/films/bq02-en-*.jpg (hook frame at 3.0 s, also outputs/bq02-en-*-cover.png). /ar and /es show the pill marked "in English". Direct link: baqshi.com/#build-circle-film.

## Files
| ID | File | Length |
|---|---|---|
| BQ02·en·9:16·vo | outputs/bq02-en-9x16-with-vo.mp4 | 1:01 |
| BQ02·en·16:9·vo | outputs/bq02-en-16x9-with-vo.mp4 | 1:01 |

Silent masters sit next to them as `bq02-en-<cut>.mp4`.

## YouTube / Reels copy
Title: Property Development, Backwards: Build Circle for First-Time Developers | Baqshi
Description:
Usually, a developer picks the site, the design and the price, then goes looking for buyers. Build Circle starts with the people.

Tell us where you want to live, what kind of home, and when. When enough people want the same place, we bring you together: a circle of first-time developers. Then one brief, and one site, and before anything starts, the right team: contractor, architect, engineer, project manager and estimator. On QSME, we line up the rules your build has to meet, and every cost line is priced on one open book.

Build Circle, by Baqshi. Starting in New Zealand. Wherever you want to build, register your interest: https://www.baqshi.com/#build-circle

Not an investment offer. No returns promised. Get independent legal and financial advice.

#Baqshi #BuildCircle #FirstHomeNZ #PropertyDevelopment #FirstTimeDeveloper #NewZealand #QSME
