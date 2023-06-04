const CACHE_PREFIX = 'cinemaddict'
const CACHE_VER = 'v1';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = 'basic';

const staticAssets = [
  './',
  './index.html',
  './sw.js',
  './assets/index.css',
  './assets/fonts/OpenSans-Bold.woff2',
  './assets/fonts/OpenSans-Regular.woff2',
  './assets/fonts/OpenSans-ExtraBold.woff2',
  './assets/images/emoji/emoji-puke.png',
  './assets/images/emoji/emoji-angry.png',
  './assets/images/emoji/emoji-smile.png',
  './assets/images/emoji/emoji-sleeping.png',
  './assets/images/icons/icon-watched.svg',
  './assets/images/icons/icon-favorite.svg',
  './assets/images/icons/icon-watchlist.svg',
  './assets/images/icons/icon-watched-active.svg',
  './assets/images/icons/icon-favorite-active.svg',
  './assets/images/icons/icon-watchlist-active.svg',
  './assets/images/bitmap.png',
  './assets/images/background.png',
];

const handleInstall = async (evt) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(staticAssets);
}

const handleActivate = async (evt) => {
  const cachesKeys = await caches.keys();
  const checkKeys = cachesKeys
    .map(async key => {
      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
        await caches.delete(key);
      }

      return null;
    })
    .filter((key) => key !== null);

  Promise.all(checkKeys);
}

const handleFetch = async (evt) => {
  const { request } = evt;

  const cacheResponse = await caches.match(request);

  if (cacheResponse) {
    return cacheResponse;
  }

  const response = await fetch(request);

  if (!response ||
    response.status !== HTTP_STATUS_OK ||
    response.type !== RESPONSE_SAFE_TYPE) {
    return response;
  }

  const clonedResponse = response.clone();

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, clonedResponse);

  return response;
}

self.addEventListener('install', handleInstall);
self.addEventListener('activate', handleActivate);
self.addEventListener('fetch', handleFetch);
