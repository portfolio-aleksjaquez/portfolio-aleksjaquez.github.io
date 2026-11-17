import { defaultLocale, type Locale } from './config';
import es, { type Translations } from './es';
import en from './en';

export const ui: Record<Locale, Translations> = { es, en };

export function useTranslations(locale: Locale = defaultLocale): Translations {
  return ui[locale] ?? ui[defaultLocale];
}

/** Sustituye marcadores tipo {n} en un texto del diccionario. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}

export type { Locale, Translations };
export * from './config';
