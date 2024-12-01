import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const GMapComponent = () => {
  const [gpsposition, setGPSPosition] = useState({ lat: 26, lng: 78 });
  const [isSaving, setIsSaving] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "SIzaSyBLOE1l5GixE9JwP66FqWWtuVpc6E6QzgoS",
  });

  const handleMapClick = useCallback((event) => {
    setGPSPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const saveLocation = async () => {
    setIsSaving(true);
    try {
      const api_response = await axios.post("http://localhost/shikhar/googlemaptask/save-location.php", gpsposition);
      alert(api_response.message || "Location saved successfully!");
    } catch (error) {
      alert("Failed to save location. Please try again.");
    }
    setIsSaving(false);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        center={gpsposition}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onClick={handleMapClick}
      >
        <Marker position={gpsposition} />
      </GoogleMap>
      <div style={{ marginTop: "10px" }}>
        <p>
          Selected Location: Latitude: {gpsposition.lat}, Longitude: {gpsposition.lng}
        </p>
        <button onClick={saveLocation} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Location"}
        </button>
      </div>
    </div>
  );
};

export default GMapComponent;
