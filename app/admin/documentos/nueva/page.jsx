import { getAdminOpportunities, getAdminRegions } from "@/lib/sanity/queries";
import DocumentUploadForm from "@/components/admin/DocumentUploadForm";

export const metadata = { title: "Subir documento" };

export default async function NuevoDocumentoPage() {
  const [properties, regions] = await Promise.all([getAdminOpportunities(), getAdminRegions()]);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Subir documento</h1>
      <DocumentUploadForm properties={properties} regions={regions} />
    </div>
  );
}
