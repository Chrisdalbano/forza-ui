import { chromium } from "playwright";
import assert from "node:assert/strict";
const response = await fetch("http://127.0.0.1:5197");
assert.match(await response.text(), /Forza in Nuxt/);
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (/hydration/i.test(m.text())) errors.push(m.text());
});
await page.goto("http://127.0.0.1:5197");
await page.getByRole("textbox", { name: "Build name" }).fill("Production Nuxt");
await page.getByRole("button", { name: "Open drawer" }).click();
await page.getByRole("dialog", { name: "Build settings" }).waitFor();
await page.getByRole("combobox").click();
await page.getByRole("option", { name: "Duelist" }).click();
await page
  .getByRole("listbox", { includeHidden: true })
  .waitFor({ state: "detached" });
await page.keyboard.press("Escape");
await page.getByRole("dialog").waitFor({ state: "hidden" });
assert.equal(
  await page
    .getByRole("button", { name: "Open drawer" })
    .evaluate((el) => el === document.activeElement),
  true,
);
assert.deepEqual(errors, []);
await browser.close();
console.log(
  "Nuxt production: SSR, hydration, field, select, drawer, focus restoration passed.",
);
