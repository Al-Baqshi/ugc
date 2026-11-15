#!/usr/bin/env python3
"""One voice call, any provider. The pipeline (cue_take → motion re-time → mux) only needs two things from a
voice provider: an audio take and its word timings. This tool gives both, from ElevenLabs or from a local
VoiceStudio, chosen per voice in tools/voices.json ("provider": "elevenlabs" (default) | "voicestudio").

usage:
  python3 tools/voice.py doctor                                  # which providers are configured and reachable
  python3 tools/voice.py voices                                  # every voice in tools/voices.json, its provider, ready or not
  python3 tools/voice.py take <text.txt> <out_dir> --voice <name|id> [--n 1] [--provider elevenlabs|voicestudio]
                                                                 [--engine …] [--speed 1.0] [--seed N] [--language en]
      one unbroken take → <out_dir>/take[-n].mp3 + words[-n].json ([{w,s,e}], bracket tags dropped) + transcript check;
      prints length, words/s and the longest gap. <text.txt> may be @- for stdin.
  python3 tools/voice.py stt <audio> [--provider …] [--words out.json]

How the timings are made: ElevenLabs returns them with the audio (/with-timestamps); VoiceStudio returns audio
only, so the take is transcribed locally with word timestamps (WhisperX ±10–30 ms). Same words.json either way.
Keys live in .env (ELEVENLABS_API_KEY…, VOICESTUDIO_URL, VOICESTUDIO_API_KEY). Never printed.
"""
import base64, json, os, re, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICES = os.path.join(ROOT, "tools", "voices.json")
PROVIDERS = ("elevenlabs", "voicestudio")
TAG = re.compile(r"\[[^\]]+\]")


def voices():
    d = json.load(open(VOICES))
    return {k: v for k, v in d.items() if not k.startswith("_") and isinstance(v, dict)}


def resolve(name, provider=None):
    """--voice <name in voices.json> or a raw id → (provider, entry)."""
    vs = voices()
    if name in vs:
        e = dict(vs[name]); e.setdefault("provider", "elevenlabs"); e["name"] = name
        if provider and provider != e["provider"]:
            sys.exit(f"{name} is a {e['provider']} voice; drop --provider or pick a {provider} voice")
        return e["provider"], e
    p = provider or os.environ.get("VOICE_PROVIDER", "elevenlabs")
    if p not in PROVIDERS:
        sys.exit(f"unknown provider {p!r}; use one of {PROVIDERS}")
    key = "voice_id" if p == "elevenlabs" else "profile_id"
    return p, {key: name, "name": name, "provider": p}


def ready(entry):
    p = entry.get("provider", "elevenlabs")
    if p == "elevenlabs":
        return bool(entry.get("voice_id")), "needs voice_id"
    return bool(entry.get("profile_id")), "needs profile_id (python3 tools/vs.py clone … then paste the id)"


# ── ElevenLabs ───────────────────────────────────────────────────────────────

def el_take(entry, text, out_audio):
    import el
    model = entry.get("model", "eleven_v3")
    vs = {"stability": 0.5} if model == "eleven_v3" else {"stability": 0.45, "similarity_boost": 0.8, "style": 0.0, "use_speaker_boost": True}
    d = el.call("POST", f"/v1/text-to-speech/{entry['voice_id']}/with-timestamps?output_format=mp3_44100_128",
                {"text": text, "model_id": model, "voice_settings": vs})
    open(out_audio, "wb").write(base64.b64decode(d["audio_base64"]))
    al = d.get("normalized_alignment") or d["alignment"]
    words, cur = [], None
    for c, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if c.strip():
            cur = {"w": c, "s": s, "e": e} if cur is None else {**cur, "w": cur["w"] + c, "e": e}
        elif cur:
            words.append(cur); cur = None
    if cur:
        words.append(cur)
    words = [w for w in words if not w["w"].startswith("[")]
    heard = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "el.py"), "stt", out_audio], capture_output=True, text=True).stdout.strip()
    return words, heard, al


def el_stt(path):
    out = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "el.py"), "stt", path], capture_output=True, text=True)
    return out.stdout.strip(), []


# ── VoiceStudio ──────────────────────────────────────────────────────────────

def vs_take(entry, text, out_audio, engine=None, speed=1.0, seed=None, language=None):
    import vs
    vs.tts(entry["profile_id"], text, out_audio, engine=engine or entry.get("engine"), speed=speed, seed=seed,
           language=language or entry.get("language"))
    heard, words = vs.stt(out_audio, words=True, language=language or entry.get("language"))
    return words, heard, None


def vs_stt(path):
    import vs
    return vs.stt(path, words=True)


# ── Common ───────────────────────────────────────────────────────────────────

def take(text_file, out_dir, voice, n=None, provider=None, engine=None, speed=1.0, seed=None, language=None):
    text = (sys.stdin.read() if text_file == "@-" else open(text_file).read()).strip()
    p, entry = resolve(voice, provider)
    ok, why = ready(entry)
    if not ok:
        sys.exit(f"voice {entry['name']!r} is not set up: {why}")
    os.makedirs(out_dir, exist_ok=True)
    suf = f"-{n}" if n else ""
    audio = os.path.join(out_dir, f"take{suf}.mp3")
    if p == "elevenlabs":
        words, heard, al = el_take(entry, text, audio)
    else:
        words, heard, al = vs_take(entry, text, audio, engine=engine, speed=speed, seed=seed, language=language)
    json.dump(words, open(os.path.join(out_dir, f"words{suf}.json"), "w"), ensure_ascii=False)
    if al:
        json.dump(al, open(os.path.join(out_dir, f"alignment{suf}.json"), "w"))
    open(os.path.join(out_dir, f"transcript{suf}.txt"), "w").write(heard + "\n")
    end = words[-1]["e"] if words else 0.0
    gap = max(((b["s"] - a["e"], b["w"]) for a, b in zip(words, words[1:])), default=(0.0, ""))
    want = norm(TAG.sub("", text)); got = norm(heard)
    verdict = "✅ transcript matches" if want == got else ("≈ transcript close" if len(set(want) ^ set(got)) <= max(2, len(want) // 20) else "⚠️ transcript differs")
    print(f"{p} · {entry['name']}: {end:.2f}s, {len(words)} words, {len(words) / end if end else 0:.2f} w/s, max gap {gap[0]:.2f}s before '{gap[1]}'")
    print(f"heard: {heard}")
    print(verdict, "→", audio, "+", os.path.join(out_dir, f"words{suf}.json"))
    return audio


def norm(s):
    s = s.lower().replace("q-s-me", "qsme").replace("queue ess mee", "qsme").replace("cue ess me", "qsme")
    return re.sub(r"[^\w ]+", " ", s).split()


def doctor():
    """Which providers can run right now."""
    import vs
    lines = []
    el_keys = [k for k in os.environ if k.startswith("ELEVENLABS_API_KEY")]
    try:
        env = open(os.path.join(ROOT, ".env")).read()
        el_keys += re.findall(r"^(ELEVENLABS_API_KEY\w*)=.+$", env, re.M)
    except FileNotFoundError:
        pass
    if el_keys:
        out = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "el.py"), "usage"], capture_output=True, text=True)
        status = (out.stdout or out.stderr).strip().splitlines()
        lines.append(("elevenlabs", "configured", status[:3]))
    else:
        lines.append(("elevenlabs", "no key", ["add ELEVENLABS_API_KEY to .env"]))
    h = vs.health()
    if h.get("status") == "ok":
        lines.append(("voicestudio", "up", [f"{vs.base()} · device {h.get('device')} · v{h.get('version')}"]))
    elif h.get("status") == "starting":
        lines.append(("voicestudio", "starting", [h.get("label", "")]))
    else:
        lines.append(("voicestudio", "down", [h.get("error", "not reachable")[:160], "open the VoiceStudio app (Apple Silicon Mac) or set VOICESTUDIO_URL"]))
    for name, state, notes in lines:
        print(f"{name:12} {state}")
        for n in notes:
            print(f"{'':12}   {n}")
    print()
    for name, e in voices().items():
        ok, why = ready({**e, "provider": e.get("provider", "elevenlabs")})
        print(f"{name:14} {e.get('provider', 'elevenlabs'):12} {'ready' if ok else 'not set up: ' + why}  {e.get('voice_name', '')}")
    print("\nSet VOICE_PROVIDER or use --provider to pick the default for raw ids; per-voice provider lives in tools/voices.json.")


def main(a):
    cmd = a[0] if a else "help"
    opt = lambda k, d=None: a[a.index(k) + 1] if k in a else d
    if cmd == "doctor":
        doctor()
    elif cmd == "voices":
        for name, e in voices().items():
            ok, why = ready({**e, "provider": e.get("provider", "elevenlabs")})
            print(f"{name:14} {e.get('provider', 'elevenlabs'):12} {'ready' if ok else 'not set up'}  {e.get('voice_name', e.get('note', ''))[:60]}")
    elif cmd == "take":
        if len(a) < 3 or "--voice" not in a:
            sys.exit(__doc__)
        take(a[1], a[2], opt("--voice"), n=opt("--n"), provider=opt("--provider"), engine=opt("--engine"),
             speed=float(opt("--speed", 1.0)), seed=opt("--seed"), language=opt("--language"))
    elif cmd == "stt":
        p = opt("--provider", os.environ.get("VOICE_PROVIDER", "elevenlabs"))
        text, words = (vs_stt if p == "voicestudio" else el_stt)(a[1])
        print(text)
        if "--words" in a:
            json.dump(words, open(opt("--words"), "w"), ensure_ascii=False)
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv[1:])
