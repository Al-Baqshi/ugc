#!/usr/bin/env python3
"""One continuous voice-over take (the audio-first standard), with word timings.

usage:
  python3 tools/vo_one_take.py <take-text.txt> <out_dir> <n> [voice_id]

Sends the whole text in ONE request to ElevenLabs eleven_v3 /with-timestamps (default voice Cam S),
writes <out_dir>/take-<n>.mp3, alignment-<n>.json (character timings) and words-<n>.json
([{w, s, e}] with [bracket] voice tags dropped), and prints length, words per second and the
longest gap between words. Run it 2-3 times in parallel and keep the best take as take.mp3.
Never prints the API key.
"""
import base64, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import el  # noqa: E402

CAM_S = "53CG2aO2HU48thT3QnMl"


def words_from(al):
    words, cur = [], None
    for c, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if c.strip():
            if cur is None:
                cur = {"w": c, "s": s, "e": e}
            else:
                cur["w"] += c
                cur["e"] = e
        elif cur:
            words.append(cur)
            cur = None
    if cur:
        words.append(cur)
    return [w for w in words if not w["w"].startswith("[")]


def main(text_file, out_dir, n, voice=CAM_S):
    text = open(text_file).read().strip()
    d = el.call("POST", f"/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128",
                {"text": text, "model_id": "eleven_v3", "voice_settings": {"stability": 0.5}})
    open(os.path.join(out_dir, f"take-{n}.mp3"), "wb").write(base64.b64decode(d["audio_base64"]))
    al = d.get("normalized_alignment") or d["alignment"]
    json.dump(al, open(os.path.join(out_dir, f"alignment-{n}.json"), "w"))
    words = words_from(al)
    json.dump(words, open(os.path.join(out_dir, f"words-{n}.json"), "w"))
    end = al["character_end_times_seconds"][-1]
    gap = max(((b["s"] - a["e"], b["w"]) for a, b in zip(words, words[1:])), default=(0, ""))
    print(f"take {n}: {end:.2f}s, {len(words)} words, {len(words) / end:.2f} w/s, max gap {gap[0]:.2f}s before '{gap[1]}'")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    main(*sys.argv[1:5])
