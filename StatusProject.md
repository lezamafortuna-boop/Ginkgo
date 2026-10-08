Perfecto Luis — dejo una **nota clara, organizada y profesional** dentro del proyecto para que mañana retomemos exactamente donde lo dejamos, sin perder contexto ni decisiones del cliente.

La dejo escrita como si fuera parte del repositorio, para que puedas copiarla en tu README, en tu documentación interna o simplemente tenerla aquí como referencia.

---

# 📝 **Project Status Note — Ginkgo Web (updated 7 October 2026)**

We're working through the Ginkgo real-estate website (C:\Users\User\Documents\CircuitStream\Ginkgo) against the Phase 1 spec in ginkgoPlan.pdf (same folder). Working style: one fix at a time — you implement and verify (build + browser check), then give me the exact git add/git commit commands so I can run them myself before we move to the next task. Don't run git commands yourself.

Done and committed so far:
1. Brand identity — palette/fonts now match the plan's spec (navy #0C1A2F primary, institutional blue #183863 secondary, gold #E4C745 accent used sparingly; Montserrat/Poppins fonts)
2. Regions content — replaced placeholder regions with the real ones named in the plan (Querétaro, Corregidora, El Marqués, Santa Rosa Jáuregui, Pedro Escobedo, Cadereyta de Montes, Puerto Vallarta) in data/regions.js, and re-pointed the 3 featured opportunities in data/opportunities.js to them
3. WhatsApp CTA — floating WhatsApp button (components/FixedCTA.jsx) with contextual pre-filled messages per opportunity/region (lib/whatsapp.js, lib/contact.js); Footer/Contact page links fixed
4. Lead forms — the four forms from data/Formularios-Ginkgo.pdf (LeadFormA/B/C/D) post to app/api/leads/route.js, which saves a `lead` document in Sanity and sends the team notification + visitor auto-reply via Resend. The custom-search form (LeadFormC, used by components/{es,en}/CustomSearchForm*.jsx on the Home pages) already has real structured fields: what they're looking for, region of interest, surface, development type, optional budget and purchase horizon. (Plan §10's optional "Empresa" field was added on 7 Oct 2026.) Not submitted live during testing, to avoid creating a real lead and sending emails.
5. Interactive maps (plan §6.4 and §7) — Google Maps JavaScript API via @vis.gl/react-google-maps; key is NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local (browser key restricted to the Maps JavaScript API and to localhost:3000 + the production domain). Public map at /es/mapa and /en/map; interactive map on each property page (replaces the static mapImage, which stays as a fallback when a property has no coordinates); admin map at /admin/mapas; location picker in the admin property form. Locations default to APPROXIMATE: the browser never receives the real coordinates — the pin is shifted 300–900 m and a 1.5 km circle is drawn (lib/maps.js). A property can be switched to "Exacta" in the admin form (field `locationPrecision`). Invalid coordinates (lat outside ±90 / lng outside ±180) are rejected on save and hidden on the maps. Verified in the browser: the map loads with the new key.

Open items on the maps work:
- The one existing property ("Ginkgo Macrolotes SA de CV") has invalid saved coordinates (lat 6540.99, lng 65460.99), so it has no pin yet. The friend will send the real coordinates; set them in /admin/propiedades (Ubicación section). Then re-check the pin, circle and popup on /es/mapa, /en/map and the property page.
- Google Cloud: the old "Maps Platform API Key" (created Oct 3, allowed for 32 APIs) is no longer used. Delete it or restrict it like the new "API key Maps" once nothing else depends on it.
- Before launch: add the production domain to the new key's website restrictions.
- google.maps.Marker is deprecated (warning only, Google promises 12 months' notice). Migrating to AdvancedMarker needs a Map ID from the same Google Cloud project — low priority.
- The new `locationPrecision` field is in studio/schemaTypes/documents/opportunity.ts, but the Studio is Phase 2 and isn't deployed, so it won't appear there yet.

Next up, in order:
1. Analytics (plan §17) — no GA4/GTM/Meta Pixel wired in anywhere. Need at minimum GA4 via next/script or @next/third-parties, tracking page views, form submissions, WhatsApp clicks, phone/email clicks. Needs the GA4 measurement ID from the friend.
2. Insights section flagged, not actioned — the plan explicitly says Insights isn't required for Phase 1 launch, but it's fully built out (app/{es,en}/insights/). Not broken, just scope beyond the brief — worth a decision on whether to keep, trim, or gate it for later.

Deferred to Phase 2 (do not touch yet): studio/ — a standalone Sanity Studio scaffold (schema for Opportunities/Regions/Insights/Site Settings/Leads) reusing the previously-provisioned Sanity project (fua075ju). It's excluded from the Next.js TypeScript build (tsconfig.json) so it doesn't interfere. The public site and admin already read and write opportunities, regions and leads in that Sanity project through lib/sanity/; the Studio itself is what's deferred.
