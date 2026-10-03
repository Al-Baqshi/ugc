#!/usr/bin/env python3
"""Bundle capture metadata for the motion page: frame stamps of every clip, keystroke events,
and the page coordinates of each card field measured on the hi-res stills. Writes af-data.js."""
import json, os
d = {"clips": {}, "stills": {}}
for name in sorted(os.listdir("clips")):
    f = os.path.join("clips", name, "frames.json")
    if os.path.exists(f):
        j = json.load(open(f))
        d["clips"][name] = {"stamps": j["stamps"], "events": j.get("events"), "n": len(j["stamps"])}
for f in sorted(os.listdir("stills")):
    if f.endswith(".json"):
        j = json.load(open(os.path.join("stills", f)))
        d["stills"][f[:-5]] = {k: j[k] for k in ("dpr", "clip_y", "clip_h", "sy_click", "css_viewport", "rects")}
open("af-data.js", "w").write("window.AF = " + json.dumps(d) + ";\n")
print({k: (v["n"], v["events"]) for k, v in d["clips"].items()})
