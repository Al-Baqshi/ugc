# CreativeUGC

A studio for turning ideas into UGC-style videos across multiple ventures.
**The idea is the product. Tools are interchangeable.**

## How we work here

1. **Idea first.** Every video starts as an idea in `ideas/INBOX.md`. No generating before the idea passes the idea test (see `.claude/skills/ugc/SKILL.md`).
2. **Venture context always.** Before writing anything, read the venture's file in `ventures/`. Audience, pain, voice and humor limits live there. If a venture file is missing, create it from `ventures/_template.md` by asking the user — don't invent the audience.
3. **Agree before spending.** Pitch hooks + a one-paragraph concept and get a yes before writing full scripts or calling any paid API.
4. **One project folder per video** in `projects/YYYY-MM-DD-<venture>-<slug>/`, from `projects/_template/`.
5. **Log what we learn.** Anything that worked or flopped goes in `learnings.md` so the next idea starts smarter.

## Save everything locally (standing rule)
The user relies on this folder, not the chat, as the source of truth. In every conversation, without being asked:
- **Every idea discussed** → its own card in `ideas/<venture>/<slug>.md` (frontmatter + truth, twist, beats, hook layers, tools, notes, discussion history) + a row in `ideas/INBOX.md`. Include ideas that were rejected (status `killed`, with the reason).
- **Changes to an idea** (new hooks, feedback, the user's likes/dislikes) → update that card and add a dated line under "Discussion history".
- **Research** (site reviews, competitor ads, audience findings) → `research/YYYY-MM-DD-<topic>.md`.
- **What we discussed, decided and left open** → `log/YYYY-MM-DD.md` (append if it exists).
- **Venture facts the user confirms** → update `ventures/<venture>.md` and remove the ❓.
Save as you go, not at the end. Tell the user in one line what was saved where.

**Then publish:** after saving, run `npm run publish` (background) so the live Studio matches the folder (code via `railway up`; videos/stills go to the private Railway bucket `ugc-videos` via tools/motion/sync-media.mjs, played through short-lived signed links): https://studio-production-ccb0.up.railway.app (login: any username + `STUDIO_PASSWORD` from `.env`). Never print the password. The JSON feed for other tools is `/api/ideas` (Bearer `STUDIO_API_TOKEN`).

**Then back up (standing rule, user 2026-10-03):** run `tools/backup.sh "<what changed>"` (background). It commits + pushes everything to the private repo https://github.com/Al-Baqshi/ugc (secrets refused), refreshes `context/memory/` from Claude's memory, and uploads new/changed videos to the `videos-YYYY-MM` Release. The repo is the record: a new computer or cloud session should be able to continue from it alone (see README → New machine).

**Figma:** post designs live in "QSME — UGC Posts" (BItregalo Team, Starter plan = max 3 pages): https://www.figma.com/design/f8xxaFvwdi6ijGxYj9WEWP. Figma motion is enabled, so animated frames can be exported as MP4 with `export_video`. Each new venture gets its own Figma file (page limit).

Idea cards are plain Markdown with YAML frontmatter, so other tools and video makers can read them directly.

## Voice-ready (standing rule, user 2026-10-02)
Every video ships with `vo-script.json` + `vo-script.md` (contract: `tools/VO_SCRIPT.md`): natural Kiwi lines timed to the video, QSME written "Q-S-me". Check with `python3 tools/vo_status.py`. ElevenLabs is on the FREE plan (API refuses library voices and Voice Design), so until the user upgrades, videos are silent with burned-in captions. After the upgrade: `python3 tools/make_vo.py --all` (voices in `tools/voices.json`). Meanwhile the user can drop their own audio in `outputs/vo/incoming/` → `python3 tools/make_vo.py <project> --files <dir>`.

## Layout

```
ideas/INBOX.md            index of all ideas, scored, linked to cards
ideas/<venture>/<slug>.md one full card per idea
research/                 site reviews, competitor research
log/YYYY-MM-DD.md         what we discussed, decided, left open
ventures/<name>.md        audience, pain, voice, humor rules per venture
projects/<date-slug>/     brief → script → shots → prompts → outputs
learnings.md              what worked, what didn't, why
studio/                   the live Studio app (Railway project ugc-studio)
ventures/assets/          logos and brand files
tools/motion/             motion kit: HTML page → MP4 (make.mjs), live public-page capture (capture.mjs), QA + contact sheets
assets/qsme/              reusable QSME footage, screenshots, icons (local only, see its README)
videos.html               every video + download + its voice script (rebuild: python3 tools/videos_page.py)
tools/el.py               ElevenLabs helper (usage, voices, tts, stt) — key read from .env, never printed
tools/make_vo.py          vo-script.json → takes + STT check + VO laid onto the project video
tools/mux(.swift)         lay audio clips onto a silent MP4 at given times (AVFoundation)
.claude/skills/ugc/       the UGC skill (workflow + references)
.env                      API keys (never commit, never print)
```

## Non-negotiables

- **Push sign-ups, never give it away (owner 2026-10-03):** no "free", "no sign-up", "no login", "no listing fee", "always free", "no fees" or other generous pricing lines in any content. NZ CTA: "Sign up at qsme.co.nz". Global CTA: "Book a 30-minute demo at qsme.build". Site search/site research = what you get when you sign up.

- Humor punches at the situation or at ourselves, never at the customer.
- Real UGC looks unpolished on purpose: phone framing, natural light, real speech rhythm. Don't over-produce.
- AI-generated people must not imitate real, identifiable people or claim fake testimonials as real customers.
- Never print or echo API keys.

## Video IDs (user 2026-10-06)
Every video idea has one ID in its `post.md` frontmatter (`vid:`): `N01…` for QSME NZ, `G01…` for QSME Global, numbered by publish date (index: `projects/ids.json`). Versions of the same idea share the ID and add the cut: `G01·4:5`, `G01·9:16`, `G01·16:9`; voiced = `G01·4:5·vo`. The user refers to videos by ID — always show IDs on videos.html and the Studio, and quote them back.

## Audio-first standard (owner, 2026-10-06) — applies to every video from now on
1. **Script = continuous speech.** A real hook in the first 2 s (bold claim, stinging number, unanswerable question, or the funniest line first), then natural talk for the whole video; no silence longer than 1 s. Captions are phrases lifted from the narration.
2. **One unbroken take** on ElevenLabs `eleven_v3` (with-timestamps; forced alignment `/v1/forced-alignment` if needed). Never slice a take into lines; never generate line by line.
3. **Picture follows audio:** re-time the motion page's beats to the word timestamps, then render. Voice ≈ 1.15 gain; any music bed ≈ 0.09 ducked to 0.03.
NZ CTA is spoken "Sign up at Queue Ess Mee dot Co dot N Z" — "co" is the normal word (as in "co.nz"), never spelled C-O and never a drawn-out "KOH" (owner 2026-10-08, 2026-10-10). Fix only the CTA with tools/fix_cta.py.
Rejected for good: deadpan/low-energy reads, per-line generation with gaps, caption-fragment scripts, letter/alphabet gimmicks on screen.
