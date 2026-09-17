import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  workers: 2,
  use: { baseURL: "http://127.0.0.1:5196", browserName: "chromium" },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5196",
    reuseExistingServer: true,
  },
  reporter: "list",
});
