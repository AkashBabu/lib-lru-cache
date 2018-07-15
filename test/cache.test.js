import { expect } from 'chai';

import LRUCache from '../src';

describe('#cache LRU Cache', () => {
    it('should make private methods inaccessible', () => {
        const cache = new LRUCache(2);

        expect(cache.cache).to.be.undefined;
        expect(cache.dll).to.be.undefined;
        expect(cache.head).to.be.undefined;
        expect(cache.tail).to.be.undefined;
        expect(cache.len).to.be.undefined;
        expect(cache.maxLen).to.be.undefined;
        expect(cache.setHead).to.be.undefined;
        expect(cache.makeHead).to.be.undefined;
    });
    it('should make public methods accessible', () => {
        const cache = new LRUCache(2);

        expect(cache.set).to.be.a('function');
        expect(cache.get).to.be.a('function');
        expect(cache.reset).to.be.a('function');
    });

    it('should store key-value pairs', () => {
        const cache = new LRUCache(2);

        cache.set('name', 'test');

        expect(cache.get('name')).to.be.eql('test');
    });

    it('should not store more than max limit', () => {
        const cache = new LRUCache(3);

        cache.set('name1', 'test1');
        cache.set('name2', 'test2');
        cache.set('name3', 'test3');
        cache.set('name4', 'test4');

        expect(cache.get('name4')).to.be.eql('test4');
        expect(cache.get('name3')).to.be.eql('test3');
        expect(cache.get('name2')).to.be.eql('test2');
        expect(cache.get('name1')).to.be.null;
    });

    it('should override the already cache value', () => {
        const cache = new LRUCache(2);

        cache.set('name1', 'test1');
        cache.set('name1', 'test2');

        expect(cache.get('name1')).to.be.eql('test2');
    });

    it('should return null for uncached keys', () => {
        const cache = new LRUCache(2);
        expect(cache.get('name1')).to.be.null;
    });

    it('should take a default maxLimit of 100', () => {
        const cache = new LRUCache();
        for (let i = 0; i < 101; i++) {
            cache.set(`name${i}`, `test${i}`);
        }
        for (let i = 1; i < 101; i++) {
            expect(cache.get(`name${i}`)).to.be.eql(`test${i}`);
        }
        expect(cache.get('name0')).to.be.null;
    });

    it('should have masked all the private functions', () => {
        const cache = new LRUCache(2);

        const keys = Object.keys(cache);
        expect(keys).to.not.include('CACHE');
        expect(keys).to.not.include('MAX_LIMIT');
        expect(keys).to.not.include('DLL');

        cache.set('name', 'test');
        expect(cache.get('name')).to.be.eql('test');
    });

    it('should be able to numbers as keys', () => {
        const cache = new LRUCache(2);

        cache.set(1, 'test');
        expect(cache.get(1)).to.be.eql('test');
    });

    it('should be able to store numbers', () => {
        const cache = new LRUCache(2);

        cache.set('age', 21);
        expect(cache.get('age')).to.be.eql(21);
    });
    it('should be able to store objects', () => {
        const cache = new LRUCache(2);

        const address = { line1: 'line1', line2: 'line2' };
        cache.set('address', address);
        expect(cache.get('address')).to.eql(address);
    });

    it('should be able to reset cache', () => {
        const cache = new LRUCache(3);

        cache.set('name1', 'test1');
        cache.set('name2', 'test2');
        cache.set('name3', 'test3');

        cache.reset();

        expect(cache.get('name1')).to.be.null;
        expect(cache.get('name2')).to.be.null;
        expect(cache.get('name3')).to.be.null;
    });
})
;
