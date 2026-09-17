<script setup lang="ts">
import { shallowRef, computed } from "vue";
import { FzField, FzIcon } from "@forza";
import { componentCatalog } from "../componentCatalog";
import "../presentation.css";
const query = shallowRef("");
const results = computed(() =>
  componentCatalog.filter((c) =>
    (c.name + " " + c.props).toLowerCase().includes(query.value.toLowerCase()),
  ),
);
</script>
<template>
  <main class="component-directory">
    <h1>The components.</h1>
    <p class="directory-intro">
      {{ componentCatalog.length }} pieces of the same system. Inspect a typed
      API, or open a working example with source in the workbench.
    </p>
    <FzField
      v-model="query"
      label="Search the library"
      placeholder="Find a component or prop"
      type="search"
      class="directory-search"
    />
    <p role="status">{{ results.length }} components</p>
    <div class="directory-grid">
      <article v-for="item in results" :key="item.name" class="directory-item">
        <h2>{{ item.name.slice(2) }}</h2>
        <p>{{ item.props }}</p>
        <div>
          <a :href="'/playground?component=' + item.name"
            >Try it <FzIcon name="arrowUpRight" :size="16" /></a
          ><a :href="'/components/' + item.slug">API reference</a>
        </div>
      </article>
    </div>
    <p v-if="!results.length">
      No matching components. Try a different name or prop.
    </p>
  </main>
</template>
