"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/ReduxToolkit/CategoriesSlice";
import { fetchProducts } from "@/ReduxToolkit/ProductsSlice";
import ProductCard from "@/components/ProductCard";

const CATEGORIES_VIEWED_KEY = "categories-section-viewed";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <Products />
    </Suspense>
  );
}

function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const sectionRef = useRef(null);
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  // ✅ REDUX STATE (SAFE DEFAULTS)
  const {
    categories = [],
    fetched: categoriesFetched,
  } = useSelector((state) => state.categories);

  const {
    products = [],
    fetchedProducts,
  } = useSelector((state) => state.products);

  // LOCAL STATE
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [visible, setVisible] = useState(false);

  // --------------------------------------
  // ✅ FETCH DATA ONLY IF NOT FETCHED
  // --------------------------------------
  useEffect(() => {
    if (!categoriesFetched) {
      dispatch(fetchCategories());
    }
    if (!fetchedProducts) {
      dispatch(fetchProducts());
    }
  }, [dispatch, categoriesFetched, fetchedProducts]);

  // --------------------------------------
  // ✅ HANDLE CATEGORY FROM URL
  // --------------------------------------
  useEffect(() => {
    if (!categories.length) return;

    if (!urlCategory) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      return;
    }

    const matchedCategory =
      categories.find(
        (c) => c.title.toLowerCase() === urlCategory.toLowerCase()
      ) || null;

    setSelectedCategory(matchedCategory);
    setSelectedSubcategory(matchedCategory?.subcategories?.[0] || null);
  }, [urlCategory, categories]);

  // --------------------------------------
  // ✅ INTERSECTION ANIMATION
  // --------------------------------------
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
  // ✅ SAFE PRODUCT FILTERING
  // --------------------------------------
  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = !urlCategory
    ? safeProducts
    : safeProducts.filter(
        (p) => p.subcategory === selectedSubcategory
      );

  // --------------------------------------
  // ✅ UI
  // --------------------------------------
  return (
    <div
      ref={sectionRef}
      className={`bg-black text-white min-h-screen p-2 md:p-[70px] transition-all duration-1000 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
    >
      <main className="w-full px-2 md:px-6">
        {/* HEADER */}
     <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
  {/* Back Button */}
  <button
    onClick={() => router.push("/#categories")}
    className="self-start md:self-auto border-2 border-[#FCA600] rounded-lg text-[#FCA600] px-4 py-2 md:px-6 md:py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
  >
    ← Back
  </button>

  {/* Heading */}
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
    {urlCategory ? (
      <>
        {urlCategory}
        <span className="text-[#FCA600]"> Products</span>
      </>
    ) : (
      <>
        All <span className="text-[#FCA600]">Products</span>
      </>
    )}
  </h1>

  {/* Spacer only for desktop */}
  <div className="hidden md:block w-[120px]" />
</div>


        {/* SUBCATEGORIES */}
        {urlCategory && selectedCategory && (
          <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
            {selectedCategory.subcategories.map((sub) => (
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

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
