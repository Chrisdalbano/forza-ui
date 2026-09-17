<script setup lang="ts">
import { shallowRef } from "vue";
import { FzSegmented } from "@forza";
import HeroAssembly from "./HeroAssembly.vue";
const theme = shallowRef("ink");
</script>
<template>
  <section class="presentation-section theme-study">
    <div class="theme-copy reveal">
      <h2>Different light.<br /><em>Same language.</em></h2>
      <p>
        Ink and Paper share the same structure, spacing, and interaction. Change
        the surface without resetting the work.
      </p>
      <FzSegmented
        v-model="theme"
        label="Specimen theme"
        :options="[
          { value: 'ink', label: 'Ink' },
          { value: 'paper', label: 'Paper' },
        ]"
      />
      <p class="theme-detail">
        Try adding an item, then switch themes. The collection stays yours.
      </p>
      <a class="site-link" href="/guide/theming">Work with the tokens</a>
    </div>
    <div class="theme-canvas fz-theme reveal" :data-theme="theme">
      <HeroAssembly />
    </div>
  </section>
</template>
