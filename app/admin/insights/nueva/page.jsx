import InsightForm from "@/components/admin/InsightForm";

export const metadata = { title: "Nuevo artículo" };

export default function NuevoInsightPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Nuevo artículo</h1>
      <InsightForm mode="create" />
    </div>
  );
}
