# VO script: Kiwi performance

**Machine version:** `vo-script.json` (master, checked by `python3 tools/vo_status.py`) and `vo-script-9x16-short.json` (the short cut). This file and those two say the same thing; edit both together.

**Character:** Mel: everyday Kiwi woman, late 30s, the straight-talking one in the group chat who actually reads the small print. This time she's talking for Q-S-me, owning up with a half-smile: we started in Auckland, here's exactly what you get everywhere else. General NZ accent, never a caricature. Dry, warm and under-played. She sounds like she's explaining it to a mate over a Saturday coffee, not presenting. Facts come out flat and plain. The two jokes ("They knew." and "We know.") are thrown away, never pushed.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on. Voice from the casting shortlist in `projects/2026-10-02-qsme-voice-casting` (⭐ Jenna `7R9vnLAE0ZSpY0xWp0mv` or ⭐ Ellie `BujbDaM2eT58IpdbIc8J`).

**Which cut this targets:** the master is `outputs/auckland-first-16x9.mp4` (76.35s), and `vo-script.json` points at it. `outputs/auckland-first-9x16.mp4` has the identical timeline, so the same VO track goes on at the same times. The 40.6s short cut `outputs/auckland-first-9x16-short.mp4` has its own timeline (hard cuts at 22.7, 31.36 and 35.31), so it has its own file, `vo-script-9x16-short.json`, which reuses the same takes at new times (see "Short cut" below). All times were read from the motion timeline (`motion/af.js`, `W()`) and checked on frames pulled from the renders on 2 Oct.

**Fit:** every line fits its window at 2.8 words a second or less (`vo_status.py`: ok, nothing tight). Where a window couldn't grow, words were cut (see the changelog at the end).

**Casting line:** "Straight answer for everyone outside Auckland. Yeah. We started in Auckland. We know."

**Pronunciation:** Q-S-me = "Cue Ess Me" (kyoo-ess-mee), never "kiss me", never four letters. qsme.co.nz = "Q-S-me dot co dot en zed". LIM = one word, "lim" (rhymes with "him"). Dunedin = "duh-NEE-din". Christchurch = two quick syllables the way locals say it, "KRAIS-church" (the t disappears), not a careful "Christ-church". Hamilton = "HAM-il-tun". Octagon, Hereford, Anglesea, LINZ and PIM are on screen only; she never says them.

## Lines (master: 16:9 and full 9:16, same times)

| ID | Start | Max (out by) | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|---|
| vo01-hook | 0.3s | 2.9s (3.2) | **Straight answer for everyone outside Auckland.** | same | "Council by council" / "Not in Auckland?" / "Here's exactly what site search shows you." (0.25). Pins and real cards drop at 0.12 / 0.42 / 0.72. Hook fades 4.95–5.4 | Lands just after the first plink. Level and friendly, like answering a question someone just asked her. A slight lean on "Straight", a falling end on "Auckland". No smile-sell. |
| vo02-fair-test | 5.95s | 3.4s (9.35) | **Fair test: we typed in each council's own address.** | same | Caption 5.9–9.45. Typing "50 The Octagon", cut to the result at 8.6 | A tiny pause after "Fair test", then one easy phrase. A light lean on "own", with the faint amusement of someone who knows this will be funny later. |
| vo03-basics | 9.7s | 5.7s (15.4) | **Anywhere in the country: the boundary… land area, legal description and council.** | Anywhere in the country: the boundary… [short pause] land area, legal description and council. | "Every address on the register gets the basics." 9.65–15.55. Parcel pulse 10.95, boxes 12.55 / 13.15 / 13.75 | Like ticking a list. "the boundary" lands with the parcel pulse (about 11.0), then a real beat while the camera drops to the card. "land area" about 12.5, "legal description" about 13.2, "and council" about 13.9: with or just behind each box, never ahead. Even, with no list-sing (the pitch shouldn't climb). |
| vo04-not-yet | 15.85s | 3.4s (19.25) | **Services and hazards? Not here yet. It says so.** | same | "Services and hazards? Not here yet. It says so." 15.75–19.35. Amber underline on the card's own line 16.25 | A plain question, then a flat honest answer. "Not here yet" is neither apologetic nor defensive; "It says so" has a slight nod of approval. Same words as the caption. |
| vo05-they-knew | 19.4s | 3.6s (23.0) | **We told the council it's in Dunedin City. They knew.** | We told the council it's in Dunedin City. [short pause] They knew. | "We told Dunedin City Council it's in Dunedin City. They knew." 19.55–22.8. Punch-in on the boxed "Dunedin City" from 19.95 (frame holds 20.9–21.5). Dunedin card leaves at 23.0 | The joke, and we're the butt of it. "We told the council" matter-of-fact, then "it's in Dunedin City" deadpan, as if passing on news, landing on the boxed field. A real beat. "They knew." is thrown away, quieter and lower, nearly under her breath. One request. Reject any take that laughs or leans on "knew". **Pick a take of 3.25s or less** so it also ends before the short cut's hard cut at 22.7 (14 syllables, so a relaxed read runs about 3.0s). |
| vo06-four-councils | 23.4s | 2.6s (26.0) | **Four councils add the planning zone.** | same | Title "Four councils" (23.2), "They add the planning zone." 23.4–26.95 | Back to matter-of-fact. A light lean on "zone". |
| vo07-christchurch | 27.2s | 2.0s (29.2) | **Christchurch: Commercial Zone.** | same | "Christchurch: Commercial Zone." 27.1–29.9. Box at 27.4 | Reads it off the card. A small gap after "Christchurch". |
| vo08-hamilton | 31.2s | 2.2s (33.4) | **Hamilton: Central City Zone.** | same | "Hamilton: Central City Zone." 30.15–34.05. Result lands 31.2, box 32.55 | Same shape as Christchurch, a touch quicker, so the pair feels like a rhythm. |
| vo09-wellington | 34.35s | 3.0s (37.35) | **Wellington City: the zone too. Hazards? Not yet.** | same | "Wellington City: zone too. Hazards: not yet." 34.2–37.5 | Two quick asides. "Not yet" is flat and plain, never sorry. If the 9 Oct re-check drops Wellington, cut this line and leave room tone. |
| vo10-auckland | 38.15s | 2.5s (40.65) | **And Auckland gets the whole card.** | same | Title "Auckland" (37.9), "Auckland gets the whole card." 38.1–41.55. Result at 40.05 | A little warmer: the reveal. A light lean on "whole", landing about when the card arrives. No brag, it's just a fact. |
| vo11-zone-list | 41.7s | 3.2s (44.9) | **The zone, then pipes, power, flood and hazard checks.** | same | Same words as the caption, 41.7–44.8. Box at 42.25 | Brisk, like listing what's in the boot. One phrase after "The zone,". |
| vo12-back-corner | 45.05s | 2.6s (47.65) | **That's another video: The back corner.** | same | Services and hazards in detail: see "The back corner". 44.95–47.9 | A pointer to a mate: "go watch that one". "The back corner" is said like a title, a touch slower. Never a day or a week. |
| vo13-summary | 48.5s | 6.0s (54.5) | **So. Everywhere: the basics. Three more councils: plus the zone. Auckland: the lot.** | So. [short pause] Everywhere: … (same) | Summary table. Columns tick 49.7 / 51.2 / 52.9, complete 53.45, held to 58.55 | The recap. "So." on its own, then each pair timed to its column: "Everywhere: the basics" by about 49.8, "Three more councils: plus the zone" by about 51.3 and "Auckland: the lot" by about 53.0. "the lot" is a Kiwi shrug: it's simply all of it. Then the table holds in silence (music only). |
| vo14-not-a-lim | 59.35s | 2.6s (61.95) | **Wherever you are, it's not a LIM.** | same | Title "What it's not" (59.0). "Not a substitute for a LIM, PIM or engineering advice." 59.4–61.95 (the card's own footer, boxed) | Serious but kind, a little slower. "LIM" said as a word ("lim"). |
| vo15-checklist | 62.25s | 4.35s (66.6) | **Still order the LIM. Check the title. Ask council or a planner.** | same | Checklist pops 62.25 / 63.2 / 64.15, ticks 62.6 / 63.55 / 64.5. List fades 66.55 | Three steady, practical instructions, each landing with its tick, like advice from a mate who's bought a section before. "Ask council" is the everyday Kiwi way (no "the"). Don't rush the last one. |
| vo16-started | 67.05s | 1.85s (68.9) | **Yeah. We started in Auckland.** | [exhales] Yeah. We started in Auckland. | Map returns 66.8 (Auckland pin glows). "We started in Auckland." pops 67.3 | The self-own. A small out-breath on "Yeah" over the map, then "We started in Auckland" as the words pop: honest, a bit sheepish, with a falling end. The music has just dropped out, so it's nearly a confession. |
| vo17-we-know | 69.0s | 0.8s (69.8) | **We know.** | same | **We know.** slams in at 68.95 | Two words, flat, with a smile you can hear but never see. Short. |
| vo18-card-says-so | 69.85s | 1.15s (71.0) | **Card says so.** | same | The card's own line "…Auckland first, more councils to come." slides in at 69.55. Scene fades 70.95–71.25 | Quiet, almost an afterthought, with a little nod at the card. No promise in the voice, no "soon". |
| vo19-cta | 71.55s | 4.5s (76.05) | **Search your address. Sign up at Q-S-me dot co dot en zed.** | same | "Search your address." 71.5 / "Sign up to see yours." 72.1 / qsme.co.nz 72.5 / "Your account unlocks Site research: full depth in Auckland." 73.1. Holds to 76.35 | A friendly nudge across the bench, not a sales pitch. "Search your address" lands with the title; "Sign up" lands as the green line pops (72.1); say the URL as the pill lands (72.5), clearly and naturally, the Kiwi way ("en zed"), without spelling-bee pauses. No rise at the end. |

**Left silent on purpose:** 3.2–5.95 (hook cards), 23.0–23.4 (a dry beat after "They knew."), 54.5–59.35 (the finished table holds, music only), 66.6–67.05 (the map returns as the music drops out), 76.05–76.35.

## Short cut (9:16, 40.6s): the same takes, new times (`vo-script-9x16-short.json`)

The short cut is four slices of the master timeline: short 0–22.7 = master 0–22.7; 22.7–31.36 = 48.28–56.94; 31.36–35.31 = 67.1–71.05; 35.31–40.6 = 71.05–76.35. No new takes. Master lines vo06–vo12, vo14 and vo15 aren't used.

| ID | Short start | Max (out by) | Line | Take | Note |
|---|---|---|---|---|---|
| svo01-hook | 0.3s | 2.9s (3.2) | Straight answer for everyone outside Auckland. | vo01 | Identical to the master |
| svo02-fair-test | 5.95s | 3.4s (9.35) | Fair test: we typed in each council's own address. | vo02 | Identical |
| svo03-basics | 9.7s | 5.7s (15.4) | Anywhere in the country: the boundary… land area, legal description and council. | vo03 | Identical |
| svo04-not-yet | 15.85s | 3.4s (19.25) | Services and hazards? Not here yet. It says so. | vo04 | Identical |
| svo05-they-knew | 19.4s | 3.25s (22.65) | We told the council it's in Dunedin City. They knew. | vo05 | Hard cut to the table at 22.7, so use a take of 3.25s or less |
| svo13-summary | 22.92s | 6.0s (28.92) | So. Everywhere: the basics. Three more councils: plus the zone. Auckland: the lot. | vo13 | Columns tick 24.12 / 25.62 / 27.32. Table holds to 31.36 |
| svo16-started | 31.38s | 1.8s (33.18) | Yeah. We started in Auckland. | vo16 | Just after the cut to the map at 31.36. Words pop at 31.56 |
| svo17-we-know | 33.25s | 0.8s (34.05) | We know. | vo17 | Slam at 33.21 |
| svo18-card-says-so | 34.1s | 1.15s (35.25) | Card says so. | vo18 | Hard cut to the end card at 35.31 |
| svo19-cta | 35.81s | 4.5s (40.31) | Search your address. Sign up at Q-S-me dot co dot en zed. | vo19 | Title 35.76, "Sign up to see yours." 36.36, pill 36.76. The file ends at 40.6 |

## Male alternative read (A/B, `male_alt_lines` in the JSON: same words and times, IDs end in `_m`)

| Lines | Delivery |
|---|---|
| vo01 | A relaxed everyday Kiwi bloke, low and dry, as if he's been asked this at the pub twice already. Falling end. |
| vo02–vo04 | Plain and a bit pleased with the method, then ticking the list in Mel's rhythm (11.0 / 12.5 / 13.2 / 13.9), then flat and honest. |
| vo05 | Bone-dry, passing on the "news". "They knew." low, almost to himself. A take of 3.25s or less. |
| vo06–vo12 | Matter-of-fact. Councils read off the card, "the whole card" a touch warmer, "The back corner" like a tip. |
| vo13 | A recap with a shrug on "the lot". Hits 49.8 / 51.3 / 53.0. |
| vo14–vo15 | Practical, like advice to a younger brother buying his first section. |
| vo16–vo18 | A sheepish half-laugh in the breath only. "We know." is two flat words. "Card says so." is quiet. |
| vo19 | An easy tip, no rise. |

## One continuous read (for the most natural take; slice in the edit)

```
Straight answer for everyone outside Auckland.

Fair test: we typed in each council's own address.

Anywhere in the country: the boundary… land area, legal description and council.

Services and hazards? Not here yet. It says so.

We told the council it's in Dunedin City. They knew.

Four councils add the planning zone.
Christchurch: Commercial Zone.
Hamilton: Central City Zone.
Wellington City: the zone too. Hazards? Not yet.

And Auckland gets the whole card.
The zone, then pipes, power, flood and hazard checks.
That's another video: The back corner.

So. Everywhere: the basics. Three more councils: plus the zone. Auckland: the lot.

Wherever you are, it's not a LIM.
Still order the LIM. Check the title. Ask council or a planner.

Yeah. We started in Auckland. We know. Card says so.

Search your address. Sign up at Q-S-me dot co dot en zed.
```

About 140 words and 830 characters (one Mel pass; the male alt doubles it).

## Make it sound recorded, not synthesised

- **Time base:** every time in the Lines table is in seconds on `outputs/auckland-first-16x9.mp4`. The full 9:16 file has the identical timeline, so the same clips go on at the same times. The short cut uses its own table above.
- **Generation (v2 is the default):**
  - (a) Generate the continuous read first, as one request, for casting and as the pitch and accent reference.
  - (b) Generate each line as its own request with request stitching: `previous_text` is the line before and `next_text` the line after (`tools/make_vo.py` does this).
  - (c) vo05 ("We told the council… They knew.") is one request. Never butt halves from different takes together.
  - (d) vo16–vo18 ("Yeah. We started in Auckland." / "We know." / "Card says so.") can also be one request, cut in the edit so "We know." starts at 69.0 on the slam (33.25 in the short cut).
  - (e) Use a fixed seed per take, logged, so a picked take can be regenerated exactly. Make 3 takes per request and pick by ear.
  - (f) Use Eleven v3 only as a fallback, as ONE continuous request with the casting line as a throwaway warm-up and "[exhales]" before "Yeah". Slice it; never generate v3 per line. Natural stability preset.
- **Fit to time:** trim the digital silence at the head and tail of each slice. Inside the list lines, close gaps with cuts over room tone, never stretches. Don't time-stretch more than about 4%. If a take runs past its Max, use another take.
- **Breaths:** keep a quiet natural inhale at the head of any line after a silence (before "Fair test", "Services", "We told", "So.", "Wherever", "Yeah" and "Search your address"), pulled down 6 to 10 dB. Cut clicks and mid-phrase breaths.
- **Room tone bed:** record 60 to 90 s of your own quiet kitchen or lounge on the same phone (fridge hum, a car outside) and run it unbroken under the whole VO at about -48 to -45 dBFS. It matters most from 66.8 to 70.0 (31.36 to 34.2 in the short cut), where the music drops out: silence that falls to digital zero is the biggest AI tell.
- **EQ for a phone voice memo:** high-pass at about 90 Hz (12 dB/oct). A gentle high shelf of -2 to -3 dB from about 10 kHz. A 1 to 2 dB dip around 6 to 8 kHz plus a light de-esser to take the glossy TTS shine off. No presence boost.
- **Compression:** 2:1 to 3:1, attack about 15 ms, release about 100 ms, 2 to 4 dB of gain reduction.
- **No reverb plugin.** If it still sounds too clean, worldize it: play the VO through a small speaker and re-record it on a phone about 50 cm away, then blend 20 to 40% under the dry track.
- **Ducking:** music sits about 14 dB under speech. It ducks hard from 21.3 to 23.0 so "They knew." lands dry, thins from 59.0 to 66.8, drops to nothing from 66.8 to 70.0, re-enters under "Card says so." and resolves at 75.9.
- **Real-person alternative (preferred for trust, no AI label needed):** the founder or a real Kiwi homeowner records the continuous read as a phone voice memo in a wardrobe or a soft-furnished room, then slices it to the times above and names the clips `<line id>.mp3` for `python3 tools/make_vo.py projects/2026-10-10-qsme-nz-auckland-first --files <dir>`. If any VO is AI-generated, switch on TikTok's "AI-generated content" label and Meta's AI label when posting.
- **Mux:** `tools/mux outputs/auckland-first-16x9.mp4 outputs/auckland-first-16x9-with-vo.mp4 vo/vo01-hook.mp3@0.3 vo/vo02-fair-test.mp3@5.95 … music.mp3@0.9@0.35`, then the same for `outputs/auckland-first-9x16.mp4`. For the short cut: `tools/mux outputs/auckland-first-9x16-short.mp4 outputs/auckland-first-9x16-short-with-vo.mp4 vo/vo01-hook.mp3@0.3 … vo/vo13-summary.mp3@22.92 … music-short.mp3@0.9@0.35` with the short-cut times above.

## Changelog

- 2026-10-02: first `vo-script.json` (+ `vo-script-9x16-short.json`). Re-timed on the 76.35s renders: caption in and out times come from `motion/af.js` and were checked on extracted frames. Every line now fits at 2.8 words a second or less. vo03 drops two "the"s. vo04 now matches its caption ("It says so."). vo05 "So we told Dunedin City Council… it's in Dunedin City. They knew." became "We told the council it's in Dunedin City. They knew." (window 19.4–23.0; the caption still names Dunedin City Council). vo11 matches its caption. vo14 drops the "And" after the table's silence. vo15 says "Ask council". vo16 starts on the map at 67.05. vo18 "Says so on the card." became "Card says so." (only 1.15s before the short cut's hard cut). vo19 trimmed to match the card.
- 2026-10-03: owner CTA rule (every CTA pushes sign-ups; no pricing or no-account lines). vo19 (and `vo19-cta_m`, `svo19-cta`) is now "Search your address. Sign up at Q-S-me dot co dot en zed." Same 12 words, same start (71.55 / 35.81) and window, `vo_status.py` ok. On-screen notes updated for the new hook sub ("Here's exactly what site search shows you."), the table title ("What site search shows you") and the end card ("Search your address." / "Sign up to see yours." / qsme.co.nz / "Your account unlocks Site research: full depth in Auckland."). No timings changed.
