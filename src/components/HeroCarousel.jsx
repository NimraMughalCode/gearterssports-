"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { usePathname, useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const sliderRef = useRef(null);
  
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollTo = (sectionId) => {
    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };
  const slides = [
    {
      image:"https://uwvgebfrmlofrvcywmwj.supabase.co/storage/v1/object/public/product-images/products/unsplash_sJ6az6-T1u8.png"
    },
    // {
    //   image: "https://i.pinimg.com/736x/27/27/42/27274264807378cc95e40491a78f297d.jpg",
    //   text: "We provide high-quality products for combat sports.",
    // },
    // {
    //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2rSDmg8yaI59lbLFpgmmDUfANLB2I5Uu-Q&s",
    //   text: "Gear up with our premium boxing equipment.",
    // },
    // {
    //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShp6gJIclFpBAI2yRHwWTQ9A0XOJn76mYtGQ&s",
    //   text: "Train like a champion with the best MMA gear.",
    // },
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
    <section className=" w-full bg-black overflow-hidden font-sans">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {slides.map((slide, index) => (
      <div key={index} className="relative w-full min-h-screen">
  {/* Background Image */}
  {/* <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${slide.image})` }}
  /> */}

<img
  src={slide.image}
  alt="slide"
  className="absolute inset-0 w-full h-full object-contain bg-black"
/>



  {/* Content */}
  <div className="relative z-10  bg-black  bg-opacity-10 flex flex-col justify-center px-4 md:px-10 lg:px-20 py-24 min-h-screen">
  <div className="w-full md:w-1/2 text-center md:text-left items-center md:items-start flex flex-col">

      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        YOUR RELIABLE PARTNER IN BOXING GEAR <br />
        <span style={{ color: '#FCA600' }}>GEARTERS SPORTS</span>
      </h1>
      <p className="mt-4 text-sm md:text-base font-medium text-gray-300 max-w-2xl">
        Manufacturers of World-Class Boxing Equipment...
      </p>
      <button
        onClick={() => handleScrollTo('contact')}
        className="mt-6 border-2 border-[#FCA600] rounded-lg text-[#FCA600] px-6 py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
      >
        Contact Us
      </button>

      
    </div>

    {/* Stats */}
    <div className="mt-12 flex flex-col md:flex-row gap-6 text-white text-center items-center">
      <div>
        <p className="text-3xl font-normal text-[#FCA600]">8+</p>
        <p className="text-sm font-normal">Years of Experience</p>
      </div>

      <div className="hidden md:block h-12 border-l-2 border-border-white"></div>

      <div>
        <p className="text-3xl font-normal text-[#FCA600]">100+</p>
        <p className="text-sm font-normal">Members Join</p>
      </div>

      <div className="hidden md:block h-12 border-l-2 border-border-white"></div>

      <div>
        <p className="text-3xl font-normal text-[#FCA600]">88+</p>
        <p className="text-sm font-normal">Happy Members</p>
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
