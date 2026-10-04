/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#05020D',
          surface: '#0B061A',
          card: '#120B2A',
          border: 'rgba(157, 78, 221, 0.25)',
          muted: '#A8A3B8',
        },
        brand: {
          purple: '#9D4EDD',
          violet: '#7000FF',
          cyan: '#00F0FF',
          blue: '#00C2FF',
          magenta: '#FF007F',
          indigo: '#5B21B6',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(157, 78, 221, 0.5)',
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.5)',
        'glow-magenta': '0 0 25px -5px rgba(255, 0, 127, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
