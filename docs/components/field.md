---
title: Field
description: Field component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Field

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Field" /></ClientOnly>

[Open in the playground](/playground?component=FzField)

## Usage

<CodeExample name="FzField" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `hint` | `string \| undefined` | No | None |
| `error` | `string \| undefined` | No | None |
| `placeholder` | `string \| undefined` | No | None |
| `disabled` | `boolean \| undefined` | No | None |
| `type` | `"text" \| "search" \| "email" \| undefined` | No | None |
| `modelValue` | `string` | Yes | None |

## Events and state

v-model: string

- `update:modelValue`: `[value: string]`

## Slots

leading, trailing

## Add from source

```sh
forza add field
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
