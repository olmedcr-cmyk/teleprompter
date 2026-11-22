# Cambios

## 0.1.0 · 2026-11-22

Primera versión pública.

- Teleprompter en un solo HTML, sin dependencias: desplazamiento suave con `requestAnimationFrame`, velocidad medida en líneas, línea de lectura ajustable, progreso y tiempo restante.
- Edición del guion directamente sobre la pantalla (doble clic o <kbd>T</kbd>), con el cursor donde se hizo clic y pegado en texto plano.
- Ajustes de tipografía (tamaño, interlineado, ancho, fuente, grosor, alineación, mayúsculas), color (temas Carbón, Papel y Blanco, colores a mano) y desplazamiento (velocidad, línea de lectura, cuenta atrás de 0 a 15 s, espejo horizontal y vertical).
- Diseño Frekvens: botonera de teclas, piloto LED, cifras Doto, deslizadores, segmentados, interruptores y hoja de ajustes.
- Atajos de teclado, arrastre, rueda, pantalla completa y pantalla siempre encendida mientras lee.
- Guion y ajustes guardados en el navegador.
- Figura Hairline del teleprompter para la cabecera y en `/hairline.html`.
- Despliegue en Cloudflare Pages con cabeceras de seguridad; CI con comprobaciones estáticas.
