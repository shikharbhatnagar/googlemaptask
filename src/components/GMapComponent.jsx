import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const GMapComponent = () => {
  const [gpsposition, setGPSPosition] = useState({ lat: 37.7749, lng: -122.4194, });
  const [isSaving, setIsSaving] = useState(false);

  const { isMapLoaded } = useJsApiLoader({
    googleMapsApiKey: "SIzaSyDnLQWEOYj5zprJxQaNaEc-wLfCdQf2KZUS",
  });
  
  const handleGMapClick = useCallback((event) => {
    setGPSPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const saveGPSLocation = async () => {
    setIsSaving(true);
    try {
      const api_response = await axios.post("http://localhost/shikhar/googlemaptask/save-location.php", gpsposition);
      alert(api_response.message);
    } catch (error) {
      alert(error.error);
    }
    setIsSaving(false);
  };

  if (!isMapLoaded) return <div>Loadings...</div>;

  return (
    <div>
      <GoogleMap
        center={gpsposition}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onClick={handleGMapClick}
      >
        <Marker position={gpsposition} />
      </GoogleMap>
      <div style={{ marginTop: "10px" }}>
        <p>
          You Selected (Lat,Log): {gpsposition.lat}, {gpsposition.lng}
        </p>
        <button onClick={saveGPSLocation} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save GPS Location"}
        </button>
      </div>
    </div>
  );
};

export default GMapComponent;