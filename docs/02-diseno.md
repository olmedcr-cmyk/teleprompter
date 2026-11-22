# 02 · Diseño

[← Uso](01-uso.md) · [Arquitectura →](03-arquitectura.md)

La interfaz sigue **[Frekvens](https://github.com/olmedcr-cmyk/frekvens)**, el sistema de diseño de Cris Olmedo. Su regla: si no se puede usar con el pulgar y sin mirar dos veces, no está terminado. Un teleprompter es exactamente eso: un aparato que se maneja mientras miras a cámara.

## Tokens

Los tokens están copiados tal cual de `tokens.json` de Frekvens, al principio del `<style>` de `public/index.html`, con un bloque por tema:

| Tema | Atributo | Fondo · texto |
|---|---|---|
| Carbón (por defecto) | `data-frk="dark"` | `#0e0e0d` · `#f2f0ea` |
| Papel | `data-frk="light"` | `#e7e5e0` · `#111111` |
| Blanco | `data-frk="blanco"` | `#ffffff` · `#111111` (solo cambian los neutros) |

El atributo se llama `data-frk` y no `data-theme` para no chocar con el tema de la página que la contenga (por ejemplo, un artifact de claude.ai).

## Componentes

La app no carga el bundle de React de Frekvens: es un solo HTML sin dependencias. Reescribe en CSS los componentes que usa, con sus medidas y estados:

| Componente | Dónde | Cómo |
|---|---|---|
| `KeyButton` | Botonera, cerrar, restaurar | 56 px mínimo (`hit-min`), radio `md`, se hunde a 0.965 con `shadow-press`; activa en tinta |
| `LED` | Estado | Piloto de 10 × 6 px con una palabra; verde, Klein o sol; parpadeo en dos pasos |
| `Readout` | Tiempo restante | Doto 800 con cifras tabulares |
| `Slider` | Velocidad, tamaño… | Pista en píldora de 56 px, un punto de tinta en cada extremo, cursor `rams` |
| `Segmented` | Fuente, grosor, alineación, tema | Píldora de tinta; la opción elegida en papel; flechas para cambiar |
| `Switch` | Mayúsculas, espejo, marcas | 120 × 56, disco que viaja y se vuelve `sol`, con ON/OFF |
| `Select` | Cuenta atrás | Píldora de 56 px sobre `well` |
| `Sheet` | Ajustes | Hoja que sube con `dur-sheet` y `ease-ui`; asa para arrastrar, fondo, <kbd>Esc</kbd> o ×; atrapa el foco |

## Color con intención

- **Rams** (naranja) es el mando físico: la tecla de empezar, los cursores, el progreso y las marcas de lectura.
- **Klein** es «en marcha»: el piloto mientras lee.
- **Sol** es «ojo»: preparado, pausa, editando, y la selección de texto.
- **Verde** es «listo».

## Dónde se aparta de Frekvens

- La lista de **Cuenta atrás** usa el menú nativo del navegador, no el panel de tinta de `Select`.
- El **Segmented** cambia de opción sin el desplazamiento animado de la pieza.
- Los **deslizadores de la botonera** llevan la etiqueta encima, como en el sistema, pero la barra es más ancha que alta para tapar poco texto.
- La hoja de **Ajustes** ocupa hasta el 88 % del alto; para afinar tamaño y velocidad viendo el texto, usa la botonera.

## Accesibilidad

- Foco visible de 2 px en `focus` en todos los controles.
- Interruptores con `role="switch"`, segmentados con `role="radiogroup"`, hoja con `role="dialog"` y `aria-modal`.
- Con *reducir movimiento*, no hay transiciones.
- El texto de la app pasa 4.5:1 en los tres temas; los colores que elijas a mano son responsabilidad tuya.
