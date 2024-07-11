import  Scene  from "../../lib/phaser.js";
import LevelOne from "../../scenes/levelOne.js";
import { createEnemyAnims } from "./enemiesAnims.js";
import { ENEMY_PIRATE_SPRITE_JSON } from "./enemyConfig.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    /** @type { integer } */
    _movementXSpeed = 100;
    /** @type { integer } */
    _movementYSpeed = 100;
    /** @type { Scene } */
    _scene = null;
    /** @type { string } */
    _texture = '';
    /** @type { integer } */
    #enemyLife = 10;

    /**
     * @param {Phaser.Scene} scene
     * @param {import("../../types/typedef").Coordinate} coordinate
     * @param {string} texture
     */ 
    constructor(scene, coordinate, texture) {
        super(scene, coordinate.xPos, coordinate.yPos, texture);

        console.log("Enemy created");
        console.log(texture)
        this._texture = texture;
        this.flipY = true;
        this._moveAnimation = texture + '_MOVE';
        this._deathAnimation = texture + '_DEATH';
        
        // Add enemy sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        this.setScale(0.3);

        // Set player sprite to collide with world bounds
        this.setCollideWorldBounds(true);
        
        createEnemyAnims(scene.anims, texture);       

        // Set default animation
        this.anims.play(this._moveAnimation , true);

    }

    /**
     * @param {Phaser.Scene} scene
     * @param {string} classType
     * @returns {void}
     * @static
     * @description Preload enemy assets
     * @example
     *  Enemy.preload(this, LevelOne.name);
     */
    static preload(scene, classType) {
        console.log("Enemy preloaded");
        if (classType === LevelOne.name) {
            const enemyKeys = Object.keys(ENEMY_PIRATE_SPRITE_JSON);

            enemyKeys.forEach(key => {
                console.log(key);
                const file_path = ENEMY_PIRATE_SPRITE_JSON[key];
                scene.load.atlas(key, file_path + '.png', file_path + '.json');
                console.log("Enemy preloaded");
                console.log(key);
            });
        }
    }

    /**
     * @returns {void}
     * @description Update enemy movement
     * @example
     * enemy.update();
     */
    update() {
        this._detectWorldBoundsCollision();
        this.setVelocityX(this._movementXSpeed);
        this.anims.play(this._moveAnimation, true);
    }

    /**
     * @returns {void}
     * @description Detect world bounds collision
     * @example
     * _detectWorldBoundsCollision();
     */
    _detectWorldBoundsCollision() {
        if (this.x - 50 < 0) {
            this._movementXSpeed = Math.abs(this._movementXSpeed);
        } else if (this.x + 50 > this.scene.scale.width) {
            this._movementXSpeed = -Math.abs(this._movementXSpeed);
        }
        
        if (this.y - 50 < 0) {
            this._movementYSpeed = Math.abs(this._movementYSpeed);
        } else if (this.y + 50 > this.scene.scale.height) {
            this._movementYSpeed = -Math.abs(this._movementYSpeed);
        }
    }    

    /**
     * @param {number} damageTaken
     * @returns {void}
     * @description Take damage
     * @example
     * enemy.takeDamage(bullet);
     */
    hitByBullet(damageTaken) {
        console.log("Enemy take damage");
        this.#enemyLife -= damageTaken
        if (this.#enemyLife <= 0) {
            const deathAnimation = this.anims.play(this._deathAnimation, true);
            deathAnimation.on('animationcomplete', () => {
                this._movementXSpeed = 0;
                this._movementYSpeed = 0;
                this.disableBody(true, true);
            });
            console.log("Enemy destroyed");
        }
    }

}