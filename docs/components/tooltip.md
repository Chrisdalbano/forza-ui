---
title: Tooltip
description: Tooltip component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Tooltip

Use one focusable trigger. Essential instructions should remain visible elsewhere.

## Preview

<ClientOnly><ComponentPreview name="Tooltip" /></ClientOnly>

[Open in the playground](/playground?component=FzTooltip)

## Usage

<CodeExample name="FzTooltip" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `text` | `string` | Yes | None |
| `delay` | `number \| undefined` | No | `250` |

## Events and state

hover/focus managed by primitive


## Slots

default: one focusable trigger

## Add from source

```sh
forza add tooltip
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
