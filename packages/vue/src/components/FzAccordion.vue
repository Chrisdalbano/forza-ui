<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "reka-ui";
import FzIcon from "./FzIcon.vue";
import type { ForzaAccordionItem } from "../types";
defineProps<{
  items: readonly ForzaAccordionItem[];
  label: string;
  disabled?: boolean;
}>();
const model = defineModel<string>({ default: "" });
</script>
<template>
  <AccordionRoot
    v-model="model"
    class="fz-accordion"
    type="single"
    collapsible
    :disabled="disabled"
    :aria-label="label"
    ><AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      class="accordion-item"
      ><AccordionHeader class="accordion-heading"
        ><AccordionTrigger class="accordion-trigger"
          ><slot name="title" :item="item">{{ item.title }}</slot
          ><FzIcon name="plus" :size="18" /></AccordionTrigger></AccordionHeader
      ><AccordionContent class="accordion-content"
        ><div class="accordion-inner">
          <slot :item="item">{{ item.content }}</slot>
        </div></AccordionContent
      ></AccordionItem
    ></AccordionRoot
  >
</template>
<style scoped>
.accordion-item {
  border-bottom: 1px solid var(--fz-border);
}
.accordion-heading {
  margin: 0;
}
.accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-align: left;
  padding: 20px 0;
  border: 0;
  background: transparent;
  color: var(--fz-text);
  font-family: var(--fz-font-body);
  font-weight: 600;
  font-size: 14px;
}
.accordion-trigger .fz-icon {
  color: var(--fz-accent);
  transition: transform var(--fz-motion-layout) var(--fz-ease-out);
}
.accordion-trigger[data-state="open"] .fz-icon {
  transform: rotate(45deg);
}
.accordion-trigger:disabled {
  opacity: 0.45;
}
.accordion-inner {
  padding: 0 34px 22px 0;
  color: var(--fz-muted);
  font-size: 13px;
  line-height: 1.8;
}
.accordion-content {
  overflow: hidden;
}
.accordion-content[data-state="open"] {
  animation: fz-accordion-open var(--fz-motion-layout) var(--fz-ease-out);
}
.accordion-content[data-state="closed"] {
  animation: fz-accordion-close var(--fz-motion-exit) var(--fz-ease-in);
}
@keyframes fz-accordion-open {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
    opacity: 1;
  }
}
@keyframes fz-accordion-close {
  from {
    height: var(--reka-accordion-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}
</style>
