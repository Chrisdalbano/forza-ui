---
title: Table
description: Table component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Table

Sorting is controlled: use the emitted sort value to sort or request rows in the parent. Pagination is separate. Supply unique row IDs. No virtualization in this release.

## Preview

<ClientOnly><ComponentPreview name="Table" /></ClientOnly>

[Open in the playground](/playground?component=FzTable)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzTable } from '@chrisdalbano/forza-ui'
const sort = ref({ key: 'gold', direction: 'asc' as 'asc' | 'desc' })
const rows = [{ id: 1, name: 'Sunbreaker', gold: 3200 }]
const columns = [{ key: 'name', label: 'Item' }, { key: 'gold', label: 'Gold', sortable: true }]
</script>

<template>
  <FzTable v-model:sort="sort" :rows="rows" :columns="columns" label="Items" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `rows` | `readonly T[]` | Yes | None |
| `columns` | `readonly ForzaColumn[]` | Yes | None |
| `label` | `string` | Yes | None |
| `sort` | `ForzaSort \| undefined` | No | None |

## Events and state

v-model:sort; parent sorts rows

- `update:sort`: `[value: ForzaSort | undefined]`

## Slots

cell({row,column,value}), empty

## Add from source

```sh
forza add table
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
