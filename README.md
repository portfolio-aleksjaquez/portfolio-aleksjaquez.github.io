# Portafolio · Alejandro Jaquez

Sitio del portafolio, hecho con [Astro](https://astro.build) y publicado en
GitHub Pages en **https://portfolio-aleksjaquez.github.io/** (en la raíz, sin
base path). La raíz redirige a `/es/`.

## Requisitos y comandos

- Node 22.23.4 o superior
- pnpm 10

```bash
pnpm install        # instalar dependencias
pnpm dev            # servidor local en http://localhost:4321/es/
pnpm check          # revisión de tipos (astro check)
pnpm build          # genera dist/
pnpm preview        # sirve dist/ localmente
pnpm sync-assets    # copia y optimiza las capturas de los proyectos (solo local)
pnpm og             # regenera public/og.png (requiere Google Chrome)
```

## Estructura

```
src/
  data/site.ts        ← datos personales (nombre, correo, WhatsApp, bio, tecnologías)
  data/projects.ts    ← lista de proyectos, en orden
  i18n/config.ts      ← idiomas conocidos y habilitados
  i18n/es.ts          ← textos de la interfaz en español (fuente de verdad del tipo)
  i18n/en.ts          ← textos en inglés (por ahora copia del español, TODO)
  components/         ← secciones del sitio (Hero, Proyectos, Sobre mí, …)
  lib/assets.ts       ← lee los manifiestos de capturas en build
  pages/[lang]/       ← página principal por idioma (/es/)
public/
  projects/<slug>/    ← capturas optimizadas + manifest.json (commiteadas)
  og.png, favicon.svg, robots.txt
scripts/
  sync-assets.mjs     ← sincronización de capturas (uso local)
  make-og.mjs         ← generador de la imagen para redes sociales
```

## Actualizar datos personales

Todo está en `src/data/site.ts` y marcado con `TODO`:

- **Correo** (`email`) y **WhatsApp** (`whatsapp`): mientras valgan
  `'PENDIENTE'`, los botones aparecen deshabilitados con la leyenda
  «Disponible pronto». El WhatsApp va solo con dígitos y lada internacional,
  por ejemplo `521XXXXXXXXXX`.
- **Bio**: es un BORRADOR genérico. Revísalo y agrega experiencia real.
- **Tecnologías**: lista `skills`, con una explicación sin jerga de cada una.

**CV:** coloca el archivo en `public/cv.pdf`. Si no existe, el botón
«Descargar CV» se muestra deshabilitado automáticamente (se revisa en el build).

## Agregar o editar proyectos

Edita `src/data/projects.ts`. Cada proyecto tiene:

| Campo      | Qué es                                                        |
| ---------- | ------------------------------------------------------------- |
| `slug`     | Carpeta pública de capturas: `public/projects/<slug>/`        |
| `kind`     | `'live'` (demo en vivo, botón «Ver demo») o `'screens'` (galería) |
| `demoUrl`  | URL de la demo (solo `live`)                                  |
| `tags`     | Tecnologías, se muestran como etiquetas pequeñas              |
| `videoSoon`| Muestra la insignia «Video próximamente»                      |
| `text`     | Título, descripción (2–3 líneas, beneficio) y nota opcional, por idioma |

El orden del arreglo es el orden en la página y en el índice del inicio.

## Sincronizar capturas (assets)

Las capturas originales (PNG) se generan fuera del repo, en
`../assets/<carpeta>/*.png` (junto a este repositorio). Para traerlas:

```bash
pnpm sync-assets                     # usa ../assets
pnpm sync-assets -- /ruta/a/assets   # o ASSETS_DIR=/ruta pnpm sync-assets
```

Por cada proyecto el script:

1. Busca los PNG de `<assets>/<slug>/` (orden natural por nombre de archivo).
2. Reemplaza `public/projects/<slug>/` con archivos numerados:
   `01.png` (copia optimizada), `01.webp` (máx. 1600 px) y
   `01-thumb.webp` (miniatura de 720 px).
3. Escribe `public/projects/<slug>/manifest.json`, que el sitio lee en el build.
   Si un proyecto no tiene capturas, el sitio muestra una imagen de reemplazo.

**Pies de foto:** si la carpeta incluye `captions.json`
(`{ "01-inicio.png": "Pantalla de inicio" }`) se usan esos textos; si no, se
derivan del nombre del archivo (`02-agenda-semanal.png` → «Agenda semanal»).

**Carpetas con otro nombre:** si una carpeta de origen no se llama igual que el
slug (o su nombre no debe hacerse público), crea
`scripts/asset-sources.local.json` con `{ "<slug>": "<carpeta-origen>" }`.
Ese archivo está en `.gitignore` y no se publica.

> El script es **solo para uso local**: no forma parte del build de CI. Después
> de sincronizar, revisa y **commitea** `public/projects/`.

## Activar el inglés

1. Traduce `src/i18n/en.ts` (tiene el mismo tipo que `es.ts`; TypeScript avisa
   si falta alguna llave).
2. Traduce los bloques `en` de `src/data/site.ts` (rol, bio, tecnologías) y de
   `src/data/projects.ts` (reemplaza `same({...})` por `{ es: {...}, en: {...} }`).
3. En `src/i18n/config.ts` agrega `'en'` a `enabledLocales`.

Con eso se genera `/en/`, aparece el selector de idioma en el menú y se agregan
las etiquetas `hreflang` y la entrada en el sitemap.

## Publicación

Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que construye con
pnpm y publica `dist/` en GitHub Pages. En el repositorio, en
**Settings → Pages**, la fuente debe ser **GitHub Actions**.
