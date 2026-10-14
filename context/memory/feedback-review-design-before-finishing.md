---
name: feedback-review-design-before-finishing
description: "Owner wants to see rendered previews of any design (brochure, page, post) before the task is called done, and wants to know which file is the editable master."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6e892cb7-c2e8-4dda-a385-2bee823db77b
  modified: 2026-10-14T02:40:27.422Z
---

When producing design work (print brochures, flyers, posts), show the owner rendered previews before wrapping up, and say plainly which file is editable (HTML/Figma) and which is a derived preview (PNG) or print master (PDF).

**Why:** On 2026-10-14 the owner saw PNG previews of the QSME brochures and worried the deliverable was a flattened, uneditable image with text possibly sitting on the wrong layer. They said if the design has issues they'd move to another platform (Figma).

**How to apply:** Build print pieces as HTML in the project folder (`tools/print/render.sh` → PDF master + PNG previews, with the overflow QA), send the previews mid-task via SendUserFile, state "HTML is the master, PNG is only a preview", and offer a Figma push if they want to edit visually. See [[reference-studio-figma-railway]] for the Figma file.
