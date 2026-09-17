<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef, shallowRef } from "vue";
import { FzButton, FzIcon, FzBadge, FzSwitch, FzMeter } from "@forza";
const root = useTemplateRef<HTMLElement>("root");
const precise = shallowRef(true);
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
      gsap.from(".hero-console", {
        y: 32,
        rotate: 2,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "transform",
      });
      gsap.from(".hero-emblem", {
        rotate: -12,
        scale: 0.9,
        duration: 1.4,
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
    <div class="hero-composition">
      <div class="hero-emblem" aria-hidden="true">
        <img src="/brand/symbol-coral.svg" alt="" width="280" height="280" />
      </div>
      <div class="hero-console">
        <div class="console-heading">
          <span class="console-dots" aria-hidden="true"
            ><i></i><i></i><i></i></span
          ><span>Build workspace</span><FzBadge tone="positive">Ready</FzBadge>
        </div>
        <div class="console-body">
          <div class="console-title">
            <span class="emblem-small"
              ><img src="/brand/symbol-coral.svg" alt="" width="32" height="32"
            /></span>
            <div>
              <h2>Your next idea.</h2>
              <p>Start with the right foundation.</p>
            </div>
          </div>
          <FzMeter
            label="Build confidence"
            :value="precise ? 82 : 65"
            :max="100"
          /><FzSwitch v-model="precise" label="Make every detail count" />
          <div class="console-bottom">
            <span>Vue components.<br />Your application.</span
            ><FzButton @click="precise = !precise"
              >{{ precise ? "Refine build" : "Restore build"
              }}<FzIcon name="arrowRight"
            /></FzButton>
          </div>
        </div>
      </div>
      <p class="composition-caption">A working interface. Go ahead, try it.</p>
    </div>
  </section>
</template>
