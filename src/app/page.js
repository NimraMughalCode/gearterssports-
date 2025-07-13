"use client"
import CategoryList from "@/components/CategoriesList";
import ClientTestimonials from "@/components/ClientsTestimonials";
import ContactBoxingBusiness from "@/components/ContactBoxingBusiness";
import FAQs from "@/components/FAQ";
import FollowInsta from "@/components/FollowInsta";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
 
    // </div>
    <div className="gap-4 font-sans">
    <HeroCarousel /> 
      <CategoryList />
      <WhyChooseUs />
      <FollowInsta />
      <ClientTestimonials />
      <FAQs />
      <ContactBoxingBusiness />
        </div>
  );
}
