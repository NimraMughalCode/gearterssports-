"use client";

import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const sliderRef = useRef(null);

  const slides = [
    {
      image: "https://i.pinimg.com/736x/27/27/42/27274264807378cc95e40491a78f297d.jpg",
      text: "We provide high-quality products for combat sports.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2rSDmg8yaI59lbLFpgmmDUfANLB2I5Uu-Q&s",
      text: "Gear up with our premium boxing equipment.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShp6gJIclFpBAI2yRHwWTQ9A0XOJn76mYtGQ&s",
      text: "Train like a champion with the best MMA gear.",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
    pauseOnHover: false,
    fade: true,
    arrows: false, // Disabling default arrows
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {slide.text}
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                  Elevate your game with our top-tier combat sports products.
                </p>
                <a
                  href="/products"
                  className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-red-700 transition"
                >
                  See Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Left Arrow */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ChevronLeft size={32} className="text-white" />
      </button>

      {/* Custom Right Arrow */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
        onClick={() => sliderRef.current.slickNext()}
      >
        <ChevronRight size={32} className="text-white" />
      </button>
    </section>
  );
}
