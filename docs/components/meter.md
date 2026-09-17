---
title: Meter
description: Meter component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Meter

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Meter" /></ClientOnly>

[Open in the playground](/playground?component=FzMeter)

## Usage

<CodeExample name="FzMeter" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `value` | `number` | Yes | None |
| `max` | `number \| undefined` | No | `100` |
| `label` | `string` | Yes | None |
| `tone` | `"warning" \| "positive" \| "accent" \| undefined` | No | `"positive"` |

## Events and state

presentational


## Slots

none

## Add from source

```sh
forza add meter
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
