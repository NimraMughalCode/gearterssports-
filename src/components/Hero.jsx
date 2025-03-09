"use client";

import Image from "next/image";
import { categories } from "@/app/utils/constants";

export default function CategoriesSection() {
  return (
    <div className="bg-background text-center py-12">
      <h2 className="text-4xl font-bold text-white mb-10">Our Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {categories.slice(0, 9).map((category, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="w-full aspect-square relative">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover rounded-xl group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl text-white font-bold">{category.title}</h3>
              <p className="text-sm text-gray-300 mt-1">Explore top-quality gear and apparel</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
