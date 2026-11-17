import type { Translations } from './es';

/**
 * Diccionario en inglés.
 *
 * TODO: traducir. Por ahora es una copia del español. Al terminar, agrega 'en'
 * a `enabledLocales` en src/i18n/config.ts.
 */
const en: Translations = {
  meta: {
    title: 'Alejandro Jaquez · Desarrollo web',
    description:
      'Portafolio de Alejandro Jaquez: sitios web, aplicaciones y actividades interactivas que se pueden probar en vivo.',
    ogAlt: 'Alejandro Jaquez, desarrollo web: portafolio de proyectos',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    mainNav: 'Navegación principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    opensInNewTab: '(se abre en una pestaña nueva)',
    languageSwitcher: 'Cambiar idioma',
    projectIndex: 'Índice de proyectos',
  },
  nav: {
    projects: 'Proyectos',
    about: 'Sobre mí',
    skills: 'Tecnologías',
    contact: 'Contacto',
  },
  hero: {
    kicker: 'Desarrollo web · México',
    titleLead: 'Sitios y aplicaciones',
    titleAccent: 'que se entienden',
    titleTail: 'a la primera.',
    lead:
      'Construyo páginas, sistemas y actividades interactivas pensadas para las personas que los van a usar: claros, rápidos y que funcionan igual de bien en el teléfono que en la computadora.',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Hablemos',
    indexTitle: 'En este portafolio',
    indexLive: 'demo',
    indexScreens: 'capturas',
  },
  projects: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Proyectos',
    intro:
      'Cada proyecto cuenta qué problema resuelve. Los que dicen «Demo en vivo» se pueden abrir y usar como lo haría un usuario real; el resto se muestra con capturas.',
    kindLive: 'Demo en vivo',
    kindScreens: 'Capturas',
    viewDemo: 'Ver demo',
    viewScreens: 'Ver capturas',
    screensCount: '{n} capturas',
    screensCountOne: '1 captura',
    previewAlt: 'Vista previa de {title}',
    placeholderLabel: 'Capturas en preparación',
    videoSoon: 'Video próximamente',
    tagsLabel: 'Tecnologías usadas',
    openImage: 'Ampliar imagen {n} de {total}: {caption}',
  },
  lightbox: {
    label: 'Galería de imágenes',
    close: 'Cerrar galería',
    prev: 'Imagen anterior',
    next: 'Imagen siguiente',
    counter: '{n} de {total}',
    hint: 'Usa las flechas del teclado para avanzar y Esc para cerrar.',
  },
  about: {
    eyebrow: 'Quién soy',
    title: 'Sobre mí',
    howTitle: 'Cómo trabajo',
    how: [
      {
        title: 'Primero entiendo el problema',
        text: 'Antes de escribir una línea, aclaro quién va a usar el proyecto y qué necesita lograr.',
      },
      {
        title: 'Avances que se pueden probar',
        text: 'Comparto versiones funcionando desde temprano para que puedas opinar sobre algo real.',
      },
      {
        title: 'Hecho para durar',
        text: 'Entrego proyectos ordenados y fáciles de mantener, listos para crecer cuando lo necesites.',
      },
    ],
  },
  skills: {
    eyebrow: 'Herramientas',
    title: 'Tecnologías que manejo',
    intro: 'No necesitas conocerlas: aquí va, en pocas palabras, para qué sirve cada una.',
  },
  contact: {
    eyebrow: 'Contacto',
    title: '¿Tienes un proyecto en mente?',
    lead: 'Cuéntame qué necesitas y te respondo con una propuesta clara, sin tecnicismos.',
    email: 'Escribir un correo',
    whatsapp: 'Enviar WhatsApp',
    whatsappMessage: 'Hola Alejandro, vi tu portafolio y me gustaría platicar sobre un proyecto.',
    cv: 'Descargar CV (PDF)',
    pending: 'Disponible pronto',
    pendingNote: 'Los datos de contacto se publicarán muy pronto.',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    madeWith: 'Hecho con Astro.',
    backToTop: 'Volver arriba',
    disclaimer:
      'Las marcas de los proyectos de clientes se anonimizaron. Los estudios de interfaz son recreaciones con fines de práctica y no están afiliados a las marcas originales.',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe o cambió de lugar.',
    back: 'Ir al inicio',
  },
  redirect: {
    text: 'Redirigiendo al portafolio…',
    link: 'Entrar al portafolio',
  },
};

export default en;
