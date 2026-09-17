---
title: Accordion
description: Accordion component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
</script>

# Accordion

Single, collapsible expansion. An empty model closes every item. Custom content belongs in the default scoped slot.

## Preview

<ClientOnly><ComponentPreview name="Accordion" /></ClientOnly>

[Open in the playground](/playground?component=FzAccordion)

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { FzAccordion } from '@chrisdalbano/forza-ui'
const expanded = ref('')
const guide = [{ value: 'start', title: 'Where do I start?', content: 'Choose a role and set a budget.' }]
</script>

<template>
  <FzAccordion v-model="expanded" label="Guide" :items="guide" />
</template>
```

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `items` | `readonly ForzaAccordionItem[]` | Yes | None |
| `label` | `string` | Yes | None |
| `disabled` | `boolean \| undefined` | No | None |
| `modelValue` | `string \| undefined` | No | `""` |

## Events and state

v-model: string (single, collapsible)

- `update:modelValue`: `[value: string]`

## Slots

title({item}), default({item})

## Add from source

```sh
forza add accordion
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
