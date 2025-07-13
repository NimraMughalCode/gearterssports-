import React from "react";
// import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  // const router = useRouter();
  return (
    <div className="bg-black border border-[#FCA600] text-white w-full max-w-sm shadow-md flex flex-col">
      <img src={product.imgSrc} alt={product.name} className="w-full h-60 object-cover" />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-[#FCA600]  text-[24px] uppercase">{product.name}</h3>
          <p className="text-[18px] text-gray-300 mt-1">{product.description}</p>
        </div>
      </div>
      {/* <div onClick={
        ()=> router.push(`productview/${product.id}`)
      } className="bg-[#FCA600] text-black text-center py-2 text-[22px] cursor-pointer hover:bg-yellow-600 transition-all">
        INQUIRE NOW →
      </div> */}

         <div onClick={
        ()=> {
           const message = `Hello, I'm interested in ${product.name}.\n\n${product.description}\n\nCheck it out here: https://yourwebsite.com/productview/${product.id}`;
              window.open(`https://wa.me/923045441722?text=${encodeURIComponent(message)}`, "_blank");
        }
      } className="bg-[#FCA600] text-black text-center py-2 text-[22px] cursor-pointer hover:bg-yellow-600 transition-all">
        INQUIRE NOW →
      </div>
    </div>
  );
};

export default ProductCard;
