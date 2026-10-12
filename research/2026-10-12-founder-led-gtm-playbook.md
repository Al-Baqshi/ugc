# Founder-led go-to-market playbook for QSME (NZ + Global)

Date: 2026-10-12. Asked by the owner: "What should I say on camera, what's the sequence from video 1 to weekly, how do I use the database without cold outreach, and how do I bring other people in?" This is the plan. The AI videos (N/G series) stay as the product-film library; the founder becomes the trust layer on top.

## 1. The principle: pull, don't push

NZ construction is a small world. A main contractor in Auckland knows the QS in Hamilton. Reputation moves faster than email. So the strategy is **be everywhere they already look, say the thing they already feel, and make it trivially easy to raise a hand.** The database is used to *aim* the content, never to *send* it.

Why not cold email/SMS: the Unsolicited Electronic Messages Act 2007 needs consent (express or inferred) for commercial messages, and a mass send from a scraped list burns the brand in exactly the community we want to win. Cold calls aren't covered by that Act but have the same reputational cost. (Not legal advice; check the list's provenance with a lawyer before any direct use.)

What the database IS for:
| Use | How | Contact them? |
|---|---|---|
| **Ad audience** | Upload hashed emails as a Custom Audience (Meta) / Matched Audience (LinkedIn). They see the founder's videos 6–10 times in their feed over a month. Nobody gets an email. | No |
| **Lookalikes** | Meta/LinkedIn build lookalikes from that list → reaches the people who look like them. | No |
| **Lighthouse list** | Pick 30 companies/people from it to *invite onto camera* (section 5), not to pitch. | Yes, but as an invitation to talk about their pain, not a sales call |
| **Watering holes** | Look at where those people post, comment and belong (groups, associations, events). That's the comment map (section 4). | No |
| **Suppression** | Exclude existing sign-ups from ads so the budget goes to new people. | No |

Follow-up is only ever to people who raised a hand: signed up, booked a demo, commented, DM'd, asked at an event. That's the warm list. Everyone else keeps seeing videos.

## 2. The arc: what to say, in what order

Don't sell in video 1. The order is **recognition → credibility → the way → proof → invite**, and then it repeats weekly at a smaller scale.

### Phase 0 (this week): founder on camera, no product
**F01 "Why I built this."** 60–75 s, phone, vertical, at a desk or on a site.
> "I've sat in rooms where six quotes for the same job arrived in six formats, and we spent a week turning them into one spreadsheet before we could compare a single number. That's not estimating, that's typing. I built Q-S-me so the schedule gets priced once and every bidder prices the same lines. I'm going to show you how it works over the next few weeks, and I'm going to be honest about what it doesn't do yet. If you've ever reconciled six quotes by hand, follow along."
CTA: follow. No link. This is the pinned video on every profile.

**F02 "The worst tender I ever received."** One true story, 45 s, no product. End: "Comment yours. I'll read them all." (Then you actually reply to every comment on camera in F05.)

**F03 "The thumbs-up contract."** NZ owner side: a contract that was a thumbs-up emoji, a deposit, and a disagreement in week 6. The pain, then one line: "That's why award on Q-S-me becomes the contract. Sign up at Q-S-me dot co dot N Z." First soft CTA.

### Phase 1 (weeks 2–4): founder + screen
**F04 "Six bids, one table."** Founder voice over a real desktop capture of compare bids (totals excl./incl. GST, Lowest tag; never "line by line"). 45 s. CTA: "Book a 30-minute demo at Q-S-me dot build" (Global) / "Sign up at Q-S-me dot co dot N Z" (NZ cut).

**F05 "You said…"** React to the F02 comments. Read 3, agree, add the fix. This is the first video people share because they're in it.

**F06 "What we don't do yet."** Auckland-first site research, no ISO 27001 yet, comparison is totals. Read the asterisk out loud. Honesty is the moat for a small NZ company against bigger software. CTA: sign up / demo.

**F07 "Who was on site Tuesday?"** QR sign-in + daily log, filmed at a real gate (own fence). Tradie-side.

**F08 "Build in public, month 1."** Numbers you're happy to share (sign-ups, tenders run, councils covered), what broke, what's next. Monthly from here.

### Weekly rhythm from week 2 (both editions)
| Day | Slot | What | Who's on camera |
|---|---|---|---|
| Tue 6:15am (tradies) / 7:30pm (owners) | Pain | 45 s founder monologue, one pain, one story, "comment yours" | Founder |
| Wed | Proof | 45 s screen capture with founder voice; one feature, one CTA | Founder voice + product |
| Thu | AI film | the scheduled N/G video from the calendar | Cam S / Arnold VO |
| Fri or Sat 9am | Community | reply video, duet, or a 2-min interview with a real builder/QS/developer | Founder + guest |
| Monthly | Build-in-public | numbers, honesty, roadmap | Founder |

LinkedIn (qsme.build): founder posts Tue/Wed/Fri, native video, text hook in the first line, link in the first comment. NZ: Reels + TikTok + Facebook (page and allowed groups) + YouTube Shorts. Long-form (interviews, monthly update) → YouTube + LinkedIn.

"Push hard" means **frequency and one clear CTA every time**, not hype. Same two CTAs, said the same way, for months: "Sign up at Q-S-me dot co dot N Z" / "Book a 30-minute demo at Q-S-me dot build." Repetition is what makes a small brand feel inevitable.

## 3. Recording rules for the founder (so the footage is editable)
- Phone, vertical 1080×1920, 30 fps, eye level, window light in front of you, not behind. Lav mic or AirPods; wind kills site audio, so hold the phone close outdoors.
- Real places: the ute, a site gate, the desk with the spreadsheet open. Never a blank wall.
- First sentence is the hook. No "hi guys", no "today I want to talk about". Say the number or the story in the first 2 s.
- 3 bullet points on a sticky note, not a script. Talk to one person. 45–75 s raw is fine; we cut to 30–45.
- Max 3 takes. Change a jacket between videos so a batch doesn't look like one day.
- Batch 4–5 on Sunday, drop raw files in `outputs/founder/incoming/<date>/`.
- Pronunciation on camera: "Cue Ess Me". Never spell it out, never "kiss me".
- Never say "free", "no sign-up", pricing, "verified tradies", "line by line", "instant", "any NZ address".

### The editing pipeline (what the studio adds)
Raw founder clip → transcript (ElevenLabs STT via `tools/el.py stt`) → cut to the 30–45 s spine (keep the hook, one story, one CTA) → burned-in captions lifted from the transcript → product inserts from `assets/qsme/` + motion-kit end card with the CTA → 9:16 / 4:5 / 16:9 → video ID. Proposal: founder videos get an **F** series (`F01…`) in `projects/ids.json`, versions `F01·9:16` etc., so they're referable like N/G. Tools needed already exist (`el.py`, `slice`, `mux`, `tools/motion`); the missing piece is a `tools/founder/` cut script, which we build after the first 3 raw clips arrive.

## 4. The comment map: be useful in public for 3 weeks before linking anything
Pick 5 watering holes and show up daily (30 min: 10 useful comments, 1 post, reply to everything on your own posts).

| Where | Who's there | What to say |
|---|---|---|
| LinkedIn: NZ construction, QS, estimating, PM posts; NZIQS, Master Builders, Property Council NZ, Site Safe followers | Main contractors, QS, developers (Global + NZ) | Answer estimating/tender questions with real detail. No link. Mention Q-S-me only when someone asks "what do you use?" |
| Facebook groups: Auckland/Wellington/Christchurch renovation & "building a house in NZ" groups, tradie groups | Owners, small developers, tradies (NZ) | Answer "how do I compare quotes / what's a LIM / do I need consent for a granny flat" with the honest answer. Site research gets mentioned as "when you sign up you get…", never a giveaway. |
| TikTok/IG NZ tradie and reno accounts | Tradies, first-home builders | Comment with the joke, not the pitch. Duet/stitch their pain with your 15 s answer. |
| propertytalk.co.nz, r/newzealand, r/PersonalFinanceNZ build threads | Owners, investors | Long, useful answers. Link only when asked, and only to the sign-up page. |
| Supplier trade desks at 6:30–7:30am (PlaceMakers, ITM, Carters, Mitre 10 Trade) | Tradies in person | Not pitching. "One question" clips with permission (section 5). |

Rule: for the first 3 weeks, zero links in comments. People notice the name on the useful guy. Then the videos land on a warm audience.

## 5. Bringing other people in (NZ, in person)
You're happy to visit. Don't do sales visits; do **"film with me" visits**. People say yes to telling their story and no to a demo. The demo happens in the last 10 minutes anyway, because they ask.

- **Lighthouse 30.** From the database pick 10 main contractors / QS firms (Global story), 10 builders or tradies, 10 small developers / owners. One LinkedIn DM or call: "I'm filming short clips with NZ builders about the worst quote comparison / tender / contract they've dealt with. 20 minutes, your site or a café, you see the cut before it goes out. Keen?" Half will say yes.
- **The interview format.** 3 questions, phone on a tripod, 2 angles if possible: "Worst tender you ever received?", "What did it cost you?", "What would fix it?" Cut to 60–90 s. They share it because they're in it. Their network is your audience.
- **Rules (non-negotiable from CLAUDE.md):** real people as themselves, written consent, no scripted testimonials, no AI person ever presented as a customer. If they praise QSME unprompted it can stay; we never feed them lines.
- **Events: speak, don't sponsor.** Offer a 15-minute talk, "Why six bids never compare (it's the tender, not the subcontractors)", to Master Builders regional meetings, Certified Builders, NZIQS branch nights, Property Council and property-investor association meetups, Buildnz/Designex. One talk → 10 demos. Record it; it's a month of clips.
- **Lunch-and-learn at mid-size main contractors.** 30 minutes for the estimating team, bring lunch. This *is* the "30-minute demo" CTA, delivered in person, and the one direct ask from the database that's welcome: it's an invitation to learn, with food.
- **Creator collabs (NZ).** 2–3 NZ tradie/reno micro-creators (10–50k). Give them the pain, not the script; paid, disclosed. Measure sign-ups per collab, not views.
- **A real recurring QS face.** The qsme.build venture file already prefers a real QS on camera. Find one (a friendly QS from the Lighthouse 30) to be "The QS" every second Wednesday.

## 6. Conversion mechanics ("they come to us")
- One CTA per video, matched landing page, UTM links (already live on qsme.build share buttons).
- Hand-raise channels: sign-up, demo booking, comment, DM, event sign-up sheet. Reply within a day, personally, on camera when it's a comment.
- Weekly scorecard, not views: sign-ups (NZ) and demos booked (Global) per video ID, saves+shares per 1,000 views, comments with a real story (fuel for Fri videos). Log it in `learnings.md`.
- Paid: boost the organic post (so comments carry) once a video passes the calendar's bar (15 s avg watch, 10+ saves/shares per 1,000), aimed at the Custom Audience + lookalikes. Founder videos usually beat polished ones here.
- Expect the first 3 weeks to be quiet. The compounding starts when people see the same face three times in one week across two platforms and someone they know is in a Friday interview.

## 7. First 14 days, concrete
| Day | Do |
|---|---|
| Mon 13 Oct | Pin this plan. Record F01, F02, F03 in one sitting (sticky notes, 3 takes). Drop in `outputs/founder/incoming/2026-10-13/`. |
| Tue 14 | F01 live everywhere, pinned. Start the 30-min daily comment habit (no links). |
| Wed 15 | F02 live. Upload the database as a Custom Audience (Meta) + Matched Audience (LinkedIn); no campaign yet, just build it. |
| Thu 16 | Scheduled AI film (N/G). DM the first 10 of the Lighthouse 30 with the "film with me" invite. |
| Fri 17 | F03 live. Book 3 interviews for next week. |
| Sat 18 | Batch F04–F07 (screen captures done in Session B). |
| Week of 20 Oct | F04 Tue, F05 (comment replies) Wed, N/G film Thu, first interview Fri. Offer the 15-min talk to 3 associations. First boost on the best-performing F video to the Custom Audience. |

## Open questions for the owner
1. Which 30 companies/people for the Lighthouse list? (We'll draft it from the database together; nothing is sent.)
2. Is there a real QS or site manager willing to be the recurring face?
3. Budget ceiling per boosted post, and which platform first (LinkedIn for Global, Meta for NZ is the recommendation)?
4. Approve the `F` video-ID series for founder-led cuts.
