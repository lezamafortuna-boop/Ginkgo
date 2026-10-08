import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import LeadFormD from "../LeadFormD";
import { getSiteText } from "@/lib/siteContent";

export default async function HeroEN() {
  const t = await getSiteText();
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
          <Eyebrow className="text-white/80">{t("home.hero.eyebrow", "en")}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight md:text-6xl">
            {t("home.hero.title", "en")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
            {t("home.hero.subtitle", "en")}
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
            {t("home.hero.formTitle", "en")}
          </h2>
          <p className="mb-8 text-sm text-muted">
            {t("home.hero.formText", "en")}
          </p>
          <LeadFormD locale="en" id="lead-hero-en" />
        </div>
      </section>
    </>
  );
}
