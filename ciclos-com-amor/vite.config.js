// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Eu-e-Kah/ciclos-com-amor/', // Caminho correto para o GitHub Pages
  plugins: [react()],
});
