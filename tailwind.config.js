/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "chirp-regular": ["chirp-regular", "sans-serif"],
      },
      fontFace: {
        "chirp-regular": {
          fontFamily: "Chirp Regular", // The font-family name you want to use
          src: "url('fonts/Chirp-Regular.80fda27a.woff2') format('woff2')", // URL to your font file
        },
      },
    },
  },
  plugins: [],
};
