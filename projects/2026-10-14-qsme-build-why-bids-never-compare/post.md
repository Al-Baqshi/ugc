---
title: "Why six bids never compare (it's the tender, not the subcontractors)"
venture: qsme-build
idea: gl-why-bids-never-compare
status: "rendered v2.1 (owner CTA rule 2026-10-03) — awaiting approval"
publish_date: 2026-10-14
publish_time: "19:30 NZDT (Wed 07:30 London BST, 10:30 Dubai, 09:30 Riyadh)"
created: 2026-10-02
calendar_week: 2
format: long
kind: long-form
length_s: 139
aspect: "16:9"
platforms: ["LinkedIn (native video, founder profile; page reposts Thu 08:30 Sydney)", "YouTube (chapters from the chapter cards)"]
video: outputs/why-bids-never-compare-16x9.mp4
thumbnail: outputs/why-bids-never-compare-thumb.png
follows: projects/2026-10-02-qsme-build-six-bids-six-formats
---

# Why six bids never compare (it's the tender, not the subcontractors)

**The insight in one sentence:** Six bids on the same plasterboard & ceilings package can't be held against each other, and it isn't the subcontractors' fault: our tender let everyone price something slightly different, so we fix the tender in five places and the bids start to compare (and a person still picks the winner).

**The joke (light, one per chapter, always on us):** the tender we laid on the pile just says "Drawings attached. Please price."; "Bidder D: missed off the list"; "looks cheaper" struck out; and the emailed-quotes chapter's aside, "Photos too. Yes, even the whiteboard."

**Job:** Week 2 long-form, the payoff to "Six bids. Six formats." posted a week later while the people who commented are still warm. It answers "so what do I do about it?". LinkedIn native video from the founder's profile (the page reposts Thu 08:30 Sydney) and YouTube, where the chapter cards become YouTube chapters and the video becomes the standing link for demo follow-ups. Silent-first: every beat reads with the sound off; the Kiwi VO is scripted for later, ideally read by the founder.

## Production status (2026-10-03, v2.1 owner CTA rule)

| Piece | State | Where |
|---|---|---|
| 16:9 master, 139.0s, 1920×1080, 30 fps, silent-first with burned-in captions | ✅ Re-rendered 2026-10-03 (v2.1) for the owner CTA rule: two on-screen lines fixed, same 139.0s timings, QA ok on 96,54,1824,1026 (101.6 MB, 4,170 frames); preview refreshed. Before that, v2 had every review must-fix and should-fix applied (see "v2 review fixes" below). QA passed on the YouTube safe box 96,54,1824,1026. New contact sheet read; full-size stills checked at every changed moment and frames pulled from the encoded MP4 (list under "QA") | `outputs/why-bids-never-compare-16x9.mp4` · `outputs/why-bids-never-compare-16x9-frames.png` |
| YouTube / LinkedIn thumbnail (frame at 5.9s: "6 bids. 0 that compare. It's not the subcontractors. It's the tender." + the tender ringed in red) | ✅ 1280×720 PNG. The hook (0–6.3) did not change in v2 or v2.1 and has no pricing or sign-up text, so the thumbnail still matches the video (not re-exported) | `outputs/why-bids-never-compare-thumb.png` |
| Motion source | ✅ `motion/why-bids-never-compare.html` (kit page, `body.build r16x9`) | motion/ |
| Live public-page footage | ✅ Captured 2026-10-02 from the public pages, nothing typed: hi-res element crops of qsme.build/platform/tendering (two FAQ answers, the "Award is a person's decision" card, the "Run one of your packages through it" band). The tax FAQ is cropped after "…the basis you choose" (v2); the award card is cropped after "…awards a tender." (v2.1, owner rule). The /pricing screencast is retired (owner rule 2026-10-03: no pricing lines); its files stay in `motion/clips/pricing` and must never be reused | `motion/clips/stills/` (from `motion/stills.json` via `motion/still.mjs`) |
| Brand b-roll | ✅ `assets/qsme/broll/th-6-fitout.v1.mp4` 0.0–8.0s under the 7.9s end card (darkened) | `motion/clips/fitout-long/` |
| Product screens | 🟡 Eight signed-in screens are recreated stand-ins built from the truth sheet's exact wording. While one is on screen the top bar reads **"Recreated screen · demo data"** (26px, viewer-facing). Swap list below | see "Owner recordings to swap in" |
| VO | 🟡 Timed Kiwi script re-timed to the 139.0s master: 38 lines, 1,407 characters, word for word with the captions (series rule). Best read by the founder; AI fallback after the ElevenLabs upgrade. `tools/vo_status.py`: ok | `vo-script.md` · `vo-script.json` |
| Music + SFX | ⬜ ElevenLabs Music / SFX on a commercial plan, or a licensed library track (see Music) | none yet |

**Re-render from the studio root:** `node tools/motion/make.mjs projects/2026-10-14-qsme-build-why-bids-never-compare/motion/why-bids-never-compare.html projects/2026-10-14-qsme-build-why-bids-never-compare/outputs/why-bids-never-compare-16x9.mp4 --safe 96,54,1824,1026` (add `--check` while editing; about 8 minutes for the full render). Thumbnail: the same command with `--still 5.9 --still-only` into a scratch folder, then `sips -Z 1280`.
**Re-capture the public pages (public pages only, nothing typed):** `node projects/2026-10-14-qsme-build-why-bids-never-compare/motion/still.mjs projects/2026-10-14-qsme-build-why-bids-never-compare/motion/stills.json projects/2026-10-14-qsme-build-why-bids-never-compare/motion/clips/stills`. If the pages change, re-check the highlight boxes (`.hl` positions in the page come from the `hl` boxes in `clips/stills/*.json`) and the two crops: the tax FAQ (the `clip-path` on its `<img>` ends the answer after "choose") and the award card (the `#wH2` window is 368px tall and a card-coloured block hides the rest of line 2 after "…awards a tender.", so the card's "without an account … sign up" sentence is never in frame). `stills.json` no longer has the /pricing table shot.
**When the owner's recordings arrive:** cut each one with `tools/motion/extract` into `motion/clips/<name>`, replace the matching `.win` stand-in with `<img class="abs">` + `Kit.clip(...)` at the same times, and remove that interval from the `#tagIll` opacity track. Keep the "All totals excl. tax" chips (`#tot5`, `#totH`) over shots 8 and 9. Timings and captions don't change.

### v2.1 owner CTA rule (2026-10-03)

- **Rule:** QSME content pushes sign-ups/demos and never says or shows "free", "no sign-up", "no login", "without an account", per-seat or success-fee lines, "bidders never pay" or any other generous pricing line. Global CTA: "Book a 30-minute demo at qsme.build".
- **Fixed in the video (2 on-screen lines):** the "Add a bid you received" stand-in (95.4–100.7) now reads "New to you. They will be saved to your contacts when you save." (the "— they don't need a QSME account" clause is gone); the live "Award is a person's decision" card (112.2–116.0) is cropped after "…awards a tender." so its "You can award to a firm without an account … when they sign up" sentence is never in frame (window 1000×368, re-centred; chip moved with it). Captions, VO, timings and every other beat are unchanged.
- **Post copy:** every CTA now leads with "Book a 30-minute demo at qsme.build" (LinkedIn founder post, first comment, page repost, YouTube description, pinned comment, CTA line). Hashtags, title and thumbnail had nothing to fix.
- **Retired:** the /pricing table shot is removed from `motion/stills.json`; `capture-pricing.json` and `pricing-stamps.js` are marked retired (the capture shows per-seat, success-fee and "bidders pay" lines; it was already out of the video since v2).

### v2 review fixes (2026-10-02)

- **Stand-in label (must-fix):** "Illustrative — swap for real QSME screen (demo data)" → **"Recreated screen · demo data"**, 26px (was 20px), same dashed chip and on/off track. The swap instruction lives only in this file.
- **Chapter 4 tax example (must-fix):** de-productised. No pill toggle and no green "Lowest" tag any more: the two bids stay "as written" and the conversion is our own napkin maths on an engineering pad headed "our maths" ("both incl. VAT: X 10,000 + 20% = 12,000, Y 11,500" ringed; "both excl. VAT: X 10,000, Y 11,500 ÷ 1.2 = 9,583" ringed; "Y is cheaper, either way."). The live tax FAQ is cropped so it ends at "Yes. The comparison sorts on the basis you choose" (the "never compared … on the wrong number" clause is gone). See the open question on the Global calc rate.
- **Pacing (should-fix):** title card held to 6.5s (the five reasons build 0.5s apart, the subline holds 3.1s); six-scopes beat 3.6 → 5.5s with cards A→F 0.35s apart and the caption after the third card; recap 4 → 7s, headline dropped (the caption carries it), TENDER sheet centred and larger, ticks 0.6s apart.
- **Basis on the totals (should-fix):** amber chip "All totals excl. tax" (styled like "Example figures") outside the window on both Compare-bids stand-ins (100.7–104.6, 106.8–112.2). Keep it over the real recordings.
- **"Fair fight" (should-fix):** the /pricing screencast is gone. The line now lands on a callback: part 1's six bids fly into six identical rows ("same lines · Rev C sheets · + bulkheads · excl. tax" + each total), 116.0–120.0.
- **Caption 09 (should-fix):** "So the totals mean the same thing." → "So every total prices the same scope." (caption, VO json and md).
- **End card (should-fix):** 4.6 → 7.9s; logo, qsme.build, the demo pill and the comment prompt sit in the left half; the right half is a clear zone for YouTube end-screen elements. The comment prompt is up 6.3s (was 3s).
- **Nice ones done:** "STEP 3 OF 4" (the truth sheet's demo moment is step 3); both bidder windows' crumbs now "app.qsme.build · Tenders"; the "Add a bid you received" window sits below the top band with a gentle 5% push that never slides it under (and the top band is now fully opaque, so no window chrome ghosts through anywhere); Bidder F carries the mail icon and "Received by you" (it's the whiteboard photo), and the aside holds 2.9s; the cursor parks beside its target after each click; the "drawing set v2 uploaded" chip sits ~18px below the window edge (the window is shorter and pushes in less), and the "Read my plans" chip clears its window too.
- **Not done (needs the owner's recordings first):** a 1:1 LinkedIn cut with tighter crops (see open questions).

**QA (v2.1, 2026-10-03):** `make.mjs` QA ok on 96,54,1824,1026 (139.0s, 4,170 frames, 101.6 MB); contact sheet read; page stills at 96.5, 99.5, 112.6, 114.5 and 115.9 and frames from the encoded MP4 at 97.0, 112.5, 114.6, 115.9 and 138.8 checked: the "Add a bid you received" bidder line ends at "…when you save.", and the award card shows only "No automation and no assistant awards a tender." through the whole push-in. The refreshed `.preview.mp4` was checked at 114.6.

**QA (v2):** `make.mjs` QA ok on the safe box 96,54,1824,1026 (139.0s, 4,170 frames, 103.3 MB). Contact sheet (16 samples) read. Full-size page stills checked at 9.9, 18.5, 42.8, 49.5, 61.8, 76.5, 80.5, 84.0, 96.5, 99.2, 100.0, 103.0, 110.5, 116.9, 117.2, 119.0, 124.5 and 135.0, and frames pulled from the encoded MP4 with `tools/motion/frames` at 0, 9.9, 12.0, 18.0, 23.5, 42.8, 49.5, 61.8, 72.5, 76.0, 80.5, 84.0, 99.8, 102.5, 110.5, 117.3, 119.0, 124.0, 129.0, 133.0 and 138.8 (every fixed moment: title list and subline, staggered scope cards, STEP 3 OF 4, cursor parks, chips clear of window edges, the pad maths and rings, the cropped FAQ with no trailing clause, the emailed-bid window below the band, A and F "Received by you" + aside, the excl.-tax chips, the fair-fight rows, the centred recap, the left-half end card with moving b-roll to the last frame).

## Hook layers (frame 1 is already the hook)

- **Text:** "6 bids." (200px) / "**0** that compare." (red 0). Chip: "Plasterboard & ceilings · tender closed 5:00 pm". Then "It's not the subcontractors." (2.7) and "It's the tender." (4.75, green).
- **Visual:** the six bids from part 1 (the sideways PDF, the merged-cells laptop, "As discussed.", the "Price below." phone, "Note 14: Excludes ceilings.", the whiteboard photo, each tagged A–F) sit scattered on frame 1, get pushed into one pile (0.45–1.9), and a sheet titled **TENDER · Plasterboard & ceilings** slams on top (4.45–4.78). It says only "Drawings attached. Please price." (the part-1 punchline), and a red marker rings it (5.05).
- **Verbal (VO later):** "Six bids. Zero that compare. It's not the subcontractors. It's the tender."
- **Audio:** a paper slide, the sheet landing, one pen click, then the marker.
- **Why it works:** every QS has stared at six bids that won't line up. It names the pain in two seconds, takes the subcontractors' side straight away (they're our audience's supply chain, and often our audience), and turns the blame on the document we wrote, which is the whole thesis.

## Beat-by-beat script (times are seconds on outputs/why-bids-never-compare-16x9.mp4, 139.0s)

| Time | Role | On-screen text | VO (later, = caption) | Visual | SFX |
|---|---|---|---|---|---|
| 0.0–6.3 | hook | 6 bids. / 0 that compare. · It's not the subcontractors. (2.7) · It's the tender. (4.75) | Six bids. Zero that compare. · It's not the subcontractors. · It's the tender. | Six part-1 bids pushed into a pile; the TENDER sheet slams on top; red ring around "Drawings attached. Please price." | Paper slide 0.45–1.9, sheet lands 4.78, pen click 4.95, marker 5.05 |
| 6.3–12.8 | title + chapters | PART 2 · AFTER "SIX BIDS. SIX FORMATS." · **Five reasons bids don't compare.** · 1 Everyone read the scope differently · 2 Two drawing revisions in circulation · 3 The scope changed. One bidder never heard. · 4 "Plus tax", "incl. tax" · 5 It came by email · And the fix for each one. | Five reasons. (6.65) · And the fix for each one. (9.8) | The pile slides right; the list builds 0.5s apart (7.0–9.0); the subline lands 9.7 and holds 3.1s (this is the table of contents and the YouTube chapter list) | Music enters 6.3 |
| 12.8–15.4 | chapter 1 card | 1 · REASON 1 OF 5 · Everyone read the scope differently. | One. Everyone read the scope differently. | Wipe (dark panel, green edge) into a big numeral card; top bar "WHY BIDS NEVER COMPARE · PART 2" with chapter pips 1–5 appears | Soft whoosh 12.8 |
| 15.4–20.9 | problem | No lines to price, so six bidders wrote **six scopes**. (from 16.75) | No lines to price, so six bidders wrote six scopes. | Our tender email ("To: Bidders A–F · Drawings attached. Please price.") branches into six scope cards, landing A→F 0.35s apart (15.95–17.7): A "Did their own take-off" · B "As per drawings" (which ones?) · C "As discussed." · D "Price below." (Nothing below.) · E "Excludes ceilings (note 14, page 9)" · F "Ceilings INCL (on a whiteboard)" | none |
| 20.9–25.3 | fix | Cut the tender from **your estimate**. | Cut the tender from your estimate. | Stand-in: "Create New Tender" · STEP 3 OF 4 · "SOQ jobs to include (optional)" · pocket "Plasterboard & ceilings" (Active) · cursor clicks **"Select whole pocket"** (22.2) and four jobs tick · "4 of 4 selected" · slow push-in | Trackpad click 22.2 |
| 25.3–29.7 | fix | **Same lines** for every bidder. (25.45) · Your rates and budget **never go with them**. (27.3) | Same lines for every bidder. · Your rates and budget never go with them. | Stand-in split: "YOU · your SOQ, rates in" (Line / Qty / Rate / Total, pocket total 73,988) beside "EVERY BIDDER · same lines, no rates" ("Est Qty / Bid Qty / Rate / Total Cost", rate boxes empty). Bidder tabs step A→F with identical lines; our rate column glows | none |
| 29.7–33.6 | proof (live page) | So every total prices **the same scope**. | So every total prices the same scope. | Live qsme.build/platform/tendering FAQ "What is a private tender?", highlighted: "so the invited firms all price the same lines" | Highlighter swipe 30.3 |
| 33.3–35.9 | chapter 2 card | 2 · Two drawing revisions in circulation. | Two. Two drawing revisions in circulation. | Wipe, numeral card | Whoosh 33.3 |
| 35.9–39.5 | problem | Three priced **Rev B**. Three priced **Rev C**. | Three priced Rev B. Three priced Rev C. | Two reflected ceiling plans, Rev B and Rev C; Rev C's new bulkhead gets a red revision cloud; "Priced by A B C" / "D E F" | Marker 37.4 |
| 39.5–44.1 | fix | Point every bidder at **the right sheets**. | Point every bidder at the right sheets. | Stand-in: "Point them at the right sheets" · "From your indexed plans — tick the sections this work is about." · chips "Drawing set · v1", "Plan index" · ticks Reflected ceiling plans p.18–21, Wall types & linings p.14–15, Finishes schedule p.32 · chip "Sections come from 'Read my plans' · paid plan, uses AI credits" | Clicks 40.6, 41.25, 41.9 |
| 44.1–47.6 | fix | **Pages pinned** to the version. | Pages pinned to the version. | Stand-in, bidder view (crumb "app.qsme.build · Tenders"): "Referenced drawing pages", three plain rows "Drawing set (v1) · p.18–21" etc. (no viewer, no mark-up) | none |
| 47.6–51.6 | fix | New set uploaded? **The bidder sees it.** | New set uploaded? The bidder sees it. | Chip "Tuesday · drawing set v2 uploaded" (below the window); each row turns amber with **"pages may have moved"** (48.05); note "The pack has a newer version since this was referenced — check the pages still match." Push-in | Soft ping 48.05 |
| 51.3–53.9 | chapter 3 card | 3 · The scope changed on Tuesday. One bidder never heard. | Three. The scope changed on Tuesday. | Wipe, numeral card | Whoosh 51.3 |
| 53.9–57.7 | problem (self-own) | Addendum 2 went to five. **Bidder D** priced the old scope. | Addendum two went to five. Bidder D priced the old scope. | Generic sent email "To: Bidder A; Bidder B; Bidder C; Bidder E; Bidder F · Tue 3:12 pm · Addendum 2 (bulkheads added)"; five green ticks, D greyed and ringed, marker note "missed off the list" | Marker 55.9 |
| 57.7–63.9 | fix | Change it in the tender. It knows **2 bids are in**. | Change it in the tender. It knows two bids are in. | Stand-in: open tender "Plasterboard & ceilings · Open · 2 bids in"; banner **"2 bid(s) are in on this scope. Change it and everyone still in the running is told what moved."**; "Bulkheads" ticked (60.7) → "5 of 5 selected"; camera moves banner → new row | Click 60.65 |
| 63.9–68.0 | fix | Change it once. **Everyone still in is told.** | Change it once. Everyone still in is told. | Kinetic: "Tender · scope changed · Plasterboard & ceilings + Bulkheads" pulses down six lines to A–F, each lights green; "All six still in the running → told what moved" | Six soft ticks 65.15–65.5 |
| 67.7–70.3 | chapter 4 card | 4 · "Plus tax." "Incl. tax." · Same job. Two different numbers. | Four. Plus tax. Including tax. | Wipe, numeral card | Whoosh 67.7 |
| 70.3–73.75 | problem (example) | Which one's **cheaper**? | Which one's cheaper? | Chip **"Example figures · VAT 20%"** · "AS WRITTEN" · Bidder X **10,000 + VAT** · Bidder Y **11,500 incl. VAT** · marker "looks cheaper" on X (71.4) | Marker 71.4 |
| 73.75–77.35 | twist | Same basis: the cheaper-looking bid **isn't cheaper**. | Same basis: the cheaper-looking bid isn't cheaper. | An engineering pad headed **"our maths"** slides in (73.8): "both incl. VAT · X 10,000 + 20% = 12,000" handwritten (74.3–75.0), "looks cheaper" struck out (75.05), "Y 11,500" ringed in red (75.85). Our own maths, never the product's toggle or tag | Pen on paper 74.3; marker strike 75.05 |
| 77.35–81.5 | rule | **Same tax basis**, or it isn't a comparison. | Same tax basis, or it isn't a comparison. | The pad adds "both excl. VAT · X 10,000 · Y 11,500 ÷ 1.2 = 9,583" (77.6–79.0), 9,583 ringed (79.1), red marker "Y is cheaper, either way." (79.9) | Pen on paper 77.6; marker 79.1 |
| 81.5–88.0 | product + proof (live page) | QSME asks the tax question **before anyone quotes**. It sticks to every bid. | Q-S-me asks the tax question before anyone quotes. It sticks to every bid. | Live qsme.build/platform/tendering FAQ "Can we compare bids that include and exclude tax?", cropped after "Yes. The comparison sorts on the basis you choose", which is highlighted (82.3) | Highlighter 82.3 |
| 87.7–90.3 | chapter 5 card | 5 · It came by email. · As a PDF. At 4:59 pm. | Five. It came by email. | Wipe, numeral card | Whoosh 87.7 |
| 90.3–93.3 | problem | A PDF in an inbox **isn't in your comparison**. | A PDF in an inbox isn't in your comparison. | Generic inbox: "Bidder A · 4:59 pm · Quote_FINAL_v3_revised(2).pdf" (part 1's sideways PDF); "Your comparison" lists B–F, slot "A · not here" | none |
| 93.3–97.45 | fix | Drop it on the tender. It's **read into a draft**. | Drop it on the tender. It's read into a draft. | Stand-in: **"Add a bid you received"** · "Got a quote by email for "Plasterboard & ceilings"? Drop it here and it goes in with the other bids." · "PDF, saved email (.eml), photo or text file — up to 20 MB" · the PDF drops in → **"Reading the quote…"** → "The bid" beside "The original" with **"This was read automatically and can be wrong. Nothing is saved until you have checked it."** (95.4). The window sits below the top band; gentle 5% push | File drop 94.3 |
| 97.45–100.7 | fix | A person **checks it** against the original. | A person checks it against the original. | Cursor ticks **"I have checked this against the original and it is right."** (98.65) | Click 98.6 |
| 100.7–104.6 | fix | Emailed quotes, checked, in **the same table**. · chip "All totals excl. tax" (101.0) · aside "Photos too. Yes, even the whiteboard." (101.7, unvoiced) | Emailed quotes, checked, in the same table. | Stand-in "Compare bids · Plasterboard & ceilings · 6 bids": rows "Bidder A ✉ **Received by you** 74,850" and "Bidder F ✉ Received by you · Lowest · 71,300" flash in with the others (tax headers, toggle and "calc." note not shown) | none |
| 104.6–106.8 | honest bit card | WHAT IT WON'T DO · **The honest bit.** | The honest bit. | Wipe, big type | Whoosh 104.6; music drops to almost nothing |
| 106.8–112.2 | honest | **Totals** side by side. (106.95) · Each bid's **own lines**, one click away. (109.2) · chip "All totals excl. tax" | Totals side by side. · Each bid's own lines, one click away. | Stand-in "Compare bids": six totals; cursor clicks Bidder B (108.6) → **"Detailed price breakdown"** "Item / Type / Qty / Rate / Line total", five lines summing to 76,200 | Click 108.6 |
| 112.2–116.0 | honest (live page) | It won't pick the winner for you. **You decide.** | It won't pick the winner for you. You decide. | Live qsme.build card "Award is a person's decision", cropped after its first sentence and highlighted: "No automation and no assistant awards a tender." | Highlighter 112.9 |
| 116.0–120.0 | value (callback) | It's just a **fair fight** now. | It's just a fair fight now. | Part 1's six bids (sideways PDF, laptop, "As discussed.", "Price below.", "Note 14", whiteboard) appear scattered, then fly one by one into six identical paper rows: "Bidder A–F · same lines · Rev C sheets · + bulkheads · excl. tax" + each total (116.75–118.0) | Paper shuffle 116.75–118.0 |
| 120.0–127.3 | recap (callback) | caption: Fix the tender, and the bids **start to compare**. | Fix the tender, and the bids start to compare. | The TENDER sheet returns, centred and large: "Drawings attached. Please price." struck through in red (120.72), five ticked lines 0.6s apart (121.3–123.7): Cut from the SOQ: same lines for every bidder · The right sheets, pinned to the version · Scope changes reach everyone still in · Tax basis stated before anyone quotes · Emailed bids checked into the same table | Marker strike 120.72; five soft ticks |
| 127.3–131.1 | CTA (live page) | Bring a real package to a **30-minute demo**. | Bring a real package to a thirty-minute demo. | Live qsme.build/platform/tendering band: "Run one of your packages through it — Bring a real package. We will cut the tender, invite two test bidders and walk through the comparison and award on the call." ("Bring a real package." underlined) | Underline 128.0 |
| 131.1–139.0 | end card | Left half: QSME logo · **qsme.build** · pill "Book a 30-minute demo" · "**Which of the five** gets you most? Tell us in the comments." (from 132.7, up 6.3s) | Q-S-me dot build. Which of the five gets you most? | Darkened fit-out b-roll; the right half is kept clear for YouTube end-screen elements | Music resolves ~138.5 |

Captions are 54px Space Grotesk on a dark box (bottom 66px, max width 1560px), well above the 40px floor; the chapter titles are 92–150px. Every caption above is the exact VO line (series rule), so the captions double as subtitles.

## YouTube chapters (paste into the description)

```
0:00 Six bids, none that compare
0:12 1. Everyone read the scope differently
0:33 2. Two drawing revisions in circulation
0:51 3. The scope changed on Tuesday
1:07 4. "Plus tax", "incl. tax"
1:27 5. It came by email
1:44 The honest bit
2:00 Fix the tender
```

## Captions, hashtags and CTA

### LinkedIn: founder's profile (Wed 14 Oct, 19:30 NZDT = 07:30 London, 10:30 Dubai, 09:30 Riyadh)

> Last week: six bids, six formats, and a photo of a whiteboard.
>
> Part 2 is why they didn't compare. Spoiler: it wasn't the subcontractors. It was our tender.
>
> Six bids on one plasterboard & ceilings package didn't compare for five reasons, and every one of them started on our side of the table:
>
> 1. No lines to price, so everyone wrote their own scope.
> 2. Two drawing revisions in circulation.
> 3. The scope changed on Tuesday and one bidder never heard.
> 4. "Plus tax" against "incl. tax".
> 5. One came by email and never made the spreadsheet.
>
> In QSME the tender is cut from your schedule of quantities, so every bidder prices the same lines (your rates and budget never go with them). You point them at the right drawing pages, scope changes reach everyone still in, the tax basis is stated before anyone quotes, and emailed quotes are read into a draft that you check before it joins the same table.
>
> The honest bit: it lines up the totals and opens each bid's own lines. It won't pick the winner. That's still your job. It's just a fair fight now.
>
> Book a 30-minute demo at qsme.build and bring a real package. We'll cut the tender with you on the call (link in comments).
>
> Which of the five gets you most?
>
> (Example figures, fictional package. Product screens in the video are recreated stand-ins with demo data.)

**First comment (founder):** Book a 30-minute demo at qsme.build (bring a real package): https://qsme.build/contact?utm_source=linkedin&utm_medium=organic_social&utm_campaign=why-bids-never-compare · Part 1 ("Six bids. Six formats."): [link to last week's post]

**Hashtags (3, at the end):** #QuantitySurveying #Tendering #Preconstruction

### LinkedIn: QSME page repost (Thu 15 Oct, 08:30 Sydney)

> Six bids, zero that compare. It's not the subcontractors. It's the tender.
>
> Five reasons bids don't line up, and the fix for each one, in 2 minutes. Which one gets you most?
>
> Book a 30-minute demo at qsme.build.

### YouTube

- **Title:** Why six bids never compare (it's the tender, not the subcontractors)
- **Thumbnail:** `outputs/why-bids-never-compare-thumb.png`
- **Description:**
  > Six bids on one plasterboard & ceilings package, and not one of them compares. It isn't the subcontractors. It's the tender. Five reasons bids don't line up, and the fix for each one in QSME: tenders cut from your schedule of quantities (same lines for every bidder, your rates and budget never shown), the right drawing pages pinned to the version, scope changes that reach everyone still in, one tax basis stated before anyone quotes, and emailed quotes read into a draft you check before they join the same table. The honest bit: QSME lines up the totals and opens each bid's own lines. A person still picks the winner.
  >
  > Book a 30-minute demo at qsme.build and bring a real package: https://qsme.build/contact?utm_source=youtube&utm_medium=organic_video&utm_campaign=why-bids-never-compare
  >
  > [chapters block above]
  >
  > Example figures, fictional package. Product screens are recreated stand-ins with demo data until the recorded screens replace them. Part 1: "Six bids. Six formats."
- **Tags:** quantity surveying, tendering, bid comparison, subcontract tendering, schedule of quantities, preconstruction, estimating software
- **Pinned comment:** "Which of the five gets you most? Book a 30-minute demo at qsme.build and bring a real package."
- **End screen (last 5–7s, from about 132.0):** subscribe + "Six bids. Six formats." as the related video. Place both in the right half of the frame: the end card keeps logo, URL, demo pill and comment prompt in the left half for exactly this.

**CTA line (all platforms, owner rule 2026-10-03):** Book a 30-minute demo at qsme.build (bring a real package). Comment prompt: "Which of the five gets you most?" Never add "free", "no sign-up", fee or pricing lines.

## Music

- **Direction:** silence and real sounds only under the hook (0–6.3): the paper slide, the sheet landing, one pen click. A minimal, tidy pulse enters on the title card (6.3) and runs under the explainer about 20 dB below the VO. It dips to almost nothing on each chapter wipe and returns on the card, so every chapter feels like a fresh start. In the honest bit (104.6–120.0) it thins to a warm pad, it lifts slightly on the recap tick-list (120.3–127.3) and it resolves on one held chord at about 138.5.
- **Mood / tempo:** calm, competent, quietly optimistic; 90–96 BPM (suggest 92, the same family as Column H so the series sounds related). Muted plucks, soft kick, warm low pad. No risers, no "corporate ukulele", no trending track.
- **Source:** ElevenLabs Music on a plan that includes commercial use. Prompt: "minimal muted plucked synth and soft kick, 92 BPM, calm and tidy, warm low pad, no vocals, no risers, 133 seconds, gentle dips every 18 seconds, resolves on a single held chord at 132s" (place from 6.3). Or a library track on a business/brand-channel licence that also covers paid social. SFX from ElevenLabs Sound Effects; nothing that imitates OS or app sounds.
- **Licensing:** LinkedIn has no licensed music library, and YouTube Content ID will flag library tracks without a channel licence, so use generated or commercially licensed audio only.

## Owner recordings to swap in (Session A, weeks 2–4, demo Global org)

Record every shot **before** the award (the award closes the tender). Use a demo Global organisation with invented people: project "Demo — Level 1 fit-out", pocket **Plasterboard & ceilings** with four jobs (Boards supply & fix 1,240 m², Ceilings 380 m², Jointing & finishing 1,240 m², Access 1 item), six demo bidders "Bidder A–F" (two of them as separate demo accounts in other browser profiles). Record at 1920×1080 or larger, browser zoom 125–150%, no bookmarks bar, demo URL only.

| # | Replaces (s) | Exact screen and click path | Demo data / framing | Length to record |
|---|---|---|---|---|
| 1 | 20.9–25.3 | Tenders → **Create New Tender** → step with "SOQ jobs to include (optional)" → tick **"Select whole pocket"** on Plasterboard & ceilings → jobs tick, "4 of 4 selected" → (optional) **"Copy link"** later in the wizard | Crop or skip the "Do your prices include GST?" step | 10s |
| 2 | 25.3–29.7 | Split screen: left, the owner's SOQ pocket with rates and totals; right, a second demo bidder account opening the same invitation: **"Est Qty / Bid Qty / Rate"** with the rate column empty (Itemize) | Two browser profiles side by side; no budget visible on the right | 8s |
| 3 | 39.5–44.1 | In the tender: **"Point them at the right sheets"** → tick three sections of a demo drawing set QSME owns, already read by **"Read my plans"** (paid plan, AI credits) | Keep any "consent pack" wording (e.g. "Upload the consent pack…") out of frame; say "drawing set" | 8s |
| 4 | 44.1–47.6 | Bidder account: the tender's **"Referenced drawing pages"** rows | Plain rows only; never open a viewer (mark-up is off) | 5s |
| 5 | 47.6–51.6 | Owner uploads **v2** of the same drawing set → bidder account shows the amber **"pages may have moved"** and the "newer version" note | Same three rows as #4 | 8s |
| 6 | 57.7–63.9 | Edit the **open** tender with **2 bids in**: the message **"2 bid(s) are in on this scope. Change it and everyone still in the running is told what moved."** → tick a new SOQ job "Bulkheads" | Status should read Open / 2 bids | 10s |
| 7 | 93.3–100.7 | **"Add a bid you received"** → drop an emailed demo PDF (`Quote_FINAL_v3_revised(2).pdf`, Bidder A, total 74,850) → **"Reading the quote…"** → the draft beside the original with **"This was read automatically and can be wrong."** → tick **"I have checked this against the original and it is right."** | Keep the warning on screen; crop any "GST not stated" line | 15s (reading takes time; we cut the wait) |
| 8 | 100.7–104.6 | **Compare bids** with **"Compare on" set to Excl.**: the new rows with the mail icon **"Received by you"** (Bidder A's PDF and Bidder F's whiteboard photo) | Frame the bidder names, the excl. column and the "Lowest" tag; keep the column headers (Excl. GST / GST / Incl. GST), the "Compare on" label and the "calc." note out of frame. The video's "All totals excl. tax" chip stays on top of this shot, so the framed figures must be the excl. ones | 5s |
| 9 | 106.8–112.2 | **Compare bids** → click a row → **"Detailed price breakdown"** (Item / Type / Qty / Rate / Line total) | Same cropping and "Compare on: Excl." as #8 (the "All totals excl. tax" chip stays on) | 8s |
| 10 (optional, probably skip) | 81.5–88.0, as a cutaway | **Compare bids** with one demo bid entered as not tax-registered: flip **"Compare on"** and watch the **"Lowest"** tag move | Only if the Global comparison works out "calc." figures at the org's own rate and label (see open questions). Since v2, chapter 4 is deliberately our own napkin maths and does not need this shot. Frame the rows and the tag; crop the tax headers, the toggle label and the "calc." note | 6s |
| 11 (optional, filmed) | 0.0–6.3 | Hands only, overhead: the printed six-bids props pushed into a pile and a "TENDER — Plasterboard & ceilings / Drawings attached. Please price." sheet laid on top | Owner's hands only, no faces; props print from the six-bids Figma frames | 8s |

Until these arrive, the stand-ins carry the beats and the top bar reads "Recreated screen · demo data" whenever one is on screen (20.9–29.7, 39.5–51.6, 57.7–63.9, 93.3–104.9, 106.8–112.2). Remove each interval from the `#tagIll` track as its recording goes in.

## Footage used

- **Live public pages (captured 2026-10-02 from the public site, nothing typed):** element crops of qsme.build/platform/tendering: FAQ "What is a private tender?" (29.7–33.6), FAQ "Can we compare bids that include and exclude tax?" cropped after "…the basis you choose" (81.5–88.0), card "Award is a person's decision" cropped after "…awards a tender." (112.2–116.0; v2.1, so its "award to a firm without an account … when they sign up" sentence is never shown), band "Run one of your packages through it" (127.3–131.1). Because they are element crops, the page's "compared line by line" hero, its Line × Bidder mock-up, its "mark up the drawings" copy and its "Scope changes are announced: while no live bid exists…" card are never in frame. The qsme.build/pricing screencast (`motion/clips/pricing`, `motion/capture-pricing.json`, `motion/pricing-stamps.js`, `motion/clips/stills/pricing-table.*`) was used in v1, dropped in v2 and is retired under the owner rule (2026-10-03: no pricing lines in any QSME content); the files are marked retired and must never be reused.
- **assets/qsme:** `broll/th-6-fitout.v1.mp4` 0.0–8.0s (AI brand b-roll of an interior fit-out, darkened under the end card, never captioned as a real site or customer), extracted to `motion/clips/fitout-long` (the v1 cut in `motion/clips/fitout` is no longer used).
- **Recreated from part 1:** the six bid props and the "Drawings attached. Please price." line (kinetic, from the six-bids designs); the same six props return in the "fair fight" callback.
- **Not used, and why:** the walkthrough clips (`client-tenders`, `client-soq`) are NZ edition with older wording ("Scope from SOQ"), NZD, the app.qsme.co.nz bar and removed sidebar items (Quick Jobs, Customers & Leads), and a different package, so they couldn't carry a Plasterboard & ceilings beat cleanly; `provider-my-bids` shows NZD and the removed Quotes & Variations; the phone captures are the NZ app.

## Integrity notes (every claim and the truth-sheet feature it rests on)

| Claim on screen / in VO | Rests on (research/2026-10-02-qsme-platform-truth.md) | Status |
|---|---|---|
| "Cut the tender from your estimate." · "Create New Tender" · "SOQ jobs to include (optional)" · "Select whole pocket" · "Only active SOQ pockets are listed…" | 4.1 `tender-from-pocket` (exact wording and the "Select whole pocket → 3 of 3 selected" demo moment) | ✅ live |
| "Same lines for every bidder." · "So every total prices the same scope." · FAQ "so the invited firms all price the same lines" | 4.1 + 4.3; qsme.build "Invited bidders price the same lines"; top correction (2): bidders price identical lines cut from the SOQ, so this is true. v2 changed "So the totals mean the same thing." to "So every total prices the same scope." because bidders can still quote one total or enter their own Bid Qty (4.3: never claim every bid is itemised). We never say or show "compared line by line" | ✅ live |
| "Your rates and budget never go with them." · bidder view "Est Qty / Bid Qty / Rate / Total Cost", rate boxes empty | 4.3 `bidder-view`: "never the owner's rates or budget"; stripped server-side. The stand-in drops the "($)" from the headers because a Global org's currency label isn't verified | ✅ live |
| "Point every bidder at the right sheets." · "Point them at the right sheets" · "From your indexed plans — tick the sections this work is about." · chip "Sections come from 'Read my plans' · paid plan, uses AI credits" | 4.2 `drawing-page-references`; 3.3 `read-my-plans` (paid plan or trial, 1 AI credit per 10 pages). We left out the hint's second sentence ("Bidders jump straight to those pages") so nothing implies a drawing viewer | ✅ live |
| "Pages pinned to the version." · "Referenced drawing pages" · "pages may have moved" · "The pack has a newer version since this was referenced — check the pages still match." | 4.2 (fact "References pin the document version"; exact wording). Rows are plain, with no viewer and no mark-up (3.11 is switched off). "The pack" is the product's own wording; no "consent pack" anywhere | ✅ live |
| "Change it in the tender. It knows 2 bids are in." · banner "2 bid(s) are in on this scope. Change it and everyone still in the running is told what moved." · "Change it once. Everyone still in is told." | 4.1 demo moment (exact wording); fact "scope can change until award and bidders are told". The kinetic fan-out is a diagram, not product UI | ✅ live |
| Tax example: 10,000 + VAT vs 11,500 incl. VAT → 12,000 vs 11,500; excl. 10,000 vs 9,583; "Y is cheaper, either way." | Our own arithmetic, labelled "Example figures · VAT 20%" the whole time and handwritten on a pad headed "our maths". v2 removed the pill toggle and the green "Lowest" tag that looked like the product's "Compare on" and "Lowest", so nothing implies QSME converts at 20%. Truth sheet 5.2 + (e) + 12.4: the Global comparison still reads GST and works "calc." figures at 15%; never claim tax calculation | n/a (example) |
| "QSME asks the tax question before anyone quotes. It sticks to every bid." · FAQ cropped to "Yes. The comparison sorts on the basis you choose" | 4.1 ("…prices include GST? — Bidders price against this and it is fixed onto their bid, so say it before anyone quotes"; we never show or say "GST"); 5.2 (compare excl./incl., "Lowest" moves). The live answer goes on "…so a bidder registered for tax is never compared against an unregistered one on the wrong number"; v2 crops that clause out (it leans on the 15% calc) | ✅ live |
| "Add a bid you received" flow, "Reading the quote…", "This was read automatically and can be wrong. Nothing is saved until you have checked it.", "I have checked this against the original and it is right.", "Received by you", "New to you. They will be saved to your contacts when you save." (v2.1 dropped the product's "— they don't need a QSME account" clause: owner rule 2026-10-03) | 5.1 `add-received-bid` (exact wording). The warning stays on screen and a person ticks the check; we never say it reads an inbox or imports automatically | ✅ live |
| "Photos too. Yes, even the whiteboard." | 5.1 accepts "PDF, saved email (.eml), photo or text file". It's a callback joke; the same scene shows the reading can be wrong and is checked | ✅ live |
| "Totals side by side." · "Each bid's own lines, one click away." · "Detailed price breakdown — Item / Type / Qty / Rate / Line total" · "Lowest" tag · chip "All totals excl. tax" | 5.2 `compare-bids` (one row per bidder with excl./incl. totals; click a bid for its own lines). No bidder-by-line matrix; tax headers, toggle and "calc." note kept out of the stand-in (top correction 2). The chip states the basis outside the window (kinetic, not product UI); the owner recordings must be framed on "Compare on: Excl." | ✅ live |
| "It won't pick the winner for you. You decide." · live card "No automation and no assistant awards a tender." | 5.2 DO NOT CLAIM (no picking/recommending); red list; live qsme.build/platform/tendering card quoted as captured, cropped after its first sentence (its second sentence says firms can be awarded "without an account", which the owner rule bans). "Lowest" is shown as a tag, never as a recommendation | ✅ live |
| "It's just a fair fight now." over six identical rows "same lines · Rev C sheets · + bulkheads · excl. tax" + each bid's total | A kinetic callback that sums up chapters 1–5 (each chip is a fix shown earlier); not product UI, no line-by-line matrix (one row per bid, totals only). Totals are part 1's illustrative figures | n/a (kinetic) |
| "Bring a real package to a 30-minute demo." · the live band "Bring a real package. We will cut the tender, invite two test bidders and walk through the comparison and award on the call." · "Book a 30-minute demo" · qsme.build | 12.8 `book-a-demo` (exact offer; fact "Demo: 30 minutes on a working project"). The owner's Global CTA (2026-10-03) is "Book a 30-minute demo at qsme.build"; no "free", no pricing or fee lines anywhere | ✅ live |

- **Guardrails kept:** owner rule 2026-10-03: no "free", "no sign-up", "no login", "without an account", per-seat, success-fee, "bidders never pay" or any other pricing line in the video, stills, captions or post copy; no "compared line by line", no matrix, no "conforming", no "QSME picks the winner"; no GST, consent pack, tradie, NZD, LIM or other NZ-only words; no counts, prices, time or money saved, testimonials, customer logos or competitor names; no escrow, payments or verification claims; no drawing viewer or mark-up; the app's languages aren't mentioned.
- **Stand-ins are labelled:** eight signed-in screens are designed recreations in the app's light look, with the truth sheet's exact wording and fictional demo data. The top bar carries "Recreated screen · demo data" (26px) for every second one is on screen (it sits outside the zooming window, so it never leaves the frame). Invented UI details that need checking against the real recording: the URL crumbs ("app.qsme.build · Tenders" on both the owner and bidder sides; Global hides Opportunities browse and lists "Tenders you have been invited to bid on"), "STEP 3 OF 4" (the truth sheet's demo moment is step 3 of four), "Invited · closes Fri 5:00 pm", "Open · 2 bids in", "Plasterboard & ceilings · 6 bids", the "Next →" button and the job line counts.
- **Demo figures add up:** our SOQ pocket total 73,988 = 44,640 + 22,040 + 5,208 + 2,100. Bidder A's emailed quote 74,850 = 48,360 + 24,510 + 1,980 (jointing incl.). Bidder B's breakdown 76,200 = 28,520 + 19,840 + 25,080 + 2,170 + 590. Bidder F 71,300 matches part 1's whiteboard (1,240 × 38.50 + 380 × 62.00). The six totals are part 1's illustrative figures.
- **Who the joke is on:** us. The tender that says "Drawings attached. Please price." is ours; "missed off the list" is our mistake; "our maths" is ours; the subcontractors are named as not at fault in second 3 and the "fair fight" line is on their side.
- **No people:** no actors, faces or AI people as customers. The b-roll workers are AI brand footage, darkened, uncaptioned. The VO is a script; if an AI voice reads it, it is never presented as the founder.
- **QA note:** the stand-in windows that push in carry `data-qa-ignore` because they zoom like a screen recording would; every caption, title, chip and label (including the pad, the fair-fight rows and the end card) is still checked against the safe box, and the windows were checked by eye in full-size stills.

## Open questions for you

- [ ] Approve the v2 cut (139.0s), or change anything?
- [ ] **Before the 14 Oct publish: which tax rate does the Global bid comparison use for its "calc." figures?** The truth sheet says the comparison still reads GST and works them out at 15%, even for an org that renamed its tax to VAT 20%. The video no longer depends on it (chapter 4 is our own napkin maths and the FAQ is cropped), but a prospect who brings a real package to the demo will see that screen, so it's worth knowing (and fixing) first. Shot 10 only makes sense once it uses the org's own rate and label.
- [ ] Session A (week 2): can you record shots 1–9 in a demo Global org before the award? Frame shots 8 and 9 on "Compare on: Excl.".
- [ ] VO: will you read it yourself (recommended for this one), or should it go to the cast QS voice after the ElevenLabs upgrade?
- [ ] One master for both platforms: the end card is 7.9s so YouTube end-screen elements fit in its right half. That's fine on LinkedIn too; if you'd rather a shorter LinkedIn tail, trim the last ~3s on upload.
- [ ] After the owner recordings are in: a 1:1 LinkedIn cut with tighter crops on each screen? In a mobile LinkedIn feed the 16:9 frame is ~375px wide, so the screens mostly reach people through the captions. Keep 16:9 for YouTube.
- [ ] The live qsme.build/platform/tendering card "Scope changes are announced" says changes are possible "while no live bid exists", but the product lets you change scope with bids in and tells bidders. Fix the website copy? (We didn't show that card.) The same page's tax FAQ ("…never compared against an unregistered one on the wrong number") may also need softening until the Global calc rate is confirmed.

## Discussion history

- 2026-10-02: Built from the approved calendar slot (2026-10-14, week 2, idea gl-why-bids-never-compare, Global, 16:9 long-form, 125s target). Same plasterboard & ceilings package and six bids as part 1; five numbered causes, each with its fix; the honest bit and the demo page's own offer as the CTA. Captured qsme.build/pricing and four elements of qsme.build/platform/tendering live (public, no login). Built eight labelled stand-ins from the truth sheet's exact wording. Picky-CD passes before the final render: fixed an ID clash that laid two scenes over everything; vertically centred the hook; un-clipped the prop tags; gentler push-ins that keep window edges in frame; moved the illustrative label into a dark top band so it never zooms away; caption bar kept clear of windows and cursor paths; tightened the tax example and recap layouts. Then matched every VO line to its caption word for word (series rule). Rendered 126.0s, QA passed. VO script ready for later (ElevenLabs upgrade pending). Status: rendered — awaiting approval.
- 2026-10-02 (v2, review fixes): applied the director review. Must-fix: the stand-in label now reads "Recreated screen · demo data" at 26px; chapter 4's tax example is our own napkin maths on a pad ("our maths"), with no product-style toggle or "Lowest" tag, and the live tax FAQ is cropped after "…the basis you choose". Should-fix: title card held to 6.5s, six-scopes beat 5.5s with staggered cards, "All totals excl. tax" chips on both Compare-bids stand-ins, "fair fight" now lands on part 1's six bids filed into six identical rows (pricing page dropped), recap 7s without the duplicate headline, caption 09 now "So every total prices the same scope.", end card 7.9s with a clear right half for YouTube end-screen elements. Nice: STEP 3 OF 4, bidder crumbs "Tenders", the emailed-bid window kept below the top band (band now fully opaque), Bidder F "Received by you" with a longer aside, cursor parks beside targets, chips clear of window edges. Re-rendered 139.0s, QA passed; VO script re-timed (38 lines, vo_status ok). Added the open question on the Global calc rate. Status: rendered v2 — awaiting approval.
- 2026-10-03: owner CTA rule — removed free/no-sign-up, CTA now "Book a 30-minute demo at qsme.build" on every platform. Two on-screen violations fixed: the "Add a bid you received" stand-in no longer says bidders "don't need a QSME account", and the live "Award is a person's decision" card is cropped after "…awards a tender." (its "award to a firm without an account … when they sign up" sentence is gone). Post copy CTAs (LinkedIn post + first comment, page repost, YouTube description + pinned comment, CTA line) now lead with the demo; retired the /pricing capture (removed from stills.json, files marked retired). VO and timings unchanged (vo_status ok). Re-rendered the 16:9 master (QA ok) and its preview; thumbnail unaffected. Status: rendered v2.1 — awaiting approval.
