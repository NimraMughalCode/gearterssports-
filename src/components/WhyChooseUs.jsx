import React, { useEffect, useRef, useState } from "react";

const WHYCHOOSEUS_VIEWED_KEY = "whychooseus-section-viewed";

export default function WhyChooseUs({showAboutButton = true}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(WHYCHOOSEUS_VIEWED_KEY) === "true") {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(WHYCHOOSEUS_VIEWED_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const leftObs = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLeftVisible(true);
        leftObs.disconnect();
      }
    }, { threshold: 0.2 });

    const rightObs = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRightVisible(true);
        rightObs.disconnect();
      }
    }, { threshold: 0.2 });

    if (leftRef.current) leftObs.observe(leftRef.current);
    if (rightRef.current) rightObs.observe(rightRef.current);

    return () => {
      leftObs.disconnect();
      rightObs.disconnect();
    };
  }, [visible]);

  return (
    <div
      ref={sectionRef}
      className={`relative flex flex-col md:flex-row items-center justify-center w-full max-w-full overflow-hidden font-sans transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      {/* Background for DARK MODE only */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden dark:block pointer-events-none"
        style={{ backgroundImage: `url('/whychooseus.svg')` }}
      ></div>
      <div className="absolute inset-0 bg-black/80 hidden dark:block pointer-events-none"></div>

      {/* Background for LIGHT MODE: Clean Luxury Warm Champagne (Contained without overflow) */}
      <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-[#FAF7F2] via-[#F5EFE6] to-[#EBE2D3] pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute -top-20 right-0 w-80 h-80 bg-[#C67D00]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-0 w-80 h-80 bg-[#C67D00]/8 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Column */}
        <div
          ref={leftRef}
          className={`flex-[1.2] flex flex-col max-w-2xl text-left transition-all duration-1000 ease-out
            ${leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16 pointer-events-none"}`}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold dark:text-white text-[#18181B] leading-tight">
            Why Choose <br />
            <span className="text-[#FCA600]">GEARTERS SPORTS</span>
          </h2>
          <p className="mt-4 text-sm md:text-base font-normal dark:text-gray-300 text-[#4B4742] leading-relaxed">
            Quality You Can Feel, Performance You Can Trust. Your Reliable Partner
            for Boxing Product Exports.
          </p>
          <ul className="mt-5 text-sm md:text-base font-medium dark:text-gray-300 text-[#3F3B36] space-y-2.5">
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FCA600] flex-shrink-0" />
              Premium Quality Materials
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FCA600] flex-shrink-0" />
              Custom Designs & Private Label Options
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FCA600] flex-shrink-0" />
              Competitive Pricing for Bulk Orders
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FCA600] flex-shrink-0" />
              Fast Global Shipping
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FCA600] flex-shrink-0" />
              Strict Quality Control
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FCA600] flex-shrink-0" />
              Exceptional Customer Support
            </li>
          </ul>

          {showAboutButton && (
            <a
              href="/about"
              className="mt-8 border-2 w-fit rounded-lg border-[#FCA600] text-[#FCA600] px-7 py-3 hover:bg-[#FCA600] hover:text-black font-semibold text-sm transition shadow-sm"
            >
              About Us
            </a>
          )}
        </div>

        {/* Right Column: Dynamic Image based on Theme */}
        <div
          ref={rightRef}
          className={`flex-1 flex items-center justify-center transition-all duration-1000 ease-out w-full
            ${rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16 pointer-events-none"}`}
        >
          {/* Light Theme: Luxury Golden Boxing Gloves on Marble Pedestal */}
          <div className="relative dark:hidden block max-w-md w-full p-2">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C67D00]/40 shadow-[0_15px_35px_rgba(198,125,0,0.18)]">
              <img
                src="/whychooseus-light.jpg"
                alt="Why Choose Gearters Sports - Premium Boxing Gear"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Dark Theme: Original Athlete Silhouette with Gold Frame */}
          <div className="relative hidden dark:block max-w-sm w-full">
            <img
              src="/whycoooseus.svg"
              alt="Why Choose Us"
              className="w-full max-w-sm drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
