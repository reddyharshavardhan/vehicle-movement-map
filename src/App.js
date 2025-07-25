import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import vehicleIconUrl from "./car.png"; // Add a small car/vehicle PNG in src/

// Custom marker icon
const vehicleIcon = new L.Icon({
  iconUrl: vehicleIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Helper to fly to position
function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom(), { duration: 1 });
  }, [position, map]);
  return null;
}

function App() {
  const [route, setRoute] = useState([]);            // Raw route array
  const [progress, setProgress] = useState(0);       // Which point we are on
  const [playing, setPlaying] = useState(false);     // Simulation running?
  const intervalRef = useRef();

  useEffect(() => {
    fetch("/dummy-route.json")
      .then(res => res.json())
      .then(data => setRoute(data));
  }, []);

  // Start/stop movement
  useEffect(() => {
    if (!playing || route.length < 2) return;
    intervalRef.current = setInterval(() => {
      setProgress(prev =>
        prev < route.length - 1 ? prev + 1 : prev
      );
    }, 1000); // or use the timestamp difference for dynamic speed
    return () => clearInterval(intervalRef.current);
  }, [playing, route]);

  if (route.length < 2) return <div>Loading route...</div>;

  const current = route[progress];
  const pathSoFar = route.slice(0, progress + 1).map(pt => [pt.latitude, pt.longitude]);
  const fullPath = route.map(pt => [pt.latitude, pt.longitude]);

  // Compute speed if timestamp present
  let speedKmh = "--";
  if (progress > 0) {
    const prev = route[progress - 1];
    const distMeters = getDistance(
      prev.latitude, prev.longitude,
      current.latitude, current.longitude
    );
    const t0 = new Date(prev.timestamp);
    const t1 = new Date(current.timestamp);
    const seconds = (t1 - t0) / 1000;
    speedKmh = ((distMeters / 1000) / (seconds / 3600)).toFixed(2); // km/h
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* Map */}
      <MapContainer
        center={[route[0].latitude, route[0].longitude]}
        zoom={15}
        style={{ height: "80vh", width: "100vw" }}
      >
        <TileLayer attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={fullPath} color="blue" weight={2} />
        <Polyline positions={pathSoFar} color="green" weight={4} />
        <Marker
          position={[current.latitude, current.longitude]}
          icon={vehicleIcon}
        />
        <FlyTo position={[current.latitude, current.longitude]} />
      </MapContainer>
      {/* Controls and Status */}
      <div style={{ padding: 12, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>
          <button onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={() => setProgress(0)} disabled={progress === 0}>Reset</button>
        </div>
        <div>
          <strong>Coordinates:</strong> {current.latitude},{current.longitude}
        </div>
        <div>
          <strong>Timestamp:</strong> {current.timestamp || "--"}
        </div>
        <div>
          <strong>Step:</strong> {progress + 1}/{route.length}
        </div>
        <div>
          <strong>Speed:</strong> {speedKmh} km/h
        </div>
      </div>
    </div>
  );
}

// Haversine formula for meters between points
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = d => d * Math.PI / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default App;