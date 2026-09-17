---
title: Button
description: Button component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Button

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Button" /></ClientOnly>

[Open in the playground](/playground?component=FzButton)

## Usage

<CodeExample name="FzButton" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost" \| undefined` | No | `"primary"` |
| `size` | `"md" \| "sm" \| undefined` | No | `"md"` |
| `disabled` | `boolean \| undefined` | No | None |
| `loading` | `boolean \| undefined` | No | None |
| `type` | `"button" \| "submit" \| "reset" \| undefined` | No | `"button"` |

## Events and state

native click


## Slots

default, trailing

## Add from source

```sh
forza add button
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
