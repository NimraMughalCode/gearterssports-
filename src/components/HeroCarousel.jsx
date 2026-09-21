"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollTo = (sectionId) => {
    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] md:min-h-screen overflow-hidden font-sans flex items-center">
      {/* Background Images */}
      {/* DARK MODE: Combat Action Photo */}
      <img
        src="https://uwvgebfrmlofrvcywmwj.supabase.co/storage/v1/object/public/product-images/products/unsplash_sJ6az6-T1u8.png"
        alt="Boxing Combat Athletes - Dark Mode"
        className="absolute inset-0 w-full h-full object-cover hidden dark:block"
      />
      {/* LIGHT MODE: Dedicated Warm Champagne Boxer with Golden Gloves */}
      <img
        src="/hero-light.jpg"
        alt="Gearters Sports Boxing Champion - Light Mode"
        className="absolute inset-0 w-full h-full object-cover object-right md:object-center block dark:hidden"
      />

      {/* Contrast Overlays */}
      {/* Dark Mode Gradient: Deep Black to Transparent */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none hidden dark:block" />
      
      {/* Light Mode Gradient: Warm Champagne Ivory to Subtle Ambient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/85 md:via-[#FAF7F2]/70 to-transparent pointer-events-none block dark:hidden" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 flex flex-col justify-between min-h-[85vh] md:min-h-screen">
        <div className="w-full md:w-3/5 lg:w-1/2 text-left items-start flex flex-col pt-12 md:pt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight dark:text-white text-[#18181B] drop-shadow-sm dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            YOUR RELIABLE PARTNER IN BOXING GEAR <br />
            <span className="text-[#FCA600]">GEARTERS SPORTS</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-medium dark:text-gray-200 text-[#494540] max-w-2xl leading-relaxed">
            Manufacturers of World-Class Boxing Equipment...
          </p>
          <a
            href="https://wa.me/923279988069"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="mt-8 inline-block border-2 border-[#FCA600] rounded-lg text-[#FCA600] px-7 py-3.5 hover:bg-[#FCA600] hover:text-black transition-all duration-300 font-semibold text-sm shadow-md"
          >
            Contact Us
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-2 items-start pb-8 md:pb-12">
          <div className="flex flex-row gap-6 md:gap-10 dark:text-white text-[#18181B] text-left items-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-[#FCA600]">8+</p>
              <p className="text-xs sm:text-sm font-medium dark:text-gray-300 text-[#524E48]">Years of Experience</p>
            </div>
            <div className="h-12 border-l-2 dark:border-white/20 border-black/15"></div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-[#FCA600]">100+</p>
              <p className="text-xs sm:text-sm font-medium dark:text-gray-300 text-[#524E48]">Members Join</p>
            </div>
            <div className="h-12 border-l-2 dark:border-white/20 border-black/15"></div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-[#FCA600]">88+</p>
              <p className="text-xs sm:text-sm font-medium dark:text-gray-300 text-[#524E48]">Happy Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
