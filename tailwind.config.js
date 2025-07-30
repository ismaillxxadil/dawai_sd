/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3AB54A", // اللون الأخضر الأساسي
        secondary: "#FEC260", // لون ثانوي
        dark: "#1F2937", // لون غامق للنصوص أو الخلفيات
        light: "#F9FAFB", // لون فاتح للخلفيات
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
