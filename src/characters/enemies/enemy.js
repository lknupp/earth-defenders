import { DIRECTION } from "../../common/direction.js";
import LevelOne from "../../scenes/levelOne.js";
import { ENEMY_LVL_ONE_FILE_PATH, ENEMY_LVL_ONE_FRM_DIM } from "./enemyConfig.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    _movementXSpeed = 100;
    _movementYSpeed = 100;
    _scene = null;

    /**
     * @param {Phaser.Scene} scene
     * @param {import("../../types/typedef").Coordinate} coordinate
     * @param {string} texture
     */ 
    constructor(scene, coordinate, texture) {
        super(scene, coordinate.xPos, coordinate.yPos, texture);

        console.log("Enemy created");
        console.log(texture)

        this.flipY = true;
        // Add enemy sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        // Set player sprite to collide with world bounds
        this.setCollideWorldBounds(true);
        
        // Create player animations
        this.idle = texture + '_idle';

        const frameRateAnims = 10;

        scene.anims.create({
            key: this.idle,
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 9 }),
            frameRate: frameRateAnims,
        });

        // Set default animation
        this.anims.play(this.idle);
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
            const enemyKeys = Object.keys(ENEMY_LVL_ONE_FILE_PATH);

            enemyKeys.forEach(key => {
                const file_path = ENEMY_LVL_ONE_FILE_PATH[key];
                const frame_dim = ENEMY_LVL_ONE_FRM_DIM[key];
                scene.load.spritesheet(
                    key,
                    file_path,
                    frame_dim
                );
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
        this.anims.play(this.idle, true);
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
}