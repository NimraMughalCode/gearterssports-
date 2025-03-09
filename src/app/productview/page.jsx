"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { products } from "../utils/products";

export default function ProductView() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Back Button */}
      <div className="w-full max-w-4xl">
        <button
          onClick={() => window.history.back()}
          className="mb-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
        >
          ← Back
        </button>
      </div>

      {/* Product Details */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.imgSrc}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg w-full"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-red-400 font-bold mt-2">Article No: {product.articleNo}</p>
            <p className="text-gray-400 mt-4">{product.description}</p>
          </div>

          {/* Category */}
          <div className="mt-4">
            <span className="bg-red-500 text-white text-xs px-4 py-2 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
          <button
  onClick={() => {
    const productName = product.name.trim();
    const productDescription = product.description.trim();
    const productURL = `https://yourwebsite.com/products/${product.id}`; // Update with your actual product page URL

    const message = `Hello, I'm interested in *${productName}*.\n\n${productDescription}\n\nCheck it out here: ${productURL}`;
    
    const whatsappURL = `https://wa.me/923045441722?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  }}
  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
>
  Inquiry
</button>



        
          </div>
        </div>
      </div>
    </section>
  );
}
