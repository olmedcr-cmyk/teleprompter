// Genera las imágenes del README: capturas de la app y la cabecera Hairline en SVG.
//
//   npm install --no-save playwright-core   (una vez)
//   node scripts/capturas.mjs
//
// Usa tu Chrome instalado. Necesita conexión, porque la app carga sus fuentes de Google Fonts.
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "docs/assets");
const app = pathToFileURL(join(root, "public/index.html")).href;
const fig = pathToFileURL(join(root, "public/hairline.html")).href;
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Abre la app limpia, con el tema dado, y devuelve la página. */
async function open(size, theme = "dark") {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 2 });
  await page.goto(app);
  await page.evaluate(async (t) => {
    localStorage.clear();
    set("theme", t);
    await document.fonts.ready;
  }, theme);
  await wait(400);
  return page;
}

const desk = { width: 1280, height: 800 };
const shots = [
  ["screen-carbon.png", desk, "dark", null],
  ["screen-papel.png", desk, "light", null],
  ["screen-ajustes.png", desk, "dark", async (p) => { await p.keyboard.press("e"); await wait(700); }],
  ["screen-editar.png", desk, "dark", async (p) => {
    await p.keyboard.press("t");
    await p.evaluate(() => document.execCommand("insertText", false, "Escribe aquí, en la pantalla. "));
    await wait(300);
  }],
  ["screen-cuenta.png", desk, "dark", async (p) => { await p.evaluate(() => { S.countdown = 5; toggle(); }); await wait(300); }],
  ["screen-movil.png", { width: 390, height: 800 }, "dark", null],
];
for (const [name, size, theme, act] of shots) {
  const page = await open(size, theme);
  if (act) await act(page);
  await page.screenshot({ path: join(out, name) });
  await page.close();
  console.log("docs/assets/" + name);
}

// La cabecera: la figura Hairline en reposo, como SVG con los estilos ya resueltos, en claro y en oscuro.
for (const theme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  await page.goto(fig + "?theme=" + theme);
  await wait(1800);
  const svg = await page.evaluate(() => {
    const src = document.querySelector("svg");
    const copy = src.cloneNode(true);
    const a = src.querySelectorAll("*"), b = copy.querySelectorAll("*");
    const keep = ["fill", "stroke", "stroke-width", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "opacity", "fill-opacity", "stroke-opacity"];
    a.forEach((el, i) => {
      const cs = getComputedStyle(el);
      b[i].setAttribute("style", keep.map((k) => k + ":" + cs.getPropertyValue(k)).join(";"));
      b[i].removeAttribute("class");
    });
    copy.removeAttribute("class");
    copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    copy.setAttribute("viewBox", "40 40 320 240");
    copy.setAttribute("width", "640");
    copy.setAttribute("height", "480");
    return copy.outerHTML;
  });
  await writeFile(join(out, "hero-" + theme + ".svg"), svg + "\n");
  await page.close();
  console.log("docs/assets/hero-" + theme + ".svg");
}

await browser.close();
