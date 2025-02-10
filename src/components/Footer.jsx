"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Linkedin, Youtube, Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const isActive = (href) => 
    pathname === href ? "text-blue-400 font-bold" : "text-gray-300 hover:text-blue-400";

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Branding Section */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Progr<span className="text-blue-400">Umar</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Our products are designed to empower our customers, enhance their well-being, and enrich their lives.
              We ensure our products are user-friendly, secure, and reliable.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Linkedin size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Youtube size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Instagram size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className={isActive("/about")}>About</Link></li>
              <li><Link href="/contact" className={isActive("/contact")}>Contact</Link></li>
              <li><Link href="/products" className={isActive("/products")}>Products</Link></li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Information</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/terms" className={isActive("/terms")}>Terms and Conditions</Link></li>
              <li><Link href="/privacy" className={isActive("/privacy")}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-gray-800 text-gray-500 text-center py-4 relative">
        <p className="text-sm">All rights reserved © 2025</p>
        <p className="text-sm">
          Powered By <span className="font-semibold text-blue-400">ProgrUmar</span>
        </p>

        {/* Scroll to Top Button */}
        <a href="#" 
           className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-lg hover:bg-blue-700 transition duration-300">
          <ArrowUp size={20} className="text-white" />
        </a>
      </div>
    </footer>
  );
}
