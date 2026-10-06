import { getAdminMapOpportunities } from "@/lib/sanity/queries";
import AdminPropertiesMap from "@/components/maps/AdminPropertiesMapClient";

export const metadata = { title: "Mapas interactivos" };

export default async function MapasPage() {
  const properties = await getAdminMapOpportunities();

  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-semibold text-charcoal">Mapas interactivos</h1>
      <p className="mb-6 text-sm text-muted">
        Vista de todas las propiedades con coordenadas registradas, incluyendo reservadas y
        vendidas. Para agregar, mover o quitar un pin, edita las coordenadas de la propiedad
        correspondiente.
      </p>
      <AdminPropertiesMap properties={properties} />
    </div>
  );
}
