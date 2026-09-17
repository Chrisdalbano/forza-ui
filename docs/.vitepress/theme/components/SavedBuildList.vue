<script setup lang="ts">
import { nextTick, useTemplateRef } from "vue";
import { FzList, FzIcon, FzButton } from "@forza";
import type { SavedBuild } from "../composables/useSavedBuilds";
const props = defineProps<{
  items: readonly SavedBuild[];
  canUndo: boolean;
  message: string;
}>();
const emit = defineEmits<{
  create: [];
  remove: [id: string];
  undo: [];
  reorder: [];
}>();
const root = useTemplateRef<HTMLElement>("root");
async function remove(id: string) {
  const index = props.items.findIndex((item) => item.id === id);
  const next = props.items[index + 1] ?? props.items[index - 1];
  emit("remove", id);
  await nextTick();
  const buttons = Array.from(
    root.value?.querySelectorAll<HTMLButtonElement>("[data-build-id]") ?? [],
  );
  const target =
    buttons.find((button) => button.dataset.buildId === next?.id) ??
    root.value?.querySelector<HTMLButtonElement>("[data-create]");
  target?.focus();
}
</script>
<template>
  <section ref="root" class="saved-builds" aria-labelledby="saved-heading">
    <div class="saved-heading">
      <div>
        <h3 id="saved-heading">Saved builds</h3>
        <p>Add a build. Reverse the order. Remove it and undo.</p>
      </div>
      <div class="saved-actions">
        <FzButton
          variant="ghost"
          size="sm"
          :disabled="!canUndo || items.length >= 6"
          @click="$emit('undo')"
          ><FzIcon name="undo" :size="16" />Undo</FzButton
        ><FzButton
          variant="secondary"
          size="sm"
          :disabled="items.length < 2"
          @click="$emit('reorder')"
          ><FzIcon name="sort" :size="16" />Reverse order</FzButton
        ><FzButton
          size="sm"
          :disabled="items.length >= 6"
          data-create
          @click="$emit('create')"
          ><FzIcon name="plus" :size="16" />New build</FzButton
        >
      </div>
    </div>
    <FzList :items="items" label="Saved builds"
      ><template #default="{ item }"
        ><div class="saved-row">
          <span class="saved-symbol"><FzIcon name="swords" :size="18" /></span>
          <div class="saved-name">
            <strong>{{ item.name }}</strong
            ><span>{{ item.note }}</span>
          </div>
          <FzButton
            variant="ghost"
            size="sm"
            :aria-label="'Delete ' + item.name"
            :data-build-id="item.id"
            @click="remove(item.id)"
            ><FzIcon name="trash" :size="16"
          /></FzButton></div></template
      ><template #empty
        ><p class="saved-empty">
          No saved builds. Create one to get started.
        </p></template
      ></FzList
    >
    <p class="saved-announcement" role="status">
      {{ message || "Session-only demo. Up to six builds." }}
    </p>
  </section>
</template>
<style scoped>
.saved-builds {
  margin-top: 16px;
  border: 1px solid var(--fz-border);
  padding: 24px;
  background: var(--fz-surface);
}
.saved-heading {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
  align-items: center;
}
.saved-heading h3 {
  font: 600 27px var(--fz-font-display);
  margin: 0;
}
.saved-heading p {
  color: var(--fz-muted);
  font-size: 12px;
  margin: 6px 0 0;
}
.saved-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.saved-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 4px;
  border-top: 1px solid var(--fz-border);
}
.saved-symbol {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  background: var(--fz-raised);
  color: var(--fz-muted);
  flex: none;
}
.saved-name {
  display: grid;
  gap: 3px;
  flex: 1;
  min-width: 0;
}
.saved-name strong {
  font-size: 13px;
  overflow-wrap: anywhere;
}
.saved-name > span,
.saved-announcement {
  font-size: 11px;
  color: var(--fz-muted);
}
.saved-announcement {
  margin: 14px 0 0;
  min-height: 18px;
}
.saved-empty {
  padding: 18px 0;
  color: var(--fz-muted);
}
@media (max-width: 800px) {
  .saved-heading {
    align-items: start;
    flex-direction: column;
  }
  .saved-actions {
    gap: 6px;
  }
}
</style>
