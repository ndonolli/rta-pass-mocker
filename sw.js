const cacheName = "cache_v1.1.1";

const contentToCache = [
  "/",
  "/index.html",
  "/jpt_logo.webp",
  "/rta_icon.png",
  "/rta_logo.webp",
  "/script.js",
  "/styles.css"
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate");

  e.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      const cachedResponse = await cache.match(e.request);

      if (cachedResponse) {
        return cachedResponse;
      }

      const response = await fetch(e.request);

      if (response.ok) {
        await cache.put(e.request, response.clone());
      }

      return response;
    })()
  );
});