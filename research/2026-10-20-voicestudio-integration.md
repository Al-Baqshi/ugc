# VoiceStudio inside CreativeUGC: can the voice side be all-in-one?

Owner question (2026-10-20): "Can you leverage VoiceStudio (/Users/brave/Dev/VoiceStudio) inside my UGC creative platform? Put it all together as one solution, CreativeUGC with voice mechanisms? I can get inspired by these guys."

Short answer: **yes, as a second voice provider behind the tools we already have, not as a replacement for the folder or the Studio.** CreativeUGC is already the "one solution" (ideas → scripts → motion → voice → mux → Studio). VoiceStudio slots in at the voice step, next to ElevenLabs, and gives us three things we don't have today: local voice cloning (the owner's own voice), unlimited takes with no character budget, and local speech-to-text with word timestamps. The one hard limit is licensing: VoiceStudio's default model is non-commercial, so QSME ads would need a different engine inside it (details below).

Assessed from the public repo https://github.com/debpalash/VoiceStudio (AGPL-3.0, Electron desktop app + Python backend, docs read 2026-10-20). The owner's local clone wasn't reachable from the cloud session; if it's a fork with changes, this note needs a second pass.

## What VoiceStudio is (the parts that matter to us)

| Capability | What it does | Fit for CreativeUGC |
|---|---|---|
| Voice cloning | Zero-shot clone from a 3–10 s clean reference clip; a transcript of the clip improves it | **The founder's own voice** for the F-series and QSME NZ: ownable, no library-voice removal risk, no "is it AI?" question. Already the "most natural option" in `projects/2026-10-02-qsme-voice-casting/post.md`. |
| Voice design | Describe a voice (gender, age, pitch, style, accent) | Accents offered: American, British, Australian, Canadian, Indian. **No New Zealand accent.** Kiwi voices must come from cloning a consenting Kiwi. |
| Local API | OpenAI-compatible `POST :3900/v1/audio/speech` (text → mp3/wav, `speed`, `seed`, `duration` target, `[pause 500ms]` tags) and `POST :3900/v1/audio/transcriptions` (WhisperX, word timestamps ±10–30 ms) | Drop-in for `tools/el.py tts` / `stt`. The word timestamps feed `tools/cue_take.py times` unchanged. |
| MCP server | Mounted at `:3900/mcp/`: `generate_speech`, `clone_voice`, `design_voice`, `transcribe`, `list_voices`; per-agent voice binding by client id | Add it to this repo's `.mcp.json` so a Claude Code session on the Mac can voice a take without the Python helpers. |
| Dubbing | Transcribe → translate → per-segment timed speech → "Smart Fit" (retime picture to speech) → mix/export | Exactly the audio-first standard (picture follows audio). Useful for BQ-series AR/ES versions; but it's built for dubbing an existing video, not our silent motion masters. |
| Batch queue, watch folders, projects library, cue-sheet export, consent-locked profiles, AI watermark | Product features | Ideas to borrow (see "Inspired by these guys"). |
| Runs on | Apple Silicon Mac (Metal), NVIDIA/AMD Linux/Windows, CPU fallback (slow). Docker is amd64 only. **Intel Mac: UI only, no local backend.** | Runs on the owner's Mac next to the Swift tools (which already require macOS). Cannot run in the Railway Studio (no GPU, amd64 CPU, ~5 GB torch). |

## What it does NOT give us (today)

1. **Word timestamps from the TTS call.** ElevenLabs `/with-timestamps` returns character timings with the audio; VoiceStudio's speech endpoint returns audio only. The workaround is one extra local call: transcribe the take with `word_timestamps` (WhisperX) and feed `cue_take.py times`. Same shape as `words.json` today. Cost: a few seconds per take on an M-series Mac.
2. **ElevenLabs v3 tags.** `[sighs]`, `[excited]`, `[whispers]` are NOT understood; unknown tags are spoken as text. VoiceStudio's default engine knows `[pause …]`, `[laughter]`, `[sigh]`; emotion control exists only on opt-in engines (IndexTTS2, CosyVoice 3). Our `text_v3` lines need a tag map or a `text_tts` override per provider.
3. **A Kiwi accent by description.** Only by cloning.
4. **A commercial default model.** See next section.

## Licensing (the part that decides the QSME use)

- **The app** is AGPL-3.0: free for internal and commercial use. The copyleft only bites if we modify VoiceStudio and offer the modified version to others over a network. Running it on the owner's Mac for our own production = no obligation. Embedding it inside the Railway Studio for other people would trigger it (and the Studio can't host it anyway).
- **The default model (k2-fsa/OmniVoice)** weights are **CC-BY-NC**: VoiceStudio's own licence inventory (`backend/config/model_licenses.json`) marks it `commercial_use: false`, `commercial_inference: restricted`. **Not usable for QSME ads or any paid placement.** Fine for scratch takes, timing rehearsals and the owner's internal review.
- **Engines with permissive weights** inside VoiceStudio: CosyVoice 3 (Apache-2.0, cloning + `[breath]` + instruct), VoxCPM2 (Apache-2.0, voice design), MOSS-TTS v1.5 / Nano (Apache-2.0), Kokoro and Qwen3-TTS via MLX-Audio (Apache-2.0), dots.tts, Confucius4-TTS (Apache-2.0), GPT-SoVITS (MIT). VoiceStudio flags all of these as "unreviewed", not as forbidden: Apache-2.0/MIT weights are normally fine for commercial output, but **we check each model card ourselves before a paid ad** and record it in this file.
- **Voice consent**: clone only the owner or someone who has agreed on record. VoiceStudio has a consent-phrase flow and a profile lock; use it. Library-voice clones from ElevenLabs stay on ElevenLabs.

Owner decision needed: upgrade ElevenLabs (paid plan, commercial licence, v3 tags, timestamps built in) **and/or** adopt VoiceStudio with a permissive engine for the founder's cloned voice. They are not exclusive: the sensible split is ElevenLabs for library Kiwi voices (Cam S, John) and VoiceStudio for the owner's own voice and for unlimited rehearsal takes.

## How it plugs in (one provider switch, no rewrite)

The pipeline stays: `vo-script.json` → one take → word timings → `cue_take.py` → re-timed motion page → `tools/mux`. Only the box that makes the take changes.

1. **`tools/vs.py`**: a sibling of `tools/el.py` with the same commands (`voices`, `tts`, `stt`, `clone`) against `http://127.0.0.1:3900` (`VOICESTUDIO_URL` in `.env`, bearer key only if the backend is shared). `stt` asks for word timestamps and writes `words.json` in the shape `cue_take.py` already reads.
2. **`tools/voices.json`** gets a `provider` field per venture entry (`elevenlabs` | `voicestudio`) and, for VoiceStudio, the `profile_id` and `engine`. Example: `"founder": {"provider": "voicestudio", "profile_id": "...", "engine": "cosyvoice", "note": "owner's own voice, consent recorded …"}`.
3. **`tools/vo_take.py` / `tools/make_vo.py` / `tools/cue_take.py`** call `provider.tts(...)` and `provider.words(...)` instead of `el.call(...)` directly. For ElevenLabs, `words` comes from `/with-timestamps` as today; for VoiceStudio, from the local transcription. Everything downstream (`tempo`, `bedfit`, `voicenorm`, `splice_para`, `fix_cta`, `mux`) is audio-in audio-out and doesn't care.
4. **Pronunciation map**: `PRON` in `make_vo.py` ("Queue Ess Mee", "dot Co dot N Z") is provider-specific; keep one map per provider and re-test "QSME" / "qsme.co.nz" / "Bakshi" on the chosen engine with the STT check before trusting it.
5. **`.mcp.json`** in this repo: VoiceStudio's exported Claude Code entry, so a session on the Mac can generate, clone and transcribe without the scripts. Set `OMNIVOICE_MCP_OUTPUT_MODE=files` and `OMNIVOICE_MCP_BASE_PATH=/Users/brave/CreativeUGC` so renders land in project folders instead of the chat.
6. **Studio** stays read-only and keeps showing `vo-script`, takes and STT reports. If a Voice page is wanted, it lists voices from `tools/voices.json` (provider, consent, last used, projects) and plays the sample per voice; generation itself stays on the Mac because the Railway service has no GPU and no model weights.
7. **Owner's own voice, step by step**: record 30–60 s on the phone in a quiet room (plain talk, no music) → `outputs/vo/incoming/founder-ref.m4a` → `python3 tools/vs.py clone founder outputs/vo/incoming/founder-ref.m4a` → record the consent phrase in VoiceStudio → pilot on one NZ video (N-series) → owner listens → if approved, `founder` becomes the NZ default in `voices.json`.

Effort: provider layer + `vs.py` + `.mcp.json` ≈ one session; founder clone pilot ≈ half a session plus the owner's ears. No change to the motion kit, Studio or backup.

## Inspired by these guys (product ideas worth copying into CreativeUGC)

- **Consent-locked voice profiles**: a `consent:` field in `voices.json` (who, date, where the recording is) and refuse to generate a paid ad on a voice without it. Matches our "AI people must not imitate real, identifiable people" rule.
- **Watch folder**: anything dropped in `outputs/vo/incoming/<project>/` is voiced/muxed automatically (we have the folder; VoiceStudio shows the pattern).
- **Recipes**: a named bundle of voice + engine + stability/style + bed + gains, so "QSME NZ standard" or "Baqshi mission" is one word, not six flags.
- **Projects library with search**: every take, its transcript check and its export in one list. Our Studio `/videos` page is halfway there; add takes and STT verdicts.
- **Cue-sheet export**: a `HH:MM:SS<TAB>Title` file per video for YouTube chapters and show notes, straight from `cues.json`.
- **Local-first API + MCP**: one backend, many clients (scripts, Studio, agents). Our `tools/` already behave like this; the provider layer above makes it explicit.
- **Honest licence inventory**: they ship a machine-readable model-licence file with evidence links. Keep a `research/voices-licences.md` with the same discipline for every voice and engine we use in ads.

## Verdict

Do it, in this order: (1) provider layer + `vs.py` (ElevenLabs unchanged), (2) owner's own voice pilot on one NZ video with a permissive engine, (3) MCP entry, (4) Studio Voice page if still wanted. Keep ElevenLabs for library Kiwi voices until a cloned voice wins by ear. Nothing from VoiceStudio's default model goes in a paid ad.

Open for the owner: Is the Mac Apple Silicon (M1 or later)? Which do you want first: the founder clone, or unlimited rehearsal takes? Is the local clone of VoiceStudio the upstream project or a fork with your own changes?
