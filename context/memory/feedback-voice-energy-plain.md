---
name: feedback-voice-energy-plain
description: Voiceovers must be energetic, one continuous take, music low; no cryptic on-screen devices like letter alphabets
metadata:
  type: feedback
---

Owner (2026-10-06) rejected calm/deadpan AI reads and per-line generated voiceovers: "no energy", "voice too low, music too high", "cuts between lines". Also rejected the "QS Alphabet" letters device as confusing ("what are these for?").

**Why:** commercial videos need drive; viewers must understand instantly what QSME is (quantity surveying) and how a job moves on.
**How to apply:** generate VO as ONE continuous take (tools/vo_take.py, /with-timestamps), stability ~0.3 / style ~0.6 for energy, VO ≈ 1.15 gain with the music bed ≈ 0.09 ducked to 0.03; narrate plainly, name each stage in words; no letter/alphabet gimmicks on screen. Related: [[project-qsme-content-programme]], [[feedback-cta-signups-not-free]]

Update 2026-10-06: owner wants NO gaps over 1 s, a real hook in the first 2 s, scripts as continuous speech, and a better model. Standard now: eleven_v3, one unbroken take, picture re-timed to the words (audio-first). See CLAUDE.md 'Audio-first standard'.

Approved 2026-10-06: voice = Cam S (53CG2aO2HU48thT3QnMl) on eleven_v3, one unbroken take, picture re-timed to words, no music bed. Rolled out to all videos.

Update 2026-10-10: ".co.nz" must sound like the normal word "co" — owner was angry at both a spelled-out "C-O" and a drawn-out "KOH". Write it "dot Co dot N Z" (make_vo PRON map). When only one line is wrong in finished takes, swap just that line (tools/fix_cta.py) — owner said the rest was perfect and redoing whole takes wastes time and tokens.
