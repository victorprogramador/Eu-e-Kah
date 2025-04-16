const CACHE_NAME = "ciclos-com-amor-v1";
const FILES_TO_CACHE = [
  "/Eu-e-Kah/ciclos-com-amor/",
  "/Eu-e-Kah/ciclos-com-amor/index.html",
  "/Eu-e-Kah/ciclos-com-amor/manifest.json",
  "/Eu-e-Kah/ciclos-com-amor/public/icon-192.png",
  "/Eu-e-Kah/ciclos-com-amor/public/icon-512.png",
  "/Eu-e-Kah/ciclos-com-amor/src/main.jsx",
  "/Eu-e-Kah/ciclos-com-amor/src/App.jsx",
  "/Eu-e-Kah/ciclos-com-amor/src/index.css"
];

// Instala o service worker e faz o cache dos arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa o service worker e limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match("/index.html");
      });
    })
  );
});