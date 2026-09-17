<script setup lang="ts">
import { shallowRef, computed, useTemplateRef, nextTick } from "vue";
import { FzField, FzIcon, useForzaMotion } from "@forza";
interface Piece {
  id: number;
  name: string;
}
const pieces = shallowRef<Piece[]>([
  { id: 1, name: "Prototype the navigation" },
  { id: 2, name: "Review the interaction" },
]);
const draft = shallowRef("");
const announcement = shallowRef("");
const form = useTemplateRef<HTMLFormElement>("form");
const { parent } = useForzaMotion();
const full = computed(() => pieces.value.length >= 4);
let nextId = 3;
function add() {
  if (full.value) return;
  const name = draft.value.trim() || "Something worth making";
  pieces.value = [...pieces.value, { id: nextId++, name }];
  draft.value = "";
  announcement.value = `Added ${name}.`;
}
async function remove(id: number) {
  const item = pieces.value.find((p) => p.id === id);
  pieces.value = pieces.value.filter((p) => p.id !== id);
  announcement.value = `Removed ${item?.name}.`;
  await nextTick();
  form.value?.querySelector("input")?.focus();
}
</script>
<template>
  <section class="hero-assembly" aria-label="Interactive collection demo">
    <div class="assembly-title">
      <h3>Your collection</h3>
      <span>{{ pieces.length }} / 4</span>
    </div>
    <form ref="form" class="assembly-form assembly-piece" @submit.prevent="add">
      <FzField
        v-model="draft"
        label="Your next idea"
        placeholder="Give it a name"
        :disabled="full"
        maxlength="48"
      />
      <button
        class="assembly-add"
        type="submit"
        :disabled="full"
        aria-label="Add idea"
      >
        <FzIcon name="plus" :size="22" />
      </button>
    </form>
    <ol ref="parent" class="assembly-list" aria-label="Your ideas">
      <li v-for="(piece, index) in pieces" :key="piece.id" class="assembly-row">
        <span class="piece-number">{{
          String(index + 1).padStart(2, "0")
        }}</span
        ><span class="piece-name">{{ piece.name }}</span
        ><button
          type="button"
          :aria-label="`Remove ${piece.name}`"
          @click="remove(piece.id)"
        >
          <FzIcon name="close" :size="18" />
        </button>
      </li>
      <li v-if="!pieces.length" class="assembly-empty">
        An empty canvas. Add your first idea.
      </li>
    </ol>
    <div class="assembly-footer">
      <span>{{
        full
          ? "Collection full. Remove an idea to make room."
          : "Add an idea. Watch everything find its place."
      }}</span
      ><a href="/components/list" aria-label="Explore the List component"
        ><FzIcon name="arrowUpRight" :size="22"
      /></a>
    </div>
    <span class="sr-only" role="status">{{ announcement }}</span>
  </section>
</template>
<style scoped>
.hero-assembly {
  min-width: 0;
  position: relative;
  padding: 32px 0 16px;
  border-block: 1px solid var(--fz-border);
}
.assembly-heading {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: var(--fz-muted);
  font-size: 14px;
}
.assembly-index {
  font-family: var(--fz-font-mono);
}
.assembly-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0 36px;
  gap: 20px;
}
.assembly-title h2 {
  font-size: clamp(58px, 6vw, 90px);
  margin: 0;
  line-height: 0.95;
}
.assembly-title em {
  font-style: normal;
  color: var(--fz-accent);
}
.assembly-title img {
  width: clamp(60px, 7vw, 100px);
  height: auto;
  transform: rotate(-9deg);
}
.assembly-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 48px;
  align-items: end;
  gap: 12px;
}
.assembly-add {
  height: 48px;
  display: grid;
  place-items: center;
  background: var(--fz-accent);
  color: var(--fz-on-accent);
  border-radius: var(--fz-radius);
  transition:
    background var(--fz-motion-fast),
    transform var(--fz-motion-fast);
}
.assembly-add:hover:not(:disabled) {
  background: var(--fz-accent-hover);
  transform: translateY(-2px);
}
.assembly-add:disabled {
  opacity: 0.5;
}
.assembly-list {
  list-style: none;
  margin: 24px 0;
  padding: 0;
  min-height: 164px;
  display: grid;
  align-content: start;
  gap: 10px;
}
.assembly-row {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 12px 14px 20px;
  min-height: 64px;
  background: var(--fz-surface);
  border: 1px solid var(--fz-border);

  border-radius: 3px;
}
.piece-number {
  font: 12px var(--fz-font-mono);
  color: var(--fz-muted);
}
.piece-name {
  flex: 1;
  font-size: 15px;
  overflow-wrap: anywhere;
}
.assembly-row button {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: var(--fz-muted);
  border-radius: 3px;
  transition:
    background var(--fz-motion-fast),
    color var(--fz-motion-fast);
}
.assembly-row button:hover {
  background: var(--fz-raised);
  color: var(--fz-text);
}
.assembly-empty {
  padding: 24px 0;
  color: var(--fz-muted);
  font-size: 15px;
}
.assembly-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--fz-muted);
  font-size: 14px;
}
.assembly-footer a {
  display: grid;
  place-items: center;
  min-width: 40px;
  min-height: 40px;
  border: 1px solid var(--fz-border);
  border-radius: 50%;
  transition:
    color var(--fz-motion-fast),
    border-color var(--fz-motion-fast);
}
.assembly-footer a:hover {
  color: var(--fz-accent);
  border-color: var(--fz-accent);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
@media (max-width: 600px) {
  .hero-assembly {
    padding-top: 24px;
  }
  .assembly-title {
    padding: 28px 0;
  }
  .assembly-title h2 {
    font-size: 64px;
  }
  .assembly-row {
    gap: 12px;
    padding-left: 14px;
  }
  .assembly-heading {
    font-size: 13px;
  }
}
</style>
