"use client"
import CategoriesGrid from "@/components/CategoriesGrid";
import PortfolioSection from "@/components/OurPortfolio";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="gap-4 dark:bg-black bg-transparent font-sans transition-colors duration-300">
      <HeroCarousel /> 
      <PortfolioSection />
      <div id="categories">
        <CategoriesGrid />
      </div>
      <WhyChooseUs />
    </div>
  );
}
