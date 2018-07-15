import Benchmark from 'benchmark';
import LRUCache from '../dist';

const suite = new Benchmark.Suite();

const cache = new LRUCache(1000);

suite
.add('LRUCache#set', () => {
    cache.set('name', 'test');
})
.add('LRUCache#get', () => {
    cache.get('name', 'test');
})
.add('LRUCache#regression', () => {
    for (let i = 0; i < 2000; i++) {
        cache.set(`name${i}`, 'test');
    }
    for (let i = 0; i < 2000; i++) {
        cache.get(`name${i}`);
    }
    for (let i = 0; i < 2000; i++) {
        cache.set(`name${i + i}`, 'test');
    }
})
.on('cycle', event => {
    console.log(String(event.target));
})
.run({ async: true });
