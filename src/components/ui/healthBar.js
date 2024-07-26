import { BAR_ASSET_KEYS, UI_ASSETS_ROOT_PATH } from "./uiAssetKeys.js";

export default class HealthBar extends Phaser.GameObjects.Container {
    /** @type { Phaser.Scene } */
    #scene = null;
    /** @type { Phaser.GameObjects.Image } */
    #healthBarBG = null;
    /** @type { Phaser.GameObjects.Image[] } */
    #healthBar = [];

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {integer} lifePoints 
     * @description Create a new health bar
     * @example
     * const healthBar = new HealthBar(scene, 100);
     */
    constructor(scene, lifePoints) {
        super(scene);
        this.#scene = scene;

        const healthBarBg =  scene.add.image(0, 0, BAR_ASSET_KEYS.HEALTH_BAR_TABLE).setOrigin(0, 0)
        healthBarBg.setDisplaySize(300, 30)
        
        const healthBar = this.#createHealthBar(0, 0, lifePoints);
        
        scene.add.container(
            0, 
            scene.scale.height - 55,
            [
                healthBarBg,
                healthBar,
            ]
        );

    }

    /**
     * @param {Phaser.Scene} scene
     * @returns {void}
     * @description Preload health bar assets
     * @example
     * HealthBar.preload(this);
     */
    static preload(scene) {
        scene.load.image(BAR_ASSET_KEYS.HEALTH_BAR_TABLE, UI_ASSETS_ROOT_PATH.BAR_ASSET_KEYS + 'health_bar_table.png');
        scene.load.image(BAR_ASSET_KEYS.HEALTH_BAR_DOT, UI_ASSETS_ROOT_PATH.BAR_ASSET_KEYS + 'health_bar_dot.png');
    }

    /**
     * @param {integer} x
     * @param {integer} y
     * @param {integer} lifePoints
     * @example
     * this.#createHealthBar(0, 0, 10);
     */
    #createHealthBar(x, y, lifePoints) {
        const availableSpace = 246.4;
        const healthDotWidth = availableSpace / lifePoints;

        for (let i = 0; i < lifePoints; i++) {
            const healthDot = this.#scene.add.image(
                5 + healthDotWidth * i, 
                15, 
                BAR_ASSET_KEYS.HEALTH_BAR_DOT).setOrigin(0, 0.5);

            healthDot.setDisplaySize(healthDotWidth, 22);
            this.#healthBar.push(healthDot);
        }

        const healthBarContainer = this.#scene.add.container(x, y, [...this.#healthBar]);

        return healthBarContainer;
    }


    /**
     * @param {integer} currLifePoints
     * @param {integer} quantity
     * @returns {void}
     * @description Disable health bar dots
     * @example
     * healthBar.disableHealthBar(10, 2);
     */
    disableHealthBarDot(currLifePoints, quantity) {
        if (currLifePoints < quantity) {
            quantity = currLifePoints;
        }

        for (let i = 0; i < quantity; i++) {
            this.#healthBar[currLifePoints - i - 1].setVisible(false);
        }        
    }

    /**
     * @param {integer} currLifePoints
     * @param {integer} quantity
     * @returns {void}
     * @description Enable health bar dots
     * @example
     * healthBar.enableHealthBar(10, 2);
     */
    enableHealthBarDot(currLifePoints, quantity) {
        const healthBarLength = this.#healthBar.length
        const totalLifePoints = currLifePoints + quantity;
        
        if (totalLifePoints > healthBarLength) {
            quantity = quantity - (totalLifePoints - healthBarLength);
        }

        for (let i = 0; i < quantity; i++) {
            this.#healthBar[currLifePoints + i].setVisible(true);
        }
    }

}
