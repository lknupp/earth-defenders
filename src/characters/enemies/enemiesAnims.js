import Phaser from "../../lib/phaser.js";
import { ENEMY_PIRATE_SPRITE_JSON_KEYS } from "./enemyConfig.js";


/**
 * @param {Phaser.Animations.AnimationManager} anims 
 * @param {string} texture
 * @returns {void}
 * @description Create enemy animations
 * @example
 * createEnemyAnims(this.anims, 'enemy1');
 */
const createEnemyAnims = (anims, texture) => {
        
        anims.create({
            key: texture  + '_MOVE',
            frames: anims.generateFrameNames(
                texture, 
                { 
                    start: 0, 
                    end: 9 ,
                    prefix: ENEMY_PIRATE_SPRITE_JSON_KEYS.PIRATE_ENEMY_MOVE.prefix,
                    suffix: ENEMY_PIRATE_SPRITE_JSON_KEYS.PIRATE_ENEMY_MOVE.suffix
                }
            ),
            frameRate: 10,
        });

        anims.create({
            key: texture + '_DEATH',
            frames: anims.generateFrameNames(
                texture, 
                { 
                    start: 0, 
                    end: 7,
                    prefix: ENEMY_PIRATE_SPRITE_JSON_KEYS.PIRATE_ENEMY_DEATH.prefix,
                    suffix: ENEMY_PIRATE_SPRITE_JSON_KEYS.PIRATE_ENEMY_DEATH.suffix
                }
            ),
            frameRate: 10,
            delay: 20,
            repeat: 1
        });
}



export {
    createEnemyAnims
}