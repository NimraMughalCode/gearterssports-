"use client";

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Play, Star, Quote, X } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTestimonials } from "@/app/utils/adminAPI";
import Modal from "react-modal";

const TESTIMONIALS_VIEWED_KEY = "testimonials-section-viewed";

// Fallback testimonials if database is still empty or loading
const fallbackTestimonials = [
  {
    id: "f1",
    client_name: "Jake Miller",
    client_title: "Distributor & Gym Owner, USA",
    review_text:
      "Top-quality boxing gloves and gear at unbeatable wholesale prices! We've been ordering for over two years and the craftsmanship always exceeds expectations.",
    video_url: "",
    rating: 5,
  },
  {
    id: "f2",
    client_name: "Sarah Lawrence",
    client_title: "MMA Gym Owner, UK",
    review_text:
      "Their custom leather stitching and padding is top-notch. Durable, well-designed, and always delivered on time. Highly recommend to any combat sports brand.",
    video_url: "",
    rating: 5,
  },
  {
    id: "f3",
    client_name: "Carlos Rodriguez",
    client_title: "Muay Thai Coach, Spain",
    review_text:
      "Exceptional customer service, custom private labeling, and unbeatable value. We switched all our club sparring gloves and shin guards to Gearters Sports.",
    video_url: "",
    rating: 5,
  },
];

export default function ClientTestimonials() {
  const [visible, setVisible] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  // Initialize Modal accessibility
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  // Fetch testimonials from Supabase
  useEffect(() => {
    async function fetchTestimonialsData() {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.warn("Using fallback testimonials:", err);
        setTestimonials(fallbackTestimonials);
      }
    }
    fetchTestimonialsData();
  }, []);

  // Intersection Observer for scroll entrance animation
  useEffect(() => {
    if (localStorage.getItem(TESTIMONIALS_VIEWED_KEY) === "true") {
      setVisible(true);
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(TESTIMONIALS_VIEWED_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Slider responsive configuration (16:9 widescreen ratio)
  const itemsCount = testimonials.length;
  const settings = {
    dots: true,
    infinite: itemsCount > 2,
    speed: 500,
    slidesToShow: Math.min(3, Math.max(1, itemsCount)),
    slidesToScroll: 1,
    autoplay: itemsCount > 1,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, Math.max(1, itemsCount)),
          infinite: itemsCount > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: itemsCount > 1,
        },
      },
    ],
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`relative w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 dark:bg-[#0E1117] bg-[#FAF7F2] text-current font-sans overflow-hidden transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-[#FCA600]/10 text-[#FCA600] border border-[#FCA600]/30">
            Trusted by Fighters & Gyms
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold dark:text-white text-[#18181B] tracking-tight leading-tight">
            What Our <span className="text-[#FCA600]">Clients Say</span>
          </h2>
          <p className="mt-3 text-sm md:text-base dark:text-gray-400 text-gray-600">
            Discover firsthand feedback, unboxing reactions, and reviews from combat sports gyms,
            fighters, and distributors worldwide.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative px-2 sm:px-6">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((item) => {
              const hasVideo = Boolean(item.video_url);

              return (
                <div key={item.id} className="p-3">
                  <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 dark:bg-[#141822] bg-white shadow-md hover:shadow-xl transition-all duration-300 group">
                    {/* 16:9 Video Box or Video Placeholder */}
                    <div
                      className={`relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center ${
                        hasVideo ? "cursor-pointer" : ""
                      }`}
                      onClick={() => hasVideo && setActiveTestimonial(item)}
                    >
                      {hasVideo ? (
                        <>
                          <video
                            src={item.video_url}
                            loop
                            muted
                            playsInline
                            autoPlay
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Play overlay badge */}
                          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FCA600] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 md:w-6 md:h-6 fill-black ml-0.5" />
                            </div>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded">
                            16:9 Video
                          </span>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E232E] to-[#121620] text-gray-300 p-4 text-center">
                          <Quote className="w-10 h-10 text-[#FCA600]/40 mb-2" />
                          <span className="text-xs text-gray-400 font-medium">
                            Verified Client Review
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-4 h-4 ${
                                idx < (item.rating || 5)
                                  ? "fill-[#FCA600] text-[#FCA600]"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Review text */}
                        {item.review_text && (
                          <p className="text-sm dark:text-gray-300 text-gray-700 leading-relaxed mb-4 line-clamp-3">
                            &ldquo;{item.review_text}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Client Info */}
                      <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm md:text-base dark:text-white text-[#18181B]">
                            {item.client_name}
                          </h4>
                          {item.client_title && (
                            <p className="text-xs dark:text-gray-400 text-gray-500 font-medium">
                              {item.client_title}
                            </p>
                          )}
                        </div>

                        {hasVideo && (
                          <button
                            type="button"
                            onClick={() => setActiveTestimonial(item)}
                            className="text-xs text-[#FCA600] font-semibold hover:underline flex items-center gap-1"
                          >
                            Watch <Play className="w-3 h-3 fill-[#FCA600]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full dark:bg-black/80 bg-white/90 shadow-md border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-110 hover:bg-[#FCA600] hover:text-black dark:text-white text-gray-800 transition"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full dark:bg-black/80 bg-white/90 shadow-md border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-110 hover:bg-[#FCA600] hover:text-black dark:text-white text-gray-800 transition"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 16:9 Video Modal Player */}
      <Modal
        isOpen={!!activeTestimonial}
        onRequestClose={() => setActiveTestimonial(null)}
        className="relative bg-[#11141C] text-white rounded-2xl max-w-4xl w-full mx-4 p-4 md:p-6 outline-none border border-yellow-500/30 shadow-2xl"
        overlayClassName="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveTestimonial(null)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
          aria-label="Close video player"
        >
          <X className="w-5 h-5" />
        </button>

        {activeTestimonial && (
          <div>
            {/* Header / Client Info */}
            <div className="mb-4 pr-10">
              <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                {activeTestimonial.client_name}
                <span className="flex items-center gap-0.5 text-xs text-[#FCA600] font-normal">
                  <Star className="w-3.5 h-3.5 fill-[#FCA600]" />
                  {activeTestimonial.rating || 5}.0
                </span>
              </h3>
              {activeTestimonial.client_title && (
                <p className="text-xs text-gray-400">{activeTestimonial.client_title}</p>
              )}
            </div>

            {/* 16:9 Video Container */}
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
              <video
                src={activeTestimonial.video_url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Review Quote in Modal */}
            {activeTestimonial.review_text && (
              <p className="mt-4 text-xs md:text-sm text-gray-300 italic border-l-2 border-[#FCA600] pl-3 py-1">
                &ldquo;{activeTestimonial.review_text}&rdquo;
              </p>
            )}

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setActiveTestimonial(null)}
                className="border border-[#FCA600] text-[#FCA600] px-5 py-1.5 text-sm rounded-lg hover:bg-[#FCA600] hover:text-black transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
