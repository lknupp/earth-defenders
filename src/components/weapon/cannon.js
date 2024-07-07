export default class Cannon extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'cannon');

        this.nextFire = 0;
        this.fireRate = 300;
        this.bulletSpeed = 600;
        this.weaponDamage = 1;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    getClassType() {
        return Cannon;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */

    fire(x, y) {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-this.bulletSpeed);
    }
}