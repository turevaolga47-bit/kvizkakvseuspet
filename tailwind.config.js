/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: '#FDF7F3',
        text: {
          primary: '#2F3337',
          secondary: '#6B7280',
        },
        accent: {
          primary: '#E9A6B2',
          secondary: '#C4B5FD',
          hover: '#E38C9C',
          active: '#D96F85',
          disabled: '#F3D0D7',
        },
        border: '#E5E7EB',
        success: '#A7F3D0',
        track: '#FCE7F3',
      },
      boxShadow: {
        card: '0 6px 20px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 28px rgba(15, 23, 42, 0.08)',
        cta: '0 10px 25px rgba(233, 166, 178, 0.25)',
        'cta-hover': '0 14px 30px rgba(233, 166, 178, 0.4)',
      },
      borderRadius: {
        '2xl': '16px',
        'full': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'progress': 'progressFill 0.5s ease-out',
        'dots': 'dots 1.4s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        dots: {
          '0%, 80%, 100%': { opacity: '0', transform: 'scale(0.8)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
