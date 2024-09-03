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

    get duration() {
        return this.#duration;
    }

    /**
     * @description Stop Counter
     * @example
     * counter.stop();
     */
    stop() {
        this.#isRunning = false;
        this.#duration = this.#scene.time.now - this.#startTime;
    }

    update() {
        if (!this.#isRunning) return;
        
        this.#duration = this.#scene.time.now - this.#startTime;
        const seconds = this.#duration / 1000;

        this.#label.text = seconds.toFixed(0);
    }
}