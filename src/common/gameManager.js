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
import Ranking from "./ranking.js";
import ScorePointsController from "./scorePointsController.js";
import User from "./user.js";


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
    /** @type { Player } */
    #player = null;
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
    /** @type {boolean} */
    #isGameOver = false;
    /** @type {boolean} */
    #increaseDifficulty = false;

    /**
     * @description Create a new game manager
     * @example 
     * const gameManager = new GameManager(enemies);
     */
    constructor(scene, playerShipTexture = 'PLAYER_SHIP_01') {
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
        this.#scene = scene;

        gameManager = this;
    }

    get isGameOver() {
        return this.#isGameOver;
    }

    getScore() {
        return this.#scoreController.score;
    }

    getTime() {
        return (this.#timer.duration / 1000).toFixed(2);
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
        
        createBulletAnims(scene.anims, 'PLAYER_SHOT_04');
        createBulletAnims(scene.anims, 'PIRATE_ENEMY_BULLET_01');
        
        this.#bg = new Background(scene, 0, 0, scene.scale.width, scene.scale.height, this.#bgType);
        this.#player = new Player(this.#scene, coordinate, this.#playerShipTexture);
        this.#gridGraph = createEnemyMovementGrid(this.#scene);
        
        this.#timer = new CounterController(scene, timerLabel);

        this.#scoreController = new ScorePointsController(scene, scoreLabel);
        

        for (let i = 0; i < 6; i++) {
            this.#enemies.push(new CommonEnemy(this.#scene, 'PIRATE_ENEMY_01', this.#gridGraph));
            this.#enemies.push(new FastEnemy(this.#scene, 'PIRATE_ENEMY_02', this.#gridGraph));
            this.#enemies.push(new StrongEnemy(this.#scene, 'PIRATE_ENEMY_05', this.#gridGraph));
        }
        
        this.#enemies.forEach(enemy => {
            scene.physics.add.overlap(enemy._weaponGroup, this.#player, onBulletHitHandle, null, this.#scene);
        })
        scene.physics.add.overlap(this.#player.weaponGroup, this.#enemies, onBulletHitHandle, null, this.#scene);
    }
    
    update() {
        
        if (!this.#player.isAlive && !this.#isGameOver) {
            gameManager = null;
            this.#isGameOver = true;
            this.#timer.stop();
            this.#saveRanking();
        }

        this.#bg.update();
        if (!this.#isGameOver) {
            this.#player.update();
            this.#timer.update();
            this.#scoreController.update();
         
        }

        if (this.#timer.duration > 40000 * this._level) {
            this.#increaseDifficulty = true;
            if(this._level % 3 === 0 && this.#maxEnemiesOnTheScreen < 10) {
                this.#maxEnemiesOnTheScreen += 1;
            }
            this._level++;
        }
        
        this._activeEnemies.forEach(enemy => {
            enemy.update();
            if (this.#increaseDifficulty) {
                this.#increaseEnemyDifficulty(enemy);
            }
        });

        this.#increaseDifficulty = false;
        

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


    #saveRanking() {
        const userId = new User().userId;
        const time = this.#timer.duration;
        const score = this.#scoreController.score;
        const ranking  = new Ranking(userId, time, score);

        ranking.save();
    }

    /**
     * @param {Enemy} enemy
     * @returns {void}
     * @description Increase enemy difficulty
     * @example
     * gameManager.increaseEnemyDifficulty(enemy);
     */
    #increaseEnemyDifficulty(enemy) {
        if (enemy._speed < 3 && this._level % 2 === 0) {
            enemy._speed += 0.1;
        }

        if (enemy._movementRate > 0) {
            enemy._movementRate -= 20;
        }
        
        if (enemy._weapon.bulletSpeed < 500) {
            enemy._weapon.bulletSpeed += 10;
        }

        if (enemy._weapon.fireRate > 100) {
            enemy._weapon.fireRate -= 10;
        }
        
        enemy._enemyPoints += 20;
    }
}