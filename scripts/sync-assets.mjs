#!/usr/bin/env node
/**
 * Sincroniza las capturas de los proyectos hacia public/projects/<slug>/.
 *
 * USO LOCAL ÚNICAMENTE (no forma parte del build de CI): el repositorio
 * publicado debe llevar las imágenes ya copiadas y commiteadas.
 *
 *   pnpm sync-assets                 # lee de ../assets (junto al repo)
 *   pnpm sync-assets -- /otra/ruta   # o ASSETS_DIR=/otra/ruta pnpm sync-assets
 *
 * Por cada proyecto de src/data/projects.ts:
 *   1. Busca <ASSETS_DIR>/<carpeta>/*.png (la carpeta es el slug, o la indicada
 *      en scripts/asset-sources.local.json, que NO se commitea).
 *   2. Genera, numeradas en orden natural de nombre de archivo:
 *        NN.png        copia optimizada (para descargar en tamaño completo)
 *        NN.webp       versión web (máx. 1600 px de ancho)
 *        NN-thumb.webp miniatura (máx. 720 px de ancho)
 *   3. Escribe public/projects/<slug>/manifest.json con lo encontrado.
 *
 * Pies de foto: si la carpeta trae captions.json ({ "archivo.png": "Texto" }),
 * se usan esos textos; si no, se derivan del nombre del archivo
 * ("02-agenda-semanal.png" → "Agenda semanal").
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = resolve(process.argv[2] ?? process.env.ASSETS_DIR ?? join(root, '..', 'assets'));
const publicDir = join(root, 'public', 'projects');
const localSourcesFile = join(root, 'scripts', 'asset-sources.local.json');

const WEB_WIDTH = 1600;
const THUMB_WIDTH = 720;

/** Lee los slugs desde src/data/projects.ts sin necesidad de compilar TypeScript. */
function readSlugs() {
  const source = readFileSync(join(root, 'src', 'data', 'projects.ts'), 'utf8');
  return [...source.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);
}

/** slug → carpeta de origen. Por defecto, la carpeta se llama igual que el slug. */
function readSourceMap() {
  if (!existsSync(localSourcesFile)) return {};
  try {
    return JSON.parse(readFileSync(localSourcesFile, 'utf8'));
  } catch (error) {
    console.warn(`⚠ No se pudo leer ${localSourcesFile}: ${error.message}`);
    return {};
  }
}

const naturalSort = (a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' });

// Palabras frecuentes en nombres de archivo → texto para el pie de foto.
const DEVICE_WORDS = {
  desktop: 'escritorio', escritorio: 'escritorio', computadora: 'escritorio',
  mobile: 'móvil', movil: 'móvil', phone: 'móvil', celular: 'móvil',
  tablet: 'tablet', ipad: 'tablet',
};
const WORDS = {
  hero: 'portada', home: 'inicio', '3d': '3D', ia: 'IA',
  // Acentos comunes que se pierden en los nombres de archivo.
  estadisticas: 'estadísticas', graficas: 'gráficas', grafica: 'gráfica', catalogo: 'catálogo',
  categoria: 'categoría', categorias: 'categorías', menu: 'menú', configuracion: 'configuración',
  informacion: 'información', gestion: 'gestión', asignacion: 'asignación', asignaciones: 'asignaciones',
  medicion: 'medición', analisis: 'análisis', micrografia: 'micrografía', micrografias: 'micrografías',
  deteccion: 'detección', segmentacion: 'segmentación', historico: 'histórico', sesion: 'sesión',
  pagina: 'página', dia: 'día', semana: 'semana', busqueda: 'búsqueda', edicion: 'edición',
};

function captionFromFilename(file) {
  const words = file
    .replace(extname(file), '')
    .replace(/^[\d\s._-]+/, '')
    .split(/[-_\s]+/)
    .filter(Boolean);
  const devices = [];
  const rest = [];
  for (const w of words) {
    const key = w.toLowerCase();
    if (DEVICE_WORDS[key]) devices.push(DEVICE_WORDS[key]);
    else rest.push(WORDS[key] ?? w);
  }
  let text = rest.join(' ');
  if (text) text = text.charAt(0).toUpperCase() + text.slice(1);
  if (devices.length) text = text ? `${text} · ${devices.join(', ')}` : devices.join(', ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function readCaptions(dir) {
  const file = join(dir, 'captions.json');
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    console.warn(`⚠ captions.json inválido en ${dir}`);
    return {};
  }
}

async function syncProject(slug, sourceFolder) {
  const src = join(assetsDir, sourceFolder);
  const dest = join(publicDir, slug);
  const manifestPath = join(dest, 'manifest.json');

  const pngs = existsSync(src)
    ? readdirSync(src).filter((f) => extname(f).toLowerCase() === '.png').sort(naturalSort)
    : [];

  if (pngs.length === 0) {
    // Sin origen: conserva lo que ya esté publicado (si existe) para no borrar
    // capturas commiteadas; si no hay nada, deja un manifiesto vacío.
    if (!existsSync(manifestPath)) {
      mkdirSync(dest, { recursive: true });
      writeFileSync(manifestPath, JSON.stringify({ slug, images: [] }, null, 2) + '\n');
    }
    const kept = JSON.parse(readFileSync(manifestPath, 'utf8')).images?.length ?? 0;
    console.log(`· ${slug}: sin PNG en origen (${kept} imágenes publicadas se conservan)`);
    return kept;
  }

  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  const captions = readCaptions(src);
  const images = [];

  for (const [i, file] of pngs.entries()) {
    const id = String(i + 1).padStart(2, '0');
    const input = join(src, file);
    const meta = await sharp(input).metadata();

    await sharp(input).png({ compressionLevel: 9, palette: false }).toFile(join(dest, `${id}.png`));
    const web = await sharp(input)
      .resize({ width: WEB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(dest, `${id}.webp`));
    const thumb = await sharp(input)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(join(dest, `${id}-thumb.webp`));

    images.push({
      id,
      png: `/projects/${slug}/${id}.png`,
      webp: `/projects/${slug}/${id}.webp`,
      thumb: `/projects/${slug}/${id}-thumb.webp`,
      width: web.width,
      height: web.height,
      thumbWidth: thumb.width,
      thumbHeight: thumb.height,
      originalWidth: meta.width,
      originalHeight: meta.height,
      caption: captions[file] ?? captionFromFilename(file),
    });
  }

  writeFileSync(manifestPath, JSON.stringify({ slug, images }, null, 2) + '\n');
  console.log(`✓ ${slug}: ${images.length} imágenes`);
  return images.length;
}

const slugs = readSlugs();
const sourceMap = readSourceMap();
console.log(`Origen: ${assetsDir}\n`);
let total = 0;
for (const slug of slugs) total += await syncProject(slug, sourceMap[slug] ?? slug);
console.log(`\nListo: ${total} imágenes en ${slugs.length} proyectos.`);
