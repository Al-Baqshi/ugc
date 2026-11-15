#!/usr/bin/env python3
"""VoiceStudio helper for CreativeUGC: the local, open-source voice backend (https://github.com/debpalash/VoiceStudio),
a sibling of tools/el.py. Talks to the running VoiceStudio app on this machine (default http://127.0.0.1:3900).
Reads VOICESTUDIO_URL and VOICESTUDIO_API_KEY from the environment or ../.env; never prints the key.

usage:
  python3 tools/vs.py health                                   # is the backend up, which GPU, which engine
  python3 tools/vs.py voices                                   # voice profiles: id | name | kind | language
  python3 tools/vs.py tts <profile_id|name> <out.mp3> <text|@file> [--engine omnivoice] [--speed 1.0] [--seed N] [--language en]
  python3 tools/vs.py stt <audio> [--words out.json]          # transcript; --words also saves [{w,s,e}] word timings
  python3 tools/vs.py clone <name> <audio.wav|mp3|m4a> [--text "what the clip says"] [--language en]
                                                               # new clone profile from 3-60 s of clean speech, prints its id
  python3 tools/vs.py mcp                                      # the .mcp.json entry for VoiceStudio's MCP server

Licence note: VoiceStudio's default engine (OmniVoice) has NON-COMMERCIAL weights. Rehearsal takes and the owner's
own review are fine; a paid ad needs a permissively licensed engine (--engine cosyvoice, voxcpm2, moss-tts-v15 …)
after you have checked that model's card. See research/2026-10-20-voicestudio-integration.md.
"""
import json, os, re, sys, urllib.error, urllib.request, uuid

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MIME = {".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".wav": "audio/wav", ".aac": "audio/aac", ".ogg": "audio/ogg", ".flac": "audio/flac"}
# Bracket tags VoiceStudio's default engine understands. Anything else (ElevenLabs v3 tags like [sighs], [excited])
# would be read aloud as text, so tts() drops them and says so.
KNOWN_TAGS = re.compile(r"\[(pause(?: [0-9.]+(?:ms|s))?|laughter|sigh|breath)\]", re.I)
ANY_TAG = re.compile(r"\[[^\]]+\]")


def _env(name, default=""):
    v = os.environ.get(name)
    if v:
        return v
    try:
        for line in open(os.path.join(ROOT, ".env")):
            if line.startswith(name + "="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return default


def base():
    return _env("VOICESTUDIO_URL", "http://127.0.0.1:3900").rstrip("/")


def _headers(extra=None):
    h = {"X-OmniVoice-Client-Id": "creativeugc"}
    k = _env("VOICESTUDIO_API_KEY") or _env("OMNIVOICE_API_KEY")
    if k:
        h["Authorization"] = "Bearer " + k
    h.update(extra or {})
    return h


def call(method, path, body=None, raw=False, data=None, headers=None, timeout=600):
    h = _headers(headers)
    if body is not None:
        data = json.dumps(body).encode()
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(base() + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            out = r.read()
            return out if raw else json.loads(out or b"{}")
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors="replace")[:600]
        sys.exit(f"VoiceStudio HTTP {e.code} on {method} {path}: {msg}")
    except urllib.error.URLError as e:
        sys.exit(f"VoiceStudio not reachable at {base()} ({e.reason}). Open the VoiceStudio app, or set VOICESTUDIO_URL in .env.")


def multipart(fields, files):
    """fields: {name: str}; files: [(field, path, mime)] → (body, content-type)"""
    b = "----vs" + uuid.uuid4().hex
    parts = []
    for k, v in fields.items():
        parts.append(f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode())
    for field, path, mime in files:
        parts.append(f'--{b}\r\nContent-Disposition: form-data; name="{field}"; filename="{os.path.basename(path)}"\r\nContent-Type: {mime}\r\n\r\n'.encode())
        parts.append(open(path, "rb").read())
        parts.append(b"\r\n")
    parts.append(f"--{b}--\r\n".encode())
    return b"".join(parts), f"multipart/form-data; boundary={b}"


def health():
    try:
        return call("GET", "/health", timeout=10)
    except SystemExit as e:
        return {"error": str(e)}


def voices():
    d = call("GET", "/profiles")
    items = d.get("profiles", d) if isinstance(d, dict) else d
    return items if isinstance(items, list) else []


def resolve_profile(name_or_id):
    """A profile id passes through; a name is looked up (case-insensitive, exact, unique)."""
    for p in voices():
        if p.get("id") == name_or_id:
            return p["id"]
    hits = [p for p in voices() if (p.get("name") or "").strip().lower() == name_or_id.strip().lower()]
    if len(hits) == 1:
        return hits[0]["id"]
    if len(hits) > 1:
        sys.exit(f"{len(hits)} VoiceStudio profiles are named {name_or_id!r}; use the id instead")
    return name_or_id  # let the backend decide (it also accepts names)


def clean_tags(text):
    """Keep the tags VoiceStudio knows, drop the rest. Returns (text, dropped)."""
    dropped = sorted({t for t in ANY_TAG.findall(text) if not KNOWN_TAGS.fullmatch(t)})
    for t in dropped:
        text = text.replace(t, "")
    return re.sub(r"[ \t]{2,}", " ", text).strip(), dropped


def tts(profile, text, out, engine=None, speed=1.0, seed=None, language=None, fmt="mp3"):
    text, dropped = clean_tags(text)
    if dropped:
        print(f"[vs] dropped tags VoiceStudio would read aloud: {', '.join(dropped)}", file=sys.stderr)
    body = {"model": engine or _env("VOICESTUDIO_ENGINE", "omnivoice"), "input": text, "voice": resolve_profile(profile),
            "response_format": fmt, "speed": float(speed)}
    if seed is not None:
        body["seed"] = int(seed)
    if language:
        body["language"] = language
    audio = call("POST", "/v1/audio/speech", body, raw=True)
    os.makedirs(os.path.dirname(os.path.abspath(out)) or ".", exist_ok=True)
    open(out, "wb").write(audio)
    return out, len(audio)


def stt(path, words=True, language=None):
    """Transcript (+ word timings as [{w,s,e}]) from VoiceStudio's local transcription (WhisperX by default)."""
    fields = {"model": "whisper-1", "response_format": "verbose_json" if words else "json"}
    if words:
        fields["timestamp_granularities[]"] = "word"
    if language:
        fields["language"] = language
    data, ct = multipart(fields, [("file", path, MIME.get(os.path.splitext(path)[1].lower(), "application/octet-stream"))])
    d = call("POST", "/v1/audio/transcriptions", data=data, headers={"Content-Type": ct})
    ws = [{"w": w.get("word", "").strip(), "s": round(float(w["start"]), 3), "e": round(float(w["end"]), 3)}
          for w in (d.get("words") or []) if w.get("word", "").strip()]
    return (d.get("text") or "").strip(), ws


def clone(name, audio, text="", language="Auto"):
    fields = {"name": name, "ref_text": text, "language": language, "kind": "clone"}
    data, ct = multipart(fields, [("ref_audio", audio, MIME.get(os.path.splitext(audio)[1].lower(), "application/octet-stream"))])
    d = call("POST", "/profiles", data=data, headers={"Content-Type": ct})
    return d.get("id") or d.get("profile_id") or d


MCP_ENTRY = {"voicestudio": {"type": "http", "url": "http://127.0.0.1:3900/mcp/", "headers": {"X-OmniVoice-Client-Id": "creativeugc"}}}


def main(a):
    cmd = a[0] if a else "help"
    opt = lambda k, d=None: a[a.index(k) + 1] if k in a else d
    if cmd == "health":
        print(json.dumps(health(), indent=1)[:1500])
    elif cmd == "voices":
        for p in voices():
            print(p.get("id"), "|", p.get("name"), "|", p.get("kind", ""), "|", p.get("language", ""))
    elif cmd == "tts":
        text = a[3]
        if text.startswith("@"):
            text = open(text[1:]).read().strip()
        out, n = tts(a[1], text, a[2], engine=opt("--engine"), speed=opt("--speed", 1.0), seed=opt("--seed"), language=opt("--language"))
        print(f"wrote {out} ({n} bytes, {len(text)} chars)")
    elif cmd == "stt":
        text, ws = stt(a[1], words=True)
        print(text)
        if "--words" in a:
            json.dump(ws, open(opt("--words"), "w"), ensure_ascii=False)
            print(f"{len(ws)} words → {opt('--words')}", file=sys.stderr)
    elif cmd == "clone":
        print(clone(a[1], a[2], text=opt("--text", ""), language=opt("--language", "Auto")))
    elif cmd == "mcp":
        print(json.dumps({"mcpServers": MCP_ENTRY}, indent=2))
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv[1:])
