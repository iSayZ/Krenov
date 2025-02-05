import type { TailwindConfig } from '@react-email/tailwind';

export const tailwindConfig: TailwindConfig = {
  theme: {
    extend: {
      colors: {
        brand: '#004A6B',
      },
    },
  },
  important: true,
  prefix: '',
  separator: ':',
  safelist: [],
  blocklist: [],
  presets: [],
  future: {},
  experimental: {},
  darkMode: 'class',
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};
