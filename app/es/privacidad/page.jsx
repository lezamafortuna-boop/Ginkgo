export default function PrivacidadES() {
  return (
    <main className="bg-[#0D0D0D] text-white min-h-screen py-20 px-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-6">
          Aviso de Privacidad
        </h1>

        <p className="text-gray-400 mb-8">
          Este aviso explica cómo Ginkgo recopila, utiliza y protege la información proporcionada por los usuarios.
        </p>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] space-y-6 text-gray-300 leading-relaxed">
          <p>
            Ginkgo recopila datos de contacto proporcionados voluntariamente por el usuario, como nombre, correo electrónico, teléfono y empresa.
          </p>

          <p>
            Esta información se utiliza exclusivamente para dar seguimiento a solicitudes de información, compartir oportunidades y mantener comunicación relacionada con nuestros servicios.
          </p>

          <p>
            No compartimos datos personales con terceros ajenos a la relación comercial, salvo obligación legal.
          </p>

          <p>
            El usuario puede solicitar la actualización o eliminación de sus datos escribiendo a{" "}
            <a href="mailto:tonatiuhcervantes@ginkgomx.com" className="text-[#C9A86A]">
              tonatiuhcervantes@ginkgomx.com
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
