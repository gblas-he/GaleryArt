export interface InfoPagina {
  slug: string;
  titulo: string;
  intro: string;
  secciones?: { titulo?: string; parrafos: string[] }[];
  /** Muestra un formulario o una lista especial debajo del texto */
  extra?: 'contacto' | 'faq';
  /** Texto legal provisional: se avisa en pantalla hasta que se sustituya */
  provisional?: boolean;
  cta?: { texto: string; a: string };
}

export const faq: { p: string; r: string }[] = [
  {
    p: '¿Las obras son originales?',
    r: 'Sí. Cada obra del catálogo es una pieza única realizada por su artista. Por eso no hay cantidades: cuando se vende, deja de estar disponible.',
  },
  {
    p: '¿Puedo reservar una obra sin comprarla?',
    r: 'Puede guardarla en favoritos para volver a ella, pero la reserva no está garantizada: la obra sigue disponible para otros compradores hasta que se confirma un pedido.',
  },
  {
    p: '¿Cómo sé el tamaño real de una obra?',
    r: 'En la ficha de cada obra figuran las medidas en centímetros y encontrará una vista a escala sobre un sofá de dos metros para hacerse una idea.',
  },
  {
    p: '¿Cómo se envían las obras?',
    r: 'Se embalan de forma individual y se envían aseguradas. Encontrará los detalles en la página de Envío.',
  },
  {
    p: '¿Puedo devolver una obra?',
    r: 'Consulte las condiciones en la Política de devoluciones.',
  },
  {
    p: '¿Cómo puedo vender mis obras?',
    r: 'Rellene el formulario de la sección «Vender mis obras». Revisamos cada candidatura personalmente y le respondemos por correo.',
  },
];

// TEXTOS DE EJEMPLO: revíselos y sustitúyalos por las condiciones reales de la galería.
export const paginasInfo: InfoPagina[] = [
  {
    slug: 'acerca-de',
    titulo: 'Acerca de GALERYART',
    intro: 'Una galería online para descubrir y comprar obra original de artistas contemporáneos.',
    secciones: [
      {
        parrafos: [
          'GALERYART nace para acercar el arte original a quien quiere vivir con él. Cada obra se presenta con su cartela, como en una sala: quién la hizo, cuándo, con qué técnica y de qué tamaño es.',
          'Trabajamos con artistas de distintos países y les damos un lugar donde mostrar su obra con el cuidado que merece.',
        ],
      },
    ],
    cta: { texto: 'Conocer a los artistas', a: '/artistas' },
  },
  {
    slug: 'empleos',
    titulo: 'Empleos',
    intro: 'Ahora mismo no hay puestos abiertos.',
    secciones: [
      {
        parrafos: [
          'Cuando abramos una vacante la publicaremos aquí. Si quiere que tengamos su perfil en cuenta, escríbanos desde la página de contacto.',
        ],
      },
    ],
    cta: { texto: 'Escribirnos', a: '/info/contacto' },
  },
  {
    slug: 'revista',
    titulo: 'Revista',
    intro: 'Estamos preparando la revista de GALERYART.',
    secciones: [
      {
        parrafos: [
          'Aquí publicaremos entrevistas con los artistas, guías para empezar a coleccionar y consejos para colgar y cuidar las obras.',
        ],
      },
    ],
    cta: { texto: 'Explorar obras mientras tanto', a: '/obras' },
  },
  {
    slug: 'contacto',
    titulo: 'Contacte con nosotros',
    intro: 'Pregúntenos lo que necesite sobre una obra, un pedido o un artista.',
    secciones: [
      {
        parrafos: ['También puede llamarnos al +34 911 23 77 81. Si nos escribe con el formulario, le responderemos por correo.'],
      },
    ],
    extra: 'contacto',
  },
  {
    slug: 'envio',
    titulo: 'Envío',
    intro: 'Cada obra viaja embalada de forma individual y asegurada.',
    secciones: [
      {
        titulo: 'Embalaje y seguro',
        parrafos: [
          'Protegemos cada pieza con materiales adecuados a su técnica y tamaño. El envío va asegurado por el valor de la obra.',
        ],
      },
      {
        titulo: 'Plazos y coste',
        parrafos: [
          'El envío está incluido en el precio de todas las obras. Le indicaremos el plazo estimado al confirmar el pedido, ya que depende del tamaño de la obra y del destino.',
        ],
      },
    ],
  },
  {
    slug: 'devoluciones',
    titulo: 'Política de devoluciones',
    intro: 'Queremos que se quede con una obra que le guste de verdad.',
    provisional: true,
    secciones: [
      {
        parrafos: [
          'Si la obra no es como esperaba, contáctenos lo antes posible tras recibirla. Estudiaremos cada caso y le indicaremos cómo proceder con la devolución.',
          'La obra debe volver en su embalaje original y en perfecto estado.',
        ],
      },
    ],
    cta: { texto: 'Contactar', a: '/info/contacto' },
  },
  {
    slug: 'testimonios',
    titulo: 'Testimonios de clientes',
    intro: 'Aún no hay opiniones publicadas.',
    secciones: [
      {
        parrafos: ['Cuando nuestros clientes compartan su experiencia, la encontrará aquí.'],
      },
    ],
    cta: { texto: 'Explorar obras', a: '/obras' },
  },
  {
    slug: 'faq',
    titulo: 'Preguntas frecuentes',
    intro: 'Las dudas más habituales antes de comprar.',
    extra: 'faq',
  },
  {
    slug: 'asesoramiento',
    titulo: 'Asesoramiento gratis sobre arte',
    intro: 'Le ayudamos a elegir la obra que encaje con su espacio y su presupuesto.',
    secciones: [
      {
        parrafos: [
          'Cuéntenos qué espacio tiene, qué colores predominan y cuánto quiere invertir. Le sugeriremos una selección de obras.',
          'Si prefiere explorar por su cuenta, en Descubrir puede indicar sus preferencias y ver un muro con las obras que mejor encajan.',
        ],
      },
    ],
    cta: { texto: 'Pedir asesoramiento', a: '/info/contacto' },
  },
  {
    slug: 'encargos',
    titulo: 'Encargue obras a un artista',
    intro: 'Una obra pensada para su espacio, con la mano de uno de nuestros artistas.',
    secciones: [
      {
        parrafos: [
          'Si busca un formato, un tema o unos colores concretos, podemos poner en contacto con el artista cuya obra mejor encaje. Cada encargo se acuerda con precio, plazo y medidas antes de empezar.',
        ],
      },
    ],
    cta: { texto: 'Contarnos su idea', a: '/info/contacto' },
  },
  {
    slug: 'tarjeta-regalo',
    titulo: 'Ofrecer una tarjeta regalo',
    intro: 'Para que la persona elija su propia obra.',
    secciones: [
      {
        parrafos: [
          'Las tarjetas regalo todavía no están disponibles en la tienda online. Escríbanos y le ayudaremos a organizarlo.',
        ],
      },
    ],
    cta: { texto: 'Escribirnos', a: '/info/contacto' },
  },
  {
    slug: 'trade',
    titulo: 'Trade',
    intro: 'Para interioristas, arquitectos y otros profesionales.',
    secciones: [
      {
        parrafos: [
          'Si compra obra de forma habitual para proyectos de clientes, cuéntenos qué necesita y estudiaremos condiciones específicas.',
        ],
      },
    ],
    cta: { texto: 'Contactar', a: '/info/contacto' },
  },
  {
    slug: 'galerias-espana',
    titulo: 'Galerías de arte en España',
    intro: 'Estamos preparando una guía de galerías y espacios de arte.',
    secciones: [{ parrafos: ['Muy pronto la encontrará aquí.'] }],
    cta: { texto: 'Explorar obras', a: '/obras' },
  },
  {
    slug: 'privacidad',
    titulo: 'Centro de privacidad',
    intro: 'Cómo tratamos sus datos personales.',
    provisional: true,
    secciones: [
      {
        parrafos: [
          'Solo usamos los datos que usted nos facilita (nombre, correo, dirección de envío) para gestionar sus pedidos y responder a sus consultas.',
        ],
      },
    ],
  },
  {
    slug: 'avisos-legales',
    titulo: 'Avisos legales',
    intro: 'Información legal sobre GALERYART.',
    provisional: true,
    secciones: [{ parrafos: ['Aquí irán los datos identificativos del titular del sitio web.'] }],
  },
  {
    slug: 'terminos',
    titulo: 'Términos y condiciones generales',
    intro: 'Condiciones que rigen el uso de la web y la compra de obras.',
    provisional: true,
    secciones: [{ parrafos: ['Aquí irán las condiciones generales de contratación.'] }],
  },
];

export const infoPorSlug = (slug: string) => paginasInfo.find((p) => p.slug === slug);
