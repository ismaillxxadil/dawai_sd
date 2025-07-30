"use server";
import { supabase } from "@/lib/supabase";

export type QuestionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitQuestion(
  state: QuestionState,
  formData: FormData
): Promise<QuestionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const question = formData.get("question") as string;

  if (!question || !email) {
    return {
      status: "error",
      message: "يرجى إدخال البريد الإلكتروني والسؤال.",
    };
  }

  try {
    const { error } = await supabase.from("questions").insert({
      name: name || null,
      email,
      question,
    });
    if (error) {
      return {
        status: "error",
        message: "حدث خطأ أثناء إرسال السؤال. حاول مرة أخرى.",
      };
    }
    return {
      status: "success",
      message: "تم إرسال سؤالك بنجاح! سنرد عليك قريبًا.",
    };
  } catch (err) {
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "حدث خطأ غير متوقع. حاول مرة أخرى.",
    };
  }
}
