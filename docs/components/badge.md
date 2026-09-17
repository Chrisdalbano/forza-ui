---
title: Badge
description: Badge component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Badge

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Badge" /></ClientOnly>

[Open in the playground](/playground?component=FzBadge)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzBadge } from '@chrisdalbano/forza-ui'

</script>

<template>
  <FzBadge tone="positive">Ready</FzBadge>
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `tone` | `"warning" \| "neutral" \| "positive" \| "accent" \| undefined` | No | `"neutral"` |

## Events and state

presentational


## Slots

default

## Add from source

```sh
forza add badge
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
