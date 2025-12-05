

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
        ${scrolled ? 'bg-black/70 backdrop-blur-md shadow-lg h-[70px]' : 'bg-black h-[80px]'}
        text-white py-2 px-4 sm:px-6`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Gearters Logo" width={70} height={70} />
         
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium text-sm ">
          <Link href="/" className="text-[#FCA600] hover:text-white">Home</Link>
          <button onClick={() => handleScrollTo("products")} className="hover:text-[#FCA600]">Products</button>
          <Link href="/about" className="hover:text-[#FCA600]">About Us</Link>
          <button onClick={() => handleScrollTo("testimonials")} className="hover:text-[#FCA600]">Testimonials</button>
          <button onClick={() => handleScrollTo("faq")} className="hover:text-[#FCA600]">FAQ</button>
        </nav>

        {/* Contact (Desktop Only) */}
        <button
          onClick={() => handleScrollTo("contact")}
          className="hidden md:block bg-[#FCA600] text-black px-4 py-2 font-medium text-sm transition-all hover:bg-white hover:text-black"
        >
          Contact Us
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md z-[60]"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} className="text-white" /> : <Menu size={26} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <nav
        className={`md:hidden fixed top-[70px] left-0 w-full bg-black/95 backdrop-blur-md z-40 flex flex-col items-center space-y-6 py-8 transition-all duration-300 ${
          menuOpen ? "block animate-fade-in-down" : "hidden"
        }`}
      >
        <Link href="/" onClick={() => setMenuOpen(false)} className="text-[#FCA600] hover:text-white text-sm">
          Home
        </Link>
        <button onClick={() => { handleScrollTo("products"); setMenuOpen(false); }} className="text-white hover:text-[#FCA600] text-sm">
          Products
        </button>
        <Link href="/about" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#FCA600] text-sm">
          About Us
        </Link>
        <button onClick={() => { handleScrollTo("testimonials"); setMenuOpen(false); }} className="text-white hover:text-[#FCA600] text-sm">
          Testimonials
        </button>
        <button onClick={() => { handleScrollTo("faq"); setMenuOpen(false); }} className="text-white hover:text-[#FCA600] text-sm">
          FAQs
        </button>
        <button
          onClick={() => { handleScrollTo("contact"); setMenuOpen(false); }}
          className="bg-[#FCA600] w-[200px] h-[44px] hover:bg-white hover:text-black text-black text-sm rounded  transition-all"
        >
          Contact Us
        </button>
      </nav>
    </header>
  );
}
