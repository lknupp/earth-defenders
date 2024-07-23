import Phaser from "../../lib/phaser.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    /** @type { integer } */
    #weaponDamage = 10;
    /** @type { number } */
    #nextFire = 0;
    /** @type { integer } */
    #fireRate = 0;
    /** @type { integer } */
    #bulletSpeed = 0;
    /** @type { string } */
    #bulletShooted = '';
    /** @type { boolean } */
    #hitEnemy = false;

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.#nextFire = 0;
        this.#fireRate = 400;
        this.#bulletSpeed = 300;
        this.#weaponDamage = 1;
        this.#bulletShooted = 'bulletShooted';

    }

    /**
     * @returns {number}
     * @description Get the weapon damage
     * @example
     * this.weapon.weaponDamage;
     */
    get weaponDamage() {
        return this.#weaponDamage;
    }

    /**
     * @returns {number}
     * @description Get the bullet speed
     * @example
     * this.weapon.bulletSpeed;
     */
    get fireRate() {
        return this.#fireRate;
    }

    /**
     * @returns {number}
     * @description Get the bullet speed
     * @example
     * this.weapon.bulletSpeed;
     */
    get nextFire() {
        return this.#nextFire;
    }

    /**
     * @param {number} value
     * @description Set the bullet speed
     * @example
     * this.weapon.bulletSpeed = 500;
     */
    set nextFire(value) {
        this.#nextFire = value;
    }


    /**
     * @param {number} time
     * @param {number} delta
     * @returns {void}
     * @description Get the bullet speed
     * @example
     * this.weapon.preUpdate(time, delta);
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.y <= 0) {
            this.disableBody(true, true);
            this.body.reset(-100, -10);
            this.setActive(false);
            this.setVisible(false);
        }

        else if (!this.#hitEnemy) {
            this.anims.play('bulletTravel', true);
        }
    }

    /**
     * @returns {Function}
     * @description Get the class type
     * @example
     * this.weapon.getClassType();
     */
    getClassType() {
        return this.constructor;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */

    fire(x, y) {
        this.anims.play(this.#bulletShooted, true);
        this.enableBody(true, x, y, true, true);
        this.body.reset(x, y - 20);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-this.#bulletSpeed);
    }

    /**
     * @returns {number} damage
     * @description Get the weapon damage
     * @example
     * this.weapon.hitEnemy();
     */
    hitEnemy() {
        if (this.#hitEnemy) {
            return 0;
        }
        const damage = this.#weaponDamage;
        this.#hitEnemy = true;
        this.setVelocityY(0);
        const animations = this.anims.play('bulletHit', true);
        animations.on('animationcomplete', () => {
            this.disableBody(true, true);
            this.setActive(false);
            this.setVisible(false);
            this.#hitEnemy = false;
        });
        
        return damage;
    }

}