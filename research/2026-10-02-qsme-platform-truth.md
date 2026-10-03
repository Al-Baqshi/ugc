# QSME product truth sheet — NZ and Global

> **OWNER OVERRIDE 2026-10-03:** never say "free", "no sign-up", "no login", "without an account", "no listing fee", "always free", "bid free", "no fees/per-seat/success fee" in any content. Every CTA pushes sign-ups (NZ: "Sign up at qsme.co.nz"; Global: "Book a 30-minute demo at qsme.build"). Present site search/site research as what you get when you sign up. This overrides any "public, no login" wording below.

Generated 2026-10-02 for the CreativeUGC studio. Machine-readable twin: `research/2026-10-02-qsme-platform-truth.json` (same content, same IDs).

**How this was built.** Merged from nine reader reports (site research, schedule, estimate-to-payments, documents and AI, people and marketplace, global edition, marketing and assets, changelog, live public surface) and two fact-checker passes. Where a fact-checker disagreed with a reader, the fact-checker's status is used and the feature's fact_check field says so. Nobody logged in: in-app wording comes from origin/main source, the deployed JavaScript bundles and the public guides, not from watching the screens. Record real screens from a demo account before publishing.

**Status badges** (all verified by the fact-checkers): ✅ live = on main and deployed · 🟡 merged = on main but not confirmed working for users · 🔶 branch = unmerged or uncommitted · ⬜ planned = not built, withdrawn, or waiting on a licence/sales. Where a fact-checker disagreed with a reader, the fact-checker's status is used and the feature says so under **Fact-check**.

**Sources:** app repo /Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go (origin/main 5422d983, 2026-10-02; production API revision 321b5da9, one front-end-only merge behind and already in the live web bundle); global site repo /Users/brave/Dev/qsme.build (origin/main bd8aacd, 2026-09-27; uncommitted local redesign not live). The checked-out branch site-research-pro is behind origin/main. Do not record or quote from the local checkout.

## Contents
- (a) One-page summary
- (b) What's new in the last 8 weeks
- (c) Feature inventory by journey stage
- (d) NZ-specific facts
- (e) Global-specific facts
- (f) Pricing and fee facts
- (g) Reusable assets
- (h) Story seeds and the strongest video features
- (i) Claim guardrails — the red list
- (j) Open questions for the owner

---

## (a) One-page summary

### QSME NZ today (www.qsme.co.nz)

QSME NZ (www.qsme.co.nz) is a web app plus an iPhone app that takes a New Zealand build from a public address check to a priced schedule of quantities, tenders, signed agreements, a Gantt programme, site sign-in, milestone payment records and the CCC document pack, all in one project record.

Lines the product uses about itself: “Watch your project come to life.” · “From feasibility to Code Compliance — one place for developers and property owners to plan, price and deliver every New Zealand project.” · “Built for New Zealand developers & property owners”

- Front door: the homepage address check is public. It shows the LINZ boundary, land area, legal description and council for any NZ address; the planning zone for Auckland, Wellington City, Christchurch and Hamilton only; services and flood/hazard chips for Auckland only. A free account unlocks Site research (verdict, overlays, requirements, feasibility calculator, Pro view, one-page report). Full depth is Auckland only.
- Price it: a schedule of quantities (pockets, jobs, lines) filled by typing, Excel/CSV import, templates, or AI drafts that a person checks. 'Read my plans' splits a consent-pack PDF into sections and the AI chat labels where each number came from (paid plan or trial; chat is tagged Beta).
- Tender it: private or public tenders cut from a pocket. Bidders never see your rates or budget. Emailed PDF quotes can be read into a checked draft and join the comparison. Bids are compared as totals excluding and including GST with a 'Lowest' tag; each bid opens to its own lines.
- Agree it: award creates the payment contract with milestones and retention. Agreements are signed from a link with no account, with a certificate page. 'Make the agreement' writes one from an awarded job as a draft.
- Programme it: a Gantt with linked tasks, booked tradies asked before their dates move, rain days, NZ public holidays, a default Christmas shutdown (23 Dec to 11 Jan), 'What drives the finish date', and a printable A4 'Construction programme' on your letterhead.
- Run the site: a QR poster on the gate for sign-in with no app or account, a printable register, an induction and daily safety check for tradies, a daily log that writes some entries itself, and project chat.
- Pay: milestones are settled 'outside QSME' and confirmed by the receiver (live). NZ open banking is built but not confirmed switched on in production. QSME never holds money; there is no escrow.
- Hand over: trade certificates and a CCC pack zip (paid plan); QS reports including a drawdown certificate and cost to complete (paid plan; generated by the user, not certified by a QS).
- Marketplace layer (NZ only): public tender board, tradie and supplier directories, products marketplace and property listings are real but nearly empty today: 2 open tenders, 2 public projects, 22 directory profiles (1 verified, 0 ratings), 3 marketplace listings, 0 suppliers in Find a Supplier, 0 property listings.
- Money model: free plan (first project free; tradies bid free per the pricing page), paid plans quoted not published, and one fixed fee: 1% each side, capped at $2,000, only when the public marketplace found the work, invoiced when the job completes.
- Mobile: iOS app v1.0.0 on the App Store since 23 Sep 2026, sign-in only, 0 ratings. Not on Google Play. Phone features merged after the store build (Site search, Pro cards) are not confirmed in users' hands.

### QSME Global today (qsme.build + app.qsme.build)

QSME Global is the same platform for construction organisations outside New Zealand: a demo-led marketing site at qsme.build (15 languages) and the app at app.qsme.build, focused on estimating, private tendering, award into contract, the programme and site records.

Lines the product uses about itself: “Tendering and estimating software for construction organisations” · “It keeps one record per project, and makes the estimate the document that is tendered, contracted and built against — so what was priced, what was agreed and what was done are the same thing.” · “In production in New Zealand at qsme.co.nz”

- Doors: qsme.build is the marketing site (Book a demo is the call to action; there is no sign-in link). app.qsme.build goes straight to sign-in; self-serve sign-up with a country picker exists but is not linked from qsme.build. Same codebase, backend and database as NZ; what a person sees is decided by their organisation's market and country.
- What a global organisation gets: schedule of quantities with AI drafting and Excel import; private, invitation-only tenders (30-day invitations); emailed quotes in the comparison; bids compared on the same tax basis; award into contract with milestones; e-signed agreements; Gantt with linked tasks, finish-date chain, rain days and a printable programme; QR gate sign-in, daily log and chat; documents and plan reading; money recorded, never moved (paid outside, receiver confirms); the AI assistant connector.
- What it does not get: site research, the public tender board, tradie/supplier directories, marketplace, property listings, bank payments, success fee, NZBN/LBP checks, the CCC pack and certificates.
- Gaps to respect: no public-holiday calendar outside NZ (Monday to Friday only, and the NZ Christmas shutdown is on by default); the organisation's own tax name shows only on the profile, letterhead and checklist so far (bids and contracts still say GST); built-in agreement templates are written for NZ law; the app UI is English, Spanish and Arabic (the 15 languages are the website); team seats, white-label and an embeddable tender board are 'ask sales', not available.
- Pricing: per organisation, by the projects running at once; no per-seat fees, no success fee, invited bidders never pay to bid; every plan is quoted by sales in writing. No public price, no free plan or trial is advertised.
- Trust posture: the security page states QSME is not ISO 27001 certified (programme in progress), has no SOC 2 report and makes no SSO/MFA claims. There are no customer logos, testimonials or usage numbers anywhere.

### Status at a glance

102 features in the inventory, deduplicated across the nine reader reports.

| Edition | ✅ live | 🟡 merged | 🔶 branch | ⬜ planned | Total |
|---|---|---|---|---|---|
| NZ only | 29 | 3 | 0 | 1 | 33 |
| NZ + Global (both) | 54 | 3 | 2 | 1 | 60 |
| Global only | 7 | 0 | 1 | 1 | 9 |
| **All** | **90** | **6** | **3** | **3** | **102** |

The one-sentence version: **the product is real, broad and mostly live; the marketplace around it is nearly empty; and full site research is Auckland-only.** Sell mechanisms and honest moments, never scale.

---

## (b) What's new in the last 8 weeks

Newest first. Status is the verified status.

| When | What changed, in plain words | Status | Edition | Note |
|---|---|---|---|---|
| 2026-10-02 | Property listings: a public /properties page and a self-serve 'real-estate agent mode' (My Listings). Each listing links to Site research for its address. | ✅ live | NZ | 0 listings today; agent mode has no licence check. |
| 2026-10-02 | Public marketplace and supplier shop pages, browsable without logging in. | ✅ live | NZ | 3 listings from 3 suppliers. |
| 2026-10-01 | Supplier catalogue: products vs services (priced per hour/day/job), shared categories, bulk import from a spreadsheet. | ✅ live | NZ |  |
| 2026-10-01 | Site research Pro view: full-height aerial map with Zoning / Buildings / Services / Flood & hazards layers, seven tabs, free LINZ title facts (owner count only) and a printable one-page site report. | ✅ live | NZ | Phone Pro cards merged only. |
| 2026-09-30 | Site research rebuilt: closest-match NZ address search (paste messy addresses, up to three at once), zone-first zoning, overlays, development verdict with indicative homes, 'What this site would require', rough feasibility calculator. | ✅ live | NZ | Web only; the phone Site search screen is merged but not confirmed in the store app. |
| 2026-09-26 to 2026-09-27 | Global edition: every account belongs to an organisation; app.qsme.build; country-aware sign-up (currency, timezone, tax); NZ-only features hidden and refused; country-first process templates; qsme.build launched in 15 languages. | ✅ live | Global |  |
| 2026-09-24 to 2026-09-27 | Nightly encrypted backups with a second copy. | 🟡 merged | NZ + Global | Scripts are on main; that they run nightly in production cannot be verified from the repo. |
| 2026-09-23 | iOS app v1.0.0 released on the App Store (sign-in only). | ✅ live | NZ + Global |  |
| 2026-09-22 to 2026-09-23 | Schedule: printable 'Construction programme' PDF on your letterhead, 'What drives the finish date' on screen and in print, NZ public holidays, Christmas shutdown (23 Dec to 11 Jan) and your own days off, Townhouses templates, money columns that mark estimates with '~', no percentages anywhere. | ✅ live | NZ + Global | Holiday calendar is NZ only. |
| 2026-09-22 | QR site sign-in poster, on-site list and printable register; daily site safety check. | ✅ live | NZ + Global |  |
| 2026-09-22 | 14-day trial of paid features for every new account (banner in the app). | ✅ live | NZ | Not mentioned on any public page; the pricing page says 'No trial clock'. Do not advertise until the owner decides. |
| 2026-09-21 to 2026-09-23 | Agreements: write or bring in an agreement, send it, signed from a link with no account; awarded job becomes an agreement draft; one kept signature. Bids compared as a table with every price excluding and including GST. | ✅ live | NZ + Global |  |
| 2026-09-19 to 2026-09-20 | Sheets (Excel-like project spreadsheets linked to jobs and payments); 'Add a bid you received' for emailed quotes; Sheets over the AI connector. | ✅ live | NZ + Global |  |
| 2026-09-16 to 2026-09-22 | Pricing becomes quoted, not published; everything you send goes out under your own letterhead. | ✅ live | NZ + Global |  |
| 2026-09-01 to 2026-09-14 | QSME's own chat (Stream removed); message requests from strangers; daily log writes rain days and schedule moves itself; AI chat labels what it knows vs guesses; 'Read my plans' hardened for real council packs; drawing mark-up switched off (4 Sep); Airwallex replaces Stripe for card payments (4 Sep). | ✅ live | NZ + Global | Mark-up is off: do not show it. |
| 2026-08-26 to 2026-08-31 | Rebuilt Schedule page with rain outlook and award ripple; AI assistant connector for Claude and ChatGPT (30 Aug); 'Read my plans' (31 Aug); phone app becomes the on-site tool. | ✅ live | NZ + Global |  |
| 2026-08-15 to 2026-08-17 | Escrow and on-chain code deleted; invoices subsystem and CRM pipeline removed; GST basis frozen on bids; 1% success-fee model. | ✅ live | NZ + Global |  |

### Removed in this window — never show these

- **'Book a tradie' / Quick Jobs / Bookings** (2026-09-22). Still visible in old App Store/Play screenshots and in book-a-tradie.mp4 and bookings.mp4. Never show.
- **In-app voice/video calling and screen share** (2026-08-29). The chat hands the number to the phone instead.
- **Escrow (custodial and on-chain)** (2026-08-15). No routes, no UI; never deployed on-chain.
- **Invoices subsystem and CRM pipeline** (2026-08-15). Invoices.mp4 and customers clips describe it. Never show.
- **Stripe** (2026-09-04). Replaced by Airwallex.
- **Published price ladder ($9, $99, $499, $999)** (2026-09-16). Prices are quoted; list prices in code are deliberately unpublished.
- **Percent-complete on the schedule** (2026-09). 'No percentages anywhere' by design.
- **Tradie-side 'Quotes & Variations'** (2026-08/09). quotes.mp4 shows it. Never show.
- **AI 'What does this say?' on agreements** (2026-09). AI helps write, never reads or judges a contract.

### Biggest fact-checker corrections

- Site research is not 'any NZ address': boundary/area/council are NZ-wide, zone is 4 councils (Auckland, Wellington City, Christchurch, Hamilton), and overlays, services, hazards, verdict, homes estimate and requirements are Auckland only. A live Dunedin test returned parcel and council only.
- NZ open banking downgraded from live to merged: deployed code, but whether it is switched on depends on production configuration nobody could check. Do not film it until the owner makes a real payment.
- Trade licence verification downgraded to merged/unconfirmed: 0 of 22 public profiles carry a verified licence, only LBP has an automated register lookup and only if an MBIE key is configured. The homepage line 'Every trade. Verified.' is not supported by the data (1 of 22 profiles verified).
- Bid comparison is a table of totals per bidder (excl. GST, GST, incl. GST, duration, status), not a side-by-side line matrix. The matrix exists only on unmerged branch est/levelling, although both marketing sites say 'line by line'.
- Drawing mark-up and takeoff are switched off (flag since 2026-09-04). qsme.build still says bidders can 'mark up the drawings'.
- The public schedule link shows contract totals, paid and owed by default ('Show money on the public page' starts on).
- QS reports upgraded from merged to live (six report types in the deployed bundle). They are generated by the account holder, not prepared or certified by a QS.
- The app is in English, Spanish and Arabic; the 15 languages are the qsme.build website, and Spanish product pages still show English body text.
- New Zealand is the only public-holiday calendar; regional anniversary days are not included; the Christmas shutdown is on by default for global projects too.
- Global tax naming is partial: only profile, letterhead preview and checklist follow it; bids, contracts and the comparison still say GST.
- Marketplace scale: 2 open tenders (at least one created by the App Store reviewer seed script), 2 public projects, 22 profiles, 3 listings, 0 properties.
- Mobile: iOS only. Site search and phone schedule changes committed after the 23 Sep store build are not confirmed delivered. SMS code delivery is failing in production (unmerged fix branch 8dc71867).
- AI chat carries a Beta tag and 'It can get things wrong'. The source labels are a prompt instruction, not enforced.
- Backups downgraded to merged (cannot verify they run). Main contractors need GC Pro to view opportunities and to hire. Public profiles feed returns emails/phones without login (privacy question).
- Townhouses template figures differ by source: current file has 136 tasks and 235 working days consent-to-settlement; the original commit said 140 tasks and 185 working days on site. Quote neither as a promise.

---

## (c) Feature inventory by journey stage

Each feature lists: edition, verified status, what it does, exact on-screen wording to quote, best demo moments, pains solved, facts you can use, and **DO NOT CLAIM** lines (reader and fact-checker lines merged). On-screen wording comes from source code, live bundles and public guides; confirm against a real recording before putting it in a caption. Text in *(italics)* before a quote says where it appears.

### Index

| # | Feature | Edition | Status |
|---|---|---|---|
| 1.1 | Homepage address check (“Search your address”) (Find a site) | NZ | ✅ live |
| 1.2 | “View live projects on the map” (Find a site) | NZ | ✅ live |
| 1.3 | Address search that understands how people actually type (Find a site) | NZ | ✅ live |
| 1.4 | Site research page (web, free account) (Find a site) | NZ | ✅ live |
| 1.5 | Zone-first zoning: “What could go here” and the coloured zoning map (Find a site) | NZ | ✅ live |
| 1.6 | Planning overlays & controls on the parcel (Auckland) (Find a site) | NZ | ✅ live |
| 1.7 | Services & hazards snapshot (Auckland) (Find a site) | NZ | ✅ live |
| 1.8 | Site research — Pro view (full map, layers, seven tabs, title facts) (Find a site) | NZ | ✅ live |
| 1.9 | One-page site report (print or save as PDF) (Find a site) | NZ | ✅ live |
| 1.10 | Saved sites, recent searches and research kept with the project (Find a site) | NZ | ✅ live |
| 1.11 | Phone “Site search” screen (Find a site) | NZ | 🟡 merged |
| 1.12 | Property & investment listings (public /properties) (Find a site) | NZ | ✅ live |
| 1.13 | My Listings — self-serve real-estate agent mode (Find a site) | NZ | ✅ live |
| 1.14 | Owner names, CV / rating values and sale history (Find a site) | NZ | ⬜ planned |
| 2.1 | Development potential verdict and indicative yield (Feasibility) | NZ | ✅ live |
| 2.2 | “What this site would require” checklist (Feasibility) | NZ | ✅ live |
| 2.3 | Rough feasibility calculator (“Your numbers, our arithmetic.”) (Feasibility) | NZ | ✅ live |
| 2.4 | From address to project: “Create project here” and “At this address on QSME” (Feasibility) | NZ | ✅ live |
| 3.1 | Schedule of Quantities (SOQ): pockets, jobs, lines, your own columns and formulas (Estimate) | NZ + Global | ✅ live |
| 3.2 | SOQ in and out: Excel/CSV import, Excel/CSV/PDF export, templates (Estimate) | NZ + Global | ✅ live |
| 3.3 | Read my plans / Plan index: consent pack split into sections (Estimate) | NZ + Global | ✅ live |
| 3.4 | Ask the plans: AI chat that labels where every number came from (Beta) (Estimate) | NZ + Global | ✅ live |
| 3.5 | Project facts: QSME quietly takes in every uploaded document (free) (Estimate) | NZ + Global | ✅ live |
| 3.6 | Draft SOQ with AI (Estimate) | NZ + Global | ✅ live |
| 3.7 | Estimate with AI (prices only the unpriced lines, flagged for review) (Estimate) | NZ + Global | ✅ live |
| 3.8 | Extract with AI: turn a cost plan or feasibility PDF into your SOQ (Estimate) | NZ + Global | ✅ live |
| 3.9 | Create units with AI (unit schedule from documents) (Estimate) | NZ + Global | ✅ live |
| 3.10 | Take the index with you: copy, save as text, save pages as their own PDF (Estimate) | NZ + Global | ✅ live |
| 3.11 | Drawing mark-up / takeoff viewer (switched off) (Estimate) | NZ + Global | 🟡 merged |
| 3.12 | Not yet: bid levelling matrix, variations workflow, cash flow, rate book, SOQ revisions, drawing measurement (Estimate) | NZ + Global | 🔶 branch |
| 4.1 | Tender cut from an SOQ pocket: private or public, invitations and share link (Tender) | NZ + Global | ✅ live |
| 4.2 | Tenders point each trade at the right sheets (Tender) | NZ + Global | ✅ live |
| 4.3 | What a bidder sees and how they price (rates and budget never shown) (Tender) | NZ + Global | ✅ live |
| 4.4 | Live Tenders board (public, by region) (Tender) | NZ | ✅ live |
| 4.5 | Browse Projects (public project pages) (Tender) | NZ | ✅ live |
| 4.6 | Find a Tradie directory and trade-by-region pages (Tender) | NZ | ✅ live |
| 4.7 | Find a Supplier directory (Tender) | NZ | ✅ live |
| 4.8 | Public marketplace and supplier shop pages (Tender) | NZ | ✅ live |
| 4.9 | Supplier catalogue tools: products vs services, public rate, spreadsheet import (Tender) | NZ | ✅ live |
| 4.10 | Opportunities, My Bids and Awarded Work (the bidder's side) (Tender) | NZ + Global | ✅ live |
| 5.1 | Add a bid you received: emailed quotes join the comparison (Compare & award) | NZ + Global | ✅ live |
| 5.2 | Compare bids: totals excluding and including GST, with a 'Lowest' tag (Compare & award) | NZ + Global | ✅ live |
| 5.3 | Award in one click: the winning bid becomes a contract with milestones and retention (Compare & award) | NZ + Global | ✅ live |
| 5.4 | Verified badge (identity and business check) (Compare & award) | NZ + Global | ✅ live |
| 5.5 | Trade licence verification and the LBP register check (Compare & award) | NZ | 🟡 merged |
| 6.1 | Add a contract for work already agreed (no tender) (Agree & sign) | NZ + Global | ✅ live |
| 6.2 | Agreements signed from a link — no account needed (Agree & sign) | NZ + Global | ✅ live |
| 6.3 | An awarded job becomes an agreement (“Make the agreement”) (Agree & sign) | NZ + Global | ✅ live |
| 6.4 | Bring in an agreement you already have, or have QSME write notes up as one (Agree & sign) | NZ + Global | ✅ live |
| 7.1 | Gantt timeline and numbered list for one project (Schedule) | NZ + Global | ✅ live |
| 7.2 | Fill the schedule from the estimate (SOQ import) (Schedule) | NZ + Global | ✅ live |
| 7.3 | Tenders and contracts land on the schedule as the same task (Schedule) | NZ + Global | ✅ live |
| 7.4 | Built-in NZ programmes (Townhouses, Standard NZ build, Land to titles) (Schedule) | NZ | ✅ live |
| 7.5 | Your own templates, CSV/JSON in and out, copy to units (Schedule) | NZ + Global | ✅ live |
| 7.6 | Linked tasks: one trade slips, everything after it moves (Schedule) | NZ + Global | ✅ live |
| 7.7 | Asked, not told: booked tradies confirm new dates (Schedule) | NZ + Global | ✅ live |
| 7.8 | Rain days and the rain outlook (Schedule) | NZ + Global | ✅ live |
| 7.9 | What drives the finish date (the purple chain) (Schedule) | NZ + Global | ✅ live |
| 7.10 | NZ public holidays built in (Schedule) | NZ | ✅ live |
| 7.11 | Christmas shutdown and your own days off (Schedule) | NZ + Global | ✅ live |
| 7.12 | Printed programme PDF (“Construction programme”) (Schedule) | NZ + Global | ✅ live |
| 7.13 | Money on the programme: Cost and Paid columns, estimate vs agreed (Schedule) | NZ + Global | ✅ live |
| 7.14 | Who can see the schedule: Private, Trades, Public link (Schedule) | NZ + Global | ✅ live |
| 7.15 | All projects: search every schedule and download one pack (Schedule) | NZ + Global | ✅ live |
| 7.16 | What happened: full history, plain-words reasons, and Undo (Schedule) | NZ + Global | ✅ live |
| 7.17 | The schedule on a phone (mobile web list, native app screens) (Schedule) | NZ + Global | 🟡 merged |
| 8.1 | QR site sign-in poster and the on-site register (Build on site) | NZ + Global | ✅ live |
| 8.2 | Site induction for awarded tradies (Build on site) | NZ + Global | ✅ live |
| 8.3 | Progress, auto-start, milestones and the daily safety check (Build on site) | NZ + Global | ✅ live |
| 8.4 | Daily log with photos (a site diary that partly writes itself) (Build on site) | NZ + Global | ✅ live |
| 8.5 | Messages: project chat, direct and group, photos, files and voice notes (Build on site) | NZ + Global | ✅ live |
| 9.1 | Project documents: folders, uploads and version history (Documents & compliance) | NZ + Global | ✅ live |
| 9.2 | Search inside files (Documents & compliance) | NZ + Global | ✅ live |
| 9.3 | Share links and private folder invites (Documents & compliance) | NZ + Global | ✅ live |
| 9.4 | Compliance & process checklist (templates by job type) (Documents & compliance) | NZ + Global | ✅ live |
| 9.5 | QS reports from the SOQ: cost plan, progress claim, drawdown certificate, cost to complete (Documents & compliance) | NZ | ✅ live |
| 10.1 | Milestones: proof of work, invoice, then 'paid outside QSME' confirmed by the receiver (Pay) | NZ + Global | ✅ live |
| 10.2 | Pay a milestone with NZ open banking (bank to bank) (Pay) | NZ | 🟡 merged |
| 10.3 | Project money page: estimate vs actual, every stage, your own money in and out (Pay) | NZ + Global | ✅ live |
| 10.4 | Sheets: your own spreadsheets inside the project, linked to jobs and payments (Pay) | NZ + Global | ✅ live |
| 10.5 | NOT A FEATURE: escrow, QSME holding money, on-chain settlement, QSME-managed builds (Pay) | NZ + Global | ⬜ planned |
| 11.1 | Trade certificates and the CCC pack (one zip for council) (Handover) | NZ | ✅ live |
| 11.2 | Profile, track record and two-way ratings after a finished job (Handover) | NZ + Global | ✅ live |
| 12.1 | Sign-up paths: “I hire” or “I provide services”, with NZ business lookup (Across every stage) | NZ | ✅ live |
| 12.2 | Global edition: one platform, a second front door at app.qsme.build (Across every stage) | Global | ✅ live |
| 12.3 | Global sign-up: pick your country, get your currency, timezone and tax (Across every stage) | Global | ✅ live |
| 12.4 | Name your own tax (VAT, Sales tax, GST…) (Across every stage) | Global | ✅ live |
| 12.5 | Process templates and addresses follow the project's country (Across every stage) | Global | ✅ live |
| 12.6 | qsme.build: the global website in 15 languages (Across every stage) | Global | ✅ live |
| 12.7 | Honest security page (ISO 27001 in progress, not certified) (Across every stage) | Global | ✅ live |
| 12.8 | Book a demo and the five audience pages (global) (Across every stage) | Global | ✅ live |
| 12.9 | Enterprise options: organisation roles, white-label, embeddable tender board (Across every stage) | Global | ⬜ planned |
| 12.10 | QSME iPhone/iPad app (Across every stage) | NZ + Global | ✅ live |
| 12.11 | Bring your own AI assistant: Claude, ChatGPT, Claude Code, Codex, Cursor (MCP) (Across every stage) | NZ + Global | ✅ live |
| 12.12 | Contacts and People (your own crew list) (Across every stage) | NZ + Global | ✅ live |
| 12.13 | Everything you send goes out under your logo, not QSME's (Across every stage) | NZ + Global | ✅ live |
| 12.14 | AI credits, free-plan limits and the 14-day trial (Across every stage) | NZ | ✅ live |
| 12.15 | Knowledge Hub guides and voiceover walkthrough videos (Across every stage) | NZ + Global | ✅ live |
| 12.16 | Scroll build story on the NZ home page (three build types) (Across every stage) | NZ | ✅ live |
| 12.17 | Nightly encrypted backups and security work (Across every stage) | NZ + Global | 🟡 merged |
| 12.18 | On branches only: themes, shorter sidebar, account sign-in at the gate, push switch, download badges, SMS withdrawal (Across every stage) | NZ + Global | 🔶 branch |
| 12.19 | qsme.build homepage redesign (bento modules, floating bid chips) (Across every stage) | Global | 🔶 branch |

### 1. Find a site

#### 1.1 Homepage address check (“Search your address”)

**NZ** · **✅ live** · id `home-address-check`

**What it does.** On qsme.co.nz, before signing up, you type an address. A dark map flies to the section and outlines the LINZ boundary, and a card shows land area, legal description, council and (in four councils) the zone. In Auckland a grid of services and hazard chips appears. 'Create project here' carries the address through sign-up into a real project.

**For:** NZ homeowners, section buyers and small developers, logged out and uncommitted.

**Fact-check:** Confirmed live and public (no login). Coverage is narrower than readers implied: boundary, land area, legal description and council work NZ-wide (LINZ); the zone name appears only for Auckland, Wellington City, Christchurch and Hamilton; services and hazard chips are Auckland only. A live Dunedin test returned parcel and council only (coverage 'unsupported').

**Exact on-screen wording:**
- “Built for New Zealand developers & property owners”
- “Watch your project come to life.”
- “Search your address”
- “e.g. 12 Queen Street, Auckland”
- “Looking up the property — boundaries, zoning & services…”
- *(chips)* “Available · ~3 m / Nearby / In coverage area / Clear / Present — check / Not found nearby”
- “Create project here”
- “Free to join.”
- *(footer)* “Indicative only, from LINZ, Auckland Council, Watercare & Vector open data (CC BY 4.0). Mapped pipe positions are approximate — always lodge a beforeUdig request before any excavation. Not a substitute for a LIM, PIM or engineering advice.”
- *(outside Auckland)* “Services & hazard data isn't available for this area yet — Auckland first, more councils to come.”

**Best demo moments:**
- Cursor types an Auckland address into the glass search field; green loading line reads 'Looking up the property — boundaries, zoning & services…'.
- Map panel slides in from the right, flies to the section and draws the boundary.
- Card fills: area in m2, legal description, council, zone name in green; chips flip one by one, then an amber 'Flood plain — Present — check' (the hook shot).
- Tap 'Create project here' → sign-up → land inside a project already named after the address.

**Pains solved:** Not knowing the zone or flood risk before spending money · Having to sign up before seeing any value · Hunting across LINZ, council GIS and Watercare maps separately

**Facts you can use:**
- Public endpoints answered 200 without login on 2026-10-02
- 9 checks in Auckland: water, wastewater, stormwater, piped gas, electricity; flood plain (1%-AEP), flood-prone area, overland flow path, coastal inundation
- The address-to-project draft is kept for 1 hour while you sign up
- Land lookups are rate-limited (60 per minute per IP) and cached 24 h

**DO NOT CLAIM:**
- ⛔ That the homepage shows 'what you can build' or the full development report (that is inside the app after sign-up)
- ⛔ Zone, services or hazards for 'any NZ address' — film Auckland addresses and say 'Auckland first'
- ⛔ That it replaces a LIM, PIM or engineering advice
- ⛔ That pipe positions are exact, or that 'Clear' means the property will not flood
- ⛔ 'Instant' — lookups take seconds
- ⛔ The retired App Store wording 'Have a site? Enter the address to see what's possible'
- ⛔ A real private person's home address on screen

<sub>Evidence: Live www.qsme.co.nz; origin/main src/components/landing/cinematic/HeroCinematic.tsx, src/components/projects/SiteSnapshot.tsx, backend land_handler.go · Reported by: site research, marketing, live surface</sub>

#### 1.2 “View live projects on the map”

**NZ** · **✅ live** · id `live-projects-map`

**What it does.** A link under the homepage search opens a dark NZ map with green pins for projects their owners chose to make public.

**For:** Visitors wanting proof the platform is in use.

**Fact-check:** Confirmed. Only 2 public projects exist today, both in Auckland, so the map is nearly empty.

**Exact on-screen wording:**
- “View live projects on the map”
- “Live projects across Aotearoa New Zealand”

**Best demo moments:**
- Only as a one-second beat: the map panel animates in with green pins. Do not linger — it is sparse.

**Pains solved:** 'Is anyone actually using this?'

**Facts you can use:**
- Only projects marked public are pinned; private projects never show
- 2 public projects today

**DO NOT CLAIM:**
- ⛔ Any number of live projects, or projects 'across the country'
- ⛔ That every QSME project is on the map
- ⛔ Real project names or addresses without permission

<sub>Evidence: Live homepage; origin/main src/components/landing/hero-map.tsx · Reported by: site research</sub>

#### 1.3 Address search that understands how people actually type

**NZ** · **✅ live** · id `address-search`

**What it does.** The address box accepts shorthand ('12 mt eden rd'), a pasted address with commas, postcode and 'New Zealand', unit formats like 'Flat 2,' or '2/12', and up to three addresses at once. If the exact number is not on the LINZ register it offers the nearest real addresses tagged 'Closest match'; if nothing matches it saves the address as typed.

**For:** Everyone in the NZ edition: homeowners, developers, agents, tradies.

**Fact-check:** Confirmed (LINZ layer 123113, max 3 addresses per query, 240-character cap, search starts at 3 characters, 'Closest match' in the deployed bundle).

**Exact on-screen wording:**
- “e.g. 12 mt eden rd — shorthand works”
- “Closest match”
- “Not in the address register yet — that's fine, carry on. It will be saved exactly as typed.”
- *(mobile)* “Paste a full address — commas, postcode, even two addresses — and pick the closest match.”

**Best demo moments:**
- Type lazy shorthand and proper addresses appear with the suburb underneath.
- Paste two addresses on separate lines: results group under each one.
- Type a house number that does not exist: amber 'Closest match' rows instead of an empty dropdown.

**Pains solved:** Address boxes that reject anything not typed their way · Pasting an address from a listing or an email and having it refused · New subdivisions treated as invalid

**Facts you can use:**
- Source: LINZ NZ Addresses (layer 123113), CC BY 4.0
- Up to 3 pasted addresses; input up to 240 characters; search starts at 3 characters
- Live test: '12 mt eden rd' returned only 'Closest match' rows (10, 14, 11, 13 Mount Eden Road) — the helper text's example did not hit exactly

**DO NOT CLAIM:**
- ⛔ Demo '12 mt eden rd' as an exact hit — use it as the 'Closest match' demo or pick a verified address
- ⛔ That it finds every address (new builds and some rural lots are not on the register)
- ⛔ That it works outside NZ (global uses Google Places or typed addresses)
- ⛔ 'Paste a whole list' — the cap is three

<sub>Evidence: Commit 8fb1855d; backend address_query.go, address_search_service.go; src/components/projects/AddressAutocomplete.tsx · Reported by: site research, changelog</sub>

#### 1.4 Site research page (web, free account)

**NZ** · **✅ live** · id `site-research`

**What it does.** One page for an address: map and boundary, land area, legal description and council, what the zone allows, overlays, a development verdict, the requirements checklist, services and hazards, a rough feasibility calculator, QSME's own history at the address, and buttons to save the research, open the Pro view or create a project there.

**For:** NZ homeowners, small developers, consultants, QS and PMs doing first-pass due diligence.

**Fact-check:** Live, but 'the full picture for any NZ address' is wrong. The backend reports coverage as auckland, zone_only or unsupported: full picture = Auckland only; zone with a generic profile and no numbers = Wellington City, Christchurch, Hamilton; everywhere else = boundary, area, council and generic requirements. Login required; NZ organisations only. Default landing page for NZ clients after sign-in.

**Exact on-screen wording:**
- “Site research”
- “Type any New Zealand address — boundaries, zoning, services, hazards and history, before you commit to anything.”
- “Researching the site — boundary, zoning, overlays, services, hazards & history…”
- “Open Pro view”
- “Save this research”
- “Create project here”
- “Indicative only — a planning heuristic from public council data, not advice. Overlays, precincts, plan changes and site conditions change what's possible. Confirm with a planner or the council.”
- “Overlay data isn't loaded for this council yet — zone only.”
- “Planning data isn't available for this council yet.”

**Best demo moments:**
- Empty state: seven dashed value-prop cards — a ready-made feature-list shot.
- Pick an address: green progress bar, map on the left with the parcel in cadastre yellow, cards filling in on the right (verdict first).
- Scroll to 'Planning overlays & controls' and 'What this site would require' side by side, then the feasibility card and the grey disclaimer.
- Top-right buttons: 'Open Pro view', 'Save this research', 'Create project here'.

**Pains solved:** Paying a planner just to learn the basics about a section · Falling for a site before knowing about the flood plain, the designation or the pipe under it · Jumping between five government map viewers

**Facts you can use:**
- The development report takes 2–10 s of council GIS queries (5.5 s measured live for an Auckland address)
- Results cached 24 h
- No paywall in the site-research code; a free account is needed on the web
- Rule-based lookups of public GIS data, not AI

**DO NOT CLAIM:**
- ⛔ 'No sign-up needed' for this page (only the homepage check is public)
- ⛔ 'Any NZ address' or 'all councils' for zoning, overlays, services or hazards — and do not voice over the on-screen headline as fact
- ⛔ That it is a LIM, title search, planning advice, or replaces a planner, surveyor or council
- ⛔ 'Instant' — say 'in seconds'
- ⛔ That it is AI
- ⛔ Anything about it in a Global video

<sub>Evidence: origin/main src/components/research/SiteResearchPage.tsx, src/routes/_authenticated/site-research.tsx; deployed chunk site-research-*.js; PR #93 · Reported by: site research, changelog, marketing, live surface</sub>

#### 1.5 Zone-first zoning: “What could go here” and the coloured zoning map

**NZ** · **✅ live** · id `zoning`

**What it does.** Shows the zone in plain words: what it is for, what you can do without a resource consent, what usually needs one, and the headline rules (height, setbacks, coverage). In Auckland the map can paint every neighbouring zone in colour with a legend.

**For:** Homeowners asking 'can I add a second house or a granny flat?', developers screening sites.

**Fact-check:** Confirmed: 4 councils only; numeric rules only for Auckland; the Auckland figures match the code. They are hand-written profiles of the Unitary Plan, not a live feed, so plan changes can outdate them.

**Exact on-screen wording:**
- “What could go here”
- “Without resource consent”
- “With a resource consent”
- “general guide for this zone type”
- “Mixed Housing Suburban zone — provides for suburban intensification: standalone homes, duplexes, terraces and low-rise apartments, generally two storeys.”
- “Up to three dwellings per site that meet the zone standards — standalone, duplex or terraced”
- “Indicative only — overlays and site standards change what's possible. Confirm with the council or a planner before you rely on it.”
- “Zoning data isn't available for this council yet.”

**Best demo moments:**
- Zone badge in the map's colour, then green-dot 'Without resource consent' and blue-dot 'With a resource consent' lists reveal.
- Standards grid: 'Height — 8 m + 1 m roof (about 2 storeys)', 'Building coverage — 40% of the site', 'Yards — Front 3 m · side & rear 1 m'.
- Toggle the Zoning layer: the neighbourhood floods with zone colours and a legend (Auckland only).

**Pains solved:** District plan PDFs nobody can read · Not knowing the difference between 'permitted' and 'needs consent'

**Facts you can use:**
- Zoning sources: Auckland Unitary Plan (Operative in part), Wellington City 2024 Operative District Plan, Christchurch District Plan, Hamilton City Operative District Plan
- Auckland examples: Single House 35% coverage, 8 m + 1 m roof; Mixed Housing Suburban 40%; Mixed Housing Urban 11 m + 1 m (about 3 storeys), 45%; Terrace Housing & Apartment Buildings 16 m (about 5 storeys), 50%

**DO NOT CLAIM:**
- ⛔ Zoning for all councils (Dunedin, Tauranga and others return no zone)
- ⛔ Zone numbers for any council other than Auckland
- ⛔ 'You CAN build X' or 'no resource consent needed' as a promise
- ⛔ The coloured zoning map outside Auckland
- ⛔ Wellington demos (inconsistent in live tests)
- ⛔ That the figures are the legal rule for a viewer's own section

<sub>Evidence: backend zone_profiles.go, land_service.go councilZoneFor(); src/components/research/ZoneProfileCard.tsx · Reported by: site research</sub>

#### 1.6 Planning overlays & controls on the parcel (Auckland)

**NZ** · **✅ live** · id `overlays`

**What it does.** Checks 28 Auckland Unitary Plan layers against the actual parcel and lists everything touching it — special character, heritage, notable trees, volcanic viewshafts, precincts, designations, stormwater areas, landslide, tsunami, intensification plan changes — each with a plain line on what it means, grouped Constraints / Design around / Opportunities / Good to know.

**For:** Auckland buyers, homeowners and small developers.

**Fact-check:** Confirmed: exactly 28 Auckland layers; checked against the parcel shape. Auckland only.

**Exact on-screen wording:**
- “Planning overlays & controls”
- “Constraints”
- “Design around”
- “Opportunities”
- “Good to know”
- “No overlays, precincts or designations touch this parcel.”
- “Special Character Area — Removing or demolishing pre-1944 buildings, and new buildings, need resource consent; special-character standards replace some zone standards.”
- “Volcanic viewshaft / height-sensitive area — Building height is capped to protect views of the maunga — it can be lower than the zone allows; a height check is essential.”
- “Stormwater Management Area (Flow) — New impervious areas need on-site stormwater retention and detention (tanks or soakage) — allow for it in the design and budget.”

**Best demo moments:**
- A red row under Constraints: 'Designation · Road Widening (Auckland Transport)' — the 'nobody told me that' moment.
- Amber 'Volcanic viewshaft · Mount Eden' under Design around.
- Green 'Height Variation Control · 21m' under Opportunities.
- The calm alternative: 'No overlays, precincts or designations touch this parcel.'

**Pains solved:** The hidden overlay that kills a plan after you have paid an architect · Not knowing special-character rules protect the old villa · Missing an upzoning plan change on your street

**Facts you can use:**
- 28 overlay/control/precinct/designation/hazard layers checked per site
- Checked against the parcel polygon; notable trees use a 12 m buffer, frontage/vehicle access 4 m
- Live test of an Auckland site returned a road-widening designation, a Mount Eden viewshaft, a 21 m height control and a walkable catchment

**DO NOT CLAIM:**
- ⛔ Overlays for any council outside Auckland
- ⛔ 'Every overlay' or a complete planning check (a layer that fails to load is silently absent)
- ⛔ That a clean result means nothing restricts the site
- ⛔ That consent will be granted
- ⛔ That plan-change 'opportunities' are current entitlements

<sub>Evidence: backend planning_service.go (aucklandOverlays); src/components/research/DevelopmentCards.tsx · Reported by: site research</sub>

#### 1.7 Services & hazards snapshot (Auckland)

**NZ** · **✅ live** · id `services-hazards`

**What it does.** Nine chips: water, wastewater and stormwater (nearest public pipe, distance from your boundary, size, material), piped gas and electricity coverage, and flood plain, flood-prone area, overland flow path and coastal inundation, checked against the parcel shape so a flood plain clipping the back corner counts. Pipes and flood areas can be drawn on the map with a dashed 'Distance to boundary' line.

**For:** Auckland homeowners, buyers, small developers and tradies sizing up a site.

**Fact-check:** Confirmed: 9 checks; 'available' within 60 m, 'nearby' within 150 m. Auckland region only.

**Exact on-screen wording:**
- “Site services & hazards”
- “Available · ~3 m”
- “Nearby · ~120 m”
- “In coverage area”
- “Not found nearby”
- “Clear”
- “Present — check”
- “Nearest 150 mm VC pipe ≈ 1 m from the boundary”
- “Network covers this area — connection subject to the distributor”
- “Inside the 1%-AEP (1-in-100-year) modelled flood extent”
- “Distance to boundary”

**Best demo moments:**
- Nine chips flip from loading to green: 'Water supply — Available · ~3 m', 'Flood plain — Clear'.
- The scary one: amber 'Flood plain — Present — check' with 'Inside the 1%-AEP (1-in-100-year) modelled flood extent'.
- Map: blue water, red wastewater, green stormwater lines beside the yellow parcel, a dashed measured line to the boundary, translucent flood extent over the back of the section.

**Pains solved:** Buying a section with no wastewater main anywhere near it · Not knowing the back corner is in a flood plain or an overland flow path · Digging blind

**Facts you can use:**
- Sources: Watercare network, Auckland Council Healthy Waters, Auckland Council flood and coastal models, Vector gas and electricity network areas
- Map colours: water blue, wastewater red, stormwater green

**DO NOT CLAIM:**
- ⛔ Anything outside the Auckland region
- ⛔ That pipe positions are exact or a dig plan (the UI says lodge a beforeUdig request)
- ⛔ That gas/electricity coverage is a confirmed connection, or 'available' means an approved or free connection
- ⛔ That 'Clear' means 'flood-free', 'safe' or 'will not flood'
- ⛔ That it replaces a LIM or PIM

<sub>Evidence: backend site_info_service.go; src/components/projects/SiteSnapshot.tsx, utility-lines-overlay.tsx · Reported by: site research, live surface</sub>

#### 1.8 Site research — Pro view (full map, layers, seven tabs, title facts)

**NZ** · **✅ live** · id `site-research-pro`

**What it does.** A full-height aerial map with layer chips (Zoning, Buildings, Services, Flood & hazards) beside a tabbed panel. The Title tab shows free LINZ title facts (title number, type, estate, status, issue date, guarantee, land district, legal description) and how many owners are on the title. Building footprints are drawn on the map.

**For:** Small developers, consultants, QS/PMs and agents who look at many sites.

**Fact-check:** Confirmed on the web. Tabs on screen are Summary, Title, Zoning, Overlays, Characteristics, CV & sales, Feasibility (the changelog reader's 'Title & ownership' and 'Zoning & potential' are one-pager section names). 'Pro' is a view name, not a paid tier. CV & sales is a locked placeholder. Property ID, valuation reference and postcode are Auckland only. Reached with the 'Open Pro view' button. Phone Pro cards are merged only.

**Exact on-screen wording:**
- “Open Pro view”
- “Site research — Pro”
- “A full-height map and the full planning picture, side by side.”
- “Search any NZ address…”
- “Simple view”
- “One pager”
- *(tabs)* “Summary · Title · Zoning · Overlays · Characteristics · CV & sales · Feasibility”
- *(layers)* “Zoning · Buildings · Services · Flood & hazards”
- “1 owner on the title”
- “Available with a data licence”
- “Owner names come from a LINZ data licence.”
- “Reads as a freehold (fee simple) lot — the simplest title to develop.”
- “Indicative only — a planning heuristic from public council & LINZ data, not advice. Overlays, plan changes and site conditions change what's possible. Owner, CV and sales are licensed data. Confirm with a planner, the council or LINZ.”

**Best demo moments:**
- Click 'Open Pro view': the screen widens into a full-height aerial with the parcel and roof footprints.
- Tap the layer chips one by one: zoning colours wash in, buildings outline, service lines, flood fill.
- Click through the tab pills; land on Title: estate, issue date, guarantee and '2 owners on the title' with the amber 'Available with a data licence' pill.

**Pains solved:** Paying for a property-data subscription just to see title basics on a decent map · Explaining a site to a client without a clear visual

**Facts you can use:**
- Title facts from LINZ NZ Property Titles (layer 50804); footprints from LINZ Building Outlines (layer 101290)
- Owner count is free; owner names are not shown
- Layer chips only appear when that layer has data

**DO NOT CLAIM:**
- ⛔ Who owns the property (only the number of owners)
- ⛔ CV, land value or sale prices — the tab is locked
- ⛔ Comparisons with or names of Relab, CoreLogic, QV or homes.co.nz
- ⛔ 'Pro plan' or any price — it is a view name
- ⛔ The Pro view on the phone app
- ⛔ A demo on a non-Auckland address

<sub>Evidence: PR #99; src/components/research/pro/*; backend title_service.go; deployed chunk site-research-pro-*.js · Reported by: site research, changelog, marketing, live surface</sub>

#### 1.9 One-page site report (print or save as PDF)

**NZ** · **✅ live** · id `site-one-pager`

**What it does.** From the Pro view, 'One pager' prints (or saves as PDF) a single branded sheet: date, address, aerial map, key facts, title and ownership, zoning and potential, overlays and controls, services, flood and hazards, and the disclaimer.

**For:** Developers sharing a site with a partner, builder or lender; consultants handing a client something tangible.

**Fact-check:** Confirmed. Header reads 'QSME' with 'Site report'; it is the browser print dialog, not a generated download.

**Exact on-screen wording:**
- “One pager”
- “QSME · Site report”
- “Key facts”
- “Title & ownership”
- “Zoning & potential”
- “Overlays & controls”
- “Services”
- “Flood & hazards”
- “Not available for this area.”

**Best demo moments:**
- Click 'One pager': print preview shows a clean A4 sheet with a green rule and the aerial map.
- The printed page on a ute bonnet or kitchen bench beside a coffee.
- Save as PDF and drop it into a message to 'the builder'.

**Pains solved:** Stitched-together screenshots to explain a site · Nothing to hand a partner, lender or builder at the first conversation

**Facts you can use:**
- Uses the browser's print dialog; 'Save as PDF' is the browser's option
- Carries the Pro disclaimer

**DO NOT CLAIM:**
- ⛔ That it is a LIM, title search, valuation, or an official, certified or bank-ready report
- ⛔ 'Download a PDF report' as a dedicated export
- ⛔ That lenders or councils accept it
- ⛔ That it exists in the phone app

<sub>Evidence: src/components/research/pro/ProOnePager.tsx; commit 1a128be3 · Reported by: site research</sub>

#### 1.10 Saved sites, recent searches and research kept with the project

**NZ** · **✅ live** · id `saved-sites`

**What it does.** Every address you pick is recorded the moment you pick it. Save a site to keep it, reopen any past search with one click, and research stays attached to any project created from it. Unsaved searches lapse on their own.

**For:** People comparing several sections; developers building a shortlist.

**Fact-check:** Confirmed: 50-address cap per user; unsaved searches lapse after 90 days; mobile keeps 8 on the device.

**Exact on-screen wording:**
- “Save this research”
- “Research saved to your history”
- “Saved sites — Kept until you remove them — open one to see the full picture again.”
- “Recent searches — Lapse after 90 days — save the ones you want to keep.”
- “Jump back in”

**Best demo moments:**
- Bookmark tap → toast 'Research saved to your history'.
- The 'Saved sites' pill row: tap between three shortlisted addresses and the page swaps instantly.

**Pains solved:** Losing track of which sections you already looked at · Re-doing the same lookups

**Facts you can use:**
- Unsaved searches lapse after 90 days; saved or project-linked ones are kept
- History capped at 50 addresses per user
- Phone keeps its last 8 searches on the device only

**DO NOT CLAIM:**
- ⛔ That research is kept forever by default
- ⛔ That phone and web histories sync
- ⛔ Alerts or monitoring of saved sites

<sub>Evidence: backend site_research_handler.go; SiteResearchPage.tsx · Reported by: site research</sub>

#### 1.11 Phone “Site search” screen

**NZ** · **🟡 merged** · id `mobile-site-search`

**What it does.** A phone screen (reached as 'Site search' from Home or 'Look up a site' when logged out) that runs the same cards as the web: map with layer chips, verdict, title, zone, potential, overlays, services and hazards, locked CV & sales, requirements, rough feasibility and 'Create project here'.

**For:** People standing outside a section at an open home or on site.

**Fact-check:** Confirmed merged. The commits are dated 30 Sep and 1 Oct, after the App Store build v1.0.0 (23 Sep). An over-the-air update cannot be verified from the repo. Android is not on Google Play.

**Exact on-screen wording:**
- “Site search”
- “Look up a site”
- “Any NZ address: zone, what it allows, overlays, services and hazards, and what you could build.”
- “Paste a full address — commas, postcode, even two addresses — and pick the closest match.”
- “Verdict — Reading the council's plan — this can take a few seconds”
- “Services and hazard layers are only mapped for Auckland so far.”

**Best demo moments:**
- Once confirmed on the store app only: standing outside a section, paste the address, cards load while you walk the boundary.
- Thumb taps the map chips over satellite imagery.

**Pains solved:** Being at an open home with no idea what the section could become · Waiting until you are back at a desk to check zoning or flood

**Facts you can use:**
- Merged on origin/main (commits 31721b74, 22cc3722)
- Last 8 searches kept on the device
- 'Create project here' only shows when signed in

**DO NOT CLAIM:**
- ⛔ 'Available now in the app', or App Store/Google Play badges for it, until the owner confirms the build
- ⛔ Android
- ⛔ One-pager or the full Pro tab layout on the phone
- ⛔ That it works signed out in the store app
- ⛔ Coverage beyond the web's limits

<sub>Evidence: mobile-app/src/features/site-research/*; App Store lookup v1.0.0 released 2026-09-23 · Reported by: site research, changelog</sub>

#### 1.12 Property & investment listings (public /properties)

**NZ** · **✅ live** · id `property-listings`

**What it does.** A public page where agents' listings (for sale, for lease, investment; house, apartment, land, commercial, rural) can be browsed without logging in. Each listing is tied to its real address, with a button to open that address in Site research.

**For:** NZ buyers and investors; agents wanting listings shown with site data.

**Fact-check:** Technically live but empty: footer link and route are deployed, the page is client-rendered, the public feed returns 0 listings. Merged on 2 Oct (hours old). Nothing to film except the empty state.

**Exact on-screen wording:**
- “Property & Investment Opportunities”
- “Properties, land and development sites listed by real-estate agents on QSME — each tied to its real address, so the zoning and site data sit a click away in Site Search.”
- “No properties listed yet”
- “Real-estate agents list properties and investment opportunities here. Check back soon.”
- “Zoning & site data — See the boundary, zone, overlays and development potential for this address.”
- “Open in Site Search”
- “Price by negotiation”

**Best demo moments:**
- Honest current state only: the dashed empty box 'No properties listed yet'.
- Later, once real listings exist: listing → 'Open in Site Search' → the report for that address.

**Pains solved:** Listings that claim 'development potential' with nothing behind it

**Facts you can use:**
- 0 public listings on 2026-10-02
- Listing kinds: for sale, for lease, investment

**DO NOT CLAIM:**
- ⛔ That there are properties to browse, or any listing count
- ⛔ That QSME is a real-estate portal, or comparisons with Trade Me Property, realestate.co.nz or OneRoof
- ⛔ That the site data is visible without an account ('Open in Site Search' leads to a login)
- ⛔ Investment advice or returns
- ⛔ That agents are licensed or verified
- ⛔ Made-up listing cards presented as real

<sub>Evidence: PRs #104, #107; src/routes/properties.tsx; public API /public/property-listings empty · Reported by: site research, changelog, live surface</sub>

#### 1.13 My Listings — self-serve real-estate agent mode

**NZ** · **✅ live** · id `agent-mode`

**What it does.** Any NZ business account can switch on real-estate agent mode and create listings: pick the address (linking it to the property's site data), add price or 'Auction / POA / Offers over', beds, baths, areas, photos, status and visibility. An optional commission percentage can be recorded.

**For:** NZ agents and developers selling sites.

**Fact-check:** Deployed (not viewed signed in). Agent mode is a self-declared flag with no real-estate licence check. Commission is only a stored rate; a super-admin marks a sale; no money is collected. Do not promote until the owner confirms the legal position.

**Exact on-screen wording:**
- “Enable real-estate agent mode”
- “Real-estate agent mode on — you can list properties now”
- “Picking a suggestion links the listing to the property’s zoning & site data.”
- “Or price text — Auction / POA / Offers over”
- “Draft (hidden) / Active / Under offer / Withdrawn”
- “Our commission (%)”

**Best demo moments:**
- One click on 'Enable real-estate agent mode' → toast.
- New listing: pick the address and the helper line about zoning & site data appears.

**Pains solved:** Agents re-explaining zoning to every enquirer

**Facts you can use:**
- NZ market only (capability real_estate_listings)
- 'No payment rails yet — this is a record, not an invoice' (migration comment)

**DO NOT CLAIM:**
- ⛔ Any commission rate, 'free to list' or 'no commission'
- ⛔ That QSME verifies agent licences
- ⛔ That QSME handles the sale, deposit or settlement
- ⛔ Anything in the Global edition

<sub>Evidence: src/routes/_authenticated/my-listings.tsx; backend property_listing_service.go · Reported by: site research, changelog</sub>

#### 1.14 Owner names, CV / rating values and sale history

**NZ** · **⬜ planned** · id `licensed-property-data`

**What it does.** Not available. The Pro view has a calm locked placeholder for owner names, capital/land/improvement value and sale history, which need paid data licences that are not connected.

**For:** Future: developers, agents, buyers.

**Fact-check:** Confirmed not available: every licensed-data provider returns available:false; the switch is 'left deliberately unimplemented'. Only the owner count is shown.

**Exact on-screen wording:**
- “Available with a data licence”
- “This is licensed property data — available once a data licence is connected.”
- “Rating values (CV, land and improvement value) come from a rating-value data licence.”
- “Sale prices and history come from a sales-data licence.”

**Best demo moments:**
- Do not feature. If the CV & sales tab appears in a recording, cut around it or leave the amber pill visible; never mock values in.

**Facts you can use:**
- All three report available:false on the live API

**DO NOT CLAIM:**
- ⛔ That QSME shows who owns a property, its CV/RV, its last sale price or sales history
- ⛔ 'Coming soon' with a date
- ⛔ Mocked-up values presented as real

<sub>Evidence: backend licensed_data.go; pro-sections.tsx · Reported by: site research, changelog, live surface</sub>

### 2. Feasibility

#### 2.1 Development potential verdict and indicative yield

**NZ** · **✅ live** · id `development-potential`

**What it does.** A one-glance verdict (Strong / Good / Moderate / Limited / None) with a one-line summary, green plus-chips and amber minus-chips, and indicative figures: homes without consent, homes with consent (a range), max footprint, height and storeys, floor area, subdivision lots.

**For:** Small developers and homeowners asking 'is this section worth a closer look?'.

**Fact-check:** Confirmed. A scoring heuristic, not a design or valuation; real numbers only where an Auckland zone profile exists.

**Exact on-screen wording:**
- “Development potential”
- “Strong development potential / Good / Moderate / Limited development potential”
- “Homes without consent — subject to the zone's standards”
- “Homes with consent — indicative range”
- “Max building footprint”
- “Subdivision lots — at 400 m² minimum”
- “A viewshaft can cap height below the zone figure — the storeys above are not guaranteed.”
- “Special character rules usually mean keeping the existing house, which lowers the realistic yield.”
- “Zone not known here — Zoning isn't available for this council yet, so the development read stops at the boundary and services.”

**Best demo moments:**
- The green STRONG pill pops in, then the summary line (live example: 'Business - Mixed Use Zone — indicatively 2–5 homes here; 2 things to design around.').
- Plus/minus chips cascade: '+ High-density zone', '− Small site (209 m²)', '− Designation'.
- Number tiles count up (capture real values from a real Auckland residential site).
- Honest-limit moment: the grey NONE pill and 'Zone not known here' for an uncovered council.

**Pains solved:** 'How many houses could I fit on this?' with no idea where to start · Paying for a feasibility study on a site that was never viable · Agents' 'development potential!' with nothing behind it

**Facts you can use:**
- Five verdict levels: Strong, Good, Moderate, Limited, None
- Permitted count is capped by room to build — code comment: 'Three homes on a 200 m² site aren't real'
- Indicative floor area = footprint × storeys × 0.85
- Score from zone density, site size, overlays, hazards and services

**DO NOT CLAIM:**
- ⛔ That the home count is what you will get or what council will approve — always 'indicatively'
- ⛔ Yield numbers outside Auckland (a Christchurch commercial point returned 'indicatively 70–175 homes')
- ⛔ Valuation, appraisal, feasibility study or planning advice
- ⛔ AI — it is rule-based
- ⛔ That 'Strong' means consent will be granted
- ⛔ A verdict for every address

<sub>Evidence: backend development_analysis.go (potentialFor, verdictFor); src/components/research/DevelopmentCards.tsx · Reported by: site research</sub>

#### 2.2 “What this site would require” checklist

**NZ** · **✅ live** · id `site-requirements`

**What it does.** Lists what a build on this site would carry — consents, neighbour and authority approvals, reports and design items, costs and title checks — each tagged Required / Likely / Possible / Check, with a 'because:' line naming what on this site triggers it. Filterable to the must-haves.

**For:** First-time developers and homeowners who do not know what they do not know.

**Fact-check:** Confirmed. Outside the covered councils the list falls back to generic items (Dunedin test returned 'Resource consent — check… the zone isn't known for this point' and 'Building consent — required').

**Exact on-screen wording:**
- “What this site would require”
- “All / Required / Likely”
- “Consents · Neighbours & approvals · Reports & design · Costs & checks”
- “because: …”
- “Other cross-lease owners' consent — On a cross-lease the other flat owners must consent to any change of footprint, and the flats plan must be updated (or the title converted to fee simple first).”
- “Build-over / build-near approval — A public wastewater pipe crosses or borders the site: building within its clearance needs Watercare / Healthy Waters approval, a CCTV survey and often a pipe relocation.”
- “LIM & Record of Title — Order a LIM and the title before committing: consent notices, covenants, easements, contamination (HAIL) history and past consents change what is possible.”
- “Granny flat without consent — Under the national granny-flat rules a detached minor unit up to 70 m² can often be added without resource consent (and with a simplified building pathway) where the site meets the conditions.”

**Best demo moments:**
- Red REQUIRED badges stack down the card; tap the Required filter and the list collapses to the must-haves.
- Zoom on an italic 'because: Cross-lease title' or 'because: Pipe on the site'.
- Split screen: a hopeful face vs the checklist scrolling ('so… just a few things then') — humour at the situation.

**Pains solved:** Surprise costs and approvals found after purchase (contributions, geotech, build-over, neighbours) · Cross-lease and unit-title owners not realising they need others' consent · Not knowing which specialists to call

**Facts you can use:**
- Four levels and four groups
- Tenure is read from the legal description wording (flat → cross-lease, unit → unit title) — a clue, not a title search
- Contributions wording: 'commonly tens of thousands of dollars per home. Check the current schedules.'

**DO NOT CLAIM:**
- ⛔ That the checklist is complete, official, or legal/planning advice
- ⛔ Auckland bodies (Watercare, Auckland Transport, Healthy Waters) for non-Auckland sites
- ⛔ Specific contribution amounts
- ⛔ That QSME 'checked the title'
- ⛔ 'Build a granny flat with no consent' — the line is conditional

<sub>Evidence: backend development_analysis.go requirementsFor(); DevelopmentCards.tsx RequirementsCard · Reported by: site research</sub>

#### 2.3 Rough feasibility calculator (“Your numbers, our arithmetic.”)

**NZ** · **✅ live** · id `feasibility-calculator`

**What it does.** A simple calculator under the report, prefilled with the home count from the yield and NZ starting defaults. You enter land price and sale price per home, tweak build cost, home size, contributions, soft costs and finance, and it shows cost, revenue, profit, margin on cost — and what you could pay for the land to keep a 20% margin.

**For:** Small developers, homeowners thinking of subdividing, agents and consultants doing a back-of-envelope.

**Fact-check:** Confirmed defaults and wording in the deployed chunk. Land price and sale price start at 0 — the user supplies them.

**Exact on-screen wording:**
- “Rough feasibility”
- “Your numbers, our arithmetic.”
- “Land price”
- “Homes — prefilled from the report”
- “Build cost per m² — edit to your builder's rate”
- “Contributions per extra home — council development contributions + Watercare growth charge”
- “Sale price per home”
- “Margin on cost”
- “What you could pay for the land to keep a 20% margin:”
- “enter a sale price”

**Best demo moments:**
- Type a land price and a sale price: Profit and Margin flip from '—' to a green or red number.
- Change homes from 3 to 5 and watch it recalculate.
- The green box 'What you could pay for the land to keep a 20% margin' — the anti-FOMO auction moment (label numbers 'illustrative').
- Margin turns red under 20%.

**Pains solved:** Overpaying for land because the numbers were never run · Spreadsheet-phobia · Forgetting contributions, soft costs and finance

**Facts you can use:**
- Defaults (editable): 110 m² average home, $4,000/m² build, $30,000 contributions per extra home, 15% soft costs, 8% finance, 20% target margin
- Contributions charged on homes minus one (existing dwelling)
- Rounded to the nearest $1,000; same unit-tested function on web and phone

**DO NOT CLAIM:**
- ⛔ That QSME tells you the profit, values the land or knows sale prices
- ⛔ That the defaults are QSME cost data, market rates or a quote
- ⛔ A full feasibility study (no GST, tax, holding period or sales commission)
- ⛔ Made-up profits as a promise — show 'illustrative numbers' on screen
- ⛔ Financial or investment advice
- ⛔ Anything in a Global video (NZD, Watercare wording)

<sub>Evidence: src/components/research/FeasibilityCard.tsx, feasibility.ts; commit f85cd57f · Reported by: site research, changelog</sub>

#### 2.4 From address to project: “Create project here” and “At this address on QSME”

**NZ** · **✅ live** · id `create-project-here`

**What it does.** One button turns the researched address into a project with the address, map position and LINZ property link filled in. A card shows what QSME already knows about that address — your projects there, public projects, a count of others' private projects, any active listing, and a timeline. An existing project at the address is flagged, not blocked.

**For:** Homeowners and developers moving from looking to doing.

**Fact-check:** Confirmed in the deployed chunk; the button reads 'Create another project here' when you already have one there.

**Exact on-screen wording:**
- “Create project here”
- “Create another project here”
- “At this address on QSME”
- “No QSME record for this address yet — create the first project here and start its history.”
- “There is already a project at this address”
- “That's fine — renovations, new stages and second jobs at the same place are normal. Continue if this is a new piece of work.”
- “+ 2 private projects by others”

**Best demo moments:**
- Click 'Create project here': the dialog opens with the address and chips filled; the project page opens with the research attached.
- The amber 'There is already a project at this address … That's fine' notice.
- Bridge shot into estimate, tender and schedule.

**Pains solved:** Re-typing the same address into every tool · Research and the job living in different places · Duplicate projects for the same house

**Facts you can use:**
- Matched on the LINZ property record, not address text
- Others' private projects only ever appear as a count
- Free plan: one active project for owners

**DO NOT CLAIM:**
- ⛔ That QSME has build history or ownership records for NZ properties (the card is QSME's own activity and is usually empty)
- ⛔ 'Verified owner' — ownership claims are user-lodged
- ⛔ That others' private projects are visible
- ⛔ 'Unlimited projects free'

<sub>Evidence: SiteResearchPage.tsx, ProjectCreateDialog.tsx; backend property_service.go · Reported by: site research</sub>

### 3. Estimate

#### 3.1 Schedule of Quantities (SOQ): pockets, jobs, lines, your own columns and formulas

**NZ + Global** · **✅ live** · id `soq`

**What it does.** You price the whole job in one sheet: a pocket per trade, jobs inside it, and material and labour lines with quantity, unit and rate. Add your own columns (supplier, waste %, cost code) and Excel-style formulas; totals add themselves up. Tenders, the schedule and contracts are all cut from it.

**For:** NZ: owners, small developers, builders. Global: estimators, QS/PM practices, main contractors.

**Fact-check:** Confirmed against the live Knowledge Hub.

**Exact on-screen wording:**
- “SOQ”
- “Sheet / Classic”
- “Add a pocket”
- “A pocket is a trade category — it becomes a tender package. It starts as a Draft; activate it when it's part of the real bill.”
- “Grand total”
- “Draft / Active”
- “Activate all drafts”
- “Nothing here yet — Add the first pocket to start pricing this project.”
- *(qsme.build)* “Pockets, jobs and lines with your own columns and formulas. Import from Excel, save templates, export on demand.”
- *(qsme.build)* “Nothing is re-keyed.”

**Best demo moments:**
- Type a quantity and a rate: line, job, pocket and Grand total tick up in one move.
- Add a 'Waste %' column, then a formula column, and every line works itself out.
- Type a broken formula: the box says in words what is wrong ('a bracket is still open').
- Flip a pocket from Draft (blue) to Active (green).

**Pains solved:** A pricing spreadsheet nobody else can read or tender from · Re-typing the estimate into tender, schedule and contract · Not knowing whether the total includes half-finished drafts

**Facts you can use:**
- Free plan: 2 tender pockets and 3 sheets per project
- Up to 100 own columns per project
- Column types: Text, Number, Money, Percent, Date, Pick from a list, Tick box, Formula
- In QSME the SOQ is the estimate; BOQ means actuals from the money ledger

**DO NOT CLAIM:**
- ⛔ That QSME measures your building ('QSME does not measure your building for you')
- ⛔ Calling it a BOQ
- ⛔ Unlimited pockets on the free plan
- ⛔ A rate book, price library, SOQ revisions or drawing measurement (unmerged branches)
- ⛔ That QSME supplies rates or a cost database
- ⛔ Old blog lines like 'costed in minutes' or 'NZ-standard ANZSMM'

<sub>Evidence: src/features/boq-workspace/*; public/knowledge-base/articles/soq.md; qsme.build /platform/estimating · Reported by: money, marketing, live surface</sub>

#### 3.2 SOQ in and out: Excel/CSV import, Excel/CSV/PDF export, templates

**NZ + Global** · **✅ live** · id `soq-import-export`

**What it does.** Drop in an Excel or CSV estimate and it lands as draft pockets, jobs and lines, with extra columns offered to keep. Export as Excel, CSV or a printable PDF on your letterhead. Save a whole schedule as a template.

**For:** Anyone with an existing estimating spreadsheet; builders pricing the same house type again.

**Fact-check:** Confirmed: .xlsx or CSV up to 12 MB, no old .xls, everything lands as draft pockets, templates private to the account.

**Exact on-screen wording:**
- “Import a schedule from Excel or CSV”
- “We also found these columns”
- “Imported 6 pockets and 84 lines as drafts”
- “Excel (.xlsx) — Clean workbook, incl. custom columns / CSV — Plain rows — imports straight back / PDF — Printable — widens to fit your columns”
- “Templates → My templates — Save this schedule, or insert one you saved before”
- “Residential new build — Scaffolds the 7 standard NZ packages”

**Best demo moments:**
- Drag an .xlsx onto Import: the toast and the sheet filling with pockets and jobs.
- 'We also found these columns': tick Supplier and Cost code.
- Export to Excel, change three rates, import the same file back.

**Pains solved:** Re-keying an Excel estimate · Rebuilding the same schedule every job

**Facts you can use:**
- Subtotal and Grand Total rows are skipped on import
- 11 built-in BOQ template files ship with zero rates

**DO NOT CLAIM:**
- ⛔ Import of .xls or other estimating packages' files
- ⛔ That any spreadsheet layout imports perfectly
- ⛔ The '7 standard NZ packages' template in Global videos
- ⛔ That templates contain market rates

<sub>Evidence: workspace-toolbar.tsx, import-columns-dialog.tsx; soq.md · Reported by: money</sub>

#### 3.3 Read my plans / Plan index: consent pack split into sections

**NZ + Global** · **✅ live** · id `read-my-plans`

**What it does.** Pick a PDF drawing set or consent pack and QSME splits it into its real sections (site plan, floor plans, elevations, bracing, drainage, specifications, schedules), writing each out with tables intact. Sections appear as they are read; anything unreadable is marked 'not shown'. When done it says what it did not find.

**For:** NZ: owners, developers and builders with a consent pack. Global: teams with a drawing set.

**Fact-check:** Confirmed: 300 pages, 40 sections, 1 AI credit per 10 pages, PDF only under 50 MB, paid plan or trial. 'Read my plans' and 'Plan index' are in the live bundle. Do not repeat the homepage's 'nothing is guessed' as a guarantee.

**Exact on-screen wording:**
- “Upload the consent pack. Your project can talk.”
- “QSME reads your drawings — every sheet, every schedule — and turns them into a project you can ask. Answers cite the exact page.”
- “Read my plans”
- “Plan index”
- “Read a document”
- “Pick a PDF and QSME reads it into sections — floor plans, bracing, drainage, schedules — ready for pricing and questions. Uses AI credits: 1 per 10 pages.”
- “Finding the sections…”
- “4 of 11 sections ready”
- “Stopped — nothing was read, so your AI credits were returned.”
- *(notification)* “Your plans have been read — N sections ready to explore. Heads up: no bracing, drainage found in this pack.”

**Best demo moments:**
- Press 'Read a document', pick the pack: 'Finding the sections…' then chips appear — 'Floor plans p.4–7', 'Bracing p.12–14', 'Drainage layout p.22–24'.
- Tap a chip: a window schedule reproduced as a real table.
- The phone notification 'Heads up: no drainage found in this pack' — found before the tender went out.
- Wrong file? Stop → credits returned.

**Pains solved:** A 120-page consent pack nobody reads end to end · Finding the bracing or window schedule buried mid-set · Discovering a missing drainage sheet after the tender went out

**Facts you can use:**
- 1 AI credit per 10 pages (a 60-page pack costs 6)
- PDF only, up to 300 pages and 50 MB; up to 40 sections
- Refunded if it fails; retrying one failed section is free
- Paid plans or the 14-day trial; 'can take a few minutes'

**DO NOT CLAIM:**
- ⛔ That it measures drawings or does takeoff — it reads what the drawings say
- ⛔ 'Instant'
- ⛔ Free, or on the free plan
- ⛔ '100% accurate' or 'nothing is guessed' as a guarantee
- ⛔ Reading Word, images or CAD (PDF only)
- ⛔ The Plan index in the phone app
- ⛔ 'Open drawing' or mark-up buttons (switched off)
- ⛔ 'Consent pack' in Global videos — say 'drawing set'

<sub>Evidence: src/features/drawings/plan-index-card.tsx; backend pocket_analysis_service.go; knowledge-base documents.md · Reported by: docs, marketing, changelog, live surface</sub>

#### 3.4 Ask the plans: AI chat that labels where every number came from (Beta)

**NZ + Global** · **✅ live** · id `ai-chat`

**What it does.** A project chat that answers from the plans it has read, the project's data and general knowledge, and labels figures 'From your documents (name, page)', 'From your project' or 'My estimate'. If nothing has been read yet a banner says so and offers to read the plans first.

**For:** Project owners only.

**Fact-check:** Live, with a correction the reader missed: the chat carries a Beta tag and the line 'We're still working on this one. It can get things wrong, so check anything you're going to price or sign off.' (added 22 Sep after about half of real messages were being rejected). The three source labels are an instruction in the AI's prompt, not enforced by software.

**Exact on-screen wording:**
- “Chat with AI”
- “I haven't read this project's drawings yet, so anything about quantities or rates will be my estimate. Let me read your plans and I'll answer from the actual sheets.”
- “I've read 2 documents (14 sections). I'll answer from them, and tell you when something is my estimate instead.”
- “From your documents (Architectural set, p.12)”
- “From your project”
- “My estimate”
- “We're still working on this one. It can get things wrong, so check anything you're going to price or sign off.”

**Best demo moments:**
- Ask 'What cladding is specified?': the answer carries 'From your documents (Architectural set, p.12)'.
- A table with a Source column mixing 'From your documents' and 'My estimate'.
- Ask something not on the drawings: the reply says 'not shown' instead of inventing a number.

**Pains solved:** Generic chatbots confidently inventing rates · Not knowing which numbers came from the drawings

**Facts you can use:**
- Owner-only
- Metered: each reply uses AI credits (free plan: 5 trial uses by default)
- Tables export to CSV

**DO NOT CLAIM:**
- ⛔ That the AI is always right, never guesses or always cites the page
- ⛔ Hiding the Beta tag if the chat is the hero of a video
- ⛔ That it measures drawings or gives a QS-certified estimate
- ⛔ That tradies or invited members can use it
- ⛔ That it is a country-aware expert for Global (it defaults to NZ terms and NZD)
- ⛔ Fabricated page citations in mock-ups

<sub>Evidence: backend chat_service.go; src/features/ai-chat/*; commit 699182f2 · Reported by: docs, changelog</sub>

#### 3.5 Project facts: QSME quietly takes in every uploaded document (free)

**NZ + Global** · **✅ live** · id `project-facts`

**What it does.** Separately from plan reading and at no credit cost, QSME takes in each uploaded document — summary, scope items, quantities, specifications, exclusions, open questions — which feeds chat answers and SOQ suggestions. A strip appears only when a document has not been taken in, is out of date or failed.

**For:** Every project owner.

**Fact-check:** Confirmed.

**Exact on-screen wording:**
- “Project facts”
- “QSME hasn't taken in the details of 1 document.”
- “Take it in / Take them in”
- “Out of date (new version)”

**Best demo moments:**
- Upload a quote PDF; later the chat mentions an exclusion from it without being pointed at the file.

**Pains solved:** An exclusion buried on page 3 of a quote nobody remembered

**Facts you can use:**
- Free, separate from the per-page plan-reading charge

**DO NOT CLAIM:**
- ⛔ That it catches every exclusion or risk
- ⛔ A legal or contract review
- ⛔ That it understands every document

<sub>Evidence: src/features/drawings/project-facts-strip.tsx; knowledge-base documents.md · Reported by: docs</sub>

#### 3.6 Draft SOQ with AI

**NZ + Global** · **✅ live** · id `draft-soq-ai`

**What it does.** Describe the job or attach drawings and the assistant drafts a schedule of quantities onto the sheet as 'AI draft' pockets you keep, edit or discard. If the plans are not read yet it warns the numbers will lean on generic assumptions.

**For:** Owners, developers, QS/PMs and main contractors starting an estimate.

**Fact-check:** Confirmed; drafts land as draft pockets.

**Exact on-screen wording:**
- “Draft SOQ with AI”
- “The assistant drafts a measured Schedule of Quantities straight onto the sheet as AI-draft pockets — keep, edit or discard them.”
- “QSME has read all of these — quantities and rates will come off your own drawings.”
- “QSME hasn't read 1 of these files yet. It will still work, but the quantities and rates will lean on generic assumptions instead of your drawings.”
- “Read them first”
- “AI draft · Keep”
- “Pocket kept — it's now part of your SOQ”
- *(qsme.build)* “Draft with AI, then check — Every draft is a suggestion for a person to check, not a figure to trust.”

**Best demo moments:**
- Tick the plan set (chip 'Plans read'), choose New build, press Draft: pockets appear with an 'AI draft' badge.
- Press Keep on one, discard another — always show the review step.
- Amber warning for an unread PDF with 'Read them first'.

**Pains solved:** Starting an estimate from a blank spreadsheet · Estimates built on 'typical' numbers instead of what is drawn

**Facts you can use:**
- Uses AI credits
- Drafts are draft pockets until kept

**DO NOT CLAIM:**
- ⛔ A finished, tender-ready or bank-ready estimate in one click
- ⛔ Market-accurate rates or a live price database
- ⛔ That it measures drawings (the on-screen word 'measured' must be paired with 'you check it')
- ⛔ That AI replaces a quantity surveyor
- ⛔ That reading drawings is free

<sub>Evidence: src/locales/en/soq.json (aiDraft); commits b6062b9d, 15e8eab1 · Reported by: docs, money</sub>

#### 3.7 Estimate with AI (prices only the unpriced lines, flagged for review)

**NZ + Global** · **✅ live** · id `estimate-ai`

**What it does.** On a scoped SOQ, the AI asks finish level and region, then fills indicative quantities and rates into the unpriced lines only. Every AI-priced line carries a sparkle until a person edits it, and a banner counts how many are still unreviewed.

**For:** Owners wanting a first budget; QS/PMs wanting a starting point to correct.

**Fact-check:** Confirmed.

**Exact on-screen wording:**
- “Estimate with AI”
- “What level of finish? Basic / budget · Standard · High-end”
- “Where is the project? e.g. Auckland, New Zealand”
- “The AI prices only the unpriced lines, grounded in your project documents. Every figure is marked as AI-estimated for you to review. This uses AI credits.”
- “3 lines priced by AI and not yet reviewed — double-check the figures (marked with ✦ in the sheet) before relying on them.”

**Best demo moments:**
- Empty rate cells fill with sparkle icons and the total ticks up.
- Edit one AI rate by hand: the sparkle disappears and the counter drops.

**Pains solved:** No idea what the job should cost before talking to trades · Fear of trusting AI numbers blindly

**Facts you can use:**
- Only unpriced lines are touched
- Three finish levels

**DO NOT CLAIM:**
- ⛔ That the figures are quotes, firm prices, market rates or QS-verified
- ⛔ Regional pricing accuracy (prompt examples use Auckland rates; no local knowledge for other countries)
- ⛔ That it overwrites rates the user entered

<sub>Evidence: src/features/boq-workspace/components/ai-estimate-dialog.tsx · Reported by: docs</sub>

#### 3.8 Extract with AI: turn a cost plan or feasibility PDF into your SOQ

**NZ + Global** · **✅ live** · id `extract-ai`

**What it does.** Pick an uploaded cost document and the AI reproduces it as your SOQ using the document's own sections, lines, quantities and prices, as draft pockets. It keeps the document's numbers rather than applying its own rates.

**For:** Developers and owners with a QS cost plan or feasibility PDF.

**Fact-check:** Confirmed.

**Exact on-screen wording:**
- “Extract with AI”
- “Reproduce an uploaded cost document — a feasibility study, cost plan or estimate — as your SOQ, using its own sections, line items, quantities and prices.”
- “The AI keeps the document's own numbers exactly — it doesn't re-measure or apply generic rates. This uses AI credits.”
- “Reproduce”

**Best demo moments:**
- A PDF cost plan on one side, press Reproduce, the same sections appear as draft pockets; zoom on one matching line.

**Pains solved:** Re-typing a 40-line cost plan · A feasibility study that never becomes the working budget

**Facts you can use:**
- Lands as draft pockets for review
- Uses AI credits

**DO NOT CLAIM:**
- ⛔ That QSME produces an AI feasibility study or tells you whether a deal stacks up
- ⛔ That the copy is guaranteed identical — check it
- ⛔ That the site-research calculator is AI

<sub>Evidence: src/features/boq-workspace/components/ai-extract-dialog.tsx · Reported by: docs</sub>

#### 3.9 Create units with AI (unit schedule from documents)

**NZ + Global** · **✅ live** · id `create-units-ai`

**What it does.** Pick the drawings or specs and the AI pulls out the units (dwellings, blocks, floor areas, bedrooms) for you to review and save to the project.

**For:** Developers of townhouses and apartments.

**Fact-check:** Web deployed. The phone screen is in main but not confirmed in the App Store build.

**Exact on-screen wording:**
- “Create units with AI”
- “Pick documents (drawings, plans, specs) and the AI will extract the units.”
- “Units to create (6)”
- “Save 6 units to project”
- “The AI couldn't find unit details in these documents.”

**Best demo moments:**
- Tick two PDFs, 'Reading documents…', a list 'Units to create (6)', press save and the project shows six units.

**Pains solved:** Typing a unit schedule by hand

**Facts you can use:**
- Nothing is saved until the user presses save

**DO NOT CLAIM:**
- ⛔ That it always finds every unit
- ⛔ That floor areas are measured
- ⛔ The phone version until checked on the store app

<sub>Evidence: src/features/ai-chat/components/extract-dialog.tsx; mobile-app/src/app/ai-units/index.tsx · Reported by: docs</sub>

#### 3.10 Take the index with you: copy, save as text, save pages as their own PDF

**NZ + Global** · **✅ live** · id `plan-index-export`

**What it does.** From any read section you can copy the text, save it as a text file in Documents, save the whole index, or cut just that section's pages into a new PDF.

**For:** Anyone handing a clean extract to a tradie, engineer or another AI.

**Fact-check:** Confirmed in main.

**Exact on-screen wording:**
- “Copy”
- “Copied — paste it anywhere, including another AI.”
- “Save as text file”
- “Save index”
- “Save these pages as a file”
- “Saved to Documents → Plan index as “{name}”.”
- “This PDF resists page-splitting (it may be protected). Use “Save as text file” instead — the content is the same.”

**Best demo moments:**
- Open 'Bracing', press 'Save these pages as a file': a 3-page PDF appears in Documents → Plan index.

**Pains solved:** Emailing the whole pack when the roofer needs three pages

**Facts you can use:**
- Protected PDFs may refuse page-splitting; the text save still works

**DO NOT CLAIM:**
- ⛔ That page-splitting works on every PDF
- ⛔ A certified transcription

<sub>Evidence: src/features/drawings/plan-index-card.tsx · Reported by: docs</sub>

#### 3.11 Drawing mark-up / takeoff viewer (switched off)

**NZ + Global** · **🟡 merged** · id `drawing-markup-off`

**What it does.** A viewer for circling, boxing and pinning notes on drawings and attaching the mark-up to a bid. Hidden in all five entry points by one flag.

**For:** Nobody right now.

**Fact-check:** Confirmed: code is in main but DRAWINGS_VIEWER_ENABLED = false since 2026-09-04 hides it everywhere. The live Knowledge Hub says 'Marking up drawings is switched off at the moment — it was not up to standard and is being rebuilt.' The live qsme.build tendering page still says bidders can 'mark up the drawings' — that copy is ahead of the product.

**Exact on-screen wording:**
- “Marking up drawings is switched off at the moment — it was not up to standard and is being rebuilt. Point bidders at pages instead, which does the same job for pricing.”

**Facts you can use:**
- One flag hides it in the documents menu, plan index, bid form, bid view and drawing reference links

**DO NOT CLAIM:**
- ⛔ Circling, marking up, measuring or taking off quantities on a drawing
- ⛔ That bidders attach marked-up drawings to bids
- ⛔ The qsme.build line 'mark up the drawings'

<sub>Evidence: src/features/drawings/flags.ts; commit 9a3097f3 · Reported by: docs, money, live surface</sub>

#### 3.12 Not yet: bid levelling matrix, variations workflow, cash flow, rate book, SOQ revisions, drawing measurement

**NZ + Global** · **🔶 branch** · id `estimating-not-yet`

**What it does.** Six 'Estimating Pro' pieces exist only as unfinished branches: a cross-bid line comparison, a variations service, a cash-flow calculation, a rate book, SOQ revisions with a diff, and a measurement engine.

**For:** Guardrail for the video team.

**Fact-check:** Confirmed branch-only: est/levelling, est/extras, est/revisions, est/ratebook and est/measure are each 2 commits ahead of main, dated 2026-09-17, labelled WIP. None merged.

**Exact on-screen wording:**
- *(what is real today for variations)* “the 'Variation' agreement template and the 'Variations register' sheet layout”

**Best demo moments:**
- For variations today: start a 'Variation' from QSME templates in Agreements and send it for signing; or show a 'Variations register' sheet.

**Facts you can use:**
- Milestones cannot be added or changed after a contract is made, so a variation does not change the contract sum in the system

**DO NOT CLAIM:**
- ⛔ A grid comparing each bidder's rate on each line
- ⛔ That a signed variation updates the contract value, milestones or money page
- ⛔ Cash-flow forecasts, a built-in rate library, estimate version history, or automatic takeoff
- ⛔ Teasing any of these as 'coming soon' without the owner's say-so

<sub>Evidence: git branch -r --no-merged origin/main · Reported by: money</sub>

### 4. Tender

#### 4.1 Tender cut from an SOQ pocket: private or public, invitations and share link

**NZ + Global** · **✅ live** · id `tender-from-pocket`

**What it does.** Turn a priced pocket into a tender in four steps: its jobs and lines become the scope, you choose who can find it, set dates and a suggested payment schedule with retention, state whether prices include GST, and invite people from your contacts or copy a link. NZ tenders can be Private, Public, or Public aimed at trades; global tenders are always private and by invitation.

**For:** NZ owners, developers and builders going out for quotes; global main contractors tendering subcontract packages and QS/PM practices running procurement.

**Fact-check:** Confirmed: invitations last 30 days, deadline enforced, owner-only share link exists, global tenders are always stored private (the public/private choice is hidden). The embeddable tender board is not built.

**Exact on-screen wording:**
- “Create New Tender”
- “Who can find it — Public: Published on QSME. Choose the trades it's for, or leave it open to anyone. / Private: Only the people you invite can see it. No trades to choose — you pick the people.”
- “SOQ jobs to include (optional) — Bidders will see these and add their own values. Only active SOQ pockets are listed — draft pockets stay hidden until you activate them.”
- “Suggested payment setup — This becomes the default tender payment proposal. Bidders can agree to it or counter it in their bid.”
- “Do your prices include GST? — Bidders price against this and it is fixed onto their bid, so say it before anyone quotes.”
- “Send Tender Invitations”
- “Starts after “Framing” finishes”
- *(global)* “Tenders you have been invited to bid on. Tendering on QSME is by invitation.”
- *(global)* “Copy link”
- *(qsme.build)* “Cut a private tender from a pocket. Invited bidders price the same lines. Your rates and budget are never shown.”

**Best demo moments:**
- Step 3: tick 'Select whole pocket' on Plumbing and the jobs become the scope ('3 of 3 selected').
- Payment step: press 50-50 or 30-30-40, set Retention 5% and the steps rebalance.
- Invite three contacts; one shows 'QSME member — they'll be told in the app'.
- Edit an open tender: '2 bid(s) are in on this scope. Change it and everyone still in the running is told what moved.'
- Global: 'Copy link' → paste into an email to a subcontractor; status chips Invited → Viewed → Accepted.

**Pains solved:** Five quotes that each priced a different reading of the job · Texting plans to tradies and hoping they quote the same thing · Not wanting a package or budget visible to the whole market

**Facts you can use:**
- Invitations last 30 days, by email and in the app
- Deadline enforced; scope can change until award and bidders are told
- No listing fee on tenders
- Only Active pockets can be tendered
- Global: a tender marked public by a global organisation is stored private

**DO NOT CLAIM:**
- ⛔ Global: a public tender board, 'post it to the market', a marketplace or a subcontractor directory
- ⛔ An embeddable tender board on your own website ('Enterprise plan — ask sales', not built)
- ⛔ A Q&A thread on a tender (questions go through Messages)
- ⛔ That draft pockets are tendered
- ⛔ NZ: a busy public board (2 open tenders today)
- ⛔ That main contractors can bid on the NZ free plan

<sub>Evidence: src/components/advanced-tender-management.tsx; routes_tenders.go; docs/GLOBAL_EDITION.md; qsme.build /platform/tendering · Reported by: money, global, changelog, live surface</sub>

#### 4.2 Tenders point each trade at the right sheets

**NZ + Global** · **✅ live** · id `drawing-page-references`

**What it does.** When creating a tender, tick the plan sections the work is about. Bidders see 'Referenced drawing pages' with label, document and page range. If the document is replaced, the reference warns that pages may have moved.

**For:** Anyone issuing a tender, and the trades pricing it.

**Fact-check:** Confirmed. References are plain rows naming document and page range; they do not open a drawing viewer (viewer is off).

**Exact on-screen wording:**
- “Point them at the right sheets”
- “From your indexed plans — tick the sections this work is about. Bidders jump straight to those pages.”
- “Referenced drawing pages”
- “pages may have moved”
- “The pack has a newer version since this was referenced — check the pages still match.”

**Best demo moments:**
- Tender for 'Plumbing and drainage': suggested 'Drainage layout — p.22–24'; tick two boxes.
- Upload a new version of the pack: the bidder's reference shows the amber 'pages may have moved'.

**Pains solved:** A subcontractor pricing the wrong sheet or an old revision · Sending the whole pack to every trade

**Facts you can use:**
- References pin the document version

**DO NOT CLAIM:**
- ⛔ Bidders clicking through into a drawing viewer on the exact page
- ⛔ Bidders marking up drawings
- ⛔ That suggestions are always complete

<sub>Evidence: src/features/drawings/relevant-pages-picker.tsx, drawing-references-list.tsx; commit 604b010a · Reported by: docs</sub>

#### 4.3 What a bidder sees and how they price (rates and budget never shown)

**NZ + Global** · **✅ live** · id `bidder-view`

**What it does.** The bidder opens the tender and sees line descriptions, units and the owner's estimated quantities, never the owner's rates or budget. They quote one total or itemise with their own quantities and rates, give start and end dates, attach documents, and can counter the payment stages.

**For:** Tradies, subcontractors and suppliers (NZ); invited subcontractors (global).

**Fact-check:** Live except one part: drawing mark-ups are switched off, so bidders can attach documents but cannot mark up drawings. 'Bid free' applies to tradies, subcontractors and suppliers; NZ main contractor accounts see 'GC Pro is required to view opportunities'.

**Exact on-screen wording:**
- “How do you want to price this bid?”
- “Total price — Quote one all-in price for the whole job. Fast and simple.”
- “Itemize — Break the work into materials and labour lines.”
- “Est Qty / Bid Qty / Rate ($) / Total Cost ($)”
- “Invited bid: free to submit — The client invited you directly, so no wallet credits are charged for this proposal.”
- “Your progress is saved automatically on this device until you submit.”
- “We restored your saved draft — pick up where you left off.”
- “Review & submit → Confirm & submit”

**Best demo moments:**
- Split screen: the owner's SOQ with rates on the left, the bidder's view of the same lines on the right with the rate column empty.
- Bidder toggles 'Total price' to 'Itemize' and the lines appear ready to price.
- Close the tab mid-bid, reopen: 'We restored your saved draft'.

**Pains solved:** Clients worried their budget leaks to bidders · Tradies quoting blind from a one-line text · Losing an afternoon's pricing to a closed tab · Payment terms dictated rather than negotiated

**Facts you can use:**
- Rates, amounts and budget are stripped server-side, not hidden in the interface
- Proposed start and end dates are required
- A winning bidder's counter payment schedule becomes the contract milestones

**DO NOT CLAIM:**
- ⛔ That bidders can see or match the budget
- ⛔ That the owner's quantities are measured or guaranteed
- ⛔ That bidders mark up drawings
- ⛔ That everyone bids free (NZ main contractors need GC Pro)
- ⛔ Any credit cost for public bids (unresolved conflict)
- ⛔ The bid form in the iOS app (not checked)
- ⛔ That every bid is itemised

<sub>Evidence: src/components/tender-bid-view.tsx; src/locales/en/bids.json; docs/PAYMENTS_AND_ACCESS.md §3 · Reported by: money, global, live surface</sub>

#### 4.4 Live Tenders board (public, by region)

**NZ** · **✅ live** · id `public-tender-board`

**What it does.** Anyone can browse open NZ tenders without logging in — title, location, reference and closing date — and sign up free to quote. Each of 12 regions has its own page.

**For:** NZ tradies, subcontractors and suppliers looking for work.

**Fact-check:** Confirmed live with 2 open tenders, both Auckland. At least one was created by the repo's App Store reviewer seed script (demo data); the other looks the same kind.

**Exact on-screen wording:**
- “Live Construction Tenders in New Zealand”
- “Bid on real New Zealand construction projects. Browse open tenders with their scope, budget and deadlines, then submit a competitive quote directly to the project owner.”
- “Sign up free to submit a quote.”
- “2 open tenders”
- “Open · Closes in 13 days”
- “Prices exclude GST”
- “Sign up to submit”

**Best demo moments:**
- Mechanism only: a tender card with the green 'Open' badge, 'Prices exclude GST' and a countdown; the region chips.

**Pains solved:** Tradies finding work only through word of mouth and Facebook groups

**Facts you can use:**
- 2 open tenders on 2026-10-02 (Auckland townhouse interior packages closing 15 Oct 2026)
- 12 region pages; only Auckland has content
- Tender visibility: Private, Public no trades named, Public aimed at trades

**DO NOT CLAIM:**
- ⛔ Any tender count, 'hundreds of tenders' or 'across the country'
- ⛔ Filming the two listed tenders as real customer jobs
- ⛔ That bidders see the budget (the page copy says 'budget'; the tender page shows none)
- ⛔ 'Real New Zealand projects, live now' as proof of demand
- ⛔ Anything in a Global video

<sub>Evidence: Live www.qsme.co.nz/tenders; src/routes/tenders.tsx; scripts/seed-review-account.mjs · Reported by: people, live surface, marketing</sub>

#### 4.5 Browse Projects (public project pages)

**NZ** · **✅ live** · id `browse-projects`

**What it does.** Owners can make a project public; visitors see name, location, type and stage, by region, and sign in to bid on or follow it.

**For:** NZ tradies scouting upcoming work.

**Fact-check:** Confirmed: 2 public projects, both Auckland, 'planning', budget shown as '—', placeholder descriptions.

**Exact on-screen wording:**
- “Construction & Property Projects in New Zealand”
- “2 projects”
- “Sign in to bid or manage / Create an account”

**Best demo moments:**
- Only as the owner-side toggle Private → Public; do not showcase the list.

**Pains solved:** Trades hearing about projects too late

**Facts you can use:**
- 2 public projects today

**DO NOT CLAIM:**
- ⛔ Any number of live projects
- ⛔ That budgets are visible
- ⛔ The listed projects as customer case studies or their addresses

<sub>Evidence: Live www.qsme.co.nz/browse-projects; src/routes/browse-projects.tsx · Reported by: people, live surface</sub>

#### 4.6 Find a Tradie directory and trade-by-region pages

**NZ** · **✅ live** · id `find-a-tradie`

**What it does.** A public directory of tradies, contractors and consultants searchable by name, trade and region, with landing pages like 'Builders in Auckland'. Anyone listed can be invited to your project.

**For:** NZ owners looking for trades; tradies wanting a profile.

**Fact-check:** Confirmed: 22 public profiles, 1 marked verified, 0 with a rating, 0 with completed projects; the profile sitemap is empty. The live headline 'Browse verified New Zealand tradies' is not supported by the data. The public profiles feed also returns emails for 14 profiles and phones for 3 without login (open privacy question).

**Exact on-screen wording:**
- “Find a Tradie in New Zealand”
- “Search by name, trade or region…”
- “Browse tradies by region”
- “No builders listed in Auckland yet — New professionals join QSME every week. Post your project and we'll match you, or browse the whole directory.”
- *(home)* “Every trade. Verified. On your project.”
- *(home)* “Licence-verified contractors, trades and consultants with real profiles — invited to your project, not found in a Facebook group.”
- “Join as a tradie / Post work for pricing”

**Best demo moments:**
- The home page's 12 trade tiles (Builder, Electrician, Plumber, Roofer, Painter, Tiler, Landscaper, Architect, Quantity Surveyor, Engineer, Inspector, Project Manager).
- Type 'plumber' and the cards filter (seeded demo accounts only).
- Tradie side: creating a profile.

**Pains solved:** Finding trades through Facebook groups with no way to check them · Tradies with no professional profile

**Facts you can use:**
- 22 public profiles: 10 tradie, 4 professional, 3 general contractor, 2 main contractor, 1 consultant, 1 interior, 1 service provider
- 12 region hubs; What We Cover lists 26 trades, 12 professions and General Contractor

**DO NOT CLAIM:**
- ⛔ A large network ('thousands', 'hundreds') or tradies in every region
- ⛔ That listed tradies are verified — say 'tradies can get verified'
- ⛔ Ratings or reviews (none exist)
- ⛔ Real members' names, emails or phones on screen
- ⛔ 'New professionals join every week' as a growth stat
- ⛔ Anything in Global videos

<sub>Evidence: Live www.qsme.co.nz/find-a-tradie; src/routes/find-a-tradie.tsx; /public/profiles feed · Reported by: people, live surface, marketing</sub>

#### 4.7 Find a Supplier directory

**NZ** · **✅ live** · id `find-a-supplier`

**What it does.** A public page meant to list NZ building-material suppliers, searchable by name, material or region.

**For:** NZ builders and owners; suppliers wanting to be listed.

**Fact-check:** Page is live but empty: the supplier profile feed returns 0. The page copy says 'Browse verified New Zealand building material suppliers and merchants' above an empty list.

**Exact on-screen wording:**
- “Find a Building Supplier in New Zealand”
- “Search by name, material or region…”
- “No suppliers listed yet”
- “Check back soon — verified NZ building suppliers are being added regularly.”

**Best demo moments:**
- Only as an honest 'be the first supplier on the page' recruitment beat.

**Pains solved:** Suppliers have no simple place to be found by builders on live projects

**Facts you can use:**
- 0 supplier profiles today

**DO NOT CLAIM:**
- ⛔ That suppliers are listed
- ⛔ 'Verified' suppliers
- ⛔ Naming any real merchant as being on QSME

<sub>Evidence: src/routes/find-a-supplier.tsx; /public/profiles?profile_type=supplier · Reported by: people, live surface</sub>

#### 4.8 Public marketplace and supplier shop pages

**NZ** · **✅ live** · id `marketplace`

**What it does.** Anyone can browse published building materials and trade services by type, category or supplier, see the rate per unit, and open the supplier's shop page. A supplier's listed products become selectable inside an SOQ.

**For:** NZ owners, builders and QS pricing a job; suppliers and trades publishing a price list.

**Fact-check:** Deployed (client-rendered). 3 listings from 3 suppliers, 20 shared categories; the three live listings carry USD in the public data, not NZD. It is a catalogue: you open a supplier's shop to get in touch; no cart, checkout or ordering.

**Exact on-screen wording:**
- “Construction marketplace”
- “Materials & services from NZ suppliers”
- “Browse building materials and trade services published by suppliers and trades on QSME. Compare rates, find what your project needs, and open a supplier's shop to get in touch.”
- “Search by name or SKU…”
- “All types / Products / Services”
- “No listings published yet — Suppliers choose what to publish. Check back soon.”
- *(sidebar)* “Products — List what you sell — it becomes selectable in SOQs”

**Best demo moments:**
- A supplier lists a product, then an estimator picks it inside an SOQ line.
- Filter by category and open a supplier shop (seeded data, labelled).

**Pains solved:** Ringing around merchants for a rate · Supplier price lists living in PDFs

**Facts you can use:**
- 3 listings, 3 suppliers, 0 services, 20 categories (e.g. Timber & Framing, Roofing & Cladding, Plasterboard & Linings)
- Signing in is only needed to list or get in touch

**DO NOT CLAIM:**
- ⛔ Buying, ordering, checkout or delivery on QSME
- ⛔ A stocked catalogue
- ⛔ Live or guaranteed supplier prices
- ⛔ Services listings (none published)
- ⛔ Naming real merchants
- ⛔ Anything in Global videos

<sub>Evidence: src/features/products/marketplace-page.tsx; src/routes/shop.$username.tsx; PR #100 · Reported by: people, changelog, live surface</sub>

#### 4.9 Supplier catalogue tools: products vs services, public rate, spreadsheet import

**NZ** · **✅ live** · id `supplier-catalogue`

**What it does.** A supplier or tradie builds a price list: add a material (product) or a service (labour, install, day rate), set one public rate per unit, file it under a shared category, choose Public or Private, or import a whole list from a spreadsheet with a preview that flags bad rows.

**For:** NZ suppliers, merchants and tradies selling materials or labour.

**Fact-check:** Confirmed: the two commits on the local branch are already in origin/main as squashed commit 8a7d6e1d and deployed. Import accepts .csv, .xlsx and .xlsm. Not viewed signed in.

**Exact on-screen wording:**
- “List a material you supply.”
- “List a service you offer — labour, install or a day rate.”
- “The rate everyone sees in the marketplace.”
- “Import from a spreadsheet”
- “Treat all rows as: What the sheet says / Products (materials) / Services (gigs)”
- “After importing: Keep private / Publish to marketplace”
- “Imported 42 listings”

**Best demo moments:**
- Add menu: product, service, or import from a spreadsheet.
- Switch the form to service: stock and SKU disappear, unit becomes hour/day/job.
- Drop an .xlsx: preview with row problems highlighted → Publish to marketplace.

**Pains solved:** Re-typing a price list item by item · Every supplier inventing their own category names

**Facts you can use:**
- Default currency NZD; shared categories cannot be deleted by a supplier

**DO NOT CLAIM:**
- ⛔ Online selling, checkout or e-commerce
- ⛔ That suppliers receive orders or payments through QSME
- ⛔ Many suppliers already listing
- ⛔ The form label 'add GST at checkout' (there is no checkout) — avoid that screen
- ⛔ Anything in Global videos

<sub>Evidence: commit 8a7d6e1d (PR #98); src/components/products/*; backend product_import.go · Reported by: people, changelog</sub>

#### 4.10 Opportunities, My Bids and Awarded Work (the bidder's side)

**NZ + Global** · **✅ live** · id `bidder-workspace`

**What it does.** A tradie gets one feed of work to price, sends a total or itemised quote with their own dates and payment terms, tracks it under My Bids, and when they win it moves to Awarded Work with the contract and milestones. On Global the feed is invitations only.

**For:** Tradies, subcontractors and consultants; main contractors pricing other people's jobs.

**Fact-check:** Confirmed. The feed is called 'Opportunities' (the words 'Find work' were not found in the bundle). NZ main contractor accounts see 'GC Pro is required to view opportunities'.

**Exact on-screen wording:**
- “Opportunities”
- “Win your first job”
- “Browse open work — Tenders you can bid on. Filter by your trade or by when it starts.”
- “Private tender invitations — 3 clients invited you directly. Private tenders never show in the feed — only here.”
- “Invited by {name} · Bids close in 5 days”
- *(global)* “Tenders you have been invited to bid on. Tendering on QSME is by invitation.”
- *(phone)* “Your work at a glance — Opportunities / Awarded / To confirm”
- “My Bids — View the bids you have submitted, track status, or delete and recreate them.”
- “Awarded Work — Contracts you've won”

**Best demo moments:**
- Phone: tradie home 'Your work at a glance' → Browse.
- Bid with prices shown excl. GST, GST and incl. GST.
- My Bids card flips to 'Awarded and active' with 'Open work area'.

**Pains solved:** Quoting by email and never hearing back · Losing track of which quotes are out and which were won

**Facts you can use:**
- A draft bid is saved on the device as you go
- GST basis is frozen with the bid
- You can be awarded with no QSME account and claim it later

**DO NOT CLAIM:**
- ⛔ Promises of work, leads or income
- ⛔ 'Make an offer', quick jobs or bookings (removed 22 Sep)
- ⛔ The old demo stat '14 relevant tenders of 15'
- ⛔ That bidding is free in every case
- ⛔ A public feed on Global

<sub>Evidence: src/features/opportunities/*; my-bids.tsx; awarded-work.tsx; mobile-app (tabs) tenders/bids/jobs · Reported by: people, money</sub>

### 5. Compare & award

#### 5.1 Add a bid you received: emailed quotes join the comparison

**NZ + Global** · **✅ live** · id `add-received-bid`

**What it does.** When a contractor emails a quote instead of bidding on the platform, the owner drops the PDF, saved email, photo or pasted text onto the tender. QSME files it, reads it into a draft shown beside the original, flags figures that do not add up or a missing GST statement, and adds it to the bids only after the owner ticks that it was checked.

**For:** Anyone whose bidders still email PDFs.

**Fact-check:** Confirmed: PDF, .eml, photo or text up to 20 MB; Outlook .msg refused; the owner must tick that it was checked.

**Exact on-screen wording:**
- “Add a bid you received”
- “Got a quote by email for “{tender}”? Drop it here and it goes in with the other bids.”
- “PDF, saved email (.eml), photo or text file — up to 20 MB”
- “This was read automatically and can be wrong. Nothing is saved until you have checked it.”
- “That is not the total price above ({amount}). Check both against the original.”
- “They match if the line prices include GST. Set that.”
- “I have checked this against the original and it is right.”
- “Received by you”
- “New to you. They will be saved to your contacts when you save — they don't need a QSME account.”

**Best demo moments:**
- Drag a PDF onto the tender: 'Filing the quote…' then 'Reading the quote…'.
- Side by side: 'The bid' form and 'The original' PDF.
- A warning line lights up when lines do not add up; one tap 'They match if the line prices include GST. Set that.'
- Tick the checkbox → the bid joins the table with a mail icon 'Received by you'.

**Pains solved:** Half the quotes arrive by email and never get compared fairly · Mistyping PDF figures into a spreadsheet · Quotes that never say whether GST is in

**Facts you can use:**
- The original is kept in the project documents in a folder for that bidder
- The sender needs no account; a bid with no account behind it can be awarded
- Reading uses AI credits; when out of credits the owner can type it in

**DO NOT CLAIM:**
- ⛔ That quotes are imported automatically or without checking
- ⛔ That QSME reads your inbox
- ⛔ .msg support
- ⛔ That the AI reading is always right

<sub>Evidence: src/components/bid/received-bid-dialog.tsx; commit 9c6870ef · Reported by: money, changelog, global</sub>

#### 5.2 Compare bids: totals excluding and including GST, with a 'Lowest' tag

**NZ + Global** · **✅ live** · id `compare-bids`

**What it does.** All bids on a tender sit in one table. The bidder's own figure is bold and the worked-out side is marked 'calc.'; you choose to compare excluding or including GST and the 'Lowest' tag moves accordingly. Click a bid to see its own line breakdown and attachments.

**For:** Owners, developers, main contractors and QS choosing between quotes.

**Fact-check:** Live, but precise: one row per bidder with total excl. GST, GST, total incl. GST, duration and status. It does not put every bidder's price for each line side by side — that matrix exists only on unmerged branch est/levelling. You open one bid at a time to see its lines. Marked-up drawings are not shown. Both marketing sites say 'line by line' / 'apples to apples', which overstates the screen. On Global the labels may still say GST.

**Exact on-screen wording:**
- “Compare bids”
- “Compare on: Excl. GST / Incl. GST”
- “Bidder | Excl. GST | GST | Incl. GST | Duration | Status”
- “Lowest”
- “calc.”
- “Figures marked “calc.” are worked out at 15% GST so bids can be compared. The bidder's own figure is the one in bold.”
- “GST not stated”
- “No GST”
- “Detailed price breakdown — Item / Type / Qty / Rate / Line total”
- *(NZ home)* “Compare quotes — Line-by-line comparison — apples to apples.”
- *(qsme.build)* “Lowest conforming bid, same lines, same tax basis”

**Best demo moments:**
- Three bids: '8,298 incl.', '7,400 + GST' and a non-registered sole trader's flat 7,900. Flip 'Compare on' and the 'Lowest' tag jumps to a different bidder.
- Zoom on a bold figure next to a grey one marked 'calc.'.
- A bid with 'GST not stated' sorts last instead of being guessed.
- Click a row: that bid's 'Detailed price breakdown' opens.

**Pains solved:** Comparing a GST-inclusive quote against a 'plus GST' quote and picking the wrong cheapest · Quotes laid out on the kitchen table that cannot be held against each other · Not seeing what a lump sum covers

**Facts you can use:**
- GST is display-only; the bidder's typed figure is stored unchanged
- NZ GST 15%
- Only the project owner can award; bidders see only their own bids

**DO NOT CLAIM:**
- ⛔ A side-by-side line-by-line matrix across bidders
- ⛔ 'Conforming', or that QSME judges compliance
- ⛔ That QSME picks or recommends the winner
- ⛔ That QSME recalculates or corrects a price
- ⛔ Marked-up drawings in a bid
- ⛔ Global: film this screen for a non-GST country without checking the labels

<sub>Evidence: src/components/bid/bid-compare-table.tsx; commit e8e548c4 · Reported by: money, global, changelog, live surface</sub>

#### 5.3 Award in one click: the winning bid becomes a contract with milestones and retention

**NZ + Global** · **✅ live** · id `award-to-contract`

**What it does.** The owner presses Award: the tender closes, other bidders are told, and a payment contract is created with stages (from the winning bid's schedule, the tender's, or a standard split) and the retention the tender set. The job appears as Active Work for the client and Awarded Work for the contractor, and lands on the schedule.

**For:** Owners, developers, main contractors (awarding); tradies and subcontractors (winning).

**Fact-check:** Confirmed. Retention is a percentage recorded on the contract; there is no retention-release workflow and QSME does not hold the money. Milestones are fixed when the contract is created.

**Exact on-screen wording:**
- “Award bid”
- “Award this bid? — This awards the work to {bidder} for {amount}, creates the payment contract, and notifies all bidders. It can't be undone from here.”
- “Only the project owner can award this work.”
- “Active Work — Everything you've awarded, with what to do next.”
- “Contract value / Paid to date / Retention / Milestones — 0 / 3 confirmed”
- “Stage 1 of 3 — Mobilisation”
- “Download contract PDF / Award summary”
- *(qsme.build)* “Award becomes a contract, not a to-do”

**Best demo moments:**
- The 'Award this bid?' dialog with name and amount, then the green button.
- Cut to the contractor's phone: the bid card turns 'Awarded and active'.
- Active Work card: 'Milestones 0 / 3 confirmed', 'Stage 1 of 3 — Mobilisation'.
- Award to an emailed quote from someone with no account.

**Pains solved:** A handshake and a text message standing in for a contract · Retyping the winning quote and getting the payment stages wrong · Losing bidders never being told

**Facts you can use:**
- Owner-only; managers cannot award
- You can award to someone with no QSME account
- No AI assistant can award

**DO NOT CLAIM:**
- ⛔ That the contract is 'signed' on award (signing is the Agreements step)
- ⛔ That milestones can be added or edited after award
- ⛔ That award can be undone
- ⛔ That QSME holds, protects or releases retention
- ⛔ Compliance with NZ retention-trust rules on the customer's behalf

<sub>Evidence: tender.$id.bid-view.tsx; routes_tenders.go award; commits d73989f9, 1a60bfed · Reported by: money, global</sub>

#### 5.4 Verified badge (identity and business check)

**NZ + Global** · **✅ live** · id `verified-badge`

**What it does.** A member proves who they are once; when approved, a green Verified badge shows next to their name on their profile, in the directory and in chat.

**For:** Tradies and businesses who want to be trusted; clients choosing who to hire.

**Fact-check:** Fact-checkers split. One rated it live: the flow is deployed and 1 of 22 directory profiles carries the badge. The other rated the wider 'verified people' bundle merged: identity is an in-house manual review of an uploaded ID ('usually decided within one business day'), the bank check is normally a bank-login consent with the one-cent payment as fallback (not confirmed in production), and a verification fee setting exists in code (the reader saw it default to 0). We keep the badge as live because a live profile carries it; the bank and licence parts are treated as unconfirmed. Global: identity and document review only, no NZBN.

**Exact on-screen wording:**
- “Verification & trust”
- “How clients know they're dealing with a real business. Each item is a one-off — do it once and it stays done.”
- “Verify your identity”
- “Scan your ID with your phone — it takes about a minute. Verified members get the trust badge and priority in tender matching.”
- “Verification under review”
- “Usually decided within one business day — nothing more for you to do.”
- “Clients see the green Verified badge next to your name.”
- “Nothing here is a badge you buy or tick yourself. Each one is checked.”
- “Trade licences verified — 3 of 4 confirmed”

**Best demo moments:**
- The 'Verification & trust' checklist rows going green one by one.
- A directory card before and after gaining the shield and 'Verified' chip (demo account).
- Phone profile card: 'Verified on QSME'.

**Pains solved:** Not knowing if the person quoting is a real business · Hiring someone off a Facebook group · Tradies re-proving themselves to every client

**Facts you can use:**
- ID types: NZ driver licence, NZ passport, foreign passport, other
- ID numbers are encrypted and every admin 'reveal' is logged
- 1 of 22 public profiles carries the badge today

**DO NOT CLAIM:**
- ⛔ That everyone or most people on QSME are verified
- ⛔ 'Instant' verification
- ⛔ That verification is free (a fee setting exists — open question)
- ⛔ Government, police, background or credit checks
- ⛔ That the automated ID scan is switched on
- ⛔ Any number behind 'priority in tender matching'

<sub>Evidence: docs/IDENTITY_VERIFICATION.md; src/locales/en/profile.json; public/knowledge-base/articles/verification-and-licences.md; /public/profiles feed · Reported by: people, marketing, live surface</sub>

#### 5.5 Trade licence verification and the LBP register check

**NZ** · **🟡 merged** · id `licence-verification` · reader reported: live — **fact-checker status used**

**What it does.** A tradie enters a licence or registration number and/or uploads the certificate for each trade that needs one. A QSME reviewer checks it; for Licensed Building Practitioners a staff-side lookup against MBIE's register can show classes and disciplinary history. Approved licences show as 'Licensed: X', per trade.

**For:** NZ builders, electricians, plumbers/gasfitters/drainlayers, engineers, architects, QS; homeowners checking who can do restricted building work.

**Fact-check:** Fact-checkers split; we use the more cautious verdict (merged). The claim flow is deployed, but 0 of 22 public profiles have a verified licence, the automated LBP lookup only runs if an MBIE API key is configured in production (the July data audit said 'Awaiting MBIE approval'; not confirmable), and EWRB, PGDB, NZRAB and Engineering NZ numbers are checked by hand by a QSME reviewer using public registers.

**Exact on-screen wording:**
- “Trade & professional licences”
- “These trades require a licence or professional registration. Add your number and/or upload your certificate — once verified, a “Licensed” badge shows on your public profile.”
- “Licence / registration no.”
- “Attach certificate”
- “Pending review”
- “Licence checked: Plumber”
- *(Knowledge Hub)* “Licensed Building Practitioner numbers are checked against MBIE's LBP register, including the licence classes you hold and whether any are suspended.”

**Best demo moments:**
- Type an LBP number, attach the certificate, Submit: chip shows 'Pending review'.
- '3 of 4 confirmed' rather than one blanket tick (demo account).

**Pains solved:** Homeowners cannot tell if the builder is an LBP for restricted building work · Unlicensed work voiding insurance or holding up the CCC

**Facts you can use:**
- Bodies named: LBP (MBIE), EWRB, PGDB, CPEng/NZRAB, NZIQS
- Each licence is checked individually; re-submitting resets it to pending
- 0 of 22 public profiles show a verified licence today

**DO NOT CLAIM:**
- ⛔ That licences are verified automatically or instantly
- ⛔ Automatic checks against EWRB, PGDB or CPEng registers
- ⛔ That QSME monitors licences for expiry or suspension
- ⛔ That every tradie on QSME is licensed or 'licence-verified'
- ⛔ Anything in Global videos
- ⛔ The public /pro page 'Licenses' list as proof of a checked licence (it is self-listed)

<sub>Evidence: src/features/settings/profile/trade-licence-claims.tsx; backend registry_handler.go; docs/ENVIRONMENT.md LBP_API_KEY · Reported by: people, marketing, live surface</sub>

### 6. Agree & sign

#### 6.1 Add a contract for work already agreed (no tender)

**NZ + Global** · **✅ live** · id `direct-contract`

**What it does.** Record a contract for work agreed off the platform in four steps — the work, who it is with (a contact or typed details; they need no account), price and dates, and payment stages with retention. It can be tied to SOQ jobs and appears on both sides' work areas.

**For:** Builders with regular subbies; owners who already shook hands on a price.

**Fact-check:** Confirmed in main and deployed.

**Exact on-screen wording:**
- “Add a contract”
- “This is a contract, not a tender — The price and the person are already agreed. You're recording the terms so both sides see the same stages and pay against them — nothing goes out for bids, and there's nothing for them to accept.”
- “What's the work? / Who's it with? / Price and dates / How it gets paid”
- “Retention % — Held back until the defects period ends.”
- “Pick the jobs from the SOQ — … Use this amount”
- “Save as draft / Issue contract”
- “They aren't on QSME yet. We've emailed them the terms — it appears on their work area the day they sign up with that address.”

**Best demo moments:**
- Tick three SOQ jobs and the banner offers 'Use this amount'.
- Set retention 5% and the stages rebalance to 95%.
- 'Issue contract' → toast 'Contract issued to Dave Wilson.'

**Pains solved:** Your regular sparky needs no tender but you still want stages and payments on record · Agreed work never counted in the project cost

**Facts you can use:**
- No success fee on a direct contract
- A contract with a payment recorded against it cannot be cancelled
- The other party needs no account

**DO NOT CLAIM:**
- ⛔ That the other party accepts or signs here (signing is in Agreements)
- ⛔ 'Book a tradie', quick jobs or 'Quotes & Variations' (removed)

<sub>Evidence: src/features/contracts/contract-form.tsx; commit 3f591f83 · Reported by: money</sub>

#### 6.2 Agreements signed from a link — no account needed

**NZ + Global** · **✅ live** · id `agreements`

**What it does.** Write an agreement or start from a template, add signers from your contacts and press 'Send for signing'. Each person opens their own link on a phone, reads, ticks, types their name and optionally draws a signature — no account, nothing to install. When the last person signs QSME makes the signed PDF on your letterhead with a certificate page; your drawn signature can be kept for next time.

**For:** Builders and main contractors issuing subcontracts, NDAs and variations; the tradies who sign them.

**Fact-check:** Confirmed against the live guide: free on every plan, links last 60 days, SHA-256 fingerprint, certificate page. The three built-in templates are written for New Zealand law and are 'a starting point, not legal advice'.

**Exact on-screen wording:**
- “Agreements — Write it, send it, get it signed”
- “Subcontract agreement (NZ) / Confidentiality agreement (NDA) / Variation”
- “Send for signing”
- “I have read this agreement and I agree to sign it electronically.”
- “Your full name / Your signature”
- “Keep this signature for next time”
- “Draw a different one / Forget it”
- “Out for signing — Sent, and waiting on somebody else.”
- “Signed. Download a copy below and keep it.”
- “Everyone has signed”
- “Tell them why”
- “This link has expired — Ask whoever sent it for a new one.”

**Best demo moments:**
- Phone in a ute: tap the emailed link, scroll, type the name, draw with a finger, tick — 'Signed. Download a copy below and keep it.'
- Sender's list moves from 'Out for signing' to 'Everyone has signed'.
- Flip to the certificate page: who, when, device and the fingerprint of the wording.
- Second agreement: the saved signature is offered with 'Draw a different one' beside it.

**Pains solved:** Print, sign, scan, email · Subbies who will never create another login · Redrawing a signature with a mouse on every document · Signed copies lost in an inbox

**Facts you can use:**
- Free on every plan; AI actions use credits
- Links last 60 days; Remind sends a fresh one; Withdraw stops every link
- Wording locks once sent
- Certificate records name, email, typed name, consent, times, network address, device and a SHA-256 fingerprint
- Signed copy filed in Documents → Agreements
- Design basis cited: NZ Contract and Commercial Law Act 2017

**DO NOT CLAIM:**
- ⛔ 'Legally binding everywhere', 'court-proof' or compliance with a named law outside NZ
- ⛔ Legal advice or lawyer-approved templates
- ⛔ Placed signature boxes, signing order, witnesses or initials (not built)
- ⛔ Agreements inside the phone app (it works in the phone's browser)
- ⛔ Wills or affidavits
- ⛔ That an AI can sign
- ⛔ NZS 3910 or other standard-form contracts included
- ⛔ A qualified/certified digital signature

<sub>Evidence: src/features/agreements/*; public/knowledge-base/articles/agreements.md; commits 8bca4a3a, 9d437fe1 · Reported by: money, global, changelog, live surface</sub>

#### 6.3 An awarded job becomes an agreement (“Make the agreement”)

**NZ + Global** · **✅ live** · id `make-the-agreement`

**What it does.** After an award, the Agreements page lists jobs with nothing signed; one button writes the agreement from the job — agreed sum with its GST wording, dates, retention, scope and payment stages — with both parties on the signing line and the contract attached, saved as a draft to check and send. A tender owner can also choose a template for the winner before awarding.

**For:** Owners, builders and main contractors who award work.

**Fact-check:** Confirmed; it saves a draft and sends nothing.

**Exact on-screen wording:**
- “2 awarded jobs have nothing signed for them”
- “The deal is done and the figures are here. Make the agreement and QSME writes it from the job itself — both parties on it, the contract attached. Send it to be signed, or keep it on file.”
- “Make the agreement”
- “An agreement for the winner — Optional. When you award this, QSME makes the agreement for whoever wins and fills in who and where…”
- “A draft — check it and send it”
- “Bring in from this job”

**Best demo moments:**
- Amber banner → 'Make the agreement' → a full agreement with sum, dates, retention and stages already written, both names on the signing line.

**Pains solved:** The award was agreed but nothing was ever signed · Typing the contract sum and stages into a Word document again

**Facts you can use:**
- Only the side that awarded the job can make it
- Prices come only from the contract, never from SOQ or tender estimates
- Up to ten records can be brought in at once

**DO NOT CLAIM:**
- ⛔ That the agreement is sent or signed automatically at award (qsme.build's line is only true for the owner's own blank-free template)
- ⛔ That award is blocked until signing
- ⛔ That the owner's SOQ rates appear in the agreement

<sub>Evidence: src/features/agreements/agreements-page.tsx, tender-award-agreement.tsx; commit 0c1a9471 · Reported by: money</sub>

#### 6.4 Bring in an agreement you already have, or have QSME write notes up as one

**NZ + Global** · **✅ live** · id `bring-in-agreement`

**What it does.** Upload a PDF, Word file or photo, or paste text, and choose: keep every word (no AI), sign the PDF exactly as it is, let AI read a scan (you check it against the original), or have QSME write rough notes or an email thread up as a proper agreement. Inside a document AI can write a term, reword a piece or fill the blanks from your records, showing you first.

**For:** Contractors with their own standard subcontract; anyone with terms buried in an email.

**Fact-check:** Confirmed (20 MB; one AI credit per AI action, refunded on failure). The live guide says: 'AI does not summarise your agreement or tell you what it says, and it never says whether a term is fair or legal. None of this is legal advice.'

**Exact on-screen wording:**
- “Keep every word / Write it up as a proper agreement / Sign it as it is / Let AI read it”
- “I have read this against the original, and it says the same thing.”
- “Write it with AI / Reword with AI… / Fill them in with AI”
- “AI never makes up an amount, a date or a name. Anything it was not given stays a [blank] for you.”

**Best demo moments:**
- Paste an email thread, choose 'Write it up as a proper agreement' — it comes back with real names and the contract sum instead of [Subcontractor].
- 'Fill them in with AI': before/after for every blank with untick boxes.
- Photo of a paper contract → original and typed version side by side with the tick box.

**Pains solved:** A standard subcontract stuck in a Word file with dotted lines · Fear that AI will quietly change a clause or invent a price

**Facts you can use:**
- 'Keep every word' uses no AI and no credit
- 'Sign it as it is' is PDF only and is never re-typeset

**DO NOT CLAIM:**
- ⛔ That AI reviews, checks or approves a contract
- ⛔ That AI-written terms are legally sound
- ⛔ That AI fills prices from the estimate
- ⛔ More than one attached document

<sub>Evidence: src/features/agreements/new-agreement-dialog.tsx; backend agreement_ai.go · Reported by: money</sub>

### 7. Schedule

#### 7.1 Gantt timeline and numbered list for one project

**NZ + Global** · **✅ live** · id `gantt`

**What it does.** Every task is a bar on a day grid; zoom Day / Week / Month / Year, group by trade or unit, colour by trade or status, or flip to a numbered list. A strip along the top counts what matters today and each count filters the view. Every bar says its dates in words.

**For:** Owner-builders, developers, PMs and site managers; booked tradies get a read-only view of their own dates.

**Fact-check:** Confirmed: 14 trade colours (the 14th is 'Other'), 4 zoom levels, 1–365 working days in the Move dialog.

**Exact on-screen wording:**
- “Timeline | List | All projects”
- “Day / Week / Month / Year”
- “Find a task, trade or person”
- “Colour the bars by: Trade · Status”
- “Columns beside each task: Who · Start · End · Days · Cost · Paid”
- “On site now · Starting this week · Waiting for OK · Can't make it · Behind · Rain risk · Owed”
- *(status legend)* “Grey — Planned · Amber — Waiting for OK · Blue — Booked tradie · Red — Can't make it · Green — On site · Dark green — Finished”
- *(bar label)* “3-21 Nov · 12 days · [lead name] · ~$42,500 · not paid yet”

**Best demo moments:**
- Zoom from Day to Year: every bar still carries its dates in words.
- Switch 'Colour the bars by' from Trade to Status and the chart recolours.
- Click the 'Behind' chip: only overdue tasks remain.
- A finished task turns solid dark green with a tick.

**Pains solved:** A programme living in a spreadsheet or someone's head · Nobody can answer 'what's on, what's next, who's doing it' · Coloured bars with no dates on them

**Facts you can use:**
- 14 trade colours; 4 zoom levels
- Tasks are numbered in date order and renumber when moved
- No percentages anywhere by design — status is a word

**DO NOT CLAIM:**
- ⛔ '% complete' (the lighter block on a bar is time elapsed, not work done)
- ⛔ Baseline vs actual, resource levelling, or MS Project / Primavera import
- ⛔ Drag-and-drop on a phone
- ⛔ Real customer names or addresses
- ⛔ That everyone sees the money columns

<sub>Evidence: src/features/schedule/*; public/knowledge-base/articles/schedule.md, schedule-colours.md; commit d68bb466 · Reported by: schedule, changelog</sub>

#### 7.2 Fill the schedule from the estimate (SOQ import)

**NZ + Global** · **✅ live** · id `schedule-from-soq`

**What it does.** Tick the jobs you priced in the SOQ and they land on the programme one after another, each taking its own Days and weather flag. A priced estimate becomes a programme without retyping.

**For:** Anyone who has priced a job in QSME.

**Fact-check:** Confirmed, including the 5-working-day default and import from draft pockets.

**Exact on-screen wording:**
- “Import tasks onto [project name]”
- “Import jobs from SOQ — The jobs you've priced on this project”
- “This is the only way an SOQ job reaches the schedule — tick what you want. They go on after whatever is already scheduled, each one taking its own Days. Move them around afterwards.”
- “The dates below are what you'll get.”
- “No Days set on this job in the SOQ — it will get 5 working days. Change it after.”
- “Import 23 tasks”

**Best demo moments:**
- Empty schedule → 'Import tasks' → tick priced jobs → preview of the dates → 'Import 23 tasks' → bars chain themselves.

**Pains solved:** Re-keying the estimate into a programme tool · Typing 200 rows to start a programme

**Facts you can use:**
- A job with no Days gets 5 working days

**DO NOT CLAIM:**
- ⛔ That the programme is planned by AI or automatically — jobs are laid end to end using the Days you set
- ⛔ That durations are estimated from quantities
- ⛔ That changes sync back to the SOQ

<sub>Evidence: src/features/schedule/components/import-dialog.tsx; backend schedule_service.go · Reported by: schedule</sub>

#### 7.3 Tenders and contracts land on the schedule as the same task

**NZ + Global** · **✅ live** · id `award-on-schedule`

**What it does.** When a tender is awarded the work goes onto the programme as the same task (not a second bar) with the winner on it; if the contract states dates the task takes them and everything linked after is re-checked. From a task you can link a contract or tender, add a contract, or tender that job.

**For:** Developers, main contractors, QS/PMs running tenders.

**Fact-check:** Confirmed in main and deployed.

**Exact on-screen wording:**
- “Where this work comes from”
- “Link a contract or tender you already have, add a contract, or tender the work.”
- “Out to tender · … / On a contract · …”
- “Estimate ~$… from the SOQ —”
- *(notification)* “Work was just awarded ahead of yours: … has new dates … Please confirm you can make it.”

**Best demo moments:**
- Open a task: 'Estimate ~$42,500 from the SOQ' → tender this job → header 'Out to tender'.
- Accept a bid, cut to the schedule: the same bar shows the winner and the price loses its '~'.

**Pains solved:** The same job appearing twice · Awarding a package and the downstream dates silently contradicting it

**Facts you can use:**
- Work already under way keeps its dates when a contract with dates is awarded

**DO NOT CLAIM:**
- ⛔ Global: the NZ public tender board
- ⛔ That the tradie's dates are locked automatically in every case
- ⛔ 'Book a tradie' (removed)

<sub>Evidence: commits b424caec, 66eabf18, f9c9412e; backend schedule_work_link.go · Reported by: schedule, changelog</sub>

#### 7.4 Built-in NZ programmes (Townhouses, Standard NZ build, Land to titles)

**NZ** · **✅ live** · id `nz-programme-templates`

**What it does.** Four ready-made New Zealand programmes laid onto a project from a start date: every task with working days, the kind of person it needs, what it waits for and (on Townhouses) a plain-English note on what tends to go wrong. Slab curing, frame drying, council inspections and long orders are written in.

**For:** NZ first-time developers and owner-builders, small townhouse developers, builders.

**Fact-check:** Confirmed: 136 / 146 / 28 / 228 tasks; 235 and 250 working days; the live townhouses.csv has 136 task rows. The original commit described 140 tasks and 185 working days on site, so numbers differ by source — quote neither as a promise. The sourcing doc tags many government figures 'Snippet' and stage durations 'Estimate'; Auckland is the reference council. The live Knowledge Hub still says 'two of ours'.

**Exact on-screen wording:**
- “Templates — put one on [project name]”
- “QSME templates · Your templates · Shared by others”
- “Townhouses”
- “Townhouses — with demolition”
- “Standard NZ build — simple flow”
- “Full development — land to titles”
- “A whole programme in one go, laid out from the start date you pick — tasks, days, who each is for, and what waits for what.”
- “The ‘Allowance’ tasks are spare days for weather and re-inspections: shorten them as you pass them rather than deleting them up front.”
- *(task note)* “Frames that arrive early sit in the rain; frames that arrive late stop the whole job.”
- *(task note)* “one tile on a slow boat holds up four bathrooms.”

**Best demo moments:**
- Templates → 'Townhouses' → preview list → pick a start date → 'Put 136 tasks' → a ten-month programme appears.
- Open a task note and read it on screen.
- Switch to 'with demolition' and show the asbestos survey and disconnection tasks at the front.

**Pains solved:** First-time developers not knowing the order of work or how long to allow · Forgetting the invisible waits (cure, drying, inspection booking, connections, window lead times)

**Facts you can use:**
- Townhouses: about four two-storey terraced townhouses, day one = building consent issued
- Standard NZ build — simple flow: 28 tasks over about six months
- Full development — land to titles: 228 tasks over about 19 months
- Templates carry roles ('Plumber · nobody yet'), never names

**DO NOT CLAIM:**
- ⛔ That durations are official, council-approved or guaranteed
- ⛔ 'Your build will take 10¾ months'
- ⛔ That these suit global projects (consents, CCC, 224c, LINZ titles are NZ)
- ⛔ That templates assign your tradies
- ⛔ The Knowledge Hub's 'two of ours' (there are four)

<sub>Evidence: backend schedule_builtin_templates.go, schedule_builtin_townhouses.go; docs/schedule-templates/townhouses.md; live /templates/schedule/townhouses.csv · Reported by: schedule, changelog</sub>

#### 7.5 Your own templates, CSV/JSON in and out, copy to units

**NZ + Global** · **✅ live** · id `own-programme-templates`

**What it does.** Save any programme as your own template, export as CSV or JSON, and bring one back in, including a plain spreadsheet with Task, Start, End, Days, Who, After columns. On multi-unit jobs, ticked tasks can be copied onto other units.

**For:** Builders and developers who repeat a build type; QS/PM practices standardising programmes.

**Fact-check:** Confirmed; CSV header matches the live file. The exact 'Share with everyone' button wording was not found in the deployed bundle — check on screen before quoting. 'Copy to units' is in the live chunk.

**Exact on-screen wording:**
- “Save as template…”
- “Tasks, days, trades, spacing and links — the money stays behind. Saving the same name again replaces it.”
- “From a file…”
- “A CSV or JSON exported from here, or a spreadsheet with Task, Start, End, Days, Who, After columns.”
- “As a spreadsheet (CSV) · As a template file (JSON)”
- “Copy ticked tasks to units…”
- “Each unit gets its own copy with the same spacing and links. Copies start with nobody on them.”

**Best demo moments:**
- Save a finished programme as a template, open a new project, put it on with a new start date.
- Tick 12 tasks → copy to units → the same block appears under Unit 2 and Unit 3.

**Pains solved:** Rebuilding the same programme every job · Being locked into one tool

**Facts you can use:**
- Templates never carry money or people's names
- After column syntax: '12, 14+3' (lag), '12-1' (start a day before #12 finishes)

**DO NOT CLAIM:**
- ⛔ Import of MS Project (.mpp), Primavera (.xer) or .xlsx programmes (CSV/TSV/TXT and QSME JSON only)
- ⛔ That a shared template exposes prices or people
- ⛔ A 'template marketplace'
- ⛔ The 'Share with everyone' wording until seen on screen

<sub>Evidence: template-browser.tsx, save-template-dialog.tsx, copy-to-units-dialog.tsx; backend schedule_file.go · Reported by: schedule</sub>

#### 7.6 Linked tasks: one trade slips, everything after it moves

**NZ + Global** · **✅ live** · id `linked-tasks`

**What it does.** Tasks can wait on each other (starts after, starts with, finishes with) with a gap in working days, even a negative one. Drag one task and everything linked after it moves with it, keeping the gaps. Loops are refused, and a toast says in words what moved, what came along and what would not move and why.

**For:** Site managers, PMs, owner-builders, developers.

**Fact-check:** Confirmed.

**Exact on-screen wording:**
- “Linked tasks move together — Move a task earlier or later and everything linked after it moves with it, keeping the gaps between them. Off, only the task you move moves.”
- “Starts after · Starts with · Finishes with”
- “Has to finish first / Waits for this one to finish”
- *(toast)* “3 moved · 2 sent for OK — 5 that follow them came too · Undo”
- *(toast)* “Nothing moved — Gib stayed on Mon 12 Oct — it can't start before Framing finishes”
- “Fri 6 Feb is Waitangi Day, and this task doesn't work public holidays”

**Best demo moments:**
- Drag Framing three days right: roofing, wrap, cladding and everything behind slide with it.
- Try to drag a task before the one it waits for: the bar snaps home and the toast says why.
- Negative gap: painter starts a day before the plasterer finishes.

**Pains solved:** Re-dating twenty rows by hand after one trade runs late · Software that silently refuses a move and says 'saved'

**Facts you can use:**
- Gaps are in working days and can be negative
- Work already under way stays put; a task with someone booked on it is proposed, not moved

**DO NOT CLAIM:**
- ⛔ That everyone's dates change instantly
- ⛔ That the schedule optimises, re-sequences or levels resources
- ⛔ That on-site or finished tasks move

<sub>Evidence: src/features/schedule/job/links-card.tsx; backend schedule_links.go; commits 0cc6ef31, fc69fe62 · Reported by: schedule, changelog</sub>

#### 7.7 Asked, not told: booked tradies confirm new dates

**NZ + Global** · **✅ live** · id `asked-not-told`

**What it does.** Move the dates of a task someone is booked on and they get a notice and an email asking them to confirm; the old dates stand until they say yes. They answer 'Confirm dates' or 'Can't make it' with a reason. Agreed it by phone? 'Mark as agreed' records it and they are still told.

**For:** Tradies and subcontractors (being asked); PMs, builders and owners (asking).

**Fact-check:** Confirmed: in-app notice plus email; reminders 7 days and 1 day before; nothing is sent while the schedule is Private.

**Exact on-screen wording:**
- “This needs [name]'s OK — nothing changes for them until they say yes.”
- “Send for their OK”
- “Waiting for their OK”
- “New dates — can you make them?”
- “Confirm dates / Can't make it”
- “Can't make it — Tell them why, so they can pick a day that works.”
- *(notification)* “New dates to confirm”
- “Marked as agreed — they have been told”
- “Not on QSME — they won't be told about this task or asked to confirm. Give them a ring.”
- *(reminders)* “Job starts next week / Job starts tomorrow”

**Best demo moments:**
- PM drags the plumber's task: a faded bar (agreed) plus a dashed bar (proposed) with an amber ring and 'waiting'.
- Tradie's phone: 'New dates to confirm' → amber card 'New dates — can you make them?' → 'Confirm dates'; back on the chart the bar turns blue.
- Tradie taps 'Can't make it' and types 'On another site until the 20th' → red ring.

**Pains solved:** Tradies finding out their dates moved when they turn up to a locked site · Ringing six people after every change · Arguments about what was agreed

**Facts you can use:**
- One lead per task answers for its dates
- People not on QSME are not messaged — 'Give them a ring'

**DO NOT CLAIM:**
- ⛔ That QSME texts or messages every tradie
- ⛔ SMS (an opt-in channel exists in code; SMS delivery is currently failing)
- ⛔ Push notifications on Android, or on iOS unless confirmed
- ⛔ Calendar sync with Google or Outlook
- ⛔ That dates are 'locked' or 'legally agreed'

<sub>Evidence: backend schedule_service.go notifyProposals; move-dialog.tsx; my-work-list.tsx; cron_service.go · Reported by: schedule, changelog</sub>

#### 7.8 Rain days and the rain outlook

**NZ + Global** · **✅ live** · id `rain-days`

**What it does.** Mark tasks as weather-sensitive, then log the day (or days) rain stopped work: each affected task gets one more day per rained-off day and what follows moves to fit, with a preview of exactly what moves first. The chart also shades days when rain is likely at the site over the coming week.

**For:** Builders and site managers with outdoor trades.

**Fact-check:** Confirmed: up to 10 days at once; Open-Meteo, 7 days ahead, refreshed about every 6 hours.

**Exact on-screen wording:**
- “Rain day”
- “Tick every day that was rained off — you can pick more than one if you already know the week is gone. Each task that rain can stop gets one more day for every rained-off day it was on; what follows moves to fit.”
- “What moves”
- “4 tasks move — 2 now, 2 once the provider says OK”
- “Push these tasks”
- “Rain can stop this task”
- “Rain risk”
- *(phone)* “Rain likely today (80%)”
- *(phone)* “Only work after the rain moves. Nothing gets pulled earlier.”

**Best demo moments:**
- Tap 'Rain day', tick today: the right panel lists old dates → new dates; 'Push these tasks' and the chain slides a day.
- Tick a whole washed-out week in one go.
- Blue band on forecast-rain days and the 'Rain risk' chip lighting up.
- History later shows 'Rain day — Tue 13 Oct' as the reason.

**Pains solved:** Arguing about weather delays with no record · Re-dating the programme by hand after a wet week

**Facts you can use:**
- The preview is the server's own dry run
- Rain outlook needs the project's site location
- Rain day is disabled when no task is marked weather-affected

**DO NOT CLAIM:**
- ⛔ That QSME logs rain days or moves the job automatically from the forecast
- ⛔ That the forecast is QSME's own weather data
- ⛔ An extension-of-time or delay-claim tool
- ⛔ That booked tradies are moved without their OK

<sub>Evidence: rain-day-dialog.tsx; backend weather_service.go, cron_service.go · Reported by: schedule, changelog</sub>

#### 7.9 What drives the finish date (the purple chain)

**NZ + Global** · **✅ live** · id `finish-date-chain`

**What it does.** One switch rings in purple the chain of linked tasks that decides when the job ends. A purple task that slips a day pushes the finish a day; anything not ringed has room. It shows on screen and prints on the PDF with a plain sentence.

**For:** Developers, owner-builders, PMs — and whoever reads the printed programme.

**Fact-check:** Confirmed; in the live schedule chunk. The product never says 'critical path' on screen (qsme.build marketing does).

**Exact on-screen wording:**
- “What drives the finish date”
- “Purple — This task drives the finish date.”
- *(Knowledge Hub)* “A purple task that slips a day pushes the finish date out a day. A grey task has room to move.”
- *(Knowledge Hub)* “Want to finish sooner? Shortening a grey task does nothing. Shorten a purple one.”
- *(PDF)* “What drives the finish date: 12 linked tasks, ringed in purple, ending with [task] on 14 August 2027.”
- *(PDF)* “Any one of them running late moves the whole finish. Anything not ringed has room to move without changing it.”

**Best demo moments:**
- Tick it: a dozen bars get purple rings joined by thick arrows.
- Drag a ringed task one day: the last bar moves a day. Drag an un-ringed one: nothing moves.
- Print: the same rings appear on paper with the sentence naming the last task.

**Pains solved:** Not knowing which delay actually matters · Chasing a late trade that was never holding anything up · 'What is actually holding this build up?' with no answer on the page

**Facts you can use:**
- Same rule on screen and in print; finished and cancelled tasks are left out
- Purple, not red, because red already means 'can't make it'

**DO NOT CLAIM:**
- ⛔ The words 'critical path' as a UI label
- ⛔ Float numbers per task or multiple-path analysis
- ⛔ That it is on by default
- ⛔ That it works on unlinked tasks

<sub>Evidence: src/features/schedule/lib/cpm.ts; backend schedule_critical_path.go; commit 2f852cb1 · Reported by: schedule, changelog, global</sub>

#### 7.10 NZ public holidays built in

**NZ** · **✅ live** · id `nz-public-holidays`

**What it does.** Tasks stop for NZ public holidays the way they stop for a weekend, on the day the country actually takes off (a Saturday Christmas is the Monday). Per-task switches let a pour work a weekend or a holiday.

**For:** NZ builders, developers, owner-builders, PMs.

**Fact-check:** Confirmed for the eleven national holidays. Regional anniversary days (Auckland Anniversary etc.) are deliberately not included, and New Zealand is the only calendar QSME ships: other countries get Monday to Friday with 'No public holidays'.

**Exact on-screen wording:**
- “Public holidays: New Zealand / No public holidays”
- “Tasks skip these days the way they skip weekends, unless a task says it works public holidays. Jobs standing on them are moved later, and anyone booked in is asked to confirm.”
- “Works weekends”
- “Works public holidays — Off: this task stops for public holidays, like the rest of the country.”
- “Fri 6 Feb is Waitangi Day, and this task doesn't work public holidays”
- “Tasks now work through Labour Day”

**Best demo moments:**
- Amber band over Waitangi Day; a five-day task straddling it ends a day later.
- Drop a task on Labour Day: it lands on the Tuesday and the toast names the holiday.
- Switch 'Works public holidays' on for the concrete pour and only that bar sits on the holiday.

**Pains solved:** Programmes that count Waitangi Day, Easter or Matariki as working days · Finish dates a few days optimistic every long weekend

**Facts you can use:**
- Waitangi and Anzac Day Mondayised; Easter computed; Matariki from gazetted dates 2022–2052
- Checked against employment.govt.nz dates for 2021, 2022, 2025, 2026, 2027
- The server is the single source; web and phone get the same list

**DO NOT CLAIM:**
- ⛔ 'Every public holiday' — regional anniversary days are missing
- ⛔ Public holidays for any other country, or a Sunday-to-Thursday week, in Global videos
- ⛔ That old programmes were moved automatically

<sub>Evidence: backend holidays.go, holidays_api.go; commit cbe00dc9 · Reported by: schedule, changelog</sub>

#### 7.11 Christmas shutdown and your own days off

**NZ + Global** · **✅ live** · id `christmas-shutdown-days-off`

**What it does.** Every project is shut 23 December to 11 January by default, every year, so a programme running over Christmas no longer finishes two weeks early on paper. Shorten it, lengthen it, choose dates, switch it off, or add your own days off; planned work standing on those days moves later (never earlier) and anyone booked is asked to confirm.

**For:** NZ builders and developers; global users for their own shutdowns.

**Fact-check:** Confirmed: default 23 December to 11 January, three presets, up to 60 stretches of up to 120 days. On by default for every project, including global ones where it is not the custom. Not yet described in the public Knowledge Hub.

**Exact on-screen wording:**
- “Days off — The days nobody is on site. Jobs standing on them are moved out — always later, never earlier — and anyone booked in is asked to confirm their new dates.”
- “Christmas shutdown”
- “Shut 23 December to 11 January, every year. Nobody is on site and nothing is planned.”
- “The usual 23 Dec – 11 Jan · Shorter 24 Dec – 5 Jan · Longer 20 Dec – 18 Jan · Choose the dates”
- “This site works straight through Christmas and the New Year.”
- “Add a day off — What is it? (Site closed, crew away, wet weather…)”
- “12 jobs are planned on days the site is shut”
- “Move them off the days off”
- *(history)* “Moved off the days the site is shut”
- *(tradie notice)* “The site is shut then: …”

**Best demo moments:**
- Bars drawn straight through late December → Days off → amber '12 jobs are planned on days the site is shut' → 'Move them off the days off' → bars jump past 11 January and the finish date moves out.
- Tap 'Longer 20 Dec – 18 Jan' and watch January work slide.
- Add 'Crew away' for a week: a named band appears and work steps over it.

**Pains solved:** Finish dates that ignore the Christmas close-down · Telling a buyer or the bank a mid-January date that was never real

**Facts you can use:**
- Only 4 days in the 23 Dec–11 Jan span are public holidays; about 8 more working days used to be planned as ordinary days
- Started work and tradie-confirmed dates are not moved from this screen

**DO NOT CLAIM:**
- ⛔ That old programmes were fixed automatically (dates move only when the user presses the button)
- ⛔ Global: presenting the shutdown as a local convention — show 'Your own days off' instead
- ⛔ That it knows your crew's leave

<sub>Evidence: days-off-dialog.tsx; backend schedule_days_off.go; commits aa98632d, 43c1eb09 · Reported by: schedule, changelog</sub>

#### 7.12 Printed programme PDF (“Construction programme”)

**NZ + Global** · **✅ live** · id `programme-pdf`

**What it does.** One menu item turns the schedule into an A4 landscape PDF titled 'Construction programme' on your letterhead: five summary boxes, optional money boxes, a legend, the Gantt grouped by trade or unit with dates beside every bar, then the full task list in words. What you switched on is what prints.

**For:** Owner-builders and developers dealing with a lender or investor; builders sending a client a programme.

**Fact-check:** Confirmed (menu item in the live bundle; 3,000-row guard). 'A document a bank can be handed' is a developer's phrase in a commit, not a product claim or a bank's endorsement. No sample PDF exists in either repo.

**Exact on-screen wording:**
- “As a PDF — the chart and the task list”
- *(PDF title)* “Construction programme”
- *(PDF)* “[Project] · [N] tasks · as at 2 October 2026”
- *(PDF boxes)* “ON SITE FROM · FINISHES · HOW LONG · TASKS · NEXT MILESTONE”
- *(PDF)* “A contract's figures are shown once, against the first task that contract covers. The totals count each contract once.”
- *(PDF)* “Nothing is programmed between February 2027 and January 2029.”
- *(PDF legend)* “Milestone · Purple ring: drives the finish date · Outline: the dates already agreed”

**Best demo moments:**
- Tick Who, Days, Cost, Paid and 'What drives the finish date' → export → the PDF shows the same columns, the letterhead and purple rings.
- Zoom on the boxes: 'Finishes 14 Aug 2027 — set by 12 ringed tasks'.
- An A4 page slid across a desk (fictional banker), months along the top, a line on today.

**Pains solved:** The bank asks for a programme and all you have is a screenshot · Money that double-counts a contract or calls unconfirmed payments 'paid' · A Gantt that runs off the page

**Facts you can use:**
- A4 landscape, never steps up to A3
- A contract's price prints once (six tasks on one $450,000 contract never read as $2.7m)
- Durations read as '4 years 10 months'; long empty stretches are cut out as a marked band
- The server decides per project whose money may print

**DO NOT CLAIM:**
- ⛔ 'Bank-approved', 'bank-ready', 'accepted by NZ banks', or naming a bank
- ⛔ That it releases a drawdown or replaces a QS progress report
- ⛔ Percentages
- ⛔ A logo by default (letterhead must be set up)

<sub>Evidence: backend schedule_programme_export.go; commits a7475c54, 5a46440d, 2f852cb1 · Reported by: schedule, changelog</sub>

#### 7.13 Money on the programme: Cost and Paid columns, estimate vs agreed

**NZ + Global** · **✅ live** · id `money-on-programme`

**What it does.** Two optional columns: Cost (contract price, or the SOQ estimate marked '~' when nobody has agreed a price) and Paid ('Not paid yet' only where a real contract exists). A summary line shows Contracted, Paid and Still to contract; an 'Owed' chip filters.

**For:** Owners, managers and investors (the only people who see project money).

**Fact-check:** Confirmed. 'Paid' is what was recorded as paid, not money QSME moved.

**Exact on-screen wording:**
- “~$42,500 — An estimate — not a price anybody has agreed to”
- “Not paid yet”
- “paid $55,400”
- “Contracted $612,000 · Paid $240,000 · Still to contract ~$185,000”
- “Owed”
- “Money is shown to the project owner and managers.”

**Best demo moments:**
- Tick Cost and Paid: tender-stage tasks show grey '~$42,500', awarded ones a solid '$138,500'.
- Award the tender and the '~' disappears from that row.

**Pains solved:** Not knowing which numbers are real prices and which are guesses · Programmes that say you owe money on work nobody has been engaged for

**Facts you can use:**
- Screen and print answer to one shared table of test cases

**DO NOT CLAIM:**
- ⛔ Cash-flow forecasting, budgeting, cost-to-complete or earned value
- ⛔ That payments are verified by a bank
- ⛔ That tradies see the project's money
- ⛔ That the 'After' column is money (it is the task-dependency column)
- ⛔ GST labels in Global videos

<sub>Evidence: src/features/schedule/lib/bar-detail.ts; backend schedule_money.go · Reported by: schedule</sub>

#### 7.14 Who can see the schedule: Private, Trades, Public link

**NZ + Global** · **✅ live** · id `schedule-sharing`

**What it does.** One setting decides who sees the programme: just you and your managers while you re-plan, the people booked on tasks, or anyone with a public link (timeline and progress, never who is doing the work). A wrongly-sent link can be killed and replaced.

**For:** Owners and PMs sharing with tradies, clients, buyers, lenders and neighbours.

**Fact-check:** Live, with a correction: 'Show money on the public page' is ON by default, so a public link shows contract totals, paid and owed unless the owner switches it off. People, notes, checklist steps and SOQ pockets are stripped.

**Exact on-screen wording:**
- “Private — Only you and your project managers. Nothing goes out to the trades while you re-plan.”
- “Trades — The people booked on tasks see their dates and are told when something changes.”
- “Public link — Anyone with the link sees the timeline and progress — never who is doing the work.”
- “Show money on the public page — Contract totals, paid and owed. Off hides every amount.”
- “Sent the link to the wrong person? Make a new one — the old link stops working straight away.”
- “That link doesn't work any more — The owner may have made a new link or taken the schedule private. Ask them for the current one.”
- *(public page)* “Project schedule · Finished 4 of 12 · On site now 2”

**Best demo moments:**
- Flip to Private (amber padlock), re-plan, flip back: 'Your trades can see their dates — anyone with dates to confirm has been told'.
- Public link → open in a private window: read-only Gantt, 'Finished 4 of 12', no names.
- Switch money off and the amounts vanish; 'Make a new link' kills the old one.

**Pains solved:** Clients and buyers asking 'where are we at?' every week · Tradies seeing half-finished re-plans · A link sent to the wrong person

**Facts you can use:**
- Default visibility is Trades
- Only the owner or a manager can change the schedule

**DO NOT CLAIM:**
- ⛔ That the public link never shows money (it does by default)
- ⛔ That the link is password-protected
- ⛔ That public viewers can comment, confirm or edit
- ⛔ That tradies see the whole project

<sub>Evidence: share-dialog.tsx; src/routes/s.schedule.$token.tsx; backend schedule_sharing.go · Reported by: schedule</sub>

#### 7.15 All projects: search every schedule and download one pack

**NZ + Global** · **✅ live** · id `all-projects-view`

**What it does.** Search tasks across every project you can see, tick tasks on any of them, and download exactly what you are looking at as a PDF (chart and list per project) or a spreadsheet.

**For:** Developers and builders running several jobs; PM/QS practices.

**Fact-check:** Confirmed. It is a searchable list grouped by project, read-only — not one combined Gantt (qsme.build and the Knowledge Hub say 'one timeline', which overstates it).

**Exact on-screen wording:**
- “All projects — Search every project at once, tick tasks on any of them, and download them as one list”
- “Look in — All projects (7)”
- “Ticked only”
- “You get the 12 ticked tasks”
- “PDF — the chart and the task list”
- “Spreadsheet (CSV)”

**Best demo moments:**
- Type 'plumb': every plumbing task on every job lists under its project.
- Tick across three projects → Ticked only → Download.

**Pains solved:** Opening each job to find when the plumber is due everywhere · Building a weekly cross-project report by hand

**Facts you can use:**
- Money in a multi-project pack is decided project by project

**DO NOT CLAIM:**
- ⛔ A single combined Gantt of all projects on screen
- ⛔ Editing from this view
- ⛔ A portfolio dashboard or resource planner

<sub>Evidence: all-projects-view.tsx; backend schedule_list_export.go · Reported by: schedule</sub>

#### 7.16 What happened: full history, plain-words reasons, and Undo

**NZ + Global** · **✅ live** · id `schedule-history-undo`

**What it does.** A panel lists every change, newest first, in plain words: who moved what, what came along, who confirmed, and what stayed put and why. Each change has an Undo, greyed out with a reason when it can no longer be undone.

**For:** Anyone who has asked 'who moved that and why?'.

**Fact-check:** Confirmed.

**Exact on-screen wording:**
- “What happened”
- “Find a task or a person in the history”
- “Mon 12 – Fri 16 Oct → Mon 19 – Fri 23 Oct · a week later”
- “Gib stayed on Mon 12 Oct — it can't start before Framing finishes”
- *(headlines)* “Rain day — Tue 13 Oct · Tasks moved · Dates confirmed · Moved to fit awarded work · Moved off the days the site is shut”
- *(undo disabled)* “Something else has changed [task] since — move it by hand”

**Best demo moments:**
- An accidental drag → Undo → every bar goes back.
- A readable history timeline with names, times and reasons.

**Pains solved:** Nobody knows who changed the programme · One slip of the mouse wrecking a 200-task programme

**Facts you can use:**
- A change can be undone once, while nothing newer has touched the same tasks

**DO NOT CLAIM:**
- ⛔ A legal audit trail or 'tamper-proof'
- ⛔ Unlimited undo
- ⛔ Test counts as marketing numbers

<sub>Evidence: src/features/schedule/lib/change-words.ts; backend schedule_activity.go, schedule_undo.go · Reported by: schedule</sub>

#### 7.17 The schedule on a phone (mobile web list, native app screens)

**NZ + Global** · **🟡 merged** · id `schedule-on-phone`

**What it does.** On a phone the schedule is a list grouped Today / This week / Next week / Later with a Move button. The native app adds a per-project programme screen where a manager can add a task, import priced jobs, move dates, shift several tasks and log a rain day; tradies see their dates and do the safety check.

**For:** Site managers on site; tradies checking and confirming dates.

**Fact-check:** The phone-width web list is live. The native screens are in main but not confirmed in the App Store build (v1.0.0, 23 Sep; last native schedule commits 22 Sep). iOS only.

**Exact on-screen wording:**
- *(web on phone)* “This project | All projects”
- *(app)* “Build your schedule”
- *(app)* “Tap a task to open it · hold one to move it”
- *(app)* “Put this job on different dates”
- *(app)* “Sent for their OK”
- *(app)* “Which day was rained off? → Log the rain day”
- *(app)* “Rain likely today (80%)”

**Best demo moments:**
- Use the mobile web list for phone shots until the store build is confirmed.
- Today card on the phone: 'Rain likely today (80%)'.

**Pains solved:** The programme only reachable from the office computer

**Facts you can use:**
- Phone and web use the same server-computed days off

**DO NOT CLAIM:**
- ⛔ Native schedule editing until checked on the App Store build
- ⛔ Android
- ⛔ A Gantt chart on a phone (phones get a list)
- ⛔ Days off, programme PDF or the finish-date chain in the native app
- ⛔ Offline use

<sub>Evidence: src/features/schedule/components/schedule-list.tsx; mobile-app/src/features/schedule/* · Reported by: schedule</sub>

### 8. Build on site

#### 8.1 QR site sign-in poster and the on-site register

**NZ + Global** · **✅ live** · id `qr-site-sign-in`

**What it does.** Print one poster per project and fix it to the fence. Anyone who walks on — a subbie's crew, a delivery driver, an inspector — scans it with no app or account, gives a name and who they are with, ticks the PPE lines and this week's hazards, and is signed in for the day. The builder sees who is on site, who is due and not signed in, and can print the register.

**For:** Site managers, builders, main contractors; everyone arriving on site.

**Fact-check:** Confirmed in main and the live bundle. Signing in with a QSME account without the poster is on an unmerged branch. There is no sign-in screen inside the phone app: the QR opens a web page. The page footer is NZ-worded.

**Exact on-screen wording:**
- “Site sign-in”
- “Who are you with?”
- “Tick every line to sign in.”
- “Sign in for today”
- “You're signed in, {name}”
- “One sign-in covers this site for the day. It's on the record for the builder.”
- “Welcome back, {name} · Not you?”
- “Today on this site”
- “Due today, not signed in yet”
- “Print it, laminate it, cable-tie it to the fence. The code stays the same until you make a new one.”
- “The register as a PDF, on your letterhead · As a spreadsheet (CSV)”
- “Make a new code? — Every poster printed with the old code stops working.”
- *(footer)* “Site sign-in by QSME — the platform New Zealand builders run their projects on.”
- *(qsme.build)* “One poster on the gate. Everyone who arrives signs in; the daily log keeps what happened, with photos.”

**Best demo moments:**
- Close-up: a laminated poster cable-tied to a fence; a phone camera scans it and the page opens with the builder's logo and site address.
- A gloved thumb ticking big PPE rows, then 'Sign in for today' → 'You're signed in'.
- Next day: 'Welcome back' — one tap.
- The builder's On site page grouped by company with a 'Walked in' tag; the register PDF with a countersign line.

**Pains solved:** The wet, missing, half-empty paper sign-in book · Not knowing who was on site after an incident · Crews and drivers who are not on any app

**Facts you can use:**
- Needs a name plus a phone or email, and every line ticked
- Poster carries a QR code and a typed short code (like ABCDE-FGHJK)
- Register for a day, 7 or 30 days, capped at 92
- Only the owner or a manager sees the poster; codes can be rotated
- People who sign in become contacts filed under their company

**DO NOT CLAIM:**
- ⛔ That it makes a site compliant with WorkSafe or the Health and Safety at Work Act
- ⛔ GPS, geofencing, sign-out times or hours on site
- ⛔ That it verifies identity
- ⛔ A QR scanner or sign-in screen inside the phone app
- ⛔ A real register on screen (real names and phones)
- ⛔ Global footage showing the NZ-worded footer

<sub>Evidence: src/features/site-signin/*; src/routes/site.$code.tsx; commits e19364ca, daed15b3 · Reported by: people, global, changelog, marketing</sub>

#### 8.2 Site induction for awarded tradies

**NZ + Global** · **✅ live** · id `site-induction`

**What it does.** When a tradie wins a job they complete an induction on their phone before starting: read the site safety documents, tick eight statements and sign on. The owner sees who has signed on under 'On-site safety'.

**For:** Tradies starting on a new site; owners and site managers.

**Fact-check:** Confirmed: 8 statements. 'Free for every account' comes from App Store review notes, not a public page. The wording is New Zealand's (HSWA 2015, SSSP).

**Exact on-screen wording:**
- “Site induction”
- “HSWA 2015 — confirm the below before you start work on this site.”
- “3/8 confirmed → Signed on”
- “Site safety documents — Read these before you tick the boxes below.”
- “I've read and understood the Site-Specific Safety Plan (SSSP)”
- “I know the emergency procedures, assembly point and first aid”
- “Complete induction”
- “Your site induction is complete. Stay safe out there.”

**Best demo moments:**
- Phone: the pill counting '5/8 confirmed' as boxes are ticked, then green 'Signed on'.
- Owner's project screen: the On-site safety ring filling.

**Pains solved:** Inductions on a clipboard nobody can find later · Tradies starting before seeing the safety plan

**Facts you can use:**
- Once per contract; the daily check is separate

**DO NOT CLAIM:**
- ⛔ That it replaces a face-to-face induction
- ⛔ 'HSWA compliant' or 'keeps you compliant'
- ⛔ That the wording is tailored for other countries
- ⛔ That QSME writes the safety plan

<sub>Evidence: mobile-app/src/app/induction/[contractId].tsx; backend site_safety_service.go · Reported by: people</sub>

#### 8.3 Progress, auto-start, milestones and the daily safety check

**NZ + Global** · **✅ live** · id `progress-daily-check`

**What it does.** Each task is Planned, On site or Finished, and every step can be taken back. A task can start itself on its day and tell the people on it. A milestone (a diamond) can tick off a compliance step when finished. Where Site safety is on, the person starting work does a short check first.

**For:** Site managers, builders, tradies; owners tracking consent and CCC milestones.

**Fact-check:** Confirmed. The daily check only runs where Site safety is switched on for the project, and only for people on a task.

**Exact on-screen wording:**
- “Start work · Mark finished · Not started yet · Not finished yet”
- “Start tasks on their own day — When a task's day comes it is marked under way and the people on it are told. Off, someone presses Start work.”
- “This is a milestone — A one-day marker, e.g. Consent issued or CCC. Rain never moves it.”
- “Is this one of your compliance steps? — Yes — add it to the checklist”
- “Do the site safety check”
- “Sign on and start work”

**Best demo moments:**
- Press 'Start work': green. 'Mark finished': dark green with a tick.
- Milestone 'CCC issued' marked finished → the checklist step is ticked.
- Tradie's phone in the morning: 'Do the site safety check' → 'Sign on and start work'.

**Pains solved:** A programme that never reflects what is happening on site · Paper safety sheets and Google Forms nobody can find

**Facts you can use:**
- Notices go out from six in the morning; a site's day runs six till eight
- One sign-on covers the site for the day
- The check is 'a record, not a lock'

**DO NOT CLAIM:**
- ⛔ That it makes a site WorkSafe-compliant
- ⛔ Percent complete
- ⛔ NZ checklist steps (CCC, consent inspections) in Global videos

<sub>Evidence: src/features/schedule/job/progress-actions.tsx; backend schedule_autostart.go, site_safety_daily.go · Reported by: schedule, changelog</sub>

#### 8.4 Daily log with photos (a site diary that partly writes itself)

**NZ + Global** · **✅ live** · id `daily-log`

**What it does.** A day-by-day record of what happened on site. Add a note and photos from the phone; rain days, schedule changes, ticked steps, filed documents and chat messages tagged as proof, change or problem appear by themselves.

**For:** Site managers, builders, owners; tradies posting proof of work.

**Fact-check:** Confirmed: 10 photos per entry; 15 MB per photo on web. Automatic entries: rain days, schedule-move batches, tradies' answers, checklist steps, documents filed, tagged chat items. Notes and photos are still added by a person.

**Exact on-screen wording:**
- “Daily log”
- “What happened on site, day by day. Rain days, schedule changes, checklist steps and documents write themselves in — add a note for anything they miss.”
- “Add a note for today…”
- “Add photo — Take a photo / Choose from library”
- *(labels)* “Started · Finished · Site photo · Proof of work · Change request · Problem · Rain day · Schedule change · Checklist step done · Document filed · Note”

**Best demo moments:**
- Phone: 'Add photo' → camera → the photo lands in today's entry.
- A 'Rain day' entry appears on its own after the schedule is pushed.
- A chat photo tagged 'Proof of work' shows up in the log.

**Pains solved:** Writing the same news twice · No record of rain days when the client asks why it's late · Progress photos stuck on someone's camera roll

**Facts you can use:**
- Up to 10 photos per entry

**DO NOT CLAIM:**
- ⛔ That it fully writes itself
- ⛔ Live weather pulled automatically
- ⛔ A legal or contractual record
- ⛔ Video upload
- ⛔ Offline use
- ⛔ GPS- or time-verified photos

<sub>Evidence: src/features/daily-log/daily-log-page.tsx; commit 29446ba7 · Reported by: people, global, changelog</sub>

#### 8.5 Messages: project chat, direct and group, photos, files and voice notes

**NZ + Global** · **✅ live** · id `messages`

**What it does.** Everyone on a project is in one project chat automatically; you can message anyone on QSME one-to-one or make a group. Send photos, files and voice notes; tag a message as proof of work, a change request or a problem. Strangers arrive as a request you accept.

**For:** Site managers, tradies, owners and consultants on the same job.

**Fact-check:** Confirmed. Caution: the 'ring their mobile' button only appears when the other person's mobile is SMS-verified and you share a project, and SMS delivery is failing in production right now — do not film the call button. docs/CHAT.md is stale (still describes Stream).

**Exact on-screen wording:**
- “Messages”
- “New message · Group name — e.g. Concrete crew”
- “Record a voice message”
- “Mark as proof of work / Flag as change request / Flag a problem”
- “Project chat — everyone working on the project.”
- “Accept — let Sam message me / Decline / Block”
- “{name}'s number is only shown to people on the same project.”
- “Not sent — tap to try again”
- “Report this message · Block {name} · Mute this conversation”
- *(pricing page)* “Chat tied to the job, not a group text that nobody can find in six months.”

**Best demo moments:**
- The seeded plasterer thread: 'The painter starts Monday — can you have Unit B finished by Friday?' … 'Sweet as, see you Thursday.'
- Hold the mic: a voice-note bubble with a play button.
- Long-press a photo → 'Mark as proof of work' → it appears in the daily log.

**Pains solved:** Group texts and WhatsApp threads nobody can find later · Needing everyone's number first · Strangers spamming you

**Facts you can use:**
- A request carries three messages before the other person answers; replying accepts it
- Uploads into a project chat also land in project documents
- Message requests are web only for now
- Global: people from other markets are not searchable unless already connected

**DO NOT CLAIM:**
- ⛔ In-app voice or video calls (removed)
- ⛔ That anyone can ring anyone, or the call button on screen
- ⛔ Encrypted or 'secure' messaging
- ⛔ Full offline use
- ⛔ Message requests on the phone
- ⛔ The chat vendor's name

<sub>Evidence: public/knowledge-base/articles/messages.md; src/features/messaging/*; commits 782d8bb7, e63bebfa · Reported by: people, changelog</sub>

### 9. Documents & compliance

#### 9.1 Project documents: folders, uploads and version history

**NZ + Global** · **✅ live** · id `documents`

**What it does.** Every project has a filing cabinet with ready-made folders (Drawings, Compliance, Invoices, Proof of Work, Certificates, Contracts). Drag files or a whole folder in; uploading over an existing file makes version 2, keeping history and links.

**For:** Everyone on a project.

**Fact-check:** Confirmed: six default folders, 50 MB per file, CAD types accepted for storage, 1 GB on the free plan.

**Exact on-screen wording:**
- “Every drawing, consent and certificate”
- “Versioned project documents, safely stored and kept with the project — nothing lives in someone's inbox.”
- “Upload a new version — Replaces the file; the one it replaces stays under Version history”
- “Knowledge (versions & extracted text)”

**Best demo moments:**
- Drag a folder of PDFs in: '12 files uploaded', sorted into folders.
- Upload over 'Architectural Plans.pdf': the row shows v2.
- An inbox full of 'FINAL_v3_revB.pdf' vs one QSME row with a version number.

**Pains solved:** Nobody knows which drawing revision is current · Documents scattered across inboxes and phones

**Facts you can use:**
- Owner or manage members upload; everyone on the project can read

**DO NOT CLAIM:**
- ⛔ That CAD files are previewed or read by AI
- ⛔ Unlimited storage on the free plan
- ⛔ Version comparison or diffs
- ⛔ The July documents.mp4 as proof of plan reading

<sub>Evidence: public/knowledge-base/articles/documents.md; src/components/documents-page.tsx · Reported by: docs</sub>

#### 9.2 Search inside files

**NZ + Global** · **✅ live** · id `search-inside-files`

**What it does.** The Documents search looks at names and the text inside every version of every file, and shows the matching snippet.

**For:** Anyone hunting for a clause or a note.

**Fact-check:** Confirmed. Only files whose text could be extracted are searchable.

**Exact on-screen wording:**
- “Search documents by name or content…”
- “No documents match “{query}”.”
- *(qsme.build)* “Search works inside files, not just on filenames, so a clause in a specification or a note on a drawing is findable.”

**Best demo moments:**
- Type 'retention' and the snippet appears under the matching file.

**Pains solved:** 'It's in the spec somewhere'

**Facts you can use:**
- Searches extracted text from every version

**DO NOT CLAIM:**
- ⛔ Searching handwriting or drawing graphics
- ⛔ Cross-project search in the Documents box

<sub>Evidence: src/locales/en/documents.json; migration 20260318_document_extracted_text_search.sql · Reported by: docs</sub>

#### 9.3 Share links and private folder invites

**NZ + Global** · **✅ live** · id `share-links`

**What it does.** Share a document or folder by a link that needs no login, or invite someone privately by email to one folder; the private link locks to the first account that opens it and can be revoked.

**For:** Owners and PMs sending drawings to a lender, consultant or a tradie not on QSME.

**Fact-check:** Confirmed. Public links do not expire until made private.

**Exact on-screen wording:**
- “Share publicly (copies link)”
- “Public link copied — anyone with it can view this document”
- “Anyone with the link below can view this folder — no login needed.”
- “Invite people privately”
- “The link locks to the first account that opens it.”
- “Make private”
- “Revoke invite”

**Best demo moments:**
- Share a drawing, paste the link into a text: it opens without an account.
- Invite the engineer to the Structural folder only, then 'Revoke invite'.

**Pains solved:** Lenders and consultants who will not sign up to see one PDF

**Facts you can use:**
- Public links last until made private

**DO NOT CLAIM:**
- ⛔ That links expire or are password-protected
- ⛔ That viewers can edit or upload
- ⛔ View tracking

<sub>Evidence: src/locales/en/documents.json; migrations 20260614, 20260615 · Reported by: docs</sub>

#### 9.4 Compliance & process checklist (templates by job type)

**NZ + Global** · **✅ live** · id `compliance-checklist`

**What it does.** Pick the checklist that fits the job and QSME lays out the steps in three phases — consents, hold-point inspections, certificates, handover. Tick steps off, attach the document to the step, link a step to a schedule date, add your own steps.

**For:** NZ owners, developers and builders heading for a CCC; Australian and other projects get an Australian or general template.

**Fact-check:** Confirmed: seven built-in templates (four NZ, one Australia, two general). Inserting a template needs a paid plan or the trial.

**Exact on-screen wording:**
- “Compliance & process checklist”
- “No process on this project yet — Every job runs differently. Choose the checklist that fits this one — consents, inspections and certificates in order — or build your own steps.”
- “Phase 1 · Pre-Construction — Legal right to build — before a spade hits the dirt.”
- “Phase 3 · Post-Construction — Convert what you collected into a CCC and sign-off.”
- “Day-One gate — confirm before mobilising on site”
- “Hold point”
- “Uploaded to Documents → Compliance”
- *(NZ step)* “Building Consent (BC) approved & printed on-site”
- *(NZ step)* “CCC applied for (Form 6)”
- *(global)* “New build (general) — Permits, staged inspections and handover — the common journey anywhere, with no one country's rules.”

**Best demo moments:**
- Pick a template: three phases populate with progress bars at 0.
- Tick the consent step, attach the PDF: 'Uploaded to Documents → Compliance'.
- The amber Day-One gate box.

**Pains solved:** Reaching the end of a build with sign-off paperwork missing · First-time owner-builders who don't know what a PS3 is

**Facts you can use:**
- Templates: NZ new build (townhouses & multi-unit), renovation, commercial fit-out, subdivision & civils; Australia residential new build; general new build; general renovation/fit-out
- Global projects get the general template by default

**DO NOT CLAIM:**
- ⛔ That following it guarantees compliance, a CCC or sign-off
- ⛔ Legal advice, or up to date with every council
- ⛔ That QSME books inspections or lodges forms
- ⛔ NZ steps in Global videos
- ⛔ Templates for countries other than NZ and Australia

<sub>Evidence: backend checklist_templates.go; src/components/projects/ProjectChecklist.tsx · Reported by: docs, global</sub>

#### 9.5 QS reports from the SOQ: cost plan, progress claim, drawdown certificate, cost to complete

**NZ** · **✅ live** · id `qs-reports` · reader reported: merged (money reader) / live (documents reader) — **fact-checker status used**

**What it does.** From the project's SOQ, generate lender-style documents under your own letterhead: Cost Plan, SOQ Export (PDF or Excel), Progress Claim, Drawdown Certificate, Cost to Complete, and BOQ — Actual Payments.

**For:** NZ owners and developers with a construction loan; consultants and QS.

**Fact-check:** Fact-checker upgraded to live: the deployed bundle contains the QS reports screen ('Drawdown Certificate', 'Cost to Complete', 'NZIQS verified'). Six report types. Any client or consultant account on a paid plan or the trial can generate them; they are not written or certified by a QS. In code the gate is a paid plan plus account type, not the NZ edition — but the reports print NZIQS and NZD wording, so treat as NZ.

**Exact on-screen wording:**
- *(pricing page)* “Read drawings and consent packs, build a scope of quantities, and get a QS report you can hand to a bank.”
- “QS Reports”
- “Cost Plan · SOQ Export · Progress Claim · Drawdown Cert · Cost to Complete · BOQ — Actual Payments”
- “Certifies the value of work completed to date for the lender — used to release the next construction-loan drawdown.”
- “NZIQS verified / NZIQS verification pending”
- “Add items to this project's SOQ first — QS reports are generated from that data.”
- *(PDF)* “Prepared by: <name> (Quantity Surveyor — NZIQS verification pending)”

**Best demo moments:**
- Press 'Drawdown Cert', enter % complete per line and the lender name: a PDF headed with the user's own logo.
- The report table filling with 'Progress Claim #3', 'Drawdown Certificate #2', each with Download.

**Pains solved:** The bank wants a cost-to-complete before the next drawdown · Progress claims rebuilt in Excel every month

**Facts you can use:**
- Paid plans (Project Pro, Developer) and the trial; not GC Pro
- The NZIQS badge only reflects the user's own enrolment check
- The drawdown certificate has a signature line for whoever issues it

**DO NOT CLAIM:**
- ⛔ That QSME, a QSME QS or the AI certifies anything
- ⛔ That banks accept these reports, or naming a bank
- ⛔ That an independent or registered QS reviewed it
- ⛔ A statutory payment claim under the Construction Contracts Act
- ⛔ That it is free
- ⛔ QS reports in Global videos

<sub>Evidence: src/components/projects/QSReports.tsx; backend qs_report_service.go; entitlements.go · Reported by: docs, money, marketing</sub>

### 10. Pay

#### 10.1 Milestones: proof of work, invoice, then 'paid outside QSME' confirmed by the receiver

**NZ + Global** · **✅ live** · id `milestones-paid-outside`

**What it does.** Each stage has its own panel. The contractor submits what they did (description, photos, their invoice). The payer pays however they like and records it with a reference and optional receipt; the stage only counts as settled when the receiving side confirms the money arrived. One person cannot do both steps.

**For:** Both parties to any contract.

**Fact-check:** Confirmed. This is a record of a payment, not a payment. On Global it is the only way to settle ('recorded, never moved'; bank routes answer 403).

**Exact on-screen wording:**
- “Milestone timeline — Upload work, submit progress, and settle each milestone.”
- “Proof of work / Submit progress / Upload invoice”
- “How do you plan to settle this?”
- “Outside QSME — Bank transfer, cash, cheque — whatever suits. You settle up off QSME and record it here so both sides have the same record.”
- “I paid outside QSME”
- “Only mark this as paid if you have actually sent the money.”
- “Payment reference”
- “I have sent the money. → Mark as paid”
- “Confirm you received this payment — Only confirm if the money has arrived in your account.”
- “The money has cleared in my account. → Confirm payment received”
- “Recorded as paid outside QSME. Waiting for {name} to confirm the money arrived.”
- “Settled outside QSME and confirmed by both sides.”

**Best demo moments:**
- Contractor's phone: note, photo and invoice on Stage 2 → 'Submit progress'.
- Client taps 'I paid outside QSME', types the bank reference, ticks 'I have sent the money.'
- Both screens read 'Awaiting confirmation'; the contractor ticks 'The money has cleared in my account.' → 'Payment settled'.

**Pains solved:** 'I paid you last week' / 'No you didn't' · Invoices and proof living in someone's inbox · Two spreadsheets that disagree

**Facts you can use:**
- Only the paying side marks paid; only the receiving side confirms; one person cannot be both
- The contractor's invoice is filed in Documents → Invoices
- Status words: Not started / In progress / Work submitted / Awaiting confirmation / Settled / In dispute

**DO NOT CLAIM:**
- ⛔ That QSME verifies an outside payment happened ('this goes on your word')
- ⛔ 'Release the funds' in voiceover (implies QSME holds money)
- ⛔ That QSME pays, guarantees, secures or protects payment
- ⛔ Global: paying through QSME or any bank button
- ⛔ A Dispute button (API exists; no UI control found)
- ⛔ Tradie invoicing or CRM

<sub>Evidence: src/features/awarded-work/milestone-action-panel.tsx; src/components/payments/*; settlement.json; docs/GLOBAL_EDITION.md §3 · Reported by: money, global, marketing, live surface</sub>

#### 10.2 Pay a milestone with NZ open banking (bank to bank)

**NZ** · **🟡 merged** · id `open-banking` · reader reported: live — **fact-checker status used**

**What it does.** On an NZ-dollar contract the client taps Pay, their bank's app opens, they approve it there, and the money goes straight from their account to the contractor's bank-verified account. The bank payment is the record, so the stage marks itself paid for both sides.

**For:** NZ clients paying tradies; NZ tradies getting paid.

**Fact-check:** Fact-checker downgraded from live to merged. The code and routes are deployed and the live Knowledge Hub says both ways to pay are open, but whether the button appears depends on bank-provider settings in production that nobody could check, and the product has a fallback 'Open banking payments aren't switched on yet…'. The only evidence it is switched on is a 20 Sep commit message.

**Exact on-screen wording:**
- “Pay {name} {amount} with open banking”
- “One tap opens your bank's app. You approve it there and the money goes straight into {name}'s account — no card, no fees, nobody holding it in between.”
- “Opening your bank… / Continue in your bank”
- “Paid with open banking — the bank payment is the record.”
- “That payment didn't go through. Banks cap single payments — ANZ $5,000, Westpac $30,000 — so try a bank with a higher limit, or pay another way and record it below.”
- “Getting paid — Verify with my bank / Enter it myself”
- “The provider receives the full agreed amount. The success fee is charged separately to each party and is never taken out of the payment.”

**Best demo moments:**
- Only after the owner makes a real test payment: tap Pay → bank app → back to 'Paid with open banking — the bank payment is the record.'

**Pains solved:** Typing a tradie's account number from a text and hoping · Worry about a platform sitting on your money

**Facts you can use:**
- QSME never holds the money; payee must have a bank-verified account
- NZD only; QSME cap $100,000 per payment; bank caps differ (product quotes ANZ $5,000, Westpac $30,000)

**DO NOT CLAIM:**
- ⛔ Filming or promising it before a real production payment
- ⛔ Escrow, held in trust, 'we hold your money', payment protection or guarantee
- ⛔ Instant, unlimited or every bank
- ⛔ Refunds or reversals by QSME
- ⛔ 'No fees' about QSME overall (the 1% success fee is separate)
- ⛔ Naming the open-banking provider
- ⛔ Anything in Global videos

<sub>Evidence: routes_tenders.go direct-pay; backend akahu_service.go; settlement.json; commit b5c331cd · Reported by: money, marketing, live surface</sub>

#### 10.3 Project money page: estimate vs actual, every stage, your own money in and out

**NZ + Global** · **✅ live** · id `project-money`

**What it does.** One page per project shows SOQ estimate against what is committed and paid, every payment stage across every contract, the payment history, and entries you record yourself (money out, money in, supplier credits). Visible to the owner and people with manage or investor access.

**For:** Owners, developers, investors, QS/PMs.

**Fact-check:** Confirmed. One overstatement corrected: 'nothing financial is public' is not strictly true — a schedule shared by public link shows contract totals, paid and owed by default.

**Exact on-screen wording:**
- “Project money — Everything spent on and received for {project} — awarded contracts, invoices, and your own records.”
- “Total cost committed / Cost paid / Cost pending”
- “SOQ estimate (vs actual) — Under estimate by … / Over estimate by …”
- “Against your estimate: $212,400 committed of $264,497 — under by $52,097”
- “Record money out / Record money in”
- “OUT / IN / CREDIT · reduces Materials”
- “This project's ledger is in {currency}. QSME doesn't convert currencies”

**Best demo moments:**
- The headline line 'Against your estimate: … under by …' (illustrative numbers).
- Award a tender and 'Total cost committed' jumps.
- 'Record money out' → Council & consent fees joins the list.

**Pains solved:** Not knowing you are over budget until the money runs out · Council fees and cash jobs never making it into the cost picture

**Facts you can use:**
- Cost categories include Subcontractor, Labour, Materials, Council & consent fees, Finance & interest

**DO NOT CLAIM:**
- ⛔ Accounting software, or replacing Xero/MYOB
- ⛔ Cash-flow forecasting (unmerged branch)
- ⛔ Bank feeds or currency conversion
- ⛔ A net-profit figure
- ⛔ That money can never be seen publicly

<sub>Evidence: src/features/project-payments/*; payments.json · Reported by: money</sub>

#### 10.4 Sheets: your own spreadsheets inside the project, linked to jobs and payments

**NZ + Global** · **✅ live** · id `sheets`

**What it does.** Keep payment trackers, variations and expense sheets inside QSME instead of a loose Excel file. It works like Excel (tabs, paste, formulas), imports and exports Excel/CSV/PDF, and a line can link to a real job, contract or payment so 'estimated vs actually paid' shows in one place.

**For:** Builders, developers and QS/PM practices who run jobs from spreadsheets.

**Fact-check:** Confirmed on main and in the live bundle. Free plans hold 3 sheets per project. The assistant connector has 15 sheet tools in current code (12 at launch). 'A sheet only records.'

**Exact on-screen wording:**
- “Amount by status: Paid $31,900 (12) · Unpaid $12,400 (5)”
- “Paid / Part-paid / Unpaid”
- “Link to a payment…”
- “Estimate vs actual”
- *(formula box)* “Multiply two columns / A percentage of a column / What is still owing”
- “3 brackets are still open — add ))) at the end”
- “A sheet only records. Marking a line Paid does not pay anybody and does not touch the Money ledger.”

**Best demo moments:**
- Copy a block in Excel, paste into a sheet: rows fill.
- Click a Link cell, pick a payment: the Status chip flips to Paid and the totals line updates.
- Formula box: choose 'What is still owing' and pick two columns.

**Pains solved:** The payment tracker living in someone's Downloads folder · Formulas breaking when a non-spreadsheet person edits them

**Facts you can use:**
- Links to SOQ job, contract, payment, tender or schedule task
- Export Excel, CSV, PDF; import Excel or CSV

**DO NOT CLAIM:**
- ⛔ A full Excel replacement (macros, pivots)
- ⛔ That marking a line Paid pays anyone
- ⛔ AI silently editing a sheet (suggestions are proposals)
- ⛔ Real-time co-editing or live sync with Excel/Google Sheets

<sub>Evidence: src/routes/_authenticated/sheets.tsx; commits 58d0bc22, aa93ccf5, cdef4a89 · Reported by: changelog, docs</sub>

#### 10.5 NOT A FEATURE: escrow, QSME holding money, on-chain settlement, QSME-managed builds

**NZ + Global** · **⬜ planned** · id `no-escrow`

**What it does.** QSME does not hold anyone's money. Custodial escrow was withdrawn; on-chain escrow was never deployed; 'QSME manages it' is switched off.

**For:** Guardrail for the video team.

**Fact-check:** Confirmed and 'planned' is generous: withdrawn and dormant with no roadmap. 'Custodial escrow has NO routes'; the managed-build flag defaults off; zero occurrences of 'escrow' on the live homepage or in all 325 deployed script files. Treat as does-not-exist.

**Exact on-screen wording:**
- *(Knowledge Hub)* “the platform is not in the middle of it: it is not a bank, it does not hold your money, and it is not a party to your payments.”
- “nobody holding it in between”

**Best demo moments:**
- True NZ framing (once open banking is confirmed): 'Your money goes from your bank to theirs. QSME keeps the record, not the cash.'
- True Global framing: 'Pay the way you already do. QSME keeps the proof with the milestone.'

**Pains solved:** Sets the honest expectation: QSME solves the record and the paperwork, not custody of funds

**Facts you can use:**
- Reserved words until a financial-service-provider licence exists: escrow, held in trust, your funds, we hold your money

**DO NOT CLAIM:**
- ⛔ Escrow, held in trust, 'your funds are safe with us', 'funds released on approval', payment protection or guarantee
- ⛔ Blockchain, crypto, stablecoins or smart contracts
- ⛔ 'QSME manages your build', 'we hire the trades for you'
- ⛔ Dispute resolution by QSME

<sub>Evidence: docs/OPEN_BANKING_ESCROW.md, ONCHAIN_ESCROW_REFERENCE.md, ENGAGEMENT_MODELS.md, PAYMENTS_AND_ACCESS.md; routes_tenders.go · Reported by: money, marketing</sub>

### 11. Handover

#### 11.1 Trade certificates and the CCC pack (one zip for council)

**NZ** · **✅ live** · id `ccc-pack`

**What it does.** Licensed trades on the project record their certificates (electrical CoC, Records of Work, producer statements) and attach the official document; it lands in the checklist. The owner downloads a CCC pack — every certificate plus the council index — as one zip. A public guide lists every document a NZ build produces and who needs it.

**For:** NZ owners, developers and main contractors applying for a Code Compliance Certificate; LBPs, electricians, engineers.

**Fact-check:** Confirmed: NZ market only and paid plan. QSME records and compiles; it does not issue certificates or the CCC, and it does not send anything to council or a lender (the owner downloads and sends).

**Exact on-screen wording:**
- “CCC Pack”
- “Download every certificate plus the council index, as one zip”
- “The CCC pack — every certificate and the index council asks for, in one zip — comes with a paid plan.”
- “Issue Certificate — Record the certificate here and attach the official document issued through your certification system. It lands in the compliance checklist and the CCC pack.”
- “No certificates yet. Licensed tradies and professionals on this project issue their certificates here (electrical CoC, Records of Work, producer statements…).”
- *(guide)* “Site documents — what a build produces”
- *(guide)* “QSME does not generate the prescribed legal forms.”
- *(home)* “07 · Handover — Signed off. CCC issued.”

**Best demo moments:**
- An electrician records a certificate with the PDF; the matching checklist step moves.
- Owner presses 'CCC Pack': a zip downloads with certificates and an index.
- A shoebox of paper certificates vs one zip.

**Pains solved:** Chasing every tradie for their Record of Work months later · A CCC application held up by one missing certificate

**Facts you can use:**
- Documents named: PIM, resource and building consent, PS1–PS4, LBP Record of Work, Electrical CoC/ESC, gas certificates, as-laid drainage plan, CCC Document Pack (Form 6 supporting docs)

**DO NOT CLAIM:**
- ⛔ That QSME issues certificates, producer statements or the CCC
- ⛔ That the pack guarantees a CCC, is lodged automatically or is 'sent to council'
- ⛔ That it is free
- ⛔ Anything in Global videos
- ⛔ That producer statements are always mandatory

<sub>Evidence: src/components/projects/ProjectCertificates.tsx; backend ccc_pack_handler.go; src/config/site-documents.ts; commit 54be6f13 · Reported by: docs, marketing</sub>

#### 11.2 Profile, track record and two-way ratings after a finished job

**NZ + Global** · **✅ live** · id `ratings-track-record`

**What it does.** Every business gets a profile. Signed-in members see a Track record panel counting finished jobs, repeat clients, disputes and star ratings. Both sides rate each other after a job between two QSME members, and the rated person can reply.

**For:** Tradies building a reputation; clients choosing between quotes.

**Fact-check:** Confirmed. No public profile has a rating today. Global organisations have no public profile pages; ratings live inside the app.

**Exact on-screen wording:**
- “Track record”
- “Jobs done / Jobs commissioned / Finished cleanly / Came back for more / Disputed or cancelled”
- “From 3 ratings”
- “No completed jobs on QSME yet. Ratings appear here once a job with another QSME member is finished.”
- “As a contractor (n) / As a client (n)”
- “Ratings — Rate the people you have finished jobs with.”
- “Thanks — your rating is live.”

**Best demo moments:**
- Rate dialog: five stars, one line, toast 'Thanks — your rating is live.' (demo data, labelled).
- Phone: tap a face in a group chat → profile card with trades and a Message button.

**Pains solved:** Reviews you cannot trust because anyone can write them · Clients never being rated

**Facts you can use:**
- Ratings only come from jobs finished between two QSME members
- Contractor and client ratings are separate tabs

**DO NOT CLAIM:**
- ⛔ Populated ratings or review text presented as real customers
- ⛔ That reviews are moderated or verified beyond the job link
- ⛔ That the track record is visible logged out
- ⛔ Public profile pages for Global organisations

<sub>Evidence: src/features/reviews/*; src/routes/pro.$username.tsx; commit 981ac261 · Reported by: people</sub>

### 12. Across every stage

#### 12.1 Sign-up paths: “I hire” or “I provide services”, with NZ business lookup

**NZ** · **✅ live** · id `nz-sign-up`

**What it does.** At sign-up you say whether you hire or do the work, which decides your workspace. Providers pick trades. If you have a registered business, QSME finds it on the Companies Register by name or NZBN and fills in the registered name and directors; 'it's just me' is fine too.

**For:** New NZ users on either side.

**Fact-check:** Copy confirmed. Correction: a main contractor only gets the hiring workspace on the paid GC Pro plan; on the free plan a main contractor is a bidder only. The business lookup fills in register details; it is not verification.

**Exact on-screen wording:**
- “Get started with QSME — What brings you here?”
- “I hire — You run the project and hire others to do the work — create projects, post tenders, review proposals, and track costs.”
- “I provide services — You're a service provider — browse public tenders, submit proposals, win contracts, and deliver the work.”
- “Do you have a business? — If you do, we'll take the registered details straight from the Companies Office so you don't have to type them out.”
- “Find your business — Type the business name and pick it from the register, or enter your 13-digit NZBN.”
- “Taken from the Companies Register · NZBN {nzbn} · Directors on the register: {names}”
- “No — it's just me — You can still post work, bid and get paid.”

**Best demo moments:**
- Two big cards, 'I hire' vs 'I provide services'.
- Type a company name, pick it, the card flips to 'Taken from the Companies Register'.
- Trade picker with a 'License required for:' note.

**Pains solved:** Long forms asking for details the register already holds · Software that shows a tradie the same screens as a developer

**Facts you can use:**
- NZBN is 13 digits
- Passwords need at least 12 characters
- Live site: 'Free to join.'

**DO NOT CLAIM:**
- ⛔ The NZBN lookup in Global videos
- ⛔ That the lookup verifies the business
- ⛔ Sign-up inside the iPhone app
- ⛔ Sign-in by SMS code (delivery currently failing)
- ⛔ That main contractors get both workspaces free
- ⛔ 'Free forever' for hirers

<sub>Evidence: src/locales/en/signup.json; src/routes/(auth)/sign-up.tsx · Reported by: people</sub>

#### 12.2 Global edition: one platform, a second front door at app.qsme.build

**Global** · **✅ live** · id `global-front-door`

**What it does.** Organisations outside NZ use the same platform through their own door. Their organisation's market and country decide what they see, so NZ-only screens are neither drawn nor allowed by the API.

**For:** Main contractors, QS/PM practices and developers outside NZ.

**Fact-check:** Re-checked live: app.qsme.build → sign-in (noindex); NZ-only pages redirect to qsme.build. Corrections: qsme.build has no link to the app (APP_URL empty), so the public way in is 'Book a demo'; app.qsme.build's page title still reads 'NZ Construction Platform' before the app loads; 'runs live NZ projects' is thin proof (2 public projects) — use the site's phrase 'In production in New Zealand'. 'Every account belongs to an organisation' is a data-model fact; there is no screen to add team members.

**Exact on-screen wording:**
- “QSME global edition”
- “In production in New Zealand at qsme.co.nz”
- “The global edition runs the same platform for organisations outside New Zealand”
- *(global profile step)* “Your account — Your default workspace and public ID.”
- *(billing)* “Talk to us about pricing”

**Best demo moments:**
- Split screen: qsme.co.nz and qsme.build, same green mark — 'same platform, two doors'.
- Side-by-side sidebars: the global one is shorter (no Site Research, Marketplace, Products).

**Pains solved:** Overseas teams pushed through an NZ-flavoured product

**Facts you can use:**
- One codebase, one backend, one database
- NZ-only capabilities (site research, address lookup, directory, public tenders, bank payments, NZBN/LBP, NZ compliance, marketplace, property listings) answer 403 for global organisations
- Global businesses are not listed in the NZ directory or sitemap

**DO NOT CLAIM:**
- ⛔ Separate servers or in-country data hosting
- ⛔ Any customer, country or usage number
- ⛔ A sign-in or sign-up button on qsme.build
- ⛔ That NZ customers can sign up on the global app
- ⛔ That the phone app is tailored for global accounts

<sub>Evidence: docs/GLOBAL_EDITION.md; PRs #75–#90; live app.qsme.build redirects; API revision 321b5da9 · Reported by: global, changelog</sub>

#### 12.3 Global sign-up: pick your country, get your currency, timezone and tax

**Global** · **✅ live** · id `global-sign-up`

**What it does.** Sign up on app.qsme.build, choose your country from a searchable list, and the organisation is set up with that country's currency, timezone and tax name/rate. No NZBN or NZ-only fields.

**For:** Construction organisations outside NZ signing up themselves.

**Fact-check:** Deployed (app.qsme.build/sign-up returns 200 with a country selector) but not promoted: qsme.build never links to it. Choosing New Zealand sends the person to www.qsme.co.nz. Not visually verified.

**Exact on-screen wording:**
- “Country”
- “New Zealand has its own edition of QSME.”
- “It includes the New Zealand marketplace, public tenders and bank payments. You can still run projects in other countries from it.”
- “Sign up at www.qsme.co.nz”

**Best demo moments:**
- Type 'Can' → Canada; the profile shows GST 5% and CAD.
- Pick New Zealand: the note sends you to qsme.co.nz.
- Type '+44' in the dial code and it jumps to the United Kingdom.

**Pains solved:** Software that assumes your tax is GST and your phone starts +64

**Facts you can use:**
- 198 countries; 64 carry a known national tax label and rate (e.g. Germany VAT 19, Canada GST 5, India GST 18, Australia GST 10; US 'Sales tax' 0)
- The edition is decided server-side from the door you came in through

**DO NOT CLAIM:**
- ⛔ 'Sign up free' as the Global call to action (it is Book a demo)
- ⛔ That QSME is localised for 198 countries
- ⛔ Local tax compliance or filing

<sub>Evidence: commit dce906a1 (#84); config/countries.json; sign-up-form.tsx · Reported by: global</sub>

#### 12.4 Name your own tax (VAT, Sales tax, GST…)

**Global** · **✅ live** · id `own-tax-name`

**What it does.** A global organisation's owner sees 'What is the tax called where you are?' pre-filled from their country and can rename it and set the rate.

**For:** Owners and admins of global organisations.

**Fact-check:** Deployed. Narrow scope: only the profile page, letterhead preview and profile checklist follow the new name. Bids, contracts and the bid comparison still say GST, even though the in-app sentence says every label follows.

**Exact on-screen wording:**
- “What is the tax called where you are?”
- “Started from your country's national tax. Rename it and every price label on your account follows — bids, contracts, invoices.”
- “Tax name”
- “Rate %”
- “Save tax name”
- “Your prices are now labelled with VAT”
- “Reg. no. (letterhead, instead of NZBN)”

**Best demo moments:**
- Type 'VAT' and '20', save: toast and the letterhead preview updates.

**Pains solved:** Sending a UK or Gulf client a document that says 'GST'

**Facts you can use:**
- Rate 0–50%; name up to 20 characters
- NZ organisations always read GST 15%

**DO NOT CLAIM:**
- ⛔ That every screen, bid and contract shows your tax name
- ⛔ Tax calculation, compliance or e-invoicing

<sub>Evidence: commit 895a771c (#87); src/features/settings/profile/org-tax-settings.tsx · Reported by: global</sub>

#### 12.5 Process templates and addresses follow the project's country

**Global** · **✅ live** · id `country-templates`

**What it does.** A project's country picks its process templates: that country's first, then two General templates with no one country's law, then others behind a toggle. Addresses come from Google suggestions for the country, or are typed and saved as typed.

**For:** Global organisations building in any country.

**Fact-check:** Confirmed for templates and addresses. Correction: holidays do NOT follow the country — NZ is the only calendar, and the Christmas shutdown is on by default everywhere.

**Exact on-screen wording:**
- “Set up this project's process”
- “Recommended”
- “General — any country”
- “New build (general)”
- “Permits, staged inspections and handover — the common journey anywhere, with no one country's rules.”
- “Renovation or fit-out (general)”
- “Hide other countries' templates”
- “Not in the address register yet — that's fine, carry on. It will be saved exactly as typed.”

**Best demo moments:**
- The 'Recommended' badge on 'New build (general)' with its eight stages (Design & Approvals → … → Completion & Handover).
- An unlisted rural address saved as typed instead of refused.

**Pains solved:** Being handed another country's consent checklist · Address fields that refuse anything not in a register

**Facts you can use:**
- 2 general templates, 1 Australian residential, 5 NZ templates
- Fixed bug: 'A Lebanese project was being recommended NZ templates'

**DO NOT CLAIM:**
- ⛔ Local building-code or permit templates for countries other than NZ (and one Australian)
- ⛔ Local public holidays
- ⛔ Site research outside NZ

<sub>Evidence: commit 4343323d (#89); src/config/process-templates.ts · Reported by: global</sub>

#### 12.6 qsme.build: the global website in 15 languages

**Global** · **✅ live** · id `qsme-build-languages`

**What it does.** The global site reads in fifteen languages, picking yours from saved choice, browser language or country, with a switcher. Each language uses the trade's own word for a schedule of quantities.

**For:** Non-English-speaking contractors, QS and developers discovering QSME.

**Fact-check:** The marketing site is in 15 languages (Arabic and Persian right-to-left). Corrections: Spanish module and solution pages still show English body text; legal pages and the blog are English only; the app UI is English, Spanish and Arabic only. No evidence of native-speaker review.

**Exact on-screen wording:**
- “QSME now speaks 15 languages”
- “Now speaking 15 languages”
- “Yours next — tell us”
- “Construction is the same everywhere… What changes from country to country is the vocabulary — and vocabulary is where trust starts.”
- “a German estimator reads Leistungsverzeichnis, a Chinese contractor reads 工程量清单, a Gulf quantity surveyor reads جدول الكميات, a Turkish estimator compares bids poz poz”
- “Request a language or book a demo →”

**Best demo moments:**
- Language switcher montage: English → العربية (the layout mirrors right-to-left) → 简体中文 → Deutsch → Türkçe.
- One word changing across languages: schedule of quantities → Leistungsverzeichnis → 工程量清单 → جدول الكميات → Metraj cetveli.
- The going-global poster as an end card.

**Pains solved:** Construction software sites that are English-only or use the wrong trade words

**Facts you can use:**
- Languages: English, Arabic, Chinese (Simplified), Spanish, French, Russian, German, Portuguese, Turkish, Hindi, Indonesian, Japanese, Korean, Vietnamese, Persian
- Announced 27 September 2026

**DO NOT CLAIM:**
- ⛔ That the QSME app works in 15 languages
- ⛔ Fully translated Spanish product pages
- ⛔ Professionally or natively reviewed translations
- ⛔ Translated tutorial videos or legal pages

<sub>Evidence: /Users/brave/Dev/qsme.build src/i18n/config.ts; live qsme.build/blog/going-global; src/config/languages.ts in the app · Reported by: global, marketing, changelog, live surface</sub>

#### 12.7 Honest security page (ISO 27001 in progress, not certified)

**Global** · **✅ live** · id `security-page`

**What it does.** Lists what protects project data today (TLS, encrypted daily backups with a second copy, project roles, bidder visibility rules enforced on the server, signed records, managed cloud) and says plainly what is not in place.

**For:** Procurement, IT and risk reviewers.

**Fact-check:** Confirmed word for word on the live page. Use its sentences exactly; do not paraphrase upward.

**Exact on-screen wording:**
- “How QSME protects project data”
- “An information security management system aligned to ISO/IEC 27001:2022 is being built now. The programme is in progress; QSME is not certified and does not describe itself as certified, compliant or audited until an accredited certification body has completed its audit.”
- “We do not display badges, logos or ratings we have not earned.”
- “Is QSME ISO 27001 certified? — No.”
- “Do you have a SOC 2 report? — No. We do not claim one.”
- “We publish what is in place and nothing more.”
- “Rates, amounts and the tender budget are stripped out server-side, not hidden in the interface.”

**Best demo moments:**
- FAQ accordion: 'Is QSME ISO 27001 certified?' opens to 'No.' — a deadpan pattern interrupt.

**Pains solved:** Vendors with fake badges · Procurement questionnaires that stall a purchase

**Facts you can use:**
- DPA available on request for Enterprise; sub-processor list on request; hosting region 'confirmed with sales'

**DO NOT CLAIM:**
- ⛔ ISO 27001 certified, compliant, audited or 'by <date>'
- ⛔ SOC 2, SSO, MFA, GDPR-compliant, pen-tested, bank-grade or military-grade
- ⛔ Data residency in a named country
- ⛔ Badges
- ⛔ Internal audit findings

<sub>Evidence: Live qsme.build/security; qsme.build en.ts security.* · Reported by: global, marketing</sub>

#### 12.8 Book a demo and the five audience pages (global)

**Global** · **✅ live** · id `book-a-demo`

**What it does.** The main call to action on qsme.build is a demo form asking role, country (pre-selected) and projects running at once; sales replies by email with times or a written quote. Five pages speak to main contractors, developers/owners, QS/PM practices, subcontractors and enterprise.

**For:** Global prospects.

**Fact-check:** Confirmed. The 'within two business days' reply promise is still marked for the owner to confirm. hello@qsme.build is not live.

**Exact on-screen wording:**
- “Book a demo”
- “Which describes you best?”
- “Projects running at once”
- “For example: subcontract tendering for a 40-unit residential build, with two estimators and a site manager.”
- “Thanks — your request is in. We will reply by email with times for a walkthrough.”
- “See it on your own kind of project — Bring a real package. We will cut the tender, invite two test bidders and walk through the comparison and award on the call.”
- “Bring your spreadsheet to the demo”
- “Subcontract tendering and site management for main contractors”
- “Procurement, tendering and contract control for QS and PM practices”
- “For invited bidders — pricing and bidding are free”

**Best demo moments:**
- End card: 'See it on your own kind of project' + 'Book a demo'.

**Pains solved:** Canned demos on fake data · Sales sequences instead of an answer

**Facts you can use:**
- Demo: 30 minutes on a working project
- Phone +64 9 920 8896 (New Zealand); email hello@qsme.co.nz

**DO NOT CLAIM:**
- ⛔ Instant access, a free trial or same-day replies
- ⛔ 'Sign up at qsme.build'
- ⛔ hello@qsme.build
- ⛔ Case studies, customer logos or testimonials
- ⛔ Team seats as standard

<sub>Evidence: Live qsme.build/contact; src/components/DemoForm.astro; src/content/solutions/en/* · Reported by: global</sub>

#### 12.9 Enterprise options: organisation roles, white-label, embeddable tender board

**Global** · **⬜ planned** · id `enterprise-options`

**What it does.** Options listed as 'Enterprise plan — ask sales': shared organisation accounts with roles, white-label branding and domain, and a list of open tenders embedded in your own website.

**For:** Larger organisations (future).

**Fact-check:** Confirmed not available: the site says they 'are not described here as generally available'; member management is behind ORG_TEAMS_ENABLED=false; the tender embed is not built. A company cannot yet put several staff on one shared account.

**Exact on-screen wording:**
- “Enterprise plan — ask sales”
- “Organisation accounts, white-label branding and the embeddable tender board are Enterprise plan options delivered with sales. They are listed as “ask sales”, not as included, until they are generally available.”

**Best demo moments:**
- Text-only if at all: 'we will not pretend it is a toggle'.

**Facts you can use:**
- Roles named in copy: owner, admin, member

**DO NOT CLAIM:**
- ⛔ Any of these as available, included or on screen
- ⛔ Team seats or several estimators in one company account
- ⛔ SSO
- ⛔ White-label footage

<sub>Evidence: qsme.build src/content/solutions/en/enterprise-white-label.md; app ORG_TEAMS_ENABLED · Reported by: global</sub>

#### 12.10 QSME iPhone/iPad app

**NZ + Global** · **✅ live** · id `ios-app`

**What it does.** The phone app for people who already have an account: projects, messages with photos and voice notes, calendar and schedule, daily log, documents, tenders and bids, induction, people and notifications, with a home screen that changes for hirers and for people doing the work.

**For:** Tradies and site teams; owners checking a job from their pocket.

**Fact-check:** Confirmed by Apple's public lookup: v1.0.0 released 2026-09-23, free, Business, iPhone + iPad, iOS 15.1+, 0 ratings, on NZ/US/AU/GB storefronts. Not on Google Play. Sign-in only (accounts are made on the web). SMS code sign-in currently failing. No site sign-in screen inside the app. Phone features merged after about 22 Sep are not confirmed delivered. The build defaults to the NZ market. The listing's own description makes claims to avoid.

**Exact on-screen wording:**
- “Build Smarter. Connect Better.”
- “QSME connects your projects, people, and progress — all in one place.”
- “Good afternoon, {name}”
- “YOUR BUILD AT A GLANCE — Projects / Active contracts / To approve”
- “Your work at a glance — Opportunities / Awarded / To confirm”
- *(project tiles)* “Documents · Money · Ask for quotes · Invite · Messages · Schedule · Daily log · AI SOQ”
- *(qsme.build)* “Companion iOS app on the App Store”

**Best demo moments:**
- App opens on 'Good afternoon' with the green 'Your build at a glance' card.
- Project screen with eight tiles and the On-site safety ring.
- Calendar tab: 'Foundations and slab — day 2 of 6 — Planned'.
- Tradie home: 'Needs your attention — Confirm your dates'.

**Pains solved:** Site information trapped on the office computer · Tradies missing date changes

**Facts you can use:**
- 0 ratings so far
- In-app account deletion: Settings > Delete account
- Nothing is sold inside the iOS app

**DO NOT CLAIM:**
- ⛔ Android or Google Play
- ⛔ Creating an account or buying anything in the app
- ⛔ Site search on the phone
- ⛔ Ratings or download numbers
- ⛔ The listing's 'Automated Bill of Quantities', 'Secure Progress Payments', 'Save 15–25%' or 'mentor support'
- ⛔ Offline use
- ⛔ 'Book a tradie' or 'Bookings' tiles from old screenshots
- ⛔ Site sign-in inside the app
- ⛔ SMS code sign-in
- ⛔ A global-tailored app

<sub>Evidence: App Store id6776022454; mobile-app/app.json; docs/app-store/review-notes.txt; Play URL 404 · Reported by: people, marketing, changelog, live surface</sub>

#### 12.11 Bring your own AI assistant: Claude, ChatGPT, Claude Code, Codex, Cursor (MCP)

**NZ + Global** · **✅ live** · id `ai-assistant-connector`

**What it does.** Connect the assistant you already use to your QSME account. It can read projects, schedule, SOQ, tenders, contracts, sheets and analysed drawings, add SOQ lines, fill sheets, and draft tenders and contracts for you to review. It cannot move money, publish a tender, accept a bid, issue or sign a contract, or change the schedule. Settings → Connected apps shows what each app did and disconnects it.

**For:** Builders, developers and QS/PMs who already use an AI assistant.

**Fact-check:** Confirmed: live /connect page; 39 tools in the backend (17 read, 22 write); the page lists 10 read and 13 write. ChatGPT needs a paid plan with developer mode. The connection uses api.qsme.co.nz and an NZD convention, so it is not adapted for global currencies. Its bid tool returns a bid count only, so qsme.build's 'summarise the bids' overstates it.

**Exact on-screen wording:**
- “Bring your own assistant — Works with Claude and ChatGPT”
- “It never moves money, sends a tender or accepts anything. You stay in charge; it just does the typing.”
- “Use QSME from the assistant you already use”
- “What it can never do — Move money or record a payment · Send or publish a tender, or accept a bid · Issue, sign or cancel a contract · Change the schedule or delete a project”
- “The assistant drafts; you decide.”
- “Set it up in two minutes”
- “claude mcp add --transport http qsme https://api.qsme.co.nz/mcp”
- ““What's on my schedule this week, and who's turning up?””
- ““Draft a tender for the plumbing and drainage jobs, private, closing next Friday.””
- ““Here is my payment tracker — put it in QSME as a sheet, then tell me what is still unpaid.””
- *(Knowledge Hub)* “If an assistant tells you it has sent, paid or awarded something, it has not.”
- “Connected apps — Recent activity — What your connected apps have done, newest first.”

**Best demo moments:**
- Phone, in the ute: ask 'What's on my schedule this week, and who's turning up?' and get a real answer.
- Ask it to draft the plumbing tender; cut to QSME where the draft waits for a person to press publish.
- The /connect page's two columns: green ticks under 'What it can do', red crosses under 'What it can never do'.
- Settings → Connected apps → Disconnect: 'It will lose access immediately.'

**Pains solved:** Copy-pasting between ChatGPT and project tools · Fear of letting AI near money or contracts · Typing SOQ lines and tender scopes at night

**Facts you can use:**
- OAuth 2.1 with PKCE or a personal access token; hour-long tokens under a 30-day rotating refresh
- Two scopes: read and write; the assistant sees only what your login sees
- Tender and contract drafts stay private until a person publishes them

**DO NOT CLAIM:**
- ⛔ An assistant publishing, awarding, paying, signing or changing the schedule
- ⛔ 'Summarise the bids'
- ⛔ An official partnership with or endorsement by Anthropic or OpenAI
- ⛔ That free ChatGPT works
- ⛔ 'Nothing to check'
- ⛔ Global currencies (it works in NZD terms)
- ⛔ Real tokens on screen
- ⛔ Tool counts on screen

<sub>Evidence: Live www.qsme.co.nz/connect; backend handlers/mcp; knowledge-base ai-assistants-mcp.md; commit 29192e6a · Reported by: docs, global, marketing, changelog, live surface</sub>

#### 12.12 Contacts and People (your own crew list)

**NZ + Global** · **✅ live** · id `contacts`

**What it does.** A contact book for the people and companies you work with: add by hand, find a QSME user, import a spreadsheet, or pull from your phone. File them under your own categories, link people to their company, email up to 50 at once, and invite them onto tenders and projects.

**For:** Builders, main contractors, QS/PM practices with a subbie list.

**Fact-check:** Confirmed: name plus email or phone; 36 built-in categories plus your own; bulk email capped at 50 and a paid feature. Phone-contacts import is mobile only. 'Smart Add' and the August audit gaps (awarded winners not added to contacts; Leads page empty) were not re-verified.

**Exact on-screen wording:**
- “Import from Excel / CSV”
- “Add your own category — Name it the way you say it on site — Drainlayer, Gib fixing, Steel beams.”
- “Works for {name} · 2 people here”
- “Find them by username or company”
- *(phone)* “Add from your contacts — Pick people from your phone”

**Best demo moments:**
- Drop a subbie spreadsheet (Job, Company, Representative, Email, Number): preview shows people, companies and trades.
- Tick twelve contacts → New category → 'Drainlayer'.

**Pains solved:** The subbie list living in one person's phone · Everyone filed under 'Contractor'

**Facts you can use:**
- People who sign in at the gate are added to contacts
- Opening a direct conversation records each person in the other's contacts

**DO NOT CLAIM:**
- ⛔ A CRM or sales pipeline
- ⛔ Free bulk email
- ⛔ That awarding auto-adds the winner to contacts
- ⛔ Real contact lists on screen

<sub>Evidence: src/locales/en/contacts.json; commits baef63fb, 1db77518 · Reported by: people, changelog</sub>

#### 12.13 Everything you send goes out under your logo, not QSME's

**NZ + Global** · **✅ live** · id `your-letterhead`

**What it does.** Tender invitations, contracts, award summaries, QS reports, the printed programme, the sign-in poster and register, and the e-mails people receive are headed with your logo, trading name and contact details.

**For:** Builders, developers, QS/PM practices and consultants.

**Fact-check:** Deployed (not visually verified). This is letterhead with 'Powered by' QSME in the footer — not white-label.

**Exact on-screen wording:**
- “Finish your profile so your documents look like yours”
- *(footer)* “Powered by QSME”
- *(commit line)* “The client is the sender; we are the rail the message travelled on.”

**Best demo moments:**
- Upload a logo and the letterhead preview updates.
- Before/after: a tender invitation e-mail with QSME's logo vs the builder's.

**Pains solved:** Looking like a small operator hiding behind someone else's brand · Tradies ignoring invitations that look like platform spam

**Facts you can use:**
- Letterhead fields: logo, trading name, address, phone, e-mail, website, NZBN/GST number (Reg. no. on Global)

**DO NOT CLAIM:**
- ⛔ White-label or 'your own branded platform'
- ⛔ That QSME's name is removed

<sub>Evidence: commit 63241e04 · Reported by: changelog, docs</sub>

#### 12.14 AI credits, free-plan limits and the 14-day trial

**NZ** · **✅ live** · id `trial-and-credits`

**What it does.** Free accounts get a few AI trial uses. Every new account also gets 14 days of paid features (compliance checklist templates, QS reports, the drawing reader and the AI) with no card, then drops to the free plan keeping everything. Paid plans have a monthly credit allowance and can top up.

**For:** New NZ sign-ups.

**Fact-check:** Fact-checkers split. One rated it live (the trial banner is in the deployed bundle); the other rated the trial merged because no public page mentions it and the live pricing page says 'No trial clock'. We record it as live in the app but not public and in conflict with the pricing page — the owner must choose the message. The free 5-use AI cap is a default an environment variable can change; the trial carries 100 AI uses. The iOS app hides plan and credit wording.

**Exact on-screen wording:**
- “Your 14-day free trial has started”
- “Everything is unlocked until <date>: the compliance checklist, QS reports, the drawing reader and the AI. No card, and nothing to set up. After that you keep the free plan and everything you have made stays where it is.”
- “5 AI trial uses”
- “You're out of AI credits. Top up your wallet to read this pack.”
- *(pricing page)* “No revenue share. No per-seat surprises. No trial clock.”

**Best demo moments:**
- Not until the owner settles the trial message.

**Pains solved:** Paying before knowing if the AI can read your plans · Trials that delete your work

**Facts you can use:**
- Free: 5 lifetime AI uses (default)
- Trial: 14 days, 100 AI uses, no card
- Nothing is deleted when the trial ends; limits stop adding, never keeping

**DO NOT CLAIM:**
- ⛔ '14-day free trial' until the owner confirms
- ⛔ 'Unlimited AI'
- ⛔ That the free plan includes plan reading, QS reports or checklist templates after the trial
- ⛔ '50c per credit' or any price
- ⛔ A trial or AI allowance for Global
- ⛔ Buying credits in the iOS app

<sub>Evidence: backend domain/trial.go, entitlements.go; src/components/brand/trial-banner.tsx; live /pricing · Reported by: docs, changelog</sub>

#### 12.15 Knowledge Hub guides and voiceover walkthrough videos

**NZ + Global** · **✅ live** · id `knowledge-hub-videos`

**What it does.** A public library of plain-English guides split by which side you are on, plus short voiceover walkthroughs for each screen and a full tour, also played from the in-app Help button and embedded on qsme.build/platform.

**For:** New users; also b-roll for the video team.

**Fact-check:** Count corrected: 15 articles (the hub shows 17 links because it adds two side landing pages), not 16. The walkthroughs are Remotion animations with an ElevenLabs text-to-speech voice, not screen recordings; several predate product changes. qsme.build captions them 'Recorded in the New Zealand edition'.

**Exact on-screen wording:**
- “The client's guide to QSME”
- “The service provider's guide to QSME”
- “Start here — what QSME does and where everything is”
- “Words used in QSME”
- *(qsme.build)* “Recorded in the New Zealand edition — the global edition runs the same platform.”

**Best demo moments:**
- 'Jargon explained' shorts built from the glossary (SOQ, BOQ, retention, variation).

**Pains solved:** Construction software that needs a training course

**Facts you can use:**
- Read times 5–20 min
- client/full.mp4 303 s; service-provider/full.mp4 182 s; 1920x1080

**DO NOT CLAIM:**
- ⛔ That the walkthroughs are recordings of the live app or a real person's voice
- ⛔ The payments clip for Global (mentions a platform fee)
- ⛔ book-a-tradie, invoices, quotes or bookings clips

<sub>Evidence: src/knowledge-hub/articles.ts; public/onboarding/pages/*; video/README.md · Reported by: marketing, global</sub>

#### 12.16 Scroll build story on the NZ home page (three build types)

**NZ** · **✅ live** · id `home-scroll-story`

**What it does.** The NZ home page plays a build from bare site to handover as you scroll, in seven stages, and you can switch between a standalone home, townhouses and a granny flat.

**For:** NZ homeowners and small developers (top of funnel).

**Fact-check:** Confirmed: seven stages and a five-stage granny-flat story; produced visuals, not a customer build.

**Exact on-screen wording:**
- “Scroll — watch it get built”
- “01 · The site — Start with a site”
- “04 · Structure — Watch the structure rise”
- “07 · Handover — Signed off. CCC issued.”
- *(granny flat)* “Start small, start now — Up to 70 m² with no building consent — New Zealand's new rules make a granny flat the fastest home you can build.”
- “Your next project starts before the first nail.”

**Best demo moments:**
- Scroll-scrub from empty section to finished house with the '01 / 07' counter ticking.
- Tap the scene toggle: house → townhouses → granny flat.

**Pains solved:** Homeowners cannot picture the whole process

**Facts you can use:**
- Clips exist as MP4/WebM in public/landing (0.5–2.6 MB each)

**DO NOT CLAIM:**
- ⛔ That the clips show a real QSME project or customers
- ⛔ 'Up to 70 m² with no building consent' as legal advice or without its conditions
- ⛔ That QSME issues the CCC
- ⛔ 'Keys in weeks, not months' as a QSME promise
- ⛔ That QSME 'runs the full feasibility study for you' until the owner confirms that service

<sub>Evidence: Live www.qsme.co.nz; src/components/landing/cinematic/stages.ts · Reported by: live surface</sub>

#### 12.17 Nightly encrypted backups and security work

**NZ + Global** · **🟡 merged** · id `backups` · reader reported: live — **fact-checker status used**

**What it does.** Production data backed up daily, encrypted with a key held outside the hosting provider, copies in a second location; bank account and ID numbers sealed at rest; admin actions logged; an ISO 27001 programme under way.

**For:** Procurement reviewers; cautious developers.

**Fact-check:** Fact-checker downgraded to merged: the scripts, commits and a 28-document ISMS are on main and qsme.build/security publishes the statement, but nightly runs in production cannot be verified from the repo. Repeat only the exact sentences on the security page.

**Exact on-screen wording:**
- *(qsme.build/security)* “Encrypted daily backups — The production database is backed up every day. Backups are encrypted with a key held outside the hosting provider, and a copy is kept in a second location.”

**Pains solved:** 'What happens to my records if the host has an outage?'

**Facts you can use:**
- ISMS: 28 documents (internal programme, not certification)

**DO NOT CLAIM:**
- ⛔ ISO 27001 certification or compliance
- ⛔ That all data is encrypted at rest
- ⛔ Where backup copies are kept
- ⛔ Internal incident history (e.g. a backup job that once 'succeeded' without taking a backup)

<sub>Evidence: commits 2e215be2, 83050cd9, aa60fa09, 52c1fbe0 · Reported by: changelog</sub>

#### 12.18 On branches only: themes, shorter sidebar, account sign-in at the gate, push switch, download badges, SMS withdrawal

**NZ + Global** · **🔶 branch** · id `branch-only-items`

**What it does.** Unmerged work dated 27 Sep–2 Oct: a shorter sidebar; appearance themes (Clean white, Warm paper, Blueprint); site sign-in with a QSME account; a real push-notification switch; App Store/Android badges on qsme.co.nz; withdrawing phone/SMS sign-in while SMS is down.

**For:** Video team awareness — the sidebar and colours may change soon.

**Fact-check:** Confirmed not on origin/main (759f4820, 6cad0fff, d5ec09ba, 047c1557, 23ecdc54, 8dc71867). Branch 8dc71867 documents a live fault: SMS codes are not being delivered, so phone-code sign-in and SMS reset fail today.

**Best demo moments:**
- None. If recording this week, expect the sidebar and colour theme to change; re-capture after these merge.

**Facts you can use:**
- The NZ badge branch itself notes Android is not on Google Play yet

**DO NOT CLAIM:**
- ⛔ Any of these as available
- ⛔ SMS-code sign-in
- ⛔ An Android or Google Play badge

<sub>Evidence: git branch -r --no-merged origin/main · Reported by: changelog, people</sub>

#### 12.19 qsme.build homepage redesign (bento modules, floating bid chips)

**Global** · **🔶 branch** · id `qsme-build-redesign`

**What it does.** A richer homepage with animated bid bars and floating 'Bid received' / 'Agreement signed' chips.

**For:** Future b-roll.

**Fact-check:** Weaker than a branch: uncommitted local edits in /Users/brave/Dev/qsme.build (10 files changed plus untracked ModuleBento.astro). Not on origin/main and not live.

**Exact on-screen wording:**
- “Bid received — Bidder A · $318,200”
- “Agreement signed — Structure · 4 milestones”

**Facts you can use:**
- All figures are sample data

**DO NOT CLAIM:**
- ⛔ Recording localhost and presenting it as the live site
- ⛔ Any of these visuals as the current qsme.build

<sub>Evidence: git status in /Users/brave/Dev/qsme.build · Reported by: global, marketing</sub>

---

## (d) NZ-specific facts

Zones, councils, CCC, LBP, holidays, data sources and coverage limits.

- **Zoning coverage (4 councils).** Auckland (Unitary Plan, Operative in part), Wellington City (2024 Operative District Plan), Christchurch (District Plan via Canterbury Maps), Hamilton City (Operative District Plan). Every other council returns no zone and the verdict reads 'Zone not known here'. Wellington was inconsistent in live tests: avoid it in demos.
- **Auckland-only depth.** 28 Unitary Plan overlay/control/precinct/designation/hazard layers, the coloured neighbouring-zone map, numeric zone rules, 9 services and hazards checks, the full development report and requirements, and council property identity (property ID, valuation reference, postcode).
- **Nationwide basics.** Any NZ address on the LINZ register: address match, parcel boundary, land area, legal description, territorial authority, LINZ title facts (where the parcel has a title) and LINZ building outlines.
- **Data sources named in product.** LINZ (NZ Addresses layer 123113, NZ Property Boundaries 122657, NZ Property Titles 50804, NZ Building Outlines 101290; CC BY 4.0); Auckland Council open data (Unitary Plan, flood and coastal models, overland flow paths, Healthy Waters stormwater); Watercare (water and wastewater); Vector (gas and electricity network areas).
- **Disclaimers to keep on screen.** 'Indicative only — a planning heuristic from public council data, not advice… Confirm with a planner or the council.' and 'Mapped pipe positions are approximate — always lodge a beforeUdig request before any excavation. Not a substitute for a LIM, PIM or engineering advice.'
- **Licensed property data not available.** Owner names (LINZ title data licence), CV / land / improvement value (rating-value providers) and sale history (sales-data licence) are placeholders: 'Available with a data licence'. Only the owner count is shown.
- **Planning words used in the UI.** Resource consent, building consent, subdivision consent, section 224(c), restricted discretionary, height in relation to boundary, yards, building coverage, Height Variation Control, Special Character Area (pre-1944 buildings), notable trees, volcanic viewshafts / maunga, designation / requiring authority (s176 RMA), Stormwater Management Area (Flow), walkable catchment, Future Urban zone, precinct.
- **Title and cost words.** Fee simple (freehold), cross-lease (flats plan, other owners' consent), unit title (body corporate), Record of Title, LIM, PIM, HAIL, covenants, easements, consent notices; development contributions, Watercare infrastructure growth charge, build-over approval, CCTV survey, vehicle crossing permit, Fencing Act notice, 1%-AEP flood assessment, beforeUdig.
- **Auckland zone names viewers know.** Single House, Mixed Housing Suburban, Mixed Housing Urban, Terrace Housing and Apartment Buildings, Mixed Use, Town/Local Centre, Light/Heavy Industry, Future Urban, Countryside Living, Rural, Open Space.
- **Granny-flat rule as worded in product.** 'a detached minor unit up to 70 m² can often be added without resource consent (and with a simplified building pathway) where the site meets the conditions.' The homepage summary 'Up to 70 m² with no building consent' is shorter — keep the conditions.
- **Feasibility defaults (NZD).** 110 m² average home, $4,000/m² build, $30,000 contributions per extra home, 15% soft costs, 8% finance, 20% target margin. All editable starting points, not QSME data.
- **Public holidays.** Eleven national NZ holidays (Waitangi Day and Anzac Day Mondayised, Easter, King's Birthday, Matariki from gazetted dates 2022–2052, Labour Day, Christmas, Boxing Day, New Year). Regional anniversary days are not included. NZ is the only calendar.
- **Christmas shutdown.** 23 December to 11 January by default on every project, every year; presets Shorter 24 Dec–5 Jan and Longer 20 Dec–18 Jan. Code comment: 'almost nobody in New Zealand building is on site between the 23rd of December and the 11th of January'. Statutory working days exclude 20 Dec–10 Jan (template note tagged 'Snippet').
- **Built-in NZ programmes.** Townhouses (136 tasks, 235 working days consent to settlement, about 10¾ months, about four two-storey terraces, Auckland reference), Townhouses — with demolition (146 tasks, 250 working days), Standard NZ build — simple flow (28 tasks, about six months), Full development — land to titles (228 tasks, about 19 months, including 223/224 and titles). Durations are estimates.
- **Template task-note facts (verify before stating).** Written contract required for home-building work of $30,000 or more incl. GST with a disclosure statement and checklist; CCC decided in 20 working days; fibre company wants at least three months' notice; asbestos survey and a 5-day removal notice before demolition; power, water and fibre connections are 'the biggest hidden risk… apply in week one'. Tagged Sourced / Snippet / Estimate in docs/schedule-templates/townhouses.md.
- **Licensing bodies.** LBP (MBIE register) for restricted building work; EWRB (electricians); PGDB (plumbers, gasfitters, drainlayers); CPEng / Engineering NZ and NZRAB (engineers, architects); NZIQS (quantity surveyors). Only LBP has an automated lookup, and only if an MBIE key is configured; the others are checked by hand.
- **Business lookup.** NZBN (13 digits) and Companies Register lookup at sign-up fill in the registered name and directors; 'No — it's just me' is valid. Lookup is not verification.
- **GST.** 15%. A bid's GST basis (exclusive, inclusive, not registered) is frozen with the bid and carried to the contract; the comparison shows Excl. GST | GST | Incl. GST and marks worked-out figures 'calc.'. The GST inside a GST-inclusive figure is 3/23. '$300 apart on a $2,000 job'.
- **Payments.** QSME is not a bank or financial service provider and holds no money. Open banking (built, not confirmed on in production) is NZD only, to a bank-verified account (bank-login consent or a one-cent check), with a QSME cap of $100,000 per payment and bank caps quoted as ANZ $5,000 and Westpac $30,000. Reserved words until a licence exists: escrow, held in trust, your funds, we hold your money.
- **Success fee.** 1% of contract value each side, capped at NZ$2,000 each side, only when QSME's public marketplace introduced the parties, invoiced when the job completes on QSME's own invoice, never taken out of a payment. No fee when you invited the winner, on a direct contract, when the winner has no account, or when the work ends in a dispute.
- **Law named in product.** Construction Contracts Act 2002 (glossary and the 'Subcontract agreement (NZ)' template: payment claims, schedules, retentions held on trust, adjudication); Contract and Commercial Law Act 2017 (e-signature basis); Health and Safety at Work Act 2015 (site induction). None of it is legal advice.
- **Compliance paperwork.** Checklist steps and the CCC pack use real NZ items: PIM, resource and building consent printed on site, SSSP, development contributions, council hold-point inspections, LBP Records of Work, Energy Work Certificates, PS1–PS4, CCC applied for (Form 6), Compliance Schedule and BWoF, defects period. Four NZ checklist templates. CCC pack and certificate registry are NZ only and paid.
- **Regions.** 12 region pages for tenders, projects and tradies: Auckland, Wellington, Canterbury, Waikato, Bay of Plenty, Otago, Northland, Manawatū-Whanganui, Hawke's Bay, Taranaki, Nelson & Tasman, Southland. Only Auckland has content today.
- **Vocabulary.** tradie, subbie, section, consent pack, Gib stopping, LIM, CCC, LBP, council, drainlayer, Aotearoa, whānau, 'Sweet as'. Day-first dates, en-NZ formats ('Mon 12 Oct', 'today 2:14pm'), NZ time on the server. Macrons survive in imports and PDFs ('Kōwhai' once printed as 'K.whai' — fixed). Tutorial voiceovers pronounce the brand 'Q S me'.
- **Real-estate agents.** NZ real-estate agency work is a licensed activity; QSME's agent mode is a self-serve toggle with no licence check. Needs the owner's legal sign-off before any marketing.
- **Company and contact.** Baqshi Limited trading as QSME®; footer says 'QSME® is a registered trademark of Baqshi Limited' (registration status unconfirmed — the August shareholder report said pending). hello@qsme.co.nz, +64 27 338 8500 (mobile), +64 9 920 8896 (office), Mon–Fri 8am–6pm NZT. Hosts: www.qsme.co.nz (web), api.qsme.co.nz (API).
- **NZ-only capabilities.** site_research and nz_address_lookup (by country NZ); find_tradies, public_tenders, bank_payments, nzbn_verification, nz_compliance, marketplace_products, real_estate_listings (by market NZ). All hidden and refused (403) for global organisations.

---

## (e) Global-specific facts

Languages, what is hidden, countries.

- **Doors and hosts.** Marketing site qsme.build (Astro on Cloudflare, no login link, call to action 'Book a demo'); app at app.qsme.build (/ → sign-in, noindex; NZ-only pages redirect to qsme.build). One codebase, backend (api.qsme.co.nz) and database with NZ.
- **Call to action.** 'Book a demo' / 'Talk to sales'. Self-serve sign-up exists at app.qsme.build/sign-up but qsme.build does not link to it (APP_URL empty). Choosing New Zealand on global sign-up sends the person to www.qsme.co.nz.
- **Languages.** Website: 15 — English, Arabic, Chinese (Simplified), Spanish, French, Russian, German, Portuguese, Turkish, Hindi, Indonesian, Japanese, Korean, Vietnamese, Persian; Arabic and Persian right-to-left; Spanish module/solution pages still English; legal pages and the blog English only. App UI: English, Spanish, Arabic. Tutorial videos: English, NZ edition.
- **Countries.** 198-country table (currency, timezone, dial code); 64 carry a national tax label and rate. No country packs beyond NZ: one Australian residential template, two general templates. Integration-tested sign-up example: Canada → CAD, Toronto, GST 5%. A fixed bug once recommended NZ templates to a Lebanese project.
- **What is hidden.** Site research and LINZ lookups, public tender board and Opportunities browse, tradie and supplier directories, marketplace and products, property listings, NZBN/LBP verification, certificate registry and CCC pack, NZ process templates by default, open-banking payments, success-fee copy. Messaging search is limited to the organisation's own market or existing connections.
- **Tendering.** Always private, by invitation (30-day invitations, owner-only share link). A tender or project marked public by a global organisation is stored private. No embeddable tender board yet.
- **Money.** 'Recorded, never moved': the payer marks a milestone paid outside QSME with a reference and receipt, the receiver confirms. Bank-payment routes answer 403. No success fee is ever accrued for a non-NZ organisation.
- **Tax label.** Owners can rename the tax (e.g. VAT 20%), but only the profile, letterhead preview and checklist follow it so far; bids, contracts and the comparison still read GST. Letterhead shows 'Reg. no.' instead of NZBN.
- **Holidays.** No public-holiday calendar outside NZ: projects work Monday to Friday ('No public holidays'). The NZ Christmas shutdown (23 Dec–11 Jan) is still on by default and must be switched off or changed per project.
- **NZ leftovers inside the global app.** Built-in agreement templates are NZ-law ('Subcontract agreement (NZ)'); the AI chat prompt defaults to NZ terms and NZD for non-Australian projects; the AI connector assumes NZD; QS reports print NZIQS; the site sign-in page footer says 'the platform New Zealand builders run their projects on'; the app.qsme.build page title says 'NZ Construction Platform'.
- **Pricing.** Business / Enterprise / Enterprise + White-label, priced per organisation by projects running at once (open in the same month); no per-seat fees; no success fee; invited bidders never pay; Business month to month, Enterprise annual invoiced; every plan quoted by sales in writing; no public prices, free plan or trial advertised.
- **Enterprise 'ask sales'.** Organisation accounts with roles, white-label branding and domain, and the embeddable tender board are not generally available (member management flag off; embed not built).
- **Security page.** TLS and HSTS; encrypted daily backups with a key outside the host and a second-location copy; project roles; bidder visibility enforced server-side; signed records kept. Not ISO 27001 certified (programme in progress); no SOC 2; no SSO/MFA claims; hosting region 'confirmed with sales'; DPA and sub-processor list on request.
- **Mobile.** The iOS app is linked from qsme.build ('Companion iOS app on the App Store') but the build defaults to the NZ market and has not been adapted to read edition settings. No Android.
- **Proof and assets.** No customers, logos, testimonials or usage numbers. qsme.build/public/screenshots is empty; every 'screenshot' on the site is an illustration with invented data ('Riverside Terraces — Stage 2'). Embedded walkthroughs are 'Recorded in the New Zealand edition' and show NZD, GST and app.qsme.co.nz.
- **Words to avoid in global videos.** The qsme.build build check bans NZ terms outside About/Contact/Legal: CCC, LBP, tradie, open banking, public tenders, .co.nz addresses, NZ pricing. Say 'drawing set' not 'consent pack', 'tax' not 'GST', 'subcontractor' not 'tradie'.
- **Company and contact.** Baqshi Limited trading as QSME, a New Zealand company; sales phone +64 9 920 8896 (shown as New Zealand); hello@qsme.co.nz (hello@qsme.build not live); reply promise 'within two business days' still marked for the owner to confirm; founder described as 'a professional quantity surveyor and software architect' with no name.
- **Not live yet.** An uncommitted homepage redesign sits in the local qsme.build checkout (bento modules, floating 'Bid received' chips). Screen recordings of the live site taken now may look different later.

---

## (f) Pricing and fee facts

### QSME NZ

| Fact | Wording you can quote | Source | Caution |
|---|---|---|---|
| Free is a real plan, not a trial. Owners get their first project free (one active project), post tenders with no listing fee and invite their own tradies free. | Start free. Pay for the business you actually run. / Free is a plan, not a trial / Your first project, free | Live www.qsme.co.nz/pricing | App Store review notes say free accounts may run three projects — conflict, open question. |
| Free plan limits: 2 tender pockets and 3 sheets per project; 5 lifetime AI trial uses by default; 1 GB storage. | AI trial uses to try drawings and estimating | entitlements.go; Knowledge Hub user guide | The Knowledge Hub calls the AI allowance 'monthly'; code says lifetime. Do not quote a number. |
| Tradies and suppliers: the pricing page says unlimited public bids, free; invited bids are free in code. | Bid free, forever / Unlimited bids on public tenders / Nothing to pay if the job never goes ahead | Live /pricing; bids.json | The live tenders guide says public bids are 'Charged in wallet credits' with a monthly allowance; the code charges 0. Main contractors need GC Pro to view opportunities and to hire. Owner to resolve. |
| Paid plans are quoted, not published: Project Pro and Developer (owners), GC Pro (trades). The page asks how many projects you run at once and replies with a price, usually within one working day. | One house and twenty sites are not the same job, so they are not the same price. / Tell us what you run. We'll tell you what it costs. / Send me a price | Live /pricing; llms.txt; src/config/plans.ts (PUBLISHED_PRICING=false) | List prices exist in code ($99/$499/$999; an earlier $9) and are deliberately unpublished — never quote them. |
| The one fixed fee: 1% of contract value each side, capped at $2,000 each side, only on public-marketplace wins, invoiced when the job completes, on a separate QSME invoice. | The one fee that never changes / 1% each side, capped at $2,000 / Only on public bidding / Invoiced only when the job completes / Your own crew is always free — We don't take a cut of work you found yourself. | Live /pricing; config.go (100 bips, 200000 cents); success_fee_service.go | Old docs say 3% — stale. Confirm production env has not overridden the defaults. |
| No revenue share, no per-seat fees; monthly plans, no lock-in; payments final except double or erroneous charges. | No revenue share. No per-seat surprises. No trial clock. | Live /pricing FAQ | 'No trial clock' conflicts with the in-app 14-day trial banner. |
| Every new account gets a 14-day trial of paid features (compliance checklist templates, QS reports, the drawing reader, the AI; 100 AI uses), no card, then drops to free keeping everything. | Your 14-day free trial has started | backend trial.go; trial-banner.tsx (in the deployed bundle) | Not on any public page. Do not advertise until the owner picks the message. |
| Paid-plan features: Read my plans (plus 1 AI credit per 10 pages), QS reports, CCC pack, process/checklist templates, bulk e-mail to contacts. | Read drawings and consent packs, build a scope of quantities, and get a QS report you can hand to a bank. | entitlements.go; live /pricing | Extra credits are 50c each in the Knowledge Hub — do not quote. 'Hand to a bank' is the page's phrase, not a bank's endorsement. |
| Open-banking payments carry no card fee ('no card, no fees, nobody holding it in between'); the success fee is charged separately and never taken out of a payment. | The provider receives the full agreed amount. The success fee is charged separately to each party and is never taken out of the payment. | settlement.json | Open banking not confirmed on in production. 'No fees' refers to the payment, not QSME overall. |
| Other money items with no published terms: a verification fee setting (defaults to 0 per the reader), an optional real-estate commission percentage per listing. |  | docs/IDENTITY_VERIFICATION.md; migration 20261040 | Do not say verification or listing is free, or state any commission. |

### Both editions

| Fact | Wording you can quote | Source | Caution |
|---|---|---|---|
| Agreements (write, send, sign from a link) are free on every plan; AI actions inside them use credits. | Agreements is free on every plan. | Knowledge Hub agreements.md |  |

### QSME Global

| Fact | Wording you can quote | Source | Caution |
|---|---|---|---|
| Priced per organisation by the projects running at once; three plans; quoted by sales in writing. | Priced per organisation, by the projects you run at once / There are no per-seat fees and no success fee, and the subcontractors you invite never pay to bid. Every plan is quoted by sales. | Live qsme.build/pricing | No price, free plan or trial is published. |
| Business is month to month; Enterprise and Enterprise + White-label are annual, invoiced. A 'project running at once' is one open (estimated, tendered or built) in the same month; completed and archived do not count. Bands on the form: 1, 2, 3-5, 6-10, 11-20, 20+. | Per-seat fees — None / Success fee on tenders or contracts — None / Bidders pay to bid on your invitations — Never / You get a price by email, not a call you did not ask for. | Live qsme.build/pricing | Term wording still marked for owner confirmation in config. |
| Inside the app, global billing shows 'Talk to us about pricing' and links to qsme.build/contact. | Talk to us about pricing | commit 68269c36 (#90) | What plan a self-signed-up organisation gets is an open question. |

---

## (g) Reusable assets

Screenshots, tutorial videos with voiceover, illustrations, logos and demo data. "Use in video" is the honest answer for a paid short; every asset row carries its privacy note.

| Path | What it is | Edition | Use in video | Privacy | Note |
|---|---|---|---|---|---|
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/soq.mp4` | Voiceover SOQ walkthrough, 34.5 s, 1920x1080 (also https://www.qsme.co.nz/onboarding/pages/client/soq.mp4; embedded on qsme.build/platform). | NZ + Global | with care | Mock data only. | Remotion animation with ElevenLabs voice, not a screen recording; July/Sept render. Mute the VO for global (says 'G S T') and avoid NZD/URL-bar frames. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/tenders.mp4` | Tendering walkthrough, 20.4 s: create-tender wizard, scope from SOQ, compare, award. | NZ | with care | Mock data only. | VO uses public-tender language ('Publish it, and the bids come in'); shows app.qsme.co.nz, NZD and the removed 'Quick Jobs' sidebar item. NZ only, muted/cropped for global. Predates the GST comparison table and emailed quotes. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/schedule.mp4` | Schedule walkthrough, 64 s: two ways to start, linked jobs, slab-cure gap, rain day, tradies asked first, no loops. | NZ + Global | with care | Mock data only. | Predates holidays, Christmas shutdown, programme PDF and purple chain in print. Shows 'Book a tradie' on screen in places; for global mute and avoid those frames. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/schedule-deep.mp4` | Two-minute, twelve-chapter slow film of the schedule (128 s). | NZ + Global | with care | Mock data only. | Clean step shots (import from SOQ, order of work, rain day, loop refused, save as template). Same date caveat. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/documents.mp4` | Documents walkthrough, 16.1 s: six folders, upload, search by name or content, share. | NZ + Global | yes | Mock data only. | Most edition-neutral clip; still shows app.qsme.co.nz in the URL bar. Predates Plan index, so not proof of plan reading. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/full.mp4` | Full client walkthrough, 5:03, 28.6 MB, ten chapter cards (clean cut points); embedded in the qsme.build/platform hero. | NZ | with care | Mock data only. | Contains LINZ/council zone, 'Book a tradie', NZD, GST, and payments/awarded-work narration. Cut selectively; check for a bookings chapter. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/projects.mp4` | Projects walkthrough, 30.7 s, address-first LINZ boundary and council zone hero, 4-step project wizard. | NZ | with care | Mock data only. | NZ only. Predates the Site research rebuild. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/payments.mp4` | Payments walkthrough, 15.4 s. | NZ | no (audio) | Mock data only. | VO says 'Milestones release as the work is done' and 'And the platform fee? Always shown, up front.' Implies held funds and conflicts with global no-fee. Visuals only, with care. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/awarded-work.mp4` | Active Work walkthrough, 17.6 s. | NZ | no (audio) | Mock data only. | VO: 'release the funds, straight to them' conflicts with the no-escrow rule. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/client/book-a-tradie.mp4 (and invoices.mp4)` | Book a tradie and invoicing walkthroughs. | NZ | no | Mock data only. | Both features removed. Never use. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/pages/service-provider/` | Tradie-side walkthroughs: intro, opportunities, my-bids, awarded-work, my-documents, contacts, calendar, full (182 s); also quotes, bookings, customers. | NZ | with care | Mock data only. | my-bids.mp4 is still accurate. opportunities.mp4 VO mentions filtering by budget (budgets no longer public). quotes.mp4, bookings.mp4 and customers clips show removed features: never use. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/onboarding/audio/` | client-intro.mp3 and service-provider-intro.mp3, the spoken intros on the Knowledge Hub. | NZ | with care | None. | AI text-to-speech (ElevenLabs). Confirm voice and music licences cover paid social before reuse. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/video/` | Remotion project that renders all walkthroughs: page compositions (src/pages), VO scripts (scripts/vo/*.txt), VO MP3s and music beds (public/audio), brand marks, ~50 trade icons, brand tokens (green #16a34a, canvas #0b1220). | NZ + Global | yes (as reference/engine) | None. | Read-only for this task. Could render global-safe or 9:16 cuts with corrected scripts (TTS uses a paid key; owner approval needed). The VO scripts are approved plain-English copy; pronunciation used is 'Q S me'. brand.ts tagline 'Real assets management, made simple' is stale. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/landing/` | 86 cinematic build-stage clips and stills (mp4/webm/jpg, 1280x720, 5-8 s): standalone home stage-1-site to stage-5-dusk, townhouses th-1-site to th-7-complete, granny flat gf-1-idea to gf-5-movein, hero posters, tradies.v1.jpg. | NZ + Global | yes | AI-generated; people in tradies.v1.jpg are synthetic. | Never caption as a real QSME project or real customers. Polished look: use as cutaways, not as the UGC body. 720p only. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/screenshots/` | App Store screenshot sets (iphone-65.png, ipad-13.png, scaffold.png, source-capture.png) in 01-start-any-nz-address, 01-estimate-nz-build, 02-manage-projects, 03-compare-bids, 04-find-work, 05-win-jobs, 06-run-jobs, 07-get-started. | NZ | with care | Seed demo data, but 01-start-any-nz-address and 01-estimate-nz-build show real-looking residential street addresses (Remuera, Wanaka): crop or replace. | July 2026 captures, old UI. 01-start uses retired wording 'Have a site? Enter the address…'; 04-find-work shows demo '14 relevant tenders of 15'; 06-run-jobs has an encoding glitch; 07-get-started headline 'FREE FOR CLIENTS & TRADIES' overstates. 03-compare-bids and 05-win-jobs are usable as phone views. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/docs/play-store/screenshots/` | Real phone captures (phone/ 8 PNGs 1440x2560: landing, home, projects, project, calendar, conversation, messages, signup; tablet/ 5 PNGs) plus docs/play-store/feature-graphic.png ('Price it. Schedule it. Build it.'). | NZ + Global | with care | Seeded demo account ('42 Rimu Street townhouses', plasterer chat). | 04-project, 05-calendar and 06-conversation are the strongest. Do not use 02-home (shows removed 'Book a tradie' and 'Bookings'). Do not imply an Android release. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/qsmelogo.svg` | QSME wordmark (with ®), plus public/brand-mark.svg, public/images/qsme-og.png, mobile-app/assets/ (icon, hero background), public/trade-icons/. | NZ + Global | yes | None. | Brand green #16a34a. Do not use legacy baqshi-* logos. A copy of the wordmark is at /Users/brave/CreativeUGC/ventures/assets/qsme-logo.svg. |
| `/Users/brave/Dev/qsme.build/public/og/going-global.png` | 1200x630 'Now speaking 15 languages' poster with language chips and 'Yours next — tell us'; also public/og/default.png and public/brand/ logos. | Global | yes | None. | Ready end card for a languages video. Remember the 15 languages are the website, not the app. |
| `https://qsme.build (hero ProductMock) and /platform/tendering` | HTML product mocks: 'Riverside Terraces — Stage 2', 'Bids — 4 of 6 returned', three-bidder comparison table, bidder form, gate sign-in list, daily log card. | Global | with care | Invented names and figures. | Screen-record from the live site, label as illustrative. /Users/brave/Dev/qsme.build/public/screenshots/ is empty: there are no real global product screenshots. |
| `https://www.qsme.co.nz/ (hero address search)` | Live, public, no-login address check with map, boundary and services/hazards chips. | NZ | yes | Use an Auckland commercial or public address, or the owner's own property. Never a private person's home. | Best no-login 'wow' recording. A CBD commercial address returned a full result with amber hazard chips. |
| `https://www.qsme.co.nz/site-research and /site-research-pro` | Full Site research and Pro view (login required). | NZ | yes (owner records) | Same address rule. | Best demo: an Auckland residential section in a Mixed Housing zone with at least one overlay. Verified data shape: a ~209 m2 Mixed Use site on Mount Eden Road returned 'Strong', 2-5 homes, a road-widening designation, a Mount Eden viewshaft and pipes within 3 m. |
| `https://apps.apple.com/app/qsme/id6776022454` | Live App Store listing (QSME, free, v1.0.0, 8 iPhone + 5 iPad screenshots). | NZ + Global | yes | None. | 0 ratings: frame as new. Do not quote the listing's own claims ('Automated Bill of Quantities', 'Secure Progress Payments', 'Save 15–25%'). |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/templates/schedule/townhouses.csv` | Built-in Townhouses programme as a spreadsheet (136 tasks with plain-English notes); also townhouses.json and -with-demolition versions; public/templates/boq/*.json (11 BOQ templates, zero rates); public/samples/qsme-example-soq.xlsx, -priced-schedule.xlsx (an SOQ, not a programme), -payments.xlsx. | NZ | yes | Generic, no customer data. | Great for import/drag-in moments and story lines from the task notes. Template durations are estimates. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/knowledge-base/articles/` | Public Knowledge Hub guides (soq, proposals-and-tenders-guide, agreements, how-payments-work, schedule, schedule-colours, documents, verification-and-licences, messages, ai-assistants-mcp, glossary, user-guide, sheets…). | NZ | reference only | None. | Best plain-English fact-check source. Stale in places: 'two of ours' templates (there are four), All projects 'one timeline' (it is a list), public bids 'charged in wallet credits' (conflicts with pricing page), no Christmas shutdown section. schedule-colours.md has exact hex values for motion recreations. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/backend/internal/services/schedule_programme_export_test.go` | Test that writes a sample 15-task NZ programme PDF when QSME_PROGRAMME_OUT is set. | NZ + Global | no (needs a developer) | None. | No sample programme PDF exists in either repo. Export one from a demo project for the 'bank meeting' shot. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/tests/schedule` | Playwright harness pages with fixture data (gantt.html, days-off.html, all.html). | NZ + Global | no (needs a developer) | Fixture data only. | Would give clean customer-free screens if someone runs it. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/public/images/blog/ and public/blog-posts/` | Six live blog posts and their AI hero images. | NZ | no | None. | Contain false or unsupported claims (escrow, on-chain, Book a tradie, '20 hours a week', competitor tick-tables). Tone reference only. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/docs/marketing/` | QSME-Facebook-social-ad.pdf and QSME-LinkedIn-ad.pdf. | NZ | no | Internal. | Recruitment ads for an appointment setter, not product marketing. House rule inside: 'Do not invent earnings, user counts, or reviews.' |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/deep-research-report.md, PRODUCT_AUDIT_2026-05-26.md, SHAREHOLDER_PROGRESS_REPORT_2026-08-19.md, docs/ADDRESS_AND_LAND_DATA.md` | Competitive report, May product audit, shareholder report, July land-data audit. | NZ + Global | no | Confidential. | Angle and guardrails only. Never quote audit findings, shareholder numbers, internal prices or competitor names. Land-data doc is stale. |
| `/Users/brave/Dev/qsmenz-pro/baqshi-full-custom-go/SECRET_ROTATION_CHECKLIST.md and .env* files` | Secrets-related files in the repo root. | NZ + Global | no | Secrets. | Never screen-record the repo root. |

---

## (h) Story seeds and the strongest video features

### Strongest 12 for NZ

| # | Feature | Why it works on video | Best demo moment | Status | Watch out |
|---|---|---|---|---|---|
| 1 | Homepage address check (“Search your address”) (1.1) | Public, no login, a real 'whoa' in 20 seconds on any phone. | An Auckland address resolves and one chip flips amber: 'Flood plain — Present — check'. | ✅ live | Auckland address; not a private home. |
| 2 | Planning overlays & controls on the parcel (Auckland) (1.6) | The 'nobody told me that' moment every buyer fears. | A red row under Constraints: 'Designation · Road Widening (Auckland Transport)'. | ✅ live | Auckland only; free account needed. |
| 3 | “What this site would require” checklist (2.2) | Turns a section into an honest list of surprises with the reason for each. | Red REQUIRED badges stack; zoom on 'because: Cross-lease title'. | ✅ live | Not a complete or official list. |
| 4 | Rough feasibility calculator (“Your numbers, our arithmetic.”) (2.3) | Anti-FOMO money moment before an auction. | The green box 'What you could pay for the land to keep a 20% margin'. | ✅ live | Label numbers illustrative; user's own inputs. |
| 5 | Read my plans / Plan index: consent pack split into sections (3.3) | Nobody reads the 120-page consent pack; QSME tells you what is missing before the tender. | Chips appearing ('Bracing p.12–14') then 'Heads up: no drainage found in this pack'. | ✅ live | Paid plan or trial; reads, does not measure. |
| 6 | Compare bids: totals excluding and including GST, with a 'Lowest' tag (5.2) | GST confusion picks the wrong 'cheapest' quote. | Flip 'Compare on' from Excl. to Incl. and the 'Lowest' tag jumps bidders. | ✅ live | Totals table, not a line matrix. |
| 7 | Add a bid you received: emailed quotes join the comparison (5.1) | Half the quotes arrive as emailed PDFs. | The PDF beside its draft, the mismatch warning, then 'Received by you' in the table. | ✅ live | Owner checks every figure. |
| 8 | Agreements signed from a link — no account needed (6.2) + An awarded job becomes an agreement (“Make the agreement”) (6.3) | A subbie signs in the ute with no login; the award finally gets signed. | Finger signature on a phone → 'Signed. Download a copy below and keep it.' | ✅ live | Starting-point templates, not legal advice. |
| 9 | Christmas shutdown and your own days off (7.11) | Every NZ builder knows the January lie. | '12 jobs are planned on days the site is shut' → 'Move them off the days off' and the bars jump past 11 January. | ✅ live | Old programmes only move when the button is pressed. |
| 10 | Asked, not told: booked tradies confirm new dates (7.7) + Rain days and the rain outlook (7.8) | Humane, tradie-side: dates move with consent; rain days without arguments. | Tradie's phone: amber 'New dates — can you make them?' → 'Confirm dates'. | ✅ live | In-app and email only, no SMS; Android not available. |
| 11 | Printed programme PDF (“Construction programme”) (7.12) + What drives the finish date (the purple chain) (7.9) | The bank meeting: what is actually holding this build up? | Purple rings on screen and on the printed A4: 'Any one of them running late moves the whole finish.' | ✅ live | Never 'bank-approved'; no bank names. |
| 12 | QR site sign-in poster and the on-site register (8.1) | Physical, tactile, perfect for phone-shot UGC. | A laminated poster cable-tied to the fence; a gloved thumb ticks PPE; 'You're signed in'. | ✅ live | Not a compliance system; invented names on the register. |

### Strongest 12 for Global

| # | Feature | Why it works on video | Best demo moment | Status | Watch out |
|---|---|---|---|---|---|
| 1 | Tender cut from an SOQ pocket: private or public, invitations and share link (4.1) | One estimate, identical lines, private by invitation. | 'Select whole pocket' on a package, then 'Copy link' into an email to a subcontractor. | ✅ live | No public board on Global; no embed. |
| 2 | What a bidder sees and how they price (rates and budget never shown) (4.3) | Your rates and budget never reach bidders. | Split screen: owner's priced lines vs the bidder's same lines with the rate column blank. | ✅ live | Bidders may quote a single total. |
| 3 | Add a bid you received: emailed quotes join the comparison (5.1) | 'A subcontractor who quotes by PDF is not lost.' | Drop the PDF in; the draft appears beside the original; tick 'checked'. | ✅ live | Owner checks every figure. |
| 4 | Compare bids: totals excluding and including GST, with a 'Lowest' tag (5.2) | Bids held against each other on the same tax basis. | Flip the comparison basis and the 'Lowest' tag moves. | ✅ live | Labels still say GST on Global — check before filming; totals, not a line matrix. |
| 5 | Award in one click: the winning bid becomes a contract with milestones and retention (5.3) | 'Award becomes a contract, not a to-do.' | The Award dialog, then the contract card with its milestones. | ✅ live | Signing is a separate step; milestones fixed at award. |
| 6 | Agreements signed from a link — no account needed (6.2) | Subcontracts signed from a link, no account. | Phone signature, then the certificate page with the wording's fingerprint. | ✅ live | Built-in templates are NZ-law; say 'your own agreement' for Global. |
| 7 | Read my plans / Plan index: consent pack split into sections (3.3) | A drawing set split into sections with answers that cite the page. | Sections appearing one by one; a window schedule as a real table. | ✅ live | Say 'drawing set'; paid; no measurement. |
| 8 | Linked tasks: one trade slips, everything after it moves (7.6) + Asked, not told: booked tradies confirm new dates (7.7) | One slip moves the job; crews are asked, not told. | Drag Framing three days and the chain slides; a booked crew's bar goes amber 'waiting'. | ✅ live | No local public holidays; switch off the NZ Christmas shutdown. |
| 9 | What drives the finish date (the purple chain) (7.9) + Printed programme PDF (“Construction programme”) (7.12) | Shows what really sets the finish date, on screen and on paper. | Purple-ringed chain; the printed A4 'Construction programme'. | ✅ live | UI says 'What drives the finish date', not 'critical path'. |
| 10 | QR site sign-in poster and the on-site register (8.1) + Daily log with photos (a site diary that partly writes itself) (8.4) | Everyone at the gate signs in without an app; the diary keeps what happened. | Scan at the gate; 'On site today — 14 signed in' grouped by company. | ✅ live | Sign-in page footer is NZ-worded; no compliance claims. |
| 11 | Milestones: proof of work, invoice, then 'paid outside QSME' confirmed by the receiver (10.1) | Ends 'I paid you last week' with a two-sided record. | 'I have sent the money. → Mark as paid', then 'The money has cleared in my account.' | ✅ live | Recorded, never moved; QSME does not verify. |
| 12 | Bring your own AI assistant: Claude, ChatGPT, Claude Code, Codex, Cursor (MCP) (12.11) | 'It just does the typing' — AI drafts, a person decides. | Ask from a phone 'What's on my schedule this week?'; the drafted tender waits for a human to publish. | ✅ live | NZD convention; no vendor endorsement; no 'summarise the bids'. |

Global brand beats (not features): qsme.build in 15 languages (website only) — the language-switch montage and the going-global poster · The honest security page — 'Is QSME ISO 27001 certified? No.'

### Story seeds — real situations that could become videos

Humour punches at the situation or at QSME, never at the customer. Each seed names the features it shows and the guardrail to keep.

#### NZ

- **The strip the council wants** — A live test on a small Auckland mixed-use site came back 'Strong development potential' — and, under Constraints, 'Designation · Road Widening (Auckland Transport)'. 'I nearly bought it. Then one line showed the council wants a strip of it for the road.' *(features 1.6, 2.1; guardrail: Auckland address; fictional buyer; indicative only.)*
- **The back corner** — Open home: the front of the section looks dry; the homepage check flips one chip amber — 'Flood plain — Present — check' — because hazards are checked against the whole parcel, not the letterbox. *(features 1.1, 1.7; guardrail: Auckland only; 'Clear' never means 'won't flood'.)*
- **Room for 3!** — The flyer says 'room for 3!'. The code comment says 'Three homes on a 200 m² site aren't real'. The section vs the flyer. *(features 2.1; guardrail: Humour at the situation, never at an agent or customer; 'indicatively'.)*
- **Just a deck** — A homeowner planning a deck finds 'On a cross-lease the other flat owners must consent to any change of footprint'. Now they need the neighbour's signature. *(features 2.2; guardrail: Punch at the situation, not the neighbour.)*
- **The dream garage on a sewer main** — 'A public wastewater pipe crosses or borders the site: building within its clearance needs … approval, a CCTV survey and often a pipe relocation.' *(features 2.2, 1.7; guardrail: Auckland; pipe positions approximate.)*
- **The zone says five storeys; the maunga says no** — 'A viewshaft can cap height below the zone figure — the storeys above are not guaranteed.' Very Auckland. *(features 1.6, 2.1; guardrail: Auckland only.)*
- **The villa you planned to bowl** — 'Special character rules usually mean keeping the existing house, which lowers the realistic yield.' *(features 1.6; guardrail: Auckland only.)*
- **Run the number in the car** — Anti-FOMO auction story: in the car park before bidding, type the sale price and see 'What you could pay for the land to keep a 20% margin'. *(features 2.3; guardrail: Label 'illustrative numbers'; not financial advice; user's own inputs.)*
- **The big back yard** — The checklist surfaces 'Granny flat without consent … up to 70 m²' on low-density zones — parents in the backyard, keys sooner. *(features 2.2, 12.16; guardrail: Keep 'can often… where the site meets the conditions'.)*
- **Cheap for a reason** — No wastewater main near the lifestyle block: 'budget for a network extension (often via neighbouring land, needing easements) or an on-site system'. *(features 1.7, 2.2; guardrail: Auckland region data only.)*
- **Paste it how you got it** — People paste 'Flat 2, 12 Mt Eden Rd, Mount Eden, Auckland 1024, New Zealand' and most address boxes choke; QSME offers the 'Closest match'. And for a brand-new subdivision: 'Not in the address register yet — that's fine, carry on.' *(features 1.3; guardrail: Don't demo '12 mt eden rd' as an exact hit.)*
- **The tool that tells you to call a planner** — Every card ends 'Indicative only… Confirm with a planner or the council.' A video where QSME tells you what to ask the professional you are about to pay. *(features 1.4; guardrail: On-brand honesty; no 'replaces a planner'.)*
- **Section to shovel (long form)** — One Auckland address followed through Site research → verdict → requirements → rough feasibility → 'Create project here' → SOQ → tender → programme. *(features 1.4, 2.4, 3.1, 4.1, 7.1; guardrail: Demo project, invented people, Auckland commercial or owner's own address.)*
- **The January lie** — A developer promises a mid-January handover; the programme counted 24 Dec–10 Jan as working days and 'finished about two weeks earlier on paper than it ever could in life'. Fix on screen: '12 jobs are planned on days the site is shut' → 'Move them off the days off'. *(features 7.11; guardrail: Old programmes only move when the button is pressed.)*
- **The Labour Day pour** — 'A concrete pour does not care that it is Labour Day' — one switch lets that one task work that one holiday. *(features 7.10; guardrail: No regional anniversary days in the calendar.)*
- **Written for somebody who has not built before** — Template notes: 'Frames that arrive early sit in the rain; frames that arrive late stop the whole job.' / 'one tile on a slow boat holds up four bathrooms.' / connections are 'the biggest hidden risk… apply in week one'. *(features 7.4; guardrail: Durations are estimates.)*
- **The shoebox of certificates** — Chasing Records of Work and electrical certificates at the end of a build vs one CCC Pack zip. *(features 11.1, 9.4; guardrail: QSME compiles; it does not issue or lodge; paid plan.)*
- **Not found in a Facebook group** — Homeowner scrolling a community group for a builder vs sending one scope to invited trades — 'invited to your project, not found in a Facebook group'. *(features 4.6, 4.1; guardrail: Do not say the directory is verified (1 of 22).)*
- **Your own crew is always free** — A tradie sceptical of lead-gen fees hears: 'We don't take a cut of work you found yourself.' The fee is 1% each side, capped at $2,000, only when the public marketplace found the work. *(guardrail: No plan prices; bid-cost conflict unresolved.)*

#### Both editions

- **The 120-page consent pack** — Nobody, including the builder, reads it end to end. Press 'Read a document' and watch 'Finding the sections…' become '4 of 11 sections ready'. Then: 'Heads up: no drainage found in this pack.' — before the tender, not on site. *(features 3.3; guardrail: Paid plan/trial; say 'drawing set' for Global; it reads, it does not measure.)*
- **A guess dressed up as a fact** — A generic chatbot gives a confident number; QSME's chat labels it 'My estimate' and the drawing answer 'From your documents (… p.12)'. *(features 3.4; guardrail: Show the Beta line; never claim it is always right.)*
- **Which one's cheapest?** — One quote says '8,298 incl.', one '7,400 + GST', a sole trader's flat '7,900'. Flip 'Compare on' and the 'Lowest' tag moves. 'Because “2,000” means two different amounts to a client and a GST-registered builder — $300 apart on a $2,000 job.' *(features 5.2; guardrail: NZ GST; for Global say 'same tax basis' and check labels.)*
- **The subbie who only sends PDFs** — 'A subcontractor who quotes by PDF is not lost.' Drop the PDF in; QSME flags that the lines don't add up to the total; tick it against the original and it sits in the same table. *(features 5.1, 5.2; guardrail: Owner checks every figure; do not name the retailer from the commit example.)*
- **Five lump sums** — 'Five lump sums that cannot be held against each other' vs every bidder pricing the same SOQ lines. *(features 4.1, 4.3; guardrail: Comparison is totals plus each bid's own lines, not a cross-bid matrix.)*
- **Your budget stays yours** — Split screen: owner's lines with rates and budget; bidder's same lines with the rate column empty. 'Rates, amounts and the tender budget are stripped out server-side, not hidden in the interface.' *(features 4.3, 12.7)*
- **What is actually holding this build up?** — 'The one question a lender asks — what is actually holding this build up? — had no answer on the page.' An A4 programme slides across a desk: purple-ringed tasks and 'Any one of them running late moves the whole finish.' *(features 7.12, 7.9; guardrail: No bank names; never 'bank-approved'.)*
- **$450k that read as $2.7m** — A spreadsheet programme repeats a $450,000 contract price on six rows; QSME prints it once. *(features 7.12, 7.13)*
- **Asked, not told** — Group-text chaos vs one amber card: 'New dates — can you make them?' → 'Can't make it — On another site until the 20th'. 'A task with someone booked on it is never moved on them.' *(features 7.7; guardrail: In-app and email only (no SMS); people not on QSME get 'Give them a ring'.)*
- **'Dates saved' — the lie software tells** — A refused drag used to vanish while the toast said 'Dates saved'. Now: 'Gib stayed on Mon 12 Oct — it can't start before Framing finishes'. *(features 7.6, 7.16; guardrail: Self-deprecating; owner sign-off for internal-bug stories.)*
- **Rained off, again** — Tick a whole washed-out week in one go, preview what moves, 'Push these tasks'; the history says 'Rain day' as the reason. *(features 7.8, 8.4; guardrail: A person logs the rain day; the forecast only shades the chart.)*
- **Deal done on the phone** — 'A builder puts the task on the programme first and does the deal after, on the phone' — and used to get a second bar. Now the award lands on the same task. *(features 7.3)*
- **Agreed in every sense except a signature** — 'An awarded job was already an agreement in every sense except that nobody ever signed anything.' Amber banner → 'Make the agreement' → signed on a phone in the ute, no account. *(features 6.3, 6.2; guardrail: Draft first, nothing sent automatically; NZ-law templates.)*
- **The same squiggle, redrawn with a mouse** — 'A builder signs their own subcontracts, variations and letters of intent — the same squiggle, redrawn with a mouse on every one of them.' → one kept signature. *(features 6.2)*
- **'I paid you last week'** — Only the payer can mark it paid, only the receiver can confirm, and one person cannot be both. 'Marking something paid that you have not paid is the one thing the screen warns you about.' *(features 10.1; guardrail: QSME does not verify outside payments; never 'release the funds'.)*
- **The clipboard at the gate** — A wet, half-empty sign-in book vs a laminated poster: 'Print it, laminate it, cable-tie it to the fence.' Gloves on: the whole row is the tap target. Later: 'Who was on site that day?' — the register on the builder's letterhead. *(features 8.1; guardrail: No compliance claims; invented names on the register.)*
- **The diary that writes itself** — 'A rain day — the single biggest thing that happens to a build — left no mark at all.' Now it writes itself into the daily log. *(features 8.4; guardrail: Only some entries write themselves.)*
- **The group text nobody can find** — 'Chat tied to the job, not a group text that nobody can find in six months.' The seeded plasterer thread ends 'Sweet as, see you Thursday.' *(features 8.5; guardrail: No in-app calls; do not film the call button.)*
- **Everyone filed under 'Contractor'** — 21 of 52 contacts under 'Contractor' because there was nowhere to put a drainlayer or a scaffolder. 'Name it the way you say it on site.' *(features 12.12; guardrail: Use generically; don't cite the account.)*
- **It just does the typing** — On the couch: 'What's on my schedule this week, and who's turning up?' then 'Draft a tender for the plumbing and drainage jobs'. Cut to QSME, where a person presses publish. 'If an assistant tells you it has sent, paid or awarded something, it has not.' *(features 12.11; guardrail: No vendor endorsement; paid ChatGPT plan needed.)*
- **The Friday payment tracker** — 'Here is my payment tracker — put it in QSME as a sheet, then tell me what is still unpaid.' *(features 10.4, 12.11; guardrail: A sheet only records; marking Paid pays nobody.)*
- **Think before every phone buzzes** — 'Nothing goes out to the trades while you re-plan.' Flip to Private, re-plan, flip back. *(features 7.14; guardrail: Public link shows money by default.)*
- **$1,250.50 became $125,050** — A real bug, fixed before launch: 'A bid of $1,250.50 was submitted as $125,050.' 'We sweat the cents' — punching at ourselves. *(features 4.3; guardrail: Owner sign-off required before using internal-bug stories.)*

#### Global

- **Handed another country's checklist** — 'A Lebanese project was being recommended NZ templates.' The moment software assumes you live somewhere else — and the fix: the project's country first, then 'General — any country'. *(features 12.5; guardrail: Owner sign-off for internal-bug stories.)*
- **Vocabulary is where trust starts** — The same bid table while the word changes: Leistungsverzeichnis, 工程量清单, جدول الكميات, poz poz. 'Yours next — tell us.' *(features 12.6; guardrail: The website is in 15 languages; the app is in 3.)*
- **'Is QSME ISO 27001 certified? No.'** — A procurement manager braced for a sales pitch gets a one-word honest answer. 'We do not display badges, logos or ratings we have not earned.' *(features 12.7; guardrail: Quote the page exactly.)*
- **Why is there no price list?** — 'You get a price by email, not a call you did not ask for.' Per organisation, by projects running at once; no per-seat fee; subcontractors never pay to bid. *(features 12.8; guardrail: No prices.)*
- **The wrong door** — Someone in New Zealand lands on the global sign-up, picks New Zealand, and is politely walked across: 'New Zealand has its own edition of QSME.' *(features 12.3)*

---

## (i) Claim guardrails — the red list

Never say, show or imply any of these in any video, caption, thumbnail or post.

| ⛔ Never claim | Why | Edition |
|---|---|---|
| Escrow, 'held in trust', 'we hold your money', 'funds released on approval', payment protection, guaranteed or 'secure' payments | QSME never holds money; escrow was withdrawn and has no routes. Reserved words until a financial-service licence exists. | NZ + Global |
| Blockchain, crypto, stablecoins, smart contracts, 'on-chain' anything | Never deployed. Old blog posts and a /support waitlist line still say it — do not repeat. | NZ + Global |
| 'QSME manages your build', 'we hire the trades for you', 'QSME is your project manager' | The managed option is switched off. | NZ + Global |
| Any plan price ($9, $99, $499, $999), '50c per credit', or any Global price | Prices are quoted, not published. | NZ + Global |
| '14-day free trial', 'free forever', 'completely free', 'no fees' | The pricing page says 'No trial clock'; free is one project; the 1% success fee exists. Owner must pick the trial message. | NZ |
| 'Everyone bids free' / any credit cost for public bids | Pricing page and Knowledge Hub contradict each other; main contractors need GC Pro. | NZ |
| 'Any NZ address' for zoning, services, hazards, overlays or development potential; nationwide coverage | Zone: 4 councils. Everything deeper: Auckland only. Film Auckland and say 'Auckland first'. | NZ |
| That site research is a LIM, PIM, title search, valuation, planning advice or council-approved; 'you can build X'; 'no consent needed'; 'flood-free' | Every card says 'Indicative only… not advice'. | NZ |
| Owner names, CV / land value, sale prices or sales history | Locked placeholders: 'Available with a data licence'. | NZ |
| 'Verified tradies', 'every trade verified', 'licence-verified directory'; automatic register checks for all licences; police/background checks; instant or free verification | 1 of 22 profiles is verified, 0 have a verified licence; only LBP has an automated lookup (if configured); a verification fee setting exists. | NZ |
| Any count: users, customers, projects, tenders, tradies, suppliers, listings, downloads, ratings; 'thousands', 'hundreds', 'across the country' | Live numbers are tiny (2 tenders, 2 projects, 22 profiles, 3 listings, 0 properties, 0 app ratings). | NZ + Global |
| Testimonials, customer logos, case studies, star ratings, or fictional characters presented as real customers | None exist; studio rule forbids fake testimonials. | NZ + Global |
| Time or money saved ('20 hours a week', 'Save 15–25%'), 'mentor support' | No evidence (old blog and App Store listing). | NZ + Global |
| A side-by-side line-by-line matrix across bidders; 'QSME picks the winner'; 'conforming bid' | The comparison is a totals table plus each bid's own lines; award is a person's decision. | NZ + Global |
| Drawing mark-up, circling, takeoff, on-screen measurement; 'AI measures your drawings' | Viewer switched off since 4 Sep; AI reads what drawings say. qsme.build still says 'mark up the drawings'. | NZ + Global |
| 'Nothing is guessed', '100% accurate AI', 'AI replaces your QS / planner / lawyer' | The chat is Beta and says 'It can get things wrong'; every AI output is a draft to check. | NZ + Global |
| An AI assistant that awards, signs, pays, publishes a tender, changes the schedule or 'summarises the bids'; an official partnership with Anthropic or OpenAI; works with free ChatGPT | Those tools do not exist on the connection; it is a user-added connector. | NZ + Global |
| 'Legally binding everywhere', legal advice, lawyer-approved templates, e-signature validity outside NZ | Templates are 'a starting point, not legal advice'; the legal basis cited is NZ law only. | NZ + Global |
| QS reports or the programme as 'bank-approved', 'bank-ready', 'accepted by lenders', certified by a QS; naming any bank | Generated by the user from their own SOQ; 'a document a bank can be handed' is a commit phrase. | NZ + Global |
| QSME issues the CCC, producer statements or certificates; guarantees consent or a CCC; lodges with council or sends to a lender | QSME records and compiles; the user downloads and sends. | NZ |
| Health-and-safety compliance (WorkSafe, HSWA) from sign-in, induction or checklists | 'A record, not a lock'. | NZ + Global |
| Android / Google Play; SMS or text messages; in-app calls; offline mode; phone features merged after 23 Sep (Site search, Pro cards, native schedule edits) shown as in the app | iOS only; SMS delivery failing; calling removed; store build predates those commits. | NZ + Global |
| 'The app is in 15 languages'; fully translated Spanish pages; native-reviewed translations | Website: 15; app: English, Spanish, Arabic; Spanish product pages partly English. | Global |
| Global: local public holidays, local tax compliance, tax name on every document, data residency, team seats, white-label, embedded tender board, public tender board, directories, marketplace, site research, bank payments | None exist for global organisations. | Global |
| NZ words in Global videos: tradie, CCC, LBP, open banking, public tenders, GST, consent pack, NZD | Banned by the qsme.build copy rules; use subcontractor, tax, drawing set. | Global |
| ISO 27001 certified / compliant / audited / 'by <date>'; SOC 2; SSO; MFA; GDPR-compliant; pen-tested; bank-grade or military-grade | The security page explicitly says not certified and makes no such claims. | NZ + Global |
| Removed features: Book a tradie, Quick Jobs, Bookings, tradie Quotes & Variations, invoice builder, CRM pipeline, calling/screen share, percent-complete | All removed; still visible in old clips and screenshots. | NZ + Global |
| Properties to browse, licensed/verified agents, commission terms, investment returns, 'real-estate portal' | 0 listings; agent mode is self-declared with no licence check. | NZ |
| Buying, ordering, checkout or delivery in the marketplace; a stocked catalogue | Catalogue only, 3 listings. | NZ |
| 'The public schedule link never shows money' | Money on the public page is ON by default. | NZ + Global |
| Variations that change the contract sum; cash-flow forecasting; rate book; estimate version history; accounting software / replaces Xero or MYOB | Unmerged branches or not built. | NZ + Global |
| QSME holds, protects or releases retention; retention-trust compliance | Retention is a recorded percentage; no release workflow. | NZ + Global |
| Named competitors or comparisons (Procore, Buildertrend, Buildxact, Builderscrack, Relab, CoreLogic, QV, homes.co.nz, Trade Me Property, OneRoof) | QSME does not win on breadth; old comparison blog was judged inaccurate. | NZ + Global |
| Walkthrough videos as screen recordings, real footage or a real person's voice; reusing payments/awarded-work audio ('release the funds', 'platform fee') | Remotion animations with an AI voice; some lines are now wrong. | NZ + Global |
| Template durations as official ('your townhouses will take 10¾ months') | Estimates from one automated web pass; numbers differ between sources. | NZ |
| 'Sign up at qsme.build' / 'Sign up free' as the Global call to action | qsme.build is demo-led and has no sign-up link. | Global |
| 'Instant' site research, verification or plan reading | Seconds to minutes; verification usually one business day. | NZ + Global |
| 'Registered trademark' spoken on camera | Footer says registered; the August shareholder report said pending — confirm first. | NZ + Global |
| Internal material: audit findings, shareholder numbers, commit counts, App Store rejection history, backup incidents, the 'CEO's first file' story | Confidential or needs owner sign-off. | NZ + Global |
| Real private addresses, names, emails, phone numbers, registers or tokens on screen | Privacy; studio rules. Use a demo project and invented people. | NZ + Global |
| Old App Store wording: 'Have a site? Enter the address to see what's possible', 'FREE FOR CLIENTS & TRADIES', '14 relevant tenders of 15' | Retired or demo data. | NZ |

---

## (j) Open questions for the owner

### High priority

1. **Has a real milestone been paid through NZ open banking in production?** The fact-checker downgraded it to merged; it depends on production config. No payment video until confirmed. *Blocks: 10.2, no-escrow framing.*
2. **Which trial message do we use: the in-app '14-day free trial' or the pricing page's 'No trial clock' / 'Free is a plan, not a trial'?** Both are live and read as a contradiction. *Blocks: 12.14, any 'try it free' CTA.*
3. **Do public-tender bids cost anything? Pricing page: 'Bid free, forever'. Tenders guide: 'Charged in wallet credits', monthly allowance, GC Pro to bid. Code: 0.** Every tradie-side video depends on it; the guide should be fixed either way. *Blocks: 4.3, 4.10, own-crew-free seed.*
4. **What can we say about verification? Is the MBIE LBP key set, is the automated ID scan on, is there a verification fee — and will the homepage line 'Every trade. Verified.' be changed (1 of 22 verified)?** 'Verified' is the riskiest word on the live site. *Blocks: 5.4, 5.5, 4.6.*
5. **Privacy: the public profiles endpoint (no login) returns an email for 14 of 22 profiles, a phone for 3, plus wallet_address and subscription_plan. Intended, or a leak?** Possible exposure of members' contact details; fix before driving traffic. *Blocks: 4.6.*
6. **Is phone Site search (and the later phone schedule changes) in users' hands via an over-the-air update? When will SMS delivery be fixed? Any Android date?** Phone UGC (open-home scenes) depends on it. *Blocks: 1.11, 7.17, 12.10.*
7. **Who records real screens from a demo account (NZ and Global) with invented people, a letterhead, a sample programme PDF — and which address may be shown?** No current screenshots exist; nobody logged in during research. *Blocks: all screen-based videos.*
8. **Global call to action: 'Book a demo' or app.qsme.build/sign-up? What plan does a self-signed-up organisation get?** qsme.build has no sign-in link; sign-up is live but hidden. *Blocks: 12.2, 12.3.*
9. **Are the 2 public tenders and 2 public projects demo seed data? May they appear on screen?** At least one tender came from the App Store reviewer seed script. *Blocks: 4.4, 4.5.*
10. **Real-estate agent mode: legal sign-off on marketing to agents without a licence check, and is there a commission?** Licensed activity in NZ. *Blocks: 1.13, 1.12.*

### Medium priority

1. **Will stale public copy be fixed before videos drive traffic? Blog posts (escrow, on-chain, '20 hours a week', competitor tables), /support 'on-chain' waitlist, qsme.build 'mark up the drawings' and 'summarise the bids', Knowledge Hub 'two of ours' templates and 'one timeline'.** Viewers will land on pages that contradict the videos.
2. **Is Wellington zoning reliable, and is the owner comfortable showing non-Auckland yield numbers (a Christchurch point returned 70–175 homes)?** Determines whether any non-Auckland demo is safe. *Blocks: 1.5, 2.1.*
3. **The helper text says '12 mt eden rd' finds 12 Mount Eden Road, but live it returns only 'Closest match' rows. Copy bug or ranking bug?** Pick a different demo address either way. *Blocks: 1.3.*
4. **Global: is it intended that non-NZ projects get the NZ Christmas shutdown by default, NZ-law agreement templates, 'GST' on bids, NZ wording in the AI chat and connector, NZIQS on QS reports, and an NZ footer on the sign-in page?** Decides which features can appear in Global videos. *Blocks: 7.11, 6.2, 5.2, 3.4, 9.5.*
5. **Will the July/September walkthrough videos be re-rendered? Do the ElevenLabs voice and music licences cover paid social? Is 'Recorded in the New Zealand edition' acceptable wording for animations?** They are the only ready-made footage. *Blocks: 12.15.*
6. **May internal honesty stories be used publicly ('Dates saved' bug, the $1,250.50 bid bug, the council pack that was refused, the contact-import bugs, the Lebanese-template bug)?** Strong self-deprecating content, but they disclose internal incidents. *Blocks: dates-saved-lie, decimal-point, lebanese-project.*
7. **Is QSME® registered or pending?** Footer and shareholder report disagree.
8. **Free plan reality: one project (pricing page) or three (App Store review notes)? AI allowance lifetime (code) or monthly (Knowledge Hub)?** Any 'free' script needs the right limits. *Blocks: 12.14.*
9. **Is there a Dispute button users can reach? How is retention release shown, and which wording — 'released at warranty', 'end of the defects period' or 'completion'?** API exists without UI; three wordings exist. *Blocks: 10.1, 5.3.*

### Low priority

1. **Townhouses template: quote 136 tasks / 235 working days (current file) or 140 / 185 (original commit) — or neither?** Sources disagree. *Blocks: 7.4.*
2. **Is any licence for owner names, CV or sales data planned?** Only placeholders exist. *Blocks: 1.14.*
3. **Should screen recording wait for the shorter sidebar, new colour themes and the uncommitted qsme.build redesign to ship?** Videos recorded now may date quickly. *Blocks: 12.18, 12.19.*
4. **Fix sitemaps (profiles empty, geo Auckland only) and server-render /properties and /marketplace before driving traffic?** SEO and first-visit experience.
5. **Will the App Store listing description be corrected ('Save 15–25%', 'mentor support', 'Automated Bill of Quantities', 'Secure Progress Payments')?** Viewers sent to the listing will read claims the videos avoid. *Blocks: 12.10.*

---

*Built from reader reports and fact-check verdicts on 2026-10-02. Nobody logged in; nothing was run against the product repos. Update this sheet (and its JSON twin) when the owner answers the open questions.*
