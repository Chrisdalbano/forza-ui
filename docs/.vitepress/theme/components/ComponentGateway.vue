<script setup lang="ts">
import { FzIcon } from "@forza";
const groups = [
  {
    name: "Collect the right input.",
    description: "Fields, selects, sliders, checkboxes, and switches.",
    icon: "settings" as const,
    link: "field",
  },
  {
    name: "Give every action a place.",
    description: "Dialogs, drawers, popovers, and dropdown menus.",
    icon: "plus" as const,
    link: "dialog",
  },
  {
    name: "Find the useful signal.",
    description: "Tables, pagination, carousels, and reactive lists.",
    icon: "search" as const,
    link: "table",
  },
];
</script>
<template>
  <section class="component-gateway">
    <div class="gateway-heading">
      <p class="kicker">A focused foundation</p>
      <h2>Bring the idea.<br />We brought the components.</h2>
      <p>
        25 building blocks, with documented props, events, and slots. Compose
        them into something that feels like you.
      </p>
    </div>
    <div class="gateway-grid">
      <a
        v-for="group in groups"
        :key="group.name"
        :href="'/components/' + group.link"
        ><FzIcon :name="group.icon" :size="28" />
        <h3>{{ group.name }}</h3>
        <p>{{ group.description }}</p>
        <span>Explore components <FzIcon name="arrowUpRight" :size="18" /></span
      ></a>
    </div>
    <div class="developer-callout">
      <div>
        <p class="kicker">Built for your workflow</p>
        <h3>Readable by people.<br />Usable by agents.</h3>
      </div>
      <div>
        <p>
          Copy a component with the CLI. Bring your own state. Give your AI
          assistant the same API contract you use.
        </p>
        <a class="site-link" href="/guide/ai"
          >Explore the AI contract <FzIcon name="arrowRight"
        /></a>
      </div>
    </div>
  </section>
</template>
