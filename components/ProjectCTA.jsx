export default function ProjectCTA() {
  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif font-bold mb-6">
          Hablemos de tu próximo proyecto
        </h2>

        <p className="text-gray-400 mb-12 text-lg">
          Cuéntanos qué tipo de desarrollo buscas y te presentaremos oportunidades alineadas con tus objetivos.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Nombre"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Correo"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Teléfono"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Empresa (opcional)"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white md:col-span-2"
            placeholder="Tipo de proyecto"
          />

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Enviar solicitud
          </button>
        </form>
      </div>
    </section>
  );
}
