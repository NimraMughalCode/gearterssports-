"use client";

import React, { useRef, useEffect, useState } from "react";
import ContactBoxingBusiness from "@/components/ContactBoxingBusiness";

const CONTACT_VIEWED_KEY = "about-section-viewed";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);

  // Section fade-in animation
  useEffect(() => {
    if (localStorage.getItem(CONTACT_VIEWED_KEY) === "true") {
      setVisible(true);
      setLeftVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(ABOUT_VIEWED_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Child animation
  useEffect(() => {
    if (!visible) return;

    const leftObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftVisible(true);
          leftObs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) leftObs.observe(leftRef.current);
    return () => leftObs.disconnect();
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-16 flex flex-col gap-8 font-sans"
    >
      <div className="container px-2 md:px-[70px]">
        <div
          ref={leftRef}
          className={`transition-all duration-1000 ease-out ${
            leftVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-16 pointer-events-none"
          }`}
        >
          {/* ONLY this component remains */}
          <ContactBoxingBusiness />
        </div>
      </div>
    </section>
  );
}
