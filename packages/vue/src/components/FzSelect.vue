<script setup lang="ts">
import { useId } from "vue";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "reka-ui";
import FzIcon from "./FzIcon.vue";
import FzPortal from "../internal/FzPortal.vue";
import type { ForzaOption } from "../types";
withDefaults(
  defineProps<{
    label: string;
    options: readonly ForzaOption[];
    placeholder?: string;
    disabled?: boolean;
    name?: string;
  }>(),
  { placeholder: "Choose an option" },
);
const model = defineModel<string>({ required: true });
const id = useId();
</script>
<template>
  <div class="fz-select">
    <label :id="id + '-label'" :for="id">{{ label }}</label
    ><SelectRoot v-model="model" :disabled="disabled" :name="name"
      ><SelectTrigger
        :id="id"
        class="select-trigger"
        :aria-labelledby="id + '-label'"
        ><SelectValue :placeholder="placeholder" /><FzIcon
          name="chevronDown"
          :size="16" /></SelectTrigger
      ><FzPortal
        ><SelectContent
          class="fz-floating select-content"
          position="popper"
          :side-offset="8"
          ><SelectViewport
            ><SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              class="select-item"
              ><SelectItemText>{{ option.label }}</SelectItemText
              ><SelectItemIndicator
                ><FzIcon
                  name="check"
                  :size="
                    15
                  " /></SelectItemIndicator></SelectItem></SelectViewport></SelectContent></FzPortal
    ></SelectRoot>
  </div>
</template>
<style scoped>
.fz-select {
  display: grid;
  gap: 9px;
}
label {
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
}
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 46px;
  padding: 12px 14px;
  border: 1px solid var(--fz-border);
  border-radius: var(--fz-radius);
  background: var(--fz-bg);
  color: var(--fz-text);
  text-align: left;
  font-size: 13px;
}
.select-trigger:disabled {
  opacity: 0.45;
}
.select-trigger[data-state="open"] .fz-icon {
  transform: rotate(180deg);
}
.select-trigger .fz-icon {
  transition: transform var(--fz-motion-layout) var(--fz-ease-out);
}

.select-item {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  font-size: 13px;
  padding: 11px 10px;
  border-radius: 3px;
  outline: none !important;
  cursor: pointer;
}
.select-item[data-highlighted] {
  background: var(--fz-raised);
}
.select-item[data-disabled] {
  opacity: 0.4;
  pointer-events: none;
}
</style>

<!-- Portal roots pass through Reka wrappers; namespace these rules instead of relying on scope attributes. -->
<style>
.fz-theme .select-content {
  min-width: var(--reka-select-trigger-width);
  max-height: min(300px, var(--reka-select-content-available-height));
  overflow: auto;
  padding: 6px;
}
</style>
