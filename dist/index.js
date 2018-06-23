'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Symbols for Objects and constants
var MAX_LIMIT = (0, _symbol2.default)('MAX_LIMIT');
var CACHE = (0, _symbol2.default)('CACHE');
var DLL = (0, _symbol2.default)('DLL');

// Symbol for Private Methods
var cached = (0, _symbol2.default)('cached');
var removeLastNode = (0, _symbol2.default)('removeLastNode');
var findNode = (0, _symbol2.default)('findNode');
var removeNode = (0, _symbol2.default)('removeNode');
var addNode = (0, _symbol2.default)('addNode');

var LRUCache = function () {
    function LRUCache() {
        var maxLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        (0, _classCallCheck3.default)(this, LRUCache);

        if (+maxLimit > 100) {
            throw Error('LIMIT > 100 can cost a lot of RAM, In such cases please think about Redis!!!');
        }

        // Max Cache Size
        this[MAX_LIMIT] = +maxLimit;

        // Used to check if the key exists (Format [key]: boolean)
        this[CACHE] = {};

        // Doubly-Linked-list for storing and re-ordering of data
        this[DLL] = {
            length: 0,
            startNode: null,
            endNode: null
        };
    }

    (0, _createClass3.default)(LRUCache, [{
        key: cached,
        value: function value(key) {
            return key in this[CACHE];
        }
    }, {
        key: removeLastNode,
        value: function value() {
            this[DLL].length--;
            delete this[CACHE][this[DLL].endNode.key];

            // Change endNode to the one previous to the current endNode
            var endNode = this[DLL].endNode;
            this[DLL].endNode = endNode.lNode;
            endNode.lNode.rNode = null;
        }
    }, {
        key: findNode,
        value: function value(key) {
            var node = this[DLL].startNode;
            while (node.key !== key) {
                node = node.rNode;
            }
            return node;
        }
    }, {
        key: removeNode,
        value: function value(key) {
            this[DLL].length--;
            delete this[CACHE][key];

            var node = this[findNode](key);

            var lNode = node.lNode,
                rNode = node.rNode;


            if (lNode) {
                if (rNode) {
                    lNode.rNode = rNode.lNode;
                } else {
                    lNode.rNode = null;
                }
            } else if (rNode) {
                this[DLL].startNode = rNode;
                rNode.lNode = null;
            } else {
                this[DLL].startNode = null;
                this[DLL].endNode = null;
            }

            return node;
        }
    }, {
        key: addNode,
        value: function value(key, val) {
            this[DLL].length++;
            this[CACHE][key] = true;

            // Make the new node as the startNode
            var prevStartNode = this[DLL].startNode;
            var newNode = {
                key: key,
                val: val,
                rNode: prevStartNode,
                lNode: null
            };

            this[DLL].startNode = newNode;
            prevStartNode && (prevStartNode.lNode = newNode);

            // If this is the first node, then it would be the last as well
            if (this[DLL].length === 1) {
                this[DLL].endNode = newNode;
            }
        }
    }, {
        key: 'set',
        value: function set(key, val) {
            // Overriding Logic
            if (this[cached](key)) {
                var node = this[findNode](key);
                node.val = val;
            } else {
                // Set New Key
                this[addNode](key, val);

                if (this[DLL].length > this[MAX_LIMIT]) {
                    this[removeLastNode]();
                }
            }
        }
    }, {
        key: 'get',
        value: function get(key) {
            if (this[cached](key)) {
                // Bring the Recently used key to the front (startNode)
                var node = this[removeNode](key);
                this[addNode](node.key, node.val);

                return node.val;
            }
            return null;
        }
    }]);
    return LRUCache;
}();

exports.default = LRUCache;