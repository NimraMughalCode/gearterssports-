"use client";

import { useState, useEffect, useRef } from "react";
import { getCategories, getProducts } from "@/app/utils/api";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

import { Suspense } from "react";

const CATEGORIES_VIEWED_KEY = "categories-section-viewed";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <Products />
    </Suspense>
  );
}

 function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef(null);
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category"); // could be null

  // Load categories & products
  useEffect(() => {
    async function fetchData() {
      const categoriesData = await getCategories();
      const productsData = await getProducts();

      setCategories(categoriesData);
      setProducts(productsData);

      // ⚡ If NO category in URL → show ALL products
      if (!urlCategory) {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        return;
      }

      // If category exists → match it
      let matchedCategory =
        categoriesData.find(
          (c) => c.title.toLowerCase() === urlCategory.toLowerCase()
        ) || null;

      setSelectedCategory(matchedCategory);
      setSelectedSubcategory(matchedCategory?.subcategories[0] || null);
    }

    fetchData();
  }, [urlCategory]);

  // Intersection Animation
  useEffect(() => {
    if (localStorage.getItem(CATEGORIES_VIEWED_KEY) === "true") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(CATEGORIES_VIEWED_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // --------------------------------------
  // ⭐ PRODUCT FILTERING LOGIC
  // --------------------------------------
  let filteredProducts = [];

  if (!urlCategory) {
    // No category in URL → show all
    filteredProducts = products;
  } else {
    // Category exists → filter normally
    filteredProducts = products.filter(
      (p) => p.subcategory === selectedSubcategory
    );
  }

  return (
    <div
      id="products"
      ref={sectionRef}
      className={`bg-black text-white min-h-screen p-2 md:p-[70px] gap-4 font-sans transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      <main className="w-full px-2 md:px-6">
  
        

<h1 className="text-center mb-10 text-3xl md:text-4xl font-bold text-white leading-tight">
  {urlCategory ? (
    <>
      {selectedCategory?.title || urlCategory}
      <span style={{ color: "#FCA600" }}>'s Products</span>
    </>
  ) : (
    <>
      All <span style={{ color: "#FCA600" }}>Products</span>
    </>
  )}
</h1>



        {/* Show subcategories ONLY if URL has category */}
        {urlCategory && selectedCategory && (
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
            {selectedCategory?.subcategories?.map((sub) => (
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
        )}

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
