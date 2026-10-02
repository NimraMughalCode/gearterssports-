"use client";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

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
      ${scrolled ? "dark:bg-black/80 bg-[#FAF7F2]/90 backdrop-blur-md shadow-lg h-[90px]" : "dark:bg-black bg-[#FAF7F2] h-[90px]"}
      py-2 px-4 sm:px-6`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Gearters Logo" width={70} height={70} />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium text-sm">
          <Link
            href="/"
            className={`${pathname === "/" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} transition`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`${pathname === "/products" || pathname === "/categoryproducts" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} transition`}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`${pathname === "/about" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} transition`}
          >
            About Us
          </Link>
          <Link
            href="/faq"
            className={`${pathname === "/faq" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} transition`}
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className={`${pathname === "/contact" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} transition`}
          >
            Contact
          </Link>
        </nav>

        {/* Actions (Desktop: Social Icons + Theme Toggle) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          <Link href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank">
            <Icon icon="logos:facebook" width="26" height="26" className="hover:opacity-80 transition" />
          </Link>

          <Link href="https://www.instagram.com/gearterssports4" target="_blank">
            <Icon icon="skill-icons:instagram" width="26" height="26" className="hover:opacity-80 transition" />
          </Link>
        </div>

        {/* Mobile Actions: Theme Toggle + Menu Hamburger */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md z-[60] text-current"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <nav
        className={`md:hidden fixed top-[80px] left-0 w-full dark:bg-black/95 bg-[#FAF7F2]/95 backdrop-blur-md z-40 border-b border-[#FCA600]/20
        flex flex-col items-center space-y-5 py-8 transition-all duration-300 shadow-xl
        ${menuOpen ? "block animate-fade-in-down" : "hidden"}`}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`${pathname === "/" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} text-base`}
        >
          Home
        </Link>

        <Link
          href="/products"
          onClick={() => setMenuOpen(false)}
          className={`${pathname.startsWith("/products") ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} text-base`}
        >
          Products
        </Link>

        <Link
          href="/about"
          onClick={() => setMenuOpen(false)}
          className={`${pathname === "/about" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} text-base`}
        >
          About Us
        </Link>

        <Link
          href="/faq"
          onClick={() => setMenuOpen(false)}
          className={`${pathname === "/faq" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} text-base`}
        >
          FAQ
        </Link>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className={`${pathname === "/contact" ? "text-[#FCA600] font-semibold" : "hover:text-[#FCA600]"} text-base`}
        >
          Contact
        </Link>

        {/* Social Icons */}
        <div className="flex items-center space-x-6 pt-2">
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

