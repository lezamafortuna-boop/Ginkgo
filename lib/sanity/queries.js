import { sanityClient } from "./client";

// Only ever surface properties that are public — "reservado"/"vendido" stay
// editable in the CRM but drop off the public site and public map.
const PUBLIC_STATUS_FILTER = `status == "disponible"`;

const OPPORTUNITY_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  featured,
  order,
  status,
  "region": region->{ _id, name, "slug": slug.current },
  image,
  gallery,
  city,
  surface,
  vocation,
  availability,
  advantages,
  reasons,
  developmentPotential,
  techSheet,
  mapImage,
  distances,
  coordinates,
  documents,
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
  heroImage,
  mapImage,
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
