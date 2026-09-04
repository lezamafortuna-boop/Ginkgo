import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getRole, ROLES } from "@/lib/auth/roles";
import SetHtmlLang from "@/components/SetHtmlLang";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export const metadata = {
  title: { default: "Admin", template: "%s | GINKGO Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const role = getRole(session);
  if (!Object.values(ROLES).includes(role)) {
    // No valid role claim yet — the Auth0 Post-Login Action isn't configured
    // for this user, or app_metadata.role is missing/misspelled. No explicit
    // returnTo here: the SDK defaults it to APP_BASE_URL, which is what's
    // actually registered in Allowed Logout URLs — passing "/" ourselves
    // produced a trailing-slash mismatch ("http://localhost:3000/" vs the
    // registered "http://localhost:3000") that Auth0 rejects as a bad
    // returnTo, surfacing as a failed-logout event in the tenant logs.
    redirect("/auth/logout");
  }

  return (
    <>
      <SetHtmlLang lang="es" />
      <div className="min-h-screen bg-admin-bg">
        <Sidebar role={role} />
        <div className="pl-64">
          <Topbar userName={session.user.name} userEmail={session.user.email} role={role} />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </>
  );
}
