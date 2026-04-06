// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://HugoHakem.github.io',
  base: '/phd-symposium-2026/',
  trailingSlash: "ignore",
});

