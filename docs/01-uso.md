# 01 · Uso

[← README](../README.md) · [Diseño →](02-diseno.md)

## El guion

Hay dos sitios para escribirlo, y los dos son el mismo texto:

- **Ajustes → Guion.** Una caja de texto para pegar un guion largo. Debajo del título de la hoja verás cuántas palabras tiene y cuánto dura a la velocidad actual.
- **Sobre la pantalla.** Doble clic en el texto, la tecla <kbd>T</kbd> o el botón **Editar**. El cursor aparece donde hiciste clic; escribes con el tamaño y el ancho reales, y la pantalla sigue al cursor. <kbd>Esc</kbd> o **Listo** para terminar. Al pegar, siempre entra como texto plano.

Mientras editas, el espejo se apaga (para que puedas leer lo que escribes) y los atajos de teclado descansan.

## Leer y grabar

| Acción | Cómo |
|---|---|
| Empezar o pausar | <kbd>Espacio</kbd>, la tecla naranja o un toque en el texto |
| Cuenta atrás | Ajustes → Desplazamiento → Cuenta atrás: sin, 3, 5, 10 o 15 s. <kbd>Espacio</kbd> durante la cuenta la cancela |
| Velocidad | <kbd>↑</kbd> <kbd>↓</kbd> o el deslizador de la botonera |
| Saltar | <kbd>←</kbd> <kbd>→</kbd> (tres líneas), arrastrar el texto o la rueda del ratón |
| Volver al inicio | <kbd>R</kbd> o la tecla ⏮ |
| Pantalla completa | <kbd>F</kbd> o la tecla de esquinas |

Al empezar, la botonera se esconde a los 2,5 s; mueve el ratón para recuperarla. Mientras lee, la app pide al navegador que no apague la pantalla (*Screen Wake Lock*), si el navegador lo permite.

El piloto de la botonera dice en qué estado está: **Listo**, **Preparado** (cuenta atrás), **Leyendo**, **Pausa**, **Editando** o **Fin**. Debajo, el tiempo que queda a la velocidad actual.

## Ajustes

| Grupo | Ajustes |
|---|---|
| Tipografía | Tamaño (20–220 px), interlineado (1–2,4), ancho de texto (30–100 %), fuente (Archivo, Plex Mono, Serif), grosor, alineación, mayúsculas |
| Color | Tema Carbón, Papel o Blanco; color del texto y del fondo a mano |
| Desplazamiento | Velocidad, altura de la línea de lectura, cuenta atrás, espejo horizontal, invertir arriba y abajo, marcas de lectura |

**Restaurar ajustes** vuelve a los valores iniciales y conserva el guion.

## Con cristal (espejo)

En un teleprompter de cristal, el monitor queda boca arriba y el texto se refleja: activa **Espejo** (<kbd>M</kbd>). Si tu montaje también lo da la vuelta de arriba abajo, activa **Invertir arriba y abajo**. Arrastrar y la rueda siguen moviendo el texto en el sentido correcto.

## Dónde se guarda

En el `localStorage` de tu navegador, con la clave `teleprompter-frekvens`. Cada navegador y cada dispositivo tiene lo suyo; no se envía nada a ningún servidor. Si borras los datos del sitio, vuelve el texto de ejemplo.
