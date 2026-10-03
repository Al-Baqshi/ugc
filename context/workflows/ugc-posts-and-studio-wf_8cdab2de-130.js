export const meta = {
  name: 'ugc-posts-and-studio',
  description: 'Write + critique two QSME post packages and build the password-protected UGC Studio dashboard app',
  phases: [
    { title: 'Write', detail: 'one writer per idea: hooks, static, carousel, reel, music, workflow' },
    { title: 'Critique', detail: 'humor/audience lens + direct-response/platform lens per package' },
    { title: 'Revise', detail: 'apply critiques into a final package' },
    { title: 'Build studio', detail: 'dashboard app in /Users/brave/CreativeUGC/studio' },
    { title: 'Review studio', detail: 'security/correctness + design/UX review' },
    { title: 'Fix studio', detail: 'apply review fixes, re-run checks' },
  ],
}

const ROOT = '/Users/brave/CreativeUGC'
const IDEAS = [
  { venture: 'qsme-nz', slug: 'facebook-group', brand: 'QSME NZ (qsme.co.nz)', primary: 'Instagram Reels + Facebook feed + TikTok (NZ homeowners, small developers, tradies)' },
  { venture: 'qsme-build', slug: 'six-quotes-six-formats', brand: 'QSME Global (qsme.build)', primary: 'LinkedIn (main contractors, QSs, PMs, developers outside NZ)' },
]

const HOOK = { type: 'object', properties: {
  mechanism: { type: 'string' }, text_layer: { type: 'string' }, verbal_layer: { type: 'string' },
  visual_layer: { type: 'string' }, audio_layer: { type: 'string' }, why: { type: 'string' } },
  required: ['mechanism', 'text_layer', 'verbal_layer', 'visual_layer', 'audio_layer', 'why'] }
const SLIDE = { type: 'object', properties: { n: { type: 'integer' }, headline: { type: 'string' }, body: { type: 'string' }, visual: { type: 'string' } }, required: ['n', 'headline', 'body', 'visual'] }
const BEAT = { type: 'object', properties: { t: { type: 'string' }, role: { type: 'string' }, visual: { type: 'string' }, on_screen_text: { type: 'string' }, vo: { type: 'string' }, sfx: { type: 'string' } }, required: ['t', 'role', 'visual', 'on_screen_text', 'vo', 'sfx'] }
const STEP = { type: 'object', properties: { step: { type: 'string' }, tool: { type: 'string' }, what: { type: 'string' }, output: { type: 'string' } }, required: ['step', 'tool', 'what', 'output'] }
const PACKAGE = { type: 'object', properties: {
  venture: { type: 'string' }, idea_id: { type: 'string' }, title: { type: 'string' },
  job: { type: 'string', description: 'organic / paid / organic-then-paid, with one-line reason' },
  platforms: { type: 'array', items: { type: 'string' } },
  core_joke_one_sentence: { type: 'string' },
  hooks: { type: 'array', items: HOOK, minItems: 5, maxItems: 5 },
  chosen_hook_index: { type: 'integer' }, chosen_reason: { type: 'string' },
  static_post: { type: 'object', properties: {
    size: { type: 'string' }, headline: { type: 'string' }, subline: { type: 'string' },
    mock_content: { type: 'array', items: { type: 'string' }, description: 'the literal on-image content lines, e.g. the fake group comments or the six quote formats' },
    visual_description: { type: 'string' }, cta: { type: 'string' } },
    required: ['size', 'headline', 'subline', 'mock_content', 'visual_description', 'cta'] },
  carousel: { type: 'array', items: SLIDE, minItems: 5, maxItems: 8 },
  reel: { type: 'object', properties: {
    length_s: { type: 'integer' }, aspect: { type: 'string' }, beats: { type: 'array', items: BEAT, minItems: 4 },
    music: { type: 'object', properties: { direction: { type: 'string' }, mood: { type: 'string' }, bpm: { type: 'string' }, source: { type: 'string' }, licensing_note: { type: 'string' } }, required: ['direction', 'mood', 'bpm', 'source', 'licensing_note'] },
    voice: { type: 'object', properties: { character: { type: 'string' }, accent_and_delivery: { type: 'string' }, elevenlabs_direction: { type: 'string' }, real_person_alternative: { type: 'string' } }, required: ['character', 'accent_and_delivery', 'elevenlabs_direction', 'real_person_alternative'] } },
    required: ['length_s', 'aspect', 'beats', 'music', 'voice'] },
  caption: { type: 'string' }, hashtags: { type: 'array', items: { type: 'string' } }, cta_line: { type: 'string' },
  production_workflow: { type: 'array', items: STEP, minItems: 4 },
  integrity_notes: { type: 'array', items: { type: 'string' } },
  open_questions: { type: 'array', items: { type: 'string' } },
  changelog: { type: 'array', items: { type: 'string' }, description: 'only in the revised version: what changed vs draft and why' },
}, required: ['venture', 'idea_id', 'title', 'job', 'platforms', 'core_joke_one_sentence', 'hooks', 'chosen_hook_index', 'chosen_reason', 'static_post', 'carousel', 'reel', 'caption', 'hashtags', 'cta_line', 'production_workflow', 'integrity_notes', 'open_questions'] }

const CRITIQUE = { type: 'object', properties: {
  lens: { type: 'string' }, score_out_of_10: { type: 'number' },
  keep: { type: 'array', items: { type: 'string' } },
  issues: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['must-fix', 'should-fix', 'nice'] }, area: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['severity', 'area', 'problem', 'fix'] } } },
  required: ['lens', 'score_out_of_10', 'keep', 'issues'] }

const writerPrompt = (i) => `You are the lead creative for the CreativeUGC studio at ${ROOT}. Write a complete EXAMPLE post package for one agreed idea. Do NOT write any files and do NOT call Figma, Railway or any generation API — return the package only.

Read first (all under ${ROOT}):
- .claude/skills/ugc/SKILL.md and every file in .claude/skills/ugc/references/ (humor.md, formats.md, direct-response.md, tools.md)
- ventures/${i.venture}.md (draft profile; ❓ = unconfirmed — don't invent facts to fill them)
- ideas/${i.venture}/${i.slug}.md (the idea card — build on it, you may sharpen it)
- research/2026-09-28-qsme-site-review.md (what the product really does; only claim features listed there)

Brand: ${i.brand}. Primary platforms: ${i.primary}.

Deliver:
1. 5 hooks, each a different mechanism, each spelled out as layers (text / verbal / visual / audio). Pick one and say why.
2. A static post (single image) — exact on-image copy and the literal mock content lines (e.g. the fake comment thread, or the six quote formats). Feed size: 1080x1350 for IG/FB, 1080x1350 or 1200x1500 for LinkedIn.
3. A carousel of 5–8 slides (for LinkedIn this is a document carousel) — the story must work slide by slide, last slide = CTA.
4. A reel/video: length, aspect, timestamped beats (role from the ad anatomy: hook/intro/problem/solution/value/proof/CTA), visual, on-screen text, VO line, SFX. Must work with sound OFF.
5. Music direction: mood, BPM range, and WHERE to source it legally. Organic posts can use the platform's trending/commercial sound library; paid ads and LinkedIn need royalty-free or generated music (e.g. ElevenLabs Music) — say which and why.
6. Voice: character, accent (Kiwi for NZ — natural, not a caricature; neutral international English for qsme.build), delivery, a concrete ElevenLabs voice direction, and the real-person alternative (founder or a real tradie/QS on camera often beats AI for trust).
7. Caption, hashtags (few, relevant), one CTA line in the brand voice.
8. Production workflow: ordered steps with tool (Claude for copy, Figma for statics/carousel and animated kinetic-type frames exportable as MP4, ElevenLabs for VO/SFX/music, Higgsfield/Runway/Veo only where real footage or a person is genuinely needed, CapCut for the edit) and the output of each step. Prefer the cheapest path that still looks like real UGC.
9. Integrity notes: no real Facebook/Meta branding (use a generic group UI), fictional names, no fake testimonials or invented numbers (e.g. '212 comments' is a joke inside a skit, fine; '500 builders use QSME' is NOT allowed unless real), only claim features that exist.
10. Open questions for the user.

Humor rules that matter most: punch at the situation, never at the customer (tradies AND owners are both QSME customers in NZ; subbies AND QSs are both qsme.build users). Specific beats generic. One joke done well. Product is the payoff, not a sticker. NZ English for NZ (section, tradie, sparky, ute, council, CCC) without overdoing slang.`

const critiquePrompt = (lens, i, pkg) => `You are a tough, specific reviewer for the CreativeUGC studio (${ROOT}). Review this EXAMPLE post package for ${i.brand} through ONE lens only: ${lens}.
Read ${ROOT}/.claude/skills/ugc/references/humor.md, direct-response.md and formats.md, ventures/${i.venture}.md and research/2026-09-28-qsme-site-review.md for the standards and facts.
Be concrete: every issue needs an exact fix (rewritten line, swapped beat, etc). List what must be kept too. Do not write files.

PACKAGE:
${JSON.stringify(pkg, null, 2)}`

const LENSES = [
  'HUMOR & AUDIENCE — Is the core joke actually funny to this exact audience (NZ homeowners/tradies, or international construction pros)? Is it specific and true-to-life? Does it punch at the situation, never the customer? Is NZ English natural and not a caricature? Is the escalation tight and the payoff earned? Would someone send it to a mate/colleague? Cut anything that explains the joke.',
  'DIRECT-RESPONSE, PLATFORM & INTEGRITY — Does the hook stop the scroll in <3s with sound off, with 3+ layers? Is the product clear and the CTA explicit? Do carousel slides each earn the swipe? Are specs right for the platform (sizes, length, LinkedIn vs IG/TikTok norms, caption length, hashtags)? Is music sourcing legal for organic vs paid? Any invented proof, real brand UI (Facebook), or feature claims not on the site? Is the production workflow realistic and cheap enough?',
]

const reviserPrompt = (i, pkg, crits) => `You are the lead creative for CreativeUGC (${ROOT}). Revise your draft post package for ${i.brand} using the two critiques below. Apply every must-fix, apply should-fixes unless they conflict with the core joke (then say why in changelog), keep what reviewers said to keep. Return the full final package (same schema) with a changelog. Do not write files.

DRAFT:
${JSON.stringify(pkg, null, 2)}

CRITIQUES:
${JSON.stringify(crits, null, 2)}`

const creative = () => pipeline(IDEAS,
  (i) => agent(writerPrompt(i), { label: `write:${i.slug}`, phase: 'Write', schema: PACKAGE }),
  (pkg, i) => pkg ? parallel(LENSES.map((lens, k) => () => agent(critiquePrompt(lens, i, pkg), { label: `critique:${i.slug}:${k ? 'dr' : 'humor'}`, phase: 'Critique', schema: CRITIQUE }))).then(c => ({ pkg, crits: c.filter(Boolean) })) : null,
  (r, i) => r ? agent(reviserPrompt(i, r.pkg, r.crits), { label: `revise:${i.slug}`, phase: 'Revise', schema: PACKAGE }).then(final => ({ final, crits: r.crits })) : null,
)

const BUILD_PROMPT = `Build "UGC Studio": a password-protected web dashboard that renders the CreativeUGC folder (${ROOT}) so the user can see their ideas, ventures, projects and research live from any device. The main agent will deploy it to Railway later with \`railway up\` from ${ROOT}. Do NOT deploy, do NOT call Railway, Figma or any MCP tool, do NOT modify any existing content files (ideas/, ventures/, research/, log/, projects/, learnings.md, CLAUDE.md, .claude/). Only create the app files listed below.

LAYOUT
- App code in ${ROOT}/studio/. Root ${ROOT}/package.json: name "ugc-studio", private, "type": "module", engines node >=20, scripts: start = "node studio/server.mjs", dev = "STUDIO_DEV=1 node studio/server.mjs", check = "node studio/check.mjs", publish = "railway up --detach". Deps: only "marked" and "yaml". Run npm install (keeps package-lock.json). No frontend framework, no bundler: server-rendered HTML + a little vanilla JS. No external scripts; Google Fonts stylesheet allowed.
- ${ROOT}/railway.json: startCommand "npm start", healthcheckPath "/healthz", restartPolicyType ON_FAILURE. Let Railway's default builder detect Node.
- ${ROOT}/.railwayignore (gitignore syntax): exclude .env, .env.*, node_modules, .DS_Store, and everything under .claude EXCEPT .claude/skills (use ".claude/*" then "!.claude/skills/"). Keep .env.example out too.
- ${ROOT}/studio/README.md: what it is, env vars, local run, how publish works, JSON API.

CONTENT MODEL (read from disk at request time with a small mtime-based cache, so edits show without restart; resolve the content root as the parent of studio/)
- ventures/*.md (skip files starting with _) → venture profiles. Title = first H1. Count "❓" occurrences as open questions.
- ideas/<venture>/*.md → idea cards with YAML frontmatter: id, venture, title, score, score_breakdown, status, job, platform, format, created; optional: figma (URL), project (folder name), hook, updated. Tolerate missing/extra fields and malformed YAML (show the card with a warning, never crash). ideas/INBOX.md is just an index; cards are the source of truth. New venture folders must appear automatically.
- projects/<folder>/ (skip names starting with _) → project: every .md file is a tab (order: post.md, brief.md, script.md, shots.md, prompts.md, then others alphabetically); optional frontmatter in post.md or brief.md (title, venture, idea, status, figma). outputs/ media gallery (png jpg jpeg webp gif mp4 webm mov mp3 wav m4a) served through a safe media route.
- research/*.md and log/*.md (newest first by filename date), learnings.md.
- Playbook: .claude/skills/ugc/SKILL.md + .claude/skills/ugc/references/*.md (read-only display).

PAGES
- Home: totals by status and by venture, "Next up" (status agreed / in production), recent ideas, latest log entry excerpt, open-questions count per venture.
- /ideas: kanban columns by status (raw, scored, agreed, in production, posted, killed — unknown statuses get their own column), venture filter chips, sort by score, board/list toggle (list = sortable table). Card: title, venture dot+name, score badge (≥17 strong, 14–16 ok, <14 weak), job, platform. Mobile: columns become a horizontal snap-scroll or stacked sections — no page-level horizontal overflow.
- /ideas/<venture>/<slug>: metadata sidebar (score breakdown, status, job, platform, format, dates, links to project and Figma if set) + rendered markdown.
- /ventures, /ventures/<name>; /projects, /projects/<folder> (tabs + media gallery); /research, /research/<file>; /log; /learnings; /playbook, /playbook/<file>.
- Global client-side search (titles + text) in the header, keyboard shortcut "/".
- Footer: "Content synced <deploy time>" using the server start time.

JSON API (for n8n and video makers): GET /api/ideas (array of {frontmatter..., slug, venture, body}), /api/ideas/<venture>/<slug>, /api/ventures, /api/projects. Pretty JSON, Cache-Control no-store.

AUTH & SECURITY
- HTTP Basic auth on EVERY route except GET /healthz (returns "ok"). Any username; password = env STUDIO_PASSWORD; constant-time compare (crypto.timingSafeEqual on equal-length buffers / hashes). API routes also accept "Authorization: Bearer <STUDIO_API_TOKEN>" when that env var is set.
- Fail closed: if STUDIO_PASSWORD is unset and STUDIO_DEV !== "1", all routes except /healthz return 503 "STUDIO_PASSWORD not set".
- No path traversal: decode once, reject "..", NUL, backslashes; resolve and verify the final path is inside the intended directory; media only from projects/*/outputs/ with whitelisted extensions; never serve .env, package files, studio source, or anything in .claude other than the playbook markdown.
- Escape every frontmatter value in HTML. Markdown is the owner's own content, but strip <script>/<iframe>/on* handlers from rendered HTML with a simple sanitizer.
- Security headers: X-Content-Type-Options nosniff, Referrer-Policy no-referrer, X-Frame-Options DENY, a CSP allowing self + Google Fonts. Add <meta name="robots" content="noindex"> and /robots.txt Disallow all.
- PORT env (default 3000), listen 0.0.0.0. Handle Range requests for video if simple; otherwise stream files.

DESIGN (important — the user will judge this)
This is a private creative studio for many ventures, NOT QSME-branded. It should feel like a calm, premium editorial tool, not an admin template: warm off-white paper background with near-black ink, one confident accent (e.g. a vermilion or electric cobalt — pick one), a real type pairing (a characterful display face for headings such as "Instrument Serif" or "Fraunces", plus "Inter" or "Geist" for UI), generous whitespace, strong hierarchy, hairline rules instead of heavy boxes, no cards-inside-cards, no gradient soup, no emoji as icons (use simple inline SVG or none). Status pills and score badges must be readable in both themes. Dark mode via prefers-color-scheme with properly redefined tokens. Each venture gets a deterministic color dot. Must look great at 375px wide and at 1440px. Focus states visible, tap targets ≥44px on mobile.

TESTS
Write studio/check.mjs (no test framework) that spawns the server on a free port with STUDIO_PASSWORD=test and asserts: /healthz 200 without auth; / 401 without auth with WWW-Authenticate header; / 200 with auth; /ideas 200 and contains "The Facebook group"; /api/ideas returns JSON array of length >= 10 including id "qsme-nz-facebook-group"; every idea detail page 200; /ventures/qsme-nz 200; traversal attempts (/media/../../.env, /media/..%2f..%2f.env, /research/..%2f.env, /playbook/..%2f..%2fsettings.local.json, /projects/..%2f.env) never return 200 and never contain "API_KEY"; a second spawn with no STUDIO_PASSWORD returns 503 on / and 200 on /healthz; Bearer token works on /api/ideas when STUDIO_API_TOKEN is set and is rejected on HTML routes. Run npm install and npm run check until everything passes. Then run the server in dev mode, curl every page type once, check for HTTP 500s or "undefined"/"[object Object]" in the HTML, and stop the server.

Return a concise report: files created, check output summary, known limitations.`

const STUDIO_REVIEW_LENSES = [
  { key: 'security', prompt: `Review the UGC Studio app in ${ROOT}/studio (plus ${ROOT}/package.json, railway.json, .railwayignore) through the SECURITY & CORRECTNESS lens. It will be deployed publicly on Railway behind HTTP Basic auth and holds private business strategy. Hunt for: auth bypasses (any route, HEAD/OPTIONS, encoded paths, trailing slashes, API vs HTML), path traversal (double encoding, symlinks, absolute paths, Windows separators), secrets exposure (.env, .claude/settings*, package files, source), .railwayignore negation actually working, XSS via frontmatter or markdown, crashes on malformed YAML / empty folders / missing fields / new venture folders / files without dates, fail-closed behaviour, timing-safe compare correctness, cache staleness. Actually run things: start the server (STUDIO_PASSWORD=test PORT=<free port>) and probe with curl; run npm run check. Do NOT modify files. Return every real issue with severity and an exact fix.` },
  { key: 'design', prompt: `Review the UGC Studio app in ${ROOT}/studio through the DESIGN & UX lens. Read the HTML templates and CSS, start the server in dev mode (STUDIO_DEV=1 PORT=<free port> npm run dev from ${ROOT}) and fetch pages with curl to inspect the real markup. Judge: does it feel like a premium editorial studio tool rather than a generic admin template? Type pairing, hierarchy, spacing rhythm, colour tokens in light AND dark mode (are all tokens redefined for dark? any hardcoded colours?), contrast of pills/badges, mobile at 375px (no horizontal page overflow, kanban usable, tap targets ≥44px, header/search usable), empty states, the kanban board and idea detail layout, information scent on the home page, focus styles, reduced motion. Do NOT modify files. Return concrete issues with exact CSS/markup fixes, ordered by impact.` },
]

const STUDIO_ISSUES = { type: 'object', properties: { issues: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] }, where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['severity', 'where', 'problem', 'fix'] } }, summary: { type: 'string' } }, required: ['issues', 'summary'] }

const studio = async () => {
  const built = await agent(BUILD_PROMPT, { label: 'build:studio', phase: 'Build studio' })
  const reviews = (await parallel(STUDIO_REVIEW_LENSES.map(l => () => agent(l.prompt, { label: `review:studio:${l.key}`, phase: 'Review studio', schema: STUDIO_ISSUES })))).filter(Boolean)
  const all = reviews.flatMap(r => r.issues)
  log(`studio review: ${all.length} issues (${all.filter(i => i.severity === 'critical' || i.severity === 'high').length} critical/high)`)
  const fixed = await agent(`Apply these review findings to the UGC Studio app in ${ROOT}/studio (and ${ROOT}/package.json, railway.json, .railwayignore). Fix every critical/high/medium issue; fix low ones when cheap. Do not touch content files (ideas/, ventures/, research/, log/, projects/, learnings.md, CLAUDE.md, .claude/). Do not deploy or call any MCP tool. Extend studio/check.mjs with a test for each security fix. Then run npm run check until it passes, start the server in dev mode, curl every page type, confirm no 500s, stop it. Return: what you fixed, what you skipped and why, final check output.

BUILD REPORT:
${built}

FINDINGS:
${JSON.stringify(all, null, 2)}`, { label: 'fix:studio', phase: 'Fix studio' })
  return { built, reviews, fixed }
}

const [creativeResults, studioResult] = await parallel([creative, studio])
return { packages: (creativeResults || []).filter(Boolean), studio: studioResult }
