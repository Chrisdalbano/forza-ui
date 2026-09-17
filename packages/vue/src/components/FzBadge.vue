<script setup lang="ts">
withDefaults(
  defineProps<{ tone?: "neutral" | "positive" | "warning" | "accent" }>(),
  { tone: "neutral" },
);
</script>
<template>
  <span class="fz-badge" :class="tone"
    ><span class="badge-dot" aria-hidden="true" /><slot
  /></span>
</template>
<style scoped>
.fz-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 12px var(--fz-font-mono);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--fz-muted);
}
.positive {
  color: var(--fz-positive);
}
.warning {
  color: var(--fz-warning);
}
.accent {
  color: var(--fz-accent);
}
.badge-dot {
  display: block;
  width: 5px;
  height: 5px;
  flex: none;
  border-radius: 50%;
  background: currentColor;
}
</style>
