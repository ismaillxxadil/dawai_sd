"use client";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useMapStore } from "@/app/store/useMapState";

// إعداد صورة الماركر
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to control map movements
function MapController() {
  const map = useMap();
  const { selectedPharmacy } = useMapStore();

  useEffect(() => {
    if (selectedPharmacy?.lat && selectedPharmacy?.lng) {
      map.flyTo([selectedPharmacy.lat, selectedPharmacy.lng], 16);
    }
  }, [selectedPharmacy, map]);

  return null;
}

// مكون لإضافة ماركر في المكان الذي يختاره المستخدم

// Add this new component before Map component
function InitialMapCenter() {
  const map = useMap();
  const { userLocation } = useMapStore();

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [map, userLocation]);

  return null;
}

export default function Map() {
  const { userLocation, selectedPharmacy } = useMapStore();
  const defaultPosition: [number, number] = [15.5007, 32.5599]; // Always start with Khartoum

  const blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <InitialMapCenter />
      <MapController />

      {userLocation && (
        <Marker
          position={[userLocation.lat!, userLocation.lng!]}
          icon={blueIcon}
        >
          <Popup>موقعك الحالي</Popup>
        </Marker>
      )}

      {selectedPharmacy && selectedPharmacy.lat && selectedPharmacy.lng && (
        <Marker
          position={[selectedPharmacy.lat, selectedPharmacy.lng]}
          icon={redIcon}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">{selectedPharmacy.name}</h3>
              <p>{selectedPharmacy.address}</p>
              {selectedPharmacy.work_start && selectedPharmacy.work_end && (
                <p>
                  ساعات العمل: {selectedPharmacy.work_start} -{" "}
                  {selectedPharmacy.work_end}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
