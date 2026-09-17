<script setup lang="ts">
import { shallowRef } from "vue";
import { FzList, FzButton, FzIcon } from "@forza";
import DataDemo from "../../demos/DataDemo.vue";
defineProps<{ name: string }>();
let id = 3;
const items = shallowRef([
  { id: 1, name: "Guardian build" },
  { id: 2, name: "Duelist build" },
]);
function add() {
  items.value = [...items.value, { id: id++, name: "New build" }];
}
function remove(key: number) {
  items.value = items.value.filter((item) => item.id !== key);
}
</script>
<template>
  <DataDemo v-if="name === 'Table'" />
  <div v-else class="demo-stack">
    <div class="demo-actions">
      <FzButton @click="add">Add build</FzButton
      ><FzButton variant="secondary" @click="items = [...items].reverse()"
        >Reverse order</FzButton
      >
    </div>
    <FzList :items="items" label="Your builds"
      ><template #default="{ item }"
        ><div class="list-example-row">
          <span>{{ item.name }}</span
          ><FzButton
            variant="ghost"
            size="sm"
            :aria-label="'Delete ' + item.name"
            @click="remove(item.id)"
            ><FzIcon name="close"
          /></FzButton></div></template
      ><template #empty>No builds yet. Add one above.</template></FzList
    >
  </div>
</template>
<style scoped>
.list-example-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--fz-border);
  padding: 16px 0;
  font-size: 15px;
}
</style>
