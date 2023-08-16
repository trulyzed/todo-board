import type { Config } from 'tailwindcss'

const navbarHeight = '72px'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        content: `calc(100vh - ${navbarHeight})`,
      },
      top: {
        navbar: `${navbarHeight}px`,
      }
    },
  },
  plugins: [],
}
export default config
