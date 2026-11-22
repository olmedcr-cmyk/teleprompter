# Seguridad

Si encuentras una vulnerabilidad, **no abras un issue público**. Usa los avisos privados de seguridad de GitHub en este repositorio (pestaña *Security* → *Report a vulnerability*).

Superficie a tener en cuenta:

- **El guion vive en el navegador.** Se guarda en `localStorage` y no se envía a ningún sitio. Un cambio que lo mande fuera es un fallo de seguridad.
- **Sin código de terceros.** La app no carga scripts externos; solo las fuentes de Google Fonts. `scripts/check.mjs` lo comprueba en cada push.
- **Cabeceras.** `public/_headers` fija una CSP cerrada y prohíbe que la app se incruste en otras páginas. Relájalas solo con un motivo escrito en el PR.
- **El texto se pinta como texto.** El guion entra con `textContent` y la edición en pantalla es de texto plano: nunca se interpreta como HTML.
