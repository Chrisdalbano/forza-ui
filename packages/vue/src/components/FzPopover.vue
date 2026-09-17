<script setup lang="ts">
import { PopoverRoot, PopoverTrigger, PopoverContent } from "reka-ui";
import FzPortal from "../internal/FzPortal.vue";
import FzButton from "./FzButton.vue";
defineProps<{ label: string }>();
const open = defineModel<boolean>("open", { default: false });
</script>
<template>
  <PopoverRoot v-model:open="open"
    ><PopoverTrigger as-child
      ><slot name="trigger"
        ><FzButton variant="secondary">{{ label }}</FzButton></slot
      ></PopoverTrigger
    ><FzPortal
      ><PopoverContent
        class="fz-floating fz-popover"
        :side-offset="12"
        :collision-padding="16"
        :aria-label="label"
        ><div class="popover-body">
          <slot
            :close="() => (open = false)"
          /></div></PopoverContent></FzPortal
  ></PopoverRoot>
</template>
<style scoped>
.popover-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.popover-body :deep(p),
.popover-body :deep(h3),
.popover-body :deep(h4) {
  margin: 0;
}
</style>

<!-- Portal roots pass through Reka wrappers; namespace these rules instead of relying on scope attributes. -->
<style>
.fz-theme .fz-popover {
  width: min(360px, calc(100vw - 32px));
  padding: 24px;
  font-size: 14px;
  line-height: 1.7;
}
</style>
