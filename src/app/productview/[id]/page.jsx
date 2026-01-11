"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/app/utils/adminAPI";

export default function ProductView() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
        setActiveImage(data.img_src);

      } catch (error) {
        console.error(error);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm tracking-wide">Loading product…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 border-2 border-[#FCA600] rounded-lg text-[#FCA600] px-6 py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
      >
        ← Back
      </button>

      {/* Card */}
      <div className="max-w-5xl mx-auto bg-[#0f0f0f] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10 shadow-lg">

    {/* Image Section */}
<div
  className="w-full md:w-1/2 select-none"
  onContextMenu={(e) => e.preventDefault()}
>
  {/* Main Image */}
<div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black border-2 border-[#FCA600]">
  <img
    src={activeImage}
    alt={product.name}
    draggable={false}
    className="w-full h-full object-cover pointer-events-none"
  />

  {/* Watermark */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <img
      src="/logo-trans.png"
      alt="Gearters Watermark"
      className="w-full opacity-[0.1]"
    />
  </div>
</div>


  {/* Thumbnails */}
  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
    {[product.img_src, ...(product.other_images || [])].map((img, i) => (
      <button
        key={i}
        onClick={() => setActiveImage(img)}
        className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition ${
          activeImage === img
            ? "border-[#FCA600]"
            : "border-transparent hover:border-gray-500"
        }`}
      >
        <img
          src={img}
          alt={`Thumbnail ${i + 1}`}
          draggable={false}
          className="h-20 w-20 object-cover pointer-events-none"
        />
      </button>
    ))}
  </div>
</div>


        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          <p className="text-[#FCA600] text-sm font-medium mt-2 tracking-wide">
            Article No: {product.article_no}
          </p>

          <p className="text-gray-400 text-sm mt-5 leading-relaxed">
            {product.description}
          </p>

          {/* CTA */}
          <button
            onClick={() => {
              const message = `Hello, I'm interested in ${product.name} (Article No: ${product.article_no}).\n\n${product.description}\n\nCheck it out here: https://gearterssports.vercel.app/productview/${product.id}`;
              window.open(
                `https://wa.me/923279988069?text=${encodeURIComponent(message)}`,
                "_blank"
              );
            }}
            className="mt-8 inline-block border-2 border-[#FCA600] text-[#FCA600] px-8 py-3 rounded-lg hover:bg-[#FCA600] hover:text-black transition font-medium w-fit"
          >
            Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}



