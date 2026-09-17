# Why Forza?

Forza is a styled Vue library for teams that want its visual direction: condensed display typography, compact geometry, a restrained accent palette, and coordinated interaction states. You can install the package or copy source with the CLI.

It is an early library. Choose it because the components fit your application, not because it claims to replace every alternative.

## Compared with shadcn-vue

| Decision | Forza UI | shadcn-vue |
| --- | --- | --- |
| Starting point | A defined visual and motion language | A broader foundation you adapt into your own system |
| Styling | Scoped CSS variables; no Tailwind requirement | Tailwind-based styling with CSS-variable theming |
| Component interface | Higher-level wrappers with props, slots, and parent-owned state | More primitive composition and a wider range of components |
| Delivery | Versioned GitHub package releases or source-copy CLI | Source installation and an established registry ecosystem |
| Current scope | 25 components in an early 0.x release | A substantially broader catalog, including calendars, command menus, and sidebars |

Both offer editable source, typed Vue code, and accessible primitives through Reka UI. Source ownership, CSS variables, and AI-readable code are not exclusive advantages of Forza. Neither primitive selection nor automated checks removes the need to test accessibility in your finished application.

Forza's distinction is the set of design decisions supplied together. Its smaller API can make common compositions direct; it can also be limiting when you need behavior the wrapper does not expose. Inspect the component API before committing to it.

## Choose Forza when

- Its typography, density, colors, and feedback suit your product.
- You prefer props-driven components and CSS tokens without adopting Tailwind.
- The existing catalog covers your first workflows and you can maintain an early dependency.

Choose shadcn-vue when breadth, registry integrations, or more direct primitive composition matter more than Forza's supplied visual treatment. There is no universal winner.

## What is available today

The [component index](/components) and [workbench](/playground) use the current library catalog. Installation uses versioned GitHub Release assets; the package is **not published to npm**. The [installation guide](/guide/installation) contains the supported commands.

The marketing site's GSAP choreography is separate from the library. Installing a button does not install the landing page's animation system. Component motion uses CSS, Reka primitives, AutoAnimate for list changes, and Embla for the carousel where appropriate.

## References

This comparison is based on shadcn-vue's own [introduction](https://www.shadcn-vue.com/docs/introduction), [component catalog](https://www.shadcn-vue.com/docs/components), [theming guide](https://www.shadcn-vue.com/docs/theming), and [registry directory](https://www.shadcn-vue.com/docs/directory), reviewed September 17, 2026. Both projects will continue to change.
