/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Add other paths as needed
  ],
  darkMode: "class", // This is important for dark mode support!
  theme: {
    extend: {},
  },
  plugins: [],
}