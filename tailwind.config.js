/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/hooks/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#d8e4fc",
          200: "#b1c9f9",
          300: "#8aaff6",
          400: "#6394f3",
          500: "#3c79f0",
          600: "#3061c0",
          700: "#244990",
          800: "#183060",
          900: "#0c1830",
        },
        aqua: {
          100: "#e1f4f0",
          200: "#c3e8e1",
          300: "#a6ddd2",
          400: "#88d1c3",
          500: "#6ac6b4",
          600: "#559e90",
          700: "#40776c",
          800: "#2a4f48",
          900: "#152824",
        },
        purple: {
          100: "#d9d2eb",
          200: "#b4a5d7",
          300: "#8e78c2",
          400: "#694bae",
          500: "#431e9a",
          600: "#36187b",
          700: "#28125c",
          800: "#1b0c3e",
          900: "#0d061f",
        },
        primary: "#002B5B",
        secondary: "#2B4865",
        tersier: "#256D85",
        quaternary: "#8FE3CF",
        caqua: "#6ac6b4",
        cblue: "#3c79f0",
        cpurple: "#431e9a",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },

    fontFamily: {
      Inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
