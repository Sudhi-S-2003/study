import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Sample JSON data for paths
const pathData = [
  { "code": "path", "list": [{ "code": "lat_lng", "value": "8.5241,76.9366" }, { "code": "sequence", "value": "first" }] },
  { "code": "path", "list": [{ "code": "lat_lng", "value": "8.6982,76.8137" }, { "code": "sequence", "value": "last" }] },
];

// Function to extract coordinates
const extractCoordinates = (data) => 
  data.map(({ list }) => {
    const [lat, lng] = list.find(entry => entry.code === "lat_lng").value.split(',').map(Number);
    return L.latLng(lat, lng);
  });

const Routing = ({ coordinates }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!coordinates.length) return;

    if (!routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: coordinates,
        routeWhileDragging: true,
        createMarker: () => null,
      }).addTo(map);
    } else {
      routingControlRef.current.setWaypoints(coordinates);
    }

    map.fitBounds(L.latLngBounds(coordinates));

    return () => routingControlRef.current && routingControlRef.current.remove();
  }, [map, coordinates]);

  return null;
};

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const coords = extractCoordinates(pathData);
      setCoordinates(coords);
    } catch {
      setError("Failed to load coordinates.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading && <p>Loading map...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer center={[8.5241, 76.9366]} zoom={12} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Routing coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
