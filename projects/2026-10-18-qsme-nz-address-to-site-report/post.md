---
title: "Three sections, one planner: from an address to a site report"
venture: qsme-nz
idea: nz-address-to-site-report
status: "v2 rendered after review — HOLD: publish only after the Session A swap (or your OK on the verbatim-only fallback)"
publish_date: 2026-10-18
publish_time: "19:00 NZDT (Sunday)"
created: 2026-10-02
updated: 2026-10-03
calendar_week: 2
format: long-form walkthrough (deadpan)
aspect: "16:9 (+9:16 chapter cut-downs)"
length_s: 145.5
platforms: ["YouTube", "Facebook", "YouTube Shorts (chapter cuts)"]
absorbs: nz-strong-then-i-scrolled (cold open)
---

# Three sections, one planner: from an address to a site report

**The joke / insight in one sentence:** The screen says "Strong development potential", one scroll later it shows a road-widening designation and a volcanic viewshaft on the same section, and the tool's own last word is "Confirm with a planner or the council". So QSME's real job isn't to be the planner. It's to get you to the right three questions and one page to put on the planner's desk.

**Truth:** You pay professionals by the hour to answer questions, and most people don't know which questions to ask until after the deposit.
**Twist:** The product celebrates first ("Strong"), but it had flagged the designation in amber all along. Mel skimmed. It ends by telling you to ring the planner, and Mel's deadpan "Fair enough." is the button. The joke lands on her skimming and on the situation, never on the tool or its users.
**Job:** Organic, evergreen. It's the YouTube/Facebook link every site-research short points to, and it catches searches like "what can I build on my section Auckland". Success = watch time past 1:00, clicks and sign-ups at qsme.co.nz, saves/shares from small developers, and comments asking "does it do [my council]?" (answer honestly: zone in four councils, full depth in Auckland).

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
