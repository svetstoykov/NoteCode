/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "serif"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom right, rgba(183, 135, 245, 1), rgba(116, 62, 228, 1))",
      },
      colors: {
        "dark-gray": "#282C34",
      },
      screens: {
        xsm: "500px",
      },
    },
  },
  plugins: [],
};
