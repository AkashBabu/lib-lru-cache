'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Private properties
var cache = (0, _symbol2.default)('Cache');
var dll = (0, _symbol2.default)('DLL');
var head = (0, _symbol2.default)('Head');
var tail = (0, _symbol2.default)('Tail');
var len = (0, _symbol2.default)('Length');
var maxLen = (0, _symbol2.default)('MaxLength');

// Private methods
var remove = (0, _symbol2.default)('Remove');
var setHead = (0, _symbol2.default)('SetHead');
var makeHead = (0, _symbol2.default)('MakeHead');

var REL = {
    PREV: 0,
    NEXT: 1
};

var LRUCache = function () {
    function LRUCache() {
        var maxLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        (0, _classCallCheck3.default)(this, LRUCache);

        if (maxLength < 2) {
            throw new Error('You might not need cache for this maxLen: ' + maxLength + '!!');
        }

        this[cache] = {};
        this[dll] = {};

        this[head] = null;
        this[tail] = null;
        this[len] = 0;
        this[maxLen] = maxLength;
    }

    (0, _createClass3.default)(LRUCache, [{
        key: remove,
        value: function value(key) {
            if (!(key in this[cache])) {
                return true;
            }

            var _dll$key = (0, _slicedToArray3.default)(this[dll][key], 2),
                prev = _dll$key[0],
                next = _dll$key[1];

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
    }, {
        key: setHead,
        value: function value(key, val) {
            this[head] && (this[dll][this[head]][REL.NEXT] = key);

            this[dll][key] = [this[head], null];
            this[head] = key;

            this[cache][key] = val;

            this[len]++;
        }
    }, {
        key: makeHead,
        value: function value(key, val) {
            val = val || this[cache][key];
            this[remove](key);
            this[setHead](key, val);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this[cache] = {};
            this[dll] = {};
            this[head] = this[tail] = null;
        }
    }, {
        key: 'get',
        value: function get(key) {
            key += '';

            if (!(key in this[cache])) return null;
            this[makeHead](key);
            return this[cache][key];
        }
    }, {
        key: 'set',
        value: function set(key, val) {
            key += '';

            this[makeHead](key, val);
            this[len] > this[maxLen] && this[remove](this[tail]);

            !this[tail] && (this[tail] = key);
        }
    }]);
    return LRUCache;
}();

exports.default = LRUCache;