---
name: project-qsme-content-programme
description: QSME video programme cadence and where the product repos live (read them for up-to-date features)
metadata:
  type: project
---

Since 2026-10-02 the user wants 2–3 videos per week for EACH of QSME NZ (qsme.co.nz) and QSME Global (qsme.build): short and long, situation-led (scheduling, tendering, site research…). NZ videos should lean on the site research feature.

**Why:** the platform ships fast (≈700 commits in 5 weeks); videos must reflect what is actually live.
**How to apply:** before ideating, re-read the repos (READ-ONLY, never modify): NZ platform `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go`, global site `/Users/brave/Dev/qsme.build`. Check `git log origin/main` for what's new and only claim features verified live. The truth sheet lives in `research/*-qsme-platform-truth.md`. QSME is pronounced "Cue Ess Me". Related: [[reference-studio-figma-railway]], [[user-ugc-goals]]

User (2026-10-02): keep producing and keep every video voice-ready (vo-script.json per tools/VO_SCRIPT.md); they will upgrade ElevenLabs later, then run `python3 tools/make_vo.py --all`. Calendar: research/2026-10-02-content-calendar.md (5 Oct – 1 Nov 2026).
