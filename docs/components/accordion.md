---
title: Accordion
description: Accordion component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Accordion

Single, collapsible expansion. An empty model closes every item. Custom content belongs in the default scoped slot.

## Preview

<ClientOnly><ComponentPreview name="Accordion" /></ClientOnly>

[Open in the playground](/playground?component=FzAccordion)

## Usage

<CodeExample name="FzAccordion" />

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
