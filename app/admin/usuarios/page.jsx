import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getRole, ROLES } from "@/lib/auth/roles";
import ComingSoon from "@/components/admin/ComingSoon";

export const metadata = { title: "Usuarios" };

export default async function UsuariosPage() {
  const session = await auth0.getSession();
  if (getRole(session) !== ROLES.ADMIN) {
    redirect("/admin");
  }

  return <ComingSoon title="Usuarios" phase="Fase 8 (roster de solo lectura)" />;
}
