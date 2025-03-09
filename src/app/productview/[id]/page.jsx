"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/app/utils/products";

export default function ProductView() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-10">
      <button
        onClick={() => router.back()}
        className="mb-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
      >
        ← Back
      </button>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img src={product.imgSrc} alt={product.name} className="rounded-lg w-full" />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-red-400 font-bold mt-2">Article No: {product.articleNo}</p>
          <p className="text-gray-400 mt-4">{product.description}</p>

          <div className="mt-4">
            <span className="bg-red-500 text-white text-xs px-4 py-2 rounded-full">
              {product.category}
            </span>
          </div>

          <button
            onClick={() => {
              const message = `Hello, I'm interested in ${product.name}.\n\n${product.description}\n\nCheck it out here: https://yourwebsite.com/productview/${product.id}`;
              window.open(`https://wa.me/923045441722?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}
