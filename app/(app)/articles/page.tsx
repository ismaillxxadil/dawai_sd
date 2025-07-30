import Image from "next/image";
import Link from "next/link";

const diseases = [
  {
    id: "malaria",
    name: "الملاريا",
    description:
      "الملاريا دي مرض خطير بيسببو طفيل بينتقل عن طريق قرصة الناموس المصاب. ده من أكتر الأمراض اللي بتسبب وفيات في السودان، خاصة للعيال الصغار والحوامل.",
    image: "/images/malari.png", // updated image path
    transmission: [
      "قرصة الناموس المصاب (الأنوفيليس)",
      "نقل الدم من شخص مصاب",
      "من الأم للجنين وقت الولادة",
      "استعمال إبر ملوثة",
    ],
    symptoms: [
      "حمى شديدة ورعشة",
      "صداع قوي",
      "وجع في العضلات وتعب",
      "غثيان وقيء",
      "عرق كتير ورجفة",
    ],
    prevention: [
      "استعمال ناموسية معالجة بالمبيد",
      "دهان طارد الناموس بانتظام",
      "لبس ملابس بأكمام طويلة وقت المغرب والفجر",
      "أخذ دواء الملاريا لما الدكتور يوصفو",
      "إزالة المياه الراكدة حوالين البيت",
    ],
    severity: "عالي",
    prevalence: "منتشر جداً",
  },
  {
    id: "cholera",
    name: "الكوليرا",
    description:
      "الكوليرا دي عدوى في الأمعاء بتسببها بكتيريا الفيبريو كوليرا. بتيجي من أكل أو شرب مياه ملوثة. ممكن تسبب جفاف شديد وموت لو ما اتعالجت بسرعة، خاصة وقت تفشي المرض في المناطق اللي صرفها الصحي ضعيف.",
    image: "/images/col.png",
    transmission: [
      "شرب مياه ملوثة",
      "أكل طعام ملوث",
      "صرف صحي ضعيف ونظافة قليلة",
      "ملامسة قيء أو براز شخص مصاب",
    ],
    symptoms: [
      "إسهال مائي شديد",
      "قيء وغثيان",
      "جفاف سريع",
      "تقلصات في العضلات",
      "ضغط دم منخفض وضعف",
    ],
    prevention: [
      "اشرب مياه مغلية أو معبأة بس",
      "كل أكل ساخن ومطبوخ طازة",
      "تجنب السمك والمأكولات البحرية النيئة",
      "اغسل إيديك كويس بالصابون",
      "استعمل مراحيض صحية سليمة",
    ],
    severity: "عالي",
    prevalence: "منتشر",
  },
  {
    id: "typhoid",
    name: "التيفوئيد",
    description:
      "حمى التيفوئيد دي عدوى بكتيرية بتسببها السالمونيلا التيفية. بتنتشر عن طريق الأكل والمياه الملوثة وممكن تكون خطيرة لو ما اتعالجت بسرعة بالمضادات الحيوية.",
    image: "/images/tofoid.png",
    transmission: [
      "أكل ومياه ملوثة",
      "ظروف صرف صحي ضعيفة",
      "ملامسة أشخاص مصابين",
      "الدبان اللي بينقل البكتيريا من المجاري",
    ],
    symptoms: [
      "حمى عالية لفترة طويلة",
      "صداع شديد",
      "وجع في البطن",
      "طفح جلدي وردي على الصدر",
      "ضعف وتعب",
    ],
    prevention: [
      "خد التطعيم قبل السفر",
      "اشرب مياه آمنة ومغلية",
      "كل أكل مطبوخ كويس",
      "حافظ على نظافة شخصية كويسة",
      "تجنب أكل الشارع والثلج",
    ],
    severity: "متوسط",
    prevalence: "منتشر",
  },
  {
    id: "dengue",
    name: "حمى الضنك",
    description:
      "حمى الضنك دي عدوى فيروسية بينقلها ناموس الإيديس. رغم إنها في الغالب خفيفة، لكن ممكن تتطور لحمى الضنك النزفية اللي ممكن تكون مميتة.",
    image: "/images/dengue.png",
    transmission: [
      "قرصة ناموس الإيديس (بيقرص في النهار)",
      "ما بينتقل مباشرة من شخص لشخص",
      "الناموس بيتكاثر في المياه النظيفة الراكدة",
      "المناطق الحضرية وشبه الحضرية",
    ],
    symptoms: [
      "حمى عالية مفاجئة",
      "صداع شديد ووجع في العين",
      "وجع في العضلات والمفاصل",
      "طفح جلدي",
      "غثيان وقيء",
    ],
    prevention: [
      "شيل مصادر المياه الراكدة",
      "استعمل طارد الناموس في النهار",
      "البس ملابس واقية",
      "استعمل تكييف أو شبك على الشبابيك",
      "برامج مكافحة الناموس في المجتمع",
    ],
    severity: "متوسط",
    prevalence: "معتدل",
  },
];

const quickStats = [
  { label: "السكان المعرضين للخطر", value: "+45 مليون" },
  { label: "الأرواح المنقذة سنوياً", value: "+12 ألف" },
  { label: "الولايات المتأثرة", value: "18 ولاية" },
];

export default function DiseasesPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      dir="rtl"
    >
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block mb-4 bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full text-sm">
              معلومات الصحة العامة
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              الأمراض والأوبئة في السودان
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              تعرف على أكتر الأمراض انتشاراً في السودان، وكيف بتنتشر، والطرق
              العلمية المثبتة لحماية نفسك وأهلك.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                >
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            التنقل السريع
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {diseases.map((disease) => (
              <Link
                key={disease.id}
                href={`#${disease.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 bg-transparent transition-colors"
              >
                <span>←</span>
                {disease.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Sections */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-16">
          {diseases.map((disease, index) => (
            <section
              key={disease.id}
              id={disease.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              } rounded-2xl p-8 md:p-12 shadow-lg border`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={disease.image || "/placeholder.svg"}
                      alt={`رسم توضيحي لمرض ${disease.name}`}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          disease.severity === "عالي"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}
                      >
                        خطورة {disease.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3 justify-start">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {disease.name}
                      </h2>
                      <span className="inline-block px-3 py-1 border border-gray-300 rounded-full text-sm">
                        {disease.prevalence}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed text-right">
                      {disease.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Transmission */}
                    <div className="border border-orange-200 bg-orange-50 rounded-lg">
                      <div className="p-4 pb-3">
                        <h3 className="flex items-center gap-2 text-orange-800 font-semibold text-right">
                          🦠 طرق الانتقال
                        </h3>
                      </div>
                      <div className="px-4 pb-4">
                        <ul className="space-y-2">
                          {disease.transmission.map((mode, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-orange-700 text-right"
                            >
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              {mode}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="border border-red-200 bg-red-50 rounded-lg">
                      <div className="p-4 pb-3">
                        <h3 className="flex items-center gap-2 text-red-800 font-semibold text-right">
                          🌡️ الأعراض
                        </h3>
                      </div>
                      <div className="px-4 pb-4">
                        <ul className="space-y-2">
                          {disease.symptoms.map((symptom, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-red-700 text-right"
                            >
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Prevention */}
                    <div className="border border-emerald-200 bg-emerald-50 rounded-lg">
                      <div className="p-4 pb-3">
                        <h3 className="flex items-center gap-2 text-emerald-800 font-semibold text-right">
                          🛡️ الوقاية
                        </h3>
                      </div>
                      <div className="px-4 pb-4">
                        <ul className="space-y-2">
                          {disease.prevention.map((method, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-emerald-700 text-right"
                            >
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Emergency Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-3xl font-bold mb-4">حالة طوارئ طبية؟</h2>
            <p className="text-xl mb-8 text-red-100">
              لو إنت أو حد تعرفو بيعاني من أعراض شديدة، اطلب المساعدة الطبية
              فوراً.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 border border-white/20 text-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h3 className="font-semibold mb-2">خط الطوارئ</h3>
                <p className="text-2xl font-bold">999</p>
              </div>
              <div className="bg-white/10 border border-white/20 text-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h3 className="font-semibold mb-2">مكتب الصحة الاتحادية</h3>
                <p className="text-2xl font-bold">+249-91-704-7000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
