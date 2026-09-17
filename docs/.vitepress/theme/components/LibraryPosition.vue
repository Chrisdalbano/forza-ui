<script setup lang="ts">
import { componentCatalog } from "../componentCatalog";
import library from "../../../../packages/vue/package.json";
</script>
<template>
  <section class="presentation-section library-position">
    <h2 class="reveal">
      A point of view.<br /><em>Built into the details.</em>
    </h2>
    <div class="position-rows reveal">
      <article>
        <h3>The supplied design.</h3>
        <p>
          Start with a coherent visual language: compact geometry, expressive
          type, and coordinated feedback. Props-driven Vue components, scoped
          CSS variables, and no Tailwind requirement.
        </p>
      </article>
      <article>
        <h3>The tradeoff.</h3>
        <p>
          Use shadcn-vue when you want a broader catalog and more freedom to
          assemble your own system. Choose Forza when its visual direction fits
          your app and you want those decisions made together.
        </p>
        <a class="site-link" href="/guide/why-forza">Read the tradeoffs</a>
      </article>
      <article>
        <h3>Own the result.</h3>
        <p>
          Install the package or copy component source with the CLI. Typed
          examples and machine-readable references help people and coding tools
          work from the same API. Source ownership is a shared open-source
          strength, not a Forza exclusive.
        </p>
      </article>
    </div>
  </section>
  <section class="presentation-section source-section">
    <div class="reveal">
      <h2>Open to inspection.<br /><em>Open to contribution.</em></h2>
      <p>
        Version {{ library.version }}. {{ componentCatalog.length }} components.
        MIT licensed.<br />An early library, with its source, limitations, and
        decisions in public.
      </p>
    </div>
    <div class="source-links reveal">
      <a href="/guide/installation"
        >Install from a GitHub Release <span>&#8599;</span></a
      ><a href="https://github.com/Chrisdalbano/forza-ui"
        >Read the source <span>&#8599;</span></a
      ><a href="/contributing">Contribute <span>&#8599;</span></a
      ><a href="/guide/ai">Use with coding agents <span>&#8599;</span></a>
    </div>
  </section>
</template>
