"use client";

import { useState, useEffect, useRef } from "react";
import { getCategories, getProducts } from '@/app/utils/api';
import ProductCard from "./ProductCard";

const CATEGORIES_VIEWED_KEY = 'categories-section-viewed';

export default function CategoriesWithSubcategories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const categoriesData = await getCategories();
      const productsData = await getProducts();
      setCategories(categoriesData);
      setProducts(productsData);

      setSelectedCategory(categoriesData[0]);
      setSelectedSubcategory(categoriesData[0]?.subcategories[0]);
    }

    fetchData();
  }, []);

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

  const filteredProducts = products.filter(
    (p) => p.subcategory === selectedSubcategory
  );

  return (
    <div
      id="products"
      ref={sectionRef}
      className={`flex flex-col md:flex-row bg-black  text-white min-h-screen p-2 md:p-[70px] gap-4 font-sans transition-all duration-1000 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
    >
      {/* Sidebar Categories */}
      <aside className="w-full md:w-1/5 border md:border rounded-lg border-[#FCA600]">
        <h3 className="p-4 px-6 bg-[#FCA600] font-semibold text-white py-2 text-xl cursor-pointer hover:bg-yellow-600 transition-all">
          CATEGORIES
        </h3>

        <ul className="m-4 space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.title}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSubcategory(cat.subcategories[0]);
              }}
              className={`cursor-pointer px-2 py-1 rounded  text-white font-medium text-sm transition-all flex items-center ${
                selectedCategory?.title === cat.title
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
      <main className="flex-1 px-6">

        <h1 className="text-center  mb-10 text-3xl md:text-4xl font-bold text-white leading-tight">
                    Our 
                    <span style={{ color: "#FCA600" }}> Products</span>
                  </h1>
      
        {/* Subcategories */}
        {/* <div className="flex flex-wrap gap-4 mb-8"> */}
       <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">

          {selectedCategory?.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-4 py-2 border-b-2 transition text-sm font-medium ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}