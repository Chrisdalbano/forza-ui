---
title: Popover
description: Popover component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Popover

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Popover" /></ClientOnly>

[Open in the playground](/playground?component=FzPopover)

## Usage

<CodeExample name="FzPopover" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `open` | `boolean \| undefined` | No | `false` |

## Events and state

v-model:open

- `update:open`: `[value: boolean]`

## Slots

trigger, default({close})

## Add from source

```sh
forza add popover
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
