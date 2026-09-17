<script setup lang="ts">
import { useId } from "vue";
import FzIcon from "./FzIcon.vue";
defineOptions({ inheritAttrs: false });
defineProps<{
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "search" | "email";
}>();
const model = defineModel<string>({ required: true });
const id = useId();
</script>
<template>
  <div
    class="fz-field"
    :class="{ 'is-invalid': !!error, 'is-disabled': disabled }"
  >
    <label :for="id" class="field-label">{{ label }}</label>
    <div class="field-control">
      <span v-if="$slots.leading || type === 'search'" class="field-leading"
        ><slot name="leading"><FzIcon name="search" :size="16" /></slot></span
      ><input
        :id="id"
        v-model="model"
        v-bind="$attrs"
        class="fz-input"
        :type="type || 'text'"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-invalid="!!error"
        :aria-describedby="hint || error ? id + '-hint' : undefined"
      /><slot name="trailing" />
    </div>
    <div
      v-if="hint || error"
      :id="id + '-hint'"
      class="field-message"
      :aria-live="error ? 'polite' : undefined"
    >
      <Transition name="fz-state" mode="out-in"
        ><small :key="error || hint" :class="{ error }">{{
          error || hint
        }}</small></Transition
      >
    </div>
  </div>
</template>
<style scoped>
.fz-field {
  display: grid;
  gap: 9px;
}
.field-label {
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
}
.fz-field:focus-within .field-label {
  color: var(--fz-text);
}
.field-control {
  display: flex;
  align-items: center;
  position: relative;
  min-height: 46px;
  border: 1px solid var(--fz-border);
  border-radius: var(--fz-radius);
  background: var(--fz-field-bg);
  transition:
    border-color var(--fz-motion-fast) var(--fz-ease-out),
    background-color var(--fz-motion-enter) var(--fz-ease-out),
    box-shadow var(--fz-motion-enter) var(--fz-ease-out);
}
.field-control::after {
  content: "";
  position: absolute;
  inset: auto 10px -1px;
  height: 2px;
  background: var(--fz-accent);
  transform: scaleX(0);
  transform-origin: left;
  pointer-events: none;
  transition: transform var(--fz-motion-enter) var(--fz-ease-out);
}
.field-control:hover:not(:focus-within) {
  border-color: var(--fz-muted);
}
.field-control:focus-within {
  border-color: var(--fz-accent);
  background: color-mix(in srgb, var(--fz-accent) 4%, var(--fz-field-bg));
  box-shadow: inset 0 0 0 1px
    color-mix(in srgb, var(--fz-accent) 32%, transparent);
}
.field-control:focus-within::after {
  transform: scaleX(1);
}
.field-label,
.field-leading {
  transition: color var(--fz-motion-fast) var(--fz-ease-out);
}
.is-disabled .field-control:hover {
  border-color: var(--fz-border);
}
.field-leading {
  padding-left: 14px;
  color: var(--fz-muted);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.field-control:focus-within .field-leading {
  color: var(--fz-accent);
}
.fz-input {
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: var(--fz-text);
  appearance: none;
}
.fz-field .fz-input:focus,
.fz-field .fz-input:focus-visible {
  outline: none;
  box-shadow: none;
}
.field-leading + .fz-input {
  padding-left: 10px;
}
.fz-input::-webkit-search-cancel-button {
  appearance: none;
}
.field-message {
  min-height: 17px;
  font-size: 12px;
  color: var(--fz-muted);
}
.field-message small {
  display: block;
  font-size: inherit;
}
.error {
  color: var(--fz-accent);
}
.is-invalid .field-control {
  border-color: var(--fz-accent);
}
.is-disabled {
  opacity: 0.5;
}
.is-disabled .fz-input {
  cursor: not-allowed;
}
@media (forced-colors: active) {
  .field-control:focus-within {
    outline: 2px solid Highlight;
    outline-offset: -2px;
  }
  .field-control::after {
    display: none;
  }
}
</style>
