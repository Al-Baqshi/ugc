# Build Circle research: full reports (2026-10-25)



## site

## Build Circle on baqshi.com: what the site says and what a video can use

**Status: live.** I fetched https://www.baqshi.com/, /ar and /es on 2026-10-25 and all three returned 200. Each has the `#build-circle` section, placed between "Where" and "Contact", and the `#build-circle-world` block. The nav and footer both link to it as "Build Circle". The live text matches origin/main commit 6cd1c6d.

I could not tell whether the form actually delivers. Testing it would mean sending a real registration. If delivery isn't connected, the route returns 503 and the page opens an email draft to hello@baqshi.com instead.

### Product name in each language
- **EN:** "Build Circle". Heading: "First-time developers **NZ.**", with "NZ." in signal blue.
- **AR:** "دائرة البناء · Build Circle". Nav label: "دائرة البناء". Heading: "مطوّرون لأول مرة في نيوزيلندا."
- **ES:** "Build Circle". Heading: "Promotores por primera vez NZ.". The steps call a circle "círculo".

### The promise (exact EN copy)
**Deck:** "Build Circle brings together people who want a home in the same place. As one group you buy the land and build at cost, as your own developer, and the margin a developer would have kept stays with you as equity."

**How a circle works:**
1. **Register:** "Say where you want to live, the home you want, and when."
2. **Form a circle:** "When enough people want the same place, we bring them together around one brief and one site."
3. **Build at cost:** "The circle buys the land and builds on an open book: every cost line quantity-surveyed and paid only when the work is done."
4. **Own the margin:** "Each household owns its home at cost. The margin a developer would have taken stays with you, toward your deposit or your mortgage."

**Equity comparison ("Where the margin goes"):**
- It compares two bars of "The same market value": "Buying from a developer" against "Building as a circle".
- Developer bar: Land 34%, Design and build 44%, "Developer margin and sales" 22%.
- Circle bar: Land 34%, Build 44%, "Management" 4%, "Your equity" about 18%. The page labels it "Your equity · ~18%".
- These percentages are hard-coded constants in BuildCircle.tsx. They are not derived from any data.

**Every caveat line on the page:**
- "Illustrative · not a forecast" (on the equity chart)
- "Every circle needs a site, full costs, finance and a viability check before anything is built. The map shows sample data, not a list of projects."
- "Illustrative interest · sample data" (under the map)
- "Sample data" (under the worldwide board)
- "Nothing is bought, built or charged until everyone has seen the full costs." (in the confirmation messages)

### Sample data vs real
**Everything numeric is sample data.** The code says so in plain words: "none is a count of real registrations".
- **NZ map:** 20 places with fixed counts that total **1,922**: Auckland 412, Christchurch 264, Hamilton 238, Tauranga 196, Wellington 174, Queenstown 88, and so on down to Gisborne 14. The home-type mixes and "Most asked for: 3 bedrooms" are also invented.
- **"Joining now" feed:** this is generated in the browser. It picks a random place and home type every 2.4 to 5 seconds while the map is on screen, and adds to the counts. So the 1,922 creeps up the longer someone watches.
- **Worldwide board:** Australia 640, Canada 410, "91 countries · 2,597 people", plus 14 named country chips (US 214, UK 188, UAE 163, …) and "+77 more". All of it comes from `SAMPLE_WORLD`.
- **Real:** the form fields, the 94-country list, and the status rules. A registration posts to `/api/inquiry` as type `circle`.

### Circle size
- `CIRCLE_SIZE = 24` households. The code comment says that's "enough for a small terraced or townhouse development on one site".
- The UI shows it as a ring reading "n / 24", with "Next circle · n of 24 households" and "Full circles so far: N".
- **This conflicts with your brief.** You said "3 or 4 people … all 3 of them"; the site says 24 households. The glyph does show three households on one ring.

### Countries and statuses
- 94 countries in total. The count is checked at compile time.
- **Live:** New Zealand. Note: "Circles are forming now."
- **Upcoming:** Australia and Canada. Note: "Opening next. Register now to be in the first circles."
- **Private:** 91 countries. Note: "Circles here run privately and are not open to the public yet. Register and we will tell you when one opens."
- **World deck:** "New Zealand is live, and Australia and Canada open next. In 91 more countries people are already gathering in private circles…"

### After registering
- **Form fields:** NZ place (picked from the 20), or a typed city for other countries; home type (Standalone house, Townhouse, Terraced house, Duplex, Apartment); bedrooms 1 to 5+; timing (Within a year, In one to two years, In more than two years, Just exploring); name; email; phone (optional).
- **Form body:** "Tell us where, what and when. When enough people want the same place, we bring the circle together and contact you."
- **Live (NZ) confirmation:** "You're in the {place} circle." Then: "We will contact you when the circle has enough households to look for a site. Nothing is bought, built or charged until everyone has seen the full costs."
- **Upcoming confirmation:** "You're on the list for {country}." Then: "{country} opens next…"
- **Private confirmation:** "You're registered for {country}." Then: "Circles in {country} run privately for now. We will contact you if one opens to new members…"
- **On the map:** after you register, your place gets a "You ·" marker and a ping.

### Privacy line
"We use these details only to contact you about a circle. Read our privacy policy." The privacy page itself doesn't mention Build Circle.

### What the site doesn't say (gaps against your brief)
- Nowhere on the section is there matching with a contractor, architect, engineer, project manager or estimator.
- It says nothing about finding the rules or consents.
- It doesn't mention pooling capital.
- It doesn't name QSME. The only link to it is "quantity-surveyed" in step 3; QSME appears elsewhere on the site as the build platform.
- It doesn't say "consultant".
- The CTA is "Register your interest" on baqshi.com. That conflicts with the NZ CTA rule ("Sign up at qsme.co.nz"), so you need to pick which brand and CTA the video uses.

### Lines a video could lift word for word
- "First-time developers"
- "Build Circle brings together people who want a home in the same place."
- "As one group you buy the land and build at cost, as your own developer"
- "the margin a developer would have kept stays with you as equity"
- "one brief and one site"
- "builds on an open book: every cost line quantity-surveyed and paid only when the work is done"
- "Each household owns its home at cost."
- "toward your deposit or your mortgage"
- "We match you with people who want the same."
- "Tell us where, what and when."
- "Nothing is bought, built or charged until everyone has seen the full costs." This one is borderline under the no-"free"-lines rule. It's a commitment line, not a pricing line, but check before using it.
- Caveat to say or show if the margin claim is made: "Every circle needs a site, full costs, finance and a viability check before anything is built."

### Must NOT repeat (sample data or unproven)
- **Any count:** 1,922, the per-town numbers, 640 / 410 / 2,597, the country chip numbers.
- **Progress and "full circles" figures,** e.g. Auckland would show "4 of 24" and "17 full circles", Hamilton "22 / 24". These imply circles exist when they don't.
- **The "Joining now" feed** as if it were real sign-ups.
- **"people are already gathering in private circles", "91 countries", "Circles are forming now"** stated as fact.
- **"~18%" equity, or any percentage split,** as a promise or forecast. If the bars appear, keep "Illustrative · not a forecast" on screen.
- **"Most asked for: 3 bedrooms"** and the home-type mix percentages.
- **"24 households"** until you confirm a circle size (the site says 24; you said 3–4).
- **No screen-capture of the map or boards** unless the "sample data" caption stays in frame. Better to rebuild the visuals with no numbers.

### Visual assets to reuse (geometry from the code)
- **Palette (globals.css):**
  - Section background #090d18, space #05070d, space-3 #0f1526
  - bright #eef2ff, text-2 #aab3c9, muted #7f89a6
  - signal blue #4fb8ff, orbit purple #a98bff, sky #4f8cff
  - Hairlines are white at 8% and 14%
- **Fonts:** Geist and Geist Mono. Headings use weight 600, tracking -0.03em, line-height 1.08. Mono captions are 12px uppercase with 0.04em tracking.
- **Easing:** out-expo is cubic-bezier(0.16, 1, 0.3, 1).
- **Ring glyph** (`CircleGlyph` in BuildCircle.tsx), described as "three households on one ring":
  - viewBox 20×20.
  - Dashed ring centred at (10,10), r=7, stroke #eef2ff at 0.55 opacity, width 1.5, dash 2 3.
  - Three dots r=2.2 in #4fb8ff at (10,3), (16.06,13.5) and (3.94,13.5), 120° apart.
- **Progress ring** (side panel):
  - viewBox 120, r=52, rotated -90° so it starts at 12 o'clock.
  - Track: white 14%, width 2, dash 2 4.
  - Arc: #4fb8ff, width 4, round caps, `pathLength=100`, `dasharray=(n/24*100) 100`, animated over 700ms with out-expo.
  - Centre: number at 26px semibold, with "/ 24" at 12px muted underneath.
  - A smaller copy sits on the map around the chosen town: r=34, width 3.
- **NZ heat map:**
  - Outlines: `NZ_LAND` and `NZ_GRATICULE` paths in src/lib/nz.ts. Natural Earth 10m in NZTM projection, frame 800×1141, generated by scripts/build-nz.mjs. Ready to import into a motion page.
  - Land fill: vertical gradient #141c33 to #0f1526. Coast stroke rgba(238,242,255,0.4) at width 1.2. Graticule is white at 5%.
  - Heat discs: r=150 map units with a radial gradient. Stops: #eef2ff at 0 (opacity 1), #cdbdff at 0.2 (0.92), #a98bff at 0.42 (0.62), #4fb8ff at 0.68 (0.24), #4f8cff at 1 (0).
    - Size: scale 0.14 + 0.86·√share. Opacity: 0.4 + 0.6·√share.
    - Each disc is drawn twice: unclipped at 0.16 opacity so it bleeds over the sea, then clipped to the land at full strength.
    - They breathe on a 5.5s loop (opacity dips to 0.78), with staggered delays.
  - Markers: 7px #eef2ff dots with a 3px dark halo; the active one turns #4fb8ff and scales to 1.3.
  - Ping: a 14px ring of #4fb8ff at 1.5px that scales from 0.5 to 3.4 and fades over 1.8s.
  - Legend bar: gradient from blue at 15% through #4fb8ff (45%) and #a98bff (80%) to #eef2ff.
  - Town positions in the 800×1141 frame: Auckland (524.5, 230.9), Hamilton (557.3, 310.4), Tauranga (616.4, 303.8), Napier (659.5, 457.3), Wellington (518.1, 603.5), Christchurch (383.9, 790.9), Queenstown (148.7, 923.7), Dunedin (260.1, 990.2). All 20 are in `PLACES`.
- **Equity bars:**
  - Two bars, 18px tall, 3px gaps, 4px corner radius. Same splits as the comparison above.
  - Colours: Land rgba(79,184,255,0.3); Build 0.55; Management 0.85; Developer margin hatched at 135° in white 18%/5% stripes (3px/7px); Your equity rgba(169,139,255,0.6) with a purple glow (0 0 24px -4px rgba(169,139,255,0.7)).
  - A bracket under the equity segment, a dashed line at the right edge for "The same market value", and "Illustrative · not a forecast" in 11px mono #6f7a95.
- **Steps route:** a 1.5px line with a #4fb8ff to #a98bff gradient at 0.7 opacity. It's dashed 4 6 and marches 10px every 1.6s. Step dots are 7px in #4fb8ff, #6fa9ff, #8c9aff and #a98bff, with mono numerals 01 to 04.
- **Status tags:** Live is blue with a pulsing dot (2.4s pulse); Upcoming is purple; Private is muted. All are 11px mono uppercase pills.

### Files
- /Users/brave/baqshi.com2027 at origin/main (6cd1c6d):
  - src/i18n/{en,ar,es}/buildCircle.ts
  - src/components/BuildCircle.tsx
  - src/components/CircleExplorer.tsx
  - src/components/CircleForm.tsx
  - src/components/CircleWorld.tsx
  - src/lib/circle.ts
  - src/lib/circleLive.ts
  - src/lib/nz.ts
  - src/app/api/inquiry/route.ts
  - src/app/globals.css
  - scripts/build-nz.mjs
- Saved copies of the live pages: /private/tmp/claude-501/-Users-brave-CreativeUGC/40c80bfc-d6a7-40fb-bd58-73632d1890fc/scratchpad/live/home.html, ar.html and es.html


## qsme

**QSME's role in a first-time group build ("Build Circle") in NZ: what the video can safely claim (fact-check, 2026-10-25)**

Sources checked: the NZ app repo `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go`, global site `/Users/brave/Dev/qsme.build`, Baqshi site `/Users/brave/baqshi.com2027`, plus `/Users/brave/CreativeUGC/research/2026-10-02-qsme-platform-truth.md`, `ventures/qsme-nz.md`, `ventures/baqshi.md` and `research/2026-10-14-procurement-routes-and-qs-roles.md`.
- NZ app: origin/main is f1b31d4b (2026-10-21). I fetched today and nothing newer exists.
- qsme.build: origin/main is a1041f4 (2026-10-14).
- Baqshi site: Build Circle is commit 6cd1c6d.

Nothing was modified.

**Bottom line:** QSME has no Build Circle, grouping or matching feature. The households are matched by people at Baqshi, through the register-interest form on baqshi.com. QSME is the tool the consultant and the circle use: site research, a priced schedule, tenders, contracts, the programme, the compliance checklist, the money record and the CCC pack. "We manage everything" is a human consultant service, not a software feature.

## 1. Safe claims (with evidence)
1. **"QSME is the build tool behind the circle: one project record, from the address to the CCC pack."**
   - Truth sheet §(a); `PRODUCT.md` on main.
2. **"Type the address and see what the site can take: the zone, overlays, services and hazards, and what the build would need."** You must say "Auckland first".
   - Zoning covers 4 councils only: Auckland, Wellington City, Christchurch and Hamilton (`backend/internal/services/site/land_service.go:206-280`).
   - Overlays, services, hazards and the verdict are Auckland only (`site/planning_service.go:23`, `site/site_info_service.go:255`).
   - Present it as what you get when you sign up. Keep it "indicative".
3. **"What this site would require: consents, approvals, reports and costs, each with the reason why."**
   - Truth sheet §2.2 (`development_analysis.go` requirementsFor). Outside Auckland the list is generic.
4. **"Rough numbers before anyone commits."** Development potential plus the feasibility calculator ("Your numbers, our arithmetic.").
   - Truth sheet §2.1 and §2.3.
5. **"One priced schedule of quantities. Tenders are cut from it, so every bidder prices the same lines, and your rates and budget are never shown."**
   - Truth sheet §3.1, §4.1, §4.3.
6. **"Bids side by side as totals, excluding and including GST, with the lowest marked."**
   - Truth sheet §5.2.
7. **"Builders, architects, engineers, project managers and quantity surveyors all have their own profile types, and a tender goes to the trades it's aimed at."**
   - Profile types: `src/components/signup-flow-guide.tsx:83-121`, `src/components/landing/cinematic/categories.ts`.
   - Licence and registration bodies (NZRAB, CPEng, NZIQS): `backend/migrations/20260530_add_trade_verification_methods.sql`.
   - Tenders reach matching trades: `backend/internal/services/opportunity_service.go:264`, `tender_store.go:50`.
8. **"The winning bid becomes a contract with milestones. Agreements are signed from a link."**
   - Truth sheet §5.3, §6.2.
9. **"One programme: built-in NZ programmes (Townhouses; Full development — land to titles) with council inspections, linked tasks and rain days."** Durations are estimates.
   - Truth sheet §7.4, §7.6, §7.8.
10. **"A compliance checklist in order: consents, council hold-point inspections, LBP Records of Work, then the CCC application (Form 6)."**
    - `backend/internal/services/schedule/checklist_templates.go:135-187`.
11. **"Trades record their certificates, and the CCC pack downloads as one zip for council."**
    - Truth sheet §11.1. NZ only, paid plan. QSME does not issue the CCC or lodge it.
12. **"Everyone in the circle sees the same numbers."** Other households can be invited as Investor ("See all financials, read-only") or Manager ("Create & run; you approve").
    - `backend/internal/services/projects/project_access.go:113-155`, `src/components/projects/ProjectInviteDialog.tsx:28-33`, `src/components/role-layout-guide.tsx:86-91`. Live since c42a457d (2026-08-03).
    - Manager seats are limited by plan (`project_invitation_service.go:195-210`). Never state seat counts.
13. **"Every dollar in and out is recorded: each household's money in, the land, consultants and contracts."** The categories include "Investor funds in", "Owner funds in", "Loan or finance drawn" and "Land purchase".
    - `src/locales/en/payments.json`.
14. **"The money goes direct to whoever did the work. QSME keeps the record, not the cash."** Milestones carry proof of work and the receiver confirms payment.
    - Truth sheet §10.1, §10.5.
15. **Project group chat with photos, files and voice notes.**
    - Truth sheet §8.5.
16. **Service claim, not a software claim:** "Our team acts as your consultant: QS and project manager. Trades and suppliers are tendered on one schedule and contracted to you, and licensed building practitioners do the restricted work."
    - `ventures/qsme-nz.md`, "Managed build service" section (owner, 2026-10-14). This matches the developer-led route in the procurement research.
    - The founder is described as a "Professional Quantity Surveyor and Software Architect" (`src/routes/about.tsx:93`).

## 2. Claims to avoid
- **Verification:** no "verified tradies", "licence-checked", "vetted network", or the home page line "Every trade. Verified."
  - 1 of 22 profiles is verified and 0 have a verified licence. The LBP register lookup only runs if the MBIE key is set (truth sheet §4.6, §5.4, §5.5).
- **"Compared line by line"** for bids. The levelling branch `origin/est/levelling` (ef1468d7, WIP 2026-09-17) is not merged.
  - The NZ home page meta (`src/routes/index.tsx:34`), `PRODUCT.md` and qsme.build all say it anyway. Don't echo them.
  - "Priced line by line" for the schedule itself is fine.
- **QSME managing the build as a software feature:** no "QSME manages it", "QSME is your project manager", "QSME hires the trades", and never "principal or main contractor".
  - The `MANAGED_ENGAGEMENT_ENABLED` switch is off by default (`backend/internal/config/config.go:488-495, 834`).
  - `docs/ENGAGEMENT_MODELS.md` says the managed model "Does not exist", and it defines managed as QSME being the principal contractor. That is the opposite of the owner's "consultant, not main contractor".
- **QSME matching people:** no "QSME matches you with your circle or neighbours", no matching algorithm, no "QSME finds you the right engineer".
  - The directory's "Post your project and we'll match you" (`src/routes/find-a-tradie_.$geo.tsx:228`) is an empty-state line, not a feature.
- **Network size:** no "hundreds of builders", no "tradies in every town", no counts at all. Of the 12 region pages, only Auckland has content.
- **Rules for any town or address.** Build Circle lists 20 places; most of them get parcel and council only, with no zone.
- **Advice and approvals:** site research is not a LIM, PIM, planning advice or "you can build X", and never say "no consent needed".
  - QSME does not book inspections, lodge consents, issue the CCC, or guarantee consent or a CCC.
  - The checklist is not complete or official.
- **Co-ownership features:** no "co-owners on QSME", no per-household share or cost split, no shared accounts or team seats.
  - A project has exactly one owner account (`projects.client_id`); everyone else is a member. Organisation teams are off (`OrgTeamsEnabled`).
- **Money:** QSME does not hold or release funds. No escrow, no payment protection, and no "paid only when the work is done" as something QSME enforces. Open banking is not confirmed as switched on.
- **Free and pricing lines:** none. The live site says "Free to start", "first project free", "no card", "own crew always free" and "bid free" (`hoarding/HeroBoard.tsx:117`, `TwoDoors.tsx`, `CostBoard.tsx`). Don't repeat any of it. Also no success fee and no plan limits.
- **Savings and equity as fact:** no "keep the developer's margin" as a number, no "10–20%", no "build at cost" figures, no equity or returns. Baqshi's margin chart is "Illustrative · not a forecast", and the legal check is pending.
- **AI:** AI does not replace the QS, planner or architect.
  - Takeoffs ("Measure lengths, areas, counts and volumes straight off the drawings") is gated per account (`takeoffs_enabled`). Confirm it's on for accounts before claiming it.
- **"Estimator" as a QSME profile type.** There isn't one; estimating is the Quantity Surveyor profile.
- **Other:**
  - No sample map data shown as real sign-ups.
  - No AI people shown as circle members or customers.
  - No testimonials.
  - No health-and-safety compliance claims.
  - Don't say "registered trademark" on camera.
- **Global videos:** no NZ-only features (site research, directories, public tenders, LBP, the CCC pack).
  - qsme.build positions QSME as "Construction management software, from pre-construction to handover" (`src/i18n/locales/en.ts:140`).
  - It says QS and PM practices run tenders "on the client's behalf" (`en.ts:224`), which fits the consultant model.
  - The global CTA is "Book a 30-minute demo at qsme.build".

## 3. Who the five roles are on QSME
| Owner's word | QSME profile type (evidence: `signup-flow-guide.tsx`) |
|---|---|
| Contractor | Builder (general_contractor / building_structure), General Contractor. A main contractor needs GC Pro to hire. |
| Architect | Architect (NZRAB licence route); also Urban Planner (resource consent) and designers |
| Engineer | Structural, Civil, Fire, Geotechnical or Mechanical Engineer (CPEng route) |
| Project manager | Project Manager (no licence) |
| Estimator | Quantity Surveyor: "Cost estimation and quantity takeoff" (NZIQS route; unlocks QS reports) |

Also on QSME: Building Inspector, Surveyor (a contact category) and Real Estate Agent. Since 2026-10-03, a "land wanted" brief can be sent as a tender aimed at agents (`backend/migrations/20261044_real_estate_agent_trade.sql`). That is plausible for finding a circle's site, but agent marketing needs the owner's legal sign-off.

## 4. "The rules needed" mapped to real QSME features
| Rule | QSME feature | Limits |
|---|---|---|
| Zoning, what the site can take | Site research: zone, "What could go here", overlays | Zone: 4 councils. Overlays and hazards: Auckland only. Indicative. Needs an account. |
| Resource consent, building consent, subdivision | "What this site would require" (Required/Likely/Possible/Check, each with a reason); checklist phase 1 (PIM, resource consent, building consent printed on site, development contributions) | Full list in Auckland, generic elsewhere. Inserting a checklist template needs a paid plan or the trial. |
| LBP restricted building work | Checklist step "Lead trades are LBPs; Records of Work collected"; LBP licence claim on profiles; Records of Work recorded as certificates | Licence checks are manual and unconfirmed. Don't say "verified". |
| Council inspections | Checklist hold points (excavations, footings, pre-slab plumbing, framing, pre-line, post-line, drainage); inspection tasks in the programmes | QSME doesn't book them. |
| CCC | Phase 3 "CCC applied for (Form 6)", PS3/PS4, the CCC pack zip | NZ only, paid. Doesn't issue the CCC or lodge it. |
| Written contracts, payment claims | Award becomes a contract with milestones; subcontract template under the Construction Contracts Act 2002; QS progress-claim report | Templates are a starting point, not legal advice. Payments are made outside QSME. |
| Site safety | QR gate sign-in, induction, daily safety check | "A record, not a lock." |
| A title for each household | "Full development — land to titles" programme (s223/224c, titles); requirements card flags cross-lease and unit title | Durations are estimates. Tenure is a clue, not a title search. |

## 5. Saying QSME in the voice-over
- **QSME NZ** (`ventures/qsme-nz.md`, `CLAUDE.md`):
  - Said "Cue Ess Me" (kyoo-ess-mee). Write it "Q-S-me" in scripts; `tools/make_vo.py` PRON maps it to "Queue Ess Mee".
  - Never "kiss me", never four spelled-out letters.
  - qsme.co.nz is "Queue Ess Mee dot Co dot N Z": "co" is the normal word, never spelled C-O and never a drawn-out "KOH". Fix only the CTA, with `tools/fix_cta.py`.
  - qsme.build is "Q-S-me dot build".
  - Voice: Kiwi, natural, one unbroken eleven_v3 take.
- **Baqshi** (`ventures/baqshi.md`):
  - QSME is "Queue Ess Mee".
  - Baqshi is written "Bakshi" for the English voice (BAHK-shee), and baqshi.com is "Bakshi dot com".
  - Voice is Chris, in EN/AR/ES. There is no Arabic or Spanish pronunciation rule for QSME yet.

## 6. Open questions for the owner (they block the script)
1. Which brand and ID: BQ02 (Baqshi) or N15 (QSME NZ)? Build Circle sign-up is on baqshi.com, so the CTA is either "Register your interest at Bakshi dot com" or "Sign up at qsme.co.nz".
2. Is Build Circle delivered as the QSME managed-build consultant service? And who is the project's owner on QSME: the consultant, a company the households form, or one household?
3. Is form delivery on baqshi.com connected? Until it is, the form falls back to opening an email draft.
4. Is Takeoffs switched on for all accounts?
5. Is "Auckland first" acceptable, given that zoning covers only 4 councils?


## legal

# NZ legal guardrails for marketing Build Circle (group self-build)

Research current to 25 Oct 2026. This is not legal advice. A NZ securities lawyer should sign off on the structure and the script before anything goes out. Legislation text was read from legislation.govt.nz (FMC Act as at 19 Sep 2026, FTA 1 Jul 2026, Building Act 8 Oct 2026, OIA 1 Oct 2026, KiwiSaver Act 1 Apr 2026, RMA 1 Oct 2026). building.govt.nz and kaingaora.govt.nz blocked my fetches, so their rules were checked against the Acts or search results instead.

## Key findings

**(a) Managed investment scheme (MIS) risk is real, and the wording of the pitch can trigger it.**
- FMC Act s 9(1) makes a scheme an MIS when three things are all true:
  - people contribute money to get interests;
  - those interests carry rights to "financial benefits" (s 9(1) defines this as "capital, earnings, or other financial returns") produced mainly by another person's efforts;
  - the holders do not have day-to-day control.
- "The margin stays with you as equity" plus "we manage everything" fits the second and third limbs almost exactly.
- The s 9(2)(a) exclusion needs each person to hold a direct, separately identifiable property interest whose value is not substantially dependent on the others' contributions. An undivided share of one site during the build probably does not meet that. This is uncertain.
- FMA guidance on forestry schemes is the closest analogy: a paid manager whose efforts investors rely on points to an MIS. Investors who run the scheme themselves and contract specialists point away from one. Pooling to share costs usually fails the s 9(2)(a) test.
- The small-scheme exclusion (Sch 1 cl 16: 5 or fewer participants, and the promoter is not in the business of promoting MISs) does not help. Baqshi forms circles as a business, and cl 17 bans advertising those offers anyway. A company or look-through company (LTC) structure creates shares (equity securities). Small offers (cl 12–13) are limited to personal offers to at most 20 investors and $2m in 12 months, with no advertising.
- Result: the video has to sell a coordination service plus owning your own home, never an interest or a return.

**(b) Financial advice.**
- Under s 431C it is financial advice to recommend or give an opinion on acquiring a "financial advice product" (financial products, consumer credit contracts such as mortgages, insurance), or to design an investment plan. Done in business, that is regulated and needs a licensed financial advice provider.
- Land itself is not a financial advice product, but an MIS unit or a company share is.
- Allowed without a licence (Sch 5 cl 7): factual information about costs and procedures, general comments about kinds of product, recommending that someone get financial advice, and passing on a licensed adviser's advice without claiming it as your own.
- Not allowed: naming the right lender or loan, telling a specific person to use their KiwiSaver, or setting out a personal plan.

**(c) Fair Trading Act.**
- The rules: s 9 (misleading conduct), s 12A (claims must be substantiated when made), s 13(g) (price), s 13(c) (falsely saying people have agreed to buy), s 14 (land: price, and what the land may lawfully be used for).
- Fines under s 40 reach $600k per offence for a company and $200k for an individual.
- The Commerce Commission says fine print cannot fix a misleading headline, and savings claims must be genuine and like-for-like. FMA guidance adds: no "safe", "guaranteed" or forecast returns; disclaimers must be prominent; warnings must be in the same language as the ad (relevant to the EN/AR/ES versions).
- "Build without capital" is false. "At cost" is misleading if the management fee is left out. "Save the developer's margin" is a comparative savings claim and needs workings in hand at the time of publishing.

**(d) Common co-ownership structures (headline only).**
- **Tenants in common plus a lawyer-drafted co-ownership agreement.** Each owner holds a defined share, and each borrower can be pursued for the whole mortgage.
- **Subdivision into separate titles or unit titles** (body corporate, shared common property). Subdivision needs resource consent under RMA s 11.
- **Company or LTC.** An LTC can have at most 5 look-through counted owners. Its shares are FMC financial products. KiwiSaver withdrawal probably cannot be used to buy them, since clause 8 needs the purchase of an estate in land (my inference).
- **Cross lease.** Settled.govt.nz calls it complicated, and changes often need the other owners' consent.

**(e) Building rules a first-timer must meet.**
- Building consent is required (Building Act s 40; fine up to $200k plus $10k a day).
- Restricted building work must be done or supervised by a Licensed Building Practitioner (s 84). It is also an offence to knowingly engage someone unlicensed (s 86).
- The owner-builder exemption (s 90B) covers only a natural person who lives in the home and does the work themselves or with unpaid friends and family. It does not fit a group build run with paid contractors.
- The owner must apply for a code compliance certificate (CCC) once work is done (s 92). The council decides within 20 working days, and the 2-year mark triggers a decision (s 93).
- Since 15 Jan 2026 a single-storey stand-alone dwelling of 70 m² or less (Sch 1A) needs no building consent. It still has to meet the Building Code and use licensed builders, so it is an edge case here.
- Zoning: land use must comply with district rules or have resource consent (RMA s 9(3)). The RMA as at 1 Oct 2026 still governs this. The Planning Act 2026 (No 70) is phasing in, and I have not verified the transition dates.
- "Architect" is a protected title (Registered Architects Act s 7, fine up to $10k). Doing work on behalf of buyers to bring about a land purchase, for reward, may be real estate agency work that needs a licence (REAA s 4, s 141). That is uncertain and depends on the facts.

**(f) Foreign buyers (Overseas Investment Act).**
- Residential land is sensitive land.
- Can buy freely: NZ citizens anywhere, ordinarily resident residence-class visa holders, and Australian or Singaporean citizens (for residential or lifestyle land).
- Need consent first: residence-class visa holders not yet ordinarily resident (to buy or build one home to live in).
- Usually cannot buy: people on temporary visas or no visa.
- Any interest counts (s 12), so a tenant-in-common share needs consent too. A company or partnership with more than 25% overseas ownership is itself an overseas person (s 7). One non-resident in a 3-member company (33%) would put the whole site under the Act.
- Buying without consent can mean a retrospective-consent penalty and a forced sale. False statements carry fines up to $300k.

**(g) KiwiSaver and grants.**
- KiwiSaver first-home withdrawal (Sch 1 cl 8):
  - 3 years of membership;
  - never held an estate in land (or assessed as a "second chance" buyer by Kāinga Ora);
  - principal residence in NZ;
  - can be used "alone or as a joint tenant or tenant in common";
  - leave $1,000;
  - one withdrawal only.
- It funds the purchase of land. Bank guidance (ASB) says it cannot fund the build on land you already own.
- The First Home Grant closed to new applications on 22 May 2024. Don't mention it.
- The First Home Loan (5% deposit) still runs. I could not confirm its current caps from Kāinga Ora directly. A September 2026 election pledge to widen it is not law.

## Never say / say instead

| Never say | Say instead | Source |
|---|---|---|
| "Invest with us", "investors", "investment opportunity" | "Build your own home with people who want to live in the same place." | https://www.legislation.govt.nz/act/public/2013/69/en/latest/#DLM4090921 |
| "Returns", "profit", "ROI", "grow your wealth" | "Your home is built at real cost, and you see every cost line." | https://www.legislation.govt.nz/act/public/2013/69/en/latest/#DLM4090921 |
| "Own the margin", "the developer's margin becomes your equity" (as a promise) | "No developer's margin in your price: you pay the real costs plus our disclosed fee. What it's worth when finished depends on the market." | https://www.fma.govt.nz/assets/Guidance/Advertising-offers-of-financial-products-guidance-note.pdf |
| "We manage everything", "sit back", "hands-off" | "Your circle makes the decisions and signs the contracts. We organise the team and the paperwork." | https://www.fma.govt.nz/assets/Licensing-guides/160519-Licensing-guide-for-MIS-managers-of-forestry-schemes-v2.pdf |
| "Pool your money with us", "join the fund/scheme/syndicate", "send us your deposit" | "Each household buys its own share of the land, in its own name, through its own lawyer." | https://www.legislation.govt.nz/act/public/2013/69/en/latest/#DLM4092418 |
| "Build without capital", "no deposit needed" | "Share the land and build costs with two or three other households, so you're not funding a whole site alone." | https://www.legislation.govt.nz/act/public/1986/121/en/latest/#DLM96903 |
| "Guaranteed", "risk-free", "safe", "can't lose" | "Every circle gets full costs and a viability check before anything is bought." | https://www.legislation.govt.nz/act/public/1986/121/en/latest/#DLM96908 |
| "Save $200k", "20% cheaper than buying" (no workings) | "Compare what the same home costs to build with what a developer charges." Use numbers only with the workings on file. | https://www.legislation.govt.nz/act/public/1986/121/en/latest/#DLM6156605 |
| "At cost" with no fee mentioned | "At cost: land, design, consents and build at what they really cost, plus our management fee." | https://www.comcom.govt.nz/fair-trading/fair-trading-act-fact-sheets/fine-print |
| "We'll get you the best mortgage", "use your KiwiSaver for this" | "Talk to a licensed financial adviser about finance. We'll give them your full costs." | https://www.legislation.govt.nz/act/public/2013/69/en/latest/#LMS465785 |
| "KiwiSaver pays for your build" | "If you're eligible, a KiwiSaver first-home withdrawal can go toward buying your share of the land." | https://www.legislation.govt.nz/act/public/2006/40/en/latest/#DLM379497 |
| "Plus the First Home Grant" | Leave it out (closed 22 May 2024). | https://www.beehive.govt.nz/release/first-home-grant-closure-exemptions |
| "Anyone, anywhere can buy into a NZ circle" | "NZ circles are for eligible buyers. Outside NZ? Register for circles where you live." | https://www.linz.govt.nz/guidance/overseas-investment/buying-residential-property-live |
| "Skip the red tape", "no consents" | "Every home goes through building consent, licensed builders and a code compliance certificate. We help you line them up." | https://www.legislation.govt.nz/act/public/2004/72/en/latest/#DLM306376 |
| "4 homes on this section" (zoning unchecked) | "What you can build depends on the zone and any resource consent." | https://www.legislation.govt.nz/act/public/1991/69/en/latest/#DLM231918 |
| "Our architect" (for someone not registered) | "Registered architect" only if NZRAB-registered. Otherwise "designer". | https://www.legislation.govt.nz/act/public/2005/38/en/latest/#DLM344001 |
| "We find and buy the land for you" | "We help your circle shortlist sites. Your lawyer handles the purchase." | https://www.legislation.govt.nz/act/public/2008/66/en/latest/#DLM1151928 |
| Sample-data counts or "joining now" feeds shown as real; AI "I saved $150k" testimonials | Real, current numbers only, labelled "illustrative" on screen. No testimonials from people who aren't real. | https://www.legislation.govt.nz/act/public/1986/121/en/latest/#DLM96908 |

## On-screen disclaimers

1. "Not an investment offer. No returns promised. You own your home directly."
2. "Illustrative, not a forecast. Costs, finance and value depend on each site."
3. "Get independent legal and financial advice. Overseas buyer rules apply."

Each one should be prominent, held long enough to read, and in the video's own language (FMA: warnings must be in the same language as the ad).

## Uncertain or open
- Whether a tenants-in-common circle with a paid coordinator is an MIS turns on facts: who controls day-to-day, who the circle can sue, and how fees are structured. No FMA guidance is specific to property group builds; the forestry guide is an analogy.
- Whether shortlisting sites counts as real estate agency work depends on the facts.
- The Planning Act 2026 transition dates are not verified. Sources conflict on the start date, but RMA ss 9 and 11 are still in force as at 1 Oct 2026.
- New engineer registration regime: I couldn't confirm 2026 status. Use "CPEng" only for engineers who actually hold it.
- First Home Loan caps are not verified from an official source.
- Selling a finished home inside 2 years may trigger tax under the bright-line rule (https://www.ird.govt.nz/property/buying-and-selling/when-you-need-to-pay/the-brightline-test). Recommend tax advice.
- The current baqshi.com Build Circle English copy (src/i18n/en/buildCircle.ts) already uses risky lines: "margin… stays with you as equity", the step named "Own the margin", and a chart segment labelled "Your equity". The site also shows a sample-data "Joining now" feed. Flag these for the same legal review.

Working copies of the legislation and guidance text are in /private/tmp/claude-501/-Users-brave-CreativeUGC/40c80bfc-d6a7-40fb-bd58-73632d1890fc/scratchpad/web/ and /private/tmp/claude-501/-Users-brave-CreativeUGC/40c80bfc-d6a7-40fb-bd58-73632d1890fc/scratchpad/pdf/.


## audience

# Build Circle research: NZ first-home buyers and first-time developers (as of 2026-10-25)

**Limits on the sources.** Reddit refuses every route I tried: WebFetch, curl (403) and search filtered to the domain. Meta Ad Library also returns 403 and needs a login. So there are no verbatim Reddit quotes and no live ad pulls. The buyer voice below comes from news coverage of named buyers and from surveys. Quoting limits also cap me at one verbatim quote, so every other buyer line is a paraphrase with its source. I changed no files.

## 0. The market has changed since 2021. Don't open on doom.
- First-home buyers are now the most active buyer group, for the first time since Cotality's records began in 2005. They are 29% of the national market, 31% in Auckland and 37% in Wellington. Prices are 18.2% below the 2022 peak and listings are up 45% on three years ago. Buyers used $1.8bn of KiwiSaver for first homes in 2025. https://thespinoff.co.nz/business/09-09-2026/first-home-buyers-have-taken-over-the-housing-market
- From the Cotality–Westpac report (May 2026):
  - First-home buyers made 27.5% of purchases in Q1 2026. The record is 28.2%, set in Q4 2025.
  - Their median price so far in 2026 is $720k, against a $740k peak in Q1 2022.
  - About 77% of what they buy is standalone. Average age is about 35.
  - More than half of their loans have less than a 20% deposit, and the average loan-to-value ratio is 81%.
  - https://assets.dam.westpac.co.nz/is/content/wnzl/dist/all-of-bank/economic-reports/economic-data/Economic-Data_080526-Cotality-Westpac-NZ-First-Home-Buyer-Report_bulletin_08May26.pdf
- Auckland and Christchurch are "awash" with townhouses. Some sit unsold long enough to lose new-build status, and townhouse values fell faster than standalone (-1.7% vs -0.7%). https://thespinoff.co.nz/politics/26-02-2026/the-great-townhouse-slowdown
- The government help has closed:
  - First Home Grant scrapped 22 May 2024: https://www.newstalkzb.co.nz/news/politics/government-scraps-home-grants-but-funds-more-places-for-chps-no-new-funding-for-kāinga-ora
  - Progressive Home Ownership Fund closed 30 June 2024: https://www.hud.govt.nz/our-work/progressive-home-ownership-fund
- The election is on 7 Nov 2026 and housing is a live party issue:
  - NZ First is reconsidering Crown co-ownership: https://www.mpamag.com/nz/specialty/residential/nz-first-reconsiders-crown-co-ownership-idea-for-first-home-buyers/583204
  - National wants to lift the First Home Loan income cap to $300k: https://www.national.org.nz/news/260906-backs-first-home-buyers
  - Stay out of politics, and don't name KiwiBuild in a hook.

**What this means:** a "you'll never afford a house" hook will feel dated, and people who are buying now will pile into the comments. The pain that is current: the deposit is still hard, you need family help, people don't trust new builds, and you end up buying what a developer chose to build rather than what you want.

## 1. Five "that's literally me" moments

**1. The deposit target keeps moving.**
- For an average two-income household saving 25% of income, a 20% deposit took 5 years 7 months in 2016. By 2020 it took 9 years 8 months, and almost 14 years in Auckland. The Spinoff called it a joke and close to impossible. https://thespinoff.co.nz/business/10-04-2021/the-laughable-quest-of-saving-a-first-home-deposit-in-2021
- 72% of non-homeowners say buying is beyond their reach, and 84% of savers have cut back their lifestyle. https://www.mpamag.com/nz/news/general/most-kiwis-say-homeownership-is-out-of-reach-report/545632
- 63% of non-homeowners feel locked out, rising to 70% of millennials (Kiwibank / Talbot Mills, n=2,008, Nov 2024). https://kiwibank.co.nz/about-us/news-and-updates/media-releases/state-of-home-ownership-report-reveals-new-pathways-to-homeownership-needed

**2. Everyone who bought had help from mum and dad.**
- 48% of first-home buyers expect family help, and 70% say losing it would delay them (OneChoice, May 2026, 500+ people aged 18–39; a vendor survey). https://www.onechoice.co.nz/news-vault/kiwi-housing-trends-report-2026
- 14% of families have helped a child buy, with an average of $108k (Consumer NZ). https://consumer.org.nz/money/personal-finance/the-bank-of-mum-and-dad-is-the-fifth-biggest-owner-occupier-lender-in-new-zealand
- In Queenstown, buyers rely on family money or take in flatmates to qualify for a loan. https://crux.org.nz/crux-news/worst-time-for-first-home-buyers-in-65-years

**3. The new-townhouse open home: "who built this, and will it leak?"**
- From the same OneChoice 2026 survey:
  - 66% worry about new-build quality.
  - 53% have had a problem with a new build, or know someone who has.
  - 57% are less likely to consider a new build.
  - 88% want developers held more accountable.
- OneRoof's "new build cowboys" story revived the leaky-homes fear. https://www.oneroof.co.nz/news/new-build-cowboys-is-auckland-walking-into-another-leaky-homes-disaster-40326
- What buyers actually choose is standalone (77%), while developers built townhouses (see section 0).

**4. "Developing is for rich guys. I could never."**
- OneRoof framed the new-build boom as funded by wealthy private backers. https://www.oneroof.co.nz/news/there-are-heaps-of-rich-guys-whos-funding-new-zealands-new-build-boom-40360
- Cohaus's two lead families said the project needed real financial know-how and professional skill. https://aucklanddesignmanual.co.nz/content/dam/adm/adm-website/case-studies/terraces/Cohaus%20Version%201.pdf
- Development profit is taxable and can make your later property sales taxable too. https://www.productivity.govt.nz/assets/Submission-Documents/01ce34b3b0/Sub-014-Peter-McDermott.pdf
- Back in 2018, a valuer warned that an "I'll never afford it" mindset becomes self-fulfilling. https://www.oneroof.co.nz/news/first-home-buyers-psyching-themselves-out-of-the-market-35697

**5. The mates' "let's just buy a section together" chat that dies at "who do we even call?"**
- Consumer NZ reports hearing of groups of friends buying houses together. https://newstalkzb.co.nz/news/business/the-realities-of-buying-a-home-with-your-friends-the-prosperity-project
- 44% find co-ownership appealing (Kiwibank 2024, link above).
- In Australia, joint loans between friends or family rose more than 33% in the year to July 2025. https://www.nab.com.au/news/housing/siblings-share-keys-to-first-home-as-co-buying-rises
- The most common cause of co-owner disputes is people wanting different timelines. https://www.become.nz/articles/buying-a-house-with-friends

**A dated sixth: losing at auction.** Gareth Thorne in the Bay of Plenty, 2021: "well we've got absolutely no hope, how can we compete?" https://crux.org.nz/national-news/first-home-buyers-struggling-how-can-we-compete/ It still resonates as a memory, but it doesn't describe the 2026 market.

## 2. Their words, and words they distrust

**Words they use:**
- deposit, KiwiSaver, "get on the (property) ladder", "bank of mum and dad"
- locked out / priced out, First Home Loan, 5% deposit, pre-approval
- section, standalone, townhouse, CCC, "the Kiwi dream"
- "dead money" (for rent), flatmates, sweat equity

Sources for these: Kiwibank and OneChoice above; Hamilton agents saying FOMO is back and the sweat-equity houses are gone (https://www.oneroof.co.nz/news/sold-in-three-days-first-home-buyers-fighting-it-out-for-hamiltons-cheapest-houses-44780); and the rent-vs-buy debate (https://steady.nz/first-home-guides).

**Words they distrust, and why:**

| Word or phrase | Why it puts people off | Source |
|---|---|---|
| Rent-to-own | The Commerce Commission warned buyers to get legal advice, and police warned of a rent-to-own con | https://comcom.govt.nz/news-and-media/media-releases/archive/rent-to-buy-schemes-commission-urges-independent-legal-advice ; https://www.goodreturns.co.nz/article/976508544/scam-warning-over-rent-to-own-homes.html |
| Pooled fund, wholesale investor, syndicate, investment opportunity | Du Val went into receivership with investors owed $41m and tradies left unpaid | https://www.1news.co.nz/2024/09/27/investors-in-failed-property-empire-du-val-owed-41-million ; https://www.1news.co.nz/2024/08/12/du-val-receivership-tradies-cleaners-left-out-of-pocket |
| Off the plan, paying a deposit to a builder | Podular took about $2m in deposits. Reed Myers spent buyers' deposits on a 99-townhouse project. NZ had 551 fewer construction firms at the end of 2025 | https://www.newstalkzb.co.nz/news/national/podular-collapse-leaves-up-to-60-home-buyers-at-risk-of-losing-cash-and-life-savings ; https://www.newstalkzb.co.nz/news/national/reed-myers-liquidation-home-buyers-fear-for-175-000-deposit-on-auckland-townhouse ; https://www.1news.co.nz/2026/07/12/inside-new-zealands-shrinking-building-and-construction-industry/ |
| "New build" | See the quality worries in moment 3 | OneChoice, above |
| "Tinder for property" style gimmicks | See Miuwi in section 3 | — |
| "Affordable" | Carries KiwiBuild baggage | See section 3 |

"Free" is already banned by the house rules.

**My recommendation:** the site's words "margin" and "equity" are finance jargon. In voiceover, "the developer's cut" and "at cost" will land better. Block Party described its own model in exactly those terms.

## 3. Precedents and lessons

**NZ group builds**
- **Block Party, Wellington.**
  - Two couples and two singles built four terraces at cost, with a shared common room.
  - It took more than five years. Getting the loan took about 18 months, because lending rules don't fit group builds.
  - It won the 2023 Wellington Architecture Award.
  - The architect (Spacecraft) said that with no developer margin, the leftover money went into the homes.
  - Sources: https://architectureanddesign.com.au/news/when-6-friends-beat-the-runaway-housing-market ; https://architecturenow.co.nz/articles/gib-interior-spaces-block-party/ ; https://architectureau.com/articles/spacecraft-architects/ . The first page didn't load fully, so these details come from the search index.
- **Cohaus, Grey Lynn, Auckland.**
  - 20 households acted as their own developer. Land cost $4.95m and the project finished in 2021. A two-bedroom unit came out at about $810k.
  - The group went on to buy a site for 30–35 more homes.
  - The lesson: it needs a professional to drive it.
  - Sources: Auckland Design Manual PDF above; https://www.oneroof.co.nz/news/familys-grey-lynn-villas-sell-for-over-9m-they-all-jumped-on-this-pretty-fast-47674
- **Urban Habitat Collective, Wellington (failed).**
  - 25 families each put in 30% of their projected cost and became shareholders.
  - After consent, build costs almost doubled in 18 months, and the group sold the site.
  - The founder's lessons: it is hard to form a group without a site, and design-versus-budget is what kills these projects.
  - https://thespinoff.co.nz/wellington/02-05-2024/my-co-housing-project-failed-but-i-still-think-its-a-great-idea
- **Toiora, Dunedin.** Passive-house cohousing with a steep learning curve; the council bought two units as social housing. https://www.odt.co.nz/news/dunedin/dcc/dcc-buy-cohousing-project . A search summary also mentioned a bank asking for a 7.5% site contingency instead of the 5% it had advised. I couldn't confirm that (the source returned a 502), so don't use it.
- **VIVA, Christchurch.** 300–400 members and still at the site-buying stage: a big interest pool turns into homes slowly. https://cohousing.org.nz/communities ; https://cohousing.org.nz/node/773

**State schemes**
- **KiwiBuild.** The 100,000-home target was dropped in 2019, partly because homes were contracted where there was little first-home buyer demand. Unsold homes went to the open market. https://www.1news.co.nz/2019/09/04/kiwibuild-reset-sees-100000-house-target-scrapped-5-deposits-for-first-home-buyers-introduced
  - Lesson: start from demand. Build Circle's register-interest-first map is the opposite approach.
- **Kāinga Ora First Home Partner.** The state bought up to 25% or $200k of a home, and buyers needed a 5% deposit. Applications jumped 450% after the rules widened in Aug 2023. It filled up and stopped taking applications in Oct 2023, after about $194m was used. https://newshub.co.nz/home/money/2023/10/k-inga-ora-first-home-partner-scheme-stops-taking-applications-amid-surge-in-first-home-buyers.html
  - Lesson: demand for help with the deposit gap is huge, and the state route is now closed.

**Private co-buying in NZ**
- **Kiwibank Co-own (May 2022).** Pitched as co-buying for people who aren't in a couple. https://kiwibank.co.nz/about-us/news-and-updates/media-releases/kiwibank-launches-co-own-to-enable-more-kiwi-with-homeownership-dreams . In 2026 Kiwibank started reviewing the product; younger buyers, Māori and Pasifika are the most open to co-owning. https://businessdesk.co.nz/article/finance/kiwibank-eyes-co-ownership-policy
- **Miuwi (2017–19).** Called itself the "Tinder of property investing" and ran speed-dating nights in Ponsonby and Wellington. People registered from 23 towns with $4.7m in deposits between them. Its current status is unknown. https://www.oneroof.co.nz/news/tinder-for-property-swipe-right-to-buy-a-home-35648 ; https://m.mpamag.com/nz/news/general/start-up-connects-first-time-homebuyers-with-speed-dating-night/306983
  - Lesson: matching alone doesn't build anything. The difference to sell is the managed build.
- **YouOwn with BNZ, and Levridge (2019).** Investors topping up buyers' deposits; current status not confirmed. https://www.scoop.co.nz/stories/BU1904/S00297/bnz-teams-up-with-youown-to-launch-shared-ownership-option.htm ; https://www.scoop.co.nz/stories/BU1911/S00089/new-house-buying-platform.htm
- **Propopoly (2026).** Sells investors tokenised stakes in developments; it has an $8.9m Auckland site. It's investor-led, but it shares the "development" language. https://www.scoop.co.nz/stories/BU2603/S00122/world-first-property-development-model-to-launch-in-nz-following-fma-guidance.htm

**Overseas**
- **Nightingale, Australia.**
  - Homes are sold at cost with profit capped at 15%, against the usual 20% target.
  - Buyers must live in the home, and resale is capped.
  - Demand ran to 800 on the waitlist for 44 apartments, so places go by ballot.
  - https://architectureau.com/articles/affordable-sustainable-high-quality-urban-housing-its-not-an-impossible-dream/ ; https://renew.org.au/?p=8410
- **Kohab, Australia (2018).** A co-buying marketplace with NAB's co-borrower loan. Critics called it more marketing than an affordability fix. https://moneymag.com.au/kohab-property-co-ownership
- **Co-operty, Australia (2023).** An app for tenants-in-common agreements. https://brokernews.com.au/news/breaking-news/cooperty-releases-coownership-app-for-property-market-284481.aspx
- **German Baugruppen (group builds).** Savings are estimated at 15–30%, but members need a big upfront stake. https://architectureau.com/articles/learning-from-berlin-lessons-for-emerging-collective-housing/ ; https://www.theurbanist.org/baugruppen-to-form-a-more-affordable-urbanism/

**The lessons that recur:**
1. Finance is the bottleneck.
2. Cost blow-outs between consent and build kill projects.
3. You need a professional driver, not a committee.
4. Get the exit and timeline rules agreed first.
5. Lead with how the money is protected.

The site already has the trust line for the last point: "nothing is bought, built or charged until everyone has seen the full costs" (git: src/i18n/en/buildCircle.ts in the baqshi.com repo).

## 4. Developer margin (background only, not for on-screen use)
- A broker said in 2021 that a fully presold 10-townhouse project should make at least 20%. https://www.scoop.co.nz/stories/BU2103/S00338.htm
- A commercial feasibility guide says projects are viable above a 15–20% margin on end value, and banks mostly won't fund below 10%. https://www.calculate.co.nz/property-development-feasibility-calculator.php
- One Auckland project's margin fell to 8% after cost rises. https://www.squirrel.co.nz/blog/odds-and-ends-miscellaneous/house-prices-and-poor-productivity/
- Nightingale's sources put the usual developer target at 20% (links above).
- In 2026, high land costs limit what stacks up, and Auckland has a lot of unsold stock. https://www.bayleys.co.nz/news/new-build-townhouse-report-2026

I found no Productivity Commission, NZIER or MBIE figure. The takeaway: margins are thin in 2026, so "you keep the developer's cut" needs care. "You build what you want, at cost, on an open book" is safer.

## 5. Short-form content: what works
- TikTok's own research: over 63% of its highest click-through videos show the key message in the first 3 seconds. https://ads.tiktok.com/business/en-US/blog/9-creative-tips-to-drive-auction-ad-performance
- **Price first.** "What $X gets you in [place]" is a staple format. For NZ, the $720k first-home median is a natural number to use. https://agentfire.com/?p=133822 ; https://blitzcutai.com/blog/real-estate-reel-hooks-2026
- **Blunt, funny honesty** from agents is winning first-time buyers. https://brp-prod-bcc.bloomberg.com/news/articles/2024-03-26/tiktok-realtors-viral-videos-win-first-time-homebuyers
- **"Come with me."** A Kiwi creator went viral by asking viewers to come along as she spent over $1m on her first home. https://www.oneroof.co.nz/news/boss-babe-wins-tv-star-celebrates-buying-her-first-home-43938
- **Build diaries.** Two 19-year-olds in Victoria went viral as @0dollarbuild. https://bedthreads.co.nz/blogs/journal/zero-dollar-build-tiktok-interview
- **Friends building together** spreads well: Bestie Row (https://hillcountryalliance.org/tiny-house-compound-in-texas-goes-viral-as-bestie-row/) and five friends in Austin (https://www.apartmenttherapy.com/friends-bought-house-together-37074385).
- **Plain-English explainers.** A Hobart broker's first-home TikToks earned a TikTok award nomination. https://pulsetasmania.com.au/news/first-home-buyer-content-takes-hobart-broker-to-the-tiktok-awards
- In Australian TikTok data, first-home content leans strategic and investment-minded, and most viewers are 18–34. https://www.raywhite.com/news-and-market-insights/economic-updates/what-first-home-buyers-really-want-tiktok-data-reveals-strategic-approach-to-property
- **Who else is in the space:** Kiwibank's "On the Ladder" series (2024): https://www.kiwibank.co.nz/about-us/news-and-updates/media-releases/warner-bros-discovery-and-kiwibank-create-new-series/ ; Opes Partners' Property Academy: https://opespartners.co.nz/shows/the-great-kiwi-property-debate-can-first-home-buyers-still-break-through-ep-1392
- **Competitor hooks,** taken from their own copy and press because Ad Library is blocked:
  - Kiwibank: co-buying for people not in a couple.
  - Miuwi: a dating service for home buyers.
  - Kohab: "world's first" co-ownership platform.
- **To do by hand:** check Ad Library (NZ and AU) for "co-own", "buy with friends", "first home", "build together" and "shared ownership".

## 6. Five hook ideas
1. **Flip who's the developer** (a question with no quick answer, for moment 4): "What if, on your first home, you were the developer?" Then: at cost, open book, we organise it. Avoid the word "margin".
2. **The group chat** (funniest line first, for moment 5): open on a chat saying "we should all just buy land together 😂", left on read. VO: every Kiwi group chat has had this one; here's the next step. The joke is on the situation, not the viewer.
3. **Assemble the crew** (roll call): "Your first build needs five people you've never met." Contractor, architect, engineer, project manager and estimator drop in like a heist crew. This is the owner's list, and it ties to the QSME tools.
4. **Sum in two seconds**: "Three deposits. One section. Three homes." Three KiwiSaver bars merge into one site. Label it illustrative; promise no prices or outcomes.
5. **Fear first, then the rule** (moment 3 plus the builder collapses): name the fear of a builder going bust with your deposit, then the site's rule that nothing is bought, built or charged until everyone has seen the full costs. A spare: "Most homes get built, then someone hunts for buyers. We start with the buyers." Use it without naming KiwiBuild.

**Constraints for whoever picks this up:**
- The Build Circle map is sample data, so on-screen use must be labelled illustrative.
- The CTA is undecided: Build Circle lives at baqshi.com/#build-circle, but the house rule says "Sign up at qsme.co.nz".


## internal

**CreativeUGC: what we already know before the Build Circle / first-time developers video (read-only pass, 2026-10-25)**

Today's orchestrator run has already made the idea card `/Users/brave/CreativeUGC/ideas/baqshi/build-circle-first-time-developers.md` (status "pitching", vid "❓ BQ02 if Baqshi, N15 if QSME NZ"), an INBOX row and `/Users/brave/CreativeUGC/log/2026-10-25.md`. They are not committed yet. Update that card rather than making a new one.

## (1) Standing rules that apply

**Process (CLAUDE.md)**
- Pitch hooks and a one-paragraph concept, and get a yes before writing the script or making any paid call.
- One project folder per video: `projects/YYYY-MM-DD-<venture>-<slug>/`.
- Every video ships with `vo-script.json` and `vo-script.md`.
- The video ID goes in the `post.md` frontmatter and `projects/ids.json`, and shows on videos.html and the Studio.
- Show rendered previews and name the editable master (HTML) before calling it done.
- Save as you go, then publish and back up.
- The CLAUDE.md "ElevenLabs FREE plan" note is out of date. The log says the account moved to Creator on 2026-10-02, and BQ01 was voiced on eleven_v3.

**Audio-first standard (applies to every video)**
- A real spoken hook in the first 2 s, then continuous speech with no silence over 1 s. Captions are phrases lifted from the narration.
- ONE unbroken eleven_v3 take with timestamps. Never sliced, never generated line by line.
- The picture is re-timed to the words.
- Rejected for good: deadpan or low-energy reads, gaps between lines, caption-fragment scripts, letter or alphabet gimmicks.
- If only the CTA line is wrong in a finished take, fix just that line (`tools/fix_cta.py`) instead of redoing the whole take.

**Baqshi (BQ series)**
- Voice: English is Chris (`iP95p4xoKVk53GoZ742B`, American, the owner's pick). Spanish is Juan Carlos (`YExhVa4bZONzeingloMX`, neutral Latin American, "tú"). Arabic is Omar (`xvhpbk8otnNHtT3fjCpr`, Modern Standard Arabic, plural address). Omar reads about 1.6 words/s, so BQ01 used `tools/tempo` at ×1.10. Abdullah was dropped because he said "investment fund" where the script said "trust".
- Languages: every Baqshi film is made in English, Arabic and Spanish, with the same picture and each version timed to its own take (cue-marked scripts and `tools/cue_take.py`). Arabic is right to left, but the logo lockup and map geography never mirror. Translations go through a native fluency review and a back-translation check.
- Music: bed G, the 60s spy-mission theme (`/Users/brave/CreativeUGC/projects/2026-10-20-baqshi-expand/music/bed-G-mission-spy.mp3`), fitted to length with `tools/bedfit.py`. BQ01 levels: voice normalised with `voicenorm.py` to −16.5 dBFS and muxed at 1.0; bed at 0.32, ducked to 0.12 (`motion/mix.sh`). This does not match CLAUDE.md's general "voice 1.15, bed 0.09 ducked to 0.03". The owner approved BQ01 as it is.
- Saying it (English): Baqshi is written "Bakshi" (said BAHK-shee); baqshi.com is "Bakshi dot com"; QSME is "Queue Ess Mee".
- Saying it (Spanish): "Bakshi", "Bakshi punto com", "Kiu-Es-Mi", "escrou".
- Saying it (Arabic): بَقْشي, بَقْشي دوت كوم, كيو إس مِي (spell maps in `projects/2026-10-20-baqshi-expand/script/spell-*.json`).
- CTA (default): "Tell us where you're from, and where you want to own. Contact us at baqshi.com." End card adds "We reply from New Zealand." The site's own CTA for this feature is "Register your interest".
- Humour: not set for Baqshi; the default is none in brand films.
- Look: the Orbital design. #05070d space background, a 56px grid, signal blue #4fb8ff for the origin, orbit violet #a98bff for destinations only (routes run blue to violet), Geist type.
- Visuals to avoid: skyline photos, three service cards, Web3 blobs, cubes, coins, wallet buttons.
- **Baqshi never says:**
  - BitRegalo or "Petrigallo", test networks, audits or any protocol status. The payment side is only "held in escrow": a payment goes to the person it's for or back to whoever paid, and each deal's escrow agreement sets out how.
  - That the escrow is decentralised, on-chain, guaranteed or risk-free.
  - Any token, coin, crypto, stablecoin or wallet.
  - That QSME holds money or runs escrow, or that Baqshi holds or controls client funds.
  - "No single party can move the funds", or "nobody carries money across a border".
  - Named lawyers, notaries, banks, agencies or developers, or anyone as an "official", "certified" or "accredited" partner. Developers are never called "partners".
  - Legal, tax, financial or investment advice, or anything guaranteed: eligibility, approvals, timelines, visas, returns or margins.
  - New Zealand as "the safest place".
  - **Any number except 90+.** That rules out the site's 94 countries, 91 private countries, the sample counts and the circle size of 24.
  - Testimonials or client stories, or AI people shown as clients.
  - Illustrative map activity shown as real.
  - "No account, no wallet" (this was cut from BQ01).
- Things that must stay on screen: "Illustrative · not a forecast" on any margin chart, "Illustrative interest · sample data" on the map, and "Not legal, tax or financial advice".
- `ventures/baqshi.md` "Do not claim" still says "Always say: test networks only…". That line is out of date: the owner's 2026-10-20 rule (never mention it) overrides it.

**QSME NZ (N series)**
- Voice: Cam S (`53CG2aO2HU48thT3QnMl`) is the default, on a clean background with no bed. John (`jOEnNSVLOHUgmrNwfqQE`, "kiwi-accent") was the owner's pick for N14 when he wanted a clearly NZ voice. Delivery should be a natural Kiwi read, never American hype or corporate.
- CTA: "Sign up at qsme.co.nz", spoken "Sign up at Queue Ess Mee dot Co dot N Z". "Co" is the normal word: never spelled C-O and never a drawn-out "KOH" (2026-10-10). The venture file's "said like KO" line is out of date.
- QSME is written "Q-S-me" in scripts; never "kiss me" and never four spelled-out letters.
- The Global CTA, if one is ever needed: "Book a 30-minute demo at qsme.build".
- **QSME NZ never says:**
  - "free", "free to join", "free check", "no sign-up", "no login", "without an account", "no listing fee", "always free", "bid free", "no fees", success-fee details, or any other generous pricing line. The only exception was N14.
  - "Verified tradies". Only the N14 flow (LBP "Pending review", then "Licensed") is allowed.
  - "Compared line by line". Bids are compared as totals with a "Lowest" tag.
  - "Beta" for takeoffs.
  - That QSME holds money or has escrow, or that a QSME-managed build is a software feature (truth sheet §10.5). The managed build is a service, sold on print only.
  - Site research beyond its real coverage: zoning in 4 councils; overlays, verdict and "would require" in Auckland only.
  - Removed features (such as Book a tradie), LBP lists or rankings, "first NZ platform", or mocking tradies.

**ID rules (CLAUDE.md, ventures/baqshi.md)**
- **Next free Baqshi ID: BQ02.** **Next free QSME NZ ID: N15.** `projects/ids.json` stops at BQ01 and N14; G15, B02 and C02 are taken.
- Baqshi language cuts are written `BQ02·en·16:9`, `BQ02·ar·9:16`, and so on.
- QSME cuts are written `N15·9:16`; voiced is `N15·9:16·vo`.

## (2) What worked and what flopped
`learnings.md` has no rows, so nothing has been posted with measured results. Everything below is the owner's verdict.

**Worked**
- **N01 "Which Dave?" audio-first pilot.** Owner: "This is what I mean by a voiceover… keep it like this." Continuous speech, a hook in the first 2 s, one Cam S take, the picture following the words.
- **BQ01 (on baqshi.com since 2026-10-21).**
  - The problem-angle hook ("Five strangers. Two countries. One property.") beat the journey angle.
  - Clean Orbital diagrams, mechanism first, with no people.
  - Chris's voice and bed G.
  - One template producing three languages.
- **N14 v2 "Which door is yours?"** Each viewer finds their own route by role, after v1 made main contractors look like service providers.
- The N11 design, which the owner said he likes.

**Flopped**
- **First voiced reel:** voice too soft, music too loud, audible cuts between per-line takes, lines too short.
- **Next take:** no energy, and the "QS Alphabet" letters were confusing ("what are these for?"). G13 was killed.
- **Scripts:** no real hooks, built from caption fragments.
- **CTA pronunciation:** the owner was angry at both a spelled "C-O" and a drawn-out "KOH". Redoing whole takes was called a waste.
- **BQ01 v1:** the BitRegalo name and the test-network line were rejected.
- **BQ01 music:** the owner rejected ambient, symphonic with oud, jazz with oud, vintage ballads and an oboe theme before picking G.
- **N14 v1:** wrong segmentation (see above).
- **N11:** a CSS desk read as clip art.
- **G15:** the "Beta" label was removed.
- **Print brochures:** the owner was afraid the PNGs were the deliverable. Always name the master file.

**BQ01 QA lessons to reuse**
- Use numbers, not ticks, on qualify checklists. A tick reads as "yes, you can".
- Never break a line inside a clause (BQ01 had "not / independently audited"): keep clauses whole with non-breaking spaces.
- Illustrative tags need at least 28px in 9:16.
- Routes must finish drawing before the cut.
- The end card must not be silent.
- Watch the Arabic mix level (it clipped once), and handle label collisions in the Spanish layout.

**Length maths**
- In BQ01 Chris read 261 words in about 97 s (2.7 words/s), so 45–60 s is about 120–160 English words.
- Spanish runs about 14% longer. Arabic runs about 52% longer before tempo and about 38% after ×1.10, so a 55 s English cut becomes about 75 s in Arabic.

## (3) Existing cards that overlap
- `/Users/brave/CreativeUGC/ideas/baqshi/build-circle-first-time-developers.md`: this video's own card (pitching).
- `/Users/brave/CreativeUGC/ideas/baqshi/five-strangers-one-consultant.md` (BQ01): its "N strangers to one consultant" hook and payoff. Reusing the five-node tangle with the five roles would echo it closely.
- `/Users/brave/CreativeUGC/ideas/qsme-nz/granny-flat-for-mum.md` (N05, delivered): granny-flat rules through site research (the cross-lease catch).
- `/Users/brave/CreativeUGC/ideas/qsme-nz/print-brochures-2026-10.md`: the managed granny-flat and portable-home service, "your consultant, not the main contractor". This is the closest business-model overlap.
- `/Users/brave/CreativeUGC/ideas/qsme-nz/section-to-shovel.md` (bench): "first-time developers don't know what they don't know", and "when to call a professional".
- `/Users/brave/CreativeUGC/ideas/qsme-nz/section-to-ccc.md` (bench): four townhouses run by a first-time developer.
- `/Users/brave/CreativeUGC/ideas/qsme-nz/walk-away-number.md` (N06) and `/Users/brave/CreativeUGC/ideas/qsme-nz/auction-eve.md` (bench, merged into N06): a first-time developer working out margin and land price.
- `/Users/brave/CreativeUGC/ideas/qsme-nz/address-to-site-report.md` (N07): a first-time developer with three sections.
- `/Users/brave/CreativeUGC/ideas/qsme-nz/room-for-3-stca.md` (bench): couples section-hunting, "room for 3".
- `/Users/brave/CreativeUGC/ideas/qsme-nz/back-corner.md` (N03) and `/Users/brave/CreativeUGC/ideas/qsme-nz/the-back-corner.md` (bench): first-home buyers at an open home.
- `/Users/brave/CreativeUGC/ideas/qsme-nz/facebook-group.md` (N01): finding "the right builder" through Facebook groups.

None of these covers pooling households to build together, so Build Circle is new ground. The overlaps are the rules angle (N05) and finding the right builder (N01).

## (4) Reuse from BQ01 (`/Users/brave/CreativeUGC/projects/2026-10-20-baqshi-expand/motion/`)

**Reuse as it is**
- The pipeline: `baqshi.tpl.html` → `build.py` (strings per language, cues, 16:9 and 9:16, right-to-left, no-break phrases), `tools/cue_take.py`, `voicenorm.py`, `bedfit.py`, `mix.sh` and `tools/motion/kit.js`.
- `parts.css`: brand tokens, grid, headings, captions, labels, "Illustrative" tags, glass panels, the button, the lockup that never mirrors, map and pin styles.
- Assets: `baqshi-mark.svg`, the Geist fonts, `land-2048.png`.

**Scenes to adapt**
- **S1 tangle** (five dashed nodes, money node in red): relabel to contractor, architect, engineer, project manager and estimator.
- **S3 lockup** with a "who" caption.
- **S4 route** (You → Baqshi box → Property, with chips below): households → Baqshi → home, with the five role chips.
- **Progress rail** of four chips: the site's Register · Form a circle · Build at cost · Own the margin.
- **S6 numbered panel and stamp:** "the rules for your site", with a stamp reading "Nothing is bought, built or charged until everyone has seen the full costs" (site wording).
- **S7 feasibility bars:** the site's "Where the margin goes", buying from a developer versus building as a circle, tagged "Illustrative · not a forecast", with no figures.
- **S8 QSME table** (example lines flowing to whoever did the work): "every cost line quantity-surveyed".
- **S9 ring and person glyph:** the starting point for the circle.
- **S10 held-payment diagram:** optional, Baqshi only.
- **S12 fields:** "Where · What home · When", matching the register form.
- **S13 end card:** "Register your interest · baqshi.com".
- **World map** (`parts.js` `BQ.map`, routes out from NZ): optional, for the "worldwide" beat, tagged as illustrative.

**New work needed**
- **NZ heat map.** BQ01 only has a world map. Port the site's `NZ_LAND`, the 20 places and their x/y from `/Users/brave/baqshi.com2027` (`src/lib/nz.ts`, built from Natural Earth by `scripts/build-nz.mjs`). Show no counts.
- **The circle ring.** Households filling a ring. The site's ring is a dashed progress arc out of 24.
- **Household glyphs.** Abstract hairline house-and-people icons, no AI people.
- **Matching animation.** Lines from the ring to the five role chips.
- **"First home or hesitate" fork** in the opening.
- **QSME NZ look, if this is N15.** The BQ01 template doesn't apply: QSME NZ uses navy and green with Manrope and Inter, and N14's `lbp-v2.html` is the pattern.

## (5) Which venture

**For Baqshi (BQ02)**
- Build Circle lives only on baqshi.com: the #build-circle section, the register form and `/api/inquiry`.
- The QSME repos have no Build Circle feature.
- Its copy is already in English, Arabic and Spanish, which matches the three-language rule.
- The owner's words "we are a consultant… around the world" are Baqshi's positioning.
- BQ01's template, voice and bed carry over.
- BQ01 already names "QSME, our construction platform partner" as the build tool.
- QSME NZ's mandatory "Sign up at qsme.co.nz" would send people to a site with no Build Circle on it.
- QSME rule §10.5 bans showing a managed build or held money as a QSME feature.
- Costs: three takes and translations, a longer Arabic cut, and an American voice speaking to Kiwi first-home buyers.

**For QSME NZ (N15)**
- The owner's own words: "a new thing to QSME", "first-time builders", "starting in New Zealand".
- Kiwi audience and voice (Cam S or John).
- Precedent in QSME's managed granny-flat service.
- QSME's site research, schedule of quantities and tender tools are the "tool" he describes.
- Against it: the CTA mismatch above, the §10.5 bans, site research covers Auckland only, and the rule against "verified" professionals.

**Co-branded**
- This matches how it actually works: Baqshi organises and matches, and QSME is the tool for rules, pricing and the open book. BQ01 already did this, and the site footers say "Baqshi Limited trading as QSME" (whether to disclose that shared ownership is still open).
- But IDs run one series per project, so a Kiwi-voiced NZ cut would need a new labelling convention. Two CTAs dilute each other, and both never-say lists apply at once.

**Lean:** a Baqshi-led BQ02. QSME is named as the build tool, the CTA is "Register your interest at baqshi.com", and a Kiwi-voiced English NZ cut is an option for the owner to decide. Confirm the venture with the owner before scripting, because his words point at QSME.

**Also raise with the owner**
- His "3 or 4 people" doesn't match the site's 24-household circle.
- Build Circle's "keep the developer's margin" sits awkwardly next to BQ01 calling real estate developers part of Baqshi's network. Don't make developers the villain.
- "Equity", "margin" and "investment" wording needs a careful check in the Arabic and Spanish versions (the BQ01 "investment fund" versus "trust" mistranslation is the warning).
