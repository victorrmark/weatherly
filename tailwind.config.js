/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
      fontSize: {
        "preset-1": "2rem",
        "preset-2": "1.25rem",
        "preset-3": "1rem",
        "preset-4": "0.875rem",
        "preset-5": "0.75rem",
      },
      colors: {
        "neutral-900": "#02012C",
        "neutral-800": "#262540",
        "neutral-700": "#302F4A",
        "neutral-300": "#ACACB7",
        "neutral-200": "#D4D3D9",
        "neutral-0": "#FFFFFF",
        "blue-700": "#2B1B9C",
        "blue-500": "#4658D9",
      },
      backgroundImage: {
        'image-bg-l': "url('./src/assets/bg-today-large.svg')",
        'image-bg-s': "url('./src/assets/bg-today-small.svg')",
      },
    },
  },
  plugins: [],
};
