<script setup lang="ts">
import { computed, useId } from "vue";
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from "reka-ui";
const props = withDefaults(
  defineProps<{
    label: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    unit?: string;
    name?: string;
  }>(),
  { min: 0, max: 100, step: 1, unit: "" },
);
const model = defineModel<number>({ required: true });
defineEmits<{ commit: [value: number] }>();
const id = useId();
const bounded = computed(() =>
  Math.min(props.max, Math.max(props.min, model.value)),
);
</script>
<template>
  <div class="fz-slider">
    <div class="slider-heading">
      <span :id="id">{{ label }}</span
      ><output>{{ bounded.toLocaleString() }}{{ unit }}</output>
    </div>
    <SliderRoot
      :model-value="[bounded]"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :name="name"
      class="slider-root"
      @update:model-value="
        (value) => {
          if (value) model = value[0];
        }
      "
      @value-commit="(value) => $emit('commit', value[0])"
      ><SliderTrack class="slider-track"
        ><SliderRange class="slider-range" /></SliderTrack
      ><SliderThumb
        class="slider-thumb"
        :aria-labelledby="id"
        :aria-valuetext="bounded.toLocaleString() + unit"
    /></SliderRoot>
  </div>
</template>
<style scoped>
.slider-heading {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
}
output {
  color: var(--fz-text);
}
.slider-root {
  position: relative;
  display: flex;
  align-items: center;
  touch-action: none;
  user-select: none;
  height: 36px;
}
.slider-track {
  position: relative;
  flex: 1;
  background: var(--fz-raised);
  height: 4px;
  border-radius: 4px;
}
.slider-range {
  position: absolute;
  background: var(--fz-accent);
  height: 100%;
  border-radius: inherit;
}
.slider-thumb {
  display: block;
  width: 16px;
  height: 16px;
  border: 3px solid var(--fz-accent);
  border-radius: 50%;
  background: var(--fz-bg);
  transition: box-shadow var(--fz-motion-fast);
}
.slider-thumb:hover {
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--fz-accent) 15%, transparent);
}
.slider-root[data-disabled] {
  opacity: 0.45;
}
</style>
