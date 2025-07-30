"use server";

import { supabase } from "@/lib/supabase";

type UploadStatus = "idle" | "success" | "error";

export type UploadState = {
  status: UploadStatus;
  message: string;
  fileName: string;
  fileSize: string;
};
export async function action(
  state: UploadState,
  formData: FormData
): Promise<UploadState> {
  const file = formData.get("file") as File | null;
  const user_id = formData.get("user_id") as string;
  if (!file) {
    return {
      status: "error",
      message: "لم يتم اختيار ملف",
      fileName: "",
      fileSize: "",
    };
  }

  // التحقق من نوع الملف
  if (!(file.type === "text/csv" || file.name.endsWith(".csv"))) {
    return {
      status: "error",
      message: "يجب أن يكون الملف من نوع CSV",
      fileName: "",
      fileSize: "",
    };
  }

  // التحقق من حجم الملف (10MB كحد أقصى)
  if (file.size > 10 * 1024 * 1024) {
    return {
      status: "error",
      message: "الحد الأقصى لحجم الملف هو 10MB",
      fileName: "",
      fileSize: "",
    };
  }

  try {
    // التحقق من وجود المستخدم
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (profileError || !profile) {
      return {
        status: "error",
        message: " المستخدم غير موجود",
        fileName: "",
        fileSize: "",
      };
    }
    //جلب الid حق الصيدلية
    const { data: pharmacy_id, error: pharmaciesError } = await supabase
      .from("pharmacies")
      .select("id")
      .eq("ph_id", profile.id)
      .single();
    if (pharmaciesError || !pharmacy_id) {
      return {
        status: "error",
        message: " المستخدم غير موجود",
        fileName: "",
        fileSize: "",
      };
    }

    // حذف جميع الأدوية المرتبطة بهذه الصيدلية قبل الإدراج الجديد
    const { error: deleteError } = await supabase
      .from("medicines")
      .delete()
      .eq("pharmacy_id", pharmacy_id.id);
    if (deleteError) {
      return {
        status: "error",
        message: "حدث خطأ أثناء حذف الأدوية القديمة",
        fileName: "",
        fileSize: "",
      };
    }

    const buffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(buffer);
    const rows: string[] = content.split("\n");
    const data = rows.map((row) => row.split(","));
    const [header, ...body] = data;

    const jsonData = body.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj: Record<string, any> = {};
      header.forEach((key, index) => {
        obj[key.trim()] = row[index]?.trim();
      });
      return obj;
    });

    const preparedData = jsonData.map((item) => ({
      name: item.name,
      type: item.type,
      pharmacy_id: pharmacy_id.id,
      quantity: item.quantity ? parseInt(item.quantity) : null,
      price: item.price ? parseFloat(item.price) : null,
      description: item.description || null,
      img: item.img || null,
    }));

    // تصفية البيانات الغير صالحة
    const filteredData = preparedData.filter(
      (item) =>
        item.name &&
        item.name.trim() !== "" &&
        item.price &&
        item.price !== null &&
        item.quantity &&
        item.quantity !== null
    );

    const { error: insertError } = await supabase
      .from("medicines")
      .insert(filteredData);
    if (insertError) {
      return {
        status: "error",
        message: "حدث خطاء في رفع الملف",
        fileName: "",
        fileSize: "",
      };
    }

    return {
      status: "success",
      message: "تم رفع الملف بنجاح",
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      status: "error",
      message: "حدث خطأ أثناء معالجة الملف",
      fileName: "",
      fileSize: "",
    };
  }
}
