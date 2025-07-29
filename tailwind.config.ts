import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",       // adjust paths based on your project structure
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
};

export default config;
