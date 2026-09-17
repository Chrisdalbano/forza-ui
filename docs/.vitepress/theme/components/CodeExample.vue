<script setup lang="ts">
import { computed, shallowRef } from "vue";
import { Copy, Check, WrapText, CodeXml } from "@lucide/vue";
import examples from "../highlightedExamples.json";
const props = defineProps<{ name: string }>();
const example = computed(
  () =>
    (examples as Record<string, { code: string; html: string }>)[props.name],
);
const copied = shallowRef(false),
  failed = shallowRef(false),
  wrap = shallowRef(false);
async function copy() {
  try {
    await navigator.clipboard.writeText(example.value.code);
    copied.value = true;
    failed.value = false;
  } catch {
    failed.value = true;
    copied.value = false;
  }
}
</script>
<template>
  <section
    v-if="example"
    class="code-example not-prose"
    :class="{ 'is-wrapped': wrap }"
    :aria-label="`${name} usage example`"
  >
    <header class="code-toolbar">
      <span class="code-filename"
        ><CodeXml :size="17" aria-hidden="true" />{{
          name.slice(2)
        }}Example.vue</span
      ><span class="code-language">Vue / TS</span
      ><button
        type="button"
        :aria-pressed="wrap"
        aria-label="Wrap code lines"
        @click="wrap = !wrap"
      >
        <WrapText :size="17" aria-hidden="true" /></button
      ><button type="button" :aria-label="`Copy ${name} example`" @click="copy">
        <Check v-if="copied" :size="17" aria-hidden="true" /><Copy
          v-else
          :size="17"
          aria-hidden="true"
        /><span>{{ copied ? "Copied" : "Copy" }}</span>
      </button>
    </header>
    <!-- HTML is escaped and highlighted at build time from the repository's examples, never user input. -->
    <div class="preview-code" v-html="example.html"></div>
    <footer class="code-footer">
      <span>TypeScript example</span
      ><span role="status">{{
        failed
          ? "Copy unavailable. Select the code to copy it."
          : copied
            ? "Copied to clipboard."
            : "Source you can use."
      }}</span>
    </footer>
  </section>
</template>
<style scoped>
.code-example {
  min-width: 0;
  margin: 28px 0;
  border: 1px solid var(--fz-border);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.code-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--fz-surface);
  border-bottom: 1px solid var(--fz-border);
  color: var(--fz-text);
}
.code-filename {
  display: flex;
  align-items: center;
  gap: 9px;
  font: 12px var(--fz-font-mono);
  min-width: 0;
  overflow-wrap: anywhere;
}
.code-language {
  margin-left: auto;
  white-space: nowrap;
  font-size: 12px;
  color: var(--fz-muted);
}
.code-toolbar button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 36px;
  min-height: 36px;
  padding: 6px;
  border-radius: 4px;
  color: var(--fz-muted);
  font-size: 12px;
  transition:
    background var(--fz-motion-fast),
    color var(--fz-motion-fast);
}
.code-toolbar button:hover,
.code-toolbar button[aria-pressed="true"] {
  background: var(--fz-raised);
  color: var(--fz-text);
}
.preview-code {
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  font: 13px/1.85 var(--fz-font-mono);
  overflow: visible;
}
.preview-code :deep(pre) {
  margin: 0;
  padding: 20px 0;
  overflow: auto;
  max-height: 560px;
  line-height: 1.85;
  font-size: 13px;
  border-radius: 0;
  background: #fff !important;
  tab-size: 2;
  scrollbar-gutter: stable;
}
.preview-code :deep(code) {
  display: block;
  width: max-content;
  min-width: 100%;
  counter-reset: line;
  font: inherit;
  background: transparent;
  padding: 0;
  color: inherit;
}
.preview-code :deep(.line) {
  display: inline-block;
  min-width: 100%;
  padding-right: 24px;
}
.preview-code :deep(.line::before) {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 44px;
  padding-right: 14px;
  text-align: right;
  color: #586069;
  font-size: 11px;
  user-select: none;
}
.preview-code :deep(.line:hover) {
  background: rgb(128 128 128 / 0.07);
}
.is-wrapped .preview-code :deep(code) {
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.is-wrapped .preview-code :deep(.line) {
  padding-left: 44px;
  text-indent: -44px;
}
.is-wrapped .preview-code :deep(.line::before) {
  text-indent: 0;
}
.code-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 16px;
  background: var(--fz-surface);
  border-top: 1px solid var(--fz-border);
  font-size: 12px;
  color: var(--fz-muted);
}
@media (max-width: 600px) {
  .code-language {
    display: none;
  }
  .code-toolbar {
    gap: 6px;
    padding: 8px;
  }
  .code-filename {
    flex: 1;
    font-size: 11px;
  }
  .code-footer {
    font-size: 11px;
  }
  .preview-code :deep(pre) {
    font-size: 12px;
  }
}
</style>

<style>
html.dark .code-example .preview-code pre {
  background: #0d1117 !important;
}
html.dark .code-example .preview-code .shiki,
html.dark .code-example .preview-code .shiki span {
  color: var(--shiki-dark) !important;
}
html.dark .code-example .preview-code .line::before {
  color: #8b949e;
}
</style>
