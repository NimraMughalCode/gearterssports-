"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/app/utils/products";

export default function CategoryProducts() {
  const router = useRouter();
  const params = useParams();
  const category = params.category;

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <section className="flex flex-col items-start justify-center min-h-screen bg-gray-900 text-white px-6 py-10">
      <button
        onClick={() => router.push("/products")}
        className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
      >
        ← Back
      </button>
      <h1 className="text-[65px] font-bold text-red-500">{category}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-red-500/50 transition duration-300"
              onClick={() => router.push(`/productview/${product.id}`)}
            >
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-400">{product.description}</p>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-400">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}
