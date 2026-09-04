# Ginkgo — Sanity Studio

This is the content editor for ginkgomx.com. It runs separately from the website itself
(the `..` folder), so publishing an update to the Studio never requires redeploying the site.

Reuses the existing Sanity project `fua075ju` / dataset `production`.

## First-time setup

```bash
cd studio
npm install
npx sanity login
```

## Run locally

```bash
npm run dev
```

Opens at http://localhost:3333.

## Deploy the Studio (gives Ginkgo a permanent editing URL)

```bash
npm run deploy
```

The CLI will ask for a studio hostname (e.g. `ginkgo` → `https://ginkgo.sanity.studio`).
Once deployed, invite Ginkgo's team as Editors from https://www.sanity.io/manage → the
`fua075ju` project → Members, so they can log in and edit content directly without
touching code.

## What's editable here

- **Datos de contacto y redes** — phone/WhatsApp, email, Instagram, LinkedIn.
- **Oportunidades** — the property listings, including which ones are marked
  "Destacada en Home" (shown as the three featured cards on the homepage).
- **Regiones Estratégicas**.
- **Insights**.

Every text field has an ES and EN side so both languages stay in one place.

## Content types

See `schemaTypes/documents/` for the full field list of each type, and
`schemaTypes/objects/localeString.ts` / `localeText.ts` for the bilingual field pattern
used throughout.
