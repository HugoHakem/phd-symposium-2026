// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: process.env.ASTRO_SITE ?? 'https://HugoHakem.github.io',
  base: '/phd-symposium-2026/',
  outDir: process.env.ASTRO_OUT_DIR ?? 'dist',
  publicDir: process.env.ASTRO_PUBLIC_DIR ?? 'static',
  trailingSlash: "ignore",
});

