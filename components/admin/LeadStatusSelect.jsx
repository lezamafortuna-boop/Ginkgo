"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "nuevo", label: "Nuevo" },
  { value: "contactado", label: "Contactado" },
  { value: "seguimiento", label: "En seguimiento" },
  { value: "cerrado", label: "Cerrado" },
  { value: "descartado", label: "Descartado" },
];

export default function LeadStatusSelect({ id, status }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      window.alert("No se pudo actualizar el estado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={busy}
      className="rounded-md border border-border bg-paper px-2 py-1 text-xs text-ink disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
