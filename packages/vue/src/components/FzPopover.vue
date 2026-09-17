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
        :side-offset="10"
        :aria-label="label"
        ><slot :close="() => (open = false)" /></PopoverContent></FzPortal
  ></PopoverRoot>
</template>
<style scoped>
.fz-popover {
  width: min(320px, calc(100vw - 32px));
  padding: 20px;
  font-size: 13px;
  line-height: 1.7;
}
</style>
