
// Symbols for Objects and constants
const MAX_LIMIT = Symbol('MAX_LIMIT');
const CACHE = Symbol('CACHE');
const DLL = Symbol('DLL');

// Symbol for Private Methods
const cached = Symbol('cached');
const removeLastNode = Symbol('removeLastNode');
const findNode = Symbol('findNode');
const removeNode = Symbol('removeNode');
const addNode = Symbol('addNode');
export default class LRUCache {
    constructor(maxLimit = 100) {
        if (+maxLimit > 100) {
            throw Error('LIMIT > 100 can cost a lot of RAM, In such cases please think about Redis!!!');
        }

        // Max Cache Size
        this[MAX_LIMIT] = +maxLimit;

        // Used to check if the key exists (Format [key]: boolean)
        this[CACHE] = {};

        // Doubly-Linked-list for storing and re-ordering of data
        this[DLL] = {
            length    : 0,
            startNode : null,
            endNode   : null,
        };
    }

    [cached](key) {
        return (key in this[CACHE]);
    }

    [removeLastNode]() {
        this[DLL].length--;
        delete this[CACHE][this[DLL].endNode.key];

        // Change endNode to the one previous to the current endNode
        const endNode = this[DLL].endNode;
        this[DLL].endNode = endNode.lNode;
        endNode.lNode.rNode = null;
    }

    [findNode](key) {
        let node = this[DLL].startNode;
        while (node.key !== key) {
            node = node.rNode;
        }
        return node;
    }

    [removeNode](key) {
        this[DLL].length--;
        delete this[CACHE][key];

        const node = this[findNode](key);

        const { lNode, rNode } = node;

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

    [addNode](key, val) {
        this[DLL].length++;
        this[CACHE][key] = true;

        // Make the new node as the startNode
        const prevStartNode = this[DLL].startNode;
        const newNode = {
            key,
            val,
            rNode : prevStartNode,
            lNode : null,
        };

        this[DLL].startNode = newNode;
        prevStartNode && (prevStartNode.lNode = newNode);

        // If this is the first node, then it would be the last as well
        if (this[DLL].length === 1) {
            this[DLL].endNode = newNode;
        }
    }


    set(key, val) {
        // Overriding Logic
        if (this[cached](key)) {
            const node = this[findNode](key);
            node.val = val;
        } else {
            // Set New Key
            this[addNode](key, val);

            if (this[DLL].length > this[MAX_LIMIT]) {
                this[removeLastNode]();
            }
        }
    }

    get(key) {
        if (this[cached](key)) {
            // Bring the Recently used key to the front (startNode)
            const node = this[removeNode](key);
            this[addNode](node.key, node.val);

            return node.val;
        }
        return null;
    }
}
