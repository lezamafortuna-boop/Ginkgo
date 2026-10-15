# Ginkgo — real-estate website + admin panel

Bilingual (ES/EN) website for Ginkgo, a Mexican firm that identifies, structures and markets land and development opportunities for developers and investors. A personal side project built by Luis for a friend (the client). The functional spec is `ginkgoPlan.pdf`; the admin UI spec is `Diseño completo de la UI del panel administrativo.docx`; the lead-form spec is `data/Formularios-Ginkgo.pdf`.

> **Resuming work?** Jump to [Current status](#current-status) and [What's left](#whats-left-to-finish). For the day-to-day working notes see `StatusProject.md`.

## Stack

- Next.js 16 (App Router, Turbopack, `proxy.js` instead of middleware), React 19, Tailwind 4
- Sanity (project `ts8eurd3`, dataset `production`) as the CMS/database — no separate backend
- Auth0 (`@auth0/nextjs-auth0`) for admin login; roles `ADMIN` and `ASSISTANT` (`lib/auth/roles.js`)
- Resend for lead emails; Google Maps (`@vis.gl/react-google-maps`); Google Analytics 4
- Hosting target: Vercel

## Run locally

```
npm install
npm run dev        # http://localhost:3000
```

Needs `.env.local` (never commit it). Variable names:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_DATASET`, `SANITY_API_VERSION` | Sanity read access (`production`, `2025-01-01`) |
| `SANITY_WRITE_TOKEN` | Sanity write token (admin saves, lead capture) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Restricted browser key, Maps JavaScript API only |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 `G-…` ID; analytics is off when unset |
| `RESEND_API_KEY` | Lead notification + auto-reply emails |
| `APP_BASE_URL` | Public site URL (`https://ginkgomx.com` in production) |
| `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET` | Admin login (generate a new `AUTH0_SECRET` for production) |

`SMTP_*` / `EMAIL_*` entries in the local file are not used by the code.

## Project map

| Path | What it is |
|---|---|
| `app/es/*`, `app/en/*` | Public site (Spanish / English routes) |
| `app/admin/*` | Admin panel (Auth0-protected) |
| `app/api/leads` | Lead forms → saved in Sanity + team email + visitor auto-reply |
| `app/api/admin/*` | Admin save/delete endpoints (role-checked, activity-logged) |
| `app/api/whatsapp-message` | Resolves the prefilled WhatsApp text for a page (server-side) |
| `lib/siteSettings.js` | Contact settings from Sanity, falling back to `lib/contact.js` |
| `lib/siteContent.js`, `lib/siteContentCatalog.js` | Editable site texts (originals live in the catalog) |
| `lib/maps.js` | Coordinate validation + approximate-location blur |
| `lib/analytics.js`, `components/Analytics.jsx` | GA4 |
| `lib/sanity/*` | Clients, queries, adapters, form-data validators |
| `scripts/migrate-insights.js` | Safe seed for Insights (`createIfNotExists`; supports `--dry`) |
| `scripts/migrate-static-data.js` | Old seed using `createOrReplace` — **do not re-run**, it would overwrite admin edits |
| `studio/` | Standalone Sanity Studio scaffold — Phase 2, not deployed, don't touch yet |

## What the admin panel does

| Module | Roles | Edits |
|---|---|---|
| Leads | Admin, Assistant | View/status of form submissions |
| Propiedades | Admin, Assistant | Opportunities (data, photos, coordinates, location precision) |
| Regiones | Admin, Assistant | Strategic regions |
| Mapas interactivos | Admin, Assistant | Map overview of properties |
| Documentos | Admin, Assistant | Dossiers/documents |
| Insights | Admin, Assistant | Articles (ES/EN), shown on `/es/insights`, `/en/insights` and the sitemap |
| Contenido del sitio | Admin, Assistant | Homepage hero, "¿Por qué Ginkgo?", process, final CTA, Nosotros and Servicios texts (ES/EN). Empty field = original text |
| Configuración | Admin only | WhatsApp number, phone, email (also the lead-notification recipient), Instagram, LinkedIn, address |
| Usuarios | Admin only | Placeholder ("coming soon"); users are managed in Auth0 |

## Key technical decisions and gotchas

- **Public reads are live, not CDN.** `lib/sanity/client.js` uses `useCdn: false` because Sanity's CDN served stale data after admin edits. Pages also use `revalidate`, and admin saves call `revalidatePath`.
- **Approximate locations.** Property coordinates are never sent to the browser unblurred unless a property is set to `locationPrecision: "exact"`; otherwise a deterministic 300–900 m offset and a 1.5 km circle are used. Invalid coordinates are filtered out.
- **WhatsApp prefilled text is resolved on the server** (`/api/whatsapp-message`); reading Sanity straight from the browser didn't work.
- **Contact details** come from the Sanity `siteSettings` document (id `siteSettings`); if nothing is saved, `lib/contact.js` constants are used. Leaving Instagram/LinkedIn empty hides them.
- **Editable texts** are stored in the `siteContent` document (`texts` array, only values that differ from the catalog). To make another text editable, add a slot in `lib/siteContentCatalog.js` and read it with `const t = await getSiteText(); t(key, locale)`.
- **Analytics.** Page views, WhatsApp/phone/email link clicks and lead submissions (`generate_lead` etc.) are tracked; debug mode outside production.
- Windows dev machine: `node_modules` is Windows-built; run builds locally, not from Linux.

## Current status

Last updated: 2026-10-14.

### Done (all committed unless noted)
1. Brand identity per the plan (navy `#0C1A2F`, blue `#183863`, gold `#E4C745`; Montserrat/Poppins).
2. Real regions from the plan.
3. Floating WhatsApp button with contextual messages; footer/contact links.
4. Four lead forms (A/B/C/D) → Sanity + Resend; optional "Empresa" field on the custom-search form.
5. Interactive Google Maps (new restricted key), approximate-location privacy, per-property map, coordinate validation.
6. Insights managed in Sanity (admin CRUD, public ES/EN pages, sitemap). Tested end to end: create, edit, duplicate-slug guard, delete. Image upload was tested earlier by Luis.
7. Configuración (admin-only) wired to the whole public site and the lead-notification email. Tested on the real dataset, original values restored.
8. Contenido del sitio (homepage, Nosotros, Servicios texts, ES/EN). Tested on the real dataset, restored.
9. GA4 code written; the measurement ID is in `.env.local` and the gtag script loads in dev.
10. `useCdn: false` fix and server-side WhatsApp messages (see above).

> Before continuing, run `git status` — make sure the last commits (Configuración, Contenido, README) are pushed.

## What's left to finish

### Needs the client (friend)
- Real coordinates for "Ginkgo Macrolotes SA de CV" (currently invalid: lat 6540.99, lng 65460.99, so no pin). Set them in `/admin/propiedades` and re-check `/es/mapa`, `/en/map` and the property page.
- Photos, dossiers and technical info for the 2–3 featured opportunities; images for the two Insights articles.
- Final contact details (he can enter them in Configuración) and approval of the homepage/Nosotros/Servicios texts.
- Decision on a cookie-consent banner (and wording of the privacy/cookie pages — legal review recommended).
- Ownership of every account (see transfer plan below).

### Launch work
1. **Move ownership to the client** (decided: he must own the project, not Luis's personal accounts).
   - He creates a free GitHub account (optionally a free organization he owns) with 2FA.
   - Before transfer: confirm `.env.local` was never committed (`git log --all --oneline -- .env.local`), search history for secrets (e.g. `git log -p -S"SANITY_WRITE_TOKEN"`; rotate anything real), push everything, `git status` clean.
   - Transfer the repo: GitHub → repo Settings → Danger Zone → Transfer ownership; he accepts; he adds Luis as collaborator (write/admin).
   - Locally: `git remote set-url origin https://github.com/<his-user-or-org>/<repo>.git`, then `git pull`.
2. **Vercel on his account.** He signs up with GitHub, chooses the plan (the free Hobby plan is, as far as I know, non-commercial only — verify Vercel's current terms; a business site normally needs Pro), imports the repo (Next.js preset, `next build`). Luis can deploy through GitHub pushes as a collaborator; being invited to the Vercel team may add a paid seat, and Vercel may block deploys from commit authors who aren't team members on private repos — verify.
3. **Environment variables** in Vercel (Production): all variables in the table above. Set `APP_BASE_URL=https://ginkgomx.com` (no trailing slash) and a *new* `AUTH0_SECRET`. Share secrets live or via a password manager, never over plain chat/email.
4. **Domain.** Add `ginkgomx.com` and `www` in Vercel and the DNS records at his registrar.
5. **Auth0** (Application → Settings): add the production callback, logout and web-origin URLs (`https://ginkgomx.com/auth/callback`, `https://ginkgomx.com`, `https://ginkgomx.com`) — confirm the callback path against the dev login URL first. Create the admin/assistant users and roles.
6. **Google Cloud:** add `https://ginkgomx.com/*` and `https://www.ginkgomx.com/*` to the Maps key's website restrictions; delete or restrict the old "Maps Platform API Key" (32 APIs). Confirm he owns the Google Cloud project.
7. **Sanity:** add `https://ginkgomx.com` to CORS origins; make him owner/admin of project `ts8eurd3`.
8. **Resend:** verify the `ginkgomx.com` sending domain (emails are sent from `leads@ginkgomx.com`); account in his name.
9. **GA4:** add the same measurement ID to Vercel; production domain in the data stream; confirm events in Realtime/DebugView.
10. Check he owns: domain registrar, GA4, Google Cloud, Auth0, Sanity, Resend, GitHub, Vercel.

### Production test checklist
- Pages `/es`, `/en`, a property page, `/es/mapa`, `/es/contacto`: map, floating WhatsApp button, contextual messages.
- Submit each of the 4 lead forms: lead appears in `/admin/leads`, team email arrives at the Configuración address, visitor auto-reply arrives.
- Log in as admin and as assistant; check role restrictions (Configuración and Usuarios admin-only).
- Edit a text in Contenido del sitio and a contact value in Configuración; confirm they change on the live site.
- GA4 Realtime: page view + WhatsApp click.
- `/sitemap.xml`, `/robots.txt`; submit the sitemap in Search Console.
- Full pass on a real phone and tablet (public site and admin).

### After launch / optional
- Handover guide for the client (what each admin module edits, how to add users in Auth0); agree maintenance terms (plan §31).
- Usuarios page (read-only roster) — low priority.
- Migrate `google.maps.Marker` to AdvancedMarker (needs a Map ID) — currently only a deprecation warning.
- More editable content: hero video/image, SEO titles/descriptions, closing forms on Nosotros/Servicios, regions/properties intros, variable-length lists.
- Phase 2 per the plan: Studio (`studio/`), "Tengo un terreno" funnel, second-stage CRM. The `locationPrecision` field exists in `studio/schemaTypes/documents/opportunity.ts` but the Studio isn't deployed.

## Working agreement
One task at a time: implement, verify (build + browser check), then Luis runs the git commands himself (Claude doesn't run git).

## Change log

| Date | Change |
|---|---|
| 2026-10-07 | Interactive Google Maps finished with the new key; approximate-location privacy; property-page maps; coordinate validation |
| 2026-10-07 | Custom-search form: optional Empresa field; StatusProject.md updated |
| 2026-10-07 | GA4 analytics code (env-gated) |
| 2026-10-07 | Insights moved to Sanity with admin CRUD, public pages, sitemap, seed script; end-to-end test; `useCdn: false` fix |
| 2026-10-07 | Configuración module + contact settings read from Sanity; WhatsApp message lookup moved server-side |
| 2026-10-07 | Contenido del sitio module (homepage, Nosotros, Servicios texts, ES/EN); GA4 ID confirmed working in dev |
| 2026-10-10 | Planned deployment: client-owned GitHub + Vercel, repo transfer, env vars, DNS, Auth0/Maps/Sanity/Resend updates |
| 2026-10-14 | README rewritten as project log and handoff (previous contents saved as `README.old.md`) |
