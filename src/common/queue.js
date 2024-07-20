import QueueNode from "./queueNode.js";

export default class Queue {
    /** @type {QueueNode} */
    #head = null;
    /** @type {QueueNode} */
    #tail = null;
    /** @type {integer} */
    #length = 0;

    constructor() {
        this.#head = null;
        this.#length = 0;
    }

    /**
     * @returns {integer}
     */
    get length() {
        return this.#length;
    }

    /**
     * @param {QueueNode} node
     * @returns {void}
     */
    enqueue(node) {
        if (this.#head === null) {
            this.#head = node;
            this.#tail = node;
        } else {
            const lastNode = this.#tail;
            lastNode.next = node;
            this.#tail = node;
        }
        this.#length++;
    }

    /**
     * @returns {QueueNode}
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        else if (this.#head === this.#tail) {
            const node = this.#head;
            this.#head = null;
            this.#tail = null;
            this.#length--;

            return node;
        }

        const node = this.#head;
        this.#head = this.#head.next;
        this.#length--;

        return node;
    }

    /**
     * @returns {boolean}
     * @description Check if the queue is empty
     * @example
     * queue.isEmpty();
     */
    isEmpty() {
        return this.#length === 0;
    }

    /**
     * @returns {void}
     * @description Clear the queue
     * @example
     * queue.clear();
     */
    clear() {
        while (!this.isEmpty()) {
            this.dequeue();
        }
    }
}