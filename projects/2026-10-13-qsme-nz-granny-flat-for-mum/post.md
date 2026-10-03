---
title: "Granny flat for Mum (Flat 2 gets a vote)"
venture: qsme-nz
idea: nz-granny-flat-for-mum
status: "rendered — awaiting approval"
publish_date: 2026-10-13
publish_time: "19:30 NZDT (Tue)"
created: 2026-10-02
calendar_week: 2
format: short
kind: "situation-demo (funny)"
length_s: 31.9
aspect: "9:16"
platforms: ["Instagram Reels", "TikTok", "Facebook Reels", "YouTube Shorts"]
video: outputs/granny-flat-for-mum-9x16.mp4
cover: outputs/granny-flat-for-mum-9x16-cover.png
---

# Granny flat for Mum (Flat 2 gets a vote)

**The joke in one sentence:** Everyone at every barbecue says granny flats are easy now, so we look the section up: the granny-flat row says "can often… where the site meets the conditions", and because we're on a cross-lease, the deciding vote belongs to Flat 2, the neighbours we've only ever talked to about bins.

**The insight:** Everybody's heard granny flats got easier. Nobody mentions that on a cross-lease, the other flat owners still have to agree to any change of footprint. QSME's "What this site would require" checklist puts the good news and the catch in the same list, each with the reason ("because: Cross-lease title"), before you ring the builder.

**Job:** Organic first (week 2's funny short, the first signed-in Site research video). It moves to paid only on the calendar rule (15s+ average watch and 10+ shares and saves per 1,000 views on one platform, plus the owner's budget yes), by boosting the original post so its comments carry over.

**Why this slot:** Tuesday 7:30pm reaches Auckland homeowners and families at their best weeknight scroll on IG and FB. It opens feasibility week on the hottest housing topic (granny flats under the new national rules, with families planning summer builds in spring). Its feature, the requirements checklist, is deliberately left out of Sunday's long-form, and this version drops the zone-card beat so it doesn't repeat that long-form.

## Production status (2026-10-03, v3: owner CTA rule)

| Piece | State | Where |
|---|---|---|
| 9:16 video, 31.9s, 1080×1920, silent master with burned-in captions | ✅ Re-rendered (v3, 2026-10-03: end card now pushes sign-ups) with the motion kit. QA passed on the Reels safe box 65,300,1015,1250. v3 (2026-10-03): contact sheet re-read and the end card checked at 27.3, 28.15, 28.4, 29.5 and 31.85s; only the end card changed. v2: I read the contact sheet and checked frames pulled from the encoded MP4 at 0.05, 1.0, 2.3, 2.7, 3.1, 4.6, 5.6, 6.2, 9.8, 10.1, 10.5, 10.9, 11.3, 11.7, 13.2, 14.0, 15.5, 15.9, 16.5, 17.0, 17.6, 18.0, 18.9, 20.0, 20.5, 21.5, 22.6, 23.3, 25.0, 26.2, 27.3, 27.7, 28.3, 29.5 and 31.85s | `outputs/granny-flat-for-mum-9x16.mp4` · `outputs/granny-flat-for-mum-9x16-frames.png` · `outputs/granny-flat-for-mum-9x16.preview.mp4` |
| Cover / thumbnail (2.7s: "Granny flat for Mum." + the REQUIRED stamp, with the bubble and the barbecue pill at full strength) | ✅ Exported. Checked as a 3:4 grid crop (y 240–1680): the headline, stamp, bubble, pill and "Illustrative" label all sit inside it | `outputs/granny-flat-for-mum-9x16-cover.png` |
| Motion source | ✅ `motion/granny-flat-for-mum.html` (kit page, `body.nz r9x16`) | motion/ |
| B-roll | ✅ `gf-3-placed` (a crane lowering the unit; the workers are small and unidentifiable), 0–2.05s, labelled "Illustrative". `gf-1-idea` and `gf-5-movein` are deliberately NOT used: their AI-generated people stand front and centre and would read as the family | `motion/clips/gf3/` (from `assets/qsme/broll/gf-3-placed.v1.mp4`) |
| Live footage | ✅ qsme.co.nz homepage, phone viewport, captured 2026-10-02 with nothing typed and no account data on screen. The end card shows the "Search your address" strip, cropped above "View live projects on the map" | `motion/clips/home-mobile/` · steps `motion/capture-home-mobile.json` |
| Product card ("What this site would require") | 🟡 Recreated QSME screen with demo data, labelled "Recreated QSME screen · demo data" in every product beat. If Session A lands by Fri 9 Oct, swap it in and drop the label (table below). If the stand-in ships, it ships with this label | in the page (`#card`) |
| VO | 🟡 Timed Kiwi script for Mel, v3: 11 lines, 363 characters, `vo_status.py` ok (CTA line now "Auckland? Check yours. Sign up at Q-S-me dot co dot en zed."). Generate it after the ElevenLabs upgrade | `vo-script.md` · `vo-script.json` |
| Music + SFX | ⬜ ElevenLabs Music / SFX on a commercial plan, or a licensed library track (see Music) | none yet |
| Facebook 4:5 feed cut | ⬜ Not rendered. It's optional (Reels covers FB). It would be a re-layout of the same page with `body.r4x5` (safe box 60,60,1020,1290), about an hour of work | to do |

**Re-render from the studio root:** `node tools/motion/make.mjs projects/2026-10-13-qsme-nz-granny-flat-for-mum/motion/granny-flat-for-mum.html projects/2026-10-13-qsme-nz-granny-flat-for-mum/outputs/granny-flat-for-mum-9x16.mp4 --safe 65,300,1015,1250` (add `--check` while designing; takes about 4 min). Cover: run the same command with `--still 2.7 --still-only` into a scratch folder, then copy the PNG over.
**Re-capture the homepage (nothing typed):** `node tools/motion/capture.mjs projects/2026-10-13-qsme-nz-granny-flat-for-mum/motion/capture-home-mobile.json projects/2026-10-13-qsme-nz-granny-flat-for-mum/motion/clips/home-mobile`. If the hero layout moves, fix the crop in `#e-strip img { top: -868px }` (strip height 226px keeps "View live projects on the map" out) and the focus ring `#e-ring`.
**Re-cut the b-roll:** `tools/motion/extract assets/qsme/broll/gf-3-placed.v1.mp4 projects/2026-10-13-qsme-nz-granny-flat-for-mum/motion/clips/gf3 30 0 20 1280`.

## Hook layers (chosen: contrast, hearsay vs the checklist, plus a pattern-break stamp)

- **Text (frame 1):** "Granny flat / for **Mum.**" (118px Manrope, "Mum." in green), plus a white speech bubble in two short lines: "“Easy now. / The rules changed.”". At 0.5s a navy pill appears with "— every barbecue since winter", so the laugh line reads over the light concrete and gravel. Frame 0 already shows the headline and the quote.
- **Visual:** the `gf-3-placed` b-roll (a crane lowering a finished granny-flat unit into a Kiwi back yard at dusk, labelled "Illustrative"). At 2.05s it freezes and dims, and at 2.15s a big red **REQUIRED** stamp slams on in the product's own badge style, with a small screen shake. The bubble and pill stay at full strength, so viewers can finish reading while the stamp holds for 0.85s before the cut. It doesn't say what's required yet, so the viewer stays.
- **Verbal (VO later):** "Granny flat for Mum. Easy, apparently."
- **Audio:** a light, hopeful two-note pluck, cut dead by a single rubber-stamp thud at 2.15.
- **Why it works:** every Auckland family with an ageing parent has had this barbecue conversation. The stamp says "not so fast" before a word of product appears. The quote is hearsay, attributed to the barbecue and never to QSME, and the red-list phrase "no consent needed" never appears.

## Beat-by-beat script (times are seconds on outputs/granny-flat-for-mum-9x16.mp4)

| Time | Role | On-screen text | VO (later, Mel) | Visual | SFX |
|---|---|---|---|---|---|
| 0.0–3.0 | hook | Granny flat / for **Mum.** · bubble "“Easy now. / The rules changed.”" (both from frame 1) · navy pill "— every barbecue since winter" (0.5) · label "Illustrative" · **REQUIRED** stamp (2.15) | Granny flat for Mum. Easy, apparently. | `gf-3-placed` b-roll in a soft-edged window over a blurred fill of the same shot, with a slow push-in. It freezes and dims at 2.05, then the stamp slams at 2.15 with a small screen shake (2.29–2.49) | Two-note hopeful pluck 0.1–2.0; stamp thud 2.15 |
| 3.0–4.85 | product intro | chip "**QSME** Site research" · label "Recreated QSME screen · demo data" · caption "So we looked up our section first." (3.15) | So we looked it up first. | Hard cut: the white "What this site would require" card rises in on navy (title, All / Required / Likely pills). A quick scroll (3.4–4.25) runs past the CONSENTS rows and lands on the granny-flat row; the card's top edge settles in the gap above it, so no half-lines sit under the chip | Soft whoosh 3.0; scroll tick 3.4 |
| 4.25–8.6 | problem (the good news, conditional) | caption "“Can often.” **Read the conditions.**" (5.0) | Can often. Where the site meets the conditions. Righto. | The POSSIBLE row "Granny flat without consent — Under the national granny-flat rules a detached minor unit up to 70 m² **can often** be added without resource consent (and with a simplified building pathway) **where the site meets the conditions**. because: Residential - Single House Zone". The yellow highlighter sweeps "can often" (4.45–4.85), then "where the site meets the conditions" (5.15–5.95), under a slow push-in | Highlighter squeaks 4.45 and 5.15 |
| 8.55–11.45 | twist (setup) | caption "Then we clicked “Required”." (9.25) | Then we hit Required. | Pull back to the whole card, a long list (8.55–9.15). A cursor lands on the "Required" pill and clicks (10.05). The pill turns green and the list collapses to the must-haves (10.1–10.5). The camera pushes in straight away (10.6–11.45): the Building consent row passes under the top edge, and the frame settles with NEIGHBOURS & APPROVALS as the top line | Click 10.05; soft collapse whoosh 10.1–10.5; music drops out |
| 11.45–15.75 | twist (the catch) | caption "Because we're on a **cross-lease.**" (11.5) · small "Read from the legal description: a clue, not a title search." (11.9) | We're a cross-lease. … Oh. | The REQUIRED row "Other cross-lease owners' consent — On a cross-lease the other flat owners **must consent to any change of footprint**, and the flats plan must be updated (or the title converted to fee simple first)." The badge pulses red (11.45). The highlighter takes "must consent to any change of footprint" (12.2–13.05), then a red marker circle draws round "because: Cross-lease title" (13.35–13.95) | Low single piano note 11.45 ("oh."); marker squeak 13.35 |
| 15.75–22.4 | self-own (the joke) | paper labels "ONE SECTION, SHARED." "(that's a cross-lease)" · "FLAT 1" "(us)" · green dashed "60 m² / granny flat? / for Mum" · "FLAT 2" · captions "Flat 2 gets a say." (18.35) then "We've only ever talked about bins." (20.15) | Flat one's us. Flat two's next door. / They get a say. / Only ever talked about bins. | Graph paper slides up over the card, with the sketch at 1.15× so it fills the safe box. The marker draws one shared section, then Flat 1 and two stick figures (us, one pointing at the dashed granny flat with a heart), all done by 17.25. The camera pans right (17.35–18.15) past the red-lid and yellow-lid Auckland bins to Flat 2. On the punchline a red arrow draws up from the caption to the bins (20.2–20.6) and both lids hop. Stick figures only, no AI people | Paper slide 15.75; marker scribbles 15.95–18.3; bin lids "plonk" 17.75 and 17.87; lid hop 20.6 |
| 22.4–27.4 | value / next step | caption "Next: the LIM, the title, and a cuppa with next door." (22.75) · green marker "(might bake something)" (25.2) | So. Lim, title, cuppa with next door. / Might bake something. | Hard cut back to the card (All), framed with COSTS & CHECKS as the top line, on the CHECK row "LIM & Record of Title — **Order a LIM and the title before committing**: consent notices, covenants, easements, contamination (HAIL) history and past consents change what is possible." Highlighter 22.95–23.75. A white marker teacup draws itself under the card (24.65–25.4) | Highlighter 22.95; teacup "clink" 24.8 |
| 27.4–31.9 | CTA | QSME wordmark · "See what your **Auckland section** would require." · live homepage strip (Search your address / e.g. 12 Queen Street, Auckland) · "qsme.co.nz · live homepage, 2 Oct 2026" · "**Sign up** → search your address → Site research" (28.05) · pill **Sign up at qsme.co.nz** (28.25) · "Indicative only. Not a LIM, title search or planning advice." (28.5) | Auckland? Check yours. Sign up at Q-S-me dot co dot en zed. (27.55) | The card fades out and the end card builds. A green focus ring pulses round the real homepage address field (from 28.2). The path line puts signing up first: the checklist is what you get in Site research once you have an account. The "Sign up at qsme.co.nz" pill stays on screen for 3.65s | Music resolves on one warm chord at about 31.2 |

Captions are 60px Manrope ExtraBold in a navy box (the 9:16 floor is 44px); small print is 30px and the end-card path line is 34px. Every beat reads with sound off, and nothing important is only in the VO.

## Captions, hashtags and CTA

UTM pattern: `https://www.qsme.co.nz/?utm_source=<platform>&utm_medium=organic_social&utm_campaign=granny-flat-for-mum`

### Instagram Reels (Tue 13 Oct, 19:30 NZDT)

> Granny flat for Mum. "Easy now. The rules changed." (Every barbecue since winter.)
>
> So we looked the section up first. The granny-flat line says it "can often" be added without resource consent… "where the site meets the conditions". Righto.
>
> Then we clicked Required. We're on a cross-lease, so the other flat owners have to agree to any change of footprint. Flat 2 gets a say.
>
> We've only ever talked about bins. Might bake something.
>
> Want to see what your Auckland section would require? Sign up at qsme.co.nz and search your address in Site research. Link in bio.
>
> (A skit. Real checklist wording, demo data.) Indicative only: not a LIM, title search or planning advice.

**Hashtags (5):** #GrannyFlat #CrossLease #AucklandHomes #NZBuild #Renovation
**Cover:** `outputs/granny-flat-for-mum-9x16-cover.png`. Put the link in bio with the UTM `utm_source=instagram`.

### TikTok (same evening)

> Granny flat for Mum: "Easy now. The rules changed." Then we checked the section and remembered we're a cross-lease. Flat 2 gets a say. We've only ever talked about bins. Auckland? Sign up at qsme.co.nz and search your address in Site research. (A skit. Real checklist wording, demo data.)

**Hashtags (4–5):** #grannyflat #crosslease #auckland #nzhomes #homereno
Pin a comment: "Not a LIM or planning advice. It's a checklist of what to ask about before you ring the builder (Auckland first). Sign up at qsme.co.nz to see yours."

### Facebook Reels (same evening; Facebook skews to older renovators and the parents themselves)

> Thinking about a granny flat for Mum or Dad this summer? The new rules help, but read the conditions.
>
> We looked up our section first. The checklist said a granny flat "can often" go in without resource consent "where the site meets the conditions". Then the catch: we're on a cross-lease, so the other flat owners have to consent to any change of footprint.
>
> Next: the LIM, the title, and a cuppa with next door.
>
> See what your Auckland section would require. Create your account at qsme.co.nz and search your address in Site research: https://www.qsme.co.nz/?utm_source=facebook&utm_medium=organic_social&utm_campaign=granny-flat-for-mum
>
> Cross-lease owners: how did the chat with next door go?
>
> (A skit. Real checklist wording, demo data. Indicative only. Not a LIM, title search or planning advice.)

**Hashtags (2–3):** #GrannyFlat #CrossLease #Auckland

### YouTube Shorts

- **Title:** Granny flat for Mum… then Flat 2 gets a say #shorts
- **Description:** "Easy now. The rules changed." So we looked up our Auckland section first: the granny-flat line says "can often… where the site meets the conditions", and on a cross-lease the other flat owners must consent to any change of footprint. Next: the LIM, the title, and a cuppa with next door. See what your Auckland section would require: sign up at qsme.co.nz and search your address in Site research: https://www.qsme.co.nz/?utm_source=youtube&utm_medium=organic_social&utm_campaign=granny-flat-for-mum · Indicative only, not a LIM, title search or planning advice. A skit: real checklist wording, demo data, illustrative b-roll.
- **Hashtags:** #GrannyFlat #CrossLease #NZ

**CTA line (all platforms):** See what your Auckland section would require. Sign up at qsme.co.nz and search your address in Site research.
**CTA rule (owner, 2026-10-03):** every CTA pushes sign-ups ("Sign up at qsme.co.nz" or a listed variant). Never write "free", "free account", "no sign-up", "no login", "without an account" or any pricing line in captions, comments, titles, hashtags, VO or on screen.

## Music

- **Direction:** A hopeful two-note pluck under the hook, cut dead by the stamp thud at 2.15 (that cut IS the joke's first beat). From 3.2, a light, warm, slightly wry loop: muted nylon-string guitar and a soft shaker, about 100 BPM, quietly optimistic. No ukulele, no whistling, no trending track. It ducks 10–12 dB under the VO and drops out on the Required click (10.05), so the collapse whoosh plays alone. It comes back thinner under the cross-lease reveal, with one low piano note at 11.45, picks up a light pizzicato under the sketch and the bins (15.75–22.4), continues through the LIM beat (teacup clink at 24.8) and resolves on one warm held chord at about 31.2.
- **Source:** ElevenLabs Music on a plan that includes commercial use. Prompt (track laid at 3.0s): "light warm muted nylon guitar and soft shaker, 100 BPM, gently wry and optimistic, no vocals, no ukulele, 29 seconds, enters at 0.2s, drops out for 1.4 seconds at 7.05s, light pizzicato from 12.75s, resolves on one held warm chord at 28.2s". Or use a library track on a licence that covers paid social. SFX (ElevenLabs Sound Effects or a licensed library): two-note pluck, rubber-stamp thud, trackpad click, soft whoosh, highlighter squeak, marker scribble, paper slide, wheelie-bin lid plonk, teacup clink. No CapCut or TikTok library audio, so the paid boost stays clear.

## Owner recordings to swap in (Session A, finish by Fri 9 Oct)

The card in the video is a recreated QSME screen (layout, colours, level badges and wording copied from the product's RequirementsCard; demo site data), labelled "Recreated QSME screen · demo data". Replace it with real recordings before or after the organic post. The edit keeps the same camera moves, highlights and captions.

| Replaces (timestamp) | Exact screen | Click path | Demo data to use | Record | Notes |
|---|---|---|---|---|---|
| 3.0–8.6 (product intro + granny-flat row) | Site research → "What this site would require" card, **All** filter, scrolled to "Granny flat without consent" (POSSIBLE, "because: Residential - Single House Zone") | www.qsme.co.nz → Log in (your own NZ account) → Site research (the default landing page) → type the address **off-camera** → wait for the report → scroll to "What this site would require" | An Auckland cross-lease section (legal description reads "Flat 1…/Flat 2…") in a **low-density residential zone** (Single House or Large Lot): the granny-flat row only appears there. Your own property, or a friend's with written consent | ~8s: 1s still on the card header, a quick scroll (about 1s) to the granny-flat row, hold 5s | Card only. No address bar, map, parcel shape, legal description, "At this address on QSME" card or anything else that carries the address |
| 8.55–10.6 (Required filter) | Same card: hover the "Required" pill, click, the list collapses to the must-haves | Same page, then click **Required** | Same site | ~5s: 1s hover, click, hold 2s | Move the cursor slowly and keep the whole card in frame so the collapse reads. Keep the take running into the next row |
| 10.6–15.75 (cross-lease row) | Same card with Required on: "Other cross-lease owners' consent" (REQUIRED) with "because: Cross-lease title" | Continue from the click above (one take is fine) | Same site | ~6s still or a very slow scroll | Frame (or let us push in) so the Building consent row goes off the top and "NEIGHBOURS & APPROVALS" is the top line. We add the highlight and the red circle in the edit |
| 22.4–27.4 (LIM row) | Same card, **All** filter, "Costs & checks" → "LIM & Record of Title" (CHECK) | Click **All**, scroll to the bottom of the card | Same site | ~6s: scroll, hold 4s | Frame with "COSTS & CHECKS" as the top line |

**Recording setup:** desktop Chrome, macOS appearance Light (the recreation uses the light theme; if you record in dark mode, tell us and we'll restyle the frame), browser zoom 150%, window about 1280×900. Use Cmd-Shift-5 → "Record Selected Portion" drawn round the card only, with the cursor visible, at 60fps. Hold 2s before and after each move.
**If no single site shows both the granny-flat and cross-lease rows:** record two Auckland sites (a Single House site for the granny-flat row, and any Auckland cross-lease for the cross-lease and LIM rows). We'll add a chip "Two Auckland sites" from 10.6 so the video never implies they're one site. Or fall back to the "Just a deck" cut (`ideas/qsme-nz/just-a-deck.md`), which only needs the cross-lease row.
**Swap work after the recording lands:** about 45 minutes. The clip goes into `#cardwrap` with `Kit.clip`, the highlight and circle overlays are re-placed on the real text, and the "Recreated QSME screen · demo data" label comes off. Then we re-render and re-check frames.

## Integrity notes (every claim and the truth-sheet feature it rests on)

Truth sheet: `research/2026-10-02-qsme-platform-truth.md`. The card styling and the rows not quoted in the truth sheet were read (read-only) from the product's origin/main source: `DevelopmentCards.tsx` RequirementsCard (layout, the All/Required/Likely pills, LEVEL_STYLES colours) and `development_analysis.go` requirementsFor() (row wording, levels, triggers).

| Claim / shown on screen | Rests on | Status |
|---|---|---|
| A checklist called "What this site would require", with an All / Required / Likely filter and rows tagged Required / Likely / Possible / Check, each with a "because:" line | 2.2 `site-requirements` (exact UI copy) | ✅ live |
| "Granny flat without consent — Under the national granny-flat rules a detached minor unit up to 70 m² can often be added without resource consent (and with a simplified building pathway) where the site meets the conditions." | 2.2 UI copy, quoted word for word; the conditional wording stays on screen and is highlighted. Level Possible, trigger = zone name (origin/main: only low-density residential zones) | ✅ live |
| "Other cross-lease owners' consent — On a cross-lease the other flat owners must consent to any change of footprint, and the flats plan must be updated (or the title converted to fee simple first)." · "because: Cross-lease title" | 2.2 UI copy word for word; best demo moment "Zoom on an italic 'because: Cross-lease title'" | ✅ live |
| "LIM & Record of Title — Order a LIM and the title before committing: consent notices, covenants, easements, contamination (HAIL) history and past consents change what is possible." | 2.2 UI copy word for word (level Check) | ✅ live |
| The other rows on the card (Resource consent, Building consent, Subdivision consent (to sell separately), Neighbours' written approval, Boundary fence notice, Vehicle crossing permit, Service connection applications, Geotechnical report) | origin/main requirementsFor(): the set that an Auckland Single House zone cross-lease site with no overlays or hazards would produce. Shown small and mostly dimmed; confirm against the Session A recording | ✅ live (wording from source, not yet seen on a real screen) |
| "Building consent — REQUIRED: Every new dwelling… needs a building consent" (in the list, and briefly as the first row of the Required view) | The product's own unconditional wording. It clashes with the granny-flat row's "simplified building pathway" and the homepage's "Up to 70 m² with no building consent", so the edit never stops on it: the camera pushes in right after the click, the row passes under the top edge in under a second, and the frame settles on the cross-lease row. Flagged to the owner as a product wording issue (open questions) | ⚠️ product copy issue, not a claim we make |
| Clicking "Required" collapses the list to the must-haves | 2.2 "Filterable to the must-haves"; demo moment "tap the Required filter and the list collapses". The product re-renders instantly; we ease it over 0.4s so it reads. The caption says "clicked" because the screen is web (desktop cursor); Site search isn't in the phone app yet | ✅ live |
| "Because we're on a cross-lease." + "Read from the legal description: a clue, not a title search." (shown once, in the cross-lease beat) | 2.2 fact: tenure is read from the legal-description wording, which is a clue, not a title search. We never say QSME checked the title | ✅ live |
| Sketch: "ONE SECTION, SHARED. (that's a cross-lease)", "Flat 2 gets a say." | The product's own tenure note ("the land is shared, and changing a flat's footprint needs the other owners' consent") and the cross-lease row | ✅ live |
| "Next: the LIM, the title, and a cuppa with next door." | The LIM & Record of Title row ("Order a LIM and the title before committing") | ✅ live |
| "See what your Auckland section would require." | Correction (1): requirements, overlays, services, hazards and the verdict are Auckland only, so the CTA says Auckland and the VO asks "Auckland?" | ✅ live |
| "Sign up → search your address → Site research" · pill "Sign up at qsme.co.nz" · VO "Sign up at Q-S-me dot co dot en zed" | 1.4: the requirements checklist is in Site research, which needs an account. Owner CTA rule (2026-10-03, venture file + truth-sheet override): every CTA pushes sign-ups and site search is presented as what you get when you sign up. No price, plan or "free" wording anywhere | ✅ live |
| Live homepage strip "Search your address / e.g. 12 Queen Street, Auckland" | 1.1 `home-address-check`, the real page captured 2026-10-02 with nothing typed, labelled with source and date. Shown as the place you search once signed up; we never describe what it shows without an account. Cropped above "View live projects on the map" (correction 8: the marketplace is nearly empty, so we don't send people there) | ✅ live |
| "Indicative only. Not a LIM, title search or planning advice." | Red list (site research is not a LIM, PIM, title search or advice) and the product's own disclaimers | ✅ |
| End-card wordmark "QSME" (no ®) | The truth sheet says registration is unconfirmed (August shareholder report: pending), so the wordmark is cropped to drop the ® until the owner confirms | ✅ |
| Hook quote "“Easy now. The rules changed.” — every barbecue since winter" | Hearsay from the situation, not a QSME claim, and immediately qualified by the product's conditional row. The red-list phrase "no consent needed" and the homepage line "Up to 70 m² with no building consent" are never used | ✅ |

- **Stand-in honesty:** the product card is a designed recreation, labelled "Recreated QSME screen · demo data" in every product beat. The demo site is fictional; there's no address, map, parcel or legal description anywhere. The b-roll is labelled "Illustrative". It's AI brand b-roll already live on qsme.co.nz and is never presented as a customer's build. Every platform caption carries "(A skit. Real checklist wording, demo data.)", so the first-person story never reads as a real customer's.
- **People:** no real people, and no AI people in a story role (`gf-1-idea` and `gf-5-movein` are excluded); the workers in `gf-3-placed` are small and unidentifiable. The family is a fictional situation shown as stick figures. It's never captioned as a customer or a testimonial, and the VO only reads the screen out loud.
- **Who the joke is on:** the barbecue wisdom, the cross-lease situation and our own awkwardness ("We've only ever talked about bins", "Might bake something"). The neighbours are never the punchline, and Flat 2 is drawn exactly like Flat 1.
- **Not claimed anywhere:** "free", "free account", "no sign-up", "no login" or any price or plan line (owner CTA rule, 2026-10-03), "no consent needed", "build a granny flat with no consent", "any NZ address", zoning or requirements outside Auckland, that QSME checked the title, that the checklist is complete, official or advice, AI (it's rule-based), "instant", verified tradies, counts, plan prices, time or money saved, competitors, the phone app (all the screens are web), live projects or marketplace scale.

## Open questions for you

- [ ] Approve the v3 cut (v2 plus the sign-up end card: "Sign up → search your address → Site research" and the "Sign up at qsme.co.nz" pill)? The cover frame (headline, REQUIRED stamp, full-strength bubble) is ready for IG/TikTok.
- [ ] Is there a direct sign-up URL you'd rather the captions and UTM links point to (instead of the homepage)?
- [ ] Session A: do you have (or can you borrow, with written consent) an Auckland cross-lease in a Single House or Large Lot zone, so both rows appear on one real site? If not, we'll go two-site or fall back to "Just a deck". If the recording lands by Fri 9 Oct, the "Recreated QSME screen · demo data" label comes off with the swap.
- [ ] Product wording: requirementsFor() always lists "Building consent — REQUIRED: Every new dwelling… needs a building consent". On a site where the granny-flat row appears, that contradicts the row's "simplified building pathway" and the homepage's "Up to 70 m² with no building consent". Could it become conditional for minor units up to 70 m²? Until it does, the video moves straight past that row.
- [ ] Is QSME® registered, or still pending? The footer says registered; the August shareholder report said pending. The end card now uses the wordmark without ®; confirm and we'll put it back.
- [ ] OK with the skit tag "(A skit. Real checklist wording, demo data.)" in the IG, TikTok and FB captions?
- [ ] Do you want the optional 4:5 Facebook feed cut for 13 Oct, or is Reels enough?

## Discussion history

- 2026-10-02: Built from the approved calendar slot (2026-10-13 19:30, week 2, idea nz-granny-flat-for-mum, 33s 9:16, zone-card beat dropped, "bins" line from Just a deck). Used only the `gf-3-placed` b-roll (gf-1/gf-5 excluded for AI people). Captured the live qsme.co.nz homepage (phone, no login, nothing typed) for the end card. Recreated the RequirementsCard (light theme, exact level colours and wording from origin/main, demo data, labelled Illustrative). Picky-CD fixes before the final render: a top fade so the chip never sits on card text; a dimmed caption zone so captions read cleanly over the card; a bigger wide shot for the Required tap; the two-line sketch caption split (it left an empty box); a slower first view of the sketch so the labels can be read; red- and yellow-lid Auckland bins so "bins" reads instantly; the bubble on frame 0 so the first frame is a complete hook; a clean cut into the end card (no ghosting). Rendered at 33.2s, QA passed, frames checked. VO script written for Mel (ElevenLabs upgrade pending). Status: rendered — awaiting approval.
- 2026-10-02 (v2, review fixes): Re-rendered at 31.9s, same output path; QA passed and the contact sheet and 35 MP4 frames were checked. **Must-fix:** the burned-in editor note "Illustrative — swap for real QSME screen (demo data)" is now "Recreated QSME screen · demo data". **Should-fix:** the camera pushes in right after the Required click, so Building consent passes under the top edge and the frame settles on the cross-lease row (Building consent wording flagged as a product issue). The handwritten bins label is cut: "Flat 2 gets a say." gets 1.7s, "We've only ever talked about bins." gets 2.25s, and a red arrow now runs from that caption to the bins. The sketch draws faster (pan at 17.35, 1.6s in) and is scaled 1.15×. The end card now shows "Search your address → free account → Site research", with the strip cropped above "View live projects on the map". "tapped" became "clicked" on screen and in the IG copy. The repeated small print is removed from the LIM beat. The barbecue attribution sits in a navy pill, the bubble is trimmed to "Easy now. / The rules changed.", and the stamp lands at 2.15. VO line 5 is now "We're a cross-lease. … Oh." and line 1 drops "now". IG, TikTok and FB copy carries "(A skit. Real checklist wording, demo data.)". **Nice:** a faster opening scroll to the granny-flat row (the highlight starts at 4.45); the top edge of each scroll stop lands in a row gap or on a group header; the URL pill is held for 3.65s; the cover has the bubble at full strength and passes a 3:4 grid check; the end-card wordmark has no ® until it's confirmed.
- 2026-10-03: owner CTA rule — removed free/no-sign-up, CTA now "Sign up at qsme.co.nz". End card path line "Search your address → free account → Site research" became "**Sign up** → search your address → Site research", and the pill "qsme.co.nz" became "Sign up at qsme.co.nz" (slam at 28.25, held 3.65s). VO line 11 is now "Auckland? Check yours. Sign up at Q-S-me dot co dot en zed." (27.55, max 4.0s; `vo_status.py` ok). IG, TikTok, FB and YouTube captions and the all-platform CTA line drop "with a free account" and push signing up (FB uses "Create your account at qsme.co.nz"); the TikTok pinned comment ends "Sign up at qsme.co.nz to see yours." Production notes no longer say "no login" or "royalty-free". Re-rendered the 9:16 master, contact sheet, cover and preview at the same paths; QA ok on 65,300,1015,1250 and the end-card frames were checked. Hook, story beats and hashtags unchanged (no violations there).
