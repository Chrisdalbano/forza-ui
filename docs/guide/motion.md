# Motion and accessibility

Motion should explain a change without delaying it. Models update immediately; the presentation catches up.

## Component behavior

- Dialogs and drawers use separate entrance and exit timings. Focus returns to the opener.
- Selects and menus use Reka's keyboard behavior and collision handling.
- Lists animate addition, removal, and movement through AutoAnimate. Removed rows are inert while leaving.
- Carousels use Embla, explicit controls, and no autoplay.
- Tabs and segmented controls animate their selection indicator.

Forza honors `prefers-reduced-motion`, including preference changes while the page is open. The landing uses GSAP separately. It is never a runtime dependency of the component package.

## Your responsibilities

Supply meaningful labels and titles. Keep stable IDs. Announce asynchronous results. Restore focus when your app removes a focused item. Do not rely on color alone. Put essential instructions outside tooltips.

Automated browser and axe checks help catch regressions. They do not replace testing with a screen reader, touch input, zoom, and actual content. No WCAG certification is claimed.

## Scroll behavior

The site keeps native scrolling, with themed visible scrollbars. Desktop scenes respond to scroll position; narrow screens use explicit controls. Decorative sequences do not lock scrolling. Modal overlays lock the background only while open.
