"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What types of boxing products do you offer?",
    answer:
      "We offer a wide range of products including gloves, headgear, punch bags, apparel, and accessories tailored for professionals and beginners alike.",
  },
  {
    question: "Can I get my brand logo on the products?",
    answer:
      "Absolutely! We provide private label and custom design options to help you promote your brand effectively.",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "Our MOQ varies depending on the product, but we are flexible and happy to accommodate small batch orders for new customers.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer fast and reliable international shipping to all major countries with tracking included.",
  },
  {
    question: "How do you ensure product quality?",
    answer:
      "Every product undergoes strict quality control checks at multiple stages of production to ensure premium quality.",
  },
];

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div id="faq" className="bg-black text-white px-4 py-16 font-[var(--font-bebas-neue)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-10 font-thin">
          Frequently Asked{" "}
          <span className="text-[#FCA600] font-thin">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition"
              >
                <span className="text-lg  text-white">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="text-[#FCA600]" />
                ) : (
                  <ChevronDown className="text-[#FCA600]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="bg-[#0f0f0f] text-gray-300 px-6 py-4 text-sm md:text-base transition duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
