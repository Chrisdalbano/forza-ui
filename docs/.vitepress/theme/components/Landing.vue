<script setup lang="ts">
import LandingHero from "./LandingHero.vue";
import BrandScene from "./BrandScene.vue";
import MotionStory from "./MotionStory.vue";
import ComponentGateway from "./ComponentGateway.vue";
import SiteFooter from "./SiteFooter.vue";
</script>
<template>
  <main class="landing">
    <LandingHero />
    <div class="feature-ribbon">
      <span>Vue 3.5 + Nuxt</span><span>25 typed components</span
      ><span>Ink + Paper themes</span><span>MIT licensed</span>
    </div>
    <BrandScene /><MotionStory /><ComponentGateway /><SiteFooter />
  </main>
</template>
