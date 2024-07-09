export default class Cannon extends Phaser.Physics.Arcade.Sprite {
    /** @type { integer } */
    #weaponDamage = 0;
    /** @type { number } */
    #nextFire = 0;
    /** @type { integer } */
    #fireRate = 0;
    /** @type { integer } */
    #bulletSpeed = 0;
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'cannon');

        this.#nextFire = 0;
        this.#fireRate = 300;
        this.#bulletSpeed = 600;
        this.#weaponDamage = 1;
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
            this.setActive(false);
            this.setVisible(false);
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
        this.enableBody(true, x, y, true, true);
        this.body.reset(x, y);
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
        const damage = this.#weaponDamage;
        this.disableBody(true, true);
        this.setActive(false);
        this.setVisible(false);

        return damage;
    }
}