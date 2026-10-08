// Shared helpers for the interactive maps. Pure functions (no server-only
// imports) so both server pages and client map components can use them.

export const MEXICO_CENTER = { lat: 22.5, lng: -101.5 };

// When a property's location is "approximate" (plan §7: locations may be
// approximate when the commercial strategy requires it), the public site never
// receives the real coordinates. Instead the pin is moved a stable, pseudo-random
// distance away (between MIN and MAX) and a circle of APPROX_RADIUS_M is drawn
// around it. MAX < RADIUS, so the real spot is always inside the circle.
export const APPROX_RADIUS_M = 1500;
const OFFSET_MIN_M = 300;
const OFFSET_MAX_M = 900;

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Latitude must be within -90..90 and longitude within -180..180; anything else
// (e.g. a mistyped value saved in the CMS) cannot be drawn on a map.
export function isValidCoordinates(c) {
  return (
    c != null &&
    Number.isFinite(c.lat) &&
    Number.isFinite(c.lng) &&
    Math.abs(c.lat) <= 90 &&
    Math.abs(c.lng) <= 180
  );
}

export function blurCoordinates({ lat, lng }, seed) {
  const h = hash(String(seed));
  const angle = ((h % 3600) / 3600) * 2 * Math.PI;
  const dist = OFFSET_MIN_M + (((h >>> 12) % 1000) / 1000) * (OFFSET_MAX_M - OFFSET_MIN_M);
  const dLat = (dist * Math.cos(angle)) / 111320;
  const dLng = (dist * Math.sin(angle)) / (111320 * Math.cos((lat * Math.PI) / 180));
  return { lat: lat + dLat, lng: lng + dLng };
}

// Returns a copy of a legacy-shaped opportunity that is safe to send to the
// browser: coordinates are blurred unless the property is explicitly "exact".
// Missing precision counts as approximate (privacy-first default).
export function toPublicMapPoint(property) {
  if (!property) return property;
  if (!isValidCoordinates(property.coordinates)) return { ...property, coordinates: null };
  const approximate = property.locationPrecision !== "exact";
  return {
    ...property,
    approximate,
    coordinates: approximate
      ? blurCoordinates(property.coordinates, property.slug || property.id)
      : { lat: property.coordinates.lat, lng: property.coordinates.lng },
  };
}
