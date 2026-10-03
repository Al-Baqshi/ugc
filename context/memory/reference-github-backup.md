---
name: reference-github-backup
description: CreativeUGC is backed up to the private GitHub repo Al-Baqshi/ugc; videos go to monthly Releases
metadata:
  type: reference
---

Private repo https://github.com/Al-Baqshi/ugc holds the whole CreativeUGC folder (except .env, frame caches, compiled tools, videos). Videos: GitHub Releases `videos-YYYY-MM`, assets named `<project>__<file>.mp4`. Run `tools/backup.sh "<msg>"` after saving/publishing; it also copies Claude's memory into `context/memory/`. User wants this so nothing is lost and a new machine/cloud can resume (2026-10-03). Related: [[feedback-save-everything-locally]], [[reference-studio-figma-railway]]
