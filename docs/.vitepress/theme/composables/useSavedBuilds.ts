import { shallowRef, readonly } from "vue";
export interface SavedBuild {
  id: string;
  name: string;
  note: string;
}
export function useSavedBuilds() {
  const items = shallowRef<SavedBuild[]>([
    { id: "build-1", name: "Late-game carry", note: "Draft" },
    { id: "build-2", name: "Frontline utility", note: "Draft" },
  ]);
  const removed = shallowRef<{ item: SavedBuild; index: number } | null>(null);
  const message = shallowRef("");
  let nextId = 3;
  function add(name: string) {
    if (name.trim().length < 3 || items.value.length >= 6) return false;
    items.value = [
      ...items.value,
      { id: `build-${nextId++}`, name: name.trim(), note: "Just saved" },
    ];
    message.value = `${name.trim()} saved.`;
    return true;
  }
  function remove(id: string) {
    const index = items.value.findIndex((item) => item.id === id);
    if (index < 0) return;
    removed.value = { item: items.value[index], index };
    items.value = items.value.filter((item) => item.id !== id);
    message.value = `${removed.value.item.name} removed. Undo is available.`;
  }
  function undo() {
    if (!removed.value || items.value.length >= 6) return;
    const next = [...items.value];
    next.splice(removed.value.index, 0, removed.value.item);
    items.value = next;
    message.value = `${removed.value.item.name} restored.`;
    removed.value = null;
  }
  function reorder() {
    items.value = [...items.value].reverse();
    message.value = "Build order reversed.";
  }
  return {
    items: readonly(items),
    removed: readonly(removed),
    message: readonly(message),
    add,
    remove,
    undo,
    reorder,
  };
}
