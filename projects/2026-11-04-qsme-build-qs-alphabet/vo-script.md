# VO script: Kiwi performance (The QS Alphabet)

**Character:** The QS: the series narrator (same voice as 'Six bids. Six formats.', 'Day 23', 'Remittance attached'). A mid-career quantity surveyor, late 30s to 40s, general urban New Zealand accent (Auckland or Wellington office), not broad, not rural, not Australian. Dry, unhurried, amused by his own trade, never an announcer. In this film he is openly biased about QS work and says so; he respects every other trade. PREFERRED READ: the founder himself (a professional quantity surveyor), recorded on a decent mic in a quiet room, using founder_alt_lines for the 'Built by' line. FALLBACK: the venture's 'The QS' voice (Arnold bISW1PJRBPT7aRbtPJlB or James QlZn2MPaf2jDn0461bnj, see projects/2026-10-02-qsme-voice-casting). An AI voice never speaks as the founder and never says 'I built'. Voice Design fallback prompt: "New Zealander around 40, general NZ accent, urban and professional, not broad, low-mid register, dry and unhurried, faintly amused, close-mic in a quiet site office, conversational, not a narrator or announcer."

**Rules:** Pronunciation: 'Q-S' is two letters (kyoo-ess); QSME is 'Q-S-me' (kyoo-ess-mee), never 'kiss me', never four letters; qsme.build is 'Q-S-me dot build'. Letters are said as letters: 'D.' 'R.' 'X.' etc. with a real full stop after each. Natural Kiwi rhythm, contractions, no exclamation marks, no announcer lift. Owner CTA rule (2026-10-03): no 'free', no pricing line, no 'sign up at qsme.build' in any take. Never say 'critical path', 'line by line', 'measure', 'takeoff', 'escrow', 'verified'. No line ever ends on a 'me' pun.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Videos:** hero `outputs/qs-alphabet-16x9.mp4` (90.0 s, this timeline, `vo-script.json`) · 4:5 `outputs/qs-alphabet-4x5.mp4` (33.0 s, `vo-script-4x5.json`) · 9:16 `outputs/qs-alphabet-9x16.mp4` (30.0 s, `vo-script-9x16.json`). The three cuts have different clocks, so each has its own timeline.

**Casting line:** "Every project runs from A to Z. Just… never in that order. Good Q-S, good project. We're biased."

**Silent cut:** all three MP4s ship silent, with every line already on screen (captions word for word, or the big type itself), so they work with the sound off. This VO is laid on after the ElevenLabs upgrade (`python3 tools/make_vo.py --all`, then `tools/mux`). Owner CTA rule (2026-10-03): no "free" or pricing line in any take.

## Hero lines (16:9, 25 lines, 188 words)

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.15s | 2.5s | **Every project runs from A to Z.** | (same) | A B C on near-black green WITH the caption from frame 1; the row types to Z by 1.05 s; the split-flap clatter breaks the pattern on 'Z' (1.9 s) · caption 'Every project runs from A to Z.' | Plain and warm, like stating the obvious at the start of a site meeting. A slight lift on 'A', settle on 'Z'. Out by 2.65. |
| 2.9s | 1.8s | **Just… never in that order.** | [deadpan] Just… never in that order. | ten letters flip green; route arcs draw ONE AT A TIME D→R→X→G→T→B→A→I→O→P (2.55–4.35, 0.2 s each), each letter's order number (36 px) pops as its arc lands, earlier arcs drop to 30 %; A's 7 lands at 3.75; A swells to a big '7th' (4.55) · caption 'Just… never in that order.' | The dry turn. A real hesitation after 'Just', then flat. Out by 4.7 at the latest: 0.4 s of silence follows (the 7th lands in it). |
| 5.5s | 2.75s | **Someone keeps it in order. That's the Q-S.** | (same) | Q and S rise out of the dimmed letters and glow green; push-in · caption 'Someone keeps it in order. That's the QS.' | Matter-of-fact, a touch of pride. Small pause before 'That's'. 'Q-S' as two letters. Out by 8.2. |
| 8.5s | 2.9s | **Q-S. Quantity surveying. The Q-S in Q-S-me.** | (same) | Q and S fly in; 'Quantity / Surveying' types 8.72–9.35 (Q and S in green) and HOLDS complete to 10.7; the words pull back into Q and S, which slide and grow onto the logo's Q and S and CUT (11.22, no cross-fade) to the QSME wordmark; M and E join with no label 11.2–11.6 · caption 'QS. Quantity surveying. The QS in QSME.' (8.45–11.65) | Spelling it out for a mate: 'Q-S.' (beat) 'Quantity surveying.' (beat) then a small smile on 'The Q-S in Q-S-me'. Never expand the ME. Out by 11.4. |
| 11.7s | 3.6s | **Good Q-S, good project. We're biased. It's in our name.** | (same) | 'Good QS.' stamps (11.72), 'Good project.' stamps (12.62), then the handwritten aside '(We're biased. It's in our name.)' (13.55) with an arrow at 'QS.' | The conviction first, said plainly on the two stamps. Then the aside drops half a step, self-aware, the joke on us. Out by 15.3. |
| 15.5s | 1.3s | **Architects design it.** | (same) | ledger row 1: architect icon + 'Architects design it.' (15.5) over dimmed foundation b-roll | Warm, respectful, unhurried. This beat is not a joke. Out by 16.8. |
| 16.9s | 1.4s | **Engineers keep it standing.** | (same) | ledger row 2: structural engineer icon + 'Engineers keep it standing.' (16.9) | Same warmth, same level. Out by 18.3. |
| 18.35s | 1.25s | **Builders build it.** | (same) | ledger row 3: general contractor icon + 'Builders build it.' (18.35) | Same, with a hint of a smile at the plainness of it. Out by 19.6. |
| 19.9s | 2.1s | **The Q-S makes it all add up.** | (same) | red-biro double underline draws under the three rows (19.6–20.1), then the QS row lands: 'The QS makes it all add up.' (19.95) | The total line. Quiet confidence, a light lean on 'all'. Not a boast. Out by 22.0. |
| 22.1s | 5.1s | **Q-S by title, or Q-S by default. Here's your alphabet. In Q-S order.** | (same) | split: business card 'Quantity Surveyor' (no name) / hard hat taped 'Developer, doing the QS bit tonight'; row 'QS & PM practices · Main contractors · Developers & owners'; the split clears 24.75–25.0; the alphabet re-forms mid-frame (25.0) and the ten letters drop out one by one into a second row D R X G T B A I O P numbered 1–10 (25.35–26.6); the row drops away as the strip docks at the top (26.9–27.35) · captions 'QS by title, or QS by default.' / 'Here's your alphabet. In QS order.' (held to 27.46, replaced directly by D's caption) | Two halves. 'Q-S by title, or Q-S by default' with a knowing nod to the developer pricing at night (never mocking). Beat. Then 'Here's your alphabet.' as the music picks up, 'In Q-S order.' landing as the QS-order row completes (26.6). Out by 27.2. |
| 27.5s | 3.9s | **D. Drawings. The whole set, split into sections.** | (same) | D · 1st · DRAWINGS · Plan index: 'Read a document' → 'Finding the sections…' → chips Site plan p.2 / Floor plans p.4–7 / Elevations p.8–11 / Drainage layout p.22–24 → '4 of 11 sections ready' (30.0) | Letter, beat, word, beat, then the line read straight. Every letter stop uses this rhythm. Out by 31.4. |
| 31.7s | 3.9s | **R. Rates. Your rates, one schedule. AI drafts. You check.** | (same) | R · 2nd · ESTIMATING & QUANTITIES · SOQ 'Plasterboard & ceilings': rate 64.00 typed, totals tick; 'Insulation · AI draft' → Keep → 'Pocket kept — it's now part of your SOQ' | 'AI drafts.' (beat) 'You check.' — the second is the point: firm, friendly. Out by 35.6. |
| 35.9s | 3.9s | **X. Excel. Close enough. In, and back out.** | X. Excel. [deadpan] Close enough. In, and back out. | X · 3rd · EXCEL IN, EXCEL OUT · captions 'X. Excel.' then 'Close enough. In, and back out.' (36.95, the moment the scrawl '(close enough)' lands) · qsme-example-soq.xlsx dropped in → 'We also found these columns' → 'Imported 3 pockets and 11 lines as drafts' → Export menu | Deadpan half-beat after 'Excel.' then 'Close enough.' as a mutter. 'In, and back out.' brisk. Out by 39.8. |
| 40.1s | 3.9s | **G. Gantt. Your priced jobs, no retyping.** | (same) | G · 4th · PLANNING · 'Import jobs from SOQ' → 'Import 23 tasks' → bars chain with dates in words → 'What drives the finish date' rings the chain in purple → the A4 'Construction programme' slides in | Easy and practical. Lean on 'no retyping' like someone who has retyped plenty. Out by 44.0. |
| 44.3s | 3.9s | **T. Tender. Same lines, every bidder. Your rates stay home.** | (same) | T · 5th · TENDERING · 'Create New Tender · Plasterboard & ceilings' · 'Select whole pocket 4 of 4 selected' · YOUR LINES (rates) vs WHAT BIDDERS SEE (rate boxes empty), every line typed Material / Labour · note 'rate: never shown' · 'Copy link', invites Invited → Viewed | 'Same lines, every bidder' even and clear; 'Your rates stay home' with a little warmth, like tucking something away. Out by 48.2. |
| 48.5s | 3.9s | **B. Bids. One table, even the emailed one. You choose.** | (same) | B · 6th · TENDERING · 'Compare bids': six totals, Bidder D 'Received by you', Bidder F 'Lowest' 71,300 · chip 'All totals excl. tax' · F opens 'Detailed price breakdown' | 'Even the emailed one' with a knowing nod; 'You choose.' short and firm (QSME never picks the winner). Out by 52.4. |
| 52.75s | 1.0s | **A. Award.** | (same) | A · 7th · AWARD & CONTRACT · big '7th' beside the A · 'Award this bid?' dialog (Bidder F, 71,300) · caption 'A. Award.' only (52.66–54.0) | Same letter rhythm, then STOP. Out by 53.75; 0.25 s of silence before the stamp. |
| 54.0s | 2.3s | **Finally. And it's a contract.** | [sighs] Finally. And it's a contract. | 'Finally.' stamps on (54.0) and the caption 'Finally. And it's a contract.' appears with it, never before · 'Award bid' pressed (54.6) → Active Work: Contract value 71,300 · Retention 5% · Milestones 0 / 3 confirmed · Stage 1 of 3 — Mobilisation | 'Finally.' is the laugh: weary relief, an exhale, landing exactly on the stamp. Then 'And it's a contract.' straight and pleased. Out by 56.3. |
| 56.9s | 3.9s | **I. Ink. Well… a finger, on a phone.** | (same) | I · 8th · CONTRACTS · captions 'I. Ink.' then 'Well… a finger, on a phone.' (57.95, as the scrawl '(well… a finger)' lands) · Agreements: 'Subcontract — Plasterboard & ceilings (demo)', 'Sign it as it is', 'Out for signing' · phone BROWSER: tick, 'Sam Rivera' typed, signature drawn, 'Sign' → 'Signed. Download a copy below and keep it.' · 'Everyone has signed' | 'Ink.' confident, then catch yourself: 'Well…' (beat) 'a finger, on a phone.' Self-correcting, amused. Out by 60.8. |
| 61.1s | 3.9s | **O. On site. One QR poster. One daily log.** | (same) | O · 9th · WORK ON SITE · laminated 'Site sign-in' poster (illustrative) on a fence · phone browser 'Who are you with?' → 'Tick every line to sign in.' → 'Sign in for today' → 'You're signed in, Sam' · 'Daily log': 'Site photo', 'Proof of work' | Two even halves: 'One QR poster.' 'One daily log.' QR as letters. Out by 65.0. |
| 65.3s | 3.9s | **P. Paid. Your usual way, confirmed by whoever got paid.** | (same) | P · 10th · DELIVERABLES & PAYMENTS · WHOEVER PAID: 'I paid outside QSME', reference STG1-0417, 'I have sent the money.' → 'Mark as paid' · WHOEVER GOT PAID: 'The money has cleared in my account.' → 'Confirm payment received' · from 67.0 the receiver's window pushes in (1.25x) and the payer's dims to 40 % → both: 'Settled outside QSME and confirmed by both sides.' (last thing read) | Plain and precise. Lean lightly on 'whoever got paid'. Never 'release', never 'secure'. Out by 69.2. |
| 69.5s | 2.1s | **And the rest? Alphabetical, for once.** | (same) | caption 'And the rest? Alphabetical, for once.' · C K U V W light in order every 0.6 s (C 69.8 … W 72.2, then all hold) with 'Copy link' · 'Keep every word' · 'Undo' · 'Version history' · 'Waiting for OK' | Light, wry, quick. The labels pop on 16th-note ticks under and after the line. Out by 71.6. |
| 73.7s | 3.5s | **Z. One record. First estimate to last payment.** | (same) | every letter lights · Z stamps · PROJECT MANAGEMENT · ten cards collapse into one: 'ONE RECORD · Riverside Terraces (demo)' with D R X G T B A I O P | Music drops to piano. Slower, warmer: 'Z.' (beat) 'One record.' (beat) 'First estimate to last payment.' Out by 77.2. |
| 77.5s | 4.4s | **Q-S-me. Built by a Q-S, for whoever's the Q-S.** | (same) | Q and S fly from the strip into the QSME wordmark; M and E join with no label · real capture of qsme.build/about, the founder card exactly as the live page shows it (nothing removed): 'Founder and chief executive — A professional quantity surveyor and software architect. QSME is the product of pricing and tendering real projects and then building the tool those projects needed.' (first sentence underlined) | The brand line, said simply. 'Q-S-me.' (beat) then the rest with a small smile on 'whoever's'. If the founder reads, use founder_alt_lines instead. Out by 81.9. |
| 82.3s | 4.5s | **Book a thirty-minute demo at Q-S-me dot build. Bring your spreadsheet.** | (same) | End card: QSME wordmark (no ®) · pill 'Book a 30-minute demo' · 'qsme.build' · 'Bring your spreadsheet.' (83.4); holds to 90.0 | Friendly nudge, no announcer lift. 'Bring your spreadsheet.' as a dry afterthought with half a smile. Out by 86.8, leaving the end card to hold for 3+ s. |

Silent on purpose: 2.0–2.9 s (after the hook line; typing ends); 4.7–5.5 s (0.4 s of dead silence after 'order' (the 7th lands), then the music returns); 53.75–54.0 s (freeze before 'Finally.'); 71.6–73.6 s (the five quick labels pop on calculator ticks); 86.8–90.0 s (end card holds 3.2 s, music tail)

### Founder variant (only in the founder's own voice)

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 77.5s | 4.4s | **I'm a quantity surveyor. I built Q-S-me for whoever's the Q-S.** | (same) | same as vo24 | FOUNDER ONLY (his own voice, never an AI clone). Plain and proud, no sell. Out by 81.9. |

## 4:5 LinkedIn cut (17 lines, 71 words)

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.1s | 2.0s | **Every project runs from A to Z.** | (same) | A B C in two rows of 13 WITH the caption from frame 1; the row types to Z · caption 'Every project runs from A to Z.' | Plain and warm. Out by 2.1. |
| 2.3s | 1.6s | **Just never in that order.** | [deadpan] Just never in that order. | split-flap shuffle, ten letters flip green with order numbers, A swells to '7th' (3.45) · caption 'Just never in that order.' | Dry, flat, quick. Out by 3.9. |
| 4.1s | 2.2s | **Sorting that out? That's the Q-S.** | (same) | Q and S rise and glow green · caption 'Sorting that out? That's the QS.' | A small rhetorical lift on the question, then flat: 'That's the Q-S.' Out by 6.3. |
| 6.5s | 1.6s | **Q-S. Quantity surveying.** | (same) | 'Quantity / Surveying' acrostic types 6.5–6.95 and holds complete to 8.05 while the wordmark builds below (no ®; M and E unlabelled) · caption 'QS. Quantity surveying.' | Spelled out, unhurried. Out by 8.1. |
| 8.3s | 2.6s | **Good Q-S, good project. We're biased.** | (same) | 'Good QS.' (8.28) / 'Good project.' (8.95) stamps + aside '(We're biased. It's in our name.)' (9.75) | Conviction on the stamps, then the aside half a step down. Out by 10.9. |
| 11.1s | 2.2s | **Q-S by title, or Q-S by default?** | (same) | 'QS by title,' over a business card (no name) / 'or QS by default?' over a hard hat taped 'Developer, doing the QS bit tonight' · 'QS & PM practices · Main contractors · Developers & owners' | A genuine question to the viewer, light lift at the end. Out by 13.3. |
| 13.45s | 1.28s | **D, drawings.** | (same) | D giant letter + descriptor; one UI moment: '4 of 11 sections ready' (Plan index, enlarged to 38 px) | Quick and even, on the beat; letter, comma, word. Out by 14.75. |
| 14.85s | 1.28s | **R, rates.** | (same) | R giant letter + descriptor; one UI moment: 'AI draft · Keep' → 'Pocket kept — it's now part of your SOQ' | Quick and even, on the beat; letter, comma, word. Out by 16.15. |
| 16.25s | 1.28s | **X, Excel. Close enough.** | (same) | X giant letter + descriptor; one UI moment: 'qsme-example-soq.xlsx' → 'Imported 3 pockets and 11 lines as drafts' · caption 'X, Excel.' then 'X, Excel. Close enough.' as the scrawl lands (+0.5) · caption 'X, Excel.' then 'X, Excel. Close enough.' as the scrawl lands (+0.5) | Quick aside after 'Excel.': 'Close enough.' muttered. Fast but unhurried-sounding. Out by 17.55. |
| 17.65s | 1.28s | **G, Gantt.** | (same) | G giant letter + descriptor; one UI moment: 'What drives the finish date' rings the chain in purple | Quick and even, on the beat; letter, comma, word. Out by 18.95. |
| 19.05s | 1.28s | **T, tender.** | (same) | T giant letter + descriptor; one UI moment: YOUR LINES (rates) vs WHAT BIDDERS SEE (empty rate boxes), 'rate: never shown' | Quick and even, on the beat; letter, comma, word. Out by 20.35. |
| 20.45s | 1.28s | **B, bids.** | (same) | B giant letter + descriptor; one UI moment: 'Compare bids', Bidder F 'Lowest' (enlarged) · amber note 'All totals excl. tax' ABOVE the window, outside the app | Quick and even, on the beat; letter, comma, word. Out by 21.75. |
| 21.85s | 1.48s | **A… finally. Award.** | (same) | A giant letter + descriptor; one UI moment: big '7th', 'Finally.' stamp (+0.5), 'Award this bid?' → 'Award bid' (enlarged) → Active Work · caption 'A…' then 'A… finally. Award.' with the stamp | 'A…' hangs, then 'finally.' as the weary laugh on the stamp, then 'Award.' crisp. Out by 23.35. |
| 23.45s | 1.18s | **O, on site.** | (same) | O giant letter + descriptor; one UI moment: poster + phone browser 'Sign in for today' → 'You're signed in, Sam' | Quick and even, on the beat; letter, comma, word. Out by 24.65. |
| 24.75s | 1.18s | **P, paid.** | (same) | P giant letter + descriptor; one UI moment: 'Confirm payment received' (enlarged) → 'Settled outside QSME and confirmed by both sides.' | Quick and even, on the beat; letter, comma, word. Out by 25.95. |
| 26.05s | 2.3s | **Z. One record. Built by a Q-S.** | (same) | every letter lights, Z stamps, the QSME wordmark builds, 'Built by a quantity surveyor.' · dusk b-roll and its 'Illustrative footage' tag from 27.0 (after the docked strip has gone) · caption 'Z. One record. Built by a QS.' | Slower, warmer, piano under it. Out by 28.35. |
| 28.5s | 3.2s | **Book a thirty-minute demo at Q-S-me dot build.** | (same) | end card: wordmark · 'Book a 30-minute demo' · 'qsme.build' · 'Bring your spreadsheet.' holds to 33.0 | Friendly nudge, no lift. Out by 31.7. |

## 9:16 Shorts cut, Hook A (15 lines, 57 words)

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.2s | 2.1s | **What's the Q-S in Q-S-me?** | (same) | 'What's the QS / in QSME?' over the QSME wordmark in white, a green caret blinking under Q, S, M, E in turn | A real question, conversational, small lift at the end. Out by 2.35. |
| 2.5s | 1.6s | **Quantity surveying.** | (same) | Q and S turn green and lift out (2.3); 'Quantity' / 'Surveying' type after them, complete by 3.0 and held to 4.1; M and E stay dim and unlabelled | The answer, plain, a tiny smile. Out by 4.1. |
| 4.3s | 2.4s | **Good Q-S, good project. We're biased.** | (same) | 'Good QS.' (4.28) / 'Good project.' (4.95) stamps + '(We're biased.)' (5.75) | Conviction, then the aside. Out by 6.7. |
| 6.9s | 3.0s | **A to Z. Never in that order.** | (same) | A–Z types in two rows of 13, shuffles, ten letters flip green with order numbers, A swells to '7th' (8.9) · caption 'A to Z. Never in that order.' | Dry. A beat after 'A to Z.' Out by 9.9. |
| 10.05s | 1.28s | **D, drawings.** | (same) | D giant letter + descriptor; one UI moment: '4 of 11 sections ready' (Plan index, enlarged to 38 px) | Quick and even, on the beat; letter, comma, word. Out by 11.35. |
| 11.45s | 1.28s | **R, rates.** | (same) | R giant letter + descriptor; one UI moment: 'AI draft · Keep' → 'Pocket kept — it's now part of your SOQ' | Quick and even, on the beat; letter, comma, word. Out by 12.75. |
| 12.85s | 1.28s | **X, Excel. Close enough.** | (same) | X giant letter + descriptor; one UI moment: 'qsme-example-soq.xlsx' → 'Imported 3 pockets and 11 lines as drafts' · caption 'X, Excel.' then 'X, Excel. Close enough.' as the scrawl lands (+0.5) · caption 'X, Excel.' then 'X, Excel. Close enough.' as the scrawl lands (+0.5) | Quick aside after 'Excel.': 'Close enough.' muttered. Fast but unhurried-sounding. Out by 14.15. |
| 14.25s | 1.28s | **G, Gantt.** | (same) | G giant letter + descriptor; one UI moment: 'What drives the finish date' rings the chain in purple | Quick and even, on the beat; letter, comma, word. Out by 15.55. |
| 15.65s | 1.28s | **T, tender.** | (same) | T giant letter + descriptor; one UI moment: YOUR LINES (rates) vs WHAT BIDDERS SEE (empty rate boxes), 'rate: never shown' | Quick and even, on the beat; letter, comma, word. Out by 16.95. |
| 17.05s | 1.28s | **B, bids.** | (same) | B giant letter + descriptor; one UI moment: 'Compare bids', Bidder F 'Lowest' (enlarged) · amber note 'All totals excl. tax' ABOVE the window, outside the app | Quick and even, on the beat; letter, comma, word. Out by 18.35. |
| 18.45s | 1.48s | **A… finally. Award.** | (same) | A giant letter + descriptor; one UI moment: big '7th', 'Finally.' stamp (+0.5), 'Award this bid?' → 'Award bid' (enlarged) → Active Work · caption 'A…' then 'A… finally. Award.' with the stamp | 'A…' hangs, then 'finally.' as the weary laugh on the stamp, then 'Award.' crisp. Out by 19.95. |
| 20.05s | 1.18s | **O, on site.** | (same) | O giant letter + descriptor; one UI moment: poster + phone browser 'Sign in for today' → 'You're signed in, Sam' | Quick and even, on the beat; letter, comma, word. Out by 21.25. |
| 21.35s | 1.18s | **P, paid.** | (same) | P giant letter + descriptor; one UI moment: 'Confirm payment received' (enlarged) → 'Settled outside QSME and confirmed by both sides.' | Quick and even, on the beat; letter, comma, word. Out by 22.55. |
| 22.65s | 2.8s | **Z. One record. Built by a Q-S.** | (same) | every letter lights, Z stamps, wordmark builds, 'Built by a quantity surveyor.' · dusk b-roll and its 'Illustrative footage' tag from 23.6 (after the docked strip has gone) · caption 'Z. One record. Built by a QS.' | Slower, warmer. Out by 25.45. |
| 25.8s | 3.4s | **Book a thirty-minute demo at Q-S-me dot build.** | (same) | end card: wordmark · 'Book a 30-minute demo' · 'qsme.build' · 'Bring your spreadsheet.' holds to 30.0 | Friendly nudge. Out by 29.2. |

### 9:16 Hook B test (swap 0–4.2 s only; not rendered)

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.2s | 1.6s | **How long've you got?** | (same) | Generic chat tagged 'Fictional chat': 'Brother-in-law' asks 'So what does a QS actually do?'; 'QS is typing…' grows until the bubble fills the phone | Amused, unhurried, a mate settling in. Out by 1.9. (Hook B is a test: swap only 0–4.2 s; not rendered yet.) |
| 2.7s | 1.4s | **Q-S. Quantity surveying.** | (same) | hard cut to 'QS. Quantity surveying.' | Plain. Out by 4.1. |

## Continuous read, hero (v2, the primary source)

```
Every project runs from A to Z.

Just… never in that order.

Someone keeps it in order. That's the Q-S.

Q-S. Quantity surveying. The Q-S in Q-S-me.

Good Q-S, good project. We're biased. It's in our name.

Architects design it.

Engineers keep it standing.

Builders build it.

The Q-S makes it all add up.

Q-S by title, or Q-S by default. Here's your alphabet. In Q-S order.

D. Drawings. The whole set, split into sections.

R. Rates. Your rates, one schedule. AI drafts. You check.

X. Excel. Close enough. In, and back out.

G. Gantt. Your priced jobs, no retyping.

T. Tender. Same lines, every bidder. Your rates stay home.

B. Bids. One table, even the emailed one. You choose.

A. Award.

Finally. And it's a contract.

I. Ink. Well… a finger, on a phone.

O. On site. One QR poster. One daily log.

P. Paid. Your usual way, confirmed by whoever got paid.

And the rest? Alphabetical, for once.

Z. One record. First estimate to last payment.

Q-S-me. Built by a Q-S, for whoever's the Q-S.

Book a thirty-minute demo at Q-S-me dot build. Bring your spreadsheet.
```

## SFX (under the music)

- typewriter tick per letter 0.0–1.05
- split-flap clatter 1.9–2.65 (starts on 'Z')
- one soft tick per route arc as each order number lands, 2.45–4.35 (ten ticks; A is the 7th)
- one soft tick per letter as the QS-order row forms, 25.35–26.6
- no whoosh on the wordmark cut (11.22): a dry key click
- soft rubber stamp 11.72, 12.62, 54.0 (Finally.), 73.75 (Z)
- per letter, under the music: D page turn · R calculator key · X dry boop · G pencil line · T envelope slide · B paper slap · A stamp · I pen scratch · O gate latch · P quiet tick
- 16th-note calculator ticks 69.8–72.4
- NO tape-measure zips, laser beeps or cash-register sounds

## Post

Duck the music 10–12 dB under the VO. Mux with tools/mux: one stem per line at start_s. Loudness -14 LUFS (YouTube/LinkedIn).
