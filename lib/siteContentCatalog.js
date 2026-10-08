// Every piece of public-site text that admins can edit from /admin/contenido.
// Each slot's es/en values are the ORIGINAL texts: they are what the site shows
// until an admin saves a change (and again if the admin clears the field).
//
// To make another text editable: add a slot here, then read it in the page or
// component with `const t = await getSiteText(); t("your.key", locale)`.
export const CONTENT_GROUPS = [
  {
    id: "home-hero",
    label: "Inicio — Portada",
    slots: [
      { key: "home.hero.eyebrow", label: "Etiqueta superior", es: "Análisis · Estructura · Comercialización", en: "Analysis · Structure · Commercialization" },
      { key: "home.hero.title", label: "Título principal", es: "Oportunidades de Desarrollo Inmobiliario en México", en: "Real Estate Development Opportunities in Mexico" },
      { key: "home.hero.subtitle", label: "Subtítulo", multiline: true, es: "Identificamos, estructuramos y comercializamos oportunidades inmobiliarias para desarrolladores e inversionistas.", en: "We identify, structure, and market real estate opportunities for developers and investors." },
      { key: "home.hero.formTitle", label: "Formulario — título", es: "Solicita información", en: "Request information" },
      { key: "home.hero.formText", label: "Formulario — texto", multiline: true, es: "Cuéntanos qué tipo de proyecto buscas y te contactaremos con oportunidades alineadas.", en: "Tell us what kind of project you're looking for and we'll follow up with aligned opportunities." },
    ],
  },
  {
    id: "home-why",
    label: "Inicio — ¿Por qué Ginkgo?",
    slots: [
      { key: "home.why.eyebrow", label: "Etiqueta superior", es: "Nuestro enfoque", en: "Our approach" },
      { key: "home.why.title", label: "Título", es: "¿Por qué Ginkgo?", en: "Why Ginkgo?" },
      { key: "home.why.1.title", label: "Punto 1 — título", es: "Análisis Estratégico", en: "Strategic Analysis" },
      { key: "home.why.1.text", label: "Punto 1 — texto", multiline: true, es: "Evaluamos el potencial urbano, conectividad, vocación y posibilidades de desarrollo para identificar oportunidades con verdadero valor.", en: "We evaluate urban potential, connectivity, land vocation, and development possibilities to identify opportunities with real value." },
      { key: "home.why.2.title", label: "Punto 2 — título", es: "Comercialización Especializada", en: "Specialized Commercialization" },
      { key: "home.why.2.text", label: "Punto 2 — texto", multiline: true, es: "Conectamos oportunidades con desarrolladores e inversionistas mediante estrategias enfocadas en proyectos de largo plazo.", en: "We connect opportunities with developers and investors through long-term, strategy-driven commercial approaches." },
      { key: "home.why.3.title", label: "Punto 3 — título", es: "Conocimiento del Mercado", en: "Market Knowledge" },
      { key: "home.why.3.text", label: "Punto 3 — texto", multiline: true, es: "Analizamos tendencias urbanas, corredores de crecimiento e infraestructura para detectar oportunidades con alto potencial.", en: "We analyze urban trends, growth corridors, and infrastructure to detect opportunities with high potential." },
      { key: "home.why.4.title", label: "Punto 4 — título", es: "Acompañamiento", en: "Guidance & Support" },
      { key: "home.why.4.text", label: "Punto 4 — texto", multiline: true, es: "Desde el primer acercamiento hasta la negociación, brindamos información técnica y comercial para facilitar la toma de decisiones.", en: "From the first contact to negotiation, we provide technical and commercial insights to support decision-making." },
    ],
  },
  {
    id: "home-process",
    label: "Inicio — Nuestro proceso",
    slots: [
      { key: "home.process.eyebrow", label: "Etiqueta superior", es: "Cómo trabajamos", en: "How we work" },
      { key: "home.process.title", label: "Título", es: "Nuestro Proceso", en: "Our Process" },
      { key: "home.process.1", label: "Paso 1", es: "Analizamos el potencial del terreno.", en: "We analyze the land's development potential." },
      { key: "home.process.2", label: "Paso 2", es: "Diseñamos la estrategia comercial.", en: "We design the commercial strategy." },
      { key: "home.process.3", label: "Paso 3", es: "Conectamos con inversionistas y desarrolladores.", en: "We connect with investors and developers." },
      { key: "home.process.4", label: "Paso 4", es: "Acompañamos la negociación.", en: "We support the negotiation process." },
    ],
  },
  {
    id: "home-cta",
    label: "Inicio — Llamado final",
    slots: [
      { key: "home.cta.title", label: "Título", es: "Hablemos de tu próximo proyecto", en: "Let's talk about your next project" },
      { key: "home.cta.text", label: "Texto", multiline: true, es: "Cuéntanos qué tipo de desarrollo buscas y te presentaremos oportunidades alineadas con tus objetivos.", en: "Tell us what type of development you're looking for and we'll present opportunities aligned with your goals." },
    ],
  },
  {
    id: "about",
    label: "Página Nosotros",
    slots: [
      { key: "about.eyebrow", label: "Etiqueta superior", es: "Quiénes somos", en: "Who we are" },
      { key: "about.title", label: "Título", es: "Sobre Ginkgo", en: "About Ginkgo" },
      { key: "about.intro", label: "Introducción", multiline: true, es: "Una firma especializada en identificar, analizar y estructurar oportunidades de desarrollo inmobiliario.", en: "A specialized firm focused on identifying, analyzing, and structuring real estate development opportunities." },
      { key: "about.philosophy.title", label: "Filosofía — título", es: "Filosofía Comercial", en: "Commercial Philosophy" },
      { key: "about.philosophy.1", label: "Filosofía — párrafo 1", multiline: true, es: "No queremos ser un catálogo de terrenos. Queremos ser reconocidos como una firma que identifica oportunidades de desarrollo.", en: "We are not a land catalog. We aim to be recognized as a firm that identifies development opportunities." },
      { key: "about.philosophy.2", label: "Filosofía — párrafo 2", multiline: true, es: "Las propiedades cambian constantemente. Lo que permanece es nuestra capacidad para analizarlas, estructurarlas y conectar oportunidades con inversionistas y desarrolladores.", en: "Properties change constantly. What remains is our ability to analyze them, structure them, and connect opportunities with developers and investors." },
      { key: "about.philosophy.3", label: "Filosofía — párrafo 3", multiline: true, es: "Por ello, solo mostramos las oportunidades más relevantes. El resto del portafolio se presenta de forma personalizada según el perfil del cliente.", en: "For this reason, we only showcase the most relevant opportunities. The rest of the portfolio is presented personally according to each client's profile." },
      { key: "about.how.title", label: "Cómo trabajamos — título", es: "Cómo trabajamos", en: "How We Work" },
      { key: "about.how.1", label: "Cómo trabajamos — párrafo 1", multiline: true, es: "Identificamos oportunidades mediante análisis urbano, técnico y comercial. Estructuramos la información para facilitar decisiones estratégicas.", en: "We identify opportunities through urban, technical, and commercial analysis. We structure information to support strategic decisions." },
      { key: "about.how.2", label: "Cómo trabajamos — párrafo 2", multiline: true, es: "Conectamos oportunidades con desarrolladores e inversionistas mediante un enfoque consultivo y especializado.", en: "We connect opportunities with developers and investors through a specialized, consultative approach." },
    ],
  },
  {
    id: "services",
    label: "Página Servicios",
    slots: [
      { key: "services.eyebrow", label: "Etiqueta superior", es: "Lo que hacemos", en: "What we do" },
      { key: "services.title", label: "Título", es: "Servicios", en: "Services" },
      { key: "services.intro", label: "Introducción", multiline: true, es: "Soluciones especializadas para desarrolladores e inversionistas que buscan oportunidades estratégicas en México.", en: "Specialized solutions for developers and investors seeking strategic land opportunities in Mexico." },
      { key: "services.1.title", label: "Servicio 1 — título", es: "Identificación de Oportunidades", en: "Opportunity Identification" },
      { key: "services.1.text", label: "Servicio 1 — texto", multiline: true, es: "Analizamos corredores de crecimiento, infraestructura, vocación de suelo y tendencias urbanas para detectar terrenos con alto potencial de desarrollo. Nuestro enfoque combina análisis técnico, urbano y comercial.", en: "We analyze growth corridors, infrastructure, land vocation, and urban trends to identify land with high development potential. Our approach combines technical, urban, and commercial analysis." },
      { key: "services.2.title", label: "Servicio 2 — título", es: "Análisis y Estructuración", en: "Analysis & Structuring" },
      { key: "services.2.text", label: "Servicio 2 — texto", multiline: true, es: "Evaluamos cada oportunidad desde una perspectiva integral: superficie, accesos, infraestructura, normativa, vocación y potencial de plusvalía. Estructuramos la información para facilitar la toma de decisiones.", en: "We evaluate each opportunity from an integral perspective: land size, access, infrastructure, regulations, vocation, and appreciation potential. We structure information to support decision-making." },
      { key: "services.3.title", label: "Servicio 3 — título", es: "Comercialización Especializada", en: "Specialized Commercialization" },
      { key: "services.3.text", label: "Servicio 3 — texto", multiline: true, es: "Conectamos oportunidades con desarrolladores e inversionistas mediante estrategias comerciales enfocadas en proyectos de largo plazo. Presentamos información clara, técnica y confiable.", en: "We connect opportunities with developers and investors through long-term, strategy-driven commercial approaches. We present clear, technical, and reliable information." },
      { key: "services.4.title", label: "Servicio 4 — título", es: "Acompañamiento Integral", en: "Full Support" },
      { key: "services.4.text", label: "Servicio 4 — texto", multiline: true, es: "Brindamos soporte durante todo el proceso: desde el primer acercamiento hasta la negociación final. Nuestro objetivo es facilitar decisiones informadas y seguras.", en: "We provide support throughout the entire process: from the first contact to final negotiation. Our goal is to facilitate informed and secure decisions." },
    ],
  },
];

export const ALL_SLOTS = CONTENT_GROUPS.flatMap((g) => g.slots);
export const SLOT_BY_KEY = Object.fromEntries(ALL_SLOTS.map((s) => [s.key, s]));
