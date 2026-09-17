---
title: Carousel
description: Carousel component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Carousel

Slide indices begin at 0. Embla handles pointer and touch dragging. Inactive slides are inert. No autoplay. Items require stable IDs.

## Preview

<ClientOnly><ComponentPreview name="Carousel" /></ClientOnly>

[Open in the playground](/playground?component=FzCarousel)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzCarousel } from '@chrisdalbano/forza-ui'
const slide = ref(0)
const builds = [{ id: 1, name: 'Guardian' }, { id: 2, name: 'Duelist' }]
</script>

<template>
  <FzCarousel v-model="slide" :items="builds" label="Builds">
    <template #default="{ item }">{{ item.name }}</template>
  </FzCarousel>
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `items` | `readonly T[]` | Yes | None |
| `label` | `string` | Yes | None |
| `modelValue` | `number \| undefined` | No | `0` |

## Events and state

v-model: number (0-based)

- `update:modelValue`: `[value: number]`

## Slots

default({item,index})

## Add from source

```sh
forza add carousel
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
