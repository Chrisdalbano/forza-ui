<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
const root = useTemplateRef<HTMLElement>("root");
let cleanup: (() => void) | undefined;
let disposed = false;
onMounted(async () => {
  const { gsap } = await import("gsap");
  if (disposed) return;
  const media = gsap.matchMedia();
  media.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(
          ".force-letter",
          {
            yPercent: 105,
            rotate: 3,
            stagger: 0.045,
            duration: 0.85,
            clearProps: "all",
          },
          0,
        )
        .from(
          ".force-mark",
          {
            opacity: 0,
            x: -28,
            scale: 0.88,
            duration: 0.55,
            clearProps: "all",
          },
          0.72,
        )
        .fromTo(
          ".force-slash",
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 0.62, ease: "power2.inOut" },
          0.25,
        )
        .to(
          ".force-slash",
          {
            clipPath: "inset(0 0 0 100%)",
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
            clearProps: "all",
          },
          0.83,
        );
    },
    root.value!,
  );
  cleanup = () => media.revert();
});
onBeforeUnmount(() => {
  disposed = true;
  cleanup?.();
});
</script>
<template>
  <div ref="root" class="force-title">
    <h1 aria-label="Forza UI">
      <span
        v-for="(letter, i) in 'FORZA'"
        :key="i"
        class="force-letter"
        aria-hidden="true"
        >{{ letter }}</span
      ><span class="force-ui" aria-hidden="true">UI</span>
    </h1>
    <img
      class="force-mark"
      src="/brand/symbol-coral.svg"
      width="180"
      height="180"
      alt=""
    />
    <svg
      class="force-slash"
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 224 C340 218 724 126 1190 36 L1116 96 C689 168 328 237 0 224Z"
      />
    </svg>
  </div>
</template>
