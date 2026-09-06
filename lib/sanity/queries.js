import { sanityClient } from "./client";
import { sanityWriteClient } from "./writeClient";

// Only ever surface properties that are public — "reservado"/"vendido" stay
// editable in the CRM but drop off the public site and public map.
const PUBLIC_STATUS_FILTER = `status == "disponible"`;

// Resolves image/file references to their actual CDN URL right in the query,
// so callers never need a separate image-url builder for the common case.
const OPPORTUNITY_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  featured,
  order,
  status,
  "region": region->{ _id, name, "slug": slug.current },
  "image": image{ "url": asset->url },
  "gallery": gallery[]{ "url": asset->url },
  city,
  surface,
  vocation,
  briefDescription,
  availability,
  advantages,
  reasons,
  developmentPotential,
  "techSheet": techSheet{ "url": asset->url, "filename": asset->originalFilename },
  "mapImage": mapImage{ "url": asset->url },
  distances,
  coordinates,
  "documents": documents[]{ label, "url": file.asset->url },
  customFields
}`;

export async function getPublicOpportunities() {
  return sanityClient.fetch(
    `*[_type == "opportunity" && ${PUBLIC_STATUS_FILTER}] | order(order asc) ${OPPORTUNITY_PROJECTION}`
  );
}

export async function getFeaturedOpportunities() {
  return sanityClient.fetch(
    `*[_type == "opportunity" && featured == true && ${PUBLIC_STATUS_FILTER}] | order(order asc) ${OPPORTUNITY_PROJECTION}`
  );
}

export async function getOpportunityBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "opportunity" && slug.current == $slug][0] ${OPPORTUNITY_PROJECTION}`,
    { slug }
  );
}

// Every property with coordinates, for the public interactive map — includes
// all public (non-hidden) statuses so "reservado" can still show on the map
// if the business wants that later; for now this matches PUBLIC_STATUS_FILTER.
export async function getMapOpportunities() {
  return sanityClient.fetch(
    `*[_type == "opportunity" && ${PUBLIC_STATUS_FILTER} && defined(coordinates)] ${OPPORTUNITY_PROJECTION}`
  );
}

const REGION_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  description,
  advantages,
  "heroImage": heroImage{ "url": asset->url },
  "mapImage": mapImage{ "url": asset->url },
  order
}`;

export async function getRegions() {
  return sanityClient.fetch(`*[_type == "region"] | order(order asc) ${REGION_PROJECTION}`);
}

export async function getRegionBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "region" && slug.current == $slug][0] ${REGION_PROJECTION}`,
    { slug }
  );
}

export async function getSiteContent() {
  return sanityClient.fetch(`*[_type == "siteContent"][0]`);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

// --- Admin (server-only, uncached) --------------------------------------
// The admin panel reads through the write client instead of the public CDN
// client so staff see their own edits immediately, and so every status
// (not just "disponible") is visible.

const ADMIN_LIST_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  status,
  surface,
  featured,
  "region": region->{ _id, name },
  _updatedAt
}`;

export async function getAdminOpportunities() {
  return sanityWriteClient.fetch(
    `*[_type == "opportunity"] | order(_updatedAt desc) ${ADMIN_LIST_PROJECTION}`
  );
}

export async function getAdminOpportunityById(id) {
  return sanityWriteClient.fetch(`*[_type == "opportunity" && _id == $id][0] ${OPPORTUNITY_PROJECTION}`, {
    id,
  });
}

export async function getAdminRegions() {
  return sanityWriteClient.fetch(`*[_type == "region"] | order(order asc) { _id, name }`);
}

export async function getAdminRegionsWithCounts() {
  return sanityWriteClient.fetch(
    `*[_type == "region"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      "heroImage": heroImage{ "url": asset->url },
      "propertyCount": count(*[_type == "opportunity" && references(^._id)])
    }`
  );
}

export async function getAdminRegionById(id) {
  return sanityWriteClient.fetch(`*[_type == "region" && _id == $id][0] ${REGION_PROJECTION}`, { id });
}

const LEAD_PROJECTION = `{
  _id,
  formType,
  status,
  name,
  lastName,
  email,
  phone,
  propertyName,
  "property": property->{ name },
  message,
  createdAt
}`;

export async function getAdminLeads() {
  return sanityWriteClient.fetch(`*[_type == "lead"] | order(createdAt desc) ${LEAD_PROJECTION}`);
}
