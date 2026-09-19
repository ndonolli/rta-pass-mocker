const cacheName = "cache_v1.1.0";

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
    caches.open(cacheName).then((cache) => {
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate");

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      // Only check the CURRENT cache
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