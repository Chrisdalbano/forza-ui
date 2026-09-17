import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
const names = [
  "Button",
  "Field",
  "Select",
  "Checkbox",
  "Slider",
  "Switch",
  "Segmented",
  "Tabs",
  "Stepper",
  "Pagination",
  "Accordion",
  "Carousel",
  "Dropdown",
  "Dialog",
  "Drawer",
  "Popover",
  "Tooltip",
  "Table",
  "List",
  "Alert",
  "Badge",
  "Meter",
  "Stat",
  "Panel",
  "Icon",
];
export default defineConfig({
  title: "Forza UI",
  description:
    "Vue components with character. Typed, themeable, and built for real application workflows.",
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    theme: { light: "github-light", dark: "github-dark-default" },
  },
  lastUpdated: true,
  appearance: "dark",
  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/brand/favicon.svg" },
    ],
    ["link", { rel: "icon", sizes: "32x32", href: "/brand/favicon-32.png" }],
    ["link", { rel: "apple-touch-icon", href: "/brand/apple-touch-icon.png" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://forzaui.web.app/brand/social.png",
      },
    ],
    ["meta", { name: "theme-color", content: "#101416" }],
  ],
  sitemap: { hostname: "https://forzaui.web.app" },
  vite: {
    resolve: {
      alias: {
        "@forza": fileURLToPath(
          new URL("../../packages/vue/src/index.ts", import.meta.url),
        ),
      },
    },
    ssr: { noExternal: ["@formkit/auto-animate"] },
  },
  themeConfig: {
    logo: {
      alt: "Forza UI home",
      light: "/brand/wordmark-ink.svg",
      dark: "/brand/wordmark-paper.svg",
    },
    siteTitle: false,
    nav: [
      { text: "Docs", link: "/guide/installation" },
      { text: "Components", link: "/components" },
      { text: "Playground", link: "/playground" },
      { text: "Changelog", link: "/changelog" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Chrisdalbano/forza-ui" },
    ],
    search: { provider: "local" },
    sidebar: [
      {
        text: "Start here",
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          { text: "Why Forza?", link: "/guide/why-forza" },
          { text: "Installation", link: "/guide/installation" },
          { text: "CLI", link: "/guide/cli" },
          { text: "Vue & Nuxt", link: "/guide/nuxt" },
          { text: "Theming", link: "/guide/theming" },
          { text: "Motion & accessibility", link: "/guide/motion" },
          { text: "AI integration", link: "/guide/ai" },
        ],
      },
      {
        text: "Components",
        items: names.map((n) => ({
          text: n,
          link: "/components/" + n.toLowerCase(),
        })),
      },
      {
        text: "Project",
        items: [
          { text: "Brand assets", link: "/guide/brand" },
          { text: "Contributing", link: "/contributing" },
          { text: "Changelog", link: "/changelog" },
        ],
      },
    ],
    outline: [2, 3],
    editLink: {
      pattern: "https://github.com/Chrisdalbano/forza-ui/edit/main/docs/:path",
    },
    footer: {
      message: "Released under the MIT License. Independent work.",
      copyright: "Copyright 2026 Christian D'Albano",
    },
  },
});
