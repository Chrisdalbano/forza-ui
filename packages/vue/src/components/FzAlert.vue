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
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--fz-border);
  border-radius: 6px;
  background: var(--fz-surface);
  font-size: 14px;
  line-height: 1.6;
}
.fz-alert[data-tone="success"] {
  --alert-icon: var(--fz-positive);
}
.fz-alert[data-tone="info"] {
  --alert-icon: var(--fz-info);
}
.fz-alert[data-tone="warning"] {
  --alert-icon: var(--fz-warning);
}
.fz-alert[data-tone="danger"] {
  --alert-icon: var(--fz-accent);
}
.fz-alert-body {
  color: var(--fz-muted);
  margin-top: 4px;
}
.fz-alert svg {
  margin-top: 2px;
  flex-shrink: 0;
  color: var(--alert-icon, var(--fz-info));
}
</style>
