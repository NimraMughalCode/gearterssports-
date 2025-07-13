"use client"
import CategoryList from "@/components/CategoriesList";
import ClientTestimonials from "@/components/ClientsTestimonials";
import ContactBoxingBusiness from "@/components/ContactBoxingBusiness";
import CTA from "@/components/CTA";
import FAQs from "@/components/FAQ";
import FollowInsta from "@/components/FollowInsta";
import Hero from "@/components/Hero";
import HeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
 
    // </div>
    <div className="gap-4">
    <HeroCarousel />
      {/* <Hero /> */}
      <CategoryList />
      <WhyChooseUs />
      <FollowInsta />
      {/* <Services /> */}
      {/* <CTA /> */}
      {/* <CRMPipeline /> */}
      <ClientTestimonials />
      <FAQs />
      <ContactBoxingBusiness />
        </div>
  );
}
