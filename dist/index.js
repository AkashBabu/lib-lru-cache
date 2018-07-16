'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _symbol = require('babel-runtime/core-js/symbol');var _symbol2 = _interopRequireDefault(_symbol);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Private properties
var dll = (0, _symbol2.default)('dll');
var cache = (0, _symbol2.default)('cache');
var head = (0, _symbol2.default)('head');
var tail = (0, _symbol2.default)('tail');
var len = (0, _symbol2.default)('len');
var maxLen = (0, _symbol2.default)('maxLen');

// Private methods
var makeHead = (0, _symbol2.default)('makeHead');
var removeTail = (0, _symbol2.default)('removeTail');

var REL = {
    PREV: 0,
    NEXT: 1 };var


LRUCache = function () {
    function LRUCache() {var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;(0, _classCallCheck3.default)(this, LRUCache);
        if (maxLength < 2) {
            throw new Error('You might not need cache for this maxLen: ' + maxLength + '!!');
        }

        this[cache] = {};
        this[dll] = {};

        this[head] = null;
        this[tail] = null;
        this[len] = 0;
        this[maxLen] = maxLength;
    }(0, _createClass3.default)(LRUCache, [{ key:

        makeHead, value: function value(key) {
            // Reducing operations if this is the head-key
            if (this[head] === key) return this[cache][key];var _dll$key = (0, _slicedToArray3.default)(

            this[dll][key], 2),prev = _dll$key[0],next = _dll$key[1];
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
        } }, { key:

        removeTail, value: function value() {var _dll$tail = (0, _slicedToArray3.default)(
            this[dll][this[tail]], 2),_ = _dll$tail[0],next = _dll$tail[1];
            this[dll][next][REL.PREV] = null;
            delete this[cache][this[tail]];
            delete this[dll][this[tail]];
            this[tail] = next;
            this[len]--;
        } }, { key: 'get', value: function get(

        key) {
            key += '';

            // Filtering unavailable keys
            if (!(key in this[cache])) return null;

            this[makeHead](key);
            return this[cache][key];
        } }, { key: 'set', value: function set(

        key, val) {
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
        } }, { key: 'reset', value: function reset()

        {
            this[cache] = {};
            this[dll] = {};
            this[len] = 0;
            this[head] = this[tail] = null;
        } }]);return LRUCache;}();exports.default = LRUCache;



if (require.main === module) {
    var lruCache = new LRUCache(3);
    lruCache.set('name1', 'test1');
    lruCache.set('name2', 'test2');
    lruCache.set('name3', 'test3');
    lruCache.set('name4', 'test4');

    lruCache.get('name4');
    lruCache.get('name3');
    lruCache.get('name2');
    lruCache.get('name1');
}