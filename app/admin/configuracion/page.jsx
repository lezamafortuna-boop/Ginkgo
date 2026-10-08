import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getRole, ROLES } from "@/lib/auth/roles";
import { getContactSettings } from "@/lib/siteSettings";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Configuración" };

export default async function ConfiguracionPage() {
  const session = await auth0.getSession();
  if (getRole(session) !== ROLES.ADMIN) {
    redirect("/admin");
  }

  const s = await getContactSettings();

  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-semibold text-charcoal">Configuración</h1>
      <p className="mb-6 max-w-2xl text-sm text-muted">
        Datos de contacto que se muestran en todo el sitio (pie de página, página de contacto, botón
        flotante de WhatsApp) y correo donde llegan los avisos de nuevos leads.
      </p>
      <SettingsForm
        initialValues={{
          whatsappNumber: s.whatsappNumber,
          phoneDisplay: s.whatsappDisplay,
          email: s.email,
          instagramUrl: s.instagramUrl,
          linkedinUrl: s.linkedinUrl,
          address: s.address,
        }}
      />
    </div>
  );
}
