# VO script: Kiwi performance

**Character:** The QS. He's the same mid-career quantity surveyor (late 30s to 40s) as "Six bids. Six formats." and "Column H", with a general, urban, professional New Zealand accent (an Auckland or Wellington office), not broad and not Australian. He's calm, dry and deadpan. This time he's the one chasing the signature, and he's fond of the subbie: junk folders, empty toner and a scanner that skips a page happen to everyone, so every excuse is read flat and fair, with no sarcasm and no side-eye. The missing page is the scanner's fault, and the line says so. It's an AI voice, so it never speaks as the founder: no "we built" or "we made". The close has no "we" in it, so the captions and the VO now match word for word. The brand is said only in the CTA.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Voice:** use whichever QS voice wins casting in `projects/2026-10-02-qsme-voice-casting` (shortlist ⭐ Arnold `bISW1PJRBPT7aRbtPJlB`, ⭐ James `QlZn2MPaf2jDn0461bnj`). Use the same voice as Six bids and Column H so the series sounds like one person.

**Video:** `outputs/day-23-4x5.mp4` (LinkedIn) and `outputs/day-23-9x16.mp4` (YouTube Shorts). Both are 28.7s and share one timeline, so one VO stem fits both. Times below are seconds on either file. `vo-script.json` is the machine-readable twin for `tools/make_vo.py`.

**Owner rule (2026-10-03):** the VO pushes the demo and never says "free", "no account", "no login", "no sign-up" or any pricing line. CTA: "Book a thirty-minute demo at Q-S-me dot build."

**Casting line:** "Day twenty-three of chasing one signature. Scanner skipped page seven. Q-S-me dot build."

## Lines

| Start | Max | Line (v2) | v3 alt | On screen | Delivery |
|---|---|---|---|---|---|
| 0.15s | 1.95s | **Day twenty-three of chasing one signature.** | same | Subcontract signature: / DAY 23 and the amber "Not signed" pill, all from frame 0 (the pill pulses at 0.45). The counter rewinds 23 → 01 from 1.95 | Flat and tired-but-amused, like reading the number off a whiteboard. A slight lean on "twenty-three", falling on "signature". No sigh tag: the weariness is in the pace. Hard out by 2.1 so the rewind whirr plays clean. If a take runs long, fall back to "Day twenty-three. One signature." |
| 3.60s | 0.95s | **Will sign tonight.** | same | "Will sign tonight 👍" (3.55), stamp DAY 4, counter 01 → 04 | Reading the message back, completely neutral: a fair report of what was said. Cut 02, 03 and 04 from one take ("Will sign tonight. Went to junk. Out of toner.") so the list has a natural downstep. Out by 4.55. |
| 4.65s | 0.95s | **Went to junk.** | same | "Can you resend? Went to junk" (4.6), stamp DAY 9, counter 04 → 09 | A touch lower than the last line, same flat read. No weight on "junk" (it comes back in the close). Out by 5.6. |
| 5.70s | 0.95s | **Out of toner.** | same | "Printer’s out of toner" (5.65), stamp DAY 15, counter 09 → 15 | The lowest of the three, almost resigned, with a little fondness: it happens. Then silence. "Signed and scanned!" (6.7) and the Day 23 scan (7.75) land without a voice. Out by 6.65. |
| 8.50s | 2.6s | **Scanner skipped page seven. Retention.** | same | Scan_0001.pdf with "11 pages" in amber, the page fed in sideways. The strip reads 1 2 3 4 5 6 8 9 10 11 12. Red ring on the 6 \| 8 seam (8.38), caption "The scanner skipped one page." (8.45), "7?" (8.72), "Page 7: retention." (9.1) | Two beats. "Scanner skipped page seven" is a plain report that blames the machine, not the subbie. A small gap, then "Retention" dropped like a fact, with the tiniest smile, found by choosing takes. No "naturally", no side-eye. Out by 11.1. |
| 11.70s | 2.4s | **Been on site since day two.** | same | Caption "They’ve been on site since Day 2." (11.62). The ON SITE bar fills Day 2 → 23 and the SIGNED row stays empty | The deadpan peak. A dropped subject, very Kiwi. Even and slightly slower, letting the absurdity sit, with a faint lean on "two". Never exasperated: they're doing good work. Out by 14.1. |
| 14.45s | 2.25s | **Your own subcontract, sent as it is.** | same | QSME logo (14.27). Recreated Agreements dialog: Subcontract_Ceilings.pdf, "Sign it as it is" ticked (14.79), "Send for signing" clicked (15.58), then the list row "Out for signing" (16.14). Caption "Your own subcontract PDF. / Sent as it is." | Same voice, now matter-of-fact and a little relieved: a colleague showing you how it works, not a tagline. One phrase, falling on "is". Out by 16.7. If a take runs long, fall back to "Your own subcontract, as it is." |
| 16.90s | 2.45s | **One link. On their phone. Nothing to install.** | same | The phone, in its browser: tick (17.1), name typed (17.32), signature drawn (17.86), Sign (18.5), "Signed." (18.62). Right column "One link." (16.9) / "On their phone." (17.45) / "Nothing to install." (18.0) | Slice at the full stops and place each phrase on its caption (16.9, 17.45, 18.0). Even and unhurried, with no list-sell lift. "On their phone" is plain and light; "Nothing to install" is the easiest of the three, almost a shrug. Never say "no account", "no login" or "no sign-up" (owner rule, 2026-10-03). Out by 19.35, so the "Signed." chime (18.7) sits under the tail or just after it. |
| 19.90s | 2.25s | **Every page you sent. Page seven included.** | same | The list flips to "Everyone has signed" (19.81), caption "Every page you sent." (19.85), the certificate page slides in (20.3), the 12-page strip plus the certificate page (20.6), then a green ring on 7 and "Page 7 included." (21.0) | A quiet callback to the page-seven line, now settled. A light lean on "seven", and "included" falls. Out by 22.15. Don't say "same PDF" unless the owner's recording confirms the pages come back unaltered. |
| 22.35s | 1.45s | **Still can't fix junk folders.** | same | "Still can’t fix / junk folders." (22.3) | Honest and rueful, with a half-smile at our own limit: the callback to Day 9. Falling. Out by 23.8. |
| 23.85s | 1.2s | **No printer needed, though.** | same | "No printer needed, / though." (23.5, green) | The one small upturn in the piece, still understated: the callback to Day 15. "Though" trails off as an afterthought (Kiwi tag order, not a question). Out by 25.05. |
| 25.30s | 2.6s | **Book a thirty-minute demo at Q-S-me dot build.** | same | QSME logo / Your subcontract, signed from a link. / Book a 30-minute demo / qsme.build (all in by 25.3; qsme.build on screen 25.18 to 28.7) | One easy breath, low-key, like telling a colleague where to book it: a plain invitation, not a sell. A light lean on "book" and "demo". Say Q-S-me evenly as "cue ess mee", with no rise on "build". Regenerate any take that says "kiss me" or spells out four letters. Never add "free" or any pricing (owner rule, 2026-10-03). Out by 27.9 so the music resolves on its own at about 28.3. |

**Silent on purpose:** 2.1 to 3.6 (the rewind whirr and the first bubble with its stamp thump) · 6.65 to 8.5 ("Signed and scanned!" lands, the Day 23 phone buzz, the scan opens sideways) · 14.1 to 14.45 (the QSME pivot, music in at 14.25) · 19.35 to 19.9 (the "Signed." chime tail and the flip to "Everyone has signed") · 27.9 to 28.7 (music tail).

## One continuous read (the most natural take; slice it in the edit)

```
Day twenty-three of chasing one signature.

Will sign tonight. Went to junk. Out of toner.

Scanner skipped page seven. Retention.

Been on site since day two.

Your own subcontract, sent as it is.

One link. On their phone. Nothing to install.

Every page you sent. Page seven included.

Still can't fix junk folders.

No printer needed, though.

Book a thirty-minute demo at Q-S-me dot build.
```

That's 65 words and 374 characters across the 12 lines (394 for the continuous read). `tools/vo_status.py` reports it ok. The tightest windows are the hook (6 words in 1.95s), "Your own subcontract, sent as it is." (7 words in 2.25s), "One link. On their phone. Nothing to install." (8 words in 2.45s), "Every page you sent. Page seven included." (7 words in 2.25s), the two close lines and the CTA (8 words in 2.6s). If a take runs long, use the fallbacks in the delivery notes rather than speeding the voice up.

## Make it sound recorded, not synthesised

- **Source:** render the continuous read three times on the chosen voice, slice it, and place each piece at its start time. Lines 02 to 04 must come from one take. Use per-line renders only as patches, on v2 with `previous_text` and `next_text`, so the pitch carries over and doesn't reset on every line. Keep the least polished take. Reject any take where line 05 sounds accusing.
- **No canned non-verbals:** no [sighs] or [chuckles], and no "eh", "yeah" or "mate". The Kiwi feel comes from the vowels: KIT in "sign", "link", "install", "since", "fix" (never "seence" or a cartoon "sunce"), DRESS in "seven", "retention", "sent" (close to "sivven"/"retinshun" without overdoing it), FACE in "page" and "day", and the PRICE vowel in "sign", "tonight" and "scanner skipped" stays clean. Reject voices that drift Australian ("toy-night") or American ("de-mo" with a flat T in "thirty").
- **Room tone:** record 60s of a real quiet site office or a parked ute cab on a phone. Run it under all 28.7s at about -50 dBFS, so the dead air never drops to digital zero.
- **EQ and dynamics:** high-pass at 90 to 100 Hz, a -2 dB high shelf above 10 kHz and a light de-ess. Compress 2:1 to 3:1 with 3 to 4 dB of gain reduction. Set the VO to about -16 LUFS integrated and -1 dBTP. No reverb and no telephone band-pass. If it still sounds "in the box", play it through a small speaker, re-record it on a phone about 40cm away, and blend that in at 15 to 25%.
- **Music:** none under the skit (0 to 14.25), where the counter ticks, message pops and stamp thumps carry the rhythm. Bring it in at 14.25 on the QSME logo, about 18 dB under the VO. Let it lift slightly through 18.7 to 20.45, duck it under lines 09 to 12, and resolve on one chord at about 28.3. See post.md under Music.
- **SFX (synced to picture, ducked 10 to 12 dB under any word they overlap):**
  - Soft mechanical odometer ticks on each day roll: 3.25–3.55, 4.3–4.6, 5.35–5.65, 6.4–6.7 and 7.45–7.75.
  - A short tape-rewind whirr from 1.95 to 2.42.
  - A soft generic message pop at 2.5, 3.55, 4.6, 5.65 and 6.7.
  - A soft date-stamp thump at 2.69, 3.74, 4.79, 5.84, 6.89 and 7.94.
  - One phone buzz at 7.75, for the Day 23 attachment.
  - Optional: a short scanner-feed whirr as the viewer opens (8.02 to 8.3), which points the blame at the machine.
  - A marker squeak from 8.38 to 8.78.
  - A soft paper ripple from 11.5 to 12.1 as the bar fills.
  - Trackpad clicks at 14.73 and 15.58.
  - Screen taps at 17.08, 17.28 and 18.5, with light typing from 17.32 to 17.82 and a fingertip-on-glass scribble from 17.86 to 18.4.
  - A small generic success chime at 18.7 and a soft status ding at 19.84.
  - A paper slide from 20.3 to 20.6.
  - Nothing branded: no Outlook, WhatsApp, iMessage, DocuSign or OS sounds.
- **Timing:** start each line 0 to 4 frames before its caption, varying it by a frame so the sync doesn't look quantised. Never time-stretch more than about 4%. If a take runs past its max, use another take.
- **Mux:** bounce a mono VO stem and lay it on both cuts, e.g. `tools/mux outputs/day-23-4x5.mp4 outputs/day-23-4x5-with-vo.mp4 vo01.mp3@0.15 …` and the same for `day-23-9x16.mp4`. Or run `python3 tools/make_vo.py projects/2026-10-15-qsme-build-day-23 <voice_id>` after the ElevenLabs upgrade, then mux the same stem onto the 9:16. Keep music and SFX as separate tracks.
- **Disclosure:** if the VO is ElevenLabs, set LinkedIn's and YouTube's AI-content labels where they apply. A consenting real Kiwi QS, or the founder's own cloned voice, needs no label.
