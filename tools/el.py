#!/usr/bin/env python3
"""Small ElevenLabs helper for CreativeUGC. Reads ELEVENLABS_API_KEY from ../.env; never prints it.

usage:
  python3 tools/el.py usage
  python3 tools/el.py voices                       # voices in the account
  python3 tools/el.py add <public_owner_id> <voice_id> <name>
  python3 tools/el.py remove <voice_id>
  python3 tools/el.py tts <voice_id> <out.mp3> <text|@file> [model] [stability] [similarity] [style] [speed]
  python3 tools/el.py stt <audio.mp3>              # transcript (pronunciation check)
  python3 tools/el.py music <out.mp3> <prompt|@file> [length_s=30] [--instrumental]   # Eleven Music
  python3 tools/el.py design <outDir> <description|@file> <sample text|@file>   # Voice Design: 3 previews (free plan OK)
  python3 tools/el.py create <generated_voice_id> <name> <description|@file>    # save a designed preview as a voice
"""
import json, os, sys, urllib.request, urllib.error, uuid

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://api.elevenlabs.io"


def key():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if not k:
        for line in open(os.path.join(ROOT, ".env")):
            if line.startswith("ELEVENLABS_API_KEY="):
                k = line.split("=", 1)[1].strip().strip('"').strip("'")
    if not k:
        sys.exit("ELEVENLABS_API_KEY missing in .env")
    return k


def call(method, path, body=None, raw=False, headers=None, data=None):
    h = {"xi-api-key": key()}
    if body is not None:
        data = json.dumps(body).encode()
        h["Content-Type"] = "application/json"
    h.update(headers or {})
    req = urllib.request.Request(API + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            out = r.read()
            return out if raw else json.loads(out or b"{}")
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors="replace")[:600]
        sys.exit(f"HTTP {e.code} on {method} {path}: {msg}")


def main(a):
    cmd = a[0] if a else "usage"
    if cmd == "usage":
        d = call("GET", "/v1/user/subscription")
        print(json.dumps({k: d.get(k) for k in ["tier", "character_count", "character_limit", "voice_slots_used", "voice_limit", "voice_add_edit_counter", "max_voice_add_edits"]}))
    elif cmd == "voices":
        d = call("GET", "/v1/voices")
        for v in d.get("voices", []):
            print(v["voice_id"], "|", v["name"], "|", v.get("category"))
    elif cmd == "add":
        d = call("POST", f"/v1/voices/add/{a[1]}/{a[2]}", {"new_name": a[3]})
        print(d.get("voice_id"))
    elif cmd == "remove":
        call("DELETE", f"/v1/voices/{a[1]}")
        print("removed", a[1])
    elif cmd == "tts":
        vid, out, text = a[1], a[2], a[3]
        if text.startswith("@"):
            text = open(text[1:]).read().strip()
        model = a[4] if len(a) > 4 else "eleven_multilingual_v2"
        st = float(a[5]) if len(a) > 5 else 0.45
        sim = float(a[6]) if len(a) > 6 else 0.8
        sty = float(a[7]) if len(a) > 7 else 0.0
        spd = float(a[8]) if len(a) > 8 else 0.95
        vs = {"stability": st, "similarity_boost": sim, "style": sty, "use_speaker_boost": True, "speed": spd}
        if model == "eleven_v3":  # v3 only takes stability from a fixed set
            vs = {"stability": 0.5 if st >= 0.4 else 0.0}
        audio = call("POST", f"/v1/text-to-speech/{vid}?output_format=mp3_44100_128",
                     {"text": text, "model_id": model, "voice_settings": vs}, raw=True)
        os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
        open(out, "wb").write(audio)
        print(f"wrote {out} ({len(audio)} bytes, {len(text)} chars, {model})")
    elif cmd == "stt":
        path = a[1]
        b = "----el" + uuid.uuid4().hex
        parts = [f'--{b}\r\nContent-Disposition: form-data; name="model_id"\r\n\r\nscribe_v1\r\n'.encode(),
                 f'--{b}\r\nContent-Disposition: form-data; name="language_code"\r\n\r\neng\r\n'.encode(),
                 f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="{os.path.basename(path)}"\r\nContent-Type: audio/mpeg\r\n\r\n'.encode(),
                 open(path, "rb").read(), f"\r\n--{b}--\r\n".encode()]
        d = call("POST", "/v1/speech-to-text", data=b"".join(parts), headers={"Content-Type": f"multipart/form-data; boundary={b}"})
        print(d.get("text"))
    elif cmd == "music":
        out, prompt = a[1], a[2]
        if prompt.startswith("@"): prompt = open(prompt[1:]).read().strip()
        length = int(float(a[3]) * 1000) if len(a) > 3 and not a[3].startswith("--") else 30000
        body = {"prompt": prompt, "music_length_ms": length, "model_id": "music_v1"}
        if "--instrumental" in a: body["force_instrumental"] = True
        audio = None
        for path in ("/v1/music?output_format=mp3_44100_128", "/v1/music/compose?output_format=mp3_44100_128"):
            h = {"xi-api-key": key(), "Content-Type": "application/json"}
            req = urllib.request.Request(API + path, data=json.dumps(body).encode(), method="POST", headers=h)
            try:
                audio = urllib.request.urlopen(req, timeout=300).read(); break
            except urllib.error.HTTPError as e:
                msg = e.read().decode(errors="replace")[:400]
                if e.code in (404, 405): continue
                sys.exit(f"HTTP {e.code} on {path}: {msg}")
        if not audio: sys.exit("music endpoint not found")
        os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
        open(out, "wb").write(audio)
        print(f"wrote {out} ({len(audio)} bytes, {length/1000:.0f}s)")
    elif cmd == "design":
        import base64
        out, desc, text = a[1], a[2], a[3]
        if desc.startswith("@"): desc = open(desc[1:]).read().strip()
        if text.startswith("@"): text = open(text[1:]).read().strip()
        os.makedirs(out, exist_ok=True)
        body = {"voice_description": desc, "text": text, "model_id": "eleven_multilingual_ttv_v2", "guidance_scale": 5, "quality": 0.9}
        h = {"xi-api-key": key(), "Content-Type": "application/json"}
        req = urllib.request.Request(API + "/v1/text-to-voice/design?output_format=mp3_44100_128", data=json.dumps(body).encode(), method="POST", headers=h)
        try:
            d = json.loads(urllib.request.urlopen(req, timeout=180).read())
        except urllib.error.HTTPError as e:
            if e.code not in (404, 405): sys.exit(f"HTTP {e.code} on design: {e.read().decode(errors='replace')[:600]}")
            d = call("POST", "/v1/text-to-voice/create-previews?output_format=mp3_44100_128", {"voice_description": desc, "text": text})
        meta = []
        for i, p in enumerate(d.get("previews", []), 1):
            f = os.path.join(out, f"preview-{i}.mp3")
            open(f, "wb").write(base64.b64decode(p["audio_base_64"]))
            meta.append({"file": f, "generated_voice_id": p["generated_voice_id"], "duration_secs": p.get("duration_secs")})
            print(f"preview {i}: {p['generated_voice_id']} {p.get('duration_secs')}s -> {f}")
        json.dump({"description": desc, "text": d.get("text", text), "previews": meta}, open(os.path.join(out, "previews.json"), "w"), indent=1)
    elif cmd == "create":
        desc = a[3][1:] if a[3].startswith("@") else a[3]
        if a[3].startswith("@"): desc = open(desc).read().strip()
        d = call("POST", "/v1/text-to-voice", {"voice_name": a[2], "voice_description": desc[:1000], "generated_voice_id": a[1]})
        if "voice_id" not in d:
            d = call("POST", "/v1/text-to-voice/create-voice-from-preview", {"voice_name": a[2], "voice_description": desc[:1000], "generated_voice_id": a[1]})
        print(d.get("voice_id"))
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv[1:])
