import type { Localized } from './site';

/**
 * Proyectos del portafolio, en el orden en que se muestran.
 *
 * - `slug`: nombre de la carpeta pública con las capturas: public/projects/<slug>/.
 *   Las capturas se copian ahí con `pnpm sync-assets` (ver README).
 * - `kind`: 'live' = tiene demo en vivo (botón «Ver demo»);
 *           'screens' = solo capturas (galería).
 * - `tags`: tecnologías, se muestran como etiquetas pequeñas.
 * - `text`: título, descripción (2 o 3 líneas, orientada a beneficio) y una
 *   nota opcional visible junto al título.
 *
 * TODO: Alejandro debe confirmar las etiquetas de tecnologías de cada proyecto.
 */
export type ProjectKind = 'live' | 'screens';

export type ProjectText = {
  title: string;
  description: string;
  /** Nota visible (p. ej. aviso de no afiliación). */
  note?: string;
  /** Sustituye «N capturas» y «Ver capturas» cuando la galería no son pantallas. */
  galleryCount?: string;
  galleryButton?: string;
};

export type Project = {
  slug: string;
  kind: ProjectKind;
  demoUrl?: string;
  tags: string[];
  /** Muestra la insignia «Video próximamente». */
  videoSoon?: boolean;
  text: Localized<ProjectText>;
};

const DEMO_BASE = 'https://portfolio-aleksjaquez.github.io';

// Ayuda para no duplicar a mano mientras inglés no está traducido.
// TODO: al traducir, reemplazar `same(es)` por objetos { es, en } reales.
const same = (es: ProjectText): Localized<ProjectText> => ({ es, en: es });

export const projects: Project[] = [
  {
    slug: 'demo-actividades',
    kind: 'live',
    demoUrl: `${DEMO_BASE}/demo-actividades/`,
    tags: ['HTML', 'CSS', 'JavaScript'],
    text: same({
      title: 'Actividades interactivas para primaria',
      description:
        'Ejercicios para arrastrar, emparejar y elegir la respuesta correcta. Los alumnos aprenden jugando y reciben retroalimentación al momento, tanto en tablet como en computadora.',
    }),
  },
  {
    slug: 'demo-landing-fundacion',
    kind: 'live',
    demoUrl: `${DEMO_BASE}/demo-landing-fundacion/`,
    tags: ['Astro', 'Tailwind', 'GSAP', '3 idiomas'],
    text: same({
      title: 'Página de evento para una fundación internacional',
      description:
        'Una sola página que presenta el evento en español, inglés y portugués, con animaciones al desplazarse y una cuenta regresiva que genera expectativa hasta el día del evento.',
      note: 'Marca anonimizada',
    }),
  },
  {
    slug: 'demo-dashboard-compras',
    kind: 'live',
    demoUrl: `${DEMO_BASE}/demo-dashboard-compras/`,
    tags: ['JavaScript', 'Vite', 'IA', 'Gráficas'],
    text: same({
      title: 'Panel de compras personales',
      description:
        'Con ayuda de una inteligencia artificial, la foto de un ticket se convierte en un registro que revisas antes de guardar. Lleva el historial de compras y muestra en gráficas en qué se va el dinero.',
    }),
  },
  {
    slug: 'demo-grocery',
    kind: 'live',
    demoUrl: `${DEMO_BASE}/demo-grocery/`,
    tags: ['Nuxt', 'Vue', 'App instalable'],
    text: same({
      title: 'Presupuesto del súper',
      description:
        'Una app que se instala en el teléfono para planear las compras: catálogo de productos, presupuesto por categoría y lista semanal que avisa antes de pasarse del gasto.',
    }),
  },
  {
    slug: 'estudio-macbook',
    kind: 'live',
    demoUrl: `${DEMO_BASE}/estudio-macbook/`,
    tags: ['Svelte', 'Three.js', 'GSAP', '3D'],
    text: same({
      title: 'Estudio de interfaz: página de producto',
      description:
        'Recreación de una página de producto de alto nivel, con un modelo 3D que gira y animaciones sincronizadas con el desplazamiento. Demuestra el nivel de detalle visual que puede alcanzar un sitio.',
      note: 'Estudio / recreación · no afiliado a Apple',
    }),
  },
  {
    slug: 'expedientes-clinicos',
    kind: 'screens',
    tags: ['Sistema web', 'Agenda', 'Búsqueda'],
    text: same({
      title: 'Expedientes y citas clínicas',
      description:
        'Reúne en un solo lugar el registro de pacientes, sus antecedentes y el seguimiento de cada cita, con búsqueda de pacientes mientras se escribe.',
    }),
  },
  {
    slug: 'asignaciones',
    kind: 'screens',
    tags: ['Vue', 'Sistema web', 'Cronómetro'],
    text: same({
      title: 'Asignación de tareas y control de tiempo',
      description:
        'Reparte las tareas del día entre el equipo, mide con cronómetro el tiempo de cada una (iniciar, pausar, terminar) y muestra el total por persona. Cada colaborador ve solo lo que le toca y abre el documento de referencia sin salir del sistema.',
    }),
  },
  {
    slug: 'gestion-institucional',
    kind: 'screens',
    tags: ['Sistema web', 'Bootstrap', 'Reportes PDF'],
    text: same({
      title: 'Gestión institucional de eventos y evidencias',
      description:
        'Da seguimiento a oficios y eventos que se turnan entre departamentos: muestra qué es urgente, qué va retrasado y qué ya se terminó, guarda la evidencia de cada uno y genera reportes en PDF.',
    }),
  },
];
