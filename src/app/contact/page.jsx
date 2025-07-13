import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import SendMessage from "@/components/SendMessage";
import React, { useRef, useEffect, useState } from "react";

const CONTACTPAGE_VIEWED_KEY = 'contactpage-section-viewed';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem(CONTACTPAGE_VIEWED_KEY) === 'true') {
      setVisible(true);
      setLeftVisible(true);
      setRightVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(CONTACTPAGE_VIEWED_KEY, 'true');
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

    return (
        <div ref={sectionRef} className="bg-black px-12 py-12 font-sans ">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div ref={leftRef} className={`transition-all duration-1000 ease-out ${leftVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-16 pointer-events-none'}`}>
              <GetInTouch />
            </div>
            <div ref={rightRef} className={`transition-all duration-1000 ease-out ${rightVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 translate-x-16 pointer-events-none'}`}>
              <SendMessage />
            </div>
          </div>
        </div>
      );
    }