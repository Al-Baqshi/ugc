#!/usr/bin/env python3
"""Build videos.html: one card per video — the player on the left, its own script beside it.

    python3 tools/videos_page.py && open videos.html

Each script line has its own copy button; the line being spoken highlights while the video plays,
and clicking a line jumps the video there. Works straight from disk (no server). Re-run after new renders.
"""
import datetime, html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, "projects")
e = html.escape


def frontmatter(path):
    if not os.path.exists(path):
        return {}
    s = open(path, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n", s, re.S)
    out = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line and not line.startswith(" "):
                k, v = line.split(":", 1)
                out[k.strip()] = v.strip().strip('"')
    return out


def section(path, names):
    if not os.path.exists(path):
        return ""
    s = open(path, encoding="utf-8").read()
    for n in names:
        m = re.search(r"^##+ [^\n]*" + re.escape(n) + r"[^\n]*\n(.*?)(?=^##+ |\Z)", s, re.S | re.M | re.I)
        if m:
            return m.group(1).strip()
    return ""


def aspect_of(f):
    return "16x9" if "16x9" in f else "4x5" if "4x5" in f else "1x1" if "1x1" in f else "9x16"


def short_how(d):
    """First plain sentence of the direction, without production timings."""
    d = re.sub(r"\s*\(?(?:Out|In|Clear|Starts?|Ends?) (?:by|at) [\d.]+s?\)?\.?", "", d)
    d = re.sub(r"\([^)]*\d[^)]*\)", "", d)
    first = re.split(r"(?<=[.!?])\s+", d.strip())[0] if d.strip() else ""
    return first[:140]


def say(text):  # what the person reads: QSME spelled the way it's said
    return text.replace("Q-S-me", "QSME")


projects = []
for name in sorted(os.listdir(P)):
    d, out = os.path.join(P, name), os.path.join(P, name, "outputs")
    if name.startswith(("_", ".")) or not os.path.isdir(out):
        continue
    files = os.listdir(out)
    vids = sorted(f for f in files if f.endswith(".mp4") and not f.endswith(".preview.mp4") and "-with-vo" not in f and "-alt-vo" not in f)
    voiced = sorted(f for f in files if f.endswith(".mp4") and ("-with-vo" in f or "-alt-vo" in f) and not f.endswith(".preview.mp4"))
    stills = sorted(f for f in files if f.lower().endswith((".png", ".jpg")) and "-frames" not in f and "contact" not in f and "sheet" not in f)
    if not vids and not stills:
        continue
    fm = frontmatter(os.path.join(d, "post.md"))
    if "killed" in fm.get("status", ""):
        continue
    vo = None
    if os.path.exists(os.path.join(d, "vo-script.json")):
        try:
            vo = json.load(open(os.path.join(d, "vo-script.json"), encoding="utf-8"))
        except Exception:
            vo = None
    master = os.path.basename(vo["video"]) if vo and vo.get("video") and os.path.basename(vo["video"]) in vids else (vids[0] if vids else None)
    projects.append(dict(name=name, d=d, fm=fm, vo=vo, master=master, vids=vids, voiced=voiced, stills=stills, out=out))

projects.sort(key=lambda p: (p["fm"].get("publish_date") or p["name"][:10], p["name"]))
cards, nav = [], []
for p in projects:
    name, fm, vo = p["name"], p["fm"], p["vo"]
    rel = lambda f, n=name: f"projects/{n}/outputs/{f}"
    title = fm.get("title") or name
    vid = fm.get("vid", "")
    venture = fm.get("venture") or ("qsme-nz" if "qsme-nz" in name else "qsme-build")
    date = fm.get("publish_date") or name[:10]
    nz = venture == "qsme-nz"
    tag = "🇳🇿 QSME NZ" if nz else "🌍 QSME Global"
    vid_id = "v-" + name
    # player: voiced version first if it exists, else the master
    main = next((f for f in p["voiced"] if p["master"] and f.startswith(p["master"][:-4])), None) or p["master"]
    if main:
        player = f'<div class="player a{aspect_of(main)}"><video id="{e(vid_id)}" controls playsinline preload="metadata" src="{e(rel(main))}#t=1"></video></div>'
    else:
        player = f'<div class="player still"><img src="{e(rel(p["stills"][0]))}" alt=""></div>'
    # versions
    vers = []
    for f in ([main] if main else []) + [x for x in p["voiced"] + p["vids"] if x != main]:
        mb = os.path.getsize(os.path.join(p["out"], f)) / 1e6
        lang = re.search(r"-(en|es|ar|fr|de|pt|zh)-", f)  # language cuts (e.g. BQ01·ar·9:16)
        label = (vid + "·" if vid else "") + (lang.group(1) + "·" if lang else "") + aspect_of(f).replace("x", ":") + ("·vo" + (" " + f.split("-with-vo-")[1].replace(".mp4", "") if "-with-vo-" in f else "") if "-vo" in f else "") + (" · master" if f == p["master"] else "")
        vers.append(f'<li><button class="play" data-src="{e(rel(f))}" data-v="{e(vid_id)}" title="Play this version">▶</button>'
                    f'<span class="vname" title="{e(f)}">{e(label)}<small>{e(f)}</small></span>'
                    f'<a class="dl" href="{e(rel(f))}" download>⬇ {mb:.0f} MB</a></li>')
    for f in p["stills"]:
        vers.append(f'<li><a class="play" href="{e(rel(f))}" target="_blank" title="Open image">🖼</a><span class="vname">Image<small>{e(f)}</small></span>'
                    f'<a class="dl" href="{e(rel(f))}" download>⬇ PNG</a></li>')
    versions = f'<ul class="versions">{"".join(vers)}</ul>'
    # script
    if vo and vo.get("lines"):
        rows = []
        for l in vo["lines"]:
            st, mx = float(l.get("start_s", 0)), float(l.get("max_s", 3))
            txt = say(l.get("text_v2", ""))
            rows.append(
                f'<li class="line" data-v="{e(vid_id)}" data-start="{st}" data-end="{st + mx}">'
                f'<button class="t" title="Jump to {st:.1f}s">{st:.1f}s</button>'
                f'<div class="body"><p class="say">{e(txt)}</p>'
                + (f'<p class="how">{e(short_how(l.get("delivery", "")))}</p>' if l.get("delivery") else "")
                + f'<details class="more"><summary>details</summary>'
                + (f'<p class="on">On screen: {e(l.get("on_screen", ""))}</p>' if l.get("on_screen") else "")
                + (f'<p class="on">Full direction: {e(l.get("delivery", ""))}</p>' if l.get("delivery") else "")
                + f'<p class="on">Save your recording as <code>{e(l.get("id", ""))}.m4a</code> · must fit in {mx:.1f}s</p></details></div>'
                f'<button class="copy" data-copy="{e(txt)}" title="Copy this line">Copy</button></li>')
        plain = "\n".join(say(l.get("text_v2", "")) for l in vo["lines"])
        script = (f'<div class="script"><div class="shead"><div><h3>Voice script</h3><p class="who">{e(vo.get("character", ""))}</p>'
                  f'<p class="who">Timing matches <code>{e(p["master"] or "")}</code>. QSME is said “Cue Ess Me”.</p></div>'
                  f'<div class="sbtn"><button class="copy all" data-copy="{e(plain)}">Copy all lines</button>'
                  f'<a class="dl" download="{e(name)}-voice-script.txt" href="data:text/plain;charset=utf-8,{e(plain).replace(chr(10), "%0A")}">⬇ .txt</a></div></div>'
                  f'<ol class="lines">{"".join(rows)}</ol>'
                  f'<p class="rec">Record it yourself: one voice memo per line, saved with the name shown under each line. Put them in <code>projects/{e(name)}/outputs/vo/incoming/</code> (or send them in chat) and say “VO files are in”.</p></div>')
    else:
        script = '<div class="script"><p class="muted">No voice script yet.</p></div>'
    caption = section(os.path.join(p["d"], "post.md"), ["Caption", "Captions"])
    cap = (f'<details class="caption"><summary>Post caption &amp; hashtags</summary><button class="copy" data-copy="{e(caption[:4000])}">Copy caption</button>'
           f'<pre>{e(caption[:4000])}</pre></details>') if caption else ""
    nav.append(f'<a href="#{e(name)}" class="{e(venture)}"><b>{e(vid or date[5:])}</b> {e(title)}</a>')
    cards.append(f'''<section class="card {e(venture)}" id="{e(name)}">
  <header><span class="tag">{e(tag)}</span><span class="pill">{e(date)}</span>{f'<span class="pill">{e(fm.get("status", ""))}</span>' if fm.get("status") else ""}<h2>{f'<span class="vid">{e(vid)}</span> ' if vid else ''}{e(title)}</h2></header>
  <div class="grid"><div class="left">{player}{versions}</div>{script}</div>{cap}
</section>''')

built = datetime.datetime.now().strftime("%d %b %Y %H:%M")
page = f'''<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>QSME videos</title><style>
:root{{--bg:#0b0f0d;--card:#111915;--raise:#17221c;--line:#24332b;--ink:#eef4ef;--muted:#9fb0a6;--green:#3dc023;--hl:#1d3a1f}}
*{{box-sizing:border-box}}html{{scroll-behavior:smooth;scroll-padding-top:70px}}
body{{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 -apple-system,Inter,system-ui,sans-serif}}
.top{{position:sticky;top:0;z-index:5;background:rgba(11,15,13,.94);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}}
.top .in{{max-width:1240px;margin:0 auto;padding:10px 18px;display:flex;gap:12px;align-items:center}}
.top h1{{font-size:18px;margin:0;white-space:nowrap}}.filters button{{background:none;border:1px solid var(--line);color:var(--muted);border-radius:99px;padding:4px 12px;cursor:pointer;font:inherit;font-size:13px}}
.filters button.on{{border-color:var(--green);color:var(--ink)}}.navlist{{display:flex;gap:6px;overflow-x:auto;scrollbar-width:thin;flex:1}}
.navlist a{{white-space:nowrap;font-size:12px;color:var(--muted);text-decoration:none;border:1px solid var(--line);border-radius:8px;padding:3px 8px}}.navlist a:hover{{color:var(--ink);border-color:var(--green)}}.navlist b{{color:var(--ink);font-weight:600;margin-right:4px}}
main{{max-width:1240px;margin:0 auto;padding:18px 18px 80px}}.lede{{color:var(--muted);margin:6px 0 4px}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px 20px 16px;margin:20px 0}}
.card header h2{{margin:8px 0 12px;font-size:22px;line-height:1.25}}.tag,.pill{{display:inline-block;font-size:12px;margin-right:6px;padding:2px 9px;border-radius:99px;border:1px solid var(--line);color:var(--muted)}}.tag{{color:var(--ink)}}.vid{{display:inline-block;background:var(--green);color:#06130a;font:700 14px ui-monospace,Menlo,monospace;padding:2px 8px;border-radius:7px;vertical-align:middle;margin-right:6px}}
.grid{{display:grid;grid-template-columns:minmax(260px,400px) 1fr;gap:22px;align-items:start}}
.left{{position:sticky;top:66px}}.player{{background:#000;border-radius:12px;overflow:hidden;border:1px solid var(--line)}}
.player video,.player img{{display:block;width:100%;max-height:70vh;background:#000;object-fit:contain}}.player.a9x16 video{{aspect-ratio:9/16}}.player.a4x5 video{{aspect-ratio:4/5}}.player.a16x9 video{{aspect-ratio:16/9}}
.versions{{list-style:none;padding:0;margin:10px 0 0;display:grid;gap:6px}}.versions li{{display:flex;align-items:center;gap:8px;background:var(--raise);border:1px solid var(--line);border-radius:10px;padding:6px 8px}}
.vname{{flex:1;min-width:0;font-size:13px}}.vname small{{display:block;color:var(--muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}
.play{{background:none;border:1px solid var(--line);color:var(--ink);border-radius:8px;width:30px;height:30px;cursor:pointer;display:grid;place-items:center;text-decoration:none;font-size:13px}}
.dl,.copy{{white-space:nowrap;background:var(--green);color:#06130a;font-weight:600;font-size:12px;padding:6px 10px;border-radius:8px;text-decoration:none;border:0;cursor:pointer}}
.copy{{background:var(--raise);color:var(--ink);border:1px solid var(--line)}}.copy.done{{border-color:var(--green);color:var(--green)}}
.shead{{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:8px}}.shead h3{{margin:0;font-size:16px}}.who{{margin:2px 0;color:var(--muted);font-size:13px}}.sbtn{{display:flex;gap:6px;flex-wrap:wrap}}
.lines{{list-style:none;padding:0;margin:0;display:grid;gap:6px}}.line{{display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid var(--line);border-radius:12px;background:var(--raise);transition:background .15s,border-color .15s}}
.line.now{{background:var(--hl);border-color:var(--green)}}.line .t{{flex:none;background:none;border:1px solid var(--line);color:var(--muted);border-radius:8px;padding:3px 7px;cursor:pointer;font:12px ui-monospace,Menlo,monospace}}
.line.now .t{{color:var(--green);border-color:var(--green)}}.body{{flex:1;min-width:0}}.say{{margin:0;font-size:17px;font-weight:600;line-height:1.35}}
.on,.how{{margin:3px 0 0;font-size:12.5px;color:var(--muted)}}.more summary{{font-size:12px;margin-top:4px;color:#6f8578}}.more[open] summary{{color:var(--muted)}}.how{{font-style:italic}}.file code,.rec code,.who code{{background:#0b120e;padding:1px 5px;border-radius:5px;font-size:11.5px}}
.rec{{color:var(--muted);font-size:13px;margin:12px 0 0}}.caption{{margin-top:14px;border-top:1px solid var(--line);padding-top:10px}}summary{{cursor:pointer;color:var(--muted)}}
.caption pre{{white-space:pre-wrap;background:#0b120e;padding:12px;border-radius:10px;font:13px/1.5 inherit;margin:8px 0 0}}.caption .copy{{margin-top:8px}}.muted{{color:var(--muted)}}
.hide{{display:none}}
@media (max-width:820px){{.grid{{grid-template-columns:1fr}}.left{{position:static}}.player video{{max-height:60vh}}.top .in{{flex-wrap:wrap}}}}
</style></head><body>
<div class="top"><div class="in"><h1>QSME videos</h1><div class="filters"><button class="on" data-f="all">All</button> <button data-f="qsme-nz">🇳🇿 NZ</button> <button data-f="qsme-build">🌍 Global</button></div><nav class="navlist">{"".join(nav)}</nav></div></div>
<main><p class="lede">{len(cards)} videos, each with its own voice script beside it. Press play: the line being spoken lights up. Click a time to jump there. Use Copy on any single line. Built {e(built)}.</p>
{"".join(cards)}</main>
<script>
document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', () => {{
  navigator.clipboard.writeText(b.dataset.copy).then(() => {{ const t = b.textContent; b.textContent = 'Copied ✓'; b.classList.add('done'); setTimeout(() => {{ b.textContent = t; b.classList.remove('done') }}, 1400) }})
}}));
document.querySelectorAll('.line .t').forEach(b => b.addEventListener('click', () => {{
  const li = b.closest('.line'), v = document.getElementById(li.dataset.v); if (!v) return; v.currentTime = +li.dataset.start; v.play()
}}));
document.querySelectorAll('.versions .play[data-src]').forEach(b => b.addEventListener('click', () => {{
  const v = document.getElementById(b.dataset.v); v.src = b.dataset.src; v.play()
}}));
document.querySelectorAll('video').forEach(v => v.addEventListener('timeupdate', () => {{
  const t = v.currentTime; document.querySelectorAll('.line[data-v="' + v.id + '"]').forEach(li => li.classList.toggle('now', t >= +li.dataset.start && t < +li.dataset.end))
}}));
document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {{
  document.querySelectorAll('.filters button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('.card, .navlist a').forEach(c => c.classList.toggle('hide', b.dataset.f !== 'all' && !c.classList.contains(b.dataset.f)))
}}));
</script></body></html>'''
open(os.path.join(ROOT, "videos.html"), "w", encoding="utf-8").write(page)
print(f"videos.html: {len(cards)} videos")
