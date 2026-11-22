// Comprobaciones estáticas de public/: las que corre la CI en cada push.
// Sin dependencias: node scripts/check.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

const ALLOWED = ["fonts.googleapis.com", "fonts.gstatic.com"];

for (const file of ["public/index.html", "public/hairline.html"]) {
  const html = await readFile(join(root, file), "utf8");
  const kb = Buffer.byteLength(html) / 1024;

  ok(/^<!doctype html>/i.test(html.trim()), `${file}: falta <!doctype html>`);
  ok(/<html lang="es"|<html lang=/.test(html), `${file}: falta el atributo lang`);
  ok(/<meta name="viewport"/.test(html), `${file}: falta la etiqueta viewport`);
  ok(kb < 200, `${file}: pesa ${kb.toFixed(0)} KB (límite 200 KB)`);

  // Nada se carga de fuera, salvo las fuentes.
  for (const [, url] of html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)) {
    const host = new URL(url).hostname;
    ok(ALLOWED.includes(host), `${file}: carga ${host}, que no está permitido`);
  }
  ok(!/<script[^>]+src=/.test(html), `${file}: tiene scripts externos`);

  // Cada <script> en línea se compila sin errores de sintaxis.
  for (const [, code] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    try { new vm.Script(code, { filename: file }); }
    catch (e) { fails.push(`${file}: error de sintaxis en un <script>: ${e.message}`); }
  }
}

// La app: los elementos de los que depende el código existen.
const app = await readFile(join(root, "public/index.html"), "utf8");
for (const id of ["stage", "text", "bar", "play", "sheet", "panel", "count", "hint", "state", "time"]) {
  ok(app.includes(`id="${id}"`), `public/index.html: falta #${id}`);
}
for (const k of ["speed", "size", "lh", "width", "guide", "countdown", "script", "theme", "font", "flipH"]) {
  ok(app.includes(`data-k="${k}"`), `public/index.html: falta el control data-k="${k}"`);
}

if (fails.length) {
  console.error("✘ " + fails.join("\n✘ "));
  process.exit(1);
}
console.log("✔ public/ pasa las comprobaciones");
