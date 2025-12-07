"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react"; // ⬅️ Added Iconify here

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
      className="bg-black text-white  flex justify-center items-center"
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
            // src="https://thumbs.dreamstime.com/b/photo-rear-view-strong-boxer-boxing-ring-under-spotlights-depicting-determination-vertical-mobile-wallpaper-316567530.jpg"
         src="https://uwvgebfrmlofrvcywmwj.supabase.co/storage/v1/object/public/product-images/products/1761408354103.jpg"
            alt="Boxer"
            fill
            className="object-contain"
          />
        </div>

        {/* Right Side Form */}
        <div
          ref={rightRef}
          className={`md:w-1/2 bg-black  md:px-8  py-2 flex flex-col justify-center skew-x-0 md:skew-x-6 transition-all duration-1000 ease-out
            ${rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16 pointer-events-none'}`}
        >
      

           <h1 className="  text-3xl md:text-4xl font-bold text-white leading-tight">
                     Let’s Talk
                    <span style={{ color: "#FCA600" }}> Boxing Business</span>
                  </h1>
          <p className="text-gray-300 my-4 text-sm tracking-wide font-medium">
            Export Worldwide | Premium Quality | Custom Orders
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Enter Your Name..."
                  className="w-full  rounded-lg bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none font-light"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="w-1/2">
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  type="text"
                  placeholder="Phone Number..."
                  className="w-full   rounded-lg bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none font-light"
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
                className="w-full rounded-lg  bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none font-light"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Write here..."
                rows={4}
                className="w-full  rounded-lg bg-black border border-gray-600 text-white px-4 py-2 placeholder-gray-400 outline-none resize-none font-light"
              ></textarea>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 border-2  rounded-lg border-[#FCA600] text-[#FCA600] px-6 py-3  hover:bg-[#FCA600] hover:text-black font-medium text-small transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>

          {/* ⭐ SOCIAL ICONS (added from Header) */}
          <div className="flex items-center space-x-6 mt-6">
            <a
              href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr"
              target="_blank"
            >
              <Icon
                icon="logos:facebook"
                width="34"
                height="34"
                className="hover:opacity-80 transition"
              />
            </a>

            <a
              href="https://www.instagram.com/gearterssports4"
              target="_blank"
            >
              <Icon
                icon="skill-icons:instagram"
                width="34"
                height="34"
                className="hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
