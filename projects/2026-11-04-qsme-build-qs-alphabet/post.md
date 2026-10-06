---
vid: G13
title: "The QS Alphabet (A to Z, never in that order)"
venture: qsme-build
idea: gl-qs-is-the-project
status: "killed — owner rejected the alphabet concept (2026-10-06)"
publish_date: 2026-11-04
publish_time: "20:30 NZDT Wed 4 Nov (07:30 London GMT, 11:30 Dubai, 10:30 Riyadh)"
created: 2026-10-04
format: brand film (hero) + two cutdowns
kind: kinetic type + illustrative product screens + dimmed brand b-roll
length_s: 90
aspect: "16:9 hero + 4:5 + 9:16"
platforms: ["YouTube (16:9 hero, pinned)", "LinkedIn founder profile (4:5)", "LinkedIn QSME page (16:9, pinned to Featured)", "YouTube Shorts (9:16)"]
video: outputs/qs-alphabet-16x9.mp4
video_4x5: outputs/qs-alphabet-4x5.mp4
video_9x16: outputs/qs-alphabet-9x16.mp4
thumbnail: outputs/qs-alphabet-16x9-thumb.png
cta: "Book a 30-minute demo at qsme.build"
---

# The QS Alphabet (A to Z, never in that order)

**The joke in one sentence:** Every project runs from A to Z, just never in that order, and keeping it in order is the QS's job. So when A for Award finally turns up 7th, the gag and the brand point land at the same moment ("Finally.").

**The owner's brief (2026-10-04), delivered:** say what the QS in QSME stands for (quantity surveying), say that a good QS means a good project, and show that QSME lets the QS (professional QS or whoever is doing the QS job) run the project from A to Z: planning, drawings, estimating and quantities, work on site, deliverables and payments, project management. Edition: QSME Global, qsme.build.

**The argument, in order:**
1. Every project runs from A to Z. Just… never in that order (the alphabet shuffles into D R X G T B A I O P, and A is 7th).
2. Someone keeps it in order. That's the QS. QS = quantity surveying, the QS in QSME.
3. Good QS, good project. We're biased. It's in our name. (Said as our own bias, never as a statistic.)
4. Respect every trade: architects design it, engineers keep it standing, builders build it, the QS makes it all add up (a red-biro total line under the other three).
5. QS by title (practices) or QS by default (contractors, developers, owners doing the QS bit tonight).
6. Ten letters in the order a job really happens, each on a LIVE Global feature, in the product's own words. A arrives 7th: "Finally."
7. The rest, alphabetical for once. Z: one record, first estimate to last payment.
8. Built by a QS (real element crop of qsme.build/about), for whoever's the QS. Book a 30-minute demo at qsme.build. Bring your spreadsheet.

One demo package runs through the whole film: **Plasterboard & ceilings**, the same package and figures as "Six bids. Six formats." (Bidder F 71,300, Lowest, then awarded).

## Name note

We used **QS = quantity surveying** (and "the QS on your project"), and QSME is said "Cue Ess Me" ("Q-S-me" in the VO text). We did **not** expand "ME": no repo or site has an official expansion, so it stays unexplained pending the owner (open question a). Q, S, M and E never carry a feature letter; M and E always appear unlabelled; no line ends on a "me" pun (no "Who's the QS? Me."). The founder variant of the 77.5 s line ("I'm a quantity surveyor. I built Q-S-me…") is only for the founder's own voice.

## Production status (2026-10-04)

| Piece | State | Where |
|---|---|---|
| **Hero, 16:9, 90.0 s, 1920×1080, silent-first, burned-in captions** | ✅ Re-rendered 4 Oct after the review (fixes below). QA passed on the safe box 96,54,1824,1026. Contact sheet read; 44 frames pulled from the encoded MP4 with `tools/motion/frames` and checked (frame 1, the clatter, the arcs and numbers, 7th, the QS hold 9.4–10.65, the cut 11.19/11.25, the QS-order row 25.0–27.42, X/A/I caption swaps, P push-in, the rest 69.9–72.4, Z, the founder card at full size, and the b-roll behind every letter for people). 🟡 Every product screen is an illustrative recreation until the owner's recordings (O1–O11) are swapped in | `outputs/qs-alphabet-16x9.mp4` · `outputs/qs-alphabet-16x9-frames.png` · thumbnail `outputs/qs-alphabet-16x9-thumb.png` |
| **4:5 LinkedIn cut, 33.0 s, 1080×1350** | ✅ Re-rendered 4 Oct. QA passed on 60,60,1020,1290. Contact sheet read; frames checked at 7.5 (QS hold), 16.6/16.9 (X caption), 20.95 (tax note outside the window), 22.1/22.45 (A caption with the stamp), 27.2 (footage tag clear of the strip) | `outputs/qs-alphabet-4x5.mp4` · `outputs/qs-alphabet-4x5-frames.png` · cover `outputs/qs-alphabet-4x5-thumb.png` |
| **9:16 Shorts cut, 30.0 s, 1080×1920 (Hook A)** | ✅ Re-rendered 4 Oct. QA passed on 65,300,1015,1250 **and** on the Shorts box 150,300,930,1250 (all text in x 150–930, y 300–1250). Contact sheet read; frames checked at 3.5 (QS hold), 13.0/13.4 (X), 17.6 (tax note, "Lowest"), 18.7/19.1 (A), 23.8 (tag) | `outputs/qs-alphabet-9x16.mp4` · `outputs/qs-alphabet-9x16-frames.png` · cover `outputs/qs-alphabet-9x16-cover.png` |
| 9:16 Hook B (fictional brother-in-law chat) | ⬜ Scripted only (swap 0–4.2 s, body identical). Build after Hook A has run | VO in `vo-script-9x16.json` → `hook_b_test_lines` |
| Motion sources | ✅ | `motion/qs-alphabet.html` (hero) · `motion/qs-alphabet-4x5.html` · `motion/qs-alphabet-9x16.html` · shared `motion/qsa.js` (strip, wordmark, the ten hero panels, the nine cutdown moments) · `motion/qsa-cut.js` (letter block) · `motion/qsa.css` · `motion/thumb.html` |
| Public capture | ✅ The founder card of qsme.build/about captured exactly as the live page shows it (logged out, nothing typed, no DOM or style edits, both sentences), 4 Oct 2026; the film crops only the card's empty lower padding. Re-capture in publish week (12.19 redesign pending). The earlier trimmed capture `about-founder-line.png` is superseded and no longer used | `motion/clips/stills/about-founder-card.png` (+ `.json`) · `motion/stills.json` · `motion/still.mjs` |
| B-roll | ✅ AI brand footage, dimmed 22–32 %, tagged "Illustrative footage" whenever it plays, and every clip cropped (zoom + origin) to a region with no people for its whole used range (checked on the source frames, 4 Oct 2026). th-6-fitout dropped (two workers in frame) | `motion/clips/th1…th5, th7, s2–s4, dusk` (frame caches, local only; `th6` is no longer used) |
| VO | 🟡 Scripted, not generated (ElevenLabs upgrade pending). Hero 25 lines / 188 words; 4:5 15 lines / 71 words; 9:16 13 lines / 57 words (+ 2-line Hook B). `python3 tools/vo_status.py` → ok | `vo-script.md` · `vo-script.json` · `vo-script-4x5.json` · `vo-script-9x16.json` |
| Music + SFX | ⬜ Licensed library track or ElevenLabs Music after the upgrade (direction below) | — |
| Owner recordings | ⬜ Session A add-on, O1–O11 + stills (a)–(c), by Fri 23 Oct | "Owner recordings needed" below |
| Idea card / INBOX / log | ⚠️ Not touched by this run (the run was limited to this folder). The card `ideas/qsme-build/qs-is-the-project.md` still says "hero + cutdowns produced and reviewed" from an earlier run; it should now read "rendered — awaiting approval (2026-10-04)", with a link to this folder | — |

Re-render from the studio root (hero ≈ 5 min, cutdowns ≈ 2.5 min each; all three can run at once):
```
node tools/motion/make.mjs projects/2026-11-04-qsme-build-qs-alphabet/motion/qs-alphabet.html projects/2026-11-04-qsme-build-qs-alphabet/outputs/qs-alphabet-16x9.mp4 --safe 96,54,1824,1026 --sheet 16
node tools/motion/make.mjs projects/2026-11-04-qsme-build-qs-alphabet/motion/qs-alphabet-4x5.html projects/2026-11-04-qsme-build-qs-alphabet/outputs/qs-alphabet-4x5.mp4 --safe 60,60,1020,1290
node tools/motion/make.mjs projects/2026-11-04-qsme-build-qs-alphabet/motion/qs-alphabet-9x16.html projects/2026-11-04-qsme-build-qs-alphabet/outputs/qs-alphabet-9x16.mp4 --safe 65,300,1015,1250
node tools/motion/make.mjs projects/2026-11-04-qsme-build-qs-alphabet/motion/qs-alphabet-9x16.html <scratch>/qa.mp4 --safe 150,300,930,1250 --check      # Shorts-button QA
node tools/motion/make.mjs projects/2026-11-04-qsme-build-qs-alphabet/motion/thumb.html <scratch>/thumb.mp4 --still 0.5 --still-only            # → outputs/qs-alphabet-16x9-thumb.png
```
Rebuild the caches: `tools/motion/extract assets/qsme/broll/th-1-site.v1.mp4 projects/2026-11-04-qsme-build-qs-alphabet/motion/clips/th1 30 0 8.04 1280` (same for th-2-drainage→th2, th-3-pour→th3, th-4-structure→th4, th-5b-lockup→th5, th-7-complete→th7 0–5, stage-2-foundation→s2, stage-3-frame→s3, stage-4-exterior→s4, stage-5-dusk→dusk, each 0–5.04) · `node projects/2026-11-04-qsme-build-qs-alphabet/motion/still.mjs projects/2026-11-04-qsme-build-qs-alphabet/motion/stills.json projects/2026-11-04-qsme-build-qs-alphabet/motion/clips/stills`

## Review fixes applied (2026-10-04)

The review's verdict was "fix, then re-render". Everything below is in the renders; nothing in the claims changed.

| # | Review point | Fix |
|---|---|---|
| must 1 | "Quantity / Surveying" was complete for only ~0.15 s, then cross-faded into the outline wordmark as a double image | Typed by 9.35, **held complete 9.35–10.7 (1.35 s)**; the words pull back into Q and S, which slide and grow (sizes measured in Chrome) onto the logo letters and **hard-cut** at 11.22, never both on screen; M and E join 11.2–11.6. 4:5: complete by 6.95, held to 8.05. 9:16: complete by 3.0, held to 4.1 |
| must 2 | 25.3–27.4 dead air, 26.9–27.4 with no caption | New beat "In QS order": the alphabet re-forms at 25.0 and the ten letters drop into a second row D R X G T B A I O P numbered 1–10 (25.35–26.6), then the strip docks (26.9–27.35) and D lands on the downbeat (27.4). "Here's your alphabet. In QS order." is held until D's caption replaces it (27.46). D did not move, so the YouTube chapters are unchanged |
| should 3 | Captions read the punchline before it lands | Split captions with hard swaps: A "A. Award." → "Finally. And it's a contract." at the stamp (54.0); X "X. Excel." → "Close enough. In, and back out." (36.95); I "I. Ink." → "Well… a finger, on a phone." (57.95). Same in the cutdowns ("X, Excel." → "…Close enough."; "A…" → "A… finally. Award.") |
| should 4 | Slow hook | Caption on frame 1 (also in the 4:5); typing done by 1.05 s; the clatter starts on "Z" (1.9 s). The tiles were not scaled 1.3x: 26 tiles in one row cannot grow more than ~4 % inside the YouTube safe box, so the readability gain went into the numbers instead |
| should 5 | Shuffle unreadable (tangle of arcs, 20 px numbers) | Arcs draw one at a time in route order (0.2 s each, earlier arcs drop to 30 %), each number pops at 36 px as its arc lands, A's 7 lands with a small swell, then the big "7th" (4.55) |
| should 6 | AI worker in th-6 (69.4–73.6); check th-4 | th-6 dropped (it also had a painter); the rest now plays stage-4 exterior cropped people-free. Every b-roll clip in the hero is now cropped to a people-free region for its whole used range (th-4 had five workers; th-1/2/3/5/7 had figures too), checked on the source frames (see Footage) |
| should 7 | Founder chip said "Live page" over an edited capture | Re-captured the card exactly as the page shows it (both sentences, no DOM edits) and show it whole; only the empty lower padding is cropped, so "Live page · qsme.build/about · captured 4 Oct 2026" is accurate |
| should 8 | 4:5 "All totals excl. tax" sat inside the app window | Moved outside the window (above its top-right corner) in both cutdowns, like the hero |
| should 9 | T showed "Boards supply & fix" twice with no type | Every line in YOUR LINES and WHAT BIDDERS SEE carries its type (MATERIAL / LABOUR), as in the SOQ and the bid breakdown |
| nice | Docked order numbers 12–14 px | Now 22 px (21 px in the 4:5); the "you are here" bar moved under them |
| nice | R: Keep/Discard still showing after "Kept"; toast over the pocket | Buttons leave once kept; the pocket card is shorter and the toast docks below it |
| nice | P: two dense panels, settled banner small | From 67.0 the receiver's window pushes in 1.25x (its empty lower half trimmed) and the payer's dims to 40 %; the settled banner is the last thing read |
| nice | C K U V W sat grey 1.3 s | C lights at 69.8, then every 0.6 s (W 72.2) |
| nice | Cursor over "Export" text | Cursor rests on the button's lower-right edge |
| nice | 9:16 UI copy too small; 4:5 tag over the strip | One key label per moment enlarged to 33–38 px ("4 of 11 sections ready", "Lowest", "Award bid", "Confirm payment received"); in both cutdowns the dusk b-roll and its tag start only after the docked strip has gone |

Not changed: the thumbnail (`outputs/qs-alphabet-16x9-thumb.png`, the review called it strong; `thumb.html` is unaffected because the bigger numbers are opt-in) and the 4:5 / 9:16 covers.

## Hook layers

| # | Use | Text | Verbal (VO) | Visual | Audio |
|---|---|---|---|---|---|
| 1 | **Hero + 4:5 (pattern break)** | Every project runs from A to Z. / Just… never in that order. | "Every project runs from A to Z. Just… never in that order." | Frame 1 already shows A B C on #0C1310 WITH the caption (no logo, no intro). The row types to Z by 1.05 s and clatters split-flap on "Z" (1.9 s); ten letters flip green, then green route arcs draw one at a time D→R→X→G→T→B→A→I→O→P, each letter's order number (36 px) popping as its arc lands; A's number swells to a big "7th", the other 16 dim | Typewriter ticks, split-flap clatter, 0.4 s of dead silence after "order" |
| 2 | **9:16 (question)** | What's the QS in QSME? / Quantity surveying. | "What's the Q-S in Q-S-me? Quantity surveying." | The QSME wordmark (no ®) in white with a green caret blinking under Q, S, M, E in turn; Q and S turn green and lift out into "Quantity / Surveying"; M and E stay dim and unlabelled | Two key clicks, a soft two-note ding as Q and S light |
| 3 | 9:16 B-test (dialogue cold-open) | Brother-in-law: "So what does a QS actually do?" / "QS is typing…" | "How long've you got?" | Generic chat (initials avatars, no app logos, tag "Fictional chat"); the typing bubble grows until it fills the phone; hard cut to "QS. Quantity surveying." | Keyboard clatter that never stops, cut dead |
| 4 | LinkedIn test (call-out) | QS by title. / Or QS by default? | "Q-S by title, or Q-S by default? Either way, this is your alphabet." | A plain business card "Quantity Surveyor" (no name) beside a hard hat taped "Developer, doing the QS bit tonight". In the renders this is the designed fallback (HTML card + drawn hard hat); owner stills (a)/(b) preferred | Pen click, first bar of the track |
| 5 | Paid challenger (mid-action) | D R X G T B A… / spot the pattern? | "D. R. X. G. T. B. A. Spot the pattern? It's the order a job actually happens in." | Giant letters stamp one per beat, each with a split-second flash of its screen; on A the stamp reads "Finally." | Rubber-stamp thud per beat, calculator ticks between |

## Beat table: hero (16:9, 90.0 s)

Captions are burned in, word for word with the VO, in standard spelling (QS, QSME, qsme.build). Where the big on-screen type *is* the VO line (11.6–22.0 and the end card), there is no second caption box.

| Time | On screen | VO (vo-script.json) | Visual / footage | Feature (truth sheet) |
|---|---|---|---|---|
| 0.0–1.9 | Frame 1: A B C + caption "Every project runs from A to Z."; the row types to Z by 1.05 s | Every project runs from A to Z. | Split-flap tiles, Space Grotesk, green cursor | Set-up (owner's phrase) |
| 1.9–5.4 | Split-flap clatter on "Z" (1.9) → D R X G T B A I O P lit green; route arcs draw one at a time (2.55–4.35, 0.2 s each), each number 1–10 (36 px) pops as its arc lands, earlier arcs drop to 30 %; A's 7 lands at 3.75; A → big "7th" (4.55) · "Just… never in that order." (2.86) | Just… never in that order. | 0.4 s silence after "order" | — |
| 5.4–8.4 | Q and S rise and glow; push-in · "Someone keeps it in order. That's the QS." | Someone keeps it in order. That's the Q-S. | M, E stay dim like every unvisited letter | Brand point of view |
| 8.4–11.7 | Q and S fly in (8.4–8.75); "Quantity / Surveying" types 8.72–9.35 and **holds complete 9.35–10.7**; the words pull back into Q and S (10.7–10.95), which slide and grow onto the logo's Q and S and **cut** (11.22, no cross-fade, never both on screen) to the real QSME wordmark; M and E join unlabelled (11.2–11.6); the underline draws from Q's tail; the wordmark holds to the "Good QS." stamp · "QS. Quantity surveying. The QS in QSME." (8.45–11.65) | Q-S. Quantity surveying. The Q-S in Q-S-me. | `qsme-logo-nor.svg` cut per letter | Owner brief 2026-10-04 |
| 11.6–15.4 | "Good QS." / "Good project." stamped; handwritten aside "(We're biased. It's in our name.)" with an arrow at "QS." | Good Q-S, good project. We're biased. It's in our name. | Two soft stamp hits | Conviction, flagged as bias |
| 15.4–22.0 | Ledger: architect icon "Architects design it." · structural engineer "Engineers keep it standing." · general contractor "Builders build it." · red-biro double total line · QS icon "The QS makes it all add up." | (4 lines) | Trade icons; b-roll stage-2 (cropped, no people) → stage-3 (cropped, no people) → stage-4, 30 %, "Illustrative footage" | Respect every trade |
| 22.0–27.4 | "QS by title." business card (no name) / "QS by default." hard hat taped "Developer, doing the QS bit tonight" · "QS & PM practices · Main contractors · Developers & owners" · the split clears (24.75–25.0); the alphabet re-forms mid-frame (25.0) and **"In QS order"**: the ten letters drop out one by one into a second row D R X G T B A I O P numbered 1–10 (25.35–26.6); the row drops away as the strip docks at the top (26.9–27.35), Q and S outlined, numbers 22 px · captions "QS by title, or QS by default." / "Here's your alphabet. In QS order." (held until D's caption replaces it at 27.46; no frame without a caption) | Q-S by title, or Q-S by default. Here's your alphabet. In Q-S order. | Designed fallback for owner stills (a)/(b) | 12.8 audience pages |
| 27.4–31.6 | **D** · 1st · DRAWINGS · Plan index: "Read a document" → "Finding the sections…" → Site plan p.2 / Floor plans p.4–7 / Elevations p.8–11 / Drainage layout p.22–24 → "4 of 11 sections ready" | D. Drawings. The whole set, split into sections. | th-1-site 26 %, cropped to sky and trees (no people) | 3.3 Read my plans / Plan index |
| 31.6–35.8 | **R** · 2nd · ESTIMATING & QUANTITIES · SOQ: Plasterboard & ceilings (Active), rate 64.00 typed, line/pocket/Grand total tick up; "Insulation · AI draft" → Keep → "Kept" (Keep/Discard leave) → "Pocket kept — it's now part of your SOQ" (toast below the pocket card) | R. Rates. Your rates, one schedule. AI drafts. You check. | th-1-site | 3.1 SOQ · 3.6 Draft SOQ with AI |
| 35.8–40.0 | **X** · 3rd · EXCEL IN, EXCEL OUT · captions "X. Excel." then "Close enough. In, and back out." as the scrawl "(close enough)" lands (36.95) · "Import a schedule from Excel or CSV": qsme-example-soq.xlsx → "We also found these columns" (Supplier, Waste %) → "Imported 3 pockets and 11 lines as drafts" → cursor on the Export button's edge → Export menu (Excel/CSV/PDF) | X. Excel. Close enough. In, and back out. | th-2-drainage, cropped (no people) | 3.2 SOQ in and out |
| 40.0–44.2 | **G** · 4th · PLANNING · "Import tasks onto Riverside Terraces (demo)" → "Import jobs from SOQ — The jobs you've priced on this project" → "Import 23 tasks" → bars with dates in words → "What drives the finish date" rings the chain purple → A4 "Construction programme" slides in | G. Gantt. Your priced jobs, no retyping. | th-2-drainage; no holidays, no money, no % | 7.2 · 7.1 · 7.9 · 7.12 |
| 44.2–48.4 | **T** · 5th · TENDERING · "Create New Tender · Plasterboard & ceilings" · "Select whole pocket 4 of 4 selected" · YOUR LINES (rates) / WHAT BIDDERS SEE (rate boxes empty, no header row), every line typed Material / Labour so the two "Boards supply & fix" lines never read as a duplicate · note "rate: never shown" outside the window · "Copy link", invites Invited → Viewed | T. Tender. Same lines, every bidder. Your rates stay home. | th-3-pour, its first 4 s at 0.48x, cropped to the pump boom and sky (no people) | 4.1 · 4.3 |
| 48.4–52.6 | **B** · 6th · TENDERING · "Compare bids": A 74,850 · B 76,200 · C 72,000 · D 73,480 (mail icon, "Received by you") · E 71,940 · F 71,300 "Lowest" · amber chip "All totals excl. tax" (outside the window) · F opens "Detailed price breakdown — Item / Type / Qty / Rate / Line total" | B. Bids. One table, even the emailed one. You choose. | th-3-pour; header row masked; no per-line grid across bidders | 5.2 · 5.1 |
| 52.6–56.8 | **A** · 7th · AWARD & CONTRACT · big "7th" · "Award this bid? — This awards the work to Bidder F for 71,300, creates the payment contract, and notifies all bidders. It can't be undone from here." · caption "A. Award." only, then "Finally. And it's a contract." appears WITH the stamp "Finally." (54.0), never before · "Award bid" → Active Work: Contract value 71,300 · Paid to date 0 · Retention 5% · Milestones 0 / 3 confirmed · Stage 1 of 3 — Mobilisation | A. Award. … Finally. And it's a contract. | th-4-structure cropped to tree, mountain and frames (no people); freeze + silence before "Finally." | 5.3 |
| 56.8–61.0 | **I** · 8th · CONTRACTS · captions "I. Ink." then "Well… a finger, on a phone." as the scrawl "(well… a finger)" lands (57.95) · Agreements "Write it, send it, get it signed": "Subcontract — Plasterboard & ceilings (demo)", 12 pages · PDF · Sign it as it is, "Out for signing" → phone BROWSER: "I have read this agreement and I agree to sign it electronically." ✓, "Your full name" Sam Rivera, "Your signature" drawn, Sign → "Signed. Download a copy below and keep it." → "Everyone has signed" | I. Ink. Well… a finger, on a phone. | th-4-structure, cropped (no people) | 6.2 · 6.4 |
| 61.0–65.2 | **O** · 9th · WORK ON SITE · laminated "Site sign-in" poster on a fence (tag "Illustrative poster · demo") · phone browser "Who are you with?" → "Tick every line to sign in." → "Sign in for today" → "You're signed in, Sam" / "One sign-in covers this site for the day. It's on the record for the builder." · "Daily log": Site photo, Proof of work | O. On site. One QR poster. One daily log. | th-5b-lockup cropped (no people) + blurred 6 px; NZ footer never shown | 8.1 · 8.4 |
| 65.2–69.4 | **P** · 10th · DELIVERABLES & PAYMENTS · WHOEVER PAID: Proof of work, "I paid outside QSME / Only mark this as paid if you have actually sent the money.", Payment reference STG1-0417, "I have sent the money." → Mark as paid → "Recorded as paid outside QSME. Waiting for Bidder F to confirm the money arrived." · WHOEVER GOT PAID: "Confirm you received this payment", "Only confirm if the money has arrived in your account.", "The money has cleared in my account." → Confirm payment received · from 67.0 the receiver's window pushes in 1.25x and the payer's dims to 40 % · both: "Settled outside QSME and confirmed by both sides." (the last thing read) · status Work submitted → Awaiting confirmation → Settled | P. Paid. Your usual way, confirmed by whoever got paid. | th-5b-lockup cropped + blurred; no bank button, no "release" | 10.1 |
| 69.4–73.6 | "And the rest? Alphabetical, for once." · C K U V W light in order every 0.6 s (C 69.8 … W 72.2, then all hold) with "Copy link" · "Keep every word" · "Undo" · "Version history" · "Waiting for OK" (tagged "Illustrative screen · demo data") | And the rest? Alphabetical, for once. | stage-4-exterior from frame 67, cropped right of the excavator, 24 % (th-6-fitout dropped: two workers in frame) | 4.1 · 6.4 · 7.16 · 9.1 · 7.1/7.7 |
| 73.6–77.4 | **Z** · PROJECT MANAGEMENT · every letter lights · "One record." / "First estimate to last payment" · ten cards (D Drawings … P Paid) collapse into one: "ONE RECORD · Riverside Terraces (demo)" with D R X G T B A I O P | Z. One record. First estimate to last payment. | th-7-complete 30 %, cropped to the right-hand house (the left windows have figures in them) | Global summary "one record per project" · 7.3 · 10.3 |
| 77.4–82.2 | Q and S fly from the strip into the QSME wordmark (no ®), M and E join unlabelled · chip "Live page · qsme.build/about · captured 4 Oct 2026" + the real founder card exactly as the page shows it: "Founder and chief executive — A professional quantity surveyor and software architect. QSME is the product of pricing and tendering real projects and then building the tool those projects needed." (first sentence underlined; only the card's empty lower padding is cropped) · caption "QSME. Built by a QS, for whoever's the QS." | Q-S-me. Built by a Q-S, for whoever's the Q-S. | stage-5-dusk blurred, 32 % | Truth sheet (e) founder line |
| 82.2–90.0 | End card: wordmark · pill "Book a 30-minute demo" · "qsme.build" · "Bring your spreadsheet." (holds 3.2 s after the VO ends) | Book a thirty-minute demo at Q-S-me dot build. Bring your spreadsheet. | dusk continues | 12.8 Book a demo |

## Beat table: 4:5 LinkedIn cut (33.0 s)

| Time | On screen | VO (vo-script-4x5.json) |
|---|---|---|
| 0.0–2.2 | A–Z types in two rows of 13 (frame 1: A B C + caption) · caption | Every project runs from A to Z. |
| 2.2–4.0 | Shuffle, ten green with numbers, big "7th" over A · caption | Just never in that order. |
| 4.0–6.4 | Q and S rise and glow, the rest dim · caption "Sorting that out? That's the QS." | Sorting that out? That's the Q-S. |
| 6.4–8.2 | "Quantity / Surveying" (Q, S green) types 6.5–6.95 and holds complete to 8.05 while the QSME wordmark builds below (M, E unlabelled) · caption | Q-S. Quantity surveying. |
| 8.2–11.0 | "Good QS." / "Good project." stamps + "(We're biased. It's in our name.)" | Good Q-S, good project. We're biased. |
| 11.0–13.4 | "QS by title," business card / "or QS by default?" hard hat · audience row | Q-S by title, or Q-S by default? |
| 13.4–26.0 | Docked strip at the top (one row, order numbers). Nine stops, each: eyebrow, giant letter, descriptor line, ONE UI moment (780×480 stand-in scaled to 960 wide), VO caption. D 1.4 "4 of 11 sections ready" (38 px) · R 1.4 "AI draft · Keep" → "Pocket kept" · X 1.4 xlsx → "Imported 3 pockets and 11 lines as drafts" (+ "(close enough)"; caption "X, Excel." then "X, Excel. Close enough." as the scrawl lands) · G 1.4 "What drives the finish date" purple chain · T 1.4 YOUR LINES / WHAT BIDDERS SEE, "rate: never shown" · B 1.4 "Compare bids", F "Lowest" (enlarged), amber note "All totals excl. tax" ABOVE the window (outside the app, never as a UI label) · A 1.6 big "7th", "Finally." stamp (caption "A…" then "A… finally. Award." WITH the stamp), "Award this bid?" → "Award bid" (enlarged) → Active Work · O 1.3 poster + phone browser → "You're signed in, Sam" · P 1.3 "Confirm payment received" (enlarged) → "Settled outside QSME and confirmed by both sides." (I is not voiced; its tile lights with O so the strip stays in order). Order numbers under the docked strip 21 px; the "you are here" bar sits under them | D, drawings. R, rates. X, Excel. Close enough. G, Gantt. T, tender. B, bids. A… finally. Award. O, on site. P, paid. |
| 26.0–28.4 | Every letter lights, Z stamps, wordmark builds, "Built by a quantity surveyor." · dusk b-roll and its "Illustrative footage" tag only from 27.0, after the docked strip has gone · caption "Z. One record. Built by a QS." | Z. One record. Built by a Q-S. |
| 28.4–33.0 | End card: wordmark · "Book a 30-minute demo" · "qsme.build" · "Bring your spreadsheet." (dusk b-roll, tagged) | Book a thirty-minute demo at Q-S-me dot build. |

## Beat table: 9:16 Shorts cut (30.0 s, Hook A)

All text inside x 150–930, y 300–1250 (clear of the Shorts buttons and title).

| Time | On screen | VO (vo-script-9x16.json) |
|---|---|---|
| 0.0–2.4 | "What's the QS / in QSME?" over the white QSME wordmark, green caret blinking under Q, S, M, E | What's the Q-S in Q-S-me? |
| 2.3–4.2 | Q and S turn green and lift (2.3); "Quantity / Surveying" complete by 3.0 and held to 4.1; M, E dim, unlabelled | Quantity surveying. |
| 4.2–6.8 | "Good QS." / "Good project." + "(We're biased.)" | Good Q-S, good project. We're biased. |
| 6.8–10.0 | A–Z in two rows types and shuffles, numbers, big "7th" · caption "A to Z. Never in that order." | A to Z. Never in that order. |
| 10.0–22.6 | The same nine-letter block as the 4:5 (strip at y 314, giant letter + descriptor, moment card 780×480 at y 660, caption band ending y 1230; the one key label per moment enlarged to 33–38 px; B's tax note above the window at y 610) | D, drawings … P, paid. |
| 22.6–25.6 | Every letter lights, Z, wordmark, "Built by a quantity surveyor." · dusk b-roll and its tag only from 23.6, after the docked strip has gone · caption "Z. One record. Built by a QS." | Z. One record. Built by a Q-S. |
| 25.6–30.0 | End card | Book a thirty-minute demo at Q-S-me dot build. |

**Length note:** the concept planned 88 s / 32 s; the renders run 90 s / 33 s so the end card holds 3 s after the last VO word (the concept's rule). Chapters are unchanged.

**Hook B test (not rendered):** swap only 0–4.2 s: a generic chat (initials avatars, tag "Fictional chat"), "Brother-in-law" asks "So what does a QS actually do?", "QS is typing…" grows until it fills the phone (VO "How long've you got?"), hard cut at 2.6 s to "QS. Quantity surveying." (VO "Q-S. Quantity surveying."). The asker is family, never a client.

## Captions, titles and hashtags (Global CTA only; nothing "free")

**LinkedIn, founder profile (4:5 video), Wed 4 Nov 20:30 NZDT** (draft in his voice, for his approval):
> Every project runs from A to Z. Just never in that order.
>
> I'm a quantity surveyor. Keeping that alphabet in order is the job. It's also the QS in QSME: quantity surveying.
>
> Good QS, good project. I'm biased. It's in our name.
>
> So we built QSME for whoever's the QS on the job, by title or by default:
> D: drawings, split into sections
> R: your rates in one schedule (AI drafts, you check)
> X: Excel in, and back out
> G: a Gantt from the jobs you priced
> T: tenders cut from your schedule, same lines for every bidder, your rates never shown
> B: every bid in one table, even the emailed one
> A: award. Finally. And it's a contract.
> I: signed from a link, on a phone
> O: one QR poster, one daily log
> P: paid your usual way, confirmed by whoever got paid
> Z: one record, first estimate to last payment
>
> Book a 30-minute demo at qsme.build. Bring your spreadsheet.
> Screens are illustrative, with demo data. The full 90-second version is in the first comment.
>
> #QuantitySurveying #Construction #Estimating #Tendering #ConstructionManagement

First comment (founder): "The full film, A to Z: [YouTube link]. Deep dives on some of the letters: T → Column H · B → Why six bids never compare · I → Day 23 of one signature · G → A programme a lender can read · O → Wednesday: As above · P → Remittance attached."

**LinkedIn, QSME page (16:9 hero), Thu 5 Nov 10:30 NZDT, pinned to Featured:**
> Every project runs from A to Z, just never in that order. The QS keeps it in order, and QS is the QS in QSME: quantity surveying. Here's the alphabet in the order a job really happens, from drawings to the last payment, in one record. Built by a quantity surveyor, for whoever's the QS. Book a 30-minute demo at qsme.build. Bring your spreadsheet.
> (Screens are illustrative, with demo data.)
> #QuantitySurveying #ConstructionTech #Estimating #Tendering

**YouTube (16:9 hero), Wed 4 Nov 20:30 NZDT**
- Title: **The QS Alphabet: A to Z, never in that order**
- Thumbnail: `outputs/qs-alphabet-16x9-thumb.png` (the shuffled row, A's big "7th", the "Finally." stamp)
- Description:
  > Every project runs from A to Z, just never in that order. Keeping it in order is the QS's job, and QS is the QS in QSME: quantity surveying. Good QS, good project. We're biased. It's in our name.
  >
  > QSME is built by a quantity surveyor for whoever's the QS on a project: QS and PM practices, main contractors, developers and owners. Drawings split into sections, your rates in one schedule, Excel in and out, a Gantt from the jobs you priced, tenders where every bidder prices the same lines, every bid in one table, award into a contract, agreements signed from a link, QR sign-in and a daily log on site, milestones paid your usual way and confirmed by whoever got paid. One record, first estimate to last payment.
  >
  > Book a 30-minute demo at qsme.build. Bring your spreadsheet.
  > Screens in this film are illustrative, with demo data. Site footage is illustrative.
  >
  > 0:00 What QS stands for
  > 0:27 D to A (finally)
  > 0:57 I to P, and the rest
  > 1:13 Z: one record
  >
  > #QuantitySurveying #ConstructionTech #QSME
- Pinned comment: the six deep-dive films, letter by letter (as above).

**YouTube Shorts (9:16), Thu 5 Nov 20:30 NZDT**
- Title: **What's the QS in QSME? #QuantitySurveying**
- Description: "QS = quantity surveying. Good QS, good project (we're biased). A to Z, never in that order. Book a 30-minute demo at qsme.build. Screens are illustrative, with demo data." · #QuantitySurveying #Construction #Shorts
- Cover: `outputs/qs-alphabet-9x16-cover.png`. The channel header links to qsme.build.

**IG Reels / TikTok:** only if Global accounts exist; reuse the 9:16 with the Shorts copy (link in bio: qsme.build).

## Music and sound direction

About 114 BPM, so each letter is exactly two bars (4.2 s) and every letter cut lands on a downbeat. Dry, playful and professional: muted marimba or pizzicato, upright bass, brushed snare. Percussion from the props: typewriter ticks (0–1.05), split-flap clatter on "Z" (1.9–2.65), one soft tick per route arc (2.45–4.35) and per letter of the QS-order row (25.35–26.6), a dry key click (no whoosh) on the wordmark cut (11.22), calculator keys, a soft rubber stamp (11.72, 12.62, 54.0, 73.75). Two dead silences: 0.4 s after "never in that order" (4.7–5.1) and 0.25 s before "Finally." (53.75–54.0). The trades beat (15.4–22.0) thins to felt piano and bass, warm not jokey; the groove returns on "Here's your alphabet" (24.75). Light foley per letter, under the music: D page turn · R calculator key · X dry "boop" · G pencil line · T envelope slide · B paper slap · A stamp · I pen scratch · O gate latch · P quiet tick. No tape-measure zips or laser beeps (we never claim measuring) and no cash register (QSME never moves money). "And the rest?" rides 16th-note calculator ticks (69.8–72.4); Z drops to piano alone, resolves on a held major chord as Q and S become the wordmark, short tail under the end card. Duck 10–12 dB under the VO. Cutdowns use the intro plus the last 16 bars. Licensed library track cleared for paid social, or ElevenLabs Music on a commercial plan after the upgrade. Every beat already reads with the sound off.

## Owner recordings needed (one sitting in the Global demo org used for Six bids' Session A, by Fri 23 Oct)

Set-up: non-NZ country, invented companies and people, demo letterhead, desktop 1920×1080, phone shots in the phone **browser**. Crop GST labels, "($)" headers, the "calc." note, the "NZ Construction Platform" tab title and NZ footers. Christmas shutdown OFF; Gantt Cost/Paid columns hidden.

| # | Letter | Shot | Replaces (hero time) |
|---|---|---|---|
| O1 | D | Read my plans on a demo drawing set (no legible title block): "Read a document" → sections → "N of N sections ready" | 27.4–31.6 |
| O2 | R | Draft SOQ with AI on the read set; keep one AI-draft pocket, discard one; type a rate so the Grand total ticks | 31.6–35.8 |
| O3 | X | Import assets/qsme/samples/qsme-example-soq.xlsx → "We also found these columns" → toast; open the Export menu | 35.8–40.0 |
| O4 | G | "Import jobs from SOQ" → "Import N tasks" → "What drives the finish date" on → export the "Construction programme" PDF | 40.0–44.2 |
| O5 | T | "Create New Tender" from Plasterboard & ceilings → "Select whole pocket" → invite 3 demo contacts → "Copy link" → Invited → Viewed | 44.2–48.4 |
| O6 | T/B | Bidder view on a second demo account (rate column empty; crop the free-to-submit banner) · "Compare bids" with six demo bids matching Six bids, one via "Add a bid you received" with the checked tick; frame on "Compare on: Excl."; open "Detailed price breakdown" | 44.2–52.6 |
| O7 | A | "Award this bid?" (Bidder F) → Active Work card | 52.6–56.8 |
| O8 | I | Bring in a demo subcontract PDF → "Sign it as it is" → "Send for signing"; a second phone signs in its browser → "Signed. Download a copy below and keep it." → "Everyone has signed" | 56.8–61.0 |
| O9 | O | Hands-only scan of a fresh Global poster → "You're signed in" (footer cropped) → a daily log note + photo, and a chat photo tagged "Proof of work" | 61.0–65.2 |
| O10 | P | Two accounts: "Submit progress" → "I paid outside QSME" + reference → "Confirm payment received" → settled banner | 65.2–69.4 |
| O11 | rest | 1–2 s each: "Copy link", "Keep every word", "Undo", "Version history" (upload over a drawing → v2), "Waiting for OK" | 69.4–73.6 |
| (a) | who | Still: plain business card printed "Quantity Surveyor", no name, desk, window light | 22.0–27.4 (HTML card now) |
| (b) | who | Still: hard hat with masking tape "Developer, doing the QS bit tonight" in marker | 22.0–27.4 (drawn hat now) |
| (c) | O | Take: a fresh Global "Site sign-in" poster, laminated, cable-tied to the owner's own fence, NZ wording cropped, no address | 61.0–65.2 (illustrative poster now) |

After a swap, drop the "Illustrative screen" label but keep a small "demo data" tag. If a shot is missing on 1 Nov, that letter ships as its tagged recreation and the post keeps "Screens are illustrative, with demo data."

## Integrity notes (every claim → truth sheet)

| Claim on screen / in VO | Basis | Guardrail kept |
|---|---|---|
| "QS = quantity surveying", "the QS in QSME" | Owner brief 2026-10-04; pronunciation in ventures/qsme-build.md | ME never expanded or implied; Q/S/M/E carry no feature |
| "Someone keeps it in order. That's the QS." / "Good QS, good project." / "The QS makes it all add up." | Brand conviction | Flagged as bias ("We're biased. It's in our name."); no statistic; architects, engineers, builders each get a respectful line; no trade ranked |
| "QS by title, or QS by default"; "QS & PM practices · Main contractors · Developers & owners" | 12.8 audience pages | — |
| D "The whole set, split into sections." | 3.3 Read my plans / Plan index (live, NZ + Global) | "Drawing set", never "consent pack"; no viewer, mark-up, measuring or takeoff; paid/trial not mentioned |
| R "Your rates, one schedule. AI drafts. You check." | 3.1 SOQ; 3.6 Draft SOQ with AI ("AI draft · Keep", "Pocket kept — it's now part of your SOQ") | Never "QSME supplies rates", "measures" or "replaces the QS"; "measured Schedule of Quantities" never in frame |
| X "In, and back out." / "Imported 3 pockets and 11 lines as drafts" | 3.2 import/export | Counts are the real counts of assets/qsme/samples/qsme-example-soq.xlsx (Foundations 5, Framing 4, Roofing 2 lines); its NZ supplier names are never shown |
| G "Your priced jobs, no retyping." · "What drives the finish date" · "Construction programme" | 7.2 · 7.1 (dates in words) · 7.9 · 7.12 | Not AI-planned; "critical path" never said or shown; no holidays, no shutdown band, no money or % on bars; dates are a Mon–Fri demo programme |
| T "Same lines, every bidder. Your rates stay home." | 4.1 (Global tenders private, by invitation; "Copy link") · 4.3 (rates, amounts, budget stripped server-side) | Bidder header row with "($)" never shown; "Invited bid: free to submit" never in frame; "YOUR LINES / WHAT BIDDERS SEE" and "rate: never shown" are our annotations |
| B "One table, even the emailed one. You choose." | 5.2 Compare bids (one row per bidder, totals, "Lowest", each bid opens to its own lines) · 5.1 Add a bid you received ("Received by you") | NOT a line-by-line matrix; header masked (live Global labels say GST), tax basis is our annotation "All totals excl. tax" outside the window; QSME never picks the winner |
| A "Award. Finally. And it's a contract." | 5.3 Award ("Award this bid?…", Active Work, Retention, "Milestones 0 / 3 confirmed", "Stage 1 of 3 — Mobilisation") | Nothing signed at award; retention a recorded %; can't be undone (quoted) |
| I "Ink. Well… a finger, on a phone." | 6.2 agreements from a link (consent tick, typed name, drawn signature, "Signed. Download a copy below and keep it.", "Everyone has signed") · 6.4 "Sign it as it is" | Phone **browser**, not the app; contractor's own PDF, no NZ-law template shown; no "legally binding" claim |
| O "One QR poster. One daily log." | 8.1 QR site sign-in ("Who are you with?", "Tick every line to sign in.", "Sign in for today", "You're signed in…", "One sign-in covers this site for the day. It's on the record for the builder.") · 8.4 Daily log (Site photo, Proof of work) | No compliance, GPS or identity claims; NZ footer never shown; poster tagged "Illustrative poster · demo"; PPE lines are demo checklist text |
| P "Paid. Your usual way, confirmed by whoever got paid." | 10.1 milestones (all strings quoted) | A record, not a payment; no bank button, no "release", no escrow; QSME never holds, moves or verifies money |
| C/K/U/V/W "Copy link · Keep every word · Undo · Version history · Waiting for OK" | 4.1 · 6.4 · 7.16 · 9.1 · 7.1/7.7 | Live NZ + Global UI labels |
| Z "One record. First estimate to last payment." | (a) Global summary "It keeps one record per project" · 7.3 · 10.3 | Never "every single part" or "QSME manages your build"; never says the estimate equals the contract sum |
| "Built by a QS" / "Built by a quantity surveyor" | qsme.build/about (real element capture, 4 Oct 2026, unedited): "Founder and chief executive — A professional quantity surveyor and software architect. QSME is the product of pricing and tendering real projects and then building the tool those projects needed." | Founder unnamed; the card is shown whole (no sentence removed, so the "Live page" chip is accurate); only its empty lower padding is cropped; nav and footer not captured; an AI voice never speaks as him |
| "Book a 30-minute demo at qsme.build. Bring your spreadsheet." | 12.8 (30 minutes on a working project; "Bring your spreadsheet to the demo"); owner CTA rule 2026-10-03 | No "free", no price, no "sign up at qsme.build", no ® |

**Demo data:** "Riverside Terraces (demo)", the Plasterboard & ceilings package, Bidders A–F with the Six bids figures (F's breakdown 26,536 + 18,848 + 23,180 + 2,108 + 628 = 71,300), the owner's demo rates (pocket 74,272), Sam Rivera, Demo Interiors / Northside Linings / Plaster Co. (demo), reference STG1-0417, short code KQ7MD-4XRTP and the QR pattern (decorative, scans to nothing) are all invented. Every product screen is a designed stand-in built from the truth sheet's exact strings and labelled "Illustrative screen · demo data".

**Footage:** AI brand b-roll from assets/qsme/broll, always dimmed (22–32 %), blurred where wrap branding could read (th-5b), tagged "Illustrative footage" and never captioned as a real project. **No person appears in any b-roll frame:** every clip is cropped (zoom + origin in `broll()`) to a region that stays people-free for its whole used range, checked on the source frames at start, middle and end (4 Oct 2026): s2 zoom 1.7 @ 90 % 95 % from f87 · s3 1.75 @ 85 % 0 % from f20 · s4 full frame f0–67 (trades) and 1.15 @ 100 % 50 % from f67 (the rest) · th1 1.6 @ 0 0 · th2 1.7 @ 0 0 · th3 2.25 @ 32 % 0 %, f0–120 only (0.48x) · th4 1.9 @ 0 0 · th5 1.8 @ 0 0 + blur 6 · th7 2.2 @ 100 % 36 % · dusk full frame. Not used: th-6-fitout (two workers), stage-1-site (tripod figure), tradies-still, gf-1-idea, all assets/qsme/phone captures, all walkthrough clips. In the cutdowns the dusk b-roll and its tag start only after the docked strip has gone (4:5 27.0, 9:16 23.6).

**Never said or shown (checked):** free / pricing generosity / sign up at qsme.build · measure, measured, takeoff, mark-up · line by line, side by side, conforming · critical path · "AI replaces the QS", "nothing is guessed" · "every single part", "QSME manages your build" · GST, tradie, consent pack, NZD, NZ holidays, Christmas shutdown · escrow, release the funds, secure payments, verified, compliance · counts, customers, testimonials, time or money saved, competitor names · what ME stands for, ®, the 15-language website, Android, SMS, in-app calls.

## Open questions for the owner

1. **(a) ME:** is there an official meaning? The film leaves it unexpanded, with no "QS: me" ending.
2. **(b) Voice:** will you read the VO yourself? `founder_alt_lines` has the first-person line ("I'm a quantity surveyor. I built Q-S-me for whoever's the Q-S."). Otherwise "The QS" voice reads it in the third person.
3. **(c)** May "critical path" appear in post copy? The film itself never uses it.
4. **(d)** qsme.build still says "compared line by line", "critical path", "mark up the drawings" and "pricing and bidding are free". Fix before this film sends traffic there.
5. **(e)** Approve the Session A add-on shots O1–O11 and stills (a)–(c).
6. ~~The hero's founder card is a crop with the second sentence trimmed.~~ Resolved 4 Oct: the card is now captured and shown whole, unedited. Re-capture in publish week if the About page changes.
- 2026-10-06: KILLED by the owner: the letters device is confusing and the voiced versions had no energy. Do not reuse this concept.
