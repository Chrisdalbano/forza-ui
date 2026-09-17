<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    value: number;
    max?: number;
    label: string;
    tone?: "positive" | "accent" | "warning";
  }>(),
  { max: 100, tone: "positive" },
);
const safeMax = computed(() => Math.max(1, props.max));
const safeValue = computed(() =>
  Math.max(0, Math.min(props.value, safeMax.value)),
);
const width = computed(() => (100 * safeValue.value) / safeMax.value);
</script>
<template>
  <div
    class="meter"
    role="meter"
    :aria-label="label"
    :aria-valuenow="safeValue"
    :aria-valuemin="0"
    :aria-valuemax="safeMax"
  >
    <span
      :style="{ width: width + '%', background: 'var(--fz-' + tone + ')' }"
    />
  </div>
</template>
<style scoped>
.meter {
  height: 5px;
  background: var(--fz-raised);
  overflow: hidden;
}
.meter span {
  display: block;
  height: 100%;
  transition: width var(--fz-duration);
}
</style>
