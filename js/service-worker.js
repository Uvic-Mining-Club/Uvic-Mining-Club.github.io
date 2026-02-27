const CACHE_NAME = 'team-cache-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Only intercept JSON requests
  if (event.request.url.includes('teamstruct.json')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Check cache age
          const cacheTime = new Date(cachedResponse?.headers.get('sw-cache-time') || 0);
          const now = new Date();
          const isStale = (now - cacheTime) > CACHE_DURATION;

          // If cache exists and is fresh, return it
          if (cachedResponse && !isStale) {
            console.log('Returning cached team data');
            return cachedResponse;
          }

          // Otherwise, fetch fresh data from network
          return fetch(event.request).then((networkResponse) => {
            // Validate response is successful
            if (!networkResponse || networkResponse.status !== 200) {
              return cachedResponse || networkResponse;
            }

            // Clone and cache the response
            const responseToCache = networkResponse.clone();
            const newResponse = new Response(responseToCache.body, {
              status: networkResponse.status,
              statusText: networkResponse.statusText,
              headers: new Headers(networkResponse.headers)
            });
            newResponse.headers.set('sw-cache-time', new Date().toISOString());

            cache.put(event.request, newResponse);
            console.log('Updated team data cache');
            return networkResponse;
          }).catch(() => {
            // Network failed, return cached version if available
            if (cachedResponse) {
              console.log('Network failed, using cached team data');
              return cachedResponse;
            }
            throw new Error('Network request failed and no cache available');
          });
        });
      })
    );
  }
});
