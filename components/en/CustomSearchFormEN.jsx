export default function CustomSearchFormEN() {
  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Didn’t find what you’re looking for?
        </h2>

        <p className="text-gray-400 mb-12">
          Tell us your requirements and we will find opportunities aligned with your goals.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="City of interest"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Project type"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Required land size"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Approximate budget"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Company"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Email"
          />
          <input
            className="bg-[#0D0D0D] p-3 rounded text-white"
            placeholder="Phone"
          />

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Request personalized search
          </button>
        </form>
      </div>
    </section>
  );
}
