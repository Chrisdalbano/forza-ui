# Forza UI contributor instructions

Vue 3.5 Composition API, script setup, TypeScript. Components live in packages/vue/src; docs and marketing live in docs. Never import marketing dependencies such as GSAP into the component library. Keep explicit props, models and typed events. Theme values use semantic CSS variables scoped to .fz-theme. Honor reduced motion. Use stable list IDs and preserve focus through overlays and removals.

Read docs/guide/ai.md and docs/public/component-manifest.json before generating component usage. Run npm run typecheck, npm test, npm run build and npm run test:browser for behavior changes. Public APIs require updated docs and changelog. Do not edit generated registry or brand derivatives; use their scripts. Never publish credentials or private vault material.
