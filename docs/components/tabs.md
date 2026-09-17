---
title: Tabs
description: Tabs component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Tabs

The default slot renders the active panel. The parent owns its content. Arrow keys, Home, and End move selection.

## Preview

<ClientOnly><ComponentPreview name="Tabs" /></ClientOnly>

[Open in the playground](/playground?component=FzTabs)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzTabs } from '@chrisdalbano/forza-ui'
const tab = ref('overview')
const tabs = [{ value: 'overview', label: 'Overview' }, { value: 'history', label: 'History' }]
</script>

<template>
  <FzTabs v-model="tab" label="Details" :options="tabs"><p>{{ tab }}</p></FzTabs>
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `options` | `readonly { value: string; label: string; }[]` | Yes | None |
| `modelValue` | `string` | Yes | None |

## Events and state

v-model: string

- `update:modelValue`: `[value: string]`

## Slots

default

## Add from source

```sh
forza add tabs
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
