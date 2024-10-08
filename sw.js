const cacheName = "cache_v1.0.0";
const precachedResources = [
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
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })(),
  );
});