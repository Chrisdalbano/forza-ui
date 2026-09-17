---
title: Dialog
description: Dialog component API, usage and live preview for Forza UI.
---
<script setup>
import ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'
import CodeExample from '../.vitepress/theme/components/CodeExample.vue'
</script>

# Dialog

Escape closes the dialog. Focus is trapped while open and returned to the opener. Exit motion completes before unmount. Supply an informative title.

## Preview

<ClientOnly><ComponentPreview name="Dialog" /></ClientOnly>

[Open in the playground](/playground?component=FzDialog)

## Usage

<CodeExample name="FzDialog" />

Import the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).

## Props

| Name | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string` | Yes | None |
| `description` | `string \| undefined` | No | None |
| `closeOnOutside` | `boolean \| undefined` | No | `true` |
| `placement` | `"center" \| "right" \| "bottom" \| undefined` | No | `"center"` |
| `modelValue` | `boolean` | Yes | None |

## Events and state

v-model: boolean

- `update:modelValue`: `[value: boolean]`

## Slots

default({close}), footer({close})

## Add from source

```sh
forza add dialog
```

Set up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.
