import Eyebrow from "../ui/Eyebrow";
import Card from "../ui/Card";

const items = [
  {
    title: "Strategic Analysis",
    text: "We evaluate urban potential, connectivity, land vocation, and development possibilities to identify opportunities with real value.",
  },
  {
    title: "Specialized Commercialization",
    text: "We connect opportunities with developers and investors through long-term, strategy-driven commercial approaches.",
  },
  {
    title: "Market Knowledge",
    text: "We analyze urban trends, growth corridors, and infrastructure to detect opportunities with high potential.",
  },
  {
    title: "Guidance & Support",
    text: "From the first contact to negotiation, we provide technical and commercial insights to support decision-making.",
  },
];

export default function WhyGinkgoEN() {
  return (
    <section className="bg-paper px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Our approach</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          Why Ginkgo?
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title}>
              <h3 className="font-serif text-xl font-semibold text-teal-600">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
