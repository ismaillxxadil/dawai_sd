"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { action, UploadState } from "@/app/(app)/uploadMedcin/action";
import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const initialState: UploadState = {
  status: "idle",
  message: "",
  fileName: "",
  fileSize: "",
};
const UploadArea = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const [state, formAction, isPending] = useActionState<UploadState, FormData>(
    action,
    initialState
  );
  const { user } = useUserStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview({
        name: file.name,
        size: file.size,
      });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    if (fileInputRef.current && event.dataTransfer.files[0]) {
      fileInputRef.current.files = event.dataTransfer.files;
      setPreview({
        name: event.dataTransfer.files[0].name,
        size: event.dataTransfer.files[0].size,
      });
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message || "تم رفع الملف بنجاح ✅");

      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

    if (state.status === "error") {
      toast.error(state.message || "فشل في رفع الملف ❌");
    }
  }, [state]);

  return (
    <div className="xl:col-span-2 order-1 xl:order-2">
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 border border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
            رفع ملف CSV
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">
            اختر ملف CSV يحتوي على بيانات الأدوية لرفعه إلى النظام
          </p>
        </div>

        <form action={formAction}>
          <input value={user?.id} type="hidden" name="user_id" />
          <div
            className={`border-2 border-dashed rounded-lg lg:rounded-xl p-4 sm:p-6 lg:p-8 xl:p-12 text-center transition-all duration-300 cursor-pointer ${
              isDragOver
                ? "border-blue-400 bg-blue-50"
                : preview || state.status === "success"
                ? "border-green-400 bg-green-50"
                : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              required
            />

            <div className="mb-3 sm:mb-4">
              {preview || state.status === "success" ? (
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">
                  📄
                </div>
              ) : (
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">
                  📁
                </div>
              )}
            </div>

            {state.status === "success" ? (
              <div className="px-2">
                <p className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                  {state.message}
                </p>
                <p className="text-green-600 mb-2 sm:mb-4 break-all">
                  {state.fileName}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  حجم الملف: {state.fileSize}
                </p>
              </div>
            ) : preview ? (
              <div className="px-2">
                <p className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                  تم اختيار الملف بنجاح
                </p>
                <p className="text-green-600 mb-2 sm:mb-4 break-all">
                  {preview.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  حجم الملف: {(preview.size / 1024).toFixed(2)} KB
                </p>
              </div>
            ) : (
              <div className="px-2">
                <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  اسحب وأفلت ملف CSV هنا
                </p>
                <p className="text-gray-500 mb-2 sm:mb-4 text-sm sm:text-base">
                  أو انقر لاختيار ملف من جهازك
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  الحد الأقصى: 10 ميجابايت
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8">
            <button
              type="submit"
              disabled={!preview || isPending}
              className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-lg lg:rounded-xl text-white font-bold text-base sm:text-lg transition-all duration-300 transform ${
                !preview || isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
              }`}
            >
              {isPending ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent"></div>
                  <span>جاري الرفع...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <span className="text-lg sm:text-xl">📤</span>
                  <span>رفع الملف</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadArea;
