<script setup lang="ts" generic="T extends { id: string | number }">
import { watch, onBeforeUnmount } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import FzButton from "./FzButton.vue";
import FzIcon from "./FzIcon.vue";
withDefaults(defineProps<{ items: readonly T[]; label: string }>(), {});
const index = defineModel<number>({ default: 0 });
const [viewport, api] = emblaCarouselVue({ loop: false });
function sync() {
  index.value = api.value?.selectedScrollSnap() ?? 0;
}
watch(api, (instance) => {
  if (instance) {
    instance.on("select", sync);
    instance.on("reInit", sync);
    instance.scrollTo(index.value, true);
  }
});
watch(index, (n) =>
  api.value?.scrollTo(
    n,
    typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  ),
);
onBeforeUnmount(() => {
  api.value?.off("select", sync);
  api.value?.off("reInit", sync);
});
</script>
<template>
  <section
    class="fz-carousel"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
  >
    <div ref="viewport" class="fz-carousel-viewport">
      <div class="fz-carousel-track">
        <div
          v-for="(item, i) in items"
          :key="item.id"
          class="fz-carousel-slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="i + 1 + ' of ' + items.length"
          :inert="i !== index"
          :aria-hidden="i !== index"
        >
          <slot :item="item" :index="i" />
        </div>
      </div>
    </div>
    <div class="fz-carousel-controls">
      <FzButton
        variant="ghost"
        size="sm"
        :disabled="index <= 0"
        aria-label="Previous slide"
        @click="index--"
        ><FzIcon name="arrowLeft" /></FzButton
      ><span class="fz-carousel-count" aria-live="polite"
        >{{ items.length ? index + 1 : 0 }} / {{ items.length }}</span
      ><FzButton
        variant="ghost"
        size="sm"
        :disabled="index >= items.length - 1"
        aria-label="Next slide"
        @click="index++"
        ><FzIcon name="arrowRight"
      /></FzButton>
    </div>
  </section>
</template>
<style scoped>
.fz-carousel {
  min-width: 0;
  max-width: 100%;
}
.fz-carousel-viewport {
  overflow: hidden;
  touch-action: pan-y pinch-zoom;
}
.fz-carousel-track {
  display: flex;
}
.fz-carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
  padding: 2px;
}
.fz-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 16px;
}
.fz-carousel-count {
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
}
</style>
