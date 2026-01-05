/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#232E48",
        accent: "#FFD166",
        secondary: "#F9FAFB",
        muted: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        brand: ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
  plugins: [],
};
