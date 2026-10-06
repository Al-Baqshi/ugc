#!/usr/bin/env python3
"""One continuous voice take for a whole script (no per-line cuts), sliced at ElevenLabs' word timestamps
and laid onto the video at each line's start time, with a ducked music bed.

  python3 tools/vo_take.py projects/<folder> <voice_id> --label arnold [--script vo-script-9x16.json]
        [--bed assets/music/brand-bed-A.mp3] [--vo-gain 1.15] [--bed-gain 0.09] [--duck 0.03]
        [--stability 0.35] [--style 0.45] [--speed 1.0]
"""
import base64, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import el
from make_vo import spoken, norm
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

a = sys.argv[1:]
opt = lambda k, d=None: a[a.index(k) + 1] if k in a else d
project, voice = a[0], a[1]
script = opt("--script", "vo-script.json"); label = opt("--label", voice[:6])
spec = json.load(open(os.path.join(project, script)))
lines = spec["lines"]
# continuous text: a blank line between lines gives the voice a natural pause without a cut
parts = [spoken(l) for l in lines]
text = "\n\n".join(parts)
vs = {"stability": float(opt("--stability", 0.35)), "similarity_boost": 0.8, "style": float(opt("--style", 0.45)),
      "use_speaker_boost": True, "speed": float(opt("--speed", 1.0))}
outdir = os.path.join(project, "outputs", "vo-take-" + label); os.makedirs(outdir, exist_ok=True)
take = os.path.join(outdir, "take.mp3"); alf = os.path.join(outdir, "alignment.json")
if "--remux" in a and os.path.exists(alf):          # re-place / re-mix without calling ElevenLabs again
    al = json.load(open(alf))
else:
    res = el.call("POST", f"/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128",
                  {"text": text, "model_id": "eleven_multilingual_v2", "voice_settings": vs})
    open(take, "wb").write(base64.b64decode(res["audio_base64"]))
    al = res["alignment"]; json.dump(al, open(alf, "w"))
chars, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
# map each line to its character span in the joined text
pos, spans = 0, []
for p in parts:
    i = text.index(p, pos); spans.append((i, i + len(p))); pos = i + len(p)
heard = subprocess.run(["python3", os.path.join(ROOT, "tools", "el.py"), "stt", take], capture_output=True, text=True).stdout.strip()
print(f"take: {len(text)} chars, {en[-1]:.1f}s audio, {os.path.getsize(take)//1024} KB\nheard: {heard}\n")
clips, report, prev_end = [], [], 0.0
GAP = 0.08   # a line never starts before the previous one has finished (no overlapping speech)
for l, (i0, i1) in zip(lines, spans):
    idx = [k for k in range(i0, i1) if not chars[k].isspace()]
    t0, t1 = max(0, st[idx[0]] - 0.06), min(en[-1], en[idx[-1]] + 0.12)
    f = os.path.join(outdir, f"{l['id']}.m4a")
    subprocess.run([os.path.join(ROOT, "tools", "slice"), take, f, f"{t0:.3f}", f"{t1:.3f}"], check=True)
    dur = t1 - t0
    at = max(float(l["start_s"]), prev_end + GAP); shift = at - float(l["start_s"]); prev_end = at + dur
    fit = "ok" if dur <= l["max_s"] + 0.3 else f"LONG by {dur - l['max_s']:.1f}s"
    report.append(f"  {l['start_s']:>6}s{'' if shift < 0.05 else f' →{at:6.2f}s (+{shift:.2f})':>16}  {dur:4.2f}s/{l['max_s']}s {fit:12} {l['text_v2']}")
    clips.append(f"{f}@{at:.3f}@{opt('--vo-gain', '1.15')}")
print("\n".join(report))
video = os.path.join(project, spec["video"])
out = video.replace(".mp4", f"-with-vo-{label}.mp4")
bed = opt("--bed"); bedarg = ["--bed", f"{bed}@{opt('--bed-gain', '0.09')}@{opt('--duck', '0.03')}"] if bed else []
subprocess.run([os.path.join(ROOT, "tools", "mux"), video, out, *clips, *bedarg], check=True, stdout=subprocess.DEVNULL)
print("wrote", out)
