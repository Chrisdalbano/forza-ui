<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
const props = defineProps<{ name: string }>();
const Forms = defineAsyncComponent(() => import("./examples/FormExamples.vue"));
const Navigation = defineAsyncComponent(
  () => import("./examples/NavigationExamples.vue"),
);
const Overlays = defineAsyncComponent(
  () => import("./examples/OverlayExamples.vue"),
);
const Data = defineAsyncComponent(() => import("./examples/DataExamples.vue"));
const Basics = defineAsyncComponent(
  () => import("./examples/BasicExamples.vue"),
);
const group = computed(() =>
  ["Field", "Select", "Slider", "Checkbox", "Switch"].includes(props.name)
    ? Forms
    : [
          "Tabs",
          "Segmented",
          "Stepper",
          "Pagination",
          "Accordion",
          "Carousel",
        ].includes(props.name)
      ? Navigation
      : ["Dialog", "Drawer", "Dropdown", "Popover", "Tooltip"].includes(
            props.name,
          )
        ? Overlays
        : ["Table", "List"].includes(props.name)
          ? Data
          : Basics,
);
</script>
<template>
  <div class="component-preview not-prose">
    <component :is="group" :key="name" :name="name" />
  </div>
</template>
