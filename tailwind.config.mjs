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
        background: "#000000",
        foreground: "var(--foreground)",
        primary: "#cf971a", // Dark Red
        secondary: "#FFFFFF", // Purple
        accent: "#22D3EE", // Cyan
        background: "#111827", // Dark Gray
        text: '#E5E5E5', // Light Grey for readability
        card: "#1F2937", // Grayish Card Background
      },
    },
  },
  plugins: [],
};
