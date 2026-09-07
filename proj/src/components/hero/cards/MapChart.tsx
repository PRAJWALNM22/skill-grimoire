"use client";

import React, { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const geoUrl = "/countries.geo.json";

// Markers data for network hubs
const markers = [
  { markerOffset: 15, name: "New York", coordinates: [-74.006, 40.7128] },
  { markerOffset: 15, name: "London", coordinates: [-0.1278, 51.5074] },
  { markerOffset: 15, name: "Bengaluru", coordinates: [77.5946, 12.9716] },
  { markerOffset: 15, name: "Tokyo", coordinates: [139.6917, 35.6895] },
  { markerOffset: 15, name: "Sydney", coordinates: [151.2093, -33.8688] }
];

const MapChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }
  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [0, 30]
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke="#E5B869"
                strokeWidth={1.5}
                strokeOpacity={0.6}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "rgba(229, 184, 105, 0.1)", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Lines between Bengaluru and others */}
        <Line
          from={[77.5946, 12.9716]}
          to={[-74.006, 40.7128]}
          stroke="#E5B869"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="2 4"
          className="animate-pulse"
        />
        <Line
          from={[77.5946, 12.9716]}
          to={[-0.1278, 51.5074]}
          stroke="#E5B869"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="2 4"
          className="animate-pulse"
        />
        <Line
          from={[77.5946, 12.9716]}
          to={[139.6917, 35.6895]}
          stroke="#E5B869"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="2 4"
          className="animate-pulse"
        />
        <Line
          from={[77.5946, 12.9716]}
          to={[151.2093, -33.8688]}
          stroke="#E5B869"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="2 4"
          className="animate-pulse"
        />

        {/* Markers */}
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates as [number, number]}>
            <circle r={4} fill="#E5B869" />
            <circle r={8} fill="#FFF0C0" className="animate-ping" opacity={0.5} />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
