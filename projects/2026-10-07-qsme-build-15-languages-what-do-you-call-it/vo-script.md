# VO script: Kiwi performance

**Character:** The QS: a mid-career quantity surveyor (late 30s to 40s) with a general, urban, professional New Zealand accent (Auckland or Wellington office). Not broad, not rural, not Australian. Calm, dry and deadpan, amused rather than impressed. He has sat in a lot of international tender threads and has opinions about prelims. He is reading the screen to a mate, not presenting it. This is an AI voice, so it never speaks as the founder and never says "we built". The only "we" is the self-own on the German word, which is the studio's joke about itself, not a product claim.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Voice:** the QS pick from `projects/2026-10-02-qsme-voice-casting` (shortlist: Arnold `bISW1PJRBPT7aRbtPJlB` or James `QlZn2MPaf2jDn0461bnj`). Use the same voice as "Six bids. Six formats." so qsme.build has one recurring narrator.

**Video:** `outputs/15-languages-what-do-you-call-it-16x9.mp4` (63.6 s, 1920×1080, 30 fps, review cut of 2 Oct). Every time below is in seconds on this file.

**Which cut this targets:** the 16:9 master, which is the only cut so far. There is no 9:16 or 1:1 version yet. If one is made (post.md suggests a 1:1 LinkedIn cut and an ~18 s Short), add `vo-script-9x16.json` (or `-1x1`) only if its timeline differs from this one.

**Casting line:** "Same document, five names. And every one of them wants to know if prelims are included. Q-S-me dot build."

**Pronunciation:**
- QSME is written **Q-S-me** (said "Cue Ess Me"). qsme.build is **Q-S-me dot build**. Never "kiss me", never four spelled letters.
- **B-O-Q**: three letters, said quickly (bee-oh-cue).
- **Prelims**: "PREE-lims".
- **Leistungs…**: a fair, honest attempt at "LYE-shtoongs", then he stops. It's a real try that runs out of road, not a funny voice. The joke is on him and never on German. Reject any take that sounds like it's mocking the accent.
- He never tries to say any of the other foreign words, and "Persian" is on screen only. They are on screen, and that's the point.

**Pace:** every line fits its Max at about 2.5–2.8 words a second (`python3 tools/vo_status.py` shows this project as ok with no tight lines). Windows were only widened where the video really is silent before the next caption; elsewhere words were cut.

## Lines

| # | Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|---|
| 01 | 0.25s | 1.1s | **Schedule of quantities.** | Schedule of quantities. | English estimating page: "schedule of quantities" boxes up in green (0.06–0.5) with an ENGLISH tag (0.4); the sticky slaps on at 0.16; caption "One tender document." from 0.3; mirror flip to Arabic 1.21–1.30 | Matter-of-fact, almost bored, as if reading a label off a folder. Falling end. Out by 1.35; the tail can ride the 1.30 flip whoosh. |
| — | 1.35–6.35 | — | *(no VO)* | | Switcher clicks: العربية (1.03), 简体中文 (2.43), Deutsch (3.64), Türkçe (4.97); each H1 boxes its own word with a language tag | Leave it to the clicks and the flips. Silence makes the sound-off version and the sound-on version play the same. |
| 02 | 6.35s | 1.5s | **Same document. Five names.** | Same document. Five names. | "Same document." (6.35) · "Five names." (6.75) · five word chips (6.95) · "What do you call it?" slams underneath at 7.4 (everything holds to the cut at 9.6) | Dry, unhurried, a real full stop between the two. A small downstep on "Five names", like counting something mildly annoying. It may run past the 7.4 slam because its words stay on screen. Out by 7.85. |
| 03 | 7.9s | 1.8s | **What do you call it?** | [beat] What do you call it? | "What do you call it?" (slammed at 7.4, holds to 9.6) | A genuine question to the viewer, light lift at the end. The only rising line in the hook. Out by 9.7. |
| 04 | 9.8s | 1.85s | **One job. One email thread.** | One job. One email thread. | Chip "01 · One job, one thread" and the email card with the first message, on at 9.7; replies pop at 10.65 and 11.65 | Weary, knowing. "Email thread" as if it's a medical condition. It can sit over the first reply pops. Out by 11.65. |
| — | 11.65–14.7 | — | *(no VO)* | | Replies pop at 12.65 and 13.65 and the card grows; every one ends in a yellow "Prelims included?" | Let the pops and the yellow highlights do it. |
| 05 | 14.7s | 2.5s | **Five names for it. And one question.** | Five names for it. [pause] And one question. | "Five names." (14.7) · "One question." slams yellow at 15.7 and the sticky wiggles; quote card cuts in at 17.18 | Flat on "Five names for it", then a tiny pause and a drier "And one question", landing near the yellow slam. Out by 17.2. |
| 06 | 17.4s | 2.3s | **Construction is the same everywhere.** | Construction is the same everywhere. | Quote line 1 on screen at 17.3; line 2 types in from 18.3 (on screen only) | Reading the site's own words, so it's verbatim: say "Construction is", not "Construction's". Calm and even. Out by 19.7, before line 3 lands at 20.0. |
| 07 | 20.05s | 2.7s | **And vocabulary is where trust starts.** | And vocabulary is where trust starts. | Quote line 3 (words in 20.0–20.3); lines 1–2 dim; attribution at 20.45; card holds to 23.0 | A notch slower and quieter, the line that matters. No tagline lift. Out by 22.75. The middle sentence ("What changes from country to country is the vocabulary") stays on screen only. |
| 08 | 23.45s | 0.8s | **Leistungs…** | Leistungs— | German page (23.1): "Leistungsverzeichnis" boxed + GERMAN tag; caption types "Leistungs…" (23.45–23.85) | A brave start that runs out of road after "Leistungs". Trail off and stop dead. Cut from the same take as line 09. Out by 24.25. |
| 09 | 24.3s | 2.7s | **…we'll let a German say that one.** | [exhales] …we'll let a German say that one. | Caption types "we'll let a German say that one." (24.25–24.7); the full line holds to 27.4 | A small exhale, then an easy, self-amused shrug. Warm, not sarcastic. Out by 27.0, before the caption fades. |
| 10 | 27.7s | 3.0s | **Every page uses its own word for it.** | Every page uses its own word for it. | Montage hard cuts: Chinese (27.6), Japanese (28.6), Korean (29.5), Russian (30.3) | Plain observation, light lean on "own". Falling end. Out by 30.7. |
| — | 30.7–33.7 | — | *(no VO)* | | The accelerating cuts: French (31.0), Portuguese (31.7), Vietnamese (32.3), Indonesian (32.9), Hindi (33.5) | Ticks only. |
| 11 | 33.7s | 1.5s | **Hindi just says B-O-Q.** | Hindi just says B-O-Q. | Hindi page: "BOQ" boxed + HINDI tag; caption "The Hindi page just says BOQ." (33.7) | Mild, pleased surprise. Quick letters, falling end. Out by 35.2, before the 35.25 slam. (Cut from "The Hindi page just says…": the full sentence is on screen.) |
| 12 | 35.3s | 1.15s | **Some words travel.** | Some words travel. | Green caption "Some words travel." slams at 35.25; both captions fade 36.35–36.55 | Warm and short, almost a smile. Out by 36.45. |
| 13 | 36.6s | 2.2s | **Fifteen words. One document.** | Fifteen words. One document. | Word wall: "Fifteen words." (36.5) · 15 chips (36.75–37.8) · "One document." (37.15); holds to 40.0 | Even, satisfied. Full stop between. Out by 38.8, then let the wall sit. |
| 14 | 40.05s | 1.8s | **Arabic reads right to left.** | Arabic reads right to left. | Chip "04 · Right to left", headline "Arabic and Persian read right to left." and the English page on screen at 40.0; the Arabic page flips in beside it (40.28) | Informative, unhurried. "Persian" stays on screen only (the tile flips to Persian at 43.0); the full headline didn't fit before the 41.9 slam. Out by 41.85. |
| 15 | 41.95s | 1.5s | **So does the site.** | So does the site. | "So does the site." slams green at 41.9; the right tile flips Arabic → Persian at 43.0 | A small, quiet pride, nothing more. Out by 43.45 (a natural read ends about 42.8, clear of the flip whoosh). |
| 16 | 44.4s | 1.7s | **The sticky note doesn't.** | [beat] The sticky note doesn't. | Kalam note "The sticky note doesn't." (44.3); the sticky wiggles (44.35–44.92) | Bone-dry aside, slightly lower. Out by 46.1. |
| 17 | 47.1s | 1.95s | **The website speaks fifteen languages.** | The website speaks fifteen languages. | Chip "05 · The honest bit", "The website speaks 15 languages." and the 15 switcher chips on screen at 47.0 | Straight, honest, no sell. Out by 49.05. (The chip carries "honest bit"; it is not voiced.) |
| 18 | 49.15s | 2.25s | **The app? English, Spanish and Arabic.** | The app? English, Spanish and Arabic. | "The app speaks English, Spanish and Arabic." (49.1); 12 chips dim, English · Español · العربية light up (49.2–49.5); legend "In the app today" (49.4) | Same honesty. "The app?" as a small shrug, then a plain list. No apology in the voice. Out by 51.4. |
| 19 | 51.5s | 1.0s | **So far.** | So far. | "So far." slams green (51.4); card holds to 54.5 | Two words, deadpan, the smallest smile, a beat after the slam. Out by 52.5. |
| 20 | 54.5s | 2.9s | **What do you call it where you work?** | [beat] What do you call it where you work? | End card: chip "06 · Your word", "What do you call it" (54.48) · "where you work?" (54.95) · "Tell us in the comments." (55.6) · "qsme.build now speaks 15 languages" (56.2) · "Yours next — tell us" (56.6) | The callback to line 03. A real question, asked like you want the answer. Out by 57.4. |
| 21 | 57.45s | 2.35s | **Oh, and… prelims. In or out?** | Oh, and… [beat] prelims. In or out? | Kalam line "Bonus points if you can settle the prelims question." (57.3); the sticky wiggles (57.35–57.78); logo (58.3); CTA pill (58.65) | Throwaway, mischievous, quieter. The pause before "prelims" is the joke. Out by 59.8. |
| 22 | 59.9s | 3.25s | **Book a thirty-minute demo at Q-S-me dot build.** | Book a thirty-minute demo at Q-S-me dot build. | QSME logo, "qsme.build" and "Tendering and estimating software for construction organisations" (58.3) · CTA pill "Book a 30-minute demo at qsme.build →" (58.65); holds to 63.6 | Friendly and low-key, with no announcer lift. A clear "thirty-minute", a small break, then a clear "Q-S-me dot build" (kyoo-ess-mee dot build). Out by 63.15, leaving the last half-second to the card. |

## One continuous read (for the most natural take; slice in the edit)

```
Schedule of quantities.

Same document. Five names.
What do you call it?

One job. One email thread.

Five names for it. And one question.

Construction is the same everywhere.
And vocabulary is where trust starts.

Leistungs... we'll let a German say that one.

Every page uses its own word for it.

Hindi just says B-O-Q. Some words travel.

Fifteen words. One document.

Arabic reads right to left. So does the site.
The sticky note doesn't.

The website speaks fifteen languages.
The app? English, Spanish and Arabic.
So far.

What do you call it where you work?
Oh, and... prelims. In or out?
Book a thirty-minute demo at Q-S-me dot build.
```

## Make it sound recorded, not synthesised

- Time base: all times are seconds on `outputs/15-languages-what-do-you-call-it-16x9.mp4`. There is no offset; the master is the post.
- Generation (v2 is the default): render the continuous read three times on the chosen voice, slice it, and place the slices at the start times above. That gives one consistent performance across the 63.6 seconds. Use per-line renders only as patches, with `previous_text` and `next_text` set to the neighbouring lines. Lines 08 and 09 must come from the same take, because the break-off only works if it is one breath. Use a fixed seed per take and log it. Make 3 takes and pick by ear.
- Eleven v3 is a fallback only, as ONE continuous request with the casting line as a throwaway warm-up and the tags in the v3 column. Never generate v3 line by line.
- Trim leading and trailing digital silence from every slice. Never time-stretch more than about 4%. If a take runs past its Max, use another take.
- Room tone: one unbroken bed of quiet office or lounge air (fridge hum, a faint car outside) from 0.3 s to 63.6 s at about -48 to -45 dBFS. The long silent stretches (1.35–6.35, 11.65–14.7, the montage tail 30.7–33.7) are where an AI read gives itself away if the floor drops to digital zero.
- EQ like a decent phone voice memo: high-pass at about 90 Hz, -2 to -3 dB high shelf from 10 kHz, a 1–2 dB dip at 6–8 kHz with a light de-esser. Compression 2:1 to 3:1, 2–4 dB of gain reduction. No reverb.
- Keep a quiet natural inhale before lines that follow a long silence (02, 05, 08, 11, 14, 17, 20), pulled down 6–10 dB.
- Mix: VO mono, centred, 48 kHz. Master about -14 LUFS integrated, true peak -1 dBTP. Music 6–8 LU under the VO. The UI clicks (0.64, 1.03, 1.97, 2.43, 3.22, 3.64, 4.32, 4.97) and the mirror whooshes (1.30, 2.62, 40.28, 43.0) sit in front of the music.
- LinkedIn autoplays muted and YouTube often plays with sound. Every line above is already on screen as text (or a shorter spoken version of it), so the VO adds personality, not information. If a take fights the on-screen timing, cut the line rather than move the text.

## Generate (after the ElevenLabs upgrade)

```bash
python3 tools/make_vo.py projects/2026-10-07-qsme-build-15-languages-what-do-you-call-it <qs_voice_id> --takes 3
```

`vo-script.json` is the machine-readable twin of this file (same ids, times and text).

## Changelog

- 2026-10-02 first version, timed on the 78.0 s render.
- 2026-10-02 v2: retimed on the 63.6 s review cut.
- 2026-10-02 v3: fit pass against the 63.6 s master (frames pulled at every caption change). Windows widened only into real silence (03, 04, 05, 06, 07, 09, 10, 13, 15, 16, 20); words cut where the next caption was close (11, 14, 18, 20 drops "So.", 21, 22). v3 text now matches v2 word for word.
- 2026-10-03 v4: owner CTA rule (Global CTA is "Book a 30-minute demo at qsme.build"; no pricing lines of any kind). Line 22 is now "Book a thirty-minute demo at Q-S-me dot build." (8 words in 3.25 s), matching the new end-card pill. Same start and window; no other line changed (none mentioned pricing). `tools/vo_status.py` ok.
