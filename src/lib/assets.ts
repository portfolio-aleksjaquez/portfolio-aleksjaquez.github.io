import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Una captura procesada por scripts/sync-assets.mjs. */
export type ProjectImage = {
  id: string;
  png: string;
  webp: string;
  thumb: string;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
  caption: string;
};

const publicDir = join(process.cwd(), 'public');

/** Lee public/projects/<slug>/manifest.json (en build). Devuelve [] si no hay capturas. */
export function getProjectImages(slug: string): ProjectImage[] {
  const file = join(publicDir, 'projects', slug, 'manifest.json');
  if (!existsSync(file)) return [];
  try {
    const data = JSON.parse(readFileSync(file, 'utf8')) as { images?: ProjectImage[] };
    return Array.isArray(data.images) ? data.images : [];
  } catch {
    return [];
  }
}

/** Imagen de portada: la primera horizontal, o la primera disponible. */
export function pickCover(images: ProjectImage[]): ProjectImage | undefined {
  return images.find((img) => img.width >= img.height) ?? images[0];
}

/** true si existe el archivo dentro de public/ (p. ej. '/cv.pdf'). */
export function publicFileExists(path: string): boolean {
  return existsSync(join(publicDir, path.replace(/^\//, '')));
}
