export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#040b1b',
        'ocean-blue': '#08102f',
        'halo-blue': '#7fb8ff',
      },
      boxShadow: {
        glow: '0 0 80px rgba(255,255,255,0.12)',
      },
      animation: {
        float: 'float 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
}
