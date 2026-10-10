# VO script — "Our whole contract is a thumbs-up" (N09) · audio-first remake 2026-10-06, CTA re-voiced 2026-10-10

**Video:** `outputs/thumbs-up-contract-9x16.mp4` (46.38 s, silent master, burned-in captions) → voiced `outputs/thumbs-up-contract-9x16-with-vo.mp4`.
**Voice:** Cam S (ElevenLabs `53CG2aO2HU48thT3QnMl`), model `eleven_v3`, stability 0.5. ONE unbroken take, 44.88 s, 118 words, 2.64 words/s, longest silence 0.70 s (after "name.", before the [amused] heat-pump line). Take, alignment and the exact text sent: `outputs/vo-take-cam-v3/`.
**Why the 2026-10-10 take:** the owner's fix of 2026-10-08 says the CTA is "dot Co dot N Z" ("co" sounds like KO, never C-O). The whole take was regenerated in one request with that ending (never sliced), and every beat of the page was re-timed to the new words. The 2026-10-06 C-O take and attempt 1 are in `outputs/archive/vo-take-cam-v3-attempts/`.
**Character:** one dry, funny Kiwi bloke telling the whole thing as a story: the thread, the "contract" read like a very short will, the product lines plain and second-person ("that bit's on you"), never "I use it". No caricature, no announcer lift, no exclamation marks. Mel and Jono stay fictional ("A skit · names made up" from frame 0); the joke is the emoji, never the sparky or the owner.

## The take as spoken (what was sent to ElevenLabs; QSME written "Queue Ess Mee")

```
[dry] Eighteen thousand dollar rewire, and our entire contract? One thumbs up. Clause one, thumbs up. Two, heat-pump wiring, thumbs up. Three, payment stages, thumbs up. Agreed, never signed. Or, paste the thread into Queue Ess Mee and write it up as a proper agreement. What was said goes in, what wasn't stays a blank, and it never makes up an amount, a date or a name. [amused] The heat pump? That bit's on you. Fill the blanks, send it, and Jonno gets it by email and signs on his phone. Signed, before Monday. Everyone's signed, that one's clear, plus a certificate. Turn the thumbs up into a signature. Sign up at Queue Ess Mee dot Co dot N Z.
```

STT (2026-10-10, first attempt): every word heard; "Eighteen thousand dollar" → "$18,000", QSME → "QS Me", "Jonno" → "Jono", the CTA → "qsme.co.nz" (koh heard as KO, as wanted). "Jonno" is spelt that way only so the voice rhymes it with "Donna"; the screen says Jono.

## Phrases, on the words (start = first word in `outputs/vo-take-cam-v3/words.json`)

| # | Start | Said | On screen (picture re-timed to the words) |
|---|---|---|---|
| vo00 | 0.25 | Eighteen thousand dollar rewire, and our entire contract? One thumbs up. | The thread under "A skit · names made up" + "Our entire contract:"; 👍 pulses 0.08 and on "contract?" (2.87); dive on "One" (3.73), full frame + gavel on "thumbs" (4.37) |
| vo01 | 5.46 | Clause one, thumbs up. Two, heat-pump wiring, thumbs up. Three, payment stages, thumbs up. | Paper 5.41; CLAUSE 1 pops 5.46, 👍 docks 6.31; CLAUSE 2 on "Two," (7.52), slam 9.39, "(unclear)" 9.63; CLAUSE 3 on "Three," (10.55), slam 12.37, "(also unclear)" 12.61 |
| vo02 | 13.23 | Agreed, never signed. | Caption "Agreed. Never signed." 13.23–15.09; signature line draws 13.18–13.52; whip 15.15 |
| vo03 | 15.49 | Or, paste the thread into Q-S-me and write it up as a proper agreement. | Bring in a document: caption "Paste the thread into QSME." 16.24; paste 17.24; "Write it up as a proper agreement" ringed 18.52; "Write it up" 19.08; spinner (sped up) |
| vo04 | 20.21 | What was said goes in, what wasn't stays a blank, | The draft lands 20.17; caption "What was said: in. / What wasn't: [blank]" 20.19; rings on the names + $18,400 21.14; [blank]s highlight 22.60 |
| vo05 | 23.40 | and it never makes up an amount, a date or a name. | Whip 23.41 to the REAL Knowledge Hub quote; underlines 23.86 / 24.98 / 25.96; whip back 26.74 |
| vo06 | 27.02 | The heat pump? That bit's on you. | Caption "The heat pump? / That bit's on you." 27.00; Enter 27.74; "Heat-pump wiring: included." typed 27.81–28.44; ring 28.50 |
| vo07 | 28.98 | Fill the blanks, send it, | Caption "Fill the blanks. Send it." 28.92; five blanks typed 29.16–30.02 (sped up); "Send for signing" 30.24; whip up 30.74 |
| vo08 | 30.90 | and Jono gets it by email and signs on his phone. | The phone: caption "Gets it by email. / Signs on his phone." 31.04; inbox tapped 31.70; page scrolls, ring on the heat-pump term 32.12; signature drawn 32.60–32.98; tick 33.20; Sign 33.36 |
| vo09 | 33.50 | Signed, before Monday. | Toast + caption "Signed. / Before Monday." 33.50; whip 35.17 |
| vo10 | 35.45 | Everyone's signed, that one's clear, | Agreements list: caption "Everyone's signed." 35.47; card flips 36.26; "👍 (clear)" fades in 36.89 |
| vo11 | 37.87 | plus a certificate. | Certificate slides up 37.81; caption "Plus a certificate." 37.97; whip 38.59 |
| vo12 | 38.85 | Turn the thumbs up into a signature. | End card: headline 38.83; 👍 slams 39.49; signature stroke 40.23 |
| vo13 | 41.33 | Sign up at Q-S-me dot Co dot N Z. | [Sign up at qsme.co.nz] pops 41.33; small print 41.49; the real sign-up page scrolls 41.79–43.29; take ends 44.88, page 46.38 |

## Mix and rules

- Whole take as ONE clip at 0.0 s, gain 1.15, no music bed: `tools/mux outputs/thumbs-up-contract-9x16.mp4 outputs/thumbs-up-contract-9x16-with-vo.mp4 outputs/vo-take-cam-v3/take.m4a@0.0@1.15` (probe: 1 audio track, duration = video).
- Picture follows audio. If the script changes: regenerate the whole take, STT-check it (`python3 tools/el.py stt`), rebuild `words.json` from `alignment.json`, re-derive every `T` value in `motion/thumbs-up-contract.html`, re-render, re-mux.
- Never "free", "no account", "no sign-up" or any pricing line (owner CTA rule 2026-10-03). CTA shown `qsme.co.nz`, spoken "Queue Ess Mee dot Co dot N Z" (owner 2026-10-08: never C-O).
