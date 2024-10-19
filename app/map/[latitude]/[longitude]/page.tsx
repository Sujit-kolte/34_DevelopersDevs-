"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

// Define an interface for the coordinates
interface Coordinates {
  lng: number;
  lat: number;
}

export default function Map({
  params,
}: {
  params: {
    latitude: string;
    longitude: string;
  };
}) {
  useEffect(() => {
    console.log(params.latitude, params.longitude);
  }, []);
  // Define ref for map container (HTMLDivElement or null)
  const mapContainer = useRef<HTMLDivElement | null>(null);
  // Define ref for the map instance (MapTiler SDK Map or null)
  const map = useRef<maptilersdk.Map | null>(null);

  // Initial center point (Tokyo coordinates) and zoom level
  const tokyo: Coordinates = { lng: +params.longitude, lat: +params.latitude };
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
      .setLngLat([+params.longitude, +params.latitude]) // Tokyo marker
      .addTo(map.current);
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
