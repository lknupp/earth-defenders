import Bullet from "../../components/bullet/bullet.js";
import Enemy from "./enemy.js";

export default class CommonEnemy extends Enemy {
    /** @type {boolean} */
    #leftweapon = true;
    /**
     * @constructor
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @param {*} gridGraph
     * @description Create a new common enemy
     * @example
     * const commonEnemy = new CommonEnemy(scene, 'enemy', gridGraph);
     */
    constructor(scene, texture, gridGraph) {
        super(scene, texture, gridGraph);
        this._spanwRate = 6000 + Math.floor(Math.random() * 1000);
        this._nextSpawn = scene.time.now + this._spanwRate;

        const weapons = this._weaponGroup.children.entries;
        weapons.push(this._weapon);

        this._setWeaponProperties(
            // @ts-ignore
            weapons,
            0 + Math.floor(Math.random() * 1000),
            2000,
            200,
            2,
            0.2
        );
    }   

    /**
     * @returns {void}
     * @description Spawn enemy
     */
    _spawn() {
        if (!this._isActive && this.scene.time.now > this._nextSpawn) {
            this._speed = 1.5;
            this._enemyLife = 5;
            super._spawn();        
        }
    }

    /**
     * @returns {void}
     * @description Update the enemy
     */
    update() {
        this._spawn();    
        super.update();
        this._shotWeapon(this._getweaponPosition());
        

    }

    /**
     * @returns {import("../../types/typedef.js").Coordinate}
     * @description Get weapon position
     * @example
     * this._getweaponPosition(0);
     */

    _getweaponPosition() {
        const offsetX = this.#leftweapon ? 30 : -30;
        const offsetY = 30;
        this.#leftweapon = !this.#leftweapon;
        return {
            xPos: this.x + offsetX,
            yPos: this.y + offsetY
        };
    }

}