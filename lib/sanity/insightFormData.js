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
const badRequest = (message, status = 400) => Object.assign(new Error(message), { status });

// Builds a Sanity `insight` field set from the admin Insights form's FormData.
// The image is only included when a new file was chosen — omitting the key on
// an update leaves the existing asset untouched.
export async function buildInsightFieldsFromFormData(formData) {
  const titleEs = str(formData, "title_es");
  const titleEn = str(formData, "title_en");
  const date = str(formData, "date");

  if (!titleEs || !titleEn) throw badRequest("El título (ES y EN) es obligatorio.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw badRequest("La fecha es obligatoria y debe ser válida.");
  }

  const slug = slugify(str(formData, "slug") || titleEs);
  if (!slug) throw badRequest("No se pudo generar el slug (URL). Escribe uno manualmente.");

  const fields = {
    title: { es: titleEs, en: titleEn },
    slug: { _type: "slug", current: slug },
    category: { es: str(formData, "category_es"), en: str(formData, "category_en") },
    date,
    excerpt: { es: str(formData, "excerpt_es"), en: str(formData, "excerpt_en") },
    content: { es: str(formData, "content_es"), en: str(formData, "content_en") },
  };

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const asset = await sanityWriteClient.assets.upload("image", imageFile, { filename: imageFile.name });
    fields.image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  return fields;
}

// Two articles sharing a slug would make one of them unreachable, so refuse it.
export async function assertInsightSlugAvailable(slug, excludeId) {
  const clash = await sanityWriteClient.fetch(
    `*[_type == "insight" && slug.current == $slug && _id != $excludeId][0]._id`,
    { slug, excludeId: excludeId || "" }
  );
  if (clash) throw badRequest("Ya existe un artículo con ese slug (URL). Usa otro.", 409);
}
