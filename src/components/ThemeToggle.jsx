'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark, mounted } = useTheme();

  if (!mounted) {
    // Avoid layout shift during SSR/hydration
    return (
      <div className={`w-16 h-8 rounded-full border border-yellow-500/40 bg-black/40 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`
        relative flex items-center justify-between w-[68px] h-[34px] p-1 rounded-full
        border transition-all duration-300 ease-out cursor-pointer select-none group
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCA600]
        ${
          isDark
            ? 'bg-[#141414] border-[#FCA600]/40 hover:border-[#FCA600] shadow-[0_0_15px_rgba(252,166,0,0.15)]'
            : 'bg-[#F2ECE1] border-[#C67D00]/50 hover:border-[#C67D00] shadow-[0_2px_10px_rgba(198,125,0,0.18)]'
        }
        ${className}
      `}
      title={`Currently in ${isDark ? 'Dark Mode' : 'Champagne Light Mode'}. Click to switch.`}
    >
      {/* Background Icons */}
      <span className="flex items-center justify-center w-6 h-6 text-yellow-500/60 z-0 pl-0.5">
        <Moon className="w-3.5 h-3.5 transition-opacity duration-200" />
      </span>
      <span className="flex items-center justify-center w-6 h-6 text-amber-600/70 z-0 pr-0.5">
        <Sun className="w-3.5 h-3.5 transition-opacity duration-200" />
      </span>

      {/* Sliding Animated Knob */}
      <span
        className={`
          absolute top-1 left-1 flex items-center justify-center w-[26px] h-[26px] rounded-full
          transition-all duration-300 ease-spring shadow-md z-10
          ${
            isDark
              ? 'translate-x-0 bg-gradient-to-br from-yellow-500 to-amber-600 text-black shadow-[0_0_10px_rgba(252,166,0,0.5)]'
              : 'translate-x-[34px] bg-gradient-to-br from-[#E29A16] to-[#C67D00] text-white shadow-[0_2px_8px_rgba(198,125,0,0.4)]'
          }
          group-hover:scale-105 active:scale-95
        `}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 fill-black/20 text-black transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-white/20 text-white transition-transform duration-300 rotate-90" />
        )}
      </span>
    </button>
  );
}
