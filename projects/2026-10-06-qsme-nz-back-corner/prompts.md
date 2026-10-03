# Prompts

## Character reference
None. No people on screen; Mel is voice only (see vo-script.md and projects/2026-10-02-qsme-voice-casting).

## Images / key frames
None generated. All product footage is a live capture of qsme.co.nz; the flyer photo is the first frame of the existing stage-5-dusk b-roll.

## Video
None generated (no Higgsfield / Runway / Veo).

## Voice
See vo-script.md (ElevenLabs Multilingual v2, stability 0.45, similarity 0.75, style 0, speed 1). Generate after the plan upgrade: `python3 tools/make_vo.py projects/2026-10-06-qsme-nz-back-corner <voice_id> --takes 3`.

## Music (commercial licence required)
ElevenLabs Music: "warm fingerpicked acoustic guitar motif, 92 BPM, no vocals, light and dry, slightly cheeky, sparse, 27 seconds, enters softly, clean resolve on a held chord at the end". Enters at 3.45 s; drops out 16.22–16.82 for the thunk.

## SFX (ElevenLabs SFX)
marker squeak (short felt-tip on paper) ×3 · tape rewind whoosh with pitch-down warble · paper flyer slap · soft UI tick ×15 · marker scritch · generic phone keyboard taps (not the iOS click) · soft tap ×2 · faint loading shimmer · scroll whoosh · rising draw shimmer · low muted wooden thunk · scribble scratch · notes typing · end-card swipe.

## Edit notes
The silent master is final picture: lay VO/music/SFX with `tools/mux outputs/back-corner-9x16.mp4 out.mp4 vo01.mp3@0.10 …` at the times in vo-script.md.
