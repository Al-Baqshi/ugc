---
name: reference-studio-figma-railway
description: Where the live UGC Studio, its Railway project and the QSME Figma file live
metadata:
  type: reference
---

- Live Studio: https://studio-production-ccb0.up.railway.app (Railway project `ugc-studio`, id 043c7f9a-e934-4f76-9cfa-b7b45de87d67, service `studio`). Deploy with `npm run publish` from /Users/brave/CreativeUGC (railway up). Password + API token only in local `.env`.
- Figma: "QSME — UGC Posts" in BItregalo Team (team::1201102854557929810), file key f8xxaFvwdi6ijGxYj9WEWP. Starter plan = 3 pages max. QSME logo component id 2:27.
- Figma Weave (AI models) is not linked yet: user must link at app.weavy.ai → settings → profile.
- railway.json "config as code" is deprecated; works until 2026-12-01, migrate with `railway config migrate` before then.

Related: [[feedback-save-everything-locally]], [[user-ugc-goals]]
- Videos/stills live in the private Railway bucket `ugc-videos` (region sin, S3 endpoint t3.storageapi.dev). The studio service gets BUCKET_* via Railway variable references `${{ugc-videos.*}}`; the local sync tool reads them at runtime from `railway variables --service studio --kv` (never stored/printed). A volume `studio-media` (/data) was created first and is now unused — remove it once the bucket is live (ask the user).
