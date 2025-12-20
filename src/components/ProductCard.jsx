  import React from "react";



  const ProductCard = ({ product }) => {

    const handleCardClick = () => {
      window.location.href = `/productview/${product.id}`;
    };

    return (
      <div  onClick={handleCardClick} className="bg-black border rounded-lg cursor-pointer border-[#FCA600] text-white w-full max-w-md shadow-lg flex flex-col   overflow-hidden">
        {/* Square Image */}
        {/* <div className="bg-white w-full aspect-square overflow-hidden">
          <img
            src={product.img_src}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div> */}

<div
  className="bg-white w-full aspect-square overflow-hidden relative select-none"
  onContextMenu={(e) => e.preventDefault()}
>
  {/* Product Image */}
  <img
    src={product.img_src}
    alt={product.name}
    draggable={false}
    className="w-full h-full object-contain pointer-events-none"
  />

  {/* Watermark */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <img
      src="/logo.svg"
      alt="Gearters Watermark"
      className="w-40 opacity-[0.5]"
    />
  </div>
</div>


        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[#FCA600] text-md  uppercase font-semibold">
            {product.name}
          </h3>
          <p className="text-[12px] text-gray-300 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* WhatsApp Button */}
        <div
          onClick={() => {
            const message = `Hello, I'm interested i ${product.name} Article No: ${product.article_no} .\n\n${product.description}\n\nCheck it out here: https://gearterssports.vercel.appm/productview/${product.id}`;
            window.open(
              `https://wa.me/923279988069?text=${encodeURIComponent(message)}`,
              "_blank"
            );
          }}
          className="bg-[#FCA600] text-white text-center py-3  text-sm font-medium cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all duration-200"
        >
          INQUIRE NOW →
        </div>
      </div>
    );
  };

  export default ProductCard;
