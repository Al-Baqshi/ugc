---
title: "Auckland first (we know)"
venture: qsme-nz
idea: nz-auckland-first
status: "re-rendered for the owner CTA rule (3 Oct) — awaiting approval"
publish_date: 2026-10-10
publish_time_nzt: "09:00"
week: 1
format: long-form explainer (self-own) + short cut
length_s: 76.35
length_short_s: 40.61
aspects: ["16:9 master (YouTube, Facebook)", "9:16 full version (Facebook Reels, pinned posts)", "9:16 short cut (Instagram Reels, TikTok, YouTube Shorts)"]
outputs: ["outputs/auckland-first-16x9.mp4", "outputs/auckland-first-9x16.mp4", "outputs/auckland-first-9x16-short.mp4", "outputs/auckland-first-thumb-16x9.png"]
owner_recordings_needed: []
created: 2026-10-02
---

# Auckland first (we know)

**The joke/insight in one sentence:** Every "nationwide" property tool has an asterisk, so we read ours out loud: we typed each council's own address into our site search, and it told Dunedin City Council it's in Dunedin City (they knew), while Auckland got the whole card.

**Job:** Organic, and it pins under every site-research post. It answers the "does this work in Tauranga?" comments before they're written, and it retires the old "any NZ address" line (fact-check correction 1) before traffic grows. Week 1 long-form, built only from public homepage captures plus the motion kit. No owner recordings needed. Nothing on screen or in the VO refers to a day or week, so it stays true while pinned.

**What changed from the idea card:** The idea card (`nz-auckland-first`, 34s, 9:16) became the approved explainer with a 16:9 master, a full 9:16 version and a 40s short cut. Four improvements:
1. **Fair test:** every test address is a council's own building (Auckland Council at 135 Albert St, Christchurch City Council at 53 Hereford St, Hamilton City Council at 260 Anglesea St, Dunedin City Council at 50 The Octagon). That's public, never a home, and it sets up the joke.
2. **The joke:** the Dunedin card's council field reads "Dunedin City". *We told Dunedin City Council it's in Dunedin City. They knew.*
3. **The ladder:** a "What this address gets" list (pills in 9:16) that resets for every address and re-ticks as that address's own result lands.
4. **The summary:** a "Screenshot this" table (the save/share moment), held 5s once complete, before the small print.

**Owner CTA rule (3 Oct): sign-ups, never "free":**
- Every CTA now pushes sign-ups. End card: **Search your address.** · *Sign up to see yours.* · real search box · [qsme.co.nz] · "Your account unlocks **Site research**: full depth in Auckland." VO: "Search your address. Sign up at Q-S-me dot co dot en zed." Same times, same 12 words.
- The premise is reframed from the old "what the free check gives you" to **what site search shows you** (hook sub, hook kicker "Council by council", the "Screenshot this" table title). The hook source line no longer says "homepage".
- The live homepage prints a small "Free to join." under its "Get started" button, and it showed in every 16:9 typing shot. It's now covered in every frame where it would show (a feathered patch cloned from the empty hero background right beside it; `motion/hush-rows.swift` → `motion/af-hush.js`). Nothing is drawn in its place.
- Titles, descriptions, captions and the CTA line for every platform are rewritten the same way (below). All three cuts and the thumbnail are re-rendered.

**Review fixes (2 Oct, round 2):**
- **Privacy (must-fix):** every other address in the live autocomplete is blurred, frame by frame (`motion/af-redact.js`, made by `motion/redact-rows.swift`). While typing, the whole suggestion list is blurred. Once the full address is typed, only the council's own row stays sharp.
- **9:16 pills (must-fix):** the capture window now ends at y=1102. The pills sit on their own navy band below it (1116–1246) and never touch product UI. The window is inset to x 65–1015, so product text can't cross the safe edge.
- **No stale references:** "Tuesday's video" became *Services and hazards in detail: see "The back corner"* (VO: "That's another video: The back corner."). The CTA small line lost "That's next week's videos."
- **Joke punch-in:** now centred on the boxed "Dunedin City" at 3x (4x in 9:16) with a vignette, and the caption is self-contained.
- **Wellington:** a live check of Wellington City Council's own building (113 The Terrace) on 2 Oct returned **City Centre Zone**, so the line stays. It's shortened to "Wellington City: zone too. Hazards: not yet." and held for 3.3s. Wellington is part of the 9 Oct re-check (see below).
- **Framing:** the typing shots sit below the hero headline, under a solid band that carries the address tag. We cut from the selected suggestion straight to the settled result, with no half-loaded map. A spotlight dims the hero (including the hi-vis worker) around the map-and-card column. The tag is never on the Google attribution.
- **Pacing:** the table holds 5s, the quote beat is folded under "We know." and the end card is 5.2s. The full version is now 76.35s, plus a 40.6s 9:16 short cut.
- **® removed** from the end-card logo (`motion/qsme-logo-nor.svg`) until registration is confirmed.
- **Nice ones:** the ladder resets per address, the table's NOT YET uses the same amber as the ladder (24–25px), Dunedin's boundary is the parcel's own outline pulsed (not a box), Taranaki and Banks Peninsula are re-plotted on the map, the gap in the 16:9 Auckland column is closed, and "Four councils add…" became "They add the planning zone."

## Hook layers

| Layer | What |
|---|---|
| Text (frame 1) | **Not in Auckland?** · *Here's exactly what site search shows you.* · kicker "Council by council" |
| Verbal | "Straight answer for everyone outside Auckland." (Mel, 0.3s) |
| Visual | Navy outline of Aotearoa. Three pins drop on Auckland, Christchurch and Dunedin, each wired to its **real** result card from the live homepage. The Auckland card is long and full of service and hazard chips. Christchurch is short. Dunedin is shorter. The contrast is the hook, and it's visible with sound off by 1.0s. |
| Audio | Three "plink" pin drops, each a note lower (0.12 / 0.42 / 0.72s), then a dry beat of room tone before the VO. |

## Script (full version; times are seconds on both the 16:9 and full 9:16 MP4s, which share one timeline and one VO track)

| Time | On-screen text | VO (Mel) | Visual | SFX |
|---|---|---|---|---|
| 0.0–5.4 HOOK | Council by council / Not in Auckland? / Here's exactly what site search shows you. / Real searches · qsme.co.nz · 2 Oct 2026 | Straight answer for everyone outside Auckland. | NZ outline, 3 pins, 3 real result cards (Auckland full, Christchurch short, Dunedin shorter). Fade at 4.95. | 3 descending plinks; soft whoosh out |
| 5.4–9.6 | 1 / 3 · DUNEDIN · **Anywhere in NZ\*** · \*Any address on the LINZ register. Some brand-new and rural lots aren't on it yet. · Fair test: we typed in each **council's own address.** · tag "50 The Octagon · Dunedin City Council" | Fair test: we typed in each council's own address. | Real typing in the homepage search box (other suggestions blurred), then the council's own row is selected. Cut at 8.6 to the settled result; the camera swings to the map and card. | quiet keyboard clicks; select tick |
| 9.6–15.6 | Every address on the register gets **the basics.** · Ladder ticks Boundary → Land area → Legal description → Council | Anywhere in the country: the boundary… land area, legal description and council. | The parcel's own outline pulses (10.95), then boxes on 1,181 m² · Part Lot 2 DP 17134 · Dunedin City (12.55 / 13.15 / 13.75) | soft tick on each box |
| 15.6–19.4 | Services and hazards? **Not here yet.** It says so. · Ladder: Zone / Services / Hazards "NOT YET" | Services and hazards? Not here yet. It says so. | Push in on the card's own line "Services & hazard data isn't available for this area yet — Auckland first, more councils to come." with an amber underline | dull wooden "tok" ×3 |
| 19.4–23.0 | We told Dunedin City Council it's in Dunedin City. **They knew.** | We told the council it's in Dunedin City. They knew. | Punch-in centred on the boxed "Dunedin City" (3x in 16:9, 4x in 9:16); a vignette drops everything else away | music ducks; one beat of room tone after "knew" |
| 23.0–27.0 | 2 / 3 · CHRISTCHURCH · HAMILTON · **Four councils** · Auckland · Wellington City · Christchurch · Hamilton · They add the **planning zone.** · tag "53 Hereford St · Christchurch City Council" | Four councils add the planning zone. | Typing at 1.6× (suggestions blurred), council row selected, cut to the result at 25.5; ladder resets and re-ticks the basics | keyboard (faster) |
| 27.0–29.9 | Christchurch: **Commercial Zone.** · Ladder Zone ✓, Services/Hazards NOT YET | Christchurch: Commercial Zone. | Push in, green box on "Commercial Zone" (27.4) | tick |
| 29.9–34.2 | Hamilton: **Central City Zone.** · tag "260 Anglesea St · Hamilton City Council" | Hamilton: Central City Zone. | 1-second typing at 3× (one suggestion: the council's own), result at 31.2, box on "Central City Zone - Precinct 1 - Downtown Precinct" (32.55) | keyboard flurry; tick |
| 34.2–37.7 | Wellington City: **zone too.** Hazards: not yet. | Wellington City: the zone too. Hazards? Not yet. | Amber underline on Hamilton's "Auckland first, more councils to come." (Wellington City is named, not demoed) | tok ×2 |
| 37.7–41.6 | 3 / 3 · AUCKLAND · **Auckland** · Auckland Council area · Auckland gets **the whole card.** · tag "135 Albert St · Auckland Council" | And Auckland gets the whole card. | Typing at 1.6× (other suggestions blurred), result at 40.05, pull back to the full card | keyboard |
| 41.6–44.9 | The zone, then pipes, power, flood and hazard checks. · Ladder rows 1–5 ✓ | The zone, then pipes, power, flood and hazard checks. | Box on "Business - City Centre Zone" (42.25) | tick |
| 44.9–48.1 | Services and hazards in detail: see **"The back corner".** · Services ✓ Hazards ✓ | That's another video: The back corner. | ~3s wide shot of the services + hazards chips (boxed; the map and tag are out of frame). We don't read the chips; "The back corner" does that. | two ticks |
| 48.1–58.8 SUMMARY | SCREENSHOT THIS · **What site search shows you** · table: rows Boundary, Land area, Legal description, Council, Zone, Services, Hazards × columns Everywhere\* / Christchurch, Hamilton, Wellington City / Auckland · footnote ends "Indicative only, not a LIM." | So. Everywhere: the basics. Three more councils: plus the zone. Auckland: the lot. | Ticks fill column by column (49.7 / 51.2 / 52.9); Auckland column glows; complete at 53.7 and **held 5s** | rising tick run per column |
| 58.8–62.0 | THE SMALL PRINT · **What it's not** · "Not a substitute for a LIM, PIM or engineering advice." · FROM THE CARD ITSELF | Wherever you are, it's not a LIM. | Push in on the real card footer (green box) | music thins |
| 62.0–66.9 | ☑ Still order the LIM. ☑ Check the title. ☑ Ask the council or a planner. | Still order the LIM. Check the title. Ask council or a planner. | Window dims; checklist pops, each box ticks | pen-tick ×3 |
| 66.9–71.2 SELF-OWN | We started in Auckland. / **We know.** / the real line cropped from the Dunedin card · ON THE CARD TODAY, OUTSIDE AUCKLAND | Yeah. We started in Auckland. … We know. … Card says so. | Map returns; Auckland pin glows and pulses; every other pin dims grey. "We know." slams in at 68.95; the card's own "Auckland first, more councils to come." line slides in under it at 69.55. No date, ever. | music drops out; slam is a soft thud; room tone; music re-enters gently at 70.0 |
| 71.1–76.35 CTA | QSME logo (no ®) · **Search your address.** · Sign up to see yours. · real "Search your address" box · [qsme.co.nz] · Your account unlocks **Site research**: full depth in Auckland. | Search your address. Sign up at Q-S-me dot co dot en zed. | End card; holds to 76.35 | music resolves |

Length: **76.35s** (target about 75s). Word count about 140 (fitted to each caption's window at 2.8 words a second or less; see `vo-script.json`), all of it sitting under on-screen text, so the video works fully with sound off.

### Short cut (9:16, 40.61s): `outputs/auckland-first-9x16-short.mp4`

Four slices of the same timeline with hard cuts. The chip reads "DUNEDIN" instead of "1 / 3 · DUNEDIN". Everything else is identical frames.

| Short time | Slice (full-version time) | What |
|---|---|---|
| 0.0–22.7 | 0.0–22.7 | Hook → Dunedin fair test → basics → "Not here yet" → "We told Dunedin City Council… They knew." |
| 22.7–31.36 | 48.28–56.94 | "Screenshot this" table, built and then held 3.2s (complete at 28.1) |
| 31.36–35.31 | 67.1–71.05 | "We started in Auckland. We know." + the card's own line |
| 35.31–40.61 | 71.05–76.35 | End card |

## Platform copy

### YouTube (16:9 master)
**Title:** Not in Auckland? What QSME site search shows you, council by council

**Description:**
Straight answer for everyone outside Auckland. We typed each council's own address into QSME site search and showed exactly what comes back.

Anywhere on the LINZ register: the boundary, land area, legal description and council. Auckland, Wellington City, Christchurch and Hamilton add the planning zone. Auckland also gets services and hazards. We started in Auckland. We know.

It's indicative only, not a LIM, PIM or engineering advice. Still order the LIM, check the title, and ask the council or a planner.

Search your address. Sign up at https://www.qsme.co.nz
Your account unlocks Site research: full depth in Auckland.

0:00 Not in Auckland? Dunedin first
0:23 Four councils add the zone
0:37 Auckland gets the whole card
0:48 The summary and the small print
1:06 We started in Auckland. We know.

**Hashtags (first three show above the title):** #NZProperty #SectionHunting #NewZealand
**Thumbnail:** `outputs/auckland-first-thumb-16x9.png` (the 1.8s hook frame: three real cards on the map, "Not in Auckland?"; re-exported with the re-plotted map).
**Card and end screen:** add a YouTube **card at 0:45** linking to "The back corner" (it's named on screen at 44.95). Add an **end-screen video element** for "The back corner" in the last 5s (71.35–76.35), placed in a bottom corner so it doesn't cover the qsme.co.nz pill or the search box. If "The back corner" isn't published yet, add both the day it goes live.
**Pinned comment:** Which council should we add next? We read every reply.

### Facebook (16:9 master in feed; the full 9:16 version for Facebook Reels)
Not in Auckland? Straight answer.

We typed each council's own address into QSME site search. Here's exactly what it shows today:
• Anywhere on the LINZ register: boundary, land area, legal description, council
• Auckland, Wellington City, Christchurch and Hamilton: + the planning zone
• Auckland: + services and hazards

We started in Auckland. We know. It's not a LIM, so still order one.

Search your address. Sign up at qsme.co.nz

**Hashtags:** #NZProperty #SectionHunting

### Instagram Reels (9:16 short cut)
Not in Auckland? Here's exactly what site search shows you, council by council. We typed each council's own address in. Our site search told Dunedin City Council it's in Dunedin City. They knew. Screenshot the table at 0:28. Search your address: sign up at qsme.co.nz (link in bio)

**Hashtags:** #NZProperty #SectionHunting #DunedinNZ #ChristchurchNZ #HamiltonNZ

### TikTok (9:16 short cut)
Not in Auckland? Straight answer. We typed each council's own address into our site search. Auckland first, we know. Search yours: sign up at qsme.co.nz

**Hashtags:** #NZProperty #SectionHunting #NZTikTok #Dunedin #Christchurch

### YouTube Shorts (9:16 short cut)
Use the short cut with the Shorts "related video" link pointing to the full 16:9 video. Title: "Not in Auckland? Site search, council by council"

### Pin under every site-research post
Not in Auckland? Here's exactly what site search shows you today, council by council (76s): [link to this video]. Short version: boundary, land area, legal description and council anywhere on the LINZ register. Zone in Auckland, Wellington City, Christchurch and Hamilton. Services and hazards in Auckland. More councils to come. Sign up at qsme.co.nz to search your address.

**CTA (every platform):** Search your address: sign up at qsme.co.nz. Never add "free", "no sign-up", "no login" or any pricing line (owner rule, 3 Oct).

## Music and sound

- **Direction:** Saturday-morning, coffee-in-hand. Warm, unhurried and a bit wry, never hype. Use a clean nylon or electric guitar with a soft Rhodes, brushed kit and round bass, no vocals, 84 to 90 BPM. Keep it low under the VO (about -22 LUFS short-term under speech).
- **Shape (full version):** Starts after the three pin plinks (enter about 0.9s). Ducks hard under "They knew." (21.3 to 23.0) for one beat of room tone. Thins out for the small print (59.0 to 66.8). **Drops out completely** on "We started in Auckland. … We know." (66.8 to 70.0), so the self-own lands in near silence. Re-enters softly under "Card says so." (70.0) and resolves on the end card (75.9).
- **Short cut:** the same bed, edited at the three hard cuts (22.7, 31.36, 35.31). It drops out from 31.36 to 34.2 and resolves at 40.2.
- **SFX:** three descending plinks (hook); quiet real keyboard clicks while typing (faster at 1.6× and 3×); a soft tick for each green box, the parcel pulse and each ladder tick; a dull wooden "tok" for each NOT YET; a rising tick run for each summary column; a soft thud under "We know."
- **Source:** ONE commercially licensed bed used in every version: ElevenLabs Music on a plan that permits commercial use (prompt: "warm laid-back nylon guitar and soft Rhodes, brushed drums, round bass, 86 BPM, no vocals, wry and calm Saturday-morning feel, 76 seconds, full stop at 66.8s for 3 seconds of silence then gentle re-entry, clean resolve at 75.9s"), or a business-tier Epidemic/Artlist licence. SFX from ElevenLabs SFX (same licence) or a commercially licensed SFX library. No trending tracks, no in-app music, no CapCut library audio in branded exports. Keep prompts and licence receipts in `outputs/licences/`.
- **Mux when ready:** `tools/mux outputs/auckland-first-16x9.mp4 outputs/auckland-first-16x9-vo.mp4 vo/vo01.mp3@0.3 … music.mp3@0.9@0.35` (the same line for the full 9:16 file; the timeline is identical). The short cut has its own VO times (see `vo-script.md`).

## Production status (2026-10-03, owner CTA rule)

| Piece | State | Where |
|---|---|---|
| 16:9 master, 1920×1080, 76.35s, silent with burned-in captions | ✅ Re-rendered 3 Oct (owner CTA rule), QA passed (all text inside 96,54,1824,1026), contact sheet and changed moments checked | `outputs/auckland-first-16x9.mp4` · `outputs/auckland-first-16x9-frames.png` |
| 9:16 full version, 1080×1920, 76.35s, silent with burned-in captions | ✅ Re-rendered 3 Oct (owner CTA rule), QA passed (all text inside 65,300,1015,1250), contact sheet and changed moments checked | `outputs/auckland-first-9x16.mp4` · `outputs/auckland-first-9x16-frames.png` |
| 9:16 short cut, 1080×1920, 40.61s | ✅ Re-rendered 3 Oct (owner CTA rule), QA passed (65,300,1015,1250), contact sheet checked | `outputs/auckland-first-9x16-short.mp4` · `outputs/auckland-first-9x16-short-frames.png` |
| Live captures of the public homepage (4 addresses × desktop + mobile) | ✅ Recorded 2 Oct 2026. The live screencasts are no longer used in the edit (we cut from the selected suggestion to the settled still) | `motion/capture-*.json` → `motion/clips/{akl,chc,ham,dun}-{d,m}` |
| Sharp typing (per-keystroke screenshots of the same public steps) | ✅ 8 sequences, played deterministically with per-frame privacy blur | `motion/keystrokes.mjs` → `motion/clips/*-dk`, `*-mk` |
| Autocomplete privacy redaction | ✅ Suggestion rows counted per frame; all rows blurred while typing; only the council's own row sharp once the full address is typed | `motion/redact-rows.swift` → `motion/af-redact.js` |
| Homepage "Free to join." line hidden | ✅ Found per keystroke frame and per still; covered by a feathered patch cloned from the empty hero background beside it (16:9 from the left, 9:16 from just below) | `motion/hush-rows.swift` → `motion/af-hush.js` |
| Hi-res result stills + field coordinates | ✅ 8 stills (desktop 3×, mobile 4.155×) | `motion/stills.mjs` → `motion/stills/*.jpg/.json` |
| Motion page (one timeline, three cuts) | ✅ | `motion/auckland-first-16x9.html`, `motion/auckland-first-9x16.html`, `motion/auckland-first-9x16-short.html`, `motion/af.js` (timing remap `W()` at the top), `motion/af.css`, `motion/af-data.js` (`gen-data.py`), `motion/nz-outline.js` (`nz-outline.py`), `motion/qsme-logo-nor.svg` |
| Kiwi VO (Mel) | 🟡 Timed script ready for both cuts; generate after the ElevenLabs upgrade | `vo-script.md` |
| Music + SFX | ⬜ Needs one licensed bed (see above) | — |
| YouTube thumbnail 1920×1080 (the 1.8s hook frame) | ✅ Re-exported 3 Oct with the new hook copy | `outputs/auckland-first-thumb-16x9.png` |
| Coverage re-check before posting | ⬜ Re-run the 4 desktop captures **plus Wellington City Council (113 The Terrace)** on 9 Oct. If any council returns something different, change the captions, never the footage. If Wellington returns no zone, drop it from the caption and the table column, or footnote it "zoning listed; results vary". | see Footage log |
| Owner recordings | None needed (week 1, public pages only) | — |

Re-render (from the studio root, about 6 to 7 min each; they can run at once):
`node tools/motion/make.mjs projects/2026-10-10-qsme-nz-auckland-first/motion/auckland-first-16x9.html projects/2026-10-10-qsme-nz-auckland-first/outputs/auckland-first-16x9.mp4 --safe 96,54,1824,1026`
`node tools/motion/make.mjs projects/2026-10-10-qsme-nz-auckland-first/motion/auckland-first-9x16.html projects/2026-10-10-qsme-nz-auckland-first/outputs/auckland-first-9x16.mp4 --safe 65,300,1015,1250`
`node tools/motion/make.mjs projects/2026-10-10-qsme-nz-auckland-first/motion/auckland-first-9x16-short.html projects/2026-10-10-qsme-nz-auckland-first/outputs/auckland-first-9x16-short.mp4 --safe 65,300,1015,1250`
Thumbnail: `node tools/motion/make.mjs projects/2026-10-10-qsme-nz-auckland-first/motion/auckland-first-16x9.html <scratch>/auckland-first-thumb-16x9.mp4 --safe 96,54,1824,1026 --still 1.8 --still-only`, then copy the PNG into `outputs/`.
If footage is re-captured, run `python3 gen-data.py` in `motion/`, regenerate `af-redact.js` with `redact-rows.swift` and `af-hush.js` with `hush-rows.swift` (commands at the top of each file), then check the blur and the hidden "Free to join." line on the new frames before rendering.

## Footage log (captured 2 Oct 2026, www.qsme.co.nz homepage "Search your address", logged out)

| Address typed | Whose building | Returned on the card | Coverage |
|---|---|---|---|
| 135 Albert Street, Auckland | Auckland Council | 135 Albert Street, Auckland Central, Auckland · 3,597 m² · Lot 1 DP 123332 · Auckland · **Business - City Centre Zone** · Services (5 chips) · Hazards (4 chips, all Clear) · footer disclaimer · Create project here | Full |
| 53 Hereford Street, Christchurch | Christchurch City Council (Civic Offices) | 5,122 m² · Lot 1–6 DP 30073 · Christchurch City · **Commercial Zone** · "Services & hazard data isn't available for this area yet — Auckland first, more councils to come." | Zone only |
| 260 Anglesea Street, Hamilton | Hamilton City Council | 6,317 m² · Lot 1 DPS 64212 · Hamilton City · **Central City Zone - Precinct 1 - Downtown Precinct** · same "Auckland first" line | Zone only |
| 50 The Octagon, Dunedin | Dunedin City Council (Civic Centre) | 1,181 m² · Part Lot 2 DP 17134 · Dunedin City · same "Auckland first" line · no zone | Parcel + council |
| 113 The Terrace, Wellington (check only, **not shown** in the video) | Wellington City Council | 2,248 m² · Lot 1 DP 33747 · Wellington City · **City Centre Zone** · same "Auckland first" line | Zone only (on 2 Oct; the truth sheet says Wellington was inconsistent in earlier live tests) |

Wellington City is named but not demoed (truth sheet: no Wellington demos). **Privacy:** while typing, the live autocomplete suggests other people's addresses (for example other numbers on the same street, or the same number in other towns). Every one of those rows is blurred in the edit, frame by frame. Only the council's own address row is ever sharp. No private address is readable anywhere in the video. The map tiles flash light grey for about 1.5s while they load; the edit cuts from the selected suggestion straight to the settled still, so that moment isn't shown.

## Integrity notes (every claim → the truth-sheet feature it rests on)

| Claim in the video or captions | Rests on | Note |
|---|---|---|
| "Anywhere in NZ\*" / "Every address on the register gets the basics": boundary, land area, legal description, council | 1.1 `home-address-check` (fact-check: "boundary, land area, legal description and council work NZ-wide (LINZ)"); (d) "Nationwide basics" | Always carries the footnote "\*Any address on the LINZ register. Some brand-new and rural lots aren't on it yet" (1.3 `address-search`: "new builds and some rural lots are not on the register"). Never "zone/services/hazards for any NZ address". |
| "Four councils… They add the planning zone: Auckland, Wellington City, Christchurch, Hamilton" | 1.1, 1.5 `zoning` (4 councils), (d) zoning coverage | Zone **name** only. No zone rules or numbers shown outside Auckland. |
| "Christchurch: Commercial Zone", "Hamilton: Central City Zone" | Live results on 2 Oct 2026 (footage log) | Quoted from the card as returned. Re-check on 9 Oct. |
| "Wellington City: zone too. Hazards: not yet." | 1.5 zoning list; live check of 113 The Terrace on 2 Oct returned City Centre Zone | Truth sheet 1.5 and (d) say Wellington was inconsistent in live tests and owner question (j) medium 2 is open. Kept because the 2 Oct check returned a zone. Re-checked on 9 Oct; if no zone, drop it or footnote it. Never demoed. |
| "Services and hazards? Not here yet. It says so." / "Auckland first, more councils to come" | 1.1 on-screen wording (outside Auckland) | The product's own words, quoted and shown. **No date, ever.** |
| "Auckland gets the whole card: the zone, then pipes, power, flood and hazard checks" | 1.1 (zone + chips in Auckland), 1.7 `services-hazards` (9 checks, Auckland only) | "The whole card" means the whole homepage card, not "everything QSME knows". The chips are shown as a ~3s wide shot and pointed to "The back corner", not explained here. We never say Clear means it won't flood, or that pipe positions are exact. |
| "Not a substitute for a LIM, PIM or engineering advice" | 1.1 footer wording (quoted from the Auckland card) | Shown as the real footer, boxed. |
| "Still order the LIM. Check the title. Ask the council or a planner." | 1.4 / 1.5 disclaimers ("Confirm with a planner or the council"); red list: not a LIM, PIM, title search, valuation or advice | Advice to the viewer, not a product claim. The table footnote also ends "Indicative only, not a LIM." |
| "Search your address." / "Sign up to see yours." / VO "Sign up at Q-S-me dot co dot en zed" | Owner CTA rule 2026-10-03 (`ventures/qsme-nz.md`, override at the top of the truth sheet) | Every CTA pushes sign-ups. No "free", "no sign-up", "no login", "without an account" or pricing line anywhere: on screen, VO, captions, hashtags, titles or thumbnail. |
| "Your account unlocks Site research: full depth in Auckland" | 1.4 `site-research` (needs an account; "full picture = Auckland only"); owner rule: site research is what you get when you sign up | Never describe what you get without signing up. Never voice Site research's headline "Type any New Zealand address". |
| "What site search shows you" (hook sub, table title) | Footage log; the four results above | Describes what the search returned for each council's address, nothing more. |
| "Real searches · qsme.co.nz · 2 Oct 2026" | Footage log | Every product image is the live public homepage: per-keystroke screenshots and settled stills of the same steps. No designed stand-ins, no `.replace` placeholders. The blur over other people's suggestions is a privacy redaction, not a change to the product. The homepage's own small "Free to join." line under "Get started" is hidden under the owner CTA rule (a soft patch of the hero background beside it); nothing is drawn or changed in its place. |
| Ladder, pills and summary table | Built from the four results above | Explainer graphics in brand type, not product UI: no product chrome, titled "What this address gets" / "Screenshot this". In 9:16 they sit on their own band, never over the capture. |
| Test addresses are councils' own buildings | Public building addresses (Hamilton City Council's building at 260 Anglesea St confirmed by web search on 2 Oct; the other three, and Wellington's 113 The Terrace, are the councils' published head-office addresses) | Privacy rule: never a private home. |
| QSME wordmark on the end card | `ventures/assets/qsme-logo.svg` without the ® | Truth sheet (j) medium 7: the footer says registered, the August shareholder report said pending. No ® until confirmed. |

**Red-list check:** no counts (users, tenders, tradies, projects), no plan prices, no time or money saved, no competitor names, no "instant", no "any NZ address" for zone, services, hazards, overlays or verdict, no verified-tradie claim, no escrow, no app-language claim, no Android/SMS, no removed features, no real people on camera (the homepage hero's hi-vis worker is dimmed out by the spotlight), no testimonials, no readable private addresses, no ®, no "free" / "no sign-up" / "no login" / pricing line anywhere, including the homepage's own "Free to join." (hidden).

**Humour check:** The self-owns are on QSME. "We told Dunedin City Council it's in Dunedin City. They knew." laughs at how thin our own Dunedin result is: our check is the butt, not Dunedin, its council or anyone typing an address. "We started in Auckland. We know." owns the gap. Nothing punches at Aucklanders or the regions. The venture file still marks "punching at councils?" as ❓, so the owner should confirm this council-adjacent joke (open question 2).

**AI disclosure:** No AI imagery. If Mel's VO is generated with ElevenLabs, switch on TikTok's "AI-generated content" label and Meta's AI label. A real Kiwi voice memo needs no label (see `vo-script.md`).

## Open questions for you

1. **Re-check date:** OK to re-run the four captures **plus Wellington City Council (113 The Terrace)** on Thu 9 Oct and re-render if any card changed? It's about 20 min, with no paid tools.
2. **Council joke:** The venture file still has "punching at councils? ❓". Are you happy with "We told Dunedin City Council it's in Dunedin City. They knew."? We're the butt of it, but it names a council.
3. **Trademark:** Is QSME a registered trademark yet? The site footer says ®, but the August shareholder report said pending. The end card uses the wordmark without ® until you confirm.
4. **"The back corner":** It's named on screen (44.95–47.9) and in the VO as "another video", with no day. Please confirm the title, and add the YouTube card and end-screen link once it's live.
5. **Pinned comment:** Happy with "Which council should we add next?" It invites the regions without promising a date.
6. **Product gap:** The homepage cards outside Auckland carry no "Indicative only / not a LIM" footer. Only the Auckland card does. Worth adding the footer to every card.
7. **Map:** The hand-plotted outline has been touched up (Taranaki, Banks Peninsula). For an exact coastline we'd use Natural Earth (public domain) or LINZ (CC BY 4.0), which needs a one-off download. Want that?
8. **Homepage line:** The live homepage still prints "Free to join." under "Get started". We've hidden it in this video under your new rule, but every new capture will pick it up again. Do you want it changed on the site, or should we keep hiding it?

## Discussion history

- 2026-10-02: Built from the approved calendar slot (Sat 10 Oct, 09:00 NZT, week 1 long-form). Upgraded the 34s idea card to an 80s 16:9 master plus a 9:16 version. Added the council-buildings fair test, the "They knew." joke, the ladder and the "Screenshot this" summary table. Footage captured live on 2 Oct (public homepage, logged out). Rendered both versions, QA passed. Picky-CD pass fixed: underlines that didn't render, the 9:16 tag covering the card address, cramped 3-line captions, the hook card size, and the list and self-own layout. Then re-rendered (both 80.0s). Status: rendered, awaiting approval.
- 2026-10-02 (review round 2, verdict "fix"): Other people's addresses in the live autocomplete are now blurred frame by frame, and the footage-log line was corrected. The 9:16 pills got their own band. The stale "Tuesday's video" / "next week's videos" references were removed. The joke punch-in was re-centred with a vignette and a self-contained caption. Wellington was checked live on 2 Oct (City Centre Zone), so the line was kept, shortened and added to the 9 Oct re-check. Typing shots were re-framed, the half-loaded live arrival was cut, and a spotlight was added. The table hold went to 5s, the quote beat was folded under "We know." and the end card was trimmed. The full version is now 76.35s, plus a new 40.6s short cut for Reels, TikTok and Shorts. The ® was removed from the end card. Nice fixes: the ladder resets per address, amber NOT YET in the table, the parcel outline pulses, the map coastline was touched up and the Auckland column gap closed. All three re-rendered, QA passed.
- 2026-10-03: owner CTA rule — removed free/no-sign-up, CTA now "Search your address — sign up at qsme.co.nz". 19 publish-facing violations: 7 rendered strings in `motion/af.js` (hook kicker and sub in both aspects, the table title, the end card's "Free, no sign-up." and "A free account adds…"), the homepage's own "Free to join." line visible in the 16:9 typing shots, the VO line vo19 (with its male alt and the short cut's svo19), and 10 platform lines here (titles, descriptions, captions, pin, CTA). Internal notes in this file and the VO scripts were updated to match. The premise is reframed to "what site search shows you"; the end card is now "Search your address." / "Sign up to see yours." / qsme.co.nz / "Your account unlocks Site research: full depth in Auckland."; the VO is "Search your address. Sign up at Q-S-me dot co dot en zed." (same times, `vo_status.py` ok). The "Free to join." line is covered with a patch cloned from the hero background beside it (`hush-rows.swift` → `af-hush.js`). All three cuts and the thumbnail re-rendered, QA passed; the local `.preview.mp4` files were refreshed too (not published). New open question 8 (the homepage line itself).
