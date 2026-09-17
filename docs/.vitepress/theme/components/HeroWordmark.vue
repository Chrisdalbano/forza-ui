<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
const root = useTemplateRef<HTMLElement>("root");
let cleanup: (() => void) | undefined;
let disposed = false;
onMounted(async () => {
  const { gsap } = await import("gsap");
  if (disposed) return;
  const element = root.value!;
  const mark = element.querySelector<HTMLImageElement>(".force-mark")!;
  const slash = element.querySelector<SVGSVGElement>(".force-slash")!;
  const path = slash.querySelector("path")!;
  // Layout offsets exclude the mark's entrance transform. Keep the tip on
  // the solid middle bar of the symbol as fonts and viewport sizes change.
  const alignSlash = () => {
    const width = element.clientWidth;
    const height = slash.clientHeight;
    const x = mark.offsetLeft + mark.offsetWidth * 0.5;
    const y = mark.offsetTop + mark.offsetHeight * (60 / 128);
    const start = height * 0.8;
    slash.setAttribute("viewBox", `0 0 ${width} ${height}`);
    path.setAttribute("d", `M0 ${start} C${x * 0.3} ${start} ${x * 0.7} ${y + 18} ${x} ${y} L${x * 0.91} ${y + 24} C${x * 0.64} ${y + 38} ${x * 0.28} ${start + 12} 0 ${start}Z`);
  };
  const observer = new ResizeObserver(alignSlash);
  observer.observe(element);
  observer.observe(mark);
  alignSlash();
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
  cleanup = () => {
    observer.disconnect();
    media.revert();
  };
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
