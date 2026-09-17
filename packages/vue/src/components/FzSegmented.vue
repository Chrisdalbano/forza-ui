<script setup lang="ts">
import { useActiveIndicator } from "../composables/useActiveIndicator";
defineProps<{
  label: string;
  options: readonly { value: string; label: string }[];
}>();
const model = defineModel<string>({ required: true });
const { track, indicator } = useActiveIndicator(model);
</script>
<template>
  <div ref="track" class="fz-segmented" role="group" :aria-label="label">
    <span
      class="segment-indicator"
      :style="indicator"
      aria-hidden="true"
    /><button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="model === option.value"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>
<style scoped>
.fz-segmented {
  position: relative;
  display: inline-flex;
  align-items: center;
  isolation: isolate;
  gap: 2px;
  background: var(--fz-bg);
  padding: 4px;
  border: 1px solid var(--fz-border);
  border-radius: 5px;
}
.segment-indicator {
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 1px;
  transform-origin: left;
  background: var(--fz-raised);
  z-index: -1;
  transition: transform var(--fz-motion-layout) var(--fz-ease-out);
  pointer-events: none;
}
.fz-segmented button {
  min-height: 38px;
  padding: 8px 14px;
  border: 0;
  background: transparent;
  color: var(--fz-muted);
  font-size: 12px;
  white-space: nowrap;
}
.fz-segmented button[aria-pressed="true"] {
  color: var(--fz-text);
}
@media (max-width: 640px) {
  .fz-segmented button {
    padding-inline: 10px;
    flex: 1;
  }
}
</style>
