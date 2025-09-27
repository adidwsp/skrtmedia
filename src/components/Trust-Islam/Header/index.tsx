"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const usePathName = usePathname();

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-heading font-bold text-xl text-[#0F172A]">Trust <span className="text-[#0B6E99]">Islam</span></div>
          <div className="hidden md:flex space-x-8">
            <a href="#beranda" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Beranda</a>
            <a href="#tentang" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Tentang Acara</a>
            <a href="#detail" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Detail Informasi</a>
            <a href="#promo" className="font-semibold transition-colors duration-300 hover:text-[#0B6E99]">Materi Promo</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileOpen((s) => !s)} className="text-[#0F172A] focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden">
            <a href="#beranda" className="block py-2 px-4 text-sm hover:bg-gray-200">Beranda</a>
            <a href="#tentang" className="block py-2 px-4 text-sm hover:bg-gray-200">Tentang Acara</a>
            <a href="#detail" className="block py-2 px-4 text-sm hover:bg-gray-200">Detail Informasi</a>
            <a href="#promo" className="block py-2 px-4 text-sm hover:bg-gray-200">Materi Promo</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
