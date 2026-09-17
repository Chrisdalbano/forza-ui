---
title: Stepper
description: Stepper component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Stepper

Steps begin at 1. The parent owns validation and content panels. Disable steps until prerequisites are satisfied. Linear mode prevents jumping ahead of the next step.

## Preview

<ClientOnly><ComponentPreview name="Stepper" /></ClientOnly>

[Open in the playground](/playground?component=FzStepper)

## Usage

<CodeExample name="FzStepper" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `steps` | `readonly ForzaStep[]` | Yes | None |
| `label` | `string` | Yes | None |
| `linear` | `boolean \| undefined` | No | `true` |
| `modelValue` | `number` | Yes | None |

## Events and state

v-model: number (1-based)

- `update:modelValue`: `[value: number]`

## Slots

none

## Add from source

```sh
forza add stepper
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
