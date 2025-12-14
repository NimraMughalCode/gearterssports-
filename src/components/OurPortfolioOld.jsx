"use client";

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProducts } from "@/app/utils/api";
import { useRouter } from "next/navigation";

const PORTFOLIO_VIEWED_KEY = "portfolio-section-viewed";

export default function PortfolioSection() {
  const [visible, setVisible] = useState(false);
  const [portfolioProducts, setPortfolioProducts] = useState([]);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const router = useRouter();

  // ----------------------------
  // ⭐ Fetch 10 Random Products
  // ----------------------------
  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();

      // Shuffle & take 10
      const random10 = allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      setPortfolioProducts(random10);
    }

    loadProducts();
  }, []);

  // ----------------------------
  // ⭐ Intersection Animation
  // ----------------------------
  useEffect(() => {
    if (localStorage.getItem(PORTFOLIO_VIEWED_KEY) === "true") {
      setVisible(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(PORTFOLIO_VIEWED_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
    arrows: false,
  };

  return (
    <div
      ref={sectionRef}
      className={`relative flex flex-col items-center justify-center w-full max-w-full px-2 md:px-[70px] py-10 md:py-20 text-white bg-[#121212] font-sans overflow-x-hidden transition-all duration-1000 ease-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Our <span style={{ color: "#FCA600" }}>Portfolio</span>
        </h1>
        <p className="mt-4 text-sm font-normal text-gray-300">
          Explore a glimpse of our finest work, showcasing top-quality products delivered to our clients.
        </p>
      </div>

      {/* Slider */}
     {/* Slider */}
{/* Slider */}
<div className="w-full max-w-6xl relative">
  <Slider ref={sliderRef} {...settings}>

    {/* Product Slides */}
    {portfolioProducts.map((product, index) => (
      <div key={index} className="px-2">
        <img
          src={product.img_src}
          alt={product.title}
          className="w-full h-96 object-cover border rounded-lg border-[#FCA600]"
        />
      </div>
    ))}

    {/* ⭐ Show All Slide */}
    <div className="px-2 flex items-center justify-center h-96">
      <button
        onClick={() => router.push("/products")}
        className="w-full h-full flex items-center justify-center border border-[#FCA600] rounded-lg text-xl font-semibold text-black bg-[#FCA600] hover:opacity-90 transition"
      >
        Show All Products
      </button>
    </div>
  </Slider>

  {/* Arrows */}
  <button
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
    onClick={() => sliderRef.current.slickPrev()}
  >
    <ChevronLeft size={24} className="text-white" />
  </button>

  <button
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
    onClick={() => sliderRef.current.slickNext()}
  >
    <ChevronRight size={24} className="text-white" />
  </button>
</div>


    </div>
  );
}
