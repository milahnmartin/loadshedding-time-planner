/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#002B5B",
        secondary: "#2B4865",
        tersier: "#256D85",
        quaternary: "#8FE3CF",
      },
    },
  },
  plugins: [],
};
