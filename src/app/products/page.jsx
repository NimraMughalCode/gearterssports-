"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";

import { fetchCategories } from "@/ReduxToolkit/CategoriesSlice";
import { fetchProducts } from "@/ReduxToolkit/ProductsSlice";

import ProductCard from "@/components/ProductCard";

export default function AllProductsPage() {
return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <Products />
    </Suspense>
  );
}

function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");

  // ------------------ REDUX STATE ------------------
  const {
    categories = [],
    fetched: categoriesFetched,
  } = useSelector((state) => state.categories || {});

  const {
    products = [],
    fetchedProducts,
  } = useSelector((state) => state.products || {});

  // ------------------ LOCAL STATE ------------------
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ------------------ FETCH DATA ------------------
  useEffect(() => {
    if (!categoriesFetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesFetched]);

  useEffect(() => {
    if (!fetchedProducts) {
      dispatch(fetchProducts());
    }
  }, [dispatch, fetchedProducts]);

  // ------------------ RESET SUBCATEGORY WHEN CATEGORY CHANGES ------------------
  useEffect(() => {
    setSelectedSubcategory("all");
  }, [selectedCategory, urlCategory]);

  // ------------------ AVAILABLE SUBCATEGORIES ------------------
  const availableSubcategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];

    if (urlCategory) {
      const cat = categories.find((c) => c.title === urlCategory);
      return cat?.subcategories ?? [];
    }

    if (selectedCategory === "all") {
      return categories.flatMap((c) => c.subcategories ?? []);
    }

    const matched = categories.find(
      (c) => c.title === selectedCategory
    );

    return matched?.subcategories ?? [];
  }, [categories, selectedCategory, urlCategory]);

 const hasActiveFilters =
  searchTerm.trim() !== "" ||
  selectedCategory !== "all" ||
  selectedSubcategory !== "all";



  const clearFilters = () => {
  setSearchTerm("");
  setSelectedCategory("all");
  setSelectedSubcategory("all");
};

  const filteredProducts = useMemo(() => {
  let list = Array.isArray(products) ? products : [];

  // 1️⃣ CATEGORY FILTER
  if (urlCategory) {
    const category = categories.find(
      (c) => c.title === urlCategory
    );

    if (!category) return [];

    list = list.filter((p) =>
      category.subcategories.includes(p.subcategory)
    );
  } else if (selectedCategory !== "all") {
    const category = categories.find(
      (c) => c.title === selectedCategory
    );

    if (!category) return [];

    list = list.filter((p) =>
      category.subcategories.includes(p.subcategory)
    );
  }

  // 2️⃣ SUBCATEGORY FILTER
  if (selectedSubcategory !== "all") {
    list = list.filter(
      (p) => p.subcategory === selectedSubcategory
    );
  }

  // 3️⃣ SEARCH FILTER (FINAL)
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();

    list = list.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }

  return list;
}, [
  products,
  categories,
  urlCategory,
  selectedCategory,
  selectedSubcategory,
  searchTerm,
]);


  // ------------------ UI ------------------
  return (
    <div className="bg-black text-white min-h-screen p-2 md:p-[70px] transition-all duration-1000 ease-out">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => router.push("/")}
          className="border-2 border-[#FCA600] rounded-lg text-[#FCA600] px-6 py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-center">
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

        <div className="w-[120px]" />
      </div>


      {/* 🔽 FILTERS (ONLY ON ALL PRODUCTS PAGE) */}
      {!urlCategory && (


       <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch">
  {/* 🔍 SEARCH */}
  <div className="w-full md:max-w-sm">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search products..."
      className="w-full h-[44px] bg-black border border-gray-600 text-white px-4 rounded-md
                 focus:outline-none focus:border-[#FCA600]"
    />
  </div>

  {/* CATEGORY */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="w-full md:w-[220px] h-[44px] bg-black border border-gray-600 text-white px-4 rounded-md
               focus:outline-none focus:border-[#FCA600]"
  >
    <option value="all">All Categories</option>
    {categories.map((c) => (
      <option key={c.title} value={c.title}>
        {c.title}
      </option>
    ))}
  </select>

  {/* SUBCATEGORY */}
  <select
    value={selectedSubcategory}
    onChange={(e) => setSelectedSubcategory(e.target.value)}
    className="w-full md:w-[220px] h-[44px] bg-black border border-gray-600 text-white px-4 rounded-md
               focus:outline-none focus:border-[#FCA600]"
  >
    <option value="all">All Subcategories</option>
    {availableSubcategories.map((sub) => (
      <option key={sub} value={sub}>
        {sub}
      </option>
    ))}
  </select>

  {hasActiveFilters && (
  <button
    onClick={clearFilters}
    className="h-[44px]  border-2 border-[#FCA600] rounded-lg text-[#FCA600] px-6  hover:bg-[#FCA600] hover:text-black transition font-medium"
        >
    ✖ Clear Filters
  </button>
)}
  
</div>

      )}

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
