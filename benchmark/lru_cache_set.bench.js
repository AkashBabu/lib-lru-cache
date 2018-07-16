const LRUCache = require('../dist').default;
const LibCache = require('lru-cache');

const cache = new LRUCache(1000);
const libCache = new LibCache(1000);

bench([
    function set() {
        cache.set('name1', 'test1');
        cache.set('name2', 'test2');
    },
    function setLib() {
        libCache.set('name1', 'test1');
        libCache.set('name2', 'test2');
    },
], {
    runs: 10000,
});
