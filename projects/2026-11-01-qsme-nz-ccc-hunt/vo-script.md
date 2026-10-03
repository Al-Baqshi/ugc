# VO script: Kiwi performance, "Everything's finished. Except one bit of paper."

**Character:** Mel, an everyday Kiwi woman in her late 30s and the owner-builder in this skit. Mel, the roofer, the house and the Hamilton job are all fictional (the video says "A skit · names made up" until the thread ends). She is dry and quietly amused by the paperwork, and a little by herself (her third text says "sorry, me again"), never by the roofer: he's flat out on a job in Queenstown, and "fair enough" is meant. She reads the hunt like a flat incident report, and each place gets shorter and flatter. General NZ accent, never a caricature. No announcer lift, no exclamation marks. The product lines are second-person or neutral tips ("You check it. You tick it."), never "I use it" and never a result claim, so an AI voice can't read as a customer testimonial.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Video:** `outputs/ccc-hunt-9x16.mp4` (9:16, 32.2 s silent master with burned-in captions, re-timed 2026-10-04 after review). This is the only cut, so every time below is seconds on that file. The windows were checked against the timing in `motion/ccc-hunt.html` and against frames pulled from the master.

**Silent cut:** the MP4 ships silent. Every line is already on screen (headline, labels, captions, end card), so it works with the sound off. Lay this VO on after the ElevenLabs upgrade, or use a real Kiwi voice memo (which needs no AI label).

**Casting line:** "Inbox. Garage. Box three of seven. The ute. Good pie, though."

**Pronunciation:** QSME = **Q-S-me** (kyoo-ess-mee), never "kiss me", never four spelled-out letters. It's said twice: "Q-S-me just ends the hunt." and the CTA "Sign up at Q-S-me dot co dot en zed". CCC is never spoken here (it's on screen); if a take needs it, say "C-C-C", never "Code Compliance Certificate" in full. "Ute" = yoot.

## Lines

Pace: most lines sit at 2–3 words/s with silence between them on purpose. `tools/vo_status.py` marks the tight ones (about 3 words/s, still inside the limit). "Out by" = start + max.

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.05s | 0.90s | **Everything's finished.** | [satisfied] Everything's finished. | Dusk still ("Illustrative footage"), headline "Everything's finished." from frame 0; the move-in list is up by 0.15 and ticks four lines (0.25–0.84) | Quietly pleased, over-the-fence; says what the headline says. Out by 0.95, as the last line goes red (0.85). |
| 1.00s | 1.45s | **Except one bit of paper.** | [flat] Except one bit of paper. | "Record of Work — Roofing" goes red with an ✗ (0.85) and a marker ring; red box "Except one bit of paper." (0.91–1.05) | The turn: same voice, the pleasure drained out. Out by 2.45, before the whip (2.42). |
| 2.80s | 0.90s | **Inbox.** | Inbox. | "SEARCH 1 · Inbox."; the search types "record of work" → "No results" (3.48) | Incident-report flat, falling. Let "No results" land in silence. |
| 4.45s | 1.60s | **Garage. Box three of seven.** | Garage. [sighs] Box three of seven. | "SEARCH 2 · Garage."; the "HOUSE STUFF / BOX 3 OF 7" box throws out an oven warranty, tile samples, a kitchen quote v3, paint colours; "Not it." (5.60) | "Garage" flat, a beat, then the box number a touch wearier. Out by 6.05. |
| 6.15s | 0.90s | **The ute.** | The ute. | "SEARCH 14 · The ute."; the glovebox drops open (6.36) | Lowest and shortest: a long shot. Out by 7.05. |
| 7.85s | 0.95s | **Good pie, though.** | [wistful] Good pie, though. | Receipt "1 x MINCE & CHEESE PIE $5.50" holds clean (6.96–7.50); "Not it." (7.50); "(good pie though)" (7.80), held to the whip (8.50) | The only warm line in the hunt, under the breath. Out by 8.80. |
| 9.00s | 1.60s | **Monday. Wednesday. Friday.** | Monday... Wednesday... Friday. | Thread to "Roofer · usually replies Sundays": Mon (8.82), Wed (9.44), Fri "Any chance? (sorry, me again)" (10.10); "Delivered" (10.36) | One word per bubble, about 0.6 s apart. Patient, a bit sheepish by Friday. Out by 10.60. |
| 10.80s | 1.75s | **He's in Queenstown. Fair enough.** | He's in Queenstown. [chuckles] Fair enough. | Caption "He's on a job in Queenstown. / Fair enough." (10.72–12.68) | Genuinely fair, no sarcasm: the roofer isn't the joke, the paperwork is. Out by 12.55. |
| 12.95s | 2.95s | **Next build, the paper goes in while they're on site.** | (same) | "NEXT BUILD · IN QSME / The paper goes in while they're still on site." over the live public Knowledge Hub guide; the "LBP Record of Work · Licensed Building Practitioner (LBP)" row is outlined (13.50) | The lesson, said to a mate. Slight lean on "Next build". Out by 15.90, before the whip. |
| 16.15s | 2.00s | **Roofer records it before he leaves.** | (same) | Caption "The roofer records it before he leaves site."; "Issue Certificate" filled with demo data, clicked (17.81); his Site Certificates card gets the row (18.27), toast "Certificate issued" (18.33) | Practical, matter-of-fact. Out by 18.15, so the row and toast land in quiet. |
| 19.15s | 2.20s | **You check it. You tick it.** | (same) | Caption "You check it. Then you tick it."; the checklist step "Lead trades are LBPs; Records of Work collected" is ticked by hand (20.04), Phase 2 4/5 → 5/5 | Two small steps, equal weight; tiny smile on "tick". Out by 21.35. |
| 21.65s | 3.05s | **Every certificate, plus the council index, in one zip.** | (same) | Caption "Every certificate + the council index. One zip."; "CCC Pack" hovered and clicked (22.56); CCC_Pack.zip opens (23.34) | Unhurried list; "one zip" as quiet relief. Out by 24.70. |
| 25.68s | 1.35s | **You still lodge it.** | (same) | Dummy 00_INDEX.pdf dims; caption "You still lodge it with council." (25.59) | Plain and honest, a small shrug. Out by 27.03. |
| 27.12s | 1.40s | **Q-S-me just ends the hunt.** | (same) | "QSME just ends the hunt." slams in (27.09) | The payoff, dry and warm, and the first time the brand is said. "Q-S-me" clear; lean on "ends". Out by 28.52. |
| 28.75s | 2.80s | **Sign up at Q-S-me dot co dot en zed.** | (same) | End card: "NEXT BUILD", "Everything's finished. / Even the paper.", the ✗ flips to ✓ (29.03), [Sign up at qsme.co.nz] (29.19), held to 32.20 | Same friendly voice, not an ad read. "Q-S-me" clear. Out by 31.55, leaving a 0.65 s tail. |

Silence on purpose: 2.45–2.8 (whip), 3.5–4.45 ("No results" lands), 5.6 on the stamp, 15.9–16.15, 18.15–19.15 (the row and the toast), 21.35–21.65, 24.7–25.68 (the index reads on its own), 31.55–32.2 (tail).

## Rules for the take

- **Owner CTA rule (2026-10-03):** no "free", "no sign-up", "no login", "no fees" or any pricing line in any take. The CTA is "Sign up at Q-S-me dot co dot en zed."
- Don't add a line that says QSME lodges, sends or submits anything to council, issues the CCC or certificates, or "guarantees" sign-off. Don't say "verified", "instant" or "automatic" about any tradie or licence.
- No numbers that aren't on screen. No time or money saved.
- If an ElevenLabs voice is used, switch on TikTok's AI-generated content label and Meta's AI label.
