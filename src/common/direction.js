/**
 * @typedef {keyof typeof DIRECTION} Direction
 */
/** @enum {Direction} */
export const DIRECTION = Object.freeze({
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    DIAGONAL_UP: "DIAGONAL_UP",
    DIAGONAL_DOWN: "DIAGONAL_DOWN",
    IDLE: "IDLE",
});