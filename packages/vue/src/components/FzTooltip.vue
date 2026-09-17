<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "reka-ui";
import FzPortal from "../internal/FzPortal.vue";
withDefaults(defineProps<{ text: string; delay?: number }>(), { delay: 250 });
</script>
<template>
  <TooltipProvider :delay-duration="delay"
    ><TooltipRoot
      ><TooltipTrigger as-child><slot /></TooltipTrigger
      ><FzPortal
        ><TooltipContent class="fz-floating fz-tooltip" :side-offset="8">{{
          text
        }}</TooltipContent></FzPortal
      ></TooltipRoot
    ></TooltipProvider
  >
</template>

<!-- Portal roots pass through Reka wrappers; namespace these rules instead of relying on scope attributes. -->
<style>
.fz-theme .fz-tooltip {
  padding: 8px 12px;
  max-width: 260px;
  font-size: 12px;
  line-height: 1.5;
}
</style>
