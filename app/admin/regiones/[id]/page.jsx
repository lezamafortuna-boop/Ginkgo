import { notFound } from "next/navigation";
import { getAdminRegionById } from "@/lib/sanity/queries";
import { toRegionFormValues } from "@/lib/sanity/adapters";
import RegionForm from "@/components/admin/RegionForm";

export const metadata = { title: "Editar región" };

export default async function EditarRegionPage({ params }) {
  const { id } = await params;
  const doc = await getAdminRegionById(id);
  if (!doc) notFound();

  const initialValues = toRegionFormValues(doc);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">
        Editar región — {initialValues.name_es}
      </h1>
      <RegionForm mode="edit" id={id} initialValues={initialValues} />
    </div>
  );
}
