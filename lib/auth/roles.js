// Namespaced custom claim injected into the ID token by the Auth0 Post-Login
// Action (see the "Auth0 setup" instructions) from the user's app_metadata.role.
export const ROLE_CLAIM = "https://ginkgomx.com/role";

export const ROLES = {
  ADMIN: "admin",
  ASSISTANT: "assistant",
  VIEWER: "viewer",
};

// Sidebar items gated to admin only (spec: "Usuarios (admin only)",
// "Configuración (admin only)"). Assistants get everything else.
export const ADMIN_ONLY_PATH_PREFIXES = ["/admin/usuarios", "/admin/configuracion"];

export function getRole(session) {
  return session?.user?.[ROLE_CLAIM] ?? null;
}

export function isAdminOnlyPath(pathname) {
  return ADMIN_ONLY_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// Server component / route handler guard — defense in depth behind the
// middleware. Throws so callers can let it bubble into a Next.js error
// boundary, or catch it to render a 403.
export function requireRole(session, allowedRoles) {
  const role = getRole(session);
  if (!session || !role || !allowedRoles.includes(role)) {
    const error = new Error("No tienes permiso para acceder a esta sección.");
    error.status = 403;
    throw error;
  }
  return role;
}
