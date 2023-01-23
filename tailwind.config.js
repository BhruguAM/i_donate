/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      colors: {
        primary: "rgba(245, 119, 2, 1)",
        greyout: "rgba(146, 144, 142, 1)",
        background: "rgba(250, 250, 250, 1)",
        title: "rgba(56, 33, 12, 1)",
        loading: "rgba(150, 150, 150, 0.5)",
      },
    },
  },
  plugins: [],
};
