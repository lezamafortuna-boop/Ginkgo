import "server-only";
import { sanityWriteClient } from "./writeClient";

const ACCENTS = { á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u", ñ: "n" };

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[áéíóúüñ]/g, (c) => ACCENTS[c])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const str = (formData, key) => formData.get(key)?.toString().trim() || "";

// Builds a Sanity `opportunity` field set from the admin property form's
// FormData. Image/gallery fields are only included when a new file was
// actually chosen — file inputs can't be pre-filled with the current asset,
// so omitting the key on an update leaves the existing asset untouched.
export async function buildOpportunityFieldsFromFormData(formData) {
  const nameEs = str(formData, "name_es");
  const nameEn = str(formData, "name_en");
  const slugInput = str(formData, "slug");

  if (!nameEs || !nameEn) {
    throw Object.assign(new Error("El nombre (ES y EN) es obligatorio."), { status: 400 });
  }

  const fields = {
    name: { es: nameEs, en: nameEn },
    slug: { _type: "slug", current: slugify(slugInput || nameEs) },
    status: str(formData, "status") || "disponible",
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order")) || 0,
    surface: str(formData, "surface"),
    city: { es: str(formData, "city_es"), en: str(formData, "city_en") },
    vocation: { es: str(formData, "vocation_es"), en: str(formData, "vocation_en") },
    availability: { es: str(formData, "availability_es"), en: str(formData, "availability_en") },
    briefDescription: { es: str(formData, "briefDescription_es"), en: str(formData, "briefDescription_en") },
    developmentPotential: {
      es: str(formData, "developmentPotential_es"),
      en: str(formData, "developmentPotential_en"),
    },
  };

  const regionId = str(formData, "region");
  fields.region = regionId ? { _type: "reference", _ref: regionId } : null;

  const lat = formData.get("lat");
  const lng = formData.get("lng");
  fields.coordinates = lat && lng ? { _type: "geopoint", lat: Number(lat), lng: Number(lng) } : null;
  fields.locationPrecision = str(formData, "locationPrecision") === "exact" ? "exact" : "approximate";

  const customFieldsRaw = formData.get("customFields")?.toString();
  if (customFieldsRaw) {
    try {
      const parsed = JSON.parse(customFieldsRaw);
      if (Array.isArray(parsed)) {
        fields.customFields = parsed.filter((f) => f?.label && f?.value);
      }
    } catch {
      // Ignore malformed JSON from the client rather than fail the whole save.
    }
  }

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const asset = await sanityWriteClient.assets.upload("image", imageFile, { filename: imageFile.name });
    fields.image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  const galleryFiles = formData.getAll("gallery").filter((f) => f instanceof File && f.size > 0);
  if (galleryFiles.length > 0) {
    const uploaded = await Promise.all(
      galleryFiles.map((file) =>
        sanityWriteClient.assets.upload("image", file, { filename: file.name })
      )
    );
    fields.gallery = uploaded.map((asset) => ({
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    }));
  }

  return fields;
}
