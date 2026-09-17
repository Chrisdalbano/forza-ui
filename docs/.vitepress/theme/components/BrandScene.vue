<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { FzIcon } from "@forza";
const root = useTemplateRef<HTMLElement>("root");
let cleanup: (() => void) | undefined;
let stopped = false;
const tiles = [
  {
    number: "01",
    title: "Shape the input.",
    detail: "Clear controls. Your state.",
    icon: "settings" as const,
  },
  {
    number: "02",
    title: "Keep it moving.",
    detail: "Changes with context.",
    icon: "arrowRight" as const,
  },
  {
    number: "03",
    title: "Make it yours.",
    detail: "One theme. Every detail.",
    icon: "sun" as const,
  },
  {
    number: "04",
    title: "Build with intent.",
    detail: "Typed, composable Vue.",
    icon: "check" as const,
  },
];
onMounted(async () => {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  if (stopped) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add(
    "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.value,
          start: "top 72px",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
      tl.fromTo(
        ".scene-symbol",
        { scale: 1.1, rotate: -12, opacity: 1 },
        { scale: 0.3, rotate: 10, opacity: 0, duration: 1 },
        0,
      );
      tl.from(".scene-title", { y: 35, opacity: 0.35, duration: 0.7 }, 0);
      tl.from(
        ".scene-tile",
        {
          scale: 0.65,
          opacity: 0,
          y: 130,
          rotateX: 25,
          stagger: 0.12,
          duration: 0.9,
          ease: "power2.out",
        },
        0.2,
      );
      tl.fromTo(
        ".scene-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "none" },
        0,
      );
    },
    root.value!,
  );
  cleanup = () => mm.revert();
});
onBeforeUnmount(() => {
  stopped = true;
  cleanup?.();
});
</script>
<template>
  <section ref="root" class="brand-scene">
    <div class="scene-sticky">
      <div class="scene-title">
        <p class="kicker">Form is only the beginning.</p>
        <h2>Build something<br /><em>worth feeling.</em></h2>
      </div>
      <div class="scene-composition">
        <img
          class="scene-symbol"
          src="/brand/symbol-coral.svg"
          alt=""
          aria-hidden="true"
          width="400"
          height="400"
        />
        <div class="scene-tiles">
          <article v-for="tile in tiles" :key="tile.number" class="scene-tile">
            <div>
              <span>{{ tile.number }}</span
              ><FzIcon :name="tile.icon" :size="26" />
            </div>
            <h3>{{ tile.title }}</h3>
            <p>{{ tile.detail }}</p>
          </article>
        </div>
      </div>
      <div class="scene-rule" aria-hidden="true"></div>
    </div>
  </section>
</template>
