import "server-only";
import { sanityWriteClient } from "./sanity/writeClient";

// Called from every admin mutation route (Phases 3-7) so the Dashboard's
// recent-activity feed (Phase 8) has real data to show — e.g.
// logActivity(session, "update", { type: "opportunity", id, label: "Querétaro Norte" }).
export async function logActivity(session, action, entity) {
  try {
    await sanityWriteClient.create({
      _type: "activityLog",
      actorName: session?.user?.name || session?.user?.email || "Desconocido",
      actorEmail: session?.user?.email || "",
      action,
      entityType: entity.type,
      entityId: entity.id,
      entityLabel: entity.label,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    // Never let activity logging fail the actual mutation the user cares about.
    console.error("logActivity failed:", error);
  }
}
