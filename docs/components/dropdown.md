---
title: Dropdown
description: Dropdown component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Dropdown

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Dropdown" /></ClientOnly>

[Open in the playground](/playground?component=FzDropdown)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzDropdown } from '@chrisdalbano/forza-ui'
const action = ref('')
const actions = [{ value: 'duplicate', label: 'Duplicate' }]
</script>

<template>
  <FzDropdown label="Actions" :items="actions" @select="action = $event" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `items` | `readonly ForzaMenuItem[]` | Yes | None |
| `heading` | `string \| undefined` | No | None |
| `disabled` | `boolean \| undefined` | No | None |
| `open` | `boolean \| undefined` | No | `false` |

## Events and state

v-model:open; select(value)

- `update:open`: `[value: boolean]`
- `select`: `[value: string]`

## Slots

trigger

## Add from source

```sh
forza add dropdown
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
