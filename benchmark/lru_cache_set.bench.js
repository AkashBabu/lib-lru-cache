const LRUCache = require('../dist').default;
const LibCache = require('lru-cache');

const cache = new LRUCache(1000);
const libCache = new LibCache(1000);

bench([
    function set() {
        cache.set('name', 'test');
    },
    function setLib() {
        libCache.set('name', 'test');
    },
], {
    runs: 1000,
});
