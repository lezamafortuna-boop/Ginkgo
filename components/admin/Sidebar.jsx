"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROLES } from "@/lib/auth/roles";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/propiedades", label: "Propiedades" },
  { href: "/admin/regiones", label: "Regiones" },
  { href: "/admin/mapas", label: "Mapas interactivos" },
  { href: "/admin/documentos", label: "Documentos" },
  { href: "/admin/contenido", label: "Contenido del sitio" },
  { href: "/admin/usuarios", label: "Usuarios", adminOnly: true },
  { href: "/admin/configuracion", label: "Configuración", adminOnly: true },
];

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-charcoal">
      <div className="flex h-16 items-center px-6">
        <span className="font-serif text-lg font-semibold tracking-wide text-white">
          GINKGO <span className="text-gold">CRM</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.filter((item) => !item.adminOnly || role === ROLES.ADMIN).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item)
                ? "bg-brand-700 text-white"
                : "text-brand-100 hover:bg-brand-700/60 hover:text-gold"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-brand-700 px-3 py-4">
        <a
          href="/auth/logout"
          className="block rounded-md px-3 py-2 text-sm font-medium text-brand-100 transition-colors hover:bg-brand-700/60 hover:text-gold"
        >
          Cerrar sesión
        </a>
      </div>
    </aside>
  );
}
