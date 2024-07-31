import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { SCENCE_KEYS } from "./sceneKeys.js";
import GameManager from "../common/gameManager.js";


export default class LevelOne extends Phaser.Scene {
    /** @type { string } */
    #bgType = null;
    /** @type { * } */
    #gridGraph = null;
    /** @type { GameManager } */
    #gameManager = null;
    /** @type { string } */
    #playerShipTexture = null;


    /**
     * @constructor
     * @description Create a new level one scene
     * @example
     * const levelOne = new LevelOne();
     */
    constructor() {
        super({
            key: SCENCE_KEYS.LEVEL_ONE
        });

        console.log(this);

        this.player = null;
        this.enemies = [];
    }

    init(data) {
        this.#bgType = data.bgType;
        this.#playerShipTexture = data.shipTexture;
    }

    /**
     * @returns {*}
     */
    get gridGraph() {
        return this.#gridGraph;
    }

    preload() {
        GameManager.preload(this, this.#bgType, this.#playerShipTexture);
    }

    create() {
        this.#gameManager = new GameManager(this.#playerShipTexture);
        this.#gameManager.create(this);
    }

    /**
     * @returns {void}
     * @description Update the game state
     * @example
     * this.update();
     */
    update() {
        this.#gameManager.update();        
    }
    
}