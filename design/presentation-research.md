# Presentation direction / September 17, 2026

## Problem

The previous landing spent too much space describing abstract qualities. Eyebrows, promotional cards, and an illustrative workflow competed with the actual library. The revised presentation leads with a typographic identity and lets visitors operate shipped components before reading positioning copy.

## Primary references and decisions

- [Tyler LaHaie's Riot multi-brand design-system case study](https://www.tylerlahaie.com/riot-multi-brand-design-system): describes a web system with separate behavior, visual treatment, and content concerns. Apply that separation to Forza's reusable components, themes, and examples. Riot already has web design-system work; do not position Forza as the first web interpretation of Riot.
- [BASIC/DEPT's Riot Games website case study](https://www.basicagency.com/case-studies/riot-games-digital-strategy-brand-website): strong editorial type and brand-specific motion support content. Use a forceful typographic entrance and restrained scroll response, without copied artwork or implied affiliation.
- [Radix](https://www.radix-ui.com/): the product demonstrates itself through real controls. Use actual shipped Forza examples as the main exhibit, with source and API links adjacent.
- [shadcn-vue introduction](https://www.shadcn-vue.com/docs/introduction), [catalog](https://www.shadcn-vue.com/docs/components), [theming](https://www.shadcn-vue.com/docs/theming), and [registry](https://www.shadcn-vue.com/docs/directory): ownership, tokens, and AI-readable source are shared capabilities. Position Forza around its supplied visual/motion direction and CSS architecture, while acknowledging a smaller catalog and higher-level wrapper tradeoffs.

## Implementation rules

No landing eyebrows. No fabricated customer logos, adoption metrics, awards, or performance comparisons. Version and component count come from source metadata. Use native scrolling; no snap trapping. GSAP stays in the marketing site, loaded after mount and disabled for reduced motion. Content remains visible without animation. Theme changes preserve the sample's state. The component index mounts no demo until requested; the landing mounts only its selected specimen.

The GitHub project is public and MIT licensed. At the initial presentation review, packages were distributed through GitHub Releases. Version 0.3.3 subsequently added npm publication for the library and CLI. Chrisdalbano directs the product and visual work; implementation is AI-assisted. This is independent work, without Riot affiliation or endorsement.
