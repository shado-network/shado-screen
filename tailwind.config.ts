import { heroui } from '@heroui/react'
import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

export default {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        glow: '#ffb000',
      },
      textShadow: {
        none: '0 0 0 var(--tw-shadow-color)',
        DEFAULT: '0 0 1rem var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: '#ffcc00',
          },
        },
        dark: {
          colors: {
            primary: '#ffcc00',
          },
        },
      },
    }),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '75%' },
      })
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
  darkMode: 'class',
} satisfies Config
