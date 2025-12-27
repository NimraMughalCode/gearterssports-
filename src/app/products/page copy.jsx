"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import { fetchCategories } from "@/ReduxToolkit/CategoriesSlice";
import { fetchProducts } from "@/ReduxToolkit/ProductsSlice";

import ProductCard from "@/components/ProductCard";

export default function AllProductsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category"); // null on all products page

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

    // 🔹 Category page → only that category's subcategories
    if (urlCategory) {
      const cat = categories.find((c) => c.title === urlCategory);
      return cat?.subcategories ?? [];
    }

    // 🔹 All products page
    if (selectedCategory === "all") {
      return categories.flatMap((c) => c.subcategories ?? []);
    }

    const matched = categories.find(
      (c) => c.title === selectedCategory
    );

    return matched?.subcategories ?? [];
  }, [categories, selectedCategory, urlCategory]);

  // ------------------ FILTER PRODUCTS (FIXED LOGIC) ------------------
  const filteredProducts = useMemo(() => {
    let list = Array.isArray(products) ? products : [];

    // 🟢 CATEGORY PAGE (URL HAS CATEGORY)
    if (urlCategory) {
      const category = categories.find(
        (c) => c.title === urlCategory
      );

      if (!category) return [];

      // show all subcategories of that category
      if (selectedSubcategory === "all") {
        return list.filter((p) =>
          category.subcategories.includes(p.subcategory)
        );
      }

      return list.filter(
        (p) => p.subcategory === selectedSubcategory
      );
    }

    // 🟢 ALL PRODUCTS PAGE
    if (selectedCategory !== "all") {
      const category = categories.find(
        (c) => c.title === selectedCategory
      );

      if (!category) return [];

      list = list.filter((p) =>
        category.subcategories.includes(p.subcategory)
      );
    }

    if (selectedSubcategory !== "all") {
      list = list.filter(
        (p) => p.subcategory === selectedSubcategory
      );
    }

    return list;
  }, [
    products,
    categories,
    urlCategory,
    selectedCategory,
    selectedSubcategory,
  ]);

  // ------------------ UI ------------------
  return (
    <div className="bg-black text-white min-h-screen p-2 md:p-[70px] transition-all duration-1000 ease-out">
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
                {selectedCategory?.title || urlCategory}
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

      {/* 🔹 DROPDOWNS ONLY ON ALL PRODUCTS PAGE */}
      {!urlCategory && (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* CATEGORY DROPDOWN */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-black border border-gray-600 text-white px-4 py-2 rounded"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.title} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>

          {/* SUBCATEGORY DROPDOWN */}
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="bg-black border border-gray-600 text-white px-4 py-2 rounded"
          >
            <option value="all">All Subcategories</option>
            {availableSubcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 🔹 PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
