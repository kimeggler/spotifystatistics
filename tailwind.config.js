/** @type {import('tailwindcss').Config} */
const { heroui } = require('@heroui/react');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors matching the current Spotify Statistics theme
        'statfy-purple': {
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d946ef',
          300: '#d300ff',
          400: '#c026d3',
          500: '#a21caf',
          600: '#86198f',
          700: '#701a75',
          800: '#581c87',
          900: '#4c1d95',
        },
        'statfy-dark': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0b001b',
        },
        'spotify-green': '#1db954',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(-35deg, #d300ff, #8300ff)',
        'gradient-main': 'linear-gradient(-20deg, rgba(15, 226, 103, 1), rgba(180, 16, 206, 1), rgba(249, 149, 18, 1))',
        'gradient-footer': 'linear-gradient(180deg, #0b001b, #4f006e)',
      },
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#0b001b",
            foreground: "#ffffff",
            primary: {
              50: "#f3e8ff",
              100: "#e9d5ff",
              200: "#d946ef",
              300: "#d300ff",
              400: "#c026d3",
              500: "#a21caf",
              600: "#86198f",
              700: "#701a75",
              800: "#581c87",
              900: "#4c1d95",
              DEFAULT: "#d300ff",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#8300ff",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
}