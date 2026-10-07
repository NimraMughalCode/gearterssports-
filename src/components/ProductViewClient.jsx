"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function ProductViewClient({ product }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(product.img_src);

  const productUrl = `https://www.gearterssports.com/products/${product.slug || product.id}`;

  return (
    <div className="min-h-screen dark:bg-black bg-transparent text-current px-4 md:px-10 py-8 transition-colors duration-300">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto mb-6 flex items-center gap-2 text-xs md:text-sm text-gray-400">
        <Link href="/" className="hover:text-[#FCA600] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#FCA600] transition">
          Products
        </Link>
        {product.subcategory && (
          <>
            <span>/</span>
            <span className="capitalize">{product.subcategory}</span>
          </>
        )}
        <span>/</span>
        <span className="text-[#FCA600] font-medium truncate max-w-[200px] md:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Card */}
      <div className="max-w-5xl mx-auto dark:bg-[#0f0f0f] bg-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10 shadow-lg border border-[#FCA600]/20">

        {/* Image Section */}
        <div
          className="w-full md:w-1/2 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Main Image */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden dark:bg-black bg-white border-2 border-[#FCA600] shadow-md">
            <img
              src={activeImage}
              alt={`${product.name} - Art No. ${product.article_no} by Gearters Sports`}
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img
                src="/logo-trans.png"
                alt=""
                aria-hidden="true"
                className="w-full opacity-[0.1]"
              />
            </div>
          </div>

          {/* Thumbnails */}
          {product.other_images && product.other_images.length > 0 && (
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
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${i + 1}`}
                    draggable={false}
                    className="h-20 w-20 object-cover pointer-events-none"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-[#FCA600] text-sm font-semibold tracking-wider bg-[#FCA600]/10 border border-[#FCA600]/30 px-3 py-1 rounded-full">
              Art No: {product.article_no}
            </span>
            {product.subcategory && (
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                {product.subcategory}
              </span>
            )}
          </div>

          <div className="text-gray-300 dark:text-gray-300 text-sm mt-5 leading-relaxed space-y-3">
            <p>{product.description}</p>
          </div>

          {/* B2B Manufacturing Highlights */}
          <div className="mt-6 pt-5 border-t border-gray-800 text-xs text-gray-400 space-y-1.5">
            <p className="flex items-center gap-2">
              <span className="text-[#FCA600]">✔</span> OEM & Custom Private Labeling Available
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#FCA600]">✔</span> Worldwide Bulk Export & Custom Sizing
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#FCA600]">✔</span> High-grade materials & professional combat durability
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              const message = `Hello, I'm interested in ${product.name} (Article No: ${product.article_no}).\n\n${product.description}\n\nCheck it out here: ${productUrl}`;
              window.open(
                `https://wa.me/923279988069?text=${encodeURIComponent(message)}`,
                "_blank"
              );
            }}
            className="mt-8 inline-block border-2 border-[#FCA600] bg-[#FCA600] text-black font-semibold px-8 py-3 rounded-lg hover:bg-transparent hover:text-[#FCA600] transition-all duration-200 w-fit shadow-md cursor-pointer"
          >
            Inquire on WhatsApp →
          </button>
        </div>
      </div>
    </div>
  );
}
