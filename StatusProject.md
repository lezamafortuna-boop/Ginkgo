Perfecto Luis — dejo una **nota clara, organizada y profesional** dentro del proyecto para que mañana retomemos exactamente donde lo dejamos, sin perder contexto ni decisiones del cliente.

La dejo escrita como si fuera parte del repositorio, para que puedas copiarla en tu README, en tu documentación interna o simplemente tenerla aquí como referencia.

---

# 📝 **Project Status Note — Ginkgo Web (20 Agosto 2026)**

We're working through the Ginkgo real-estate website (C:\Users\User\Documents\CircuitStream\Ginkgo) against the Phase 1 spec in ginkgoPlan.pdf (same folder). Working style: one fix at a time — you implement and verify (build + browser check), then give me the exact git add/git commit commands so I can run them myself before we move to the next task. Don't run git commands yourself.

Done and committed so far:
1. Brand identity — palette/fonts now match the plan's spec (navy #0C1A2F primary, institutional blue #183863 secondary, gold #E4C745 accent used sparingly; Montserrat/Poppins fonts)
2. Regions content — replaced placeholder regions with the real ones named in the plan (Querétaro, Corregidora, El Marqués, Santa Rosa Jáuregui, Pedro Escobedo, Cadereyta de Montes, Puerto Vallarta) in data/regions.js, and re-pointed the 3 featured opportunities in data/opportunities.js to them
3. WhatsApp CTA — added a floating WhatsApp button (components/FixedCTA.jsx) with contextual pre-filled messages per opportunity/region (lib/whatsapp.js, lib/contact.js), fixed the Footer/Contact page WhatsApp links to use a proper icon and the same messages

Next up, in order:
1. Custom-search form fields (plan §10) — components/{es,en}/CustomSearchFormES/EN.jsx reuse the generic LeadForm (name/email/phone/company/message) but the plan specifies structured fields: ciudad/región de interés, tipo de proyecto, superficie requerida, presupuesto aproximado. Need to add these as real fields (not squeezed into free text) — likely as an extended variant of LeadForm or a dedicated form, and update app/api/lead/route.js to accept/relay them.
2. Analytics (plan §17) — no GA4/GTM/Meta Pixel wired in anywhere. Need to add at minimum GA4 via next/script or @next/third-parties, tracking page views, form submissions, WhatsApp clicks, phone/email clicks.
3. Insights section flagged, not actioned — the plan explicitly says Insights isn't required for Phase 1 launch, but it's fully built out (app/{es,en}/insights/). Not broken, just scope beyond the brief — worth a decision on whether to keep, trim, or gate it for later.

Deferred to Phase 2 (do not touch yet): studio/ — a standalone Sanity Studio scaffold (schema for Opportunities/Regions/Insights/Site Settings) sits untracked in the repo, reusing the previously-provisioned Sanity project (fua075ju). It's excluded from the Next.js TypeScript build (tsconfig.json) so it doesn't interfere. Nothing in the live site fetches from it yet — that wiring is Phase 2 work, after Phase 1 ships.
