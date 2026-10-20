#!/usr/bin/env python3
"""Build the Baqshi film pages from baqshi.tpl.html: one page per language and cut.

usage: python3 motion/build.py [lang ...]      (default: every language that has a voiced take)

For each language with script/strings-<lang>.json and outputs/vo-<lang>/cues.json it writes
motion/data-<lang>.js (strings + cue times + end of speech) and motion/baqshi-<lang>.html (16:9)
+ motion/baqshi-<lang>-9x16.html. Edit the template, never the generated pages.
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
RTL = {"ar"}
# phrases that must not split across lines
NOBREAK = {
    "en": {"fwd": ["it's for"], "back": ["whoever paid"], "stat_build": ["every cost line"], "stat_buy": ["the price"]},
    "es": {"back": ["quien pagó"], "fwd": ["su destinatario"], "stat_build": ["cada línea de costo"], "stat_buy": ["el precio"]},
    "ar": {"tagline": ["أي مكان"], "fwd": ["المستفيد منها"], "back": ["من دفعها"]},
}


def build(lang):
    strings = json.load(open(os.path.join(PROJ, "script", f"strings-{lang}.json")))
    strings.pop("_note", None)
    # line breaks only between the status clauses (a break inside "not / independently audited" reads as the opposite)
    if "status" in strings:  # BQ01 v1 only (status strip removed by the owner 2026-10-20)
        segs = [seg.strip().replace(" ", "\u00a0") for seg in strings["status"].split(" · ")]
        strings["status"] = " ".join(seg + ("\u00a0·" if i < len(segs) - 1 else "") for i, seg in enumerate(segs))
    for key, phrases in NOBREAK.get(lang, {}).items():
        for ph in phrases:
            strings[key] = strings[key].replace(ph, ph.replace(" ", "\u00a0"))
    cues = json.load(open(os.path.join(PROJ, "outputs", f"vo-{lang}", "cues.json")))
    en = json.load(open(os.path.join(PROJ, "script", "strings-en.json")))
    missing = [k for k in en if k != "_note" and k not in strings]
    if missing:
        sys.exit(f"{lang}: strings missing {missing}")
    data = (f"window.LANG = {json.dumps(lang)};\nwindow.STR = {json.dumps(strings, ensure_ascii=False, indent=1)};\n"
            f"window.CUES = {json.dumps(cues['cues'], indent=1)};\nwindow.END = {cues['end']};\n")
    open(os.path.join(HERE, f"data-{lang}.js"), "w").write(data)
    tpl = open(os.path.join(HERE, "baqshi.tpl.html")).read()
    for cut, suffix in (("r16x9", ""), ("r9x16", "-9x16")):
        page = (tpl.replace("{{LANG}}", lang).replace("{{DIR}}", "rtl" if lang in RTL else "ltr").replace("{{CUT}}", cut)
                .replace("<!-- TEMPLATE.", "<!-- GENERATED from baqshi.tpl.html by build.py; do not edit. Template notes:"))
        open(os.path.join(HERE, f"baqshi-{lang}{suffix}.html"), "w").write(page)
    print(f"{lang}: data-{lang}.js, baqshi-{lang}.html, baqshi-{lang}-9x16.html (speech ends {cues['end']:.2f}s)")


if __name__ == "__main__":
    langs = sys.argv[1:] or sorted(d[3:] for d in os.listdir(os.path.join(PROJ, "outputs"))
                                   if d.startswith("vo-") and os.path.exists(os.path.join(PROJ, "outputs", d, "cues.json")))
    for l in langs:
        build(l)
