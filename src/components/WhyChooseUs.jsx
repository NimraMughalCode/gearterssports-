import React, { useEffect, useRef, useState } from "react";

const WHYCHOOSEUS_VIEWED_KEY = "whychooseus-section-viewed";

export default function WhyChooseUs() {
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
      className={`relative flex flex-col md:flex-row items-center justify-center w-full max-w-full  text-white overflow-x-hidden font-sans transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/whychooseus.svg')` }}
      ></div>

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      {/* <div className="relative flex flex-col   md:flex-row w-full p-2 md:p-[70px] "> */}
   
   <div className="relative w-full px-2 md:px-[70px] py-10 md:py-[70px]  flex flex-col md:flex-row">

        {/* Left Column */}
        <div
          ref={leftRef}
          className={`flex-[2] flex flex-col max-w-2xl px-4 text-left transition-all duration-1000 ease-out
            ${leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16 pointer-events-none"}`}
        >
          <h2 className="text-3xl md:text-4xl  font-bold text-white leading-tight">
            Why Choose <br />
            <span style={{ color: "#FCA600" }}>GEARTERS SPORTS</span>
          </h2>
          <p className="mt-4 text-sm  font-normal text-gray-300">
            Quality You Can Feel, Performance You Can Trust. Your Reliable Partner
            for Boxing Product Exports.
          </p>
          <ul className="mt-4 text-sm  font-normal text-gray-300 list-disc list-inside space-y-2">
            <li>Premium Quality Materials</li>
            <li>Custom Designs & Private Label Options</li>
            <li>Competitive Pricing for Bulk Orders</li>
            <li>Fast Global Shipping</li>
            <li>Strict Quality Control</li>
            <li>Exceptional Customer Support</li>
          </ul>
          

             <a
                    href="/about"
                    className="mt-6 border-2 w-fit  rounded-lg border-[#FCA600] text-[#FCA600] px-6 py-3  hover:bg-[#FCA600] hover:text-black font-medium text-small transition"
                  >
                    About Us
                  </a>
        </div>

        {/* Right Column */}
        <div
          ref={rightRef}
          className={`flex-1 flex items-center justify-center transition-all duration-1000 ease-out
            ${rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16 pointer-events-none"}`}
        >
          {/* You can put an image or something here */}
          <img src="/whycoooseus.svg" alt="Why Choose Us" className="w-full max-w-sm" />
        </div>
      </div>
    </div>
  );
}
