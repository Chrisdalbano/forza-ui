# Installation

Forza requires Vue 3.5 or later. Install the library from the npm registry with your preferred package manager.

## Package managers and registry status

Forza is published as `@chrisdalbano/forza-ui`. The package contains ESM JavaScript, TypeScript declarations, CSS, and Vue source. The source-copy CLI is available separately as `@chrisdalbano/forza-ui-cli`.

npm, pnpm, Yarn, and Bun are package managers. They install the same package from the npm registry; pnpm does not require a separate Forza publication. Choose the command for your application below.

## Install the release

::: code-group

```sh [npm]
npm install @chrisdalbano/forza-ui
```

```sh [pnpm]
pnpm add @chrisdalbano/forza-ui
```

```sh [Yarn]
yarn add @chrisdalbano/forza-ui
```

```sh [Bun]
bun add @chrisdalbano/forza-ui
```

:::

To pin this release, use `@chrisdalbano/forza-ui@0.3.3`. Versioned archives remain available on [GitHub Releases](https://github.com/Chrisdalbano/forza-ui/releases/tag/v0.3.3).

npm installs the declared peers. If your package manager requires explicit peers:

```sh
npm install vue reka-ui @lucide/vue @formkit/auto-animate embla-carousel-vue
```

## Add the stylesheet and theme wrapper

Import the stylesheet once in your application entry:

```ts
import "@chrisdalbano/forza-ui/style.css";
```

```vue
<script setup lang="ts">
import { ref } from "vue";
import { FzButton, FzField } from "@chrisdalbano/forza-ui";
const name = ref("");
</script>
<template>
  <main class="fz-theme">
    <FzField v-model="name" label="Build name" />
    <FzButton :disabled="!name.trim()">Save build</FzButton>
  </main>
</template>
```

The theme wrapper is required. Floating overlays inherit its theme. For Paper, add `data-theme="paper"`. Fonts belong to your application; system fallbacks work without font requests. See [theming](/guide/theming).

## Build locally

```sh
git clone https://github.com/Chrisdalbano/forza-ui.git
cd forza-ui
npm ci
npm run build:lib
npm pack ./packages/vue
```

Install the resulting tarball into your app. The release contains ESM, declarations, CSS, source, and license notices. Marketing code and GSAP are excluded.
