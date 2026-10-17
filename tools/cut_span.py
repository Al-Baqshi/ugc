#!/usr/bin/env python3
"""Cut one span (e.g. a whole sentence) out of a finished voice take, at the quietest points near the
given times, with a short crossfade. Use it when one sentence has to go and the rest of the take is good.

usage: python3 tools/cut_span.py <take.mp3> <out.m4a> <start_s> <end_s>

start_s / end_s are rough (from words.json: the end of the word before, the start of the word after);
the real cut points are the quietest 10 ms windows within ±0.25 s of each. Prints the removed length.
"""
import array, subprocess, sys, tempfile, wave, os

SR = 44100
WIN = SR // 100


def samples(path):
    tmp = tempfile.mktemp(suffix=".wav")
    subprocess.run(["afconvert", "-f", "WAVE", "-d", f"LEI16@{SR}", "-c", "1", path, tmp], check=True)
    w = wave.open(tmp); s = array.array("h", w.readframes(w.getnframes())); w.close(); os.remove(tmp)
    return s


def rms(s, a):
    seg = s[a:a + WIN]
    return (sum(x * x for x in seg) / max(1, len(seg))) ** 0.5


def quietest(s, t):
    a, b = max(0, int((t - 0.25) * SR)), min(len(s) - WIN, int((t + 0.25) * SR))
    return min(range(a, b, WIN // 2), key=lambda i: rms(s, i))


def main(src, out, t0, t1):
    s = samples(src)
    a, b = quietest(s, float(t0)), quietest(s, float(t1))
    fade = int(0.02 * SR)
    head, tail = list(s[:a]), list(s[b:])
    for i in range(min(fade, len(head), len(tail))):  # 20 ms crossfade across the join
        k = i / fade
        head[len(head) - fade + i] = int(head[len(head) - fade + i] * (1 - k) + tail[i] * k)
    joined = head + tail[fade:]
    tmp = tempfile.mktemp(suffix=".wav")
    w = wave.open(tmp, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(array.array("h", joined).tobytes()); w.close()
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "192000", tmp, out], check=True)
    os.remove(tmp)
    print(f"cut {a / SR:.2f}s → {b / SR:.2f}s (removed {(b - a) / SR:.2f}s); new length {len(joined) / SR:.2f}s")


if __name__ == "__main__":
    if len(sys.argv) != 5:
        sys.exit(__doc__)
    main(*sys.argv[1:])
