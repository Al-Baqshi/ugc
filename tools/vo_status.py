#!/usr/bin/env python3
"""Which videos are voice-ready? Checks every project for a valid vo-script.json, its video, and line timing."""
import json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, "projects")
bad = 0
print(f"{'project':58} {'video':5} {'lines':>5} {'chars':>5} {'voiced':6} issues")
for name in sorted(os.listdir(P)):
    d = os.path.join(P, name)
    if name.startswith(("_", ".")) or not os.path.isdir(d): continue
    vids = [f for f in os.listdir(os.path.join(d, "outputs")) if f.endswith(".mp4") and "-with-vo" not in f and "-alt-vo" not in f] if os.path.isdir(os.path.join(d, "outputs")) else []
    if not vids: continue
    f = os.path.join(d, "vo-script.json"); issues = []; notes = []
    if not os.path.exists(f):
        print(f"{name:58} {'yes':5} {'-':>5} {'-':>5} {'-':6} NO vo-script.json"); bad += 1; continue
    try: s = json.load(open(f))
    except Exception as e:
        print(f"{name:58} {'yes':5} {'-':>5} {'-':>5} {'-':6} invalid JSON: {e}"); bad += 1; continue
    lines = s.get("lines") or []
    if not s.get("video") or not os.path.exists(os.path.join(d, s.get("video", ""))): issues.append(f"video missing: {s.get('video')}")
    for l in lines:
        for k in ("id", "start_s", "max_s", "text_v2"):
            if k not in l: issues.append(f"{l.get('id','?')}: no {k}")
        words = len(re.findall(r"[\w'-]+", re.sub(r"\[[^\]]+\]", "", l.get("text_v2", ""))))
        if l.get("max_s") and words / 3.2 > l["max_s"] + 0.2: issues.append(f"{l.get('id')}: {words} words in {l['max_s']}s (too long)")
        elif l.get("max_s") and words / 2.7 > l["max_s"] + 0.2: notes.append(f"{l.get('id')} tight")
        if re.search(r"\bQSME\b", l.get("text_v2", "")): issues.append(f"{l.get('id')}: write QSME as Q-S-me")
    chars = sum(len(l.get("text_v2", "")) for l in lines) + sum(len(l.get("text_v2", "")) for l in s.get("male_alt_lines") or [])
    voiced = "yes" if any(x.endswith("-with-vo.mp4") for x in os.listdir(os.path.join(d, "outputs"))) else "no"
    bad += bool(issues)
    print(f"{name:58} {'yes':5} {len(lines):>5} {chars:>5} {voiced:6} {'; '.join(issues) or 'ok'}{'  (' + ', '.join(notes) + ')' if notes else ''}")
sys.exit(1 if bad else 0)
