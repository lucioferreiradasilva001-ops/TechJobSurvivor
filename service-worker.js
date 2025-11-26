const CACHE_NAME = 'techsurvivor-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json',
  '/types.ts',
  '/App.tsx',
  '/services/geminiService.ts',
  '/components/Components.tsx',
  '/components/AnalysisCharts.tsx'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  // Não cachear chamadas de API do Gemini ou externas dinâmicas por padrão para garantir dados frescos
  if (event.request.url.includes('google') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna do cache se encontrar, senão busca na rede
      return response || fetch(event.request).then((networkResponse) => {
        // Opcional: Cachear novas requisições dinamicamente (com cuidado para não cachear tudo)
        return networkResponse;
      });
    })
  );
});