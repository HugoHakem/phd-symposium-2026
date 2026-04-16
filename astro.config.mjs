// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://phdsymposium.embl-community.io',
  base: '/phd-symposium-2026/',
  outDir: 'public',
  publicDir: 'static',
  trailingSlash: "ignore",
});

