export const meta = {
  name: 'kiwi-vo-scripts',
  description: 'Write natural Kiwi VO performance scripts timed to the two existing MP4s, critique for AI/ad-read tells, revise',
  phases: [
    { title: 'Write', detail: 'one writer per venture: line texts for v2 and v3, start times on the MP4 timeline' },
    { title: 'Critique', detail: 'Kiwi naturalness + AI-tell + timing critic' },
    { title: 'Revise', detail: 'final performance scripts' },
  ],
}
const ROOT = '/Users/brave/CreativeUGC'
const V = [
  { key: 'nz', folder: '2026-10-02-qsme-nz-which-dave', mp4: 'outputs/which-dave-reel-body-9x16.mp4 (27.5s, starts at reel t=2.5s; the 0–2.5s hook is filmed separately)', timeline: `${ROOT}/projects/2026-10-02-qsme-nz-which-dave/motion/timeline.js (and motion/reel-body.html)`, who: 'Mel: everyday NZ woman, late 30s, renovating her first place, dry and slightly worn down but amused — the straight man. Plus ONE optional male Kiwi alternative read of the same lines (a relaxed everyday Kiwi bloke) for A/B.' },
  { key: 'build', folder: '2026-10-02-qsme-build-six-bids-six-formats', mp4: 'outputs/six-bids-linkedin-4x5.mp4 (28.0s, 4:5 kinetic text version)', timeline: `${ROOT}/projects/2026-10-02-qsme-build-six-bids-six-formats/motion-src/04-motion.figma.js (keyframe times) — also the keyframe summary in post.md / the MP4 itself`, who: 'The QS: a mid-career Kiwi quantity surveyor (late 30s–40s), calm, dry, deadpan, amused rather than angry, quietly on the subbies\' side. The user asked for Kiwi style on BOTH brands, so this is a natural NZ accent, not neutral international.' },
]
const LINE = { type: 'object', properties: {
  id: { type: 'string' }, start_s: { type: 'number', description: 'start time on the EXISTING MP4 timeline (seconds from 0 of that file)' }, max_s: { type: 'number', description: 'max duration before the next caption/beat' },
  on_screen: { type: 'string', description: 'the caption visible at that moment, so VO and caption match' },
  text_v2: { type: 'string', description: 'text for eleven_multilingual_v2: no tags; pauses via punctuation, ellipses, line breaks; QSME written Q-S-me' },
  text_v3: { type: 'string', description: 'text for eleven_v3: same words, with at most one or two audio tags like [sighs] [dry] [short pause] [chuckles softly]' },
  delivery: { type: 'string', description: 'one-line direction for the take' } },
  required: ['id', 'start_s', 'max_s', 'on_screen', 'text_v2', 'text_v3', 'delivery'] }
const SCRIPT = { type: 'object', properties: {
  venture: { type: 'string' }, character: { type: 'string' },
  continuous_read_v2: { type: 'string', description: 'all lines as ONE continuous read for a natural take (to slice in the edit), with pauses marked by punctuation/line breaks' },
  lines: { type: 'array', items: LINE },
  male_alt_lines: { type: 'array', items: LINE, description: 'NZ only: the same lines adjusted for the male alternative read; empty for build' },
  casting_line: { type: 'string', description: 'one ~80-character line that best exposes Kiwi vowels and natural delivery for casting this character' },
  settings: { type: 'object', properties: { model: { type: 'string' }, stability: { type: 'number' }, similarity_boost: { type: 'number' }, style: { type: 'number' }, speed: { type: 'number' }, use_speaker_boost: { type: 'boolean' } }, required: ['model', 'stability', 'similarity_boost', 'style', 'speed', 'use_speaker_boost'] },
  post_processing: { type: 'array', items: { type: 'string' }, description: 'edit-side tricks so it sounds recorded on a phone, not synthesised' },
  total_characters: { type: 'integer' }, changelog: { type: 'array', items: { type: 'string' } } },
  required: ['venture', 'character', 'continuous_read_v2', 'lines', 'male_alt_lines', 'casting_line', 'settings', 'post_processing', 'total_characters'] }
const CRIT = { type: 'object', properties: { issues: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['must-fix', 'should-fix', 'nice'] }, line_id: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['severity', 'line_id', 'problem', 'fix'] } }, summary: { type: 'string' } }, required: ['issues', 'summary'] }

const write = (v) => `You are a voice director who has cast hundreds of New Zealand radio and social ads. Write the ElevenLabs performance script for the VO of an existing silent video. Do NOT call ElevenLabs or any API, do NOT write files — return the script only.
Read: ${ROOT}/projects/${v.folder}/post.md (Voice, Music, Reel sections, Production status), post.json (reel.beats vo lines + voice direction), ${ROOT}/ventures/${v.key === 'nz' ? 'qsme-nz' : 'qsme-build'}.md (Voice section: pronunciation "Cue Ess Me" → write "Q-S-me"; qsme.build → "Q-S-me dot build"; qsme.co.nz → "Q-S-me dot co dot en zed").
The VO must sit on THIS existing video: ${ROOT}/projects/${v.folder}/${v.mp4}. Get the exact caption timings from ${v.timeline}. Every VO line must start when its caption appears (or a beat before) and finish before the next caption; at ~2.5 words/sec, cut words rather than rush. Lines the script marks as "no VO / silence / the ding is the punchline" stay silent.
Character: ${v.who}
Goal from the user: "Kiwi style, very natural, doesn't sound like AI." That means: written for the mouth (contractions, the odd "eh"/"yeah" only where a real Kiwi would — never as decoration), dry understatement, flat deadpan where the joke needs it, no announcer lift on the product lines, no exclamation marks, no US spellings or Aussie-isms ("mate" sparingly at most, never "G'day", never "sweet as bro"), short sentences, punctuation that forces real breaths and pauses. Don't change the jokes or claims; you may trim words for timing and naturalness.
Settings: recommend for professional-clone (real person) voices on eleven_multilingual_v2 (accent fidelity) — typically stability ~0.40–0.50, similarity ~0.75–0.85, style 0–0.1, speed 0.92–0.98, speaker boost on — and give the v3 text as an alternative take. Budget is tight (free plan, ~5,000 characters total for everything), so keep total_characters low: count only text_v2 of the lines (the main generation).
Also give post-processing tips for the edit so it sounds phone-recorded (room tone bed, gentle high-pass, slight compression, no reverb, mix VO under nothing during the deadpan).`

const critique = (v, s) => `You are a Kiwi dialogue coach and an AI-voice skeptic. Review this ElevenLabs VO performance script for ${v.key === 'nz' ? 'QSME NZ "Which Dave?"' : 'qsme.build "Six bids. Six formats."'}. Read ${ROOT}/projects/${v.folder}/post.md and the timeline source ${v.timeline} to check timings. Find: anything a real New Zealander wouldn't say or would say differently; caricature or Aussie/US drift; ad-read cadence; lists that will come out robotic in TTS; punctuation that will make TTS sound odd (e.g. too many ellipses, ALL CAPS, mid-word hyphens other than Q-S-me); v3 tag overuse; lines that won't fit max_s at a natural pace; wrong start times vs the captions in the video; QSME pronunciation not written as Q-S-me; claims not in post.md. Exact fix for each. Do not write files.
SCRIPT: ${JSON.stringify(s, null, 1)}`

const revise = (v, s, c) => `Revise this VO performance script applying the critic's must-fix and should-fix items (explain any you reject in changelog). Return the full final script, same schema. Do not write files or call APIs.
SCRIPT: ${JSON.stringify(s, null, 1)}
CRITIQUE: ${JSON.stringify(c, null, 1)}`

const out = await pipeline(V,
  (v) => agent(write(v), { label: `write:${v.key}`, phase: 'Write', schema: SCRIPT }),
  (s, v) => s ? agent(critique(v, s), { label: `critique:${v.key}`, phase: 'Critique', schema: CRIT }).then(c => ({ s, c })) : null,
  (r, v) => r ? agent(revise(v, r.s, r.c), { label: `revise:${v.key}`, phase: 'Revise', schema: SCRIPT }).then(f => ({ final: f, critique: r.c })) : null,
)
return out.map((r, i) => ({ venture: V[i].key, ...(r || { failed: true }) }))
