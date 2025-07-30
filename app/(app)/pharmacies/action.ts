"use server";

import { supabase } from "@/lib/supabase";
import { console } from "inspector";
import { redirect } from "next/navigation";

export async function action(
  prevState: { message: string; type: string },
  formData: FormData
) {
  const name = formData.get("name");
  const address = formData.get("address");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const lat = formData.get("lat");
  const lng = formData.get("lng");
  const ph_id = formData.get("ph_id");

  //const image = formData.get("image");
  if (!name || !address || !start_time || !end_time || !ph_id) {
    return { message: "يرجى تعبئة جميع الحقول", type: "error" };
  }
  console.log("id  :", ph_id);
  const { data, error: idError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", ph_id)
    .single();

  if (idError || !data) return { message: "المستخدم غير موجود", type: "error" };
  const { error } = await supabase.from("pharmacies").insert({
    ph_id: data.id,
    name: name,
    lat: lat,
    lng: lng,
    address: address,
    work_start: start_time,
    work_end: end_time,
  });
  if (error) return { message: error.message, type: "error" };
  return { message: "تم تسجيل الصيدلية بنجاح", type: "success" };
  redirect("/home");
}

//###################################### UPDATE EXITSTING PHRMICES ######################################################
export async function updatePharamcy(
  prevState: { message: string; type: string },
  formData: FormData
) {
  try {
    // تحويل القيم مع تنظيف البيانات
    const getValue = (key: string) =>
      formData.get(key)?.toString().trim() || "";
    const name = getValue("name");
    const address = getValue("address");
    const start_time = getValue("start_time");
    const end_time = getValue("end_time");
    const user_id = getValue("ph_id");

    const lat = parseFloat(getValue("lat")) || null;
    const lng = parseFloat(getValue("lng")) || null;

    // التحقق من الحقول المطلوبة
    if (!name || !address || !start_time || !end_time || !user_id) {
      return { message: "يرجى تعبئة جميع الحقول", type: "error" };
    }

    // البحث عن profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (profileError || !profile) {
      return { message: "لم يتم العثور على ملف الصيدلية", type: "error" };
    }

    // تنفيذ التحديث
    const { error } = await supabase
      .from("pharmacies")
      .update({
        name,
        address,
        work_start: start_time,
        work_end: end_time,
        lat,
        lng,
      })
      .eq("ph_id", profile.id);

    if (error) throw error;

    return { message: "تم تحديث الصيدلية بنجاح", type: "success" };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      type: "error",
    };
  }
}
