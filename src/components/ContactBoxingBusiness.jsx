"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

const CONTACTBUSINESS_VIEWED_KEY = 'contactbusiness-section-viewed';

export default function ContactBoxingBusiness() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  // Animation state for left/right columns
  const [visible, setVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(CONTACTBUSINESS_VIEWED_KEY) === 'true') {
      setVisible(true);
      setLeftVisible(true);
      setRightVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(CONTACTBUSINESS_VIEWED_KEY, 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    return () => { leftObs.disconnect(); rightObs.disconnect(); };
  }, [visible]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Email sent successfully!");
        reset();
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-black text-white py-2 md:px-4 px-2 flex justify-center items-center"
    >
      <Toaster position="top-right" />
      <div className="max-w-6xl w-full flex flex-col md:flex-row p-4 md:p-0 transform md:-skew-x-6">
        {/* Left Side Image */}
        <div
          ref={leftRef}
          className={`md:w-1/2 skew-x-0 md:skew-x-6 aspect-[3/2] relative transition-all duration-1000 ease-out
            ${leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16 pointer-events-none'}`}
        >
          <Image
            src="https://thumbs.dreamstime.com/b/photo-rear-view-strong-boxer-boxing-ring-under-spotlights-depicting-determination-vertical-mobile-wallpaper-316567530.jpg"
            alt="Boxer"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div
          ref={rightRef}
          className={`md:w-1/2 bg-black  md:px-8  py-2 flex flex-col justify-center skew-x-0 md:skew-x-6 transition-all duration-1000 ease-out
            ${rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16 pointer-events-none'}`}
        >
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-2">
            LET’S TALK{" "}
            <span className="text-[#FCA600] font-extralight">BOXING</span>{" "}
            BUSINESS
          </h2>
          <p className="text-gray-300 mb-8 uppercase text-sm tracking-wide font-light">
            Export Worldwide | Premium Quality | Custom Orders
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Enter Your Name..."
                  className="w-full bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none font-light"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="w-1/2">
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  type="text"
                  placeholder="Phone Number..."
                  className="w-full bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none font-light"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Your Email Address..."
                className="w-full bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none font-light"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Write here..."
                rows={4}
                className="w-full bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none resize-none font-light"
              ></textarea>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 border-2 border-[#FCA600] text-[#FCA600] px-6 py-3 text-lg font-light hover:bg-[#FCA600] hover:text-black transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
