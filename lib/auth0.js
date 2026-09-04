import { NextResponse } from "next/server";
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { ROLE_CLAIM } from "./auth/roles";

// Claims the SDK keeps by default (see its internal filterDefaultIdTokenClaims) —
// replicated here because providing our own beforeSessionSaved below opts us
// out of that default filtering entirely, so we have to redo it ourselves.
const DEFAULT_ID_TOKEN_CLAIMS = [
  "sub",
  "name",
  "nickname",
  "given_name",
  "family_name",
  "picture",
  "email",
  "email_verified",
  "org_id",
];

export const auth0 = new Auth0Client({
  // Without this hook, the SDK silently drops any custom namespaced claim
  // (like our ROLE_CLAIM from the Post-Login Action) from session.user,
  // keeping only a fixed allowlist of standard OIDC claims — found by
  // logging session.user and seeing the role claim was simply never there.
  async beforeSessionSaved(session, _idToken) {
    const claims = session.user || {};
    const user = {};
    for (const key of DEFAULT_ID_TOKEN_CLAIMS) {
      if (key in claims) user[key] = claims[key];
    }
    if (ROLE_CLAIM in claims) user[ROLE_CLAIM] = claims[ROLE_CLAIM];
    return { ...session, user };
  },
  // The only authenticated destination in this app is /admin — the public
  // site never requires login — so the callback always lands there
  // unconditionally, rather than relying on the ?returnTo= query param
  // surviving the full login->callback round trip (observed in testing to
  // silently fall back to "/" instead of the originally requested path).
  async onCallback(error, ctx) {
    const appBaseUrl = ctx.appBaseUrl || process.env.APP_BASE_URL;
    if (error) {
      return NextResponse.redirect(new URL("/", appBaseUrl));
    }
    return NextResponse.redirect(new URL("/admin", appBaseUrl));
  },
});
