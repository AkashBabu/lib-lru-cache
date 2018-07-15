
// Private properties
const cache = Symbol('Cache');
const dll = Symbol('DLL');
const head = Symbol('Head');
const tail = Symbol('Tail');
const len = Symbol('Length');
const maxLen = Symbol('MaxLength');

// Private methods
const remove = Symbol('Remove');
const setHead = Symbol('SetHead');
const makeHead = Symbol('MakeHead');

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

    [remove](key) {
        if (!(key in this[cache])) {
            return true;
        }

        const [prev, next] = this[dll][key];
        if (next) {
            this[dll][next][REL.PREV] = prev;
        } else {
            this[head] = prev;
            this[head] && (this[dll][this[head]][REL.NEXT] = null);
        }

        if (prev) {
            this[dll][prev][REL.NEXT] = next;
        } else {
            this[tail] = next;
            this[tail] && (this[dll][this[tail]][REL.PREV] = null);
        }

        delete this[cache][key];
        delete this[dll][key];

        this[len]--;
    }

    [setHead](key, val) {
        this[head] && (this[dll][this[head]][REL.NEXT] = key);

        this[dll][key] = [this[head], null];
        this[head] = key;

        this[cache][key] = val;

        this[len]++;
    }

    [makeHead](key, val) {
        val = val || this[cache][key];
        this[remove](key);
        this[setHead](key, val);
    }

    reset() {
        this[cache] = {};
        this[dll] = {};
        this[head] = this[tail] = null;
    }

    get(key) {
        key += '';

        if (!(key in this[cache])) return null;
        this[makeHead](key);
        return this[cache][key];
    }

    set(key, val) {
        key += '';

        this[makeHead](key, val);
        this[len] > this[maxLen] && this[remove](this[tail]);

        !this[tail] && (this[tail] = key);
    }
}
