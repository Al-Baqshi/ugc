# vo-script.json — the voice-ready contract

Every project that has a video keeps `vo-script.json` (machine) + `vo-script.md` (human) next to `post.md`.

```json
{
  "venture": "qsme-nz",
  "video": "outputs/<name>.mp4",            // the silent master the VO is laid onto (path relative to the project)
  "character": "who is speaking and how",
  "settings": { "model": "eleven_multilingual_v2", "stability": 0.45, "similarity_boost": 0.75, "style": 0, "speed": 1, "use_speaker_boost": true },
  "lines": [
    { "id": "vo01-hook", "start_s": 0.2, "max_s": 2.0, "on_screen": "caption visible then",
      "text_v2": "Plain text for multilingual v2. QSME is written Q-S-me.", "text_v3": "[sighs] Same words for v3, max 1–2 tags.",
      "delivery": "one-line direction",
      "text_tts": "optional: what the voice should actually read when the written line misrenders (e.g. \"Tee. Tender.\", \"Bee. Bids.\")" }
  ],
  "male_alt_lines": []                       // optional A/B read, same shape
}
```

Rules: natural Kiwi speech (contractions, dry understatement, no announcer lift, no exclamation marks); ~2.5 words/s, so a line must fit `max_s`; start when its caption appears; silence is a choice (leave beats empty on purpose). QSME = "Q-S-me" in scripts; the tool speaks it as "Queue Ess Mee" (tested: that is what ElevenLabs renders as "QSME"); qsme.co.nz = "Q-S-me dot co dot en zed"; qsme.build = "Q-S-me dot build".

Check every project: `python3 tools/vo_status.py` · Voice everything after the ElevenLabs upgrade: `python3 tools/make_vo.py --all`
