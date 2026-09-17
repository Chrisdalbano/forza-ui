import { readFile, writeFile, readdir, mkdir, cp } from "node:fs/promises";
import { resolve } from "node:path";
import { createChecker } from "vue-component-meta";
const catalog = JSON.parse(await readFile("meta/components.json", "utf8"));
const checker = createChecker(resolve("tsconfig.json"), {
  schema: false,
  forceUseTs: true,
});
const components = [];
const cell = (v) =>
  String(v ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
for (const item of catalog) {
  const meta = checker.getComponentMeta(
    resolve("packages/vue/src/components/" + item.name + ".vue"),
  );
  const props = meta.props
    .filter((p) => !p.global)
    .map((p) => ({
      name: p.name,
      type: p.type,
      required: p.required,
      default: p.default ?? null,
    }));
  const events = meta.events.map((e) => ({ name: e.name, type: e.type }));
  const slots = meta.slots.map((s) => ({ name: s.name, type: s.type }));
  components.push({
    ...item,
    props,
    events,
    slots,
    source: "packages/vue/src/components/" + item.name + ".vue",
  });
  const name = item.name.slice(2);
  let md =
    "---\ntitle: " +
    name +
    "\ndescription: " +
    name +
    " component API, usage and live preview for Forza UI.\n---\n<script setup>\nimport ComponentPreview from '../.vitepress/theme/components/ComponentPreview.vue'\n</script>\n\n# " +
    name +
    "\n\n" +
    item.notes +
    '\n\n## Preview\n\n<ClientOnly><ComponentPreview name="' +
    name +
    '" /></ClientOnly>\n\n[Open in the playground](/playground?component=' +
    item.name +
    ")\n\n## Usage\n\n```vue\n" +
    item.example +
    "\n```\n\nImport the shared stylesheet once and wrap your app in `.fz-theme`. See [installation](/guide/installation).\n\n## Props\n\n| Name | Type | Required | Default |\n| --- | --- | --- | --- |\n";
  for (const p of props)
    md +=
      "| `" +
      p.name +
      "` | `" +
      cell(p.type) +
      "` | " +
      (p.required ? "Yes" : "No") +
      " | " +
      (p.default === null ? "None" : "`" + cell(p.default) + "`") +
      " |\n";
  md += "\n## Events and state\n\n" + item.state + "\n\n";
  for (const e of events) md += "- `" + e.name + "`: `" + e.type + "`\n";
  md +=
    "\n## Slots\n\n" +
    item.slots +
    "\n\n## Add from source\n\n```sh\nforza add " +
    item.slug +
    "\n```\n\nSet up the [CLI](/guide/cli) first. Generated API tables come from the Vue source, using Vue Language Tools.\n";
  await writeFile("docs/components/" + item.slug + ".md", md);
}
const manifest = {
  schemaVersion: 1,
  version: "0.3.0",
  framework: "Vue 3.5+",
  package: "@chrisdalbano/forza-ui",
  themeClass: "fz-theme",
  stylesheet: "@chrisdalbano/forza-ui/style.css",
  components,
};
await writeFile(
  "docs/public/component-manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
await mkdir("packages/cli/registry", { recursive: true });
await cp("packages/vue/src", "packages/cli/registry/source", {
  recursive: true,
});
await cp("LICENSE", "packages/cli/registry/source/LICENSE");
await writeFile(
  "packages/cli/registry/manifest.json",
  JSON.stringify(manifest, null, 2),
);
const pages = (await readdir("docs/guide")).filter((n) => n.endsWith(".md"));
let full = "# Forza UI 0.3.0\n\n";
for (const name of pages)
  full += (await readFile("docs/guide/" + name, "utf8")) + "\n\n";
for (const c of components)
  full +=
    "# " +
    c.name +
    "\n" +
    c.notes +
    "\n\n" +
    JSON.stringify({ props: c.props, events: c.events, slots: c.slots }) +
    "\n\n```vue\n" +
    c.example +
    "\n```\n\n";
await writeFile("docs/public/llms-full.txt", full);
await writeFile(
  "docs/public/llms.txt",
  "# Forza UI\n\n> Typed Vue 3.5 components with scoped CSS themes.\n\n- [Full reference](https://forzaui.web.app/llms-full.txt)\n- [Machine API](https://forzaui.web.app/component-manifest.json)\n- [Installation](https://forzaui.web.app/guide/installation)\n- [AI contract](https://forzaui.web.app/guide/ai)\n- [Source](https://github.com/Chrisdalbano/forza-ui)\n",
);
console.log(
  "Generated " +
    components.length +
    " API pages, source registry, and AI references.",
);
