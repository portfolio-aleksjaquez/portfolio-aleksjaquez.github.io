import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { defaultLocale, locales } from './src/i18n/config';

// El sitio se sirve en la raíz del dominio de GitHub Pages (sin base path).
export default defineConfig({
  site: 'https://portfolio-aleksjaquez.github.io',
  trailingSlash: 'always',
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // La raíz solo redirige a /es/, no se indexa.
      filter: (page) => page !== 'https://portfolio-aleksjaquez.github.io/',
    }),
  ],
});
