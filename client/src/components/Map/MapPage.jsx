import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";

// Custom hook to update map view
const SetViewOnChange = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const MapPage = () => {
  const location = useLocation();
  const [mapCenter, setMapCenter] = useState([42.3149, -83.0364]); // Windsor, Ontario coordinates
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lat = parseFloat(params.get("lat"));
    const lng = parseFloat(params.get("lng"));

    if (lat && lng) {
      setMapCenter([lat, lng]);
      setZoom(13); // Adjust zoom level if necessary
    }
  }, [location.search]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewOnChange center={mapCenter} zoom={zoom} />
      <Marker position={mapCenter}>
        <Popup>
          <span>Location Marker</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapPage;
