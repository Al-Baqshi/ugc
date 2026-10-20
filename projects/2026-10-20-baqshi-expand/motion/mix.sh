#!/bin/zsh
# Lay each language's levelled voice + its fitted music bed onto the silent masters (both cuts), then move moov to the front.
# Voice: outputs/vo-<lang>/voice.m4a = tools/voicenorm.py on the chosen take (speech −16.5 dBFS, peaks ≤ −1.5 dBFS), muxed at 1.0.
# Bed: music/bed-G-<lang>.m4a = tools/bedfit.py fitted to (video length + 1.55 s) so the theme's last hit lands as the end card fades.
# usage: zsh motion/mix.sh en es ar      (run from the project folder)
T=../../tools; S=${TMPDIR:-/tmp}
for l in "$@"; do
  for c in 16x9 9x16; do
    [ -f outputs/baqshi-$l-$c.mp4 ] || { echo "skip $l $c (no master)"; continue; }
    $T/mux outputs/baqshi-$l-$c.mp4 $S/bq-$l-$c-mux.mp4 outputs/vo-$l/voice.m4a@0.0@1.0 --bed music/bed-G-$l.m4a@0.32@0.12 >/dev/null &&
      $T/motion/faststart $S/bq-$l-$c-mux.mp4 outputs/baqshi-$l-$c-with-vo.mp4 && echo "mixed $l $c"
  done
done
