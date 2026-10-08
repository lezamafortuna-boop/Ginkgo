import Link from "next/link";
import { getAdminInsights } from "@/lib/sanity/queries";
import { toLegacyInsight } from "@/lib/sanity/adapters";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Insights" };

export default async function InsightsAdminPage() {
  const insights = (await getAdminInsights()).map(toLegacyInsight);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">Insights</h1>
        <Button href="/admin/insights/nueva">+ Nuevo artículo</Button>
      </div>

      <Card className="overflow-hidden p-0">
        {insights.length === 0 ? (
          <p className="p-8 text-sm text-muted">Aún no hay artículos. Publica el primero.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-6 py-3">Título</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {insights.map((article) => (
                <tr key={article.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium text-charcoal">{article.title_es}</td>
                  <td className="px-6 py-4 text-ink">{article.category_es || "—"}</td>
                  <td className="px-6 py-4 text-muted">{article.date_es || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-5">
                      <Link href={`/es/insights/${article.slug}`} target="_blank" className="text-sm text-muted hover:text-brand-600">
                        Ver
                      </Link>
                      <Link href={`/admin/insights/${article.id}`} className="text-sm text-brand-600 hover:underline">
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/insights/${article.id}`}
                        confirmMessage={`¿Eliminar "${article.title_es}"? Dejará de mostrarse en el sitio.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
