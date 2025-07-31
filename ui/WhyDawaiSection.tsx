import {
  FaSearch,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaRegFileAlt,
} from "react-icons/fa";

export default function WhyDawaiSection() {
  const steps = [
    {
      id: 1,
      icon: <FaSearch size={40} className="text-white" />,
      title: "بحث سريع عن الأدوية",
      desc: "ابحث باسم الدواء أو صور الروشتة بسهولة",
      aos: "fade-up",
    },
    {
      id: 2,
      icon: <FaMoneyBillWave size={40} className="text-white" />,
      title: "معرفة الأسعار والبدائل",
      desc: "اعرف الأسعار والبدائل الأرخص للأدوية.",
      aos: "fade-up",
    },
    {
      id: 3,
      icon: <FaMapMarkedAlt size={40} className="text-white" />,
      title: "خرائط الصيدليات والعيادات",
      desc: "اعرف أقرب صيدلية أو عيادة بسهولة",
      aos: "fade-up",
    },
    {
      id: 4,
      icon: <FaRegFileAlt size={40} className="text-white" />,
      title: "مقالات صحية موثوقة",
      desc: "احصل على معلومات صحية دقيقة وسهلة",
      aos: "fade-up",
    },
  ];

  return (
    <section className=" py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-12 text-primary">
          لماذا دوائي؟
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center w-56"
              data-aos={step.aos}
              data-aos-delay={index * 200}
            >
              {/* الصندوق الأزرق مع الرقم في الزاوية اليمنى */}
              <div className="relative group">
                {/* الرقم في الزاوية اليمنى العليا */}
                <span className="absolute z-20 -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                  {step.id}
                </span>

                {/* الصندوق الأزرق */}
                <div
                  className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-md mb-4
                  group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                >
                  {step.icon}
                </div>
              </div>

              {/* العنوان والوصف */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
