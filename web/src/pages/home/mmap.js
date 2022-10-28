import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./mapgl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const Mapp = (props) => {
  const mapContainerRef = useRef(null);
  const { coords } = props;

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-87.65, 41.84],
      zoom: 10,
    });

    // Create default markers
    new mapboxgl.Marker()
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  },);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapp;
