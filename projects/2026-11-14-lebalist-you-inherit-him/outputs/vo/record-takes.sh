#!/bin/zsh
# LB01 voice casting: one unbroken eleven_v3 take of the approved script per Lebanese library voice.
# Run from the CreativeUGC root after the ElevenLabs invoice is paid:  zsh projects/2026-11-14-lebalist-you-inherit-him/outputs/vo/record-takes.sh
D=projects/2026-11-14-lebalist-you-inherit-him/outputs/vo
tts(){ python3 tools/el.py tts "$2" "$D/take-$1.mp3" "@$D/take-text.txt" eleven_v3 0.5 0.75 0 1 && python3 tools/el.py stt "$D/take-$1.mp3" > "$D/take-$1.stt.txt"; }
tts fadi  oJQlz7pz2yWd7MRmDUXm &   # Fadi, Lebanese conversational (male)
tts mimi  NQyF5U0t336unYhQXcuv &   # Mimi, Lebanese, Beirut (female)
tts nizar e03v4EOdiJx2f7DwQZhQ &   # Nizar, native Lebanese (male)
wait
