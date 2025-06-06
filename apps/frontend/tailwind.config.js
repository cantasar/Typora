module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['charter', 'Georgia', 'system-ui', 'sans-serif'],
        title: ['sohne', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        medium: {
          green: '#1a8917',
          dark: '#242424',
          gray: '#6B6B6B',
          light: '#F5F5F5',
          border: '#E6E6E6'
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}