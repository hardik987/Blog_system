module.exports = {
    mode: 'jit', // Just-In-Time mode for better performance
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF", // Custom primary color (blue)
          secondary: "#9333EA" // Custom secondary color (purple)
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  };
  
  