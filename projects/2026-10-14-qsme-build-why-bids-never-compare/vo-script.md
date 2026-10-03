# VO script: Kiwi performance

**Who reads it:** ideally the founder, a professional quantity surveyor, in his own voice. This is the long-form "here's what to do about it" follow-up to "Six bids. Six formats.", and a QS explaining his own trade is the most credible voice it can have. Record it on a decent USB or lapel mic in a quiet office, three takes of the continuous read below. **Fallback (AI, after the ElevenLabs upgrade):** the same mid-career Kiwi QS voice as "Six bids" and "Column H" (late 30s to 40s, general urban New Zealand accent from an Auckland or Wellington office, not broad and not Australian). An AI voice never speaks as the founder and is never captioned as him.

**Character:** calm, dry, on the subcontractors' side. He's a colleague walking another QS through what went wrong with the tender: explaining, never selling. The self-owns are his ("we sent that email", "we missed them off the list"). No announcer lift, no exclamation marks, no buzzwords.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Voice (AI fallback):** whichever QS voice wins casting in `projects/2026-10-02-qsme-voice-casting` (shortlist ⭐ Arnold `bISW1PJRBPT7aRbtPJlB`, ⭐ James `QlZn2MPaf2jDn0461bnj`), the same voice as Six bids so the series sounds like one person.

**Video:** `outputs/why-bids-never-compare-16x9.mp4`, 139.0s, 16:9, 1920×1080 (re-timed 2026-10-02 after review). Times below are seconds on this file. `vo-script.json` is the machine-readable twin for `tools/make_vo.py`.

**Series rule:** The burned-in captions are the subtitles, so every voiced caption is read word for word ('2' and '30-minute' are read 'two' and 'thirty-minute'; 'Incl.' is read 'including'). Chapter numbers are spoken; titles, chips, labels and the whiteboard aside are not captions and stay unvoiced unless a line says so.

**Pronunciation:** QSME = "Q-S-me" (cue-ess-mee); qsme.build = "Q-S-me dot build". Never "kiss me", never four spelled-out letters. "Rev B" = "rev bee". Never say "GST", "consent pack" or "line by line".

**Casting line:** "Six bids. Zero that compare. It's not the subcontractors. It's the tender. Q-S-me dot build."

## Lines

| Start | Max | Line (v2 = v3, no tags needed) | On screen | Delivery |
|---|---|---|---|---|
| 0.30s | 2.3s | **Six bids. Zero that compare.** | 6 bids. / 0 that compare. (frame 1) · chip 'Plasterboard & ceilings · tender closed 5:00 pm' · the six bids from part 1 are pushed into a pile 0.45 to 1.9 | Flat and tired, the end of tender day. A real full stop after 'Six bids'. 'Zero that compare' falls away, no drama. Under the paper-slide SFX, ducked. Out by 2.6. |
| 2.80s | 1.6s | **It's not the subcontractors.** | It's not the subcontractors. (2.7) | Warm and certain, taking the subcontractors' side, like defending a mate. Brisk enough to fit: four words, no pause. Out by 4.4, before the tender sheet lands. |
| 4.85s | 1.2s | **It's the tender.** | It's the tender. (slams in at 4.75; the 'TENDER · Plasterboard & ceilings' sheet lands on the pile at 4.78; red ring around 'Drawings attached. Please price.' 5.05 to 5.55) | Quiet and matter-of-fact, right after the pen click. A small lean on 'tender', falling. No punchline lift. Out by 6.1. |
| 6.65s | 1.3s | **Five reasons.** | Title 'Five reasons bids don't compare.' (6.5) · the five reasons build 0.5s apart (7.0 to 9.0) | Settling in, like the start of a whiteboard session with a colleague. Voices the title's first words, even and unhurried. Then let the list build in silence. Out by 8.0. |
| 9.80s | 2.2s | **And the fix for each one.** | Subline 'And the fix for each one.' (9.7, held to the wipe at 12.8) | A small promise, warm. Matches the subline word for word. Out by 12.0 so the chapter wipe (12.8) is silent. |
| 13.20s | 2.15s | **One. Everyone read the scope differently.** | Chapter card '1 · Reason 1 of 5 · Everyone read the scope differently.' | Chapter voice: say the number, small pause, then the title as plain fact. Same shape for all five chapter lines. Out by 15.35. |
| 16.95s | 3.8s | **No lines to price, so six bidders wrote six scopes.** | No lines to price, so six bidders wrote six scopes. (caption from 16.75) · the tender email 'Drawings attached. Please price.' branches to six scope cards, A to F landing 0.35s apart (15.95 to 17.7) | Rueful, owning it: we sent that email. Start once the first three cards are in, light stress on the second 'six', then let the last cards ('Nothing below.', 'on a whiteboard') land under the end of the line. Out by 20.75. |
| 21.10s | 3s | **Cut the tender from your estimate.** | Cut the tender from your estimate. · 'Create New Tender' · 'STEP 3 OF 4' · 'SOQ jobs to include (optional)' · click 'Select whole pocket' at 22.2 · '4 of 4 selected' | Practical, showing someone where to start. Then let the click on 'Select whole pocket' (22.2) and the ticks play without voice. Out by 24.1. |
| 25.50s | 1.75s | **Same lines for every bidder.** | Same lines for every bidder. (25.45 to 27.3) · split: your SOQ with rates \| the bidder view 'Est Qty / Bid Qty / Rate / Total Cost' with the rate column empty; tabs Bidder A to F step across | The core idea, so even weight on 'same lines'. Out by 27.25. |
| 27.35s | 2.3s | **Your rates and budget never go with them.** | Your rates and budget never go with them. (27.3 to 29.7) · your rates highlight on the left; the bidder's rate boxes stay empty | Reassuring, almost an aside, a little quicker than 08a. Out by 29.65. |
| 30.00s | 3s | **So every total prices the same scope.** | So every total prices the same scope. · live qsme.build/platform/tendering FAQ 'What is a private tender?', highlighted 'so the invited firms all price the same lines' (30.3) | Dry, quietly pleased. Falling on 'same scope'. Never 'the totals mean the same thing' (bidders can still quote one total or their own quantities). Out by 33.0. |
| 33.70s | 2.15s | **Two. Two drawing revisions in circulation.** | Chapter card '2 · Two drawing revisions in circulation.' | Chapter voice, same shape as 05: number, small pause, title as plain fact. Out by 35.85. |
| 36.15s | 3.2s | **Three priced Rev B. Three priced Rev C.** | Three priced Rev B. Three priced Rev C. · two RCP sheets, Rev C clouded around a new bulkhead · 'Priced by A B C' / 'D E F' | Say 'rev B', 'rev C' (short 'rev'). Deadpan, the two halves mirror each other. Out by 39.35. |
| 39.70s | 4.2s | **Point every bidder at the right sheets.** | Point every bidder at the right sheets. · 'Point them at the right sheets' · ticks 'Reflected ceiling plans p.18–21', 'Wall types & linings p.14–15', 'Finishes schedule p.32' (40.6, 41.25, 41.9) · chip 'Sections come from ‘Read my plans’ · paid plan, uses AI credits' | Calm and practical, landing before the three ticks (40.6, 41.25, 41.9) so they play clean. Out by 43.9. |
| 44.30s | 3s | **Pages pinned to the version.** | Pages pinned to the version. · bidder view 'Referenced drawing pages' rows 'Drawing set (v1) · p.18–21' etc. | Light stress on 'version'. Out by 47.3. |
| 47.70s | 3.4s | **New set uploaded? The bidder sees it.** | New set uploaded? The bidder sees it. · chip 'Tuesday · drawing set v2 uploaded' (47.6) · amber 'pages may have moved' on each row (48.05) and 'The pack has a newer version since this was referenced — check the pages still match.' | A genuine little question, then the answer, satisfied. Out by 51.1 so the wipe (51.3) is clean. |
| 51.70s | 2.15s | **Three. The scope changed on Tuesday.** | Chapter card '3 · The scope changed on Tuesday. One bidder never heard.' | Chapter voice. 'On Tuesday' like everyone remembers that Tuesday. The card's second sentence ('One bidder never heard.') is a title and stays unvoiced. Out by 53.85. |
| 54.15s | 3.45s | **Addendum two went to five. Bidder D priced the old scope.** | Addendum 2 went to five. Bidder D priced the old scope. · sent email 'To: Bidder A; Bidder B; Bidder C; Bidder E; Bidder F' · five ticks, D ringed in red, 'missed off the list' (56.45) | Self-own: we missed them off the list, not their fault. A small wince on 'old scope'. Out by 57.6. |
| 58.10s | 4.4s | **Change it in the tender. It knows two bids are in.** | Change it in the tender. It knows 2 bids are in. · banner '2 bid(s) are in on this scope. Change it and everyone still in the running is told what moved.' · 'Bulkheads' ticked at 60.7 · '5 of 5 selected' | Matter-of-fact, reading the banner to a colleague. Out by 62.5. |
| 64.15s | 3.3s | **Change it once. Everyone still in is told.** | Change it once. Everyone still in is told. · the tender node 'Plasterboard & ceilings + Bulkheads' pulses to all six bidders · 'All six still in the running → told what moved' | Two clean beats, settled. Out by 67.45. |
| 68.10s | 2s | **Four. Plus tax. Including tax.** | Chapter card '4 · “Plus tax.” “Incl. tax.”' · 'Same job. Two different numbers.' | Chapter voice, quoting two bidders in the same flat tone ('Incl. tax' on the card is read 'including tax'). Never say 'GST'. Out by 70.1. |
| 70.55s | 1.6s | **Which one's cheaper?** | Which one's cheaper? · 'Example figures · VAT 20%' · 'As written': Bidder X '10,000 + VAT', Bidder Y '11,500 incl. VAT' · marker 'looks cheaper' on X (71.4) | Genuine question with a trap in it; let the two numbers on screen do the work. Small rise on 'cheaper'. Out by 72.2, then silence while the marker 'looks cheaper' lands. |
| 74.00s | 3.2s | **Same basis: the cheaper-looking bid isn't cheaper.** | Same basis: the cheaper-looking bid isn't cheaper. · a pad headed 'our maths' (73.8): 'both incl. VAT · X 10,000 + 20% = 12,000 · Y 11,500', 'looks cheaper' struck out (75.05), Y's 11,500 ringed in red (75.85). Our own napkin maths, not a QSME screen | Deadpan reveal, the dry smile of the piece. A beat after 'Same basis'. Out by 77.2. |
| 77.50s | 3.8s | **Same tax basis, or it isn't a comparison.** | Same tax basis, or it isn't a comparison. · the pad adds 'both excl. VAT · X 10,000 · Y 11,500 ÷ 1.2 = 9,583' (77.6 to 79.0), 9,583 ringed (79.1), 'Y is cheaper, either way.' (79.9) | The rule of thumb, firm but friendly, like a senior QS's habit. Out by 81.3. |
| 81.80s | 5.6s | **Q-S-me asks the tax question before anyone quotes. It sticks to every bid.** | QSME asks the tax question before anyone quotes. It sticks to every bid. · live qsme.build/platform/tendering FAQ 'Can we compare bids that include and exclude tax?', cropped after 'Yes. The comparison sorts on the basis you choose', which is highlighted (82.3) | Q-S-me = 'cue ess mee', evenly. Plain explanation, no sell. Out by 87.4. |
| 88.15s | 2s | **Five. It came by email.** | Chapter card '5 · It came by email.' · 'As a PDF. At 4:59 pm.' | Chapter voice, a hint of weariness on 'email'. Out by 90.15. |
| 90.55s | 2.7s | **A PDF in an inbox isn't in your comparison.** | A PDF in an inbox isn't in your comparison. · inbox row 'Bidder A · 4:59 pm · Quote_FINAL_v3_revised(2).pdf' · comparison card with 'A · not here' | Flat, a touch weary. Out by 93.25. |
| 93.50s | 3.8s | **Drop it on the tender. It's read into a draft.** | Drop it on the tender. It's read into a draft. · 'Add a bid you received' · the PDF drops in (94.3) · 'Reading the quote…' · the draft beside 'The original' with 'This was read automatically and can be wrong. Nothing is saved until you have checked it.' (95.4) | Practical. Stress 'draft' lightly: it's not done yet. Out by 97.3. |
| 97.50s | 3s | **A person checks it against the original.** | A person checks it against the original. · tick 'I have checked this against the original and it is right.' (98.65) | Firm on 'checks'. Lands just before the tick (98.65). Out by 100.5. |
| 100.90s | 3s | **Emailed quotes, checked, in the same table.** | Emailed quotes, checked, in the same table. · 'Compare bids': rows 'Bidder A' and 'Bidder F' marked 'Received by you' · chip 'All totals excl. tax' · aside 'Photos too. Yes, even the whiteboard.' (101.7, an unvoiced visual gag) | Plain and tidy, a list read off a checklist. Leave the whiteboard aside unvoiced: it's a read-it-yourself gag. Out by 103.9. |
| 105.00s | 1.6s | **The honest bit.** | Card 'What it won't do · The honest bit.' | Lower, more personal, leaning in. Out by 106.6. |
| 107.10s | 2s | **Totals side by side.** | Totals side by side. (106.95 to 109.2) · 'Compare bids' totals A to F, 'Lowest' on F · chip 'All totals excl. tax' | Careful and exact: this is the honest description, no flourish. Out by 109.1. |
| 109.35s | 2.7s | **Each bid's own lines, one click away.** | Each bid's own lines, one click away. (109.2 to 112.2) · Bidder B clicked (108.6) · 'Detailed price breakdown' Item / Type / Qty / Rate / Line total | Same register. Never 'line by line'. Out by 112.05. |
| 112.40s | 3.4s | **It won't pick the winner for you. You decide.** | It won't pick the winner for you. You decide. · live qsme.build card 'Award is a person's decision', highlighted 'No automation and no assistant awards a tender.' | Straight, a little proud of saying it. 'You decide' is respect for the QS, not a disclaimer. Out by 115.8. |
| 116.40s | 3.2s | **It's just a fair fight now.** | It's just a fair fight now. · callback: part 1's six bids (the sideways PDF, the laptop, 'As discussed.', 'Price below.', 'Note 14', the whiteboard) fly into six identical rows, 'same lines · Rev C sheets · + bulkheads · excl. tax' (116.75 to 118.0) | The emotional landing of the piece, warm and quiet. Slight weight on 'fair', landing as the last bids slot into their rows. Out by 119.6, before the wipe (120.0). |
| 121.00s | 3.6s | **Fix the tender, and the bids start to compare.** | Fix the tender, and the bids start to compare. (caption 120.5 to 127.3) · the TENDER sheet again: 'Drawings attached. Please price.' struck out (120.72), five ticked lines 121.3 to 123.7 | Summing up, unhurried, riding the ticks. Then let the last ticks and the held sheet breathe. Out by 124.6. |
| 127.50s | 3.4s | **Bring a real package to a thirty-minute demo.** | Bring a real package to a 30-minute demo. · live qsme.build/platform/tendering 'Run one of your packages through it — Bring a real package. We will cut the tender, invite two test bidders and walk through the comparison and award on the call.' ('Bring a real package.' underlined 128.0) | An invitation between colleagues, not a pitch. Out by 130.9. |
| 131.50s | 4.2s | **Q-S-me dot build. Which of the five gets you most?** | End card, left half: QSME logo · qsme.build (131.6) · 'Book a 30-minute demo' (132.0) · 'Which of the five gets you most? Tell us in the comments.' (132.7, held to 139.0). Right half kept clear for YouTube end-screen elements | Easy, low-key. 'Q-S-me dot build' evenly, no rise on 'build'. The question is genuinely curious, rising slightly. Regenerate any take that says 'kiss me' or spells four letters. Out by 135.7, then the end card holds in silence (music resolves). |

**Silent on purpose:** 8.0 to 9.8: the five reasons build in silence · 12.0 to 13.2: chapter 1 wipe (12.8) · 15.35 to 16.95: the six scope cards start landing · 22.1 to 25.5: the 'Select whole pocket' click and ticks play without voice · 33.0 to 33.7: chapter 2 wipe (33.3) · 51.1 to 51.7: chapter 3 wipe (51.3) · 67.45 to 68.1: chapter 4 wipe (67.7) · 72.2 to 74.0: 'looks cheaper' lands in silence · 87.4 to 88.15: chapter 5 wipe (87.7) · 103.9 to 105.0: the whiteboard aside, then the honest-bit wipe (104.6) · 119.6 to 121.0: the rows settle, then the recap wipe (120.0) · 124.6 to 127.5: the last ticks land and the sheet holds · 135.7 to 139.0: end card holds for YouTube end-screen elements.

## One continuous read (the most natural take; slice it in the edit)

Read it straight through, as if explaining it to a colleague at the next desk. Leave a full breath at each blank line. Chapter numbers ("One.", "Two.") get a small pause after them; leave a longer pause between "Five reasons." and "And the fix for each one." (the list builds there).

```
Six bids. Zero that compare.

It's not the subcontractors.

It's the tender.

Five reasons.

And the fix for each one.

One. Everyone read the scope differently.

No lines to price, so six bidders wrote six scopes.

Cut the tender from your estimate.

Same lines for every bidder.

Your rates and budget never go with them.

So every total prices the same scope.

Two. Two drawing revisions in circulation.

Three priced Rev B. Three priced Rev C.

Point every bidder at the right sheets.

Pages pinned to the version.

New set uploaded? The bidder sees it.

Three. The scope changed on Tuesday.

Addendum two went to five. Bidder D priced the old scope.

Change it in the tender. It knows two bids are in.

Change it once. Everyone still in is told.

Four. Plus tax. Including tax.

Which one's cheaper?

Same basis: the cheaper-looking bid isn't cheaper.

Same tax basis, or it isn't a comparison.

Q-S-me asks the tax question before anyone quotes. It sticks to every bid.

Five. It came by email.

A PDF in an inbox isn't in your comparison.

Drop it on the tender. It's read into a draft.

A person checks it against the original.

Emailed quotes, checked, in the same table.

The honest bit.

Totals side by side.

Each bid's own lines, one click away.

It won't pick the winner for you. You decide.

It's just a fair fight now.

Fix the tender, and the bids start to compare.

Bring a real package to a thirty-minute demo.

Q-S-me dot build. Which of the five gets you most?
```

38 lines, 1407 characters (well within one ElevenLabs request per take).

## Make it sound recorded, not synthesised

- If the founder records it: one continuous read of continuous_read_v2 in his natural voice, three takes, then slice at the blank lines and place each piece at its start_s. Keep breaths and small hesitations; never time-stretch more than about 4%.
- If AI: render continuous_read_v2 three times on the cast QS voice, slice and place; use per-line renders only as patches, with previous_text/next_text so intonation carries. Keep the least polished take.
- Room tone bed (a real quiet office on a phone) under the whole 139s at about -50 dBFS so silences never drop to digital zero.
- EQ: high-pass 90 to 100 Hz; -2 dB high shelf above 10 kHz; light de-ess. Compression 2:1 to 3:1, 3 to 4 dB GR. VO at about -16 LUFS integrated, -1 dBTP. No reverb.
- Music (see post.md): no music under the hook (0 to 6.3); a minimal pulse enters on the title card (6.3), sits about 20 dB under the VO, dips to near silence on every chapter wipe and returns, thins to a warm pad in the honest bit (104.6 to 120.0), lifts slightly on the recap tick-list (120.3 to 127.3), resolves on one held chord at about 138.5.
- SFX synced to picture, ducked 10 to 12 dB under any word: paper slide 0.45 to 1.9; tender sheet landing 4.78; pen click 4.95; marker ring 5.05 to 5.55; soft whoosh on each wipe (12.8, 33.3, 51.3, 67.7, 87.7, 104.6, 120.0); trackpad clicks 22.2, 40.6, 41.25, 41.9, 60.65, 98.6, 108.6; file drop 94.3; marker squeak 55.9 and 75.05; soft pen-on-paper 74.3 to 79.0 (the pad); paper shuffle 116.75 to 118.0 (the six bids filed into rows); marker strike 120.72; five soft ticks 121.3 to 123.7. No OS- or app-branded sounds.
- Bounce a mono VO stem and mux onto outputs/why-bids-never-compare-16x9.mp4 with tools/mux as a separate track, so music and SFX stay adjustable.

## Check before it ships

- Every line is word for word with its caption (spot-check 08b, 09, 21, 23 and 33, the ones most likely to drift).
- "Q-S-me" sounds like "cue ess mee" in 23 and 35.
- No line spills into a chapter wipe (12.8, 33.3, 51.3, 67.7, 87.7, 104.6, 120.0).
- Line 09 says "So every total prices the same scope." (never "the totals mean the same thing").
- Run `python3 tools/vo_status.py`: this project must read `ok`. "Tight" notes are fine; they mean the line has little spare time.

## Changelog

- 2026-10-02 first version, timed on the rendered 126.0s 16:9 master (outputs/why-bids-never-compare-16x9.mp4). No API was called.
- 2026-10-02 v2: every voiced line now matches its burned-in caption word for word (series rule, as in Column H); 08 and 30 split to follow their two captions; title subline shortened on screen to 'And the fix for each one.'. Timed on the re-rendered master. No API was called.
- 2026-10-02 v3 (review fixes): retimed to the re-rendered 139.0s master (title card held to 6.5s, six-scopes beat 5.5s, emailed-table beat +0.5s, 'fair fight' callback 4s, recap 7s, end card 7.9s). 04 split into 04a 'Five reasons.' and 04b 'And the fix for each one.' around the list build. 09 is now 'So every total prices the same scope.' (was 'So the totals mean the same thing.', which overstated: bidders can still quote one total or their own quantities). 32 now lands on the six part-1 bids filed into identical rows instead of the pricing page. Every caption still matches its line word for word. No API was called.
- 2026-10-03 (owner CTA rule): checked every line against the rule (no "free", "no sign-up", "without an account" or pricing lines). No VO line needed changing; the CTA stays "Bring a real package to a thirty-minute demo." + end card "Book a 30-minute demo" · qsme.build. The master was re-rendered for two on-screen fixes with identical timings (139.0s), so start_s/max_s are unchanged.
