import { SVG, registerWindow } from "@svgdotjs/svg.js";
import { createSVGWindow } from "svgdom";
import { optimize } from "svgo";
import sharp from "sharp";
import opentype from "opentype.js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const window = createSVGWindow();
registerWindow(window, window.document);
const out = "docs/public/brand";
await mkdir(out, { recursive: true });
await mkdir("brand", { recursive: true });
const palette = { ink: "#101416", paper: "#f2efe6", coral: "#ff8069" };
// Forward Fold: one 12-unit rhythm, a 24-unit spine, and a consistent 2:3 diagonal.
// The two open counters make an F; the displaced foot carries the forward motion.
const paths = [
  "M48 12H116L100 36H64L56 48H92L76 72H40L16 108H8Z",
  "M68 84H96L80 108H52Z",
];
function symbol(color) {
  const svg = SVG().size(128, 128).viewbox(0, 0, 128, 128);
  const g = svg.group().fill(color);
  paths.forEach((p) => g.path(p));
  return svg;
}
async function save(name, svg) {
  const data = optimize(svg.svg(), { multipass: true }).data;
  await writeFile(out + "/" + name, data);
  return data;
}
for (const [name, color] of Object.entries(palette)) {
  await save("symbol-" + name + ".svg", symbol(color));
}
await writeFile("brand/symbol-master.svg", symbol(palette.coral).svg());
const buffer = await readFile(
  "node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff",
);
const font = opentype.parse(
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
);
const bodyBuffer = await readFile(
  "node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff",
);
const bodyFont = opentype.parse(
  bodyBuffer.buffer.slice(
    bodyBuffer.byteOffset,
    bodyBuffer.byteOffset + bodyBuffer.byteLength,
  ),
);
for (const [name, color] of [
  ["ink", palette.ink],
  ["paper", palette.paper],
]) {
  const svg = SVG().size(430, 100).viewbox(0, 0, 430, 100);
  const g = svg.group().scale(0.68).translate(0, 5);
  paths.forEach((p) => g.path(p).fill(color));
  svg.path(font.getPath("FORZA", 105, 80, 98).toPathData(3)).fill(color);
  svg.path(bodyFont.getPath("UI", 390, 76, 22).toPathData(3)).fill(color);
  await save("wordmark-" + name + ".svg", svg);
}
const fav = SVG().size(128, 128).viewbox(0, 0, 128, 128);
fav.rect(128, 128).radius(26).fill(palette.ink);
const fg = fav.group().scale(0.78).translate(14, 14);
paths.forEach((p) => fg.path(p).fill(palette.coral));
const favicon = await save("favicon.svg", fav);
for (const size of [16, 32, 48, 180, 192, 512])
  await sharp(Buffer.from(favicon))
    .resize(size, size)
    .png()
    .toFile(
      out +
        "/" +
        (size === 180 ? "apple-touch-icon.png" : "favicon-" + size + ".png"),
    );
// ICO embeds PNG images, preserving alpha at each optical size.
const pngs = await Promise.all(
  [16, 32, 48].map((s) => readFile(out + "/favicon-" + s + ".png")),
);
const header = Buffer.alloc(6 + 16 * 3);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(3, 4);
let offset = header.length;
[16, 32, 48].forEach((s, i) => {
  const at = 6 + 16 * i;
  header[at] = s;
  header[at + 1] = s;
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(pngs[i].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += pngs[i].length;
});
await writeFile(out + "/favicon.ico", Buffer.concat([header, ...pngs]));
const social = SVG().size(1200, 630).viewbox(0, 0, 1200, 630);
social.rect(1200, 630).fill(palette.ink);
social.line(64, 72, 1136, 72).stroke({ color: "#465257", width: 1 });
social
  .path(
    bodyFont
      .getPath("FORZA UI / OPEN-SOURCE VUE COMPONENTS", 64, 51, 20)
      .toPathData(3),
  )
  .fill(palette.paper);
social
  .path(font.getPath("A LITTLE MORE", 60, 254, 130).toPathData(3))
  .fill(palette.paper);
social
  .path(font.getPath("FORCE.", 60, 430, 188).toPathData(3))
  .fill(palette.coral);
social
  .path(
    bodyFont
      .getPath("Typed APIs. Considered motion. Your application.", 66, 550, 24)
      .toPathData(3),
  )
  .fill("#c9cec8");
const sg = social.group().scale(2.5).translate(800, 182);
paths.forEach((p) => sg.path(p).fill(palette.coral));
social
  .path(bodyFont.getPath("FORZAUI.WEB.APP", 916, 575, 17).toPathData(3))
  .fill("#c9cec8");
const og = await save("social.svg", social);
await sharp(Buffer.from(og))
  .png()
  .toFile(out + "/social.png");
await sharp(Buffer.from(og))
  .webp({ quality: 90 })
  .toFile(out + "/social.webp");
console.log(
  "Brand masters, optimized SVG, WebP, social PNG and multiresolution ICO generated.",
);
