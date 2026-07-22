export default function ServiciosES() {
  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* HERO */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">
          Servicios
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Soluciones especializadas para desarrolladores e inversionistas que buscan oportunidades estratégicas en México.
        </p>
      </section>

      {/* IDENTIFICACIÓN DE OPORTUNIDADES */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Identificación de Oportunidades
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          Analizamos corredores de crecimiento, infraestructura, vocación de suelo y tendencias urbanas para detectar terrenos con alto potencial de desarrollo. Nuestro enfoque combina análisis técnico, urbano y comercial.
        </p>
      </section>

      {/* ANÁLISIS Y ESTRUCTURACIÓN */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Análisis y Estructuración
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          Evaluamos cada oportunidad desde una perspectiva integral: superficie, accesos, infraestructura, normativa, vocación y potencial de plusvalía. Estructuramos la información para facilitar la toma de decisiones.
        </p>
      </section>

      {/* COMERCIALIZACIÓN ESPECIALIZADA */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Comercialización Especializada
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          Conectamos oportunidades con desarrolladores e inversionistas mediante estrategias comerciales enfocadas en proyectos de largo plazo. Presentamos información clara, técnica y confiable.
        </p>
      </section>

      {/* ACOMPAÑAMIENTO INTEGRAL */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Acompañamiento Integral
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          Brindamos soporte durante todo el proceso: desde el primer acercamiento hasta la negociación final. Nuestro objetivo es facilitar decisiones informadas y seguras.
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          ¿Buscas un terreno para desarrollar?
        </h2>
        <p className="text-gray-400 mb-12">
          Cuéntanos tus necesidades y encontraremos oportunidades alineadas con tus objetivos.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Nombre" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Correo" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Teléfono" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Empresa (opcional)" />
          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Enviar solicitud
          </button>
        </form>
      </section>
    </main>
  );
}
