"use client";

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  "https://i.pinimg.com/736x/27/27/42/27274264807378cc95e40491a78f297d.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2rSDmg8yaI59lbLFpgmmDUfANLB2I5Uu-Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShp6gJIclFpBAI2yRHwWTQ9A0XOJn76mYtGQ&s",
  "https://thumbs.dreamstime.com/b/photo-rear-view-strong-boxer-boxing-ring-under-spotlights-depicting-determination-vertical-mobile-wallpaper-316567530.jpg",
];

const FOLLOWINSTA_VIEWED_KEY = 'followinsta-section-viewed';

export default function FollowInsta() {
  const [visible, setVisible] = useState(false);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(FOLLOWINSTA_VIEWED_KEY) === 'true') {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(FOLLOWINSTA_VIEWED_KEY, 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
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
      className={`relative flex flex-col items-center justify-center w-full max-w-full px-2 sm:px-4 py-10 md:py-20 text-white bg-[#121212] font-sans overflow-x-hidden transition-all duration-1000 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
    >
      {/* Text Content */}
      <div className="text-center max-w-3xl mb-10">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
          Follow Us On <br />
          <span style={{ color: "#FCA600" }} className="font-bold">
            Instagram
          </span>
        </h2>
        <p className="mt-4 text-sm  font-normal text-gray-300">
          Stay connected with us through our latest posts, featuring boxing gear, training highlights, events, and more from around the world.
        </p>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-6xl relative">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((image, index) => (
            <div key={index} className="px-2">
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-96 object-cover border border-[#FCA600]"
              />
            </div>
          ))}
        </Slider>

        {/* Arrows */}
        <button
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          onClick={() => sliderRef.current.slickPrev()}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <button
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          onClick={() => sliderRef.current.slickNext()}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
