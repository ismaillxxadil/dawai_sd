"use client";
import Button from "@/components/Button";
import { RoleType } from "@/lib/supabaseFunction";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { User, useUserStore } from "../../store/useUserStore";
import Form from "next/Form";
import { action } from "./action";
import Image from "next/image";
import toast from "react-hot-toast";

type messageType = "success" | "error";
export type LoginState = {
  message: string;
  type: messageType;
  user: User | null;
};

function LoginPage() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [state, formAction, isLoading] = useActionState<LoginState, FormData>(
    action,
    { message: " ", type: "error", user: null }
  );

  useEffect(() => {
    if (state.message && state.type === "error") {
      toast.error(state.message);
    }
    if (state.type === "success") {
      setUser({
        id: state.user?.id as string,
        name: state.user?.name as string,
        email: state.user?.email as string,
        role: state.user?.role as RoleType,
        img: state.user?.img as string,
      });
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/home");
    }
  }, [state.user, router, state.type, setUser, state.message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/Dawai_logo.png"
            alt="Dawai Logo"
            width={64}
            height={64}
            className="w-16 h-16 mb-2"
          />
          <h2 className="text-3xl font-extrabold text-green-700 mb-1 tracking-tight">
            تسجيل الدخول
          </h2>
          <p className="text-gray-500 text-sm">
            أهلاً بك! الرجاء تسجيل الدخول للمتابعة.
          </p>
        </div>
        <Form action={formAction} className="space-y-7 w-full">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue="is@is.com"
              placeholder="أدخل البريد الإلكتروني"
              required
              className="bg-gray-50 border border-blue-200 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              name="password"
              defaultValue="123456"
              placeholder="أدخل كلمة المرور"
              required
              className="bg-gray-50 border border-blue-200 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            />
          </div>

          <Button
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            className="w-full 0  bg-primary cursor-pointer text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-150 ease-in-out"
          >
            تسجيل الدخول
          </Button>
          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">ليس لديك حساب؟</span>
            <a
              href="/signUp"
              className="text-blue-600 hover:underline text-sm font-medium ml-1"
            >
              أنشئ حساب جديد
            </a>
          </div>
        </Form>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
