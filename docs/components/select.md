---
title: Select
description: Select component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Select

Single string selection. Supply a visible label. Disabled options are unavailable to keyboard and pointer input.

## Preview

<ClientOnly><ComponentPreview name="Select" /></ClientOnly>

[Open in the playground](/playground?component=FzSelect)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzSelect } from '@chrisdalbano/forza-ui'
const role = ref('guardian')
const roles = [{ value: 'guardian', label: 'Guardian' }]
</script>

<template>
  <FzSelect v-model="role" label="Role" :options="roles" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `options` | `readonly ForzaOption[]` | Yes | None |
| `placeholder` | `string \| undefined` | No | `"Choose an option"` |
| `disabled` | `boolean \| undefined` | No | None |
| `name` | `string \| undefined` | No | None |
| `modelValue` | `string` | Yes | None |

## Events and state

v-model: string

- `update:modelValue`: `[value: string]`

## Slots

none

## Add from source

```sh
forza add select
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
