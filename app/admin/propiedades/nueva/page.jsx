import { getAdminRegions } from "@/lib/sanity/queries";
import PropertyForm from "@/components/admin/PropertyForm";

export const metadata = { title: "Nueva propiedad" };

export default async function NuevaPropiedadPage() {
  const regions = await getAdminRegions();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Nueva propiedad</h1>
      <PropertyForm mode="create" regions={regions} />
    </div>
  );
}
