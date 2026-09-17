---
title: Switch
description: Switch component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Switch

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Switch" /></ClientOnly>

[Open in the playground](/playground?component=FzSwitch)

## Usage

<CodeExample name="FzSwitch" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `disabled` | `boolean \| undefined` | No | None |
| `modelValue` | `boolean` | Yes | None |

## Events and state

v-model: boolean

- `update:modelValue`: `[value: boolean]`

## Slots

none

## Add from source

```sh
forza add switch
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
