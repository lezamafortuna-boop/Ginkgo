export default function NosotrosES() {
  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* FIXED CTA BUTTON */}
      <a
        href="#formulario"
        className="fixed bottom-6 right-6 bg-[#C9A86A] text-black font-semibold px-5 py-3 rounded shadow-lg z-50"
      >
        Solicitar información
      </a>

      {/* HERO */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">
          Sobre Ginkgo
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Una firma especializada en identificar, analizar y estructurar oportunidades de desarrollo inmobiliario.
        </p>
      </section>

      {/* FILOSOFÍA COMERCIAL */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Filosofía Comercial
        </h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] leading-relaxed text-gray-300">
          <p className="mb-6">
            No queremos ser un catálogo de terrenos. Queremos ser reconocidos como una firma que identifica oportunidades de desarrollo.
          </p>

          <p className="mb-6">
            Las propiedades cambian constantemente. Lo que permanece es nuestra capacidad para analizarlas, estructurarlas y conectar oportunidades con inversionistas y desarrolladores.
          </p>

          <p className="mb-6">
            Por ello, solo mostramos las oportunidades más relevantes. El resto del portafolio se presenta de forma personalizada según el perfil del cliente.
          </p>
        </div>
      </section>

      {/* EMBUDO DE CONVERSIÓN */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Una experiencia diseñada para convertir
        </h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] text-gray-300 leading-relaxed">
          <p className="mb-6">
            La web no es un sitio institucional. Es un embudo de conversión. Cada sección está diseñada para llevar al usuario a solicitar información.
          </p>

          <ul className="list-disc list-inside space-y-3">
            <li>Botón fijo de “Solicitar información”.</li>
            <li>CTAs al terminar cada sección.</li>
            <li>Formularios integrados en puntos estratégicos.</li>
            <li>Contenido claro, directo y orientado a la acción.</li>
          </ul>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Cómo trabajamos
        </h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] text-gray-300 leading-relaxed">
          <p className="mb-6">
            Identificamos oportunidades mediante análisis urbano, técnico y comercial. Estructuramos la información para facilitar decisiones estratégicas.
          </p>

          <p className="mb-6">
            Conectamos oportunidades con desarrolladores e inversionistas mediante un enfoque consultivo y especializado.
          </p>
        </div>
      </section>

      {/* CTA + FORMULARIO */}
      <section id="formulario" className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          ¿Quieres conocer nuestro portafolio completo?
        </h2>
        <p className="text-gray-400 mb-12">
          Compártenos tus necesidades y te presentaremos oportunidades alineadas con tu perfil.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Nombre" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Correo" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Teléfono" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Empresa (opcional)" />
          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Solicitar información
          </button>
        </form>
      </section>
    </main>
  );
}
