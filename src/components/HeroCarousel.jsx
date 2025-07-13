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
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    fade: true,
    arrows: false,
  };

  return (
    <section className="relative w-full h-screen overflow-hidden font-[var(--font-bebas-neue)]">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-20 py-30">
                <div className="flex flex-col justify-center text-center lg:w-1/2 lg:items-start lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-normal text-white leading-tight">
                    YOUR RELIABLE PARTNER IN BOXING GEAR <br />
                    <span style={{ color: "#FCA600" }}>GEARTERS SPORTS</span>
                  </h1>
                  <p className="mt-4 text-sm md:text-base font-normal text-gray-300 max-w-2xl">
                    Manufacturers of World-Class Boxing Equipment, Crafted for Strength, Comfort, and Precision — Trusted by Fighters, Trainers, and Businesses Worldwide.
                  </p>
                  <a
                    href="/contact"
                    className="mt-6 border-2 border-[#FCA600] text-[#FCA600] px-6 py-3 text-lg font-normal hover:bg-[#FCA600] transition"
                  >
                    Contact Us
                  </a>
                  {/* Bottom Stats Section */}
                  <div className="mt-12 flex flex-col md:flex-row gap-6 text-white text-center items-center">
                    {/* Block 1 */}
                    <div>
                      <p className="text-3xl font-normal text-[#FCA600]">8+</p>
                      <p className="text-sm font-normal">Years of Experience</p>
                    </div>

                    {/* Vertical Line */}
                    <div className="hidden md:block h-12 border-l-2 border-border-white"></div>

                    {/* Block 2 */}
                    <div>
                      <p className="text-3xl font-normal text-[#FCA600]">100+</p>
                      <p className="text-sm font-normal">Members Join</p>
                    </div>

                    {/* Vertical Line */}
                    <div className="hidden md:block h-12 border-l-2 border-border-white"></div>

                    {/* Block 3 */}
                    <div>
                      <p className="text-3xl font-normal text-[#FCA600]">88+</p>
                      <p className="text-sm font-normal">Happy Members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
        onClick={() => sliderRef.current.slickPrev()}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} className="text-white" />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-80 transition"
        onClick={() => sliderRef.current.slickNext()}
        aria-label="Next Slide"
      >
        <ChevronRight size={32} className="text-white" />
      </button>
    </section>
  );
}
