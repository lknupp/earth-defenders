export default class CounterController {
    /** @type {Phaser.Scene} */
    #scene;
    /** @type {Phaser.GameObjects.Text} */
    #label;
    /** @type {number} */
    #duration = 0;
    /** @type {boolean} */
    #isRunning = false;
    /** @type {number} */
    #startTime = 0;
    

    /**
     * @constructor
     * @param {Phaser.Scene} scene - The scene object
     * @param {Phaser.GameObjects.Text} label - The label to display the countdown
     */
    constructor(scene, label) {
        this.#scene = scene;
        this.#label = label;
        this.#isRunning = true;
        this.#startTime = scene.time.now;
    }

    /**
     * @description Stop Counter
     * @example
     * counter.stop();
     */
    stop() {
        this.#isRunning = false;
    }

    update() {
        if (!this.#isRunning) return;
        
        const elapsedTime = this.#scene.time.now - this.#startTime;
        const seconds = elapsedTime / 1000;

        this.#label.text = seconds.toFixed(0);
    }
}