---
vid: N07
title: "Three sections, one planner: from an address to a site report"
venture: qsme-nz
idea: nz-address-to-site-report
status: "audio-first remake rendered + voiced (Cam S, 2026-10-06; CTA re-voiced 'dot koh' 2026-10-10) — HOLD: publish only after the Session A swap (or your OK on the verbatim-only fallback)"
publish_date: 2026-10-18
publish_time: "19:00 NZDT (Sunday)"
created: 2026-10-02
updated: 2026-10-10
calendar_week: 2
format: long-form walkthrough (deadpan)
aspect: "16:9 (+9:16 chapter cut-downs, 36.0 s and 39.3 s)"
length_s: 154.0
platforms: ["YouTube", "Facebook", "YouTube Shorts (chapter cuts)"]
absorbs: nz-strong-then-i-scrolled (cold open)
---

# Three sections, one planner: from an address to a site report

**The joke / insight in one sentence:** The screen says "Strong development potential", one scroll later it shows a road-widening designation and a volcanic viewshaft on the same section, and the tool's own last word is "Confirm with a planner or the council". So QSME's real job isn't to be the planner. It's to get you to the right three questions and one page to put on the planner's desk.

**Truth:** You pay professionals by the hour to answer questions, and most people don't know which questions to ask until after the deposit.
**Twist:** The product celebrates first ("Strong"), but it had flagged the designation in amber all along. Mel skimmed. It ends by telling you to ring the planner, and Mel's deadpan "Fair enough." is the button. The joke lands on her skimming and on the situation, never on the tool or its users.
**Job:** Organic, evergreen. It's the YouTube/Facebook link every site-research short points to, and it catches searches like "what can I build on my section Auckland". Success = watch time past 1:00, clicks and sign-ups at qsme.co.nz, saves/shares from small developers, and comments asking "does it do [my council]?" (answer honestly: zone in four councils, full depth in Auckland).

## Audio-first remake (2026-10-06) — the current masters

**Why:** the owner's fundamental fix (approved on the N01 "Which Dave?" pilot): no gaps or breath cuts in the voice, a real hook in the first 2 s, scripts as continuous speech, one voice. All three cuts of this project are remade to that standard: each has its own continuous script, ONE unbroken Cam S eleven_v3 take (stability 0.5, `with-timestamps`, never sliced), and the picture re-timed to the word alignment. Design unchanged (the owner likes the designs). The narrator is now one dry Kiwi bloke (Cam S) telling the story in first person; "Mel" below is the design record only.

**Hooks (spoken, first 2 s):** film + cut 1: "It said strong development potential." → "Then I scrolled." (status flip by 2.0 s, the headline slams on the word). Cut 2: "Planners charge by the hour. So this is the one page I'm taking in."

**Takes (2026-10-10 koh re-voice):** 16:9 film `outputs/vo-take-cam-v3/take.m4a` 152.48 s, 2.52 words/s, longest silence 0.78 s · cut 1 `outputs/vo-take-cam-v3-ch03/take.m4a` 34.48 s, 2.52 w/s, longest silence 0.94 s (the dry beat before "It even tells you…", now under 1 s) · cut 2 `outputs/vo-take-cam-v3-ch06-07/take.m4a` 37.76 s, 2.54 w/s, longest silence 0.46 s. The 2026-10-06 dot-co takes are kept beside each as `*-attempt-co.*`. STT check (`tools/el.py stt`): every word heard on all three (QSME → "qsme.co.nz", Linz → "LINZ", "LIM" as the homophone "limb"). Earlier attempts kept beside each take as `*-attempt1/2.*` (the film's attempt 1 ran 179 s at 2.23 w/s with 1.5 s holes on `[short pause]`; cut 1's attempts 1–2 ran 40 s). One v3 tag per take (`[dry]` before "It even tells you to ring the planner.").

**CTA pronunciation fix (2026-10-10):** the owner's 2026-10-08 rule is "Queue Ess Mee dot Co dot N Z" (co said like KO, never C-O). All three takes said "dot co", so each was regenerated WHOLE in one call (eleven_v3, Cam S, stability 0.5, one `[dry]` tag) with only the CTA changed; first attempt each, STT clean (every word heard; CTA back as "qsme.co.nz" / "qsme.koh.enz"). The pages were re-timed through a word-anchored warp from the old take's words to the new take's words (MAP second column, every `cap()`, the RAW chapter-01 and end-card blocks, DUR), re-rendered with `--safe` (QA ok on all three), re-muxed whole at 0.0 s / 1.15 (AVFoundation probe: 1 video + 1 audio track each, audio from 0.000 s, container = video: 154.0 / 36.0 / 39.3 s). 63 frames spot-checked on the words (30 film, 15 cut 1, 18 cut 2). The tables below are the new times.

**The film as spoken (one take, 152.48 s):**

```
It said strong development potential. Then I scrolled. Road widening, on the one I liked. Three sections, one planner. Which one gets the meeting? Three sections on the shortlist, none of them bought, and one planner on Monday morning, by the hour. So: one address, and the right questions before I pay for any. Step one: sign up and search your address. Boundary, zone, pipes, hazards, in seconds. Zoning works in four councils; pipes and hazards, Auckland. That's the council's building. Mine stay blurred. Step two: Site research, in your account. What the zone allows, in plain words: up to three dwellings without a resource consent, if they meet the standards. Height, coverage, yards, one grid. Click the zoning layer and the whole street comes up in zone colours. In Auckland, anyway. So site two: tidy, up to three, bit boring. Back to the strong one. And to be fair, it did say. In amber. I skimmed. Auckland overlays, on the actual parcel. Red, we've met. Amber: a volcanic viewshaft over the top. Green says twenty-one metres. Amber says, maybe not. Where the pipes run, roughly: about three metres to the boundary, and it tells you the positions are approximate. It even tells you to lodge a before-you-dig. And clear, on the hazards, is a map, not a promise. Saved all three, so I can flick between them. Site two, good. Site three, limited: the villa usually stays. And every page says indicative only. Every single time. So, three's off. Two doesn't need a planner. One does. Pro view: same site, much bigger map. Zoning, buildings, services, flood. In Auckland. The title tab: title facts from Linz. How many owners, not who. The rest? Available with a data licence. Reads as a freehold lot. That's something. One pager: print it, or save a PDF. Map, title, zone, overlays, services, hazards, on one page. And that's what goes to the planner. One page, and three questions worth paying for. Road widening: how much? Viewshaft versus twenty-one metres? Pipe at three metres: can I build over it? [dry] It even tells you to ring the planner. Fair enough. Start with your address. Full depth in Auckland, public council data, not AI, and not a LIM or advice. Sign up at Queue Ess Mee dot Co dot N Z.
```

| Said (start) | Picture (re-timed to the words) | Caption on screen |
|---|---|---|
| 0.00 "It said strong development potential." | Headline 'It said “Strong.”' over the Development potential card at 80%; STRONG pill bounces 0.0–0.4 | — |
| 2.32 "Then I scrolled." | Headline slams to 'Then I scrolled.' at 2.32; scroll slam 2.23–2.89 lands on the red Constraints row; red marker 3.04–3.58 | — |
| 3.86 "Road widening, on the one I liked." | Caption 'Road widening. On the one I liked.' 3.86–6.4; hold on the red row, amber viewshaft underneath | Road widening. On the one I liked. |
| 6.45 "Three sections, one planner. Which one gets the meeting?" | Title card: 'Three sections.' 6.45 / 'One planner.' 7.48 / 'Which one gets the meeting?' 8.41 (screen dims and blurs) | — |
| 9.71 "Three sections on the shortlist, none of them bought," | B-roll photo card (bare section, maunga) 9.71–13.16; caption 'Three sections. Shortlisted. Not bought.' 9.88–13.06 | Three sections. Shortlisted. Not bought. |
| 13.16 "and one planner on Monday morning, by the hour." | Laptop + sticky slaps on 13.16, writes 'Mon 10am · planner (by the hour!!)' 13.54–14.98 and the three streets; caption 'One planner. Monday. By the hour.' 13.34–15.93 | One planner. Monday. By the hour. |
| 16.05 "So: one address, and the right questions before I pay for any." | Caption 'So: one address. The right questions.' 16.05–20.24; chapter strip 01–07 drops in 16.31 | So: one address. The right questions. |
| 20.35 "Step one: sign up and search your address." | LIVE capture of qsme.co.nz: '135 Albert Street, Auckland' typed 20.35–22.22 (page pricing line painted out); caption 'Step 1: sign up. Search your address.' 20.54–23.52; tag 'Live capture · qsme.co.nz' | Step 1: sign up. Search your address. |
| 23.57 "Boundary, zone, pipes, hazards, in seconds." | Push to the map, green box on the parcel outline 23.89–24.89 on 'Boundary'; medium view of the result column 25.37–26.91; caption 'Boundary, zone, pipes, hazards. In seconds.' 23.57–26.91 | Boundary, zone, pipes, hazards. In seconds. |
| 27.00 "Zoning works in four councils; pipes and hazards, Auckland." | Green box on the zone 27.15–28.45 on 'Zoning works'; services box 28.84–30.3 and amber hazards box 29.56–30.63 on 'pipes and hazards, Auckland'; caption 'Zoning: four councils. Pipes and hazards: Auckland.' 27.0–30.4 | Zoning: four councils. Pipes and hazards: Auckland. |
| 30.53 "That's the council's building. Mine stay blurred." | Box on the footer disclaimer 30.74–33.44; caption 'That's the council's building. Mine stay blurred.' 30.53–33.53 | That's the council's building. Mine stay blurred. |
| 33.63 "Step two: Site research, in your account." | Recreated Site research page for site 2 loads 33.63–36.65 ('Researching the site — boundary, zoning, overlays, services, hazards & history…', parcel draws in cadastre yellow); caption 'Step 2: Site research, in your account.' 33.78–36.93 | Step 2: Site research, in your account. |
| 37.08 "What the zone allows, in plain words:" | 'What could go here' card (Mixed Housing Suburban); caption 'What the zone allows. In plain words.' 37.08–39.36 | What the zone allows. In plain words. |
| 39.57 "up to three dwellings without a resource consent, if they meet the standards." | Green box on 'Without resource consent: Up to three dwellings per site that meet the zone standards…' 39.57–43.45; caption 'Up to three dwellings, if they meet the standards.' 39.57–43.49 | Up to three dwellings, if they meet the standards. |
| 43.61 "Height, coverage, yards, one grid." | Push into the standards grid (8 m + 1 m roof / 40% of the site / Front 3 m · side & rear 1 m) 44.04–46.64; caption 'Height. Coverage. Yards. One grid.' 43.61–46.64 | Height. Coverage. Yards. One grid. |
| 46.72 "Click the zoning layer and the whole street comes up in zone colours. In Auckland, anyway." | Cursor clicks the Zoning layer 47.14; the street washes in zone colours 47.24–48.68, legend 48.37; caption 'The whole street, in zone colours. (Auckland, anyway.)' 46.72–51.3 | The whole street, in zone colours. (Auckland, anyway.) |
| 51.36 "So site two: tidy, up to three, bit boring." | Sticky returns over the dimmed screen 51.36; green marker writes 'tidy · up to 3' 52.53–53.91 on 'tidy'; caption 'Site 2: tidy. Up to three. Bit boring.' 51.39–55.03 | Site 2: tidy. Up to three. Bit boring. |
| 55.19 "Back to the strong one." | Cursor clicks the Site 1 pill 55.88; caption 'Back to the “Strong” one.' 55.25–57.02 | Back to the “Strong” one. |
| 57.06 "And to be fair, it did say. In amber. I skimmed." | Push to the verdict card 57.07; amber ring draws round the '− Designation' chip 58.12–58.79 on 'it did say'; caption 'To be fair, it did say. In amber. I skimmed.' 57.07–60.75 | To be fair, it did say. In amber. I skimmed. |
| 60.89 "Auckland overlays, on the actual parcel. Red, we've met." | Scroll to 'Planning overlays & controls' 60.89–61.46 (the cold-open red underline is still there); push to the red row 63.28–63.8 on 'Red'; caption 'Auckland overlays, on the parcel. Red, we've met.' 60.92–64.98 | Auckland overlays, on the parcel. Red, we've met. |
| 65.08 "Amber: a volcanic viewshaft over the top." | Amber marker under 'Volcanic viewshaft · Mount Eden' 65.2–65.72; caption 'Amber: a volcanic viewshaft over the top.' 65.08–68.05', | Amber: a volcanic viewshaft over the top. |
| 68.16 "Green says twenty-one metres. Amber says, maybe not." | Green marker under 'Height Variation Control · 21m' 68.27–68.87; caption 'Green says 21 m. Amber says maybe not.' 68.16–72.3 | Green says 21 m. Amber says maybe not. |
| 72.34 "Where the pipes run, roughly: about three metres to the boundary," | Services layer clicked 72.7; water / stormwater / wastewater lines draw 72.8–74.19; dashed 'Distance to boundary · ~3 m' 74.19; caption 'Where the pipes run. Roughly.' 72.38–75.69 | Where the pipes run. Roughly. |
| 75.78 "and it tells you the positions are approximate." | Push-in on the dashed distance line 76.08–77.77; caption 'Pipe positions are approximate.' 75.78–77.83 | Pipe positions are approximate. |
| 77.92 "It even tells you to lodge a before-you-dig." | Box on 'Mapped pipe positions are approximate — always lodge a beforeUdig request…' 78.43–80.54; caption 'It even tells you to lodge a beforeUdig.' 77.92–80.57 | It even tells you to lodge a beforeUdig. |
| 80.60 "And clear, on the hazards, is a map, not a promise." | Amber box on the four 'Clear' hazard chips 80.61–83.97; caption '“Clear” is a map, not a promise.' 80.61–83.97 | “Clear” is a map, not a promise. |
| 84.07 "Saved all three, so I can flick between them." | Saved sites pills (addresses blurred) 84.07; caption 'Saved all three. Flick between them.' 84.22–86.51 | Saved all three. Flick between them. |
| 86.61 "Site two, good." | Cursor clicks Site 2 at 86.59; GOOD pill pops; caption 'Site 2: Good.' 86.67–88.07 | Site 2: Good. |
| 88.21 "Site three, limited: the villa usually stays." | Cursor clicks Site 3 at 88.17; LIMITED pill, 'Special character rules usually mean keeping the existing house…'; caption 'Site 3: Limited. The villa usually stays.' 88.22–91.41 | Site 3: Limited. The villa usually stays. |
| 91.58 "And every page says indicative only. Every single time." | Quote board (three cards, one verbatim line each) 91.58; red marker under 'Indicative only' on each card 93.04–94.24 on 'indicative only'; caption '“Indicative only.” Every single time.' 92.43–95.52 | “Indicative only.” Every single time. |
| 95.58 "So, three's off." | Sticky over the dimmed board 95.58; line 3 struck through 96.15 on 'three's'; 'villa stays. off.' 96.83; caption 'Site 3's off.' 95.66–97.2 | Site 3's off. |
| 97.34 "Two doesn't need a planner. One does." | 'strong… but red + amber' 97.8, line 1 circled 99.28 on 'One does', '→ MONDAY: 1' 99.61; caption 'Site 2 doesn't need a planner. Site 1 does.' 97.34–100.03 | Site 2 doesn't need a planner. Site 1 does. |
| 100.24 "Pro view: same site, much bigger map." | Cursor clicks 'Open Pro view' 100.87; 'Site research — Pro' opens 101.54; map framing 102.7; caption 'Pro view. Same site. Much bigger map.' 100.35–103.2 | Pro view. Same site. Much bigger map. |
| 103.32 "Zoning, buildings, services, flood. In Auckland." | Layer chips clicked on the words: Zoning 103.32, Buildings 104.05, Services 104.77, Flood 105.35; caption 'Zoning. Buildings. Services. Flood. In Auckland.' 103.3–106.91 | Zoning. Buildings. Services. Flood. In Auckland. |
| 106.96 "The title tab: title facts from Linz. How many owners, not who." | Cursor clicks the Title tab 107.84; '1 owner on the title' boxed 109.98–111.75 on 'How many owners'; caption 'Title facts from LINZ. How many owners. Not who.' 107.07–111.81 | Title facts from LINZ. How many owners. Not who. |
| 111.98 "The rest? Available with a data licence." | Amber boxes on the locked 'CV & sales' tab 112.56 and the 'Available with a data licence' pill 113.17–114.91; caption 'The rest? “Available with a data licence.”' 111.98–114.91 | The rest? “Available with a data licence.” |
| 114.99 "Reads as a freehold lot. That's something." | Box on 'Reads as a freehold (fee simple) lot — the simplest title to develop.' 115.36–117.69; caption '“Reads as a freehold (fee simple) lot.” That's something.' 114.99–117.69 | “Reads as a freehold (fee simple) lot.” That's something. |
| 117.80 "One pager: print it, or save a PDF." | Cursor clicks 'One pager' 118.32; print preview 'QSME · Site report' + Save as PDF dialog 118.65; caption '“One pager.” Print it, or save a PDF.' 117.9–120.74 | “One pager.” Print it, or save a PDF. |
| 120.92 "Map, title, zone, overlays, services, hazards, on one page." | Slow pan down the page 121.46–124.36; click Save 124.88; caption 'Map, title, zone, overlays, services, hazards. One page.' 120.92–125.6 | Map, title, zone, overlays, services, hazards. One page. |
| 125.76 "And that's what goes to the planner." | The printed page lands on the desk 125.76–126.58 beside the flat white; caption 'That's what goes to the planner.' 125.83–128.15 | That's what goes to the planner. |
| 127.74 "One page, and three questions worth paying for." | Sticky 'Qs for Monday' slaps on 127.7 on 'One page'; caption 'And three questions worth paying for.' 128.26–130.6 | And three questions worth paying for. |
| 130.72 "Road widening: how much? Viewshaft versus twenty-one metres? Pipe at three metres: can I build over it?" | The sticky types each question as it is said: '1. Road widening — how much?' 130.69–132.72, '2. Viewshaft vs 21 m?' 132.87–135.18, '3. Pipe ~3 m — build-over?' 135.33–137.87; desk camera pushes in 130–139 | — |
| 138.70 "It even tells you to ring the planner." | Quoted disclaimer card pops 138.34; red marker under 'Confirm with a planner or the council.' 139.27–139.86 on 'ring the planner'; caption 'It even tells you to ring the planner.' 138.7–140.04 | It even tells you to ring the planner. |
| 140.17 "Fair enough." | Caption 'Fair enough.' 140.17–141.01 | Fair enough. |
| 141.07 "Start with your address." | End card cross-fades in 141.01–141.28: QSME logo, 'Start with your address.' pops 141.35 | — |
| 142.83 "Full depth in Auckland, public council data, not AI, and not a LIM or advice." | Subline 'Site research: sign up at qsme.co.nz · Full depth: Auckland.' pops 142.82 on 'Full depth'; small print 'Rule-based public data, not AI · Not a LIM, valuation or advice · Dramatised · demo sites' pops 144.14 on 'public council data' | — |
| 148.14 "Sign up at Queue Ess Mee dot Co dot N Z." | The sign-up line pulses 148.06–148.93 on 'Sign up'; end card holds to 154.0 (the middle band stays clear for YouTube end-screen tiles) | — |

**Cut 1 "Strong. Then I scrolled." as spoken (34.48 s):**

```
It said strong development potential. Then I scrolled. Red, a road-widening designation, on the one I liked. Amber, a volcanic viewshaft over the top. Green says twenty-one metres. Amber says maybe not. And it says indicatively, every single time. So it's not a no. It's three questions for the planner. Road widening, how much? Viewshaft versus twenty-one metres? Two to five homes, really? [dry] It even tells you to ring the planner. Fair enough. Before you offer, sign up at Queue Ess Mee dot Co dot N Z.
```

| Said (start) | Picture (re-timed to the words) | Caption on screen |
|---|---|---|
| 0.00 "It said strong development potential." | Headline 'It said “Strong.”' over the STRONG card at panel width (summary + chips legible) | — |
| 2.21 "Then I scrolled." | Headline slams 2.21; scroll slam 2.15–2.9 lands on the red row; red marker 3.13–3.44 | — |
| 3.64 "Red, a road-widening designation, on the one I liked." | Caption 'Red: a road-widening designation. On the one I liked.' 3.64–7.11 | Red: a road-widening designation. On the one I liked. |
| 7.24 "Amber, a volcanic viewshaft over the top." | Scroll to the amber row 7.17–7.97; amber marker 8.06–8.52 on 'volcanic'; caption 'Amber: a volcanic viewshaft over the top.' 7.24–9.89 | Amber: a volcanic viewshaft over the top. |
| 10.00 "Green says twenty-one metres. Amber says maybe not." | Green marker 10.24–10.64; caption 'Green says 21 m. Amber says maybe not.' 10.0–13.88 | Green says 21 m. Amber says maybe not. |
| 13.94 "And it says indicatively, every single time." | Scroll back to the verdict card 13.75–14.2; red marker under 'indicatively' 14.79–15.44; caption '“Indicatively.” Every single time.' 13.94–16.89 | “Indicatively.” Every single time. |
| 17.02 "So it's not a no." | Headline 'Not a no.' slams 17.02; screen dims; sticky 'Qs for Monday' slaps on 17.12 | — |
| 18.45 "It's three questions for the planner." | Caption 'Three questions for the planner.' 18.45–27.41 | Three questions for the planner. |
| 20.40 "Road widening, how much? Viewshaft versus twenty-one metres? Two to five homes, really?" | The sticky types each question as it is said: 20.4–22.35, 22.57–24.82, 25.02–26.86 | — |
| 27.58 "It even tells you to ring the planner." | Headline 'The last word:' 27.51; quoted disclaimer card; red marker 28.29–28.92 on 'ring'; caption 'It even tells you to ring the planner.' 27.58–29.1 | It even tells you to ring the planner. |
| 29.12 "Fair enough." | Caption 'Fair enough.' 29.12–29.95 | Fair enough. |
| 30.03 "Before you offer, sign up at Queue Ess Mee dot Co dot N Z." | End card cross-fades in 30.03–30.36: 'Run an Auckland site before you offer.' 30.32, 'Site research: sign up at qsme.co.nz' 31.35 on 'sign up', small print 32.12, pill 'qsme.co.nz' 32.46; holds to 36.0 | — |

**Cut 2 "One page for the planner" as spoken (37.76 s):**

```
Planners charge by the hour. So this is the one page I'm taking in, and here's where it's from. Open Pro view: same site, much bigger map. Four layers: zoning, buildings, services, flood. In Auckland. The title tab: title facts from Linz. How many owners, not who. The rest? Available with a data licence. Then one pager: print it, or save a PDF. One page, three questions. That's the meeting sorted. [dry] It even tells you to ring the planner. Fair enough. Start with your address. Sign up at Queue Ess Mee dot Co dot N Z.
```

| Said (start) | Picture (re-timed to the words) | Caption on screen |
|---|---|---|
| 0.00 "Planners charge by the hour." | Headline 'One page for the planner.' over the printed one pager on the desk (tag 'Illustrative · demo data') | — |
| 1.77 "So this is the one page I'm taking in, and here's where it's from." | Sticky 'Qs for Monday' slaps onto the page 1.77; captions 'The one page I'm taking in.' 1.77–3.96 / 'Here's where it's from.' 4.04–5.31 | The one page I'm taking in. / Here's where it's from. |
| 5.39 "Open Pro view: same site, much bigger map." | Headline '“Open Pro view.”' 5.39; click 6.03; Pro view opens 6.43; caption 'Pro view. Same site. Much bigger map.' 5.44–8.85 | Pro view. Same site. Much bigger map. |
| 8.94 "Four layers: zoning, buildings, services, flood. In Auckland." | Headline 'Four layers.' 8.94; chips clicked on the words 10.38 / 11.02 / 11.74 / 12.54; caption 'Zoning. Buildings. Services. Flood. In Auckland.' 8.99–14.38 | Zoning. Buildings. Services. Flood. In Auckland. |
| 14.42 "The title tab: title facts from Linz. How many owners, not who." | Headline 'The Title tab.' 14.42; click 15.12; '1 owner on the title' boxed 17.24–19.24 on 'How many owners'; caption 'Title facts from LINZ. How many owners. Not who.' 14.46–19.36 | Title facts from LINZ. How many owners. Not who. |
| 19.42 "The rest? Available with a data licence." | Amber boxes on 'CV & sales' and 'Available with a data licence' 20.17–22.12; caption 'The rest? “Available with a data licence.”' 19.42–22.17 | The rest? “Available with a data licence.” |
| 22.33 "Then one pager: print it, or save a PDF." | Headline '“One pager.”' 22.33; click 23.04; print preview 23.38; Save 25.35; caption 'Print it, or save a PDF.' 22.44–25.75 | Print it, or save a PDF. |
| 25.82 "One page, three questions. That's the meeting sorted." | Back on the desk 25.82, headline 'One page. Three questions.'; caption 'That's the meeting sorted.' 27.79–29.6 | That's the meeting sorted. |
| 29.90 "It even tells you to ring the planner." | Headline 'The last word:' 29.64; quoted disclaimer card; red marker 30.59–31.37 on 'ring'; caption 'It even tells you to ring the planner.' 29.9–31.53 | It even tells you to ring the planner. |
| 31.57 "Fair enough." | Caption 'Fair enough.' 31.57–32.69 | Fair enough. |
| 32.71 "Start with your address." | End card cross-fades in 32.71–32.84; 'Start with your address.' pops 32.8 | — |
| 34.32 "Sign up at Queue Ess Mee dot Co dot N Z." | 'Site research: sign up at qsme.co.nz' pops 34.32 on 'Sign up'; small print 34.81; pill 'qsme.co.nz' 35.48; holds to 39.3 | — |

**How the pages were re-timed:** each motion page keeps its v2 timeline and runs it through a word-anchored map (old time → the word that beat belongs to in `alignment.json`, ~130 anchors for the film), so every caption, marker, click, scroll and slam lands on its word; chapter 01 (the live homepage tour) was re-laid outright on the words; captions are placed explicitly at new times and are phrases lifted from the narration. Page durations = take + ~1.5 s tail: film 154.0 s (end card from 141.0, so the YouTube end-screen band stays 12 s with the CTA spoken over it), cut 1 36.0 s, cut 2 39.3 s (2026-10-10). Changes to the design record below: the lower third "Checklist + rough numbers: Shorts linked below" is dropped from the film (no room in the spoken decision beat; the YouTube cards and end screen carry the links); new captions "Up to three dwellings, if they meet the standards.", "To be fair, it did say. In amber. I skimmed.", "“Indicative only.” Every single time.", "Map, title, zone, overlays, services, hazards. One page."; cut 2 opens with "The one page I'm taking in." / "Here's where it's from.". The 2026-10-02 publish hold (Session A recordings) still applies: the screens are still the labelled recreations.

**Files:** masters `outputs/address-to-site-report-16x9.mp4` (154.0 s), `outputs/address-to-site-report-ch03-strong-then-scrolled-9x16.mp4` (36.0 s), `outputs/address-to-site-report-ch06-07-one-page-for-the-planner-9x16.mp4` (39.3 s), all silent, QA passed on their safe boxes (16:9 96,54,1824,1026 · 9:16 65,300,1015,1250), contact sheets `*-frames.png` re-made; voiced `…-with-vo.mp4` beside each (the take at 0.0 s, gain 1.15, no bed, one audio track); previous masters archived as `outputs/archive/*-v1.mp4` (v2 silent) and `outputs/archive/*-v2-co.mp4` + `*-with-vo-co.mp4` (the 2026-10-06 dot-co cuts); the Oct 3 silent previews as `outputs/archive/*-preview-v2.mp4`; takes + alignments + the exact text sent in `outputs/vo-take-cam-v3*/`; contract `vo-script.json` / `vo-script.md`. Thumbnail unchanged (its text did not change). Sources: `motion/address-to-site-report.html`, `motion/short-strong-then-scrolled.html`, `motion/short-one-page-for-the-planner.html` (header comments describe the re-timing).

**What's below:** the Deliverables, Script, cut-down, Music and Production tables describe the 2026-10-02/03 silent v2 (Mel, per-line VO script). They are kept as the design record; the timelines above are the ones that ship.

## ⛔ Publish hold

The review (2 Oct) blocks publishing until the signed-in screens are real. About 80 of the 145.5 s are HTML recreations of Site research, the Pro view and the one pager, made without seeing the real screens. v2 removes every piece of invented UI wording: what's still legible inside the recreations is verbatim truth-sheet wording `[V]` only. Site 2 and 3's summary lines and chips, the "With a resource consent" items and every title value now render as skeleton bars or blur. The swap plan:

1. **Session A (owner, due Fri 9 Oct):** record shots D, E, A, B, C, F, H, G and I (table below). I re-cut every caption to the strings the real screens return, and rebuild the quote board from the three real verdict lines. Never caption a number the screen doesn't show.
2. **If Session A slips:** v2 already meets the review's fallback rule ("keep only screens whose wording is verbatim"). One deviation to flag: instead of cutting the Site 2/3 verdict cards and the three-up, v2 keeps them with only verbatim text legible (pill, level heading, the special-character line) and a quote board of verbatim lines. If you'd rather cut them as the review wrote, it's a 15 s trim (77.0–88.0). Your call before 18 Oct.
3. Whatever ships, the YouTube description line about "Illustrative" screens must match it (two versions below).

## Deliverables

| File | What |
|---|---|
| `outputs/address-to-site-report-16x9.mp4` | 16:9 master v2, 1920×1080, 30 fps, 145.5 s, silent-first (every beat carried by burned-in captions that match the VO) |
| `outputs/address-to-site-report-16x9-frames.png` | Contact sheet (24 frames) |
| `outputs/address-to-site-report-thumb.png` | YouTube / Facebook thumbnail, 1920×1080 (unchanged; downscale to 1280×720 on upload) |
| `outputs/address-to-site-report-ch03-strong-then-scrolled-9x16.mp4` | Shorts cut 1: "Strong. Then I scrolled." (chapter 03 + close), 1080×1920, 31 s |
| `outputs/address-to-site-report-ch06-07-one-page-for-the-planner-9x16.mp4` | Shorts cut 2: "One page for the planner" (chapters 06–07 + close), 1080×1920, 32 s |
| `outputs/*-9x16-frames.png` | Contact sheets for the two cuts |
| `motion/address-to-site-report.html` | 16:9 motion source (tools/motion kit, `body.nz r16x9`) |
| `motion/short-strong-then-scrolled.html`, `motion/short-one-page-for-the-planner.html`, `motion/short-common.js` | 9:16 sources (`body.nz r9x16`); cut 1 uses the panel-width re-lay `SiteUI.narrowPage` |
| `motion/site-ui.js`, `motion/site-ui.css` | The illustrative Site research / Pro view / one-pager recreations (demo data), shared by all three videos. Every legible string is `[V]` (verbatim) in the code; unknown content renders as skeleton (`skel`) or blur |
| `motion/capture-home.json`, `motion/still-home.mjs`, `motion/clips/home/`, `motion/clips/home-still.jpg` | Live capture of the qsme.co.nz homepage address search on 135 Albert Street (Auckland Council's building). The page's own pricing line under "Get started" is painted out in the edit (owner rule 2026-10-03) |
| `motion/clips/site/` | 4.6 s of `assets/qsme/broll/th-1-site.v1.mp4` (AI brand b-roll), shown as a tight crop (no digger, no surveyor), labelled "Illustrative b-roll" |
| `vo-script.md` / `vo-script.json` | Timed Kiwi VO (Mel) for the master + both cut-downs, re-timed on v2, ready for the ElevenLabs upgrade |

## Hook layers

- **Text:** frame 1 reads a big Manrope headline "It said “Strong.”" (green "Strong.") over the STRONG card. At 2.6 s it slams to "Then I scrolled." At 8 s the title card: "Three sections. / One planner. / Which one gets the meeting?"
- **Verbal (VO, later):** "It said strong development potential." … "Then I scrolled." … "Road widening. On the one I liked."
- **Visual:** the Development potential card at 80% under the headline, the pill bouncing in; a hard scroll slam with motion blur that stops dead on a red Constraints row, "Designation · Road Widening (Auckland Transport)", then a red marker underline. One small mono line under the screen: "Dramatised · illustrative screens · demo data".
- **Audio:** a bright ding on STRONG (0.1 s), a scroll whoosh (2.55 s), then near-silence on the red row with one marker squeak (3.5 s). Music enters under the title card (8.0 s).
- **Why it works:** status flip in under three seconds, readable with sound off, same treatment as the 9:16 cut that stops the scroll hardest. Payoff at 54 s: "To be fair, it said. In amber." credits the tool and turns the joke on Mel's skimming.

## Script (beat by beat, times on the rendered 16:9 MP4, v2)

Chapter chips on screen: 01 Address · 02 Zone · 03 Overlays · 04 Services · 05 Verdict · 06 Pro view · 07 One pager. Recreated signed-in screens carry "Illustrative · demo data" top right (bottom right on the desk). Every caption carries its VO line; where they differ, the caption only quotes the screen a little more fully ("In amber.", "fee simple").

| Time | Role | On-screen text (burned in) | VO line (Mel, later) | Visual | SFX |
|---|---|---|---|---|---|
| 0.0–2.6 | hook | Headline "It said “Strong.”" · "Dramatised · illustrative screens · demo data" | It said strong development potential. | Recreated **Development potential** card for Site 1 at 80% under the headline: STRONG pill bounces, summary "Business - Mixed Use Zone — indicatively 2–5 homes here; 2 things to design around.", chips "+ High-density zone", "− Small site (209 m²)", "− Designation" | Ding 0.1; soft UI pops |
| 2.6–5.4 | hook | Headline "Then I scrolled." | Then I scrolled. | Scroll slam (2.5–3.1, blur) to **Planning overlays & controls**; red row flashes; red marker under "Designation · Road Widening (Auckland Transport)" (3.45), push-in with 40 px margin (group dots never clip) | Whoosh 2.55; thud 3.1; marker squeak 3.45 |
| 5.4–7.9 | hook | "Road widening. On the one I liked." | Road widening. On the one I liked. | Hold on the red row; amber viewshaft row underneath | Room tone only |
| 7.9–11.0 | intro | Title "Three sections. / One planner. / Which one gets the meeting?" + "From an address to a site report · QSME Site research, Auckland" | Three sections. One planner. Which one gets the meeting? | Screen dims and blurs behind the title | Music in (8.0) |
| 11.0–13.2 | problem | "Three sections. Shortlisted. Not bought." · "Illustrative b-roll" | (silence) | Photo card: tight crop of th-1-site (bare section, the maunga, boundary pegs; the digger and surveyor are cropped out), slow push | Birds |
| 13.2–18.0 | problem | "One planner. Monday. By the hour." → "So: one address. The right questions." · "Dramatised · demo sites" · chapter strip 01–07 drops in at 15.95 | One planner. Monday. By the hour. / So. One address. The right questions. | Laptop with a blurred Site research page; the sticky slaps on (13.2) and all three lines are written by 16.1: "Mon 10am · planner (by the hour!!) / 1 Harakeke Rd — main rd / 2 Ponga Cres — quiet st / 3 Tawa Ave — the villa" (fictional street names, no numbers) | Paper slap 13.25; marker squeaks; seven soft ticks |
| 18.0–31.0 | solution · 01 | "Step 1: sign up. Search your address." → "Boundary, zone, pipes, hazards. In seconds." → "Zoning: four councils. Pipes and hazards: **Auckland**." → "That's the council's building. Mine stay blurred." · tag "Live capture · qsme.co.nz" | Step one. Sign up. Search your address. / Boundary, zone, pipes, hazards. In seconds. / Zoning, four councils. Pipes and hazards, Auckland. / That's the council's building. Mine stay blurred. | **Real capture** of www.qsme.co.nz (its pricing line under "Get started" painted out): "135 Albert Street, Auckland" typed, jump cut past the suggestions list, the map panel slides in; cross-fade to the sharp 2× still; push to the map and hold on the **green parcel outline** (box, 22.55–23.9); then column by column: zone (box), services at 1.6× (box), hazards (amber box), footer (box) | Typing 18.0–20.2; click; whoosh 22.3 |
| 31.0–34.6 | solution · 02 | "Step 2: Site research, in your account." | Step two. Site research, in your account. | Recreated **Site research** page for Site 2 (address blurred, headline cropped): cursor click, green progress line, "Researching the site — boundary, zoning, overlays, services, hazards & history…", parcel draws in cadastre yellow, cards fade in verdict-first (Site 2's summary and chips are skeleton) | Click 31.5; progress hum |
| 34.6–44.0 | solution | "What the zone allows. In plain words." → "Height. Coverage. Yards. One grid." | What the zone allows. In plain words. / Height. Coverage. Yards. One grid. | **What could go here**: MHS description, "general guide for this zone type", green-dot "Without resource consent: Up to three dwellings per site that meet the zone standards — standalone, duplex or terraced" (boxed), blue-dot "With a resource consent" (items skeleton until the real screen); standards "8 m + 1 m roof (about 2 storeys)", "40% of the site", "Front 3 m · side & rear 1 m" | Two ticks |
| 44.0–48.6 | solution | "The whole street, in zone colours. (Auckland, anyway.)" | The whole street, in zone colours. In Auckland, anyway. | Cursor clicks the **Zoning** layer; neighbouring parcels wash in zone colours, legend MHS / MHU / THAB / Single House (now a clearly different pale swatch) / Open Space; the cropped card column dims so no half-cut text reads | Click 44.6; swoosh |
| 48.6–52.2 | proof (her notes) | "Site 2: tidy. Up to three. Bit boring." | Site two. Tidy. Up to three. Bit boring. | The sticky slides back over the dimmed screen; green marker writes "tidy · up to 3" under line 2 | Marker squeak 49.3 |
| 52.0–56.0 | solution · 03 | "Back to the “Strong” one." → "To be fair, it said. *In amber.*" | Back to the strong one. / To be fair. It said. | Cursor clicks the Site 1 pill (52.5); push to the verdict card; an amber ring draws round the "− Designation" chip (54.2): the card flagged it from the first second | Click 52.5; marker 54.2 |
| 56.0–64.0 | value | "Auckland overlays, on the parcel. **Red**, we've met." → "**Amber:** a viewshaft over the top." → "**Green** says 21 m. **Amber** says maybe not." | Auckland overlays, on the parcel. Red, we've met. / Amber. A viewshaft over the top. / Green says twenty-one metres. Amber says, maybe not. | Scroll to Planning overlays & controls; the cold-open red underline is still there (not redrawn); amber marker under "Volcanic viewshaft · Mount Eden" (58.95), green under "Height Variation Control · 21m" (61.45) | Two marker squeaks; music to one held note |
| 64.0–77.0 | value · 04 | "Where the pipes run. Roughly." → "Pipe positions are approximate." → "It even tells you to lodge a beforeUdig." → "“Clear” is a map, not a promise." | Where the pipes run. Roughly. / Pipe positions are approximate. / It even tells you to lodge a before-you-dig. / Clear is a map. Not a promise. | Cursor clicks **Services**: water (blue, ~3 m out in the berm), stormwater (green, right at the front boundary, matching "≈ 1 m"), wastewater (red, behind the rear boundary); push-in frames the whole dashed "Distance to boundary · ~3 m" label; then the **Site services & hazards** card at 1.6× (beforeUdig line boxed, "Clear" hazards amber-boxed) | Click 64.55; three line-draw swishes |
| 77.0–83.8 | value · 05 | "Saved all three. Flick between them." → "Site 2: **Good**." → "Site 3: **Limited**. The villa usually stays." | Saved all three. Flick between them. / Site two. Good. / Site three. Limited. The villa usually stays. | **Saved sites** pills: Site 2 (GOOD pill; summary and chips skeleton), then Site 3 (LIMITED pill, "Special character rules usually mean keeping the existing house, which lowers the realistic yield.") | Clicks 79.4 / 81.4 |
| 83.8–88.0 | proof | "“Indicative only.” It says that every time." · "Quoted from each site's Site research page · demo sites" | Indicative only. It says that every time. | **Quote board**: three cards (STRONG / GOOD / LIMITED), each quoting one verbatim line (Site 1 the live-test summary; Site 2 "No overlays, precincts or designations touch this parcel."; Site 3 the special-character line) above the page's own "Indicative only — a planning heuristic from public council data, not advice.", with a red marker under every "Indicative only" | Three marker squeaks 84.9 / 85.35 / 85.8 |
| 88.0–94.4 | decision | "Site 3's off." → "Site 2 doesn't need a planner. Site 1 does." → lower third "Checklist + rough numbers: *Shorts linked below*" | Three's off. / Two doesn't need a planner. One does. / (silence) | Sticky over the dimmed board: line 3 struck through ("villa stays. off."), "strong… but red + amber" under line 1, line 1 circled, "→ MONDAY: 1" | Strike, circle |
| 94.4–112.4 | value · 06 | "Pro view. Same site. Much bigger map." → "Zoning. Buildings. Services. Flood. *In Auckland.*" → "Title facts from LINZ. How many owners. Not who." → "The rest? “Available with a data licence.”" → "“Reads as a freehold (fee simple) lot.” That's something." | Pro view. Same site. Much bigger map. / Zoning. Buildings. Services. Flood. In Auckland. / Title facts from LINZ. How many owners. Not who. / The rest? Available with a data licence. / Reads as freehold. That's something. | Cursor clicks **Open Pro view**; map-only framing for the four layer clicks; **Title** tab with every title value blurred, "1 owner on the title" boxed, amber "Available with a data licence" pill and the locked **CV & sales** tab boxed, then "Reads as a freehold (fee simple) lot — the simplest title to develop." | Clicks 98.0 / 98.95 / 99.9 / 100.85; 103.0 |
| 112.4–119.8 | value · 07 | "“One pager.” Print it, or save a PDF." → "Map, title, zone, overlays, services, hazards." | One pager. Print it, or save a PDF. / (silence) | Cursor clicks **One pager**: browser print preview of "QSME · Site report" (address and title block blurred) beside "Destination: Save as PDF"; slow pan down the page; click **Save** | Click 112.9; printer whirr 119.35 |
| 119.8–127.4 | payoff | "One page. That's what goes to the planner." → "And three questions worth paying for." · "Illustrative · demo data" (bottom right, clear of the cup) | One page. That's what goes to the planner. / And three questions worth paying for. | The printed page lands on a desk beside a flat white; a new sticky slaps on: "Qs for Monday / 1. Road widening — how much? / 2. Viewshaft vs 21 m? / 3. Pipe ~3 m — build-over?" | Paper landing 120.5; slap 121.4; marker 123.5–126.1 |
| 127.4–133.4 | twist / close | "It even tells you to ring the planner." → "Fair enough." | It even tells you to ring the planner. / Fair enough. | Quoted card ("Quoted from the Site research page"): "Indicative only — … **Confirm with a planner or the council.**" with a red marker under the last sentence | One held chord; marker 129.0 |
| 133.2–145.5 | CTA + end screen | QSME logo · "Start with your address." · "Site research: **sign up at qsme.co.nz** · Full depth: **Auckland**." · small print "Rule-based public data, not AI · Not a LIM, valuation or advice · Dramatised · demo sites" | Start with your address. / Sign up at Q-S-me dot co dot en zed. | End card cross-fades straight in over the quote (no dip to navy). Copy sits in the top third (y 66–360); the band y 360–930 is left clear for two YouTube end-screen video tiles plus the subscribe button; small print at y 952 | Chord resolves, room tone to the end |

### The two 9:16 chapter cut-downs (YouTube Shorts)

**Cut 1 · "Strong. Then I scrolled." (31 s)**: headline "It said “Strong.”" over the STRONG card, re-laid at panel width so the full summary line and all three chips read in frame 1 (0–2.6) → "Then I scrolled." with the scroll slam (2.6–17.2): red / amber / green rows each underlined ("Red: a road-widening designation." · "Amber: a viewshaft over the top." · "Green says 21 m. Amber says maybe not."), then back up to "“Indicatively.” It says that every time." → "Not a no." + sticky "Qs for Monday: 1. Road widening — how much? 2. Viewshaft vs 21 m? 3. 2–5 homes — really?" ("Three questions for the planner.") → "The last word:" quoted disclaimer → "It even tells you to ring the planner." / "Fair enough." → end card cross-fades in: "Run an Auckland site before you offer." · "Site research: sign up at qsme.co.nz", small print with "Dramatised · demo sites".

**Cut 2 · "One page for the planner" (32 s)**: visual-promise hook, the printed one pager and the questions sticky on a desk ("Illustrative · demo data"), "One page for the planner." / "Here's where it's from." → "“Open Pro view.”" / "Pro view. Same site. Much bigger map." → "Four layers." (chips clicked; "Zoning. Buildings. Services. Flood. In Auckland.") → "The Title tab." ("Title facts from LINZ. How many owners. Not who." · "The rest? “Available with a data licence.”") → "“One pager.”" / "Print it, or save a PDF." → back on the desk ("Illustrative · demo data"), "One page. Three questions." / "That's the meeting sorted." → "The last word:" → end card "Start with your address." · "Site research: sign up at qsme.co.nz" with "Dramatised · demo sites".

Both: screen frame 950×638 at y 462–1100, one caption box below it (bottom edge y 1250), so captions never cover the rows they explain. Everything sits inside the Reels/Shorts safe box (65,300,1015,1250).

## Captions, hashtags and CTA

### YouTube (16:9, Sunday 18 Oct 19:00 NZDT)

- **Title:** What can I build on my section? Three Auckland sites, one planner, one page
- **Description:**

```
Three sections on the shortlist. One planner on Monday, paid by the hour. Which one gets the meeting?

A deadpan walkthrough of QSME Site research: sign up, search your address, and see what Site research shows you. What the zone allows, the Auckland planning overlays on the actual parcel, where the pipes run (roughly), a development verdict (indicative only, every time), title facts in the Pro view, and a one-page site report to take to the planner.

Honest bits: full depth (overlays, services, hazards, the verdict) is Auckland only. Zoning covers Auckland, Wellington City, Christchurch and Hamilton. It's rule-based public data, not AI, and it's not a LIM, a valuation or advice. It even tells you to confirm with a planner or the council. Fair enough.

Search your address. Sign up at https://www.qsme.co.nz

The checklist ("What this site would require") and the rough numbers have their own Shorts:
Granny flat for Mum: <link once live>
The walk-away number: <link once live>

0:00 It said "Strong". Then I scrolled.
0:18 Step 1: sign up and search your address
0:31 Zone: what could go here
0:52 Overlays on the parcel
1:04 Services and hazards
1:17 Three sites, one verdict each
1:34 Pro view and title facts
1:52 The one pager
2:07 The last word

[SCREENS LINE: use the one that matches what ships]
(a) after the Session A swap: The Site research screens are recorded from a demo account; the homepage check is a live capture of a public building's address. The narrator is a dramatised character.
(b) if any recreation ships: Screens marked "Illustrative · demo data" are recreations with demo sites; the homepage check is a live capture of a public building's address. The narrator is a dramatised character.
```

- **Tags:** what can I build on my section, Auckland zoning, Auckland Unitary Plan, site research, development potential, volcanic viewshaft, designation, Mixed Housing Suburban, subdivision Auckland, small developer NZ, QSME
- **Thumbnail:** `outputs/address-to-site-report-thumb.png` (the red designation row under a STRONG pill, "It said STRONG. Then I scrolled.").
- **Cards:** at 1:32 (the lower third "Checklist + rough numbers: Shorts linked below"): card 1 "Granny flat for Mum" (13 Oct), card 2 "The walk-away number" (15 Oct).
- **End screen (2:13–2:25, 12 s):** two video tiles in the clear middle band (left and centre: the two chapter Shorts once they're up on 19 and 21 Oct; until then "Granny flat for Mum" and "The walk-away number") + subscribe on the right. Nothing on the end card sits in that band.
- **Pinned comment:** "Which council are you in? Zoning works in Auckland, Wellington City, Christchurch and Hamilton today; overlays, services and the verdict are Auckland only. We'd rather tell you that up front."

### Facebook (16:9 native upload, same evening)

```
It said "Strong development potential." Then I scrolled.

Three Auckland sections, one planner on Monday at an hourly rate. Here's how QSME Site research helps you pick which address gets the meeting, and walk in with one page and the right three questions.

Full depth is Auckland only, it's public data rather than AI, and it's not a LIM or advice. It even tells you to ring the planner. Fair enough.

Search your address. Sign up at https://www.qsme.co.nz

The checklist and the rough numbers have their own short videos on our page.

#Auckland #PropertyDevelopment #NZProperty #FirstHomeBuyers #Subdivision
```

Facebook has no end-screen tiles, so the last 5 s are a calm navy end card; that's fine to leave.

### YouTube Shorts (the two 9:16 cuts; post Mon 19 and Wed 21 Oct, each linking the long video as "Related video")

- **Cut 1 title:** It said "Strong". Then I scrolled. #Auckland #property
  Description: `Site research said "Strong development potential". One scroll later: a road-widening designation and a volcanic viewshaft. To be fair, it flagged it. Full walkthrough on the channel. Sign up at qsme.co.nz to run Site research (full depth: Auckland). Not a LIM or advice. #Auckland #PropertyDevelopment #NZProperty #Shorts`
- **Cut 2 title:** One page for the planner #Auckland #property
  Description: `Pro view (same site, much bigger map), title facts from LINZ, and a one-page site report you print or save as a PDF. It even tells you to ring the planner. Full walkthrough on the channel. Sign up at qsme.co.nz #Auckland #PropertyDevelopment #NZProperty #Shorts`
- The same 9:16 files can run on IG Reels / TikTok / FB Reels later; they sit inside the Reels safe box.

**CTA line (everywhere):** Start with your address. Site research: sign up at qsme.co.nz. Full depth: Auckland. (Owner rule 2026-10-03: never "free", "no account", "no sign-up" or any price line, in captions, comments or replies.)

**Comment plan (first hour):** "Does it work in Dunedin/Tauranga/…?" → boundary, area and council NZ-wide; zone in four councils; full depth Auckland only, more councils to come (no date). "Is this a LIM?" → no, it says so on every card; order the LIM and title. "Is it AI?" → no, rule-based lookups of public council and LINZ data. "Is it free?" / "What does it cost?" → no prices and never "free": "Sign up at qsme.co.nz and run your address." Never quote prices, counts or "verified".

## Music

- **Direction:** dry, warm, unhurried, like the narrator. Minimal felt piano or muted guitar over a soft kick and brushed hats, 86–90 BPM, no vocals, nothing "epic". No music for the first 8 s: the hook runs on the ding, the scroll whoosh and room tone so "Then I scrolled." lands in near-silence. Music enters under the title card (8.0 s), thins under the live capture so the typing reads, drops to a single held note under the red / amber / green run (56–64), lifts slightly for the Pro view, pauses for the desk landing (120.5), then one held chord under "It even tells you to ring the planner." and a soft resolve on the end card.
- **Source:** ElevenLabs Music on a plan that covers commercial use (prompt: "understated warm felt piano and muted electric guitar, soft kick and brushes, 88 BPM, dry and wry, no vocals, 138 seconds, very sparse at 56–64 s, single held chord from 127 s, resolve at 133 s"), or a licensed library track on a business licence. SFX: ElevenLabs Sound Effects or a licensed library (UI ding, scroll whoosh, marker squeak, paper slap, printer whirr, paper landing, UI clicks).
- **Licensing:** the same file goes to YouTube and Facebook, so don't use YouTube Audio Library or CapCut library music. Shorts reuse 31–32 s edits of the same licensed cue.

## Production status (2026-10-02, v2)

| Piece | State | Where |
|---|---|---|
| 16:9 master v2, 145.5 s, silent-first, captions = VO | ✅ Re-rendered after review with tools/motion (`make.mjs --safe 96,54,1824,1026`), QA passed, contact sheet and ~50 full-size frames checked. Re-rendered 2026-10-03 for the owner CTA rule (sign-up copy, homepage pricing line painted out), QA passed | `outputs/address-to-site-report-16x9.mp4` |
| 9:16 cut 1, "Strong. Then I scrolled.", 31 s | ✅ Re-rendered (`--safe 65,300,1015,1250`), QA passed, frames checked (0.2 / 6.0 / 15.5 and more). Re-rendered 2026-10-03 (end card CTA), QA passed | `outputs/address-to-site-report-ch03-strong-then-scrolled-9x16.mp4` |
| 9:16 cut 2, "One page for the planner", 32 s | ✅ Re-rendered, QA passed, frames checked. Re-rendered 2026-10-03 (Pro view caption, end card CTA and small print), QA passed | `outputs/address-to-site-report-ch06-07-one-page-for-the-planner-9x16.mp4` |
| Live footage: homepage address search, 135 Albert Street (Auckland Council) | ✅ Captured 2026-10-02 (desktop 1920×1080) + a 2× still for the push-in. The suggestions list (other towns' "135 Albert Street") is cut out; the page's pricing line under "Get started" is painted out frame by frame (2026-10-03) | `motion/capture-home.json`, `motion/clips/home*` |
| Signed-in screens (Site research, Pro view, one pager) | 🟡 Illustrative HTML recreations, demo data, labelled "Illustrative · demo data"; only verbatim wording legible. **Swap for owner recordings before publishing** (table below) | `motion/site-ui.js` |
| B-roll | ✅ `th-1-site` tight crop (no works visible), labelled "Illustrative b-roll" | `motion/clips/site/` |
| Thumbnail | ✅ checked 2026-10-03 against the owner CTA rule (no price or sign-up wording); unchanged | `outputs/address-to-site-report-thumb.png` |
| VO (Mel, 42 master lines + 2 cut-down sets) | 🟡 Re-timed on v2, CTA lines rewritten 2026-10-03 (vo07, vo11, vo31, vo42, a10, b02, b10), `vo_status.py` ok; generate after the ElevenLabs upgrade (`python3 tools/make_vo.py --all`; the cut-downs reuse master takes + 6 new lines) | `vo-script.md`, `vo-script.json` |
| Music + SFX | ⬜ To make (licensed) | Music section |
| Owner recordings (Session A, by Fri 9 Oct) | ⬜ Needed to lift the publish hold | Table below |

## Review fixes (2 Oct review → v2)

| Review item | What changed |
|---|---|
| MUST · recreations with invented UI wording | Every `[D]` string is gone from what you can read: Site 2/3 summary lines and chips → skeleton bars; "With a resource consent" items → skeleton; all title values (type, estate, status, issue date, guarantee, land district) → blurred; the three invented verdict cards → a quote board of verbatim lines only. Service values on screen are the truth sheet's own examples ("Available · ~3 m", "Nearest 150 mm VC pipe ≈ 1 m from the boundary"). Publish stays on hold until Session A (see the hold section) |
| MUST · "swap for real QSME screen" burned in | Label is now "Illustrative · demo data" everywhere (master screens, desk, both cuts) |
| MUST · Cut 1 stray "Site 3" tag | Root cause: the cut's label class `.tag` also styled the saved-site pill tags, pulling them onto the map. Label renamed `.itag`; cut 1 now uses a panel-width layout with no pills. Checked at 0.2 / 6.0 / 15.5 |
| MUST · Cut 2 desk beats unlabelled | "Illustrative · demo data" on both desk beats (0–3.2, 21.2–24.6) |
| MUST · vo28 drops "usually" | Now vo27 "Site three. Limited. The villa usually stays." (caption matches) |
| SHOULD · "Its own short this week" cards | Cut. 2 s lower third "Checklist + rough numbers: Shorts linked below" over the end of the decision sticky; YouTube cards + end screen link the two Shorts; the dated VO line is dropped |
| SHOULD · boundary never shown | Push to the map, green box on the parcel outline 22.55–23.9, then the card |
| SHOULD · captions ≠ VO | Every caption is now its VO line (both carry the hedges). Examples: "Which one gets the meeting?", "Site 2: tidy. Up to three. Bit boring.", "“Reads as a freehold (fee simple) lot.” That's something." |
| SHOULD · decision logic | "Site 3's off." → "Site 2 doesn't need a planner. Site 1 does." (VO "Two doesn't need a planner. One does."), then the circle and "→ MONDAY: 1" |
| SHOULD · "Strong" reads as the tool misleading | New beat 53.95–55.95: amber ring round "− Designation", "To be fair, it said. In amber." |
| SHOULD · 12 s of setup | Now 7 s (11.0–18.0): b-roll 2.2 s, sticky writes all three lines by 16.1, chapter strip overlaps the sticky; dropped "Here's how I picked." |
| SHOULD · chapter 03 replays the cold open | Now 12 s incl. the 2 s "to be fair" beat: the red underline is kept (not redrawn), straight to amber then green; the Site 1 click is 1.5 s |
| SHOULD · b-roll shows works | Tight crop of th-1-site as a photo card (maunga, bare section, boundary pegs; digger and surveyor out of frame) + "Three sections. Shortlisted. Not bought." |
| SHOULD · stormwater line vs "≈ 1 m" | Stormwater now runs at the front boundary, water ~3 m out, wastewater just behind the rear boundary (`site-ui.js`) |
| SHOULD · 9:16 = cropped desktop, stacked captions | Cut 1 uses `SiteUI.narrowPage` (cards at panel width, summary + chips read in frame 1). Both cuts: frame 950×638, one caption box with internal wrap below it (bottom y 1250), so nothing covers the rows |
| SHOULD · end card 7 s, centred | 12 s; copy in the top third, the middle band clear for two tiles + subscribe; "Site research: sign up at qsme.co.nz · Full depth: Auckland." (CTA updated 2026-10-03) |
| SHOULD · weak 16:9 first frame | Big Manrope headline "It said “Strong.”" over the card (as in the 9:16), "Then I scrolled." slam; the two tags merged into one small line under the screen |
| SHOULD · "Dramatised" only in the opening | "Dramatised · demo sites" added to the end-card small print in all three videos |
| NICE · navy dip before end cards | Cross-fade straight from the quote card to the end card in all three |
| NICE · desk tag over the cup | Desk tag moved bottom right, clear of the cup, the paper and the sticky (the hands-only filmed shot is still the better fix, listed below) |
| NICE · homepage chips too small | Push-in by column: services 1.6×, then hazards + footer |
| NICE · push-ins clip labels / similar swatches | 40 px camera margin on the overlays push-ins; the pipes push-in frames the whole distance label and stops before the card column; Single House swatch now pale cream vs golden MHS; the Pro layers beat frames the map only (no half-cut panel text) |

## Owner recordings to swap in

Session A, desktop 1920×1080, signed in to a demo-safe NZ account, browser zoom 110–125% so text is legible. Three Auckland addresses that are **commercial or your own** (use the ~209 m² Mount Eden Road Mixed Use test site as Site 1 only if it's confirmed commercial). Crop or blur every address bar, any trial, plan or pricing banner (owner rule 2026-10-03), the page headline ("Type any New Zealand address…"), the search box, the saved-site pill text and map street labels. Record each shot 2–3 s longer than listed. Keep Site 1 = the "Strong" site with a designation, Site 2 = a quiet residential site with no overlays, Site 3 = a special-character / Single House site, or tell me what your three sites return and I'll re-cut the captions to match (never caption a number the real screen doesn't show).

| # | Replaces (16:9 master v2) | Also in | Screen and click path | What must be visible | Demo data / notes | Length |
|---|---|---|---|---|---|---|
| D | 0.0–2.6, 52.5–56.0 (the "to be fair" chip), 83.8–88.0 (board) | Cut 1 0–2.6 and 14.3–17.2 | Site research → Site 1 loaded → top of the column | The **Development potential** card: STRONG pill, the summary line and the +/− chips (the amber "− Designation" chip matters for the "to be fair" beat) | Use the real summary line and chips exactly as returned; the quote board is rebuilt from your three real lines | 6 s |
| E | 2.5–7.9 and 56.0–64.0 | Cut 1 2.6–14.2 | Same page → scroll from the verdict to **Planning overlays & controls** (one fast scroll for the cold open, one slow pass for chapter 03) | Red Constraints "Designation · Road Widening (Auckland Transport)", amber "Volcanic viewshaft · Mount Eden" with its line, green "Height Variation Control · 21m", "Good to know" | If Site 1 returns different overlays, keep whatever is real and I'll rewrite the red/amber/green captions | 2 takes, 4 s + 10 s |
| A | 31.0–34.6 | — | Site research → type/paste Site 2 → pick it | Green progress line, "Researching the site — boundary, zoning, overlays, services, hazards & history…", parcel in cadastre yellow, cards filling in | Headline cropped; address blurred | 6 s |
| B | 34.6–44.0 | — | Site 2 → scroll to **What could go here** | Zone badge, the zone description, "Without resource consent" / "With a resource consent" lists (the real items replace the skeleton), the standards grid | Ideally a Mixed Housing Suburban site so the captions stay true; otherwise tell me the zone | 10 s |
| C | 44.0–48.6 | — | Site 2 map → click the **Zoning** layer chip | The street washing into zone colours with the legend | Blur street labels | 5 s |
| F | 64.0–77.0 | — | Site 1 → map **Services** layer, then scroll to **Site services & hazards** | Pipes on the map, the dashed **Distance to boundary** line, the nine chips, "Mapped pipe positions are approximate — always lodge a beforeUdig request…" | Values exactly as returned (the stand-in shows the truth sheet's examples, ~3 m / ≈ 1 m) | 12 s |
| H | 77.0–83.8 | — | **Saved sites** pills: click Site 2, then Site 3 | Each page swapping, verdict pill changing, Site 2's and Site 3's real summary lines and chips | Pill text blurred; I add "Site 1/2/3" tags in the edit | 7 s |
| G | 94.4–112.4 | Cut 2 3.2–17.4 | Site 1 → **Open Pro view** → click Zoning, Buildings, Services, Flood & hazards chips → tab pills → **Title** → hover **CV & sales** | Full-height aerial with each layer, the tabs, the Title tab with the **real owner count** and the amber "Available with a data licence" pill, the locked CV & sales tab, "Reads as a freehold (fee simple) lot…" if shown | Blur the title number, legal description and anything naming the property. Show whatever owner count the site really returns | 20 s |
| I | 112.4–119.8 | Cut 2 17.4–21.2 | Pro view → **One pager** → print preview → Destination "Save as PDF" → **Save** | The A4 "QSME · Site report" preview and the dialog | Blur the address line and the title block | 8 s |
| J | 127.4–133.4 (optional) | Cut 1 21.6–25.4; Cut 2 24.6–28.2 | Simple view → scroll to the bottom | The grey disclaimer "Indicative only … Confirm with a planner or the council." held | The quoted card can stay if you prefer; it's verbatim | 5 s |
| Filmed (optional, hands only) | 13.2–18.0 and 119.8–127.4 | Cut 2 0–3.2 and 21.2–24.6 | Phone on a tripod, natural light | A sticky note with "Mon 10am · planner / 1 Harakeke Rd / 2 Ponga Cres / 3 Tawa Ave" on a laptop bezel (screen dark or showing the demo account); the printed one pager landing on a kitchen table, then the "Qs for Monday" sticky pressed onto it | No faces, no real addresses, no screens showing personal data. The desk scene is the emotional payoff: this lifts the whole film | 2 × 8 s |

The rest stays as it is: the live homepage capture (18–31 s) is already real footage, the b-roll is labelled, and the quote board only quotes verbatim lines.

## Integrity notes (every claim, and what it rests on)

Truth sheet: `research/2026-10-02-qsme-platform-truth.md` (feature ids in brackets).

| Claim / thing shown | Rests on | Status |
|---|---|---|
| "Strong development potential", the five-level verdict, "indicatively 2–5 homes here; 2 things to design around", chips "+ High-density zone", "− Small site (209 m²)", "− Designation" | [2.1 development-potential] exact wording and the verified live test of a ~209 m² Mixed Use Auckland site | ✅ live · stand-in uses the verified live-test line |
| "To be fair, it said. In amber." | The "− Designation" chip is on the verdict card itself [2.1]; minus-chips are amber | ✅ |
| "Designation · Road Widening (Auckland Transport)", "Volcanic viewshaft · Mount Eden" + its line, "Height Variation Control · 21m", "Walkable catchment", groups Constraints / Design around / Opportunities / Good to know | [1.6 overlays] exact wording; live test returned exactly these | ✅ live (Auckland only) |
| "Auckland overlays, on the parcel." | [1.6] Auckland layers checked against the parcel polygon. No "every overlay" claim | ✅ |
| "Green says 21 m. Amber says maybe not." | [1.6] viewshaft line + [2.1] "A viewshaft can cap height below the zone figure — the storeys above are not guaranteed." | ✅ |
| Step 1: "Sign up. Search your address." over the live homepage search; boundary shown on the map; "Boundary, zone, pipes, hazards. In seconds."; "Zoning: four councils. Pipes and hazards: Auckland." | [1.1 home-address-check] + owner CTA rule 2026-10-03 (sign-up first; never describe a no-account tier) + top fact-check correction (boundary/council NZ-wide; zone 4 councils; services/hazards Auckland only); "in seconds" not "instant" | ✅ live capture, 2 Oct 2026 |
| 135 Albert Street result (3,597 m², Lot 1 DP 123332, Business - City Centre Zone, services and hazards) | Live public capture of a public/commercial building (Auckland Council) | ✅ real |
| "Step 2: Site research, in your account." and "Researching the site — boundary, zoning, overlays, services, hazards & history…" | [1.4 site-research] (an account is required). The headline "Type any New Zealand address…" is never shown or voiced | ✅ |
| "What could go here", the MHS description, "general guide for this zone type", "Without resource consent: Up to three dwellings per site that meet the zone standards — standalone, duplex or terraced", "With a resource consent" (items skeleton), standards "8 m + 1 m roof (about 2 storeys)", "40% of the site", "Front 3 m · side & rear 1 m", the zone-card disclaimer | [1.5 zoning] exact wording; numeric rules are Auckland only. No invented consent items | ✅ |
| "Site 2: tidy. Up to three. Bit boring." | [1.5] exact "Up to three dwellings…" line; never "you can build three" | ✅ |
| Zoning layer paints the street "(Auckland, anyway.)" | [1.5] coloured zoning map, Auckland only. Zone colours in the stand-in are illustrative | ✅ |
| Pipes on the map, "Distance to boundary", "Pipe positions are approximate", beforeUdig line, chips and hazard states | [1.7 services-hazards] exact wording; values on screen are the truth sheet's own examples; the map now matches them | ✅ (Auckland only) |
| "“Clear” is a map, not a promise." | [1.7] DO NOT CLAIM "Clear" means no flood risk | ✅ (it's the guardrail) |
| Saved sites, flicking between three | [1.10 saved-sites] | ✅ |
| Site 2 "Good", Site 3 "Limited" and "Special character rules usually mean keeping the existing house, which lowers the realistic yield." | [2.1] verdict levels + exact special-character line. Site 2/3 summary lines and chips are not shown (skeleton) until the real screens | ✅ |
| Quote board: "No overlays, precincts or designations touch this parcel." (Site 2); "Indicative only — a planning heuristic from public council data, not advice." on every card; "It says that every time." | [1.6] calm-state line; [1.4] page disclaimer shown on every Site research page. Labelled "Quoted from each site's Site research page · demo sites" | ✅ verbatim |
| "Site 2 doesn't need a planner. Site 1 does." | Mel's own judgement from the screens (no overlays vs a designation + viewshaft). Not a product claim | n/a (dramatised) |
| Lower third "Checklist + rough numbers: Shorts linked below" | [2.2], [2.3] exist; their own Shorts (13 and 15 Oct) | ✅ |
| "Open Pro view", "Site research — Pro", "A full-height map and the full planning picture, side by side.", layers "Zoning · Buildings · Services · Flood & hazards", tabs "Summary · Title · Zoning · Overlays · Characteristics · CV & sales · Feasibility"; "Same site. Much bigger map."; "In Auckland." | [1.8 site-research-pro] exact wording (the Pro view is the same site's research beside a full-height map); fact-check: 'Pro' is a view name, so never present it as a plan or a price; Pro demos must be Auckland | ✅ (web only) |
| Title tab: labels per [1.8], every value blurred, "1 owner on the title", "Available with a data licence", "Owner names come from a LINZ data licence.", "Reads as a freehold (fee simple) lot — the simplest title to develop."; "Title facts from LINZ. How many owners. Not who." / "The rest? Available with a data licence." | [1.8] + [1.14] owner count is shown, names/CV/sales are licensed placeholders. The owner count shown must be swapped for the real one | ✅ / swap flagged |
| "One pager", "QSME · Site report", sections Key facts / Title & ownership / Zoning & potential / Overlays & controls / Services / Flood & hazards, print or "Save as PDF" | [1.9 site-one-pager]: browser print dialog, not a dedicated download; never "official" or "bank-ready" | ✅ |
| The disclaimer "Indicative only — … Confirm with a planner or the council." and "It even tells you to ring the planner." | [1.4] exact wording | ✅ |
| End card: "Site research: sign up at qsme.co.nz", "Full depth: Auckland.", "Rule-based public data, not AI · Not a LIM, valuation or advice · Dramatised · demo sites" | [1.4] facts (Site research needs an account; rule-based, not AI), [1.1]/[1.4] DO NOT CLAIM lists, owner CTA rule 2026-10-03 | ✅ |
| Mel, the three sections, the sticky notes, the Monday planner | **Dramatised**, tagged in the opening ("Dramatised · illustrative screens · demo data"), on the setup beat ("Dramatised · demo sites") and in every end card. Mel is voice-only (AI voice later), never shown, never a testimonial. Street names are fictional with no house numbers; every on-screen address of the three sites is blurred | n/a |

**Deliberately avoided:**
- No "any NZ address": the Site research headline is cropped from every stand-in, and "Search any NZ address…" in the Pro view sits inside a blurred search box. The VO never says it.
- No invented UI wording legible anywhere (v2): unknown content is skeleton or blur, never made-up text.
- No "free", no "no account" / "no sign-up", no plan or price line anywhere: captions, VO, end cards, descriptions, comment replies (owner rule 2026-10-03). Every CTA is "sign up at qsme.co.nz", and the live homepage's own pricing line under "Get started" is painted out of the capture.
- No AI claim (it's rule-based), no "instant" (it's "in seconds"), no counts, no prices or plan names, no time or money saved, no "verified", no competitor or data-provider names (Relab, CoreLogic, QV, homes.co.nz never appear).
- No requirements checklist or feasibility demo (scoped to their own Shorts), no phone app, no Pro view on the phone, no Android, no "registered trademark" spoken.
- No owner names, CV, land value or sale prices anywhere; the CV & sales tab is shown locked.
- No LIM, title-search, valuation, "official", "bank-ready" or "replaces a planner" language; the film ends on the tool telling you to confirm with a planner.
- No private homes: the only legible address is 135 Albert Street (Auckland Council). The live dropdown that lists other towns' "135 Albert Street" addresses is cut out of the capture.
- People: the b-roll is cropped to the empty section (no worker in frame); the hi-vis worker in the live homepage hero is QSME's own public hero image.
- Humour punches at the situation and at Mel herself (she skimmed past the amber chip; the villa that stays; the tool telling you to ring the planner), never at the planner, agents, council or customers.
- Nothing dated: no "this week" on screen or in the VO.

## Open questions for you

1. **Your three Session A sites:** which three Auckland addresses (commercial or yours) and what do they return? If Site 2 isn't Mixed Housing Suburban, or Site 1 shows different overlays, I'll re-cut the captions to the real screens.
2. **Is the ~209 m² Mount Eden Road Mixed Use site commercial?** If yes, it's the perfect Site 1 (it's the verified live test).
3. **If Session A slips past ~14 Oct:** publish v2 as is on 18 Oct (verbatim-only, labelled "Illustrative · demo data"), cut the verdict flick and quote board as the review wrote (−15 s), or move the slot?
4. **Shorts schedule:** OK to post the two cuts as YouTube Shorts on Mon 19 and Wed 21 Oct, each linking back to this video?
5. **Light or dark theme:** the stand-ins use the light app shell from the official walkthroughs. If your Site research screens record dark, I'll match the chapter chips and captions to them.

## Discussion history

- 2026-10-02: Produced from the approved calendar slot (week 2, Sun 18 Oct 19:00 NZDT, YouTube + Facebook, 16:9, ~150 s, +9:16 chapter cut-downs). Absorbed nz-strong-then-i-scrolled as the cold open. Captured the public homepage check live (135 Albert Street); built labelled illustrative recreations of Site research, the Pro view and the one pager from the truth sheet's exact wording; reworked the original running order so the saved-sites flick doubles as the verdict chapter (no repeated flick); requirements and feasibility get a pointer only. Rendered the 151 s master and two Shorts cuts, wrote the timed Mel VO script. Awaiting approval and Session A recordings.
- 2026-10-02 (v2, after review "fix"): applied all 5 must-fix, 13 should-fix and 4 nice items (table above). Master is now 145.5 s: big-headline cold open, 7 s setup, boundary shown on the live map, "To be fair, it said. In amber." beat, overlays trimmed, quote board of verbatim lines, explicit "Site 2 doesn't need a planner. Site 1 does.", pointer cards replaced by a lower third, captions = VO, 12 s end card with end-screen zones, no navy dip. All invented UI wording removed (skeleton/blur); label "Illustrative · demo data" everywhere. Cut 1 re-laid at panel width (stray "Site 3" tag fixed at the root); cut 2 desk beats labelled; both cuts have one caption box below the frame. VO script re-timed (42 lines). Publish still on hold until Session A.
- 2026-10-03: owner CTA rule — removed free/no-sign-up, CTA now "Sign up at qsme.co.nz" (end cards: "Site research: sign up at qsme.co.nz"; descriptions: "Search your address. Sign up at https://www.qsme.co.nz"). Step 1 is now "Sign up. Search your address." (was "The homepage. No account."), step 2 "Site research, in your account." (was "Free account."), the Pro view line is "Same site. Much bigger map." (was "It's a view, not a paid plan."), the live tag lost "public page, no login", cut 2's small print lost "“Pro” is a view, not a plan" (it now matches cut 1's), and the real homepage's pricing line under "Get started" is painted out of the capture frame by frame. VO lines vo07, vo11, vo31, vo42, a10, b02, b10 rewritten (timings unchanged; b10 now reuses vo42). Re-rendered the 16:9 master and both 9:16 cuts with the same paths and safe boxes; thumbnail checked, unchanged.
- 2026-10-06 (audio-first remake to the owner-approved N01 standard): all three cuts rewritten as continuous first-person speech with a spoken hook, each voiced as ONE unbroken Cam S eleven_v3 take (film 152.5 s at 2.52 w/s, longest silence 0.86 s; cut 1 36.0 s; cut 2 37.8 s; STT clean), the three pages re-timed to the word alignments (film 154.0 s, cuts 37.5 / 39.4 s) and re-rendered with QA passed, muxed clean at 0.0 s → `outputs/*-with-vo.mp4`; v1 masters archived in `outputs/archive/`; `vo-script.json/.md` rewritten to the take contract. Lower third dropped from the film; captions re-lifted from the narration. Publish hold (Session A) unchanged.
- 2026-10-07 (resume after the session limit): the 2026-10-06 run had rendered the 154.0 s 16:9 master but not mixed it; mixed now with tools/mux (take at 0.0 s, gain 1.15, no bed) → `outputs/address-to-site-report-16x9-with-vo.mp4` (154.00 s, 1 video + 1 audio track, audio 152.53 s). Re-ran the page QA on the 16:9 (ok, all text in the safe box) and spot-checked 22 frames of the voiced master at word moments: hook headline, the scroll onto the red row, sticky writes, homepage typing, boundary box, dwellings box, zone wash, amber ring, pipe lines, Site 2 click, quote-board markers, layer chips, title box, print preview, the three questions, the ring-the-planner underline, end card. Both 9:16 voiced cuts re-probed (37.50 / 39.40 s, 1 audio track). Gaps confirmed from the word files with tags skipped: film 0.86 s, cut 1 1.02 s (the beat before the dry punchline, after 3 attempts), cut 2 0.46 s.
- 2026-10-10 (verification pass, "finish the voice overs"): N07 already complete to the audio-first standard; re-verified all three voiced masters (16:9 154.0 s, cut 1 37.5 s, cut 2 39.4 s; 1 video + 1 audio track each, container = video length), spot-checked 12 frames on each 9:16 cut and 12 on the film at word moments (all land). Fixed the remake timing tables above: 8 captions with apostrophes had been cut short ("That", "Site 2 doesn", "Red, we" …), now full phrases. No re-voicing, no re-render.
- 2026-10-10 (review fix: CTA "dot koh"): all three takes regenerated whole with "Sign up at Queue Ess Mee dot Co dot N Z" (film 152.48 s, cut 1 34.48 s with the dry beat now 0.94 s, cut 2 37.76 s; first attempt each, STT clean); pages re-timed to the new words, re-rendered (QA ok), re-muxed at 0.0 s / 1.15 and probed (154.0 / 36.0 / 39.3 s, one audio track); 63 frames checked on the words; vo-script.json/.md and the timing tables above updated; dot-co cuts and the Oct 3 silent previews moved to outputs/archive/. Publish hold (Session A) unchanged.
- 2026-10-10 CTA swap: owner said "koh" sounded wrong; only the final "Sign up at qsme.co.nz" line was replaced (spoken "dot Co dot N Z", tools/fix_cta.py), rest of the take and picture untouched. Old take in outputs/archive/vo-koh-2026-10-10/.
