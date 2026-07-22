import { regions } from "@/data/regions";

export default function RegionDetailEN({ params }) {
  const region = regions.find((r) => r.slug === params.slug);

  if (!region) {
    return <div className="text-white p-20">Region not found.</div>;
  }

  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* HERO */}
      <section
        className="relative h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${region.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-4xl font-serif font-bold text-center px-4">
          {region.name_en}
        </h1>
      </section>

      {/* DESCRIPTION */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          {region.description_en}
        </p>
      </section>

      {/* ADVANTAGES */}
      <section className="py-10 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Strategic Advantages
        </h2>

        <ul className="space-y-4">
          {region.advantages_en.map((adv, i) => (
            <li
              key={i}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333] text-gray-300"
            >
              {adv}
            </li>
          ))}
        </ul>
      </section>

      {/* MAP */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <img
          src={region.mapImage}
          className="w-full h-96 object-cover rounded border border-[#333]"
        />
      </section>

      {/* CTA FORM */}
      <section id="formEN" className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Looking for opportunities in this region?
        </h2>
        <p className="text-gray-400 mb-12">
          Tell us your requirements and we will present options aligned with your profile.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Company (optional)" />
          <textarea
            className="bg-[#0D0D0D] p-3 rounded text-white md:col-span-2"
            placeholder="Tell us what type of opportunity you're looking for"
            rows={4}
          ></textarea>

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Request Information
          </button>
        </form>
      </section>
    </main>
  );
}
