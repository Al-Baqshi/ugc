#!/usr/bin/env python3
"""Build the BQ02 film pages from bq02.tpl.html: one page per cut.

usage: python3 motion/build.py [lang ...]      (default: en)

Writes motion/data-<lang>.js (strings + cue times + end of speech) and motion/bq02-<lang>.html (16:9) +
motion/bq02-<lang>-9x16.html. Edit the template, never the generated pages.
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)


def build(lang):
    strings = json.load(open(os.path.join(PROJ, "script", f"strings-{lang}.json")))
    strings.pop("_note", None)
    cues = json.load(open(os.path.join(PROJ, "outputs", f"vo-{lang}", "cues.json")))
    data = (f"window.LANG = {json.dumps(lang)};\nwindow.STR = {json.dumps(strings, ensure_ascii=False, indent=1)};\n"
            f"window.CUES = {json.dumps(cues['cues'], indent=1)};\nwindow.END = {cues['end']};\n")
    open(os.path.join(HERE, f"data-{lang}.js"), "w").write(data)
    tpl = open(os.path.join(HERE, "bq02.tpl.html")).read()
    for cut, suffix in (("r16x9", ""), ("r9x16", "-9x16")):
        page = (tpl.replace("{{LANG}}", lang).replace("{{CUT}}", cut)
                .replace("<!-- TEMPLATE.", "<!-- GENERATED from bq02.tpl.html by build.py; do not edit. Template notes:"))
        open(os.path.join(HERE, f"bq02-{lang}{suffix}.html"), "w").write(page)
    print(f"{lang}: data-{lang}.js, bq02-{lang}.html, bq02-{lang}-9x16.html (speech ends {cues['end']:.2f}s)")


if __name__ == "__main__":
    for l in sys.argv[1:] or ["en"]:
        build(l)
