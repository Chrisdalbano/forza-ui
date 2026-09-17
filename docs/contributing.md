# Contributing

Forza is an early project. Small, reproducible improvements are welcome.

## Local development

```sh
git clone https://github.com/Chrisdalbano/forza-ui.git
cd forza-ui
npm ci
npm run build:registry
npm run dev
```

## Before a pull request

```sh
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

Components belong in `packages/vue/src`. Keep marketing code in `docs`. Use typed props and events, semantic tokens, stable IDs, and reduced-motion fallbacks. Update examples and changelog when a public contract changes. Generate registry and API pages through the build script.

Open an issue with a reproduction before proposing a major API change. Do not include access tokens or private data in examples.
