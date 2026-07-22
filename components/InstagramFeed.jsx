export default function InstagramFeed() {
  return (
    <section className="bg-black py-20 px-8 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Síguenos en Instagram
        </h2>

        <p className="text-gray-400 mb-12">
          Conoce nuestras oportunidades, análisis y presencia en las principales regiones del país.
        </p>

        {/* Instagram Embed */}
        <div className="flex justify-center">
          <iframe
            src="https://www.instagram.com/ginkgomex/embed"
            width="400"
            height="480"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>

        {/* CTA */}
        <a
          href="https://www.instagram.com/ginkgomex"
          target="_blank"
          className="inline-block mt-10 px-6 py-3 bg-[#C9A86A] text-black font-semibold rounded"
        >
          Ver perfil completo
        </a>
      </div>
    </section>
  );
}
