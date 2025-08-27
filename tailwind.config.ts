import { brockmann } from '@/app/fonts';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",       // adjust paths based on your project structure
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        brockmann: ["var(--font-brockmann)"], // uses your local font
      },
    },
  },
  plugins: [],
};

export default config;
