import { getSiteText } from "@/lib/siteContent";

// Brand phrase band between the portfolio and the "Why Ginkgo" section.
export default async function BrandTagline({ locale }) {
  const t = await getSiteText();
  return (
    <section className="bg-charcoal px-6 py-16 md:px-10">
      <p className="mx-auto max-w-4xl text-center font-serif text-2xl font-semibold leading-snug text-white md:text-4xl">
        {t("home.tagline", locale)}
      </p>
      <span className="mx-auto mt-6 block h-[2px] w-12 bg-gold" aria-hidden="true" />
    </section>
  );
}
