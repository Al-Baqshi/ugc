export const meta = {
  name: 'qsme-figma-posts',
  description: 'Design both QSME post packages in Figma (static, carousel, storyboard, brief), verify + fix, then animate and export MP4',
  phases: [
    { title: 'Build', detail: 'one designer per page: static, carousel, storyboard, brief panel' },
    { title: 'Verify', detail: 'screenshot every frame, check copy, legibility, brand, integrity' },
    { title: 'Fix', detail: 'apply verifier findings' },
    { title: 'Motion', detail: 'animated top-level frame, export_video MP4, download to outputs/' },
  ],
}

const ROOT = '/Users/brave/CreativeUGC'
const FILE = 'f8xxaFvwdi6ijGxYj9WEWP'
const PAGES = [
  { key: 'nz', pageId: '2:4', pageName: '01 · QSME NZ — The Facebook group', folder: '2026-10-02-qsme-nz-which-dave', venture: 'qsme-nz',
    brand: 'QSME NZ brand: navy #020617 background, ink #F8FAFC (body at 70% opacity), brand green #15803D, button green #16A34A, logo green #3DC023. Headlines Manrope ExtraBold (tight tracking ≈ -2.5%), body Inter Light/Regular. Radius 8–10.',
    motion: `NZ motion = the reel BODY from 2.5s to the end (the 0–2.5s hook is filmed on a real phone, so don't animate it). Top-level frame 1080×1920 named "Motion — Which Dave (reel body, 9:16)". It must look like a full-frame phone SCREEN RECORDING of a GENERIC community-group app (neutral off-white/grey UI, initials avatars, no Facebook blue/branding, simple status bar), following the beats in post.json reel.beats from t=2.5 onward, re-timed to start at 0: Mel's post card fills the screen with the red-marker underline drawing under "Must be licensed" → card shrinks to a pinned header strip at y 300–400 → comments pop in one by one at ≥44px with the holds from the beats (Kerry, Sam, Aroha, Jase, three fast 'Following' lines) while the red-marker "Dave count" tally (Permanent Marker font, red) at upper-left x≈80 y≈420–500 changes 1 → 3 → 6 (ish) → ? (separate text nodes cross-fading, since characters can't be keyframed) → the scroll slams to a stop on "Dave K.: Dave here. Which Dave do you mean?" and holds 2.0s with a red circle → "Mel R.: ...is anyone here licensed?" then 0.6s later "Kerry P.: Dave is." hold ~1.2s → the app swipes away (translate X) to a placeholder QSME screen block (clearly labelled "REPLACE WITH REAL QSME SCREEN RECORDING: Create a project → line-by-line comparison → Dave K. verified profile", in QSME navy/green) with on-screen text "Or. Post the actual job on QSME." then "Licence-verified trades quote it" then "Compared line by line" → "Know which Dave." with the tally redrawn as "Dave count: 1 ✓" → end card in QSME brand: logo, "Create a project.", "Free to join. No listing fee.", "qsme.co.nz". Total ≈ 27.5s. Keep ALL text inside x 65–1015, y 300–1250 except the end-card logo (which can sit above at y≥200). No audio (added later in CapCut).`,
  },
  { key: 'build', pageId: '2:5', pageName: '02 · qsme.build — Six quotes, six formats', folder: '2026-10-02-qsme-build-six-bids-six-formats', venture: 'qsme-build',
    brand: 'qsme.build brand: ground #0C1310, raised #14211A, border #213128, ink #EEF4EF, muted #A9B8AE, subtle #86958B, brand green #3DC023, accent #4BCD32, soft #10240F, on-accent text #06130A. Headlines Space Grotesk BOLD or MEDIUM (SemiBold is NOT installed in Figma), tight tracking; body Inter; figures in JetBrains Mono. Radius 10/16/24, pill buttons.',
    motion: `qsme.build motion = a TEXT-ON-SCREEN kinetic version of the reel for LinkedIn feed, 4:5. Top-level frame 1080×1350 named "Motion — Six bids (LinkedIn 4:5)". No filmed footage needed: build it from designed elements. Sequence (≈26s, re-time sensibly): "6 bids. 6 formats." big headline + chip "Tender closed 5:00pm" + counter "0/6" top-right → six designed bid "props" appear one at a time with the counter stepping 1/6…6/6 and a caption line each, taken from post.json reel.beats (A sideways PDF with filename 'Quote_FINAL_v3_revised(2).pdf' rotated 90°, B spreadsheet with one giant merged block, C letterhead 'As discussed.', D mail 'Price below. Cheers.' with empty white below, E page '9 of 9' with note 14 'Excludes ceilings.' highlighted, F the whiteboard with handwritten lines incl. 'Ceilings – 380 m² @ 62.00 – INCL' underlined twice; use Permanent Marker / Kalam for handwriting) → "Honestly? Most complete one here." with a sticky note 'most complete one, honestly' landing on F → the self-own: a generic mail window "Tender: Plasterboard & ceilings package — Drawings attached. Please price." with caption "In fairness… mine said 'drawings attached, please price.'" → product: "So we built QSME. Same lines for every bidder." with a line-by-line comparison table (≈6 rows × Bidder A–F, identical rows, fictional figures, rows snapping into alignment one by one) clearly marked in the corner "Illustrative — swap for real QSME screen (demo data)" → "Award → contract created" → end card: QSME logo, "Book a 30-minute demo", "qsme.build". Keep text ≥ 40px for captions, ≥ 32px for labels.`,
  },
]

const SKILLS = `Before ANY use_figma call, load these with the get_figma_skill MCP tool (load the Figma MCP tool schemas first in ONE ToolSearch call, e.g. "select:mcp__86500c30-d3c1-4e71-8a9f-bb4c6e0d8ce6__use_figma,mcp__86500c30-d3c1-4e71-8a9f-bb4c6e0d8ce6__get_figma_skill,mcp__86500c30-d3c1-4e71-8a9f-bb4c6e0d8ce6__get_screenshot,mcp__86500c30-d3c1-4e71-8a9f-bb4c6e0d8ce6__export_video,mcp__86500c30-d3c1-4e71-8a9f-bb4c6e0d8ce6__get_metadata"): skill://figma/figma-use/SKILL.md and skill://figma/figma-use/references/gotchas.md. Pass skillNames "resource:figma-use" on every use_figma call.`

const COMMON = (p) => `Figma file key: ${FILE}. Work ONLY on page "${p.pageName}" (id ${p.pageId}); switch with await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('${p.pageId}')) once per call. Never touch the other pages. The QSME logo is a COMPONENT with id 2:27 on page 0:1 — use (await figma.getNodeByIdAsync('2:27')).createInstance() and rescale it (it is 1509×688 with built-in padding; the wordmark is green on transparent, for dark backgrounds).
The full post package (the copy is final — use it verbatim, don't rewrite jokes) is ${ROOT}/projects/${p.folder}/post.json (rendered version post.md). Venture facts and brand: ${ROOT}/ventures/${p.venture}.md. ${p.brand}
Fonts verified installed: Manrope (ExtraBold, Bold, SemiBold, Medium, Regular, Light), Space Grotesk (Bold, Medium, Regular, Light — no SemiBold), Inter (style names with spaces: "Semi Bold", "Extra Bold"), JetBrains Mono, IBM Plex Mono, Permanent Marker, Caveat, Kalam, Patrick Hand.
Known gotchas in this file: figma.createAutoLayout() frames get a WHITE fill by default — set fills = [] on every container that should be transparent. Starter plan: no new pages. Colors are 0–1. Wrapping text: append to auto-layout parent, then layoutSizingHorizontal='FILL' and textAutoResize='HEIGHT'.
Integrity rules (non-negotiable): no Facebook/Meta/LinkedIn/Excel/Gmail branding or look-alike logos (generic UI only); avatars are coloured initials circles, never faces or AI people; fictional names only; anything that must later be a REAL QSME screenshot or a REAL photo is a clearly labelled placeholder (dashed 2px stroke, label starting "REPLACE:") — or, where a designed stand-in is useful, label it "Illustrative — swap for real…". Don't invent product features, numbers or testimonials.`

const BUILD = (p) => `You are a senior social designer. Design the ${p.key === 'nz' ? 'QSME NZ "Which Dave?"' : 'qsme.build "Six bids. Six formats."'} post package in Figma so the user can see exactly what will be posted.
${SKILLS}
${COMMON(p)}

Lay the page out as Figma SECTIONs (figma.createSection), stacked vertically with 400px gaps, each with a clear name:
1. "Static post — 1080×1350": the static post exactly as post.json static_post describes (all mock_content lines, the look in visual_description). ${p.key === 'build' ? 'The final static is meant to be a REAL overhead photo of printed props; build a fully designed GRAPHIC version of that flat-lay (six drawn bid props on a desk-toned ground, labels A–F, sticky note, top band, footer) that works as a postable alternative, and label the frame name "(graphic version — photo version to be shot)". Also design the six bid props themselves as separate print-ready frames (A4-ish proportions) in a sub-row, since the shoot needs them printed.' : 'Fully designable: the meme-caption top, the GENERIC community-group card (neutral off-white/grey, NOT Facebook blue), red-marker marks in Permanent Marker (underline, circle, tally), and the QSME end band.'}
2. "Carousel — N slides (1080×1350)": every slide from post.json carousel in one row, 60px apart, named "Slide n — headline". Each slide must stand alone visually and earn the swipe. Real-screenshot slides get labelled REPLACE placeholders inside a plain phone frame.
3. "Reel storyboard — 9:16": one 540×960 frame per beat in post.json reel.beats (scaled-down 9:16), each showing the composition, the on-screen text at proportional size, with a notes block underneath (time, role, VO, SFX). ${p.key === 'build' ? 'Master is 4:5 for LinkedIn: draw the 4:5 safe area (1080×1350-equivalent, i.e. 540×675 centred) as a dashed guide inside each 9:16 board.' : 'Draw the safe box (x 65–1015, y 300–1250 at full scale → halve it) as a faint dashed guide.'}
4. "Brief — hooks, caption, music, voice, workflow": a readable document frame (1600 wide, auto-layout) with: the core joke in one sentence; the 5 hooks as a table-like list with text/verbal/visual/audio layers and the chosen one highlighted; caption + hashtags + CTA; music direction (mood, BPM, source, licensing); voice (character, delivery, ElevenLabs direction, real-person alternative); production workflow steps; integrity notes; open questions. Typeset it properly in the brand fonts — this is what the user reads.
Leave space at the top-right of the page (x ≥ 4000, y 0) EMPTY: a motion frame goes there later.

Quality bar: this must look like work from a good social agency, not a wireframe. Real phone-screenshot realism for the in-app UI parts; confident brand typography for the QSME parts; generous spacing; nothing clipped, no overlapping text, no orphaned one-word lines in headlines, captions ≥ 34px at 1080 width. Build section by section (one use_figma call per section is fine), screenshot each finished section once and fix what you see before moving on.

Return JSON: frames (name + node id for every top-level frame/section you made), placeholders (what real assets must be swapped in), and notes on any deviations from post.json.`

const ISSUES = { type: 'object', properties: { summary: { type: 'string' }, issues: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['must-fix', 'should-fix', 'nice'] }, frame: { type: 'string' }, node_id: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['severity', 'frame', 'problem', 'fix'] } } }, required: ['summary', 'issues'] }
const BUILT = { type: 'object', properties: { frames: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, id: { type: 'string' } }, required: ['name', 'id'] } }, placeholders: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } }, required: ['frames', 'placeholders', 'notes'] }
const MOTION = { type: 'object', properties: { node_id: { type: 'string' }, mp4_path: { type: 'string' }, duration_s: { type: 'number' }, keyframe_summary: { type: 'string' }, problems: { type: 'string' } }, required: ['node_id', 'mp4_path', 'duration_s', 'keyframe_summary', 'problems'] }

const VERIFY = (p, built) => `You are a demanding creative director checking a Figma build before the client sees it. Do NOT edit the file — read and screenshot only.
${SKILLS} Also load skill://figma/figma-use/references/validation-and-recovery.md.
${COMMON(p)}
The designer reported these frames: ${JSON.stringify(built)}
For EVERY static/carousel/storyboard/brief frame: take a screenshot (node.screenshot() inside a read-only use_figma, or get_screenshot) at a scale where text is readable, and check: (1) copy matches post.json verbatim (headline, comments, captions, CTA — flag any wording drift, typos, missing lines); (2) legibility at phone size (≥34px captions at 1080w), contrast, hierarchy; (3) clipping, overflow, overlaps, text running outside frames, white default fills on containers, misalignment, inconsistent spacing; (4) brand: correct fonts/colours/logo usage; (5) integrity: no real-platform branding, no faces, placeholders clearly labelled REPLACE/Illustrative, no invented claims; (6) does the joke read in the static and carousel without explanation? Does each carousel slide earn the swipe? Return every issue with the exact fix and the node id.`

const FIX = (p, built, findings) => `Apply these creative-director findings to the Figma build. Fix every must-fix and should-fix; nice ones if cheap. Do not rebuild from scratch — targeted edits.
${SKILLS}
${COMMON(p)}
Frames: ${JSON.stringify(built)}
Findings: ${JSON.stringify(findings)}
After fixing, screenshot each changed frame once to confirm. Return a short report of what changed and anything you could not fix.`

const MOTION_PROMPT = (p, built) => `You are a motion designer. Build an animated version in Figma and export it as MP4.
${SKILLS} ALSO load skill://figma/figma-use-motion/SKILL.md, skill://figma/figma-use-motion/references/motion-patterns.md and skill://figma/figma-use-motion/references/motion-easing.md and pass skillNames "resource:figma-use,resource:figma-use-motion". Motion is enabled on this account (figma.motion.figmaAnimationStyles() works).
${COMMON(p)}
Existing frames on the page (reuse visual language, you may clone parts): ${JSON.stringify(built)}
Place the new top-level frame at x ≥ 4000, y = 0 on the page (top-right, clear of the sections).
${p.motion}
Rules: animate DESCENDANTS, never the top-level frame itself; text characters can't be keyframed, so use separate text nodes with opacity/transform tracks; set the timeline duration with setTimelineDuration; use crisp easing (ease-out for entries, a hard stop for the "slam" moments, HOLD where something should just appear). Keep it feeling like real UGC/screen content, not a corporate explainer.
Then export with export_video (fileKey ${FILE}, nodeId = your top-level frame, quality "high", fps 30); poll with jobId every ~15s until done; download the MP4 with curl to ${ROOT}/projects/${p.folder}/outputs/${p.key === 'nz' ? 'which-dave-reel-body-9x16.mp4' : 'six-bids-linkedin-4x5.mp4'} and confirm the file size is > 100 KB. If export fails, read the error, fix and retry (max 3 renders). Also do a low-res diagnostic render first if you're unsure of timing (WIDTH 360, quality low, fps 5) — you can't extract frames locally (no ffmpeg), so reason from keyframes and the resting-state screenshot; the main agent will check frames in a browser afterwards.
Return JSON: node_id, mp4_path, duration_s, keyframe_summary (the timeline as a list of time → what happens), problems.`

const results = await pipeline(PAGES,
  (p) => agent(BUILD(p), { label: `build:${p.key}`, phase: 'Build', schema: BUILT }),
  (built, p) => built ? agent(VERIFY(p, built), { label: `verify:${p.key}`, phase: 'Verify', schema: ISSUES }).then(v => ({ built, v })) : null,
  (r, p) => r ? agent(FIX(p, r.built, r.v ? r.v.issues : []), { label: `fix:${p.key}`, phase: 'Fix' }).then(fixReport => ({ ...r, fixReport })) : null,
  (r, p) => r ? agent(MOTION_PROMPT(p, r.built), { label: `motion:${p.key}`, phase: 'Motion', schema: MOTION }).then(m => ({ ...r, motion: m })) : null,
)
return results.map((r, i) => ({ page: PAGES[i].key, ...(r || { failed: true }) }))
