export default class QueueNode {
    /** @type {import("../types/typedef").Coordinate} */
    #value = null;
    /** @type {QueueNode} */
    #next = null;

    /**
     * @param {import("../types/typedef").Coordinate} value
     * @description Create a queue node
     * @example
     * const node = new QueueNode({ xPos: 0, yPos: 0 });
     */
    constructor(value) {
        this.#value = value;
        this.#next = null;
    }

    /**
     * @returns {import("../types/typedef").Coordinate}
     * @description Get the value of the node
     * @example
     * node.value;
     */
    get value() {
        return this.#value;
    }

    /**
     * @returns {QueueNode}
     * @description Get the next node
     * @example
     * node.next;
     */
    get next() {
        return this.#next;
    }

    /**
     * @param {QueueNode} node
     * @returns {void}
     * @description Set the next node
     * @example
     * node.next = nextNode;
     */
    set next(node) {
        this.#next = node;
    }
}