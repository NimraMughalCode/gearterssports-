import React from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-center px-4 py-10 text-white overflow-hidden font-[var(--font-bebas-neue)]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/whychooseus.svg')` }}
      ></div>

      {/* Black overlay on top of image */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content on top */}
      <div className="relative flex flex-col md:flex-row w-full max-w-7xl space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col max-w-2xl px-4 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            Why Choose <br />
            <span style={{ color: "#FCA600" }}>GEARTERS SPORTS</span>
          </h2>

          <p className="mt-4 text-sm md:text-base  text-gray-300">
            Quality You Can Feel, Performance You Can Trust. Your Reliable Partner
            for Boxing Product Exports.
          </p>

          <ul className="mt-4 text-sm md:text-base  text-gray-300 list-disc list-inside space-y-2">
            <li>Premium Quality Materials</li>
            <li>Custom Designs & Private Label Options</li>
            <li>Competitive Pricing for Bulk Orders</li>
            <li>Fast Global Shipping</li>
            <li>Strict Quality Control</li>
            <li>Exceptional Customer Support</li>
          </ul>
          <a
            href="/contact"
            className="mt-6 border-2 border-[#FCA600] w-fit text-white px-6 py-3 text-lg font-normal hover:bg-[#FCA600] transition"
          >
            ABOUT US
          </a>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex items-center justify-center px-4">
          <Image
            src="/Frame649.svg"
            alt="Why Choose Us"
            width={400}
            height={400}
            className="w-full max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
