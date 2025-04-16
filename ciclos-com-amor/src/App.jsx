// public/manifest.json
export const manifest = {
    name: "Ciclos com Amor",
    short_name: "Ciclos",
    start_url: ".",
    display: "standalone",
    background_color: "#f3e8ff",
    theme_color: "#a78bfa",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  
  // public/service-worker.js
  self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open("static").then((cache) => {
        return cache.addAll(["./", "./index.html"]);
      })
    );
  });
  
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  