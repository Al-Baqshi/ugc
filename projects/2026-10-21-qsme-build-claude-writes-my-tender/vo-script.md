# VO script: Kiwi performance

**Character:** The PM in first person: a Kiwi project manager, late 30s, on the couch at 9:40 pm with the week's typing still to do. General urban New Zealand accent (Auckland or Wellington office), not broad, not Australian, never a caricature. Dry, under-played, a bit tired, amused at her own rules for the AI. The script is written gender-neutral, so it suits (best) the founder in his own voice, (default AI read) the cast Global QS voice in tools/voices.json (qsme-build: Arnold, alt James), or a female Kiwi voice (e.g. Jenna, run make_vo.py with that voice id). An AI voice never speaks as the founder and is never captioned as him.

**Model & settings:** `eleven_multilingual_v2` · stability 0.45 · similarity 0.75 · style 0 · speed 1 · speaker boost on

**Video:** `outputs/claude-writes-my-tender-16x9.mp4` (times below are seconds on this file, 130.2s, 16:9)

**Casting line:** “Asked my AI to push the programme a week. It can't. On purpose. Book a thirty-minute demo at Q-S-me dot build.”

**Series rule:** The burned-in captions are the subtitles, so every voiced line matches its on-screen text word for word ('30-minute' is read 'thirty-minute'; QSME is read 'Q-S-me'). Where the hero text IS the line (hook headline, 'It can't.', 'On purpose.', the two typed asks in the chat bubbles, 'It sees what your login sees. Nothing more.', the four never-list lines, the quote card, the small-print line, 'The assistant drafts; you decide.'), there is no separate caption box. Chapter numbers are spoken; labels, chips, chat replies and the 'Illustrative' tag stay unvoiced.

## Lines

| # | Start | Max | Line (v2) | On screen | Delivery |
|---|---|---|---|---|---|
| 01-hook | 0.2s | 3.0s | **Asked my AI to push the programme a week.** | Headline 'Asked my AI to push the programme a week.' (frame 1) · chat: 'Push the programme back a week.' already sent · chip '9:40 pm · Tuesday' | First person, tired, 9:40 at night on the couch. A real Kiwi PM telling a mate, not an announcer. Flat and a bit sheepish, a light lean on 'push', falling at 'a week'. Out by 3.2, before 'It can't.' slams. |
| 02-cant | 3.3s | 0.9s | **It can't.** | 'It can't.' slams in red under the headline (3.25); the assistant's reply 'I can't change the schedule.' is on screen | Dry, almost amused. Two syllables, a small gap before it. Kiwi 'can't' (broad 'ah', never the American 'can't'). Out by 4.2 (the hard cut). |
| 03-purpose | 4.65s | 1.3s | **On purpose.** | Hard cut (4.2) to the QSME schedule, untouched · 'It can't.' (red) 'On purpose.' (green, slams 4.6) | The turn. Warm, quietly pleased, like it was your idea all along. No punchline lift. Out by 5.95 so the cut to the title breathes. |
| 04-title | 8.5s | 4.6s | **It gets the typing. Not the dates, the money or the subcontractors.** | Title card 'What your AI assistant can do in QSME, and the four things it never will.' (no chapter list) · caption 'It gets the typing. Not the dates, the money or the subcontractors.' (8.3 to 14.2) | Matter-of-fact, the house rule. A small beat after 'typing'. The list is three even steps, the last one falling. Out by 13.1 (wipe 14.0). |
| 05-ch1 | 14.4s | 1.7s | **One. What it can see.** | Chapter card '1 · What it can see' / 'Anything your login can see. Nothing else.' (2.2s card) | Chapter marker, unhurried, lower energy than the lines either side. Out by 16.1. |
| 06-ask-schedule | 16.45s | 3.6s | **What's on my schedule this week, and who's turning up?** | Chat bubble: 'What's on my schedule this week, and who's turning up?' (no separate caption box: the bubble is the line) | Read as the question she actually types, conversational, a slight rise on 'turning up?' only. Out by 20.05. |
| 07-answers | 20.3s | 3.0s | **It answers from the project's own schedule.** | The answer: four crews with dates and names (demo data) · caption 'It answers from the project's own schedule.' | Plain, a touch impressed despite herself. Lean on 'own'. Out by 23.3. |
| 08-same | 24.9s | 2.0s | **Same crews. Same dates.** | Split: the answer beside the QSME schedule; the four bars ring green one by one (25.5 to 27.3) · caption 'Same crews. Same dates.' | Two short statements, the second a hair lower. Ticking boxes. Out by 26.9; the rings finish in silence. |
| 09-login | 29.3s | 3.4s | **It sees what your login sees. Nothing more.** | 'It sees what your login sees.' then 'Nothing more.' (green, 30.5) · chips 'read' 'write' + 'Two separate permissions. Read alone can never change anything.' (unvoiced) | Reassuring, firm, not salesy. Full stop after 'sees'. 'Nothing more' quieter and final. Out by 32.7. |
| 10-ch2 | 34.6s | 1.7s | **Two. What it can type.** | Chapter card '2 · What it can type' / 'Drafts and sheets. Never the send button.' (2.2s card) | Chapter marker, same shape as 05. Out by 36.3. |
| 11-ask-tender | 36.65s | 4.0s | **Draft a tender for the façade package, private, closing next Friday.** | Chat bubble: 'Draft a tender for the façade package, private, closing next Friday.' (no separate caption box: the bubble is the line) | Instruction voice, a PM rattling off a job: brisk, clipped commas, 'façade' said fuh-SAHD. Out by 40.65. |
| 12-stops | 41.0s | 1.9s | **It drafts it. Then it stops.** | The reply: 'Done. "Façade package" is saved as a draft…' and, bold with a green highlighter (40.25), 'It isn't published and nobody has been invited.' · caption 'It drafts it. Then it stops.' | Dry observation, a tiny smile on 'stops'. Out by 42.9. |
| 13-send | 43.7s | 3.0s | **It drafts. A person presses send.** | QSME tender draft (Draft · Private · Closes Fri 30 Oct); the cursor reaches 'Send Tender Invitations' (hover, hand), pulls back, comes back and waits; it never clicks · caption 'It drafts. A person presses send.' | The thesis line, but said like common sense. Even weight, lean on 'person'. Out by 46.7; the cursor waits in silence after. |
| 14-defects | 48.6s | 4.3s | **Paste in a defects list. It comes back as a sheet.** | Chat: a pasted defects list (six lines) + 'Put it in QSME as a sheet.' · caption 'Paste in a defects list. It comes back as a sheet.' | Light, practical, the tiny win of the evening. Out by 52.9. |
| 15-sheet | 53.4s | 3.5s | **Your own spreadsheet, inside the project.** | QSME sheet 'Defects, level 3' fills row by row · caption 'Your own spreadsheet, inside the project.' | Satisfied, unhurried. Out by 56.9, before the wipe at 57.9. |
| 16-ch3 | 58.3s | 2.0s | **Three. What it can never do.** | Chapter card '3 · What it can never do' (red numeral) / 'QSME's own list, word for word.' (2.2s card) | Slightly slower and lower than the other chapter markers: this is the one that matters. It may run a beat into the list heading. Out by 60.3. |
| 17-never-money | 60.7s | 2.2s | **Move money or record a payment.** | 'What it can never do' + line 1 types: 'Move money or record a payment' · red ✕ stamps at 62.5 | Reading a rule off the wall. Flat, deliberate, a full stop. Out by 62.45 so the stamp lands clean. |
| 18-never-tender | 63.1s | 3.1s | **Send or publish a tender, or accept a bid.** | Line 2: 'Send or publish a tender, or accept a bid' · stamp 65.8 | Same flat delivery, no list-sing (don't rise on 'tender'). Out by 65.75. |
| 19-never-contract | 66.4s | 2.2s | **Issue, sign or cancel a contract.** | Line 3: 'Issue, sign or cancel a contract' · stamp 68.25 | Same. Each verb distinct but quick. Out by 68.2. |
| 20-never-schedule | 68.8s | 3.0s | **Change the schedule or delete a project.** | Line 4: 'Change the schedule or delete a project' · stamp 71.2 | Last of four, the faintest knowing lean on 'schedule' (the hook). Falling end. Out by 71.15. |
| 21-not-wired | 72.4s | 3.8s | **Not a setting. Those doors just aren't wired up.** | The list dims · caption 'Not a setting. Those doors just aren't wired up.' | Conversational, explaining to a sceptical commercial manager. 'Not a setting' quick, then a beat, then the rest relaxed. Out by 76.2. |
| 22-award | 76.8s | 3.8s | **No automation and no assistant awards a tender.** | Live qsme.build/platform/tendering card 'Award is a person's decision', 'No automation and no assistant awards a tender.' highlighted (text goes near-white) · caption the same | Quoting their own website, deadpan, almost reading it aloud. Out by 80.6. |
| 23-programme | 81.2s | 3.5s | **So the programme stays where a person put it.** | Callback: the same untouched schedule + the hook's reply bubble 'I can't change the schedule.' · caption 'So the programme stays where a person put it.' | Callback, a small smile in the voice. Out by 84.7 (wipe 84.7). |
| 24-ch4 | 85.1s | 1.7s | **Four. Who did what.** | Chapter card '4 · Who did what' / 'A list of what it did. And an off switch.' (2.2s card) | Chapter marker. Out by 86.8. |
| 25-activity | 87.2s | 3.5s | **Settings. Connected apps. What it did, newest first.** | QSME Settings → Connected apps → 'Recent activity — What your connected apps have done, newest first.' (three rows) · caption 'Settings. Connected apps. What it did, newest first.' | Two quick signposts like reading a menu path, then the payoff. Out by 90.7. |
| 26-disconnect | 91.2s | 3.5s | **Disconnect, and it loses access immediately.** | Click Disconnect (90.8) → dialog 'It will lose access immediately.' · caption 'Disconnect, and it loses access immediately.' | Calm, final. No drama. Out by 94.7. |
| 27-ch5 | 95.7s | 1.7s | **Five. The small print.** | Chapter card '5 · The small print' / 'Not hidden in a footer.' (2.2s card) | Chapter marker, a little wry. Out by 97.4. |
| 28-has-not | 97.7s | 4.8s | **If an assistant tells you it has sent, paid or awarded something, it has not.** | Quote card: 'If an assistant tells you it has sent, paid or awarded something, it has not.' · chip 'QSME guide · AI assistants (MCP)' | Small print said out loud: steady, a beat before 'it has not', which lands flat and certain. Out by 102.5. |
| 29-suggestion | 102.9s | 3.6s | **Every draft is a suggestion for a person to check.** | Live qsme.build/platform/estimating card 'Draft with AI, then check', highlighted (text goes near-white) · caption 'Every draft is a suggestion for a person to check.' | Even, sensible. Out by 106.5. |
| 30-paid-plan | 107.3s | 3.2s | **ChatGPT needs a paid plan with developer mode.** | Small-print card (6s): 'Works with Claude, ChatGPT, Claude Code, Codex or Cursor.' · 'ChatGPT needs a paid plan with developer mode.' · 'Your own assistant, on your own account. No partnership implied.' (from 108.1) | Terms-and-conditions voice, slightly faster and lower, a wink of 'I know, I know'. Say 'Chat G-P-T'. Out by 110.5. |
| 31-decide | 113.3s | 2.4s | **The assistant drafts. You decide.** | 'The assistant drafts; you decide.' (slams 113.1) · then chips IT DRAFTS / YOU DECIDE build in silence (114.7, 116.0) | The line of the video, said simply. Lean on 'you'. Then silence while the chips land. Out by 115.7. |
| 32-thirty | 119.0s | 3.6s | **Thirty minutes, on a working project like yours.** | Live qsme.build/contact 'What happens on a demo? Thirty minutes on a working project that resembles yours.' highlighted · caption 'Thirty minutes, on a working project like yours.' | Plain and friendly, like describing the visit to a mate. Kiwi 'thirty' (soft t). Small comma pause after 'minutes'. Out by 122.6. |
| 33-cta | 123.3s | 5.9s | **Book a thirty-minute demo at Q-S-me dot build. What would you let it type first?** | End card: QSME logo · 'Book a 30-minute demo' / 'at qsme.build' · 'What would you let it type first? Tell us in the comments.' | The CTA as an invitation, not a pitch: say 'Q-S-me dot build' clearly (kyoo-ess-mee dot build). Breath, then the question, genuinely curious with a light rise. Out by 129.2; the card holds a beat for YouTube end-screen elements. |

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

Settings. Connected apps. What it did, newest first.

Disconnect, and it loses access immediately.

Five. The small print.

If an assistant tells you it has sent, paid or awarded something, it has not.

Every draft is a suggestion for a person to check.

ChatGPT needs a paid plan with developer mode.

The assistant drafts. You decide.

Thirty minutes, on a working project like yours.

Book a thirty-minute demo at Q-S-me dot build. What would you let it type first?
```

## Silent beats (leave them empty on purpose)

- 1.0 to 3.2 under 01: the reply types (no keyboard clatter, just a soft UI tick at 1.6)
- 5.95 to 8.5: the cut to the title card (wipe 7.0)
- 13.1 to 14.4: chapter 1 wipe (14.0)
- 26.9 to 29.3: the four schedule rings finish, then the cut to 'It sees what your login sees.'
- 46.7 to 48.6: the cursor waits by 'Send Tender Invitations' after its hesitation and never clicks (hold the silence: this is the joke)
- 56.9 to 58.3: chapter 3 wipe (57.9)
- 62.45 to 63.1, 65.75 to 66.4, 68.2 to 68.8, 71.15 to 72.4: each red ✕ stamp lands in silence
- 94.7 to 95.7: chapter 5 wipe (95.3)
- 115.7 to 119.0: the IT DRAFTS / YOU DECIDE chips land in silence
- 129.2 to 130.2: end card holds for YouTube end-screen elements

## Optional founder kicker

Only if the founder approves (render with <html data-kicker="on">): a handwritten caption 'Same rules I had in my first year as a QS.' pops at 73.9 under the never list. It stays unvoiced in this script because line 21 is speaking then; if the founder reads the VO himself, he can swap line 21 for 'Same rules I had in my first year as a QS.' (10 words, max 3.8) and the caption k3b then needs the same text.

## Make it sound recorded, not synthesised

- Pronunciation: QSME is “Q-S-me” (kyoo-ess-mee), qsme.build is “Q-S-me dot build”. Never “kiss me”, never four spelled-out letters. ‘façade’ is fuh-SAHD. ‘ChatGPT’ is ‘Chat G-P-T’. Kiwi ‘can’t’ and ‘thirty’ (soft t).
- Kiwi, not Australian, not American: watch the KIT vowel in ‘it’, ‘list’, ‘sign’ and ‘drafts it’, and keep sentence ends falling (no upspeak except the two real questions, 06 and 33).
- Place lines by eye and ear, not on a grid: treat start_s as a target and nudge a frame or two so the gaps between lines don’t come out identical. Never stretch a take more than about 4%; if it runs past max_s, use another take.
- If the founder records it: one continuous read of continuous_read_v2, three takes, natural pace, then slice at the blank lines and place each piece at its start_s. Keep breaths and small hesitations; never time-stretch more than about 4%.
- If AI (after the ElevenLabs upgrade): python3 tools/make_vo.py projects/2026-10-21-qsme-build-claude-writes-my-tender <voice_id> --takes 3, or render continuous_read_v2 three times and slice. Use request stitching (previous_text/next_text). Pick the least polished take.
- Room tone bed (a real quiet lounge at night on a phone: fridge hum, faint traffic) under the whole 130.2s at about -48 to -50 dBFS so silences never drop to digital zero.
- EQ: high-pass 90 to 100 Hz; -2 dB high shelf above 10 kHz; light de-ess. Compression 2:1 to 3:1, 3 to 4 dB GR. VO about -16 LUFS integrated, -1 dBTP. No reverb.
- Music (see post.md): none under the hook (0 to 7.0); a sparse late-night pulse enters on the title card, sits ~20 dB under the VO, dips on every wipe, drops to almost nothing for the never list (60.1 to 76.5) so the stamps carry it, returns for chapter 4, resolves on one held chord at ~131.5.
- SFX, ducked 10 to 12 dB under any word: soft message-send tick 0.0; three faint 'thinking' pulses 0.4 to 1.15; a dull thud on 'It can't.' 3.25; a hard cut with a tiny room-tone drop at 4.2; whoosh on each wipe (7.0, 14.0, 34.2, 57.9, 84.7, 95.3, 112.7); chat pops 16.45, 36.65, 48.5; a soft marker squeak 40.25 (the highlighter in the chat); trackpad click 90.8; four rubber-stamp thunks 62.5, 65.8, 68.25, 71.2; highlighter swipes 77.1, 103.2, 119.3. No OS- or app-branded sounds.
- Bounce a mono VO stem and mux onto outputs/claude-writes-my-tender-16x9.mp4 with tools/mux as a separate track, so music and SFX stay adjustable.

## Changelog

- 2026-10-02 first version, timed on the rendered 132.5s 16:9 master (outputs/claude-writes-my-tender-16x9.mp4). Captions and VO match word for word. No API was called.
- 2026-10-04 resume pass: owner CTA rule (2026-10-03) applied. The end card and line 33 now carry the exact Global CTA 'Book a 30-minute demo at qsme.build' ('Book a thirty-minute demo at Q-S-me dot build.'); line 32 over the live /contact crop becomes 'Thirty minutes, on a working project like yours.' so the CTA isn't said twice. The tendering card crop no longer shows its second sentence ('without an account'). Re-rendered the 132.5s master; all other timings unchanged. No API was called.
- 2026-10-04 review pass (130.2s): caption and line 25 now use the product's own wording ('What it did, newest first', not 'Everything it did'); chapter cards trimmed to 2.2s (lines 05/10/16/24/27 retimed), the split screen -1.6s, the Send-button beat -1.7s, title +0.6s (caption from 8.3, line 04 from 8.5), small-print card +2.0s; every later line moved with its beat. Lines 06 and 11 lose their caption boxes (the chat bubble is the line). Hook chip '9:40 pm · Tuesday'. No API was called.
