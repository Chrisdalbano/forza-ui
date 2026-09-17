# Forza UI

Vue components with typed APIs, scoped Ink and Paper themes, and application motion. An independent MIT-licensed project by [Chrisdalbano](https://chrisdalbano.com), developed with AI assistance.

## Install

See the [installation guide](https://forzaui.chrisdalbano.com/guide/installation) for current npm, pnpm, Yarn, and Bun commands and release availability.

## Use

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzButton, FzField } from '@chrisdalbano/forza-ui'
import '@chrisdalbano/forza-ui/style.css'
const name = ref('')
</script>

<template>
  <main class="fz-theme">
    <FzField v-model="name" label="Project name" />
    <FzButton :disabled="!name.trim()">Create project</FzButton>
  </main>
</template>
```

For Paper, add `data-theme="paper"` to the theme wrapper. Fonts are supplied by your application. Vue 3.5 and the declared peer dependencies are required.

[Components](https://forzaui.chrisdalbano.com/components) / [Nuxt](https://forzaui.chrisdalbano.com/guide/nuxt) / [Theming](https://forzaui.chrisdalbano.com/guide/theming) / [Source](https://github.com/Chrisdalbano/forza-ui)

The package contains ESM JavaScript, TypeScript declarations, CSS, and Vue source. Landing-page GSAP animations are excluded. Third-party notices are included. This is an early 0.x library; review the APIs before adopting it.
