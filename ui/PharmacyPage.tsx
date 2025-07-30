"use client";
import { action, updatePharamcy } from "@/app/(app)/pharmacies/action";
import { useUserStore } from "@/app/store/useUserStore";
import Button from "@/components/Button";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const MapPH = dynamic(() => import("./MapPH"), {
  ssr: false,
});
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";

type Pharmacy = {
  id: string;
  ph_id: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  work_start: string;
  work_end: string;
  image?: string;
};

export default function PharmacyPage() {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch pharmacy data
  useEffect(() => {
    const fetchPharmacy = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (profileError || !profile) {
          throw new Error(profileError?.message || "Profile not found");
        }

        // Get pharmacy data
        const { data: pharmacyData, error: pharmacyError } = await supabase
          .from("pharmacies")
          .select("*")
          .eq("ph_id", profile.id)
          .single();

        if (pharmacyError) {
          throw pharmacyError;
        }

        // Update state
        setPharmacy(pharmacyData || null);
        setMarkerPosition(
          pharmacyData?.lat && pharmacyData?.lng
            ? [pharmacyData.lat, pharmacyData.lng]
            : null
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [user?.id, pathname]);

  // Handle form state and actions
  const [state, formAction, isLoading] = useActionState(
    pharmacy ? updatePharamcy : action,
    { message: "", type: "" }
  );

  // Show toast messages
  useEffect(() => {
    if (state.type === "error") {
      toast.error(state.message);
    } else {
      toast.success(state.message);
    }
  }, [state]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPharmacy((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  // Handle location changes
  const handleLocationChange = (position: [number, number] | null) => {
    setMarkerPosition(position);
    if (position) {
      setPharmacy((prev) => ({
        ...prev!,
        lat: position[0],
        lng: position[1],
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4" action={formAction}>
          <input type="hidden" name="ph_id" value={user?.id || ""} />

          {/* Pharmacy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم الصيدلية
            </label>
            <input
              name="name"
              type="text"
              value={pharmacy?.name || ""}
              onChange={handleInputChange}
              placeholder="أدخل اسم الصيدلية"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العنوان
            </label>
            <input
              name="address"
              type="text"
              value={pharmacy?.address || ""}
              onChange={handleInputChange}
              placeholder="أدخل العنوان الكامل"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Working Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وقت البدء
              </label>
              <input
                name="end_time"
                type="time"
                value={pharmacy?.work_start || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وقت الانتهاء
              </label>
              <input
                name="start_time"
                type="time"
                value={pharmacy?.work_end || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
          </div>

          {/* Pharmacy Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              صورة الصيدلية
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* Location Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                خط العرض
              </label>
              <input
                name="lat"
                type="number"
                value={markerPosition?.[0] ?? ""}
                onChange={(e) => {
                  const lat = parseFloat(e.target.value) || 0;
                  handleLocationChange([lat, markerPosition?.[1] ?? 0]);
                }}
                step="0.00001"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                خط الطول
              </label>
              <input
                name="lng"
                type="number"
                value={markerPosition?.[1] ?? ""}
                onChange={(e) => {
                  const lng = parseFloat(e.target.value) || 0;
                  handleLocationChange([markerPosition?.[0] ?? 0, lng]);
                }}
                step="0.00001"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || isLoading}
            loading={loading || isLoading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
          >
            {pharmacy?.id ? "تحديث البيانات" : "حفظ البيانات"}
          </Button>
        </form>
      </div>

      {/* Map Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اختر موقع الصيدلية
        </label>
        <p className="mt-2 text-sm text-gray-500">
          انقر على الخريطة لتحديد خط العرض وخط الطول.
        </p>

        <div className="mt-4">
          <MapPH
            setMarkerPosition={handleLocationChange}
            markerPosition={markerPosition}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
