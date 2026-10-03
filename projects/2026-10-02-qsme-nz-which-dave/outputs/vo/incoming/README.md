# Drop your VO files here

Voice: **Jenna (or Ellie)** from the ElevenLabs Voice Library (search "New Zealand"), reading as Mel.
In the ElevenLabs website (works on the free plan): Text to Speech → pick the voice → model **Eleven Multilingual v2** → stability ~45%, similarity ~75%, style 0, speed 1.0.
Paste ONE line at a time, generate, download, and save it here with the exact file name below (mp3, m4a or wav all work).
Or record yourself on your phone (Voice Memos) — one file per line, same names. A real Kiwi voice beats any AI.

| Save as | Say this | Must fit in |
|---|---|---|
| `vo01-deck-roof.mp3` | Deck Dave. Roof Dave. | 1.35s |
| `vo02-big-little.mp3` | Big Dave. Little Dave. | 1.75s |
| `vo03-or-post.mp3` | Or just post the actual job. | 2.25s |
| `vo04-same-job.mp3` | Tradies quote on the same job. | 2.15s |
| `vo05-one-table.mp3` | Every quote's in one table, GST both ways. | 2.7s |
| `vo06-cta.mp3` | Put the job up on Q-S-me (say: Cue Ess Me). It's free to join. | 3.5s |

Then tell Claude "VO files are in" — it runs:

```bash
python3 tools/make_vo.py projects/2026-10-02-qsme-nz-which-dave --files projects/2026-10-02-qsme-nz-which-dave/outputs/vo/incoming
```

⚠️ Free-plan ElevenLabs audio has no commercial licence: fine for reviewing the cut, not for posting a QSME ad. A phone recording of your own voice has no such limit.
