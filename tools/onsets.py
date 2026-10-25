#!/usr/bin/env python3
"""Fix word start times after pauses, from the audio itself.

ElevenLabs' character timestamps spread a pause over the first letters of the next word, so a word that follows a
pause starts 0.2-0.9 s too early in words.json. Cue times built from it (tools/cue_take.py times) then land scene
changes and captions in silence before the line. This measures the audio and moves each such word's start to where
the voice really comes back in.

usage:
  python3 tools/onsets.py <voice.m4a|mp3> <words.json> [threshold_dbfs=-45] [min_pause_s=0.10]
      rewrites words.json (the original is kept once as words-raw.json next to it) and prints every word it moved.
      Then run: python3 tools/cue_take.py times <out_dir>

Only words that follow a pause move: their start goes to the measured onset (searching up to the next word's start,
since a short word can be placed wholly inside the pause); every other word stays. Re-running starts from
words-raw.json when it exists, so the result is the same every time.
"""
import aifc, array, json, math, os, shutil, subprocess, sys, tempfile, warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)


def envelope(audio):
    """10 ms RMS levels in dBFS (mono AIFF decode: the wave module can't read afconvert's WAVE_FORMAT_EXTENSIBLE)."""
    with tempfile.TemporaryDirectory() as d:
        aif = os.path.join(d, "v.aif")
        subprocess.run(["afconvert", "-f", "AIFF", "-d", "BEI16@22050", "-c", "1", audio, aif], check=True)
        f = aifc.open(aif)
        sr = f.getframerate()
        a = array.array("h", f.readframes(f.getnframes()))
        if sys.byteorder == "little":
            a.byteswap()
    hop = sr // 100
    return [10 * math.log10(sum(x * x for x in a[i:i + hop]) / hop / 32768 ** 2 + 1e-12) for i in range(0, len(a) - hop, hop)]


def main(audio, words_file, thr=-45.0, min_pause=0.10):
    db = envelope(audio)
    raw = os.path.join(os.path.dirname(words_file), "words-raw.json")
    words = json.load(open(raw if os.path.exists(raw) else words_file))
    need = max(1, int(round(min_pause * 100)))
    moved = []
    for j in range(1, len(words)):
        w, prev = words[j], words[j - 1]
        # search to the next word's start: a whole short word ("And", "So", "We") can be placed inside the pause
        nxt = words[j + 1]["s"] if j + 1 < len(words) else w["e"]
        i0, i1 = max(0, int((prev["e"] - 0.4) * 100)), min(len(db), int((max(nxt, w["e"]) + 0.1) * 100))
        # the pause must begin before (or just after) the word's aligned start: a quiet stretch inside a word is not one
        run, onset = 0, None
        for i in range(i0, i1):
            if db[i] < thr:
                run += 1
            else:
                if run >= need and (i - run) / 100 <= w["s"] + 0.15:
                    onset = i / 100
                run = 0
        if onset is not None and onset > w["s"] + 0.08:
            moved.append((w["w"], round(w["s"], 2), round(onset, 2)))
            w["s"] = onset
            if w["e"] < onset + 0.1:   # the word sat inside the pause: it ends after it starts, before the next word
                w["e"] = min(onset + 0.15, max(nxt, onset + 0.1))
    if not os.path.exists(raw):
        shutil.copy(words_file, raw)
    json.dump(words, open(words_file, "w"), indent=1)
    for m in moved:
        print(f"{m[0]!r}: {m[1]} -> {m[2]}")
    print(f"{len(moved)} word starts moved to the measured onset → {words_file}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2:
        sys.exit(__doc__)
    main(a[0], a[1], float(a[2]) if len(a) > 2 else -45.0, float(a[3]) if len(a) > 3 else 0.10)
