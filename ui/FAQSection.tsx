"use client";
import { useState } from "react";
import QuestionItem from "@/components/QuestionItem";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  const faqs = [
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
  ];

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section
      className=" py-16"
      data-aos="fade-up"
      data-aos-once="false"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
      data-aos-delay="200"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-primary text-center mb-10">
          الأسئلة الشائعة
        </h2>

        <div className="flex flex-col flex-wrap gap-6 justify-center">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full md:w-[48%]">
              <QuestionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
