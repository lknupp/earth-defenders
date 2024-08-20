import CommonEnemy from "../characters/enemies/commonEnemy.js";
import Enemy from "../characters/enemies/enemy.js";
import FastEnemy from "../characters/enemies/fastEnemy.js";
import StrongEnemy from "../characters/enemies/strongEnemy.js";
import Player from "../characters/player/player.js";
import Background from "../components/background/background.js";
import Bullet from "../components/bullet/bullet.js";
import { createBulletAnims } from "../components/bullet/bulletAnims.js";
import HealthBar from "../components/ui/healthBar.js";
import LevelOne from "../scenes/levelOne.js";
import { createEnemyMovementGrid, onBulletHitHandle } from "../scenes/sceneUtils.js";
import CounterController from "./counterController.js";
import ScorePointsController from "./scorePointsController.js";


let gameManager = null;

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
    _activeEnemies = [];
    /** @type { number } */
    _nextSpawn = 0;
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
    /** @type { Enemy[] } */
    #enemies = [];
    /** @type { string } */
    #playerShipTexture = null;
    /** @type {CounterController} */
    #timer = null;
    /** @type {ScorePointsController} */
    #scoreController = null;
    /** @type {integer} */
    #maxEnemiesOnTheScreen = 0;

    /**
     * @description Create a new game manager
     * @example 
     * const gameManager = new GameManager(enemies);
     */
    constructor(playerShipTexture = 'PLAYER_SHIP_01') {
        if (gameManager) {
            return gameManager;
        }
        this._score = 0;
        this._lives = 3;
        this._level = 1;
        this._maxLevel = 3;
        this._maxLives = 3;
        this._numberOfEnemies = 0;
        this.#maxEnemiesOnTheScreen = 6;
        this.#playerShipTexture = playerShipTexture;

        gameManager = this;
    }

    /**
     * @param { Phaser.Scene } scene
     * @param { string } bgType
     * @param { string } playerShipTexture
     * @returns {void}
     * @description Preload game assets
     * @example
     * gameManager.preload(scene);
     */
    static preload(scene, bgType, playerShipTexture) {
        Player.preload(scene, playerShipTexture);
        Enemy.preload(scene, LevelOne.name);
        Background.preload(
            scene,
            bgType,
        );

        Bullet.preload(scene);

        HealthBar.preload(scene);

    }

    /**
     * @param { Phaser.Scene } scene
     * @returns {void}
     * @description Create the game manager
     * @example
     * gameManager.create(scene);
     */
    create(scene) {
        const coordinate = {xPos: 500, yPos: 500};
        const timerLabel = scene.add.text(scene.scale.width / 2, 50, '0', {fontSize: 48}).setOrigin(0.5).setDepth(1);

        const scoreLabel = scene.add.text(150, 50, '0', {fontSize: 48}).setOrigin(0.5).setDepth(1);

        this.#scene = scene;
        
        createBulletAnims(scene.anims, 'PLAYER_SHOT_04');
        createBulletAnims(scene.anims, 'PIRATE_ENEMY_BULLET_01');
        
        this.#bg = new Background(scene, 0, 0, scene.scale.width, scene.scale.height, this.#bgType);
        this.player = new Player(this.#scene, coordinate, this.#playerShipTexture);
        this.#gridGraph = createEnemyMovementGrid(this.#scene);
        
        this.#timer = new CounterController(scene, timerLabel);

        this.#scoreController = new ScorePointsController(scene, scoreLabel);
        

        for (let i = 0; i < 6; i++) {
            this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_01', this.#gridGraph));
            this.#enemies.push(new FastEnemy(this.#scene, 'PIRATE_ENEMY_02', this.#gridGraph));
            this.#enemies.push(new StrongEnemy(this.#scene, 'PIRATE_ENEMY_05', this.#gridGraph));
        }
        
        this.#enemies.forEach(enemy => {
            scene.physics.add.overlap(enemy._weaponGroup, this.player, onBulletHitHandle, null, this.#scene);
        })
        scene.physics.add.overlap(this.player.weaponGroup, this.#enemies, onBulletHitHandle, null, this.#scene);
    }
    
    update() {
        this.#bg.update();
        this.player.update();
        this.#timer.update();
        this.#scoreController.update();

        this._activeEnemies.forEach(enemy => {
            enemy.update();
        });
        

        if (this._numberOfEnemies < this.#maxEnemiesOnTheScreen) {
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

    static getInstance() {
        return this;
    }

    /**
     * @returns {void}
     * @description Update the score
     * @example
     * gameManager.updateScore(100);
     */
    updateScore(score) {
        this.#scoreController.updateScore(score);
    }


}