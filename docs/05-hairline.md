# 05 · Hairline

[← Despliegue](04-despliegue.md) · [README](../README.md)

La cabecera del README y [`/hairline.html`](https://teleprompter-1cq.pages.dev/hairline.html) son una figura **[Hairline](https://github.com/lucasmarkes/hairline)**: un dibujo isométrico hecho de sólidos redondeados en un solo trazo, que responde al puntero.

## La figura

> **Teleprompter.** Un monitor boca arriba bajo un cristal a 45°, con la cámara detrás mirando a través. El guion son siete barras en la pantalla y las mismas siete en el cristal. La línea bajo el puntero sube de la pantalla y se enciende, en la pantalla y en el cristal; sus vecinas suben menos, escalonadas hacia fuera. El lector dice `línea 5`; en reposo, `rest`.

- **Reposo:** la línea 3 un poco levantada y encendida: es la línea de lectura, donde empieza la vista.
- **Deslizador:** el escalonado, en milisegundos (0, 45 y 90).
- **Vuelta:** línea 2, línea 7, línea 4 y vuelta al reposo.
- **Reglas en las que se apoya:** 01 (el puntero se prueba contra el plano de la pantalla en reposo, que nunca se mueve), 02 (escalonado por distancia), 04 (el trazo brillante es el único realce) y 06 (el cristal no tiene relleno porque es cristal; todo lo demás es opaco y se pinta de atrás adelante).

## Archivos

| Archivo | Qué es |
|---|---|
| `docs/hairline/teleprompter.js` | La figura: lo único escrito para este proyecto |
| `public/hairline.html` | La página montada: motor y banco de Hairline, sin cambios, más la figura |
| `docs/assets/hero-light.svg`, `hero-dark.svg` | La figura en reposo, como SVG estático para el README (GitHub no ejecuta scripts) |

## Rehacerla

Hace falta la skill `hairline-create` (de [@lucasmarkes/hairline](https://github.com/lucasmarkes/hairline)) en `~/.claude/skills/hairline-create`, o la ruta en `HAIRLINE=`:

```bash
make hairline        # reconstruye public/hairline.html
make hairline-look   # valida y saca la hoja de revisión (necesita Chrome)
make capturas        # regenera la cabecera SVG y las capturas
```

El motor y el banco no se editan nunca: si algo no sale, la que está mal es la figura.
