/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111827", // Dark Gray background
        backgroundBlack: "#000000", // True black
        foreground: "var(--foreground)", // CSS var if you want
        primary: "#cf971a", // Gold-ish (adjust if needed)
        secondary: "#7b3f99", // Purple-ish
        accent: "#22D3EE", // Cyan
        text: '#E5E5E5', // Light Grey for readability
        card: "#1F2937", // Grayish Card Background
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
