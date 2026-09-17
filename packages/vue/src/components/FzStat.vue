<script setup lang="ts">
defineProps<{ label: string; value: string; detail?: string }>();
</script>
<template>
  <div class="fz-stat">
    <span>{{ label }}</span
    ><strong>{{ value }}</strong
    ><small v-if="detail">{{ detail }}</small>
  </div>
</template>
<style scoped>
.fz-stat {
  display: grid;
  gap: 10px;
}
.fz-stat span {
  font: 12px var(--fz-font-mono);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--fz-muted);
}
strong {
  font: 600 44px/1 var(--fz-font-display);
  font-variant-numeric: tabular-nums;
}
small {
  font-size: 12px;
  color: var(--fz-muted);
}
</style>
