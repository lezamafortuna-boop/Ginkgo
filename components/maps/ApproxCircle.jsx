"use client";

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

// @vis.gl/react-google-maps has no <Circle>, so draw it imperatively.
export default function ApproxCircle({ center, radius }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !window.google?.maps) return;
    const circle = new window.google.maps.Circle({
      map,
      center,
      radius,
      strokeColor: "#183863",
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: "#183863",
      fillOpacity: 0.15,
      clickable: false,
    });
    return () => circle.setMap(null);
  }, [map, center.lat, center.lng, radius]);

  return null;
}
