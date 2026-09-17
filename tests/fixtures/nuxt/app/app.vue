<script setup lang="ts">
import { ref } from "vue";
import { FzButton, FzField, FzDrawer, FzSelect } from "@chrisdalbano/forza-ui";
const name = ref("Nuxt consumer"),
  open = ref(false),
  role = ref("guardian");
</script>
<template>
  <main class="fz-theme">
    <h1>Forza in Nuxt</h1>
    <FzField v-model="name" label="Build name" /><FzButton @click="open = true"
      >Open drawer</FzButton
    ><FzDrawer v-model="open" title="Build settings"
      ><FzSelect
        v-model="role"
        label="Role"
        :options="[
          { value: 'guardian', label: 'Guardian' },
          { value: 'duelist', label: 'Duelist' },
        ]"
    /></FzDrawer>
  </main>
</template>
