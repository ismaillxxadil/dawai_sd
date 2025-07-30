import { Pharmacy } from "@/types/type";
import { create } from "zustand";

interface MapState {
  userLocation: {
    lat: number | null;
    lng: number | null;
  } | null;
  selectedPharmacy: Pharmacy | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setSelectedPharmacy: (pharmacy: Pharmacy | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  userLocation: null,
  selectedPharmacy: null,
  setUserLocation: (location) => set({ userLocation: location }),
  setSelectedPharmacy: (pharmacy) => set({ selectedPharmacy: pharmacy }),
}));
