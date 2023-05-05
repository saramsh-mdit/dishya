const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".brand": {
          boxShadow: "0px 3px 16px rgba(124, 58, 237, 0.08)",
        },

        ".brand-sm": {
          boxShadow: "0px 3px 16px rgba(124, 58, 237, 0.08)",
        },

        ".brand-md": {
          boxShadow: "0px 6px 32px rgba(124, 58, 237, 0.08)",
        },

        ".brand-lg": {
          boxShadow: "0px 12px 64px rgba(124, 58, 237, 0.16)",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
