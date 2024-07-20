import Enemy from "../characters/enemies/enemy.js";
import Player from "../characters/player/player.js";
import Background from "../components/background/background.js";
import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { onBulletHitEnemyHandle, createEnemyMovementGrid } from "./sceneUtils.js";
import { SCENCE_KEYS } from "./sceneKeys.js";
import { createBulletAnims } from "../components/bullet/bulletAnims.js";
import EnemyGroup from "../characters/enemies/enemyGoup.js";
import CommonEnemy from "../characters/enemies/commonEnemy.js";

export default class LevelOne extends Phaser.Scene {
    /** @type { string } */
    #bgType = null;
    /** @type { Background } */
    #bg = null;
    /** @type { * } */
    #gridGraph = null;
    #enemyNumber = 0;

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

        // this.load.image(BACKGROUND_KEY.BACKGROUND_01, 'assets/background/01/BG.png');
                     
        this.load.spritesheet(
            'cannon', 
            'assets/weapon/ship_01/cannon.png',
            { frameWidth: 22, frameHeight: 60 });            
    }

    create() {
        createBulletAnims(this.anims);
        this.#bg = new Background(this, 0, 0, this.scale.width, this.scale.height, this.#bgType);
        const coordinate = {xPos: 500, yPos: 500};
        this.player = new Player(this, coordinate, 'player');
        
        this.#gridGraph = createEnemyMovementGrid(this);
    
        for (let i = 0; i < 5; i++) {
            this.enemies.push(new CommonEnemy(this, 'PIRATE_ENEMY_01', this.#gridGraph));
        }
        // this.enemies.push(new Enemy(this, 'PIRATE_ENEMY_01'));

        // this.enemyGroup = new EnemyGroup(this, new Enemy(this, enemyStartPosition, 'PIRATE_ENEMY_01'));
        // this.enemies.push(new Enemy(this, enemyStartPosition, 'PIRATE_ENEMY_01'));
        // this.enemies.push(new Enemy(this, enemyStartPosition, 'PIRATE_ENEMY_01'));
        // this.enemies.push(new Enemy(this, enemyStartPosition, 'PIRATE_ENEMY_01'));
        // this.enemies.push(new Enemy(this, enemyStartPosition, 'PIRATE_ENEMY_01'));
        // this.enemies.push(new Enemy(this, enemyStartPosition, 'PIRATE_ENEMY_01'));
                
        this.physics.add.overlap(this.player.weaponGroup, this.enemies, onBulletHitEnemyHandle, null, this);
    }

    /**
     * @returns {void}
     * @description Update the game state
     * @example
     * this.update();
     */
    update() {
        // if (this.#enemyNumber <= 6) {
        //     const xPos = this.scale.width / 2;
        //     const yPos = -1000;
        //     this.enemyGroup.spawnEnemy(xPos, yPos);
        //     this.#enemyNumber++;
        // }
        
        this.#bg.update();
        this.player.update();
        this.enemies.forEach(enemy => {
            enemy.update(this.#gridGraph);
        });
    }

}