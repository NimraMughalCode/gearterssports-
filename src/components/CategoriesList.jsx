"use client";

import { useState, useEffect, useRef } from "react";
import { products } from "@/app/utils/products";
import { categories } from "@/app/utils/constants";
import ProductCard from "./ProductCard";

const CATEGORIES_VIEWED_KEY = 'categories-section-viewed';

export default function CategoriesWithSubcategories() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].title);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    categories[0].subcategories[0]
  );
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(CATEGORIES_VIEWED_KEY) === 'true') {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(CATEGORIES_VIEWED_KEY, 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentCategory = categories.find(
    (cat) => cat.title === selectedCategory
  );

  const filteredProducts = products.filter(
    (p) =>
      p.category === selectedCategory &&
      p.subcategory === selectedSubcategory
  );

  return (
    <div
      id="products"
      ref={sectionRef}
      className={`flex flex-col md:flex-row bg-black text-white min-h-screen p-2 md:p-[70px]  font-sans transition-all duration-1000 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
    >
      {/* Sidebar Categories */}
      <aside className="w-full md:w-1/5 border md:border border-[#FCA600]">
        <h3 className="p-4 bg-[#FCA600] font-semibold text-white py-2 text-sm cursor-pointer hover:bg-yellow-600 transition-all">
          CATEGORIES
        </h3>

        <ul className="m-4 space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.title}
              onClick={() => {
                setSelectedCategory(cat.title);
                setSelectedSubcategory(cat.subcategories[0]);
              }}
              className={`cursor-pointer px-2 py-1 rounded uppercase text-gray-400 font-medium transition-all flex items-center ${
                selectedCategory === cat.title
                  ? "text-white  before:content-['→'] before:mr-2 before:text-[#FCA600]"
                  : "hover:text-[#FCA600] "
              }`}
            >
              {cat.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Subcategories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {currentCategory.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-4 py-2 border-b-2 transition text-[20px] font-normal ${
                selectedSubcategory === sub
                  ? "border-[#FCA600] text-[#FCA600]"
                  : "border-transparent hover:text-[#FCA600]"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
