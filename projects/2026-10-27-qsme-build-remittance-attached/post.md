---
vid: G10
title: "Remittance attached. (It wasn't.)"
venture: qsme-build
idea: gl-remittance-attached
status: "audio-first remake v4 (Cam S eleven_v3, one take, forced-aligned) — awaiting approval"
publish_date: 2026-10-27
publish_time: "10:30 NZDT (Tue 08:30 Sydney/Melbourne AEDT, 07:30 Brisbane; Mon 21:30 London GMT)"
created: 2026-10-02
calendar_week: 4
format: short
kind: kinetic
length_s: 41.5
aspect: "4:5 + 9:16"
platforms: ["LinkedIn (founder profile; QSME page reposts at 07:30 London)", "YouTube Shorts (9:16)"]
video: outputs/remittance-attached-4x5.mp4
video_9x16: outputs/remittance-attached-9x16.mp4
video_with_vo: outputs/remittance-attached-4x5-with-vo.mp4
video_9x16_with_vo: outputs/remittance-attached-9x16-with-vo.mp4
---

# Remittance attached. (It wasn't.)

**The joke in one sentence:** Month-end, and two accounts teams spend five emails and a call proving to each other whether one payment moved, because both their spreadsheets are right, according to themselves.

**The insight:** Half of payment admin is two people proving to each other whether money moved. QSME doesn't move the money and doesn't pretend to check it. What it does is give both sides one record on the milestone: the subcontractor puts the proof and their invoice on the stage, only the payer can mark it "paid outside QSME" (with the reference, on their word, and the screen says so), and only the receiver can confirm the money cleared. Then both screens read the same sentence: "Settled outside QSME and confirmed by both sides."

**Job:** Organic first. Week 4's money story, posted on the Tuesday before the last payment runs of October (31 Oct is a Saturday, so runs land Thu–Fri). The founder posts it on LinkedIn, the QSME page reposts it at 07:30 London, and the 9:16 goes to YouTube Shorts. Nobody is the butt: not the main contractor's accounts team, not the subcontractor's. The spreadsheets and the thread are.

## Audio-first remake (2026-10-06, re-taken 2026-10-10) — the current masters

**Why:** the owner approved the N01 "Which Dave?" pilot ("This is what I mean by a voiceover… keep it like this") and asked for the same on every video: continuous speech with a real hook in the first seconds, ONE unbroken eleven_v3 take (Cam S), no silence over 1 s, picture re-timed to the words, clean (no music bed). Design unchanged; both cuts share the one re-timed timeline.

**Why it was re-taken (2026-10-10 review, verdict "fix"):** the 2026-10-06 take (46.76 s) had five silences of 1.0–1.46 s, four of them on the blank-line paragraph breaks in the text sent to ElevenLabs; it read low-energy at 2.39 words/s under a `[dry]` tag; and its with-timestamps `alignment.json` ran ~0.8 s ahead of the real audio (up to 1.6 s at the pauses), so the picture timed from it landed early (the product swipe under "According to themselves", "QSME never touches the money." under "don't confirm on a promise", a blank swipe frame under "you both ticked."). The fix: one new take with the script as ONE paragraph, and every time below taken from **forced alignment** of the take that ships (`/v1/forced-alignment`, cross-checked against ElevenLabs STT word timestamps and an RMS silence scan), never from the with-timestamps alignment.

**Hook (0–3.1 s, spoken):** "Paid on the fourteenth, remittance attached, it wasn't." — on screen: "Paid on the 14th." / "Remittance attached." from frame 0 over the email; the red marker circles "0 attachments" on "remittance attached" (1.25–2.00), the "?" drops at 2.25 and "(It wasn't.)" slams on "wasn't" (2.80). Hard cut to the thread 3.85.

**The script as spoken (one take, 39.97 s file, speech 0.10–39.88 s, 116 words, 2.92 words/s, longest silence 0.90 s; one v3 tag):**

```
[confident] Paid on the fourteenth, remittance attached, it wasn't. Nothing attached? Reattached. That's the March one. Which account? Can we jump on a call? Both correct, according to themselves. So on Queue Ess Mee, the subcontractor puts proof and invoice on the stage, not in an inbox. Only the payer can mark it paid, and the screen's honest about it: this goes on your word, and the remittance? Actually attached. Only the receiver can confirm it, once the money's landed. Don't confirm on a promise, because Queue Ess Mee never touches the money. It keeps the one record you both ticked. Book a thirty-minute demo at Queue Ess Mee dot build, the one call worth jumping on.
```

Script changes vs 2026-10-06: sent as one paragraph (no blank lines); `[dry]` → `[confident]`; the hook is one run; "That's March's." → "That's the March one." (attempt 5 read it fast and STT heard "That's matches"; the thread card now reads the same); "So on", "and the remittance? Actually attached." and "because" join lines that used to end in long pauses. One voice plays both sides of the thread as a quick, wry storyteller reading it out, not as two actors. Every product line rests on truth sheet 10.1 (proof + invoice on the milestone; only the payer marks paid; "so this goes on your word"; only the receiver confirms; "don't confirm on a promise"; a record of a payment, not a payment). No "free", pricing, "release", escrow or verification claim.

| Said (word start, forced alignment) | Picture (re-timed to the words) | Caption on screen |
|---|---|---|
| 0.10 "Paid on the fourteenth, remittance attached," | email scrolls 0.15–0.70; cursor hunts round the strip; red circle draws 1.25–2.00; "?" 2.25 | Paid on the 14th. / Remittance attached. |
| 2.66 "it wasn't." | "(It wasn't.)" slams 2.80 (on "wasn't"); cut to the thread 3.85 | (It wasn't.) |
| 4.04 "Nothing attached?" | thread; reply 1 pops 4.04, RE: slams | (the thread) |
| 5.40 "Reattached." | reply 2 + "Remittance_14-03.pdf" 5.40 | |
| 6.38 "That's the March one." | reply 3 6.38 | |
| 7.50 "Which account?" | reply 4 7.50 | |
| 8.46 "Can we jump on a call?" | reply 5 8.46; swipe to the sheets 9.62 ("call?" ends 9.32) | |
| 10.06 "Both correct," | "Both correct." pops 10.06; STAGE 2 PAID on "correct" 10.32 / OUTSTANDING 10.55 | Both correct. |
| 10.74 "according to themselves." | caption 10.74; the sheets lean in on "themselves" 11.18; swipe to QSME 11.85 (after the word ends 11.68) | According to themselves. |
| 12.30 "So on QSME, the subcontractor puts proof and invoice on the stage," | subcontractor's screen (amber): note types 12.20–12.80, demo photo 13.10 flies in 13.90–14.28, Submit progress on "proof" 14.90 (+ toast), Upload invoice on "invoice" 15.45 (chip + toast) | Proof and invoice, on the stage. (14.90) |
| 16.84 "not in an inbox." | caption on the word; flip to the payer 18.25 | Not in an inbox. |
| 18.44 "Only the payer can mark it paid," | main contractor's screen (blue): caption 18.44; "I paid outside QSME" clicked on "payer" 18.90; dialog; reference types on "mark" 19.34–19.84 | Only the payer can mark it paid. |
| 20.44 "and the screen's honest about it: this goes on your word," | push-in on the warning on "honest" 21.00; "so this goes on your word." highlighted + quoted on "this" 22.16; pull back 23.32 | "…so this goes on your word." |
| 23.58 "and the remittance? Actually attached." | Choose file → Remittance_14-10.pdf on "remittance?" 23.85; "(Actually attached.)" slams on "Actually" 24.70; tick 24.95; Mark as paid 25.25; "Awaiting confirmation" pill 25.52 + toast | (Actually attached.) |
| 26.08 "Only the receiver can confirm it, once the money's landed." | flip to the subcontractor 26.05; caption 26.10; Confirm payment received on "confirm" 27.12; dialog; push-in on "once" 28.00 | Only the receiver can confirm it. |
| 29.54 "Don't confirm on a promise," | "don't confirm on a promise." highlighted + quoted on "Don't" 29.54; pull back on "promise" 30.40; tick 30.75; Confirm 31.00; dialog closes 31.15 | "…don't confirm on a promise." |
| 30.90 "because QSME never touches the money." | caption on "Queue" 31.44; M2 settles 31.35 ("Settled outside QSME and confirmed by both sides." + "Payment settled · Outside QSME" + toast) | QSME never touches the money. |
| 33.34 "It keeps the one record you both ticked." | swipe to the split 33.05 (after "money." ends 32.90); caption on "It" 33.34; STAGE 2 SETTLED on "record" 34.08 and on "both" 34.50 | It keeps the one record / you both ticked. |
| 35.64 "Book a thirty-minute demo at QSME dot build," | end card swipes in 35.15 (after "ticked." ends 35.06); logo + contact crop 35.40; pill slams on "Book" 35.64; "Thirty minutes on a working project…" highlighted 36.15–36.65 under "thirty-minute demo"; qsme.build pops on "Queue Ess Mee dot build" 37.04 | Book a 30-minute demo · qsme.build |
| 38.54 "the one call worth jumping on." | note slams on "the one call" 38.54; pill pulses 39.90 (speech ends 39.88); page ends 41.50 | (the one call worth jumping on) |

**Files:** masters `outputs/remittance-attached-4x5.mp4` (41.5 s, silent, QA passed on 60,60,1020,1290) and `outputs/remittance-attached-9x16.mp4` (41.5 s, silent, QA passed on the Shorts box 65,300,1015,1400; on the generic 1250 box only the recreated app's own lower-band UI text at y 1225–1391 is flagged, the 2026-10-04 design decision, no caption); voiced `outputs/remittance-attached-4x5-with-vo.mp4` + `outputs/remittance-attached-9x16-with-vo.mp4` (the take at 0.0 s, gain 1.15, no bed; probe: 1 video + 1 audio track, container 41.50 s = video, audio 39.97 s from 0.00); take + `forced-alignment.json` (the clock) + `words.json` (built from it) + `stt.json` + `alignment.json` (with-timestamps, kept for the record, do not time from it) + the exact text sent (`take-text.txt`) in `outputs/vo-take-cam-v3/`, attempts 1–6 kept beside it (`*-attempt<N>.*`; attempt 6 = the take); contract `vo-script.json` / `vo-script.md`; the 47.5 s 2026-10-06 masters archived as `outputs/archive/remittance-attached-<cut>-v3.mp4`, the 30.7 s v2 files as `outputs/archive/*-v1.*`. Covers unchanged (their text, the hook, did not change). Source: `motion/remittance-attached.js` (header comment = the word anchors).

**Open after this run:** the owner's ear on the new read ([confident], 2.92 words/s, a touch above the 2.6–2.9 band; "It wasn't." lands at 2.66–3.14, the opening situation fills the first 2 s); SFX; the publish condition below (Session C, open questions 1–2) is unchanged.

**What's below:** the production status, hook layers, beat-by-beat table and the Music/VO notes describe the 2026-10-04 silent 30.7 s cut and its 18-line plan. They are kept as the design record; the timeline above is the one that ships.

## Publish condition (read first)

Every QSME screen in this cut (10.63–27.48 s) is an HTML recreation built from the exact strings on origin/main (`settlement.json`, `contracts.json`, `projects.json`, checked 2026-10-04), with fictional demo data. Since the 2026-10-04 review pass the render carries the **public** label "Recreated screen · demo data" (`PUBLIC_LABEL = true` in `motion/remittance-attached.js`); the internal "Illustrative — swap for real QSME screen" note is gone from both MP4s. The captions below carry the line "Screens in this cut are recreations with demo data."

- **Preferred: Session C (owner).** Record shots #1–#4 (see "Owner recordings to swap in"), swap them in at the listed times and re-render both cuts. Keep our captions, the quote captions, the role chips and window colours, the flips, the push-ins, the "(Actually attached.)" note, the party chips, the SETTLED callouts, the photo fly-in and the end card on top. Then drop the recreation line from the captions.
- **Before Session C, a product question (open question 2):** on main, the milestone row pill reads **"Ready to release"** once proof is in and **"Released"** once settled (`projects.json` → `awardedWork.state`), and the payer's panel sentence says "Review and release …". That is red-list wording ("release the funds" implies QSME holds money). The recreation never shows those strings. Get the owner's answer before recording: either the pills get renamed (the contract status words "Work submitted" / "Settled" already exist) or every shot is framed so the pill and that sentence are out of frame.
- **If Session C slips past publish day:** this labelled render can go out as it is, but only on the owner's yes to open question 1.
- **®:** the wordmark is rendered without ® (`motion/qsme-logo-nor.svg`), the same as the other Global cuts.

## Production status (2026-10-04)

| Piece | State | Where |
|---|---|---|
| **4:5 video, 30.7 s, 1080×1350, silent-first with burned-in captions** | ✅ Rendered v2 (2026-10-04 review pass). QA passed on the safe box 60,60,1020,1290. Contact sheet read; the fixed moments pulled from the encoded MP4 and checked (0.6/0.75/0.9 header under the toolbar, 1.25 "(It wasn't.)", 16.7 push-in, 17.65 attach note, 18.72 pill pop, 19.5 flip, 21.15 push-in, 24.6 split, 29.5 end card). 🟡 Publishable as a labelled recreation on the owner's yes (open question 1); Session C preferred | `outputs/remittance-attached-4x5.mp4` · `outputs/remittance-attached-4x5-frames.png` · cover `outputs/remittance-attached-4x5-thumb.png` |
| **9:16 YouTube Shorts video, 30.7 s, 1080×1920** | ✅ Rendered v2. A re-layout, not a crop: label on top (y 304), logo/role chip at 356, captions at 426/494, the app at **.9** drawn at x 45–945, y 566–1394 (was .77 ending at 1250), mail/thread windows at .84 from y 566, the split at 690. QA passed on **65,300,1015,1400**: a Shorts-only box (title/channel overlays sit below ~1450); stationary app text in the lower band stays left of x 900 (the action rail), checked with a clipping-aware text pass. Same clock as the 4:5. 🟡 Same publish condition | `outputs/remittance-attached-9x16.mp4` · `outputs/remittance-attached-9x16-frames.png` · cover `outputs/remittance-attached-9x16-cover.png` |
| Motion sources | ✅ One timeline for both cuts | `motion/remittance-attached.html` (4:5) · `motion/remittance-attached-9x16.html` · `motion/remittance-attached.js` · `motion/remittance-attached.css` |
| Footage | ✅ Real brand b-roll as the demo proof photo (`assets/qsme/broll/th-4-structure.v1.mp4`, 0.5–2.3 s) · real live capture of the public page qsme.build/contact on the end card, cropped to "What happens on a demo?" + its first line (re-captured 2026-10-04) | `motion/clips/frame/` · `motion/clips/stills/contact-demo-line.png` (+ `.json`) · `motion/stills.json` + `motion/still.mjs` · brand mark `motion/qsme-mark.svg` (copy of `assets/qsme/brand/brand-mark.svg`) |
| VO | ✅ 2026-10-06: ONE unbroken Cam S eleven_v3 take (46.0 s), both cuts re-timed to it and voiced (see "Audio-first remake" above). The 18-line plan below is superseded | `vo-script.md` / `vo-script.json` · `outputs/vo-take-cam-v3/` |
| SFX, music | ⬜ After the ElevenLabs upgrade (commercial licence) or royalty-free | Music below · SFX list in `vo-script.md` |
| Owner screen recordings | ⬜ Session C: 4 shots (+1 optional for the long-form) | "Owner recordings to swap in" |

Re-render from the studio root (each takes about 2–3 min when the Mac is quiet):
`node tools/motion/make.mjs projects/2026-10-27-qsme-build-remittance-attached/motion/remittance-attached.html projects/2026-10-27-qsme-build-remittance-attached/outputs/remittance-attached-4x5.mp4 --safe 60,60,1020,1290`
`node tools/motion/make.mjs projects/2026-10-27-qsme-build-remittance-attached/motion/remittance-attached-9x16.html projects/2026-10-27-qsme-build-remittance-attached/outputs/remittance-attached-9x16.mp4 --safe 65,300,1015,1400`
Covers (lossless): `node tools/motion/make.mjs <page> <scratch>/thumb.mp4 --still 2.2 --still-only`, then copy the PNG to `outputs/remittance-attached-4x5-thumb.png` / `outputs/remittance-attached-9x16-cover.png`.
QA note: during the two push-ins the zoomed layer (`#cam`) is marked `data-qa-ignore`, because its text runs past the window and is clipped by `#app` (`overflow:hidden`), which the kit QA can't see. Those frames were checked by eye and with a clipping-aware text pass; the only text past the 4:5 safe box then is the zoomed paragraph cut at the window edge (x 1020–1040), on purpose.
Rebuild the caches: `tools/motion/extract assets/qsme/broll/th-4-structure.v1.mp4 projects/2026-10-27-qsme-build-remittance-attached/motion/clips/frame 30 0.5 2.3 1350` · `node projects/2026-10-27-qsme-build-remittance-attached/motion/still.mjs projects/2026-10-27-qsme-build-remittance-attached/motion/stills.json projects/2026-10-27-qsme-build-remittance-attached/motion/clips/stills` (writes `contact-demo-line.png`)

## Hook layers

- **Text (frame 0):** "Paid on the 14th. / **Remittance attached.**" over an email whose only attachment strip reads "0 attachments", then "(It wasn't.)" slams on in red handwriting at **1.2 s** (was 2.1).
- **Verbal (VO later):** "Remittance attached." … "It wasn't."
- **Visual:** a generic, unbranded email ("RE: Stage 2 payment — not received", Wed 21 Oct, 09:12, with a grey dashed "0 attachments" strip under the signature). It scrolls 0.15–0.70 (the header now clips under the toolbar instead of painting over it); the cursor hunts round the strip; a red marker circles "0 attachments" (0.75–1.10) and drops a "?" (1.05).
- **Audio:** silence, then one lonely notification ping.
- **Paid-test alternative (kept from gl-i-paid-you-last-week):** two voices, "I paid you Friday." / "Nothing's landed.", over the same frames with the kicker swapped. Only after organic earns it.

## Beat-by-beat script (times are seconds on both MP4s)

| Time | On-screen text | VO line (later) | Visual | SFX |
|---|---|---|---|---|
| 0.0–2.50 | Paid on the 14th. / **Remittance attached.** / *(It wasn't.)* (1.20) | Remittance attached. … It wasn't. | Generic mail window with a "0 attachments" strip from frame 0. The body scrolls 0.15–0.70 (clipped under the toolbar); the cursor hunts round the strip; a red marker circle draws round "0 attachments" 0.75–1.10 and a "?" lands at 1.05. "(It wasn't.)" holds 1.3 s. | Notification ping, scroll, marker squeak, a thock on "(It wasn't.)" |
| 2.50–7.53 | **RE: RE: … RE:** / Stage 2 payment — not received. Replies land one per beat: Nothing attached? (2.78) · Reattached. + "Remittance_14-03.pdf" (3.63) · That's March's. (4.48) · Which account? (5.33) · **Can we jump on a call?** (6.18, held 1.35 s) | Nothing attached? / Reattached. / That's March's. / Which account? / Can we jump on a call? | The email collapses into a thread. Each new reply arrives with a yellow "unread" tint and a red "RE:" slams onto the subject, six in all. Avatars MC (main contractor, blue) and SC (subcontractor, amber), roles only, no names. | A quieter mail whoosh each time |
| 7.53–10.63 | **Both correct.** (7.85) / **According to themselves.** (8.83) | Both correct. / According to themselves. | Swipe to two generic spreadsheets, tilted toward each other: MAIN CONTRACTOR "Payments run — October" with Stage 2 = PAID 14/10, SUBCONTRACTOR "Claims register" with Stage 2 = OUTSTANDING, same 49,500.00 on both. Big callouts STAGE 2 **PAID** (8.13) / **OUTSTANDING** (8.38). They lean in at each other at 9.63 and back off. | Two dull stamps |
| 10.63–14.43 | QSME logo · SUBCONTRACTOR'S SCREEN · Proof and invoice, on the stage. (10.83) / **Not in an inbox.** (13.13) | Proof and invoice, on the stage. / Not in an inbox. | Swipe to QSME (recreation, amber window outline and URL pill = subcontractor). "Work area" → "Milestone timeline": M1 Mobilisation ✓, M2 Frame & trusses open, M3 Close-in & handover. The note types in; a demo site photo (real brand b-roll) plays big, then flies into the upload (11.45–11.83). Click "Submit progress" (12.13) → "Proof submitted by Demo Framing Co." + toast "Progress submitted"; click "Upload invoice" (12.83) → chip "View contractor invoice" + toast "Invoice attached to this milestone". | Photo pop, clicks |
| 14.43–19.58 | MAIN CONTRACTOR'S SCREEN · Only the **payer** (blue) can mark it paid. (14.55) · yellow quote caption **"…so this goes on your word."** (16.29) | Only the payer can mark it paid. / Actually attached. / Awaiting confirmation. | The window **flips** (14.28–14.63) to the payer's view, outline and URL pill now blue. "I paid outside QSME" (click 15.23) → dialog "Record this as paid outside QSME" · "M2 · Frame & trusses" · "Payment reference" typed STG2-1410 (15.58–16.05). **Push-in ×1.4** on the warning (16.13–17.29): "Only mark this as paid if you have actually sent the money." … **"so this goes on your word."** highlighted 16.29–16.89. Then "Attach the invoice or receipt (optional)": Choose file (17.45) → **Remittance_14-10.pdf** + red handwritten **"(Actually attached.)"** (17.57) · tick "I have sent the money." (17.88) · "Mark as paid" (18.27). The row pill **Awaiting confirmation** pops ×1.2 with an amber ring (18.59) + "Recorded as paid outside QSME. Waiting for Demo Framing Co. to confirm the money arrived." + "Ref STG2-1410" + toast "Recorded as paid outside QSME". | Flip whoosh, clicks, keyboard, zoom breath, highlighter, pen scribble, checkbox, pending blip |
| 19.58–23.58 | SUBCONTRACTOR'S SCREEN · Only the **receiver** (amber) can confirm it. (19.70) · yellow quote caption **"…don't confirm on a promise."** (20.70) → QSME never touches the money. (22.68) | Only the receiver can confirm it. / Q-S-me never touches the money. | The window **flips** back (19.43–19.78), amber again. "The payer recorded this as paid outside QSME. Confirm once the money has arrived in your account." + "Confirm payment received" (click 20.30). Dialog "Confirm you received this payment". **Push-in ×1.4** (20.60–21.74): "Only confirm if the money has arrived in your account." … **"don't confirm on a promise."** highlighted 20.70–21.30 · "Reference given: STG2-1410" · tick "The money has cleared in my account." (21.92) · "Confirm payment received" (22.22). M2 turns green (22.48): "Settled outside QSME and confirmed by both sides." + "Payment settled · Outside QSME" + toast "Payment confirmed as received". | Flip whoosh, clicks, zoom breath, checkbox, a quiet settled chime at 22.48 |
| 23.58–27.48 | QSME never touches the money. / It keeps the one record / **you both ticked.** (24.33, held 3.15 s) | It keeps the one record you both ticked. | Swipe to a split that rhymes with the spreadsheets: MAIN CONTRACTOR (blue outline) and SUBCONTRACTOR (amber outline) windows, now straight, each showing M2 "Settled outside QSME and confirmed by both sides." · Ref STG2-1410 · "Payment settled · Outside QSME". Callouts STAGE 2 **SETTLED** (24.03) / **SETTLED** (24.18) in green: blue + amber → green. | The same two stamps as PAID/OUTSTANDING, now matching |
| 27.48–30.73 | QSME logo · real qsme.build/contact page cropped to "What happens on a demo?" + "Thirty minutes on a working project that resembles yours." (highlighted 28.33) · **Book a 30-minute demo** (27.98) · qsme.build (28.14) · *(the one call worth jumping on)* (28.78) | Book a thirty-minute demo at Q-S-me dot build. | End card on near-black green with a soft glow. The green pill is the largest thing on the card, then qsme.build, then the note (the callback to "Can we jump on a call?"). | Pen scribble, music resolves |

## The 9:16 re-layout (YouTube Shorts)

Same timeline and clock, laid out separately so it isn't a blind crop. Hook text at 318–560 with the mail window at 566 (scaled .84, so the email and the thread keep their full width and "(It wasn't.)" clears the toolbar). Thread subject at 330/410. Spreadsheet captions at 330/404, chips at 498, sheets at 556, callouts at 1108. In the QSME scenes the recreation label sits on top (y 304), the logo and role chip at 356, captions at 426/494 (the quote captions at 498), and the app at 566 scaled **.9**, drawn at x 45–945 so every line of stationary app text stays left of x 900 (clear of the Shorts action rail) and nothing written goes below ~1375 (toasts sit 70 px in from the window's right edge). The split sits at 690 with the windows at x 46 and 522 (448 wide) so the right-hand SETTLED ends left of x 900. The end card stacks logo 360, contact crop 480, pill 780, qsme.build 934, note 1044. Render it on the Shorts safe box 65,300,1015,1400.

## Captions, hashtags and CTA

### LinkedIn: founder's profile (Tue 27 Oct, 10:30 NZDT)

> Month-end. "Stage 2 payment — not received."
>
> "Paid on the 14th. Remittance attached."
>
> It wasn't attached.
>
> Then: "Nothing attached?" "Reattached." "That's March's." "Which account?" "Can we jump on a call?"
>
> Both spreadsheets were right. According to themselves.
>
> In QSME the subcontractor puts the proof and their invoice on the milestone itself. You pay the way you already pay, then mark it "paid outside QSME" with the reference. Only the payer can do that. Only the receiver can confirm the money has cleared. When they do, both screens say the same thing: "Settled outside QSME and confirmed by both sides."
>
> QSME doesn't check your bank, and the screen says so: "this goes on your word." It never touches the money. It keeps the one record you both ticked.
>
> Book a 30-minute demo: qsme.build
>
> Screens in this cut are recreations with demo data.
>
> *(Drop the line above once Session C is swapped in.)*

**Hashtags (max 3):** #Construction #QuantitySurveying #Subcontractors

**First comment (founder):** "What's the best 'remittance attached' reply you've had this month? No names. The spreadsheets have suffered enough."

### LinkedIn: QSME page repost (Tue 07:30 London)

> Two spreadsheets, both right, according to themselves. In QSME the payer marks a milestone paid, the receiver confirms it cleared, and both sides see one record. Book a 30-minute demo: qsme.build

### YouTube Shorts (`outputs/remittance-attached-9x16.mp4`)

- **Title:** Remittance attached. (It wasn't.) #Shorts
- **Description:** Month-end: "Paid on the 14th, remittance attached." It wasn't. In QSME the subcontractor puts proof and invoice on the milestone, only the payer can mark it paid outside QSME, and only the receiver can confirm the money cleared. QSME never touches the money; it keeps the one record you both ticked. Book a 30-minute demo at qsme.build. Screens are recreations with demo data.
- **Hashtags:** #Shorts #Construction #Subcontractor
- **Pinned comment:** "Only the payer can mark it paid. Only the receiver can confirm it. Book a 30-minute demo: qsme.build"

**CTA (everywhere):** Book a 30-minute demo at qsme.build. Per the owner CTA rule (2026-10-03): no "free", no pricing or fee lines (no "no fees", no "no success fee"), no counts, anywhere: on screen, in captions, hashtags, titles or the cover. Never "secure payments", "release the funds", escrow or payment protection.

**Thumbnail / cover:** the frame at 2.2 s ("Paid on the 14th. / Remittance attached. / (It wasn't.)" over the red circle round "0 attachments"): `outputs/remittance-attached-4x5-thumb.png` (1080×1350) and `outputs/remittance-attached-9x16-cover.png` (1080×1920).

## Music

A dry, minimal office bed: muted plucked synth or a soft marimba at ~96 BPM, a bit sheepish, never "epic". Nothing under the hook except the notification ping (0–2.5). The bed enters with the thread at 2.5 and thins a little with every reply, as if it's losing the will; it drops out for "Can we jump on a call?" (6.18–7.53). It comes back for the spreadsheets, a touch tenser. From the QSME swipe (10.63) it settles into a steady, warmer pulse under the clicks, dips for the two push-ins and ticks (16.13–17.9, 20.6–21.92), lifts slightly at "Settled" (22.48) and on the split, and resolves on the end card (27.48). Use royalty-free (YouTube Audio Library or similar, licence noted here) or ElevenLabs Music after the upgrade; anything branded or reused across QSME videos goes through ElevenLabs Music for a commercial licence. No trending or copyrighted tracks on LinkedIn.

## Owner recordings to swap in (required before publishing)

**Session C setup (demo data):** the demo Global project in the Australia org (as in Session B), with a **direct or awarded contract "Framing package"** for project "Wharf Street Apartments (demo)" between two demo accounts: **payer "Demo Builders"** (project owner) and **receiver "Demo Framing Co."**. Three milestones: **M1 Mobilisation 20 %** (already settled outside QSME, ref STG1-0909), **M2 Frame & trusses 45 %**, **M3 Close-in & handover 35 %**. Record on the web at 1920×1080 or higher with the browser **zoomed to 150–175 %** and the window about 1000–1100 CSS px wide so the milestone column fills the frame; crop the URL bar to app.qsme.build or out; no real names or emails anywhere. **Crop every amount and currency** (the row meta reads "45% of contract · AUD …" and both dialog subtitles read "M2 · Frame & trusses · AUD …"): frame them out or blur in the edit. **Keep the row pill and the payer's "Review and release …" sentence out of frame** unless the pills have been renamed (see the publish condition). Use the demo photo `assets/qsme/broll/th-4-structure-still.v1.jpg`, a one-page demo invoice PDF ("Demo Framing Co. · Invoice INV-0206 · demo") and a one-page demo remittance PDF named **Remittance_14-10.pdf** ("Demo Builders · Remittance advice · Stage 2 · demo"), no real details.

| # | Stand-in it replaces (timestamp) | Exact screen | Click path | Demo data / setup | Record | Notes |
|---|---|---|---|---|---|---|
| 0 | — (a check, not a shot; do it first) | Payer's M2 dialog and the row pill | Open M2 as the payer before any proof, then after proof | As above | Screenshots | Confirm the pill wording ("Ready to release" / "Released" on main 2026-10-03) and whether a rename has shipped; confirm the dialog subtitle includes the amount (it should: `{work} · {amount}`). Decide the crop before recording #1–#3. |
| 1 | 10.63–14.43 (subcontractor submits) | Receiver account → the contract's work area → Milestone timeline → M2 open | Type "Frame and roof trusses complete." in "Describe the work completed…" → choose the demo photo → **Submit progress** → **Upload invoice** → pick the demo PDF | M2 open, nothing submitted yet | 8 s, cursor slow, 1 s hold after each toast | Our photo fly-in stays as an overlay (it's labelled "demo photo"); line it up with the real file field. Note the real toasts ("Progress submitted", "Invoice attached to this milestone"). |
| 2 | 14.43–19.58 (payer marks it paid) | Payer account → same contract → M2 | **I paid outside QSME** → type **STG2-1410** in "Payment reference" → pause 1 s on the warning → in "Attach the invoice or receipt (optional)" **attach the demo remittance PDF Remittance_14-10.pdf** → tick **"I have sent the money."** → **Mark as paid** | After #1 | 10 s; rest the cursor 0.5 s on the checkbox before ticking; hold 2 s on "Awaiting confirmation" | Keep "QSME has no bank record of a payment made outside it, so this goes on your word." and the file name readable: we push in on the warning, highlight "so this goes on your word.", quote it as a caption and add "(Actually attached.)" on top. |
| 3 | 19.58–23.58 (receiver confirms) | Receiver account → M2 | Refresh → **Confirm payment received** → tick **"The money has cleared in my account."** → **Confirm payment received** | After #2 | 9 s; pause 1 s on the warning; hold 2 s on "Payment settled · Outside QSME" | We push in, highlight "don't confirm on a promise." and quote it as a caption on top. |
| 4 | 23.58–27.48 (both screens, same record) | Both accounts → M2 after settlement | No clicks: 3 s still of each, identical framing (two browser profiles side by side, or one after the other) | After #3 | 2 × 4 s | Our party chips, the blue/amber window outlines, the STAGE 2 SETTLED callouts and the captions stay on top. Pill out of frame unless renamed. |
| 5 (optional, not in this cut) | — (for the long-form "one record" explainer) | Payer account → Project money → **Money out** tab → "Paid" | Scroll to the Frame & trusses row | After #3 | 4 s | Main shows "Money out" / "Still to pay" / "Paid" here, not the "Cost paid" tile the calendar named (that label is an unused string since 8 Aug). Check whether the row and the Money out total change at "Mark as paid" or only after the receiver confirms before any video says which. Crop amounts. |

## Integrity notes (every claim and the truth-sheet feature it rests on)

| Claim or element in the video | Rests on (truth sheet `research/2026-10-02-qsme-platform-truth.md`, and the origin/main strings where noted) |
|---|---|
| "Proof and invoice, on the stage." / the note, photo, "Submit progress", "Upload invoice", "Proof submitted by …", "View attachment", "View contractor invoice", "Edit submission" | 10.1 Milestones (✅ live): "The contractor submits what they did (description, photos, their invoice)"; exact strings from `contracts.json` → `work.*` and `milestones.*` |
| "Not in an inbox." | 10.1 pains solved ("Invoices and proof living in someone's inbox"); the invoice is filed in Documents → Invoices |
| "Only the payer can mark it paid." / "Only the receiver can confirm it." | 10.1 facts: "Only the paying side marks paid; only the receiving side confirms; one person cannot be both" |
| "I paid outside QSME" as the payer's only action (no bank button) | 10.1 + Global specifics ("recorded, never moved"; bank routes answer 403); `settle-actions.tsx`: outside is the only button when open banking isn't available |
| Dialog wording: "Record this as paid outside QSME", "Only mark this as paid if you have actually sent the money.", "QSME has no bank record of a payment made outside it, so this goes on your word. …", "Payment reference", the hint, "Attach the invoice or receipt (optional)", "I have sent the money.", "Mark as paid" | 10.1 exact wording; full strings from `settlement.json` → `markPaid.*` on origin/main |
| "Confirm you received this payment", "Only confirm if the money has arrived in your account.", "… don't confirm on a promise.", "Reference given: …", "The money has cleared in my account.", "Confirm payment received" | 10.1; `settlement.json` → `confirmReceipt.*` |
| Quote captions "…so this goes on your word." and "…don't confirm on a promise." | Exact substrings of the two dialog warnings (`settlement.json` → `markPaid.*`, `confirmReceipt.*`), shown on the same screen at the same time; they quote the product's own honesty line, not a claim of ours |
| The payer attaching "Remittance_14-10.pdf" and the note "(Actually attached.)" | 10.1 ("The payer pays however they like and records it with a reference and optional receipt"); the field label "Attach the invoice or receipt (optional)" is `markPaid.*` on main. The file is fictional demo data; the red handwriting is our annotation (same style as "(It wasn't.)"), a callback joke, not UI |
| Blue = main contractor (payer), amber = subcontractor (receiver), green = settled; the window flip on each change of screen | Our editorial colour code (set by the thread avatars and spreadsheet chips), not QSME UI; the window outline and URL-pill tint are overlays on the recreation |
| "Awaiting confirmation", "Recorded as paid outside QSME. Waiting for … to confirm the money arrived.", "The payer recorded this as paid outside QSME. Confirm once …", "Ref …" | 10.1 status words; `projects.json` → `awardedWork.state.awaitingConfirm`; `settlement.json` → `state.*`, `history.reference` |
| "Settled outside QSME and confirmed by both sides." on BOTH screens; "Payment settled" + "Outside QSME" badge | 10.1 exact wording; `milestone-action-panel.tsx` evaluates "settled" before the role, so payer and receiver see the same sentence; `payment-source-badge.tsx` |
| Toasts "Progress submitted", "Invoice attached to this milestone", "Recorded as paid outside QSME", "Payment confirmed as received" | `contracts.json` → `toasts.*`; `settlement.json` → `toasts.*` |
| "QSME never touches the money." | 10.1 fact-check ("a record of a payment, not a payment"; Global: "recorded, never moved"); "NOT A FEATURE: escrow" (QSME does not hold anyone's money) |
| "It keeps the one record you both ticked." | 10.1 ("You settle up off QSME and record it here so both sides have the same record."); the two ticks are the two checkboxes on screen |
| Never shown or said: verifying the transfer, "secure", "release", escrow, payment protection, a Dispute button, a bank button, open banking | 10.1 and 10.2 DO NOT CLAIM; red list. The highlighted "so this goes on your word." makes the no-verification point on screen |
| No "Ready to release" / "Released" pill, no "Review and release …" or "They will release the money from here." | Real strings on main (`projects.json` `awardedWork.state`, `contracts.json` `panel.*`) left out on purpose: release language implies held money (red list) |
| No amounts or currency on any QSME screen; no GST/tax label; percentages only ("45% of contract") | Calendar guardrail "Crop currency and GST labels"; Global tax-label limit |
| "M2 · Frame & trusses", node labels M1–M3 | `milestone-action-panel.tsx` workLabel `M{sequence} · {label}`; `milestone-accordion.tsx` nodes |
| Layout of the work area, the URL bar, the header line "Framing package · Wharf Street Apartments (demo)", the file field's look | Not verified (illustrative); replaced by Session C |
| Email thread (dated Wed 21 Oct), the "0 attachments" strip, the two spreadsheets, 49,500.00, "Remittance_14-03.pdf", times and dates | Generic, unbranded skit UI with invented story data; roles only, no names; not QSME UI and not a claim |
| "Demo Builders", "Demo Framing Co.", "Wharf Street Apartments (demo)", STG2-1410, Remittance_14-10.pdf | Fictional demo data; no real customer, company, address or bank reference |
| The site photo | `assets/qsme/README.md`: AI-generated brand b-roll already live on the site, fine for both editions; labelled "demo photo", never presented as a real customer's site |
| End card page: "What happens on a demo?" + "Thirty minutes on a working project that resembles yours." | Live public page https://qsme.build/contact, re-captured 2026-10-04 04:27 NZDT (no login, nothing typed) as a crop of just that heading and its first line; it backs the "30-minute demo" CTA. The page headline and the intro paragraph are out of frame: the paragraph carries the reply promise "within two business days", which truth sheet 12.8 still marks for the owner to confirm, so the video does not repeat it. Nav and footer (+64 number, .co.nz email) are outside the crop |
| CTA "Book a 30-minute demo · qsme.build" and "(the one call worth jumping on)" | Owner CTA rule 2026-10-03 (demo CTA only; no "free", pricing, fees or counts); the note is a callback joke on us, not a claim |
| People | None on camera. No AI people presented as anyone (the b-roll workers are tiny, unidentifiable brand footage), no testimonials. VO narrator is a fictional QS (synthetic voice, labelled if used) |
| Words | Global vocabulary only: "subcontractor", never "tradie"; no GST; no competitor names; no counts; no time-saved claims |

## Changes from the calendar slot (fact-check, 2026-10-04)

1. **"Claim 6" became "Stage 2".** The demo contract has three milestones and QSME labels them M1–M3, so a "Claim 6" thread cut to a "Stage 2" milestone would read as two different payments. Now the thread ("Stage 2 payment — not received"), both spreadsheets and the QSME milestone are the same payment, which is what makes "the one record" land.
2. **The Project money flash became the both-screens split.** The slot asked for "Cost paid" updating. On origin/main "Cost paid" / "Total cost committed" are unused strings (`payments.json` → `dashboard.*`); since commit d2163f90 (8 Aug) the page shows "Money out" with "Still to pay" and a "Paid" list. The project's paid total is summed from milestones' recorded `paid_amount`, and the awarded-work service notes its own total counts "every dollar recorded as paid, CONFIRMED OR NOT", so a flash right after the receiver's tick could imply the confirmation moved it. The split (both parties' screens reading "Settled outside QSME and confirmed by both sides.", STAGE 2 SETTLED / SETTLED) answers the PAID / OUTSTANDING spreadsheets directly and only shows what is certainly true. Project money moves to optional shot #5 for the long-form, with the correct labels.
3. **"Release" wording kept off screen** (row pills and two panel sentences on main use it). See the publish condition and open question 2.

## Footage and public captures

- **Used:** `assets/qsme/broll/th-4-structure.v1.mp4` (0.5–2.3 s → `motion/clips/frame/`, 53 frames) as the demo proof photo; a hi-res crop of the live public page https://qsme.build/contact, "What happens on a demo?" + its first line only (`motion/stills.json` → `motion/clips/stills/contact-demo-line.png`, captured with `motion/still.mjs`, adapted from the "claude-writes-my-tender" project); `motion/qsme-logo-nor.svg` (group opacity removed, so the wordmark renders in full #3DC023); `motion/qsme-mark.svg` (the Q brand mark, in the app's URL pill).
- **Kept but unused:** `motion/clips/stills/contact-demo.png` (the v1 end-card crop). It includes the contact page's intro paragraph with the unconfirmed "within two business days" promise: don't reuse it.
- **Not used, and why:** `payments.mp4` and `awarded-work.mp4` (banned: "release the funds", "platform fee"); the qsme.build homepage hero and the solutions pages (they say "compares bids line by line", and "retention … released at the end"); the Knowledge Hub "How payments work" article (qsme.co.nz, NZ copy with open banking and fees: wrong edition for a Global video). No public page shows the milestone panel, so the product beats wait for Session C.

## Paid cut (only if organic earns it)

Run this hook against the two-voice hook from `gl-i-paid-you-last-week` ("I paid you Friday." / "Nothing's landed.", lines in `vo-script.md`), with the body unchanged from 2.50 s. Only after the user says yes to a budget.

## Open questions for you

1. OK to post the labelled recreation (now rendered with `PUBLIC_LABEL = true`, "Recreated screen · demo data" on every product frame, and the caption line "Screens in this cut are recreations with demo data") if Session C slips past Tue 27 Oct? Or hold it?
2. Can the dev team rename the milestone row pills "Ready to release" / "Released" to "Work submitted" / "Settled" (and soften "Review and release …" / "They will release the money from here.") before Session C? Otherwise every recording of this feature has to be framed around them.
3. ~~Who reads the VO~~ Answered 2026-10-06: Cam S on eleven_v3, one narrator for every video (owner, N01 pilot).

## Discussion history

- 2026-10-02: Idea `gl-remittance-attached` generated and fact-checked in the content-programme workflow; slot Tue 27 Oct, week 4 (money week opener).
- 2026-10-04: Produced (this run). Read the strings for the milestone panel, both settle dialogs, the toasts and Project money from origin/main (read-only) so the recreation uses the exact wording. Built the hook email, the RE:-stacking thread, the two disagreeing spreadsheets, the three QSME beats (subcontractor submits, payer marks paid on their word, receiver confirms), a both-screens split that rhymes with the spreadsheets, and an end card on the real qsme.build/contact page with a callback note "(the one call worth jumping on)". Creative-director passes: fixed a class clash that blacked out the thread, a hang from a missing clip frame, the textarea placeholder pushing text right, the cursor resting on "Cancel" in the receiver dialog (now rests beside the checkbox), slower dialog fades (now 0.08 s, no ghosting), bigger dialog type, the scrolled receiver view peeking under the URL bar, the end-card crop showing a half line, and the split cards' empty lower half. Changed "Claim 6" to "Stage 2" and the "Cost paid" flash to the split (see "Changes from the calendar slot"). Rendered 4:5 and 9:16, QA passed on both safe boxes, frames reviewed. VO script written (17 lines + paid-test hook).
- 2026-10-04: Review pass (verdict "fix", claims check clean) applied and re-rendered, same output paths. Must-fix: the scrolling email header no longer paints over the toolbar (`.win .bar` z-index + a clip box under it); the internal "Illustrative — swap…" note is replaced by the public label "Recreated screen · demo data" (`PUBLIC_LABEL = true`) and the caption line is now part of the post. Should-fix: the hook turns at 1.2 s (scroll 0.15–0.70, circle 0.75–1.10, "?" 1.05, "(It wasn't.)" 1.20) and has an obvious target ("0 attachments" strip from frame 0), A1 cut to 2.50 and everything after shifted −0.42 s; ×1.4 camera push-ins on both dialog warnings plus yellow quote captions, highlights now draw over 0.6 s; the payer now attaches "Remittance_14-10.pdf" with a red "(Actually attached.)" callback (Session C #2 updated); "payer" in main-contractor blue, "receiver" in subcontractor amber, window outline and URL pill tinted per role, a card flip at each change of screen, and the split keeps blue + amber → green; the split holds 3.9 s (caption 3.15 s), the "Awaiting confirmation" hold trimmed to ~1.0 s; the end card now crops the contact page to "What happens on a demo?" + its first line (no headline, no "within two business days" paragraph) and the green pill is the largest element; the 9:16 app is .9 (was .77), drawn at x 45–945, clear of the Shorts rail, rendered on a Shorts box 65,300,1015,1400; the Shorts description note reworded. Nice: email dated Wed 21 Oct; the wordmark at ~130 px in full green plus the Q mark in the URL pill; the "Awaiting confirmation" pill pops ×1.2 with an amber ring. New length 30.73 s (inside 27 s ±15 %). VO re-timed, one line added ("Actually attached."), `vo_status.py` ok. New covers at 2.2 s.
- 2026-10-06: Audio-first remake to the owner's approved N01 standard (producer run). Script rewritten as continuous speech with the hook spoken ("Paid on the fourteenth. Remittance attached. It wasn't."), one dry storyteller reading both sides of the thread, the product payoff plain (proof and invoice on the stage; only the payer marks paid, "this goes on your word"; only the receiver confirms, "don't confirm on a promise"; QSME never touches the money, one record you both ticked), Global CTA spoken. Cam S eleven_v3, ONE unbroken with-timestamps take: attempt 1 51.8 s (fuller script, fine but long), attempt 2 50.9 s (a 1.33 s gap at a mid-script [amused] tag), attempt 3 = the take (46.0 s, 110 words, 2.39 words/s, longest silence 0.56 s, STT: every word heard). Both cuts re-timed to the words (T + word-anchored DB/EB/FB/GB/HB blocks in `motion/remittance-attached.js`), page 47.5 s, QA ok on both safe boxes, frames spot-checked, v1 masters/sheets/covers archived in `outputs/archive/`, muxed clean at 0.0 s → `outputs/remittance-attached-4x5-with-vo.mp4` + `-9x16-with-vo.mp4`, covers re-exported at 3.6 s. `vo-script.json/.md` rewritten (10 lines lifted from the take; the 18-line plan and the paid-test hook lines retired). No deploy, no git.
- 2026-10-07: Resumed after the session limit. Found the remake half-done on disk (section above written, timeline re-timed, take + archive in place, but masters still the 30.7 s v1 files and no voiced files). Re-rendered 4:5 + 9:16 (47.50 s, QA ok on 60,60,1020,1290 and the Shorts box 65,300,1015,1400; the generic 1250 Reels box only flags the recreated app's own lower-band UI text, as designed), muxed `outputs/remittance-attached-4x5-with-vo.mp4` + `-9x16-with-vo.mp4` (take at 0.0 s, gain 1.15, no bed, one audio track each), spot-checked 16 word-moment frames, covers re-exported at 3.6 s. Nothing else changed. `.preview.mp4` files are rebuilt by `npm run publish` (not run here). No deploy, no git.
- 2026-10-10: Voice-over rollout check. The two voiced files the 2026-10-07 note lists were not on disk (only the silent 47.5 s masters were). Re-muxed the unchanged take (Cam S v3, 46.76 s file, 0.0 s, gain 1.15, no bed) onto both current masters → `outputs/remittance-attached-4x5-with-vo.mp4` + `-9x16-with-vo.mp4` (AVFoundation probe: 1 video + 1 audio track each, duration 47.50 s = video). Spot-checked 24 word-moment frames per cut from the voiced files (hook circle/"?"/"(It wasn't.)", each thread reply, PAID/OUTSTANDING, proof/invoice clicks, "Not in an inbox.", both quote captions, "(Actually attached.)", settled, SETTLED ×2, pill, qsme.build, the note): all land on their words. Refreshed the stale 30.7 s Studio previews and added the two `-with-vo.preview.mp4`. No new take (the 3-attempt cap was used on 2026-10-06), no re-render, no deploy, no git.
- 2026-10-10: Review fix (verdict "fix"). The 2026-10-06 take's with-timestamps alignment drifted ~0.8 s early (up to 1.6 s at pauses, ending at 46.0 s against a 46.76 s file), so the picture landed ahead of the words, and the take really had five 1.0–1.46 s silences at the blank-line paragraph breaks plus a low-energy 2.39 words/s read under `[dry]`. From now on this project times from **forced alignment** (`/v1/forced-alignment`), checked against STT word timestamps and an RMS scan. New Cam S eleven_v3 take, one unbroken request, script sent as one paragraph with `[confident]`: attempt 4 (45.5 s, still 1.06–1.1 s gaps, 'It wasn't' at 3.44), attempt 5 (38.3 s, gaps ≤0.82 s, but STT heard "That's March's" as "That's matches"), attempt 6 = the take ("That's the March one."; 39.97 s, 116 words, 2.92 words/s, longest gap 0.90 s, STT: every word heard). ~2,000 characters used. Timeline re-timed to the forced-alignment words (end card now starts after "ticked."), thread card 3 now reads "That's the March one.", page 41.5 s; both cuts re-rendered (QA ok), muxed clean at 0.0 s/1.15, probed (1 audio track, 41.50 s = video), 25 frames per cut checked at the real word times; 47.5 s masters archived as `*-v3.mp4`; previews rebuilt; vo-script.json/.md rewritten (character note: warm, quick, wry; no deadpan). No deploy, no git.
