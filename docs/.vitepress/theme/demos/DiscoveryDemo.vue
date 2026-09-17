<script setup lang="ts">
import { ref } from "vue";
import { FzCarousel, FzAccordion, FzBadge, FzIcon } from "@forza";
const slide = ref(0),
  expanded = ref("");
const builds = [
  {
    id: "01",
    title: "Hold the line.",
    role: "Guardian",
    icon: "shield" as const,
    description: "A defensive foundation with room to grow.",
    stat: "3,200",
    color: "sage",
  },
  {
    id: "02",
    title: "Strike first.",
    role: "Duelist",
    icon: "swords" as const,
    description: "Mobility and damage, balanced for the opening fight.",
    stat: "3,800",
    color: "coral",
  },
  {
    id: "03",
    title: "Change the tempo.",
    role: "Caster",
    icon: "zap" as const,
    description: "Control the pace with power and utility.",
    stat: "3,500",
    color: "blue",
  },
];
</script>
<template>
  <div class="demo-stack">
    <FzCarousel v-model="slide" :items="builds" label="Build archetypes"
      ><template #default="{ item }"
        ><article class="archetype" :data-color="item.color">
          <div>
            <FzBadge>{{ item.role }}</FzBadge>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <span class="mono">{{ item.stat }} GOLD / DEMO</span>
          </div>
          <FzIcon
            :name="item.icon"
            :size="96"
            :stroke-width="1"
          /></article></template></FzCarousel
    ><FzAccordion
      v-model="expanded"
      label="Build guide"
      :items="[
        {
          value: 'starter',
          title: 'What makes a good starting build?',
          content:
            'Choose a clear role, set a realistic budget, and keep one slot open for situational choices.',
        },
        {
          value: 'compare',
          title: 'How should I compare options?',
          content:
            'Compare trade-offs within the same budget. A higher score is only useful when it supports your play style.',
        },
        {
          value: 'save',
          title: 'Can I change a saved build?',
          content:
            'Yes. Duplicate a build to explore a new direction while preserving the original.',
        },
      ]"
    />
  </div>
</template>
