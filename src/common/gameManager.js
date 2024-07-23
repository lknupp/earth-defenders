import CommonEnemy from "../characters/enemies/commonEnemy.js";
import FastEnemy from "../characters/enemies/fastEnemy.js";
import StrongEnemy from "../characters/enemies/strongEnemy.js";
import Player from "../characters/player/player.js";
import Background from "../components/background/background.js";
import { createBulletAnims } from "../components/bullet/bulletAnims.js";
import { createEnemyMovementGrid, onBulletHitEnemyHandle } from "../scenes/sceneUtils.js";

/**
 * @class GameManager
 * @classdesc Game manager
 * @example
 *
 */
export default class GameManager {
    /** @type { Phaser.Scene } */
    #scene = null;
    /** @type { Array } */
    _enemies = [];
    /** @type { Array } */
    _activeEnemies = [];
    /** @type { number } */
    _nextSpawn = 0;
    /** @type { number } */
    _score = 0;
    /** @type { number } */
    _lives = 3;
    /** @type { number } */
    _level = 1;
    /** @type { number } */
    _maxLevel = 3;
    /** @type { number } */
    _maxLives = 3;
    /** @type { number } */
    _numberOfEnemies = 0;
    /** @type { Background } */
    #bg = null;
    /** @type { string } */
    #bgType = null;
    /** @type { * } */
    #gridGraph = null;
    /** @type { Array } */
    #enemies = [];
    

    /**
     * @description Create a new game manager
     * @example 
     * const gameManager = new GameManager(enemies);
     */
    constructor() {
        this._score = 0;
        this._lives = 3;
        this._level = 1;
        this._maxLevel = 3;
        this._maxLives = 3;
        this._numberOfEnemies = 0;
    }

    /**
     * @param { Phaser.Scene } scene
     * @returns {void}
     * @description Create the game manager
     * @example
     * gameManager.create(scene);
     */
    create(scene) {
        this.#scene = scene;

        createBulletAnims(scene.anims);

        this.#bg = new Background(scene, 0, 0, scene.scale.width, scene.scale.height, this.#bgType);
        const coordinate = {xPos: 500, yPos: 500};
        this.player = new Player(this.#scene, coordinate, 'player');
        
        this.#gridGraph = createEnemyMovementGrid(this.#scene);
        
        // this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_01', this.#gridGraph));

        for (let i = 0; i < 5; i++) {
            this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_01', this.#gridGraph));
            this.#enemies.push(new FastEnemy(this.#scene, 'PIRATE_ENEMY_02', this.#gridGraph));
            // this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_03', this.#gridGraph));
            // this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_04', this.#gridGraph));
            this.#enemies.push(new StrongEnemy(this.#scene, 'PIRATE_ENEMY_05', this.#gridGraph));
            // this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_06', this.#gridGraph));
        }
        
        
        scene.physics.add.overlap(this.player.weaponGroup, this.#enemies, onBulletHitEnemyHandle, null, this.#scene);

    }

    update() {
        this.#bg.update();
        this.player.update();

        this._activeEnemies.forEach(enemy => {
            enemy.update();
        });
        

        if (this._numberOfEnemies < 8) {
            console.log('Spawn enemy');
            this._numberOfEnemies++;
            const nextEnemy = this.#enemies[this._nextSpawn];
            if (this._nextSpawn < this.#enemies.length - 1) {
                this._nextSpawn++;
            }
            else {
                this._nextSpawn = 0;
            }
            nextEnemy._spawn();
            this._activeEnemies.push(nextEnemy);
        }
        
    }    

    


}