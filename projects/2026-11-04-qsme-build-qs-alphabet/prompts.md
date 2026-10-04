# Prompts

## Character reference
No on-camera people. Voice only: see `vo-script.md` (the founder preferred; fallback "The QS" Kiwi voice, Arnold or James).

## Images / key frames
None generated. Trade icons from `assets/qsme/trade-icons`; b-roll from `assets/qsme/broll` (AI brand footage already on qsme.co.nz).

## Video
None generated. All motion is the HTML motion kit (`tools/motion`), deterministic, rendered locally.

## Voice
ElevenLabs after the upgrade: `python3 tools/make_vo.py --all` reads `vo-script.json` (hero). The cutdowns have their own timelines in `vo-script-4x5.json` and `vo-script-9x16.json`. Voice Design fallback prompt is in the character field.

## Edit notes
Music: about 114 BPM, two bars per letter (4.2 s); dead silence 4.7–5.1 and 53.75–54.0; piano alone from Z. Full direction in `post.md` → "Music and sound direction". No cash-register or tape-measure sounds.
