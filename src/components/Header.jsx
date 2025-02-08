"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          ProgrUmar
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-900 focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute top-full left-0 w-fit bg-white lg:static lg:flex lg:items-center lg:gap-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <NavItem href="/" pathname={pathname}>
            Home
          </NavItem>
          <NavItem href="/about" pathname={pathname}>
            About
          </NavItem>
          <NavItem href="/products" pathname={pathname}>
            Products
          </NavItem>
          <NavItem href="/contact" pathname={pathname}>
            Contact
          </NavItem>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ href, pathname, children }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`block px-6 py-2 font-semibold transition ${
        isActive ? "text-blue-600" : "text-gray-900 hover:text-blue-500"
      }`}
    >
      {children}
    </Link>
  );
}
