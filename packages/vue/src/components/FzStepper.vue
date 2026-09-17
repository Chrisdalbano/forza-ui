<script setup lang="ts">
import {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
} from "reka-ui";
import FzIcon from "./FzIcon.vue";
import type { ForzaStep } from "../types";
withDefaults(
  defineProps<{
    steps: readonly ForzaStep[];
    label: string;
    linear?: boolean;
  }>(),
  { linear: true },
);
const model = defineModel<number>({ required: true });
</script>
<template>
  <StepperRoot
    :model-value="model"
    :linear="linear"
    :aria-label="label"
    class="fz-stepper"
    @update:model-value="
      (value) => {
        if (value !== undefined) model = value;
      }
    "
    ><StepperItem
      v-for="(step, index) in steps"
      :key="step.title"
      :step="index + 1"
      :disabled="step.disabled"
      class="step-item"
      ><StepperTrigger class="step-trigger"
        ><StepperIndicator class="step-indicator"
          ><FzIcon v-if="model > index + 1" name="check" :size="16" /><span
            v-else
            >{{ index + 1 }}</span
          ></StepperIndicator
        ><span class="step-copy"
          ><StepperTitle as="span" class="step-title">{{
            step.title
          }}</StepperTitle
          ><StepperDescription
            as="span"
            v-if="step.description"
            class="step-description"
            >{{ step.description }}</StepperDescription
          ></span
        ></StepperTrigger
      ></StepperItem
    ></StepperRoot
  >
</template>
<style scoped>
.fz-stepper {
  display: flex;
  gap: 12px;
  width: 100%;
  margin: 8px 0 28px;
}
.step-item {
  flex: 1;
  min-width: 0;
  position: relative;
}
.step-trigger {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  border: 0;
  border-top: 2px solid var(--fz-border);
  background: transparent;
  color: var(--fz-muted);
  padding: 16px 0 0;
  transition: border-color var(--fz-motion-layout);
}
.step-indicator {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  border: 1px solid var(--fz-border);
  border-radius: 50%;
  font: 12px var(--fz-font-mono);
}
.step-copy {
  display: grid;
  gap: 5px;
}
.step-title {
  font-size: 12px;
  font-weight: 600;
}
.step-description {
  font-size: 12px;
}
.step-item[data-state="active"] .step-trigger {
  color: var(--fz-text);
  border-color: var(--fz-accent);
}
.step-item[data-state="active"] .step-indicator {
  background: var(--fz-accent);
  border-color: var(--fz-accent);
  color: var(--fz-on-accent);
}
.step-item[data-state="completed"] .step-trigger {
  border-color: var(--fz-positive);
}
.step-item[data-state="completed"] .step-indicator {
  color: var(--fz-positive);
  border-color: var(--fz-positive);
}
.step-trigger:disabled {
  cursor: not-allowed;
}
.step-item[data-disabled] .step-trigger {
  opacity: 0.45;
}
@media (max-width: 600px) {
  .step-trigger {
    align-items: start;
    flex-direction: column;
    gap: 8px;
  }
  .step-description {
    display: none;
  }
}
</style>
