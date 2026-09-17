<script setup lang="ts">
import { shallowRef, computed } from "vue";
import { FzIcon } from "@forza";
import { componentCatalog } from "../componentCatalog";
import ComponentPreview from "./ComponentPreview.vue";
import CodeExample from "./CodeExample.vue";
const selected = shallowRef("Field");
const code = shallowRef(false);
const specimens = [
  "Field",
  "Select",
  "Checkbox",
  "Stepper",
  "Accordion",
  "Carousel",
  "Dropdown",
  "Drawer",
  "Popover",
  "List",
];
const item = computed(() =>
  componentCatalog.find((c) => c.name === "Fz" + selected.value)!,
);
</script>
<template>
  <section id="components" class="presentation-section component-exhibit">
    <div class="section-heading reveal">
      <h2>Explore the controls.<br /><em>Keep the code.</em></h2>
      <p>
        These are the library components.<br />Open a drawer. Change a
        selection.<br />Then take the code.
      </p>
    </div>
    <div class="specimen reveal">
      <nav aria-label="Live specimens" class="specimen-nav">
        <button
          v-for="name in specimens"
          :key="name"
          :aria-pressed="selected === name"
          @click="selected = name"
        >
          {{ name }}<FzIcon name="arrowUpRight" :size="16" />
        </button>
      </nav>
      <div class="specimen-main">
        <div class="specimen-caption">
          <h3>{{ selected }}</h3>
          <span>{{ item.state }}</span>
        </div>
        <div class="specimen-stage">
          <ClientOnly>
            <Transition name="specimen-change" mode="out-in">
              <div :key="selected" class="specimen-example">
                <ComponentPreview :name="selected" />
              </div>
            </Transition>
          </ClientOnly>
        </div>
        <div class="specimen-tools">
          <button
            :aria-expanded="code"
            aria-controls="specimen-code"
            @click="code = !code"
          >
            {{ code ? "Hide source" : "View source" }}
            <span aria-hidden="true">&lt;/&gt;</span></button
          ><a :href="'/components/' + item.slug"
            >API reference <FzIcon name="arrowUpRight" :size="18"
          /></a>
        </div>
      </div>
    </div>
    <div v-if="code" id="specimen-code">
      <CodeExample :key="item.name" :name="item.name" />
    </div>
    <a class="index-link" href="/components"
      >Explore all {{ componentCatalog.length }} components
      <FzIcon name="arrowRight"
    /></a>
  </section>
</template>
