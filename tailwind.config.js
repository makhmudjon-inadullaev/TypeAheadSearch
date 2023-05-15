/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        search: '3fr 1fr'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

