/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  keyframes: {
    bounce1: {
      '0%, 100%': { transform: 'translateX(-10%)' },
      '50%': { transform: 'translateX(10%)' },
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        button: 'var(--color-bg-button)',
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        btnText: 'var(--color-bg-secondary)'
      },
      backgroundImage: {
        'leftMenu-gradient': 'linear-gradient(to bottom, var(--color-bg-menu1), var(--color-bg-menu2))',
      },
      borderColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        input: 'var(--color-bg-input)',
        accent: 'var(--color-text-accent)'
      }
    },
  },
  plugins: [],
}
