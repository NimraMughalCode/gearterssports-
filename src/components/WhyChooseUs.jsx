import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WHYCHOOSEUS_VIEWED_KEY = 'whychooseus-section-viewed';

export default function WhyChooseUs() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(WHYCHOOSEUS_VIEWED_KEY) === 'true') {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(WHYCHOOSEUS_VIEWED_KEY, 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative flex flex-col md:flex-row items-center justify-center w-full max-w-full px-2 sm:px-4 py-8 md:py-10 text-white overflow-x-hidden font-sans transition-all duration-1000 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/whychooseus.svg')` }}
      ></div>

      {/* Black overlay on top of image */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content on top */}
      <div className="relative flex flex-col md:flex-row flex-wrap w-full max-w-7xl space-y-8 md:space-y-0 md:space-x-8 max-w-full overflow-x-hidden">
        {/* Left/Right Animation State */}
        {/** Animation state for left/right columns */}
        {(() => {
          const [leftVisible, setLeftVisible] = React.useState(false);
          const [rightVisible, setRightVisible] = React.useState(false);
          const leftRef = React.useRef(null);
          const rightRef = React.useRef(null);
          React.useEffect(() => {
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
            return () => { leftObs.disconnect(); rightObs.disconnect(); };
          }, [visible]);
          return <>
            {/* Left Column */}
            <div
              ref={leftRef}
              className={`flex-1 flex flex-col max-w-2xl px-4  text-left transition-all duration-1000 ease-out
                ${leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16 pointer-events-none'}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Why Choose <br />
                <span style={{ color: "#FCA600" }}>GEARTERS SPORTS</span>
              </h2>
              <p className="mt-4 text-sm md:text-base font-normal text-gray-300">
                Quality You Can Feel, Performance You Can Trust. Your Reliable Partner
                for Boxing Product Exports.
              </p>
              <ul className="mt-4 text-sm md:text-base font-normal text-gray-300 list-disc list-inside space-y-2">
                <li>Premium Quality Materials</li>
                <li>Custom Designs & Private Label Options</li>
                <li>Competitive Pricing for Bulk Orders</li>
                <li>Fast Global Shipping</li>
                <li>Strict Quality Control</li>
                <li>Exceptional Customer Support</li>
              </ul>
              <a
                href="/contact"
                className="mt-6 border-2 border-[#FCA600] w-fit text-white px-6 py-3 text-lg font-medium hover:bg-[#FCA600] transition"
              >
                ABOUT US
              </a>
            </div>
            {/* Right Column (Image) */}
            <div
              ref={rightRef}
              className={`flex-1 flex flex-col max-w-2xl px-4 text-center md:text-left transition-all duration-1000 ease-out
                ${rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16 pointer-events-none'}`}
            >
              {/* You can add more right-side content here if needed */}
            </div>
          </>;
        })()}
      </div>
    </div>
  );
}
