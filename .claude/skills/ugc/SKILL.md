---
name: ugc
description: Turn an idea into a UGC-style short video for one of the user's ventures — ideation, hooks, humor, script, shot list, and prompts for generation tools (Higgsfield, ElevenLabs, Runway, Gemini/Veo, etc.). Use when the user drops a video idea, asks for UGC/ad/reel/TikTok content, wants to brainstorm content for a venture, or says "let's make a video".
---

# UGC Studio

The idea carries the video. Tools just render it. Spend your effort on the first three steps.

## 0. Load context
- Read `ventures/<venture>.md`. Missing? Build it with the user from `ventures/_template.md` (ask; don't guess the audience).
- Skim `learnings.md` and the venture's past projects for what already worked.
- Read `references/humor.md`, `references/formats.md` and `references/direct-response.md` once per session.

## 1. Sharpen the idea (discuss mode)
If the user gives a rough idea, or asks to brainstorm, don't jump to a script. Produce:
- **The truth**: the one real, specific thing the audience feels (e.g. "you open the fridge 4 times hoping food appeared").
- **The twist**: where the humor or surprise comes from.
- **The target**: who exactly, on which platform, and what we want them to do after.
- **The job**: organic (awareness/engagement) or paid (sales)? This decides the structure. See `references/direct-response.md`.

For paid, or for a new venture, do quick research first: Meta Ad Library, TikTok Creative Center, niche searches and real reviews (see direct-response.md → Research).

Run the **idea test**. Every idea must pass all four:
1. **Recognizable** — would the target say "that's literally me" in the first 2 seconds?
2. **Specific** — does it have a concrete detail, not a category ("mornings are hard" ✗, "snoozing so many times the alarm starts sounding disappointed" ✓)?
3. **Ownable** — could this only be our venture's video, or could any brand post it? The product should be the payoff, not a sticker at the end.
4. **Shareable** — would someone send it to a friend? Why?

Score each 1–5. Below 14/20 → rework or kill. Log the idea in `ideas/INBOX.md` with its score either way.

## 2. Hooks
Write **5 hooks**, each built on a different mechanism (`references/formats.md`). Spell out each hook's layers: text + verbal + visual (+ audio). Paid hooks stack 3+ layers. Check each one is emotional, specific, urgent or curious, and short. Mark your pick and why. Get the user's choice before continuing.

## 3. Concept + agreement
One paragraph: format, character, beat-by-beat arc, the laugh, the product moment, CTA. Plus length (organic 15–30s, paid 30–40s) and platform.
For paid, map the beats to the ad anatomy and confirm the required parts are all there: hook, product intro, problem→solution, value props, CTA. Social proof only if the user has real proof to show.
**Stop and confirm with the user.** No full script, no paid calls before a yes.

## 4. Script
Create `projects/YYYY-MM-DD-<venture>-<slug>/` from `projects/_template/` and fill `brief.md`, then `script.md`:
- Written for the mouth, not the page: contractions, filler where natural, short lines.
- Timestamped beats. On-screen text separate from spoken lines.
- Read it aloud in your head at speaking pace (~2.5 words/sec). Cut until it fits.
- Tag each beat with its anatomy role (hook / intro / problem / solution / value / proof / CTA).
- Run the humor checks in `references/humor.md`.

## 5. Shots + tool routing
Fill `shots.md`: one row per shot — duration, framing, action, dialogue, and which tool renders it. Route using `references/tools.md`. Keep one consistent character reference across shots.

## 6. Prompts
Write ready-to-paste prompts in `prompts.md` per tool (image → video → voice → edit). Include negative guidance ("no studio lighting, no cinematic color grade") to keep it looking like real UGC. Plan extra takes and B-roll so the edit has options.
If an API key is present in `.env` and the user approves the spend, run generation and save outputs into the project's `outputs/`.

## 7. Review + learn
Before calling it done, check: hook lands in <3s with sound off? Product clear without being an ad read? Joke still funny on the third watch? Paid: all required anatomy parts present, CTA explicit, every claim and piece of proof real?
After the user posts it, ask how it did and append to `learnings.md` (what, result, why we think so). Organic → views/saves/shares. Paid → hook rate, CTR, CPA/ROAS.

## Modes
- **"Idea: …"** → steps 0–3, then wait.
- **"Brainstorm for <venture>"** → 8–10 one-line ideas scored with the idea test, top 3 expanded to truth/twist/target.
- **"Batch"** → one core truth, 3–5 variations for A/B testing. For paid, keep the body fixed and swap only the hooks, so results show which hook won.
- **"Research <venture>"** → competitor ads, recurring hooks, review-mined pains, gaps. Saved to the venture file.
- **"Make it"** on an agreed concept → steps 4–6.
