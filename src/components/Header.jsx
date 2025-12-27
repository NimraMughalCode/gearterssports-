"use client";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (sectionId) => {
    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${scrolled ? "bg-black/70 backdrop-blur-md shadow-lg h-[90px]" : "bg-black h-[90px]"}
      text-white py-2 px-4 sm:px-6`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Gearters Logo" width={70} height={70} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium text-sm">
    <Link
    href="/"
    className={`${pathname === "/" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"}`}
  >
    Home
  </Link>
    <Link
    href="/products"
    className={`${pathname === "/products" || pathname === "/categoryproducts"  ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"}`}
  >
    Products
  </Link>

         
          <Link
    href="/about"
    className={`${pathname === "/about" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"}`}
  >
    About Us
  </Link>
      
    <Link
    href="/faq"
    className={`${pathname === "/faq" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"}`}
  >
    FAQ
  </Link>

    <Link
    href="/contact"
    className={`${pathname === "/contact" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"}`}
  >
    Contact
  </Link>

        </nav>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank">
            <Icon icon="logos:facebook" width="28" height="28" className="hover:opacity-80 transition" />
          </Link>

          <Link href="https://www.instagram.com/gearterssports4" target="_blank">
            <Icon icon="skill-icons:instagram" width="28" height="28" className="hover:opacity-80 transition" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md z-[60]"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
   {/* Mobile Menu */}
<nav
  className={`md:hidden fixed top-[70px] left-0 w-full bg-black/95 backdrop-blur-md z-40
  flex flex-col items-center space-y-6 py-8 transition-all duration-300
  ${menuOpen ? "block animate-fade-in-down" : "hidden"}`}
>

  {/* Home */}
  <Link
    href="/"
    onClick={() => setMenuOpen(false)}
    className={`${pathname === "/" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"} text-sm`}
  >
    Home
  </Link>

  {/* Products */}
  <Link
    href="/products"
    onClick={() => setMenuOpen(false)}
    className={`${pathname.startsWith("/products") ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"} text-sm`}
  >
    Products
  </Link>

  {/* About */}
  <Link
    href="/about"
    onClick={() => setMenuOpen(false)}
    className={`${pathname === "/about" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"} text-sm`}
  >
    About Us
  </Link>

  {/* FAQ */}
  <Link
    href="/faq"
    onClick={() => setMenuOpen(false)}
    className={`${pathname === "/faq" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"} text-sm`}
  >
    FAQ
  </Link>

  {/* Contact */}
  <Link
    href="/contact"
    onClick={() => setMenuOpen(false)}
    className={`${pathname === "/contact" ? "text-[#FCA600]" : "text-white hover:text-[#FCA600]"} text-sm`}
  >
    Contact
  </Link>

  {/* Social Icons */}
  <div className="flex items-center space-x-6 pt-4">
    <Link href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank">
      <Icon icon="logos:facebook" width="30" height="30" className="hover:opacity-80 transition" />
    </Link>

    <Link href="https://www.instagram.com/gearterssports4" target="_blank">
      <Icon icon="skill-icons:instagram" width="30" height="30" className="hover:opacity-80 transition" />
    </Link>
  </div>
</nav>

    </header>
  );
}
