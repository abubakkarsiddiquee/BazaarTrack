/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // include (tabs) folder
  ],
  theme: { extend: {} },
  plugins: [],
};
