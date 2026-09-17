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
        if (route === "/playground") {
          expect(
            await page
              .locator(".code-example pre")
              .evaluate((el) => getComputedStyle(el).backgroundColor),
          ).toBe(theme === "dark" ? "rgb(13, 17, 23)" : "rgb(255, 255, 255)");
        }
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

test("hero collection and connected input focus", async ({ page }) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "Your next idea" });
  await input.fill("A better interaction");
  await expect(input).toBeFocused();
  expect(await input.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    "none",
  );
  await expect
    .poll(() =>
      input.evaluate(
        (el) => getComputedStyle(el.parentElement!, "::after").transform,
      ),
    )
    .toBe("matrix(1, 0, 0, 1, 0, 0)");
  await page.getByRole("button", { name: "Add idea", exact: true }).click();
  await expect(page.getByRole("list", { name: "Your ideas" })).toContainText(
    "A better interaction",
  );
  await page
    .getByRole("button", { name: "Remove A better interaction", exact: true })
    .click();
  await expect(input).toBeFocused();
  await expect(
    page.getByRole("list", { name: "Your ideas" }),
  ).not.toContainText("A better interaction");
});

test("highlighted examples copy exact source and wrap without navigation", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/playground?component=FzSelect");
  const code = page.locator(".code-example");
  await expect(code.locator(".code-filename")).toHaveText("SelectExample.vue");
  await expect(code.locator(".shiki")).toContainText("ForzaOption[]");
  expect(await code.locator(".line span[style]").count()).toBeGreaterThan(10);
  await code.getByRole("button", { name: "Copy FzSelect example" }).click();
  await expect(code.getByRole("status")).toHaveText("Copied to clipboard.");
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied.replaceAll("\r\n", "\n")).toBe(
    await code.locator("code").textContent(),
  );
  await code.getByRole("button", { name: "Wrap code lines" }).click();
  await expect(code).toHaveClass(/is-wrapped/);
  await page
    .getByRole("navigation", { name: "Component playground" })
    .getByRole("button", { name: "Field", exact: true })
    .click();
  await expect(code.locator(".code-filename")).toHaveText("FieldExample.vue");
  await expect(code.getByRole("status")).toHaveText("Source you can use.");
  await page.goto("/components/field");
  await expect(page.locator(".code-example .shiki")).toContainText(
    "ref<string>",
  );
});

test("overlays preserve content geometry with visible native scrollbars", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [name, trigger] of [
    ["Dropdown", "Build actions"],
    ["Select", null],
    ["Drawer", "Open filters"],
    ["Dialog", "Save a build"],
  ]) {
    await page.goto("/playground?component=Fz" + name);
    await expect(page.locator(".playground-content h2")).toHaveText(
      "Fz" + name,
    );
    await page.locator(".component-preview").waitFor();
    const opener = trigger
      ? page.getByRole("button", { name: trigger, exact: true })
      : page.getByRole("combobox");
    await opener.scrollIntoViewIfNeeded();
    const measure = () =>
      page.locator(".playground-content").evaluate((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.x, width: r.width };
      });
    const before = await measure();
    await opener.click();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");
    expect(await measure()).toEqual(before);
    if (name === "Dropdown")
      await expect(page.locator(".fz-menu")).toHaveCSS("padding", "6px");
    if (name === "Select")
      await expect(page.locator(".select-content")).toHaveCSS("padding", "6px");
    await page.keyboard.press("Escape");
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("");
    expect(await measure()).toEqual(before);
    await expect(opener).toBeFocused();
  }
});

test("checkbox transitions reverse and honor reduced motion; popover has breathing room", async ({
  page,
}) => {
  await page.goto("/components/checkbox");
  const checkbox = page.getByRole("checkbox");
  await checkbox.check();
  await expect(checkbox.locator(".checkbox-indicator")).toHaveCSS(
    "opacity",
    "1",
  );
  await checkbox.uncheck();
  await expect(checkbox.locator(".checkbox-indicator")).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(checkbox.locator(".checkbox-indicator")).toHaveCount(1);
  expect(
    await checkbox.evaluate((el) => getComputedStyle(el).transitionDuration),
  ).not.toBe("0s");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(checkbox).toHaveCSS("transition-duration", "0s");
  await page.goto("/components/popover");
  await page
    .getByRole("button", { name: "Build details", exact: true })
    .click();
  await expect(page.locator(".fz-popover")).toHaveCSS("padding", "24px");
  await page.keyboard.press("Escape");
  await page.goto("/components/alert");
  await expect(page.locator(".fz-alert").first()).toHaveCSS(
    "border-left-width",
    "1px",
  );
});

