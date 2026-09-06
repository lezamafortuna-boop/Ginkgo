import RegionForm from "@/components/admin/RegionForm";

export const metadata = { title: "Nueva región" };

export default function NuevaRegionPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Nueva región</h1>
      <RegionForm mode="create" />
    </div>
  );
}
