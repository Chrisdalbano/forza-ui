---
title: Pagination
description: Pagination component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Pagination

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Pagination" /></ClientOnly>

[Open in the playground](/playground?component=FzPagination)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzPagination } from '@chrisdalbano/forza-ui'
const page = ref(1)
</script>

<template>
  <FzPagination v-model="page" :total="100" :page-size="10" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `total` | `number` | Yes | None |
| `pageSize` | `number \| undefined` | No | `5` |
| `label` | `string \| undefined` | No | `"Pagination"` |
| `modelValue` | `number` | Yes | None |

## Events and state

v-model: number (1-based)

- `update:modelValue`: `[value: number]`

## Slots

none

## Add from source

```sh
forza add pagination
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
