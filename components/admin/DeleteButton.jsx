"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Generic admin "delete this row" button — reused by every CRUD module
// (Properties now, Regions/Documents in later phases).
export default function DeleteButton({ endpoint, confirmMessage, label = "Eliminar" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo eliminar.");
      }
      router.refresh();
    } catch (error) {
      window.alert(error.message);
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="text-sm text-muted hover:text-red-600 disabled:opacity-50"
    >
      {busy ? "..." : label}
    </button>
  );
}
