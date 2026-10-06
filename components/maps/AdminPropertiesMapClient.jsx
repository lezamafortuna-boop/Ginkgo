"use client";

import dynamic from "next/dynamic";

const AdminPropertiesMap = dynamic(() => import("./AdminPropertiesMap"), {
  ssr: false,
  loading: () => <div className="h-[600px] rounded-lg border border-border bg-cream" />,
});

export default AdminPropertiesMap;
