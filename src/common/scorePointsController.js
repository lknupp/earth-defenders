export default class ScorePointsController {
    /** @type { Phaser.Scene } */
    #scene = null;
    /** @type { Phaser.GameObjects.Text } */
    #label = null;
    /** @type { integer } */
    #score = 0;
    
    /**
     * @constructor
     * @param { Phaser.Scene } scene - The scene object
     * @param { Phaser.GameObjects.Text } label - The label to display the score
     */
    constructor (scene, label) {
        this.#scene = scene;
        this.#label = label;
    }

    /**
     * @returns {void}
     * @description Update the score
     * @example
     * this.update();
     */
    update() {
        this.#label.setText(`Score: ${this.#score}`);
    }

    /**
     * @returns {void}
     * @description Update the score
     * @param {number} points - The points to update the score
     * @example
     * this.updateScore(100);
     */
    updateScore(points) {
        this.#score += points;
    }
}