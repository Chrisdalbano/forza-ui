---
title: Dialog
description: Dialog component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Dialog

Escape closes the dialog. Focus is trapped while open and returned to the opener. Exit motion completes before unmount. Supply an informative title.

## Preview

<ClientOnly><ComponentPreview name="Dialog" /></ClientOnly>

[Open in the playground](/playground?component=FzDialog)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzDialog } from '@chrisdalbano/forza-ui'
const open = ref(false)
</script>

<template>
  <button @click="open = true">Open</button>
  <FzDialog v-model="open" title="Build details"><p>Your build is ready.</p></FzDialog>
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string` | Yes | None |
| `description` | `string \| undefined` | No | None |
| `closeOnOutside` | `boolean \| undefined` | No | `true` |
| `placement` | `"center" \| "right" \| "bottom" \| undefined` | No | `"center"` |
| `modelValue` | `boolean` | Yes | None |

## Events and state

v-model: boolean

- `update:modelValue`: `[value: boolean]`

## Slots

default({close}), footer({close})

## Add from source

```sh
forza add dialog
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
