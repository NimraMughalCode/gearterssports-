"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "@/app/utils/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [showCategories, setShowCategories] = useState(false); // Products dropdown toggle
  const [isMobile, setIsMobile] = useState(false); // Track screen size
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust for Tailwind's lg breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCategoryClick = (category) => {
    setIsOpen(false); // Close mobile menu
    setShowCategories(false); // Close categories list
    router.push(`/products/${encodeURIComponent(category)}`);
  };

  return (
    <header className="bg-black shadow-md border-b-[1px] border-primary fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Gearterssports
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-secondary focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute top-full left-0 w-full lg:static lg:flex lg:items-center lg:gap-6 lg:w-auto bg-black transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <NavItem href="/" pathname={pathname} setIsOpen={setIsOpen}>
            Home
          </NavItem>
          <NavItem href="/about" pathname={pathname} setIsOpen={setIsOpen}>
            About
          </NavItem>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => !isMobile && setShowCategories(true)}
            onMouseLeave={() => !isMobile && setShowCategories(false)}
          >
            <button
              onClick={() => isMobile && setShowCategories((prev) => !prev)}
              className={`w-full text-left px-6 py-3 font-semibold border-b-2 border-transparent flex justify-between items-center lg:inline lg:w-auto ${
                pathname.startsWith("/products")
                  ? "text-primary border-primary"
                  : "text-secondary hover:text-primary hover:border-primary"
              }`}
            >
              Products
              <span>{showCategories ? "▲" : "▼"}</span>
            </button>

            {/* Category List */}
            {showCategories && (
              <div className="lg:absolute left-0 top-full bg-gray-900 shadow-lg lg:rounded-lg overflow-hidden lg:w-64">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category.title)}
                    className="block w-full text-left px-6 py-3 text-white hover:bg-red-600 transition"
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavItem href="/contact" pathname={pathname} setIsOpen={setIsOpen}>
            Contact
          </NavItem>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ href, pathname, children, setIsOpen }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={`block px-6 py-3 font-semibold transition border-b-2 border-transparent ${
        isActive
          ? "text-primary border-primary bg-gray-800 text-white"
          : "text-secondary hover:text-primary hover:border-primary"
      }`}
    >
      {children}
    </Link>
  );
}
