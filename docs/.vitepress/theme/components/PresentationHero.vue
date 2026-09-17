<script setup lang="ts">
import HeroWordmark from "./HeroWordmark.vue";
import { FzIcon } from "@forza";
import { componentCatalog } from "../componentCatalog";
import library from "../../../../packages/vue/package.json";
</script>
<template>
  <section class="presentation-hero">
    <HeroWordmark />
    <div class="hero-statement">
      <h2>Give your interface<br /><em>some conviction.</em></h2>
      <div>
        <p>
          A Vue component library with a defined point of view. Sharp
          typography, tactile controls, and motion that follows your state.
        </p>
        <div class="presentation-actions">
          <a class="site-button" href="#components"
            >Try the components <FzIcon name="arrowRight" /></a
          ><a class="site-link" href="/guide/installation"
            >Install Forza <FzIcon name="arrowUpRight"
          /></a>
        </div>
      </div>
    </div>
    <div class="release-line">
      <span>{{ componentCatalog.length }} components / Vue + Nuxt</span
      ><a
        :href="
          'https://github.com/Chrisdalbano/forza-ui/releases/tag/v' +
          library.version
        "
        >v{{ library.version }} / MIT licensed
        <FzIcon name="arrowUpRight" :size="16"
      /></a>
    </div>
  </section>
</template>
