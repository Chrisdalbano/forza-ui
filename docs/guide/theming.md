# Theming

Tokens have three layers: raw values, semantic roles, and component settings. Prefer changing a semantic role rather than restyling individual controls.

## Built-in themes

```html
<div class="fz-theme">Ink theme</div>
<div class="fz-theme" data-theme="paper">Paper theme</div>
```

| Token            | Purpose                        |
| ---------------- | ------------------------------ |
| `--fz-bg`        | Application background         |
| `--fz-surface`   | Panels and overlays            |
| `--fz-raised`    | Hover and elevated surfaces    |
| `--fz-text`      | Primary text                   |
| `--fz-muted`     | Supporting text                |
| `--fz-border`    | Control and surface boundaries |
| `--fz-accent`    | Primary actions and focus      |
| `--fz-on-accent` | Text on primary actions        |
| `--fz-positive`  | Success feedback               |
| `--fz-warning`   | Caution feedback               |
| `--fz-info`      | Informational feedback         |

## Customize a theme

```css
.fz-theme.my-product {
  --fz-accent: #a8d6b5;
  --fz-accent-hover: #c0e7cb;
  --fz-on-accent: #101416;
  --fz-font-body: "Inter", system-ui, sans-serif;
  --fz-font-display: "Inter", system-ui, sans-serif;
  --fz-font-mono: ui-monospace, monospace;
}
```

Check contrast after changing colors. A theme wrapper should not clip overflow or use a transform: portals mount into the closest wrapper, and transforms change the containing block for fixed overlays.

## Typography

The site self-hosts Manrope, Barlow Condensed, and IBM Plex Mono. The package does not download fonts. Choose fonts in the host app and set the three font tokens. Supporting text on the presentation site uses a readable 14 to 18px scale.

## Motion tokens

`--fz-motion-fast` is 160ms, `--fz-motion-layout` 260ms, `--fz-motion-enter` 320ms, and `--fz-motion-exit` 180ms. Override them on your wrapper. Reduced-motion settings take precedence.

## Stable page layout with overlays

If your application reserves scrollbar space with `scrollbar-gutter: stable`, disable Reka's extra body padding at the app root. Scroll locking and focus management remain enabled.

```vue
<script setup lang="ts">
import { ConfigProvider } from "reka-ui";
</script>

<template>
  <ConfigProvider :scroll-body="false">
    <div class="fz-theme"><slot /></div>
  </ConfigProvider>
</template>

<style>
html {
  scrollbar-gutter: stable;
}
</style>
```

Without a stable gutter, keep Reka's default compensation. Combining a reserved gutter with padding compensation shifts the page twice. The Forza documentation site uses the setup above.
