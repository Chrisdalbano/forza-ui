# CLI

The CLI copies source into your project. It resolves local component imports, includes shared tokens, and adds exports to an index file. It does not run remote scripts or install dependencies.

## Install

```sh
npm install -D https://github.com/Chrisdalbano/forza-ui/releases/download/v0.3.1/chrisdalbano-forza-ui-cli-0.3.1.tgz
npx forza init
npx forza add button field dialog
```

`init` writes `forza.config.json`. The default destination is `src/components/forza`. For Nuxt 4:

```sh
npx forza init --dir app/components/forza
npx forza add button drawer
```

## Commands

| Command                         | Behavior                                  |
| ------------------------------- | ----------------------------------------- |
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
