// Shared client-side helpers for the 4 lead forms (components/LeadForm*.jsx).
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
}
