"use client";

import { useRouter } from "next/navigation";
import { categories } from "@/app/utils/constants";

export default function CategoriesSection() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/products/${encodeURIComponent(category)}`);
  };

  return (
    <div className="bg-black text-center py-12">
    <h2 className="text-4xl font-bold text-white mb-10">Categories</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {categories.slice(0, 9).map((category, index) => (
        <div
          key={index}
          className="relative group rounded-3xl overflow-hidden bg-gray-900 shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => handleCategoryClick(category.title)}
        >
          {/* Image Container */}
          <div className="w-full aspect-square relative">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <div className="absolute bottom-4 left-0 right-0 bg-black bg-opacity-60 text-white text-xl font-semibold text-center py-2">
            {category.title}
          </div>

          {/* Hover Effect - Click Here Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-red-600 text-white px-4 py-2 font-medium text-lg shadow-md hover:bg-red-700 transition">
              Click Here
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
