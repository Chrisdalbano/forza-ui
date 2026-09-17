# Installation

Forza requires Vue 3.5 or later. The current distribution is a versioned GitHub release, not an npm registry publication.

## Package managers and registry status

Forza is a built package containing ESM JavaScript, TypeScript declarations, CSS, and Vue source. It is currently distributed as a GitHub Release tarball. It has not been published to the npm registry, so installing by package name alone is not available yet.

npm, pnpm, Yarn, and Bun are package managers. They can install the same package from a release URL; pnpm does not require a separate Forza publication. Choose the command for your application below.

## Install the release

::: code-group

```sh [npm]
npm install https://github.com/Chrisdalbano/forza-ui/releases/download/v0.3.3/chrisdalbano-forza-ui-0.3.3.tgz
```

```sh [pnpm]
pnpm add https://github.com/Chrisdalbano/forza-ui/releases/download/v0.3.3/chrisdalbano-forza-ui-0.3.3.tgz
```

```sh [Yarn]
yarn add https://github.com/Chrisdalbano/forza-ui/releases/download/v0.3.3/chrisdalbano-forza-ui-0.3.3.tgz
```

```sh [Bun]
bun add https://github.com/Chrisdalbano/forza-ui/releases/download/v0.3.3/chrisdalbano-forza-ui-0.3.3.tgz
```

:::

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
