const CACHE_NAME = 'gen-pwa-v1';
// ระบุรายการไฟล์ทั้งหมดที่ต้องการให้เล่นแบบ Offline ได้
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // หากมีไฟล์ CSS/JS อื่นๆ ให้ใส่ path เพิ่มที่นี่ เช่น './style.css', './app.js'
];

// ขั้นตอน Install: ทำการ Cache ไฟล์
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ขั้นตอน Activate: ลบ Cache เก่าออกเมื่อมีการอัปเดตเวอร์ชัน
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// ขั้นตอน Fetch: ดึงไฟล์จาก Cache ก่อน หากไม่มีค่อยดึงจาก Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
