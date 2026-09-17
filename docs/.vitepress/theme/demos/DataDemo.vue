<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  FzField,
  FzTable,
  FzPagination,
  FzBadge,
  type ForzaSort,
} from "@forza";
const query = ref(""),
  page = ref(1),
  sort = ref<ForzaSort>({ key: "name", direction: "asc" });
const rows = [
  { id: 1, name: "Sunbreaker", role: "Duelist", gold: 3200 },
  { id: 2, name: "Hollowguard", role: "Guardian", gold: 2900 },
  { id: 3, name: "Stormthread", role: "Caster", gold: 3400 },
  { id: 4, name: "Cinderwake", role: "Duelist", gold: 2800 },
  { id: 5, name: "Ironveil", role: "Guardian", gold: 3100 },
  { id: 6, name: "Moonwell", role: "Caster", gold: 2600 },
  { id: 7, name: "Swiftfang", role: "Duelist", gold: 2400 },
  { id: 8, name: "Stillwater", role: "Guardian", gold: 3000 },
];
const filtered = computed(() =>
  rows
    .filter((r) =>
      (r.name + " " + r.role).toLowerCase().includes(query.value.toLowerCase()),
    )
    .sort((a, b) => {
      const k = sort.value.key as "name" | "role" | "gold";
      return (
        (typeof a[k] === "number"
          ? Number(a[k]) - Number(b[k])
          : String(a[k]).localeCompare(String(b[k]))) *
        (sort.value.direction === "asc" ? 1 : -1)
      );
    }),
);
const visible = computed(() =>
  filtered.value.slice((page.value - 1) * 4, page.value * 4),
);
watch(query, () => (page.value = 1));
</script>
<template>
  <div class="demo-stack">
    <FzField
      v-model="query"
      label="Find an item"
      type="search"
      placeholder="Name or role…"
    /><FzTable
      v-model:sort="sort"
      :rows="visible"
      :columns="[
        { key: 'name', label: 'Item', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'gold', label: 'Gold', sortable: true, align: 'end' },
      ]"
      label="Sample item catalog"
      ><template #cell="{ column, value }"
        ><FzBadge v-if="column.key === 'role'">{{ value }}</FzBadge
        ><strong v-else-if="column.key === 'gold'">{{
          Number(value).toLocaleString()
        }}</strong
        ><span v-else>{{ value }}</span></template
      ><template #empty>No items match your search.</template></FzTable
    ><FzPagination
      v-model="page"
      :total="filtered.length"
      :page-size="4"
      label="Item pages"
    />
  </div>
</template>
