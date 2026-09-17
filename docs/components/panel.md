---
title: Panel
description: Panel component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Panel

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Panel" /></ClientOnly>

[Open in the playground](/playground?component=FzPanel)

## Usage

<CodeExample name="FzPanel" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string \| undefined` | No | None |
| `eyebrow` | `string \| undefined` | No | None |

## Events and state

presentational


## Slots

default, action, footer

## Add from source

```sh
forza add panel
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
