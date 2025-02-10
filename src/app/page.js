"use client"
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
 
    // </div>
    <div className="gap-4">
    <HeroCarousel />
      <Hero />
      <Services />
      <CTA />
        </div>
  );
}
