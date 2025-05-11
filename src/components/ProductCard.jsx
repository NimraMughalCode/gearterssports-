import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-black border border-[#FCA600] text-white w-full max-w-sm shadow-md flex flex-col">
      <img src={product.imgSrc} alt={product.name} className="w-full h-60 object-cover" />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-[#FCA600] font-bold text-lg uppercase">{product.name}</h3>
          <p className="text-sm text-gray-300 mt-1">{product.description}</p>
        </div>
      </div>
      <div className="bg-[#FCA600] text-black text-center py-2 font-semibold text-sm cursor-pointer hover:bg-yellow-600 transition-all">
        INQUIRE NOW →
      </div>
    </div>
  );
};

export default ProductCard;
