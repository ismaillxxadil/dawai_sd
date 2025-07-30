"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-primary to-secondary text-white py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Description */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">دوائي</h2>
            <p className="text-white/90 text-sm leading-relaxed ">
              منصة دوائي توفر لك معلومات دقيقة عن الأدوية، وأسعارها، وأماكن
              تواجدها في الصيدليات والعيادات بكل سهولة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="hover:text-orange-400 transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-orange-400 transition"
                >
                  البحث
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-orange-400 transition"
                >
                  المقالات
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-400 transition">
                  الأسئلة
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-400 transition"
                >
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <p className="text-white/80 text-sm">
              البريد الإلكتروني: info@dawai.com
            </p>
            <p className="text-white/80 text-sm mt-2">
              رقم الهاتف: +249 123456789
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-4 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} دوائي. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
