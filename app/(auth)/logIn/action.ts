"use server";
import { signIn } from "@/lib/supabaseFunction";
import { User } from "../../store/useUserStore";
import { LoginState } from "./page";

export const action = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await signIn({ email, password });

  if (res.error) {
    return { message: res.error, type: "error", user: null };
  }

  const user = res.data as User | null;

  if (!user) {
    return { message: "User not found", type: "error", user: null };
  }

  return {
    message: "لقد تم تسجيل الدخول بنجاح",
    type: "success",
    user: user as User | null,
  };
};
