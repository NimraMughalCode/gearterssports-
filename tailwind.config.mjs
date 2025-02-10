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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1E3A8A", // Dark Blue
        secondary: "#9333EA", // Purple
        accent: "#22D3EE", // Cyan
        background: "#111827", // Dark Gray
        text: "#F3F4F6", // Light Gray
        card: "#1F2937", // Grayish Card Background
      },
    },
  },
  plugins: [],
};
