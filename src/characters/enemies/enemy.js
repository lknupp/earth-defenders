import { DIRECTION } from "../../common/direction.js";
import LevelOne from "../../scenes/levelOne.js";
import { ENEMY_LVL_ONE_FILE_PATH, ENEMY_LVL_ONE_FRM_DIM } from "./enemyConfig.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

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
        this.setVelocityX(10);
        this.anims.play(this.idle, true);
    }

    
}