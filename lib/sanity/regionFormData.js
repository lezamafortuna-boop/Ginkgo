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

// Builds a Sanity `region` field set from the admin region form's FormData.
// Image fields are only included when a new file was actually chosen —
// omitting the key on an update leaves the existing asset untouched.
export async function buildRegionFieldsFromFormData(formData) {
  const nameEs = str(formData, "name_es");
  const nameEn = str(formData, "name_en");
  const slugInput = str(formData, "slug");

  if (!nameEs || !nameEn) {
    throw Object.assign(new Error("El nombre (ES y EN) es obligatorio."), { status: 400 });
  }

  const fields = {
    name: { es: nameEs, en: nameEn },
    slug: { _type: "slug", current: slugify(slugInput || nameEs) },
    description: { es: str(formData, "description_es"), en: str(formData, "description_en") },
    order: Number(formData.get("order")) || 0,
  };

  const advantagesRaw = formData.get("advantages")?.toString();
  if (advantagesRaw) {
    try {
      const parsed = JSON.parse(advantagesRaw);
      if (Array.isArray(parsed)) {
        fields.advantages = parsed.filter((a) => a?.es && a?.en);
      }
    } catch {
      // Ignore malformed JSON from the client rather than fail the whole save.
    }
  }

  const heroImageFile = formData.get("heroImage");
  if (heroImageFile instanceof File && heroImageFile.size > 0) {
    const asset = await sanityWriteClient.assets.upload("image", heroImageFile, {
      filename: heroImageFile.name,
    });
    fields.heroImage = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  const mapImageFile = formData.get("mapImage");
  if (mapImageFile instanceof File && mapImageFile.size > 0) {
    const asset = await sanityWriteClient.assets.upload("image", mapImageFile, {
      filename: mapImageFile.name,
    });
    fields.mapImage = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  return fields;
}
