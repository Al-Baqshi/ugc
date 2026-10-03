# VO script: Kiwi performance

**Character:** The PM in first person: a Kiwi project manager, late 30s, on the couch at 9:40 pm with the week's typing still to do. General urban New Zealand accent (Auckland or Wellington office), not broad, not Australian, never a caricature. Dry, under-played, a bit tired, amused at her own rules for the AI. The script is written gender-neutral, so it suits (best) the founder in his own voice, (default AI read) the cast Global QS voice in tools/voices.json (qsme-build: Arnold, alt James), or a female Kiwi voice (e.g. Jenna, run make_vo.py with that voice id). An AI voice never speaks as the founder and is never captioned as him.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Video:** `outputs/claude-writes-my-tender-16x9.mp4` (times below are seconds on this file, 132.5s, 16:9)

**Casting line:** “Asked my AI to push the programme a week. It can't. On purpose. Q-S-me dot build.”

**Series rule:** The burned-in captions are the subtitles, so every voiced line matches its on-screen text word for word ('30-minute' is read 'thirty-minute'; QSME is read 'Q-S-me'). Where the hero text IS the line (hook headline, 'It can't.', 'On purpose.', 'It sees what your login sees. Nothing more.', the four never-list lines, the quote card, the small-print line, 'The assistant drafts; you decide.'), there is no separate caption box. Chapter numbers are spoken; labels, chips, chat text and the 'Illustrative' tag stay unvoiced.

## Lines

| # | Start | Max | Line (v2) | On screen | Delivery |
|---|---|---|---|---|---|
| 01-hook | 0.2s | 3.0s | **Asked my AI to push the programme a week.** | Headline 'Asked my AI to push the programme a week.' (frame 1) · chat: 'Push the programme back a week.' already sent · chip '9:40 pm · programme week' | First person, tired, 9:40 at night on the couch. A real Kiwi PM telling a mate, not an announcer. Flat and a bit sheepish, a light lean on 'push', falling at 'a week'. Out by 3.2, before 'It can't.' slams. |
| 02-cant | 3.3s | 0.9s | **It can't.** | 'It can't.' slams in red under the headline (3.25); the assistant's reply 'I can't change the schedule.' is on screen | Dry, almost amused. Two syllables, a small gap before it. Kiwi 'can't' (broad 'ah', never the American 'can't'). Out by 4.2 (the hard cut). |
| 03-purpose | 4.65s | 1.3s | **On purpose.** | Hard cut (4.2) to the QSME schedule, untouched · 'It can't.' (red) 'On purpose.' (green, slams 4.6) | The turn. Warm, quietly pleased, like it was your idea all along. No punchline lift. Out by 6.0 so the cut to the title breathes. |
| 04-title | 9.5s | 3.85s | **It gets the typing. Not the dates, the money or the subcontractors.** | Title card 'What your AI assistant can do in QSME, and the four things it never will.' + chapter list · caption 'It gets the typing. Not the dates, the money or the subcontractors.' | Matter-of-fact, the house rule. A small beat after 'typing'. The list is three even steps, the last one falling. Out by 13.35 (wipe 13.4). |
| 05-ch1 | 13.9s | 2.0s | **One. What it can see.** | Chapter card '1 · What it can see' / 'Anything your login can see. Nothing else.' | Chapter marker, unhurried, lower energy than the lines either side. Out by 15.9. |
| 06-ask-schedule | 16.25s | 3.6s | **What's on my schedule this week, and who's turning up?** | Chat: 'What's on my schedule this week, and who's turning up?' · caption the same | Read as the question she actually types, conversational, a slight rise on 'turning up?' only. Out by 19.9. |
| 07-answers | 20.1s | 3.0s | **It answers from the project's own schedule.** | The answer: four crews with dates and names (demo data) · caption 'It answers from the project's own schedule.' | Plain, a touch impressed despite herself. Lean on 'own'. Out by 24.3. |
| 08-same | 24.7s | 2.0s | **Same crews. Same dates.** | Split: the answer beside the QSME schedule; the four bars ring green one by one (25.3 to 27.1) · caption 'Same crews. Same dates.' | Two short statements, the second a hair lower. Ticking boxes. Out by 27.0; the rings finish in silence. |
| 09-login | 30.7s | 3.4s | **It sees what your login sees. Nothing more.** | 'It sees what your login sees.' then 'Nothing more.' (green, 31.9) · chips 'read' 'write' + 'Two separate permissions. Read alone can never change anything.' (unvoiced) | Reassuring, firm, not salesy. Full stop after 'sees'. 'Nothing more' quieter and final. Out by 35.4. |
| 10-ch2 | 36.1s | 2.0s | **Two. What it can type.** | Chapter card '2 · What it can type' / 'Drafts and sheets. Never the send button.' | Chapter marker, same shape as 05. Out by 38.1. |
| 11-ask-tender | 38.45s | 4.0s | **Draft a tender for the façade package, private, closing next Friday.** | Chat: 'Draft a tender for the façade package, private, closing next Friday.' · caption the same | Instruction voice, a PM rattling off a job: brisk, clipped commas, 'façade' said fuh-SAHD. Out by 42.5. |
| 12-stops | 42.65s | 1.9s | **It drafts it. Then it stops.** | The reply: 'Done. "Façade package" is saved as a draft… It isn't published and nobody has been invited.' · caption 'It drafts it. Then it stops.' | Dry observation, a tiny smile on 'stops'. Out by 44.55. |
| 13-send | 45.1s | 3.0s | **It drafts. A person presses send.** | QSME tender draft (Draft · Private · Closes Fri 30 Oct); the cursor parks by 'Send Tender Invitations' and never clicks · caption 'It drafts. A person presses send.' | The thesis line, but said like common sense. Even weight, lean on 'person'. Out by 48.5; the cursor hovers in silence after. |
| 14-defects | 51.7s | 4.3s | **Paste in a defects list. It comes back as a sheet.** | Chat: a pasted defects list (six lines) + 'Put it in QSME as a sheet.' · caption 'Paste in a defects list. It comes back as a sheet.' | Light, practical, the tiny win of the evening. Out by 56.1. |
| 15-sheet | 56.5s | 3.5s | **Your own spreadsheet, inside the project.** | QSME sheet 'Defects, level 3' fills row by row · caption 'Your own spreadsheet, inside the project.' | Satisfied, unhurried. Out by 60.2, before the wipe at 61.0. |
| 16-ch3 | 61.5s | 2.0s | **Three. What it can never do.** | Chapter card '3 · What it can never do' (red numeral) / 'QSME's own list, word for word.' | Slightly slower and lower than the other chapter markers: this is the one that matters. Out by 63.5. |
| 17-never-money | 64.2s | 2.2s | **Move money or record a payment.** | 'What it can never do' + line 1 types: 'Move money or record a payment' · red ✕ stamps at 66.0 | Reading a rule off the wall. Flat, deliberate, a full stop. Out by 65.95 so the stamp lands clean. |
| 18-never-tender | 66.6s | 3.1s | **Send or publish a tender, or accept a bid.** | Line 2: 'Send or publish a tender, or accept a bid' · stamp 69.3 | Same flat delivery, no list-sing (don't rise on 'tender'). Out by 69.25. |
| 19-never-contract | 69.9s | 2.2s | **Issue, sign or cancel a contract.** | Line 3: 'Issue, sign or cancel a contract' · stamp 71.75 | Same. Each verb distinct but quick. Out by 71.7. |
| 20-never-schedule | 72.3s | 3.0s | **Change the schedule or delete a project.** | Line 4: 'Change the schedule or delete a project' · stamp 74.7 | Last of four, the faintest knowing lean on 'schedule' (the hook). Falling end. Out by 74.65. |
| 21-not-wired | 75.9s | 3.8s | **Not a setting. Those doors just aren't wired up.** | The list dims · caption 'Not a setting. Those doors just aren't wired up.' | Conversational, explaining to a sceptical commercial manager. 'Not a setting' quick, then a beat, then the rest relaxed. Out by 79.8. |
| 22-award | 80.3s | 3.8s | **No automation and no assistant awards a tender.** | Live qsme.build/platform/tendering card 'Award is a person's decision', 'No automation and no assistant awards a tender.' highlighted · caption the same | Quoting their own website, deadpan, almost reading it aloud. Out by 84.3. |
| 23-programme | 84.7s | 3.5s | **So the programme stays where a person put it.** | Callback: the same untouched schedule + the hook's reply bubble 'I can't change the schedule.' · caption 'So the programme stays where a person put it.' | Callback, a small smile in the voice. Out by 88.1. |
| 24-ch4 | 88.7s | 1.8s | **Four. Who did what.** | Chapter card '4 · Who did what' / 'A list of everything it did. And an off switch.' | Chapter marker. Out by 90.6. |
| 25-activity | 91.1s | 3.5s | **Settings. Connected apps. Everything it did, newest first.** | QSME Settings → Connected apps → 'Recent activity — What your connected apps have done, newest first.' (three rows) · caption 'Settings. Connected apps. Everything it did, newest first.' | Two quick signposts like reading a menu path, then the payoff. Out by 94.7. |
| 26-disconnect | 95.1s | 3.5s | **Disconnect, and it loses access immediately.** | Click Disconnect (94.7) → dialog 'It will lose access immediately.' · caption 'Disconnect, and it loses access immediately.' | Calm, final. No drama. Out by 98.9. |
| 27-ch5 | 99.7s | 1.8s | **Five. The small print.** | Chapter card '5 · The small print' / 'Said out loud.' | Chapter marker, a little wry. Out by 101.6. |
| 28-has-not | 102.0s | 4.8s | **If an assistant tells you it has sent, paid or awarded something, it has not.** | Quote card: 'If an assistant tells you it has sent, paid or awarded something, it has not.' · chip 'QSME guide · AI assistants (MCP)' | Small print said out loud: steady, a beat before 'it has not', which lands flat and certain. Out by 106.8. |
| 29-suggestion | 107.2s | 3.6s | **Every draft is a suggestion for a person to check.** | Live qsme.build/platform/estimating card 'Draft with AI, then check', highlighted · caption 'Every draft is a suggestion for a person to check.' | Even, sensible. Out by 110.9. |
| 30-paid-plan | 111.6s | 3.2s | **ChatGPT needs a paid plan with developer mode.** | Small-print card: 'Works with the assistant you already use: Claude, ChatGPT, Claude Code, Codex or Cursor.' · 'ChatGPT needs a paid plan with developer mode.' · 'Your own assistant, on your own account. No partnership implied.' | Terms-and-conditions voice, slightly faster and lower, a wink of 'I know, I know'. Say 'Chat G-P-T'. Out by 114.9. |
| 31-decide | 115.6s | 2.4s | **The assistant drafts. You decide.** | 'The assistant drafts; you decide.' (slams 115.4) · then chips IT DRAFTS / YOU DECIDE build in silence | The line of the video, said simply. Lean on 'you'. Then silence while the chips land. Out by 118.0. |
| 32-demo | 121.3s | 3.6s | **Book a thirty-minute demo on a working project.** | Live qsme.build/contact 'What happens on a demo? Thirty minutes on a working project that resembles yours.' highlighted · caption 'Book a 30-minute demo on a working project.' | Friendly invitation, not a pitch. Kiwi 'thirty' (soft t). Out by 124.9. |
| 33-end | 125.7s | 4.0s | **Q-S-me dot build. What would you let it type first?** | End card: QSME logo · qsme.build · 'Book a 30-minute demo' · 'What would you let it type first? Tell us in the comments.' | Say 'Q-S-me' clearly (kyoo-ess-mee). The question genuinely curious, a light rise. Out by 129.7; the card holds in silence for YouTube end-screen elements. |

`text_v3` is the same words (01 adds one `[sighs]`); use v3 only as one continuous request, never per line.

## One continuous read (for the most natural take; slice in the edit)

```
Asked my AI to push the programme a week.

It can't.

On purpose.

It gets the typing. Not the dates, the money or the subcontractors.

One. What it can see.

What's on my schedule this week, and who's turning up?

It answers from the project's own schedule.

Same crews. Same dates.

It sees what your login sees. Nothing more.

Two. What it can type.

Draft a tender for the façade package, private, closing next Friday.

It drafts it. Then it stops.

It drafts. A person presses send.

Paste in a defects list. It comes back as a sheet.

Your own spreadsheet, inside the project.

Three. What it can never do.

Move money or record a payment.

Send or publish a tender, or accept a bid.

Issue, sign or cancel a contract.

Change the schedule or delete a project.

Not a setting. Those doors just aren't wired up.

No automation and no assistant awards a tender.

So the programme stays where a person put it.

Four. Who did what.

Settings. Connected apps. Everything it did, newest first.

Disconnect, and it loses access immediately.

Five. The small print.

If an assistant tells you it has sent, paid or awarded something, it has not.

Every draft is a suggestion for a person to check.

ChatGPT needs a paid plan with developer mode.

The assistant drafts. You decide.

Book a thirty-minute demo on a working project.

Q-S-me dot build. What would you let it type first?
```

## Silent beats (leave them empty on purpose)

- 1.0 to 3.2 under 01: the reply types (keyboard-free, just a soft UI tick at 1.6)
- 6.0 to 9.4: the cut to the title card (wipe 7.0) and the chapter list build
- 13.35 to 13.9: chapter 1 wipe (13.4)
- 27.0 to 30.6: the four schedule rings finish, then the cut to 'It sees what your login sees.'
- 48.5 to 51.6: the cursor hovers over 'Send Tender Invitations' and never clicks (hold the silence: this is the joke)
- 60.2 to 61.5: chapter 3 wipe (61.0)
- 65.95 to 66.6, 69.25 to 69.9, 71.7 to 72.3, 74.65 to 75.9: each red ✕ stamp lands in silence
- 98.9 to 99.7: chapter 5 wipe (99.2)
- 118.0 to 121.3: the IT DRAFTS / YOU DECIDE chips land in silence
- 129.7 to 132.5: end card holds for YouTube end-screen elements

## Optional founder kicker

Only if the founder approves (render with <html data-kicker="on">): a handwritten caption 'Same rules I had in my first year as a QS.' pops at 77.4 under the never list. It stays unvoiced in this script because line 21 is speaking then; if the founder reads the VO himself, he can swap line 21 for 'Same rules I had in my first year as a QS.' (10 words, max 3.8) and the caption k3b then needs the same text.

## Make it sound recorded, not synthesised

- Pronunciation: QSME is “Q-S-me” (kyoo-ess-mee), qsme.build is “Q-S-me dot build”. Never “kiss me”, never four spelled-out letters. ‘façade’ is fuh-SAHD. ‘ChatGPT’ is ‘Chat G-P-T’. Kiwi ‘can’t’ and ‘thirty’ (soft t).
- Kiwi, not Australian, not American: watch the KIT vowel in ‘it’, ‘list’, ‘sign’ and ‘drafts it’, and keep sentence ends falling (no upspeak except the two real questions, 06 and 33).
- Place lines by eye and ear, not on a grid: treat start_s as a target and nudge a frame or two so the gaps between lines don’t come out identical. Never stretch a take more than about 4%; if it runs past max_s, use another take.
- If the founder records it: one continuous read of continuous_read_v2, three takes, natural pace, then slice at the blank lines and place each piece at its start_s. Keep breaths and small hesitations; never time-stretch more than about 4%.
- If AI (after the ElevenLabs upgrade): python3 tools/make_vo.py projects/2026-10-21-qsme-build-claude-writes-my-tender <voice_id> --takes 3, or render continuous_read_v2 three times and slice. Use request stitching (previous_text/next_text). Pick the least polished take.
- Room tone bed (a real quiet lounge at night on a phone: fridge hum, faint traffic) under the whole 132.5s at about -48 to -50 dBFS so silences never drop to digital zero.
- EQ: high-pass 90 to 100 Hz; -2 dB high shelf above 10 kHz; light de-ess. Compression 2:1 to 3:1, 3 to 4 dB GR. VO about -16 LUFS integrated, -1 dBTP. No reverb.
- Music (see post.md): none under the hook (0 to 7.0); a sparse late-night pulse enters on the title card, sits ~20 dB under the VO, dips on every wipe, drops to almost nothing for the never list (63.6 to 80.0) so the stamps carry it, returns for chapter 4, resolves on one held chord at ~131.5.
- SFX, ducked 10 to 12 dB under any word: soft message-send tick 0.0; three faint 'thinking' pulses 0.4 to 1.15; a dull thud on 'It can't.' 3.25; a hard cut with a tiny room-tone drop at 4.2; whoosh on each wipe (7.0, 13.4, 35.6, 61.0, 88.2, 99.2, 115.0); chat pops 16.25, 38.45, 51.6; trackpad click 94.7; four rubber-stamp thunks 66.0, 69.3, 71.75, 74.7; highlighter swipes 80.6, 107.5, 121.6. No OS- or app-branded sounds.
- Bounce a mono VO stem and mux onto outputs/claude-writes-my-tender-16x9.mp4 with tools/mux as a separate track, so music and SFX stay adjustable.

## Changelog

- 2026-10-02 first version, timed on the rendered 132.5s 16:9 master (outputs/claude-writes-my-tender-16x9.mp4). Captions and VO match word for word. No API was called.
