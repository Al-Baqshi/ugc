# Column H — voice script (G03, audio-first remake 2026-10-06)

**Video:** `outputs/column-h-4x5.mp4` (43.2 s, silent master) · **voiced:** `outputs/column-h-4x5-with-vo.mp4` · **take:** `outputs/vo-take-cam-v3/take.mp3` (Cam S, eleven_v3, stability 0.5, ONE unbroken request, 41.68 s, 2.42 words/s, longest gap 1.0 s, laid at 0.0 s, gain 1.15, no bed).

**Character:** The QS: a dry, deadpan Kiwi quantity surveyor telling the column H story on himself (Cam S, ElevenLabs voice 53CG2aO2HU48thT3QnMl). General NZ accent, never a caricature, no announcer lift, no exclamation marks. The self-own is his: he hit send; the bidders did nothing wrong and he says so. Continuous speech: the narration never stops for more than 1 s. This is an AI voice, so it never speaks as the founder.

**STT check:** tools/el.py stt: every word heard; QSME heard as 'QS Me' (tender line) and 'qsme.build' (CTA); 'four-forty' heard as 'four forty', '1–2%' as '2%' (homophones)

## The script as spoken (the exact text sent to ElevenLabs; v3 tags in brackets)

```
Six joinery bids, all one to two percent under our estimate. Weird. [dry] What a well-informed market.
So we open the sheet we sent them: F, G, I. Where's H? Right-click, unhide, and there's column H, our estimate. Hidden, not deleted.
They did nothing wrong. We hit send, Friday four-forty, have a good weekend.
[confident] In a Queue Ess Mee tender, bidders get your lines and quantities, and they price them. Never your rates, never your budget. The security page says it: stripped out server-side, not hidden in the interface. [amused] Nothing to unhide.
Book a thirty-minute demo at Queue Ess Mee dot build.
```

## Timing (from `outputs/vo-take-cam-v3/alignment.json`)

| Said (start) | Line | Picture / caption on screen |
|---|---|---|
| 0.00 | Six joinery bids, all one to two percent under our estimate. | Hook 0–5.25: 'Six joinery bids.' / 'All 1–2% under our estimate.' + chip 'Joinery package · bids closed' + tag 'example figures' on frame 1; the six totals land 0.75 / 1.01 / 1.27 / 1.53 / 1.79 / 2.05 under 'bids, all one to two percent'; the estimate row lights green on 'our estimate' (2.9) |
| 3.60 | Weird. [dry] | '(Weird.)' pops at 3.6 on the word; the hook holds to 5.13, fades to the sheet 5.25 |
| 5.48 | [dry] What a well-informed market. | Sheet 'Joinery_BoQ_FOR_PRICING.xlsx' + chip 'The BoQ we sent them'; caption 'What a well-informed market.' pops on 'What' (5.45) and leaves at 9.3 |
| 7.15 | So we open the sheet we sent them: F, G, I. Where's H? Right-click, unhide, | Camera pushes to the column letters F | G | I on 'open the sheet we sent them' (8.0–8.9); cursor to G on 'G' (10.1), drag to I on 'I' (10.65–11.05); red 'H?' arrow on 'Where's' (11.45) and 'H?' (12.0); right-click on 'Right-click' (12.6, generic menu), hover walks to Unhide, click on 'unhide' (14.05), column H slides open 14.1–14.75 |
| 14.66 | and there's column H, our estimate. Hidden, not deleted. | Caption 'Column H. Hidden. / Not deleted.' pops on 'column H' (15.25); column H header 'OUR ESTIMATE (DO NOT SEND)' in red, every line priced; the red ring draws around 486,200 on 'our estimate' (16.05–16.5); hard cut to the email at 18.55 |
| 18.62 | They did nothing wrong. | Hard cut 18.55 to the sent email (chip 'Two weeks earlier · Friday 4:40 pm', Bcc 6 recipients, Joinery_BoQ_FOR_PRICING.xlsx); caption 'They did nothing wrong.' pops on 'They' (18.62) |
| 20.24 | We hit send, Friday four-forty, have a good weekend. | Caption 'We hit send.' (green) pops on 'We' (20.24); the push-in on 'Have a good weekend.' plays as it is said (22.8–23.1) and holds to the cut at 24.4 |
| 24.55 | [confident] In a Queue Ess Mee tender, | Hard cut 24.4 to the product beat: QSME logo + chip 'Tendering & estimating software'; 'In a QSME tender:' pops 24.45 over the qsme.build bid-form mock-up (labelled 'Illustrative · qsme.build mock-up') |
| 26.20 | bidders get your lines | Caption 'Bidders get your lines.' + green outline on the LINE column, both on 'bidders' (26.2) |
| 27.22 | and quantities, | Caption 'Your quantities.' + outline on the QTY column on 'quantities' (27.3) |
| 28.02 | and they price them. | Caption 'They price them.' (green) + outline on the YOUR RATE column on 'they price' (28.1); tag '↑ the bidder's own' under the rate column at 28.6 |
| 29.01 | Never your rates, never your budget. | Hard cut to a clean background on 'Never' (29.0): 'Never your rates. / Never your budget.' slams in, no mock-up and no rates behind it; holds to the cut at 31.75 |
| 31.76 | The security page says it: stripped out server-side, not hidden in the interface. | Hard cut 31.75 to the live qsme.build/security page (chip 'qsme.build/security · live page, 2 Oct 2026'), already scrolled to just above 'Bidder visibility rules'; settles 31.75–32.3, spotlight 32.25; the green highlighter covers 'Rates, amounts and the tender budget are stripped out' on 'says it: stripped out' (32.8–33.9) and sweeps 'server-side, not hidden in the interface.' word for word with the voice (33.95–36.3); caption 'Stripped. Not hidden.' pops on 'stripped' (33.5) and leaves 36.9 |
| 37.08 | [amused] Nothing to unhide. | In the beat before the line the cursor right-clicks just after 'interface.' (36.75) and the generic menu opens below the highlight with 'Unhide columns' greyed out; caption 'Nothing to unhide.' pops on 'Nothing' (37.05); hard cut to the end card 38.15 |
| 38.19 | Book a thirty-minute demo at Queue Ess Mee dot build. | End card: QSME logo (38.15), 'Private tenders, / by invitation.' (38.2, on screen, not voiced), pill 'Book a 30-minute demo' pops on 'Book' (38.25), 'qsme.build' pops on 'Queue Ess Mee dot build' (40.0) and holds to 43.2 |

## Delivery notes

- **vo00-hook** (0.00 s): The stinging number read flat, like a fact that shouldn't be a fact. Out by 3.44.
- **vo01-weird** (3.60 s): One word, almost to himself. Then the [dry] beat (the only ~1 s pause in the take) sets up the punchline.
- **vo02-market** (5.48 s): Admiring on the surface, one notch too sincere, aimed at the situation. Out by 6.88.
- **vo03-sheet** (7.15 s): Narrating what the cursor does, a QS reading the letters off the screen; 'Where's H?' genuinely puzzled for half a second. No caption: the sheet is the picture. Out by 14.56.
- **vo04-colh** (14.66 s): The realisation, not a punchline. 'Hidden, not deleted.' lands quietly, each word a touch lower. Out by 18.48.
- **vo05-wrong** (18.62 s): Fair and flat, clearing the bidders. Out by 20.0.
- **vo06-send** (20.24 s): The self-own, owned plainly; 'have a good weekend' read exactly as the email says it, the smallest wince. Out by 23.76.
- **vo07-tender** (24.55 s): The pivot: calm, plain, a colleague explaining how it works. QSME as 'cue ess mee', evenly. Out by 26.16.
- **vo08-lines** (26.20 s): Matter-of-fact. The outline steps with the words.
- **vo09-qty** (27.22 s): Same even register.
- **vo10-price** (28.02 s): A touch lighter, almost obvious. 'They' is the bidders. Out by 28.88.
- **vo11-never** (29.01 s): The one firm line. Even stress on both 'never's, no announcer lift, falling on 'budget'. Out by 31.68.
- **vo12-proof** (31.76 s): Reading the page's own sentence, plainly; a light lean on 'stripped' and 'not hidden'. Out by 36.32.
- **vo13-none** (37.08 s): Barely there, the tiniest smile, falling. Out by 38.08.
- **vo14-cta** (38.19 s): The ask, said once, like telling a colleague where to book it. 'thirty-minute' as one easy word, no rise on 'build'. Out by 41.68.

## Post-processing

- The whole take is ONE clip at 0.0 s, gain 1.15, muxed onto outputs/column-h-4x5.mp4 with tools/mux → outputs/column-h-4x5-with-vo.mp4. No music bed, no SFX, no slicing, no time-stretch (owner standard 2026-10-06: clean continuous voice).
- If the picture is re-cut, re-time the motion page to the words in outputs/vo-take-cam-v3/alignment.json; never cut the audio to the picture.

## Changelog

- 2026-10-02 first version, timed on the rendered 28.0s 4:5 MP4 (outputs/column-h-4x5.mp4). No API was called.
- 2026-10-02 v3 fit pass: every line at 2.8 words/s or slower; three captions voiced shorter.
- 2026-10-03 owner CTA rule: VO 09 says 'Book a thirty-minute demo at Q-S-me dot build.'
- 2026-10-06 AUDIO-FIRST REMAKE (owner standard from the N01 pilot): continuous script with the hook first, ONE unbroken Cam S eleven_v3 take (41.68 s, 2.42 w/s, longest gap 1.0 s), the picture re-timed to the words (page 43.2 s), captions lifted from the narration, no bed. The 2026-10-02/03 per-line plan above is superseded; its caption text is unchanged on screen.
