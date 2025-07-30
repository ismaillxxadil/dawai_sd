"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoleType, signUp } from "@/lib/supabaseFunction";
import Button from "@/components/Button";
import { useUserStore } from "@/app/store/useUserStore";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleType>("customer");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUserStore();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const { success, error, dataId } = await signUp({
      email,
      password,
      role,
      name,
    });

    setIsLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    if (success) {
      setUser({ id: dataId as string, email, name, role, img: "" });
      toast.success("تم إنشاء الحساب بنجاح");
      router.push("/home");
    }
  }

  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-100 px-4">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-7 border border-green-100"
      >
        <h2 className="text-3xl font-extrabold text-center text-primary mb-2 tracking-tight">
          إنشاء حساب جديد
        </h2>
        <p className="text-gray-500 text-center text-sm mb-4">
          يرجى إدخال بياناتك لإنشاء حساب جديد في دوائي
        </p>

        {/* Role Select */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            نوع الحساب
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as RoleType)}
            className="w-full border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
          >
            <option value="customer">مستخدم عادي</option>
            <option value="pharmacist">صيدلي</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            الاسم الكامل
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
            placeholder="أدخل اسمك الكامل"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
            placeholder="example@domain.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            كلمة المرور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-blue-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          disabled={isLoading}
          loading={isLoading}
          type="submit"
          className="w-full  text-white font-bold py-2 px-4 rounded-lg shadow-lg  "
        >
          إنشاء حساب
        </Button>

        <p className="text-sm text-center text-gray-600">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/logIn"
            className="text-blue-600 hover:underline font-medium"
          >
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </div>
  );
}
