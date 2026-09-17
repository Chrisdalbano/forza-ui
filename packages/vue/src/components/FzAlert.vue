<script setup lang="ts">
import FzIcon from "./FzIcon.vue";
withDefaults(
  defineProps<{
    title: string;
    tone?: "info" | "success" | "warning" | "danger";
  }>(),
  { tone: "info" },
);
</script>
<template>
  <div
    class="fz-alert"
    :data-tone="tone"
    :role="tone === 'danger' ? 'alert' : 'status'"
  >
    <FzIcon :name="tone === 'success' ? 'check' : 'info'" />
    <div>
      <strong>{{ title }}</strong>
      <div v-if="$slots.default" class="fz-alert-body"><slot /></div>
    </div>
  </div>
</template>
<style scoped>
.fz-alert {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--fz-border);
  border-left: 3px solid var(--fz-accent);
  border-radius: 4px;
  background: var(--fz-surface);
  font-size: 13px;
  line-height: 1.6;
}
.fz-alert[data-tone="success"] {
  border-left-color: var(--fz-positive);
}
.fz-alert[data-tone="info"] {
  border-left-color: var(--fz-info);
}
.fz-alert[data-tone="warning"] {
  border-left-color: var(--fz-warning);
}
.fz-alert[data-tone="danger"] {
  border-left-color: var(--fz-accent);
}
.fz-alert-body {
  color: var(--fz-muted);
  margin-top: 4px;
}
.fz-alert svg {
  margin-top: 2px;
}
</style>
