# Print kit

Brochures and flyers as plain HTML (one `<section class="page">` per page) rendered by headless Chrome.

```bash
tools/print/render.sh projects/<folder>/print/<name>.html projects/<folder>/outputs/<name>
```
Makes `<name>.pdf` (the print master: vector text, A4 or A5 from the `@page` rule) and `<name>-p<N>.png` (2× previews for review and the Studio; not for print).

- Shared styles: copy `projects/2026-10-14-qsme-print-brochures/print/print.css` (QSME NZ brand on white). Fonts come from `tools/motion/fonts/`.
- QA: the page script flags any page whose blocks are taller than the page (a red "OVERFLOW" bar in the PNG) and `render.sh` exits 2. Fix the copy or the layout, never let text run under the CTA band.
- Photos: `assets/qsme/broll/*-still.v1.jpg` are AI brand b-roll already on the site; label them "Illustrative". Never present them as a customer's site.
- Edit the HTML, not the PNG. To edit in Figma instead, push the page with the Figma MCP (`generate_figma_design`) into the venture's file.
