import Link from "next/link";
import { getAdminOpportunities } from "@/lib/sanity/queries";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Propiedades" };

const STATUS_LABELS = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
  oculto: "Oculto",
};

const STATUS_STYLES = {
  disponible: "bg-brand-50 text-brand-700",
  reservado: "bg-gold/20 text-gold-700",
  vendido: "bg-border text-muted",
  oculto: "bg-border text-muted",
};

export default async function PropiedadesPage() {
  const properties = await getAdminOpportunities();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">Propiedades</h1>
        <Button href="/admin/propiedades/nueva">+ Nueva propiedad</Button>
      </div>

      <Card className="overflow-hidden p-0">
        {properties.length === 0 ? (
          <p className="p-8 text-sm text-muted">Aún no hay propiedades. Crea la primera.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Región</th>
                <th className="px-6 py-3">Superficie</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Actualizada</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium text-charcoal">
                    {p.name?.es}
                    {p.featured && <span className="ml-2 text-gold-700">★</span>}
                  </td>
                  <td className="px-6 py-4 text-ink">{p.region?.name?.es || "—"}</td>
                  <td className="px-6 py-4 text-ink">{p.surface || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[p.status] || ""}`}>
                      {STATUS_LABELS[p.status] || p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {new Date(p._updatedAt).toLocaleDateString("es-MX")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/propiedades/${p._id}`} className="text-sm text-brand-600 hover:underline">
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/properties/${p._id}`}
                        confirmMessage={`¿Eliminar "${p.name?.es}"? Esta acción no se puede deshacer.`}
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
