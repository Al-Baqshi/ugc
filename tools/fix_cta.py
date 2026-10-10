#!/usr/bin/env python3
"""Swap only the spoken NZ CTA at the end of finished takes, keep everything else.

usage: python3 tools/fix_cta.py [--dry]

For every NZ take in TAKES: generates one CTA clip (Cam S, eleven_v3, "dot Co"), finds the old
"Sign up at Queue Ess Mee dot koh dot en zed" in the take's alignment, cuts in the silence before it,
places the new line so its first word lands where the old one did (the end card stays in sync),
matches loudness, keeps anything said after the CTA, and re-mixes the take onto each master at 0.0 s, gain 1.15.
The old take is archived in outputs/archive/vo-koh-2026-10-10/<take dir>/.
"""
import array, base64, json, os, re, shutil, subprocess, sys, wave

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import el  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, "projects")
VOICE = "53CG2aO2HU48thT3QnMl"
CTA = "Sign up at Queue Ess Mee dot Co dot N Z."
OLD = re.compile(r"[Ss]ign up at Queue Ess Mee dot koh dot en zed\.?")
SR = 44100
WIN = int(SR * 0.01)
# take dir → masters it is laid onto (with-vo = master with -with-vo)
TAKES = {
    "2026-10-02-qsme-nz-which-dave/outputs/vo-take-cam-v3": ["which-dave-30s-9x16", "which-dave-30s-4x5"],
    "2026-10-06-qsme-nz-back-corner/outputs/vo-take-cam-v3": ["back-corner-9x16"],
    "2026-10-10-qsme-nz-auckland-first/outputs/vo-take-cam-v3": ["auckland-first-16x9", "auckland-first-9x16"],
    "2026-10-10-qsme-nz-auckland-first/outputs/vo-take-cam-v3-short": ["auckland-first-9x16-short"],
    "2026-10-13-qsme-nz-granny-flat-for-mum/outputs/vo-take-cam-v3": ["granny-flat-for-mum-9x16"],
    "2026-10-15-qsme-nz-walk-away-number/outputs/vo-take-cam-v3": ["walk-away-number-9x16"],
    "2026-10-18-qsme-nz-address-to-site-report/outputs/vo-take-cam-v3": ["address-to-site-report-16x9"],
    "2026-10-18-qsme-nz-address-to-site-report/outputs/vo-take-cam-v3-ch03": ["address-to-site-report-ch03-strong-then-scrolled-9x16"],
    "2026-10-18-qsme-nz-address-to-site-report/outputs/vo-take-cam-v3-ch06-07": ["address-to-site-report-ch06-07-one-page-for-the-planner-9x16"],
    "2026-10-20-qsme-nz-apples-oranges-pineapple/outputs/vo-take-cam-v3": ["which-ones-cheapest-9x16", "which-ones-cheapest-4x5"],
    "2026-10-22-qsme-nz-thumbs-up-contract/outputs/vo-take-cam-v3": ["thumbs-up-contract-9x16"],
    "2026-10-24-qsme-nz-pricing-a-build-line-by-line/outputs/vo-take-cam-v3": ["pricing-a-build-16x9"],
    "2026-10-24-qsme-nz-pricing-a-build-line-by-line/outputs/vo-take-cam-v3-a": ["pricing-a-build-9x16-found-before-the-tender"],
    "2026-10-24-qsme-nz-pricing-a-build-line-by-line/outputs/vo-take-cam-v3-b": ["pricing-a-build-9x16-same-lines-every-bidder"],
    "2026-10-24-qsme-nz-pricing-a-build-line-by-line/outputs/vo-take-cam-v3-c": ["pricing-a-build-9x16-ai-drafts-you-check"],
    "2026-10-26-qsme-nz-programme-survives-christmas/outputs/vo-take-cam-v3": ["programme-survives-christmas-16x9"],
    "2026-10-26-qsme-nz-programme-survives-christmas/outputs/vo-take-cam-v3-9x16": ["january-lie-9x16"],
    "2026-10-28-qsme-nz-pen-on-a-string/outputs/vo-take-cam-v3": ["pen-on-a-string-9x16"],
    "2026-11-01-qsme-nz-ccc-hunt/outputs/vo-take-cam-v3": ["ccc-hunt-9x16"],
}


def to_samples(path, tmp):
    subprocess.run(["afconvert", "-f", "WAVE", "-d", f"LEI16@{SR}", "-c", "1", path, tmp], check=True)
    w = wave.open(tmp); s = array.array("h", w.readframes(w.getnframes())); w.close()
    return s


def write_wav(path, s):
    w = wave.open(path, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(array.array("h", [max(-32768, min(32767, int(x))) for x in s]).tobytes()); w.close()


def rms(s, a, b):
    seg = s[max(0, a):max(0, b)]
    return (sum(x * x for x in seg) / len(seg)) ** 0.5 if len(seg) else 0.0


LOUD = 32768 * 10 ** (-40 / 20)


def onset(s, a, b):  # first 10 ms window above -40 dBFS in [a, b)
    for i in range(a, b, WIN):
        if rms(s, i, i + WIN) > LOUD: return i
    return a


def offset(s, a, b):  # end of last loud window in [a, b)
    last = a
    for i in range(a, b, WIN):
        if rms(s, i, i + WIN) > LOUD: last = i + WIN
    return last


def quietest(s, a, b):
    a, b = max(0, a), min(len(s) - WIN, b)
    if b <= a: return a
    return min(range(a, b, WIN // 2), key=lambda i: rms(s, i, i + WIN))


def make_cta(tmpdir, n=4):
    """n candidates; keep the one closest to 3 s that STT hears as 'co.nz' (crisp, normal 'co')."""
    best = None
    for i in range(1, n + 1):
        out = os.path.join(tmpdir, f"cta-{i}.mp3")
        if not os.path.exists(out):
            d = el.call("POST", f"/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128",
                        {"text": CTA, "model_id": "eleven_v3", "voice_settings": {"stability": 0.5}})
            open(out, "wb").write(base64.b64decode(d["audio_base64"]))
        s = to_samples(out, os.path.join(tmpdir, f"cta-{i}.wav"))
        a = max(0, onset(s, 0, len(s)) - int(SR * 0.03))
        b = min(len(s), offset(s, 0, len(s)) + int(SR * 0.12))
        heard = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "el.py"), "stt", out], capture_output=True, text=True).stdout.strip()
        ok = "co.nz" in heard.lower().replace(" ", "") and "enz" not in heard.lower() and "en z" not in heard.lower()
        print(f"  candidate {i}: {(b - a) / SR:.2f}s, heard '{heard}'{'' if ok else '  (rejected)'}")
        if ok and (best is None or abs((b - a) / SR - 3.0) < abs(len(best[1]) / SR - 3.0)):
            best = (out, s[a:b])
    if not best: sys.exit("no candidate heard as co.nz")
    return best[0], best[1], int(SR * 0.03)  # clip, its samples, lead-in before speech


def fix(take_dir, masters, cta, lead, tmpdir, dry=False):
    d = os.path.join(P, take_dir); proj = d.split("/outputs/")[0]
    al = json.load(open(os.path.join(d, "alignment.json")))
    chars, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    m = list(OLD.finditer("".join(chars)))
    if not m: print("  no koh CTA in", take_dir); return None
    m = m[-1]; i0, i1 = m.start(), m.end() - 1
    j = i0 - 1
    while j >= 0 and not chars[j].strip(): j -= 1
    k = m.end()
    while k < len(chars) and not chars[k].strip(): k += 1
    take = os.path.join(d, "take.mp3")
    archived = os.path.join(proj, "outputs", "archive", "vo-koh-2026-10-10", os.path.basename(d), "take.mp3")
    s = to_samples(archived if os.path.exists(archived) else take, os.path.join(tmpdir, "take.wav"))
    prev_end = int(en[j] * SR) if j >= 0 else 0
    cut_in = quietest(s, prev_end, int(st[i0] * SR) + int(SR * 0.15))
    old_on = onset(s, cut_in, len(s))
    tail_start = None
    if k < len(chars):  # something is said after the CTA (pen on a string)
        tail_start = quietest(s, int(en[i1] * SR) - int(SR * 0.1), int(st[k] * SR))
        old_off = offset(s, old_on, tail_start)
    else:
        old_off = offset(s, old_on, len(s))
    g = rms(s, old_on, old_off) / max(1, rms(cta, lead, len(cta)))
    g = max(0.5, min(2.0, g))
    out = list(s[:cut_in]) + [0] * max(0, old_on - lead - cut_in)
    out += [x * g for x in cta]
    if tail_start is not None:
        gap = (tail_start - old_off)
        new_off = len(out) - int(SR * 0.12)
        out = out[:new_off + gap] + [0] * max(0, new_off + gap - len(out)) + list(s[tail_start:])
    old_len, new_len = len(s) / SR, len(out) / SR
    print(f"  {take_dir.split('/')[0][11:]}/{os.path.basename(d)}: old CTA {old_on/SR:.2f}–{old_off/SR:.2f}s, new at {old_on/SR:.2f}s,"
          f" gain {g:.2f}, take {old_len:.2f}→{new_len:.2f}s")
    if dry: return new_len
    arch = os.path.join(proj, "outputs", "archive", "vo-koh-2026-10-10", os.path.basename(d))
    os.makedirs(arch, exist_ok=True)
    if not os.path.exists(os.path.join(arch, "take.mp3")): shutil.copy2(take, arch)
    wav = os.path.join(tmpdir, "fixed.wav"); write_wav(wav, out)
    m4a = os.path.join(d, "take.m4a")
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "192000", wav, m4a], check=True)
    if os.path.exists(take): os.remove(take)  # the old koh take lives in the archive now
    for name in masters:
        master = os.path.join(proj, "outputs", name + ".mp4")
        subprocess.run([os.path.join(ROOT, "tools", "mux"), master, master.replace(".mp4", "-with-vo.mp4"), f"{m4a}@0.0@1.15"],
                       check=True, stdout=subprocess.DEVNULL)
    open(os.path.join(d, "take-text.txt"), "w").write(open(os.path.join(arch, "take-text.txt")).read().replace("dot koh dot", "dot Co dot")
                                                     if os.path.exists(os.path.join(arch, "take-text.txt")) else "")
    return new_len


if __name__ == "__main__":
    dry = "--dry" in sys.argv
    tmp = os.path.join(ROOT, ".cache", "fix_cta"); os.makedirs(tmp, exist_ok=True)
    clip, cta, lead = make_cta(tmp)
    print("CTA clip:", clip, f"{len(cta)/SR:.2f}s")
    for td, ms in TAKES.items():
        if not dry:
            arch_txt = os.path.join(P, td.split("/outputs/")[0], "outputs", "archive", "vo-koh-2026-10-10", os.path.basename(td), "take-text.txt")
            os.makedirs(os.path.dirname(arch_txt), exist_ok=True)
            if not os.path.exists(arch_txt) and os.path.exists(os.path.join(P, td, "take-text.txt")):
                shutil.copy2(os.path.join(P, td, "take-text.txt"), arch_txt)
        fix(td, ms, cta, lead, tmp, dry)
