import Eyebrow from "../ui/Eyebrow";
import Card from "../ui/Card";
import { getSiteText } from "@/lib/siteContent";

const ITEM_KEYS = [1, 2, 3, 4];

export default async function WhyGinkgoEN() {
  const t = await getSiteText();
  const items = ITEM_KEYS.map((n) => ({ title: t(`home.why.${n}.title`, "en"), text: t(`home.why.${n}.text`, "en") }));
  return (
    <section className="bg-paper px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>{t("home.why.eyebrow", "en")}</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          {t("home.why.title", "en")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title}>
              <h3 className="font-serif text-xl font-semibold text-brand-600">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
