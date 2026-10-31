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
    id: "portfolio",
    label: "Portafolio (Inicio y Oportunidades)",
    slots: [
      { key: "portfolio.eyebrow", label: "Etiqueta superior", es: "Portafolio", en: "Portfolio" },
      { key: "portfolio.title", label: "Título", es: "Macrolotes y oportunidades de desarrollo", en: "Large land tracts and development opportunities" },
      { key: "portfolio.text.1", label: "Párrafo 1", multiline: true, es: "Presentamos una selección de terrenos con potencial para proyectos inmobiliarios, identificados por su ubicación, características y posibilidades de desarrollo.", en: "We present a selection of land with potential for real estate projects, identified for its location, characteristics and development possibilities." },
      { key: "portfolio.text.2", label: "Párrafo 2", multiline: true, es: "En Ginkgo analizamos cada oportunidad para ofrecer a inversionistas y desarrolladores una perspectiva más clara sobre el valor y el potencial de la tierra.", en: "At Ginkgo we analyze each opportunity to give investors and developers a clearer perspective on the value and potential of the land." },
      { key: "portfolio.button", label: "Botón (Inicio)", es: "Explorar oportunidades", en: "Explore opportunities" },
    ],
  },
  {
    id: "home-tagline",
    label: "Inicio — Frase de marca",
    slots: [
      { key: "home.tagline", label: "Frase principal", es: "No solo es tierra. Es el inicio de grandes proyectos.", en: "It's not just land. It's the beginning of great projects." },
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
      { key: "home.process.title", label: "Título", es: "De la propiedad a la oportunidad", en: "From property to opportunity" },
      { key: "home.process.subtitle", label: "Subtítulo", multiline: true, es: "Un proceso estructurado para comprender cada terreno, preparar su presentación y conectar con los perfiles adecuados.", en: "A structured process to understand each property, prepare its presentation and connect it with the right profiles." },
      { key: "home.process.1", label: "Paso 1 — título", es: "Analizamos la propiedad", en: "We analyze the property" },
      { key: "home.process.1.text", label: "Paso 1 — texto", multiline: true, es: "Revisamos las características del terreno, su contexto y la información disponible para identificar sus atributos, oportunidades y aspectos clave de evaluación.", en: "We review the land's characteristics, its context and the available information to identify its attributes, opportunities and key points for evaluation." },
      { key: "home.process.2", label: "Paso 2 — título", es: "Estructuramos la oportunidad", en: "We structure the opportunity" },
      { key: "home.process.2.text", label: "Paso 2 — texto", multiline: true, es: "Organizamos la información y definimos una estrategia de presentación y comercialización acorde con las características de la propiedad.", en: "We organize the information and define a presentation and marketing strategy suited to the property's characteristics." },
      { key: "home.process.3", label: "Paso 3 — título", es: "Conectamos con los perfiles adecuados", en: "We connect with the right profiles" },
      { key: "home.process.3.text", label: "Paso 3 — texto", multiline: true, es: "Acercamos la oportunidad a inversionistas y desarrolladores cuyos objetivos puedan alinearse con las características y el potencial del terreno.", en: "We bring the opportunity to investors and developers whose goals may align with the land's characteristics and potential." },
      { key: "home.process.4", label: "Paso 4 — título", es: "Acompañamos el proceso comercial", en: "We support the commercial process" },
      { key: "home.process.4.text", label: "Paso 4 — texto", multiline: true, es: "Facilitamos el intercambio de información y damos seguimiento a las conversaciones para favorecer un proceso más claro y ordenado entre las partes.", en: "We facilitate the exchange of information and follow up on conversations to support a clearer, more orderly process between the parties." },
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
      { key: "about.eyebrow", label: "Etiqueta superior", es: "Sobre Ginkgo", en: "About Ginkgo" },
      { key: "about.title", label: "Título", es: "Una visión estratégica del valor de la tierra", en: "A strategic view of land value" },
      { key: "about.intro", label: "Introducción", multiline: true, es: "Ginkgo nace de la convicción de que las oportunidades inmobiliarias requieren algo más que una ubicación atractiva: necesitan análisis, contexto y una estrategia que permita comprender su verdadero potencial.", en: "Ginkgo was born from the conviction that real estate opportunities need more than an attractive location: they need analysis, context and a strategy that reveals their true potential." },
      { key: "about.vision.1", label: "Visión — párrafo 1", multiline: true, es: "Nos especializamos en macrolotes y terrenos con posibilidades de desarrollo, trabajando para acercar a propietarios, inversionistas y desarrolladores a través de una comercialización más estructurada y enfocada.", en: "We specialize in large land tracts and land with development possibilities, bringing owners, investors and developers together through more structured, focused marketing." },
      { key: "about.vision.2", label: "Visión — párrafo 2", multiline: true, es: "Entendemos que cada propiedad tiene características, retos y posibilidades propias. Por eso, buscamos conocerla antes de presentarla, organizar la información relevante y reconocer qué perfiles podrían encontrar en ella una oportunidad alineada con sus objetivos.", en: "We understand that every property has its own characteristics, challenges and possibilities. That is why we get to know it before presenting it, organize the relevant information and recognize which profiles could find in it an opportunity aligned with their goals." },
      { key: "about.vision.3", label: "Visión — párrafo 3", multiline: true, es: "Somos una firma en crecimiento, comprometida con construir relaciones de confianza, trabajar con seriedad y desarrollar una visión de largo plazo en el mercado inmobiliario mexicano.", en: "We are a growing firm, committed to building relationships of trust, working with integrity and developing a long-term vision in the Mexican real estate market." },
      { key: "about.question", label: "Frase destacada", multiline: true, es: "En Ginkgo, cada oportunidad comienza con una buena pregunta: ¿qué puede llegar a ser esta tierra?", en: "At Ginkgo, every opportunity starts with a good question: what could this land become?" },
      { key: "about.who.eyebrow", label: "Quiénes somos — etiqueta", es: "Quiénes somos", en: "Who we are" },
      { key: "about.who.title", label: "Quiénes somos — título", es: "Más que comercializar terrenos, estructuramos oportunidades", en: "More than marketing land, we structure opportunities" },
      { key: "about.who.1", label: "Quiénes somos — párrafo 1", multiline: true, es: "En Ginkgo creemos que el valor de una propiedad no se comunica únicamente a través de su superficie o ubicación, sino también mediante una comprensión clara de sus características, contexto y posibilidades.", en: "At Ginkgo we believe a property's value isn't conveyed only through its size or location, but also through a clear understanding of its characteristics, context and possibilities." },
      { key: "about.who.2", label: "Quiénes somos — párrafo 2", multiline: true, es: "Por eso, antes de presentar una oportunidad al mercado, buscamos organizar y analizar la información relevante para reconocer sus atributos, identificar aspectos que requieren atención y definir una estrategia de comercialización acorde con su perfil.", en: "That is why, before taking an opportunity to market, we organize and analyze the relevant information to recognize its attributes, identify aspects that need attention and define a marketing strategy that fits its profile." },
      { key: "about.who.3", label: "Quiénes somos — párrafo 3", multiline: true, es: "Este proceso nos permite ofrecer una presentación más estructurada y transparente, ayudando a los interesados a comprender mejor cada oportunidad y a determinar si responde a los objetivos de su proyecto.", en: "This process lets us offer a more structured and transparent presentation, helping interested parties better understand each opportunity and determine whether it meets their project's goals." },
      { key: "about.who.commitment", label: "Quiénes somos — compromiso (en negritas)", multiline: true, es: "Nuestro compromiso es acercar oportunidades con criterio, información y una visión estratégica de largo plazo.", en: "Our commitment is to bring opportunities forward with sound judgment, information and a long-term strategic vision." },
    ],
  },
  {
    id: "services",
    label: "Página Servicios",
    slots: [
      { key: "services.eyebrow", label: "Etiqueta superior", es: "Nuestros servicios", en: "Our services" },
      { key: "services.title", label: "Título", es: "Convertimos tierra en oportunidades estratégicas", en: "We turn land into strategic opportunities" },
      { key: "services.intro", label: "Introducción", multiline: true, es: "En Ginkgo nos especializamos en la identificación, análisis y comercialización de macrolotes y terrenos con potencial de desarrollo inmobiliario.", en: "At Ginkgo we specialize in identifying, analyzing and marketing large land tracts and land with real estate development potential." },
      { key: "services.intro.2", label: "Introducción — párrafo 2", multiline: true, es: "Nuestro trabajo comienza antes de poner una propiedad en el mercado. Estudiamos sus características, su contexto territorial y la información disponible para estructurar una presentación clara, identificar sus atributos relevantes y conectarla con inversionistas y desarrolladores cuyos objetivos sean compatibles con la oportunidad.", en: "Our work begins before a property goes to market. We study its characteristics, its territorial context and the available information to structure a clear presentation, identify its relevant attributes and connect it with investors and developers whose goals are compatible with the opportunity." },
      { key: "services.intro.3", label: "Introducción — párrafo 3", multiline: true, es: "No buscamos comercializar tierra de manera indiscriminada. Buscamos comprender cada propiedad, reconocer sus fortalezas y comunicar su potencial con criterio, transparencia y una visión de largo plazo.", en: "We don't market land indiscriminately. We seek to understand each property, recognize its strengths and communicate its potential with sound judgment, transparency and a long-term vision." },
      { key: "services.list.title", label: "Título de la lista", es: "Los cuatro servicios principales", en: "Our four core services" },
      { key: "services.1.title", label: "Servicio 1 — título", es: "Análisis y evaluación de propiedades", en: "Property analysis and evaluation" },
      { key: "services.1.text", label: "Servicio 1 — texto", multiline: true, es: "Analizamos las características físicas, territoriales, urbanísticas y comerciales de cada macrolote, de acuerdo con la información disponible. Identificamos sus atributos, oportunidades y aspectos que requieren una revisión adicional antes de definir su estrategia de comercialización.", en: "We analyze the physical, territorial, urban-planning and commercial characteristics of each land tract, based on the available information. We identify its attributes, opportunities and aspects that need further review before defining its marketing strategy." },
      { key: "services.2.title", label: "Servicio 2 — título", es: "Preparación y estructuración de oportunidades", en: "Opportunity preparation and structuring" },
      { key: "services.2.text", label: "Servicio 2 — texto", multiline: true, es: "Organizamos la información relevante de cada propiedad y definimos cómo presentar sus características, contexto y potencial. El objetivo es facilitar una evaluación más informada y ofrecer a los interesados una base clara para iniciar conversaciones y analizar la viabilidad de sus proyectos.", en: "We organize each property's relevant information and define how to present its characteristics, context and potential. The goal is to enable a better-informed evaluation and give interested parties a clear basis to start conversations and assess the feasibility of their projects." },
      { key: "services.3.title", label: "Servicio 3 — título", es: "Comercialización especializada", en: "Specialized marketing" },
      { key: "services.3.text", label: "Servicio 3 — texto", multiline: true, es: "Diseñamos estrategias de comercialización orientadas a desarrolladores e inversionistas, considerando las características de cada propiedad y el perfil de los posibles interesados. Priorizamos la calidad del acercamiento y la compatibilidad entre la oportunidad y el proyecto.", en: "We design marketing strategies aimed at developers and investors, taking into account each property's characteristics and the profile of potential buyers. We prioritize the quality of each approach and the fit between the opportunity and the project." },
      { key: "services.4.title", label: "Servicio 4 — título", es: "Vinculación y acompañamiento", en: "Connection and support" },
      { key: "services.4.text", label: "Servicio 4 — texto", multiline: true, es: "Facilitamos el contacto entre propietarios, inversionistas y desarrolladores, acompañando el proceso de intercambio de información y las conversaciones comerciales hasta donde corresponda a nuestra participación.", en: "We facilitate contact between owners, investors and developers, supporting the exchange of information and the commercial conversations to the extent of our role." },
    ],
  },
];

export const ALL_SLOTS = CONTENT_GROUPS.flatMap((g) => g.slots);
export const SLOT_BY_KEY = Object.fromEntries(ALL_SLOTS.map((s) => [s.key, s]));
