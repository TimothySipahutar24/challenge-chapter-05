/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/views/**/*.{ejs,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
