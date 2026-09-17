<script setup lang="ts">
defineProps<{ label: string; disabled?: boolean }>();
const model = defineModel<boolean>({ required: true });
</script>
<template>
  <button
    type="button"
    role="switch"
    :aria-checked="model"
    :disabled="disabled"
    class="fz-switch"
    @click="model = !model"
  >
    <span class="track" :class="{ on: model }"><span /></span
    ><span>{{ label }}</span>
  </button>
</template>
<style scoped>
.fz-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  border: 0;
  background: transparent;
  color: var(--fz-text);
  font-size: 12px;
}
.track {
  width: 34px;
  height: 20px;
  background: var(--fz-raised);
  border: 1px solid var(--fz-border);
  padding: 3px;
  border-radius: 10px;
  transition: background var(--fz-motion-fast);
  flex-shrink: 0;
}
.track span {
  display: block;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: var(--fz-muted);
  transition: transform var(--fz-motion-layout) var(--fz-ease-out);
}
.on {
  background: var(--fz-accent);
  border-color: var(--fz-accent);
}
.on span {
  background: var(--fz-on-accent);
  transform: translateX(14px);
}
button:disabled {
  opacity: 0.45;
}
</style>
