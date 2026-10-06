#!/usr/bin/env python3
"""Generate the VO for a project from its vo-script.json, check every take with
speech-to-text, and lay take 1 onto the project's silent video.

usage:
  python3 tools/make_vo.py projects/<folder> <voice_id> [--alt <voice_id>] [--takes N] [--v3] [--dry]
                           [--script vo-script-9x16.json] [--bed assets/music/brand-bed-A.mp3@0.22]
  python3 tools/make_vo.py --all [--takes N] [--force]       # every project with a vo-script.json (voices from tools/voices.json)
  python3 tools/make_vo.py projects/<folder> --files <dir>     # use MP3s you made yourself (ElevenLabs website,
                                                              # a phone voice memo…) named <line id>.mp3, skip the API

Writes outputs/vo/<line>_t<n>.mp3 (and <line>_m_t<n>.mp3 for the male alt), a
report outputs/vo/report.md, and outputs/<video>-with-vo.mp4 (+ -alt-vo.mp4).
Needs a paid ElevenLabs plan for library voices. Never prints the API key.
"""
import json, os, re, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import el  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MUX = os.path.join(ROOT, "tools", "mux")
# How the written script is spoken. Tested 2026-10-06 on Arnold (NZ): "Queue Ess Mee" is heard back as "QSME";
# "Q-S-me" / "Q S me" were not. Scripts keep writing "Q-S-me" (readable); a line can override with "text_tts".
PRON = [("Q-S-me", "Queue Ess Mee"), ("QSME", "Queue Ess Mee"), ("qsme.build", "Queue Ess Mee dot build"), ("qsme.co.nz", "Queue Ess Mee dot co dot en zed")]


def spoken(line, v3=False):
    t = line.get("text_tts") or line["text_v3" if v3 else "text_v2"]
    for a, b in PRON:
        t = t.replace(a, b)
    return t


def norm(s):
    s = s.lower().replace("q-s-me", "qsme").replace("q s me", "qsme").replace("qs me", "qsme").replace("cue ess me", "qsme").replace("queue ess mee", "qsme")
    return re.sub(r"[^a-z0-9 ]+", " ", s).split()


def tts(voice, text, out, settings, model, prev=None, nxt=None):
    vs = {"stability": settings["stability"], "similarity_boost": settings["similarity_boost"],
          "style": settings["style"], "use_speaker_boost": settings["use_speaker_boost"], "speed": settings["speed"]}
    body = {"text": text, "model_id": model, "voice_settings": vs if model != "eleven_v3" else {"stability": 0.5}}
    if prev and model != "eleven_v3":
        body["previous_text"] = prev
    if nxt and model != "eleven_v3":
        body["next_text"] = nxt
    audio = el.call("POST", f"/v1/text-to-speech/{voice}?output_format=mp3_44100_128", body, raw=True)
    open(out, "wb").write(audio)


def stt(path):
    import io, contextlib
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        el.main(["stt", path])
    return buf.getvalue().strip()


def run(project, voice, alt=None, takes=2, v3=False, dry=False, script="vo-script.json", bed=None):
    spec = json.load(open(os.path.join(project, script)))
    settings = spec["settings"]
    model = "eleven_v3" if v3 else settings["model"]
    outdir = os.path.join(project, "outputs", "vo" if script == "vo-script.json" else "vo-" + script.replace("vo-script-", "").replace(".json", ""))
    os.makedirs(outdir, exist_ok=True)
    sets = [("", voice, spec["lines"])]
    if alt and spec.get("male_alt_lines"):
        sets.append(("_m", alt, spec["male_alt_lines"]))
    chars = sum(len(l["text_v3" if v3 else "text_v2"]) for _, _, ls in sets for l in ls) * takes
    print(f"{len(sets)} voice(s), {sum(len(ls) for _, _, ls in sets)} lines x {takes} takes ≈ {chars} characters")
    if dry:
        return
    report = ["# VO takes", "", f"model `{model}`, settings {settings}", "", "| File | Text | STT heard | Match |", "|---|---|---|---|"]
    placed = {}
    for suffix, vid, lines in sets:
        for i, l in enumerate(lines):
            text = spoken(l, v3)
            prev = spoken(lines[i - 1]) if i else None
            nxt = spoken(lines[i + 1]) if i + 1 < len(lines) else None
            for t in range(1, takes + 1):
                out = os.path.join(outdir, f"{l['id']}{suffix}_t{t}.mp3")
                tts(vid, text, out, settings, model, prev, nxt)
                # mp3_44100_128 is constant bitrate: seconds ≈ bytes*8/128000. Too long for its slot → retry a touch faster.
                fast = dict(settings)
                while os.path.getsize(out) * 8 / 128000 > l.get("max_s", 99) + 0.35 and fast["speed"] < 1.2 and model != "eleven_v3":
                    fast["speed"] = round(min(1.2, fast["speed"] + 0.07), 2)
                    print(f"   {l['id']} ran {os.path.getsize(out) * 8 / 128000:.2f}s > {l['max_s']}s, retrying at speed {fast['speed']}")
                    tts(vid, text, out, fast, model, prev, nxt)
                heard = stt(out)
                want, got = norm(re.sub(r"\[[^\]]+\]", "", l["text_v2"])), norm(heard)
                ok = "✅" if want == got else ("≈" if set(want) <= set(got) else "⚠️")
                report.append(f"| `{os.path.basename(out)}` | {text} | {heard} | {ok} |")
                print(ok, os.path.basename(out), "→", heard)
                if t == 1:
                    placed.setdefault(suffix, []).append(f"{out}@{l['start_s']}")
    open(os.path.join(outdir, "report.md"), "w").write("\n".join(report) + "\n")
    video = os.path.join(project, spec["video"])
    if not os.path.exists(MUX):
        subprocess.run(["swiftc", "-O", MUX + ".swift", "-o", MUX], check=True)
    for suffix, clips in placed.items():
        out = video.replace(".mp4", "-with-vo.mp4" if not suffix else "-alt-vo.mp4")
        subprocess.run([MUX, video, out, *clips, *(["--bed", bed] if bed else [])], check=True)


def from_files(project, d):
    spec = json.load(open(os.path.join(project, "vo-script.json")))
    clips, missing = [], []
    for l in spec["lines"]:
        f = next((os.path.join(d, l["id"] + ext) for ext in (".mp3", ".m4a", ".wav") if os.path.exists(os.path.join(d, l["id"] + ext))), None)
        if f:
            clips.append(f"{f}@{l['start_s']}")
        else:
            missing.append(l["id"])
    if missing:
        print("missing:", ", ".join(missing))
    if not clips:
        sys.exit("no clips found in " + d)
    video = os.path.join(project, spec["video"])
    if not os.path.exists(MUX):
        subprocess.run(["swiftc", "-O", MUX + ".swift", "-o", MUX], check=True)
    out = video.replace(".mp4", "-with-vo.mp4")
    subprocess.run([MUX, video, out, *clips], check=True)


def run_all(takes=1, force=False):
    voices = json.load(open(os.path.join(ROOT, "tools", "voices.json")))
    P = os.path.join(ROOT, "projects")
    for name in sorted(os.listdir(P)):
        d = os.path.join(P, name); f = os.path.join(d, "vo-script.json")
        if name.startswith("_") or not os.path.exists(f): continue
        spec = json.load(open(f)); ven = spec.get("venture") or ("qsme-nz" if "qsme-nz" in name else "qsme-build")
        out = os.path.join(d, spec["video"]).replace(".mp4", "-with-vo.mp4")
        if os.path.exists(out) and not force:
            print("skip (already voiced):", name); continue
        v = voices[ven]
        print(f"== {name} → {v['voice_name']}")
        run(d, v["voice_id"], alt=v.get("alt_voice_id") if spec.get("male_alt_lines") else None, takes=takes)


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "--all":
        run_all(takes=int(a[a.index("--takes") + 1]) if "--takes" in a else 1, force="--force" in a); sys.exit(0)
    if len(a) >= 3 and a[1] == "--files":
        from_files(a[0], a[2]); sys.exit(0)
    if len(a) < 2:
        sys.exit(__doc__)
    opt = lambda k, d=None: a[a.index(k) + 1] if k in a else d
    run(a[0], a[1], alt=opt("--alt"), takes=int(opt("--takes", 2)), v3="--v3" in a, dry="--dry" in a, script=opt("--script", "vo-script.json"), bed=opt("--bed"))
