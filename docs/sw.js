// Service Worker for Noveris Blog
// 企业级缓存策略和离线支持

const CACHE_VERSION = 'v2.2-20241224-2'; // 强制清除所有缓存
const CACHE_NAME = `noveris-blog-${CACHE_VERSION}`;

// 需要预缓存的核心资源
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/logo.svg'
];

// 运行时缓存的资源类型
const RUNTIME_CACHE = {
  images: `${CACHE_NAME}-images`,
  assets: `${CACHE_NAME}-assets`,
  pages: `${CACHE_NAME}-pages`
};

// 安装事件 - 预缓存核心资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching core resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Skip waiting and activate immediately');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Precache failed:', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME &&
                !Object.values(RUNTIME_CACHE).includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming all clients');
        return self.clients.claim();
      })
  );
});

// Fetch 事件 - 缓存策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== self.location.origin) {
    return;
  }

  // HTML 文件 - Network First（始终获取最新）
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 克隆响应用于缓存
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE.pages).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // 网络失败时从缓存返回
          return caches.match(request);
        })
    );
    return;
  }

  // JS/CSS 资源（带 hash）- Cache First
  if (url.pathname.startsWith('/assets/') &&
      (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
    event.respondWith(
      caches.open(RUNTIME_CACHE.assets).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // 图片资源 - Cache First
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|avif)$/)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE.images).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            // 只缓存成功的响应
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // 其他请求 - Network First
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

// 消息事件 - 手动触发缓存清理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('[SW] Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // 通知所有客户端缓存已清除
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'CACHE_CLEARED',
              message: 'All caches have been cleared'
            });
          });
        });
      })
    );
  }
});

// 错误处理
self.addEventListener('error', (event) => {
  console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service Worker loaded, version:', CACHE_VERSION);
