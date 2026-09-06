import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadFormD from "@/components/LeadFormD";

export const metadata = {
  title: "Services",
  description:
    "Specialized solutions for developers and investors seeking strategic land opportunities in Mexico.",
  alternates: {
    canonical: "/en/services",
    languages: { "es-MX": "/es/servicios", "en-US": "/en/services" },
  },
};

const services = [
  {
    title: "Opportunity Identification",
    text: "We analyze growth corridors, infrastructure, land vocation, and urban trends to identify land with high development potential. Our approach combines technical, urban, and commercial analysis.",
  },
  {
    title: "Analysis & Structuring",
    text: "We evaluate each opportunity from an integral perspective: land size, access, infrastructure, regulations, vocation, and appreciation potential. We structure information to support decision-making.",
  },
  {
    title: "Specialized Commercialization",
    text: "We connect opportunities with developers and investors through long-term, strategy-driven commercial approaches. We present clear, technical, and reliable information.",
  },
  {
    title: "Full Support",
    text: "We provide support throughout the entire process: from the first contact to final negotiation. Our goal is to facilitate informed and secure decisions.",
  },
];

export default function ServicesEN() {
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow>What we do</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Services
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
          Specialized solutions for developers and investors seeking strategic land opportunities
          in Mexico.
        </p>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-6 pb-20 md:px-10">
        {services.map((service) => (
          <Card key={service.title}>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-charcoal">
              {service.title}
            </h2>
            <p className="leading-relaxed text-ink">{service.text}</p>
          </Card>
        ))}
      </section>

      <section id="formEN" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Looking for land to develop?
          </h2>
          <p className="mt-4 text-ink">
            Tell us your requirements and we will find opportunities aligned with your goals.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormD locale="en" id="lead-services" />
          </div>
        </div>
      </section>
    </main>
  );
}
