/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(251, 155, 25, 1)",
        greyout: "rgba(146, 144, 142, 1)",
        background: "rgba(250, 250, 250, 1)",
        title: "rgba(56, 33, 12, 1)",
      },
    },
  },
  plugins: [],
};
