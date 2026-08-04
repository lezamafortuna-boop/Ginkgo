import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";

export default function InstagramFeedES() {
  return (
    <section className="bg-paper px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Comunidad</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          Síguenos en Instagram
        </h2>
        <p className="mt-4 text-ink">
          Conoce nuestras oportunidades, análisis y presencia en las principales regiones del
          país.
        </p>

        <div className="mt-10 flex justify-center">
          <iframe
            src="https://www.instagram.com/ginkgomex/embed"
            width="400"
            height="480"
            title="Publicaciones de Instagram de Ginkgo"
            loading="lazy"
            scrolling="no"
            className="rounded-lg border border-border shadow-sm"
          />
        </div>

        <Button
          href="https://www.instagram.com/ginkgomex"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="mt-10"
        >
          Ver perfil completo
        </Button>
      </div>
    </section>
  );
}
