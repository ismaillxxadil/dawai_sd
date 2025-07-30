"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import NavigationItems from "./NavigationItems";
import Image from "next/image";
import Button from "./Button";
import { logOut } from "@/lib/supabaseFunction";
import { useUserStore } from "@/app/store/useUserStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { user, clearUser } = useUserStore();

  async function handleLogout() {
    const { logoutError } = await logOut();
    if (!logoutError) {
      clearUser();
    }
  }

  return (
    <nav className="fixed w-full z-50 bg-white/30 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between items-center h-16">
          {/* Mobile Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden hover:cursor-pointer p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-primary transition-colors duration-200" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700 transition-colors duration-200" />
            )}
          </button>

          {/* Logo */}
          <Link href="/home">
            <Image
              src={"/Dawai_logo.png"}
              width={63}
              height={63}
              alt={"logo"}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationItems />
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{user.name}</span>
              <Button
                variant="primary"
                size="medium"
                className="ml-1" // Add margin for spacing
                onClick={handleLogout}
              >
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <Link href="/signUp">
              <Button
                variant="primary"
                size="medium"
                className="ml-4" // Add margin for spacing
              >
                تسجيل الدخول
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 animate-slide-down">
          <NavigationItems isMobile={true} />
        </div>
      )}
    </nav>
  );
}
