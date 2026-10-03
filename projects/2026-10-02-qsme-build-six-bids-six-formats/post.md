---
title: "Six bids. Six formats."
venture: qsme-build
idea: qsme-build-six-quotes-six-formats
status: draft — awaiting approval
figma: https://www.figma.com/design/f8xxaFvwdi6ijGxYj9WEWP
created: 2026-10-02
---

# Six bids. Six formats.

**The joke in one sentence:** A deadpan QS counts through six bids for the same plasterboard & ceilings package (a PDF scanned sideways, a spreadsheet of merged cells, a lump sum 'as discussed', an email that says 'price below' with nothing below, the cheapest one that excludes ceilings on page 9, and a photo of a whiteboard), decides the whiteboard was the most complete bid of the lot, then admits their own tender email just said 'drawings attached, please price.'

**Job:** Organic first, then paid. Over four weeks, post organic from the founder's personal LinkedIn profile, with the QSME page reposting each one: week 1 the reel (Hook 1), week 2 the carousel (Hook 4's framing on slide 1), week 3 the static, week 4 the Hook 2 binder static. This gives a directional read on which hook and format QSs and PMs comment on and share. Run the clean hook split (Hook 1 vs Hook 4) only in paid, as a 35s cut with the full ad anatomy, and boost the winning organic post as a Thought Leader Ad if LinkedIn supports that format. There is no real social proof yet, so the paid version relies on problem→solution and demo.

**Platforms:**
- LinkedIn (primary), posted from the founder's personal profile and reposted by the QSME page: feed video (week 1), document carousel titled 'Six bids. Six formats.' (week 2), single image (week 3), Hook 2 binder single image (week 4)
- LinkedIn Ads (only if organic shows signal): 35s video ad, Hook 1 vs Hook 4, Lead Gen Form with the 'Request demo' button; carousel as a document ad
- YouTube Shorts (9:16 re-export; qsme.build large on the end card for at least 2.5s; related-video/channel link to the demo page)
- Instagram / Facebook (optional cross-post: 4:5 static and carousel, 9:16 reel; IG CTA 'link in bio', FB full tracked URL in the caption)

## Production status (updated 2026-10-03)

| Piece | State | Where |
|---|---|---|
| Kinetic text-on-screen video, LinkedIn 4:5, 29.8s, silent (burned-in captions) | ✅ Re-rendered 2026-10-03 after the review (see Discussion history): corner label now 'Illustrative · demo data'; 'Compare bids' shows bid totals excl. tax only (no incl. column, 'calc.' or Compare-on toggle); no agreement/e-sign line; end-card wordmark without ®; captions match the VO word for word. Same Figma-API script through the shim, rendered with tools/motion (`motion-src/six-bids.kit.html` → make.mjs), QA passed on the 4:5 safe box 60,60,1020,1290, frame-checked | `outputs/six-bids-linkedin-4x5.mp4` · `outputs/six-bids-linkedin-4x5-frames.png` (copied to `outputs/six-bids-frames.png`) |
| Shorts / Reels 9:16 cut of the same video, 30.3s, silent (burned-in captions) | ✅ Rebuilt 2026-10-03 from the new 4:5 master, frame for frame, with a 'camera' on it for phone reading: the hook block at 1.15x (0–2.4s), a 1.4x snap-zoom on 'Note 14: Excludes ceilings.' (11.7–12.8s), the email at 1.15x (17.5–20.2s), the product beat at about 1.3x (20.2–27.2s: table rows ~32px, 'Lowest' ~25px), and 'Bidders never see your rates or budget.' as a small third caption line (21.45–22.77s). While punched in, a top cover hides the master's own logo/label/counter, so only the band's wordmark shows; the band clears by 27.13s; the end card is held 0.5s longer (qsme.build on screen ~3s). Shorts cover frame: about 1.9s (all six 4:59 banners up). Made 2026-10-02 from the 4:5 master, frame for frame (no re-edit): the master sits scaled 0.68 inside the 9:16 safe box; a branded top band ('Tender day' kicker, small QSME wordmark, six bid segments that fill with the 0/6 → 6/6 counter and close into one bar on 'Six bids. One table.'; from 20.2s the kicker reads 'Illustrative · demo data', because the master's own label is small at 9:16); a bottom band re-sets each caption at 60px (same words, highlights and cut frames as the master, whose small captions it covers); the end card steps up 1.3x so qsme.build and the demo button read on a phone. No new claims. QA passed on 65,300,1015,1250 and on the stricter 150,300,930,1250 (text 150px clear of the right-hand buttons), frame-checked | `outputs/six-bids-9x16.mp4` · `outputs/six-bids-9x16-frames.png` · source `motion/six-bids-9x16.html` (frames in `motion/clips/master`) |
| Static (graphic version), six print props, 8-slide carousel | ⏸ Scripts ready, not yet in Figma (Starter MCP limit hit before page 02 was built). Hold for week 1. `03-section2-carousel.js` slide 8 fixed 2026-10-02: 'Same lines. One table. Award.' (was 'Side by side'), the placeholder asks for the 'Compare bids' totals table (not a per-line grid), and the body matches post.json | `figma-scripts/01…03-*.js` |
| Motion as a native Figma frame | ⏸ Script ready (then `export_video`) | `motion-src/04-motion.figma.js` |
| Photo version of the static / carousel (real printed props on a real desk) | ⬜ To shoot (props print from the Figma frames) | static_post.visual_description |
| Real QSME product screens (demo data) | ⬜ Needed for the paid cut. The video uses illustrative stand-ins labelled 'Illustrative · demo data' on screen. Owner screen-records (signed-in, Global demo organisation) these shots: (1) the bidder's view of the tender, same lines with the rate column empty; (2) 'Compare bids' with six demo bids: the totals excl. tax column and 'Lowest' only (crop out the GST/incl. columns and the 'Compare on' toggle until Global tax naming covers the comparison: today it says GST and works 'calc.' figures out at 15%); (3) open a bid → 'Award bid' → contract with milestones and retention. Not for Global until the owner answers open question 4 (NZ-law templates): (4) Agreements, 'Make the agreement' → 'Send for signing'. | product beat 20.2–27.2s |
| VO | 🟡 Timed Kiwi performance script ready (`vo-script.md`, 12 lines on the 29.8s MP4 timeline, word for word with the captions since 2026-10-03); casting in projects/2026-10-02-qsme-voice-casting; generate with `tools/make_vo.py` after ElevenLabs upgrade. The same script and times apply to the 9:16 cut (same 29.8s timeline, frame for frame), so there is no separate 9:16 VO script: mux the same clips onto both MP4s (the 9:16 just runs 0.5s longer on the end card) | vo-script.md |
| Sound bed (no generated audio) | ⬜ Both MP4s have no audio track. LinkedIn autoplays muted, so the 4:5 can go out silent. **Hold the Shorts/Reels post** until it has a bed: either the VO, or an owner phone recording of 60s of room tone plus real foley at these times (seconds on the 9:16 file): six message pings from 0.95 (one every 0.15s, to about 1.86), paper slide 2.4, trackpad click 4.75, phone tap 8.3, page flicks 11.1 / 11.3 / 11.48, highlighter 11.8–12.2, marker underline 14.25–14.68, soft UI ticks 20.17–20.82 (sheets) and 22.95–23.35 (rows), click 24.75 (row F) and 25.35 ('Award bid'). Mux with `tools/mux outputs/six-bids-9x16.mp4 outputs/six-bids-9x16-with-bed.mp4 roomtone.m4a@0@0.2 ping.m4a@0.95 ping.m4a@1.10 …` (the same times work on the 4:5) (no library or trending audio) | Music / Voice above |
| Music | ⬜ Minimal pulse from the product beat (ElevenLabs paid plan) | Music above |

Numbers to sign off: skit totals C "72,000 + tax" and E "47,900 + tax"; the illustrative 'Compare bids' totals are fictional demo figures, shown excl. tax only (A 74,850 · B 76,200 · C 72,000 · D 73,480 · E 71,940 · F 71,300 'Lowest'; no incl. tax or 'calc.' figures on Global since 2026-10-03); the bid popover reads '71,300 excl. tax'; 'Retention 5%' is a demo value; the award goes to Bidder F (the whiteboard, same 71,300 total). E is 47,900 in the skit and 71,940 in the table: a detail for QSs who notice, never captioned as 'no more exclusions' or 'QSME catches exclusions' (bidders can still send a total-only quote, and emailed PDFs join the comparison).
Trademark: the Global outputs use the wordmark without ® (end card and the 9:16 band) until the owner confirms where QSME is registered (truth sheet, open question 7). Put it back only if it is registered in the markets the post targets.
Fixed 2026-10-02: the blank/dim frames at the whiteboard cut (12.8s) are gone: the board is on screen from the first frame of scene F.
Figma: https://www.figma.com/design/f8xxaFvwdi6ijGxYj9WEWP

## Hooks

### 1. Mid-action start (deadpan count), made readable with sound off  ✅ chosen

- **Text:** Large, top third: '6 bids. 6 formats.' Small chip: 'Tender closed 5:00pm'. Counter '0/6' top-right. The six banners on the foreground phone are each stamped '4:59 pm'.
- **Verbal:** "Six subbies. Six quotes. Six formats."
- **Visual:** Frame 1: a phone propped in the soft-focus foreground. Six generic 'New message' banners (subject 'Tender – Plasterboard & ceilings', each stamped 4:59 pm, no OS or app logos) stack down its lock screen 0.15s apart. Behind it the QS, already mid-sigh at their own desk in window light, stares into the lens, with the six bids fanned out in front of them. Focus racks from the phone to their face on 'Six formats.'
- **Audio:** Six generic message pings within about 1s, synced to the banners (not an Outlook or iOS sound), then dead silence as they speak
- **Why:** Every QS and PM knows tender close. With sound off there are now four layers: the big text, the banners that make the pings visible, the everyone-at-4:59 joke, and the rack focus. The 0/6 counter keeps people watching to see what #6 is, and the whiteboard stays the peak of the escalation. 'Subbies' stays in the VO only until the markets are confirmed.

### 2. Pattern break (odd object)

- **Text:** 'This is a tender submission.'
- **Verbal:** (one beat of silence) "...This is a tender submission."
- **Visual:** A phone photo of the whiteboard bid (marker prices, flash glare in one corner, half-erased site sketch) slid into a clear sleeve labelled 'TENDER – PLASTERBOARD & CEILINGS – BIDDER F' and clipped into a ring binder
- **Audio:** Marker squeak, then a binder ring snapping shut
- **Why:** The strongest single frame, but it spends the punchline in second 1. Used as the week-4 single-image static, captioned 'This is a tender submission.', after the reel, carousel and static have run. It could be a paid hook test later. Never the reel opener.

### 3. Asterisk reveal (insider fine print)

- **Text:** 'Cheapest bid. By a mile.*'
- **Verbal:** "Cheapest bid. By a mile."
- **Visual:** Bid E's total circled in red pen. A highlighter drags down the page to a tiny asterisk, then a snap to page 9: '*Note 14: Excludes ceilings.'
- **Audio:** Room tone, then one highlighter squeak
- **Why:** Every QS has been burned by the cheapest bid's fine print. The on-screen asterisk carries the joke with sound off, and the package name ('& ceilings') makes the exclusion land. No countdown graphics, so it stays UGC. It uses up Bid E's beat, so it works as a standalone short or a later paid hook test, not as the reel opener.

### 4. Contrarian (parody of LinkedIn's thought-leader voice)

- **Text:** 'Unpopular opinion: the best bid was a photo of a whiteboard.'
- **Verbal:** "Unpopular opinion: the whiteboard bid wins."
- **Visual:** The QS holds the phone up to the lens showing the whiteboard photo, completely straight-faced. The five 'proper' bids sit in a neat, ignored pile beside them.
- **Audio:** Room tone only; one pen click at the end of the line
- **Why:** High curiosity (why would that win?), and it takes the subbie's side from second 1. At 6 words (about 2.4s) it is trimmed to exactly 2.5s like Hook 1, so the body starts on the same frame. In this variant only, the 6/6 VO becomes the callback 'And yes… the whiteboard.' and the snap-zoom onto 'CEILINGS … INCL' does the work. Its framing, without the reveal, gets an organic read as carousel slide 1. The paid A/B challenger.

### 5. Dialogue cold-open (the subbie wins)

- **Text:** 'Subbie, 4:59pm:'
- **Verbal:** Speakerphone, cheerful: "Did you get my price?" QS, staring at the phone: "I got… a photo. Of a whiteboard." Speakerphone: "Yep. Ceilings are in."
- **Visual:** Phone on speaker lying on the desk. The QS looks at the photo, then slowly at the camera.
- **Audio:** Ringtone cut off mid-ring, compressed speakerphone voice
- **Why:** Rewritten so the subbie wins the exchange, and 'Ceilings are in' calls back the cheapest bid. It needs a second voice (a real person, or a clearly fictional ElevenLabs voice). Parked as a part-2 post told from the subbie's side, not the reel hook.

**Why the chosen hook:** Hook 1 (mid-action count, index 0). Tender close is a ritual every QS and PM has lived through, so this LinkedIn audience recognises it instantly. With the stacking 4:59 banners, the big '6 bids. 6 formats.' text and the rack focus, it now reads with sound off, which is how LinkedIn autoplays. The 0/6→6/6 counter keeps people watching, and the whiteboard is saved for the peak rather than spent in frame 1. Hook 4 (contrarian) is the paid A/B challenger and gets an organic read through carousel slide 1.

## Static post

- **Size:** 1080x1350 (4:5) for the LinkedIn and IG/FB feed. The 1200x1500 export is dropped because it has the same ratio.
- **Headline:** Six bids. Six formats.
- **Subline:** Next tender: one schedule. Every bidder gets the same lines.
- **CTA:** Book a 30-minute demo at qsme.build

**On-image content:**

- Top band, small muted kicker: 'Plasterboard & ceilings package · Tender closed 5:00pm'
- Top band, headline: 'Six bids. Six formats.'
- Top band, subline in brand green: 'Next tender: one schedule. Every bidder gets the same lines.'
- Label 'A · sideways PDF' (printed header on the prop reads 'Quote_FINAL_v3_revised(2).pdf')
- Label 'B · merged cells' (rows 12–40 selected as one block on the laptop)
- Label 'C · "as discussed"'
- Label 'D · "price below"' (phone shows 'Price below. Cheers.' and empty white below)
- Label 'E · page 9' (note 14 highlighted: 'Excludes ceilings.')
- Label 'F · whiteboard' (phone shows the whiteboard photo with 'Ceilings … INCL' underlined twice)
- Handwritten sticky note beside F: 'most complete one, honestly'
- Footer: QSME logo · qsme.build · Book a 30-minute demo

**Look:** Headline and subline sit on a solid #0C1310 band across the top 22%: kicker in muted #A9B8AE, headline in Space Grotesk SemiBold at 72px or more in #EEF4EF, subline in brand green #3DC023. Below the band is a real overhead phone photo, not a render. The six props (designed in Figma, printed) lie on a real, slightly cluttered desk in window light: a coffee ring, a highlighter, the edge of a hi-vis vest on the chair. A: a printout with grey scanner edges, rotated 90°, its printed header reading 'Quote_FINAL_v3_revised(2).pdf'. B: a laptop showing a generic spreadsheet (no Excel logo or ribbon) with one huge merged block selected. C: a plain 'Bidder C' letterhead with one total and 'As discussed.' D: a phone showing a generic mail app, 'Price below. Cheers.' and empty white below. E: a stapled quote open at page 9 with note 14 highlighted yellow; its total is visibly the lowest. F: a phone showing the real whiteboard photo (glare in one corner) with the yellow sticky note beside it. Labels are three words or fewer, 32px or larger, white on small dark tabs. The sticky note is the one thing left to read up close. Small QSME mark in the footer. No stock people, no gradients, nothing that looks like a SaaS banner.

## Carousel

### Slide 1: Unpopular opinion: the best bid here is Bid F.

Six bids. Six formats. Let's open them. →

*Visual:* Real overhead flat-lay of the six bids on the desk (a second set-up from the static shoot). Bid F is a phone lying face-down with a yellow sticky note marked 'F' on its back, so the reveal is saved for slide 6. Counter '0/6' top-right, small QSME mark bottom-right.

### Slide 2: Bid A. Bid B.

A: a PDF. Scanned. Sideways.  
B: a spreadsheet where rows 12 to 40 are one merged cell.

*Visual:* Split frame. Left: the sideways scan with grey scanner shadow and the printed header 'Quote_FINAL_v3_revised(2).pdf'. Right: a generic spreadsheet with rows 12–40 selected as one giant merged block. Counter '2/6'.

### Slide 3: Bid C.

One number. Two words: 'As discussed.'

*Visual:* Plain letterhead reading 'Bidder C' with a single total. The words 'As discussed.' are circled in red pen with a small '?' in the margin. Counter '3/6'.

### Slide 4: Bid D.

"Price below. Cheers."

*Visual:* Hand holding a phone with a generic mail app: 'Price below. Cheers.', then a long, empty white scroll ending in a tiny grey 'Sent from my phone'. Counter '4/6'.

### Slide 5: Bid E. The cheapest. By a mile.

Then page 9, note 14: 'Excludes ceilings.'

*Visual:* Close photo of page 9 with yellow highlighter over note 14 and the page footer reading '9 of 9'. Counter '5/6'.

### Slide 6: Bid F. A photo of a whiteboard.

Honestly? The most complete bid of the lot.

*Visual:* Full-bleed real phone photo of the real whiteboard: 'Boards supply & fix – 1,240 m² @ 38.50 / Ceilings – 380 m² @ 62.00 – INCL (underlined twice) / Jointing & finishing – incl / Access – incl / Validity 30 days / TOTAL 71,300 + tax'. Glare and a half-erased site sketch in one corner, clear of the lines. An inset crop (about a third of the slide) zooms in on 'Ceilings … INCL'. Counter '6/6'.

### Slide 7: In fairness, here's what I sent them.

Nobody got the same list.  
With QSME: price the estimate once. Cut the tender from it. Every bidder gets the same lines.

*Visual:* Full-frame laptop on the same real desk, showing the QS's own sent email in a generic mail UI: subject 'Tender: Plasterboard & ceilings package', body 'Drawings attached. Please price.' and nothing else.

### Slide 8: Same lines. One table. Award.

Bidders never see your rates or budget.  
Award creates the contract, with milestones and retention.  
Book a 30-minute demo: qsme.build

*Visual:* QSME 'Compare bids' crop from a demo project with fictional data: one row per bidder (Bidder A–F) with the total excl. tax and the 'Lowest' tag (no GST/incl. column on Global), readable at phone size (owner screen-recording; not a per-line grid of every bidder's rates, which isn't live). In the corner, the same real whiteboard now reads '6 bids. 1 schedule.' in marker (callback).

## Reel / video

- **Length:** 30s
- **Aspect:** 4:5 (1080x1350) master for the LinkedIn feed; 9:16 (1080x1920) export for Shorts/Reels from the same footage. Shoot 9:16 and keep faces and text inside the central 4:5 area. In the 9:16 export, keep all text between y=300 and y=1400 and more than 150px from the right edge.
- **9:16 cut (made 2026-10-02, rebuilt 2026-10-03):** `outputs/six-bids-9x16.mp4` (30.3s) is the 4:5 master placed in a 1080x1920 frame (master scaled 0.68 at y 330–1248, punched in for the hook, the note-14 reveal, the email and the product beat), with a top band (kicker, wordmark, bid segments) and the captions re-set large at y 1064–1248, x 150–930. Every frame and cut lines up with the 4:5 file, so `vo-script.md` (times in seconds on the 4:5 MP4) applies unchanged; the 9:16 only holds the end card 0.5s longer. Footage stays the illustrative stand-ins for week 1; the owner's screen recordings replace them only in the later paid cut, and the 9:16 is then rebuilt from the new 4:5 master (re-extract `motion/clips/master`, run `motion/strip-icc.py` on it, then render; the page header has the exact commands. Without the strip, Chrome reads the frames' HDTV colour profile, draws them a shade darker than the page, and the master's edges show).

| Time | Role | Visual | On-screen text | VO | SFX |
|---|---|---|---|---|---|
| 0.0–2.5 | hook | Phone propped in the soft-focus foreground; six generic 'New message' banners (each stamped 4:59 pm, no OS or app branding) stack down its lock screen 0.15s apart. Behind it the QS (founder, around 40, sleeves rolled, own desk, window light), already mid-sigh, stares into the lens with six bids fanned out. Focus racks to their face on 'Six formats.' | Large, top third: '6 bids. 6 formats.' · small chip 'Tender closed 5:00pm' · counter 0/6 top-right | Six subbies. Six quotes. Six formats. | Six generic message pings within about 1s, synced to the banners, then silence |
| 2.5–4.5 | problem | Overhead insert: a hand rotates a sideways-scanned printout 90°; its printed header reads 'Quote_FINAL_v3_revised(2).pdf'. Cut back to the QS slowly tilting their head to match. | Caption: 'One's a PDF. Sideways.' · counter 1/6 (the filename is readable on the prop) | One's a PDF. Sideways. | Paper slide on the desk (recorded on set) |
| 4.5–6.5 | problem | Screen capture of a generic spreadsheet (no Excel logo or ribbon): rows 12–40 are one merged block. The QS clicks the column header to sort, a plain generic alert 'Can't sort merged cells.' appears, and they close it. | Caption: 'One's a spreadsheet. All merged.' · counter 2/6 (the alert text is part of the screen) | One's a spreadsheet. All merged. | One trackpad click, nothing else |
| 6.5–8.0 | problem | Letterhead 'Bidder C' with one total and the words 'As discussed.' Cut to the QS looking off-camera, trying to work out which of forty phone calls that was. | Caption: 'One says "as discussed".' · counter 3/6 | One says 'as discussed'. | None (room tone) |
| 8.0–11.0 | problem | Phone in hand, generic mail app: 'Price below. Cheers.' The thumb scrolls down into empty white and holds about 0.7s, ending on a tiny grey 'Sent from my phone'. | Caption: 'One says "price below"…' then, after the scroll, '…there's nothing below.' · counter 4/6 | One says 'price below'… there's nothing below. | Phone tap, then silence through the scroll |
| 11.0–13.5 | problem (the cheapest bid, placed right before the flip) | Fast page flick from the cover of a stapled quote to page 9; a highlighter drags across 'Note 14: Excludes ceilings.' The footer reads '9 of 9'. | Caption: 'One's the cheapest… till page nine.' · counter 5/6 | One's the cheapest… till page nine. | Page flicks + highlighter squeak |
| 13.5–16.5 | problem (peak of the escalation) | The QS turns their phone to the lens: a real photo of a real whiteboard, with itemised lines, validity and a total, 'Ceilings … INCL' underlined twice, and glare plus a half-erased sketch in one corner. Hold a full second, straight face. | Caption: 'And one… is a photo of a whiteboard.' · counter 6/6 (Hook 4 variant: 'And yes… the whiteboard.') | And one… is a photo of a whiteboard. | Silence, then one marker squeak |
| 16.5–17.0 | payoff detail (callback to the cheapest bid) | 0.5s snap-zoom in the edit, using the full-res whiteboard photo, onto 'CEILINGS … INCL' underlined twice | None (the whiteboard text is the joke) |  | None |
| 17.0–18.5 | problem (twist / status flip) | Back to the QS, deadpan, the smallest shrug | Caption: 'Honestly? Most complete one.' | Honestly? Most complete one. | None |
| 18.5–21.5 | self-own (the joke turns on the QS) | The QS turns the laptop to the lens: their own sent email in a generic mail UI, subject 'Tender: Plasterboard & ceilings package', body 'Drawings attached. Please price.' and nothing else. A tiny wince. | Caption: 'In fairness… here's what I sent.' (the email on screen carries the punchline) | In fairness… here's what I sent. | None |
| 21.5–25.0 | product intro + solution | Screen recording of a demo project with fictional data, one UI state per clip: (a) the tender's scope as a bidder sees it: the same lines and quantities for every bidder, rate column blank (your rates and budget never shown); then (b) 'Compare bids': one row per bidder with the total excl. tax and the 'Lowest' tag, punched in at 2–3x. Totals only: no per-line grid across bidders (that view isn't live), and on Global no incl./GST column (the live Global screen still says GST and works it out at 15%). | Lower-third: 'QSME · tendering & estimating software' · captions: 'So we built QSME. Same lines for every bidder.' then 'Six bids. One table.' | So we built QSME. Same lines for every bidder. Six bids. One table. | Music cue starts (tidy pulse, 96 BPM), ducked under speech; soft UI clicks |
| 25.0–27.0 | value | Screen, punched in: the cursor opens Bidder F's row, clicks 'Award bid', and the payment contract appears with milestones and retention (no agreement / e-sign step on Global: the templates are NZ law; signing is not part of award anyway) | 'Award → contract created' |  | One crisp click on 'Award bid' |
| 27.0–30.0 | CTA | The QS at the real whiteboard finishes writing '6 bids. 1 schedule.' and caps the marker. End card from 27.5s: QSME logo (no ® on Global until confirmed), 'qsme.build', 'Book a 30-minute demo', held at least 2.5s and large enough for Shorts (the 9:16 motion cut holds qsme.build about 3s). | End card: qsme.build · Book a 30-minute demo | Book a demo at qsme.build. | Marker squeak + cap click; music resolves on one chord |

## Music

- **Direction:** No music under the six-bid count or the self-own. Deadpan needs dead air, so each bid gets one small real sound instead, recorded on set where possible. Music enters only at the product beat (21.5s) as a tidy, minimal pulse that feels like rows snapping into line, then resolves on a single chord under the end card. No trending track and no stock 'corporate ukulele'. Duck it about 18 dB under speech.
- **Mood:** Dry and understated, quietly satisfied: order after chaos
- **BPM:** 90–100 BPM (suggest 96) for the 8.5s solution/CTA cue; a 17s version for the paid cut, which enters at 18.5s
- **Source:** ElevenLabs Music on a plan that covers commercial use: a 10s instrumental, e.g. 'minimal clean plucked synth and soft kick, 96 BPM, understated, no vocals, resolves on one chord at 8.5s', plus a 17s version for the paid cut. Alternative: a royalty-free library on a plan that explicitly covers business/brand channels and paid social ads (not a personal or creator tier); add the LinkedIn page and ad account if the licence requires channel registration. SFX: record paper, trackpad, highlighter, marker and cap sounds live on set; generic message pings from ElevenLabs Sound Effects.
- **Licensing:** LinkedIn has no licensed music library for posts, so anything posted there, organic or paid, needs music you hold rights to: generated, or royalty-free on a commercial/brand plan. IG/FB business accounts are generally limited to Meta's commercial Sound Collection for organic posts, and trending songs are not cleared for brand or ad use. Paid ads on any platform: generated or commercially licensed only. CapCut is for cutting and captions only: no CapCut library music, sound effects, AI voices, stickers or templates, because these are often not cleared for commercial use. Confirm the ElevenLabs plan includes commercial use before using its music or VO in ads.

## Voice

- **Character:** 'The QS who's seen every spreadsheet horror': a mid-career quantity surveyor (late 30s to 40s), calm and dry, never raises their voice, amused rather than angry. Quietly on the subbies' side, and honest enough to admit the tender email was theirs.
- **Accent & delivery:** If the founder or a real QS films, use their own natural accent and wording; don't coach it. The AI VO uses a natural, general urban New Zealand accent (the user confirmed Kiwi for both QSME NZ and qsme.build on 2026-10-02; see ventures/qsme-build.md), never broad, never Australian, no American hype. vo-script.md is the timed source for the VO. Delivery is the same either way: flat deadpan, unhurried, short sentences. A real half-second pause before 'a photo of a whiteboard', a tiny wince on 'In fairness…', and the only warmth on 'Honestly? Most complete one here.' Never an announcer read, including the CTA.
- **ElevenLabs:** Only for the no-person version (Figma kinetic type + VO). Voice Design prompt: 'Mid-career quantity surveyor, around 40, general urban New Zealand accent, not broad, low-mid register, dry and deadpan, slightly tired but amused, conversational, close to the mic like a phone recording, no announcer energy.' Generate 3 candidates and keep the least polished one. Use Eleven v3 for audio tags such as [sighs] and [pause] (check the current tag list). Starting settings: stability about 45–55, similarity about 75, style exaggeration 0–15, speed about 0.95. Example lines: '[sighs] Six subbies. Six quotes. Six formats.', 'And one… [pause] is a photo of a whiteboard.', 'In fairness… [pause] here's what I sent.' An AI voice must not present itself as the founder, so the product line becomes 'Next tender: one schedule. Every bidder gets the same lines.' instead of 'So we built QSME.' Render each line separately, 3 takes per line, so the edit controls timing. Note the chosen voice ID in ventures/qsme-build.md. Never clone a real person's voice without their explicit consent (the founder cloning their own voice is fine).
- **Real-person alternative:** Recommended for LinkedIn: (a) the founder on camera at their own desk. They perform the skit and deliver the product half as themselves ('So we built QSME. Same lines for every bidder.' and the CTA). (b) A real QS who isn't a QSME user performs only the skit (0–21.5s). The product beats are then screen recording plus on-screen text, or the founder's voice-over, never the QS's voice on product or CTA lines. Add a paid-partnership disclosure if they're paid, and get a simple written release. Either way: phone, window light, about 30–45 minutes to film. ElevenLabs then supplies only the pings and music.

## Caption

REEL (LinkedIn, week 1)
Every QS has had this tender close. Six bids, all in at 4:59. Six formats. Number six is the best one.

In fairness, the tender email said "drawings attached, please price." We've all sent that one.

QSME is tendering and estimating software: price your estimate once, cut the tender from it, and every bidder gets the same lines. Bidders never see your rates or budget, and the award creates the contract.

30-minute demo: qsme.build (link in comments)

What's the strangest format a quote has ever reached you in?

---
CAROUSEL (LinkedIn document, week 2; document title 'Six bids. Six formats.')
Every QS has had this tender close. Six bids. Six formats. Unpopular opinion: Bid F is the best one.

QSME is tendering and estimating software: price your estimate once, cut the tender from it, and every bidder gets the same lines. Bidders never see your rates or budget.

30-minute demo: qsme.build (link in comments)

What's the strangest format a quote has ever reached you in?

---
STATIC (week 3; the only caption that names the whiteboard)
Every QS has had this tender close. Six bids. Six formats. One was a photo of a whiteboard. It was the most complete.

In fairness, the tender email said "drawings attached, please price." We've all sent that one.

QSME is tendering and estimating software: price your estimate once, cut the tender from it, and every bidder gets the same lines. Bidders never see your rates or budget.

30-minute demo: qsme.build (link in comments)

What's the strangest format a quote has ever reached you in?

---
BINDER STATIC (week 4, Hook 2)
This is a tender submission.

QSME is tendering and estimating software: one schedule, and every bidder gets the same lines.

30-minute demo: qsme.build (link in comments)

What's the strangest format a quote has ever reached you in?

(IG: replace the demo line with 'Book a 30-minute demo: link in bio.' FB: use the full tracked URL.)

**Hashtags:** #QuantitySurveying #Tendering #Estimating #Preconstruction

**CTA line:** Send one schedule, get six bids you can actually compare. Book a 30-minute demo at qsme.build.

## Production workflow

| # | Step | Tool | What | Output |
|---|---|---|---|---|
| 1 | 1. Agree hook + concept + spend | Claude + user | The user picks the hook (recommended: Hook 1, with Hook 4 as the paid challenger), decides who's on camera, answers the open questions, and says yes before anything costs money. Estimate: about 2h for props and printing, 45min shoot, 2h edit. Spend: one month of an ElevenLabs paid plan with commercial use, plus printing. No AI video spend if a real person films. | Agreed concept; idea card status → agreed; project folder projects/YYYY-MM-DD-qsme-build-six-quotes/ with brief.md |
| 2 | 2. Final copy | Claude | Timestamped script where the captions are the VO word for word, the 8 carousel slides, the static copy, the four captions (reel, carousel, static, binder), the 35s paid script, and one UTM link per asset | script.md, captions.md, paid-35s.md, utm-links.md |
| 3 | 3. Props + brand frames | Figma | One file, 'QSME Build – Six quotes', using the brand tokens from ventures/qsme-build.md (#0C1310, #3DC023, Space Grotesk SemiBold, Inter, logo at ventures/assets/qsme-logo.svg). Props: 'Bidder A–F' letterheads with visible totals, Bid E clearly the lowest; a printed header 'Quote_FINAL_v3_revised(2).pdf' for the sideways scan; the quote cover and page 9 only (note 14 'Excludes ceilings.', footer '9 of 9'), with pages 2–8 printed filler; a generic spreadsheet with rows 12–40 merged and a generic 'Can't sort merged cells.' alert; a generic mail UI with 'Price below. Cheers.', a long empty scroll and 'Sent from my phone'; the QS's own sent email ('Tender: Plasterboard & ceilings package / Drawings attached. Please price.'); six generic notification banners stamped 4:59 pm with no OS or app logos; a sticky note 'F'; the binder sleeve label for Hook 2. Frames: static 1080x1350, carousel 8 × 1080x1350, lower-third, end card. | Printable prop PDFs + phone/laptop screen PNGs + banner animation + empty layout frames |
| 4 | 4. Real photos (zero AI) | Phone + printer + a real whiteboard | Write Bid F on a real whiteboard to the spec (itemised boards and ceilings lines, 'Ceilings … INCL' underlined twice, jointing incl, access incl, validity 30 days, total + tax). Photograph it on a phone with the glare and half-erased sketch in one corner, clear of the lines. Then shoot two overhead flat-lays on a real desk in window light: all six face-up (static), and Bid F face-down with the sticky note 'F' (carousel slide 1). Also shoot the binder shot for Hook 2. | whiteboard.jpg, flatlay-all.jpg, flatlay-f-hidden.jpg, binder.jpg |
| 5 | 5. Static + carousel | Figma | Static: the solid #0C1310 band across the top 22% with kicker, headline and green subline; the photo below; labels of three words or fewer at 32px or more. Carousel: real photos in the frames, counters top-right, the whiteboard inset crop on slide 6, the 'Compare bids' totals crop (6 bidders, totals excl. tax, 'Lowest'; no GST/incl. column on Global) on slide 8. Export the carousel as a PDF titled 'Six bids. Six formats.' for LinkedIn and as PNGs for IG/FB. | Static PNG (1080x1350), binder static PNG, carousel PDF + 8 PNGs |
| 6 | 6. Product screen recordings | QSME demo project (fictional data) + Mac/iOS screen recorder | Owner records these (signed-in screens), one UI state per clip, punched in at 2–3x with a slow push-in: (1) the bidder's view of the tender: the same lines, rate column empty (ideally split-screen with the owner's priced SOQ); (2) 'Compare bids' with six demo bids: the totals excl. tax and the 'Lowest' tag (on Global, crop out the GST/incl. columns and the 'Compare on' toggle: they still say GST and use 15%); (3) click a bid → 'Award bid' → the contract with milestones and retention (Active Work); (4) NZ cut only until open question 4 is answered: Agreements, 'Make the agreement' → 'Send for signing'; (5) estimate → tender cut from it (for slide 7 and the paid cut). The comparison is totals only: never film or describe a per-line grid of every bidder's rates. On a Global (non-GST) demo, check the labels first (they may still say GST). | 3 clips of about 4s usable each, 1080p or higher |
| 7 | 7a. Film the talking head (recommended) | Phone (founder, or a real QS for the skit only) | Shoot 9:16 at eye level, window light, real desk, natural accent, uncoached. 3 takes per line plus inserts: the foreground phone with the rack focus to the face (phone Cinematic/portrait video mode, or a blur ramp in the edit); the sideways PDF rotate; the spreadsheet sort click and alert close; the 'price below' empty scroll; the page flick + highlighter; the whiteboard phone reveal; the laptop turned to the lens with the sent email; writing '6 bids. 1 schedule.' and capping the marker. Record the real paper, trackpad, highlighter and marker sounds on set. | Raw clips + inserts + live SFX |
| 8 | 7b. Fallback: no person on camera | Figma (kinetic type) + ElevenLabs VO | One Figma frame per beat, using the real prop photos, big type and the counter. Animate with Smart Animate and export as MP4 (the connected Figma integration lists a video export tool; test it on one frame first, and fall back to screen-recording the prototype). The VO follows the ElevenLabs direction, with the product line 'Next tender: one schedule. Every bidder gets the same lines.' Use Higgsfield/Runway/Veo only if a human on screen is truly needed and nobody will film: a fictional QS, not a testimonial, AI-labelled where required. Not recommended for LinkedIn. | Kinetic MP4 + VO WAVs |
| 9 | 8. Sound | ElevenLabs (SFX + Music) | SFX: six generic message pings, plus any sound not captured on set (no cartoon sounds). Music: a 10s cue (organic) and a 17s cue (paid), 96 BPM, resolving on one chord. Check the plan covers commercial use. | WAV stems |
| 10 | 9. Edit | CapCut (cutting and captions only) | Cut tight and start late. Burned-in captions are the VO word for word, large enough to read with sound off, and double as the subtitles: no separate subtitle track, no SRT, and LinkedIn auto-captions off at upload if offered. Only the top-right counter 0/6→6/6, with no '1/6 ·' prefixes. The 0.5s snap-zoom on 'CEILINGS … INCL' at 16.5s. Music in at 21.5s, ducked under speech. No CapCut library music, SFX, AI voices, stickers or templates; all audio comes from the set recording and the ElevenLabs stems. Export 1080x1350 for LinkedIn and 1080x1920 for Shorts/Reels, with 9:16 text between y=300 and y=1400 and more than 150px from the right edge, and the end card held at least 2.5s. | 2 MP4s (4:5, 9:16) |
| 11 | 10. QA | Claude + user | Watch with sound off: does the hook read in under 3s? Check every claim against the research file ('gets the same lines', 'never see your rates or budget', 'award creates the contract'). No real brands, logos, OS UI, names or client data. Check that the subbies aren't the butt of the joke and the self-own lands, and that nothing shows or claims a per-line grid of every bidder's rates (the live screen compares totals). Third-watch test: is it still funny? | Approved files; idea card updated |
| 12 | 11. Publish + learn | User (LinkedIn), Claude for logging | The user posts from the founder's personal profile and the QSME page reposts: week 1 reel, week 2 carousel, week 3 static, week 4 binder static. The founder posts the first comment with their own true strangest-quote story (not written by us); the tracked link goes in a separate comment. UTMs: qsme.build/?utm_source=linkedin&utm_medium=organic&utm_campaign=six-quotes&utm_content=reel-h1 (then carousel-h4, static-whiteboard, static-binder; utm_source=instagram/facebook for cross-posts). After 7 days per post, log impressions, comments, reposts, average watch time (if LinkedIn shows it) and demo bookings by utm_content. Winner = highest (comments + reposts) per 1,000 impressions, with at least 1,000 impressions; a video must also average at least 10s watch time. Treat organic results as directional only. | A row per post in learnings.md + notes on the idea card |
| 13 | 12. Paid (only if organic shows signal) | CapCut + LinkedIn Campaign Manager (user) | 35s cut from the same footage. 0–2.5 Hook 1 or Hook 4 (both exactly 2.5s). 2.5–13.5 bids 1–5 as in the organic reel. 13.5–17.0 the whiteboard + snap-zoom (Hook 4 variant VO: 'And yes… the whiteboard.'). 17.0–18.5 'Honestly? Most complete one.' 18.5–21.5 product intro: lower-third 'QSME · tendering & estimating software', VO 'QSME fixes the tender, not the subbies.' over estimate → tender. 21.5–25.5 value: VO 'Price the estimate once. Every bidder gets the same lines.', on-screen 'Bidders never see your rates or budget.' 25.5–29.0 demo: VO 'Six bids. One table. Award creates the contract.' over 'Compare bids' (totals excl. tax, 'Lowest') → 'Award bid' → contract with milestones and retention (no e-sign step on Global). 29.0–35.0 CTA at the whiteboard: VO 'Send one schedule, get six bids you can actually compare. Book a 30-minute demo.' End card qsme.build. About 85 words; the founder voices the product lines. Run it as a video ad with a Lead Gen Form ('Request demo'), and the carousel as a document ad. A/B Hook 1 vs Hook 4 with everything else fixed. Boost the winning organic post as a Thought Leader Ad if the format supports it. Set a fixed test budget before launch. Judge hooks on video view rate and 25%/50% completion, then CTR and cost per demo request. | 2 ad variants + a view-rate/completion/CTR comparison logged in learnings.md |

## Integrity notes

- Product claims come only from the research file and venture profile, and are worded to match: 'tendering & estimating software'; one estimate with every tender cut from it, so every bidder gets the same lines ('prices the same lines' waits until the bidder flow is confirmed); bidders never see your rates or budget; bids compared as totals in one table with a 'Lowest' tag (each bid opens to its own lines; on Global shown excl. tax only, because the live Global comparison still says GST and grosses up at NZ's 15%); award creates the contract with milestones and retention. The agreement/e-sign step stays out of Global videos (NZ-law templates, truth sheet open question 4). Never say or show a per-line grid of every bidder's rates: that matrix exists only on an unmerged branch. 'The contract's already made' was removed.
- Still dropped until confirmed: 'same tax basis', automatic exclusion detection, and 'lowest conforming bid'. The page-9 exclusion is shown only as the problem. The live comparison shows totals only, so there are no per-bidder line rows to show blank, and nothing implies 'QSME catches exclusions'.
- No social proof anywhere: no customer counts, logos, time-saved figures, star ratings or testimonials. 'Six bids', 'page 9', 'note 14', 'rows 12–40', '4:59' and the whiteboard rates and totals are props inside the skit, not data.
- Who speaks: the founder may say 'So we built QSME' and the CTA because they are the company. A real QS who isn't a user performs only the skit and never voices product or CTA lines; disclose a paid partnership if they're paid, and get a written release. An AI voice never presents itself as the founder.
- First person: the captions open with the generic 'Every QS has had this tender close.' and make no claim that a specific tender happened. First-person lines ('here's what I sent', 'here's what I sent them') live only inside the clearly staged skit and carousel. 'We've all sent that one' assumes the poster is a QS; if the founder isn't, change it to 'Most tender emails look like that.'
- The joke is aimed at the situation and at ourselves, not at subbies (who are qsme.build users): the whiteboard bidder wins, the QS admits their own tender email caused it, and the paid line is 'QSME fixes the tender, not the subbies.' Hook 5 was rewritten so the subbie wins, and it's parked.
- No real brands or identities: generic spreadsheet (no Excel logo or ribbon), generic mail UI, generic alert and generic notification banners (no OS or app branding, no Outlook/iOS sounds). Bidders are labelled 'Bidder A–F' with no company names. No real projects, addresses or client tenders. Screen recordings use a demo project with fictional data. For the NZ twin, any 'Facebook group' screen must be a generic community-group UI (neutral grey, no logo, made-up group name, no Facebook colours, layout or reaction icons).
- Any AI-generated QS must be fictional, must not resemble a real identifiable person, must not be framed as a testimonial, and must be AI-labelled where LinkedIn/Meta rules require. Flag this to the user before using one.
- Audio rights: no trending or chart music on LinkedIn or in ads; generated or commercially licensed music on a brand/ads-cleared plan only; no CapCut library audio, voices, stickers or templates. No voice cloning of a real person without their explicit consent.
- Comment seeding: the founder's first comment must be a true story of their own. We don't write one for them.
- Nothing gets generated, spent or posted until the user approves the hook and the spend. The user does the posting.

## Open questions for you

- [ ] Hook: Hook 1 for the organic reel, with Hook 4 as the paid challenger (and as the carousel slide-1 framing)?
- [ ] Who goes on camera: you as founder (recommended: you can voice the product half), a real QS you know (skit only), or nobody (Figma kinetic type + ElevenLabs voice)?
- [ ] Have you worked as a QS or run tenders yourself? That decides whether 'In fairness… here's what I sent' and 'We've all sent that one' are honest coming from you.
- [ ] ~~How do bidders respond in QSME?~~ Answered by research/2026-10-02-qsme-platform-truth.md: invited bidders price the same lines cut from the SOQ (a total or itemised), and emailed PDF quotes can be added to the comparison. 'Same lines for every bidder' is true. Still open: can they attach exclusions to specific lines?
- [ ] ~~In the comparison view, do unpriced lines show as blank?~~ Answered: the live comparison is a table of totals (excl. / incl. GST, 'Lowest'), one bid opens at a time to its own lines; the per-line grid across bidders is branch-only. Still open: does the iOS app show the comparison (for a portrait-native recording)?
- [ ] ~~Does the comparison normalise tax basis or surface exclusions?~~ Answered: it works out the missing side at 15% and marks it 'calc.' (display only, the bidder's own figure stays bold); it does not detect exclusions or judge 'conforming'. Global screens may still say GST.
- [ ] Which markets is qsme.build for (AU, UK, Middle East, US)? That decides 'subbies' vs 'subs', 'plasterboard' vs 'drywall', and the AI fallback accent.
- [ ] Is your personal LinkedIn profile the posting account, with the QSME page reposting? Organic only for now, or a fixed LinkedIn test budget for the winning hook? Which demo-booking URL should the UTM links point to, and is a LinkedIn Lead Gen Form OK for paid?
- [ ] Brand tokens and the logo are in ventures/qsme-build.md (pulled from the site 2026-10-02). Is there an existing Figma file or library to use instead? Is there a demo project with fictional data we can screen-record?
- [ ] Humor limits for qsme.build: is joking about quote formats OK now that the post takes the subbies' side and the QS takes the blame?
- [ ] ElevenLabs: does your plan include commercial use (needed for music and VO in ads)?
- [ ] Want the NZ twin next (qsme.co.nz, 'The Facebook group' idea, Kiwi VO, FB/IG) built with the same workflow, and Hook 5 as a part-2 post from the subbie's side?

## Discussion history

- 2026-10-02 — Fact-check fix against research/2026-10-02-qsme-platform-truth.md. Why: the product beat showed a grid with every bidder's rate on every line, and that matrix only exists on an unmerged branch (the live 'Compare bids' screen compares totals). What changed: the beat now shows only what is live, still labelled 'Illustrative — swap for real QSME screen (demo data)'. It goes (a) six identical bidder sheets, the same lines cut from the estimate with the rate column blank and 'Bidders never see your rates or budget.', then (b) 'Compare bids': totals excl. tax / incl. tax ('calc.') with a 'Lowest' tag on Bidder F, then (c) Bidder F → 'Award bid' → 'Contract created' with milestones and retention, and 'make the agreement → send for e-sign' as the next step (signing is not part of award). Kept 'So we built QSME. Same lines for every bidder.' (true: bidders price identical lines cut from the SOQ) and added the caption + VO 'Six bids. One table.'. Fixed the dark/dim frames at the whiteboard cut (~12.8s): the board is now on screen from the first frame. Moved the tags, counter, label and hook headline inside the 4:5 safe box, and kept every whiteboard line inside it during the punch-in (zoom 1.25 instead of 1.5, other lines dimmed). Re-rendered with tools/motion (QA pass on 60,60,1020,1290); now 29.8s, end card from 27.2s. Copy: carousel slide 8 is now 'Same lines. One table. Award.', the paid-cut VO is 'Six bids. One table. Award creates the contract.', and the shoot plan, owner screen-recording list, integrity notes and three answered open questions are updated. The Voice section now says Kiwi, as confirmed on 2026-10-02. vo-script.md/json now has 12 lines (new line 11 at 22.85, CTA at 27.3), and no copy claims a per-line comparison. Still open: the real owner screen-recordings (listed under Production status) to replace the illustrative stand-ins.
- 2026-10-02 — 9:16 Shorts/Reels cut made: `outputs/six-bids-9x16.mp4` (+ `-frames.png`), 29.8s, from `motion/six-bids-9x16.html`. The 4:5 master is placed frame for frame inside the 9:16 safe box with a branded top band ('Tender day', QSME wordmark, six bid segments that fill with the counter and join into one bar on 'Six bids. One table.'; 'Illustrative · demo data' over the product beat) and a bottom band that re-sets each caption large (60px; 54px for the three-line 'In fairness…' caption) on the master's exact cut frames, so the frame doesn't read as letterboxed. Soft edges where the page flicks and the whiteboard zoom leave the 4:5 frame; the end card steps up 1.3x for phone reading. No new claims, no new footage. QA passed on the 9:16 safe box and on a stricter box that keeps text 150px clear of the right-hand buttons. Same timeline, so `vo-script.md` applies as is (no second VO script). Fixed `figma-scripts/03-section2-carousel.js` slide 8 to 'Same lines. One table. Award.', with a totals-table placeholder and the post.json body. The carousel and statics stay on hold for week 1.
- 2026-10-03 — Review fixes applied and both cuts re-rendered (4:5 29.8s, 9:16 now 30.3s; QA passed on both safe boxes and on the stricter 150–930 box for the 9:16; frames spot-checked). Must-fix: (1) the master's corner label no longer says 'Illustrative — swap for real QSME screen (demo data)' (an editor's note); it reads 'Illustrative · demo data'. (2) The Global 'Compare bids' table shows only the bid totals excl. tax with the 'Lowest' tag. The 'Compare on' toggle, the incl. tax column, the 'calc.' marks and '81,995 incl. tax' in the bid popover are gone, because the live Global screen still says GST and grosses up at NZ's 15% (truth sheet 5.2, open question 4, red list). Should-fix: the 9:16 punches the master in (the product beat at about 1.3x with larger table text; a 1.4x snap-zoom on 'Note 14: Excludes ceilings.'; the email at 1.15x), and 'Bidders never see your rates or budget.' is now a third caption line from 21.45 to 22.77. Captions and VO match word for word: 'One's a PDF. Sideways.', 'And one… is a photo of a whiteboard.' (VO changed), 'Honestly? Most complete one.' and 'In fairness… here's what I sent.' (VO and caption changed; the email, now set larger, carries the punchline, so the read fits). The end-card and band wordmarks drop the ® until the owner confirms where QSME is registered (open question 7). The files still have no audio track, so the Shorts/Reels post is on hold until there's a bed (owner-recorded room tone and foley at the listed times) or the VO; the 4:5 can go out silent on LinkedIn. Nice-to-have: the 'Next: make the agreement → send for e-sign' line is dropped (6.2 is held back for Global). Bid E's chip reads 'E · cheapest' until the flick, then 'E · page 9', and it sits above the flying pages. The sticky note says 'ceilings IN ✓' instead of repeating the caption. Only one logo is on screen during the product beat, and the band clears by 27.13 before the end card. The 9:16 end card is held 0.5s longer, so qsme.build shows for about 3s. The table sits at about 15% behind the contract card, which now spans the table, so no row labels peek out. The 9:16 hook is at 1.15x, and the Shorts cover frame is about 1.9s. Carousel slide 8 copy got the same Global fix (no e-sign sentence, totals excl. tax only) in post.md, post.json and `figma-scripts/03-section2-carousel.js`. Still open: owner confirmation of the ® status, the sound bed or VO for Shorts, and the owner's real screen recordings.
