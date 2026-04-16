// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://phdsymposium.pages.embl.de',
  base: '/phd-symposium-2026/',
  outDir: 'public',
  publicDir: 'static',
  trailingSlash: "ignore",
});

