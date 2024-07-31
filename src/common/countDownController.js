export default class CountDownController {
    /** @type {Phaser.Scene} */
    #scene;
    /** @type {Phaser.GameObjects.Text} */
    #label;
    /** @type {Phaser.Time.TimerEvent} */
    #timerEvent;
    /** @type {number} */
    #duration = 0;
    /** @type {function} */
    #finishTimerCallback = null;

    /**
     * @constructor
     * @param {Phaser.Scene} scene - The scene object
     * @param {Phaser.GameObjects.Text} label - The label to display the countdown
     */
    constructor(scene, label) {
        this.#scene = scene;
        this.#label = label;
    }


    /**
     * @returns {void}
     * @description Start the countdown
     * @param {number} duration - The duration of the countdown
     * @param {function} callback - The callback function to execute after the countdown
     * @example
     * this.start(300000, () => {
     *    console.log('Countdown complete');
     * }
     */
    start(duration= 300000, callback = null) {
        this.stop();
        this.#finishTimerCallback = callback;
        this.#duration = duration;

        this.#timerEvent = this.#scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.stop();
                if (this.#finishTimerCallback) {
                    this.#finishTimerCallback();
                }
            },
        });
    }

    stop() {
        if (this.#timerEvent) {
            this.#timerEvent.destroy();
            this.#timerEvent = null;
        }
    }

    update() {
        if (!this.#timerEvent || this.#duration <= 0) return;

        const elapsedTime = this.#timerEvent.getElapsed();
        const remainingTime = this.#duration - elapsedTime;
        const seconds = remainingTime / 1000;

        this.#label.text = seconds.toFixed(0);

        if (remainingTime <= 0) {
            this.stop();
            if (this.#finishTimerCallback) {
                this.#finishTimerCallback();
            }
        }
    }

    
}