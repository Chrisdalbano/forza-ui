---
title: Stat
description: Stat component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Stat

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Stat" /></ClientOnly>

[Open in the playground](/playground?component=FzStat)

## Usage

<CodeExample name="FzStat" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `label` | `string` | Yes | None |
| `value` | `string` | Yes | None |
| `detail` | `string \| undefined` | No | None |

## Events and state

presentational


## Slots

none

## Add from source

```sh
forza add stat
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
