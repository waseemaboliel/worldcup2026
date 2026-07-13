const CACHE = 'wc2026-v48';
const SHELL = [
  './',
  './index.html',
  './styles/main.css',
  './styles/base/reset.css',
  './styles/base/tokens.css',
  './styles/base/typography.css',
  './styles/utilities/animations.css',
  './styles/layout/shell.css',
  './styles/layout/rtl.css',
  './styles/components/match-card.css',
  './styles/components/match-detail.css',
  './styles/components/match-stats.css',
  './styles/components/lineup-pitch.css',
  './styles/components/standings.css',
  './styles/components/bracket.css',
  './styles/components/stats.css',
  './styles/components/profile.css',
  './styles/utilities/scrollbar.css',
  './manifest.json',
  './favicon.ico',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './src/main.js',
  './src/state.js',
  './src/config/api.js',
  './src/config/constants.js',
  './src/config/strings.js',
  './src/data/helpers.js',
  './src/data/fetchers.js',
  './src/data/timeline.js',
  './src/data/lineup.js',
  './src/data/espn-lineup.js',
  './src/data/espn-stats.js',
  './src/data/espn-live.js',
  './src/data/live-scores.js',
  './src/ui/shell.js',
  './src/ui/helpers.js',
  './src/ui/lineup-pitch.js',
  './src/ui/links.js',
  './src/ui/event-sections.js',
  './src/features/profiles.js',
  './src/features/stats.js',
  './src/features/standings.js',
  './src/features/bracket.js',
  './src/features/match-detail.js',
  './src/features/matches.js'
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
