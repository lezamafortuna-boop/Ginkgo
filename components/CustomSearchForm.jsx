export default function CustomSearchForm() {
  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          ¿No encontraste lo que buscas?
        </h2>

        <p className="text-gray-400 mb-12">
          Cuéntanos tus necesidades y encontraremos oportunidades alineadas con tus objetivos.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Ciudad de interés"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Tipo de proyecto"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Superficie requerida"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Presupuesto aproximado"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Empresa"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Correo"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Teléfono"
          />

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Solicitar búsqueda personalizada
          </button>
        </form>
      </div>
    </section>
  );
}
