import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import LeadForm from "../LeadForm";

export default function HeroEN() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-vid.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-charcoal/55" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <Eyebrow className="text-white/80">Analysis · Structure · Commercialization</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight md:text-6xl">
            Real Estate Development Opportunities in Mexico
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
            We identify, structure, and market real estate opportunities for developers and
            investors.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/en/opportunities">Explore opportunities</Button>
            <Button href="#formEN" variant="ghost">
              Request information
            </Button>
          </div>
        </div>
      </section>

      <section id="formEN" className="bg-cream px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-paper p-8 shadow-sm md:p-12">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-charcoal">
            Request information
          </h2>
          <p className="mb-8 text-sm text-muted">
            Tell us what kind of project you're looking for and we'll follow up with aligned
            opportunities.
          </p>
          <LeadForm locale="en" source="EN - Home" id="lead-hero-en" />
        </div>
      </section>
    </>
  );
}
