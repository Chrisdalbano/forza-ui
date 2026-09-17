---
title: Carousel
description: Carousel component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Carousel

Slide indices begin at 0. Embla handles pointer and touch dragging. Inactive slides are inert. No autoplay. Items require stable IDs.

## Preview

<ClientOnly><ComponentPreview name="Carousel" /></ClientOnly>

[Open in the playground](/playground?component=FzCarousel)

## Usage

<CodeExample name="FzCarousel" />

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
