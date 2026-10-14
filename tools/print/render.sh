#!/bin/bash
# Render a print HTML page to PDF + one PNG per page (for the Studio / review).
# usage: tools/print/render.sh <page.html> <outputs/basename>
# Pages are <section class="page">; the page script hides every page but ?page=N for the screenshots.
set -euo pipefail
HTML="$1"; OUT="$2"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Google Chrome not found" >&2; exit 1; }
ABS="$(cd "$(dirname "$HTML")" && pwd)/$(basename "$HTML")"
PROF="$(mktemp -d)"; trap 'rm -rf "$PROF"' EXIT
mkdir -p "$(dirname "$OUT")"
common=(--headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$PROF" --virtual-time-budget=4000 --run-all-compositor-stages-before-draw)
"$CHROME" "${common[@]}" --no-pdf-header-footer --print-to-pdf="$OUT.pdf" "file://$ABS" 2>/dev/null || true
# page count + size (CSS px at 96 dpi) from the body class
N=$(grep -o '<section class="page"' "$HTML" | wc -l | tr -d ' ')
if grep -q 'class="a5"' "$HTML"; then W=559; H=794; else W=794; H=1123; fi
for ((i=1;i<=N;i++)); do
  "$CHROME" "${common[@]}" --force-device-scale-factor=2 --window-size=$W,$H --screenshot="$OUT-p$i.png" "file://$ABS?page=$i" 2>/dev/null || true
done
python3 - "$OUT.pdf" <<'PY'
import sys; from pypdf import PdfReader
r=PdfReader(sys.argv[1]); b=r.pages[0].mediabox
print(f"{sys.argv[1]}: {len(r.pages)} page(s), {float(b.width)/72*25.4:.0f}x{float(b.height)/72*25.4:.0f} mm")
PY
for ((i=1;i<=N;i++)); do [ -s "$OUT-p$i.png" ] || { echo "missing $OUT-p$i.png" >&2; exit 2; }; done
# QA: the page script paints a full-width red bar at the top of any page whose blocks are taller than the page,
# so the top-left pixel of the preview tells us. (First pixel of a PNG's first row is stored raw under every filter type.)
python3 - "$OUT" "$N" <<'PY'
import sys,zlib,struct
out,n=sys.argv[1],int(sys.argv[2]); bad=[]
for i in range(1,n+1):
    d=open(f"{out}-p{i}.png",'rb').read(); pos=8; idat=b''
    while pos<len(d):
        ln,=struct.unpack('>I',d[pos:pos+4]); typ=d[pos+4:pos+8]; body=d[pos+8:pos+8+ln]
        if typ==b'IHDR': w,h,bits,ctype=struct.unpack('>IIBB',body[:10])
        if typ==b'IDAT': idat+=body
        if typ==b'IEND': break
        pos+=12+ln
    row=zlib.decompressobj().decompress(idat,64)
    r,g,b=row[1],row[2],row[3]
    if r>180 and g<90 and b<90: bad.append(i)
print("QA " + ("OVERFLOW on page(s) "+", ".join(map(str,bad)) if bad else "ok: no page overflows"))
sys.exit(2 if bad else 0)
PY
