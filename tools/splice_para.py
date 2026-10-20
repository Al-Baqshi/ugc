#!/usr/bin/env python3
"""Swap one paragraph of a finished voice take for a newly generated one (same voice), keeping word timings.

usage: python3 tools/splice_para.py <take> <words.json> <first_old_word> <first_word_after> <seg> <seg_words.json> <out.m4a> <out_words.json>

<first_old_word> / <first_word_after> are word indices in words.json: the paragraph's first word, and the first word
of the paragraph that follows it. The cuts sit just before the old paragraph's first word and just after its last
word, so the take keeps its own pauses around the new paragraph. The new segment is trimmed to its words, matched to
the take's speech loudness and joined with 15 ms fades. The output words.json has the new paragraph's words in place,
and every later word shifted, so tools/cue_take.py times can re-time the picture. Use it when only one paragraph
changes and the rest of the take was approved (owner prefers swapping a part over re-recording, 2026-10-10).
"""
import aifc, array, json, math, os, subprocess, sys, tempfile, wave

SR = 44100


def load(path):
    tmp = tempfile.mktemp(suffix=".aif")
    subprocess.run(["afconvert", "-f", "AIFF", "-d", f"BEI16@{SR}", "-c", "1", path, tmp], check=True)
    f = aifc.open(tmp); s = array.array("h", f.readframes(f.getnframes())); f.close(); os.remove(tmp)
    if sys.byteorder == "little":
        s.byteswap()
    return s


def speech_rms(x):
    win = SR // 20
    rms = [math.sqrt(sum(v * v for v in x[i:i + win]) / win) for i in range(0, len(x) - win, win)]
    loud = [r for r in rms if r > 32768 * 10 ** (-40 / 20)]
    return math.sqrt(sum(r * r for r in loud) / max(1, len(loud)))


def fade(seg, n, out):
    seg = array.array("h", seg)
    for k in range(min(n, len(seg))):
        i = len(seg) - 1 - k if out else k
        seg[i] = int(seg[i] * k / n)
    return seg


def main(take, words_f, a, b, seg_f, seg_words_f, out, out_words):
    a, b = int(a), int(b)
    A, W = load(take), json.load(open(words_f))
    S, SW = load(seg_f), json.load(open(seg_words_f))
    cut1 = W[a]["s"] - 0.03
    cut2 = W[b - 1]["e"] + 0.05
    s0 = max(0.0, SW[0]["s"] - 0.03)
    s1 = SW[-1]["e"] + 0.05
    seg = S[int(s0 * SR):int(s1 * SR)]
    g = speech_rms(A) / max(1, speech_rms(seg))
    seg = array.array("h", (max(-32768, min(32767, int(v * g))) for v in seg))
    f = int(0.015 * SR)
    head = fade(A[:int(cut1 * SR)], f, True)
    tail = fade(A[int(cut2 * SR):], f, False)
    seg = fade(fade(seg, f, False), f, True)
    outs = head + seg + tail
    tmp = tempfile.mktemp(suffix=".wav")
    w = wave.open(tmp, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(outs.tobytes()); w.close()
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "192000", tmp, out], check=True)
    os.remove(tmp)
    seg_len = len(seg) / SR
    start = len(head) / SR
    shift = start + seg_len - cut2
    nw = W[:a] + [{"w": x["w"], "s": round(x["s"] - s0 + start, 3), "e": round(x["e"] - s0 + start, 3)} for x in SW] \
        + [{"w": x["w"], "s": round(x["s"] + shift, 3), "e": round(x["e"] + shift, 3)} for x in W[b:]]
    json.dump(nw, open(out_words, "w"), ensure_ascii=False)
    print(f"cut {cut1:.2f}–{cut2:.2f}s ({cut2 - cut1:.2f}s, {b - a} words) → new {seg_len:.2f}s ({len(SW)} words, gain {20 * math.log10(g):+.1f} dB); "
          f"take {len(A) / SR:.2f}s → {len(outs) / SR:.2f}s")


if __name__ == "__main__":
    if len(sys.argv) != 9:
        sys.exit(__doc__)
    main(*sys.argv[1:])
