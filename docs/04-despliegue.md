# 04 · Despliegue

[← Arquitectura](03-arquitectura.md) · [Hairline →](05-hairline.md)

La versión pública está en **https://teleprompter-1cq.pages.dev**, un proyecto de **Cloudflare Pages** llamado `teleprompter`. Se sube la carpeta `public/` tal cual: no hay compilación.

## A mano

Con [wrangler](https://developers.cloudflare.com/workers/wrangler/) y sesión iniciada (`wrangler login`):

```bash
make deploy
```

que equivale a:

```bash
node scripts/check.mjs
npx wrangler pages deploy public --project-name teleprompter --branch main
```

## Automático, desde GitHub

`.github/workflows/deploy.yml` despliega en cada push a `main` **si** el repositorio tiene estos secretos (Settings → Secrets and variables → Actions):

| Secreto | De dónde sale |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → plantilla *Edit Cloudflare Workers*, o un token con permiso *Cloudflare Pages: Edit* |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → Workers & Pages → *Account ID* en la columna derecha |

Sin ellos, el flujo termina en verde sin desplegar y lo dice en el resumen.

## Cabeceras

`public/_headers` aplica en Pages:

- `Content-Security-Policy` cerrada: solo scripts y estilos en línea y las fuentes de Google; nada de marcos externos.
- `Permissions-Policy` que solo permite pantalla completa y mantener la pantalla encendida.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` y `Referrer-Policy`.

## Dominio propio

Cloudflare → Workers & Pages → `teleprompter` → *Custom domains* → *Set up a domain*. Si el dominio ya está en Cloudflare, el DNS se crea solo.
