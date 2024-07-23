import Enemy from "../characters/enemies/enemy.js";
import Player from "../characters/player/player.js";
import Background from "../components/background/background.js";
import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { onBulletHitEnemyHandle, createEnemyMovementGrid } from "./sceneUtils.js";
import { SCENCE_KEYS } from "./sceneKeys.js";
import { createBulletAnims } from "../components/bullet/bulletAnims.js";

import CommonEnemy from "../characters/enemies/commonEnemy.js";
import GameManager from "../common/gameManager.js";

export default class LevelOne extends Phaser.Scene {
    /** @type { string } */
    #bgType = null;
    /** @type { Background } */
    #bg = null;
    /** @type { * } */
    #gridGraph = null;
    /** @type { GameManager } */
    #gameManager = null;

    constructor() {
        super({
            key: SCENCE_KEYS.LEVEL_ONE
        });

        this.player = null;
        this.enemies = [];
        this.#bgType = BACKGROUND_KEY.BACKGROUND_04;
    }

    /**
     * @returns {*}
     */
    get gridGraph() {
        return this.#gridGraph;
    }

    preload() {
        Player.preload(this);
        Enemy.preload(this, LevelOne.name);
        Background.preload(
            this,
            this.#bgType,
        );

                     
        this.load.spritesheet(
            'cannon', 
            'assets/weapon/ship_01/cannon.png',
            { frameWidth: 22, frameHeight: 60 });            
    }

    create() {
        this.#gameManager = new GameManager();
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