# VO script: Kiwi performance

**Character:** The QS, the same voice as Six bids and Column H. He's a mid-career quantity surveyor (late 30s to 40s) with a general, urban, professional New Zealand accent (an Auckland or Wellington office), not broad, not rural and not Australian. In this one he reads a vendor's security page out loud across the desk to a procurement lead. He's calm, dry and completely straight-faced, and faintly impressed that the answer is one word long. He never sounds like an announcer or lifts into a sales read. It's an AI character voice, so it never speaks as the founder.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Video:** `outputs/iso-27001-no-4x5.mp4` (LinkedIn master, 30.0 s; the times below are seconds on this file). `outputs/iso-27001-no-9x16.mp4` runs on the same clock frame for frame, so one set of clips fits both.

**Casting line:** “ISO twenty-seven-oh-oh-one certified? No. In progress. Not certified. Said plainly.”

**Silent cut:** both MP4s ship silent, with every line already on screen: the questionnaire row (N ticked before the cut), the giant 'No.', the page's own words with underlines, the captions and the answered row on the end card. That makes them watchable with the sound off. This VO gets added later, after the ElevenLabs upgrade. Owner CTA rule (2026-10-03): no take may include 'free' or any pricing line.

**Pronunciation:** QSME = “Q-S-me” (kyoo-ess-mee), never 'kiss me' and never four separate letters. qsme.build = “Q-S-me dot build”. ISO 27001 = “eye-so twenty-seven-oh-oh-one”. SOC 2 = “sock two” (written “Sock two” so the voice doesn't spell it out).

## Lines

| Start | Max | Line (v2) | On screen | Delivery |
|---|---|---|---|---|
| 0.15s | 2.5s | **ISO twenty-seven-oh-oh-one certified?** | Frame 1: 'Is QSME / ISO 27001 / certified?' plus the chips 'Security questionnaire' and 'Row 1', two big empty Y / N boxes and an empty 'Evidence' field. N is ticked in green at 2.78; hard cut at 3.0 | He reads row one off the screen, flat, like it's the fortieth time this month. About 12 syllables in 2.5 s, so it's an unhurried read (the screen already says 'Is QSME'). Let it fall a touch on 'certified', with no sales lift. It has to be out by 2.65 so the tick and the cut land in silence. |
| 3.07s | 0.5s | **No.** | A giant 'No.' (green full stop) holds in silence from 3.0 to 4.6. 'qsme.build/security' fades in under it at 3.55 | One word, flat and final, a fraction after the cut. No smile and no emphasis. Then nothing for the rest of the hold: the silence is the joke. |
| 5.63s | 1.55s | **Same answer. Fifteen languages.** | Caption 'Same answer. 15 languages.' (5.6–7.2) over the same FAQ row on the de, fr, ar, ru, ja and hi pages, with each first word underlined: Nein. Non. لا. Нет. いいえ。 नहीं। | A dry aside, a bit lower than the hook, with a real full stop after 'answer'. Word for word with the caption. |
| 7.1s | 0.7s | **Sock two?** | The page's own question 'Do you have a SOC 2 report?' (the answer stays masked until 7.85) | The next row of the form, the same flat read, slightly quicker. Out by 7.8, before the answer wipes open. |
| 8.35s | 0.9s | **Also no.** | Caption 'Also no.' (8.3–9.9) under the highlighted page line 'No. We do not claim one.' | The tiniest dry shrug in the voice, otherwise flat. Word for word with the caption. |
| 10.57s | 1.75s | **Here's what is in place.** | Caption (10.55–12.8) over 'IN PLACE · What is in place today?' and the TLS card, then a hard cut (10.95) to the 'Bidder visibility rules' card | The turn: matter-of-fact and a hair warmer, like turning the page round to show someone. A light lean on 'is'. |
| 14.72s | 1.1s | **Being built now.** | The page sentence underlined 14.6–15.45: 'An information security management system aligned to ISO/IEC 27001:2022 is being built now.' | He reads the end of the highlighted sentence as the underline finishes. Plain: no promise in it and no 'soon'. |
| 15.92s | 2.4s | **In progress. Not certified. Said plainly.** | The captions pop at 15.9, 16.6 and 17.3, each on its own words on the page ('The programme is in progress;' and 'QSME is not certified' are tinted green) | Three short phrases timed to the pops. Even and unhurried, with the last one a touch lower: quiet approval, not a tagline. Word for word with the caption. |
| 20.06s | 3.75s | **We do not display badges, logos or ratings we have not earned.** | Full-frame quote: “We do not display / badges, logos or / ratings we have / not earned.” — qsme.build/security | The page's exact sentence, no contractions, because the card shows it in quote marks. About 18 syllables in 3.75 s: even and unhurried, a small beat after 'badges,' and a light lean on 'not earned'. Deadpan respect, not a boast. Out by 23.81. |
| 23.98s | 1.9s | **Need this in writing for procurement?** | End card: the same questionnaire row as frame 1, now answered (N ticked); 'Evidence: qsme.build/security' types in at 24.45. VO only: it's the security page's own CTA heading | A plain, helpful question across the desk, not a pitch, while the evidence fills in. Out by 25.88. |
| 25.92s | 3.0s | **Book a thirty-minute demo at Q-S-me dot build.** | End card: the QSME logo, the answered row and the green pill 'Book a 30-minute demo at qsme.build' (26.0, small pulse 28.45) | Friendly and direct in the same voice, with no announcer lift and no rise at the end. 'Book' lands just before the green pill pops (26.0). Out by 28.92. |

Total spoken characters: about 314. Eight of the eleven lines say exactly what is on screen, and vo09 is the page's quote word for word. vo07 is the end of the underlined page sentence, vo04 says only 'Sock two?' over the page's own question, and vo10 is the page's own CTA heading, spoken over the answered questionnaire row.

**Deliberate silences:** 2.65–5.6 (the N tick, the 'No.' hold and the match cut into the page), 9.25–10.55 (after 'Also no.', and the whip), 12.3–14.7 (the bidder-rule callback and the scroll to the programme, where the highlight does the talking) and 18.3–20.05 (reading time on the programme paragraph and the badges setup).

## Production notes

- Render `continuous_read_v2` (in vo-script.json) three times, then slice each line and place it at its start time. Patch single lines with previous_text/next_text. Keep the least polished take. Reject any take where 'No.' or 'Also no.' carries a smile or an emphasis, or where the CTA lifts into an announcer read.
- Run a room-tone bed (an owner phone recording) under the whole video at about −50 to −55 dBFS so the silences never drop to digital zero.
- The mux command is in vo-script.json → post_processing. Use the same clips and times on the 9:16.
