"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { 
  Globe, 
  Smartphone, 
  Headphones, 
  Paintbrush,  
  MonitorSmartphone 
} from "lucide-react";

export default function HeroCarousel() {
  const services = [
    {
      title: "Complete Website Development",
      description: "Modern, responsive, and feature-rich websites tailored to your needs.",
      icon: <Globe size={64} className="text-white mb-6" />,
    },
    {
      title: "Complete Mobile App Development",
      description: "Native & cross-platform apps for iOS and Android with top performance.",
      icon: <Smartphone size={64} className="text-white mb-6" />,
    },
    {
      title: "24/7 Support",
      description: "Dedicated customer support to ensure seamless operations.",
      icon: <Headphones size={64} className="text-white mb-6" />,
    },
    {
      title: "Premium Design",
      description: "Aesthetic and user-friendly designs that enhance engagement.",
      icon: <Paintbrush size={64} className="text-white mb-6" />,
    },
    {
      title: "Mobile Responsive",
      description: "Optimized for all devices ensuring the best user experience.",
      icon: <MonitorSmartphone size={64} className="text-white mb-6" />,
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 to-purple-800 ">
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-5xl text-white text-center px-6">
        <h2 className="text-5xl font-bold mb-8">
          Progr<span className="text-gray-300">Umar</span> Solutions
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-white bg-opacity-10 rounded-2xl shadow-lg backdrop-blur-md">
                {service.icon}
                <h3 className="text-3xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-lg text-gray-200">{service.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
