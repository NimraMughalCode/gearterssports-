"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollTo = (sectionId) => {
    if (pathname === "/") {
      // If already on homepage, scroll smoothly
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage with hash
      router.push(`/#${sectionId}`);
    }
  };

  return (
 <header className="bg-black h-[90px] text-white py-4 px-6 shadow-md">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <Image src="/logo.svg" alt="Gearters Logo" width={50} height={50} />
      <div className="leading-none">
        <p className="text-sm font-normal tracking-wider">GEARTERS</p>  {/* Changed font-semibold → font-normal */}
        <p className="text-[10px] tracking-widest text-gray-400">SPORTS</p>
      </div>
    </div>

    {/* Navigation */}
<nav className="hidden md:flex space-x-8 font-light text-sm uppercase">
  <Link href="/" className="text-[#FCA600] hover:text-white">Home</Link>
  <button onClick={() => handleScrollTo("products")} className="hover:text-[#FCA600]">
    Products
  </button>
  <Link href="/about" className="hover:text-[#FCA600]">About Us</Link>
  <button onClick={() => handleScrollTo("testimonials")} className="hover:text-[#FCA600]">
    Testimonials
  </button>
  <button onClick={() => handleScrollTo("faq")} className="hover:text-[#FCA600]">
    FAQ
  </button>
</nav>



    {/* Contact Button */}
    <button
      onClick={() => handleScrollTo("contact")}
      className="bg-[#FCA600] w-[115px] h-[40px] hover:bg-white hover:text-black text-black md:text-white px-4 py-2   uppercase transition-all"
    >
      Contact Us
    </button>
  </div>
</header>

  );
}
