export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="text-5xl font-serif font-bold mb-4">
          Oportunidades de Desarrollo Inmobiliario en México
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Identificamos, estructuramos y comercializamos oportunidades inmobiliarias
          para desarrolladores e inversionistas.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="/es/oportunidades"
            className="px-6 py-3 bg-[#C9A86A] text-black font-semibold rounded"
          >
            Explorar oportunidades
          </a>

          <a
            href="#formulario"
            className="px-6 py-3 border border-white rounded"
          >
            Solicitar información
          </a>
        </div>

        <form
          id="formulario"
          className="bg-black/70 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Nombre" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Correo" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Teléfono" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Empresa (opcional)" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white md:col-span-2" placeholder="Tipo de proyecto" />

          <button
            className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </section>
  );
}
