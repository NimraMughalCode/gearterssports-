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
  width="28"
  height="28"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="text-white transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-glow"
>
  <path d="M12.005 2.003c-5.522 0-10 4.478-10 10 0 1.77.465 3.501 1.35 5.037l-1.438 5.243 5.367-1.407a9.96 9.96 0 004.721 1.131h.001c5.522 0 10-4.478 10-10s-4.478-10-10.001-10zm5.466 14.31c-.23.647-1.32 1.24-1.814 1.307-.465.06-1.05.085-1.694-.106-.39-.122-.888-.286-1.529-.56-2.686-1.152-4.427-3.837-4.559-4.015-.133-.178-1.09-1.448-1.09-2.759 0-1.31.69-1.954.936-2.222.246-.269.537-.336.715-.336.178 0 .357.002.514.01.165.007.386-.062.605.46.23.55.783 1.902.853 2.04.07.138.115.301.023.479-.09.178-.135.288-.266.443-.133.154-.28.344-.399.46-.133.133-.27.276-.116.543.155.266.691 1.138 1.483 1.84 1.02.914 1.88 1.196 2.146 1.332.266.133.42.117.577-.07.157-.185.67-.776.851-1.04.178-.266.356-.223.601-.133.246.09 1.554.733 1.822.867.266.134.443.198.51.311.07.115.07.668-.16 1.315z" />
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
