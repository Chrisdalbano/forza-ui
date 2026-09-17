# Forza UI

Vue components with character. Typed APIs, scoped themes, and application-focused motion.

[Documentation](https://forzaui.chrisdalbano.com) / [Components](https://forzaui.chrisdalbano.com/components) / [Playground](https://forzaui.chrisdalbano.com/playground) / [Why Forza?](https://forzaui.chrisdalbano.com/guide/why-forza) / [Installation](https://forzaui.chrisdalbano.com/guide/installation)

An independent project by Chrisdalbano, developed with AI assistance. Includes 25 components, Ink and Paper themes, a source-copy CLI, and generated API metadata for people and agents.

## Develop

```sh
npm ci
npm run build:registry
npm run dev
```

## Check and build

```sh
npm run typecheck
npm run typecheck:examples
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

## Structure

- `packages/vue`: source, tokens, ESM build and declarations.
- `packages/cli`: offline source-copy CLI with conflict protection.
- `docs`: VitePress site, SPA playground, guides and generated API pages.
- `meta`: maintained usage examples and behavior notes.
- `brand`: SVG master. Generate derivatives with `scripts/brand.mjs`.

Release tarballs are distributed through GitHub Releases. No npm registry publication is claimed. Vue SSR, the static site, and a Nuxt 4.5.2 production consumer are verified. See tests/fixtures/nuxt for the consumer fixture.

MIT licensed. Third-party notices are preserved. GSAP belongs to the marketing site, not the component package. Not affiliated with Riot Games or Microsoft/Turn 10.

## CI setup

The checked-in `.github/checks-template.yml` runs the verification commands above. To enable GitHub Actions, move it to `.github/workflows/check.yml` using credentials with workflow permission. The publishing session could push source but lacked that permission, so automated CI is not active yet.
