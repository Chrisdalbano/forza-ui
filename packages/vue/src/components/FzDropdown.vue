<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "reka-ui";
import FzButton from "./FzButton.vue";
import FzIcon from "./FzIcon.vue";
import FzPortal from "../internal/FzPortal.vue";
import type { ForzaMenuItem } from "../types";
defineProps<{
  label: string;
  items: readonly ForzaMenuItem[];
  heading?: string;
  disabled?: boolean;
}>();
const open = defineModel<boolean>("open", { default: false });
defineEmits<{ select: [value: string] }>();
</script>
<template>
  <DropdownMenuRoot v-model:open="open"
    ><DropdownMenuTrigger as-child :disabled="disabled"
      ><slot name="trigger"
        ><FzButton variant="secondary"
          >{{ label
          }}<FzIcon
            name="chevronDown"
            :size="15" /></FzButton></slot></DropdownMenuTrigger
    ><FzPortal
      ><DropdownMenuContent
        class="fz-floating fz-menu"
        :side-offset="8"
        align="end"
        :aria-label="label"
        ><DropdownMenuLabel v-if="heading" class="menu-label">{{
          heading
        }}</DropdownMenuLabel
        ><DropdownMenuItem
          v-for="item in items"
          :key="item.value"
          :disabled="item.disabled"
          class="menu-item"
          :class="{ 'is-destructive': item.destructive }"
          @select="$emit('select', item.value)"
          ><span>{{ item.label }}</span
          ><kbd v-if="item.shortcut">{{ item.shortcut }}</kbd></DropdownMenuItem
        ></DropdownMenuContent
      ></FzPortal
    ></DropdownMenuRoot
  >
</template>
<style scoped>
.fz-menu {
  min-width: 210px;
  padding: 6px;
}
.menu-label {
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
  padding: 10px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 11px 10px;
  border-radius: 3px;
  font-size: 13px;
  outline: none !important;
  cursor: pointer;
}
.menu-item[data-highlighted] {
  background: var(--fz-raised);
}
.menu-item[data-disabled] {
  opacity: 0.4;
  pointer-events: none;
}
.is-destructive {
  color: var(--fz-accent);
}
kbd {
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
}
</style>
