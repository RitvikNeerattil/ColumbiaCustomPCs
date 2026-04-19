/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08111f',
        steel: '#12233d',
        accent: '#ff6b35',
        sand: '#f6f2ea',
        mist: '#b7c6da'
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif']
      },
      boxShadow: {
        panel: '0 20px 60px rgba(0, 0, 0, 0.28)'
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(255, 107, 53, 0.28), transparent 28%), linear-gradient(135deg, rgba(8, 17, 31, 0.96), rgba(18, 35, 61, 0.88))'
      }
    }
  },
  plugins: []
};
