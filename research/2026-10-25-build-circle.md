# Build Circle: research for the first-time developers video (2026-10-25)

_Workflow wf_21d25101-beb: 5 researchers (site, QSME truth, NZ legal, audience, internal), 3 concept angles, 1 adversarial judge. Full per-agent reports: the session journal; the key points are below._

# Build Circle (first-time developers): research and judge note, 2026-10-25

**Verdict.** The pick is "Who do we even call?" (idea test 17/20), a Baqshi-led video co-credited to QSME (BQ02).
- It is a 56 s, 9:16 group-chat story read by a Kiwi voice (John) over bed G.
- CTA: "Register your interest at Bakshi dot com".
- Killed: concept 1 "Same open home" (12), concept 3 "Who gets the developer's cut?" (10) and concept 4 "The developer's chair" (13).
- Borderline passes: concept 5 "They just know who to call" (14) and concept 6 "Not off the shelf" (14).

## Product facts (baqshi.com, commit 6cd1c6d, live 2026-10-24)
- Section `#build-circle`. Title: "First-time developers NZ."
- Steps: Register → Form a circle → Build at cost → Own the margin.
- CTA: "Register your interest". The form posts to `/api/inquiry` as type `circle`. If delivery isn't connected, the route returns 503 and opens a mailto draft instead.
- Statuses: NZ is Live, Australia and Canada are Upcoming, and 91 countries are Private. `CIRCLE_SIZE = 24`, which conflicts with the owner's "3 or 4 people".
- **Every number on the section is sample data.** That covers the map (total 1,922), the "Joining now" feed, the world board and the equity split (Land 34 / Build 44 / Management 4 / Equity ~18). The code comment says "none is a count of real registrations".
- Copy safe to lift: "Tell us where, what and when", "When enough people want the same place, we bring them together around one brief and one site", "We match you with people who want the same", and "Nothing is bought, built or charged until everyone has seen the full costs" (use it without "charged").
- Files: `/Users/brave/baqshi.com2027` at origin/main: `src/i18n/{en,ar,es}/buildCircle.ts`, `src/components/BuildCircle.tsx`, `CircleExplorer.tsx`, `CircleForm.tsx`, `CircleWorld.tsx`, `src/lib/circle.ts`, `src/lib/nz.ts`.

## QSME's real role
QSME has no Build Circle, grouping or matching feature. Baqshi people do the matching. QSME is the tool.

What it provides:
- Site research. Zoning covers 4 councils; overlays and "What this site would require" are Auckland only.
- One priced schedule of quantities, with tenders cut from it.
- Bids shown as totals with "Lowest" marked. They are not compared line by line.
- Contracts.
- The NZ compliance checklist: PIM, resource consent and building consent, then hold-point inspections, then LBP Records of Work, then the CCC application on Form 6. Verified 2026-10-25 in `backend/internal/services/schedule/checklist_templates.go` (origin/main f1b31d4b).
- Read-only project invites. The role is labelled "Investor" ("See all financials, read-only", `src/components/projects/ProjectInviteDialog.tsx`), so that label must never appear on screen.
- A money record only. QSME does not hold or release funds.

Profile mapping: estimator = Quantity Surveyor. Architects go through the NZRAB route and engineers through the CPEng route. Never say "verified": 1 of 22 profiles is verified and 0 have a verified licence.

## Legal guardrails (NZ; not legal advice; get a securities lawyer's sign-off)
- **FMC Act s 9(1): managed investment scheme.** A scheme is an MIS when (a) people contribute money for interests, (b) those interests carry rights to financial benefits produced principally by another person's efforts, and (c) the holders have no day-to-day control. Verified in the legislation text.
  - The s 9(2)(a) exclusion needs separately identifiable property, held legally and beneficially, whose value doesn't substantially depend on the others' contributions.
  - So "margin stays with you as equity" plus "we manage everything" is the risky combination.
  - Sell a coordination service plus owning your own home. Never an interest or a return.
- **Fair Trading Act.**
  - s 9: misleading conduct, judged on net impression.
  - s 12A: substantiate claims at the time they are made.
  - s 13(g): price claims.
  - Fines up to $600k per offence for a company.
  - "At cost" needs the fee disclosed. Savings claims need workings on file.
- **Financial advice (FMC s 431C).** Don't recommend lenders, KiwiSaver use or a personal plan. Recommending independent advice is allowed (Sch 5 cl 7).
- **Building Act.**
  - s 40: building consent is required.
  - s 84: restricted building work needs a Licensed Building Practitioner.
  - s 92: the owner applies for the CCC.
  - The s 90B owner-builder exemption doesn't fit a group build with paid contractors.
- **Registered Architects Act s 7.** "Architect" is a protected title. Use it only for NZRAB-registered people, otherwise say "designer".
- **Overseas Investment Act.** Residential land is sensitive, any interest counts (s 12), and a company that is more than 25% overseas-owned is an overseas person (s 7). NZ circles are for eligible buyers only.
- **Grants.** The First Home Grant closed on 22 May 2024. Don't mention it.

## Audience (NZ, 2026)
- The market has changed. First-home buyers are the most active group: 29% of purchases, prices 18% below the 2022 peak, listings up 45%. So skip "you'll never afford it" doom.
- The pains that are current:
  - the deposit is still hard to save;
  - you need help from the bank of mum and dad;
  - people distrust new builds (66% worry about quality);
  - you end up buying what a developer chose to build;
  - the mates' "let's buy a section together" chat dies at "who do we even call?".
- Co-owner disputes most often come from people wanting different timelines.
- Words to avoid: "syndicate", "pooled fund", "investment opportunity", "rent-to-own" and "off the plan" (Du Val, Podular, Reed Myers).
- Precedents:
  - Block Party, Wellington: 4 terraces at cost, more than 5 years, and about 18 months to get the loan.
  - Cohaus, Auckland: 20 households, needed a professional to drive it.
  - Urban Habitat Collective: failed when build costs nearly doubled after consent.
  - Miuwi: matching alone built nothing.
  - Lesson: finance and cost blow-outs kill group builds, so lead with how the money is protected and who drives the project.

## Key sources
- FMC Act 2013, s 9 and s 431C: https://www.legislation.govt.nz/act/public/2013/69/en/latest/
- Fair Trading Act 1986: https://www.legislation.govt.nz/act/public/1986/121/en/latest/
- Building Act 2004: https://www.legislation.govt.nz/act/public/2004/72/en/latest/
- Registered Architects Act 2005: https://www.legislation.govt.nz/act/public/2005/38/en/latest/
- Overseas Investment Act and LINZ guidance: https://www.linz.govt.nz/guidance/overseas-investment/buying-residential-property-live
- FMA advertising guidance note: https://www.fma.govt.nz/assets/Guidance/Advertising-offers-of-financial-products-guidance-note.pdf
- FMA forestry MIS licensing guide (closest analogy): https://www.fma.govt.nz/assets/Licensing-guides/160519-Licensing-guide-for-MIS-managers-of-forestry-schemes-v2.pdf
- Commerce Commission on fine print: https://www.comcom.govt.nz/fair-trading/fair-trading-act-fact-sheets/fine-print
- First-home buyers take over the market (Spinoff, 09-09-2026): https://thespinoff.co.nz/business/09-09-2026/first-home-buyers-have-taken-over-the-housing-market
- Cotality-Westpac First Home Buyer Report (May 2026): https://assets.dam.westpac.co.nz/is/content/wnzl/dist/all-of-bank/economic-reports/economic-data/Economic-Data_080526-Cotality-Westpac-NZ-First-Home-Buyer-Report_bulletin_08May26.pdf
- OneChoice Kiwi Housing Trends 2026 (a vendor survey): https://www.onechoice.co.nz/news-vault/kiwi-housing-trends-report-2026
- Kiwibank State of Home Ownership (2024): https://kiwibank.co.nz/about-us/news-and-updates/media-releases/state-of-home-ownership-report-reveals-new-pathways-to-homeownership-needed
- Buying a house with friends (become.nz): https://www.become.nz/articles/buying-a-house-with-friends
- Urban Habitat Collective post-mortem: https://thespinoff.co.nz/wellington/02-05-2024/my-co-housing-project-failed-but-i-still-think-its-a-great-idea
- Block Party: https://architectureanddesign.com.au/news/when-6-friends-beat-the-runaway-housing-market
- Cohaus case study: https://aucklanddesignmanual.co.nz/content/dam/adm/adm-website/case-studies/terraces/Cohaus%20Version%201.pdf
- Miuwi: https://www.oneroof.co.nz/news/tinder-for-property-swipe-right-to-buy-a-home-35648
- First Home Grant closure: https://www.beehive.govt.nz/release/first-home-grant-closure-exemptions

## Open before scripting
1. Venture, voice and ID: BQ02 with a Kiwi voice, or N15.
2. Languages.
3. Whether the circle decides and signs while Baqshi organises, and whether "nothing bought or built until full costs" is a firm rule.
4. Keeping margin, equity and fee wording out, and fixing the landing page.
5. Circle size: 3-4 or 24.
6. Form delivery, and whether the architect is always NZRAB-registered.



## Claims ledger (judge)

| Claim | Status | Source |
|---|---|---|
| 'We should all just buy a section together. Every group chat's had this one.' (hook) | safe | Obvious puffery inside a dramatisation tagged 'Illustrative · not a real chat'. Grounded in Consumer NZ on friend groups co-buying (newstalkzb 'realities of buying a home with your friends') and Kiwibank 2024 (44% find co-ownership appealing). |
| 'Tom's moving to Aussie' / 'Tom left the chat' | safe | A fictional character with a generic first name, inside the Illustrative tag. The joke is on the situation. No real person. |
| Build Circle exists and is by Baqshi | safe | Live on baqshi.com/#build-circle (fetched 200 on 2026-10-25); /Users/brave/baqshi.com2027 commit 6cd1c6d, src/i18n/en/buildCircle.ts eyebrow 'Build Circle'. |
| 'Tell us where, what home and when.' | safe | buildCircle.ts form.body 'Tell us where, what and when.' Form fields: place, home type, bedrooms, timing. |
| 'Once enough people want the same, we bring you together.' | safe | buildCircle.ts how.steps[1]: 'When enough people want the same place, we bring them together around one brief and one site.' Process claim only; no counts or progress implied. |
| 'The right contractor, architect, engineer, project manager and estimator, matched to your circle before anything starts.' | safe | The owner's brief (2026-10-25), presented as Baqshi's human consultant service, not QSME matching (QSME has no matching feature). Conditions: an 'architect' must be NZRAB-registered (Registered Architects Act s 7), otherwise say 'designer'; the estimator is the QSME Quantity Surveyor profile (signup-flow-guide.tsx); never 'verified' or 'vetted'. |
| 'On Q-S-me, we line up the rules: consents, inspections, code compliance.' | reword | Reworded from the concepts' 'pop in the address and see what that site would need', because site research needs an account and is full only in Auckland. The new line rests on the QSME NZ checklist (backend/internal/services/schedule/checklist_templates.go on origin/main f1b31d4b: PIM, resource consent, building consent, hold-point inspections, 'Lead trades are LBPs; Records of Work collected', 'CCC applied for (Form 6)'), checked 2026-10-25. It also matches legal's say-instead ('We help you line them up'). Not official or complete; QSME does not lodge consents, book inspections or issue the CCC. |
| 'Every cost line's priced on one open book.' | safe | QSME safe claim 5 (one priced schedule of quantities, truth sheet §3.1) and site step 3 ('builds on an open book: every cost line quantity-surveyed'). The video never says 'compared line by line', and it drops 'paid only when the work is done' because QSME does not enforce it. |
| 'Together, nobody funds a whole site alone.' | reword | Legal say-instead for the owner's 'they don't have capital' ('so you're not funding a whole site alone'). Replaces concept 2's 'You share the land and the build', which reads as pooling or co-owning one site (FMC s 9(2)(a) grey zone). Never 'build without capital' or 'no deposit'. |
| 'Your circle makes the calls and signs the contracts.' | reword | Legal say-instead for the owner's 'we are managing everything' (FMC Act s 9(1)(c), day-to-day control; FMA forestry-scheme guidance). It is true only if the circle really decides and contracts while Baqshi organises as consultant (matches the QSME service model in ventures/qsme-nz.md: 'contracted to the owner'). Owner must confirm; if not, cut it and get a lawyer. |
| 'Nothing's bought or built till everyone's seen the full costs.' | reword | Site confirmation copy ('Nothing is bought, built or charged until everyone has seen the full costs.'), with 'charged' dropped so it can't read as a no-charge pricing line under the no-free rule. A process promise: the owner must confirm it is a firm rule. |
| 'First-time developers, it starts in New Zealand.' | safe | Site title 'First-time developers NZ.'; statuses.live = New Zealand; owner brief 'starting in New Zealand'. 'Circles are forming now' is deliberately not said. |
| 'Register your interest at Bakshi dot com.' / baqshi.com/#build-circle | safe | The site's own CTA (overview.cta 'Register your interest'); the form posts to /api/inquiry as type 'circle'. Delivery is unconfirmed: if it isn't connected, the page opens an email draft to hello@baqshi.com (form.status.unconfirmed). Test before posting. |
| End card 'Not in NZ? Register in your country.' (answering Tom's 'do they do Aussie?') | safe | buildCircle.ts overview.elsewhere and the worldwide form (94 countries). Registration only. The video doesn't claim Australia 'opens next' or that private circles exist. |
| On screen: 'Not an investment offer. No returns promised. Costs and finance depend on each site.' | safe | Legal research disclaimers 1 and 2 (FMA advertising guidance note: prominent warnings). Consistent with a script that promises no equity, margin or returns. A lawyer must confirm the structure isn't an MIS, because the disclaimer can't fix that if it is. |
| On screen: 'Get independent legal and financial advice. NZ circles: eligible buyers; overseas buyer rules apply. Not legal, tax or financial advice.' | safe | Overseas Investment Act ss 7, 12 (residential land is sensitive; any interest counts; LINZ guidance); FMC Act s 431C and Sch 5 cl 7 (recommending advice is allowed); Baqshi standard footer. |
| On screen: QSME checklist '01 Building consent · 02 Council inspections · 03 Licensed building practitioners · 04 Code compliance certificate', with 'Example · indicative' | safe | checklist_templates.go (verified); Building Act ss 40, 84, 92. |
| On screen: chip 'Estimator (QS)' | safe | QSME has no 'estimator' profile type; estimating is the Quantity Surveyor profile ('Cost estimation and quantity takeoff', signup-flow-guide.tsx). |
| End card credit 'by Baqshi · built on QSME' | safe | QSME is the build tool (PRODUCT.md); BQ01 precedent; site footers 'Baqshi Limited trading as QSME'. Concept 5's 'Our build platform' was not used because whether to disclose the shared ownership is still open. |
| Three household dots on a dashed ring (visual) | safe | The site's own CircleGlyph ('three households on one ring', BuildCircle.tsx). A glyph, not a circle size; no 'n / 24' shown. |
| On screen: 'Each household buys in its own name, through its own lawyer' / 'You own your home directly' (from concepts 1-2) | cut | States an ownership structure the owner hasn't chosen. It would be false under a company or LTC (shares are FMC financial products). Restore only after the owner and a lawyer confirm. |
| 'At cost', 'plus our fee', 'No developer's cut / margin in your price', 'real costs' (concepts 3-6) | cut | FTA ss 12A and 13(g): a comparative savings claim needs workings on file at publication. The fee model is unconfirmed (marked 'never in content' for the QSME managed build). 'At cost' without the fee is misleading (Commerce Commission fine-print guidance). |
| 'Own the margin', 'Your equity · ~18%', margin bars (site and concept 3) | cut | FMC Act s 9(1)(b) 'financial benefit'; the site itself labels the bars 'Illustrative · not a forecast' and the percentages are hard-coded constants. Legal flagged the landing page too. |
| 'Payments go straight to whoever did the work' (concepts 4 and 6) | cut | The Build Circle payment flow is unconfirmed. QSME records payments and doesn't move or hold money (truth sheet §10.5). It also risks off-the-plan and escrow readings (Podular, Reed Myers). |
| Sample counts (1,922, per-town numbers, 640 / 410 / 2,597, 'Full circles so far', 'Joining now' feed, '91 countries', 'people are already gathering in private circles') | cut | Sample data by the site code's own comment ('none is a count of real registrations'); FTA ss 9 and 13(c); Baqshi rule 'no number except 90+'. |
| 'Developers aren't smarter than you' / 'Don't buy your first home off the shelf' / 'They pick the town, the design, the price' (concepts 4-6) | cut | Net-impression risks (FTA s 9). They trivialise development risk, discourage buying in favour of an unproven offer, or cast developers and trades as villains (BQ01's network; QSME's no-mocking-trades rule). |

## Concept scores

- **Same open home (BQ02 working title)** (story): 12/20. FAIL (R3 S3 O4 Sh2 = 12). Safe and on-brand, but the payoff is a reframe with no laugh and nothing worth forwarding, and frame 1 (dots in a floor plan) is abstract. Kill it. Graft one thing into the pick: the remaining people docking onto the site's three-dot ring so the story ends as the logo.
- **Who do we even call?** (story): 17/20. PASS (R5 S4 O4 Sh4 = 17). PICK. The frame-1 bubble is a 'that's literally us' moment with the sound off. The hook's question ('who do we even call?') is answered literally by the owner's five roles joining the chat. It has a natural share mechanic: send it to the chat where this message died. Four lines need fixing (QSME address line, 'share the land', the two structure claims). I scored Shareable 4, not 5, because the middle explains rather than jokes.
- **Who gets the developer's cut?** (mechanism): 10/20. FAIL (R2 S3 O3 Sh2 = 10). Kill it. This is the riskiest angle legally, and it is abstract precisely because the numbers it needs are banned.
- **The developer's chair (Everyone's in the room but you)** (mechanism): 13/20. FAIL (R3 S4 O4 Sh2 = 13). Strong image, but it is explainer-paced and the chair metaphor turns the five professionals into part of the problem.
- **They just know who to call** (contrarian): 14/20. BORDERLINE PASS (R3 S4 O4 Sh3 = 14). A runner-up. Graft its spine into the pick: 'First, the people… Then, who to call.'
- **Not off the shelf** (contrarian): 14/20. BORDERLINE PASS (R3 S4 O4 Sh3 = 14). The 'development backwards / starts with the people' idea is good, but the hook advises against buying. Keep 'starts with the people' as a line to reuse.
