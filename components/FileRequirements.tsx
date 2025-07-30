const FileRequirements = () => {
  return (
    <div className="xl:col-span-1 order-2 xl:order-1">
      <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-100 xl:sticky xl:top-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ml-3 sm:ml-4 flex-shrink-0 bg-blue-100">
            <span className="text-blue-600 text-lg sm:text-xl">📋</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            متطلبات الملف
          </h3>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 ml-3 sm:ml-4 flex-shrink-0 bg-blue-500"></div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              يجب أن يكون الملف بصيغة{" "}
              <span className="font-semibold text-blue-600">CSV</span>
            </p>
          </div>

          <div className="flex items-start ">
            <div className="w-2 h-2 rounded-full mt-2 ml-3 sm:ml-4 flex-shrink-0 bg-blue-500"></div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              الأعمدة المطلوبة:{" "}
              <span className="font-semibold text-blue-600 block sm:inline mt-1 sm:mt-0">
                الاسم, السعر, الكمية
              </span>
            </p>
          </div>
          <div className="flex items-start ">
            <div className="w-2 h-2 rounded-full mt-2 ml-3 sm:ml-4 flex-shrink-0 bg-blue-500"></div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              الأعمدة الاخيارية:{" "}
              <span className="font-semibold text-blue-600 block sm:inline mt-1 sm:mt-0">
                الصورة , الوصف , النوع
              </span>
            </p>
          </div>

          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 ml-3 sm:ml-4 flex-shrink-0 bg-blue-500"></div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              تنسيق البيانات بشكل صحيح (أرقام للسعر والكمية)
            </p>
          </div>

          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 ml-3 sm:ml-4 flex-shrink-0 bg-blue-500"></div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              الحد الأقصى لحجم الملف:{" "}
              <span className="font-semibold text-blue-600">10 ميجابايت</span>
            </p>
          </div>

          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 ml-3 sm:ml-4 flex-shrink-0 bg-blue-500"></div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              تأكد من عدم وجود صفوف فارغة أو بيانات مفقودة
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border">
          <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            مثال على التنسيق:
          </p>
          <div className="overflow-x-auto">
            <code className="text-xs sm:text-sm text-gray-600 block whitespace-nowrap font-mono leading-[1.4]">
              name,description,price,quantity
              <br />
              باراسيتامول,مسكن للألم,15.50,100
              <br />
              أسبرين,مضاد للالتهاب,8.25,50
            </code>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-300">
          <div className="flex items-start">
            <span className="text-yellow-500 text-base sm:text-lg ml-2 flex-shrink-0">⚠️</span>
            <p className="text-yellow-800 text-xs sm:text-sm leading-relaxed">
              <span className="font-bold">ملاحظة مهمة:</span> إذا قمت برفع ملف أدوية جديد، سيتم <span className="font-bold text-red-600">حذف جميع الأدوية السابقة</span> المرتبطة بالصيدلية وإضافة الأدوية الجديدة فقط. تأكد من أن الملف يحتوي على جميع الأدوية التي تريد عرضها في الصيدلية.
            </p>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <span className="text-blue-500 text-base sm:text-lg ml-2 flex-shrink-0">
              💡
            </span>
            <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold">نصيحة:</span> تأكد من حفظ الملف
              بترميز UTF-8 لدعم النصوص العربية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileRequirements;
