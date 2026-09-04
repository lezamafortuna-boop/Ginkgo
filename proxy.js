import { auth0 } from "@/lib/auth0";

// Next.js 16 renamed middleware.ts -> proxy.ts (the `middleware` export is
// deprecated in favor of `proxy`, and runs on the Node.js runtime instead of
// edge — required here since the Auth0 SDK needs Node crypto for its
// encrypted session cookies). This only mounts the SDK's own routes
// (/auth/login, /auth/logout, /auth/callback) and refreshes the session
// cookie; the actual /admin role gate lives in app/admin/layout.jsx, per
// Auth0's own current guidance for this SDK version.
export async function proxy(request) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
