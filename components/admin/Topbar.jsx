import { SearchIcon, BellIcon } from "@/components/ui/icons";

const ROLE_LABELS = {
  admin: "Administrador",
  assistant: "Asistente",
  viewer: "Solo lectura",
};

export default function Topbar({ userName, userEmail, role }) {
  const initial = (userName || userEmail || "?").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-paper px-6 shadow-sm">
      <div className="relative w-full max-w-sm">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Buscar propiedades, regiones, documentos…"
          disabled
          title="Disponible próximamente"
          className="w-full rounded-md border border-border bg-cream/40 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled
          title="Notificaciones — disponible próximamente"
          className="rounded-full p-2 text-muted disabled:cursor-not-allowed"
        >
          <BellIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            {initial}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-charcoal">{userName || userEmail}</p>
            <p className="text-xs text-muted">{ROLE_LABELS[role] || role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
