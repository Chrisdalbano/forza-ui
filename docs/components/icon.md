---
title: Icon
description: Icon component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Icon

Uses Lucide. Omit label for decorative icons; supply label when the icon conveys meaning on its own.

## Preview

<ClientOnly><ComponentPreview name="Icon" /></ClientOnly>

[Open in the playground](/playground?component=FzIcon)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzIcon } from '@chrisdalbano/forza-ui'

</script>

<template>
  <FzIcon name="shield" :size="24" label="Guardian role" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `name` | `"sort" \| "search" \| "info" \| "arrowLeft" \| "minus" \| "settings" \| "more" \| "arrowUpRight" \| "arrowRight" \| "plus" \| "close" \| "check" \| "shield" \| "swords" \| "zap" \| "flame" \| "sun" \| "moon" \| "loader" \| "trash" \| "undo" \| "chevronDown" \| "grip"` | Yes | None |
| `size` | `number \| undefined` | No | `18` |
| `label` | `string \| undefined` | No | None |
| `strokeWidth` | `number \| undefined` | No | `1.75` |

## Events and state

decorative unless labeled


## Slots

none

## Add from source

```sh
forza add icon
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
