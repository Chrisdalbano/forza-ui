<script setup lang="ts" generic="T extends { id: string | number }">
import type { ForzaColumn, ForzaSort } from "../types";
defineProps<{
  rows: readonly T[];
  columns: readonly ForzaColumn[];
  label: string;
}>();
const sort = defineModel<ForzaSort>("sort");
function toggle(key: string) {
  sort.value = {
    key,
    direction:
      sort.value?.key === key && sort.value.direction === "asc"
        ? "desc"
        : "asc",
  };
}
function value(row: T, key: string) {
  return (row as Record<string, unknown>)[key];
}
</script>
<template>
  <div class="fz-table-wrap" role="region" :aria-label="label" tabindex="0">
    <table class="fz-table">
      <caption>
        {{
          label
        }}
      </caption>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ textAlign: column.align === 'end' ? 'right' : 'left' }"
            :aria-sort="
              column.sortable
                ? sort?.key === column.key
                  ? sort.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
                : undefined
            "
          >
            <button v-if="column.sortable" @click="toggle(column.key)">
              {{ column.label }}
              <span aria-hidden="true">{{
                sort?.key === column.key
                  ? sort.direction === "asc"
                    ? "↑"
                    : "↓"
                  : "↕"
              }}</span></button
            ><template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{ textAlign: column.align === 'end' ? 'right' : 'left' }"
          >
            <slot
              name="cell"
              :row="row"
              :column="column"
              :value="value(row, column.key)"
              >{{ value(row, column.key) }}</slot
            >
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length">
            <slot name="empty">No results.</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.fz-table-wrap {
  overflow: auto;
  border: 1px solid var(--fz-border);
  border-radius: 5px;
}
.fz-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  white-space: nowrap;
}
.fz-table caption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
th,
td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--fz-border);
}
th {
  font-weight: 500;
  color: var(--fz-muted);
  background: var(--fz-surface);
}
th button {
  font: inherit;
  color: inherit;
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
}
th button span {
  margin-left: 8px;
  color: var(--fz-accent);
}
tbody tr:last-child td {
  border-bottom: 0;
}
tbody tr:hover {
  background: var(--fz-surface);
}
</style>
