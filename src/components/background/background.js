import { 
    BACKGROUND_BASE__FILE_PATH, 
    BACKGROUND_LAYERS 
} from "./backgroundKeysConfig.js";

export default class Background extends Phaser.GameObjects.TileSprite {
    /** @type { Phaser.GameObjects.TileSprite } */
    #background = null;
    #metors = null;
    #planets = null;
    #stars = null;

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} texture
     */
    constructor(scene, x, y, width, height, texture) {
        super(scene, x, y, width, height, texture);

        this.#background = scene.add.tileSprite(
            0, 
            0, 
            scene.scale.width, 
            scene.scale.height, 
            "BACKGROUND"
        ).setOrigin(0, 0);
        this.#metors = scene.add.tileSprite(
            0, 
            0, 
            scene.scale.width, 
            scene.scale.height, 
            "METEORS"
        ).setOrigin(0, 0);
        this.#planets = scene.add.tileSprite(
            0, 
            0, 
            scene.scale.width, 
            scene.scale.height, 
            "PLANETS"
        ).setOrigin(0, 0);
        this.#stars = scene.add.tileSprite(
            0, 
            0, 
            scene.scale.width, 
            scene.scale.height, 
            "STARS"
        ).setOrigin(0, 0);
        
    }

    /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @returns {void}
     * @description Preload background assets
     * @example
     * Background.preload(this);
     */
    static preload(scene, texture) {
        if (!BACKGROUND_BASE__FILE_PATH[texture]) {
            console.error(`Invalid texture: ${texture}`);
            return;
        }

        const layers = Object.keys(BACKGROUND_LAYERS)
        for (const layer of layers) {
            const layerPath = BACKGROUND_BASE__FILE_PATH[texture] + BACKGROUND_LAYERS[layer];
            scene.load.image(layer, layerPath);
            // console.log(layerPath);
            // console.log(layer.valueOf());
            // console.log(layer);
        }
        
    }

    /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @returns {void}
     * @description Create background layers
     * @example
     * Background.create(this, BACKGROUND_KEY.BACKGROUND_01);
     */
    static create(scene, texture) {
        if (!BACKGROUND_BASE__FILE_PATH[texture]) {
            console.error(`Invalid texture: ${texture}`);
            return;
        }

        const layers = Object.keys(BACKGROUND_LAYERS);
        for (const layer of layers) {

            scene.add.tileSprite(0, 0, scene.scale.width, scene.scale.height, layer).setOrigin(0, 0);
        }
        
        
    }

    /**
     * @returns {void}
     * @description Update background
     * @example
     * background.update();
     */
    update() {
        this.#background.tilePositionY -= 100;
        this.#metors.tilePositionY -= 5;
        this.#planets.tilePositionY -= 0.05;
        this.#stars.tilePositionY -= 2;
    }

}