---
name: project-baqshi-films
description: Baqshi (baqshi.com) films are made in English, Arabic and Spanish; owner-picked voice Chris and the 60s spy-mission music bed G
metadata:
  type: project
---
Baqshi (global property consultancy, NZ base, 90+ countries; site repo /Users/brave/Dev/Baqshi/baqshi.com, moved there on 2026-11-10) became a CreativeUGC venture on 2026-10-20 (ventures/baqshi.md, IDs BQ01…).

- Owner wants each Baqshi film in **English, Arabic and Spanish**, with the same picture and the voice in each language (2026-10-20).
- English voice: **Chris** (premade American), picked over Eric and Sarah because he sounds "more like you" than the Kiwi voice.
- Music: owner rejected ambient, symphonic + oud, jazz + oud and vintage ballads; picked **bed G**, a vintage 60s spy-mission theme ("something like a mission").
- "Petrigallo" in the owner's speech = BitRegalo (but Baqshi films don't name it).
- baqshi.com is trilingual from branch i18n-film (2026-10-21): English at plain paths, /ar (RTL), /es; the hero film plays in the page's language (FILM_MEDIA in src/lib/film.ts, videos on R2 at media.qsme.build/videos/baqshi/). The repo deploys from main on Vercel with direct pushes (no PRs); pushing main needs the owner's OK.

**Why:** the owner sets these by ear and taste, so re-asking wastes their time.
**How to apply:** reuse projects/2026-10-20-baqshi-expand/motion/baqshi.tpl.html + motion/build.py for new Baqshi films (cue-marked scripts, tools/cue_take.py, tools/bedfit.py). Describe the payment side generally as escrow, with no BitRegalo name and no network or audit talk (see [[feedback-baqshi-escrow-generic]]). See [[feedback-voice-energy-plain]] and [[project-qsme-content-programme]].
