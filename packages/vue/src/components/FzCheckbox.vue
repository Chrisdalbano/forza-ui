<script setup lang="ts">
import { useId } from "vue";
import { CheckboxRoot, CheckboxIndicator } from "reka-ui";
import FzIcon from "./FzIcon.vue";
defineProps<{
  label: string;
  description?: string;
  disabled?: boolean;
  name?: string;
}>();
const model = defineModel<boolean | "indeterminate">({ required: true });
const id = useId();
</script>
<template>
  <div class="fz-checkbox">
    <CheckboxRoot
      :id="id"
      v-model="model"
      :disabled="disabled"
      :name="name"
      :aria-describedby="description ? id + '-description' : undefined"
      class="checkbox-control"
      ><CheckboxIndicator force-mount class="checkbox-indicator"
        ><FzIcon
          :name="model === 'indeterminate' ? 'minus' : 'check'"
          :size="13" /></CheckboxIndicator
    ></CheckboxRoot>
    <div>
      <label :for="id">{{ label }}</label>
      <p v-if="description" :id="id + '-description'">{{ description }}</p>
    </div>
  </div>
</template>
<style scoped>
.fz-checkbox {
  display: flex;
  align-items: start;
  gap: 12px;
  min-height: 38px;
}
.checkbox-control {
  display: grid;
  place-items: center;
  width: 19px;
  height: 19px;
  flex: none;
  padding: 0;
  margin-top: 2px;
  border: 1px solid var(--fz-border);
  border-radius: 3px;
  background: var(--fz-bg);
  color: var(--fz-on-accent);
  transition:
    background-color 200ms var(--fz-ease-out),
    border-color 200ms var(--fz-ease-out),
    transform var(--fz-motion-fast) var(--fz-ease-out);
}
.checkbox-control:hover:not(:disabled) {
  border-color: var(--fz-accent);
}
.checkbox-control:active:not(:disabled) {
  transform: scale(0.94);
}
.checkbox-indicator {
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(0.7);
  transition:
    opacity 180ms var(--fz-ease-out),
    transform 240ms var(--fz-ease-out);
}
.checkbox-indicator[data-state="checked"],
.checkbox-indicator[data-state="indeterminate"] {
  opacity: 1;
  transform: scale(1);
}
.checkbox-indicator :deep(path) {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  transition: stroke-dashoffset 240ms var(--fz-ease-out);
}
.checkbox-indicator[data-state="checked"] :deep(path),
.checkbox-indicator[data-state="indeterminate"] :deep(path) {
  stroke-dashoffset: 0;
}
.checkbox-control[data-state="checked"],
.checkbox-control[data-state="indeterminate"] {
  background: var(--fz-accent);
  border-color: var(--fz-accent);
}
.checkbox-control:disabled {
  opacity: 0.4;
}
.checkbox-control:disabled + div {
  opacity: 0.5;
}
label {
  font-size: 13px;
  cursor: pointer;
}
p {
  font-size: 12px !important;
  color: var(--fz-muted);
  margin: 4px 0 0;
}
</style>
