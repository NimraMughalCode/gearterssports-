"use client"
import CategoriesGrid from "@/components/CategoriesGrid";
import PortfolioSection from "@/components/OurPortfolio";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
 
    <div className="gap-4 bg-black font-sans">
    <HeroCarousel /> 
       <div id="categories">
        <CategoriesGrid />
      </div>
  <PortfolioSection />
      <WhyChooseUs />
   
        </div>
  );
}
