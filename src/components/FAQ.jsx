"use client";
import React, { useState, useEffect, useRef } from "react";
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

// Helper to check if FAQ was already viewed
const FAQ_VIEWED_KEY = 'faq-section-viewed';

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    if (localStorage.getItem(FAQ_VIEWED_KEY) === 'true') {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(FAQ_VIEWED_KEY, 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation for each FAQ item
  const [itemVis, setItemVis] = useState(Array(faqs.length).fill(false));
  const itemRefs = useRef(faqs.map(() => React.createRef()));

  useEffect(() => {
    const observers = itemRefs.current.map((ref, idx) => {
      if (!ref.current) return null;
      return new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setItemVis((v) => {
              const arr = [...v];
              arr[idx] = true;
              return arr;
            });
            observers[idx]?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
    });
    itemRefs.current.forEach((ref, idx) => {
      if (ref.current && observers[idx]) observers[idx].observe(ref.current);
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  return (
    <div
      id="faq"
      ref={sectionRef}
      className={`bg-black text-white px-4 py-16 font-sans transition-all duration-1000 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
    >
      <div className="max-w-4xl mx-auto">
   

         <h1 className="text-center  mb-10 text-3xl md:text-4xl font-bold text-white leading-tight">
                    Frequently Asked
                    <span style={{ color: "#FCA600" }}> Questions</span>
                  </h1>
        {faqs.map((faq, idx) => (
          <div
            key={faq.question}
            ref={itemRefs.current[idx]}
            className={`mb-6 border-b border-gray-700 pb-4 transition-all duration-700 ease-out
              ${itemVis[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
          >
            <button
              className="flex items-center justify-between w-full text-left focus:outline-none"
              onClick={() => toggleIndex(idx)}
            >
              <span className=" font-medium text-sm text-white">
                {faq.question}
              </span>
              <span className="ml-4">
                {activeIndex === idx ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            {activeIndex === idx && (
              <div className="mt-2 font-normal text-sm text-gray-300  transition-all duration-500">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
