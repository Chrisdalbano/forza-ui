# Vue and Nuxt

Forza uses Vue 3.5 primitives and contains no application router, API client, or global store. Explicitly import components into Vue and Nuxt pages.

## Nuxt package integration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@chrisdalbano/forza-ui/style.css"],
});
```

```vue
<!-- app/app.vue -->
<template>
  <div class="fz-theme"><NuxtPage /></div>
</template>
```

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
import { FzButton } from "@chrisdalbano/forza-ui";
</script>
<template><FzButton>Start building</FzButton></template>
```

## Source-copy integration

Use `forza init --dir app/components/forza`. Explicitly import from `~/components/forza` to avoid relying on generated component naming.

## Server rendering

Browser APIs run after mount. Overlay portals resolve the nearest theme wrapper on the client. Keep dialogs closed during initial SSR unless your flow handles client-only content. `useId` keeps control IDs stable.

Verified with a Nuxt 4.5.2 production build: server-rendered content, client hydration, field editing, a select inside a drawer, and restored opener focus. The reproducible consumer fixture lives in `tests/fixtures/nuxt`. No Nuxt auto-registration module is included in this version.
