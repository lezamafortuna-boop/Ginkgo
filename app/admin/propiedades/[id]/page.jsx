import { notFound } from "next/navigation";
import { getAdminOpportunityById, getAdminRegions } from "@/lib/sanity/queries";
import { toPropertyFormValues } from "@/lib/sanity/adapters";
import PropertyForm from "@/components/admin/PropertyForm";

export const metadata = { title: "Editar propiedad" };

export default async function EditarPropiedadPage({ params }) {
  const { id } = await params;
  const [doc, regions] = await Promise.all([getAdminOpportunityById(id), getAdminRegions()]);
  if (!doc) notFound();

  const initialValues = toPropertyFormValues(doc);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">
        Editar propiedad — {initialValues.name_es}
      </h1>
      <PropertyForm mode="edit" id={id} regions={regions} initialValues={initialValues} />
    </div>
  );
}
