import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "packages/vue/dist",
    lib: {
      entry: "packages/vue/src/index.ts",
      formats: ["es"],
      fileName: "forza",
    },
    rollupOptions: {
      external: [
        "vue",
        "reka-ui",
        "@lucide/vue",
        "@formkit/auto-animate",
        "embla-carousel-vue",
      ],
    },
  },
});
