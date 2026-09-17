import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  readFile,
  writeFile,
  access,
  mkdir,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
const cli = resolve("packages/cli/bin/forza.mjs");
const run = (cwd, ...args) =>
  spawnSync(process.execPath, [cli, ...args, "--cwd", cwd], {
    encoding: "utf8",
  });
const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};
test("init and add copy transitive imports, notices and stable exports", async () => {
  const dir = await mkdtemp(join(tmpdir(), "forza-cli-"));
  assert.equal(run(dir, "init").status, 0);
  assert.equal(run(dir, "add", "dialog").status, 0);
  assert.ok(
    await exists(join(dir, "src/components/forza/components/FzIcon.vue")),
  );
  assert.ok(
    await exists(join(dir, "src/components/forza/internal/FzPortal.vue")),
  );
  assert.ok(await exists(join(dir, "src/components/forza/LICENSE")));
  assert.equal(run(dir, "add", "dialog").status, 0);
  const barrel = await readFile(
    join(dir, "src/components/forza/index.ts"),
    "utf8",
  );
  assert.equal((barrel.match(/FzDialog/g) || []).length, 2);
});
test("dry-run and invalid names write nothing", async () => {
  const dir = await mkdtemp(join(tmpdir(), "forza-cli-"));
  assert.equal(run(dir, "init", "--dry-run").status, 0);
  assert.equal(await exists(join(dir, "forza.config.json")), false);
  run(dir, "init");
  assert.equal(run(dir, "add", "button", "--dry-run").status, 0);
  assert.equal(await exists(join(dir, "src/components/forza/index.ts")), false);
  assert.equal(run(dir, "add", "unknown").status, 1);
});
test("modified dependency blocks entire add; force is explicit", async () => {
  const dir = await mkdtemp(join(tmpdir(), "forza-cli-"));
  run(dir, "init");
  run(dir, "add", "button");
  const icon = join(dir, "src/components/forza/components/FzIcon.vue");
  await writeFile(icon, "user changes");
  assert.equal(run(dir, "add", "dialog").status, 1);
  assert.equal(await readFile(icon, "utf8"), "user changes");
  assert.equal(
    await exists(join(dir, "src/components/forza/components/FzDialog.vue")),
    false,
  );
  assert.equal(run(dir, "add", "dialog", "--force").status, 0);
  assert.notEqual(await readFile(icon, "utf8"), "user changes");
});
test("path traversal and symlink escapes are rejected", async () => {
  const dir = await mkdtemp(join(tmpdir(), "forza-cli-"));
  assert.equal(run(dir, "init", "--dir", "../escape").status, 1);
  const outside = await mkdtemp(join(tmpdir(), "forza-outside-"));
  await symlink(
    outside,
    join(dir, "link"),
    process.platform === "win32" ? "junction" : "dir",
  );
  assert.equal(run(dir, "init", "--dir", "link/forza").status, 1);
});
