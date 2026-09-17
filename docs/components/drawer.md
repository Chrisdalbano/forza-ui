---
title: Drawer
description: Drawer component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Drawer

Shares the dialog focus contract. Right and bottom placement are supported. No drag dismissal in this release.

## Preview

<ClientOnly><ComponentPreview name="Drawer" /></ClientOnly>

[Open in the playground](/playground?component=FzDrawer)

## Usage

<CodeExample name="FzDrawer" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string` | Yes | None |
| `description` | `string \| undefined` | No | None |
| `side` | `"right" \| "bottom" \| undefined` | No | `"right"` |
| `closeOnOutside` | `boolean \| undefined` | No | `true` |
| `modelValue` | `boolean` | Yes | None |

## Events and state

v-model: boolean

- `update:modelValue`: `[value: boolean]`

## Slots

default({close}), footer({close})

## Add from source

```sh
forza add drawer
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
