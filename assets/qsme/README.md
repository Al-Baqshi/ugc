# QSME asset library (local only, not uploaded to the Studio)

Copied read-only from the product repo on 2026-10-02. Re-copy when the product changes.

| Folder | What | Rules |
|---|---|---|
| `broll/` | Cinematic build-stage clips + stills from the qsme.co.nz homepage (stage-1-site … stage-5-dusk, house-*, th-* townhouses, gf-* granny flat) | AI-generated brand b-roll already live on the site. Fine for both editions. Never present as a real customer's site. |
| `walkthroughs/` | Narrated product walkthrough clips (Remotion recreations of the app with mock data, July–Sept 2026) | Animated recreations, not live screen recordings. Check wording against the current product before use. `client-schedule*` predate the 22–23 Sep schedule changes. For Global: mute the VO (it says GST/tradies) and avoid the app.qsme.co.nz URL bar. **Deliberately NOT copied:** payments, awarded-work ("release the funds" implies QSME holds money), book-a-tradie (removed feature), invoices (coming soon), provider quotes/opportunities (removed/outdated). |
| `walkthroughs/vo-scripts/` | Approved VO scripts for those walkthroughs | Best tone reference for product wording. |
| `phone/` | Real QSME iPhone app captures (seeded demo account, Sept 2026) | Demo data only. `02-home` deliberately excluded (shows a removed feature). |
| `trade-icons/` | ~50 illustrated trade icons | For "every trade" montages without real people. |
| `brand/` | Play Store feature graphic, brand mark, qsme.build "15 languages" poster | End cards, openers. |
| `samples/` | Example SOQ / schedule spreadsheets | Safe demo data for import moments. |

Real **live** footage of public pages (homepage address check, Live Tenders, Find a Tradie, Properties, /connect, qsme.build in 15 languages) is captured fresh with `tools/motion/capture.mjs`. Signed-in screens (Site Research Pro, the real schedule, bid comparison) need the owner to screen-record: we never log in.
Privacy: only public or commercial addresses on screen, never a private home's address; no real customer names or data.
