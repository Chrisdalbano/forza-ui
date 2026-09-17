#!/usr/bin/env node
import { readFile, writeFile, mkdir, access, realpath } from "node:fs/promises";
import { dirname, resolve, relative, isAbsolute, extname } from "node:path";
import { fileURLToPath } from "node:url";
const registry = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../registry",
);
const args = process.argv.slice(2);
const command = args.shift() ?? "help";
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i < 0 ? fallback : args[i + 1];
};
const cwd = resolve(option("--cwd", process.cwd()));
const dry = args.includes("--dry-run");
const force = args.includes("--force");
const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};
async function within(base, path) {
  const rel = relative(base, path);
  if (rel.startsWith("..") || isAbsolute(rel))
    throw Error("Path must remain inside the project.");
  let parent = path;
  while (!(await exists(parent))) parent = dirname(parent);
  const real = await realpath(parent);
  const realBase = await realpath(base);
  const actual = relative(realBase, real);
  if (actual.startsWith("..") || isAbsolute(actual))
    throw Error("Symlink target escapes the project.");
}
try {
  const { version } = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  if (command === "--version") {
    console.log(version);
    process.exit(0);
  }
  if (command === "help" || command === "--help") {
    console.log(
      "Forza UI CLI " +
        version +
        "\n\nforza init [--dir src/components/forza] [--cwd project] [--dry-run]\nforza add button dialog [--cwd project] [--dry-run] [--force]\nforza list [--json]\nforza doctor [--cwd project]\n\nNo network requests or package installs. Existing edits are preserved unless --force is explicit.",
    );
    process.exit(0);
  }
  const manifest = JSON.parse(
    await readFile(resolve(registry, "manifest.json"), "utf8"),
  );
  if (command === "list") {
    console.log(
      args.includes("--json")
        ? JSON.stringify(manifest)
        : manifest.components.map((c) => c.slug + "  " + c.name).join("\n"),
    );
    process.exit(0);
  }
  if (command === "init") {
    const dir = option("--dir", "src/components/forza");
    if (isAbsolute(dir)) throw Error("--dir must be relative to the project.");
    await within(cwd, resolve(cwd, dir));
    const config = resolve(cwd, "forza.config.json");
    if (await exists(config))
      throw Error("forza.config.json already exists; edit it explicitly.");
    if (!dry) {
      await writeFile(
        config,
        JSON.stringify({ schemaVersion: 1, componentsDir: dir }, null, 2) +
          "\n",
      );
      await mkdir(resolve(cwd, dir), { recursive: true });
    }
    console.log(
      (dry ? "Would initialize " : "Initialized ") +
        dir +
        "\nNext: forza add button\nInstall peers: npm install vue reka-ui @lucide/vue @formkit/auto-animate embla-carousel-vue",
    );
    process.exit(0);
  }
  const config = JSON.parse(
    await readFile(resolve(cwd, "forza.config.json"), "utf8"),
  );
  if (
    config.schemaVersion !== 1 ||
    typeof config.componentsDir !== "string" ||
    isAbsolute(config.componentsDir)
  )
    throw Error("Invalid Forza config.");
  const dest = resolve(cwd, config.componentsDir);
  await within(cwd, dest);
  if (command === "doctor") {
    const pkg = JSON.parse(
      await readFile(resolve(cwd, "package.json"), "utf8"),
    );
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const missing = [
      "vue",
      "reka-ui",
      "@lucide/vue",
      "@formkit/auto-animate",
      "embla-carousel-vue",
    ].filter((n) => !deps[n]);
    console.log(
      missing.length
        ? "Missing peers: " + missing.join(", ")
        : "Peer declarations found. Import tokens.css and wrap the app in .fz-theme.",
    );
    process.exitCode = missing.length ? 1 : 0;
  } else if (command === "add") {
    const names = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "--cwd") {
        i++;
        continue;
      }
      if (args[i].startsWith("--")) continue;
      names.push(args[i]);
    }
    if (!names.length)
      throw Error("Choose at least one component. Run forza list.");
    const chosen = names.map((n) => {
      const c = manifest.components.find((c) => c.slug === n || c.name === n);
      if (!c) throw Error("Unknown component: " + n);
      return c;
    });
    const files = new Map();
    const source = resolve(registry, "source");
    async function collect(file) {
      if (files.has(file)) return;
      const path = resolve(source, file);
      await within(source, path);
      const text = await readFile(path, "utf8");
      files.set(file, text);
      for (const match of text.matchAll(
        /(?:from\s+|import\s*)["'](\.[^"']+)["']/g,
      )) {
        let dependency = resolve(dirname(path), match[1]);
        if (!extname(dependency)) dependency += ".ts";
        await collect(relative(source, dependency));
      }
    }
    await collect("tokens.css");
    await collect("LICENSE");
    await collect("THIRD_PARTY_NOTICES.txt");
    for (const c of chosen) await collect("components/" + c.name + ".vue");
    const barrel = resolve(dest, "index.ts");
    let index = (await exists(barrel))
      ? await readFile(barrel, "utf8")
      : 'import "./tokens.css";\n';
    for (const c of chosen) {
      const line =
        "export { default as " +
        c.name +
        ' } from "./components/' +
        c.name +
        '.vue";';
      if (!index.includes(line)) index += line + "\n";
    }
    for (const [file, text] of files) {
      const target = resolve(dest, file);
      await within(cwd, target);
      if (
        (await exists(target)) &&
        (await readFile(target, "utf8")) !== text &&
        !force
      )
        throw Error(
          "Local edits found: " +
            file +
            ". Use --force only if you intend to overwrite.",
        );
    }
    await within(cwd, barrel);
    if (!dry) {
      for (const [file, text] of files) {
        const target = resolve(dest, file);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, text);
      }
      await writeFile(barrel, index);
    }
    console.log(
      (dry ? "Would write " : "Wrote ") +
        files.size +
        " source files and index.ts. Components: " +
        chosen.map((c) => c.name).join(", "),
    );
  } else throw Error("Unknown command: " + command);
} catch (error) {
  console.error("Forza: " + error.message);
  process.exitCode = 1;
}
