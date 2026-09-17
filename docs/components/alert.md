---
title: Alert
description: Alert component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Alert

State belongs to the parent. Compose this component with the props and slots below.

## Preview

<ClientOnly><ComponentPreview name="Alert" /></ClientOnly>

[Open in the playground](/playground?component=FzAlert)

## Usage

<CodeExample name="FzAlert" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string` | Yes | None |
| `tone` | `"info" \| "success" \| "warning" \| "danger" \| undefined` | No | `"info"` |

## Events and state

status; danger uses alert


## Slots

default

## Add from source

```sh
forza add alert
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
