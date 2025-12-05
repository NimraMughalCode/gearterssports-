import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-black border border-[#FCA600] text-white w-full max-w-md shadow-lg flex flex-col  rounded-lg overflow-hidden">
      {/* Square Image */}
      <div className="bg-white w-full aspect-square overflow-hidden">
        <img
          src={product.img_src}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[#FCA600] text-md  uppercase font-semibold">
          {product.name}
        </h3>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* WhatsApp Button */}
      <div
        onClick={() => {
          const message = `Hello, I'm interested in ${product.name}.\n\n${product.description}\n\nCheck it out here: https://gearterssports.vercel.appm/productview/${product.id}`;
          window.open(
            `https://wa.me/923045441722?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        }}
        className="bg-[#FCA600] text-black text-center py-3  text-sm font-medium cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all duration-200"
      >
        INQUIRE NOW →
      </div>
    </div>
  );
};

export default ProductCard;
