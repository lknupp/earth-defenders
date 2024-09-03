import Enemy from "./enemy.js";

export default class FastEnemy extends Enemy {
    /** @type {boolean} */
    #leftweapon = true;

        /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @param {*} gridGraph
     * @description Create a new common enemy
     * @example
     * const commonEnemy = new CommonEnemy(scene, 'enemy', gridGraph);
     */
    constructor(scene, texture, gridGraph) {
        super(scene, texture, gridGraph);
        this._spanwRate = 7000 + Math.floor(Math.random() * 1000);
        this._nextSpawn = scene.time.now + this._spanwRate;
        this._movementRate = 500;
        this._enemyPoints = 200;
        this._timeToLive = 25000;

        const weapons = this._weaponGroup.children.entries;
        weapons.push(this._weapon);

        this._setWeaponProperties(
            // @ts-ignore
            weapons,
            0 + Math.floor(Math.random() * 1000),
            1500,
            300,
            1,
            0.15
        );
    }

    /**
     * @returns {void}
        * @description Spawn enemy
        */
    _spawn() {
        if (!this._isActive && this.scene.time.now > this._nextSpawn) {
            this._speed = 2.5;
            this._enemyLife = 3;
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
        const offsetX = this.#leftweapon ? 10 : -10;
        const offsetY = 30;
        this.#leftweapon = !this.#leftweapon;
        return {
            xPos: this.x + offsetX,
            yPos: this.y + offsetY
        };
    }

}