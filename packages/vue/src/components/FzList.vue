<script setup lang="ts" generic="T extends { id: string | number }">
import { watch } from "vue";
import { useForzaMotion } from "../composables/useForzaMotion";
const props = defineProps<{
  items: readonly T[];
  label: string;
  motionDisabled?: boolean;
  duration?: number;
}>();
defineSlots<{
  default(props: { item: T; index: number }): unknown;
  empty(): unknown;
}>();
const { parent } = useForzaMotion({
  disabled: () => props.motionDisabled,
  duration: () => props.duration,
});
// Retained leaving elements must stop accepting focus immediately.
watch(
  () => props.items.map((item) => String(item.id)),
  (keys) => {
    const active = new Set(keys);
    parent.value
      ?.querySelectorAll<HTMLElement>(":scope > [data-fz-key]")
      .forEach((element) => {
        const leaving = !active.has(element.dataset.fzKey!);
        if (leaving) {
          element.inert = true;
          element.setAttribute("aria-hidden", "true");
        }
      });
  },
  { flush: "pre" },
);
</script>
<template>
  <ul ref="parent" class="fz-list" :aria-label="label">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      :data-fz-key="item.id"
      class="fz-list-item"
    >
      <slot :item="item" :index="index" />
    </li>
    <li v-if="!items.length" key="__empty" class="fz-list-empty">
      <slot name="empty" />
    </li>
  </ul>
</template>
<style scoped>
.fz-list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}
.fz-list-item {
  min-width: 0;
}
.fz-list-empty {
  grid-column: 1/-1;
}
</style>
