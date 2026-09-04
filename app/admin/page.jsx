import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import Card from "@/components/ui/Card";

export const metadata = { title: "Dashboard" };

const MODULES = [
  { href: "/admin/propiedades", label: "Propiedades", desc: "Alta, edición y estado de cada oportunidad." },
  { href: "/admin/regiones", label: "Regiones", desc: "Regiones estratégicas y sus propiedades asociadas." },
  { href: "/admin/mapas", label: "Mapas interactivos", desc: "Vista de pines sobre el mapa público." },
  { href: "/admin/documentos", label: "Documentos", desc: "Fichas técnicas y archivos asociados." },
  { href: "/admin/contenido", label: "Contenido del sitio", desc: "Textos e imágenes de la web pública." },
];

export default async function AdminDashboardPage() {
  const session = await auth0.getSession();
  // Layout already redirects when there's no session — this is a defensive
  // fallback for the moment right after a failed/stale login attempt, where
  // getSession() can briefly disagree between the layout and page render.
  if (!session) {
    redirect("/auth/login");
  }
  const firstName = session.user.name?.split(" ")[0] || session.user.email;

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-charcoal">
        Bienvenido, {firstName}
      </h1>
      <p className="mb-8 text-sm text-muted">
        Este panel crecerá con métricas reales (propiedades, regiones, documentos, actividad
        reciente) en la Fase 8. Por ahora, navega a un módulo para ver su estado.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod) => (
          <a key={mod.href} href={mod.href} className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="mb-2 font-serif text-base font-semibold text-charcoal">{mod.label}</h2>
              <p className="text-sm text-muted">{mod.desc}</p>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
