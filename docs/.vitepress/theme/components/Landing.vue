<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import PresentationHero from "./PresentationHero.vue";
import ComponentExhibit from "./ComponentExhibit.vue";
import ThemeStudy from "./ThemeStudy.vue";
import LibraryPosition from "./LibraryPosition.vue";
import SiteFooter from "./SiteFooter.vue";
import "../presentation.css";
const root = useTemplateRef<HTMLElement>("root");
let dispose: (() => void) | undefined;
let stopped = false;
onMounted(async () => {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  if (stopped) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      root.value
        ?.querySelectorAll(".presentation-section")
        .forEach((section) => {
          gsap.from(section.querySelectorAll(".reveal"), {
            y: 44,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: { trigger: section, start: "top 88%", once: true },
          });
        });
    },
    root.value!,
  );
  dispose = () => media.revert();
});
onBeforeUnmount(() => {
  stopped = true;
  dispose?.();
});
</script>
<template>
  <main ref="root" class="presentation">
    <PresentationHero /><ComponentExhibit /><ThemeStudy /><LibraryPosition /><SiteFooter />
  </main>
</template>
