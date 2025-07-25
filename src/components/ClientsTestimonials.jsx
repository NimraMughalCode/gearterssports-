"use client";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "Top-quality boxing gloves at unbeatable prices! We've been ordering for over two years and the products always exceed expectations. Our customers love them!",
    name: "Jake M.",
    title: "Boxing Gear Distributor, USA",
  },
  {
    text: "Their gear is top-notch. Durable, well-designed, and always delivered on time. Highly recommend to any combat sports business.",
    name: "Sarah L.",
    title: "MMA Gym Owner, UK",
  },
  {
    text: "Exceptional customer service and great value. We've switched completely to them for our gym equipment.",
    name: "Carlos R.",
    title: "Muay Thai Coach, Spain",
  },
];

const TESTIMONIALS_VIEWED_KEY = 'testimonials-section-viewed';

export default function ClientTestimonials() {
  const [visible, setVisible] = useState(false);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(TESTIMONIALS_VIEWED_KEY) === 'true') {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(TESTIMONIALS_VIEWED_KEY, 'true');
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
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`relative bg-[#121212] py-20 px-4 text-white text-center overflow-hidden font-sans transition-all duration-1000 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
    >
      <h2 className="text-3xl md:text-5xl font-[200]">
        WHAT OUR <span className="text-[#FCA600] font-bold">CLIENTS SAY</span>
      </h2>

      <div className="mt-12 max-w-4xl mx-auto relative">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((item, idx) => (
            <div key={idx} className="px-6">
              <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed mb-6">
                {item.text}
              </p>

              <div
                className="flex justify-center mb-4"
                aria-label="5 star rating"
              >
                <div className="flex gap-1 text-[#FCA600] text-xl leading-none select-none">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <span key={starIdx} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <h4 className="text-xl font-[200]">{item.name}</h4>
              <p className="text-sm font-[200] text-gray-400">{item.title}</p>
            </div>
          ))}
        </Slider>

        {/* Custom arrows */}
        <button
          aria-label="Previous testimonial"
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-80 transition"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <button
          aria-label="Next testimonial"
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-80 transition"
          onClick={() => sliderRef.current.slickNext()}
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </section>
  );
}
