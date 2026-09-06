import { getAdminDocuments } from "@/lib/sanity/queries";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Documentos" };

const TYPE_LABELS = {
  tech_sheet: "Ficha técnica",
  plan: "Plano",
  legal: "Legal",
  presentation: "Presentación",
  other: "Otro",
};

export default async function DocumentosPage() {
  const documents = await getAdminDocuments();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">Documentos</h1>
        <Button href="/admin/documentos/nueva">+ Subir documento</Button>
      </div>

      <Card className="overflow-hidden p-0">
        {documents.length === 0 ? (
          <p className="p-8 text-sm text-muted">Aún no hay documentos. Sube el primero.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Asociado a</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium text-charcoal">
                    <a
                      href={doc.file?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-600 hover:underline"
                    >
                      {doc.title}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-ink">{TYPE_LABELS[doc.type] || doc.type}</td>
                  <td className="px-6 py-4 text-ink">
                    {doc.property?.name?.es || doc.region?.name?.es || "—"}
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString("es-MX") : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DeleteButton
                      endpoint={`/api/admin/documents/${doc._id}`}
                      confirmMessage={`¿Eliminar "${doc.title}"? Esta acción no se puede deshacer.`}
                    />
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
