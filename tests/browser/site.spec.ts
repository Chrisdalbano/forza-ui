import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [390, 768, 1440])
  test("site layouts and contrast " + width, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/guide/installation", "/playground"]) {
      await page.goto(route);
      await page.locator("h1").first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const theme of ["dark", "light"]) {
        await page.evaluate((t) => {
          document.documentElement.classList.toggle("dark", t === "dark");
          localStorage.setItem("vitepress-theme-appearance", t);
        }, theme);
        await page.reload();
        await page.locator("h1").first().waitFor();
        if (route === "/playground")
          await page.locator(".component-preview").waitFor();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(result.violations).toEqual([]);
        await page.screenshot({
          path:
            "test-results/" +
            route.replaceAll("/", "_") +
            "-" +
            theme +
            "-" +
            width +
            ".png",
          fullPage: true,
        });
      }
    }
  });
test("all component pages and previews render without errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.request.get("/component-manifest.json");
  const manifest = await response.json();
  expect(manifest.components).toHaveLength(25);
  for (const c of manifest.components) {
    await page.goto("/components/" + c.slug);
    await expect(page.locator(".component-preview")).toBeVisible();
    await expect(page.locator("h1").first()).toHaveText(c.name.slice(2));
  }
  expect(errors).toEqual([]);
});
test("SPA navigation, source code and drawer focus", async ({ page }) => {
  await page.goto("/playground?component=FzDrawer");
  await page.locator(".component-preview").waitFor();
  await page.getByRole("button", { name: "Open filters", exact: true }).click();
  const dialog = page.getByRole("dialog", {
    name: "Build filters",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open filters", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("navigation", { name: "Component playground" })
    .getByRole("button", { name: "Checkbox", exact: true })
    .click();
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await expect(page).toHaveURL(/component=FzCheckbox/);
  await expect(page.locator(".preview-code")).toContainText("v-model");
});
test("documentation search and keyboard select", async ({ page }) => {
  await page.goto("/components/select");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Guardian", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("option", { name: "Caster", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".demo-feedback")).not.toHaveText(
    "Current value: guardian",
  );
  await page
    .getByRole("button", { name: "Search", exact: false })
    .first()
    .click();
  await page.getByPlaceholder("Search").fill("theming");
  await expect(
    page.getByRole("option", { name: /Theming/ }).first(),
  ).toBeVisible();
});
test("scroll scene changes and reduced-motion reverts transforms", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".brand-scene").waitFor();
  await page.locator(".component-gateway").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".scene-tile")
        .first()
        .evaluate((el) => el.style.transform),
    )
    .toBe("");
  await expect(page.locator(".scene-tile").first()).toBeVisible();
});
