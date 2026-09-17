---
title: Checkbox
description: Checkbox component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Checkbox

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Checkbox" /></ClientOnly>

[Open in the playground](/playground?component=FzCheckbox)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzCheckbox } from '@chrisdalbano/forza-ui'
const shared = ref(false)
</script>

<template>
  <FzCheckbox v-model="shared" label="Share with the team" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `description` | `string \| undefined` | No | None |
| `disabled` | `boolean \| undefined` | No | None |
| `name` | `string \| undefined` | No | None |
| `modelValue` | `boolean \| "indeterminate"` | Yes | None |

## Events and state

v-model: boolean or indeterminate

- `update:modelValue`: `[value: boolean | "indeterminate"]`

## Slots

none

## Add from source

```sh
forza add checkbox
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
