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
        // Primary colors
        'electric-blue': '#0066FF',
        'neon-pink': '#FF0080',
        'deep-purple': '#6B00FF',
        // Secondary colors
        'warm-black': '#1a1a1a',
        'soft-white': '#f5f5f5',
        'accent-yellow': '#FFD700',
        // Dark mode
        'dark-bg': '#0a0a0a',
      },
      fontFamily: {
        'heading': ['"Space Grotesk"', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'strong': '0 16px 48px rgba(0, 0, 0, 0.2)',
        'glow-blue': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-pink': '0 0 20px rgba(255, 0, 128, 0.3)',
        'glow-purple': '0 0 20px rgba(107, 0, 255, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(80px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0066FF 0%, #6B00FF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FF0080 0%, #6B00FF 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0066FF 0%, #FF0080 50%, #6B00FF 100%)',
      },
    },
  },
  plugins: [],
}
