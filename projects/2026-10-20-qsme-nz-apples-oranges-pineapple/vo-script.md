# VO script: Kiwi performance, two voices

**Characters:** A couple at the kitchen bench on a Sunday night in Hamilton.
- **Mel** (white captions): everyday Kiwi woman, late 30s, the same Mel as 'Which Dave?'. Dry, under-played, a little pleased with herself. She reads the screen out loud the way you'd explain it to your partner. She never sells and never says what QSME "did for her" (no testimonial).
- **Him** (green bubbles): her partner, a relaxed Kiwi bloke, low, flat and bone-dry. He asked the question and he'd have picked the wrong quote. The joke is on the GST formats and a bit on him, never on the tradies.

General NZ accents, natural and unhurried, never broad, never Australian. No announcer lift and no exclamation marks. Both are AI voices of fictional people, never presented as real customers.

**Voices:** Mel = `tools/voices.json` qsme-nz `voice_id` (Jenna). Him = qsme-nz `alt_voice_id` (Kiwi Mikey). Swap after casting (projects/2026-10-02-qsme-voice-casting).

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Video:** `outputs/which-ones-cheapest-9x16.mp4` (31.6 s, silent master). `outputs/which-ones-cheapest-4x5.mp4` runs on the same clock, so one stem fits both.

**Casting line:** "Three quotes for one bathroom, and every one of them wrote GST differently. Course they did."

**Silent cut:** the MP4s ship silent. Every line is already on screen (captions, bubbles, end card), so the video works with the sound off.

**Pronunciation:** QSME = "Q-S-me" (kyoo-ess-mee), never "kiss me". "Ex GST" = eks jee-ess-tee. "$7,400" = "seventy-four hundred".

## Lines

| Start | Max | Who | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|---|
| 0.15s | 1.6s | Him | **So which one's cheapest?** | So which one's cheapest? | Frame 1: '3 quotes. Same bathroom.' and the green 'Which one's cheapest?' over the three props slapping down | A real, slightly tired question across the bench, not a hook read. Light lean on 'cheapest', falling. Out by 1.75. |
| 1.95s | 0.85s | Mel | **Trick question.** | [dry] Trick question. | '…Trick question.' (1.9) replaces '3 quotes. Same bathroom.' above the green slab · red loop on '7400 + gst mate', '?' | Bone-dry, almost under her breath, a small beat before it. Out by 2.8. |
| 3.42s | 2.0s | Mel | **Depends how you read them.** | Depends how you read them. | 'Depends how you read them.' · the lifts only ask: 'looks cheapest…' (3.42), '…or this one?' (4.62), '…or this?!' (5.76) | Matter-of-fact, a bit amused, watching him work it out. Out by 5.4. |
| 6.62s | 1.7s | Mel | **The emailed one goes in too,** | The emailed one goes in too, | 'The emailed one goes in too.' · 'Add a bid you received': PDF dropped, 'Reading the quote…' (sped up), the draft beside the original (7.9) | Practical, reading the screen as she does it. Leave the end open: the sentence carries on into the next line. Out by 8.32. |
| 8.38s | 1.15s | Mel | **after I've checked it.** | after I've checked it. | 'After I've checked it.' · push in on 'This was read automatically and can be wrong…', then the tick (9.58) and 'Add to the bids' (9.8) | Finishes the sentence after a natural pause, a touch firmer. Out by 9.53, before the tick. |
| 10.3s | 2.6s | Mel | **Bold's what they wrote. Grey's the maths.** | Bold's what they wrote. Grey's the maths. | 'Bold = what they wrote.' then '“calc.” = worked out at 15%.' · green loop on the bold $8,298 (10.75), amber loop on the grey '$7,215.65 calc.' (11.5) | Two short statements with a real beat between them, so 'Grey's the maths' lands near the amber loop. Out by 12.9. |
| 13.38s | 1.4s | Mel | **Ex GST, Steamline's lowest.** | Ex GST, Steamline's lowest. | 'Excl. GST: Steamline's lowest.' · close-up on the toggle, Bidder and Excl. GST; loop on Steamline's 'Lowest' | Quick and casual, a plain report. Out by 14.78 so the toggle click (15.0) is clean. |
| 15.38s | 1.3s | Him | **Hang on. It moved.** | Hang on. [beat] It moved. | Bubble 'Hang on. It moved.' · 'Incl. GST' clicked (15.0), the 'Lowest' tag hops from Steamline to Trev (15.05–15.3) | Thrown but flat: 'Hang on' quick, a tiny beat, 'It moved' lower and slower. No laugh. Out by 16.68. |
| 16.9s | 2.4s | Mel | **With GST? Trev. That's what we pay.** | With GST? Trev. That's what we pay. | 'Incl. GST: Trev's lowest.' then 'We pay incl. GST.' · loop on Trev's 'Lowest' | Patient and dry: small lift on 'With GST?', 'Trev' as a one-word answer, then 'That's what we pay' plain and final. Out by 19.3. |
| 19.8s | 2.4s | Mel | **The seventy-four hundred? Never the cheapest.** | The seventy-four hundred? [beat] Never the cheapest. | '$7,400 + GST = $8,510.' then red 'Never the cheapest.' (20.7) · red loop on '$8,510 calc.' | A small turn to him on the question, then deadpan, landing with the red caption. No gloating. Out by 22.2. |
| 22.55s | 1.3s | Him | **I'd've picked that one.** | I'd've picked that one. | Cut to the bench: the phone, the hook's red loop on '7400 + gst mate', '= $8,510' scribbled beside it · bubble 'I'd have picked that one.' (22.46–24.46) | The self-own: quiet, honest, a bit sheepish, falling away. This is the laugh, so no smile in the voice. Out by 23.85, then silence. |
| 24.62s | 1.7s | Mel | **Open one, see what it covers.** | Open one, see what it covers. | 'Open one: see what it covers.' · Steamline's row clicked (24.86), its card opens, close-up on Item + Line total ending on the ringed Total | Back to practical and unhurried, a light lean on 'covers'. Not a tagline. Out by 26.32. |
| 26.38s | 1.6s | Mel | **Q-S-me doesn't pick the winner.** | Q-S-me doesn't pick the winner. | End card (cut 26.72): 'QSME doesn't pick the winner.' + 'It stops GST picking it for you.' arrive together | Calm, level, a straight fact. A J-cut: it starts a beat before the cut. Out by 27.98. |
| 28.02s | 2.05s | Mel | **It stops GST picking it for you.** | It stops GST picking it for you. | (GST in green) · the real sign-up page (27.4), 'I hire' ringed, logo + 'Sign up at qsme.co.nz' (28.04) | The payoff, said like a tip to a mate: small lean on 'GST', 'for you' falling. No announcer cadence. Out by 30.07. |
| 30.12s | 1.3s | Mel | **Sign up at Q-S-me.** | Sign up at Q-S-me. | 'Sign up at qsme.co.nz' (the button pulses at 30.1) | Friendly and low-key, an aside, not a pitch. The address is on the button; voicing 'Q-S-me dot co dot en zed' would add about 1.4 s to the video. Out by 31.42. |

**Silent on purpose:** 2.8–3.42 (swipe, cup drops) · 5.42–6.62 (the last lift, swipe into the app) · 9.53–10.3 (the tick, the click, the new row's flash) · 14.78–15.38 (toggle click, the 'Lowest' tag hop) · 23.85–24.62 (the laugh, cut back to the app) · 31.42–31.6 (last chord).

**Continuous read (casting and consistency reference):**
> HIM: So which one's cheapest? / MEL: Trick question. / Depends how you read them. / The emailed one goes in too, after I've checked it. / Bold's what they wrote. Grey's the maths. / Ex GST, Steamline's lowest. / HIM: Hang on. It moved. / MEL: With GST? Trev. That's what we pay. / The seventy-four hundred? Never the cheapest. / HIM: I'd've picked that one. / MEL: Open one, see what it covers. / Q-S-me doesn't pick the winner. It stops GST picking it for you. / Sign up at Q-S-me.

## How to voice it (two voices)

`tools/make_vo.py` reads every line in `lines` with one voice, so **don't run `--all` on this project**. Instead:
1. Generate Mel's lines with the qsme-nz `voice_id` and Him's lines (vo01, vo08, vo11) with the `alt_voice_id`. Use one request per line, with `previous_text`/`next_text` set to the neighbouring lines of the same speaker. vo04 and vo05 are one sentence: generate "The emailed one goes in too, after I've checked it." once, then cut it at the comma and place the second half at 8.38.
2. Pick takes by ear and save them as `<line id>.mp3` in one folder.
3. `python3 tools/make_vo.py projects/2026-10-20-qsme-nz-apples-oranges-pineapple --files <folder>` → `outputs/which-ones-cheapest-9x16-with-vo.mp4`. Mux the 4:5 file with `tools/mux` at the same start times.

Never time-stretch more than about 4%. Keep quiet breaths before vo03, vo06 and vo12 (vo13 is a J-cut that starts 0.34 s before the end-card cut). Duck the music 6 dB under each line, and never put an SFX under a word. If AI voices ship, switch on each platform's AI-content label.
