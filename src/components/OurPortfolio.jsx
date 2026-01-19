"use client";

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPortfolio } from "@/app/utils/adminAPI";
import { useRouter } from "next/navigation";
import Modal from "react-modal";


const PORTFOLIO_VIEWED_KEY = "portfolio-section-viewed";

export default function PortfolioSection() {
  const [visible, setVisible] = useState(false);
  const [portfolioVideos, setPortfolioVideos] = useState([]);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);


  const router = useRouter();

  // ----------------------------
  // ⭐ Fetch 10 Random Products
  // ----------------------------
 useEffect(() => {
  async function loadPortfolio() {
    const allVideos = await getPortfolio();

    setPortfolioVideos(allVideos);
  }

  loadPortfolio();
}, []);

useEffect(() => {
  Modal.setAppElement("body");
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
    afterChange: (index) => setCurrentSlide(index),
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


<div className="flex flex-col mb-10">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  
  
    {/* Spacer only for desktop */}
    <div className="hidden md:block w-[120px]" />
    {/* Heading */}
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        <>
          Our <span className="text-[#FCA600]">Portfolio</span>
        </>
  
    </h1>
  
  
      <a
      href="https://www.instagram.com/gearterssports4"
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 border-[#FCA600]  w-fit self-center rounded-lg text-[#FCA600] px-6 py-3 hover:bg-[#FCA600] hover:text-black transition font-medium"
    >
       View More
    </a>
  
  
  </div>
  
  
          <p className="mt-4 text-sm font-normal text-center text-gray-300">
            Explore a glimpse of our finest work, showcasing top-quality products delivered to our clients.
          </p>
</div>

{/* Slider */}
<div className="w-full max-w-6xl relative">
  <Slider ref={sliderRef} {...settings}>

    {/* Product Slides */}
 {portfolioVideos.map((item) => (
  <div key={item.id} className="px-2">


 <div
  className="w-full max-w-[200px] mx-auto aspect-[9/16] bg-black rounded-xl overflow-hidden cursor-pointer"
  onClick={() => setActiveVideo(item.url)}
>
  <video
    src={item.url}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
</div>


  </div>
))}




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

<Modal
  isOpen={!!activeVideo}
  onRequestClose={() => setActiveVideo(null)}
  className="bg-black rounded-xl max-w-4xl w-full mx-auto p-4 outline-none"
  overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
>

  {/* Close Icon */}
  <button
    onClick={() => setActiveVideo(null)}
    className="absolute top-3 right-3 text-white hover:text-[#FCA600] text-xl"
  >
    ✕
  </button>

  {/* Video — ORIGINAL SIZE */}
  <video
    src={activeVideo}
    controls
    autoPlay
    className="w-full max-h-[80vh] rounded-lg"
  />

  {/* Bottom Close Button */}
  <div className="flex justify-center mt-4">
    <button
      onClick={() => setActiveVideo(null)}
      className="border-2 border-[#FCA600] text-[#FCA600] px-6 py-2 rounded-lg hover:bg-[#FCA600] hover:text-black transition"
    >
      Close
    </button>
  </div>

</Modal>

    </div>
  );
}
