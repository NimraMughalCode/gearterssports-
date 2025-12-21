"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

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
    <footer className="bg-black text-white py-[72px] px-6 font-sans font-medium">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="GEARTERS Logo"
            width={193}
            height={193}
          />
        </div>

        {/* Navigation */}
        <ul className="flex font-extralight flex-wrap justify-center gap-6 text-sm font-medium">
          <li>
            <a href="/" className="hover:text-[#FCA600]  transition-colors">
              Home
            </a>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("products")}
              className="hover:text-[#FCA600] transition-colors"
            >
              Products
            </button>
          </li>
          <li>
            <a href="/about" className="hover:text-[#FCA600] transition-colors">
              About Us
            </a>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("contact")}
              className="hover:text-[#FCA600] transition-colors"
            >
              Contact Us
            </button>
          </li>
        </ul>

        {/* ⭐ Social Icons */}
        <div className="flex items-center space-x-6 pt-2">
          <Link
            href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr"
            target="_blank"
          >
            <Icon
              icon="logos:facebook"
              width="30"
              height="30"
              className="hover:opacity-80 transition"
            />
          </Link>

          <Link
            href="https://www.instagram.com/gearterssports4"
            target="_blank"
          >
            <Icon
              icon="skill-icons:instagram"
              width="30"
              height="30"
              className="hover:opacity-80 transition"
            />
          </Link>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 w-full mt-6 pt-3 text-center text-xs text-gray-500">
          <div className="mb-1">
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>{" "}
            |{" "}
            <a href="/terms" className="hover:underline">
              Terms and Conditions
            </a>
          </div>
          <p className="font-light">
            &copy; 2025 All rights reserved. Gearters Sports
          </p>
        </div>
      </div>
    </footer>
  );
}
