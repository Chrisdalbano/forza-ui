<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { FzIcon } from "@forza";
import HeroAssembly from "./HeroAssembly.vue";
const root = useTemplateRef<HTMLElement>("root");

let cleanup: (() => void) | undefined;
let disposed = false;
onMounted(async () => {
  const { gsap } = await import("gsap");
  if (disposed) return;
  const mm = gsap.matchMedia();
  mm.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      gsap.from(".hero-line", {
        y: 60,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform",
      });
      gsap.from(".assembly-piece", {
        y: 44,
        rotate: 3,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
        clearProps: "transform",
      });
    },
    root.value!,
  );
  cleanup = () => mm.revert();
});
onBeforeUnmount(() => {
  disposed = true;
  cleanup?.();
});
</script>
<template>
  <section ref="root" class="landing-hero">
    <div class="hero-editorial">
      <p class="kicker">
        <span class="status-dot"></span>Forza UI / Open-source Vue library
      </p>
      <h1>
        <span class="hero-line">A little more</span
        ><span class="hero-line"><em>force.</em></span>
      </h1>
      <p class="hero-description">
        Components with character.<br />The control to make them your own.
      </p>
      <div class="hero-links">
        <a class="site-button" href="/guide/installation"
          >Start building <FzIcon name="arrowUpRight" /></a
        ><a class="site-link" href="/playground"
          >Try the playground <FzIcon name="arrowRight"
        /></a>
      </div>
      <p class="hero-support">
        Typed APIs. Considered motion. Made for the details of real apps.
      </p>
    </div>
    <HeroAssembly />
  </section>
</template>
