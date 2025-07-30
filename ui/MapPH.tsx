"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useCallback, useEffect } from "react";
import L from "leaflet";
import { toast } from "react-hot-toast";

// إصلاح مشكلة الأيقونات في Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPH({
  markerPosition,
  setMarkerPosition,
}: {
  markerPosition: [number, number] | null;
  setMarkerPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
}) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    30.0444, 31.2357,
  ]);
  const ZOOM_LEVEL = 15; // قيمة ثابتة للـ zoom

  const handleAddMarker = useCallback(() => {
    setMarkerPosition(mapCenter);
    toast.success("تمت إضافة ماركر في منتصف الخريطة");
  }, [mapCenter, setMarkerPosition]);

  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        toast.success("تم تحديد موقعك بنجاح");
      },
      () => {
        toast.error("تعذر الحصول على الموقع");
      }
    );
  }, []);

  return (
    <div className="h-[375px] w-[500px] relative">
      <style jsx global>{`
        .leaflet-top,
        .leaflet-bottom {
          z-index: 999 !important;
        }
      `}</style>

      <div className="absolute z-[1000] top-2 right-2 flex flex-col gap-2">
        <button
          onClick={handleAddMarker}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          إضافة Marker
        </button>
        <button
          onClick={handleLocateUser}
          className="bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          تحديد موقعي
        </button>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={ZOOM_LEVEL} // استخدام القيمة الثابتة هنا
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <TrackMapCenter onCenterChange={setMapCenter} />
        <FlyToCenter center={mapCenter} />

        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const latlng = e.target.getLatLng();
                setMarkerPosition([latlng.lat, latlng.lng]);
                toast.success(
                  `تم تحريك الماركر إلى: ${latlng.lat.toFixed(
                    4
                  )}, ${latlng.lng.toFixed(4)}`
                );
              },
            }}
          >
            <Popup>موقع الصيدلية</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

function FlyToCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  const zoom = map.getZoom(); // الحفاظ على مستوى التكبير الحالي

  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function TrackMapCenter({
  onCenterChange,
}: {
  onCenterChange: (center: [number, number]) => void;
}) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      onCenterChange([center.lat, center.lng]);
    },
  });
  return null;
}
