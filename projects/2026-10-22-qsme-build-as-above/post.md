---
title: "Wednesday: As above."
venture: qsme-build
idea: gl-as-above
status: "re-rendered after review (2026-10-04) — awaiting Session B recordings"
publish_date: 2026-10-22
publish_time: "19:30 NZDT (Thu 07:30 London BST, 10:30 Dubai, 09:30 Riyadh)"
created: 2026-10-02
calendar_week: 3
format: short
kind: skit
length_s: 29.25
aspect: "4:5"
platforms: ["LinkedIn (founder profile + page repost)"]
platforms_later: ["YouTube Shorts (9:16 re-layout, built once after the Session B recordings are in)"]
video: outputs/as-above-4x5.mp4
thumbnail: outputs/as-above-4x5-thumb.png
thumbnail_b: outputs/as-above-4x5-thumb-b.png
---

# Wednesday: As above.

**The joke in one sentence:** The whole week's site diary gets written at 4:52 on Friday, so the entries shrink from a Monday paragraph to "Works progressed.", "As above.", "As above." and "Ditto." — and nine months later, when someone asks whether Tuesday 13 October (rained off) was a rain day, the diary's answer is "Works progressed."

**The insight:** The site diary is written for the claim you hope never happens, at the moment you're least able to remember the week. In QSME the rain day is logged once, on the programme, on the day: the weather-sensitive tasks get their extra day, what follows moves to fit, the history says why ("Rain day — Tue 13 Oct"), and the daily log picks up the rain day and the schedule change by itself. A chat photo marked as proof of work, or a photo added from the phone, lands on the day it's posted. It doesn't write the whole diary. It writes the bits you'd forget by Friday.

**Job:** Organic, week 3. Lands Thursday morning in the UK and the Gulf, the day before everyone writes their Friday diary, as northern-hemisphere rain-day season starts. It ties the programme to the site (a rain day logged on the programme writes itself into the diary). It's a first-person confession by a fictional site manager ("Sam"), so the joke is on the speaker, never on site managers. The founder posts it from his LinkedIn profile, and the QSME page reposts it.

## Publish condition (read first)

**Don't publish this cut as it stands.** Every product beat (13.3–25.5) is a faithful HTML recreation built from the truth sheet's exact wording, with fictional demo data. Nobody has checked these screens against the signed-in app, and the truth sheet says real screens must be recorded from a demo account before publishing. The paper diary (0–8.5, 11.8–13.3) is a Kalam-handwriting animation standing in for the owner's filmed shot. The cut is complete and watchable now; it's waiting on the swaps in "Owner recordings to swap in".

- **Session B (owner, ideally on Tue 13 Oct 2026, a real Tuesday in week 2; at the latest by Mon 19 Oct):** record shots #2, #4, #5, #6 and #7 and film shot #1 (#3 is no longer needed). Swap them in at the listed times and re-render.
- **Already done for the fallback (2026-10-04 review pass):** the corner label on every recreated frame is now the audience-facing "Recreated screen · demo data" (one constant, `LABEL`, near the top of `motion/as-above.js`). The removable unconfirmed elements are gone: the invented "Daily log" pop-over (now a hard cut to the Daily log page), the web "…" message button, the "Proof of work" tag on the chat bubble, the dialog's "Cancel" link, the schedule tabs and TODAY marker, the whole "What happened" panel (with its "Sam K. · 11:06 am" line), and the body text of every Daily log entry. What is still ❓ is layout, which only a recording can confirm (see "Unconfirmed wording and layout").
- **If a shot is still missing on publish day:** the owner must explicitly accept that recreation as it is now (label and remaining ❓ layout included), or the beat comes out.
- **®:** the wordmark is rendered without ® (`motion/qsme-logo-nor.svg`, the same file as Day 23), because registration outside NZ is unconfirmed. Put it back only if the owner confirms the UK and the Gulf.

## Production status (2026-10-04, review pass)

| Piece | State | Where |
|---|---|---|
| 4:5 video, 29.25 s, 1080×1350, silent-first with burned-in captions | ✅ Re-rendered 2026-10-04 after the review. QA passed on the LinkedIn safe box 60,60,1020,1290. I read the contact sheet and pulled about 40 frames from the encoded MP4 at every fixed moment (see Discussion history). 🟥 Publish blocked on the owner's recordings | `outputs/as-above-4x5.mp4` · `outputs/as-above-4x5-frames.png` |
| LinkedIn custom thumbnail A | ✅ The hook frame at 1.2 s ("CONFESSION · Site diary. / Written Friday, 4:52pm. / For Monday." over the diary) | `outputs/as-above-4x5-thumb.png` |
| LinkedIn custom thumbnail B (A/B) | ✅ The whole shrinking week, ending in an underlined "Ditto.", with "CONFESSION · Site diary. / Written Friday, 4:52pm." above it (the 8.45 s pull-back, reframed so Monday's paragraph stays visible) | `outputs/as-above-4x5-thumb-b.png` (source `motion/as-above-thumb.html`) |
| 9:16 YouTube Shorts cut | ⬜ Deliberately not built yet. It needs a re-layout (captions above the app window, desk reframed), and it should be built once, after the Session B recordings are in. Until then **only LinkedIn is ready**. Plan: a thin `motion/as-above-9x16.html` (body.build r9x16) on the same timeline with r9x16 overrides in `as-above.css`, so the VO stem fits both | — |
| Motion source | ✅ One timeline: `motion/as-above.js` (markup + timeline + a small render-time edit list), `motion/as-above.css`, page `motion/as-above.html` (body.build r4x5) | `motion/` |
| Footage | ✅ QSME b-roll `assets/qsme/broll/th-7-complete.v1.mp4` (4.6–7.9 s, finished townhouses at dusk) behind "Nine months later." → `motion/clips/done`. It's scaled 1.16→1.23 from the frame's right edge, so the lit left-hand window (which has a small AI-generated figure in it) never enters the frame; the visible windows have no people. Stills: `th-3-pour-still.v1.jpg` cropped to the formwork and mesh (no people) as Mia's chat photo → `motion/img/pour.jpg`; `stage-2-foundation-still.v1.jpg` cropped to standing water on a slab edge with starter bars (no people), graded overcast, as Sam's 11:51 site photo → `motion/img/wet-slab.jpg` | `motion/clips/done/`, `motion/img/` |
| VO | 🟡 Timed Kiwi script, 12 lines, 325 characters, `python3 tools/vo_status.py` → ok. Generate after the ElevenLabs upgrade (no API was called) | `vo-script.md` · `vo-script.json` |
| Music + SFX | ⬜ ElevenLabs Music / SFX on a commercial plan (see Music) | — |
| Owner recordings (Session B + one filmed desk shot) | ⬜ **Required before publishing** | see below |

**Re-render from the studio root:**
- `node tools/motion/make.mjs projects/2026-10-22-qsme-build-as-above/motion/as-above.html projects/2026-10-22-qsme-build-as-above/outputs/as-above-4x5.mp4 --safe 60,60,1020,1290` (add `--check` while designing; about 2.5 min for a full render)
- Thumbnail A: the same command with `--still 1.2 --still-only` into a scratch folder, then copy the PNG to `outputs/as-above-4x5-thumb.png`.
- Thumbnail B: `node tools/motion/make.mjs projects/2026-10-22-qsme-build-as-above/motion/as-above-thumb.html <scratch>/thumb-b.mp4 --still 8.45 --still-only`, then copy the PNG to `outputs/as-above-4x5-thumb-b.png`.
- Re-cut the b-roll: `tools/motion/extract assets/qsme/broll/th-7-complete.v1.mp4 projects/2026-10-22-qsme-build-as-above/motion/clips/done 30 4.6 7.9 1280`. Keep `frames: 99` and `t1` on `Kit.clip`: a missing frame file leaves a broken `<img>`.
- **Clocks and edit list:** the desk (S1) is written in output seconds through `S1(t)` and starts 1.2 s before the authored clock, so everything after it keeps its authored times. Six cuts/holds at the bottom of `as-above.js` are applied at render: cut 0.3 s at 11.95 ("Probably." hold), cut 1.0 s at 15.4 (the old "What happened" beat), hold 0.5 s at 17.85 (Daily log caption), cut 0.2 s at 20.8 (idle phone), hold 0.4 s at 22.16 (photo landed), cut 0.3 s at 24.4 (close hold). Cuts sit only in still holds and holds only freeze still frames. **Every time in this file and in the VO script is an output time on the MP4.**

## Hook layers

- **Text (frame 0):** a red-dot "CONFESSION" pill, then "Site diary." (96 px) / "Written Friday, 4:52pm." (64 px), and "For Monday." slams in amber at 0.55 s (96 px, anchored left). Frame 0 already reads as a confession about a site diary.
- **Visual:** overhead on a paper site diary on a dark desk, with a hi-vis sleeve and a mug at the edges, and the pen mid-word on Monday. The entries visibly shrink as the camera moves down the page.
- **Verbal (VO later):** "Confession. Site diary gets done Friday afternoon." (international English for the Global audience; natural Kiwi accent)
- **Audio:** pen scratch and a kettle clicking off (1.6 s), room tone, no music.
- **Why it works:** every site manager, PM and QS has seen (or written) "As above." The time stamp ("Friday, 4:52pm") is the specific, guilty detail, and "For Monday." turns it into a story.

## Beat-by-beat script (times are seconds on `outputs/as-above-4x5.mp4`)

| Time | Role | On-screen text | VO (later) | Visual | SFX |
|---|---|---|---|---|---|
| 0.0–2.65 | hook | CONFESSION · **Site diary.** / **Written Friday, 4:52pm.** / **For Monday.** (amber, 0.55) | Confession. Site diary gets done Friday afternoon. (0.15) | Paper diary ("SITE DIARY · Project Block B — east bay · Week ending Fri 16/10"). The pen writes Monday: "Set-out checked. Grids A–F OK. / Formwork east bay started. / Scaffold west side tagged. / Toolbox: working at heights." | Pen scratch, kettle click at 1.6, room tone |
| 2.65–4.25 | setup | Clock chip **FRI 16 OCT · 4:52 PM** on a dark strip · **Monday gets a paragraph.** (1.6 s) | Monday gets a paragraph. (2.7) | Camera eases down the page; Monday's weather says "Fine" | Pen |
| 4.25–6.0 | escalation | **Tuesday: rained off.** ("rained off." amber, 4.28–5.98, 1.7 s) · clock 4:53 | (silence) | Rain streaks and a blue cast sweep over the page (4.15–5.95) while the pen writes Tuesday: "Works progressed." (4.4–5.0). The weather box stays blank | Rain on a tin roof 4.15–5.95, pen |
| 6.0–8.5 | escalation | **Wednesday gets "As above."** (6.0–7.6, 1.6 s) · clock 4:55 → 4:58 | Wednesday gets as above. (6.05) · Ditto. (7.75) | WED "As above." (6.15, ditto marks in the weather box) → THU "As above." (6.7) → the caption leaves → FRI **"Ditto."** (7.7) underlined (7.95–8.08). The camera pulls back on the whole shrinking week (7.8–8.22) and holds | Pen scratches, harder on Ditto, underline flick |
| 8.5–11.8 | twist | **Nine months later.** (112 px slam, 8.5) → plain email (9.1): "Head office · to Sam · 13 Jul 2027 · 9:14 am / Hi Sam, / **Was Tue 13 Oct a rain day?**" (64 px, the date highlighted yellow 9.5–9.8). On screen 2.7 s | Nine months later. (8.55) | QSME b-roll of finished townhouses at dusk, framed from the right edge (no people in any visible window), slow push, blurred under the email (from 9.05) | Low soft hit 8.5, one generic mail chime 9.5 |
| 11.8–13.3 | punchline | **It was.** (12.05) / **Probably.** (12.55, amber, 104 px) | It was. I think. (12.0) | Hard cut back to the diary, close on Tuesday: a red marker rings "Works progressed." (11.92–12.32) and writes a red "?" in the blank WEATHER box (12.3) | Marker squeaks, two soft thuds |
| 13.3–16.36 | product intro | QSME logo · chip **TUE 13 OCT · 11:06 AM** · label "Recreated screen · demo data" · **Log the rain day once.** (66 px, 13.52) | Log the rain day once. (13.85) | Recreated **Schedule** at app.qsme.build: Gantt with a blue forecast band on Tue 13 and the chips "On site now · Waiting for OK · Rain risk". Click **Rain day** (13.85) → dialog (exact help text) → tick **Tue 13** (14.36) → **What moves**: "4 tasks move — 2 now, 2 once the provider says OK", four rows of old → new dates → **Push these tasks** (15.2). The chain slides a day (15.42–15.82); the booked tasks go amber-dashed and "Waiting for OK" counts 2 | Swipe whoosh, music in at 13.3, trackpad clicks |
| 16.36–18.55 | proof | **Log the rain day once.** (dimmed) / **It writes itself into the diary.** (62 px, 16.36–18.46, 2.1 s) | It's already in the diary. (16.5) | Hard cut to the recreated **Daily log** (title + exact subtitle, "Add a note for today…", "Add photo"). The day header **Tue 13 Oct** gets the email's yellow marker (16.5–16.8), so the answer visibly matches the question. **Rain day** (16.68) and **Schedule change** (16.9) write themselves in (label, Sam K., 11:06). Mon 12 Oct shows "Document filed" | Soft ticks as entries land |
| 18.55–20.85 | solution | chip **11:42 AM** · **Photos land on the day / you post them.** (58 px, 18.6) | Photos land on the day you post them. (18.65) | Recreated **Messages → Project chat** ("Project chat — everyone working on the project."). Mia T. (Formwork) 11:41: "Rained off. Packing up." 11:42: a photo, "Where we got to before the rain." Click the photo (19.24) → **Mark as proof of work** / Flag as change request / Flag a problem → click (19.68) → hard cut to the Daily log (19.85): **Proof of work · Mia T. · 11:42** with her photo lands at the top of Tue 13 Oct (19.98–20.2) | Clicks 19.24 and 19.68, pop 20.0 |
| 20.85–22.9 | solution | chip **11:51 AM** · caption holds · **Not on Friday.** (amber slam, 22.12) | Not on Friday. (22.15) | A phone in its **browser** at app.qsme.build (not the iPhone app): Daily log, "Add a note for today…", **Add photo** (tap 21.38) → "Take a photo / Choose from library" (tap 21.8) → shutter → "**Site photo** · Sam K. · 11:51", standing water on site, lands under Tue 13 Oct (22.06–22.32) and holds | Taps, soft shutter 21.96 |
| 22.9–25.5 | self-aware close | **It doesn't write the whole diary.** (23.02) · **It writes the bits / you'd forget by Friday.** (23.6, "by Friday." amber) | (line 1 read in silence) It writes the bits you'd forget by Friday. (23.6) | Paper Tuesday ("Works progressed.", weather blank, "PAPER · WRITTEN FRI 4:53 PM") beside the QSME Tuesday card ("Daily log · **Tue 13 Oct**" in yellow marker, 23.5): Rain day 11:06 · Schedule change 11:06 · Proof of work 11:42 · Site photo 11:51 (label underneath) | Swipe, paper slide 23.1 |
| 25.5–29.25 | CTA | The end card fades in under the close: QSME logo (no ®, 25.55) · **It writes the bits / you'd forget by Friday.** rises into it · pill **Book a 30-minute demo** (52 px, 25.8) · **qsme.build** (64 px, 25.95–29.25, 3.3 s) | Book a thirty-minute demo at Q-S-me dot build. (26.4) | End card | Music resolves on one held chord at about 29.05 |

**Length:** 29.25 s against a 26 s slot (+12.5%, inside ±15%), the same length as the first render. The review pass moved time around rather than adding it: the desk got 1.2 s (caption reading time) and the Daily log caption 0.2 s more hold, paid for by cutting the "What happened" beat (−1.0 s), 0.1 s of the "Probably." hold, 0.05 s of the photo-landed hold and 0.25 s of the end card (it now fades in under the close; qsme.build still holds 3.3 s). The email gained 0.3 s inside its own scene: it now arrives as "Nine months later." rises.

**Reading pace (sound off):** hook 8 words in 2.6 s · diary captions 4, 3 and 4 words in 1.6, 1.7 and 1.6 s (2.5 w/s or slower), and "Ditto." is written only after the Wednesday caption has gone · email "Hi Sam, / Was Tue 13 Oct a rain day?" on screen 2.7 s (about 2.2 w/s for the question) · "It was. Probably." 3 words, 1.25 s · "Log the rain day once." 2.8 s · "It writes itself into the diary." 2.1 s · "Photos land on the day / you post them." 4.2 s · close 14 words over 2.5 s · end card 3.3 s with qsme.build.

**Type sizes:** captions are 57–112 px at 1080 wide (floor 40 px); the email's question is 64 px; the CTA pill is 52 px and qsme.build 64 px. The smallest captions are "Photos land on the day / you post them." (58 px) and the dimmed "Log the rain day once." (57 px after it scales down under the second line). The clock chips are 28 px mono and the recreation label is 20 px mono (a label, not a caption). App UI text inside the recreations is 17–38 px, legible at full screen, and the captions carry the meaning on a phone.

## Captions, hashtags and CTA

### LinkedIn: founder's profile (week 3, Thu 22 Oct, 19:30 NZDT)

> Confession: the site diary gets written on Friday at 4:52pm.
>
> Monday gets a paragraph.
> Tuesday: "Works progressed."
> Wednesday: "As above."
> Thursday: "As above."
> Friday: "Ditto."
>
> Tuesday was rained off.
>
> Nine months later: "Was Tue 13 Oct a rain day?"
>
> It was. Probably.
>
> In QSME you log the rain day once, on the programme, on the day. Each task that rain can stop gets its extra day, what follows moves to fit, and the history says why: "Rain day — Tue 13 Oct". The daily log picks up the rain day and the schedule change by itself. Mark a chat photo as proof of work and it lands in that day's log. Photos you add from your phone land on the day you post them, not on Friday.
>
> It doesn't write the whole diary. The notes are still yours. It writes the bits you'd forget by Friday.
>
> Book a 30-minute demo at qsme.build (link in comments)
>
> What does your Wednesday entry say?
>
> (Fictional site and names, demo data.)

**First comment (founder):** Book a 30-minute demo at qsme.build: https://qsme.build/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=as-above

**Hashtags (max 3, at the end):** #Construction #SiteManagement #ConstructionManagement

### LinkedIn: QSME page repost (same day, with commentary)

> Monday gets a paragraph. Wednesday gets "As above." Nine months later, nobody remembers Tuesday's rain.
>
> In QSME the rain day is logged once, on the day, and it lands in the daily log by itself, next to the schedule change it caused.
>
> Book a 30-minute demo at qsme.build

### YouTube Shorts (only once the 9:16 re-layout exists, after Session B)

- **Title:** Site diary, written Friday at 4:52pm #shorts
- **Description:** Monday gets a paragraph. Tuesday was rained off and gets "Works progressed." Wednesday gets "As above." Friday gets "Ditto." Nine months later someone asks whether Tuesday was a rain day. In QSME you log the rain day once, on the day, and it writes itself into the daily log with the schedule change; photos land on the day you post them. It doesn't write the whole diary, just the bits you'd forget by Friday. Book a 30-minute demo at qsme.build: https://qsme.build/?utm_source=youtube&utm_medium=organic_social&utm_campaign=as-above · Fictional site and names, demo data.
- **Hashtags:** #Construction #SiteManagement #ConstructionManagement
- Pin a comment with the demo link. qsme.build is on the end card for 3.3 s.

**CTA line (all platforms):** It writes the bits you'd forget by Friday. Book a 30-minute demo at qsme.build.

## Music

- **Direction:** no music under the skit (0–13.3). Pen scratches, a kettle, rain on a tin roof, room tone and one mail chime carry it, and the deadpan needs that dry air. Music enters on the swipe into QSME at 13.3: a light, tidy pulse that feels like a week being written down as it happens. It sits about 18 dB under the VO, dips for the camera shutter at 21.96, and resolves on one held chord at about 29.05.
- **Mood / tempo:** dry, understated, quietly pleased with itself. 92–100 BPM (suggest 96). Muted plucks, a soft kick, a warm low pad, maybe a light shaker. No risers, no "corporate ukulele", no trending track.
- **Source:** ElevenLabs Music on a plan that includes commercial use. Prompt: "minimal muted plucked synth and soft kick, 96 BPM, understated and tidy, warm low pad, light shaker, no vocals, no risers, 16 seconds, resolves on a single held chord at 15.7s". Or a stock library track licensed for business/brand channels that also covers paid social. SFX from ElevenLabs Sound Effects (pen scratch, kettle click, rain on a tin roof, low hit, generic mail chime, marker squeak, clicks, taps, shutter, swipe). Nothing that imitates Outlook, Gmail, WhatsApp or OS sounds.
- **Licensing:** LinkedIn has no licensed music library, and a later paid cut needs commercial rights, so use generated or commercially licensed audio only. No CapCut library audio.

## Owner recordings to swap in (required before publishing)

**Session B prep (demo Global org, invented names only):**
- Project **"Block B — east bay"** with the site location set to a public or commercial address (so the rain outlook can shade the chart). No private homes.
- Five tasks: **Formwork & mesh — east bay** (Formwork crew, "Rain can stop this task" ticked, Mon 12–Tue 13 Oct, on site) · **Edge beam steel** (Steel fixer, booked to a demo provider account, Wed 14–Thu 15) · **Pre-pour inspection** (Engineer, Fri 16) · **Slab pour — east bay** (Concrete crew, booked to a demo provider, weather-sensitive, Mon 19) · **Scaffold — west side** (Scaffolder, Mon 12–Fri 16, not weather-sensitive). The two booked tasks give the real "… 2 once the provider says OK" line.
- Accounts: **Sam K.** (site manager, records the web) and **Mia T.** (Formwork, a second demo account on another device).
- Photos: Mia's chat photo = `assets/qsme/broll/th-3-pour-still.v1.jpg` cropped to the formwork and mesh (no people), or your own photo of formwork with no people, plates or logos. The phone photo = **standing water** on site (water in the east-bay formwork or on the mesh, puddles, wet ground), no people; the recreation uses `stage-2-foundation-still.v1.jpg` cropped to puddles on a slab edge. Avoid drainage trenches: drains go in before formwork and mesh, so they read as out of sequence.
- **Best day to record: Tue 13 Oct 2026** (a real Tuesday, week 2). Then logging "today" as the rain day is literally true and every automatic entry files under Tue 13 Oct.

| # | Replaces (MP4 time) | Exact screen and click path | Record | Framing / crop rules |
|---|---|---|---|---|
| 1 | 0.0–8.5 (S1) and 11.8–13.3 (S3): the handwriting animation | **Filmed, owner's hands only.** Overhead phone shot of a real paper site diary on a site-office desk, hi-vis sleeve in shot, mug at the edge. Write the entries exactly as in the animation: header "SITE DIARY · Project: Block B — east bay · Week ending Fri 16/10"; MON 12/10, weather "Fine": "Set-out checked. Grids A–F OK. / Formwork east bay started. / Scaffold west side tagged. / Toolbox: working at heights."; TUE 13/10, weather **blank**: "Works progressed."; WED 14/10, weather ": "As above."; THU 15/10 ": "As above."; FRI 16/10 ": "Ditto." underlined. Takes: (a) Monday written in real time (we speed-ramp it), (b) Tuesday, (c) Wed + Thu, (d) "Ditto." + underline, (e) a 3 s hold on the whole page, (f) close on Tuesday: the same hand rings "Works progressed." in red marker and writes a red "?" in the blank weather box | Vertical 4K 30 fps, natural light, 60–90 s raw; uses about 8.5 s + 1.5 s | No faces, no real company logos on the vest, no real project or people names. Shoot 9:16 so both the 4:5 and a later 9:16 crop work. Keep the captions and the clock chip over it; put the chip on the dark top strip (or frame the page 40 px lower) so it never covers handwriting |
| 2 | 13.3–16.36 (S4a): the Schedule + Rain day recreation | Desktop, signed in as Sam K. → project Block B → **Schedule** (timeline) → **Rain day** → tick **Tue 13** → wait for **What moves** → **Push these tasks** → let the bars settle | 1920×1080 (or 1440 wide), 10–12 s raw, about 3 s used | Crop the browser to the app (keep the app.qsme.build address bar if it's clean). No other projects or org names in view |
| 3 | — (dropped 2026-10-04) | ~~What happened~~: the beat is cut from the video (it was a fifth dense screen with no caption). Optional: grab 4–5 s of the newest entry "Rain day — Tue 13 Oct" for the paid cut or the LinkedIn carousel | — | — |
| 4 | 16.36–18.55 (S4c): the Daily log | Same session → **Daily log** → Tue 13 Oct showing the automatic **Rain day** and **Schedule change** entries (keep whatever body text the app writes: it replaces the recreation's label-only entries) | 3–4 s raw | Note which day they file under (see checks). We add the yellow marker on "Tue 13 Oct" in the edit |
| 5 | 18.55–20.85 (S5a): chat photo → proof of work → Daily log | Mia's device posts "**Rained off. Packing up.**" then the photo with "Where we got to before the rain." in **Project chat** → on Sam's web: open the message's menu however the app does it → **Mark as proof of work** → open **Daily log** → the **Proof of work** entry under Tue 13 Oct | 8–10 s raw, about 2.3 s used | The edit hard-cuts from the menu click to the real Daily log page (no pop-over). Record the real way the menu opens on web (right-click, hover button or long-press) |
| 6 | 20.85–22.9 (S5b): the phone | iPhone, **Safari at app.qsme.build** (not the QSME iPhone app, whose build defaults to the NZ market) → Daily log → show "Add a note for today…" → **Add photo** → take a photo of **standing water** (formwork, mesh or puddles; no people) → it lands under today | iOS screen recording, portrait, 8–10 s raw, about 2 s used | Hide the status bar's carrier/name if personal. If iOS shows its own picker instead of "Take a photo / Choose from library", keep the real one (crop any "Video" option out of frame: there's no video upload) |
| 7 | 22.9–25.5 (S6): the QSME Tuesday card | After #5 and #6, a still (or 2 s scroll) of the web Daily log for Tue 13 Oct showing Rain day, Schedule change, Proof of work and the Site photo | Screenshot at 2× | Crop to the day's entries; keep the times |

**Checks while recording (they decide the dates):**
- **Does the Rain day dialog accept a past date?** If you record after Tue 13 Oct and it only offers recent or upcoming days, log the rain day for the recording day instead.
- **Which day do the automatic Rain day / Schedule change entries file under** — the rained-off day or the day you logged it?
- If either answer puts them on the recording day rather than Tue 13 Oct, use the recording date everywhere: the email ("Was **Tue 20 Oct** a rain day?"), the diary row that gets "Works progressed." (rename the weekday if needed), the chips, the close card and the LinkedIn copy. The VO never says a date, so it doesn't change.
- **Can Sam mark Mia's photo as proof of work, or only the sender?** If only the sender, record the tag on Mia's device and keep Sam's web for the Daily log.

### Unconfirmed wording and layout in the recreations

The wording below marked ✅ is word for word from the truth sheet. Anything ❓ must be confirmed by the recordings, or the owner must accept the recreation as it stands, labelled "Recreated screen · demo data". ✂️ = removed in the 2026-10-04 review pass.

| Where | Shown in the recreation | Status |
|---|---|---|
| Schedule (S4a) | "Rain day" dialog title and help text, "What moves", "4 tasks move — 2 now, 2 once the provider says OK", "Push these tasks"; strip chips "On site now · Waiting for OK · Rain risk"; colours green = on site, blue = booked, grey = planned, amber dashed = waiting for OK | ✅ wording · ❓ dialog layout (five weekday tick boxes, the old → new date rows) · ✂️ "Cancel" link |
| Schedule (S4a) | "Rain day" button top right; the blue forecast band on Tue 13 | ❓ placement · ✂️ "What happened" button, tabs "Timeline · List · All projects", TODAY marker |
| What happened (S4b) | — | ✂️ the whole beat (and its "Sam K. · 11:06 am" line) |
| Daily log (S4c, S5a, S6) | Title and subtitle, "Add a note for today…", "Add photo", labels "Rain day · Schedule change · Proof of work · Site photo · Document filed", who and time on each entry | ✅ wording · ❓ layout · ✂️ entry body text ("Rain day — Tue 13 Oct", the schedule-change line, the file name, the photo caption) |
| Messages (S5a) | "Messages", "Project chat — everyone working on the project.", "Mark as proof of work / Flag as change request / Flag a problem" | ✅ wording · ❓ how the menu opens on web (shown as a click on the photo) · ✂️ the "…" button, the "Proof of work" tag on the bubble |
| Messages (S5a) | The small "Daily log · Tue 13 Oct" pop-over the photo flew into | ✂️ replaced by a hard cut to the Daily log page |
| Phone (S5b) | Mobile-web Daily log at app.qsme.build, "Add a note for today…", "Add photo — Take a photo / Choose from library", "Site photo" | ✅ wording · ❓ mobile-web layout and whether the sheet is QSME's or iOS's |

Everything else (the paper diary, the clock and day chips, "Nine months later.", the email, the captions, the yellow date marker, the close's paper card and the end card) is kinetic: a fictional situation, not product UI.

## Integrity notes (every claim and the truth-sheet feature it rests on)

| Claim on screen / in VO | Rests on (`research/2026-10-02-qsme-platform-truth.md`) | Status |
|---|---|---|
| "Log the rain day once." and the Rain day → What moves → Push these tasks flow | 7.8 `rain-days`: a person ticks the rained-off day(s); "Each task that rain can stop gets one more day for every rained-off day it was on; what follows moves to fit"; the preview lists exactly what moves. Exact wording used | ✅ live (screens recreated until Session B) |
| Booked tasks show "Waiting for their OK" and "2 once the provider says OK" | 7.7 `asked-not-told` + 7.8 wording: booked trades confirm new dates; never moved without their OK | ✅ live |
| Blue forecast band + "Rain risk" chip on Tue 13 | 7.8: the chart shades days when rain is likely (Open-Meteo, 7 days ahead). It only shades; Sam logs the rain day by hand (the cursor clicks "Rain day") | ✅ live |
| LinkedIn copy only (cut from the video): "the history says why: 'Rain day — Tue 13 Oct'" | 7.16 `schedule-history-undo`: exact headline wording and the demo moment "History later shows 'Rain day — Tue 13 Oct' as the reason" | ✅ live |
| "Log the rain day once. / It writes itself into the diary." / VO "It's already in the diary." | 8.4 `daily-log`: "A 'Rain day' entry appears on its own after the schedule is pushed"; automatic entries include rain days and schedule-move batches. The two captions are stacked on screen so "It" is the rain day, never the whole diary | ✅ live |
| "Photos land on the day you post them." — chat photo → "Mark as proof of work" → that day's log | 8.5 `messages`: "Long-press a photo → 'Mark as proof of work' → it appears in the daily log"; 8.4: tagged chat items write themselves in ("A chat photo tagged 'Proof of work' shows up in the log") | ✅ live (who may tag whose photo, and how the menu opens on web: check in Session B) |
| Phone: "Add a note for today…", "Add photo" → the photo lands under today | 8.4: "Phone: 'Add photo' → camera → the photo lands in today's entry." Shown in the phone's **browser** at app.qsme.build, never the iPhone app (the store build defaults to NZ; phone rain-day logging isn't confirmed, so the rain day is logged on the web) | ✅ live |
| "It doesn't write the whole diary. / It writes the bits you'd forget by Friday." | 8.4: "Notes and photos are still added by a person"; only some entries write themselves. This is the qualifier the risk list asks for | ✅ live |
| "Book a 30-minute demo · qsme.build" / VO "Book a thirty-minute demo at Q-S-me dot build." | 12.8 `book-a-demo`; owner's Global CTA rule (2026-10-03) | ✅ live |
| QSME wordmark | Rendered without ®: registration outside NZ unconfirmed | ✅ safe default |

- **What it never says:**
  - Weather: no automatic weather capture, no "it logs rain days for you", no "QSME's weather data". The forecast only shades the chart, and a person logs the rain day.
  - Records: no "legal record", "evidence", "audit trail", "tamper-proof" or extension-of-time / delay-claim language. The email asks a plain question, and the answer on screen is a diary entry, not a claim outcome.
  - Photos: no GPS or time verification, no video upload, no offline use.
  - Automation: never "it writes the diary" unqualified; the close says it doesn't.
  - Pricing and sign-up (owner rule 2026-10-03): no "free", no "no account / no login / no sign-up", no per-seat or fee lines, anywhere. The only CTA is "Book a 30-minute demo at qsme.build".
  - Numbers: no counts, no time or money saved, no competitors. The 4:52pm, nine months and the dates are the story's.
  - Other red-list topics: nothing about escrow or payments, verified trades, the 15 languages, holidays or tax. It says "Formwork crew" and "Steel fixer", never "tradie".
- **Recreations, not product UI:** S4–S6 are HTML recreations in the light app style of the QSME walkthroughs, using the truth sheet's exact wording, fictional demo data and the corner label "Recreated screen · demo data" on every product frame. Unconfirmed wording was removed in the review pass (see the table above). No sidebar (the walkthrough sidebars show removed features). The browser address reads app.qsme.build.
- **Skit UI is generic and fictional:** the email is unbranded (no Outlook or Gmail chrome); "Head office", "Sam", "Sam K." and "Mia T." are invented; "Block B — east bay" is an invented project; the times are invented.
- **The diary is consistent with the programme:** Monday's paper entry says "Formwork east bay started." and the programme has "Formwork & mesh — east bay" Mon 12–Tue 13; Mia's photo shows formwork with mesh going in, captioned "Where we got to before the rain."; "Set-out checked. Grids A–F OK." sits with the Mon 12 "Document filed" entry. **Tuesday is a genuinely lost day:** "Tuesday: rained off." on the diary, the rain day logged at 11:06, Mia's "Rained off. Packing up." at 11:41, and Sam's 11:51 photo of standing water. So the extra day each weather-sensitive task gets matches a day that was really lost, never a lost morning (no padding, no extension-of-time framing).
- **Who the joke is on:** the speaker. It's a first-person "CONFESSION", the VO is the fictional Sam owning up, and the close turns on what the product doesn't do. Site managers are never the butt, and the email is a neutral question.
- **Not a testimonial:** Sam never claims to use QSME or that it saved him anything. The product captions and VO are instructions ("Log the rain day once.") and observations. It's a character voice (AI, later), never the founder, and the post says "Fictional site and names, demo data."
- **B-roll and stills:** `th-7-complete`, `th-3-pour-still` and `stage-2-foundation-still` are QSME's own AI-generated brand b-roll, already live on the NZ homepage. They're used as a backdrop and as demo-data photos, framed and cropped so no people are in frame (the th-7 clip is scaled from its right edge to keep a lit window with a small figure out of shot), and never presented as a real customer's site.
- **Public capture:** not used. The only public surfaces for this feature are one sentence on qsme.build ("One poster on the gate. Everyone who arrives signs in; the daily log keeps what happened, with photos.") and a hero mock with a daily log card for a different invented project ("Riverside Terraces — Stage 2"). Neither carries a beat better than the recreation, and mixing two invented projects would confuse the story.

## Paid cut (later, only if organic earns it)

Once Session B and the filmed diary are in: keep 0–13.3 as is, then the real Rain day → Daily log (about 5 s), the phone photo (2 s) and "It writes the bits you'd forget by Friday." → "Book a 30-minute demo" with a LinkedIn Lead Gen Form. No social proof, because none exists yet.

## Open questions for you

- [ ] **Session B:** can you record shots #2, #4, #5, #6 and #7 on **Tue 13 Oct 2026** (or as soon after as possible) and film the diary (#1, hands only)? For #6, photograph standing water (no people). While you're in there, please answer the checks (past date, which day entries file under, who can tag a photo and how the menu opens on web, iOS sheet vs QSME sheet).
- [ ] **9:16 Shorts cut:** planned once, after the Session B recordings are in. OK?
- [ ] **Thumbnail:** A/B thumbnail A (hook over Monday) against B (hook over the whole week ending in "Ditto.")?
- [ ] **Voice:** same Kiwi QS voice as the Global series, or an A/B with a Kiwi woman's voice for Sam?
- [ ] **Approve the copy?** Hook "Site diary. / Written Friday, 4:52pm. / For Monday."; "Tuesday: rained off."; email "Hi Sam, / Was Tue 13 Oct a rain day?"; "It was. / Probably."; "Log the rain day once. / It writes itself into the diary."; Mia's "Rained off. Packing up."; "Photos land on the day / you post them. / Not on Friday."; close "It doesn't write the whole diary. / It writes the bits you'd forget by Friday."
- [ ] **®:** is the QSME mark registered in the UK and the Gulf? The cut ships without ® until you confirm.

## Discussion history

- 2026-10-02: Slot approved in the calendar (Thu 22 Oct, week 3, idea `gl-as-above`): Friday 4:52pm confession → the week shrinks to "Ditto." → nine months later "Was Tue 13 Oct a rain day?" → "Works progressed." → QSME rain day on the programme writes itself into the daily log → photos land on the day → "It writes the bits you'd forget by Friday." → Book a 30-minute demo.
- 2026-10-03: First motion build (an interrupted run): desk + Kalam handwriting with a moving pen, rain over Tuesday, "Nine months later." over the `th-7-complete` b-roll, the email, the red ring, the four product recreations (Schedule + Rain day, What happened, Daily log, Messages, phone browser), the paper-vs-QSME close and the end card. Only a `--check` contact sheet existed; no MP4, post or VO.
- 2026-10-04: Resumed from that build. Picky-CD pass, then render, VO script and this post:
  - **Consistency:** Mia's photo showed mesh going in while the programme put mesh on Wed–Thu, so the first task became "Formwork & mesh — east bay", the steel task "Edge beam steel", and the caption "Where we got to before the rain." (was "East bay boxed, mesh in.").
  - **Bug:** the photo flying into the log swapped to the uncropped image mid-flight (people in frame). It now keeps the formwork crop at every size.
  - **Overlap:** the Daily log pop-over covered the photo's caption; it now sits at the bottom of the chat.
  - **Claim safety:** "It writes itself into the diary." used to stand alone. It now sits under a dimmed "Log the rain day once." so "It" is clearly the rain day.
  - **Joke clarity:** the "It was. Probably." close-up was reframed so TUE and its blank WEATHER box read, and the red marker writes a "?" in it.
  - **Transitions:** dissolves between two dense app pages read as mush, so they're now hard cuts with a small rise. The close's white log card no longer fades through grey. The "For Monday." slam no longer clips off the left edge.
  - **Timing:** "Not on Friday." now lands with the photo. The photo holds 0.45 s on Tue 13 Oct. The email keeps its full reading time. The close was tightened so the payoff VO and the CTA both fit. The result is 29.25 s (from 28.8 authored).
  - **VO:** the product lines are instructions, not a testimonial. `tools/vo_status.py` reports ok.
  - **Not done:** the 9:16 Shorts cut (see Production status). No API was called, and nothing was published.
- 2026-10-04 (review pass, verdict "fix"): applied every must-fix and should-fix, and the cheap nice ones, then re-rendered to the same path (29.25 s, QA ok) and spot-checked the MP4 frame by frame:
  - **Recreations (must-fix):** label is now "Recreated screen · demo data"; the invented Daily log pop-over is replaced by a hard cut to the Daily log page, where the proof-of-work entry lands; removed the web "…" button, the bubble's "Proof of work" tag, "Cancel", the schedule tabs and TODAY marker, and all Daily log entry body text. Session B is still required (#3 dropped).
  - **Story logic (must-fix):** Tuesday is now genuinely lost: "Tuesday: rained off." and Mia's "Rained off. Packing up." (was "rain till 11" / "Rain's cleared. Back on."). LinkedIn copy, YouTube description, beat table and the Session B #5 script updated. The VO didn't need to change.
  - **B-roll:** th-7 scaled 1.16→1.23 from the right edge, so the lit left window with a figure in it never enters the frame (checked 8.5–9.05 at full resolution).
  - **Reading time:** diary captions 1.6 / 1.7 / 1.6 s, with "Ditto." written after the Wednesday caption has gone; email trimmed to "Hi Sam, / Was Tue 13 Oct a rain day?" (64 px, 2.7 s on screen); "It writes itself into the diary." 2.1 s.
  - **What happened:** cut (a fifth dense screen with no caption, repeating the Daily log). The email's yellow marker now sits on "Tue 13 Oct" in the Daily log day header and on the close card, so the answer matches the question. VO "On the day." dropped.
  - **Phone photo:** standing water on a slab edge (graded overcast, no people) instead of drainage trenches.
  - **End card:** CTA pill 40 → 52 px, qsme.build 64 px, held 3.3 s; the end card now fades in under the close (no near-empty frame).
  - **VO:** "Friday afternoon" instead of "arvo" (Global audience, accent unchanged); 12 lines, 325 characters, `tools/vo_status.py` ok.
  - **Platforms:** only LinkedIn is listed as ready; the 9:16 is built once, after Session B.
  - **Nice:** paper stamp "WRITTEN FRI 4:53 PM" (when Tuesday was written); dark strip under the clock chip; thumbnail B (whole week ending in "Ditto." under the hook). The Schedule change entry's wording note is moot now that entry body text is gone until Session B shows the real wording.
  - No API was called, nothing was published or deployed.
