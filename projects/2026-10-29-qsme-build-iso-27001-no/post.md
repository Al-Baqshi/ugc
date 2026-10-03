---
title: "Is QSME ISO 27001 certified? No."
venture: qsme-build
idea: gl-iso-27001-no
status: "rendered — awaiting approval"
publish_date: 2026-10-29
publish_time: "20:30 NZDT (Thu 07:30 London GMT, 11:30 Dubai, 10:30 Riyadh)"
created: 2026-10-02
calendar_week: 4
format: short
kind: kinetic
length_s: 30
aspect: "4:5"
platforms: ["LinkedIn (founder profile + page repost)", "YouTube Shorts (9:16 re-export)"]
video: outputs/iso-27001-no-4x5.mp4
video_9x16: outputs/iso-27001-no-9x16.mp4
thumbnail: outputs/iso-27001-no-4x5-thumb.png
---

# Is QSME ISO 27001 certified? No.

**The joke in one sentence:** Row one of every vendor security questionnaire asks "ISO 27001 certified?" After a month of vendors answering with badge walls and roadmaps, QSME's own security page answers in one word, "No.", and gives the same answer in all 15 of its languages. It says no to SOC 2 too ("Also no."), lists what is in place, says the rest plainly, and ends on the same questionnaire row, answered: N, with the page as the evidence.

**The insight:** Procurement trusts a vendor that puts "No." on the record more than one with a badge it didn't earn. The fastest way through row one is a straight answer that the vendor's own page will stand behind, word for word.

**Job:** Organic, week 4 (decision stage). It closes the month by answering the first question procurement and IT/risk reviewers at main contractors and developers ask. It goes out from the founder's LinkedIn profile, the QSME page reposts it, and there's a 9:16 cut for YouTube Shorts. No login footage is needed, so if a Session C owner recording slips, this slot can move earlier as a buffer without posting any mocked-up product screen.

**Needs owner sign-off:** the video deliberately leads with "No." That's the point of it, but some enterprise buyers may read it as a weakness before they read the rest. Please confirm you're happy to lead with it (see Open questions).

## Production status (2026-10-04, rev 2 after the review)

| Piece | State | Where |
|---|---|---|
| LinkedIn 4:5 video, 30.0 s, 1080×1350, silent-first (burned-in captions) | ✅ Re-rendered 2026-10-04 (rev 2) with every must-fix and should-fix from the review, plus the cheap nice-to-haves. QA passed on the 4:5 safe box 60,60,1020,1290. I read the new contact sheet and pulled frames from the encoded MP4 at the fixed moments: the N tick (2.8–2.95), the match cut (4.80, 4.83, 4.87, 4.93, 4.97, 5.0, 5.03, 5.07: one word at a time, no double "No."), the language flick (ar 6.1, hi 6.9: the SOC 2 answer is masked), the whip and landing (10.05–10.5: no backups or roles card in any frame), the hard cut to the bidder rule (10.9–11.0), the caption out before the programme scroll (12.8–14.25), the programme framing (14.6, 17.6), the badges setup and cut (19.5–20.05) and the end card (23.9–29.97) | `outputs/iso-27001-no-4x5.mp4` · `outputs/iso-27001-no-4x5-frames.png` |
| YouTube Shorts 9:16 cut, 30.0 s, 1080×1920, same timeline frame for frame | ✅ Re-rendered 2026-10-04 (rev 2) from the same shared timeline with its own layout (`motion/iso-27001-no-9x16.html`): the window is 950×728, so the caption pills clear its bottom edge by about 28 px; every text box sits inside 65,300,1015,1250 (QA passed); captions are 50–66 px; its own live whip capture; a soft pool of brand light under the safe box. Same frame checks as the 4:5. **Post only with a sound bed or the VO** (see Music); a silent Short underperforms | `outputs/iso-27001-no-9x16.mp4` · `outputs/iso-27001-no-9x16-frames.png` |
| LinkedIn custom thumbnail (frame at 1.0 s: the questionnaire row, nothing ticked) | ✅ Re-made from rev 2 (big Y / N boxes, empty Evidence field). Upload it as the video thumbnail | `outputs/iso-27001-no-4x5-thumb.png` |
| Live public-page footage | ✅ Grabbed 2026-10-04 from public pages only (no login, nothing typed, no form touched). (1) qsme.build/security as a 4x full-page still (390 px mobile layout), cut into two bands: FAQ, and In place + Programme; (2) the same FAQ row on all 15 language versions (/de, /fr, /ar, /ru, /ja, /hi, /zh, /ko, /tr, /pt, /fa, /es, /id, /vi and English), six of them used; (3) two scripted live screencasts with `tools/motion/capture.mjs` of the page scrolling up from the FAQ (one per aspect), used as the whip. The CTA-band grab (`clips/seg-cta.png`) is no longer used in rev 2 | `motion/clips/`, steps in `motion/capture-whip*.json`, still specs in `motion/stills/`, grabber `motion/still.mjs` |
| Motion source | ✅ Shared timeline `motion/iso-27001-no.js` + styles `motion/iso-27001-no.css`; pages `motion/iso-27001-no.html` (body.build r4x5) and `motion/iso-27001-no-9x16.html` (r9x16); element boxes from the grabs in `motion/boxes.js` (made by `motion/gen-boxes.py`) | motion/ |
| VO | 🟡 Timed Kiwi script ready for rev 2: 11 lines, the same QS voice as Six bids and Column H, `tools/vo_status.py` ok. The hook line is now about 12 syllables in 2.5 s and the badges line is the page's exact sentence. Generate after the ElevenLabs upgrade; one set of clips fits both MP4s | `vo-script.md` · `vo-script.json` |
| Music + SFX | ⬜ Not made (no paid API). Direction and timings below | Music |
| Owner recordings | ✅ None needed. Every product frame is a capture of a public page | — |

**Re-render (from the studio root):**
`node tools/motion/make.mjs projects/2026-10-29-qsme-build-iso-27001-no/motion/iso-27001-no.html projects/2026-10-29-qsme-build-iso-27001-no/outputs/iso-27001-no-4x5.mp4 --safe 60,60,1020,1290` and
`node tools/motion/make.mjs projects/2026-10-29-qsme-build-iso-27001-no/motion/iso-27001-no-9x16.html projects/2026-10-29-qsme-build-iso-27001-no/outputs/iso-27001-no-9x16.mp4 --safe 65,300,1015,1250` (add `--check` while designing).
**Re-grab the page (do this on 27–28 Oct, see Open questions):** from `projects/2026-10-29-qsme-build-iso-27001-no/motion/`: `node still.mjs stills/still-security-en.json clips/security-en-full.png`, then crop the bands with `sips -c 1880 1560 --cropOffset 11720 1 clips/security-en-full.png --out clips/seg-faq.png` and `sips -c 8004 1560 --cropOffset 2040 1 clips/security-en-full.png --out clips/seg-inplace.png`; `for l in en de fr ar ja ru hi zh ko tr pt fa es id vi; do node still.mjs stills/still-lang-$l.json clips/lang/faq-$l.png; done`; `sips -c 260 1560 --cropOffset 1 1 clips/lang/faq-en.png --out clips/header-en.png`; `node ../../../tools/motion/capture.mjs capture-whip.json clips/live-whip` and the same for `capture-whip-9x16.json` → `clips/live-whip-9x16`; then `python3 gen-boxes.py`. If the page layout moved, check the band offsets above (document y of the FAQ section and the hero end in `clips/security-en-full.json`), the page "No." glyph box used for the match cut (`tgt` in `iso-27001-no.js`: N ink from x 17.0, baseline 3147.0 CSS px, measured on `clips/seg-faq.png`) and the per-beat window tops in each page's `window.CFG` (each one ends the window between two lines of page text). Don't grab above 16384 px of 4x height in one shot: Chrome wraps it.

## Hook layers (pattern break + deadpan, sound off first)

- **Text (frame 1):** "Is QSME / ISO 27001 / certified?" (Space Grotesk, 176 px on the 4:5, 150 px on the 9:16). Chips "● Security questionnaire" and "Row 1", then a real form row: two big empty answer boxes "Y" and "N" (118 px, full-contrast labels, visible borders) and an empty "Evidence" field. The first frame is already the whole hook, and it's the LinkedIn thumbnail (nothing ticked).
- **Visual:** at 2.78 "N" gets ticked in brand green (4 frames), then a hard cut at 3.0 to one giant word, "No." (560 px, brand-green full stop), held in silence for 1.6 s, so it reads as the answer to the form. "qsme.build/security" fades in under it. Then the word shrinks and flies onto the page's own "No." on the live security page, lands on its baseline at its cap height and crossfades into it (4.93–5.03) as the green tint arrives; the page's own "No." stays hidden under the flight, so there is never a double word, so the viewer sees the vendor wrote it, not us.
- **Verbal (VO later):** "ISO twenty-seven-oh-oh-one certified?" … "No."
- **Audio:** a soft tick on the N (2.78), one low click on the cut at 3.0, then dead silence through the hold. No music under the hook.
- **Why it works:** every procurement lead has typed that question into a spreadsheet, and nobody expects a vendor to answer it in one word. The big Y/N boxes make the questionnaire instantly recognisable with the sound off, and the hard cut to "No." is the pattern break. Moving the giant word onto the page turns the joke into proof, and the end card closes the loop: the same row, N ticked, evidence filled in.

## Beat-by-beat script (seconds on outputs/iso-27001-no-4x5.mp4; the 9:16 is frame for frame)

| Time | Role | On-screen text | VO (later) | Visual | SFX |
|---|---|---|---|---|---|
| 0.00–3.00 | hook | Is QSME / ISO 27001 / certified? · chips "Security questionnaire" · "Row 1" · empty Y / N boxes · empty "Evidence" field · **N ticked green at 2.78** | ISO twenty-seven-oh-oh-one certified? | Type on the brand background (faint grid, green glow), a slow 10 px drift so the frame is alive; the tick draws in 4 frames, the Y label dims | Room tone; a soft tick at 2.78 |
| 3.00–4.60 | hook (payoff) | **No.** · "qsme.build/security" (3.55) | No. | Hard cut, giant word, held 1.6 s | One low click on the cut, then silence |
| 4.60–5.55 | proof | URL chip "qsme.build/security" · "live page · 4 Oct 2026" · the page's own: "Straight answers to the questions procurement asks" / "Is QSME ISO 27001 certified?" / "No. An ISO/IEC 27001:2022 programme is in progress. We will state the certification date on this page when an accredited audit is complete and not before." | (silence) | The giant "No." flies onto the page's "No." (4.6–4.98) while the real page fades in to 30% around it, lands on the page word's baseline and cap height, and crossfades into it over 3 frames (4.93–5.03) as the green tint and underline arrive. The SOC 2 row below sits quiet and its answer stays masked | Soft whoosh 4.6 |
| 5.55–7.05 | escalation | Same answer. 15 languages. · URL chip switches with each page | Same answer. Fifteen languages. | The same FAQ row on qsme.build/de, /fr, /ar, /ru, /ja and /hi security, one every 0.25 s (real stills, the page's own language switch shows DE, FR, AR…), each first word underlined: Nein. · Non. · لا. · Нет. · いいえ。 · नहीं। The next row's SOC 2 answer is masked in every language too, as in English | Six tiny ticks on the cuts |
| 7.05–10.00 | escalation (rule of three) | the page's own "Do you have a SOC 2 report?" → "No. We do not claim one." (wiped open 7.85, underlined 7.95) · caption **Also no.** (8.3–9.9) | Sock two? … Also no. | Back to English. The page scrolls one row down (7.1–7.55); the answer wipes open left to right; the rest of both answers dims, so the two "No."s stack | None (deadpan) |
| 10.00–10.50 | turn | — | (silence) | Whip: the real screencast of the page scrolling up (capture.mjs) under a 12 px motion blur, cut while it is still moving fast (10.24), crossfading into "What is in place today?", which settles out of the blur by 10.5 | Whoosh 10.0; music enters on the landing (10.25) |
| 10.50–14.20 | value (what is in place) | the page's own "IN PLACE · What is in place today?" + "Encryption in transit" · caption **Here's what is in place.** (10.55–12.8) | Here's what is in place. | Hard cut at 10.95 from the TLS card to "Bidder visibility rules", where "stripped out server-side, not hidden in the interface." is underlined (11.3–12.8, a callback to week 1's Column H). The caption fades out at 12.8, and only then (13.0) does the page scroll on, past Signed records and Managed cloud, to the programme | Optional soft highlighter swipe 11.3 |
| 14.20–19.20 | honesty (the status) | the page's own "PROGRAMME · What is the status of ISO 27001?" · "An information security management system aligned to ISO/IEC 27001:2022 is being built now." underlined 14.6–15.45 · captions **In progress.** (15.9) **Not certified.** (16.6) / **Said plainly.** (17.3) | Being built now. … In progress. Not certified. Said plainly. | Each caption phrase lands as its own words on the page tint green: "The programme is in progress;" (15.9) and "QSME is not certified" (16.6). The window ends cleanly under "…has completed its audit." | None |
| 19.20–20.03 | thesis (setup) | the page's own "We do not display badges, logos or ratings we have not earned." underlined 19.53 | (silence) | A short scroll down to the next paragraph, the underline, the rest of the page dims, straight into the quote | None |
| 20.03–23.90 | thesis | “We do not display / badges, logos or / ratings we have / **not earned.**” — qsme.build/security | We do not display badges, logos or ratings we have not earned. | Hard cut to the full-frame quote (on screen from the cut frame), green quote mark; "not earned." in green, underlined at 21.08 | Marker swipe 21.08 |
| 23.90–30.00 | CTA (bookend) | QSME logo (no ®) · the same questionnaire row as frame 1, now answered: **N ticked** · **Evidence: qsme.build/security** (types in 24.45) · green pill **Book a 30-minute demo at qsme.build** (26.0, small pulse 28.45) | Need this in writing for procurement? … Book a thirty-minute demo at Q-S-me dot build. | End card, the hook frame again with the answer and its evidence filled in; the pill holds for 4 s | Music resolves on one chord about 29.5 |

Captions are 56 px (72 px for "Also no.") on the 4:5 and 50–66 px on the 9:16, well over the 40 px floor. The page text in the window is 42 px at 1080 wide. Every beat reads with the sound off. Each per-beat camera position ends the window between two lines of page text (no half-cut lines).

## Captions, hashtags and CTA

### LinkedIn: founder's profile (week 4, Thu 29 Oct, 20:30 NZDT = 07:30 London)

> Row one of every vendor security questionnaire: "ISO 27001 certified? Y/N"
>
> Ours is N. Our security page says so in one word: "No." Same answer in all 15 languages of the site.
>
> SOC 2 gets the same treatment: "No. We do not claim one."
>
> What the page does list is what is in place today, and where the programme is, word for word: "An information security management system aligned to ISO/IEC 27001:2022 is being built now." In progress. Not certified. Said plainly.
>
> And one line I'd like on every vendor's page: "We do not display badges, logos or ratings we have not earned."
>
> Need it in writing for procurement? Book a 30-minute demo at qsme.build (link in comments).
>
> What's on row one of yours?

**First comment (founder):** Book a 30-minute demo: https://qsme.build/contact?utm_source=linkedin&utm_medium=organic_social&utm_campaign=iso-27001-no · the page itself: https://qsme.build/security

**Hashtags (at the end, 4 max):** #ConstructionProcurement #InformationSecurity #ISO27001 #Preconstruction

### LinkedIn: QSME page repost (same day, with commentary)

> Is QSME ISO 27001 certified? No.
>
> It's in progress, it's not certified, and our security page says so plainly, in 15 languages. "We do not display badges, logos or ratings we have not earned."
>
> Need it in writing for procurement? Book a 30-minute demo at qsme.build.

### YouTube Shorts (9:16, only with a sound bed or the VO)

- **Title:** Is QSME ISO 27001 certified? No. #shorts
- **Description:** Row one of every vendor security questionnaire. Our security page answers in one word, in all 15 of its languages. SOC 2? "No. We do not claim one." What is in place is listed, and the status is said plainly: "An information security management system aligned to ISO/IEC 27001:2022 is being built now." Not certified. "We do not display badges, logos or ratings we have not earned." Need it in writing for procurement? Book a 30-minute demo at qsme.build: https://qsme.build/contact?utm_source=youtube&utm_medium=organic_social&utm_campaign=iso-27001-no
- **Hashtags:** #InformationSecurity #ConstructionProcurement #ISO27001
- Pin a comment with the demo link. The Shorts cover frame is 1.0 s (the questionnaire row). The end card (the answered row, "Evidence: qsme.build/security" and the demo pill) holds for the last 6 s, the pill for 4 s.

**CTA line (all platforms):** Need it in writing for procurement? Book a 30-minute demo at qsme.build.

## Music

- **Direction:** Silence-first. There's no music under the hook or the two "No."s: the deadpan needs dead air, so it gets small real sounds only (a soft tick on the N at 2.78, one low click on the 3.0 cut, a soft whoosh into the page at 4.6, six tiny ticks on the language flicks, nothing under "Also no."). Music enters on the whip landing at 10.25 ("Here's what is in place"), the turn from what isn't to what is. It's a minimal, tidy pulse that feels like a straight answer, sits under the programme beat, drops out for the quote card (20.03–23.9, silence plus one marker swipe at 21.08), comes back on the end card and resolves on one held chord at about 29.5.
- **Mood / tempo:** Dry, calm, quietly confident, about 90 BPM. Muted plucks, soft kick, warm low pad. No risers, no corporate ukulele, no trending track.
- **Source:** ElevenLabs Music on a plan with commercial use (branded content). Prompt: "minimal muted plucked synth and soft kick, 90 BPM, understated and tidy, warm low pad, no vocals, no risers, 19.75 seconds, drops to silence from 9.8 s to 13.65 s, resolves on a single held chord at 19.25 s" (lay it at 10.25 s). SFX from ElevenLabs Sound Effects or recorded foley (a real pen tick, a real trackpad tick, a real marker). Nothing that imitates OS, Outlook or Excel sounds.
- **Room tone:** an owner phone recording of 60 s of a quiet office under everything at about −50 dBFS, so the silences sound live.
- **Licensing:** LinkedIn has no music library, so use generated or commercially licensed audio only. No CapCut library audio or templates.
- **Mux when ready:** `tools/mux outputs/iso-27001-no-9x16.mp4 outputs/iso-27001-no-9x16-with-bed.mp4 roomtone.m4a@0@0.2 tick.m4a@2.78 tick.m4a@3.0 whoosh.m4a@4.6 whoosh.m4a@10.0 music.m4a@10.25@0.4 marker.m4a@21.08` (the same times work on the 4:5).

## Owner recordings to swap in

| Stand-in | Screen to record | Click path | Demo data | Duration | Replaces |
|---|---|---|---|---|---|
| None | — | — | — | — | Nothing. Every product frame is a real capture of the public page qsme.build/security (and its language versions); there are no illustrative or mocked-up screens in this video, so nothing carries an "Illustrative" label |

The only owner jobs are the sign-off on leading with "No.", the pre-publish re-check of the page, and the room tone (see Open questions and Music).

## Integrity notes (every claim and the truth-sheet feature it rests on)

| Claim on screen / in VO | Rests on (research/2026-10-02-qsme-platform-truth.md) | Status |
|---|---|---|
| "Is QSME ISO 27001 certified?" → N ticked → "No." (type card and the page's own FAQ) | 12.7 `security-page`: "Is QSME ISO 27001 certified? — No." Re-checked on the live page on 4 Oct 2026. The answer now continues "An ISO/IEC 27001:2022 programme is in progress. We will state the certification date on this page when an accredited audit is complete and not before.", which is shown, not paraphrased | ✅ live |
| "Same answer. 15 languages." + the de/fr/ar/ru/ja/hi frames | 12.6 `qsme-build-languages` (the website is in 15 languages). The next row's SOC 2 answer is masked in each language still (page background colour), as in English. Fetched all 15 /security pages on 4 Oct: every first FAQ answer opens with a negative (Nein. Non. لا. Нет. いいえ。 नहीं। 没有。 아니요. Hayır. Não. نه. No. No.). Indonesian "Belum." and Vietnamese "Chưa." mean "not yet", which is the same answer (not certified). It's the website, never "the app in 15 languages" | ✅ live |
| "Do you have a SOC 2 report?" → "No. We do not claim one." · caption "Also no." | 12.7: "Do you have a SOC 2 report? — No. We do not claim one." | ✅ live |
| "Here's what is in place." over the page's "What is in place today?" heading, the TLS card and the "Bidder visibility rules" card | 12.7: the page lists TLS, encrypted daily backups with a second copy, project roles, bidder visibility rules enforced on the server, signed records and managed cloud. The caption is only ever on screen with the heading, the TLS card and the bidder card (rev 2: hard cut from TLS to the bidder rule at 10.95; the caption is gone at 12.95, before the scroll to the programme starts at 13.0), so a paused frame never pairs it with the backups card, the roles card or the ISO 27001 programme | ✅ live (page) |
| The "Encrypted daily backups" card (and the "Access follows project roles" card, which says money is visible only to the owner and granted roles) | 12.17 `backups` is only 🟡 merged (nightly runs can't be verified); the roles card sits uneasily with the public schedule link showing money by default. Rev 2: neither card is legible in any frame. The whip screencast is cut at 10.24 under a 12 px blur while it is still passing the bidder/signed-records cards, before either card scrolls in; the landing frames only the heading and the TLS card; then a hard cut skips both cards to the bidder rule. Checked frame by frame on both MP4s (10.0–11.0). Nothing is said about backups, nightly runs, locations or incidents | 🟡 merged — never on screen legibly |
| "stripped out server-side, not hidden in the interface." (underlined 11.3–12.8, a callback to Column H) | 4.3 `bidder-view` + 12.7: "Rates, amounts and the tender budget are stripped out server-side, not hidden in the interface." Shown on the page, not retyped | ✅ live |
| "An information security management system aligned to ISO/IEC 27001:2022 is being built now." · VO "Being built now." | 12.7, exact wording. No date, no "soon", no "by 2027" anywhere | ✅ live |
| "In progress. Not certified. Said plainly." | 12.7: "The programme is in progress; QSME is not certified and does not describe itself as certified, compliant or audited…" Each phrase is tinted on its own words on the page. It paraphrases down, never up | ✅ live |
| “We do not display badges, logos or ratings we have not earned.” (quote card, exact) | 12.7, exact wording, attributed "— qsme.build/security". Rev 2: the VO reads the exact sentence too (no contractions) | ✅ live |
| End card: the questionnaire row answered "N" with "Evidence: qsme.build/security" | An editorial form row (generic, no real questionnaire or customer named). The answer N is the page's own "No."; the evidence is the public page itself. No badge, logo or rating is drawn | ✅ live (page) |
| VO only: "Need this in writing for procurement?" | The page's own CTA heading, checked live on 4 Oct (also live on 2 Oct). Rev 2 drops the page's CTA band from the picture (two competing CTAs, and its "Talk to sales" button), so this line is voice only, over the end card. We claim nothing beyond the page | ✅ live |
| "Book a 30-minute demo at qsme.build" (end card) + VO | 12.8 `book-a-demo` ("Demo: 30 minutes on a working project"); owner CTA rule 2026-10-03 (Global CTA) | ✅ live |

- **Brief vs the live page (4 Oct):** the FAQ is now an always-open list, not an accordion, so nothing "opens". The video reveals the answer editorially instead: the giant "No." flies into the page's own "No.", and the SOC 2 answer is masked with the page's own background colour and wiped open. We never draw an accordion or any UI the page doesn't have. "We publish what is in place and nothing more." (in the truth sheet) is no longer on the live page, so it isn't used. The badges line follows the page's order (it sits under the programme status), so it becomes the closing thesis instead of beat 3.
- **Real footage only:** every page frame is a 4x still or a live screencast of the public page, grabbed 4 Oct 2026, and the chip says so ("live page · 4 Oct 2026"). The underlines, tints, dims, the mask and the camera moves are editorial overlays. The page's own sticky header (with its QSME® mark and language switch) is the real one. Our end card uses the wordmark without ®, as on the other Global videos, until the owner confirms where it's registered.
- **Cropped out on purpose:** the hero (it mentions encrypted daily backups); the "Reporting" section's hello@qsme.co.nz (it only passes inside the whip under a 12 px blur, never legible; checked frame by frame on both cuts); the backups and roles cards (see above); the whole CTA band, with its "Talk to sales" and "Email hello@qsme.co.nz" buttons (dropped in rev 2); the footer's +64 phone number and email (never on screen); the SSO/MFA, data hosting, DPA and sub-processor FAQ rows (never on screen in English: the window ends above the SSO row). In the language flick, frames that last 0.25 s show the next FAQ row's question in that language (the SOC 2 question, dimmed); its answer is masked. The nav menu (which says "compared line by line" and "pricing and bidding are free") is never opened.
- **Not claimed anywhere:** ISO 27001 certified, compliant, audited or "by <date>"; SOC 2, SSO, MFA, GDPR, pen tests, bank-grade or a hosting region; badges of any kind; verified trades, escrow, counts, prices, time or money saved, competitors; "free" or any pricing generosity (owner CTA rule, 2026-10-03: checked on screen, captions, VO, hashtags, titles and the thumbnail); the app in 15 languages.
- **Who the joke is on:** the situation (a questionnaire full of badge walls) and ourselves (the answer is "No."). No other vendor is named, shown or mocked, and no badge, logo or rating is drawn anywhere.
- **No people:** no faces, actors, AI people or testimonials. The VO is a character voice (the QS), never the founder unless he records it himself.
- **Assets not used, and why:** the build-stage b-roll, walkthrough recreations and phone captures would dilute a single-page, quote-only video, and they show NZ-specific screens.

## Open questions for you

- [ ] **Sign-off: lead with "No."?** It's deliberate and it's the whole hook, but please confirm. If you'd rather soften it, the fallback is to open on the page's own heading "Straight answers to the questions procurement asks" and let "No." land at about 3 s (same footage, about an hour's re-cut).
- [ ] **Pre-publish check, Tue 27 or Wed 28 Oct:** re-fetch qsme.build/security and confirm the FAQ answers, the programme sentence, the badges line and "Need this in writing for procurement?" haven't changed (a qsme.build redesign is still uncommitted). If anything moved, re-grab with the commands above and update the chip date in both pages ("live page · 4 Oct 2026" lives in the page HTML).
- [ ] **Shorts sound:** can you record 60 s of quiet-office room tone and a few foley sounds (a trackpad tick, a marker swipe) on your phone? Then the Short goes out the same day with a bed. Otherwise it waits for the VO, and only the LinkedIn 4:5 goes out on the 29th.
- [ ] Happy with "Same answer. 15 languages." given Indonesian and Vietnamese say "not yet"? The alternative is "Same answer. Every language on the site." (same meaning, no number). Kept as is in rev 2 until you choose; it's a one-line change in both pages.

## Discussion history

- 2026-10-04: Built from the approved calendar slot (2026-10-29, week 4, idea gl-iso-27001-no). Checked the live page first: the FAQ is no longer an accordion, the "We publish what is in place and nothing more." line has gone, and the ISO answer now continues "…and not before." The arc was adapted to fit: a questionnaire-row type hook, a hard cut to a giant "No.", which flies into the page's own "No."; the same answer on six of the 15 language pages; SOC 2 "Also no."; a real live whip to "What is in place today?" (backups card scroll-past only, a 1.4 s Column H callback on the bidder rule); the programme sentence, with "In progress. Not certified. Said plainly." tinting its own words; the badges line as a full-frame quote; the page's own CTA band; and the end card "Book a 30-minute demo at qsme.build". Rendered 4:5 (LinkedIn) and 9:16 (Shorts) at 30.0 s from one shared timeline; QA passed on both safe boxes; contact sheets and MP4 frames checked. Picky-CD fixes before the final render: a centred, bigger question card; the morph's window fade moved later so the flying "No." doesn't smear over page text; no empty frame at the 21.3 cut; the backups card leaves on a flick scroll with motion blur; "Said plainly." on its own caption line; the badges quote centred; the CTA pill spacing fixed; a soft light pool under the 9:16 safe box. VO script written (11 lines, vo_status ok). No paid API called. Status: rendered — awaiting approval.
- 2026-10-04 (rev 2, review fixes): Applied the review ("fix, nearly ready"). Must-fixes: (1) "Here's what is in place." now fades out at 12.8, and the scroll to PROGRAMME only starts at 13.0, so the caption never sits over the ISO 27001 status; (2) the "Encrypted daily backups" and "Access follows project roles" cards are never legible: the whip is cut under a 12 px blur before they scroll in, the landing frames only the heading and the TLS card, then a hard cut to the bidder rule. Should-fixes: the match cut now lands the flying "No." on the page word's baseline and cap height (measured on the 4x still) and crossfades into it over 3 frames, with the page at 30% until the word clears the question line (the old scene also ended mid-flight, which caused the smear); the hook is 3.0 s with "ISO twenty-seven-oh-oh-one certified?" (about 12 syllables in 2.5 s); the badges setup is 0.8 s; the page's CTA band and its "Talk to sales" button are gone, and the end card is now a bookend (the same questionnaire row, N ticked, "Evidence: qsme.build/security", the demo pill held 4 s); the Y/N boxes are 118 px with full-contrast labels, and N ticks green at 2.78. Nice-to-haves: the SOC 2 answer masked in the language stills (and on the 9:16, the Arabic still's SOC 2 question, which the window edge would cut in half, is hidden); the VO reads the badges quote exactly; the "Also no." hold is 0.6 s shorter; every camera position ends the window between lines; the 9:16 captions clear the window by about 28 px. Re-rendered both aspects from the shared timeline; QA passed; contact sheets and MP4 frames checked; vo_status ok. Note: `tools/vo_status.py` paces by words (3.2 a second), not syllables, so it can't catch a line like the old hook; check syllables by hand. No paid API, no deploy. Status: rendered — awaiting approval.
