"use client";

import { useUserStore } from "@/app/store/useUserStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationItems({ isMobile = false, className = "" }) {
  const { user } = useUserStore();
  const navigationItems = [
    { label: "الرئيسية", href: "/home" },
    { label: "البحث", href: "/search" },
    { label: "المقالات", href: "/articles" },
    { label: "الأسئلة", href: "/FAQ" },
    ...(user?.role === "pharmacist"
      ? [
          { label: "الصيدلية", href: "/pharmacies" },
          { label: "اضافة ادوية", href: "/uploadMedcin" },
        ]
      : []),
  ];
  //extract the path name
  const pathname: string = usePathname();

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {navigationItems.map((item, idx) => {
          //compare the path name with the href
          const isActive = pathname === item.href;

          return (
            <Link key={idx} href={item.href}>
              <span
                className={`
                  block px-4 py-2
                  ${
                    isActive
                      ? "bg-primary text-white font-bold"
                      : "text-gray-700 hover:text-primary"
                  }
                  transition-colors duration-200
                  ${idx === 0 ? "rounded-t-lg" : ""}
                  ${idx === navigationItems.length - 1 ? "rounded-b-lg" : ""}
                  hover:bg-gray-100
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`hidden md:flex gap-8 ${className}`}>
      {navigationItems.map((item, idx) => {
        const isActive = pathname === item.href;

        return (
          <Link key={idx} href={item.href}>
            <span
              className={`
               ${
                 isActive
                   ? "text-primary font-bold border-b-2 border-primary pb-1"
                   : "text-gray-700 hover:text-primary"
               }
                transition-colors duration-200 cursor-pointer
              `}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
