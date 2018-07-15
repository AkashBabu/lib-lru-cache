const LRUCache = require('../dist').default;
const LibCache = require('lru-cache');

const cache = new LRUCache(1000);
const libCache = new LibCache(1000);

bench([
    function get() {
        cache.get('name', 'test');
    },
    function getLib() {
        libCache.get('name', 'test');
    },
], {
    runs: 1000,
});
