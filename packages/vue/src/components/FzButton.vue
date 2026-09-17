<script setup lang="ts">
import FzIcon from "./FzIcon.vue";
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  { variant: "primary", size: "md", type: "button" },
);
</script>
<template>
  <button
    class="fz-button"
    :class="[variant, size]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <FzIcon
      v-if="loading"
      name="loader"
      :size="16"
      class="spinner"
    /><slot /><slot name="trailing" />
  </button>
</template>
<style scoped>
.fz-button {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 12px 22px;
  border: 1px solid transparent;
  border-radius: var(--fz-radius);
  background: var(--fz-button-bg);
  color: var(--fz-button-fg);
  font-weight: 600;
  transition: transform var(--fz-motion-fast) var(--fz-ease-out);
}
.fz-button:hover:not(:disabled) {
  background: var(--fz-accent-hover);
  transform: translateY(-1px);
}
.fz-button:active:not(:disabled) {
  transform: translateY(1px);
}
.secondary {
  background: transparent;
  color: var(--fz-text);
  border-color: var(--fz-border);
}
.ghost {
  background: transparent;
  color: var(--fz-text);
}
.secondary:hover:not(:disabled),
.ghost:hover:not(:disabled) {
  background: var(--fz-raised);
}
.sm {
  min-height: 36px;
  padding: 8px 14px;
  font-size: 12px;
}
.fz-button:disabled {
  opacity: 0.45;
}
.spinner {
  width: 14px;
  height: 14px;

  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
