"use client"
import CategoriesGrid from "@/components/CategoriesGrid";
import PortfolioSection from "@/components/OurPortfolio";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import ClientTestimonials from "@/components/ClientsTestimonials";
import FeaturedBlogs from "@/components/FeaturedBlogs";

export default function Home() {
  return (
    <div className="gap-4 dark:bg-black bg-transparent font-sans transition-colors duration-300">
      <HeroCarousel /> 
      <PortfolioSection />
      <div id="categories">
        <CategoriesGrid />
      </div>
      <WhyChooseUs />
      <div id="testimonials">
        <ClientTestimonials />
      </div>
      <div id="journal">
        <FeaturedBlogs />
      </div>
    </div>
  );
}
