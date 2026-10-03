---
title: "Which Dave?"
venture: qsme-nz
idea: qsme-nz-facebook-group
status: draft — awaiting approval
figma: https://www.figma.com/design/f8xxaFvwdi6ijGxYj9WEWP
created: 2026-10-02
---

# Which Dave?

**The joke in one sentence:** You ask the community page for a builder and get 212 comments about at least six different Daves, until Dave himself turns up asking which Dave they mean.

**Job:** Organic first, then paid. Post organically on IG, FB and TikTok to test the joke cheaply. Move to paid only if, on at least one platform, average watch time is 15s or more (50% of the video) AND shares plus saves reach 10 or more per 1,000 views, and only after the user says yes to a budget. Paid: boost the organic H1 post with TikTok Spark Ads or Meta 'Use existing post' so its real comments carry over. Run H1 vs H2 vs H4 (text-only) as a cold hook test with the body unchanged, and run H5 alone in a separate retargeting ad set.

**Platforms:**
- Instagram Reels (9:16) + feed static and carousel (1080x1350)
- Facebook feed + Reels (4:5 feed crop, 9:16 Reels)
- TikTok (9:16)
- Not by default: LinkedIn. It is qsme.build's channel. Only if the user confirms QSME NZ posts there for small developers: the carousel as a 1080x1350 PDF with at most 3 hashtags.

## Production status (2026-10-02, 30 s rebuild)

| Piece | State | Where |
|---|---|---|
| **Reel, 30 s, 9:16, silent with burned-in text** | ✅ Rendered 2026-10-02 with the motion kit, QA passed (safe 65,300,1015,1250), contact sheet and spot frames checked. Kinetic H1 hook (no filmed shot), the thread, the QSME beat from the real iPhone still plus labelled walkthrough recreations, tally callback, end card. Needs no owner recording. | `outputs/which-dave-30s-9x16.mp4` · `outputs/which-dave-30s-9x16-frames.png` · source `motion/which-dave-30s.html` + `which-dave-30s.js` + `which-dave-30s.css` |
| **Facebook feed 4:5 (1080×1350)** | ✅ Same timeline re-laid for 4:5 (not a blind centre crop), QA passed (safe 60,60,1020,1290) | `outputs/which-dave-30s-4x5.mp4` · `outputs/which-dave-30s-4x5-frames.png` · `motion/which-dave-30s-4x5.html` |
| Static post 1080×1350 | ✅ Re-exported 2026-10-02 with the new thread lines (quote setup, no licence lines) and an end band matching the reel | `motion/static.html` → `outputs/static-212-comments-1080x1350.png` |
| Reel body (old, 27.5 s) | ⛔ **SUPERSEDED** by the 30 s reel on 2026-10-02. It still carries the licence setup ('Must be licensed' / '...is anyone here licensed?' / 'Dave is.') and the dashed owner-recording placeholders. Kept for reference only: never post it. | `outputs/which-dave-reel-body-9x16.mp4` (+ `-frames.png`), `motion/reel-body.html`, `motion/timeline.js` |
| Carousel, 7 slides | 🟡 Figma only. Slides 1, 5, 6 and 7 must be fixed by hand before any export (see Figma fixes pending). `outputs/carousel-7-slides-overview.png` is the OLD version: don't post it | Figma page 01 |
| Reel storyboard, brief, motion scripts in Figma | ⏸ Describe the old reel body; superseded by the 30 s HTML reel. Don't run them as they are. | `figma/03-…`, `figma/04-…`, `figma/05-…` |
| VO | 🟡 Script re-timed to the 30 s reel (hook line at 0.0, new vo03 to vo06 matching the captions); generate after the ElevenLabs upgrade, then lay it onto both MP4s with `tools/mux` | `vo-script.md` / `vo-script.json` |
| SFX, music | ⬜ ElevenLabs paid plan (commercial licence) | see Music |
| Owner screen recordings | Not needed for this cut (week 1). Optional later, only for the H5 retargeting variant, which shows the real Compare bids table. | — |

Re-render from the studio root (each takes about 2.5 min; QA + contact sheet + MP4):
`node tools/motion/make.mjs projects/2026-10-02-qsme-nz-which-dave/motion/which-dave-30s.html projects/2026-10-02-qsme-nz-which-dave/outputs/which-dave-30s-9x16.mp4 --safe 65,300,1015,1250`
`node tools/motion/make.mjs projects/2026-10-02-qsme-nz-which-dave/motion/which-dave-30s-4x5.html projects/2026-10-02-qsme-nz-which-dave/outputs/which-dave-30s-4x5.mp4 --safe 60,60,1020,1290`
Static: `node tools/motion/make.mjs projects/2026-10-02-qsme-nz-which-dave/motion/static.html <scratch>/static-212-comments-1080x1350.mp4 --still 2.5 --still-only`, then copy the PNG into `outputs/`.
Footage frame caches (muted, from `assets/qsme/walkthroughs/`) live in `motion/clips/` and are never uploaded: `tender-step1` (client-tenders 3.5–5.5 s), `tender-soq` (7.85–10.95 s), `contacts-add` (client-contacts 4.2–6.4 s). Remake with `tools/motion/extract <mp4> <dir> 30 <start> <end> 1920`.
Figma: https://www.figma.com/design/f8xxaFvwdi6ijGxYj9WEWP

## Figma fixes pending (no Figma API quota left; fix by hand before ANY Figma export)

The Figma file still carries claims that aren't true today ('Licence-verified trades', 'compared line by line') and the old licence setup. Fix these by hand, or run them when the quota resets.

- **Carousel slide 1** (Mel's post): 'Must be licensed.' → 'Keen for a few quotes.', and move the red-marker underline under it.
- **Carousel slide 5**: 'Mel R.: ...is anyone here licensed?' → 'Mel R.: ...can anyone actually come and quote?'; 'Kerry P.: Dave is.' → 'Kerry P.: Dave can.'
- **Carousel slide 6** (page 01, frame 11:248 going by the slide order in the 02 script): headline 'Or. Put the actual job on QSME.'; the three body lines become two: 'Send one job to the trades you choose.' / 'Every one prices the same lines.' Remove 'Licence-verified trades', 'compared line by line' and any verified-profile placeholder or badge. The phone screen becomes the real iPhone app still `assets/qsme/phone/04-project.png` (demo data) cropped to the tile grid ('Ask for quotes', 'Invite'), with the '42 Rimu Street townhouses' header covered, labelled 'QSME iPhone app · demo data'. No owner recording.
- **Carousel slide 7**: 'Free to join. No listing fee on tenders. Your own crew is always free. qsme.co.nz' (small: 'Tradie? Join as a tradie.' stays organic-only).
- **Static post** (page 01, frame 8:25): post line, thread lines and end band to match `outputs/static-212-comments-1080x1350.png` (the HTML static is the master now).
- After the fixes, re-export `outputs/carousel-7-slides-overview.png` (the current one shows the old slides 1, 5 and 6).
- `figma/02-…05-….use_figma.js` describe the old reel body; don't run them unchanged.

## Hooks

### 1. Mid-action start  ✅ chosen

- **Text:** 212 comments. Still no builder.
- **Verbal:** "Asked the community page for a builder." (dry, tired Kiwi deadpan)
- **Visual (rebuilt 2026-10-02, no filmed shot):** Kinetic text over the full-frame generic group thread, which flicks up behind a white wash. A burned-in kicker 'Asked the community page for a builder.' sits over a big meme-caption '197 comments.' The count jumps 197 → 205 → 212 (0.5 s, 1.05 s) with a red-marker circle on 212, then 'Still no builder.' slams in at 1.3 s. Hard cut to Mel's post at 2.5 s. (The old over-the-shoulder hand shot is dropped: no filming needed.)
- **Audio:** Notification pings stacking up faster and faster until they almost become a beat.
- **Why:** Every NZ owner who has done this recognises it within 2 seconds. A specific number plus 'still no builder' states the whole pain in 5 words. It works with sound off and looks like a screen recording, not an ad.

### 2. Dialogue cold-open

- **Text:** Which Dave?
- **Verbal:** Two voices with no context: "Just get Dave." ... "Which Dave?"
- **Visual:** Full-frame screen recording. One comment bubble, 'Which Dave?', fills the screen, then zooms out to show it is one comment buried in a huge thread. It cuts straight to Mel's post card at 2.5s, so the body explains itself.
- **Audio:** A few keyboard-typing clicks, then dead silence on the zoom-out.
- **Why:** Pure curiosity, and it starts on the joke itself. Sam's line no longer says 'Which Dave', so in this variant the peak becomes a reveal of WHO asked it (Dave himself). It's a cold-test challenger to H1. The fixed body now opens on Mel's post, so viewers learn it's a builder hunt by 3.5s.

### 3. Confession

- **Text:** 11:47pm. Still reading comments about Daves.
- **Verbal:** "I'm embarrassed to say how long I've spent reading about Daves."
- **Visual:** A homeowner in bed on the selfie camera, face lit only by the phone, the thread reflected in their glasses. They're tired but amused.
- **Audio:** The quiet hum of a room at night, then one ping.
- **Why:** Very relatable and personal, but it needs a real person on camera. An AI face here would edge toward a fake 'my experience' testimonial. Parked until the founder or a real owner can film it. Not in this test.

### 4. Call-out (rebuilt text-only, no person)

- **Text:** If you've ever asked the local group for a builder...
- **Verbal:** "You've met Dave. Several of him."
- **Visual:** Full-frame screen recording of the thread scrolling slowly under the text. No person and no hands. The text sits in the upper safe box (y 300-700).
- **Audio:** A single ping, a beat of silence, then the VO.
- **Why:** Clear targeting, and 'Several of him' is the best throwaway line in the set. Rebuilt without a person, it costs nothing extra to make and becomes the third cold-test variant. It describes the pain rather than showing it, so it's expected to lose to H1, and the test exists to check that assumption.

### 5. Visual promise (show the end first, then rewind)

- **Text:** Spoiler: it's this Dave.
- **Verbal:** "Spoiler: it's this Dave. The group took 212 comments to not find him."
- **Visual (optional later; the only variant that needs an owner recording):** Opens on a real QSME screen (owner-recorded, hidden demo org): Dave K.'s bid opened from the Compare bids table, his name on his own priced lines. No badge or verification indicator (licence verification isn't confirmed live). Then a fast scrub backwards into the comment chaos.
- **Audio:** Tape-rewind whoosh into stacked notification pings.
- **Why:** Shows the product in second 1. That suits retargeting people who already know the brand, so it runs alone in a retargeting ad set and is never compared against cold hooks. Repeating Dave K.'s bid at 21s is a deliberate bookend for this audience. It gives away the punchline, so it's paid only and never organic.

**Why the chosen hook:** H1 (mid-action start) passes the 2-second 'that's literally me' test best. In the first 3 seconds it stacks four layers: the number on screen, a deadpan spoken line, a real thumb scrolling and ping spam. It works with sound off, looks native to the feed, and sets up the Dave escalation instead of spending it. Since the 2026-10-02 rebuild it's also free to make: the whole reel is rendered from HTML with the motion kit, with no filming, no actors and no AI video. For paid, H1, H2 and H4 (text-only) run in a cold ad set with equal budgets. H5 runs alone in retargeting.

## Static post

- **Size:** 1080x1350 (IG/FB feed). Comment text at least 34px on the 1080 canvas.
- **Headline:** 212 comments. Still no builder.
- **Subline:** Send one job to the trades you choose. Every one prices the same lines.
- **CTA:** Free to join. No listing fee on tenders. qsme.co.nz

**On-image content:**

- MEME CAPTION above the card (bold black on white): 212 comments. Still no builder.
- GROUP HEADER: Hillcrest Locals (Unofficial). Fictional: search before locking and record the check in the brief.
- POST, Mel R.: Anyone recommend a builder? Bathroom + small deck in Hillcrest. Keen for a few quotes. Ta!
- COUNT under post: 212 comments
- Kerry P.: My cousin Dave. Top bloke.
- Sam T.: Hillcrest Dave or the other Hillcrest Dave?
- Aroha W.: Deck Dave or Roof Dave?
- Lynn H.: Following
- Dave K.: Dave here. Which Dave do you mean?
- Mel R.: ...can anyone actually come and quote?
- Kerry P.: Dave can.
- RED MARKER underline under: Keen for a few quotes.
- RED MARKER circle around: Dave here. Which Dave do you mean?
- RED MARKER tally (top corner of the card): Dave count: 6 (ish)
- END BAND line 1 (Manrope 800): Know which Dave.
- END BAND line 2 (Inter, two lines): Send one job to the trades you choose. / Every one prices the same lines.
- END BAND line 3: Free to join. No listing fee on tenders. qsme.co.nz + small QSME logo (top right of the band)

**Look:** Looks like a screenshot someone marked up and sent to a mate. The headline '212 comments. Still no builder.' sits above the card in bold black on white, like a meme caption. The top ~72% is a GENERIC community-group post card in neutral off-white and grey UI: NOT Facebook blue, no 'f', no Meta reaction icons. Avatars are coloured circles with initials (no faces, no AI people). There are 7 comments, cut down from 10 so the text stays at least 34px, in a plain system sans-serif at real phone-screenshot scale, so it reads as native. There are only three red-marker marks: a loose underline under 'Keen for a few quotes.' (the setup), a circle around Dave's comment (the laugh) and the scribbled tally. The bottom ~28% is a QSME-brand band with text only (no screenshot crop, which would be unreadable at this size): 'Know which Dave.' in Manrope 800, the subline in Inter, the CTA line and a small logo. Nothing in the image is polished beyond the end band.

## Carousel

### Slide 1: 212 comments. Still no builder.

Mel R. · Hillcrest Locals (Unofficial): "Anyone recommend a builder? Bathroom + small deck in Hillcrest. Keen for a few quotes. Ta!"

*Visual:* Generic group post card (neutral UI, initials avatars) centred on off-white. 'Keen for a few quotes.' underlined in red marker. '212 comments' circled. A small hand-drawn arrow at the right edge says 'swipe'.

### Slide 2: Comments 1 and 2

Re: Anyone recommend a builder? · 212 comments / Kerry P.: My cousin Dave. Top bloke. / Sam T.: Hillcrest Dave or the other Hillcrest Dave?

*Visual:* A thin top strip restates the question, so the slide still makes sense when IG re-serves the carousel from slide 2. Two large comments with plenty of white space. The red-marker tally 'Dave count: 1' is crossed out and rewritten as '3'.

### Slide 3: Comments 3 to 140

Aroha W.: Deck Dave or Roof Dave? / Jase M.: Big Dave did ours. Not Little Dave. / Lynn H.: Following / Pete G.: Following / Tash B.: Following

*Visual:* Aroha's and Jase's comments stay large (34px or more). The 'Following' lines stack tighter and fade out as they repeat. The tally is scribbled over again: 'Dave count: 6 (ish)'.

### Slide 4: Comment 141

Dave K.: Dave here. Which Dave do you mean?

*Visual:* Just this one comment, with a red-marker circle around it. The tally now reads 'Dave count: ?'. This slide is the laugh, so it stays alone.

### Slide 5: Comments 211 and 212

Mel R.: ...can anyone actually come and quote? / Kerry P.: Dave can.

*Visual:* The two comments only, with generous white space under 'Dave can.' and nothing else. No reply box, no draft. Let the button land.

### Slide 6: Or. Put the actual job on QSME.

Send one job to the trades you choose. / Every one prices the same lines.

*Visual:* The real QSME iPhone app still (`assets/qsme/phone/04-project.png`, seeded demo account) in a plain phone frame, cropped to the project tile grid with 'Ask for quotes' and 'Invite' circled in red marker; the '42 Rimu Street townhouses' header is covered (a seeded street address could match a real home, and it isn't Mel's job). Label: 'QSME iPhone app · demo data'. No comparison table, no 'line by line', no verified badge or verified-profile placeholder. (Figma still has the old copy: see Figma fixes pending.)

### Slide 7: Know which Dave.

Free to join. No listing fee on tenders. Your own crew is always free. qsme.co.nz / small: Tradie? Join as a tradie.

*Visual:* QSME end card in brand colours (Manrope 800 headline, Inter body) with a small logo. The red-marker tally from earlier resolves to one clean tick: 'Dave count: 1'.

## Reel / video

- **Length:** 30.0s (hook 0–2.5 + thread 2.5–13.5 + product 13.5–25.5 + end card 25.5–30), silent master with every line burned in; Mel's VO is laid on later from `vo-script.md`.
- **Aspect:** 9:16 master (1080x1920, 30fps) → `outputs/which-dave-30s-9x16.mp4`. Facebook feed 4:5 (1080x1350) → `outputs/which-dave-30s-4x5.mp4`: the same timeline re-laid for 4:5 (stage moved up 240px, safe box 60,60,1020,1290), not a blind centre crop. In 9:16 ALL text and logos sit inside x 65-1015, y 300-1250 (clears TikTok, IG and FB Reels UI). Pinned post header at y 300-400. Dave count tally at upper left, x 80, y 420-500. Thread text at least 44px. Every walkthrough recreation carries the chip 'Recreation of the app · mock data'; the iPhone still carries 'QSME iPhone app · demo data'.
- **Cover:** pick the frame at about 1.6s ('212 comments. Still no builder.' over the thread) as the IG/TikTok cover; it sits inside y 240-1680 (IG grid 3:4 crop).

| Time | Role | Visual | On-screen text | VO (added later) | SFX |
|---|---|---|---|---|---|
| 0.0-2.5 | hook (H1) | Kinetic text over the full-frame generic group thread, which flicks up three times behind a white wash (blurred bubbles: 'Bump', 'Following', grey filler). No filmed shot, no hand. The count jumps 197 → 205 (0.5s) → 212 (1.05s) with a pop, a red-marker circle draws round 212 (1.1s), then 'Still no builder.' slams in (1.3s). Hard cut at 2.5s. | Asked the community page for a builder. (burned-in kicker) / 197 → 205 → 212 comments. / Still no builder. | Asked the community page for a builder. | Pings stacking and speeding up with each jump |
| 2.5-3.5 | setup | Mel's post card fills the screen: 'Anyone recommend a builder? Bathroom + small deck in Hillcrest. Keen for a few quotes. Ta!' with 'Keen for a few quotes' underlined in red marker. At ~3.3s the card shrinks into the pinned header strip (y 300-400), which stays for the whole thread. | Mel R. · Hillcrest Locals (Unofficial): Anyone recommend a builder? Bathroom + small deck in Hillcrest. Keen for a few quotes. Ta! | (none) | One ping, a short marker squeak |
| 3.5-5.5 | problem | 'Kerry P.: My cousin Dave. Top bloke.' (3.5) and the tally scribbles in: 'Dave count: 1'. 'Sam T.: Hillcrest Dave or the other Hillcrest Dave?' (4.4); 1 is struck out and becomes 3. | (the comments) / Dave count: 1 → 3 | (none) | A ping per comment, a soft tick per tally change |
| 5.5-9.0 | escalation | Scroll, stop on 'Aroha W.: Deck Dave or Roof Dave?' (5.55), scroll, stop on 'Jase M.: Big Dave did ours. Not Little Dave.' (6.9), then a blurred fling past 'Following' x3 and filler while the tally rattles to '6 (ish)'. | (the comments) / Dave count: 6 (ish) | Deck Dave. Roof Dave. (5.7) … Big Dave. Little Dave. (7.1) | Pings speed up into an accidental rhythm |
| 9.0-11.0 | peak (the laugh) | The fling slams to a stop on 'Dave K.: Dave here. Which Dave do you mean?'; a red-marker circle draws round it; the tally becomes 'Dave count: ?'. | Dave count: ? | (none; total silence) | Everything cuts to silence |
| 11.0-13.5 | second laugh | 'Mel R. (Author): ...can anyone actually come and quote?' (11.3), then 'Kerry P.: Dave can.' (11.9). Hold in silence; at 13.1-13.5 the group app swipes away (Mel's reaction, no line). | (the two comments) | (none) | One lonely ping on 'Dave can.', then a soft swipe |
| 13.5-16.2 | product intro | Navy QSME screen. Caption plus the QSME wordmark; below it the REAL QSME iPhone app still (`assets/qsme/phone/04-project.png`, seeded demo account) cropped to the project tile grid, so the '42 Rimu Street townhouses' header is cropped out (covered). Slow push-in; red marker circles 'Ask for quotes' (14.45) and 'Invite' (15.05). | Or. Put the actual job on QSME. / chip: QSME iPhone app · demo data | Or just put the actual job on Q-S-me. (13.3) | Music bed enters at 13.5 |
| 16.2-19.6 | solution | Muted, cropped frames from `walkthroughs/client-tenders.mp4` (Step 1 'Tender details': title and scope of works typed; 'Who can bid' and 'Target trades' cropped out) and, sliding in under it at 17.2, `walkthroughs/client-contacts.mp4` ('Add contact', a name typed; email, phone, notes and the 'saved automatically' captions cropped out). | Send one job to the trades you choose. / chip on each: Recreation of the app · mock data | Send one job to the trades you choose. (16.4) | Light UI taps |
| 19.6-22.5 | value | Muted, cropped tenders recreation, Step 2 'Scope from SOQ': pockets ticked one by one (Civils & Earthworks, Foundations, Structural Frame), 'Pulled from your SOQ' underlined in red marker. No comparison, publish-to-market or 'Quick Jobs' frames (the sidebar is cropped out). | Every one prices the same lines. / chip: Recreation of the app · mock data | Every one prices the same lines. (19.8) | Light taps |
| 22.5-25.5 | payoff (callback) | The recreation fades; the red-marker tally redraws as 'Dave count: 1' with a green tick (22.95), then '— the one you invited.' (23.2), then 'Know which Dave.' (23.75-25.4). | Dave count: 1 ✓ — the one you invited. / Know which Dave. | (none; the ding is the punchline) | One clean, bright ding on the tick |
| 25.5-30.0 | CTA | QSME end card: logo, then the lines, then the URL pill. The tally tick carries over, small, into the upper-left corner. | Free to join. / No listing fee on tenders. / Your own crew is always free. / qsme.co.nz | It's free to join. Your own crew's always free. (25.9) | Music resolves; no logo sting |

## Music

- **Direction:** The first half has almost no music: the notification pings ARE the soundtrack, building into an accidental rhythm. A hard 2-second silence lands on 'Dave here. Which Dave do you mean?' (the laugh), and one lonely ping lands on 'Dave can.' The music bed enters exactly at the swipe to QSME (13.5s) as the release, and resolves under the single 'ding' and the end card.
- **Mood:** Dry, cheeky, then relieved. Understated Kiwi, not hype. For example: clean electric or acoustic guitar, soft kit, light bass, no vocals.
- **BPM:** 90-100 BPM for the groove section (13.5s to the end, ~16.5s). The ping section has no fixed tempo and just speeds up.
- **Source:** ONE commercially licensed music bed, mixed into the CapCut master for EVERY version (organic and paid), so all versions sound identical and the music can enter exactly at 13.5s. Use either (a) an ElevenLabs Music track on a plan that permits commercial use, prompt: 'laid-back warm guitar groove, soft drums, light bass, 95 BPM, no vocals, dry and slightly cheeky, 17 seconds, gentle entry, clean resolve at the end', or (b) a business-tier Epidemic Sound or Artlist licence (their personal and creator tiers exclude brand advertising). Do NOT add in-app music when posting: the TikTok Commercial Music Library and Meta Sound Collection play from 0s and can't be offset to the cut. SFX from ElevenLabs: 'generic soft phone notification ping, short, not iOS tri-tone, not Messenger, 5 slight pitch variations', plus a soft counter tick, one bright resolving ding, a soft swipe whoosh and a short marker squeak.
- **Licensing:** Trending copyrighted songs are licensed for personal or creator use, not brand advertising. On a business account they can get muted or taken down, and they can't go into paid ads. Before posting anything, confirm the user's ElevenLabs plan permits commercial use of the VO, SFX and music. Keep every prompt and licence receipt in projects/<slug>/outputs/licences/. No CapCut library audio in any branded export.

## Voice

- **Character:** Mel, the owner who posted the question. Late 30s, renovating her first place, organised, slightly worn down by the thread but amused by it. She is the straight man and never part of the mess; the thread is the joke.
- **Accent & delivery:** General everyday New Zealand accent, the way a normal Kiwi talks to a mate. Not Australian, not posh British, not a caricature: no 'sweet as bro', no exaggerated vowels, no rising inflection on every line. Dry deadpan, under-played. The roll call 'Deck Dave. Roof Dave. Big Dave. Little Dave.' is completely flat, with a tiny pause between pairs so it lands on the scroll stops. The product lines sound like the same person, still conversational, never an announcer, and she never reads out a URL.
- **ElevenLabs:** First try Voice Library filtered to a New Zealand accent and shortlist 3. Test every candidate on two script lines that expose Kiwi vowels and t-tapping: 'Deck Dave. Roof Dave. Big Dave. Little Dave.' and 'Put the job on QSME. Free to join.' Reject any voice where 'deck' or 'little' sounds Aussie, or that drifts British. If none fit, use Voice Design with: 'New Zealand woman, late 30s, general everyday Kiwi accent, relaxed and dry, slightly tired deadpan humour, talks like she's telling a mate about her week, recorded close on a phone in a quiet lounge. Not Australian, not British, not American, not a newsreader, not exaggerated.' Model: Multilingual v2 by default (no audio tags are needed now). Use Eleven v3 only if the roll-call pauses need finer control. Starting settings: stability ~0.45, similarity ~0.75, style 0-0.1, speaker boost on, speed ~0.95. Generate 3 takes per line and pick in the edit. Add a pronunciation alias for QSME once the user confirms how it's said. If a URL is ever spoken in a future cut, script it as 'dot co dot en zed'. Save the chosen voice ID in ventures/qsme-nz.md. If an ElevenLabs voice ships, switch on the platform AI labels (see integrity notes).
- **Real-person alternative:** Better for trust, free, and it needs no AI label: the founder or a real Kiwi homeowner records the ~40-word VO as a phone voice memo (a wardrobe full of clothes makes a decent booth). Optional alternate end tag: a real builder who is actually on QSME, ideally really called Dave, says 'Dave here. The one who quoted.' to camera on his phone. Only with his written consent, and never 'the verified one' (licence verification isn't confirmed live). The 2026-10-02 rebuild has no filmed shot at all (the hook is kinetic text), so there's no person, real or AI, anywhere in the video.

## Caption

Asked for a builder. Got Dave. Several of him.

Got a good Dave? Tag him.

Or skip the thread: put the actual job on QSME. Send one job to the trades you choose, and every one prices the same lines. Free to join, no listing fee on tenders: qsme.co.nz (link in bio)

**Hashtags:** #NZRenovation #BuildingNZ #HamiltonNZ #NZTradies

**CTA line:** Know which Dave. Put the actual job on QSME. Free to join, no listing fee on tenders, and your own crew is always free: qsme.co.nz

## Production workflow

| # | Step | Tool | What | Output |
|---|---|---|---|---|
| 1 | 1. Pitch and get a yes (before any spend) | Claude | Show the user the 5 hooks and this package. Get answers to the blocking open questions: the exact fee line and organic-only vs a paid budget. (Since the 2026-10-02 rebuild no owner recording or demo org is needed for the main cut; only the optional H5 variant needs one.) (Pronunciation is confirmed: 'Cue Ess Me'. No licence claim is made, so 'which licences' no longer blocks.) | Approved hook (H1) and concept. Idea card status changes to 'agreed', with a dated line added to its discussion history. |
| 2 | 2. Lock copy | Claude | Finalise the thread lines, on-screen text, timed VO script (~40 words; read it aloud against the beat sheet and it must fit inside 28s including the silences), caption, hashtags, CTA and paid ad-copy fields. Run the humor checks: one-sentence joke, works with sound off, nobody punched. Search 'Hillcrest Locals (Unofficial)' to make sure no real group uses it and record the check. | projects/2026-10-xx-qsme-nz-which-dave/brief.md + script.md + shots.md |
| 3 | 3. Build the generic group UI kit | Figma (via the connected Figma MCP) | Auto-layout components: GroupPost, PinnedPostHeader, Comment (variants: normal / OP / Dave), a red-marker 'Dave count' tag (variants 1, 3, 6 (ish), ?, 1 with tick), a red-marker underline and circle, and initials avatars, all in a neutral palette that does not look like Facebook. Thread text at least 44px in 1080x1920 frames and at least 34px in 1080x1350 frames. Add a safe-zone overlay frame (x 65-1015, y 300-1250) to every 9:16 frame, plus a QSME end card using the real brand assets (Manrope 800, Inter, logo, colours). | Figma file 'QSME NZ - Which Dave' with components and frames |
| 4 | 4. Static, carousel and cover | Figma (static now rendered from motion/static.html) | Lay out the 7 carousel slides. Slide 6 uses the real iPhone app still 04-project (demo data) cropped to the tile grid with the address header covered (see Figma fixes pending); no Compare bids screenshot needed. Export cover.png with '212 comments. Still no builder.' centred inside y 240-1680. | static_1080x1350.png, carousel_01-07.png, cover.png (carousel.pdf only if LinkedIn is confirmed) |
| 5 | 5. Thread prototype and full-frame recording (DONE differently 2026-10-02: the whole reel is rendered from motion/which-dave-30s.html with the motion kit) | Figma prototype + iPhone screen recording | Smart Animate prototype: Mel's post card shrinking to the pinned header, comments popping in, the scroll-stop pacing, the hard stop on Dave, Mel and Kerry, then the app swipe away. The counter uses three states (197, 205, 212) with a 0.15s Smart Animate between them, and the pings cover the jumps. Open the prototype on the phone for the hook shot. Screen-record it full-frame at 1080x1920 for the body (don't refilm the screen). | thread_body_9x16.mp4 (full-frame), prototype ready on the phone for the hook shot |
| 6 | 6. Film the real bits (NOT NEEDED since 2026-10-02: kinetic hook, recreation-based product beat; keep only for an optional H5 variant) | iPhone (no AI) | Hook only: the over-the-shoulder phone-in-hand shot at a kitchen bench with a floor plan, natural light, 3-4 takes. The owner screen-records QSME signed in, on a hidden demo org that is excluded from public search and the live projects map: create a project (QSME wordmark visible in the header), the tender going out, the Compare bids table (flip Excl./Incl. GST), and Dave K.'s bid opened to its own lines. No verification badge. Delete the demo data after filming. No Higgsfield, Runway or Veo. | hook_a-d.mov, qsme_create.mov, qsme_tender.mov, qsme_compare.mov, qsme_dave_bid.mov |
| 7 | 7. Voice, SFX, music | ElevenLabs (or a founder voice memo for the VO) | VO for Mel (3 takes per line), or the founder's phone memo. SFX: 5 generic ping variations (the prompt excludes the iOS tri-tone and the Messenger pop), a counter tick, one bright ding, a swipe and a marker squeak. One ~17s music bed used in every version. This is the only paid step: confirm the spend and that the plan permits commercial use first. | vo_mel_*.wav, sfx_pack/*.wav, music_bed.wav, outputs/licences/ (prompts + receipts) |
| 8 | 8. Edit (picture locked 2026-10-02: outputs/which-dave-30s-9x16.mp4 and -4x5.mp4; only audio is left) | CapCut or tools/mux | Lay the VO, SFX and music onto the locked MP4s on the 30s beat sheet: the ping rhythm, the 2s silence on Dave, the lonely ping on 'Dave can.', music in at 13.5s, and the single ding at about 22.95s. Only burn in captions for VO lines not already on screen (the hook line); the comments and on-screen text are the captions everywhere else. Check every frame against Meta's and TikTok's safe-zone overlays. Use only our own assets (ElevenLabs audio, Figma exports, Manrope and Inter): no CapCut library audio, stickers, templates or fonts. Exports: organic 9:16 (with the tradie line), a 4:5 FB-feed crop, paid cold variants H1/H2/H4 and retargeting H5 (only the first 2.5s changes; no tradie line on the paid end card). | which-dave_organic_9x16.mp4, which-dave_4x5.mp4, which-dave_paid_H1/H2/H4/H5.mp4, cover.png |
| 9 | 9. Review | Claude + user | Skill step-7 checks: the hook lands in under 3s with sound off; the QSME brand is on screen within 0.5s of the swipe; the product is the payoff, not an ad read; still funny on the third watch. Every claim matches research/2026-10-02-qsme-platform-truth.md and the pricing sheet ('Free to join', 'No listing fee on tenders', 'Your own crew is always free', one job sent to the trades you choose, every bidder prices the same lines cut from the SOQ) and there is no bare 'Free', no 'verified', no 'line by line' and no comparison claim. No Meta branding or trade dress; all names fictional; the demo data is off public listings; the AI label is set if the VO is ElevenLabs. | Go / fix list |
| 10 | 10. Post organic and measure | Platforms + Claude | Post on IG, FB and TikTok with cover.png. Link in bio goes straight to the signup or create-project page with utm_source=instagram/facebook/tiktok&utm_medium=organic_social&utm_campaign=which-dave. After 3-7 days, record average watch time, shares plus saves per 1,000 views, and comment themes. Go-to-paid rule: average watch time of 15s or more AND shares plus saves of 10 or more per 1,000 views on any one platform. | learnings.md row + idea card status 'posted' |
| 11 | 11. Conversion tracking (before any paid spend) | QSME site + Meta Events Manager + TikTok Events Manager | Confirm the Meta Pixel plus Conversions API, and the TikTok Pixel, fire on signup or 'Create a project' (CompleteRegistration or a custom ProjectCreated event), with test events verified. Paid links go to the signup or create-project page, not the homepage, with utm_source=meta/tiktok&utm_medium=paid_social&utm_campaign=which-dave&utm_content=h1/h2/h4/h5. The success-fee line must be visible on the landing page. | Verified test events + UTM sheet in the project folder |
| 12 | 12. Paid hook test (only after the user approves a budget) | Meta Ads Manager + TikTok Ads Manager | Boost the organic H1 post with Meta 'Use existing post' or TikTok Spark Ads so real comments carry over. H2 and H4 run as new ads, or post them organically first if their comments should carry too. Cold ad set: H1 vs H2 vs H4 with equal budgets of about NZ$15-25/day each for 5-7 days. H5 runs alone in a site-visitor or engager retargeting ad set. Meta primary text: 'Asked the community page for a builder. 212 comments, six Daves, still no builder. Put the actual job on QSME: send one job to the trades you choose, and every one prices the same lines. Free to join.' Headline: 'Know which Dave.' Description: 'Free to join. No listing fee on tenders. Demo data and app recreations shown.' Button: Sign up. TikTok ad text: '212 comments. Six Daves. No builder. Put the actual job on QSME. Free to join.' Starting benchmarks (revise after the first test): hook rate (3s plays / impressions) of 25% or more, hold (ThruPlay / 3s plays) of 30% or more, link CTR of 1% or more. Kill any variant under a 15% hook rate after ~3,000 impressions, then judge the survivors on CPA. | learnings.md rows (hook rate, hold, CTR, CPA per variant) + the winning hook |

## Integrity notes

- No real Facebook or Meta branding or trade dress: generic group UI in neutral colours (not FB blue), no 'f', no Meta reaction icons. SFX are generic pings, not the iOS tri-tone or the Messenger pop. On-image copy says 'local group', the VO says 'community page', and nothing says 'Facebook'.
- All names are fictional and initials-only (Mel R., Kerry P., Dave K., etc.). Avatars are initials, not AI faces. The group name is now 'Hillcrest Locals (Unofficial)'; search it before locking and record the check in the brief. No business-sounding names like 'Dave Builds'.
- Humor punches at the process (hearsay, vague threads, nobody able to check anything), never at tradies or owners. Mel's late line is now '...can anyone actually come and quote?' (2026-10-02, replacing '...is anyone here licensed?'). The 'actually' is aimed at the thread, where everyone names a Dave and nobody offers a quote; it is not a no-show gag about tradies, and Kerry's 'Dave can.' keeps Dave likeable. There are no no-show or dodgy-tradie gags, and Dave is likeable and as lost as everyone else. The half-typed 'Which D|' draft is cut, so Mel stays the straight man.
- '212 comments', 'Dave count: 6 (ish)', 'six Daves' and the comment numbers are jokes inside the skit, not claims. There are no customer counts, ratings, reviews, 'X tradies on QSME', speed or savings claims anywhere.
- Pricing: never a bare 'Free'. Only the site's own wording is used: 'Free to join' and 'No listing fee' (checked against qsme.co.nz/pricing on 2026-10-02, which also says 'Your first project, free' and a 1% success fee each side, capped at $2,000, invoiced only when a public-marketplace job completes). The ad shows the public-tender flow, so paid ads must show the success-fee line on the landing page. Optional ad description: 'Free to join. No listing fee. Success fee only on completed public-tender jobs.'
- No licence or verification claim (fact-check 2026-10-02): licence verification is merged but not confirmed live, and 1 of 22 directory profiles is verified, so 'licence-verified' / 'verified tradies' is on the red list even though the homepage says it. Since 2026-10-02 the licence setup is gone from every format ('Must be licensed' → 'Keen for a few quotes.', '...is anyone here licensed?' → '...can anyone actually come and quote?', 'Dave is.' → 'Dave can.'), so the thread no longer sets up a licensing promise QSME can't keep yet. The payoff is 'Dave count: 1 ✓ — the one you invited', never 'QSME checks Dave's licence'. Don't add a licence line until the owner confirms verification is live.
- No 'line by line' (fact-check 2026-10-02): Compare bids is a table of totals per bidder (Excl. GST | GST | Incl. GST, 'Lowest' tag) and each bid opens to its own lines. The side-by-side line matrix is branch-only. 'Same job / same lines for every bidder' is true because the tender is cut from the job's lines. Also avoid 'apples with apples' (the truth sheet says it overstates the screen).
- Features claimed (2026-10-02 cut) are limited to: put the actual job on QSME (a project), send one job (a tender cut from the SOQ, private or public) to the trades you choose (invitations from your own contacts), every bidder prices the same lines, free to join, no listing fee on tenders, your own crew is always free (pricing sheet: 'Your own tradies are always free'). The reel no longer shows or claims the Compare bids table; 'every quote in one table, GST shown both ways' stays true but is kept for the H5 variant only. The CCC and document trail is deliberately left out of this one-joke video and saved for the ccc-hunt idea.
- Product shots (2026-10-02 cut): one REAL QSME iPhone app capture (seeded demo account, address header covered) and muted, cropped frames from QSME's own narrated walkthrough recreations (mock data), each recreation labelled 'Recreation of the app · mock data' and the still 'QSME iPhone app · demo data'. Crops leave out the 'Quick Jobs' sidebar item (a removed feature), the comparison and publish steps, 'Who can bid / Target trades', contact emails and phone numbers, the 'CRM notes' field and the walkthrough's own captions. Any later owner recording (H5 only) must be on a staging environment or a hidden test org that is excluded from public search and the live projects map, and deleted after filming. Don't mock up a verification badge or a comparison table that differs from the real product. Dave K. is a demo bidder, or a real tradie who has given written consent. The paid ad description includes 'Demo data shown'.
- Mel is a skit character, not a testimonial. Her product lines describe what QSME does, not results she 'got' ('Know which Dave' is on-screen text, not 'QSME found me a builder in 2 days').
- AI voice disclosure: if Mel's VO comes from ElevenLabs, turn on TikTok's 'AI-generated content' setting and Meta's AI label when posting organically, and add this to the step-9 checklist. Prefer the founder's phone voice memo, which needs no label. There are no AI people anywhere. AI video is only a fallback, and only with disclosure.
- No social-proof beat: there is no real proof yet, so the 'proof' role is left out on purpose. For paid, boosting the organic post (Spark Ads or 'Use existing post') carries over its genuine comments. Never seed or write comments ourselves.
- Music and assets: one commercially licensed music bed in the master for every version. No trending copyrighted tracks, no in-app music, and no CapCut library audio, stickers, templates or fonts in branded exports. Prompts and licence receipts are saved in projects/<slug>/outputs/licences/.

## Open questions for you

- [ ] How is QSME said out loud: 'Q-S-M-E' or 'kiss-me'? Your message reads like it was dictated as 'kiss me'. The VO says the brand twice ('...on QSME'), so this blocks the voice recording and the ElevenLabs pronunciation alias.
- [x] (Resolved 2026-10-02: the licence setup is swapped for the quote setup everywhere, so nothing implies QSME checks licences.) Licence verification: the fact-check (2026-10-02) found it merged but not confirmed live (1 of 22 profiles verified, LBP lookup only if the MBIE key is set). Until you confirm it's live, the video makes no licence claim. Do you want to soften Mel's 'Must be licensed' setup so viewers don't infer QSME checks licences, or keep it as a pure skit line? (Current call: keep it; the payoff only claims you know which Dave quoted.)
- [ ] Pricing wording: the live /pricing page says 'Your first project, free' plus a 1% success fee each side (capped at $2,000) on completed public-tender jobs. Is a second project charged? Confirm the exact fee line to show on the paid landing page and in the ad description.
- [ ] (Only for the optional H5 variant now; the main cut needs no owner recording.) Is there a hidden demo org excluded from public search and the live projects map, where you can create 'Bathroom + deck, Hillcrest', send the tender and add a demo bid from 'Dave K.' to screen-record (we never log in)? Or is there a real QSME builder (bonus if he's really a Dave) who'd consent to appear?
- [ ] Organic only to start, or is there a paid budget? The suggested cold test is about NZ$15-25/day per variant x 3 variants x 5-7 days, roughly NZ$225-525, plus a small H5 retargeting set. Are the QSME IG and TikTok accounts business accounts? Are the Meta Pixel plus CAPI and the TikTok Pixel installed on signup / 'Create a project'?
- [ ] Voice: will you or a real Kiwi owner record the ~40-word VO on a phone (better for trust, no AI label), or should we use ElevenLabs? Female or male? Does your ElevenLabs plan permit commercial use of VO, SFX and music?
- [ ] Is Hamilton/Hillcrest the right place to set it, or should it be where QSME has the most projects (e.g. Auckland, Christchurch)?
- [ ] Do you want a tradie-side cut as well? Same thread, but the ending is for Dave: 'Stop quoting off a comment. Join as a tradie.' QSME is two-sided, so it would reach both audiences.
- [ ] Brand assets for Figma: logo files and exact colour values. Fonts are noted as Manrope 800 and Inter in ventures/qsme-nz.md; confirm they're current.
- [ ] Does QSME NZ post on LinkedIn for small developers? If not, the LinkedIn carousel is dropped from this package.
- [ ] Do you want the same package for qsme.build next ('Six quotes, six formats', LinkedIn-first, neutral international English, 'Book a 30-minute demo')?

## Discussion history

- 2026-10-02 (fact-check fix): Removed two claims the platform truth sheet (research/2026-10-02-qsme-platform-truth.md) says aren't live: 'Licence-verified trades/tradies' (licence verification is merged but not confirmed; 1 of 22 profiles verified) and 'compared line by line' (Compare bids is a table of totals excl. and incl. GST with a 'Lowest' tag; the line matrix is branch-only). The reel body's QSME beats now read 'Tradies quote on the same job' and 'Every quote in one table, GST shown both ways', then 'Know which Dave.' (Dave K.'s bid opens to its own lines, no badge). The reel was re-rendered with the motion kit (QA passed: outputs/which-dave-reel-body-9x16.mp4 + -9x16-frames.png). The static end band now says 'Tradies quote on the same job. Every quote in one table.', rebuilt as motion/static.html and exported to outputs/static-212-comments-1080x1350.png. The slide 6 copy is corrected here and listed under Figma fixes pending (no Figma quota). The caption, Meta ad text, H5, beat sheet, workflow, integrity notes and VO script (vo04/vo05) were rewritten to match, and 'apples with apples' was dropped. The joke, timings and 'Free to join. No listing fee.' are unchanged.
- 2026-10-03 (30 s rebuild for the 8 Oct, 8pm NZT week-1 slot): Rebuilt 'Which Dave?' into a complete, postable 30s reel with no filmed shot and no owner-recording placeholders. Hook: H1 '212 comments. Still no builder.' as kinetic text over the full-frame thread, the count jumping 197 → 205 → 212 (H2 'Which Dave?' stays the A/B variant). Licence setup swapped everywhere (thread, pinned-header underline, static, this file, VO): 'Must be licensed' → 'Keen for a few quotes.', '...is anyone here licensed?' → '...can anyone actually come and quote?', 'Dave is.' → 'Dave can.'. Product beat 13.5–25.5: 'Or. Put the actual job on QSME.' over the real iPhone app still 04-project cropped to the tile grid (address header covered, 'Ask for quotes' and 'Invite' circled), then muted, cropped tenders recreation frames (Step 1 scope the package, Step 2 pull lines from the SOQ) and the contacts recreation (Add contact), each labelled 'Recreation of the app · mock data', under 'Send one job to the trades you choose.' / 'Every one prices the same lines.'; tally callback 'Dave count: 1 ✓ — the one you invited.' then 'Know which Dave.'; end card 'Free to join. No listing fee on tenders. Your own crew is always free. qsme.co.nz'. Rendered outputs/which-dave-30s-9x16.mp4 and a re-laid 4:5 Facebook feed version outputs/which-dave-30s-4x5.mp4 (both QA passed, contact sheets and spot frames checked). Static PNG re-exported with the new thread lines and a matching end band. The old reel body is kept but marked superseded. vo-script.json/.md re-timed to the 30s video with the hook line at 0.0 and new vo03–vo06; vo_status ok for this project. Figma slides 1, 5, 6 and 7 still need the hand fixes listed above before any export.
