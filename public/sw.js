const CACHE_NAME = 'album-copa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass through without caching to keep it simple and just satisfy PWA requirements
  event.respondWith(fetch(event.request));
});
