<script setup lang="ts">
import { computed, watch } from "vue";
import FzButton from "./FzButton.vue";
import FzIcon from "./FzIcon.vue";
const props = withDefaults(
  defineProps<{ total: number; pageSize?: number; label?: string }>(),
  { pageSize: 5, label: "Pagination" },
);
const page = defineModel<number>({ required: true });
const count = computed(() =>
  Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))),
);
const pages = computed(() =>
  Array.from(
    new Set([1, page.value - 1, page.value, page.value + 1, count.value]),
  )
    .filter((n) => n > 0 && n <= count.value)
    .sort((a, b) => a - b),
);
watch(count, (n) => {
  if (page.value > n) page.value = n;
});
</script>
<template>
  <nav class="fz-pagination" :aria-label="label">
    <FzButton
      size="sm"
      variant="ghost"
      :disabled="page <= 1"
      aria-label="Previous page"
      @click="page--"
      ><FzIcon name="arrowLeft" /></FzButton
    ><template v-for="(n, i) in pages" :key="n"
      ><span v-if="i && n > (pages[i - 1] ?? 0) + 1" aria-hidden="true">…</span
      ><FzButton
        size="sm"
        :variant="page === n ? 'primary' : 'ghost'"
        :aria-label="'Page ' + n"
        :aria-current="page === n ? 'page' : undefined"
        @click="page = n"
        >{{ n }}</FzButton
      ></template
    ><FzButton
      size="sm"
      variant="ghost"
      :disabled="page >= count"
      aria-label="Next page"
      @click="page++"
      ><FzIcon name="arrowRight"
    /></FzButton>
  </nav>
</template>
<style scoped>
.fz-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
