// Private properties
const dll = Symbol('dll');
const cache = Symbol('cache');
const head = Symbol('head');
const tail = Symbol('tail');
const len = Symbol('len');
const maxLen = Symbol('maxLen');

// Private methods
const makeHead = Symbol('makeHead');
const removeTail = Symbol('removeTail');

const REL = {
    PREV : 0,
    NEXT : 1,
};

export default class LRUCache {
    constructor(maxLength = 100) {
        if (maxLength < 2) {
            throw new Error(`You might not need cache for this maxLen: ${maxLength}!!`);
        }

        this[cache] = {};
        this[dll] = {};

        this[head] = null;
        this[tail] = null;
        this[len] = 0;
        this[maxLen] = maxLength;
    }

    [makeHead](key) {
        // Reducing operations if this is the head-key
        if (this[head] === key) return this[cache][key];

        const [prev, next] = this[dll][key];
        this[dll][next][REL.PREV] = prev;

        if (prev) {
            this[dll][prev][REL.NEXT] = next;
        } else {
            this[tail] = next;
        }

        // Setting This as the new Head
        this[dll][this[head]][REL.NEXT] = key;
        this[dll][key] = [this[head], null];
        this[head] = key;
    }

    [removeTail]() {
        const [_, next] = this[dll][this[tail]];
        this[dll][next][REL.PREV] = null;
        delete this[cache][this[tail]];
        delete this[dll][this[tail]];
        this[tail] = next;
        this[len]--;
    }

    get(key) {
        key += '';

        // Filtering unavailable keys
        if (!(key in this[cache])) return null;

        this[makeHead](key);
        return this[cache][key];
    }

    set(key, val) {
        key += '';

        if (key in this[cache]) {
            this[cache][key] = val;
            this[makeHead](key);
            return true;
        }

        // Add it into the Cache
        this[dll][key] = [this[head], null];
        this[cache][key] = val;
        this[len]++;

        /**
         * Below line is equivalent to:
         * this[head] && (this[dll][this[head]][REL.NEXT] = key);
         * this[head] = key;
         */
        this[head] = (this[dll][this[head]] || {})[REL.NEXT] = key;

        if (this[tail]) {
            // Remove last node if len is greater than maxLimit
            if (this[len] > this[maxLen]) {
                this[removeTail]();
            }
        } else {
            this[tail] = key;
        }
    }

    reset() {
        this[cache] = {};
        this[dll] = {};
        this[len] = 0;
        this[head] = this[tail] = null;
    }
}


if (require.main === module) {
    const lruCache = new LRUCache(3);
    lruCache.set('name1', 'test1');
    lruCache.set('name2', 'test2');
    lruCache.set('name3', 'test3');
    lruCache.set('name4', 'test4');

    lruCache.get('name4');
    lruCache.get('name3');
    lruCache.get('name2');
    lruCache.get('name1');
}
