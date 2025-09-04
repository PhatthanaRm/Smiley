// Service Worker for SMILEY
const CACHE_NAME = 'smiley-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/shop.html',
    '/about.html',
    '/blog.html',
    '/faq.html',
    '/contact.html',
    '/shipping.html',
    '/returns.html',
    '/privacy.html',
    '/css/styles.css',
    '/css/animations.css',
    '/js/data.js',
    '/js/utils.js',
    '/js/components.js',
    '/js/main.js',
    '/js/shop.js'
];

// Install event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});
