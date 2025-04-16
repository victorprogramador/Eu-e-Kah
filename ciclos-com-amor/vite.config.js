import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // Importe o plugin

export default defineConfig({
  base: '/Eu-e-Kah/ciclos-com-amor/',
  plugins: [
    react(),
    VitePWA({ // Adicione a configuração do PWA
      registerType: 'autoUpdate', // Ou 'prompt' se preferir perguntar ao usuário para atualizar
      includeAssets: ['icon-192.png', 'icon-512.png'], // Arquivos do 'public' que devem ser cacheados
      manifest: {
        // Use o seu manifest.json como base, mas ajuste os caminhos
        name: 'Ciclos com Amor',
        short_name: 'Ciclos',
        description: 'Seu App PWA Ciclos com Amor', // Adicione uma descrição
        start_url: ".", // Caminho relativo à base
        display: "standalone",
        background_color: "#f3e8ff",
        theme_color: "#a78bfa",
        icons: [
          {
            src: 'icon-192.png', // Caminho relativo à raiz do 'dist'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png', // Caminho relativo à raiz do 'dist'
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // Configuração do Service Worker (opcional, o padrão geralmente funciona bem)
      workbox: {
         globPatterns: ['**/*.{js,css,html,png,jpg,svg}'], // Arquivos a serem pré-cacheados
         runtimeCaching: [ // Exemplo de cache em tempo de execução para APIs (se necessário)
           {
             urlPattern: /^https:\/\/api\.exemplo\.com\/.*/,
             handler: 'NetworkFirst',
             options: {
               cacheName: 'api-cache',
               expiration: {
                 maxEntries: 10,
                 maxAgeSeconds: 60 * 60 * 24 // 1 dia
               }
             }
           }
         ]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});