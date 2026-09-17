<script setup lang="ts">
import { shallowRef, computed, onMounted, watch } from "vue";
import { componentCatalog } from "../componentCatalog";
import ComponentPreview from "./ComponentPreview.vue";
const selected = shallowRef("FzButton"),
  query = shallowRef("");
const visible = computed(() =>
  componentCatalog.filter((c) =>
    c.name.toLowerCase().includes(query.value.toLowerCase()),
  ),
);
const item = computed(() =>
  componentCatalog.find((c) => c.name === selected.value)!,
);
onMounted(() => {
  const initial = new URLSearchParams(location.search).get("component");
  if (initial && componentCatalog.some((c) => c.name === initial))
    selected.value = initial;
  watch(selected, (name) => {
    history.replaceState(null, "", "?component=" + name);
  });
});
</script>
<template>
  <main class="playground">
    <p class="kicker">A live workspace</p>
    <h1>Get a feel for Forza.</h1>
    <p class="playground-intro">
      Try the controls. Follow the state. Switch themes with the control in the
      header. Each example uses the same components you install.
    </p>
    <div class="playground-grid">
      <nav class="playground-nav" aria-label="Component playground">
        <label for="component-search">Find a component</label
        ><input
          id="component-search"
          v-model="query"
          type="search"
          placeholder="Search components"
        /><button
          v-for="component in visible"
          :key="component.name"
          :aria-pressed="selected === component.name"
          @click="selected = component.name"
        >
          {{ component.name.slice(2) }}
        </button>
        <p v-if="!visible.length">No components match.</p>
      </nav>
      <section class="playground-content" aria-label="Selected component">
        <h2>{{ item.name }}</h2>
        <p>{{ item.state }}</p>
        <ClientOnly><ComponentPreview :name="item.name.slice(2)" /></ClientOnly>
        <dl class="api-summary">
          <div>
            <dt>Props</dt>
            <dd>{{ item.props }}</dd>
          </div>
          <div>
            <dt>Slots</dt>
            <dd>{{ item.slots }}</dd>
          </div>
        </dl>
        <pre
          v-if="item.example"
          class="preview-code"
          tabindex="0"
          aria-label="Usage code"
        ><code>{{item.example}}</code></pre>
        <div class="preview-actions">
          <a
            class="site-button"
            :href="'/components/' + item.name.slice(2).toLowerCase()"
            >Read the full API</a
          ><a class="site-link" href="/guide/cli">Add with the CLI</a>
        </div>
      </section>
    </div>
  </main>
</template>
