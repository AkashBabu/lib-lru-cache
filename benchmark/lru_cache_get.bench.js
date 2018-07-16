const LRUCache = require('../dist').default;
const LibCache = require('lru-cache');

const cache = new LRUCache(1000);
cache.set('name1', 'test1');
cache.set('name2', 'test2');
const libCache = new LibCache(1000);
libCache.set('name1', 'test1');
libCache.set('name2', 'test2');

bench([
    function get() {
        cache.get('name1');
        cache.get('name2');
        cache.get('name3');
    },
    function getLib() {
        libCache.get('name1');
        libCache.get('name2');
        libCache.get('name3');
    },
], {
    runs: 10000,
});
