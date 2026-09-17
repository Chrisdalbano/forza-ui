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
      ><CheckboxIndicator
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
