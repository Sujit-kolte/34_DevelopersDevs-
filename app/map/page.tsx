"use client";

import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

// Define an interface for the coordinates
interface Coordinates {
  lng: number;
  lat: number;
}

export default function Map() {
  // Define ref for map container (HTMLDivElement or null)
  const mapContainer = useRef<HTMLDivElement | null>(null);
  // Define ref for the map instance (MapTiler SDK Map or null)
  const map = useRef<maptilersdk.Map | null>(null);

  // Initial center point (Tokyo coordinates) and zoom level
  const tokyo: Coordinates = { lng: 139.753, lat: 35.6844 };
  const zoom = 14;

  // Set the MapTiler API key
  maptilersdk.config.apiKey = "rPjcbVHsRO59E4Isshgh"; // Replace with your API key

  useEffect(() => {
    // If map is already initialized, do not reinitialize
    if (map.current) return;

    console.log(map.current);

    // Initialize the MapTiler map
    map.current = new maptilersdk.Map({
      container: mapContainer.current as HTMLElement, // Ensure the ref is not null
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });

    // Add the first marker (Red)
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846]) // Tokyo marker
      .addTo(map.current);

    // Add the second marker (Blue)
    new maptilersdk.Marker({ color: "#0000FF" })
      .setLngLat([139.7615, 35.6895]) // Another location in Tokyo
      .addTo(map.current);

    // Add more markers as needed (Green)
    new maptilersdk.Marker({ color: "#00FF00" })
      .setLngLat([139.7585, 35.6825]) // Third location in Tokyo
      .addTo(map.current);
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
