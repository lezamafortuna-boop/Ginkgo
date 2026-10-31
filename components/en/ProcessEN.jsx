import Eyebrow from "../ui/Eyebrow";
import { getSiteText } from "@/lib/siteContent";

export default async function ProcessEN() {
  const t = await getSiteText();
  const steps = [1, 2, 3, 4].map((n) => ({ title: t(`home.process.${n}`, "en"), text: t(`home.process.${n}.text`, "en") }));
  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <Eyebrow className="justify-center">{t("home.process.eyebrow", "en")}</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          {t("home.process.title", "en")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">{t("home.process.subtitle", "en")}</p>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-lg font-semibold text-charcoal">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
