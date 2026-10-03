# VO script: Kiwi trailer read

**Character:** The QS, the same mid-career Kiwi quantity surveyor who narrates "Six bids. Six formats." and "Column H", so the series sounds like one person. He has a general urban professional New Zealand accent (an Auckland or Wellington office): not broad, not Australian, never American. On the trailer cards he does his best movie-trailer voice. It's low, slow (about 2 words a second), gravelly and completely committed, and every line falls at the end. That's a parody of the read, not an announcer: no lift, no hype, no exclamation marks, and the Kiwi vowels never leave. On the product lines he drops the act and is just himself again: dry, matter-of-fact, quietly pleased, normal pace. The gap between the two registers is part of the joke. It's an AI voice, so it never speaks as the founder or as a customer.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on. Fallback for the trailer register only: Eleven v3, one continuous request.

**Voice:** use whichever QS voice wins casting in `projects/2026-10-02-qsme-voice-casting` (shortlist ⭐ Arnold `bISW1PJRBPT7aRbtPJlB`, ⭐ James `QlZn2MPaf2jDn0461bnj`). It's the same voice as Six bids and Column H. Test the casting line in both registers before committing: the voice has to go low and slow without turning American.

**Video:** `outputs/trailer-parody-4x5.mp4` (LinkedIn) and `outputs/trailer-parody-9x16.mp4` (YouTube Shorts), both 34.4s on **one timeline**: the same clips go at the same times on both. Times below are seconds on those files. `vo-script.json` is the machine-readable twin for `tools/make_vo.py`.

**Casting line:** "In a world… seventy-one three. Nobody retyped it. Now showing… Q-S-me dot build."

## Timing contract (v2)

- Trailer lines are sized for about **2.1 spoken words/s**, plain lines for about **2.5** ('seventy-one' counts as 2 words, Q-S-me as 3). Each line's `max_s` is at least its words ÷ pace.
- **No overlaps:** every line is out at least 0.15s before the next one starts.
- Don't speed a take up to make it fit (make_vo.py retries up to 1.15x on v2; that kills a trailer read). If a take overruns `max_s`, use another take.
- `vo-script.json` carries `register`, `pace_wps` and `spoken_words` on every line so a checker can test this before any credits are spent.

## Lines

| Start | Max | Register | Words | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|---|---|
| 0.10s | 2.90s | trailer voice | 6 | **In a world… seventy-one three.** | [slowly] In a world… seventy-one three. | IN A WORLD… (frame 1) / WHERE THE BID SAID (0.32) / 71,300 slams in (0.74) · chip 'BID F · THE WHITEBOARD' (1.25) · dawn frame b-roll in letterbox bars | The full trailer read, played straight: low, slow, gravelly. 'In a world…' then a real pause (the 71,300 slam and its braam land in it, at 0.74), then 'seventy-one three' like a revelation, falling. The card carries 'where the bid said'. 'Seventy-one three' is how a QS says 71,300 out loud. Kiwi vowels stay put: 'world' is not American. No lift, no smile. Out by 3.0. |
| 3.25s | 2.90s | trailer voice | 6 | **The contract said… seventy-three one.** | The contract said… [pause] seventy-three one. | …AND THE / CONTRACT SAID (3.2–3.56) · the 1 and the 3 swap places (3.7–4.4) · the figure turns red and is circled (4.4–5.0) · chip 'CONTRACT · CLAUSE 4 · CONTRACT SUM' (4.95) | Same trailer weight, one notch more ominous. 'The contract said…' rides the swap (the digits travel 3.7–4.4); 'seventy-three one' lands after they do, at about 4.9, so the swap is audible. Keep it in exactly the rhythm of 'seventy-one three' in vo01 so the ear catches the swap. Flat and final on 'one'. Out by 6.15. |
| 6.30s | 1.45s | trailer voice | 3 | **From an email…** | From an email… | TYPED FROM / AN EMAIL… (6.25) · the sent email (6.4): 'Recommend we award to Bidder F at 73,100 + tax. Cheers.', 73,100 marked red | First step down a staircase. Trailer gravity, trailing off on the ellipsis: no full stop in the voice. Out by 7.75. |
| 7.90s | 1.00s | trailer voice | 2 | **…a spreadsheet…** | …a spreadsheet… | …FROM A / SPREADSHEET… (7.85) · Plasterboard_comparison_FINAL.xlsx, Bidder F's cell B7 71,300 selected (7.95) | One step lower than vo03a, the same trailing ellipsis. Out by 8.9. |
| 9.25s | 1.00s | trailer voice | 2 | **…a whiteboard.** | …a [pause] whiteboard. | …FROM A PHOTO / OF A WHITEBOARD. (9.2) · the Bid F whiteboard, 'TOTAL 71,300 + TAX' | The laugh, and the lowest step: the tiniest hesitation before 'whiteboard', said with total gravity, as if naming the villain. The card carries 'a photo of'. The ticking clock stops dead on the last syllable, then 0.55s of silence before the slam. Out by 10.25. |
| 10.85s | 1.10s | trailer voice | 2 | **One transposition.** | One transposition. | ONE / TRANSPOSITION. (slams 10.8) · 71,300 → 73,100 (11.2) | Two words, heavy and slow, just after the slam's braam (10.8), not on top of it. Say 'transposition' the plain Kiwi way, no syllable stretched. Out by 11.95. |
| 12.10s | 1.95s | trailer voice | 4 | **Seven months of correspondence.** | Seven months of correspondence. | SEVEN MONTHS OF / CORRESPONDENCE. (12.0) · inbox: 'RE: FW: …' (Month 2), 'RE: RE: FW: …' (Month 4, 12.2), 'RE: RE: RE: FW: Contract sum query' (Month 7, unread, 12.4) · the WITHOUT PREJUDICE letter cuts in at 13.6 | The weariest line in the trailer. Trailer gravity, but you can hear seven months of email in it. 'Correspondence' falls all the way down and may ride 0.45s over the cut to the letter. Then silence: the letter and the red-pen circle (14.05–15.7) play with no voice. Out by 14.05. |
| 15.70s | 4.30s | trailer voice | 9 | **This season… the contract is made from the bid.** | This season… [pause] the contract is made from the bid. | THIS SEASON… (15.6) / THE CONTRACT IS (slams 16.02) / MADE FROM THE BID. (16.1–16.2, holds to 18.35) · the bars open at 18.35 on the Compare bids table | The turn. Still the trailer voice, but the doom lifts: warmer, a hint of resolve, no triumph. A real pause after 'season'. Even weight on 'made from the bid', falling. It runs on as the bars open and the table appears; that's fine. Out by 20.0, before the click (20.1). |
| 21.35s | 2.40s | his own voice | 6 | **The contract says seventy-one three.** | The contract says seventy-one three. | Active Work card (21.05): Contract value 71,300 (ringed green 21.6) · Paid to date 0 · Retention 5% · Milestones 0 / 3 confirmed · caption '…and the contract says 71,300.' (21.35) | He drops the trailer voice completely: his normal dry QS voice, a colleague pointing at a screen. A tiny, satisfied lean on 'seventy-one three' (the callback to the hook). The silence before it (20.0–21.35: the click and the dialog closing) is deliberate. Out by 23.75. |
| 23.90s | 1.20s | his own voice | 3 | **Nobody retyped it.** | Nobody retyped it. | caption 'Nobody retyped it.' (23.85, holds to 24.65) · the Schedule card arrives at 24.65 | Deadpan aside, almost under his breath, the driest line in the piece. Falling. It rides 0.45s into the Schedule card; that's fine. Get the smile by choosing takes, never with a tag. Out by 25.1. |
| 25.25s | 1.60s | his own voice | 4 | **Same task. Same figure.** | Same task. Same figure. | Schedule (24.65): the Plasterboard & ceilings row flips from '— · ~74,000' to 'Bidder F · 71,300' (25.1) · caption 'Same task on the programme. Same figure.' (25.25) · bar detail '3–18 Nov · 12 days · Bidder F · 71,300 · not paid yet / On a contract · Bidder F' (25.4) | Two short, even beats, plain and matter-of-fact. No sell. Then silence while the bar detail is read and the bars close (26.85–27.8). Out by 26.85. |
| 27.80s | 2.40s | trailer voice | 5 | **Contains scenes of mild reconciliation.** | Contains scenes of mild reconciliation. | Rating card (fades in from the cut under the closing bars, 27.55–27.7): RATED T / for Tender / Contains scenes of mild reconciliation. (holds to 30.65) | Back into the trailer voice, now as the rating card's small print: flatter, legal gravity, still slow. 'Mild reconciliation' gets the faintest weight. Out by 30.2. |
| 30.80s | 3.35s | trailer voice | 7 | **Now showing… Q-S-me dot build.** | Now showing… [pause] Q-S-me dot build. | NOW SHOWING AT (30.65) / QSME logo (30.9) / qsme.build (31.2) / pill 'Book a 30-minute demo' (31.6) · end card held to 34.4 | Last trailer line, slow and grand: a beat after 'showing' while the logo lands, then 'Q-S-me dot build' evenly, 'cue ess mee', no rise on 'build'. Regenerate any take that says 'kiss me' or spells out four letters. Out by 34.15; the card holds 0.25s after it. |

**Silent on purpose:** 14.05 to 15.7: the WITHOUT PREJUDICE letter, then the red-pen circle round the scrawl '71,300?? 73,100??' over the b-roll (low pulses, a marker squeak) · 20.0 to 21.35: the 'Award bid' click (20.1) and the dialog closing: click SFX only · 26.85 to 27.8: the Schedule bar detail holds, the bars close and the rating card fades in (a short low sting).

**Cut in v2 (kept here for a longer re-cut):** `vo06-prejudice` "Without prejudice." (12.30–13.40 on the 32.6s cut): Cut in v2. At the 2.1 words/s trailer pace 'Seven months of correspondence.' needs 1.9s and runs to 14.0, past the cut to the letter, so the old window overlapped it. Holding it until vo05 is out pushes the cut past 34.5s. The WITHOUT PREJUDICE letter reads itself in the silence. If the cut ever gets longer, it goes back at 14.15 for 1.0s (and the letter beat grows to 1.6s). `vo13-demo` "Book a thirty-minute demo." (31.15–32.50 on the 32.6s cut): Cut in v2. A 2.1 words/s 'Now showing… Q-S-me dot build.' needs 3.35s of the end card, and there's no room for a second line inside 34.5s. The pill 'Book a 30-minute demo' holds 2.8s on screen and the caption and first comment carry the link.

**Why "seventy-one three":** it's how a QS says 71,300 out loud, and it lets the swap be heard: "seventy-one three" in the hook, "seventy-three one" in the contract, then "seventy-one three" again on the real contract. Keep the three readings identical in rhythm so the ear catches it.

## Continuous reads (two registers; slice in the edit)

Trailer voice:

```
In a world… seventy-one three.

The contract said… seventy-three one.

From an email…

…a spreadsheet…

…a whiteboard.

One transposition.

Seven months of correspondence.

This season… the contract is made from the bid.

Contains scenes of mild reconciliation.

Now showing… Q-S-me dot build.
```

His own voice:

```
The contract says seventy-one three.

Nobody retyped it.

Same task. Same figure.
```

That's 59 spoken words and 352 characters across 13 lines. The longest window is the turn (vo07): 9 words in 4.3s.

## Make it sound recorded, not synthesised

- Two registers, one voice: render the trailer lines (vo01–vo07, vo11, vo12) and the plain lines (vo08–vo10) as two separate continuous reads, so the trailer register never bleeds into the product lines. Slice each and place every piece at its start_s. Use per-line renders only as patches, on v2 with previous_text/next_text set to the neighbouring line of the same register.
- Pace: the windows are sized for the read the direction asks for (trailer about 2.1 spoken words/s, plain about 2.5; 'seventy-one' counts as 2 words, Q-S-me as 3) and no two windows overlap. Don't speed a take up to fit (tools/make_vo.py's automatic retry up to 1.15x kills a trailer read): if a take runs past max_s, use another take.
- Trailer register: if the base QS voice won't go low and slow enough on v2, use Eleven v3 for those lines only (one continuous request, max 1–2 tags per line, check the current tag list) rather than pitch-shifting. Never pitch-shift more than 1 semitone or time-stretch more than about 4%.
- Room tone bed (60s of a real quiet office on a phone) under the whole 34.4s at about -50 dBFS so silences never drop to digital zero.
- EQ: high-pass 80 Hz for trailer lines (keep the chest), 90 to 100 Hz for plain lines; -2 dB high shelf above 10 kHz; light de-ess. Compression 2:1 to 3:1, 3 to 4 dB GR. VO about -16 LUFS integrated, -1 dBTP. A short, dark plate reverb (0.8s, 8% wet) on the trailer lines ONLY, so the act sounds like a cinema and the product lines sound like a person in a room. No reverb on vo08–vo10.
- Music and SFX are separate tracks (see post.md, Music): trailer braams on 0.74 (number slam), 4.4 (digits land), 10.8 (ONE TRANSPOSITION) and 16.02 (the turn); a ticking-clock bed 6.25 to 10.25 that stops dead on 'whiteboard'; dead stop at 18.35 when the bars open; one UI click at 20.1; a soft confirm at 21.05; a short low sting as the rating card lands (27.6); a final braam into the end-card logo at 30.9, ringing out to 34.4. Duck everything 10 to 12 dB under any word.
- Bounce a mono VO stem and mux it with tools/mux as its own track onto BOTH cuts: outputs/trailer-parody-4x5.mp4 (LinkedIn) and outputs/trailer-parody-9x16.mp4 (YouTube Shorts) share one timeline, so the same clips go at the same times.
- **Kiwi, not cinema-American:** the trailer read is where AI voices drift American. Reject any take with an American R in 'world', 'correspondence' or 'transposition'. KIT vowel in 'build'; DRESS in 'seven', 'months' is fine.
- **Timing:** start each line 0 to 4 frames after its start_s, varying it by a frame so the sync doesn't look quantised. vo02's number must land after the digits do (4.4), never before.
- **Mux:** `python3 tools/make_vo.py projects/2026-10-13-qsme-build-trailer-parody <voice_id>` after the ElevenLabs upgrade (it lays the VO on the 4:5), then the same clips onto the 9:16: `tools/mux outputs/trailer-parody-9x16.mp4 outputs/trailer-parody-9x16-with-vo.mp4 vo01.mp3@0.1 …` (every line at its start_s).
- **Disclosure:** if the VO is ElevenLabs, set LinkedIn's and YouTube's AI-content labels where they apply. A consenting real Kiwi QS, or the founder's own cloned voice, needs no label.
