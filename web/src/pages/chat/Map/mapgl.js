import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./mapgl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRoaWxyb3NoYW4iLCJhIjoiY2w5cW05ZWt6MTJ4ajN3bzU1cnQ0czV2ciJ9.U_e1jW1cBHbGC7n6R13vXQ";

export default function MapGL(props) {
  const { coords } = props;
  const mapContainer = useRef(null);
  // const map = useRef(null);
  const [lng, setLng] = useState(coords.longitude);
  const [lat, setLat] = useState(coords.latitude);
  const [zoom, setZoom] = useState(19);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      // zoom: zoom,
      zoom: 17,
      bearing: -12,
      pitch: 60,
      
      // interactive: false,
    });

    new mapboxgl.Marker()
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    // map.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    // // pixels the map pans when the up or down arrow is clicked
    // const deltaDistance = 100;

    // // degrees the map rotates when the left or right arrow is clicked
    // const deltaDegrees = 25;

    // function easing(t) {
    //   return t * (2 - t);
    // }

    // map.on("load", () => {
    //   map.getCanvas().focus();

    //   map.getCanvas().addEventListener(
    //     "keydown",
    //     (e) => {
    //       e.preventDefault();
    //       if (e.which === 38) {
    //         // up
    //         map.panBy([0, -deltaDistance], {
    //           easing: easing,
    //         });
    //       } else if (e.which === 40) {
    //         // down
    //         map.panBy([0, deltaDistance], {
    //           easing: easing,
    //         });
    //       } else if (e.which === 37) {
    //         // left
    //         map.easeTo({
    //           bearing: map.getBearing() - deltaDegrees,
    //           easing: easing,
    //         });
    //       } else if (e.which === 39) {
    //         // right
    //         map.easeTo({
    //           bearing: map.getBearing() + deltaDegrees,
    //           easing: easing,
    //         });
    //       }
    //     },
    //     true
    //   );
    // });

    // Clean up on unmount
    return () => map.remove();
  });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });

  // });

  return (
    <div className="mapbox">
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} 
      </div> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
