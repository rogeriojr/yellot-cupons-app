/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#5956E9",
        secondary: "#FFCE22",
        dark: {
          100: "#333333",
          200: "#222222",
          300: "#1A1A1A",
          400: "#121212",
        },
      },
    },
  },
  plugins: [],
};
