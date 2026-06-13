const CACHE = 'wc2026-v25';
const SHELL = [
  '/worldcup2026/',
  '/worldcup2026/index.html',
  '/worldcup2026/style.css',
  '/worldcup2026/app.js',
  '/worldcup2026/manifest.json',
  '/worldcup2026/favicon.ico',
  '/worldcup2026/icons/icon-192.png',
  '/worldcup2026/icons/icon-512.png',
  '/worldcup2026/icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Only cache same-origin shell requests — let FIFA API calls go straight to network
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
