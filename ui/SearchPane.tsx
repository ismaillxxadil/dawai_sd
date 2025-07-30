"use client";

import Button from "@/components/Button";
import InputFeilds from "@/components/InputFeild";
import React, { useEffect, useState } from "react";
import { FaSearch, FaUpload, FaMapMarkerAlt } from "react-icons/fa";
import { getDaysAgo, getDistanceFromLatLonInKm } from "@/utility/functions";
import { Pharmacy } from "@/types/type";
import { useMapStore } from "@/app/store/useMapState";

export type Medicine = {
  id: string;
  pharmacy_id?: string | null;
  name?: string | null;
  description?: string | null;
  quantity?: number | null;
  price?: number | null;
  img?: string | null;
  created_at?: string | null; // ISO timestamp
  type?: string | null;
  pharmacy?: Pharmacy | null;
};

type SortType = "distance" | "price" | "date" | null;
export default function SearchPane() {
  const { userLocation, setUserLocation, setSelectedPharmacy } = useMapStore();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Medicine[]>([]);
  const [sortType, setSortType] = useState<SortType>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [setUserLocation]);

  const handleShowOnMap = (pharmacy: Pharmacy) => {
    if (pharmacy.lat && pharmacy.lng) {
      setSelectedPharmacy(pharmacy);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/searchMedicine?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const data = await response.json();
      // تحقق من البيانات المستلمة
      console.log("Received data:", data);
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Image uploaded:", file);
      // لاحقًا هنا تقدر ترفع الصورة أو تعالجها
    }
  };

  const getSortedResults = () => {
    if (!sortType) return results;

    return [...results].sort((a, b) => {
      switch (sortType) {
        case "distance":
          if (!userLocation || !a.pharmacy?.lat || !b.pharmacy?.lat) return 0;
          const distanceA = getDistanceFromLatLonInKm(
            userLocation.lat!,
            userLocation.lng!,
            a.pharmacy.lat,
            a.pharmacy.lng!
          );
          const distanceB = getDistanceFromLatLonInKm(
            userLocation.lat!,
            userLocation.lng!,
            b.pharmacy.lat,
            b.pharmacy.lng!
          );
          return distanceA - distanceB;

        case "price":
          if (!a.price || !b.price) return 0;
          return a.price - b.price;

        case "date":
          if (!a.created_at || !b.created_at) return 0;
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

        default:
          return 0;
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg h-full overflow-auto">
      {/* عنوان القسم */}
      <div className="text-right">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          البحث عن الأدوية
        </h2>
        <p className="text-sm text-gray-600">
          ابحث عن الدواء في الصيدليات القريبة منك
        </p>
      </div>

      {/* البحث ورفع الصورة */}
      <div className="flex gap-3 items-center">
        <label className="flex items-center justify-center cursor-pointer bg-primary text-white p-3 rounded-lg hover:bg-primary/80 transition-colors">
          <FaUpload className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <div className="flex-grow">
          <InputFeilds
            label="ابحث عن دواء"
            placeholder="اكتب اسم الدواء..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-right"
          />
        </div>
      </div>

      {/* فلاتر البحث والترتيب */}
      <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="space-y-3">
          <span className="block text-sm font-semibold text-gray-700 text-right">
            : ترتيب حسب
          </span>
          <div className="flex gap-2 flex-wrap justify-end">
            {(
              [
                { type: "distance", label: "الأقرب", icon: "📍" },
                { type: "price", label: "السعر", icon: "💰" },
                { type: "date", label: "الأحدث", icon: "🕒" },
              ] as const
            ).map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => setSortType(type as SortType)}
                className={`px-4 py-2 rounded-md border flex items-center gap-2 ${
                  sortType === type
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* زر البحث */}
      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={handleSearch}
        className="w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-lg font-medium"
      >
        <FaSearch className="w-5 h-5" /> ابحث الآن
      </Button>

      {/* نتائج البحث */}
      <div className="mt-2">
        <h3 className="text-lg font-bold mb-4 text-gray-800 text-right">
          {results.length > 0 ? `النتائج (${results.length})` : "نتائج البحث:"}
        </h3>

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <p className="text-gray-500 text-center">جاري البحث...</p>
          ) : results.length === 0 ? (
            <p className="text-gray-500 text-center">لا توجد نتائج بعد</p>
          ) : (
            getSortedResults().map((medicine) => {
              const dateInfo = medicine.created_at
                ? getDaysAgo(medicine.created_at)
                : { text: "تاريخ الإضافة غير متوفر", color: "text-gray-400" };
              const pharmacy = medicine.pharmacy;

              return (
                <div
                  key={medicine.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  {/* عنوان الكارد: اسم الدواء */}
                  <div className="bg-primary/10 p-4 border-b border-gray-200 text-center">
                    <h4 className="text-xl font-bold text-primary">
                      {medicine.name || "اسم الدواء غير متوفر"}
                    </h4>
                  </div>

                  {/* القسمين: معلومات الدواء والصيدلية */}
                  <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-200">
                    {/* قسم معلومات الدواء - على اليمين */}
                    <div className="flex-1 p-4 order-1 md:order-none">
                      <h5 className="text-lg font-bold text-primary mb-2">
                        معلومات الدواء
                      </h5>
                      {/* {medicine.img && (
                        <div className="flex items-center justify-center p-4 bg-gray-50 md:w-40">
                          <img
                            src={medicine.img}
                            alt={medicine.name || "دواء"}
                            className="w-20 h-20 object-contain rounded-md shadow-sm border border-gray-200 bg-white"
                          />
                        </div>
                      )} */}
                      <div className="flex flex-col gap-2 text-right">
                        <span className="text-sm text-gray-700">
                          {medicine.description || "لا يوجد وصف"}
                        </span>
                        <span className="text-sm text-gray-500">
                          الكمية: {medicine.quantity ?? "غير متوفر"}
                        </span>
                        <span className="text-sm text-gray-500">
                          السعر:{" "}
                          {medicine.price
                            ? `${medicine.price} ج.س`
                            : "غير متوفر"}
                        </span>
                        <span className={`text-xs font-bold ${dateInfo.color}`}>
                          {dateInfo.text}
                        </span>
                      </div>
                    </div>

                    {/* قسم معلومات الصيدلية - على اليسار */}
                    <div className="flex-1 p-4 bg-blue-50 border-t md:border-t-0 md:border-r border-gray-200 order-2 md:order-none">
                      <h5 className="text-lg font-bold text-blue-700 mb-2">
                        معلومات الصيدلية
                      </h5>
                      {pharmacy ? (
                        <div className="flex flex-col gap-2 text-right">
                          <span className="font-semibold text-blue-700">
                            {pharmacy.name}
                          </span>
                          <span className="text-sm text-gray-700">
                            العنوان: {pharmacy.address ?? "غير متوفر"}
                          </span>
                          {userLocation && pharmacy.lat && pharmacy.lng && (
                            <span className="text-sm text-gray-500">
                              المسافة:{" "}
                              {getDistanceFromLatLonInKm(
                                userLocation.lat!,
                                userLocation.lng!,
                                pharmacy.lat,
                                pharmacy.lng
                              ).toFixed(2)}{" "}
                              كم
                            </span>
                          )}
                          {pharmacy.lat && pharmacy.lng && (
                            <Button
                              onClick={() => handleShowOnMap(pharmacy)}
                              className="mt-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
                            >
                              <FaMapMarkerAlt className="w-3 h-3" /> عرض على
                              الخريطة
                            </Button>
                          )}
                          <span className="text-sm text-gray-500">
                            ساعات العمل:{" "}
                            {pharmacy.work_start && pharmacy.work_end
                              ? `${pharmacy.work_start} - ${pharmacy.work_end}`
                              : "غير متوفر"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">
                          لا توجد معلومات عن الصيدلية
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
