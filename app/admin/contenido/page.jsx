import { getContentOverrides } from "@/lib/siteContent";
import { CONTENT_GROUPS } from "@/lib/siteContentCatalog";
import ContentForm from "@/components/admin/ContentForm";

export const metadata = { title: "Contenido del sitio" };

export default async function ContenidoPage() {
  const overrides = await getContentOverrides();

  // Prefill with what the site shows right now (the admin's text or the original).
  const groups = CONTENT_GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    slots: g.slots.map((s) => ({
      key: s.key,
      label: s.label,
      multiline: !!s.multiline,
      original: { es: s.es, en: s.en },
      value: {
        es: overrides[s.key]?.es?.trim() || s.es,
        en: overrides[s.key]?.en?.trim() || s.en,
      },
    })),
  }));

  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-semibold text-charcoal">Contenido del sitio</h1>
      <p className="mb-6 max-w-2xl text-sm text-muted">
        Edita los textos de la página de inicio, Nosotros y Servicios, en español e inglés. Si dejas un
        campo vacío, el sitio vuelve a mostrar el texto original.
      </p>
      <ContentForm groups={groups} />
    </div>
  );
}
