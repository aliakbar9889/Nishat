/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'], // Manrope font
        inter: ['Inter', 'sans-serif'],     // Inter font
        lato: ['Lato', 'sans-serif'],    
        italianno:['italianno','sans-serif']  // ✅ Lato font added
      },
    },
  },
  plugins: [],
};
