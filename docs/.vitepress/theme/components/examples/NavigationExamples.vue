<script setup lang="ts">
import { shallowRef } from "vue";
import {
  FzTabs,
  FzSegmented,
  FzStepper,
  FzPagination,
  FzAccordion,
  FzCarousel,
  FzBadge,
  FzButton,
} from "@forza";
defineProps<{ name: string }>();
const selected = shallowRef("overview"),
  step = shallowRef(1),
  page = shallowRef(1),
  expanded = shallowRef(""),
  slide = shallowRef(0);
const options = [
  { value: "overview", label: "Overview" },
  { value: "stats", label: "Statistics" },
  { value: "history", label: "History" },
];
const slides = [
  { id: "guardian", title: "Hold the line.", role: "Guardian" },
  { id: "duelist", title: "Strike first.", role: "Duelist" },
  { id: "caster", title: "Change the tempo.", role: "Caster" },
];
</script>
<template>
  <div class="demo-stack">
    <FzTabs
      v-if="name === 'Tabs'"
      v-model="selected"
      label="Build details"
      :options="options"
      ><p>
        {{
          selected === "overview"
            ? "A complete view of your build."
            : selected === "stats"
              ? "Compare the numbers that matter."
              : "Your latest changes stay in view."
        }}
      </p></FzTabs
    ><FzSegmented
      v-else-if="name === 'Segmented'"
      v-model="selected"
      label="Build view"
      :options="options"
    /><template v-else-if="name === 'Stepper'"
      ><FzStepper
        v-model="step"
        label="Build setup"
        :steps="[
          { title: 'Choose' },
          { title: 'Configure' },
          { title: 'Review' },
        ]"
      />
      <p>Step {{ step }} of 3. The parent owns validation and progression.</p>
      <div class="demo-actions">
        <FzButton variant="secondary" :disabled="step === 1" @click="step--"
          >Back</FzButton
        ><FzButton :disabled="step === 3" @click="step++">Continue</FzButton>
      </div></template
    ><template v-else-if="name === 'Pagination'"
      ><p>Page {{ page }} of 10</p>
      <FzPagination v-model="page" :total="100" :page-size="10" /></template
    ><FzAccordion
      v-else-if="name === 'Accordion'"
      v-model="expanded"
      label="Build guide"
      :items="[
        {
          value: 'start',
          title: 'Where should I start?',
          content:
            'Choose a role, set a budget, and give your build a clear purpose.',
        },
        {
          value: 'change',
          title: 'Can I change direction?',
          content:
            'Duplicate a build to try another approach without losing the original.',
        },
      ]"
    /><FzCarousel
      v-else
      v-model="slide"
      :items="slides"
      label="Build archetypes"
      ><template #default="{ item }"
        ><article class="archetype">
          <div>
            <FzBadge>{{ item.role }}</FzBadge>
            <h4>{{ item.title }}</h4>
            <p>Swipe, drag, or use the arrow buttons.</p>
          </div>
        </article></template
      ></FzCarousel
    >
  </div>
</template>
