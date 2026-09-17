# CLI

The CLI copies source into your project. It resolves local component imports, includes shared tokens, and adds exports to an index file. It does not run remote scripts or install dependencies.

## Install

::: code-group

```sh [npm]
npm install -D @chrisdalbano/forza-ui-cli
npx forza init
npx forza add button field dialog
```

```sh [pnpm]
pnpm add -D @chrisdalbano/forza-ui-cli
pnpm exec forza init
pnpm exec forza add button field dialog
```

```sh [Yarn]
yarn add -D @chrisdalbano/forza-ui-cli
yarn forza init
yarn forza add button field dialog
```

```sh [Bun]
bun add -d @chrisdalbano/forza-ui-cli
bunx forza init
bunx forza add button field dialog
```

:::

For a one-off command without a local CLI dependency:

```sh
npx @chrisdalbano/forza-ui-cli@0.3.3 init
```

The CLI is separate from the prebuilt library package. Use it when you want component source inside your project; you do not need both distribution methods.

`init` writes `forza.config.json`. The default destination is `src/components/forza`. For Nuxt 4:

```sh
npx forza init --dir app/components/forza
npx forza add button drawer
```

## Commands

| Command                         | Behavior                                  |
| ------------------------------- | ----------------------------------------- |
| `forza --version` | Print the installed CLI version |
| `forza list`                    | List components                           |
| `forza list --json`             | Read the versioned API manifest           |
| `forza init --dir src/ui/forza` | Set the source destination                |
| `forza add button dialog`       | Copy components and local dependencies    |
| `forza add drawer --dry-run`    | Validate without writing                  |
| `forza add drawer --force`      | Explicitly replace edited component files |
| `forza doctor`                  | Check config and peer declarations        |
| `--cwd path/to/app`             | Target another project                    |

Unknown names and paths outside the project are rejected. Local edits stop the add operation before writing. Identical files can be added again. The CLI never removes files.

## After copying

Install the peers listed by `init`, then import your generated local barrel:

```ts
import { FzButton, FzDialog } from "./components/forza";
```

The source barrel imports tokens. Keep the `.fz-theme` wrapper. You own copied files; updates are explicit.

## Run from a checkout

```sh
npm ci
npm run build:registry
node packages/cli/bin/forza.mjs init --cwd ../my-app
node packages/cli/bin/forza.mjs add button --cwd ../my-app
```
