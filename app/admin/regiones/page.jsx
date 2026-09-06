import Link from "next/link";
import { getAdminRegionsWithCounts } from "@/lib/sanity/queries";
import Photo from "@/components/ui/Photo";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Regiones" };

export default async function RegionesPage() {
  const regions = await getAdminRegionsWithCounts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">Regiones</h1>
        <Button href="/admin/regiones/nueva">+ Nueva región</Button>
      </div>

      {regions.length === 0 ? (
        <Card>
          <p className="text-sm text-muted">Aún no hay regiones. Crea la primera.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <Card key={region._id} className="flex flex-col overflow-hidden p-0">
              <Photo src={region.heroImage?.url} alt={region.name?.es} className="h-40 w-full" />
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-serif text-lg font-semibold text-charcoal">{region.name?.es}</h2>
                <p className="mt-1 text-sm text-muted">
                  {region.propertyCount} {region.propertyCount === 1 ? "propiedad" : "propiedades"}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <Link href={`/admin/regiones/${region._id}`} className="text-sm text-brand-600 hover:underline">
                    Editar
                  </Link>
                  <DeleteButton
                    endpoint={`/api/admin/regions/${region._id}`}
                    confirmMessage={`¿Eliminar "${region.name?.es}"? Las propiedades asociadas quedarán sin región.`}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
