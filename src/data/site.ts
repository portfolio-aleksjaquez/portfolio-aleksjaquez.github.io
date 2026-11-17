import type { Locale } from '../i18n/config';

/**
 * Datos personales del portafolio. TODO lo que dependa de Alejandro vive aquí.
 *
 * Valor especial: PENDING ("PENDIENTE"). Si un dato vale PENDING, el botón
 * correspondiente se muestra deshabilitado con el texto «Disponible pronto».
 */
export const PENDING = 'PENDIENTE';

export type Localized<T> = Record<Locale, T>;

export const site = {
  name: 'Alejandro Jaquez',
  /** Iniciales para el monograma. */
  initials: 'AJ',

  // TODO: reemplazar por el correo profesional real, p. ej. 'nombre@dominio.com'.
  email: PENDING as string,

  // TODO: reemplazar por el número en formato internacional SOLO con dígitos,
  // p. ej. '521XXXXXXXXXX' (52 = México). Se usa para armar https://wa.me/<número>.
  whatsapp: PENDING as string,

  // TODO: perfil de GitHub o LinkedIn si se quiere mostrar (deja '' para ocultarlo).
  github: 'https://github.com/portfolio-aleksjaquez',

  /**
   * Rol corto que aparece bajo el nombre.
   * TODO: ajustar si Alejandro prefiere otro título.
   */
  role: {
    es: 'Desarrollador web',
    en: 'Desarrollador web', // TODO: traducir → 'Web developer'
  } satisfies Localized<string>,

  /**
   * BORRADOR de biografía (genérico, basado solo en lo que se sabe hoy).
   * TODO: Alejandro debe revisarla y completarla con su experiencia real
   * (años, ciudad, logros). No se inventó ningún dato.
   */
  bio: {
    es: [
      'Soy desarrollador web en México. Me dedico a convertir ideas y procesos en sitios y aplicaciones que la gente puede usar sin instrucciones: desde páginas de presentación hasta sistemas internos para organizar información.',
      'Formo parte de un equipo que crea actividades interactivas para escuelas, donde cada detalle cuenta porque quienes las usan son niñas y niños. Esa experiencia me enseñó a diseñar pensando primero en el usuario final.',
      'Me gusta trabajar de cerca con mis clientes, explicar las cosas con claridad y entregar algo que se pueda probar desde el primer avance.',
    ],
    en: [
      // TODO: traducir la biografía.
      'Soy desarrollador web en México. Me dedico a convertir ideas y procesos en sitios y aplicaciones que la gente puede usar sin instrucciones: desde páginas de presentación hasta sistemas internos para organizar información.',
      'Formo parte de un equipo que crea actividades interactivas para escuelas, donde cada detalle cuenta porque quienes las usan son niñas y niños. Esa experiencia me enseñó a diseñar pensando primero en el usuario final.',
      'Me gusta trabajar de cerca con mis clientes, explicar las cosas con claridad y entregar algo que se pueda probar desde el primer avance.',
    ],
  } satisfies Localized<string[]>,

  /** Ruta pública del CV. Si el archivo public/cv.pdf no existe, el botón se deshabilita. */
  cvPath: '/cv.pdf',
};

/**
 * Tecnologías que maneja, con una explicación sin jerga.
 * TODO: Alejandro debe confirmar la lista.
 */
export type Skill = { name: string; group: 'web' | 'apps' | 'backend' | 'extra'; what: Localized<string> };

export const skillGroups: Record<Skill['group'], Localized<string>> = {
  web: { es: 'Sitios web', en: 'Sitios web' },
  apps: { es: 'Aplicaciones', en: 'Aplicaciones' },
  backend: { es: 'Sistemas y datos', en: 'Sistemas y datos' },
  extra: { es: 'Experiencias', en: 'Experiencias' },
};

export const skills: Skill[] = [
  { name: 'Astro', group: 'web', what: { es: 'Sitios rápidos y en varios idiomas.', en: 'Sitios rápidos y en varios idiomas.' } },
  { name: 'HTML y CSS', group: 'web', what: { es: 'La estructura y el diseño de cada página.', en: 'La estructura y el diseño de cada página.' } },
  { name: 'TypeScript', group: 'web', what: { es: 'Código más seguro, con menos errores.', en: 'Código más seguro, con menos errores.' } },
  { name: 'Vue', group: 'apps', what: { es: 'Pantallas interactivas que responden al instante.', en: 'Pantallas interactivas que responden al instante.' } },
  { name: 'Nuxt', group: 'apps', what: { es: 'Aplicaciones web completas, incluso instalables.', en: 'Aplicaciones web completas, incluso instalables.' } },
  { name: 'Svelte', group: 'apps', what: { es: 'Interfaces ligeras que cargan muy rápido.', en: 'Interfaces ligeras que cargan muy rápido.' } },
  { name: 'Laravel', group: 'backend', what: { es: 'Sistemas con usuarios, permisos y bases de datos.', en: 'Sistemas con usuarios, permisos y bases de datos.' } },
  { name: 'Bases de datos', group: 'backend', what: { es: 'Información guardada de forma ordenada y segura.', en: 'Información guardada de forma ordenada y segura.' } },
  { name: 'Animación web', group: 'extra', what: { es: 'Movimiento que guía la vista y da vida a la página.', en: 'Movimiento que guía la vista y da vida a la página.' } },
  { name: 'Actividades interactivas', group: 'extra', what: { es: 'Arrastrar, emparejar y elegir, en tablet y computadora.', en: 'Arrastrar, emparejar y elegir, en tablet y computadora.' } },
  { name: 'Visión por computadora', group: 'extra', what: { es: 'Programas que analizan y miden imágenes.', en: 'Programas que analizan y miden imágenes.' } },
];

export const isPending = (value: string | undefined | null) => !value || value === PENDING;
