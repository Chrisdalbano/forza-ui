---
title: Segmented
description: Segmented component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Segmented

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Segmented" /></ClientOnly>

[Open in the playground](/playground?component=FzSegmented)

## Usage

<CodeExample name="FzSegmented" />

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

none

## Add from source

```sh
forza add segmented
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
