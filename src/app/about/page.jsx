"use client"
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

const ABOUT_VIEWED_KEY = 'about-section-viewed';

export default function About() {
  const [visible, setVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(ABOUT_VIEWED_KEY) === 'true') {
      setVisible(true);
      setLeftVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(ABOUT_VIEWED_KEY, 'true');
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
    if (leftRef.current) leftObs.observe(leftRef.current);
    return () => leftObs.disconnect();
  }, [visible]);

  return (
    <section ref={sectionRef} className="bg-white py-16 px-6 md:px-12 lg:px-20 font-sans">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div ref={leftRef} className={`transition-all duration-1000 ease-out ${leftVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-16 pointer-events-none'}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

          {/* Our Purpose */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Purpose</h2>
            <p className="text-gray-700 leading-relaxed">
              At Gearters Sports, our purpose is to craft high-quality, durable, and performance-driven gloves for athletes and professionals worldwide. 
              We are dedicated to innovation, ensuring that every pair of gloves enhances grip, comfort, and protection for peak performance.
            </p>
          </section>

          {/* Vision & Mission */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vision & Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to be a global leader in premium sports gloves, trusted by athletes, trainers, and professionals in various sports and industries. 
              Our mission is to continuously innovate, using top-tier materials and craftsmanship to produce gloves that offer superior performance, durability, and style.
            </p>
          </section>
        </div>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Gearters Sports was founded with a passion for excellence in sports gear. Recognizing the need for high-quality gloves that meet the demands of athletes,
            we set out to design and manufacture products that blend innovation with comfort. Our journey began with a small team of dedicated experts,
            and today, we proudly serve professionals and sports enthusiasts worldwide.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With a commitment to quality and performance, Gearters Sports continues to push the boundaries of glove manufacturing, ensuring that every product meets the highest industry standards.
          </p>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Quality:</strong> We prioritize top-notch materials and craftsmanship in every glove we create.</li>
            <li><strong>Innovation:</strong> We continuously research and develop new designs to enhance performance and comfort.</li>
            <li><strong>Durability:</strong> Our gloves are built to withstand rigorous use, providing long-lasting reliability.</li>
            <li><strong>Customer Satisfaction:</strong> We value our customers and strive to exceed their expectations with superior products and service.</li>
          </ul>
        </section>

        {/* Our Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our team consists of experienced designers, engineers, and sports enthusiasts who share a passion for excellence. 
            Together, we work tirelessly to develop and manufacture gloves that cater to the diverse needs of athletes and professionals.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Journey</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At Gearters Sports, we are committed to revolutionizing the world of sports gloves. Whether you’re an athlete or a professional,
            we invite you to experience the perfect blend of comfort, durability, and performance.
          </p>
          <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Contact Us
          </a>
        </section>
      </div>
    </section>
  );
}
