#!/usr/bin/env python3
"""Cue-marked scripts → one-take VO text, and cue times from the take's word timings.

A script marks the beats the picture follows with {name} right before the words they belong to:
    {h1}Five strangers. {h2}Two countries. {h3}One property.

usage:
  python3 tools/cue_take.py prep  <script.txt> <out_dir> [spell.json]
      writes <out_dir>/take-text.txt (markers removed, TTS spellings applied) and <out_dir>/cues-src.json
      (each cue with the first words that follow it). spell.json = {"written": "spoken", ...}, applied
      longest key first (e.g. {"baqshi.com": "Bakshi dot com", "QSME": "Queue Ess Mee"}).
  python3 tools/cue_take.py times <out_dir> [words.json]
      matches every cue to the take's words (default <out_dir>/words.json) in order and writes
      <out_dir>/cues.json = {"cues": {name: start_s}, "end": last_word_end_s}. Fails loudly on a miss.
  python3 tools/cue_take.py scale <words.json> <out.json> <rate>
      word timings for a take sped up with tools/tempo by <rate> (times / rate).

Works for any language: matching ignores case, punctuation and Arabic diacritics/tatweel.
"""
import json, os, re, sys, unicodedata

MARK = re.compile(r"\{([a-z0-9_]+)\}")


def norm(w):
    w = unicodedata.normalize("NFKC", w).lower()
    w = re.sub(r"[ً-ْٰـ]", "", w)            # Arabic harakat + tatweel
    w = re.sub(r"[آأإ]", "ا", w)               # alef forms → bare alef
    w = w.replace("ة", "ه").replace("ى", "ي")   # ta marbuta → ha, alef maqsura → ya
    return re.sub(r"[^\w]", "", w)


def spell(text, table):
    for k in sorted(table, key=len, reverse=True):
        text = text.replace(k, table[k])
    return text


def prep(script, out_dir, spell_file=None):
    src = open(script).read().strip()
    table = json.load(open(spell_file)) if spell_file else {}
    src = spell(src, table)
    cues, words = [], []
    for tok in re.split(r"(\{[a-z0-9_]+\})|\s+", src):
        if not tok:
            continue
        m = MARK.fullmatch(tok)
        if m:
            cues.append({"name": m.group(1), "at": len(words)})
        elif not tok.startswith("["):
            words.append(tok)
    for c in cues:
        c["next"] = [norm(w) for w in words[c["at"]:c["at"] + 3] if norm(w)]
    text = re.sub(r"[ \t]+", " ", MARK.sub("", src))
    text = "\n".join(line.strip() for line in text.split("\n"))
    os.makedirs(out_dir, exist_ok=True)
    open(os.path.join(out_dir, "take-text.txt"), "w").write(text + "\n")
    json.dump({"words": len(words), "cues": cues}, open(os.path.join(out_dir, "cues-src.json"), "w"), ensure_ascii=False, indent=1)
    print(f"{len(words)} words, {len(cues)} cues → {out_dir}/take-text.txt")


def times(out_dir, words_file=None):
    src = json.load(open(os.path.join(out_dir, "cues-src.json")))
    words = json.load(open(words_file or os.path.join(out_dir, "words.json")))
    nw = [norm(w["w"]) for w in words]
    out, pos, scale = {}, 0, len(words) / max(1, src["words"])
    for c in src["cues"]:
        want = c["next"]
        hit = None
        for i in range(pos, len(nw)):
            if nw[i] == want[0] and all(i + j < len(nw) and nw[i + j] == want[j] for j in range(1, min(2, len(want)))):
                hit = i
                break
        if hit is None:  # fall back: first word match only, near the expected index
            guess = int(c["at"] * scale)
            near = [i for i in range(max(pos, guess - 6), min(len(nw), guess + 7)) if nw[i] == want[0]]
            hit = near[0] if near else None
        if hit is None:
            sys.exit(f"cue {c['name']}: no match for {want} after word {pos} ({words[pos]['w'] if pos < len(words) else 'end'})")
        out[c["name"]] = round(words[hit]["s"], 3)
        pos = hit
    res = {"cues": out, "end": round(words[-1]["e"], 3)}
    json.dump(res, open(os.path.join(out_dir, "cues.json"), "w"), ensure_ascii=False, indent=1)
    print(f"{len(out)} cues matched; last word ends {res['end']:.2f}s → {out_dir}/cues.json")


def scale(src, out, rate):
    rate = float(rate)
    words = [{"w": w["w"], "s": round(w["s"] / rate, 3), "e": round(w["e"] / rate, 3)} for w in json.load(open(src))]
    json.dump(words, open(out, "w"), ensure_ascii=False)
    print(f"{len(words)} words scaled by 1/{rate} → {out}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) >= 3 and a[0] == "prep":
        prep(*a[1:4])
    elif len(a) == 4 and a[0] == "scale":
        scale(*a[1:4])
    elif len(a) >= 2 and a[0] == "times":
        times(*a[1:3])
    else:
        sys.exit(__doc__)
