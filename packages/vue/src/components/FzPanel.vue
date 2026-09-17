<script setup lang="ts">
defineProps<{ title?: string; eyebrow?: string }>();
</script>
<template>
  <section class="fz-panel">
    <header v-if="title || eyebrow">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h3 v-if="title">{{ title }}</h3>
      <slot name="action" />
    </header>
    <slot />
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>
<style scoped>
.fz-panel {
  background: var(--fz-panel-bg);
  border: 1px solid var(--fz-border);
  padding: var(--fz-space-6);
  border-radius: var(--fz-radius);
}
header {
  margin-bottom: 24px;
}
h3 {
  font: 600 27px/1.1 var(--fz-font-display);
  text-transform: uppercase;
  margin: 8px 0;
}
.eyebrow {
  font: 12px var(--fz-font-mono);
  letter-spacing: 0.1em;
  color: var(--fz-muted);
}
footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--fz-border);
}
</style>
