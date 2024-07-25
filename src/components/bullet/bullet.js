import Phaser from "../../lib/phaser.js";
import { BULLET_STATE, BULLET_TYPE } from "./bulletConfigKeys.js";

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
    /** @type { string } */
    #bulletTravel = '';
    /** @type { string } */
    #bulletHit = '';
    /** @type { boolean } */
    #hitEnemy = false;
    /** @type { string } */
    #bulletTexture = '';

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {boolean} flipFrame
     * @param {number} scale
     * @description Create a new bullet
     * @example
     * const bullet = new Bullet(this, 500, 1000, 'ENEMY_SHOT_01', true);
     * @constructor
     */
    constructor(scene, x, y, texture, flipFrame, scale = 0.20) {
        super(scene, x, y, texture);
        this.#bulletTexture = texture;
        // this.#nextFire = 0;
        // this.#fireRate = 400;
        // this.#bulletSpeed = 300;
        // this.#weaponDamage = 1;
        this.#bulletShooted = texture + BULLET_STATE.BULLET_SHOT;
        this.#bulletTravel = texture + BULLET_STATE.BULLET_TRAVEL;
        this.#bulletHit = texture + BULLET_STATE.BULLET_HIT;
        this.flipY = flipFrame;

        this.setScale(scale);

    }

    /**
     * @returns {integer}
     * @description Get the weapon damage
     * @example
     * this.weapon.weaponDamage;
     */
    get weaponDamage() {
        return this.#weaponDamage;
    }

    /**
     * @param {integer} value
     * @returns {void}
     * @description Set the weapon damage
     * @example
     * this.weapon.weaponDamage = 10;
     */ 
    set weaponDamage(value) {
        this.#weaponDamage = value;
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
     * @param {integer} value
     * @returns {void}
     * @description Set the weapon damage
     * @example
     * this.weapon.fireRate = 400;
     */
    set fireRate(value) {
        this.#fireRate = value;
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
     * @returns {integer}
     * @description Get the weapon damage
     * @example
     * this.weapon.bulletSpeed;
     */
    get bulletSpeed() {
        return this.#bulletSpeed;
    }

    /**
     * @param {integer} value
     * @description Set the bullet speed
     * @example
     * this.weapon.bulletSpeed = 500;
     */
    set bulletSpeed(value) {
        this.#bulletSpeed = value;
    }

    /**
     * @returns {string}
     * @description Get the bullet texture
     * @example
     * this.weapon.bulletTexture;
     */
    get bulletTexture() {
        return this.#bulletTexture;
    }

    /**
     * @param {Phaser.Scene} scene
     * @returns {void}
     * @static
     * @description Preload enemy assets
     * @example
     *  Enemy.preload(this, LevelOne.name);
     */
    static preload(scene) {
        const enemyKeys = Object.keys(BULLET_TYPE);
        enemyKeys.forEach(key => {
            const file_path = BULLET_TYPE[key];
            scene.load.atlas(key, file_path + '.png', file_path + '.json');
            });
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
        else if(this.y >= this.scene.scale.height + 200) {
            this.disableBody(true, true);
            this.body.reset(-100, -10);
            this.setActive(false);
            this.setVisible(false);
        }
        else if (!this.#hitEnemy) {
            this.anims.play(this.#bulletTravel, true);
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
     * @param {number} scale
     * @returns {void}
     * @description Set bullet scale
     * @example
     * this.weapon.setBulletScale(0.15);
     */
    setBulletScale(scale) {
        this.setScale(scale);
    }


    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */

    fire(x, y) {
        this.anims.play(this.#bulletShooted, true);
        this.enableBody(true, x, y, true, true);
        this.body.reset(x, y);
        this.setActive(true); 
        this.setVisible(true);

        this.setVelocityY(this.#bulletSpeed);
    }

    /**
     * @returns {number} damage
     * @description Get the weapon damage
     * @example
     * this.weapon.hitEnemy();
     */
    hitCharacter() {
        if (this.#hitEnemy) {
            return 0;
        }
        const damage = this.#weaponDamage;
        this.#hitEnemy = true;
        this.setVelocityY(0);
        const animations = this.anims.play( this.#bulletHit, true);
        animations.on('animationcomplete', () => {
            this.disableBody(true, true);
            this.setActive(false);
            this.setVisible(false);
            this.#hitEnemy = false;
        });
        
        return damage;
    }

}