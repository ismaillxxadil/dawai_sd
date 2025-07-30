"use client";
import FileRequirements from "@/components/FileRequirements";
import UploadArea from "@/components/UploadArea";
import React from "react";

const PharmacyCSVUpload = () => {
  return (
    <>
      <div
        className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6"
        style={{ fontFamily: "'Cairo', sans-serif", direction: "rtl" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 px-2 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 bg-clip-text text-transparent leading-[1.2]">
              صفحة رفع الأدوية
            </h1>
            <div className="w-16 sm:w-20 lg:w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
            <FileRequirements />
            <UploadArea />
          </div>

          <div className="text-center mt-6 sm:mt-8 px-4">
            <p className="text-gray-500 text-xs sm:text-sm">
              في حالة وجود مشاكل تقنية، يرجى التواصل مع فريق الدعم
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default PharmacyCSVUpload;
