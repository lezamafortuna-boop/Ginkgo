export default function WhyGinkgoEN() {
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

  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-12">
          Why Ginkgo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((item, index) => (
            <div key={index} className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
              <h3 className="text-2xl font-semibold mb-4 text-[#C9A86A]">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
