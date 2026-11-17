/**
 * Configuración de idiomas.
 *
 * - `locales`: todos los idiomas que el proyecto conoce (tienen diccionario).
 * - `enabledLocales`: los que se publican (generan rutas /<idioma>/).
 *
 * Para activar inglés: termina la traducción en `en.ts` (y los bloques `en`
 * de src/data/site.ts y src/data/projects.ts) y agrega 'en' a `enabledLocales`.
 */
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

// TODO: agregar 'en' cuando la traducción esté lista.
export const enabledLocales: readonly Locale[] = ['es'];

/** Etiqueta BCP-47 para atributos lang/og:locale. */
export const localeTags: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  es: { htmlLang: 'es', ogLocale: 'es_MX', label: 'Español' },
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'English' },
};

export function isEnabledLocale(value: string | undefined): value is Locale {
  return !!value && (enabledLocales as readonly string[]).includes(value);
}
