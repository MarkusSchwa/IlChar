const CACHE_NAME = 'ilchar-cache-v5';
const urlsToCache = [
    '/',
    '/index.html',
    'css/style.css',
    'js/app.js'
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
    console.log('Cache aufräumen wird versucht.');
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
    console.log('Cache wird gesucht.');
    event.respondWith(
        caches.match(event.request)
            .then(async cachedResponse => {
                if (cachedResponse) {
                    console.log('Serviceworker ruft Daten aus dem Cache ab.',cachedResponse);
                    return cachedResponse;
                }
                console.log('Serviceworker holt Daten aus dem Netz.');
                return fetch(event.request);
            })
    );
});