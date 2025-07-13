"use client";
import React, { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in after mount
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <a
      href="https://wa.me/923045441722"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed z-50 bottom-8 right-8 flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-xl transition-all duration-500 font-sans
        ${visible ? "opacity-100 translate-y-0 animate-bounce-in" : "opacity-0 translate-y-8 pointer-events-none"}
        group
      `}
      style={{ boxShadow: "0 8px 32px 0 rgba(34,197,94,0.25)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 24 24"
        className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-glow"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.175.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.004a9.87 9.87 0 01-4.988-1.357l-.361-.214-3.709.982.991-3.617-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.991c-.003 5.45-4.437 9.884-9.882 9.884zm8.413-18.297a11.815 11.815 0 00-8.413-3.488c-6.627 0-12 5.373-12 12 0 2.121.555 4.199 1.607 6.032l-1.693 6.188a1 1 0 00.991 1.263c.084 0 .168-.011.252-.032l6.344-1.682a11.93 11.93 0 005.499 1.354h.005c6.627 0 12-5.373 12-12 0-3.192-1.245-6.191-3.512-8.635z" />
      </svg>
      <style jsx>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateY(40px) scale(0.7); }
          60% { opacity: 1; transform: translateY(-10px) scale(1.1); }
          80% { transform: translateY(4px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .group:hover .drop-shadow-glow {
          filter: drop-shadow(0 0 12px #22c55e) drop-shadow(0 0 24px #22c55e);
        }
      `}</style>
    </a>
  );
}
