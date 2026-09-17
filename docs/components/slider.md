---
title: Slider
description: Slider component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Slider

One numeric thumb. Arrow keys change by step; Home and End reach the bounds. The commit event marks completion.

## Preview

<ClientOnly><ComponentPreview name="Slider" /></ClientOnly>

[Open in the playground](/playground?component=FzSlider)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzSlider } from '@chrisdalbano/forza-ui'
const budget = ref(3200)
</script>

<template>
  <FzSlider v-model="budget" label="Gold" :min="1000" :max="6000" :step="100" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `min` | `number \| undefined` | No | `0` |
| `max` | `number \| undefined` | No | `100` |
| `step` | `number \| undefined` | No | `1` |
| `disabled` | `boolean \| undefined` | No | None |
| `unit` | `string \| undefined` | No | `""` |
| `name` | `string \| undefined` | No | None |
| `modelValue` | `number` | Yes | None |

## Events and state

v-model: number; commit(value)

- `update:modelValue`: `[value: number]`
- `commit`: `[value: number]`

## Slots

none

## Add from source

```sh
forza add slider
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
