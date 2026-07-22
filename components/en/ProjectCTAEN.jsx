export default function ProjectCTAEN() {
  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif font-bold mb-6">
          Let's talk about your next project
        </h2>

        <p className="text-gray-400 mb-12 text-lg">
          Tell us what type of development you're looking for and we will present opportunities aligned with your goals.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Name"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Email"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Phone"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Company (optional)"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white md:col-span-2"
            placeholder="Project type"
          />

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Submit request
          </button>
        </form>
      </div>
    </section>
  );
}
