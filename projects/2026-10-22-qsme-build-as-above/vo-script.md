# VO script: Kiwi performance

**Character:** Sam, a fictional Kiwi site manager in his late 30s to 40s. He's the "Sam" in the email and "Sam K." in the daily log. General urban New Zealand accent (an Auckland or Wellington site office), not broad and not Australian. He's dry, low and a bit sheepish: this is a confession to a mate in the site office, not a performance, so the joke is on the speaker and never on other site managers. The diary lines are read flat with a natural downstep (Monday gets a full sentence, Wednesday is flatter, "Ditto" is the flattest). The product lines are the same person, a touch more awake, still with no announcer lift and no tagline cadence.

**Not a testimonial:** Sam never says he uses QSME or that it saved him anything. The product lines are plain instructions and observations ("Log the rain day once."), and the payoff says "you'd", matching the caption. It's an AI voice, so it never speaks as the founder and never says "we built". QSME is said only in the CTA.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Voice:** use the same Kiwi QS voice as "Six bids", "Column H" and "Day 23" (shortlist ⭐ Arnold `bISW1PJRBPT7aRbtPJlB`, ⭐ James `QlZn2MPaf2jDn0461bnj`, see `projects/2026-10-02-qsme-voice-casting`). Worth an A/B with a Kiwi woman's voice: "Sam" works either way, and it breaks the default-bloke pattern on a site-management post.

**Video:** `outputs/as-above-4x5.mp4` (LinkedIn, 1080×1350, 29.25 s, re-rendered 2026-10-04 after the review). Times below are seconds on that file. They are **output** times, after the edit list at the bottom of `motion/as-above.js` (a few cuts and holds applied at render). `vo-script.json` is the machine-readable twin for `tools/make_vo.py`.

**Word choice (Global):** the hook says "Friday afternoon", not "arvo". The accent stays natural Kiwi, but the words are international English for UK and Gulf contractors and QS practices (venture file: qsme-build).

**Owner rule (2026-10-03):** the VO pushes the demo and never says "free", "no account", "no login", "no sign-up" or any pricing line. CTA: "Book a thirty-minute demo at Q-S-me dot build."

**Casting line:** "Confession. Site diary gets done Friday afternoon. Wednesday gets as above. Ditto."

**Silent cut:** the MP4 ships silent, with every line already on screen as a burned-in caption (hook, diary captions, "Nine months later.", the email, "It was. Probably.", product captions, close and end card), so it works with the sound off. This VO is added after the ElevenLabs upgrade.

## Lines

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.15s | 2.5s | **Confession. Site diary gets done Friday afternoon.** | [sighs] Confession. Site diary gets done Friday afternoon. | CONFESSION pill · "Site diary." / "Written Friday, 4:52pm." (frame 0) · "For Monday." slams in amber (0.55) · the pen writing Monday | Low, dry, a little sheepish, like owning up across the desk. A tiny pause after "Confession." Dropped subject, natural Kiwi accent; "afternoon" said plainly. Falls. Out by 2.65. |
| 2.70s | 1.45s | **Monday gets a paragraph.** | same | "Monday gets a paragraph." (2.65–4.25) · clock FRI 16 OCT · 4:52 PM | Matter-of-fact, almost proud of Monday. Light lean on "paragraph". Cut 02, 03 and 04 from one take so the week drops a step with each line. Out by 4.15, as the rain comes in. |
| 6.05s | 1.45s | **Wednesday gets as above.** | same | "Wednesday gets "As above."" (6.0–7.6) · the pen writes "As above." on Wed (6.15) and Thu (6.7) | Lower and flatter than Monday, a shrug in the voice. "As above" said as a quote, slightly slower. Out by 7.5. |
| 7.75s | 0.6s | **Ditto.** | same | Friday "Ditto." written (7.7–7.95) and underlined (7.95–8.08) after the Wednesday caption has gone · the camera pulls back on the whole week (7.8–8.22) · clock 4:58 PM | The flattest, lowest word in the piece. Dead stop. Out by 8.35 so "Nine months later." (8.5) lands in silence. |
| 8.55s | 0.95s | **Nine months later.** | same | "Nine months later." over the finished townhouses (8.5), rising as the email arrives (9.1) | Plain narrator aside, slightly slower, a hint of dread. Falls. Out by 9.5, before the mail chime (9.5). |
| 12.00s | 1.3s | **It was. I think.** | It was. [pause] I think. | Hard cut back to the diary's Tuesday (11.8): red ring round "Works progressed." (11.92–12.32), red "?" in the blank WEATHER box (12.3) · "It was." (12.05) / "Probably." (12.55) | "It was." confident, a beat, then "I think." smaller and less sure. The caption says "Probably." on purpose (as briefed). Out by 13.3, before the swipe. |
| 13.85s | 1.8s | **Log the rain day once.** | same | Recreated Schedule (demo data): "Rain day" clicked (13.85), Tue 13 ticked (14.36), "Push these tasks" (15.2), the chain slides a day (15.42–15.82) · caption "Log the rain day once." (13.52) | A touch brighter, like showing a mate the trick. Light lean on "once", falling. Not a sell. Out by 15.65. |
| 16.50s | 1.7s | **It's already in the diary.** | same | Hard cut to the Daily log (16.36): "Tue 13 Oct" gets the email's yellow marker (16.5), "Rain day" (16.68) and "Schedule change" (16.9) write themselves in · captions "Log the rain day once." (dimmed) / "It writes itself into the diary." (16.36–18.46) | Mild, pleased surprise, kept small. Lean on "already". "It" is the rain day, never "it writes the diary". Out by 18.2. |
| 18.65s | 2.9s | **Photos land on the day you post them.** | same | Project chat (18.55): Mia T. "Rained off. Packing up." then her photo "Where we got to before the rain." → click the photo (19.24) → "Mark as proof of work" (19.68) → hard cut to the Daily log (19.85): "Proof of work · Mia T. · 11:42" lands under Tue 13 Oct (19.98–20.2) · caption from 18.6 | Even and unhurried, one phrase, light lean on "day". Out by 21.55 (it can run under the phone swipe at 20.85). |
| 22.15s | 0.95s | **Not on Friday.** | same | Phone browser at app.qsme.build: Add photo (21.38) → Take a photo (21.8) → shutter (21.96) → "Site photo · Sam K. · 11:51" (standing water on site) lands under Tue 13 Oct (22.06–22.32) · "Not on Friday." in amber (22.12) | Dry callback, a half-smile, lean on "Friday". Out by 23.1; it may tail under the swipe (22.9–23.2). |
| 23.60s | 2.8s | **It writes the bits you'd forget by Friday.** | same | "It doesn't write the whole diary." (23.02, read in silence) · paper Tuesday ("PAPER · WRITTEN FRI 4:53 PM") beside the QSME Tuesday card ("Tue 13 Oct" in yellow marker, 23.5) · "It writes the bits / you'd forget by Friday." (23.6) | Honest and low-key, a tip, not a slogan. Lean on "bits" (the qualifier: only some entries write themselves) and a small dry lean on "Friday". Out by 26.4; the line rises into the end card under it (25.52–25.92). |
| 26.40s | 2.8s | **Book a thirty-minute demo at Q-S-me dot build.** | same | End card fades in under the close (25.5): QSME logo (25.55) · payoff line · pill "Book a 30-minute demo" (25.8) · "qsme.build" (25.95–29.25) | One easy breath, a plain invitation, not a sell. Light lean on "book" and "demo". Q-S-me evenly (kyoo-ess-mee), no rise on "build". Regenerate any take that says "kiss me" or spells four letters. Never add "free" or pricing. Out by 29.2. |

**Silent on purpose:** 4.15–6.05 (Tuesday: rain on a tin roof and the pen writing "Works progressed." under "Tuesday: rained off." — the rain says it) · 9.5–12.0 (the email, time to read it, one generic mail chime at 9.5, then the hard cut back to the diary at 11.8) · 13.3–13.85 (the swipe into QSME, music in at 13.3) · 15.65–16.5 (the chain slides, hard cut to the Daily log) · 23.1–23.6 ("It doesn't write the whole diary." read in silence) · 29.2–29.25 (music tail).

**Dropped in the review pass:** "On the day." (was line 08). Its "What happened" screen is cut from the video, and the VO line had nothing on screen. "Photos land on the day you post them. Not on Friday." and the TUE 13 OCT clock chips carry the same point.

## One continuous read (the most natural take; slice it in the edit)

```
Confession. Site diary gets done Friday afternoon.

Monday gets a paragraph.

Wednesday gets as above.

Ditto.

Nine months later.

It was. I think.

Log the rain day once.

It's already in the diary.

Photos land on the day you post them.

Not on Friday.

It writes the bits you'd forget by Friday.

Book a thirty-minute demo at Q-S-me dot build.
```

## Make it sound recorded, not synthesised

- **Generation:** render the continuous read three times on the chosen voice, slice it and place each piece at its start time. Lines 02–04 must come from one take so the week has a natural downstep. Use per-line renders only as patches, with previous_text/next_text so the intonation carries over. Keep the least polished take. Fixed seed per take, logged.
- **Never time-stretch** more than about 4%. If a take runs past its max, use another take.
- **Room tone:** 60 s of a real quiet site office (fridge hum, distant traffic) recorded on a phone, under the whole 29.25 s at about -50 dBFS so silences never drop to digital zero.
- **EQ and dynamics:** high-pass 90 Hz, -2 dB shelf above 10 kHz, light de-ess; compression 2:1 to 3:1 with 3–4 dB of gain reduction. No reverb. Master at about -14 LUFS integrated, -1 dBTP.
- **SFX** (ducked 10–12 dB under any word they overlap): pen scratch 0.0–2.36, 4.4–5.0, 6.15–6.5, 6.7–7.0, 7.7–7.95 (harder, "Ditto"), ditto-mark ticks 6.05, 6.6, 7.1 and an underline flick 7.95–8.08 · a kettle clicking off at 1.6 · rain on a tin roof 4.15–5.95 · a low soft hit on "Nine months later." at 8.5 · one generic mail chime at 9.5 (nothing like Outlook or Gmail) · marker squeaks 11.92–12.32 (the ring) and 12.3–12.5 (the "?") · soft thuds on "It was." 12.05 and "Probably." 12.55 · swipe whoosh 13.3–13.6 · trackpad clicks 13.85, 14.36, 15.2, 19.24, 19.68 · soft ticks as the log entries write in, 16.68 and 16.9 · a light pop when the proof-of-work entry lands in the log (20.0) · phone taps 21.38 and 21.8 · a soft camera shutter at 21.96 · swipe 22.9–23.2 · paper slide 23.1. No OS-branded sounds.
- **Music:** none under the skit (0–13.3): pen, rain and room tone carry it. Music enters on the swipe into QSME at 13.3, sits about 18 dB under the VO, dips for the shutter at 21.96 and resolves on one held chord at about 29.05.
- **Mux:** bounce a mono VO stem and lay it onto `outputs/as-above-4x5.mp4` with `tools/mux` as a separate track, so music and SFX stay adjustable. If a 9:16 cut is built later on the same timeline, the same stem fits it.

## Changelog

- 2026-10-04: first version, timed on the rendered 29.25 s 4:5 MP4. Product lines are instructions, not a testimonial, and the payoff line says "you'd" to match the caption. `python3 tools/vo_status.py` reports ok (13 lines, 331 characters). No API was called.
- 2026-10-04 (review pass): retimed on the re-rendered 29.25 s cut. The desk runs 1.2 s longer (diary captions 1.6–1.7 s each, "Ditto." written after the Wednesday caption), the "What happened" beat is cut and its line "On the day." dropped (12 lines, 325 characters), and the Daily log caption now holds 2.1 s. Hook now says "Friday afternoon" (international English; accent unchanged). Tuesday is now rained off on screen; no VO change was needed for that. `python3 tools/vo_status.py` reports ok. No API was called.
