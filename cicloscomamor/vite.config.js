// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/ciclos-com-amor/", // nome do repositório
  plugins: [react()]
});
