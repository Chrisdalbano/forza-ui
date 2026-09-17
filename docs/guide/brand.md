# Brand assets

Forza's **Forward Fold** symbol uses a forward-leaning spine, two open counters, and a displaced foot. It is drawn on a 128-unit grid and paired with an outlined display wordmark.

<img src="/brand/wordmark-paper.svg" alt="Forza UI wordmark" style="background:#101416;padding:24px;border-radius:8px;width:360px" />

## Downloads

- [Coral symbol](/brand/symbol-coral.svg)
- [Ink symbol](/brand/symbol-ink.svg)
- [Paper symbol](/brand/symbol-paper.svg)
- [Ink wordmark](/brand/wordmark-ink.svg)
- [Paper wordmark](/brand/wordmark-paper.svg)
- [SVG favicon](/brand/favicon.svg) / <a href="/brand/favicon.ico" download>ICO favicon</a>
- [Social PNG](/brand/social.png) / [WebP](/brand/social.webp)

## Construction and usage

Keep clear space of at least one quarter of the symbol's width. Use the favicon variant at small sizes. Do not stretch or redraw the wordmark. Use Ink on light backgrounds and Paper on dark backgrounds. Coral is the primary accent.

The master lives in `brand/symbol-master.svg`. `scripts/brand.mjs` uses SVG.js and svgdom for vector construction, OpenType paths for lettering, SVGO for optimization, and Sharp for raster output. Regenerate with `npm run build:brand`. The ICO contains 16, 32, and 48px images. Touch icons are provided separately.

Lucide remains the functional icon set. The symbol identifies Forza; controls use familiar, consistent pictograms.

Forza source and symbol geometry are MIT licensed. Font-derived lettering retains the SIL Open Font License; see [font notices](/licenses/barlow-condensed-OFL.txt) and [Manrope notices](/licenses/manrope-OFL.txt). Please do not imply an official release or endorsement. Forza UI is independent of Riot Games and Microsoft/Turn 10.
