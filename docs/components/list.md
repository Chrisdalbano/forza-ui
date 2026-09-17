---
title: List
description: List component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# List

Use stable, unique item IDs. Mutate the parent array to add, remove, or reorder. Leaving rows become inert immediately.

## Preview

<ClientOnly><ComponentPreview name="List" /></ClientOnly>

[Open in the playground](/playground?component=FzList)

## Usage

<CodeExample name="FzList" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `items` | `readonly T[]` | Yes | None |
| `label` | `string` | Yes | None |
| `motionDisabled` | `boolean \| undefined` | No | None |
| `duration` | `number \| undefined` | No | None |

## Events and state

parent owns mutations


## Slots

default({item,index}), empty

## Add from source

```sh
forza add list
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
