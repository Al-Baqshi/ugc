# Tool routing

Tools change fast. Treat this as a starting map, verify current features/pricing with the vendor docs before relying on them, and update this file with what we actually find in testing.

| Need | Try first | Notes |
|---|---|---|
| Consistent character image / key frames | Gemini image (Nano Banana), Higgsfield | Lock one reference image per character and reuse it |
| Talking person / lip-sync UGC | Higgsfield | Check how natural the mouth and hands look |
| Cinematic or motion shots, B-roll | Runway, Gemini Veo | Prompt against "cinematic" if we want phone-real |
| Voiceover / character voice | ElevenLabs | Pick a voice per recurring character and note its ID in the venture file |
| Sound effects / music | ElevenLabs SFX, royalty-free libraries | Keep it quiet under dialogue |
| Script, ideas, captions | Claude (here) | |
| Final edit, captions, pacing | CapCut / editor of choice | |

## Prompt habits for "real UGC" look
- "shot on iPhone front camera, handheld, slight shake, natural window light, casual home setting"
- "unedited, candid, not cinematic, no color grade, no studio lighting"
- Describe the person's energy and imperfections, not just appearance.

## Keys
Put keys in `.env` (see `.env.example`). Never print them. Ask before any call that costs money.

## Test log
Record each tool test here: date, tool, what we tried, result, verdict.

| Date | Tool | Test | Result | Verdict |
|---|---|---|---|---|
| 2026-10-02 | Figma MCP | Building posts via use_figma | Starter plan = **20 MCP tool calls / month** (Professional Full seat = 200/day); Starter files max 3 pages | Upgrade a team before big Figma builds; batch work into few calls |
| 2026-10-02 | Local motion render | HTML timeline → headless Chrome frames → AVFoundation H.264 | Two clean MP4s (27.5s 9:16, 28s 4:5), no paid tools | ✅ Default for kinetic-type / UI-mock video when Figma is capped |
| 2026-10-02 | ElevenLabs free | Library voice via API | 402 "Free users cannot use library voices via the API"; no commercial licence; 10k chars/month | Need a paid plan (Starter) for real NZ voices and ads |
| 2026-10-02 | ElevenLabs library | Search accent=new zealand | ~45 NZ voices, many professional clones of real Kiwis; check `verified_languages` ("Kim" is actually Czech) and notice_period | ✅ Best route to natural Kiwi voices |
| 2026-10-20 | VoiceStudio (local, open source) | Read the public repo for a second voice provider | Local API `:3900/v1/audio/speech` + `/v1/audio/transcriptions` (WhisperX word timestamps) + MCP; cloning from 3–10 s; no NZ accent by design; default model CC-BY-NC (non-commercial); needs Apple Silicon | ✅ Add as provider next to ElevenLabs for the owner's own voice + rehearsal takes; permissive engine only for ads. See research/2026-10-20-voicestudio-integration.md |
