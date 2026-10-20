#!/usr/bin/env python3
"""Fit a music bed to an exact length so the track's own ending lands on the video's last frame.

usage: python3 tools/bedfit.py <music.mp3> <out.m4a> <target_s>

Longer target: play to a point, jump back to the bar that sounds most like it, carry on to the real ending.
Shorter target: jump forward the same way. The jump point is found by matching the loudness envelope around
both points (so the groove carries on), then aligned to the waveform within ±25 ms and joined with an 80 ms
crossfade. Prints where it cut. No numpy needed (macOS afconvert for decoding/encoding).
"""
import array, math, os, subprocess, sys, tempfile, wave

SR = 44100


def load(path):
    tmp = tempfile.mktemp(suffix=".wav")
    subprocess.run(["afconvert", "-f", "WAVE", "-d", f"LEI16@{SR}", "-c", "2", path, tmp], check=True)
    w = wave.open(tmp); s = array.array("h", w.readframes(w.getnframes())); w.close(); os.remove(tmp)
    return s  # interleaved stereo


def envelope(s, rate=100):
    hop = SR // rate
    n = len(s) // 2 // hop
    env = []
    for i in range(n):
        a = i * hop * 2
        seg = s[a:a + hop * 2:4]  # every other frame, left channel is enough for shape
        env.append(math.sqrt(sum(x * x for x in seg) / max(1, len(seg))))
    # onset-like feature: positive change in loudness, which carries the rhythm
    return [max(0.0, env[i] - env[i - 1]) for i in range(1, len(env))], env


def corr(x, a, b, n):
    xa, xb = x[a:a + n], x[b:b + n]
    if len(xa) < n or len(xb) < n:
        return -1
    ma, mb = sum(xa) / n, sum(xb) / n
    num = sum((p - ma) * (q - mb) for p, q in zip(xa, xb))
    da = math.sqrt(sum((p - ma) ** 2 for p in xa)); db = math.sqrt(sum((q - mb) ** 2 for q in xb))
    return num / (da * db) if da and db else -1


def main(src, out, target):
    target = float(target)
    s = load(src)
    total = len(s) / 2 / SR
    jump = total - target          # >0: skip forward (shorter); <0: jump back (longer)
    onset, env = envelope(s)
    R = 100
    best = None
    lo, hi = 15.0, total - 12.0
    a = lo
    while a < hi:
        for d in (x / 100 for x in range(-50, 51, 2)):   # allow ±0.5 s so the jump lands on a bar
            b = a + jump + d
            if b < 5 or b > total - 10 or abs(b - a) < 2:
                continue
            ia, ib = int(a * R), int(b * R)
            score = corr(onset, ia, ib, 6 * R) + 0.6 * corr(onset, ia - 3 * R, ib - 3 * R, 3 * R) + 0.4 * corr(env, ia, ib, 6 * R)
            if best is None or score > best[0]:
                best = (score, a, b)
        a += 0.1
    score, a, b = best
    # fine align b to a on the waveform (left channel, ±25 ms)
    ia, ib = int(a * SR), int(b * SR)
    win, lag = int(0.25 * SR), int(0.025 * SR)
    ref = [s[2 * (ia + k)] for k in range(0, win, 4)]
    def wc(off):
        return sum(r * s[2 * (ib + off + k * 4)] for k, r in enumerate(ref))
    off = max(range(-lag, lag + 1, 8), key=wc)
    ib += off
    fade = int(0.08 * SR)
    head = s[: ia * 2]
    tail = s[ib * 2:]
    mix = array.array("h", head[: len(head) - fade * 2])
    for k in range(fade):
        g = k / fade
        for ch in range(2):
            x = head[len(head) - fade * 2 + k * 2 + ch]; y = tail[k * 2 + ch]
            mix.append(int(max(-32768, min(32767, x * (1 - g) + y * g))))
    mix.extend(tail[fade * 2:])
    mix.extend(array.array("h", bytes(SR * 2 * 2 * 2)))   # 2 s of silence, so a bed that ends a hair early never loops
    tmp = tempfile.mktemp(suffix=".wav")
    w = wave.open(tmp, "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(mix.tobytes()); w.close()
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "256000", tmp, out], check=True)
    os.remove(tmp)
    print(f"{total:.2f}s → {len(mix) / 2 / SR - 2:.2f}s + 2 s silence (target {target:.2f}): play to {a:.2f}s, continue from {ib / SR:.3f}s, match {score:.2f}")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
