"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useActionState } from "react";
import { submitQuestion, QuestionState } from "./action";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";

const faqData = [
  {
    id: "item-1",
    question: "كيف يمكنني البحث عن دواء في دوائي؟",
    answer:
      "يمكنك البحث عن دواء عن طريق الانتقال ال صفحة البحث  والبحث عن طريق اسم الدواء ",
  },
  {
    id: "item-2",
    question: "كيف أجد أقرب صيدلية إلى موقعي؟",
    answer:
      "نعم يمكنك العثور على أقرب صيدلية من خلال صفحة البحث. أدخل اسم الدواء أو الصيدلية في شريط البحث، وسيتم عرض قائمة بالصيدليات القريبة التي توفر الدواء المطلوب. يمكنك أيضًا استخدام خاصية تحديد الموقع الجغرافي لتحديد موقعك الحالي وعرض الصيدليات القريبة.",
  },
  {
    id: "item-3",
    question: "هل يمكنني رفع وصفة طبية على دوائي؟",
    answer:
      "ليس اللان ، ولكننا نعمل على إضافة هذه الميزة قريبًا. حاليًا، يمكنك البحث عن الأدوية المتاحة في الصيدليات القريبة",
  },
  {
    id: "item-4",
    question: "كيف يمكنني الإبلاغ عن مشكلة في الموقع؟",
    answer:
      "إذا واجهت أي مشاكل تقنية أو لديك استفسارات، يمكنك الإبلاغ عنها عبر صفحة 'اتصل بالدعم'، أو استخدام نموذج الملاحظات أسفل أي صفحة، أو مراسلتنا مباشرة على البريد الإلكتروني support@dawai.com. نسعى للرد خلال 24 ساعة.",
  },
  {
    id: "item-5",
    question: "هل معلوماتي الشخصية آمنة في دوائي؟",
    answer:
      "بالطبع. نحن نستخدم معايير التشفير والأمان المعتمدة لحماية معلوماتك الشخصية والطبية. لا تتم مشاركة بياناتك مع أي طرف ثالث دون موافقتك، ونحن نلتزم بجميع لوائح خصوصية الرعاية الصحية.",
  },
  {
    id: "item-6",
    question: "كيف أبلغ عن مشكلة أو خطأ في بيانات الدواء أو الصيدلية؟",
    answer:
      "يمكنك استخدام نموذج التواصل في صفحة 'اتصل بنا' أو إرسال ملاحظة عبر النموذج الموجود أسفل صفحة الأسئلة.",
  },
  {
    id: "item-7",
    question: "هل بياناتي الشخصية آمنة في الموقع؟",
    answer:
      "نحن نلتزم بحماية بيانات المستخدمين ولا يتم مشاركتها مع أي جهة خارجية. جميع البيانات مشفرة وآمنة.",
  },
  {
    id: "item-8",
    question: "هل يمكنني طلب توصيل الدواء إلى المنزل؟",
    answer:
      "حاليًا لا يوفر الموقع خدمة التوصيل المباشر، لكن يمكنك التواصل مع الصيدلية لمعرفة إمكانية التوصيل حسب سياساتهم.",
  },
];

export default function FAQPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [state, formAction, isLoading] = useActionState<
    QuestionState,
    FormData
  >(submitQuestion, { status: "idle", message: "" });
  useEffect(() => {
    if (state.message && state.status === "error") {
      toast.error(state.message);
    }
    if (state.status === "success") {
      toast.success(state.message);
      setFormData({ name: "", email: "", question: "" });
    }
  }, [state.message, state.status]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* قسم العنوان */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            تعرف على كيفية استخدام موقع دوائي وإجابات على أكثر الأسئلة شيوعًا.
            إذا لم تجد سؤالك، يمكنك إرساله إلينا مباشرة.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* قسم الأسئلة */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-0">
                {faqData.map((faq, index) => (
                  <div
                    key={faq.id}
                    className={`${
                      index !== faqData.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full text-right py-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg px-2"
                    >
                      <span className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                          openItems.includes(faq.id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openItems.includes(faq.id) ? "max-h-96 pb-6" : "max-h-0"
                      }`}
                    >
                      <div className="px-2">
                        <p className="text-gray-600 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* قسم إرسال سؤال جديد */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-center p-6 pb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                لم تجد إجابتك؟
              </h2>
              <p className="text-lg text-gray-600">
                أرسل إلينا سؤالك وسنرد عليك قريبًا!
              </p>
            </div>
            <div className="p-6 pt-2">
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    الاسم (اختياري)
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="اسمك"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    البريد الإلكتروني *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium text-gray-700"
                  >
                    سؤالك *
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    placeholder="اكتب سؤالك هنا بالتفصيل..."
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-colors"
                  />
                </div>

                <Button
                  loading={isLoading}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60"
                >
                  {isLoading ? "...جاري الإرسال" : "إرسال السؤال"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
