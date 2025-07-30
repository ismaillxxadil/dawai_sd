"use client";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* النصوص على اليمين */}
        <div className="md:w-1/2 text-right space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            دوائي - صحتك تهمنا
          </h1>
          <p className="text-gray-700 text-xl leading-relaxed">
            موقع متخصص يساعدك في البحث عن الأدوية، الصيدليات، العيادات وأكثر
            <br />
            بسهولة وسرعة ودقة متناهية
          </p>
          <div className="pt-4">
            <Link href="/search">
              <Button
                variant="primary"
                size="large"
                className="text-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              >
                ابحث الآن
              </Button>{" "}
            </Link>
          </div>
        </div>

        {/* الصورة على الشمال */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/photo.jpeg"
            width={600}
            height={600}
            alt="صورة تعبيرية عن الصحة والطب"
            className="rounded-2xl shadow-xl object-cover border-4 border-white"
            priority
          />
        </div>
      </div>
    </section>
  );
}
