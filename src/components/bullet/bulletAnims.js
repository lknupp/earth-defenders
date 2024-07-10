import Phaser from "../../lib/phaser.js";


/**
 * @param {Phaser.Animations.AnimationManager} anims 
 * @returns {void}
 * @description Create bullet animations
 * @example
 * createBulletAnims(this.anims);
 */
const createBulletAnims = (anims) => {
    anims.create({
        key: 'bulletShooted',
        frames: anims.generateFrameNumbers('cannon', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'bulletTravel',
        frames: anims.generateFrameNumbers('cannon', { start: 2, end: 2}),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'bulletHit',
        frames: anims.generateFrameNumbers('cannon', { start: 3, end: 5}),
        frameRate: 10,
        delay: 20,
        repeat: 1
    });
}

export {
    createBulletAnims
}