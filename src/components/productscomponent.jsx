"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/app/utils/products";
import { useRouter } from "next/navigation";

export default function ProductsComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Filter products based on the selected category
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <section className="flex flex-col items-start justify-center min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Back Button */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => window.history.back()}
          className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg flex items-center"
        >
          ← Back
        </button>
        {/* Heading */}
        <h1 className="text-[65px] font-bold text-red-500">
          {category ? `${category}` : "All Products"}
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-red-500/50 transition duration-300 flex flex-col justify-between h-full"
            >
              {/* Image on top */}
              <div className="relative w-full h-56">
                <Image
                  src={product.imgSrc}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                  <p className="text-red-400 font-bold">
                    Article No: {product.articleNo}
                  </p>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </div>

                <div>
                  {/* Hide category if a category filter is applied */}
                  {!category && (
                    <div className="mt-3">
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Button at the bottom */}
                  <button
                    onClick={() => router.push(`/productview?id=${product.id}`)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-400">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
