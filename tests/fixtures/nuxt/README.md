# Nuxt production consumer

Copy this directory into `.smoke/nuxt` at the repository root. Run `npm run build:lib` in the root and `npm pack --workspace packages/vue --pack-destination .smoke`. In the consumer directory, run `npm install` and `npm install ../chrisdalbano-forza-ui-0.3.1.tgz`, then `npm run build` and `node .output/server/index.mjs`.

Check the server-rendered heading, edit the field, open the drawer, choose Duelist, close the drawer, and check focus returns to the opener. Browser hydration warnings and uncaught errors must be absent. The checked-in verification script uses port 5197; set NITRO_PORT=5197 when starting the server.
