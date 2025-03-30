const CACHE_NAME = 'ilchar-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    'css/style.css',
    // 'scripts/app.ts',
    // 'scripts/char.ts',
    // 'scripts/files.ts'
    'js/app.js',
    'js/char.js',
    'js/files.js'
];

// Installieren des Service Workers und Caching der Ressourcen
self.addEventListener('install', (event) => {
    console.log('Serviceworker wird installiert.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Serviceworker befüllt Cache.', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
    );
});

// Aktivieren des Service Workers und Aufräumen von alten Caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    console.log('Serviceworker activate.');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Cache ' + cacheName + ' wird gelöscht.');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Abrufen von gecachten Ressourcen
self.addEventListener('fetch', (event) => {
    console.log('Serviceworker fetch.');
    event.respondWith(
        caches.match(event.request)
            .then(async cachedResponse => {
                if (cachedResponse) {
                    console.log('SW holt aus dem Cache: ' + cachedResponse.url);
                    return cachedResponse;
                }
                console.log('SW holt aus dem Netz: ' + event.request.url);
                return fetch(event.request);
            })
    );
});