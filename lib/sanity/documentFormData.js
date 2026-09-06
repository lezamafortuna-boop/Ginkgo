import "server-only";
import { sanityWriteClient } from "./writeClient";

const str = (formData, key) => formData.get(key)?.toString().trim() || "";

const VALID_TYPES = ["tech_sheet", "plan", "legal", "presentation", "other"];

// Builds a Sanity `siteDocument` field set from the admin upload form's
// FormData. Only used for create — documents are re-uploaded rather than
// edited, so there's no "leave file unchanged" case to handle like the
// Property/Region forms.
export async function buildDocumentFieldsFromFormData(formData) {
  const title = str(formData, "title");
  const type = str(formData, "type") || "other";
  const file = formData.get("file");

  if (!title) {
    throw Object.assign(new Error("El nombre del documento es obligatorio."), { status: 400 });
  }
  if (!VALID_TYPES.includes(type)) {
    throw Object.assign(new Error("Tipo de documento inválido."), { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    throw Object.assign(new Error("Debes seleccionar un archivo."), { status: 400 });
  }

  const asset = await sanityWriteClient.assets.upload("file", file, { filename: file.name });

  const fields = {
    title,
    type,
    file: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
    uploadedAt: new Date().toISOString(),
  };

  const propertyId = str(formData, "property");
  if (propertyId) fields.property = { _type: "reference", _ref: propertyId };

  const regionId = str(formData, "region");
  if (regionId) fields.region = { _type: "reference", _ref: regionId };

  return fields;
}
