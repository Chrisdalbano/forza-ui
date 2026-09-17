<script setup lang="ts">
import { shallowRef, onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { FzIcon, FzBadge, FzMeter } from "@forza";
const root = useTemplateRef<HTMLElement>("root");
const active = shallowRef(0);
let cleanup: (() => void) | undefined;
let disposed = false;
const chapters = [
  {
    title: "Make a choice.",
    text: "Clear labels, a single focus ring, and controls that respond to your input.",
    icon: "plus" as const,
    label: "Create",
    detail: "A starting point that feels like yours.",
  },
  {
    title: "Keep your place.",
    text: "Add, remove, and reorder. The surrounding interface moves with your changes.",
    icon: "settings" as const,
    label: "Refine",
    detail: "Every change keeps its context.",
  },
  {
    title: "Move with confidence.",
    text: "Dialogs manage focus. Feedback explains what happened. Reduced motion is respected.",
    icon: "check" as const,
    label: "Commit",
    detail: "Ready for the next step.",
  },
];
onMounted(async () => {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  if (disposed) return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    root.value?.querySelectorAll(".story-chapter").forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => (active.value = index),
        onEnterBack: () => (active.value = index),
      });
    });
  }, root.value!);
  cleanup = () => ctx.revert();
});
onBeforeUnmount(() => {
  disposed = true;
  cleanup?.();
});
</script>
<template>
  <section ref="root" class="motion-story">
    <div class="story-intro">
      <p class="kicker">Made for the moments between.</p>
      <h2>Small actions.<br /><em>A clear next move.</em></h2>
    </div>
    <div class="story-grid">
      <div class="story-chapters">
        <article
          v-for="(chapter, i) in chapters"
          :key="chapter.label"
          class="story-chapter"
          :class="{ current: active === i }"
        >
          <span class="chapter-number">0{{ i + 1 }}</span>
          <h3>{{ chapter.title }}</h3>
          <p>{{ chapter.text }}</p>
        </article>
      </div>
      <div class="story-sticky">
        <div class="story-surface">
          <div class="story-tabs" aria-label="Workflow stages">
            <button
              v-for="(chapter, i) in chapters"
              :key="chapter.label"
              :aria-pressed="active === i"
              @click="active = i"
            >
              {{ chapter.label }}
            </button>
          </div>
          <Transition name="story" mode="out-in"
            ><div :key="active" class="story-state">
              <div class="story-symbol">
                <FzIcon :name="chapters[active]!.icon" :size="38" />
              </div>
              <FzBadge :tone="active === 2 ? 'positive' : 'accent'">{{
                active === 2 ? "Ready to build" : "In progress"
              }}</FzBadge>
              <h3>{{ chapters[active]!.title }}</h3>
              <p>{{ chapters[active]!.detail }}</p>
              <div class="story-stack">
                <div v-for="n in active + 1" :key="n">
                  <FzIcon name="check" :size="16" /><span>{{
                    ["Foundation selected", "Details refined", "Build saved"][
                      n - 1
                    ]
                  }}</span>
                </div>
              </div>
              <FzMeter
                label="Workflow progress"
                :value="active + 1"
                :max="3"
              /></div
          ></Transition>
        </div>
        <p class="story-caption">Scroll to explore, or choose a stage above.</p>
      </div>
    </div>
  </section>
</template>
