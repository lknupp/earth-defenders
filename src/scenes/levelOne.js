import Enemy from "../characters/enemies/enemy.js";
import Player from "../characters/player/player.js";
import Background from "../components/background/background.js";
import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { onBulletHitEnemyHandle } from "./sceneCollisionHandle.js";
import { SCENCE_KEYS } from "./sceneKeys.js";

export default class LevelOne extends Phaser.Scene {
    /** @type { string } */
    #bgType = null;
    /** @type { Background } */
    #bg = null;
    constructor() {
        super({
            key: SCENCE_KEYS.LEVEL_ONE
        });

        this.player = null;
        this.enemies = [];
        this.#bgType = BACKGROUND_KEY.BACKGROUND_04;
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
        // Background.create(
        //     this,
        //     this.#bgType,
        // );

        this.#bg = new Background(this, 0, 0, this.scale.width, this.scale.height, this.#bgType);
        const coordinate = {xPos: 500, yPos: 500};
        this.player = new Player(this, coordinate, 'player');

        this.enemies.push(new Enemy(this, {xPos: 100, yPos: 100}, 'PIRATE_ENEMY_01'));

        this.enemies.push(new Enemy(this, {xPos: 200, yPos: 200}, 'PIRATE_ENEMY_02'));
        
        this.physics.add.overlap(this.player.weaponGroup, this.enemies, onBulletHitEnemyHandle, null, this);
    }

    update() {
        this.#bg.update();
        this.player.update();
        this.enemies.forEach(enemy => {
            enemy.update();
        });
    }

}