# Drop your VO files here

Voice: **Arnold (or James)** from the ElevenLabs Voice Library (search "New Zealand"), reading as the QS.
In the ElevenLabs website (works on the free plan): Text to Speech → pick the voice → model **Eleven Multilingual v2** → stability ~45%, similarity ~75%, style 0, speed 1.0.
Paste ONE line at a time, generate, download, and save it here with the exact file name below (mp3, m4a or wav all work).
Or record yourself on your phone (Voice Memos) — one file per line, same names. A real Kiwi voice beats any AI.

| Save as | Say this | Must fit in |
|---|---|---|
| `01-hook.mp3` | Six bids. Six formats. | 2.2s |
| `02-bid-a-pdf.mp3` | One's a PDF. Sideways. | 1.7s |
| `03-bid-b-merged.mp3` | One's a spreadsheet. All merged. | 1.6s |
| `04-bid-c-as-discussed.mp3` | One says "as discussed." | 1.45s |
| `05-bid-d-price-below.mp3` | One says "price below"... there's nothing below. | 2.55s |
| `06-bid-e-page-nine.mp3` | One's the cheapest, till page nine. | 2.35s |
| `07-bid-f-whiteboard.mp3` | And one's... a photo of a whiteboard. | 2.15s |
| `08-twist-honestly.mp3` | Honestly? Most complete one. | 1.5s |
| `09-self-own.mp3` | In fairness... mine said "drawings attached, please price." | 2.55s |
| `10-product-same-lines.mp3` | Same lines for every bidder. | 1.75s |
| `11-product-one-table.mp3` | Six bids. One table. | 1.5s |
| `12-cta.mp3` | Book a demo at Q-S-me (say: Cue Ess Me) dot build. | 2.3s |

Then tell Claude "VO files are in" — it runs:

```bash
python3 tools/make_vo.py projects/2026-10-02-qsme-build-six-bids-six-formats --files projects/2026-10-02-qsme-build-six-bids-six-formats/outputs/vo/incoming
```

⚠️ Free-plan ElevenLabs audio has no commercial licence: fine for reviewing the cut, not for posting a QSME ad. A phone recording of your own voice has no such limit.
