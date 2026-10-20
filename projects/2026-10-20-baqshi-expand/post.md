---
vid: BQ01
title: "Five strangers. One consultant."
venture: baqshi
status: "delivered 2026-10-20: EN / ES / AR, 16:9 + 9:16, voiced + music"
publish_date: 2026-10-20
length_s: 100.7
video_with_vo: outputs/baqshi-en-16x9-with-vo.mp4
also: outputs/baqshi-en-9x16-with-vo.mp4
languages: [en, ar, es]
---

# BQ01 · Five strangers. One consultant.

A ~1:40 brand explainer for Baqshi (baqshi.com): what we do (find, qualify, transfer, build, in 90+ countries from a New Zealand base) and how (the route plan in writing, local lawyers / real estate developers / government channels, QSME line-by-line builds, one escrow released together, every payment held in escrow). Same picture in three languages, each version timed to its own voice.

- **Editable master:** `motion/baqshi.tpl.html` (one template) → `python3 motion/build.py` writes `motion/baqshi-<lang>[-9x16].html` from `script/strings-<lang>.json` + `outputs/vo-<lang>/cues.json`. The PNG/MP4 files are outputs only.
- **Script:** `script/<lang>.txt` (cue-marked), English fact-checked by the 2026-10-20 research + verify workflow; Arabic and Spanish by a translate → native fluency review + back-translation fidelity check → fix workflow.
- **Voices (eleven_v3, one unbroken take each, all STT-checked against the script):**
  - EN: Chris (owner's pick), take 1 of 3, 99.4 s.
  - ES: Juan Carlos (library voice, warm, conversational Latin American), take 1 of 3, 111.1 s natural. Mauricio said "Baqshi" wrong; Antonio was slower.
  - AR: Omar (library voice, warm Modern Standard Arabic), take 1 of 3, 148.2 s, sped up ×1.10 with `tools/tempo` (pitch kept) to 134.7 s so the film stays near the brief's "around 1:40". Abdullah read faster naturally, but in every full take he said "صندوق استثماري" (investment fund) for "صندوق استئماني" (trust), which changes the meaning, so he was dropped (takes kept in outputs/vo-ar/abdullah-v1, -v2). Mazen, Anas and Fares were sampled too.
- **Levels:** each take levelled with `tools/voicenorm.py` to −16.5 dBFS speech, peaks ≤ −1.5 dBFS (`outputs/vo-<lang>/voice.m4a`), muxed at 1.0. The first Arabic mix was 7 dB hot and clipped (the tempo export raised it), which this fixes.
- **Music:** bed G (owner's pick), fitted with `tools/bedfit.py` to the film length + 1.55 s so the theme's last hit lands as the end card fades (`music/bed-G-<lang>.m4a`); 0.32, ducked to 0.12 under the voice (≈15 dB under).
- **QA (2026-10-20, independent reviewer per language + adversarial verify):** fixed: status strip broke inside a clause (EN line 2 read "independently audited", AR read "على شبكة رئيسية") → clauses kept whole with non-breaking spaces; illustrative tags too small → 28 px in 9:16; Arabic voice clipping; ES map subhead over country labels → headline panel + labels hidden where they'd collide; routes still drawing at the cut; hook magnifier behind the headline; silent end card; route-plan ticks → numbers (a tick could read as "yes, you can own there"); rail numbers dropped (narration covers Build before Transfer); worth label crowding the title; held-payment wraps; small 9:16 text; Arabic mark spacing; logo lockup never mirrors.
- **v2 (owner, 2026-10-20 morning):** BitRegalo and the test-network line removed entirely; the money scene now says it generally: "And whoever's holding your money? It's held in escrow…" Only that paragraph was re-voiced and spliced into each take (tools/splice_para.py); v1 files kept in outputs/vo-<lang>/v1-bitregalo/.
- **On screen, always:** escrow model footnote ("How the model works… Not legal, tax or financial advice"); "Illustrative reach" on the map; "Illustrative · not a forecast" on buy-or-build; example lines on the QSME table.

## Files
| ID | File | Length |
|---|---|---|
| BQ01·en·16:9 | outputs/baqshi-en-16x9-with-vo.mp4 | 1:41 |
| BQ01·en·9:16 | outputs/baqshi-en-9x16-with-vo.mp4 | 1:41 |
| BQ01·es·16:9 | outputs/baqshi-es-16x9-with-vo.mp4 | 1:53 |
| BQ01·es·9:16 | outputs/baqshi-es-9x16-with-vo.mp4 | 1:53 |
| BQ01·ar·16:9 | outputs/baqshi-ar-16x9-with-vo.mp4 | 2:14 |
| BQ01·ar·9:16 | outputs/baqshi-ar-9x16-with-vo.mp4 | 2:14 |

Silent masters (no voice) sit next to them as `baqshi-<lang>-<cut>.mp4`; `motion/mix.sh <lang>` re-lays voice + bed.

## YouTube (English)
Title: Own Property Anywhere on Earth: One Consultant, Every Step | Baqshi
Description:
Five strangers. Two countries. One property. That's how buying or building abroad usually goes.

Baqshi is a global property consultancy based in New Zealand, working in more than 90 countries. We look after people who want to expand:
• Find property that fits your brief and budget
• Qualify it in writing before any money moves: can you own there, which structure, what it costs, how long it takes
• Bring in local lawyers, real estate developers and the government channels each country needs
• Build: priced line by line on QSME, released straight to whoever did the work
• Buy: your funds and the seller's title go into one escrow held in New Zealand and come out together

Every payment is held in escrow: it can only go to the person it's for, or back to whoever paid. Each deal's escrow agreement sets out exactly how. Not legal, tax or financial advice.

Tell us where you're from, and where you want to own: https://www.baqshi.com

#Baqshi #InternationalProperty #RealEstateInvesting #BuyPropertyAbroad #PropertyConsultant #Escrow #NewZealand #QSME #GlobalInvesting

## YouTube (Español)
Title: Ten una propiedad en cualquier lugar del mundo: un solo consultor, en cada paso | Baqshi
Description:
Cinco extraños. Dos países. Una propiedad. Así suele ser comprar o construir en el extranjero.

Baqshi es una consultora inmobiliaria global con sede en Nueva Zelanda, que trabaja en más de 90 países. Acompañamos a quienes quieren expandirse:
• Encontramos una propiedad que encaje con lo que buscas y tu presupuesto
• La evaluamos por escrito antes de mover dinero: si puedes ser dueño allí, con qué estructura, cuánto cuesta y cuánto tarda
• Sumamos abogados locales, promotores inmobiliarios y los canales de gobierno que pide cada país
• Si construyes: se cotiza línea por línea en QSME y se paga directo a quien hizo el trabajo
• Si compras: tus fondos y el título del vendedor entran en un solo escrow radicado en Nueva Zelanda y salen juntos

Cada pago se retiene en escrow: solo puede ir a su destinatario o volver a quien pagó. El contrato de escrow de cada operación define exactamente cómo. No es asesoría legal, fiscal ni financiera.

Cuéntanos de dónde eres y dónde quieres tener tu propiedad: https://www.baqshi.com

#Baqshi #PropiedadEnElExtranjero #InversiónInmobiliaria #ConsultorInmobiliario #Escrow #NuevaZelanda #BienesRaíces

## YouTube (العربية)
Title: تملّكوا عقارًا في أي مكان على وجه الأرض: مستشار واحد في كل خطوة | بقشي
Description:
خمسة غرباء. دولتان. عقار واحد. هكذا يجري الشراء أو البناء خارج الحدود عادةً.

بقشي شركة استشارات عقارية عالمية مقرّها نيوزيلندا، وتعمل في أكثر من 90 دولة. نرافق مَن يريدون التوسّع:
• نجد لكم عقارًا يناسب متطلباتكم وميزانيتكم
• نتحقّق منه كتابيًا قبل تحويل أي مبلغ: هل يمكنكم التملّك هناك، وبأي هيكل، وكم يكلّف، وكم يستغرق
• نستعين بمحامين محليين ومطوّرين عقاريين والجهات الحكومية التي تتطلّبها كل دولة
• إن اخترتم البناء: تُسعَّر الميزانية بندًا بندًا عبر QSME وتُصرَف مباشرةً لمَن أنجز العمل
• وإن اخترتم الشراء: تُودَع أموالكم وسند ملكية البائع في حساب ضمان واحد يُحتفَظ به في نيوزيلندا، ويُفرَج عنهما معًا

كل دفعة تُحتجَز في حساب ضمان: لا تذهب إلا إلى المستفيد منها، أو تعود إلى مَن دفعها. وتحدّد اتفاقية حساب الضمان الخاصة بكل صفقة ذلك بدقة. هذا المحتوى ليس استشارة قانونية أو ضريبية أو مالية.

أخبرونا مِن أين أنتم وأين تريدون التملّك: https://www.baqshi.com

#بقشي #عقارات #الاستثمار_العقاري #تملك_عقار_في_الخارج #حساب_ضمان #نيوزيلندا #Baqshi
