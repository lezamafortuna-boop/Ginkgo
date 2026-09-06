import { getAdminLeads } from "@/lib/sanity/queries";
import Card from "@/components/ui/Card";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

export const metadata = { title: "Leads" };

const FORM_TYPE_LABELS = {
  property_info: "A · Solicitar información",
  sell_property: "B · Promover propiedad",
  search_property: "C · Busco propiedad",
  general: "D · Contacto general",
};

export default async function LeadsPage() {
  const leads = await getAdminLeads();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Leads</h1>

      <Card className="overflow-hidden p-0">
        {leads.length === 0 ? (
          <p className="p-8 text-sm text-muted">Aún no hay leads.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-6 py-3">Contacto</th>
                <th className="px-6 py-3">Formulario</th>
                <th className="px-6 py-3">Propiedad</th>
                <th className="px-6 py-3">Mensaje</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-border align-top last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal">
                      {lead.name} {lead.lastName || ""}
                    </p>
                    <p className="text-xs text-muted">{lead.email}</p>
                    <p className="text-xs text-muted">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-ink">{FORM_TYPE_LABELS[lead.formType] || lead.formType}</td>
                  <td className="px-6 py-4 text-ink">{lead.property?.name?.es || lead.propertyName || "—"}</td>
                  <td className="max-w-xs px-6 py-4 text-ink">
                    <p className="line-clamp-2">{lead.message || "—"}</p>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("es-MX") : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <LeadStatusSelect id={lead._id} status={lead.status} />
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
