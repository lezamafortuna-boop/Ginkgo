import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getRole, ROLES } from "@/lib/auth/roles";
import ComingSoon from "@/components/admin/ComingSoon";

export const metadata = { title: "Configuración" };

export default async function ConfiguracionPage() {
  const session = await auth0.getSession();
  if (getRole(session) !== ROLES.ADMIN) {
    redirect("/admin");
  }

  return <ComingSoon title="Configuración" phase="Fase 8" />;
}
