import Phaser from "../../lib/phaser.js";
import { BULLET_STATE, BULLET_TYPE_JSON_KEYS } from "./bulletConfigKeys.js";


/**
 * @param {Phaser.Animations.AnimationManager} anims 
 * @param {string} texture
 * @returns {void}
 * @description Create bullet animations
 * @example
 * createBulletAnims(this.anims);
 */
const createBulletAnims = (anims, texture) => {
    anims.create({
        key: texture + BULLET_STATE.BULLET_SHOT,
        frames: anims.generateFrameNames(
            texture, 
            { 
                start: 0, 
                end: 1 ,
                prefix: BULLET_TYPE_JSON_KEYS.BULLET_SHOT.prefix,
                suffix: BULLET_TYPE_JSON_KEYS.BULLET_SHOT.suffix
            }
        ),
        frameRate: 5,
        repeat: -1
    });

    const startFrame = texture === 'PIRATE_ENEMY_BULLET_01' ? 1 : 2;

    anims.create({
        key: texture + BULLET_STATE.BULLET_TRAVEL,
        frames: anims.generateFrameNames(
            texture, 
            { 
                start: startFrame, 
                end: startFrame,
                prefix: BULLET_TYPE_JSON_KEYS.BULLET_TRAVEL.prefix,
                suffix: BULLET_TYPE_JSON_KEYS.BULLET_TRAVEL.suffix
            }
        ),
        frameRate: 10,
        repeat: -1
    });


    anims.create({
        key: texture + BULLET_STATE.BULLET_HIT,
        frames: anims.generateFrameNames(
            texture, 
            { 
                start: startFrame + 1, 
                end: startFrame + 3, 
                prefix: BULLET_TYPE_JSON_KEYS.BULLET_HIT.prefix,
                suffix: BULLET_TYPE_JSON_KEYS.BULLET_HIT.suffix
            }
        ),
        frameRate: 10,
        delay: 20,
        repeat: 1
    });
}

export {
    createBulletAnims
}