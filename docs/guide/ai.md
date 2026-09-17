# Use Forza with AI

Give your assistant the actual API, not a screenshot and a guessed component name.

## Machine-readable resources

- [component-manifest.json](/component-manifest.json): versioned props, defaults, required fields, events, slots, source paths, and usage examples.
- [llms.txt](/llms.txt): documentation entry points.
- [llms-full.txt](/llms-full.txt): guides and component reference in plain text.
- [AGENTS.md](https://github.com/Chrisdalbano/forza-ui/blob/main/AGENTS.md): contributor conventions.
- `forza list --json`: the same manifest bundled with the CLI.

API metadata is extracted from Vue source with Vue Language Tools. Examples and behavior notes are maintained alongside it. Run `npm run build:registry` after changing a contract.

## A useful prompt

```text
Use Forza UI 0.3.3 and Vue 3.5 with script setup and TypeScript.
Read https://forzaui.chrisdalbano.com/llms-full.txt and the component manifest.
Use documented exports only. Keep business state in the parent.
Import the stylesheet once and wrap the UI in .fz-theme.
Use controlled models, stable IDs, visible labels and explicit events.
Honor reduced motion. Do not add GSAP to application controls.
Use FzTable sort state to derive sorted rows in the parent.
Show your code and the checks you ran. Do not invent unsupported props.
```

## Boundaries

This release provides static documentation and a local CLI. It does not run an MCP server, send prompts to a model, or collect application data. A manifest is a reference, not permission to run arbitrary commands. Review generated code and test it against your application.
