import { expect } from 'chai';

import LRUCache from '../src';

describe('#cache LRU Cache', () => {
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

    it('should throw Error if the maxLimit > 100', () => {
        expect(() => {
            new LRUCache(101); // eslint-disable-line
        }).to.throw(Error);
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
})
;
