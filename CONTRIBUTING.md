# Contribuir

Gracias por querer mejorar el teleprompter.

## Antes de empezar

```bash
make dev      # http://localhost:8765
make check    # lo mismo que la CI
```

## Criterios

- **Un solo archivo, sin dependencias.** `public/index.html` se abre directamente en el navegador. Nada de frameworks, paquetes ni paso de compilación.
- **Frekvens.** Los colores, medidas y movimientos salen de sus tokens. Un control nuevo usa un componente del sistema; si se aparta, se dice en [docs/02-diseno.md](docs/02-diseno.md).
- **Grabar no se interrumpe.** Nada abre diálogos, avisa ni cambia la velocidad por su cuenta mientras el texto sube.
- **Privado por defecto.** El guion no sale del navegador. Nada de analítica, cookies ni llamadas a servidores.
- **Accesible.** Todo se puede hacer con teclado, con foco visible y nombres accesibles.
- **Documentación en español**, con el README también en inglés. Si cambias un atajo o un ajuste, actualiza el README y [docs/01-uso.md](docs/01-uso.md).

## Pull requests

Prueba el cambio en un navegador de escritorio y en uno móvil, en tema Carbón y Papel, y con el espejo activado. Si cambia algo visible, regenera las capturas con `make capturas`.

## Commits

Mensajes cortos en imperativo, en español o en inglés: «Añade atajo para el espejo vertical», «Fix countdown when sheet is open».
