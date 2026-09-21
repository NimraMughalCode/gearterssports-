  import React from "react";



  const ProductCard = ({ product }) => {

    const handleCardClick = () => {
      window.location.href = `/productview/${product.id}`;
    };

  return (
    <div
      onClick={handleCardClick}
      className="dark:bg-[#111] bg-white border rounded-xl cursor-pointer border-[#FCA600]/40 hover:border-[#FCA600] text-current w-full max-w-full shadow-md hover:shadow-[0_8px_25px_rgba(198,125,0,0.18)] dark:hover:shadow-[#FCA600]/20 flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]"
    >
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
            src="/logo-trans.png"
            alt="Gearters Watermark"
            className="w-full opacity-[0.1]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-[#FCA600] text-sm md:text-base uppercase font-bold tracking-wide">
          {product.name}
        </h3>
        <p className="text-[12px] dark:text-gray-300 text-stone-600 leading-relaxed mt-1 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* WhatsApp Button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          const message = `Hello, I'm interested in ${product.name} Article No: ${product.article_no}.\n\n${product.description}\n\nCheck it out here: https://gearterssports.com/productview/${product.id}`;
          window.open(
            `https://wa.me/923279988069?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        }}
        className="bg-[#FCA600] text-black font-bold text-center py-2.5 text-xs md:text-sm tracking-wider cursor-pointer hover:bg-yellow-500 transition-all duration-200"
      >
        INQUIRE NOW →
      </div>
    </div>
  );
  };

  export default ProductCard;
