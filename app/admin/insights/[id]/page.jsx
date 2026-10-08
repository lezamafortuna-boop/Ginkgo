import { notFound } from "next/navigation";
import { getAdminInsightById } from "@/lib/sanity/queries";
import { toInsightFormValues } from "@/lib/sanity/adapters";
import InsightForm from "@/components/admin/InsightForm";

export const metadata = { title: "Editar artículo" };

export default async function EditarInsightPage({ params }) {
  const { id } = await params;
  const doc = await getAdminInsightById(id);
  if (!doc) notFound();

  const initialValues = toInsightFormValues(doc);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">
        Editar artículo — {initialValues.title_es}
      </h1>
      <InsightForm mode="edit" id={id} initialValues={initialValues} />
    </div>
  );
}
