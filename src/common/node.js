

export default class Node {
    /** @type  { boolean } */
    #occupied = false;
    /** @type { integer[] } */
    #adjacentNodes = [];
    /** @type { import("../types/typedef").Coordinate } */
    #coordinate = null;

    /**
     * @param { import("../types/typedef").Coordinate } coordinate
     * @param { integer[] } adjancentNodes
     * @description Create a new node
     * @example
     * new Node({x: 0, y: 0}, [1, 2, 3]);
     */
    constructor(coordinate, adjancentNodes) {
        this.#coordinate = coordinate;
        this.#adjacentNodes = adjancentNodes;
    }

    /**
     * @returns { boolean }
     * @description Get the occupied value
     * @example
     * this.node.occupied;
     */
    get occupied() {
        return this.#occupied;
    }

    /**
     * @param { boolean } value
     * @description Set the occupied value
     * @example
     * this.node.occupied = true;
     */
    set occupied(value) {
        this.#occupied = value;
    }

    /**
     * @returns { integer[] }
     * @description Get the adjacent nodes
     * @example
     * this.node.adjacentNodes;
     */
    get adjacentNodes() {
        return this.#adjacentNodes;
    }

    /**
     * @returns { import("../types/typedef").Coordinate }
     * @description Get the coordinate
     * @example
     * this.node.coordinate;
     */
    get coordinate() {
        return this.#coordinate;
    }
}