---
title: "What your AI assistant can do in QSME, and the four things it never will"
venture: qsme-build
idea: qsme-build-claude-writes-my-tender
status: "rendered — awaiting approval"
publish_date: 2026-10-21
publish_time: "19:30 NZDT (Wed 07:30 London BST, 10:30 Dubai, 09:30 Riyadh)"
created: 2026-10-02
calendar_week: 3
format: long
kind: long-form
length_s: 132.5
aspect: "16:9"
platforms: ["LinkedIn (native video, founder profile; page reposts Thu 08:30 Sydney)", "YouTube (chapters from the chapter cards)"]
video: outputs/claude-writes-my-tender-16x9.mp4
thumbnail: outputs/claude-writes-my-tender-thumb.png
edition: global
related_ideas: ["gl-first-year-rules (its kicker is an optional, founder-approved caption here)"]
---

# What your AI assistant can do in QSME, and the four things it never will

**The insight in one sentence:** Nobody in construction is scared of AI doing the typing, everyone is scared of AI *sending*, so the best thing about QSME's assistant connection is the list of things it was never wired to do: it can read the programme, draft the tender and fill the sheet, but it can't move a date, a dollar or a subcontractor.

**The joke (one, done well, on the situation):** at 9:40 pm she asks her AI to push the programme back a week, it says it can't, and we hard-cut to the QSME Gantt sitting exactly where she left it: "It can't. *On purpose.*" It pays off twice: the never list ("Change the schedule or delete a project") and a callback to the same untouched Gantt with the hook's reply pinned to it ("9:40 pm, from the top of this video"). Second, smaller laugh: the cursor drifts to "Send Tender Invitations" and just... waits ("It drafts. A person presses send.").

**Job:** Week 3 long-form, the prime Wednesday UK/Gulf slot. AI is the most argued-about topic on construction LinkedIn; in programme week this answers "who's allowed to move the dates?". LinkedIn native video from the founder's profile (page reposts Thu 08:30 Sydney) and a YouTube upload where the chapter cards become chapters. Silent-first: every beat reads with the sound off; the Kiwi VO is scripted for later (ElevenLabs upgrade pending), ideally read by the founder.

**What changed from the inbox card** ("I asked Claude to write my tender", score 15): rebuilt around the never list (the sharper truth from `gl-first-year-rules`: the fear is sending, not typing). No vendor as the hero (the assistant is "Your AI assistant", a neutral grey "AI" avatar, no logo). The old CTA "Set it up in two minutes — qsme.build" is dropped (qsme.build has no sign-up; setup lives on the .co.nz /connect page): the CTA is "Book a 30-minute demo".

## Production status (2026-10-02)

| Piece | State | Where |
|---|---|---|
| 16:9 master, 132.5s, 1920×1080, 30 fps, silent-first with burned-in captions | ✅ Rendered. QA passed on the YouTube safe box 96,54,1824,1026. Contact sheet read; full-size stills checked at 0, 3.3, 3.5, 5.2, 11.5, 21.5, 28.5, 33.5, 43.5, 48.5, 54.8, 58.5, 74.9, 77.5, 82, 82.5, 86.5, 93, 97.5, 104, 109, 109.5, 114, 119, 119.8, 123.5, 129, 130; frames pulled from the encoded MP4 (see QA) | `outputs/claude-writes-my-tender-16x9.mp4` · `outputs/claude-writes-my-tender-16x9-frames.png` |
| Thumbnail (frame at 5.6s: the untouched Gantt + "It can't. On purpose.") | ✅ 1280×720 PNG | `outputs/claude-writes-my-tender-thumb.png` |
| Motion source | ✅ `motion/claude-writes-my-tender.html` (kit page, `body.build r16x9`) | motion/ |
| Live public-page footage | ✅ Captured 2026-10-02, no login, nothing typed: element crops of qsme.build/platform/tendering ("Award is a person's decision"), qsme.build/platform/estimating ("Draft with AI, then check") and qsme.build/contact ("What happens on a demo?" + first two bullets) | `motion/clips/stills/` (from `motion/stills.json` via `motion/still.mjs`) |
| Brand b-roll | ✅ `assets/qsme/broll/th-7-complete.v1.mp4` (dusk, under the title card) and `th-4-structure.v1.mp4` (end card), both darkened, uncaptioned | `motion/clips/dusk/`, `motion/clips/structure/` |
| Product screens + assistant chats | 🟡 Nine designed stand-ins built from the truth sheet's exact wording with fictional demo data, each tagged **"Illustrative · recreated screen · demo data"** (hook: "…recreated chat and screen…") while on screen. Swap list below | see "Owner recordings to swap in" |
| VO | 🟡 Timed Kiwi script, 33 lines, 1,315 characters, word for word with the on-screen text. Best read by the founder; AI fallback after the ElevenLabs upgrade. `tools/vo_status.py`: ok | `vo-script.md` · `vo-script.json` |
| Optional founder kicker | ⬜ Built, off. "Same rules I had in my first year as a QS." pops as a handwritten aside under the never list (77.4) when the page is rendered with `<html data-kicker="on">` | needs the founder's yes |
| Music + SFX | ⬜ ElevenLabs Music / SFX on a commercial plan, or a royalty-free library track (see Music) | none yet |

**Re-render from the studio root:** `node tools/motion/make.mjs projects/2026-10-21-qsme-build-claude-writes-my-tender/motion/claude-writes-my-tender.html projects/2026-10-21-qsme-build-claude-writes-my-tender/outputs/claude-writes-my-tender-16x9.mp4 --safe 96,54,1824,1026` (add `--check` while editing; about 8 minutes for the full render). Thumbnail: the same command with `--still 5.6 --still-only` into a scratch folder, then `sips -Z 1280`.
**With the founder kicker:** copy the page to `motion/claude-writes-my-tender-kicker.html`, change `<html lang="en-NZ">` to `<html lang="en-NZ" data-kicker="on">`, render to `outputs/claude-writes-my-tender-kicker-16x9.mp4`.
**Re-capture the public pages (no login):** `node projects/2026-10-21-qsme-build-claude-writes-my-tender/motion/still.mjs projects/2026-10-21-qsme-build-claude-writes-my-tender/motion/stills.json projects/2026-10-21-qsme-build-claude-writes-my-tender/motion/clips/stills`. If a page changes, update the highlight boxes in the `hl(...)` calls (they come from `clips/stills/*.json`).
**When the owner's recordings arrive:** cut each one with `tools/motion/extract` into `motion/clips/<name>`, replace the matching stand-in with `<img class="abs">` + `Kit.clip(...)` at the same times, and remove that interval from the `#tagIll` opacity track (or the `#tagHook` scene for the hook). Captions and timings don't change.

**Label wording (a deliberate deviation):** the brief asked for 'Illustrative — swap for real QSME screen (demo data)'. On screen we use the `.illustrative` class with **"Illustrative · recreated screen · demo data"**, because the 14 Oct review found a viewer-facing "swap for real…" instruction reads as unfinished. The swap instruction lives in this file. One string to change if you prefer the original (`#tagIll`, `#tagHook`).

## Hook layers (frame 1 is already the hook)

- **Text:** "Asked my AI to push the programme a week." (100px, frame 1) · chip "9:40 pm · programme week" · then "**It can't.**" slams in red (3.25) · hard cut (4.2) · "It can't. **On purpose.**" (green slam 4.6).
- **Visual:** frame 1: the chat with the ask already sent ("Push the programme back a week."). Thinking dots, a "QSME · read the schedule" chip, then the reply types: "**I can't change the schedule.** The QSME connection only lets me read it. Moving the dates is up to you." Hard cut to the QSME Gantt, untouched, with only a slow camera drift.
- **Verbal (VO later):** "Asked my AI to push the programme a week. … It can't. … On purpose."
- **Audio:** a message-send tick on frame 1, three soft thinking pulses, a dull thud on "It can't.", a hard cut with a tiny room-tone drop.
- **Why it works:** it opens on the exact fear (AI touching the dates) and flips it in four seconds: the "failure" is the feature. Everyone on construction LinkedIn has an opinion on AI; this one is specific, slightly funny and on the PM's side.
- **Fallback if Session B has no clean take for "push the programme":** "Asked it to send the tender. It can't." (the same structure; the cut goes to the unpublished draft at 44.6 instead of the Gantt).

## Beat-by-beat script (times are seconds on outputs/claude-writes-my-tender-16x9.mp4, 132.5s)

| Time | Role | On-screen text | VO (later, = on-screen text) | Visual | SFX |
|---|---|---|---|---|---|
| 0.0–4.2 | hook | Asked my AI to push the programme a week. · It can't. (3.25) · chip "9:40 pm · programme week" | Asked my AI to push the programme a week. · It can't. | Chat stand-in (right): ask already sent; dots 0.4–1.15; tool chip 1.3; reply types 1.6–3.05. "It can't." slams red under the headline | Send tick 0.0; thinking pulses; thud 3.25 |
| 4.2–7.0 | hook (reveal) | It can't. **On purpose.** (4.6) | On purpose. | Hard cut: QSME Schedule stand-in, Week zoom, coloured by trade, nothing moves (camera drift 1.0→1.025) | Hard cut, room-tone dip 4.2 |
| 7.0–13.4 | title + chapters | 9:40 PM · THE WEEK'S TYPING STILL TO DO · **What your AI assistant can do in QSME, and the four things it never will.** · 1 What it can see · 2 What it can type · 3 What it can never do (red) · 4 Who did what · 5 The small print · caption: It gets the typing. Not the dates, **the money** or **the subcontractors**. | It gets the typing. Not the dates, the money or the subcontractors. | Wipe 7.0; darkened dusk b-roll (th-7-complete) behind; list builds 0.32s apart from 7.95 | Whoosh 7.0; music enters |
| 13.4–16.0 | chapter 1 | 1 · CHAPTER 1 OF 5 · What it can see · Anything your login can see. Nothing else. | One. What it can see. | Wipe, numeral card; top bar "YOUR AI ASSISTANT IN QSME" + pips 1–5 | Whoosh 13.4 |
| 16.0–24.4 | product (read) | "What's on my schedule this week, and **who's turning up?**" · It answers from **the project's own schedule**. | What's on my schedule this week, and who's turning up? · It answers from the project's own schedule. | Chat stand-in: the /connect example prompt; "QSME · read the schedule"; answer: Level 3 framing (on site, Tom R.), Windows L1–2 (Mon 19 Oct, Priya S., booked), Plumbing rough-in L1 (Wed 21 Oct, Lee W., waiting for OK), Scaffold extension (Thu 22–Fri 23 Oct, Ana M., booked); "Four crews. Lee hasn't confirmed yet." | Chat pop 16.25 |
| 24.4–30.6 | proof (match) | THE ANSWER · THE PROJECT'S OWN SCHEDULE · Same crews. **Same dates.** | Same crews. Same dates. | Answer card left, Gantt right; each answer row and its bar ring green in turn (25.3, 25.9, 26.5, 27.1) | Four soft ticks |
| 30.6–35.6 | value | It sees what your login sees. **Nothing more.** · read · write · Two separate permissions. Read alone can never change anything. | It sees what your login sees. Nothing more. | Big type, no screen | none |
| 35.6–38.2 | chapter 2 | 2 · What it can type · Drafts and sheets. Never the send button. | Two. What it can type. | Wipe, numeral card | Whoosh 35.6 |
| 38.2–44.6 | product (write) | "Draft a tender for the façade package, **private, closing next Friday.**" · It drafts it. **Then it stops.** | Draft a tender for the façade package, private, closing next Friday. · It drafts it. Then it stops. | Chat stand-in: "QSME · created a tender draft", "QSME · added 4 SOQ jobs to it"; reply: draft, private, closes Fri 30 Oct, four façade jobs from the SOQ; "It isn't published and nobody has been invited. Check it, then send it from QSME yourself." | Chat pop 38.45 |
| 44.6–51.4 | product (the draft) | It drafts. **A person presses send.** | It drafts. A person presses send. | QSME tender stand-in: "Façade package" · Draft · Private · Closes Fri 30 Oct · "A draft stays private in QSME until you publish it yourself." · four SOQ jobs · "Invitations: nobody invited yet" · Copy link · **Send Tender Invitations**. The cursor (the person) parks beside Send from 47.6 and never clicks | none (the silence is the joke) |
| 51.4–56.2 | product (write) | Paste in a defects list. It comes back as **a sheet**. | Paste in a defects list. It comes back as a sheet. | Chat stand-in: a pasted six-line defects list + "Put it in QSME as a sheet."; "QSME · created a sheet"; reply | Paste whoosh 51.6 |
| 56.2–61.0 | product (sheet) | Your own spreadsheet, **inside the project**. | Your own spreadsheet, inside the project. | QSME Sheets stand-in "Defects, level 3": # / Location / Defect / Trade / Status, six rows fill 0.22s apart, Status "Open" | Soft row ticks |
| 61.0–63.6 | chapter 3 | 3 (red) · What it can never do · QSME's own list, word for word. | Three. What it can never do. | Wipe, red numeral card | Whoosh 61.0 |
| 63.6–75.6 | the never list | WHAT IT CAN NEVER DO · chip "QSME's own list · word for word" · Move money or record a payment ✕ · Send or publish a tender, or accept a bid ✕ · Issue, sign or cancel a contract ✕ · Change the schedule or delete a project ✕ | The four lines, one each, as they type | Each line types on (64.2, 66.6, 69.9, 72.3) and a red ✕ stamp slams after it is read (66.0, 69.3, 71.75, 74.7). Kinetic, typed from /connect, not captured | Four rubber-stamp thunks |
| 75.6–80.0 | rule | Not a setting. Those doors **just aren't wired up.** · (optional, founder-approved: "Same rules I had in my first year as a QS." handwritten, 77.4) | Not a setting. Those doors just aren't wired up. | The list dims to grey | Music near silent |
| 80.0–84.4 | proof (live page) | No automation and **no assistant awards a tender.** | No automation and no assistant awards a tender. | Live qsme.build/platform/tendering card "Award is a person's decision", the sentence highlighted (80.6–81.75) | Highlighter 80.6 |
| 84.4–88.2 | callback | So the programme stays **where a person put it.** | So the programme stays where a person put it. | The same untouched Gantt; the hook's reply pinned top right: "I can't change the schedule. · 9:40 pm, from the top of this video" | Soft pop 85.0 |
| 88.2–90.8 | chapter 4 | 4 · Who did what · A list of everything it did. And an off switch. | Four. Who did what. | Wipe, numeral card | Whoosh 88.2 |
| 90.8–99.2 | control | Settings. Connected apps. **Everything it did**, newest first. · Disconnect, and it **loses access immediately.** | Settings. Connected apps. Everything it did, newest first. · Disconnect, and it loses access immediately. | QSME Settings stand-in → Connected apps: "Your AI assistant · Connected 30 Sep · read and write" + Disconnect; **Recent activity — What your connected apps have done, newest first.**: Created a sheet (Defects, level 3, Tue 9:52 pm) · Added 4 SOQ jobs to a draft (Façade package, 9:46 pm) · Created a tender draft (Façade package, 9:46 pm). Click Disconnect 94.7 → dialog "**It will lose access immediately.**" Cursor parks by the confirm | Click 94.7 |
| 99.2–101.8 | chapter 5 | 5 · The small print · Said out loud. | Five. The small print. | Wipe, numeral card | Whoosh 99.2 |
| 101.8–106.9 | small print 1 | “If an assistant tells you it has sent, paid or awarded something, **it has not.**” · chip "QSME guide · AI assistants (MCP)" | (the quote, word for word) | Quote card | none |
| 106.9–111.0 | small print 2 (live page) | Every draft is **a suggestion for a person to check.** | Every draft is a suggestion for a person to check. | Live qsme.build/platform/estimating card "Draft with AI, then check", "Every draft is a suggestion for a person to check, not a figure to trust." highlighted | Highlighter 107.5 |
| 111.0–115.0 | small print 3 | SMALL PRINT · Works with the assistant you already use: Claude, ChatGPT, Claude Code, Codex or Cursor. · ChatGPT needs a **paid plan with developer mode.** · Your own assistant, on your own account. No partnership implied. | ChatGPT needs a paid plan with developer mode. | Small-print card (names as plain text, no logos) | none |
| 115.0–121.0 | payoff | The assistant drafts; **you decide.** · IT DRAFTS: Tenders · Contracts · SOQ lines · Sheets · YOU DECIDE: Send · Award · Sign · Pay · The dates | The assistant drafts. You decide. | Big type slams 115.4; the two chip rows land 117.0 and 118.3 in silence | Whoosh 115.0 |
| 121.0–125.0 | CTA (live page) | Book a **30-minute demo** on a working project. | Book a thirty-minute demo on a working project. | Live qsme.build/contact "What happens on a demo? Thirty minutes on a working project that resembles yours." highlighted | Highlighter 121.6 |
| 125.0–132.5 | end card | Left half: QSME logo · **qsme.build** · pill "Book a 30-minute demo" · "What would you let it **type first?** Tell us in the comments." | Q-S-me dot build. What would you let it type first? | Darkened framing b-roll (th-4-structure); the right half stays clear for YouTube end-screen elements | Music resolves ~131.5 |

Captions are 54px Space Grotesk on a dark box (bottom 66px, max width 1560px); hero type is 60–150px. Where the hero text is the VO line, there is no separate caption box, so the on-screen text always doubles as the subtitle.

## YouTube chapters (paste into the description)

```
0:00 "Push the programme back a week." It can't.
0:13 1. What it can see
0:35 2. What it can type
1:01 3. What it can never do
1:28 4. Who did what
1:39 5. The small print
1:55 The assistant drafts; you decide
```

## Captions, hashtags and CTA

### LinkedIn: founder's profile (Wed 21 Oct, 19:30 NZDT = 07:30 London, 10:30 Dubai, 09:30 Riyadh)

> Asked my AI assistant to push the programme back a week.
>
> It can't. On purpose.
>
> You can connect the assistant you already use to QSME (Claude, ChatGPT, Claude Code, Codex or Cursor). Here's the honest version of what that means, in two minutes:
>
> 1. What it can see: whatever your login can see. Nothing more.
> 2. What it can type: tender drafts, contract drafts, SOQ lines and sheets. A pasted defects list comes back as a sheet in the project.
> 3. What it can never do: move money or record a payment · send or publish a tender, or accept a bid · issue, sign or cancel a contract · change the schedule or delete a project.
> 4. Who did what: Settings → Connected apps lists what it did, newest first. Disconnect, and it loses access immediately.
> 5. The small print: if an assistant tells you it has sent, paid or awarded something, it has not. Every draft is a suggestion for a person to check. ChatGPT needs a paid plan with developer mode.
>
> The assistant drafts; you decide.
>
> What would you let it type first?
>
> (Chats and product screens in the video are recreations with demo data. Your own assistant on your own account; no partnership with any AI company implied.)

**First comment (founder):** Book a 30-minute demo on a working project: https://qsme.build/contact?utm_source=linkedin&utm_medium=organic_social&utm_campaign=ai-assistant-never-list

**Hashtags (3, at the end):** #ConstructionTech #ProjectManagement #QuantitySurveying

### LinkedIn: QSME page repost (Thu 22 Oct, 08:30 Sydney)

> "Push the programme back a week." It can't. On purpose.
>
> What an AI assistant can do inside QSME, and the four things it was never wired to do. Two minutes.
>
> Book a 30-minute demo: qsme.build

### YouTube

- **Title:** What your AI assistant can do in QSME (and the four things it never will)
- **Thumbnail:** `outputs/claude-writes-my-tender-thumb.png`
- **Description:**
  > I asked my AI assistant to push the programme back a week. It can't, on purpose. Connect the assistant you already use (Claude, ChatGPT, Claude Code, Codex or Cursor) to QSME and it can read what your login can read, answer "what's on this week and who's turning up?", draft a tender or a contract for a person to check and send, add SOQ lines and turn a pasted list into a sheet. What it can never do: move money or record a payment; send or publish a tender, or accept a bid; issue, sign or cancel a contract; change the schedule or delete a project. Settings → Connected apps shows what it did, newest first, and Disconnect cuts it off immediately. ChatGPT needs a paid plan with developer mode. The assistant drafts; you decide.
  >
  > Book a 30-minute demo on a working project: https://qsme.build/contact?utm_source=youtube&utm_medium=organic_video&utm_campaign=ai-assistant-never-list
  >
  > [chapters block above]
  >
  > Chats and product screens are recreations with demo data until the recorded screens replace them. Your own assistant on your own account; no partnership with any AI company implied.
- **Tags:** construction project management, AI assistant, MCP, construction programme, tendering, schedule of quantities, quantity surveying, construction software
- **Pinned comment:** "What would you let it type first? Book a demo on a working project: qsme.build"
- **End screen (last 6–7s, from about 126.0):** subscribe + "Why six bids never compare" as the related video, both in the right half (the end card keeps the left half for logo, URL, demo pill and comment prompt).

**CTA line (all platforms):** Book a 30-minute demo at qsme.build. Comment prompt: "What would you let it type first?"

## Music

- **Direction:** nothing under the hook (0–7.0): just the send tick, the thinking pulses, the thud and the hard cut. A sparse late-night bed enters on the title card: soft felt-piano or Rhodes pulse with a warm low pad, 84–88 BPM, about 20 dB under the VO, dipping on every wipe. It drops to almost nothing for the never list (63.6–80.0) so the four stamps carry it, returns gently for chapter 4, lifts a touch on "The assistant drafts; you decide." (115.0) and resolves on one held chord at ~131.5.
- **Mood:** 9:40 pm, lamp on, competent and calm, a little wry. No risers, no "tech-reveal" synths, no trending track.
- **Source:** ElevenLabs Music on a plan that includes commercial use. Prompt: "late-night minimal felt piano pulse with a warm low pad, 86 BPM, calm and wry, sparse, no drums for the first 60 seconds then a soft brushed kick, no vocals, no risers, 126 seconds, near-silent between 56 and 73 seconds, resolves on a single held chord at 124 seconds" (place from 7.0). Or a royalty-free library track on a business/brand-channel licence that also covers paid social. SFX from ElevenLabs Sound Effects; nothing that imitates a real chat app's or OS's sounds.
- **Licensing:** LinkedIn has no licensed music library and YouTube Content ID flags library tracks without a channel licence, so generated or commercially licensed audio only.

## Owner recordings to swap in (Session B, weeks 2–4, demo Global org)

Use the owner's **own** assistant connected to a **demo Global organisation** by OAuth (never a personal access token on screen). Demo project **"Riverside Terraces (demo)"** with invented people only: schedule tasks Level 3 framing (Tom R., on site), Windows levels 1–2 (Priya S., booked), Plumbing rough-in L1 (Lee W., asked, not yet confirmed), Scaffold extension (Ana M., booked), Roofing (Hemi T.), Electrical rough-in (Grace L.), Façade panels (no one yet); an **Active** SOQ pocket "Façade" with four jobs (Façade panels: supply & fix · Subframe & brackets · Flashings & sealant · Access for façade works). Record at 1920×1080 or larger, browser zoom 125–150%, no bookmarks bar.

**Crop or keep out of frame, every shot:** api.qsme.co.nz; any qsme.co.nz domain on the OAuth/consent screen; tokens; the `claude mcp add …` setup command; the assistant's sidebar of personal chats; the assistant vendor's logo as a hero (a small app name in the title bar is fine). **Discard any take** where the assistant claims it sent, published, invited, awarded, signed, paid or moved anything; mentions money (the connector assumes NZD); or uses NZ terms (GST, NZD, tradie, consent). Never ask it to "summarise the bids".

| # | Replaces (s) | Exact screen and click path | Demo data / framing | Length to record |
|---|---|---|---|---|
| 1 | 0.0–4.2 (hook chat) | Assistant, new chat, QSME connected: type **"Push the programme back a week."** → record its real reply that it can't change the schedule | Keep the reply's first sentence in frame. Fallback if no clean take: "Send the façade tender." → it can't (then the hook cuts to shot 6) | 10s |
| 2 | 4.2–7.0 and 84.4–88.2 (Gantt) | QSME → the project → **Schedule** → Timeline, Week zoom, Colour the bars by: Trade, right after shot 1 so nothing has moved | Money columns (Cost / Paid) hidden or out of frame; no customer names; the "Today" line in view | 12s (one take serves both slots) |
| 3 | 16.0–24.4 | Assistant: **"What's on my schedule this week, and who's turning up?"** → its real answer | Keep only the answer; crop any money (there shouldn't be any) | 12s (we cut the wait) |
| 4 | 24.4–30.6 | Split: the answer from shot 3 beside the Schedule from shot 2 | Same week visible; we add the green rings in the edit | uses 2 + 3 |
| 5 | 38.2–44.6 | Assistant: **"Draft a tender for the façade package, private, closing next Friday."** → real reply (draft created, not published) | Discard if it says "sent", "published" or "invited" | 12s |
| 6 | 44.6–51.4 | QSME → **Tenders** → the new **Façade package** draft, unpublished; move the mouse to the send step (**Send Tender Invitations** / publish) and **don't click** | Status reads Draft; scope shows the four façade jobs; no budget on screen | 8s |
| 7 | 51.4–56.2 | Assistant: paste the six-line demo defects list (in this file's beat table) + **"Put it in QSME as a sheet."** → real reply | Plain text paste only | 10s |
| 8 | 56.2–61.0 | QSME → the project → **Sheets** → the new sheet with its six rows | No money columns | 6s |
| 9 | 90.8–99.2 | QSME → **Settings → Connected apps** → the **Recent activity** list ("What your connected apps have done, newest first.") → **Disconnect** → the confirm with **"It will lose access immediately."** (then Cancel, or reconnect afterwards) | Crop api.qsme.co.nz and any personal details; the activity rows should be shots 5–8's actions | 12s |

Until these arrive, the stand-ins carry the beats and the label reads "Illustrative · recreated (chat and) screen · demo data" whenever one is on screen (0–7.0 via `#tagHook`; 16.0–30.6, 38.2–61.27, 84.4–88.47, 90.8–99.47 via `#tagIll`).

## Footage used

- **Live public pages (captured 2026-10-02, no login, nothing typed):** element crops (2× DPR) of qsme.build/platform/tendering card "Award is a person's decision" (80.0–84.4), qsme.build/platform/estimating card "Draft with AI, then check" (106.9–111.0) and qsme.build/contact "What happens on a demo?" with its first two bullets (121.0–125.0). Element crops keep everything else out of frame: the /platform "AI assistants" module (it says "summarise bids", which overstates the connector), the tendering page's "compared line by line" hero and Line × Bidder mock-up, and the contact page's unconfirmed "within two business days" promise and hello@qsme.co.nz. `tools/motion/capture.mjs` (viewport screencast) wasn't used for that reason: a scroll would pass those claims.
- **assets/qsme:** `broll/th-7-complete.v1.mp4` 0–8s (dusk townhouses, darkened under the title card, sets the 9:40 pm mood) and `broll/th-4-structure.v1.mp4` 0–8s (framing, darkened under the end card). AI brand b-roll already live on qsme.co.nz, never captioned as a real site or customer. `th-5b-lockup` was tried for the end card and dropped: a third-party wrap brand is legible on it.
- **Not used, and why:** the schedule walkthroughs (`client-schedule`, `client-schedule-deep`) are NZ-edition Remotion recreations that predate the 22–23 Sep schedule rebuild, show the app.qsme.co.nz bar, a "12 Harbour View Terrace, Sandringham" address and the removed "Book a tradie" and "Customers & Leads" sidebar items; the tender/SOQ walkthroughs show NZD and older wording; the phone captures are the NZ app. The Gantt stand-in uses the current wording and the Knowledge Hub's schedule-colours hex values instead.

## Integrity notes (every claim and the truth-sheet feature it rests on)

| Claim on screen / in VO | Rests on (research/2026-10-02-qsme-platform-truth.md) | Status |
|---|---|---|
| "Asked my AI to push the programme a week. It can't. On purpose." · reply "I can't change the schedule." | 12.11 `ai-assistant-connector`: "It cannot … change the schedule"; never list "Change the schedule or delete a project"; public Knowledge Hub guide: `get_schedule` is read-only and there is no schedule write tool. The reply wording is a recreation until shot 1 is recorded | ✅ live |
| Gantt stand-in: "Timeline / List / All projects", "Day / Week / Month / Year", chips "On site now · Starting this week · Waiting for OK · Can't make it · Behind · Rain risk", bars that say their dates in words, trade colours, amber "waiting" ring, "Today" line | 7.1 `gantt` (exact wording; "Every bar says its dates in words"); Knowledge Hub schedule-colours (hex values, amber ring = Waiting for OK, green line = today). No Cost / Paid columns, no percentages | ✅ live |
| "It gets the typing. Not the dates, the money or the subcontractors." | 12.11: cannot move money, publish a tender, accept a bid, issue or sign a contract, or change the schedule (inviting bidders and awarding are a person's act) | ✅ live |
| "What's on my schedule this week, and who's turning up?" | 12.11 exact example prompt from /connect | ✅ live |
| "It answers from the project's own schedule." · answer with tasks, dates, names, "waiting for OK" | 12.11 (reads projects and schedule); Knowledge Hub `get_schedule` "tasks, dates, who is on each, what follows what". Names and dates are demo data | ✅ live |
| "It sees what your login sees. Nothing more." · "read · write · Two separate permissions. Read alone can never change anything." | 12.11 facts: "Two scopes: read and write; the assistant sees only what your login sees"; Knowledge Hub: "A token with read alone can never change anything" | ✅ live |
| "Draft a tender for the façade package, private, closing next Friday." · "created a tender draft", "added 4 SOQ jobs to it" | 12.11 (drafts tenders for review; same shape as the /connect example "Draft a tender for the plumbing and drainage jobs, private, closing next Friday."); 4.1 (tender cut from an Active SOQ pocket; Global tenders are always private) | ✅ live |
| "It drafts it. Then it stops." · "It drafts. A person presses send." · draft "isn't published and nobody has been invited" | 12.11 fact "Tender and contract drafts stay private until a person publishes them"; Knowledge Hub "Publishing it, inviting anyone, and awarding it are done by a person in QSME." | ✅ live |
| Tender stand-in: "Send Tender Invitations", "Copy link", Draft / Private, "A draft stays private in QSME until you publish it yourself." | 4.1 exact wording ("Send Tender Invitations"; Global "Copy link"); the info-box sentence is the public Knowledge Hub's wording placed in a recreated UI box (check against shot 6). No budget, no money | ✅ live (layout illustrative) |
| "Paste in a defects list. It comes back as a sheet." · "Your own spreadsheet, inside the project." | 10.4 `sheets` ("your own spreadsheets inside the project"); 12.11 "fill sheets" (Knowledge Hub `create_sheet` / `import_sheet_csv`). The sheet has no money columns | ✅ live |
| The never list: "Move money or record a payment · Send or publish a tender, or accept a bid · Issue, sign or cancel a contract · Change the schedule or delete a project" | 12.11 exact on-screen wording ("What it can never do — …"), typed word for word, not captured (the /connect page is a .co.nz page) | ✅ live |
| "Not a setting. Those doors just aren't wired up." | Knowledge Hub: "Those doors are not wired to MCP at all — not gated behind a flag, not available with a better token." and "This is deliberate and it is not configurable." | ✅ live |
| "No automation and no assistant awards a tender." | Live qsme.build/platform/tendering card, captured; 5.3 (award is a person's decision); red list | ✅ live |
| "So the programme stays where a person put it." | Never list + 7.6/7.7 (dates move only when a person moves them, booked people are asked first) | ✅ live |
| "Settings. Connected apps. Everything it did, newest first." · "Connected apps — Recent activity — What your connected apps have done, newest first." · Disconnect → "It will lose access immediately." | 12.11 exact wording and demo moment. Invented for the stand-in (check against shot 9): the dialog title "Disconnect your AI assistant?", the app row "Your AI assistant · Connected 30 Sep · read and write", and the activity rows' wording (writes only, since we don't know whether reads are listed) | ✅ live (details illustrative) |
| "If an assistant tells you it has sent, paid or awarded something, it has not." | 12.11 Knowledge Hub line, word for word | ✅ live |
| "Every draft is a suggestion for a person to check." | Live qsme.build/platform/estimating card, captured (3.6 qsme.build wording) | ✅ live |
| "Works with … Claude, ChatGPT, Claude Code, Codex or Cursor." · "ChatGPT needs a paid plan with developer mode." · "No partnership implied." | 12.11 title and fact-check (paid ChatGPT plan with developer mode); red list (no partnership or endorsement; free ChatGPT doesn't work). Names as plain text, no logos | ✅ live |
| "The assistant drafts; you decide." · IT DRAFTS Tenders · Contracts · SOQ lines · Sheets / YOU DECIDE Send · Award · Sign · Pay · The dates | 12.11 exact line; "add SOQ lines, fill sheets, and draft tenders and contracts for you to review"; the never list | ✅ live |
| "Book a 30-minute demo on a working project." · live "Thirty minutes on a working project that resembles yours." · qsme.build | 12.8 `book-a-demo` (demo: 30 minutes on a working project), live /contact captured. Not "sign up" (red list) | ✅ live |

- **Guardrails kept:** no money in any prompt, answer or screen (no budget, no Cost/Paid columns, no payment status); no GST, NZD, tradie, consent, LIM or other NZ-only words; no vendor logo or implied partnership (neutral grey "AI" avatar, "Your AI assistant"); never "summarise the bids"; no tool counts, tokens, setup command, api.qsme.co.nz or .co.nz domains on screen; no "compared line by line", verification, escrow, counts, prices, time or money saved, testimonials or competitor names; the app's languages aren't mentioned.
- **Stand-ins are labelled:** the hook chat, the Gantt (×3), three assistant chats, the tender draft, the sheet and the Settings page are designed recreations with fictional demo data, labelled for every second they're on screen. Invented details to check against the recordings: the chat UI (generic, unbranded), tool chips ("QSME · read the schedule" etc.), "QSME connected", the crumbs "app.qsme.build · Schedule / Tenders / Sheets / Settings", the chip counts, the tender's sub-line and info box, the sheet's toolbar, the Settings nav, the app row, the activity rows and the dialog title.
- **Demo data is consistent:** "this week" = Mon 19 – Fri 23 Oct 2026 (the video posts Wed 21 Oct); "closing next Friday" = Fri 30 Oct; the four crews in the answer are the four rings on the Gantt; the activity rows are exactly what the assistant did in chapter 2 (two tender-draft actions at 9:46 pm, the sheet at 9:52 pm).
- **Who the joke is on:** the situation (a late night, a PM who wants help but not that much help) and the AI. Never the customer.
- **No people:** no actors, faces or AI people. The b-roll workers are AI brand footage, darkened, uncaptioned. The VO is a first-person script; if an AI voice reads it, it is never presented as the founder.
- **QA note:** the app windows that push in carry `data-qa-ignore` (they move like a screen recording would); every caption, title, chip, label and the end card are still checked against the safe box, and the windows were checked by eye in full-size stills.

## QA

`make.mjs` QA ok on the safe box 96,54,1824,1026 (132.5s, 3,975 frames). Contact sheet (16 samples) read. Full-size page stills checked at every beat listed in Production status; frames pulled from the encoded MP4 with `tools/motion/frames` at 0, 3.6, 5.6, 10.5, 21.0, 27.5, 32.5, 43.5, 49.5, 58.0, 74.9, 78.0, 82.5, 86.5, 93.5, 97.5, 104.5, 109.0, 113.5, 119.5, 123.0 and 131.0 (hook legibility on frame 1, the hard cut, ring order, cursor never on the button text, every ✕ stamp, highlight boxes on the live crops, dialog, quote card, end card to the last frame).

Picky-CD fixes made before the final render: headline sized to own frame 1; the reply now finishes before "It can't." (hook retimed so the VO fits at a natural pace); "It can't." stays red through the cut; title card widened so "QSME," doesn't orphan; chat windows shortened so two-line captions never touch them; chat text enlarged (34px asks, 31px answers); user bubbles balanced; Gantt list header aligned; split-screen labels top-aligned; never list enlarged to 66px with 104px stamps; second highlight box on the award card; estimating crop shrunk off the caption; quote card narrowed; close block re-centred; cursor parked off the Send label; end-card b-roll swapped to avoid a legible third-party brand.

## Open questions for you

- [ ] Approve the cut (132.5s, within 120s ±15%), or change anything?
- [ ] **Founder kicker:** happy to add "Same rules I had in my first year as a QS." as a handwritten aside under the never list (77.4)? It's built and off; one attribute turns it on (see Production status). If you read the VO yourself, line 21 can become that line.
- [ ] Session B: can you record shots 1–9 in the demo Global org? Discard any take with money, NZ terms, or a claim it did something it can't.
- [ ] VO: will you read it yourself (recommended), or should it go to the cast Global QS voice (Arnold) or a female Kiwi voice after the ElevenLabs upgrade? The script is written gender-neutral.
- [ ] Label: OK with "Illustrative · recreated screen · demo data" on screen instead of the brief's "Illustrative — swap for real QSME screen (demo data)"?
- [ ] Product check before posting: does Recent activity list reads (e.g. "read the schedule") or only writes? What is the exact Disconnect dialog title? A Global prospect who connects will get NZD-convention answers; worth fixing before this drives demos.
- [ ] Website copy: qsme.build/platform's AI module still says "summarise bids" (overstated: the bid tool returns a count). We kept it out of frame; worth fixing before LinkedIn traffic lands there.

## Discussion history

- 2026-10-02: Built from the approved calendar slot (2026-10-21, week 3, idea qsme-build-claude-writes-my-tender, Global, 16:9 long-form, 120s target). Rebuilt the inbox card around the never list with the hook "Asked my AI to push the programme a week. It can't. On purpose." and a callback to the untouched Gantt. Five chapters (see, type, never, who did what, small print), "The assistant drafts; you decide.", CTA "Book a 30-minute demo". Captured three public qsme.build element crops (no login), cut two b-roll clips, built nine labelled stand-ins from the truth sheet's exact wording with consistent demo data. Picky-CD passes on full-size stills (list under QA). Rendered 132.5s, QA passed. VO script (33 lines) and music direction ready for after the ElevenLabs upgrade. The `gl-first-year-rules` kicker is built in as an optional, founder-approved caption. Status: rendered — awaiting approval.
