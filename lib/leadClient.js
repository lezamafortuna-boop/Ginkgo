// Shared client-side helpers for the 4 lead forms (components/LeadForm*.jsx).
import { trackEvent } from "./analytics";

export function getUtmParams() {
  if (typeof window === "undefined") return { utmSource: "", utmCampaign: "" };
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}

export async function submitLead(formData) {
  const res = await fetch("/api/leads", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }
  trackLeadSubmitted(formData);
}

// Called only after the server accepted the lead (plan §17: forms sent,
// information requests, dossier requests).
function trackLeadSubmitted(formData) {
  const formType = formData.get("formType")?.toString() || "unknown";
  const params = { form_type: formType, locale: formData.get("locale")?.toString() || "" };
  const property = formData.get("propertySlug")?.toString();
  if (property) params.property = property;

  trackEvent("generate_lead", params);

  // Form A (property_info) is the "request information / download the dossier"
  // form on each property page, so it counts toward both plan metrics.
  if (formType === "property_info") {
    trackEvent("request_information", params);
    trackEvent("request_dossier", params);
  }
}
