"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/app/utils/api";

export default function ProductView() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading product…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 text-white   p-6">
 
      
                                    <button
                     onClick={() => router.back()}
                    className="mt-6 border-2 border-[#FCA600]  rounded-lg text-black px-6 py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
                  >
← Back
                  </button>

      <div className="bg-gray-800 p-6 rounded-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* <div className="w-full md:w-1/2">
          <img src={product.img_src} alt={product.name} className="rounded-lg" />
        </div> */}

        <div
  className="w-full md:w-1/2 relative select-none"
  onContextMenu={(e) => e.preventDefault()}
>
  {/* Product Image */}
  <img
    src={product.img_src}
    alt={product.name}
    draggable={false}
    className="rounded-lg w-full pointer-events-none"
  />

  {/* Watermark Overlay */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <img
      src="/logo.svg"
      alt="Gearters Watermark"
      className="w-full opacity-[0.5]"
    />
  </div>
</div>


        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-[#FCA600] text-sm font-medium mt-2">
            Article No: {product.article_no}
          </p>
          <p className="text-gray-400 text-sm mt-4">{product.description}</p>



         
                   <button
  onClick={() => {
    const message = `Hello, I'm interested in ${product.name} (Article No: ${product.article_no}).\n\n${product.description}\n\nCheck it out here: https://gearterssports.vercel.app/productview/${product.id}`;
    window.open(
      `https://wa.me/923279988069?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }}
  className="mt-6 border-2 border-[#FCA600] text-[#FCA600] px-6 py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
>
  Inquiry
</button>

        </div>
      </div>
    </div>
  );
}
