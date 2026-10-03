#!/usr/bin/env bash
# Back up the studio to GitHub: commit + push all files, then upload new/changed videos
# to this month's Release (videos-YYYY-MM) as <project>__<file>.mp4.
# usage: tools/backup.sh ["commit message"]
set -euo pipefail
cd "$(dirname "$0")/.."
REPO="Al-Baqshi/ugc"
MSG="${1:-backup $(date '+%Y-%m-%d %H:%M')}"

# refresh the memory snapshot so a new machine gets the latest context
MEM="$HOME/.claude/projects/$(pwd | sed 's#/#-#g')/memory"
if [ -d "$MEM" ]; then mkdir -p context/memory && cp "$MEM"/*.md context/memory/; fi

# never commit secrets: refuse if any .env value appears in a tracked or staged file
git add -A
if [ -f .env ]; then
  while IFS='=' read -r k v; do
    [[ -z "${k// }" || "$k" =~ ^# || ${#v} -lt 12 ]] && continue
    if git grep --cached -q -F -- "$v"; then echo "ABORT: the value of $k appears in a staged file"; git reset -q; exit 1; fi
  done < .env
fi
if ! git diff --cached --quiet; then
  git commit -q -m "$MSG" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
fi
git push -q origin HEAD:main
echo "pushed $(git rev-parse --short HEAD)"

# videos → release assets (skip previews; compare by name + size)
TAG="videos-$(date '+%Y-%m')"
gh release view "$TAG" --repo "$REPO" >/dev/null 2>&1 || gh release create "$TAG" --repo "$REPO" --title "Videos $(date '+%B %Y')" --notes "Rendered videos from projects/*/outputs (masters, not previews). Name = <project>__<file>." >/dev/null
EXISTING=$(gh release view "$TAG" --repo "$REPO" --json assets --jq '.assets[] | "\(.name) \(.size)"')
UP=0; TMPD=$(mktemp -d); trap 'rm -rf "$TMPD"' EXIT
while IFS= read -r -d '' f; do
  proj=$(echo "$f" | cut -d/ -f2); name="${proj}__$(basename "$f")"; size=$(stat -f%z "$f")
  if ! grep -qxF "$name $size" <<<"$EXISTING"; then
    ln -f "$f" "$TMPD/$name" 2>/dev/null || cp "$f" "$TMPD/$name"     # asset name = file name
    gh release upload "$TAG" "$TMPD/$name" --repo "$REPO" --clobber >/dev/null
    rm -f "$TMPD/$name"; UP=$((UP+1)); echo "  uploaded $name ($((size/1048576)) MB)"
  fi
done < <(find projects -path '*/outputs/*' -name '*.mp4' ! -name '*.preview.mp4' -print0)
echo "videos: $UP uploaded to $TAG"
