#!/bin/zsh
# Lay the levelled voice + the fitted music bed onto the silent masters (both cuts), then move moov to the front.
# Voice: outputs/vo-en/voice.m4a = tools/voicenorm.py on take 1 (speech −16.5 dBFS, peaks ≤ −3 dBFS), muxed at 1.0.
# Bed: music/bed-G-en.m4a = tools/bedfit.py on BQ01's bed G, fitted to (video length + 1.55 s). 0.32, ducked to 0.12 (as BQ01).
# usage: zsh motion/mix.sh      (run from the project folder)
T=../../tools; S=${TMPDIR:-/tmp}
for c in 16x9 9x16; do
  $T/mux outputs/bq02-en-$c.mp4 $S/bq02-$c-mux.mp4 outputs/vo-en/voice.m4a@0.0@1.0 --bed music/bed-G-en.m4a@0.32@0.12 >/dev/null &&
    $T/motion/faststart $S/bq02-$c-mux.mp4 outputs/bq02-en-$c-with-vo.mp4 && echo "mixed $c"
done
