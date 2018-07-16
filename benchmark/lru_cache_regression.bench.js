const LRUCache = require('../dist').default;
const LibCache = require('lru-cache');

const cache = new LRUCache(1000);
const libCache = new LibCache(1000);

bench([
    function regression() {
        for (let i = 0; i < 2000; i++) {
            cache.set(`name${i}`, 'test');
        }
        for (let i = 0; i < 2000; i++) {
            cache.get(`name${i}`);
        }
        for (let i = 0; i < 2000; i++) {
            cache.set(`name${i + i}`, 'test');
        }
    },
    function regressionLib() {
        for (let i = 0; i < 2000; i++) {
            libCache.set(`name${i}`, 'test');
        }
        for (let i = 0; i < 2000; i++) {
            libCache.get(`name${i}`);
        }
        for (let i = 0; i < 2000; i++) {
            libCache.set(`name${i + i}`, 'test');
        }
    },
], {
    runs: 100,
});
