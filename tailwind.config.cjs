/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        blue: '#3F6EE8',
        red: '#E5484D',
        dark2: '#2A2A2E',
        lightbg: '#F4F4F5',
      },
    },
  },
  plugins: [],
}
