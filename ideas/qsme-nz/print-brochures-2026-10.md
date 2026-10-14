---
id: nz-print-brochures-2026-10
venture: qsme-nz
title: "QSME brochures & flyers: managed granny flats, developers & main contractors, service providers"
score: n/a (print collateral, not a video idea)
status: drafted (awaiting owner review)
job: founder-led in-person + PDF after a conversation
platform: print (A4 2-page brochures + A5 flyers), PDF
format: print
created: 2026-10-14
project: 2026-10-14-qsme-print-brochures
---

# QSME brochures & flyers (October 2026)

Three audiences, one CTA ("Sign up at qsme.co.nz"), NZ brand on white paper (navy bands, green accents, Manrope + Inter).

| Piece | Audience | Headline | Files |
|---|---|---|---|
| Granny flats & portable homes | homeowners, families | "A granny flat, managed the way a quantity surveyor manages their own." | `outputs/qsme-granny-flats-brochure.pdf`, `-flyer.pdf` |
| Developers & main contractors | clients who run the money | "Priced once. Tendered from the same lines. Built from the same record." | `outputs/qsme-developers-brochure.pdf`, `-flyer.pdf` |
| Service providers | tradies, consultants, suppliers, real-estate agents | "Get found by live projects. Price the same lines as everyone else. Get paid on proof." | `outputs/qsme-providers-brochure.pdf`, `-flyer.pdf` |

**Truth behind each:** granny flats = QSME as the owner's consultant/PM (no main contractor margin, every package tendered on one priced schedule, site managed, record kept); developers = one record from feasibility to CCC with rates kept private; providers = found by live projects, same lines as every bidder, paid on proof, ratings only from finished jobs.

**Source of truth for the text and layout:** `projects/2026-10-14-qsme-print-brochures/print/*.html` (editable) → `tools/print/render.sh` → PDF (print master) + PNG (preview only). Overflow QA runs on every render.

## Guardrails applied
See `projects/2026-10-14-qsme-print-brochures/brief.md`: no "free"/pricing lines; totals not "line by line"; "tradies can get verified"; Auckland-first site research, indicative only; granny-flat rule kept conditional; QSME never holds money; "we beat any price" softened to "we'll beat it, or tell you exactly why we can't".

## Discussion history
- 2026-10-14: owner asked for the three pieces (pasted brief). Drafted, rendered, overflow fixed; owner asked to see the design before finishing (worried PNGs aren't editable: they're previews, the HTML/PDF are the masters). Open: service name, lead route, phone number, price-beat wording, regions (brief.md).
- 2026-10-14 (later): owner asked for the pieces on qsme.co.nz. Page /print-materials built under Resources with per-file downloads and the logo/icon pack: PR Al-Baqshi/baqshi-full-custom-go#247. Live URL once merged: https://www.qsme.co.nz/print-materials
